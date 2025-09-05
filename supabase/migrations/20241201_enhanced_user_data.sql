-- Enhanced database schema for AlgoViz with real user data tracking

-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  algorithm_id VARCHAR(100) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completion_time INTEGER, -- in milliseconds
  attempts INTEGER DEFAULT 0,
  best_score INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, algorithm_id)
);

-- User Bookmarks Table
CREATE TABLE IF NOT EXISTS user_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  algorithm_id VARCHAR(100) NOT NULL,
  type VARCHAR(20) CHECK (type IN ('bookmark', 'favorite')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, algorithm_id, type)
);

-- User Challenge Completions
CREATE TABLE IF NOT EXISTS user_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_id VARCHAR(100) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completion_time INTEGER, -- in seconds
  score INTEGER,
  code TEXT, -- user's solution code
  language VARCHAR(50),
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- User Learning Path Progress
CREATE TABLE IF NOT EXISTS user_learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  path_id VARCHAR(100) NOT NULL,
  current_step INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, path_id)
);

-- User Activity Log
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL, -- 'algorithm_completed', 'challenge_solved', 'bookmark_added', etc.
  entity_id VARCHAR(100), -- algorithm_id, challenge_id, etc.
  details JSONB, -- flexible data storage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Study Sessions
CREATE TABLE IF NOT EXISTS user_study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  algorithm_id VARCHAR(100),
  session_duration INTEGER, -- in seconds
  session_type VARCHAR(50), -- 'tutorial', 'practice', 'challenge'
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced User Stats (modify existing table)
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS favorite_category VARCHAR(100);
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS learning_streak_best INTEGER DEFAULT 0;
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS total_practice_time INTEGER DEFAULT 0;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_algorithm_id ON user_progress(algorithm_id);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user_id ON user_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenges_user_id ON user_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_type ON user_activity(activity_type);

-- Create triggers to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_challenges_updated_at BEFORE UPDATE ON user_challenges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update user stats when progress is made
CREATE OR REPLACE FUNCTION update_user_stats_on_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Update algorithms completed count
  UPDATE user_stats 
  SET algorithms_completed = (
    SELECT COUNT(*) FROM user_progress 
    WHERE user_id = NEW.user_id AND completed = true
  ),
  last_active_at = NOW()
  WHERE user_id = NEW.user_id;
  
  -- Log the activity
  INSERT INTO user_activity (user_id, activity_type, entity_id, details)
  VALUES (NEW.user_id, 'algorithm_progress', NEW.algorithm_id, 
    jsonb_build_object('completed', NEW.completed, 'completion_time', NEW.completion_time));
  
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_user_stats_on_progress 
  AFTER INSERT OR UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_user_stats_on_progress();

-- Create function to calculate and update user streaks
CREATE OR REPLACE FUNCTION calculate_user_streak(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  streak_count INTEGER := 0;
  current_date DATE := CURRENT_DATE;
  check_date DATE;
BEGIN
  -- Check for consecutive days of activity
  FOR check_date IN 
    SELECT DISTINCT DATE(created_at) as activity_date
    FROM user_activity 
    WHERE user_id = user_uuid 
    AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    ORDER BY activity_date DESC
  LOOP
    IF check_date = current_date THEN
      streak_count := streak_count + 1;
      current_date := current_date - INTERVAL '1 day';
    ELSE
      EXIT;
    END IF;
  END LOOP;
  
  -- Update user stats with new streak
  UPDATE user_stats 
  SET current_streak = streak_count,
      learning_streak_best = GREATEST(learning_streak_best, streak_count)
  WHERE user_id = user_uuid;
  
  RETURN streak_count;
END;
$$ language 'plpgsql';

-- Row Level Security Policies
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_study_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for user_progress
CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Policies for user_bookmarks
CREATE POLICY "Users can manage own bookmarks" ON user_bookmarks
  FOR ALL USING (auth.uid() = user_id);

-- Policies for user_challenges
CREATE POLICY "Users can manage own challenges" ON user_challenges
  FOR ALL USING (auth.uid() = user_id);

-- Policies for user_learning_paths
CREATE POLICY "Users can manage own learning paths" ON user_learning_paths
  FOR ALL USING (auth.uid() = user_id);

-- Policies for user_activity
CREATE POLICY "Users can view own activity" ON user_activity
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert activity" ON user_activity
  FOR INSERT WITH CHECK (true);

-- Policies for user_study_sessions
CREATE POLICY "Users can manage own study sessions" ON user_study_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Insert sample data for testing (optional)
-- This will only insert if no data exists for the user
CREATE OR REPLACE FUNCTION create_sample_user_data(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  -- Insert sample progress
  INSERT INTO user_progress (user_id, algorithm_id, completed, attempts)
  VALUES 
    (user_uuid, 'bubble-sort', true, 3),
    (user_uuid, 'binary-search', true, 2),
    (user_uuid, 'quick-sort', false, 1)
  ON CONFLICT (user_id, algorithm_id) DO NOTHING;
  
  -- Insert sample bookmarks
  INSERT INTO user_bookmarks (user_id, algorithm_id, type)
  VALUES 
    (user_uuid, 'merge-sort', 'bookmark'),
    (user_uuid, 'heap-sort', 'favorite')
  ON CONFLICT (user_id, algorithm_id, type) DO NOTHING;
  
END;
$$ language 'plpgsql';
