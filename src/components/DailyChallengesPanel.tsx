import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy, Code, BookOpen, Play, Target } from "lucide-react";
import { DailyChallenge, Challenge } from "@/types/challenges";
import { ChallengeService } from "@/lib/challengeService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DailyChallengesPanel = () => {
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadDailyChallenges();
  }, []);

  const loadDailyChallenges = async () => {
    try {
      setLoading(true);
      const challenges = await ChallengeService.getDailyChallenges();
      setDailyChallenges(challenges);
    } catch (error) {
      console.error("Error loading daily challenges:", error);
      toast({
        title: "Error",
        description: "Failed to load daily challenges. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartChallenge = async (challenge: Challenge) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to participate in challenges.",
        variant: "destructive",
      });
      return;
    }

    try {
      const attempt = await ChallengeService.startChallenge(
        challenge.id,
        user.id
      );
      navigate(`/challenge/${attempt.id}`);
    } catch (error) {
      console.error("Error starting challenge:", error);
      toast({
        title: "Error",
        description: "Failed to start challenge. Please try again.",
        variant: "destructive",
      });
    }
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "coding":
        return <Code className="w-4 h-4" />;
      case "mcq":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Daily Challenges</h2>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="bg-white/10 backdrop-blur-sm border-white/20 animate-pulse"
            >
              <CardHeader>
                <div className="h-6 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (dailyChallenges.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 text-white/40 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          No Daily Challenges
        </h3>
        <p className="text-white/60 mb-6">
          Check back tomorrow for new challenges!
        </p>
        <Button
          onClick={loadDailyChallenges}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Daily Challenges</h2>
          <p className="text-white/60">
            Complete today's challenges to earn points and improve your skills
          </p>
        </div>
        <Button
          onClick={loadDailyChallenges}
          variant="outline"
          size="sm"
          className="border-white/30 text-white hover:bg-white/10"
        >
          Refresh
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dailyChallenges.map((dailyChallenge) => {
          const challenge = dailyChallenge.challenge;
          if (!challenge) return null;

          return (
            <Card
              key={dailyChallenge.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(challenge.challenge_type)}
                    <Badge
                      variant="outline"
                      className={`${getDifficultyColor(
                        challenge.difficulty
                      )} capitalize`}
                    >
                      {challenge.difficulty}
                    </Badge>
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
                    <span>{formatTime(challenge.time_limit)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{challenge.challenge_type.toUpperCase()}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleStartChallenge(challenge)}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Challenge
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center pt-6">
        <p className="text-white/50 text-sm">
          New challenges are released daily at midnight UTC
        </p>
      </div>
    </div>
  );
};

export default DailyChallengesPanel;
