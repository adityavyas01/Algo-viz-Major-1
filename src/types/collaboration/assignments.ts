
export interface Assignment {
  id: string;
  title: string;
  description: string;
  algorithmIds: string[];
  instructorId: string;
  classroomId: string;
  type: 'individual' | 'group' | 'peer_review';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  dueDate: Date;
  createdAt: Date;
  isPublished: boolean;
  submissions: AssignmentSubmission[];
  rubric: import('./projects').ProjectRubric[];
  settings: {
    allowLateSubmission: boolean;
    enablePeerReview: boolean;
    maxAttempts: number;
    showSolutionAfter: boolean;
  };
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  code: string;
  explanation: string;
  submittedAt: Date;
  isLate: boolean;
  attempt: number;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'returned' | 'resubmitted';
}
