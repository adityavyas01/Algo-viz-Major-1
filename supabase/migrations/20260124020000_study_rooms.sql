-- Phase 4: Study Rooms Infrastructure
-- Migration: Study rooms with real-time chat and collaboration
-- Created: January 2026

-- ============================================
-- 1. Study Rooms Table
-- ============================================

CREATE TABLE IF NOT EXISTS public.study_rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    topic VARCHAR(100),
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    max_members INTEGER DEFAULT 10,
    is_private BOOLEAN DEFAULT FALSE,
    password_hash TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    active_members INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. Room Members (for tracking who's in a room)
-- ============================================

CREATE TABLE IF NOT EXISTS public.room_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID REFERENCES public.study_rooms(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('owner', 'moderator', 'member')),
    is_online BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(room_id, user_id)
);

-- ============================================
-- 3. Room Messages (Chat)
-- ============================================

CREATE TABLE IF NOT EXISTS public.room_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID REFERENCES public.study_rooms(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'code', 'system', 'file')),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. Room Shared Code (for collaborative editing)
-- ============================================

CREATE TABLE IF NOT EXISTS public.room_shared_code (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID REFERENCES public.study_rooms(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) DEFAULT 'Untitled',
    code TEXT DEFAULT '',
    language VARCHAR(50) DEFAULT 'python',
    created_by UUID REFERENCES auth.users(id),
    last_edited_by UUID REFERENCES auth.users(id),
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. Indexes for Performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_study_rooms_status ON public.study_rooms(status);
CREATE INDEX IF NOT EXISTS idx_study_rooms_created_by ON public.study_rooms(created_by);
CREATE INDEX IF NOT EXISTS idx_study_rooms_is_private ON public.study_rooms(is_private);
CREATE INDEX IF NOT EXISTS idx_room_members_room_id ON public.room_members(room_id);
CREATE INDEX IF NOT EXISTS idx_room_members_user_id ON public.room_members(user_id);
CREATE INDEX IF NOT EXISTS idx_room_members_is_online ON public.room_members(is_online);
CREATE INDEX IF NOT EXISTS idx_room_messages_room_id ON public.room_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_room_messages_created_at ON public.room_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_room_shared_code_room_id ON public.room_shared_code(room_id);

-- ============================================
-- 6. Row Level Security Policies
-- ============================================

ALTER TABLE public.study_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_shared_code ENABLE ROW LEVEL SECURITY;

-- Study Rooms: Anyone can view public rooms
DROP POLICY IF EXISTS "Anyone can view public rooms" ON public.study_rooms;
CREATE POLICY "Anyone can view public rooms" ON public.study_rooms
    FOR SELECT USING (is_private = FALSE OR auth.role() = 'service_role');

-- Members can view their private rooms
DROP POLICY IF EXISTS "Members can view private rooms" ON public.study_rooms;
CREATE POLICY "Members can view private rooms" ON public.study_rooms
    FOR SELECT USING (
        is_private = TRUE AND EXISTS (
            SELECT 1 FROM public.room_members 
            WHERE room_id = id AND user_id = auth.uid()
        )
    );

-- Users can create rooms
DROP POLICY IF EXISTS "Users can create rooms" ON public.study_rooms;
CREATE POLICY "Users can create rooms" ON public.study_rooms
    FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Room creators can update/delete their rooms
DROP POLICY IF EXISTS "Creators can manage rooms" ON public.study_rooms;
CREATE POLICY "Creators can manage rooms" ON public.study_rooms
    FOR ALL USING (auth.uid() = created_by);

-- Room Members: Members can view other members in their rooms
DROP POLICY IF EXISTS "Members can view room members" ON public.room_members;
CREATE POLICY "Members can view room members" ON public.room_members
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.room_members rm
            WHERE rm.room_id = room_id AND rm.user_id = auth.uid()
        )
    );

