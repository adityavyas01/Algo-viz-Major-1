import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Share2, 
  MessageSquare, 
  Users, 
  Code,
  Clock,
  Play,
  Pause,
  Settings,
  Phone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface CollaborativeSession {
  id: string;
  title: string;
  host: {
    id: string;
    name: string;
    avatar?: string;
  };
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
  }>;
  status: 'waiting' | 'active' | 'paused';
  algorithm: string;
  duration: number; // in minutes
  maxParticipants: number;
  isPublic: boolean;
}

const mockSessions: CollaborativeSession[] = [
  {
    id: '1',
    title: 'Binary Search Deep Dive',
    host: { id: '1', name: 'Alice Johnson' },
    participants: [
      { id: '2', name: 'Bob Smith', isOnline: true },
      { id: '3', name: 'Carol Wilson', isOnline: true },
      { id: '4', name: 'David Brown', isOnline: false },
    ],
    status: 'active',
    algorithm: 'binary-search',
    duration: 45,
    maxParticipants: 8,
    isPublic: true,
  },
  {
    id: '2', 
    title: 'Quick Sort Implementation Practice',
    host: { id: '5', name: 'Eve Davis' },
    participants: [
      { id: '6', name: 'Frank Miller', isOnline: true },
      { id: '7', name: 'Grace Lee', isOnline: true },
    ],
    status: 'waiting',
    algorithm: 'quick-sort',
    duration: 60,
    maxParticipants: 6,
    isPublic: false,
  },
];

