
export interface GroupProject {
  id: string;
  title: string;
  description: string;
  algorithmIds: string[];
  instructorId: string;
  groups: ProjectGroup[];
  maxGroupSize: number;
  minGroupSize: number;
  deadline: Date;
  requirements: ProjectRequirement[];
  rubric: ProjectRubric[];
  status: 'draft' | 'active' | 'completed' | 'archived';
  createdAt: Date;
}

export interface ProjectGroup {
  id: string;
  name: string;
  members: GroupMember[];
  leaderId: string;
  workspace: import('./workspace').SharedWorkspace;
  submissions: ProjectSubmission[];
  progress: {
    completedTasks: string[];
    currentPhase: string;
    percentComplete: number;
  };
  communication: {
    chatMessages: GroupMessage[];
    meetingHistory: GroupMeeting[];
  };
}

export interface GroupMember {
  userId: string;
  username: string;
  role: 'leader' | 'developer' | 'reviewer' | 'presenter';
  contributions: {
    codeLines: number;
    commits: number;
    reviews: number;
    discussions: number;
  };
  availability: {
    timezone: string;
    preferredHours: string;
    weeklyCommitment: number;
  };
}

export interface GroupMessage {
  id: string;
  fromUserId: string;
  fromUsername: string;
  content: string;
  type: 'text' | 'code' | 'file' | 'link';
  timestamp: Date;
  isEdited: boolean;
  reactions: MessageReaction[];
}

export interface MessageReaction {
  emoji: string;
  userIds: string[];
}

export interface GroupMeeting {
  id: string;
  title: string;
  scheduledAt: Date;
  duration: number;
  attendees: string[];
  agenda: string[];
  notes: string;
  recordings?: string[];
}

export interface ProjectSubmission {
  id: string;
  groupId: string;
  title: string;
  description: string;
  files: SubmissionFile[];
  codeRepository: string;
  demoUrl?: string;
  submittedAt: Date;
  isLate: boolean;
  grade?: number;
  feedback?: string;
  peerReviews: import('./reviews').PeerReview[];
}

export interface SubmissionFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface ProjectRequirement {
  id: string;
  title: string;
  description: string;
  type: 'algorithm' | 'feature' | 'documentation' | 'presentation';
  isRequired: boolean;
  points: number;
}

export interface ProjectRubric {
  id: string;
  criteria: string;
  description: string;
  maxPoints: number;
  levels: RubricLevel[];
}

export interface RubricLevel {
  name: string;
  description: string;
  points: number;
}
