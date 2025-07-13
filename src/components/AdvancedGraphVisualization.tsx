
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Canvas } from './Canvas';
import { useAnimation } from '@/hooks/useAnimation';

interface GraphNode {
  id: string;
  x: number;
  y: number;
  isStart?: boolean;
  isEnd?: boolean;
  distance: number;
  visited: boolean;
  previous: string | null;
}

interface GraphEdge {
  from: string;
  to: string;
  weight: number;
  isHighlighted?: boolean;
  isInMST?: boolean;
}

interface AlgorithmStep {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
  currentNode?: string;
  algorithm: string;
  description: string;
}

export const AdvancedGraphVisualization = () => {
  const [nodes, setNodes] = useState<Map<string, GraphNode>>(new Map());
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [algorithm, setAlgorithm] = useState<'dijkstra' | 'mst'>('dijkstra');
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');

  const animation = useAnimation(steps.length, 500);

  const initializeDefaultGraph = () => {
    const defaultNodes = new Map<string, GraphNode>([
      ['A', { id: 'A', x: 100, y: 100, distance: Infinity, visited: false, previous: null }],
      ['B', { id: 'B', x: 300, y: 100, distance: Infinity, visited: false, previous: null }],
      ['C', { id: 'C', x: 500, y: 100, distance: Infinity, visited: false, previous: null }],
      ['D', { id: 'D', x: 200, y: 250, distance: Infinity, visited: false, previous: null }],
      ['E', { id: 'E', x: 400, y: 250, distance: Infinity, visited: false, previous: null }],
    ]);

    const defaultEdges: GraphEdge[] = [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'D', weight: 2 },
      { from: 'B', to: 'C', weight: 3 },
      { from: 'B', to: 'D', weight: 1 },
      { from: 'B', to: 'E', weight: 7 },
      { from: 'C', to: 'E', weight: 2 },
      { from: 'D', to: 'E', weight: 5 },
    ];

    setNodes(defaultNodes);
    setEdges(defaultEdges);
    setStartNode('A');
    setEndNode('C');
  };

  const dijkstraAlgorithm = (start: string, end: string): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const nodesCopy = new Map(nodes);
    const unvisited = new Set(nodesCopy.keys());
    
    // Initialize
    nodesCopy.get(start)!.distance = 0;
    nodesCopy.get(start)!.isStart = true;
    nodesCopy.get(end)!.isEnd = true;

    steps.push({
      nodes: new Map(nodesCopy),
      edges: [...edges],
      algorithm: 'Dijkstra',
      description: `Initialize: Set distance to ${start} as 0, all others as infinity`
    });

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      let current = '';
      let minDistance = Infinity;
      
      unvisited.forEach(nodeId => {
        const node = nodesCopy.get(nodeId)!;
        if (node.distance < minDistance) {
          minDistance = node.distance;
          current = nodeId;
        }
      });

      if (minDistance === Infinity) break;

      const currentNode = nodesCopy.get(current)!;
      currentNode.visited = true;
      unvisited.delete(current);

      steps.push({
        nodes: new Map(nodesCopy),
        edges: [...edges],
        currentNode: current,
        algorithm: 'Dijkstra',
        description: `Visit ${current} with distance ${currentNode.distance}`
      });

      // Update neighbors
      edges.forEach(edge => {
        let neighbor = '';
        if (edge.from === current) neighbor = edge.to;
        else if (edge.to === current) neighbor = edge.from;
        
        if (neighbor && unvisited.has(neighbor)) {
          const neighborNode = nodesCopy.get(neighbor)!;
          const newDistance = currentNode.distance + edge.weight;
          
          if (newDistance < neighborNode.distance) {
            neighborNode.distance = newDistance;
            neighborNode.previous = current;
            
            steps.push({
              nodes: new Map(nodesCopy),
              edges: edges.map(e => ({
                ...e,
                isHighlighted: e === edge
              })),
              currentNode: current,
              algorithm: 'Dijkstra',
              description: `Update ${neighbor}: distance = ${newDistance}`
            });
          }
        }
      });

      if (current === end) break;
    }

    return steps;
  };

  const kruskalMST = (): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = [];
    const nodesCopy = new Map(nodes);
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    const mstEdges: GraphEdge[] = [];
    
    // Union-Find data structure
    const parent = new Map<string, string>();
    const rank = new Map<string, number>();
    
    // Initialize Union-Find
    nodesCopy.forEach((_, nodeId) => {
      parent.set(nodeId, nodeId);
      rank.set(nodeId, 0);
    });

    const find = (x: string): string => {
      if (parent.get(x) !== x) {
        parent.set(x, find(parent.get(x)!));
      }
      return parent.get(x)!;
    };

    const union = (x: string, y: string): boolean => {
      const rootX = find(x);
      const rootY = find(y);
      
      if (rootX === rootY) return false;
      
      const rankX = rank.get(rootX)!;
      const rankY = rank.get(rootY)!;
      
      if (rankX < rankY) {
        parent.set(rootX, rootY);
      } else if (rankX > rankY) {
        parent.set(rootY, rootX);
      } else {
        parent.set(rootY, rootX);
        rank.set(rootX, rankX + 1);
      }
      
      return true;
    };

    steps.push({
      nodes: new Map(nodesCopy),
      edges: [...edges],
      algorithm: 'Kruskal MST',
      description: 'Initialize: Sort edges by weight'
    });

    for (const edge of sortedEdges) {
      const highlightedEdges = edges.map(e => ({
        ...e,
        isHighlighted: e === edge,
        isInMST: mstEdges.some(mst => 
          (mst.from === e.from && mst.to === e.to) || 
          (mst.from === e.to && mst.to === e.from)
        )
      }));

      steps.push({
        nodes: new Map(nodesCopy),
        edges: highlightedEdges,
        algorithm: 'Kruskal MST',
        description: `Consider edge ${edge.from}-${edge.to} (weight: ${edge.weight})`
      });

      if (union(edge.from, edge.to)) {
        mstEdges.push({ ...edge, isInMST: true });
        
        steps.push({
          nodes: new Map(nodesCopy),
          edges: edges.map(e => ({
            ...e,
            isInMST: mstEdges.some(mst => 
              (mst.from === e.from && mst.to === e.to) || 
              (mst.from === e.to && mst.to === e.from)
            )
          })),
          algorithm: 'Kruskal MST',
          description: `Add edge ${edge.from}-${edge.to} to MST`
        });

        if (mstEdges.length === nodesCopy.size - 1) break;
      }
    }

    return steps;
  };

  const runAlgorithm = () => {
    if (algorithm === 'dijkstra' && startNode && endNode) {
      const algorithmSteps = dijkstraAlgorithm(startNode, endNode);
      setSteps(algorithmSteps);
      animation.reset();
    } else if (algorithm === 'mst') {
      const algorithmSteps = kruskalMST();
      setSteps(algorithmSteps);
      animation.reset();
    }
  };

  const renderGraph = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const currentStep = steps[animation.currentStep];
    const currentNodes = currentStep?.nodes || nodes;
    const currentEdges = currentStep?.edges || edges;

    // Draw edges
    currentEdges.forEach(edge => {
      const fromNode = currentNodes.get(edge.from);
      const toNode = currentNodes.get(edge.to);
      
      if (!fromNode || !toNode) return;

      ctx.strokeStyle = edge.isInMST ? '#22c55e' : 
                      edge.isHighlighted ? '#f59e0b' : '#64748b';
      ctx.lineWidth = edge.isInMST ? 4 : edge.isHighlighted ? 3 : 2;
      
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();

      // Draw weight
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      
      ctx.fillStyle = 'white';
      ctx.fillRect(midX - 15, midY - 10, 30, 20);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.strokeRect(midX - 15, midY - 10, 30, 20);
      
      ctx.fillStyle = '#1e293b';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(edge.weight.toString(), midX, midY);
    });

    // Draw nodes
    currentNodes.forEach(node => {
      // Determine node color
      let fillColor = '#3b82f6';
      if (node.isStart) fillColor = '#22c55e';
      else if (node.isEnd) fillColor = '#ef4444';
      else if (node.visited) fillColor = '#8b5cf6';
      else if (currentStep?.currentNode === node.id) fillColor = '#f59e0b';

      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw node ID
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id, node.x, node.y);

      // Draw distance for Dijkstra
      if (algorithm === 'dijkstra' && node.distance !== Infinity) {
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Arial';
        ctx.fillText(node.distance.toString(), node.x, node.y + 40);
      }
    });

    // Draw algorithm info
    if (currentStep) {
      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(currentStep.algorithm, 20, 30);
      
      ctx.font = '14px Arial';
      ctx.fillText(currentStep.description, 20, 50);
    }
  }, [nodes, edges, steps, animation.currentStep, algorithm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button 
          onClick={initializeDefaultGraph}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Load Sample Graph
        </Button>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => setAlgorithm('dijkstra')}
            variant={algorithm === 'dijkstra' ? 'default' : 'outline'}
            className={algorithm === 'dijkstra' 
              ? 'bg-white text-black' 
              : 'border-white/30 text-white hover:bg-white/10'
            }
          >
            Dijkstra
          </Button>
          <Button 
            onClick={() => setAlgorithm('mst')}
            variant={algorithm === 'mst' ? 'default' : 'outline'}
            className={algorithm === 'mst' 
              ? 'bg-white text-black' 
              : 'border-white/30 text-white hover:bg-white/10'
            }
          >
            MST (Kruskal)
          </Button>
        </div>
        
        {algorithm === 'dijkstra' && (
          <div className="flex items-center gap-2">
            <Input
              value={startNode}
              onChange={(e) => setStartNode(e.target.value.toUpperCase())}
              placeholder="Start"
              className="w-20 bg-white/10 border-white/30 text-white placeholder:text-white/50"
            />
            <Input
              value={endNode}
              onChange={(e) => setEndNode(e.target.value.toUpperCase())}
              placeholder="End"
              className="w-20 bg-white/10 border-white/30 text-white placeholder:text-white/50"
            />
          </div>
        )}
        
        <Button 
          onClick={runAlgorithm}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Run Algorithm
        </Button>
      </div>

      {steps.length > 0 && (
        <div className="flex items-center gap-4">
          <Button 
            onClick={animation.isPlaying ? animation.pause : animation.play}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            {animation.isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button 
            onClick={animation.stepBackward}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
            disabled={animation.currentStep <= 0}
          >
            Previous
          </Button>
          <Button 
            onClick={animation.stepForward}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
            disabled={animation.currentStep >= steps.length - 1}
          >
            Next
          </Button>
          <Button 
            onClick={animation.reset}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            Reset
          </Button>
          <div className="text-white">
            Step: {animation.currentStep + 1} / {steps.length}
          </div>
        </div>
      )}

      <Canvas
        width={600}
        height={350}
        onRender={renderGraph}
        className="border border-white/20 rounded-lg bg-white/5"
      />

      <div className="flex flex-wrap gap-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Start Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>End Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span>Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-green-500"></div>
          <span>MST Edge</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Algorithm Information</h3>
        <div className="space-y-2 text-sm text-white/80">
          {algorithm === 'dijkstra' ? (
            <>
              <p><strong>Dijkstra's Algorithm:</strong> Finds shortest path from source to all vertices</p>
              <p>• Time Complexity: O((V + E) log V) with priority queue</p>
              <p>• Space Complexity: O(V)</p>
              <p>• Works with non-negative edge weights only</p>
            </>
          ) : (
            <>
              <p><strong>Kruskal's MST:</strong> Finds minimum spanning tree using Union-Find</p>
              <p>• Time Complexity: O(E log E) for sorting edges</p>
              <p>• Space Complexity: O(V) for Union-Find structure</p>
              <p>• Produces tree connecting all vertices with minimum total weight</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
