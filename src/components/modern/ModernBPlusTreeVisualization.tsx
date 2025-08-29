import React, { useState, useEffect, useMemo } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernCanvas } from './ModernCanvas';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Plus, Search, Target, Layers, BarChart, Database, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BPlusTreeNode {
  keys: number[];
  children: BPlusTreeNode[];
  next: BPlusTreeNode | null; // For leaf nodes
  isLeaf: boolean;
  x?: number;
  y?: number;
  width?: number;
  id: string;
  isHighlighted?: boolean;
  level?: number;
}

interface BPlusTreeStep {
  type: 'insert' | 'split' | 'search' | 'traverse' | 'complete';
  description: string;
  node?: BPlusTreeNode;
  key?: number;
  tree: BPlusTreeNode | null;
  highlightedNodes?: string[];
  leafChain?: string[];
}

interface BPlusTreeMetrics {
  nodeCount: number;
  leafCount: number;
  keyCount: number;
  height: number;
  fanOut: number;
  leafUtilization: number;
}

const ModernBPlusTreeVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [degree, setDegree] = useState(3);
  const [tree, setTree] = useState<BPlusTreeNode | null>(null);
  const [steps, setSteps] = useState<BPlusTreeStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [inputValue, setInputValue] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [metrics, setMetrics] = useState<BPlusTreeMetrics | null>(null);
  const [showLeafChain, setShowLeafChain] = useState(true);

  // Generate unique ID for nodes
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Create a new B+ Tree node
  const createNode = (isLeaf: boolean = true): BPlusTreeNode => ({
    keys: [],
    children: [],
    next: null,
    isLeaf,
    id: generateId()
  });

  // Find leftmost leaf
  const findLeftmostLeaf = (node: BPlusTreeNode): BPlusTreeNode => {
    while (!node.isLeaf) {
      node = node.children[0];
    }
    return node;
  };

  // Calculate tree metrics
  const calculateMetrics = (root: BPlusTreeNode | null): BPlusTreeMetrics => {
    if (!root) return { nodeCount: 0, leafCount: 0, keyCount: 0, height: 0, fanOut: 0, leafUtilization: 0 };

    let nodeCount = 0;
    let leafCount = 0;
    let keyCount = 0;
    let height = 0;
    let totalLeafKeys = 0;

    const traverse = (node: BPlusTreeNode, level: number) => {
      nodeCount++;
      keyCount += node.keys.length;
      height = Math.max(height, level);

      if (node.isLeaf) {
        leafCount++;
        totalLeafKeys += node.keys.length;
      }

      for (const child of node.children) {
        traverse(child, level + 1);
      }
    };

    traverse(root, 0);
    const leafUtilization = leafCount > 0 ? (totalLeafKeys / (leafCount * (2 * degree - 1))) * 100 : 0;

    return {
      nodeCount,
      leafCount,
      keyCount,
      height,
      fanOut: degree,
      leafUtilization: Math.round(leafUtilization)
    };
  };

  // B+ Tree insertion
  const insertValue = (value: number) => {
    if (!value || isNaN(value)) return;

    const newSteps: BPlusTreeStep[] = [];
    let newTree = tree;

    // Split child function
    const splitChild = (parent: BPlusTreeNode, index: number, child: BPlusTreeNode): void => {
      const newChild = createNode(child.isLeaf);
      const mid = Math.ceil((2 * degree - 1) / 2);

      if (child.isLeaf) {
        // In leaf: copy right half to new node
        newChild.keys = child.keys.slice(mid);
        child.keys = child.keys.slice(0, mid);
        
        // Link leaves
        newChild.next = child.next;
        child.next = newChild;
        
        // Copy middle key up (not move)
        const middleKey = newChild.keys[0];
        parent.keys.splice(index, 0, middleKey);
        parent.children.splice(index + 1, 0, newChild);
        
        newSteps.push({
          type: 'split',
          description: `Split leaf node, copy key ${middleKey} up`,
          node: parent,
          key: middleKey,
          tree: newTree
        });
      } else {
        // In internal node: move right half
        newChild.keys = child.keys.slice(mid);
        newChild.children = child.children.slice(mid);
        
        const middleKey = child.keys[mid - 1];
        child.keys = child.keys.slice(0, mid - 1);
        child.children = child.children.slice(0, mid);
        
        // Move middle key up
        parent.keys.splice(index, 0, middleKey);
        parent.children.splice(index + 1, 0, newChild);
        
        newSteps.push({
          type: 'split',
          description: `Split internal node, move key ${middleKey} up`,
          node: parent,
          key: middleKey,
          tree: newTree
        });
      }
    };

    // Insert in non-full node
    const insertNonFull = (node: BPlusTreeNode, key: number): void => {
      if (node.isLeaf) {
        // Insert in leaf in sorted order
        let pos = 0;
        while (pos < node.keys.length && node.keys[pos] < key) {
          pos++;
        }
        node.keys.splice(pos, 0, key);
        
        newSteps.push({
          type: 'insert',
          description: `Insert ${key} in leaf node`,
          node: node,
          key: key,
          tree: newTree
        });
      } else {
        // Find child to insert into
        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
          i++;
        }

        if (node.children[i].keys.length === 2 * degree - 1) {
          // Split child if full
          splitChild(node, i, node.children[i]);
          if (key > node.keys[i]) {
            i++;
          }
        }
        
        insertNonFull(node.children[i], key);
      }
    };

    if (!newTree) {
      // Create root
      newTree = createNode(true);
      newTree.keys.push(value);
      newSteps.push({
        type: 'insert',
        description: `Create root leaf with key ${value}`,
        node: newTree,
        key: value,
        tree: newTree
      });
    } else {
      if (newTree.keys.length === 2 * degree - 1) {
        // Split root
        const newRoot = createNode(false);
        newRoot.children.push(newTree);
        splitChild(newRoot, 0, newTree);
        newTree = newRoot;
      }
      
      insertNonFull(newTree, value);
    }

    newSteps.push({
      type: 'complete',
      description: 'B+ Tree insertion complete',
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

    const newSteps: BPlusTreeStep[] = [];
    const searchPath: string[] = [];

    const search = (node: BPlusTreeNode, key: number): boolean => {
      searchPath.push(node.id);
      
      newSteps.push({
        type: 'search',
        description: `Search key ${key} in node [${node.keys.join(', ')}]`,
        node: node,
        key: key,
        tree: tree,
        highlightedNodes: [...searchPath]
      });

      if (node.isLeaf) {
        // Search in leaf
        const found = node.keys.includes(key);
        newSteps.push({
          type: 'complete',
          description: found ? `Found key ${key} in leaf!` : `Key ${key} not found`,
          node: node,
          key: key,
          tree: tree,
          highlightedNodes: [...searchPath]
        });
        return found;
      } else {
        // Find child to search
        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
          i++;
        }
        return search(node.children[i], key);
      }
    };

    search(tree, value);
    setSteps(newSteps);
    setCurrentStep(0);
  };

  // Range traversal
  const traverseLeaves = () => {
    if (!tree) return;

    const newSteps: BPlusTreeStep[] = [];
    const leafChain: string[] = [];
    
    let current = findLeftmostLeaf(tree);
    const allKeys: number[] = [];
    
    while (current) {
      leafChain.push(current.id);
      allKeys.push(...current.keys);
      
      newSteps.push({
        type: 'traverse',
        description: `Traverse leaf: [${current.keys.join(', ')}]`,
        node: current,
        tree: tree,
        leafChain: [...leafChain]
      });
      
      current = current.next;
    }

    newSteps.push({
      type: 'complete',
      description: `Sequential access complete: [${allKeys.join(', ')}]`,
      tree: tree,
      leafChain: [...leafChain]
    });

    setSteps(newSteps);
    setCurrentStep(0);
  };

  // Tree positioning
  const calculatePositions = (root: BPlusTreeNode | null): void => {
    if (!root) return;

    const levelNodes: { [key: number]: BPlusTreeNode[] } = {};
    
    // Group nodes by level
    const groupByLevel = (node: BPlusTreeNode, level: number) => {
      node.level = level;
      if (!levelNodes[level]) levelNodes[level] = [];
      levelNodes[level].push(node);
      
      for (const child of node.children) {
        groupByLevel(child, level + 1);
      }
    };

    groupByLevel(root, 0);

    // Position nodes level by level
    Object.keys(levelNodes).forEach(levelStr => {
      const level = parseInt(levelStr);
      const nodes = levelNodes[level];
      const y = 60 + level * 100;
      
      nodes.forEach((node, index) => {
        node.width = Math.max(120, node.keys.length * 40 + 20);
        const totalWidth = nodes.reduce((sum, n) => sum + (n.width || 120) + 60, -60);
        const startX = 400 - totalWidth / 2;
        
        let x = startX;
        for (let i = 0; i < index; i++) {
          x += (nodes[i].width || 120) + 60;
        }
        x += (node.width || 120) / 2;
        
        node.x = x;
        node.y = y;
      });
    });
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
    const leafChain = currentStepData?.leafChain || [];

    // Draw edges
    const drawEdges = (node: BPlusTreeNode) => {
      for (const child of node.children) {
        if (child.x && child.y && node.x && node.y) {
          utils.drawArrow(
            node.x, node.y + 20,
            child.x, child.y - 20,
            theme.colors.textSecondary + '60',
            false
          );
        }
        drawEdges(child);
      }
    };

    drawEdges(tree);

    // Draw leaf chain connections
    if (showLeafChain) {
      let current = findLeftmostLeaf(tree);
      while (current && current.next) {
        if (current.x && current.y && current.next.x && current.next.y) {
          const isHighlighted = leafChain.includes(current.id) && leafChain.includes(current.next.id);
          utils.drawArrow(
            current.x + (current.width || 120) / 2, current.y,
            current.next.x - (current.next.width || 120) / 2, current.next.y,
            isHighlighted ? theme.colors.primary : theme.colors.secondary + '80',
            false
          );
        }
        current = current.next;
      }
    }

    // Draw nodes
    const drawNodes = (node: BPlusTreeNode) => {
      if (!node.x || !node.y || !node.width) return;

      const isHighlighted = highlightedNodes.includes(node.id);
      const isInLeafChain = leafChain.includes(node.id);
      const nodeColor = isHighlighted ? theme.colors.primary : 
                       isInLeafChain ? theme.colors.secondary : 
                       node.isLeaf ? theme.colors.surface + 'E6' : theme.colors.surface;
      
      // Draw node background
      utils.drawGlowingRect(
        node.x - node.width / 2, node.y - 20,
        node.width, 40,
        nodeColor,
        isHighlighted || isInLeafChain ? 15 : 5
      );

      // Draw leaf indicator
      if (node.isLeaf) {
        ctx.fillStyle = theme.colors.primary;
        ctx.fillRect(node.x - node.width / 2, node.y - 23, node.width, 3);
      }

      // Draw keys
      const keyWidth = (node.width - 20) / node.keys.length;
      node.keys.forEach((key, index) => {
        const keyX = node.x - node.width / 2 + 10 + index * keyWidth + keyWidth / 2;
        
        // Key background
        ctx.fillStyle = theme.colors.text + '20';
        ctx.fillRect(keyX - keyWidth / 2 + 2, node.y - 15, keyWidth - 4, 30);
        
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
          ctx.moveTo(keyX + keyWidth / 2 - 2, node.y - 15);
          ctx.lineTo(keyX + keyWidth / 2 - 2, node.y + 15);
          ctx.stroke();
        }
      });

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
      { label: 'Leaves', value: metrics.leafCount, icon: <Target className="w-4 h-4" /> },
      { label: 'Height', value: metrics.height, icon: <Layers className="w-4 h-4" /> },
      { label: 'Util %', value: `${metrics.leafUtilization}%`, icon: <BarChart className="w-4 h-4" /> }
    ];
  }, [metrics]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <ModernVisualizationBase
        title="B+ Tree Visualization"
        description="Interactive B+ Tree data structure. B+ Trees are optimized for database systems with all data stored in leaves and linked for efficient range queries."
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
              <h3 className="font-semibold mb-3 text-white">Degree & Options</h3>
              <Select value={degree.toString()} onValueChange={(value) => setDegree(parseInt(value))}>
                <SelectTrigger className="bg-white/10 border-white/20 mb-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Degree 2</SelectItem>
                  <SelectItem value="3">Degree 3</SelectItem>
                  <SelectItem value="4">Degree 4</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="leafChain"
                  checked={showLeafChain}
                  onChange={(e) => setShowLeafChain(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="leafChain" className="text-sm text-gray-300">
                  Show leaf chain
                </label>
              </div>
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
                  onClick={traverseLeaves}
                  disabled={!tree}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  size="sm"
                >
                  <Link className="w-4 h-4 mr-2" />
                  Traverse Leaves
                </Button>
                <Button
                  onClick={() => {
                    const values = [10, 20, 5, 15, 25, 8, 12];
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

export default ModernBPlusTreeVisualization;
