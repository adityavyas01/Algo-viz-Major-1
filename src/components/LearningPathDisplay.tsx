import React from 'react';
import { LearningPathHeader } from './learning-path/LearningPathHeader';
import { LearningPathModule } from './learning-path/LearningPathModule';
import { EmptyLearningPath } from './learning-path/EmptyLearningPath';
import { useLearningPath } from './learning-path/useLearningPath';

export const LearningPathDisplay: React.FC = () => {
  const { learningPath, loading, startLearning, completeModule } = useLearningPath();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!learningPath) {
    return <EmptyLearningPath />;
  }

  return (
    <div className="space-y-6">
      <LearningPathHeader
        name={learningPath.name}
        description={learningPath.description}
        completion_percentage={learningPath.completion_percentage}
        estimated_weeks={learningPath.estimated_weeks}
        moduleCount={learningPath.modules.length}
      />

      <div className="space-y-4">
        {learningPath.modules.map((module, index) => {
          const isNextToUnlock = !module.is_unlocked && 
            (index === 0 || learningPath.modules[index - 1]?.is_completed);

          return (
            <LearningPathModule
              key={module.id}
              module={module}
              isNextToUnlock={isNextToUnlock}
              onStartLearning={startLearning}
              onCompleteModule={completeModule}
            />
          );
        })}
      </div>
    </div>
  );
};