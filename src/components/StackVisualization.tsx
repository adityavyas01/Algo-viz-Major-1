
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Canvas } from './Canvas';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface StackElement {
  value: number;
  id: number;
}

export const StackVisualization = () => {
  const [stack, setStack] = useState<StackElement[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const push = () => {
    if (!inputValue.trim()) return;
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const newElement = { value, id: Date.now() };
    setStack(prev => [...prev, newElement]);
    setAnimatingIndex(stack.length);
    setInputValue('');

    setTimeout(() => setAnimatingIndex(null), 300);
  };

  const pop = () => {
    if (stack.length === 0) return;
    
    setAnimatingIndex(stack.length - 1);
    setTimeout(() => {
      setStack(prev => prev.slice(0, -1));
      setAnimatingIndex(null);
    }, 300);
  };

  const clear = () => {
    setStack([]);
    setAnimatingIndex(null);
  };

  const renderStack = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const elementWidth = 120;
    const elementHeight = 50;
    const startX = (canvas.width - elementWidth) / 2;
    const startY = canvas.height - 60;

    // Draw base
    ctx.fillStyle = '#4b5563';
    ctx.fillRect(startX - 20, startY + 10, elementWidth + 40, 20);

    // Draw stack elements from bottom to top
    stack.forEach((element, index) => {
      const y = startY - (index * (elementHeight + 5));
      const isAnimating = animatingIndex === index;

      // Animation effects
      const scale = isAnimating ? 1.1 : 1;
      const alpha = isAnimating ? 0.7 : 1;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(startX + elementWidth/2, y + elementHeight/2);
      ctx.scale(scale, scale);
      ctx.translate(-elementWidth/2, -elementHeight/2);

      // Draw element
      ctx.fillStyle = index === stack.length - 1 ? '#ef4444' : '#3b82f6';
      ctx.fillRect(0, 0, elementWidth, elementHeight);

      // Draw border
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, elementWidth, elementHeight);

      // Draw value
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(element.value.toString(), elementWidth/2, elementHeight/2 + 5);

      ctx.restore();
    });

    // Draw "TOP" indicator
    if (stack.length > 0) {
      const topY = startY - ((stack.length - 1) * (elementHeight + 5));
      ctx.fillStyle = '#ef4444';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('TOP', startX + elementWidth + 30, topY + elementHeight/2 + 5);
    }

    // Draw stack label
    ctx.fillStyle = '#6b7280';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('STACK (LIFO)', canvas.width/2, 30);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Enter value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && push()}
            className="w-32"
          />
          <Button onClick={push} size="sm" className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4" />
            Push
          </Button>
        </div>
        
        <Button 
          onClick={pop} 
          size="sm" 
          className="bg-red-600 hover:bg-red-700"
          disabled={stack.length === 0}
        >
          <Minus className="w-4 h-4" />
          Pop
        </Button>
        
        <Button onClick={clear} size="sm" variant="outline">
          <RotateCcw className="w-4 h-4" />
          Clear
        </Button>
      </div>

      <div className="flex gap-6 text-white">
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Size:</span>
          <span className="ml-2 font-semibold">{stack.length}</span>
        </div>
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Top:</span>
          <span className="ml-2 font-semibold">
            {stack.length > 0 ? stack[stack.length - 1].value : 'Empty'}
          </span>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4">
        <Canvas
          width={400}
          height={400}
          onRender={renderStack}
          className="border border-white/20 rounded mx-auto"
        />
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Stack (LIFO - Last In, First Out)</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Elements are added (pushed) and removed (popped) from the top</p>
          <p>• Last element added is the first one to be removed</p>
          <p>• Push: O(1) | Pop: O(1) | Peek: O(1)</p>
          <p>• Common uses: Function calls, undo operations, expression evaluation</p>
        </div>
      </div>
    </div>
  );
};
