import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVisualizationTheme } from '@/hooks/useVisualizationTheme';
import { InteractiveQuiz, useEducationalTooltips } from '@/components/InteractiveQuiz';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack,
  Shuffle,
  BarChart3,
  Clock,
  ArrowUpDown,
  Target,
  BookOpen,
  Zap,
  TrendingUp,
  Activity,
  CheckCircle,
  Split,
  Combine
} from 'lucide-react';
import { Canvas } from './Canvas';

interface MergeSortStep {
  array: number[];
  leftArray: number[];
  rightArray: number[];
  merging: boolean;
  leftIndex: number;
  rightIndex: number;
  merged: number[];
  level: number;
  comparisons: number;
  swaps: number;
  phase: 'divide' | 'merge' | 'complete';
  description: string;
  pseudocodeLine: number;
  range: { start: number; end: number };
}

interface MergeSortMetrics {
  totalSteps: number;
  comparisons: number;
  swaps: number;
  maxDepth: number;
  timeComplexity: string;
  spaceComplexity: string;
  startTime: number;
  endTime?: number;
}

export const MergeSortVisualization = () => {
  const { theme } = useVisualizationTheme();
  
  // Define colors for merge sort visualization
  const colors = {
    primary: '#3b82f6',
    secondary: '#8b5cf6', 
    accent: '#06d6a0',
    comparing: '#f59e0b',
    sorted: '#10b981'
  };
  const [originalArray] = useState([38, 27, 43, 3, 9, 82, 10]);
  const [steps, setSteps] = useState<MergeSortStep[]>([]);
  const [speed, setSpeed] = useState([300]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPseudocode, setShowPseudocode] = useState(false);
  const [stepByStep, setStepByStep] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [metrics, setMetrics] = useState<MergeSortMetrics | null>(null);
  
  const { showTooltip, hideTooltip } = useEducationalTooltips();

  // Custom animation hook for merge sort
  const useAnimation = (totalSteps: number, animationSpeed: number) => {
    useEffect(() => {
      if (!isPlaying || currentStep >= totalSteps - 1) return;
      
      const timer = setTimeout(() => {
        setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
      }, animationSpeed);
      
      return () => clearTimeout(timer);
    }, [isPlaying, currentStep, totalSteps, animationSpeed]);

    return {
      currentStep,
      isPlaying,
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
      reset: () => {
        setCurrentStep(0);
        setIsPlaying(false);
      },
      stepForward: () => setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1)),
      stepBackward: () => setCurrentStep(prev => Math.max(prev - 1, 0)),
      goToStep: (step: number) => setCurrentStep(Math.max(0, Math.min(step, totalSteps - 1)))
    };
  };

  const animation = useAnimation(steps.length, speed[0]);

  const generateSteps = useCallback(() => {
    const startTime = Date.now();
    const sortSteps: MergeSortStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let maxDepth = 0;

    const mergeSort = (arr: number[], level: number = 0, start: number = 0): number[] => {
      maxDepth = Math.max(maxDepth, level);
      
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);

      // Divide phase
      sortSteps.push({
        array: [...arr],
        leftArray: [...left],
        rightArray: [...right],
        merging: false,
        leftIndex: -1,
        rightIndex: -1,
        merged: [],
        level,
        comparisons,
        swaps,
        phase: 'divide',
        description: `Divide array into left [${left.join(', ')}] and right [${right.join(', ')}]`,
        pseudocodeLine: 1,
        range: { start, end: start + arr.length - 1 }
      });

      const sortedLeft = mergeSort(left, level + 1, start);
      const sortedRight = mergeSort(right, level + 1, start + mid);

      return merge(sortedLeft, sortedRight, level, start);
    };

    const merge = (left: number[], right: number[], level: number, start: number): number[] => {
      const result: number[] = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        comparisons++;
        
        // Show comparison
        sortSteps.push({
          array: [...left, ...right],
          leftArray: [...left],
          rightArray: [...right],
          merging: true,
          leftIndex,
          rightIndex,
          merged: [...result],
          level,
          comparisons,
          swaps,
          phase: 'merge',
          description: `Compare ${left[leftIndex]} with ${right[rightIndex]}`,
          pseudocodeLine: 2,
          range: { start, end: start + left.length + right.length - 1 }
        });

        if (left[leftIndex] <= right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
        swaps++;
      }

      // Add remaining elements
      while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
        swaps++;
      }

      while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
        swaps++;
      }

      // Show merged result
      sortSteps.push({
        array: [...result],
        leftArray: [...left],
        rightArray: [...right],
        merging: false,
        leftIndex: -1,
        rightIndex: -1,
        merged: [...result],
        level,
        comparisons,
        swaps,
        phase: 'complete',
        description: `Merged result: [${result.join(', ')}]`,
        pseudocodeLine: 3,
        range: { start, end: start + result.length - 1 }
      });

      return result;
    };

    mergeSort([...originalArray]);
    
    const endTime = Date.now();
    setMetrics({
      totalSteps: sortSteps.length,
      comparisons,
      swaps,
      maxDepth,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      startTime,
      endTime
    });
    
    setSteps(sortSteps);
  }, [originalArray]);

  useEffect(() => {
    generateSteps();
  }, [generateSteps]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case ' ':
          event.preventDefault();
          if (isPlaying) {
            animation.pause();
          } else {
            animation.play();
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          animation.stepForward();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          animation.stepBackward();
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          animation.reset();
          break;
        case 's':
        case 'S':
          event.preventDefault();
          setStepByStep(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, animation]);

  const currentStepData = steps[currentStep] || steps[0];
  
  const drawVisualization = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!currentStepData) return;

    const { array, leftArray, rightArray, merging, leftIndex, rightIndex, merged, level } = currentStepData;
    const padding = 40;
    const barWidth = Math.max(30, (canvas.width - padding * 2) / array.length);
    const maxValue = Math.max(...originalArray);

    // Draw main array
    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * (canvas.height - 120);
      const x = padding + index * barWidth;
      const y = canvas.height - 60 - barHeight;

      // Determine bar color based on state
      let color = colors.primary;
      if (merging) {
        if ((leftIndex !== -1 && index < leftArray.length && index === leftIndex) ||
            (rightIndex !== -1 && index >= leftArray.length && index - leftArray.length === rightIndex)) {
          color = colors.comparing;
        } else if (index < leftArray.length) {
          color = colors.secondary;
        } else {
          color = colors.accent;
        }
      } else if (merged.length > 0 && index < merged.length) {
        color = colors.sorted;
      }

      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth - 2, barHeight);
      
      // Draw value and index
      ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 8);
      ctx.fillText(index.toString(), x + barWidth / 2, canvas.height - 40);
    });

    // Draw level and phase indicators
    ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Level: ${level} | Phase: ${currentStepData.phase}`, 10, 25);
  }, [currentStepData, originalArray, colors, theme]);

  const pseudocodeLines = [
    'function mergeSort(array):',
    '  if array.length <= 1: return array',
    '  mid = array.length / 2',
    '  left = mergeSort(array[0...mid])',
    '  right = mergeSort(array[mid...end])',
    '  return merge(left, right)',
    '',
    'function merge(left, right):',
    '  result = []',
    '  while left and right not empty:',
    '    if left[0] <= right[0]:',
    '      result.append(left.removeFirst())',
    '    else:',
    '      result.append(right.removeFirst())',
    '  result.append(remaining elements)',
    '  return result'
  ];

  const quizQuestions = [
    {
      question: "What is the time complexity of Merge Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correct: 1,
      explanation: "Merge Sort consistently performs in O(n log n) time because it divides the array in half (log n levels) and merges in linear time (n operations per level)."
    },
    {
      question: "What is the main advantage of Merge Sort over Quick Sort?",
      options: ["Uses less memory", "Faster average case", "Stable sorting", "In-place sorting"],
      correct: 2,
      explanation: "Merge Sort is stable, meaning it preserves the relative order of equal elements, and has guaranteed O(n log n) performance."
    },
    {
      question: "How much extra space does Merge Sort require?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correct: 2,
      explanation: "Merge Sort requires O(n) extra space for the temporary arrays used during the merge process."
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Merge Sort Visualization
        </h2>
        <p className="text-muted-foreground">
          Watch how merge sort divides and conquers to sort the array
        </p>
      </div>

      {/* Controls */}
      <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Controls & Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={isPlaying ? animation.pause : animation.play}
              disabled={currentStep >= steps.length - 1}
              className="gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={animation.stepBackward} disabled={currentStep <= 0} variant="outline" className="gap-2">
              <SkipBack className="h-4 w-4" />
              Step Back
            </Button>
            <Button onClick={animation.stepForward} disabled={currentStep >= steps.length - 1} variant="outline" className="gap-2">
              <SkipForward className="h-4 w-4" />
              Step Forward
            </Button>
            <Button onClick={animation.reset} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={() => setShowPseudocode(!showPseudocode)}
              variant={showPseudocode ? "default" : "outline"}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Pseudocode
            </Button>
            <Button
              onClick={() => setShowQuiz(!showQuiz)}
              variant={showQuiz ? "default" : "outline"}
              className="gap-2"
            >
              <Target className="h-4 w-4" />
              Quiz
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Speed: {speed[0]}ms</label>
              <Slider
                value={speed}
                onValueChange={setSpeed}
                max={1000}
                min={50}
                step={50}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Progress</label>
              <div className="text-lg font-bold">{currentStep + 1} / {steps.length}</div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Level</label>
              <div className="text-lg font-bold">{currentStepData?.level || 0}</div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phase</label>
              <Badge variant={currentStepData?.phase === 'divide' ? 'destructive' : currentStepData?.phase === 'merge' ? 'default' : 'secondary'}>
                {currentStepData?.phase || 'N/A'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visualization */}
      <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
        <CardContent className="p-6">
          <div style={{ width: '100%', height: '300px' }} className="border rounded-lg">
            <Canvas onRender={drawVisualization} width={800} height={300} />
          </div>
          
          {currentStepData && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">{currentStepData.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Metrics Dashboard */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{currentStepData?.comparisons || 0}</div>
              <div className="text-sm text-muted-foreground">Comparisons</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <ArrowUpDown className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{currentStepData?.swaps || 0}</div>
              <div className="text-sm text-muted-foreground">Array Access</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{metrics.maxDepth}</div>
              <div className="text-sm text-muted-foreground">Max Depth</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">O(n log n)</div>
              <div className="text-sm text-muted-foreground">Time Complexity</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pseudocode Panel */}
      {showPseudocode && (
        <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Merge Sort Pseudocode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono bg-muted p-4 rounded-lg overflow-x-auto">
              {pseudocodeLines.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    currentStepData?.pseudocodeLine === index + 1
                      ? 'bg-primary/20 text-primary font-bold'
                      : ''
                  } px-2 py-1 rounded`}
                >
                  {line}
                </div>
              ))}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Interactive Quiz */}
      {showQuiz && (
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Merge Sort Quiz</h3>
          <p className="text-sm text-muted-foreground mb-4">Test your understanding of merge sort concepts</p>
          {quizQuestions.map((q, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
              <p className="font-medium mb-2">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center space-x-2">
                    <input type="radio" name={`q${index}`} id={`q${index}_${optIndex}`} />
                    <label htmlFor={`q${index}_${optIndex}`} className="text-sm">{option}</label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">{q.explanation}</p>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.primary }}></div>
              <span>Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.secondary }}></div>
              <span>Left Subarray</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.accent }}></div>
              <span>Right Subarray</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.comparing }}></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.sorted }}></div>
              <span>Merged</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Keyboard shortcuts: Space (play/pause), ← → (step), R (reset), S (step mode)
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
