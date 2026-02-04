-- Real Problem Data Seeding for AlgoViz+
-- Inspired by LeetCode, HackerRank, Codeforces problems

-- ============================================
-- REAL CODING PROBLEMS
-- ============================================

-- Problem 1: Two Sum (LeetCode #1)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000001',
    'Two Sum',
    E'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\nExample 1:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\nExample 2:\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n\nExample 3:\nInput: nums = [3,3], target = 6\nOutput: [0,1]\n\nConstraints:\n• 2 <= nums.length <= 10^4\n• -10^9 <= nums[i] <= 10^9\n• -10^9 <= target <= 10^9\n• Only one valid answer exists.',
    'easy',
    'Array',
    100,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    difficulty = EXCLUDED.difficulty,
    category = EXCLUDED.category,
    is_active = EXCLUDED.is_active;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000001', E'[2,7,11,15]\n9', '[0,1]', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000001', E'[3,2,4]\n6', '[1,2]', false, 'standard', 2),
    ('10000000-0000-0000-0000-000000000001', E'[3,3]\n6', '[0,1]', false, 'edge', 3),
    ('10000000-0000-0000-0000-000000000001', E'[-1,-2,-3,-4,-5]\n-8', '[2,4]', true, 'edge', 4),
    ('10000000-0000-0000-0000-000000000001', E'[0,4,3,0]\n0', '[0,3]', true, 'edge', 5)
ON CONFLICT DO NOTHING;

-- Problem 2: Valid Parentheses (LeetCode #20)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000002',
    'Valid Parentheses',
    E'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\nExample 1:\nInput: s = "()"\nOutput: true\n\nExample 2:\nInput: s = "()[]{}"\nOutput: true\n\nExample 3:\nInput: s = "(]"\nOutput: false\n\nExample 4:\nInput: s = "([])"\nOutput: true\n\nConstraints:\n• 1 <= s.length <= 10^4\n• s consists of parentheses only ''()[]{}''.',
    'easy',
    'Stack',
    100,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000002', '()', 'true', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000002', '()[]{}', 'true', false, 'standard', 2),
    ('10000000-0000-0000-0000-000000000002', '(]', 'false', false, 'standard', 3),
    ('10000000-0000-0000-0000-000000000002', '([)]', 'false', true, 'standard', 4),
    ('10000000-0000-0000-0000-000000000002', '{[]}', 'true', true, 'standard', 5)
ON CONFLICT DO NOTHING;

-- Problem 3: Merge Two Sorted Lists (LeetCode #21)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000003',
    'Merge Two Sorted Arrays',
    E'You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the merged linked list.\n\nExample 1:\nInput: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n\nExample 2:\nInput: list1 = [], list2 = []\nOutput: []\n\nExample 3:\nInput: list1 = [], list2 = [0]\nOutput: [0]\n\nConstraints:\n• The number of nodes in both lists is in the range [0, 50].\n• -100 <= Node.val <= 100\n• Both list1 and list2 are sorted in non-decreasing order.',
    'easy',
    'Linked List',
    150,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000003', E'[1,2,4]\n[1,3,4]', '[1,1,2,3,4,4]', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000003', E'[]\n[]', '[]', false, 'edge', 2),
    ('10000000-0000-0000-0000-000000000003', E'[]\n[0]', '[0]', false, 'edge', 3),
    ('10000000-0000-0000-0000-000000000003', E'[5,7,9]\n[1,2,8]', '[1,2,5,7,8,9]', true, 'standard', 4)
ON CONFLICT DO NOTHING;

-- Problem 4: Maximum Subarray (LeetCode #53 - Kadane's Algorithm)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000004',
    'Maximum Subarray',
    E'Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nExample 1:\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.\n\nExample 2:\nInput: nums = [1]\nOutput: 1\nExplanation: The subarray [1] has the largest sum 1.\n\nExample 3:\nInput: nums = [5,4,-1,7,8]\nOutput: 23\nExplanation: The subarray [5,4,-1,7,8] has the largest sum 23.\n\nConstraints:\n• 1 <= nums.length <= 10^5\n• -10^4 <= nums[i] <= 10^4\n\nFollow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach.',
    'medium',
    'Dynamic Programming',
    200,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000004', '[-2,1,-3,4,-1,2,1,-5,4]', '6', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000004', '[1]', '1', false, 'edge', 2),
    ('10000000-0000-0000-0000-000000000004', '[5,4,-1,7,8]', '23', false, 'standard', 3),
    ('10000000-0000-0000-0000-000000000004', '[-1]', '-1', true, 'edge', 4),
    ('10000000-0000-0000-0000-000000000004', '[-2,-1]', '-1', true, 'edge', 5)
ON CONFLICT DO NOTHING;

