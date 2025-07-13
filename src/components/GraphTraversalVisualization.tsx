
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { Canvas } from './Canvas';

interface Node {
  id: number;
  x: number;
  y: number;
  visited: boolean;
  current: boolean;
  inQueue: boolean;
}

interface Edge {
  from: number;
  to: number;
  traversed: boolean;
}

interface TraversalStep {
  nodes: Node[];
  edges: Edge[];
  queue: number[];
  visited: number[];
  current: number;
  step: number;
}

export const GraphTraversalVisualization = () => {
  const [algorithm, setAlgorithm] = useState<'bfs' | 'dfs'>('bfs');
  const [steps, setSteps] = useState<TraversalStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalRef, setIntervalRef] = useState<NodeJS.Timeout | null>(null);

  const initialNodes: Node[] = [
    { id: 0, x: 150, y: 100, visited: false, current: false, inQueue: false },
    { id: 1, x: 300, y: 50, visited: false, current: false, inQueue: false },
    { id: 2, x: 300, y: 150, visited: false, current: false, inQueue: false },
    { id: 3, x: 450, y: 100, visited: false, current: false, inQueue: false },
    { id: 4, x: 150, y: 250, visited: false, current: false, inQueue: false },
    { id: 5, x: 300, y: 300, visited: false, current: false, inQueue: false }
  ];

  const initialEdges: Edge[] = [
    { from: 0, to: 1, traversed: false },
    { from: 0, to: 2, traversed: false },
    { from: 1, to: 3, traversed: false },
    { from: 2, to: 3, traversed: false },
    { from: 2, to: 5, traversed: false },
    { from: 4, to: 0, traversed: false },
    { from: 4, to: 5, traversed: false }
  ];

  const getAdjacencyList = () => {
    const adj: number[][] = Array.from({ length: initialNodes.length }, () => []);
    initialEdges.forEach(edge => {
      adj[edge.from].push(edge.to);
      adj[edge.to].push(edge.from);
    });
    return adj;
  };

  const performTraversal = () => {
    const traversalSteps: TraversalStep[] = [];
    const adj = getAdjacencyList();
    const visited = new Set<number>();
    let stepCount = 0;

    const createStep = (queue: number[], current: number, visitedNodes: Set<number>) => {
      const nodes = initialNodes.map(node => ({
        ...node,
        visited: visitedNodes.has(node.id),
        current: node.id === current,
        inQueue: queue.includes(node.id)
      }));

      const edges = initialEdges.map(edge => ({
        ...edge,
        traversed: visitedNodes.has(edge.from) && visitedNodes.has(edge.to)
      }));

      traversalSteps.push({
        nodes,
        edges,
        queue: [...queue],
        visited: Array.from(visitedNodes),
        current,
        step: stepCount++
      });
    };

    if (algorithm === 'bfs') {
      const queue = [0];
      visited.add(0);
      createStep(queue, 0, visited);

      while (queue.length > 0) {
        const current = queue.shift()!;
        createStep(queue, current, visited);

        for (const neighbor of adj[current]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
            createStep(queue, current, visited);
          }
        }
      }
    } else {
      // DFS
      const stack = [0];
      const stackVisited = new Set<number>();

      const dfs = (node: number) => {
        if (stackVisited.has(node)) return;
        
        stackVisited.add(node);
        visited.add(node);
        createStep([...stack], node, visited);

        for (const neighbor of adj[node]) {
          if (!stackVisited.has(neighbor)) {
            stack.push(neighbor);
            dfs(neighbor);
            if (stack.length > 0) stack.pop();
          }
        }
      };

      dfs(0);
    }

    setSteps(traversalSteps);
    setCurrentStep(0);
  };

  const play = () => {
    if (steps.length === 0) return;
    
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    setIntervalRef(interval);
  };

  const pause = () => {
    setIsPlaying(false);
    if (intervalRef) {
      clearInterval(intervalRef);
      setIntervalRef(null);
    }
  };

  const reset = () => {
    pause();
    setCurrentStep(0);
    setSteps([]);
  };

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderGraph = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (steps.length === 0) {
      // Draw initial graph
      initialEdges.forEach(edge => {
        const fromNode = initialNodes[edge.from];
        const toNode = initialNodes[edge.to];
        
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      });

      initialNodes.forEach(node => {
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.id.toString(), node.x, node.y + 5);
      });
      return;
    }

    const step = steps[currentStep];

    // Draw edges
    step.edges.forEach(edge => {
      const fromNode = step.nodes[edge.from];
      const toNode = step.nodes[edge.to];
      
      ctx.strokeStyle = edge.traversed ? '#22c55e' : '#6b7280';
      ctx.lineWidth = edge.traversed ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();
    });

    // Draw nodes
    step.nodes.forEach(node => {
      let fillColor = '#3b82f6';
      if (node.current) fillColor = '#f59e0b';
      else if (node.visited) fillColor = '#22c55e';
      else if (node.inQueue) fillColor = '#8b5cf6';

      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.id.toString(), node.x, node.y + 5);
    });

    // Draw queue/stack info
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    const queueText = algorithm === 'bfs' ? 'Queue: ' : 'Stack: ';
    ctx.fillText(queueText + step.queue.join(', '), 50, 350);
    ctx.fillText('Visited: ' + step.visited.join(', '), 50, 370);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Select value={algorithm} onValueChange={(value: 'bfs' | 'dfs') => setAlgorithm(value)}>
            <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bfs">Breadth-First Search</SelectItem>
              <SelectItem value="dfs">Depth-First Search</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={performTraversal} 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Start {algorithm.toUpperCase()}
          </Button>
        </div>

        {steps.length > 0 && (
          <div className="flex items-center gap-2">
            <Button 
              onClick={isPlaying ? pause : play}
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
              disabled={currentStep >= steps.length - 1}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button 
              onClick={stepBackward}
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
              disabled={currentStep <= 0}
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              onClick={stepForward}
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
              disabled={currentStep >= steps.length - 1}
            >
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button 
              onClick={reset}
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {steps.length > 0 && (
        <div className="flex gap-6 text-white">
          <div className="bg-white/10 rounded-lg px-4 py-2">
            <span className="text-white/70">Step:</span>
            <span className="ml-2 font-semibold">{currentStep + 1} / {steps.length}</span>
          </div>
          <div className="bg-white/10 rounded-lg px-4 py-2">
            <span className="text-white/70">Algorithm:</span>
            <span className="ml-2 font-semibold">{algorithm.toUpperCase()}</span>
          </div>
        </div>
      )}

      <div className="bg-white/5 rounded-lg p-4">
        <Canvas
          width={600}
          height={400}
          onRender={renderGraph}
          className="border border-white/20 rounded mx-auto"
        />
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Unvisited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span>In Queue/Stack</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Visited</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Graph Traversal Algorithms</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
          <div>
            <h4 className="font-semibold text-white mb-2">BFS (Breadth-First Search)</h4>
            <p>• Uses a queue (FIFO)</p>
            <p>• Explores level by level</p>
            <p>• Finds shortest path</p>
            <p>• Time: O(V + E) | Space: O(V)</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">DFS (Depth-First Search)</h4>
            <p>• Uses a stack (LIFO)</p>
            <p>• Explores as deep as possible</p>
            <p>• Good for topological sorting</p>
            <p>• Time: O(V + E) | Space: O(V)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
