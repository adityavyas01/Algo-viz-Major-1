
export interface PeerReview {
  id: string;
  assignmentId: string;
  reviewerId: string;
  reviewerName: string;
  revieweeId: string;
  revieweeName: string;
  algorithmId: string;
  submissionId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  criteria: ReviewCriteria[];
  feedback: ReviewFeedback[];
  overallScore: number;
  createdAt: Date;
  submittedAt?: Date;
  dueDate: Date;
}

export interface ReviewCriteria {
  id: string;
  name: string;
  description: string;
  maxScore: number;
  weight: number;
}

export interface ReviewFeedback {
  criteriaId: string;
  score: number;
  comment: string;
  suggestions: string[];
  highlights: {
    lineStart: number;
    lineEnd: number;
    type: 'positive' | 'negative' | 'suggestion';
    comment: string;
  }[];
}
