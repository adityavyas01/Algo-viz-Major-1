import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernArrayVisualization, ModernArrayElement } from './ModernArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { 
  BarChart3, 
  ArrowUpDown, 
  Layers, 
  Eye,
  TrendingUp,
  Shuffle
} from 'lucide-react';

interface HeapSortStep {
  array: number[];
  heapSize: number;
  phase: 'heapify' | 'extract' | 'complete';
  description: string;
  comparisons: number;
  swaps: number;
  // Visual indicators
  rootIndex: number | null;
  comparing: [number, number] | null;
  swapping: [number, number] | null;
  sortedIndices: number[];
}

export const ModernHeapSortVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [originalArray, setOriginalArray] = useState([64, 25, 12, 22, 11, 90, 88, 76, 50, 42]);
  const [steps, setSteps] = useState<HeapSortStep[]>([]);
  const [speed, setSpeed] = useState(800);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const animation = useAnimation(steps.length, speed);

  const generateNewArray = () => {
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setOriginalArray(newArr);
  };

  const generateSteps = async () => {
    setIsGenerating(true);
    setSteps([]);
    await new Promise(resolve => setTimeout(resolve, 10));

    const arr = [...originalArray];
    const sortSteps: HeapSortStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices: number[] = [];

    const heapify = (n: number, i: number, phase: 'heapify' | 'extract') => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      sortSteps.push({
        array: [...arr], heapSize: n, phase, rootIndex: i, comparing: null, swapping: null, sortedIndices: [...sortedIndices],
        description: `Heapifying subtree at index ${i} (value ${arr[i]}).`,
        comparisons, swaps,
      });

      if (left < n) {
        comparisons++;
        sortSteps.push({
          array: [...arr], heapSize: n, phase, rootIndex: i, comparing: [i, left], swapping: null, sortedIndices: [...sortedIndices],
          description: `Comparing parent ${arr[i]} with left child ${arr[left]}.`,
          comparisons, swaps,
        });
        if (arr[left] > arr[largest]) {
          largest = left;
        }
      }

      if (right < n) {
        comparisons++;
        sortSteps.push({
          array: [...arr], heapSize: n, phase, rootIndex: i, comparing: [largest, right], swapping: null, sortedIndices: [...sortedIndices],
          description: `Comparing current largest ${arr[largest]} with right child ${arr[right]}.`,
          comparisons, swaps,
        });
        if (arr[right] > arr[largest]) {
          largest = right;
        }
      }

      if (largest !== i) {
        swaps++;
        sortSteps.push({
          array: [...arr], heapSize: n, phase, rootIndex: i, comparing: null, swapping: [i, largest], sortedIndices: [...sortedIndices],
          description: `Swapping parent ${arr[i]} with larger child ${arr[largest]}.`,
          comparisons, swaps,
        });
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        sortSteps.push({
          array: [...arr], heapSize: n, phase, rootIndex: largest, comparing: null, swapping: null, sortedIndices: [...sortedIndices],
          description: `Swap complete. Recursively heapifying new subtree.`,
          comparisons, swaps,
        });
        heapify(n, largest, phase);
      }
    };

    sortSteps.push({
      array: [...arr], heapSize: arr.length, phase: 'heapify', rootIndex: null, comparing: null, swapping: null, sortedIndices: [],
      description: 'Starting Heap Sort. First, build a max heap.',
      comparisons, swaps,
    });

    // Build max heap
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      heapify(arr.length, i, 'heapify');
    }

    sortSteps.push({
      array: [...arr], heapSize: arr.length, phase: 'heapify', rootIndex: null, comparing: null, swapping: null, sortedIndices: [],
      description: 'Max heap built. The largest element is at the root.',
      comparisons, swaps,
    });

    // Extract elements from heap
    for (let i = arr.length - 1; i > 0; i--) {
      swaps++;
      sortSteps.push({
        array: [...arr], heapSize: i + 1, phase: 'extract', rootIndex: null, comparing: null, swapping: [0, i], sortedIndices: [...sortedIndices],
        description: `Extracting max element ${arr[0]}. Swapping with the end of the heap.`,
        comparisons, swaps,
      });
      [arr[0], arr[i]] = [arr[i], arr[0]];
      sortedIndices.push(i);
      sortSteps.push({
        array: [...arr], heapSize: i, phase: 'extract', rootIndex: null, comparing: null, swapping: null, sortedIndices: [...sortedIndices],
        description: `Element ${arr[i]} is now sorted. Reducing heap size.`,
        comparisons, swaps,
      });
      heapify(i, 0, 'extract');
    }
    sortedIndices.push(0);

    sortSteps.push({
      array: [...arr], heapSize: 0, phase: 'complete', rootIndex: null, comparing: null, swapping: null, sortedIndices: [...sortedIndices],
      description: '🎉 Heap Sort Complete! The array is fully sorted.',
      comparisons, swaps,
    });

    setSteps(sortSteps);
    setIsGenerating(false);
  };

  useEffect(() => {
    generateSteps();
  }, [originalArray]);

  const currentStepData = useMemo(() => {
    if (!steps.length || animation.currentStep >= steps.length) return null;
    return steps[animation.currentStep];
  }, [steps, animation.currentStep]);

  const arrayData = useMemo((): ModernArrayElement[] => {
    if (!currentStepData) return [];
    return currentStepData.array.map((val, idx) => {
      let state: ModernArrayElement['state'] = 'normal';
      if (currentStepData.sortedIndices.includes(idx)) {
        state = 'sorted';
      } else if (currentStepData.swapping?.includes(idx)) {
        state = 'swapping';
      } else if (currentStepData.comparing?.includes(idx)) {
        state = 'comparing';
      } else if (currentStepData.rootIndex === idx) {
        state = 'current';
      } else if (idx >= currentStepData.heapSize) {
        state = 'inactive';
      }
      return { value: val, state };
    });
  }, [currentStepData]);

  const metrics = useMemo(() => {
    if (!currentStepData) return [];
    return [
      { label: 'Progress', value: `${Math.round((animation.currentStep / Math.max(1, steps.length - 1)) * 100)}%`, icon: <TrendingUp className="w-4 h-4" />, color: currentTheme.colors.primary },
      { label: 'Comparisons', value: currentStepData.comparisons, icon: <BarChart3 className="w-4 h-4" />, color: '#f59e0b' },
      { label: 'Swaps', value: currentStepData.swaps, icon: <ArrowUpDown className="w-4 h-4" />, color: '#ef4444' },
      { label: 'Heap Size', value: currentStepData.heapSize, icon: <Layers className="w-4 h-4" />, color: '#8b5cf6' },
      { label: 'Phase', value: currentStepData.phase, icon: <Eye className="w-4 h-4" />, color: '#22c55e' }
    ];
  }, [currentStepData, animation.currentStep, steps.length, currentTheme]);

  const controls = {
    isPlaying: animation.isPlaying,
    onPlay: animation.play,
    onPause: animation.pause,
    onReset: () => {
      animation.reset();
      generateSteps();
    },
    onStepForward: animation.stepForward,
    onStepBack: animation.stepBackward,
    currentStep: animation.currentStep,
    totalSteps: steps.length,
    speed,
    onSpeedChange: setSpeed,
    isGenerating,
    onGenerate: generateNewArray,
  };

  const educational = {
    keyPoints: [
      "Heap Sort is an in-place sorting algorithm with O(n log n) time complexity.",
      "It works by first transforming the array into a max heap.",
      "A max heap is a binary tree where the value of each parent node is greater than or equal to its children.",
      "The algorithm then repeatedly swaps the root (largest element) with the last element of the heap and reduces the heap size by one.",
      "After each swap, it calls 'heapify' on the root to maintain the max heap property."
    ],
    pseudocode: [
      "procedure heapSort(A)",
      "  buildMaxHeap(A)",
      "  for i from A.length - 1 down to 1:",
      "    swap A[0] with A[i]",
      "    heapify(A, 0, i) // i is the heap size",
      "",
      "procedure buildMaxHeap(A)",
      "  for i from floor(A.length / 2) - 1 down to 0:",
      "    heapify(A, i, A.length)",
      "",
      "procedure heapify(A, index, heapSize)",
      "  // Sift down to maintain heap property",
      "end procedure"
    ],
    realWorldUse: [
      "Excellent for situations where a guaranteed O(n log n) performance is needed.",
      "Used in the kernel for process scheduling in some operating systems.",
      "The heap data structure itself is widely used for implementing Priority Queues."
    ]
  };

  return (
    <ModernVisualizationBase
      title="Heap Sort"
      description="An efficient, in-place sorting algorithm that uses a binary heap data structure to build a sorted array."
      difficulty="Advanced"
      category="Sorting"
      complexity={{
        time: "O(n log n)",
        space: "O(1)"
      }}
      controls={controls}
      metrics={metrics}
      educational={educational}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <ModernArrayVisualization data={arrayData} useValueAsHeight={true} style3D={true} />
        <div 
          className="w-full p-4 rounded-lg text-center transition-colors duration-300"
          style={{ 
            backgroundColor: currentTheme.colors.surface,
            border: `1px solid ${currentTheme.colors.border}`
          }}
        >
          <p className="text-md font-semibold" style={{ color: currentTheme.colors.text }}>
            {currentStepData?.description || 'Generating steps...'}
          </p>
        </div>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernHeapSortVisualization;