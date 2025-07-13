
export interface CollaborativeSession {
  id: string;
  name: string;
  description: string;
  algorithmId: string;
  ownerId: string;
  ownerName: string;
  participants: SessionParticipant[];
  maxParticipants: number;
  isActive: boolean;
  isPublic: boolean;
  createdAt: Date;
  startedAt?: Date;
  endedAt?: Date;
  sessionType: 'study_group' | 'classroom' | 'peer_review' | 'project';
  currentStep: number;
  sharedState: any;
}

export interface SessionParticipant {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  role: 'owner' | 'instructor' | 'student' | 'peer_reviewer';
  isOnline: boolean;
  cursor?: {
    x: number;
    y: number;
    color: string;
  };
  permissions: {
    canEdit: boolean;
    canControl: boolean;
    canSpeak: boolean;
    canShare: boolean;
  };
  joinedAt: Date;
  lastActive: Date;
}
