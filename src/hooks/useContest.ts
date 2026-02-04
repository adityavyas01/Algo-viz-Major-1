/**
 * useContest Hook
 * React hooks for managing contest state and operations
 */

import { useState, useEffect } from "react";
import {
  getContests,
  getContestById,
  getContestProblems,
  registerForContest,
  isUserRegistered,
  getContestLeaderboard,
  getContestAnnouncements,
  subscribeToLeaderboard,
  subscribeToAnnouncements,
  type Contest,
  type ContestProblem,
  type ContestParticipant,
  type ContestAnnouncement,
} from "@/services/contestService";

export function useContests(filters?: { status?: Contest["status"]; type?: Contest["type"] }) {
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getContests(filters);
      setContests(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load contests";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContests();
  }, [filters?.status, filters?.type]);

  return {
    contests,
    isLoading,
    error,
    reload: loadContests,
  };
}

export function useContest(contestId: string) {
  const [contest, setContest] = useState<Contest | null>(null);
  const [problems, setProblems] = useState<ContestProblem[]>([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContest = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [contestData, problemsData, registered] = await Promise.all([
        getContestById(contestId),
        getContestProblems(contestId),
        isUserRegistered(contestId),
      ]);

      setContest(contestData);
      setProblems(problemsData);
      setIsRegistered(registered);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load contest";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async () => {
    try {
      await registerForContest(contestId);
      setIsRegistered(true);
      await loadContest();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to register";
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    if (contestId) {
      loadContest();
    }
  }, [contestId]);

  return {
    contest,
    problems,
    isRegistered,
    isLoading,
    error,
    register,
    reload: loadContest,
  };
}

export function useContestLeaderboard(contestId: string, autoRefresh: boolean = true) {
  const [leaderboard, setLeaderboard] = useState<ContestParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLeaderboard = async () => {
    try {
      const data = await getContestLeaderboard(contestId);
      setLeaderboard(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load leaderboard";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!contestId) return;

    loadLeaderboard();

    if (autoRefresh) {
      // Set up real-time subscription
      const subscription = subscribeToLeaderboard(contestId, () => {
        loadLeaderboard();
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [contestId, autoRefresh]);

  return {
    leaderboard,
    isLoading,
    error,
    reload: loadLeaderboard,
  };
}

export function useContestAnnouncements(contestId: string) {
  const [announcements, setAnnouncements] = useState<ContestAnnouncement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncements = async () => {
    try {
      const data = await getContestAnnouncements(contestId);
      setAnnouncements(data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load announcements";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!contestId) return;

    loadAnnouncements();

    // Set up real-time subscription
    const subscription = subscribeToAnnouncements(contestId, () => {
      loadAnnouncements();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [contestId]);

  return {
    announcements,
    isLoading,
    error,
    reload: loadAnnouncements,
  };
}

export function useContestTimer(contest: Contest | null) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [timeStatus, setTimeStatus] = useState<"not-started" | "active" | "finished">("not-started");

  useEffect(() => {
    if (!contest) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const startTime = new Date(contest.start_time).getTime();
      const endTime = new Date(contest.end_time).getTime();

      if (now < startTime) {
        setTimeStatus("not-started");
        setTimeRemaining(startTime - now);
      } else if (now >= startTime && now <= endTime) {
        setTimeStatus("active");
        setTimeRemaining(endTime - now);
      } else {
        setTimeStatus("finished");
        setTimeRemaining(0);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  const formatTime = (ms: number): string => {
    if (ms <= 0) return "00:00:00";

    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return {
    timeRemaining,
    timeStatus,
    formattedTime: formatTime(timeRemaining),
  };
}
