
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Canvas } from './Canvas';

interface HeapNode {
  value: number;
  index: number;
  x: number;
  y: number;
  isHighlighted?: boolean;
  isComparing?: boolean;
  isSwapping?: boolean;
}

export const HeapVisualization = () => {
  const [heap, setHeap] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [heapType, setHeapType] = useState<'max' | 'min'>('max');
  const [lastOperation, setLastOperation] = useState('');
  const [animationState, setAnimationState] = useState<{
    comparing: number[];
    swapping: number[];
  }>({ comparing: [], swapping: [] });

  const getParentIndex = (index: number): number => Math.floor((index - 1) / 2);
  const getLeftChildIndex = (index: number): number => 2 * index + 1;
  const getRightChildIndex = (index: number): number => 2 * index + 2;

  const heapifyUp = (arr: number[], index: number): number[] => {
    const newArr = [...arr];
    let currentIndex = index;

    while (currentIndex > 0) {
      const parentIndex = getParentIndex(currentIndex);
      const shouldSwap = heapType === 'max' 
        ? newArr[currentIndex] > newArr[parentIndex]
        : newArr[currentIndex] < newArr[parentIndex];

      if (!shouldSwap) break;

      // Swap
      [newArr[currentIndex], newArr[parentIndex]] = [newArr[parentIndex], newArr[currentIndex]];
      currentIndex = parentIndex;
    }

    return newArr;
  };

  const heapifyDown = (arr: number[], startIndex: number = 0): number[] => {
    const newArr = [...arr];
    let currentIndex = startIndex;

    while (true) {
      let targetIndex = currentIndex;
      const leftChild = getLeftChildIndex(currentIndex);
      const rightChild = getRightChildIndex(currentIndex);

      // Compare with left child
      if (leftChild < newArr.length) {
        const shouldSwapLeft = heapType === 'max'
          ? newArr[leftChild] > newArr[targetIndex]
          : newArr[leftChild] < newArr[targetIndex];
        if (shouldSwapLeft) targetIndex = leftChild;
      }

      // Compare with right child
      if (rightChild < newArr.length) {
        const shouldSwapRight = heapType === 'max'
          ? newArr[rightChild] > newArr[targetIndex]
          : newArr[rightChild] < newArr[targetIndex];
        if (shouldSwapRight) targetIndex = rightChild;
      }

      if (targetIndex === currentIndex) break;

      // Swap
      [newArr[currentIndex], newArr[targetIndex]] = [newArr[targetIndex], newArr[currentIndex]];
      currentIndex = targetIndex;
    }

    return newArr;
  };

  const insert = (value: number) => {
    const newHeap = [...heap, value];
    const heapified = heapifyUp(newHeap, newHeap.length - 1);
    setHeap(heapified);
    setLastOperation(`Inserted ${value}`);
  };

  const extractRoot = () => {
    if (heap.length === 0) return;
    
    if (heap.length === 1) {
      setHeap([]);
      setLastOperation(`Extracted ${heap[0]}`);
      return;
    }

    const root = heap[0];
    const newHeap = [heap[heap.length - 1], ...heap.slice(1, -1)];
    const heapified = heapifyDown(newHeap, 0);
    setHeap(heapified);
    setLastOperation(`Extracted ${root}`);
  };

  const buildHeap = (arr: number[]) => {
    let newHeap = [...arr];
    // Start from the last parent node and heapify down
    for (let i = Math.floor(newHeap.length / 2) - 1; i >= 0; i--) {
      newHeap = heapifyDown(newHeap, i);
    }
    setHeap(newHeap);
    setLastOperation('Built heap from array');
  };

  const calculatePositions = (): HeapNode[] => {
    return heap.map((value, index) => {
      const level = Math.floor(Math.log2(index + 1));
      const positionInLevel = index - (Math.pow(2, level) - 1);
      const totalInLevel = Math.pow(2, level);
      
      const x = 350 + (positionInLevel - totalInLevel / 2 + 0.5) * (400 / totalInLevel);
      const y = 50 + level * 70;

      return {
        value,
        index,
        x,
        y,
        isHighlighted: index === heap.length - 1,
        isComparing: animationState.comparing.includes(index),
        isSwapping: animationState.swapping.includes(index)
      };
    });
  };

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      insert(value);
      setInputValue('');
    }
  };

  const handleBuildHeap = () => {
    const values = inputValue.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
    if (values.length > 0) {
      buildHeap(values);
      setInputValue('');
    }
  };

  const handleClear = () => {
    setHeap([]);
    setLastOperation('Heap cleared');
  };

  const renderHeap = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const nodes = calculatePositions();
    
    // Draw connections first
    nodes.forEach(node => {
      const leftChildIndex = getLeftChildIndex(node.index);
      const rightChildIndex = getRightChildIndex(node.index);
      
      const leftChild = nodes.find(n => n.index === leftChildIndex);
      const rightChild = nodes.find(n => n.index === rightChildIndex);

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;

      if (leftChild) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(leftChild.x, leftChild.y);
        ctx.stroke();
      }

      if (rightChild) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(rightChild.x, rightChild.y);
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      // Determine node color
      let fillColor = '#3b82f6';
      if (node.index === 0) fillColor = '#22c55e'; // Root
      else if (node.isHighlighted) fillColor = '#ef4444'; // Recently inserted
      else if (node.isComparing) fillColor = '#f59e0b'; // Being compared
      else if (node.isSwapping) fillColor = '#8b5cf6'; // Being swapped

      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
      ctx.fill();

      // Draw border
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw value
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.value.toString(), node.x, node.y);

      // Draw index
      ctx.fillStyle = '#64748b';
      ctx.font = '10px Arial';
      ctx.fillText(node.index.toString(), node.x, node.y + 35);
    });

    // Draw heap property indication
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${heapType.toUpperCase()} HEAP`, 20, 30);
  }, [heap, heapType, animationState]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value or comma-separated values"
            className="w-64 bg-white/10 border-white/30 text-white placeholder:text-white/50"
            onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
          />
          <Button 
            onClick={handleInsert}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Insert
          </Button>
          <Button 
            onClick={handleBuildHeap}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Build Heap
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={extractRoot}
            className="bg-orange-600 hover:bg-orange-700 text-white"
            disabled={heap.length === 0}
          >
            Extract Root
          </Button>
          <Button 
            onClick={() => setHeapType(heapType === 'max' ? 'min' : 'max')}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            {heapType === 'max' ? 'Max' : 'Min'} Heap
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
        onRender={renderHeap}
        className="border border-white/20 rounded-lg bg-white/5"
      />

      <div className="flex flex-wrap gap-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Root</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Normal Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Recently Added</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>Comparing</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Heap Properties</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Complete binary tree stored in array</p>
          <p>• Max Heap: Parent ≥ Children | Min Heap: Parent ≤ Children</p>
          <p>• Insert: Add to end, heapify up - O(log n)</p>
          <p>• Extract: Remove root, move last to root, heapify down - O(log n)</p>
          <p>• Used in priority queues, heap sort</p>
        </div>
      </div>
    </div>
  );
};
