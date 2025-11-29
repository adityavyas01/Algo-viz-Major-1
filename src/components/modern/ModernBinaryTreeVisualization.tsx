import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernTreeVisualization, TreeNodeData, TreeEdgeData } from './ModernTreeVisualization';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Button } from '@/components/ui/button';
import {
  generateInsertSteps,
  generateDeleteSteps,
  generateSearchSteps,
  BinarySearchTree,
  BinaryTreeStep,
  positionTree,
  TraversalType,
  TreeNode,
  PositionedTreeNode,
} from '@/lib/algorithms/data-structures/binary-tree';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Trash2,
  Search,
  TreePine,
  GitBranch,
  CheckCircle,
  Layers,
  Activity,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

const ModernBinaryTreeVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [speed, setSpeed] = useState(800);
  const [steps, setSteps] = useState<BinaryTreeStep[]>([]);
  const [selectedTraversal, setSelectedTraversal] = useState<TraversalType>('inorder');
  const [bst, setBst] = useState(new BinarySearchTree());
  const [inputValue, setInputValue] = useState('');
  const [operation, setOperation] = useState<'insert' | 'delete' | 'search'>('insert');
  
  const animation = useAnimation(steps, speed);

  useEffect(() => {
    const initialValues = [50, 30, 70, 20, 40, 60, 80];
    const newBst = new BinarySearchTree();
    initialValues.forEach(v => newBst.insert(v));
    setBst(newBst);
  }, []);

  const handleOperation = () => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) return;

    let newSteps: BinaryTreeStep[] = [];
    const newBst = new BinarySearchTree();
    newBst.root = cloneTree(bst.root);

    if (operation === 'insert') {
      newSteps = generateInsertSteps(bst, value);
      newBst.insert(value);
    } else if (operation === 'delete') {
      newSteps = generateDeleteSteps(bst, value);
      newBst.delete(value);
    } else if (operation === 'search') {
      newSteps = generateSearchSteps(bst, value);
    }

    animation.setSteps(newSteps);
    setBst(newBst);
    setInputValue('');
    animation.reset();
    animation.play();
  };

  const generateTraversalSteps = useCallback((root: TreeNode, type: TraversalType) => {
    const newSteps: BinaryTreeStep[] = [];
    const visitedNodeIds: string[] = [];
    const traversalOrder: number[] = [];
    const callStack: string[] = [];
    const positionedRoot = positionTree(root);

    const addStep = (desc: string, currentNodeId?: string) => {
      newSteps.push({
        tree: positionTree(cloneTree(bst.root)),
        currentNodeId,
        visitedNodeIds: [...visitedNodeIds],
        traversalOrder: [...traversalOrder],
        description: desc,
        callStack: [...callStack],
        operation: type,
      });
    };

    addStep(`Starting ${type} traversal.`);

    const traverse = (node: TreeNode | null) => {
      if (!node) return;

      callStack.push(node.id);
      addStep(`Entering node ${node.value}.`, node.id);

      if (type === 'preorder') {
        visitedNodeIds.push(node.id);
        traversalOrder.push(node.value);
        addStep(`Processing node ${node.value} (Preorder).`, node.id);
      }

      addStep(`Moving to left child of ${node.value}.`, node.id);
      traverse(node.left || null);

      if (type === 'inorder') {
        visitedNodeIds.push(node.id);
        traversalOrder.push(node.value);
        addStep(`Processing node ${node.value} (Inorder).`, node.id);
      }

      addStep(`Moving to right child of ${node.value}.`, node.id);
      traverse(node.right || null);

      if (type === 'postorder') {
        visitedNodeIds.push(node.id);
        traversalOrder.push(node.value);
        addStep(`Processing node ${node.value} (Postorder).`, node.id);
      }

      callStack.pop();
      addStep(`Leaving node ${node.value}.`, node.id);
    };

    traverse(root);
    addStep(`Traversal complete. Final order: ${traversalOrder.join(' → ')}`);
    return newSteps;
  }, [bst]);

  useEffect(() => {
    if (bst.root) {
      const newSteps = generateTraversalSteps(bst.root, selectedTraversal);
      setSteps(newSteps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTraversal]);

  const { nodes, edges } = useMemo(() => {
    const currentStep = animation.currentStep;
    if (!currentStep || !currentStep.tree) {
      // Show initial tree when no animation is active
      if (!bst.root) return { nodes: [], edges: [] };
      
      const positioned = positionTree(bst.root);
      const newNodes: TreeNodeData[] = [];
      const newEdges: TreeEdgeData[] = [];
      const q: PositionedTreeNode[] = [positioned];

      while (q.length > 0) {
        const node = q.shift()!;
        newNodes.push({ id: node.id, value: node.value, x: node.x, y: node.y, state: 'normal' });

        if (node.left) {
          newEdges.push({ from: node.id, to: node.left.id, state: 'normal' });
          q.push(node.left);
        }
        if (node.right) {
          newEdges.push({ from: node.id, to: node.right.id, state: 'normal' });
          q.push(node.right);
        }
      }
      return { nodes: newNodes, edges: newEdges };
    }

    const newNodes: TreeNodeData[] = [];
    const newEdges: TreeEdgeData[] = [];
    const q: PositionedTreeNode[] = [currentStep.tree];

    while (q.length > 0) {
      const node = q.shift()!;
      
      let state: TreeNodeData['state'] = 'normal';
      if (node.id === currentStep.currentNodeId) {
        state = 'current';
      } else if (currentStep.visitedNodeIds.includes(node.id)) {
        state = 'visited';
      } else if (currentStep.callStack.includes(node.id)) {
        state = 'path';
      }

      newNodes.push({ id: node.id, value: node.value, x: node.x, y: node.y, state });

      if (node.left) {
        newEdges.push({ from: node.id, to: node.left.id, state: 'normal' });
        q.push(node.left);
      }
      if (node.right) {
        newEdges.push({ from: node.id, to: node.right.id, state: 'normal' });
        q.push(node.right);
      }
    }
    return { nodes: newNodes, edges: newEdges };
  }, [animation.currentStep]);

  const metrics = useMemo(() => {
    const currentStep = animation.currentStep;
    if (!currentStep) {
      const getTreeHeight = (node: TreeNode | null): number => !node ? 0 : 1 + Math.max(getTreeHeight(node.left || null), getTreeHeight(node.right || null));
      const getNodeCount = (node: TreeNode | null): number => !node ? 0 : 1 + getNodeCount(node.left || null) + getNodeCount(node.right || null);
      
      return [
        { label: 'Step', value: '0/0', icon: <Activity /> },
        { label: 'Nodes Visited', value: 0, icon: <CheckCircle /> },
        { label: 'Call Stack', value: 0, icon: <GitBranch /> },
        { label: 'Tree Height', value: getTreeHeight(bst.root), icon: <Layers /> },
      ];
    }
    
    const getTreeHeight = (node: TreeNode | null): number => !node ? 0 : 1 + Math.max(getTreeHeight(node.left || null), getTreeHeight(node.right || null));
    const getNodeCount = (node: TreeNode | null): number => !node ? 0 : 1 + getNodeCount(node.left || null) + getNodeCount(node.right || null);

    return [
      { label: 'Step', value: `${animation.currentStepIndex + 1}/${steps.length}`, icon: <Activity /> },
      { label: 'Nodes Visited', value: currentStep.visitedNodeIds.length, icon: <CheckCircle /> },
      { label: 'Call Stack', value: currentStep.callStack.length, icon: <GitBranch /> },
      { label: 'Tree Height', value: getTreeHeight(bst.root), icon: <Layers /> },
    ];
  }, [animation.currentStep, animation.currentStepIndex, steps.length, bst.root]);

  const controls = {
    isPlaying: animation.isPlaying,
    onPlay: animation.play,
    onPause: animation.pause,
    onReset: () => {
        if (bst.root) generateTraversalSteps(bst.root, selectedTraversal)
    },
    onStepForward: animation.nextStep,
    onStepBack: animation.prevStep,
    currentStep: animation.currentStepIndex,
    totalSteps: steps.length,
    speed,
    onSpeedChange: setSpeed,
  };

  return (
    <ModernVisualizationBase
      title="Binary Search Tree"
      description="Visualize insertion, deletion, and traversals on a Binary Search Tree."
      difficulty="Intermediate"
      category="Tree Algorithms"
      complexity={{ time: 'O(log n) to O(n)', space: 'O(n)' }}
      controls={controls}
      metrics={metrics}
    >
      <div className="flex justify-center items-center gap-4 mb-4">
        <div className="flex items-center bg-background p-1 rounded-lg">
          <Button onClick={() => setOperation('insert')} variant={operation === 'insert' ? 'default' : 'ghost'} size="sm">Insert</Button>
          <Button onClick={() => setOperation('delete')} variant={operation === 'delete' ? 'default' : 'ghost'} size="sm">Delete</Button>
          <Button onClick={() => setOperation('search')} variant={operation === 'search' ? 'default' : 'ghost'} size="sm">Search</Button>
        </div>

        <div className="flex">
          <Input 
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., 45"
            className="w-24"
          />
          <Button onClick={handleOperation} className="ml-2">
            {operation === 'insert' && <Plus className="w-4 h-4 mr-2" />}
            {operation === 'delete' && <Trash2 className="w-4 h-4 mr-2" />}
            {operation === 'search' && <Search className="w-4 h-4 mr-2" />}
            Go
          </Button>
        </div>
        {(['inorder', 'preorder', 'postorder'] as const).map(type => (
          <Button
            key={type}
            onClick={() => setSelectedTraversal(type)}
            variant={selectedTraversal === type ? 'default' : 'outline'}
          >
            {type === 'inorder' ? <ArrowUp className="w-4 h-4 mr-2" /> : type === 'preorder' ? <TreePine className="w-4 h-4 mr-2" /> : <ArrowDown className="w-4 h-4 mr-2" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      <div
        className="p-4 rounded-xl text-center mb-4"
        style={{ backgroundColor: currentTheme.colors.surface + '40', border: `1px solid ${currentTheme.colors.border}40` }}
      >
        <p className="text-lg font-medium" style={{ color: currentTheme.colors.text }}>
          {animation.currentStep?.description || 'Select an operation.'}
        </p>
      </div>

      <ModernTreeVisualization nodes={nodes} edges={edges} />

      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.surface + '40' }}>
        <h3 className="text-lg font-semibold mb-2" style={{ color: currentTheme.colors.text }}>Traversal Order:</h3>
        <p className="font-mono text-lg" style={{ color: currentTheme.colors.primary }}>
          {animation.currentStep?.traversalOrder.join(' → ') || '...'}
        </p>
      </div>
    </ModernVisualizationBase>
  );
};

function cloneTree(node: TreeNode | null): TreeNode | null {
  if (!node) return null;
  return {
    ...node,
    left: cloneTree(node.left || null),
    right: cloneTree(node.right || null),
  };
}

export default ModernBinaryTreeVisualization;
