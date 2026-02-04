/**
 * Community Service
 * Handles social features: profiles, groups, visualizations, activity feed, connections
 */

import { supabase } from '@/integrations/supabase/client';

// ============================================
// Types
// ============================================

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  skills: string[];
  interests: string[];
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
  location: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface SharedVisualization {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  code: string;
  language: string;
  algorithm_type: string | null;
  algorithm_id: string | null;
  is_public: boolean;
  likes_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  user_profile?: UserProfile;
  is_liked?: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  topic: string | null;
  privacy: 'public' | 'private';
  creator_id: string;
  member_count: number;
  max_members: number;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  creator_profile?: UserProfile;
  is_member?: boolean;
  user_role?: 'admin' | 'moderator' | 'member';
}

export interface GroupDiscussion {
  id: string;
  group_id: string;
  user_id: string;
  title: string | null;
  content: string;
  replies_count: number;
  likes_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  user_profile?: UserProfile;
}

export interface Activity {
  id: string;
  user_id: string;
  activity_type: string;
  metadata: Record<string, any>;
  created_at: string;
  user_display_name?: string;
  user_avatar_url?: string;
}

export interface UserConnection {
  id: string;
  user_id: string;
  connected_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
  connected_user_profile?: UserProfile;
}

// ============================================
// User Profiles
// ============================================

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles' as any)
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data as any;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<void> {
  const { error } = await supabase
    .from('user_profiles' as any)
    .update(updates)
    .eq('user_id', userId);

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }
}

export async function searchUsers(query: string): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('user_profiles' as any)
    .select('*')
    .eq('is_public', true)
    .or(`display_name.ilike.%${query}%,bio.ilike.%${query}%`)
    .limit(20);

  if (error) {
    console.error('Error searching users:', error);
    return [];
  }

  return data as any || [];
}

// ============================================
// Shared Visualizations
// ============================================

export async function getSharedVisualizations(filters?: {
  algorithm?: string;
  sort?: 'recent' | 'popular' | 'most_liked';
  userId?: string;
}): Promise<SharedVisualization[]> {
  let query = supabase
    .from('shared_visualizations' as any)
    .select(`
      *,
      user_profile:user_profiles!shared_visualizations_user_id_fkey(*)
    `)
    .eq('is_public', true);

  if (filters?.algorithm) {
    query = query.eq('algorithm_type', filters.algorithm);
  }

  if (filters?.userId) {
    query = query.eq('user_id', filters.userId);
  }

  // Sorting
  switch (filters?.sort) {
    case 'popular':
      query = query.order('views_count', { ascending: false });
      break;
    case 'most_liked':
      query = query.order('likes_count', { ascending: false });
      break;
    case 'recent':
    default:
      query = query.order('created_at', { ascending: false });
  }

  query = query.limit(50);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching visualizations:', error);
    return [];
  }

  // Check if current user liked each visualization
  const currentUser = (await supabase.auth.getUser()).data.user;
  if (currentUser && data) {
    const vizIds = data.map((v: any) => v.id);
    const { data: likes } = await supabase
      .from('visualization_likes' as any)
      .select('visualization_id')
      .eq('user_id', currentUser.id)
      .in('visualization_id', vizIds);

    const likedIds = new Set(likes?.map((l: any) => l.visualization_id) || []);
    
    return data.map((viz: any) => ({
      ...viz,
      is_liked: likedIds.has(viz.id)
    })) as any;
  }

  return data as any || [];
}

