-- Seed algorithm categories and data
INSERT INTO public.dsa_topics (name, description, difficulty, category, learning_path_order, created_at) VALUES
('Arrays', 'Learn array manipulation and traversal techniques', 'Beginner', 'Data Structures', 1, NOW()),
('Linked Lists', 'Master linked list operations and algorithms', 'Beginner', 'Data Structures', 2, NOW()),
('Stacks & Queues', 'Understand LIFO and FIFO data structures', 'Beginner', 'Data Structures', 3, NOW()),
('Trees', 'Binary trees, BST, and tree traversals', 'Intermediate', 'Data Structures', 4, NOW()),
('Graphs', 'Graph algorithms and traversal methods', 'Intermediate', 'Data Structures', 5, NOW()),
('Sorting', 'Various sorting algorithms and their complexities', 'Beginner', 'Algorithms', 6, NOW()),
('Searching', 'Binary search and search optimization', 'Beginner', 'Algorithms', 7, NOW()),
('Dynamic Programming', 'Optimization through memorization', 'Advanced', 'Algorithms', 8, NOW()),
('Greedy Algorithms', 'Making locally optimal choices', 'Intermediate', 'Algorithms', 9, NOW()),
('Backtracking', 'Systematic search through solution space', 'Advanced', 'Algorithms', 10, NOW())
ON CONFLICT (name) DO NOTHING;

-- Seed LeetCode questions
INSERT INTO public.leetcode_questions (title, difficulty, topic, problem_statement, solution, hints, time_complexity, space_complexity, created_at) VALUES
('Two Sum', 'easy', 'Arrays', 
'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
'Use a hash map to store complement values and their indices for O(n) solution.',
'["Think about what you need to find for each number", "A hash map can help you look up values quickly"]',
'O(n)', 'O(n)', NOW()),

('Add Two Numbers', 'medium', 'Linked Lists',
'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.',
'Traverse both lists simultaneously, handling carry-over between digits.',
'["Process digits from least significant to most significant", "Don''t forget to handle carry-over"]',
'O(max(m,n))', 'O(max(m,n))', NOW()),

('Longest Substring Without Repeating Characters', 'medium', 'Arrays',
'Given a string s, find the length of the longest substring without repeating characters.',
'Use sliding window technique with a hash set to track characters.',
'["Sliding window technique can be useful", "Keep track of characters you''ve seen"]',
'O(n)', 'O(min(m,n))', NOW()),

('Valid Parentheses', 'easy', 'Stacks & Queues',
'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.',
'Use a stack to match opening and closing brackets.',
'["Stack data structure is perfect for this", "Match each closing bracket with its corresponding opening bracket"]',
'O(n)', 'O(n)', NOW()),

('Binary Tree Inorder Traversal', 'easy', 'Trees',
'Given the root of a binary tree, return the inorder traversal of its nodes'' values.',
'Use recursion or iterative approach with stack.',
'["Inorder: left, root, right", "Both recursive and iterative solutions are possible"]',
'O(n)', 'O(n)', NOW()),

('Maximum Subarray', 'medium', 'Dynamic Programming',
'Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.',
'Use Kadane''s algorithm for optimal O(n) solution.',
'["Consider the maximum sum ending at each position", "Sometimes it''s better to start fresh than continue"]',
'O(n)', 'O(1)', NOW()),

('Best Time to Buy and Sell Stock', 'easy', 'Arrays',
'You are given an array prices where prices[i] is the price of a given stock on the ith day. Find maximum profit.',
'Track the minimum price seen so far and calculate profit at each step.',
'["Keep track of the minimum price so far", "Calculate profit at each day"]',
'O(n)', 'O(1)', NOW()),

('Merge Intervals', 'medium', 'Arrays',
'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
'Sort intervals by start time, then merge overlapping ones.',
'["Sort the intervals first", "Check if current interval overlaps with the previous one"]',
'O(n log n)', 'O(1)', NOW()),

('Course Schedule', 'medium', 'Graphs',
'There are numCourses courses labeled from 0 to numCourses - 1. Given prerequisites array, return true if you can finish all courses.',
'Use topological sorting to detect cycles in directed graph.',
'["This is a cycle detection problem", "Topological sorting can help"]',
'O(V + E)', 'O(V + E)', NOW()),

