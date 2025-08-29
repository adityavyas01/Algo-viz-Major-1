export interface AdminRole {
  id: string;
  user_id: string;
  role: 'super_admin' | 'tournament_admin' | 'content_admin' | 'moderator';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Tournament {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  max_participants: number;
  entry_fee: number;
  prize_pool: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  requires_camera: boolean;
  requires_screen_recording: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TournamentParticipant {
  id: string;
  tournament_id: string;
  user_id: string;
  registered_at: string;
  final_score: number;
  final_rank?: number;
  submission_time?: string;
  proctoring_violations: any[];
}

export interface TournamentChallenge {
  id: string;
  tournament_id: string;
  challenge_id: string;
  challenge_order: number;
  points_multiplier: number;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  action_url?: string;
  created_at: string;
}

export interface ProctoringSession {
  id: string;
  tournament_id: string;
  user_id: string;
  session_start: string;
  session_end?: string;
  camera_enabled: boolean;
  screen_recording_enabled: boolean;
  tab_switches: number;
  copy_paste_attempts: number;
  suspicious_activities: any[];
  warnings_issued: number;
  session_terminated: boolean;
}

export interface AdminStats {
  totalUsers: number;
  totalTournaments: number;
  activeTournaments: number;
  totalChallenges: number;
  recentSignups: number;
  averageScore: number;
}
