
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { ArrayVisualization } from './ArrayVisualization';
import { useAnimation } from '@/hooks/useAnimation';

interface SelectionSortStep {
  array: number[];
  currentIndex: number;
  minIndex: number;
  comparing: number;
  swapping: boolean;
  comparisons: number;
  swaps: number;
}

export const SelectionSortVisualization = () => {
  const [originalArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 76, 50]);
  const [steps, setSteps] = useState<SelectionSortStep[]>([]);
  const [speed, setSpeed] = useState([300]);

  const animation = useAnimation(steps.length, speed[0]);

  // Generate selection sort steps
  useEffect(() => {
    const generateSteps = () => {
      const arr = [...originalArray];
      const sortSteps: SelectionSortStep[] = [];
      let comparisons = 0;
      let swaps = 0;

      // Initial state
      sortSteps.push({
        array: [...arr],
        currentIndex: -1,
        minIndex: -1,
        comparing: -1,
        swapping: false,
        comparisons,
        swaps
      });

      for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        
        // Show current position
        sortSteps.push({
          array: [...arr],
          currentIndex: i,
          minIndex: minIdx,
          comparing: -1,
          swapping: false,
          comparisons,
          swaps
        });

        for (let j = i + 1; j < arr.length; j++) {
          comparisons++;
          
          // Show comparison
          sortSteps.push({
            array: [...arr],
            currentIndex: i,
            minIndex: minIdx,
            comparing: j,
            swapping: false,
            comparisons,
            swaps
          });

          if (arr[j] < arr[minIdx]) {
            minIdx = j;
            
            // Show new minimum
            sortSteps.push({
              array: [...arr],
              currentIndex: i,
              minIndex: minIdx,
              comparing: j,
              swapping: false,
              comparisons,
              swaps
            });
          }
        }

        // Perform swap if needed
        if (minIdx !== i) {
          swaps++;
          
          // Show swapping
          sortSteps.push({
            array: [...arr],
            currentIndex: i,
            minIndex: minIdx,
            comparing: -1,
            swapping: true,
            comparisons,
            swaps
          });

          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
          
          // Show after swap
          sortSteps.push({
            array: [...arr],
            currentIndex: i,
            minIndex: -1,
            comparing: -1,
            swapping: false,
            comparisons,
            swaps
          });
        }
      }

      // Final sorted state
      sortSteps.push({
        array: [...arr],
        currentIndex: -1,
        minIndex: -1,
        comparing: -1,
        swapping: false,
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
      isHighlighted: index === currentStep.comparing,
      isSelected: currentStep.swapping && (index === currentStep.currentIndex || index === currentStep.minIndex),
      color: index === currentStep.minIndex ? '#22c55e' : 
             index <= currentStep.currentIndex && currentStep.currentIndex >= 0 ? '#10b981' : '#3b82f6'
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
        title="Selection Sort"
        width={700}
        height={120}
      />

      <div className="flex flex-wrap gap-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Current Minimum</span>
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
        <h3 className="text-lg font-semibold mb-3">How Selection Sort Works</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Find the minimum element in the unsorted portion</p>
          <p>• Swap it with the first element of the unsorted portion</p>
          <p>• Move the boundary of the sorted portion one position right</p>
          <p>• Time Complexity: O(n²) | Space Complexity: O(1)</p>
        </div>
      </div>
    </div>
  );
};
