
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X, Clock, BarChart3 } from 'lucide-react';

interface AlgorithmInfo {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  tags: string[];
}

const algorithmData: AlgorithmInfo[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    difficulty: 'Beginner',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Simple comparison-based sorting algorithm',
    tags: ['sorting', 'comparison', 'in-place', 'stable']
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    difficulty: 'Intermediate',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    description: 'Efficient divide-and-conquer sorting algorithm',
    tags: ['sorting', 'divide-conquer', 'in-place', 'unstable']
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    difficulty: 'Intermediate',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Stable divide-and-conquer sorting algorithm',
    tags: ['sorting', 'divide-conquer', 'stable', 'external']
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Search',
    difficulty: 'Beginner',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Efficient search algorithm for sorted arrays',
    tags: ['search', 'divide-conquer', 'sorted']
  },
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'Graph',
    difficulty: 'Intermediate',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Graph traversal algorithm using queue',
    tags: ['graph', 'traversal', 'queue', 'unweighted']
  },
  {
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'Graph',
    difficulty: 'Intermediate',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    description: 'Graph traversal algorithm using stack',
    tags: ['graph', 'traversal', 'stack', 'recursive']
  },
  {
    id: 'dijkstra',
    name: 'Dijkstra\'s Algorithm',
    category: 'Graph',
    difficulty: 'Advanced',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V)',
    description: 'Shortest path algorithm for weighted graphs',
    tags: ['graph', 'shortest-path', 'weighted', 'greedy']
  },
  {
    id: 'binary-tree',
    name: 'Binary Tree',
    category: 'Tree',
    difficulty: 'Beginner',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Hierarchical data structure with two children per node',
    tags: ['tree', 'hierarchical', 'recursive']
  },
  {
    id: 'avl-tree',
    name: 'AVL Tree',
    category: 'Tree',
    difficulty: 'Advanced',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(log n)',
    description: 'Self-balancing binary search tree',
    tags: ['tree', 'balanced', 'rotation', 'height-balanced']
  },
  {
    id: 'heap',
    name: 'Heap',
    category: 'Tree',
    difficulty: 'Intermediate',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Complete binary tree with heap property',
    tags: ['tree', 'priority-queue', 'heapify', 'complete']
  }
];

interface SearchAndFilterProps {
  onAlgorithmSelect?: (algorithmId: string) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onAlgorithmSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = ['all', ...Array.from(new Set(algorithmData.map(a => a.category)))];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  const complexities = ['all', 'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(V + E)', 'O(E log V)'];

  const filteredAlgorithms = useMemo(() => {
    return algorithmData.filter(algorithm => {
      const matchesSearch = algorithm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           algorithm.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           algorithm.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || algorithm.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || algorithm.difficulty === selectedDifficulty;
      const matchesComplexity = selectedComplexity === 'all' || 
                               algorithm.timeComplexity === selectedComplexity ||
                               algorithm.spaceComplexity === selectedComplexity;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesComplexity;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedComplexity]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedComplexity('all');
    setActiveFilters([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('n²') || complexity.includes('2^n')) return 'bg-red-500';
    if (complexity.includes('n log n') || complexity.includes('E log V')) return 'bg-yellow-500';
    if (complexity.includes('log n')) return 'bg-green-500';
    if (complexity.includes('n') || complexity.includes('V + E')) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Algorithm Search & Filter</h2>
        <p className="text-white/70">Find the perfect algorithm for your needs</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <Input
              placeholder="Search algorithms, descriptions, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-white/10">
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty} className="text-white hover:bg-white/10">
                      {difficulty === 'all' ? 'All Difficulties' : difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Complexity</label>
              <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  {complexities.map((complexity) => (
                    <SelectItem key={complexity} value={complexity} className="text-white hover:bg-white/10">
                      {complexity === 'all' ? 'All Complexities' : complexity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={clearFilters}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">
              {filteredAlgorithms.length} algorithm{filteredAlgorithms.length !== 1 ? 's' : ''} found
            </span>
            {(searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedComplexity !== 'all') && (
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Filter className="w-3 h-3 mr-1" />
                Filters Active
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAlgorithms.map((algorithm) => (
          <Card 
            key={algorithm.id} 
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
            onClick={() => onAlgorithmSelect?.(algorithm.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-white text-lg">{algorithm.name}</CardTitle>
                <Badge className={`${getDifficultyColor(algorithm.difficulty)} text-white text-xs`}>
                  {algorithm.difficulty}
                </Badge>
              </div>
              <p className="text-white/70 text-sm">{algorithm.description}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white/60" />
                  <span className="text-white/80 text-sm">Time:</span>
                  <Badge className={`${getComplexityColor(algorithm.timeComplexity)} text-white text-xs`}>
                    {algorithm.timeComplexity}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-white/60" />
                  <span className="text-white/80 text-sm">Space:</span>
                  <Badge className={`${getComplexityColor(algorithm.spaceComplexity)} text-white text-xs`}>
                    {algorithm.spaceComplexity}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {algorithm.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="border-white/30 text-white/70 text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {algorithm.tags.length > 3 && (
                    <Badge variant="outline" className="border-white/30 text-white/70 text-xs">
                      +{algorithm.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlgorithms.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="text-center py-12">
            <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">No algorithms found</h3>
            <p className="text-white/70 mb-4">Try adjusting your search terms or filters</p>
            <Button onClick={clearFilters} variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
