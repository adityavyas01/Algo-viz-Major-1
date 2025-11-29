import React, { useState, useMemo, useCallback } from 'react';
import ModernVisualizationBase from './ModernVisualizationBase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Search, Plus, Trash2, Hash, GitMerge, Target, AlertCircle } from 'lucide-react';
import { useAnimation } from '@/hooks/useAnimation';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { 
  HashTable, 
  HashTableStep, 
  generateInsertSteps, 
  generateSearchSteps, 
  generateDeleteSteps 
} from '@/lib/algorithms/data-structures/hash-table';

const ModernHashTableVisualization: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [hashTable] = useState(() => new HashTable(10));
  const [steps, setSteps] = useState<HashTableStep[]>([]);
  const [speed, setSpeed] = useState(500);
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [operation, setOperation] = useState<'insert' | 'search' | 'delete'>('insert');
  
  const animation = useAnimation<HashTableStep>(steps, speed);

  const handleOperation = useCallback(() => {
    if (!keyInput) return;
    
    let newSteps: HashTableStep[] = [];
    
    if (operation === 'insert') {
      if (!valueInput) return;
      newSteps = generateInsertSteps(hashTable, keyInput, valueInput);
      hashTable.insert(keyInput, valueInput);
    } else if (operation === 'search') {
      newSteps = generateSearchSteps(hashTable, keyInput);
    } else if (operation === 'delete') {
      newSteps = generateDeleteSteps(hashTable, keyInput);
      hashTable.delete(keyInput);
    }
    
    setSteps(newSteps);
    setKeyInput('');
    setValueInput('');
    animation.reset();
    animation.play();
  }, [keyInput, valueInput, operation, hashTable, animation]);

  const loadSampleData = useCallback(() => {
    const samples = [
      { key: 'apple', value: '🍎' },
      { key: 'banana', value: '🍌' },
      { key: 'cherry', value: '🍒' },
      { key: 'date', value: '📅' },
      { key: 'elderberry', value: '🫐' },
    ];
    
    samples.forEach(({ key, value }) => {
      hashTable.insert(key, value);
    });
    
    const finalSteps = generateInsertSteps(hashTable, 'grape', '🍇');
    hashTable.insert('grape', '🍇');
    setSteps(finalSteps);
    animation.reset();
  }, [hashTable, animation]);

  const currentStep = animation.currentStep;
  const table = currentStep?.table || Array.from({ length: 10 }, () => []);
  const highlightedIndex = currentStep?.highlightedIndex;
  const highlightedChainIndex = currentStep?.highlightedChainIndex;

  const metrics = useMemo(() => {
    if (!currentStep) return [];
    
    const totalEntries = table.reduce((sum, chain) => sum + chain.length, 0);
    const loadFactor = (totalEntries / hashTable.size).toFixed(2);
    
    return [
      {
        label: 'Hash Value',
        value: currentStep.hashValue,
        icon: <Hash className="w-4 h-4" />,
        color: currentTheme.colors.primary,
      },
      {
        label: 'Collisions',
        value: currentStep.collisionCount,
        icon: <GitMerge className="w-4 h-4" />,
        color: currentStep.collisionCount > 0 ? '#ef4444' : '#10b981',
      },
      {
        label: 'Load Factor',
        value: loadFactor,
        icon: <Target className="w-4 h-4" />,
        color: '#f59e0b',
      },
      {
        label: 'Total Entries',
        value: totalEntries,
        icon: <AlertCircle className="w-4 h-4" />,
        color: '#8b5cf6',
      },
    ];
  }, [currentStep, table, currentTheme, hashTable.size]);

  const controls = {
    isPlaying: animation.isPlaying,
    onPlay: animation.play,
    onPause: animation.pause,
    onReset: () => {
      animation.reset();
    },
    onStepForward: animation.nextStep,
    onStepBack: animation.prevStep,
    currentStep: animation.currentStepIndex,
    totalSteps: steps.length,
    speed,
    onSpeedChange: setSpeed,
  };

  const interactiveControls = (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-center gap-2 bg-background p-1 rounded-lg">
        <Button 
          onClick={() => setOperation('insert')} 
          variant={operation === 'insert' ? 'default' : 'ghost'} 
          size="sm"
        >
          Insert
        </Button>
        <Button 
          onClick={() => setOperation('search')} 
          variant={operation === 'search' ? 'default' : 'ghost'} 
          size="sm"
        >
          Search
        </Button>
        <Button 
          onClick={() => setOperation('delete')} 
          variant={operation === 'delete' ? 'default' : 'ghost'} 
          size="sm"
        >
          Delete
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Input 
          value={keyInput} 
          onChange={(e) => setKeyInput(e.target.value)} 
          placeholder="Key (e.g., 'apple')" 
          className="flex-1"
        />
        {operation === 'insert' && (
          <Input 
            value={valueInput} 
            onChange={(e) => setValueInput(e.target.value)} 
            placeholder="Value" 
            className="flex-1"
          />
        )}
        <Button onClick={handleOperation} className="min-w-[100px]">
          {operation === 'insert' && <Plus className="w-4 h-4 mr-2" />}
          {operation === 'search' && <Search className="w-4 h-4 mr-2" />}
          {operation === 'delete' && <Trash2 className="w-4 h-4 mr-2" />}
          Go
        </Button>
      </div>
      
      <Button onClick={loadSampleData} variant="outline" size="sm">
        Load Sample Data
      </Button>
    </div>
  );

  const visualization = (
    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 space-y-2">
      {table.map((chain, index) => {
        const isHighlighted = highlightedIndex === index;
        const phaseColor = currentStep?.phase === 'found' || currentStep?.phase === 'complete' 
          ? 'bg-green-900/30 border-green-500' 
          : currentStep?.phase === 'not-found' 
          ? 'bg-red-900/30 border-red-500'
          : isHighlighted 
          ? 'bg-blue-900/30 border-blue-500' 
          : 'border-gray-700';
        
        return (
          <div 
            key={index} 
            className={`flex items-center p-3 rounded-lg transition-all duration-300 border-2 ${phaseColor}`}
          >
            <div className="w-16 text-center font-mono text-sm text-gray-400 flex-shrink-0 font-bold">
              [{index}]
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {chain.map((entry, entryIndex) => {
                const isEntryHighlighted = isHighlighted && highlightedChainIndex === entryIndex;
                return (
                  <React.Fragment key={entry.key}>
                    <div 
                      className={`flex-shrink-0 p-3 rounded-lg text-sm transition-all duration-300 ${
                        isEntryHighlighted 
                          ? 'bg-yellow-600 scale-110 shadow-lg' 
                          : 'bg-gray-800'
                      }`}
                    >
                      <span className="font-bold text-purple-400">{entry.key}</span>
                      <span className="text-gray-400 mx-1">→</span>
                      <span className="text-white">{entry.value}</span>
                    </div>
                    {entryIndex < chain.length - 1 && (
                      <ArrowRight className="text-gray-500 flex-shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
              {chain.length === 0 && (
                <div className="text-gray-600 text-xs italic">EMPTY</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const educational = {
    keyPoints: [
      "Hash tables provide O(1) average-case time complexity for insertion, deletion, and search operations.",
      "A hash function converts keys into array indices, distributing entries across the table.",
      "Collisions occur when multiple keys hash to the same index.",
      "Separate chaining resolves collisions by storing multiple entries in a linked list at each index.",
      "Load factor (entries/size) affects performance; rehashing may be needed when it's too high.",
    ],
    pseudocode: [
      "// Hash function",
      "function hash(key):",
      "  hashValue = 0",
      "  for each character c in key:",
      "    hashValue = (hashValue + charCode(c)) % tableSize",
      "  return hashValue",
      "",
      "// Insert with collision handling",
      "function insert(key, value):",
      "  index = hash(key)",
      "  for each entry in table[index]:",
      "    if entry.key == key:",
      "      entry.value = value  // Update",
      "      return",
      "  table[index].append({key, value})  // Add to chain",
    ],
    realWorldUse: [
      "Database indexing for fast record lookup",
      "Caching systems (e.g., Redis, Memcached)",
      "Symbol tables in compilers and interpreters",
      "Implementing sets and maps in programming languages",
      "Browser history and DNS resolution",
    ],
  };

  const currentStepDescription = currentStep?.description || 'Ready to perform hash table operations';

  return (
    <ModernVisualizationBase
      title="Hash Table with Collision Handling"
      description="A data structure that maps keys to values using a hash function. Watch how separate chaining resolves collisions!"
      difficulty="Intermediate"
      category="Data Structures"
      complexity={{
        time: "O(1) avg, O(n) worst",
        space: "O(n)"
      }}
      controls={controls}
      metrics={metrics}
      educational={educational}
      interactiveControls={interactiveControls}
    >
      <div className="flex flex-col items-center space-y-4">
        {visualization}
        <div className="text-center text-sm text-gray-400 p-4 bg-gray-900/30 rounded-lg border border-gray-700 max-w-2xl">
          <p className="font-semibold text-lg mb-2">{currentStepDescription}</p>
          {currentStep?.phase === 'found' && (
            <p className="text-green-400">✓ Operation successful!</p>
          )}
          {currentStep?.phase === 'not-found' && (
            <p className="text-red-400">✗ Key not found in hash table</p>
          )}
        </div>
      </div>
    </ModernVisualizationBase>
  );
};

export default ModernHashTableVisualization;
