-- Phase 3: Contest Platform
-- Migration: Complete contest management system
-- Created: January 2026

-- ============================================
-- 1. Contests Table
-- ============================================

CREATE TABLE IF NOT EXISTS public.contests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    duration INTEGER NOT NULL, -- minutes
    status VARCHAR(20) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'finished')),
    type VARCHAR(20) DEFAULT 'standard' CHECK (type IN ('standard', 'weekly', 'monthly', 'special')),
    visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'invite_only')),
    max_participants INTEGER,
    total_participants INTEGER DEFAULT 0,
    registration_start TIMESTAMPTZ,
    registration_end TIMESTAMPTZ,
    rules TEXT,
    prizes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. Contest Problems (many-to-many)
-- ============================================

CREATE TABLE IF NOT EXISTS public.contest_problems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contest_id UUID REFERENCES public.contests(id) ON DELETE CASCADE NOT NULL,
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    order_index INTEGER DEFAULT 0,
    points INTEGER DEFAULT 100,
    solved_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(contest_id, problem_id)
);

-- ============================================
-- 3. Contest Participants
-- ============================================

CREATE TABLE IF NOT EXISTS public.contest_participants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contest_id UUID REFERENCES public.contests(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    rank INTEGER,
    score INTEGER DEFAULT 0,
    penalty_time INTEGER DEFAULT 0, -- minutes
    problems_solved INTEGER DEFAULT 0,
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    last_submission_at TIMESTAMPTZ,
    UNIQUE(contest_id, user_id)
);

-- ============================================
-- 4. Contest Submissions
-- ============================================

CREATE TABLE IF NOT EXISTS public.contest_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contest_id UUID REFERENCES public.contests(id) ON DELETE CASCADE NOT NULL,
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    code TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'accepted', 'wrong_answer', 'runtime_error', 'time_limit_exceeded', 'compilation_error', 'memory_limit_exceeded')),
    verdict VARCHAR(50),
    score INTEGER DEFAULT 0,
    runtime INTEGER,
    memory INTEGER,
    passed_testcases INTEGER DEFAULT 0,
    total_testcases INTEGER DEFAULT 0,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    judged_at TIMESTAMPTZ
);

-- ============================================
-- 5. Contest Announcements
-- ============================================

CREATE TABLE IF NOT EXISTS public.contest_announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contest_id UUID REFERENCES public.contests(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. Indexes for Performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_contests_status ON public.contests(status);
CREATE INDEX IF NOT EXISTS idx_contests_start_time ON public.contests(start_time);
CREATE INDEX IF NOT EXISTS idx_contests_end_time ON public.contests(end_time);
CREATE INDEX IF NOT EXISTS idx_contest_problems_contest_id ON public.contest_problems(contest_id);
CREATE INDEX IF NOT EXISTS idx_contest_problems_problem_id ON public.contest_problems(problem_id);
CREATE INDEX IF NOT EXISTS idx_contest_participants_contest_id ON public.contest_participants(contest_id);
CREATE INDEX IF NOT EXISTS idx_contest_participants_user_id ON public.contest_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_contest_participants_rank ON public.contest_participants(rank);
CREATE INDEX IF NOT EXISTS idx_contest_submissions_contest_id ON public.contest_submissions(contest_id);
CREATE INDEX IF NOT EXISTS idx_contest_submissions_user_id ON public.contest_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_contest_submissions_problem_id ON public.contest_submissions(problem_id);
CREATE INDEX IF NOT EXISTS idx_contest_submissions_submitted_at ON public.contest_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contest_announcements_contest_id ON public.contest_announcements(contest_id);

-- ============================================
-- 7. Row Level Security Policies
-- ============================================

ALTER TABLE public.contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contest_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contest_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contest_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contest_announcements ENABLE ROW LEVEL SECURITY;

-- Contests: Anyone can view public contests
DROP POLICY IF EXISTS "Anyone can view public contests" ON public.contests;
CREATE POLICY "Anyone can view public contests" ON public.contests
    FOR SELECT USING (visibility = 'public' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins can manage contests" ON public.contests;
CREATE POLICY "Admins can manage contests" ON public.contests
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_roles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- Contest Problems: Anyone can view problems for public contests
DROP POLICY IF EXISTS "Anyone can view contest problems" ON public.contest_problems;
CREATE POLICY "Anyone can view contest problems" ON public.contest_problems
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.contests 
            WHERE id = contest_id AND visibility = 'public'
        )
    );

DROP POLICY IF EXISTS "Admins can manage contest problems" ON public.contest_problems;
CREATE POLICY "Admins can manage contest problems" ON public.contest_problems
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_roles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- Contest Participants: Users can view all participants, manage own registration
DROP POLICY IF EXISTS "Anyone can view contest participants" ON public.contest_participants;
CREATE POLICY "Anyone can view contest participants" ON public.contest_participants
    FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Users can register for contests" ON public.contest_participants;
CREATE POLICY "Users can register for contests" ON public.contest_participants
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own participation" ON public.contest_participants;
CREATE POLICY "Users can update own participation" ON public.contest_participants
    FOR UPDATE USING (auth.uid() = user_id);

-- Contest Submissions: Users can view own submissions, create new ones
DROP POLICY IF EXISTS "Users can view own contest submissions" ON public.contest_submissions;
CREATE POLICY "Users can view own contest submissions" ON public.contest_submissions
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create contest submissions" ON public.contest_submissions;
CREATE POLICY "Users can create contest submissions" ON public.contest_submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Contest Announcements: Anyone can view announcements
DROP POLICY IF EXISTS "Anyone can view contest announcements" ON public.contest_announcements;
CREATE POLICY "Anyone can view contest announcements" ON public.contest_announcements
    FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Admins can manage announcements" ON public.contest_announcements;
