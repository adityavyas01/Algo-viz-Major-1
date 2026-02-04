-- Phase 2: Advanced Testcase System
-- Migration: Enhanced testcase and submission tracking
-- Created: January 2026

-- ============================================
-- 1. Enhanced Testcases Table
-- ============================================

CREATE TABLE IF NOT EXISTS public.testcases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    problem_id UUID NOT NULL,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_hidden BOOLEAN DEFAULT FALSE,
    type VARCHAR(50) DEFAULT 'standard' CHECK (type IN ('standard', 'edge', 'performance', 'stress')),
    time_limit INTEGER DEFAULT 3000, -- milliseconds
    memory_limit INTEGER DEFAULT 256, -- MB
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. Submissions Table
-- ============================================

CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    problem_id UUID NOT NULL,
    code TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'accepted', 'wrong_answer', 'runtime_error', 'time_limit_exceeded', 'compilation_error', 'memory_limit_exceeded')),
    verdict VARCHAR(50),
    total_testcases INTEGER DEFAULT 0,
    passed_testcases INTEGER DEFAULT 0,
    failed_testcases INTEGER DEFAULT 0,
    runtime INTEGER, -- milliseconds
    memory INTEGER, -- KB
    score INTEGER DEFAULT 0,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    judged_at TIMESTAMPTZ
);

-- ============================================
-- 3. Submission Results (per testcase)
-- ============================================

CREATE TABLE IF NOT EXISTS public.submission_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
    testcase_id UUID REFERENCES public.testcases(id) ON DELETE CASCADE NOT NULL,
    passed BOOLEAN DEFAULT FALSE,
    actual_output TEXT,
    error_message TEXT,
    runtime INTEGER, -- milliseconds
    memory INTEGER, -- KB
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. Problem Difficulties & Tags (if not exists)
-- ============================================

CREATE TABLE IF NOT EXISTS public.problems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
    category VARCHAR(100),
    points INTEGER DEFAULT 100,
    time_limit INTEGER DEFAULT 3000,
    memory_limit INTEGER DEFAULT 256,
    acceptance_rate DECIMAL(5,2) DEFAULT 0.00,
    total_submissions INTEGER DEFAULT 0,
    total_accepted INTEGER DEFAULT 0,
    created_by UUID REFERENCES auth.users(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. User Problem Progress
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_problem_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('not_attempted', 'attempted', 'solved')),
    attempts INTEGER DEFAULT 0,
    best_submission_id UUID REFERENCES public.submissions(id),
    first_solved_at TIMESTAMPTZ,
    last_attempted_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, problem_id)
);

-- ============================================
-- 6. Indexes for Performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_testcases_problem_id ON public.testcases(problem_id);
CREATE INDEX IF NOT EXISTS idx_testcases_hidden ON public.testcases(is_hidden);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_problem_id ON public.submissions(problem_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at ON public.submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_submission_results_submission_id ON public.submission_results(submission_id);
CREATE INDEX IF NOT EXISTS idx_user_problem_progress_user_id ON public.user_problem_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_problem_progress_problem_id ON public.user_problem_progress(problem_id);
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON public.problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_problems_category ON public.problems(category);

-- ============================================
-- 7. Row Level Security Policies
-- ============================================

ALTER TABLE public.testcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_problem_progress ENABLE ROW LEVEL SECURITY;

-- Testcases: Users can see non-hidden testcases
DROP POLICY IF EXISTS "Users can view non-hidden testcases" ON public.testcases;
CREATE POLICY "Users can view non-hidden testcases" ON public.testcases
    FOR SELECT USING (is_hidden = FALSE OR auth.role() = 'service_role');

-- Admins can manage testcases
DROP POLICY IF EXISTS "Admins can manage testcases" ON public.testcases;
CREATE POLICY "Admins can manage testcases" ON public.testcases
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_roles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- Submissions: Users can view their own submissions
DROP POLICY IF EXISTS "Users can view own submissions" ON public.submissions;
CREATE POLICY "Users can view own submissions" ON public.submissions
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create submissions" ON public.submissions;
CREATE POLICY "Users can create submissions" ON public.submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Submission Results: Users can view results for their submissions
DROP POLICY IF EXISTS "Users can view own submission results" ON public.submission_results;
CREATE POLICY "Users can view own submission results" ON public.submission_results
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.submissions 
            WHERE id = submission_id AND user_id = auth.uid()
        )
    );

