import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  Share2, 
  Play, 
  Pause, 
  RotateCcw,
  Settings,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Screen,
  Copy,
  ExternalLink,
  UserPlus,
  Crown,
  Zap,
  Eye,
  EyeOff,
  Send,
  Smile
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MotionWrapper, MicroInteraction } from '@/components/motion/MotionWrapper';
import { useCollaboration, User, ChatMessage, CursorPosition } from '@/contexts/CollaborationContext';
import { Simple3DVisualization } from '@/components/Simple3DVisualization';

// Live Cursor Component
const LiveCursor = ({ cursor, user }: { cursor: CursorPosition; user: User | null }) => {
  if (!user) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{ left: cursor.x, top: cursor.y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2">
        <div 
          className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
          style={{ backgroundColor: user.color }}
        />
        <div 
          className="px-2 py-1 rounded text-xs text-white shadow-lg"
          style={{ backgroundColor: user.color }}
        >
          {user.name}
        </div>
      </div>
    </motion.div>
  );
};

// User Avatar Component
const UserAvatar = ({ user, isOwner = false }: { user: User; isOwner?: boolean }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative">
          <Avatar className="w-8 h-8 border-2" style={{ borderColor: user.color }}>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback style={{ backgroundColor: user.color + '20', color: user.color }}>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isOwner && (
            <Crown className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 fill-current" />
          )}
          <div 
            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
              user.isOnline ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{user.name} {isOwner && '(Owner)'}</p>
        <p className="text-xs text-muted-foreground">
          {user.isOnline ? 'Online' : `Last seen ${new Date(user.lastSeen).toLocaleTimeString()}`}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// Chat Message Component
