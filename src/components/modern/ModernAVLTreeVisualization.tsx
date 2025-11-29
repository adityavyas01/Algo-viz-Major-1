import React, { useState, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernTreeVisualization, TreeNodeData, TreeEdgeData } from './ModernTreeVisualization';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AVLNode {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
  x: number;
  y: number;
  isNew?: boolean;
}

const AVL_TREE_INFO = {
  name: 'AVL Tree',
  description: 'An AVL tree is a self-balancing binary search tree. It was the first such data structure to be invented. In an AVL tree, the heights of the two child subtrees of any node differ by at most one; if at any time they differ by more than one, rebalancing is done to restore this property. Lookup, insertion, and deletion all take O(log n) time in both the average and worst cases, where n is the number of nodes in the tree prior to the operation.',
  complexity: {
    time: 'O(log n)',
    space: 'O(n)',
  },
  code: `class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  // ... (Implementation details)
  
  insert(node, value) {
    // 1. Perform standard BST insertion
    if (!node) return new Node(value);
    if (value < node.value) {
      node.left = this.insert(node.left, value);
    } else if (value > node.value) {
      node.right = this.insert(node.right, value);
    } else {
      return node; // Duplicate values are not allowed
    }

    // 2. Update height of this ancestor node
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // 3. Get the balance factor
    const balance = this.getBalance(node);

    // 4. If the node becomes unbalanced, then there are 4 cases
    // Left Left Case
    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }

    // Right Right Case
    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }

    // Left Right Case
    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // Right Left Case
    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }
}
`
};

const ModernAVLTreeVisualization: React.FC = () => {
  const [root, setRoot] = useState<AVLNode | null>(null);
  const [inputValue, setInputValue] = useState('');

  const getHeight = (node: AVLNode | null): number => node ? node.height : 0;

  const getBalance = (node: AVLNode | null): number => node ? getHeight(node.left) - getHeight(node.right) : 0;

  const updateHeight = (node: AVLNode): void => {
    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  };

  const rightRotate = (y: AVLNode): AVLNode => {
    const x = y.left!;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    updateHeight(y);
    updateHeight(x);
    return x;
  };

  const leftRotate = (x: AVLNode): AVLNode => {
    const y = x.right!;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    updateHeight(x);
    updateHeight(y);
    return y;
  };

  const insert = (node: AVLNode | null, value: number): AVLNode => {
    if (!node) {
      return { value, left: null, right: null, height: 1, x: 0, y: 0, isNew: true };
    }

    if (value < node.value) {
      node.left = insert(node.left, value);
    } else if (value > node.value) {
      node.right = insert(node.right, value);
    } else {
      return node;
    }

    updateHeight(node);
    const balance = getBalance(node);

    if (balance > 1 && value < node.left!.value) {
      return rightRotate(node);
    }
    if (balance < -1 && value > node.right!.value) {
      return leftRotate(node);
    }
    if (balance > 1 && value > node.left!.value) {
      node.left = leftRotate(node.left!);
      return rightRotate(node);
    }
    if (balance < -1 && value < node.right!.value) {
      node.right = rightRotate(node.right!);
      return leftRotate(node);
    }

    return node;
  };
  
  const clearNewFlag = (node: AVLNode | null) => {
    if (!node) return;
    node.isNew = false;
    clearNewFlag(node.left);
    clearNewFlag(node.right);
  };

  const handleInsert = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      // Clear previous 'new' flags
      if (root) {
        clearNewFlag(root);
      }
      const newRoot = insert(root, value);
      setRoot(newRoot);
      setInputValue('');
    }
  };

  const handleClear = () => {
    setRoot(null);
  };

  const assignPositions = (node: AVLNode | null, x = 0, y = 0, horizontalSpacing = 400, level = 0) => {
    if (!node) return;
    node.x = x;
    node.y = y;
    const nextHorizontalSpacing = horizontalSpacing / 2;
    if (node.left) assignPositions(node.left, x - nextHorizontalSpacing, y + 80, nextHorizontalSpacing, level + 1);
    if (node.right) assignPositions(node.right, x + nextHorizontalSpacing, y + 80, nextHorizontalSpacing, level + 1);
  };

  const { nodes, edges } = useMemo(() => {
    if (!root) return { nodes: [], edges: [] };
    
    assignPositions(root);

    const treeNodes: TreeNodeData[] = [];
    const treeEdges: TreeEdgeData[] = [];
    const queue: (AVLNode | null)[] = [root];

    while (queue.length > 0) {
      const node = queue.shift();
      if (node) {
        const balance = getBalance(node);
        let state: TreeNodeData['state'] = 'normal';
        if (node.isNew) state = 'current';
        else if (Math.abs(balance) > 1) state = 'highlighted';

        treeNodes.push({
          id: node.value.toString(),
          value: node.value,
          x: node.x,
          y: node.y,
          label: `h:${node.height}, b:${balance}`,
          state: state,
        });

        if (node.left) {
          treeEdges.push({ from: node.value.toString(), to: node.left.value.toString(), state: 'normal' });
          queue.push(node.left);
        }
        if (node.right) {
          treeEdges.push({ from: node.value.toString(), to: node.right.value.toString(), state: 'normal' });
          queue.push(node.right);
        }
      }
    }
    return { nodes: treeNodes, edges: treeEdges };
  }, [root]);

  const controls = (
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
        placeholder="Value"
        className="w-24"
      />
      <Button onClick={handleInsert}>Insert</Button>
      <Button onClick={handleClear} variant="outline">Clear</Button>
    </div>
  );

  return (
    <ModernVisualizationBase
      title={AVL_TREE_INFO.name}
      description={AVL_TREE_INFO.description}
      complexity={AVL_TREE_INFO.complexity}
      code={AVL_TREE_INFO.code}
      controls={null}
      interactiveControls={controls}
      difficulty="Intermediate"
      category="Tree"
    >
      <ModernTreeVisualization nodes={nodes} edges={edges} />
    </ModernVisualizationBase>
  );
};

export default ModernAVLTreeVisualization;
