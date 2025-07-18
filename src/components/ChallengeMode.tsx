
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Timer, Play, Pause, RotateCcw, Trophy, Zap } from 'lucide-react';
import { Challenge } from '@/types/gamification';

interface ChallengeModeProps {
  challenges: Challenge[];
  onChallengeComplete?: (challengeId: string, time: number) => void;
}

export const ChallengeMode: React.FC<ChallengeModeProps> = ({ 
  challenges, 
  onChallengeComplete 
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // Time's up logic here
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const startChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setTimeLeft(challenge.timeLimit);
    setIsActive(true);
    setIsCompleted(false);
  };

  const pauseChallenge = () => {
    setIsActive(false);
  };

  const resumeChallenge = () => {
    setIsActive(true);
  };

  const resetChallenge = () => {
    if (selectedChallenge) {
      setTimeLeft(selectedChallenge.timeLimit);
      setIsActive(false);
      setIsCompleted(false);
    }
  };

  const completeChallenge = () => {
    if (selectedChallenge) {
      const completionTime = selectedChallenge.timeLimit - timeLeft;
      setIsCompleted(true);
      setIsActive(false);
      onChallengeComplete?.(selectedChallenge.id, completionTime);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-300 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-300 border-red-500/30'
  };

  if (selectedChallenge) {
    const progress = ((selectedChallenge.timeLimit - timeLeft) / selectedChallenge.timeLimit) * 100;
    
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              {selectedChallenge.name}
            </div>
            <Badge className={difficultyColors[selectedChallenge.difficulty]}>
              {selectedChallenge.difficulty}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-white/80">{selectedChallenge.description}</p>
            
            {/* Timer Display */}
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-white mb-2">
                {formatTime(timeLeft)}
              </div>
              <Progress value={progress} className="w-full h-2" />
              <div className="text-white/60 text-sm mt-2">
                Time Progress: {Math.round(progress)}%
              </div>
            </div>

            {/* Challenge Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <div className="text-white font-semibold">{selectedChallenge.points}</div>
                <div className="text-white/60 text-sm">Points</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <Timer className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <div className="text-white font-semibold">
                  {selectedChallenge.bestTime ? formatTime(selectedChallenge.bestTime) : 'N/A'}
                </div>
                <div className="text-white/60 text-sm">Best Time</div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2 justify-center">
              {!isCompleted && (
                <>
                  {!isActive ? (
                    <Button
                      onClick={resumeChallenge}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {timeLeft === selectedChallenge.timeLimit ? 'Start' : 'Resume'}
                    </Button>
                  ) : (
                    <Button
                      onClick={pauseChallenge}
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  )}
                  
                  <Button
                    onClick={resetChallenge}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  
                  <Button
                    onClick={completeChallenge}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    Complete Challenge
                  </Button>
                </>
              )}
              
              {isCompleted && (
                <div className="text-center">
                  <div className="text-green-400 font-semibold mb-2">Challenge Completed! 🎉</div>
                  <Button
                    onClick={() => setSelectedChallenge(null)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    Back to Challenges
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Challenge Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="p-4 rounded-lg border bg-white/5 border-white/10"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium">{challenge.name}</h3>
                    <Badge className={difficultyColors[challenge.difficulty]}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <p className="text-white/70 text-sm mb-2">{challenge.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>⏱️ {formatTime(challenge.timeLimit)}</span>
                    <span>🏆 {challenge.points} pts</span>
                    <span>🎯 {challenge.attempts} attempts</span>
                    {challenge.bestTime && (
                      <span>⚡ Best: {formatTime(challenge.bestTime)}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                {challenge.completed && (
                  <Badge className="bg-green-500/20 text-green-300">
                    Completed
                  </Badge>
                )}
                
                <Button
                  onClick={() => startChallenge(challenge)}
                  size="sm"
                  className="ml-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  <Play className="w-3 h-3 mr-1" />
                  {challenge.completed ? 'Retry' : 'Start'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
