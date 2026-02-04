import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Code2, Trophy, Users, BookOpen, TrendingUp, Target, Zap } from 'lucide-react';

interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  solved_count?: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  color: string;
  problemCount: number;
}

const learningPaths: LearningPath[] = [
  {
    id: 'arrays',
    title: 'Arrays & Hashing',
    description: 'Master array manipulations and hash table techniques',
    icon: Code2,
    category: 'arrays',
    color: 'from-blue-500 to-cyan-500',
    problemCount: 0
  },
  {
    id: 'strings',
    title: 'String Algorithms',
    description: 'Pattern matching, parsing, and string operations',
    icon: BookOpen,
    category: 'strings',
    color: 'from-purple-500 to-pink-500',
    problemCount: 0
  },
  {
    id: 'sorting',
    title: 'Sorting & Searching',
    description: 'Efficient sorting algorithms and binary search',
    icon: TrendingUp,
    category: 'sorting',
    color: 'from-green-500 to-emerald-500',
    problemCount: 0
  },
  {
    id: 'trees',
    title: 'Trees & Graphs',
    description: 'Traversals, graph algorithms, and tree structures',
    icon: Target,
    category: 'trees',
    color: 'from-orange-500 to-red-500',
    problemCount: 0
  },
  {
    id: 'dynamic',
    title: 'Dynamic Programming',
    description: 'Optimization problems and memoization techniques',
    icon: Zap,
    category: 'dynamic-programming',
    color: 'from-yellow-500 to-orange-500',
    problemCount: 0
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    description: 'Backtracking, greedy algorithms, and more',
    icon: Trophy,
    category: 'advanced',
    color: 'from-indigo-500 to-purple-500',
    problemCount: 0
  }
];

const LearningPage: React.FC = () => {
  const [paths, setPaths] = useState<LearningPath[]>(learningPaths);
  const [recentProblems, setRecentProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch problems to count by category
      // Note: solved_count column will be available after migration 20260124040000_fix_critical_bugs.sql
      const { data: problems, error } = await supabase
        .from('problems')
        .select('id, title, difficulty, category')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching problems:', error);
        setLoading(false);
        return;
      }

      if (problems) {
        // Count problems per category
        const categoryCounts: Record<string, number> = {};
        problems.forEach(p => {
          const cat = p.category?.toLowerCase() || 'other';
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });

        // Update problem counts
        const updatedPaths = paths.map(path => ({
          ...path,
          problemCount: categoryCounts[path.category] || 0
        }));
        setPaths(updatedPaths);

        // Get 6 recent problems
        setRecentProblems(problems.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Master Data Structures & Algorithms
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Choose your learning path, solve problems, and compete in contests
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link to="/problems">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  <Code2 className="w-4 h-4 mr-2" />
                  Browse All Problems
                </Button>
              </Link>
              <Link to="/contests">
                <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10">
                  <Trophy className="w-4 h-4 mr-2" />
                  Join Contests
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paths Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Learning Paths</h2>
          <p className="text-slate-400">Start with any topic and progress at your own pace</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <Link key={path.id} to={`/problems?category=${path.category}`}>
                <Card className="group relative overflow-hidden bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${path.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {path.problemCount} problems
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {path.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {path.description}
                      </p>
                    </div>

                    <div className="flex items-center text-cyan-400 text-sm font-medium">
                      Start Learning
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Problems */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Recent Problems</h2>
          <p className="text-slate-400">Try these newly added challenges</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 p-6 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-3/4 mb-4" />
                <div className="h-3 bg-slate-700 rounded w-1/2" />
              </Card>
            ))
          ) : recentProblems.length > 0 ? (
            recentProblems.map((problem) => (
              <Link key={problem.id} to={`/problem/${problem.id}`}>
                <Card className="group bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-white font-medium group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {problem.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-400">
                        {problem.category}
                      </Badge>
                      {problem.solved_count !== undefined && problem.solved_count > 0 && (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {problem.solved_count} solved
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400">No problems available yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/contests">
            <Card className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-500 transition-all cursor-pointer p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Compete in Contests</h3>
                  <p className="text-slate-400 text-sm">Test your skills against others</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/rooms">
            <Card className="group bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30 hover:border-cyan-500 transition-all cursor-pointer p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-cyan-500/20">
                  <Users className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Join Study Rooms</h3>
                  <p className="text-slate-400 text-sm">Learn together with peers</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/code-runner">
            <Card className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 hover:border-green-500 transition-all cursor-pointer p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/20">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Code Runner</h3>
                  <p className="text-slate-400 text-sm">Test code in 15+ languages</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
