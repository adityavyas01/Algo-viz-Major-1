import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Maximize,
  Eye,
  Zap,
  Brain,
  Code,
} from 'lucide-react';
import { MotionWrapper, MicroInteraction } from '@/components/motion/MotionWrapper';

// Simple 3D Node component
const Node3D = ({ position, label, value, isActive, isVisited, onClick, color = '#06b6d4' }) => {
  const meshRef = useRef<any>();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
      
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
      } else {
        const targetScale = hovered ? 1.2 : 1;
        meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.1;
        meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.1;
        meshRef.current.scale.z += (targetScale - meshRef.current.scale.z) * 0.1;
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial 
          color={isVisited ? '#10b981' : isActive ? '#f59e0b' : color}
          emissive={isActive ? '#f59e0b' : color}
          emissiveIntensity={isActive ? 0.2 : 0.1}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      {(hovered || isActive) && (
        <Html>
          <div className="bg-black/80 text-white px-2 py-1 rounded text-sm pointer-events-none">
            {label}: {value}
          </div>
        </Html>
      )}
      
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

// Simple 3D Edge component
const Edge3D = ({ start, end, isActive }) => {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, Math.sqrt(
          Math.pow(end[0] - start[0], 2) + 
          Math.pow(end[1] - start[1], 2) + 
          Math.pow(end[2] - start[2], 2)
        ), 8]} />
        <meshStandardMaterial 
          color={isActive ? '#f59e0b' : '#64748b'}
          emissive={isActive ? '#f59e0b' : '#000000'}
          emissiveIntensity={isActive ? 0.2 : 0}
        />
      </mesh>
    </group>
  );
};

// 3D Tree Visualization
const Tree3D = ({ treeData, currentStep }) => {
  const groupRef = useRef<any>();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const renderTreeNode = (node, position, level = 0) => {
    if (!node) return null;
    
    const isActive = node.id === currentStep;
    const isVisited = node.visited;
    
    return (
      <group key={node.id}>
        <Node3D
          position={position}
          label={node.label}
          value={node.value}
          isActive={isActive}
          isVisited={isVisited}
          onClick={() => console.log(`Clicked node: ${node.id}`)}
        />
        
        {/* Left child */}
        {node.left && (
          <>
            <Edge3D 
              start={position} 
              end={[position[0] - (4 / (level + 1)), position[1] - 2, position[2]]} 
              isActive={isActive}
            />
            {renderTreeNode(node.left, [position[0] - (4 / (level + 1)), position[1] - 2, position[2]], level + 1)}
          </>
        )}
        
        {/* Right child */}
        {node.right && (
          <>
            <Edge3D 
              start={position} 
              end={[position[0] + (4 / (level + 1)), position[1] - 2, position[2]]} 
              isActive={isActive}
            />
            {renderTreeNode(node.right, [position[0] + (4 / (level + 1)), position[1] - 2, position[2]], level + 1)}
          </>
        )}
      </group>
    );
  };

  return (
    <group ref={groupRef}>
      {treeData && renderTreeNode(treeData, [0, 4, 0])}
    </group>
  );
};

// Graph 3D Visualization
const Graph3D = ({ graphData, currentStep }) => {
  const nodePositions = React.useMemo(() => {
    const positions = {};
    const nodeCount = graphData.nodes.length;
    const radius = 5;
    
    graphData.nodes.forEach((node, index) => {
      const angle = (index / nodeCount) * Math.PI * 2;
      positions[node.id] = [
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5) * 2,
        Math.sin(angle) * radius
      ];
    });
    
    return positions;
  }, [graphData.nodes]);

  return (
    <group>
      {/* Render nodes */}
      {graphData.nodes.map((node) => (
        <Node3D
          key={node.id}
          position={nodePositions[node.id]}
          label={node.label}
          value={node.value}
          isActive={node.id === currentStep}
          isVisited={node.visited}
          onClick={() => console.log(`Clicked node: ${node.id}`)}
        />
      ))}
      
      {/* Render edges */}
      {graphData.edges.map((edge, index) => (
        <Edge3D
          key={`${edge.from}-${edge.to}`}
          start={nodePositions[edge.from]}
          end={nodePositions[edge.to]}
          isActive={edge.active}
        />
      ))}
    </group>
  );
};

// Sorting Array 3D Visualization
const SortingArray3D = ({ arrayData, currentStep }) => {
  const groupRef = useRef<any>();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {arrayData.map((item, index) => (
        <group key={index} position={[(index - arrayData.length / 2) * 1.2, 0, 0]}>
          <mesh>
            <boxGeometry args={[1, item.value * 0.2, 1]} />
            <meshStandardMaterial 
              color={item.isActive ? '#f59e0b' : item.isComparing ? '#ef4444' : '#06b6d4'}
              emissive={item.isActive ? '#f59e0b' : '#000000'}
              emissiveIntensity={item.isActive ? 0.1 : 0}
            />
          </mesh>
          <Text
            position={[0, item.value * 0.1 + 0.5, 0.6]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {item.value}
          </Text>
        </group>
      ))}
    </group>
  );
};

