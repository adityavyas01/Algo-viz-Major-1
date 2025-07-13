
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SortingVisualizer } from '@/components/SortingVisualizer';
import { BinarySearchVisualization } from '@/components/BinarySearchVisualization';
import { QuickSortVisualization } from '@/components/QuickSortVisualization';
import { MergeSortVisualization } from '@/components/MergeSortVisualization';
import { GitCompare, BarChart3, Clock, Zap } from 'lucide-react';

interface AlgorithmOption {
  id: string;
  name: string;
  category: string;
  complexity: { time: string; space: string };
  component: React.ReactNode;
}

const algorithms: AlgorithmOption[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    complexity: { time: 'O(n²)', space: 'O(1)' },
    component: <SortingVisualizer />
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    complexity: { time: 'O(n log n)', space: 'O(log n)' },
    component: <QuickSortVisualization />
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    complexity: { time: 'O(n log n)', space: 'O(n)' },
    component: <MergeSortVisualization />
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Search',
    complexity: { time: 'O(log n)', space: 'O(1)' },
    component: <BinarySearchVisualization />
  }
];

export const AlgorithmComparison: React.FC = () => {
  const [leftAlgorithm, setLeftAlgorithm] = useState<string>('bubble-sort');
  const [rightAlgorithm, setRightAlgorithm] = useState<string>('quick-sort');

  const leftAlg = algorithms.find(a => a.id === leftAlgorithm);
  const rightAlg = algorithms.find(a => a.id === rightAlgorithm);

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('n²') || complexity.includes('2^n')) return 'bg-red-500';
    if (complexity.includes('n log n')) return 'bg-yellow-500';
    if (complexity.includes('log n')) return 'bg-green-500';
    if (complexity.includes('n')) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const compareComplexity = (left: string, right: string) => {
    const complexityOrder = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'];
    const leftIndex = complexityOrder.indexOf(left);
    const rightIndex = complexityOrder.indexOf(right);
    
    if (leftIndex < rightIndex) return 'better';
    if (leftIndex > rightIndex) return 'worse';
    return 'same';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Algorithm Comparison</h2>
        <p className="text-white/70">Compare algorithms side by side to understand their differences</p>
      </div>

      {/* Algorithm Selection */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <GitCompare className="w-5 h-5" />
            Select Algorithms to Compare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Left Algorithm</label>
              <Select value={leftAlgorithm} onValueChange={setLeftAlgorithm}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  {algorithms.map((alg) => (
                    <SelectItem key={alg.id} value={alg.id} className="text-white hover:bg-white/10">
                      {alg.name} ({alg.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Right Algorithm</label>
              <Select value={rightAlgorithm} onValueChange={setRightAlgorithm}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  {algorithms.map((alg) => (
                    <SelectItem key={alg.id} value={alg.id} className="text-white hover:bg-white/10">
                      {alg.name} ({alg.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complexity Comparison */}
      {leftAlg && rightAlg && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Complexity Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Time Complexity */}
              <div>
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time Complexity
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{leftAlg.name}</span>
                    <Badge className={`${getComplexityColor(leftAlg.complexity.time)} text-white`}>
                      {leftAlg.complexity.time}
                      {compareComplexity(leftAlg.complexity.time, rightAlg.complexity.time) === 'better' && (
                        <Zap className="w-3 h-3 ml-1" />
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{rightAlg.name}</span>
                    <Badge className={`${getComplexityColor(rightAlg.complexity.time)} text-white`}>
                      {rightAlg.complexity.time}
                      {compareComplexity(rightAlg.complexity.time, leftAlg.complexity.time) === 'better' && (
                        <Zap className="w-3 h-3 ml-1" />
                      )}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Space Complexity */}
              <div>
                <h4 className="text-white font-semibold mb-3">Space Complexity</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{leftAlg.name}</span>
                    <Badge className={`${getComplexityColor(leftAlg.complexity.space)} text-white`}>
                      {leftAlg.complexity.space}
                      {compareComplexity(leftAlg.complexity.space, rightAlg.complexity.space) === 'better' && (
                        <Zap className="w-3 h-3 ml-1" />
                      )}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">{rightAlg.name}</span>
                    <Badge className={`${getComplexityColor(rightAlg.complexity.space)} text-white`}>
                      {rightAlg.complexity.space}
                      {compareComplexity(rightAlg.complexity.space, leftAlg.complexity.space) === 'better' && (
                        <Zap className="w-3 h-3 ml-1" />
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Side-by-Side Visualizations */}
      <div className="grid lg:grid-cols-2 gap-6">
        {leftAlg && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">{leftAlg.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {leftAlg.component}
            </CardContent>
          </Card>
        )}
        
        {rightAlg && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">{rightAlg.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {rightAlg.component}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
