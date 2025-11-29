import { Point } from '@/types/geometry';

// Returns the orientation of the triplet (p, q, r)
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation(p: Point, q: Point, r: Point): number {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val === 0) return 0; // Collinear
  return (val > 0) ? 1 : 2; // Clockwise or Counterclockwise
}

type GrahamScanStep = {
  stack: Point[];
  considering: Point | null;
};

export function grahamScan(points: Point[]) {
  const n = points.length;
  if (n < 3) return { sortedPoints: points, steps: [] };

  const steps: GrahamScanStep[] = [];

  // Find the bottom-most point
  let minY = points[0].y;
  let minIndex = 0;
  for (let i = 1; i < n; i++) {
    const y = points[i].y;
    if ((y < minY) || (minY === y && points[i].x < points[minIndex].x)) {
      minY = points[i].y;
      minIndex = i;
    }
  }

  // Swap bottom-most point with the first point
  [points[0], points[minIndex]] = [points[minIndex], points[0]];
  const p0 = points[0];

  // Sort n-1 points with respect to the first point.
  // A point p1 comes before p2 in sorted output if p2
  // has a larger polar angle (in counterclockwise direction) than p1
  const sortedPoints = points.slice(1).sort((p1, p2) => {
    const o = orientation(p0, p1, p2);
    if (o === 0) {
      // If collinear, the one closer to p0 comes first
      const dist1 = (p0.x - p1.x) ** 2 + (p0.y - p1.y) ** 2;
      const dist2 = (p0.x - p2.x) ** 2 + (p0.y - p2.y) ** 2;
      return dist1 - dist2;
    }
    return (o === 2) ? -1 : 1;
  });
  
  const allSortedPoints = [p0, ...sortedPoints];

  // If two or more points make same angle with p0,
  // remove all but the one that is farthest from p0
  const modifiedPoints: Point[] = [allSortedPoints[0]];
  for (let i = 1; i < allSortedPoints.length - 1; i++) {
    if (orientation(p0, allSortedPoints[i], allSortedPoints[i + 1]) !== 0) {
      modifiedPoints.push(allSortedPoints[i]);
    }
  }
  modifiedPoints.push(allSortedPoints[allSortedPoints.length - 1]);

  if (modifiedPoints.length < 3) return { sortedPoints: modifiedPoints, steps: [] };

  const stack: Point[] = [modifiedPoints[0], modifiedPoints[1], modifiedPoints[2]];
  steps.push({ stack: [...stack], considering: null });

  for (let i = 3; i < modifiedPoints.length; i++) {
    steps.push({ stack: [...stack], considering: modifiedPoints[i] });
    while (stack.length > 1 && orientation(stack[stack.length - 2], stack[stack.length - 1], modifiedPoints[i]) !== 2) {
      stack.pop();
      steps.push({ stack: [...stack], considering: modifiedPoints[i] });
    }
    stack.push(modifiedPoints[i]);
    steps.push({ stack: [...stack], considering: null });
  }
  
  steps.push({ stack: [...stack], considering: null });

  return { sortedPoints: modifiedPoints, steps };
}
