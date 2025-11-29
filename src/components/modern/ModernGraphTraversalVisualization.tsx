import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernGraphVisualization, GraphNodeData, GraphEdgeData } from './ModernGraphVisualization';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Play, Pause, RotateCcw, StepForward, StepBack, Shuffle, BrainCircuit, Waypoints } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TraversalAlgorithm = 'bfs' | 'dfs';

interface GraphTraversalStep {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
  currentNodeId: string | number | null;
  queue: (string | number)[]; // For BFS
  stack: (string | number)[]; // For DFS
  description: string;
}

const GRAPH_INFO = {
  name: 'Graph Traversals (BFS & DFS)',
  description: 'Graph traversal is the process of visiting (checking and/or updating) each node in a graph. This visualization demonstrates two of the most common traversal algorithms: Breadth-First Search (BFS) and Depth-First Search (DFS).',
  complexity: {
    time: 'O(V + E)',
    space: 'O(V)',
  },
  difficulty: 'Intermediate' as const,
  category: 'Graph',
  educational: {
    keyPoints: [
      'BFS explores neighbors first, using a queue. It is good for finding the shortest path on unweighted graphs.',
      'DFS explores as far as possible along each branch before backtracking, using a stack. It is good for pathfinding or detecting cycles.',
      'Both algorithms have a time complexity of O(V + E), where V is the number of vertices and E is the number of edges.',
      'The choice between BFS and DFS depends on the problem structure and requirements.',
    ],
    realWorldUse: [
      'BFS: Finding the shortest path in games and social networks, web crawlers.',
      'DFS: Solving puzzles with one solution (like mazes), topological sorting, detecting cycles.',
    ],
    pseudocode: {
      bfs: [
        'procedure BFS(G, start_v):',
        '  let Q be a queue',
        '  Q.enqueue(start_v)',
        '  let visited be a set',
        '  visited.add(start_v)',
        '  while Q is not empty:',
        '    v = Q.dequeue()',
        '    // process v',
        '    for each neighbor w of v:',
        '      if w is not in visited:',
        '        visited.add(w)',
        '        Q.enqueue(w)',
      ],
      dfs: [
        'procedure DFS(G, start_v):',
        '  let S be a stack',
        '  S.push(start_v)',
        '  let visited be a set',
        '  while S is not empty:',
        '    v = S.pop()',
        '    if v is not in visited:',
        '      visited.add(v)',
        '      // process v',
        '      for each neighbor w of v:',
        '        S.push(w)',
      ],
    }
  }
};

const sampleGraph = {
  nodes: [
    { id: 'A', x: 100, y: 250, label: 'A', state: 'normal' as const },
    { id: 'B', x: 250, y: 100, label: 'B', state: 'normal' as const },
    { id: 'C', x: 250, y: 400, label: 'C', state: 'normal' as const },
    { id: 'D', x: 400, y: 100, label: 'D', state: 'normal' as const },
    { id: 'E', x: 400, y: 400, label: 'E', state: 'normal' as const },
    { id: 'F', x: 550, y: 250, label: 'F', state: 'normal' as const },
  ],
  edges: [
    { from: 'A', to: 'B', state: 'normal' as const },
    { from: 'A', to: 'C', state: 'normal' as const },
    { from: 'B', to: 'D', state: 'normal' as const },
    { from: 'C', to: 'E', state: 'normal' as const },
    { from: 'D', to: 'F', state: 'normal' as const },
    { from: 'E', to: 'F', state: 'normal' as const },
    { from: 'B', to: 'C', state: 'normal' as const },
  ],
  adj: {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'C'],
    'C': ['A', 'B', 'E'],
    'D': ['B', 'F'],
    'E': ['C', 'F'],
    'F': ['D', 'E'],
  }
};

