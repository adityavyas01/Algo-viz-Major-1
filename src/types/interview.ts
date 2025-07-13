
export interface InterviewQuestion {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Array' | 'String' | 'Tree' | 'Graph' | 'Dynamic Programming' | 'System Design' | 'Behavioral';
  companies: string[];
  frequency: number;
  timeLimit: number; // in minutes
  hints: string[];
  solution: {
    approach: string;
    code: string;
    timeComplexity: string;
    spaceComplexity: string;
  };
  followUpQuestions?: string[];
  tags: string[];
}

export interface MockInterview {
  id: string;
  type: 'technical' | 'behavioral' | 'system-design';
  difficulty: 'Entry' | 'Mid' | 'Senior' | 'Staff';
  duration: number;
  questions: InterviewQuestion[];
  startTime: Date;
  endTime?: Date;
  responses: InterviewResponse[];
  score?: number;
  feedback?: string;
}

export interface InterviewResponse {
  questionId: string;
  response: string;
  timeSpent: number;
  codeSubmitted?: string;
  isCorrect?: boolean;
}

export interface CompanyTrack {
  id: string;
  company: string;
  logo: string;
  difficulty: string;
  totalQuestions: number;
  completedQuestions: number;
  categories: string[];
  estimatedTime: string;
  recentQuestions: InterviewQuestion[];
}

export interface InterviewStats {
  totalInterviews: number;
  averageScore: number;
  strengthAreas: string[];
  improvementAreas: string[];
  timeSpentPracticing: number;
  questionsAttempted: number;
  successRate: number;
  categoryBreakdown: {
    category: string;
    attempted: number;
    correct: number;
    averageTime: number;
  }[];
}

export interface WhiteboardSession {
  id: string;
  questionId: string;
  canvas: string; // serialized canvas data
  code: string;
  explanation: string;
  timestamp: Date;
}
