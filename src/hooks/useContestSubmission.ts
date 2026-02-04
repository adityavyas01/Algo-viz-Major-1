/**
 * useContestSubmission Hook
 * React hook for managing contest code submissions
 */

import { useState } from "react";
import {
  submitContestCode,
  getContestSubmissions,
  type ContestSubmission,
} from "@/services/contestService";
import type { BatchExecutionResult } from "@/types/execution";

interface SubmissionState {
  isSubmitting: boolean;
  submission: ContestSubmission | null;
  results: BatchExecutionResult | null;
  error: string | null;
}

export function useContestSubmission(contestId: string, problemId: string) {
  const [state, setState] = useState<SubmissionState>({
    isSubmitting: false,
    submission: null,
    results: null,
    error: null,
  });

  const [submissions, setSubmissions] = useState<ContestSubmission[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const submitCode = async (code: string, language: string) => {
    setState({
      isSubmitting: true,
      submission: null,
      results: null,
      error: null,
    });

    try {
      const { submissionId, results } = await submitContestCode(
        contestId,
        problemId,
        code,
        language
      );

      // Fetch the complete submission record
      const submissionHistory = await getContestSubmissions(contestId, problemId);
      const submission = submissionHistory.find((s) => s.id === submissionId) || null;

      setState({
        isSubmitting: false,
        submission,
        results,
        error: null,
      });

      // Update submissions history
      await loadSubmissions();

      return { submissionId, results };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit code";
      setState({
        isSubmitting: false,
        submission: null,
        results: null,
        error: errorMessage,
      });
      throw err;
    }
  };

  const loadSubmissions = async () => {
    setIsLoadingHistory(true);
    try {
      const data = await getContestSubmissions(contestId, problemId);
      setSubmissions(data);
    } catch (err) {
      console.error("Error loading submissions:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const clearResults = () => {
    setState({
      isSubmitting: false,
      submission: null,
      results: null,
      error: null,
    });
  };

  return {
    ...state,
    submissions,
    isLoadingHistory,
    submitCode,
    loadSubmissions,
    clearResults,
  };
}
