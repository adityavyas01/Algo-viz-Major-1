
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, BookOpen, ArrowRight, Trophy } from 'lucide-react';
import { learningPaths, algorithmDatabase, type LearningPath } from '@/data/algorithmDatabase';
import { useToast } from '@/hooks/use-toast';

export const LearningPathComponent: React.FC = () => {
  const { toast } = useToast();
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [completedAlgorithms, setCompletedAlgorithms] = useState<Set<string>>(new Set());

  const handleAlgorithmComplete = (algorithmId: string) => {
    setCompletedAlgorithms(prev => new Set([...prev, algorithmId]));
  };

  const getPathProgress = (path: LearningPath) => {
    const completed = path.algorithms.filter(algId => completedAlgorithms.has(algId)).length;
    return (completed / path.algorithms.length) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!selectedPath) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Learning Paths</h2>
          <p className="text-white/80">Structured learning journeys to master algorithms and data structures</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {learningPaths.map((path) => {
            const progress = getPathProgress(path);
            const completedCount = path.algorithms.filter(algId => completedAlgorithms.has(algId)).length;
            
            return (
              <Card
                key={path.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                onClick={() => setSelectedPath(path)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-white">{path.name}</CardTitle>
                    <Badge className={`${getDifficultyColor(path.difficulty)} text-white`}>
                      {path.difficulty}
                    </Badge>
                  </div>
                  <p className="text-white/70">{path.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Progress</span>
                      <span className="text-white">{completedCount}/{path.algorithms.length}</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{path.estimatedHours}h estimated</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{path.algorithms.length} algorithms</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button
            onClick={() => setSelectedPath(null)}
            variant="outline"
            size="sm"
            className="border-white/30 text-white hover:bg-white/10 mb-2"
          >
            ← Back to Paths
          </Button>
          <h2 className="text-2xl font-bold text-white">{selectedPath.name}</h2>
          <p className="text-white/70">{selectedPath.description}</p>
        </div>
        <div className="text-right">
          <div className="text-white/70 text-sm">Progress</div>
          <div className="text-white font-bold">
            {selectedPath.algorithms.filter(algId => completedAlgorithms.has(algId)).length}/
            {selectedPath.algorithms.length}
          </div>
        </div>
      </div>

      <Progress value={getPathProgress(selectedPath)} className="w-full" />

      <div className="space-y-4">
        {selectedPath.algorithms.map((algorithmId, index) => {
          const algorithm = algorithmDatabase.find(alg => alg.id === algorithmId);
          const isCompleted = completedAlgorithms.has(algorithmId);
          const isUnlocked = index === 0 || completedAlgorithms.has(selectedPath.algorithms[index - 1]);
          
          if (!algorithm) return null;

          return (
            <Card
              key={algorithmId}
              className={`border-white/20 transition-all ${
                isUnlocked 
                  ? 'bg-white/10 backdrop-blur-sm hover:bg-white/15 cursor-pointer' 
                  : 'bg-white/5 backdrop-blur-sm opacity-50'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' : isUnlocked ? 'bg-cyan-500' : 'bg-white/20'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isUnlocked ? 'text-white' : 'text-white/50'}`}>
                        {algorithm.name}
                      </h3>
                      <p className={`text-sm ${isUnlocked ? 'text-white/70' : 'text-white/40'}`}>
                        {algorithm.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {algorithm.timeComplexity}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {algorithm.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isCompleted && (
                      <Badge className="bg-green-500 text-white">
                        <Trophy className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                    {isUnlocked && !isCompleted && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => {
                            toast({
                              title: "Starting Learning Session",
                              description: `Let's learn about ${algorithm.name}!`,
                            });
                          }}
                          size="sm"
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                        >
                          Start Learning
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                          onClick={() => handleAlgorithmComplete(algorithmId)}
                          size="sm"
                          variant="outline"
                          className="border-white/30 text-white/70 hover:bg-white/10"
                        >
                          Mark Complete
                        </Button>
                      </div>
                    )}
                    {!isUnlocked && (
                      <Badge variant="outline" className="text-white/50 border-white/30">
                        Locked
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
