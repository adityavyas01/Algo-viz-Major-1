import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernArrayVisualization } from './ModernArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { 
  BarChart3, 
  Clock, 
  ArrowUpDown, 
  Activity,
  Shuffle,
  TrendingUp,
  Target,
  Zap
} from 'lucide-react';

interface BubbleSortStep {
  array: number[];
  comparing: [number, number] | null;
  swapping: [number, number] | null;
  sortedIndices: boolean[];
  comparisons: number;
  swaps: number;
  phase: 'comparing' | 'preparing-swap' | 'swapping' | 'complete' | 'pass-complete';
  description: string;
}

export const ModernBubbleSortVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [originalArray, setOriginalArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 76, 50]);
  const [steps, setSteps] = useState<BubbleSortStep[]>([]);
  const [speed, setSpeed] = useState(500);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const animation = useAnimation<BubbleSortStep>(steps, speed);

  const generateNewArray = () => {
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setOriginalArray(newArr);
  };

  // Generate bubble sort steps with enhanced descriptions
  const generateSteps = async () => {
    setIsGenerating(true);
    setSteps([]);
    await new Promise(resolve => setTimeout(resolve, 10));

    const arr = [...originalArray];
    const sortSteps: BubbleSortStep[] = [];
    const sorted = Array(arr.length).fill(false);
    let comparisons = 0;
    let swaps = 0;

    sortSteps.push({
      array: [...arr],
      comparing: null,
      swapping: null,
      sortedIndices: [...sorted],
      comparisons,
      swaps,
      phase: 'comparing',
      description: `Start with an unsorted array of ${arr.length} elements. The goal is to sort it in ascending order.`
    });

    for (let i = 0; i < arr.length - 1; i++) {
      let passSwaps = 0;
      for (let j = 0; j < arr.length - i - 1; j++) {
        comparisons++;
        
        sortSteps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapping: null,
          sortedIndices: [...sorted],
          comparisons,
          swaps,
          phase: 'comparing',
          description: `Comparing elements at index ${j} (${arr[j]}) and ${j + 1} (${arr[j + 1]}).`
        });

        if (arr[j] > arr[j + 1]) {
          passSwaps++;
          swaps++;
          
          sortSteps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: null,
            sortedIndices: [...sorted],
            comparisons,
            swaps,
            phase: 'preparing-swap',
            description: `Since ${arr[j]} > ${arr[j + 1]}, they are in the wrong order. Preparing to swap.`
          });
          
          sortSteps.push({
            array: [...arr],
            comparing: null,
            swapping: [j, j + 1],
            sortedIndices: [...sorted],
            comparisons,
            swaps,
            phase: 'swapping',
            description: `Swapping ${arr[j]} and ${arr[j + 1]}.`
          });

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          
          sortSteps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: null,
            sortedIndices: [...sorted],
            comparisons,
            swaps,
            phase: 'comparing',
            description: `Swap complete. The array is now updated.`
          });
        } else {
          sortSteps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: null,
            sortedIndices: [...sorted],
            comparisons,
            swaps,
            phase: 'comparing',
            description: `${arr[j]} <= ${arr[j + 1]}. No swap needed. They are in the correct relative order.`
          });
        }
      }
      
      sorted[arr.length - 1 - i] = true;
      sortSteps.push({
        array: [...arr],
        comparing: null,
        swapping: null,
        sortedIndices: [...sorted],
        comparisons,
        swaps,
        phase: 'pass-complete',
        description: `Pass ${i + 1} complete. The largest unsorted element, ${arr[arr.length - 1 - i]}, has 'bubbled up' to its final sorted position.`
      });
      
      if (passSwaps === 0) {
        for (let k = 0; k < arr.length - i - 1; k++) {
          sorted[k] = true;
        }
        sortSteps.push({
          array: [...arr],
          comparing: null,
          swapping: null,
          sortedIndices: [...sorted],
          comparisons,
          swaps,
          phase: 'complete',
          description: `Optimization: No swaps occurred in this pass, so the array is already sorted. Halting early.`
        });
        break;
      }
    }

    sorted.fill(true);
    
    sortSteps.push({
      array: [...arr],
      comparing: null,
      swapping: null,
      sortedIndices: [...sorted],
      comparisons,
      swaps,
      phase: 'complete',
      description: `🎉 Bubble Sort Complete! The array is fully sorted. Total comparisons: ${comparisons}, Total swaps: ${swaps}.`
    });

    animation.setSteps(sortSteps);
    setIsGenerating(false);
  };

  useEffect(() => {
    generateSteps();
  }, [originalArray]);

  const arrayData = useMemo(() => {
    const currentStep = animation.currentStep;
    if (!currentStep || !currentStep.array) {
      // Show initial array when no animation is active
      return originalArray.map(value => ({
        value,
        state: 'normal' as const,
        label: String(value),
        yOffset: 0,
        isSwapping: false,
        swapWith: 0,
      }));
    }
    
    return currentStep.array.map((value, index) => {
      let state: 'normal' | 'comparing' | 'swapping' | 'sorted' = 'normal';
      if (currentStep.sortedIndices[index]) {
        state = 'sorted';
      } else if (currentStep.comparing?.includes(index) || currentStep.swapping?.includes(index)) {
        state = currentStep.swapping ? 'swapping' : 'comparing';
      }

      return {
        value,
        state,
        label: String(value),
        yOffset: currentStep.phase === 'preparing-swap' && currentStep.comparing?.includes(index) ? -30 : 0,
        isSwapping: state === 'swapping',
        swapWith: currentStep.swapping ? (currentStep.swapping[0] === index ? 1 : -1) : 0,
      };
    });
  }, [steps, animation.currentStep]);

  const metrics = useMemo(() => {
    const currentStep = animation.currentStep;
    if (!currentStep) {
      return [
        {
          label: 'Progress',
          value: '0%',
          icon: <TrendingUp className="w-4 h-4" />,
          color: currentTheme.colors.primary,
        },
        {
          label: 'Comparisons',
          value: 0,
          icon: <BarChart3 className="w-4 h-4" />,
          color: '#f59e0b',
        },
        {
          label: 'Swaps',
          value: 0,
          icon: <ArrowUpDown className="w-4 h-4" />,
          color: '#ef4444',
        },
        {
          label: 'Sorted',
          value: `0/${originalArray.length}`,
          icon: <Target className="w-4 h-4" />,
          color: '#10b981',
        }
      ];
    }
    
    const sortedCount = currentStep.sortedIndices.filter(s => s).length;
    
    return [
      {
        label: 'Progress',
        value: `${Math.round((animation.currentStepIndex / Math.max(1, steps.length - 1)) * 100)}%`,
        icon: <TrendingUp className="w-4 h-4" />,
        color: currentTheme.colors.primary,
      },
      {
        label: 'Comparisons',
        value: currentStep.comparisons,
        icon: <BarChart3 className="w-4 h-4" />,
        color: '#f59e0b',
      },
      {
        label: 'Swaps',
        value: currentStep.swaps,
        icon: <ArrowUpDown className="w-4 h-4" />,
        color: '#ef4444',
      },
      {
        label: 'Sorted',
        value: `${sortedCount}/${originalArray.length}`,
        icon: <Target className="w-4 h-4" />,
        color: '#10b981',
      }
    ];
  }, [steps, animation.currentStep, currentTheme, originalArray.length]);

  const controls = {
    isPlaying: animation.isPlaying,
    onPlay: animation.play,
    onPause: animation.pause,
    onReset: () => {
      animation.reset();
      generateSteps();
    },
    onStepForward: animation.nextStep,
    onStepBack: animation.prevStep,
    currentStep: animation.currentStepIndex,
    totalSteps: steps.length,
    speed,
    onSpeedChange: setSpeed,
    isGenerating,
    onGenerate: generateNewArray,
  };

  const educational = {
    keyPoints: [
      "Bubble Sort is a simple comparison-based sorting algorithm.",
      "It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
      "The pass through the list is repeated until the list is sorted.",
      "The algorithm gets its name from the way smaller or larger elements 'bubble' to the top of the list.",
      "It is inefficient for large lists, and is not a practical sorting algorithm."
    ],
    pseudocode: [
      "procedure bubbleSort(A : list of sortable items)",
      "  n = length(A)",
      "  repeat",
      "    swapped = false",
      "    for i = 1 to n-1 inclusive do",
      "      if A[i-1] > A[i] then",
      "        swap(A[i-1], A[i])",
      "        swapped = true",
      "      end if",
      "    end for",
      "    n = n - 1",
      "  until not swapped",
      "end procedure"
    ],
    realWorldUse: [
      "Primarily used for educational purposes to introduce the concept of sorting algorithms.",
      "Can be useful for very small datasets where simplicity is more important than efficiency.",
      "A variation can be used to check if a list is already sorted in O(n) time.",
    ]
  };

  const currentStepDescription = animation.currentStep?.description || 'Generating steps...';

  return (
    <ModernVisualizationBase
      title="Bubble Sort"
      description="A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
      difficulty="Beginner"
      category="Sorting"
      complexity={{
        time: "O(n²)",
        space: "O(1)"
      }}
      controls={controls}
      metrics={metrics}
      educational={educational}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <ModernArrayVisualization
          data={arrayData}
          useValueAsHeight={true}
          style3D={true}
        />
        <div 
          className="w-full p-4 rounded-lg text-center transition-colors duration-300"
          style={{ 
            backgroundColor: currentTheme.colors.surface,
            border: `1px solid ${currentTheme.colors.border}`
          }}
        >
          <p className="text-md font-semibold" style={{ color: currentTheme.colors.text }}>
            {currentStepDescription}
          </p>
        </div>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernBubbleSortVisualization;
