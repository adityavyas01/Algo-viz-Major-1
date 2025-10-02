
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Code, TrendingUp, Bookmark, MapPin, GraduationCap } from 'lucide-react';
import { TutorialSystem } from '@/components/TutorialSystem';
import { PracticeProblems } from '@/components/PracticeProblems';
import { LearningPathComponent } from '@/components/LearningPath';
import { ProgressAnalytics } from '@/components/ProgressAnalytics';
import { BookmarkSystem } from '@/components/BookmarkSystem';
import { AuthAwareFeature } from '@/components/AuthAwareFeature';
import { useSearchParams } from 'react-router-dom';

export const LearningHub: React.FC = () => {
  const [searchParams] = useSearchParams();
  const algorithmParam = searchParams.get('algorithm');
  const tabParam = searchParams.get('tab');
  
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(algorithmParam || 'bubble-sort');
  const [activeTab, setActiveTab] = useState<string>(tabParam || 'learning-paths');

  // Update selected algorithm when URL parameter changes
  useEffect(() => {
    if (algorithmParam) {
      setSelectedAlgorithm(algorithmParam);
    }
  }, [algorithmParam]);

  // Update active tab when URL parameter changes
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="w-full" id="main-content">
        <div className="space-y-4">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 mb-2">
            <BookOpen className="w-3 h-3 text-cyan-300 mr-1" />
            <span className="text-xs text-cyan-300 font-medium">Interactive Platform</span>
          </div>
          <p className="text-sm text-white/80 mb-3">
            Master algorithms with guided tutorials and interactive learning
          </p>
        </div>        {algorithmParam && (
          <div className="mb-8 p-6 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-400/40 rounded-xl backdrop-blur-sm animate-fade-in">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <p className="text-cyan-300 text-center font-medium">
                🎯 Focused Learning: <strong className="text-white">{algorithmParam.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong>
              </p>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-fade-in delay-200">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-0.5 h-auto">
            <TabsTrigger value="learning-paths" className="flex items-center justify-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-cyan-300 rounded-md transition-all duration-300 text-xs p-1.5">
              <MapPin className="w-3 h-3" />
              <span className="hidden sm:inline text-xs">Paths</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center justify-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-emerald-500/20 data-[state=active]:text-green-300 rounded-md transition-all duration-300 text-xs p-1.5">
              <BookOpen className="w-3 h-3" />
              <span className="hidden sm:inline text-xs">Tutorials</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center justify-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-violet-500/20 data-[state=active]:text-purple-300 rounded-md transition-all duration-300 text-xs p-1.5">
              <Code className="w-3 h-3" />
              <span className="hidden sm:inline text-xs">Practice</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center justify-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500/20 data-[state=active]:to-red-500/20 data-[state=active]:text-orange-300 rounded-md transition-all duration-300 text-xs p-1.5">
              <TrendingUp className="w-3 h-3" />
              <span className="hidden sm:inline text-xs">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex items-center justify-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500/20 data-[state=active]:to-amber-500/20 data-[state=active]:text-yellow-300 rounded-md transition-all duration-300 text-xs p-1.5">
              <Bookmark className="w-3 h-3" />
              <span className="hidden sm:inline text-xs">Bookmarks</span>
            </TabsTrigger>
            <TabsTrigger value="explanations" className="flex items-center justify-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-indigo-300 rounded-lg transition-all duration-300 text-xs p-2">
              <GraduationCap className="w-3 h-3" />
              <span className="hidden sm:inline text-xs">Database</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learning-paths">
            <AuthAwareFeature
              requiresAuth={true}
              featureName="AI-Powered Learning Paths"
              benefit="Get personalized learning roadmaps tailored to your skill level and goals. Track your progress and receive adaptive recommendations as you advance."
            >
              <LearningPathComponent />
            </AuthAwareFeature>
          </TabsContent>

          <TabsContent value="tutorials" className="animate-fade-in space-y-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-green-300" />
                  </div>
                  <h3 className="text-white text-base font-medium">Algorithm Tutorials</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['bubble-sort', 'binary-search', 'merge-sort', 'quick-sort', 'arrays', 'linked-list'].map((algId, index) => (
                  <Button
                    key={algId}
                    onClick={() => setSelectedAlgorithm(algId)}
                    variant={selectedAlgorithm === algId ? 'default' : 'outline'}
                    size="sm"
                    className={`text-xs transition-all duration-300 ${selectedAlgorithm === algId 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md' 
                      : 'border-white/30 text-white hover:bg-white/5 hover:border-white/40'
                    }`}
                  >
                    {algId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Button>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
              <TutorialSystem algorithmId={selectedAlgorithm} />
            </div>
          </TabsContent>

          <TabsContent value="practice">
            <AuthAwareFeature
              requiresAuth={true}
              featureName="Advanced Practice Problems"
              benefit="Access detailed solutions, step-by-step explanations, and multiple difficulty levels. Track your problem-solving progress and identify areas for improvement."
            >
              <PracticeProblems algorithmId={selectedAlgorithm} />
            </AuthAwareFeature>
          </TabsContent>

          <TabsContent value="analytics">
            <AuthAwareFeature
              requiresAuth={true}
              featureName="Progress Analytics"
              benefit="Detailed insights into your learning journey with performance metrics, time tracking, skill assessments, and personalized recommendations for improvement."
            >
              <ProgressAnalytics />
            </AuthAwareFeature>
          </TabsContent>

          <TabsContent value="bookmarks">
            <AuthAwareFeature
              requiresAuth={true}
              featureName="Smart Bookmarks & Notes"
              benefit="Save important concepts, create personal notes, and organize your learning materials. Never lose track of key algorithms and insights."
            >
              <BookmarkSystem />
            </AuthAwareFeature>
          </TabsContent>

          <TabsContent value="explanations" className="animate-fade-in">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="text-white text-lg font-bold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Algorithm Database
                </h3>
                <p className="text-white/70 mb-4 text-sm leading-relaxed">
                  Comprehensive explanations with detailed algorithm information and complexity analysis
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-lg font-bold text-indigo-400 mb-1">50+</div>
                    <div className="text-xs text-white/60">Algorithms</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-lg font-bold text-purple-400 mb-1">15+</div>
                    <div className="text-xs text-white/60">Structures</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-lg font-bold text-pink-400 mb-1">100+</div>
                    <div className="text-xs text-white/60">Examples</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
