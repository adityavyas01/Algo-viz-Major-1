import React, { Suspense } from "react";
import { Header } from "@/components/Header";
import { LearningHub } from "@/components/LearningHub";
import { LearningPathComponent } from "@/components/LearningPath";
import { AILearning } from "@/components/AILearning";
import { LearningEnhancement } from "@/components/LearningEnhancement";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Brain, Target, Zap } from "lucide-react";

const LoadingCard = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
    <CardContent className="p-6">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-white/10 rounded"></div>
        <div className="h-4 bg-white/10 rounded w-3/4"></div>
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
      </div>
    </CardContent>
  </Card>
);

const ErrorFallback = ({ title }: { title: string }) => (
  <Card className="bg-red-500/10 backdrop-blur-sm border-red-500/20">
    <CardContent className="p-6 text-center">
      <h3 className="text-lg font-semibold text-red-400 mb-2">{title} - Loading Issue</h3>
      <p className="text-red-300 text-sm">This component is being developed. Please try again later.</p>
    </CardContent>
  </Card>
);

const Learning: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Learning Center
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master algorithms and data structures with interactive lessons, AI assistance, and personalized learning paths.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
              <Suspense fallback={<LoadingCard title="Learning Hub" icon={BookOpen} />}>
                <React.Suspense fallback={<ErrorFallback title="Learning Hub" />}>
                  <LearningHub />
                </React.Suspense>
              </Suspense>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
              <Suspense fallback={<LoadingCard title="AI Learning Assistant" icon={Brain} />}>
                <React.Suspense fallback={<ErrorFallback title="AI Learning" />}>
                  <AILearning />
                </React.Suspense>
              </Suspense>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
              <Suspense fallback={<LoadingCard title="Learning Path" icon={Target} />}>
                <React.Suspense fallback={<ErrorFallback title="Learning Path" />}>
                  <LearningPathComponent />
                </React.Suspense>
              </Suspense>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
              <Suspense fallback={<LoadingCard title="Enhancement Tools" icon={Zap} />}>
                <React.Suspense fallback={<ErrorFallback title="Learning Enhancement" />}>
                  <LearningEnhancement />
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
