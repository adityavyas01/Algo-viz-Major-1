import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { 
  OrbitControls, 
  Text, 
  Box, 
  Sphere, 
  Line,
  Html,
  PerspectiveCamera,
  Environment,
  EffectComposer,
  Bloom,
  ChromaticAberration
} from '@react-three/drei';
import { 
  Vector3, 
  Color, 
  MathUtils, 
  BufferGeometry, 
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  ShaderMaterial,
  AdditiveBlending
} from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Maximize,
  Eye,
  Layers,
  Zap,
  Brain,
  Code,
  Target,
  ArrowRight,
  Volume2,
  VolumeX
} from 'lucide-react';
import { MotionWrapper, MicroInteraction } from '@/components/motion/MotionWrapper';

// Shader materials for advanced effects
const particleVertexShader = `
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  
  void main() {
    float r = distance(gl_PointCoord, vec2(0.5, 0.5));
    if (r > 0.5) discard;
    
    float alpha = 1.0 - smoothstep(0.0, 0.5, r);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// 3D Node component for graph visualization
const Node3D = ({ position, label, value, isActive, isVisited, onClick, color = '#06b6d4' }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
      
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
      } else {
        meshRef.current.scale.lerp(new Vector3(hovered ? 1.2 : 1, hovered ? 1.2 : 1, hovered ? 1.2 : 1), 0.1);
      }
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.5, 16, 16]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={isVisited ? '#10b981' : isActive ? '#f59e0b' : color}
          emissive={isActive ? new Color('#f59e0b').multiplyScalar(0.2) : new Color(color).multiplyScalar(0.1)}
          roughness={0.3}
          metalness={0.7}
        />
      </Sphere>
      
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

// 3D Edge component for graph connections
const Edge3D = ({ start, end, isActive, weight }) => {
  const points = useMemo(() => [new Vector3(...start), new Vector3(...end)], [start, end]);
  
  return (
    <Line
      points={points}
      color={isActive ? '#f59e0b' : '#64748b'}
      lineWidth={isActive ? 3 : 1}
      transparent
      opacity={isActive ? 1 : 0.6}
    />
  );
};

// Particle system for algorithm flow visualization
const ParticleFlow = ({ nodes, currentStep }) => {
  const pointsRef = useRef();
  const particleCount = 1000;
  
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions within bounds
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Random colors
      const color = new Color();
      color.setHSL(Math.random() * 0.2 + 0.5, 0.7, 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Random sizes
      sizes[i] = Math.random() * 2 + 1;
    }
    
    return [positions, colors, sizes];
  }, []);

  const shaderMaterial = useMemo(() => new ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    transparent: true,
    blending: AdditiveBlending,
  }), []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.01;
        positions[i3] += Math.cos(state.clock.elapsedTime + i * 0.01) * 0.005;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new Float32BufferAttribute(colors, 3));
    geo.setAttribute('size', new Float32BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  return (
    <points ref={pointsRef} geometry={geometry} material={shaderMaterial} />
  );
};

// 3D Tree Visualization Component
const Tree3D = ({ treeData, currentStep, animationSpeed }) => {
  const groupRef = useRef();
  
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
      <ParticleFlow nodes={[]} currentStep={currentStep} />
    </group>
  );
};

// Graph 3D Visualization Component
const Graph3D = ({ graphData, currentStep, algorithm }) => {
  const groupRef = useRef();
  
  const nodePositions = useMemo(() => {
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
    <group ref={groupRef}>
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
          weight={edge.weight}
        />
      ))}
      
      <ParticleFlow nodes={graphData.nodes} currentStep={currentStep} />
    </group>
  );
};

// Sorting Array 3D Visualization
const SortingArray3D = ({ arrayData, currentStep, algorithm }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {arrayData.map((item, index) => (
        <group key={index} position={[(index - arrayData.length / 2) * 1.2, 0, 0]}>
          <Box args={[1, item.value * 0.2, 1]}>
            <meshStandardMaterial 
              color={item.isActive ? '#f59e0b' : item.isComparing ? '#ef4444' : '#06b6d4'}
              emissive={item.isActive ? new Color('#f59e0b').multiplyScalar(0.1) : new Color('#000000')}
            />
          </Box>
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

// Main 3D Visualization Component
export const Advanced3DVisualization: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('binary-search-tree');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState([1]);
  const [showParticles, setShowParticles] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 10]);

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
            animationSpeed={animationSpeed[0]}
          />
        );
      case 'graph':
        return (
          <Graph3D 
            graphData={currentAlgorithmData.data} 
            currentStep={currentStep} 
            algorithm={selectedAlgorithm}
          />
        );
      case 'array':
        return (
          <SortingArray3D 
            arrayData={currentAlgorithmData.data} 
            currentStep={currentStep} 
            algorithm={selectedAlgorithm}
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
            <h1 className="text-4xl font-bold text-white mb-4">Advanced 3D Algorithm Visualizations</h1>
            <p className="text-white/70 max-w-3xl mx-auto">
              Immerse yourself in three-dimensional algorithm visualizations with interactive WebGL graphics, 
              particle systems, and advanced shader effects
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
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Algorithm Selection */}
                <div className="space-y-3">
                  <label className="text-white/80 text-sm font-medium">Algorithm</label>
                  <Tabs value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                    <TabsList className="grid w-full grid-cols-1 bg-white/10 border-white/20">
                      <TabsTrigger 
                        value="binary-search-tree" 
                        className="text-xs data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                      >
                        BST
                      </TabsTrigger>
                      <TabsTrigger 
                        value="graph-traversal" 
                        className="text-xs data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                      >
                        Graph
                      </TabsTrigger>
                      <TabsTrigger 
                        value="sorting-algorithm" 
                        className="text-xs data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                      >
                        Sort
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Playback Controls */}
                <div className="space-y-3">
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

                {/* Animation Speed */}
                <div className="space-y-3">
                  <label className="text-white/80 text-sm font-medium">
                    Speed: {animationSpeed[0]}x
                  </label>
                  <Slider
                    value={animationSpeed}
                    onValueChange={setAnimationSpeed}
                    max={3}
                    min={0.5}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                {/* Visual Options */}
                <div className="space-y-3">
                  <label className="text-white/80 text-sm font-medium">Options</label>
                  <div className="flex gap-2">
                    <MicroInteraction type="button">
                      <Button
                        variant={showParticles ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowParticles(!showParticles)}
                        className={showParticles ? "bg-purple-600 hover:bg-purple-700" : "border-white/20 text-white/70"}
                      >
                        <Zap className="w-4 h-4" />
                      </Button>
                    </MicroInteraction>
                    <MicroInteraction type="button">
                      <Button
                        variant={audioEnabled ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAudioEnabled(!audioEnabled)}
                        className={audioEnabled ? "bg-blue-600 hover:bg-blue-700" : "border-white/20 text-white/70"}
                      >
                        {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
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
                <Canvas camera={{ position: cameraPosition, fov: 75 }}>
                  <Suspense fallback={<Html center>Loading 3D Scene...</Html>}>
                    {/* Lighting */}
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                    
                    {/* Environment */}
                    <Environment preset="night" />
                    
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
                    
                    {/* Post-processing effects */}
                    <EffectComposer>
                      <Bloom intensity={0.5} luminanceThreshold={0.4} luminanceSmoothing={0.9} />
                      <ChromaticAberration offset={[0.0005, 0.0012]} />
                    </EffectComposer>
                  </Suspense>
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
                  <h4 className="text-white font-semibold mb-2">Current Algorithm: {selectedAlgorithm.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                  <p className="text-white/70 text-sm">
                    {selectedAlgorithm === 'binary-search-tree' && 'Explore the hierarchical structure of binary search trees with 3D node traversal and insertion/deletion operations.'}
                    {selectedAlgorithm === 'graph-traversal' && 'Navigate through connected nodes using breadth-first and depth-first search algorithms in three-dimensional space.'}
                    {selectedAlgorithm === 'sorting-algorithm' && 'Watch sorting algorithms rearrange data in real-time with 3D bar charts and smooth transitions.'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Time Complexity:</span>
                    <code className="text-cyan-400 bg-white/10 px-2 py-1 rounded">O(log n)</code>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Space Complexity:</span>
                    <code className="text-green-400 bg-white/10 px-2 py-1 rounded">O(1)</code>
                  </div>
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
                      <strong className="text-white">Orbit Controls:</strong> Click and drag to rotate, scroll to zoom
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></div>
                    <span className="text-white/70">
                      <strong className="text-white">Node Interaction:</strong> Hover and click nodes for details
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></div>
                    <span className="text-white/70">
                      <strong className="text-white">Real-time Animation:</strong> Step-by-step algorithm execution
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0"></div>
                    <span className="text-white/70">
                      <strong className="text-white">Particle Effects:</strong> Visual flow and data movement
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

export default Advanced3DVisualization;