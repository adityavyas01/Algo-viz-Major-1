
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

type DemoType = 'bubble' | 'selection' | 'quick' | 'merge' | 'binary-search' | 'linkedlist' | 'stack' | 'queue' | 'binarytree' | 'hashtable' | 'graph' | 'avl' | 'redblack' | 'heap' | 'advanced-graph' | 'trie' | 'dp' | 'string-matching' | 'advanced-graph-algorithms' | 'computational-geometry' | 'advanced-dp' | 'backtracking' | 'number-theory' | 'threed-structures' | 'spatial-structures' | 'vr-classroom' | 'segment-trees' | 'union-find' | 'bloom-filter';

interface AlgorithmSelectorProps {
  activeDemo: DemoType;
  onDemoChange: (demo: DemoType) => void;
  lockedAlgorithms?: DemoType[];
}

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ 
  activeDemo, 
  onDemoChange,
  lockedAlgorithms = []
}) => {
  const algorithmCategories = [
    {
      title: "Sorting Algorithms",
      algorithms: [
        { id: 'bubble' as DemoType, name: 'Bubble Sort', free: true },
        { id: 'selection' as DemoType, name: 'Selection Sort', free: false },
        { id: 'quick' as DemoType, name: 'Quick Sort', free: false },
        { id: 'merge' as DemoType, name: 'Merge Sort', free: false }
      ]
    },
    {
      title: "Search Algorithms", 
      algorithms: [
        { id: 'binary-search' as DemoType, name: 'Binary Search', free: true }
      ]
    },
    {
      title: "Data Structures",
      algorithms: [
        { id: 'linkedlist' as DemoType, name: 'Linked List', free: true },
        { id: 'stack' as DemoType, name: 'Stack', free: false },
        { id: 'queue' as DemoType, name: 'Queue', free: false },
        { id: 'hashtable' as DemoType, name: 'Hash Table', free: false },
        { id: 'heap' as DemoType, name: 'Heap', free: false }
      ]
    },
    {
      title: "Tree Algorithms",
      algorithms: [
        { id: 'binarytree' as DemoType, name: 'Binary Tree', free: true },
        { id: 'avl' as DemoType, name: 'AVL Tree', free: false },
        { id: 'redblack' as DemoType, name: 'Red-Black Tree', free: false }
      ]
    },
    {
      title: "Graph Algorithms", 
      algorithms: [
        { id: 'graph' as DemoType, name: 'Graph Traversal', free: true },
        { id: 'advanced-graph' as DemoType, name: 'Advanced Graph', free: false }
      ]
    },
    {
      title: "Dynamic Programming",
      algorithms: [
        { id: 'dp' as DemoType, name: 'Basic DP', free: true },
        { id: 'advanced-dp' as DemoType, name: 'Advanced DP', free: false }
      ]
    },
    {
      title: "Advanced Algorithms",
      algorithms: [
        { id: 'string-matching' as DemoType, name: 'String Matching', free: true },
        { id: 'backtracking' as DemoType, name: 'Backtracking', free: false },
        { id: 'number-theory' as DemoType, name: 'Number Theory', free: false },
        { id: 'computational-geometry' as DemoType, name: 'Computational Geometry', free: false }
      ]
    },
    {
      title: "3D Visualization",
      algorithms: [
        { id: 'threed-structures' as DemoType, name: '3D Data Structures', free: true },
        { id: 'spatial-structures' as DemoType, name: 'Spatial Structures', free: false }
      ]
    }
  ];

  const handleAlgorithmClick = (algorithmId: DemoType, isLocked: boolean) => {
    if (isLocked) {
      return; // Don't change active demo for locked algorithms
    }
    onDemoChange(algorithmId);
  };

  return (
    <div className="space-y-6">
      {algorithmCategories.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              {category.title}
              <span className="text-white/60 text-sm">
                ({category.algorithms.filter(alg => !lockedAlgorithms.includes(alg.id)).length} of {category.algorithms.length} unlocked)
              </span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.algorithms.map((algorithm) => {
                const isLocked = lockedAlgorithms.includes(algorithm.id);
                const isActive = activeDemo === algorithm.id;
                
                if (isLocked) {
                  return (
                    <div key={algorithm.id} className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white/50 bg-white/5 cursor-not-allowed relative"
                        disabled
                      >
                        <Lock className="w-3 h-3 mr-2" />
                        {algorithm.name}
                      </Button>
                      <div className="absolute -top-2 -right-2">
                        <Link to="/register">
                          <div className="w-5 h-5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                            <Lock className="w-2.5 h-2.5 text-white" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                }

                return (
                  <Button
                    key={algorithm.id}
                    onClick={() => handleAlgorithmClick(algorithm.id, isLocked)}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    className={isActive 
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-0' 
                      : 'border-white/30 text-white hover:bg-white/10'
                    }
                  >
                    {algorithm.name}
                    {algorithm.free && (
                      <span className="ml-2 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded">
                        FREE
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
      
      {lockedAlgorithms.length > 0 && (
        <Card className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-cyan-400/30">
          <CardContent className="p-6 text-center">
            <Lock className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h4 className="text-white font-semibold text-lg mb-2">Unlock All Algorithms</h4>
            <p className="text-white/80 mb-4">
              Get access to 30+ premium algorithm visualizations, step-by-step explanations, and interactive learning paths.
            </p>
            <Button 
              asChild
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            >
              <Link to="/register">
                Sign Up Free - Unlock Premium Features
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
