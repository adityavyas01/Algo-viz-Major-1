
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { EnhancedBubbleSortVisualization } from '@/components/EnhancedBubbleSortVisualization';
import { BinarySearchVisualization } from '@/components/BinarySearchVisualization';
import { QuickSortVisualization } from '@/components/QuickSortVisualization';
import { MergeSortVisualization } from '@/components/MergeSortVisualization';
import { useVisualizationTheme } from '@/contexts/EnhancedTheme';
import { 
  GitCompare, 
  BarChart3, 
  Clock, 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  TrendingUp,
  Trophy,
  Timer,
  Activity,
  Target,
  BookOpen,
  Settings,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface AlgorithmOption {
  id: string;
  name: string;
  category: string;
  complexity: { 
    time: { best: string; average: string; worst: string };
    space: string;
  };
  description: string;
  advantages: string[];
  disadvantages: string[];
  bestUseCase: string;
  component: React.ComponentType<any>;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  stability: boolean;
  inPlace: boolean;
}

interface ComparisonMetrics {
  algorithmId: string;
  startTime: number;
  endTime?: number;
  comparisons: number;
  swaps: number;
  memoryUsage: number;
  steps: number;
}

const algorithms: AlgorithmOption[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    complexity: { 
      time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)' 
    },
    description: 'Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    advantages: ['Simple to understand and implement', 'No additional memory space needed', 'Stable sorting algorithm'],
    disadvantages: ['Poor performance on large datasets', 'More swaps compared to other algorithms'],
    bestUseCase: 'Educational purposes and very small datasets',
    component: EnhancedBubbleSortVisualization,
    difficulty: 'Beginner',
    stability: true,
    inPlace: true
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    complexity: { 
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      space: 'O(log n)' 
    },
    description: 'Efficient divide-and-conquer algorithm that works by selecting a pivot element and partitioning the array around it.',
    advantages: ['Generally faster than other O(n log n) algorithms', 'In-place sorting', 'Cache efficient'],
    disadvantages: ['Worst-case performance is O(n²)', 'Not stable', 'Performance depends on pivot selection'],
    bestUseCase: 'General purpose sorting for large datasets',
    component: QuickSortVisualization,
    difficulty: 'Intermediate',
    stability: false,
    inPlace: true
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    complexity: { 
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      space: 'O(n)' 
    },
    description: 'Stable divide-and-conquer algorithm that divides the array into halves, sorts them separately, and then merges them.',
    advantages: ['Guaranteed O(n log n) performance', 'Stable sorting algorithm', 'Predictable performance'],
    disadvantages: ['Requires additional memory space', 'Slower than quicksort in practice'],
    bestUseCase: 'When stability is required and consistent performance is needed',
    component: MergeSortVisualization,
    difficulty: 'Intermediate',
    stability: true,
    inPlace: false
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Search',
    complexity: { 
      time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      space: 'O(1)' 
    },
    description: 'Efficient search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.',
    advantages: ['Very efficient for large datasets', 'Simple to implement', 'No additional memory needed'],
    disadvantages: ['Requires sorted data', 'Not suitable for linked lists'],
    bestUseCase: 'Searching in large sorted datasets',
    component: BinarySearchVisualization,
    difficulty: 'Beginner',
    stability: true,
    inPlace: true
  }
];

