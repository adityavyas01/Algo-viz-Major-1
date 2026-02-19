-- ============================================
-- LeetCode Dataset Seed Data
-- This file is deprecated - use migrations instead
-- Data is now imported via:
-- - supabase/migrations/20260219000000_leetcode_migration.sql (schema)
-- - supabase/migrations/20260219000001_leetcode_data.sql (1,825 problems)
-- ============================================

-- No data to seed - all LeetCode problems are in migration files


-- ============================================
-- CLEAR EXISTING TEST DATA
-- ============================================
DELETE FROM public.testcases WHERE problem_id IN (SELECT id FROM public.problems WHERE id::text LIKE '00000000-0000-0000-0000-%');
DELETE FROM public.problems WHERE id::text LIKE '00000000-0000-0000-0000-%';

-- ============================================
-- REAL PROBLEMS - EASY LEVEL
-- ============================================

-- Problem 1: Two Sum (Most popular interview question)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000001',
    'Two Sum',
    E'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\n**Example 1:**\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] == 9, so we return [0, 1].\n\n**Example 2:**\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n\n**Constraints:**\n• 2 ≤ nums.length ≤ 10^4\n• -10^9 ≤ nums[i] ≤ 10^9\n• Only one valid answer exists.\n\n**Input Format:** First line: space-separated integers (array). Second line: target integer.\n**Output Format:** Two space-separated indices.',
    'easy',
    'Array',
    100,
    3000,
    256,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000001', E'2 7 11 15\n9', '0 1', false, 'standard', 1),
('11111111-1111-1111-1111-000000000001', E'3 2 4\n6', '1 2', false, 'standard', 2),
('11111111-1111-1111-1111-000000000001', E'3 3\n6', '0 1', false, 'edge', 3),
('11111111-1111-1111-1111-000000000001', E'1 5 3 7 8 2\n10', '1 3', true, 'standard', 4),
('11111111-1111-1111-1111-000000000001', E'-3 4 3 90\n0', '0 2', true, 'edge', 5);

-- Problem 2: Palindrome Number
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000002',
    'Palindrome Number',
    E'Given an integer x, return true if x is a palindrome, and false otherwise.\n\nAn integer is a palindrome when it reads the same backward as forward.\n\n**Example 1:**\nInput: x = 121\nOutput: true\nExplanation: 121 reads as 121 from left to right and from right to left.\n\n**Example 2:**\nInput: x = -121\nOutput: false\nExplanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.\n\n**Example 3:**\nInput: x = 10\nOutput: false\nExplanation: Reads 01 from right to left. Therefore it is not a palindrome.\n\n**Input Format:** Single integer\n**Output Format:** "true" or "false"',
    'easy',
    'Math',
    100,
    3000,
    256,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000002', '121', 'true', false, 'standard', 1),
('11111111-1111-1111-1111-000000000002', '-121', 'false', false, 'edge', 2),
('11111111-1111-1111-1111-000000000002', '10', 'false', false, 'standard', 3),
('11111111-1111-1111-1111-000000000002', '12321', 'true', true, 'standard', 4),
('11111111-1111-1111-1111-000000000002', '0', 'true', true, 'edge', 5);

-- Problem 3: Reverse Integer
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000003',
    'Reverse Integer',
    E'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.\n\n**Example 1:**\nInput: x = 123\nOutput: 321\n\n**Example 2:**\nInput: x = -123\nOutput: -321\n\n**Example 3:**\nInput: x = 120\nOutput: 21\n\n**Constraints:**\n• -2^31 ≤ x ≤ 2^31 - 1\n\n**Input Format:** Single integer\n**Output Format:** Reversed integer or 0 if overflow',
    'easy',
    'Math',
    100,
    3000,
    256,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000003', '123', '321', false, 'standard', 1),
('11111111-1111-1111-1111-000000000003', '-123', '-321', false, 'standard', 2),
('11111111-1111-1111-1111-000000000003', '120', '21', false, 'edge', 3),
('11111111-1111-1111-1111-000000000003', '0', '0', true, 'edge', 4),
('11111111-1111-1111-1111-000000000003', '1534236469', '0', true, 'performance', 5);

