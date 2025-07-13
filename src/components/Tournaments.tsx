
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tournament } from '@/types/social';
import { Trophy, Calendar, Users, Clock, Award, Target } from 'lucide-react';

interface TournamentsProps {
  tournaments: Tournament[];
  onJoinTournament?: (tournamentId: string) => void;
  onViewLeaderboard?: (tournamentId: string) => void;
}

export const Tournaments: React.FC<TournamentsProps> = ({
  tournaments,
  onJoinTournament,
  onViewLeaderboard
}) => {
  const getStatusColor = (status: Tournament['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-300';
      case 'active': return 'bg-green-500/20 text-green-300';
      case 'completed': return 'bg-gray-500/20 text-gray-300';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Tournaments & Events</h2>
      
      <div className="space-y-6">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="text-4xl">{tournament.bannerImage}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-white">{tournament.name}</CardTitle>
                    <Badge className={getStatusColor(tournament.status)}>
                      {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-white/80">{tournament.description}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-white/60 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Start</span>
                    </div>
                    <div className="text-white font-medium text-sm">
                      {formatDate(tournament.startDate)}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-white/60 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">End</span>
                    </div>
                    <div className="text-white font-medium text-sm">
                      {formatDate(tournament.endDate)}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-white/60 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Participants</span>
                    </div>
                    <div className="text-white font-medium">
                      {tournament.participants}/{tournament.maxParticipants}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-white/60 mb-1">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">Prize</span>
                    </div>
                    <div className="text-white font-medium text-sm">{tournament.prize}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Participation Progress</h4>
                  <Progress 
                    value={(tournament.participants / tournament.maxParticipants) * 100} 
                    className="h-2"
                  />
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">Challenge Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {tournament.challenges.map((challenge, index) => (
                      <Badge key={index} variant="outline" className="border-cyan-400 text-cyan-300">
                        <Target className="w-3 h-3 mr-1" />
                        {challenge.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    ))}
                  </div>
                </div>

                {tournament.status === 'active' && tournament.leaderboard.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2">Top Participants</h4>
                    <div className="space-y-2">
                      {tournament.leaderboard.slice(0, 3).map((entry, index) => (
                        <div key={entry.userId} className="flex items-center gap-3 bg-white/5 p-2 rounded">
                          <div className="text-xl">{entry.avatar}</div>
                          <div className="flex-1">
                            <div className="text-white font-medium">#{entry.rank} {entry.username}</div>
                            <div className="text-white/60 text-sm">
                              Score: {entry.score} | Challenges: {entry.completedChallenges}
                            </div>
                          </div>
                          {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  {tournament.status !== 'completed' && (
                    <Button
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                      onClick={() => onJoinTournament?.(tournament.id)}
                    >
                      {tournament.status === 'upcoming' ? 'Register' : 'Join Tournament'}
                    </Button>
                  )}
                  
                  {tournament.leaderboard.length > 0 && (
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                      onClick={() => onViewLeaderboard?.(tournament.id)}
                    >
                      View Leaderboard
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
