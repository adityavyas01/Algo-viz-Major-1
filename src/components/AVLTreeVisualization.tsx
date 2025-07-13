import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Canvas } from './Canvas';
import { CodeEditor } from './CodeEditor';

interface AVLNode {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
  balance: number;
  x: number;
  y: number;
  isHighlighted?: boolean;
  rotationType?: 'LL' | 'RR' | 'LR' | 'RL' | null;
}

export const AVLTreeVisualization = () => {
  const [root, setRoot] = useState<AVLNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [lastOperation, setLastOperation] = useState('');

  const getHeight = (node: AVLNode | null): number => {
    return node ? node.height : 0;
  };

  const getBalance = (node: AVLNode | null): number => {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
  };

  const updateNode = (node: AVLNode): void => {
    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    node.balance = getBalance(node);
  };

  const rotateRight = (y: AVLNode): AVLNode => {
    const x = y.left!;
    y.left = x.right;
    x.right = y;
    updateNode(y);
    updateNode(x);
    x.rotationType = 'LL';
    return x;
  };

  const rotateLeft = (x: AVLNode): AVLNode => {
    const y = x.right!;
    x.right = y.left;
    y.left = x;
    updateNode(x);
    updateNode(y);
    y.rotationType = 'RR';
    return y;
  };

  const insert = (node: AVLNode | null, value: number): AVLNode => {
    // Standard BST insertion
    if (!node) {
      return {
        value,
        left: null,
        right: null,
        height: 1,
        balance: 0,
        x: 0,
        y: 0,
        isHighlighted: true
      };
    }

    if (value < node.value) {
      node.left = insert(node.left, value);
    } else if (value > node.value) {
      node.right = insert(node.right, value);
    } else {
      return node; // Duplicate values not allowed
    }

    // Update height and balance
    updateNode(node);

    // Get balance factor
    const balance = node.balance;

    // Left Left Case
    if (balance > 1 && value < node.left!.value) {
      return rotateRight(node);
    }

    // Right Right Case
    if (balance < -1 && value > node.right!.value) {
      return rotateLeft(node);
    }

    // Left Right Case
    if (balance > 1 && value > node.left!.value) {
      node.left = rotateLeft(node.left!);
      const result = rotateRight(node);
      result.rotationType = 'LR';
      return result;
    }

    // Right Left Case
    if (balance < -1 && value < node.right!.value) {
      node.right = rotateRight(node.right!);
      const result = rotateLeft(node);
      result.rotationType = 'RL';
      return result;
    }

    return node;
  };

  const calculatePositions = (node: AVLNode | null, x: number, y: number, spacing: number): void => {
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
      const newRoot = insert(root, value);
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

    const drawNode = (node: AVLNode | null) => {
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
      ctx.fillStyle = node.isHighlighted ? '#ef4444' : 
                     Math.abs(node.balance) > 1 ? '#f59e0b' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
      ctx.fill();

      // Draw node border
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw value
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.value.toString(), node.x, node.y);

      // Draw balance factor
      ctx.fillStyle = Math.abs(node.balance) > 1 ? '#ef4444' : '#64748b';
      ctx.font = '12px Arial';
      ctx.fillText(node.balance.toString(), node.x + 35, node.y - 10);

      // Draw height
      ctx.fillStyle = '#64748b';
      ctx.fillText(`h:${node.height}`, node.x + 35, node.y + 10);

      // Draw rotation type if present
      if (node.rotationType) {
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(node.rotationType, node.x, node.y - 40);
      }

      drawNode(node.left);
      drawNode(node.right);
    };

    drawNode(root);
  }, [root]);

  return (
    <Tabs defaultValue="visualization" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="visualization">Interactive Visualization</TabsTrigger>
        <TabsTrigger value="code">Code Implementation</TabsTrigger>
      </TabsList>

      <TabsContent value="visualization" className="space-y-6">
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
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span>Balanced Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span>Unbalanced Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span>Recently Inserted</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-3">AVL Tree Properties</h3>
          <div className="space-y-2 text-sm text-white/80">
            <p>• Self-balancing binary search tree with height difference ≤ 1</p>
            <p>• Rotations: LL (Right), RR (Left), LR (Left-Right), RL (Right-Left)</p>
            <p>• Balance Factor = Height(Left) - Height(Right)</p>
            <p>• Search/Insert/Delete: O(log n) guaranteed</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="code">
        <CodeEditor
          algorithmName="AVL Tree"
          complexity={{
            time: "O(log n)",
            space: "O(log n)"
          }}
        />
      </TabsContent>
    </Tabs>
  );
};
