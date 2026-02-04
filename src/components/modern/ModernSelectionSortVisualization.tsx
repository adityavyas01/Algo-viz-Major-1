import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernArrayVisualization } from './ModernArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { 
  BarChart3, 
  ArrowUpDown, 
  Activity,
  Shuffle,
  Target,
  Search,
  TrendingUp
} from 'lucide-react';

interface SelectionSortStep {
  array: number[];
  sortedIndices: boolean[];
  passIndex: number;
  minIndex: number;
  compareIndex: number | null;
  swapping: [number, number] | null;
  phase: 'pass-start' | 'searching' | 'found-minimum' | 'preparing-swap' | 'swapping' | 'pass-complete' | 'complete';
  description: string;
  comparisons: number;
  swaps: number;
}

const ModernSelectionSortVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [originalArray, setOriginalArray] = useState([64, 25, 12, 22, 11, 90, 88, 76, 50, 42]);
  const [speed, setSpeed] = useState(500);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const animation = useAnimation<SelectionSortStep>([], speed);

  const generateNewArray = () => {
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setOriginalArray(newArr);
  };

  const generateSteps = async () => {
    setIsGenerating(true);
    animation.setSteps([]);
    await new Promise(resolve => setTimeout(resolve, 10));

    const arr = [...originalArray];
    const sortSteps: SelectionSortStep[] = [];
    const sorted = Array(arr.length).fill(false);
    let comparisons = 0;
    let swaps = 0;

    sortSteps.push({
      array: [...arr],
      sortedIndices: [...sorted],
      passIndex: -1,
      minIndex: -1,
      compareIndex: null,
      swapping: null,
      phase: 'pass-start',
      description: 'Start of Selection Sort. The goal is to find the smallest element and move it to the front.',
      comparisons,
      swaps
    });

    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      
      sortSteps.push({
        array: [...arr],
        sortedIndices: [...sorted],
        passIndex: i,
        minIndex: i,
        compareIndex: null,
        swapping: null,
        phase: 'pass-start',
        description: `Pass ${i + 1}: Find the minimum element in the unsorted part (from index ${i}). Assume ${arr[i]} is the minimum for now.`,
        comparisons,
        swaps
      });

      for (let j = i + 1; j < arr.length; j++) {
        comparisons++;
        sortSteps.push({
          array: [...arr],
          sortedIndices: [...sorted],
          passIndex: i,
          minIndex: minIdx,
          compareIndex: j,
          swapping: null,
          phase: 'searching',
          description: `Comparing current minimum ${arr[minIdx]} with ${arr[j]}.`,
          comparisons,
          swaps
        });

        if (arr[j] < arr[minIdx]) {
          const oldMin = minIdx;
          minIdx = j;
          sortSteps.push({
            array: [...arr],
            sortedIndices: [...sorted],
            passIndex: i,
            minIndex: minIdx,
            compareIndex: j,
            swapping: null,
            phase: 'found-minimum',
            description: `Found a new minimum! ${arr[minIdx]} at index ${minIdx} is smaller than ${arr[oldMin]}.`,
            comparisons,
            swaps
          });
        }
      }

      if (minIdx !== i) {
        swaps++;
        sortSteps.push({
          array: [...arr],
          sortedIndices: [...sorted],
          passIndex: i,
          minIndex: minIdx,
          compareIndex: null,
          swapping: null,
          phase: 'preparing-swap',
          description: `Minimum for this pass is ${arr[minIdx]}. Preparing to swap it with the element at index ${i} (${arr[i]}).`,
          comparisons,
          swaps
        });
        
        sortSteps.push({
          array: [...arr],
          sortedIndices: [...sorted],
          passIndex: i,
          minIndex: minIdx,
          compareIndex: null,
          swapping: [i, minIdx],
          phase: 'swapping',
          description: `Swapping ${arr[i]} and ${arr[minIdx]}.`,
          comparisons,
          swaps
        });

        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        
        sortSteps.push({
          array: [...arr],
          sortedIndices: [...sorted],
          passIndex: i,
          minIndex: i,
          compareIndex: null,
          swapping: null,
          phase: 'pass-complete',
          description: `Swap complete. The new sorted element is ${arr[i]}.`,
          comparisons,
          swaps
        });
      } else {
         sortSteps.push({
          array: [...arr],
          sortedIndices: [...sorted],
          passIndex: i,
          minIndex: i,
          compareIndex: null,
          swapping: null,
          phase: 'pass-complete',
          description: `The element ${arr[i]} is already in its correct position. No swap needed.`,
          comparisons,
          swaps
        });
      }
      
      sorted[i] = true;
    }

    sorted[arr.length - 1] = true;
    sortSteps.push({
      array: [...arr],
      sortedIndices: [...sorted],
      passIndex: -1,
      minIndex: -1,
      compareIndex: null,
      swapping: null,
      phase: 'complete',
      description: '🎉 Selection Sort Complete! The array is now fully sorted.',
      comparisons,
      swaps
    });

    animation.setSteps(sortSteps);
    setIsGenerating(false);
  };

  useEffect(() => {
    generateSteps();
  }, [originalArray]);

  const arrayData = useMemo(() => {
    if (!animation.steps.length || animation.currentStepIndex >= animation.steps.length) return [];
    
    const currentStep = animation.steps[animation.currentStepIndex];
    if (!currentStep) return [];
    
    return currentStep.array.map((value, index) => {
      let state: 'normal' | 'comparing' | 'swapping' | 'sorted' | 'current' | 'minimum' = 'normal';
      if (currentStep.sortedIndices[index]) {
        state = 'sorted';
      } else if (currentStep.swapping?.includes(index)) {
        state = 'swapping';
      } else if (index === currentStep.passIndex) {
        state = 'current';
      } else if (index === currentStep.minIndex) {
        state = 'minimum';
      } else if (index === currentStep.compareIndex) {
        state = 'comparing';
      }

      return {
        value,
        state,
        label: String(value),
        yOffset: currentStep.phase === 'preparing-swap' && (index === currentStep.passIndex || index === currentStep.minIndex) ? -30 : 0,
        isSwapping: state === 'swapping',
        swapWith: currentStep.swapping ? (currentStep.swapping[0] === index ? currentStep.swapping[1] - index : currentStep.swapping[0] - index) : 0,
      };
    });
  }, [animation.steps, animation.currentStepIndex]);

  const metrics = useMemo(() => {
    if (!animation.steps.length || animation.currentStepIndex >= animation.steps.length) return [];
    
    const currentStep = animation.steps[animation.currentStepIndex];
    if (!currentStep) return [];
    
    return [
      { label: 'Progress', value: `${Math.round((animation.currentStepIndex / Math.max(1, animation.steps.length - 1)) * 100)}%`, icon: <TrendingUp className="w-4 h-4" />, color: currentTheme.colors.primary },
      { label: 'Comparisons', value: currentStep.comparisons, icon: <BarChart3 className="w-4 h-4" />, color: '#f59e0b' },
      { label: 'Swaps', value: currentStep.swaps, icon: <ArrowUpDown className="w-4 h-4" />, color: '#ef4444' },
      { label: 'Pass', value: currentStep.passIndex !== -1 ? currentStep.passIndex + 1 : '-', icon: <Activity className="w-4 h-4" />, color: '#8b5cf6' }
    ];
  }, [animation.steps, animation.currentStepIndex, currentTheme]);

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
    totalSteps: animation.steps.length,
    speed,
    onSpeedChange: setSpeed,
    isGenerating,
    onGenerate: generateNewArray,
  };

  const educational = {
    keyPoints: [
      "Selection Sort divides the list into a sorted and an unsorted sublist.",
      "It repeatedly finds the minimum element from the unsorted sublist.",
      "The found minimum is then swapped with the first element of the unsorted sublist.",
      "This process effectively grows the sorted sublist by one element per pass.",
      "It is an in-place algorithm but not stable."
    ],
    pseudocode: [
      "procedure selectionSort(A : list of items)",
      "  n = length(A)",
      "  for i = 0 to n - 1 do",
      "    minIndex = i",
      "    for j = i + 1 to n do",
      "      if A[j] < A[minIndex] then",
      "        minIndex = j",
      "      end if",
      "    end for",
      "    swap(A[i], A[minIndex])",
      "  end for",
      "end procedure"
    ],
    realWorldUse: [
      "Useful when memory write operations are expensive, as it minimizes swaps (O(n)).",
      "Suitable for small datasets where simplicity is valued over speed.",
      "A good introductory algorithm for teaching sorting concepts like in-place sorting."
    ]
  };

  const currentStepDescription = animation.steps[animation.currentStepIndex]?.description || 'Generating steps...';

  return (
    <ModernVisualizationBase
      title="Selection Sort"
      description="An in-place comparison sorting algorithm that repeatedly selects the minimum element from the unsorted part and puts it at the beginning."
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

export default ModernSelectionSortVisualization;
