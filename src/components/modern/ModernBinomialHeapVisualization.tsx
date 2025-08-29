import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernCanvas } from './ModernCanvas';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Plus, Minus, Search, Target, Layers, BarChart, TrendingUp, Merge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BinomialNode {
  key: number;
  degree: number;
  parent: BinomialNode | null;
  child: BinomialNode | null;
  sibling: BinomialNode | null;
  x?: number;
  y?: number;
  id: string;
  isHighlighted?: boolean;
  isMin?: boolean;
}

interface BinomialHeap {
  head: BinomialNode | null;
  size: number;
}

interface BinomialHeapStep {
  type: 'insert' | 'merge' | 'extract-min' | 'decrease-key' | 'complete' | 'link';
  description: string;
  heap: BinomialHeap;
  highlightedNodes?: string[];
  newNode?: BinomialNode;
}

interface BinomialHeapMetrics {
  nodeCount: number;
  treeCount: number;
  maxDegree: number;
  minValue: number | null;
  operations: number;
}

const ModernBinomialHeapVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [heap, setHeap] = useState<BinomialHeap>({ head: null, size: 0 });
  const [steps, setSteps] = useState<BinomialHeapStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [inputValue, setInputValue] = useState('');
  const [metrics, setMetrics] = useState<BinomialHeapMetrics | null>(null);

  // Generate unique ID for nodes
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Create a new binomial node
  const createNode = (key: number): BinomialNode => ({
    key,
    degree: 0,
    parent: null,
    child: null,
    sibling: null,
    id: generateId()
  });

  // Find minimum node in heap
  const findMin = (heap: BinomialHeap): BinomialNode | null => {
    if (!heap.head) return null;
    
    let min = heap.head;
    let current = heap.head.sibling;
    
    while (current) {
      if (current.key < min.key) {
        min = current;
      }
      current = current.sibling;
    }
    
    return min;
  };

  // Calculate tree metrics
  const calculateMetrics = (heap: BinomialHeap): BinomialHeapMetrics => {
    if (!heap.head) return { nodeCount: 0, treeCount: 0, maxDegree: 0, minValue: null, operations: steps.length };

    let nodeCount = 0;
    let treeCount = 0;
    let maxDegree = 0;

    const countNodes = (node: BinomialNode | null): number => {
      if (!node) return 0;
      let count = 1;
      let child = node.child;
      while (child) {
        count += countNodes(child);
        child = child.sibling;
      }
      return count;
    };

    let current = heap.head;
    while (current) {
      treeCount++;
      maxDegree = Math.max(maxDegree, current.degree);
      nodeCount += countNodes(current);
      current = current.sibling;
    }

    const minNode = findMin(heap);
    const minValue = minNode ? minNode.key : null;

    return {
      nodeCount,
      treeCount,
      maxDegree,
      minValue,
      operations: steps.length
    };
  };

  // Link two binomial trees of same degree
  const linkTrees = (tree1: BinomialNode, tree2: BinomialNode): BinomialNode => {
    if (tree1.key > tree2.key) {
      [tree1, tree2] = [tree2, tree1];
    }
    
    tree2.parent = tree1;
    tree2.sibling = tree1.child;
    tree1.child = tree2;
    tree1.degree++;
    
    return tree1;
  };

  // Merge two binomial heaps
  const mergeHeaps = (heap1: BinomialHeap, heap2: BinomialHeap): BinomialHeap => {
    if (!heap1.head) return heap2;
    if (!heap2.head) return heap1;

    // Merge root lists
    let head: BinomialNode | null = null;
    let tail: BinomialNode | null = null;
    let current1 = heap1.head;
    let current2 = heap2.head;

    // Initial merge
    if (current1.degree <= current2.degree) {
      head = current1;
      current1 = current1.sibling;
    } else {
      head = current2;
      current2 = current2.sibling;
    }
    tail = head;

    // Continue merging
    while (current1 && current2) {
      if (current1.degree <= current2.degree) {
        tail.sibling = current1;
        current1 = current1.sibling;
      } else {
        tail.sibling = current2;
        current2 = current2.sibling;
      }
      tail = tail.sibling!;
    }

    // Append remaining
    tail.sibling = current1 || current2;

    // Fix degrees
    let prev: BinomialNode | null = null;
    let current = head;
    let next = current?.sibling;

    while (next) {
      if (current!.degree !== next.degree || 
          (next.sibling && next.sibling.degree === current!.degree)) {
        prev = current;
        current = next;
      } else {
        if (current!.key <= next.key) {
          current!.sibling = next.sibling;
          const linked = linkTrees(current!, next);
          if (prev) {
            prev.sibling = linked;
          } else {
            head = linked;
          }
        } else {
          if (prev) {
            prev.sibling = next;
          } else {
            head = next;
          }
          linkTrees(next, current!);
        }
      }
      next = current?.sibling;
    }

    return { head, size: heap1.size + heap2.size };
  };

  // Insert value into heap
  const insertValue = (value: number) => {
    if (!value || isNaN(value)) return;

    const newSteps: BinomialHeapStep[] = [];
    const newNode = createNode(value);
    const singleNodeHeap: BinomialHeap = { head: newNode, size: 1 };

    newSteps.push({
      type: 'insert',
      description: `Create new binomial tree B₀ with key ${value}`,
      heap: singleNodeHeap,
      newNode: newNode
    });

    const mergedHeap = mergeHeaps(heap, singleNodeHeap);
    
    newSteps.push({
      type: 'merge',
      description: `Merge with existing heap`,
      heap: mergedHeap
    });

    newSteps.push({
      type: 'complete',
      description: 'Insert operation complete',
      heap: mergedHeap
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setHeap(mergedHeap);
    setMetrics(calculateMetrics(mergedHeap));
  };

  // Extract minimum
  const extractMin = () => {
    if (!heap.head) return;

    const newSteps: BinomialHeapStep[] = [];
    const min = findMin(heap);
    
    if (!min) return;

    newSteps.push({
      type: 'extract-min',
      description: `Extract minimum: ${min.key}`,
      heap: heap,
      highlightedNodes: [min.id]
    });

    // Remove min from root list
    let prev: BinomialNode | null = null;
    let current = heap.head;
    
    while (current && current !== min) {
      prev = current;
      current = current.sibling;
    }

    if (prev) {
      prev.sibling = min.sibling;
    } else {
      heap.head = min.sibling;
    }

    // Create new heap from children
    const childHeap: BinomialHeap = { head: null, size: 0 };
    if (min.child) {
      // Reverse child list and clear parent pointers
      let child = min.child;
      let reversedHead: BinomialNode | null = null;
      
      while (child) {
        const next = child.sibling;
        child.sibling = reversedHead;
        child.parent = null;
        reversedHead = child;
        child = next;
      }
      
      childHeap.head = reversedHead;
    }

    const newHeap = mergeHeaps({ head: heap.head, size: heap.size - 1 }, childHeap);
    
    newSteps.push({
      type: 'merge',
      description: 'Merge remaining trees with children of extracted node',
      heap: newHeap
    });

    newSteps.push({
      type: 'complete',
      description: 'Extract-min operation complete',
      heap: newHeap
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setHeap(newHeap);
    setMetrics(calculateMetrics(newHeap));
  };

  // Tree positioning
  const calculatePositions = (heap: BinomialHeap): void => {
    if (!heap.head) return;

    let currentX = 50;
    let current = heap.head;

    while (current) {
      const treeWidth = calculateTreeWidth(current);
      positionTree(current, currentX + treeWidth / 2, 60, 0);
      currentX += treeWidth + 100;
      current = current.sibling;
    }
  };

  const calculateTreeWidth = (root: BinomialNode): number => {
    if (!root.child) return 60;
    
    let width = 0;
    let child = root.child;
    while (child) {
      width += calculateTreeWidth(child) + 40;
      child = child.sibling;
    }
    return Math.max(60, width - 40);
  };

  const positionTree = (node: BinomialNode, x: number, y: number, level: number): void => {
    node.x = x;
    node.y = y;

    if (node.child) {
      let childX = x;
      let child = node.child;
      const children: BinomialNode[] = [];
      
      // Collect children
      while (child) {
        children.push(child);
        child = child.sibling;
      }

      // Position children
      const totalWidth = children.reduce((sum, c) => sum + calculateTreeWidth(c), 0) + (children.length - 1) * 40;
      childX = x - totalWidth / 2;

      children.forEach(child => {
        const childWidth = calculateTreeWidth(child);
        positionTree(child, childX + childWidth / 2, y + 80, level + 1);
        childX += childWidth + 40;
      });
    }
  };

  // Animation effect
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, speed, steps.length]);

  // Update heap when step changes
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      calculatePositions(step.heap);
      setHeap(step.heap);
      setMetrics(calculateMetrics(step.heap));
    }
  }, [currentStep, steps]);

  const canvasDrawFunction = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, theme: any, utils: any) => {
    if (!heap.head) return;

    const currentStepData = steps[currentStep];
    const highlightedNodes = currentStepData?.highlightedNodes || [];
    const minNode = findMin(heap);

    // Draw edges
    const drawEdges = (node: BinomialNode) => {
      let child = node.child;
      while (child) {
        if (child.x && child.y && node.x && node.y) {
          utils.drawArrow(
            node.x, node.y + 25,
            child.x, child.y - 25,
            theme.colors.textSecondary + '80',
            false
          );
        }
        drawEdges(child);
        child = child.sibling;
      }
    };

    let current = heap.head;
    while (current) {
      drawEdges(current);
      current = current.sibling;
    }

    // Draw nodes
    const drawNodes = (node: BinomialNode) => {
      if (!node.x || !node.y) return;

      const isHighlighted = highlightedNodes.includes(node.id);
      const isMin = minNode && node.id === minNode.id;
      const nodeColor = isMin ? '#10b981' : isHighlighted ? theme.colors.primary : theme.colors.surface;

      utils.drawGlowingRect(
        node.x - 25, node.y - 25,
        50, 50,
        nodeColor,
        isHighlighted || isMin ? 15 : 5
      );

      // Draw value
      ctx.fillStyle = theme.colors.text;
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.key.toString(), node.x, node.y);

      // Draw degree indicator
      if (node.degree > 0) {
        ctx.fillStyle = theme.colors.secondary;
        ctx.font = 'bold 10px Arial';
        ctx.fillText(`B${node.degree}`, node.x, node.y - 35);
      }

      // Draw min indicator
      if (isMin) {
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 8px Arial';
        ctx.fillText('MIN', node.x, node.y + 35);
      }

      let child = node.child;
      while (child) {
        drawNodes(child);
        child = child.sibling;
      }
    };

    current = heap.head;
    while (current) {
      drawNodes(current);
      current = current.sibling;
    }

    // Draw tree labels
    current = heap.head;
    while (current) {
      if (current.x && current.y) {
        ctx.fillStyle = theme.colors.primary;
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`B${current.degree}`, current.x, current.y - 50);
      }
      current = current.sibling;
    }

    // Draw current step description
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      utils.drawGradientText(
        step.description,
        400, 25,
        [theme.colors.primary, theme.colors.secondary],
        16
      );
    }
  };

  // Generate metrics for display
  const metricsData = useMemo(() => {
    if (!metrics) return [];
    return [
      { label: 'Nodes', value: metrics.nodeCount, icon: <Target className="w-4 h-4" /> },
      { label: 'Trees', value: metrics.treeCount, icon: <Layers className="w-4 h-4" /> },
      { label: 'Max Degree', value: metrics.maxDegree, icon: <TrendingUp className="w-4 h-4" /> },
      { label: 'Min Value', value: metrics.minValue || 'N/A', icon: <BarChart className="w-4 h-4" />, color: '#10b981' }
    ];
  }, [metrics]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <ModernVisualizationBase
        title="Binomial Heap Visualization"
        description="Interactive Binomial Heap data structure. A binomial heap is a collection of binomial trees that supports efficient merge operations and priority queue functionality."
        difficulty="Advanced"
        category="Heaps"
        complexity={{
          time: "O(log n)",
          space: "O(n)"
        }}
        controls={{
          isPlaying,
          onPlay: () => setIsPlaying(true),
          onPause: () => setIsPlaying(false),
          onReset: () => {
            setCurrentStep(0);
            setIsPlaying(false);
            if (steps.length > 0) {
              const firstStep = steps[0];
              calculatePositions(firstStep.heap);
              setHeap(firstStep.heap);
            }
          },
          onStepForward: () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1)),
          onStepBack: () => setCurrentStep(prev => Math.max(prev - 1, 0)),
          currentStep,
          totalSteps: steps.length,
          speed,
          onSpeedChange: setSpeed
        }}
        metrics={metricsData}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ModernCanvas
              width={800}
              height={500}
              onDraw={canvasDrawFunction}
              className="border rounded-xl"
            />
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">Insert Value</h3>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  className="bg-white/10 border-white/20"
                />
                <Button
                  onClick={() => {
                    insertValue(parseInt(inputValue));
                    setInputValue('');
                  }}
                  disabled={!inputValue}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">Operations</h3>
              <div className="space-y-2">
                <Button
                  onClick={extractMin}
                  disabled={!heap.head}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  <Minus className="w-4 h-4 mr-2" />
                  Extract Min
                </Button>
                <Button
                  onClick={() => {
                    const values = [10, 5, 15, 3, 8, 12, 20];
                    values.forEach((val, index) => {
                      setTimeout(() => insertValue(val), index * 800);
                    });
                  }}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  Demo Heap
                </Button>
                <Button
                  onClick={() => {
                    setHeap({ head: null, size: 0 });
                    setSteps([]);
                    setCurrentStep(0);
                    setMetrics(null);
                    setIsPlaying(false);
                  }}
                  className="w-full bg-gray-600 hover:bg-gray-700"
                  size="sm"
                >
                  Clear Heap
                </Button>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">Binomial Trees</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>B₀: Single node (degree 0)</div>
                <div>B₁: 2 nodes (degree 1)</div>
                <div>B₂: 4 nodes (degree 2)</div>
                <div>B₃: 8 nodes (degree 3)</div>
                <div className="text-xs text-gray-400 mt-2">
                  Binomial tree Bₖ has 2ᵏ nodes
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModernVisualizationBase>
    </div>
  );
};

export default ModernBinomialHeapVisualization;
