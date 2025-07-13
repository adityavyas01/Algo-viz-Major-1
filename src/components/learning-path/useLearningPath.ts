import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LearningModule {
  id: string;
  topic_id: string;
  module_order: number;
  estimated_hours: number;
  is_unlocked: boolean;
  is_completed: boolean;
  topic: {
    name: string;
    description: string;
    difficulty_level: number;
    category: string;
  };
}

interface LearningPathData {
  id: string;
  name: string;
  description: string;
  completion_percentage: number;
  estimated_weeks: number;
  modules: LearningModule[];
}

export const useLearningPath = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [learningPath, setLearningPath] = useState<LearningPathData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLearningPath();
    }
  }, [user]);

  const fetchLearningPath = async () => {
    try {
      const { data: paths, error } = await supabase
        .from('learning_paths')
        .select(`
          *,
          learning_path_modules (
            *,
            dsa_topics (
              name,
              description,
              difficulty_level,
              category
            )
          )
        `)
        .eq('user_id', user?.id)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      if (paths) {
        const pathData: LearningPathData = {
          ...paths,
          modules: paths.learning_path_modules
            .sort((a, b) => a.module_order - b.module_order)
            .map(module => ({
              ...module,
              topic: module.dsa_topics
            }))
        };
        setLearningPath(pathData);
      }
    } catch (error) {
      console.error('Error fetching learning path:', error);
    } finally {
      setLoading(false);
    }
  };

  const startLearning = (moduleId: string, topicName: string) => {
    toast({
      title: "Starting Learning Session",
      description: `Let's learn about ${topicName}!`,
    });
    // TODO: Navigate to actual learning content
  };

  const completeModule = async (moduleId: string) => {
    try {
      const { error } = await supabase
        .from('learning_path_modules')
        .update({ is_completed: true })
        .eq('id', moduleId);

      if (error) throw error;

      // Unlock next module
      const currentModule = learningPath?.modules.find(m => m.id === moduleId);
      if (currentModule) {
        const nextModuleOrder = currentModule.module_order + 1;
        const nextModule = learningPath?.modules.find(m => m.module_order === nextModuleOrder);
        
        if (nextModule) {
          await supabase
            .from('learning_path_modules')
            .update({ is_unlocked: true })
            .eq('id', nextModule.id);
        }
      }

      // Update completion percentage
      const completedCount = (learningPath?.modules.filter(m => m.is_completed).length || 0) + 1;
      const totalCount = learningPath?.modules.length || 1;
      const newPercentage = Math.round((completedCount / totalCount) * 100);

      await supabase
        .from('learning_paths')
        .update({ completion_percentage: newPercentage })
        .eq('id', learningPath?.id);

      toast({
        title: "Module Completed!",
        description: "Great job! Keep up the momentum.",
      });

      fetchLearningPath();
    } catch (error) {
      console.error('Error completing module:', error);
      toast({
        title: "Error",
        description: "Failed to complete module. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    learningPath,
    loading,
    startLearning,
    completeModule
  };
};