export async function shareVisualization(data: {
  title: string;
  description?: string;
  code: string;
  language: string;
  algorithm_type?: string;
  algorithm_id?: string;
  is_public?: boolean;
}): Promise<string> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not authenticated');

  const { data: viz, error } = await supabase
    .from('shared_visualizations' as any)
    .insert({
      user_id: user.id,
      ...data
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to share visualization: ${error.message}`);
  }

  // Create activity
  await createActivity('visualization_shared', {
    visualization_id: (viz as any).id,
    title: data.title,
    algorithm_type: data.algorithm_type
  });

  return String((viz as any).id);
}

export async function likeVisualization(vizId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('visualization_likes' as any)
    .insert({
      visualization_id: vizId,
      user_id: user.id
    });

  if (error && !error.message.includes('duplicate')) {
    throw new Error(`Failed to like visualization: ${error.message}`);
  }
}

export async function unlikeVisualization(vizId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('visualization_likes' as any)
    .delete()
    .eq('visualization_id', vizId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(`Failed to unlike visualization: ${error.message}`);
  }
}

export async function incrementVisualizationViews(vizId: string): Promise<void> {
  // Update views count directly using raw SQL
  const { data: viz } = await supabase
    .from('shared_visualizations' as any)
    .select('views_count')
    .eq('id', vizId)
    .single();
    
  if (viz) {
    await supabase
      .from('shared_visualizations' as any)
      .update({ views_count: ((viz as any).views_count || 0) + 1 })
      .eq('id', vizId);
  }
}

// ============================================
// Study Groups
// ============================================

export async function getStudyGroups(filters?: {
  topic?: string;
  privacy?: 'public' | 'private';
  userId?: string;
}): Promise<StudyGroup[]> {
  let query = supabase
    .from('community_groups' as any)
    .select(`
      *,
      creator_profile:user_profiles!community_groups_creator_id_fkey(*)
    `);

  if (filters?.topic) {
    query = query.eq('topic', filters.topic);
  }

  if (filters?.privacy) {
    query = query.eq('privacy', filters.privacy);
  }

  if (filters?.userId) {
    query = query.eq('creator_id', filters.userId);
  }

  query = query.order('created_at', { ascending: false }).limit(50);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching study groups:', error);
    return [];
  }

  // Check membership for current user
  const currentUser = (await supabase.auth.getUser()).data.user;
  if (currentUser && data) {
    const groupIds = data.map((g: any) => g.id);
    const { data: memberships } = await supabase
      .from('community_group_members' as any)
      .select('group_id, role')
      .eq('user_id', currentUser.id)
      .in('group_id', groupIds);

    const membershipMap = new Map(
      memberships?.map((m: any) => [m.group_id, m.role]) || []
    );

    return data.map((group: any) => ({
      ...group,
      is_member: membershipMap.has(group.id),
      user_role: membershipMap.get(group.id)
    })) as any;
  }

  return data as any || [];
}

export async function createStudyGroup(data: {
  name: string;
  description?: string;
  topic?: string;
  privacy?: 'public' | 'private';
  max_members?: number;
}): Promise<string> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not authenticated');

  const { data: group, error } = await supabase
    .from('community_groups' as any)
    .insert({
      creator_id: user.id,
      ...data
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create group: ${error.message}`);
  }

  // Auto-join creator as admin
  await supabase
    .from('community_group_members' as any)
    .insert({
      group_id: (group as any).id,
      user_id: user.id,
      role: 'admin'
    });

  // Create activity
  await createActivity('group_created', {
    group_id: (group as any).id,
    group_name: data.name
  });

  return String((group as any).id);
}

export async function joinGroup(groupId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('community_group_members' as any)
    .insert({
      group_id: groupId,
      user_id: user.id,
      role: 'member'
    });

  if (error && !error.message.includes('duplicate')) {
    throw new Error(`Failed to join group: ${error.message}`);
  }

  // Create activity
  await createActivity('group_joined', {
    group_id: groupId
  });
}

export async function leaveGroup(groupId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('community_group_members' as any)
    .delete()
    .eq('group_id', groupId)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(`Failed to leave group: ${error.message}`);
  }
}

// ============================================
// Group Discussions
// ============================================

