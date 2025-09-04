import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVisualizationTheme } from '@/hooks/useVisualizationTheme';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Plus,
  Minus,
  BarChart3,
  Clock,
  ArrowUpDown,
  Target,
  BookOpen,
  TrendingUp,
  Activity,
  CheckCircle,
  TreePine,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Canvas } from './Canvas';

interface HeapNode {
  value: number;
  index: number;
  x: number;
  y: number;
  isHighlighted?: boolean;
  isComparing?: boolean;
  isSwapping?: boolean;
}

interface HeapStep {
  heap: number[];
  operation: string;
  highlighting: number[];
  comparing: number[];
  swapping: number[];
  description: string;
  pseudocodeLine: number;
}

interface HeapMetrics {
  totalOperations: number;
  comparisons: number;
  swaps: number;
  heapHeight: number;
  timeComplexity: string;
  spaceComplexity: string;
}

export const HeapVisualization = () => {
  const { theme } = useVisualizationTheme();
  const [heap, setHeap] = useState<number[]>([50, 30, 40, 20, 25, 35, 15]);
  const [inputValue, setInputValue] = useState('');
  const [heapType, setHeapType] = useState<'max' | 'min'>('max');
  const [steps, setSteps] = useState<HeapStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPseudocode, setShowPseudocode] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [metrics, setMetrics] = useState<HeapMetrics | null>(null);
  const [speed, setSpeed] = useState([400]);

  // Define colors for heap visualization
  const colors = {
    primary: '#3b82f6',
    secondary: '#8b5cf6', 
    accent: '#06d6a0',
    comparing: '#f59e0b',
    swapping: '#ef4444',
    parent: '#10b981',
    child: '#f97316'
  };

  const getParentIndex = (index: number): number => Math.floor((index - 1) / 2);
  const getLeftChildIndex = (index: number): number => 2 * index + 1;
  const getRightChildIndex = (index: number): number => 2 * index + 2;

  const calculateNodePositions = (heapArray: number[], canvasWidth: number, canvasHeight: number): HeapNode[] => {
    const nodes: HeapNode[] = [];
    const levels = Math.ceil(Math.log2(heapArray.length + 1));
    const levelHeight = (canvasHeight - 60) / Math.max(levels, 1);

    heapArray.forEach((value, index) => {
      const level = Math.floor(Math.log2(index + 1));
      const positionInLevel = index - (Math.pow(2, level) - 1);
      const totalNodesInLevel = Math.pow(2, level);
      const nodeWidth = canvasWidth / (totalNodesInLevel + 1);
      
      nodes.push({
        value,
        index,
        x: nodeWidth * (positionInLevel + 1),
        y: 40 + level * levelHeight,
        isHighlighted: false,
        isComparing: false,
        isSwapping: false
      });
    });

    return nodes;
  };

  const heapifyUp = (arr: number[], index: number): HeapStep[] => {
    const steps: HeapStep[] = [];
    const newArr = [...arr];
    let currentIndex = index;
    let comparisons = 0;
    let swaps = 0;

    steps.push({
      heap: [...newArr],
      operation: 'heapify-up',
      highlighting: [currentIndex],
      comparing: [],
      swapping: [],
      description: `Starting heapify up from index ${currentIndex}`,
      pseudocodeLine: 1
    });

    while (currentIndex > 0) {
      const parentIndex = getParentIndex(currentIndex);
      comparisons++;
      
      steps.push({
        heap: [...newArr],
        operation: 'heapify-up',
        highlighting: [],
        comparing: [currentIndex, parentIndex],
        swapping: [],
        description: `Comparing ${newArr[currentIndex]} with parent ${newArr[parentIndex]}`,
        pseudocodeLine: 2
      });

      const shouldSwap = heapType === 'max' 
        ? newArr[currentIndex] > newArr[parentIndex]
        : newArr[currentIndex] < newArr[parentIndex];

      if (!shouldSwap) break;

      // Swap
      swaps++;
      [newArr[currentIndex], newArr[parentIndex]] = [newArr[parentIndex], newArr[currentIndex]];
      
      steps.push({
        heap: [...newArr],
        operation: 'heapify-up',
        highlighting: [],
        comparing: [],
        swapping: [currentIndex, parentIndex],
        description: `Swapping ${newArr[parentIndex]} with ${newArr[currentIndex]}`,
        pseudocodeLine: 3
      });

      currentIndex = parentIndex;
    }

    steps.push({
      heap: [...newArr],
      operation: 'heapify-up',
      highlighting: [currentIndex],
      comparing: [],
      swapping: [],
      description: 'Heapify up complete',
      pseudocodeLine: 4
    });

    return steps;
  };

  const heapifyDown = (arr: number[], startIndex: number = 0): HeapStep[] => {
    const steps: HeapStep[] = [];
    const newArr = [...arr];
    let currentIndex = startIndex;
    let comparisons = 0;
    let swaps = 0;

    while (true) {
      const leftChildIndex = getLeftChildIndex(currentIndex);
      const rightChildIndex = getRightChildIndex(currentIndex);
      let targetIndex = currentIndex;

      steps.push({
        heap: [...newArr],
        operation: 'heapify-down',
        highlighting: [currentIndex],
        comparing: [],
        swapping: [],
        description: `Checking children of index ${currentIndex}`,
        pseudocodeLine: 1
      });

      // Compare with left child
      if (leftChildIndex < newArr.length) {
        comparisons++;
        steps.push({
          heap: [...newArr],
          operation: 'heapify-down',
          highlighting: [],
          comparing: [currentIndex, leftChildIndex],
          swapping: [],
          description: `Comparing with left child ${newArr[leftChildIndex]}`,
          pseudocodeLine: 2
        });

        const shouldReplaceWithLeft = heapType === 'max'
          ? newArr[leftChildIndex] > newArr[targetIndex]
          : newArr[leftChildIndex] < newArr[targetIndex];
        
        if (shouldReplaceWithLeft) {
          targetIndex = leftChildIndex;
        }
      }

      // Compare with right child
      if (rightChildIndex < newArr.length) {
        comparisons++;
        steps.push({
          heap: [...newArr],
          operation: 'heapify-down',
          highlighting: [],
          comparing: [targetIndex, rightChildIndex],
          swapping: [],
          description: `Comparing with right child ${newArr[rightChildIndex]}`,
          pseudocodeLine: 3
        });

        const shouldReplaceWithRight = heapType === 'max'
          ? newArr[rightChildIndex] > newArr[targetIndex]
          : newArr[rightChildIndex] < newArr[targetIndex];
        
        if (shouldReplaceWithRight) {
          targetIndex = rightChildIndex;
        }
      }

      if (targetIndex === currentIndex) break;

      // Swap
      swaps++;
      [newArr[currentIndex], newArr[targetIndex]] = [newArr[targetIndex], newArr[currentIndex]];
      
      steps.push({
        heap: [...newArr],
        operation: 'heapify-down',
        highlighting: [],
        comparing: [],
        swapping: [currentIndex, targetIndex],
        description: `Swapping ${newArr[targetIndex]} with ${newArr[currentIndex]}`,
        pseudocodeLine: 4
      });

      currentIndex = targetIndex;
    }

    return steps;
  };

  const insertValue = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const newHeap = [...heap, value];
    const insertSteps = heapifyUp(newHeap, newHeap.length - 1);
    
    setSteps(insertSteps);
    setCurrentStep(0);
    setInputValue('');
    
    // Update final heap
    const finalHeap = insertSteps[insertSteps.length - 1]?.heap || newHeap;
    setHeap(finalHeap);
  };

  const extractRoot = () => {
    if (heap.length === 0) return;

    const newHeap = [...heap];
    if (newHeap.length === 1) {
      setHeap([]);
      return;
    }

    // Move last element to root and remove it
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();

    const extractSteps = heapifyDown(newHeap, 0);
    setSteps(extractSteps);
    setCurrentStep(0);

    // Update final heap
    const finalHeap = extractSteps[extractSteps.length - 1]?.heap || newHeap;
    setHeap(finalHeap);
  };

  const buildHeap = () => {
    const randomArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
    let newHeap = [...randomArray];
    let allSteps: HeapStep[] = [];

    // Build heap from bottom up
    for (let i = Math.floor(newHeap.length / 2) - 1; i >= 0; i--) {
      const heapifySteps = heapifyDown(newHeap, i);
      allSteps = [...allSteps, ...heapifySteps];
      newHeap = heapifySteps[heapifySteps.length - 1]?.heap || newHeap;
    }

    setSteps(allSteps);
    setCurrentStep(0);
    setHeap(newHeap);
  };

  // Animation control
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) return;
    
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, speed[0]);
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, speed]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case ' ':
          event.preventDefault();
          setIsPlaying(!isPlaying);
          break;
        case 'ArrowRight':
          event.preventDefault();
          setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
          break;
        case 'ArrowLeft':
          event.preventDefault();
          setCurrentStep(prev => Math.max(prev - 1, 0));
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          setCurrentStep(0);
          setIsPlaying(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, steps.length]);

  const currentStepData = steps[currentStep];
  const displayHeap = currentStepData?.heap || heap;

  const drawVisualization = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (displayHeap.length === 0) {
      ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Empty Heap', canvas.width / 2, canvas.height / 2);
      return;
    }

    const nodes = calculateNodePositions(displayHeap, canvas.width, canvas.height);

    // Draw edges first
    nodes.forEach((node) => {
      const leftChildIndex = getLeftChildIndex(node.index);
      const rightChildIndex = getRightChildIndex(node.index);

      // Draw line to left child
      if (leftChildIndex < nodes.length) {
        const leftChild = nodes[leftChildIndex];
        ctx.strokeStyle = theme === 'dark' ? '#ffffff' : '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(leftChild.x, leftChild.y);
        ctx.stroke();
      }

      // Draw line to right child
      if (rightChildIndex < nodes.length) {
        const rightChild = nodes[rightChildIndex];
        ctx.strokeStyle = theme === 'dark' ? '#ffffff' : '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(rightChild.x, rightChild.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach((node) => {
      let fillColor = colors.primary;
      
      if (currentStepData) {
        if (currentStepData.comparing.includes(node.index)) {
          fillColor = colors.comparing;
        } else if (currentStepData.swapping.includes(node.index)) {
          fillColor = colors.swapping;
        } else if (currentStepData.highlighting.includes(node.index)) {
          fillColor = colors.accent;
        }
      }

      // Draw node circle
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fill();

      // Draw node border
      ctx.strokeStyle = theme === 'dark' ? '#ffffff' : '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw node value
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.value.toString(), node.x, node.y);

      // Draw index
      ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
      ctx.font = '10px Arial';
      ctx.fillText(node.index.toString(), node.x, node.y + 35);
    });

    // Draw heap type indicator
    ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${heapType.toUpperCase()} HEAP`, 10, 25);
  }, [displayHeap, currentStepData, theme, colors, heapType]);

  const pseudocodeLines = {
    'heapify-up': [
      'function heapifyUp(heap, index):',
      '  while index > 0:',
      '    parent = (index - 1) / 2',
      '    if heap[index] <= heap[parent]: break',
      '    swap(heap[index], heap[parent])',
      '    index = parent'
    ],
    'heapify-down': [
      'function heapifyDown(heap, index):',
      '  while true:',
      '    largest = index',
      '    left = 2 * index + 1',
      '    right = 2 * index + 2',
      '    if left < size and heap[left] > heap[largest]:',
      '      largest = left',
      '    if right < size and heap[right] > heap[largest]:',
      '      largest = right',
      '    if largest == index: break',
      '    swap(heap[index], heap[largest])',
      '    index = largest'
    ]
  };

  const quizQuestions = [
    {
      question: "What is the time complexity of inserting an element into a heap?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correct: 1,
      explanation: "Insertion requires heapifying up from the last position, which takes O(log n) time in the worst case."
    },
    {
      question: "In a max heap, the largest element is always:",
      options: ["At the last position", "At the root", "At any leaf", "Undefined"],
      correct: 1,
      explanation: "In a max heap, the root always contains the maximum element due to the heap property."
    },
    {
      question: "What is the main advantage of using a heap for priority queues?",
      options: ["Constant time access", "Efficient insertion and deletion", "Sorted storage", "Memory efficiency"],
      correct: 1,
      explanation: "Heaps provide O(log n) insertion and deletion while maintaining the priority queue property."
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Heap Visualization
        </h2>
        <p className="text-muted-foreground">
          Explore binary heap operations and properties
        </p>
      </div>

      {/* Controls */}
      <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <TreePine className="h-5 w-5" />
            Heap Operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2">
              <Button
                onClick={() => setHeapType(heapType === 'max' ? 'min' : 'max')}
                variant="outline"
                className="gap-2"
              >
                {heapType === 'max' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                {heapType.toUpperCase()} Heap
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="w-32"
                onKeyPress={(e) => e.key === 'Enter' && insertValue()}
              />
              <Button onClick={insertValue} disabled={!inputValue} className="gap-2">
                <Plus className="h-4 w-4" />
                Insert
              </Button>
            </div>
            <Button onClick={extractRoot} disabled={heap.length === 0} variant="outline" className="gap-2">
              <Minus className="h-4 w-4" />
              Extract Root
            </Button>
            <Button onClick={buildHeap} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Random Heap
            </Button>
            <Button
              onClick={() => setShowPseudocode(!showPseudocode)}
              variant={showPseudocode ? "default" : "outline"}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Pseudocode
            </Button>
          </div>

          {steps.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-3 border-t">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                disabled={currentStep >= steps.length - 1}
                className="gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep <= 0}
                variant="outline"
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep >= steps.length - 1}
                variant="outline"
              >
                Next
              </Button>
              <Button
                onClick={() => {
                  setCurrentStep(0);
                  setIsPlaying(false);
                }}
                variant="outline"
              >
                Reset
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm">Speed:</span>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  value={speed[0]}
                  onChange={(e) => setSpeed([parseInt(e.target.value)])}
                  className="w-20"
                />
                <span className="text-sm">{speed[0]}ms</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Visualization */}
      <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
        <CardContent className="p-6">
          <div style={{ width: '100%', height: '400px' }} className="border rounded-lg">
            <Canvas onRender={drawVisualization} width={800} height={400} />
          </div>
          
          {currentStepData && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">{currentStepData.description}</p>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>Step: {currentStep + 1}/{steps.length}</span>
                <span>Operation: {currentStepData.operation}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Heap Properties */}
      <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
        <CardHeader>
          <CardTitle>Heap Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium text-muted-foreground">Size</div>
              <div className="text-xl font-bold">{displayHeap.length}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Height</div>
              <div className="text-xl font-bold">{Math.floor(Math.log2(displayHeap.length + 1))}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Root</div>
              <div className="text-xl font-bold">{displayHeap[0] || 'N/A'}</div>
            </div>
            <div>
              <div className="font-medium text-muted-foreground">Type</div>
              <Badge variant={heapType === 'max' ? 'default' : 'secondary'}>
                {heapType.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pseudocode Panel */}
      {showPseudocode && currentStepData && (
        <Card className="backdrop-blur-sm bg-background/80 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {currentStepData.operation === 'heapify-up' ? 'Heapify Up' : 'Heapify Down'} Pseudocode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm font-mono bg-muted p-4 rounded-lg overflow-x-auto">
              {pseudocodeLines[currentStepData.operation as keyof typeof pseudocodeLines]?.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    currentStepData.pseudocodeLine === index + 1
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

      {/* Quiz Section */}
      {showQuiz && (
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Heap Knowledge Check</h3>
          <p className="text-sm text-muted-foreground mb-4">Test your understanding of heap concepts</p>
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
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.primary }}></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.comparing }}></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.swapping }}></div>
              <span>Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.accent }}></div>
              <span>Highlighted</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Keyboard shortcuts: Space (play/pause), ← → (step), R (reset)
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
