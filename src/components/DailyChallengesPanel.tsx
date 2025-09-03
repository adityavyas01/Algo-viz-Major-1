import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy, Code, BookOpen, Play, Target, Zap } from "lucide-react";
import { mockDailyChallenges } from "@/data/gamificationData";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DailyChallengesPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(
    new Set(mockDailyChallenges.filter(c => c.completed).map(c => c.id))
  );

  const handleStartChallenge = (challengeId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Mark as completed when started (simulate completion)
    setCompletedChallenges(prev => new Set([...prev, challengeId]));
    
    // Navigate to a challenge page or show a success message
    console.log('Starting challenge:', challengeId);
    navigate(`/learning?algorithm=${challengeId.replace('daily-', '')}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeIcon = (algorithmId: string) => {
    if (algorithmId.includes('sort')) return <Code className="w-4 h-4" />;
    if (algorithmId.includes('search')) return <Target className="w-4 h-4" />;
    if (algorithmId.includes('tree')) return <BookOpen className="w-4 h-4" />;
    return <Zap className="w-4 h-4" />;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const timeLeft = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    
    if (hours > 0) return `${hours}h remaining`;
    return 'Expires soon';
  };

  // Use real data with completion state
  const challengesWithCompletion = mockDailyChallenges.map(challenge => ({
    ...challenge,
    completed: completedChallenges.has(challenge.id)
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Daily Challenges</h2>
          <p className="text-white/60">
            Complete today's challenges to earn points and improve your skills
          </p>
        </div>
        <div className="text-right">
          <div className="text-cyan-400 text-sm font-medium">
            {challengesWithCompletion.filter(c => c.completed).length} / {challengesWithCompletion.length} Complete
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {challengesWithCompletion.map((challenge) => {
          const isCompleted = challenge.completed;
          
          return (
            <Card
              key={challenge.id}
              className={`bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 ${
                isCompleted ? 'ring-2 ring-green-500/30' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(challenge.algorithmId)}
                    <Badge
                      variant="outline"
                      className={`${getDifficultyColor(
                        challenge.difficulty
                      )} capitalize`}
                    >
                      {challenge.difficulty}
                    </Badge>
                    {isCompleted && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        ✓ Completed
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {challenge.points}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-white text-lg">
                  {challenge.title}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {challenge.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(challenge.timeLimit)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-300">
                    <Target className="w-4 h-4" />
                    <span>{formatTimeRemaining(challenge.expiresAt)}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleStartChallenge(challenge.id)}
                  disabled={isCompleted}
                  className={`w-full ${
                    isCompleted 
                      ? 'bg-green-600/20 text-green-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <Trophy className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Challenge
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center pt-6">
        <p className="text-white/50 text-sm">
          New challenges are released daily. Complete them all to earn bonus rewards!
        </p>
      </div>
    </div>
  );
};

export default DailyChallengesPanel;
