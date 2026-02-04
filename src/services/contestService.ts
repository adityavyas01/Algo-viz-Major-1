/**
 * Contest Service
 * Manages contests, registrations, submissions, and leaderboards
 */

import { supabase } from "@/integrations/supabase/client";
import { executeBatch } from "./multiLangExecutor";
import { getTestcasesForProblem } from "./testcaseService";
import type { ExecutionRequest } from "@/types/execution";

export interface Contest {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  duration: number;
  status: "upcoming" | "active" | "finished";
  type: "standard" | "weekly" | "monthly" | "special";
  format?: "standard" | "tournament" | "weekly" | "monthly";
  visibility: "public" | "private" | "invite_only";
  max_participants?: number;
  total_participants: number;
  registration_start?: string;
  registration_end?: string;
  rules?: string;
  prizes?: string;
  bracket_data?: any;
  prize_pool?: any;
  created_at: string;
  updated_at: string;
}

export interface ContestProblem {
  id: string;
  contest_id: string;
  problem_id: string;
  order_index: number;
  points: number;
  solved_count: number;
  created_at: string;
  problem?: {
    title: string;
    difficulty: string;
    description: string;
  };
}

export interface ContestParticipant {
  id: string;
  contest_id: string;
  user_id: string;
  rank?: number;
  score: number;
  penalty_time: number;
  problems_solved: number;
  registered_at: string;
  last_submission_at?: string;
  user?: {
    email: string;
  };
}

export interface ContestSubmission {
  id: string;
  contest_id: string;
  problem_id: string;
  user_id: string;
  code: string;
  language: string;
  status: "pending" | "running" | "accepted" | "wrong_answer" | "runtime_error" | "time_limit_exceeded" | "compilation_error" | "memory_limit_exceeded";
  verdict?: string;
  score: number;
  runtime?: number;
  memory?: number;
  passed_testcases: number;
  total_testcases: number;
  submitted_at: string;
  judged_at?: string;
}

export interface ContestAnnouncement {
  id: string;
  contest_id: string;
  title: string;
  message: string;
  priority: "low" | "normal" | "high" | "urgent";
  created_at: string;
}

/**
 * Fetch all contests with optional filters
 */
export async function getContests(filters?: {
  status?: Contest["status"];
  type?: Contest["type"];
}): Promise<Contest[]> {
  let query = supabase
    .from("contests")
    .select("*")
    .eq("visibility", "public")
    .order("start_time", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  if (filters?.type) {
    query = query.eq("type", filters.type);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching contests:", error);
    throw new Error(`Failed to fetch contests: ${error.message}`);
  }

  return data || [];
}

/**
 * Get tournaments (contests with format='tournament')
 */
export async function getTournaments(filters?: {
  status?: Contest["status"];
}): Promise<Contest[]> {
  let query = supabase
    .from("contests")
    .select("*")
    .eq("visibility", "public")
    .eq("format", "tournament")
    .order("start_time", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching tournaments:", error);
    throw new Error(`Failed to fetch tournaments: ${error.message}`);
  }

  return data || [];
}

/**
 * Get a single contest by ID
 */
export async function getContestById(contestId: string): Promise<Contest | null> {
  const { data, error } = await supabase
    .from("contests")
    .select("*")
    .eq("id", contestId)
    .single();

  if (error) {
    console.error("Error fetching contest:", error);
    return null;
  }

  return data;
}

/**
 * Get all problems for a contest
 */
export async function getContestProblems(contestId: string): Promise<ContestProblem[]> {
  const { data, error } = await supabase
    .from("contest_problems")
    .select(`
      *,
      problem:problems(title, difficulty, description)
    `)
    .eq("contest_id", contestId)
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching contest problems:", error);
    throw new Error(`Failed to fetch contest problems: ${error.message}`);
  }

  return data || [];
}

/**
 * Register user for a contest
 */
export async function registerForContest(contestId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to register for contests");
  }

  // Check if already registered
  const { data: existing } = await supabase
    .from("contest_participants")
    .select("id")
    .eq("contest_id", contestId)
    .eq("user_id", user.id)
    .single();

  if (existing) {
    return true; // Already registered
  }

  // Register
  const { error } = await supabase
    .from("contest_participants")
    .insert({
      contest_id: contestId,
      user_id: user.id,
    });

  if (error) {
    console.error("Error registering for contest:", error);
    throw new Error(`Failed to register: ${error.message}`);
  }

  return true;
}

