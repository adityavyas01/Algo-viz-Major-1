import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const EmptyLearningPath: React.FC = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">No Learning Path Found</h3>
        <p className="text-white/70 mb-4">Complete the skills assessment to get your personalized learning path.</p>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
          Take Assessment
        </Button>
      </CardContent>
    </Card>
  );
};