-- Problem 5: Climbing Stairs (LeetCode #70)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000005',
    'Climbing Stairs',
    E'You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\nExample 1:\nInput: n = 2\nOutput: 2\nExplanation: There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n\nExample 2:\nInput: n = 3\nOutput: 3\nExplanation: There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step\n\nConstraints:\n• 1 <= n <= 45',
    'easy',
    'Dynamic Programming',
    100,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000005', '2', '2', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000005', '3', '3', false, 'standard', 2),
    ('10000000-0000-0000-0000-000000000005', '1', '1', false, 'edge', 3),
    ('10000000-0000-0000-0000-000000000005', '5', '8', true, 'standard', 4),
    ('10000000-0000-0000-0000-000000000005', '10', '89', true, 'performance', 5)
ON CONFLICT DO NOTHING;

-- Problem 6: Binary Search (LeetCode #704)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000006',
    'Binary Search',
    E'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\nExample 1:\nInput: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4\nExplanation: 9 exists in nums and its index is 4\n\nExample 2:\nInput: nums = [-1,0,3,5,9,12], target = 2\nOutput: -1\nExplanation: 2 does not exist in nums so return -1\n\nConstraints:\n• 1 <= nums.length <= 10^4\n• -10^4 < nums[i], target < 10^4\n• All the integers in nums are unique.\n• nums is sorted in ascending order.',
    'easy',
    'Binary Search',
    100,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000006', E'[-1,0,3,5,9,12]\n9', '4', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000006', E'[-1,0,3,5,9,12]\n2', '-1', false, 'standard', 2),
    ('10000000-0000-0000-0000-000000000006', E'[5]\n5', '0', false, 'edge', 3),
    ('10000000-0000-0000-0000-000000000006', E'[2,5]\n0', '-1', true, 'edge', 4)
ON CONFLICT DO NOTHING;

-- Problem 7: Reverse Linked List (LeetCode #206)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000007',
    'Reverse Linked List',
    E'Given the head of a singly linked list, reverse the list, and return the reversed list.\n\nExample 1:\nInput: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]\n\nExample 2:\nInput: head = [1,2]\nOutput: [2,1]\n\nExample 3:\nInput: head = []\nOutput: []\n\nConstraints:\n• The number of nodes in the list is the range [0, 5000].\n• -5000 <= Node.val <= 5000\n\nFollow up: A linked list can be reversed either iteratively or recursively. Could you implement both?',
    'easy',
    'Linked List',
    100,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000007', '[1,2,3,4,5]', '[5,4,3,2,1]', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000007', '[1,2]', '[2,1]', false, 'standard', 2),
    ('10000000-0000-0000-0000-000000000007', '[]', '[]', false, 'edge', 3),
    ('10000000-0000-0000-0000-000000000007', '[1]', '[1]', true, 'edge', 4)
ON CONFLICT DO NOTHING;

-- Problem 8: Contains Duplicate (LeetCode #217)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000008',
    'Contains Duplicate',
    E'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.\n\nExample 1:\nInput: nums = [1,2,3,1]\nOutput: true\n\nExample 2:\nInput: nums = [1,2,3,4]\nOutput: false\n\nExample 3:\nInput: nums = [1,1,1,3,3,4,3,2,4,2]\nOutput: true\n\nConstraints:\n• 1 <= nums.length <= 10^5\n• -10^9 <= nums[i] <= 10^9',
    'easy',
    'Array',
    100,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000008', '[1,2,3,1]', 'true', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000008', '[1,2,3,4]', 'false', false, 'standard', 2),
    ('10000000-0000-0000-0000-000000000008', '[1,1,1,3,3,4,3,2,4,2]', 'true', false, 'standard', 3)
ON CONFLICT DO NOTHING;

-- Problem 9: Best Time to Buy and Sell Stock (LeetCode #121)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000009',
    'Best Time to Buy and Sell Stock',
    E'You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.\n\nExample 1:\nInput: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\n\nExample 2:\nInput: prices = [7,6,4,3,1]\nOutput: 0\nExplanation: In this case, no transactions are done and the max profit = 0.\n\nConstraints:\n• 1 <= prices.length <= 10^5\n• 0 <= prices[i] <= 10^4',
    'easy',
    'Array',
    100,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000009', '[7,1,5,3,6,4]', '5', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000009', '[7,6,4,3,1]', '0', false, 'standard', 2),
    ('10000000-0000-0000-0000-000000000009', '[2,4,1]', '2', false, 'standard', 3)
ON CONFLICT DO NOTHING;

-- Problem 10: Valid Anagram (LeetCode #242)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000010',
    'Valid Anagram',
    E'Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\nExample 1:\nInput: s = "anagram", t = "nagaram"\nOutput: true\n\nExample 2:\nInput: s = "rat", t = "car"\nOutput: false\n\nConstraints:\n• 1 <= s.length, t.length <= 5 * 10^4\n• s and t consist of lowercase English letters.\n\nFollow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?',
    'easy',
    'String',
    100,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000010', E'anagram\nnagaram', 'true', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000010', E'rat\ncar', 'false', false, 'standard', 2),
    ('10000000-0000-0000-0000-000000000010', E'a\na', 'true', false, 'edge', 3)
