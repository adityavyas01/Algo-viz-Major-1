
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Achievement } from '@/types/gamification';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  achievement, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-20',
    md: 'w-20 h-24',
    lg: 'w-24 h-28'
  };

  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  const rarityColors = {
    common: 'border-gray-400 bg-gray-100',
    rare: 'border-blue-400 bg-blue-100',
    epic: 'border-purple-400 bg-purple-100',
    legendary: 'border-yellow-400 bg-yellow-100'
  };

  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <div className={`${sizeClasses[size]} flex flex-col items-center p-2 rounded-lg border-2 ${
      achievement.unlocked 
        ? rarityColors[achievement.rarity]
        : 'border-gray-300 bg-gray-50 opacity-60'
    }`}>
      <div className={`${iconSizes[size]} mb-1 ${achievement.unlocked ? '' : 'grayscale'}`}>
        {achievement.icon}
      </div>
      <div className="text-xs font-medium text-center leading-tight mb-1">
        {achievement.name}
      </div>
      
      {!achievement.unlocked && achievement.progress > 0 && (
        <div className="w-full">
          <Progress value={progressPercentage} className="h-1" />
          <div className="text-xs text-gray-500 text-center mt-1">
            {achievement.progress}/{achievement.maxProgress}
          </div>
        </div>
      )}

      {achievement.unlocked && (
        <Badge variant="secondary" className="text-xs px-1 py-0">
          +{achievement.points}
        </Badge>
      )}
    </div>
  );
};
