
import React from 'react';
import { Header } from '@/components/Header';
import { GamificationDashboard } from '@/components/GamificationDashboard';
import { AuthAwareFeature } from '@/components/AuthAwareFeature';

const Gamification = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <AuthAwareFeature
          requiresAuth={true}
          featureName="Gamification System"
          benefit="Unlock achievements, compete on leaderboards, earn rewards, and track your learning streaks. Make learning algorithms fun and competitive!"
        >
          <GamificationDashboard />
        </AuthAwareFeature>
      </div>
    </div>
  );
};

export default Gamification;
