import React from "react";
import { Header } from "@/components/Header";
import { LearningHub } from "@/components/LearningHub";
import { LearningPathComponent } from "@/components/LearningPath";
import { AILearning } from "@/components/AILearning";
import { LearningEnhancement } from "@/components/LearningEnhancement";

const Learning: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Learning Center
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <LearningHub />
            <div className="mt-8">
              <AILearning />
            </div>
          </div>
          <div>
            <LearningPathComponent />
            <div className="mt-8">
              <LearningEnhancement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
