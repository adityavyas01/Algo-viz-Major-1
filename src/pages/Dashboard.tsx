import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { EnhancedDashboard } from '@/components/EnhancedDashboard';
import { PersonalizedRecommendations } from '@/components/PersonalizedRecommendations';
import { InteractiveLearningPaths } from '@/components/InteractiveLearningPaths';
import { Header } from '@/components/Header';
import { MotionWrapper } from '@/components/motion/MotionWrapper';
import { LearningHub } from '@/components/LearningHub';
import { 
  BarChart3, 
  Target, 
  BookOpen, 
  TrendingUp,
  Brain,
  Rocket,
  LayoutDashboard
} from 'lucide-react';
import GamificationWidget from '@/components/GamificationWidget';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <MotionWrapper variant="fadeInUp" delay={0.1}>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Welcome to Your Learning Dashboard
                </h1>
                <p className="text-white/70 text-lg max-w-3xl">
                  Track your progress, discover personalized recommendations, and continue your algorithmic learning journey
                </p>
              </div>
            </MotionWrapper>

            <MotionWrapper variant="fadeInUp" delay={0.2}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-md border border-white/10">
                  <TabsTrigger 
                    value="overview" 
                    className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="learning-hub" 
                    className="flex items-center gap-2 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Learning Hub
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recommendations" 
                    className="flex items-center gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                  >
                    <Brain className="w-4 h-4" />
                    Recommendations
                  </TabsTrigger>
                  <TabsTrigger 
                    value="learning-paths" 
                    className="flex items-center gap-2 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
                  >
                    <BookOpen className="w-4 h-4" />
                    Learning Paths
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-8">
                  <MotionWrapper variant="fadeInUp" delay={0.3}>
                    <EnhancedDashboard />
                  </MotionWrapper>
                </TabsContent>

                <TabsContent value="learning-hub" className="mt-8">
                  <MotionWrapper variant="fadeInUp" delay={0.3}>
                    <LearningHub />
                  </MotionWrapper>
                </TabsContent>
                
                <TabsContent value="recommendations" className="mt-8">
                  <MotionWrapper variant="fadeInUp" delay={0.3}>
                    <PersonalizedRecommendations />
                  </MotionWrapper>
                </TabsContent>
                
                <TabsContent value="learning-paths" className="mt-8">
                  <MotionWrapper variant="fadeInUp" delay={0.3}>
                    <InteractiveLearningPaths />
                  </MotionWrapper>
                </TabsContent>
              </Tabs>
            </MotionWrapper>
          </div>

          {/* Sidebar with Gamification and Quick Actions */}
          <div className="lg:col-span-1 space-y-8">
            <MotionWrapper variant="fadeInUp" delay={0.3}>
              <GamificationWidget />
            </MotionWrapper>

            <MotionWrapper variant="fadeInUp" delay={0.4}>
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Daily Challenge</h3>
                      <p className="text-white/60 text-sm">Test your skills</p>
                    </div>
                  </div>
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                    Start Challenge
                  </Button>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Progress Report</h3>
                      <p className="text-white/60 text-sm">View detailed analytics</p>
                    </div>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    View Report
                  </Button>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Continue Learning</h3>
                      <p className="text-white/60 text-sm">Resume your path</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => setActiveTab('learning-paths')}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
