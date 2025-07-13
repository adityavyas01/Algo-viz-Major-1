
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RotateCcw } from 'lucide-react';
import { Canvas } from './Canvas';

interface SearchStep {
  array: number[];
  target: number;
  left: number;
  right: number;
  mid: number;
  found: boolean;
  step: number;
}

export const BinarySearchVisualization = () => {
  const [sortedArray] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]);
  const [target, setTarget] = useState('');
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const performBinarySearch = () => {
    if (!target.trim()) return;
    
    const targetNum = parseInt(target);
    const searchSteps: SearchStep[] = [];
    let left = 0;
    let right = sortedArray.length - 1;
    let step = 0;
    let found = false;

    while (left <= right && !found) {
      const mid = Math.floor((left + right) / 2);
      step++;

      searchSteps.push({
        array: [...sortedArray],
        target: targetNum,
        left,
        right,
        mid,
        found: sortedArray[mid] === targetNum,
        step
      });

      if (sortedArray[mid] === targetNum) {
        found = true;
      } else if (sortedArray[mid] < targetNum) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    if (!found) {
      searchSteps.push({
        array: [...sortedArray],
        target: targetNum,
        left,
        right,
        mid: -1,
        found: false,
        step: step + 1
      });
    }

    setSteps(searchSteps);
    setCurrentStep(0);
    setIsSearching(true);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setSteps([]);
    setCurrentStep(0);
    setIsSearching(false);
    setTarget('');
  };

  const renderBinarySearch = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const elementWidth = 50;
    const elementHeight = 40;
    const startY = 100;
    const spacing = 5;
    const totalWidth = sortedArray.length * (elementWidth + spacing) - spacing;
    const startX = (canvas.width - totalWidth) / 2;

    // Draw array elements
    sortedArray.forEach((value, index) => {
      const x = startX + index * (elementWidth + spacing);
      const y = startY;

      let fillColor = '#3b82f6';
      
      if (steps.length > 0 && currentStep < steps.length) {
        const step = steps[currentStep];
        
        if (index === step.mid && step.found) {
          fillColor = '#22c55e'; // Found
        } else if (index === step.mid) {
          fillColor = '#f59e0b'; // Current mid
        } else if (index >= step.left && index <= step.right) {
          fillColor = '#6366f1'; // Search range
        } else {
          fillColor = '#6b7280'; // Out of range
        }
      }

      ctx.fillStyle = fillColor;
      ctx.fillRect(x, y, elementWidth, elementHeight);

      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, elementWidth, elementHeight);

      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + elementWidth / 2, y + elementHeight / 2 + 5);

      // Draw index
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Arial';
      ctx.fillText(index.toString(), x + elementWidth / 2, y - 10);
    });

    // Draw pointers and labels
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      
      // Left pointer
      if (step.left >= 0 && step.left < sortedArray.length) {
        const leftX = startX + step.left * (elementWidth + spacing) + elementWidth / 2;
        ctx.fillStyle = '#ef4444';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('L', leftX, startY - 25);
      }

      // Right pointer
      if (step.right >= 0 && step.right < sortedArray.length) {
        const rightX = startX + step.right * (elementWidth + spacing) + elementWidth / 2;
        ctx.fillStyle = '#ef4444';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('R', rightX, startY - 25);
      }

      // Mid pointer
      if (step.mid >= 0 && step.mid < sortedArray.length) {
        const midX = startX + step.mid * (elementWidth + spacing) + elementWidth / 2;
        ctx.fillStyle = '#f59e0b';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('M', midX, startY + elementHeight + 20);
      }

      // Status text
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      const statusText = step.found 
        ? `Found ${step.target} at index ${step.mid}!`
        : step.mid === -1 
        ? `${step.target} not found in array`
        : `Searching for ${step.target}... Step ${step.step}`;
      ctx.fillText(statusText, canvas.width / 2, 50);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Target value"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-32"
          />
          <Button 
            onClick={performBinarySearch} 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!target.trim() || isSearching}
          >
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>

        {isSearching && (
          <div className="flex items-center gap-2">
            <Button 
              onClick={prevStep} 
              size="sm" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={nextStep} 
              size="sm" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              disabled={currentStep >= steps.length - 1}
            >
              Next
            </Button>
          </div>
        )}

        <Button 
          onClick={reset} 
          size="sm" 
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {isSearching && (
        <div className="flex gap-6 text-white">
          <div className="bg-white/10 rounded-lg px-4 py-2">
            <span className="text-white/70">Step:</span>
            <span className="ml-2 font-semibold">{currentStep + 1} / {steps.length}</span>
          </div>
          <div className="bg-white/10 rounded-lg px-4 py-2">
            <span className="text-white/70">Target:</span>
            <span className="ml-2 font-semibold">{steps[currentStep]?.target}</span>
          </div>
          <div className="bg-white/10 rounded-lg px-4 py-2">
            <span className="text-white/70">Range:</span>
            <span className="ml-2 font-semibold">
              [{steps[currentStep]?.left} - {steps[currentStep]?.right}]
            </span>
          </div>
        </div>
      )}

      <div className="bg-white/5 rounded-lg p-4">
        <Canvas
          width={700}
          height={200}
          onRender={renderBinarySearch}
          className="border border-white/20 rounded mx-auto"
        />
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Default</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-indigo-500 rounded"></div>
          <span>Search Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Current Mid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Found</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-500 rounded"></div>
          <span>Out of Range</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">How Binary Search Works</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Only works on sorted arrays</p>
          <p>• Compare target with middle element</p>
          <p>• Eliminate half of the search space each iteration</p>
          <p>• Time Complexity: O(log n) | Space: O(1)</p>
        </div>
      </div>
    </div>
  );
};