-- Problem 4: Valid Anagram
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000004',
    'Valid Anagram',
    E'Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\n**Example 1:**\nInput: s = "anagram", t = "nagaram"\nOutput: true\n\n**Example 2:**\nInput: s = "rat", t = "car"\nOutput: false\n\n**Constraints:**\n• 1 ≤ s.length, t.length ≤ 5 * 10^4\n• s and t consist of lowercase English letters.\n\n**Input Format:** Two strings on separate lines\n**Output Format:** "true" or "false"',
    'easy',
    'String',
    100,
    3000,
    256,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000004', E'anagram\nnagaram', 'true', false, 'standard', 1),
('11111111-1111-1111-1111-000000000004', E'rat\ncar', 'false', false, 'standard', 2),
('11111111-1111-1111-1111-000000000004', E'a\na', 'true', false, 'edge', 3),
('11111111-1111-1111-1111-000000000004', E'listen\nsilent', 'true', true, 'standard', 4),
('11111111-1111-1111-1111-000000000004', E'hello\nworld', 'false', true, 'standard', 5);

-- Problem 5: Best Time to Buy and Sell Stock
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000005',
    'Best Time to Buy and Sell Stock',
    E'You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.\n\n**Example 1:**\nInput: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\n\n**Example 2:**\nInput: prices = [7,6,4,3,1]\nOutput: 0\nExplanation: No transactions are done and the max profit = 0.\n\n**Input Format:** Space-separated integers (prices)\n**Output Format:** Maximum profit',
    'easy',
    'Array',
    100,
    3000,
    256,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000005', '7 1 5 3 6 4', '5', false, 'standard', 1),
('11111111-1111-1111-1111-000000000005', '7 6 4 3 1', '0', false, 'edge', 2),
('11111111-1111-1111-1111-000000000005', '2 4 1', '2', false, 'standard', 3),
('11111111-1111-1111-1111-000000000005', '1 2 3 4 5', '4', true, 'standard', 4),
('11111111-1111-1111-1111-000000000005', '5 5 5 5', '0', true, 'edge', 5);

-- ============================================
-- REAL PROBLEMS - MEDIUM LEVEL
-- ============================================

-- Problem 6: Add Two Numbers (Linked List)
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000006',
    'Add Two Numbers',
    E'You are given two non-empty arrays representing two non-negative integers. The digits are stored in reverse order, and each of their elements contains a single digit. Add the two numbers and return the sum as an array.\n\n**Example 1:**\nInput: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.\n\n**Example 2:**\nInput: l1 = [0], l2 = [0]\nOutput: [0]\n\n**Example 3:**\nInput: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\nOutput: [8,9,9,9,0,0,0,1]\n\n**Input Format:** Two lines with space-separated digits\n**Output Format:** Space-separated digits (result in reverse)',
    'medium',
    'Linked List',
    200,
    3000,
    256,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000006', E'2 4 3\n5 6 4', '7 0 8', false, 'standard', 1),
('11111111-1111-1111-1111-000000000006', E'0\n0', '0', false, 'edge', 2),
('11111111-1111-1111-1111-000000000006', E'9 9 9 9 9 9 9\n9 9 9 9', '8 9 9 9 0 0 0 1', false, 'standard', 3),
('11111111-1111-1111-1111-000000000006', E'5\n5', '0 1', true, 'standard', 4),
('11111111-1111-1111-1111-000000000006', E'1 8\n0', '1 8', true, 'edge', 5);

-- Problem 7: Longest Substring Without Repeating Characters
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000007',
    'Longest Substring Without Repeating Characters',
    E'Given a string s, find the length of the longest substring without repeating characters.\n\n**Example 1:**\nInput: s = "abcabcbb"\nOutput: 3\nExplanation: The answer is "abc", with the length of 3.\n\n**Example 2:**\nInput: s = "bbbbb"\nOutput: 1\nExplanation: The answer is "b", with the length of 1.\n\n**Example 3:**\nInput: s = "pwwkew"\nOutput: 3\nExplanation: The answer is "wke", with the length of 3.\n\n**Constraints:**\n• 0 ≤ s.length ≤ 5 * 10^4\n• s consists of English letters, digits, symbols and spaces.\n\n**Input Format:** Single string\n**Output Format:** Length of longest substring',
    'medium',
    'String',
    200,
    3000,
    256,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000007', 'abcabcbb', '3', false, 'standard', 1),
