/**
 * ContestView Component
 * Full contest interface with problems, timer, and leaderboard
 */

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trophy, Clock, Users, Play, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useContest, useContestTimer, useContestLeaderboard } from "@/hooks/useContest";
import { useContestSubmission } from "@/hooks/useContestSubmission";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ExecutionResult } from "@/components/ExecutionResult";
import type { LanguageId } from "@/types/execution";

export function ContestView() {
  const { contestId } = useParams<{ contestId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { contest, problems, isRegistered, isLoading, register } = useContest(contestId || "");
  const { timeRemaining, timeStatus, formattedTime } = useContestTimer(contest);
  const { leaderboard } = useContestLeaderboard(contestId || "", true);

  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>("python");

  const selectedProblem = problems[selectedProblemIndex];
  const { submitCode, isSubmitting, results, submissions, loadSubmissions } = useContestSubmission(
    contestId || "",
    selectedProblem?.problem_id || ""
  );

  useEffect(() => {
    if (selectedProblem) {
      loadSubmissions();
    }
  }, [selectedProblem]);

  const handleRegister = async () => {
    try {
      await register();
      toast({
        title: "Registered!",
        description: "You're now registered for this contest",
      });
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
      toast({
        title: "Empty code",
        description: "Please write some code before submitting",
        variant: "destructive",
      });
      return;
    }

    try {
      await submitCode(code, selectedLanguage);
      toast({
        title: "Submitted!",
        description: "Your solution has been judged",
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
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
            <p className="text-muted-foreground">Contest not found</p>
            <Button onClick={() => navigate("/contests")} className="mt-4">
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{contest.title}</h1>
            <p className="text-muted-foreground mt-1">{contest.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold">
              {formattedTime}
            </div>
            <div className="text-sm text-muted-foreground">
              {timeStatus === "not-started" && "Starts in"}
              {timeStatus === "active" && "Time Remaining"}
              {timeStatus === "finished" && "Contest Finished"}
            </div>
          </div>
        </div>

        {!isRegistered && timeStatus !== "finished" && (
          <Button onClick={handleRegister} className="mt-4" size="lg">
            Register Now
          </Button>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Problems & Code Editor */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {problems.map((problem, index) => {
                  const problemSubmissions = submissions.filter(
                    (s) => s.problem_id === problem.problem_id
                  );
                  const solved = problemSubmissions.some((s) => s.status === "accepted");

                  return (
                    <Button
                      key={problem.id}
                      variant={selectedProblemIndex === index ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setSelectedProblemIndex(index)}
                    >
                      <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                      <span className="flex-1 text-left truncate">{problem.problem?.title}</span>
                      {solved && <CheckCircle className="h-4 w-4 text-green-500 ml-2" />}
                      <Badge variant="outline" className="ml-2">{problem.points} pts</Badge>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {selectedProblem && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{selectedProblem.problem?.title}</CardTitle>
                    <LanguageSelector
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={(lang) => setSelectedLanguage(lang as LanguageId)}
                    />
                  </div>
                  <CardDescription>{selectedProblem.problem?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-[400px] p-4 font-mono text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Write your code here..."
                    disabled={!isRegistered || timeStatus !== "active"}
                  />
                  <Button
                    onClick={handleSubmit}
                    disabled={!isRegistered || timeStatus !== "active" || isSubmitting}
                    className="mt-4 w-full"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit Solution"}
                  </Button>
                </CardContent>
              </Card>

              {results && <ExecutionResult results={results} />}
            </>
          )}
        </div>

        {/* Leaderboard */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Leaderboard
              </CardTitle>
              <CardDescription>
                {leaderboard.length} participant{leaderboard.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {leaderboard.slice(0, 50).map((participant, index) => (
                  <div
                    key={participant.id}
                    className={`p-3 rounded-lg border ${
                      index < 3 ? "bg-yellow-50 border-yellow-200" : "bg-background"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">{participant.rank || index + 1}</span>
                        <div>
                          <p className="font-medium">{participant.user?.email || "Anonymous"}</p>
                          <p className="text-sm text-muted-foreground">
                            {participant.problems_solved} solved • {participant.score} pts
                          </p>
                        </div>
                      </div>
                      {index === 0 && <Trophy className="h-5 w-5 text-yellow-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
