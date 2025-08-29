import React from "react";
import { Header } from "@/components/Header";
import { LeaderboardPanel } from "@/components/LeaderboardPanel";
import { LeaderboardEntry } from "@/types/gamification";

const Leaderboard: React.FC = () => {
  // Mock leaderboard data
  const mockGlobalLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      username: 'AlgoMaster',
      avatar: '/api/placeholder/50/50',
      points: 15420,
      level: 25,
      rank: 1,
      badge: 'Algorithm Legend'
    },
    {
      id: '2',
      username: 'CodeWizard',
      avatar: '/api/placeholder/50/50',
      points: 14850,
      level: 24,
      rank: 2,
      badge: 'Speed Demon'
    },
    {
      id: '3',
      username: 'DataStructureGuru',
      avatar: '/api/placeholder/50/50',
      points: 14200,
      level: 23,
      rank: 3,
      badge: 'Tree Master'
    },
    {
      id: '4',
      username: 'BinaryExplorer',
      avatar: '/api/placeholder/50/50',
      points: 13750,
      level: 22,
      rank: 4
    },
    {
      id: '5',
      username: 'SortingSensei',
      avatar: '/api/placeholder/50/50',
      points: 13200,
      level: 21,
      rank: 5
    }
  ];

  const mockWeeklyLeaderboard: LeaderboardEntry[] = [
    {
      id: '6',
      username: 'QuickLearner',
      avatar: '/api/placeholder/50/50',
      points: 2450,
      level: 15,
      rank: 1,
      badge: 'Rising Star'
    },
    {
      id: '7',
      username: 'AlgoRookie',
      avatar: '/api/placeholder/50/50',
      points: 2200,
      level: 14,
      rank: 2
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Leaderboard
        </h1>
        <LeaderboardPanel 
          globalLeaderboard={mockGlobalLeaderboard}
          weeklyLeaderboard={mockWeeklyLeaderboard}
          friendsLeaderboard={[]}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
