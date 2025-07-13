
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

export const SocialHub: React.FC = () => {
  const [currentUser] = useState(mockUserProfiles[0]);

  const handleConnect = () => {
    console.log('Sending friend request...');
  };

  const handleMessage = () => {
    console.log('Opening message...');
  };

  const handleLikeVisualization = (id: string) => {
    console.log('Liking visualization:', id);
  };

  const handleShareVisualization = (id: string) => {
    console.log('Sharing visualization:', id);
  };

  const handleJoinGroup = (groupId: string) => {
    console.log('Joining group:', groupId);
  };

  const handleCreateGroup = () => {
    console.log('Creating new group...');
  };

  const handleLikeActivity = (activityId: string) => {
    console.log('Liking activity:', activityId);
  };

  const handleCommentActivity = (activityId: string) => {
    console.log('Commenting on activity:', activityId);
  };

  const handleJoinTournament = (tournamentId: string) => {
    console.log('Joining tournament:', tournamentId);
  };

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
            visualizations={mockSharedVisualizations}
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
            activities={mockActivityFeed}
            onLike={handleLikeActivity}
            onComment={handleCommentActivity}
          />
        </TabsContent>

        <TabsContent value="tournaments">
          <Tournaments
            tournaments={mockTournaments}
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
