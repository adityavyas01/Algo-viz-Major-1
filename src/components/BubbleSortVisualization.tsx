
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { ArrayVisualization } from './ArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';

interface BubbleSortStep {
  array: number[];
  comparing: [number, number] | null;
  swapping: boolean;
  sorted: boolean[];
  comparisons: number;
  swaps: number;
}

export const BubbleSortVisualization = () => {
  const [originalArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [steps, setSteps] = useState<BubbleSortStep[]>([]);
  const [speed, setSpeed] = useState([300]);

  const animation = useAnimation(steps.length, speed[0]);

  // Generate bubble sort steps
  useEffect(() => {
    const generateSteps = () => {
      const arr = [...originalArray];
      const sortSteps: BubbleSortStep[] = [];
      const sorted = Array(arr.length).fill(false);
      let comparisons = 0;
      let swaps = 0;

      // Initial state
      sortSteps.push({
        array: [...arr],
        comparing: null,
        swapping: false,
        sorted: [...sorted],
        comparisons,
        swaps
      });

      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          comparisons++;
          
          // Show comparison
          sortSteps.push({
            array: [...arr],
            comparing: [j, j + 1] as [number, number],
            swapping: false,
            sorted: [...sorted],
            comparisons,
            swaps
          });

          if (arr[j] > arr[j + 1]) {
            swaps++;
            
            // Show swapping
            sortSteps.push({
              array: [...arr],
              comparing: [j, j + 1] as [number, number],
              swapping: true,
              sorted: [...sorted],
              comparisons,
              swaps
            });

            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            
            // Show after swap
            sortSteps.push({
              array: [...arr],
              comparing: null,
              swapping: false,
              sorted: [...sorted],
              comparisons,
              swaps
            });
          }
        }
        sorted[arr.length - 1 - i] = true;
      }

      sorted[0] = true;

      // Final sorted state
      sortSteps.push({
        array: [...arr],
        comparing: null,
        swapping: false,
        sorted: [...sorted],
        comparisons,
        swaps
      });

      setSteps(sortSteps);
    };

    generateSteps();
  }, [originalArray]);

  useEffect(() => {
    animation.setSpeed(speed[0]);
  }, [speed, animation]);

  const currentStep = steps[animation.currentStep] || steps[0];

  const getArrayData = () => {
    if (!currentStep) return [];
    
    return currentStep.array.map((value, index) => ({
      value,
      isHighlighted: currentStep.comparing?.includes(index) || false,
      isSelected: currentStep.swapping && currentStep.comparing?.includes(index) || false,
      color: currentStep.sorted[index] ? '#10b981' : '#3b82f6'
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
        title="Bubble Sort"
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
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Swapping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 rounded"></div>
          <span>Sorted</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">How Bubble Sort Works</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Compare adjacent elements and swap if they're in wrong order</p>
          <p>• Continue through the array until no swaps are needed</p>
          <p>• Largest elements "bubble up" to the end</p>
          <p>• Time Complexity: O(n²) | Space Complexity: O(1)</p>
        </div>
      </div>
    </div>
  );
};
