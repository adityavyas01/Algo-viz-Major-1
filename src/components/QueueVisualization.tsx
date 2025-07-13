
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Canvas } from './Canvas';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface QueueElement {
  value: number;
  id: number;
}

export const QueueVisualization = () => {
  const [queue, setQueue] = useState<QueueElement[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [animatingAction, setAnimatingAction] = useState<'enqueue' | 'dequeue' | null>(null);

  const enqueue = () => {
    if (!inputValue.trim()) return;
    const value = parseInt(inputValue);
    if (isNaN(value)) return;

    const newElement = { value, id: Date.now() };
    setAnimatingAction('enqueue');
    setQueue(prev => [...prev, newElement]);
    setInputValue('');

    setTimeout(() => setAnimatingAction(null), 300);
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    
    setAnimatingAction('dequeue');
    setTimeout(() => {
      setQueue(prev => prev.slice(1));
      setAnimatingAction(null);
    }, 300);
  };

  const clear = () => {
    setQueue([]);
    setAnimatingAction(null);
  };

  const renderQueue = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const elementWidth = 80;
    const elementHeight = 60;
    const spacing = 10;
    const totalWidth = queue.length * (elementWidth + spacing) - spacing;
    const startX = Math.max(20, (canvas.width - totalWidth) / 2);
    const y = (canvas.height - elementHeight) / 2;

    // Draw queue elements from front to rear
    queue.forEach((element, index) => {
      const x = startX + index * (elementWidth + spacing);
      const isFront = index === 0;
      const isRear = index === queue.length - 1;
      const isAnimating = (animatingAction === 'dequeue' && isFront) || 
                         (animatingAction === 'enqueue' && isRear);

      // Animation effects
      const scale = isAnimating ? 1.1 : 1;
      const alpha = isAnimating && animatingAction === 'dequeue' ? 0.5 : 1;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x + elementWidth/2, y + elementHeight/2);
      ctx.scale(scale, scale);
      ctx.translate(-elementWidth/2, -elementHeight/2);

      // Draw element
      ctx.fillStyle = isFront ? '#ef4444' : isRear ? '#22c55e' : '#3b82f6';
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

      // Draw arrows between elements
      if (index < queue.length - 1) {
        const arrowX = x + elementWidth + spacing/2;
        const arrowY = y + elementHeight/2;
        
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(arrowX - 15, arrowY);
        ctx.lineTo(arrowX + 15, arrowY);
        ctx.moveTo(arrowX + 10, arrowY - 5);
        ctx.lineTo(arrowX + 15, arrowY);
        ctx.lineTo(arrowX + 10, arrowY + 5);
        ctx.stroke();
      }
    });

    // Draw FRONT and REAR labels
    if (queue.length > 0) {
      const frontX = startX + elementWidth/2;
      const rearX = startX + (queue.length - 1) * (elementWidth + spacing) + elementWidth/2;
      
      ctx.fillStyle = '#ef4444';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('FRONT', frontX, y - 15);
      
      ctx.fillStyle = '#22c55e';
      ctx.fillText('REAR', rearX, y + elementHeight + 25);
    }

    // Draw queue label
    ctx.fillStyle = '#6b7280';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('QUEUE (FIFO)', canvas.width/2, 30);
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
            onKeyPress={(e) => e.key === 'Enter' && enqueue()}
            className="w-32"
          />
          <Button onClick={enqueue} size="sm" className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4" />
            Enqueue
          </Button>
        </div>
        
        <Button 
          onClick={dequeue} 
          size="sm" 
          className="bg-red-600 hover:bg-red-700"
          disabled={queue.length === 0}
        >
          <Minus className="w-4 h-4" />
          Dequeue
        </Button>
        
        <Button onClick={clear} size="sm" variant="outline">
          <RotateCcw className="w-4 h-4" />
          Clear
        </Button>
      </div>

      <div className="flex gap-6 text-white">
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Size:</span>
          <span className="ml-2 font-semibold">{queue.length}</span>
        </div>
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Front:</span>
          <span className="ml-2 font-semibold">
            {queue.length > 0 ? queue[0].value : 'Empty'}
          </span>
        </div>
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Rear:</span>
          <span className="ml-2 font-semibold">
            {queue.length > 0 ? queue[queue.length - 1].value : 'Empty'}
          </span>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4">
        <Canvas
          width={600}
          height={200}
          onRender={renderQueue}
          className="border border-white/20 rounded mx-auto"
        />
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Queue (FIFO - First In, First Out)</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Elements are added (enqueued) at the rear and removed (dequeued) from the front</p>
          <p>• First element added is the first one to be removed</p>
          <p>• Enqueue: O(1) | Dequeue: O(1) | Front: O(1)</p>
          <p>• Common uses: Task scheduling, breadth-first search, buffering</p>
        </div>
      </div>
    </div>
  );
};
