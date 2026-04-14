/**
 * Post-Submission Stats Service
 * Called after a successful submission to update user stats, streaks,
 * check achievements, and generate notifications.
 *
 * Actual user_stats columns:
 *   algorithms_completed, challenges_completed, current_streak,
 *   experience, level, rank, total_points, total_study_time, user_id
 *
 * Actual user_achievements columns:
 *   achievement_name, achievement_type, description, earned_at, icon, user_id
 *
 * Actual daily_activity columns:
 *   user_id, activity_date, submissions_count, problems_solved, time_spent_minutes
 */

import { supabase } from "@/integrations/supabase/client";

// ── Achievement definitions ──────────────────────────────────────────
interface AchievementDef {
  type: string;
  name: string;          // maps to achievement_name
  description: string;
  icon: string;
  check: (stats: UserStatsSnapshot) => boolean;
}

interface UserStatsSnapshot {
  challenges_completed: number;
  current_streak: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
}

const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    type: "first_blood",
    name: "First Blood",
    icon: "🩸",
    description: "Solved your first problem",
    check: (s) => s.challenges_completed >= 1,
  },
  {
    type: "problem_solver_10",
    name: "Problem Solver",
    icon: "🧩",
    description: "Solved 10 problems",
    check: (s) => s.challenges_completed >= 10,
  },
  {
    type: "century_100",
    name: "Century Club",
    icon: "💯",
    description: "Solved 100 problems",
    check: (s) => s.challenges_completed >= 100,
  },
  {
    type: "streak_3",
    name: "On Fire",
    icon: "🔥",
    description: "Maintained a 3-day streak",
    check: (s) => s.current_streak >= 3,
  },
  {
    type: "streak_7",
    name: "Unstoppable",
    icon: "🚀",
    description: "Maintained a 7-day streak",
    check: (s) => s.current_streak >= 7,
  },
  {
    type: "streak_30",
    name: "Monthly Master",
    icon: "🏆",
    description: "Maintained a 30-day streak",
    check: (s) => s.current_streak >= 30,
  },
  {
    type: "easy_10",
    name: "Easy Peasy",
    icon: "🟢",
    description: "Solved 10 Easy problems",
    check: (s) => s.easy_solved >= 10,
  },
  {
    type: "medium_10",
    name: "Medium Mastery",
    icon: "🟡",
    description: "Solved 10 Medium problems",
    check: (s) => s.medium_solved >= 10,
  },
  {
    type: "hard_5",
    name: "Hard Hitter",
    icon: "🔴",
    description: "Solved 5 Hard problems",
    check: (s) => s.hard_solved >= 5,
  },
];

// ── Points per difficulty ────────────────────────────────────────────
const POINTS_MAP: Record<string, number> = {
  Easy: 10,
  Medium: 25,
  Hard: 50,
};

// ── Main entry point ─────────────────────────────────────────────────

/**
 * Call this after a submission is recorded.
 * Updates user_stats, daily_activity, streaks, achievements, and notifications.
 */
export async function updatePostSubmissionStats(
  userId: string,
  _problemId: string,
  isAccepted: boolean,
  difficulty: string
): Promise<void> {
  try {
    // Run stat updates in parallel where possible
    await Promise.allSettled([
      updateUserStats(userId, isAccepted, difficulty),
      updateDailyActivity(userId, isAccepted),
    ]);

    // After stats are updated, calculate streak
    const streak = await calculateStreak(userId);
    await updateStreak(userId, streak);

    // Only check achievements if submission was accepted
    if (isAccepted) {
      await checkAndAwardAchievements(userId);
    }
  } catch (error) {
    // Don't let stats errors break the submission flow
    console.error("Error updating post-submission stats:", error);
  }
}

// ── Update user_stats ────────────────────────────────────────────────

async function updateUserStats(
  userId: string,
  isAccepted: boolean,
  difficulty: string
): Promise<void> {
  const { data: existing } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  const points = isAccepted ? (POINTS_MAP[difficulty] || 10) : 0;

  if (existing) {
    const newCompleted = isAccepted
      ? (existing.challenges_completed || 0) + 1
      : existing.challenges_completed || 0;
    const newPoints = (existing.total_points || 0) + points;
    const newExperience = (existing.experience || 0) + points;
    // Level up every 100 XP
    const newLevel = Math.floor(newExperience / 100) + 1;

    await supabase
      .from("user_stats")
      .update({
        challenges_completed: newCompleted,
        total_points: newPoints,
        experience: newExperience,
        level: newLevel,
      })
      .eq("user_id", userId);
  } else {
    // Create stats row if it doesn't exist
    await supabase.from("user_stats").insert({
      user_id: userId,
      challenges_completed: isAccepted ? 1 : 0,
      algorithms_completed: 0,
      total_points: points,
      experience: points,
      level: 1,
      rank: 0,
      current_streak: 0,
      total_study_time: 0,
    });
  }
}

