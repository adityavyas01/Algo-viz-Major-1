import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernCanvas } from './ModernCanvas';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Plus, Minus, Search, Target, Layers, BarChart, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BTreeNode {
  keys: number[];
  children: BTreeNode[];
  isLeaf: boolean;
  x?: number;
  y?: number;
  width?: number;
  id: string;
  isHighlighted?: boolean;
  isSplitting?: boolean;
  level?: number;
}

interface BTreeStep {
  type: 'insert' | 'split' | 'search' | 'complete';
  description: string;
  node?: BTreeNode;
  key?: number;
  tree: BTreeNode | null;
  highlightedNodes?: string[];
}

interface BTreeMetrics {
  nodeCount: number;
  keyCount: number;
  height: number;
  maxKeys: number;
  splits: number;
  fillFactor: number;
}

const ModernBTreeVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [degree, setDegree] = useState(3); // Minimum degree
  const [tree, setTree] = useState<BTreeNode | null>(null);
  const [steps, setSteps] = useState<BTreeStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [inputValue, setInputValue] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [metrics, setMetrics] = useState<BTreeMetrics | null>(null);

  // Generate unique ID for nodes
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Create a new B-Tree node
  const createNode = (isLeaf: boolean = true): BTreeNode => ({
    keys: [],
    children: [],
    isLeaf,
    id: generateId()
  });

  // Calculate tree metrics
  const calculateMetrics = (root: BTreeNode | null): BTreeMetrics => {
    if (!root) return { nodeCount: 0, keyCount: 0, height: 0, maxKeys: 0, splits: 0, fillFactor: 0 };

    let nodeCount = 0;
    let keyCount = 0;
    let maxKeys = 0;
    let height = 0;

    const traverse = (node: BTreeNode, level: number) => {
      nodeCount++;
      keyCount += node.keys.length;
      maxKeys = Math.max(maxKeys, node.keys.length);
      height = Math.max(height, level);

      for (const child of node.children) {
        traverse(child, level + 1);
      }
    };

    traverse(root, 0);
    const fillFactor = nodeCount > 0 ? (keyCount / (nodeCount * (2 * degree - 1))) * 100 : 0;

    return {
      nodeCount,
      keyCount,
      height,
      maxKeys,
      splits: steps.filter(s => s.type === 'split').length,
      fillFactor: Math.round(fillFactor)
    };
  };

  // B-Tree operations
  const splitChild = (parent: BTreeNode, index: number): BTreeStep[] => {
    const steps: BTreeStep[] = [];
    const fullChild = parent.children[index];
    const newChild = createNode(fullChild.isLeaf);
    
    const mid = degree - 1;
    
    // Move keys to new node
    newChild.keys = fullChild.keys.splice(mid + 1);
    
    // Move children if not leaf
    if (!fullChild.isLeaf) {
      newChild.children = fullChild.children.splice(mid + 1);
    }
    
    // Insert new child in parent
    parent.children.splice(index + 1, 0, newChild);
    
    // Move middle key to parent
    const middleKey = fullChild.keys.splice(mid, 1)[0];
    parent.keys.splice(index, 0, middleKey);
    
    steps.push({
      type: 'split',
      description: `Split node with key ${middleKey}`,
      node: parent,
      key: middleKey,
      tree: tree
    });

    return steps;
  };

  const insertNonFull = (node: BTreeNode, key: number): BTreeStep[] => {
    const steps: BTreeStep[] = [];
    let i = node.keys.length - 1;

    if (node.isLeaf) {
      // Insert in leaf
      node.keys.push(0);
      while (i >= 0 && node.keys[i] > key) {
        node.keys[i + 1] = node.keys[i];
        i--;
      }
      node.keys[i + 1] = key;
      
      steps.push({
        type: 'insert',
        description: `Insert ${key} in leaf node`,
        node: node,
        key: key,
        tree: tree
      });
    } else {
      // Find child to insert
      while (i >= 0 && node.keys[i] > key) {
        i--;
      }
      i++;

      if (node.children[i].keys.length === 2 * degree - 1) {
        // Split child if full
        steps.push(...splitChild(node, i));
        if (node.keys[i] < key) {
          i++;
        }
      }
      
      steps.push(...insertNonFull(node.children[i], key));
    }

    return steps;
  };

  const insertValue = (value: number) => {
    if (!value || isNaN(value)) return;

    const newSteps: BTreeStep[] = [];
    let newTree = tree;

    if (!newTree) {
      // Create root
      newTree = createNode(true);
      newTree.keys.push(value);
      newSteps.push({
        type: 'insert',
        description: `Create root with key ${value}`,
        node: newTree,
        key: value,
        tree: newTree
      });
    } else {
      if (newTree.keys.length === 2 * degree - 1) {
        // Split root
        const newRoot = createNode(false);
        newRoot.children.push(newTree);
        newSteps.push(...splitChild(newRoot, 0));
        newTree = newRoot;
      }
      
      newSteps.push(...insertNonFull(newTree, value));
    }

    newSteps.push({
      type: 'complete',
      description: 'B-Tree insertion complete',
      tree: newTree
    });

    setSteps(newSteps);
    setCurrentStep(0);
    setTree(newTree);
    setMetrics(calculateMetrics(newTree));
  };

  // Search operation
  const searchValue = (value: number) => {
    if (!tree || !value || isNaN(value)) return;

    const newSteps: BTreeStep[] = [];
    const searchSteps: string[] = [];

    const search = (node: BTreeNode, key: number): boolean => {
      searchSteps.push(node.id);
      
      let i = 0;
      while (i < node.keys.length && key > node.keys[i]) {
        i++;
      }

      newSteps.push({
        type: 'search',
        description: `Search key ${key} in node [${node.keys.join(', ')}]`,
        node: node,
        key: key,
        tree: tree,
        highlightedNodes: [...searchSteps]
      });

      if (i < node.keys.length && key === node.keys[i]) {
        newSteps.push({
          type: 'complete',
          description: `Found key ${key}!`,
          node: node,
          key: key,
          tree: tree,
          highlightedNodes: [...searchSteps]
        });
        return true;
      }

      if (node.isLeaf) {
        newSteps.push({
          type: 'complete',
          description: `Key ${key} not found`,
          tree: tree,
          highlightedNodes: [...searchSteps]
        });
        return false;
      }

      return search(node.children[i], key);
    };

    search(tree, value);
    setSteps(newSteps);
    setCurrentStep(0);
  };

  // Tree positioning
  const calculatePositions = (root: BTreeNode | null): void => {
    if (!root) return;

    const nodeWidth = Math.max(120, root.keys.length * 40 + 20);
    const levelHeights: number[] = [];
    const levelWidths: { [key: number]: number } = {};

    // Calculate level information
    const measureTree = (node: BTreeNode, level: number) => {
      node.level = level;
      node.width = Math.max(120, node.keys.length * 40 + 20);
      
      if (!levelHeights[level]) levelHeights[level] = 0;
      if (!levelWidths[level]) levelWidths[level] = 0;
      
      levelWidths[level] += node.width + 40;

      for (const child of node.children) {
        measureTree(child, level + 1);
      }
    };

    measureTree(root, 0);

    // Position nodes
    const positionNodes = (node: BTreeNode, x: number, y: number) => {
      node.x = x;
      node.y = y;

      if (node.children.length > 0) {
        let childX = x - (levelWidths[node.level! + 1] / 2);
        for (const child of node.children) {
          positionNodes(child, childX + child.width! / 2, y + 100);
          childX += child.width! + 40;
        }
      }
    };

    positionNodes(root, 400, 60);
  };

  // Animation effect
  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length) return;

    const timer = setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, speed, steps.length]);

  // Update tree when step changes
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      if (step.tree) {
        calculatePositions(step.tree);
        setTree(step.tree);
        setMetrics(calculateMetrics(step.tree));
      }
    }
  }, [currentStep, steps]);

  const canvasDrawFunction = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, theme: any, utils: any) => {
    if (!tree) return;

    const currentStepData = steps[currentStep];
    const highlightedNodes = currentStepData?.highlightedNodes || [];

    // Draw edges first
    const drawEdges = (node: BTreeNode) => {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (child.x && child.y && node.x && node.y) {
          const startX = node.x;
          const startY = node.y + 30;
          const endX = child.x;
          const endY = child.y - 10;

          utils.drawArrow(
            startX, startY,
            endX, endY,
            theme.colors.textSecondary + '60',
            false
          );
        }
        drawEdges(child);
      }
    };

    drawEdges(tree);

    // Draw nodes
    const drawNodes = (node: BTreeNode) => {
      if (!node.x || !node.y || !node.width) return;

      const isHighlighted = highlightedNodes.includes(node.id);
      const nodeColor = isHighlighted ? theme.colors.primary : theme.colors.surface;
      
      // Draw node background
      utils.drawGlowingRect(
        node.x - node.width / 2, node.y - 15,
        node.width, 30,
        nodeColor,
        isHighlighted ? 15 : 5
      );

      // Draw keys
      const keyWidth = (node.width - 20) / node.keys.length;
      node.keys.forEach((key, index) => {
        const keyX = node.x - node.width / 2 + 10 + index * keyWidth + keyWidth / 2;
        
        // Key background
        ctx.fillStyle = theme.colors.text + '20';
        ctx.fillRect(keyX - keyWidth / 2 + 2, node.y - 12, keyWidth - 4, 24);
        
        // Key text
        ctx.fillStyle = theme.colors.text;
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(key.toString(), keyX, node.y);

        // Key separators
        if (index < node.keys.length - 1) {
          ctx.strokeStyle = theme.colors.border;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(keyX + keyWidth / 2 - 2, node.y - 12);
          ctx.lineTo(keyX + keyWidth / 2 - 2, node.y + 12);
          ctx.stroke();
        }
      });

      // Draw child indicators
      if (!node.isLeaf) {
        ctx.fillStyle = theme.colors.secondary;
        for (let i = 0; i <= node.keys.length; i++) {
          const indicatorX = node.x - node.width / 2 + 10 + i * keyWidth;
          ctx.beginPath();
          ctx.arc(indicatorX, node.y + 20, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const child of node.children) {
        drawNodes(child);
      }
    };

    drawNodes(tree);

    // Draw current step description
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep];
      utils.drawGradientText(
        step.description,
        400, 20,
        [theme.colors.primary, theme.colors.secondary],
        16
      );
    }
  };

  // Generate metrics for display
  const metricsData = useMemo(() => {
    if (!metrics) return [];
    return [
      { label: 'Nodes', value: metrics.nodeCount, icon: <Database className="w-4 h-4" /> },
      { label: 'Keys', value: metrics.keyCount, icon: <Target className="w-4 h-4" /> },
      { label: 'Height', value: metrics.height, icon: <Layers className="w-4 h-4" /> },
      { label: 'Fill %', value: `${metrics.fillFactor}%`, icon: <BarChart className="w-4 h-4" /> }
    ];
  }, [metrics]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <ModernVisualizationBase
        title="B-Tree Visualization"
        description="Interactive B-Tree data structure visualization. B-Trees are self-balancing tree data structures that maintain sorted data and allow searches, sequential access, insertions, and deletions in logarithmic time."
        difficulty="Advanced"
        category="Trees"
        complexity={{
          time: "O(log n)",
          space: "O(n)"
        }}
        controls={{
          isPlaying,
          onPlay: () => setIsPlaying(true),
          onPause: () => setIsPlaying(false),
          onReset: () => {
            setCurrentStep(0);
            setIsPlaying(false);
            if (steps.length > 0) {
              const firstStep = steps[0];
              if (firstStep.tree) {
                calculatePositions(firstStep.tree);
                setTree(firstStep.tree);
              }
            }
          },
          onStepForward: () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1)),
          onStepBack: () => setCurrentStep(prev => Math.max(prev - 1, 0)),
          currentStep,
          totalSteps: steps.length,
          speed,
          onSpeedChange: setSpeed
        }}
        metrics={metricsData}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <ModernCanvas
              width={800}
              height={500}
              onDraw={canvasDrawFunction}
              className="border rounded-xl"
            />
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">B-Tree Degree</h3>
              <Select value={degree.toString()} onValueChange={(value) => setDegree(parseInt(value))}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Degree 2</SelectItem>
                  <SelectItem value="3">Degree 3</SelectItem>
                  <SelectItem value="4">Degree 4</SelectItem>
                  <SelectItem value="5">Degree 5</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400 mt-2">
                Max keys per node: {2 * degree - 1}
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">Insert Value</h3>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  className="bg-white/10 border-white/20"
                />
                <Button
                  onClick={() => {
                    insertValue(parseInt(inputValue));
                    setInputValue('');
                  }}
                  disabled={!inputValue}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">Search Value</h3>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search value"
                  className="bg-white/10 border-white/20"
                />
                <Button
                  onClick={() => {
                    searchValue(parseInt(searchInput));
                    setSearchInput('');
                  }}
                  disabled={!searchInput || !tree}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-3 text-white">Operations</h3>
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    const values = [10, 20, 5, 6, 12, 30, 7, 17];
                    values.forEach((val, index) => {
                      setTimeout(() => insertValue(val), index * 800);
                    });
                  }}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="sm"
                >
                  Demo Tree
                </Button>
                <Button
                  onClick={() => {
                    setTree(null);
                    setSteps([]);
                    setCurrentStep(0);
                    setMetrics(null);
                    setIsPlaying(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  Clear Tree
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ModernVisualizationBase>
    </div>
  );
};

export default ModernBTreeVisualization;
