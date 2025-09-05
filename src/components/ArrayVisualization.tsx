
import React, { useState, useCallback } from 'react';
import { Canvas } from './Canvas';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Shuffle, Play, Pause, RotateCcw, Zap } from 'lucide-react';

interface ArrayElement {
  value: number;
  isHighlighted: boolean;
  isSelected: boolean;
  isComparing?: boolean;
  isSorted?: boolean;
  color?: string;
}

interface ArrayVisualizationProps {
  data: ArrayElement[];
  width?: number;
  height?: number;
  title?: string;
  showControls?: boolean;
  onNewArray?: (newArray: number[]) => void;
  onSpeedChange?: (speed: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  isPlaying?: boolean;
  speed?: number;
  algorithmName?: string;
}

export const ArrayVisualization = ({ 
  data, 
  width = 600, 
  height = 300, 
  title = "Array Visualization",
  showControls = true,
  onNewArray,
  onSpeedChange,
  onPlay,
  onPause,
  onReset,
  isPlaying = false,
  speed = 500,
  algorithmName = "Algorithm"
}: ArrayVisualizationProps) => {
  const [arraySize, setArraySize] = useState(10);

  const generateRandomArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 90) + 10
    );
    if (onNewArray) {
      onNewArray(newArray);
    } else {
      // If no callback provided, at least log the action
      console.log('Generated new random array:', newArray);
    }
  }, [arraySize, onNewArray]);

  const generateSortedArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, (_, i) => (i + 1) * 5);
    if (onNewArray) {
      onNewArray(newArray);
    } else {
      console.log('Generated new sorted array:', newArray);
    }
  }, [arraySize, onNewArray]);

  const generateReverseArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, (_, i) => (arraySize - i) * 5);
    if (onNewArray) {
      onNewArray(newArray);
    } else {
      console.log('Generated new reverse array:', newArray);
    }
  }, [arraySize, onNewArray]);

  const renderArray = (ctx: CanvasRenderingContext2D) => {
    if (!data.length) return;

    const padding = 40;
    const elementWidth = (width - padding * 2) / data.length;
    const maxHeight = height - 100;
    const maxValue = Math.max(...data.map(d => d.value));
    const baseY = height - 40;

    data.forEach((element, index) => {
      const x = padding + index * elementWidth;
      const barHeight = (element.value / maxValue) * maxHeight;
      const y = baseY - barHeight;

      // Set colors based on state
      let fillColor = '#3b82f6'; // Default blue
      if (element.isSorted) {
        fillColor = '#10b981'; // Green for sorted
      } else if (element.isSelected) {
        fillColor = '#ef4444'; // Red for selected
      } else if (element.isComparing) {
        fillColor = '#f59e0b'; // Yellow for comparing
      } else if (element.isHighlighted) {
        fillColor = '#8b5cf6'; // Purple for highlighted
      }

      if (element.color) {
        fillColor = element.color;
      }

      // Draw bar with gradient effect
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, fillColor);
      gradient.addColorStop(1, fillColor + '80'); // Add transparency

      ctx.fillStyle = gradient;
      ctx.fillRect(x + 2, y, elementWidth - 4, barHeight);

      // Draw border
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 2, y, elementWidth - 4, barHeight);

      // Draw value text
      ctx.fillStyle = '#ffffff';
      ctx.font = `${Math.min(elementWidth / 3, 14)}px Arial`;
      ctx.textAlign = 'center';
      
      // Position text based on bar height
      const textY = barHeight > 30 ? y + 20 : y - 10;
      ctx.fillText(
        element.value.toString(),
        x + elementWidth / 2,
        textY
      );

      // Draw index below
      ctx.fillStyle = '#9ca3af';
      ctx.font = '10px Arial';
      ctx.fillText(
        index.toString(),
        x + elementWidth / 2,
        baseY + 15
      );
    });

    // Draw algorithm info
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(title, 10, 20);

    // Draw legend
    const legendY = 35;
    const legendItems = [
      { color: '#3b82f6', label: 'Unsorted' },
      { color: '#f59e0b', label: 'Comparing' },
      { color: '#ef4444', label: 'Selected' },
      { color: '#10b981', label: 'Sorted' }
    ];

    legendItems.forEach((item, i) => {
      const x = 10 + i * 80;
      ctx.fillStyle = item.color;
      ctx.fillRect(x, legendY, 12, 12);
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px Arial';
      ctx.fillText(item.label, x + 16, legendY + 9);
    });
  };

  return (
    <div className="space-y-4">
      {/* Algorithm Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">{algorithmName}</h3>
          <p className="text-white/70 text-sm">Array Size: {data.length} elements</p>
        </div>
        <Badge variant="outline" className="text-white border-white/30">
          {isPlaying ? 'Running' : 'Paused'}
        </Badge>
      </div>

      {/* Control Panel */}
      {showControls && (
        <div className="bg-white/5 rounded-lg p-4 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Array Generation Controls */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Array Size</label>
              <Slider
                value={[arraySize]}
                onValueChange={(value) => setArraySize(value[0])}
                min={5}
                max={20}
                step={1}
                className="w-full"
              />
              <span className="text-white/70 text-xs">{arraySize} elements</span>
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Animation Speed</label>
              <Slider
                value={[speed]}
                onValueChange={(value) => {
                  if (onSpeedChange) {
                    onSpeedChange(value[0]);
                  } else {
                    console.log('Speed changed to:', value[0]);
                  }
                }}
                min={100}
                max={2000}
                step={100}
                className="w-full"
              />
              <span className="text-white/70 text-xs">{speed}ms delay</span>
            </div>

            {/* Array Generation Buttons */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Generate Array</label>
              <div className="flex gap-2">
                <Button
                  onClick={generateRandomArray}
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Shuffle className="w-3 h-3 mr-1" />
                  Random
                </Button>
                <Button
                  onClick={generateSortedArray}
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Sorted
                </Button>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium">Controls</label>
              <div className="flex gap-2">
                {!isPlaying ? (
                  <Button
                    onClick={onPlay}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Play
                  </Button>
                ) : (
                  <Button
                    onClick={onPause}
                    size="sm"
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    <Pause className="w-3 h-3 mr-1" />
                    Pause
                  </Button>
                )}
                <Button
                  onClick={onReset}
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visualization Canvas */}
      <div className="bg-black/20 rounded-lg p-4 border border-white/20">
        <Canvas
          width={width}
          height={height}
          onRender={renderArray}
          className="w-full border border-white/10 rounded"
        />
      </div>

      {/* Array Stats */}
      <div className="flex justify-center gap-6 text-sm text-white/70">
        <span>Min: {data.length ? Math.min(...data.map(d => d.value)) : 0}</span>
        <span>Max: {data.length ? Math.max(...data.map(d => d.value)) : 0}</span>
        <span>Avg: {data.length ? Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length) : 0}</span>
      </div>
    </div>
  );
};