// Main Simple 3D Visualization Component
export const Simple3DVisualization: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('binary-search-tree');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Sample data for different algorithms
  const algorithmData = {
    'binary-search-tree': {
      type: 'tree',
      data: {
        id: 'root',
        label: '8',
        value: 8,
        visited: false,
        left: {
          id: 'left-4',
          label: '4',
          value: 4,
          visited: false,
          left: {
            id: 'left-left-2',
            label: '2',
            value: 2,
            visited: false,
          },
          right: {
            id: 'left-right-6',
            label: '6',
            value: 6,
            visited: false,
          }
        },
        right: {
          id: 'right-12',
          label: '12',
          value: 12,
          visited: false,
          left: {
            id: 'right-left-10',
            label: '10',
            value: 10,
            visited: false,
          },
          right: {
            id: 'right-right-14',
            label: '14',
            value: 14,
            visited: false,
          }
        }
      }
    },
    'graph-traversal': {
      type: 'graph',
      data: {
        nodes: [
          { id: 'A', label: 'A', value: 1, visited: false },
          { id: 'B', label: 'B', value: 2, visited: false },
          { id: 'C', label: 'C', value: 3, visited: false },
          { id: 'D', label: 'D', value: 4, visited: false },
          { id: 'E', label: 'E', value: 5, visited: false },
          { id: 'F', label: 'F', value: 6, visited: false }
        ],
        edges: [
          { from: 'A', to: 'B', weight: 1, active: false },
          { from: 'A', to: 'C', weight: 2, active: false },
          { from: 'B', to: 'D', weight: 3, active: false },
          { from: 'C', to: 'E', weight: 2, active: false },
          { from: 'D', to: 'F', weight: 1, active: false },
          { from: 'E', to: 'F', weight: 4, active: false }
        ]
      }
    },
    'sorting-algorithm': {
      type: 'array',
      data: [
        { value: 8, isActive: false, isComparing: false },
        { value: 3, isActive: false, isComparing: false },
        { value: 1, isActive: false, isComparing: false },
        { value: 7, isActive: false, isComparing: false },
        { value: 0, isActive: false, isComparing: false },
        { value: 9, isActive: false, isComparing: false },
        { value: 2, isActive: false, isComparing: false }
      ]
    }
  };

  const currentAlgorithmData = algorithmData[selectedAlgorithm];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const renderVisualization = () => {
    switch (currentAlgorithmData.type) {
      case 'tree':
        return (
          <Tree3D 
            treeData={currentAlgorithmData.data} 
            currentStep={currentStep} 
          />
        );
      case 'graph':
        return (
          <Graph3D 
            graphData={currentAlgorithmData.data} 
            currentStep={currentStep} 
          />
        );
      case 'array':
        return (
          <SortingArray3D 
            arrayData={currentAlgorithmData.data} 
            currentStep={currentStep} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <MotionWrapper variant="fadeInUp" delay={0.1}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">3D Algorithm Visualizations</h1>
            <p className="text-white/70 max-w-3xl mx-auto">
              Explore algorithms in three dimensions with interactive WebGL graphics
            </p>
          </div>
        </MotionWrapper>

        {/* Controls */}
        <MotionWrapper variant="fadeInUp" delay={0.2}>
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-400" />
                Visualization Controls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                {/* Algorithm Selection */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Algorithm</label>
                  <Tabs value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                    <TabsList className="bg-white/10 border-white/20">
                      <TabsTrigger 
                        value="binary-search-tree" 
                        className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                      >
                        Binary Tree
                      </TabsTrigger>
                      <TabsTrigger 
                        value="graph-traversal" 
                        className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                      >
                        Graph
                      </TabsTrigger>
                      <TabsTrigger 
                        value="sorting-algorithm" 
                        className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                      >
                        Sorting
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Playback Controls */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm font-medium">Playback</label>
                  <div className="flex gap-2">
                    <MicroInteraction type="button">
                      <Button
                        variant={isPlaying ? "default" : "outline"}
                        size="sm"
                        onClick={handlePlayPause}
                        className={isPlaying ? "bg-green-600 hover:bg-green-700" : "border-white/20 text-white/70"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </MicroInteraction>
                    <MicroInteraction type="button">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="border-white/20 text-white/70"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </MicroInteraction>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        {/* 3D Visualization Canvas */}
        <MotionWrapper variant="fadeInUp" delay={0.3}>
          <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden">
            <CardContent className="p-0">
              <div className="h-96 lg:h-[600px] relative">
                <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                  {/* Lighting */}
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                  
                  {/* Controls */}
                  <OrbitControls 
                    enablePan={true} 
                    enableZoom={true} 
                    enableRotate={true}
                    maxDistance={20}
                    minDistance={5}
                  />
                  
                  {/* Main Visualization */}
                  {renderVisualization()}
                </Canvas>
                
                {/* Overlay UI */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-black/60 text-white border-white/20">
                    Step: {currentStep + 1}
                  </Badge>
                </div>
                
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <Button variant="ghost" size="sm" className="bg-black/60 text-white border-white/20">
                    <Maximize className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="bg-black/60 text-white border-white/20">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        {/* Algorithm Information */}
        <MotionWrapper variant="fadeInUp" delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  Algorithm Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    Current: {selectedAlgorithm.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h4>
                  <p className="text-white/70 text-sm">
                    {selectedAlgorithm === 'binary-search-tree' && 'Explore binary search trees in 3D space with interactive node navigation.'}
                    {selectedAlgorithm === 'graph-traversal' && 'Navigate through connected nodes using graph traversal algorithms.'}
                    {selectedAlgorithm === 'sorting-algorithm' && 'Watch sorting algorithms rearrange data with 3D bar visualizations.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-green-400" />
                  Interactive Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></div>
                    <span className="text-white/70">
                      <strong className="text-white">Orbit Controls:</strong> Drag to rotate, scroll to zoom
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></div>
                    <span className="text-white/70">
                      <strong className="text-white">Node Interaction:</strong> Hover for details, click to select
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
                    <span className="text-white/70">
                      <strong className="text-white">Real-time Animation:</strong> Step-by-step execution
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default Simple3DVisualization;