import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Header } from '@/components/Header';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import ModernRedBlackTreeVisualization from '@/components/modern/ModernRedBlackTreeVisualization';
import ModernBTreeVisualization from '@/components/modern/ModernBTreeVisualization';
import ModernBPlusTreeVisualization from '@/components/modern/ModernBPlusTreeVisualization';
import ModernBinomialHeapVisualization from '@/components/modern/ModernBinomialHeapVisualization';
import ModernFibonacciHeapVisualization from '@/components/modern/ModernFibonacciHeapVisualization';
import { 
  Target, 
  Database, 
  Settings, 
  Navigation, 
  TrendingUp, 
  Zap,
  ArrowLeft,
  BookOpen,
  Star,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DataStructure {
  id: string;
  title: string;
  description: string;
  complexity: {
    search: string;
    insert: string;
    delete: string;
    space: string;
  };
  icon: React.ReactNode;
  component: React.ReactNode;
  difficulty: 'Advanced' | 'Expert';
  category: 'Trees' | 'Heaps';
  features: string[];
  useCases: string[];
}

export default function AdvancedDataStructures() {
  const { currentTheme } = useVisualizationTheme();
  const [selectedStructure, setSelectedStructure] = useState('red-black-tree');

  const dataStructures: DataStructure[] = [
    {
      id: 'red-black-tree',
      title: 'Red-Black Tree',
      description: 'A self-balancing binary search tree where each node has a color (red or black) and follows specific rules to maintain balance.',
      complexity: {
        search: 'O(log n)',
        insert: 'O(log n)',
        delete: 'O(log n)',
        space: 'O(n)'
      },
      icon: <Target className="w-6 h-6" />,
      component: <ModernRedBlackTreeVisualization />,
      difficulty: 'Advanced',
      category: 'Trees',
      features: [
        'Self-balancing binary search tree',
        'Color-coded nodes (red/black)',
        'Automatic rotation operations',
        'Guaranteed O(log n) height',
        'Property validation'
      ],
      useCases: [
        'Standard library implementations (C++ std::map)',
        'Database indexing',
        'Operating system schedulers',
        'Memory management'
      ]
    },
    {
      id: 'b-tree',
      title: 'B-Tree',
      description: 'A self-balancing multi-way search tree optimized for systems that read and write large blocks of data.',
      complexity: {
        search: 'O(log n)',
        insert: 'O(log n)',
        delete: 'O(log n)',
        space: 'O(n)'
      },
      icon: <Settings className="w-6 h-6" />,
      component: <ModernBTreeVisualization />,
      difficulty: 'Advanced',
      category: 'Trees',
      features: [
        'Multi-way search tree',
        'Variable node degree',
        'Node splitting on overflow',
        'Disk-friendly design',
        'Balanced structure maintenance'
      ],
      useCases: [
        'Database indexing (MySQL, PostgreSQL)',
        'File systems (NTFS, ext4)',
        'Key-value stores',
        'Large dataset indexing'
      ]
    },
    {
      id: 'b-plus-tree',
      title: 'B+ Tree',
      description: 'An enhanced version of B-tree where all data is stored in leaf nodes and leaves are linked for efficient range queries.',
      complexity: {
        search: 'O(log n)',
        insert: 'O(log n)',
        delete: 'O(log n)',
        space: 'O(n)'
      },
      icon: <Navigation className="w-6 h-6" />,
      component: <ModernBPlusTreeVisualization />,
      difficulty: 'Advanced',
      category: 'Trees',
      features: [
        'All data in leaf nodes',
        'Linked leaf nodes',
        'Efficient range queries',
        'Sequential access optimization',
        'Database-friendly design'
      ],
      useCases: [
        'Database management systems',
        'File system indexing',
        'Range query optimization',
        'Sequential data access'
      ]
    },
    {
      id: 'binomial-heap',
      title: 'Binomial Heap',
      description: 'A collection of binomial trees that supports efficient merge operations and priority queue functionality.',
      complexity: {
        search: 'O(log n)',
        insert: 'O(log n)',
        delete: 'O(log n)',
        space: 'O(n)'
      },
      icon: <TrendingUp className="w-6 h-6" />,
      component: <ModernBinomialHeapVisualization />,
      difficulty: 'Advanced',
      category: 'Heaps',
      features: [
        'Collection of binomial trees',
        'Efficient merge operations',
        'Min-heap property',
        'Degree-based organization',
        'Logarithmic operations'
      ],
      useCases: [
        'Priority queues with merge',
        'Graph algorithms (Dijkstra\'s)',
        'Parallel computing',
        'Union-find optimization'
      ]
    },
    {
      id: 'fibonacci-heap',
      title: 'Fibonacci Heap',
      description: 'An advanced heap data structure with amortized O(1) operations, featuring decrease-key and cascading cuts.',
      complexity: {
        search: 'O(log n)',
        insert: 'O(1)*',
        delete: 'O(log n)*',
        space: 'O(n)'
      },
      icon: <Zap className="w-6 h-6" />,
      component: <ModernFibonacciHeapVisualization />,
      difficulty: 'Expert',
      category: 'Heaps',
      features: [
        'Amortized O(1) operations',
        'Decrease-key in O(1)',
        'Cascading cuts mechanism',
        'Marked node tracking',
        'Complex balancing rules'
      ],
      useCases: [
        'Dijkstra\'s shortest path',
        'Prim\'s minimum spanning tree',
        'Network optimization',
        'Advanced graph algorithms'
      ]
    }
  ];

  const currentStructure = dataStructures.find(ds => ds.id === selectedStructure) || dataStructures[0];

  return (
    <div>
      {/* <Header /> */}
      <div 
        className="min-h-screen transition-all duration-300 pt-20"
        style={{ 
          backgroundColor: currentTheme.colors.background,
          color: currentTheme.colors.text 
        }}
      >
        {/* Header */}
        <div className="border-b" style={{ borderColor: currentTheme.colors.border }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/demo">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Demo
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>
                  Advanced Data Structures
                </h1>
                <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                  Explore sophisticated data structures with modern visualizations
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Star className="w-3 h-3 mr-1" />
              Advanced
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card style={{ backgroundColor: currentTheme.colors.surface, borderColor: currentTheme.colors.border }}>
              <CardHeader>
                <CardTitle className="text-lg">Data Structures</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {dataStructures.map((structure) => (
                  <Button
                    key={structure.id}
                    variant={selectedStructure === structure.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedStructure(structure.id)}
                    style={{
                      backgroundColor: selectedStructure === structure.id 
                        ? currentTheme.colors.primary 
                        : 'transparent'
                    }}
                  >
                    {structure.icon}
                    <span className="ml-2">{structure.title}</span>
                    <Badge 
                      variant={structure.difficulty === 'Expert' ? 'destructive' : 'secondary'}
                      className="ml-auto text-xs"
                    >
                      {structure.difficulty}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Structure Info */}
            <Card style={{ backgroundColor: currentTheme.colors.surface, borderColor: currentTheme.colors.border }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {currentStructure.icon}
                  {currentStructure.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                  {currentStructure.description}
                </p>

                <div>
                  <h4 className="font-semibold mb-2">Time Complexity</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Search:</span>
                      <Badge variant="outline">{currentStructure.complexity.search}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Insert:</span>
                      <Badge variant="outline">{currentStructure.complexity.insert}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Delete:</span>
                      <Badge variant="outline">{currentStructure.complexity.delete}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Space:</span>
                      <Badge variant="outline">{currentStructure.complexity.space}</Badge>
                    </div>
                  </div>
                  {currentStructure.complexity.insert.includes('*') && (
                    <p className="text-xs mt-2" style={{ color: currentTheme.colors.textSecondary }}>
                      * Amortized complexity
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Key Features</h4>
                  <ul className="space-y-1 text-sm">
                    {currentStructure.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: currentTheme.colors.primary }}
                        />
                        <span style={{ color: currentTheme.colors.textSecondary }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Use Cases</h4>
                  <ul className="space-y-1 text-sm">
                    {currentStructure.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <BookOpen className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: currentTheme.colors.secondary }} />
                        <span style={{ color: currentTheme.colors.textSecondary }}>
                          {useCase}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card style={{ backgroundColor: currentTheme.colors.surface, borderColor: currentTheme.colors.border }}>
              <CardContent className="p-0">
                {currentStructure.component}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
