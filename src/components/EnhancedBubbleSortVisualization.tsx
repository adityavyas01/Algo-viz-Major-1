import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVisualizationTheme } from '@/hooks/useVisualizationTheme';

export const EnhancedBubbleSortVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Enhanced Bubble Sort Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-8 text-center" style={{ color: currentTheme.colors.textSecondary }}>
          This component is temporarily disabled while we fix theme integration issues.
          Please check back later.
        </div>
      </CardContent>
    </Card>
  );
};