export const AdvancedCollaborativeFeatures: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeSession, setActiveSession] = useState<CollaborativeSession | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const handleJoinSession = (sessionId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to join collaborative sessions",
        variant: "destructive"
      });
      return;
    }

    const session = mockSessions.find(s => s.id === sessionId);
    if (session) {
      setActiveSession(session);
      toast({
        title: "Joined Session",
        description: `Connected to "${session.title}"`,
      });
    }
  };

  const handleLeaveSession = () => {
    setActiveSession(null);
    toast({
      title: "Left Session",
      description: "You have disconnected from the collaborative session",
    });
  };

  const handleCreateSession = () => {
    if (!user) {
      toast({
        title: "Authentication Required", 
        description: "Please sign in to create collaborative sessions",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Create Session",
      description: "Session creation feature coming soon!",
    });
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    toast({
      title: isVideoEnabled ? "Video Disabled" : "Video Enabled",
      description: `Your camera is now ${isVideoEnabled ? 'off' : 'on'}`,
    });
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    toast({
      title: isAudioEnabled ? "Microphone Muted" : "Microphone Unmuted",
      description: `Your microphone is now ${isAudioEnabled ? 'muted' : 'unmuted'}`,
    });
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast({
      title: isScreenSharing ? "Screen Share Stopped" : "Screen Share Started",
      description: `Screen sharing is now ${isScreenSharing ? 'disabled' : 'enabled'}`,
    });
  };

  if (activeSession) {
    return (
      <div className="space-y-6">
        {/* Session Header */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  {activeSession.title}
                  <Badge className="bg-green-500 text-white">Live</Badge>
                </CardTitle>
                <p className="text-white/70 text-sm">
                  Hosted by {activeSession.host.name} • {activeSession.participants.length + 1} participants
                </p>
              </div>
              <Button
                onClick={handleLeaveSession}
                variant="destructive"
                size="sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Leave Session
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video/Screen Share Area */}
            <Card className="bg-black/40 border-white/20">
              <CardContent className="p-6">
                <div className="aspect-video bg-black/20 rounded-lg flex items-center justify-center relative">
                  {isScreenSharing ? (
                    <div className="text-center">
                      <Share2 className="w-16 h-16 text-white/50 mx-auto mb-4" />
                      <p className="text-white text-lg">Screen sharing active</p>
                      <p className="text-white/70">Algorithm visualization in progress</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Code className="w-16 h-16 text-white/50 mx-auto mb-4" />
                      <p className="text-white text-lg">Collaborative Workspace</p>
                      <p className="text-white/70">Working on: {activeSession.algorithm}</p>
                    </div>
                  )}

                  {/* Controls Overlay */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-2 bg-black/80 rounded-full px-4 py-2">
                      <Button
                        onClick={toggleVideo}
                        size="sm"
                        variant={isVideoEnabled ? "default" : "outline"}
                        className="rounded-full"
                      >
                        {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={toggleAudio}
                        size="sm"
                        variant={isAudioEnabled ? "default" : "destructive"}
                        className="rounded-full"
                      >
                        {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={toggleScreenShare}
                        size="sm"
                        variant={isScreenSharing ? "destructive" : "outline"}
                        className="rounded-full"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shared Code Editor */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Collaborative Code Editor
                  <Badge variant="outline" className="text-white border-white/30">Real-time</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black/30 p-4 rounded-lg min-h-[300px]">
                  <pre className="text-green-400 text-sm">
                    <code>{`// Collaborative Binary Search Implementation
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found!
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Not found
}

// Test with participants
const testArray = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(testArray, 7)); // Output: 3`}</code>
                  </pre>
                  <div className="mt-4 text-right">
                    <Badge className="bg-blue-500 text-white">
                      Last edit by Alice Johnson • 2 minutes ago
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg">Participants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Host */}
                <div className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded-lg">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-yellow-500 text-white">
                      {activeSession.host.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{activeSession.host.name}</p>
                    <p className="text-yellow-400 text-xs">Host</p>
                  </div>
                  <Badge className="bg-green-500 text-white text-xs">Online</Badge>
                </div>

                {/* Participants */}
                {activeSession.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {participant.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-white text-sm">{participant.name}</p>
                    </div>
                    <Badge 
                      className={`text-xs ${
                        participant.isOnline 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-500 text-white'
                      }`}
                    >
                      {participant.isOnline ? 'Online' : 'Away'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chat */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-blue-400 text-xs font-medium">Alice Johnson</p>
                    <p className="text-white text-sm">Let's walk through the binary search step by step</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <p className="text-green-400 text-xs font-medium">Bob Smith</p>
                    <p className="text-white text-sm">Great! I'm following along</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <p className="text-purple-400 text-xs font-medium">Carol Wilson</p>
                    <p className="text-white text-sm">Can we slow down the visualization?</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/50"
                  />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Collaborative Learning</h2>
        <p className="text-white/70 mb-6">
          Join live sessions, share screens, and learn algorithms together with other students
        </p>
        <Button
          onClick={handleCreateSession}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
        >
          <Users className="w-4 h-4 mr-2" />
          Create New Session
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Sessions</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {mockSessions.map((session) => (
            <Card
              key={session.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                        {session.host.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{session.title}</h3>
                      <p className="text-white/70 text-sm">Hosted by {session.host.name}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-white/60 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {session.participants.length}/{session.maxParticipants}
                        </span>
                        <span className="text-white/60 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.duration}min
                        </span>
                        <Badge 
                          className={session.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}
                        >
                          {session.status}
                        </Badge>
                        {session.isPublic && (
                          <Badge variant="outline" className="text-white border-white/30">
                            Public
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {session.participants.slice(0, 3).map((participant) => (
                        <Avatar key={participant.id} className="w-8 h-8 border-2 border-slate-900">
                          <AvatarFallback className="bg-blue-500 text-white text-xs">
                            {participant.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {session.participants.length > 3 && (
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center border-2 border-slate-900">
                          <span className="text-white text-xs">+{session.participants.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => handleJoinSession(session.id)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      {session.status === 'active' ? 'Join Now' : 'Join When Ready'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="scheduled" className="text-center py-12">
          <Clock className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-white text-xl font-semibold mb-2">No Scheduled Sessions</h3>
          <p className="text-white/60">Schedule a session to learn with others at a specific time</p>
        </TabsContent>

        <TabsContent value="recordings" className="text-center py-12">
          <Video className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-white text-xl font-semibold mb-2">Session Recordings</h3>
          <p className="text-white/60">Recorded sessions will appear here for later review</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
