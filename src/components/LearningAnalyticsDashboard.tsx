import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Target,
  Award,
  BookOpen,
  Brain,
  Zap,
  Users,
  Download,
  Share2,
  Eye,
  Filter,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  PieChart,
  LineChart,
  BarChart2,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MotionWrapper, MicroInteraction } from '@/components/motion/MotionWrapper';

// Learning Analytics Types
interface LearningMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'performance' | 'engagement' | 'progress' | 'skill';
  description: string;
}

interface SkillProgression {
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  daysToTarget: number;
  recentActivity: {
    date: string;
    action: string;
    improvement: number;
  }[];
  milestones: {
    level: number;
    description: string;
    achieved: boolean;
    achievedDate?: string;
  }[];
}

interface CompetencyMap {
  category: string;
  subcategories: {
    name: string;
    proficiency: number;
    assessments: number;
    lastUpdated: string;
    trending: 'up' | 'down' | 'stable';
    nextMilestone: string;
  }[];
}

// Mock Data
const mockMetrics: LearningMetric[] = [
  {
    id: '1',
    name: 'Learning Velocity',
    value: 87,
    previousValue: 79,
    unit: '%',
    trend: 'up',
    category: 'performance',
    description: 'Rate of skill acquisition and problem-solving improvement'
  },
  {
    id: '2',
    name: 'Daily Streak',
    value: 12,
    previousValue: 8,
    unit: 'days',
    trend: 'up',
    category: 'engagement',
    description: 'Consecutive days of active learning'
  },
  {
    id: '3',
    name: 'Concepts Mastered',
    value: 34,
    previousValue: 29,
    unit: 'concepts',
    trend: 'up',
    category: 'progress',
    description: 'Total algorithm concepts fully understood'
  },
  {
    id: '4',
    name: 'Problem Success Rate',
    value: 73,
    previousValue: 78,
    unit: '%',
    trend: 'down',
    category: 'skill',
    description: 'Percentage of problems solved correctly on first attempt'
  },
  {
    id: '5',
    name: 'Study Time',
    value: 145,
    previousValue: 132,
    unit: 'minutes',
    trend: 'up',
    category: 'engagement',
    description: 'Average daily study time this week'
  },
  {
    id: '6',
    name: 'Complexity Analysis',
    value: 82,
    previousValue: 76,
    unit: '%',
    trend: 'up',
    category: 'skill',
    description: 'Accuracy in determining time/space complexity'
  }
];

const mockSkillProgression: SkillProgression[] = [
  {
    skillName: 'Binary Search Trees',
    currentLevel: 8,
    targetLevel: 10,
    daysToTarget: 14,
    recentActivity: [
      { date: '2025-10-05', action: 'Completed AVL Tree Rotation', improvement: 0.5 },
      { date: '2025-10-04', action: 'Solved Tree Traversal Problems', improvement: 0.3 },
      { date: '2025-10-03', action: 'Studied Red-Black Trees', improvement: 0.4 }
    ],
    milestones: [
      { level: 5, description: 'Basic BST Operations', achieved: true, achievedDate: '2025-09-15' },
      { level: 7, description: 'Self-Balancing Trees', achieved: true, achievedDate: '2025-09-28' },
      { level: 9, description: 'Advanced Tree Algorithms', achieved: false },
      { level: 10, description: 'Tree Optimization Expert', achieved: false }
    ]
  },
  {
    skillName: 'Graph Algorithms',
    currentLevel: 6,
    targetLevel: 9,
    daysToTarget: 28,
    recentActivity: [
      { date: '2025-10-05', action: 'Implemented Dijkstra\'s Algorithm', improvement: 0.6 },
      { date: '2025-10-03', action: 'Mastered BFS/DFS', improvement: 0.4 }
    ],
    milestones: [
      { level: 3, description: 'Basic Graph Traversal', achieved: true, achievedDate: '2025-09-10' },
      { level: 5, description: 'Shortest Path Algorithms', achieved: true, achievedDate: '2025-09-25' },
      { level: 7, description: 'Network Flow Algorithms', achieved: false },
      { level: 9, description: 'Advanced Graph Theory', achieved: false }
    ]
  }
];