('11111111-1111-1111-1111-000000000007', 'bbbbb', '1', false, 'edge', 2),
('11111111-1111-1111-1111-000000000007', 'pwwkew', '3', false, 'standard', 3),
('11111111-1111-1111-1111-000000000007', '', '0', true, 'edge', 4),
('11111111-1111-1111-1111-000000000007', 'dvdf', '3', true, 'standard', 5);

-- Problem 8: 3Sum
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000008',
    '3Sum',
    E'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.\n\n**Example 1:**\nInput: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\n\n**Example 2:**\nInput: nums = [0,1,1]\nOutput: []\n\n**Example 3:**\nInput: nums = [0,0,0]\nOutput: [[0,0,0]]\n\n**Input Format:** Space-separated integers\n**Output Format:** Each triplet on new line (space-separated), sorted lexicographically',
    'medium',
    'Array',
    200,
    5000,
    256,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000008', '-1 0 1 2 -1 -4', E'-1 -1 2\n-1 0 1', false, 'standard', 1),
('11111111-1111-1111-1111-000000000008', '0 1 1', '', false, 'edge', 2),
('11111111-1111-1111-1111-000000000008', '0 0 0', '0 0 0', false, 'edge', 3),
('11111111-1111-1111-1111-000000000008', '-2 0 1 1 2', E'-2 0 2\n-2 1 1', true, 'standard', 4),
('11111111-1111-1111-1111-000000000008', '1 2 -2 -1', '', true, 'edge', 5);

-- Problem 9: Container With Most Water
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000009',
    'Container With Most Water',
    E'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\n**Example 1:**\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: The vertical lines are at indices 1 and 8 with heights 8 and 7. Area = 7 * (8-1) = 49.\n\n**Example 2:**\nInput: height = [1,1]\nOutput: 1\n\n**Input Format:** Space-separated integers (heights)\n**Output Format:** Maximum water area',
    'medium',
    'Two Pointers',
    200,
    3000,
    256,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000009', '1 8 6 2 5 4 8 3 7', '49', false, 'standard', 1),
('11111111-1111-1111-1111-000000000009', '1 1', '1', false, 'edge', 2),
('11111111-1111-1111-1111-000000000009', '4 3 2 1 4', '16', false, 'standard', 3),
('11111111-1111-1111-1111-000000000009', '1 2 1', '2', true, 'edge', 4),
('11111111-1111-1111-1111-000000000009', '2 3 4 5 18 17 6', '17', true, 'standard', 5);

-- Problem 10: Valid Parentheses
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000010',
    'Valid Parentheses',
    E'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\n**Example 1:**\nInput: s = "()"\nOutput: true\n\n**Example 2:**\nInput: s = "()[]{}"\nOutput: true\n\n**Example 3:**\nInput: s = "(]"\nOutput: false\n\n**Input Format:** String of brackets\n**Output Format:** "true" or "false"',
    'medium',
    'Stack',
    200,
    3000,
    256,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000010', '()', 'true', false, 'standard', 1),
('11111111-1111-1111-1111-000000000010', '()[]{}', 'true', false, 'standard', 2),
('11111111-1111-1111-1111-000000000010', '(]', 'false', false, 'standard', 3),
('11111111-1111-1111-1111-000000000010', '([)]', 'false', true, 'standard', 4),
('11111111-1111-1111-1111-000000000010', '{[]}', 'true', true, 'edge', 5);

-- ============================================
-- REAL PROBLEMS - HARD LEVEL
-- ============================================

