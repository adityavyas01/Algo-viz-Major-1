
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ActivityFeedItem } from '@/types/social';
import { Heart, MessageCircle, Share2, Trophy, TrendingUp, Users, Target, Zap } from 'lucide-react';

interface ActivityFeedProps {
  activities: ActivityFeedItem[];
  onLike?: (activityId: string) => void;
  onComment?: (activityId: string) => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  onLike,
  onComment
}) => {
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
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getActivityIcon(activity.type)}
                    <span className="text-white font-medium">@{activity.username}</span>
                    <span className="text-white/80">{activity.content}</span>
                    {activity.targetName && (
                      <span className="text-cyan-400 font-medium">"{activity.targetName}"</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">
                      {formatTimeAgo(activity.createdAt)}
                    </span>
                    
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`text-white hover:bg-white/10 ${activity.isLiked ? 'text-red-500' : ''}`}
                        onClick={() => onLike?.(activity.id)}
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
