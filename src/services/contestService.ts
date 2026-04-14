/**
 * Contest Service
 * Manages contests, registrations, submissions, and leaderboards
 */

import { supabase } from "@/integrations/supabase/client";

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
  created_at: string;
  updated_at: string;
}

export interface ContestProblem {
  id: string;
  contest_id: string;
  problem_id: number;
  order_index: number;
  points: number;
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
  profile?: {
    display_name: string;
  };
}

export interface ContestSubmission {
  id: string;
  contest_id: string;
  problem_id: number;
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

// ============================================
// Read Operations
// ============================================

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
    .maybeSingle();

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

  // Increment participant count
  await supabase.rpc("increment_contest_participants", { contest_uuid: contestId }).catch(() => {
    // Fallback: just ignore if function doesn't exist
  });

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
    .maybeSingle();

  return !!data;
}

/**
 * Get leaderboard for a contest with display names
 */
export async function getContestLeaderboard(
  contestId: string,
  limit: number = 100
): Promise<ContestParticipant[]> {
  const { data: participants, error } = await supabase
    .from("contest_participants")
    .select("*")
    .eq("contest_id", contestId)
    .order("score", { ascending: false })
    .order("penalty_time", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching leaderboard:", error);
    throw new Error(`Failed to fetch leaderboard: ${error.message}`);
  }

  if (!participants || participants.length === 0) return [];

  // Enrich with display names
  const userIds = participants.map((p) => p.user_id);
  const { data: profiles } = await supabase
    .from("user_profiles")
    .select("user_id, display_name")
    .in("user_id", userIds);

  const profileMap = new Map(
    (profiles || []).map((p: any) => [p.user_id, p])
  );

  return participants.map((p, index) => ({
    ...p,
    rank: p.rank || index + 1,
    profile: profileMap.get(p.user_id) || { display_name: "User" },
  }));
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

// ============================================
// Admin Operations
// ============================================

/**
 * Create a new contest (admin only)
 */
export async function createContest(contestData: {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  duration: number;
  type: Contest["type"];
  visibility?: Contest["visibility"];
  max_participants?: number;
  rules?: string;
  prizes?: string;
}): Promise<Contest> {
  const { data, error } = await supabase
    .from("contests")
    .insert({
      ...contestData,
      status: "upcoming",
      format: "standard",
      visibility: contestData.visibility || "public",
      total_participants: 0,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating contest:", error);
    throw new Error(`Failed to create contest: ${error.message}`);
  }

  return data;
}

/**
 * Update a contest (admin only)
 */
export async function updateContest(
  contestId: string,
  updates: Partial<Contest>
): Promise<Contest> {
  const { data, error } = await supabase
    .from("contests")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", contestId)
    .select()
    .single();

  if (error) {
    console.error("Error updating contest:", error);
    throw new Error(`Failed to update contest: ${error.message}`);
  }

  return data;
}

/**
 * Delete a contest (admin only)
 */
export async function deleteContest(contestId: string): Promise<void> {
  // Delete related data first
  await supabase.from("contest_announcements").delete().eq("contest_id", contestId);
  await supabase.from("contest_submissions").delete().eq("contest_id", contestId);
  await supabase.from("contest_participants").delete().eq("contest_id", contestId);
  await supabase.from("contest_problems").delete().eq("contest_id", contestId);

  const { error } = await supabase
    .from("contests")
    .delete()
    .eq("id", contestId);

  if (error) {
    console.error("Error deleting contest:", error);
    throw new Error(`Failed to delete contest: ${error.message}`);
  }
}

/**
 * Add a problem to a contest (admin only)
 */
export async function addProblemToContest(
  contestId: string,
  problemId: number,
  orderIndex: number,
  points: number
): Promise<void> {
  const { error } = await supabase
    .from("contest_problems")
    .insert({
      contest_id: contestId,
      problem_id: problemId,
      order_index: orderIndex,
      points,
    });

  if (error) {
    console.error("Error adding problem to contest:", error);
    throw new Error(`Failed to add problem: ${error.message}`);
  }
}

/**
 * Remove a problem from a contest (admin only)
 */
export async function removeProblemFromContest(
  contestId: string,
  problemId: number
): Promise<void> {
  const { error } = await supabase
    .from("contest_problems")
    .delete()
    .eq("contest_id", contestId)
    .eq("problem_id", problemId);

  if (error) {
    throw new Error(`Failed to remove problem: ${error.message}`);
  }
}

/**
 * Create a contest announcement (admin only)
 */
export async function createAnnouncement(
  contestId: string,
  title: string,
  message: string,
  priority: ContestAnnouncement["priority"] = "normal"
): Promise<void> {
  const { error } = await supabase
    .from("contest_announcements")
    .insert({
      contest_id: contestId,
      title,
      message,
      priority,
    });

  if (error) {
    throw new Error(`Failed to create announcement: ${error.message}`);
  }
}

/**
 * Get all problems (for admin contest problem picker)
 */
export async function getAllProblems(): Promise<{ id: number; title: string; difficulty: string }[]> {
  const { data, error } = await supabase
    .from("problems")
    .select("id, title, difficulty")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching problems:", error);
    return [];
  }

  return data || [];
}

// ============================================
// Realtime Subscriptions
// ============================================

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
