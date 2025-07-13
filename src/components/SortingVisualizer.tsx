
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface ArrayElement {
  value: number;
  isComparing: boolean;
  isSwapping: boolean;
  isSorted: boolean;
}

export const SortingVisualizer = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([300]);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  // Initialize array
  const generateRandomArray = useCallback(() => {
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < 12; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 180) + 20,
        isComparing: false,
        isSwapping: false,
        isSorted: false
      });
    }
    setArray(newArray);
    setCurrentStep(0);
    setComparisons(0);
    setSwaps(0);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);

  // Bubble sort algorithm with visualization
  const bubbleSort = useCallback(async () => {
    const arr = [...array];
    const n = arr.length;
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isPlaying) return;

        // Highlight comparison
        arr[j].isComparing = true;
        arr[j + 1].isComparing = true;
        setArray([...arr]);
        compCount++;
        setComparisons(compCount);

        await new Promise(resolve => setTimeout(resolve, 600 - speed[0]));

        if (arr[j].value > arr[j + 1].value) {
          // Highlight swap
          arr[j].isSwapping = true;
          arr[j + 1].isSwapping = true;
          setArray([...arr]);

          await new Promise(resolve => setTimeout(resolve, 300));

          // Perform swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapCount++;
          setSwaps(swapCount);
        }

        // Reset highlighting
        arr[j].isComparing = false;
        arr[j + 1].isComparing = false;
        arr[j].isSwapping = false;
        arr[j + 1].isSwapping = false;
        setArray([...arr]);

        await new Promise(resolve => setTimeout(resolve, 200));
      }
      // Mark element as sorted
      arr[n - 1 - i].isSorted = true;
      setArray([...arr]);
    }

    // Mark first element as sorted
    if (arr.length > 0) {
      arr[0].isSorted = true;
      setArray([...arr]);
    }

    setIsPlaying(false);
  }, [array, isPlaying, speed]);

  useEffect(() => {
    if (isPlaying) {
      bubbleSort();
    }
  }, [isPlaying, bubbleSort]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setArray(prev => prev.map(el => ({
      ...el,
      isComparing: false,
      isSwapping: false,
      isSorted: false
    })));
    setCurrentStep(0);
    setComparisons(0);
    setSwaps(0);
  };

  const getBarColor = (element: ArrayElement) => {
    if (element.isSorted) return 'bg-green-500';
    if (element.isSwapping) return 'bg-red-500';
    if (element.isComparing) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Button 
            onClick={handlePlay} 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
            disabled={array.every(el => el.isSorted)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button 
            onClick={handleReset} 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button 
            onClick={generateRandomArray} 
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Shuffle className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4 text-white">
          <div className="text-sm">
            <span className="text-white/70">Speed:</span>
            <div className="w-20 ml-2 inline-block">
              <Slider
                value={speed}
                onValueChange={setSpeed}
                max={500}
                min={50}
                step={50}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="flex gap-6 text-white">
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Comparisons:</span>
          <span className="ml-2 font-semibold">{comparisons}</span>
        </div>
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Swaps:</span>
          <span className="ml-2 font-semibold">{swaps}</span>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-white/5 rounded-xl p-6 min-h-[300px] flex items-end justify-center gap-1">
        {array.map((element, index) => (
          <div
            key={index}
            className={`${getBarColor(element)} transition-all duration-300 rounded-t flex items-end justify-center text-white text-xs font-semibold min-w-[40px]`}
            style={{ 
              height: `${element.value}px`,
              transform: element.isSwapping ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <span className="mb-1">{element.value}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
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
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Sorted</span>
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">How Bubble Sort Works</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Compare adjacent elements in the array</p>
          <p>• If they are in the wrong order, swap them</p>
          <p>• Continue until no more swaps are needed</p>
          <p>• Time Complexity: O(n²) | Space Complexity: O(1)</p>
        </div>
      </div>
    </div>
  );
};
