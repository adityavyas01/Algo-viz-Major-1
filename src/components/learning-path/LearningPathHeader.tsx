import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Star, Clock, BookOpen } from 'lucide-react';

interface LearningPathHeaderProps {
  name: string;
  description: string;
  completion_percentage: number;
  estimated_weeks: number;
  moduleCount: number;
}

export const LearningPathHeader: React.FC<LearningPathHeaderProps> = ({
  name,
  description,
  completion_percentage,
  estimated_weeks,
  moduleCount
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              {name}
            </CardTitle>
            <p className="text-white/70 mt-1">{description}</p>
          </div>
          <div className="text-right">
            <div className="text-white/70 text-sm">Overall Progress</div>
            <div className="text-white font-bold text-xl">{completion_percentage}%</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={completion_percentage} className="w-full h-3" />
          <div className="flex items-center justify-between text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{estimated_weeks} weeks estimated</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{moduleCount} modules</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};