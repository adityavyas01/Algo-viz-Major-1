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
  'trie',          // Trie - free
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
  'advanced-graph',                       // Additional Graph/Advanced
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
  const isCurrentDemoLocked = false; // BYPASS: All algorithms are free

  const features = [
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
      action: () => isAuthenticated ? navigate('/challenges') : navigate('/login'),
      buttonText: isAuthenticated ? "Start Challenges" : "Sign Up to Practice",
      requiresAuth: true
    },
    {
      icon: Target,
      title: "Community Hub",
      description: "Join collaborative learning sessions",
      action: () => navigate('/community'),
      buttonText: "Join Community",
      requiresAuth: false
    }
  ];

  const learningLevels = [
    { level: "Beginner", count: "15+ Algorithms", color: "bg-green-500" },
    { level: "Intermediate", count: "20+ Algorithms", color: "bg-blue-500" },
    { level: "Advanced", count: "15+ Algorithms", color: "bg-purple-500" }
  ];

  // Animated counter hook
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let startTime: number;
      let animationFrame: number;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);
    
    return count;
  };

  const algorithmsCount = useCounter(50);
  const studentsCount = useCounter(10000);
  const lessonsCount = useCounter(150);

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="visualizations">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/40 to-purple-900/60"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-20 space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full border border-gradient-to-r border-cyan-400/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 font-medium">Interactive Learning Experience</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Interactive Algorithm
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              & Data Structure
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              Visualizations
            </span>
          </h2>
          
                    <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Experience algorithms like never before. Step through each operation, understand complexity, and master the fundamentals with our cutting-edge visualization platform.
          </p>
          
          {/* Animated Statistics */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in-up delay-300">
            <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:scale-105">
              <div className="text-4xl font-bold text-cyan-400 mb-2 animate-glow">
                {algorithmsCount}+
              </div>
              <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">Algorithms</div>
            </div>
            <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all duration-500 hover:scale-105">
              <div className="text-4xl font-bold text-purple-400 mb-2 animate-glow delay-200">
                {studentsCount.toLocaleString()}+
              </div>
              <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">Students</div>
            </div>
            <div className="group text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all duration-500 hover:scale-105">
              <div className="text-4xl font-bold text-blue-400 mb-2 animate-glow delay-400">
                {lessonsCount}+
              </div>
              <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors">Lessons</div>
            </div>
          </div>

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

        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const gradientColors = [
              'from-cyan-500 via-blue-500 to-purple-500',
              'from-purple-500 via-pink-500 to-rose-500',
              'from-orange-500 via-red-500 to-pink-500'
            ];
            const shadowColors = [
              'shadow-cyan-500/25 group-hover:shadow-cyan-500/40',
              'shadow-purple-500/25 group-hover:shadow-purple-500/40', 
              'shadow-orange-500/25 group-hover:shadow-orange-500/40'
            ];
            
            return (
              <Card key={index} className={`group bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:bg-white/10 rounded-2xl overflow-hidden animate-fade-in-up`} 
                style={{animationDelay: `${0.4 + index * 0.1}s`}}>
                <CardContent className="p-8 text-center relative">
                  {/* Background glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index]} opacity-5 group-hover:opacity-10 transition-opacity rounded-2xl`} />
                  
                  <div className="relative z-10">
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${gradientColors[index]} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg ${shadowColors[index]} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                      <IconComponent className="w-8 h-8 text-white" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index]} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                    <p className="text-white/60 group-hover:text-white/80 transition-colors leading-relaxed mb-6">{feature.description}</p>
                    
                    {feature.requiresAuth && !isAuthenticated && (
                      <div className="flex items-center justify-center gap-2 mb-4 bg-yellow-500/10 rounded-full px-3 py-1 border border-yellow-500/20">
                        <Lock className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm font-medium">Premium Feature</span>
                      </div>
                    )}
                    
                    <Button
                      onClick={feature.action}
                      className={`w-full ${feature.requiresAuth && !isAuthenticated 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400' 
                        : `bg-gradient-to-r ${gradientColors[index]} hover:scale-105`} text-white border-0 font-semibold py-3 rounded-xl shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-center justify-center">
                        {feature.buttonText}
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Button>
                  </div>
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
            lockedAlgorithms={[]} // BYPASS: No algorithms are locked
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
          <div className="relative">
            <VisualizationCard
              title={currentDemo.title}
              description={currentDemo.description}
              component={currentDemo.component}
              complexity={currentDemo.complexity}
            />
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
                  {isAuthenticated ? "Continue Learning Path" : "Sign Up for Premium Access"}
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
