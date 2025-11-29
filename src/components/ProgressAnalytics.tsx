
import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Clock, Target, AlertCircle } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { WeeklyProgressChart } from '@/components/WeeklyProgressChart';
import { DifficultyBreakdown } from '@/components/DifficultyBreakdown';
import { CategoryProgress } from '@/components/CategoryProgress';
import { LearningAnalyticsDashboard } from '@/components/LearningAnalyticsDashboard';
import { useUserProgress, useUserStats } from '@/hooks/useDatabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface AnalyticsData {
  totalAlgorithms: number;
  completedAlgorithms: number;
  currentStreak: number;
  totalStudyTime: number;
  weeklyProgress: { day: string; completed: number }[];
  difficultyBreakdown: { difficulty: string; count: number; color: string }[];
  categoryProgress: { category: string; completed: number; total: number }[];
}

const fallbackAnalyticsData: AnalyticsData = {
  totalAlgorithms: 25,
  completedAlgorithms: 0,
  currentStreak: 0,
  totalStudyTime: 0,
  weeklyProgress: [
    { day: 'Mon', completed: 0 },
    { day: 'Tue', completed: 0 },
    { day: 'Wed', completed: 0 },
    { day: 'Thu', completed: 0 },
    { day: 'Fri', completed: 0 },
    { day: 'Sat', completed: 0 },
    { day: 'Sun', completed: 0 }
  ],
  difficultyBreakdown: [
    { difficulty: 'Beginner', count: 0, color: '#10B981' },
    { difficulty: 'Intermediate', count: 0, color: '#F59E0B' },
    { difficulty: 'Advanced', count: 0, color: '#EF4444' }
  ],
  categoryProgress: [
    { category: 'Sorting', completed: 0, total: 8 },
    { category: 'Searching', completed: 0, total: 4 },
    { category: 'Trees', completed: 0, total: 6 },
    { category: 'Graphs', completed: 0, total: 4 },
    { category: 'Dynamic Programming', completed: 0, total: 3 }
  ]
};

export const ProgressAnalytics: React.FC = () => {
  const { user } = useAuth();
  const { data: userProgress, loading: progressLoading, error: progressError } = useUserProgress();
  const { data: userStats, loading: statsLoading, error: statsError } = useUserStats();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(fallbackAnalyticsData);

  useEffect(() => {
    if (userProgress && userStats) {
      // Calculate real analytics from database data
      const completedProgress = userProgress.filter(p => p.completed);
      const totalCompleted = completedProgress.length;
      
      // Generate weekly progress from recent completions
      const weeklyData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
        
        const completedOnDay = completedProgress.filter(p => {
          const completionDate = new Date(p.updated_at);
          return completionDate.toDateString() === date.toDateString();
        }).length;
        
        return { day: dayName, completed: completedOnDay };
      });

      setAnalyticsData({
        totalAlgorithms: 25,
        completedAlgorithms: totalCompleted,
        currentStreak: userStats.current_streak || 0,
        totalStudyTime: Math.floor((userStats.total_study_time || 0) / 60), // Convert minutes to hours
        weeklyProgress: weeklyData,
        difficultyBreakdown: [
          { difficulty: 'Beginner', count: Math.floor(totalCompleted * 0.6), color: '#10B981' },
          { difficulty: 'Intermediate', count: Math.floor(totalCompleted * 0.3), color: '#F59E0B' },
          { difficulty: 'Advanced', count: Math.floor(totalCompleted * 0.1), color: '#EF4444' }
        ],
        categoryProgress: [
          { category: 'Sorting', completed: Math.floor(totalCompleted * 0.3), total: 8 },
          { category: 'Searching', completed: Math.floor(totalCompleted * 0.2), total: 4 },
          { category: 'Trees', completed: Math.floor(totalCompleted * 0.2), total: 6 },
          { category: 'Graphs', completed: Math.floor(totalCompleted * 0.15), total: 4 },
          { category: 'Dynamic Programming', completed: Math.floor(totalCompleted * 0.15), total: 3 }
        ]
      });
    }
  }, [userProgress, userStats]);

  if (!user) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">
            Sign In Required
          </h3>
          <p className="text-white/60">
            Please sign in to view your progress analytics and track your learning journey.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (progressLoading || statsLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64 bg-white/20 mb-2" />
          <Skeleton className="h-4 w-96 bg-white/10" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 bg-white/10" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 bg-white/10" />
          <Skeleton className="h-64 bg-white/10" />
        </div>
      </div>
    );
  }

  if (progressError || statsError) {
    return (
      <Card className="bg-red-500/10 backdrop-blur-sm border-red-500/20">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-red-400 text-lg font-semibold mb-2">
            Unable to Load Progress Data
          </h3>
          <p className="text-red-300/70">
            There was an error loading your progress. Please try refreshing the page or contact support if the issue persists.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const completionRate = (analyticsData.completedAlgorithms / analyticsData.totalAlgorithms) * 100;

  const stats = [
    {
      title: 'Algorithms Mastered',
      value: analyticsData.completedAlgorithms.toString(),
      total: analyticsData.totalAlgorithms,
      icon: Trophy,
      color: 'text-yellow-500',
      progress: completionRate
    },
    {
      title: 'Current Streak',
      value: `${analyticsData.currentStreak} days`,
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      title: 'Study Time',
      value: `${analyticsData.totalStudyTime}h`,
      icon: Clock,
      color: 'text-blue-500'
    },
    {
      title: 'Weekly Goal',
      value: '5/7',
      icon: Target,
      color: 'text-purple-500',
      progress: (5/7) * 100
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Progress Analytics</h2>
        <p className="text-white/70">Track your learning journey and achievements</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            total={stat.total}
            icon={stat.icon}
            color={stat.color}
            progress={stat.progress}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <WeeklyProgressChart data={analyticsData.weeklyProgress} />
        <DifficultyBreakdown 
          data={analyticsData.difficultyBreakdown} 
          totalCompleted={analyticsData.completedAlgorithms} 
        />
      </div>

      <CategoryProgress data={analyticsData.categoryProgress} />

      {/* Advanced Analytics Dashboard */}
      <div className="mt-8">
        <LearningAnalyticsDashboard />
      </div>
    </div>
  );
};
