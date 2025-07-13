
import React from 'react';
import { Header } from '@/components/Header';
import { CollaborativeLearning as CollaborativeLearningComponent } from '@/components/CollaborativeLearning';

const CollaborativeLearning = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-8" id="main-content">
        <div className="container mx-auto px-4">
          <CollaborativeLearningComponent />
        </div>
      </div>
    </>
  );
};

export default CollaborativeLearning;
