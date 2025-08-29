import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernCanvas } from './ModernCanvas';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack,
  Search,
  Target,
  BarChart3,
  Clock,
  BookOpen,
  Crosshair,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface SearchStep {
  array: number[];
  target: number;
  left: number;
  right: number;
  mid: number;
  found: boolean;
  comparison: 'less' | 'greater' | 'equal' | 'none';
  description: string;
  comparisons: number;
}

interface SearchMetrics {
  totalComparisons: number;
  searchRange: string;
  elementsEliminated: number;
  startTime: number;
  endTime?: number;
  timeComplexity: string;
  spaceComplexity: string;
}

const ModernBinarySearchVisualization: React.FC = () => {
  const { currentTheme, animationSpeed } = useVisualizationTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [sortedArray] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78, 89, 94]);
  const [target, setTarget] = useState('23');
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [metrics, setMetrics] = useState<SearchMetrics | null>(null);
  const [showPseudocode, setShowPseudocode] = useState(false);

  const generateSearchSteps = useCallback((arr: number[], targetValue: number) => {
    const searchSteps: SearchStep[] = [];
    let comparisons = 0;
    let left = 0;
    let right = arr.length - 1;
    let found = false;

    // Initial state
    searchSteps.push({
      array: [...arr],
      target: targetValue,
      left,
      right,
      mid: -1,
      found: false,
      comparison: 'none',
      description: `Searching for ${targetValue} in sorted array. Initial range: [${left}, ${right}]`,
      comparisons
    });

    const startTime = performance.now();

    while (left <= right && !found) {
      const mid = Math.floor((left + right) / 2);
      comparisons++;

      let comparison: 'less' | 'greater' | 'equal' = 'equal';
      let description = '';

      if (arr[mid] === targetValue) {
        found = true;
        comparison = 'equal';
        description = `Found! ${targetValue} == ${arr[mid]} at index ${mid}`;
      } else if (arr[mid] < targetValue) {
        comparison = 'less';
        description = `${arr[mid]} < ${targetValue}, search right half`;
        left = mid + 1;
      } else {
        comparison = 'greater';
        description = `${arr[mid]} > ${targetValue}, search left half`;
        right = mid - 1;
      }

      searchSteps.push({
        array: [...arr],
        target: targetValue,
        left: found ? left : (comparison === 'less' ? mid + 1 : left),
        right: found ? right : (comparison === 'greater' ? mid - 1 : right),
        mid,
        found,
        comparison,
        description,
        comparisons
      });
    }

    const endTime = performance.now();

    if (!found && left > right) {
      searchSteps.push({
        array: [...arr],
        target: targetValue,
        left,
        right,
        mid: -1,
        found: false,
        comparison: 'none',
        description: `Target ${targetValue} not found in array`,
        comparisons
      });
    }

    setMetrics({
      totalComparisons: comparisons,
      searchRange: `[0, ${arr.length - 1}]`,
      elementsEliminated: arr.length - (found ? 1 : 0),
      startTime,
      endTime,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)'
    });

    setSteps(searchSteps);
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

  const handleSearch = () => {
    const targetValue = parseInt(target);
    if (!isNaN(targetValue)) {
      generateSearchSteps(sortedArray, targetValue);
      reset();
    }
  };

  const drawVisualization = useCallback((context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!steps.length || !steps[currentStep]) return;

    const step = steps[currentStep];
    context.clearRect(0, 0, canvas.width, canvas.height);

    const elementWidth = 50;
    const elementHeight = 50;
    const spacing = 8;
    const startX = (canvas.width - (step.array.length * (elementWidth + spacing))) / 2;
    const arrayY = 120;

    // Draw array elements
    step.array.forEach((value, index) => {
      const x = startX + index * (elementWidth + spacing);
      let fillColor = currentTheme.colors.surface;
      let borderColor = currentTheme.colors.border;
      let glowColor = '';

      // Color coding based on search state
      if (index === step.mid && step.found) {
        fillColor = currentTheme.colors.success;
        glowColor = currentTheme.colors.success;
      } else if (index === step.mid) {
        fillColor = currentTheme.colors.warning;
        glowColor = currentTheme.colors.warning;
      } else if (index >= step.left && index <= step.right) {
        fillColor = currentTheme.colors.primary;
      } else {
        fillColor = currentTheme.colors.surface + '60';
        borderColor = currentTheme.colors.border + '60';
      }

      // Draw glow effect for active elements
      if (glowColor) {
        context.shadowColor = glowColor;
        context.shadowBlur = 20;
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

    // Draw search range indicators
    if (step.left >= 0 && step.right >= 0 && step.left <= step.right) {
      const leftX = startX + step.left * (elementWidth + spacing);
      const rightX = startX + step.right * (elementWidth + spacing) + elementWidth;
      
      // Range background
      context.fillStyle = currentTheme.colors.primary + '20';
      context.fillRect(leftX, arrayY - 5, rightX - leftX, elementHeight + 10);
      
      // Range borders
      context.strokeStyle = currentTheme.colors.primary;
      context.lineWidth = 3;
      context.setLineDash([5, 5]);
      
      context.beginPath();
      context.moveTo(leftX, arrayY - 20);
      context.lineTo(leftX, arrayY + elementHeight + 20);
      context.stroke();
      
      context.beginPath();
      context.moveTo(rightX, arrayY - 20);
      context.lineTo(rightX, arrayY + elementHeight + 20);
      context.stroke();
      
      context.setLineDash([]);
    }

    // Draw pointers
    if (step.left >= 0 && step.left < step.array.length) {
      const leftX = startX + step.left * (elementWidth + spacing) + elementWidth / 2;
      context.fillStyle = currentTheme.colors.info;
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.fillText('LEFT', leftX, arrayY - 35);
      
      // Arrow
      context.strokeStyle = currentTheme.colors.info;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(leftX, arrayY - 25);
      context.lineTo(leftX, arrayY - 5);
      context.stroke();
      // Arrowhead
      context.beginPath();
      context.moveTo(leftX - 5, arrayY - 10);
      context.lineTo(leftX, arrayY - 5);
      context.lineTo(leftX + 5, arrayY - 10);
      context.stroke();
    }

    if (step.right >= 0 && step.right < step.array.length && step.left <= step.right) {
      const rightX = startX + step.right * (elementWidth + spacing) + elementWidth / 2;
      context.fillStyle = currentTheme.colors.error;
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.fillText('RIGHT', rightX, arrayY - 35);
      
      // Arrow
      context.strokeStyle = currentTheme.colors.error;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(rightX, arrayY - 25);
      context.lineTo(rightX, arrayY - 5);
      context.stroke();
      // Arrowhead
      context.beginPath();
      context.moveTo(rightX - 5, arrayY - 10);
      context.lineTo(rightX, arrayY - 5);
      context.lineTo(rightX + 5, arrayY - 10);
      context.stroke();
    }

    if (step.mid >= 0 && step.mid < step.array.length) {
      const midX = startX + step.mid * (elementWidth + spacing) + elementWidth / 2;
      context.fillStyle = step.found ? currentTheme.colors.success : currentTheme.colors.warning;
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.fillText('MID', midX, arrayY + elementHeight + 25);
      
      // Arrow
      context.strokeStyle = step.found ? currentTheme.colors.success : currentTheme.colors.warning;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(midX, arrayY + elementHeight + 5);
      context.lineTo(midX, arrayY + elementHeight + 15);
      context.stroke();
      // Arrowhead
      context.beginPath();
      context.moveTo(midX - 5, arrayY + elementHeight + 10);
      context.lineTo(midX, arrayY + elementHeight + 5);
      context.lineTo(midX + 5, arrayY + elementHeight + 10);
      context.stroke();
    }

    // Draw target indicator
    context.fillStyle = currentTheme.colors.text;
    context.font = 'bold 18px Arial';
    context.textAlign = 'center';
    context.fillText(`Target: ${step.target}`, canvas.width / 2, 40);

    // Draw comparison result
    if (step.mid >= 0 && step.comparison !== 'none') {
      const comparisonY = 60;
      context.fillStyle = currentTheme.colors.textSecondary;
      context.font = '14px Arial';
      
      let comparisonText = '';
      if (step.comparison === 'equal') {
        comparisonText = `${step.array[step.mid]} == ${step.target} ✓`;
        context.fillStyle = currentTheme.colors.success;
      } else if (step.comparison === 'less') {
        comparisonText = `${step.array[step.mid]} < ${step.target}`;
        context.fillStyle = currentTheme.colors.info;
      } else if (step.comparison === 'greater') {
        comparisonText = `${step.array[step.mid]} > ${step.target}`;
        context.fillStyle = currentTheme.colors.error;
      }
      
      context.fillText(comparisonText, canvas.width / 2, comparisonY);
    }

    // Draw step counter
    context.fillStyle = currentTheme.colors.text;
    context.font = '14px Arial';
    context.textAlign = 'left';
    context.fillText(`Comparisons: ${step.comparisons}`, 20, 30);
  }, [currentStep, steps, currentTheme]);

  useEffect(() => {
    const targetValue = parseInt(target);
    if (!isNaN(targetValue)) {
      generateSearchSteps(sortedArray, targetValue);
    }
  }, [target, generateSearchSteps, sortedArray]);

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
    'function binarySearch(array, target):',
    '  left = 0',
    '  right = array.length - 1',
    '  ',
    '  while left <= right:',
    '    mid = floor((left + right) / 2)',
    '    ',
    '    if array[mid] == target:',
    '      return mid',
    '    else if array[mid] < target:',
    '      left = mid + 1',
    '    else:',
    '      right = mid - 1',
    '  ',
    '  return -1  // not found'
  ];

  return (
    <ModernVisualizationBase
      title="Binary Search Visualization"
      description="Watch how binary search efficiently finds elements in sorted arrays"
      difficulty="Beginner"
      category="Search"
      complexity={{
        time: "O(log n)",
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
        { label: 'Search Range', value: currentStepData ? `[${currentStepData.left}-${currentStepData.right}]` : '[-]', icon: <Target className="w-4 h-4" /> },
        { label: 'Mid Element', value: currentStepData?.mid >= 0 ? sortedArray[currentStepData.mid] : '-', icon: <Crosshair className="w-4 h-4" /> },
        { label: 'Time Complexity', value: metrics.timeComplexity, icon: <Clock className="w-4 h-4" /> }
      ] : undefined}
      educational={{
        keyPoints: [
          'Requires a sorted array as input',
          'Eliminates half of the search space in each step',
          'Much more efficient than linear search for large datasets',
          'Uses divide-and-conquer strategy',
          'Guarantees logarithmic time complexity'
        ],
        pseudocode: pseudocodeLines,
        realWorldUse: [
          'Database indexing and search operations',
          'Finding elements in sorted collections',
          'Dictionary and phonebook lookups',
          'Version control systems for efficient diff operations'
        ]
      }}
    >
      {/* Search Input */}
      <div className="flex justify-center items-center gap-4">
        <div className="bg-white/10 rounded-lg p-4">
          <label className="text-white/80 text-sm block mb-2">Target Value</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="bg-white/20 text-white border-white/30 w-24"
              placeholder="Enter target"
            />
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Array Display */}
      <div className="text-center">
        <div className="text-white/80 text-sm mb-2">Sorted Array:</div>
        <div className="text-white/60 text-xs">
          [{sortedArray.join(', ')}]
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
            width={800}
            height={250}
            onDraw={drawVisualization}
            className="rounded-lg border border-white/20"
          />
        </CardContent>
      </Card>

      {/* Toggle Controls */}
      <div className="flex justify-center gap-4">
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
              Binary Search Pseudocode
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
              Search Efficiency
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Time Complexity', value: 'O(log n)', color: currentTheme.colors.success },
                { label: 'Space Complexity', value: 'O(1)', color: currentTheme.colors.success },
                { label: 'Requirement', value: 'Sorted Array', color: currentTheme.colors.warning },
                { label: 'Best Case', value: 'O(1)', color: currentTheme.colors.success },
                { label: 'Worst Case', value: 'O(log n)', color: currentTheme.colors.info },
                { label: 'Stability', value: 'N/A', color: currentTheme.colors.secondary }
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
              How Binary Search Works
            </h3>
            <div className="space-y-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p>• <strong>Initialize:</strong> Set left = 0, right = array.length - 1</p>
              <p>• <strong>Find Middle:</strong> Calculate mid = (left + right) / 2</p>
              <p>• <strong>Compare:</strong> Check if array[mid] equals target</p>
              <p>• <strong>Eliminate Half:</strong> Adjust search range based on comparison</p>
              <p>• <strong>Repeat:</strong> Continue until target found or range empty</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernBinarySearchVisualization;
