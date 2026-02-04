/**
 * ProblemsPage
 * Browse and filter coding problems
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Trophy, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getProblems, getUserProgress } from "@/services/testcaseService";
import type { Problem } from "@/services/testcaseService";

export default function ProblemsPage() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [progress, setProgress] = useState({
    total_attempted: 0,
    total_solved: 0,
    easy_solved: 0,
    medium_solved: 0,
    hard_solved: 0,
  });

  useEffect(() => {
    loadProblems();
    loadProgress();
  }, [difficultyFilter, categoryFilter]);

  const loadProblems = async () => {
    setIsLoading(true);
    try {
      const filters = {
        difficulty: difficultyFilter !== "all" ? difficultyFilter : undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
      };
      const { problems: data } = await getProblems(1, 50, filters);
      setProblems(data);
    } catch (error) {
      console.error("Error loading problems:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProgress = async () => {
    try {
      const data = await getUserProgress();
      setProgress(data);
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const categories = Array.from(new Set(problems.map((p) => p.category))).filter(Boolean);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
        <p className="text-muted-foreground">
          Solve coding challenges and improve your skills
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Solved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-3xl font-bold">{progress.total_solved}</span>
              <span className="text-muted-foreground">/ {progress.total_attempted}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Easy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-green-500" />
              <span className="text-3xl font-bold">{progress.easy_solved}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Medium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-yellow-500" />
              <span className="text-3xl font-bold">{progress.medium_solved}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-red-500" />
              <span className="text-3xl font-bold">{progress.hard_solved}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Problems List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading problems...</p>
        </div>
      ) : filteredProblems.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No problems found matching your criteria</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredProblems.map((problem) => (
            <Card
              key={problem.id}
              className="hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate(`/problem/${problem.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{problem.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {problem.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
                    {problem.difficulty.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    {problem.points} pts
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {problem.time_limit}ms
                  </span>
                  <Badge variant="outline">{problem.category}</Badge>
                  <span className="flex items-center gap-1 ml-auto">
                    <TrendingUp className="h-4 w-4" />
                    {problem.acceptance_rate.toFixed(1)}% acceptance
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
