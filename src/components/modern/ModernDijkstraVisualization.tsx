import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernGraphVisualization, GraphNodeData, GraphEdgeData } from './ModernGraphVisualization';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RefreshCw, Shuffle, Waypoints, BrainCircuit } from 'lucide-react';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { dijkstra } from '@/lib/algorithms/graph/dijkstra';
import { prim } from '@/lib/algorithms/graph/prim';
import { motion } from 'framer-motion';

type AlgorithmType = 'dijkstra' | 'prim';

interface Step {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  distances: (number | string)[];
  pq: { node: number | string, priority: number | string }[];
  description: string;
}

const ModernDijkstraVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('dijkstra');
  const [nodes, setNodes] = useState<GraphNodeData[]>([]);
  const [edges, setEdges] = useState<GraphEdgeData[]>([]);
  const [adj, setAdj] = useState(new Map<number, { to: number; weight: number }[]>());
  const [startNode, setStartNode] = useState(0);
  
  const [steps, setSteps] = useState<Step[]>([]);
  const [speed, setSpeed] = useState(800);
  const [isGenerating, setIsGenerating] = useState(false);

  const animation = useAnimation(steps.length, speed);

  const generateGraph = useCallback(() => {
    const numNodes = 6;
    const newNodes: GraphNodeData[] = Array.from({ length: numNodes }, (_, i) => ({
      id: i,
      x: 150 + (i % 3) * 200,
      y: 150 + Math.floor(i / 3) * 200,
      label: `${i}`,
      state: 'normal',
    }));

    const newEdges: GraphEdgeData[] = [
      { from: 0, to: 1, weight: 4, state: 'normal' }, { from: 0, to: 2, weight: 2, state: 'normal' },
      { from: 1, to: 2, weight: 5, state: 'normal' }, { from: 1, to: 3, weight: 10, state: 'normal' },
      { from: 2, to: 4, weight: 3, state: 'normal' }, { from: 3, to: 4, weight: 4, state: 'normal' },
      { from: 3, to: 5, weight: 11, state: 'normal' }, { from: 4, to: 5, weight: 7, state: 'normal' },
    ];
    
    const newAdj = new Map<number, { to: number; weight: number }[]>();
    for(let i=0; i<numNodes; i++) newAdj.set(i, []);
    newEdges.forEach(e => {
      newAdj.get(e.from as number)?.push({ to: e.to as number, weight: e.weight || 0 });
      // For undirected graph for Prim's
      if (algorithm === 'prim') {
        newAdj.get(e.to as number)?.push({ to: e.from as number, weight: e.weight || 0 });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
    setAdj(newAdj);
    setSteps([]);
    animation.reset();
  }, [algorithm]);
  
  useEffect(() => {
    generateGraph();
  }, [algorithm, generateGraph]);

  const runAlgorithm = useCallback(() => {
    setIsGenerating(true);
    animation.reset();
    
    const numNodes = nodes.length;
    const algoSteps: Step[] = [];

    const createStep = (
      nodeStates: Map<number, GraphNodeData['state']>,
      edgeStates: Map<string, GraphEdgeData['state']>,
      currentDistances: (number|string)[],
      currentPq: {node: number | string, priority: number | string}[],
      description: string
    ): Step => ({
      nodes: nodes.map(n => ({ ...n, state: nodeStates.get(n.id as number) || 'normal' })),
      edges: edges.map(e => {
        const key = `${e.from}-${e.to}`;
        const revKey = `${e.to}-${e.from}`;
        return { ...e, state: edgeStates.get(key) || edgeStates.get(revKey) || 'normal' };
      }),
      distances: currentDistances,
      pq: currentPq,
      description,
    });

    if (algorithm === 'dijkstra') {
      const { steps: dijkstraSteps, distances: finalDistances } = dijkstra(numNodes, adj, startNode);
      let nodeStates = new Map<number, GraphNodeData['state']>();
      let edgeStates = new Map<string, GraphEdgeData['state']>();
      let currentDistances = Array(numNodes).fill('∞');
      currentDistances[startNode] = 0;
      
      let pqForDisplay: {node: number, priority: number}[] = [{node: startNode, priority: 0}];

      algoSteps.push(createStep(nodeStates, edgeStates, currentDistances, pqForDisplay, `Starting Dijkstra's from node ${startNode}.`));

      for (const step of dijkstraSteps) {
        if (step.type === 'visit') {
          nodeStates.set(step.node, 'current');
          pqForDisplay = pqForDisplay.filter(item => item.node !== step.node);
          algoSteps.push(createStep(nodeStates, edgeStates, currentDistances, pqForDisplay, `Visiting node ${step.node}.`));
        } else if (step.type === 'update') {
          currentDistances[step.node] = step.newDistance;
          const existingPqIndex = pqForDisplay.findIndex(item => item.node === step.node);
          if (existingPqIndex > -1) {
            pqForDisplay[existingPqIndex].priority = step.newDistance;
          } else {
            pqForDisplay.push({node: step.node, priority: step.newDistance});
          }
          pqForDisplay.sort((a, b) => a.priority - b.priority);
          algoSteps.push(createStep(nodeStates, edgeStates, currentDistances, pqForDisplay, `Updating distance of node ${step.node} to ${step.newDistance}.`));
        } else if (step.type === 'finishNode') {
            nodeStates.set(step.node, 'visited');
            algoSteps.push(createStep(nodeStates, edgeStates, currentDistances, pqForDisplay, `Finished with node ${step.node}.`));
        }
      }
      algoSteps.push(createStep(nodeStates, edgeStates, finalDistances, [], `Dijkstra's complete.`));

    } else { // prim
      const { mstEdges, steps: primSteps } = prim(numNodes, adj, startNode);
      let nodeStates = new Map<number, GraphNodeData['state']>();
      let edgeStates = new Map<string, GraphEdgeData['state']>();
      let pqForDisplay: {node: string, priority: number}[] = [];

      algoSteps.push(createStep(nodeStates, edgeStates, [], [], `Starting Prim's from node ${startNode}.`));

      for (const step of primSteps) {
        if (step.type === 'visit') {
          nodeStates.set(step.node, 'visited');
          pqForDisplay = pqForDisplay.filter(item => item.node.toString().split('-')[1] !== step.node.toString());
          algoSteps.push(createStep(nodeStates, edgeStates, [], pqForDisplay, `Adding node ${step.node} to MST.`));
        } else if (step.type === 'edge') {
          edgeStates.set(`${step.from}-${step.to}`, 'visited');
          algoSteps.push(createStep(nodeStates, edgeStates, [], pqForDisplay, `Adding edge ${step.from}-${step.to} to MST.`));
        } else if (step.type === 'pq') {
            pqForDisplay = step.pq.map(p => ({node: `${p.from}-${p.to}`, priority: p.priority}));
            pqForDisplay.sort((a, b) => a.priority - b.priority);
            algoSteps.push(createStep(nodeStates, edgeStates, [], pqForDisplay, `Updating priority queue.`));
        }
      }
      
      mstEdges.forEach(e => {
        edgeStates.set(`${e.source}-${e.target}`, 'visited');
        edgeStates.set(`${e.target}-${e.source}`, 'visited');
      });
      nodes.forEach(n => nodeStates.set(n.id as number, 'visited'));
      algoSteps.push(createStep(nodeStates, edgeStates, [], [], `Prim's complete. MST found.`));
    }

    setSteps(algoSteps);
    setIsGenerating(false);
  }, [nodes, edges, adj, startNode, algorithm]);

  const currentStepData = useMemo(() => {
    if (!steps.length || animation.currentStep >= steps.length) {
      return {
        nodes,
        edges,
        distances: Array(nodes.length).fill('—'),
        pq: [],
        description: 'Select an algorithm and run.'
      };
    }
    return steps[animation.currentStep];
  }, [steps, animation.currentStep, nodes, edges]);

  const controls = {
    isPlaying: animation.isPlaying,
    onPlay: animation.play,
    onPause: animation.pause,
    onReset: runAlgorithm,
    onStepForward: animation.stepForward,
    onStepBack: animation.stepBackward,
    currentStep: animation.currentStep,
    totalSteps: steps.length,
    speed,
    onSpeedChange: setSpeed,
    isGenerating,
  };

  const interactiveControls = (
    <div className="flex flex-wrap items-center gap-4">
      <Select value={algorithm} onValueChange={(v: AlgorithmType) => setAlgorithm(v)} disabled={isGenerating || animation.isPlaying}>
        <SelectTrigger className="w-[220px]"><BrainCircuit className="w-4 h-4 mr-2" /><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem value="dijkstra">Dijkstra's Shortest Path</SelectItem>
          <SelectItem value="prim">Prim's MST</SelectItem>
        </SelectContent>
      </Select>
      <Select value={startNode.toString()} onValueChange={(v) => setStartNode(parseInt(v))} disabled={isGenerating || animation.isPlaying}>
        <SelectTrigger className="w-[180px]"><Waypoints className="w-4 h-4 mr-2" /><SelectValue /></SelectTrigger>
        <SelectContent>
          {nodes.map(n => <SelectItem key={n.id} value={n.id.toString()}>{`Start at ${n.label}`}</SelectItem>)}
        </SelectContent>
      </Select>
      <Button onClick={runAlgorithm} disabled={isGenerating || animation.isPlaying}><Play className="w-4 h-4 mr-2"/>Run</Button>
      <Button onClick={generateGraph} disabled={isGenerating || animation.isPlaying} variant="outline"><Shuffle className="w-4 h-4"/></Button>
    </div>
  );

  return (
    <ModernVisualizationBase
      title={algorithm === 'dijkstra' ? "Dijkstra's Algorithm" : "Prim's Algorithm"}
      description="Visualizations for classic graph algorithms: Dijkstra's for shortest paths and Prim's for Minimum Spanning Trees (MST)."
      difficulty="Advanced"
      category="Graph"
      complexity={{ time: "O(E log V)", space: "O(V + E)" }}
      controls={controls}
      interactiveControls={interactiveControls}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-grow">
          <ModernGraphVisualization nodes={currentStepData.nodes} edges={currentStepData.edges} />
          <div className="w-full p-4 rounded-lg text-center transition-colors duration-300 mt-4" style={{ backgroundColor: currentTheme.colors.surface, border: `1px solid ${currentTheme.colors.border}`}}>
            <p className="text-md font-semibold" style={{ color: currentTheme.colors.text }}>{currentStepData.description}</p>
          </div>
        </div>
        <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
          <Card>
            <CardHeader><CardTitle>Distances</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full">
                <thead><tr><th className="text-left">Node</th><th className="text-right">Distance</th></tr></thead>
                <tbody>
                  {currentStepData.distances.map((dist, i) => (
                    <tr key={i}><td>{i}</td><td className="text-right">{dist}</td></tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Priority Queue</CardTitle></CardHeader>
            <CardContent className="min-h-[100px]">
              <div className="flex flex-wrap gap-2">
                {currentStepData.pq.map((item, i) => (
                  <motion.div key={`${item.node}-${i}`} layout initial={{scale:0.5}} animate={{scale:1}} exit={{scale:0.5}} className="p-2 bg-gray-700 rounded text-center">
                    <div>Node: {item.node.toString()}</div>
                    <div className="font-bold">Pri: {item.priority.toString()}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernDijkstraVisualization;