-- Problems: Everyone can view active problems
DROP POLICY IF EXISTS "Anyone can view active problems" ON public.problems;
CREATE POLICY "Anyone can view active problems" ON public.problems
    FOR SELECT USING (is_active = TRUE OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins can manage problems" ON public.problems;
CREATE POLICY "Admins can manage problems" ON public.problems
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.admin_roles 
            WHERE user_id = auth.uid() 
            AND role IN ('super_admin', 'content_admin')
        )
    );

-- User Problem Progress: Users can manage their own progress
DROP POLICY IF EXISTS "Users can manage own progress" ON public.user_problem_progress;
CREATE POLICY "Users can manage own progress" ON public.user_problem_progress
    FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- 8. Functions for automated updates
-- ============================================

-- Update problem acceptance rate
CREATE OR REPLACE FUNCTION update_problem_acceptance_rate()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.problems
    SET 
        total_submissions = total_submissions + 1,
        total_accepted = total_accepted + CASE WHEN NEW.status = 'accepted' THEN 1 ELSE 0 END,
        acceptance_rate = CASE 
            WHEN total_submissions + 1 > 0 
            THEN ((total_accepted + CASE WHEN NEW.status = 'accepted' THEN 1 ELSE 0 END)::DECIMAL / (total_submissions + 1)) * 100
            ELSE 0 
        END
    WHERE id = NEW.problem_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_problem_stats ON public.submissions;
CREATE TRIGGER trigger_update_problem_stats
    AFTER INSERT ON public.submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_problem_acceptance_rate();

-- Update user problem progress on submission
CREATE OR REPLACE FUNCTION update_user_progress_on_submission()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_problem_progress (user_id, problem_id, status, attempts, best_submission_id, last_attempted_at)
    VALUES (
        NEW.user_id, 
        NEW.problem_id,
        CASE WHEN NEW.status = 'accepted' THEN 'solved' ELSE 'attempted' END,
        1,
        CASE WHEN NEW.status = 'accepted' THEN NEW.id ELSE NULL END,
        NOW()
    )
    ON CONFLICT (user_id, problem_id) DO UPDATE SET
        status = CASE 
            WHEN NEW.status = 'accepted' THEN 'solved'
            WHEN user_problem_progress.status = 'solved' THEN 'solved'
            ELSE 'attempted'
        END,
        attempts = user_problem_progress.attempts + 1,
        best_submission_id = CASE 
            WHEN NEW.status = 'accepted' AND (user_problem_progress.best_submission_id IS NULL OR NEW.score > (SELECT score FROM submissions WHERE id = user_problem_progress.best_submission_id))
            THEN NEW.id
            ELSE user_problem_progress.best_submission_id
        END,
        first_solved_at = CASE 
            WHEN NEW.status = 'accepted' AND user_problem_progress.first_solved_at IS NULL 
            THEN NOW()
            ELSE user_problem_progress.first_solved_at
        END,
        last_attempted_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_user_progress ON public.submissions;
CREATE TRIGGER trigger_update_user_progress
    AFTER INSERT ON public.submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_user_progress_on_submission();

-- ============================================
-- 9. Updated_at trigger
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_testcases ON public.testcases;
CREATE TRIGGER set_updated_at_testcases
    BEFORE UPDATE ON public.testcases
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_updated_at_problems ON public.problems;
CREATE TRIGGER set_updated_at_problems
    BEFORE UPDATE ON public.problems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 10. Sample Data (Optional - for testing)
-- ============================================

-- Insert sample problem
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Factorial Calculator',
    'Write a program that reads a non-negative integer n and prints its factorial.',
    'easy',
    'Math',
    100,
    3000
) ON CONFLICT (id) DO NOTHING;

-- Insert sample testcases for factorial problem
INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('00000000-0000-0000-0000-000000000001', '5', '120', FALSE, 'standard', 1),
    ('00000000-0000-0000-0000-000000000001', '3', '6', FALSE, 'standard', 2),
    ('00000000-0000-0000-0000-000000000001', '0', '1', FALSE, 'edge', 3),
    ('00000000-0000-0000-0000-000000000001', '10', '3628800', TRUE, 'standard', 4),
    ('00000000-0000-0000-0000-000000000001', '1', '1', TRUE, 'edge', 5)
ON CONFLICT DO NOTHING;
