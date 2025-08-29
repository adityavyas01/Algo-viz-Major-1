import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tournament } from '@/types/admin';
import { Plus, Calendar, Users, DollarSign, Eye, Camera, Monitor, Trophy } from 'lucide-react';

interface TournamentFormData {
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  max_participants: number;
  entry_fee: number;
  prize_pool: number;
  requires_camera: boolean;
  requires_screen_recording: boolean;
}

export const TournamentManagement: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<TournamentFormData>({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    max_participants: 100,
    entry_fee: 0,
    prize_pool: 0,
    requires_camera: true,
    requires_screen_recording: true,
  });

  const fetchTournaments = async () => {
    try {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTournaments((data || []).map(tournament => ({
        ...tournament,
        status: tournament.status as 'upcoming' | 'active' | 'completed' | 'cancelled'
      })));
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch tournaments',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase.from('tournaments').insert({
        ...formData,
        created_by: user.id,
        status: 'upcoming',
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Tournament created successfully',
      });

      setIsCreating(false);
      setFormData({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        max_participants: 100,
        entry_fee: 0,
        prize_pool: 0,
        requires_camera: true,
        requires_screen_recording: true,
      });
      fetchTournaments();
    } catch (error) {
      console.error('Error creating tournament:', error);
      toast({
        title: 'Error',
        description: 'Failed to create tournament',
        variant: 'destructive',
      });
    }
  };

  const updateTournamentStatus = async (tournamentId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('tournaments')
        .update({ status })
        .eq('id', tournamentId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Tournament ${status} successfully`,
      });
      fetchTournaments();
    } catch (error) {
      console.error('Error updating tournament:', error);
      toast({
        title: 'Error',
        description: 'Failed to update tournament',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-400 bg-blue-500/10';
      case 'active':
        return 'text-green-400 bg-green-500/10';
      case 'completed':
        return 'text-gray-400 bg-gray-500/10';
      case 'cancelled':
        return 'text-red-400 bg-red-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-white/10 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Tournament Management</h2>
        <Button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Tournament
        </Button>
      </div>

      {isCreating && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
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
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="max_participants" className="text-white">Max Participants</Label>
                  <Input
                    id="max_participants"
                    type="number"
                    value={formData.max_participants}
                    onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) })}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_time" className="text-white">End Time</Label>
                  <Input
                    id="end_time"
                    type="datetime-local"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="entry_fee" className="text-white">Entry Fee</Label>
                  <Input
                    id="entry_fee"
                    type="number"
                    value={formData.entry_fee}
                    onChange={(e) => setFormData({ ...formData, entry_fee: parseInt(e.target.value) })}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="prize_pool" className="text-white">Prize Pool</Label>
                  <Input
                    id="prize_pool"
                    type="number"
                    value={formData.prize_pool}
                    onChange={(e) => setFormData({ ...formData, prize_pool: parseInt(e.target.value) })}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="requires_camera"
                    checked={formData.requires_camera}
                    onCheckedChange={(checked) => setFormData({ ...formData, requires_camera: checked })}
                  />
                  <Label htmlFor="requires_camera" className="text-white">Require Camera</Label>
                  <Camera className="w-4 h-4 text-white/70" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="requires_screen_recording"
                    checked={formData.requires_screen_recording}
                    onCheckedChange={(checked) => setFormData({ ...formData, requires_screen_recording: checked })}
                  />
                  <Label htmlFor="requires_screen_recording" className="text-white">Require Screen Recording</Label>
                  <Monitor className="w-4 h-4 text-white/70" />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Create Tournament
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreating(false)}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{tournament.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                      {tournament.status.toUpperCase()}
                    </span>
                  </div>
                  
                  {tournament.description && (
                    <p className="text-white/70 mb-3">{tournament.description}</p>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-white/70">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(tournament.start_time).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Users className="w-4 h-4" />
                      <span>{tournament.max_participants} max</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <DollarSign className="w-4 h-4" />
                      <span>${tournament.prize_pool}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Eye className="w-4 h-4" />
                      <span>
                        {tournament.requires_camera && <Camera className="w-3 h-3 inline mr-1" />}
                        {tournament.requires_screen_recording && <Monitor className="w-3 h-3 inline" />}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  {tournament.status === 'upcoming' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateTournamentStatus(tournament.id, 'active')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Start
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateTournamentStatus(tournament.id, 'cancelled')}
                        className="border-red-400 text-red-400 hover:bg-red-500/10"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {tournament.status === 'active' && (
                    <Button
                      size="sm"
                      onClick={() => updateTournamentStatus(tournament.id, 'completed')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      End
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {tournaments.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <Trophy className="w-12 h-12 text-white/50 mx-auto mb-3" />
              <p className="text-white/70">No tournaments created yet</p>
              <p className="text-white/50 text-sm">Create your first tournament to get started</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