-- Problem 11: Median of Two Sorted Arrays
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000011',
    'Median of Two Sorted Arrays',
    E'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\n**Example 1:**\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged array = [1,2,3] and median is 2.\n\n**Example 2:**\nInput: nums1 = [1,2], nums2 = [3,4]\nOutput: 2.50000\nExplanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.\n\n**Constraints:**\n• nums1.length == m\n• nums2.length == n\n• 0 ≤ m ≤ 1000\n• 0 ≤ n ≤ 1000\n\n**Input Format:** Two lines with space-separated sorted integers\n**Output Format:** Median (2 decimal places)',
    'hard',
    'Binary Search',
    300,
    5000,
    512,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000011', E'1 3\n2', '2.00', false, 'standard', 1),
('11111111-1111-1111-1111-000000000011', E'1 2\n3 4', '2.50', false, 'standard', 2),
('11111111-1111-1111-1111-000000000011', E'\n1', '1.00', false, 'edge', 3),
('11111111-1111-1111-1111-000000000011', E'1 2 3 4 5\n6 7 8 9 10', '5.50', true, 'standard', 4),
('11111111-1111-1111-1111-000000000011', E'1 3 5 7 9\n2 4 6 8 10', '5.50', true, 'performance', 5);

-- Problem 12: Regular Expression Matching
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000012',
    'Regular Expression Matching',
    E'Given an input string s and a pattern p, implement regular expression matching with support for ''.'' and ''*'' where:\n\n• ''.'' Matches any single character.\n• ''*'' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).\n\n**Example 1:**\nInput: s = "aa", p = "a"\nOutput: false\nExplanation: "a" does not match the entire string "aa".\n\n**Example 2:**\nInput: s = "aa", p = "a*"\nOutput: true\nExplanation: ''*'' means zero or more of the preceding element, ''a''. Therefore, by repeating ''a'' once, it becomes "aa".\n\n**Example 3:**\nInput: s = "ab", p = ".*"\nOutput: true\nExplanation: ".*" means "zero or more (*) of any character (.)".\n\n**Input Format:** Two lines: string and pattern\n**Output Format:** "true" or "false"',
    'hard',
    'Dynamic Programming',
    300,
    5000,
    512,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000012', E'aa\na', 'false', false, 'standard', 1),
('11111111-1111-1111-1111-000000000012', E'aa\na*', 'true', false, 'standard', 2),
('11111111-1111-1111-1111-000000000012', E'ab\n.*', 'true', false, 'standard', 3),
('11111111-1111-1111-1111-000000000012', E'aab\nc*a*b', 'true', true, 'standard', 4),
('11111111-1111-1111-1111-000000000012', E'mississippi\nmis*is*p*.', 'false', true, 'standard', 5);

-- Problem 13: Trapping Rain Water
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000013',
    'Trapping Rain Water',
    E'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\n**Example 1:**\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.\n\n**Example 2:**\nInput: height = [4,2,0,3,2,5]\nOutput: 9\n\n**Constraints:**\n• n == height.length\n• 1 ≤ n ≤ 2 * 10^4\n• 0 ≤ height[i] ≤ 10^5\n\n**Input Format:** Space-separated integers (heights)\n**Output Format:** Total trapped water units',
    'hard',
    'Two Pointers',
    300,
    5000,
    512,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000013', '0 1 0 2 1 0 1 3 2 1 2 1', '6', false, 'standard', 1),
('11111111-1111-1111-1111-000000000013', '4 2 0 3 2 5', '9', false, 'standard', 2),
('11111111-1111-1111-1111-000000000013', '3 0 0 2 0 4', '10', false, 'standard', 3),
('11111111-1111-1111-1111-000000000013', '5 4 1 2', '1', true, 'edge', 4),
('11111111-1111-1111-1111-000000000013', '0 1 0 2 1 0 3 1 0 1 2', '8', true, 'performance', 5);

-- Problem 14: Merge k Sorted Lists
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000014',
    'Merge k Sorted Lists',
    E'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.\n\n**Example 1:**\nInput: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]\nExplanation: The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6\n\n**Example 2:**\nInput: lists = []\nOutput: []\n\n**Example 3:**\nInput: lists = [[]]\nOutput: []\n\n**Input Format:** First line: number of lists k. Next k lines: space-separated sorted integers\n**Output Format:** Space-separated sorted integers',
    'hard',
    'Heap',
    300,
    5000,
    512,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000014', E'3\n1 4 5\n1 3 4\n2 6', '1 1 2 3 4 4 5 6', false, 'standard', 1),