CREATE POLICY "Admins can manage announcements" ON public.contest_announcements
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_roles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- ============================================
-- 8. Functions for automated updates
-- ============================================

-- Update contest status based on time
CREATE OR REPLACE FUNCTION update_contest_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if contest should be active
    IF NOW() >= NEW.start_time AND NOW() <= NEW.end_time THEN
        NEW.status = 'active';
    -- Check if contest should be finished
    ELSIF NOW() > NEW.end_time THEN
        NEW.status = 'finished';
    -- Otherwise keep as upcoming
    ELSE
        NEW.status = 'upcoming';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_contest_status ON public.contests;
CREATE TRIGGER trigger_update_contest_status
    BEFORE INSERT OR UPDATE ON public.contests
    FOR EACH ROW
    EXECUTE FUNCTION update_contest_status();

-- Update participant count when someone registers
CREATE OR REPLACE FUNCTION update_contest_participant_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.contests
        SET total_participants = total_participants + 1
        WHERE id = NEW.contest_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.contests
        SET total_participants = GREATEST(0, total_participants - 1)
        WHERE id = OLD.contest_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_participant_count ON public.contest_participants;
CREATE TRIGGER trigger_update_participant_count
    AFTER INSERT OR DELETE ON public.contest_participants
    FOR EACH ROW
    EXECUTE FUNCTION update_contest_participant_count();

-- Update participant stats on successful submission
CREATE OR REPLACE FUNCTION update_participant_on_submission()
RETURNS TRIGGER AS $$
DECLARE
    submission_time_penalty INTEGER;
BEGIN
    -- Only process accepted submissions
    IF NEW.status = 'accepted' THEN
        -- Calculate time penalty (minutes since contest start)
        SELECT EXTRACT(EPOCH FROM (NEW.submitted_at - c.start_time))::INTEGER / 60
        INTO submission_time_penalty
        FROM public.contests c
        WHERE c.id = NEW.contest_id;
        
        -- Update participant record
        UPDATE public.contest_participants
        SET 
            score = score + NEW.score,
            penalty_time = penalty_time + submission_time_penalty,
            problems_solved = problems_solved + 1,
            last_submission_at = NEW.submitted_at
        WHERE contest_id = NEW.contest_id 
        AND user_id = NEW.user_id
        AND NOT EXISTS (
            -- Only count first accepted solution for each problem
            SELECT 1 FROM public.contest_submissions cs
            WHERE cs.contest_id = NEW.contest_id
            AND cs.user_id = NEW.user_id
            AND cs.problem_id = NEW.problem_id
            AND cs.status = 'accepted'
            AND cs.submitted_at < NEW.submitted_at
        );
        
        -- Update problem solved count
        UPDATE public.contest_problems
        SET solved_count = solved_count + 1
        WHERE contest_id = NEW.contest_id 
        AND problem_id = NEW.problem_id
        AND NOT EXISTS (
            SELECT 1 FROM public.contest_submissions cs
            WHERE cs.contest_id = NEW.contest_id
            AND cs.user_id = NEW.user_id
            AND cs.problem_id = NEW.problem_id
            AND cs.status = 'accepted'
            AND cs.submitted_at < NEW.submitted_at
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_participant_stats ON public.contest_submissions;
CREATE TRIGGER trigger_update_participant_stats
    AFTER INSERT ON public.contest_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_participant_on_submission();

-- Calculate and update rankings
CREATE OR REPLACE FUNCTION calculate_contest_rankings(contest_uuid UUID)
RETURNS VOID AS $$
BEGIN
    -- Update ranks based on score (descending) and penalty time (ascending)
    WITH ranked_participants AS (
        SELECT 
            id,
            ROW_NUMBER() OVER (
                ORDER BY score DESC, penalty_time ASC, problems_solved DESC
            ) AS new_rank
        FROM public.contest_participants
        WHERE contest_id = contest_uuid
    )
    UPDATE public.contest_participants cp
    SET rank = rp.new_rank
    FROM ranked_participants rp
    WHERE cp.id = rp.id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 9. Updated_at trigger
-- ============================================

DROP TRIGGER IF EXISTS set_updated_at_contests ON public.contests;
CREATE TRIGGER set_updated_at_contests
    BEFORE UPDATE ON public.contests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 10. Sample Data (Optional - for testing)
-- ============================================

-- Insert sample contest
INSERT INTO public.contests (
    id,
    title,
    description,
    start_time,
    end_time,
    duration,
    status,
    type,
    visibility,
    rules,
    prizes
)
VALUES (
    '00000000-0000-0000-0000-000000000101',
    'AlgoViz Weekly Contest #1',
    'Test your coding skills in this exciting weekly contest! Solve algorithmic problems and compete with others.',
    NOW() + INTERVAL '1 day',
    NOW() + INTERVAL '1 day 2 hours',
    120,
    'upcoming',
    'weekly',
    'public',
    '1. Each problem has a specific point value
2. Earlier submissions get more points
3. Wrong submissions add time penalty
4. Rankings are based on total score and penalty time',
    '🥇 1st Place: Certificate + Recognition
🥈 2nd Place: Certificate
🥉 3rd Place: Certificate'
) ON CONFLICT (id) DO NOTHING;

-- Link existing factorial problem to contest (if exists)
INSERT INTO public.contest_problems (contest_id, problem_id, order_index, points)
SELECT 
    '00000000-0000-0000-0000-000000000101',
    id,
    1,
    100
FROM public.problems 
WHERE title = 'Factorial Calculator'
LIMIT 1
ON CONFLICT DO NOTHING;
