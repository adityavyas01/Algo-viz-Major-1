import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Star,
  Lightbulb
} from 'lucide-react';
import { LearningRecommendation, LearningPathRecommendation } from '@/types/ai-learning';

interface RecommendationEngineProps {
  recommendations: LearningRecommendation[];
  pathRecommendations: LearningPathRecommendation[];
  onAcceptRecommendation?: (id: string) => void;
  onStartPath?: (pathId: string) => void;
}

export const RecommendationEngine: React.FC<RecommendationEngineProps> = ({ 
  recommendations, 
  pathRecommendations,
  onAcceptRecommendation,
  onStartPath
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: LearningRecommendation['type']) => {
    switch (type) {
      case 'next_algorithm': return <Target className="w-4 h-4" />;
      case 'review_topic': return <BookOpen className="w-4 h-4" />;
      case 'learning_path': return <TrendingUp className="w-4 h-4" />;
      case 'practice_problem': return <Lightbulb className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const urgentRecommendations = recommendations.filter(r => r.priority === 'urgent' || r.priority === 'high');
  const otherRecommendations = recommendations.filter(r => r.priority !== 'urgent' && r.priority !== 'high');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">AI Recommendations</h2>
        <p className="text-white/70">Personalized suggestions to optimize your learning journey</p>
      </div>

      {/* Urgent Recommendations */}
      {urgentRecommendations.length > 0 && (
        <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-orange-400" />
              Priority Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentRecommendations.map((rec) => (
                <div key={rec.id} className="p-4 bg-white/10 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(rec.type)}
                      <h3 className="text-white font-medium">{rec.title}</h3>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <div className="text-white/60 text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {rec.estimatedTime}m
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-sm mb-3">{rec.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/50">
                      Confidence: {Math.round(rec.confidence * 100)}%
                    </div>
                    <Button
                      onClick={() => onAcceptRecommendation?.(rec.id)}
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                    >
                      Start Now
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Path Recommendations */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recommended Learning Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {pathRecommendations.map((path) => (
              <div key={path.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-medium mb-1">{path.name}</h3>
                    <p className="text-white/70 text-sm">{path.description}</p>
                  </div>
                  <Badge className="bg-cyan-500/20 text-cyan-300">
                    {path.difficulty}
                  </Badge>
                </div>

                <div className="mb-3">
                  <div className="text-white/60 text-xs mb-1">AI Reasoning:</div>
                  <p className="text-white/80 text-sm italic">"{path.personalizedReason}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-2 bg-white/5 rounded">
                    <div className="text-white font-semibold">{path.algorithms.length}</div>
                    <div className="text-white/60 text-xs">Algorithms</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded">
                    <div className="text-white font-semibold">{Math.floor(path.estimatedDuration / 60)}h</div>
                    <div className="text-white/60 text-xs">Est. Duration</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-white/70">Confidence</span>
                    <span className="text-white">{Math.round(path.confidenceScore * 100)}%</span>
                  </div>
                  <Progress value={path.confidenceScore * 100} className="h-2" />
                </div>

                <Button
                  onClick={() => onStartPath?.(path.id)}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  Start Learning Path
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Other Recommendations */}
      {otherRecommendations.length > 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">More Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {otherRecommendations.map((rec) => (
                <div key={rec.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(rec.type)}
                    <div>
                      <h4 className="text-white text-sm font-medium">{rec.title}</h4>
                      <p className="text-white/60 text-xs">{rec.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority}
                    </Badge>
                    <Button
                      onClick={() => onAcceptRecommendation?.(rec.id)}
                      size="sm"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      Try It
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
