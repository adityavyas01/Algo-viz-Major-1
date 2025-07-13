
import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Line, Text } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TreePine, Play, RotateCcw, Plus } from 'lucide-react';
import { Vector3 } from 'three';

interface Point3D {
  x: number;
  y: number;
  z: number;
  id: string;
  color: string;
  isHighlighted?: boolean;
}

interface QuadTreeNode {
  bounds: { x: number; y: number; width: number; height: number };
  points: Point3D[];
  children?: QuadTreeNode[];
  depth: number;
}

const QuadTreeVisualization: React.FC<{ nodes: QuadTreeNode[] }> = ({ nodes }) => {
  return (
    <>
      {nodes.map((node, index) => (
        <group key={index}>
          <Box 
            position={[node.bounds.x + node.bounds.width/2, 0, node.bounds.y + node.bounds.height/2]}
            args={[node.bounds.width, 0.1, node.bounds.height]}
          >
            <meshBasicMaterial color="#64748b" wireframe />
          </Box>
          {node.points.map(point => (
            <Sphere
              key={point.id}
              position={[point.x, 0.5, point.y]}
              args={[0.2]}
            >
              <meshStandardMaterial 
                color={point.isHighlighted ? '#fbbf24' : point.color}
                emissive={point.isHighlighted ? '#444400' : '#000000'}
              />
            </Sphere>
          ))}
        </group>
      ))}
    </>
  );
};

const KDTreeVisualization: React.FC<{ points: Point3D[] }> = ({ points }) => {
  return (
    <>
      {points.map(point => (
        <group key={point.id}>
          <Sphere
            position={[point.x, point.y, point.z]}
            args={[0.3]}
          >
            <meshStandardMaterial 
              color={point.isHighlighted ? '#fbbf24' : point.color}
              emissive={point.isHighlighted ? '#004400' : '#000000'}
            />
          </Sphere>
        </group>
      ))}
    </>
  );
};

const OctreeVisualization: React.FC<{ bounds: any; points: Point3D[] }> = ({ bounds, points }) => {
  return (
    <>
      <Box 
        position={[bounds.x, bounds.y, bounds.z]}
        args={[bounds.width, bounds.height, bounds.depth]}
      >
        <meshStandardMaterial color="#64748b" wireframe />
      </Box>
      {points.map(point => (
        <Sphere
          key={point.id}
          position={[point.x, point.y, point.z]}
          args={[0.2]}
        >
          <meshStandardMaterial 
            color={point.isHighlighted ? '#fbbf24' : point.color}
            emissive={point.isHighlighted ? '#444400' : '#000000'}
          />
        </Sphere>
      ))}
    </>
  );
};

export const SpatialDataStructures: React.FC = () => {
  const [structure, setStructure] = useState<'quadtree' | 'kdtree' | 'octree'>('quadtree');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const samplePoints: Point3D[] = [
    { x: 1, y: 1, z: 1, id: 'p1', color: '#3b82f6' },
    { x: -1, y: 2, z: -1, id: 'p2', color: '#22c55e' },
    { x: 2, y: -1, z: 0, id: 'p3', color: '#ef4444' },
    { x: -2, y: -2, z: 2, id: 'p4', color: '#f59e0b' },
    { x: 0, y: 0, z: -2, id: 'p5', color: '#8b5cf6' }
  ];

  const sampleQuadTree: QuadTreeNode[] = [
    {
      bounds: { x: -3, y: -3, width: 6, height: 6 },
      points: samplePoints.slice(0, 3),
      depth: 0
    }
  ];

  const octreeBounds = {
    x: 0, y: 0, z: 0,
    width: 4, height: 4, depth: 4
  };

  const startQuery = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
  };

  const resetVisualization = () => {
    setIsAnimating(false);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TreePine className="w-5 h-5" />
            Spatial Data Structures
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={structure} onValueChange={(value: typeof structure) => setStructure(value)}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quadtree">Quad Tree</SelectItem>
                <SelectItem value="kdtree">K-D Tree</SelectItem>
                <SelectItem value="octree">Octree</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={startQuery}
              disabled={isAnimating}
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="w-4 h-4 mr-2" />
              Query
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
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-0">
          <div className="h-96 w-full">
            <Canvas
              camera={{ position: [8, 8, 8], fov: 60 }}
              style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} />
                
                {structure === 'quadtree' && (
                  <QuadTreeVisualization nodes={sampleQuadTree} />
                )}
                
                {structure === 'kdtree' && (
                  <KDTreeVisualization points={samplePoints} />
                )}
                
                {structure === 'octree' && (
                  <OctreeVisualization bounds={octreeBounds} points={samplePoints} />
                )}
                
                <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
              </Suspense>
            </Canvas>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Structure Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-white/80 text-sm">
            {structure === 'quadtree' && (
              <>
                <p>• <strong>Quad Tree:</strong> 2D spatial partitioning</p>
                <p>• Divides space into four quadrants</p>
                <p>• Efficient for 2D range queries</p>
              </>
            )}
            {structure === 'kdtree' && (
              <>
                <p>• <strong>K-D Tree:</strong> Multi-dimensional binary tree</p>
                <p>• Alternates splitting dimensions</p>
                <p>• Optimal for nearest neighbor searches</p>
              </>
            )}
            {structure === 'octree' && (
              <>
                <p>• <strong>Octree:</strong> 3D spatial partitioning</p>
                <p>• Divides space into eight octants</p>
                <p>• Used in 3D graphics and collision detection</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-white/80 text-sm">
            <p>• <strong>Insert:</strong> Add points to the structure</p>
            <p>• <strong>Query:</strong> Find points in a region</p>
            <p>• <strong>Nearest Neighbor:</strong> Find closest points</p>
            <p>• <strong>Range Search:</strong> Points within bounds</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
