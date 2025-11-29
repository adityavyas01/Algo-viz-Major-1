-- Create LeetCode questions table
CREATE TABLE IF NOT EXISTS public.leetcode_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID NOT NULL,
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  difficulty_level INTEGER NOT NULL CHECK (difficulty_level BETWEEN 1 AND 10),
  leetcode_url TEXT NOT NULL,
  problem_number INTEGER,
  description TEXT,
  solution TEXT,
  hints TEXT[],
  time_complexity TEXT,
  space_complexity TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leetcode_questions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (since these are learning resources)
DROP POLICY IF EXISTS "Anyone can view LeetCode questions" ON public.leetcode_questions;
CREATE POLICY "Anyone can view LeetCode questions" 
ON public.leetcode_questions 
FOR SELECT 
USING (true);

-- Add foreign key constraint
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leetcode_questions_topic_id_fkey') THEN
        ALTER TABLE public.leetcode_questions 
        ADD CONSTRAINT leetcode_questions_topic_id_fkey 
        FOREIGN KEY (topic_id) REFERENCES public.dsa_topics(id) ON DELETE CASCADE;
    END IF;
END$$;

-- CREATE INDEX IF NOT EXISTS for better query performance
CREATE INDEX IF NOT EXISTS idx_leetcode_questions_topic_id ON public.leetcode_questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_leetcode_questions_difficulty_level ON public.leetcode_questions(difficulty_level);

-- Add trigger for automatic timestamp updates
DROP TRIGGER IF EXISTS update_leetcode_questions_updated_at ON public.leetcode_questions;
CREATE TRIGGER update_leetcode_questions_updated_at
BEFORE UPDATE ON public.leetcode_questions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample LeetCode questions for different topics
INSERT INTO public.leetcode_questions (topic_id, title, difficulty, difficulty_level, leetcode_url, problem_number, description, solution, hints, time_complexity, space_complexity, tags) VALUES
-- For Arrays topic (assuming there's an arrays topic)
((SELECT id FROM public.dsa_topics WHERE name ILIKE '%array%' LIMIT 1), 'Two Sum', 'Easy', 1, 'https://leetcode.com/problems/two-sum/', 1, 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 'Use a hash map to store numbers and their indices. For each number, check if target - number exists in the map.', ARRAY['Use a hash map for O(1) lookup', 'Think about what you need to store to avoid checking the same element twice'], 'O(n)', 'O(n)', ARRAY['Array', 'Hash Table']),
((SELECT id FROM public.dsa_topics WHERE name ILIKE '%array%' LIMIT 1), 'Best Time to Buy and Sell Stock', 'Easy', 2, 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', 121, 'You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.', 'Keep track of minimum price seen so far and maximum profit possible.', ARRAY['Track the minimum price as you iterate', 'Calculate profit at each step'], 'O(n)', 'O(1)', ARRAY['Array', 'Dynamic Programming']),
((SELECT id FROM public.dsa_topics WHERE name ILIKE '%array%' LIMIT 1), 'Maximum Subarray', 'Medium', 4, 'https://leetcode.com/problems/maximum-subarray/', 53, 'Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.', 'Use Kadane''s algorithm. Keep track of current sum and maximum sum seen so far.', ARRAY['Think about when to start a new subarray', 'Kadane''s algorithm'], 'O(n)', 'O(1)', ARRAY['Array', 'Dynamic Programming'])
ON CONFLICT (title) DO NOTHING;
