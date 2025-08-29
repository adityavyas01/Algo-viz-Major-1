import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernCanvas } from './ModernCanvas';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack,
  Shuffle,
  BarChart3,
  ArrowUpDown,
  Target,
  Eye,
  BookOpen,
  Layers,
  GitBranch
} from 'lucide-react';

interface MergeSortStep {
  array: number[];
  leftArray?: number[];
  rightArray?: number[];
  mergedArray?: number[];
  currentLevel: number;
  phase: 'divide' | 'merge' | 'complete';
  divideIndices?: { start: number; mid: number; end: number };
  mergeIndices?: { leftIndex: number; rightIndex: number; mergedIndex: number };
  description: string;
  comparisons: number;
  merges: number;
}

interface MergeSortMetrics {
  totalComparisons: number;
  totalMerges: number;
  maxDepth: number;
  startTime: number;
  endTime?: number;
  timeComplexity: string;
  spaceComplexity: string;
}

const ModernMergeSortVisualization: React.FC = () => {
  const { currentTheme, animationSpeed } = useVisualizationTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [originalArray, setOriginalArray] = useState([38, 27, 43, 3, 9, 82, 10]);
  const [steps, setSteps] = useState<MergeSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState(1200);
  const [metrics, setMetrics] = useState<MergeSortMetrics | null>(null);
  const [showPseudocode, setShowPseudocode] = useState(false);

  const generateMergeSortSteps = useCallback((arr: number[]) => {
    const sortSteps: MergeSortStep[] = [];
    let comparisons = 0;
    let merges = 0;
    let maxDepth = 0;

    // Initial state
    sortSteps.push({
      array: [...arr],
      currentLevel: 0,
      phase: 'divide',
      description: 'Starting Merge Sort. We will divide the array into smaller subarrays.',
      comparisons,
      merges
    });

    const startTime = performance.now();

    const mergeSort = (array: number[], start: number, end: number, level: number): number[] => {
      maxDepth = Math.max(maxDepth, level);
      
      if (start >= end) {
        return [array[start]];
      }

      const mid = Math.floor((start + end) / 2);

      // Show divide phase
      sortSteps.push({
        array: [...arr],
        currentLevel: level,
        phase: 'divide',
        divideIndices: { start, mid, end },
        description: `Dividing array from index ${start} to ${end} at middle point ${mid}`,
        comparisons,
        merges
      });

      // Recursively sort left and right halves
      const leftArray = mergeSort(array, start, mid, level + 1);
      const rightArray = mergeSort(array, mid + 1, end, level + 1);

      // Merge phase
      const merged: number[] = [];
      let leftIndex = 0;
      let rightIndex = 0;

      sortSteps.push({
        array: [...arr],
        leftArray: [...leftArray],
        rightArray: [...rightArray],
        mergedArray: [],
        currentLevel: level,
        phase: 'merge',
        description: `Merging left [${leftArray.join(', ')}] and right [${rightArray.join(', ')}] subarrays`,
        comparisons,
        merges
      });

      while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        comparisons++;
        
        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
          merged.push(leftArray[leftIndex]);
          
          sortSteps.push({
            array: [...arr],
            leftArray: [...leftArray],
            rightArray: [...rightArray],
            mergedArray: [...merged],
            currentLevel: level,
            phase: 'merge',
            mergeIndices: { leftIndex, rightIndex, mergedIndex: merged.length - 1 },
            description: `Comparing ${leftArray[leftIndex]} ≤ ${rightArray[rightIndex]}, taking ${leftArray[leftIndex]} from left`,
            comparisons,
            merges
          });
          
          leftIndex++;
        } else {
          merged.push(rightArray[rightIndex]);
          
          sortSteps.push({
            array: [...arr],
            leftArray: [...leftArray],
            rightArray: [...rightArray],
            mergedArray: [...merged],
            currentLevel: level,
            phase: 'merge',
            mergeIndices: { leftIndex, rightIndex, mergedIndex: merged.length - 1 },
            description: `Comparing ${leftArray[leftIndex]} > ${rightArray[rightIndex]}, taking ${rightArray[rightIndex]} from right`,
            comparisons,
            merges
          });
          
          rightIndex++;
        }
      }

      // Copy remaining elements
      while (leftIndex < leftArray.length) {
        merged.push(leftArray[leftIndex]);
        sortSteps.push({
          array: [...arr],
          leftArray: [...leftArray],
          rightArray: [...rightArray],
          mergedArray: [...merged],
          currentLevel: level,
          phase: 'merge',
          description: `Adding remaining element ${leftArray[leftIndex]} from left subarray`,
          comparisons,
          merges
        });
        leftIndex++;
      }

      while (rightIndex < rightArray.length) {
        merged.push(rightArray[rightIndex]);
        sortSteps.push({
          array: [...arr],
          leftArray: [...leftArray],
          rightArray: [...rightArray],
          mergedArray: [...merged],
          currentLevel: level,
          phase: 'merge',
          description: `Adding remaining element ${rightArray[rightIndex]} from right subarray`,
          comparisons,
          merges
        });
        rightIndex++;
      }

      merges++;
      
      // Show completed merge
      sortSteps.push({
        array: [...arr],
        leftArray: [...leftArray],
        rightArray: [...rightArray],
        mergedArray: [...merged],
        currentLevel: level,
        phase: 'merge',
        description: `Merge complete: [${merged.join(', ')}]`,
        comparisons,
        merges
      });

      return merged;
    };

    const sortedArray = mergeSort([...arr], 0, arr.length - 1, 0);
    const endTime = performance.now();

    sortSteps.push({
      array: sortedArray,
      currentLevel: 0,
      phase: 'complete',
      description: 'Merge Sort complete! Array is now fully sorted.',
      comparisons,
      merges
    });

    setMetrics({
      totalComparisons: comparisons,
      totalMerges: merges,
      maxDepth,
      startTime,
      endTime,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)'
    });

    setSteps(sortSteps);
  }, []);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsComplete(false);
  };
  
  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      setIsPlaying(false);
    }
  };
  
  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsComplete(false);
    }
  };

  const shuffleArray = () => {
    const newArray = [...originalArray];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    setOriginalArray(newArray);
    reset();
  };

  const drawVisualization = useCallback((context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!steps.length || !steps[currentStep]) return;

    const step = steps[currentStep];
    context.clearRect(0, 0, canvas.width, canvas.height);

    const elementWidth = 50;
    const elementHeight = 40;
    const spacing = 8;
    const levelHeight = 80;

    // Draw main array
    const mainArrayY = 50;
    const mainStartX = (canvas.width - (step.array.length * (elementWidth + spacing))) / 2;

    step.array.forEach((value, index) => {
      const x = mainStartX + index * (elementWidth + spacing);
      
      context.fillStyle = currentTheme.colors.surface;
      context.fillRect(x, mainArrayY, elementWidth, elementHeight);
      
      context.strokeStyle = currentTheme.colors.border;
      context.lineWidth = 2;
      context.strokeRect(x, mainArrayY, elementWidth, elementHeight);

      context.fillStyle = 'white';
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.fillText(value.toString(), x + elementWidth / 2, mainArrayY + elementHeight / 2 + 5);
    });

    // Draw left subarray if exists
    if (step.leftArray && step.leftArray.length > 0) {
      const leftY = mainArrayY + levelHeight;
      const leftStartX = (canvas.width / 2) - (step.leftArray.length * (elementWidth + spacing)) - 20;

      context.fillStyle = currentTheme.colors.info;
      context.font = 'bold 12px Arial';
      context.textAlign = 'center';
      context.fillText('LEFT', leftStartX + (step.leftArray.length * (elementWidth + spacing)) / 2, leftY - 10);

      step.leftArray.forEach((value, index) => {
        const x = leftStartX + index * (elementWidth + spacing);
        
        let fillColor = currentTheme.colors.info;
        if (step.mergeIndices && index === step.mergeIndices.leftIndex) {
          fillColor = currentTheme.colors.warning;
          context.shadowColor = currentTheme.colors.warning;
          context.shadowBlur = 10;
        }

        context.fillStyle = fillColor;
        context.fillRect(x, leftY, elementWidth, elementHeight);
        
        context.shadowBlur = 0;
        
        context.strokeStyle = currentTheme.colors.border;
        context.lineWidth = 2;
        context.strokeRect(x, leftY, elementWidth, elementHeight);

        context.fillStyle = 'white';
        context.font = 'bold 14px Arial';
        context.textAlign = 'center';
        context.fillText(value.toString(), x + elementWidth / 2, leftY + elementHeight / 2 + 5);
      });
    }

    // Draw right subarray if exists
    if (step.rightArray && step.rightArray.length > 0) {
      const rightY = mainArrayY + levelHeight;
      const rightStartX = (canvas.width / 2) + 20;

      context.fillStyle = currentTheme.colors.warning;
      context.font = 'bold 12px Arial';
      context.textAlign = 'center';
      context.fillText('RIGHT', rightStartX + (step.rightArray.length * (elementWidth + spacing)) / 2, rightY - 10);

      step.rightArray.forEach((value, index) => {
        const x = rightStartX + index * (elementWidth + spacing);
        
        let fillColor = currentTheme.colors.warning;
        if (step.mergeIndices && index === step.mergeIndices.rightIndex) {
          fillColor = currentTheme.colors.error;
          context.shadowColor = currentTheme.colors.error;
          context.shadowBlur = 10;
        }

        context.fillStyle = fillColor;
        context.fillRect(x, rightY, elementWidth, elementHeight);
        
        context.shadowBlur = 0;
        
        context.strokeStyle = currentTheme.colors.border;
        context.lineWidth = 2;
        context.strokeRect(x, rightY, elementWidth, elementHeight);

        context.fillStyle = 'white';
        context.font = 'bold 14px Arial';
        context.textAlign = 'center';
        context.fillText(value.toString(), x + elementWidth / 2, rightY + elementHeight / 2 + 5);
      });
    }

    // Draw merged array if exists
    if (step.mergedArray && step.mergedArray.length > 0) {
      const mergedY = mainArrayY + levelHeight * 2;
      const mergedStartX = (canvas.width - (step.mergedArray.length * (elementWidth + spacing))) / 2;

      context.fillStyle = currentTheme.colors.success;
      context.font = 'bold 12px Arial';
      context.textAlign = 'center';
      context.fillText('MERGED', mergedStartX + (step.mergedArray.length * (elementWidth + spacing)) / 2, mergedY - 10);

      step.mergedArray.forEach((value, index) => {
        const x = mergedStartX + index * (elementWidth + spacing);
        
        let fillColor = currentTheme.colors.success;
        if (step.mergeIndices && index === step.mergeIndices.mergedIndex) {
          fillColor = currentTheme.colors.primary;
          context.shadowColor = currentTheme.colors.primary;
          context.shadowBlur = 15;
        }

        context.fillStyle = fillColor;
        context.fillRect(x, mergedY, elementWidth, elementHeight);
        
        context.shadowBlur = 0;
        
        context.strokeStyle = currentTheme.colors.border;
        context.lineWidth = 2;
        context.strokeRect(x, mergedY, elementWidth, elementHeight);

        context.fillStyle = 'white';
        context.font = 'bold 14px Arial';
        context.textAlign = 'center';
        context.fillText(value.toString(), x + elementWidth / 2, mergedY + elementHeight / 2 + 5);
      });
    }

    // Draw phase indicator
    context.fillStyle = currentTheme.colors.text;
    context.font = 'bold 16px Arial';
    context.textAlign = 'left';
    context.fillText(`Phase: ${step.phase.toUpperCase()}`, 20, 25);
    context.fillText(`Level: ${step.currentLevel}`, 20, 45);

    // Draw legend
    const legendY = canvas.height - 40;
    const legendItems = [
      { color: currentTheme.colors.info, label: 'Left Subarray' },
      { color: currentTheme.colors.warning, label: 'Right Subarray' },
      { color: currentTheme.colors.success, label: 'Merged Result' },
      { color: currentTheme.colors.primary, label: 'Current Operation' }
    ];

    legendItems.forEach((item, index) => {
      const legendX = 20 + index * 150;
      
      context.fillStyle = item.color;
      context.fillRect(legendX, legendY, 15, 15);
      
      context.fillStyle = currentTheme.colors.text;
      context.font = '12px Arial';
      context.textAlign = 'left';
      context.fillText(item.label, legendX + 20, legendY + 12);
    });
  }, [currentStep, steps, currentTheme]);

  useEffect(() => {
    generateMergeSortSteps(originalArray);
  }, [originalArray, generateMergeSortSteps]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      intervalId = setInterval(() => {
        stepForward();
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      setIsComplete(true);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, currentStep, steps.length, speed]);

  const currentStepData = steps[currentStep];

  const pseudocodeLines = [
    'function mergeSort(array, start, end):',
    '  if start >= end:',
    '    return array[start..start]',
    '  ',
    '  mid = (start + end) / 2',
    '  left = mergeSort(array, start, mid)',
    '  right = mergeSort(array, mid + 1, end)',
    '  ',
    '  return merge(left, right)',
    '',
    'function merge(left, right):',
    '  result = []',
    '  i = 0, j = 0',
    '  ',
    '  while i < left.length and j < right.length:',
    '    if left[i] <= right[j]:',
    '      result.add(left[i++])',
    '    else:',
    '      result.add(right[j++])',
    '  ',
    '  // Add remaining elements',
    '  result.addAll(left[i..])',
    '  result.addAll(right[j..])',
    '  return result'
  ];

  return (
    <ModernVisualizationBase
      title="Merge Sort Visualization"
      description="Watch the divide-and-conquer approach of merge sort in action"
      difficulty="Intermediate"
      category="Sorting"
      complexity={{
        time: "O(n log n)",
        space: "O(n)"
      }}
      controls={{
        isPlaying,
        onPlay: play,
        onPause: pause,
        onReset: reset,
        onStepForward: stepForward,
        onStepBack: stepBackward,
        currentStep,
        totalSteps: steps.length,
        speed,
        onSpeedChange: setSpeed,
        disabled: isComplete
      }}
      metrics={metrics ? [
        { label: 'Comparisons', value: currentStepData?.comparisons || 0, icon: <BarChart3 className="w-4 h-4" /> },
        { label: 'Merges', value: currentStepData?.merges || 0, icon: <GitBranch className="w-4 h-4" /> },
        { label: 'Current Level', value: currentStepData?.currentLevel || 0, icon: <Layers className="w-4 h-4" /> },
        { label: 'Max Depth', value: metrics.maxDepth, icon: <Target className="w-4 h-4" /> }
      ] : undefined}
      educational={{
        keyPoints: [
          'Divide-and-conquer algorithm approach',
          'Recursively divides array into halves',
          'Merges sorted subarrays back together',
          'Guaranteed O(n log n) time complexity',
          'Stable sorting algorithm'
        ],
        pseudocode: pseudocodeLines,
        realWorldUse: [
          'External sorting for large datasets',
          'Stable sorting requirements',
          'Linked list sorting',
          'Parallel processing implementations'
        ]
      }}
    >
      {/* Progress and Step Info */}
      <div className="text-center space-y-2">
        {currentStepData && (
          <div className="text-white/90 text-sm max-w-2xl mx-auto">
            {currentStepData.description}
          </div>
        )}
      </div>

      {/* Main Visualization */}
      <Card 
        className="backdrop-blur-sm"
        style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}
      >
        <CardContent className="p-6">
          <ModernCanvas
            width={800}
            height={300}
            onDraw={drawVisualization}
            className="rounded-lg border border-white/20"
          />
        </CardContent>
      </Card>

      {/* Additional Controls */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={shuffleArray}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Shuffle Array
        </Button>
        
        <Button
          onClick={() => setShowPseudocode(!showPseudocode)}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          {showPseudocode ? 'Hide' : 'Show'} Pseudocode
        </Button>
      </div>

      {/* Pseudocode Panel */}
      {showPseudocode && (
        <Card 
          className="backdrop-blur-sm"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.colors.text }}>
              Merge Sort Pseudocode
            </h3>
            <div className="font-mono text-sm space-y-1" style={{ color: currentTheme.colors.textSecondary }}>
              {pseudocodeLines.map((line, index) => (
                <div key={index} className="leading-relaxed">
                  {line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Algorithm Properties */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card 
          className="backdrop-blur-sm"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.colors.text }}>
              Algorithm Properties
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Time Complexity', value: 'O(n log n)', color: currentTheme.colors.success },
                { label: 'Space Complexity', value: 'O(n)', color: currentTheme.colors.warning },
                { label: 'Stability', value: 'Yes', color: currentTheme.colors.success },
                { label: 'In-Place', value: 'No', color: currentTheme.colors.error },
                { label: 'Best Case', value: 'O(n log n)', color: currentTheme.colors.success },
                { label: 'Worst Case', value: 'O(n log n)', color: currentTheme.colors.success }
              ].map((prop, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span style={{ color: currentTheme.colors.textSecondary }}>{prop.label}:</span>
                  <Badge style={{ backgroundColor: prop.color, color: 'white' }}>
                    {prop.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card 
          className="backdrop-blur-sm"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.colors.text }}>
              How Merge Sort Works
            </h3>
            <div className="space-y-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p>• <strong>Divide:</strong> Split array into two halves recursively</p>
              <p>• <strong>Conquer:</strong> Sort each half independently</p>
              <p>• <strong>Merge:</strong> Combine sorted halves into final result</p>
              <p>• <strong>Guarantee:</strong> Always O(n log n) performance</p>
              <p>• <strong>Stability:</strong> Maintains relative order of equal elements</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernMergeSortVisualization;
