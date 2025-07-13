
import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedVisualization } from '@/components/FeaturedVisualization';
import { TopicGrid } from '@/components/TopicGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Gamepad2, 
  Brain, 
  Building, 
  Settings,
  ArrowRight,
  Play,
  TrendingUp,
  Globe,
  Code,
  Trophy,
  Target,
  Zap
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      title: "Learning Hub",
      description: "Interactive algorithms and data structures with step-by-step visualizations",
      icon: BookOpen,
      href: "/learning",
      color: "from-blue-500 to-cyan-500",
      studentValue: "Start with tutorials and practice problems"
    },
    {
      title: "AI Learning",
      description: "Personalized learning paths powered by artificial intelligence",
      icon: Brain,
      href: "/ai-learning",
      color: "from-purple-500 to-violet-500",
      studentValue: "Get personalized recommendations"
    },
    {
      title: "Collaborative Learning",
      description: "Study with peers in real-time collaborative sessions",
      icon: Users,
      href: "/collaborative",
      color: "from-green-500 to-emerald-500",
      studentValue: "Join study groups and peer learning"
    },
    {
      title: "Gamification",
      description: "Learn through challenges, achievements, and competitive programming",
      icon: Gamepad2,
      href: "/gamification",
      color: "from-orange-500 to-red-500",
      studentValue: "Compete and earn achievements"
    },
    {
      title: "Advanced Features",
      description: "Algorithm comparison, performance analysis, and accessibility tools",
      icon: Zap,
      href: "/advanced",
      color: "from-indigo-500 to-blue-500",
      studentValue: "Compare algorithms and optimize learning"
    },
    {
      title: "Social Hub",
      description: "Connect with fellow learners, share progress, and get help",
      icon: Users,
      href: "/social",
      color: "from-pink-500 to-rose-500",
      studentValue: "Get help and share knowledge"
    }
  ];

  const stats = [
    { label: "Active Students", value: "10K+", icon: Users, color: "text-blue-400" },
    { label: "Algorithm Visualizations", value: "50+", icon: Play, color: "text-green-400" },
    { label: "Learning Paths", value: "25+", icon: TrendingUp, color: "text-purple-400" },
    { label: "Countries Reached", value: "30+", icon: Globe, color: "text-cyan-400" }
  ];

  const quickActions = [
    {
      title: "Start Learning",
      description: "Begin with sorting algorithms",
      icon: BookOpen,
      href: "/learning?algorithm=bubble-sort&tab=tutorials",
      color: "bg-blue-600 hover:bg-blue-700",
      benefit: "Master algorithms step-by-step"
    },
    {
      title: "Practice Coding",
      description: "Solve algorithm problems",
      icon: Code,
      href: "/learning?tab=practice",
      color: "bg-green-600 hover:bg-green-700",
      benefit: "Build problem-solving skills"
    },
    {
      title: "Join Challenges",
      description: "Compete with others",
      icon: Trophy,
      href: "/gamification",
      color: "bg-purple-600 hover:bg-purple-700",
      benefit: "Test your skills competitively"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      <Hero />
      
      {/* Quick Actions - Now with clear student benefits */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Journey</h2>
          <p className="text-lg text-white/70">Choose your path to algorithm mastery</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                      <p className="text-white/70 text-sm mb-2">{action.description}</p>
                      <p className="text-cyan-300 text-xs font-medium">{action.benefit}</p>
                    </div>
                  </div>
                  <Button 
                    asChild
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-0"
                  >
                    <Link to={action.href} className="flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Student Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section - Now focused on student benefits */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Learning Style</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Every student learns differently. Find the approach that works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white mb-2">{feature.title}</CardTitle>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">{feature.description}</p>
                  <p className="text-cyan-300 text-sm font-medium">{feature.studentValue}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    asChild
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-0"
                  >
                    <Link to={feature.href} className="flex items-center justify-center gap-2">
                      Explore
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Learning Path Teaser */}
        <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-8 mb-16">
          <div className="text-center">
            <Target className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Structured Learning Paths</h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-6">
              Follow our carefully designed curriculum from beginner to advanced. 
              Each path includes theory, visualizations, and practice problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                <Link to="/learning?tab=learning-paths">
                  View Learning Paths
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <FeaturedVisualization />
      <TopicGrid />
    </div>
  );
};

export default Index;
