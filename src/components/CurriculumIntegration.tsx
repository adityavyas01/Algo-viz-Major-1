import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  Target, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Users,
  Award,
  TrendingUp,
  Settings,
  Plus,
  Edit3,
  Trash2,
  Play,
  Pause,
  BarChart3,
  FileText,
  Link,
  Shuffle,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  prerequisites: string[];
  learningObjectives: string[];
  topics: Topic[];
  assessments: Assessment[];
  status: 'draft' | 'published' | 'archived';
  completionRate: number;
  enrolledStudents: number;
}

interface Topic {
  id: string;
  title: string;
  type: 'lecture' | 'interactive' | 'visualization' | 'coding' | 'quiz';
  duration: number;
  completed: boolean;
  algorithmType?: string;
  visualizationUrl?: string;
  codingChallenges?: string[];
}

interface Assessment {
  id: string;
  title: string;
  type: 'quiz' | 'coding-challenge' | 'project' | 'peer-review';
  questions: number;
  timeLimit: number;
  passingScore: number;
  attempts: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: string[];
  totalHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  enrolledStudents: number;
  completionRate: number;
  prerequisites: string[];
  certification: string;
}

interface CurriculumAnalytics {
  moduleId: string;
  totalEnrollments: number;
  activeStudents: number;
  completionRate: number;
  avgTimeToComplete: number;
  satisfactionScore: number;
  dropOffRate: number;
  mostDifficultTopic: string;
  bestPerformingTopic: string;
}

const mockCurriculumModules: CurriculumModule[] = [
  {
    id: '1',
    title: 'Fundamental Data Structures',
    description: 'Comprehensive introduction to essential data structures including arrays, linked lists, stacks, and queues',
    difficulty: 'beginner',
    estimatedHours: 24,
    prerequisites: ['Basic Programming', 'Object-Oriented Programming'],
    learningObjectives: [
      'Understand time and space complexity',
      'Implement basic data structures',
      'Choose appropriate data structures for specific problems',
      'Analyze performance characteristics'
    ],
    topics: [
      { id: '1', title: 'Arrays and Dynamic Arrays', type: 'interactive', duration: 3, completed: false, algorithmType: 'array' },
      { id: '2', title: 'Linked Lists Visualization', type: 'visualization', duration: 2, completed: false, algorithmType: 'linked-list' },
      { id: '3', title: 'Stack Implementation Challenge', type: 'coding', duration: 4, completed: false, codingChallenges: ['stack-ops', 'balanced-parentheses'] },
      { id: '4', title: 'Queue Operations Quiz', type: 'quiz', duration: 1, completed: false }
    ],
    assessments: [
      { id: '1', title: 'Data Structures Knowledge Check', type: 'quiz', questions: 20, timeLimit: 30, passingScore: 80, attempts: 3 },
      { id: '2', title: 'Implementation Project', type: 'coding-challenge', questions: 5, timeLimit: 120, passingScore: 70, attempts: 2 }
    ],
    status: 'published',
    completionRate: 87,
    enrolledStudents: 245
  },
  {
    id: '2',
    title: 'Advanced Graph Algorithms',
    description: 'Deep dive into graph theory and advanced algorithms including shortest paths, network flows, and graph optimization',
    difficulty: 'advanced',
    estimatedHours: 36,
    prerequisites: ['Fundamental Data Structures', 'Basic Algorithms', 'Mathematical Foundations'],
    learningObjectives: [
      'Master graph representation techniques',
      'Implement complex graph algorithms',
      'Solve real-world graph problems',
      'Optimize graph algorithm performance'
    ],
    topics: [
      { id: '1', title: 'Graph Representations', type: 'lecture', duration: 2, completed: false },
      { id: '2', title: 'Dijkstra\'s Algorithm Visualization', type: 'visualization', duration: 3, completed: false, algorithmType: 'dijkstra' },
      { id: '3', title: 'Network Flow Challenge', type: 'coding', duration: 6, completed: false, codingChallenges: ['max-flow', 'min-cut'] },
      { id: '4', title: 'Graph Theory Assessment', type: 'quiz', duration: 2, completed: false }
    ],
    assessments: [
      { id: '1', title: 'Graph Algorithms Mastery Test', type: 'quiz', questions: 25, timeLimit: 45, passingScore: 85, attempts: 2 },
      { id: '2', title: 'Real-world Graph Problem', type: 'project', questions: 1, timeLimit: 240, passingScore: 75, attempts: 1 }
    ],
    status: 'published',
    completionRate: 72,
    enrolledStudents: 128
  },
  {
    id: '3',
    title: 'Dynamic Programming Mastery',
    description: 'Comprehensive coverage of dynamic programming techniques with practical applications and optimization strategies',
    difficulty: 'intermediate',
    estimatedHours: 28,
    prerequisites: ['Fundamental Data Structures', 'Recursion Concepts'],
    learningObjectives: [
      'Understand dynamic programming principles',
      'Identify DP patterns and subproblems',
      'Optimize recursive solutions using memoization',
      'Apply DP to complex algorithmic problems'
    ],
    topics: [
      { id: '1', title: 'DP Fundamentals', type: 'lecture', duration: 3, completed: false },
      { id: '2', title: 'Fibonacci Optimization', type: 'interactive', duration: 2, completed: false, algorithmType: 'fibonacci' },
      { id: '3', title: 'Knapsack Problem Visualization', type: 'visualization', duration: 4, completed: false, algorithmType: 'knapsack' },
      { id: '4', title: 'DP Challenge Series', type: 'coding', duration: 8, completed: false, codingChallenges: ['coin-change', 'longest-subsequence', 'edit-distance'] }
    ],
    assessments: [
      { id: '1', title: 'DP Pattern Recognition', type: 'quiz', questions: 15, timeLimit: 25, passingScore: 80, attempts: 3 },
      { id: '2', title: 'Complex DP Implementation', type: 'coding-challenge', questions: 3, timeLimit: 90, passingScore: 75, attempts: 2 }
    ],
    status: 'published',
    completionRate: 79,
    enrolledStudents: 189
  }
];

