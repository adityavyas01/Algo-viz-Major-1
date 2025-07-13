
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap, Clock, Target, TrendingUp, Award } from 'lucide-react';
import { UserStats } from '@/types/gamification';

interface UserStatsOverviewProps {
  stats: UserStats;
}

export const UserStatsOverview: React.FC<UserStatsOverviewProps> = ({ stats }) => {
  const nextLevelXP = (stats.level + 1) * 1000;
  const currentLevelXP = stats.level * 1000;
  const progressToNextLevel = ((stats.experience - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  const statItems = [
    {
      label: 'Total Points',
      value: stats.totalPoints.toLocaleString(),
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      label: 'Current Streak',
      value: `${stats.currentStreak} days`,
      icon: Zap,
      color: 'text-orange-500'
    },
    {
      label: 'Study Time',
      value: `${stats.totalStudyTime}h`,
      icon: Clock,
      color: 'text-blue-500'
    },
    {
      label: 'Global Rank',
      value: `#${stats.rank}`,
      icon: TrendingUp,
      color: 'text-green-500'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Level and XP Progress */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <CardTitle className="text-white">Level {stats.level}</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              {stats.experience.toLocaleString()} XP
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/70">
              <span>Progress to Level {stats.level + 1}</span>
              <span>{Math.round(progressToNextLevel)}%</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2" />
            <div className="text-xs text-white/50 text-center">
              {(nextLevelXP - stats.experience).toLocaleString()} XP to next level
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <div className="text-white font-semibold">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Stats */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{stats.algorithmsCompleted}</div>
              <div className="text-white/60 text-sm">Algorithms Mastered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.challengesCompleted}</div>
              <div className="text-white/60 text-sm">Challenges Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
