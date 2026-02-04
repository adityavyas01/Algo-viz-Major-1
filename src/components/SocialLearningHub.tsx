import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Eye,
  Clock,
  Filter,
  Search,
  Plus,
  Globe,
  Lock,
  TrendingUp,
  Code,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  useUserProfile, 
  useSharedVisualizations, 
  useStudyGroups, 
  useActivityFeed 
} from '@/hooks/useCommunity';
import { useEnsureUserProfile } from '@/hooks/useEnsureUserProfile';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SocialLearningHubProps {
  onJoinGroup?: (groupId: string) => void;
  onCreatePost?: () => void;
}

export const SocialLearningHub: React.FC<SocialLearningHubProps> = ({
  onJoinGroup,
  onCreatePost
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Ensure user profile exists
  const { isReady: profileReady } = useEnsureUserProfile();
  
  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'visualizations'>('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  // Fetch data using our hooks
  const { profile, isLoading: profileLoading } = useUserProfile(user?.id);
  const { visualizations, isLoading: vizLoading, likeVisualization, unlikeVisualization } = useSharedVisualizations({
    sort: 'recent'
  });
  const { groups, isLoading: groupsLoading, joinGroup, leaveGroup } = useStudyGroups();
  const { activities, isLoading: feedLoading } = useActivityFeed();

  const handleLikeViz = async (vizId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await unlikeVisualization(vizId);
      } else {
        await likeVisualization(vizId);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update like status',
        variant: 'destructive'
      });
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      await joinGroup(groupId);
      toast({
        title: 'Success',
        description: 'You have joined the group!'
      });
      onJoinGroup?.(groupId);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to join group',
        variant: 'destructive'
      });
    }
  };

  const handleLeaveGroup = async (groupId: string) => {
    try {
      await leaveGroup(groupId);
      toast({
        title: 'Success',
        description: 'You have left the group'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to leave group',
        variant: 'destructive'
      });
    }
  };

  const handleViewVisualization = (viz: any) => {
    // Navigate to visualization detail or open modal
    toast({
      title: 'Visualization',
      description: `Viewing: ${viz.title}`
    });
  };

  const filteredVisualizations = visualizations.filter(viz =>
    viz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    viz.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Community Hub
              </h1>
              <p className="text-slate-300">
                Connect, learn, and grow with fellow algorithm enthusiasts
              </p>
            </div>
            <Button
              onClick={onCreatePost || (() => navigate('/problems'))}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Share Visualization
            </Button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <Card className="bg-slate-800/50 border-slate-700 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search community content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-slate-700">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="feed" className="data-[state=active]:bg-purple-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Activity Feed
            </TabsTrigger>
            <TabsTrigger value="visualizations" className="data-[state=active]:bg-purple-600">
              <Code className="w-4 h-4 mr-2" />
              Visualizations
            </TabsTrigger>
            <TabsTrigger value="groups" className="data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              Study Groups
            </TabsTrigger>
          </TabsList>

          {/* Activity Feed Tab */}
          <TabsContent value="feed" className="space-y-4">
            {feedLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto" />
                <p className="text-slate-400 mt-4">Loading activity feed...</p>
              </div>
            ) : activities.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-12 text-center">
                  <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No activities yet. Start by joining groups or sharing visualizations!</p>
                </CardContent>
              </Card>
            ) : (
              activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={activity.user_avatar_url || ''} />
                          <AvatarFallback className="bg-purple-600">
                            {activity.user_display_name?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-white">
                              {activity.user_display_name || 'Anonymous'}
                            </span>
                            <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                              {activity.activity_type.replace('_', ' ')}
                            </Badge>
                            <span className="text-sm text-slate-400 ml-auto">
                              {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-slate-300">
                            {activity.metadata.title || activity.metadata.group_name || 'Activity'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </TabsContent>

          {/* Visualizations Tab */}
          <TabsContent value="visualizations" className="space-y-4">
            {vizLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto" />
                <p className="text-slate-400 mt-4">Loading visualizations...</p>
              </div>
            ) : filteredVisualizations.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-12 text-center">
                  <Code className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No visualizations found. Be the first to share one!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVisualizations.map((viz) => (
                  <motion.div
                    key={viz.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer"
                          onClick={() => handleViewVisualization(viz)}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-white text-lg mb-2">{viz.title}</CardTitle>
                            <CardDescription className="text-slate-400">
                              {viz.description}
                            </CardDescription>
                          </div>
                          {viz.algorithm_type && (
                            <Badge className="bg-blue-600/20 text-blue-400">
                              {viz.algorithm_type}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4 text-slate-400">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLikeViz(viz.id, viz.is_liked || false);
                              }}
                              className={`flex items-center gap-1 hover:text-pink-400 transition-colors ${
                                viz.is_liked ? 'text-pink-400' : ''
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${viz.is_liked ? 'fill-current' : ''}`} />
                              <span>{viz.likes_count}</span>
                            </button>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{viz.views_count}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {viz.language}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={viz.user_profile?.avatar_url || ''} />
                            <AvatarFallback className="bg-purple-600 text-xs">
                              {viz.user_profile?.display_name?.[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-slate-400">
                            {viz.user_profile?.display_name || 'Anonymous'}
                          </span>
                          <span className="text-sm text-slate-500 ml-auto">
                            {formatDistanceToNow(new Date(viz.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="groups" className="space-y-4">
            {groupsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto" />
                <p className="text-slate-400 mt-4">Loading study groups...</p>
              </div>
            ) : filteredGroups.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-12 text-center">
                  <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No study groups found. Create one to get started!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((group) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-white text-lg">{group.name}</CardTitle>
                          {group.privacy === 'private' ? (
                            <Lock className="w-4 h-4 text-slate-400" />
                          ) : (
                            <Globe className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <CardDescription className="text-slate-400">
                          {group.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {group.topic && (
                          <Badge className="bg-purple-600/20 text-purple-400 mb-4">
                            {group.topic}
                          </Badge>
                        )}
                        <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{group.member_count} / {group.max_members} members</span>
                          </div>
                        </div>
                        {group.is_member ? (
                          <Button
                            variant="outline"
                            className="w-full border-slate-700"
                            onClick={() => handleLeaveGroup(group.id)}
                          >
                            Leave Group
                          </Button>
                        ) : (
                          <Button
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                            onClick={() => handleJoinGroup(group.id)}
                            disabled={group.member_count >= group.max_members}
                          >
                            Join Group
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SocialLearningHub;
