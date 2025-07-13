
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Canvas } from '@/components/Canvas';
import { Plus, Search, RotateCcw } from 'lucide-react';

interface BloomFilter {
  bitArray: boolean[];
  size: number;
  hashFunctions: number;
  items: Set<string>;
}

export const BloomFilterVisualization: React.FC = () => {
  const [bloomFilter, setBloomFilter] = useState<BloomFilter>({
    bitArray: new Array(32).fill(false),
    size: 32,
    hashFunctions: 3,
    items: new Set()
  });
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [lastOperation, setLastOperation] = useState<string>('');
  const [highlightedBits, setHighlightedBits] = useState<number[]>([]);

  // Simple hash functions
  const hash1 = (str: string, size: number): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash + str.charCodeAt(i)) % size;
    }
    return hash;
  };

  const hash2 = (str: string, size: number): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) % size;
    }
    return Math.abs(hash);
  };

  const hash3 = (str: string, size: number): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 37 + str.charCodeAt(i) * 17) % size;
    }
    return Math.abs(hash);
  };

  const getHashValues = (str: string): number[] => {
    return [
      hash1(str, bloomFilter.size),
      hash2(str, bloomFilter.size),
      hash3(str, bloomFilter.size)
    ];
  };

  const addItem = () => {
    if (!inputValue.trim()) return;
    
    const hashes = getHashValues(inputValue);
    const newBitArray = [...bloomFilter.bitArray];
    
    hashes.forEach(hash => {
      newBitArray[hash] = true;
    });
    
    setBloomFilter(prev => ({
      ...prev,
      bitArray: newBitArray,
      items: new Set([...prev.items, inputValue])
    }));
    
    setHighlightedBits(hashes);
    setLastOperation(`Added "${inputValue}" - Hash positions: ${hashes.join(', ')}`);
    setInputValue('');
    
    setTimeout(() => setHighlightedBits([]), 2000);
  };

  const searchItem = () => {
    if (!searchValue.trim()) return;
    
    const hashes = getHashValues(searchValue);
    const allBitsSet = hashes.every(hash => bloomFilter.bitArray[hash]);
    const actuallyExists = bloomFilter.items.has(searchValue);
    
    setHighlightedBits(hashes);
    
    if (allBitsSet) {
      if (actuallyExists) {
        setLastOperation(`"${searchValue}" might exist (TRUE POSITIVE) - Hash positions: ${hashes.join(', ')}`);
      } else {
        setLastOperation(`"${searchValue}" might exist (FALSE POSITIVE) - Hash positions: ${hashes.join(', ')}`);
      }
    } else {
      setLastOperation(`"${searchValue}" definitely does not exist (TRUE NEGATIVE) - Hash positions: ${hashes.join(', ')}`);
    }
    
    setTimeout(() => setHighlightedBits([]), 3000);
  };

  const resetFilter = () => {
    setBloomFilter({
      bitArray: new Array(32).fill(false),
      size: 32,
      hashFunctions: 3,
      items: new Set()
    });
    setLastOperation('');
    setHighlightedBits([]);
  };

  const renderBloomFilter = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const cellSize = 20;
    const startX = 50;
    const startY = 100;
    const cols = 8;
    
    // Draw bit array
    bloomFilter.bitArray.forEach((bit, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = startX + col * (cellSize + 5);
      const y = startY + row * (cellSize + 5);
      
      // Determine color
      let fillColor = '#374151'; // Default gray
      if (bit) fillColor = '#10b981'; // Green for set bits
      if (highlightedBits.includes(index)) fillColor = '#fbbf24'; // Yellow for highlighted
      
      // Draw cell
      ctx.fillStyle = fillColor;
      ctx.fillRect(x, y, cellSize, cellSize);
      
      // Draw border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cellSize, cellSize);
      
      // Draw bit value
      ctx.fillStyle = bit || highlightedBits.includes(index) ? '#ffffff' : '#9ca3af';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(bit ? '1' : '0', x + cellSize / 2, y + cellSize / 2 + 4);
      
      // Draw index
      ctx.fillStyle = '#9ca3af';
      ctx.font = '10px Arial';
      ctx.fillText(index.toString(), x + cellSize / 2, y - 5);
    });
    
    // Draw hash function demonstrations
    if (highlightedBits.length > 0) {
      const hashY = 250;
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Hash Functions:', 50, hashY);
      
      const currentInput = searchValue || inputValue;
      if (currentInput) {
        const hashes = getHashValues(currentInput);
        hashes.forEach((hash, i) => {
          ctx.fillStyle = '#fbbf24';
          ctx.fillText(`h${i + 1}("${currentInput}") = ${hash}`, 50, hashY + 25 + i * 20);
        });
      }
    }
    
    // Labels
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Bloom Filter Bit Array', 50, 30);
    ctx.font = '12px Arial';
    ctx.fillText(`Size: ${bloomFilter.size} bits, Hash Functions: ${bloomFilter.hashFunctions}`, 50, 50);
    ctx.fillText(`Items added: ${bloomFilter.items.size}`, 50, 70);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Bloom Filter with Hash Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-white/70">Add Item:</span>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-32 bg-white/10 border-white/20 text-white"
                placeholder="Enter text"
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
              />
              <Button
                onClick={addItem}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/70">Search:</span>
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-32 bg-white/10 border-white/20 text-white"
                placeholder="Search text"
                onKeyPress={(e) => e.key === 'Enter' && searchItem()}
              />
              <Button
                onClick={searchItem}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            <Button
              onClick={resetFilter}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {lastOperation && (
            <div className="bg-white/10 rounded-lg p-3">
              <span className="text-white/80 text-sm">{lastOperation}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-0">
          <Canvas
            width={800}
            height={400}
            onRender={renderBloomFilter}
            className="border border-white/20 rounded-lg"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-sm">Added Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-white/80 text-sm max-h-32 overflow-y-auto">
              {Array.from(bloomFilter.items).map((item, index) => (
                <div key={index}>"{item}"</div>
              ))}
              {bloomFilter.items.size === 0 && (
                <div className="text-white/50">No items added yet</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-sm">Bloom Filter Properties</CardTitle>
          </CardHeader>
          <CardContent className="text-white/80 text-sm space-y-2">
            <p>• No false negatives (if not in filter, definitely not in set)</p>
            <p>• Possible false positives (if in filter, might be in set)</p>
            <p>• Space efficient: O(m) bits</p>
            <p>• Fast operations: O(k) where k = hash functions</p>
            <p>• Cannot delete items</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
