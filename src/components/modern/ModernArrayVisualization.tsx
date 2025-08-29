import React, { useMemo } from 'react';
import { ModernCanvas, drawGlowingRect, drawAnimatedElement, drawArrow, drawGradientText, AnimatedElement } from './ModernCanvasSimple';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';

interface ModernArrayElement {
  value: number;
  state: 'normal' | 'comparing' | 'swapping' | 'sorted' | 'current' | 'minimum' | 'maximum' | 'pivot' | 'target';
  index?: number;
  color?: string;
  glow?: boolean;
  pulse?: boolean;
  shake?: boolean;
  highlight?: boolean;
}

interface ModernArrayVisualizationProps {
  data: ModernArrayElement[];
  width?: number;
  height?: number;
  showIndices?: boolean;
  showValues?: boolean;
  showPointers?: boolean;
  pointers?: Array<{
    index: number;
    label: string;
    color: string;
    position: 'top' | 'bottom';
  }>;
  animations?: boolean;
  style3D?: boolean;
  className?: string;
}

export const ModernArrayVisualization: React.FC<ModernArrayVisualizationProps> = ({
  data,
  width = 800,
  height = 200,
  showIndices = true,
  showValues = true,
  showPointers = false,
  pointers = [],
  animations = true,
  style3D = false,
  className = ""
}) => {
  const { currentTheme } = useVisualizationTheme();

  const getStateColor = (state: ModernArrayElement['state']): string => {
    switch (state) {
      case 'comparing': return '#f59e0b'; // Amber
      case 'swapping': return '#ef4444'; // Red
      case 'sorted': return '#10b981'; // Emerald
      case 'current': return '#3b82f6'; // Blue
      case 'minimum': return '#8b5cf6'; // Purple
      case 'maximum': return '#f97316'; // Orange
      case 'pivot': return '#ec4899'; // Pink
      case 'target': return '#06b6d4'; // Cyan
      default: return currentTheme.colors.primary;
    }
  };

  const elements: AnimatedElement[] = useMemo(() => {
    if (!data.length) return [];

    const elementWidth = Math.min(80, (width - 80) / data.length);
    const elementHeight = 60;
    const spacing = 4;
    const totalWidth = data.length * elementWidth + (data.length - 1) * spacing;
    const startX = (width - totalWidth) / 2;
    const centerY = height / 2 - elementHeight / 2;

    return data.map((item, index) => ({
      id: `element-${index}`,
      x: startX + index * (elementWidth + spacing),
      y: centerY,
      targetX: startX + index * (elementWidth + spacing),
      targetY: centerY,
      width: elementWidth,
      height: elementHeight,
      color: item.color || getStateColor(item.state),
      value: item.value,
      opacity: 1,
      scale: item.highlight ? 1.1 : 1,
      rotation: 0,
      glow: item.glow || item.state === 'comparing' || item.state === 'target',
      pulse: item.pulse || item.state === 'current',
      shake: item.shake || item.state === 'swapping'
    }));
  }, [data, width, height, currentTheme]);

  const onDraw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, theme: any) => {
    // Draw grid background (subtle)
    ctx.strokeStyle = theme.colors.border + '20';
    ctx.lineWidth = 1;
    for (let i = 0; i <= data.length; i++) {
      const x = 40 + i * (elements[0]?.width + 4 || 80);
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, height - 20);
      ctx.stroke();
    }

    // Draw animated elements
    elements.forEach((element, index) => {
      // Add 3D effect if enabled
      if (style3D) {
        // Draw shadow
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(element.x + 5, element.y + 5, element.width, element.height);
        ctx.restore();
      }

      drawAnimatedElement(ctx, element);

      // Draw indices
      if (showIndices) {
        ctx.fillStyle = theme.colors.textSecondary;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
          index.toString(),
          element.x + element.width / 2,
          element.y + element.height + 20
        );
      }

      // Draw comparison connections
      const item = data[index];
      if (item.state === 'comparing' && index < data.length - 1 && data[index + 1].state === 'comparing') {
        const nextElement = elements[index + 1];
        drawArrow(
          ctx,
          element.x + element.width,
          element.y + element.height / 2,
          nextElement.x,
          nextElement.y + nextElement.height / 2,
          theme.colors.warning,
          animations
        );
      }
    });

    // Draw pointers
    if (showPointers && pointers.length > 0) {
      pointers.forEach(pointer => {
        if (pointer.index >= 0 && pointer.index < elements.length) {
          const element = elements[pointer.index];
          const pointerY = pointer.position === 'top' ? element.y - 30 : element.y + element.height + 40;
          const pointerX = element.x + element.width / 2;

          // Draw pointer arrow
          drawArrow(
            ctx,
            pointerX,
            pointerY + (pointer.position === 'top' ? 20 : -20),
            pointerX,
            pointer.position === 'top' ? element.y : element.y + element.height,
            pointer.color,
            animations
          );

          // Draw pointer label with modern styling
          ctx.save();
          ctx.fillStyle = pointer.color;
          ctx.strokeStyle = pointer.color;
          ctx.lineWidth = 2;

          // Background pill
          const textWidth = ctx.measureText(pointer.label).width;
          const pillWidth = textWidth + 16;
          const pillHeight = 24;
          const pillX = pointerX - pillWidth / 2;
          const pillY = pointerY - pillHeight / 2;

          ctx.beginPath();
          ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 12);
          ctx.fill();

          // Label text
          ctx.fillStyle = 'white';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(pointer.label, pointerX, pointerY);
          ctx.restore();
        }
      });
    }

    // Draw state legend
    const legendY = height - 40;
    const legendStates = ['normal', 'comparing', 'swapping', 'sorted', 'current'];
    const legendLabels = ['Normal', 'Comparing', 'Swapping', 'Sorted', 'Current'];
    
    legendStates.forEach((state, index) => {
      const legendX = 20 + index * 120;
      const color = getStateColor(state as ModernArrayElement['state']);
      
      // Legend color box
      ctx.fillStyle = color;
      ctx.fillRect(legendX, legendY, 16, 16);
      ctx.strokeStyle = theme.colors.border;
      ctx.strokeRect(legendX, legendY, 16, 16);
      
      // Legend label
      ctx.fillStyle = theme.colors.textSecondary;
      ctx.font = '11px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(legendLabels[index], legendX + 20, legendY + 12);
    });

    // Draw performance metrics in corner
    ctx.fillStyle = theme.colors.textSecondary;
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(
      `Elements: ${data.length} | FPS: ${Math.round(1000 / 16)}`,
      width - 10,
      20
    );
  };

  return (
    <ModernCanvas
      width={width}
      height={height}
      onDraw={onDraw}
      className={className}
      style={{
        background: style3D 
          ? `linear-gradient(135deg, ${currentTheme.colors.surface}40 0%, ${currentTheme.colors.surface}20 50%, ${currentTheme.colors.surface}40 100%)`
          : undefined
      }}
    />
  );
};

export default ModernArrayVisualization;
