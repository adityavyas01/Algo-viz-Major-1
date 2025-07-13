
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, Calendar, TrendingUp, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { LearningReport } from '@/types/learning';

interface LearningReportsProps {
  reports: LearningReport[];
}

export const LearningReports: React.FC<LearningReportsProps> = ({ reports }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly'>('weekly');

  const currentReport = reports.find(r => r.period === selectedPeriod);

  if (!currentReport) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">No Reports Available</h3>
          <p className="text-white/60">Complete some learning activities to generate reports</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Learning Reports</h2>
        <p className="text-white/70">Track your progress and identify improvement areas</p>
      </div>

      <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as 'weekly' | 'monthly')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekly">Weekly Report</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedPeriod} className="space-y-6 mt-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{currentReport.totalStudyTime}h</div>
                <div className="text-white/60 text-sm">Study Time</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{currentReport.algorithmsCompleted}</div>
                <div className="text-white/60 text-sm">Algorithms</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{currentReport.averageAccuracy}%</div>
                <div className="text-white/60 text-sm">Accuracy</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{currentReport.goals.length}</div>
                <div className="text-white/60 text-sm">Goals Set</div>
              </CardContent>
            </Card>
          </div>

          {/* Strong Areas */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Strong Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentReport.strongAreas.map((area, index) => (
                  <Badge key={index} className="bg-green-500/20 text-green-300">
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Improvement Areas */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentReport.improvementAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Badge className="bg-orange-500/20 text-orange-300">
                      {area}
                    </Badge>
                    <div className="text-xs text-white/60">Focus area</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-500" />
                {selectedPeriod === 'weekly' ? 'This Week\'s' : 'This Month\'s'} Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentReport.goals.map((goal, index) => (
                  <div key={index} className="flex items-start gap-2 text-white/80">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    {goal}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentReport.nextRecommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 text-white/80">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report Period */}
          <div className="text-center text-white/50 text-sm">
            Report Period: {currentReport.startDate.toLocaleDateString()} - {currentReport.endDate.toLocaleDateString()}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
