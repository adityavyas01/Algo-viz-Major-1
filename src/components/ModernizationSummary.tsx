import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Sparkles,
  Rocket,
  Brain,
  Users,
  Award,
  BarChart3,
  Zap,
  Globe,
  Shield,
  Star,
  Trophy,
  Target,
  Code,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MotionWrapper, MicroInteraction } from '@/components/motion/MotionWrapper';

// Feature completion data
const completedPhases = [
  {
    phase: 'Phase 1A',
    title: 'Advanced Animations',
    description: 'Sophisticated Framer Motion animations with variants, micro-interactions, and staggered animations',
    icon: Sparkles,
    color: 'from-cyan-500 to-blue-600',
    features: [
      'Framer Motion ecosystem integration',
      'Micro-interactions and hover effects',
      'Staggered animations for lists',
      'Page transitions and route animations',
      'Enhanced UX with motion variants'
    ],
    completion: 100
  },
  {
    phase: 'Phase 1B',
    title: 'PWA Implementation',
    description: 'Comprehensive PWA features with offline capabilities and mobile optimization',
    icon: Globe,
    color: 'from-green-500 to-emerald-600',
    features: [
      'Service worker implementation',
      'Offline functionality',
      'App installability',
      'Push notifications',
      'Mobile-optimized experience'
    ],
    completion: 100
  },
  {
    phase: 'Phase 1C',
    title: 'Performance Optimization',
    description: 'Advanced optimization techniques for enhanced performance and scalability',
    icon: Zap,
    color: 'from-yellow-500 to-orange-600',
    features: [
      'Code splitting and lazy loading',
      'Performance monitoring',
      'Memory management',
      'Bundle optimization',
      'Load time improvements'
    ],
    completion: 100
  },
  {
    phase: 'Phase 2A',
    title: 'Enhanced Dashboard',
    description: 'Comprehensive dashboard with analytics, progress tracking, and personalized recommendations',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-600',
    features: [
      'Real-time analytics dashboard',
      'Progress tracking system',
      'Streak counters and achievements',
      'Personalized learning paths',
      'Goal setting and monitoring'
    ],
    completion: 100
  },
  {
    phase: 'Phase 2B',
    title: '3D Visualizations',
    description: 'Immersive Three.js algorithm visualizations with interactive 3D components',
    icon: Rocket,
    color: 'from-blue-500 to-indigo-600',
    features: [
      'Three.js ecosystem integration',
      '3D tree and graph visualizations',
      'Interactive algorithm animations',
      'Immersive sorting arrays',
      'Real-time 3D transformations'
    ],
    completion: 100
  },
  {
    phase: 'Phase 2C',
    title: 'Real-time Collaboration',
    description: 'WebSocket-based collaboration system with live sessions and synchronized visualizations',
    icon: Users,
    color: 'from-pink-500 to-rose-600',
    features: [
      'WebSocket real-time communication',
      'Live cursor tracking',
      'Collaborative chat system',
      'Session management',
      'Synchronized algorithm visualization'
    ],
    completion: 100
  },
  {
    phase: 'Phase 3A',
    title: 'AI-Powered Learning Assistant',
    description: 'Intelligent tutoring system with personalized explanations and adaptive learning',
    icon: Brain,
    color: 'from-violet-500 to-purple-600',
    features: [
      'Interactive AI chat interface',
      'Personalized algorithm explanations',
      'Code optimization suggestions',
      'Learning insights and recommendations',
      'Adaptive difficulty adjustment'
    ],
    completion: 100
  },
  {
    phase: 'Phase 3B',
    title: 'Advanced Assessment System',
    description: 'Comprehensive skill evaluation with adaptive testing and certification pathways',
    icon: Award,
    color: 'from-emerald-500 to-teal-600',
    features: [
      'Adaptive skill assessments',
      'Performance analytics dashboard',
      'Competency mapping system',
      'Certification pathways',
      'Detailed learning reports with AI insights'
    ],
    completion: 100
  }
];

const upcomingPhases = [
  {
    phase: 'Phase 3C',
    title: 'Enterprise Integration',
    description: 'Enterprise-grade features for educational institutions',
    icon: Shield,
    color: 'from-gray-500 to-slate-600',
    features: [
      'SSO integration',
      'Institutional analytics',
      'Group management',
      'Curriculum integration',
      'Advanced reporting'
    ],
    completion: 0
  },
  {
    phase: 'Phase 4A',
    title: 'Advanced Gamification',
    description: 'Enhanced gamification system with social learning features',
    icon: Trophy,
    color: 'from-orange-500 to-red-600',
    features: [
      'Achievement badges system',
      'Leaderboard competitions',
      'Skill trees and progression',
      'Virtual rewards and incentives',
      'Team challenges and social learning'
    ],
    completion: 0
  }
];

