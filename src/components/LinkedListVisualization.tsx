
import React from 'react';
import { Canvas } from './Canvas';

interface ListNode {
  value: number;
  isHighlighted: boolean;
  isSelected: boolean;
  showPointer?: boolean;
}

interface LinkedListVisualizationProps {
  nodes: ListNode[];
  width?: number;
  height?: number;
  title?: string;
}

export const LinkedListVisualization = ({ 
  nodes, 
  width = 700, 
  height = 150, 
  title 
}: LinkedListVisualizationProps) => {
  const renderLinkedList = (ctx: CanvasRenderingContext2D) => {
    if (!nodes.length) return;

    const nodeWidth = 80;
    const nodeHeight = 50;
    const spacing = 120;
    const startX = 30;
    const y = (height - nodeHeight) / 2;

    nodes.forEach((node, index) => {
      const x = startX + index * spacing;

      // Set node colors
      if (node.isSelected) {
        ctx.fillStyle = '#ef4444';
      } else if (node.isHighlighted) {
        ctx.fillStyle = '#eab308';
      } else {
        ctx.fillStyle = '#3b82f6';
      }

      // Draw node rectangle
      ctx.fillRect(x, y, nodeWidth, nodeHeight);

      // Draw node border
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, nodeWidth, nodeHeight);

      // Draw value text
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(
        node.value.toString(),
        x + nodeWidth / 2,
        y + nodeHeight / 2 + 5
      );

      // Draw pointer arrow to next node
      if (index < nodes.length - 1) {
        const arrowStartX = x + nodeWidth;
        const arrowEndX = x + spacing - 10;
        const arrowY = y + nodeHeight / 2;

        // Set arrow color
        ctx.strokeStyle = node.showPointer ? '#22c55e' : '#6b7280';
        ctx.lineWidth = 3;

        // Draw arrow line
        ctx.beginPath();
        ctx.moveTo(arrowStartX, arrowY);
        ctx.lineTo(arrowEndX, arrowY);
        ctx.stroke();

        // Draw arrow head
        ctx.beginPath();
        ctx.moveTo(arrowEndX, arrowY);
        ctx.lineTo(arrowEndX - 8, arrowY - 5);
        ctx.lineTo(arrowEndX - 8, arrowY + 5);
        ctx.closePath();
        ctx.fillStyle = node.showPointer ? '#22c55e' : '#6b7280';
        ctx.fill();
      } else {
        // Draw NULL pointer
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.fillText('NULL', x + nodeWidth + 15, y + nodeHeight / 2 + 3);
      }
    });
  };

  return (
    <div className="space-y-2">
      {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
      <div className="bg-white/5 rounded-lg p-4">
        <Canvas
          width={width}
          height={height}
          onRender={renderLinkedList}
          className="border border-white/20 rounded"
        />
      </div>
    </div>
  );
};
