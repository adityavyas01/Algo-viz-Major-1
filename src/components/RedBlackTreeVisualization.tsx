
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Canvas } from './Canvas';

interface RBNode {
  value: number;
  color: 'red' | 'black';
  left: RBNode | null;
  right: RBNode | null;
  parent: RBNode | null;
  x: number;
  y: number;
  isHighlighted?: boolean;
}

export const RedBlackTreeVisualization = () => {
  const [root, setRoot] = useState<RBNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [lastOperation, setLastOperation] = useState('');

  const createNode = (value: number, color: 'red' | 'black' = 'red'): RBNode => ({
    value,
    color,
    left: null,
    right: null,
    parent: null,
    x: 0,
    y: 0,
    isHighlighted: true
  });

  const rotateLeft = (node: RBNode): RBNode => {
    const rightChild = node.right!;
    node.right = rightChild.left;
    if (rightChild.left) rightChild.left.parent = node;
    rightChild.parent = node.parent;
    if (!node.parent) {
      // This becomes the new root
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }
    rightChild.left = node;
    node.parent = rightChild;
    return rightChild;
  };

  const rotateRight = (node: RBNode): RBNode => {
    const leftChild = node.left!;
    node.left = leftChild.right;
    if (leftChild.right) leftChild.right.parent = node;
    leftChild.parent = node.parent;
    if (!node.parent) {
      // This becomes the new root
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }
    leftChild.right = node;
    node.parent = leftChild;
    return leftChild;
  };

  const fixViolation = (newRoot: RBNode, node: RBNode): RBNode => {
    let current = node;
    let root = newRoot;

    while (current !== root && current.color === 'red' && current.parent?.color === 'red') {
      const parent = current.parent;
      const grandparent = parent.parent!;

      if (parent === grandparent.left) {
        const uncle = grandparent.right;
        
        if (uncle && uncle.color === 'red') {
          // Case 1: Uncle is red
          grandparent.color = 'red';
          parent.color = 'black';
          uncle.color = 'black';
          current = grandparent;
        } else {
          if (current === parent.right) {
            // Case 2: Current is right child
            root = rotateLeft(parent) === root ? rotateLeft(parent) : root;
            current = parent;
          }
          // Case 3: Current is left child
          parent.color = 'black';
          grandparent.color = 'red';
          if (grandparent === root) {
            root = rotateRight(grandparent);
          } else {
            rotateRight(grandparent);
          }
        }
      } else {
        const uncle = grandparent.left;
        
        if (uncle && uncle.color === 'red') {
          // Case 1: Uncle is red
          grandparent.color = 'red';
          parent.color = 'black';
          uncle.color = 'black';
          current = grandparent;
        } else {
          if (current === parent.left) {
            // Case 2: Current is left child
            root = rotateRight(parent) === root ? rotateRight(parent) : root;
            current = parent;
          }
          // Case 3: Current is right child
          parent.color = 'black';
          grandparent.color = 'red';
          if (grandparent === root) {
            root = rotateLeft(grandparent);
          } else {
            rotateLeft(grandparent);
          }
        }
      }
    }

    root.color = 'black';
    return root;
  };

  const insertRB = (root: RBNode | null, value: number): RBNode => {
    if (!root) {
      const newNode = createNode(value, 'black');
      return newNode;
    }

    // Standard BST insertion
    let current = root;
    let parent: RBNode | null = null;

    while (current) {
      parent = current;
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return root; // Duplicate values not allowed
      }
    }

    const newNode = createNode(value);
    newNode.parent = parent;

    if (value < parent!.value) {
      parent!.left = newNode;
    } else {
      parent!.right = newNode;
    }

    return fixViolation(root, newNode);
  };

  const calculatePositions = (node: RBNode | null, x: number, y: number, spacing: number): void => {
    if (!node) return;

    node.x = x;
    node.y = y;

    if (node.left) {
      calculatePositions(node.left, x - spacing, y + 80, spacing * 0.7);
    }
    if (node.right) {
      calculatePositions(node.right, x + spacing, y + 80, spacing * 0.7);
    }
  };

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      const newRoot = insertRB(root, value);
      calculatePositions(newRoot, 350, 50, 120);
      setRoot(newRoot);
      setLastOperation(`Inserted ${value}`);
      setInputValue('');
    }
  };

  const handleClear = () => {
    setRoot(null);
    setLastOperation('Tree cleared');
  };

  const renderTree = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!root) return;

    const drawNode = (node: RBNode | null) => {
      if (!node) return;

      // Draw connections first
      if (node.left) {
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.stroke();
      }
      if (node.right) {
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.stroke();
      }

      // Draw node
      ctx.fillStyle = node.isHighlighted ? '#22c55e' : 
                     node.color === 'red' ? '#ef4444' : '#1f2937';
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
      ctx.fill();

      // Draw node border
      ctx.strokeStyle = node.color === 'red' ? '#dc2626' : '#374151';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw value
      ctx.fillStyle = node.color === 'red' ? 'white' : 'white';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.value.toString(), node.x, node.y);

      drawNode(node.left);
      drawNode(node.right);
    };

    drawNode(root);
  }, [root]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="w-32 bg-white/10 border-white/30 text-white placeholder:text-white/50"
            onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
          />
          <Button 
            onClick={handleInsert}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Insert
          </Button>
          <Button 
            onClick={handleClear}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Clear
          </Button>
        </div>
      </div>

      {lastOperation && (
        <div className="bg-white/10 rounded-lg px-4 py-2 text-white">
          <span className="text-white/70">Last Operation:</span>
          <span className="ml-2 font-semibold">{lastOperation}</span>
        </div>
      )}

      <Canvas
        width={700}
        height={400}
        onRender={renderTree}
        className="border border-white/20 rounded-lg bg-white/5"
      />

      <div className="flex flex-wrap gap-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Red Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-800 border border-gray-600 rounded-full"></div>
          <span>Black Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Recently Inserted</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Red-Black Tree Properties</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Root is always black</p>
          <p>• No two red nodes can be adjacent</p>
          <p>• Every path from root to leaf has same number of black nodes</p>
          <p>• Search/Insert/Delete: O(log n) guaranteed</p>
          <p>• Used in C++ STL map, Java TreeMap</p>
        </div>
      </div>
    </div>
  );
};
