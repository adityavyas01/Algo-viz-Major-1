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
  swapping: boolean;
  sorted: boolean[];
  comparisons: number;
  swaps: number;
  phase: 'comparing' | 'swapping' | 'complete';
  description: string;
}

export const ModernBubbleSortVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [originalArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 76, 50]);
  const [steps, setSteps] = useState<BubbleSortStep[]>([]);
  const [speed, setSpeed] = useState(500);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const animation = useAnimation(steps.length, speed);

  // Generate bubble sort steps with enhanced descriptions
  const generateSteps = async () => {
    setIsGenerating(true);
    const arr = [...originalArray];
    const sortSteps: BubbleSortStep[] = [];
    const sorted = Array(arr.length).fill(false);
    let comparisons = 0;
    let swaps = 0;

    // Initial state
    sortSteps.push({
      array: [...arr],
      comparing: null,
      swapping: false,
      sorted: [...sorted],
      comparisons,
      swaps,
      phase: 'comparing',
      description: `Starting Bubble Sort with ${arr.length} elements. We'll compare adjacent elements and swap them if they're in the wrong order.`
    });

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        comparisons++;
        
        // Show comparison
        sortSteps.push({
          array: [...arr],
          comparing: [j, j + 1] as [number, number],
          swapping: false,
          sorted: [...sorted],
          comparisons,
          swaps,
          phase: 'comparing',
          description: `Comparing ${arr[j]} and ${arr[j + 1]}. ${arr[j] > arr[j + 1] ? 'Need to swap!' : 'Already in correct order.'}`
        });

        if (arr[j] > arr[j + 1]) {
          swaps++;
          
          // Show swapping
          sortSteps.push({
            array: [...arr],
            comparing: [j, j + 1] as [number, number],
            swapping: true,
            sorted: [...sorted],
            comparisons,
            swaps,
            phase: 'swapping',
            description: `Swapping ${arr[j]} and ${arr[j + 1]} because ${arr[j]} > ${arr[j + 1]}`
          });

          // Perform swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          
          // Show after swap
          sortSteps.push({
            array: [...arr],
            comparing: [j, j + 1] as [number, number],
            swapping: false,
            sorted: [...sorted],
            comparisons,
            swaps,
            phase: 'comparing',
            description: `Swapped! Now ${arr[j]} comes before ${arr[j + 1]}`
          });
        }
      }
      
      // Mark element as sorted
      sorted[arr.length - 1 - i] = true;
      sortSteps.push({
        array: [...arr],
        comparing: null,
        swapping: false,
        sorted: [...sorted],
        comparisons,
        swaps,
        phase: 'comparing',
        description: `Pass ${i + 1} complete! Element ${arr[arr.length - 1 - i]} is now in its final position.`
      });
      
      // Small delay for visualization
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Mark first element as sorted
    sorted[0] = true;
    
    // Final state
    sortSteps.push({
      array: [...arr],
      comparing: null,
      swapping: false,
      sorted: [...sorted],
      comparisons,
      swaps,
      phase: 'complete',
      description: `🎉 Bubble Sort Complete! All elements are now sorted in ascending order. Total: ${comparisons} comparisons, ${swaps} swaps.`
    });

    setSteps(sortSteps);
    setIsGenerating(false);
  };

  useEffect(() => {
    generateSteps();
  }, [originalArray]);

  // Convert step data to modern array format
  const arrayData = useMemo(() => {
    if (!steps.length || animation.currentStep >= steps.length) return [];
    
    const currentStep = steps[animation.currentStep];
    
    return currentStep.array.map((value, index) => ({
      value,
      state: currentStep.sorted[index] ? 'sorted' as const :
             currentStep.comparing && currentStep.comparing.includes(index) ? 
               (currentStep.swapping ? 'swapping' as const : 'comparing' as const) :
             'normal' as const,
      glow: currentStep.comparing?.includes(index) || false,
      pulse: currentStep.sorted[index] || false,
      shake: currentStep.swapping && currentStep.comparing?.includes(index) || false
    }));
  }, [steps, animation.currentStep]);

  // Generate metrics
  const metrics = useMemo(() => {
    if (!steps.length || animation.currentStep >= steps.length) return [];
    
    const currentStep = steps[animation.currentStep];
    const progress = ((animation.currentStep / (steps.length - 1)) * 100);
    const sortedCount = currentStep.sorted.filter(s => s).length;
    
    return [
      {
        label: 'Step',
        value: `${animation.currentStep + 1} / ${steps.length}`,
        icon: <Activity className="w-4 h-4" />,
        color: currentTheme.colors.primary,
        trend: 'up' as const
      },
      {
        label: 'Comparisons',
        value: currentStep.comparisons,
        icon: <BarChart3 className="w-4 h-4" />,
        color: '#f59e0b',
        trend: 'up' as const
      },
      {
        label: 'Swaps',
        value: currentStep.swaps,
        icon: <ArrowUpDown className="w-4 h-4" />,
        color: '#ef4444',
        trend: currentStep.phase === 'swapping' ? 'up' as const : 'neutral' as const
      },
      {
        label: 'Sorted',
        value: `${sortedCount}/${originalArray.length}`,
        icon: <Target className="w-4 h-4" />,
        color: '#10b981',
        trend: sortedCount > 0 ? 'up' as const : 'neutral' as const
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
    onStepForward: animation.stepForward,
    onStepBack: animation.stepBackward,
    currentStep: animation.currentStep,
    totalSteps: steps.length,
    speed,
    onSpeedChange: setSpeed,
    disabled: isGenerating
  };

  const educational = {
    keyPoints: [
      "Bubble Sort compares adjacent elements and swaps them if they're in the wrong order",
      "After each pass, the largest unsorted element 'bubbles up' to its correct position",
      "The algorithm gets its name from the way larger elements bubble to the top",
      "Each pass reduces the number of elements to check by one",
      "The algorithm continues until no more swaps are needed"
    ],
    pseudocode: [
      "function bubbleSort(array):",
      "  for i = 0 to array.length - 1:",
      "    for j = 0 to array.length - i - 2:",
      "      if array[j] > array[j + 1]:",
      "        swap(array[j], array[j + 1])",
      "  return array"
    ],
    realWorldUse: [
      "Educational tool for teaching sorting concepts and algorithm analysis",
      "Useful for small datasets where simplicity is more important than efficiency",
      "Good for detecting if a list is already sorted (can be optimized to O(n) in best case)",
      "Sometimes used in embedded systems with severe memory constraints"
    ]
  };

  const currentStepDescription = steps[animation.currentStep]?.description || '';

  return (
    <ModernVisualizationBase
      title="Bubble Sort Algorithm"
      description="Watch as elements 'bubble' to their correct positions through adjacent comparisons and swaps"
      difficulty="Beginner"
      category="Sorting Algorithm"
      complexity={{
        time: "O(n²)",
        space: "O(1)"
      }}
      controls={controls}
      metrics={metrics}
      educational={educational}
      className="space-y-6"
    >
      <div className="space-y-6">
        {/* Current step description */}
        <div 
          className="p-4 rounded-xl text-center"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '40',
            border: `1px solid ${currentTheme.colors.border}40`
          }}
        >
          <p className="text-lg font-medium" style={{ color: currentTheme.colors.text }}>
            {currentStepDescription}
          </p>
        </div>

        {/* Main visualization */}
        <ModernArrayVisualization
          data={arrayData}
          width={900}
          height={250}
          showIndices={true}
          showValues={true}
          animations={true}
          style3D={true}
          className="mx-auto"
        />

        {/* Algorithm progress bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium" style={{ color: currentTheme.colors.textSecondary }}>
              Algorithm Progress
            </span>
            <span className="text-sm font-mono" style={{ color: currentTheme.colors.text }}>
              {Math.round((animation.currentStep / Math.max(steps.length - 1, 1)) * 100)}%
            </span>
          </div>
          <div 
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: currentTheme.colors.surface + '40' }}
          >
            <div 
              className="h-full transition-all duration-300 rounded-full"
              style={{
                width: `${(animation.currentStep / Math.max(steps.length - 1, 1)) * 100}%`,
                background: `linear-gradient(90deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.secondary} 100%)`
              }}
            />
          </div>
        </div>

        {/* Additional controls */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => generateSteps()}
            disabled={isGenerating || animation.isPlaying}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
            style={{
              backgroundColor: currentTheme.colors.surface + '60',
              color: currentTheme.colors.text,
              border: `1px solid ${currentTheme.colors.border}40`
            }}
          >
            <Shuffle className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'New Array'}
          </button>
        </div>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernBubbleSortVisualization;
