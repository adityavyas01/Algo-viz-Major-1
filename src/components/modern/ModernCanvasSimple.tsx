import React, { useRef, useEffect, useCallback } from 'react';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';

interface ModernCanvasProps {
  width: number;
  height: number;
  onDraw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, theme: any) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface AnimatedElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  value: any;
  opacity: number;
  scale: number;
  glow: boolean;
  pulse: boolean;
  shake: boolean;
}

export const ModernCanvas: React.FC<ModernCanvasProps> = ({ 
  width, 
  height, 
  onDraw, 
  className = "",
  style = {}
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentTheme } = useVisualizationTheme();
  const animationFrameRef = useRef<number>();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-quality rendering settings
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Clear with modern background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, currentTheme.colors.surface + '40');
    gradient.addColorStop(1, currentTheme.colors.surface + '20');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    onDraw(ctx, canvas, currentTheme);
  }, [width, height, onDraw, currentTheme]);

  useEffect(() => {
    const animate = () => {
      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [draw]);

  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-inner ${className}`}
      style={{
        background: `linear-gradient(135deg, ${currentTheme.colors.surface}20 0%, ${currentTheme.colors.surface}10 100%)`,
        border: `1px solid ${currentTheme.colors.border}40`,
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block w-full h-full"
        style={{ 
          borderRadius: '12px',
          filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1))'
        }}
      />
    </div>
  );
};

// Canvas utilities as standalone functions
export const drawGlowingRect = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  width: number, 
  height: number, 
  color: string, 
  glowRadius = 10
) => {
  ctx.save();
  
  // Create glow effect
  ctx.shadowColor = color;
  ctx.shadowBlur = glowRadius;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  // Draw main rectangle
  const gradient = ctx.createLinearGradient(x, y, x, y + height);
  gradient.addColorStop(0, color + 'E6');
  gradient.addColorStop(1, color + 'B3');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, height);
  
  // Add border
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  
  ctx.restore();
};

export const drawAnimatedElement = (
  ctx: CanvasRenderingContext2D,
  element: AnimatedElement
) => {
  ctx.save();
  
  // Apply transformations
  ctx.globalAlpha = element.opacity;
  ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
  ctx.scale(element.scale, element.scale);
  
  // Add effects
  if (element.glow) {
    ctx.shadowColor = element.color;
    ctx.shadowBlur = 15;
  }
  
  if (element.pulse) {
    const pulseScale = 1 + Math.sin(Date.now() * 0.01) * 0.1;
    ctx.scale(pulseScale, pulseScale);
  }
  
  if (element.shake) {
    const shakeX = Math.sin(Date.now() * 0.05) * 2;
    const shakeY = Math.cos(Date.now() * 0.05) * 2;
    ctx.translate(shakeX, shakeY);
  }
  
  // Draw element with gradient
  const gradient = ctx.createLinearGradient(-element.width/2, -element.height/2, -element.width/2, element.height/2);
  gradient.addColorStop(0, element.color + 'E6');
  gradient.addColorStop(1, element.color + 'B3');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(-element.width/2, -element.height/2, element.width, element.height);
  
  // Add border
  ctx.strokeStyle = element.color;
  ctx.lineWidth = 2;
  ctx.strokeRect(-element.width/2, -element.height/2, element.width, element.height);
  
  // Draw value text
  if (element.value !== undefined) {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(element.value.toString(), 0, 0);
  }
  
  ctx.restore();
};

export const drawArrow = (
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: string,
  animated = false
) => {
  ctx.save();
  
  const angle = Math.atan2(endY - startY, endX - startX);
  
  if (animated) {
    const progress = (Math.sin(Date.now() * 0.005) + 1) / 2;
    endX = startX + (endX - startX) * progress;
    endY = startY + (endY - startY) * progress;
  }
  
  // Draw arrow line with gradient
  const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
  gradient.addColorStop(0, color + '80');
  gradient.addColorStop(1, color);
  
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  
  // Draw arrowhead
  const headLength = 15;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - headLength * Math.cos(angle - Math.PI / 6),
    endY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    endX - headLength * Math.cos(angle + Math.PI / 6),
    endY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
  
  ctx.restore();
};

export const drawGradientText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  colors: string[],
  size = 16
) => {
  ctx.save();
  
  ctx.font = `bold ${size}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Create gradient
  const gradient = ctx.createLinearGradient(x - 50, y - 10, x + 50, y + 10);
  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });
  
  ctx.fillStyle = gradient;
  ctx.fillText(text, x, y);
  
  // Add text shadow
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillText(text, x + 2, y + 2);
  
  ctx.restore();
};

export type { AnimatedElement };
export default ModernCanvas;
