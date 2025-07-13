
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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

interface AlgorithmCardProps {
  algorithm: Algorithm;
}

export const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ algorithm }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const getStatusColor = (status: Algorithm['status']) => {
    switch (status) {
      case 'Published': return 'bg-green-600 text-white';
      case 'Review': return 'bg-yellow-600 text-white';
      case 'Draft': return 'bg-gray-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getDifficultyColor = (difficulty: Algorithm['difficulty']) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600/20 text-green-300 border-green-600/50';
      case 'Intermediate': return 'bg-yellow-600/20 text-yellow-300 border-yellow-600/50';
      case 'Advanced': return 'bg-red-600/20 text-red-300 border-red-600/50';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-600/50';
    }
  };

  // Map algorithm names to learning hub algorithms
  const getAlgorithmRoute = (name: string) => {
    const algorithmMap: { [key: string]: string } = {
      'Bubble Sort': 'bubble-sort',
      'Quick Sort': 'quick-sort',
      'Merge Sort': 'merge-sort',
      'Binary Search': 'binary-search',
      'Linked List': 'linked-list',
      'Stack': 'stacks',
      'Queue': 'queues',
      'Binary Tree': 'trees',
      'Hash Table': 'graphs'
    };
    return algorithmMap[name] || 'bubble-sort';
  };

  const handlePreview = () => {
    const algorithmId = getAlgorithmRoute(algorithm.name);
    navigate(`/learning?algorithm=${algorithmId}&tab=tutorials`);
    toast({
      title: "Opening Algorithm Tutorial",
      description: `Loading ${algorithm.name} visualization and tutorial`,
    });
  };

  const handlePractice = () => {
    const algorithmId = getAlgorithmRoute(algorithm.name);
    navigate(`/learning?algorithm=${algorithmId}&tab=practice`);
    toast({
      title: "Starting Practice Session",
      description: `Practice problems for ${algorithm.name}`,
    });
  };

  const handleView = () => {
    const algorithmId = getAlgorithmRoute(algorithm.name);
    navigate(`/learning?algorithm=${algorithmId}&tab=tutorials`);
  };

  const handleEdit = () => {
    toast({
      title: "Edit Mode",
      description: `This would open the content editor for ${algorithm.name}`,
    });
  };

  const handleDelete = () => {
    toast({
      title: "Delete Confirmation Required",
      description: `Are you sure you want to delete ${algorithm.name}?`,
      variant: "destructive",
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <h4 className="text-white font-semibold text-lg">{algorithm.name}</h4>
              <Badge className={getStatusColor(algorithm.status)}>
                {algorithm.status}
              </Badge>
              <Badge variant="outline" className={getDifficultyColor(algorithm.difficulty)}>
                {algorithm.difficulty}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <span className="text-white/70 text-sm">Category</span>
                <p className="text-white">{algorithm.category}</p>
              </div>
              <div>
                <span className="text-white/70 text-sm">Content</span>
                <p className="text-white text-sm">
                  {algorithm.visualizations} visualizations, {algorithm.problems} problems
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/70">Student Progress</span>
                <span className="text-white">{algorithm.completionRate}%</span>
              </div>
              <Progress value={algorithm.completionRate} className="h-2" />
            </div>

            <div className="mt-3">
              <span className="text-white/70 text-sm">Last Updated: </span>
              <span className="text-white text-sm">{algorithm.lastUpdated}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 ml-4">
            <Button 
              size="sm" 
              onClick={handlePreview}
              className="bg-cyan-600 hover:bg-cyan-700 text-white border-0"
              title="Learn This Algorithm"
            >
              <Play className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={handlePractice}
              className="bg-green-600 hover:bg-green-700 text-white border-0"
              title="Practice Problems"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700 text-white border-0"
              title="Edit Content (Admin)"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white border-0"
              title="Delete (Admin)"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
