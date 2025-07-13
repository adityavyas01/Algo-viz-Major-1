
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  total?: number;
  icon: LucideIcon;
  color: string;
  progress?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  total,
  icon: IconComponent,
  color,
  progress
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-sm">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {total && (
              <p className="text-white/50 text-sm">of {total}</p>
            )}
          </div>
          <IconComponent className={`w-8 h-8 ${color}`} />
        </div>
        {progress && (
          <Progress value={progress} className="w-full" />
        )}
      </CardContent>
    </Card>
  );
};
