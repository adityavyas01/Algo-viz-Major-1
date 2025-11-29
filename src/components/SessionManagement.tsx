import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Clock,
  Star,
  Crown,
  Share2,
  Play,
  Lock,
  Globe,
  Copy,
  Eye,
  MessageCircle,
  Zap,
  Code,
  Brain,
  Rocket,
  Calendar,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MotionWrapper, MicroInteraction } from '@/components/motion/MotionWrapper';
import { useCollaboration, CollaborationSession, User as CollabUser } from '@/contexts/CollaborationContext';

// Session Card Component
const SessionCard = ({ session, onJoin, onView }: { 
  session: CollaborationSession; 
  onJoin: (sessionId: string) => void;
  onView: (sessionId: string) => void;
}) => {
  const getAlgorithmIcon = (algorithm: string) => {
    switch (algorithm.toLowerCase()) {
      case 'binary-search-tree':
      case 'tree':
        return <Code className="w-5 h-5" />;
      case 'graph':
      case 'graph-traversal':
        return <Zap className="w-5 h-5" />;
      case 'sorting':
      case 'quicksort':
      case 'mergesort':
        return <Brain className="w-5 h-5" />;
      default:
        return <Rocket className="w-5 h-5" />;
    }
  };

  const getAlgorithmColor = (algorithm: string) => {
    switch (algorithm.toLowerCase()) {
      case 'binary-search-tree':
      case 'tree':
        return 'from-green-500 to-emerald-500';
      case 'graph':
      case 'graph-traversal':
        return 'from-purple-500 to-pink-500';
      case 'sorting':
      case 'quicksort':
      case 'mergesort':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-orange-500 to-red-500';
    }
  };

  return (
    <MicroInteraction type="card">
      <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAlgorithmColor(session.algorithm)} flex items-center justify-center`}>
                {getAlgorithmIcon(session.algorithm)}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-1">{session.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`bg-gradient-to-r ${getAlgorithmColor(session.algorithm)} text-white text-xs`}>
                    {session.algorithm.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                  {session.isActive && (
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      Live
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {session.participants.length} participants
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Created {new Date(session.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {session.createdBy === 'current' ? 'You' : 'Host'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(session.id)}
                className="text-white/60 hover:text-white"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => onJoin(session.id)}
                size="sm"
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                Join
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/60">Algorithm Progress</span>
              <span className="text-white/80">{Math.round((session.currentStep / 10) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${getAlgorithmColor(session.algorithm)}`}
                style={{ width: `${Math.round((session.currentStep / 10) * 100)}%` }}
              />
            </div>
          </div>

          {/* Participants Preview */}
          {session.participants.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Participants:</span>
              <div className="flex -space-x-2">
                {session.participants.slice(0, 3).map((participant, index) => (
                  <Avatar key={index} className="w-6 h-6 border-2 border-slate-900">
                    <AvatarFallback className="text-xs bg-cyan-500/20 text-cyan-400">
                      {participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {session.participants.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-slate-900 flex items-center justify-center">
                    <span className="text-white/60 text-xs">+{session.participants.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </MicroInteraction>
  );
};

// Create Session Dialog
const CreateSessionDialog = ({ onCreateSession }: { onCreateSession: (name: string, algorithm: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [algorithm, setAlgorithm] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCreate = () => {
    if (sessionName && algorithm) {
      onCreateSession(sessionName, algorithm);
      setIsOpen(false);
      setSessionName('');
      setAlgorithm('');
      setDescription('');
      setIsPrivate(false);
    }
  };

  const algorithms = [
    { value: 'binary-search-tree', label: 'Binary Search Tree', description: 'Tree data structure visualization' },
    { value: 'graph-traversal', label: 'Graph Traversal', description: 'BFS and DFS algorithms' },
    { value: 'sorting-algorithm', label: 'Sorting Algorithms', description: 'QuickSort, MergeSort, etc.' },
    { value: 'dynamic-programming', label: 'Dynamic Programming', description: 'Optimization algorithms' },
    { value: 'pathfinding', label: 'Pathfinding', description: 'Dijkstra, A* algorithms' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Session
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-cyan-400" />
            Create Collaboration Session
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Start a new session to collaborate with others on algorithm learning
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="session-name" className="text-white/80">Session Name</Label>
            <Input
              id="session-name"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="e.g., Binary Search Tree Study Group"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="algorithm" className="text-white/80">Algorithm</Label>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Choose an algorithm to learn" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                {algorithms.map((algo) => (
                  <SelectItem key={algo.value} value={algo.value} className="text-white hover:bg-white/10">
                    <div>
                      <div className="font-medium">{algo.label}</div>
                      <div className="text-xs text-white/60">{algo.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white/80">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you'll be learning in this session..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <Label htmlFor="private-session" className="text-white/80 font-medium">Private Session</Label>
              <p className="text-white/60 text-sm">Only invited users can join</p>
            </div>
            <Switch
              id="private-session"
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="flex-1 border border-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!sessionName || !algorithm}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Create Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Session Management Component
export const SessionManagement: React.FC = () => {
  const { availableSessions, createSession, joinSession } = useCollaboration();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('browse');

  const filteredSessions = availableSessions.filter(session => {
    const matchesSearch = session.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.algorithm.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && session.isActive) ||
                         (selectedFilter === 'mine' && session.createdBy === 'current') ||
                         session.algorithm === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const handleCreateSession = async (name: string, algorithm: string) => {
    try {
      const sessionId = await createSession(name, algorithm);
      console.log('Created session:', sessionId);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const handleJoinSession = async (sessionId: string) => {
    try {
      const success = await joinSession(sessionId);
      if (success) {
        console.log('Joined session:', sessionId);
      }
    } catch (error) {
      console.error('Failed to join session:', error);
    }
  };

  const handleViewSession = (sessionId: string) => {
    // Navigate to session details or preview
    console.log('Viewing session:', sessionId);
  };

  const copySessionLink = (sessionId: string) => {
    const link = `${window.location.origin}/collaborate/${sessionId}`;
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <MotionWrapper variant="fadeInUp" delay={0.1}>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Collaborative Learning Sessions</h1>
            <p className="text-white/70 max-w-3xl mx-auto">
              Join live algorithm visualization sessions or create your own to learn with others in real-time
            </p>
          </div>
        </MotionWrapper>

        {/* Navigation */}
        <MotionWrapper variant="fadeInUp" delay={0.2}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-white/5 backdrop-blur-md border border-white/10">
                <TabsTrigger 
                  value="browse" 
                  className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                >
                  <Search className="w-4 h-4" />
                  Browse Sessions
                </TabsTrigger>
                <TabsTrigger 
                  value="my-sessions" 
                  className="flex items-center gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                >
                  <Crown className="w-4 h-4" />
                  My Sessions
                </TabsTrigger>
              </TabsList>

              <CreateSessionDialog onCreateSession={handleCreateSession} />
            </div>

            {/* Browse Sessions Tab */}
            <TabsContent value="browse">
              <MotionWrapper variant="fadeInUp" delay={0.3}>
                <Card className="bg-white/5 backdrop-blur-md border-white/10 mb-6">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Search */}
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                          <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search sessions by name or algorithm..."
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                          />
                        </div>
                      </div>

                      {/* Filter */}
                      <div className="flex gap-2">
                        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                          <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-white/10">
                            <SelectItem value="all" className="text-white hover:bg-white/10">All Sessions</SelectItem>
                            <SelectItem value="active" className="text-white hover:bg-white/10">Active Only</SelectItem>
                            <SelectItem value="binary-search-tree" className="text-white hover:bg-white/10">Binary Trees</SelectItem>
                            <SelectItem value="graph-traversal" className="text-white hover:bg-white/10">Graph Algorithms</SelectItem>
                            <SelectItem value="sorting-algorithm" className="text-white hover:bg-white/10">Sorting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionWrapper>

              {/* Session Grid */}
              <MotionWrapper variant="stagger">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredSessions.map((session, index) => (
                    <MotionWrapper key={session.id} variant="scaleIn" delay={index * 0.1}>
                      <SessionCard
                        session={session}
                        onJoin={handleJoinSession}
                        onView={handleViewSession}
                      />
                    </MotionWrapper>
                  ))}
                </div>
              </MotionWrapper>

              {filteredSessions.length === 0 && (
                <MotionWrapper variant="fadeInUp" delay={0.4}>
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white text-lg font-semibold mb-2">No Sessions Found</h3>
                    <p className="text-white/60 mb-6">
                      {searchQuery ? 'Try adjusting your search terms' : 'No active sessions available'}
                    </p>
                    <CreateSessionDialog onCreateSession={handleCreateSession} />
                  </div>
                </MotionWrapper>
              )}
            </TabsContent>

            {/* My Sessions Tab */}
            <TabsContent value="my-sessions">
              <MotionWrapper variant="fadeInUp" delay={0.3}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {availableSessions
                    .filter(session => session.createdBy === 'current')
                    .map((session, index) => (
                      <MotionWrapper key={session.id} variant="scaleIn" delay={index * 0.1}>
                        <SessionCard
                          session={session}
                          onJoin={handleJoinSession}
                          onView={handleViewSession}
                        />
                      </MotionWrapper>
                    ))}
                </div>
              </MotionWrapper>

              {availableSessions.filter(s => s.createdBy === 'current').length === 0 && (
                <MotionWrapper variant="fadeInUp" delay={0.4}>
                  <div className="text-center py-12">
                    <Crown className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white text-lg font-semibold mb-2">No Sessions Created</h3>
                    <p className="text-white/60 mb-6">
                      Create your first collaboration session to get started
                    </p>
                    <CreateSessionDialog onCreateSession={handleCreateSession} />
                  </div>
                </MotionWrapper>
              )}
            </TabsContent>
          </Tabs>
        </MotionWrapper>

        {/* Quick Stats */}
        <MotionWrapper variant="fadeInUp" delay={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-white">{availableSessions.length}</div>
                <div className="text-white/60 text-sm">Active Sessions</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
                  <Play className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {availableSessions.reduce((sum, session) => sum + session.participants.length, 0)}
                </div>
                <div className="text-white/60 text-sm">Total Participants</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                  <Brain className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">5</div>
                <div className="text-white/60 text-sm">Algorithm Types</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {availableSessions.filter(s => s.isActive).length}
                </div>
                <div className="text-white/60 text-sm">Live Now</div>
              </CardContent>
            </Card>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default SessionManagement;