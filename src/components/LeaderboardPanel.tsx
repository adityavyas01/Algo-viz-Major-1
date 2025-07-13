
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Crown, Users, Calendar, Globe } from 'lucide-react';
import { LeaderboardEntry } from '@/types/gamification';

interface LeaderboardPanelProps {
  globalLeaderboard: LeaderboardEntry[];
  weeklyLeaderboard?: LeaderboardEntry[];
  friendsLeaderboard?: LeaderboardEntry[];
}

export const LeaderboardPanel: React.FC<LeaderboardPanelProps> = ({
  globalLeaderboard,
  weeklyLeaderboard = [],
  friendsLeaderboard = []
}) => {
  const [activeTab, setActiveTab] = useState('global');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-4 h-4 text-yellow-500" />;
      case 2:
        return <Medal className="w-4 h-4 text-gray-400" />;
      case 3:
        return <Medal className="w-4 h-4 text-amber-600" />;
      default:
        return <span className="w-4 h-4 flex items-center justify-center text-white/70 text-sm font-bold">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  const LeaderboardList: React.FC<{ entries: LeaderboardEntry[] }> = ({ entries }) => (
    <div className="space-y-3">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className={`p-4 rounded-lg border ${getRankColor(entry.rank)}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {getRankIcon(entry.rank)}
              {entry.badge && <span className="text-lg">{entry.badge}</span>}
            </div>
            
            <div className="flex items-center gap-2 flex-1">
              <span className="text-lg">{entry.avatar}</span>
              <div>
                <div className="text-white font-medium">{entry.username}</div>
                <div className="text-white/60 text-sm">Level {entry.level}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-white font-bold">{entry.points.toLocaleString()}</div>
              <div className="text-white/60 text-sm">points</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Leaderboards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="global" className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span className="hidden sm:inline">Global</span>
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span className="hidden sm:inline">Weekly</span>
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span className="hidden sm:inline">Friends</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            <LeaderboardList entries={globalLeaderboard} />
          </TabsContent>

          <TabsContent value="weekly">
            {weeklyLeaderboard.length > 0 ? (
              <LeaderboardList entries={weeklyLeaderboard} />
            ) : (
              <div className="text-center py-8 text-white/60">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Weekly leaderboard updates every Monday</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="friends">
            {friendsLeaderboard.length > 0 ? (
              <LeaderboardList entries={friendsLeaderboard} />
            ) : (
              <div className="text-center py-8 text-white/60">
                <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Add friends to see their progress here</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 border-white/30 text-white hover:bg-white/10"
                >
                  Find Friends
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
