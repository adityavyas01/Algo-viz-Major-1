
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bug, 
  Plus, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingDown,
  Filter
} from 'lucide-react';

interface BugReport {
  id: string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  reporter: string;
  assignee: string;
  created: string;
  category: string;
}

export const BugTracker: React.FC = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const bugs: BugReport[] = [
    {
      id: 'BUG-001',
      title: 'Visualization freezes on large datasets',
      description: 'When sorting arrays with more than 10,000 elements, the bubble sort visualization becomes unresponsive.',
      severity: 'High',
      status: 'In Progress',
      reporter: 'john.doe@example.com',
      assignee: 'dev-team',
      created: '2024-01-15',
      category: 'Performance'
    },
    {
      id: 'BUG-002',
      title: 'Mobile layout broken on iOS Safari',
      description: 'Algorithm cards are not displaying correctly on iOS Safari browsers.',
      severity: 'Medium',
      status: 'Open',
      reporter: 'sarah.smith@example.com',
      assignee: 'Unassigned',
      created: '2024-01-14',
      category: 'UI/UX'
    },
    {
      id: 'BUG-003',
      title: 'Memory leak in graph visualization',
      description: 'Graph algorithms cause memory usage to continuously increase over time.',
      severity: 'Critical',
      status: 'Open',
      reporter: 'mike.johnson@example.com',
      assignee: 'performance-team',
      created: '2024-01-13',
      category: 'Performance'
    },
    {
      id: 'BUG-004',
      title: 'Code editor syntax highlighting incorrect',
      description: 'Python syntax highlighting shows incorrect colors for certain keywords.',
      severity: 'Low',
      status: 'Resolved',
      reporter: 'lisa.brown@example.com',
      assignee: 'frontend-team',
      created: '2024-01-10',
      category: 'Editor'
    }
  ];

  const getSeverityColor = (severity: BugReport['severity']) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: BugReport['status']) => {
    switch (status) {
      case 'Open': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'In Progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Resolved': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'Closed': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bug.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Bug Tracker</h3>
          <p className="text-white/70">Monitor and resolve platform issues</p>
        </div>
        <Button 
          onClick={() => setShowReportForm(!showReportForm)}
          className="bg-gradient-to-r from-red-500 to-orange-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Report Bug
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">23</div>
            <div className="text-white/70 text-sm">Open Issues</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">8</div>
            <div className="text-white/70 text-sm">In Progress</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">145</div>
            <div className="text-white/70 text-sm">Resolved</div>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">4.2h</div>
            <div className="text-white/70 text-sm">Avg Resolution</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search bugs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Report Bug Form */}
      {showReportForm && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Report New Bug</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Bug Title" className="bg-white/10 border-white/20 text-white" />
            <Textarea 
              placeholder="Detailed Description" 
              className="bg-white/10 border-white/20 text-white"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="ui-ux">UI/UX</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="visualization">Visualization</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Reporter Email" className="bg-white/10 border-white/20 text-white" />
            </div>
            <div className="flex gap-2">
              <Button className="bg-red-600 hover:bg-red-700">
                <Bug className="w-4 h-4 mr-2" />
                Submit Bug Report
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowReportForm(false)}
                className="border-white/30 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bug List */}
      <div className="space-y-4">
        {filteredBugs.map(bug => (
          <Card key={bug.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-semibold">{bug.title}</h4>
                    <Badge className={getSeverityColor(bug.severity)}>
                      {bug.severity}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(bug.status)}>
                      {bug.status}
                    </Badge>
                  </div>
                  <p className="text-white/70 text-sm mb-3">{bug.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-white/70">ID:</span>
                      <span className="text-white ml-2">{bug.id}</span>
                    </div>
                    <div>
                      <span className="text-white/70">Reporter:</span>
                      <span className="text-white ml-2">{bug.reporter}</span>
                    </div>
                    <div>
                      <span className="text-white/70">Assignee:</span>
                      <span className="text-white ml-2">{bug.assignee}</span>
                    </div>
                    <div>
                      <span className="text-white/70">Created:</span>
                      <span className="text-white ml-2">{bug.created}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    View Details
                  </Button>
                  {bug.status === 'Open' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Assign
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
