
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Award, 
  TrendingUp,
  Ban,
  UserPlus,
  MessageCircle,
  Star,
  Flag,
  Shield
} from 'lucide-react';

interface CommunityMetric {
  name: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

interface ForumPost {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
  views: number;
  created: string;
  status: 'Active' | 'Closed' | 'Pinned' | 'Flagged';
}

interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  posts: number;
  reputation: number;
  status: 'Active' | 'Suspended' | 'Banned';
  role: 'Student' | 'Instructor' | 'Moderator' | 'Admin';
}

export const CommunityManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const communityMetrics: CommunityMetric[] = [
    { name: 'Active Users', value: '12,847', change: '+8.3%', trend: 'up' },
    { name: 'Forum Posts', value: '3,456', change: '+12.1%', trend: 'up' },
    { name: 'Study Groups', value: '456', change: '+5.7%', trend: 'up' },
    { name: 'Response Rate', value: '89%', change: '+2.1%', trend: 'up' }
  ];

  const forumPosts: ForumPost[] = [
    {
      id: 'POST-001',
      title: 'How to optimize bubble sort algorithm?',
      author: 'student_alex',
      category: 'Algorithms',
      replies: 23,
      likes: 15,
      views: 567,
      created: '2024-01-15',
      status: 'Active'
    },
    {
      id: 'POST-002',
      title: 'Graph visualization rendering slowly',
      author: 'dev_sarah',
      category: 'Technical Support',
      replies: 8,
      likes: 12,
      views: 234,
      created: '2024-01-14',
      status: 'Flagged'
    },
    {
      id: 'POST-003',
      title: 'Weekly Algorithm Challenge - Binary Trees',
      author: 'instructor_mike',
      category: 'Challenges',
      replies: 45,
      likes: 67,
      views: 1234,
      created: '2024-01-13',
      status: 'Pinned'
    },
    {
      id: 'POST-004',
      title: 'Study group for data structures',
      author: 'student_lisa',
      category: 'Study Groups',
      replies: 12,
      likes: 8,
      views: 345,
      created: '2024-01-12',
      status: 'Active'
    }
  ];

  const topUsers: User[] = [
    {
      id: 'USER-001',
      name: 'Alex Chen',
      email: 'alex.chen@university.edu',
      joinDate: '2023-09-15',
      posts: 234,
      reputation: 1456,
      status: 'Active',
      role: 'Student'
    },
    {
      id: 'USER-002',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@university.edu',
      joinDate: '2023-08-01',
      posts: 145,
      reputation: 2890,
      status: 'Active',
      role: 'Instructor'
    },
    {
      id: 'USER-003',
      name: 'Mike Johnson',
      email: 'mike.j@student.edu',
      joinDate: '2023-10-20',
      posts: 189,
      reputation: 987,
      status: 'Active',
      role: 'Student'
    }
  ];

  const getStatusColor = (status: ForumPost['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      case 'Pinned': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Flagged': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getUserStatusColor = (status: User['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Suspended': return 'bg-yellow-500';
      case 'Banned': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'Admin': return 'bg-purple-500';
      case 'Moderator': return 'bg-blue-500';
      case 'Instructor': return 'bg-orange-500';
      case 'Student': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: CommunityMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      case 'stable': return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    }
  };

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Community Management</h3>
        <p className="text-white/70">Manage forums, users, and community engagement</p>
      </div>

      {/* Community Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {communityMetrics.map((metric, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">{metric.name}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                </div>
                <div className="text-right">
                  {getTrendIcon(metric.trend)}
                  <p className="text-sm text-green-500">{metric.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forum Management */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Forum Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Algorithms">Algorithms</SelectItem>
                  <SelectItem value="Technical Support">Technical Support</SelectItem>
                  <SelectItem value="Challenges">Challenges</SelectItem>
                  <SelectItem value="Study Groups">Study Groups</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pinned">Pinned</SelectItem>
                  <SelectItem value="Flagged">Flagged</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              {filteredPosts.map(post => (
                <div key={post.id} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="text-white font-medium text-sm">{post.title}</h5>
                    <Badge variant="outline" className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-white/70">
                    <span>by {post.author}</span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </span>
                    <span>{post.views} views</span>
                  </div>

                  <div className="flex gap-1 mt-2">
                    <Button size="sm" variant="outline" className="h-6 text-xs border-white/30 text-white hover:bg-white/10">
                      View
                    </Button>
                    {post.status === 'Flagged' && (
                      <Button size="sm" variant="outline" className="h-6 text-xs border-red-500/50 text-red-400 hover:bg-red-500/20">
                        <Flag className="w-3 h-3 mr-1" />
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5" />
              Top Contributors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map(user => (
                <div key={user.id} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-white font-medium">{user.name}</h5>
                    <div className="flex gap-2">
                      <Badge className={getUserStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm text-white/70 mb-3">
                    <div>
                      <span className="block">Posts</span>
                      <span className="text-white font-medium">{user.posts}</span>
                    </div>
                    <div>
                      <span className="block">Reputation</span>
                      <span className="text-white font-medium">{user.reputation}</span>
                    </div>
                    <div>
                      <span className="block">Joined</span>
                      <span className="text-white font-medium">{user.joinDate}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs border-white/30 text-white hover:bg-white/10">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs border-white/30 text-white hover:bg-white/10">
                      <Shield className="w-3 h-3 mr-1" />
                      Moderate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Health */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Community Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-white font-medium mb-4">Engagement Metrics</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Daily Active Users</span>
                  <span className="text-white">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Posts per Day</span>
                  <span className="text-white">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Response Time</span>
                  <span className="text-white">4.2 hours</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Content Quality</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/70 text-sm">Helpful Posts</span>
                    <span className="text-white text-sm">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/70 text-sm">Moderation Score</span>
                    <span className="text-white text-sm">96%</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/70 text-sm">User Satisfaction</span>
                    <span className="text-white text-sm">4.7/5</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Moderation Stats</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Flagged Posts</span>
                  <span className="text-white">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Resolved Reports</span>
                  <span className="text-white">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Active Moderators</span>
                  <span className="text-white">8</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
