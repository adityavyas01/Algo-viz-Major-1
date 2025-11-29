DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'skill_level') THEN
        CREATE TYPE public.skill_level AS ENUM ('beginner', 'novice', 'intermediate', 'advanced', 'expert');
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'learning_style') THEN
        CREATE TYPE public.learning_style AS ENUM ('visual', 'hands_on', 'theoretical', 'mixed');
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'learning_goal') THEN
        CREATE TYPE public.learning_goal AS ENUM ('interview_prep', 'academic', 'career_change', 'skill_improvement', 'competitive_programming');
    END IF;
END$$;

-- Create DSA topics table
CREATE TABLE IF NOT EXISTS public.dsa_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  difficulty_level INTEGER NOT NULL DEFAULT 1, -- 1-5 scale
  prerequisites TEXT[], -- Array of topic names that should be learned first
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.dsa_topics
ADD CONSTRAINT dsa_topics_name_key UNIQUE (name);

-- Create user assessments table
CREATE TABLE IF NOT EXISTS public.user_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  learning_style learning_style NOT NULL,
  primary_goal learning_goal NOT NULL,
  available_hours_per_week INTEGER NOT NULL DEFAULT 5,
  prior_programming_experience INTEGER NOT NULL DEFAULT 1, -- 1-5 scale
  math_comfort_level INTEGER NOT NULL DEFAULT 1, -- 1-5 scale
  target_timeline_months INTEGER NOT NULL DEFAULT 6,
  preferred_difficulty_progression TEXT NOT NULL DEFAULT 'gradual', -- 'gradual', 'moderate', 'aggressive'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user topic assessments table
CREATE TABLE IF NOT EXISTS public.user_topic_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.user_assessments(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES public.dsa_topics(id) ON DELETE CASCADE,
  confidence_level skill_level NOT NULL,
  experience_level INTEGER NOT NULL DEFAULT 1, -- 1-5 scale
  interest_level INTEGER NOT NULL DEFAULT 3, -- 1-5 scale
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(assessment_id, topic_id)
);

-- Create personalized learning paths table
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  estimated_weeks INTEGER NOT NULL DEFAULT 12,
  difficulty_progression TEXT NOT NULL DEFAULT 'gradual',
  is_active BOOLEAN NOT NULL DEFAULT true,
  completion_percentage INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create learning path modules table
CREATE TABLE IF NOT EXISTS public.learning_path_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path_id UUID NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES public.dsa_topics(id) ON DELETE CASCADE,
  module_order INTEGER NOT NULL,
  estimated_hours INTEGER NOT NULL DEFAULT 4,
  is_unlocked BOOLEAN NOT NULL DEFAULT false,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  unlock_conditions JSONB, -- Conditions to unlock this module
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(path_id, topic_id)
);

-- Enable RLS on all tables
ALTER TABLE public.dsa_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_topic_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_path_modules ENABLE ROW LEVEL SECURITY;

-- Create policies for dsa_topics (readable by all authenticated users)
DROP POLICY IF EXISTS "Anyone can view DSA topics" ON public.dsa_topics;
CREATE POLICY "Anyone can view DSA topics" 
ON public.dsa_topics 
FOR SELECT 
TO authenticated 
USING (true);

-- Create policies for user_assessments
DROP POLICY IF EXISTS "Users can view their own assessments" ON public.user_assessments;
CREATE POLICY "Users can view their own assessments" 
ON public.user_assessments 
FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own assessments" ON public.user_assessments;
CREATE POLICY "Users can insert their own assessments" 
ON public.user_assessments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own assessments" ON public.user_assessments;
CREATE POLICY "Users can update their own assessments" 
ON public.user_assessments 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for user_topic_assessments
DROP POLICY IF EXISTS "Users can view their own topic assessments" ON public.user_topic_assessments;
CREATE POLICY "Users can view their own topic assessments" 
ON public.user_topic_assessments 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.user_assessments 
  WHERE id = assessment_id AND user_id = auth.uid()
));

DROP POLICY IF EXISTS "Users can insert their own topic assessments" ON public.user_topic_assessments;
CREATE POLICY "Users can insert their own topic assessments" 
ON public.user_topic_assessments 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.user_assessments 
  WHERE id = assessment_id AND user_id = auth.uid()
));

