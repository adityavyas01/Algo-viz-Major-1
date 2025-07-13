
import React from 'react';
import { Canvas } from './Canvas';

interface ArrayElement {
  value: number;
  isHighlighted: boolean;
  isSelected: boolean;
  color?: string;
}

interface ArrayVisualizationProps {
  data: ArrayElement[];
  width?: number;
  height?: number;
  title?: string;
}

export const ArrayVisualization = ({ 
  data, 
  width = 600, 
  height = 200, 
  title 
}: ArrayVisualizationProps) => {
  const renderArray = (ctx: CanvasRenderingContext2D) => {
    if (!data.length) return;

    const elementWidth = (width - 40) / data.length;
    const elementHeight = 60;
    const startY = (height - elementHeight) / 2;

    data.forEach((element, index) => {
      const x = 20 + index * elementWidth;
      const y = startY;

      // Set colors based on state
      if (element.isSelected) {
        ctx.fillStyle = '#ef4444';
      } else if (element.isHighlighted) {
        ctx.fillStyle = '#eab308';
      } else {
        ctx.fillStyle = element.color || '#3b82f6';
      }

      // Draw rectangle
      ctx.fillRect(x, y, elementWidth - 2, elementHeight);

      // Draw border
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, elementWidth - 2, elementHeight);

      // Draw value text
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        element.value.toString(),
        x + elementWidth / 2 - 1,
        y + elementHeight / 2 + 5
      );

      // Draw index below
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Arial';
      ctx.fillText(
        index.toString(),
        x + elementWidth / 2 - 1,
        y + elementHeight + 15
      );
    });
  };

  return (
    <div className="space-y-2">
      {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
      <div className="bg-white/5 rounded-lg p-4">
        <Canvas
          width={width}
          height={height}
          onRender={renderArray}
          className="border border-white/20 rounded"
        />
      </div>
    </div>
  );
};
