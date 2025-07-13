import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Lock, ArrowRight, Trophy, Check } from 'lucide-react';

interface LearningModule {
  id: string;
  topic_id: string;
  module_order: number;
  estimated_hours: number;
  is_unlocked: boolean;
  is_completed: boolean;
  topic: {
    name: string;
    description: string;
    difficulty_level: number;
    category: string;
  };
}

interface LearningPathModuleProps {
  module: LearningModule;
  isNextToUnlock: boolean;
  onStartLearning: (moduleId: string, topicName: string) => void;
  onCompleteModule: (moduleId: string) => void;
}

export const LearningPathModule: React.FC<LearningPathModuleProps> = ({
  module,
  isNextToUnlock,
  onStartLearning,
  onCompleteModule
}) => {
  const getDifficultyColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-orange-500';
      case 4: return 'bg-red-500';
      case 5: return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyText = (level: number) => {
    switch (level) {
      case 1: return 'Beginner';
      case 2: return 'Easy';
      case 3: return 'Medium';
      case 4: return 'Hard';
      case 5: return 'Expert';
      default: return 'Unknown';
    }
  };

  return (
    <Card
      className={`border-white/20 transition-all ${
        module.is_unlocked 
          ? 'bg-white/10 backdrop-blur-sm hover:bg-white/15' 
          : 'bg-white/5 backdrop-blur-sm opacity-60'
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              module.is_completed 
                ? 'bg-green-500' 
                : module.is_unlocked 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                  : 'bg-white/20'
            }`}>
              {module.is_completed ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : module.is_unlocked ? (
                <span className="text-white text-sm font-bold">{module.module_order}</span>
              ) : (
                <Lock className="w-5 h-5 text-white/70" />
              )}
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold text-lg ${
                module.is_unlocked ? 'text-white' : 'text-white/50'
              }`}>
                {module.topic.name}
              </h3>
              <p className={`text-sm ${
                module.is_unlocked ? 'text-white/70' : 'text-white/40'
              }`}>
                {module.topic.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge 
                  className={`${getDifficultyColor(module.topic.difficulty_level)} text-white text-xs`}
                >
                  {getDifficultyText(module.topic.difficulty_level)}
                </Badge>
                <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                  {module.topic.category}
                </Badge>
                <Badge variant="outline" className="text-xs border-white/30 text-white/70">
                  {module.estimated_hours}h
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {module.is_completed && (
              <Badge className="bg-green-500 text-white">
                <Trophy className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
            {module.is_unlocked && !module.is_completed && (
              <div className="flex gap-2">
                <Button
                  onClick={() => onStartLearning(module.id, module.topic.name)}
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  onClick={() => onCompleteModule(module.id)}
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white/70 hover:bg-white/10"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Mark Complete
                </Button>
              </div>
            )}
            {!module.is_unlocked && !isNextToUnlock && (
              <Badge variant="outline" className="text-white/50 border-white/30">
                Locked
              </Badge>
            )}
            {isNextToUnlock && (
              <Badge className="bg-yellow-500 text-white">
                Next to Unlock
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};