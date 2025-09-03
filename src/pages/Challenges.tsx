import React, { useState } from "react";
import { Header } from "@/components/Header";
import { ChallengeMode } from "@/components/ChallengeMode";
import { LeetCodeQuestions } from "@/components/LeetCodeQuestions";
import DailyChallengesPanel from "@/components/DailyChallengesPanel";
import { Challenge } from "@/types/gamification";
import { mockChallenges } from "@/data/gamificationData";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Challenges: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(
    new Set(mockChallenges.filter(c => c.completed).map(c => c.id))
  );

  const handleChallengeComplete = (challengeId: string, completionTime?: number) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setCompletedChallenges(prev => new Set([...prev, challengeId]));
    
    // Here you would normally update the challenge completion in your backend
    console.log('Challenge completed:', challengeId, 'Time:', completionTime);
    
    // Update local challenge data
    const challenge = mockChallenges.find(c => c.id === challengeId);
    if (challenge) {
      challenge.completed = true;
      challenge.attempts = (challenge.attempts || 0) + 1;
      if (completionTime && (!challenge.bestTime || completionTime < challenge.bestTime)) {
        challenge.bestTime = completionTime;
      }
    }
  };

  // Use real data from gamificationData with any local updates
  const challengesWithUpdates = mockChallenges.map(challenge => ({
    ...challenge,
    completed: completedChallenges.has(challenge.id)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Coding Challenges
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your skills with timed challenges, practice problems, and daily coding exercises.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
              <ChallengeMode 
                challenges={challengesWithUpdates}
                onChallengeComplete={handleChallengeComplete}
              />
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
              <LeetCodeQuestions 
                topicId="arrays"
                topicName="Arrays & Hashing"
              />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
              <DailyChallengesPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