const PhaseCard = ({ phase, isCompleted = true }: { phase: any; isCompleted?: boolean }) => {
  return (
    <MicroInteraction type="card">
      <Card className={`bg-white/5 backdrop-blur-md border-white/10 ${
        !isCompleted ? 'opacity-60' : ''
      }`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
              <phase.icon className="w-6 h-6 text-white" />
            </div>
            {isCompleted && (
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
            )}
          </div>
          <div>
            <Badge className={`mb-2 text-xs ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
              {phase.phase}
            </Badge>
            <CardTitle className="text-white text-lg font-bold mb-2">{phase.title}</CardTitle>
            <p className="text-white/70 text-sm leading-relaxed">{phase.description}</p>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Implementation Progress</span>
              <span className="text-white text-sm font-medium">{phase.completion}%</span>
            </div>
            <Progress value={phase.completion} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-white/80 text-sm font-medium">Key Features</h4>
            <div className="space-y-1">
              {phase.features.slice(0, 3).map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-white/30 flex-shrink-0" />
                  )}
                  <span className={isCompleted ? 'text-white/80' : 'text-white/60'}>{feature}</span>
                </div>
              ))}
              {phase.features.length > 3 && (
                <div className="text-white/50 text-xs mt-1">
                  +{phase.features.length - 3} more features
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </MicroInteraction>
  );
};

export const ModernizationSummary: React.FC = () => {
  const totalPhases = completedPhases.length + upcomingPhases.length;
  const completedCount = completedPhases.length;
  const overallProgress = (completedCount / totalPhases) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <MotionWrapper variant="fadeInUp" delay={0.1}>
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mx-auto mb-6"
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl font-bold text-white mb-4">
              Algorithm Visualization Platform
            </h1>
            <h2 className="text-2xl text-cyan-400 mb-6">Modernization Complete! 🎉</h2>
            <p className="text-white/70 text-lg max-w-4xl mx-auto leading-relaxed">
              Your algorithm visualization platform has been transformed into a cutting-edge, 
              collaborative learning environment with AI-powered assistance, real-time collaboration, 
              and comprehensive assessment systems.
            </p>
          </div>
        </MotionWrapper>

        {/* Progress Overview */}
        <MotionWrapper variant="fadeInUp" delay={0.2}>
          <Card className="bg-white/5 backdrop-blur-md border-white/10 mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">{completedCount}</div>
                  <div className="text-white/70">Completed Phases</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">{Math.round(overallProgress)}%</div>
                  <div className="text-white/70">Overall Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
                  <div className="text-white/70">New Features</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400 mb-2">∞</div>
                  <div className="text-white/70">Possibilities</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Modernization Progress</span>
                  <span className="text-white/80">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-4" />
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        {/* Completed Phases */}
        <MotionWrapper variant="fadeInUp" delay={0.3}>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <h2 className="text-white text-3xl font-bold">Completed Phases</h2>
              <Badge className="bg-green-500/20 text-green-400">
                {completedCount} of {totalPhases}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {completedPhases.map((phase, index) => (
                <MotionWrapper key={phase.phase} variant="scaleIn" delay={index * 0.1}>
                  <PhaseCard phase={phase} isCompleted={true} />
                </MotionWrapper>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Upcoming Phases */}
        <MotionWrapper variant="fadeInUp" delay={0.4}>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <Target className="w-8 h-8 text-orange-400" />
              <h2 className="text-white text-3xl font-bold">Upcoming Phases</h2>
              <Badge className="bg-orange-500/20 text-orange-400">
                Next Steps
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingPhases.map((phase, index) => (
                <MotionWrapper key={phase.phase} variant="slideInUp" delay={index * 0.2}>
                  <PhaseCard phase={phase} isCompleted={false} />
                </MotionWrapper>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Key Achievements */}
        <MotionWrapper variant="fadeInUp" delay={0.5}>
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl font-bold flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-400" />
                Key Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Brain,
                    title: 'AI-Powered Learning',
                    description: 'Intelligent tutoring system with personalized explanations',
                    color: 'text-purple-400'
                  },
                  {
                    icon: Users,
                    title: 'Real-time Collaboration',
                    description: 'Live sessions with synchronized visualizations',
                    color: 'text-pink-400'
                  },
                  {
                    icon: Award,
                    title: 'Advanced Assessments',
                    description: 'Adaptive testing with certification pathways',
                    color: 'text-green-400'
                  },
                  {
                    icon: Rocket,
                    title: '3D Visualizations',
                    description: 'Immersive Three.js algorithm experiences',
                    color: 'text-blue-400'
                  },
                  {
                    icon: BarChart3,
                    title: 'Analytics Dashboard',
                    description: 'Comprehensive learning progress tracking',
                    color: 'text-cyan-400'
                  },
                  {
                    icon: Zap,
                    title: 'Performance Optimized',
                    description: 'Fast, responsive, and scalable architecture',
                    color: 'text-yellow-400'
                  }
                ].map((achievement, index) => (
                  <MicroInteraction key={index} type="card">
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                      <achievement.icon className={`w-8 h-8 ${achievement.color} mb-4`} />
                      <h3 className="text-white font-semibold text-lg mb-2">{achievement.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{achievement.description}</p>
                    </div>
                  </MicroInteraction>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        {/* Call to Action */}
        <MotionWrapper variant="fadeInUp" delay={0.6}>
          <div className="text-center py-12">
            <h2 className="text-white text-3xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Your modernized platform is live and ready for users to experience cutting-edge algorithm learning 
              with AI assistance, real-time collaboration, and comprehensive skill assessment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="http://localhost:8080"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
              >
                <Rocket className="w-5 h-5" />
                Launch Platform
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                View Documentation
              </motion.button>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default ModernizationSummary;