const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Complete Computer Science Foundations',
    description: 'Comprehensive pathway covering all fundamental computer science concepts from basic data structures to advanced algorithms',
    modules: ['1', '3', '2'],
    totalHours: 88,
    difficulty: 'mixed',
    enrolledStudents: 342,
    completionRate: 68,
    prerequisites: ['Basic Programming'],
    certification: 'Computer Science Foundations Certificate'
  },
  {
    id: '2',
    title: 'Advanced Algorithm Design',
    description: 'Specialized track for advanced students focusing on complex algorithmic techniques and optimization',
    modules: ['2', '3'],
    totalHours: 64,
    difficulty: 'advanced',
    enrolledStudents: 156,
    completionRate: 74,
    prerequisites: ['Fundamental Data Structures', 'Mathematical Analysis'],
    certification: 'Advanced Algorithms Specialist Certificate'
  }
];

const mockCurriculumAnalytics: CurriculumAnalytics[] = [
  {
    moduleId: '1',
    totalEnrollments: 245,
    activeStudents: 198,
    completionRate: 87,
    avgTimeToComplete: 26,
    satisfactionScore: 4.6,
    dropOffRate: 13,
    mostDifficultTopic: 'Linked Lists Implementation',
    bestPerformingTopic: 'Array Operations'
  },
  {
    moduleId: '2',
    totalEnrollments: 128,
    activeStudents: 89,
    completionRate: 72,
    avgTimeToComplete: 42,
    satisfactionScore: 4.8,
    dropOffRate: 28,
    mostDifficultTopic: 'Network Flow Algorithms',
    bestPerformingTopic: 'Graph Representations'
  },
  {
    moduleId: '3',
    totalEnrollments: 189,
    activeStudents: 142,
    completionRate: 79,
    avgTimeToComplete: 31,
    satisfactionScore: 4.7,
    dropOffRate: 21,
    mostDifficultTopic: 'Complex DP Optimization',
    bestPerformingTopic: 'Basic DP Patterns'
  }
];

