import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, RotateCcw, Search, Activity, Layers, Target, Zap, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { useTrie } from '../hooks/useTrie';
import TrieVisualization from './modern/ModernTrieVisualization';

const TrieBuilder: React.FC = () => {
  const [inputWord, setInputWord] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [bulkInput, setBulkInput] = useState('');
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const { words, trie, addWord, removeWord, clearAll, search, stats } = useTrie([]);
  const { currentTheme } = useVisualizationTheme();

  // Sample words for quick demo
  const sampleWords = ['cat', 'car', 'card', 'care', 'careful', 'cats', 'dog', 'dodge', 'door', 'doors'];

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const validateWord = (word: string): string => {
    if (!word.trim()) return 'Word cannot be empty';
    if (!/^[a-zA-Z]+$/.test(word.trim())) return 'Word can only contain letters';
    if (word.trim().length > 20) return 'Word must be 20 characters or less';
    if (words.includes(word.trim().toLowerCase())) return 'Word already exists';
    return '';
  };

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedWord = inputWord.trim().toLowerCase();
    const error = validateWord(trimmedWord);
    
    if (error) {
      setInputError(error);
      return;
    }
    
    addWord(trimmedWord);
    setInputWord('');
    setInputError('');
    setShowSuccess(true);
  };

  const handleBulkAdd = () => {
    const wordsToAdd = bulkInput
      .split(/[\s,\n]+/)
      .map(w => w.trim().toLowerCase())
      .filter(w => w && !words.includes(w) && /^[a-zA-Z]+$/.test(w));
    
    wordsToAdd.forEach(word => addWord(word));
    setBulkInput('');
    setShowBulkAdd(false);
    if (wordsToAdd.length > 0) setShowSuccess(true);
  };

  const loadSampleWords = () => {
    sampleWords.forEach(word => {
      if (!words.includes(word)) {
        addWord(word);
      }
    });
    setShowSuccess(true);
  };

  const searchResult = search(searchInput);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="backdrop-blur-sm" style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: currentTheme.colors.primary }}>
              {stats.totalWords}
            </div>
            <div className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              Total Words
            </div>
            <Activity className="w-4 h-4 mx-auto mt-2" style={{ color: currentTheme.colors.primary }} />
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm" style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: currentTheme.colors.success }}>
              {stats.totalNodes}
            </div>
            <div className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              Total Nodes
            </div>
            <Layers className="w-4 h-4 mx-auto mt-2" style={{ color: currentTheme.colors.success }} />
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm" style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: currentTheme.colors.warning }}>
              {stats.maxDepth}
            </div>
            <div className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              Max Depth
            </div>
            <Target className="w-4 h-4 mx-auto mt-2" style={{ color: currentTheme.colors.warning }} />
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm" style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold mb-1" style={{ color: currentTheme.colors.info }}>
              {stats.memoryUsage}B
            </div>
            <div className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              Memory Usage
            </div>
            <Zap className="w-4 h-4 mx-auto mt-2" style={{ color: currentTheme.colors.info }} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Add Word Form */}
          <Card className="backdrop-blur-sm" style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between" style={{ color: currentTheme.colors.text }}>
                <div className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" style={{ color: currentTheme.colors.primary }} />
                  Add Words
                </div>
                {showSuccess && (
                  <Badge className="animate-pulse" style={{ 
                    backgroundColor: currentTheme.colors.success + '20',
                    color: currentTheme.colors.success,
                    border: `1px solid ${currentTheme.colors.success}30`
                  }}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Added!
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAddWord} className="space-y-3">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={inputWord}
                      onChange={(e) => {
                        setInputWord(e.target.value);
                        if (inputError) setInputError('');
                      }}
                      placeholder="Enter a word (letters only)..."
                      className={`${inputError ? 'border-red-500' : ''}`}
                      style={{ 
                        backgroundColor: currentTheme.colors.background,
                        borderColor: inputError ? currentTheme.colors.error : currentTheme.colors.border,
                        color: currentTheme.colors.text
                      }}
                    />
                    {inputError && (
                      <div className="flex items-center mt-1 text-sm" style={{ color: currentTheme.colors.error }}>
                        <XCircle className="w-4 h-4 mr-1" />
                        {inputError}
                      </div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="px-4"
                    disabled={!!inputError || !inputWord.trim()}
                    style={{ 
                      backgroundColor: currentTheme.colors.primary,
                      color: 'white',
                      opacity: (!!inputError || !inputWord.trim()) ? '0.5' : '1'
                    }}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </form>

              {/* Quick Actions */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button
                    onClick={loadSampleWords}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    style={{ 
                      borderColor: currentTheme.colors.info,
                      color: currentTheme.colors.info
                    }}
                  >
                    <Lightbulb className="w-4 h-4 mr-1" />
                    Load Demo
                  </Button>
                  <Button
                    onClick={() => setShowBulkAdd(!showBulkAdd)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    style={{ 
                      borderColor: currentTheme.colors.warning,
                      color: currentTheme.colors.warning
                    }}
                  >
                    Bulk Add
                  </Button>
                </div>

                {showBulkAdd && (
                  <div className="space-y-2 p-3 rounded-lg" style={{ 
                    backgroundColor: currentTheme.colors.background,
                    border: `1px solid ${currentTheme.colors.border}`
                  }}>
                    <Input
                      value={bulkInput}
                      onChange={(e) => setBulkInput(e.target.value)}
                      placeholder="Enter words separated by spaces or commas..."
                      style={{ 
                        backgroundColor: currentTheme.colors.surface,
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.text
                      }}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleBulkAdd}
                        size="sm"
                        style={{ 
                          backgroundColor: currentTheme.colors.success,
                          color: 'white'
                        }}
                      >
                        Add All
                      </Button>
                      <Button
                        onClick={() => {
                          setShowBulkAdd(false);
                          setBulkInput('');
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Search */}
          <Card className="backdrop-blur-sm" style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: currentTheme.colors.text }}>
                <Search className="w-5 h-5 mr-2" style={{ color: currentTheme.colors.success }} />
                Search & Autocomplete
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for words..."
                style={{ 
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
              />
              
              {searchInput && (
                <div className="mt-4 space-y-3">
                  <Badge 
                    className="w-full justify-center py-2"
                    style={{ 
                      backgroundColor: searchResult.isComplete 
                        ? currentTheme.colors.success + '20' 
                        : currentTheme.colors.warning + '20',
                      color: searchResult.isComplete 
                        ? currentTheme.colors.success 
                        : currentTheme.colors.warning,
                      border: `1px solid ${searchResult.isComplete 
                        ? currentTheme.colors.success 
                        : currentTheme.colors.warning}30`
                    }}
                  >
                    "{searchInput}" {searchResult.isComplete ? 'exists in trie' : 'not found'}
                  </Badge>
                  
                  {searchResult.suggestions.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-2" style={{ color: currentTheme.colors.textSecondary }}>
                        Suggestions:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {searchResult.suggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSearchInput(suggestion)}
                            style={{ 
                              backgroundColor: currentTheme.colors.info + '20',
                              color: currentTheme.colors.info,
                              border: `1px solid ${currentTheme.colors.info}30`
                            }}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Word List */}
          <Card className="backdrop-blur-sm" style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center" style={{ color: currentTheme.colors.text }}>
                  <Layers className="w-5 h-5 mr-2" style={{ color: currentTheme.colors.warning }} />
                  Words in Trie
                </CardTitle>
                <Button
                  onClick={clearAll}
                  variant="outline"
                  size="sm"
                  style={{ 
                    borderColor: currentTheme.colors.error,
                    color: currentTheme.colors.error
                  }}
                  title="Clear all words"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="max-h-64 overflow-y-auto">
                {words.length === 0 ? (
                  <p className="text-center py-4" style={{ color: currentTheme.colors.textSecondary }}>
                    No words added yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {words.map((word, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-3 rounded-lg"
                        style={{ 
                          backgroundColor: currentTheme.colors.background,
                          border: `1px solid ${currentTheme.colors.border}`
                        }}
                      >
                        <span className="font-mono" style={{ color: currentTheme.colors.text }}>
                          {word}
                        </span>
                        <Button
                          onClick={() => removeWord(word)}
                          variant="ghost"
                          size="sm"
                          style={{ color: currentTheme.colors.error }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2">
          <Card className="backdrop-blur-sm overflow-hidden" style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: currentTheme.colors.text }}>
                <Target className="w-5 h-5 mr-2" style={{ color: currentTheme.colors.primary }} />
                Trie Structure
              </CardTitle>
              <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                Yellow circles indicate end of words
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] rounded-lg overflow-hidden" style={{ 
                backgroundColor: currentTheme.colors.background 
              }}>
                {words.length === 0 ? (
                  <div className="flex items-center justify-center h-full" style={{ 
                    color: currentTheme.colors.textSecondary 
                  }}>
                    Add some words to see the trie structure
                  </div>
                ) : (
                  <TrieVisualization
                    root={trie.root}
                    highlightedPath={searchInput ? [searchInput] : []}
                    className="h-full"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrieBuilder;