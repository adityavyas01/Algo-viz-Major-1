import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Target,
  Brain,
  Award,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp,
  Users,
  BookOpen,
  Code,
  Zap,
  Trophy,
  Medal,
  Shield,
  Calendar,
  Eye,
  Download,
  Share2,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  FileText,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MotionWrapper, MicroInteraction } from '@/components/motion/MotionWrapper';

// Assessment Types and Interfaces
interface AssessmentQuestion {
  id: string;
  type: 'multiple-choice' | 'code-completion' | 'algorithm-trace' | 'complexity-analysis' | 'drag-drop';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  algorithm: string;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  codeSnippet?: string;
  timeLimit: number; // in seconds
  points: number;
  tags: string[];
}

interface UserAssessment {
  id: string;
  userId: string;
  assessmentType: string;
  startTime: Date;
  endTime?: Date;
  questions: AssessmentQuestion[];
  answers: { [questionId: string]: string | number };
  score: number;
  maxScore: number;
  timeSpent: number;
  isCompleted: boolean;
  adaptiveLevel: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

interface SkillMetrics {
  category: string;
  proficiencyLevel: number;
  questionsAnswered: number;
  correctAnswers: number;
  averageTime: number;
  difficulty: string;
  lastAssessed: Date;
  trending: 'up' | 'down' | 'stable';
}

interface CertificationPath {
  id: string;
  title: string;
  description: string;
  level: 'foundation' | 'intermediate' | 'advanced' | 'expert';
  requiredSkills: string[];
  estimatedTime: number;
  prerequisites: string[];
  badge: string;
  isUnlocked: boolean;
  progress: number;
  completedTests: number;
  totalTests: number;
}

// Mock Data
const mockQuestions: AssessmentQuestion[] = [
  {
    id: '1',
    type: 'multiple-choice',
    difficulty: 'beginner',
    category: 'Arrays & Searching',
    algorithm: 'binary-search',
    question: 'What is the time complexity of binary search on a sorted array?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    correctAnswer: 1,
    explanation: 'Binary search eliminates half of the remaining elements with each comparison, resulting in O(log n) time complexity.',
    timeLimit: 60,
    points: 10,
    tags: ['time-complexity', 'searching', 'big-o']
  },
  {
    id: '2',
    type: 'code-completion',
    difficulty: 'intermediate',
    category: 'Sorting Algorithms',
    algorithm: 'quick-sort',
    question: 'Complete the partition function for QuickSort:',
    codeSnippet: `function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      // Complete this line
      [arr[i], arr[j]] = _____;
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    correctAnswer: '[arr[j], arr[i]]',
    explanation: 'We swap arr[i] and arr[j] to move the smaller element to the left partition.',
    timeLimit: 120,
    points: 20,
    tags: ['sorting', 'quicksort', 'partitioning']
  },
  {
    id: '3',
    type: 'complexity-analysis',
    difficulty: 'advanced',
    category: 'Graph Algorithms',
    algorithm: 'dijkstra',
    question: 'What is the space complexity of Dijkstra\'s algorithm using a min-heap?',
    options: ['O(1)', 'O(V)', 'O(E)', 'O(V + E)'],
    correctAnswer: 3,
    explanation: 'Dijkstra\'s algorithm requires space for the distance array O(V), visited set O(V), and priority queue O(V), totaling O(V). However, considering the graph representation, it\'s O(V + E).',
    timeLimit: 90,
    points: 25,
    tags: ['graphs', 'dijkstra', 'space-complexity']
  }
];

const mockSkillMetrics: SkillMetrics[] = [
  {
    category: 'Arrays & Searching',
    proficiencyLevel: 85,
    questionsAnswered: 45,
    correctAnswers: 38,
    averageTime: 42,
    difficulty: 'intermediate',
    lastAssessed: new Date(),
    trending: 'up'
  },
  {
    category: 'Sorting Algorithms',
    proficiencyLevel: 72,
    questionsAnswered: 32,
    correctAnswers: 23,
    averageTime: 67,
    difficulty: 'beginner',
    lastAssessed: new Date(),
    trending: 'stable'
  },
  {
    category: 'Graph Algorithms',
    proficiencyLevel: 58,
    questionsAnswered: 28,
    correctAnswers: 16,
    averageTime: 89,
    difficulty: 'advanced',
    lastAssessed: new Date(),
    trending: 'down'
  },
  {
    category: 'Dynamic Programming',
    proficiencyLevel: 41,
    questionsAnswered: 15,
    correctAnswers: 6,
    averageTime: 125,
    difficulty: 'advanced',
    lastAssessed: new Date(),
    trending: 'up'
  }
];

const mockCertifications: CertificationPath[] = [
  {
    id: '1',
    title: 'Algorithm Fundamentals',
    description: 'Master the basics of algorithm analysis, time/space complexity, and fundamental data structures',
    level: 'foundation',
    requiredSkills: ['Arrays & Searching', 'Basic Sorting', 'Time Complexity'],
    estimatedTime: 40,
    prerequisites: [],
    badge: '🏆',
    isUnlocked: true,
    progress: 75,
    completedTests: 3,
    totalTests: 4
  },
  {
    id: '2',
    title: 'Advanced Data Structures',
    description: 'Deep dive into trees, graphs, heaps, and advanced data structure implementations',
    level: 'intermediate',
    requiredSkills: ['Binary Trees', 'Graph Algorithms', 'Heap Operations'],
    estimatedTime: 60,
    prerequisites: ['Algorithm Fundamentals'],
    badge: '🥇',
    isUnlocked: true,
    progress: 45,
    completedTests: 2,
    totalTests: 5
  },
  {
    id: '3',
    title: 'Optimization Expert',
    description: 'Master dynamic programming, greedy algorithms, and advanced optimization techniques',
    level: 'advanced',
    requiredSkills: ['Dynamic Programming', 'Greedy Algorithms', 'Complex Analysis'],
    estimatedTime: 80,
    prerequisites: ['Advanced Data Structures'],
    badge: '💎',
    isUnlocked: false,
    progress: 0,
    completedTests: 0,
    totalTests: 6
  }
];

// Assessment Question Component
const AssessmentQuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  timeRemaining,
  showResults = false
}: {
  question: AssessmentQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string | number;
  onAnswerSelect: (answer: string | number) => void;
  timeRemaining: number;
  showResults?: boolean;
}) => {
  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice':
        return <CheckCircle className="w-5 h-5" />;
      case 'code-completion':
        return <Code className="w-5 h-5" />;
      case 'complexity-analysis':
        return <BarChart3 className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'from-green-500 to-emerald-500';
      case 'intermediate':
        return 'from-yellow-500 to-orange-500';
      case 'advanced':
        return 'from-red-500 to-pink-500';
      case 'expert':
        return 'from-purple-500 to-indigo-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getDifficultyColor(question.difficulty)} flex items-center justify-center`}>
              {getQuestionIcon(question.type)}
            </div>
            <div>
              <div className="text-white/60 text-sm">
                Question {questionNumber} of {totalQuestions}
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`bg-gradient-to-r ${getDifficultyColor(question.difficulty)} text-white text-xs`}>
                  {question.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs text-white/70">
                  {question.points} points
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-white/60 text-sm">Time Remaining</div>
            <div className={`text-lg font-mono ${timeRemaining < 30 ? 'text-red-400' : 'text-white'}`}>
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        <div className="mb-2">
          <span className="text-cyan-400 text-sm">{question.category} • {question.algorithm}</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-white text-lg font-medium mb-4">{question.question}</h3>
            
            {question.codeSnippet && (
              <div className="bg-black/40 rounded-lg p-4 mb-4">
                <pre className="text-sm text-white/90 overflow-x-auto">
                  <code>{question.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>

          {question.type === 'multiple-choice' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className={`w-full justify-start p-4 h-auto text-left ${
                      selectedAnswer === index
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'border-white/10 text-white hover:bg-white/5'
                    } ${
                      showResults && index === question.correctAnswer
                        ? 'bg-green-500/20 border-green-400 text-green-300'
                        : showResults && selectedAnswer === index && index !== question.correctAnswer
                        ? 'bg-red-500/20 border-red-400 text-red-300'
                        : ''
                    }`}
                    onClick={() => !showResults && onAnswerSelect(index)}
                    disabled={showResults}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                        selectedAnswer === index ? 'border-cyan-400 bg-cyan-400 text-white' : 'border-white/30'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}

          {question.type === 'code-completion' && (
            <div className="space-y-3">
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder:text-white/40 resize-none font-mono"
                rows={3}
                placeholder="Enter your answer here..."
                value={selectedAnswer as string || ''}
                onChange={(e) => onAnswerSelect(e.target.value)}
                disabled={showResults}
              />
            </div>
          )}

          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-300 font-medium mb-2">Explanation</h4>
                  <p className="text-white/80 text-sm leading-relaxed">{question.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Skill Metrics Dashboard
const SkillMetricsDashboard = ({ metrics }: { metrics: SkillMetrics[] }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {Math.round(metrics.reduce((sum, m) => sum + m.proficiencyLevel, 0) / metrics.length)}%
            </div>
            <div className="text-white/60 text-sm">Overall Proficiency</div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {metrics.reduce((sum, m) => sum + m.correctAnswers, 0)}
            </div>
            <div className="text-white/60 text-sm">Correct Answers</div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {Math.round(metrics.reduce((sum, m) => sum + m.averageTime, 0) / metrics.length)}s
            </div>
            <div className="text-white/60 text-sm">Avg. Response Time</div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-white">
              {metrics.filter(m => m.trending === 'up').length}
            </div>
            <div className="text-white/60 text-sm">Improving Skills</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Skill Proficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">{metric.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm">{metric.proficiencyLevel}%</span>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        metric.trending === 'up' ? 'text-green-400' :
                        metric.trending === 'down' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {metric.trending === 'up' ? '↗' : metric.trending === 'down' ? '↘' : '→'}
                      </div>
                    </div>
                  </div>
                  <Progress value={metric.proficiencyLevel} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium text-sm">{metric.category}</h4>
                    <Badge className={`text-xs ${
                      metric.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                      metric.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {metric.difficulty}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-white/60">Questions: </span>
                      <span className="text-white">{metric.questionsAnswered}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Accuracy: </span>
                      <span className="text-white">
                        {Math.round((metric.correctAnswers / metric.questionsAnswered) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Certification Pathways Component
const CertificationPathways = ({ certifications }: { certifications: CertificationPath[] }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'foundation':
        return 'from-green-500 to-emerald-500';
      case 'intermediate':
        return 'from-blue-500 to-cyan-500';
      case 'advanced':
        return 'from-purple-500 to-pink-500';
      case 'expert':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-white text-2xl font-bold mb-2">Certification Pathways</h2>
        <p className="text-white/70">Earn recognized certificates to showcase your algorithm mastery</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <MicroInteraction key={cert.id} type="card">
            <Card className={`bg-white/5 backdrop-blur-md border-white/10 ${
              !cert.isUnlocked ? 'opacity-60' : ''
            }`}>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getLevelColor(cert.level)} flex items-center justify-center mx-auto mb-4 text-2xl`}>
                    {cert.badge}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{cert.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{cert.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">Progress</span>
                    <span className="text-white text-sm">{cert.progress}%</span>
                  </div>
                  <Progress value={cert.progress} className="h-3" />
                  
                  <div className="text-center text-white/60 text-sm">
                    {cert.completedTests} of {cert.totalTests} assessments completed
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white/80 text-sm font-medium mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {cert.requiredSkills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs text-white/70">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1 text-white/60">
                        <Clock className="w-4 h-4" />
                        {cert.estimatedTime}h
                      </div>
                      <div className="flex items-center gap-1 text-white/60">
                        <Trophy className="w-4 h-4" />
                        {cert.level}
                      </div>
                    </div>

                    {cert.prerequisites.length > 0 && (
                      <div>
                        <h5 className="text-white/60 text-xs mb-1">Prerequisites:</h5>
                        <div className="text-xs text-white/50">
                          {cert.prerequisites.join(', ')}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    className={`w-full mt-4 ${
                      cert.isUnlocked
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                        : 'bg-white/10 text-white/60 cursor-not-allowed'
                    }`}
                    disabled={!cert.isUnlocked}
                  >
                    {cert.isUnlocked
                      ? cert.progress === 100 ? 'View Certificate' : 'Continue Assessment'
                      : 'Locked'
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>
          </MicroInteraction>
        ))}
      </div>
    </div>
  );
};

// Main Advanced Assessment System Component
export const AdvancedAssessmentSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('take-assessment');
  const [currentAssessment, setCurrentAssessment] = useState<UserAssessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: string | number }>({});

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentAssessment && timeRemaining > 0 && !showResults) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, currentAssessment, showResults]);

  const startAssessment = (type: string) => {
    const assessment: UserAssessment = {
      id: Date.now().toString(),
      userId: 'current-user',
      assessmentType: type,
      startTime: new Date(),
      questions: [...mockQuestions], // In real app, this would be selected based on adaptive algorithm
      answers: {},
      score: 0,
      maxScore: mockQuestions.reduce((sum, q) => sum + q.points, 0),
      timeSpent: 0,
      isCompleted: false,
      adaptiveLevel: 1,
      strengths: [],
      weaknesses: [],
      recommendations: []
    };
    
    setCurrentAssessment(assessment);
    setCurrentQuestionIndex(0);
    setTimeRemaining(assessment.questions[0]?.timeLimit || 60);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (questionId: string, answer: string | number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentAssessment && currentQuestionIndex < currentAssessment.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTimeRemaining(currentAssessment.questions[nextIndex].timeLimit);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      setTimeRemaining(currentAssessment!.questions[prevIndex].timeLimit);
    }
  };

  const finishAssessment = () => {
    if (currentAssessment) {
      // Calculate score and generate results
      let score = 0;
      currentAssessment.questions.forEach(question => {
        const userAnswer = selectedAnswers[question.id];
        if (userAnswer === question.correctAnswer) {
          score += question.points;
        }
      });

      const updatedAssessment = {
        ...currentAssessment,
        endTime: new Date(),
        answers: selectedAnswers,
        score,
        isCompleted: true,
        timeSpent: Date.now() - currentAssessment.startTime.getTime(),
        strengths: ['Binary Search', 'Time Complexity Analysis'],
        weaknesses: ['Dynamic Programming', 'Graph Algorithms'],
        recommendations: [
          'Focus on dynamic programming patterns',
          'Practice more graph traversal problems',
          'Review space complexity analysis'
        ]
      };

      setCurrentAssessment(updatedAssessment);
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <MotionWrapper variant="fadeInUp" delay={0.1}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Advanced Assessment System</h1>
            <p className="text-white/70 max-w-3xl mx-auto">
              Comprehensive skill evaluation with adaptive testing, performance analytics, and certification pathways
            </p>
          </div>
        </MotionWrapper>

        {/* Navigation */}
        {!currentAssessment && (
          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-white/5 backdrop-blur-md border border-white/10 mb-8">
                <TabsTrigger 
                  value="take-assessment" 
                  className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                >
                  <Play className="w-4 h-4" />
                  Take Assessment
                </TabsTrigger>
                <TabsTrigger 
                  value="performance" 
                  className="flex items-center gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                >
                  <BarChart3 className="w-4 h-4" />
                  Performance Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="certifications" 
                  className="flex items-center gap-2 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
                >
                  <Award className="w-4 h-4" />
                  Certifications
                </TabsTrigger>
              </TabsList>

              <TabsContent value="take-assessment">
                <MotionWrapper variant="fadeInUp" delay={0.3}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <MicroInteraction type="card">
                      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-cyan-400/50 transition-colors cursor-pointer"
                            onClick={() => startAssessment('adaptive-skill')}>
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                            <Brain className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-white font-bold text-lg mb-2">Adaptive Skill Assessment</h3>
                          <p className="text-white/70 text-sm mb-4">
                            AI-powered assessment that adapts to your skill level in real-time
                          </p>
                          <Badge className="bg-cyan-500/20 text-cyan-400">~20 minutes</Badge>
                        </CardContent>
                      </Card>
                    </MicroInteraction>

                    <MicroInteraction type="card">
                      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-purple-400/50 transition-colors cursor-pointer"
                            onClick={() => startAssessment('comprehensive')}>
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-white font-bold text-lg mb-2">Comprehensive Evaluation</h3>
                          <p className="text-white/70 text-sm mb-4">
                            Full assessment covering all algorithm categories and difficulty levels
                          </p>
                          <Badge className="bg-purple-500/20 text-purple-400">~45 minutes</Badge>
                        </CardContent>
                      </Card>
                    </MicroInteraction>

                    <MicroInteraction type="card">
                      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-green-400/50 transition-colors cursor-pointer"
                            onClick={() => startAssessment('quick-check')}>
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                            <Zap className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-white font-bold text-lg mb-2">Quick Skills Check</h3>
                          <p className="text-white/70 text-sm mb-4">
                            Rapid assessment to gauge your current proficiency level
                          </p>
                          <Badge className="bg-green-500/20 text-green-400">~10 minutes</Badge>
                        </CardContent>
                      </Card>
                    </MicroInteraction>
                  </div>
                </MotionWrapper>
              </TabsContent>

              <TabsContent value="performance">
                <SkillMetricsDashboard metrics={mockSkillMetrics} />
              </TabsContent>

              <TabsContent value="certifications">
                <CertificationPathways certifications={mockCertifications} />
              </TabsContent>
            </Tabs>
          </MotionWrapper>
        )}

        {/* Assessment Interface */}
        {currentAssessment && !showResults && (
          <MotionWrapper variant="fadeInUp" delay={0.3}>
            <div className="space-y-6">
              {/* Assessment Progress */}
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">
                      {currentAssessment.assessmentType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="text-white/60 text-sm">
                        Question {currentQuestionIndex + 1} of {currentAssessment.questions.length}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentAssessment(null)}
                        className="border-white/20 text-white/70 hover:bg-white/10"
                      >
                        Exit Assessment
                      </Button>
                    </div>
                  </div>
                  <Progress 
                    value={((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100} 
                    className="h-3"
                  />
                </CardContent>
              </Card>

              {/* Current Question */}
              <AssessmentQuestionCard
                question={currentAssessment.questions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={currentAssessment.questions.length}
                selectedAnswer={selectedAnswers[currentAssessment.questions[currentQuestionIndex].id]}
                onAnswerSelect={(answer) => handleAnswerSelect(currentAssessment.questions[currentQuestionIndex].id, answer)}
                timeRemaining={timeRemaining}
              />

              {/* Navigation Controls */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-3">
                  {currentQuestionIndex === currentAssessment.questions.length - 1 ? (
                    <Button
                      onClick={finishAssessment}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Finish Assessment
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={nextQuestion}
                      className="bg-cyan-600 hover:bg-cyan-700"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </MotionWrapper>
        )}

        {/* Results Interface */}
        {showResults && currentAssessment && (
          <MotionWrapper variant="fadeInUp" delay={0.3}>
            <div className="space-y-8">
              {/* Results Header */}
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-white text-3xl font-bold mb-4">Assessment Complete!</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">
                        {Math.round((currentAssessment.score / currentAssessment.maxScore) * 100)}%
                      </div>
                      <div className="text-white/60">Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400">
                        {Math.round(currentAssessment.timeSpent / 1000 / 60)}
                      </div>
                      <div className="text-white/60">Minutes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">
                        {currentAssessment.questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length}
                      </div>
                      <div className="text-white/60">Correct</div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={() => {
                        setCurrentAssessment(null);
                        setShowResults(false);
                        setActiveTab('performance');
                      }}
                      className="bg-cyan-600 hover:bg-cyan-700"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button
                      onClick={() => {
                        setCurrentAssessment(null);
                        setShowResults(false);
                      }}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Take Another
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentAssessment.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-white">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-md border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-orange-400" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentAssessment.weaknesses.map((weakness, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-orange-400" />
                          <span className="text-white">{weakness}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations */}
              <Card className="bg-white/5 backdrop-blur-md border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-cyan-400" />
                    Personalized Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentAssessment.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-cyan-500/10 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-cyan-400 text-sm">{index + 1}</span>
                        </div>
                        <span className="text-white">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </MotionWrapper>
        )}
      </div>
    </div>
  );
};

export default AdvancedAssessmentSystem;