// ── Update daily_activity ────────────────────────────────────────────

async function updateDailyActivity(
  userId: string,
  isAccepted: boolean
): Promise<void> {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const { data: existing } = await supabase
    .from("daily_activity")
    .select("*")
    .eq("user_id", userId)
    .eq("activity_date", today)
    .single();

  if (existing) {
    await supabase
      .from("daily_activity")
      .update({
        submissions_count: (existing.submissions_count || 0) + 1,
        problems_solved: isAccepted
          ? (existing.problems_solved || 0) + 1
          : existing.problems_solved || 0,
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("daily_activity").insert({
      user_id: userId,
      activity_date: today,
      submissions_count: 1,
      problems_solved: isAccepted ? 1 : 0,
      time_spent_minutes: 0,
    });
  }
}

// ── Streak calculation ───────────────────────────────────────────────

async function calculateStreak(userId: string): Promise<number> {
  // Fetch last 60 days of activity, ordered desc
  const { data: activities } = await supabase
    .from("daily_activity")
    .select("activity_date")
    .eq("user_id", userId)
    .order("activity_date", { ascending: false })
    .limit(60);

  if (!activities || activities.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activityDates = new Set(
    activities.map((a) => a.activity_date) // already YYYY-MM-DD strings
  );

  // Count consecutive days starting from today (or yesterday if no activity today yet)
  const checkDate = new Date(today);

  // If no activity today, check if yesterday has activity (allow "in-progress" day)
  if (!activityDates.has(formatDate(checkDate))) {
    checkDate.setDate(checkDate.getDate() - 1);
    if (!activityDates.has(formatDate(checkDate))) {
      return 0; // No activity yesterday either — streak broken
    }
  }

  // Count consecutive days backwards
  while (activityDates.has(formatDate(checkDate))) {
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return streak;
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

async function updateStreak(userId: string, streak: number): Promise<void> {
  await supabase
    .from("user_stats")
    .update({ current_streak: streak })
    .eq("user_id", userId);
}

// ── Achievement checking ─────────────────────────────────────────────

async function checkAndAwardAchievements(userId: string): Promise<void> {
  // Fetch current stats snapshot
  const { data: stats } = await supabase
    .from("user_stats")
    .select("challenges_completed, current_streak")
    .eq("user_id", userId)
    .single();

  if (!stats) return;

  // Get difficulty breakdown from user_problem_progress
  const { data: progress } = await supabase
    .from("user_problem_progress")
    .select("problem:problems(difficulty)")
    .eq("user_id", userId)
    .eq("status", "solved");

  const easySolved = progress?.filter(
    (p: any) => p.problem?.difficulty === "Easy"
  ).length || 0;
  const mediumSolved = progress?.filter(
    (p: any) => p.problem?.difficulty === "Medium"
  ).length || 0;
  const hardSolved = progress?.filter(
    (p: any) => p.problem?.difficulty === "Hard"
  ).length || 0;

  const snapshot: UserStatsSnapshot = {
    challenges_completed: stats.challenges_completed || 0,
    current_streak: stats.current_streak || 0,
    easy_solved: easySolved,
    medium_solved: mediumSolved,
    hard_solved: hardSolved,
  };

  // Fetch already earned achievements
  const { data: earned } = await supabase
    .from("user_achievements")
    .select("achievement_type")
    .eq("user_id", userId);

  const earnedTypes = new Set(earned?.map((e) => e.achievement_type) || []);

  // Check each definition
  for (const def of ACHIEVEMENT_DEFS) {
    if (earnedTypes.has(def.type)) continue; // Already earned
    if (!def.check(snapshot)) continue;      // Threshold not met

    // Award achievement
    await supabase.from("user_achievements").insert({
      user_id: userId,
      achievement_type: def.type,
      achievement_name: def.name,
      description: def.description,
      icon: def.icon,
      earned_at: new Date().toISOString(),
    });

    // Generate notification (NotificationBell picks this up via realtime)
    await supabase.from("notifications").insert({
      user_id: userId,
      title: `Achievement Unlocked: ${def.name} ${def.icon}`,
      message: def.description,
      type: "success",
      is_read: false,
    });
  }
}