-- Create policies for learning_paths
DROP POLICY IF EXISTS "Users can view their own learning paths" ON public.learning_paths;
CREATE POLICY "Users can view their own learning paths" 
ON public.learning_paths 
FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own learning paths" ON public.learning_paths;
CREATE POLICY "Users can insert their own learning paths" 
ON public.learning_paths 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own learning paths" ON public.learning_paths;
CREATE POLICY "Users can update their own learning paths" 
ON public.learning_paths 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for learning_path_modules
DROP POLICY IF EXISTS "Users can view their own learning path modules" ON public.learning_path_modules;
CREATE POLICY "Users can view their own learning path modules" 
ON public.learning_path_modules 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.learning_paths 
  WHERE id = path_id AND user_id = auth.uid()
));

DROP POLICY IF EXISTS "Users can update their own learning path modules" ON public.learning_path_modules;
CREATE POLICY "Users can update their own learning path modules" 
ON public.learning_path_modules 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.learning_paths 
  WHERE id = path_id AND user_id = auth.uid()
));

-- Add trigger for timestamps
DROP TRIGGER IF EXISTS update_user_assessments_updated_at ON public.user_assessments;
CREATE TRIGGER update_user_assessments_updated_at
BEFORE UPDATE ON public.user_assessments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_learning_paths_updated_at ON public.learning_paths;
CREATE TRIGGER update_learning_paths_updated_at
BEFORE UPDATE ON public.learning_paths
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_learning_path_modules_updated_at ON public.learning_path_modules;
CREATE TRIGGER update_learning_path_modules_updated_at
BEFORE UPDATE ON public.learning_path_modules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial DSA topics
INSERT INTO public.dsa_topics (name, category, description, difficulty_level, prerequisites) VALUES
-- Fundamentals
('Time & Space Complexity', 'fundamentals', 'Understanding Big O notation and algorithm analysis', 1, '{}'),
('Basic Programming Concepts', 'fundamentals', 'Variables, loops, conditionals, functions', 1, '{}'),
('Recursion', 'fundamentals', 'Understanding recursive thinking and implementation', 2, '{Basic Programming Concepts}'),

-- Data Structures - Basic
('Arrays', 'data_structures', 'Linear collection of elements with fixed size', 1, '{Basic Programming Concepts}'),
('Strings', 'data_structures', 'Character arrays and string manipulation', 1, '{Arrays}'),
('Linked Lists', 'data_structures', 'Dynamic linear data structure with nodes', 2, '{Arrays}'),
('Stacks', 'data_structures', 'LIFO (Last In First Out) data structure', 2, '{Arrays}'),
('Queues', 'data_structures', 'FIFO (First In First Out) data structure', 2, '{Arrays}'),

-- Data Structures - Intermediate
('Trees', 'data_structures', 'Hierarchical data structure with nodes', 3, '{Linked Lists, Recursion}'),
('Binary Search Trees', 'data_structures', 'Ordered binary trees for efficient searching', 3, '{Trees}'),
('Heaps', 'data_structures', 'Complete binary trees with heap property', 3, '{Trees}'),
('Hash Tables', 'data_structures', 'Key-value pairs with O(1) average access', 3, '{Arrays}'),
('Graphs', 'data_structures', 'Nodes connected by edges', 4, '{Trees}'),

-- Data Structures - Advanced
('Balanced Trees (AVL, Red-Black)', 'data_structures', 'Self-balancing binary search trees', 4, '{Binary Search Trees}'),
('Tries', 'data_structures', 'Tree structure for string storage and retrieval', 4, '{Trees, Strings}'),
('Segment Trees', 'data_structures', 'Binary tree for range queries', 5, '{Trees}'),
('Disjoint Set (Union-Find)', 'data_structures', 'Data structure for disjoint set operations', 4, '{Trees}'),

-- Algorithms - Sorting & Searching
('Linear Search', 'algorithms', 'Sequential search through elements', 1, '{Arrays}'),
('Binary Search', 'algorithms', 'Efficient search in sorted arrays', 2, '{Arrays, Time & Space Complexity}'),
('Bubble Sort', 'algorithms', 'Simple comparison-based sorting', 1, '{Arrays}'),
('Selection Sort', 'algorithms', 'In-place comparison sorting', 1, '{Arrays}'),
('Insertion Sort', 'algorithms', 'Building sorted array one element at a time', 2, '{Arrays}'),
('Merge Sort', 'algorithms', 'Divide and conquer sorting algorithm', 3, '{Recursion, Arrays}'),
('Quick Sort', 'algorithms', 'Efficient divide and conquer sorting', 3, '{Recursion, Arrays}'),
('Heap Sort', 'algorithms', 'Sorting using heap data structure', 4, '{Heaps}'),