const mockCompetencyMap: CompetencyMap[] = [
  {
    category: 'Data Structures',
    subcategories: [
      {
        name: 'Arrays & Strings',
        proficiency: 92,
        assessments: 15,
        lastUpdated: '2025-10-05',
        trending: 'stable',
        nextMilestone: 'Advanced String Algorithms'
      },
      {
        name: 'Linked Lists',
        proficiency: 87,
        assessments: 12,
        lastUpdated: '2025-10-04',
        trending: 'up',
        nextMilestone: 'Doubly Linked Lists Mastery'
      },
      {
        name: 'Trees & Graphs',
        proficiency: 74,
        assessments: 18,
        lastUpdated: '2025-10-05',
        trending: 'up',
        nextMilestone: 'Balanced Tree Implementation'
      },
      {
        name: 'Hash Tables',
        proficiency: 81,
        assessments: 9,
        lastUpdated: '2025-10-03',
        trending: 'stable',
        nextMilestone: 'Collision Resolution Strategies'
      }
    ]
  },
  {
    category: 'Algorithms',
    subcategories: [
      {
        name: 'Searching',
        proficiency: 95,
        assessments: 14,
        lastUpdated: '2025-10-05',
        trending: 'stable',
        nextMilestone: 'Advanced Search Optimization'
      },
      {
        name: 'Sorting',
        proficiency: 89,
        assessments: 16,
        lastUpdated: '2025-10-04',
        trending: 'up',
        nextMilestone: 'External Sorting Algorithms'
      },
      {
        name: 'Dynamic Programming',
        proficiency: 62,
        assessments: 11,
        lastUpdated: '2025-10-02',
        trending: 'up',
        nextMilestone: 'Memoization Patterns'
      },
      {
        name: 'Greedy Algorithms',
        proficiency: 58,
        assessments: 8,
        lastUpdated: '2025-09-30',
        trending: 'down',
        nextMilestone: 'Optimal Substructure Recognition'
      }
    ]
  }
];

// Metric Card Component
const MetricCard = ({ metric }: { metric: LearningMetric }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="w-4 h-4 text-green-400" />;
      case 'down':
        return <ArrowDownRight className="w-4 h-4 text-red-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-400 bg-green-500/20';
      case 'down':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getChangePercent = () => {
    if (metric.previousValue === 0) return 0;
    return Math.round(((metric.value - metric.previousValue) / metric.previousValue) * 100);
  };

  return (
    <MicroInteraction type="card">
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-white/80 text-sm font-medium mb-1">{metric.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-3xl font-bold">
                  {metric.value}
                  <span className="text-white/60 text-lg font-normal ml-1">{metric.unit}</span>
                </span>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full ${getTrendColor(metric.trend)}`}>
              {getTrendIcon(metric.trend)}
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-sm ${
              metric.trend === 'up' ? 'text-green-400' :
              metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
            }`}>
              {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : ''}{Math.abs(getChangePercent())}%
            </span>
            <span className="text-white/60 text-sm">from last period</span>
          </div>
          
          <p className="text-white/60 text-xs leading-relaxed">{metric.description}</p>
        </CardContent>
      </Card>
    </MicroInteraction>
  );
};

