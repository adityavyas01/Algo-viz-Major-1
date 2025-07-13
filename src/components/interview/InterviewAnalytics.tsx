
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Clock, Target, Award, AlertCircle } from 'lucide-react';
import { InterviewStats } from '@/types/interview';

const mockStats: InterviewStats = {
  totalInterviews: 23,
  averageScore: 78.5,
  strengthAreas: ['Array Problems', 'Tree Traversal', 'Basic Algorithms'],
  improvementAreas: ['Dynamic Programming', 'System Design', 'Graph Algorithms'],
  timeSpentPracticing: 127, // hours
  questionsAttempted: 342,
  successRate: 73.2,
  categoryBreakdown: [
    { category: 'Arrays', attempted: 85, correct: 68, averageTime: 18.5 },
    { category: 'Strings', attempted: 62, correct: 49, averageTime: 22.3 },
    { category: 'Trees', attempted: 54, correct: 45, averageTime: 25.8 },
    { category: 'Graphs', attempted: 31, correct: 19, averageTime: 35.2 },
    { category: 'Dynamic Programming', attempted: 28, correct: 15, averageTime: 42.1 },
    { category: 'System Design', attempted: 12, correct: 8, averageTime: 28.7 }
  ]
};

export const InterviewAnalytics: React.FC = () => {
  const getSuccessRate = (correct: number, attempted: number) => {
    return attempted > 0 ? (correct / attempted) * 100 : 0;
  };

  const getPerformanceColor = (rate: number) => {
    if (rate >= 80) return 'text-green-400';
    if (rate >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPerformanceIcon = (rate: number) => {
    if (rate >= 80) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (rate >= 60) return <Target className="w-4 h-4 text-yellow-400" />;
    return <TrendingDown className="w-4 h-4 text-red-400" />;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Total Interviews</p>
                <p className="text-2xl font-bold text-white">{mockStats.totalInterviews}</p>
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
                <p className="text-white/70 text-sm">Average Score</p>
                <p className="text-2xl font-bold text-white">{mockStats.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Practice Hours</p>
                <p className="text-2xl font-bold text-white">{mockStats.timeSpentPracticing}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <Target className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-white">{mockStats.successRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Performance by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStats.categoryBreakdown.map((category, index) => {
                const successRate = getSuccessRate(category.correct, category.attempted);
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getPerformanceIcon(successRate)}
                        <span className="text-white font-medium">{category.category}</span>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${getPerformanceColor(successRate)}`}>
                          {successRate.toFixed(0)}%
                        </div>
                        <div className="text-white/60 text-xs">
                          {category.correct}/{category.attempted}
                        </div>
                      </div>
                    </div>
                    <Progress value={successRate} className="h-2" />
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Avg time: {category.averageTime}min</span>
                      <span>{category.attempted} attempted</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Strength Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockStats.strengthAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-green-500/20 rounded-lg">
                    <span className="text-white">{area}</span>
                    <Badge className="bg-green-500 text-white">Strong</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockStats.improvementAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-red-500/20 rounded-lg">
                    <span className="text-white">{area}</span>
                    <Badge className="bg-red-500 text-white">Focus</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2 hours ago', activity: 'Completed "Two Sum" problem', score: 95, difficulty: 'Easy' },
              { date: '1 day ago', activity: 'Mock interview with Google track', score: 78, difficulty: 'Hard' },
              { date: '2 days ago', activity: 'Practiced Binary Tree problems', score: 82, difficulty: 'Medium' },
              { date: '3 days ago', activity: 'System Design: Design Twitter', score: 65, difficulty: 'Hard' },
              { date: '1 week ago', activity: 'Dynamic Programming practice session', score: 71, difficulty: 'Medium' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                <div>
                  <div className="text-white font-medium">{item.activity}</div>
                  <div className="text-white/60 text-sm">{item.date}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={`${
                      item.difficulty === 'Easy' ? 'bg-green-500' :
                      item.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                    } text-white`}
                  >
                    {item.difficulty}
                  </Badge>
                  <div className={`font-semibold ${getPerformanceColor(item.score)}`}>
                    {item.score}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