-- Algorithms - Graph
('Graph Traversal (BFS/DFS)', 'algorithms', 'Breadth-first and depth-first search', 3, '{Graphs, Queues, Stacks}'),
('Shortest Path (Dijkstra)', 'algorithms', 'Finding shortest paths in weighted graphs', 4, '{Graphs, Heaps}'),
('Minimum Spanning Tree', 'algorithms', 'Kruskal and Prim algorithms', 4, '{Graphs, Disjoint Set}'),
('Topological Sort', 'algorithms', 'Linear ordering of vertices in DAG', 4, '{Graphs, Graph Traversal (BFS/DFS)}'),

-- Algorithms - Dynamic Programming
('Basic Dynamic Programming', 'algorithms', 'Solving problems by breaking into subproblems', 4, '{Recursion, Time & Space Complexity}'),
('Advanced Dynamic Programming', 'algorithms', 'Complex DP patterns and optimizations', 5, '{Basic Dynamic Programming}'),

-- Algorithms - Advanced
('Backtracking', 'algorithms', 'Systematic way to iterate through possibilities', 4, '{Recursion}'),
('Greedy Algorithms', 'algorithms', 'Making locally optimal choices', 3, '{Time & Space Complexity}'),
('String Algorithms', 'algorithms', 'Pattern matching and string processing', 4, '{Strings}'),
('Number Theory', 'algorithms', 'Mathematical algorithms and concepts', 4, '{Basic Programming Concepts}')
ON CONFLICT (name) DO NOTHING;

-- Function to generate personalized learning path
CREATE OR REPLACE FUNCTION public.generate_learning_path(user_assessment_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  path_id UUID;
  user_id UUID;
  assessment_data RECORD;
  topic RECORD;
  module_order INT := 1;
  path_name TEXT;
  path_description TEXT;
BEGIN
  -- Get assessment data
  SELECT ua.user_id, ua.learning_style, ua.primary_goal, ua.available_hours_per_week, 
         ua.prior_programming_experience, ua.target_timeline_months
  INTO assessment_data
  FROM public.user_assessments ua
  WHERE ua.id = user_assessment_id;
  
  user_id := assessment_data.user_id;
  
  -- Generate path name based on goal
  CASE assessment_data.primary_goal
    WHEN 'interview_prep' THEN 
      path_name := 'Interview Mastery Path';
      path_description := 'Focused preparation for technical interviews with emphasis on problem-solving patterns';
    WHEN 'competitive_programming' THEN 
      path_name := 'Competitive Programming Path';
      path_description := 'Advanced algorithms and data structures for competitive programming';
    WHEN 'career_change' THEN 
      path_name := 'Career Transition Path';
      path_description := 'Comprehensive foundation building for software engineering career';
    ELSE 
      path_name := 'Comprehensive DSA Path';
      path_description := 'Complete data structures and algorithms learning journey';
  END CASE;
  
  -- Create learning path
  INSERT INTO public.learning_paths (user_id, name, description, estimated_weeks)
  VALUES (user_id, path_name, path_description, assessment_data.target_timeline_months * 4)
  RETURNING id INTO path_id;
  
  -- Add modules based on user's confidence levels and goals
  FOR topic IN 
    SELECT dt.id, dt.name, dt.difficulty_level,
           COALESCE(uta.confidence_level::text, 'beginner') as confidence,
           COALESCE(uta.interest_level, 3) as interest
    FROM public.dsa_topics dt
    LEFT JOIN public.user_topic_assessments uta ON dt.id = uta.topic_id 
      AND uta.assessment_id = user_assessment_id
    ORDER BY 
      dt.difficulty_level,
      CASE WHEN uta.confidence_level = 'beginner' THEN 1
           WHEN uta.confidence_level = 'novice' THEN 2
           WHEN uta.confidence_level = 'intermediate' THEN 3
           WHEN uta.confidence_level = 'advanced' THEN 4
           ELSE 5 END,
      uta.interest_level DESC NULLS LAST
  LOOP
    INSERT INTO public.learning_path_modules (
      path_id, topic_id, module_order, estimated_hours, 
      is_unlocked, unlock_conditions
    ) VALUES (
      path_id, topic.id, module_order, 
      CASE WHEN topic.difficulty_level <= 2 THEN 3
           WHEN topic.difficulty_level = 3 THEN 5
           WHEN topic.difficulty_level = 4 THEN 7
           ELSE 10 END,
      CASE WHEN module_order = 1 THEN true ELSE false END,
      CASE WHEN module_order = 1 THEN NULL 
           ELSE jsonb_build_object('requires_previous_completion', true) END
    );
    
    module_order := module_order + 1;
  END LOOP;
  
  RETURN path_id;
END;
$$;