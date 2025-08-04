export type ChallengeType = "coding" | "mcq";
export type ChallengeDifficulty = "easy" | "medium" | "hard";
export type ChallengeStatus =
  | "in_progress"
  | "completed"
  | "failed"
  | "timeout";
export type AdminRole = "super_admin" | "challenge_admin" | "content_admin";

export interface TestCase {
  input: string;
  expected: string;
}

export interface MCQQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: ChallengeType;
  difficulty: ChallengeDifficulty;
  points: number;
  time_limit: number; // seconds
  topic_id?: string;
  problem_statement?: string;
  sample_input?: string;
  sample_output?: string;
  test_cases?: TestCase[];
  mcq_questions?: MCQQuestion[];
  solution?: string;
  hints?: string[];
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface UserChallengeAttempt {
  id: string;
  user_id: string;
  challenge_id: string;
  status: ChallengeStatus;
  score: number;
  time_taken?: number; // seconds
  submission_code?: string;
  mcq_answers?: Record<string, number>; // question_id -> selected_option_index
  started_at: string;
  completed_at?: string;
  created_at: string;
  challenge?: Challenge; // Joined data
}

export interface DailyChallenge {
  id: string;
  challenge_id: string;
  challenge_date: string;
  expires_at: string;
  is_active: boolean;
  created_at: string;
  challenge?: Challenge; // Joined data
}

export interface AdminRoleRecord {
  id: string;
  user_id: string;
  role: AdminRole;
  created_by?: string;
  created_at: string;
}

export interface ChallengeFilters {
  difficulty?: ChallengeDifficulty;
  type?: ChallengeType;
  topic_id?: string;
  is_active?: boolean;
}

export interface ChallengeSubmission {
  challenge_id: string;
  submission_code?: string;
  mcq_answers?: Record<string, number>;
}

export interface ChallengeResult {
  success: boolean;
  score: number;
  time_taken: number;
  test_results?: TestResult[];
  feedback?: string;
}

export interface TestResult {
  test_case: TestCase;
  passed: boolean;
  actual_output?: string;
  error?: string;
}

export interface DailyChallengeStats {
  total_attempts: number;
  completed_attempts: number;
  average_score: number;
  top_performers: Array<{
    user_id: string;
    score: number;
    time_taken: number;
  }>;
}
