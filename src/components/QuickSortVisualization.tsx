
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { ArrayVisualization } from './ArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';

interface QuickSortStep {
  array: number[];
  pivotIndex: number;
  lowIndex: number;
  highIndex: number;
  comparing: number[];
  swapping: number[];
  partitioned: number[];
  comparisons: number;
  swaps: number;
}

export const QuickSortVisualization = () => {
  const [originalArray] = useState([64, 34, 25, 12, 22, 11, 90, 88]);
  const [steps, setSteps] = useState<QuickSortStep[]>([]);
  const [speed, setSpeed] = useState([300]);

  const animation = useAnimation(steps.length, speed[0]);

  const generateSteps = () => {
    const arr = [...originalArray];
    const sortSteps: QuickSortStep[] = [];
    let comparisons = 0;
    let swaps = 0;

    const quickSort = (array: number[], low: number, high: number) => {
      if (low < high) {
        const pi = partition(array, low, high);
        quickSort(array, low, pi - 1);
        quickSort(array, pi + 1, high);
      }
    };

    const partition = (array: number[], low: number, high: number): number => {
      const pivot = array[high];
      let i = low - 1;

      // Show initial state
      sortSteps.push({
        array: [...array],
        pivotIndex: high,
        lowIndex: low,
        highIndex: high,
        comparing: [],
        swapping: [],
        partitioned: [],
        comparisons,
        swaps
      });

      for (let j = low; j < high; j++) {
        comparisons++;
        
        // Show comparison
        sortSteps.push({
          array: [...array],
          pivotIndex: high,
          lowIndex: low,
          highIndex: high,
          comparing: [j, high],
          swapping: [],
          partitioned: [],
          comparisons,
          swaps
        });

        if (array[j] < pivot) {
          i++;
          if (i !== j) {
            swaps++;
            
            // Show swapping
            sortSteps.push({
              array: [...array],
              pivotIndex: high,
              lowIndex: low,
              highIndex: high,
              comparing: [],
              swapping: [i, j],
              partitioned: [],
              comparisons,
              swaps
            });

            [array[i], array[j]] = [array[j], array[i]];
          }
        }
      }

      // Final pivot placement
      if (i + 1 !== high) {
        swaps++;
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
      }

      sortSteps.push({
        array: [...array],
        pivotIndex: i + 1,
        lowIndex: low,
        highIndex: high,
        comparing: [],
        swapping: [],
        partitioned: [i + 1],
        comparisons,
        swaps
      });

      return i + 1;
    };

    quickSort(arr, 0, arr.length - 1);
    setSteps(sortSteps);
  };

  useEffect(() => {
    generateSteps();
  }, []);

  useEffect(() => {
    animation.setSpeed(speed[0]);
  }, [speed, animation]);

  const currentStep = steps[animation.currentStep] || steps[0];

  const getArrayData = () => {
    if (!currentStep) return [];
    
    return currentStep.array.map((value, index) => ({
      value,
      isHighlighted: currentStep.comparing.includes(index),
      isSelected: currentStep.swapping.includes(index),
      color: currentStep.partitioned.includes(index) ? '#22c55e' :
             index === currentStep.pivotIndex ? '#f59e0b' :
             '#3b82f6'
    }));
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
          <span className="text-white/70">Comparisons:</span>
          <span className="ml-2 font-semibold">{currentStep?.comparisons || 0}</span>
        </div>
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Swaps:</span>
          <span className="ml-2 font-semibold">{currentStep?.swaps || 0}</span>
        </div>
      </div>

      <ArrayVisualization 
        data={getArrayData()} 
        title="Quick Sort"
        width={700}
        height={120}
      />

      <div className="flex flex-wrap gap-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Pivot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Partitioned</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">How Quick Sort Works</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Choose a pivot element (usually the last element)</p>
          <p>• Partition the array so elements smaller than pivot are on the left</p>
          <p>• Recursively sort the left and right subarrays</p>
          <p>• Average Time: O(n log n) | Worst Case: O(n²) | Space: O(log n)</p>
        </div>
      </div>
    </div>
  );
};
