import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernArrayVisualization, ModernArrayElement } from './ModernArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { 
  BarChart3, 
  Shuffle,
  GitMerge,
  Copy,
  Layers,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MergeSortStep {
  array: number[];
  level: number;
  range: [number, number];
  left: number[];
  right: number[];
  merged: number[];
  isMerging: boolean;
  compare: [number, number] | null;
  description: string;
  comparisons: number;
  merges: number;
}

const ModernMergeSortVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [originalArray, setOriginalArray] = useState([38, 27, 43, 3, 9, 82, 10]);
  const [speed, setSpeed] = useState(800);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const animation = useAnimation<MergeSortStep>([], speed);

  const generateNewArray = () => {
    const newArr = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
    setOriginalArray(newArr);
  };

  const generateSteps = async () => {
    setIsGenerating(true);
    animation.setSteps([]);
    await new Promise(resolve => setTimeout(resolve, 10));

    const arr = [...originalArray];
    const sortSteps: MergeSortStep[] = [];
    let comparisons = 0;
    let merges = 0;

    const mergeSortRecursive = async (array: number[], level: number, offset: number): Promise<number[]> => {
      if (array.length <= 1) {
        return array;
      }

      const mid = Math.floor(array.length / 2);
      const left = array.slice(0, mid);
      const right = array.slice(mid);

      sortSteps.push({
        array: [...arr],
        level,
        range: [offset, offset + array.length - 1],
        left,
        right,
        merged: [],
        isMerging: false,
        compare: null,
        description: `Divide: Splitting array into two halves.`,
        comparisons,
        merges,
      });

      const sortedLeft = await mergeSortRecursive(left, level + 1, offset);
      const sortedRight = await mergeSortRecursive(right, level + 1, offset + mid);

      // Merge
      const merged: number[] = [];
      let i = 0, j = 0;

      sortSteps.push({
        array: [...arr],
        level,
        range: [offset, offset + array.length - 1],
        left: sortedLeft,
        right: sortedRight,
        merged: [],
        isMerging: true,
        compare: null,
        description: `Merge: Preparing to merge sorted halves.`,
        comparisons,
        merges,
      });

      while (i < sortedLeft.length && j < sortedRight.length) {
        comparisons++;
        sortSteps.push({
          array: [...arr],
          level,
          range: [offset, offset + array.length - 1],
          left: sortedLeft,
          right: sortedRight,
          merged: [...merged],
          isMerging: true,
          compare: [sortedLeft[i], sortedRight[j]],
          description: `Comparing ${sortedLeft[i]} and ${sortedRight[j]}.`,
          comparisons,
          merges,
        });

        if (sortedLeft[i] < sortedRight[j]) {
          merged.push(sortedLeft[i]);
          i++;
        } else {
          merged.push(sortedRight[j]);
          j++;
        }
        
        const tempArr = [...arr];
        for(let k=0; k < merged.length; k++) {
          tempArr[offset + k] = merged[k];
        }
        sortSteps.push({
          array: tempArr,
          level,
          range: [offset, offset + array.length - 1],
          left: sortedLeft,
          right: sortedRight,
          merged: [...merged],
          isMerging: true,
          compare: null,
          description: `Added ${merged[merged.length - 1]} to the merged result.`,
          comparisons,
          merges,
        });
      }

      while (i < sortedLeft.length) {
        merged.push(sortedLeft[i]);
        i++;
        const tempArr = [...arr];
        for(let k=0; k < merged.length; k++) {
          tempArr[offset + k] = merged[k];
        }
        sortSteps.push({
          array: tempArr,
          level,
          range: [offset, offset + array.length - 1],
          left: sortedLeft,
          right: sortedRight,
          merged: [...merged],
          isMerging: true,
          compare: null,
          description: `Copying remaining ${merged[merged.length - 1]} from left.`,
          comparisons,
          merges,
        });
      }
      while (j < sortedRight.length) {
        merged.push(sortedRight[j]);
        j++;
        const tempArr = [...arr];
        for(let k=0; k < merged.length; k++) {
          tempArr[offset + k] = merged[k];
        }
        sortSteps.push({
          array: tempArr,
          level,
          range: [offset, offset + array.length - 1],
          left: sortedLeft,
          right: sortedRight,
          merged: [...merged],
          isMerging: true,
          compare: null,
          description: `Copying remaining ${merged[merged.length - 1]} from right.`,
          comparisons,
          merges,
        });
      }
      
      merges++;
      for(let k=0; k < merged.length; k++) {
        arr[offset + k] = merged[k];
      }

      sortSteps.push({
        array: [...arr],
        level,
        range: [offset, offset + array.length - 1],
        left: [],
        right: [],
        merged: [],
        isMerging: false,
        compare: null,
        description: `Subarray from index ${offset} to ${offset + array.length - 1} is now sorted.`,
        comparisons,
        merges,
      });

      return merged;
    };

    await mergeSortRecursive(arr, 0, 0);
    
    sortSteps.push({
      array: [...arr],
      level: 0,
      range: [0, arr.length - 1],
      left: [],
      right: [],
      merged: [],
      isMerging: false,
      compare: null,
      description: '🎉 Merge Sort Complete! The array is fully sorted.',
      comparisons,
      merges,
    });

    animation.setSteps(sortSteps);
    setIsGenerating(false);
  };

  useEffect(() => {
    generateSteps();
  }, [originalArray]);

  const currentStepData = useMemo(() => {
    if (!animation.steps.length || animation.currentStepIndex >= animation.steps.length) return null;
    return animation.steps[animation.currentStepIndex];
  }, [animation.steps, animation.currentStepIndex]);

  const arrayData = useMemo((): ModernArrayElement[] => {
    if (!currentStepData) return [];
    return currentStepData.array.map((val, idx) => {
      let state: ModernArrayElement['state'] = 'normal';
      if (currentStepData.range && idx >= currentStepData.range[0] && idx <= currentStepData.range[1]) {
        state = 'target';
      }
      if (animation.currentStepIndex === animation.steps.length - 1) {
        state = 'sorted';
      }
      return {
        value: val,
        state,
        label: String(val),
      };
    });
  }, [currentStepData, animation.currentStepIndex, animation.steps.length]);

  const metrics = useMemo(() => {
    if (!currentStepData) return [];
    return [
      { label: 'Progress', value: `${Math.round((animation.currentStepIndex / Math.max(1, animation.steps.length - 1)) * 100)}%`, icon: <TrendingUp className="w-4 h-4" />, color: currentTheme.colors.primary },
      { label: 'Comparisons', value: currentStepData.comparisons, icon: <BarChart3 className="w-4 h-4" />, color: '#f59e0b' },
      { label: 'Merges', value: currentStepData.merges, icon: <GitMerge className="w-4 h-4" />, color: '#8b5cf6' },
      { label: 'Recursion Depth', value: currentStepData.level, icon: <Layers className="w-4 h-4" />, color: '#22c55e' },
    ];
  }, [currentStepData, animation.currentStepIndex, animation.steps.length, currentTheme]);

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
      "Merge Sort is a classic 'divide and conquer' algorithm.",
      "It divides the array into two halves, recursively sorts them, and then merges them back together.",
      "The merge step is crucial: it combines two sorted subarrays into a single sorted array.",
      "It has a stable time complexity of O(n log n) in all cases (worst, average, and best).",
      "It's not an in-place sort, requiring O(n) additional space for the merge operation."
    ],
    pseudocode: [
      "procedure mergeSort(A, start, end)",
      "  if start < end then",
      "    mid = floor((start + end) / 2)",
      "    mergeSort(A, start, mid)",
      "    mergeSort(A, mid + 1, end)",
      "    merge(A, start, mid, end)",
      "  end if",
      "end procedure",
      "",
      "procedure merge(A, start, mid, end)",
      "  // Merge the sorted subarrays A[start..mid] and A[mid+1..end]",
      "end procedure"
    ],
    realWorldUse: [
      "Excellent for sorting large datasets, especially when data doesn't fit into memory (external sorting).",
      "Its stability is valuable when the original order of equal elements must be preserved.",
      "Used in various standard library implementations of sorting functions."
    ]
  };

  return (
    <ModernVisualizationBase
      title="Merge Sort"
      description="A divide-and-conquer algorithm that recursively splits the array, sorts the subarrays, and merges them back together."
      difficulty="Intermediate"
      category="Sorting"
      complexity={{
        time: "O(n log n)",
        space: "O(n)"
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
            {currentStepData?.description || 'Generating steps...'}
          </p>
        </div>
        
        <AnimatePresence>
          {currentStepData && currentStepData.isMerging && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center space-y-2"
            >
              <div className="flex space-x-4">
                <div className="p-2 border rounded-lg" style={{borderColor: currentTheme.colors.border}}>
                  <h3 className="text-sm font-semibold mb-2 text-center" style={{color: currentTheme.colors.textSecondary}}>Left Half</h3>
                  <div className="flex gap-2">
                    {currentStepData.left.map((val, i) => (
                      <div key={i} className={`w-10 h-10 flex items-center justify-center rounded ${currentStepData.compare?.[0] === val ? 'bg-blue-500' : 'bg-gray-600'}`}>
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-2 border rounded-lg" style={{borderColor: currentTheme.colors.border}}>
                  <h3 className="text-sm font-semibold mb-2 text-center" style={{color: currentTheme.colors.textSecondary}}>Right Half</h3>
                  <div className="flex gap-2">
                    {currentStepData.right.map((val, i) => (
                      <div key={i} className={`w-10 h-10 flex items-center justify-center rounded ${currentStepData.compare?.[1] === val ? 'bg-blue-500' : 'bg-gray-600'}`}>
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-2 border rounded-lg" style={{borderColor: currentTheme.colors.border}}>
                <h3 className="text-sm font-semibold mb-2 text-center" style={{color: currentTheme.colors.textSecondary}}>Merged</h3>
                <div className="flex gap-2 min-h-[40px]">
                  {currentStepData.merged.map((val, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-10 h-10 flex items-center justify-center rounded bg-green-600"
                    >
                      {val}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernMergeSortVisualization;
