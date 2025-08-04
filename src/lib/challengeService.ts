import { supabase } from "@/integrations/supabase/client";
import {
  Challenge,
  UserChallengeAttempt,
  DailyChallenge,
  ChallengeFilters,
  ChallengeSubmission,
  ChallengeResult,
  ChallengeType,
  ChallengeDifficulty,
} from "@/types/challenges";

export class ChallengeService {
  // Fetch all active challenges with optional filters
  static async getChallenges(filters?: ChallengeFilters): Promise<Challenge[]> {
    let query = supabase
      .from("challenges" as any)
      .select("*")
      .eq("is_active", true);

    if (filters?.difficulty) {
      query = query.eq("difficulty", filters.difficulty);
    }

    if (filters?.type) {
      query = query.eq("challenge_type", filters.type);
    }

    if (filters?.topic_id) {
      query = query.eq("topic_id", filters.topic_id);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      throw new Error(`Failed to fetch challenges: ${error.message}`);
    }

    return (data as unknown as Challenge[]) || [];
  }

  // Fetch a single challenge by ID
  static async getChallenge(id: string): Promise<Challenge | null> {
    const { data, error } = await supabase
      .from("challenges" as any)
      .select("*")
      .eq("id", id)
      .eq("is_active", true)
      .single();

    if (error) {
      throw new Error(`Failed to fetch challenge: ${error.message}`);
    }

    return data as unknown as Challenge;
  }

  // Fetch daily challenges
  static async getDailyChallenges(): Promise<DailyChallenge[]> {
    const { data, error } = await supabase
      .from("daily_challenges" as any)
      .select(
        `
        *,
        challenge:challenges(*)
      `
      )
      .eq("is_active", true)
      .gte("expires_at", new Date().toISOString())
      .order("challenge_date", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch daily challenges: ${error.message}`);
    }

    return (data as unknown as DailyChallenge[]) || [];
  }

  // Start a challenge attempt
  static async startChallenge(
    challengeId: string,
    userId: string
  ): Promise<UserChallengeAttempt> {
    // Check if user already has an in-progress attempt
    const { data: existingAttempt } = await supabase
      .from("user_challenge_attempts" as any)
      .select("*")
      .eq("user_id", userId)
      .eq("challenge_id", challengeId)
      .eq("status", "in_progress")
      .single();

    if (existingAttempt) {
      return existingAttempt as unknown as UserChallengeAttempt;
    }

    // Create new attempt
    const { data, error } = await supabase
      .from("user_challenge_attempts" as any)
      .insert({
        user_id: userId,
        challenge_id: challengeId,
        status: "in_progress",
        score: 0,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to start challenge: ${error.message}`);
    }