// Skill Progression Component
const SkillProgressionCard = ({ skill }: { skill: SkillProgression }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <MicroInteraction type="card">
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-2">{skill.skillName}</h3>
              <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                <span>Level {skill.currentLevel}/10</span>
                <span>Target: Level {skill.targetLevel}</span>
                <span>{skill.daysToTarget} days to goal</span>
              </div>
              <Progress value={(skill.currentLevel / 10) * 100} className="h-3 mb-3" />
              <div className="flex justify-between text-xs text-white/60">
                <span>Current Progress</span>
                <span>{Math.round((skill.currentLevel / skill.targetLevel) * 100)}% to target</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-white/60 hover:text-white"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 border-t border-white/10 pt-4"
              >
                {/* Recent Activity */}
                <div>
                  <h4 className="text-white/80 font-medium text-sm mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {skill.recentActivity.slice(0, 3).map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white text-sm">{activity.action}</div>
                          <div className="text-white/60 text-xs">{activity.date}</div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          +{activity.improvement}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="text-white/80 font-medium text-sm mb-3">Milestones</h4>
                  <div className="space-y-2">
                    {skill.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          milestone.achieved ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/60'
                        }`}>
                          {milestone.achieved ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span className="text-xs">{milestone.level}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm ${
                            milestone.achieved ? 'text-white' : 'text-white/70'
                          }`}>
                            {milestone.description}
                          </div>
                          {milestone.achievedDate && (
                            <div className="text-white/50 text-xs">Achieved: {milestone.achievedDate}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </MicroInteraction>
  );
};

// Competency Map Component
const CompetencyMapSection = ({ competency }: { competency: CompetencyMap }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-lg">{competency.category}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competency.subcategories.map((subcat, index) => (
          <MicroInteraction key={index} type="card">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{subcat.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white/70 text-sm">{subcat.proficiency}% proficient</span>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        subcat.trending === 'up' ? 'text-green-400' :
                        subcat.trending === 'down' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {subcat.trending === 'up' ? '↗' : subcat.trending === 'down' ? '↘' : '→'}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs text-white/70">
                    {subcat.assessments} tests
                  </Badge>
                </div>
                
                <Progress value={subcat.proficiency} className="h-2 mb-3" />
                
                <div className="space-y-1 text-xs text-white/60">
                  <div>Next: {subcat.nextMilestone}</div>
                  <div>Updated: {subcat.lastUpdated}</div>
                </div>
              </CardContent>
            </Card>
          </MicroInteraction>
        ))}
      </div>
    </div>
  );
};

