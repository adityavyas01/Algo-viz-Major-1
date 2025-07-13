
import { useState, useRef, useCallback, useEffect } from 'react';

interface AnimationState {
  isPlaying: boolean;
  currentStep: number;
  speed: number;
}

export const useAnimation = (totalSteps: number, initialSpeed: number = 500) => {
  const [state, setState] = useState<AnimationState>({
    isPlaying: false,
    currentStep: 0,
    speed: initialSpeed
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const play = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false, currentStep: 0 }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stepForward = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, totalSteps - 1)
    }));
  }, [totalSteps]);

  const stepBackward = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  }, []);

  const setSpeed = useCallback((newSpeed: number) => {
    setState(prev => ({ ...prev, speed: newSpeed }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, totalSteps - 1))
    }));
  }, [totalSteps]);

  useEffect(() => {
    if (state.isPlaying && state.currentStep < totalSteps - 1) {
      intervalRef.current = setInterval(() => {
        setState(prev => {
          if (prev.currentStep >= totalSteps - 1) {
            return { ...prev, isPlaying: false };
          }
          return { ...prev, currentStep: prev.currentStep + 1 };
        });
      }, 1000 - state.speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isPlaying, state.speed, state.currentStep, totalSteps]);

  return {
    ...state,
    play,
    pause,
    reset,
    stepForward,
    stepBackward,
    setSpeed,
    goToStep
  };
};
