
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';

interface CategoryData {
  category: string;
  completed: number;
  total: number;
}

interface CategoryProgressProps {
  data: CategoryData[];
}

export const CategoryProgress: React.FC<CategoryProgressProps> = ({ data }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Progress by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((category, index) => {
            const progress = (category.completed / category.total) * 100;
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{category.category}</span>
                  <span className="text-white/70 text-sm">
                    {category.completed}/{category.total}
                  </span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
