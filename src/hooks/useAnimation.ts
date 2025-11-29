
import { useState, useRef, useCallback, useEffect } from 'react';

export const useAnimation = <T,>(initialSteps: T[], initialSpeed: number = 500) => {
  const [steps, setSteps] = useState<T[]>(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = currentStepIndex >= 0 && currentStepIndex < steps.length ? steps[currentStepIndex] : null;

  const play = useCallback(() => {
    if (steps.length === 0) return;
    setIsPlaying(true);
    if (currentStepIndex === -1) {
      setCurrentStepIndex(0);
    }
  }, [steps, currentStepIndex]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(-1);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentStepIndex, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        nextStep();
      }, speed);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, nextStep]);
  
  useEffect(() => {
    if (steps.length > 0 && currentStepIndex === -1 && isPlaying) {
      setCurrentStepIndex(0);
    }
  }, [steps, isPlaying, currentStepIndex]);

  return {
    currentStep,
    steps,
    setSteps,
    currentStepIndex,
    setCurrentStepIndex,
    isPlaying,
    play,
    pause,
    reset,
    nextStep,
    prevStep,
    speed,
    setSpeed,
  };
};
