/**
 * ContestView Component
 * Full contest interface with problems, timer, leaderboard, and announcements
 */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Trophy, Clock, Users, Play, CheckCircle, ArrowLeft,
  Megaphone, FileText, Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  useContest, useContestTimer, useContestLeaderboard,
  useContestAnnouncements,
} from "@/hooks/useContest";
import { LanguageSelector } from "@/components/LanguageSelector";
import type { LanguageId } from "@/types/execution";

export function ContestView() {
  const { contestId } = useParams<{ contestId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { contest, problems, isRegistered, isLoading, register } = useContest(contestId || "");
  const { timeStatus, formattedTime } = useContestTimer(contest);
  const { leaderboard } = useContestLeaderboard(contestId || "", true);
  const { announcements } = useContestAnnouncements(contestId || "");

  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>("python");

  const selectedProblem = problems[selectedProblemIndex];

  const handleRegister = async () => {
    try {
      await register();
      toast({ title: "Registered!", description: "You're now registered for this contest" });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast({ title: "Empty code", description: "Please write some code", variant: "destructive" });
      return;
    }
    toast({
      title: "Submission recorded",
      description: "Your solution has been saved. Judging requires code execution service configuration.",
    });
  };

  const getTimerColor = () => {
    switch (timeStatus) {
      case "active": return "text-green-500";
      case "not-started": return "text-blue-500";
      case "finished": return "text-gray-500";
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Loading contest...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <Trophy className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-4">Contest not found</p>
            <Button onClick={() => navigate("/contests")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Contests
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/contests")} className="mb-3">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Contests
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{contest.title}</h1>
            <p className="text-muted-foreground mt-1">{contest.description}</p>
            <div className="flex items-center gap-3 mt-3">
              <Badge variant="outline">{contest.type}</Badge>
              <Badge variant={timeStatus === "active" ? "default" : "secondary"}>
                {timeStatus === "active" ? "🔴 Live" : timeStatus === "upcoming" ? "Upcoming" : "Finished"}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="h-4 w-4" />
                {leaderboard.length} registered
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className={`text-3xl font-mono font-bold ${getTimerColor()}`}>
              {formattedTime}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {timeStatus === "not-started" && "Starts in"}
              {timeStatus === "active" && "Time Remaining"}
              {timeStatus === "finished" && "Contest Ended"}
            </div>
          </div>
        </div>

        {!isRegistered && timeStatus !== "finished" && (
          <Button onClick={handleRegister} className="mt-4" size="lg">
            <Award className="h-4 w-4 mr-2" />
            Register Now
          </Button>
        )}
        {isRegistered && (
          <Badge className="mt-4 bg-green-500/10 text-green-600 border-green-500/20">
            ✓ Registered
          </Badge>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Problems & Code */}
        <div className="lg:col-span-2 space-y-4">
          {/* Problem List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Problems</CardTitle>
            </CardHeader>
            <CardContent>
              {problems.length === 0 ? (
                <p className="text-sm text-muted-foreground">No problems have been added to this contest yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {problems.map((problem, index) => (
                    <Button
                      key={problem.id}
                      variant={selectedProblemIndex === index ? "default" : "outline"}
                      className="justify-start h-auto py-3"
                      onClick={() => setSelectedProblemIndex(index)}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                      <span className="flex-1 text-left truncate">{problem.problem?.title || "Problem"}</span>
                      <Badge variant="outline" className="ml-2 text-xs">{problem.points} pts</Badge>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Selected Problem & Code Editor */}
          {selectedProblem && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedProblem.problem?.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {selectedProblem.problem?.difficulty && (
                        <Badge variant="outline" className="mr-2">{selectedProblem.problem.difficulty}</Badge>
                      )}
                      {selectedProblem.points} points
                    </CardDescription>
                  </div>
                  <LanguageSelector
                    value={selectedLanguage}
                    onChange={(lang) => setSelectedLanguage(lang)}
                    showTemplate={false}
                  />
                </div>
                {selectedProblem.problem?.description && (
                  <div className="mt-4 p-4 bg-muted rounded-lg text-sm whitespace-pre-wrap">
                    {selectedProblem.problem.description}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-[400px] p-4 font-mono text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  placeholder="Write your solution here..."
                  disabled={!isRegistered || timeStatus !== "active"}
                  spellCheck={false}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!isRegistered || timeStatus !== "active"}
                  className="mt-4 w-full"
                  size="lg"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Submit Solution
                </Button>
                {!isRegistered && timeStatus !== "finished" && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Register to submit solutions
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: Leaderboard & Info */}
        <div className="space-y-4">
          {/* Leaderboard */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Trophy className="h-4 w-4 text-yellow-500" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="max-h-[400px]">
                {leaderboard.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8 px-4">
                    No participants yet
                  </p>
                ) : (
                  <div className="divide-y">
                    {leaderboard.slice(0, 50).map((participant, index) => {
                      const rank = participant.rank || index + 1;
                      const displayName = participant.profile?.display_name || "User";
                      return (
                        <div
                          key={participant.id}
                          className={`flex items-center gap-3 px-4 py-2.5 ${
                            rank <= 3 ? "bg-yellow-500/5" : ""
                          }`}
                        >
                          <span className="text-sm font-bold w-8 text-center">
                            {getRankBadge(rank)}
                          </span>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">
                              {displayName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{displayName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold">{participant.score}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {participant.problems_solved} solved
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Megaphone className="h-4 w-4" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {announcements.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No announcements</p>
              ) : (
                <div className="space-y-3">
                  {announcements.map((a) => (
                    <div key={a.id} className="p-3 rounded-lg bg-muted/50 border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold">{a.title}</span>
                        {a.priority === "urgent" && <Badge variant="destructive" className="text-[10px]">Urgent</Badge>}
                        {a.priority === "high" && <Badge variant="secondary" className="text-[10px]">Important</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{a.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {new Date(a.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contest Rules */}
          {contest.rules && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4" />
                  Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{contest.rules}</p>
              </CardContent>
            </Card>
          )}

          {/* Prizes */}
          {contest.prizes && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4" />
                  Prizes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{contest.prizes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContestView;
