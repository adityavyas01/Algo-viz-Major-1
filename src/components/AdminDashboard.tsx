import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Trophy, Users, Settings, Activity, Bell, AlertTriangle, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Tournament {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  max_participants: number;
  prize_pool: number;
  requires_camera: boolean;
  requires_screen_recording: boolean;
}

interface User {
  id: string;
  email: string;
  created_at: string;
  is_admin: boolean;
  last_sign_in_at: string;
}

export const AdminDashboard: React.FC = () => {
  const { isAdmin, adminRole, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreatingTournament, setIsCreatingTournament] = useState(false);
  const queryClient = useQueryClient();

  // Tournament form state
  const [tournamentForm, setTournamentForm] = useState({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    max_participants: 100,
    prize_pool: 0,
    requires_camera: false,
    requires_screen_recording: false,
  });

  // Fetch tournaments
  const { data: tournaments, isLoading: tournamentsLoading } = useQuery({
    queryKey: ['admin-tournaments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Tournament[];
    },
    enabled: isAdmin,
  });

  // Fetch users
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Create tournament mutation
  const createTournamentMutation = useMutation({
    mutationFn: async (tournamentData: {
      title: string;
      description?: string;
      start_time: string;
      end_time: string;
      max_participants?: number;
      entry_fee?: number;
      prize_pool?: number;
      requires_camera?: boolean;
      requires_screen_recording?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('tournaments')
        .insert([{
          ...tournamentData,
          created_by: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Tournament created successfully!');
      setIsCreatingTournament(false);
      setTournamentForm({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        max_participants: 100,
        prize_pool: 0,
        requires_camera: false,
        requires_screen_recording: false,
      });
      queryClient.invalidateQueries({ queryKey: ['admin-tournaments'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create tournament');
    },
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Loading Admin Dashboard...</h2>
            <p className="text-white/70">Please wait while we prepare your dashboard.</p>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mt-4"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Access denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
            <p className="text-white/70">
              You don't have permission to access the admin dashboard.
            </p>
            <Button className="mt-4" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    createTournamentMutation.mutate(tournamentForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/70">
            Welcome back, {String(adminRole).replace('_', ' ')}! Manage your AlgoViz platform.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-white">{users?.length || 0}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Tournaments</p>
                  <p className="text-2xl font-bold text-white">{tournaments?.length || 0}</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Active Sessions</p>
                  <p className="text-2xl font-bold text-white">--</p>
                </div>
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">System Status</p>
                  <p className="text-lg font-bold text-green-400">Healthy</p>
                </div>
                <Shield className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5 bg-white/5">
                <TabsTrigger value="overview" className="text-white">Overview</TabsTrigger>
                <TabsTrigger value="tournaments" className="text-white">Tournaments</TabsTrigger>
                <TabsTrigger value="users" className="text-white">Users</TabsTrigger>
                <TabsTrigger value="analytics" className="text-white">Analytics</TabsTrigger>
                <TabsTrigger value="settings" className="text-white">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Platform Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white/70">No recent activity to display.</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white">System Health</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-white/70">Database</span>
                            <Badge className="bg-green-500/20 text-green-400">Online</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Authentication</span>
                            <Badge className="bg-green-500/20 text-green-400">Online</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Storage</span>
                            <Badge className="bg-green-500/20 text-green-400">Online</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tournaments" className="mt-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Tournament Management</h3>
                    <Button 
                      onClick={() => setIsCreatingTournament(true)}
                      className="bg-cyan-500 hover:bg-cyan-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Tournament
                    </Button>
                  </div>

                  {isCreatingTournament && (
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-white">Create New Tournament</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleCreateTournament} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="title" className="text-white">Title</Label>
                              <Input
                                id="title"
                                value={tournamentForm.title}
                                onChange={(e) => setTournamentForm({ ...tournamentForm, title: e.target.value })}
                                className="bg-white/10 border-white/20 text-white"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="max_participants" className="text-white">Max Participants</Label>
                              <Input
                                id="max_participants"
                                type="number"
                                value={tournamentForm.max_participants}
                                onChange={(e) => setTournamentForm({ ...tournamentForm, max_participants: parseInt(e.target.value) })}
                                className="bg-white/10 border-white/20 text-white"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="description" className="text-white">Description</Label>
                            <Textarea
                              id="description"
                              value={tournamentForm.description}
                              onChange={(e) => setTournamentForm({ ...tournamentForm, description: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="start_time" className="text-white">Start Time</Label>
                              <Input
                                id="start_time"
                                type="datetime-local"
                                value={tournamentForm.start_time}
                                onChange={(e) => setTournamentForm({ ...tournamentForm, start_time: e.target.value })}
                                className="bg-white/10 border-white/20 text-white"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="end_time" className="text-white">End Time</Label>
                              <Input
                                id="end_time"
                                type="datetime-local"
                                value={tournamentForm.end_time}
                                onChange={(e) => setTournamentForm({ ...tournamentForm, end_time: e.target.value })}
                                className="bg-white/10 border-white/20 text-white"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setIsCreatingTournament(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              type="submit" 
                              className="bg-cyan-500 hover:bg-cyan-600"
                              disabled={createTournamentMutation.isPending}
                            >
                              {createTournamentMutation.isPending ? 'Creating...' : 'Create Tournament'}
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-4">
                    {tournamentsLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                        <p className="text-white/70 mt-4">Loading tournaments...</p>
                      </div>
                    ) : tournaments && tournaments.length > 0 ? (
                      tournaments.map((tournament) => (
                        <Card key={tournament.id} className="bg-white/5 border-white/10">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-lg font-semibold text-white">{tournament.title}</h4>
                                <p className="text-white/70 mt-1">{tournament.description}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <Badge 
                                    className={
                                      tournament.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                      tournament.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' :
                                      tournament.status === 'completed' ? 'bg-gray-500/20 text-gray-400' :
                                      'bg-red-500/20 text-red-400'
                                    }
                                  >
                                    {tournament.status}
                                  </Badge>
                                  <span className="text-white/70 text-sm">
                                    {tournament.max_participants} max participants
                                  </span>
                                  {tournament.prize_pool > 0 && (
                                    <span className="text-white/70 text-sm">
                                      ${tournament.prize_pool} prize pool
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-400 hover:text-red-300">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
                        <p className="text-white/70">No tournaments found. Create your first tournament!</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">User Management</h3>
                  
                  {usersLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                      <p className="text-white/70 mt-4">Loading users...</p>
                    </div>
                  ) : users && users.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {users.map((user: {avatar_url: string; bio: string; created_at: string; display_name: string; id: string; updated_at: string; user_id: string}) => (
                        <Card key={user.id} className="bg-white/5 border-white/10">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-white font-medium">{user.display_name || `User ${user.id.slice(0, 8)}`}</p>
                                <p className="text-white/70 text-sm">
                                  Joined: {new Date(user.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className="bg-blue-500/20 text-blue-400">
                                  User
                                </Badge>
                                <Button size="sm" variant="outline">
                                  Manage
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
                      <p className="text-white/70">No users found.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Analytics & Reports</h3>
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6 text-center">
                      <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                      <h4 className="text-white text-lg mb-2">Analytics Coming Soon</h4>
                      <p className="text-white/70">
                        Advanced analytics and reporting features are currently in development.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">System Settings</h3>
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6 text-center">
                      <Settings className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      <h4 className="text-white text-lg mb-2">Settings Panel Coming Soon</h4>
                      <p className="text-white/70">
                        System configuration and settings management features are currently in development.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
