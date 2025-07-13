
import React from 'react';
import { Trophy, TrendingUp, Clock, Target } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { WeeklyProgressChart } from '@/components/WeeklyProgressChart';
import { DifficultyBreakdown } from '@/components/DifficultyBreakdown';
import { CategoryProgress } from '@/components/CategoryProgress';

interface AnalyticsData {
  totalAlgorithms: number;
  completedAlgorithms: number;
  currentStreak: number;
  totalStudyTime: number;
  weeklyProgress: { day: string; completed: number }[];
  difficultyBreakdown: { difficulty: string; count: number; color: string }[];
  categoryProgress: { category: string; completed: number; total: number }[];
}

const mockAnalyticsData: AnalyticsData = {
  totalAlgorithms: 25,
  completedAlgorithms: 12,
  currentStreak: 7,
  totalStudyTime: 24,
  weeklyProgress: [
    { day: 'Mon', completed: 2 },
    { day: 'Tue', completed: 1 },
    { day: 'Wed', completed: 3 },
    { day: 'Thu', completed: 0 },
    { day: 'Fri', completed: 2 },
    { day: 'Sat', completed: 1 },
    { day: 'Sun', completed: 1 }
  ],
  difficultyBreakdown: [
    { difficulty: 'Beginner', count: 8, color: '#10B981' },
    { difficulty: 'Intermediate', count: 3, color: '#F59E0B' },
    { difficulty: 'Advanced', count: 1, color: '#EF4444' }
  ],
  categoryProgress: [
    { category: 'Sorting', completed: 5, total: 8 },
    { category: 'Searching', completed: 3, total: 4 },
    { category: 'Trees', completed: 2, total: 6 },
    { category: 'Graphs', completed: 1, total: 4 },
    { category: 'Dynamic Programming', completed: 1, total: 3 }
  ]
};

export const ProgressAnalytics: React.FC = () => {
  const data = mockAnalyticsData;
  const completionRate = (data.completedAlgorithms / data.totalAlgorithms) * 100;

  const stats = [
    {
      title: 'Algorithms Mastered',
      value: data.completedAlgorithms.toString(),
      total: data.totalAlgorithms,
      icon: Trophy,
      color: 'text-yellow-500',
      progress: completionRate
    },
    {
      title: 'Current Streak',
      value: `${data.currentStreak} days`,
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      title: 'Study Time',
      value: `${data.totalStudyTime}h`,
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
        <WeeklyProgressChart data={data.weeklyProgress} />
        <DifficultyBreakdown 
          data={data.difficultyBreakdown} 
          totalCompleted={data.completedAlgorithms} 
        />
      </div>

      <CategoryProgress data={data.categoryProgress} />
    </div>
  );
};
