import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, CheckCircle } from 'lucide-react';
import { AlgorithmCard } from './library/AlgorithmCard';

interface Algorithm {
  id: string;
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Published' | 'Draft' | 'Review';
  completionRate: number;
  lastUpdated: string;
  visualizations: number;
  problems: number;
}

export const AlgorithmLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const algorithms: Algorithm[] = [
    {
      id: '1',
      name: 'Bubble Sort',
      category: 'Sorting',
      difficulty: 'Beginner',
      status: 'Published',
      completionRate: 95,
      lastUpdated: '2024-01-15',
      visualizations: 3,
      problems: 12
    },
    {
      id: '2',
      name: 'Dijkstra\'s Algorithm',
      category: 'Graph',
      difficulty: 'Advanced',
      status: 'Published',
      completionRate: 78,
      lastUpdated: '2024-01-12',
      visualizations: 2,
      problems: 8
    },
    {
      id: '3',
      name: 'Binary Search Tree',
      category: 'Tree',
      difficulty: 'Intermediate',
      status: 'Review',
      completionRate: 0,
      lastUpdated: '2024-01-10',
      visualizations: 1,
      problems: 5
    },
    {
      id: '4',
      name: 'Dynamic Programming - Knapsack',
      category: 'Dynamic Programming',
      difficulty: 'Advanced',
      status: 'Draft',
      completionRate: 0,
      lastUpdated: '2024-01-08',
      visualizations: 0,
      problems: 0
    }
  ];

  const categories = ['all', 'Sorting', 'Graph', 'Tree', 'Dynamic Programming', 'Search'];

  const filteredAlgorithms = algorithms.filter(algo => {
    const matchesSearch = algo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || algo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Algorithm Library</h1>
            <p className="text-white/70 text-lg">Manage and expand your algorithm content</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Algorithm
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">47</div>
              <div className="text-white/70">Total Algorithms</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">38</div>
              <div className="text-white/70">Published</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">156</div>
              <div className="text-white/70">Visualizations</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">342</div>
              <div className="text-white/70">Practice Problems</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              placeholder="Search algorithms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border-white/20 text-white pl-12 h-12"
            />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                className={selectedCategory === category 
                  ? 'bg-white text-black h-12' 
                  : 'border-white/30 text-white hover:bg-white/10 h-12'
                }
              >
                {category === 'all' ? 'All' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Add Algorithm Form */}
        {showAddForm && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-xl">Add New Algorithm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Algorithm Name" className="bg-white/10 border-white/20 text-white" />
                <Input placeholder="Category" className="bg-white/10 border-white/20 text-white" />
              </div>
              <Textarea 
                placeholder="Algorithm Description" 
                className="bg-white/10 border-white/20 text-white h-24"
              />
              <div className="flex gap-3">
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Create Algorithm
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Algorithm Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Algorithms</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAlgorithms.map(algorithm => (
              <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
