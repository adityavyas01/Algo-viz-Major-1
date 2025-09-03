import React, { useState } from "react";
import { Header } from "@/components/Header";
import { SocialHub } from "@/components/SocialHub";
import { CollaborativeLearning } from "@/components/CollaborativeLearning";
import { CommunityChallenges } from "@/components/CommunityChallenges";
import { ActivityFeed } from "@/components/ActivityFeed";
import { CommunityChallenge } from "@/types/learning";
import { ActivityFeedItem } from "@/types/social";
import { mockActivityFeed, mockTournaments } from "@/data/socialData";
import { mockChallenges, mockDailyChallenges } from "@/data/gamificationData";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Community: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [likedActivities, setLikedActivities] = useState<Set<string>>(new Set());
  
  // Convert tournament data to community challenges format
  const communityChallenge: CommunityChallenge[] = mockTournaments.map(tournament => ({
    id: tournament.id,
    title: tournament.name,
    description: tournament.description,
    type: 'hackathon' as const,
    startDate: tournament.startDate,
    endDate: tournament.endDate,
    status: tournament.status as 'active' | 'upcoming' | 'completed',
    participants: tournament.participants,
    maxParticipants: tournament.maxParticipants,
    rewards: [tournament.prize, 'Community Recognition', 'Leaderboard Position'],
    requirements: tournament.rules.slice(0, 2),
    rules: tournament.rules,
    tags: ['tournament', 'competition', 'algorithms'],
    difficulty: 'intermediate' as const,
    bannerImage: tournament.bannerImage
  }));

  // Add daily challenges as community challenges
  const dailyChallengesCommunity: CommunityChallenge[] = mockDailyChallenges.map(challenge => ({
    id: `daily-${challenge.id}`,
    title: challenge.title,
    description: challenge.description,
    type: 'algorithm_sprint' as const,
    startDate: new Date(),
    endDate: challenge.expiresAt,
    status: 'active' as const,
    participants: Math.floor(Math.random() * 50) + 20,
    maxParticipants: 100,
    rewards: [`${challenge.points} Points`, 'Daily Badge', 'XP Bonus'],
    requirements: [`Complete ${challenge.title}`, `Within ${challenge.timeLimit / 60} minutes`],
    rules: ['Single attempt allowed', 'No external resources'],
    tags: [challenge.algorithmId, challenge.difficulty, 'daily'],
    difficulty: challenge.difficulty === 'easy' ? 'beginner' : challenge.difficulty === 'medium' ? 'intermediate' : 'advanced',
    bannerImage: '🎯'
  }));

  const allChallenges = [...communityChallenge, ...dailyChallengesCommunity];

  const handleJoinChallenge = (challengeId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Here you would normally call an API to join the challenge
    console.log('Joining challenge:', challengeId);
    // For now, show a success message or redirect to challenge page
    navigate(`/challenges/${challengeId}`);
  };

  const handleLikeActivity = (activityId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setLikedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };

  const handleCommentActivity = (activityId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Navigate to activity detail page or open comment modal
    console.log('Commenting on activity:', activityId);
  };

  // Update activity feed with like states
  const activitiesWithLikes = mockActivityFeed.map(activity => ({
    ...activity,
    isLiked: likedActivities.has(activity.id)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Community Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with fellow learners, join collaborative challenges, and share your coding journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
              <SocialHub />
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
              <CollaborativeLearning />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
              <CommunityChallenges 
                challenges={allChallenges}
                onJoinChallenge={handleJoinChallenge}
              />
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
              <ActivityFeed 
                activities={activitiesWithLikes}
                onLike={handleLikeActivity}
                onComment={handleCommentActivity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
