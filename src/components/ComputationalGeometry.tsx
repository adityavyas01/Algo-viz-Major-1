
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw, Triangle, Circle } from 'lucide-react';

type Algorithm = 'convex-hull' | 'closest-pair' | 'line-intersection';

interface Point {
  x: number;
  y: number;
  id: string;
}

export const ComputationalGeometry: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>('convex-hull');
  const [isRunning, setIsRunning] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [hull, setHull] = useState<Point[]>([]);
  const [closestPair, setClosestPair] = useState<[Point, Point] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const generateRandomPoints = () => {
    const newPoints: Point[] = [];
    for (let i = 0; i < 12; i++) {
      newPoints.push({
        x: 50 + Math.random() * 300,
        y: 50 + Math.random() * 200,
        id: `P${i}`
      });
    }
    setPoints(newPoints);
    setHull([]);
    setClosestPair(null);
  };

  const convexHullGrahamScan = (points: Point[]): Point[] => {
    if (points.length < 3) return points;

    // Find the bottom-most point (and leftmost in case of tie)
    const start = points.reduce((min, p) => 
      p.y < min.y || (p.y === min.y && p.x < min.x) ? p : min
    );

    // Sort points by polar angle with respect to start point
    const sortedPoints = points
      .filter(p => p !== start)
      .sort((a, b) => {
        const angleA = Math.atan2(a.y - start.y, a.x - start.x);
        const angleB = Math.atan2(b.y - start.y, b.x - start.x);
        return angleA - angleB;
      });

    const hull = [start];
    
    for (const point of sortedPoints) {
      while (hull.length > 1) {
        const orientation = getOrientation(hull[hull.length - 2], hull[hull.length - 1], point);
        if (orientation <= 0) {
          hull.pop();
        } else {
          break;
        }
      }
      hull.push(point);
    }

    return hull;
  };

  const getOrientation = (p: Point, q: Point, r: Point): number => {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  };

  const findClosestPair = (points: Point[]): [Point, Point] | null => {
    if (points.length < 2) return null;
    
    let minDist = Infinity;
    let closest: [Point, Point] | null = null;
    
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = Math.sqrt(
          Math.pow(points[i].x - points[j].x, 2) + 
          Math.pow(points[i].y - points[j].y, 2)
        );
        if (dist < minDist) {
          minDist = dist;
          closest = [points[i], points[j]];
        }
      }
    }
    
    return closest;
  };

  const startVisualization = () => {
    setIsRunning(true);
    setCurrentStep(0);
    
    if (algorithm === 'convex-hull') {
      const hullPoints = convexHullGrahamScan([...points]);
      setHull(hullPoints);
    } else if (algorithm === 'closest-pair') {
      const pair = findClosestPair(points);
      setClosestPair(pair);
    }
  };

  const resetVisualization = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setHull([]);
    setClosestPair(null);
    generateRandomPoints();
  };

  useEffect(() => {
    generateRandomPoints();
  }, [algorithm]);

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Triangle className="w-5 h-5" />
            Computational Geometry
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={algorithm} onValueChange={(value: Algorithm) => setAlgorithm(value)}>
              <SelectTrigger className="w-64 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="convex-hull">Convex Hull (Graham Scan)</SelectItem>
                <SelectItem value="closest-pair">Closest Pair of Points</SelectItem>
                <SelectItem value="line-intersection">Line Segment Intersection</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                onClick={startVisualization}
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Start
              </Button>
              <Button
                onClick={resetVisualization}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Geometric Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-80 bg-black/30 rounded-lg overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 400 320">
                {/* Render convex hull */}
                {algorithm === 'convex-hull' && hull.length > 2 && (
                  <polygon
                    points={hull.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="rgba(34, 197, 94, 0.2)"
                    stroke="#22c55e"
                    strokeWidth="2"
                  />
                )}

                {/* Render closest pair connection */}
                {algorithm === 'closest-pair' && closestPair && (
                  <line
                    x1={closestPair[0].x}
                    y1={closestPair[0].y}
                    x2={closestPair[1].x}
                    y2={closestPair[1].y}
                    stroke="#ef4444"
                    strokeWidth="3"
                  />
                )}

                {/* Render points */}
                {points.map((point, index) => {
                  const isInHull = hull.some(h => h.id === point.id);
                  const isClosestPair = closestPair && 
                    (closestPair[0].id === point.id || closestPair[1].id === point.id);
                  
                  return (
                    <g key={index}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="6"
                        fill={
                          isClosestPair ? "#ef4444" :
                          isInHull ? "#22c55e" : "#3b82f6"
                        }
                        stroke="white"
                        strokeWidth="2"
                      />
                      <text
                        x={point.x + 10}
                        y={point.y + 5}
                        fill="white"
                        fontSize="10"
                      >
                        {point.id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Algorithm Information</CardTitle>
          </CardHeader>
          <CardContent>
            {algorithm === 'convex-hull' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Convex Hull Results</h4>
                  <div className="text-sm text-white/80">
                    <p>Hull points: {hull.length}</p>
                    <p>Hull vertices: {hull.map(p => p.id).join(', ')}</p>
                  </div>
                </div>
                <div className="text-white/80 text-sm space-y-2">
                  <p><strong>Algorithm:</strong> Graham Scan</p>
                  <p><strong>Time Complexity:</strong> O(n log n)</p>
                  <p><strong>Space Complexity:</strong> O(n)</p>
                  <p><strong>Applications:</strong> Computer graphics, collision detection, pattern recognition</p>
                </div>
              </div>
            )}

            {algorithm === 'closest-pair' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Closest Pair Results</h4>
                  {closestPair && (
                    <div className="text-sm text-white/80">
                      <p>Closest points: {closestPair[0].id} and {closestPair[1].id}</p>
                      <p>Distance: {Math.sqrt(
                        Math.pow(closestPair[0].x - closestPair[1].x, 2) + 
                        Math.pow(closestPair[0].y - closestPair[1].y, 2)
                      ).toFixed(2)}</p>
                    </div>
                  )}
                </div>
                <div className="text-white/80 text-sm space-y-2">
                  <p><strong>Algorithm:</strong> Brute Force (O(n²))</p>
                  <p><strong>Optimal:</strong> Divide & Conquer O(n log n)</p>
                  <p><strong>Applications:</strong> Clustering, collision detection, facility location</p>
                </div>
              </div>
            )}

            {algorithm === 'line-intersection' && (
              <div className="space-y-4">
                <div className="text-white/80 text-sm space-y-2">
                  <p><strong>Algorithm:</strong> Bentley-Ottmann</p>
                  <p><strong>Time Complexity:</strong> O((n + k) log n)</p>
                  <p><strong>Applications:</strong> CAD systems, map overlay, computer graphics</p>
                  <p className="text-yellow-400">Click to add line segments for intersection testing.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
