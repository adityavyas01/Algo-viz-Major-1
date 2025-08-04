-- Populate database with sample DSA topics and LeetCode questions
INSERT INTO public.dsa_topics (name, category, description, difficulty_level, prerequisites) VALUES
('Arrays', 'Basic Data Structures', 'Learn about arrays, indexing, and basic operations', 1, ARRAY[]::text[]),
('Linked Lists', 'Basic Data Structures', 'Understand node-based data structures', 1, ARRAY['Arrays']),
('Stacks and Queues', 'Basic Data Structures', 'LIFO and FIFO data structures', 2, ARRAY['Arrays']),
('Binary Trees', 'Trees', 'Introduction to tree data structures', 2, ARRAY['Linked Lists']),
('Binary Search Trees', 'Trees', 'Self-organizing tree structures', 3, ARRAY['Binary Trees']),
('Hash Tables', 'Hashing', 'Key-value data structures with O(1) access', 2, ARRAY['Arrays']),
('Graphs', 'Graph Algorithms', 'Vertices and edges representation', 3, ARRAY['Hash Tables']),
('Dynamic Programming', 'Advanced Algorithms', 'Optimization technique using memoization', 4, ARRAY['Graphs']),
('Sorting Algorithms', 'Algorithms', 'Various sorting techniques', 2, ARRAY['Arrays']),
('Search Algorithms', 'Algorithms', 'Linear and binary search methods', 1, ARRAY['Arrays'])
ON CONFLICT (name) DO NOTHING;

-- Add LeetCode questions for different topics
WITH topic_ids AS (
  SELECT id, name FROM public.dsa_topics 
  WHERE name IN ('Arrays', 'Linked Lists', 'Binary Trees', 'Hash Tables', 'Dynamic Programming')
)
INSERT INTO public.leetcode_questions (topic_id, title, difficulty, difficulty_level, leetcode_url, description, problem_number, solution, hints, time_complexity, space_complexity, tags) 
SELECT 
  t.id,
  questions.title,
  questions.difficulty,
  questions.difficulty_level,
  questions.leetcode_url,
  questions.description,
  questions.problem_number,
  questions.solution,
  questions.hints,
  questions.time_complexity,
  questions.space_complexity,
  questions.tags
FROM topic_ids t
CROSS JOIN (
  VALUES 
    ('Two Sum', 'Easy', 1, 'https://leetcode.com/problems/two-sum/', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 1, 'Use a hash map to store complements', ARRAY['Think about what you need to find for each number', 'Use a hash map for O(1) lookups'], 'O(n)', 'O(n)', ARRAY['Array', 'Hash Table']),
    ('Add Two Numbers', 'Medium', 2, 'https://leetcode.com/problems/add-two-numbers/', 'Add two numbers represented as linked lists', 2, 'Traverse both lists simultaneously with carry', ARRAY['Handle carry-over carefully', 'Consider lists of different lengths'], 'O(max(m,n))', 'O(max(m,n))', ARRAY['Linked List', 'Math']),
    ('Binary Tree Inorder Traversal', 'Easy', 1, 'https://leetcode.com/problems/binary-tree-inorder-traversal/', 'Return the inorder traversal of a binary tree', 94, 'Use recursion or iterative with stack', ARRAY['Left -> Root -> Right', 'Can be done iteratively or recursively'], 'O(n)', 'O(h)', ARRAY['Stack', 'Tree', 'Depth-First Search']),
    ('Valid Anagram', 'Easy', 1, 'https://leetcode.com/problems/valid-anagram/', 'Determine if two strings are anagrams', 242, 'Count character frequencies', ARRAY['Count character frequencies', 'Compare the counts'], 'O(n)', 'O(1)', ARRAY['Hash Table', 'String', 'Sorting']),
    ('Climbing Stairs', 'Easy', 1, 'https://leetcode.com/problems/climbing-stairs/', 'Count ways to climb n stairs taking 1 or 2 steps', 70, 'Dynamic programming - Fibonacci sequence', ARRAY['This is similar to Fibonacci', 'Each step depends on previous two'], 'O(n)', 'O(1)', ARRAY['Math', 'Dynamic Programming', 'Memoization'])
) AS questions(title, difficulty, difficulty_level, leetcode_url, description, problem_number, solution, hints, time_complexity, space_complexity, tags)
WHERE 
  (t.name = 'Arrays' AND questions.title IN ('Two Sum', 'Valid Anagram')) OR
  (t.name = 'Linked Lists' AND questions.title = 'Add Two Numbers') OR
  (t.name = 'Binary Trees' AND questions.title = 'Binary Tree Inorder Traversal') OR
  (t.name = 'Hash Tables' AND questions.title IN ('Two Sum', 'Valid Anagram')) OR
  (t.name = 'Dynamic Programming' AND questions.title = 'Climbing Stairs')
ON CONFLICT (problem_number) DO NOTHING;

-- Add more challenges to the challenges table
INSERT INTO public.challenges (title, description, challenge_type, difficulty, problem_statement, sample_input, sample_output, solution, hints, points, time_limit, created_by, topic_id, test_cases, mcq_questions) 
SELECT 
  'Array Manipulation Challenge',
  'Solve array-based problems efficiently',
  'coding',
  'Medium',
  'Given an array of integers, find the maximum subarray sum using Kadane''s algorithm.',
  '[−2,1,−3,4,−1,2,1,−5,4]',
  '6',
  'def maxSubArray(nums): max_sum = current_sum = nums[0]; for num in nums[1:]: current_sum = max(num, current_sum + num); max_sum = max(max_sum, current_sum); return max_sum',
  ARRAY['Consider Kadane''s algorithm', 'Track both current and maximum sums'],
  150,
  1800,
  (SELECT user_id FROM public.profiles LIMIT 1),
  t.id,
  '[{"input": "[-2,1,-3,4,-1,2,1,-5,4]", "output": "6"}, {"input": "[1]", "output": "1"}, {"input": "[5,4,-1,7,8]", "output": "23"}]'::jsonb,
  NULL
FROM public.dsa_topics t WHERE t.name = 'Arrays'
UNION ALL
SELECT 
  'Tree Traversal Quiz',
  'Test your knowledge of tree traversal methods',
  'mcq',
  'Easy',
  'Answer questions about binary tree traversal techniques.',
  NULL,
  NULL,
  NULL,
  ARRAY['Remember the order: Inorder (Left-Root-Right)', 'Preorder (Root-Left-Right)', 'Postorder (Left-Right-Root)'],
  100,
  900,
  (SELECT user_id FROM public.profiles LIMIT 1),
  t.id,
  NULL,
  '[{"question": "What is the correct order for inorder traversal?", "options": ["Root-Left-Right", "Left-Root-Right", "Left-Right-Root", "Right-Left-Root"], "correct": 1}, {"question": "Which traversal visits the root first?", "options": ["Inorder", "Preorder", "Postorder", "Level-order"], "correct": 1}]'::jsonb
FROM public.dsa_topics t WHERE t.name = 'Binary Trees'
ON CONFLICT (title) DO NOTHING;

-- Create some daily challenges
INSERT INTO public.daily_challenges (challenge_id, challenge_date, expires_at, is_active)
SELECT 
  c.id,
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '1 day',
  true
FROM public.challenges c
WHERE c.title IN ('Array Manipulation Challenge', 'Tree Traversal Quiz')
ON CONFLICT (challenge_id, challenge_date) DO NOTHING;