export async function getGroupDiscussions(groupId: string): Promise<GroupDiscussion[]> {
  const { data, error } = await supabase
    .from('community_group_discussions' as any)
    .select(`
      *,
      user_profile:user_profiles!community_group_discussions_user_id_fkey(*)
    `)
    .eq('group_id', groupId)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching discussions:', error);
    return [];
  }

  return data as any || [];
}

export async function postToGroup(groupId: string, data: {
  title?: string;
  content: string;
}): Promise<string> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not authenticated');

  const { data: post, error } = await supabase
    .from('community_group_discussions' as any)
    .insert({
      group_id: groupId,
      user_id: user.id,
      ...data
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to post to group: ${error.message}`);
  }

  return String((post as any).id);
}

// ============================================
// Activity Feed
// ============================================

export async function getActivityFeed(
  userId?: string,
  limit: number = 50
): Promise<Activity[]> {
  const currentUser = (await supabase.auth.getUser()).data.user;
  
  if (!currentUser) {
    // Public feed - just recent activities
    const { data, error } = await supabase
      .from('activity_feed' as any)
      .select(`
        *,
        user_profile:user_profiles!activity_feed_user_id_fkey(display_name, avatar_url)
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching activity feed:', error);
      return [];
    }

    return data?.map((activity: any) => ({
      ...activity,
      user_display_name: activity.user_profile?.display_name,
      user_avatar_url: activity.user_profile?.avatar_url
    })) as any || [];
  }

  // Use RPC function to get user's personalized feed
  const { data, error } = await supabase.rpc('get_user_feed' as any, {
    p_user_id: userId || currentUser.id,
    p_limit: limit
  } as any);

  if (error) {
    console.error('Error fetching user feed:', error);
    return [];
  }

  return data as any || [];
}

export async function createActivity(
  activityType: string,
  metadata: Record<string, any> = {}
): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;

  await supabase
    .from('activity_feed' as any)
    .insert({
      user_id: user.id,
      activity_type: activityType,
      metadata
    });
}

// ============================================
// User Connections
// ============================================

export async function getUserConnections(userId?: string): Promise<UserProfile[]> {
  const user = (await supabase.auth.getUser()).data.user;
  const targetUserId = userId || user?.id;
  
  if (!targetUserId) return [];

  const { data, error } = await supabase
    .from('user_connections' as any)
    .select(`
      connected_user_id,
      connected_user_profile:user_profiles!user_connections_connected_user_id_fkey(*)
    `)
    .eq('user_id', targetUserId)
    .eq('status', 'accepted');

  if (error) {
    console.error('Error fetching connections:', error);
    return [];
  }

  return data?.map((c: any) => c.connected_user_profile).filter(Boolean) as any || [];
}

export async function getPendingConnectionRequests(): Promise<UserConnection[]> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return [];

  const { data, error } = await supabase
    .from('user_connections' as any)
    .select(`
      *,
      connected_user_profile:user_profiles!user_connections_user_id_fkey(*)
    `)
    .eq('connected_user_id', user.id)
    .eq('status', 'pending');

  if (error) {
    console.error('Error fetching pending requests:', error);
    return [];
  }

  return data as any || [];
}

export async function sendConnectionRequest(userId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('user_connections' as any)
    .insert({
      user_id: user.id,
      connected_user_id: userId,
      status: 'pending'
    });

  if (error && !error.message.includes('duplicate')) {
    throw new Error(`Failed to send connection request: ${error.message}`);
  }
}

export async function acceptConnection(connectionId: string): Promise<void> {
  const { error } = await supabase
    .from('user_connections' as any)
    .update({ status: 'accepted' })
    .eq('id', connectionId);

  if (error) {
    throw new Error(`Failed to accept connection: ${error.message}`);
  }
}

export async function rejectConnection(connectionId: string): Promise<void> {
  const { error } = await supabase
    .from('user_connections' as any)
    .update({ status: 'rejected' })
    .eq('id', connectionId);

  if (error) {
    throw new Error(`Failed to reject connection: ${error.message}`);
  }
}
