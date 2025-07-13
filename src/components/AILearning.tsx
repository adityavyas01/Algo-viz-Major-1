
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BehaviorAnalytics } from '@/components/BehaviorAnalytics';
import { RecommendationEngine } from '@/components/RecommendationEngine';
import { AdaptiveLearning } from '@/components/AdaptiveLearning';
import { IntelligentHints } from '@/components/IntelligentHints';
import { 
  Activity, 
  Brain, 
  Target, 
  Lightbulb, 
  BarChart3, 
  Zap 
} from 'lucide-react';
import { 
  mockBehaviorEvents,
  mockRecommendations,
  mockAdaptiveDifficulty,
  mockIntelligentHints,
  mockNLExplanations,
  mockPerformancePredictions,
  mockAIInsights,
  mockLearningPathRecommendations
} from '@/data/aiLearningData';

export const AILearning: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('binary-search');
  const [currentStep, setCurrentStep] = useState(1);

  const handleAcceptRecommendation = (id: string) => {
    console.log('Accepting recommendation:', id);
  };

  const handleStartPath = (pathId: string) => {
    console.log('Starting learning path:', pathId);
  };

  const handleAdjustDifficulty = (newLevel: number) => {
    console.log('Adjusting difficulty to:', newLevel);
  };

  const handleToggleAdaptive = (enabled: boolean) => {
    console.log('Toggling adaptive learning:', enabled);
  };

  const handleRequestHint = (hintLevel: string) => {
    console.log('Requesting hint level:', hintLevel);
  };

  const handleRequestExplanation = (type: string) => {
    console.log('Requesting explanation type:', type);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">AI-Powered Learning</h2>
        <p className="text-white/70">Intelligent systems to accelerate your algorithm mastery</p>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">Recommendations</span>
          </TabsTrigger>
          <TabsTrigger value="adaptive" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Adaptive</span>
          </TabsTrigger>
          <TabsTrigger value="hints" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Hints</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <BehaviorAnalytics 
            events={mockBehaviorEvents}
            insights={mockAIInsights}
          />
        </TabsContent>

        <TabsContent value="recommendations">
          <RecommendationEngine
            recommendations={mockRecommendations}
            pathRecommendations={mockLearningPathRecommendations}
            onAcceptRecommendation={handleAcceptRecommendation}
            onStartPath={handleStartPath}
          />
        </TabsContent>

        <TabsContent value="adaptive">
          <AdaptiveLearning
            difficultyModel={mockAdaptiveDifficulty}
            predictions={mockPerformancePredictions}
            onAdjustDifficulty={handleAdjustDifficulty}
            onToggleAdaptive={handleToggleAdaptive}
          />
        </TabsContent>

        <TabsContent value="hints">
          <IntelligentHints
            hints={mockIntelligentHints}
            explanations={mockNLExplanations}
            currentStep={currentStep}
            algorithmId={selectedAlgorithm}
            onRequestHint={handleRequestHint}
            onRequestExplanation={handleRequestExplanation}
          />
        </TabsContent>

        <TabsContent value="performance">
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Performance Prediction</h3>
            <p className="text-white/70">Advanced performance analytics and predictions coming soon</p>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="text-center py-12">
            <Zap className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">AI Insights Dashboard</h3>
            <p className="text-white/70">Deep learning insights and pattern recognition coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
