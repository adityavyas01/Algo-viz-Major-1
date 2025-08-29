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
  Search
} from 'lucide-react';

interface SelectionSortStep {
  array: number[];
  currentIndex: number;
  minIndex: number;
  comparing: number;
  swapping: boolean;
  sortedSection: number[];
  description: string;
  comparisons: number;
  swaps: number;
}

interface SelectionSortMetrics {
  totalComparisons: number;
  totalSwaps: number;
  startTime: number;
  endTime?: number;
  timeComplexity: string;
  spaceComplexity: string;
}

const ModernSelectionSortVisualization: React.FC = () => {
  const { currentTheme, animationSpeed } = useVisualizationTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [originalArray, setOriginalArray] = useState([64, 25, 12, 22, 11, 90, 88, 76, 50, 42]);
  const [steps, setSteps] = useState<SelectionSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [metrics, setMetrics] = useState<SelectionSortMetrics | null>(null);
  const [showPseudocode, setShowPseudocode] = useState(false);

  const generateSelectionSortSteps = useCallback((arr: number[]) => {
    const sortSteps: SelectionSortStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    const workingArray = [...arr];
    const sortedSection: number[] = [];

    // Initial state
    sortSteps.push({
      array: [...workingArray],
      currentIndex: -1,
      minIndex: -1,
      comparing: -1,
      swapping: false,
      sortedSection: [...sortedSection],
      description: 'Starting Selection Sort. Finding minimum element in unsorted portion.',
      comparisons,
      swaps
    });

    const startTime = performance.now();

    for (let i = 0; i < workingArray.length - 1; i++) {
      let minIdx = i;
      
      // Show current position being filled
      sortSteps.push({
        array: [...workingArray],
        currentIndex: i,
        minIndex: minIdx,
        comparing: -1,
        swapping: false,
        sortedSection: [...sortedSection],
        description: `Position ${i}: Finding minimum in remaining unsorted elements`,
        comparisons,
        swaps
      });

      for (let j = i + 1; j < workingArray.length; j++) {
        comparisons++;
        
        // Show comparison
        sortSteps.push({
          array: [...workingArray],
          currentIndex: i,
          minIndex: minIdx,
          comparing: j,
          swapping: false,
          sortedSection: [...sortedSection],
          description: `Comparing ${workingArray[j]} with current minimum ${workingArray[minIdx]}`,
          comparisons,
          swaps
        });

        if (workingArray[j] < workingArray[minIdx]) {
          minIdx = j;
          
          // Show new minimum found
          sortSteps.push({
            array: [...workingArray],
            currentIndex: i,
            minIndex: minIdx,
            comparing: j,
            swapping: false,
            sortedSection: [...sortedSection],
            description: `New minimum found: ${workingArray[minIdx]} at position ${minIdx}`,
            comparisons,
            swaps
          });
        }
      }

      // Perform swap if needed
      if (minIdx !== i) {
        swaps++;
        
        // Show swapping
        sortSteps.push({
          array: [...workingArray],
          currentIndex: i,
          minIndex: minIdx,
          comparing: -1,
          swapping: true,
          sortedSection: [...sortedSection],
          description: `Swapping ${workingArray[i]} and ${workingArray[minIdx]}`,
          comparisons,
          swaps
        });

        [workingArray[i], workingArray[minIdx]] = [workingArray[minIdx], workingArray[i]];
      }

      // Mark element as sorted
      sortedSection.push(i);
      
      sortSteps.push({
        array: [...workingArray],
        currentIndex: -1,
        minIndex: -1,
        comparing: -1,
        swapping: false,
        sortedSection: [...sortedSection],
        description: `Element ${workingArray[i]} placed in correct position ${i}`,
        comparisons,
        swaps
      });
    }

    // Mark last element as sorted
    sortedSection.push(workingArray.length - 1);
    
    const endTime = performance.now();

    sortSteps.push({
      array: [...workingArray],
      currentIndex: -1,
      minIndex: -1,
      comparing: -1,
      swapping: false,
      sortedSection: [...sortedSection],
      description: 'Selection Sort complete! All elements are now in sorted order.',
      comparisons,
      swaps
    });

    setMetrics({
      totalComparisons: comparisons,
      totalSwaps: swaps,
      startTime,
      endTime,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)'
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
    const elementHeight = 50;
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
      if (step.sortedSection.includes(index)) {
        fillColor = currentTheme.colors.success;
      } else if (index === step.currentIndex) {
        fillColor = currentTheme.colors.primary;
        glowColor = currentTheme.colors.primary;
      } else if (index === step.minIndex) {
        fillColor = currentTheme.colors.warning;
        glowColor = currentTheme.colors.warning;
      } else if (index === step.comparing) {
        fillColor = currentTheme.colors.info;
        glowColor = currentTheme.colors.info;
      } else if (step.swapping && (index === step.currentIndex || index === step.minIndex)) {
        fillColor = currentTheme.colors.error;
        glowColor = currentTheme.colors.error;
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
      context.font = 'bold 16px Arial';
      context.textAlign = 'center';
      context.fillText(value.toString(), x + elementWidth / 2, arrayY + elementHeight / 2 + 6);

      // Index labels
      context.fillStyle = currentTheme.colors.textSecondary;
      context.font = '12px Arial';
      context.fillText(index.toString(), x + elementWidth / 2, arrayY - 10);
    });

    // Draw pointers and labels
    if (step.currentIndex >= 0) {
      const currentX = startX + step.currentIndex * (elementWidth + spacing) + elementWidth / 2;
      context.fillStyle = currentTheme.colors.primary;
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.fillText('CURRENT', currentX, arrayY - 35);
      
      // Arrow
      context.strokeStyle = currentTheme.colors.primary;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(currentX, arrayY - 25);
      context.lineTo(currentX, arrayY - 5);
      context.stroke();
      // Arrowhead
      context.beginPath();
      context.moveTo(currentX - 5, arrayY - 10);
      context.lineTo(currentX, arrayY - 5);
      context.lineTo(currentX + 5, arrayY - 10);
      context.stroke();
    }

    if (step.minIndex >= 0 && step.minIndex !== step.currentIndex) {
      const minX = startX + step.minIndex * (elementWidth + spacing) + elementWidth / 2;
      context.fillStyle = currentTheme.colors.warning;
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.fillText('MIN', minX, arrayY + elementHeight + 25);
      
      // Arrow
      context.strokeStyle = currentTheme.colors.warning;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(minX, arrayY + elementHeight + 5);
      context.lineTo(minX, arrayY + elementHeight + 15);
      context.stroke();
      // Arrowhead
      context.beginPath();
      context.moveTo(minX - 5, arrayY + elementHeight + 10);
      context.lineTo(minX, arrayY + elementHeight + 5);
      context.lineTo(minX + 5, arrayY + elementHeight + 10);
      context.stroke();
    }

    if (step.comparing >= 0) {
      const compareX = startX + step.comparing * (elementWidth + spacing) + elementWidth / 2;
      context.fillStyle = currentTheme.colors.info;
      context.font = 'bold 12px Arial';
      context.textAlign = 'center';
      context.fillText('COMPARING', compareX, arrayY - 35);
    }

    // Draw sorted/unsorted boundary
    if (step.sortedSection.length > 0) {
      const boundaryX = startX + step.sortedSection.length * (elementWidth + spacing) - spacing / 2;
      context.strokeStyle = currentTheme.colors.success;
      context.lineWidth = 3;
      context.setLineDash([5, 5]);
      
      context.beginPath();
      context.moveTo(boundaryX, arrayY - 20);
      context.lineTo(boundaryX, arrayY + elementHeight + 20);
      context.stroke();
      
      context.setLineDash([]);
      
      // Labels
      context.fillStyle = currentTheme.colors.success;
      context.font = 'bold 12px Arial';
      context.textAlign = 'center';
      context.fillText('SORTED', startX + (step.sortedSection.length * (elementWidth + spacing)) / 2, arrayY - 50);
      
      if (step.sortedSection.length < step.array.length) {
        context.fillStyle = currentTheme.colors.textSecondary;
        const unsortedStart = boundaryX + spacing;
        const unsortedWidth = (step.array.length - step.sortedSection.length) * (elementWidth + spacing);
        context.fillText('UNSORTED', unsortedStart + unsortedWidth / 2, arrayY - 50);
      }
    }

    // Draw legend
    const legendY = canvas.height - 80;
    const legendItems = [
      { color: currentTheme.colors.success, label: 'Sorted' },
      { color: currentTheme.colors.primary, label: 'Current Position' },
      { color: currentTheme.colors.warning, label: 'Minimum Found' },
      { color: currentTheme.colors.info, label: 'Comparing' },
      { color: currentTheme.colors.error, label: 'Swapping' }
    ];

    legendItems.forEach((item, index) => {
      const legendX = 20 + index * 130;
      
      context.fillStyle = item.color;
      context.fillRect(legendX, legendY, 15, 15);
      
      context.fillStyle = currentTheme.colors.text;
      context.font = '12px Arial';
      context.textAlign = 'left';
      context.fillText(item.label, legendX + 20, legendY + 12);
    });
  }, [currentStep, steps, currentTheme]);

  useEffect(() => {
    generateSelectionSortSteps(originalArray);
  }, [originalArray, generateSelectionSortSteps]);

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
    'function selectionSort(array):',
    '  for i = 0 to array.length - 1:',
    '    minIndex = i',
    '    ',
    '    for j = i + 1 to array.length:',
    '      if array[j] < array[minIndex]:',
    '        minIndex = j',
    '    ',
    '    if minIndex != i:',
    '      swap(array[i], array[minIndex])',
    '  ',
    '  return array'
  ];

  return (
    <ModernVisualizationBase
      title="Selection Sort Visualization"
      description="Watch how selection sort finds the minimum element and places it in the correct position"
      difficulty="Beginner"
      category="Sorting"
      complexity={{
        time: "O(n²)",
        space: "O(1)"
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
        { label: 'Current Position', value: currentStepData?.currentIndex >= 0 ? currentStepData.currentIndex : '-', icon: <Target className="w-4 h-4" /> },
        { label: 'Min Found', value: currentStepData?.minIndex >= 0 ? originalArray[currentStepData.minIndex] : '-', icon: <Search className="w-4 h-4" /> }
      ] : undefined}
      educational={{
        keyPoints: [
          'Finds minimum element in unsorted portion',
          'Swaps minimum with first unsorted element',
          'Maintains sorted and unsorted sections',
          'Always makes exactly n-1 swaps',
          'Good when memory writes are expensive'
        ],
        pseudocode: pseudocodeLines,
        realWorldUse: [
          'Small datasets where simplicity is preferred',
          'Systems where memory writes are expensive',
          'Educational purposes to understand sorting',
          'Situations requiring minimal memory usage'
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
            height={250}
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
              Selection Sort Pseudocode
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
                { label: 'Time Complexity', value: 'O(n²)', color: currentTheme.colors.error },
                { label: 'Space Complexity', value: 'O(1)', color: currentTheme.colors.success },
                { label: 'Stability', value: 'No', color: currentTheme.colors.error },
                { label: 'In-Place', value: 'Yes', color: currentTheme.colors.success },
                { label: 'Comparisons', value: 'n(n-1)/2', color: currentTheme.colors.warning },
                { label: 'Max Swaps', value: 'n-1', color: currentTheme.colors.info }
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
              How Selection Sort Works
            </h3>
            <div className="space-y-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p>• <strong>Find Minimum:</strong> Search for smallest element in unsorted portion</p>
              <p>• <strong>Swap:</strong> Place minimum at beginning of unsorted section</p>
              <p>• <strong>Shrink:</strong> Reduce unsorted section by one element</p>
              <p>• <strong>Repeat:</strong> Continue until entire array is sorted</p>
              <p>• <strong>Advantage:</strong> Minimizes number of swaps performed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernSelectionSortVisualization;
