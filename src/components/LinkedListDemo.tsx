
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Search } from 'lucide-react';
import { LinkedListVisualization } from './LinkedListVisualization';

interface ListNode {
  value: number;
  isHighlighted: boolean;
  isSelected: boolean;
  showPointer?: boolean;
}

export const LinkedListDemo = () => {
  const [nodes, setNodes] = useState<ListNode[]>([
    { value: 10, isHighlighted: false, isSelected: false },
    { value: 20, isHighlighted: false, isSelected: false },
    { value: 30, isHighlighted: false, isSelected: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const addNode = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      setNodes(prev => [...prev, { value, isHighlighted: false, isSelected: false }]);
      setInputValue('');
    }
  };

  const removeNode = (index: number) => {
    setNodes(prev => prev.filter((_, i) => i !== index));
  };

  const searchNode = async () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) return;

    // Reset highlighting
    setNodes(prev => prev.map(node => ({ 
      ...node, 
      isHighlighted: false, 
      isSelected: false,
      showPointer: false 
    })));

    // Animate search
    for (let i = 0; i < nodes.length; i++) {
      setNodes(prev => prev.map((node, index) => ({
        ...node,
        isHighlighted: index === i,
        showPointer: index === i - 1
      })));

      await new Promise(resolve => setTimeout(resolve, 800));

      if (nodes[i].value === value) {
        setNodes(prev => prev.map((node, index) => ({
          ...node,
          isHighlighted: false,
          isSelected: index === i,
          showPointer: false
        })));
        return;
      }
    }

    // Not found - reset highlighting
    setNodes(prev => prev.map(node => ({ 
      ...node, 
      isHighlighted: false, 
      isSelected: false,
      showPointer: false 
    })));
  };

  const clearHighlighting = () => {
    setNodes(prev => prev.map(node => ({ 
      ...node, 
      isHighlighted: false, 
      isSelected: false,
      showPointer: false 
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-20 bg-white/10 border-white/30 text-white"
          />
          <Button 
            onClick={addNode}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-20 bg-white/10 border-white/30 text-white"
          />
          <Button 
            onClick={searchNode}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        <Button 
          onClick={clearHighlighting}
          variant="outline" 
          className="border-white/30 text-white hover:bg-white/10"
        >
          Clear
        </Button>
      </div>

      <LinkedListVisualization 
        nodes={nodes} 
        title="Linked List Operations"
        width={800}
        height={120}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nodes.map((node, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
            <span className="text-white">Node {index + 1}: {node.value}</span>
            <Button 
              onClick={() => removeNode(index)}
              variant="outline" 
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Normal Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Currently Visiting</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Found/Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Active Pointer</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Linked List Operations</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• <strong>Insert:</strong> Add new nodes to the end of the list</p>
          <p>• <strong>Search:</strong> Traverse the list to find a specific value</p>
          <p>• <strong>Delete:</strong> Remove nodes from any position</p>
          <p>• Time Complexity: Insert O(1), Search O(n), Delete O(n)</p>
        </div>
      </div>
    </div>
  );
};
