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
  Move
} from 'lucide-react';

interface InsertionSortStep {
  array: number[];
  currentIndex: number;
  keyValue: number;
  shiftingIndex: number;
  insertPosition: number;
  phase: 'select' | 'compare' | 'shift' | 'insert' | 'complete';
  description: string;
  comparisons: number;
  shifts: number;
}

interface InsertionSortMetrics {
  totalComparisons: number;
  totalShifts: number;
  startTime: number;
  endTime?: number;
  timeComplexity: string;
  spaceComplexity: string;
}

const ModernInsertionSortVisualization: React.FC = () => {
  const { currentTheme, animationSpeed } = useVisualizationTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [originalArray, setOriginalArray] = useState([64, 25, 12, 22, 11, 90, 88, 76, 50, 42]);
  const [steps, setSteps] = useState<InsertionSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [metrics, setMetrics] = useState<InsertionSortMetrics | null>(null);
  const [showPseudocode, setShowPseudocode] = useState(false);

  const generateInsertionSortSteps = useCallback((arr: number[]) => {
    const sortSteps: InsertionSortStep[] = [];
    let comparisons = 0;
    let shifts = 0;
    const workingArray = [...arr];

    // Initial state
    sortSteps.push({
      array: [...workingArray],
      currentIndex: -1,
      keyValue: -1,
      shiftingIndex: -1,
      insertPosition: -1,
      phase: 'select',
      description: 'Starting Insertion Sort. First element is considered sorted.',
      comparisons,
      shifts
    });

    const startTime = performance.now();

    for (let i = 1; i < workingArray.length; i++) {
      const key = workingArray[i];
      
      // Select current element as key
      sortSteps.push({
        array: [...workingArray],
        currentIndex: i,
        keyValue: key,
        shiftingIndex: -1,
        insertPosition: -1,
        phase: 'select',
        description: `Selecting element ${key} at position ${i} as the key to insert`,
        comparisons,
        shifts
      });

      let j = i - 1;

      // Find correct position for the key
      while (j >= 0 && workingArray[j] > key) {
        comparisons++;
        
        // Show comparison
        sortSteps.push({
          array: [...workingArray],
          currentIndex: i,
          keyValue: key,
          shiftingIndex: j,
          insertPosition: -1,
          phase: 'compare',
          description: `Comparing key ${key} with ${workingArray[j]} at position ${j}`,
          comparisons,
          shifts
        });

        // Shift element to the right
        shifts++;
        workingArray[j + 1] = workingArray[j];
        
        sortSteps.push({
          array: [...workingArray],
          currentIndex: i,
          keyValue: key,
          shiftingIndex: j,
          insertPosition: j + 1,
          phase: 'shift',
          description: `Shifting ${workingArray[j]} to position ${j + 1}`,
          comparisons,
          shifts
        });

        j--;
      }

      // Final comparison if we stopped due to finding correct position
      if (j >= 0) {
        comparisons++;
        sortSteps.push({
          array: [...workingArray],
          currentIndex: i,
          keyValue: key,
          shiftingIndex: j,
          insertPosition: -1,
          phase: 'compare',
          description: `Key ${key} is greater than or equal to ${workingArray[j]}`,
          comparisons,
          shifts
        });
      }

      // Insert the key at correct position
      workingArray[j + 1] = key;
      
      sortSteps.push({
        array: [...workingArray],
        currentIndex: i,
        keyValue: key,
        shiftingIndex: -1,
        insertPosition: j + 1,
        phase: 'insert',
        description: `Inserting key ${key} at position ${j + 1}`,
        comparisons,
        shifts
      });

      // Show completed state for this iteration
      sortSteps.push({
        array: [...workingArray],
        currentIndex: -1,
        keyValue: -1,
        shiftingIndex: -1,
        insertPosition: -1,
        phase: 'complete',
        description: `Elements 0 to ${i} are now sorted`,
        comparisons,
        shifts
      });
    }

    const endTime = performance.now();

    sortSteps.push({
      array: [...workingArray],
      currentIndex: -1,
      keyValue: -1,
      shiftingIndex: -1,
      insertPosition: -1,
      phase: 'complete',
      description: 'Insertion Sort complete! All elements are now in sorted order.',
      comparisons,
      shifts
    });

    setMetrics({
      totalComparisons: comparisons,
      totalShifts: shifts,
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
      if (index < step.currentIndex || (step.currentIndex === -1 && step.phase === 'complete')) {
        fillColor = currentTheme.colors.success;
      } else if (index === step.currentIndex) {
        fillColor = currentTheme.colors.primary;
        glowColor = currentTheme.colors.primary;
      } else if (index === step.shiftingIndex) {
        fillColor = currentTheme.colors.warning;
        glowColor = currentTheme.colors.warning;
      } else if (index === step.insertPosition) {
        fillColor = currentTheme.colors.info;
        glowColor = currentTheme.colors.info;
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

    // Draw key value display
    if (step.keyValue >= 0) {
      const keyX = 50;
      const keyY = 30;
      const keyWidth = 60;
      const keyHeight = 40;

      context.shadowColor = currentTheme.colors.primary;
      context.shadowBlur = 10;
      
      context.fillStyle = currentTheme.colors.primary;
      context.fillRect(keyX, keyY, keyWidth, keyHeight);
      
      context.shadowBlur = 0;
      
      context.strokeStyle = currentTheme.colors.border;
      context.lineWidth = 2;
      context.strokeRect(keyX, keyY, keyWidth, keyHeight);

      context.fillStyle = 'white';
      context.font = 'bold 16px Arial';
      context.textAlign = 'center';
      context.fillText(step.keyValue.toString(), keyX + keyWidth / 2, keyY + keyHeight / 2 + 6);

      // Key label
      context.fillStyle = currentTheme.colors.text;
      context.font = 'bold 12px Arial';
      context.fillText('KEY', keyX + keyWidth / 2, keyY - 5);
    }

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

    if (step.shiftingIndex >= 0) {
      const shiftX = startX + step.shiftingIndex * (elementWidth + spacing) + elementWidth / 2;
      context.fillStyle = currentTheme.colors.warning;
      context.font = 'bold 12px Arial';
      context.textAlign = 'center';
      context.fillText('COMPARING', shiftX, arrayY - 35);
    }

    if (step.insertPosition >= 0) {
      const insertX = startX + step.insertPosition * (elementWidth + spacing) + elementWidth / 2;
      context.fillStyle = currentTheme.colors.info;
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.fillText('INSERT', insertX, arrayY + elementHeight + 25);
      
      // Arrow pointing up
      context.strokeStyle = currentTheme.colors.info;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(insertX, arrayY + elementHeight + 5);
      context.lineTo(insertX, arrayY + elementHeight + 15);
      context.stroke();
      // Arrowhead
      context.beginPath();
      context.moveTo(insertX - 5, arrayY + elementHeight + 10);
      context.lineTo(insertX, arrayY + elementHeight + 5);
      context.lineTo(insertX + 5, arrayY + elementHeight + 10);
      context.stroke();
    }

    // Draw sorted/unsorted boundary
    if (step.currentIndex > 0 || (step.currentIndex === -1 && step.phase === 'complete')) {
      const sortedEnd = step.currentIndex === -1 ? step.array.length : step.currentIndex;
      const boundaryX = startX + sortedEnd * (elementWidth + spacing) - spacing / 2;
      
      if (sortedEnd < step.array.length) {
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
        context.fillText('SORTED', startX + (sortedEnd * (elementWidth + spacing)) / 2, arrayY - 50);
        
        context.fillStyle = currentTheme.colors.textSecondary;
        const unsortedStart = boundaryX + spacing;
        const unsortedWidth = (step.array.length - sortedEnd) * (elementWidth + spacing);
        context.fillText('UNSORTED', unsortedStart + unsortedWidth / 2, arrayY - 50);
      }
    }

    // Draw legend
    const legendY = canvas.height - 80;
    const legendItems = [
      { color: currentTheme.colors.success, label: 'Sorted' },
      { color: currentTheme.colors.primary, label: 'Current Key' },
      { color: currentTheme.colors.warning, label: 'Comparing' },
      { color: currentTheme.colors.info, label: 'Insert Position' }
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
    generateInsertionSortSteps(originalArray);
  }, [originalArray, generateInsertionSortSteps]);

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
    'function insertionSort(array):',
    '  for i = 1 to array.length:',
    '    key = array[i]',
    '    j = i - 1',
    '    ',
    '    while j >= 0 and array[j] > key:',
    '      array[j + 1] = array[j]',
    '      j = j - 1',
    '    ',
    '    array[j + 1] = key',
    '  ',
    '  return array'
  ];

  return (
    <ModernVisualizationBase
      title="Insertion Sort Visualization"
      description="Watch how insertion sort builds a sorted array one element at a time"
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
        { label: 'Shifts', value: currentStepData?.shifts || 0, icon: <Move className="w-4 h-4" /> },
        { label: 'Current Key', value: currentStepData?.keyValue >= 0 ? currentStepData.keyValue : '-', icon: <Target className="w-4 h-4" /> },
        { label: 'Phase', value: currentStepData?.phase || '-', icon: <Eye className="w-4 h-4" /> }
      ] : undefined}
      educational={{
        keyPoints: [
          'Builds sorted array one element at a time',
          'Maintains sorted portion at the beginning',
          'Shifts elements to make room for insertion',
          'Efficient for small datasets or nearly sorted data',
          'Stable sorting algorithm'
        ],
        pseudocode: pseudocodeLines,
        realWorldUse: [
          'Small datasets where simplicity is key',
          'Nearly sorted data (performs well)',
          'Online algorithms (sorts data as it arrives)',
          'Hybrid algorithms as a subroutine'
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
            height={280}
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
              Insertion Sort Pseudocode
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
                { label: 'Best Time', value: 'O(n)', color: currentTheme.colors.success },
                { label: 'Average Time', value: 'O(n²)', color: currentTheme.colors.warning },
                { label: 'Worst Time', value: 'O(n²)', color: currentTheme.colors.error },
                { label: 'Space Complexity', value: 'O(1)', color: currentTheme.colors.success },
                { label: 'Stability', value: 'Yes', color: currentTheme.colors.success },
                { label: 'In-Place', value: 'Yes', color: currentTheme.colors.success }
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
              How Insertion Sort Works
            </h3>
            <div className="space-y-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p>• <strong>Pick:</strong> Take next element from unsorted portion</p>
              <p>• <strong>Compare:</strong> Compare with sorted elements from right to left</p>
              <p>• <strong>Shift:</strong> Move larger elements one position right</p>
              <p>• <strong>Insert:</strong> Place element in correct position</p>
              <p>• <strong>Repeat:</strong> Continue until all elements are processed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernInsertionSortVisualization;
