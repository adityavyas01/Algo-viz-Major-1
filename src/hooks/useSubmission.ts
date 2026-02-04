/**
 * useSubmission Hook
 * React hook for managing code submissions with testcase execution
 */

import { useState } from "react";
import { createSubmission, getUserSubmissions, getSubmissionDetails } from "@/services/testcaseService";
import type { Submission, SubmissionResult, Testcase } from "@/services/testcaseService";
import type { BatchExecutionResult } from "@/types/execution";

interface SubmissionState {
  isSubmitting: boolean;
  submission: Submission | null;
  results: BatchExecutionResult | null;
  error: string | null;
}

interface SubmissionDetailsState {
  isLoading: boolean;
  submission: Submission | null;
  results: (SubmissionResult & { testcase?: Testcase })[];
  error: string | null;
}

export function useSubmission() {
  const [state, setState] = useState<SubmissionState>({
    isSubmitting: false,
    submission: null,
    results: null,
    error: null,
  });

  const submitCode = async (problemId: string, code: string, language: string) => {
    setState({
      isSubmitting: true,
      submission: null,
      results: null,
      error: null,
    });

    try {
      const { submissionId, results } = await createSubmission(problemId, code, language);

      // Fetch the complete submission record
      const submissions = await getUserSubmissions(problemId, 1);
      const submission = submissions.find((s) => s.id === submissionId) || null;

      setState({
        isSubmitting: false,
        submission,
        results,
        error: null,
      });

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
    submitCode,
    clearResults,
  };
}

export function useSubmissionHistory(problemId: string) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSubmissions = async (limit: number = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getUserSubmissions(problemId, limit);
      setSubmissions(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load submissions";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submissions,
    isLoading,
    error,
    loadSubmissions,
  };
}

export function useSubmissionDetails(submissionId: string | null) {
  const [state, setState] = useState<SubmissionDetailsState>({
    isLoading: false,
    submission: null,
    results: [],
    error: null,
  });

  const loadDetails = async () => {
    if (!submissionId) {
      return;
    }

    setState({
      isLoading: true,
      submission: null,
      results: [],
      error: null,
    });

    try {
      const data = await getSubmissionDetails(submissionId);

      if (data) {
        setState({
          isLoading: false,
          submission: data.submission,
          results: data.results,
          error: null,
        });
      } else {
        setState({
          isLoading: false,
          submission: null,
          results: [],
          error: "Submission not found",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load submission details";
      setState({
        isLoading: false,
        submission: null,
        results: [],
        error: errorMessage,
      });
    }
  };

  return {
    ...state,
    loadDetails,
  };
}
