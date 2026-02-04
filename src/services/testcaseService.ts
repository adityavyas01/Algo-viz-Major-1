/**
 * Testcase Service
 * Manages testcases for problems with database integration
 */

import { supabase } from "@/integrations/supabase/client";
import type { ExecutionRequest, BatchExecutionResult, TestcaseExecution } from "@/types/execution";
import { executeTestcase, executeBatch } from "./multiLangExecutor";

export interface Testcase {
  id: string;
  problem_id: string;
  input: string;
  expected_output: string;
  is_hidden: boolean;
  type: "standard" | "edge" | "performance" | "stress";
  time_limit: number;
  memory_limit: number;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  points: number;
  time_limit: number;
  memory_limit: number;
  acceptance_rate: number;
  total_submissions: number;
  total_accepted: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Submission {
  id: string;
  user_id: string;
  problem_id: string;
  code: string;
  language: string;
  status: "pending" | "running" | "accepted" | "wrong_answer" | "runtime_error" | "time_limit_exceeded" | "compilation_error" | "memory_limit_exceeded";
  verdict?: string;
  total_testcases: number;
  passed_testcases: number;
  failed_testcases: number;
  runtime?: number;
  memory?: number;
  score: number;
  submitted_at: string;
  judged_at?: string;
}

export interface SubmissionResult {
  id: string;
  submission_id: string;
  testcase_id: string;
  passed: boolean;
  actual_output?: string;
  error_message?: string;
  runtime?: number;
  memory?: number;
  created_at: string;
}

/**
 * Fetch all testcases for a specific problem
 * Non-authenticated users only see non-hidden testcases
 */
export async function getTestcasesForProblem(problemId: string, includeHidden: boolean = false): Promise<Testcase[]> {
  let query = supabase
    .from("testcases")
    .select("*")
    .eq("problem_id", problemId)
    .order("order_index", { ascending: true });

  if (!includeHidden) {
    query = query.eq("is_hidden", false);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching testcases:", error);
    throw new Error(`Failed to fetch testcases: ${error.message}`);
  }

  return data || [];
}

/**
 * Fetch a single problem by ID
 */
export async function getProblemById(problemId: string): Promise<Problem | null> {
  const { data, error } = await supabase
    .from("problems")
    .select("*")
    .eq("id", problemId)
    .single();

  if (error) {
    console.error("Error fetching problem:", error);
    return null;
  }

  return data;
}

/**
 * Fetch all active problems with pagination
 */
export async function getProblems(
  page: number = 1,
  pageSize: number = 20,
  filters?: { difficulty?: string; category?: string }
): Promise<{ problems: Problem[]; total: number }> {
  let query = supabase
    .from("problems")
    .select("*", { count: "exact" })
    .eq("is_active", true);

  if (filters?.difficulty) {
    query = query.eq("difficulty", filters.difficulty);
  }

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching problems:", error);
    throw new Error(`Failed to fetch problems: ${error.message}`);
  }

  return {
    problems: data || [],
    total: count || 0,
  };
}

/**
 * Create a new submission and execute code against all testcases
 */
