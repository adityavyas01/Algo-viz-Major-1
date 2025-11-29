import React, { useCallback } from 'react';
import { ModernCanvas } from './ModernCanvas';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';

export interface GraphNodeData {
  id: string | number;
  x: number;
  y: number;
  label: string;
  state: 'normal' | 'current' | 'visited' | 'in-queue' | 'highlighted';
}

export interface GraphEdgeData {
  from: string | number;
  to: string | number;
  state: 'normal' | 'traversed' | 'highlighted';
  weight?: number;
}

interface ModernGraphVisualizationProps {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  width?: number;
  height?: number;
  className?: string;
}

export const ModernGraphVisualization: React.FC<ModernGraphVisualizationProps> = ({
  nodes,
  edges,
  width = 800,
  height = 500,
  className = "",
}) => {
  const { currentTheme } = useVisualizationTheme();

  const getNodeColor = (state: GraphNodeData['state']) => {
    switch (state) {
      case 'current':
        return currentTheme.colors.warning;
      case 'visited':
        return currentTheme.colors.success;
      case 'in-queue':
        return currentTheme.colors.secondary;
      case 'highlighted':
        return currentTheme.colors.primary;
      default:
        return currentTheme.colors.surface;
    }
  };

  const getEdgeColor = (state: GraphEdgeData['state']) => {
    switch (state) {
      case 'traversed':
        return currentTheme.colors.primary;
      case 'highlighted':
        return currentTheme.colors.secondary;
      default:
        return currentTheme.colors.border;
    }
  };

  const drawGraph = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);

    const nodeMap = new Map<string | number, GraphNodeData>(nodes.map(n => [n.id, n]));

    // Draw edges
    edges.forEach(edge => {
      const fromNode = nodeMap.get(edge.from);
      const toNode = nodeMap.get(edge.to);
      if (fromNode && toNode) {
        ctx.strokeStyle = getEdgeColor(edge.state);
        ctx.lineWidth = edge.state === 'normal' ? 2 : 3;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        if (edge.weight !== undefined) {
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2;
          
          // Simple background for text
          const text = edge.weight.toString();
          const textWidth = ctx.measureText(text).width;
          ctx.fillStyle = currentTheme.colors.background;
          ctx.fillRect(midX - textWidth / 2 - 2, midY - 10, textWidth + 4, 12);

          ctx.fillStyle = currentTheme.colors.text;
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, midX, midY - 4);
        }
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      const radius = 20;
      const color = getNodeColor(node.state);

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = currentTheme.colors.border;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);
    });
  }, [nodes, edges, width, height, currentTheme]);

  return (
    <ModernCanvas
      width={width}
      height={height}
      onDraw={drawGraph}
      className={className}
    />
  );
};

export default ModernGraphVisualization;
