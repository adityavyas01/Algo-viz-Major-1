import React from "react";
import { Header } from "@/components/Header";
import { ChallengeMode } from "@/components/ChallengeMode";
import { LeetCodeQuestions } from "@/components/LeetCodeQuestions";
import DailyChallengesPanel from "@/components/DailyChallengesPanel";
import { Challenge } from "@/types/gamification";

const Challenges: React.FC = () => {
  // Mock challenges data
  const mockChallenges: Challenge[] = [
    {
      id: '1',
      name: 'Two Sum Challenge',
      description: 'Find two numbers in array that add up to target',
      algorithmId: 'two-sum',
      timeLimit: 600, // 10 minutes
      difficulty: 'easy',
      points: 100,
      completed: false,
      attempts: 0
    },
    {
      id: '2',
      name: 'Binary Search Speed Run',
      description: 'Implement binary search in under 5 minutes',
      algorithmId: 'binary-search',
      timeLimit: 300, // 5 minutes
      difficulty: 'medium',
      points: 200,
      completed: true,
      bestTime: 240,
      attempts: 3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Coding Challenges
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChallengeMode 
              challenges={mockChallenges}
              onChallengeComplete={(id, time) => console.log('Challenge completed:', id, time)}
            />
            <div className="mt-8">
              <LeetCodeQuestions 
                topicId="arrays"
                topicName="Arrays & Hashing"
              />
            </div>
          </div>
          <div>
            <DailyChallengesPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
