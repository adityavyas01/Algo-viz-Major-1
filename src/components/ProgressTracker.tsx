import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, Clock, Target, BookOpen, Star, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ProgressStats {
  totalModules: number;
  completedModules: number;
  currentStreak: number;
  totalStudyTime: number;
  level: number;
  experience: number;
  totalPoints: number;
  weeklyGoal: number;
  weeklyCompleted: number;
}

interface CategoryProgress {
  category: string;
  completed: number;
  total: number;
  percentage: number;
}

export const ProgressTracker: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [categoryProgress, setCategoryProgress] = useState<CategoryProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgressData();
    }
  }, [user, fetchProgressData]);

  const fetchProgressData = useCallback(async () => {
    try {
      // Fetch user stats
      const { data: userStats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      // Fetch learning path progress
      const { data: learningPath } = await supabase
        .from('learning_paths')
        .select(`
          completion_percentage,
          learning_path_modules (
            is_completed,
            dsa_topics (
              category
            )
          )
        `)
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .single();

      if (userStats && learningPath) {
        const modules = learningPath.learning_path_modules;
        const completedModules = modules.filter(m => m.is_completed).length;
        
        setStats({
          totalModules: modules.length,
          completedModules,
          currentStreak: userStats.current_streak,
          totalStudyTime: userStats.total_study_time,
          level: userStats.level,
          experience: userStats.experience,
          totalPoints: userStats.total_points,
          weeklyGoal: 5, // Default weekly goal
          weeklyCompleted: Math.min(userStats.current_streak, 7)
        });

        // Calculate category progress
        const categoryMap = new Map<string, { completed: number; total: number }>();
        
        modules.forEach(module => {
          const category = module.dsa_topics.category;
          if (!categoryMap.has(category)) {
            categoryMap.set(category, { completed: 0, total: 0 });
          }
          const current = categoryMap.get(category)!;
          current.total++;
          if (module.is_completed) {
            current.completed++;
          }
        });

        const categoryData: CategoryProgress[] = Array.from(categoryMap.entries()).map(
          ([category, data]) => ({
            category,
            completed: data.completed,
            total: data.total,
            percentage: data.total > 0 ? (data.completed / data.total) * 100 : 0
          })
        );

        setCategoryProgress(categoryData);
      }
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const getNextLevelXP = (level: number) => {
    return level * 1000; // Simple progression: level * 1000 XP
  };

  const getLevelProgress = () => {
    if (!stats) return 0;
    const currentLevelXP = (stats.level - 1) * 1000;
    const nextLevelXP = getNextLevelXP(stats.level);
    const progressXP = stats.experience - currentLevelXP;
    const neededXP = nextLevelXP - currentLevelXP;
    return (progressXP / neededXP) * 100;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">No Progress Data Found</h3>
          <p className="text-white/70">Start learning to track your progress!</p>
        </CardContent>
      </Card>
    );
  }

  const completionRate = stats.totalModules > 0 ? (stats.completedModules / stats.totalModules) * 100 : 0;
  const weeklyProgress = stats.weeklyGoal > 0 ? (stats.weeklyCompleted / stats.weeklyGoal) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Progress Tracker</h2>
        <p className="text-white/70">Monitor your learning journey and achievements</p>
      </div>

      {/* Level and XP Card */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Level {stats.level}</h3>
                <p className="text-white/70 text-sm">{stats.experience} XP</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/70 text-sm">Next Level</div>
              <div className="text-white font-bold">{getNextLevelXP(stats.level)} XP</div>
            </div>
          </div>
          <Progress value={getLevelProgress()} className="w-full h-2" />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Modules Completed</p>
                <p className="text-white font-bold text-2xl">{stats.completedModules}</p>
                <p className="text-white/50 text-xs">of {stats.totalModules}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <Progress value={completionRate} className="w-full mt-3" />
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Current Streak</p>
                <p className="text-white font-bold text-2xl">{stats.currentStreak}</p>
                <p className="text-white/50 text-xs">days</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Study Time</p>
                <p className="text-white font-bold text-2xl">{stats.totalStudyTime}</p>
                <p className="text-white/50 text-xs">hours</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Weekly Goal</p>
                <p className="text-white font-bold text-2xl">{stats.weeklyCompleted}</p>
                <p className="text-white/50 text-xs">of {stats.weeklyGoal}</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
            <Progress value={weeklyProgress} className="w-full mt-3" />
          </CardContent>
        </Card>
      </div>

      {/* Category Progress */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Progress by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryProgress.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{category.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/70 text-sm">
                      {category.completed}/{category.total}
                    </span>
                    <Badge 
                      className={`text-xs ${
                        category.percentage === 100 
                          ? 'bg-green-500' 
                          : category.percentage >= 50 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      } text-white`}
                    >
                      {Math.round(category.percentage)}%
                    </Badge>
                  </div>
                </div>
                <Progress value={category.percentage} className="w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Badges */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {stats.currentStreak >= 7 && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                Week Warrior
              </Badge>
            )}
            {stats.completedModules >= 5 && (
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-2">
                <BookOpen className="w-4 h-4 mr-2" />
                Fast Learner
              </Badge>
            )}
            {stats.level >= 3 && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2">
                <Star className="w-4 h-4 mr-2" />
                Rising Star
              </Badge>
            )}
            {completionRate >= 50 && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2">
                <Target className="w-4 h-4 mr-2" />
                Halfway Hero
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};