('N-Queens', 'hard', 'Backtracking',
'The n-queens puzzle is the problem of placing n chess queens on an n×n chessboard so that no two queens attack each other.',
'Use backtracking to try all possible placements.',
'["Try placing queens row by row", "Backtrack when you find a conflict"]',
'O(N!)', 'O(N)', NOW())
ON CONFLICT (title) DO NOTHING;

-- Seed challenges
INSERT INTO public.challenges (title, description, difficulty, points, time_limit, category, problem_statement, test_cases, solution_template, created_at) VALUES
('Reverse Array', 'Implement a function to reverse an array in-place', 'easy', 100, 1800, 'Arrays',
'Given an array of integers, reverse it in-place and return the modified array.',
'[{"input": "[1,2,3,4,5]", "output": "[5,4,3,2,1]"}, {"input": "[1]", "output": "[1]"}, {"input": "[]", "output": "[]"}]',
'function reverseArray(arr) {\n  // Your code here\n  return arr;\n}', NOW()),

('Find Maximum', 'Find the maximum element in an array', 'easy', 80, 1200, 'Arrays',
'Given an array of integers, find and return the maximum element.',
'[{"input": "[1,3,2,5,4]", "output": "5"}, {"input": "[-1,-3,-2]", "output": "-1"}, {"input": "[42]", "output": "42"}]',
'function findMax(arr) {\n  // Your code here\n  return 0;\n}', NOW()),

('Binary Search', 'Implement binary search algorithm', 'medium', 200, 2400, 'Searching',
'Implement binary search to find target element in sorted array. Return index or -1 if not found.',
'[{"input": "([1,2,3,4,5], 3)", "output": "2"}, {"input": "([1,2,3,4,5], 6)", "output": "-1"}]',
'function binarySearch(arr, target) {\n  // Your code here\n  return -1;\n}', NOW()),

('Valid Parentheses', 'Check if parentheses are balanced', 'medium', 250, 2100, 'Stacks & Queues',
'Given a string containing parentheses, determine if they are balanced.',
'[{"input": "()", "output": "true"}, {"input": "()[]{}", "output": "true"}, {"input": "(]", "output": "false"}]',
'function isValid(s) {\n  // Your code here\n  return false;\n}', NOW()),

('Fibonacci', 'Calculate nth Fibonacci number', 'easy', 150, 1500, 'Dynamic Programming',
'Calculate the nth Fibonacci number efficiently.',
'[{"input": "0", "output": "0"}, {"input": "1", "output": "1"}, {"input": "5", "output": "5"}, {"input": "10", "output": "55"}]',
'function fibonacci(n) {\n  // Your code here\n  return 0;\n}', NOW())
ON CONFLICT (title) DO NOTHING;

-- Create sample admin user (you'll need to update the user_id after creating a real user)
-- INSERT INTO public.admin_roles (user_id, role, created_by, created_at) VALUES
-- ('your-user-id-here', 'super_admin', 'your-user-id-here', NOW())
-- ON CONFLICT (user_id, role) DO NOTHING;

-- Seed learning paths
INSERT INTO public.learning_paths (title, description, difficulty, estimated_hours, topics, created_at) VALUES
('Complete Beginner Path', 'Start your coding journey with fundamental concepts', 'Beginner', 40, 
'["Arrays", "Linked Lists", "Stacks & Queues", "Sorting", "Searching"]', NOW()),

('Interview Preparation', 'Master the most common interview questions', 'Intermediate', 60,
'["Arrays", "Linked Lists", "Trees", "Dynamic Programming", "Graphs"]', NOW()),

('Advanced Algorithms', 'Deep dive into complex algorithms and optimization', 'Advanced', 80,
'["Dynamic Programming", "Greedy Algorithms", "Backtracking", "Graphs", "Trees"]', NOW())
ON CONFLICT (title) DO NOTHING;

-- Add sample user progress and achievements
-- Note: These would be populated as users interact with the system