('11111111-1111-1111-1111-000000000014', E'0\n', '', false, 'edge', 2),
('11111111-1111-1111-1111-000000000014', E'1\n', '', false, 'edge', 3),
('11111111-1111-1111-1111-000000000014', E'2\n1 2 3\n4 5 6', '1 2 3 4 5 6', true, 'standard', 4),
('11111111-1111-1111-1111-000000000014', E'4\n1 5 9\n2 6 10\n3 7 11\n4 8 12', '1 2 3 4 5 6 7 8 9 10 11 12', true, 'performance', 5);

-- Problem 15: Longest Valid Parentheses
INSERT INTO public.problems (id, title, description, difficulty, category, points, time_limit, memory_limit, is_active)
VALUES (
    '11111111-1111-1111-1111-000000000015',
    'Longest Valid Parentheses',
    E'Given a string containing just the characters ''('' and '')'', return the length of the longest valid (well-formed) parentheses substring.\n\n**Example 1:**\nInput: s = "(()"\nOutput: 2\nExplanation: The longest valid parentheses substring is "()".\n\n**Example 2:**\nInput: s = ")()())"\nOutput: 4\nExplanation: The longest valid parentheses substring is "()()".\n\n**Example 3:**\nInput: s = ""\nOutput: 0\n\n**Constraints:**\n• 0 ≤ s.length ≤ 3 * 10^4\n• s[i] is ''('', or '')''\n\n**Input Format:** String of parentheses\n**Output Format:** Length of longest valid substring',
    'hard',
    'Stack',
    300,
    5000,
    512,
    true
);

INSERT INTO public.testcases (problem_id, input, expected_output, is_hidden, type, order_index) VALUES
('11111111-1111-1111-1111-000000000015', '(()', '2', false, 'standard', 1),
('11111111-1111-1111-1111-000000000015', ')()())', '4', false, 'standard', 2),
('11111111-1111-1111-1111-000000000015', '', '0', false, 'edge', 3),
('11111111-1111-1111-1111-000000000015', '()(())', '6', true, 'standard', 4),
('11111111-1111-1111-1111-000000000015', '(()())', '6', true, 'standard', 5);

-- ============================================
-- CONTESTS DATA
-- ============================================

INSERT INTO public.contests (id, title, description, start_time, end_time, duration, max_participants, visibility, created_by)
VALUES 
(
    '22222222-2222-2222-2222-000000000001',
    'Weekly Challenge #1: Arrays & Strings',
    'Master the fundamentals of arrays and strings in this beginner-friendly contest. Perfect for those starting their competitive programming journey!',
    NOW() + INTERVAL '2 days',
    NOW() + INTERVAL '2 days 2 hours',
    120,
    1000,
    'public',
    NULL
),
(
    '22222222-2222-2222-2222-000000000002',
    'Monthly Championship: Algorithms Sprint',
    'Test your skills across various algorithmic challenges. From dynamic programming to graph theory - this contest has it all!',
    NOW() + INTERVAL '5 days',
    NOW() + INTERVAL '5 days 3 hours',
    180,
    500,
    'public',
    NULL
),
(
    '22222222-2222-2222-2222-000000000003',
    'Advanced Coding Marathon',
    'Elite-level contest for experienced programmers. Tackle complex problems requiring advanced algorithms and optimization techniques.',
    NOW() + INTERVAL '10 days',
    NOW() + INTERVAL '10 days 4 hours',
    240,
    200,
    'public',
    NULL
),
(
    '22222222-2222-2222-2222-000000000004',
    'Speed Coding Blitz',
    'Quick-fire round! Solve as many easy problems as you can in 60 minutes. Speed and accuracy matter!',
    NOW() + INTERVAL '1 day',
    NOW() + INTERVAL '1 day 1 hour',
    60,
    2000,
    'public',
    NULL
);

