/**
 * SubmissionHistory Component
 * Displays user's submission history for a problem
 */

import { useEffect } from "react";
import { Clock, Check, X, AlertCircle, Trophy } from "lucide-react";
import { useSubmissionHistory } from "@/hooks/useSubmission";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Submission } from "@/services/testcaseService";

interface SubmissionHistoryProps {
  problemId: string;
  onSelectSubmission?: (submissionId: string) => void;
}

export function SubmissionHistory({ problemId, onSelectSubmission }: SubmissionHistoryProps) {
  const { submissions, isLoading, loadSubmissions } = useSubmissionHistory(problemId);

  useEffect(() => {
    loadSubmissions();
  }, [problemId]);

  const getStatusIcon = (status: Submission["status"]) => {
    switch (status) {
      case "accepted":
        return <Check className="h-4 w-4 text-green-500" />;
      case "wrong_answer":
        return <X className="h-4 w-4 text-red-500" />;
      case "runtime_error":
      case "compilation_error":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "time_limit_exceeded":
      case "memory_limit_exceeded":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Submission["status"]) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "wrong_answer":
        return "bg-red-100 text-red-800 border-red-200";
      case "runtime_error":
      case "compilation_error":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "time_limit_exceeded":
      case "memory_limit_exceeded":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
          <CardDescription>Loading your submissions...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (submissions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
          <CardDescription>No submissions yet. Try submitting your code!</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const bestSubmission = submissions.find((s) => s.status === "accepted");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Submission History</span>
          {bestSubmission && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Trophy className="h-3 w-3 mr-1" />
              Best: {bestSubmission.score}%
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {submissions.length} submission{submissions.length > 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {submissions.map((submission, index) => (
              <div
                key={submission.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                  index === 0 ? "border-primary/20 bg-primary/5" : "border-border bg-background"
                }`}
                onClick={() => onSelectSubmission?.(submission.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{getStatusIcon(submission.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getStatusColor(submission.status)} variant="outline">
                          {submission.verdict || submission.status.replace(/_/g, " ").toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {submission.language}
                        </Badge>
                        {submission.status === "accepted" && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {submission.score}%
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>
                          {submission.passed_testcases}/{submission.total_testcases} passed
                        </span>
                        {submission.runtime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {submission.runtime}ms
                          </span>
                        )}
                        {submission.memory && (
                          <span>{Math.round(submission.memory / 1024)}MB</span>
                        )}
                      </div>

                      <div className="text-xs text-muted-foreground mt-1">
                        {formatTimestamp(submission.submitted_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
