import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Star,
  Zap,
  Calendar,
  Users,
  Trophy,
  ChevronDown,
  ChevronUp,
  Play,
  Eye,
  Download,
  Share2,
  Bookmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MotionWrapper, MicroInteraction } from '@/components/motion/MotionWrapper';

// Types for recommendations
interface LearningRecommendation {
  id: string;
  type: 'algorithm' | 'concept' | 'practice' | 'review';
  title: string;
  description: string;
  reason: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  prerequisites: string[];
  learningOutcomes: string[];
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  progress: number;
  isBookmarked: boolean;
  completedByPeers: number;
  averageRating: number;
  thumbnailUrl?: string;
}

interface LearningPattern {
  type: string;
  confidence: number;
  description: string;
  impact: string;
  suggestions: string[];
}

interface PersonalizedInsight {
  id: string;
  type: 'strength' | 'weakness' | 'opportunity' | 'trend';
  title: string;
  description: string;
  actionItems: string[];
  icon: React.ReactNode;
  color: string;
}

// Mock data for recommendations
const generateRecommendations = (): LearningRecommendation[] => [
  {
    id: '1',
    type: 'algorithm',
    title: 'Binary Search Tree Operations',
    description: 'Master insertion, deletion, and traversal operations in BSTs',
    reason: 'Based on your recent progress with linear data structures, tree algorithms are the next logical step',
    difficulty: 'Intermediate',
    estimatedTime: '45 minutes',
    prerequisites: ['Binary Trees', 'Recursion Basics'],
    learningOutcomes: ['Implement BST operations', 'Understand tree traversals', 'Analyze time complexity'],
    priority: 'high',
    tags: ['Trees', 'Recursion', 'Data Structures'],
    progress: 0,
    isBookmarked: false,
    completedByPeers: 847,
    averageRating: 4.8
  },
  {
    id: '2',
    type: 'practice',
    title: 'Dynamic Programming Challenges',
    description: 'Solve real-world problems using memoization and tabulation',
    reason: 'Your algorithm analysis skills are strong - time to apply them to optimization problems',
    difficulty: 'Advanced',
    estimatedTime: '1.5 hours',
    prerequisites: ['Recursion', 'Algorithm Analysis', 'Basic DP'],
    learningOutcomes: ['Master DP patterns', 'Optimize recursive solutions', 'Handle state transitions'],
    priority: 'medium',
    tags: ['Dynamic Programming', 'Optimization', 'Problem Solving'],
    progress: 25,
    isBookmarked: true,
    completedByPeers: 423,
    averageRating: 4.6
  },
  {
    id: '3',
    type: 'concept',
    title: 'Graph Representation Methods',
    description: 'Compare adjacency lists, matrices, and edge lists for different use cases',
    reason: 'Excellent foundation for upcoming graph algorithms - builds on your data structure knowledge',
    difficulty: 'Intermediate',
    estimatedTime: '30 minutes',
    prerequisites: ['Arrays', 'Linked Lists', 'Basic Graph Theory'],
    learningOutcomes: ['Choose optimal representations', 'Understand space-time tradeoffs', 'Implement graph structures'],
    priority: 'high',
    tags: ['Graphs', 'Data Structures', 'Theory'],
    progress: 0,
    isBookmarked: false,
    completedByPeers: 1205,
    averageRating: 4.7
  },
  {
    id: '4',
    type: 'review',
    title: 'Sorting Algorithm Comparison',
    description: 'Review and compare different sorting techniques you\'ve learned',
    reason: 'Consolidate your sorting knowledge before moving to advanced algorithms',
    difficulty: 'Beginner',
    estimatedTime: '25 minutes',
    prerequisites: ['Basic Sorting'],
    learningOutcomes: ['Compare algorithms', 'Choose optimal sorting', 'Understand stability'],
    priority: 'low',
    tags: ['Sorting', 'Review', 'Comparison'],
    progress: 80,
    isBookmarked: false,
    completedByPeers: 2341,
    averageRating: 4.5
  },
  {
    id: '5',
    type: 'algorithm',
    title: 'Dijkstra\'s Shortest Path',
    description: 'Learn the fundamental shortest path algorithm for weighted graphs',
    reason: 'Perfect next step after mastering graph representations',
    difficulty: 'Advanced',
    estimatedTime: '1 hour',
    prerequisites: ['Graph Representations', 'Priority Queues', 'BFS'],
    learningOutcomes: ['Implement Dijkstra\'s algorithm', 'Use priority queues', 'Handle weighted graphs'],
    priority: 'medium',
    tags: ['Graphs', 'Shortest Path', 'Algorithms'],
    progress: 0,
    isBookmarked: true,
    completedByPeers: 634,
    averageRating: 4.9
  }
];

