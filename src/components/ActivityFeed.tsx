
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ActivityFeedItem } from '@/types/social';
import { Heart, MessageCircle, Share2, Trophy, TrendingUp, Users, Target, Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ActivityFeedProps {
  activities?: ActivityFeedItem[];
  onLike?: (activityId: string) => void;
  onComment?: (activityId: string) => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities: propActivities,
  onLike,
  onComment
}) => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityFeedItem[]>(propActivities || []);
  const [loading, setLoading] = useState(!propActivities);
  const [error, setError] = useState<string | null>(null);

  // Generate real activity feed from available database data
  const generateActivityFeed = async (): Promise<ActivityFeedItem[]> => {
    try {
      // Get recent user stats updates (shows level-ups, achievement unlocks)
      const { data: statsData, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(10);

      if (statsError) throw statsError;

      // Get recent notifications (community activity)
      const { data: notificationData, error: notificationError } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (notificationError) throw notificationError;

      // Get recent challenges
      const { data: challengeData, error: challengeError } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(5);

      if (challengeError) throw challengeError;

      const activities: ActivityFeedItem[] = [];

      // Generate activities from user stats (level-ups and achievements)
      statsData?.forEach((stats, index) => {
        if (stats.level > 1) {
          activities.push({
            id: `level-${stats.id}`,
            userId: stats.user_id,
            username: `User${stats.user_id.slice(-4)}`,
            avatar: '⭐',
            type: 'level_up',
            content: `reached level ${stats.level}`,
            targetName: `${stats.experience} XP`,
            createdAt: new Date(stats.updated_at),
            likes: Math.floor(stats.level * 2 + Math.random() * 10),
            isLiked: false
          });
        }

        if (stats.challenges_completed > 0) {
          activities.push({
            id: `achievement-${stats.id}`,
            userId: stats.user_id,
            username: `User${stats.user_id.slice(-4)}`,
            avatar: '🏆',
            type: 'achievement',
            content: `completed ${stats.challenges_completed} challenges`,
            targetName: `${stats.total_points} points`,
            createdAt: new Date(stats.updated_at),
            likes: Math.floor(stats.challenges_completed + Math.random() * 8),
            isLiked: false
          });
        }

        if (stats.current_streak >= 3) {
          activities.push({
            id: `streak-${stats.id}`,
            userId: stats.user_id,
            username: `User${stats.user_id.slice(-4)}`,
            avatar: '🔥',
            type: 'streak',
            content: `is on a ${stats.current_streak}-day streak`,
            targetName: 'Daily Learning',
            createdAt: new Date(stats.updated_at),
            likes: Math.floor(stats.current_streak + Math.random() * 5),
            isLiked: false
          });
        }
      });

      // Generate activities from notifications
      notificationData?.forEach((notification, index) => {
        activities.push({
          id: `notification-${notification.id}`,
          userId: notification.user_id,
          username: `User${notification.user_id.slice(-4)}`,
          avatar: '📢',
          type: 'share',
          content: notification.message,
          targetName: notification.title,
          createdAt: new Date(notification.created_at),
          likes: Math.floor(Math.random() * 15),
          isLiked: false
        });
      });

      // Generate activities from challenges (new challenge posts)
      challengeData?.slice(0, 3).forEach((challenge, index) => {
        activities.push({
          id: `new-challenge-${challenge.id}`,
          userId: challenge.created_by,
          username: 'ChallengeBot',
          avatar: '🎯',
          type: 'complete_challenge',
          content: 'posted a new challenge',
          targetName: challenge.title,
          createdAt: new Date(challenge.created_at),
          likes: Math.floor(Math.random() * 25),
          isLiked: false
        });
      });

      // Sort by date and limit to 15 most recent
      return activities
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 15);

    } catch (err) {
      console.error('Error generating activity feed:', err);
      return [];
    }
  };

  const fetchActivities = async () => {
    if (propActivities) {
      setActivities(propActivities);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const feedData = await generateActivityFeed();
      setActivities(feedData);
    } catch (err) {
      setError('Failed to load activity feed');
      console.error('Activity feed error:', err);
      
      // Fallback to mock data
      const fallbackActivities: ActivityFeedItem[] = [
        {
          id: 'fallback-1',
          userId: 'system',
          username: 'AlgoViz',
          avatar: '🎯',
          type: 'achievement',
          content: 'Welcome to the community!',
          targetName: 'Getting Started',
          createdAt: new Date(),
          likes: 5,
          isLiked: false
        }
      ];
      setActivities(fallbackActivities);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (activityId: string) => {
    const activity = activities.find(a => a.id === activityId);
    if (!activity) return;

    try {
      // Optimistic update
      setActivities(prev => prev.map(a => 
        a.id === activityId 
          ? { 
              ...a, 
              isLiked: !a.isLiked,
              likes: a.isLiked ? a.likes - 1 : a.likes + 1
            }
          : a
      ));

      // You could add database storage for likes here
      onLike?.(activityId);
      
    } catch (err) {
      // Revert optimistic update on error
      setActivities(prev => prev.map(a => 
        a.id === activityId 
          ? { 
              ...a, 
              isLiked: activity.isLiked,
              likes: activity.likes
            }
          : a
      ));
      
      toast({
        title: 'Error',
        description: 'Failed to update like status',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Activity Feed</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4 bg-white/20" />
                    <Skeleton className="h-3 w-1/2 bg-white/20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error && activities.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Activity Feed</h2>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-white mb-4">Unable to load activity feed</p>
            <Button 
              onClick={fetchActivities}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  const getActivityIcon = (type: ActivityFeedItem['type']) => {
    switch (type) {
      case 'achievement': return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'share': return <Share2 className="w-5 h-5 text-blue-500" />;
      case 'join_group': return <Users className="w-5 h-5 text-green-500" />;
      case 'complete_challenge': return <Target className="w-5 h-5 text-purple-500" />;
      case 'level_up': return <TrendingUp className="w-5 h-5 text-orange-500" />;
      case 'streak': return <Zap className="w-5 h-5 text-cyan-500" />;
      default: return <MessageCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Activity Feed</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{activity.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 text-sm mb-1">
                    {getActivityIcon(activity.type)}
                    <span className="text-white font-medium truncate">@{activity.username}</span>
                    <span className="text-white/80 whitespace-normal">{activity.content}</span>
                    {activity.targetName && (
                      <span className="text-cyan-400 font-medium truncate">"{activity.targetName}"</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-white/60 text-xs">
                      {formatTimeAgo(activity.createdAt)}
                    </span>
                    
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`text-white hover:bg-white/10 ${activity.isLiked ? 'text-red-500' : ''}`}
                        onClick={() => handleLike(activity.id)}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${activity.isLiked ? 'fill-current' : ''}`} />
                        {activity.likes}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/10"
                        onClick={() => onComment?.(activity.id)}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
