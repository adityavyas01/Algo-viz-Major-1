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
  TreePine,
  Eye,
  BookOpen,
  Target,
  BarChart3,
  Layers,
  ArrowDown,
  ArrowUp,
  GitBranch
} from 'lucide-react';

interface TreeNode {
  value: number;
  x: number;
  y: number;
  level: number;
  id: string;
  left?: TreeNode;
  right?: TreeNode;
}

interface BinaryTreeStep {
  currentNode?: string;
  visitedNodes: string[];
  traversalOrder: number[];
  traversalType: 'inorder' | 'preorder' | 'postorder';
  description: string;
  operationCount: number;
  callStack: string[];
}

interface BinaryTreeMetrics {
  totalOperations: number;
  treeHeight: number;
  nodeCount: number;
  timeComplexity: string;
  spaceComplexity: string;
}

const ModernBinaryTreeVisualization: React.FC = () => {
  const { currentTheme, animationSpeed } = useVisualizationTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Sample binary tree
  const [tree, setTree] = useState<TreeNode>({
    value: 50,
    x: 0,
    y: 0,
    level: 0,
    id: 'node-50',
    left: {
      value: 30,
      x: 0,
      y: 0,
      level: 1,
      id: 'node-30',
      left: {
        value: 20,
        x: 0,
        y: 0,
        level: 2,
        id: 'node-20'
      },
      right: {
        value: 40,
        x: 0,
        y: 0,
        level: 2,
        id: 'node-40'
      }
    },
    right: {
      value: 70,
      x: 0,
      y: 0,
      level: 1,
      id: 'node-70',
      left: {
        value: 60,
        x: 0,
        y: 0,
        level: 2,
        id: 'node-60'
      },
      right: {
        value: 80,
        x: 0,
        y: 0,
        level: 2,
        id: 'node-80'
      }
    }
  });

  const [steps, setSteps] = useState<BinaryTreeStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState(1500);
  const [metrics, setMetrics] = useState<BinaryTreeMetrics | null>(null);
  const [showPseudocode, setShowPseudocode] = useState(false);
  const [selectedTraversal, setSelectedTraversal] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');

  const calculateNodePositions = useCallback((node: TreeNode, x: number, y: number, horizontalSpacing: number, level: number = 0): TreeNode => {
    const updatedNode = { ...node, x, y, level };
    
    if (node.left) {
      updatedNode.left = calculateNodePositions(
        node.left,
        x - horizontalSpacing,
        y + 80,
        horizontalSpacing / 1.5,
        level + 1
      );
    }
    
    if (node.right) {
      updatedNode.right = calculateNodePositions(
        node.right,
        x + horizontalSpacing,
        y + 80,
        horizontalSpacing / 1.5,
        level + 1
      );
    }
    
    return updatedNode;
  }, []);

  const generateTraversalSteps = useCallback((root: TreeNode, traversalType: 'inorder' | 'preorder' | 'postorder') => {
    const traversalSteps: BinaryTreeStep[] = [];
    const visitedNodes: string[] = [];
    const traversalOrder: number[] = [];
    const callStack: string[] = [];
    let operations = 0;

    // Initial state
    traversalSteps.push({
      visitedNodes: [],
      traversalOrder: [],
      traversalType,
      description: `Starting ${traversalType} traversal of the binary tree`,
      operationCount: operations,
      callStack: []
    });

    const traverse = (node: TreeNode | undefined, depth: number = 0) => {
      if (!node) return;

      operations++;
      callStack.push(node.id);
      
      // Show entering node
      traversalSteps.push({
        currentNode: node.id,
        visitedNodes: [...visitedNodes],
        traversalOrder: [...traversalOrder],
        traversalType,
        description: `Visiting node ${node.value} (entering)`,
        operationCount: operations,
        callStack: [...callStack]
      });

      if (traversalType === 'preorder') {
        // Process current node first
        visitedNodes.push(node.id);
        traversalOrder.push(node.value);
        
        traversalSteps.push({
          currentNode: node.id,
          visitedNodes: [...visitedNodes],
          traversalOrder: [...traversalOrder],
          traversalType,
          description: `Processing node ${node.value} (preorder: root first)`,
          operationCount: operations,
          callStack: [...callStack]
        });
      }

      // Traverse left subtree
      if (node.left) {
        traversalSteps.push({
          currentNode: node.id,
          visitedNodes: [...visitedNodes],
          traversalOrder: [...traversalOrder],
          traversalType,
          description: `Moving to left child of ${node.value}`,
          operationCount: operations,
          callStack: [...callStack]
        });
        
        traverse(node.left, depth + 1);
      }

      if (traversalType === 'inorder') {
        // Process current node between left and right
        visitedNodes.push(node.id);
        traversalOrder.push(node.value);
        
        traversalSteps.push({
          currentNode: node.id,
          visitedNodes: [...visitedNodes],
          traversalOrder: [...traversalOrder],
          traversalType,
          description: `Processing node ${node.value} (inorder: after left subtree)`,
          operationCount: operations,
          callStack: [...callStack]
        });
      }

      // Traverse right subtree
      if (node.right) {
        traversalSteps.push({
          currentNode: node.id,
          visitedNodes: [...visitedNodes],
          traversalOrder: [...traversalOrder],
          traversalType,
          description: `Moving to right child of ${node.value}`,
          operationCount: operations,
          callStack: [...callStack]
        });
        
        traverse(node.right, depth + 1);
      }

      if (traversalType === 'postorder') {
        // Process current node after both children
        visitedNodes.push(node.id);
        traversalOrder.push(node.value);
        
        traversalSteps.push({
          currentNode: node.id,
          visitedNodes: [...visitedNodes],
          traversalOrder: [...traversalOrder],
          traversalType,
          description: `Processing node ${node.value} (postorder: after both subtrees)`,
          operationCount: operations,
          callStack: [...callStack]
        });
      }

      // Show leaving node
      callStack.pop();
      traversalSteps.push({
        currentNode: node.id,
        visitedNodes: [...visitedNodes],
        traversalOrder: [...traversalOrder],
        traversalType,
        description: `Leaving node ${node.value}`,
        operationCount: operations,
        callStack: [...callStack]
      });
    };

    const getTreeHeight = (node: TreeNode | undefined): number => {
      if (!node) return 0;
      return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
    };

    const getNodeCount = (node: TreeNode | undefined): number => {
      if (!node) return 0;
      return 1 + getNodeCount(node.left) + getNodeCount(node.right);
    };

    traverse(root);

    // Complete
    traversalSteps.push({
      visitedNodes: [...visitedNodes],
      traversalOrder: [...traversalOrder],
      traversalType,
      description: `${traversalType} traversal complete! Order: ${traversalOrder.join(' → ')}`,
      operationCount: operations,
      callStack: []
    });

    setMetrics({
      totalOperations: operations,
      treeHeight: getTreeHeight(root),
      nodeCount: getNodeCount(root),
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)'
    });

    setSteps(traversalSteps);
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

  const handleTraversalChange = (type: 'inorder' | 'preorder' | 'postorder') => {
    setSelectedTraversal(type);
    generateTraversalSteps(tree, type);
    reset();
  };

  const drawTree = useCallback((context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!steps.length || !steps[currentStep]) return;

    const step = steps[currentStep];
    context.clearRect(0, 0, canvas.width, canvas.height);

    const drawNode = (node: TreeNode) => {
      const radius = 25;
      let fillColor = currentTheme.colors.surface;
      let borderColor = currentTheme.colors.border;
      let glowColor = '';

      // Color coding based on state
      if (step.visitedNodes.includes(node.id)) {
        fillColor = currentTheme.colors.success;
      } else if (node.id === step.currentNode) {
        fillColor = currentTheme.colors.primary;
        glowColor = currentTheme.colors.primary;
      } else if (step.callStack.includes(node.id)) {
        fillColor = currentTheme.colors.warning;
      }

      // Draw glow effect
      if (glowColor) {
        context.shadowColor = glowColor;
        context.shadowBlur = 15;
      }

      // Node circle
      context.fillStyle = fillColor;
      context.beginPath();
      context.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      context.fill();
      
      context.shadowBlur = 0;

      context.strokeStyle = borderColor;
      context.lineWidth = 2;
      context.beginPath();
      context.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      context.stroke();

      // Value text
      context.fillStyle = 'white';
      context.font = 'bold 16px Arial';
      context.textAlign = 'center';
      context.fillText(node.value.toString(), node.x, node.y + 6);

      // Show visit order
      if (step.visitedNodes.includes(node.id)) {
        const orderIndex = step.visitedNodes.indexOf(node.id) + 1;
        context.fillStyle = currentTheme.colors.success;
        context.font = 'bold 12px Arial';
        context.fillText(orderIndex.toString(), node.x, node.y - radius - 10);
      }

      // Draw edges to children
      if (node.left) {
        context.strokeStyle = currentTheme.colors.border;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(node.x - radius * 0.7, node.y + radius * 0.7);
        context.lineTo(node.left.x + radius * 0.7, node.left.y - radius * 0.7);
        context.stroke();
        
        drawNode(node.left);
      }

      if (node.right) {
        context.strokeStyle = currentTheme.colors.border;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(node.x + radius * 0.7, node.y + radius * 0.7);
        context.lineTo(node.right.x - radius * 0.7, node.right.y - radius * 0.7);
        context.stroke();
        
        drawNode(node.right);
      }
    };

    drawNode(tree);

    // Draw traversal order
    if (step.traversalOrder.length > 0) {
      context.fillStyle = currentTheme.colors.text;
      context.font = 'bold 16px Arial';
      context.textAlign = 'left';
      context.fillText(
        `Traversal Order: ${step.traversalOrder.join(' → ')}`,
        20,
        canvas.height - 40
      );
    }

    // Draw call stack
    if (step.callStack.length > 0) {
      context.fillStyle = currentTheme.colors.warning;
      context.font = 'bold 14px Arial';
      context.textAlign = 'right';
      context.fillText(
        `Call Stack: [${step.callStack.map(id => tree.value).join(', ')}]`,
        canvas.width - 20,
        30
      );
    }

    // Legend
    const legendY = canvas.height - 80;
    const legendItems = [
      { color: currentTheme.colors.success, label: 'Visited' },
      { color: currentTheme.colors.primary, label: 'Current' },
      { color: currentTheme.colors.warning, label: 'In Call Stack' },
      { color: currentTheme.colors.surface, label: 'Unvisited' }
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
  }, [currentStep, steps, currentTheme, tree]);

  useEffect(() => {
    // Calculate positions for tree nodes
    const positionedTree = calculateNodePositions(tree, 400, 60, 150);
    setTree(positionedTree);
    generateTraversalSteps(positionedTree, selectedTraversal);
  }, [selectedTraversal, calculateNodePositions, generateTraversalSteps]);

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

  const pseudocodeLines = {
    inorder: [
      'function inorderTraversal(node):',
      '  if node is null:',
      '    return',
      '  ',
      '  inorderTraversal(node.left)',
      '  visit(node)  // Process node',
      '  inorderTraversal(node.right)'
    ],
    preorder: [
      'function preorderTraversal(node):',
      '  if node is null:',
      '    return',
      '  ',
      '  visit(node)  // Process node',
      '  preorderTraversal(node.left)',
      '  preorderTraversal(node.right)'
    ],
    postorder: [
      'function postorderTraversal(node):',
      '  if node is null:',
      '    return',
      '  ',
      '  postorderTraversal(node.left)',
      '  postorderTraversal(node.right)',
      '  visit(node)  // Process node'
    ]
  };

  return (
    <ModernVisualizationBase
      title="Binary Tree Traversal Visualization"
      description="Explore different binary tree traversal algorithms: inorder, preorder, and postorder"
      difficulty="Intermediate"
      category="Trees"
      complexity={{
        time: "O(n)",
        space: "O(h)"
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
        { label: 'Operations', value: currentStepData?.operationCount || 0, icon: <BarChart3 className="w-4 h-4" /> },
        { label: 'Tree Height', value: metrics.treeHeight, icon: <Layers className="w-4 h-4" /> },
        { label: 'Nodes Visited', value: currentStepData?.visitedNodes.length || 0, icon: <Target className="w-4 h-4" /> },
        { label: 'Call Stack Size', value: currentStepData?.callStack.length || 0, icon: <GitBranch className="w-4 h-4" /> }
      ] : undefined}
      educational={{
        keyPoints: [
          'Inorder: Left → Root → Right (sorted order for BST)',
          'Preorder: Root → Left → Right (copy tree structure)',
          'Postorder: Left → Right → Root (delete tree safely)',
          'All traversals visit each node exactly once',
          'Space complexity depends on tree height (recursion stack)'
        ],
        pseudocode: pseudocodeLines[selectedTraversal],
        realWorldUse: [
          'Expression tree evaluation (postorder)',
          'Directory tree listing (preorder)',
          'Binary search tree validation (inorder)',
          'Tree serialization and deserialization'
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

      {/* Traversal Selection */}
      <div className="flex justify-center gap-4">
        {(['inorder', 'preorder', 'postorder'] as const).map((type) => (
          <Button
            key={type}
            onClick={() => handleTraversalChange(type)}
            variant={selectedTraversal === type ? 'default' : 'outline'}
            className={`${
              selectedTraversal === type 
                ? 'bg-blue-600 text-white' 
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
          >
            {type === 'inorder' && <ArrowUp className="w-4 h-4 mr-2" />}
            {type === 'preorder' && <TreePine className="w-4 h-4 mr-2" />}
            {type === 'postorder' && <ArrowDown className="w-4 h-4 mr-2" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
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
            height={400}
            onDraw={drawTree}
            className="rounded-lg border border-white/20"
          />
        </CardContent>
      </Card>

      {/* Additional Controls */}
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
              {selectedTraversal.charAt(0).toUpperCase() + selectedTraversal.slice(1)} Traversal Pseudocode
            </h3>
            <div className="font-mono text-sm space-y-1" style={{ color: currentTheme.colors.textSecondary }}>
              {pseudocodeLines[selectedTraversal].map((line, index) => (
                <div key={index} className="leading-relaxed">
                  {line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Traversal Comparison */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card 
          className="backdrop-blur-sm"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: currentTheme.colors.text }}>
              <ArrowUp className="w-5 h-5 mr-2" />
              Inorder Traversal
            </h3>
            <div className="space-y-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p><strong>Order:</strong> Left → Root → Right</p>
              <p><strong>Use Case:</strong> Get sorted order from BST</p>
              <p><strong>Result:</strong> 20 → 30 → 40 → 50 → 60 → 70 → 80</p>
              <Badge style={{ backgroundColor: currentTheme.colors.info, color: 'white', marginTop: '8px' }}>
                Ascending Order
              </Badge>
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
            <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: currentTheme.colors.text }}>
              <TreePine className="w-5 h-5 mr-2" />
              Preorder Traversal
            </h3>
            <div className="space-y-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p><strong>Order:</strong> Root → Left → Right</p>
              <p><strong>Use Case:</strong> Copy or serialize tree</p>
              <p><strong>Result:</strong> 50 → 30 → 20 → 40 → 70 → 60 → 80</p>
              <Badge style={{ backgroundColor: currentTheme.colors.warning, color: 'white', marginTop: '8px' }}>
                Root First
              </Badge>
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
            <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: currentTheme.colors.text }}>
              <ArrowDown className="w-5 h-5 mr-2" />
              Postorder Traversal
            </h3>
            <div className="space-y-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p><strong>Order:</strong> Left → Right → Root</p>
              <p><strong>Use Case:</strong> Delete tree safely</p>
              <p><strong>Result:</strong> 20 → 40 → 30 → 60 → 80 → 70 → 50</p>
              <Badge style={{ backgroundColor: currentTheme.colors.success, color: 'white', marginTop: '8px' }}>
                Children First
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernBinaryTreeVisualization;
