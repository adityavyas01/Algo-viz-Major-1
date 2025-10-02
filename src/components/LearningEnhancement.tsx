
import React, { useState } from 'react';
import { Flame, Brain, Award, Heart, Target, TrendingUp } from 'lucide-react';
import { mockLearningStreak } from '@/data/learningData';

export const LearningEnhancement: React.FC = () => {
  const [learningStreak] = useState(mockLearningStreak);

  // Compact enhancement tools for sidebar
  const enhancementTools = [
    { icon: Flame, title: 'Streak', value: `${learningStreak.currentStreak} days`, color: 'from-orange-500 to-red-500' },
    { icon: Brain, title: 'Level', value: 'Intermediate', color: 'from-blue-500 to-purple-500' },
    { icon: Award, title: 'Badges', value: '12 earned', color: 'from-yellow-500 to-orange-500' },
  ];



  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-white/80 text-sm mb-4">Your learning tools</p>
      </div>

      <div className="space-y-3">
        {enhancementTools.map((tool, index) => {
          const IconComponent = tool.icon;
          return (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{tool.title}</p>
                    <p className="text-white/60 text-xs">{tool.value}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-white" />
          </div>
          <p className="text-white text-sm font-medium mb-1">Daily Goal</p>
          <p className="text-white/60 text-xs mb-2">3/5 algorithms completed</p>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-3/5"></div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Progress</p>
              <p className="text-white/60 text-xs">+15% this week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
