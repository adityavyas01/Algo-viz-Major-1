/**
 * Enhanced Quick Sort Visualization
 * Advanced quick sort with comprehensive educational features and modern UI
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
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
  ArrowRight
} from 'lucide-react';
import { Canvas } from './Canvas';

interface QuickSortStep {
  array: number[];
  pivotIndex: number;
  lowIndex: number;
  highIndex: number;
  comparing: number[];
  swapping: number[];
  partitioned: number[];
  comparisons: number;
  swaps: number;
  currentI: number;
  currentJ: number;
  phase: 'partitioning' | 'pivot-placement' | 'recursion' | 'completed';
  description: string;
  pseudocodeLine: number;
  recursionLevel: number;
}

interface QuickSortMetrics {
  totalSteps: number;
  comparisons: number;
  swaps: number;
  recursionDepth: number;
  timeComplexity: string;
  spaceComplexity: string;
  startTime: number;
  endTime?: number;
}

export const QuickSortVisualization = () => {
  const { currentTheme, animationSpeed } = useVisualizationTheme();
  const { activeTooltip, showTooltip, hideTooltip } = useEducationalTooltips();
  
  const [originalArray, setOriginalArray] = useState([64, 34, 25, 12, 22, 11, 90, 88]);
  const [steps, setSteps] = useState<QuickSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [metrics, setMetrics] = useState<QuickSortMetrics | null>(null);
  const [showPseudocode, setShowPseudocode] = useState(false);
  const [stepByStepMode, setStepByStepMode] = useState(false);
  const [arraySize, setArraySize] = useState([8]);

  const getAnimationDelay = () => {
    const delays = { slow: 2000, normal: 1000, fast: 500, instant: 100 };
    return delays[animationSpeed];
  };

  const pseudocode = [
    "1. QuickSort(arr, low, high):",
    "2.   If low < high:",
    "3.     pivot = Partition(arr, low, high)",
    "4.     QuickSort(arr, low, pivot - 1)",
    "5.     QuickSort(arr, pivot + 1, high)",
    "6. Partition(arr, low, high):",
    "7.   pivot = arr[high]",
    "8.   i = low - 1",
    "9.   For j = low to high - 1:",
    "10.    If arr[j] <= pivot:",
    "11.      i = i + 1",
    "12.      Swap arr[i] and arr[j]",
    "13.  Swap arr[i + 1] and arr[high]",
    "14.  Return i + 1"
  ];

  const generateRandomArray = () => {
    const size = arraySize[0];
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    setOriginalArray(newArray);
    reset();
  };

  const generateSteps = () => {
    const arr = [...originalArray];
    const sortSteps: QuickSortStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    let maxRecursionDepth = 0;
    const startTime = performance.now();

    const quickSort = (array: number[], low: number, high: number, recursionLevel: number = 0) => {
      maxRecursionDepth = Math.max(maxRecursionDepth, recursionLevel);
      
      if (low < high) {
        // Show recursion start
        sortSteps.push({
          array: [...array],
          pivotIndex: high,
          lowIndex: low,
          highIndex: high,
          comparing: [],
          swapping: [],
          partitioned: [],
          comparisons,
          swaps,
          currentI: low - 1,
          currentJ: low,
          phase: 'recursion',
          description: `Starting QuickSort on subarray [${low}..${high}], recursion level ${recursionLevel}`,
          pseudocodeLine: 1,
          recursionLevel
        });

        const pi = partition(array, low, high, recursionLevel);
        quickSort(array, low, pi - 1, recursionLevel + 1);
        quickSort(array, pi + 1, high, recursionLevel + 1);
      }
    };

    const partition = (array: number[], low: number, high: number, recursionLevel: number): number => {
      const pivot = array[high];
      let i = low - 1;

      // Show initial partitioning state
      sortSteps.push({
        array: [...array],
        pivotIndex: high,
        lowIndex: low,
        highIndex: high,
        comparing: [],
        swapping: [],
        partitioned: [],
        comparisons,
        swaps,
        currentI: i,
        currentJ: low,
        phase: 'partitioning',
        description: `Partitioning: pivot = ${pivot} at index ${high}`,
        pseudocodeLine: 7,
        recursionLevel
      });

      for (let j = low; j < high; j++) {
        comparisons++;
        
        // Show comparison
        sortSteps.push({
          array: [...array],
          pivotIndex: high,
          lowIndex: low,
          highIndex: high,
          comparing: [j, high],
          swapping: [],
          partitioned: [],
          comparisons,
          swaps,
          currentI: i,
          currentJ: j,
          phase: 'partitioning',
          description: `Comparing ${array[j]} with pivot ${pivot}`,
          pseudocodeLine: 10,
          recursionLevel
        });

        if (array[j] <= pivot) {
          i++;
          
          if (i !== j) {
            swaps++;
            // Show swap
            sortSteps.push({
              array: [...array],
              pivotIndex: high,
              lowIndex: low,
              highIndex: high,
              comparing: [],
              swapping: [i, j],
              partitioned: [],
              comparisons,
              swaps,
              currentI: i,
              currentJ: j,
              phase: 'partitioning',
              description: `${array[j]} <= ${pivot}, swapping positions ${i} and ${j}`,
              pseudocodeLine: 12,
              recursionLevel
            });

            [array[i], array[j]] = [array[j], array[i]];
          }
        }
      }

      // Final pivot placement
      swaps++;
      sortSteps.push({
        array: [...array],
        pivotIndex: high,
        lowIndex: low,
        highIndex: high,
        comparing: [],
        swapping: [i + 1, high],
        partitioned: [],
        comparisons,
        swaps,
        currentI: i + 1,
        currentJ: high,
        phase: 'pivot-placement',
        description: `Placing pivot ${pivot} at its correct position ${i + 1}`,
        pseudocodeLine: 13,
        recursionLevel
      });

      [array[i + 1], array[high]] = [array[high], array[i + 1]];

      // Show partitioned state
      sortSteps.push({
        array: [...array],
        pivotIndex: i + 1,
        lowIndex: low,
        highIndex: high,
        comparing: [],
        swapping: [],
        partitioned: [i + 1],
        comparisons,
        swaps,
        currentI: i + 1,
        currentJ: high,
        phase: 'pivot-placement',
        description: `Pivot ${pivot} is now in correct position. Left: smaller, Right: larger`,
        pseudocodeLine: 14,
        recursionLevel
      });

      return i + 1;
    };

    quickSort(arr, 0, arr.length - 1);

    // Final completed state
    sortSteps.push({
      array: [...arr],
      pivotIndex: -1,
      lowIndex: -1,
      highIndex: -1,
      comparing: [],
      swapping: [],
      partitioned: Array.from({ length: arr.length }, (_, i) => i),
      comparisons,
      swaps,
      currentI: -1,
      currentJ: -1,
      phase: 'completed',
      description: 'Quick Sort completed! Array is now sorted.',
      pseudocodeLine: -1,
      recursionLevel: 0
    });

    const endTime = performance.now();
    const sortMetrics: QuickSortMetrics = {
      totalSteps: sortSteps.length,
      comparisons,
      swaps,
      recursionDepth: maxRecursionDepth,
      timeComplexity: 'O(n log n) avg, O(n²) worst',
      spaceComplexity: `O(log n) avg, O(n) worst`,
      startTime,
      endTime
    };

    setSteps(sortSteps);
    setCurrentStep(0);
    setMetrics(sortMetrics);
    setIsPlaying(false);
    
    showTooltip('comparing-elements');
  };

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      const nextStepData = steps[currentStep + 1];
      if (nextStepData?.phase === 'completed') {
        showTooltip('sorted-elements');
      } else if (nextStepData?.swapping.length > 0) {
        showTooltip('swapping-elements');
      } else if (nextStepData?.comparing.length > 0) {
        showTooltip('comparing-elements');
      }
    } else {
      setIsPlaying(false);
    }
  }, [currentStep, steps, showTooltip]);

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setMetrics(null);
    hideTooltip();
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && steps.length > 0) {
      interval = setTimeout(() => {
        nextStep();
      }, stepByStepMode ? getAnimationDelay() : getAnimationDelay() / 2);
    }
    return () => clearTimeout(interval);
  }, [isPlaying, currentStep, steps.length, stepByStepMode, nextStep, getAnimationDelay]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (steps.length === 0) return;
      
      switch (event.code) {
        case 'Space':
          event.preventDefault();
          playPause();
          break;
        case 'KeyR':
          event.preventDefault();
          reset();
          break;
        case 'KeyS':
          event.preventDefault();
          setStepByStepMode(!stepByStepMode);
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextStep();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevStep();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [steps.length, isPlaying, stepByStepMode, nextStep]);

  const renderQuickSort = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const currentArray = steps.length > 0 ? steps[currentStep]?.array : originalArray;
    if (!currentArray) return;

    const elementWidth = Math.min(60, (canvas.width - 100) / currentArray.length);
    const elementHeight = 50;
    const startY = 120;
    const spacing = 5;
    const totalWidth = currentArray.length * (elementWidth + spacing) - spacing;
    const startX = (canvas.width - totalWidth) / 2;

    // Draw array elements
    currentArray.forEach((value, index) => {
      const x = startX + index * (elementWidth + spacing);
      const y = startY;

      let fillColor = currentTheme.colors.primary;
      let borderColor = currentTheme.colors.border;
      let textColor = 'white';
      
      if (steps.length > 0 && currentStep < steps.length) {
        const step = steps[currentStep];
        
        if (step.partitioned.includes(index)) {
          fillColor = currentTheme.colors.success;
          borderColor = currentTheme.colors.success;
        } else if (index === step.pivotIndex) {
          fillColor = currentTheme.colors.warning;
          borderColor = currentTheme.colors.warning;
        } else if (step.swapping.includes(index)) {
          fillColor = currentTheme.colors.error;
          borderColor = currentTheme.colors.error;
        } else if (step.comparing.includes(index)) {
          fillColor = currentTheme.colors.info;
          borderColor = currentTheme.colors.info;
        } else if (index >= step.lowIndex && index <= step.highIndex && step.lowIndex !== -1) {
          fillColor = currentTheme.colors.secondary;
          borderColor = currentTheme.colors.secondary;
        } else {
          fillColor = currentTheme.colors.textSecondary + '40';
          borderColor = currentTheme.colors.textSecondary;
          textColor = currentTheme.colors.textSecondary;
        }
      }

      // Draw element
      ctx.fillStyle = fillColor;
      ctx.fillRect(x, y, elementWidth, elementHeight);

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, elementWidth, elementHeight);

      // Draw value
      ctx.fillStyle = textColor;
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + elementWidth / 2, y + elementHeight / 2 + 5);

      // Draw index
      ctx.fillStyle = currentTheme.colors.textSecondary;
      ctx.font = '10px Arial';
      ctx.fillText(index.toString(), x + elementWidth / 2, y - 10);
    });

    // Draw additional indicators
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      
      // Draw recursion level indicator
      if (step.recursionLevel > 0) {
        ctx.fillStyle = currentTheme.colors.info;
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Recursion Level: ${step.recursionLevel}`, 20, 30);
      }

      // Draw phase indicator
      ctx.fillStyle = currentTheme.colors.primary;
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Phase: ${step.phase.toUpperCase()}`, canvas.width / 2, 50);

      // Draw description
      ctx.fillStyle = currentTheme.colors.text;
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(step.description, canvas.width / 2, 80);
    }
  };

  return (
    <div className="space-y-6" style={{ color: currentTheme.colors.text }}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>
          Enhanced Quick Sort Visualization
        </h2>
        <p className="opacity-80" style={{ color: currentTheme.colors.textSecondary }}>
          Interactive quick sort with divide-and-conquer visualization and performance metrics
        </p>
      </div>

      {/* Controls */}
      <Card 
        className="backdrop-blur-sm"
        style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}
      >
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Array Size Control */}
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" style={{ color: currentTheme.colors.primary }} />
              <span className="text-sm" style={{ color: currentTheme.colors.text }}>Size:</span>
              <div className="w-24">
                <Slider
                  value={arraySize}
                  onValueChange={setArraySize}
                  max={12}
                  min={4}
                  step={1}
                  className="w-full"
                />
              </div>
              <span className="text-sm w-8" style={{ color: currentTheme.colors.textSecondary }}>
                {arraySize[0]}
              </span>
            </div>

            <Button 
              onClick={generateRandomArray} 
              size="sm" 
              variant="outline"
              className="transition-all duration-200"
              style={{
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text,
                backgroundColor: 'transparent'
              }}
            >
              <Shuffle className="w-4 h-4 mr-2" />
              New Array
            </Button>

            <Button 
              onClick={generateSteps} 
              size="sm" 
              className="transition-all duration-200"
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: 'white'
              }}
              disabled={steps.length > 0}
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort
            </Button>

            {steps.length > 0 && (
              <div className="flex items-center gap-2">
                <Button 
                  onClick={playPause} 
                  size="sm" 
                  className="transition-all duration-200"
                  style={{
                    backgroundColor: currentTheme.colors.success,
                    color: 'white'
                  }}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button 
                  onClick={prevStep} 
                  size="sm" 
                  variant="outline"
                  className="transition-all duration-200"
                  style={{
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text,
                    backgroundColor: 'transparent'
                  }}
                  disabled={currentStep === 0}
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={nextStep} 
                  size="sm" 
                  variant="outline"
                  className="transition-all duration-200"
                  style={{
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text,
                    backgroundColor: 'transparent'
                  }}
                  disabled={currentStep >= steps.length - 1}
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button 
                onClick={() => setStepByStepMode(!stepByStepMode)}
                size="sm" 
                variant="outline"
                className={`transition-all duration-200 ${stepByStepMode ? 'ring-2' : ''}`}
                style={{
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text,
                  backgroundColor: stepByStepMode ? currentTheme.colors.primary + '20' : 'transparent',
                  ...(stepByStepMode && { ringColor: currentTheme.colors.primary + '50' })
                }}
              >
                <Zap className="w-4 h-4 mr-2" />
                Step Mode
              </Button>
              
              <Button 
                onClick={() => setShowPseudocode(!showPseudocode)}
                size="sm" 
                variant="outline"
                className="transition-all duration-200"
                style={{
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text,
                  backgroundColor: 'transparent'
                }}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Code
              </Button>

              <Button 
                onClick={reset} 
                size="sm" 
                variant="outline"
                className="transition-all duration-200"
                style={{
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text,
                  backgroundColor: 'transparent'
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Keyboard shortcuts info */}
          <div className="mt-3 text-xs" style={{ color: currentTheme.colors.textSecondary }}>
            <span className="font-medium">Shortcuts:</span> Space (Play/Pause), R (Reset), S (Step Mode), ← → (Navigate)
          </div>
        </CardContent>
      </Card>

      {/* Metrics Dashboard */}
      {steps.length > 0 && metrics && (
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Current Step', value: `${currentStep + 1} / ${steps.length}`, icon: <Clock className="w-4 h-4" /> },
            { label: 'Comparisons', value: steps[currentStep]?.comparisons || 0, icon: <BarChart3 className="w-4 h-4" /> },
            { label: 'Swaps', value: steps[currentStep]?.swaps || 0, icon: <ArrowUpDown className="w-4 h-4" /> },
            { label: 'Max Recursion', value: metrics.recursionDepth, icon: <TrendingUp className="w-4 h-4" /> }
          ].map((metric, index) => (
            <Card 
              key={index}
              className="backdrop-blur-sm"
              style={{ 
                backgroundColor: currentTheme.colors.surface + '95',
                borderColor: currentTheme.colors.border 
              }}
            >
              <CardContent className="p-3 text-center">
                <div className="flex items-center justify-center gap-2 mb-1" style={{ color: currentTheme.colors.primary }}>
                  {metric.icon}
                  <span className="font-bold">{metric.value}</span>
                </div>
                <div className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                  {metric.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Visualization */}
      <Card 
        className="backdrop-blur-sm"
        style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}
      >
        <CardContent className="p-6">
          <div 
            className="rounded-lg mx-auto transition-all duration-200"
            style={{ 
              backgroundColor: currentTheme.colors.background,
              border: `2px solid ${currentTheme.colors.border}`,
              display: 'inline-block'
            }}
          >
            <Canvas
              width={800}
              height={200}
              onRender={renderQuickSort}
              className="rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Side-by-side: Pseudocode and Legend */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pseudocode Panel */}
        {showPseudocode && (
          <Card 
            className="backdrop-blur-sm"
            style={{ 
              backgroundColor: currentTheme.colors.surface + '95',
              borderColor: currentTheme.colors.border 
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2" style={{ color: currentTheme.colors.text }}>
                <BookOpen className="w-5 h-5" />
                Quick Sort Pseudocode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 font-mono text-sm">
                {pseudocode.map((line, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded transition-all duration-200 ${
                      steps.length > 0 && steps[currentStep]?.pseudocodeLine === index + 1 ? 'ring-2' : ''
                    }`}
                    style={{
                      backgroundColor: steps.length > 0 && steps[currentStep]?.pseudocodeLine === index + 1 
                        ? currentTheme.colors.primary + '20' 
                        : 'transparent',
                      color: steps.length > 0 && steps[currentStep]?.pseudocodeLine === index + 1 
                        ? currentTheme.colors.primary 
                        : currentTheme.colors.text,
                      ...(steps.length > 0 && steps[currentStep]?.pseudocodeLine === index + 1 && { 
                        ringColor: currentTheme.colors.primary + '50' 
                      })
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Legend and Info */}
        <Card 
          className="backdrop-blur-sm"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: currentTheme.colors.text }}>
              <Activity className="w-5 h-5" />
              Color Legend & Algorithm Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Color Legend */}
            <div>
              <h4 className="font-semibold mb-3 text-sm" style={{ color: currentTheme.colors.text }}>
                Element Colors:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  { color: currentTheme.colors.warning, label: 'Pivot Element' },
                  { color: currentTheme.colors.info, label: 'Comparing' },
                  { color: currentTheme.colors.error, label: 'Swapping' },
                  { color: currentTheme.colors.success, label: 'Sorted' },
                  { color: currentTheme.colors.secondary, label: 'Current Range' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ 
                        backgroundColor: item.color,
                        borderColor: currentTheme.colors.border
                      }}
                    />
                    <span style={{ color: currentTheme.colors.textSecondary }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Algorithm Properties */}
            <div>
              <h4 className="font-semibold mb-3 text-sm" style={{ color: currentTheme.colors.text }}>
                Algorithm Properties:
              </h4>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Average Time', value: 'O(n log n)', color: currentTheme.colors.success },
                  { label: 'Worst Time', value: 'O(n²)', color: currentTheme.colors.error },
                  { label: 'Space Complexity', value: 'O(log n) avg', color: currentTheme.colors.info },
                  { label: 'In-place', value: 'Yes', color: currentTheme.colors.success },
                  { label: 'Stable', value: 'No', color: currentTheme.colors.warning }
                ].map((prop, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span style={{ color: currentTheme.colors.textSecondary }}>{prop.label}:</span>
                    <Badge 
                      className="text-xs"
                      style={{
                        backgroundColor: prop.color + '20',
                        color: prop.color,
                        border: 'none'
                      }}
                    >
                      {prop.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Step Info */}
            {steps.length > 0 && steps[currentStep] && (
              <div>
                <h4 className="font-semibold mb-2 text-sm flex items-center gap-2" style={{ color: currentTheme.colors.text }}>
                  <ArrowRight className="w-4 h-4" />
                  Current Step Analysis:
                </h4>
                <div 
                  className="p-3 rounded-lg border-l-4 text-sm"
                  style={{
                    backgroundColor: currentTheme.colors.info + '20',
                    borderLeftColor: currentTheme.colors.info,
                    color: currentTheme.colors.text
                  }}
                >
                  {steps[currentStep].description}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Interactive Quiz */}
      {steps.length > 0 && (
        <InteractiveQuiz
          currentContext="sorting"
          currentStep={currentStep}
          totalSteps={steps.length}
          onQuizComplete={(correct) => {
            console.log('Quiz completed:', correct);
          }}
        />
      )}
    </div>
  );
};
