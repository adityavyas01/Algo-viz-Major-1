
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfile } from '@/components/UserProfile';
import { SharedVisualizations } from '@/components/SharedVisualizations';
import { StudyGroups } from '@/components/StudyGroups';
import { ActivityFeed } from '@/components/ActivityFeed';
import { Tournaments } from '@/components/Tournaments';
import { User, Share2, Users, Activity, Trophy, Bell } from 'lucide-react';
import { 
  mockUserProfiles, 
  mockSharedVisualizations, 
  mockStudyGroups, 
  mockActivityFeed, 
  mockTournaments 
} from '@/data/socialData';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SocialHub: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentUser] = useState(mockUserProfiles[0]);
  const [likedVisualizations, setLikedVisualizations] = useState<Set<string>>(new Set());
  const [likedActivities, setLikedActivities] = useState<Set<string>>(new Set());
  const [joinedGroups, setJoinedGroups] = useState<Set<string>>(new Set());
  const [joinedTournaments, setJoinedTournaments] = useState<Set<string>>(new Set());

  const requireAuth = (action: () => void) => {
    if (!user) {
      navigate('/login');
      return;
    }
    action();
  };

  const handleConnect = () => {
    requireAuth(() => {
      console.log('Sending friend request...');
      // Here you would call your API to send a friend request
    });
  };

  const handleMessage = () => {
    requireAuth(() => {
      console.log('Opening message...');
      // Here you would navigate to messaging or open a chat modal
    });
  };

  const handleLikeVisualization = (id: string) => {
    requireAuth(() => {
      setLikedVisualizations(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    });
  };

  const handleShareVisualization = (id: string) => {
    requireAuth(() => {
      navigator.clipboard.writeText(`${window.location.origin}/visualizations/${id}`);
      console.log('Visualization link copied to clipboard!');
    });
  };

  const handleJoinGroup = (groupId: string) => {
    requireAuth(() => {
      setJoinedGroups(prev => new Set([...prev, groupId]));
      console.log('Joined group:', groupId);
    });
  };

  const handleCreateGroup = () => {
    requireAuth(() => {
      navigate('/create-group');
    });
  };

  const handleLikeActivity = (activityId: string) => {
    requireAuth(() => {
      setLikedActivities(prev => {
        const newSet = new Set(prev);
        if (newSet.has(activityId)) {
          newSet.delete(activityId);
        } else {
          newSet.add(activityId);
        }
        return newSet;
      });
    });
  };

  const handleCommentActivity = (activityId: string) => {
    requireAuth(() => {
      console.log('Commenting on activity:', activityId);
      // Here you would open a comment modal or navigate to the activity detail
    });
  };

  const handleJoinTournament = (tournamentId: string) => {
    requireAuth(() => {
      setJoinedTournaments(prev => new Set([...prev, tournamentId]));
      console.log('Joined tournament:', tournamentId);
    });
  };

  // Update data with interaction states
  const visualizationsWithLikes = mockSharedVisualizations.map(viz => ({
    ...viz,
    isLiked: likedVisualizations.has(viz.id)
  }));

  const activitiesWithLikes = mockActivityFeed.map(activity => ({
    ...activity,
    isLiked: likedActivities.has(activity.id)
  }));

  const tournamentsWithJoinState = mockTournaments.map(tournament => ({
    ...tournament,
    hasJoined: joinedTournaments.has(tournament.id)
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Social Hub</h2>
        <p className="text-white/70">Connect, share, and learn with the community</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="visualizations" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Shared</span>
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Groups</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
          <TabsTrigger value="tournaments" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Tournaments</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <UserProfile 
            profile={currentUser}
            isOwnProfile={true}
          />
        </TabsContent>

        <TabsContent value="visualizations">
          <SharedVisualizations
            visualizations={visualizationsWithLikes}
            onLike={handleLikeVisualization}
            onShare={handleShareVisualization}
          />
        </TabsContent>

        <TabsContent value="groups">
          <StudyGroups
            groups={mockStudyGroups}
            onJoinGroup={handleJoinGroup}
            onCreateGroup={handleCreateGroup}
          />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityFeed
            activities={activitiesWithLikes}
            onLike={handleLikeActivity}
            onComment={handleCommentActivity}
          />
        </TabsContent>

        <TabsContent value="tournaments">
          <Tournaments
            tournaments={tournamentsWithJoinState}
            onJoinTournament={handleJoinTournament}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Notifications</h3>
            <p className="text-white/60">Stay updated with friend requests, comments, and achievements</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