    return data as unknown as UserChallengeAttempt;
  }

  // Submit a challenge solution
  static async submitChallenge(
    attemptId: string,
    submission: ChallengeSubmission
  ): Promise<ChallengeResult> {
    const startTime = Date.now();

    // Get the attempt and challenge details
    const { data: attempt, error: attemptError } = await supabase
      .from("user_challenge_attempts" as any)
      .select(
        `
        *,
        challenge:challenges(*)
      `
      )
      .eq("id", attemptId)
      .single();

    if (attemptError || !attempt) {
      throw new Error(`Failed to fetch attempt: ${attemptError?.message}`);
    }

    const attemptData = attempt as unknown as UserChallengeAttempt & {
      challenge: Challenge;
    };
    const challenge = attemptData.challenge;
    if (!challenge) {
      throw new Error("Challenge not found");
    }

    let result: ChallengeResult;

    // Process submission based on challenge type
    if (challenge.challenge_type === "coding") {
      result = await this.evaluateCodingChallenge(challenge, submission);
    } else {
      result = await this.evaluateMCQChallenge(challenge, submission);
    }

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    // Update attempt with results
    const { error: updateError } = await supabase
      .from("user_challenge_attempts" as any)
      .update({
        status: result.success ? "completed" : "failed",
        score: result.score,
        time_taken: timeTaken,
        submission_code: submission.submission_code,
        mcq_answers: submission.mcq_answers,
        completed_at: new Date().toISOString(),
      })
      .eq("id", attemptId);

    if (updateError) {
      throw new Error(`Failed to update attempt: ${updateError.message}`);
    }

    return {
      ...result,
      time_taken: timeTaken,
    };
  }

  // Evaluate coding challenge
  private static async evaluateCodingChallenge(
    challenge: Challenge,
    submission: ChallengeSubmission
  ): Promise<ChallengeResult> {
    if (!submission.submission_code || !challenge.test_cases) {
      return {
        success: false,
        score: 0,
        time_taken: 0,
        feedback: "No submission code or test cases found",
      };
    }

    // Simple evaluation - in a real app, you'd use a code execution service
    const testResults = challenge.test_cases.map((testCase) => {
      // This is a simplified evaluation - you'd need a proper code execution engine
      const passed = Math.random() > 0.3; // Simulate test results
      return {
        test_case: testCase,
        passed,
        actual_output: passed ? testCase.expected : "incorrect output",
        error: passed ? undefined : "Test case failed",
      };
    });

    const passedTests = testResults.filter((result) => result.passed).length;
    const totalTests = testResults.length;
    const success = passedTests === totalTests;
    const score = Math.floor((passedTests / totalTests) * challenge.points);

    return {
      success,
      score,
      time_taken: 0,
      test_results: testResults,
      feedback: success
        ? "All test cases passed! Great job!"
        : `${passedTests}/${totalTests} test cases passed. Keep trying!`,
    };
  }

  // Evaluate MCQ challenge
  private static async evaluateMCQChallenge(
    challenge: Challenge,
    submission: ChallengeSubmission
  ): Promise<ChallengeResult> {
    if (!submission.mcq_answers || !challenge.mcq_questions) {
      return {
        success: false,
        score: 0,
        time_taken: 0,
        feedback: "No answers or questions found",
      };
    }

    let correctAnswers = 0;
    const totalQuestions = challenge.mcq_questions.length;

    challenge.mcq_questions.forEach((question, index) => {
      const userAnswer = submission.mcq_answers?.[index.toString()];
      if (userAnswer === question.correct) {
        correctAnswers++;
      }
    });

    const success = correctAnswers === totalQuestions;
    const score = Math.floor(
      (correctAnswers / totalQuestions) * challenge.points
    );

    return {
      success,
      score,
      time_taken: 0,
      feedback: success
        ? "Perfect score! Well done!"
        : `${correctAnswers}/${totalQuestions} questions correct. Good effort!`,
    };
  }

  // Get user's challenge attempts
  static async getUserAttempts(
    userId: string
  ): Promise<UserChallengeAttempt[]> {
    const { data, error } = await supabase
      .from("user_challenge_attempts" as any)
      .select(
        `
        *,
        challenge:challenges(*)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch user attempts: ${error.message}`);
    }

    return (data as unknown as UserChallengeAttempt[]) || [];
  }

  // Get challenge statistics
  static async getChallengeStats(challengeId: string): Promise<{
    total_attempts: number;
    completed_attempts: number;
    average_score: number;
    top_performers: Array<{
      user_id: string;
      score: number;
      time_taken: number;
    }>;
  }> {
    const { data: attempts, error } = await supabase
      .from("user_challenge_attempts" as any)
      .select("*")
      .eq("challenge_id", challengeId);

    if (error) {
      throw new Error(`Failed to fetch challenge stats: ${error.message}`);
    }

    const attemptsData = attempts as unknown as any[];
    const totalAttempts = attemptsData?.length || 0;
    const completedAttempts =
      attemptsData?.filter((a: any) => a.status === "completed").length || 0;
    const averageScore =
      completedAttempts > 0
        ? attemptsData
            ?.filter((a: any) => a.status === "completed")
            .reduce((sum: number, a: any) => sum + a.score, 0) /
            completedAttempts || 0
        : 0;

    const topPerformers =
      attemptsData
        ?.filter((a: any) => a.status === "completed")
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 10)
        .map((a: any) => ({
          user_id: a.user_id,
          score: a.score,
          time_taken: a.time_taken || 0,
        })) || [];

    return {
      total_attempts: totalAttempts,
      completed_attempts: completedAttempts,
      average_score: Math.round(averageScore),
      top_performers: topPerformers,
    };
  }
}
