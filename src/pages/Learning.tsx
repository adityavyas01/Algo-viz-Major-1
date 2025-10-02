import React, { Suspense } from "react";
import { Header } from "@/components/Header";
import { LearningHub } from "@/components/LearningHub";
import { LearningPathComponent } from "@/components/LearningPath";
import { AILearning } from "@/components/AILearning";
import { LearningEnhancement } from "@/components/LearningEnhancement";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Brain, Target, Zap } from "lucide-react";

const LoadingCard = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 shadow-xl">
    <CardContent className="p-8">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <Icon className="w-8 h-8 text-cyan-400 animate-pulse" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gradient-to-r from-white/20 to-white/10 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gradient-to-r from-white/15 to-white/5 rounded-full w-3/4 animate-pulse delay-100"></div>
          <div className="h-4 bg-gradient-to-r from-white/10 to-white/5 rounded-full w-1/2 animate-pulse delay-200"></div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ErrorFallback = ({ title }: { title: string }) => (
  <Card className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-lg border-red-400/30 shadow-xl">
    <CardContent className="p-8 text-center">
      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Zap className="w-8 h-8 text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-red-300 mb-3">{title}</h3>
      <p className="text-red-200/80 text-sm leading-relaxed">
        This component is being optimized for the best learning experience. Please try refreshing the page.
      </p>
      <div className="mt-4 px-4 py-2 bg-red-500/10 rounded-lg border border-red-400/20">
        <p className="text-xs text-red-300/60">Component loading temporarily unavailable</p>
      </div>
    </CardContent>
  </Card>
);

const Learning: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <Header />
      <div className="container mx-auto px-4 py-6 pt-20 relative z-10 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30 mb-6 backdrop-blur-sm">
            <span className="text-xs text-cyan-300 font-medium">🎓 Interactive Learning Platform</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Learning Center
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Master algorithms and data structures with interactive lessons, AI assistance, and personalized learning paths designed for your success.
          </p>
          
          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="text-center animate-fade-in delay-200 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-cyan-400 mb-1">50+</div>
              <div className="text-xs text-gray-400">Algorithms</div>
            </div>
            <div className="text-center animate-fade-in delay-300 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-purple-400 mb-1">100+</div>
              <div className="text-xs text-gray-400">Practice Problems</div>
            </div>
            <div className="text-center animate-fade-in delay-400 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-pink-400 mb-1">24/7</div>
              <div className="text-xs text-gray-400">AI Support</div>
            </div>
          </div>
        </div>
        
        {/* Visual Separator */}
        <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-12"></div>

        {/* Main Content Grid - Simplified Layout */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-3 gap-6 lg:gap-8 animate-fade-in delay-200">
            
            {/* Main Learning Hub */}
            <div className="lg:col-span-3 xl:col-span-2">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 h-fit">
                <Suspense fallback={<LoadingCard title="Learning Hub" icon={BookOpen} />}>
                  <React.Suspense fallback={<ErrorFallback title="Learning Hub" />}>
                    <LearningHub />
                  </React.Suspense>
                </Suspense>
              </div>
            </div>
            
            {/* Side Panel */}
            <div className="lg:col-span-1 xl:col-span-1">
              <div className="space-y-6">
                
                {/* Learning Path Card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-2">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Learning Path</h3>
                  </div>
                  <Suspense fallback={<LoadingCard title="Learning Path" icon={Target} />}>
                    <React.Suspense fallback={<ErrorFallback title="Learning Path" />}>
                      <LearningPathComponent />
                    </React.Suspense>
                  </Suspense>
                </div>
                
                {/* Enhancement Tools Card */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl hover:shadow-pink-500/10 transition-all duration-500">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-2">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Enhancement Tools</h3>
                  </div>
                  <Suspense fallback={<LoadingCard title="Enhancement Tools" icon={Zap} />}>
                    <React.Suspense fallback={<ErrorFallback title="Learning Enhancement" />}>
                      <LearningEnhancement />
                    </React.Suspense>
                  </Suspense>
                </div>
                
              </div>
            </div>
            
          </div>
          
          {/* AI Learning Assistant - Full Width Bottom Section */}
          <div className="mt-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white">AI Learning Assistant</h3>
              </div>
              <Suspense fallback={<LoadingCard title="AI Learning Assistant" icon={Brain} />}>
                <React.Suspense fallback={<ErrorFallback title="AI Learning" />}>
                  <AILearning />
                </React.Suspense>
              </Suspense>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Learning;
