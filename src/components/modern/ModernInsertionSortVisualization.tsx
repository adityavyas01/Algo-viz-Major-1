import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernArrayVisualization } from './ModernArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { 
  BarChart3, 
  ArrowUpDown, 
  Shuffle,
  Target,
  MoveRight
} from 'lucide-react';

interface InsertionSortStep {
  array: number[];
  currentIndex: number;
  comparingIndex: number;
  isShifting: boolean;
  sortedUntil: number;
  description: string;
  comparisons: number;
  shifts: number;
}

const ModernInsertionSortVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [originalArray, setOriginalArray] = useState([64, 25, 12, 22, 11, 90, 88, 76, 50, 42]);
  const [speed, setSpeed] = useState(500);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const animation = useAnimation<InsertionSortStep>([], speed);

  const generateSteps = async () => {
    setIsGenerating(true);
    const arr = [...originalArray];
    const sortSteps: InsertionSortStep[] = [];
    let comparisons = 0;
    let shifts = 0;

    sortSteps.push({
      array: [...arr],
      currentIndex: -1,
      comparingIndex: -1,
      isShifting: false,
      sortedUntil: 0,
      description: 'Starting Insertion Sort. The first element is considered sorted.',
      comparisons,
      shifts
    });

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      sortSteps.push({
        array: [...arr],
        currentIndex: i,
        comparingIndex: j,
        isShifting: false,
        sortedUntil: i,
        description: `Selecting ${key} as the key to insert into the sorted portion.`,
        comparisons,
        shifts
      });

      while (j >= 0 && arr[j] > key) {
        comparisons++;
        sortSteps.push({
          array: [...arr],
          currentIndex: i,
          comparingIndex: j,
          isShifting: false,
          sortedUntil: i,
          description: `Comparing key ${key} with ${arr[j]}. Since ${arr[j]} > ${key}, we shift.`,
          comparisons,
          shifts
        });
        
        shifts++;
        arr[j + 1] = arr[j];
        
        sortSteps.push({
          array: [...arr],
          currentIndex: i,
          comparingIndex: j,
          isShifting: true,
          sortedUntil: i,
          description: `Shifting ${arr[j]} to the right.`,
          comparisons,
          shifts
        });
        
        j--;
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      
      if (j >= 0) {
        comparisons++;
        sortSteps.push({
          array: [...arr],
          currentIndex: i,
          comparingIndex: j,
          isShifting: false,
          sortedUntil: i,
          description: `Key ${key} is not smaller than ${arr[j]}. Found insertion point.`,
          comparisons,
          shifts
        });
      } else {
         sortSteps.push({
          array: [...arr],
          currentIndex: i,
          comparingIndex: -1,
          isShifting: false,
          sortedUntil: i,
          description: `Reached the beginning of the array. Found insertion point.`,
          comparisons,
          shifts
        });
      }

      arr[j + 1] = key;
      
      sortSteps.push({
        array: [...arr],
        currentIndex: i,
        comparingIndex: j + 1,
        isShifting: false,
        sortedUntil: i,
        description: `Inserting key ${key} at index ${j + 1}.`,
        comparisons,
        shifts
      });
    }

    sortSteps.push({
      array: [...arr],
      currentIndex: -1,
      comparingIndex: -1,
      isShifting: false,
      sortedUntil: arr.length,
      description: '🎉 Insertion Sort Complete! The array is now fully sorted.',
      comparisons,
      shifts
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
    
    return currentStep.array.map((value, index) => ({
      value,
      state: index < currentStep.sortedUntil ? 'sorted' as const :
             index === currentStep.currentIndex ? 'current' as const :
             index === currentStep.comparingIndex ? 'comparing' as const :
             'normal' as const,
      glow: index === currentStep.currentIndex || index === currentStep.comparingIndex,
      shake: currentStep.isShifting && (index === currentStep.comparingIndex || index === currentStep.comparingIndex + 1),
    }));
  }, [animation.steps, animation.currentStepIndex]);

  const metrics = useMemo(() => {
    if (!animation.steps.length || animation.currentStepIndex >= animation.steps.length) return [];
    
    const currentStep = animation.steps[animation.currentStepIndex];
    
    return [
      { label: 'Comparisons', value: currentStep.comparisons, icon: <BarChart3 className="w-4 h-4" />, color: '#f59e0b' },
      { label: 'Shifts', value: currentStep.shifts, icon: <MoveRight className="w-4 h-4" />, color: '#ef4444' },
      { label: 'Current Key', value: currentStep.currentIndex !== -1 ? animation.steps[animation.currentStepIndex].array[currentStep.currentIndex] : '-', icon: <Target className="w-4 h-4" />, color: currentTheme.colors.primary },
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
    disabled: isGenerating
  };

  const educational = {
    keyPoints: [
      "Insertion Sort builds the final sorted array one item at a time.",
      "It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.",
      "However, it provides several advantages: simple implementation, efficient for small data sets, and more efficient in practice than most other simple quadratic algorithms.",
      "It is a stable sort, meaning that it does not change the relative order of elements with equal keys.",
      "It is an in-place sorting algorithm, so it requires a constant amount of additional memory space."
    ],
    pseudocode: [
      "function insertionSort(array):",
      "  for i from 1 to length(array) - 1:",
      "    key = array[i]",
      "    j = i - 1",
      "    while j >= 0 and array[j] > key:",
      "      array[j + 1] = array[j]",
      "      j = j - 1",
      "    array[j + 1] = key",
      "  return array"
    ],
    realWorldUse: [
      "When the data is nearly sorted, insertion sort is particularly efficient.",
      "For small data sets, insertion sort is one of the fastest algorithms.",
      "Used as a part of hybrid sorting algorithms, such as Timsort (used in Python and Java).",
    ]
  };

  const currentStepDescription = steps[animation.currentStep]?.description || '';

  return (
    <ModernVisualizationBase
      title="Insertion Sort"
      description="An in-place comparison sorting algorithm that builds the final sorted array one item at a time."
      difficulty="Beginner"
      category="Sorting Algorithm"
      complexity={{
        time: "O(n²)",
        space: "O(1)",
        best: "O(n)"
      }}
      controls={controls}
      metrics={metrics}
      educational={educational}
      className="space-y-6"
    >
      <div className="space-y-6">
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

        <ModernArrayVisualization
          data={arrayData}
          width={900}
          height={400}
          useValueAsHeight={true}
          style3D={true}
          className="mx-auto"
        />

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              const newArr = [...originalArray].sort(() => Math.random() - 0.5);
              setOriginalArray(newArr);
            }}
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

export default ModernInsertionSortVisualization;
