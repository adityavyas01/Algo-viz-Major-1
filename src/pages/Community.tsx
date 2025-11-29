import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialHub } from "@/components/SocialHub";
import { CollaborativeLearning } from "@/components/CollaborativeLearning";
import { CommunityChallenges } from "@/components/CommunityChallenges";
import { ActivityFeed } from "@/components/ActivityFeed";
import { AdvancedCollaborativeFeatures } from "@/components/AdvancedCollaborativeFeatures";
import { CommunityChallenge } from "@/types/learning";
import { mockActivityFeed, mockTournaments } from "@/data/socialData";
import { mockDailyChallenges } from "@/data/gamificationData";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MotionWrapper } from "@/components/motion/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Users, Trophy, MessageSquare, Activity, ArrowRight } from "lucide-react";

const Community: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [likedActivities, setLikedActivities] = useState<Set<string>>(new Set());
  
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
    console.log('Commenting on activity:', activityId);
  };

  const activitiesWithLikes = mockActivityFeed.map(activity => ({
    ...activity,
    isLiked: likedActivities.has(activity.id)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <MotionWrapper variant="fadeInUp">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Community Hub
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Connect, collaborate, and compete with a global community of algorithm enthusiasts.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Join a Discussion <MessageSquare className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20 hover:text-purple-200">
                View Challenges <Trophy className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <MotionWrapper variant="fadeInUp" delay={0.2}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-cyan-300"><Users /> Social Hub</h2>
                <SocialHub />
              </div>
            </MotionWrapper>
            <MotionWrapper variant="fadeInUp" delay={0.3}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-green-300"><Users /> Collaborative Learning</h2>
                <CollaborativeLearning />
              </div>
            </MotionWrapper>
             <MotionWrapper variant="fadeInUp" delay={0.4}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-pink-300">⚡ Advanced Features</h2>
                <AdvancedCollaborativeFeatures />
              </div>
            </MotionWrapper>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <MotionWrapper variant="fadeInUp" delay={0.2}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-yellow-300"><Trophy /> Community Challenges</h2>
                <CommunityChallenges 
                  challenges={allChallenges.slice(0, 3)} // Show a few featured challenges
                  onJoinChallenge={handleJoinChallenge}
                />
                 <Button variant="link" className="text-cyan-400 mt-4" onClick={() => navigate('/challenges')}>
                  View All Challenges <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </MotionWrapper>
            <MotionWrapper variant="fadeInUp" delay={0.3}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-purple-300"><Activity /> Live Activity Feed</h2>
                <ActivityFeed 
                  activities={activitiesWithLikes}
                  onLike={handleLikeActivity}
                  onComment={handleCommentActivity}
                />
              </div>
            </MotionWrapper>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
