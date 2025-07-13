
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Star, Palette, User, Award, Lock, CheckCircle } from 'lucide-react';
import { Reward, UserStats } from '@/types/gamification';

interface RewardStoreProps {
  rewards: Reward[];
  userStats: UserStats;
  onPurchaseReward?: (rewardId: string) => void;
}

export const RewardStore: React.FC<RewardStoreProps> = ({ 
  rewards, 
  userStats, 
  onPurchaseReward 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryIcons = {
    badge: Award,
    theme: Palette,
    avatar: User,
    title: Star
  };

  const rarityColors = {
    common: 'border-gray-400 bg-gray-100/10',
    rare: 'border-blue-400 bg-blue-100/10',
    epic: 'border-purple-400 bg-purple-100/10',
    legendary: 'border-yellow-400 bg-yellow-100/10'
  };

  const rarityLabels = {
    common: 'Common',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary'
  };

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.type === selectedCategory);

  const canAfford = (cost: number) => userStats.totalPoints >= cost;

  const RewardCard: React.FC<{ reward: Reward }> = ({ reward }) => {
    const IconComponent = categoryIcons[reward.type];
    
    return (
      <div className={`p-4 rounded-lg border-2 ${rarityColors[reward.rarity]} ${
        reward.unlocked ? 'opacity-100' : 'opacity-80'
      }`}>
        <div className="text-center mb-3">
          <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-white/10 rounded-full">
            {reward.unlocked ? (
              <span className="text-2xl">{reward.icon}</span>
            ) : (
              <IconComponent className="w-6 h-6 text-white/70" />
            )}
          </div>
          <h3 className="text-white font-medium mb-1">{reward.name}</h3>
          <p className="text-white/70 text-sm">{reward.description}</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <Badge variant="outline" className="text-white/70 border-white/30">
            {rarityLabels[reward.rarity]}
          </Badge>
        </div>

        <div className="text-center">
          {reward.unlocked ? (
            <div className="flex items-center justify-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Unlocked</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-white font-bold">{reward.cost.toLocaleString()} points</div>
              <Button
                size="sm"
                onClick={() => onPurchaseReward?.(reward.id)}
                disabled={!canAfford(reward.cost)}
                className={`w-full ${
                  canAfford(reward.cost)
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                {canAfford(reward.cost) ? (
                  <>
                    <ShoppingBag className="w-3 h-3 mr-1" />
                    Purchase
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3 mr-1" />
                    Insufficient Points
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Reward Store
          </CardTitle>
          <Badge variant="outline" className="text-white border-white/30">
            {userStats.totalPoints.toLocaleString()} points
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="badge">Badges</TabsTrigger>
            <TabsTrigger value="theme">Themes</TabsTrigger>
            <TabsTrigger value="avatar">Avatars</TabsTrigger>
            <TabsTrigger value="title">Titles</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRewards.map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
            </div>
            
            {filteredRewards.length === 0 && (
              <div className="text-center py-8 text-white/60">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No rewards available in this category</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
