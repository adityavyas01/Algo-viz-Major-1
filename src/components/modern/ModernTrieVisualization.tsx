import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ModernVisualizationBase } from './ModernVisualizationBase';
import { ModernTreeVisualization, TreeNodeData, TreeEdgeData } from './ModernTreeVisualization';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { Play, Pause, RotateCcw, StepForward, StepBack, Search, Plus, Trash2, FileCheck, FileSearch, Sparkles, Book, Zap } from 'lucide-react';
import { commonEnglishWords, technicalWords } from '@/data/dictionary';

class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

interface DisplayNode {
  id: string;
  char: string;
  x: number;
  y: number;
  isEndOfWord: boolean;
  children: DisplayNode[];
  isHighlighted?: boolean;
}

interface TrieStep {
  nodes: TreeNodeData[];
  edges: TreeEdgeData[];
  description: string;
  operation: 'insert' | 'search' | 'prefix' | 'idle';
  word: string;
  charIndex: number | null;
}

const TRIE_INFO = {
  name: 'Trie (Prefix Tree)',
  description: 'A Trie, also known as a prefix tree, is a tree-like data structure that stores a dynamic set of strings. Tries are commonly used for implementing dictionaries and for searching for words with a specific prefix. Each node in the trie represents a single character of a string.',
  complexity: {
    time: 'O(L)',
    space: 'O(N*L)',
  },
  difficulty: 'Intermediate' as const,
  category: 'Tree',
  educational: {
    keyPoints: [
      'The root represents an empty string.',
      'Each node has children corresponding to the next character in a string.',
      'Nodes can have a flag to indicate if they mark the end of a complete word.',
      'The time complexity for insertion, deletion, and search is proportional to the length of the word (L).',
    ],
    realWorldUse: [
      'Autocomplete and search suggestions in search engines.',
      'Spell checkers and word games.',
      'IP routing tables in network routers.',
      'Storing dictionary words for quick lookups.',
    ],
    pseudocode: [
      'function insert(word):',
      '  current = root',
      '  for each char in word:',
      '    if current.children does not have char:',
      '      current.children[char] = new Node()',
      '    current = current.children[char]',
      '  current.isEndOfWord = true',
    ],
  }
};

const ModernTrieVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [root] = useState(() => new TrieNode());
  const [wordInput, setWordInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [dictionarySearchInput, setDictionarySearchInput] = useState('');
  const [speed, setSpeed] = useState(500);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<'custom' | 'dictionary'>('custom');
  const [dictionaryCategory, setDictionaryCategory] = useState<'common' | 'technical'>('common');
  const [isDictionaryLoaded, setIsDictionaryLoaded] = useState(false);

  const animation = useAnimation<TrieStep>([], speed);

  const generateDisplayTree = useCallback((
    trieNode: TrieNode, 
    id: string, 
    x: number = 400, 
    y: number = 60, 
    level: number = 0,
    highlightPath: string = '',
    searchPath: string = '',
    prefixPath: string = ''
  ): { nodes: TreeNodeData[], edges: TreeEdgeData[] } => {
    const nodes: TreeNodeData[] = [];
    const edges: TreeEdgeData[] = [];
    const queue: {
      node: TrieNode, 
      displayId: string, 
      parentId: string | null, 
      char: string,
      x: number,
      y: number,
      level: number
    }[] = [{ node: trieNode, displayId: 'root', parentId: null, char: ' ', x, y, level }];
    
    const nodePositions = new Map<string, {x: number, y: number}>();
    nodePositions.set('root', {x, y});

    const nodesToProcess = [queue[0]];
    const processedIds = new Set<string>();

    while(nodesToProcess.length > 0) {
      const { node, displayId, parentId, char, x, y, level } = nodesToProcess.shift()!;
      
      if (processedIds.has(displayId)) continue;
      processedIds.add(displayId);

      const path = displayId.substring(5);
      let state: TreeNodeData['state'] = 'normal';

      if (prefixPath && path.startsWith(prefixPath)) {
        state = 'path';
      }
      if (searchPath && path === searchPath) {
        state = 'current';
      } else if (highlightPath && path.startsWith(highlightPath) && path.length <= highlightPath.length) {
        state = 'current';
      }
      
      if (node.isEndOfWord) {
        if (state === 'normal') state = 'highlighted';
      }

      nodes.push({
        id: displayId,
        value: char,
        x,
        y,
        label: node.isEndOfWord ? 'EOW' : '',
        state,
      });

      if (parentId) {
        edges.push({ from: parentId, to: displayId, state: 'normal' });
      }

      const childrenEntries = Array.from(node.children.entries());
      const totalChildren = childrenEntries.length;
      let childIndex = 0;
      for (const [childChar, childNode] of childrenEntries) {
        const childId = `${displayId}-${childChar}`;
        // Much more generous spacing that adapts to number of children
        const baseSpacing = Math.max(40, 200 / (level + 1));
        const childX = x + (childIndex - (totalChildren - 1) / 2) * baseSpacing;
        const childY = y + 100;
        nodesToProcess.push({ node: childNode, displayId: childId, parentId: displayId, char: childChar, x: childX, y: childY, level: level + 1 });
        childIndex++;
      }
    }

    return { nodes, edges };
  }, []);

  const generateSteps = useCallback((operation: 'insert' | 'search' | 'prefix', word: string) => {
    setIsGenerating(true);
    animation.reset();
    animation.setSteps([]);
    const newSteps: TrieStep[] = [];
    let current = root;
    let path = '';

    const { nodes: initialNodes, edges: initialEdges } = generateDisplayTree(root, 'root');
    newSteps.push({
      nodes: initialNodes,
      edges: initialEdges,
      description: `Starting ${operation} operation for word: "${word}"`,
      operation,
      word,
      charIndex: null,
    });

    if (operation === 'insert') {
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        path += char;
        
        if (!current.children.has(char)) {
          const { nodes, edges } = generateDisplayTree(root, 'root', 400, 60, 0, path);
          newSteps.push({
            nodes, edges,
            description: `Character '${char}' not found. Creating new node.`,
            operation, word, charIndex: i,
          });
          current.children.set(char, new TrieNode());
        }
        
        current = current.children.get(char)!;
        const { nodes, edges } = generateDisplayTree(root, 'root', 400, 60, 0, path);
        newSteps.push({
          nodes, edges,
          description: `Moving to node for character '${char}'.`,
          operation, word, charIndex: i,
        });
      }
      current.isEndOfWord = true;
      const { nodes, edges } = generateDisplayTree(root, 'root', 400, 60, 0, path);
      newSteps.push({
        nodes, edges,
        description: `Marking end of word "${word}".`,
        operation, word, charIndex: word.length - 1,
      });
    } else if (operation === 'search') {
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        path += char;
        if (!current.children.has(char)) {
          const { nodes, edges } = generateDisplayTree(root, 'root', 400, 60, 0, path);
          newSteps.push({
            nodes, edges,
            description: `Character '${char}' not found. Word "${word}" does not exist.`,
            operation, word, charIndex: i,
          });
          animation.setSteps(newSteps);
          setIsGenerating(false);
          return;
        }
        current = current.children.get(char)!;
        const { nodes, edges } = generateDisplayTree(root, 'root', 400, 60, 0, path);
        newSteps.push({
          nodes, edges,
          description: `Found character '${char}'. Moving to next node.`,
          operation, word, charIndex: i,
        });
      }
      const { nodes, edges } = generateDisplayTree(root, 'root', 400, 60, 0, path);
      if (current.isEndOfWord) {
        newSteps.push({
          nodes, edges,
          description: `Reached end of path and it's a valid word. Found "${word}"!`,
          operation, word, charIndex: word.length - 1,
        });
      } else {
        newSteps.push({
          nodes, edges,
          description: `Reached end of path, but it's not marked as a word. "${word}" is a prefix, but not a stored word.`,
          operation, word, charIndex: word.length - 1,
        });
      }
    } else { // prefix
      // First traverse to the prefix node
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        path += char;
        if (!current.children.has(char)) {
          const { nodes, edges } = generateDisplayTree(root, 'root', 400, 60, 0, path);
          newSteps.push({
            nodes, edges,
            description: `Character '${char}' not found. No words with prefix "${word}" exist.`,
            operation, word, charIndex: i,
          });
          animation.setSteps(newSteps);
          setIsGenerating(false);
          return;
        }
        current = current.children.get(char)!;
        const { nodes, edges } = generateDisplayTree(root, 'root', 400, 60, 0, path);
        newSteps.push({
          nodes, edges,
          description: `Found character '${char}'. Moving to next node.`,
          operation, word, charIndex: i,
        });
      }
      // Now highlight all words with this prefix
      const { nodes, edges } = generateDisplayTree(root, 'root', 400, 60, 0, '', '', word);
      newSteps.push({
        nodes, edges,
        description: `Highlighting all words with prefix "${word}".`,
        operation, word, charIndex: null,
      });
    }

    animation.setSteps(newSteps);
    animation.setCurrentStepIndex(0);
    setIsGenerating(false);
  }, [root, generateDisplayTree, animation]);

  const handleInsert = () => {
    if (wordInput) {
      generateSteps('insert', wordInput.toLowerCase());
      setWordInput('');
    }
  };

  const handleSearch = () => {
    const input = mode === 'dictionary' ? dictionarySearchInput : searchInput;
    console.log('Search clicked:', { mode, input, dictionarySearchInput, searchInput });
    if (input) {
      console.log('Generating search steps for:', input);
      generateSteps('search', input.toLowerCase());
    } else {
      console.log('No input provided for search');
    }
  };
  
  const handlePrefixSearch = () => {
    const input = mode === 'dictionary' ? dictionarySearchInput : searchInput;
    console.log('Prefix search clicked:', { mode, input, dictionarySearchInput, searchInput });
    if (input) {
      console.log('Generating prefix steps for:', input);
      generateSteps('prefix', input.toLowerCase());
    } else {
      console.log('No input provided for prefix search');
    }
  };

  const handleClear = () => {
    root.children.clear();
    root.isEndOfWord = false;
    animation.setSteps([]);
    animation.reset();
    setIsDictionaryLoaded(false);
  };

  const loadDictionary = useCallback(() => {
    if (isDictionaryLoaded) return;
    
    setIsGenerating(true);
    const words = dictionaryCategory === 'common' ? commonEnglishWords.slice(0, 50) : technicalWords.slice(0, 50);
    
    // Insert words into trie
    words.forEach(word => {
      let current = root;
      for (const char of word.toLowerCase()) {
        if (!current.children.has(char)) {
          current.children.set(char, new TrieNode());
        }
        current = current.children.get(char)!;
      }
      current.isEndOfWord = true;
    });
    
    // Create visualization
    const { nodes, edges } = generateDisplayTree(root, 'root');
    animation.setSteps([{
      nodes,
      edges,
      description: `Loaded ${words.length} ${dictionaryCategory} words into the trie.`,
      operation: 'idle' as const,
      word: '',
      charIndex: null,
    }]);
    animation.setCurrentStepIndex(0);
    setIsDictionaryLoaded(true);
    setIsGenerating(false);
  }, [root, dictionaryCategory, isDictionaryLoaded, generateDisplayTree, animation]);

  // Initialize with empty trie visualization on mount
  useEffect(() => {
    const { nodes, edges } = generateDisplayTree(root, 'root');
    const initialStep = {
      nodes,
      edges,
      description: 'Trie is ready. Insert words or search for prefixes.',
      operation: 'idle' as const,
      word: '',
      charIndex: null,
    };
    animation.setSteps([initialStep]);
    animation.setCurrentStepIndex(0); // Set index to 0 to display the initial step
  }, []);

  const { nodes, edges, description, canvasWidth, canvasHeight } = useMemo(() => {
    let displayNodes: TreeNodeData[];
    let displayEdges: TreeEdgeData[];
    let desc: string;

    if (!animation.steps.length || animation.currentStepIndex >= animation.steps.length) {
      const result = generateDisplayTree(root, 'root', 400, 60, 0, '', searchInput.toLowerCase());
      displayNodes = result.nodes;
      displayEdges = result.edges;
      desc = 'Trie is ready. Insert words or search for prefixes.';
    } else {
      const step = animation.steps[animation.currentStepIndex];
      if (!step) {
        const result = generateDisplayTree(root, 'root', 400, 60, 0, '', searchInput.toLowerCase());
        displayNodes = result.nodes;
        displayEdges = result.edges;
        desc = 'Trie is ready. Insert words or search for prefixes.';
      } else {
        displayNodes = step.nodes;
        displayEdges = step.edges;
        desc = step.description;
      }
    }

    // Calculate canvas bounds from node positions with padding
    let minX = 0, maxX = 800, minY = 0, maxY = 500;
    if (displayNodes.length > 0) {
      minX = Math.min(...displayNodes.map(n => n.x)) - 100;
      maxX = Math.max(...displayNodes.map(n => n.x)) + 100;
      minY = Math.min(...displayNodes.map(n => n.y)) - 100;
      maxY = Math.max(...displayNodes.map(n => n.y)) + 100;
    }

    const width = Math.max(800, maxX - minX);
    const height = Math.max(500, maxY - minY);

    // Adjust node positions if there are negative coordinates
    const offsetX = minX < 0 ? -minX : 0;
    const offsetY = minY < 0 ? -minY : 0;
    
    if (offsetX > 0 || offsetY > 0) {
      displayNodes = displayNodes.map(n => ({
        ...n,
        x: n.x + offsetX,
        y: n.y + offsetY
      }));
    }

    return {
      nodes: displayNodes,
      edges: displayEdges,
      description: desc,
      canvasWidth: width,
      canvasHeight: height
    };
  }, [animation.steps, animation.currentStepIndex, root, generateDisplayTree, searchInput]);

  const metrics = [
      // Metrics can be added here, e.g., node count, word count
  ];

  const controls = {
    isPlaying: animation.isPlaying,
    onPlay: animation.play,
    onPause: animation.pause,
    onReset: () => {
        const currentOperation = animation.steps[0]?.operation;
        const currentWord = animation.steps[0]?.word || '';
        if(currentWord && currentOperation && currentOperation !== 'idle') {
            generateSteps(currentOperation, currentWord);
        } else {
            animation.reset();
        }
    },
    onStepForward: animation.nextStep,
    onStepBack: animation.prevStep,
    currentStep: animation.currentStepIndex,
    totalSteps: animation.steps.length,
    speed,
    onSpeedChange: setSpeed,
    isGenerating,
  };

  const interactiveControls = (
    <Tabs value={mode} onValueChange={(v) => setMode(v as 'custom' | 'dictionary')} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="custom" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Custom Words
        </TabsTrigger>
        <TabsTrigger value="dictionary" className="flex items-center gap-2">
          <Book className="w-4 h-4" />
          Dictionary
        </TabsTrigger>
      </TabsList>

      <TabsContent value="custom" className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Input
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
              placeholder="Enter a word"
              className="w-36"
              disabled={isGenerating || animation.isPlaying}
            />
            <Button onClick={handleInsert} disabled={isGenerating || animation.isPlaying}>
              <Plus className="w-4 h-4 mr-2" />Insert
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search word/prefix"
              className="w-36"
              disabled={isGenerating || animation.isPlaying}
            />
            <Button onClick={handleSearch} disabled={isGenerating || animation.isPlaying}>
              <FileCheck className="w-4 h-4 mr-2" />Search
            </Button>
            <Button onClick={handlePrefixSearch} disabled={isGenerating || animation.isPlaying}>
              <FileSearch className="w-4 h-4 mr-2" />Prefix
            </Button>
          </div>
          <Button onClick={handleClear} variant="outline" disabled={isGenerating || animation.isPlaying}>
            <Trash2 className="w-4 h-4 mr-2" />Clear
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="dictionary" className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <Tabs value={dictionaryCategory} onValueChange={(v) => {
            setDictionaryCategory(v as 'common' | 'technical');
            setIsDictionaryLoaded(false);
          }}>
            <TabsList>
              <TabsTrigger value="common" className="flex items-center gap-2">
                <Book className="w-4 h-4" />
                Common Words
              </TabsTrigger>
              <TabsTrigger value="technical" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Technical Words
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={loadDictionary} disabled={isDictionaryLoaded || isGenerating || animation.isPlaying}>
            <Sparkles className="w-4 h-4 mr-2" />
            {isDictionaryLoaded ? 'Dictionary Loaded' : 'Load Dictionary'}
          </Button>
          <div className="flex items-center space-x-2">
            <Input
              value={dictionarySearchInput}
              onChange={(e) => setDictionarySearchInput(e.target.value)}
              placeholder="Search word/prefix"
              className="w-36"
              disabled={!isDictionaryLoaded || isGenerating || animation.isPlaying}
            />
            <Button onClick={handleSearch} disabled={!isDictionaryLoaded || isGenerating || animation.isPlaying}>
              <FileCheck className="w-4 h-4 mr-2" />Search
            </Button>
            <Button onClick={handlePrefixSearch} disabled={!isDictionaryLoaded || isGenerating || animation.isPlaying}>
              <FileSearch className="w-4 h-4 mr-2" />Prefix
            </Button>
          </div>
          <Button onClick={handleClear} variant="outline" disabled={isGenerating || animation.isPlaying}>
            <Trash2 className="w-4 h-4 mr-2" />Clear
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );

  return (
    <ModernVisualizationBase
      title={TRIE_INFO.name}
      description={TRIE_INFO.description}
      complexity={TRIE_INFO.complexity}
      difficulty={TRIE_INFO.difficulty}
      category={TRIE_INFO.category}
      educational={TRIE_INFO.educational}
      controls={controls}
      metrics={metrics}
    >
      <div className="mb-6">
        {interactiveControls}
      </div>
      
      <div 
        className="w-full p-4 rounded-lg text-center transition-colors duration-300 mb-4"
        style={{ 
          backgroundColor: currentTheme.colors.surface,
          border: `1px solid ${currentTheme.colors.border}`
        }}
      >
        <p className="text-md font-semibold" style={{ color: currentTheme.colors.text }}>
          {description}
        </p>
      </div>
      
      <div className="overflow-auto max-h-[600px] border rounded-lg" style={{ borderColor: currentTheme.colors.border }}>
        <ModernTreeVisualization 
          nodes={nodes} 
          edges={edges} 
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernTrieVisualization;
