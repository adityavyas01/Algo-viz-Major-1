import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernArrayVisualization, ModernArrayElement } from './ModernArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { 
  BarChart3, 
  TrendingUp,
  Shuffle,
  Filter,
  ArchiveRestore
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RadixSortStep {
  array: number[];
  buckets: number[][];
  phase: 'distributing' | 'collecting' | 'complete';
  distributingIndex: number | null;
  collectingBucket: number | null;
  exp: number;
  description: string;
  passes: number;
  movements: number;
}

const ModernRadixSortVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [originalArray, setOriginalArray] = useState([170, 45, 75, 90, 802, 24, 2, 66]);
  const [steps, setSteps] = useState<RadixSortStep[]>([]);
  const [speed, setSpeed] = useState(500);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const animation = useAnimation(steps.length, speed);

  const generateNewArray = () => {
    const newArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 900) + 1);
    setOriginalArray(newArr);
  };

  const generateSteps = async () => {
    setIsGenerating(true);
    setSteps([]);
    await new Promise(resolve => setTimeout(resolve, 10));

    const arr = [...originalArray];
    const sortSteps: RadixSortStep[] = [];
    let passes = 0;
    let movements = 0;

    const getMax = (a: number[]) => Math.max(...a);

    const countingSort = (exp: number) => {
      passes++;
      let buckets: number[][] = Array.from({ length: 10 }, () => []);
      
      sortSteps.push({
        array: [...arr], buckets: [...buckets.map(b => [...b])], phase: 'distributing', distributingIndex: null, collectingBucket: null, exp,
        description: `Pass ${passes}: Sorting by the ${exp}s place.`,
        passes, movements,
      });

      // Distribute numbers into buckets
      for (let i = 0; i < arr.length; i++) {
        movements++;
        const digit = Math.floor(arr[i] / exp) % 10;
        buckets[digit].push(arr[i]);
        sortSteps.push({
          array: [...arr], buckets: [...buckets.map(b => [...b])], phase: 'distributing', distributingIndex: i, collectingBucket: null, exp,
          description: `Distributing ${arr[i]}. Digit is ${digit}. Placing in bucket ${digit}.`,
          passes, movements,
        });
      }

      sortSteps.push({
        array: [...arr], buckets: [...buckets.map(b => [...b])], phase: 'collecting', distributingIndex: null, collectingBucket: null, exp,
        description: `Distribution for ${exp}s place complete. Now collecting from buckets.`,
        passes, movements,
      });

      // Collect numbers from buckets
      let idx = 0;
      for (let i = 0; i < 10; i++) {
        if (buckets[i].length > 0) {
            sortSteps.push({
                array: [...arr], buckets: [...buckets.map(b => [...b])], phase: 'collecting', distributingIndex: null, collectingBucket: i, exp,
                description: `Collecting from bucket ${i}.`,
                passes, movements,
            });
        }
        for (let j = 0; j < buckets[i].length; j++) {
          movements++;
          arr[idx] = buckets[i][j];
          idx++;
          sortSteps.push({
            array: [...arr], buckets: [...buckets.map(b => [...b])], phase: 'collecting', distributingIndex: null, collectingBucket: i, exp,
            description: `Moved ${buckets[i][j]} from bucket ${i} back to the array.`,
            passes, movements,
          });
        }
      }
    };

    const max = getMax(arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSort(exp);
    }

    sortSteps.push({
      array: [...arr], buckets: Array.from({ length: 10 }, () => []), phase: 'complete', distributingIndex: null, collectingBucket: null, exp: 0,
      description: '🎉 Radix Sort Complete! The array is fully sorted.',
      passes, movements,
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
    return currentStepData.array.map((val, idx) => ({
      value: val,
      state: currentStepData.phase === 'complete' ? 'sorted' :
             currentStepData.distributingIndex === idx ? 'current' : 'normal',
    }));
  }, [currentStepData]);

  const metrics = useMemo(() => {
    if (!currentStepData) return [];
    return [
      { label: 'Progress', value: `${Math.round((animation.currentStep / Math.max(1, steps.length - 1)) * 100)}%`, icon: <TrendingUp className="w-4 h-4" />, color: currentTheme.colors.primary },
      { label: 'Passes (Digits)', value: currentStepData.passes, icon: <Filter className="w-4 h-4" />, color: '#f59e0b' },
      { label: 'Movements', value: currentStepData.movements, icon: <ArchiveRestore className="w-4 h-4" />, color: '#8b5cf6' },
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
      "Radix Sort is a non-comparative sorting algorithm.",
      "It sorts integers by processing individual digits.",
      "For each digit place (e.g., 1s, 10s, 100s), it distributes numbers into buckets.",
      "After distribution, it collects the numbers from the buckets back into the array.",
      "It's very efficient for large sets of integers, with a time complexity of O(d * (n + b)), where d is digits, n is items, and b is the base (10).",
    ],
    pseudocode: [
      "procedure radixSort(A)",
      "  max = findMax(A)",
      "  exp = 1",
      "  while max / exp > 0:",
      "    countingSortByDigit(A, exp)",
      "    exp *= 10",
      "",
      "procedure countingSortByDigit(A, exp)",
      "  buckets = new array of 10 lists",
      "  for number in A:",
      "    digit = (number / exp) % 10",
      "    add number to buckets[digit]",
      "  collect numbers from buckets back into A",
      "end procedure"
    ],
    realWorldUse: [
      "Used in suffix array construction algorithms.",
      "Can be highly effective for sorting large integer keys.",
      "Applicable in scenarios where data can be sorted lexicographically (e.g., strings)."
    ]
  };

  return (
    <ModernVisualizationBase
      title="Radix Sort"
      description="A non-comparative sorting algorithm that sorts integers by grouping digits of the same place value."
      difficulty="Advanced"
      category="Sorting"
      complexity={{
        time: "O(d(n+k))",
        space: "O(n+k)"
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
        
        <div className="w-full grid grid-cols-5 gap-2">
          {currentStepData?.buckets.map((bucket, i) => (
            <div 
              key={i} 
              className="p-2 rounded-lg min-h-[100px] transition-all"
              style={{
                backgroundColor: currentTheme.colors.surface,
                border: `2px solid ${currentStepData.collectingBucket === i ? currentTheme.colors.primary : currentTheme.colors.border}`
              }}
            >
              <h3 
                className="text-center font-bold text-lg mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                {i}
              </h3>
              <div className="flex flex-col items-center gap-1">
                <AnimatePresence>
                  {bucket.map((val, j) => (
                    <motion.div
                      key={`${i}-${j}-${val}`}
                      layoutId={`bucket-item-${val}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="w-full text-center p-1 rounded"
                      style={{ backgroundColor: currentTheme.colors.primary + '80' }}
                    >
                      {val}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernRadixSortVisualization;