import React, { useState, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernTreeVisualization, TreeNodeData, TreeEdgeData } from './ModernTreeVisualization';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { RedBlackTree, RBTreeStep, RBNode, generateInsertSteps } from '@/lib/algorithms/data-structures/red-black-tree';
import { Plus, RotateCw, Palette } from 'lucide-react';

const RBT_INFO = {
  name: 'Red-Black Tree',
  description: 'A Red-Black Tree is a type of self-balancing binary search tree. Each node stores an extra bit for storing color ("red" or "black"). By constraining the way nodes are colored on any path from the root to a leaf, red-black trees ensure that no such path is more than twice as long as any other, so that the tree remains approximately balanced. This guarantees O(log n) time for search, insert, and delete operations.',
  complexity: {
    time: 'O(log n)',
    space: 'O(n)',
  },
  difficulty: 'Advanced' as const,
  category: 'Tree',
  educational: {
    keyPoints: [
      'The root is always black.',
      'Every leaf (NIL) is black.',
      'If a node is red, then both its children are black.',
      'Every simple path from a given node to any of its descendant leaves contains the same number of black nodes.',
    ],
    realWorldUse: [
      'Used in the C++ Standard Template Library (map, set).',
      'Used in the Java Collections Framework (TreeMap, TreeSet).',
      'Implementation of Completely Fair Scheduler in Linux kernel.',
      'Used in computational geometry data structures.',
    ],
    pseudocode: [
      'function insert(value):',
      '  node = new Node(value, RED)',
      '  // Perform standard BST insert',
      '  bst_insert(node)',
      '  fix_violations(node)',
      '',
      'function fix_violations(node):',
      '  while node.parent.color == RED:',
      '    // ... (rotation and recoloring logic)',
      '  root.color = BLACK',
    ],
  }
};

const ModernRedBlackTreeVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [rbTree] = useState(() => new RedBlackTree());
  const [steps, setSteps] = useState<RBTreeStep[]>([]);
  const [speed, setSpeed] = useState(800);
  const [inputValue, setInputValue] = useState('');
  
  const animation = useAnimation<RBTreeStep>(steps, speed);

  const handleInsert = () => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) return;
    
    const newSteps = generateInsertSteps(rbTree, value);
    setSteps(newSteps);
    setInputValue('');
    animation.reset();
    animation.play();
  };

  const assignPositions = (node: RBNode | null, x = 0, y = 0, horizontalSpacing = 400): void => {
    if (!node) return;
    const nextHorizontalSpacing = horizontalSpacing / 2;
    if (node.left) assignPositions(node.left, x - nextHorizontalSpacing, y + 80, nextHorizontalSpacing);
    if (node.right) assignPositions(node.right, x + nextHorizontalSpacing, y + 80, nextHorizontalSpacing);
  };

  const { nodes, edges } = useMemo(() => {
    const currentStep = animation.currentStep;
    if (!currentStep || !currentStep.tree) {
      // Show initial tree structure when no animation is active
      const initialNodes: TreeNodeData[] = [];
      const initialEdges: TreeEdgeData[] = [];
      
      if (rbTree.root) {
        const queue: RBNode[] = [rbTree.root];
        while (queue.length > 0) {
          const node = queue.shift()!;
          initialNodes.push({
            id: node.value.toString(),
            value: node.value,
            label: node.color === 'red' ? 'R' : 'B',
            state: 'normal',
            color: node.color === 'red' ? '#ef4444' : '#1f2937',
          });
          
          if (node.left) {
            queue.push(node.left);
            initialEdges.push({
              from: node.value.toString(),
              to: node.left.value.toString(),
              state: 'normal',
            });
          }
          if (node.right) {
            queue.push(node.right);
            initialEdges.push({
              from: node.value.toString(),
              to: node.right.value.toString(),
              state: 'normal',
            });
          }
        }
      }
      
      return { nodes: initialNodes, edges: initialEdges };
    }
    
    const treeNodes: TreeNodeData[] = [];
    const treeEdges: TreeEdgeData[] = [];
    const queue: RBNode[] = [currentStep.tree];

    while (queue.length > 0) {
      const node = queue.shift()!;
      
      let state: TreeNodeData['state'] = 'normal';
      if (currentStep.highlightedNodes.includes(node.value)) {
        state = 'current';
      }
      
      const nodeColor = currentStep.changedColors.get(node.value) || node.color;

      treeNodes.push({
        id: node.value.toString(),
        value: node.value,
        label: nodeColor === 'red' ? 'R' : 'B',
        state: state,
        color: nodeColor === 'red' ? '#ef4444' : '#1f2937',
      });

      if (node.left) {
        treeEdges.push({ 
          from: node.value.toString(), 
          to: node.left.value.toString(), 
          state: 'normal' 
        });
        queue.push(node.left);
      }
      if (node.right) {
        treeEdges.push({ 
          from: node.value.toString(), 
          to: node.right.value.toString(), 
          state: 'normal' 
        });
        queue.push(node.right);
      }
    }
    
    return { nodes: treeNodes, edges: treeEdges };
  }, [animation.currentStep]);

  const metrics = useMemo(() => {
    const currentStep = animation.currentStep;
    if (!currentStep) return [];

    return [
      {
        label: 'Progress',
        value: `${Math.round((animation.currentStepIndex / Math.max(1, steps.length - 1)) * 100)}%`,
        icon: <RotateCw className="w-4 h-4" />,
        color: currentTheme.colors.primary,
      },
      {
        label: 'Phase',
        value: currentStep.phase,
        icon: <Palette className="w-4 h-4" />,
        color: '#8b5cf6',
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

  const currentStepDescription = animation.currentStep?.description || 'Click Insert to add a value';

  return (
    <ModernVisualizationBase
      title={RBT_INFO.name}
      description={RBT_INFO.description}
      complexity={RBT_INFO.complexity}
      difficulty={RBT_INFO.difficulty}
      category={RBT_INFO.category}
      educational={RBT_INFO.educational}
      controls={controls}
      metrics={metrics}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-4">
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
            placeholder="e.g., 45"
            className="w-24"
          />
          <Button onClick={handleInsert}>
            <Plus className="w-4 h-4 mr-2" />
            Insert
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground text-center">
          {currentStepDescription}
        </div>

        <ModernTreeVisualization nodes={nodes} edges={edges} />
        
        <div className="grid grid-cols-2 gap-4 text-sm mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>Red Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-800"></div>
            <span>Black Node</span>
          </div>
        </div>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernRedBlackTreeVisualization;
