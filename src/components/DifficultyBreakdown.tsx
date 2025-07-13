
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code } from 'lucide-react';

interface DifficultyData {
  difficulty: string;
  count: number;
  color: string;
}

interface DifficultyBreakdownProps {
  data: DifficultyData[];
  totalCompleted: number;
}

export const DifficultyBreakdown: React.FC<DifficultyBreakdownProps> = ({ 
  data, 
  totalCompleted 
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Code className="w-5 h-5" />
          Difficulty Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-white">{item.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{item.count}</span>
                <Badge 
                  style={{ backgroundColor: item.color }}
                  className="text-white"
                >
                  {Math.round((item.count / totalCompleted) * 100)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
