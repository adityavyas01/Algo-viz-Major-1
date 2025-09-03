import React, { useState, useEffect } from 'react';
import { AlgorithmSelector } from '@/components/AlgorithmSelector';
import { VisualizationCard } from '@/components/VisualizationCard';
import { getDemoConfiguration } from '@/components/DemoConfiguration';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Sparkles, Zap, Target, ArrowRight, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthAwareFeature } from '@/components/AuthAwareFeature';
import { useAuth } from '@/contexts/AuthContext';

type DemoType = 'bubble' | 'selection' | 'quick' | 'merge' | 'binary-search' | 'linkedlist' | 'stack' | 'queue' | 'binarytree' | 'hashtable' | 'graph' | 'avl' | 'redblack' | 'heap' | 'advanced-graph' | 'trie' | 'dp' | 'string-matching' | 'advanced-graph-algorithms' | 'computational-geometry' | 'advanced-dp' | 'backtracking' | 'number-theory' | 'threed-structures' | 'spatial-structures' | 'vr-classroom' | 'segment-trees' | 'union-find' | 'bloom-filter';

// Define which algorithms are free (one per category) and which require authentication
const freeAlgorithms: DemoType[] = [
  'bubble',        // Sorting - free
  'binary-search', // Search - free  
  'linkedlist',    // Data Structures - free
  'binarytree',    // Trees - free
  'graph',         // Graphs - free
  'dp',            // Dynamic Programming - free
  'string-matching', // Advanced - free
  'threed-structures' // 3D - free
];

const premiumAlgorithms: DemoType[] = [
  'selection', 'quick', 'merge',           // Additional Sorting
  'stack', 'queue', 'hashtable', 'heap',  // Additional Data Structures  
  'avl', 'redblack',                      // Additional Trees
  'advanced-graph', 'trie',               // Additional Graph/Advanced
  'advanced-dp', 'backtracking', 'number-theory', // Advanced Algorithms
  'computational-geometry', 'advanced-graph-algorithms', // More Advanced
  'spatial-structures', 'vr-classroom',   // Additional 3D
  'segment-trees', 'union-find', 'bloom-filter' // Advanced Data Structures
];

export const FeaturedVisualization = () => {
  const [activeDemo, setActiveDemo] = useState<DemoType>('bubble');
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const currentDemo = getDemoConfiguration(activeDemo);
  const isCurrentDemoLocked = premiumAlgorithms.includes(activeDemo) && !isAuthenticated;

  const features = [
    {
      icon: Play,
      title: "Interactive Learning",
      description: "Step through algorithms at your own pace",
      action: () => navigate('/learning?tab=tutorials'),
      buttonText: "Start Tutorial",
      requiresAuth: false
    },
    {
      icon: Sparkles,
      title: "Real-time Visualization",
      description: "Watch data structures come to life",
      action: () => navigate('/learning'),
      buttonText: "View Visualizations",
      requiresAuth: false
    },
    {
      icon: Zap,
      title: "Practice Problems",
      description: "Solve coding challenges to master concepts",
      action: () => isAuthenticated ? navigate('/learning?tab=practice') : navigate('/login'),
      buttonText: isAuthenticated ? "Practice Now" : "Sign Up to Practice",
      requiresAuth: true
    },
    {
      icon: Target,
      title: "Learning Paths",
      description: "Follow structured learning roadmaps",
      action: () => isAuthenticated ? navigate('/learning?tab=learning-paths') : navigate('/login'),
      buttonText: isAuthenticated ? "View Paths" : "Unlock Paths",
      requiresAuth: true
    }
  ];

  const learningLevels = [
    { level: "Beginner", count: "15+ Algorithms", color: "bg-green-500" },
    { level: "Intermediate", count: "20+ Algorithms", color: "bg-blue-500" },
    { level: "Advanced", count: "15+ Algorithms", color: "bg-purple-500" }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="demo">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-purple-900/50"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">Interactive Learning Experience</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Interactive Algorithm
            </span>
            <br />
            <span className="text-white">& Data Structure</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Visualizations
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Master algorithms and data structures through 
            <span className="text-cyan-400 font-semibold"> immersive visual learning</span> 
            , step-by-step explanations, and hands-on practice
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {learningLevels.map((level, index) => (
              <Badge key={index} variant="outline" className={`${level.color} text-white border-0 px-4 py-2 text-sm font-medium`}>
                {level.level}: {level.count}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link to="/learning?tab=tutorials">
                <Play className="w-5 h-5 mr-2" />
                Start Learning Now
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold"
            >
              <Link to={isAuthenticated ? "/learning?tab=practice" : "/register"}>
                {isAuthenticated ? <Target className="w-5 h-5 mr-2" /> : <Lock className="w-5 h-5 mr-2" />}
                {isAuthenticated ? "Practice Problems" : "Sign Up for Premium"}
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards - Now with authentication awareness */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className={`bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group ${feature.requiresAuth && !isAuthenticated ? 'relative' : ''}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{feature.description}</p>
                  {feature.requiresAuth && !isAuthenticated && (
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Lock className="w-3 h-3 text-yellow-400" />
                      <span className="text-yellow-400 text-xs">Premium</span>
                    </div>
                  )}
                  <Button
                    onClick={feature.action}
                    size="sm"
                    className={`${feature.requiresAuth && !isAuthenticated 
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700' 
                      : 'bg-cyan-600 hover:bg-cyan-700'} text-white border-0 w-full`}
                  >
                    {feature.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Algorithm Selector */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Try Any Algorithm</h3>
            <p className="text-white/70">
              Select an algorithm below to see it in action
              {!isAuthenticated && (
                <span className="block text-cyan-300 text-sm mt-2">
                  🔓 Free algorithms available • 🔒 Sign up to unlock all algorithms
                </span>
              )}
            </p>
          </div>
          <AlgorithmSelector 
            activeDemo={activeDemo} 
            onDemoChange={setActiveDemo}
            lockedAlgorithms={isAuthenticated ? [] : premiumAlgorithms}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
          <div className="relative">
            {isCurrentDemoLocked ? (
              <AuthAwareFeature
                requiresAuth={true}
                featureName={currentDemo.title}
                benefit={`Unlock ${currentDemo.title} and 30+ other premium algorithm visualizations. See step-by-step execution, complexity analysis, and interactive examples.`}
                className="min-h-[400px]"
              >
                <VisualizationCard
                  title={currentDemo.title}
                  description={currentDemo.description}
                  component={currentDemo.component}
                  complexity={currentDemo.complexity}
                />
              </AuthAwareFeature>
            ) : (
              <VisualizationCard
                title={currentDemo.title}
                description={currentDemo.description}
                component={currentDemo.component}
                complexity={currentDemo.complexity}
              />
            )}
          </div>
        </div>

        {/* Bottom Action Section - Now with authentication awareness */}
        <div className="text-center mt-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Master Algorithms?</h3>
            <p className="text-white/70 mb-6">Join thousands of students who have improved their coding skills</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className={`${isAuthenticated 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'} text-white`}
              >
                <Link to={isAuthenticated ? "/learning?tab=learning-paths" : "/register"}>
                  {isAuthenticated ? <Target className="w-5 h-5 mr-2" /> : <Lock className="w-5 h-5 mr-2" />}
                  {isAuthenticated ? "Choose Learning Path" : "Sign Up for Premium Access"}
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link to={isAuthenticated ? "/challenges" : "/login"}>
                  <Zap className="w-5 h-5 mr-2" />
                  {isAuthenticated ? "Join Challenges" : "Sign In to Compete"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
