
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Target, Calendar, Users, Zap, ShoppingBag } from 'lucide-react';
import { AchievementBadge } from '@/components/AchievementBadge';
import { UserStatsOverview } from '@/components/UserStatsOverview';
import { DailyChallengesPanel } from '@/components/DailyChallengesPanel';
import { LeaderboardPanel } from '@/components/LeaderboardPanel';
import { ChallengeMode } from '@/components/ChallengeMode';
import { RewardStore } from '@/components/RewardStore';
import { 
  mockUserStats, 
  mockAchievements, 
  mockDailyChallenges, 
  mockLeaderboard, 
  mockChallenges,
  mockRewards 
} from '@/data/gamificationData';

export const GamificationDashboard: React.FC = () => {
  const [userStats, setUserStats] = useState(mockUserStats);
  const [achievements, setAchievements] = useState(mockAchievements);
  const [dailyChallenges, setDailyChallenges] = useState(mockDailyChallenges);
  const [challenges, setChallenges] = useState(mockChallenges);
  const [rewards, setRewards] = useState(mockRewards);

  const handleStartChallenge = (challengeId: string) => {
    console.log('Starting challenge:', challengeId);
    // Navigate to challenge or show challenge interface
  };

  const handleChallengeComplete = (challengeId: string, time: number) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, completed: true, bestTime: Math.min(challenge.bestTime || Infinity, time) }
        : challenge
    ));
    
    // Award points and update stats
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setUserStats(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + challenge.points,
        experience: prev.experience + challenge.points,
        challengesCompleted: prev.challengesCompleted + 1
      }));
    }
  };

  const handlePurchaseReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && userStats.totalPoints >= reward.cost) {
      setRewards(prev => prev.map(r => 
        r.id === rewardId ? { ...r, unlocked: true } : r
      ));
      setUserStats(prev => ({
        ...prev,
        totalPoints: prev.totalPoints - reward.cost
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Gamification Hub</h2>
        <p className="text-white/70">Track achievements, compete with others, and unlock rewards</p>
      </div>

      {/* User Stats Overview */}
      <UserStatsOverview stats={userStats} />

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Achievements</span>
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Daily</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger value="challenge-mode" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Challenge</span>
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Rewards</span>
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Stats</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Your Achievements</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {achievements.map((achievement) => (
                  <AchievementBadge 
                    key={achievement.id} 
                    achievement={achievement} 
                    size="md"
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges">
          <DailyChallengesPanel 
            challenges={dailyChallenges}
            onStartChallenge={handleStartChallenge}
          />
        </TabsContent>

        <TabsContent value="leaderboard">
          <LeaderboardPanel 
            globalLeaderboard={mockLeaderboard}
            weeklyLeaderboard={mockLeaderboard.slice(0, 3)}
            friendsLeaderboard={[]}
          />
        </TabsContent>

        <TabsContent value="challenge-mode">
          <ChallengeMode 
            challenges={challenges}
            onChallengeComplete={handleChallengeComplete}
          />
        </TabsContent>

        <TabsContent value="rewards">
          <RewardStore 
            rewards={rewards}
            userStats={userStats}
            onPurchaseReward={handlePurchaseReward}
          />
        </TabsContent>

        <TabsContent value="stats">
          <div className="grid lg:grid-cols-2 gap-6">
            <UserStatsOverview stats={userStats} />
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Recent Achievements</h3>
              <div className="grid grid-cols-3 gap-2">
                {achievements
                  .filter(a => a.unlocked)
                  .slice(0, 6)
                  .map((achievement) => (
                    <AchievementBadge 
                      key={achievement.id} 
                      achievement={achievement} 
                      size="sm"
                    />
                  ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
