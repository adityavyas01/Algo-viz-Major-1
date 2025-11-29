import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Zap, Award } from 'lucide-react';

const GamificationWidget = () => {
  // Mock data - replace with real data from your context or API
  const userStats = {
    level: 15,
    points: 2500,
    pointsToNextLevel: 3000,
    dailyStreak: 5,
    achievements: 12,
  };

  const levelProgress = (userStats.points / userStats.pointsToNextLevel) * 100;

  return (
    <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-cyan-300">Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level and Points */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="font-bold text-xl">Level {userStats.level}</span>
            <span className="text-sm text-white/70">{userStats.points} / {userStats.pointsToNextLevel} XP</span>
          </div>
          <Progress value={levelProgress} className="w-full h-2 bg-white/10 [&>div]:bg-gradient-to-r [&>div]:from-cyan-400 [&>div]:to-blue-500" />
        </div>

        {/* Daily Streak */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">Daily Streak</span>
          </div>
          <span className="font-bold text-lg text-yellow-400">{userStats.dailyStreak} Days</span>
        </div>

        {/* Achievements */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-purple-400" />
            <span className="font-semibold">Achievements Unlocked</span>
          </div>
          <span className="font-bold text-lg text-purple-400">{userStats.achievements}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GamificationWidget;
