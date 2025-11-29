import React, { useState, useEffect } from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';
import { useAnimation } from '@/hooks/useAnimation';
import { generatePushSteps, generatePopSteps, StackStep } from '@/lib/algorithms/data-structures/stack';
import { Play, Pause, RefreshCw, StepForward } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ModernStackVisualization: React.FC = () => {
  const [stack, setStack] = useState<number[]>([5, 8, 3]);
  const [inputValue, setInputValue] = useState<string>('12');

  const {
    currentStep,
    steps,
    setSteps,
    isPlaying,
    play,
    pause,
    reset,
    nextStep,
    currentStepIndex,
  } = useAnimation<StackStep>([]);

  useEffect(() => {
    if (currentStep) {
      setStack(currentStep.stack);
    }
  }, [currentStep]);

  const handlePush = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      const newSteps = generatePushSteps(stack, value);
      setSteps(newSteps);
      setInputValue('');
    }
  };

  const handlePop = () => {
    const newSteps = generatePopSteps(stack);
    setSteps(newSteps);
  };

  const handleReset = () => {
    reset();
    setStack([5, 8, 3]);
    setSteps([]);
  };

  const displayedStack = currentStep ? currentStep.stack : stack;
  const highlightedIndex = currentStep ? currentStep.highlightedIndex : null;
  const description = currentStep ? currentStep.description : "Perform an action to start the visualization.";

  const interactiveControls = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <Card className="bg-gray-800/50">
        <CardHeader><CardTitle className="text-base">Operations</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-end gap-2">
            <div className="grid flex-1 items-center gap-1.5">
              <Label htmlFor="stack-input">Value to Push</Label>
              <Input
                id="stack-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePush()}
                placeholder="Enter a number"
                className="bg-gray-900"
                disabled={isPlaying}
              />
            </div>
            <Button onClick={handlePush} disabled={isPlaying}>Push</Button>
          </div>
          <Button onClick={handlePop} variant="destructive" className="w-full" disabled={isPlaying}>Pop</Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50">
        <CardHeader><CardTitle className="text-base">Controls</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex gap-2">
            <Button onClick={isPlaying ? pause : play} className="w-full" disabled={steps.length === 0 || currentStepIndex === steps.length - 1}>
              {isPlaying ? <Pause className="w-4 h-4 mr-2"/> : <Play className="w-4 h-4 mr-2"/>}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={nextStep} className="w-full" disabled={isPlaying || steps.length === 0 || currentStepIndex === steps.length - 1}><StepForward className="w-4 h-4 mr-2"/>Next</Button>
          </div>
          <Button onClick={handleReset} className="w-full" variant="secondary"><RefreshCw className="w-4 h-4 mr-2"/>Reset</Button>
        </CardContent>
      </Card>
    </div>
  );

  const visualization = (
    <div className="h-96 p-4 flex flex-col justify-end items-center bg-gray-900/50 rounded-lg border border-gray-700 relative">
      <div className="flex flex-col-reverse gap-2 w-24">
        <AnimatePresence>
          {displayedStack.map((value, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              exit={{ 
                opacity: 0, 
                y: -50, 
                scale: 0.8,
                transition: { duration: 0.3 }
              }}
              className={`w-full h-12 rounded-md flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${highlightedIndex === index ? 'bg-yellow-500 ring-2 ring-yellow-300' : 'bg-sky-500'}`}
            >
              {value}
            </motion.div>
          ))}
        </AnimatePresence>
        {displayedStack.length === 0 && <div className="text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Stack is empty</div>}
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-gray-400 h-6">{description}</div>
    </div>
  );

  return (
    <ModernVisualizationBase
      title="Stack"
      description="A stack is a Last-In, First-Out (LIFO) data structure. Use the controls to push new elements onto the top of the stack or pop the most recently added element."
      interactiveControls={interactiveControls}
      difficulty="Beginner"
      category="Data Structures"
      complexity={{
        time: "Access: O(n), Search: O(n), Insertion: O(1), Deletion: O(1)",
        space: "O(n)"
      }}
    >
      {visualization}
    </ModernVisualizationBase>
  );
};

export default ModernStackVisualization;
