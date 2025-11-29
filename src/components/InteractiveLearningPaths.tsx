import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  ChevronRight,
  Clock,
  Trophy,
  Star,
  Play,
  CheckCircle,
  Circle,
  Lock,
  BookOpen,
  Code,
  Target,
  Zap,
  Users,
  Award,
  TrendingUp,
  BarChart3,
  Brain,
  Lightbulb,
  Rocket,
  Flag,
  ArrowRight,
  Download,
  Share2,
  Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MotionWrapper, MicroInteraction } from '@/components/motion/MotionWrapper';

// Types for learning paths
interface LearningStep {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'interactive' | 'quiz' | 'coding' | 'reading';
  duration: number; // in minutes
  difficulty: 1 | 2 | 3 | 4 | 5;
  isCompleted: boolean;
  isUnlocked: boolean;
  completionRate: number; // percentage of users who completed
  averageTime: number; // average time taken by users
  prerequisites: string[];
  learningObjectives: string[];
  resources: string[];
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  steps: LearningStep[];
  estimatedHours: number;
  completedSteps: number;
  totalSteps: number;
  isUnlocked: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  modules: LearningModule[];
  totalHours: number;
  completedHours: number;
  enrolledUsers: number;
  averageRating: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  isEnrolled: boolean;
  progress: number;
  estimatedCompletion: string;
  instructor?: string;
  lastAccessed?: string;
}

interface ProgressData {
  date: string;
  hoursSpent: number;
  conceptsLearned: number;
  exercisesCompleted: number;
}

