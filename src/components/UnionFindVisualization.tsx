
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Canvas } from '@/components/Canvas';
import { Play, RotateCcw, Link, Search } from 'lucide-react';

interface UnionFindNode {
  id: number;
  parent: number;
  rank: number;
  x: number;
  y: number;
}

export const UnionFindVisualization: React.FC = () => {
  const [nodes, setNodes] = useState<UnionFindNode[]>([]);
  const [nodeCount, setNodeCount] = useState(8);
  const [unionA, setUnionA] = useState(0);
  const [unionB, setUnionB] = useState(1);
  const [findNode, setFindNode] = useState(0);
  const [pathCompressionEnabled, setPathCompressionEnabled] = useState(true);
  const [highlightedPath, setHighlightedPath] = useState<number[]>([]);
  const [operations, setOperations] = useState<string[]>([]);

  const initializeNodes = () => {
    const newNodes: UnionFindNode[] = [];
    const gridSize = Math.ceil(Math.sqrt(nodeCount));
    
    for (let i = 0; i < nodeCount; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      newNodes.push({
        id: i,
        parent: i,
        rank: 0,
        x: 100 + col * 80,
        y: 80 + row * 80
      });
    }
    
    setNodes(newNodes);
    setOperations([]);
    setHighlightedPath([]);
  };

  const find = (nodeId: number, showPath: boolean = false): number => {
    const currentNodes = [...nodes];
    const path: number[] = [];
    let current = nodeId;
    
    // Find root and collect path
    while (currentNodes[current].parent !== current) {
      path.push(current);
      current = currentNodes[current].parent;
    }
    path.push(current); // Add root
    
    if (showPath) {
      setHighlightedPath(path);
      setTimeout(() => setHighlightedPath([]), 2000);
    }
    
    // Path compression
    if (pathCompressionEnabled && path.length > 2) {
      for (let i = 0; i < path.length - 1; i++) {
        currentNodes[path[i]].parent = current;
      }
      setNodes(currentNodes);
    }
    
    return current;
  };

  const union = (a: number, b: number) => {
    const rootA = find(a);
    const rootB = find(b);
    
    if (rootA === rootB) {
      setOperations(prev => [...prev, `Union(${a}, ${b}): Already in same set`]);
      return;
    }
    
    const currentNodes = [...nodes];
    
    // Union by rank
    if (currentNodes[rootA].rank < currentNodes[rootB].rank) {
      currentNodes[rootA].parent = rootB;
      setOperations(prev => [...prev, `Union(${a}, ${b}): ${rootA} → ${rootB}`]);
    } else if (currentNodes[rootA].rank > currentNodes[rootB].rank) {
      currentNodes[rootB].parent = rootA;
      setOperations(prev => [...prev, `Union(${a}, ${b}): ${rootB} → ${rootA}`]);
    } else {
      currentNodes[rootB].parent = rootA;
      currentNodes[rootA].rank++;
      setOperations(prev => [...prev, `Union(${a}, ${b}): ${rootB} → ${rootA} (rank++)`]);
    }
    
    setNodes(currentNodes);
  };

  const performFind = () => {
    const root = find(findNode, true);
    setOperations(prev => [...prev, `Find(${findNode}): Root is ${root}`]);
  };

  const performUnion = () => {
    union(unionA, unionB);
  };

  const renderUnionFind = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw edges (parent connections)
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    nodes.forEach(node => {
      if (node.parent !== node.id) {
        const parent = nodes[node.parent];
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(parent.x, parent.y);
        
        // Highlight path if needed
        if (highlightedPath.includes(node.id) && highlightedPath.includes(parent.id)) {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 4;
        } else {
          ctx.strokeStyle = '#6b7280';
          ctx.lineWidth = 2;
        }
        
        ctx.stroke();
        
        // Draw arrow
        const angle = Math.atan2(parent.y - node.y, parent.x - node.x);
        const arrowLength = 10;
        ctx.beginPath();
        ctx.moveTo(parent.x - arrowLength * Math.cos(angle - 0.3), parent.y - arrowLength * Math.sin(angle - 0.3));
        ctx.lineTo(parent.x, parent.y);
        ctx.lineTo(parent.x - arrowLength * Math.cos(angle + 0.3), parent.y - arrowLength * Math.sin(angle + 0.3));
        ctx.stroke();
      }
    });
    
    // Draw nodes
    nodes.forEach(node => {
      const isRoot = node.parent === node.id;
      const isHighlighted = highlightedPath.includes(node.id);
      
      // Node circle
      ctx.fillStyle = isRoot ? '#10b981' : (isHighlighted ? '#fbbf24' : '#3b82f6');
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fill();
      
      // Node border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Node label
      ctx.fillStyle = 'white';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.id.toString(), node.x, node.y + 5);
      
      // Rank for roots
      if (isRoot && node.rank > 0) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Arial';
        ctx.fillText(`r:${node.rank}`, node.x, node.y - 25);
      }
    });
  };

  React.useEffect(() => {
    initializeNodes();
  }, [nodeCount]);

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Disjoint Set (Union-Find) with Path Compression</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white/70">Nodes:</span>
              <Input
                type="number"
                value={nodeCount}
                onChange={(e) => setNodeCount(parseInt(e.target.value) || 8)}
                className="w-20 bg-white/10 border-white/20 text-white"
                min="3"
                max="16"
              />
            </div>
            
            <Button
              onClick={initializeNodes}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pathCompressionEnabled}
                onChange={(e) => setPathCompressionEnabled(e.target.checked)}
                className="rounded"
              />
              <span className="text-white/70">Path Compression</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white/70">Union:</span>
              <Input
                type="number"
                value={unionA}
                onChange={(e) => setUnionA(parseInt(e.target.value) || 0)}
                className="w-16 bg-white/10 border-white/20 text-white"
                min="0"
                max={nodeCount - 1}
              />
              <Input
                type="number"
                value={unionB}
                onChange={(e) => setUnionB(parseInt(e.target.value) || 0)}
                className="w-16 bg-white/10 border-white/20 text-white"
                min="0"
                max={nodeCount - 1}
              />
              <Button
                onClick={performUnion}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link className="w-4 h-4 mr-2" />
                Union
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/70">Find:</span>
              <Input
                type="number"
                value={findNode}
                onChange={(e) => setFindNode(parseInt(e.target.value) || 0)}
                className="w-16 bg-white/10 border-white/20 text-white"
                min="0"
                max={nodeCount - 1}
              />
              <Button
                onClick={performFind}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Search className="w-4 h-4 mr-2" />
                Find
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-0">
          <Canvas
            width={800}
            height={400}
            onRender={renderUnionFind}
            className="border border-white/20 rounded-lg"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-sm">Recent Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-white/80 text-sm max-h-32 overflow-y-auto">
              {operations.slice(-5).map((op, index) => (
                <div key={index}>{op}</div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-sm">Legend</CardTitle>
          </CardHeader>
          <CardContent className="text-white/80 text-sm space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Root nodes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Regular nodes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span>Path highlighted</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
