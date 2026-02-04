npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead
npm warn deprecated tar@7.5.3: Old versions of tar are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exhorbitant rates) by contacting i@izs.me
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_roles: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_chat_history: {
        Row: {
          created_at: string
          id: number
          messages: Json
          session_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          messages: Json
          session_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          messages?: Json
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      algorithm_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      algorithms: {
        Row: {
          category_id: string | null
          complexity_space: string | null
          complexity_time: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category_id?: string | null
          complexity_space?: string | null
          complexity_time?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category_id?: string | null
          complexity_space?: string | null
          complexity_time?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "algorithms_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "algorithm_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          algorithm_id: string
          content: string | null
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          algorithm_id: string
          content?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          algorithm_id?: string
          content?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: true
            referencedRelation: "algorithms"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          algorithm_id: string
          id: string
          issued_at: string | null
          user_id: string
          verification_key: string
        }
        Insert: {
          algorithm_id: string
          id?: string
          issued_at?: string | null
          user_id: string
          verification_key: string
        }
        Update: {
          algorithm_id?: string
          id?: string
          issued_at?: string | null
          user_id?: string
          verification_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "algorithms"
            referencedColumns: ["id"]
          },
        ]
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
      collaborative_sessions: {
        Row: {
          challenge_id: string
          created_at: string | null
          host_id: string
          id: string
          is_active: boolean | null
          session_state: Json | null
          updated_at: string | null
        }
        Insert: {
          challenge_id: string
          created_at?: string | null
          host_id: string
          id?: string
          is_active?: boolean | null
          session_state?: Json | null
          updated_at?: string | null
        }
        Update: {
          challenge_id?: string
          created_at?: string | null
          host_id?: string
          id?: string
          is_active?: boolean | null
          session_state?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contest_announcements: {
        Row: {
          contest_id: string
          created_at: string | null
          created_by: string | null
          id: string
          message: string
          priority: string | null
          title: string
        }
        Insert: {
          contest_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          message: string
          priority?: string | null
          title: string
        }
        Update: {
          contest_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          message?: string
          priority?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "contest_announcements_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
        ]
      }
      contest_participants: {
        Row: {
          contest_id: string
          id: string
          last_submission_at: string | null
          penalty_time: number | null
          problems_solved: number | null
          rank: number | null
          registered_at: string | null
          score: number | null
          user_id: string
        }
        Insert: {
          contest_id: string
          id?: string
          last_submission_at?: string | null
          penalty_time?: number | null
          problems_solved?: number | null
          rank?: number | null
          registered_at?: string | null
          score?: number | null
          user_id: string
        }
        Update: {
          contest_id?: string
          id?: string
          last_submission_at?: string | null
          penalty_time?: number | null
          problems_solved?: number | null
          rank?: number | null
          registered_at?: string | null
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contest_participants_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
        ]
      }
      contest_problems: {
        Row: {
          contest_id: string
          created_at: string | null
          id: string
          order_index: number | null
          points: number | null
          problem_id: string
          solved_count: number | null
        }
        Insert: {
          contest_id: string
          created_at?: string | null
          id?: string
          order_index?: number | null
          points?: number | null
          problem_id: string
          solved_count?: number | null
        }
        Update: {
          contest_id?: string
          created_at?: string | null
          id?: string
          order_index?: number | null
          points?: number | null
          problem_id?: string
          solved_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contest_problems_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contest_problems_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      contest_submissions: {
        Row: {
          code: string
          contest_id: string
          id: string
          judged_at: string | null
          language: string
          memory: number | null
          passed_testcases: number | null
          problem_id: string
          runtime: number | null
          score: number | null
          status: string | null
          submitted_at: string | null
          total_testcases: number | null
          user_id: string
          verdict: string | null
        }
        Insert: {
          code: string
          contest_id: string
          id?: string
          judged_at?: string | null
          language: string
          memory?: number | null
          passed_testcases?: number | null
          problem_id: string
          runtime?: number | null
          score?: number | null
          status?: string | null
          submitted_at?: string | null
          total_testcases?: number | null
          user_id: string
          verdict?: string | null
        }
        Update: {
          code?: string
          contest_id?: string
          id?: string
          judged_at?: string | null
          language?: string
          memory?: number | null
          passed_testcases?: number | null
          problem_id?: string
          runtime?: number | null
          score?: number | null
          status?: string | null
          submitted_at?: string | null
          total_testcases?: number | null
          user_id?: string
          verdict?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contest_submissions_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contest_submissions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      contests: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          duration: number
          end_time: string
          id: string
          max_participants: number | null
          prizes: string | null
          registration_end: string | null
          registration_start: string | null
          rules: string | null
          start_time: string
          status: string | null
          title: string
          total_participants: number | null
          type: string | null
          updated_at: string | null
          visibility: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration: number
          end_time: string
          id?: string
          max_participants?: number | null
          prizes?: string | null
          registration_end?: string | null
          registration_start?: string | null
          rules?: string | null
          start_time: string
          status?: string | null
          title: string
          total_participants?: number | null
          type?: string | null
          updated_at?: string | null
          visibility?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number
          end_time?: string
          id?: string
          max_participants?: number | null
          prizes?: string | null
          registration_end?: string | null
          registration_start?: string | null
          rules?: string | null
          start_time?: string
          status?: string | null
          title?: string
          total_participants?: number | null
          type?: string | null
          updated_at?: string | null
          visibility?: string | null
        }
        Relationships: []
      }
      daily_activity: {
        Row: {
          activity_date: string
          created_at: string | null
          id: string
          problems_solved: number | null
          submissions_count: number | null
          time_spent_minutes: number | null
          user_id: string
        }
        Insert: {
          activity_date: string
          created_at?: string | null
          id?: string
          problems_solved?: number | null
          submissions_count?: number | null
          time_spent_minutes?: number | null
          user_id: string
        }
        Update: {
          activity_date?: string
          created_at?: string | null
          id?: string
          problems_solved?: number | null
          submissions_count?: number | null
          time_spent_minutes?: number | null
          user_id?: string
        }
        Relationships: []
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
      forum_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          order_index: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          order_index?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          order_index?: number | null
        }
        Relationships: []
      }
      forum_replies: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          is_solution: boolean | null
          topic_id: string
          updated_at: string | null
          upvotes: number | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          is_solution?: boolean | null
          topic_id: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_solution?: boolean | null
          topic_id?: string
          updated_at?: string | null
          upvotes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "forum_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_topics: {
        Row: {
          author_id: string
          category_id: string
          content: string
          created_at: string | null
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          last_reply_at: string | null
          reply_count: number | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id: string
          category_id: string
          content: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_reply_at?: string | null
          reply_count?: number | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string
          category_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          last_reply_at?: string | null
          reply_count?: number | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_topics_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: number
          id: number
          role: Database["public"]["Enums"]["group_role"]
          user_id: string
        }
        Insert: {
          group_id: number
          id?: never
          role?: Database["public"]["Enums"]["group_role"]
          user_id: string
        }
        Update: {
          group_id?: number
          id?: never
          role?: Database["public"]["Enums"]["group_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string
          description: string | null
          id: number
          institution_id: number | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: never
          institution_id?: number | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: never
          institution_id?: number | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      institutions: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: never
          name: string
        }
        Update: {
          created_at?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      learning_assignments: {
        Row: {
          assigned_by: string | null
          created_at: string
          due_date: string | null
          group_id: number
          id: number
          path_id: string
        }
        Insert: {
          assigned_by?: string | null
          created_at?: string
          due_date?: string | null
          group_id: number
          id?: never
          path_id: string
        }
        Update: {
          assigned_by?: string | null
          created_at?: string
          due_date?: string | null
          group_id?: number
          id?: never
          path_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learning_assignments_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
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
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      problems: {
        Row: {
          acceptance_rate: number | null
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string
          difficulty: string | null
          id: string
          is_active: boolean | null
          memory_limit: number | null
          points: number | null
          solved_count: number | null
          time_limit: number | null
          title: string
          total_accepted: number | null
          total_submissions: number | null
          updated_at: string | null
        }
        Insert: {
          acceptance_rate?: number | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description: string
          difficulty?: string | null
          id?: string
          is_active?: boolean | null
          memory_limit?: number | null
          points?: number | null
          solved_count?: number | null
          time_limit?: number | null
          title: string
          total_accepted?: number | null
          total_submissions?: number | null
          updated_at?: string | null
        }
        Update: {
          acceptance_rate?: number | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          difficulty?: string | null
          id?: string
          is_active?: boolean | null
          memory_limit?: number | null
          points?: number | null
          solved_count?: number | null
          time_limit?: number | null
          title?: string
          total_accepted?: number | null
          total_submissions?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
      room_members: {
        Row: {
          id: string
          is_online: boolean | null
          joined_at: string | null
          last_seen: string | null
          role: string | null
          room_id: string
          user_id: string
        }
        Insert: {
          id?: string
          is_online?: boolean | null
          joined_at?: string | null
          last_seen?: string | null
          role?: string | null
          room_id: string
          user_id: string
        }
        Update: {
          id?: string
          is_online?: boolean | null
          joined_at?: string | null
          last_seen?: string | null
          role?: string | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_members_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "study_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      room_messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          message_type: string | null
          metadata: Json | null
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          message_type?: string | null
          metadata?: Json | null
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          message_type?: string | null
          metadata?: Json | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "study_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      room_shared_code: {
        Row: {
          code: string | null
          created_at: string | null
          created_by: string | null
          id: string
          language: string | null
          last_edited_by: string | null
          room_id: string
          title: string | null
          updated_at: string | null
          version: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          language?: string | null
          last_edited_by?: string | null
          room_id: string
          title?: string | null
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          language?: string | null
          last_edited_by?: string | null
          room_id?: string
          title?: string | null
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "room_shared_code_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "study_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      session_chat_messages: {
        Row: {
          created_at: string | null
          id: number
          message: string
          session_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          message: string
          session_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "collaborative_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      session_participants: {
        Row: {
          id: number
          joined_at: string | null
          session_id: string
          user_id: string
        }
        Insert: {
          id?: number
          joined_at?: string | null
          session_id: string
          user_id: string
        }
        Update: {
          id?: number
          joined_at?: string | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "collaborative_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      study_rooms: {
        Row: {
          active_members: number | null
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          is_private: boolean | null
          max_members: number | null
          name: string
          password_hash: string | null
          status: string | null
          topic: string | null
          updated_at: string | null
        }
        Insert: {
          active_members?: number | null
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          is_private?: boolean | null
          max_members?: number | null
          name: string
          password_hash?: string | null
          status?: string | null
          topic?: string | null
          updated_at?: string | null
        }
        Update: {
          active_members?: number | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          is_private?: boolean | null
          max_members?: number | null
          name?: string
          password_hash?: string | null
          status?: string | null
          topic?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      submission_results: {
        Row: {
          actual_output: string | null
          created_at: string | null
          error_message: string | null
          id: string
          memory: number | null
          passed: boolean | null
          runtime: number | null
          submission_id: string
          testcase_id: string
        }
        Insert: {
          actual_output?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          memory?: number | null
          passed?: boolean | null
          runtime?: number | null
          submission_id: string
          testcase_id: string
        }
        Update: {
          actual_output?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          memory?: number | null
          passed?: boolean | null
          runtime?: number | null
          submission_id?: string
          testcase_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_results_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submission_results_testcase_id_fkey"
            columns: ["testcase_id"]
            isOneToOne: false
            referencedRelation: "testcases"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          code: string
          failed_testcases: number | null
          id: string
          judged_at: string | null
          language: string
          memory: number | null
          passed_testcases: number | null
          problem_id: string
          runtime: number | null
          score: number | null
          status: string | null
          submitted_at: string | null
          total_testcases: number | null
          user_id: string
          verdict: string | null
        }
        Insert: {
          code: string
          failed_testcases?: number | null
          id?: string
          judged_at?: string | null
          language: string
          memory?: number | null
          passed_testcases?: number | null
          problem_id: string
          runtime?: number | null
          score?: number | null
          status?: string | null
          submitted_at?: string | null
          total_testcases?: number | null
          user_id: string
          verdict?: string | null
        }
        Update: {
          code?: string
          failed_testcases?: number | null
          id?: string
          judged_at?: string | null
          language?: string
          memory?: number | null
          passed_testcases?: number | null
          problem_id?: string
          runtime?: number | null
          score?: number | null
          status?: string | null
          submitted_at?: string | null
          total_testcases?: number | null
          user_id?: string
          verdict?: string | null
        }
        Relationships: []
      }
      testcases: {
        Row: {
          created_at: string | null
          expected_output: string
          id: string
          input: string
          is_hidden: boolean | null
          memory_limit: number | null
          order_index: number | null
          problem_id: string
          time_limit: number | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expected_output: string
          id?: string
          input: string
          is_hidden?: boolean | null
          memory_limit?: number | null
          order_index?: number | null
          problem_id: string
          time_limit?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expected_output?: string
          id?: string
          input?: string
          is_hidden?: boolean | null
          memory_limit?: number | null
          order_index?: number | null
          problem_id?: string
          time_limit?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      usage_logs: {
        Row: {
          created_at: string
          feature: string
          id: number
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          feature: string
          id?: never
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          feature?: string
          id?: never
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_name: string
          achievement_type: string
          description: string | null
          earned_at: string | null
          icon: string | null
          id: string
          user_id: string
        }
        Insert: {
          achievement_name: string
          achievement_type: string
          description?: string | null
          earned_at?: string | null
          icon?: string | null
          id?: string
          user_id: string
        }
        Update: {
          achievement_name?: string
          achievement_type?: string
          description?: string | null
          earned_at?: string | null
          icon?: string | null
          id?: string
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
      user_events: {
        Row: {
          created_at: string
          event_type: string
          id: number
          metadata: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: never
          metadata?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: never
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_problem_progress: {
        Row: {
          attempts: number | null
          best_submission_id: string | null
          first_solved_at: string | null
          id: string
          last_attempted_at: string | null
          problem_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          attempts?: number | null
          best_submission_id?: string | null
          first_solved_at?: string | null
          id?: string
          last_attempted_at?: string | null
          problem_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          attempts?: number | null
          best_submission_id?: string | null
          first_solved_at?: string | null
          id?: string
          last_attempted_at?: string | null
          problem_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_problem_progress_best_submission_id_fkey"
            columns: ["best_submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_problem_progress_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      user_quiz_progress: {
        Row: {
          algorithm_id: string
          completed_at: string | null
          id: string
          score: number
          user_id: string
        }
        Insert: {
          algorithm_id: string
          completed_at?: string | null
          id?: string
          score: number
          user_id: string
        }
        Update: {
          algorithm_id?: string
          completed_at?: string | null
          id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_quiz_progress_algorithm_id_fkey"
            columns: ["algorithm_id"]
            isOneToOne: false
            referencedRelation: "algorithms"
            referencedColumns: ["id"]
          },
        ]
      }
      user_ratings: {
        Row: {
          acceptance_rate: number | null
          contests_participated: number | null
          created_at: string | null
          id: string
          last_active_date: string | null
          max_rating: number | null
          problems_solved: number | null
          rank: string | null
          rating: number | null
          streak_days: number | null
          total_submissions: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          acceptance_rate?: number | null
          contests_participated?: number | null
          created_at?: string | null
          id?: string
          last_active_date?: string | null
          max_rating?: number | null
          problems_solved?: number | null
          rank?: string | null
          rating?: number | null
          streak_days?: number | null
          total_submissions?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          acceptance_rate?: number | null
          contests_participated?: number | null
          created_at?: string | null
          id?: string
          last_active_date?: string | null
          max_rating?: number | null
          problems_solved?: number | null
          rank?: string | null
          rating?: number | null
          streak_days?: number | null
          total_submissions?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
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
      user_topic_proficiency: {
        Row: {
          id: number
          proficiency_score: number
          topic: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: never
          proficiency_score?: number
          topic: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: never
          proficiency_score?: number
          topic?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_contest_rankings: {
        Args: { contest_uuid: string }
        Returns: undefined
      }
      generate_learning_path: {
        Args: { user_assessment_id: string }
        Returns: string
      }
      update_topic_proficiency: {
        Args: { p_score_change: number; p_topic: string; p_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      group_role: "admin" | "member"
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
      group_role: ["admin", "member"],
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