/**
 * Check if user is registered for a contest
 */
export async function isUserRegistered(contestId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("contest_participants")
    .select("id")
    .eq("contest_id", contestId)
    .eq("user_id", user.id)
    .single();

  return !!data;
}

/**
 * Get leaderboard for a contest
 */
export async function getContestLeaderboard(
  contestId: string,
  limit: number = 100
): Promise<ContestParticipant[]> {
  const { data, error } = await supabase
    .from("contest_participants")
    .select(`
      *,
      user:auth.users(email)
    `)
    .eq("contest_id", contestId)
    .order("rank", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching leaderboard:", error);
    throw new Error(`Failed to fetch leaderboard: ${error.message}`);
  }

  return data || [];
}

/**
 * Recalculate contest rankings
 */
export async function updateContestRankings(contestId: string): Promise<void> {
  const { error } = await supabase.rpc("calculate_contest_rankings", {
    contest_uuid: contestId,
  });

  if (error) {
    console.error("Error updating rankings:", error);
    throw new Error(`Failed to update rankings: ${error.message}`);
  }
}

/**
 * Submit code for a contest problem
 */
export async function submitContestCode(
  contestId: string,
  problemId: string,
  code: string,
  language: string
): Promise<{ submissionId: string; results: any }> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to submit code");
  }

  // Check if user is registered
  const registered = await isUserRegistered(contestId);
  if (!registered) {
    throw new Error("You must register for the contest before submitting");
  }

  // Check if contest is active
  const contest = await getContestById(contestId);
  if (!contest) {
    throw new Error("Contest not found");
  }

  if (contest.status !== "active") {
    throw new Error("Contest is not currently active");
  }

  // Get testcases
  const testcases = await getTestcasesForProblem(problemId, true);

  if (testcases.length === 0) {
    throw new Error("No testcases found for this problem");
  }

  // Create submission record
  const { data: submission, error: submissionError } = await supabase
    .from("contest_submissions")
    .insert({
      contest_id: contestId,
      problem_id: problemId,
      user_id: user.id,
      code,
      language,
      status: "running",
      score: 0,
      passed_testcases: 0,
      total_testcases: testcases.length,
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (submissionError || !submission) {
    console.error("Error creating contest submission:", submissionError);
    throw new Error(`Failed to create submission: ${submissionError?.message}`);
  }

  // Execute code against all testcases
  try {
    const executionRequests: ExecutionRequest[] = testcases.map((tc) => ({
      code,
      language,
      input: tc.input,
      expectedOutput: tc.expected_output,
    }));

    const results = await executeBatch(executionRequests);

    // Calculate statistics
    const passedCount = results.results.filter((r) => r.verdict === "Accepted").length;
    const totalRuntime = results.results.reduce((sum, r) => sum + (r.runtime || 0), 0);
    const avgRuntime = Math.round(totalRuntime / results.results.length);
    const maxMemory = Math.max(...results.results.map((r) => r.memory || 0));

    // Determine overall status
    let status: ContestSubmission["status"] = "accepted";
    let verdict = "Accepted";

    if (results.results.some((r) => r.verdict === "Compilation Error")) {
      status = "compilation_error";
      verdict = "Compilation Error";
    } else if (results.results.some((r) => r.verdict === "Runtime Error")) {
      status = "runtime_error";
      verdict = "Runtime Error";
    } else if (results.results.some((r) => r.verdict === "Time Limit Exceeded")) {
      status = "time_limit_exceeded";
      verdict = "Time Limit Exceeded";
    } else if (passedCount < results.results.length) {
      status = "wrong_answer";
      verdict = `Wrong Answer (${passedCount}/${results.results.length})`;
    }

    // Calculate score
    const score = status === "accepted" ? 100 : Math.round((passedCount / results.results.length) * 100);

    // Update submission with results
    await supabase
      .from("contest_submissions")
      .update({
        status,
        verdict,
        score,
        passed_testcases: passedCount,
        total_testcases: results.results.length,
        runtime: avgRuntime,
        memory: maxMemory,
        judged_at: new Date().toISOString(),
      })
      .eq("id", submission.id);

    // Update rankings after submission
    await updateContestRankings(contestId);

    return {
      submissionId: submission.id,
      results,
    };
  } catch (executionError) {
    // Update submission to show error
    await supabase
      .from("contest_submissions")
      .update({
        status: "runtime_error",
        verdict: "Execution Failed",
        judged_at: new Date().toISOString(),
      })
      .eq("id", submission.id);

    throw executionError;
  }
}

/**
 * Get user's submissions for a contest problem
 */
export async function getContestSubmissions(
  contestId: string,
  problemId?: string
): Promise<ContestSubmission[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  let query = supabase
    .from("contest_submissions")
    .select("*")
    .eq("contest_id", contestId)
    .eq("user_id", user.id)
    .order("submitted_at", { ascending: false });

  if (problemId) {
    query = query.eq("problem_id", problemId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching contest submissions:", error);
    return [];
  }

  return data || [];
}

/**
 * Get contest announcements
 */
export async function getContestAnnouncements(
  contestId: string
): Promise<ContestAnnouncement[]> {
  const { data, error } = await supabase
    .from("contest_announcements")
    .select("*")
    .eq("contest_id", contestId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }

  return data || [];
}

/**
 * Subscribe to real-time leaderboard updates
 */
export function subscribeToLeaderboard(
  contestId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`contest_${contestId}_leaderboard`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "contest_participants",
        filter: `contest_id=eq.${contestId}`,
      },
      callback
    )
    .subscribe();
}