-- Users can join rooms
DROP POLICY IF EXISTS "Users can join rooms" ON public.room_members;
CREATE POLICY "Users can join rooms" ON public.room_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own membership
DROP POLICY IF EXISTS "Users can update own membership" ON public.room_members;
CREATE POLICY "Users can update own membership" ON public.room_members
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can leave rooms
DROP POLICY IF EXISTS "Users can leave rooms" ON public.room_members;
CREATE POLICY "Users can leave rooms" ON public.room_members
    FOR DELETE USING (auth.uid() = user_id);

-- Room Messages: Members can view messages in their rooms
DROP POLICY IF EXISTS "Members can view room messages" ON public.room_messages;
CREATE POLICY "Members can view room messages" ON public.room_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.room_members 
            WHERE room_id = room_messages.room_id AND user_id = auth.uid()
        )
    );

-- Members can send messages
DROP POLICY IF EXISTS "Members can send messages" ON public.room_messages;
CREATE POLICY "Members can send messages" ON public.room_messages
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND EXISTS (
            SELECT 1 FROM public.room_members 
            WHERE room_id = room_messages.room_id AND user_id = auth.uid()
        )
    );

-- Room Shared Code: Members can view shared code
DROP POLICY IF EXISTS "Members can view shared code" ON public.room_shared_code;
CREATE POLICY "Members can view shared code" ON public.room_shared_code
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.room_members 
            WHERE room_id = room_shared_code.room_id AND user_id = auth.uid()
        )
    );

-- Members can edit shared code
DROP POLICY IF EXISTS "Members can edit shared code" ON public.room_shared_code;
CREATE POLICY "Members can edit shared code" ON public.room_shared_code
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.room_members 
            WHERE room_id = room_shared_code.room_id AND user_id = auth.uid()
        )
    );

-- ============================================
-- 7. Functions for automated updates
-- ============================================

-- Update active member count when someone joins/leaves
CREATE OR REPLACE FUNCTION update_room_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.study_rooms
        SET active_members = active_members + 1
        WHERE id = NEW.room_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.study_rooms
        SET active_members = GREATEST(0, active_members - 1)
        WHERE id = OLD.room_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.is_online <> NEW.is_online THEN
        -- Handle online status changes
        IF NEW.is_online THEN
            UPDATE public.study_rooms
            SET active_members = active_members + 1
            WHERE id = NEW.room_id;
        ELSE
            UPDATE public.study_rooms
            SET active_members = GREATEST(0, active_members - 1)
            WHERE id = NEW.room_id;
        END IF;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_room_member_count ON public.room_members;
CREATE TRIGGER trigger_update_room_member_count
    AFTER INSERT OR DELETE OR UPDATE OF is_online ON public.room_members
    FOR EACH ROW
    EXECUTE FUNCTION update_room_member_count();

-- Create room owner membership when room is created
CREATE OR REPLACE FUNCTION create_room_owner_membership()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.room_members (room_id, user_id, role, is_online)
    VALUES (NEW.id, NEW.created_by, 'owner', TRUE);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_create_room_owner ON public.study_rooms;
CREATE TRIGGER trigger_create_room_owner
    AFTER INSERT ON public.study_rooms
    FOR EACH ROW
    EXECUTE FUNCTION create_room_owner_membership();

-- Update last_seen timestamp
CREATE OR REPLACE FUNCTION update_member_last_seen()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_seen = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_last_seen ON public.room_members;
CREATE TRIGGER trigger_update_last_seen
    BEFORE UPDATE ON public.room_members
    FOR EACH ROW
    EXECUTE FUNCTION update_member_last_seen();

-- ============================================
-- 8. Updated_at trigger
-- ============================================

DROP TRIGGER IF EXISTS set_updated_at_study_rooms ON public.study_rooms;
CREATE TRIGGER set_updated_at_study_rooms
    BEFORE UPDATE ON public.study_rooms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_room_shared_code ON public.room_shared_code;
CREATE TRIGGER set_updated_at_room_shared_code
    BEFORE UPDATE ON public.room_shared_code
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 9. Sample Data (Optional - for testing)
-- ============================================

-- Insert sample study room (will be created when a user creates one)
-- No sample data needed as users will create rooms dynamically
