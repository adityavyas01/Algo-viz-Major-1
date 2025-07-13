
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Clock, 
  BarChart3, 
  Settings,
  Lightbulb,
  AlertCircle
} from 'lucide-react';
import { AdaptiveDifficultyModel, PerformancePrediction } from '@/types/ai-learning';

interface AdaptiveLearningProps {
  difficultyModel: AdaptiveDifficultyModel;
  predictions: PerformancePrediction[];
  onAdjustDifficulty?: (newLevel: number) => void;
  onToggleAdaptive?: (enabled: boolean) => void;
}

export const AdaptiveLearning: React.FC<AdaptiveLearningProps> = ({ 
  difficultyModel, 
  predictions,
  onAdjustDifficulty,
  onToggleAdaptive
}) => {
  const [adaptiveEnabled, setAdaptiveEnabled] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const currentPrediction = predictions[0];

  const getConceptColor = (mastery: number) => {
    if (mastery >= 0.8) return 'bg-green-500';
    if (mastery >= 0.6) return 'bg-yellow-500';
    if (mastery >= 0.4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Adaptive Learning System</h2>
        <p className="text-white/70">AI-powered difficulty adjustment based on your performance</p>
      </div>

      {/* Current Difficulty Level */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Current Difficulty Level
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-white/70">Auto-adjust</span>
              <Switch
                checked={adaptiveEnabled}
                onCheckedChange={(checked) => {
                  setAdaptiveEnabled(checked);
                  onToggleAdaptive?.(checked);
                }}
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {difficultyModel.currentLevel.toFixed(1)}
              </div>
              <div className="text-white/70">out of 10.0</div>
              <Progress value={difficultyModel.currentLevel * 10} className="mt-3" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Target className="w-4 h-4 text-green-500 mx-auto mb-1" />
                <div className="text-white font-semibold">{difficultyModel.successRate}%</div>
                <div className="text-white/60 text-sm">Success Rate</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <div className="text-white font-semibold">{Math.floor(difficultyModel.averageTime / 60)}m</div>
                <div className="text-white/60 text-sm">Avg. Time</div>
              </div>
            </div>

            <Button
              onClick={() => setShowDetails(!showDetails)}
              variant="outline"
              size="sm"
              className="w-full border-white/30 text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Concept Mastery */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Concept Mastery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(difficultyModel.conceptMastery).map(([concept, mastery]) => (
              <div key={concept}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white capitalize">{concept.replace('-', ' ')}</span>
                  <span className="text-white">{Math.round(mastery * 100)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getConceptColor(mastery)}`}
                    style={{ width: `${mastery * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Prediction */}
      {currentPrediction && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Next Algorithm Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-white">
                    {Math.round(currentPrediction.predictedSuccessRate * 100)}%
                  </div>
                  <div className="text-white/70 text-sm">Success Probability</div>
                </div>
                <div className="text-center flex-1">
                  <div className="text-2xl font-bold text-white">
                    {currentPrediction.predictedCompletionTime}m
                  </div>
                  <div className="text-white/70 text-sm">Est. Time</div>
                </div>
              </div>

              {currentPrediction.weakAreas.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    Areas to Focus On
                  </h4>
                  <div className="space-y-2">
                    {currentPrediction.weakAreas.map((area, index) => (
                      <div key={index} className="p-2 bg-white/5 rounded text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white capitalize">{area.concept.replace('-', ' ')}</span>
                          <Badge className={`${getSeverityColor(area.severity)} bg-transparent border`}>
                            {area.severity}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-xs">{area.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentPrediction.recommendedPreparation.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-2">Recommended Preparation</h4>
                  <ul className="space-y-1">
                    {currentPrediction.recommendedPreparation.map((prep, index) => (
                      <li key={index} className="text-white/70 text-sm flex items-center gap-2">
                        <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                        {prep}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Adjustment History */}
      {showDetails && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {difficultyModel.adjustmentHistory.slice(0, 3).map((adjustment, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">
                      {adjustment.previousLevel.toFixed(1)} → {adjustment.newLevel.toFixed(1)}
                    </span>
                    <span className="text-white/60 text-xs">
                      {adjustment.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs">{adjustment.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