export const AlgorithmComparison: React.FC = () => {
  const { currentTheme } = useVisualizationTheme();
  const [leftAlgorithm, setLeftAlgorithm] = useState<string>('bubble-sort');
  const [rightAlgorithm, setRightAlgorithm] = useState<string>('quick-sort');
  const [comparisonMode, setComparisonMode] = useState<'side-by-side' | 'race' | 'detailed'>('side-by-side');
  const [showMetrics, setShowMetrics] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [leftMetrics, setLeftMetrics] = useState<ComparisonMetrics | null>(null);
  const [rightMetrics, setRightMetrics] = useState<ComparisonMetrics | null>(null);
  const [raceStarted, setRaceStarted] = useState(false);

  const leftAlg = algorithms.find(a => a.id === leftAlgorithm);
  const rightAlg = algorithms.find(a => a.id === rightAlgorithm);

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('n²') || complexity.includes('2^n')) return currentTheme.colors.error;
    if (complexity.includes('n log n')) return currentTheme.colors.warning;
    if (complexity.includes('log n')) return currentTheme.colors.success;
    if (complexity.includes('n')) return currentTheme.colors.info;
    return currentTheme.colors.success;
  };

  const compareComplexity = (left: string, right: string) => {
    const complexityOrder = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'];
    const leftIndex = complexityOrder.indexOf(left);
    const rightIndex = complexityOrder.indexOf(right);
    
    if (leftIndex < rightIndex) return 'better';
    if (leftIndex > rightIndex) return 'worse';
    return 'same';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return currentTheme.colors.success;
      case 'Intermediate': return currentTheme.colors.warning;
      case 'Advanced': return currentTheme.colors.error;
      default: return currentTheme.colors.info;
    }
  };

  const startRace = () => {
    setRaceStarted(true);
    setLeftMetrics(null);
    setRightMetrics(null);
    // Race mode implementation would trigger both algorithms simultaneously
  };

  const resetComparison = () => {
    setRaceStarted(false);
    setLeftMetrics(null);
    setRightMetrics(null);
  };

  const LeftComponent = leftAlg?.component;
  const RightComponent = rightAlg?.component;

  return (
    <div 
      className={`space-y-6 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 p-6 overflow-auto' : ''}`}
      style={{ 
        backgroundColor: isFullscreen ? currentTheme.colors.background : 'transparent',
        color: currentTheme.colors.text 
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: currentTheme.colors.text }}>
            Algorithm Comparison Lab
          </h2>
          <p className="opacity-70" style={{ color: currentTheme.colors.textSecondary }}>
            Compare algorithms side by side to understand their differences and performance characteristics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="transition-all duration-200"
            style={{
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text,
              backgroundColor: 'transparent'
            }}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Comparison Mode Selector */}
      <Card 
        className="backdrop-blur-sm transition-all duration-200"
        style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}
      >
        <CardHeader>
          <CardTitle 
            className="flex items-center gap-2"
            style={{ color: currentTheme.colors.text }}
          >
            <Settings className="w-5 h-5" />
            Comparison Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: currentTheme.colors.text }}>
                Left Algorithm
              </label>
              <Select value={leftAlgorithm} onValueChange={setLeftAlgorithm}>
                <SelectTrigger 
                  className="transition-all duration-200"
                  style={{
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent 
                  style={{
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  {algorithms.map((alg) => (
                    <SelectItem 
                      key={alg.id} 
                      value={alg.id}
                      style={{ color: currentTheme.colors.text }}
                    >
                      <div className="flex items-center gap-2">
                        <span>{alg.name}</span>
                        <Badge 
                          className="text-xs"
                          style={{
                            backgroundColor: getDifficultyColor(alg.difficulty) + '20',
                            color: getDifficultyColor(alg.difficulty),
                            border: 'none'
                          }}
                        >
                          {alg.difficulty}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: currentTheme.colors.text }}>
                Right Algorithm
              </label>
              <Select value={rightAlgorithm} onValueChange={setRightAlgorithm}>
                <SelectTrigger 
                  className="transition-all duration-200"
                  style={{
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent 
                  style={{
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  {algorithms.map((alg) => (
                    <SelectItem 
                      key={alg.id} 
                      value={alg.id}
                      style={{ color: currentTheme.colors.text }}
                    >
                      <div className="flex items-center gap-2">
                        <span>{alg.name}</span>
                        <Badge 
                          className="text-xs"
                          style={{
                            backgroundColor: getDifficultyColor(alg.difficulty) + '20',
                            color: getDifficultyColor(alg.difficulty),
                            border: 'none'
                          }}
                        >
                          {alg.difficulty}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block" style={{ color: currentTheme.colors.text }}>
                Comparison Mode
              </label>
              <Select value={comparisonMode} onValueChange={(value: any) => setComparisonMode(value)}>
                <SelectTrigger 
                  className="transition-all duration-200"
                  style={{
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent 
                  style={{
                    backgroundColor: currentTheme.colors.surface,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <SelectItem value="side-by-side" style={{ color: currentTheme.colors.text }}>
                    Side-by-Side
                  </SelectItem>
                  <SelectItem value="race" style={{ color: currentTheme.colors.text }}>
                    Performance Race
                  </SelectItem>
                  <SelectItem value="detailed" style={{ color: currentTheme.colors.text }}>
                    Detailed Analysis
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={comparisonMode === 'race' ? startRace : resetComparison}
              className="transition-all duration-200"
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: 'white'
              }}
            >
              {comparisonMode === 'race' ? (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Race
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowMetrics(!showMetrics)}
              className="transition-all duration-200"
              style={{
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text,
                backgroundColor: 'transparent'
              }}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              {showMetrics ? 'Hide' : 'Show'} Metrics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Information Cards */}
      {leftAlg && rightAlg && comparisonMode === 'detailed' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {[leftAlg, rightAlg].map((alg, index) => (
            <Card 
              key={alg.id}
              className="backdrop-blur-sm transition-all duration-200"
              style={{ 
                backgroundColor: currentTheme.colors.surface + '95',
                borderColor: currentTheme.colors.border 
              }}
            >
              <CardHeader>
                <CardTitle 
                  className="flex items-center justify-between"
                  style={{ color: currentTheme.colors.text }}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {alg.name}
                  </div>
                  <Badge 
                    style={{
                      backgroundColor: getDifficultyColor(alg.difficulty) + '20',
                      color: getDifficultyColor(alg.difficulty),
                      border: 'none'
                    }}
                  >
                    {alg.difficulty}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                  {alg.description}
                </p>

                {/* Time Complexity Breakdown */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: currentTheme.colors.text }}>
                    <Clock className="w-4 h-4" />
                    Time Complexity
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {Object.entries(alg.complexity.time).map(([case_, complexity]) => (
                      <div key={case_} className="text-center p-2 rounded">
                        <div className="font-medium capitalize" style={{ color: currentTheme.colors.text }}>
                          {case_}
                        </div>
                        <Badge 
                          className="text-xs mt-1"
                          style={{
                            backgroundColor: getComplexityColor(complexity) + '20',
                            color: getComplexityColor(complexity),
                            border: 'none'
                          }}
                        >
                          {complexity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Algorithm Properties */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium" style={{ color: currentTheme.colors.text }}>Stable:</span>
                    <Badge 
                      className="ml-2 text-xs"
                      style={{
                        backgroundColor: alg.stability ? currentTheme.colors.success + '20' : currentTheme.colors.error + '20',
                        color: alg.stability ? currentTheme.colors.success : currentTheme.colors.error,
                        border: 'none'
                      }}
                    >
                      {alg.stability ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium" style={{ color: currentTheme.colors.text }}>In-place:</span>
                    <Badge 
                      className="ml-2 text-xs"
                      style={{
                        backgroundColor: alg.inPlace ? currentTheme.colors.success + '20' : currentTheme.colors.error + '20',
                        color: alg.inPlace ? currentTheme.colors.success : currentTheme.colors.error,
                        border: 'none'
                      }}
                    >
                      {alg.inPlace ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>

                {/* Advantages & Disadvantages */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm mb-2" style={{ color: currentTheme.colors.success }}>
                      Advantages
                    </h5>
                    <ul className="text-xs space-y-1">
                      {alg.advantages.map((advantage, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div 
                            className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: currentTheme.colors.success }}
                          />
                          <span style={{ color: currentTheme.colors.textSecondary }}>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm mb-2" style={{ color: currentTheme.colors.error }}>
                      Disadvantages
                    </h5>
                    <ul className="text-xs space-y-1">
                      {alg.disadvantages.map((disadvantage, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div 
                            className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: currentTheme.colors.error }}
                          />
                          <span style={{ color: currentTheme.colors.textSecondary }}>{disadvantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Performance Metrics */}
      {showMetrics && leftMetrics && rightMetrics && (
        <Card 
          className="backdrop-blur-sm transition-all duration-200"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}
        >
          <CardHeader>
            <CardTitle 
              className="flex items-center gap-2"
              style={{ color: currentTheme.colors.text }}
            >
              <Trophy className="w-5 h-5" />
              Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {['Time', 'Comparisons', 'Swaps', 'Steps'].map((metric) => (
                <div key={metric} className="text-center p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.background }}>
                  <div className="font-semibold mb-2" style={{ color: currentTheme.colors.text }}>{metric}</div>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span style={{ color: currentTheme.colors.textSecondary }}>{leftAlg?.name}:</span>
                      <span className="ml-2 font-mono" style={{ color: currentTheme.colors.primary }}>
                        {metric === 'Time' ? `${((leftMetrics.endTime || 0) - leftMetrics.startTime).toFixed(2)}ms` :
                         metric === 'Comparisons' ? leftMetrics.comparisons :
                         metric === 'Swaps' ? leftMetrics.swaps :
                         leftMetrics.steps}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span style={{ color: currentTheme.colors.textSecondary }}>{rightAlg?.name}:</span>
                      <span className="ml-2 font-mono" style={{ color: currentTheme.colors.secondary }}>
                        {metric === 'Time' ? `${((rightMetrics.endTime || 0) - rightMetrics.startTime).toFixed(2)}ms` :
                         metric === 'Comparisons' ? rightMetrics.comparisons :
                         metric === 'Swaps' ? rightMetrics.swaps :
                         rightMetrics.steps}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Side-by-Side Visualizations */}
      <div className="grid lg:grid-cols-2 gap-6">
        {leftAlg && LeftComponent && (
          <Card 
            className="backdrop-blur-sm transition-all duration-200"
            style={{ 
              backgroundColor: currentTheme.colors.surface + '95',
              borderColor: currentTheme.colors.border 
            }}
          >
            <CardHeader>
              <CardTitle 
                className="flex items-center justify-between"
                style={{ color: currentTheme.colors.text }}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  {leftAlg.name}
                </div>
                <Badge 
                  style={{
                    backgroundColor: currentTheme.colors.primary + '20',
                    color: currentTheme.colors.primary,
                    border: 'none'
                  }}
                >
                  Left
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeftComponent />
            </CardContent>
          </Card>
        )}
        
        {rightAlg && RightComponent && (
          <Card 
            className="backdrop-blur-sm transition-all duration-200"
            style={{ 
              backgroundColor: currentTheme.colors.surface + '95',
              borderColor: currentTheme.colors.border 
            }}
          >
            <CardHeader>
              <CardTitle 
                className="flex items-center justify-between"
                style={{ color: currentTheme.colors.text }}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  {rightAlg.name}
                </div>
                <Badge 
                  style={{
                    backgroundColor: currentTheme.colors.secondary + '20',
                    color: currentTheme.colors.secondary,
                    border: 'none'
                  }}
                >
                  Right
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RightComponent />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
