-- Create challenges table for storing coding challenges
CREATE TABLE public.challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge_type TEXT NOT NULL CHECK (challenge_type IN ('coding', 'mcq')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points INTEGER NOT NULL DEFAULT 100,
  time_limit INTEGER NOT NULL DEFAULT 1800, -- seconds
  topic_id UUID REFERENCES public.dsa_topics(id) ON DELETE SET NULL,
  problem_statement TEXT,
  sample_input TEXT,
  sample_output TEXT,
  test_cases JSONB, -- For coding challenges
  mcq_questions JSONB, -- For MCQ challenges
  solution TEXT,
  hints TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID NOT NULL, -- Admin who created it
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user challenge attempts table
CREATE TABLE public.user_challenge_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed', 'failed', 'timeout')),
  score INTEGER DEFAULT 0,
  time_taken INTEGER, -- seconds
  submission_code TEXT, -- For coding challenges
  mcq_answers JSONB, -- For MCQ challenges
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create daily challenges table
CREATE TABLE public.daily_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  challenge_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '1 day'),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(challenge_date, challenge_id)
);

-- Create admin roles table (separate from user roles for security)
CREATE TABLE public.admin_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'challenge_admin', 'content_admin')),
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

-- Policies for challenges table
CREATE POLICY "Anyone can view active challenges" 
ON public.challenges 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage challenges" 
ON public.challenges 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_roles 
  WHERE user_id = auth.uid() 
  AND role IN ('super_admin', 'challenge_admin')
));

-- Policies for user challenge attempts
CREATE POLICY "Users can view their own attempts" 
ON public.user_challenge_attempts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own attempts" 
ON public.user_challenge_attempts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own attempts" 
ON public.user_challenge_attempts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all attempts" 
ON public.user_challenge_attempts 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.admin_roles 
  WHERE user_id = auth.uid() 
  AND role IN ('super_admin', 'challenge_admin')
));

-- Policies for daily challenges
CREATE POLICY "Anyone can view daily challenges" 
ON public.daily_challenges 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage daily challenges" 
ON public.daily_challenges 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_roles 
  WHERE user_id = auth.uid() 
  AND role IN ('super_admin', 'challenge_admin')
));

-- Policies for admin roles
CREATE POLICY "Admins can view admin roles" 
ON public.admin_roles 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.admin_roles ar 
  WHERE ar.user_id = auth.uid() 
  AND ar.role = 'super_admin'
));

CREATE POLICY "Super admins can manage admin roles" 
ON public.admin_roles 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_roles ar 
  WHERE ar.user_id = auth.uid() 
  AND ar.role = 'super_admin'
));

-- Add indexes for better performance
CREATE INDEX idx_challenges_topic_id ON public.challenges(topic_id);
CREATE INDEX idx_challenges_difficulty ON public.challenges(difficulty);
CREATE INDEX idx_challenges_type ON public.challenges(challenge_type);
CREATE INDEX idx_user_challenge_attempts_user_id ON public.user_challenge_attempts(user_id);
CREATE INDEX idx_user_challenge_attempts_challenge_id ON public.user_challenge_attempts(challenge_id);
CREATE INDEX idx_daily_challenges_date ON public.daily_challenges(challenge_date);
CREATE INDEX idx_admin_roles_user_id ON public.admin_roles(user_id);

-- Add triggers for automatic timestamp updates
CREATE TRIGGER update_challenges_updated_at
BEFORE UPDATE ON public.challenges
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample challenges
INSERT INTO public.challenges (title, description, challenge_type, difficulty, points, time_limit, problem_statement, sample_input, sample_output, test_cases, solution, hints, created_by) VALUES
('Two Sum Challenge', 'Find two numbers in an array that add up to a target', 'coding', 'easy', 100, 1800, 
'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.', 
'nums = [2,7,11,15], target = 9', 
'[0,1]', 
'[{"input": "[2,7,11,15], 9", "expected": "[0,1]"}, {"input": "[3,2,4], 6", "expected": "[1,2]"}]'::jsonb,
'Use a hash map to store numbers and their indices. For each number, check if target - number exists in the map.',
ARRAY['Use a hash map for O(1) lookup', 'Think about what you need to store'],
'00000000-0000-0000-0000-000000000000'),

('Array MCQ Challenge', 'Test your knowledge of array operations', 'mcq', 'easy', 75, 600, 
'Answer questions about array data structure and operations', 
NULL, NULL,
'[
  {
    "question": "What is the time complexity of accessing an element by index in an array?",
    "options": ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    "correct": 0,
    "explanation": "Array elements can be accessed directly by index in constant time."
  },
  {
    "question": "Which operation is NOT typically O(1) for arrays?",
    "options": ["Access by index", "Insert at end", "Insert at beginning", "Get length"],
    "correct": 2,
    "explanation": "Inserting at the beginning requires shifting all existing elements."
  }
]'::jsonb,
'Review array fundamentals and time complexities',
ARRAY['Remember that arrays provide constant-time access', 'Consider what happens when you modify the array structure'],
'00000000-0000-0000-0000-000000000000'),

('Binary Search Implementation', 'Implement binary search algorithm efficiently', 'coding', 'medium', 150, 2400,
'Implement the binary search algorithm to find a target value in a sorted array. Return the index if found, -1 if not found.',
'arr = [1,2,3,4,5,6,7,8,9], target = 5',
'4',
'[{"input": "[1,2,3,4,5,6,7,8,9], 5", "expected": "4"}, {"input": "[1,3,5,7,9], 2", "expected": "-1"}]'::jsonb,
'Use two pointers (left and right) and compare middle element with target. Adjust pointers based on comparison.',
ARRAY['Start with left=0 and right=length-1', 'Calculate middle as (left+right)/2', 'Update pointers to narrow search space'],
'00000000-0000-0000-0000-000000000000');

-- Insert today's daily challenges
INSERT INTO public.daily_challenges (challenge_id, challenge_date) 
SELECT id, CURRENT_DATE 
FROM public.challenges 
WHERE title IN ('Two Sum Challenge', 'Array MCQ Challenge') 
LIMIT 2; 