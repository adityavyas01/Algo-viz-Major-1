import React, { useCallback } from 'react';
import { ModernCanvas } from './ModernCanvas';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';

export interface TreeNodeData {
  id: string;
  value: any;
  x: number;
  y: number;
  state: 'normal' | 'current' | 'visited' | 'path' | 'highlighted';
  label?: string;
}

export interface TreeEdgeData {
  from: string;
  to: string;
  state: 'normal' | 'traversed' | 'highlighted';
}

interface ModernTreeVisualizationProps {
  nodes: TreeNodeData[];
  edges: TreeEdgeData[];
  width?: number;
  height?: number;
  className?: string;
}

export const ModernTreeVisualization: React.FC<ModernTreeVisualizationProps> = ({
  nodes,
  edges,
  width = 800,
  height = 500,
  className = "",
}) => {
  const { currentTheme } = useVisualizationTheme();

  const getNodeColor = (state: TreeNodeData['state']) => {
    switch (state) {
      case 'current':
        return currentTheme.colors.primary;
      case 'visited':
        return currentTheme.colors.success;
      case 'path':
        return currentTheme.colors.warning;
      case 'highlighted':
        return currentTheme.colors.secondary;
      default:
        return currentTheme.colors.surface;
    }
  };

  const getEdgeColor = (state: TreeEdgeData['state']) => {
    switch (state) {
      case 'traversed':
        return currentTheme.colors.primary;
      case 'highlighted':
        return currentTheme.colors.secondary;
      default:
        return currentTheme.colors.border;
    }
  };

  const drawTree = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);

    const nodeMap = new Map<string, TreeNodeData>(nodes.map(n => [n.id, n]));

    // Draw edges first
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
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      const radius = 25;
      const color = getNodeColor(node.state);

      // Node circle
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fill();

      // Border
      ctx.strokeStyle = currentTheme.colors.border;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Value text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.value.toString(), node.x, node.y);

      // Optional label
      if (node.label) {
        ctx.fillStyle = currentTheme.colors.textSecondary;
        ctx.font = '12px Arial';
        ctx.fillText(node.label, node.x, node.y + radius + 15);
      }
    });
  }, [nodes, edges, width, height, currentTheme]);

  return (
    <ModernCanvas
      width={width}
      height={height}
      onDraw={(ctx) => drawTree(ctx)}
      className={className}
    />
  );
};

export default ModernTreeVisualization;
