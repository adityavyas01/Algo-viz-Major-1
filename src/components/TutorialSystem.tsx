
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, BookOpen, Code, CheckCircle } from 'lucide-react';
import { algorithmDatabase, type AlgorithmExplanation } from '@/data/algorithmDatabase';
import { LeetCodeQuestions } from '@/components/LeetCodeQuestions';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProgress } from '@/hooks/useDatabase';
import { useToast } from '@/hooks/use-toast';

interface TutorialSystemProps {
  algorithmId: string;
}

export const TutorialSystem: React.FC<TutorialSystemProps> = ({ algorithmId }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  // Load user progress for this tutorial
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`tutorial_${algorithmId}_${user.id}`);
      if (savedProgress) {
        const { currentStep: savedStep, completedSteps: savedCompleted, completed } = JSON.parse(savedProgress);
        setCurrentStep(savedStep || 0);
        setCompletedSteps(new Set(savedCompleted || []));
        setTutorialCompleted(completed || false);
      }
    }
  }, [user, algorithmId]);
  
  const algorithm = algorithmDatabase.find(alg => alg.id === algorithmId);
  
  if (!algorithm) {
    return <div className="text-white">Algorithm not found</div>;
  }

  const tutorialSteps = [
    {
      title: 'Overview',
      content: algorithm.explanation.overview,
      type: 'text' as const
    },
    {
      title: 'How It Works',
      content: algorithm.explanation.howItWorks,
      type: 'list' as const
    },
    {
      title: 'Advantages',
      content: algorithm.explanation.advantages,
      type: 'list' as const
    },
    {
      title: 'Disadvantages',
      content: algorithm.explanation.disadvantages,
      type: 'list' as const
    },
    {
      title: 'Pseudocode',
      content: algorithm.pseudocode,
      type: 'code' as const
    },
    {
      title: 'Implementation',
      content: algorithm.implementations[0]?.code || '',
      type: 'code' as const
    },
    {
      title: 'Real-World Applications',
      content: algorithm.explanation.realWorldApplications,
      type: 'list' as const
    }
  ];

  const saveProgress = async (stepIndex: number, completed: Set<number>) => {
    if (user) {
      const progressData = {
        currentStep: stepIndex,
        completedSteps: Array.from(completed),
        completed: completed.size >= tutorialSteps.length
      };
      
      localStorage.setItem(`tutorial_${algorithmId}_${user.id}`, JSON.stringify(progressData));
      
      // If tutorial is completed, save to database
      if (progressData.completed && !tutorialCompleted) {
        try {
          await updateUserProgress(algorithmId, true, undefined, 10); // 10 points for completing tutorial
          setTutorialCompleted(true);
          toast({
            title: "Tutorial Completed! 🎉",
            description: `You've mastered the ${algorithm.name} tutorial! +10 XP earned.`,
          });
        } catch (error) {
          console.error('Error saving tutorial completion:', error);
        }
      }
    }
  };

  const handleNext = async () => {
    if (currentStep < tutorialSteps.length - 1) {
      const newCompleted = new Set([...completedSteps, currentStep]);
      setCompletedSteps(newCompleted);
      setCurrentStep(currentStep + 1);
      await saveProgress(currentStep + 1, newCompleted);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Don't need to save when going backward
    }
  };

  const handleStepComplete = async () => {
    const newCompleted = new Set([...completedSteps, currentStep]);
    setCompletedSteps(newCompleted);
    await saveProgress(currentStep, newCompleted);
    
    toast({
      title: "Step Completed! ✅",
      description: `Step ${currentStep + 1} of ${tutorialSteps.length} completed.`,
    });
  };

  const progressPercentage = (completedSteps.size / tutorialSteps.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{algorithm.name} Tutorial</h2>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">{algorithm.difficulty}</Badge>
            <Badge variant="outline" className="text-white border-white/30">
              {algorithm.category}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white/70 text-sm">Progress</div>
          <div className="text-white font-bold">{completedSteps.size}/{tutorialSteps.length}</div>
        </div>
      </div>

      <Progress value={progressPercentage} className="w-full" />

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            {tutorialSteps[currentStep].type === 'code' ? (
              <Code className="w-5 h-5" />
            ) : (
              <BookOpen className="w-5 h-5" />
            )}
            Step {currentStep + 1}: {tutorialSteps[currentStep].title}
            {completedSteps.has(currentStep) && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tutorialSteps[currentStep].type === 'text' && (
              <p className="text-white/80 leading-relaxed">
                {tutorialSteps[currentStep].content as string}
              </p>
            )}
            
            {tutorialSteps[currentStep].type === 'list' && (
              <ul className="space-y-2">
                {(tutorialSteps[currentStep].content as string[]).map((item, index) => (
                  <li key={index} className="text-white/80 flex items-start gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            
            {tutorialSteps[currentStep].type === 'code' && (
              <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                <code className="text-green-400 text-sm">
                  {tutorialSteps[currentStep].content as string}
                </code>
              </pre>
            )}
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button
              onClick={handlePrev}
              disabled={currentStep === 0}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              {!completedSteps.has(currentStep) && (
                <Button
                  onClick={handleStepComplete}
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500/10"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                disabled={currentStep === tutorialSteps.length - 1}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-2">
        {tutorialSteps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentStep
                ? 'bg-cyan-400'
                : completedSteps.has(index)
                ? 'bg-green-500'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* LeetCode Questions Section */}
      <LeetCodeQuestions 
        topicId={algorithm.id} 
        topicName={algorithm.name}
      />
    </div>
  );
};
