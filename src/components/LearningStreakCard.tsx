
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Flame, Target, Calendar, Trophy } from 'lucide-react';
import { LearningStreak } from '@/types/learning';

interface LearningStreakCardProps {
  streak: LearningStreak;
  onUpdateGoal?: (newGoal: number) => void;
}

export const LearningStreakCard: React.FC<LearningStreakCardProps> = ({ 
  streak, 
  onUpdateGoal 
}) => {
  const progressPercentage = (streak.currentStreak / streak.streakGoal) * 100;
  const isOnTrack = streak.isActive && new Date().toDateString() === streak.lastActivityDate.toDateString();

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Flame className={`w-5 h-5 ${streak.isActive ? 'text-orange-500' : 'text-gray-500'}`} />
          Learning Streak
          {isOnTrack && (
            <Badge className="bg-green-500/20 text-green-300">
              Active Today
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {streak.currentStreak}
            </div>
            <div className="text-white/70 text-sm">
              {streak.streakType === 'daily' ? 'Days' : 'Weeks'} in a row
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/70">
              <span>Goal Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-xs text-white/50 text-center">
              {streak.streakGoal - streak.currentStreak} more to reach your goal
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <Trophy className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
              <div className="text-lg font-semibold text-white">{streak.longestStreak}</div>
              <div className="text-xs text-white/60">Best Streak</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <Target className="w-4 h-4 text-cyan-500 mx-auto mb-1" />
              <div className="text-lg font-semibold text-white">{streak.streakGoal}</div>
              <div className="text-xs text-white/60">Current Goal</div>
            </div>
          </div>

          {!isOnTrack && streak.isActive && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-300 text-sm">
                <Calendar className="w-4 h-4" />
                Complete today's practice to maintain your streak!
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
