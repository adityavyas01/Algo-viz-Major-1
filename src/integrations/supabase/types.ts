export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_roles: {
        Row: {
          created_at: string
          created_by: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          title: string
          type?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      proctoring_sessions: {
        Row: {
          camera_enabled: boolean
          copy_paste_attempts: number
          id: string
          screen_recording_enabled: boolean
          session_end: string | null
          session_start: string
          session_terminated: boolean
          suspicious_activities: Json
          tab_switches: number
          tournament_id: string
          user_id: string
          warnings_issued: number
        }
        Insert: {
          camera_enabled?: boolean
          copy_paste_attempts?: number
          id?: string
          screen_recording_enabled?: boolean
          session_end?: string | null
          session_start?: string
          session_terminated?: boolean
          suspicious_activities?: Json
          tab_switches?: number
          tournament_id: string
          user_id: string
          warnings_issued?: number
        }
        Update: {
          camera_enabled?: boolean
          copy_paste_attempts?: number
          id?: string
          screen_recording_enabled?: boolean
          session_end?: string | null
          session_start?: string
          session_terminated?: boolean
          suspicious_activities?: Json
          tab_switches?: number
          tournament_id?: string
          user_id?: string
          warnings_issued?: number
        }
        Relationships: [
          {
            foreignKeyName: "proctoring_sessions_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_challenges: {
        Row: {
          challenge_id: string
          challenge_order: number
          id: string
          points_multiplier: number
          tournament_id: string
        }
        Insert: {
          challenge_id: string
          challenge_order: number
          id?: string
          points_multiplier?: number
          tournament_id: string
        }
        Update: {
          challenge_id?: string
          challenge_order?: number
          id?: string
          points_multiplier?: number
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_challenges_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_participants: {
        Row: {
          final_rank: number | null
          final_score: number
          id: string
          proctoring_violations: Json
          registered_at: string
          submission_time: string | null
          tournament_id: string
          user_id: string
        }
        Insert: {
          final_rank?: number | null
          final_score?: number
          id?: string
          proctoring_violations?: Json
          registered_at?: string
          submission_time?: string | null
          tournament_id: string
          user_id: string
        }
        Update: {
          final_rank?: number | null
          final_score?: number
          id?: string
          proctoring_violations?: Json
          registered_at?: string
          submission_time?: string | null
          tournament_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_participants_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end_time: string
          entry_fee: number
          id: string
          max_participants: number
          prize_pool: number
          requires_camera: boolean
          requires_screen_recording: boolean
          start_time: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          end_time: string
          entry_fee?: number
          id?: string
          max_participants?: number
          prize_pool?: number
          requires_camera?: boolean
          requires_screen_recording?: boolean
          start_time: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end_time?: string
          entry_fee?: number
          id?: string
          max_participants?: number
          prize_pool?: number
          requires_camera?: boolean
          requires_screen_recording?: boolean
          start_time?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      challenges: {
        Row: {
          challenge_type: string
          created_at: string
          created_by: string
          description: string
          difficulty: string
          hints: string[] | null
          id: string
          is_active: boolean
          mcq_questions: Json | null
          points: number
          problem_statement: string | null
          sample_input: string | null
          sample_output: string | null
          solution: string | null
          test_cases: Json | null
          time_limit: number
          title: string
          topic_id: string | null
          updated_at: string
        }
        Insert: {
          challenge_type: string
          created_at?: string
          created_by: string
          description: string
          difficulty: string
          hints?: string[] | null
          id?: string
          is_active?: boolean
          mcq_questions?: Json | null
          points?: number
          problem_statement?: string | null
          sample_input?: string | null
          sample_output?: string | null
          solution?: string | null
          test_cases?: Json | null
          time_limit?: number
          title: string
          topic_id?: string | null
          updated_at?: string
        }
        Update: {
          challenge_type?: string
          created_at?: string
          created_by?: string
          description?: string
          difficulty?: string
          hints?: string[] | null
          id?: string
          is_active?: boolean
          mcq_questions?: Json | null
          points?: number
          problem_statement?: string | null
          sample_input?: string | null
          sample_output?: string | null
          solution?: string | null
          test_cases?: Json | null
          time_limit?: number
          title?: string
          topic_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenges_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "dsa_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_challenges: {
        Row: {
          challenge_date: string
          challenge_id: string
          created_at: string
          expires_at: string
          id: string
          is_active: boolean
        }
        Insert: {
          challenge_date?: string
          challenge_id: string
          created_at?: string
          expires_at?: string
          id?: string
          is_active?: boolean
        }
        Update: {
          challenge_date?: string
          challenge_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          is_active?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "daily_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      dsa_topics: {
        Row: {
          category: string
          created_at: string
          description: string | null
          difficulty_level: number
          id: string
          name: string
          prerequisites: string[] | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          difficulty_level?: number
          id?: string
          name: string
          prerequisites?: string[] | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          difficulty_level?: number
          id?: string
          name?: string
          prerequisites?: string[] | null
        }
        Relationships: []
      }
      learning_path_modules: {
        Row: {
          created_at: string
          estimated_hours: number
          id: string
          is_completed: boolean
          is_unlocked: boolean
          module_order: number
          path_id: string
          topic_id: string
          unlock_conditions: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          estimated_hours?: number
          id?: string
          is_completed?: boolean
          is_unlocked?: boolean
          module_order: number
          path_id: string
          topic_id: string
          unlock_conditions?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          estimated_hours?: number
          id?: string
          is_completed?: boolean
          is_unlocked?: boolean
          module_order?: number
          path_id?: string
          topic_id?: string
          unlock_conditions?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_modules_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_path_modules_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "dsa_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          completion_percentage: number
          created_at: string
          description: string | null
          difficulty_progression: string
          estimated_weeks: number
          id: string
          is_active: boolean
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completion_percentage?: number
          created_at?: string
          description?: string | null
          difficulty_progression?: string
          estimated_weeks?: number
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completion_percentage?: number
          created_at?: string
          description?: string | null
          difficulty_progression?: string
          estimated_weeks?: number
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      leetcode_questions: {
        Row: {
          created_at: string
          description: string | null
          difficulty: string
          difficulty_level: number
          hints: string[] | null
          id: string
          leetcode_url: string
          problem_number: number | null
          solution: string | null
          space_complexity: string | null
          tags: string[] | null
          time_complexity: string | null
          title: string
          topic_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty: string
          difficulty_level: number
          hints?: string[] | null
          id?: string
          leetcode_url: string
          problem_number?: number | null
          solution?: string | null
          space_complexity?: string | null
          tags?: string[] | null
          time_complexity?: string | null
          title: string
          topic_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: string
          difficulty_level?: number
          hints?: string[] | null
          id?: string
          leetcode_url?: string
          problem_number?: number | null
          solution?: string | null
          space_complexity?: string | null
          tags?: string[] | null
          time_complexity?: string | null
          title?: string
          topic_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leetcode_questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "dsa_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_assessments: {
        Row: {
          available_hours_per_week: number
          completed_at: string
          created_at: string
          id: string
          learning_style: Database["public"]["Enums"]["learning_style"]
          math_comfort_level: number
          preferred_difficulty_progression: string
          primary_goal: Database["public"]["Enums"]["learning_goal"]
          prior_programming_experience: number
          target_timeline_months: number
          updated_at: string
          user_id: string
        }
        Insert: {
          available_hours_per_week?: number
          completed_at?: string
          created_at?: string
          id?: string
          learning_style: Database["public"]["Enums"]["learning_style"]
          math_comfort_level?: number
          preferred_difficulty_progression?: string
          primary_goal: Database["public"]["Enums"]["learning_goal"]
          prior_programming_experience?: number
          target_timeline_months?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          available_hours_per_week?: number
          completed_at?: string
          created_at?: string
          id?: string
          learning_style?: Database["public"]["Enums"]["learning_style"]
          math_comfort_level?: number
          preferred_difficulty_progression?: string
          primary_goal?: Database["public"]["Enums"]["learning_goal"]
          prior_programming_experience?: number
          target_timeline_months?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_challenge_attempts: {
        Row: {
          challenge_id: string
          completed_at: string | null
          created_at: string
          id: string
          mcq_answers: Json | null
          score: number | null
          started_at: string
          status: string
          submission_code: string | null
          time_taken: number | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          mcq_answers?: Json | null
          score?: number | null
          started_at?: string
          status: string
          submission_code?: string | null
          time_taken?: number | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          mcq_answers?: Json | null
          score?: number | null
          started_at?: string
          status?: string
          submission_code?: string | null
          time_taken?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenge_attempts_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          algorithms_completed: number
          challenges_completed: number
          created_at: string
          current_streak: number
          experience: number
          id: string
          level: number
          rank: number
          total_points: number
          total_study_time: number
          updated_at: string
          user_id: string
        }
        Insert: {
          algorithms_completed?: number
          challenges_completed?: number
          created_at?: string
          current_streak?: number
          experience?: number
          id?: string
          level?: number
          rank?: number
          total_points?: number
          total_study_time?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          algorithms_completed?: number
          challenges_completed?: number
          created_at?: string
          current_streak?: number
          experience?: number
          id?: string
          level?: number
          rank?: number
          total_points?: number
          total_study_time?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_topic_assessments: {
        Row: {
          assessment_id: string
          confidence_level: Database["public"]["Enums"]["skill_level"]
          created_at: string
          experience_level: number
          id: string
          interest_level: number
          topic_id: string
        }
        Insert: {
          assessment_id: string
          confidence_level: Database["public"]["Enums"]["skill_level"]
          created_at?: string
          experience_level?: number
          id?: string
          interest_level?: number
          topic_id: string
        }
        Update: {
          assessment_id?: string
          confidence_level?: Database["public"]["Enums"]["skill_level"]
          created_at?: string
          experience_level?: number
          id?: string
          interest_level?: number
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_topic_assessments_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "user_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_topic_assessments_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "dsa_topics"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_learning_path: {
        Args: { user_assessment_id: string }
        Returns: string
      }
    }
    Enums: {
      learning_goal:
        | "interview_prep"
        | "academic"
        | "career_change"
        | "skill_improvement"
        | "competitive_programming"
      learning_style: "visual" | "hands_on" | "theoretical" | "mixed"
      skill_level:
        | "beginner"
        | "novice"
        | "intermediate"
        | "advanced"
        | "expert"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      learning_goal: [
        "interview_prep",
        "academic",
        "career_change",
        "skill_improvement",
        "competitive_programming",
      ],
      learning_style: ["visual", "hands_on", "theoretical", "mixed"],
      skill_level: ["beginner", "novice", "intermediate", "advanced", "expert"],
    },
  },
} as const
