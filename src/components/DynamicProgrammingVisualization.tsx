
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Canvas } from './Canvas';
import { useAnimation } from '@/hooks/useAnimation';

interface DPStep {
  algorithm: string;
  description: string;
  table?: number[][];
  current?: { row: number; col: number };
  result?: number;
  comparison?: string;
}

interface KnapsackItem {
  weight: number;
  value: number;
  name: string;
}

export const DynamicProgrammingVisualization = () => {
  const [algorithm, setAlgorithm] = useState<'fibonacci' | 'knapsack'>('fibonacci');
  const [fibInput, setFibInput] = useState('10');
  const [knapsackCapacity, setKnapsackCapacity] = useState('10');
  const [steps, setSteps] = useState<DPStep[]>([]);
  const [dpTable, setDpTable] = useState<number[][]>([]);
  const [knapsackItems, setKnapsackItems] = useState<KnapsackItem[]>([
    { weight: 2, value: 3, name: 'A' },
    { weight: 3, value: 4, name: 'B' },
    { weight: 4, value: 5, name: 'C' },
    { weight: 5, value: 6, name: 'D' }
  ]);

  const animation = useAnimation(steps.length, 300);

  const fibonacciDP = (n: number): DPStep[] => {
    const steps: DPStep[] = [];
    const dp = new Array(n + 1).fill(0);
    
    if (n >= 0) dp[0] = 0;
    if (n >= 1) dp[1] = 1;

    steps.push({
      algorithm: 'Fibonacci DP',
      description: 'Initialize: F(0) = 0, F(1) = 1',
      table: [dp.slice()],
      current: { row: 0, col: 1 }
    });

    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
      
      steps.push({
        algorithm: 'Fibonacci DP',
        description: `F(${i}) = F(${i-1}) + F(${i-2}) = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`,
        table: [dp.slice()],
        current: { row: 0, col: i },
        comparison: `${dp[i-1]} + ${dp[i-2]}`
      });
    }

    steps.push({
      algorithm: 'Fibonacci DP',
      description: `Result: F(${n}) = ${dp[n]}`,
      table: [dp.slice()],
      result: dp[n]
    });

    return steps;
  };

  const knapsackDP = (capacity: number, items: KnapsackItem[]): DPStep[] => {
    const steps: DPStep[] = [];
    const n = items.length;
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

    // Initialize
    steps.push({
      algorithm: 'Knapsack DP',
      description: 'Initialize DP table with base cases (0 items or 0 capacity = 0 value)',
      table: dp.map(row => [...row])
    });

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= capacity; w++) {
        const item = items[i - 1];
        
        if (item.weight <= w) {
          const includeItem = dp[i - 1][w - item.weight] + item.value;
          const excludeItem = dp[i - 1][w];
          
          dp[i][w] = Math.max(includeItem, excludeItem);
          
          steps.push({
            algorithm: 'Knapsack DP',
            description: `Item ${item.name} (w:${item.weight}, v:${item.value}), Capacity:${w}`,
            table: dp.map(row => [...row]),
            current: { row: i, col: w },
            comparison: `max(include: ${includeItem}, exclude: ${excludeItem}) = ${dp[i][w]}`
          });
        } else {
          dp[i][w] = dp[i - 1][w];
          
          steps.push({
            algorithm: 'Knapsack DP',
            description: `Item ${item.name} too heavy (${item.weight} > ${w}), skip`,
            table: dp.map(row => [...row]),
            current: { row: i, col: w },
            comparison: `Copy from above: ${dp[i][w]}`
          });
        }
      }
    }

    steps.push({
      algorithm: 'Knapsack DP',
      description: `Maximum value: ${dp[n][capacity]}`,
      table: dp.map(row => [...row]),
      result: dp[n][capacity]
    });

    return steps;
  };

  const runFibonacci = () => {
    const n = parseInt(fibInput);
    if (!isNaN(n) && n >= 0 && n <= 20) {
      const fibSteps = fibonacciDP(n);
      setSteps(fibSteps);
      setDpTable(fibSteps[fibSteps.length - 1].table || []);
      animation.reset();
    }
  };

  const runKnapsack = () => {
    const capacity = parseInt(knapsackCapacity);
    if (!isNaN(capacity) && capacity > 0) {
      const knapsackSteps = knapsackDP(capacity, knapsackItems);
      setSteps(knapsackSteps);
      setDpTable(knapsackSteps[knapsackSteps.length - 1].table || []);
      animation.reset();
    }
  };

  const renderVisualization = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const currentStep = steps[animation.currentStep];
    if (!currentStep || !currentStep.table) return;

    const table = currentStep.table;
    const cellSize = algorithm === 'fibonacci' ? 40 : 35;
    const startX = 50;
    const startY = 80;

    if (algorithm === 'fibonacci') {
      // Draw Fibonacci sequence
      const fibSequence = table[0];
      
      for (let i = 0; i < fibSequence.length; i++) {
        const x = startX + i * cellSize;
        const y = startY;
        
        // Highlight current cell
        const isCurrent = currentStep.current?.col === i;
        
        ctx.fillStyle = isCurrent ? '#ef4444' : '#3b82f6';
        ctx.fillRect(x, y, cellSize - 2, cellSize - 2);
        
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cellSize - 2, cellSize - 2);
        
        // Draw value
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(fibSequence[i].toString(), x + cellSize/2 - 1, y + cellSize/2 - 1);
        
        // Draw index
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Arial';
        ctx.fillText(`F(${i})`, x + cellSize/2 - 1, y - 10);
      }
    } else {
      // Draw Knapsack DP table
      for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
          const x = startX + j * cellSize;
          const y = startY + i * cellSize;
          
          // Highlight current cell
          const isCurrent = currentStep.current?.row === i && currentStep.current?.col === j;
          
          ctx.fillStyle = isCurrent ? '#ef4444' : 
                         i === 0 || j === 0 ? '#64748b' : '#3b82f6';
          ctx.fillRect(x, y, cellSize - 2, cellSize - 2);
          
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, cellSize - 2, cellSize - 2);
          
          // Draw value
          ctx.fillStyle = 'white';
          ctx.font = 'bold 10px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(table[i][j].toString(), x + cellSize/2 - 1, y + cellSize/2 - 1);
        }
      }
      
      // Draw row headers (items)
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      for (let i = 0; i < table.length; i++) {
        const label = i === 0 ? '∅' : knapsackItems[i - 1].name;
        ctx.fillText(label, startX - 10, startY + i * cellSize + cellSize/2);
      }
      
      // Draw column headers (capacity)
      ctx.textAlign = 'center';
      for (let j = 0; j < table[0].length; j++) {
        ctx.fillText(j.toString(), startX + j * cellSize + cellSize/2, startY - 10);
      }
      
      // Draw labels
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Items', 10, startY + table.length * cellSize / 2);
      
      ctx.textAlign = 'center';
      ctx.fillText('Capacity', startX + table[0].length * cellSize / 2, startY - 25);
    }

    // Draw algorithm info
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(currentStep.algorithm, 20, 30);
    
    ctx.font = '12px Arial';
    ctx.fillText(currentStep.description, 20, 50);
    
    if (currentStep.comparison) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(currentStep.comparison, 20, 350);
    }
    
    if (currentStep.result !== undefined) {
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(`Final Result: ${currentStep.result}`, 20, 370);
    }
  }, [steps, animation.currentStep, algorithm, knapsackItems]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => setAlgorithm('fibonacci')}
            variant={algorithm === 'fibonacci' ? 'default' : 'outline'}
            className={algorithm === 'fibonacci' 
              ? 'bg-white text-black' 
              : 'border-white/30 text-white hover:bg-white/10'
            }
          >
            Fibonacci
          </Button>
          <Button 
            onClick={() => setAlgorithm('knapsack')}
            variant={algorithm === 'knapsack' ? 'default' : 'outline'}
            className={algorithm === 'knapsack' 
              ? 'bg-white text-black' 
              : 'border-white/30 text-white hover:bg-white/10'
            }
          >
            Knapsack
          </Button>
        </div>
        
        {algorithm === 'fibonacci' ? (
          <div className="flex items-center gap-2">
            <Input
              value={fibInput}
              onChange={(e) => setFibInput(e.target.value)}
              placeholder="Enter n (0-20)"
              className="w-32 bg-white/10 border-white/30 text-white placeholder:text-white/50"
            />
            <Button 
              onClick={runFibonacci}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Calculate F(n)
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              value={knapsackCapacity}
              onChange={(e) => setKnapsackCapacity(e.target.value)}
              placeholder="Capacity"
              className="w-32 bg-white/10 border-white/30 text-white placeholder:text-white/50"
            />
            <Button 
              onClick={runKnapsack}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Solve Knapsack
            </Button>
          </div>
        )}
      </div>

      {algorithm === 'knapsack' && (
        <div className="bg-white/10 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2">Items:</h4>
          <div className="flex flex-wrap gap-2">
            {knapsackItems.map((item, index) => (
              <div key={index} className="bg-blue-600 px-3 py-1 rounded text-white text-sm">
                {item.name}: w={item.weight}, v={item.value}
              </div>
            ))}
          </div>
        </div>
      )}

      {steps.length > 0 && (
        <div className="flex items-center gap-4">
          <Button 
            onClick={animation.isPlaying ? animation.pause : animation.play}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            {animation.isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button 
            onClick={animation.stepBackward}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
            disabled={animation.currentStep <= 0}
          >
            Previous
          </Button>
          <Button 
            onClick={animation.stepForward}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
            disabled={animation.currentStep >= steps.length - 1}
          >
            Next
          </Button>
          <Button 
            onClick={animation.reset}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            Reset
          </Button>
          <div className="text-white">
            Step: {animation.currentStep + 1} / {steps.length}
          </div>
        </div>
      )}

      <Canvas
        width={700}
        height={400}
        onRender={renderVisualization}
        className="border border-white/20 rounded-lg bg-white/5"
      />

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Dynamic Programming Concepts</h3>
        <div className="space-y-2 text-sm text-white/80">
          {algorithm === 'fibonacci' ? (
            <>
              <p><strong>Fibonacci DP:</strong> Bottom-up approach storing previous results</p>
              <p>• Recurrence: F(n) = F(n-1) + F(n-2)</p>
              <p>• Time: O(n), Space: O(n) → can be optimized to O(1) space</p>
              <p>• Eliminates exponential recalculation of naive recursion</p>
            </>
          ) : (
            <>
              <p><strong>0/1 Knapsack:</strong> Maximize value within weight capacity</p>
              <p>• Each item can be included once or not at all</p>
              <p>• DP[i][w] = max value using first i items with capacity w</p>
              <p>• Time: O(n×W), Space: O(n×W) where n=items, W=capacity</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
