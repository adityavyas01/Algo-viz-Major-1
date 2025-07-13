
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ClassroomAnalytics } from '@/types/collaboration';
import { 
  Users, 
  TrendingUp, 
  BarChart3,
  Clock
} from 'lucide-react';

interface AnalyticsOverviewProps {
  analytics: ClassroomAnalytics;
}

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ analytics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Total Students</p>
              <p className="text-2xl font-bold text-white">{analytics.totalStudents}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Active Students</p>
              <p className="text-2xl font-bold text-white">{analytics.activeStudents}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Avg Progress</p>
              <p className="text-2xl font-bold text-white">{analytics.averageProgress.toFixed(1)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Avg Session Time</p>
              <p className="text-2xl font-bold text-white">{analytics.engagementMetrics.averageSessionTime}m</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
