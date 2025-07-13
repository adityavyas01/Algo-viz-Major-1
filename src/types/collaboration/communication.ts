
export interface VoiceChatRoom {
  id: string;
  sessionId: string;
  isActive: boolean;
  participants: VoiceParticipant[];
  settings: {
    isMuted: boolean;
    isRecording: boolean;
    quality: 'low' | 'medium' | 'high';
  };
}

export interface VoiceParticipant {
  userId: string;
  username: string;
  isMuted: boolean;
  isSpeaking: boolean;
  volume: number;
  permissions: {
    canSpeak: boolean;
    canMute: boolean;
    canKick: boolean;
  };
}

export interface VideoChatRoom {
  id: string;
  sessionId: string;
  isActive: boolean;
  participants: VideoParticipant[];
  layout: 'grid' | 'spotlight' | 'sidebar';
  settings: {
    quality: 'low' | 'medium' | 'high';
    isRecording: boolean;
    hasScreenShare: boolean;
  };
}

export interface VideoParticipant {
  userId: string;
  username: string;
  hasVideo: boolean;
  isScreenSharing: boolean;
  videoStream?: MediaStream;
  permissions: {
    canVideo: boolean;
    canScreenShare: boolean;
    canRecord: boolean;
  };
}

export interface FeedbackSystem {
  id: string;
  sessionId: string;
  feedback: SessionFeedback[];
  anonymousEnabled: boolean;
  realTimeEnabled: boolean;
}

export interface SessionFeedback {
  id: string;
  fromUserId: string;
  toUserId?: string;
  type: 'question' | 'suggestion' | 'praise' | 'concern' | 'help_request';
  content: string;
  isAnonymous: boolean;
  timestamp: Date;
  isResolved: boolean;
  responses: FeedbackResponse[];
}

export interface FeedbackResponse {
  id: string;
  fromUserId: string;
  content: string;
  timestamp: Date;
}
