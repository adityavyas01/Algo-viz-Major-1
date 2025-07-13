
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Canvas } from '@/components/Canvas';
import { Play, RotateCcw, Plus } from 'lucide-react';

interface SegmentTreeNode {
  value: number;
  left: number;
  right: number;
  children?: [SegmentTreeNode, SegmentTreeNode];
}

interface FenwickTreeNode {
  index: number;
  value: number;
  prefix: number;
}

export const SegmentTreeVisualization: React.FC = () => {
  const [array, setArray] = useState([1, 3, 5, 7, 9, 11]);
  const [segmentTree, setSegmentTree] = useState<SegmentTreeNode | null>(null);
  const [fenwickTree, setFenwickTree] = useState<FenwickTreeNode[]>([]);
  const [queryLeft, setQueryLeft] = useState(0);
  const [queryRight, setQueryRight] = useState(2);
  const [updateIndex, setUpdateIndex] = useState(0);
  const [updateValue, setUpdateValue] = useState(5);
  const [activeStructure, setActiveStructure] = useState<'segment' | 'fenwick'>('segment');
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());

  const buildSegmentTree = (arr: number[], left: number, right: number): SegmentTreeNode => {
    if (left === right) {
      return { value: arr[left], left, right };
    }
    
    const mid = Math.floor((left + right) / 2);
    const leftChild = buildSegmentTree(arr, left, mid);
    const rightChild = buildSegmentTree(arr, mid + 1, right);
    
    return {
      value: leftChild.value + rightChild.value,
      left,
      right,
      children: [leftChild, rightChild]
    };
  };

  const buildFenwickTree = (arr: number[]): FenwickTreeNode[] => {
    const fenwick: FenwickTreeNode[] = [];
    for (let i = 0; i < arr.length; i++) {
      let prefix = 0;
      for (let j = 0; j <= i; j++) {
        prefix += arr[j];
      }
      fenwick.push({ index: i + 1, value: arr[i], prefix });
    }
    return fenwick;
  };

  const initializeStructures = () => {
    const segTree = buildSegmentTree(array, 0, array.length - 1);
    const fenTree = buildFenwickTree(array);
    setSegmentTree(segTree);
    setFenwickTree(fenTree);
  };

  const performRangeQuery = () => {
    setHighlightedNodes(new Set());
    
    if (activeStructure === 'segment' && segmentTree) {
      const result = querySegmentTree(segmentTree, queryLeft, queryRight, new Set());
      setTimeout(() => setHighlightedNodes(new Set()), 2000);
    } else if (activeStructure === 'fenwick') {
      const result = queryFenwickTree(queryLeft, queryRight);
    }
  };

  const querySegmentTree = (node: SegmentTreeNode, qLeft: number, qRight: number, visited: Set<string>): number => {
    const nodeKey = `${node.left}-${node.right}`;
    visited.add(nodeKey);
    setHighlightedNodes(new Set(visited));

    if (qLeft > node.right || qRight < node.left) return 0;
    if (qLeft <= node.left && node.right <= qRight) return node.value;
    
    if (node.children) {
      return querySegmentTree(node.children[0], qLeft, qRight, visited) +
             querySegmentTree(node.children[1], qLeft, qRight, visited);
    }
    return node.value;
  };

  const queryFenwickTree = (left: number, right: number): number => {
    const rightSum = fenwickTree[right]?.prefix || 0;
    const leftSum = left > 0 ? (fenwickTree[left - 1]?.prefix || 0) : 0;
    return rightSum - leftSum;
  };

  const renderSegmentTree = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!segmentTree) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    const drawNode = (node: SegmentTreeNode, x: number, y: number, width: number) => {
      const nodeKey = `${node.left}-${node.right}`;
      const isHighlighted = highlightedNodes.has(nodeKey);
      
      // Draw node
      ctx.fillStyle = isHighlighted ? '#fbbf24' : '#3b82f6';
      ctx.fillRect(x - 30, y - 15, 60, 30);
      
      // Draw text
      ctx.fillStyle = 'white';
      ctx.fillText(`${node.value}`, x, y - 5);
      ctx.fillText(`[${node.left},${node.right}]`, x, y + 8);
      
      // Draw children
      if (node.children) {
        const childWidth = width / 2;
        const leftX = x - childWidth / 2;
        const rightX = x + childWidth / 2;
        const childY = y + 60;
        
        // Draw lines
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y + 15);
        ctx.lineTo(leftX, childY - 15);
        ctx.moveTo(x, y + 15);
        ctx.lineTo(rightX, childY - 15);
        ctx.stroke();
        
        drawNode(node.children[0], leftX, childY, childWidth);
        drawNode(node.children[1], rightX, childY, childWidth);
      }
    };
    
    drawNode(segmentTree, canvas.width / 2, 50, canvas.width * 0.8);
  };

  const renderFenwickTree = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    const nodeWidth = 60;
    const startX = 50;
    
    fenwickTree.forEach((node, index) => {
      const x = startX + index * (nodeWidth + 10);
      const y = 100;
      
      // Draw original array
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(x - 25, y - 40, 50, 25);
      ctx.fillStyle = 'white';
      ctx.fillText(`${node.value}`, x, y - 27);
      ctx.fillText(`A[${index}]`, x, y - 15);
      
      // Draw Fenwick tree node
      ctx.fillStyle = '#10b981';
      ctx.fillRect(x - 25, y, 50, 25);
      ctx.fillStyle = 'white';
      ctx.fillText(`${node.prefix}`, x, y + 13);
      
      // Draw index
      ctx.fillStyle = '#6b7280';
      ctx.fillText(`${node.index}`, x, y + 35);
    });
    
    // Labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText('Original Array', 100, 30);
    ctx.fillText('Prefix Sums', 100, 50);
  };

  React.useEffect(() => {
    initializeStructures();
  }, [array]);

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Segment Trees & Fenwick Trees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={activeStructure} onValueChange={(value: 'segment' | 'fenwick') => setActiveStructure(value)}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="segment">Segment Tree</SelectItem>
                <SelectItem value="fenwick">Fenwick Tree</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={initializeStructures}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Rebuild
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white/70">Array:</span>
              <Input
                value={array.join(', ')}
                onChange={(e) => {
                  const newArray = e.target.value.split(',').map(n => parseInt(n.trim()) || 0);
                  setArray(newArray);
                }}
                className="w-48 bg-white/10 border-white/20 text-white"
                placeholder="1, 3, 5, 7, 9, 11"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white/70">Range Query:</span>
              <Input
                type="number"
                value={queryLeft}
                onChange={(e) => setQueryLeft(parseInt(e.target.value) || 0)}
                className="w-20 bg-white/10 border-white/20 text-white"
                min="0"
                max={array.length - 1}
              />
              <span className="text-white/70">to</span>
              <Input
                type="number"
                value={queryRight}
                onChange={(e) => setQueryRight(parseInt(e.target.value) || 0)}
                className="w-20 bg-white/10 border-white/20 text-white"
                min="0"
                max={array.length - 1}
              />
              <Button
                onClick={performRangeQuery}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Play className="w-4 h-4 mr-2" />
                Query
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-0">
          <Canvas
            width={800}
            height={400}
            onRender={activeStructure === 'segment' ? renderSegmentTree : renderFenwickTree}
            className="border border-white/20 rounded-lg"
          />
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">
            {activeStructure === 'segment' ? 'Segment Tree' : 'Fenwick Tree'} Properties
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white/80">
          {activeStructure === 'segment' ? (
            <div className="space-y-2">
              <p>• Range sum queries in O(log n) time</p>
              <p>• Point updates in O(log n) time</p>
              <p>• Space complexity: O(n)</p>
              <p>• Supports various operations (sum, min, max, etc.)</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p>• Prefix sum queries in O(log n) time</p>
              <p>• Point updates in O(log n) time</p>
              <p>• Space complexity: O(n)</p>
              <p>• More memory efficient than segment trees</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