-- Link problems to contests
INSERT INTO public.contest_problems (contest_id, problem_id, points, order_index) VALUES
-- Weekly Challenge #1 (Easy problems)
('22222222-2222-2222-2222-000000000001', '11111111-1111-1111-1111-000000000001', 100, 1),
('22222222-2222-2222-2222-000000000001', '11111111-1111-1111-1111-000000000004', 100, 2),
('22222222-2222-2222-2222-000000000001', '11111111-1111-1111-1111-000000000005', 150, 3),

-- Monthly Championship (Mixed difficulty)
('22222222-2222-2222-2222-000000000002', '11111111-1111-1111-1111-000000000006', 200, 1),
('22222222-2222-2222-2222-000000000002', '11111111-1111-1111-1111-000000000007', 250, 2),
('22222222-2222-2222-2222-000000000002', '11111111-1111-1111-1111-000000000009', 300, 3),

-- Advanced Marathon (Hard problems)
('22222222-2222-2222-2222-000000000003', '11111111-1111-1111-1111-000000000011', 400, 1),
('22222222-2222-2222-2222-000000000003', '11111111-1111-1111-1111-000000000013', 500, 2),
('22222222-2222-2222-2222-000000000003', '11111111-1111-1111-1111-000000000015', 600, 3),

-- Speed Blitz (Easy problems)
('22222222-2222-2222-2222-000000000004', '11111111-1111-1111-1111-000000000002', 50, 1),
('22222222-2222-2222-2222-000000000004', '11111111-1111-1111-1111-000000000003', 50, 2),
('22222222-2222-2222-2222-000000000004', '11111111-1111-1111-1111-000000000004', 50, 3);

-- ============================================
-- STUDY ROOMS DATA
-- ============================================

-- NOTE: Replace the UUID below with your actual user ID from auth.users
-- To find your user ID:
-- 1. Log into your app
-- 2. Run: SELECT id FROM auth.users WHERE email = 'your-email@example.com';
-- 3. Replace '00000000-0000-0000-0000-000000000001' with your actual UUID

-- Or create a system user in auth.users first (one-time setup):
-- Go to Authentication > Users in Supabase Dashboard and create a user
-- Then use that user's ID below

INSERT INTO public.study_rooms (id, name, description, topic, max_members, is_private, created_by)
VALUES 
(
    '33333333-3333-3333-3333-000000000001',
    'Dynamic Programming Study Group',
    'Learn and practice DP problems together. From basic memoization to advanced state optimization techniques.',
    'Dynamic Programming',
    10,
    false,
    (SELECT id FROM auth.users LIMIT 1)  -- Uses first existing user
),
(
    '33333333-3333-3333-3333-000000000002',
    'LeetCode Daily Challenge Crew',
    'Solve LeetCode daily challenges together and discuss multiple approaches. All skill levels welcome!',
    'Mixed Topics',
    20,
    false,
    (SELECT id FROM auth.users LIMIT 1)
),
(
    '33333333-3333-3333-3333-000000000003',
    'Graph Algorithms Workshop',
    'Master BFS, DFS, Dijkstra, and more. Work through classic graph problems step by step.',
    'Graph Theory',
    15,
    false,
    (SELECT id FROM auth.users LIMIT 1)
),
(
    '33333333-3333-3333-3333-000000000004',
    'Interview Prep - FAANG Focus',
    'Preparing for big tech interviews? Practice common FAANG questions and mock interviews.',
    'Interview Prep',
    8,
    false,
    (SELECT id FROM auth.users LIMIT 1)
),
(
    '33333333-3333-3333-3333-000000000005',
    'Competitive Programming Practice',
    'Training for Codeforces, AtCoder, and other competitive programming platforms.',
    'Competitive Programming',
    12,
    false,
    (SELECT id FROM auth.users LIMIT 1)
);

COMMIT;

-- Print success message
DO $$
BEGIN
    RAISE NOTICE '✅ Successfully seeded:';
    RAISE NOTICE '   • 15 Real Problems (5 Easy, 5 Medium, 5 Hard)';
    RAISE NOTICE '   • 75 Test Cases (5 per problem)';
    RAISE NOTICE '   • 4 Programming Contests';
    RAISE NOTICE '   • 5 Study Rooms';
    RAISE NOTICE '';
    RAISE NOTICE '🎯 All data is production-ready!';
END $$;