const learningPatterns: LearningPattern[] = [
  {
    type: 'Learning Velocity',
    confidence: 85,
    description: 'You learn new concepts 23% faster in the morning (8-11 AM)',
    impact: 'Scheduling complex topics during peak hours could improve retention by 15%',
    suggestions: ['Schedule difficult algorithms for morning sessions', 'Use afternoons for practice problems', 'Take breaks every 45 minutes']
  },
  {
    type: 'Retention Style',
    confidence: 92,
    description: 'Visual learners like you retain 40% more through interactive demonstrations',
    impact: 'Prioritizing animated visualizations over text-based explanations',
    suggestions: ['Focus on visual algorithm animations', 'Draw diagrams while learning', 'Use step-by-step visualizations']
  },
  {
    type: 'Challenge Preference',
    confidence: 78,
    description: 'You perform best with medium-difficulty challenges that build incrementally',
    impact: 'Avoiding frustration while maintaining engagement and growth',
    suggestions: ['Start with foundational concepts', 'Progress gradually through difficulty levels', 'Mix theory with hands-on practice']
  }
];

const personalizedInsights: PersonalizedInsight[] = [
  {
    id: '1',
    type: 'strength',
    title: 'Algorithm Analysis Expert',
    description: 'Your time complexity analysis skills are in the top 15% of learners',
    actionItems: ['Apply this strength to system design', 'Mentor others in complexity analysis', 'Tackle optimization challenges'],
    icon: <Brain className="w-4 h-4" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'Graph Algorithms Gateway',
    description: 'Your strong foundation makes you ready for advanced graph algorithms',
    actionItems: ['Start with graph representations', 'Progress to traversal algorithms', 'Master shortest path algorithms'],
    icon: <Target className="w-4 h-4" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '3',
    type: 'trend',
    title: 'Consistent Learning Streak',
    description: 'Your 15-day learning streak shows excellent momentum',
    actionItems: ['Maintain daily 30-minute sessions', 'Set weekly learning goals', 'Celebrate milestone achievements'],
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '4',
    type: 'weakness',
    title: 'Dynamic Programming Gap',
    description: 'This is a growth area compared to your other strong skills',
    actionItems: ['Start with basic memoization', 'Practice with classic DP problems', 'Focus on state transition patterns'],
    icon: <Lightbulb className="w-4 h-4" />,
    color: 'from-orange-500 to-red-500'
  }
];