// Mock data for learning paths
const learningPaths: LearningPath[] = [
  {
    id: 'fundamentals',
    title: 'Algorithm Fundamentals',
    description: 'Master the core concepts of algorithms and data structures',
    longDescription: 'A comprehensive journey through the essential algorithms and data structures every programmer should know. From basic arrays to complex tree structures, this path builds your foundation step by step.',
    totalHours: 24,
    completedHours: 8,
    enrolledUsers: 15420,
    averageRating: 4.8,
    difficulty: 'Beginner',
    tags: ['Algorithms', 'Data Structures', 'Fundamentals', 'Problem Solving'],
    prerequisites: ['Basic Programming', 'Mathematical Thinking'],
    learningOutcomes: [
      'Understand time and space complexity',
      'Implement fundamental data structures',
      'Master basic sorting and searching algorithms',
      'Solve algorithmic problems systematically'
    ],
    isEnrolled: true,
    progress: 33,
    estimatedCompletion: '3 weeks',
    instructor: 'Dr. Sarah Chen',
    lastAccessed: '2 hours ago',
    modules: [
      {
        id: 'arrays-lists',
        title: 'Arrays and Lists',
        description: 'Foundation of linear data structures',
        estimatedHours: 6,
        completedSteps: 8,
        totalSteps: 12,
        isUnlocked: true,
        difficulty: 'Beginner',
        category: 'Data Structures',
        steps: [
          {
            id: 'intro-arrays',
            title: 'Introduction to Arrays',
            description: 'Understanding array fundamentals and memory layout',
            type: 'video',
            duration: 25,
            difficulty: 1,
            isCompleted: true,
            isUnlocked: true,
            completionRate: 94,
            averageTime: 22,
            prerequisites: [],
            learningObjectives: ['Understand array structure', 'Learn memory allocation', 'Master indexing'],
            resources: ['Video Lecture', 'Interactive Demo', 'Practice Problems']
          },
          {
            id: 'array-operations',
            title: 'Array Operations',
            description: 'Insertion, deletion, and search operations',
            type: 'interactive',
            duration: 35,
            difficulty: 2,
            isCompleted: true,
            isUnlocked: true,
            completionRate: 89,
            averageTime: 31,
            prerequisites: ['intro-arrays'],
            learningObjectives: ['Implement CRUD operations', 'Analyze time complexity', 'Handle edge cases'],
            resources: ['Interactive Simulator', 'Code Templates', 'Test Cases']
          },
          {
            id: 'dynamic-arrays',
            title: 'Dynamic Arrays',
            description: 'Resizable arrays and growth strategies',
            type: 'coding',
            duration: 45,
            difficulty: 3,
            isCompleted: false,
            isUnlocked: true,
            completionRate: 76,
            averageTime: 42,
            prerequisites: ['array-operations'],
            learningObjectives: ['Implement dynamic resizing', 'Understand amortized analysis', 'Compare growth strategies'],
            resources: ['Coding Environment', 'Solution Guide', 'Performance Analyzer']
          }
        ]
      },
      {
        id: 'sorting',
        title: 'Sorting Algorithms',
        description: 'Essential sorting techniques and their applications',
        estimatedHours: 8,
        completedSteps: 0,
        totalSteps: 15,
        isUnlocked: true,
        difficulty: 'Intermediate',
        category: 'Algorithms',
        steps: []
      },
      {
        id: 'search',
        title: 'Searching Algorithms',
        description: 'Efficient search strategies for different scenarios',
        estimatedHours: 5,
        completedSteps: 0,
        totalSteps: 10,
        isUnlocked: false,
        difficulty: 'Intermediate',
        category: 'Algorithms',
        steps: []
      }
    ]
  },
  {
    id: 'advanced-structures',
    title: 'Advanced Data Structures',
    description: 'Explore complex data structures for specialized applications',
    longDescription: 'Dive deep into sophisticated data structures like balanced trees, hash tables, and graphs. Learn when and how to apply these powerful tools in real-world scenarios.',
    totalHours: 32,
    completedHours: 0,
    enrolledUsers: 8743,
    averageRating: 4.9,
    difficulty: 'Advanced',
    tags: ['Trees', 'Graphs', 'Hashing', 'Advanced Structures'],
    prerequisites: ['Algorithm Fundamentals', 'Recursion Mastery'],
    learningOutcomes: [
      'Master tree balancing techniques',
      'Implement graph algorithms',
      'Design efficient hash functions',
      'Optimize for specific use cases'
    ],
    isEnrolled: false,
    progress: 0,
    estimatedCompletion: '5 weeks',
    instructor: 'Prof. Michael Zhang',
    modules: []
  },
  {
    id: 'graph-algorithms',
    title: 'Graph Algorithms Mastery',
    description: 'Master graph theory and its algorithmic applications',
    longDescription: 'From basic traversals to complex network algorithms, explore the fascinating world of graphs and their real-world applications in social networks, routing, and optimization.',
    totalHours: 28,
    completedHours: 0,
    enrolledUsers: 6234,
    averageRating: 4.7,
    difficulty: 'Advanced',
    tags: ['Graphs', 'Networks', 'Optimization', 'Algorithms'],
    prerequisites: ['Advanced Data Structures', 'Mathematical Foundations'],
    learningOutcomes: [
      'Implement graph representations',
      'Master traversal algorithms',
      'Solve shortest path problems',
      'Apply graph algorithms to real problems'
    ],
    isEnrolled: false,
    progress: 0,
    estimatedCompletion: '4 weeks',
    instructor: 'Dr. Elena Rodriguez',
    modules: []
  }
];

const progressData: ProgressData[] = [
  { date: '2024-01-01', hoursSpent: 2.5, conceptsLearned: 3, exercisesCompleted: 5 },
  { date: '2024-01-02', hoursSpent: 1.8, conceptsLearned: 2, exercisesCompleted: 4 },
  { date: '2024-01-03', hoursSpent: 3.2, conceptsLearned: 4, exercisesCompleted: 7 },
  { date: '2024-01-04', hoursSpent: 2.1, conceptsLearned: 3, exercisesCompleted: 6 },
  { date: '2024-01-05', hoursSpent: 4.0, conceptsLearned: 5, exercisesCompleted: 9 },
  { date: '2024-01-06', hoursSpent: 1.5, conceptsLearned: 2, exercisesCompleted: 3 },
  { date: '2024-01-07', hoursSpent: 2.8, conceptsLearned: 4, exercisesCompleted: 6 }
];

