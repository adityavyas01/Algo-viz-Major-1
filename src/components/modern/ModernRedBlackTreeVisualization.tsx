import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernCanvas } from './ModernCanvas';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Play, Pause, RotateCcw, Plus, Minus, Search, Target, Layers, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface RedBlackNode {
  value: number;
  color: 'red' | 'black';
  left: RedBlackNode | null;
  right: RedBlackNode | null;
  parent: RedBlackNode | null;
  x?: number;
  y?: number;
  id: string;
  isHighlighted?: boolean;
  isRotating?: boolean;
  isInserting?: boolean;
}

interface RedBlackTreeStep {
  type: 'insert' | 'rotate-left' | 'rotate-right' | 'recolor' | 'complete';
  description: string;
  node?: RedBlackNode;
  parent?: RedBlackNode;
  grandparent?: RedBlackNode;
  uncle?: RedBlackNode;
  tree: RedBlackNode | null;
}

interface RedBlackTreeMetrics {
  nodeCount: number;
  blackHeight: number;
  maxDepth: number;
  violations: number;
  rotations: number;
  recolorings: number;
}

const ModernRedBlackTreeVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [tree, setTree] = useState<RedBlackNode | null>(null);
  const [steps, setSteps] = useState<RedBlackTreeStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [metrics, setMetrics] = useState<RedBlackTreeMetrics | null>(null);

  // Generate unique ID for nodes
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Create a new node
  const createNode = (value: number, color: 'red' | 'black' = 'red'): RedBlackNode => ({
    value,
    color,
    left: null,
    right: null,
    parent: null,
    id: generateId()
  });

  // Calculate tree metrics
  const calculateMetrics = (root: RedBlackNode | null): RedBlackTreeMetrics => {
    if (!root) return { nodeCount: 0, blackHeight: 0, maxDepth: 0, violations: 0, rotations: 0, recolorings: 0 };

    let nodeCount = 0;
    let maxDepth = 0;
    let violations = 0;

    const calculateBlackHeight = (node: RedBlackNode | null): number => {
      if (!node) return 1;
      const leftHeight = calculateBlackHeight(node.left);
      const rightHeight = calculateBlackHeight(node.right);
      return Math.max(leftHeight, rightHeight) + (node.color === 'black' ? 1 : 0);
    };

    const traverse = (node: RedBlackNode | null, depth: number): void => {
      if (!node) return;
      
      nodeCount++;
      maxDepth = Math.max(maxDepth, depth);

      // Check for violations
      if (node.color === 'red' && node.parent && node.parent.color === 'red') {
        violations++;
      }

      traverse(node.left, depth + 1);
      traverse(node.right, depth + 1);
    };

    traverse(root, 0);
    const blackHeight = calculateBlackHeight(root);

    return {
      nodeCount,
      blackHeight,
      maxDepth,
      violations,
      rotations: steps.filter(s => s.type.includes('rotate')).length,
      recolorings: steps.filter(s => s.type === 'recolor').length
    };
  };

  // Red-Black Tree insertion with step recording
  const insertValue = (value: number) => {
    if (!value || isNaN(value)) return;

    const newSteps: RedBlackTreeStep[] = [];
    let newTree = tree;

    // BST insertion
    const bstInsert = (root: RedBlackNode | null, value: number): RedBlackNode => {
      if (!root) {
        const newNode = createNode(value, 'red');
        newSteps.push({
          type: 'insert',
          description: `Insert ${value} as red node`,
          node: newNode,
          tree: newNode
        });
        return newNode;
      }

      if (value < root.value) {
        root.left = bstInsert(root.left, value);
        root.left.parent = root;
      } else if (value > root.value) {
        root.right = bstInsert(root.right, value);
        root.right.parent = root;
      }

      return root;
    };

    // Rotations and recoloring
    const rotateLeft = (node: RedBlackNode): RedBlackNode => {
      const rightChild = node.right!;
      node.right = rightChild.left;
      if (rightChild.left) rightChild.left.parent = node;
      rightChild.parent = node.parent;
      if (!node.parent) newTree = rightChild;
      else if (node === node.parent.left) node.parent.left = rightChild;
      else node.parent.right = rightChild;
      rightChild.left = node;
      node.parent = rightChild;
      
      newSteps.push({
        type: 'rotate-left',
        description: `Rotate left at ${node.value}`,
        node: rightChild,
        tree: newTree
      });

      return rightChild;
    };

    const rotateRight = (node: RedBlackNode): RedBlackNode => {
      const leftChild = node.left!;
      node.left = leftChild.right;
      if (leftChild.right) leftChild.right.parent = node;
      leftChild.parent = node.parent;
      if (!node.parent) newTree = leftChild;
      else if (node === node.parent.right) node.parent.right = leftChild;
      else node.parent.left = leftChild;
      leftChild.right = node;
      node.parent = leftChild;

      newSteps.push({
        type: 'rotate-right',
        description: `Rotate right at ${node.value}`,
        node: leftChild,
        tree: newTree
      });

      return leftChild;
    };

    const fixViolations = (node: RedBlackNode): RedBlackNode => {
      while (node.parent && node.parent.color === 'red') {
        if (node.parent === node.parent.parent?.left) {
          const uncle = node.parent.parent.right;
          if (uncle && uncle.color === 'red') {
            // Case 1: Uncle is red
            node.parent.color = 'black';
            uncle.color = 'black';
            node.parent.parent.color = 'red';
            newSteps.push({
              type: 'recolor',
              description: `Recolor parent and uncle to black, grandparent to red`,
              node: node.parent.parent,
              tree: newTree
            });
            node = node.parent.parent;
          } else {
            if (node === node.parent.right) {
              // Case 2: Triangle case
              node = node.parent;
              rotateLeft(node);
            }
            // Case 3: Line case
            node.parent!.color = 'black';
            node.parent!.parent!.color = 'red';
            rotateRight(node.parent!.parent!);
          }
        } else {
          const uncle = node.parent.parent?.left;
          if (uncle && uncle.color === 'red') {
            node.parent.color = 'black';
            uncle.color = 'black';
            node.parent.parent!.color = 'red';
            newSteps.push({
              type: 'recolor',
              description: `Recolor parent and uncle to black, grandparent to red`,
              node: node.parent.parent!,
              tree: newTree
            });
            node = node.parent.parent!;
          } else {
            if (node === node.parent.left) {
              node = node.parent;
              rotateRight(node);
            }
            node.parent!.color = 'black';
            node.parent!.parent!.color = 'red';
            rotateLeft(node.parent!.parent!);
          }
        }
      }

      return newTree!;
    };

    if (!newTree) {
      newTree = createNode(value, 'black');
      newSteps.push({
        type: 'insert',
        description: `Insert ${value} as root (black)`,
        node: newTree,
        tree: newTree
      });
    } else {
      newTree = bstInsert(newTree, value);
      // Find the newly inserted node
      const findNode = (root: RedBlackNode | null, val: number): RedBlackNode | null => {
        if (!root) return null;
        if (root.value === val) return root;
        return findNode(root.left, val) || findNode(root.right, val);
      };
      
      const insertedNode = findNode(newTree, value);
      if (insertedNode) {
        newTree = fixViolations(insertedNode);
      }
    }

    // Ensure root is black
    if (newTree) {
      newTree.color = 'black';
      newTree.parent = null;
    }

    newSteps.push({
      type: 'complete',
      description: 'Red-Black tree insertion complete',
      tree: newTree
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setTree(newTree);
    setMetrics(calculateMetrics(newTree));
  };

  // Tree positioning
  const calculatePositions = (root: RedBlackNode | null, x: number, y: number, level: number, side: 'left' | 'right' | 'root' = 'root'): void => {
    if (!root) return;

    const spacing = Math.max(60, 300 / (level + 1));
    root.x = x;
    root.y = y;

    if (root.left) {
      calculatePositions(root.left, x - spacing, y + 80, level + 1, 'left');
    }
    if (root.right) {
      calculatePositions(root.right, x + spacing, y + 80, level + 1, 'right');
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

  // Update tree when step changes
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      if (step.tree) {
        calculatePositions(step.tree, 400, 50, 0);
        setTree(step.tree);
        setMetrics(calculateMetrics(step.tree));
      }
    }
  }, [currentStep, steps]);

  const canvasDrawFunction = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, theme: any, utils: any) => {
    if (!tree) return;

    // Draw edges first
    const drawEdges = (node: RedBlackNode) => {
      if (node.left) {
        utils.drawArrow(
          node.x!, node.y! + 25,
          node.left.x!, node.left.y! - 25,
          theme.colors.textSecondary + '80',
          false
        );
        drawEdges(node.left);
      }
      if (node.right) {
        utils.drawArrow(
          node.x!, node.y! + 25,
          node.right.x!, node.right.y! - 25,
          theme.colors.textSecondary + '80',
          false
        );
        drawEdges(node.right);
      }
    };

    drawEdges(tree);

    // Draw nodes
    const drawNodes = (node: RedBlackNode) => {
      if (!node || !node.x || !node.y) return;

      const nodeColor = node.color === 'red' ? '#ef4444' : '#1f2937';
      const textColor = '#ffffff';

      // Node glow effect for highlighted nodes
      if (node.isHighlighted) {
        ctx.shadowColor = nodeColor;
        ctx.shadowBlur = 20;
      }

      utils.drawGlowingRect(
        node.x - 25, node.y - 25,
        50, 50,
        nodeColor,
        node.isHighlighted ? 15 : 5
      );

      // Draw value
      ctx.shadowBlur = 0;
      ctx.fillStyle = textColor;
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.value.toString(), node.x, node.y);

      // Draw color indicator
      ctx.fillStyle = node.color === 'red' ? '#ff6b6b' : '#2d3748';
      ctx.beginPath();
      ctx.arc(node.x + 20, node.y - 20, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (node.left) drawNodes(node.left);
      if (node.right) drawNodes(node.right);
    };

    drawNodes(tree);

    // Draw current step description
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      utils.drawGradientText(
        step.description,
        400, 20,
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
      { label: 'Black Height', value: metrics.blackHeight, icon: <Layers className="w-4 h-4" /> },
      { label: 'Max Depth', value: metrics.maxDepth, icon: <BarChart className="w-4 h-4" /> },
      { label: 'Violations', value: metrics.violations, icon: <Minus className="w-4 h-4" />, color: metrics.violations > 0 ? '#ef4444' : '#10b981' }
    ];
  }, [metrics]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <ModernVisualizationBase
        title="Red-Black Tree Visualization"
        description="Interactive Red-Black Tree with automatic balancing. Red-Black trees maintain balance through color-coded nodes and rotation operations, ensuring O(log n) operations."
        difficulty="Advanced"
        category="Trees"
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
              if (firstStep.tree) {
                calculatePositions(firstStep.tree, 400, 50, 0);
                setTree(firstStep.tree);
              }
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
              height={400}
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
              <h3 className="font-semibold mb-3 text-white">Red-Black Properties</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Red nodes have black children</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-800 rounded-full border border-white"></div>
                  <span>Root and leaves are black</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>All paths have same black height</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">Operations</h3>
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    const values = [50, 30, 70, 20, 40, 60, 80];
                    values.forEach((val, index) => {
                      setTimeout(() => insertValue(val), index * 500);
                    });
                  }}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  Demo Tree
                </Button>
                <Button
                  onClick={() => {
                    setTree(null);
                    setSteps([]);
                    setCurrentStep(0);
                    setMetrics(null);
                    setIsPlaying(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  Clear Tree
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ModernVisualizationBase>
    </div>
  );
};

export default ModernRedBlackTreeVisualization;