const ChatMessageComponent = ({ message, user }: { message: ChatMessage; user: User | null }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex gap-3 p-2 rounded-lg ${
      message.type === 'system' 
        ? 'bg-blue-500/10 text-blue-400 justify-center' 
        : message.userId === 'current' 
          ? 'bg-cyan-500/10' 
          : 'bg-white/5'
    }`}
  >
    {message.type !== 'system' && user && (
      <Avatar className="w-6 h-6 flex-shrink-0">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback style={{ backgroundColor: user.color + '20', color: user.color, fontSize: '0.7rem' }}>
          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </AvatarFallback>
      </Avatar>
    )}
    <div className="flex-1 min-w-0">
      {message.type !== 'system' && (
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white text-sm font-medium">{message.userName}</span>
          <span className="text-white/40 text-xs">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      )}
      <p className={`text-sm ${message.type === 'system' ? 'text-center' : 'text-white/80'}`}>
        {message.message}
      </p>
    </div>
  </motion.div>
);

// Main Real-time Collaborative Session Component
export const RealTimeCollaboration: React.FC = () => {
  const {
    currentSession,
    connectedUsers,
    userCursors,
    messages,
    sendMessage,
    updateCursorPosition,
    leaveSession,
    executeAlgorithmAction,
    syncAlgorithmStep,
    getUserById,
    isConnected,
    connectionStatus
  } = useCollaboration();

  const [chatMessage, setChatMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showChat, setShowChat] = useState(true);
  const [showUsers, setShowUsers] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(true);

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const sessionContainerRef = useRef<HTMLDivElement>(null);

  // Track mouse movement for live cursors
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (currentSession && sessionContainerRef.current) {
      const rect = sessionContainerRef.current.getBoundingClientRect();
      updateCursorPosition(e.clientX - rect.left, e.clientY - rect.top);
    }
  }, [currentSession, updateCursorPosition]);

  useEffect(() => {
    if (currentSession) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [currentSession, handleMouseMove]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      sendMessage(chatMessage.trim());
      setChatMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    executeAlgorithmAction('playback_toggle', { isPlaying: !isPlaying });
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    syncAlgorithmStep(0);
    executeAlgorithmAction('algorithm_reset', { step: 0 });
  };

  const handleStepChange = (newStep: number) => {
    setCurrentStep(newStep);
    syncAlgorithmStep(newStep);
  };

  const copySessionLink = () => {
    if (currentSession) {
      const link = `${window.location.origin}/collaborate/${currentSession.id}`;
      navigator.clipboard.writeText(link);
      // You could show a toast notification here
    }
  };

  if (!currentSession) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Users className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">No Active Session</h3>
          <p className="text-white/60">Join or create a collaboration session to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={sessionContainerRef}
      className="h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 flex flex-col relative overflow-hidden"
    >
      {/* Live Cursors */}
      <AnimatePresence>
        {userCursors
          .filter(cursor => cursor.userId !== 'current')
          .map(cursor => (
            <LiveCursor 
              key={cursor.userId} 
              cursor={cursor} 
              user={getUserById(cursor.userId)} 
            />
          ))
        }
      </AnimatePresence>

      {/* Header */}
      <MotionWrapper variant="fadeInUp" delay={0.1}>
        <div className="p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-white text-xl font-bold">{currentSession.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-500/20 text-green-400">
                    {currentSession.algorithm.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Badge>
                  <div className={`flex items-center gap-1 text-sm ${
                    connectionStatus === 'connected' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      connectionStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Playback Controls */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg">
                <MicroInteraction type="button">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePlayPause}
                    className={isPlaying ? "text-green-400" : "text-white/70"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </MicroInteraction>
                <MicroInteraction type="button">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-white/70"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </MicroInteraction>
                <Separator orientation="vertical" className="h-4 bg-white/20" />
                <span className="text-white/60 text-sm">Step: {currentStep + 1}</span>
              </div>

              {/* Audio/Video Controls */}
              <div className="flex items-center gap-1 px-3 py-2 bg-white/5 rounded-lg">
                <MicroInteraction type="button">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className={isMuted ? "text-red-400" : "text-green-400"}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </MicroInteraction>
                <MicroInteraction type="button">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={isVideoOff ? "text-red-400" : "text-green-400"}
                  >
                    {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                  </Button>
                </MicroInteraction>
              </div>

              {/* Session Actions */}
              <div className="flex items-center gap-1">
                <MicroInteraction type="button">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copySessionLink}
                    className="text-white/70"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </MicroInteraction>
                <MicroInteraction type="button">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUsers(!showUsers)}
                    className="text-white/70"
                  >
                    {showUsers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </MicroInteraction>
                <MicroInteraction type="button">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowChat(!showChat)}
                    className="text-white/70"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </MicroInteraction>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={leaveSession}
                >
                  Leave
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MotionWrapper>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Algorithm Visualization */}
        <div className="flex-1 relative">
          <Simple3DVisualization />
          
          {/* Floating Step Indicator */}
          <div className="absolute bottom-4 left-4 z-10">
            <Card className="bg-black/60 border-white/20">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="text-white text-sm">
                    Step: <span className="font-bold text-cyan-400">{currentStep + 1}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4 bg-white/20" />
                  <div className="text-white/60 text-sm">
                    Sync: {isConnected ? 'Live' : 'Offline'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Sidebar */}
        <AnimatePresence>
          {(showUsers || showChat) && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-md border-l border-white/10 flex flex-col overflow-hidden"
            >
              {/* Users Panel */}
              {showUsers && (
                <MotionWrapper variant="fadeInUp" delay={0.2}>
                  <Card className="bg-transparent border-0 border-b border-white/10 rounded-none">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Participants ({connectedUsers.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                      {connectedUsers.map((user) => (
                        <div key={user.id} className="flex items-center gap-3">
                          <UserAvatar 
                            user={user} 
                            isOwner={user.id === currentSession.createdBy} 
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {user.name}
                            </p>
                            <p className="text-white/60 text-xs truncate">
                              {user.isOnline ? 'Online' : `Last seen ${new Date(user.lastSeen).toLocaleTimeString()}`}
                            </p>
                          </div>
                          {user.id === 'current' && (
                            <Badge className="bg-cyan-500/20 text-cyan-400 text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </MotionWrapper>
              )}

              {/* Chat Panel */}
              {showChat && (
                <MotionWrapper variant="fadeInUp" delay={0.3} className="flex-1 flex flex-col min-h-0">
                  <Card className="bg-transparent border-0 flex-1 flex flex-col rounded-none min-h-0">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-sm flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Chat
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col p-4 pt-0 min-h-0">
                      <ScrollArea className="flex-1 -mr-4 pr-4" ref={chatScrollRef}>
                        <div className="space-y-3">
                          {messages.map((message) => (
                            <ChatMessageComponent
                              key={message.id}
                              message={message}
                              user={message.type !== 'system' ? getUserById(message.userId) : null}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                      
                      <div className="mt-4 space-y-2">
                        <Textarea
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder="Type a message..."
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
                          rows={2}
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={handleSendMessage}
                            disabled={!chatMessage.trim()}
                            size="sm"
                            className="bg-cyan-600 hover:bg-cyan-700 flex-1"
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Send
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/60 hover:text-white"
                          >
                            <Smile className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </MotionWrapper>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RealTimeCollaboration;