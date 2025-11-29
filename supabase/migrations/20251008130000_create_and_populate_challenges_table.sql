-- This file is intentionally left empty.
-- The `challenges` table is already created and populated by the `20250714000000_challenges_system.sql` migration.
-- The contents of this file were based on an old schema and caused conflicts.
-- Commenting out the original content to resolve the migration error.

-- -- 1. Create the challenges table
-- -- This is redundant as the table is created in a previous migration.
-- -- CREATE TABLE IF NOT EXISTS public.challenges (
-- --   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
-- --   title TEXT NOT NULL,
-- --   category TEXT NOT NULL,
-- --   difficulty TEXT NOT NULL,
-- --   points INTEGER NOT NULL,
-- --   problem_data JSONB NOT NULL,
-- --   created_at TIMESTAMPTZ DEFAULT now()
-- -- );

-- -- -- 2. Enable RLS
-- -- ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

-- -- -- 3. Create Policies
-- -- DROP POLICY IF EXISTS "Allow public read access" ON public.challenges;
-- -- CREATE POLICY "Allow public read access" ON public.challenges FOR SELECT USING (true);

-- -- DROP POLICY IF EXISTS "Disallow mutations from client-side" ON public.challenges;
-- -- CREATE POLICY "Disallow mutations from client-side" ON public.challenges FOR ALL USING (false);


-- -- 2. Populate the challenges table with data
-- -- This is also redundant and uses an incorrect schema (the 'category' column does not exist).
-- -- INSERT INTO public.challenges (id, title, category, difficulty, points, problem_data) VALUES
-- -- ...
-- -- ON CONFLICT DO NOTHING;