export const InteractiveLearningPaths: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleEnrollPath = (pathId: string) => {
    // Implementation for enrolling in a path
    console.log(`Enrolling in path: ${pathId}`);
  };

  const handleStartStep = (stepId: string) => {
    // Implementation for starting a learning step
    console.log(`Starting step: ${stepId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'from-green-500 to-emerald-500';
      case 'Intermediate': return 'from-yellow-500 to-orange-500';
      case 'Advanced': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getStepTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'interactive': return <Zap className="w-4 h-4" />;
      case 'quiz': return <Brain className="w-4 h-4" />;
      case 'coding': return <Code className="w-4 h-4" />;
      case 'reading': return <BookOpen className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  if (selectedPath && selectedModule) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Breadcrumb Navigation */}
          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <button 
                onClick={() => setSelectedPath(null)}
                className="hover:text-white transition-colors"
              >
                Learning Paths
              </button>
              <ChevronRight className="w-4 h-4" />
              <button 
                onClick={() => setSelectedModule(null)}
                className="hover:text-white transition-colors"
              >
                {selectedPath.title}
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{selectedModule.title}</span>
            </div>
          </MotionWrapper>

          {/* Module Header */}
          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white mb-3">{selectedModule.title}</h1>
                    <p className="text-white/70 text-lg mb-4">{selectedModule.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge className={`bg-gradient-to-r ${getDifficultyColor(selectedModule.difficulty)} text-white`}>
                        {selectedModule.difficulty}
                      </Badge>
                      <span className="text-white/60 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedModule.estimatedHours} hours
                      </span>
                      <span className="text-white/60 flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {selectedModule.completedSteps}/{selectedModule.totalSteps} steps
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white mb-1">
                      {Math.round((selectedModule.completedSteps / selectedModule.totalSteps) * 100)}%
                    </div>
                    <p className="text-white/60 text-sm">Complete</p>
                    <Progress 
                      value={(selectedModule.completedSteps / selectedModule.totalSteps) * 100} 
                      className="w-32 h-2 mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Learning Steps */}
          <MotionWrapper variant="fadeInUp" delay={0.3}>
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Learning Steps</CardTitle>
                <CardDescription className="text-white/60">
                  Follow these steps to master {selectedModule.title.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedModule.steps.map((step, index) => (
                  <MotionWrapper key={step.id} variant="slideInFromLeft" delay={index * 0.1}>
                    <MicroInteraction type="card">
                      <div className={`p-6 rounded-xl border transition-all duration-300 ${
                        step.isCompleted 
                          ? 'bg-green-500/10 border-green-500/30' 
                          : step.isUnlocked 
                            ? 'bg-white/5 border-white/10 hover:border-white/20 cursor-pointer' 
                            : 'bg-white/5 border-white/10 opacity-60'
                      }`}>
                        <div className="flex items-start gap-4">
                          {/* Step Status Icon */}
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            step.isCompleted 
                              ? 'bg-green-500/20 text-green-400' 
                              : step.isUnlocked 
                                ? 'bg-cyan-500/20 text-cyan-400' 
                                : 'bg-white/10 text-white/40'
                          }`}>
                            {step.isCompleted ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : step.isUnlocked ? (
                              getStepTypeIcon(step.type)
                            ) : (
                              <Lock className="w-6 h-6" />
                            )}
                          </div>

                          {/* Step Content */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`font-semibold ${
                                step.isUnlocked ? 'text-white' : 'text-white/60'
                              }`}>
                                {step.title}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-white/10 text-white/60 text-xs">
                                  {step.type}
                                </Badge>
                                <span className="text-white/40 text-sm">
                                  {step.duration} min
                                </span>
                              </div>
                            </div>
                            
                            <p className={`text-sm mb-3 ${
                              step.isUnlocked ? 'text-white/70' : 'text-white/40'
                            }`}>
                              {step.description}
                            </p>

                            {/* Step Stats */}
                            <div className="flex items-center gap-6 text-xs text-white/60 mb-4">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {step.completionRate}% completion rate
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Avg. {step.averageTime} min
                              </span>
                              <span className="flex items-center gap-1">
                                <BarChart3 className="w-3 h-3" />
                                Difficulty {step.difficulty}/5
                              </span>
                            </div>

                            {/* Learning Objectives */}
                            {expandedStep === step.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-white/10 pt-4 mt-4"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="text-white font-medium text-sm mb-2">Learning Objectives:</h4>
                                    <ul className="space-y-1">
                                      {step.learningObjectives.map((objective, i) => (
                                        <li key={i} className="text-white/60 text-xs flex items-start gap-2">
                                          <Target className="w-3 h-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                                          {objective}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-white font-medium text-sm mb-2">Resources:</h4>
                                    <ul className="space-y-1">
                                      {step.resources.map((resource, i) => (
                                        <li key={i} className="text-white/60 text-xs flex items-start gap-2">
                                          <BookOpen className="w-3 h-3 mt-0.5 text-green-400 flex-shrink-0" />
                                          {resource}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* Step Actions */}
                            <div className="flex items-center justify-between pt-4">
                              <button
                                onClick={() => setExpandedStep(
                                  expandedStep === step.id ? null : step.id
                                )}
                                className="text-cyan-400 text-sm hover:underline"
                              >
                                {expandedStep === step.id ? 'Show Less' : 'Show Details'}
                              </button>
                              
                              {step.isUnlocked && (
                                <Button
                                  onClick={() => handleStartStep(step.id)}
                                  disabled={!step.isUnlocked}
                                  className={
                                    step.isCompleted 
                                      ? "bg-green-600 hover:bg-green-700" 
                                      : "bg-cyan-600 hover:bg-cyan-700"
                                  }
                                >
                                  {step.isCompleted ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Review
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-4 h-4 mr-2" />
                                      Start
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
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
      </div>
    );
  }

  if (selectedPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Back Navigation */}
          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <button 
              onClick={() => setSelectedPath(null)}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Learning Paths
            </button>
          </MotionWrapper>

          {/* Path Overview */}
          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold text-white mb-4">{selectedPath.title}</h1>
                    <p className="text-white/70 text-lg mb-6">{selectedPath.longDescription}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedPath.tags.map((tag, i) => (
                        <Badge key={i} className="bg-white/10 text-white/70">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h3 className="text-white font-semibold mb-2">Prerequisites:</h3>
                        <ul className="space-y-1">
                          {selectedPath.prerequisites.map((prereq, i) => (
                            <li key={i} className="text-white/60 text-sm flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              {prereq}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-white font-semibold mb-2">Learning Outcomes:</h3>
                        <ul className="space-y-1">
                          {selectedPath.learningOutcomes.slice(0, 4).map((outcome, i) => (
                            <li key={i} className="text-white/60 text-sm flex items-center gap-2">
                              <Target className="w-3 h-3 text-cyan-400" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <div className="text-3xl font-bold text-white mb-1">
                            {selectedPath.progress}%
                          </div>
                          <p className="text-white/60 text-sm">Complete</p>
                          <Progress value={selectedPath.progress} className="w-full h-3 mt-2" />
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/60">Total Duration:</span>
                            <span className="text-white">{selectedPath.totalHours} hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Enrolled:</span>
                            <span className="text-white">{selectedPath.enrolledUsers.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Rating:</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-white">{selectedPath.averageRating}</span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Difficulty:</span>
                            <Badge className={`bg-gradient-to-r ${getDifficultyColor(selectedPath.difficulty)} text-white text-xs`}>
                              {selectedPath.difficulty}
                            </Badge>
                          </div>
                        </div>

                        {selectedPath.isEnrolled ? (
                          <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                            <Rocket className="w-4 h-4 mr-2" />
                            Continue Learning
                          </Button>
                        ) : (
                          <Button 
                            className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700"
                            onClick={() => handleEnrollPath(selectedPath.id)}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Enroll Now
                          </Button>
                        )}
                      </CardContent>
                    </Card>

                    {selectedPath.isEnrolled && (
                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <h3 className="text-white font-semibold mb-3 text-sm">Progress This Week</h3>
                          <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={progressData.slice(-7)}>
                                <defs>
                                  <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <Area
                                  type="monotone"
                                  dataKey="hoursSpent"
                                  stroke="#06b6d4"
                                  fillOpacity={1}
                                  fill="url(#progressGradient)"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>

          {/* Learning Modules */}
          <MotionWrapper variant="fadeInUp" delay={0.3}>
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Learning Modules</CardTitle>
                <CardDescription className="text-white/60">
                  Complete each module to master the concepts progressively
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPath.modules.map((module, index) => (
                  <MotionWrapper key={module.id} variant="slideInFromLeft" delay={index * 0.1}>
                    <MicroInteraction type="card">
                      <div 
                        className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                          module.isUnlocked 
                            ? 'bg-white/5 border-white/10 hover:border-white/20' 
                            : 'bg-white/5 border-white/10 opacity-60'
                        }`}
                        onClick={() => module.isUnlocked && setSelectedModule(module)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              module.completedSteps === module.totalSteps
                                ? 'bg-green-500/20 text-green-400'
                                : module.isUnlocked 
                                  ? 'bg-cyan-500/20 text-cyan-400' 
                                  : 'bg-white/10 text-white/40'
                            }`}>
                              {module.completedSteps === module.totalSteps ? (
                                <Trophy className="w-6 h-6" />
                              ) : module.isUnlocked ? (
                                <BookOpen className="w-6 h-6" />
                              ) : (
                                <Lock className="w-6 h-6" />
                              )}
                            </div>
                            
                            <div>
                              <h3 className={`font-semibold mb-1 ${
                                module.isUnlocked ? 'text-white' : 'text-white/60'
                              }`}>
                                {module.title}
                              </h3>
                              <p className={`text-sm ${
                                module.isUnlocked ? 'text-white/70' : 'text-white/40'
                              }`}>
                                {module.description}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-xs">
                                <span className="text-white/60 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {module.estimatedHours}h
                                </span>
                                <span className="text-white/60 flex items-center gap-1">
                                  <Target className="w-3 h-3" />
                                  {module.completedSteps}/{module.totalSteps} steps
                                </span>
                                <Badge className={`bg-gradient-to-r ${getDifficultyColor(module.difficulty)} text-white text-xs`}>
                                  {module.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold text-white mb-1">
                              {Math.round((module.completedSteps / module.totalSteps) * 100)}%
                            </div>
                            <Progress 
                              value={(module.completedSteps / module.totalSteps) * 100} 
                              className="w-24 h-2"
                            />
                            {module.isUnlocked && (
                              <ChevronRight className="w-5 h-5 text-white/40 mt-2 mx-auto" />
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <MotionWrapper variant="fadeInUp" delay={0.1}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Interactive Learning Paths</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Structured learning journeys designed to take you from beginner to expert in algorithmic thinking
            </p>
          </div>
        </MotionWrapper>

        {/* Learning Paths Grid */}
        <MotionWrapper variant="stagger">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {learningPaths.map((path, index) => (
              <MotionWrapper key={path.id} variant="scaleIn" delay={index * 0.2}>
                <MicroInteraction type="card">
                  <Card 
                    className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 cursor-pointer transition-all duration-300 h-full"
                    onClick={() => setSelectedPath(path)}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h2 className="text-xl font-bold text-white">{path.title}</h2>
                            <Badge className={`bg-gradient-to-r ${getDifficultyColor(path.difficulty)} text-white`}>
                              {path.difficulty}
                            </Badge>
                          </div>
                          <p className="text-white/70 mb-4">{path.description}</p>
                        </div>
                        
                        {path.isEnrolled && (
                          <Badge className="bg-green-500/20 text-green-400 ml-4">
                            Enrolled
                          </Badge>
                        )}
                      </div>

                      {path.isEnrolled && (
                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-white/60">Progress</span>
                            <span className="text-white">{path.progress}%</span>
                          </div>
                          <Progress value={path.progress} className="h-2" />
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-white/40">
                              {path.completedHours}/{path.totalHours} hours
                            </span>
                            <span className="text-white/40">
                              Est. {path.estimatedCompletion} remaining
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-6">
                        {path.tags.slice(0, 4).map((tag, i) => (
                          <Badge key={i} className="bg-white/10 text-white/60 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                        <div>
                          <div className="text-lg font-bold text-white">{path.totalHours}h</div>
                          <div className="text-xs text-white/60">Duration</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">{path.enrolledUsers.toLocaleString()}</div>
                          <div className="text-xs text-white/60">Students</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-lg font-bold text-white">{path.averageRating}</span>
                          </div>
                          <div className="text-xs text-white/60">Rating</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {path.lastAccessed && (
                          <span className="text-white/40 text-xs">
                            Last accessed {path.lastAccessed}
                          </span>
                        )}
                        <Button 
                          className={path.isEnrolled 
                            ? "bg-green-600 hover:bg-green-700 ml-auto" 
                            : "bg-cyan-600 hover:bg-cyan-700 ml-auto"
                          }
                        >
                          {path.isEnrolled ? (
                            <>
                              <Rocket className="w-4 h-4 mr-2" />
                              Continue
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start Learning
                            </>
                          )}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </MicroInteraction>
              </MotionWrapper>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default InteractiveLearningPaths;