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
  Target,
  Zap,
  BookOpen,
  TrendingUp,
  ArrowUpDown,
  Crosshair
} from 'lucide-react';

interface QuickSortStep {
  array: number[];
  low: number;
  high: number;
  pivot: number;
  left: number;
  right: number;
  comparing: number[];
  swapping: number[];
  partitioned: number[];
  phase: 'partition' | 'recurse' | 'complete';
  description: string;
  comparisons: number;
  swaps: number;
  partitions: number;
  recursionDepth: number;
}

interface QuickSortMetrics {
  totalComparisons: number;
  totalSwaps: number;
  totalPartitions: number;
  maxRecursionDepth: number;
  startTime: number;
  endTime?: number;
  timeComplexity: string;
  spaceComplexity: string;
}

const ModernQuickSortVisualization: React.FC = () => {
  const { currentTheme, animationSpeed } = useVisualizationTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [originalArray, setOriginalArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 76, 50, 42]);
  const [steps, setSteps] = useState<QuickSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [metrics, setMetrics] = useState<QuickSortMetrics | null>(null);
  const [showPseudocode, setShowPseudocode] = useState(false);
  const [pivotStrategy, setPivotStrategy] = useState<'last' | 'first' | 'middle' | 'random'>('last');

  const generateQuickSortSteps = useCallback((arr: number[]) => {
    const sortSteps: QuickSortStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let partitions = 0;
    let maxRecursionDepth = 0;

    const quickSort = (array: number[], low: number, high: number, depth: number = 0) => {
      maxRecursionDepth = Math.max(maxRecursionDepth, depth);

      if (low < high) {
        // Choose pivot based on strategy
        let pivotIndex = high; // default to last
        switch (pivotStrategy) {
          case 'first':
            pivotIndex = low;
            break;
          case 'middle':
            pivotIndex = Math.floor((low + high) / 2);
            break;
          case 'random':
            pivotIndex = low + Math.floor(Math.random() * (high - low + 1));
            break;
        }

        // Move pivot to end if not already there
        if (pivotIndex !== high) {
          [array[pivotIndex], array[high]] = [array[high], array[pivotIndex]];
          swaps++;
        }

        const pivot = array[high];
        let i = low - 1;

        // Partition phase
        for (let j = low; j < high; j++) {
          comparisons++;
          
          sortSteps.push({
            array: [...array],
            low,
            high,
            pivot: high,
            left: i + 1,
            right: j,
            comparing: [j, high],
            swapping: [],
            partitioned: [],
            phase: 'partition',
            description: `Comparing ${array[j]} with pivot ${pivot}`,
            comparisons,
            swaps,
            partitions,
            recursionDepth: depth
          });

          if (array[j] <= pivot) {
            i++;
            if (i !== j) {
              sortSteps.push({
                array: [...array],
                low,
                high,
                pivot: high,
                left: i,
                right: j,
                comparing: [],
                swapping: [i, j],
                partitioned: [],
                phase: 'partition',
                description: `Swapping ${array[i]} and ${array[j]}`,
                comparisons,
                swaps,
                partitions,
                recursionDepth: depth
              });

              [array[i], array[j]] = [array[j], array[i]];
              swaps++;
            }
          }
        }

        // Place pivot in correct position
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        swaps++;
        partitions++;

        const pivotPosition = i + 1;

        sortSteps.push({
          array: [...array],
          low,
          high,
          pivot: pivotPosition,
          left: -1,
          right: -1,
          comparing: [],
          swapping: [],
          partitioned: Array.from({length: array.length}, (_, idx) => 
            idx >= low && idx <= high ? idx : -1).filter(idx => idx !== -1),
          phase: 'partition',
          description: `Pivot ${pivot} placed at position ${pivotPosition}. Partitioning complete.`,
          comparisons,
          swaps,
          partitions,
          recursionDepth: depth
        });

        // Recursively sort left and right subarrays
        quickSort(array, low, pivotPosition - 1, depth + 1);
        quickSort(array, pivotPosition + 1, high, depth + 1);
      }
    };

    const arrayToSort = [...arr];
    const startTime = performance.now();
    quickSort(arrayToSort, 0, arrayToSort.length - 1);
    const endTime = performance.now();

    // Final sorted state
    sortSteps.push({
      array: arrayToSort,
      low: 0,
      high: arrayToSort.length - 1,
      pivot: -1,
      left: -1,
      right: -1,
      comparing: [],
      swapping: [],
      partitioned: Array.from({length: arrayToSort.length}, (_, idx) => idx),
      phase: 'complete',
      description: 'Quick Sort complete! Array is now sorted.',
      comparisons,
      swaps,
      partitions,
      recursionDepth: 0
    });

    setMetrics({
      totalComparisons: comparisons,
      totalSwaps: swaps,
      totalPartitions: partitions,
      maxRecursionDepth,
      startTime,
      endTime,
      timeComplexity: 'O(n log n) avg, O(n²) worst',
      spaceComplexity: 'O(log n) avg, O(n) worst'
    });

    setSteps(sortSteps);
  }, [pivotStrategy]);

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

    const elementWidth = 45;
    const elementHeight = 45;
    const spacing = 8;
    const startX = (canvas.width - (step.array.length * (elementWidth + spacing))) / 2;
    const arrayY = 100;

    // Draw array elements
    step.array.forEach((value, index) => {
      const x = startX + index * (elementWidth + spacing);
      let fillColor = currentTheme.colors.surface;
      let borderColor = currentTheme.colors.border;
      let glowColor = '';

      // Color coding based on state
      if (index === step.pivot) {
        fillColor = currentTheme.colors.warning;
        glowColor = currentTheme.colors.warning;
      } else if (step.comparing.includes(index)) {
        fillColor = currentTheme.colors.info;
        glowColor = currentTheme.colors.info;
      } else if (step.swapping.includes(index)) {
        fillColor = currentTheme.colors.error;
        glowColor = currentTheme.colors.error;
      } else if (step.partitioned.includes(index)) {
        fillColor = currentTheme.colors.success;
      } else if (index >= step.low && index <= step.high) {
        fillColor = currentTheme.colors.primary;
      }

      // Draw glow effect
      if (glowColor) {
        context.shadowColor = glowColor;
        context.shadowBlur = 15;
      }

      // Element background
      context.fillStyle = fillColor;
      context.fillRect(x, arrayY, elementWidth, elementHeight);
      
      context.shadowBlur = 0;

      // Element border
      context.strokeStyle = borderColor;
      context.lineWidth = 2;
      context.strokeRect(x, arrayY, elementWidth, elementHeight);

      // Value text
      context.fillStyle = 'white';
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.fillText(value.toString(), x + elementWidth / 2, arrayY + elementHeight / 2 + 5);

      // Index labels
      context.fillStyle = currentTheme.colors.textSecondary;
      context.font = '10px Arial';
      context.fillText(index.toString(), x + elementWidth / 2, arrayY - 5);
    });

    // Draw partition boundaries
    if (step.low >= 0 && step.high >= 0 && step.low <= step.high) {
      const leftBoundary = startX + step.low * (elementWidth + spacing) - spacing / 2;
      const rightBoundary = startX + (step.high + 1) * (elementWidth + spacing) - spacing / 2;
      
      context.strokeStyle = currentTheme.colors.primary;
      context.lineWidth = 3;
      context.setLineDash([5, 5]);
      
      // Left boundary
      context.beginPath();
      context.moveTo(leftBoundary, arrayY - 20);
      context.lineTo(leftBoundary, arrayY + elementHeight + 20);
      context.stroke();
      
      // Right boundary
      context.beginPath();
      context.moveTo(rightBoundary, arrayY - 20);
      context.lineTo(rightBoundary, arrayY + elementHeight + 20);
      context.stroke();
      
      context.setLineDash([]);
    }

    // Draw pointers
    if (step.left >= 0) {
      const leftX = startX + step.left * (elementWidth + spacing) + elementWidth / 2;
      context.fillStyle = currentTheme.colors.success;
      context.font = 'bold 12px Arial';
      context.textAlign = 'center';
      context.fillText('L', leftX, arrayY - 25);
      
      // Arrow
      context.strokeStyle = currentTheme.colors.success;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(leftX, arrayY - 15);
      context.lineTo(leftX, arrayY - 5);
      context.stroke();
    }

    if (step.right >= 0) {
      const rightX = startX + step.right * (elementWidth + spacing) + elementWidth / 2;
      context.fillStyle = currentTheme.colors.info;
      context.font = 'bold 12px Arial';
      context.textAlign = 'center';
      context.fillText('R', rightX, arrayY - 25);
      
      // Arrow
      context.strokeStyle = currentTheme.colors.info;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(rightX, arrayY - 15);
      context.lineTo(rightX, arrayY - 5);
      context.stroke();
    }

    if (step.pivot >= 0) {
      const pivotX = startX + step.pivot * (elementWidth + spacing) + elementWidth / 2;
      context.fillStyle = currentTheme.colors.warning;
      context.font = 'bold 12px Arial';
      context.textAlign = 'center';
      context.fillText('PIVOT', pivotX, arrayY + elementHeight + 20);
      
      // Arrow
      context.strokeStyle = currentTheme.colors.warning;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(pivotX, arrayY + elementHeight + 10);
      context.lineTo(pivotX, arrayY + elementHeight + 5);
      context.stroke();
    }

    // Draw recursion depth indicator
    context.fillStyle = currentTheme.colors.text;
    context.font = '14px Arial';
    context.textAlign = 'left';
    context.fillText(`Recursion Depth: ${step.recursionDepth}`, 20, 30);
    context.fillText(`Phase: ${step.phase.toUpperCase()}`, 200, 30);

    // Draw legend
    const legendY = canvas.height - 80;
    const legendItems = [
      { color: currentTheme.colors.warning, label: 'Pivot' },
      { color: currentTheme.colors.info, label: 'Comparing' },
      { color: currentTheme.colors.error, label: 'Swapping' },
      { color: currentTheme.colors.success, label: 'Partitioned' },
      { color: currentTheme.colors.primary, label: 'Active Range' }
    ];

    legendItems.forEach((item, index) => {
      const legendX = 20 + index * 120;
      
      context.fillStyle = item.color;
      context.fillRect(legendX, legendY, 15, 15);
      
      context.fillStyle = currentTheme.colors.text;
      context.font = '12px Arial';
      context.textAlign = 'left';
      context.fillText(item.label, legendX + 20, legendY + 12);
    });
  }, [currentStep, steps, currentTheme]);

  useEffect(() => {
    generateQuickSortSteps(originalArray);
  }, [originalArray, generateQuickSortSteps]);

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
  const progressPercentage = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  const pseudocodeLines = [
    'function quickSort(array, low, high):',
    '  if low < high:',
    '    pivotIndex = partition(array, low, high)',
    '    quickSort(array, low, pivotIndex - 1)',
    '    quickSort(array, pivotIndex + 1, high)',
    '',
    'function partition(array, low, high):',
    '  pivot = array[high]',
    '  i = low - 1',
    '  for j = low to high - 1:',
    '    if array[j] <= pivot:',
    '      i = i + 1',
    '      swap(array[i], array[j])',
    '  swap(array[i + 1], array[high])',
    '  return i + 1'
  ];

  return (
    <ModernVisualizationBase
      title="Quick Sort Visualization"
      description="Watch the divide-and-conquer partitioning approach of Quick Sort"
      difficulty="Intermediate"
      category="Sorting"
      complexity={{
        time: "O(n log n) avg, O(n²) worst",
        space: "O(log n) avg, O(n) worst"
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
        { label: 'Swaps', value: currentStepData?.swaps || 0, icon: <ArrowUpDown className="w-4 h-4" /> },
        { label: 'Partitions', value: currentStepData?.partitions || 0, icon: <Target className="w-4 h-4" /> },
        { label: 'Max Depth', value: metrics.maxRecursionDepth, icon: <TrendingUp className="w-4 h-4" /> }
      ] : undefined}
      educational={{
        keyPoints: [
          'Choose Pivot: Select an element as the pivot',
          'Partition: Rearrange array so elements smaller than pivot come before it',
          'Recursion: Apply quick sort to sub-arrays',
          'In-Place: Sorts without additional memory',
          'Performance: Depends heavily on pivot selection'
        ],
        pseudocode: pseudocodeLines,
        realWorldUse: [
          'General purpose sorting in programming languages',
          'Database query optimization',
          'File system operations',
          'Cache algorithms'
        ]
      }}
    >
      {/* Pivot Strategy Selection */}
      <div className="flex justify-center">
        <div className="bg-white/10 rounded-lg p-4">
          <label className="text-white/80 text-sm block mb-2">Pivot Strategy</label>
          <select
            value={pivotStrategy}
            onChange={(e) => setPivotStrategy(e.target.value as any)}
            className="bg-white/20 text-white rounded px-3 py-1 border border-white/30"
          >
            <option value="last">Last Element</option>
            <option value="first">First Element</option>
            <option value="middle">Middle Element</option>
            <option value="random">Random Element</option>
          </select>
        </div>
      </div>

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
            width={900}
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
              Quick Sort Pseudocode
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
                { label: 'Best Case', value: 'O(n log n)', color: currentTheme.colors.success },
                { label: 'Average Case', value: 'O(n log n)', color: currentTheme.colors.info },
                { label: 'Worst Case', value: 'O(n²)', color: currentTheme.colors.error },
                { label: 'Space Complexity', value: 'O(log n)', color: currentTheme.colors.warning },
                { label: 'In-Place', value: 'Yes', color: currentTheme.colors.success },
                { label: 'Stability', value: 'No', color: currentTheme.colors.error }
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
              How Quick Sort Works
            </h3>
            <div className="space-y-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p>• <strong>Choose Pivot:</strong> Select an element as the pivot</p>
              <p>• <strong>Partition:</strong> Rearrange array so elements smaller than pivot come before it</p>
              <p>• <strong>Recursion:</strong> Apply quick sort to sub-arrays</p>
              <p>• <strong>In-Place:</strong> Sorts without additional memory</p>
              <p>• <strong>Performance:</strong> Depends heavily on pivot selection</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernQuickSortVisualization;
