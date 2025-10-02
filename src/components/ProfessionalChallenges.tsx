import React, { useState, useEffect } from 'react';
import { 
  Search,
  Filter,
  SortAsc,
  CheckCircle,
  Clock,
  Users,
  Star,
  TrendingUp,
  Code,
  BookOpen,
  Trophy,
  Target,
  Play,
  ArrowRight,
  Zap,
  Calendar,
  Award,
  BarChart3
} from 'lucide-react';
import { challengeProblems, ProblemStatement } from '../data/challengeProblems';

interface ProfessionalChallengesProps {
  onChallengeSelect: (challengeId: string) => void;
}

interface FilterState {
  difficulty: string[];
  category: string[];
  status: string[];
  search: string;
  sortBy: 'title' | 'difficulty' | 'acceptance' | 'frequency';
  sortOrder: 'asc' | 'desc';
}

export const ProfessionalChallenges: React.FC<ProfessionalChallengesProps> = ({ 
  onChallengeSelect 
}) => {
  const [filters, setFilters] = useState<FilterState>({
    difficulty: [],
    category: [],
    status: [],
    search: '',
    sortBy: 'title',
    sortOrder: 'asc'
  });
  
  const [filteredProblems, setFilteredProblems] = useState<ProblemStatement[]>(challengeProblems);
  const [showFilters, setShowFilters] = useState(false);
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  const [attemptedProblems, setAttemptedProblems] = useState<Set<string>>(new Set());
  const [activeView, setActiveView] = useState<'all' | 'algorithms' | 'database' | 'shell'>('all');

  // Mock user progress data
  const userStats = {
    totalSolved: 127,
    totalProblems: 2457,
    easy: { solved: 76, total: 612 },
    medium: { solved: 43, total: 1356 },
    hard: { solved: 8, total: 489 },
    ranking: 142857,
    streak: 7
  };

  const categories = ['Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting', 'Greedy', 'Tree', 'Graph', 'Binary Search'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const statusOptions = ['Todo', 'Solved', 'Attempted'];

  useEffect(() => {
    let filtered = [...challengeProblems];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        problem.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        problem.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    // Apply difficulty filter
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(problem =>
        filters.difficulty.includes(problem.difficulty)
      );
    }

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(problem =>
        filters.category.some(cat => 
          problem.tags.some(tag => tag.toLowerCase().includes(cat.toLowerCase())) ||
          (problem.category && problem.category.toLowerCase().includes(cat.toLowerCase()))
        )
      );
    }

    // Apply status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(problem => {
        if (filters.status.includes('Solved') && solvedProblems.has(problem.id)) return true;
        if (filters.status.includes('Attempted') && attemptedProblems.has(problem.id) && !solvedProblems.has(problem.id)) return true;
        if (filters.status.includes('Todo') && !attemptedProblems.has(problem.id) && !solvedProblems.has(problem.id)) return true;
        return false;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          comparison = difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
          break;
        case 'acceptance':
          // Mock acceptance rate for demo
          comparison = (Math.random() * 100) - (Math.random() * 100);
          break;
        case 'frequency':
          // Mock frequency for demo
          comparison = (Math.random() * 100) - (Math.random() * 100);
          break;
      }
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    setFilteredProblems(filtered);
  }, [filters, solvedProblems, attemptedProblems]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (problemId: string) => {
    if (solvedProblems.has(problemId)) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (attemptedProblems.has(problemId)) {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    }
    return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
  };

  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: Array.isArray(prev[type]) 
        ? (prev[type] as string[]).includes(value)
          ? (prev[type] as string[]).filter(item => item !== value)
          : [...(prev[type] as string[]), value]
        : prev[type]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Problems</h1>
              <p className="text-gray-600 mt-1">Solve coding challenges and improve your skills</p>
            </div>
            
            {/* User Progress Summary */}
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{userStats.totalSolved}</div>
                    <div className="text-xs text-gray-600">Solved</div>
                  </div>
                  <div className="w-px h-8 bg-gray-300" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{userStats.totalProblems}</div>
                    <div className="text-xs text-gray-600">Total</div>
                  </div>
                  <div className="w-px h-8 bg-gray-300" />
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-900">{userStats.streak} day streak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: 'Easy', ...userStats.easy, color: 'bg-green-500' },
              { label: 'Medium', ...userStats.medium, color: 'bg-yellow-500' },
              { label: 'Hard', ...userStats.hard, color: 'bg-red-500' }
            ].map((level) => (
              <div key={level.label} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{level.label}</span>
                  <span className="text-sm text-gray-600">{level.solved}/{level.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${level.color} transition-all duration-300`}
                    style={{ width: `${(level.solved / level.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Status Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Status</h4>
                <div className="space-y-2">
                  {statusOptions.map(status => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => toggleFilter('status', status)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Difficulty</h4>
                <div className="space-y-2">
                  {difficulties.map(difficulty => (
                    <label key={difficulty} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.difficulty.includes(difficulty)}
                        onChange={() => toggleFilter('difficulty', difficulty)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category)}
                        onChange={() => toggleFilter('category', category)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setFilters({
                  difficulty: [],
                  category: [],
                  status: [],
                  search: '',
                  sortBy: 'title',
                  sortOrder: 'asc'
                })}
                className="w-full px-4 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search problems by title, description, or tags..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    setFilters(prev => ({ 
                      ...prev, 
                      sortBy: sortBy as FilterState['sortBy'], 
                      sortOrder: sortOrder as FilterState['sortOrder']
                    }));
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                  <option value="difficulty-asc">Difficulty (Easy first)</option>
                  <option value="difficulty-desc">Difficulty (Hard first)</option>
                  <option value="acceptance-desc">Acceptance Rate (High)</option>
                  <option value="frequency-desc">Frequency (High)</option>
                </select>
              </div>
            </div>

            {/* Problems List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {filteredProblems.length} Problems
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>Status</span>
                    <span>•</span>
                    <span>Title</span>
                    <span>•</span>
                    <span>Acceptance</span>
                    <span>•</span>
                    <span>Difficulty</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredProblems.map((problem, index) => (
                  <div
                    key={problem.id}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                    onClick={() => onChallengeSelect(problem.id)}
                  >
                    <div className="flex items-center space-x-6">
                      {/* Status */}
                      <div className="flex-shrink-0">
                        {getStatusIcon(problem.id)}
                      </div>

                      {/* Problem Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {index + 1}. {problem.title}
                          </h3>
                          
                          {/* Premium indicator can be added later */}
                        </div>
                        
                        <div className="mt-1 flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {problem.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {problem.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{problem.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Acceptance Rate */}
                      <div className="text-sm text-gray-600 text-center min-w-[80px]">
                        {(Math.random() * 60 + 20).toFixed(1)}%
                      </div>

                      {/* Difficulty */}
                      <div className="flex-shrink-0">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProblems.length === 0 && (
                <div className="text-center py-12">
                  <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No problems found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalChallenges;