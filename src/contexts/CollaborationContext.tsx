import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

// Types for collaboration
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  color: string;
  isOnline: boolean;
  lastSeen: string;
}

export interface CursorPosition {
  userId: string;
  x: number;
  y: number;
  timestamp: number;
}

export interface CollaborationSession {
  id: string;
  name: string;
  algorithm: string;
  createdBy: string;
  createdAt: string;
  participants: User[];
  isActive: boolean;
  currentStep: number;
  sharedState: any;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'system' | 'algorithm_action';
}

export interface AlgorithmAction {
  id: string;
  userId: string;
  action: string;
  data: any;
  timestamp: string;
  step: number;
}

interface CollaborationContextType {
  // Connection state
  socket: Socket | null;
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  
  // Session management
  currentSession: CollaborationSession | null;
  availableSessions: CollaborationSession[];
  createSession: (name: string, algorithm: string) => Promise<string>;
  joinSession: (sessionId: string) => Promise<boolean>;
  leaveSession: () => void;
  
  // User presence
  connectedUsers: User[];
  userCursors: CursorPosition[];
  updateCursorPosition: (x: number, y: number) => void;
  
  // Real-time messaging
  messages: ChatMessage[];
  sendMessage: (message: string) => void;
  
  // Algorithm synchronization
  algorithmState: any;
  algorithmActions: AlgorithmAction[];
  executeAlgorithmAction: (action: string, data: any) => void;
  syncAlgorithmStep: (step: number) => void;
  
  // Code collaboration
  sharedCode: string;
  updateSharedCode: (code: string) => void;
  
  // Utility functions
  getUserById: (userId: string) => User | null;
  isUserTyping: (userId: string) => boolean;
}

const CollaborationContext = createContext<CollaborationContextType | null>(null);

// Mock WebSocket - disabled in production until real server is deployed
const WEBSOCKET_URL = process.env.NODE_ENV === 'production' 
  ? null  // Disable WebSocket in production (no server deployed yet)
  : 'ws://localhost:3001'; // Mock server for development

export const CollaborationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  
  const [currentSession, setCurrentSession] = useState<CollaborationSession | null>(null);
  const [availableSessions, setAvailableSessions] = useState<CollaborationSession[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [userCursors, setUserCursors] = useState<CursorPosition[]>([]);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [algorithmState, setAlgorithmState] = useState<any>({});
  const [algorithmActions, setAlgorithmActions] = useState<AlgorithmAction[]>([]);
  const [sharedCode, setSharedCode] = useState<string>('');
  
  const cursorsRef = useRef<{ [userId: string]: CursorPosition }>({});
  const typingUsersRef = useRef<Set<string>>(new Set());

  // Initialize WebSocket connection
  useEffect(() => {
    // DISABLED: WebSocket completely disabled until backend server is deployed
    setConnectionStatus('disconnected');
    return;

    // For development, we'll simulate WebSocket behavior
    // In production, you would connect to your actual WebSocket server
    /* eslint-disable no-unreachable */
    if (process.env.NODE_ENV === 'development') {
      // Simulate connection for development
      setConnectionStatus('connecting');
      
      setTimeout(() => {
        setIsConnected(true);
        setConnectionStatus('connected');
        
        // Add mock users
        setConnectedUsers([
          {
            id: 'user1',
            name: 'Alice Johnson',
            email: 'alice@example.com',
            color: '#06b6d4',
            isOnline: true,
            lastSeen: new Date().toISOString()
          },
          {
            id: 'user2',
            name: 'Bob Smith',
            email: 'bob@example.com',
            color: '#8b5cf6',
            isOnline: true,
            lastSeen: new Date().toISOString()
          },
          {
            id: 'current',
            name: 'You',
            email: 'you@example.com',
            color: '#10b981',
            isOnline: true,
            lastSeen: new Date().toISOString()
          }
        ]);

        // Add mock sessions
        setAvailableSessions([
          {
            id: 'session1',
            name: 'Binary Search Tree Learning',
            algorithm: 'binary-search-tree',
            createdBy: 'user1',
            createdAt: new Date().toISOString(),
            participants: [],
            isActive: true,
            currentStep: 0,
            sharedState: {}
          },
          {
            id: 'session2',
            name: 'Sorting Algorithms Study',
            algorithm: 'quicksort',
            createdBy: 'user2',
            createdAt: new Date().toISOString(),
            participants: [],
            isActive: true,
            currentStep: 0,
            sharedState: {}
          }
        ]);
      }, 1000);

      return;
    }

    // Production WebSocket connection
    try {
      const socketInstance = io(WEBSOCKET_URL, {
        transports: ['websocket'],
        upgrade: true,
        autoConnect: true,
      });

      setSocket(socketInstance);
      setConnectionStatus('connecting');

      socketInstance.on('connect', () => {
        setIsConnected(true);
        setConnectionStatus('connected');
        console.log('Connected to collaboration server');
      });

      socketInstance.on('disconnect', () => {
        setIsConnected(false);
        setConnectionStatus('disconnected');
        console.log('Disconnected from collaboration server');
      });

      socketInstance.on('error', (error) => {
        setConnectionStatus('error');
        console.error('WebSocket error:', error);
      });

      // Listen for user events
      socketInstance.on('user_joined', (user: User) => {
        setConnectedUsers(prev => [...prev.filter(u => u.id !== user.id), user]);
      });

      socketInstance.on('user_left', (userId: string) => {
        setConnectedUsers(prev => prev.filter(u => u.id !== userId));
      });

      socketInstance.on('cursor_update', (cursor: CursorPosition) => {
        setUserCursors(prev => [...prev.filter(c => c.userId !== cursor.userId), cursor]);
      });

      // Listen for chat messages
      socketInstance.on('message', (message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
      });

      // Listen for algorithm actions
      socketInstance.on('algorithm_action', (action: AlgorithmAction) => {
        setAlgorithmActions(prev => [...prev, action]);
        setAlgorithmState(prev => ({ ...prev, ...action.data }));
      });

      // Listen for code updates
      socketInstance.on('code_update', (code: string) => {
        setSharedCode(code);
      });

      return () => {
        socketInstance.disconnect();
      };
    } catch (error) {
      setConnectionStatus('error');
      console.error('Failed to initialize WebSocket:', error);
    }
  }, []);

  const createSession = useCallback(async (name: string, algorithm: string): Promise<string> => {
    const sessionId = `session_${Date.now()}`;
    
    const newSession: CollaborationSession = {
      id: sessionId,
      name,
      algorithm,
      createdBy: 'current',
      createdAt: new Date().toISOString(),
      participants: [],
      isActive: true,
      currentStep: 0,
      sharedState: {}
    };

    if (socket?.connected) {
      socket.emit('create_session', newSession);
    } else {
      // Mock implementation for development
      setAvailableSessions(prev => [...prev, newSession]);
      setCurrentSession(newSession);
    }

    return sessionId;
  }, [socket]);

  const joinSession = useCallback(async (sessionId: string): Promise<boolean> => {
    const session = availableSessions.find(s => s.id === sessionId);
    if (!session) return false;

    if (socket?.connected) {
      socket.emit('join_session', sessionId);
    } else {
      // Mock implementation for development
      setCurrentSession(session);
      
      // Add a system message
      const systemMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        userId: 'system',
        userName: 'System',
        message: 'You joined the collaboration session',
        timestamp: new Date().toISOString(),
        type: 'system'
      };
      setMessages(prev => [...prev, systemMessage]);
    }

    return true;
  }, [socket, availableSessions]);

  const leaveSession = useCallback(() => {
    if (socket?.connected && currentSession) {
      socket.emit('leave_session', currentSession.id);
    }
    
    setCurrentSession(null);
    setMessages([]);
    setAlgorithmActions([]);
    setUserCursors([]);
  }, [socket, currentSession]);

  const updateCursorPosition = useCallback((x: number, y: number) => {
    const cursor: CursorPosition = {
      userId: 'current',
      x,
      y,
      timestamp: Date.now()
    };

    if (socket?.connected && currentSession) {
      socket.emit('cursor_move', cursor);
    } else {
      // Mock implementation for development
      setUserCursors(prev => [...prev.filter(c => c.userId !== 'current'), cursor]);
    }
  }, [socket, currentSession]);

  const sendMessage = useCallback((message: string) => {
    if (!currentSession) return;

    const chatMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      userId: 'current',
      userName: 'You',
      message,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    if (socket?.connected) {
      socket.emit('send_message', chatMessage);
    } else {
      // Mock implementation for development
      setMessages(prev => [...prev, chatMessage]);
    }
  }, [socket, currentSession]);

  const executeAlgorithmAction = useCallback((action: string, data: any) => {
    if (!currentSession) return;

    const algorithmAction: AlgorithmAction = {
      id: `action_${Date.now()}`,
      userId: 'current',
      action,
      data,
      timestamp: new Date().toISOString(),
      step: algorithmActions.length
    };

    if (socket?.connected) {
      socket.emit('algorithm_action', algorithmAction);
    } else {
      // Mock implementation for development
      setAlgorithmActions(prev => [...prev, algorithmAction]);
      setAlgorithmState(prev => ({ ...prev, ...data }));
    }
  }, [socket, currentSession, algorithmActions.length]);

  const syncAlgorithmStep = useCallback((step: number) => {
    if (!currentSession) return;

    if (socket?.connected) {
      socket.emit('sync_step', { sessionId: currentSession.id, step });
    } else {
      // Mock implementation for development
      setCurrentSession(prev => prev ? { ...prev, currentStep: step } : null);
    }
  }, [socket, currentSession]);

  const updateSharedCode = useCallback((code: string) => {
    if (!currentSession) return;

    if (socket?.connected) {
      socket.emit('update_code', { sessionId: currentSession.id, code });
    } else {
      // Mock implementation for development
      setSharedCode(code);
    }
  }, [socket, currentSession]);

  const getUserById = useCallback((userId: string): User | null => {
    return connectedUsers.find(user => user.id === userId) || null;
  }, [connectedUsers]);

  const isUserTyping = useCallback((userId: string): boolean => {
    return typingUsersRef.current.has(userId);
  }, []);

  const contextValue: CollaborationContextType = {
    socket,
    isConnected,
    connectionStatus,
    currentSession,
    availableSessions,
    createSession,
    joinSession,
    leaveSession,
    connectedUsers,
    userCursors,
    updateCursorPosition,
    messages,
    sendMessage,
    algorithmState,
    algorithmActions,
    executeAlgorithmAction,
    syncAlgorithmStep,
    sharedCode,
    updateSharedCode,
    getUserById,
    isUserTyping,
  };

  return (
    <CollaborationContext.Provider value={contextValue}>
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};

export default CollaborationProvider;