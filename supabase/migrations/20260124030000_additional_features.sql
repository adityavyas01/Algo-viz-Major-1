-- Phase 5-10: Additional Features
-- Migration: Discussion forums, ratings, and user statistics
-- Created: January 2026

-- ============================================
-- Phase 7: Discussion Forums
-- ============================================

CREATE TABLE IF NOT EXISTS public.forum_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.forum_topics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES public.forum_categories(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    last_reply_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.forum_replies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    topic_id UUID REFERENCES public.forum_topics(id) ON DELETE CASCADE NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    is_solution BOOLEAN DEFAULT FALSE,
    upvotes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Phase 8: User Ratings & Statistics
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_ratings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    rating INTEGER DEFAULT 1200,
    max_rating INTEGER DEFAULT 1200,
    contests_participated INTEGER DEFAULT 0,
    problems_solved INTEGER DEFAULT 0,
    acceptance_rate DECIMAL(5,2) DEFAULT 0.00,
    rank VARCHAR(20) DEFAULT 'Beginner',
    total_submissions INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    last_active_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    achievement_type VARCHAR(50) NOT NULL,
    achievement_name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, achievement_type, achievement_name)
);

CREATE TABLE IF NOT EXISTS public.daily_activity (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    activity_date DATE NOT NULL,
    submissions_count INTEGER DEFAULT 0,
    problems_solved INTEGER DEFAULT 0,
    time_spent_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, activity_date)
);

-- ============================================
-- Indexes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_forum_topics_category ON public.forum_topics(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_topics_author ON public.forum_topics(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_topic ON public.forum_replies(topic_id);
CREATE INDEX IF NOT EXISTS idx_forum_replies_author ON public.forum_replies(author_id);
CREATE INDEX IF NOT EXISTS idx_user_ratings_rating ON public.user_ratings(rating DESC);
CREATE INDEX IF NOT EXISTS idx_user_ratings_user ON public.user_ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_activity_user_date ON public.daily_activity(user_id, activity_date DESC);

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_activity ENABLE ROW LEVEL SECURITY;

-- Forum: Anyone can read
DROP POLICY IF EXISTS "Anyone can read forum categories" ON public.forum_categories;
CREATE POLICY "Anyone can read forum categories" ON public.forum_categories FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Anyone can read forum topics" ON public.forum_topics;
CREATE POLICY "Anyone can read forum topics" ON public.forum_topics FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Anyone can read forum replies" ON public.forum_replies;
CREATE POLICY "Anyone can read forum replies" ON public.forum_replies FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Users can create topics" ON public.forum_topics;
CREATE POLICY "Users can create topics" ON public.forum_topics
    FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can create replies" ON public.forum_replies;
CREATE POLICY "Users can create replies" ON public.forum_replies
    FOR INSERT WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can edit own topics" ON public.forum_topics;
CREATE POLICY "Authors can edit own topics" ON public.forum_topics
    FOR UPDATE USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can edit own replies" ON public.forum_replies;
CREATE POLICY "Authors can edit own replies" ON public.forum_replies
    FOR UPDATE USING (auth.uid() = author_id);

-- Ratings: Everyone can view, users can update their own
DROP POLICY IF EXISTS "Anyone can view ratings" ON public.user_ratings;
CREATE POLICY "Anyone can view ratings" ON public.user_ratings FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Users can update own ratings" ON public.user_ratings;
CREATE POLICY "Users can update own ratings" ON public.user_ratings
    FOR ALL USING (auth.uid() = user_id);

-- Achievements & Activity: Users manage their own
DROP POLICY IF EXISTS "Users can view own achievements" ON public.user_achievements;
CREATE POLICY "Users can view own achievements" ON public.user_achievements
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own activity" ON public.daily_activity;
CREATE POLICY "Users can view own activity" ON public.daily_activity
    FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- Functions
-- ============================================

-- Update topic reply count
CREATE OR REPLACE FUNCTION update_topic_reply_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.forum_topics
        SET 
            reply_count = reply_count + 1,
            last_reply_at = NOW()
        WHERE id = NEW.topic_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.forum_topics
        SET reply_count = GREATEST(0, reply_count - 1)
        WHERE id = OLD.topic_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_topic_replies ON public.forum_replies;
CREATE TRIGGER trigger_update_topic_replies
    AFTER INSERT OR DELETE ON public.forum_replies
    FOR EACH ROW
    EXECUTE FUNCTION update_topic_reply_count();

-- Auto-create user rating record
CREATE OR REPLACE FUNCTION create_user_rating_record()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_ratings (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_create_rating_on_user ON auth.users;
CREATE TRIGGER trigger_create_rating_on_user
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION create_user_rating_record();

-- ============================================
-- Sample Data
-- ============================================

INSERT INTO public.forum_categories (name, description, icon, order_index)
VALUES 
    ('General Discussion', 'General programming and algorithm discussions', 'MessageCircle', 1),
    ('Problem Help', 'Get help with specific coding problems', 'HelpCircle', 2),
    ('Contest Discussion', 'Discuss past and upcoming contests', 'Trophy', 3),
    ('Announcements', 'Official announcements and updates', 'Megaphone', 4)
ON CONFLICT (name) DO NOTHING;
