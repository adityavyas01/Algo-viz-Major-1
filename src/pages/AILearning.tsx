
import React from 'react';
import { Header } from '@/components/Header';
import { AILearning as AILearningComponent } from '@/components/AILearning';

const AILearning = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-8" id="main-content">
        <div className="container mx-auto px-4">
          <AILearningComponent />
        </div>
      </div>
    </>
  );
};

export default AILearning;