// Main Learning Analytics Component
export const LearningAnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-8">
      {/* Header */}
      <MotionWrapper variant="fadeInUp" delay={0.1}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold mb-2">Learning Analytics</h1>
            <p className="text-white/70">Comprehensive insights into your learning journey and skill development</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="7d" className="text-white hover:bg-white/10">Last 7 days</SelectItem>
                <SelectItem value="30d" className="text-white hover:bg-white/10">Last 30 days</SelectItem>
                <SelectItem value="90d" className="text-white hover:bg-white/10">Last 3 months</SelectItem>
                <SelectItem value="1y" className="text-white hover:bg-white/10">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-900 border-white/10">
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Report
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </MotionWrapper>

      {/* Navigation Tabs */}
      <MotionWrapper variant="fadeInUp" delay={0.2}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white/5 backdrop-blur-md border border-white/10">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="skills" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <Target className="w-4 h-4" />
              Skill Progression
            </TabsTrigger>
            <TabsTrigger 
              value="competency" 
              className="flex items-center gap-2 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              <Layers className="w-4 h-4" />
              Competency Map
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="flex items-center gap-2 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
            >
              <Brain className="w-4 h-4" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            <MotionWrapper variant="fadeInUp" delay={0.3}>
              <div className="space-y-8">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockMetrics.map((metric, index) => (
                    <MotionWrapper key={metric.id} variant="scaleIn" delay={index * 0.1}>
                      <MetricCard metric={metric} />
                    </MotionWrapper>
                  ))}
                </div>

                {/* Charts and Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <LineChart className="w-5 h-5 text-cyan-400" />
                        Learning Progress Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center text-white/60">
                          <BarChart2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Progress chart visualization would be rendered here</p>
                          <p className="text-sm mt-2">Showing {timeRange} data trends</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 backdrop-blur-md border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-purple-400" />
                        Skill Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center text-white/60">
                          <PieChart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Skill distribution pie chart would be rendered here</p>
                          <p className="text-sm mt-2">Algorithm categories by proficiency</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Achievements */}
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-400" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: 'Tree Master', description: 'Completed all binary tree challenges', date: '2025-10-05', type: 'skill' },
                        { title: 'Speed Demon', description: 'Solved 10 problems under 5 minutes', date: '2025-10-04', type: 'performance' },
                        { title: 'Consistency King', description: '7-day learning streak', date: '2025-10-03', type: 'engagement' }
                      ].map((achievement, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                              <Award className="w-4 h-4 text-yellow-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium text-sm">{achievement.title}</h4>
                              <div className="text-white/60 text-xs">{achievement.date}</div>
                            </div>
                          </div>
                          <p className="text-white/70 text-sm">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </MotionWrapper>
          </TabsContent>

          {/* Skills Progression Tab */}
          <TabsContent value="skills" className="mt-8">
            <MotionWrapper variant="fadeInUp" delay={0.3}>
              <div className="space-y-6">
                {mockSkillProgression.map((skill, index) => (
                  <MotionWrapper key={index} variant="slideInRight" delay={index * 0.2}>
                    <SkillProgressionCard skill={skill} />
                  </MotionWrapper>
                ))}
              </div>
            </MotionWrapper>
          </TabsContent>

          {/* Competency Map Tab */}
          <TabsContent value="competency" className="mt-8">
            <MotionWrapper variant="fadeInUp" delay={0.3}>
              <div className="space-y-8">
                {mockCompetencyMap.map((competency, index) => (
                  <MotionWrapper key={index} variant="slideInUp" delay={index * 0.2}>
                    <CompetencyMapSection competency={competency} />
                  </MotionWrapper>
                ))}
              </div>
            </MotionWrapper>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="mt-8">
            <MotionWrapper variant="fadeInUp" delay={0.3}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      Learning Pattern Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <h4 className="text-blue-300 font-medium mb-1">Optimal Learning Time</h4>
                          <p className="text-white/80 text-sm">
                            Your performance peaks between 2-4 PM. Consider scheduling complex topics during this window.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <h4 className="text-green-300 font-medium mb-1">Strength Recognition</h4>
                          <p className="text-white/80 text-sm">
                            You excel at divide-and-conquer algorithms. Consider advancing to dynamic programming next.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                        <div>
                          <h4 className="text-yellow-300 font-medium mb-1">Focus Area</h4>
                          <p className="text-white/80 text-sm">
                            Graph algorithms need attention. Spend 20 minutes daily on BFS/DFS variations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-400" />
                      Personalized Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        priority: 'High',
                        action: 'Practice Dynamic Programming',
                        reason: 'Low proficiency affecting advanced problem solving',
                        estimatedTime: '3-4 weeks'
                      },
                      {
                        priority: 'Medium',
                        action: 'Review Graph Theory Fundamentals',
                        reason: 'Recent assessment performance declined',
                        estimatedTime: '1-2 weeks'
                      },
                      {
                        priority: 'Low',
                        action: 'Explore Advanced Tree Structures',
                        reason: 'Ready for next level challenges',
                        estimatedTime: '2-3 weeks'
                      }
                    ].map((rec, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white font-medium text-sm">{rec.action}</h4>
                          <Badge className={`text-xs ${
                            rec.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                            rec.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm mb-2">{rec.reason}</p>
                        <div className="flex items-center gap-2 text-xs text-white/60">
                          <Clock className="w-3 h-3" />
                          {rec.estimatedTime}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </MotionWrapper>
          </TabsContent>
        </Tabs>
      </MotionWrapper>
    </div>
  );
};

export default LearningAnalyticsDashboard;