export const PersonalizedRecommendations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPatterns, setExpandedPatterns] = useState<string[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>(['2', '5']);
  const [recommendations] = useState(generateRecommendations());

  const togglePatternExpansion = (patternType: string) => {
    setExpandedPatterns(prev =>
      prev.includes(patternType)
        ? prev.filter(type => type !== patternType)
        : [...prev, patternType]
    );
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const filteredRecommendations = recommendations.filter(rec =>
    selectedCategory === 'all' || rec.type === selectedCategory
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'strength': return 'from-green-500 to-emerald-500';
      case 'weakness': return 'from-orange-500 to-red-500';
      case 'opportunity': return 'from-blue-500 to-cyan-500';
      case 'trend': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <MotionWrapper variant="fadeInUp" delay={0.1}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Personalized Learning Recommendations</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              AI-powered suggestions tailored to your learning style, progress, and goals
            </p>
          </div>
        </MotionWrapper>

        {/* Learning Patterns Analysis */}
        <MotionWrapper variant="fadeInUp" delay={0.2}>
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Your Learning Patterns
              </CardTitle>
              <CardDescription className="text-white/60">
                AI analysis of your learning behavior and optimal study conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {learningPatterns.map((pattern, index) => (
                <MotionWrapper key={pattern.type} variant="scaleIn" delay={index * 0.1}>
                  <MicroInteraction type="card">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                      <div 
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => togglePatternExpansion(pattern.type)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                          <span className="text-white font-semibold text-sm">{pattern.type}</span>
                          <Badge className="bg-cyan-500/20 text-cyan-400 text-xs">
                            {pattern.confidence}% confidence
                          </Badge>
                        </div>
                        {expandedPatterns.includes(pattern.type) ? (
                          <ChevronUp className="w-4 h-4 text-white/60" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/60" />
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {expandedPatterns.includes(pattern.type) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-3"
                          >
                            <p className="text-white/70 text-sm">{pattern.description}</p>
                            <p className="text-white/60 text-sm italic">{pattern.impact}</p>
                            <div className="space-y-2">
                              <span className="text-white/80 text-sm font-medium">Recommendations:</span>
                              <ul className="space-y-1">
                                {pattern.suggestions.map((suggestion, i) => (
                                  <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                                    <ArrowRight className="w-3 h-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                                    {suggestion}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </MicroInteraction>
                </MotionWrapper>
              ))}
            </CardContent>
          </Card>
        </MotionWrapper>

        {/* Personalized Insights */}
        <MotionWrapper variant="fadeInUp" delay={0.3}>
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Personal Learning Insights
              </CardTitle>
              <CardDescription className="text-white/60">
                Key insights about your strengths, opportunities, and learning trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalizedInsights.map((insight, index) => (
                  <MotionWrapper key={insight.id} variant="scaleIn" delay={index * 0.1}>
                    <MicroInteraction type="card">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${insight.color} flex items-center justify-center`}>
                            {insight.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm mb-1">{insight.title}</h3>
                            <p className="text-white/60 text-xs">{insight.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <span className="text-white/80 text-xs font-medium">Action Items:</span>
                          <ul className="space-y-1">
                            {insight.actionItems.map((action, i) => (
                              <li key={i} className="text-white/60 text-xs flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></div>
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </MicroInteraction>
                  </MotionWrapper>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        {/* Recommendations */}
        <MotionWrapper variant="fadeInUp" delay={0.4}>
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                Recommended Learning Path
              </CardTitle>
              <CardDescription className="text-white/60">
                Curated content based on your progress, learning style, and goals
              </CardDescription>
              
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="bg-white/10 border-white/20 mt-4">
                  <TabsTrigger value="all" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="algorithm" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                    Algorithms
                  </TabsTrigger>
                  <TabsTrigger value="concept" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                    Concepts
                  </TabsTrigger>
                  <TabsTrigger value="practice" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                    Practice
                  </TabsTrigger>
                  <TabsTrigger value="review" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                    Review
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="space-y-6">
              {filteredRecommendations.map((rec, index) => (
                <MotionWrapper key={rec.id} variant="slideInFromLeft" delay={index * 0.1}>
                  <MicroInteraction type="card">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-white font-semibold">{rec.title}</h3>
                            <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>
                              {rec.priority} priority
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(rec.difficulty)}`}>
                              {rec.difficulty}
                            </Badge>
                          </div>
                          <p className="text-white/70 text-sm mb-3">{rec.description}</p>
                          <p className="text-cyan-400 text-sm italic">{rec.reason}</p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(rec.id)}
                          className={`ml-4 ${bookmarkedItems.includes(rec.id) ? 'text-yellow-400' : 'text-white/40'}`}
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarkedItems.includes(rec.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>

                      {/* Progress */}
                      {rec.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-white/60">Progress</span>
                            <span className="text-white/80">{rec.progress}%</span>
                          </div>
                          <Progress value={rec.progress} className="h-2 bg-white/10" />
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {rec.tags.map((tag, i) => (
                          <Badge key={i} className="bg-white/10 text-white/60 text-xs px-2 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Prerequisites & Outcomes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-white/80 text-sm font-medium">Prerequisites:</span>
                          <ul className="mt-1 space-y-1">
                            {rec.prerequisites.map((prereq, i) => (
                              <li key={i} className="text-white/60 text-xs flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-green-400"></div>
                                {prereq}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <span className="text-white/80 text-sm font-medium">You'll Learn:</span>
                          <ul className="mt-1 space-y-1">
                            {rec.learningOutcomes.slice(0, 3).map((outcome, i) => (
                              <li key={i} className="text-white/60 text-xs flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Stats & Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {rec.estimatedTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {rec.completedByPeers.toLocaleString()} completed
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            {rec.averageRating}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                            <Play className="w-4 h-4 mr-1" />
                            Start Learning
                          </Button>
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
};

export default PersonalizedRecommendations;