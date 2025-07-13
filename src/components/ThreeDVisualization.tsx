
import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Text } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BoxIcon as BoxIconLucide, RotateCcw, Play } from 'lucide-react';
import * as THREE from 'three';

interface Node3D {
  id: string;
  value: number;
  position: [number, number, number];
  children?: Node3D[];
  color: string;
  isHighlighted?: boolean;
}

const TreeNode: React.FC<{ node: Node3D; onNodeClick: (node: Node3D) => void }> = ({ node, onNodeClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current && node.isHighlighted) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <group position={node.position}>
      <Box
        ref={meshRef}
        args={[1, 1, 1]}
        onClick={() => onNodeClick(node)}
      >
        <meshStandardMaterial 
          color={node.isHighlighted ? '#fbbf24' : node.color}
          emissive={node.isHighlighted ? '#444400' : '#000000'}
        />
      </Box>
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.value.toString()}
      </Text>
      {node.children?.map((child, index) => (
        <TreeNode key={child.id} node={child} onNodeClick={onNodeClick} />
      ))}
    </group>
  );
};

const ArrayVisualization3D: React.FC<{ array: number[] }> = ({ array }) => {
  return (
    <group>
      {array.map((value, index) => (
        <group key={index} position={[index * 2 - array.length, 0, 0]}>
          <Box args={[1.5, value * 0.5 + 0.5, 1]}>
            <meshStandardMaterial color="#3b82f6" />
          </Box>
          <Text
            position={[0, value * 0.25 + 0.8, 0.6]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {value.toString()}
          </Text>
        </group>
      ))}
    </group>
  );
};

export const ThreeDVisualization: React.FC = () => {
  const [visualizationType, setVisualizationType] = useState<'tree' | 'array' | 'graph'>('tree');
  const [selectedNode, setSelectedNode] = useState<Node3D | null>(null);
  
  const sampleTree: Node3D = {
    id: 'root',
    value: 50,
    position: [0, 2, 0],
    color: '#22c55e',
    children: [
      {
        id: 'left',
        value: 30,
        position: [-3, 0, 0],
        color: '#3b82f6',
        children: [
          { id: 'left-left', value: 20, position: [-2, -2, 0], color: '#ef4444' },
          { id: 'left-right', value: 40, position: [0, -2, 0], color: '#f59e0b' }
        ]
      },
      {
        id: 'right',
        value: 70,
        position: [3, 0, 0],
        color: '#8b5cf6',
        children: [
          { id: 'right-left', value: 60, position: [0, -2, 0], color: '#ec4899' },
          { id: 'right-right', value: 80, position: [2, -2, 0], color: '#06b6d4' }
        ]
      }
    ]
  };

  const sampleArray = [5, 2, 8, 1, 9, 3];

  const handleNodeClick = (node: Node3D) => {
    setSelectedNode(node);
  };

  const resetVisualization = () => {
    setSelectedNode(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BoxIconLucide className="w-5 h-5" />
            3D Data Structure Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={visualizationType} onValueChange={(value: typeof visualizationType) => setVisualizationType(value)}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tree">Binary Tree</SelectItem>
                <SelectItem value="array">Array</SelectItem>
                <SelectItem value="graph">Graph</SelectItem>
              </SelectContent>
            </Select>

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
                
                {visualizationType === 'tree' && (
                  <TreeNode node={sampleTree} onNodeClick={handleNodeClick} />
                )}
                
                {visualizationType === 'array' && (
                  <ArrayVisualization3D array={sampleArray} />
                )}
                
                {visualizationType === 'graph' && (
                  <group>
                    <Sphere position={[0, 0, 0]} args={[0.5]}>
                      <meshStandardMaterial color="#22c55e" />
                    </Sphere>
                    <Sphere position={[3, 0, 0]} args={[0.5]}>
                      <meshStandardMaterial color="#3b82f6" />
                    </Sphere>
                    <Sphere position={[0, 3, 0]} args={[0.5]}>
                      <meshStandardMaterial color="#ef4444" />
                    </Sphere>
                  </group>
                )}
                
                <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
              </Suspense>
            </Canvas>
          </div>
        </CardContent>
      </Card>

      {selectedNode && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Selected Node</CardTitle>
          </CardHeader>
          <CardContent className="text-white/80">
            <p>Value: {selectedNode.value}</p>
            <p>ID: {selectedNode.id}</p>
            <p>Children: {selectedNode.children?.length || 0}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
