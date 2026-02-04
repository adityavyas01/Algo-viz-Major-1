
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { AdvancedFeatures as AdvancedFeaturesComponent } from '@/components/AdvancedFeatures';
import { Simple3DVisualization } from '@/components/Simple3DVisualization';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MotionWrapper } from '@/components/motion/MotionWrapper';
import { 
  Brain, 
  Box, 
  Zap,
  Target
} from 'lucide-react';

const AdvancedFeatures = () => {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
        <div className="container mx-auto px-6 py-8">
          <MotionWrapper variant="fadeInUp" delay={0.1}>
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Advanced Features
              </h1>
              <p className="text-white/70 text-lg max-w-3xl mx-auto">
                Explore cutting-edge algorithm visualization features including 3D graphics, 
                advanced animations, and interactive learning tools
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fadeInUp" delay={0.2}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-md border border-white/10">
                <TabsTrigger 
                  value="features" 
                  className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                >
                  <Brain className="w-4 h-4" />
                  Smart Features
                </TabsTrigger>
                <TabsTrigger 
                  value="3d-visualization" 
                  className="flex items-center gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                >
                  <Box className="w-4 h-4" />
                  3D Visualizations
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="mt-8">
                <MotionWrapper variant="fadeInUp" delay={0.3}>
                  <AdvancedFeaturesComponent />
                </MotionWrapper>
              </TabsContent>
              
              <TabsContent value="3d-visualization" className="mt-8">
                <MotionWrapper variant="fadeInUp" delay={0.3}>
                  <Simple3DVisualization />
                </MotionWrapper>
              </TabsContent>
            </Tabs>
          </MotionWrapper>

          {/* Feature Highlights */}
          <MotionWrapper variant="fadeInUp" delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI-Powered Learning</h3>
                    <p className="text-white/60 text-sm">Intelligent recommendations</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm">
                  Advanced machine learning algorithms analyze your progress and provide personalized learning paths.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Box className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">3D Visualizations</h3>
                    <p className="text-white/60 text-sm">Immersive algorithm exploration</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm">
                  Three-dimensional algorithm visualizations using WebGL for immersive learning experiences.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Real-time Analytics</h3>
                    <p className="text-white/60 text-sm">Performance insights</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm">
                  Real-time performance monitoring and analytics to optimize your learning journey.
                </p>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </>
  );
};

export default AdvancedFeatures;
