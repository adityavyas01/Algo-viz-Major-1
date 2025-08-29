/**
 * Enhanced Navigation System
 * Modern navigation with algorithm categories and search
 */

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Search, 
  BookOpen, 
  BarChart3, 
  GitCompare, 
  Layers, 
  TreePine, 
  Network, 
  Hash, 
  ArrowUpDown, 
  Target,
  Zap,
  TrendingUp,
  Filter,
  Star,
  Clock,
  Award,
  User,
  Settings,
  Home,
  ChevronDown,
  ChevronRight,
  Lightbulb
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useVisualizationTheme } from '@/contexts/EnhancedTheme'

interface AlgorithmCategory {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  algorithms: AlgorithmItem[]
  color: string
}

interface AlgorithmItem {
  id: string
  name: string
  path: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  timeComplexity: string
  spaceComplexity: string
  isNew?: boolean
  isFavorite?: boolean
  lastAccessed?: Date
  completionStatus?: 'not-started' | 'in-progress' | 'completed'
}

const algorithmCategories: AlgorithmCategory[] = [
  {
    id: 'sorting',
    name: 'Sorting Algorithms',
    icon: <ArrowUpDown className="w-5 h-5" />,
    description: 'Learn different approaches to sorting data efficiently',
    color: '#3B82F6',
    algorithms: [
      {
        id: 'bubble-sort',
        name: 'Bubble Sort',
        path: '/algorithms/bubble-sort',
        description: 'Simple comparison-based sorting algorithm',
        difficulty: 'Beginner',
        category: 'sorting',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        isNew: true,
        completionStatus: 'completed'
      },
      {
        id: 'quick-sort',
        name: 'Quick Sort',
        path: '/algorithms/quick-sort',
        description: 'Efficient divide-and-conquer sorting algorithm',
        difficulty: 'Intermediate',
        category: 'sorting',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
        completionStatus: 'in-progress'
      },
      {
        id: 'merge-sort',
        name: 'Merge Sort',
        path: '/algorithms/merge-sort',
        description: 'Stable divide-and-conquer sorting algorithm',
        difficulty: 'Intermediate',
        category: 'sorting',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        completionStatus: 'not-started'
      },
      {
        id: 'heap-sort',
        name: 'Heap Sort',
        path: '/algorithms/heap-sort',
        description: 'Comparison-based sorting using heap data structure',
        difficulty: 'Advanced',
        category: 'sorting',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(1)',
        completionStatus: 'not-started'
      }
    ]
  },
  {
    id: 'searching',
    name: 'Search Algorithms',
    icon: <Target className="w-5 h-5" />,
    description: 'Efficient methods to find elements in data structures',
    color: '#10B981',
    algorithms: [
      {
        id: 'binary-search',
        name: 'Binary Search',
        path: '/algorithms/binary-search',
        description: 'Efficient search in sorted arrays',
        difficulty: 'Beginner',
        category: 'searching',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        completionStatus: 'completed'
      },
      {
        id: 'linear-search',
        name: 'Linear Search',
        path: '/algorithms/linear-search',
        description: 'Sequential search through elements',
        difficulty: 'Beginner',
        category: 'searching',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        completionStatus: 'completed'
      }
    ]
  },
  {
    id: 'graph',
    name: 'Graph Algorithms',
    icon: <Network className="w-5 h-5" />,
    description: 'Algorithms for traversing and analyzing graphs',
    color: '#8B5CF6',
    algorithms: [
      {
        id: 'bfs',
        name: 'Breadth-First Search',
        path: '/algorithms/bfs',
        description: 'Level-by-level graph traversal',
        difficulty: 'Intermediate',
        category: 'graph',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        completionStatus: 'in-progress'
      },
      {
        id: 'dfs',
        name: 'Depth-First Search',
        path: '/algorithms/dfs',
        description: 'Deep graph traversal using recursion or stack',
        difficulty: 'Intermediate',
        category: 'graph',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        completionStatus: 'not-started'
      },
      {
        id: 'dijkstra',
        name: 'Dijkstra\'s Algorithm',
        path: '/algorithms/dijkstra',
        description: 'Shortest path algorithm for weighted graphs',
        difficulty: 'Advanced',
        category: 'graph',
        timeComplexity: 'O((V + E) log V)',
        spaceComplexity: 'O(V)',
        completionStatus: 'not-started'
      }
    ]
  },
  {
    id: 'tree',
    name: 'Tree Algorithms',
    icon: <TreePine className="w-5 h-5" />,
    description: 'Tree data structure operations and algorithms',
    color: '#F59E0B',
    algorithms: [
      {
        id: 'binary-tree-traversal',
        name: 'Binary Tree Traversal',
        path: '/algorithms/binary-tree-traversal',
        description: 'In-order, pre-order, and post-order traversals',
        difficulty: 'Intermediate',
        category: 'tree',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h)',
        completionStatus: 'in-progress'
      },
      {
        id: 'avl-tree',
        name: 'AVL Tree',
        path: '/algorithms/avl-tree',
        description: 'Self-balancing binary search tree',
        difficulty: 'Advanced',
        category: 'tree',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(n)',
        completionStatus: 'not-started'
      }
    ]
  },
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    icon: <Layers className="w-5 h-5" />,
    description: 'Optimization technique using overlapping subproblems',
    color: '#EF4444',
    algorithms: [
      {
        id: 'fibonacci',
        name: 'Fibonacci Sequence',
        path: '/algorithms/fibonacci',
        description: 'Classic DP example with memoization',
        difficulty: 'Beginner',
        category: 'dynamic-programming',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        completionStatus: 'completed'
      },
      {
        id: 'knapsack',
        name: '0/1 Knapsack',
        path: '/algorithms/knapsack',
        description: 'Optimization problem using dynamic programming',
        difficulty: 'Advanced',
        category: 'dynamic-programming',
        timeComplexity: 'O(nW)',
        spaceComplexity: 'O(nW)',
        completionStatus: 'not-started'
      }
    ]
  }
]

