
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { UserProfile as UserProfileType } from '@/types/social';
import { Users, Calendar, Trophy, Zap, MessageCircle, UserPlus } from 'lucide-react';

interface UserProfileProps {
  profile: UserProfileType;
  isOwnProfile?: boolean;
  onConnect?: () => void;
  onMessage?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  profile, 
  isOwnProfile = false,
  onConnect,
  onMessage 
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="text-6xl">{profile.avatar}</div>
          <div className="flex-1">
            <CardTitle className="text-white text-2xl">{profile.displayName}</CardTitle>
            <p className="text-white/70">@{profile.username}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-3 h-3 rounded-full ${profile.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
              <span className="text-sm text-white/60">
                {profile.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          
          {!isOwnProfile && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={onConnect}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Connect
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={onMessage}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          )}
        </div>
        
        <p className="text-white/80 mt-4">{profile.bio}</p>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{profile.level}</div>
            <div className="text-sm text-white/60">Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{profile.totalPoints.toLocaleString()}</div>
            <div className="text-sm text-white/60">Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{profile.followers}</div>
            <div className="text-sm text-white/60">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{profile.following}</div>
            <div className="text-sm text-white/60">Following</div>
          </div>
        </div>

        <Separator className="bg-white/20 my-6" />

        <div className="space-y-4">
          <div>
            <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Joined {profile.joinedDate.toLocaleDateString()}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white/80">
                <Zap className="w-4 h-4" />
                <span className="text-sm">{profile.studyStreak} day streak</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
