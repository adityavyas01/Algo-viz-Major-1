import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface CollaborativeSession {
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

export const mockSessions: CollaborativeSession[] = [
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

export function useCollaborationSession() {
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
    setIsVideoEnabled(prev => {
      const next = !prev;
      toast({
        title: next ? "Video Enabled" : "Video Disabled",
        description: `Your camera is now ${next ? 'on' : 'off'}`,
      });
      return next;
    });
  };

  const toggleAudio = () => {
    setIsAudioEnabled(prev => {
      const next = !prev;
      toast({
        title: next ? "Microphone Unmuted" : "Microphone Muted",
        description: `Your microphone is now ${next ? 'unmuted' : 'muted'}`,
      });
      return next;
    });
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(prev => {
      const next = !prev;
      toast({
        title: next ? "Screen Share Started" : "Screen Share Stopped",
        description: `Screen sharing is now ${next ? 'enabled' : 'disabled'}`,
      });
      return next;
    });
  };

  return {
    activeSession,
    isVideoEnabled,
    isAudioEnabled,
    isScreenSharing,
    handleJoinSession,
    handleLeaveSession,
    handleCreateSession,
    toggleVideo,
    toggleAudio,
    toggleScreenShare
  };
}
