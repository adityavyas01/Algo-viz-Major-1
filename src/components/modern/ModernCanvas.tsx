import React, { useRef, useEffect, useCallback } from 'react';

// Text bounds tracking for collision detection
let textBounds: Array<{x: number, y: number, width: number, height: number}> = [];

// Function to check if two rectangles overlap
const checkTextCollision = (x: number, y: number, width: number, height: number): boolean => {
  const newBounds = { x: x - width/2, y: y - height/2, width, height };
  
  return textBounds.some(existing => {
    return !(newBounds.x + newBounds.width < existing.x ||
             existing.x + existing.width < newBounds.x ||
             newBounds.y + newBounds.height < existing.y ||
             existing.y + existing.height < newBounds.y);
  });
};

// Function to find safe position for text
const findSafeTextPosition = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number): {x: number, y: number} => {
  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const textHeight = fontSize;
  
  // Try original position first
  if (!checkTextCollision(x, y, textWidth, textHeight)) {
    return { x, y };
  }
  
  // Try positions in a spiral pattern outward from original position
  const maxAttempts = 20;
  const step = 5;
  
  for (let radius = step; radius <= maxAttempts * step; radius += step) {
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      const testX = x + Math.cos(angle) * radius;
      const testY = y + Math.sin(angle) * radius;
      
      if (!checkTextCollision(testX, testY, textWidth, textHeight)) {
        return { x: testX, y: testY };
      }
    }
  }
  
  // If no safe position found, return original position with small offset
  return { x: x + Math.random() * 20 - 10, y: y + Math.random() * 20 - 10 };
};

// Function to register text bounds
const registerTextBounds = (x: number, y: number, width: number, height: number): void => {
  textBounds.push({ x: x - width/2, y: y - height/2, width, height });
};

// Function to clear text bounds (call at start of each frame)
const clearTextBounds = (): void => {
  textBounds = [];
};
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';

interface ModernCanvasProps {
  width: number;
  height: number;
  onDraw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, theme: any, utils: CanvasUtils) => void;
  className?: string;
  style?: React.CSSProperties;
}

interface AnimatedElement {
  id: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  width: number;
  height: number;
  color: string;
  value: any;
  opacity: number;
  scale: number;
  rotation: number;
  glow: boolean;
  pulse: boolean;
  shake: boolean;
}

interface CanvasUtils {
  drawGlowingRect: (x: number, y: number, width: number, height: number, color: string, glowRadius?: number) => void;
  drawAnimatedElement: (element: AnimatedElement) => void;
  drawArrow: (startX: number, startY: number, endX: number, endY: number, color: string, animated?: boolean) => void;
  drawGradientText: (text: string, x: number, y: number, gradient: string[], size?: number) => void;
  createParticleEffect: (x: number, y: number, color: string, count?: number) => void;
  drawNeuralNetworkEdge: (startX: number, startY: number, endX: number, endY: number, strength: number, color: string) => void;
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

    const utils = createCanvasUtils(ctx, currentTheme);
    onDraw(ctx, canvas, currentTheme, utils);
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

// Enhanced Canvas Utilities
export const createCanvasUtils = (ctx: CanvasRenderingContext2D, theme: any): CanvasUtils => {
  // Clear text bounds at the start of each frame
  clearTextBounds();
  
  return {
  drawGlowingRect: (x, y, width, height, color, glowRadius = 10) => {
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
  },

  drawAnimatedElement: (element) => {
    ctx.save();
    
    // Apply transformations
    ctx.globalAlpha = element.opacity;
    ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
    ctx.scale(element.scale, element.scale);
    ctx.rotate(element.rotation);
    
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
    
    // Draw element
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
  },

  drawArrow: (startX, startY, endX, endY, color, animated = false) => {
    ctx.save();
    
    const angle = Math.atan2(endY - startY, endX - startX);
    const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    
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
  },

  drawGradientText: (text, x, y, gradient, size = 16) => {
    ctx.save();
    
    ctx.font = `bold ${size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Check for text collision and find safe position
    const safePosition = findSafeTextPosition(ctx, text, x, y, size);
    const finalX = safePosition.x;
    const finalY = safePosition.y;
    
    // Register text bounds to prevent future collisions
    const metrics = ctx.measureText(text);
    registerTextBounds(finalX, finalY, metrics.width, size);
    
    // Create gradient
    const textGradient = ctx.createLinearGradient(finalX - 50, finalY - 10, finalX + 50, finalY + 10);
    gradient.forEach((color, index) => {
      textGradient.addColorStop(index / (gradient.length - 1), color);
    });
    
    ctx.fillStyle = textGradient;
    ctx.fillText(text, finalX, finalY);
    
    // Add text shadow with better visibility
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillText(text, finalX + 1, finalY + 1);
    
    ctx.restore();
  },

  createParticleEffect: (x, y, color, count = 10) => {
    ctx.save();
    
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const distance = 20 + Math.random() * 30;
      const particleX = x + Math.cos(angle) * distance;
      const particleY = y + Math.sin(angle) * distance;
      
      ctx.globalAlpha = Math.random() * 0.8 + 0.2;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(particleX, particleY, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  },

  drawNeuralNetworkEdge: (startX, startY, endX, endY, strength, color) => {
    ctx.save();
    
    // Calculate control points for bezier curve
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const controlX = midX + (Math.random() - 0.5) * 50;
    const controlY = midY + (Math.random() - 0.5) * 50;
    
    // Draw connection with varying opacity based on strength
    ctx.globalAlpha = Math.max(0.1, strength);
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1, strength * 5);
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    ctx.stroke();
    
    // Add flow animation
    const flowProgress = (Date.now() * 0.003) % 1;
    const flowX = startX + (endX - startX) * flowProgress;
    const flowY = startY + (endY - startY) * flowProgress;
    
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(flowX, flowY, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
  };
};

export type { AnimatedElement, CanvasUtils };
export default ModernCanvas;
