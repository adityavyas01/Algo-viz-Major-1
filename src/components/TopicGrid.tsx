
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, GitBranch, Hash, Network, Search, Shuffle } from 'lucide-react';
import { Link } from 'react-router-dom';

const topics = [
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Bubble Sort, Quick Sort, Merge Sort, and more',
    icon: BarChart,
    color: 'from-blue-500 to-cyan-500',
    algorithms: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort']
  },
  {
    id: 'searching',
    title: 'Search Algorithms',
    description: 'Linear Search, Binary Search, and variations',
    icon: Search,
    color: 'from-green-500 to-teal-500',
    algorithms: ['Linear Search', 'Binary Search', 'Jump Search', 'Interpolation Search']
  },
  {
    id: 'trees',
    title: 'Tree Structures',
    description: 'Binary Trees, BST, AVL, Red-Black Trees',
    icon: GitBranch,
    color: 'from-purple-500 to-pink-500',
    algorithms: ['Binary Tree', 'BST', 'AVL Tree', 'Red-Black Tree']
  },
  {
    id: 'graphs',
    title: 'Graph Algorithms',
    description: 'BFS, DFS, Dijkstra, and shortest paths',
    icon: Network,
    color: 'from-orange-500 to-red-500',
    algorithms: ['BFS', 'DFS', 'Dijkstra', 'Bellman-Ford']
  },
  {
    id: 'dynamic',
    title: 'Dynamic Programming',
    description: 'Fibonacci, Knapsack, LCS, and optimization',
    icon: Shuffle,
    color: 'from-indigo-500 to-purple-500',
    algorithms: ['Fibonacci', 'Knapsack', 'LCS', 'Coin Change']
  },
  {
    id: 'hashing',
    title: 'Hash Tables',
    description: 'Hash functions, collision resolution, load factors',
    icon: Hash,
    color: 'from-teal-500 to-cyan-500',
    algorithms: ['Linear Probing', 'Chaining', 'Double Hashing', 'Cuckoo Hashing']
  }
];

export const TopicGrid = () => {
  return (
    <section className="py-20 px-4" id="topics">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Explore DSA Topics</h2>
          <p className="text-xl text-white/80">Choose a category to start your visualization journey</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => {
            const IconComponent = topic.icon;
            return (
              <Card key={topic.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group">
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-r ${topic.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{topic.title}</CardTitle>
                  <CardDescription className="text-white/70">{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {topic.algorithms.map((algorithm, index) => (
                      <div key={index} className="text-sm text-white/60 flex items-center">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full mr-2" />
                        {algorithm}
                      </div>
                    ))}
                  </div>
                  <Button 
                    asChild
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white border-0 transition-colors"
                  >
                    <Link to="/learning" className="flex items-center justify-center gap-2">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
