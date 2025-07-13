
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Canvas } from './Canvas';
import { Plus, Minus, RotateCcw, Search } from 'lucide-react';

interface HashEntry {
  key: string;
  value: number;
}

export const HashTableVisualization = () => {
  const [table, setTable] = useState<(HashEntry[] | null)[]>(new Array(8).fill(null));
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const hashFunction = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % table.length;
    }
    return hash;
  };

  const insert = () => {
    if (!keyInput.trim() || !valueInput.trim()) return;
    
    const key = keyInput.trim();
    const value = parseInt(valueInput);
    if (isNaN(value)) return;

    const index = hashFunction(key);
    setHighlightedIndex(index);

    setTable(prev => {
      const newTable = [...prev];
      
      if (!newTable[index]) {
        newTable[index] = [];
      }
      
      // Check if key already exists
      const existingIndex = newTable[index]!.findIndex(entry => entry.key === key);
      if (existingIndex >= 0) {
        newTable[index]![existingIndex].value = value;
      } else {
        newTable[index]!.push({ key, value });
      }
      
      return newTable;
    });

    setKeyInput('');
    setValueInput('');
    setTimeout(() => setHighlightedIndex(null), 1500);
  };

  const remove = () => {
    if (!keyInput.trim()) return;
    
    const key = keyInput.trim();
    const index = hashFunction(key);
    setHighlightedIndex(index);

    setTable(prev => {
      const newTable = [...prev];
      
      if (newTable[index]) {
        newTable[index] = newTable[index]!.filter(entry => entry.key !== key);
        if (newTable[index]!.length === 0) {
          newTable[index] = null;
        }
      }
      
      return newTable;
    });

    setKeyInput('');
    setTimeout(() => setHighlightedIndex(null), 1500);
  };

  const search = () => {
    if (!searchKey.trim()) return;
    
    const key = searchKey.trim();
    const index = hashFunction(key);
    setHighlightedIndex(index);
    
    setTimeout(() => setHighlightedIndex(null), 2000);
  };

  const clear = () => {
    setTable(new Array(8).fill(null));
    setHighlightedIndex(null);
  };

  const renderHashTable = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const bucketHeight = 40;
    const bucketWidth = canvas.width - 40;
    const startY = 60;

    // Draw title
    ctx.fillStyle = '#6b7280';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('HASH TABLE (Separate Chaining)', canvas.width/2, 30);

    table.forEach((bucket, index) => {
      const y = startY + index * (bucketHeight + 5);
      const isHighlighted = highlightedIndex === index;

      // Draw bucket container
      ctx.fillStyle = isHighlighted ? '#fbbf24' : '#374151';
      ctx.fillRect(20, y, bucketWidth, bucketHeight);

      // Draw border
      ctx.strokeStyle = isHighlighted ? '#f59e0b' : '#6b7280';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, y, bucketWidth, bucketHeight);

      // Draw index
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`[${index}]`, 30, y + 25);

      // Draw entries in bucket
      if (bucket && bucket.length > 0) {
        let x = 80;
        bucket.forEach((entry, entryIndex) => {
          const entryWidth = 80;
          
          // Draw entry box
          ctx.fillStyle = '#3b82f6';
          ctx.fillRect(x, y + 5, entryWidth, bucketHeight - 10);
          
          ctx.strokeStyle = '#1e40af';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y + 5, entryWidth, bucketHeight - 10);

          // Draw key:value
          ctx.fillStyle = '#ffffff';
          ctx.font = '11px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${entry.key}:${entry.value}`, x + entryWidth/2, y + 22);

          x += entryWidth + 5;

          // Draw arrow to next entry
          if (entryIndex < bucket.length - 1) {
            ctx.strokeStyle = '#6b7280';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - 2, y + bucketHeight/2);
            ctx.lineTo(x + 2, y + bucketHeight/2);
            ctx.stroke();
          }
        });
      } else {
        // Draw empty indicator
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('empty', 80, y + 25);
      }
    });
  };

  const getTotalEntries = (): number => {
    return table.reduce((total, bucket) => {
      return total + (bucket ? bucket.length : 0);
    }, 0);
  };

  const getCollisions = (): number => {
    return table.filter(bucket => bucket && bucket.length > 1).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Key"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className="w-24"
          />
          <Input
            type="number"
            placeholder="Value"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && insert()}
            className="w-24"
          />
          <Button onClick={insert} size="sm" className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4" />
            Insert
          </Button>
          <Button onClick={remove} size="sm" className="bg-red-600 hover:bg-red-700">
            <Minus className="w-4 h-4" />
            Delete
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search key"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && search()}
            className="w-32"
          />
          <Button onClick={search} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
        
        <Button onClick={clear} size="sm" variant="outline">
          <RotateCcw className="w-4 h-4" />
          Clear
        </Button>
      </div>

      <div className="flex gap-6 text-white">
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Entries:</span>
          <span className="ml-2 font-semibold">{getTotalEntries()}</span>
        </div>
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Collisions:</span>
          <span className="ml-2 font-semibold">{getCollisions()}</span>
        </div>
        <div className="bg-white/10 rounded-lg px-4 py-2">
          <span className="text-white/70">Load Factor:</span>
          <span className="ml-2 font-semibold">
            {(getTotalEntries() / table.length).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4">
        <Canvas
          width={600}
          height={400}
          onRender={renderHashTable}
          className="border border-white/20 rounded mx-auto"
        />
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Hash Table</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Key-value pairs stored using hash function for fast access</p>
          <p>• Separate chaining handles collisions with linked lists</p>
          <p>• Average case: Insert O(1), Search O(1), Delete O(1)</p>
          <p>• Worst case: O(n) when many collisions occur</p>
          <p>• Used for databases, caches, dictionaries, symbol tables</p>
        </div>
      </div>
    </div>
  );
};
