import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface DatabaseHookResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UserProgress {
  id: string;
  user_id: string;
  algorithm_id: string;
  completed: boolean;
  completion_time?: number;
  attempts: number;
  best_score?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface UserBookmark {
  id: string;
  user_id: string;
  algorithm_id: string;
  type: 'bookmark' | 'favorite';
  notes?: string;
  created_at: string;
}

interface UserStats {
  id: string;
  user_id: string;
  level: number;
  experience: number;
  total_points: number;
  current_streak: number;
  total_study_time: number;
  algorithms_completed: number;
  challenges_completed: number;
  rank: number;
  created_at: string;
  updated_at: string;
}

export const useUserProgress = (): DatabaseHookResult<UserProgress[]> => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [data, setData] = useState<UserProgress[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: progressData, error: fetchError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (fetchError) throw fetchError;

      setData(progressData || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch progress';
      setError(errorMessage);
      toast({
        title: "Data Loading Error",
        description: "Failed to load your progress data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

export const useUserBookmarks = (): DatabaseHookResult<UserBookmark[]> => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [data, setData] = useState<UserBookmark[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: bookmarkData, error: fetchError } = await supabase
        .from('user_bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setData(bookmarkData || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch bookmarks';
      setError(errorMessage);
      toast({
        title: "Data Loading Error", 
        description: "Failed to load your bookmarks",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

export const useUserStats = (): DatabaseHookResult<UserStats> => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [data, setData] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user) {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data: statsData, error: fetchError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError) throw fetchError;

      setData(statsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stats';
      setError(errorMessage);
      toast({
        title: "Data Loading Error",
        description: "Failed to load your statistics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

// Database mutation functions
export const updateUserProgress = async (
  algorithmId: string, 
  completed: boolean, 
  completionTime?: number,
  score?: number
) => {
  const { user } = useAuth();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      algorithm_id: algorithmId,
      completed,
      completion_time: completionTime,
      best_score: score,
      attempts: 1,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,algorithm_id',
      ignoreDuplicates: false
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const addUserBookmark = async (
  algorithmId: string,
  type: 'bookmark' | 'favorite',
  notes?: string
) => {
  const { user } = useAuth();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('user_bookmarks')
    .upsert({
      user_id: user.id,
      algorithm_id: algorithmId,
      type,
      notes,
      created_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,algorithm_id,type',
      ignoreDuplicates: false
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeUserBookmark = async (bookmarkId: string) => {
  const { error } = await supabase
    .from('user_bookmarks')
    .delete()
    .eq('id', bookmarkId);

  if (error) throw error;
};

export const updateUserStats = async (updates: Partial<UserStats>) => {
  const { user } = useAuth();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('user_stats')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
