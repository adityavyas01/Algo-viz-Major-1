
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Canvas } from './Canvas';

interface TrieNode {
  char: string;
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  x: number;
  y: number;
  level: number;
  isHighlighted?: boolean;
  isSearchPath?: boolean;
}

export const TrieVisualization = () => {
  const [root, setRoot] = useState<TrieNode>({
    char: '',
    children: new Map(),
    isEndOfWord: false,
    x: 0,
    y: 0,
    level: 0
  });
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [lastOperation, setLastOperation] = useState('');
  const [searchResult, setSearchResult] = useState<string[]>([]);

  const insertWord = (word: string) => {
    let current = root;
    
    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      
      if (!current.children.has(char)) {
        current.children.set(char, {
          char,
          children: new Map(),
          isEndOfWord: false,
          x: 0,
          y: 0,
          level: i + 1
        });
      }
      
      current = current.children.get(char)!;
    }
    
    current.isEndOfWord = true;
  };

  const searchWord = (word: string): boolean => {
    let current = root;
    
    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }
    
    return current.isEndOfWord;
  };

  const findWordsWithPrefix = (prefix: string): string[] => {
    let current = root;
    
    // Navigate to the prefix
    for (const char of prefix.toLowerCase()) {
      if (!current.children.has(char)) {
        return [];
      }
      current = current.children.get(char)!;
    }
    
    // DFS to find all words with this prefix
    const words: string[] = [];
    
    const dfs = (node: TrieNode, currentWord: string) => {
      if (node.isEndOfWord) {
        words.push(currentWord);
      }
      
      node.children.forEach((child, char) => {
        dfs(child, currentWord + char);
      });
    };
    
    dfs(current, prefix.toLowerCase());
    return words;
  };

  const calculatePositions = (node: TrieNode, x: number, y: number, spacing: number, siblingIndex: number = 0) => {
    node.x = x + siblingIndex * spacing;
    node.y = y;
    
    let childIndex = 0;
    const childSpacing = spacing / Math.max(1, node.children.size);
    
    node.children.forEach((child) => {
      calculatePositions(
        child,
        node.x - (node.children.size - 1) * childSpacing / 2,
        y + 70,
        childSpacing,
        childIndex
      );
      childIndex++;
    });
  };

  const markSearchPath = (word: string) => {
    const clearHighlights = (node: TrieNode) => {
      node.isHighlighted = false;
      node.isSearchPath = false;
      node.children.forEach(child => clearHighlights(child));
    };
    
    clearHighlights(root);
    
    let current = root;
    current.isSearchPath = true;
    
    for (const char of word.toLowerCase()) {
      if (current.children.has(char)) {
        current = current.children.get(char)!;
        current.isSearchPath = true;
        current.isHighlighted = true;
      } else {
        break;
      }
    }
  };

  const handleInsertWord = () => {
    const word = inputValue.trim();
    if (word) {
      insertWord(word);
      calculatePositions(root, 350, 50, 300);
      setLastOperation(`Inserted "${word}"`);
      setInputValue('');
      setRoot({ ...root }); // Force re-render
    }
  };

  const handleSearch = () => {
    const word = searchValue.trim();
    if (word) {
      markSearchPath(word);
      const found = searchWord(word);
      const suggestions = findWordsWithPrefix(word);
      setSearchResult(suggestions);
      setLastOperation(`Search "${word}": ${found ? 'Found' : 'Not found'}`);
      setRoot({ ...root }); // Force re-render
    }
  };

  const handleClear = () => {
    setRoot({
      char: '',
      children: new Map(),
      isEndOfWord: false,
      x: 0,
      y: 0,
      level: 0
    });
    setSearchResult([]);
    setLastOperation('Trie cleared');
  };

  const loadSampleWords = () => {
    const words = ['cat', 'car', 'card', 'care', 'careful', 'cats', 'dog', 'dodge', 'door', 'doors'];
    const newRoot = {
      char: '',
      children: new Map(),
      isEndOfWord: false,
      x: 0,
      y: 0,
      level: 0
    };
    
    words.forEach(word => {
      let current = newRoot;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!current.children.has(char)) {
          current.children.set(char, {
            char,
            children: new Map(),
            isEndOfWord: false,
            x: 0,
            y: 0,
            level: i + 1
          });
        }
        current = current.children.get(char)!;
      }
      current.isEndOfWord = true;
    });
    
    calculatePositions(newRoot, 350, 50, 300);
    setRoot(newRoot);
    setLastOperation(`Loaded sample words: ${words.join(', ')}`);
  };

  const renderTrie = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const drawNode = (node: TrieNode) => {
      if (node.level === 0) {
        // Don't draw the root node visually, but draw its children
        node.children.forEach(child => drawNode(child));
        return;
      }

      // Draw connections to children
      node.children.forEach(child => {
        ctx.strokeStyle = child.isSearchPath ? '#ef4444' : '#64748b';
        ctx.lineWidth = child.isSearchPath ? 3 : 2;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(child.x, child.y);
        ctx.stroke();
      });

      // Draw node
      let fillColor = '#3b82f6';
      if (node.isEndOfWord) fillColor = '#22c55e';
      if (node.isHighlighted) fillColor = '#ef4444';
      if (node.isSearchPath && !node.isHighlighted) fillColor = '#f59e0b';

      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fill();

      // Draw border
      ctx.strokeStyle = node.isEndOfWord ? '#16a34a' : '#1e293b';
      ctx.lineWidth = node.isEndOfWord ? 3 : 2;
      ctx.stroke();

      // Draw character
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.char.toUpperCase(), node.x, node.y);

      // Draw children
      node.children.forEach(child => drawNode(child));
    };

    drawNode(root);

    // Draw legend
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Trie (Prefix Tree)', 20, 30);
  }, [root]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter word to insert"
            className="w-48 bg-white/10 border-white/30 text-white placeholder:text-white/50"
            onKeyPress={(e) => e.key === 'Enter' && handleInsertWord()}
          />
          <Button 
            onClick={handleInsertWord}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Insert
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search/prefix"
            className="w-48 bg-white/10 border-white/30 text-white placeholder:text-white/50"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Search
          </Button>
        </div>
        <Button 
          onClick={loadSampleWords}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Load Sample
        </Button>
        <Button 
          onClick={handleClear}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10"
        >
          Clear
        </Button>
      </div>

      {lastOperation && (
        <div className="bg-white/10 rounded-lg px-4 py-2 text-white">
          <span className="text-white/70">Last Operation:</span>
          <span className="ml-2 font-semibold">{lastOperation}</span>
        </div>
      )}

      {searchResult.length > 0 && (
        <div className="bg-white/10 rounded-lg px-4 py-2 text-white">
          <span className="text-white/70">Words with prefix "{searchValue}":</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {searchResult.map((word, index) => (
              <span key={index} className="bg-green-600 px-2 py-1 rounded text-sm">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      <Canvas
        width={700}
        height={400}
        onRender={renderTrie}
        className="border border-white/20 rounded-lg bg-white/5"
      />

      <div className="flex flex-wrap gap-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Character Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-green-400"></div>
          <span>End of Word</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>Search Path</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Search Match</span>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Trie Properties</h3>
        <div className="space-y-2 text-sm text-white/80">
          <p>• Prefix tree for efficient string storage and retrieval</p>
          <p>• Insert/Search: O(L) where L is length of word</p>
          <p>• Space efficient for storing many words with common prefixes</p>
          <p>• Excellent for autocomplete and spell checkers</p>
          <p>• Used in search engines and text processing</p>
        </div>
      </div>
    </div>
  );
};
