import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Book, Zap, Filter, Activity, Layers, Target, Clock, RefreshCw, Eye, EyeOff, ArrowUpDown } from 'lucide-react';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { useTrie } from '../hooks/useTrie';
import { allWords, commonEnglishWords, technicalWords } from '../data/dictionary';
import TrieVisualization from './modern/ModernTrieVisualization';

const DictionaryTrie: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'common' | 'technical'>('common');
  const [isLoading, setIsLoading] = useState(true);
  const [lengthFilter, setLengthFilter] = useState<number | null>(null);
  const [showWordList, setShowWordList] = useState(false);
  const [sortBy, setSortBy] = useState<'alpha' | 'length'>('alpha');
  const { currentTheme } = useVisualizationTheme();
  
  const getWordsForCategory = () => {
    let words = [];
    switch (selectedCategory) {
      case 'all': words = [...allWords]; break;
      case 'common': words = [...commonEnglishWords]; break;
      case 'technical': words = [...technicalWords]; break;
      default: words = [...commonEnglishWords];
    }

    // Apply length filter
    if (lengthFilter !== null) {
      words = words.filter(word => word.length === lengthFilter);
    }

    // Apply sorting
    if (sortBy === 'alpha') {
      words.sort();
    } else if (sortBy === 'length') {
      words.sort((a, b) => a.length - b.length || a.localeCompare(b));
    }

    return words;
  };

  const getCurrentWords = () => getWordsForCategory();
  const getLengthDistribution = () => {
    const baseWords = selectedCategory === 'all' ? allWords : 
                     selectedCategory === 'common' ? commonEnglishWords : technicalWords;
    
    const distribution: { [key: number]: number } = {};
    baseWords.forEach(word => {
      distribution[word.length] = (distribution[word.length] || 0) + 1;
    });
    return distribution;
  };

  const { trie, search, stats } = useTrie(getWordsForCategory());

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading time for large dictionary
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const searchResult = search(searchInput);

  return (
    <div className="space-y-6">
      {/* Category Selection */}
      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as 'all' | 'common' | 'technical')} className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto" style={{ 
          backgroundColor: currentTheme.colors.surface,
          borderColor: currentTheme.colors.border 
        }}>
          <TabsTrigger 
            value="common" 
            className="flex items-center space-x-2"
            style={{ 
              color: selectedCategory === 'common' ? currentTheme.colors.text : currentTheme.colors.textSecondary 
            }}
          >
            <Book className="w-4 h-4" />
            <span>Common ({commonEnglishWords.length})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="technical"
            className="flex items-center space-x-2"
            style={{ 
              color: selectedCategory === 'technical' ? currentTheme.colors.text : currentTheme.colors.textSecondary 
            }}
          >
            <Zap className="w-4 h-4" />
            <span>Technical ({technicalWords.length})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="all"
            className="flex items-center space-x-2"
            style={{ 
              color: selectedCategory === 'all' ? currentTheme.colors.text : currentTheme.colors.textSecondary 
            }}
          >
            <Filter className="w-4 h-4" />
            <span>All ({allWords.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="common" className="mt-6">
          <DictionaryContent />
        </TabsContent>
        <TabsContent value="technical" className="mt-6">
          <DictionaryContent />
        </TabsContent>
        <TabsContent value="all" className="mt-6">
          <DictionaryContent />
        </TabsContent>
      </Tabs>
    </div>
  );

  function DictionaryContent() {
    return (
      <>
        {/* Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
                Nodes Created
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
                O(k)
              </div>
              <div className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                Search Time
              </div>
              <Clock className="w-4 h-4 mx-auto mt-2" style={{ color: currentTheme.colors.info }} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search */}
          <div className="lg:col-span-1">
            <Card className="backdrop-blur-sm" style={{ 
              backgroundColor: currentTheme.colors.surface + '95',
              borderColor: currentTheme.colors.border 
            }}>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: currentTheme.colors.text }}>
                  <Search className="w-5 h-5 mr-2" style={{ color: currentTheme.colors.primary }} />
                  Dictionary Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search Input */}
                <Input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search dictionary..."
                  style={{ 
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                />

                {/* Filters */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>
                      Filters & Controls
                    </span>
                    <Button
                      onClick={() => {
                        setLengthFilter(null);
                        setSearchInput('');
                        setSortBy('alpha');
                      }}
                      variant="outline"
                      size="sm"
                      style={{ 
                        borderColor: currentTheme.colors.warning,
                        color: currentTheme.colors.warning
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                  </div>

                  {/* Word Length Filter */}
                  <div className="space-y-2">
                    <div className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                      Filter by Length:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge
                        className={`cursor-pointer transition-colors ${lengthFilter === null ? 'opacity-100' : 'opacity-50'}`}
                        onClick={() => setLengthFilter(null)}
                        style={{ 
                          backgroundColor: lengthFilter === null 
                            ? currentTheme.colors.primary + '30' 
                            : currentTheme.colors.surface,
                          color: lengthFilter === null 
                            ? currentTheme.colors.primary 
                            : currentTheme.colors.textSecondary,
                          border: `1px solid ${lengthFilter === null 
                            ? currentTheme.colors.primary 
                            : currentTheme.colors.border}50`
                        }}
                      >
                        All
                      </Badge>
                      {Object.entries(getLengthDistribution())
                        .sort(([a], [b]) => parseInt(a) - parseInt(b))
                        .slice(0, 8)
                        .map(([length, count]) => (
                          <Badge
                            key={length}
                            className={`cursor-pointer transition-colors ${lengthFilter === parseInt(length) ? 'opacity-100' : 'opacity-70'}`}
                            onClick={() => setLengthFilter(parseInt(length))}
                            style={{ 
                              backgroundColor: lengthFilter === parseInt(length) 
                                ? currentTheme.colors.info + '30' 
                                : currentTheme.colors.surface,
                              color: lengthFilter === parseInt(length) 
                                ? currentTheme.colors.info 
                                : currentTheme.colors.textSecondary,
                              border: `1px solid ${lengthFilter === parseInt(length) 
                                ? currentTheme.colors.info 
                                : currentTheme.colors.border}50`,
                              fontSize: '0.7rem'
                            }}
                          >
                            {length}L ({count})
                          </Badge>
                        ))}
                    </div>
                  </div>

                  {/* Sort Controls */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSortBy('alpha')}
                      variant={sortBy === 'alpha' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      style={sortBy === 'alpha' ? { 
                        backgroundColor: currentTheme.colors.primary,
                        color: 'white'
                      } : {
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.textSecondary
                      }}
                    >
                      A-Z
                    </Button>
                    <Button
                      onClick={() => setSortBy('length')}
                      variant={sortBy === 'length' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      style={sortBy === 'length' ? { 
                        backgroundColor: currentTheme.colors.primary,
                        color: 'white'
                      } : {
                        borderColor: currentTheme.colors.border,
                        color: currentTheme.colors.textSecondary
                      }}
                    >
                      <ArrowUpDown className="w-4 h-4 mr-1" />
                      Length
                    </Button>
                  </div>

                  {/* Word List Toggle */}
                  <Button
                    onClick={() => setShowWordList(!showWordList)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    style={{ 
                      borderColor: currentTheme.colors.info,
                      color: currentTheme.colors.info
                    }}
                  >
                    {showWordList ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showWordList ? 'Hide' : 'Show'} Word List
                  </Button>

                  {/* Word List */}
                  {showWordList && (
                    <div className="max-h-48 overflow-y-auto p-3 rounded-lg space-y-1" style={{ 
                      backgroundColor: currentTheme.colors.background,
                      border: `1px solid ${currentTheme.colors.border}`
                    }}>
                      <div className="text-xs mb-2" style={{ color: currentTheme.colors.textSecondary }}>
                        Showing {getCurrentWords().length} words:
                      </div>
                      {getCurrentWords().slice(0, 100).map((word, index) => (
                        <Badge
                          key={index}
                          className="mr-1 mb-1 cursor-pointer hover:opacity-80"
                          onClick={() => setSearchInput(word)}
                          style={{ 
                            backgroundColor: currentTheme.colors.surface,
                            color: currentTheme.colors.text,
                            border: `1px solid ${currentTheme.colors.border}30`,
                            fontSize: '0.7rem'
                          }}
                        >
                          {word}
                        </Badge>
                      ))}
                      {getCurrentWords().length > 100 && (
                        <div className="text-xs text-center mt-2" style={{ color: currentTheme.colors.textSecondary }}>
                          ... and {getCurrentWords().length - 100} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Search Results */}
                {isLoading ? (
                  <div className="text-center py-4" style={{ color: currentTheme.colors.textSecondary }}>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2" style={{ borderColor: currentTheme.colors.primary }}></div>
                    Loading dictionary...
                  </div>
                ) : searchInput && (
                  <div className="space-y-3">
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
                      "{searchInput}" {searchResult.isComplete ? 'found in dictionary' : 'not found'}
                    </Badge>
                    
                    {searchResult.suggestions.length > 0 && (
                      <div>
                        <div className="text-sm font-medium mb-2" style={{ color: currentTheme.colors.textSecondary }}>
                          Suggestions ({searchResult.suggestions.length}):
                        </div>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {searchResult.suggestions.slice(0, 15).map((suggestion, index) => (
                            <Badge
                              key={index}
                              className="block cursor-pointer hover:opacity-80 transition-opacity text-left"
                              onClick={() => setSearchInput(suggestion)}
                              style={{ 
                                backgroundColor: currentTheme.colors.info + '15',
                                color: currentTheme.colors.info,
                                border: `1px solid ${currentTheme.colors.info}30`
                              }}
                            >
                              {suggestion}
                            </Badge>
                          ))}
                          {searchResult.suggestions.length > 15 && (
                            <div className="text-xs text-center py-2" style={{ color: currentTheme.colors.textSecondary }}>
                              +{searchResult.suggestions.length - 15} more suggestions
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                  Dictionary Trie Structure
                </CardTitle>
                <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                  Showing {selectedCategory} word collection with {stats.totalWords.toLocaleString()} words
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] rounded-lg overflow-hidden" style={{ 
                  backgroundColor: currentTheme.colors.background 
                }}>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full" style={{ color: currentTheme.colors.textSecondary }}>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 mr-4" style={{ borderColor: currentTheme.colors.primary }}></div>
                      Building trie structure...
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
      </>
    );
  }
};

export default DictionaryTrie;