
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ClassroomAnalytics } from '@/types/collaboration';

interface AnalyticsTabProps {
  analytics: ClassroomAnalytics;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ analytics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Algorithm Completion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(analytics.completionRates).map(([algorithm, rate]) => (
              <div key={algorithm} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-white/80 text-sm capitalize">
                    {algorithm.replace('-', ' ')}
                  </span>
                  <span className="text-white/60 text-sm">{(rate * 100).toFixed(0)}%</span>
                </div>
                <Progress value={rate * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Average Score</span>
                <span className="text-white font-semibold">
                  {analytics.performanceData.averageScore.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Improvement Rate</span>
                <span className="text-green-400 font-semibold">
                  +{analytics.performanceData.improvementRate.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Struggling Students</span>
                <span className="text-red-400 font-semibold">
                  {analytics.performanceData.strugglingStudents.length}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
