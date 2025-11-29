import React, { useState, useCallback, useMemo } from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import ModernCanvas from './ModernCanvas';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RefreshCw, StepForward } from 'lucide-react';
import { tarjan } from '@/lib/algorithms/graph/tarjan';
import { fordFulkerson } from '@/lib/algorithms/graph/fordFulkerson';
import { GraphNode, GraphEdge } from '@/types/graph';
import { useToast } from '@/components/ui/use-toast';

type AlgorithmType = 'scc' | 'max-flow';

const ModernAdvancedGraphAlgorithms: React.FC = () => {
  const { toast } = useToast();
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('scc');
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 0, x: 100, y: 200, label: '0' },
    { id: 1, x: 250, y: 100, label: '1' },
    { id: 2, x: 250, y: 300, label: '2' },
    { id: 3, x: 400, y: 200, label: '3' },
    { id: 4, x: 550, y: 100, label: '4' },
    { id: 5, x: 550, y: 300, label: '5' },
    { id: 6, x: 700, y: 200, label: '6' },
    { id: 7, x: 400, y: 50, label: '7' },
  ]);
  const [edges, setEdges] = useState<GraphEdge[]>([
    { source: 0, target: 1, weight: 16, capacity: 16, flow: 0 },
    { source: 0, target: 2, weight: 13, capacity: 13, flow: 0 },
    { source: 1, target: 2, weight: 10, capacity: 10, flow: 0 },
    { source: 1, target: 3, weight: 12, capacity: 12, flow: 0 },
    { source: 2, target: 1, weight: 4, capacity: 4, flow: 0 },
    { source: 2, target: 4, weight: 14, capacity: 14, flow: 0 },
    { source: 3, target: 2, weight: 9, capacity: 9, flow: 0 },
    { source: 3, target: 5, weight: 20, capacity: 20, flow: 0 },
    { source: 4, target: 3, weight: 7, capacity: 7, flow: 0 },
    { source: 4, target: 6, weight: 4, capacity: 4, flow: 0 },
    { source: 5, target: 4, weight: 0, capacity: 0, flow: 0 }, // Placeholder
    { source: 5, target: 6, weight: 0, capacity: 0, flow: 0 }, // Placeholder
    { source: 7, target: 1, weight: 0, capacity: 0, flow: 0 }, // Placeholder
  ]);

  const [scc, setScc] = useState<number[][]>([]);
  const [maxFlow, setMaxFlow] = useState<number>(0);
  const [residualEdges, setResidualEdges] = useState<GraphEdge[]>([]);

  const resetGraphForAlgorithm = (algo: AlgorithmType) => {
    setScc([]);
    setMaxFlow(0);
    setResidualEdges([]);
    if (algo === 'scc') {
      setEdges([
        { source: 0, target: 1 }, { source: 1, target: 2 }, { source: 2, target: 0 },
        { source: 1, target: 3 }, { source: 3, target: 4 }, { source: 4, target: 5 },
        { source: 5, target: 3 }, { source: 6, target: 5 }, { source: 6, target: 7 },
        { source: 7, target: 6 },
      ]);
    } else { // max-flow
      setEdges([
        { source: 0, target: 1, capacity: 10, flow: 0 }, { source: 0, target: 2, capacity: 5, flow: 0 },
        { source: 1, target: 3, capacity: 5, flow: 0 }, { source: 1, target: 2, capacity: 15, flow: 0 },
        { source: 2, target: 3, capacity: 10, flow: 0 },
      ]);
      setNodes([
        { id: 0, x: 100, y: 200, label: 'S' }, { id: 1, x: 300, y: 100, label: 'A' },
        { id: 2, x: 300, y: 300, label: 'B' }, { id: 3, x: 500, y: 200, label: 'T' },
      ]);
    }
  };

  const runAlgorithm = () => {
    const numNodes = nodes.length;
    const adj = Array.from({ length: numNodes }, () => []);
    edges.forEach(edge => {
      if (edge.source < numNodes && edge.target < numNodes) {
        adj[edge.source].push(edge.target);
      }
    });

    if (algorithm === 'scc') {
      const { sccs } = tarjan(numNodes, adj);
      setScc(sccs);
      toast({ title: "Tarjan's Algorithm Complete", description: `Found ${sccs.length} strongly connected components.` });
    } else { // max-flow
      const source = 0;
      const sink = nodes.length - 1;
      const capacityMatrix = Array.from({ length: numNodes }, () => Array(numNodes).fill(0));
      edges.forEach(e => {
        if (e.source < numNodes && e.target < numNodes) {
          capacityMatrix[e.source][e.target] = e.capacity || 0;
        }
      });
      const { maxFlow, residualGraph } = fordFulkerson(numNodes, capacityMatrix, source, sink);
      setMaxFlow(maxFlow);
      
      const resEdges: GraphEdge[] = [];
      for (let u = 0; u < numNodes; u++) {
        for (let v = 0; v < numNodes; v++) {
          if (capacityMatrix[u][v] > 0) {
            const flow = capacityMatrix[u][v] - residualGraph[u][v];
            resEdges.push({ source: u, target: v, capacity: capacityMatrix[u][v], flow });
          }
        }
      }
      setResidualEdges(resEdges);
      toast({ title: "Ford-Fulkerson Complete", description: `Maximum flow is ${maxFlow}.` });
    }
  };

  const sccColors = useMemo(() => ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA', '#F0CF65', '#FFD166', '#06D6A0'], []);
  const nodeColors = useMemo(() => {
    const colors = new Map<number, string>();
    if (algorithm === 'scc' && scc.length > 0) {
      scc.forEach((component, i) => {
        component.forEach(nodeId => {
          colors.set(nodeId, sccColors[i % sccColors.length]);
        });
      });
    }
    return colors;
  }, [scc, algorithm, sccColors]);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    const currentEdges = algorithm === 'max-flow' && residualEdges.length > 0 ? residualEdges : edges;

    currentEdges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      if (!sourceNode || !targetNode) return;

      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      ctx.strokeStyle = '#4A5568';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Arrowhead
      const angle = Math.atan2(targetNode.y - sourceNode.y, targetNode.x - sourceNode.x);
      ctx.save();
      ctx.translate(targetNode.x, targetNode.y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(-10, -5);
      ctx.lineTo(0, 0);
      ctx.lineTo(-10, 5);
      ctx.strokeStyle = '#4A5568';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Label for max-flow
      if (algorithm === 'max-flow') {
        const midX = (sourceNode.x + targetNode.x) / 2;
        const midY = (sourceNode.y + targetNode.y) / 2;
        ctx.fillStyle = '#A0AEC0';
        ctx.font = '12px sans-serif';
        ctx.fillText(`${edge.flow ?? 0} / ${edge.capacity ?? 0}`, midX, midY - 5);
      }
    });

    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = nodeColors.get(node.id) || '#2D3748';
      ctx.fill();
      ctx.strokeStyle = '#A0AEC0';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label || node.id.toString(), node.x, node.y);
    });
  }, [nodes, edges, algorithm, residualEdges, nodeColors]);

  const controls = (
    <Card className="bg-gray-800/50">
      <CardHeader><CardTitle className="text-base">Controls</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <Select value={algorithm} onValueChange={(v: AlgorithmType) => { setAlgorithm(v); resetGraphForAlgorithm(v); }}>
          <SelectTrigger><SelectValue placeholder="Select Algorithm" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="scc">Strongly Connected Components</SelectItem>
            <SelectItem value="max-flow">Maximum Flow</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={runAlgorithm} className="w-full"><Play className="w-4 h-4 mr-2"/>Run</Button>
        <div className="text-center text-yellow-400">
          {algorithm === 'max-flow' && `Max Flow: ${maxFlow}`}
          {algorithm === 'scc' && `Found ${scc.length} SCCs`}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ModernVisualizationBase
      title="Advanced Graph Algorithms"
      description="Visualizations for complex graph problems like finding Strongly Connected Components (Tarjan's) or Maximum Flow (Ford-Fulkerson)."
      difficulty="Advanced"
      category="Graph Algorithms"
      complexity={{
        time: "SCC: O(V+E), Max-Flow: O(E * max_flow)",
        space: "O(V+E)",
      }}
      interactiveControls={controls}
    >
      <ModernCanvas draw={draw} />
    </ModernVisualizationBase>
  );
};

export default ModernAdvancedGraphAlgorithms;
