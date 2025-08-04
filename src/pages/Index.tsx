
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
  const quickActions = [
    {
      title: "Start Learning",
      description: "Begin with interactive algorithm visualizations",
      icon: BookOpen,
      href: "/learning",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Practice Coding",
      description: "Solve algorithm challenges",
      icon: Code,
      href: "/learning?tab=practice",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "Join Challenges",
      description: "Compete with others",
      icon: Trophy,
      href: "/gamification",
      color: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      <Hero />
      
      {/* Quick Actions */}
      <div className="container mx-auto px-4 py-12">
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
                      <p className="text-white/70 text-sm">{action.description}</p>
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
      </div>

      <FeaturedVisualization />
    </div>
  );
};

export default Index;
