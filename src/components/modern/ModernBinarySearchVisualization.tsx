import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernArrayVisualization, ModernArrayElement } from './ModernArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  Target,
  BarChart3,
  TrendingUp,
  Shuffle,
  ArrowLeftRight,
} from 'lucide-react';

interface BinarySearchStep {
  array: number[];
  low: number;
  high: number;
  mid: number | null;
  phase: 'searching' | 'found' | 'not-found';
  description: string;
  comparisons: number;
}

export const ModernBinarySearchVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [originalArray, setOriginalArray] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78, 89, 94]);
  const [target, setTarget] = useState('23');
  const [speed, setSpeed] = useState(1000);
  const [isGenerating, setIsGenerating] = useState(false);

  const animation = useAnimation<BinarySearchStep>([], speed);

  const generateNewArray = () => {
    const newArr = Array.from({ length: 13 }, () => Math.floor(Math.random() * 100))
      .sort((a, b) => a - b)
      .filter((v, i, a) => a.indexOf(v) === i); // Ensure unique values
    setOriginalArray(newArr);
  };

  const generateSteps = (arr: number[], targetValue: number) => {
    setIsGenerating(true);
    animation.setSteps([]);
    
    const searchSteps: BinarySearchStep[] = [];
    let comparisons = 0;
    let low = 0;
    let high = arr.length - 1;

    searchSteps.push({
      array: [...arr], low, high, mid: null, phase: 'searching', comparisons,
      description: `Start searching for ${targetValue}. Search range is from index ${low} to ${high}.`,
    });

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      
      searchSteps.push({
        array: [...arr], low, high, mid, phase: 'searching', comparisons,
        description: `Calculate middle index: mid = floor((${low} + ${high}) / 2) = ${mid}.`,
      });
      
      comparisons++;
      searchSteps.push({
        array: [...arr], low, high, mid, phase: 'searching', comparisons,
        description: `Comparing target ${targetValue} with element at mid index ${mid} (value: ${arr[mid]}).`,
      });

      if (arr[mid] === targetValue) {
        searchSteps.push({
          array: [...arr], low, high, mid, phase: 'found', comparisons,
          description: `🎉 Found ${targetValue} at index ${mid}!`,
        });
        animation.setSteps(searchSteps);
        setIsGenerating(false);
        return;
      } else if (arr[mid] < targetValue) {
        const newLow = mid + 1;
        searchSteps.push({
          array: [...arr], low, high, mid, phase: 'searching', comparisons,
          description: `${arr[mid]} < ${targetValue}. Target must be in the right half. Updating low to ${newLow}.`,
        });
        low = newLow;
      } else {
        const newHigh = mid - 1;
        searchSteps.push({
          array: [...arr], low, high, mid, phase: 'searching', comparisons,
          description: `${arr[mid]} > ${targetValue}. Target must be in the left half. Updating high to ${newHigh}.`,
        });
        high = newHigh;
      }
    }

    searchSteps.push({
      array: [...arr], low, high, mid: null, phase: 'not-found', comparisons,
      description: `Search range is empty (low > high). Target ${targetValue} not found.`,
    });

    animation.setSteps(searchSteps);
    setIsGenerating(false);
  };

  const handleSearch = () => {
    const targetValue = parseInt(target);
    if (!isNaN(targetValue)) {
      animation.reset();
      generateSteps(originalArray, targetValue);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [originalArray]);

  const currentStepData = useMemo(() => {
    if (!animation.steps.length || animation.currentStepIndex >= animation.steps.length) return null;
    return animation.steps[animation.currentStepIndex];
  }, [animation.steps, animation.currentStepIndex]);

  const arrayData = useMemo((): ModernArrayElement[] => {
    if (!currentStepData) return [];
    return currentStepData.array.map((value, index) => {
      let state: ModernArrayElement['state'] = 'inactive';
      if (index >= currentStepData.low && index <= currentStepData.high) {
        state = 'normal';
      }
      if (index === currentStepData.mid) {
        state = 'current';
      }
      if (currentStepData.phase === 'found' && index === currentStepData.mid) {
        state = 'sorted';
      }
      return { value, state };
    });
  }, [currentStepData]);

  const pointers = useMemo(() => {
    if (!currentStepData) return [];
    const ptrs: Array<{ index: number; label: string; color: string; position: 'top' | 'bottom' }> = [
      { index: currentStepData.low, label: 'low', color: currentTheme.colors.primary, position: 'bottom' },
      { index: currentStepData.high, label: 'high', color: currentTheme.colors.primary, position: 'bottom' },
    ];
    if (currentStepData.mid !== null) {
      ptrs.push({ index: currentStepData.mid, label: 'mid', color: currentTheme.colors.warning, position: 'top' });
    }
    return ptrs;
  }, [currentStepData, currentTheme]);

  const metrics = useMemo(() => {
    if (!currentStepData) return [];
    return [
      { label: 'Progress', value: `${Math.round((animation.currentStepIndex / Math.max(1, animation.steps.length - 1)) * 100)}%`, icon: <TrendingUp className="w-4 h-4" />, color: currentTheme.colors.primary },
      { label: 'Comparisons', value: currentStepData.comparisons, icon: <BarChart3 className="w-4 h-4" />, color: '#f59e0b' },
      { label: 'Search Range', value: `[${currentStepData.low}, ${currentStepData.high}]`, icon: <ArrowLeftRight className="w-4 h-4" />, color: '#22c55e' },
      { label: 'Target', value: target, icon: <Target className="w-4 h-4" />, color: '#ef4444' },
    ];
  }, [currentStepData, animation.currentStepIndex, animation.steps.length, currentTheme, target]);

  const controls = {
    isPlaying: animation.isPlaying,
    onPlay: animation.play,
    onPause: animation.pause,
    onReset: handleSearch,
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
      "Binary Search requires the array to be sorted before searching.",
      "It works by repeatedly dividing the search interval in half.",
      "If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise, narrow it to the upper half.",
      "This 'divide and conquer' strategy results in a highly efficient logarithmic time complexity.",
    ],
    pseudocode: [
      "procedure binarySearch(A, target)",
      "  low = 0",
      "  high = A.length - 1",
      "  while low <= high:",
      "    mid = floor((low + high) / 2)",
      "    if A[mid] < target:",
      "      low = mid + 1",
      "    else if A[mid] > target:",
      "      high = mid - 1",
      "    else:",
      "      return mid // Found",
      "  return -1 // Not found",
      "end procedure"
    ],
    realWorldUse: [
      "Finding a word in a dictionary or a contact in a phone book.",
      "Used in debugger tools to pinpoint where a bug was introduced (git bisect).",
      "Core component of many more complex algorithms and data structures."
    ]
  };

  return (
    <ModernVisualizationBase
      title="Binary Search"
      description="An efficient algorithm for finding an item from a sorted list of items by repeatedly dividing the search interval in half."
      difficulty="Beginner"
      category="Searching"
      complexity={{
        time: "O(log n)",
        space: "O(1)"
      }}
      controls={controls}
      metrics={metrics}
      educational={educational}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex justify-center items-center gap-4">
          <Input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-24"
            placeholder="Target"
            disabled={isGenerating || animation.isPlaying}
          />
          <Button onClick={handleSearch} disabled={isGenerating || animation.isPlaying}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
        
        <div 
          className="w-full p-4 rounded-lg text-center transition-colors duration-300"
          style={{ 
            backgroundColor: currentTheme.colors.surface,
            border: `1px solid ${currentTheme.colors.border}`
          }}
        >
          <p className="text-md font-semibold" style={{ color: currentTheme.colors.text }}>
            {currentStepData?.description || 'Enter a target and click search.'}
          </p>
        </div>

        <ModernArrayVisualization
          data={arrayData}
          showIndices
          showValues
          pointers={pointers}
          showPointers
          useValueAsHeight={true}
          style3D={true}
        />
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernBinarySearchVisualization;