export const ModernGraphTraversalVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [graph, setGraph] = useState(sampleGraph);
  const [algorithm, setAlgorithm] = useState<TraversalAlgorithm>('bfs');
  const [startNode, setStartNode] = useState<string | number>('A');
  const [steps, setSteps] = useState<GraphTraversalStep[]>([]);
  const [speed, setSpeed] = useState(800);
  const [isGenerating, setIsGenerating] = useState(false);

  const animation = useAnimation(steps.length, speed);

  const generateSteps = useCallback(() => {
    setIsGenerating(true);
    animation.reset();
    setSteps([]);
    const newSteps: GraphTraversalStep[] = [];
    
    const initialNodes = graph.nodes.map(n => ({ ...n, state: 'normal' as const }));
    const initialEdges = graph.edges.map(e => ({ ...e, state: 'normal' as const }));

    const addStep = (
      nodes: GraphNodeData[], 
      edges: GraphEdgeData[], 
      currentNodeId: string | number | null, 
      structure: (string|number)[], 
      description: string
    ) => {
      newSteps.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges)),
        currentNodeId,
        queue: algorithm === 'bfs' ? [...structure] : [],
        stack: algorithm === 'dfs' ? [...structure] : [],
        description,
      });
    };

    addStep(initialNodes, initialEdges, null, [], `Starting ${algorithm.toUpperCase()} from node ${startNode}.`);

    if (algorithm === 'bfs') {
      const q: (string|number)[] = [startNode];
      const visited = new Set<string|number>([startNode]);
      
      const nodeMap = new Map(initialNodes.map(n => [n.id, n]));
      nodeMap.get(startNode)!.state = 'in-queue';
      addStep(Array.from(nodeMap.values()), initialEdges, null, q, `Adding start node ${startNode} to the queue.`);

      while (q.length > 0) {
        const u = q.shift()!;
        const uNode = nodeMap.get(u)!;
        uNode.state = 'current';
        addStep(Array.from(nodeMap.values()), initialEdges, u, q, `Processing node ${u}.`);

        for (const v of graph.adj[u as keyof typeof graph.adj]) {
          if (!visited.has(v)) {
            visited.add(v);
            q.push(v);
            const vNode = nodeMap.get(v)!;
            vNode.state = 'in-queue';
            addStep(Array.from(nodeMap.values()), initialEdges, u, q, `Visiting neighbor ${v}, adding to queue.`);
          }
        }
        uNode.state = 'visited';
        addStep(Array.from(nodeMap.values()), initialEdges, u, q, `Finished processing node ${u}.`);
      }
    } else { // dfs
      const s: (string|number)[] = [startNode];
      const visited = new Set<string|number>();
      
      const nodeMap = new Map(initialNodes.map(n => [n.id, n]));
      addStep(initialNodes, initialEdges, null, s, `Adding start node ${startNode} to the stack.`);

      while (s.length > 0) {
        const u = s.pop()!;
        
        if (visited.has(u)) {
          addStep(Array.from(nodeMap.values()), initialEdges, u, s, `Node ${u} already visited, skipping.`);
          continue;
        }

        visited.add(u);
        const uNode = nodeMap.get(u)!;
        uNode.state = 'current';
        addStep(Array.from(nodeMap.values()), initialEdges, u, s, `Processing node ${u}.`);

        for (const v of [...graph.adj[u as keyof typeof graph.adj]].reverse()) {
            s.push(v);
            const vNode = nodeMap.get(v)!;
            if(vNode.state === 'normal') vNode.state = 'in-queue';
            addStep(Array.from(nodeMap.values()), initialEdges, u, s, `Adding neighbor ${v} to stack.`);
        }
        uNode.state = 'visited';
      }
    }

    addStep(newSteps[newSteps.length-1].nodes.map(n => ({...n, state: 'visited' as const})), initialEdges, null, [], `${algorithm.toUpperCase()} complete.`);
    setSteps(newSteps);
    setIsGenerating(false);
  }, [algorithm, startNode, graph]);

  useEffect(() => {
    generateSteps();
  }, [algorithm, startNode, graph]);

  const { nodes, edges, description, queue, stack } = useMemo(() => {
    if (!steps.length || animation.currentStep >= steps.length) {
      return { nodes: graph.nodes, edges: graph.edges, description: 'Select an algorithm and start node.', queue: [], stack: [] };
    }
    return steps[animation.currentStep];
  }, [steps, animation.currentStep, graph]);

  const controls = {
    isPlaying: animation.isPlaying,
    onPlay: animation.play,
    onPause: animation.pause,
    onReset: generateSteps,
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
      <Select value={algorithm} onValueChange={(v) => setAlgorithm(v as TraversalAlgorithm)} disabled={isGenerating || animation.isPlaying}>
        <SelectTrigger className="w-[180px]">
          <BrainCircuit className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Algorithm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bfs">Breadth-First Search</SelectItem>
          <SelectItem value="dfs">Depth-First Search</SelectItem>
        </SelectContent>
      </Select>
      <Select value={startNode as string} onValueChange={(v) => setStartNode(v)} disabled={isGenerating || animation.isPlaying}>
        <SelectTrigger className="w-[180px]">
          <Waypoints className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Start Node" />
        </SelectTrigger>
        <SelectContent>
          {graph.nodes.map(n => <SelectItem key={n.id} value={n.id as string}>{`Start at ${n.label}`}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );

  const structureTitle = algorithm === 'bfs' ? 'Queue' : 'Stack';
  const structureData = algorithm === 'bfs' ? queue : stack;

  return (
    <ModernVisualizationBase
      title={GRAPH_INFO.name}
      description={GRAPH_INFO.description}
      complexity={GRAPH_INFO.complexity}
      difficulty={GRAPH_INFO.difficulty}
      category={GRAPH_INFO.category}
      educational={GRAPH_INFO.educational}
      controls={controls}
      interactiveControls={interactiveControls}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div 
          className="w-full p-4 rounded-lg text-center transition-colors duration-300"
          style={{ 
            backgroundColor: currentTheme.colors.surface,
            border: `1px solid ${currentTheme.colors.border}`
          }}
        >
          <p className="text-md font-semibold" style={{ color: currentTheme.colors.text }}>
            {description}
          </p>
        </div>
        <ModernGraphVisualization nodes={nodes} edges={edges} />
        <div className="w-full p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.surface, border: `1px solid ${currentTheme.colors.border}`}}>
          <h3 className="text-lg font-bold mb-2" style={{ color: currentTheme.colors.text }}>{structureTitle}</h3>
          <div className="flex gap-2 flex-wrap">
            <AnimatePresence>
              {structureData.map((item, index) => (
                <motion.div
                  key={item as string}
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 flex items-center justify-center rounded-md font-bold text-white"
                  style={{ backgroundColor: currentTheme.colors.primary }}
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernGraphTraversalVisualization;
