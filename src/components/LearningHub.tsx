
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-8" id="main-content">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Learning Hub</h1>
          <p className="text-xl text-white/80">Master algorithms and data structures with guided learning</p>
        </div>

        {algorithmParam && (
          <div className="mb-6 p-4 bg-cyan-600/20 border border-cyan-400/30 rounded-lg">
            <p className="text-cyan-300 text-center">
              🎯 Showing content for: <strong>{algorithmParam.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong>
            </p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="learning-paths" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Learning Paths</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Tutorials</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span className="hidden sm:inline">Practice</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Bookmarks</span>
            </TabsTrigger>
            <TabsTrigger value="explanations" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Database</span>
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

          <TabsContent value="tutorials">
            <div className="space-y-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Select Algorithm for Tutorial</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['bubble-sort', 'binary-search', 'merge-sort', 'quick-sort', 'arrays', 'linked-list'].map((algId) => (
                      <Button
                        key={algId}
                        onClick={() => setSelectedAlgorithm(algId)}
                        variant={selectedAlgorithm === algId ? 'default' : 'outline'}
                        size="sm"
                        className={selectedAlgorithm === algId 
                          ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                          : 'border-white/30 text-white hover:bg-white/10'
                        }
                      >
                        {algId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
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

          <TabsContent value="explanations">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8 text-center">
                <GraduationCap className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">Algorithm Database</h3>
                <p className="text-white/70 mb-4">
                  Comprehensive explanations database with detailed algorithm information
                </p>
                <p className="text-white/60 text-sm">
                  This feature integrates with all other learning components to provide detailed explanations, 
                  complexity analysis, and implementation examples for each algorithm.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
