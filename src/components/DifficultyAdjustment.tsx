
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Clock, Target, Settings } from 'lucide-react';
import { DifficultySettings } from '@/types/learning';

interface DifficultyAdjustmentProps {
  settings: DifficultySettings;
  onToggleAdaptive?: (enabled: boolean) => void;
  onLevelChange?: (level: DifficultySettings['currentLevel']) => void;
}

export const DifficultyAdjustment: React.FC<DifficultyAdjustmentProps> = ({ 
  settings, 
  onToggleAdaptive, 
  onLevelChange 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const levels: { level: DifficultySettings['currentLevel']; label: string; color: string }[] = [
    { level: 'beginner', label: 'Beginner', color: 'bg-green-500/20 text-green-300' },
    { level: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500/20 text-yellow-300' },
    { level: 'advanced', label: 'Advanced', color: 'bg-orange-500/20 text-orange-300' },
    { level: 'expert', label: 'Expert', color: 'bg-red-500/20 text-red-300' }
  ];

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          Adaptive Difficulty
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Adaptive Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Automatic Adjustment</div>
              <div className="text-white/60 text-sm">
                AI adjusts difficulty based on your performance
              </div>
            </div>
            <Switch
              checked={settings.adaptiveEnabled}
              onCheckedChange={onToggleAdaptive}
            />
          </div>

          {/* Current Level */}
          <div>
            <div className="text-white font-medium mb-3">Current Level</div>
            <div className="grid grid-cols-2 gap-2">
              {levels.map(({ level, label, color }) => (
                <Button
                  key={level}
                  variant={settings.currentLevel === level ? 'default' : 'outline'}
                  size="sm"
                  className={`${
                    settings.currentLevel === level
                      ? 'bg-white text-black'
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                  onClick={() => onLevelChange?.(level)}
                  disabled={settings.adaptiveEnabled}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-white/80 text-sm">Success Rate</span>
              <Badge className="bg-green-500/20 text-green-300 ml-auto">
                {settings.successRate}%
              </Badge>
            </div>
            <Progress value={settings.successRate} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-white/80 text-sm">Average Time</span>
              <Badge className="bg-blue-500/20 text-blue-300 ml-auto">
                {Math.floor(settings.averageCompletionTime / 60)}m {settings.averageCompletionTime % 60}s
              </Badge>
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-white/70 hover:bg-white/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Advanced Settings
            </Button>

            {showAdvanced && (
              <div className="mt-4 space-y-4 p-4 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white/80 text-sm mb-2">Preferred Topics</div>
                  <div className="flex flex-wrap gap-1">
                    {settings.preferredTopics.map((topic) => (
                      <Badge key={topic} className="bg-cyan-500/20 text-cyan-300">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-white/80 text-sm mb-2">Areas to Improve</div>
                  <div className="flex flex-wrap gap-1">
                    {settings.avoidedTopics.map((topic) => (
                      <Badge key={topic} className="bg-red-500/20 text-red-300">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-white/50">
                  Last adjusted: {settings.lastAdjustment.toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
