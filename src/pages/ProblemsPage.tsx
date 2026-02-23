/**
 * ProblemsPage - Optimized LeetCode-style problems listing
 * Features: Infinite scroll, smart caching, debounced search, hover prefetch
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CheckCircle2, Circle, Crown, Lock, ListFilter, ChevronDown, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { getProblems, searchProblems } from "@/services/testcaseService";
import type { Problem } from "@/services/testcaseService";
import {
  cacheProblems,
  getCachedProblems,
  cacheSearchResults,
  getCachedSearchResults,
} from "@/services/problemsCache";
import { useDebounce } from "@/hooks/useDebounce";
import { usePrefetch } from "@/hooks/usePrefetch";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PROBLEMS_PER_PAGE = 100;
const SEARCH_DEBOUNCE = 500; // 500ms
const SCROLL_THROTTLE = 1000; // 1 second between scroll triggers

export default function ProblemsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);
  
  const observerTarget = useRef<HTMLDivElement>(null);
  const lastScrollTrigger = useRef<number>(0);
  const { prefetchProblem, cancelPrefetch } = usePrefetch();
  
  const debouncedSearch = useDebounce(searchQuery, SEARCH_DEBOUNCE);

  // Popular topics for filtering
  const popularTopics = [
    "array", "string", "hash-table", "dynamic-programming", "math",
    "sorting", "greedy", "depth-first-search", "breadth-first-search",
    "binary-search", "tree", "two-pointers", "backtracking", "stack",
    "heap", "graph", "linked-list", "binary-tree", "sliding-window"
  ];

  /**
   * Load initial problems (with cache check)
   */
  const loadInitialProblems = async () => {
    setIsLoading(true);
    setIsSearchMode(false);
    setPage(1);
    setProblems([]);

    try {
      const difficulty = difficultyFilter !== "all" ? difficultyFilter : undefined;
      const status = statusFilter !== "all" ? statusFilter : undefined;
      const topics = selectedTopics.length > 0 ? selectedTopics : undefined;

      // Check cache first (cache key based on all filters)
      const cacheKey = `${difficulty || 'all'}_${status || 'all'}_${topics?.join(',') || 'all'}`;
      const cached = await getCachedProblems(1, cacheKey);
      if (cached) {
        setProblems(cached.problems);
        setTotalCount(cached.totalCount);
        setHasMore(cached.problems.length < cached.totalCount);
        setIsLoading(false);
        return;
      }

      // Fetch from API with retry logic
      const { problems: data, total } = await fetchWithRetry(() =>
        getProblems(1, PROBLEMS_PER_PAGE, { 
          difficulty, 
          status, 
          topics, 
          userId: user?.id 
        })
      );

      // Cache the results
      await cacheProblems(1, data, total, cacheKey);

      setProblems(data);
      setTotalCount(total);
      setHasMore(data.length < total);
    } catch (error) {
      console.error("Error loading problems:", error);
      toast.error("Failed to load problems. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load more problems (infinite scroll)
   */
  const loadMoreProblems = useCallback(async () => {
    if (isLoadingMore || !hasMore || isSearchMode) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const difficulty = difficultyFilter !== "all" ? difficultyFilter : undefined;
      const status = statusFilter !== "all" ? statusFilter : undefined;
      const topics = selectedTopics.length > 0 ? selectedTopics : undefined;
      const cacheKey = `${difficulty || 'all'}_${status || 'all'}_${topics?.join(',') || 'all'}`;

      // Check cache first
      const cached = await getCachedProblems(nextPage, cacheKey);
      if (cached) {
        setProblems((prev) => {
          const newProblems = [...prev, ...cached.problems];
          setHasMore(newProblems.length < cached.totalCount);
          return newProblems;
        });
        setPage(nextPage);
        setIsLoadingMore(false);
        return;
      }

      // Fetch from API with retry logic
      const { problems: data, total } = await fetchWithRetry(() =>
        getProblems(nextPage, PROBLEMS_PER_PAGE, { 
          difficulty, 
          status, 
          topics, 
          userId: user?.id 
        })
      );

      // Cache the results
      await cacheProblems(nextPage, data, total, cacheKey);

      setProblems((prev) => {
        const newProblems = [...prev, ...data];
        setHasMore(newProblems.length < total);
        return newProblems;
      });
      setPage(nextPage);
      setTotalCount(total);
    } catch (error) {
      console.error("Error loading more problems:", error);
      toast.error("Failed to load more problems.");
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, isSearchMode, page, difficultyFilter, statusFilter, selectedTopics, user?.id]);

  /**
   * Handle search
   */
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setIsSearchMode(true);
    setProblems([]);

    try {
      // Check cache first
      const cached = await getCachedSearchResults(query, 100);
      if (cached) {
        setProblems(cached.problems);
        setTotalCount(cached.totalCount);
        setIsLoading(false);
        return;
      }

      // Search from API with retry logic
      const { problems: data, total } = await fetchWithRetry(() =>
        searchProblems(query, 100)
      );

      // Cache the results
      await cacheSearchResults(query, data, total, 100);

      setProblems(data);
      setTotalCount(total);
    } catch (error) {
      console.error("Error searching problems:", error);
      toast.error("Failed to search problems.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear search
   */
  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchMode(false);
    loadInitialProblems();
    window.scrollTo(0, 0);
  };

  /**
   * Handle row hover for prefetch
   */
  const handleRowHover = useCallback((slug: string) => {
    prefetchProblem(slug);
  }, [prefetchProblem]);

  /**
   * Handle row hover end
   */
  const handleRowHoverEnd = useCallback((slug: string) => {
    cancelPrefetch(slug);
  }, [cancelPrefetch]);

  // Initial load and filter changes
  useEffect(() => {
    loadInitialProblems();
  }, [difficultyFilter, statusFilter, selectedTopics]);

  // Handle search
  useEffect(() => {
    if (debouncedSearch.trim()) {
      handleSearch(debouncedSearch);
    } else if (isSearchMode) {
      // Clear search and return to paginated view
      setIsSearchMode(false);
      loadInitialProblems();
    }
  }, [debouncedSearch]);

  // Infinite scroll observer
  useEffect(() => {
    if (!observerTarget.current || isSearchMode || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          // Throttle scroll triggers
          const now = Date.now();
          if (now - lastScrollTrigger.current >= SCROLL_THROTTLE) {
            lastScrollTrigger.current = now;
            if (hasMore && !isLoadingMore) {
              loadMoreProblems();
            }
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "200px", // Trigger earlier for smoother experience
      }
    );

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoadingMore, isSearchMode, isLoading, loadMoreProblems]);

  /**
   * Handle row click
   */
  const handleRowClick = (slug: string) => {
    navigate(`/problem/${slug}`);
  };

  /**
   * Get difficulty badge class
   */
  const getDifficultyBadgeClass = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 border-0";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 border-0";
      case "hard":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 border-0";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-0";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Problems
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isSearchMode
              ? `${problems.length} search results`
              : `${problems.length} of ${totalCount} problems`}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters and Search */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {/* Difficulty Filter */}
            {!isSearchMode && (
              <>
                <div className="flex items-center gap-2">
                  <ListFilter className="h-4 w-4 text-gray-500" />
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger className="w-[140px] h-9 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulty</SelectItem>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px] h-9 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="not_attempted">Todo</SelectItem>
                    <SelectItem value="solved">Solved</SelectItem>
                    <SelectItem value="attempted">Attempted</SelectItem>
                  </SelectContent>
                </Select>

                {/* Lists - Disabled for now */}
                <Select value="all" onValueChange={() => {}} disabled>
                  <SelectTrigger className="w-[120px] h-9 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 opacity-50 cursor-not-allowed">
                    <SelectValue placeholder="Lists" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Lists</SelectItem>
                    <SelectItem value="favorites">Favorites</SelectItem>
                    <SelectItem value="custom">Custom Lists</SelectItem>
                  </SelectContent>
                </Select>

                {/* Tags/Topics Filter */}
                <Popover open={isTagsOpen} onOpenChange={setIsTagsOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      Tags
                      {selectedTopics.length > 0 && (
                        <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                          {selectedTopics.length}
                        </Badge>
                      )}
                      <ChevronDown className="ml-2 h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4" align="start">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Filter by Topics</h4>
                        {selectedTopics.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedTopics([])}
                            className="h-6 px-2 text-xs"
                          >
                            Clear All
                          </Button>
                        )}
                      </div>
                      <div className="max-h-[300px] overflow-y-auto space-y-2">
                        {popularTopics.map((topic) => (
                          <div key={topic} className="flex items-center space-x-2">
                            <Checkbox
                              id={topic}
                              checked={selectedTopics.includes(topic)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedTopics([...selectedTopics, topic]);
                                } else {
                                  setSelectedTopics(selectedTopics.filter(t => t !== topic));
                                }
                              }}
                            />
                            <label
                              htmlFor={topic}
                              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer capitalize"
                            >
                              {topic.replace(/-/g, ' ')}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            )}

            {/* Search Mode Badge */}
            {isSearchMode && (
              <Badge
                variant="secondary"
                className="h-9 px-3 flex items-center gap-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0"
              >
                Search: "{debouncedSearch}"
                <button
                  onClick={clearSearch}
                  className="hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-gray-200 dark:border-gray-800">
                  <TableHead className="w-12 text-center font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </TableHead>
                  <TableHead className="font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </TableHead>
                  <TableHead className="w-24 text-center font-medium text-gray-700 dark:text-gray-300 hidden md:table-cell">
                    Acceptance
                  </TableHead>
                  <TableHead className="w-28 text-center font-medium text-gray-700 dark:text-gray-300">
                    Difficulty
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-gray-500">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                      Loading problems...
                    </TableCell>
                  </TableRow>
                ) : problems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-gray-500">
                      {isSearchMode
                        ? "No problems found for your search"
                        : "No problems found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  problems.map((problem) => (
                    <TableRow
                      key={problem.id}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 transition-colors"
                      onClick={() => handleRowClick(problem.slug)}
                      onMouseEnter={() => handleRowHover(problem.slug)}
                      onMouseLeave={() => handleRowHoverEnd(problem.slug)}
                    >
                      {/* Status */}
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Circle className="h-4 w-4 text-gray-300 dark:text-gray-700" />
                        </div>
                      </TableCell>

                      {/* Title */}
                      <TableCell>
                        <div className="flex items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                                {problem.id}.
                              </span>
                              <span className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400">
                                {problem.title}
                              </span>
                              {problem.is_premium && (
                                <Crown className="h-4 w-4 text-amber-500 flex-shrink-0" />
                              )}
                              {problem.is_premium_blocked && (
                                <Lock className="h-3 w-3 text-amber-500 flex-shrink-0" />
                              )}
                            </div>
                            {/* Tags */}
                            {problem.topics && problem.topics.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {problem.topics.slice(0, 5).map((topic, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 font-normal border-0"
                                  >
                                    {topic}
                                  </Badge>
                                ))}
                                {problem.topics.length > 5 && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-0"
                                  >
                                    +{problem.topics.length - 5}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Acceptance */}
                      <TableCell className="text-center text-gray-600 dark:text-gray-400 hidden md:table-cell">
                        {problem.acceptance_rate
                          ? `${problem.acceptance_rate.toFixed(1)}%`
                          : "N/A"}
                      </TableCell>

                      {/* Difficulty */}
                      <TableCell className="text-center">
                        <Badge
                          className={cn(
                            "font-medium px-3 py-1",
                            getDifficultyBadgeClass(problem.difficulty)
                          )}
                        >
                          {problem.difficulty}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Infinite Scroll Sentinel */}
          {!isSearchMode && hasMore && !isLoading && (
            <div ref={observerTarget} className="h-20 flex items-center justify-center">
              {isLoadingMore && (
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Loading more problems...</span>
                </div>
              )}
            </div>
          )}

          {/* End of List Message */}
          {!isSearchMode && !hasMore && !isLoading && problems.length > 0 && (
            <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              All {totalCount} problems loaded
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {!isLoading && problems.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {isSearchMode
              ? `Found ${problems.length} results`
              : `Showing ${problems.length} of ${totalCount} problems`}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Fetch with retry logic and exponential backoff
 */
async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchFn();
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on 4xx errors (except 429)
      if (error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      if (i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000;
        if (error.status === 429) {
          toast.info("Server busy, retrying...");
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}
