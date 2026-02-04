-- Community Features Migration
-- Created: January 28, 2026
-- Purpose: Add social features to Community page (profiles, groups, visualizations, activity)

-- ============================================
-- 1. Extended User Profiles
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    display_name VARCHAR(100),
    bio TEXT,
    avatar_url TEXT,
    skills TEXT[] DEFAULT '{}',
    interests TEXT[] DEFAULT '{}',
    github_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    website_url TEXT,
    location VARCHAR(100),
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. Shared Visualizations
-- ============================================

CREATE TABLE IF NOT EXISTS public.shared_visualizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    code TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    algorithm_type VARCHAR(100),
    algorithm_id UUID,
    is_public BOOLEAN DEFAULT TRUE,
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. Community Groups (renamed to avoid conflict with existing groups table)
-- ============================================

CREATE TABLE IF NOT EXISTS public.community_groups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    topic VARCHAR(100),
    privacy VARCHAR(20) DEFAULT 'public' CHECK (privacy IN ('public', 'private')),
    creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    member_count INTEGER DEFAULT 1,
    max_members INTEGER DEFAULT 50,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. Community Group Members (renamed to avoid conflict with existing group_members table)
-- ============================================

CREATE TABLE IF NOT EXISTS public.community_group_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID REFERENCES public.community_groups(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(group_id, user_id)
);

-- ============================================
-- 5. Community Group Discussions
-- ============================================

CREATE TABLE IF NOT EXISTS public.community_group_discussions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_id UUID REFERENCES public.community_groups(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255),
    content TEXT NOT NULL,
    replies_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. Activity Feed
-- ============================================

CREATE TABLE IF NOT EXISTS public.activity_feed (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    activity_type VARCHAR(50) NOT NULL CHECK (activity_type IN (
        'problem_solved', 'contest_joined', 'contest_completed', 
        'visualization_shared', 'group_created', 'group_joined',
        'achievement_unlocked', 'streak_milestone', 'level_up'
    )),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. Visualization Likes
-- ============================================

CREATE TABLE IF NOT EXISTS public.visualization_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    visualization_id UUID REFERENCES public.shared_visualizations(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(visualization_id, user_id)
);

-- ============================================
-- 8. User Connections
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_connections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    connected_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, connected_user_id),
    CHECK (user_id != connected_user_id)
);

-- ============================================
-- 9. Merge Tournaments into Contests
-- ============================================

-- Add tournament-specific columns to existing contests table
-- Note: contests table already has a 'type' column, so we add format for tournament structure type
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'contests' 
                   AND column_name = 'format') THEN
        ALTER TABLE public.contests ADD COLUMN format VARCHAR(20) DEFAULT 'standard';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'contests' 
                   AND column_name = 'bracket_data') THEN
        ALTER TABLE public.contests ADD COLUMN bracket_data JSONB DEFAULT NULL;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_schema = 'public' 
                   AND table_name = 'contests' 
                   AND column_name = 'prize_pool') THEN
        ALTER TABLE public.contests ADD COLUMN prize_pool JSONB DEFAULT NULL;
    END IF;
END $$;

-- Add check constraint separately to avoid conflicts
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint 
                   WHERE conname = 'contests_format_check') THEN
        ALTER TABLE public.contests 
        ADD CONSTRAINT contests_format_check 
        CHECK (format IN ('standard', 'tournament', 'single_elimination', 'double_elimination', 'round_robin'));
    END IF;
END $$;

-- ============================================
-- 10. Indexes for Performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_public ON public.user_profiles(is_public);

