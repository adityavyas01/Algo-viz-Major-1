
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Bug, 
  MessageSquare, 
  Shield, 
  BarChart3, 
  Users,
  ArrowRight,
  TrendingUp,
  Activity,
  ArrowLeft
} from 'lucide-react';

export const ContentManagement: React.FC = () => {
  const modules = [
    {
      id: 'library',
      title: 'Algorithm Library',
      description: 'Manage algorithms, visualizations, and learning content',
      icon: BookOpen,
      color: 'from-cyan-500 to-blue-600',
      stats: { total: '47 Algorithms', active: '38 Published' },
      route: '/content-management/library'
    },
    {
      id: 'bugs',
      title: 'Bug Tracker',
      description: 'Track issues, bugs, and technical improvements',
      icon: Bug,
      color: 'from-red-500 to-pink-600',
      stats: { total: '12 Open Issues', active: '3 Critical' },
      route: '/content-management/bugs'
    },
    {
      id: 'feedback',
      title: 'User Feedback',
      description: 'Collect and manage user suggestions and reviews',
      icon: MessageSquare,
      color: 'from-purple-500 to-violet-600',
      stats: { total: '234 Reviews', active: '4.8 Rating' },
      route: '/content-management/feedback'
    },
    {
      id: 'security',
      title: 'Security Panel',
      description: 'Monitor security events and manage compliance',
      icon: Shield,
      color: 'from-green-500 to-emerald-600',
      stats: { total: 'All Systems', active: 'Secure' },
      route: '/content-management/security'
    },
    {
      id: 'testing',
      title: 'A/B Testing',
      description: 'Run experiments and optimize conversion rates',
      icon: BarChart3,
      color: 'from-orange-500 to-amber-600',
      stats: { total: '5 Active Tests', active: '+12.4% Lift' },
      route: '/content-management/testing'
    },
    {
      id: 'community',
      title: 'Community Management',
      description: 'Manage forums, discussions, and user support',
      icon: Users,
      color: 'from-indigo-500 to-blue-600',
      stats: { total: '1.2K Members', active: '89 Online' },
      route: '/content-management/community'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            asChild
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
          >
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Content Management
            <span className="block text-3xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-2">
              Platform Hub
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Comprehensive platform management and optimization tools for maintaining and growing your algorithm learning platform.
          </p>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Activity className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">98.9%</div>
              <div className="text-white/70">Platform Uptime</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">+23%</div>
              <div className="text-white/70">User Growth</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">2.4K</div>
              <div className="text-white/70">Active Users</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Card key={module.id} className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white mb-2">{module.title}</CardTitle>
                  <p className="text-white/70 text-sm leading-relaxed">{module.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-white font-semibold text-sm">{module.stats.total}</div>
                      <div className="text-white/60 text-xs">{module.stats.active}</div>
                    </div>
                  </div>
                  <Button 
                    asChild
                    className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90 transition-all duration-300 group-hover:shadow-lg text-white border-0`}
                  >
                    <Link to={module.route} className="flex items-center justify-center gap-2">
                      Manage
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity Section */}
        <Card className="mt-16 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Recent Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-white font-medium">New algorithm "Dijkstra's Shortest Path" published</div>
                  <div className="text-white/60 text-sm">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-white font-medium">A/B test "Navigation Layout" completed with 15% improvement</div>
                  <div className="text-white/60 text-sm">4 hours ago</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-white font-medium">Security scan completed - All systems secure</div>
                  <div className="text-white/60 text-sm">1 day ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
