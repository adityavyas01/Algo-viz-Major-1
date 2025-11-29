import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Code, 
  TrendingUp, 
  Bookmark, 
  MapPin, 
  GraduationCap, 
  Users, 
  Brain, 
  Award, 
  Building2, 
  Target,
  Trophy,
  ShoppingBag,
  Users2,
  Star,
  Zap,
  Shield,
  Rocket,
  CheckCircle,
  Circle,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Eye,
  Heart,
  Sparkles,
  Crown,
  Gem,
  Coins,
  Flame,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  Share2
} from 'lucide-react';

interface FeatureCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  features: Feature[];
}

interface Feature {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  benefits: string[];
}

const mockFeatures: FeatureCategory[] = [
  {
    id: 'core-learning',
    name: 'Core Learning Experience',
    description: 'Fundamental algorithm visualization and learning tools',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    features: [
      {
        id: 'interactive-visualizations',
        name: 'Interactive Algorithm Visualizations',
        description: 'Step-by-step visual representations of 50+ algorithms with interactive controls',
        status: 'completed',
        difficulty: 'beginner',
        icon: Play,
        tags: ['Visualization', 'Interactive', 'Algorithms'],
        benefits: ['Visual Learning', 'Step Control', 'Multiple Speeds', 'Custom Input']
      },
      {
        id: 'guided-tutorials',
        name: 'Guided Tutorials & Explanations',
        description: 'Comprehensive tutorials with detailed explanations and complexity analysis',
        status: 'completed',
        difficulty: 'beginner',
        icon: GraduationCap,
        tags: ['Tutorial', 'Education', 'Complexity'],
        benefits: ['Detailed Explanations', 'Time Complexity', 'Space Analysis', 'Use Cases']
      },
      {
        id: 'practice-problems',
        name: 'Practice Problems & Coding Challenges',
        description: 'Hands-on coding exercises with multiple difficulty levels and solutions',
        status: 'completed',
        difficulty: 'intermediate',
        icon: Code,
        tags: ['Coding', 'Practice', 'Challenges'],
        benefits: ['Multiple Languages', 'Auto-Grading', 'Hints System', 'Solution Walkthroughs']
      },
      {
        id: 'learning-paths',
        name: 'Personalized Learning Paths',
        description: 'AI-curated learning sequences adapted to individual skill levels and goals',
        status: 'completed',
        difficulty: 'intermediate',
        icon: MapPin,
        tags: ['Personalization', 'AI', 'Curriculum'],
        benefits: ['Adaptive Content', 'Progress Tracking', 'Goal Setting', 'Skill Assessment']
      }
    ]
  },
  {
    id: 'ai-powered',
    name: 'AI-Powered Features',
    description: 'Intelligent learning assistance and personalization',
    icon: Brain,
    color: 'from-purple-500 to-violet-500',
    features: [
      {
        id: 'ai-tutor',
        name: 'AI Learning Assistant',
        description: 'Personalized explanations, code optimization suggestions, and intelligent hints',
        status: 'completed',
        difficulty: 'advanced',
        icon: Brain,
        tags: ['AI', 'Personalization', 'Assistance'],
        benefits: ['Custom Explanations', 'Code Review', 'Learning Analytics', 'Adaptive Hints']
      },
      {
        id: 'intelligent-hints',
        name: 'Intelligent Hint System',
        description: 'Context-aware hints that adapt to your current understanding and progress',
        status: 'completed',
        difficulty: 'intermediate',
        icon: Zap,
        tags: ['AI', 'Hints', 'Adaptive'],
        benefits: ['Progressive Hints', 'Context Awareness', 'Learning Style', 'Difficulty Scaling']
      },
      {
        id: 'adaptive-learning',
        name: 'Adaptive Learning Technology',
        description: 'Machine learning algorithms that customize content based on performance',
        status: 'completed',
        difficulty: 'advanced',
        icon: Settings,
        tags: ['ML', 'Adaptation', 'Personalization'],
        benefits: ['Performance Analysis', 'Content Adaptation', 'Learning Speed', 'Knowledge Gaps']
      }
    ]
  },
  {
    id: 'gamification',
    name: 'Gamification & Rewards',
    description: 'Achievement systems, challenges, and virtual rewards',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500',
    features: [
      {
        id: 'achievement-system',
        name: 'Achievement Badge System',
        description: 'Unlock badges for mastering algorithms, completing challenges, and reaching milestones',
        status: 'completed',
        difficulty: 'beginner',
        icon: Award,
        tags: ['Achievements', 'Gamification', 'Progress'],
        benefits: ['Visual Progress', 'Motivation', 'Goal Recognition', 'Skill Validation']
      },
      {
        id: 'skill-trees',
        name: 'Interactive Skill Trees',
        description: 'Visual skill progression with unlockable nodes and mastery paths',
        status: 'completed',
        difficulty: 'intermediate',
        icon: Star,
        tags: ['Skills', 'Progression', 'Visual'],
        benefits: ['Clear Progression', 'Prerequisites', 'Visual Mapping', 'Achievement Tracking']
      },
      {
        id: 'leaderboards',
        name: 'Competitive Leaderboards',
        description: 'Global and category-specific rankings with seasonal competitions',
        status: 'completed',
        difficulty: 'intermediate',
        icon: Crown,
        tags: ['Competition', 'Rankings', 'Social'],
        benefits: ['Global Rankings', 'Category Filters', 'Seasonal Events', 'Friend Comparisons']
      },
      {
        id: 'virtual-store',
        name: 'Virtual Rewards Store',
        description: 'Spend earned coins and gems on themes, power-ups, and exclusive content',
        status: 'completed',
        difficulty: 'intermediate',
        icon: ShoppingBag,
        tags: ['Rewards', 'Customization', 'Virtual Currency'],
        benefits: ['Theme Customization', 'Power-ups', 'Exclusive Content', 'Premium Features']
      }
    ]
  },
  {
    id: 'social-collaborative',
    name: 'Social & Collaborative Learning',
    description: 'Community features and collaborative learning tools',
    icon: Users2,
    color: 'from-pink-500 to-rose-500',
    features: [
      {
        id: 'social-hub',
        name: 'Social Learning Hub',
        description: 'Community discussions, study groups, and peer mentorship programs',
        status: 'completed',
        difficulty: 'intermediate',
        icon: Users2,
        tags: ['Social', 'Community', 'Collaboration'],
        benefits: ['Discussion Forums', 'Study Groups', 'Mentorship', 'Peer Learning']
      },
      {
        id: 'real-time-collaboration',
        name: 'Real-time Collaboration',
        description: 'Live algorithm visualization sessions with synchronized cursors and chat',
        status: 'completed',
        difficulty: 'advanced',
        icon: Users,
        tags: ['Real-time', 'Collaboration', 'Synchronization'],
        benefits: ['Live Sessions', 'Shared Visualization', 'Voice Chat', 'Screen Sharing']
      },
      {
        id: 'group-management',
        name: 'Group Management System',
        description: 'Create and manage learning groups with role-based permissions and analytics',
        status: 'completed',
        difficulty: 'advanced',
        icon: Shield,
        tags: ['Groups', 'Management', 'Permissions'],
        benefits: ['Role Management', 'Group Analytics', 'Permission Control', 'Member Tracking']
      }
    ]
  },
  {
    id: 'assessment-analytics',
    name: 'Assessment & Analytics',
    description: 'Comprehensive testing and performance tracking',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    features: [
      {
        id: 'adaptive-assessments',
        name: 'Adaptive Assessment System',
        description: 'Intelligent testing that adapts difficulty based on performance',
        status: 'completed',
        difficulty: 'advanced',
        icon: Target,
        tags: ['Assessment', 'Adaptive', 'Testing'],
        benefits: ['Skill Evaluation', 'Adaptive Difficulty', 'Detailed Reports', 'Learning Gaps']
      },
      {
        id: 'progress-analytics',
        name: 'Advanced Progress Analytics',
        description: 'Comprehensive learning analytics with detailed performance insights',
        status: 'completed',
        difficulty: 'intermediate',
        icon: TrendingUp,
        tags: ['Analytics', 'Progress', 'Insights'],
        benefits: ['Performance Tracking', 'Learning Patterns', 'Time Analytics', 'Skill Growth']
      },
      {
        id: 'leetcode-integration',
        name: 'LeetCode Integration',
        description: 'Seamless integration with LeetCode problems and progress synchronization',
        status: 'completed',
        difficulty: 'intermediate',
        icon: ExternalLink,
        tags: ['Integration', 'LeetCode', 'Synchronization'],
        benefits: ['Problem Sync', 'Progress Tracking', 'Unified Dashboard', 'Cross-platform']
      }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise & Institution',
    description: 'Advanced features for educational institutions and enterprises',
    icon: Building2,
    color: 'from-slate-500 to-gray-600',
    features: [
      {
        id: 'enterprise-sso',
        name: 'Enterprise SSO Integration',
        description: 'Single Sign-On integration with enterprise identity providers',
        status: 'completed',
        difficulty: 'advanced',
        icon: Shield,
        tags: ['Enterprise', 'SSO', 'Security'],
        benefits: ['Secure Access', 'User Management', 'Identity Integration', 'Compliance']
      },
      {
        id: 'institutional-analytics',
        name: 'Institutional Analytics',
        description: 'Comprehensive analytics and reporting for educational institutions',
        status: 'completed',
        difficulty: 'advanced',
        icon: TrendingUp,
        tags: ['Analytics', 'Institution', 'Reporting'],
        benefits: ['Student Analytics', 'Performance Reports', 'Usage Metrics', 'Custom Dashboards']
      },
      {
        id: 'curriculum-integration',
        name: 'Curriculum Integration Platform',
        description: 'Structured curriculum management with assessments and progress tracking',
        status: 'completed',
        difficulty: 'advanced',
        icon: BookOpen,
        tags: ['Curriculum', 'Management', 'Structure'],
        benefits: ['Course Structure', 'Assessment Tools', 'Progress Tracking', 'Content Management']
      }
    ]
  }
];

const platformStats = {
  algorithms: 50,
  students: 125000,
  institutions: 450,
  countries: 75,
  completionRate: 89,
  avgImprovement: 156
};

export const PlatformOverview: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'overview' | 'features' | 'stats'>('overview');

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'planned': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const FeatureCard: React.FC<{ feature: Feature; categoryColor: string }> = ({ feature, categoryColor }) => {
    const Icon = feature.icon;
    const isExpanded = expandedFeature === feature.id;

    return (
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categoryColor} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(feature.status)}`}>
              {feature.status.replace('-', ' ')}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(feature.difficulty)}`}>
              {feature.difficulty}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{feature.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {feature.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => setExpandedFeature(isExpanded ? null : feature.id)}
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          <span>View Benefits</span>
          {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <h4 className="text-sm font-medium text-gray-900 mb-2">Key Benefits:</h4>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const StatCard: React.FC<{ title: string; value: string | number; description: string; icon: React.ComponentType<{ className?: string }> }> = ({ title, value, description, icon: Icon }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-lg font-semibold text-gray-800 mb-1">{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
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
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-400/30 mb-6">
              <Rocket className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm text-blue-600 font-medium">Complete Platform Overview</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Algorithm Visualization Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              A comprehensive educational technology platform featuring AI-powered learning, gamification, 
              social collaboration, and enterprise integration for mastering algorithms and data structures.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <div className="flex space-x-2">
                {[
                  { id: 'overview', label: 'Platform Overview', icon: Eye },
                  { id: 'features', label: 'Feature Categories', icon: Star },
                  { id: 'stats', label: 'Platform Statistics', icon: TrendingUp }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setCurrentView(id as any)}
                    className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                      currentView === id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {currentView === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Platform Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Learning</h3>
                    <p className="text-sm text-gray-600">50+ algorithm visualizations with step-by-step controls and detailed explanations</p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mb-4">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
                    <p className="text-sm text-gray-600">Personalized learning paths and intelligent assistance powered by machine learning</p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Gamified Experience</h3>
                    <p className="text-sm text-gray-600">Achievement badges, skill trees, leaderboards, and virtual rewards system</p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                      <Users2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Learning</h3>
                    <p className="text-sm text-gray-600">Community features, study groups, and real-time collaborative learning sessions</p>
                  </motion.div>
                </div>

                {/* Technology Stack */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technology Stack & Architecture</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Monitor className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Frontend</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>React 18 with TypeScript</li>
                        <li>Framer Motion animations</li>
                        <li>Tailwind CSS styling</li>
                        <li>Canvas API visualizations</li>
                        <li>WebRTC collaboration</li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Globe className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Backend & AI</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Supabase backend</li>
                        <li>OpenAI GPT integration</li>
                        <li>Real-time synchronization</li>
                        <li>Machine learning models</li>
                        <li>Advanced analytics</li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Security & Scale</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Enterprise SSO</li>
                        <li>Role-based access</li>
                        <li>Data encryption</li>
                        <li>Scalable architecture</li>
                        <li>GDPR compliance</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Platform Access */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Multi-Platform Access</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Monitor className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Desktop Web</h3>
                      <p className="text-sm text-gray-600">Full-featured experience with advanced visualizations and collaboration tools</p>
                    </div>
                    <div>
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Tablet className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Tablet</h3>
                      <p className="text-sm text-gray-600">Touch-optimized interface for interactive learning and practice on-the-go</p>
                    </div>
                    <div>
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile</h3>
                      <p className="text-sm text-gray-600">Responsive design with core features accessible on smartphones</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {currentView === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Feature Categories */}
                <div className="space-y-8">
                  {mockFeatures.map((category) => {
                    const CategoryIcon = category.icon;
                    const isActive = activeCategory === category.id;
                    
                    return (
                      <motion.div key={category.id} variants={itemVariants} className="space-y-4">
                        <div
                          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300"
                          onClick={() => setActiveCategory(isActive ? null : category.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                                <CategoryIcon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                                <p className="text-gray-600">{category.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                                {category.features.length} features
                              </span>
                              {isActive ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                              {category.features.map((feature) => (
                                <FeatureCard key={feature.id} feature={feature} categoryColor={category.color} />
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {currentView === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Platform Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatCard
                    title="Algorithm Visualizations"
                    value={`${platformStats.algorithms}+`}
                    description="Interactive algorithm visualizations covering all major categories"
                    icon={Code}
                  />
                  <StatCard
                    title="Active Students"
                    value={`${Math.floor(platformStats.students / 1000)}K+`}
                    description="Students worldwide using the platform for algorithm learning"
                    icon={Users}
                  />
                  <StatCard
                    title="Educational Institutions"
                    value={platformStats.institutions}
                    description="Schools and universities integrated with our platform"
                    icon={Building2}
                  />
                  <StatCard
                    title="Global Reach"
                    value={`${platformStats.countries}+`}
                    description="Countries with active users on our platform"
                    icon={Globe}
                  />
                  <StatCard
                    title="Completion Rate"
                    value={`${platformStats.completionRate}%`}
                    description="Average course completion rate across all learning paths"
                    icon={CheckCircle}
                  />
                  <StatCard
                    title="Skill Improvement"
                    value={`${platformStats.avgImprovement}%`}
                    description="Average improvement in algorithm understanding scores"
                    icon={TrendingUp}
                  />
                </div>

                {/* Feature Completion Status */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Development Status Overview</h2>
                  <div className="space-y-4">
                    {mockFeatures.map((category) => {
                      const completed = category.features.filter(f => f.status === 'completed').length;
                      const total = category.features.length;
                      const percentage = Math.round((completed / total) * 100);
                      
                      return (
                        <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <category.icon className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-900">{category.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-16 text-right">
                              {completed}/{total} ({percentage}%)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div variants={itemVariants} className="flex justify-center space-x-4">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download Platform Guide</span>
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                    <Share2 className="w-4 h-4" />
                    <span>Share Platform</span>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformOverview;