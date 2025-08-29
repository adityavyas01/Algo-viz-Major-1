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
  TreePine,
  Layers
} from 'lucide-react';

interface HeapSortStep {
  array: number[];
  heapSize: number;
  currentIndex: number;
  comparing: number[];
  swapping: number[];
  phase: 'heapify' | 'extract' | 'complete';
  description: string;
  comparisons: number;
  swaps: number;
  heapProperty: boolean;
}

interface HeapSortMetrics {
  totalComparisons: number;
  totalSwaps: number;
  startTime: number;
  endTime?: number;
  timeComplexity: string;
  spaceComplexity: string;
}

const ModernHeapSortVisualization: React.FC = () => {
  const { currentTheme, animationSpeed } = useVisualizationTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [originalArray, setOriginalArray] = useState([64, 25, 12, 22, 11, 90, 88, 76, 50, 42]);
  const [steps, setSteps] = useState<HeapSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState(1200);
  const [metrics, setMetrics] = useState<HeapSortMetrics | null>(null);
  const [showPseudocode, setShowPseudocode] = useState(false);
  const [showTreeView, setShowTreeView] = useState(false);

  const generateHeapSortSteps = useCallback((arr: number[]) => {
    const sortSteps: HeapSortStep[] = [];
    let comparisons = 0;
    let swaps = 0;
    const workingArray = [...arr];
    let heapSize = workingArray.length;

    // Initial state
    sortSteps.push({
      array: [...workingArray],
      heapSize,
      currentIndex: -1,
      comparing: [],
      swapping: [],
      phase: 'heapify',
      description: 'Starting Heap Sort. First, we build a max heap from the array.',
      comparisons,
      swaps,
      heapProperty: false
    });

    const startTime = performance.now();

    // Heapify function
    const heapify = (arr: number[], n: number, i: number, buildingHeap = false) => {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      // Show current node being heapified
      sortSteps.push({
        array: [...arr],
        heapSize: n,
        currentIndex: i,
        comparing: [],
        swapping: [],
        phase: buildingHeap ? 'heapify' : 'extract',
        description: `Heapifying at index ${i} (value: ${arr[i]})`,
        comparisons,
        swaps,
        heapProperty: false
      });

      // Compare with left child
      if (left < n) {
        comparisons++;
        sortSteps.push({
          array: [...arr],
          heapSize: n,
          currentIndex: i,
          comparing: [i, left],
          swapping: [],
          phase: buildingHeap ? 'heapify' : 'extract',
          description: `Comparing parent ${arr[i]} with left child ${arr[left]}`,
          comparisons,
          swaps,
          heapProperty: false
        });

        if (arr[left] > arr[largest]) {
          largest = left;
        }
      }

      // Compare with right child
      if (right < n) {
        comparisons++;
        sortSteps.push({
          array: [...arr],
          heapSize: n,
          currentIndex: i,
          comparing: [i, right],
          swapping: [],
          phase: buildingHeap ? 'heapify' : 'extract',
          description: `Comparing ${arr[largest] === arr[i] ? 'parent' : 'left child'} ${arr[largest]} with right child ${arr[right]}`,
          comparisons,
          swaps,
          heapProperty: false
        });

        if (arr[right] > arr[largest]) {
          largest = right;
        }
      }

      // If largest is not root
      if (largest !== i) {
        swaps++;
        
        // Show swapping
        sortSteps.push({
          array: [...arr],
          heapSize: n,
          currentIndex: i,
          comparing: [],
          swapping: [i, largest],
          phase: buildingHeap ? 'heapify' : 'extract',
          description: `Swapping ${arr[i]} with ${arr[largest]} to maintain heap property`,
          comparisons,
          swaps,
          heapProperty: false
        });

        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        // Show after swap
        sortSteps.push({
          array: [...arr],
          heapSize: n,
          currentIndex: largest,
          comparing: [],
          swapping: [],
          phase: buildingHeap ? 'heapify' : 'extract',
          description: `Continuing heapify at index ${largest}`,
          comparisons,
          swaps,
          heapProperty: false
        });

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest, buildingHeap);
      }
    };

    // Build heap (rearrange array)
    for (let i = Math.floor(workingArray.length / 2) - 1; i >= 0; i--) {
      heapify(workingArray, workingArray.length, i, true);
    }

    // Heap is built
    sortSteps.push({
      array: [...workingArray],
      heapSize,
      currentIndex: -1,
      comparing: [],
      swapping: [],
      phase: 'heapify',
      description: 'Max heap built! The largest element is now at the root.',
      comparisons,
      swaps,
      heapProperty: true
    });

    // Extract elements from heap one by one
    for (let i = workingArray.length - 1; i > 0; i--) {
      swaps++;
      
      // Move current root to end
      sortSteps.push({
        array: [...workingArray],
        heapSize: i + 1,
        currentIndex: 0,
        comparing: [],
        swapping: [0, i],
        phase: 'extract',
        description: `Extracting max element ${workingArray[0]} to position ${i}`,
        comparisons,
        swaps,
        heapProperty: false
      });

      [workingArray[0], workingArray[i]] = [workingArray[i], workingArray[0]];
      heapSize--;

      // Show after extraction
      sortSteps.push({
        array: [...workingArray],
        heapSize,
        currentIndex: -1,
        comparing: [],
        swapping: [],
        phase: 'extract',
        description: `Element ${workingArray[i]} placed in final position. Heap size reduced to ${heapSize}`,
        comparisons,
        swaps,
        heapProperty: false
      });

      // Call heapify on the reduced heap
      if (heapSize > 1) {
        heapify(workingArray, heapSize, 0, false);
      }
    }

    const endTime = performance.now();

    sortSteps.push({
      array: [...workingArray],
      heapSize: 0,
      currentIndex: -1,
      comparing: [],
      swapping: [],
      phase: 'complete',
      description: 'Heap Sort complete! All elements are now in sorted order.',
      comparisons,
      swaps,
      heapProperty: false
    });

    setMetrics({
      totalComparisons: comparisons,
      totalSwaps: swaps,
      startTime,
      endTime,
      timeComplexity: 'O(n log n)',
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

  const drawArrayVisualization = useCallback((context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!steps.length || !steps[currentStep]) return;

    const step = steps[currentStep];
    context.clearRect(0, 0, canvas.width, canvas.height);

    const elementWidth = 50;
    const elementHeight = 50;
    const spacing = 8;
    const startX = (canvas.width - (step.array.length * (elementWidth + spacing))) / 2;
    const arrayY = 60;

    // Draw array elements
    step.array.forEach((value, index) => {
      const x = startX + index * (elementWidth + spacing);
      let fillColor = currentTheme.colors.surface;
      let borderColor = currentTheme.colors.border;
      let glowColor = '';

      // Color coding based on state
      if (index >= step.heapSize) {
        fillColor = currentTheme.colors.success; // Sorted section
      } else if (index === step.currentIndex) {
        fillColor = currentTheme.colors.primary;
        glowColor = currentTheme.colors.primary;
      } else if (step.comparing.includes(index)) {
        fillColor = currentTheme.colors.warning;
        glowColor = currentTheme.colors.warning;
      } else if (step.swapping.includes(index)) {
        fillColor = currentTheme.colors.error;
        glowColor = currentTheme.colors.error;
      } else if (index < step.heapSize) {
        fillColor = currentTheme.colors.info; // Heap section
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

    // Draw heap boundary
    if (step.heapSize > 0 && step.heapSize < step.array.length) {
      const boundaryX = startX + step.heapSize * (elementWidth + spacing) - spacing / 2;
      context.strokeStyle = currentTheme.colors.success;
      context.lineWidth = 3;
      context.setLineDash([5, 5]);
      
      context.beginPath();
      context.moveTo(boundaryX, arrayY - 20);
      context.lineTo(boundaryX, arrayY + elementHeight + 20);
      context.stroke();
      
      context.setLineDash([]);
    }

    // Draw section labels
    context.fillStyle = currentTheme.colors.info;
    context.font = 'bold 12px Arial';
    context.textAlign = 'center';
    
    if (step.heapSize > 0) {
      const heapWidth = step.heapSize * (elementWidth + spacing);
      context.fillText('HEAP', startX + heapWidth / 2, arrayY - 30);
    }
    
    if (step.heapSize < step.array.length) {
      context.fillStyle = currentTheme.colors.success;
      const sortedStart = startX + step.heapSize * (elementWidth + spacing);
      const sortedWidth = (step.array.length - step.heapSize) * (elementWidth + spacing);
      context.fillText('SORTED', sortedStart + sortedWidth / 2, arrayY - 30);
    }

    // Draw legend
    const legendY = canvas.height - 60;
    const legendItems = [
      { color: currentTheme.colors.info, label: 'Heap' },
      { color: currentTheme.colors.success, label: 'Sorted' },
      { color: currentTheme.colors.primary, label: 'Current' },
      { color: currentTheme.colors.warning, label: 'Comparing' },
      { color: currentTheme.colors.error, label: 'Swapping' }
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

  const drawTreeVisualization = useCallback((context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!steps.length || !steps[currentStep]) return;

    const step = steps[currentStep];
    context.clearRect(0, 0, canvas.width, canvas.height);

    const levels = Math.ceil(Math.log2(step.heapSize + 1));
    const nodeRadius = 20;
    const levelHeight = 70;
    const startY = 50;

    // Function to draw a node
    const drawNode = (value: number, index: number, x: number, y: number) => {
      let fillColor = currentTheme.colors.surface;
      let borderColor = currentTheme.colors.border;
      let glowColor = '';

      if (index >= step.heapSize) {
        fillColor = currentTheme.colors.textSecondary;
      } else if (index === step.currentIndex) {
        fillColor = currentTheme.colors.primary;
        glowColor = currentTheme.colors.primary;
      } else if (step.comparing.includes(index)) {
        fillColor = currentTheme.colors.warning;
        glowColor = currentTheme.colors.warning;
      } else if (step.swapping.includes(index)) {
        fillColor = currentTheme.colors.error;
        glowColor = currentTheme.colors.error;
      }

      // Draw glow effect
      if (glowColor) {
        context.shadowColor = glowColor;
        context.shadowBlur = 10;
      }

      // Node circle
      context.fillStyle = fillColor;
      context.beginPath();
      context.arc(x, y, nodeRadius, 0, 2 * Math.PI);
      context.fill();
      
      context.shadowBlur = 0;

      context.strokeStyle = borderColor;
      context.lineWidth = 2;
      context.beginPath();
      context.arc(x, y, nodeRadius, 0, 2 * Math.PI);
      context.stroke();

      // Value text
      context.fillStyle = 'white';
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.fillText(value.toString(), x, y + 5);

      // Index label
      context.fillStyle = currentTheme.colors.textSecondary;
      context.font = '10px Arial';
      context.fillText(index.toString(), x, y - nodeRadius - 5);
    };

    // Function to draw edge
    const drawEdge = (x1: number, y1: number, x2: number, y2: number) => {
      context.strokeStyle = currentTheme.colors.border;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    };

    // Draw the heap tree
    for (let level = 0; level < levels; level++) {
      const nodesInLevel = Math.pow(2, level);
      const levelWidth = canvas.width - 100;
      const nodeSpacing = levelWidth / (nodesInLevel + 1);
      
      for (let i = 0; i < nodesInLevel; i++) {
        const nodeIndex = Math.pow(2, level) - 1 + i;
        if (nodeIndex >= step.array.length) break;

        const x = 50 + (i + 1) * nodeSpacing;
        const y = startY + level * levelHeight;

        // Draw edges to children
        if (level < levels - 1) {
          const leftChild = 2 * nodeIndex + 1;
          const rightChild = 2 * nodeIndex + 2;
          
          if (leftChild < step.array.length) {
            const leftChildPos = leftChild - (Math.pow(2, level + 1) - 1);
            const childSpacing = levelWidth / (Math.pow(2, level + 1) + 1);
            const leftX = 50 + (leftChildPos + 1) * childSpacing;
            const leftY = startY + (level + 1) * levelHeight;
            drawEdge(x, y + nodeRadius, leftX, leftY - nodeRadius);
          }
          
          if (rightChild < step.array.length) {
            const rightChildPos = rightChild - (Math.pow(2, level + 1) - 1);
            const childSpacing = levelWidth / (Math.pow(2, level + 1) + 1);
            const rightX = 50 + (rightChildPos + 1) * childSpacing;
            const rightY = startY + (level + 1) * levelHeight;
            drawEdge(x, y + nodeRadius, rightX, rightY - nodeRadius);
          }
        }

        drawNode(step.array[nodeIndex], nodeIndex, x, y);
      }
    }

    // Heap property indicator
    if (step.heapProperty) {
      context.fillStyle = currentTheme.colors.success;
      context.font = 'bold 16px Arial';
      context.textAlign = 'center';
      context.fillText('✓ Max Heap Property Satisfied', canvas.width / 2, canvas.height - 20);
    }
  }, [currentStep, steps, currentTheme]);

  useEffect(() => {
    generateHeapSortSteps(originalArray);
  }, [originalArray, generateHeapSortSteps]);

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
    'function heapSort(array):',
    '  // Build max heap',
    '  for i = array.length/2 - 1 down to 0:',
    '    heapify(array, array.length, i)',
    '  ',
    '  // Extract elements one by one',
    '  for i = array.length - 1 down to 1:',
    '    swap(array[0], array[i])',
    '    heapify(array, i, 0)',
    '  ',
    'function heapify(array, n, i):',
    '  largest = i',
    '  left = 2*i + 1',
    '  right = 2*i + 2',
    '  ',
    '  if left < n and array[left] > array[largest]:',
    '    largest = left',
    '  if right < n and array[right] > array[largest]:',
    '    largest = right',
    '  ',
    '  if largest != i:',
    '    swap(array[i], array[largest])',
    '    heapify(array, n, largest)'
  ];

  return (
    <ModernVisualizationBase
      title="Heap Sort Visualization"
      description="Watch how heap sort uses a binary heap to efficiently sort elements"
      difficulty="Intermediate"
      category="Sorting"
      complexity={{
        time: "O(n log n)",
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
        { label: 'Heap Size', value: currentStepData?.heapSize || 0, icon: <Layers className="w-4 h-4" /> },
        { label: 'Phase', value: currentStepData?.phase || '-', icon: <Eye className="w-4 h-4" /> }
      ] : undefined}
      educational={{
        keyPoints: [
          'Uses a binary heap data structure',
          'Guarantees O(n log n) time complexity',
          'In-place sorting algorithm',
          'Not stable but consistent performance',
          'Heap property: parent ≥ children'
        ],
        pseudocode: pseudocodeLines,
        realWorldUse: [
          'Priority queues implementation',
          'Systems requiring consistent performance',
          'Memory-constrained environments',
          'Real-time systems with deadlines'
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
            height={showTreeView ? 350 : 200}
            onDraw={showTreeView ? drawTreeVisualization : drawArrayVisualization}
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
          onClick={() => setShowTreeView(!showTreeView)}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          <TreePine className="w-4 h-4 mr-2" />
          {showTreeView ? 'Array' : 'Tree'} View
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
              Heap Sort Pseudocode
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
                { label: 'Space Complexity', value: 'O(1)', color: currentTheme.colors.success },
                { label: 'Stability', value: 'No', color: currentTheme.colors.error },
                { label: 'In-Place', value: 'Yes', color: currentTheme.colors.success },
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
              How Heap Sort Works
            </h3>
            <div className="space-y-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p>• <strong>Build Heap:</strong> Transform array into max heap structure</p>
              <p>• <strong>Extract Max:</strong> Move root (maximum) to sorted section</p>
              <p>• <strong>Heapify:</strong> Restore heap property in remaining elements</p>
              <p>• <strong>Repeat:</strong> Continue until heap is empty</p>
              <p>• <strong>Result:</strong> Array sorted in ascending order</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernHeapSortVisualization;