export async function createSubmission(
  problemId: string,
  code: string,
  language: string
): Promise<{ submissionId: string; results: BatchExecutionResult }> {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User must be authenticated to submit code");
  }

  // Get problem details
  const problem = await getProblemById(problemId);
  if (!problem) {
    throw new Error("Problem not found");
  }

  // Get all testcases (including hidden ones for judging)
  const testcases = await getTestcasesForProblem(problemId, true);
  
  if (testcases.length === 0) {
    throw new Error("No testcases found for this problem");
  }

  // Create submission record
  const { data: submission, error: submissionError } = await supabase
    .from("submissions")
    .insert({
      user_id: user.id,
      problem_id: problemId,
      code,
      language,
      status: "running",
      total_testcases: testcases.length,
      passed_testcases: 0,
      failed_testcases: 0,
      score: 0,
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (submissionError || !submission) {
    console.error("Error creating submission:", submissionError);
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
    const failedCount = results.results.length - passedCount;
    const totalRuntime = results.results.reduce((sum, r) => sum + (r.runtime || 0), 0);
    const avgRuntime = Math.round(totalRuntime / results.results.length);
    const maxMemory = Math.max(...results.results.map((r) => r.memory || 0));
    
    // Determine overall status
    let status: Submission["status"] = "accepted";
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

    // Calculate score (percentage based)
    const score = Math.round((passedCount / results.results.length) * 100);

    // Update submission with results
    await supabase
      .from("submissions")
      .update({
        status,
        verdict,
        total_testcases: results.results.length,
        passed_testcases: passedCount,
        failed_testcases: failedCount,
        runtime: avgRuntime,
        memory: maxMemory,
        score,
        judged_at: new Date().toISOString(),
      })
      .eq("id", submission.id);

    // Insert individual testcase results
    const submissionResults = results.results.map((result, index) => ({
      submission_id: submission.id,
      testcase_id: testcases[index].id,
      passed: result.verdict === "Accepted",
      actual_output: result.output,
      error_message: result.error,
      runtime: result.runtime,
      memory: result.memory,
    }));

    const { error: resultsError } = await supabase
      .from("submission_results")
      .insert(submissionResults);

    if (resultsError) {
      console.error("Error saving submission results:", resultsError);
    }

    return {
      submissionId: submission.id,
      results,
    };
  } catch (executionError) {
    // Update submission to show error
    await supabase
      .from("submissions")
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
 * Get user's submissions for a specific problem
 */
export async function getUserSubmissions(
  problemId: string,
  limit: number = 10
): Promise<Submission[]> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("user_id", user.id)
    .eq("problem_id", problemId)
    .order("submitted_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching user submissions:", error);
    return [];
  }

  return data || [];
}

/**
 * Get detailed results for a specific submission
 */
export async function getSubmissionDetails(
  submissionId: string
): Promise<{ submission: Submission; results: (SubmissionResult & { testcase?: Testcase })[]; } | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User must be authenticated");
  }

  // Fetch submission
  const { data: submission, error: submissionError } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", submissionId)
    .eq("user_id", user.id)
    .single();

  if (submissionError || !submission) {
    console.error("Error fetching submission:", submissionError);
    return null;
  }

  // Fetch submission results
  const { data: results, error: resultsError } = await supabase
    .from("submission_results")
    .select("*")
    .eq("submission_id", submissionId);

  if (resultsError) {
    console.error("Error fetching submission results:", resultsError);
    return { submission, results: [] };
  }

  // Fetch testcase details (only non-hidden ones)
  const testcaseIds = results?.map((r) => r.testcase_id) || [];
  const { data: testcases } = await supabase
    .from("testcases")
    .select("*")
    .in("id", testcaseIds);

  // Merge results with testcase data
  const enrichedResults = (results || []).map((result) => {
    const testcase = testcases?.find((tc) => tc.id === result.testcase_id);
    return {
      ...result,
      testcase: testcase || undefined,
    };
  });

  return {
    submission,
    results: enrichedResults,
  };
}

/**
 * Get user's problem progress summary
 */
export async function getUserProgress() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return {
      total_attempted: 0,
      total_solved: 0,
      easy_solved: 0,
      medium_solved: 0,
      hard_solved: 0,
    };
  }

  const { data, error } = await supabase
    .from("user_problem_progress")
    .select(`
      *,
      problem:problems(difficulty)
    `)
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching user progress:", error);
    return {
      total_attempted: 0,
      total_solved: 0,
      easy_solved: 0,
      medium_solved: 0,
      hard_solved: 0,
    };
  }

  const progress = data || [];
  const solved = progress.filter((p) => p.status === "solved");

  return {
    total_attempted: progress.length,
    total_solved: solved.length,
    easy_solved: solved.filter((p) => p.problem?.difficulty === "easy").length,
    medium_solved: solved.filter((p) => p.problem?.difficulty === "medium").length,
    hard_solved: solved.filter((p) => p.problem?.difficulty === "hard").length,
  };
}
