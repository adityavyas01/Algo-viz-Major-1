/**
 * Community Hooks
 * React hooks for social features
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import * as communityService from '@/services/communityService';
import type {
  UserProfile,
  SharedVisualization,
  StudyGroup,
  Activity,
  GroupDiscussion
} from '@/services/communityService';

// ============================================
// User Profile Hook
// ============================================

export function useUserProfile(userId?: string) {
  const { user } = useAuth();
  const { toast } = useToast();
  const targetUserId = userId || user?.id;
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!targetUserId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getUserProfile(targetUserId);
      setProfile(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load profile';
      setError(errorMsg);
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  }, [targetUserId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to update your profile',
        variant: 'destructive'
      });
      return;
    }

    try {
      await communityService.updateUserProfile(user.id, updates);
      await fetchProfile();
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully'
      });
    } catch (err) {
      toast({
        title: 'Update failed',
        description: err instanceof Error ? err.message : 'Failed to update profile',
        variant: 'destructive'
      });
      throw err;
    }
  }, [user, fetchProfile, toast]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile
  };
}

// ============================================
// Shared Visualizations Hook
// ============================================

export function useSharedVisualizations(filters?: {
  algorithm?: string;
  sort?: 'recent' | 'popular' | 'most_liked';
  userId?: string;
}) {
  const { toast } = useToast();
  const [visualizations, setVisualizations] = useState<SharedVisualization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVisualizations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getSharedVisualizations(filters);
      setVisualizations(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load visualizations';
      setError(errorMsg);
      console.error('Error loading visualizations:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchVisualizations();
  }, [fetchVisualizations]);

  const shareVisualization = useCallback(async (data: {
    title: string;
    description?: string;
    code: string;
    language: string;
    algorithm_type?: string;
    algorithm_id?: string;
  }) => {
    try {
      const vizId = await communityService.shareVisualization(data);
      await fetchVisualizations();
      toast({
        title: 'Visualization shared',
        description: 'Your code has been shared with the community'
      });
      return vizId;
    } catch (err) {
      toast({
        title: 'Share failed',
        description: err instanceof Error ? err.message : 'Failed to share visualization',
        variant: 'destructive'
      });
      throw err;
    }
  }, [fetchVisualizations, toast]);

  const likeVisualization = useCallback(async (vizId: string) => {
    try {
      await communityService.likeVisualization(vizId);
      // Optimistic update
      setVisualizations(prev =>
        prev.map(viz =>
          viz.id === vizId
            ? { ...viz, is_liked: true, likes_count: viz.likes_count + 1 }
            : viz
        )
      );
    } catch (err) {
      toast({
        title: 'Like failed',
        description: err instanceof Error ? err.message : 'Failed to like visualization',
        variant: 'destructive'
      });
      // Revert on error
      await fetchVisualizations();
    }
  }, [fetchVisualizations, toast]);

  const unlikeVisualization = useCallback(async (vizId: string) => {
    try {
      await communityService.unlikeVisualization(vizId);
      // Optimistic update
      setVisualizations(prev =>
        prev.map(viz =>
          viz.id === vizId
            ? { ...viz, is_liked: false, likes_count: Math.max(0, viz.likes_count - 1) }
            : viz
        )
      );
    } catch (err) {
      toast({
        title: 'Unlike failed',
        description: err instanceof Error ? err.message : 'Failed to unlike visualization',
        variant: 'destructive'
      });
      // Revert on error
      await fetchVisualizations();
    }
  }, [fetchVisualizations, toast]);

  return {
    visualizations,
    loading,
    error,
    shareVisualization,
    likeVisualization,
    unlikeVisualization,
    refetch: fetchVisualizations
  };
}

// ============================================
// Study Groups Hook
// ============================================

export function useStudyGroups(filters?: {
  topic?: string;
  privacy?: 'public' | 'private';
  userId?: string;
}) {
  const { toast } = useToast();
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getStudyGroups(filters);
      setGroups(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load groups';
      setError(errorMsg);
      console.error('Error loading groups:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const createGroup = useCallback(async (data: {
    name: string;
    description?: string;
    topic?: string;
    privacy?: 'public' | 'private';
    max_members?: number;
  }) => {
    try {
      const groupId = await communityService.createStudyGroup(data);
      await fetchGroups();
      toast({
        title: 'Group created',
        description: 'Your study group has been created successfully'
      });
      return groupId;
    } catch (err) {
      toast({
        title: 'Creation failed',
        description: err instanceof Error ? err.message : 'Failed to create group',
        variant: 'destructive'
      });
      throw err;
    }
  }, [fetchGroups, toast]);

  const joinGroup = useCallback(async (groupId: string) => {
    try {
      await communityService.joinGroup(groupId);
      // Optimistic update
      setGroups(prev =>
        prev.map(group =>
          group.id === groupId
            ? { ...group, is_member: true, member_count: group.member_count + 1 }
            : group
        )
      );
      toast({
        title: 'Joined group',
        description: 'You have successfully joined the group'
      });
    } catch (err) {
      toast({
        title: 'Join failed',
        description: err instanceof Error ? err.message : 'Failed to join group',
        variant: 'destructive'
      });
      // Revert on error
      await fetchGroups();
    }
  }, [fetchGroups, toast]);

  const leaveGroup = useCallback(async (groupId: string) => {
    try {
      await communityService.leaveGroup(groupId);
      // Optimistic update
      setGroups(prev =>
        prev.map(group =>
          group.id === groupId
            ? { ...group, is_member: false, member_count: Math.max(0, group.member_count - 1) }
            : group
        )
      );
      toast({
        title: 'Left group',
        description: 'You have left the group'
      });
    } catch (err) {
      toast({
        title: 'Leave failed',
        description: err instanceof Error ? err.message : 'Failed to leave group',
        variant: 'destructive'
      });
      // Revert on error
      await fetchGroups();
    }
  }, [fetchGroups, toast]);

  return {
    groups,
    loading,
    error,
    createGroup,
    joinGroup,
    leaveGroup,
    refetch: fetchGroups
  };
}

// ============================================
// Group Discussions Hook
// ============================================

export function useGroupDiscussions(groupId: string) {
  const { toast } = useToast();
  const [discussions, setDiscussions] = useState<GroupDiscussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscussions = useCallback(async () => {
    if (!groupId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getGroupDiscussions(groupId);
      setDiscussions(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load discussions';
      setError(errorMsg);
      console.error('Error loading discussions:', err);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  const postToGroup = useCallback(async (data: {
    title?: string;
    content: string;
  }) => {
    try {
      await communityService.postToGroup(groupId, data);
      await fetchDiscussions();
      toast({
        title: 'Posted',
        description: 'Your post has been added to the group'
      });
    } catch (err) {
      toast({
        title: 'Post failed',
        description: err instanceof Error ? err.message : 'Failed to post',
        variant: 'destructive'
      });
      throw err;
    }
  }, [groupId, fetchDiscussions, toast]);

  return {
    discussions,
    loading,
    error,
    postToGroup,
    refetch: fetchDiscussions
  };
}

// ============================================
// Activity Feed Hook
// ============================================

export function useActivityFeed(userId?: string, limit: number = 50) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getActivityFeed(userId, limit);
      setActivities(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load activity feed';
      setError(errorMsg);
      console.error('Error loading activity feed:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, limit]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchActivities, 30000);
    return () => clearInterval(interval);
  }, [fetchActivities]);

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities
  };
}

// ============================================
// User Connections Hook
// ============================================

export function useConnections(userId?: string) {
  const { toast } = useToast();
  const [connections, setConnections] = useState<UserProfile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConnections = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [connectionsData, pendingData] = await Promise.all([
        communityService.getUserConnections(userId),
        !userId ? communityService.getPendingConnectionRequests() : Promise.resolve([])
      ]);
      setConnections(connectionsData);
      setPendingRequests(pendingData);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load connections';
      setError(errorMsg);
      console.error('Error loading connections:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  const sendRequest = useCallback(async (targetUserId: string) => {
    try {
      await communityService.sendConnectionRequest(targetUserId);
      toast({
        title: 'Request sent',
        description: 'Connection request sent successfully'
      });
    } catch (err) {
      toast({
        title: 'Request failed',
        description: err instanceof Error ? err.message : 'Failed to send request',
        variant: 'destructive'
      });
      throw err;
    }
  }, [toast]);

  const acceptRequest = useCallback(async (connectionId: string) => {
    try {
      await communityService.acceptConnection(connectionId);
      await fetchConnections();
      toast({
        title: 'Request accepted',
        description: 'You are now connected'
      });
    } catch (err) {
      toast({
        title: 'Accept failed',
        description: err instanceof Error ? err.message : 'Failed to accept request',
        variant: 'destructive'
      });
      throw err;
    }
  }, [fetchConnections, toast]);

  const rejectRequest = useCallback(async (connectionId: string) => {
    try {
      await communityService.rejectConnection(connectionId);
      await fetchConnections();
      toast({
        title: 'Request rejected',
        description: 'Connection request rejected'
      });
    } catch (err) {
      toast({
        title: 'Reject failed',
        description: err instanceof Error ? err.message : 'Failed to reject request',
        variant: 'destructive'
      });
      throw err;
    }
  }, [fetchConnections, toast]);

  return {
    connections,
    pendingRequests,
    loading,
    error,
    sendRequest,
    acceptRequest,
    rejectRequest,
    refetch: fetchConnections
  };
}
