import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import ModernCanvas from './ModernCanvas';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RefreshCw } from 'lucide-react';
import { dijkstra } from '@/lib/algorithms/graph/dijkstra';
import { prim } from '@/lib/algorithms/graph/prim';
import { GraphNode, GraphEdge } from '@/types/graph';
import { useToast } from '@/components/ui/use-toast';

type AlgorithmType = 'dijkstra' | 'prim';

const ModernAdvancedGraphVisualization: React.FC = () => {
  const { toast } = useToast();
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('dijkstra');
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  
  const [visitedNodes, setVisitedNodes] = useState<Set<number>>(new Set());
  const [edgeStates, setEdgeStates] = useState<Map<string, 'default' | 'visited' | 'active'>>(new Map());
  const [distances, setDistances] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateGraph = (algo: AlgorithmType) => {
    const numNodes = 7;
    const newNodes: GraphNode[] = Array.from({ length: numNodes }, (_, i) => ({
      id: i,
      x: 100 + (i % 3) * 250 + (i > 4 ? 125 : 0),
      y: 150 + Math.floor(i / 3) * 150,
      label: `${i}`,
    }));

    let newEdges: GraphEdge[] = [
      { source: 0, target: 1, weight: 2 }, { source: 0, target: 2, weight: 6 },
      { source: 1, target: 3, weight: 5 }, { source: 2, target: 3, weight: 8 },
      { source: 3, target: 4, weight: 10 }, { source: 3, target: 5, weight: 15 },
      { source: 4, target: 5, weight: 6 }, { source: 4, target: 6, weight: 2 },
      { source: 5, target: 6, weight: 6 },
    ];
    
    if (algo === 'prim') {
      // Prim works on undirected graphs, so we add reverse edges
      newEdges = [...newEdges, ...newEdges.map(e => ({ source: e.target, target: e.source, weight: e.weight }))]
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setVisitedNodes(new Set());
    setEdgeStates(new Map());
    setDistances(Array(numNodes).fill(Infinity));
  };
  
  useEffect(() => {
    generateGraph(algorithm);
  }, [algorithm]);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const runAlgorithm = async () => {
    setIsAnimating(true);
    setVisitedNodes(new Set());
    setEdgeStates(new Map());
    
    const startNode = 0;
    const numNodes = nodes.length;
    const adj = new Map<number, { to: number; weight: number }[]>();
    for(let i=0; i<numNodes; i++) adj.set(i, []);
    edges.forEach(e => adj.get(e.source)?.push({ to: e.target, weight: e.weight || 0 }));

    if (algorithm === 'dijkstra') {
      const { distances: finalDistances, steps } = dijkstra(numNodes, adj, startNode);
      setDistances(finalDistances);

      for (const step of steps) {
        if (step.type === 'visit') {
          setVisitedNodes(prev => new Set(prev).add(step.node));
          setDistances(prev => {
            const newDist = [...prev];
            newDist[step.node] = step.distance;
            return newDist;
          });
        }
        await delay(500);
      }
      toast({ title: "Dijkstra's Complete", description: "Shortest paths from source 0 calculated." });

    } else { // prim
      const { mstEdges, steps } = prim(numNodes, adj, startNode);
      
      for (const step of steps) {
        if (step.type === 'visit') {
          setVisitedNodes(prev => new Set(prev).add(step.node));
        } else if (step.type === 'edge') {
          const edgeKey = `${step.from}-${step.to}`;
          const reverseKey = `${step.to}-${step.from}`;
          setEdgeStates(prev => new Map(prev).set(edgeKey, 'active').set(reverseKey, 'active'));
          await delay(300);
          setEdgeStates(prev => new Map(prev).set(edgeKey, 'visited').set(reverseKey, 'visited'));
        }
        await delay(400);
      }
      
      const finalMstStates = new Map<string, 'default' | 'visited' | 'active'>();
      mstEdges.forEach(edge => {
        finalMstStates.set(`${edge.source}-${edge.target}`, 'visited');
        finalMstStates.set(`${edge.target}-${edge.source}`, 'visited');
      });
      setEdgeStates(finalMstStates);

      toast({ title: "Prim's Complete", description: "Minimum Spanning Tree found." });
    }
    setIsAnimating(false);
  };

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      if (!sourceNode || !targetNode) return;

      const edgeKey = `${edge.source}-${edge.target}`;
      const state = edgeStates.get(edgeKey);

      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      
      ctx.lineWidth = state === 'visited' ? 4 : (state === 'active' ? 2 : 1);
      ctx.strokeStyle = state === 'visited' ? '#48BB78' : (state === 'active' ? '#F6E05E' : '#4A5568');
      ctx.stroke();

      const midX = (sourceNode.x + targetNode.x) / 2;
      const midY = (sourceNode.y + targetNode.y) / 2;
      ctx.fillStyle = '#A0AEC0';
      ctx.font = '12px sans-serif';
      ctx.fillText(`${edge.weight}`, midX, midY - 5);
    });

    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = visitedNodes.has(node.id) ? '#4299E1' : '#2D3748';
      ctx.fill();
      ctx.strokeStyle = '#A0AEC0';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.fillStyle = 'white';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label || node.id.toString(), node.x, node.y);

      if (algorithm === 'dijkstra' && distances[node.id] !== undefined) {
        ctx.fillStyle = '#F6E05E';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(distances[node.id] === Infinity ? '∞' : `${distances[node.id]}`, node.x, node.y + 30);
      }
    });
  }, [nodes, edges, visitedNodes, edgeStates, distances, algorithm]);

  const controls = (
    <Card className="bg-gray-800/50">
      <CardHeader><CardTitle className="text-base">Controls</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <Select value={algorithm} onValueChange={(v: AlgorithmType) => setAlgorithm(v)}>
          <SelectTrigger><SelectValue placeholder="Select Algorithm" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="dijkstra">Dijkstra's Shortest Path</SelectItem>
            <SelectItem value="prim">Prim's MST</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button onClick={runAlgorithm} disabled={isAnimating} className="w-full"><Play className="w-4 h-4 mr-2"/>Run</Button>
          <Button onClick={() => generateGraph(algorithm)} disabled={isAnimating} variant="outline"><RefreshCw className="w-4 h-4"/></Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ModernVisualizationBase
      title="Shortest Path & MST"
      description="Visualizations for classic graph algorithms: Dijkstra's for shortest paths and Prim's for Minimum Spanning Trees (MST)."
      difficulty="Intermediate"
      category="Graph Algorithms"
      complexity={{
        time: "Dijkstra: O(E log V), Prim: O(E log V)",
        space: "O(V + E)",
      }}
      interactiveControls={controls}
    >
      <ModernCanvas draw={draw} />
    </ModernVisualizationBase>
  );
};

export default ModernAdvancedGraphVisualization;
