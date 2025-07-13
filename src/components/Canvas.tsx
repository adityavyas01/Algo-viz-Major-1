
import React, { useRef, useEffect, useCallback } from 'react';

interface CanvasProps {
  width: number;
  height: number;
  onRender: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
  className?: string;
  onTouch?: (x: number, y: number) => void;
}

export const Canvas = ({ width, height, onRender, className, onTouch }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Call render function
    onRender(ctx, canvas);
  }, [onRender, width, height]);

  useEffect(() => {
    render();
  }, [render]);

  const handleTouch = useCallback((e: React.TouchEvent) => {
    if (!onTouch) return;
    
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    onTouch(x, y);
  }, [onTouch]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!onTouch) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    onTouch(x, y);
  }, [onTouch]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      onTouchStart={handleTouch}
      onClick={handleClick}
      style={{ 
        maxWidth: '100%', 
        height: 'auto',
        touchAction: 'manipulation'
      }}
    />
  );
};
