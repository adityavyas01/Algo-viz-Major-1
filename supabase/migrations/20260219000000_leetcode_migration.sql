-- ============================================
-- LeetCode Dataset Migration
-- Date: February 19, 2026
-- Adds all LeetCode-specific fields to problems table
-- ============================================

BEGIN;

-- Drop old problems table and recreate with new schema
DROP TABLE IF EXISTS public.user_problem_progress CASCADE;
DROP TABLE IF EXISTS public.submission_results CASCADE;
DROP TABLE IF EXISTS public.submissions CASCADE;
DROP TABLE IF EXISTS public.testcases CASCADE;
DROP TABLE IF EXISTS public.contest_problems CASCADE;
DROP TABLE IF EXISTS public.problems CASCADE;

-- ============================================
-- Problems Table with LeetCode Fields
-- ============================================

CREATE TABLE public.problems (
    id INTEGER PRIMARY KEY,  -- Use LeetCode problem ID
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    is_premium BOOLEAN DEFAULT FALSE,
    difficulty VARCHAR(20) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    solution_link TEXT,
    acceptance_rate DECIMAL(5,2) DEFAULT 0.00,
    frequency DECIMAL(10,6) DEFAULT 0.0,
    url TEXT,
    discuss_count INTEGER DEFAULT 0,
    accepted BIGINT DEFAULT 0,
    submissions BIGINT DEFAULT 0,
    companies JSONB DEFAULT '[]'::jsonb,
    related_topics JSONB DEFAULT '[]'::jsonb,
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    rating DECIMAL(10,6) DEFAULT 0.000000,
    asked_by_faang BOOLEAN DEFAULT FALSE,
    similar_questions JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Testcases Table (Updated FK)
-- ============================================

CREATE TABLE public.testcases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    problem_id INTEGER REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_hidden BOOLEAN DEFAULT FALSE,
    type VARCHAR(50) DEFAULT 'standard' CHECK (type IN ('standard', 'edge', 'performance', 'stress')),
    time_limit INTEGER DEFAULT 3000,
    memory_limit INTEGER DEFAULT 256,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Submissions Table (Updated FK)
-- ============================================

CREATE TABLE public.submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    problem_id INTEGER REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    code TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'accepted', 'wrong_answer', 'runtime_error', 'time_limit_exceeded', 'compilation_error', 'memory_limit_exceeded')),
    verdict VARCHAR(50),
    total_testcases INTEGER DEFAULT 0,
    passed_testcases INTEGER DEFAULT 0,
    failed_testcases INTEGER DEFAULT 0,
    runtime INTEGER,
    memory INTEGER,
    score INTEGER DEFAULT 0,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    judged_at TIMESTAMPTZ
);

-- ============================================
-- Submission Results Table
-- ============================================

CREATE TABLE public.submission_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
    testcase_id UUID REFERENCES public.testcases(id) ON DELETE CASCADE NOT NULL,
    passed BOOLEAN DEFAULT FALSE,
    actual_output TEXT,
    error_message TEXT,
    runtime INTEGER,
    memory INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- User Problem Progress (Updated FK)
-- ============================================

CREATE TABLE public.user_problem_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    problem_id INTEGER REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('not_attempted', 'attempted', 'solved')),
    attempts INTEGER DEFAULT 0,
    best_submission_id UUID REFERENCES public.submissions(id),
    first_solved_at TIMESTAMPTZ,
    last_attempted_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, problem_id)
);

-- ============================================
-- Contest Problems (Updated FK)
-- ============================================

CREATE TABLE public.contest_problems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contest_id UUID REFERENCES public.contests(id) ON DELETE CASCADE NOT NULL,
    problem_id INTEGER REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
    order_index INTEGER DEFAULT 0,
    points INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(contest_id, problem_id)
);

-- ============================================
-- Indexes for Performance
-- ============================================

CREATE INDEX idx_problems_difficulty ON public.problems(difficulty);
CREATE INDEX idx_problems_is_premium ON public.problems(is_premium);
CREATE INDEX idx_problems_asked_by_faang ON public.problems(asked_by_faang);
CREATE INDEX idx_problems_acceptance_rate ON public.problems(acceptance_rate);
CREATE INDEX idx_problems_frequency ON public.problems(frequency DESC);
CREATE INDEX idx_problems_likes ON public.problems(likes DESC);
CREATE INDEX idx_problems_rating ON public.problems(rating DESC);
CREATE INDEX idx_problems_companies ON public.problems USING GIN(companies);
CREATE INDEX idx_problems_related_topics ON public.problems USING GIN(related_topics);

CREATE INDEX idx_testcases_problem_id ON public.testcases(problem_id);
CREATE INDEX idx_testcases_hidden ON public.testcases(is_hidden);

CREATE INDEX idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON public.submissions(problem_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);
CREATE INDEX idx_submissions_submitted_at ON public.submissions(submitted_at DESC);

CREATE INDEX idx_submission_results_submission_id ON public.submission_results(submission_id);

CREATE INDEX idx_user_problem_progress_user_id ON public.user_problem_progress(user_id);
CREATE INDEX idx_user_problem_progress_problem_id ON public.user_problem_progress(problem_id);

-- ============================================
-- Row Level Security Policies
-- ============================================

ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_problem_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contest_problems ENABLE ROW LEVEL SECURITY;

-- Problems: Everyone can read, only admins can write
CREATE POLICY "Anyone can view problems" ON public.problems FOR SELECT USING (true);
CREATE POLICY "Admins can manage problems" ON public.problems FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
);

-- Testcases: Everyone can read visible, admins see all
CREATE POLICY "Anyone can view visible testcases" ON public.testcases FOR SELECT USING (
    is_hidden = false OR EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
);
CREATE POLICY "Admins can manage testcases" ON public.testcases FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
);

-- Submissions: Users can manage their own
CREATE POLICY "Users can view own submissions" ON public.submissions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own submissions" ON public.submissions FOR INSERT WITH CHECK (user_id = auth.uid());

-- Submission Results: Users can view their own
CREATE POLICY "Users can view own submission results" ON public.submission_results FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.submissions WHERE id = submission_id AND user_id = auth.uid())
);

-- User Progress: Users can manage their own
CREATE POLICY "Users can view own progress" ON public.user_problem_progress FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own progress" ON public.user_problem_progress FOR ALL USING (user_id = auth.uid());

-- Contest Problems: Everyone can view
CREATE POLICY "Anyone can view contest problems" ON public.contest_problems FOR SELECT USING (true);
CREATE POLICY "Admins can manage contest problems" ON public.contest_problems FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_roles WHERE user_id = auth.uid())
);

COMMIT;
