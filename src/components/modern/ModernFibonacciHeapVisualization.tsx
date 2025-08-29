import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernCanvas } from './ModernCanvas';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Plus, Minus, TrendingDown, Target, Layers, BarChart, Scissors, Merge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FibonacciNode {
  key: number;
  degree: number;
  parent: FibonacciNode | null;
  child: FibonacciNode | null;
  left: FibonacciNode;
  right: FibonacciNode;
  mark: boolean;
  x?: number;
  y?: number;
  id: string;
  isHighlighted?: boolean;
  isMin?: boolean;
  isMarked?: boolean;
}

interface FibonacciHeap {
  min: FibonacciNode | null;
  size: number;
  trees: FibonacciNode[];
}

interface FibonacciHeapStep {
  type: 'insert' | 'extract-min' | 'decrease-key' | 'merge' | 'consolidate' | 'cut' | 'cascading-cut' | 'complete';
  description: string;
  heap: FibonacciHeap;
  highlightedNodes?: string[];
  newNode?: FibonacciNode;
  operation?: string;
}

interface FibonacciHeapMetrics {
  nodeCount: number;
  treeCount: number;
  maxDegree: number;
  minValue: number | null;
  markedNodes: number;
  operations: number;
}

const ModernFibonacciHeapVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [heap, setHeap] = useState<FibonacciHeap>({ min: null, size: 0, trees: [] });
  const [steps, setSteps] = useState<FibonacciHeapStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [inputValue, setInputValue] = useState('');
  const [decreaseValue, setDecreaseValue] = useState('');
  const [selectedNode, setSelectedNode] = useState<FibonacciNode | null>(null);
  const [metrics, setMetrics] = useState<FibonacciHeapMetrics | null>(null);

  // Generate unique ID for nodes
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Create a new fibonacci node
  const createNode = (key: number): FibonacciNode => {
    const node: Partial<FibonacciNode> = {
      key,
      degree: 0,
      parent: null,
      child: null,
      mark: false,
      id: generateId()
    };
    node.left = node as FibonacciNode;
    node.right = node as FibonacciNode;
    return node as FibonacciNode;
  };

  // Calculate heap metrics
  const calculateMetrics = (heap: FibonacciHeap): FibonacciHeapMetrics => {
    if (!heap.min) return { nodeCount: 0, treeCount: 0, maxDegree: 0, minValue: null, markedNodes: 0, operations: steps.length };

    let nodeCount = 0;
    let maxDegree = 0;
    let markedNodes = 0;

    const traverseTree = (node: FibonacciNode): void => {
      let current = node;
      do {
        nodeCount++;
        maxDegree = Math.max(maxDegree, current.degree);
        if (current.mark) markedNodes++;
        
        if (current.child) {
          traverseTree(current.child);
        }
        
        current = current.right;
      } while (current !== node);
    };

    traverseTree(heap.min);

    return {
      nodeCount: heap.size,
      treeCount: heap.trees.length,
      maxDegree,
      minValue: heap.min.key,
      markedNodes,
      operations: steps.length
    };
  };

  // Insert into circular doubly linked list
  const insertIntoRootList = (heap: FibonacciHeap, node: FibonacciNode): void => {
    if (!heap.min) {
      heap.min = node;
      heap.trees = [node];
    } else {
      // Insert node between min and min.right
      node.left = heap.min;
      node.right = heap.min.right;
      heap.min.right.left = node;
      heap.min.right = node;
      
      if (node.key < heap.min.key) {
        heap.min = node;
      }
      
      heap.trees.push(node);
    }
  };

  // Remove from circular doubly linked list
  const removeFromRootList = (heap: FibonacciHeap, node: FibonacciNode): void => {
    if (node.right === node) {
      heap.min = null;
      heap.trees = [];
    } else {
      node.left.right = node.right;
      node.right.left = node.left;
      
      if (heap.min === node) {
        heap.min = node.right;
      }
      
      heap.trees = heap.trees.filter(t => t !== node);
    }
  };

  // Link two trees
  const linkTrees = (y: FibonacciNode, x: FibonacciNode): void => {
    // Remove y from root list
    y.left.right = y.right;
    y.right.left = y.left;
    
    // Make y a child of x
    y.parent = x;
    y.mark = false;
    
    if (!x.child) {
      x.child = y;
      y.left = y;
      y.right = y;
    } else {
      y.left = x.child;
      y.right = x.child.right;
      x.child.right.left = y;
      x.child.right = y;
    }
    
    x.degree++;
  };

  // Consolidate heap
  const consolidate = (heap: FibonacciHeap): FibonacciHeapStep[] => {
    const steps: FibonacciHeapStep[] = [];
    const maxDegree = Math.floor(Math.log2(heap.size)) + 1;
    const degreeTable: (FibonacciNode | null)[] = new Array(maxDegree).fill(null);
    
    // Collect all root nodes
    const roots: FibonacciNode[] = [];
    if (heap.min) {
      let current = heap.min;
      do {
        roots.push(current);
        current = current.right;
      } while (current !== heap.min);
    }

    steps.push({
      type: 'consolidate',
      description: 'Start consolidation process',
      heap: { ...heap }
    });

    // Process each root
    for (const w of roots) {
      let x = w;
      let d = x.degree;
      
      while (degreeTable[d]) {
        let y = degreeTable[d]!;
        
        if (x.key > y.key) {
          [x, y] = [y, x];
        }
        
        linkTrees(y, x);
        degreeTable[d] = null;
        d++;
        
        steps.push({
          type: 'merge',
          description: `Link trees of degree ${d-1}`,
          heap: { ...heap },
          highlightedNodes: [x.id, y.id]
        });
      }
      
      degreeTable[d] = x;
    }

    // Rebuild root list and find new minimum
    heap.min = null;
    heap.trees = [];
    
    for (const node of degreeTable) {
      if (node) {
        node.left = node;
        node.right = node;
        insertIntoRootList(heap, node);
      }
    }

    return steps;
  };

  // Insert value into heap
  const insertValue = (value: number) => {
    if (!value || isNaN(value)) return;

    const newSteps: FibonacciHeapStep[] = [];
    const newNode = createNode(value);
    const newHeap = { ...heap, size: heap.size + 1, trees: [...heap.trees] };

    insertIntoRootList(newHeap, newNode);

    newSteps.push({
      type: 'insert',
      description: `Insert ${value} into root list`,
      heap: newHeap,
      newNode: newNode
    });

    newSteps.push({
      type: 'complete',
      description: 'Insert operation complete',
      heap: newHeap
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setHeap(newHeap);
    setMetrics(calculateMetrics(newHeap));
  };

  // Extract minimum
  const extractMin = () => {
    if (!heap.min) return;

    const newSteps: FibonacciHeapStep[] = [];
    const oldMin = heap.min;
    const newHeap = { ...heap, size: heap.size - 1, trees: [...heap.trees] };

    newSteps.push({
      type: 'extract-min',
      description: `Extract minimum: ${oldMin.key}`,
      heap: heap,
      highlightedNodes: [oldMin.id]
    });

    // Add children to root list
    if (oldMin.child) {
      let child = oldMin.child;
      do {
        const nextChild = child.right;
        child.parent = null;
        child.mark = false;
        insertIntoRootList(newHeap, child);
        child = nextChild;
      } while (child !== oldMin.child);
    }

    // Remove old minimum
    removeFromRootList(newHeap, oldMin);

    if (newHeap.size > 0) {
      // Consolidate
      const consolidateSteps = consolidate(newHeap);
      newSteps.push(...consolidateSteps);
    }

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

  // Decrease key operation
  const decreaseKey = (node: FibonacciNode, newKey: number) => {
    if (newKey >= node.key) return;

    const newSteps: FibonacciHeapStep[] = [];
    const newHeap = { ...heap, trees: [...heap.trees] };

    node.key = newKey;

    newSteps.push({
      type: 'decrease-key',
      description: `Decrease key to ${newKey}`,
      heap: newHeap,
      highlightedNodes: [node.id]
    });

    const cut = (heap: FibonacciHeap, x: FibonacciNode, y: FibonacciNode): void => {
      // Remove x from child list of y
      if (x.right === x) {
        y.child = null;
      } else {
        x.left.right = x.right;
        x.right.left = x.left;
        if (y.child === x) {
          y.child = x.right;
        }
      }
      
      y.degree--;
      
      // Add x to root list
      x.parent = null;
      x.mark = false;
      insertIntoRootList(heap, x);
      
      newSteps.push({
        type: 'cut',
        description: `Cut node ${x.key} from parent ${y.key}`,
        heap: { ...heap },
        highlightedNodes: [x.id, y.id]
      });
    };

    const cascadingCut = (heap: FibonacciHeap, y: FibonacciNode): void => {
      const z = y.parent;
      if (z) {
        if (!y.mark) {
          y.mark = true;
          newSteps.push({
            type: 'cascading-cut',
            description: `Mark node ${y.key}`,
            heap: { ...heap },
            highlightedNodes: [y.id]
          });
        } else {
          cut(heap, y, z);
          cascadingCut(heap, z);
        }
      }
    };

    const parent = node.parent;
    if (parent && node.key < parent.key) {
      cut(newHeap, node, parent);
      cascadingCut(newHeap, parent);
    }

    if (node.key < newHeap.min!.key) {
      newHeap.min = node;
    }

    newSteps.push({
      type: 'complete',
      description: 'Decrease-key operation complete',
      heap: newHeap
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setHeap(newHeap);
    setMetrics(calculateMetrics(newHeap));
  };

  // Tree positioning
  const calculatePositions = (heap: FibonacciHeap): void => {
    if (!heap.min) return;

    const rootRadius = 150;
    const centerX = 400;
    const centerY = 200;
    
    // Position root nodes in a circle
    heap.trees.forEach((root, index) => {
      const angle = (2 * Math.PI * index) / heap.trees.length;
      root.x = centerX + rootRadius * Math.cos(angle);
      root.y = centerY + rootRadius * Math.sin(angle);
      
      // Position children
      positionChildren(root, 0);
    });
  };

  const positionChildren = (parent: FibonacciNode, level: number): void => {
    if (!parent.child) return;

    const children: FibonacciNode[] = [];
    let child = parent.child;
    do {
      children.push(child);
      child = child.right;
    } while (child !== parent.child);

    const radius = 60 + level * 20;
    children.forEach((child, index) => {
      const angle = (2 * Math.PI * index) / children.length;
      child.x = parent.x! + radius * Math.cos(angle);
      child.y = parent.y! + radius * Math.sin(angle);
      
      positionChildren(child, level + 1);
    });
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
    if (!heap.min) return;

    const currentStepData = steps[currentStep];
    const highlightedNodes = currentStepData?.highlightedNodes || [];

    // Draw root list connections
    if (heap.trees.length > 1) {
      for (let i = 0; i < heap.trees.length; i++) {
        const current = heap.trees[i];
        const next = heap.trees[(i + 1) % heap.trees.length];
        
        if (current.x && current.y && next.x && next.y) {
          ctx.strokeStyle = theme.colors.secondary + '60';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(current.x + 25, current.y);
          ctx.lineTo(next.x - 25, next.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    }

    // Draw parent-child edges
    const drawEdges = (node: FibonacciNode) => {
      if (node.child) {
        let child = node.child;
        do {
          if (child.x && child.y && node.x && node.y) {
            utils.drawArrow(
              node.x, node.y + 25,
              child.x, child.y - 25,
              theme.colors.textSecondary + '80',
              false
            );
          }
          drawEdges(child);
          child = child.right;
        } while (child !== node.child);
      }
    };

    heap.trees.forEach(root => drawEdges(root));

    // Draw nodes
    const drawNodes = (node: FibonacciNode) => {
      if (!node.x || !node.y) return;

      const isHighlighted = highlightedNodes.includes(node.id);
      const isMin = heap.min && node.id === heap.min.id;
      const isSelected = selectedNode && node.id === selectedNode.id;
      
      let nodeColor = theme.colors.surface;
      if (isMin) nodeColor = '#10b981';
      else if (isHighlighted) nodeColor = theme.colors.primary;
      else if (isSelected) nodeColor = theme.colors.secondary;

      utils.drawGlowingRect(
        node.x - 25, node.y - 25,
        50, 50,
        nodeColor,
        isHighlighted || isMin || isSelected ? 15 : 5
      );

      // Draw mark indicator
      if (node.mark) {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(node.x + 20, node.y - 20, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw value
      ctx.fillStyle = theme.colors.text;
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.key.toString(), node.x, node.y);

      // Draw degree
      if (node.degree > 0) {
        ctx.fillStyle = theme.colors.secondary;
        ctx.font = 'bold 10px Arial';
        ctx.fillText(`d:${node.degree}`, node.x, node.y + 35);
      }

      // Draw min indicator
      if (isMin) {
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 8px Arial';
        ctx.fillText('MIN', node.x, node.y - 35);
      }

      if (node.child) {
        let child = node.child;
        do {
          drawNodes(child);
          child = child.right;
        } while (child !== node.child);
      }
    };

    heap.trees.forEach(root => drawNodes(root));

    // Draw current step description
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      utils.drawGradientText(
        step.description,
        400, 30,
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
      { label: 'Min Value', value: metrics.minValue || 'N/A', icon: <BarChart className="w-4 h-4" />, color: '#10b981' },
      { label: 'Marked', value: metrics.markedNodes, icon: <Scissors className="w-4 h-4" />, color: '#ef4444' }
    ];
  }, [metrics]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <ModernVisualizationBase
        title="Fibonacci Heap Visualization"
        description="Interactive Fibonacci Heap with amortized O(1) operations. Features decrease-key operation and cascading cuts for optimal performance in algorithms like Dijkstra's."
        difficulty="Expert"
        category="Heaps"
        complexity={{
          time: "O(1) amortized",
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
              <h3 className="font-semibold mb-3 text-white">Decrease Key</h3>
              <div className="space-y-2">
                <Input
                  type="number"
                  value={decreaseValue}
                  onChange={(e) => setDecreaseValue(e.target.value)}
                  placeholder="New key value"
                  className="bg-white/10 border-white/20"
                />
                <Button
                  onClick={() => {
                    if (selectedNode && decreaseValue) {
                      decreaseKey(selectedNode, parseInt(decreaseValue));
                      setDecreaseValue('');
                      setSelectedNode(null);
                    }
                  }}
                  disabled={!selectedNode || !decreaseValue}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  size="sm"
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Decrease Key
                </Button>
                <p className="text-xs text-gray-400">
                  Click a node to select it for decrease-key
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">Operations</h3>
              <div className="space-y-2">
                <Button
                  onClick={extractMin}
                  disabled={!heap.min}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  <Minus className="w-4 h-4 mr-2" />
                  Extract Min
                </Button>
                <Button
                  onClick={() => {
                    const values = [10, 5, 15, 3, 8, 12, 20, 1];
                    values.forEach((val, index) => {
                      setTimeout(() => insertValue(val), index * 500);
                    });
                  }}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  Demo Heap
                </Button>
                <Button
                  onClick={() => {
                    setHeap({ min: null, size: 0, trees: [] });
                    setSteps([]);
                    setCurrentStep(0);
                    setMetrics(null);
                    setIsPlaying(false);
                    setSelectedNode(null);
                  }}
                  className="w-full bg-gray-600 hover:bg-gray-700"
                  size="sm"
                >
                  Clear Heap
                </Button>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">Legend</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Minimum node</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Marked node</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-gray-300 rounded"></div>
                  <span>Selected node</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModernVisualizationBase>
    </div>
  );
};

export default ModernFibonacciHeapVisualization;
