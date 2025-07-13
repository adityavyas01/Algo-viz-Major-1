
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Lightbulb, 
  HelpCircle, 
  Brain, 
  Target, 
  AlertCircle, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { IntelligentHint, NaturalLanguageExplanation } from '@/types/ai-learning';

interface IntelligentHintsProps {
  hints: IntelligentHint[];
  explanations: NaturalLanguageExplanation[];
  currentStep?: number;
  algorithmId?: string;
  onRequestHint?: (hintLevel: string) => void;
  onRequestExplanation?: (type: string) => void;
}

export const IntelligentHints: React.FC<IntelligentHintsProps> = ({ 
  hints, 
  explanations,
  currentStep = 1,
  algorithmId = 'binary-search',
  onRequestHint,
  onRequestExplanation
}) => {
  const [currentHintLevel, setCurrentHintLevel] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentHints = hints.filter(h => h.algorithmId === algorithmId && h.stepNumber === currentStep);
  const currentExplanation = explanations.find(e => e.algorithmId === algorithmId);

  const getHintLevelColor = (level: string) => {
    switch (level) {
      case 'subtle': return 'bg-green-500/20 text-green-300';
      case 'moderate': return 'bg-yellow-500/20 text-yellow-300';
      case 'direct': return 'bg-orange-500/20 text-orange-300';
      case 'solution': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getHintIcon = (level: string) => {
    switch (level) {
      case 'subtle': return <HelpCircle className="w-4 h-4" />;
      case 'moderate': return <Lightbulb className="w-4 h-4" />;
      case 'direct': return <Target className="w-4 h-4" />;
      case 'solution': return <CheckCircle className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const handleRequestHint = (level: string) => {
    setCurrentHintLevel(level);
    onRequestHint?.(level);
  };

  const hintLevels = ['subtle', 'moderate', 'direct', 'solution'];
  const currentHint = currentHints.find(h => h.hintLevel === currentHintLevel);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Intelligent Help System</h2>
        <p className="text-white/70">AI-powered hints and explanations tailored to your needs</p>
      </div>

      {/* Current Algorithm Context */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Current Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-white font-semibold capitalize">{algorithmId.replace('-', ' ')}</div>
              <div className="text-white/60 text-sm">Algorithm</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-white font-semibold">Step {currentStep}</div>
              <div className="text-white/60 text-sm">Current Step</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hint Levels */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Progressive Hints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            {hintLevels.map((level) => {
              const hint = currentHints.find(h => h.hintLevel === level);
              const isAvailable = hint !== undefined;
              const isRevealed = currentHintLevel === level;

              return (
                <div key={level} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getHintIcon(level)}
                      <span className="text-white capitalize">{level} Hint</span>
                      <Badge className={getHintLevelColor(level)}>
                        {level}
                      </Badge>
                    </div>
                    {isAvailable && (
                      <Button
                        onClick={() => handleRequestHint(level)}
                        size="sm"
                        variant={isRevealed ? "default" : "outline"}
                        className={isRevealed 
                          ? "bg-cyan-500 hover:bg-cyan-600" 
                          : "border-white/30 text-white hover:bg-white/10"
                        }
                      >
                        {isRevealed ? 'Hide' : 'Show'}
                      </Button>
                    )}
                  </div>
                  
                  {isRevealed && hint && (
                    <div className="mt-3 p-3 bg-white/10 rounded border-l-4 border-cyan-500">
                      <p className="text-white/90">{hint.content}</p>
                      {hint.effectivenessScore && (
                        <div className="mt-2 text-xs text-white/60">
                          Effectiveness: {Math.round(hint.effectivenessScore * 100)}%
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!isAvailable && (
                    <p className="text-white/50 text-sm">No hint available for this step</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center text-xs text-white/50">
            Start with subtle hints and progress gradually to maintain learning
          </div>
        </CardContent>
      </Card>

      {/* Natural Language Explanations */}
      {currentExplanation && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Conceptual Understanding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
              >
                {showExplanation ? 'Hide' : 'Show'} Detailed Explanation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {showExplanation && (
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-2 capitalize">
                      {currentExplanation.explanationType.replace('-', ' ')}
                    </h4>
                    <p className="text-white/90 leading-relaxed">{currentExplanation.content}</p>
                  </div>

                  {currentExplanation.examples.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Real-World Examples</h4>
                      <div className="grid gap-2">
                        {currentExplanation.examples.map((example, index) => (
                          <div key={index} className="p-2 bg-white/5 rounded text-white/80 text-sm">
                            • {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentExplanation.analogies.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Helpful Analogies</h4>
                      <div className="grid gap-2">
                        {currentExplanation.analogies.map((analogy, index) => (
                          <div key={index} className="p-2 bg-white/5 rounded text-white/80 text-sm italic">
                            "{analogy}"
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-white/50 text-center">
                    Explanation difficulty: {currentExplanation.difficultyLevel}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Statistics */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Help Usage Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-white/60 text-sm">Hints Used Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">89%</div>
              <div className="text-white/60 text-sm">Success After Hints</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2.3</div>
              <div className="text-white/60 text-sm">Avg Hints Per Problem</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