/**
 * Subscribe to contest announcements
 */
export function subscribeToAnnouncements(
  contestId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`contest_${contestId}_announcements`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "contest_announcements",
        filter: `contest_id=eq.${contestId}`,
      },
      callback
    )
    .subscribe();
}

/**
 * Generate tournament bracket
 * Creates a single-elimination bracket structure
 */
export function generateBracket(participants: ContestParticipant[]): any {
  const numParticipants = participants.length;
  const rounds = Math.ceil(Math.log2(numParticipants));
  const bracketSize = Math.pow(2, rounds);
  
  // Seed participants
  const seededParticipants = [...participants];
  
  // Add byes if needed
  while (seededParticipants.length < bracketSize) {
    seededParticipants.push(null as any);
  }

  // Build bracket structure
  const bracket: any = {
    rounds: [],
    total_rounds: rounds,
    bracket_size: bracketSize
  };

  // First round matchups
  const firstRound = [];
  for (let i = 0; i < bracketSize / 2; i++) {
    firstRound.push({
      match_id: `r1_m${i + 1}`,
      round: 1,
      participant1: seededParticipants[i * 2],
      participant2: seededParticipants[i * 2 + 1],
      winner: null,
      completed: false
    });
  }
  bracket.rounds.push(firstRound);

  // Subsequent rounds (empty until matches complete)
  for (let r = 2; r <= rounds; r++) {
    const roundMatches = [];
    const numMatches = bracketSize / Math.pow(2, r);
    for (let m = 0; m < numMatches; m++) {
      roundMatches.push({
        match_id: `r${r}_m${m + 1}`,
        round: r,
        participant1: null,
        participant2: null,
        winner: null,
        completed: false
      });
    }
    bracket.rounds.push(roundMatches);
  }

  return bracket;
}

/**
 * Update tournament bracket after match completion
 */
export async function updateTournamentBracket(
  contestId: string,
  matchId: string,
  winnerId: string
): Promise<void> {
  // Fetch current bracket
  const contest = await getContestById(contestId);
  if (!contest || !contest.bracket_data) {
    throw new Error("Invalid tournament or bracket data");
  }

  const bracket = contest.bracket_data;
  
  // Find and update the match
  let matchFound = false;
  for (const round of bracket.rounds) {
    const match = round.find((m: any) => m.match_id === matchId);
    if (match) {
      match.winner = winnerId;
      match.completed = true;
      matchFound = true;

      // Advance winner to next round
      const [roundNum, matchNum] = matchId.split('_')[0].slice(1).split('m');
      const nextRoundIndex = parseInt(roundNum);
      const nextMatchIndex = Math.floor((parseInt(matchNum) - 1) / 2);
      
      if (nextRoundIndex < bracket.rounds.length) {
        const nextMatch = bracket.rounds[nextRoundIndex][nextMatchIndex];
        if (!nextMatch.participant1) {
          nextMatch.participant1 = winnerId;
        } else {
          nextMatch.participant2 = winnerId;
        }
      }
      
      break;
    }
  }

  if (!matchFound) {
    throw new Error("Match not found in bracket");
  }

  // Update contest with new bracket data
  const { error } = await supabase
    .from("contests")
    .update({ bracket_data: bracket })
    .eq("id", contestId);

  if (error) {
    throw new Error(`Failed to update bracket: ${error.message}`);
  }
}
