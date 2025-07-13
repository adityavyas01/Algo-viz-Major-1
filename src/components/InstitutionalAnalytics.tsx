
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Clock, 
  Award,
  Download,
  Filter,
  Calendar,
  Building,
  Target,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

interface AnalyticsMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

interface DepartmentData {
  name: string;
  students: number;
  completion: number;
  avgScore: number;
  courses: number;
}

interface UsagePattern {
  timeSlot: string;
  users: number;
  engagement: number;
}

export const InstitutionalAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [department, setDepartment] = useState('all');

  const keyMetrics: AnalyticsMetric[] = [
    { label: 'Active Students', value: '12,847', change: '+12.3%', trend: 'up' },
    { label: 'Course Completions', value: '3,456', change: '+8.7%', trend: 'up' },
    { label: 'Avg. Engagement Time', value: '47m', change: '+5.2%', trend: 'up' },
    { label: 'Success Rate', value: '89.4%', change: '+2.1%', trend: 'up' },
    { label: 'Faculty Adoption', value: '156', change: '+15.6%', trend: 'up' },
    { label: 'Course Satisfaction', value: '4.7/5', change: '+0.2', trend: 'up' }
  ];

  const departmentData: DepartmentData[] = [
    { name: 'Computer Science', students: 3247, completion: 92, avgScore: 87, courses: 45 },
    { name: 'Engineering', students: 2156, completion: 85, avgScore: 83, courses: 32 },
    { name: 'Mathematics', students: 1834, completion: 88, avgScore: 85, courses: 28 },
    { name: 'Information Systems', students: 1456, completion: 91, avgScore: 86, courses: 23 },
    { name: 'Data Science', students: 987, completion: 94, avgScore: 89, courses: 18 }
  ];

  const usagePatterns: UsagePattern[] = [
    { timeSlot: '8:00 AM', users: 245, engagement: 65 },
    { timeSlot: '10:00 AM', users: 892, engagement: 78 },
    { timeSlot: '12:00 PM', users: 1247, engagement: 82 },
    { timeSlot: '2:00 PM', users: 1456, engagement: 85 },
    { timeSlot: '4:00 PM', users: 1123, engagement: 79 },
    { timeSlot: '6:00 PM', users: 634, engagement: 71 },
    { timeSlot: '8:00 PM', users: 387, engagement: 68 }
  ];

  const getTrendIcon = (trend: AnalyticsMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      case 'stable': return <Activity className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getTrendColor = (trend: AnalyticsMetric['trend']) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      case 'stable': return 'text-yellow-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Advanced Analytics & Reporting</h2>
        <p className="text-white/70">Comprehensive insights for institutional decision-making</p>
      </div>

      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white/70" />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-white/70" />
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="eng">Engineering</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 ml-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Engagement
          </TabsTrigger>
          <TabsTrigger value="departments" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Departments
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <LineChart className="w-4 h-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {keyMetrics.map((metric, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-sm">{metric.label}</p>
                        <p className="text-2xl font-bold text-white">{metric.value}</p>
                      </div>
                      <div className="text-right">
                        {getTrendIcon(metric.trend)}
                        <p className={`text-sm ${getTrendColor(metric.trend)}`}>
                          {metric.change}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Usage Overview */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Daily Usage Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usagePatterns.map((pattern, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-20 text-white text-sm">{pattern.timeSlot}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/70 text-sm">Users: {pattern.users}</span>
                          <span className="text-white/70 text-sm">Engagement: {pattern.engagement}%</span>
                        </div>
                        <Progress value={pattern.engagement} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Learning Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-4">Completion Rates by Course Type</h4>
                    <div className="space-y-3">
                      {[
                        { type: 'Interactive Visualizations', rate: 94, students: 2847 },
                        { type: 'Video Tutorials', rate: 89, students: 3245 },
                        { type: 'Practice Problems', rate: 76, students: 2156 },
                        { type: 'Assessments', rate: 82, students: 2945 }
                      ].map((course, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm">{course.type}</span>
                            <span className="text-white/70 text-sm">{course.rate}%</span>
                          </div>
                          <Progress value={course.rate} className="h-2" />
                          <p className="text-white/60 text-xs mt-1">{course.students} students</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-4">Score Distribution</h4>
                    <div className="space-y-3">
                      {[
                        { range: '90-100%', count: 2456, percentage: 35 },
                        { range: '80-89%', count: 2143, percentage: 31 },
                        { range: '70-79%', count: 1534, percentage: 22 },
                        { range: '60-69%', count: 678, percentage: 10 },
                        { range: 'Below 60%', count: 189, percentage: 2 }
                      ].map((score, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-white text-sm">{score.range}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={score.percentage} className="w-24 h-2" />
                            <span className="text-white/70 text-sm w-16">{score.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Learning Objectives Mastery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { objective: 'Algorithm Analysis', mastery: 87, total: 1247 },
                    { objective: 'Data Structure Implementation', mastery: 92, total: 1356 },
                    { objective: 'Problem Solving', mastery: 79, total: 1189 },
                    { objective: 'Code Optimization', mastery: 74, total: 987 },
                    { objective: 'Complexity Theory', mastery: 68, total: 834 },
                    { objective: 'Graph Algorithms', mastery: 83, total: 1156 }
                  ].map((obj, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg text-center">
                      <h5 className="text-white font-medium text-sm mb-2">{obj.objective}</h5>
                      <div className="text-2xl font-bold text-white mb-1">{obj.mastery}%</div>
                      <div className="text-white/60 text-xs">{obj.total} students</div>
                      <Progress value={obj.mastery} className="mt-2 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Student Engagement Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">47m</div>
                    <div className="text-white/70 text-sm">Avg. Session Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">3.4</div>
                    <div className="text-white/70 text-sm">Sessions per Day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">73%</div>
                    <div className="text-white/70 text-sm">Return Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">4.2</div>
                    <div className="text-white/70 text-sm">Interactions/min</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-4">Feature Usage</h4>
                  <div className="space-y-3">
                    {[
                      { feature: 'Algorithm Visualizations', usage: 95, sessions: 8247 },
                      { feature: 'Practice Problems', usage: 78, sessions: 6543 },
                      { feature: 'Video Tutorials', usage: 82, sessions: 6891 },
                      { feature: 'Code Editor', usage: 71, sessions: 5976 },
                      { feature: 'Progress Tracking', usage: 89, sessions: 7456 },
                      { feature: 'Discussion Forums', usage: 45, sessions: 3789 }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded">
                        <span className="text-white text-sm">{feature.feature}</span>
                        <div className="flex items-center gap-3">
                          <Progress value={feature.usage} className="w-32 h-2" />
                          <span className="text-white/70 text-sm w-16">{feature.usage}%</span>
                          <span className="text-white/60 text-xs w-20">{feature.sessions} sessions</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building className="w-5 h-5" />
                Department Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentData.map((dept, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-medium">{dept.name}</h4>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="border-white/30 text-white/70">
                          {dept.students} students
                        </Badge>
                        <Badge variant="outline" className="border-white/30 text-white/70">
                          {dept.courses} courses
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/70 text-sm">Completion Rate</span>
                          <span className="text-white text-sm">{dept.completion}%</span>
                        </div>
                        <Progress value={dept.completion} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/70 text-sm">Average Score</span>
                          <span className="text-white text-sm">{dept.avgScore}%</span>
                        </div>
                        <Progress value={dept.avgScore} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <h4 className="text-white font-medium">Strong Performance Trend</h4>
                        <p className="text-white/70 text-sm">
                          Student engagement has increased by 23% over the past quarter, with particularly strong 
                          performance in interactive visualization modules.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="text-white font-medium">Optimization Opportunity</h4>
                        <p className="text-white/70 text-sm">
                          Consider expanding video tutorial content for graph algorithms, as completion rates 
                          are 15% lower than other topics.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="text-white font-medium">Peak Usage Alert</h4>
                        <p className="text-white/70 text-sm">
                          System usage peaks between 2-4 PM. Consider load balancing or additional resources 
                          during these hours to maintain optimal performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Predictive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Success Predictors</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">Early engagement (first week)</span>
                        <span className="text-white">94% correlation</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">Regular session frequency</span>
                        <span className="text-white">87% correlation</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">Practice problem completion</span>
                        <span className="text-white">82% correlation</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">Peer collaboration</span>
                        <span className="text-white">76% correlation</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3">Risk Indicators</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">Low engagement (less than 2 sessions/week)</span>
                        <span className="text-red-400">High risk</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">Incomplete assignments</span>
                        <span className="text-yellow-400">Medium risk</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">Short session duration (less than 15min)</span>
                        <span className="text-yellow-400">Medium risk</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">No peer interaction</span>
                        <span className="text-yellow-400">Medium risk</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
