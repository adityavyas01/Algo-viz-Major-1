import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LearningHub } from '@/components/LearningHub';
import LearningPage from './LearningPage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const LearnPageRouter: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
            <Header />
            <main className="container mx-auto px-6 py-8">
                <LearningHub />
            </main>
            <Footer />
        </div>
    );
  }

  return <LearningPage />;
};

export default LearnPageRouter;
