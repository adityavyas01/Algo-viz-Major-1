/**
 * useDashboardData Hook
 * Fetches real dashboard data from Supabase:
 * - User stats (points, streak, problems solved, accuracy)
 * - Daily activity (for progress chart)
 * - Topic proficiency (skill metrics)
 * - Achievements
 * - Recent activity feed
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

export interface DashboardStats {
  totalPoints: number;
  currentStreak: number;
  problemsSolved: number;
  accuracy: number;
  level: number;
  rank: number;
  algorithmsCompleted: number;
  challengesCompleted: number;
}

export interface DailyActivityEntry {
  date: string;
  problemsSolved: number;
  submissionsCount: number;
  timeSpentMinutes: number;
}

export interface TopicProficiency {
  topic: string;
  proficiencyScore: number;
}

export interface UserAchievement {
  id: string;
  achievementType: string;
  achievementName: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface ActivityFeedItem {
  id: string;
  activityType: string;
  metadata: Record<string, any>;
  createdAt: string;
}

export interface DashboardData {
  stats: DashboardStats;
  dailyActivity: DailyActivityEntry[];
  topicProficiency: TopicProficiency[];
  achievements: UserAchievement[];
  activityFeed: ActivityFeedItem[];
  isLoading: boolean;
  error: string | null;
}

const DEFAULT_STATS: DashboardStats = {
  totalPoints: 0,
  currentStreak: 0,
  problemsSolved: 0,
  accuracy: 0,
  level: 1,
  rank: 0,
  algorithmsCompleted: 0,
  challengesCompleted: 0,
};

export function useDashboardData(): DashboardData {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_STATS);
  const [dailyActivity, setDailyActivity] = useState<DailyActivityEntry[]>([]);
  const [topicProficiency, setTopicProficiency] = useState<TopicProficiency[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch all data in parallel
        const [statsRes, dailyRes, proficiencyRes, achievementsRes, feedRes] =
          await Promise.allSettled([
            // 1. User stats
            supabase
              .from('user_stats')
              .select('*')
              .eq('user_id', user.id)
              .single(),

            // 2. Daily activity (last 30 days)
            supabase
              .from('daily_activity')
              .select('activity_date, submissions_count, problems_solved, time_spent_minutes')
              .eq('user_id', user.id)
              .gte('activity_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
              .order('activity_date', { ascending: true }),

            // 3. Topic proficiency
            supabase
              .from('user_topic_proficiency')
              .select('topic, proficiency_score')
              .eq('user_id', user.id)
              .order('proficiency_score', { ascending: false }),

            // 4. Achievements
            supabase
              .from('user_achievements')
              .select('id, achievement_type, achievement_name, description, icon, earned_at')
              .eq('user_id', user.id)
              .order('earned_at', { ascending: false })
              .limit(10),

            // 5. Activity feed (last 10 entries)
            supabase
              .from('activity_feed')
              .select('id, activity_type, metadata, created_at')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
              .limit(10),
          ]);

        // Process user stats
        if (statsRes.status === 'fulfilled' && statsRes.value.data) {
          const s = statsRes.value.data;
          setStats({
            totalPoints: s.total_points || 0,
            currentStreak: s.current_streak || 0,
            problemsSolved: s.challenges_completed || 0,
            accuracy: 0, // calculated below from daily_activity
            level: s.level || 1,
            rank: s.rank || 0,
            algorithmsCompleted: s.algorithms_completed || 0,
            challengesCompleted: s.challenges_completed || 0,
          });
        }

        // Process daily activity
        if (dailyRes.status === 'fulfilled' && dailyRes.value.data) {
          const daily = dailyRes.value.data.map((d: any) => ({
            date: d.activity_date,
            problemsSolved: d.problems_solved || 0,
            submissionsCount: d.submissions_count || 0,
            timeSpentMinutes: d.time_spent_minutes || 0,
          }));
          setDailyActivity(daily);

          // Calculate accuracy from daily activity
          const totalSolved = daily.reduce((sum: number, d: DailyActivityEntry) => sum + d.problemsSolved, 0);
          const totalSubmissions = daily.reduce((sum: number, d: DailyActivityEntry) => sum + d.submissionsCount, 0);
          if (totalSubmissions > 0) {
            const accuracy = Math.round((totalSolved / totalSubmissions) * 100);
            setStats(prev => ({
              ...prev,
              accuracy,
              // Also update problemsSolved from daily if user_stats didn't have it
              problemsSolved: prev.problemsSolved || totalSolved,
            }));
          }
        }

        // Process topic proficiency
        if (proficiencyRes.status === 'fulfilled' && proficiencyRes.value.data) {
          setTopicProficiency(
            proficiencyRes.value.data.map((p: any) => ({
              topic: p.topic,
              proficiencyScore: Number(p.proficiency_score) || 0,
            }))
          );
        }

        // Process achievements
        if (achievementsRes.status === 'fulfilled' && achievementsRes.value.data) {
          setAchievements(
            achievementsRes.value.data.map((a: any) => ({
              id: a.id,
              achievementType: a.achievement_type,
              achievementName: a.achievement_name,
              description: a.description || '',
              icon: a.icon || '🏆',
              earnedAt: a.earned_at,
            }))
          );
        }

        // Process activity feed
        if (feedRes.status === 'fulfilled' && feedRes.value.data) {
          setActivityFeed(
            feedRes.value.data.map((f: any) => ({
              id: f.id,
              activityType: f.activity_type,
              metadata: f.metadata || {},
              createdAt: f.created_at,
            }))
          );
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id]);

  return {
    stats,
    dailyActivity,
    topicProficiency,
    achievements,
    activityFeed,
    isLoading,
    error,
  };
}