CREATE INDEX IF NOT EXISTS idx_shared_viz_user_id ON public.shared_visualizations(user_id);
CREATE INDEX IF NOT EXISTS idx_shared_viz_algorithm ON public.shared_visualizations(algorithm_type);
CREATE INDEX IF NOT EXISTS idx_shared_viz_public ON public.shared_visualizations(is_public);
CREATE INDEX IF NOT EXISTS idx_shared_viz_created ON public.shared_visualizations(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_community_groups_creator ON public.community_groups(creator_id);
CREATE INDEX IF NOT EXISTS idx_community_groups_topic ON public.community_groups(topic);
CREATE INDEX IF NOT EXISTS idx_community_groups_privacy ON public.community_groups(privacy);

CREATE INDEX IF NOT EXISTS idx_community_group_members_group ON public.community_group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_community_group_members_user ON public.community_group_members(user_id);

CREATE INDEX IF NOT EXISTS idx_community_group_discussions_group ON public.community_group_discussions(group_id);
CREATE INDEX IF NOT EXISTS idx_community_group_discussions_user ON public.community_group_discussions(user_id);
CREATE INDEX IF NOT EXISTS idx_community_group_discussions_created ON public.community_group_discussions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activity_feed_user ON public.activity_feed(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_feed_type ON public.activity_feed(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_feed_created ON public.activity_feed(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_viz_likes_viz ON public.visualization_likes(visualization_id);
CREATE INDEX IF NOT EXISTS idx_viz_likes_user ON public.visualization_likes(user_id);

CREATE INDEX IF NOT EXISTS idx_connections_user ON public.user_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_connections_connected ON public.user_connections(connected_user_id);
CREATE INDEX IF NOT EXISTS idx_connections_status ON public.user_connections(status);

-- Only create contests format index if format column exists
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_schema = 'public' 
               AND table_name = 'contests' 
               AND column_name = 'format') THEN
        CREATE INDEX IF NOT EXISTS idx_contests_format ON public.contests(format);
    END IF;
END $$;

-- ============================================
-- 11. Row Level Security Policies
-- ============================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_visualizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_group_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visualization_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_connections ENABLE ROW LEVEL SECURITY;

-- User Profiles: Public profiles visible to all, own profile editable
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.user_profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.user_profiles
    FOR SELECT USING (user_profiles.is_public = TRUE OR auth.uid() = user_profiles.user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = user_profiles.user_id);

DROP POLICY IF EXISTS "Users can delete own profile" ON public.user_profiles;
CREATE POLICY "Users can delete own profile" ON public.user_profiles
    FOR DELETE USING (auth.uid() = user_profiles.user_id);

-- Shared Visualizations: Public visualizations visible to all
DROP POLICY IF EXISTS "Public visualizations are viewable" ON public.shared_visualizations;
CREATE POLICY "Public visualizations are viewable" ON public.shared_visualizations
    FOR SELECT USING (shared_visualizations.is_public = TRUE OR auth.uid() = shared_visualizations.user_id);

DROP POLICY IF EXISTS "Users can insert visualizations" ON public.shared_visualizations;
CREATE POLICY "Users can insert visualizations" ON public.shared_visualizations
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own visualizations" ON public.shared_visualizations;
CREATE POLICY "Users can update own visualizations" ON public.shared_visualizations
    FOR UPDATE USING (auth.uid() = shared_visualizations.user_id);

DROP POLICY IF EXISTS "Users can delete own visualizations" ON public.shared_visualizations;
CREATE POLICY "Users can delete own visualizations" ON public.shared_visualizations
    FOR DELETE USING (auth.uid() = shared_visualizations.user_id);

-- Community Groups: Public groups visible to all, members can see private
DROP POLICY IF EXISTS "Public groups are viewable" ON public.community_groups;
CREATE POLICY "Public groups are viewable" ON public.community_groups
    FOR SELECT USING (
        community_groups.privacy = 'public' 
        OR auth.uid() = community_groups.creator_id
        OR EXISTS (
            SELECT 1 FROM public.community_group_members gm
            WHERE gm.group_id = community_groups.id AND gm.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can create groups" ON public.community_groups;
CREATE POLICY "Users can create groups" ON public.community_groups
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

DROP POLICY IF EXISTS "Creators and admins can manage groups" ON public.community_groups;
CREATE POLICY "Creators and admins can manage groups" ON public.community_groups
    FOR UPDATE USING (
        auth.uid() = community_groups.creator_id
        OR EXISTS (
            SELECT 1 FROM public.community_group_members gm
            WHERE gm.group_id = community_groups.id AND gm.user_id = auth.uid() AND gm.role = 'admin'
        )
    );

-- Community Group Members: Members can view other members in same group
DROP POLICY IF EXISTS "Group members are viewable by members" ON public.community_group_members;
CREATE POLICY "Group members are viewable by members" ON public.community_group_members
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.community_group_members gm
            WHERE gm.group_id = community_group_members.group_id AND gm.user_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM public.community_groups sg
            WHERE sg.id = community_group_members.group_id AND sg.privacy = 'public'
        )
    );

DROP POLICY IF EXISTS "Users can join groups" ON public.community_group_members;
CREATE POLICY "Users can join groups" ON public.community_group_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can leave groups" ON public.community_group_members;
CREATE POLICY "Users can leave groups" ON public.community_group_members
    FOR DELETE USING (auth.uid() = community_group_members.user_id);

-- Community Group Discussions: Members can view and post
DROP POLICY IF EXISTS "Members can view discussions" ON public.community_group_discussions;
CREATE POLICY "Members can view discussions" ON public.community_group_discussions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.community_group_members gm
            WHERE gm.group_id = community_group_discussions.group_id AND gm.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Members can create discussions" ON public.community_group_discussions;
CREATE POLICY "Members can create discussions" ON public.community_group_discussions
    FOR INSERT WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.community_group_members gm
            WHERE gm.group_id = group_id AND gm.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can manage own discussions" ON public.community_group_discussions;
CREATE POLICY "Users can manage own discussions" ON public.community_group_discussions
    FOR UPDATE USING (auth.uid() = community_group_discussions.user_id);

-- Activity Feed: Users see own activity + public activities from connections
DROP POLICY IF EXISTS "Users can view relevant activities" ON public.activity_feed;
CREATE POLICY "Users can view relevant activities" ON public.activity_feed
    FOR SELECT USING (
        auth.uid() = activity_feed.user_id
        OR EXISTS (
            SELECT 1 FROM public.user_connections uc
            WHERE ((uc.user_id = auth.uid() AND uc.connected_user_id = activity_feed.user_id)
               OR (uc.connected_user_id = auth.uid() AND uc.user_id = activity_feed.user_id))
            AND uc.status = 'accepted'
        )
    );

DROP POLICY IF EXISTS "Users can create own activities" ON public.activity_feed;
CREATE POLICY "Users can create own activities" ON public.activity_feed
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Visualization Likes: Users can like/unlike
DROP POLICY IF EXISTS "Users can view likes" ON public.visualization_likes;
CREATE POLICY "Users can view likes" ON public.visualization_likes
    FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Users can insert likes" ON public.visualization_likes;
CREATE POLICY "Users can insert likes" ON public.visualization_likes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own likes" ON public.visualization_likes;
CREATE POLICY "Users can delete own likes" ON public.visualization_likes
    FOR DELETE USING (auth.uid() = visualization_likes.user_id);

-- User Connections: Users can manage own connections
DROP POLICY IF EXISTS "Users can view connections" ON public.user_connections;
CREATE POLICY "Users can view connections" ON public.user_connections
    FOR SELECT USING (auth.uid() = user_connections.user_id OR auth.uid() = user_connections.connected_user_id);

DROP POLICY IF EXISTS "Users can insert connections" ON public.user_connections;
CREATE POLICY "Users can insert connections" ON public.user_connections
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own connections" ON public.user_connections;
CREATE POLICY "Users can update own connections" ON public.user_connections
    FOR UPDATE USING (auth.uid() = user_connections.user_id);

DROP POLICY IF EXISTS "Users can delete own connections" ON public.user_connections;
CREATE POLICY "Users can delete own connections" ON public.user_connections
    FOR DELETE USING (auth.uid() = user_connections.user_id);

-- ============================================
-- 12. Triggers for Auto-Updates
-- ============================================

-- Update member count when users join/leave groups
CREATE OR REPLACE FUNCTION update_community_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.community_groups 
        SET member_count = member_count + 1,
            updated_at = NOW()
        WHERE id = NEW.group_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.community_groups 
        SET member_count = member_count - 1,
            updated_at = NOW()
        WHERE id = OLD.group_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_community_group_member_count ON public.community_group_members;
CREATE TRIGGER trigger_update_community_group_member_count
    AFTER INSERT OR DELETE ON public.community_group_members
    FOR EACH ROW EXECUTE FUNCTION update_community_group_member_count();

-- Update likes count on visualizations
CREATE OR REPLACE FUNCTION update_visualization_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.shared_visualizations 
        SET likes_count = likes_count + 1,
            updated_at = NOW()
        WHERE id = NEW.visualization_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.shared_visualizations 
        SET likes_count = likes_count - 1,
            updated_at = NOW()
        WHERE id = OLD.visualization_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_visualization_likes_count ON public.visualization_likes;
CREATE TRIGGER trigger_update_visualization_likes_count
    AFTER INSERT OR DELETE ON public.visualization_likes
    FOR EACH ROW EXECUTE FUNCTION update_visualization_likes_count();

-- Note: User profiles should be created via the application when users first access community features
-- We cannot create triggers on auth.users in Supabase due to schema restrictions

-- Update updated_at timestamp on profile changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER trigger_update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_shared_viz_updated_at ON public.shared_visualizations;
CREATE TRIGGER trigger_update_shared_viz_updated_at
    BEFORE UPDATE ON public.shared_visualizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_community_groups_updated_at ON public.community_groups;
CREATE TRIGGER trigger_update_community_groups_updated_at
    BEFORE UPDATE ON public.community_groups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_community_group_discussions_updated_at ON public.community_group_discussions;
CREATE TRIGGER trigger_update_community_group_discussions_updated_at
    BEFORE UPDATE ON public.community_group_discussions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 13. Helper Functions
-- ============================================

-- Get user's activity feed (own + connections)
CREATE OR REPLACE FUNCTION get_user_feed(p_user_id UUID, p_limit INTEGER DEFAULT 50)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    activity_type VARCHAR,
    metadata JSONB,
    created_at TIMESTAMPTZ,
    user_display_name VARCHAR,
    user_avatar_url TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        af.id,
        af.user_id,
        af.activity_type,
        af.metadata,
        af.created_at,
        up.display_name as user_display_name,
        up.avatar_url as user_avatar_url
    FROM public.activity_feed af
    JOIN public.user_profiles up ON af.user_id = up.user_id
    WHERE af.user_id = p_user_id
       OR EXISTS (
           SELECT 1 FROM public.user_connections uc
           WHERE ((uc.user_id = p_user_id AND uc.connected_user_id = af.user_id)
              OR (uc.connected_user_id = p_user_id AND uc.user_id = af.user_id))
           AND uc.status = 'accepted'
       )
    ORDER BY af.created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
