/**
 * usePrefetch Hook - Prefetch problem details on hover with debouncing
 * Implements conservative prefetching to avoid network congestion
 */

import { useCallback, useRef } from "react";
import { cacheProblemDetail, getCachedProblemDetail } from "@/services/problemsCache";

const HOVER_DEBOUNCE = 800; // Wait 800ms before prefetching
const MAX_CONCURRENT = 2; // Max 2 concurrent prefetch requests

interface PrefetchState {
  pending: Set<string>;
  inProgress: Set<string>;
  completed: Set<string>;
}

export function usePrefetch() {
  const state = useRef<PrefetchState>({
    pending: new Set(),
    inProgress: new Set(),
    completed: new Set(),
  });
  
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  /**
   * Execute prefetch for a slug
   */
  const executePrefetch = useCallback(async (slug: string) => {
    // Skip if already completed or in progress
    if (state.current.completed.has(slug) || state.current.inProgress.has(slug)) {
      return;
    }

    // Check if already cached
    const cached = await getCachedProblemDetail(slug);
    if (cached) {
      state.current.completed.add(slug);
      return;
    }

    // Wait if max concurrent reached
    if (state.current.inProgress.size >= MAX_CONCURRENT) {
      state.current.pending.add(slug);
      return;
    }

    // Mark as in progress
    state.current.inProgress.add(slug);
    state.current.pending.delete(slug);

    try {
      // Dynamic import to avoid module resolution issues on first load
      const testcaseService = await import("@/services/testcaseService");
      
      // Fetch problem details
      const problemData = await testcaseService.getProblemBySlug(slug);
      
      if (problemData) {
        // Cache the result
        await cacheProblemDetail(slug, problemData);
        state.current.completed.add(slug);
      }
    } catch (error) {
      console.warn(`Failed to prefetch problem ${slug}:`, error);
    } finally {
      state.current.inProgress.delete(slug);

      // Process next pending prefetch if any
      if (state.current.pending.size > 0) {
        const nextSlug = state.current.pending.values().next().value;
        if (nextSlug) {
          executePrefetch(nextSlug);
        }
      }
    }
  }, []);

  /**
   * Prefetch problem on hover
   */
  const prefetchProblem = useCallback((slug: string) => {
    // Cancel any existing timeout for this slug
    const existingTimeout = timeoutRefs.current.get(slug);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(() => {
      executePrefetch(slug);
      timeoutRefs.current.delete(slug);
    }, HOVER_DEBOUNCE);

    timeoutRefs.current.set(slug, timeout);
  }, [executePrefetch]);

  /**
   * Cancel prefetch (when user scrolls away or clicks different problem)
   */
  const cancelPrefetch = useCallback((slug: string) => {
    const timeout = timeoutRefs.current.get(slug);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(slug);
    }
    state.current.pending.delete(slug);
  }, []);

  /**
   * Cancel all pending prefetches
   */
  const cancelAllPrefetches = useCallback(() => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current.clear();
    state.current.pending.clear();
  }, []);

  return {
    prefetchProblem,
    cancelPrefetch,
    cancelAllPrefetches,
  };
}
