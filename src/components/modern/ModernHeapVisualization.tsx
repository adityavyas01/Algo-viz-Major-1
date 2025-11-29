import React, { useState, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernArrayVisualization } from './ModernArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { MaxHeap, HeapStep, generateInsertSteps, generateExtractMaxSteps } from '@/lib/algorithms/data-structures/heap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, TrendingUp, ArrowUpDown } from 'lucide-react';

const ModernHeapVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [heap] = useState(() => {
    const h = new MaxHeap();
    [100, 19, 36, 17, 3, 25, 1, 2, 7].forEach(v => h.insert(v));
    return h;
  });
  const [steps, setSteps] = useState<HeapStep[]>([]);
  const [speed, setSpeed] = useState(600);
  const [inputValue, setInputValue] = useState('50');
  const [operation, setOperation] = useState<'insert' | 'extract'>('insert');
  
  const animation = useAnimation<HeapStep>(steps, speed);

  const handleOperation = () => {
    if (operation === 'insert') {
      const value = parseInt(inputValue, 10);
      if (isNaN(value)) return;
      
      const newSteps = generateInsertSteps(heap, value);
      heap.insert(value);
      setSteps(newSteps);
      setInputValue('');
      animation.reset();
      animation.play();
    } else {
      const newSteps = generateExtractMaxSteps(heap);
      heap.extractMax();
      setSteps(newSteps);
      animation.reset();
      animation.play();
    }
  };

  const heapData = useMemo(() => {
    const currentStep = animation.currentStep;
    if (!currentStep) {
      // Show initial heap when no animation is active
      return heap.heap.map(value => ({
        value,
        state: 'normal' as const,
        label: String(value),
      }));
    }
    
    return currentStep.heap.map((value, index) => {
      let state: 'normal' | 'comparing' | 'swapping' | 'sorted' = 'normal';
      
      if (currentStep.highlightedIndices.includes(index)) {
        state = currentStep.phase === 'swapping' ? 'swapping' : 'comparing';
      }
      
      return {
        value,
        state,
        label: String(value),
      };
    });
  }, [animation.currentStep]);

  const metrics = useMemo(() => {
    const currentStep = animation.currentStep;
    if (!currentStep) {
      return [
        {
          label: 'Progress',
          value: '0%',
          icon: <TrendingUp className="w-4 h-4" />,
          color: currentTheme.colors.primary,
        },
        {
          label: 'Heap Size',
          value: heap.heap.length,
          icon: <ArrowUpDown className="w-4 h-4" />,
          color: '#f59e0b',
        },
        {
          label: 'Operation',
          value: 'Ready',
          icon: <Plus className="w-4 h-4" />,
          color: '#10b981',
        },
      ];
    }

    return [
      {
        label: 'Progress',
        value: `${Math.round((animation.currentStepIndex / Math.max(1, steps.length - 1)) * 100)}%`,
        icon: <TrendingUp className="w-4 h-4" />,
        color: currentTheme.colors.primary,
      },
      {
        label: 'Heap Size',
        value: currentStep.heap.length,
        icon: <ArrowUpDown className="w-4 h-4" />,
        color: '#f59e0b',
      },
      {
        label: 'Operation',
        value: currentStep.operation,
        icon: currentStep.operation === 'insert' ? <Plus className="w-4 h-4" /> : <Minus className="w-4 h-4" />,
        color: currentStep.operation === 'insert' ? '#10b981' : '#ef4444',
      },
    ];
  }, [animation.currentStep, animation.currentStepIndex, steps.length, currentTheme]);

  const controls = {
    isPlaying: animation.isPlaying,
    onPlay: animation.play,
    onPause: animation.pause,
    onReset: animation.reset,
    onStepForward: animation.nextStep,
    onStepBack: animation.prevStep,
    currentStep: animation.currentStepIndex,
    totalSteps: steps.length,
    speed,
    onSpeedChange: setSpeed,
  };

  const educational = {
    keyPoints: [
      "A max heap is a complete binary tree where each parent node is greater than or equal to its children.",
      "Insertion takes O(log n) time as we heapify up from the last position.",
      "Extraction of the maximum element takes O(log n) time as we heapify down from the root.",
      "Heaps are typically implemented using arrays for space efficiency.",
      "For a node at index i: left child is at 2i+1, right child is at 2i+2, parent is at ⌊(i-1)/2⌋",
    ],
    pseudocode: [
      'function insert(value):',
      '  heap.push(value)',
      '  heapifyUp(heap.length - 1)',
      '',
      'function heapifyUp(index):',
      '  while index > 0:',
      '    parent = (index - 1) / 2',
      '    if heap[index] > heap[parent]:',
      '      swap(index, parent)',
      '      index = parent',
      '    else: break',
      '',
      'function extractMax():',
      '  max = heap[0]',
      '  heap[0] = heap.pop()',
      '  heapifyDown(0)',
      '  return max',
    ],
    realWorldUse: [
      'Priority queues for task scheduling',
      'Heap sort algorithm',
      'Graph algorithms (Dijkstra, Prim)',
      'Finding k largest/smallest elements',
      'Median maintenance in streaming data',
    ],
  };

  const currentStepDescription = animation.currentStep?.description || 'Select an operation to begin';

  return (
    <ModernVisualizationBase
      title="Max Heap"
      description="A complete binary tree data structure where each parent node is greater than or equal to its children, enabling efficient priority queue operations."
      difficulty="Intermediate"
      category="Tree"
      complexity={{
        time: "O(log n)",
        space: "O(n)"
      }}
      controls={controls}
      metrics={metrics}
      educational={educational}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-background p-1 rounded-lg">
            <Button 
              onClick={() => setOperation('insert')} 
              variant={operation === 'insert' ? 'default' : 'ghost'} 
              size="sm"
            >
              Insert
            </Button>
            <Button 
              onClick={() => setOperation('extract')} 
              variant={operation === 'extract' ? 'default' : 'ghost'} 
              size="sm"
            >
              Extract Max
            </Button>
          </div>

          {operation === 'insert' && (
            <div className="flex">
              <Input 
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g., 50"
                className="w-24"
              />
              <Button onClick={handleOperation} className="ml-2">
                <Plus className="w-4 h-4 mr-2" />
                Go
              </Button>
            </div>
          )}
          
          {operation === 'extract' && (
            <Button onClick={handleOperation} variant="destructive">
              <Minus className="w-4 h-4 mr-2" />
              Extract Maximum
            </Button>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground text-center">
          {currentStepDescription}
        </div>

        <ModernArrayVisualization
          data={heapData}
          useValueAsHeight={true}
          style3D={true}
        />
        
        <div className="text-xs text-muted-foreground mt-2">
          Array representation: Parent at i, Left child at 2i+1, Right child at 2i+2
        </div>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernHeapVisualization;