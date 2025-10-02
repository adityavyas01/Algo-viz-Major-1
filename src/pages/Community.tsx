import React, { useState } from "react";
import { Header } from "@/components/Header";
import { SocialHub } from "@/components/SocialHub";
import { CollaborativeLearning } from "@/components/CollaborativeLearning";
import { CommunityChallenges } from "@/components/CommunityChallenges";
import { ActivityFeed } from "@/components/ActivityFeed";
import { AdvancedCollaborativeFeatures } from "@/components/AdvancedCollaborativeFeatures";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      {/* Enhanced Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Secondary ambient orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-green-400/15 to-emerald-500/10 rounded-full blur-2xl animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-orange-400/15 to-red-500/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-400/15 to-rose-500/10 rounded-full blur-xl animate-pulse delay-1200"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400/40 rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-bounce delay-1000"></div>
      </div>
      
      <Header />
      <div className="container mx-auto px-4 py-6 pt-20 relative z-10 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30 mb-8 backdrop-blur-sm shadow-lg">
            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center mr-3 animate-pulse">
              <span className="text-xs">🌟</span>
            </div>
            <span className="text-sm text-cyan-300 font-semibold">Join 10K+ Active Developers</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Community Hub
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            Connect with fellow learners, join collaborative challenges, and share your coding journey with our vibrant community of developers and algorithm enthusiasts.
          </p>
          
          {/* Enhanced Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
            <div className="text-center animate-fade-in delay-200 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-400/20 shadow-xl hover:shadow-cyan-500/20 transition-all duration-500 group">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">👥</span>
              </div>
              <div className="text-3xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors">10K+</div>
              <div className="text-sm text-gray-300 font-medium">Active Members</div>
              <div className="text-xs text-cyan-400/60 mt-1">Growing daily</div>
            </div>
            <div className="text-center animate-fade-in delay-300 bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-400/20 shadow-xl hover:shadow-purple-500/20 transition-all duration-500 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">🏆</span>
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors">50+</div>
              <div className="text-sm text-gray-300 font-medium">Daily Challenges</div>
              <div className="text-xs text-purple-400/60 mt-1">Fresh content</div>
            </div>
            <div className="text-center animate-fade-in delay-400 bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-xl rounded-2xl p-6 border border-green-400/20 shadow-xl hover:shadow-green-500/20 transition-all duration-500 group">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">💬</span>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2 group-hover:text-green-300 transition-colors">24/7</div>
              <div className="text-sm text-gray-300 font-medium">Community Support</div>
              <div className="text-xs text-green-400/60 mt-1">Always online</div>
            </div>
            <div className="text-center animate-fade-in delay-500 bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-400/20 shadow-xl hover:shadow-orange-500/20 transition-all duration-500 group">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-lg">⚡</span>
              </div>
              <div className="text-3xl font-bold text-orange-400 mb-2 group-hover:text-orange-300 transition-colors">95%</div>
              <div className="text-sm text-gray-300 font-medium">Success Rate</div>
              <div className="text-xs text-orange-400/60 mt-1">Problem solving</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Visual Separator */}
        <div className="relative flex items-center justify-center my-16">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-4 animate-pulse"></div>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
        </div>
        
        {/* Quick Action Bar */}
        <div className="max-w-5xl mx-auto mb-12 animate-fade-in delay-300">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-cyan-500/10 border border-cyan-400/20 rounded-xl px-4 py-2 hover:bg-cyan-500/20 transition-all cursor-pointer group">
                  <span className="text-cyan-300 text-sm font-medium group-hover:text-cyan-200">🚀 Join Discussion</span>
                </div>
                <div className="flex items-center bg-purple-500/10 border border-purple-400/20 rounded-xl px-4 py-2 hover:bg-purple-500/20 transition-all cursor-pointer group">
                  <span className="text-purple-300 text-sm font-medium group-hover:text-purple-200">💡 Share Solution</span>
                </div>
                <div className="flex items-center bg-green-500/10 border border-green-400/20 rounded-xl px-4 py-2 hover:bg-green-500/20 transition-all cursor-pointer group">
                  <span className="text-green-300 text-sm font-medium group-hover:text-green-200">🎯 Start Challenge</span>
                </div>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                <span>2,847 members online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Enhanced Layout */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in delay-400">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                
                {/* Social Hub - Enhanced */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 group relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-600/5 rounded-3xl"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-lg">🚀</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">Social Hub</h3>
                          <p className="text-sm text-gray-400">Connect and collaborate</p>
                        </div>
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-xl px-3 py-1">
                        <span className="text-xs text-cyan-300 font-medium">LIVE</span>
                      </div>
                    </div>
                    <SocialHub />
                  </div>
                </div>
                
                {/* Collaborative Learning - Enhanced */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 group relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-600/5 rounded-3xl"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-lg">🎯</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">Collaborative Learning</h3>
                          <p className="text-sm text-gray-400">Learn together, grow faster</p>
                        </div>
                      </div>
                      <div className="bg-green-500/10 border border-green-400/20 rounded-xl px-3 py-1">
                        <span className="text-xs text-green-300 font-medium">ACTIVE</span>
                      </div>
                    </div>
                    <CollaborativeLearning />
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                
                {/* Featured Community Challenges */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 group relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-red-600/5 rounded-3xl"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-sm">🏆</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">Featured Challenges</h3>
                        <p className="text-xs text-gray-400">Trending competitions</p>
                      </div>
                    </div>
                    <CommunityChallenges 
                      challenges={allChallenges}
                      onJoinChallenge={handleJoinChallenge}
                    />
                  </div>
                </div>
                
                {/* Live Activity Feed */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 group relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-purple-600/5 rounded-3xl"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-400/10 to-transparent rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-sm">📈</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">Live Activity</h3>
                          <p className="text-xs text-gray-400">Real-time updates</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <ActivityFeed 
                      activities={activitiesWithLikes}
                      onLike={handleLikeActivity}
                      onComment={handleCommentActivity}
                    />
                  </div>
                </div>
                
                {/* Advanced Features */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 group relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400/5 to-rose-600/5 rounded-3xl"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-400/10 to-transparent rounded-full blur-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-sm">⚡</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">Advanced Features</h3>
                        <p className="text-xs text-gray-400">Power user tools</p>
                      </div>
                    </div>
                    <AdvancedCollaborativeFeatures />
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