const specialSections = [
  {
    id: 'comparison',
    name: 'Algorithm Comparison',
    path: '/comparison',
    icon: <GitCompare className="w-5 h-5" />,
    description: 'Compare algorithms side by side',
    color: '#06B6D4',
    isNew: true
  },
  {
    id: 'learning-path',
    name: 'Learning Paths',
    path: '/learning-paths',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Structured learning journeys',
    color: '#8B5CF6'
  },
  {
    id: 'challenges',
    name: 'Coding Challenges',
    path: '/challenges',
    icon: <Award className="w-5 h-5" />,
    description: 'Practice with real problems',
    color: '#F59E0B'
  }
]

interface EnhancedNavigationProps {
  onNavigate?: (path: string) => void
}

export function EnhancedNavigation({ onNavigate }: EnhancedNavigationProps) {
  const { currentTheme } = useVisualizationTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['sorting']))
  const [filteredAlgorithms, setFilteredAlgorithms] = useState<AlgorithmItem[]>([])
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // Filter algorithms based on search and filters
  useEffect(() => {
    let allAlgorithms: AlgorithmItem[] = []
    algorithmCategories.forEach(category => {
      allAlgorithms = [...allAlgorithms, ...category.algorithms]
    })

    let filtered = allAlgorithms.filter(alg => {
      const matchesSearch = searchQuery === '' || 
        alg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alg.category.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesDifficulty = difficultyFilter === 'all' || alg.difficulty === difficultyFilter
      const matchesCategory = selectedCategory === null || alg.category === selectedCategory

      return matchesSearch && matchesDifficulty && matchesCategory
    })

    setFilteredAlgorithms(filtered)
  }, [searchQuery, difficultyFilter, selectedCategory])

  const handleAlgorithmClick = (algorithm: AlgorithmItem) => {
    if (onNavigate) {
      onNavigate(algorithm.path)
    } else {
      navigate(algorithm.path)
    }
  }

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const toggleFavorite = (algorithmId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(algorithmId)) {
      newFavorites.delete(algorithmId)
    } else {
      newFavorites.add(algorithmId)
    }
    setFavorites(newFavorites)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return currentTheme.colors.success
      case 'Intermediate': return currentTheme.colors.warning
      case 'Advanced': return currentTheme.colors.error
      default: return currentTheme.colors.info
    }
  }

  const getCompletionColor = (status: string) => {
    switch (status) {
      case 'completed': return currentTheme.colors.success
      case 'in-progress': return currentTheme.colors.warning
      case 'not-started': return currentTheme.colors.textSecondary
      default: return currentTheme.colors.textSecondary
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: currentTheme.colors.text }}>
          Algorithm Visualization Hub
        </h1>
        <p className="text-lg opacity-80" style={{ color: currentTheme.colors.textSecondary }}>
          Interactive learning platform for computer science algorithms
        </p>
      </div>

      {/* Search and Filters */}
      <Card 
        className="backdrop-blur-sm"
        style={{ 
          backgroundColor: currentTheme.colors.surface + '95',
          borderColor: currentTheme.colors.border 
        }}
      >
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: currentTheme.colors.textSecondary }} />
              <Input
                placeholder="Search algorithms, categories, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 transition-all duration-200"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" style={{ color: currentTheme.colors.textSecondary }} />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-3 py-2 rounded border transition-all duration-200"
                style={{
                  backgroundColor: currentTheme.colors.background,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'Total Algorithms', value: algorithmCategories.reduce((acc, cat) => acc + cat.algorithms.length, 0), icon: <BarChart3 className="w-4 h-4" /> },
              { label: 'Categories', value: algorithmCategories.length, icon: <Layers className="w-4 h-4" /> },
              { label: 'Completed', value: algorithmCategories.reduce((acc, cat) => acc + cat.algorithms.filter(alg => alg.completionStatus === 'completed').length, 0), icon: <Award className="w-4 h-4" /> },
              { label: 'In Progress', value: algorithmCategories.reduce((acc, cat) => acc + cat.algorithms.filter(alg => alg.completionStatus === 'in-progress').length, 0), icon: <Clock className="w-4 h-4" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 rounded-lg" style={{ backgroundColor: currentTheme.colors.background }}>
                <div className="flex items-center justify-center gap-2 mb-1" style={{ color: currentTheme.colors.primary }}>
                  {stat.icon}
                  <span className="text-xl font-bold">{stat.value}</span>
                </div>
                <div className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Sections */}
      <div className="grid md:grid-cols-3 gap-4">
        {specialSections.map((section) => (
          <Card 
            key={section.id}
            className="cursor-pointer transition-all duration-200 hover:scale-105 backdrop-blur-sm"
            style={{ 
              backgroundColor: currentTheme.colors.surface + '95',
              borderColor: currentTheme.colors.border 
            }}
            onClick={() => handleAlgorithmClick({ ...section, difficulty: 'Intermediate', category: 'special', timeComplexity: '', spaceComplexity: '' } as AlgorithmItem)}
          >
            <CardContent className="p-6 text-center">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: section.color + '20' }}
              >
                <div style={{ color: section.color }}>
                  {section.icon}
                </div>
              </div>
              <h3 className="font-semibold mb-2 flex items-center justify-center gap-2" style={{ color: currentTheme.colors.text }}>
                {section.name}
                {section.isNew && (
                  <Badge className="text-xs" style={{ backgroundColor: currentTheme.colors.info + '20', color: currentTheme.colors.info, border: 'none' }}>
                    NEW
                  </Badge>
                )}
              </h3>
              <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                {section.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Algorithm Categories */}
      <div className="space-y-4">
        {algorithmCategories.map((category) => (
          <Card 
            key={category.id}
            className="backdrop-blur-sm transition-all duration-200"
            style={{ 
              backgroundColor: currentTheme.colors.surface + '95',
              borderColor: currentTheme.colors.border 
            }}
          >
            <CardContent className="p-0">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    <div style={{ color: category.color }}>
                      {category.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: currentTheme.colors.text }}>
                      {category.name}
                    </h3>
                    <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className="text-xs"
                    style={{ 
                      backgroundColor: category.color + '20', 
                      color: category.color,
                      border: 'none'
                    }}
                  >
                    {category.algorithms.length} algorithms
                  </Badge>
                  {expandedCategories.has(category.id) ? (
                    <ChevronDown className="w-5 h-5" style={{ color: currentTheme.colors.textSecondary }} />
                  ) : (
                    <ChevronRight className="w-5 h-5" style={{ color: currentTheme.colors.textSecondary }} />
                  )}
                </div>
              </button>

              {/* Algorithm List */}
              {expandedCategories.has(category.id) && (
                <div className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-3">
                    {category.algorithms.map((algorithm) => (
                      <div
                        key={algorithm.id}
                        onClick={() => handleAlgorithmClick(algorithm)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-102 ${
                          location.pathname === algorithm.path ? 'ring-2' : ''
                        }`}
                        style={{ 
                          backgroundColor: currentTheme.colors.background,
                          borderColor: location.pathname === algorithm.path ? currentTheme.colors.primary : currentTheme.colors.border,
                          ...(location.pathname === algorithm.path && { ringColor: currentTheme.colors.primary + '50' })
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium" style={{ color: currentTheme.colors.text }}>
                              {algorithm.name}
                            </h4>
                            {algorithm.isNew && (
                              <Badge className="text-xs" style={{ backgroundColor: currentTheme.colors.info + '20', color: currentTheme.colors.info, border: 'none' }}>
                                NEW
                              </Badge>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(algorithm.id)
                            }}
                            className="transition-colors"
                          >
                            <Star 
                              className={`w-4 h-4 ${favorites.has(algorithm.id) ? 'fill-current' : ''}`}
                              style={{ 
                                color: favorites.has(algorithm.id) ? currentTheme.colors.warning : currentTheme.colors.textSecondary 
                              }}
                            />
                          </button>
                        </div>

                        <p className="text-sm mb-3" style={{ color: currentTheme.colors.textSecondary }}>
                          {algorithm.description}
                        </p>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Badge 
                              className="text-xs"
                              style={{
                                backgroundColor: getDifficultyColor(algorithm.difficulty) + '20',
                                color: getDifficultyColor(algorithm.difficulty),
                                border: 'none'
                              }}
                            >
                              {algorithm.difficulty}
                            </Badge>
                            <span style={{ color: currentTheme.colors.textSecondary }}>
                              {algorithm.timeComplexity}
                            </span>
                          </div>
                          
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getCompletionColor(algorithm.completionStatus || 'not-started') }}
                            title={algorithm.completionStatus || 'not-started'}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search Results */}
      {searchQuery && (
        <Card 
          className="backdrop-blur-sm"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}
        >
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: currentTheme.colors.text }}>
              <Search className="w-4 h-4" />
              Search Results ({filteredAlgorithms.length} found)
            </h3>
            {filteredAlgorithms.length === 0 ? (
              <div className="text-center py-8">
                <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" style={{ color: currentTheme.colors.textSecondary }} />
                <p style={{ color: currentTheme.colors.textSecondary }}>
                  No algorithms found matching your criteria. Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredAlgorithms.map((algorithm) => (
                  <div
                    key={algorithm.id}
                    onClick={() => handleAlgorithmClick(algorithm)}
                    className="p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-102"
                    style={{ 
                      backgroundColor: currentTheme.colors.background,
                      borderColor: currentTheme.colors.border
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm" style={{ color: currentTheme.colors.text }}>
                        {algorithm.name}
                      </h4>
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: getDifficultyColor(algorithm.difficulty) + '20',
                          color: getDifficultyColor(algorithm.difficulty),
                          border: 'none'
                        }}
                      >
                        {algorithm.difficulty}
                      </Badge>
                    </div>
                    <p className="text-xs mb-2" style={{ color: currentTheme.colors.textSecondary }}>
                      {algorithm.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span style={{ color: currentTheme.colors.textSecondary }}>
                        {algorithm.timeComplexity}
                      </span>
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getCompletionColor(algorithm.completionStatus || 'not-started') }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
