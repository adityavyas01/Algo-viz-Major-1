
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Trophy, CheckCircle, Play } from 'lucide-react';
import { DailyChallenge } from '@/types/gamification';

interface DailyChallengesPanelProps {
  challenges: DailyChallenge[];
  onStartChallenge?: (challengeId: string) => void;
}

export const DailyChallengesPanel: React.FC<DailyChallengesPanelProps> = ({ 
  challenges, 
  onStartChallenge 
}) => {
  const formatTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const timeLeft = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatTimeLimit = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  };

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-300 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-300 border-red-500/30'
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Daily Challenges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`p-4 rounded-lg border ${
                challenge.completed 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium">{challenge.title}</h3>
                    {challenge.completed && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-white/70 text-sm mb-2">{challenge.description}</p>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={difficultyColors[challenge.difficulty]}>
                      {challenge.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-white/70 border-white/30">
                      <Trophy className="w-3 h-3 mr-1" />
                      {challenge.points} pts
                    </Badge>
                    <Badge variant="outline" className="text-white/70 border-white/30">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTimeLimit(challenge.timeLimit)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-white/50">
                  Expires in {formatTimeRemaining(challenge.expiresAt)}
                </div>
                
                {!challenge.completed ? (
                  <Button
                    size="sm"
                    onClick={() => onStartChallenge?.(challenge.id)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Start
                  </Button>
                ) : (
                  <Badge className="bg-green-500/20 text-green-300">
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
