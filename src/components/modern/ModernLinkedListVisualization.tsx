import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernCanvas } from './ModernCanvas';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack,
  Plus,
  Minus,
  Search,
  BookOpen,
  Target,
  Eye,
  Link,
  ArrowRight,
  BarChart3,
  Layers
} from 'lucide-react';

interface ListNode {
  value: number;
  next: ListNode | null;
}

interface LinkedListStep {
  nodes: { value: number; index: number }[];
  head: number;
  currentNode: number;
  targetValue?: number;
  operation: 'traverse' | 'insert' | 'delete' | 'search' | 'complete';
  insertPosition?: number;
  deletePosition?: number;
  description: string;
  operationCount: number;
}

interface LinkedListMetrics {
  totalOperations: number;
  listLength: number;
  timeComplexity: string;
  spaceComplexity: string;
}

const ModernLinkedListVisualization: React.FC = () => {
  const { currentTheme, animationSpeed } = useVisualizationTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [nodes, setNodes] = useState([
    { value: 10, index: 0 },
    { value: 20, index: 1 },
    { value: 30, index: 2 },
    { value: 40, index: 3 }
  ]);
  const [steps, setSteps] = useState<LinkedListStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [metrics, setMetrics] = useState<LinkedListMetrics | null>(null);
  const [showPseudocode, setShowPseudocode] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [insertIndex, setInsertIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [deleteIndex, setDeleteIndex] = useState('');

  const generateTraversalSteps = useCallback((nodeList: { value: number; index: number }[]) => {
    const traversalSteps: LinkedListStep[] = [];
    let operations = 0;

    // Initial state
    traversalSteps.push({
      nodes: [...nodeList],
      head: 0,
      currentNode: -1,
      operation: 'traverse',
      description: 'Starting linked list traversal from head node',
      operationCount: operations
    });

    // Traverse each node
    nodeList.forEach((node, index) => {
      operations++;
      traversalSteps.push({
        nodes: [...nodeList],
        head: 0,
        currentNode: index,
        operation: 'traverse',
        description: `Visiting node ${index + 1} with value ${node.value}`,
        operationCount: operations
      });
    });

    // Complete
    traversalSteps.push({
      nodes: [...nodeList],
      head: 0,
      currentNode: -1,
      operation: 'complete',
      description: 'Traversal complete! Visited all nodes in the linked list.',
      operationCount: operations
    });

    setMetrics({
      totalOperations: operations,
      listLength: nodeList.length,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    });

    setSteps(traversalSteps);
  }, []);

  const generateInsertSteps = useCallback((nodeList: { value: number; index: number }[], value: number, position: number) => {
    const insertSteps: LinkedListStep[] = [];
    let operations = 0;
    const newNodeList = [...nodeList];

    // Initial state
    insertSteps.push({
      nodes: [...newNodeList],
      head: 0,
      currentNode: -1,
      operation: 'insert',
      insertPosition: position,
      description: `Inserting value ${value} at position ${position}`,
      operationCount: operations
    });

    // If inserting at head
    if (position === 0) {
      operations++;
      const newNode = { value, index: newNodeList.length };
      newNodeList.unshift(newNode);
      
      // Update indices
      newNodeList.forEach((node, idx) => {
        node.index = idx;
      });

      insertSteps.push({
        nodes: [...newNodeList],
        head: 0,
        currentNode: 0,
        operation: 'insert',
        insertPosition: position,
        description: `New node with value ${value} inserted at head`,
        operationCount: operations
      });
    } else {
      // Traverse to position - 1
      for (let i = 0; i < position - 1 && i < newNodeList.length; i++) {
        operations++;
        insertSteps.push({
          nodes: [...newNodeList],
          head: 0,
          currentNode: i,
          operation: 'insert',
          insertPosition: position,
          description: `Traversing to position ${i + 1} to find insertion point`,
          operationCount: operations
        });
      }

      // Insert the new node
      operations++;
      const newNode = { value, index: newNodeList.length };
      const insertPos = Math.min(position, newNodeList.length);
      newNodeList.splice(insertPos, 0, newNode);
      
      // Update indices
      newNodeList.forEach((node, idx) => {
        node.index = idx;
      });

      insertSteps.push({
        nodes: [...newNodeList],
        head: 0,
        currentNode: insertPos,
        operation: 'insert',
        insertPosition: position,
        description: `New node with value ${value} inserted at position ${insertPos}`,
        operationCount: operations
      });
    }

    // Complete
    insertSteps.push({
      nodes: [...newNodeList],
      head: 0,
      currentNode: -1,
      operation: 'complete',
      description: 'Insertion complete! New node added to the linked list.',
      operationCount: operations
    });

    setMetrics({
      totalOperations: operations,
      listLength: newNodeList.length,
      timeComplexity: position === 0 ? 'O(1)' : 'O(n)',
      spaceComplexity: 'O(1)'
    });

    setSteps(insertSteps);
    setNodes(newNodeList);
  }, []);

  const generateSearchSteps = useCallback((nodeList: { value: number; index: number }[], searchVal: number) => {
    const searchSteps: LinkedListStep[] = [];
    let operations = 0;
    let found = false;

    // Initial state
    searchSteps.push({
      nodes: [...nodeList],
      head: 0,
      currentNode: -1,
      targetValue: searchVal,
      operation: 'search',
      description: `Searching for value ${searchVal} in the linked list`,
      operationCount: operations
    });

    // Search through nodes
    for (let i = 0; i < nodeList.length; i++) {
      operations++;
      
      searchSteps.push({
        nodes: [...nodeList],
        head: 0,
        currentNode: i,
        targetValue: searchVal,
        operation: 'search',
        description: `Checking node ${i + 1}: ${nodeList[i].value} ${nodeList[i].value === searchVal ? '✓ Found!' : '≠ ' + searchVal}`,
        operationCount: operations
      });

      if (nodeList[i].value === searchVal) {
        found = true;
        break;
      }
    }

    // Complete
    searchSteps.push({
      nodes: [...nodeList],
      head: 0,
      currentNode: -1,
      targetValue: searchVal,
      operation: 'complete',
      description: found ? `Value ${searchVal} found in the linked list!` : `Value ${searchVal} not found in the linked list.`,
      operationCount: operations
    });

    setMetrics({
      totalOperations: operations,
      listLength: nodeList.length,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    });

    setSteps(searchSteps);
  }, []);

  const generateDeleteSteps = useCallback((nodeList: { value: number; index: number }[], position: number) => {
    const deleteSteps: LinkedListStep[] = [];
    let operations = 0;
    const newNodeList = [...nodeList];

    if (position >= newNodeList.length || position < 0) {
      deleteSteps.push({
        nodes: [...newNodeList],
        head: 0,
        currentNode: -1,
        operation: 'complete',
        description: 'Invalid position for deletion.',
        operationCount: operations
      });
      setSteps(deleteSteps);
      return;
    }

    // Initial state
    deleteSteps.push({
      nodes: [...newNodeList],
      head: 0,
      currentNode: -1,
      operation: 'delete',
      deletePosition: position,
      description: `Deleting node at position ${position}`,
      operationCount: operations
    });

    // If deleting head
    if (position === 0) {
      operations++;
      const deletedValue = newNodeList[0].value;
      newNodeList.shift();
      
      // Update indices
      newNodeList.forEach((node, idx) => {
        node.index = idx;
      });

      deleteSteps.push({
        nodes: [...newNodeList],
        head: newNodeList.length > 0 ? 0 : -1,
        currentNode: -1,
        operation: 'delete',
        deletePosition: position,
        description: `Head node with value ${deletedValue} deleted`,
        operationCount: operations
      });
    } else {
      // Traverse to position - 1
      for (let i = 0; i < position - 1; i++) {
        operations++;
        deleteSteps.push({
          nodes: [...newNodeList],
          head: 0,
          currentNode: i,
          operation: 'delete',
          deletePosition: position,
          description: `Traversing to position ${i + 1} to find node before deletion point`,
          operationCount: operations
        });
      }

      // Delete the node
      operations++;
      const deletedValue = newNodeList[position].value;
      newNodeList.splice(position, 1);
      
      // Update indices
      newNodeList.forEach((node, idx) => {
        node.index = idx;
      });

      deleteSteps.push({
        nodes: [...newNodeList],
        head: 0,
        currentNode: -1,
        operation: 'delete',
        deletePosition: position,
        description: `Node with value ${deletedValue} deleted from position ${position}`,
        operationCount: operations
      });
    }

    // Complete
    deleteSteps.push({
      nodes: [...newNodeList],
      head: newNodeList.length > 0 ? 0 : -1,
      currentNode: -1,
      operation: 'complete',
      description: 'Deletion complete! Node removed from the linked list.',
      operationCount: operations
    });

    setMetrics({
      totalOperations: operations,
      listLength: newNodeList.length,
      timeComplexity: position === 0 ? 'O(1)' : 'O(n)',
      spaceComplexity: 'O(1)'
    });

    setSteps(deleteSteps);
    setNodes(newNodeList);
  }, []);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsComplete(false);
  };
  
  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
      setIsPlaying(false);
    }
  };
  
  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsComplete(false);
    }
  };

  const handleTraverse = () => {
    generateTraversalSteps(nodes);
    reset();
  };

  const handleInsert = () => {
    const value = parseInt(newValue);
    const position = parseInt(insertIndex);
    if (!isNaN(value) && !isNaN(position) && position >= 0) {
      generateInsertSteps(nodes, value, position);
      reset();
      setNewValue('');
      setInsertIndex('');
    }
  };

  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (!isNaN(value)) {
      generateSearchSteps(nodes, value);
      reset();
      setSearchValue('');
    }
  };

  const handleDelete = () => {
    const position = parseInt(deleteIndex);
    if (!isNaN(position) && position >= 0) {
      generateDeleteSteps(nodes, position);
      reset();
      setDeleteIndex('');
    }
  };

  const drawVisualization = useCallback((context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!steps.length || !steps[currentStep]) return;

    const step = steps[currentStep];
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (step.nodes.length === 0) {
      context.fillStyle = currentTheme.colors.text;
      context.font = '18px Arial';
      context.textAlign = 'center';
      context.fillText('Empty List', canvas.width / 2, canvas.height / 2);
      return;
    }

    const nodeWidth = 80;
    const nodeHeight = 50;
    const arrowLength = 40;
    const spacing = nodeWidth + arrowLength;
    const startX = (canvas.width - (step.nodes.length * spacing - arrowLength)) / 2;
    const nodeY = (canvas.height - nodeHeight) / 2;

    // Draw nodes and arrows
    step.nodes.forEach((node, index) => {
      const x = startX + index * spacing;
      let fillColor = currentTheme.colors.surface;
      let borderColor = currentTheme.colors.border;
      let glowColor = '';

      // Color coding based on state
      if (index === step.head && step.operation !== 'complete') {
        fillColor = currentTheme.colors.primary;
        if (index === step.currentNode) {
          glowColor = currentTheme.colors.primary;
        }
      } else if (index === step.currentNode) {
        fillColor = currentTheme.colors.warning;
        glowColor = currentTheme.colors.warning;
      } else if (step.targetValue !== undefined && node.value === step.targetValue) {
        fillColor = currentTheme.colors.success;
        glowColor = currentTheme.colors.success;
      } else if (step.insertPosition === index || step.deletePosition === index) {
        fillColor = currentTheme.colors.info;
        glowColor = currentTheme.colors.info;
      }

      // Draw glow effect
      if (glowColor) {
        context.shadowColor = glowColor;
        context.shadowBlur = 15;
      }

      // Node background
      context.fillStyle = fillColor;
      context.fillRect(x, nodeY, nodeWidth, nodeHeight);
      
      context.shadowBlur = 0;

      // Node border
      context.strokeStyle = borderColor;
      context.lineWidth = 2;
      context.strokeRect(x, nodeY, nodeWidth, nodeHeight);

      // Value text
      context.fillStyle = 'white';
      context.font = 'bold 16px Arial';
      context.textAlign = 'center';
      context.fillText(node.value.toString(), x + nodeWidth / 2, nodeY + nodeHeight / 2 + 6);

      // Index label
      context.fillStyle = currentTheme.colors.textSecondary;
      context.font = '12px Arial';
      context.fillText(`[${index}]`, x + nodeWidth / 2, nodeY - 10);

      // Draw arrow to next node
      if (index < step.nodes.length - 1) {
        const arrowStartX = x + nodeWidth;
        const arrowEndX = arrowStartX + arrowLength;
        const arrowY = nodeY + nodeHeight / 2;

        context.strokeStyle = currentTheme.colors.border;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(arrowStartX, arrowY);
        context.lineTo(arrowEndX, arrowY);
        context.stroke();

        // Arrowhead
        context.beginPath();
        context.moveTo(arrowEndX - 8, arrowY - 5);
        context.lineTo(arrowEndX, arrowY);
        context.lineTo(arrowEndX - 8, arrowY + 5);
        context.stroke();
      } else {
        // NULL pointer
        const nullX = x + nodeWidth + 20;
        const nullY = nodeY + nodeHeight / 2;
        
        context.fillStyle = currentTheme.colors.textSecondary;
        context.font = '14px Arial';
        context.textAlign = 'left';
        context.fillText('NULL', nullX, nullY + 5);
      }
    });

    // Head pointer
    if (step.head >= 0 && step.head < step.nodes.length) {
      const headX = startX + step.head * spacing + nodeWidth / 2;
      const headY = nodeY - 40;

      context.fillStyle = currentTheme.colors.primary;
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.fillText('HEAD', headX, headY);

      // Arrow pointing to head
      context.strokeStyle = currentTheme.colors.primary;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(headX, headY + 10);
      context.lineTo(headX, nodeY - 5);
      context.stroke();

      // Arrowhead
      context.beginPath();
      context.moveTo(headX - 5, nodeY - 10);
      context.lineTo(headX, nodeY - 5);
      context.lineTo(headX + 5, nodeY - 10);
      context.stroke();
    }

    // Current pointer
    if (step.currentNode >= 0 && step.currentNode < step.nodes.length) {
      const currentX = startX + step.currentNode * spacing + nodeWidth / 2;
      const currentY = nodeY + nodeHeight + 40;

      context.fillStyle = currentTheme.colors.warning;
      context.font = 'bold 14px Arial';
      context.textAlign = 'center';
      context.fillText('CURRENT', currentX, currentY);

      // Arrow pointing to current
      context.strokeStyle = currentTheme.colors.warning;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(currentX, currentY - 10);
      context.lineTo(currentX, nodeY + nodeHeight + 5);
      context.stroke();

      // Arrowhead
      context.beginPath();
      context.moveTo(currentX - 5, nodeY + nodeHeight + 10);
      context.lineTo(currentX, nodeY + nodeHeight + 5);
      context.lineTo(currentX + 5, nodeY + nodeHeight + 10);
      context.stroke();
    }

    // Legend
    const legendY = canvas.height - 30;
    const legendItems = [
      { color: currentTheme.colors.primary, label: 'Head' },
      { color: currentTheme.colors.warning, label: 'Current' },
      { color: currentTheme.colors.success, label: 'Found' },
      { color: currentTheme.colors.info, label: 'Operation Target' }
    ];

    legendItems.forEach((item, index) => {
      const legendX = 20 + index * 140;
      
      context.fillStyle = item.color;
      context.fillRect(legendX, legendY, 15, 15);
      
      context.fillStyle = currentTheme.colors.text;
      context.font = '12px Arial';
      context.textAlign = 'left';
      context.fillText(item.label, legendX + 20, legendY + 12);
    });
  }, [currentStep, steps, currentTheme]);

  useEffect(() => {
    if (nodes.length > 0) {
      generateTraversalSteps(nodes);
    }
  }, [nodes, generateTraversalSteps]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      intervalId = setInterval(() => {
        stepForward();
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      setIsComplete(true);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, currentStep, steps.length, speed]);

  const currentStepData = steps[currentStep];

  const pseudocodeLines = [
    '// Traversal',
    'function traverse(head):',
    '  current = head',
    '  while current != null:',
    '    visit(current)',
    '    current = current.next',
    '',
    '// Search',
    'function search(head, value):',
    '  current = head',
    '  while current != null:',
    '    if current.value == value:',
    '      return current',
    '    current = current.next',
    '  return null',
    '',
    '// Insert at position',
    'function insert(head, value, pos):',
    '  newNode = createNode(value)',
    '  if pos == 0:',
    '    newNode.next = head',
    '    return newNode',
    '  current = head',
    '  for i = 0 to pos-2:',
    '    current = current.next',
    '  newNode.next = current.next',
    '  current.next = newNode'
  ];

  return (
    <ModernVisualizationBase
      title="Linked List Visualization"
      description="Explore linked list operations: traversal, insertion, deletion, and search"
      difficulty="Beginner"
      category="Data Structures"
      complexity={{
        time: "O(n)",
        space: "O(1)"
      }}
      controls={{
        isPlaying,
        onPlay: play,
        onPause: pause,
        onReset: reset,
        onStepForward: stepForward,
        onStepBack: stepBackward,
        currentStep,
        totalSteps: steps.length,
        speed,
        onSpeedChange: setSpeed,
        disabled: isComplete
      }}
      metrics={metrics ? [
        { label: 'Operations', value: currentStepData?.operationCount || 0, icon: <BarChart3 className="w-4 h-4" /> },
        { label: 'List Length', value: currentStepData?.nodes.length || 0, icon: <Layers className="w-4 h-4" /> },
        { label: 'Current Operation', value: currentStepData?.operation || '-', icon: <Eye className="w-4 h-4" /> },
        { label: 'Head Index', value: currentStepData?.head >= 0 ? currentStepData.head : '-', icon: <Target className="w-4 h-4" /> }
      ] : undefined}
      educational={{
        keyPoints: [
          'Dynamic size - grows and shrinks at runtime',
          'Efficient insertion and deletion at head',
          'Sequential access - must traverse from head',
          'Each node contains data and pointer to next',
          'Memory allocated as needed'
        ],
        pseudocode: pseudocodeLines,
        realWorldUse: [
          'Undo functionality in applications',
          'Music playlist implementation',
          'Browser history navigation',
          'Memory management in operating systems'
        ]
      }}
    >
      {/* Progress and Step Info */}
      <div className="text-center space-y-2">
        {currentStepData && (
          <div className="text-white/90 text-sm max-w-2xl mx-auto">
            {currentStepData.description}
          </div>
        )}
      </div>

      {/* Operation Controls */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardContent className="p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <Link className="w-4 h-4 mr-2" />
              Traverse
            </h4>
            <Button onClick={handleTraverse} className="w-full">
              Start Traversal
            </Button>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardContent className="p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Insert
            </h4>
            <div className="space-y-2">
              <Input
                placeholder="Value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
              <Input
                placeholder="Position"
                value={insertIndex}
                onChange={(e) => setInsertIndex(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
              <Button onClick={handleInsert} className="w-full">
                Insert
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardContent className="p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Search
            </h4>
            <div className="space-y-2">
              <Input
                placeholder="Search value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
              <Button onClick={handleSearch} className="w-full">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardContent className="p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center">
              <Minus className="w-4 h-4 mr-2" />
              Delete
            </h4>
            <div className="space-y-2">
              <Input
                placeholder="Position"
                value={deleteIndex}
                onChange={(e) => setDeleteIndex(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
              <Button onClick={handleDelete} className="w-full">
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Visualization */}
      <Card 
        className="backdrop-blur-sm"
        style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}
      >
        <CardContent className="p-6">
          <ModernCanvas
            width={800}
            height={200}
            onDraw={drawVisualization}
            className="rounded-lg border border-white/20"
          />
        </CardContent>
      </Card>

      {/* Additional Controls */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setShowPseudocode(!showPseudocode)}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          {showPseudocode ? 'Hide' : 'Show'} Pseudocode
        </Button>
      </div>

      {/* Pseudocode Panel */}
      {showPseudocode && (
        <Card 
          className="backdrop-blur-sm"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.colors.text }}>
              Linked List Operations Pseudocode
            </h3>
            <div className="font-mono text-sm space-y-1" style={{ color: currentTheme.colors.textSecondary }}>
              {pseudocodeLines.map((line, index) => (
                <div key={index} className="leading-relaxed">
                  {line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Structure Properties */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card 
          className="backdrop-blur-sm"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.colors.text }}>
              Operation Complexities
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Access', value: 'O(n)', color: currentTheme.colors.error },
                { label: 'Search', value: 'O(n)', color: currentTheme.colors.error },
                { label: 'Insert (Head)', value: 'O(1)', color: currentTheme.colors.success },
                { label: 'Insert (Position)', value: 'O(n)', color: currentTheme.colors.error },
                { label: 'Delete (Head)', value: 'O(1)', color: currentTheme.colors.success },
                { label: 'Delete (Position)', value: 'O(n)', color: currentTheme.colors.error }
              ].map((prop, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span style={{ color: currentTheme.colors.textSecondary }}>{prop.label}:</span>
                  <Badge style={{ backgroundColor: prop.color, color: 'white' }}>
                    {prop.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card 
          className="backdrop-blur-sm"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: currentTheme.colors.text }}>
              Linked List Properties
            </h3>
            <div className="space-y-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <p>• <strong>Dynamic Size:</strong> Can grow or shrink at runtime</p>
              <p>• <strong>Memory Efficient:</strong> Allocates memory as needed</p>
              <p>• <strong>Sequential Access:</strong> Must traverse from head</p>
              <p>• <strong>Insertion/Deletion:</strong> Efficient at head position</p>
              <p>• <strong>Cache Performance:</strong> Poor due to non-contiguous memory</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernLinkedListVisualization;
