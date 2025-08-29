import React from "react";
import { Header } from "@/components/Header";
import { SocialHub } from "@/components/SocialHub";
import { CollaborativeLearning } from "@/components/CollaborativeLearning";
import { CommunityChallenges } from "@/components/CommunityChallenges";
import { ActivityFeed } from "@/components/ActivityFeed";
import { CommunityChallenge } from "@/types/learning";
import { ActivityFeedItem } from "@/types/social";

const Community: React.FC = () => {
  // Mock data for challenges
  const mockChallenges: CommunityChallenge[] = [
    {
      id: '1',
      title: 'Algorithm Sprint Week',
      description: 'Complete 10 different sorting algorithms in one week',
      type: 'algorithm_sprint',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'active',
      participants: 156,
      maxParticipants: 200,
      rewards: ['Badge: Algorithm Master', '500 XP', 'Certificate'],
      requirements: ['Complete 10 sorting algorithms', 'Achieve 80% accuracy'],
      rules: ['No external help allowed', 'Submit within time limit'],
      tags: ['sorting', 'algorithms', 'beginner'],
      difficulty: 'intermediate',
      bannerImage: '/api/placeholder/400/200'
    }
  ];

  // Mock data for activity feed
  const mockActivities: ActivityFeedItem[] = [
    {
      id: '1',
      userId: 'user1',
      username: 'AlgoMaster',
      avatar: '/api/placeholder/40/40',
      type: 'achievement',
      content: 'Earned the "Sorting Expert" badge!',
      createdAt: new Date(),
      likes: 12,
      isLiked: false
    },
    {
      id: '2',
      userId: 'user2',
      username: 'CodeNinja',
      avatar: '/api/placeholder/40/40',
      type: 'complete_challenge',
      content: 'Completed the Dynamic Programming Challenge',
      targetName: 'DP Master Challenge',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 8,
      isLiked: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Community Hub
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SocialHub />
            <div className="mt-8">
              <CollaborativeLearning />
            </div>
          </div>
          <div>
            <CommunityChallenges 
              challenges={mockChallenges}
              onJoinChallenge={(id) => console.log('Joining challenge:', id)}
            />
            <div className="mt-8">
              <ActivityFeed 
                activities={mockActivities}
                onLike={(id) => console.log('Liking activity:', id)}
                onComment={(id) => console.log('Commenting on activity:', id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
