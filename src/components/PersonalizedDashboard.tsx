import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LearningPathDisplay } from '@/components/LearningPathDisplay';
import { ProgressTracker } from '@/components/ProgressTracker';

export const PersonalizedDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Welcome back! 🚀
          </h1>
          <p className="text-white/80 text-lg">
            Continue your personalized DSA learning journey
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="learning-path" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border-white/20">
            <TabsTrigger 
              value="learning-path" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              Learning Path
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              Progress Tracker
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="learning-path" className="mt-6">
            <LearningPathDisplay />
          </TabsContent>
          
          <TabsContent value="progress" className="mt-6">
            <ProgressTracker />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};