export const CurriculumIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('modules');
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(mockCurriculumModules[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { id: 'modules', label: 'Curriculum Modules', icon: BookOpen },
    { id: 'paths', label: 'Learning Paths', icon: Target },
    { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
    { id: 'integration', label: 'System Integration', icon: Link }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      case 'mixed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTopicIcon = (type: string) => {
    switch (type) {
      case 'lecture': return FileText;
      case 'interactive': return Play;
      case 'visualization': return Eye;
      case 'coding': return Code;
      case 'quiz': return CheckCircle;
      default: return BookOpen;
    }
  };

  const ModuleCard: React.FC<{ module: CurriculumModule; analytics: CurriculumAnalytics }> = ({ module, analytics }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedModule(module)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
              {module.difficulty}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{module.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {module.estimatedHours}h
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {module.enrolledStudents} students
            </span>
            <span className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              {module.topics.length} topics
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            module.status === 'published'
              ? 'bg-green-100 text-green-800'
              : module.status === 'draft'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {module.status}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Completion Rate</span>
          <span className="text-sm font-bold text-blue-600">{module.completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
            style={{ width: `${module.completionRate}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <p className="font-semibold text-gray-900">{analytics.satisfactionScore}/5.0</p>
            <p className="text-gray-600">Satisfaction</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{analytics.avgTimeToComplete}h</p>
            <p className="text-gray-600">Avg Time</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 transition-colors">
            <Play className="w-4 h-4" />
          </button>
          <button className="text-green-600 hover:text-green-800 transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
          <button className="text-red-600 hover:text-red-800 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs text-gray-500">
          {module.assessments.length} assessments
        </div>
      </div>
    </motion.div>
  );

  const TopicRow: React.FC<{ topic: Topic; index: number }> = ({ topic, index }) => {
    const IconComponent = getTopicIcon(topic.type);
    return (
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            topic.completed ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            {topic.completed ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
            )}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{topic.title}</h4>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span className="flex items-center">
                <IconComponent className="w-3 h-3 mr-1" />
                {topic.type}
              </span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {topic.duration}h
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {topic.algorithmType && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
              {topic.algorithmType}
            </span>
          )}
          <button className="p-2 text-blue-600 hover:text-blue-800 transition-colors rounded-lg hover:bg-blue-50">
            <Play className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  const LearningPathCard: React.FC<{ path: LearningPath }> = ({ path }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{path.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
              {path.difficulty}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3">{path.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {path.totalHours}h total
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {path.enrolledStudents} enrolled
            </span>
            <span className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              {path.modules.length} modules
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <Award className="w-6 h-6 text-yellow-500" />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Path Completion</span>
          <span className="text-sm font-bold text-green-600">{path.completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
            style={{ width: `${path.completionRate}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">
            Certificate: <span className="font-medium text-gray-900">{path.certification}</span>
          </div>
          <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderModules = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Curriculum Modules</h2>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Module
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {mockCurriculumModules.map((module) => {
            const analytics = mockCurriculumAnalytics.find(a => a.moduleId === module.id)!;
            return <ModuleCard key={module.id} module={module} analytics={analytics} />;
          })}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedModule ? selectedModule.title : 'Select a Module'}
          </h3>
          
          {selectedModule && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{selectedModule.topics.length}</p>
                  <p className="text-sm text-gray-600">Topics</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedModule.assessments.length}</p>
                  <p className="text-sm text-gray-600">Assessments</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Learning Objectives</h4>
                <ul className="space-y-2">
                  {selectedModule.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <Target className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Module Topics</h4>
                <div className="space-y-2">
                  {selectedModule.topics.map((topic, index) => (
                    <TopicRow key={topic.id} topic={topic} index={index} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const renderPaths = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Learning Paths</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Path
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockLearningPaths.map((path) => (
          <LearningPathCard key={path.id} path={path} />
        ))}
      </div>
    </motion.div>
  );

  const renderAnalytics = () => (
    <motion.div variants={containerVariants} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockCurriculumAnalytics.map((analytics, index) => {
          const module = mockCurriculumModules.find(m => m.id === analytics.moduleId);
          return (
            <motion.div
              key={analytics.moduleId}
              variants={itemVariants}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{module?.title}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-lg font-bold text-green-600">{analytics.completionRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Students</span>
                  <span className="text-lg font-bold text-blue-600">{analytics.activeStudents}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Satisfaction</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-lg font-bold text-yellow-600">{analytics.satisfactionScore}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Drop-off Rate</span>
                  <span className="text-lg font-bold text-red-600">{analytics.dropOffRate}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Curriculum Integration Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive curriculum management with structured learning paths, interactive modules, and performance tracking
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="flex space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {activeTab === 'modules' && renderModules()}
              {activeTab === 'paths' && renderPaths()}
              {activeTab === 'analytics' && renderAnalytics()}
              {activeTab === 'integration' && (
                <motion.div variants={containerVariants} className="text-center py-12">
                  <Link className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">System Integration</h3>
                  <p className="text-gray-600">LMS integration and API connectivity features coming soon...</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CurriculumIntegration;