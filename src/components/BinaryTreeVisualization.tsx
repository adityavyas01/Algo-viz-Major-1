
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Canvas } from './Canvas';
import { Plus, Minus, RotateCcw, Search } from 'lucide-react';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x?: number;
  y?: number;
}

export const BinaryTreeVisualization = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [highlightedNode, setHighlightedNode] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const insertNode = (node: TreeNode | null, value: number): TreeNode => {
    if (!node) {
      return { value, left: null, right: null };
    }

    if (value < node.value) {
      node.left = insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = insertNode(node.right, value);
    }

    return node;
  };

  const insert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || !inputValue.trim()) return;

    setRoot(prev => insertNode(prev, value));
    setInputValue('');
  };

  const deleteNode = (node: TreeNode | null, value: number): TreeNode | null => {
    if (!node) return null;

    if (value < node.value) {
      node.left = deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = deleteNode(node.right, value);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const minRight = findMin(node.right);
      node.value = minRight.value;
      node.right = deleteNode(node.right, minRight.value);
    }

    return node;
  };

  const findMin = (node: TreeNode): TreeNode => {
    while (node.left) {
      node = node.left;
    }
    return node;
  };

  const remove = () => {
    const value = parseInt(inputValue);
    if (isNaN(value) || !inputValue.trim()) return;

    setRoot(prev => deleteNode(prev, value));
    setInputValue('');
  };

  const search = () => {
    const value = parseInt(searchValue);
    if (isNaN(value) || !searchValue.trim()) return;

    setHighlightedNode(value);
    setTimeout(() => setHighlightedNode(null), 2000);
  };

  const clear = () => {
    setRoot(null);
    setHighlightedNode(null);
  };

  const calculatePositions = (node: TreeNode | null, x: number, y: number, spacing: number): void => {
    if (!node) return;

    node.x = x;
    node.y = y;

    const newSpacing = spacing * 0.6;
    if (node.left) {
      calculatePositions(node.left, x - spacing, y + 80, newSpacing);
    }
    if (node.right) {
      calculatePositions(node.right, x + spacing, y + 80, newSpacing);
    }
  };

  const renderTree = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!root) {
      ctx.fillStyle = '#6b7280';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Tree is empty', canvas.width/2, canvas.height/2);
      return;
    }

    calculatePositions(root, canvas.width/2, 50, 120);

    const drawNode = (node: TreeNode | null) => {
      if (!node || node.x === undefined || node.y === undefined) return;

      const radius = 25;
      const isHighlighted = highlightedNode === node.value;

      // Draw connections first
      if (node.left && node.left.x !== undefined && node.left.y !== undefined) {
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.stroke();
      }

      if (node.right && node.right.x !== undefined && node.right.y !== undefined) {
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.stroke();
      }

      // Draw node
      ctx.fillStyle = isHighlighted ? '#ef4444' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fill();

      // Draw border
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw value
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.value.toString(), node.x, node.y + 4);

      // Recursively draw children
      drawNode(node.left);
      drawNode(node.right);
    };

    drawNode(root);

    // Draw title
    ctx.fillStyle = '#6b7280';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('BINARY TREE', canvas.width/2, 25);
  };

  const getTreeHeight = (node: TreeNode | null): number => {
    if (!node) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
  };

  const getNodeCount = (node: TreeNode | null): number => {
    if (!node) return 0;
    return 1 + getNodeCount(node.left) + getNodeCount(node.right);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Enter value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && insert()}
            className="w-32"
          />
          <Button onClick={insert} size="sm" className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4" />
            Insert
          </Button>
          <Button onClick={remove} size="sm" className="bg-red-600 hover:bg-red-700">
            <Minus className="w-4 h-4" />
            Delete
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Search value"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && search()}
            className="w-32"
          />
          <Button onClick={search} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
        
        <Button onClick={clear} size="sm" variant="outline">
          <RotateCcw className="w-4 h-4" />
          Clear
        </Button>
      </div>

      <div className="flex gap-6 text-white">
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Nodes:</span>
          <span className="ml-2 font-semibold">{getNodeCount(root)}</span>
        </div>
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Height:</span>
          <span className="ml-2 font-semibold">{getTreeHeight(root)}</span>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4">
        <Canvas
          width={600}
          height={400}
          onRender={renderTree}
          className="border border-white/20 rounded mx-auto"
        />
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Binary Tree</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Each node has at most two children (left and right)</p>
          <p>• Insert: O(log n) average, O(n) worst case</p>
          <p>• Search: O(log n) average, O(n) worst case</p>
          <p>• Delete: O(log n) average, O(n) worst case</p>
          <p>• Used for hierarchical data, expression trees, decision trees</p>
        </div>
      </div>
    </div>
  );
};