ON CONFLICT DO NOTHING;

-- Problem 11: Implement Queue using Stacks (LeetCode #232)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000011',
    'Implement Queue using Stacks',
    E'Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).\n\nImplement the MyQueue class:\n• void push(int x) Pushes element x to the back of the queue.\n• int pop() Removes the element from the front of the queue and returns it.\n• int peek() Returns the element at the front of the queue.\n• boolean empty() Returns true if the queue is empty, false otherwise.\n\nConstraints:\n• 1 <= x <= 9\n• At most 100 calls will be made to push, pop, peek, and empty.\n• All the calls to pop and peek are valid.',
    'easy',
    'Stack',
    150,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

-- Problem 12: Number of Islands (LeetCode #200)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000012',
    'Number of Islands',
    E'Given an m x n 2D binary grid grid which represents a map of ''1''s (land) and ''0''s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.\n\nExample 1:\nInput: grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]\nOutput: 1\n\nExample 2:\nInput: grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]\nOutput: 3\n\nConstraints:\n• m == grid.length\n• n == grid[i].length\n• 1 <= m, n <= 300\n• grid[i][j] is ''0'' or ''1''.',
    'medium',
    'Graph',
    250,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000012', E'4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0', '1', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000012', E'4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1', '3', false, 'standard', 2)
ON CONFLICT DO NOTHING;

-- Problem 13: Product of Array Except Self (LeetCode #238)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000013',
    'Product of Array Except Self',
    E'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].\n\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.\n\nExample 1:\nInput: nums = [1,2,3,4]\nOutput: [24,12,8,6]\n\nExample 2:\nInput: nums = [-1,1,0,-3,3]\nOutput: [0,0,9,0,0]\n\nConstraints:\n• 2 <= nums.length <= 10^5\n• -30 <= nums[i] <= 30\n• The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.',
    'medium',
    'Array',
    250,
    3000,
    256,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000013', '[1,2,3,4]', '[24,12,8,6]', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000013', '[-1,1,0,-3,3]', '[0,0,9,0,0]', false, 'standard', 2)
ON CONFLICT DO NOTHING;

-- Problem 14: Longest Palindromic Substring (LeetCode #5)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000014',
    'Longest Palindromic Substring',
    E'Given a string s, return the longest palindromic substring in s.\n\nExample 1:\nInput: s = "babad"\nOutput: "bab"\nExplanation: "aba" is also a valid answer.\n\nExample 2:\nInput: s = "cbbd"\nOutput: "bb"\n\nConstraints:\n• 1 <= s.length <= 1000\n• s consist of only digits and English letters.',
    'medium',
    'String',
    250,
    5000,
    512,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000014', 'babad', 'bab', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000014', 'cbbd', 'bb', false, 'standard', 2),
    ('10000000-0000-0000-0000-000000000014', 'a', 'a', false, 'edge', 3)
ON CONFLICT DO NOTHING;

-- Problem 15: 3Sum (LeetCode #15)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '10000000-0000-0000-0000-000000000015',
    '3Sum',
    E'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.\n\nExample 1:\nInput: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\n\nExample 2:\nInput: nums = [0,1,1]\nOutput: []\n\nExample 3:\nInput: nums = [0,0,0]\nOutput: [[0,0,0]]\n\nConstraints:\n• 3 <= nums.length <= 3000\n• -10^5 <= nums[i] <= 10^5',
    'medium',
    'Array',
    300,
    5000,
    512,
    true
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index)
VALUES 
    ('10000000-0000-0000-0000-000000000015', '[-1,0,1,2,-1,-4]', '[[-1,-1,2],[-1,0,1]]', false, 'standard', 1),
    ('10000000-0000-0000-0000-000000000015', '[0,1,1]', '[]', false, 'edge', 2),
    ('10000000-0000-0000-0000-000000000015', '[0,0,0]', '[[0,0,0]]', false, 'edge', 3)
ON CONFLICT DO NOTHING;

-- ============================================
-- REAL CONTESTS
-- ============================================

-- Weekly Contest 1
INSERT INTO public.contests (id, title, description, start_time, end_time, duration_minutes, max_participants, is_public, created_by)
VALUES (
    '20000000-0000-0000-0000-000000000001',
    'AlgoViz Weekly Challenge #1',
    'Test your skills with curated algorithm problems covering arrays, strings, and basic data structures. Perfect for beginners and intermediate programmers.',
    NOW() + interval '2 days',
    NOW() + interval '2 days 2 hours',
    120,
    1000,
    true,
    NULL
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- Link problems to contest
INSERT INTO public.contest_problems (contest_id, problem_id, order_index, points)
VALUES 
    ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 1, 100),
    ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000002', 2, 100),
    ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', 3, 150),
    ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000004', 4, 200)
ON CONFLICT DO NOTHING;

-- Weekly Contest 2
INSERT INTO public.contests (id, title, description, start_time, end_time, duration_minutes, max_participants, is_public, created_by)
VALUES (
    '20000000-0000-0000-0000-000000000002',
    'Dynamic Programming Sprint',
    'Focus on dynamic programming problems. Master the art of breaking down complex problems into optimal subproblems.',
    NOW() + interval '5 days',
    NOW() + interval '5 days 3 hours',
    180,
    500,
    true,
    NULL
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

INSERT INTO public.contest_problems (contest_id, problem_id, order_index, points)
VALUES 
    ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000005', 1, 100),
    ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000004', 2, 200),
    ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000014', 3, 300)
ON CONFLICT DO NOTHING;

-- Monthly Championship
INSERT INTO public.contests (id, title, description, start_time, end_time, duration_minutes, max_participants, is_public, created_by)
VALUES (
    '20000000-0000-0000-0000-000000000003',
    'January 2026 Championship',
    'Monthly championship with problems of varying difficulty. Compete with programmers worldwide for top rankings and exclusive achievements!',
    NOW() + interval '10 days',
    NOW() + interval '10 days 4 hours',
    240,
    5000,
    true,
    NULL
) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

INSERT INTO public.contest_problems (contest_id, problem_id, order_index, points)
VALUES 
    ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000008', 1, 100),
    ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000006', 2, 150),
    ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000013', 3, 250),
    ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000015', 4, 300),
    ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000012', 5, 350)
ON CONFLICT DO NOTHING;

-- ============================================
-- REAL STUDY ROOMS
-- ============================================

-- Room 1: Interview Prep
INSERT INTO public.study_rooms (id, name, topic, description, max_members, is_public, created_by)
VALUES (
    '30000000-0000-0000-0000-000000000001',
    'FAANG Interview Prep 2026',
    'Interview Preparation',
    'Collaborative space for preparing for FAANG interviews. Focus on leetcode patterns, system design, and behavioral questions. Join us for daily problem-solving sessions!',
    50,
    true,
    NULL
) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Room 2: Competitive Programming
INSERT INTO public.study_rooms (id, name, topic, description, max_members, is_public, created_by)
VALUES (
    '30000000-0000-0000-0000-000000000002',
    'Codeforces Practice Group',
    'Competitive Programming',
    'Practice Codeforces problems together. Discuss solutions, optimize algorithms, and improve your rating. All skill levels welcome!',
    30,
    true,
    NULL
) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Room 3: Data Structures
INSERT INTO public.study_rooms (id, name, topic, description, max_members, is_public, created_by)
VALUES (
    '30000000-0000-0000-0000-000000000003',
    'Advanced Data Structures Study',
    'Data Structures',
    'Deep dive into advanced data structures: segment trees, fenwick trees, tries, and more. Share implementations and discuss use cases.',
    25,
    true,
    NULL
) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Room 4: Dynamic Programming
INSERT INTO public.study_rooms (id, name, topic, description, max_members, is_public, created_by)
VALUES (
    '30000000-0000-0000-0000-000000000004',
    'DP Patterns Mastery',
    'Dynamic Programming',
    'Master all DP patterns: knapsack, LIS, LCS, matrix chain multiplication, and more. Weekly challenges and detailed explanations.',
    40,
    true,
    NULL
) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Room 5: System Design
INSERT INTO public.study_rooms (id, name, topic, description, max_members, is_public, created_by)
VALUES (
    '30000000-0000-0000-0000-000000000005',
    'System Design Discussions',
    'System Design',
    'Learn to design scalable systems. Discuss architectures of popular services like Netflix, Uber, Twitter. Mock interviews and feedback sessions.',
    35,
    true,
    NULL
) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Room 6: Beginners Welcome
INSERT INTO public.study_rooms (id, name, topic, description, max_members, is_public, created_by)
VALUES (
    '30000000-0000-0000-0000-000000000006',
    'Coding Beginners Hub',
    'Beginner Friendly',
    'Safe space for beginners to learn programming fundamentals. Start with easy problems and gradually level up. Mentors available to help!',
    100,
    true,
    NULL
) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Room 7: Daily Challenge
INSERT INTO public.study_rooms (id, name, topic, description, max_members, is_public, created_by)
VALUES (
    '30000000-0000-0000-0000-000000000007',
    'Daily LeetCode Challenge',
    'Daily Practice',
    'Solve and discuss LeetCode Daily Challenge together. Share multiple approaches and learn from each other. Consistency is key!',
    200,
    true,
    NULL
) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;
