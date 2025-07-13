
export interface InstructorDashboard {
  id: string;
  instructorId: string;
  classrooms: Classroom[];
  activeSessions: import('./sessions').CollaborativeSession[];
  assignments: import('./assignments').Assignment[];
  analytics: ClassroomAnalytics;
}

export interface Classroom {
  id: string;
  name: string;
  description: string;
  instructorId: string;
  students: ClassroomStudent[];
  maxStudents: number;
  isActive: boolean;
  schedule: ClassSchedule[];
  createdAt: Date;
  settings: {
    allowStudentControl: boolean;
    requireApproval: boolean;
    enableVoiceChat: boolean;
    enableVideoChat: boolean;
  };
}

export interface ClassroomStudent {
  userId: string;
  username: string;
  email: string;
  avatar?: string;
  joinedAt: Date;
  lastActive: Date;
  progress: {
    completedAlgorithms: string[];
    currentLevel: number;
    totalPoints: number;
    averageScore: number;
  };
  permissions: {
    canEdit: boolean;
    canControl: boolean;
    canSpeak: boolean;
    canShare: boolean;
  };
}

export interface ClassSchedule {
  id: string;
  title: string;
  description: string;
  algorithmId?: string;
  startTime: Date;
  endTime: Date;
  isRecurring: boolean;
  recurrencePattern?: string;
}

export interface ClassroomAnalytics {
  totalStudents: number;
  activeStudents: number;
  averageProgress: number;
  completionRates: { [algorithmId: string]: number };
  engagementMetrics: {
    averageSessionTime: number;
    questionsPerSession: number;
    collaborationScore: number;
  };
  performanceData: {
    averageScore: number;
    improvementRate: number;
    strugglingStudents: string[];
  };
}
