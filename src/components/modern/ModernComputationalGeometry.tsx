import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import ModernCanvas from './ModernCanvas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RefreshCw } from 'lucide-react';
import { grahamScan } from '@/lib/algorithms/geometry/grahamScan';
import { Point } from '@/types/geometry';
import { useToast } from '@/components/ui/use-toast';

const ModernComputationalGeometry: React.FC = () => {
  const { toast } = useToast();
  const [points, setPoints] = useState<Point[]>([]);
  const [hull, setHull] = useState<Point[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState<{ stack: Point[], considering: Point | null }>({ stack: [], considering: null });

  const generatePoints = useCallback(() => {
    const numPoints = 50;
    const newPoints: Point[] = Array.from({ length: numPoints }, () => ({
      x: Math.random() * 700 + 50,
      y: Math.random() * 300 + 50,
    }));
    setPoints(newPoints);
    setHull([]);
    setAnimationStep({ stack: [], considering: null });
  }, []);

  useEffect(() => {
    generatePoints();
  }, [generatePoints]);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const runAnimation = async () => {
    setIsAnimating(true);
    setHull([]);
    
    const { sortedPoints, steps } = grahamScan([...points]);
    
    for (const step of steps) {
      setAnimationStep({ stack: step.stack, considering: step.considering });
      await delay(100);
    }
    
    setHull(steps[steps.length - 1].stack);
    setIsAnimating(false);
    toast({ title: "Graham Scan Complete", description: "Convex hull has been calculated." });
  };

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw all points
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#A0AEC0';
      ctx.fill();
    });

    const { stack, considering } = animationStep;

    // Draw lines for the current stack
    if (stack.length > 1) {
      ctx.beginPath();
      ctx.moveTo(stack[0].x, stack[0].y);
      for (let i = 1; i < stack.length; i++) {
        ctx.lineTo(stack[i].x, stack[i].y);
      }
      ctx.strokeStyle = '#4299E1';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Highlight stack points
    stack.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#4299E1';
      ctx.fill();
    });

    // Highlight the point being considered
    if (considering) {
      ctx.beginPath();
      ctx.arc(considering.x, considering.y, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#F6E05E';
      ctx.fill();

      // Draw line from last point in stack to considering point
      if (stack.length > 0) {
        const lastPoint = stack[stack.length - 1];
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(considering.x, considering.y);
        ctx.strokeStyle = '#F6E05E';
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
    
    // Draw final hull
    if (hull.length > 1) {
        ctx.beginPath();
        ctx.moveTo(hull[0].x, hull[0].y);
        for (let i = 1; i < hull.length; i++) {
            ctx.lineTo(hull[i].x, hull[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#48BB78';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

  }, [points, hull, animationStep]);

  const controls = (
    <Card className="bg-gray-800/50">
      <CardHeader><CardTitle className="text-base">Graham Scan</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-400">Finds the convex hull of a set of points in the plane.</p>
        <div className="flex gap-2">
          <Button onClick={runAnimation} disabled={isAnimating} className="w-full"><Play className="w-4 h-4 mr-2"/>Run</Button>
          <Button onClick={generatePoints} disabled={isAnimating} variant="outline"><RefreshCw className="w-4 h-4"/></Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ModernVisualizationBase
      title="Computational Geometry"
      description="An interactive demonstration of the Graham Scan algorithm for finding the convex hull of a set of points."
      difficulty="Intermediate"
      category="Geometry"
      complexity={{
        time: "O(n log n)",
        space: "O(n)",
      }}
      interactiveControls={controls}
    >
      <ModernCanvas onDraw={(ctx) => draw(ctx)} width={800} height={400} />
    </ModernVisualizationBase>
  );
};

export default ModernComputationalGeometry;
