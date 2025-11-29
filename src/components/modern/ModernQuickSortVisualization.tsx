import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernArrayVisualization, ModernArrayElement } from './ModernArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { 
  BarChart3, 
  Shuffle,
  ArrowUpDown,
  Target,
  GitCommit,
  TrendingUp
} from 'lucide-react';

type PivotStrategy = 'first' | 'last' | 'middle' | 'random';

interface QuickSortStep {
  array: number[];
  sortedIndices: boolean[];
  pivotIndex: number | null;
  low: number;
  high: number;
  i: number | null; // Pointer for elements smaller than pivot
  j: number | null; // Current element being compared
  swapping: [number, number] | null;
  phase: 'partition-start' | 'comparing' | 'preparing-swap' | 'swapping' | 'pivot-swap-prepare' | 'pivot-swap' | 'partition-complete' | 'recursion' | 'complete';
  description: string;
  comparisons: number;
  swaps: number;
}

export const ModernQuickSortVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [originalArray, setOriginalArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42]);
  const [speed, setSpeed] = useState(500);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pivotStrategy, setPivotStrategy] = useState<PivotStrategy>('last');
  
  const animation = useAnimation<QuickSortStep>([], speed);

  const generateNewArray = () => {
    const newArr = Array.from({ length: 11 }, () => Math.floor(Math.random() * 100) + 1);
    setOriginalArray(newArr);
  };

  const generateSteps = async () => {
    setIsGenerating(true);
    animation.setSteps([]);
    await new Promise(resolve => setTimeout(resolve, 10));

    const arr = [...originalArray];
    const sortSteps: QuickSortStep[] = [];
    const sorted = Array(arr.length).fill(false);
    let comparisons = 0;
    let swaps = 0;

    const partition = async (low: number, high: number): Promise<number> => {
      let pivotIdx: number;
      switch (pivotStrategy) {
        case 'first': pivotIdx = low; break;
        case 'middle': pivotIdx = Math.floor((low + high) / 2); break;
        case 'random': pivotIdx = Math.floor(Math.random() * (high - low + 1)) + low; break;
        default: pivotIdx = high;
      }
      
      if (pivotIdx !== high) {
        swaps++;
        [arr[pivotIdx], arr[high]] = [arr[high], arr[pivotIdx]];
        sortSteps.push({ array: [...arr], sortedIndices: [...sorted], pivotIndex: high, low, high, i: null, j: null, swapping: [pivotIdx, high], phase: 'swapping', description: `Pivot Selection: Moved chosen pivot ${arr[high]} to the end for partitioning.`, comparisons, swaps });
      }
      
      const pivotValue = arr[high];
      let i = low - 1;

      sortSteps.push({ array: [...arr], sortedIndices: [...sorted], pivotIndex: high, low, high, i, j: low, swapping: null, phase: 'partition-start', description: `Partitioning subarray from index ${low} to ${high}. Pivot is ${pivotValue}.`, comparisons, swaps });

      for (let j = low; j < high; j++) {
        comparisons++;
        sortSteps.push({ array: [...arr], sortedIndices: [...sorted], pivotIndex: high, low, high, i, j, swapping: null, phase: 'comparing', description: `Comparing element ${arr[j]} with pivot ${pivotValue}.`, comparisons, swaps });

        if (arr[j] < pivotValue) {
          i++;
          if (i !== j) {
            swaps++;
            sortSteps.push({ array: [...arr], sortedIndices: [...sorted], pivotIndex: high, low, high, i, j, swapping: null, phase: 'preparing-swap', description: `${arr[j]} < ${pivotValue}. Preparing to swap ${arr[i]} and ${arr[j]}.`, comparisons, swaps });
            sortSteps.push({ array: [...arr], sortedIndices: [...sorted], pivotIndex: high, low, high, i, j, swapping: [i, j], phase: 'swapping', description: `Swapping ${arr[i]} and ${arr[j]} to move smaller element to the left partition.`, comparisons, swaps });
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        }
      }

      sortSteps.push({ array: [...arr], sortedIndices: [...sorted], pivotIndex: high, low, high, i, j: high, swapping: null, phase: 'pivot-swap-prepare', description: `Partitioning done. Moving pivot ${pivotValue} to its final sorted position.`, comparisons, swaps });
      swaps++;
      sortSteps.push({ array: [...arr], sortedIndices: [...sorted], pivotIndex: high, low, high, i, j: high, swapping: [i + 1, high], phase: 'pivot-swap', description: `Swapping pivot ${pivotValue} with ${arr[i + 1]}.`, comparisons, swaps });
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      
      const finalPivotIndex = i + 1;
      sorted[finalPivotIndex] = true;
      sortSteps.push({ array: [...arr], sortedIndices: [...sorted], pivotIndex: finalPivotIndex, low, high, i: null, j: null, swapping: null, phase: 'partition-complete', description: `Partition complete. Pivot ${pivotValue} is now sorted at index ${finalPivotIndex}.`, comparisons, swaps });

      return finalPivotIndex;
    };

    const quickSort = async (low: number, high: number) => {
      if (low < high) {
        sortSteps.push({ array: [...arr], sortedIndices: [...sorted], pivotIndex: null, low, high, i: null, j: null, swapping: null, phase: 'recursion', description: `Recursively sorting subarray from index ${low} to ${high}.`, comparisons, swaps });
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
      } else if (low >= 0 && low < arr.length) {
        sorted[low] = true;
      }
    };

    sortSteps.push({ array: [...arr], sortedIndices: [...sorted], pivotIndex: null, low: 0, high: arr.length - 1, i: null, j: null, swapping: null, phase: 'recursion', description: 'Starting Quick Sort on the entire array.', comparisons, swaps });
    await quickSort(0, arr.length - 1);
    sortSteps.push({ array: [...arr], sortedIndices: Array(arr.length).fill(true), pivotIndex: null, low: 0, high: arr.length - 1, i: null, j: null, swapping: null, phase: 'complete', description: '🎉 Quick Sort Complete! The array is fully sorted.', comparisons, swaps });

    animation.setSteps(sortSteps);
    setIsGenerating(false);
  };

  useEffect(() => {
    generateSteps();
  }, [originalArray, pivotStrategy]);

  const arrayData = useMemo((): ModernArrayElement[] => {
    if (!animation.steps.length || animation.currentStepIndex >= animation.steps.length) return [];
    
    const currentStep = animation.steps[animation.currentStepIndex];
    if (!currentStep) return [];
    
    return currentStep.array.map((value, index) => {
      let state: ModernArrayElement['state'] = 'normal';
      
      if (currentStep.sortedIndices[index]) {
        state = 'sorted';
      } else if (index === currentStep.pivotIndex) {
        state = 'pivot';
      } else if (currentStep.swapping?.includes(index)) {
        state = 'swapping';
      } else if (index === currentStep.j) {
        state = 'comparing';
      } else if (index === currentStep.i) {
        state = 'current';
      } else if (index >= currentStep.low && index <= currentStep.high) {
        state = 'target';
      }

      return {
        value,
        state,
        label: String(value),
        yOffset: (currentStep.phase === 'preparing-swap' && currentStep.swapping?.includes(index)) || (currentStep.phase === 'pivot-swap-prepare' && (index === currentStep.pivotIndex || index === (currentStep.i ?? -1) + 1)) ? -30 : 0,
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
      { label: 'Pivot', value: currentStep.pivotIndex !== null ? currentStep.array[currentStep.pivotIndex] : '-', icon: <Target className="w-4 h-4" />, color: '#8b5cf6' },
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
      "Quick Sort is a highly efficient, divide-and-conquer sorting algorithm.",
      "It works by selecting a 'pivot' element and partitioning the other elements into two sub-arrays.",
      "Elements less than the pivot go to the left sub-array; elements greater go to the right.",
      "The process is then applied recursively to the sub-arrays.",
      "Average time complexity is O(n log n), but worst-case is O(n²), which depends on pivot selection."
    ],
    pseudocode: [
      "procedure quickSort(A, low, high)",
      "  if low < high then",
      "    pi = partition(A, low, high)",
      "    quickSort(A, low, pi - 1)",
      "    quickSort(A, pi + 1, high)",
      "  end if",
      "end procedure",
      "",
      "procedure partition(A, low, high)",
      "  pivot = A[high]",
      "  i = low - 1",
      "  for j = low to high - 1 do",
      "    if A[j] < pivot then",
      "      i = i + 1",
      "      swap(A[i], A[j])",
      "    end if",
      "  end for",
      "  swap(A[i + 1], A[high])",
      "  return i + 1",
      "end procedure"
    ],
    realWorldUse: [
      "One of the most widely used sorting algorithms, often the default in standard libraries.",
      "Excellent for large datasets due to its fast average-case performance.",
      "Used in various applications, from database management to computer graphics."
    ]
  };

  const currentStepDescription = animation.steps[animation.currentStepIndex]?.description || 'Generating steps...';

  return (
    <ModernVisualizationBase
      title="Quick Sort"
      description="A divide-and-conquer algorithm that picks a pivot and partitions the array around it."
      difficulty="Intermediate"
      category="Sorting"
      complexity={{
        time: "O(n log n) Average",
        space: "O(log n)",
        worst: "O(n²)"
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
        <div className="flex items-center gap-4 pt-2">
            <GitCommit className="w-5 h-5" style={{ color: currentTheme.colors.text }} />
            <label htmlFor="pivot-strategy" className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>Pivot Strategy:</label>
            <select
              id="pivot-strategy"
              value={pivotStrategy}
              onChange={(e) => setPivotStrategy(e.target.value as PivotStrategy)}
              disabled={isGenerating || animation.isPlaying}
              className="px-3 py-1.5 rounded-md text-sm"
              style={{
                backgroundColor: currentTheme.colors.surface + '80',
                color: currentTheme.colors.text,
                border: `1px solid ${currentTheme.colors.border}60`
              }}
            >
              <option value="last">Last Element</option>
              <option value="first">First Element</option>
              <option value="middle">Middle Element</option>
              <option value="random">Random</option>
            </select>
          </div>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernQuickSortVisualization;
