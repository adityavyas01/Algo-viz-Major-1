-- Add sample data to existing tables
INSERT INTO public.leetcode_questions (topic_id, title, difficulty, difficulty_level, leetcode_url, description, problem_number, solution, hints, time_complexity, space_complexity, tags) 
SELECT 
  (SELECT id FROM public.dsa_topics WHERE name = 'Arrays' LIMIT 1),
  'Two Sum',
  'Easy',
  1,
  'https://leetcode.com/problems/two-sum/',
  'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  1,
  'Use a hash map to store complements',
  ARRAY['Think about what you need to find for each number', 'Use a hash map for O(1) lookups'],
  'O(n)',
  'O(n)',
  ARRAY['Array', 'Hash Table']
WHERE NOT EXISTS (SELECT 1 FROM public.leetcode_questions WHERE problem_number = 1);

INSERT INTO public.leetcode_questions (topic_id, title, difficulty, difficulty_level, leetcode_url, description, problem_number, solution, hints, time_complexity, space_complexity, tags) 
SELECT 
  (SELECT id FROM public.dsa_topics WHERE name = 'Linked Lists' LIMIT 1),
  'Add Two Numbers',
  'Medium',
  2,
  'https://leetcode.com/problems/add-two-numbers/',
  'Add two numbers represented as linked lists',
  2,
  'Traverse both lists simultaneously with carry',
  ARRAY['Handle carry-over carefully', 'Consider lists of different lengths'],
  'O(max(m,n))',
  'O(max(m,n))',
  ARRAY['Linked List', 'Math']
WHERE NOT EXISTS (SELECT 1 FROM public.leetcode_questions WHERE problem_number = 2);

INSERT INTO public.leetcode_questions (topic_id, title, difficulty, difficulty_level, leetcode_url, description, problem_number, solution, hints, time_complexity, space_complexity, tags) 
SELECT 
  (SELECT id FROM public.dsa_topics WHERE name = 'Binary Trees' LIMIT 1),
  'Binary Tree Inorder Traversal',
  'Easy',
  1,
  'https://leetcode.com/problems/binary-tree-inorder-traversal/',
  'Return the inorder traversal of a binary tree',
  94,
  'Use recursion or iterative with stack',
  ARRAY['Left -> Root -> Right', 'Can be done iteratively or recursively'],
  'O(n)',
  'O(h)',
  ARRAY['Stack', 'Tree', 'Depth-First Search']
WHERE NOT EXISTS (SELECT 1 FROM public.leetcode_questions WHERE problem_number = 94);