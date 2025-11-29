import React, { useState, useEffect } from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion } from 'framer-motion';
import { useAnimation } from '@/hooks/useAnimation';
import { generateEnqueueSteps, generateDequeueSteps, QueueStep } from '@/lib/algorithms/data-structures/queue';
import { Play, Pause, RefreshCw, StepForward } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ModernQueueVisualization: React.FC = () => {
  const [queue, setQueue] = useState<number[]>([3, 8, 5]);
  const [inputValue, setInputValue] = useState<string>('13');

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
  } = useAnimation<QueueStep>([]);

  useEffect(() => {
    if (currentStep) {
      setQueue(currentStep.queue);
    }
  }, [currentStep]);

  const handleEnqueue = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      const newSteps = generateEnqueueSteps(queue, value);
      setSteps(newSteps);
      setInputValue('');
    }
  };

  const handleDequeue = () => {
    const newSteps = generateDequeueSteps(queue);
    setSteps(newSteps);
  };

  const handleReset = () => {
    reset();
    setQueue([3, 8, 5]);
    setSteps([]);
  };

  const displayedQueue = currentStep ? currentStep.queue : queue;
  const highlightedIndex = currentStep ? currentStep.highlightedIndex : null;
  const description = currentStep ? currentStep.description : "Perform an action to start the visualization.";

  const interactiveControls = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <Card className="bg-gray-800/50">
        <CardHeader><CardTitle className="text-base">Operations</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-end gap-2">
            <div className="grid flex-1 items-center gap-1.5">
              <Label htmlFor="queue-input">Value to Enqueue</Label>
              <Input
                id="queue-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleEnqueue()}
                placeholder="Enter a number"
                className="bg-gray-900"
                disabled={isPlaying}
              />
            </div>
            <Button onClick={handleEnqueue} disabled={isPlaying}>Enqueue</Button>
          </div>
          <Button onClick={handleDequeue} variant="destructive" className="w-full" disabled={isPlaying}>Dequeue</Button>
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
    <div className="h-64 p-4 flex flex-col justify-center items-center bg-gray-900/50 rounded-lg border border-gray-700 relative">
      <div className="flex gap-2 items-center">
        <AnimatePresence>
          {displayedQueue.map((value, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: 1,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              exit={{ 
                opacity: 0, 
                x: -50, 
                scale: 0.8,
                transition: { duration: 0.3 }
              }}
              className={`w-20 h-20 rounded-md flex items-center justify-center text-white font-bold text-lg flex-shrink-0 transition-all duration-300 ${highlightedIndex === index ? 'bg-yellow-500 ring-2 ring-yellow-300' : 'bg-purple-500'}`}
            >
              {value}
            </motion.div>
          ))}
        </AnimatePresence>
        {displayedQueue.length === 0 && <div className="text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Queue is empty</div>}
      </div>
      {displayedQueue.length > 0 && (
        <>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-white">REAR</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-white">FRONT</div>
        </>
      )}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 text-sm text-gray-400 h-6">{description}</div>
    </div>
  );

  return (
    <ModernVisualizationBase
      title="Queue"
      description="A queue is a First-In, First-Out (FIFO) data structure."
      difficulty="Beginner"
      category="Data Structures"
      complexity={{
        time: "O(1)",
        space: "O(n)",
      }}
      interactiveControls={interactiveControls}
    >
      {visualization}
    </ModernVisualizationBase>
  );
};

export default ModernQueueVisualization;
