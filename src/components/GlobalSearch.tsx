import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X, ArrowRight, BookOpen, Code, Users, Gamepad2, Brain, Building, Settings, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  route: string;
  icon: any;
  tags: string[];
  relevanceScore: number;
}

const searchData: Omit<SearchResult, 'relevanceScore'>[] = [
  // Algorithms
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    description: 'Simple comparison-based sorting algorithm with O(n²) complexity',
    category: 'Algorithm',
    route: '/learning?algorithm=bubble-sort&tab=tutorials',
    icon: Code,
    tags: ['sorting', 'beginner', 'comparison', 'stable', 'in-place']
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    description: 'Efficient divide-and-conquer sorting algorithm',
    category: 'Algorithm',
    route: '/learning?algorithm=quick-sort&tab=tutorials',
    icon: Code,
    tags: ['sorting', 'intermediate', 'divide-conquer', 'in-place']
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    description: 'Stable divide-and-conquer sorting algorithm',
    category: 'Algorithm',
    route: '/learning?algorithm=merge-sort&tab=tutorials',
    icon: Code,
    tags: ['sorting', 'intermediate', 'divide-conquer', 'stable']
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Efficient search algorithm for sorted arrays',
    category: 'Algorithm',
    route: '/learning?algorithm=binary-search&tab=tutorials',
    icon: Code,
    tags: ['search', 'beginner', 'divide-conquer', 'logarithmic']
  },
  {
    id: 'bfs',
    title: 'Breadth-First Search',
    description: 'Graph traversal algorithm using queue',
    category: 'Algorithm',
    route: '/learning?algorithm=bfs&tab=tutorials',
    icon: Code,
    tags: ['graph', 'traversal', 'queue', 'unweighted']
  },
  {
    id: 'dfs',
    title: 'Depth-First Search',
    description: 'Graph traversal algorithm using stack',
    category: 'Algorithm',
    route: '/learning?algorithm=dfs&tab=tutorials',
    icon: Code,
    tags: ['graph', 'traversal', 'stack', 'recursive']
  },
  {
    id: 'dijkstra',
    title: 'Dijkstra\'s Algorithm',
    description: 'Shortest path algorithm for weighted graphs',
    category: 'Algorithm',
    route: '/learning?algorithm=dijkstra&tab=tutorials',
    icon: Code,
    tags: ['graph', 'shortest-path', 'weighted', 'greedy']
  },
  // Pages/Features
  {
    id: 'learning-hub',
    title: 'Learning Hub',
    description: 'Interactive tutorials and visualizations for algorithms',
    category: 'Page',
    route: '/learning',
    icon: BookOpen,
    tags: ['tutorials', 'visualizations', 'interactive', 'learning']
  },
  {
    id: 'ai-learning',
    title: 'AI Learning',
    description: 'Personalized learning paths powered by AI',
    category: 'Page',
    route: '/ai-learning',
    icon: Brain,
    tags: ['artificial-intelligence', 'personalized', 'adaptive']
  },
  {
    id: 'collaborative',
    title: 'Collaborative Learning',
    description: 'Study with peers in real-time sessions',
    category: 'Page',
    route: '/collaborative',
    icon: Users,
    tags: ['collaboration', 'real-time', 'peers', 'study-groups']
  },
  {
    id: 'gamification',
    title: 'Gamification',
    description: 'Learn through challenges and achievements',
    category: 'Page',
    route: '/gamification',
    icon: Gamepad2,
    tags: ['challenges', 'achievements', 'competitive', 'rewards']
  },
  {
    id: 'enterprise',
    title: 'Enterprise Solutions',
    description: 'Advanced tools for educational institutions',
    category: 'Page',
    route: '/enterprise',
    icon: Building,
    tags: ['enterprise', 'institutions', 'advanced', 'management']
  },
  {
    id: 'content-management',
    title: 'Content Management',
    description: 'Platform management and optimization tools',
    category: 'Page',
    route: '/content-management',
    icon: Settings,
    tags: ['management', 'optimization', 'admin', 'content']
  },
  // Data Structures
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Basic linear data structure with indexed elements',
    category: 'Data Structure',
    route: '/learning?algorithm=arrays&tab=tutorials',
    icon: Code,
    tags: ['linear', 'indexed', 'basic', 'collection']
  },
  {
    id: 'linked-list',
    title: 'Linked Lists',
    description: 'Dynamic linear data structure with nodes',
    category: 'Data Structure',
    route: '/learning?algorithm=linked-list&tab=tutorials',
    icon: Code,
    tags: ['linear', 'dynamic', 'nodes', 'pointers']
  },
  {
    id: 'stacks',
    title: 'Stacks',
    description: 'LIFO (Last In, First Out) data structure',
    category: 'Data Structure',
    route: '/learning?algorithm=stacks&tab=tutorials',
    icon: Code,
    tags: ['lifo', 'push', 'pop', 'linear']
  },
  {
    id: 'queues',
    title: 'Queues',
    description: 'FIFO (First In, First Out) data structure',
    category: 'Data Structure',
    route: '/learning?algorithm=queues&tab=tutorials',
    icon: Code,
    tags: ['fifo', 'enqueue', 'dequeue', 'linear']
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'Hierarchical data structure with root and children',
    category: 'Data Structure',
    route: '/learning?algorithm=trees&tab=tutorials',
    icon: Code,
    tags: ['hierarchical', 'root', 'children', 'recursive']
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Network data structure with vertices and edges',
    category: 'Data Structure',
    route: '/learning?algorithm=graphs&tab=tutorials',
    icon: Code,
    tags: ['network', 'vertices', 'edges', 'connections']
  }
];

interface GlobalSearchProps {
  query: string;
  onSelect: (result: SearchResult) => void;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ query, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return searchData.map(item => ({ ...item, relevanceScore: 0 })).slice(0, 8);
    }

    const term = searchTerm.toLowerCase();
    const results = searchData.map(item => {
      let score = 0;
      
      // Title exact match
      if (item.title.toLowerCase() === term) score += 100;
      // Title starts with
      else if (item.title.toLowerCase().startsWith(term)) score += 80;
      // Title contains
      else if (item.title.toLowerCase().includes(term)) score += 60;
      
      // Description contains
      if (item.description.toLowerCase().includes(term)) score += 40;
      
      // Tags match
      const tagMatches = item.tags.filter(tag => 
        tag.toLowerCase().includes(term) || term.includes(tag.toLowerCase())
      );
      score += tagMatches.length * 30;
      
      // Category match
      if (item.category.toLowerCase().includes(term)) score += 20;

      return { ...item, relevanceScore: score };
    });

    return results
      .filter(item => item.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10);
  }, [searchTerm]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Algorithm': return 'bg-blue-600';
      case 'Data Structure': return 'bg-green-600';
      case 'Page': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4 bg-slate-900/95 backdrop-blur-lg border-white/20">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 p-4 border-b border-white/20">
            <Search className="w-5 h-5 text-white/60" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search algorithms, features, pages..."
              className="border-0 bg-transparent text-white placeholder-white/60 focus-visible:ring-0"
              autoFocus
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="p-2">
                {searchResults.map((result) => {
                  const IconComponent = result.icon;
                  return (
                    <div
                      key={result.id}
                      onClick={() => onSelect(result)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-medium truncate">{result.title}</h3>
                          <Badge className={`${getCategoryColor(result.category)} text-white text-xs`}>
                            {result.category}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm truncate">{result.description}</p>
                        <div className="flex gap-1 mt-1">
                          {result.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="border-white/30 text-white/60 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">No results found</h3>
                <p className="text-white/70">Try searching for algorithms, data structures, or features</p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/20 bg-white/5">
            <div className="flex items-center justify-between text-sm text-white/60">
              <span>Press Enter to select • ESC to close</span>
              <span>{searchResults.length} results</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
