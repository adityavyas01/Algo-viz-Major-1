import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Zap,
  BookOpen,
  Award,
  Calendar,
  Users,
  Code,
  Brain,
  Star,
  Trophy,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Settings
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MotionWrapper, MicroInteraction } from '@/components/motion/MotionWrapper';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

// Types for dashboard data
interface Recommendation {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  points: number;
}

interface ProgressData {
  date: string;
  algorithmsLearned: number;
  problemsSolved: number;
  timeSpent: number;
  skillLevel: number;
}

interface SkillMetric {
  name: string;
  current: number;
  target: number;
  trend: number;
  color: string;
  icon: React.ReactNode;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  progress: number;
  totalSteps: number;
  completedSteps: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  nextLesson?: string;
  isActive: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedDate?: string;
}

interface RecentActivity {
  id: string;
  type: 'algorithm_learned' | 'problem_solved' | 'achievement_earned' | 'streak_milestone';
  title: string;
  description: string;
  timestamp: string;
  points: number;
  icon: React.ReactNode;
}

// Generate realistic mock data
const generateProgressData = (): ProgressData[] => {
  const data: ProgressData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      algorithmsLearned: Math.floor(Math.random() * 5) + 1,
      problemsSolved: Math.floor(Math.random() * 15) + 3,
      timeSpent: Math.floor(Math.random() * 180) + 30, // minutes
      skillLevel: Math.min(100, 20 + i * 2 + Math.random() * 10)
    });
  }

  return data;
};

const skillMetrics: SkillMetric[] = [
  {
    name: 'Data Structures',
    current: 78,
    target: 90,
    trend: 12,
    color: '#06b6d4',
    icon: <Code className="w-4 h-4" />
  },
  {
    name: 'Algorithms',
    current: 65,
    target: 85,
    trend: 8,
    color: '#8b5cf6',
    icon: <Brain className="w-4 h-4" />
  },
  {
    name: 'Problem Solving',
    current: 82,
    target: 95,
    trend: 15,
    color: '#f59e0b',
    icon: <Target className="w-4 h-4" />
  },
  {
    name: 'Code Optimization',
    current: 71,
    target: 80,
    trend: 6,
    color: '#10b981',
    icon: <Zap className="w-4 h-4" />
  }
];

const learningPaths: LearningPath[] = [
  {
    id: '1',
    name: 'Fundamentals of Data Structures',
    description: 'Master arrays, linked lists, stacks, and queues',
    progress: 75,
    totalSteps: 12,
    completedSteps: 9,
    difficulty: 'Beginner',
    estimatedTime: '2 weeks',
    nextLesson: 'Binary Trees Introduction',
    isActive: true
  },
  {
    id: '2',
    name: 'Sorting Algorithms Mastery',
    description: 'Deep dive into sorting techniques and optimizations',
    progress: 45,
    totalSteps: 15,
    completedSteps: 7,
    difficulty: 'Intermediate',
    estimatedTime: '3 weeks',
    nextLesson: 'QuickSort Analysis',
    isActive: false
  },
  {
    id: '3',
    name: 'Graph Theory & Algorithms',
    description: 'Explore graphs, traversals, and shortest path algorithms',
    progress: 20,
    totalSteps: 18,
    completedSteps: 4,
    difficulty: 'Advanced',
    estimatedTime: '4 weeks',
    nextLesson: 'Dijkstra\'s Algorithm',
    isActive: false
  }
];

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first algorithm visualization',
    icon: <Star className="w-4 h-4" />,
    earned: true,
    progress: 100,
    rarity: 'common',
    earnedDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Speed Demon',
    description: 'Solve 10 problems in under 30 minutes',
    icon: <Zap className="w-4 h-4" />,
    earned: true,
    progress: 100,
    rarity: 'rare',
    earnedDate: '2024-01-20'
  },
  {
    id: '3',
    title: 'Algorithm Master',
    description: 'Master all sorting algorithms',
    icon: <Trophy className="w-4 h-4" />,
    earned: false,
    progress: 80,
    rarity: 'epic'
  },
  {
    id: '4',
    title: 'Graph Guru',
    description: 'Complete advanced graph algorithms path',
    icon: <Award className="w-4 h-4" />,
    earned: false,
    progress: 25,
    rarity: 'legendary'
  }
];

const recentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'algorithm_learned',
    title: 'Learned QuickSort',
    description: 'Mastered the divide-and-conquer sorting algorithm',
    timestamp: '2 hours ago',
    points: 150,
    icon: <BookOpen className="w-4 h-4" />
  },
  {
    id: '2',
    type: 'problem_solved',
    title: 'Solved Binary Search',
    description: 'Found the optimal solution in O(log n) time',
    timestamp: '4 hours ago',
    points: 100,
    icon: <Target className="w-4 h-4" />
  },
  {
    id: '3',
    type: 'achievement_earned',
    title: 'Speed Demon Unlocked!',
    description: 'Solved 10 problems in record time',
    timestamp: '1 day ago',
    points: 500,
    icon: <Trophy className="w-4 h-4" />
  }
];

export const EnhancedDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [weakTopic, setWeakTopic] = useState<string | null>(null);
  const [isLoadingRecs, setIsLoadingRecs] = useState(true);
  const { session } = useAuth();
  
  const progressData = useMemo(() => generateProgressData(), []);
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!session) return;
      setIsLoadingRecs(true);
      try {
        const { data, error } = await supabase.functions.invoke('get-recommendations');
        if (error) throw error;
        setRecommendations(data.recommendations || []);
        setWeakTopic(data.weakTopic || null);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setIsLoadingRecs(false);
      }
    };

    fetchRecommendations();
  }, [session]);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isRealTimeEnabled) return;
    
    const interval = setInterval(() => {
      // Simulate real-time updates
      // In a real app, this would fetch from an API or WebSocket
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500/20 text-gray-400';
      case 'rare': return 'bg-blue-500/20 text-blue-400';
      case 'epic': return 'bg-purple-500/20 text-purple-400';
      case 'legendary': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const totalPoints = 12450;
  const currentStreak = 15;
  const totalProblems = 142;
  const accuracy = 89;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Controls */}
        <MotionWrapper variant="fadeInUp" delay={0.1}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Learning Dashboard</h1>
              <p className="text-white/70">Track your algorithm mastery journey with real-time insights</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Tabs value={selectedTimeframe} onValueChange={(v) => setSelectedTimeframe(v as any)}>
                <TabsList className="bg-white/10 border-white/20">
                  <TabsTrigger value="7d" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                    7 Days
                  </TabsTrigger>
                  <TabsTrigger value="30d" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                    30 Days
                  </TabsTrigger>
                  <TabsTrigger value="90d" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                    90 Days
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <MicroInteraction type="button">
                <Button
                  variant={isRealTimeEnabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
                  className={isRealTimeEnabled ? "bg-green-600 hover:bg-green-700" : "border-white/20 text-white/70"}
                >
                  {isRealTimeEnabled ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isRealTimeEnabled ? 'Live' : 'Paused'}
                </Button>
              </MicroInteraction>
            </div>
          </div>
        </MotionWrapper>

        {/* Key Metrics Cards */}
        <MotionWrapper variant="stagger">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Points', value: totalPoints.toLocaleString(), icon: Star, color: 'from-yellow-500 to-orange-500', trend: '+12%' },
              { label: 'Current Streak', value: `${currentStreak} days`, icon: Calendar, color: 'from-green-500 to-emerald-500', trend: '+3 days' },
              { label: 'Problems Solved', value: totalProblems.toString(), icon: Target, color: 'from-blue-500 to-cyan-500', trend: '+8 today' },
              { label: 'Accuracy Rate', value: `${accuracy}%`, icon: TrendingUp, color: 'from-purple-500 to-pink-500', trend: '+2%' }
            ].map((metric, index) => (
              <MotionWrapper key={metric.label} variant="scaleIn" delay={index * 0.1}>
                <MicroInteraction type="card">
                  <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/60 text-sm font-medium">{metric.label}</p>
                          <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                          <p className="text-green-400 text-xs mt-1 font-medium">{metric.trend}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}>
                          <metric.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MicroInteraction>
              </MotionWrapper>
            ))}
          </div>
        </MotionWrapper>

        {/* Recommended for You Section */}
        <MotionWrapper variant="fadeInUp" delay={0.2}>
          <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Recommended For You
              </CardTitle>
              {weakTopic && (
                <CardDescription className="text-white/60">
                  Based on your performance, we suggest focusing on <span className="font-bold text-purple-300">{weakTopic}</span>.
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {isLoadingRecs ? (
                <div className="flex justify-center items-center h-24">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                </div>
              ) : recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.map((rec, index) => (
                    <MotionWrapper key={rec.id} variant="scaleIn" delay={index * 0.1}>
                      <MicroInteraction type="card">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all h-full flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(rec.difficulty)}`}>
                                {rec.difficulty}
                              </span>
                              <div className="flex items-center gap-1 text-yellow-400">
                                <Star className="w-3 h-3" />
                                <span className="text-xs font-bold">{rec.points}</span>
                              </div>
                            </div>
                            <h4 className="text-white font-semibold text-sm mb-1">{rec.title}</h4>
                            <p className="text-white/60 text-xs">{rec.category}</p>
                          </div>
                          <Button size="sm" className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-xs">
                            Start Challenge <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </MicroInteraction>
                    </MotionWrapper>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-white/60">
                  <p>You've completed all recommended challenges for now. Great job!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </MotionWrapper>

        {/* Progress Chart & Skill Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <MotionWrapper variant="fadeInUp" delay={0.3} className="lg:col-span-2">
            <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  Learning Progress Over Time
                </CardTitle>
                <CardDescription className="text-white/60">
                  Track your daily algorithm learning and problem-solving activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={progressData}>
                      <defs>
                        <linearGradient id="algorithmsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="problemsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        stroke="rgba(255,255,255,0.6)"
                      />
                      <YAxis stroke="rgba(255,255,255,0.6)" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="algorithmsLearned"
                        stroke="#06b6d4"
                        fillOpacity={1}
                        fill="url(#algorithmsGradient)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="problemsSolved"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#problemsGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Skill Metrics */}
          <MotionWrapper variant="fadeInUp" delay={0.4}>
            <Card className="bg-white/5 backdrop-blur-md border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Skill Progress
                </CardTitle>
                <CardDescription className="text-white/60">
                  Your mastery levels across different areas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skillMetrics.map((skill, index) => (
                  <MotionWrapper key={skill.name} variant="slideInFromLeft" delay={index * 0.1}>
                    <MicroInteraction type="card">
                      <div 
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 cursor-pointer transition-all"
                        onClick={() => setSelectedMetric(selectedMetric === skill.name ? null : skill.name)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: `${skill.color}20`, color: skill.color }}>
                              {skill.icon}
                            </div>
                            <span className="text-white font-medium text-sm">{skill.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-white/60 text-xs">+{skill.trend}%</span>
                            <TrendingUp className="w-3 h-3 text-green-400" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-white/60">Current</span>
                            <span className="text-white font-medium">{skill.current}%</span>
                          </div>
                          <Progress 
                            value={skill.current} 
                            className="h-2 bg-white/10"
                            style={{ '--progress-foreground': skill.color } as any}
                          />
                          <div className="flex justify-between text-xs">
                            <span className="text-white/40">Target: {skill.target}%</span>
                            <span className="text-white/40">{skill.target - skill.current}% to go</span>
                          </div>
                        </div>
                      </div>
                    </MicroInteraction>
                  </MotionWrapper>
                ))}
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>

        {/* Learning Paths & Achievements */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Learning Paths */}
          <MotionWrapper variant="fadeInUp" delay={0.5}>
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-400" />
                  Active Learning Paths
                </CardTitle>
                <CardDescription className="text-white/60">
                  Continue your structured learning journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningPaths.map((path, index) => (
                  <MotionWrapper key={path.id} variant="scaleIn" delay={index * 0.1}>
                    <MicroInteraction type="card">
                      <div className={`p-4 rounded-xl border transition-all duration-300 ${
                        path.isActive 
                          ? 'bg-cyan-500/10 border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm mb-1">{path.name}</h3>
                            <p className="text-white/60 text-xs mb-2">{path.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs px-2 py-1 ${getDifficultyColor(path.difficulty)}`}>
                                {path.difficulty}
                              </Badge>
                              <span className="text-white/40 text-xs">{path.estimatedTime}</span>
                            </div>
                          </div>
                          {path.isActive && (
                            <Badge className="bg-green-500/20 text-green-400 text-xs">
                              Active
                            </Badge>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-white/60">{path.completedSteps} / {path.totalSteps} steps</span>
                            <span className="text-white font-medium">{path.progress}%</span>
                          </div>
                          <Progress value={path.progress} className="h-2 bg-white/10" />
                          {path.nextLesson && (
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-white/60 text-xs">Next: {path.nextLesson}</span>
                              <Button size="sm" variant="ghost" className="h-6 text-xs text-cyan-400 hover:bg-cyan-500/10">
                                Continue <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </MicroInteraction>
                  </MotionWrapper>
                ))}
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Achievements */}
          <MotionWrapper variant="fadeInUp" delay={0.6}>
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Achievements
                </CardTitle>
                <CardDescription className="text-white/60">
                  Unlock badges and celebrate your progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <MotionWrapper key={achievement.id} variant="scaleIn" delay={index * 0.1}>
                    <MicroInteraction type="card">
                      <div className={`p-4 rounded-xl border transition-all duration-300 ${
                        achievement.earned 
                          ? 'bg-yellow-500/10 border-yellow-500/30' 
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            achievement.earned 
                              ? 'bg-yellow-500/20 text-yellow-400' 
                              : 'bg-white/10 text-white/40'
                          }`}>
                            {achievement.icon}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-semibold text-sm ${
                                achievement.earned ? 'text-white' : 'text-white/70'
                              }`}>
                                {achievement.title}
                              </h4>
                              <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-white/60 text-xs mb-2">{achievement.description}</p>
                            
                            {achievement.earned ? (
                              <span className="text-green-400 text-xs font-medium">
                                Earned {achievement.earnedDate}
                              </span>
                            ) : (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-white/40">Progress</span>
                                  <span className="text-white/60">{achievement.progress}%</span>
                                </div>
                                <Progress value={achievement.progress} className="h-1 bg-white/10" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </MicroInteraction>
                  </MotionWrapper>
                ))}
              </CardContent>
            </Card>
          </MotionWrapper>
        </div>

        {/* Recent Activity */}
        <MotionWrapper variant="fadeInUp" delay={0.7}>
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-white/60">
                Your latest learning milestones and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <MotionWrapper key={activity.id} variant="slideInFromLeft" delay={index * 0.1}>
                    <MicroInteraction type="card">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                          {activity.icon}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-sm mb-1">{activity.title}</h4>
                          <p className="text-white/60 text-xs mb-2">{activity.description}</p>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-white/40">{activity.timestamp}</span>
                            <span className="text-yellow-400 font-medium">+{activity.points} XP</span>
                          </div>
                        </div>
                      </div>
                    </MicroInteraction>
                  </MotionWrapper>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default EnhancedDashboard;