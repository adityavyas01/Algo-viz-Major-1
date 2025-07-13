
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageSquare, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  TrendingUp,
  Users,
  Heart,
  Filter
} from 'lucide-react';

interface Feedback {
  id: string;
  user: string;
  type: 'Feature Request' | 'Bug Report' | 'General' | 'Improvement';
  category: string;
  title: string;
  description: string;
  rating: number;
  votes: number;
  status: 'New' | 'Under Review' | 'Planned' | 'Implemented' | 'Declined';
  created: string;
}

interface FeedbackStats {
  totalFeedback: number;
  averageRating: number;
  implementedSuggestions: number;
  responseRate: number;
}

export const UserFeedback: React.FC = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const feedbackData: Feedback[] = [
    {
      id: 'FB-001',
      user: 'alex.chen@university.edu',
      type: 'Feature Request',
      category: 'Visualization',
      title: 'Add 3D visualization for tree structures',
      description: 'It would be great to have 3D visualizations for binary trees and other tree structures to better understand the spatial relationships.',
      rating: 5,
      votes: 47,
      status: 'Planned',
      created: '2024-01-15'
    },
    {
      id: 'FB-002',
      user: 'student123@college.edu',
      type: 'Improvement',
      category: 'UI/UX',
      title: 'Improve mobile responsiveness',
      description: 'The platform could work better on mobile devices. Some buttons are too small and the layout gets cramped.',
      rating: 4,
      votes: 23,
      status: 'Under Review',
      created: '2024-01-14'
    },
    {
      id: 'FB-003',
      user: 'professor.smith@university.edu',
      type: 'Feature Request',
      category: 'Education',
      title: 'Add instructor dashboard for student progress',
      description: 'As an instructor, I would like to see detailed analytics of my students\' progress through different algorithms.',
      rating: 5,
      votes: 34,
      status: 'Implemented',
      created: '2024-01-12'
    },
    {
      id: 'FB-004',
      user: 'learner456@email.com',
      type: 'General',
      category: 'Content',
      title: 'More sorting algorithm examples',
      description: 'Please add more sorting algorithms like heap sort and radix sort with step-by-step explanations.',
      rating: 4,
      votes: 18,
      status: 'New',
      created: '2024-01-10'
    }
  ];

  const stats: FeedbackStats = {
    totalFeedback: 247,
    averageRating: 4.3,
    implementedSuggestions: 34,
    responseRate: 89
  };

  const getStatusColor = (status: Feedback['status']) => {
    switch (status) {
      case 'New': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Under Review': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'Planned': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Implemented': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Declined': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getTypeColor = (type: Feedback['type']) => {
    switch (type) {
      case 'Feature Request': return 'bg-cyan-500';
      case 'Bug Report': return 'bg-red-500';
      case 'General': return 'bg-gray-500';
      case 'Improvement': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesType = selectedType === 'all' || feedback.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || feedback.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">User Feedback</h3>
        <p className="text-white/70">Collect and analyze user suggestions and feedback</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.totalFeedback}</div>
            <div className="text-white/70 text-sm">Total Feedback</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
              {stats.averageRating}
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="text-white/70 text-sm">Average Rating</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.implementedSuggestions}</div>
            <div className="text-white/70 text-sm">Implemented</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.responseRate}%</div>
            <div className="text-white/70 text-sm">Response Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Feature Request">Feature Request</SelectItem>
            <SelectItem value="Bug Report">Bug Report</SelectItem>
            <SelectItem value="General">General</SelectItem>
            <SelectItem value="Improvement">Improvement</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Planned">Planned</SelectItem>
            <SelectItem value="Implemented">Implemented</SelectItem>
            <SelectItem value="Declined">Declined</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map(feedback => (
          <Card key={feedback.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-semibold">{feedback.title}</h4>
                    <Badge className={getTypeColor(feedback.type)}>
                      {feedback.type}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(feedback.status)}>
                      {feedback.status}
                    </Badge>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-3">{feedback.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-white/70">Rating:</span>
                      <div className="flex">{renderStars(feedback.rating)}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4 text-green-400" />
                      <span className="text-white">{feedback.votes}</span>
                    </div>
                    <div>
                      <span className="text-white/70">User:</span>
                      <span className="text-white ml-2">{feedback.user}</span>
                    </div>
                    <div>
                      <span className="text-white/70">Date:</span>
                      <span className="text-white ml-2">{feedback.created}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Update Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feedback Trends */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Feedback Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-4">Popular Categories</h4>
              <div className="space-y-3">
                {[
                  { category: 'Visualization', count: 67, percentage: 85 },
                  { category: 'UI/UX', count: 45, percentage: 60 },
                  { category: 'Education', count: 38, percentage: 50 },
                  { category: 'Performance', count: 23, percentage: 30 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-white text-sm">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={item.percentage} className="w-24 h-2" />
                      <span className="text-white/70 text-sm w-8">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Implementation Rate</h4>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">68%</div>
                  <div className="text-white/70 text-sm">Feature requests implemented</div>
                </div>
                <Progress value={68} className="h-3" />
                <div className="flex justify-between text-sm text-white/70">
                  <span>34 of 50 requests</span>
                  <span>This quarter</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
