-- Create challenges table
CREATE TABLE public.challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('coding', 'mcq')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points INTEGER NOT NULL DEFAULT 100,
  time_limit INTEGER, -- in minutes
  test_cases JSONB, -- for coding challenges
  options JSONB, -- for MCQ challenges  
  correct_answer TEXT, -- for MCQ challenges
  starter_code TEXT, -- for coding challenges
  solution TEXT, -- hidden from users
  tags TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user challenge attempts table
CREATE TABLE public.user_challenge_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  challenge_id UUID NOT NULL REFERENCES public.challenges(id),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  score INTEGER DEFAULT 0,
  submission_code TEXT,
  submission_answer TEXT,
  time_taken INTEGER, -- in seconds
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create daily challenges table
CREATE TABLE public.daily_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id),
  challenge_date DATE NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin roles table
CREATE TABLE public.admin_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'content_admin', 'moderator')),
  permissions JSONB NOT NULL DEFAULT '[]',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for challenges
CREATE POLICY "Challenges are viewable by everyone" 
ON public.challenges 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can create challenges" 
ON public.challenges 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'content_admin')
  )
);

CREATE POLICY "Admins can update challenges" 
ON public.challenges 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'content_admin')
  )
);

CREATE POLICY "Admins can delete challenges" 
ON public.challenges 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'content_admin')
  )
);

-- RLS Policies for user_challenge_attempts
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
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE user_id = auth.uid()
  )
);

-- RLS Policies for daily_challenges
CREATE POLICY "Daily challenges are viewable by everyone" 
ON public.daily_challenges 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage daily challenges" 
ON public.daily_challenges 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('super_admin', 'content_admin')
  )
);

-- RLS Policies for admin_roles
CREATE POLICY "Users can view their own admin role" 
ON public.admin_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Super admins can manage all admin roles" 
ON public.admin_roles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_roles 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin'
  )
);

-- Create indexes for better performance
CREATE INDEX idx_challenges_type ON public.challenges(type);
CREATE INDEX idx_challenges_difficulty ON public.challenges(difficulty);
CREATE INDEX idx_challenges_is_active ON public.challenges(is_active);
CREATE INDEX idx_challenges_tags ON public.challenges USING GIN(tags);
CREATE INDEX idx_user_challenge_attempts_user_id ON public.user_challenge_attempts(user_id);
CREATE INDEX idx_user_challenge_attempts_challenge_id ON public.user_challenge_attempts(challenge_id);
CREATE INDEX idx_user_challenge_attempts_status ON public.user_challenge_attempts(status);
CREATE INDEX idx_daily_challenges_date ON public.daily_challenges(challenge_date);
CREATE INDEX idx_admin_roles_user_id ON public.admin_roles(user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_challenges_updated_at
  BEFORE UPDATE ON public.challenges
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_roles_updated_at
  BEFORE UPDATE ON public.admin_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample challenges
INSERT INTO public.challenges (title, description, type, difficulty, points, time_limit, test_cases, starter_code, solution, tags) VALUES
(
  'Two Sum',
  'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  'coding',
  'easy',
  100,
  30,
  '[
    {"input": {"nums": [2,7,11,15], "target": 9}, "output": [0,1]},
    {"input": {"nums": [3,2,4], "target": 6}, "output": [1,2]},
    {"input": {"nums": [3,3], "target": 6}, "output": [0,1]}
  ]'::jsonb,
  'function twoSum(nums, target) {
    // Your code here
    
}',
  'function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}',
  ARRAY['array', 'hash-table', 'easy']
),
(
  'Binary Search Basics',
  'What is the time complexity of binary search algorithm?',
  'mcq',
  'easy',
  50,
  5,
  NULL,
  NULL,
  'O(log n)',
  ARRAY['algorithms', 'complexity']
);

-- Add options for MCQ
UPDATE public.challenges 
SET options = '[
  {"id": "a", "text": "O(n)"},
  {"id": "b", "text": "O(log n)"},
  {"id": "c", "text": "O(n²)"},
  {"id": "d", "text": "O(1)"}
]'::jsonb
WHERE type = 'mcq';

-- Set today's daily challenge
INSERT INTO public.daily_challenges (challenge_id, challenge_date)
SELECT id, CURRENT_DATE
FROM public.challenges
LIMIT 1;