
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { Canvas } from './Canvas';
import { useAnimation } from '@/hooks/useAnimation';

interface MergeSortStep {
  array: number[];
  leftArray: number[];
  rightArray: number[];
  merging: boolean;
  leftIndex: number;
  rightIndex: number;
  merged: number[];
  level: number;
  comparisons: number;
}

export const MergeSortVisualization = () => {
  const [originalArray] = useState([38, 27, 43, 3, 9, 82, 10]);
  const [steps, setSteps] = useState<MergeSortStep[]>([]);
  const [speed, setSpeed] = useState([300]);

  const animation = useAnimation(steps.length, speed[0]);

  const generateSteps = () => {
    const sortSteps: MergeSortStep[] = [];
    let comparisons = 0;

    const mergeSort = (arr: number[], level: number = 0): number[] => {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);

      sortSteps.push({
        array: [...arr],
        leftArray: [...left],
        rightArray: [...right],
        merging: false,
        leftIndex: -1,
        rightIndex: -1,
        merged: [],
        level,
        comparisons
      });

      const sortedLeft = mergeSort(left, level + 1);
      const sortedRight = mergeSort(right, level + 1);

      return merge(sortedLeft, sortedRight, level);
    };

    const merge = (left: number[], right: number[], level: number): number[] => {
      const result: number[] = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        comparisons++;
        
        sortSteps.push({
          array: [...left, ...right],
          leftArray: [...left],
          rightArray: [...right],
          merging: true,
          leftIndex,
          rightIndex,
          merged: [...result],
          level,
          comparisons
        });

        if (left[leftIndex] <= right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }

      while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
      }

      while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
      }

      sortSteps.push({
        array: [...result],
        leftArray: [...left],
        rightArray: [...right],
        merging: false,
        leftIndex: -1,
        rightIndex: -1,
        merged: [...result],
        level,
        comparisons
      });

      return result;
    };

    mergeSort([...originalArray]);
    setSteps(sortSteps);
  };

  useEffect(() => {
    generateSteps();
  }, []);

  useEffect(() => {
    animation.setSpeed(speed[0]);
  }, [speed, animation]);

  const currentStep = steps[animation.currentStep] || steps[0];

  const renderMergeSort = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!currentStep) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const elementWidth = 60;
    const elementHeight = 40;
    const startY = 50;
    const spacing = 10;

    // Draw left array
    if (currentStep.leftArray.length > 0) {
      ctx.fillStyle = '#3b82f6';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Left Array', 150, 30);

      currentStep.leftArray.forEach((value, index) => {
        const x = 50 + index * (elementWidth + spacing);
        const y = startY;

        ctx.fillStyle = index === currentStep.leftIndex ? '#ef4444' : '#3b82f6';
        ctx.fillRect(x, y, elementWidth, elementHeight);
        
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, elementWidth, elementHeight);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(value.toString(), x + elementWidth / 2, y + elementHeight / 2 + 5);
      });
    }

    // Draw right array
    if (currentStep.rightArray.length > 0) {
      ctx.fillStyle = '#10b981';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Right Array', 450, 30);

      currentStep.rightArray.forEach((value, index) => {
        const x = 350 + index * (elementWidth + spacing);
        const y = startY;

        ctx.fillStyle = index === currentStep.rightIndex ? '#ef4444' : '#10b981';
        ctx.fillRect(x, y, elementWidth, elementHeight);
        
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, elementWidth, elementHeight);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(value.toString(), x + elementWidth / 2, y + elementHeight / 2 + 5);
      });
    }

    // Draw merged array
    if (currentStep.merged.length > 0) {
      ctx.fillStyle = '#f59e0b';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Merged Result', 300, 150);

      currentStep.merged.forEach((value, index) => {
        const x = 150 + index * (elementWidth + spacing);
        const y = 170;

        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(x, y, elementWidth, elementHeight);
        
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, elementWidth, elementHeight);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(value.toString(), x + elementWidth / 2, y + elementHeight / 2 + 5);
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Button 
            onClick={animation.isPlaying ? animation.pause : animation.play}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
            disabled={animation.currentStep >= steps.length - 1}
          >
            {animation.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button 
            onClick={animation.stepBackward}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
            disabled={animation.currentStep <= 0}
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button 
            onClick={animation.stepForward}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
            disabled={animation.currentStep >= steps.length - 1}
          >
            <SkipForward className="w-4 h-4" />
          </Button>
          <Button 
            onClick={animation.reset}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4 text-white">
          <div className="text-sm">
            <span className="text-white/70">Speed:</span>
            <div className="w-20 ml-2 inline-block">
              <Slider
                value={speed}
                onValueChange={setSpeed}
                max={800}
                min={100}
                step={50}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 text-white">
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Step:</span>
          <span className="ml-2 font-semibold">{animation.currentStep + 1} / {steps.length}</span>
        </div>
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Level:</span>
          <span className="ml-2 font-semibold">{currentStep?.level || 0}</span>
        </div>
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Comparisons:</span>
          <span className="ml-2 font-semibold">{currentStep?.comparisons || 0}</span>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4">
        <Canvas
          width={600}
          height={250}
          onRender={renderMergeSort}
          className="border border-white/20 rounded mx-auto"
        />
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">How Merge Sort Works</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Divide the array into two halves recursively</p>
          <p>• Sort each half independently</p>
          <p>• Merge the sorted halves back together</p>
          <p>• Time Complexity: O(n log n) | Space: O(n)</p>
        </div>
      </div>
    </div>
  );
};
