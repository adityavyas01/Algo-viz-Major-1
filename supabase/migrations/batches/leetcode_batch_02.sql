-- ============================================
-- LeetCode Dataset Import
-- Generated on: 2026-02-19T04:42:18.840Z
-- Total Problems: 1825
-- ============================================

BEGIN;
INSERT INTO public.problems 
  (id, title, description, is_premium, difficulty, solution_link, acceptance_rate, 
   frequency, url, discuss_count, accepted, submissions, companies, related_topics, 
   likes, dislikes, rating, asked_by_faang, similar_questions, is_active)
VALUES
  (501, 'Find Mode in Binary Search Tree', 'Given the `root` of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., the most frequently occurred element) in it.

If the tree has more than one mode, return them in any order.

Assume a BST is defined as follows:
The left subtree of a node contains only nodes with keys less than or equal to the node''s key.

The right subtree of a node contains only nodes with keys greater than or equal to the node''s key.

Both the left and right subtrees must also be binary search trees.


Example 1:
Input: root = [1,null,2,2]
Output: [2]

Example 2:
Input: root = [0]
Output: [0]

Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-105 <= Node.val <= 105`
Follow up: Could you do that without using any extra space? (Assume that the implicit stack space incurred due to recursion does not count).', false, 'Easy', NULL, 43.7, 
   8.8, 'https://leetcode.com/problems/find-mode-in-binary-search-tree', 608, 107.1, 244.9, '["Google"]'::jsonb, '["Tree"]'::jsonb, 
   1303, 417, 76, true, '[]'::jsonb, true),
  (502, 'IPO', 'Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most k distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most k distinct projects. 
You are given several projects. For each project i, it has a pure profit Pi and a minimum capital of Ci is needed to start the corresponding project. Initially, you have W capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

To sum up, pick a list of at most k distinct projects from given projects to maximize your final capital, and output your final maximized capital.


Example 1:
Input: k=2, W=0, Profits=[1,2,3], Capital=[0,1,1].
Output: 4
Explanation: Since your initial capital is 0, you can only start the project indexed 0.

             After finishing it you will obtain profit 1 and your capital becomes 1.

             With capital 1, you can either start the project indexed 1 or the project indexed 2.

             Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.

             Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.

Note:
You may assume all numbers in the input are non-negative integers.

The length of Profits array and Capital array will not exceed 50,000.

The answer is guaranteed to fit in a 32-bit signed integer.', false, 'Hard', '/articles/ipo', 41.8, 
   23.1, 'https://leetcode.com/problems/ipo', 177, 22.6, 53.9, '["Amazon"]'::jsonb, '["Heap,Greedy"]'::jsonb, 
   502, 49, 91, true, '[]'::jsonb, true),
  (503, 'Next Greater Element II', 'Given a circular integer array `nums` (i.e., the next element of `nums[nums.length - 1]` is `nums[0]`), return the next greater number for every element in `nums`.

The next greater number of a number `x` is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn''t exist, return `-1` for this number.


Example 1:
Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation: The first 1''s next greater number is 2; 
The number 2 can''t find next greater number. 
The second 1''s next greater number needs to search circularly, which is also 2.


Example 2:
Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]

Constraints:
`1 <= nums.length <= 104`
`-109 <= nums[i] <= 109`', false, 'Medium', '/articles/next-greater-element-ii', 58.7, 
   54.1, 'https://leetcode.com/problems/next-greater-element-ii', 636, 132.9, 226.3, '["Amazon,Bloomberg,Apple,Facebook"]'::jsonb, '["Stack"]'::jsonb, 
   2347, 93, 96, true, '[]'::jsonb, true),
  (504, 'Base 7', 'Given an integer, return its base 7 string representation.


Example 1:
Input: 100
Output: "202"

Example 2:
Input: -7
Output: "-10"
Note:
The input will be in range of [-1e7, 1e7].', false, 'Easy', NULL, 46.5, 
   8.1, 'https://leetcode.com/problems/base-7', 331, 65.1, 140.1, '["Garena"]'::jsonb, '[]'::jsonb, 
   302, 164, 65, false, '[]'::jsonb, true),
  (505, 'The Maze II', 'There is a ball in a `maze` with empty spaces (represented as `0`) and walls (represented as `1`). The ball can go through the empty spaces by rolling up, down, left or right, but it won''t stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the `m x n` `maze`, the ball''s `start` position and the `destination`, where `start = [startrow, startcol]` and `destination = [destinationrow, destinationcol]`, return the shortest distance for the ball to stop at the destination. If the ball cannot stop at `destination`, return `-1`.

The distance is the number of empty spaces traveled by the ball from the start position (excluded) to the destination (included).

You may assume that the borders of the maze are all walls (see examples).


Example 1:
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
Output: 12
Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.

The length of the path is 1 + 1 + 3 + 1 + 2 + 2 + 2 = 12.


Example 2:
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
Output: -1
Explanation: There is no way for the ball to stop at the destination. Notice that you can pass through the destination but you cannot stop there.


Example 3:
Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]
Output: -1

Constraints:
`m == maze.length`
`n == maze[i].length`
`1 <= m, n <= 100`
`maze[i][j]` is `0` or `1`.

`start.length == 2`
`destination.length == 2`
`0 <= startrow, destinationrow <= m`
`0 <= startcol, destinationcol <= n`
Both the ball and the destination exist in an empty space, and they will not be in the same position initially.

The maze contains at least 2 empty spaces.', true, 'Medium', '/articles/the-maze-ii', 48.7, 
   10.6, 'https://leetcode.com/problems/the-maze-ii', 236, 58.7, 120.5, '["Amazon,Facebook,Google,Snapchat,Oracle"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   722, 36, 95, true, '[]'::jsonb, true),
  (506, 'Relative Ranks', 'You are given an integer array `score` of size `n`, where `score[i]` is the score of the `ith` athlete in a competition. All the scores are guaranteed to be unique.

The athletes are placed based on their scores, where the `1st` place athlete has the highest score, the `2nd` place athlete has the `2nd` highest score, and so on. The placement of each athlete determines their rank:
The `1st` place athlete''s rank is `"Gold Medal"`.

The `2nd` place athlete''s rank is `"Silver Medal"`.

The `3rd` place athlete''s rank is `"Bronze Medal"`.

For the `4th` place to the `nth` place athlete, their rank is their placement number (i.e., the `xth` place athlete''s rank is `"x"`).

Return an array `answer` of size `n` where `answer[i]` is the rank of the `ith` athlete.


Example 1:
Input: score = [5,4,3,2,1]
Output: ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
Explanation: The placements are [1st, 2nd, 3rd, 4th, 5th].


Example 2:
Input: score = [10,3,8,9,4]
Output: ["Gold Medal","5","Bronze Medal","Silver Medal","4"]
Explanation: The placements are [1st, 5th, 3rd, 2nd, 4th].


Constraints:
`n == score.length`
`1 <= n <= 104`
`0 <= score[i] <= 106`
All the values in `score` are unique.', false, 'Easy', NULL, 51.5, 
   0, 'https://leetcode.com/problems/relative-ranks', 458, 61.3, 119, '["Google"]'::jsonb, '[]'::jsonb, 
   18, 0, 100, true, '[]'::jsonb, true),
  (507, 'Perfect Number', 'A perfect number is a positive integer that is equal to the sum of its positive divisors, excluding the number itself. A divisor of an integer `x` is an integer that can divide `x` evenly.

Given an integer `n`, return `true` if `n` is a perfect number, otherwise return `false`.


Example 1:
Input: num = 28
Output: true
Explanation: 28 = 1 + 2 + 4 + 7 + 14
1, 2, 4, 7, and 14 are all divisors of 28.


Example 2:
Input: num = 6
Output: true

Example 3:
Input: num = 496
Output: true

Example 4:
Input: num = 8128
Output: true

Example 5:
Input: num = 2
Output: false

Constraints:
`1 <= num <= 108`', false, 'Easy', '/articles/perfect-number', 36.3, 
   8.4, 'https://leetcode.com/problems/perfect-number', 451, 78.6, 216.3, '["Amazon"]'::jsonb, '["Math"]'::jsonb, 
   373, 721, 34, true, '[]'::jsonb, true),
  (508, 'Most Frequent Subtree Sum', 'Given the root of a tree, you are asked to find the most frequent subtree sum. The subtree sum of a node is defined as the sum of all the node values formed by the subtree rooted at that node (including the node itself). So what is the most frequent subtree sum value? If there is a tie, return all the values with the highest frequency in any order.


Examples 1
Input:
  5
 /  \\
2   -3
return [2, -3, 4], since all the values happen only once, return all of them in any order.


Examples 2
Input:
  5
 /  \\
2   -5
return [2], since 2 happens twice, however -5 only occur once.

Note:
You may assume the sum of values in any subtree is in the range of 32-bit signed integer.', false, 'Medium', NULL, 59.2, 
   2.2, 'https://leetcode.com/problems/most-frequent-subtree-sum', 519, 83.4, 140.8, '["Amazon"]'::jsonb, '["Hash Table,Tree"]'::jsonb, 
   861, 144, 86, true, '[]'::jsonb, true),
  (509, 'Fibonacci Number', 'The Fibonacci numbers, commonly denoted `F(n)` form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from `0` and `1`. That is,
F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

Given `n`, calculate `F(n)`.


Example 1:
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.


Example 2:
Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.


Example 3:
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.


Constraints:
`0 <= n <= 30`', false, 'Easy', '/articles/fibonacci-number', 67.5, 
   62.8, 'https://leetcode.com/problems/fibonacci-number', 999, 337.7, 500.3, '["JPMorgan,Amazon,Google,Apple,Facebook"]'::jsonb, '["Array"]'::jsonb, 
   1182, 223, 84, true, '[]'::jsonb, true),
  (510, 'Inorder Successor in BST II', 'Given a `node` in a binary search tree, return the in-order successor of that node in the BST. If that node has no in-order successor, return `null`.

The successor of a `node` is the node with the smallest key greater than `node.val`.

You will have direct access to the node but not to the root of the tree. Each node will have a reference to its parent node. Below is the definition for `Node`:
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
}

Example 1:
Input: tree = [2,1,3], node = 1
Output: 2
Explanation: 1''s in-order successor node is 2. Note that both the node and the return value is of Node type.


Example 2:
Input: tree = [5,3,6,2,4,null,null,1], node = 6
Output: null
Explanation: There is no in-order successor of the current node, so the answer is null.


Example 3:
Input: tree = [15,6,18,3,7,17,20,2,4,null,13,null,null,null,null,null,null,null,null,9], node = 15
Output: 17

Example 4:
Input: tree = [15,6,18,3,7,17,20,2,4,null,13,null,null,null,null,null,null,null,null,9], node = 13
Output: 15

Example 5:
Input: tree = [0], node = 0
Output: null

Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-105 <= Node.val <= 105`
All Nodes will have unique values.

Follow up: Could you solve it without looking up any of the node''s values?', true, 'Medium', '/articles/inorder-successor-in-a-bst-ii', 60.4, 
   28, 'https://leetcode.com/problems/inorder-successor-in-bst-ii', 192, 31.4, 52.1, '["Microsoft,Bloomberg"]'::jsonb, '["Tree"]'::jsonb, 
   461, 25, 95, false, '[]'::jsonb, true),
  (511, 'Game Play Analysis I', 'SQL Schema', true, 'Easy', NULL, 81.5, 
   0.7, 'https://leetcode.com/problems/game-play-analysis-i', 103, 29, 35.6, '["GSN Games"]'::jsonb, '[]'::jsonb, 
   65, 6, 92, false, '[]'::jsonb, true),
  (512, 'Game Play Analysis II', 'SQL Schema', true, 'Easy', NULL, 56.1, 
   2.8, 'https://leetcode.com/problems/game-play-analysis-ii', 202, 26.9, 48, '["GSN Games"]'::jsonb, '[]'::jsonb, 
   96, 16, 86, false, '[]'::jsonb, true),
  (513, 'Find Bottom Left Tree Value', 'Given the `root` of a binary tree, return the leftmost value in the last row of the tree.


Example 1:
Input: root = [2,1,3]
Output: 1

Example 2:
Input: root = [1,2,3,4,null,5,6,null,null,7]
Output: 7

Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-231 <= Node.val <= 231 - 1`', false, 'Medium', NULL, 62.8, 
   4, 'https://leetcode.com/problems/find-bottom-left-tree-value', 999, 128.2, 204.1, '["Bloomberg,Adobe"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   1300, 173, 88, false, '[]'::jsonb, true),
  (514, 'Freedom Trail', 'In the video game Fallout 4, the quest "Road to Freedom" requires players to reach a metal dial called the "Freedom Trail Ring", and use the dial to spell a specific keyword in order to open the door.

Given a string ring, which represents the code engraved on the outer ring and another string key, which represents the keyword needs to be spelled. You need to find the minimum number of steps in order to spell all the characters in the keyword.

Initially, the first character of the ring is aligned at 12:00 direction. You need to spell all the characters in the string key one by one by rotating the ring clockwise or anticlockwise to make each character of the string key aligned at 12:00 direction and then by pressing the center button.

At the stage of rotating the ring to spell the key character key[i]:
You can rotate the ring clockwise or anticlockwise one place, which counts as 1 step. The final purpose of the rotation is to align one of the string ring''s characters at the 12:00 direction, where this character must equal to the character key[i].

If the character key[i] has been aligned at the 12:00 direction, you need to press the center button to spell, which also counts as 1 step. After the pressing, you could begin to spell the next character in the key (next stage), otherwise, you''ve finished all the spelling.


Example:
Input: ring = "godding", key = "gd"
Output: 4
Explanation:
For the first key character ''g'', since it is already in place, we just need 1 step to spell this character. 
For the second key character ''d'', we need to rotate the ring "godding" anticlockwise by two steps to make it become "ddinggo".

Also, we need 1 more step for spelling.

So the final output is 4.

Note:
Length of both ring and key will be in range 1 to 100.

There are only lowercase letters in both strings and might be some duplcate characters in both strings.

It''s guaranteed that string key could always be spelled by rotating the string ring.', false, 'Hard', NULL, 45, 
   0, 'https://leetcode.com/problems/freedom-trail', 187, 22.4, 49.7, '["DE Shaw"]'::jsonb, '["Divide and Conquer,Dynamic Programming,Depth-first Search"]'::jsonb, 
   522, 27, 95, false, '[]'::jsonb, true),
  (515, 'Find Largest Value in Each Tree Row', 'Given the `root` of a binary tree, return an array of the largest value in each row of the tree (0-indexed).


Example 1:
Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]

Example 2:
Input: root = [1,2,3]
Output: [1,3]

Example 3:
Input: root = [1]
Output: [1]

Example 4:
Input: root = [1,null,2]
Output: [1,2]

Example 5:
Input: root = []
Output: []

Constraints:
The number of nodes in the tree will be in the range `[0, 104]`.

`-231 <= Node.val <= 231 - 1`', false, 'Medium', NULL, 62.4, 
   9.3, 'https://leetcode.com/problems/find-largest-value-in-each-tree-row', 999, 132.2, 211.9, '["Facebook"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   1280, 72, 95, true, '[]'::jsonb, true),
  (516, 'Longest Palindromic Subsequence', 'Given a string `s`, find the longest palindromic subsequence''s length in `s`.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.


Example 1:
Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".


Example 2:
Input: s = "cbbd"
Output: 2
Explanation: One possible longest palindromic subsequence is "bb".


Constraints:
`1 <= s.length <= 1000`
`s` consists only of lowercase English letters.', false, 'Medium', NULL, 55.8, 
   32, 'https://leetcode.com/problems/longest-palindromic-subsequence', 730, 164.1, 294, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   3000, 216, 93, true, '[]'::jsonb, true),
  (517, 'Super Washing Machines', 'You have n super washing machines on a line. Initially, each washing machine has some dresses or is empty. 
For each move, you could choose any m (1 ≤ m ≤ n) washing machines, and pass one dress of each washing machine to one of its adjacent washing machines  at the same time .  
Given an integer array representing the number of dresses in each washing machine from left to right on the line, you should find the minimum number of moves to make all the washing machines have the same number of dresses. If it is not possible to do it, return -1.


Example1
Input: [1,0,5]
Output: 3
Explanation: 
1st move:    1     0 <-- 5    =>    1     1     4
2nd move:    1 <-- 1 <-- 4    =>    2     1     3    
3rd move:    2     1 <-- 3    =>    2     2     2   

Example2
Input: [0,3,0]
Output: 2
Explanation: 
1st move:    0 <-- 3     0    =>    1     2     0    
2nd move:    1     2 --> 0    =>    1     1     1     

Example3
Input: [0,2,0]
Output: -1
Explanation: 
It''s impossible to make all the three washing machines have the same number of dresses. 
Note:
The range of n is [1, 10000].

The range of dresses number in a super washing machine is [0, 1e5].', false, 'Hard', '/articles/super-washing-machines', 38.7, 
   9.6, 'https://leetcode.com/problems/super-washing-machines', 85, 18.8, 48.6, '["Amazon"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   405, 163, 71, true, '[]'::jsonb, true),
  (518, 'Coin Change 2', 'You are given coins of different denominations and a total amount of money. Write a function to compute the number of combinations that make up that amount. You may assume that you have infinite number of each kind of coin.


Example 1:
Input: amount = 5, coins = [1, 2, 5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

Example 2:
Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.


Example 3:
Input: amount = 10, coins = [10] 
Output: 1
Note:
You can assume that
0 <= amount <= 5000
1 <= coin <= 5000
the number of coins is less than 500
the answer is guaranteed to fit into signed 32-bit integer', false, 'Medium', '/articles/coin-change-ii', 52.1, 
   68.5, 'https://leetcode.com/problems/coin-change-2', 655, 185.6, 356.5, '["Amazon,Microsoft,Bloomberg,Apple,Adobe,Qualtrics,ByteDance"]'::jsonb, '[]'::jsonb, 
   2991, 76, 98, true, '[]'::jsonb, true),
  (519, 'Random Flip Matrix', 'You are given the number of rows `n_rows` and number of columns `n_cols` of a 2D binary matrix where all values are initially 0. Write a function `flip` which chooses a 0 value uniformly at random, changes it to 1, and then returns the position `[row.id, col.id]` of that value. Also, write a function `reset` which sets all values back to 0. Try to minimize the number of calls to system''s Math.random() and optimize the time and space complexity.

Note:
`1 <= n_rows, n_cols <= 10000`
`0 <= row.id < n_rows` and `0 <= col.id < n_cols`
`flip` will not be called when the matrix has no 0 values left.

the total number of calls to `flip` and `reset` will not exceed 1000.


Example 1:
Input: 
["Solution","flip","flip","flip","flip"]
[[2,3],[],[],[],[]]
Output: [null,[0,1],[1,2],[1,0],[1,1]]

Example 2:
Input: 
["Solution","flip","flip","reset","flip"]
[[1,2],[],[],[],[]]
Output: [null,[0,0],[0,1],null,[0,0]]
Explanation of Input Syntax:
The input is two lists: the subroutines called and their arguments. `Solution`''s constructor has two arguments, `n_rows` and `n_cols`. `flip` and `reset` have no arguments. Arguments are always wrapped with a list, even if there aren''t any.', false, 'Medium', '/articles/random-flip-matrix', 37.8, 
   0, 'https://leetcode.com/problems/random-flip-matrix', 71, 10.3, 27.2, '["Google"]'::jsonb, '["Random"]'::jsonb, 
   220, 73, 75, true, '[]'::jsonb, true),
  (520, 'Detect Capital', 'Given a word, you need to judge whether the usage of capitals in it is right or not.

We define the usage of capitals in a word to be right when one of the following cases holds:
All letters in this word are capitals, like "USA".

All letters in this word are not capitals, like "leetcode".

Only the first letter in this word is capital, like "Google".

Otherwise, we define that this word doesn''t use capitals in a right way.


Example 1:
Input: "USA"
Output: True

Example 2:
Input: "FlaG"
Output: False
Note: The input will be a non-empty word consisting of uppercase and lowercase latin letters.', false, 'Easy', '/articles/detect-capital', 54.1, 
   3.6, 'https://leetcode.com/problems/detect-capital', 999, 190.1, 351.1, '["Google"]'::jsonb, '["String"]'::jsonb, 
   801, 291, 73, true, '[]'::jsonb, true),
  (521, 'Longest Uncommon Subsequence I', 'Given two strings `a` and `b`, find the length of the longest uncommon subsequence between them.

A subsequence of a string `s` is a string that can be obtained after deleting any number of characters from `s`. For example, `"abc"` is a subsequence of `"aebdc"` because you can delete the underlined characters in `"aebdc"` to get `"abc"`. Other subsequences of `"aebdc"` include `"aebdc"`, `"aeb"`, and `""` (empty string).

An uncommon subsequence between two strings is a string that is a subsequence of one but not the other.

Return the length of the longest uncommon subsequence between `a` and `b`. If the longest uncommon subsequence doesn''t exist, return `-1`.


Example 1:
Input: a = "aba", b = "cdc"
Output: 3
Explanation: One longest uncommon subsequence is "aba" because "aba" is a subsequence of "aba" but not "cdc".

Note that "cdc" is also a longest uncommon subsequence.


Example 2:
Input: a = "aaa", b = "bbb"
Output: 3
Explanation: The longest uncommon subsequences are "aaa" and "bbb".


Example 3:
Input: a = "aaa", b = "aaa"
Output: -1
Explanation: Every subsequence of string a is also a subsequence of string b. Similarly, every subsequence of string b is also a subsequence of string a.


Constraints:
`1 <= a.length, b.length <= 100`
`a` and `b` consist of lower-case English letters.', false, 'Easy', '/articles/longest-uncommon-subsequence-i', 59.1, 
   1.2, 'https://leetcode.com/problems/longest-uncommon-subsequence-i', 266, 70.1, 118.7, '["Google"]'::jsonb, '["String,Brainteaser"]'::jsonb, 
   402, 4712, 8, true, '[]'::jsonb, true),
  (522, 'Longest Uncommon Subsequence II', 'Given a list of strings, you need to find the longest uncommon subsequence among them. The longest uncommon subsequence is defined as the longest subsequence of one of these strings and this subsequence should not be any subsequence of the other strings.

A subsequence is a sequence that can be derived from one sequence by deleting some characters without changing the order of the remaining elements. Trivially, any string is a subsequence of itself and an empty string is a subsequence of any string.

The input will be a list of strings, and the output needs to be the length of the longest uncommon subsequence. If the longest uncommon subsequence doesn''t exist, return -1.


Example 1:
Input: "aba", "cdc", "eae"
Output: 3
Note:
All the given strings'' lengths will not exceed 10.

The length of the given list will be in the range of [2, 50].', false, 'Medium', '/articles/longest-uncommon-subsequence-ii', 34.3, 
   2.8, 'https://leetcode.com/problems/longest-uncommon-subsequence-ii', 143, 24.6, 71.8, '["Google"]'::jsonb, '["String"]'::jsonb, 
   216, 654, 25, true, '[]'::jsonb, true),
  (523, 'Continuous Subarray Sum', 'Given an integer array `nums` and an integer `k`, return `true` if `nums` has a continuous subarray of size at least two whose elements sum up to a multiple of `k`, or `false` otherwise.

An integer `x` is a multiple of `k` if there exists an integer `n` such that `x = n * k`. `0` is always a multiple of `k`.


Example 1:
Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.


Example 2:
Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.

42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.


Example 3:
Input: nums = [23,2,6,4,7], k = 13
Output: false

Constraints:
`1 <= nums.length <= 105`
`0 <= nums[i] <= 109`
`0 <= sum(nums[i]) <= 231 - 1`
`1 <= k <= 231 - 1`', false, 'Medium', '/articles/continuous-subarray-sum', 24.8, 
   46, 'https://leetcode.com/problems/continuous-subarray-sum', 488, 184.5, 743.7, '["Facebook,Amazon"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   49, 7, 88, true, '[]'::jsonb, true),
  (524, 'Longest Word in Dictionary through Deleting', 'Given a string `s` and a string array `dictionary`, return the longest string in the dictionary that can be formed by deleting some of the given string characters. If there is more than one possible result, return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.


Example 1:
Input: s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
Output: "apple"

Example 2:
Input: s = "abpcplea", dictionary = ["a","b","c"]
Output: "a"

Constraints:
`1 <= s.length <= 1000`
`1 <= dictionary.length <= 1000`
`1 <= dictionary[i].length <= 1000`
`s` and `dictionary[i]` consist of lowercase English letters.', false, 'Medium', '/articles/longest-word-in-dictionary-through-deletion', 50.1, 
   29.6, 'https://leetcode.com/problems/longest-word-in-dictionary-through-deleting', 553, 103.5, 206.6, '["Goldman Sachs"]'::jsonb, '["Two Pointers,Sort"]'::jsonb, 
   984, 295, 77, false, '[]'::jsonb, true),
  (525, 'Contiguous Array', 'Given a binary array, find the maximum length of a contiguous subarray with equal number of 0 and 1. 

Example 1:
Input: [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with equal number of 0 and 1.


Example 2:
Input: [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.

Note:
The length of the given binary array will not exceed 50,000.', false, 'Medium', '/articles/contiguous-array', 43.6, 
   40.1, 'https://leetcode.com/problems/contiguous-array', 590, 184.9, 424.4, '["Facebook,Amazon"]'::jsonb, '["Hash Table"]'::jsonb, 
   2737, 137, 95, true, '[]'::jsonb, true),
  (526, 'Beautiful Arrangement', 'Suppose you have `n` integers labeled `1` through `n`. A permutation of those `n` integers `perm` (1-indexed) is considered a beautiful arrangement if for every `i` (`1 <= i <= n`), either of the following is true:
`perm[i]` is divisible by `i`.

`i` is divisible by `perm[i]`.

Given an integer `n`, return the number of the beautiful arrangements that you can construct.


Example 1:
Input: n = 2
Output: 2
Explanation: 
The first beautiful arrangement is [1,2]:
    - perm[1] = 1 is divisible by i = 1
    - perm[2] = 2 is divisible by i = 2
The second beautiful arrangement is [2,1]:
    - perm[1] = 2 is divisible by i = 1
    - i = 2 is divisible by perm[2] = 1

Example 2:
Input: n = 1
Output: 1

Constraints:
`1 <= n <= 15`', false, 'Medium', '/articles/beautiful-arrangement', 62, 
   59.1, 'https://leetcode.com/problems/beautiful-arrangement', 415, 88.8, 143.1, '["Mathworks,C3 IoT,Cisco"]'::jsonb, '["Backtracking,Depth-first Search"]'::jsonb, 
   1208, 214, 85, false, '[]'::jsonb, true),
  (527, 'Word Abbreviation', 'Given an array of n distinct non-empty strings, you need to generate minimal possible abbreviations for every word following rules below.

Begin with the first character and then the number of characters abbreviated, which followed by the last character.

If there are any conflict, that is more than one words share the same abbreviation, a longer prefix is used instead of only the first character until making the map from word to abbreviation become unique. In other words, a final abbreviation cannot map to more than one original words.

 If the abbreviation doesn''t make the word shorter, then keep it as original.


Example:
Input: ["like", "god", "internal", "me", "internet", "interval", "intension", "face", "intrusion"]
Output: ["l2e","god","internal","me","i6t","interval","inte4n","f2e","intr4n"]
Note:
 Both n and the length of each word will not exceed 400.

 The length of each word is greater than 1.

 The words consist of lowercase English letters only.

 The return answers should be in the same order as the original array.', true, 'Hard', '/articles/word-abbreviation', 56.4, 
   0, 'https://leetcode.com/problems/word-abbreviation', 121, 19, 33.8, '["Google"]'::jsonb, '["String,Sort"]'::jsonb, 
   248, 163, 60, true, '[]'::jsonb, true),
  (528, 'Random Pick with Weight', 'You are given an array of positive integers `w` where `w[i]` describes the weight of `i``th` index (0-indexed).

We need to call the function `pickIndex()` which randomly returns an integer in the range `[0, w.length - 1]`. `pickIndex()` should return the integer proportional to its weight in the `w` array. For example, for `w = [1, 3]`, the probability of picking the index `0` is `1 / (1 + 3) = 0.25` (i.e 25%) while the probability of picking the index `1` is `3 / (1 + 3) = 0.75` (i.e 75%).

More formally, the probability of picking index `i` is `w[i] / sum(w)`.


Example 1:
Input
["Solution","pickIndex"]
[[[1]],[]]
Output
[null,0]
Explanation
Solution solution = new Solution([1]);
solution.pickIndex(); // return 0. Since there is only one single element on the array the only option is to return the first element.


Example 2:
Input
["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
[[[1,3]],[],[],[],[],[]]
Output
[null,1,1,1,1,0]
Explanation
Solution solution = new Solution([1, 3]);
solution.pickIndex(); // return 1. It''s returning the second element (index = 1) that has probability of 3/4.

solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 0. It''s returning the first element (index = 0) that has probability of 1/4.

Since this is a randomization problem, multiple answers are allowed so the following outputs can be considered correct :
[null,1,1,1,1,0]
[null,1,1,1,1,1]
[null,1,1,1,0,0]
[null,1,1,1,0,1]
[null,1,0,1,0,0]
......

and so on.


Constraints:
`1 <= w.length <= 10000`
`1 <= w[i] <= 10^5`
`pickIndex` will be called at most `10000` times.', false, 'Medium', '/articles/random-pick-with-weight', 44.7, 
   80.3, 'https://leetcode.com/problems/random-pick-with-weight', 539, 166.4, 371.9, '["Facebook,Google,ByteDance,Bloomberg,Apple,Roblox,LinkedIn,Amazon,Expedia,Yelp,Snapchat"]'::jsonb, '["Binary Search,Random"]'::jsonb, 
   1208, 2776, 30, true, '[]'::jsonb, true),
  (529, 'Minesweeper', 'Let''s play the minesweeper game (Wikipedia, online game)!
You are given a 2D char matrix representing the game board. ''M'' represents an unrevealed mine, ''E'' represents an unrevealed empty square, ''B'' represents a revealed blank square that has no adjacent (above, below, left, right, and all 4 diagonals) mines, digit (''1'' to ''8'') represents how many mines are adjacent to this revealed square, and finally ''X'' represents a revealed mine.

Now given the next click position (row and column indices) among all the unrevealed squares (''M'' or ''E''), return the board after revealing this position according to the following rules:
If a mine (''M'') is revealed, then the game is over - change it to ''X''.

If an empty square (''E'') with no adjacent mines is revealed, then change it to revealed blank (''B'') and all of its adjacent unrevealed squares should be revealed recursively.

If an empty square (''E'') with at least one adjacent mine is revealed, then change it to a digit (''1'' to ''8'') representing the number of adjacent mines.

Return the board when no more squares will be revealed.


Example 1:
Input: 
[[''E'', ''E'', ''E'', ''E'', ''E''],
 [''E'', ''E'', ''M'', ''E'', ''E''],
 [''E'', ''E'', ''E'', ''E'', ''E''],
 [''E'', ''E'', ''E'', ''E'', ''E'']]
Click : [3,0]
Output: 
[[''B'', ''1'', ''E'', ''1'', ''B''],
 [''B'', ''1'', ''M'', ''1'', ''B''],
 [''B'', ''1'', ''1'', ''1'', ''B''],
 [''B'', ''B'', ''B'', ''B'', ''B'']]
Explanation:

Example 2:
Input: 
[[''B'', ''1'', ''E'', ''1'', ''B''],
 [''B'', ''1'', ''M'', ''1'', ''B''],
 [''B'', ''1'', ''1'', ''1'', ''B''],
 [''B'', ''B'', ''B'', ''B'', ''B'']]
Click : [1,2]
Output: 
[[''B'', ''1'', ''E'', ''1'', ''B''],
 [''B'', ''1'', ''X'', ''1'', ''B''],
 [''B'', ''1'', ''1'', ''1'', ''B''],
 [''B'', ''B'', ''B'', ''B'', ''B'']]
Explanation:
Note:
The range of the input matrix''s height and width is [1,50].

The click position will only be an unrevealed square (''M'' or ''E''), which also means the input board contains at least one clickable square.

The input board won''t be a stage when game is over (some mines have been revealed).

For simplicity, not mentioned rules should be ignored in this problem. For example, you don''t need to reveal all the unrevealed mines when the game is over, consider any cases that you will win the game or flag any squares.', false, 'Medium', NULL, 61.5, 
   50.9, 'https://leetcode.com/problems/minesweeper', 522, 81.8, 133, '["Uber,Google,Amazon,Facebook,Zillow,LiveRamp"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   858, 643, 57, true, '[]'::jsonb, true),
  (530, 'Minimum Absolute Difference in BST', 'Given a binary search tree with non-negative values, find the minimum absolute difference between values of any two nodes.


Example:
Input:
   1
    \\
     3
    /
   2
Output:
1
Explanation:
The minimum absolute difference is 1, which is the difference between 2 and 1 (or between 2 and 3).

Note:
There are at least two nodes in this BST.

This question is the same as 783: https://leetcode.com/problems/minimum-distance-between-bst-nodes/', false, 'Easy', NULL, 55, 
   18.6, 'https://leetcode.com/problems/minimum-absolute-difference-in-bst', 614, 110.4, 200.6, '["Google"]'::jsonb, '["Tree"]'::jsonb, 
   1203, 91, 93, true, '[]'::jsonb, true),
  (531, 'Lonely Pixel I', 'Given an `m x n` `picture` consisting of black `''B''` and white `''W''` pixels, return the number of black lonely pixels.

A black lonely pixel is a character `''B''` that located at a specific position where the same row and same column don''t have any other black pixels.


Example 1:
Input: picture = [["W","W","B"],["W","B","W"],["B","W","W"]]
Output: 3
Explanation: All the three ''B''s are black lonely pixels.


Example 2:
Input: picture = [["B","B","B"],["B","B","B"],["B","B","B"]]
Output: 0

Constraints:
`m == picture.length`
`n == picture[i].length`
`1 <= m, n <= 500`
`picture[i][j]` is `''W''` or `''B''`.', true, 'Medium', NULL, 59.7, 
   12, 'https://leetcode.com/problems/lonely-pixel-i', 200, 24.4, 40.9, '["Microsoft"]'::jsonb, '["Array,Depth-first Search"]'::jsonb, 
   226, 33, 87, false, '[]'::jsonb, true),
  (532, 'K-diff Pairs in an Array', 'Given an array of integers `nums` and an integer `k`, return the number of unique k-diff pairs in the array.

A k-diff pair is an integer pair `(nums[i], nums[j])`, where the following are true:
`0 <= i, j < nums.length`
`i != j`
`|nums[i] - nums[j]| == k`
Notice that `|val|` denotes the absolute value of `val`.


Example 1:
Input: nums = [3,1,4,1,5], k = 2
Output: 2
Explanation: There are two 2-diff pairs in the array, (1, 3) and (3, 5).

Although we have two 1s in the input, we should only return the number of unique pairs.


Example 2:
Input: nums = [1,2,3,4,5], k = 1
Output: 4
Explanation: There are four 1-diff pairs in the array, (1, 2), (2, 3), (3, 4) and (4, 5).


Example 3:
Input: nums = [1,3,1,5,4], k = 0
Output: 1
Explanation: There is one 0-diff pair in the array, (1, 1).


Example 4:
Input: nums = [1,2,4,4,3,3,0,9,2,3], k = 3
Output: 2

Example 5:
Input: nums = [-1,-2,-3], k = 1
Output: 2

Constraints:
`1 <= nums.length <= 104`
`-107 <= nums[i] <= 107`
`0 <= k <= 107`', false, 'Medium', '/articles/k-diff-pairs-in-an-array', 35.5, 
   56.9, 'https://leetcode.com/problems/k-diff-pairs-in-an-array', 842, 163.3, 459.8, '["Twitter,Citrix,Amazon,Goldman Sachs,Expedia"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   1099, 1569, 41, true, '[]'::jsonb, true),
  (533, 'Lonely Pixel II', 'Given a picture consisting of black and white pixels, and a positive integer N, find the number of black pixels located at some specific row R and column C that align with all the following rules:
 Row R and column C both contain exactly N black pixels.

 For all rows that have a black pixel at column C, they should be exactly the same as row R
The picture is represented by a 2D char array consisting of ''B'' and ''W'', which means black and white pixels respectively. 

Example:
Input:                                            
[[''W'', ''B'', ''W'', ''B'', ''B'', ''W''],    
 [''W'', ''B'', ''W'', ''B'', ''B'', ''W''],    
 [''W'', ''B'', ''W'', ''B'', ''B'', ''W''],    
 [''W'', ''W'', ''B'', ''W'', ''B'', ''W'']] 
N = 3
Output: 6
Explanation: All the bold ''B'' are the black pixels we need (all ''B''s at column 1 and 3).

        0    1    2    3    4    5         column index                                            
0    [[''W'', ''B'', ''W'', ''B'', ''B'', ''W''],    
1     [''W'', ''B'', ''W'', ''B'', ''B'', ''W''],    
2     [''W'', ''B'', ''W'', ''B'', ''B'', ''W''],    
3     [''W'', ''W'', ''B'', ''W'', ''B'', ''W'']]    
row index
Take ''B'' at row R = 0 and column C = 1 as an example:
Rule 1, row R = 0 and column C = 1 both have exactly N = 3 black pixels. 
Rule 2, the rows have black pixel at column C = 1 are row 0, row 1 and row 2. They are exactly the same as row R = 0.

Note:
The range of width and height of the input 2D array is [1,200].', true, 'Medium', NULL, 48.2, 
   0, 'https://leetcode.com/problems/lonely-pixel-ii', 68, 11.1, 23.1, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   58, 605, 9, true, '[]'::jsonb, true),
  (534, 'Game Play Analysis III', 'SQL Schema', true, 'Medium', NULL, 79.9, 
   3.4, 'https://leetcode.com/problems/game-play-analysis-iii', 207, 23.7, 29.6, '["GSN Games"]'::jsonb, '[]'::jsonb, 
   139, 7, 95, false, '[]'::jsonb, true),
  (535, 'Encode and Decode TinyURL', 'Note: This is a companion problem to the System Design problem: Design TinyURL.

TinyURL is a URL shortening service where you enter a URL such as `https://leetcode.com/problems/design-tinyurl` and it returns a short URL such as `http://tinyurl.com/4e9iAk`.

Design the `encode` and `decode` methods for the TinyURL service. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that a URL can be encoded to a tiny URL and the tiny URL can be decoded to the original URL.', false, 'Medium', '/articles/encode-and-decode-tinyurl', 82.3, 
   17.8, 'https://leetcode.com/problems/encode-and-decode-tinyurl', 553, 142.2, 172.7, '["Microsoft,Amazon"]'::jsonb, '["Hash Table,Math"]'::jsonb, 
   894, 1793, 33, true, '[]'::jsonb, true),
  (536, 'Construct Binary Tree from String', 'You need to construct a binary tree from a string consisting of parenthesis and integers.

The whole input represents a binary tree. It contains an integer followed by zero, one or two pairs of parenthesis. The integer represents the root''s value and a pair of parenthesis contains a child binary tree with the same structure.

You always start to construct the left child node of the parent first if it exists.


Example 1:
Input: s = "4(2(3)(1))(6(5))"
Output: [4,2,6,3,1,5]

Example 2:
Input: s = "4(2(3)(1))(6(5)(7))"
Output: [4,2,6,3,1,5,7]

Example 3:
Input: s = "-4(2(3)(1))(6(5)(7))"
Output: [-4,2,6,3,1,5,7]

Constraints:
`0 <= s.length <= 3 * 104`
`s` consists of digits, `''(''`, `'')''`, and `''-''` only.', true, 'Medium', '/articles/construct-binary-tree-from-string', 52.1, 
   13.8, 'https://leetcode.com/problems/construct-binary-tree-from-string', 301, 43.6, 83.6, '["Facebook"]'::jsonb, '["String,Tree"]'::jsonb, 
   590, 105, 85, true, '[]'::jsonb, true),
  (537, 'Complex Number Multiplication', 'Given two strings representing two complex numbers.

You need to return a string representing their multiplication. Note i2 = -1 according to the definition.


Example 1:
Input: "1+1i", "1+1i"
Output: "0+2i"
Explanation: (1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i, and you need convert it to the form of 0+2i.


Example 2:
Input: "1+-1i", "1+-1i"
Output: "0+-2i"
Explanation: (1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i, and you need convert it to the form of 0+-2i.

Note:
The input strings will not have extra blank.

The input strings will be given in the form of a+bi, where the integer a and b will both belong to the range of [-100, 100]. And the output should be also in this form.', false, 'Medium', '/articles/complex-number-multiplication', 68.4, 
   3.8, 'https://leetcode.com/problems/complex-number-multiplication', 423, 54.2, 79.3, '["Amazon"]'::jsonb, '["Math,String"]'::jsonb, 
   293, 806, 27, true, '[]'::jsonb, true),
  (538, 'Convert BST to Greater Tree', 'Given the `root` of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

As a reminder, a binary search tree is a tree that satisfies these constraints:
The left subtree of a node contains only nodes with keys less than the node''s key.

The right subtree of a node contains only nodes with keys greater than the node''s key.

Both the left and right subtrees must also be binary search trees.

Note: This question is the same as 1038: https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/

Example 1:
Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]

Example 2:
Input: root = [0,null,1]
Output: [1,null,1]

Example 3:
Input: root = [1,0,2]
Output: [3,3,2]

Example 4:
Input: root = [3,2,4,1]
Output: [7,9,4,10]

Constraints:
The number of nodes in the tree is in the range `[0, 104]`.

`-104 <= Node.val <= 104`
All the values in the tree are unique.

`root` is guaranteed to be a valid binary search tree.', false, 'Medium', '/articles/convert-bst-to-greater-tree', 59.8, 
   7.6, 'https://leetcode.com/problems/convert-bst-to-greater-tree', 805, 163.9, 274.2, '["Facebook,Amazon"]'::jsonb, '["Tree,Depth-first Search,Binary Search Tree,Recursion"]'::jsonb, 
   2571, 144, 95, true, '[]'::jsonb, true),
  (539, 'Minimum Time Difference', 'Given a list of 24-hour clock time points in "HH:MM" format, return the minimum minutes difference between any two time-points in the list.


Example 1:
Input: timePoints = ["23:59","00:00"]
Output: 1

Example 2:
Input: timePoints = ["00:00","23:59","00:00"]
Output: 0

Constraints:
`2 <= timePoints <= 2 * 104`
`timePoints[i]` is in the format "HH:MM".', false, 'Medium', NULL, 52.4, 
   48.3, 'https://leetcode.com/problems/minimum-time-difference', 373, 60.7, 115.7, '["Palantir Technologies"]'::jsonb, '["String"]'::jsonb, 
   663, 171, 79, false, '[]'::jsonb, true),
  (540, 'Single Element in a Sorted Array', 'You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once. Find this single element that appears only once.

Follow up: Your solution should run in O(log n) time and O(1) space.


Example 1:
Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2

Example 2:
Input: nums = [3,3,7,7,10,11,11]
Output: 10

Constraints:
`1 <= nums.length <= 10^5`
`0 <= nums[i] <= 10^5`', false, 'Medium', '/articles/single-element-in-a-sorted-array', 57.9, 
   45.4, 'https://leetcode.com/problems/single-element-in-a-sorted-array', 999, 186.3, 321.6, '["Amazon,Facebook,Twitter"]'::jsonb, '["Binary Search"]'::jsonb, 
   2370, 86, 96, true, '[]'::jsonb, true),
  (541, 'Reverse String II', 'Given a string `s` and an integer `k`, reverse the first `k` characters for every `2k` characters counting from the start of the string.

If there are fewer than `k` characters left, reverse all of them. If there are less than `2k` but greater than or equal to `k` characters, then reverse the first `k` characters and left the other as original.


Example 1:
Input: s = "abcdefg", k = 2
Output: "bacdfeg"

Example 2:
Input: s = "abcd", k = 2
Output: "bacd"

Constraints:
`1 <= s.length <= 104`
`s` consists of only lowercase English letters.

`1 <= k <= 104`', false, 'Easy', '/articles/reverse-string-ii', 49.5, 
   18.7, 'https://leetcode.com/problems/reverse-string-ii', 696, 112.2, 226.4, '["Apple"]'::jsonb, '["String"]'::jsonb, 
   583, 1626, 26, true, '[]'::jsonb, true),
  (542, '01 Matrix', 'Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.


Example 1: 
Input:
[[0,0,0],
 [0,1,0],
 [0,0,0]]
Output:
[[0,0,0],
 [0,1,0],
 [0,0,0]]

Example 2: 
Input:
[[0,0,0],
 [0,1,0],
 [1,1,1]]
Output:
[[0,0,0],
 [0,1,0],
 [1,2,1]]
Note:
The number of elements of the given matrix will not exceed 10,000.

There are at least one 0 in the given matrix.

The cells are adjacent in only four directions: up, down, left and right.', false, 'Medium', '/articles/01-matrix', 41.1, 
   29.8, 'https://leetcode.com/problems/01-matrix', 599, 121.2, 295.2, '["Amazon,Microsoft"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   2224, 126, 95, true, '[]'::jsonb, true),
  (543, 'Diameter of Binary Tree', 'Given the `root` of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.

The length of a path between two nodes is represented by the number of edges between them.


Example 1:
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3is the length of the path [4,2,1,3] or [5,2,1,3].


Example 2:
Input: root = [1,2]
Output: 1

Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-100 <= Node.val <= 100`', false, 'Easy', '/articles/diameter-of-binary-tree', 49.5, 
   59.3, 'https://leetcode.com/problems/diameter-of-binary-tree', 999, 458.4, 926.8, '["Facebook,Microsoft,Bloomberg,Amazon,Google,ByteDance,Oracle"]'::jsonb, '["Tree"]'::jsonb, 
   4509, 282, 94, true, '[]'::jsonb, true),
  (544, 'Output Contest Matches', 'During the NBA playoffs, we always arrange the rather strong team to play with the rather weak team, like make the rank 1 team play with the rank nth team, which is a good strategy to make the contest more interesting. Now, you''re given n teams, you need to output their final contest matches in the form of a string.

The n teams are given in the form of positive integers from 1 to n, which represents their initial rank. (Rank 1 is the strongest team and Rank n is the weakest team.) We''ll use parentheses(''('', '')'') and commas('','') to represent the contest team pairing - parentheses(''('' , '')'') for pairing and commas('','') for partition. During the pairing process in each round, you always need to follow the strategy of making the rather strong one pair with the rather weak one.


Example 1:
Input: 2
Output: (1,2)
Explanation: 
Initially, we have the team 1 and the team 2, placed like: 1,2.

Then we pair the team (1,2) together with ''('', '')'' and '','', which is the final answer.


Example 2:
Input: 4
Output: ((1,4),(2,3))
Explanation: 
In the first round, we pair the team 1 and 4, the team 2 and 3 together, as we need to make the strong team and weak team together.

And we got (1,4),(2,3).

In the second round, the winners of (1,4) and (2,3) need to play again to generate the final winner, so you need to add the paratheses outside them.

And we got the final answer ((1,4),(2,3)).


Example 3:
Input: 8
Output: (((1,8),(4,5)),((2,7),(3,6)))
Explanation: 
First round: (1,8),(2,7),(3,6),(4,5)
Second round: ((1,8),(4,5)),((2,7),(3,6))
Third round: (((1,8),(4,5)),((2,7),(3,6)))
Since the third round will generate the final winner, you need to output the answer (((1,8),(4,5)),((2,7),(3,6))).

Note:
The n is in range [2, 212].

We ensure that the input n can be converted into the form 2k, where k is a positive integer.', true, 'Medium', '/articles/output-contest-matches', 75.9, 
   6.2, 'https://leetcode.com/problems/output-contest-matches', 202, 22.7, 29.9, '["Google"]'::jsonb, '["String,Recursion"]'::jsonb, 
   307, 100, 75, true, '[]'::jsonb, true),
  (545, 'Boundary of Binary Tree', 'The boundary of a binary tree is the concatenation of the root, the left boundary, the leaves ordered from left-to-right, and the reverse order of the right boundary.

The left boundary is the set of nodes defined by the following:
The root node''s left child is in the left boundary. If the root does not have a left child, then the left boundary is empty.

If a node in the left boundary and has a left child, then the left child is in the left boundary.

If a node is in the left boundary, has no left child, but has a right child, then the right child is in the left boundary.

The leftmost leaf is not in the left boundary.

The right boundary is similar to the left boundary, except it is the right side of the root''s right subtree. Again, the leaf is not part of the right boundary, and the right boundary is empty if the root does not have a right child.

The leaves are nodes that do not have any children. For this problem, the root is not a leaf.

Given the `root` of a binary tree, return the values of its boundary.


Example 1:
Input: root = [1,null,2,3,4]
Output: [1,3,4,2]
Explanation:
- The left boundary is empty because the root does not have a left child.

- The right boundary follows the path starting from the root''s right child 2 -> 4.

  4 is a leaf, so the right boundary is [2].

- The leaves from left to right are [3,4].

Concatenating everything results in [1] + [] + [3,4] + [2] = [1,3,4,2].


Example 2:
Input: root = [1,2,3,4,5,6,null,null,null,7,8,9,10]
Output: [1,2,4,7,8,9,10,6,3]
Explanation:
- The left boundary follows the path starting from the root''s left child 2 -> 4.

  4 is a leaf, so the left boundary is [2].

- The right boundary follows the path starting from the root''s right child 3 -> 6 -> 10.

  10 is a leaf, so the right boundary is [3,6], and in reverse order is [6,3].

- The leaves from left to right are [4,7,8,9,10].

Concatenating everything results in [1] + [2] + [4,7,8,9,10] + [6,3] = [1,2,4,7,8,9,10,6,3].


Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-1000 <= Node.val <= 1000`', true, 'Medium', '/articles/boundary-of-binary-tree', 40.3, 
   53.6, 'https://leetcode.com/problems/boundary-of-binary-tree', 322, 69.8, 173.1, '["Microsoft,Amazon,eBay,Facebook,Oracle"]'::jsonb, '["Tree"]'::jsonb, 
   735, 1273, 37, true, '[]'::jsonb, true),
  (546, 'Remove Boxes', 'You are given several `boxes` with different colors represented by different positive numbers.

You may experience several rounds to remove boxes until there is no box left. Each time you can choose some continuous boxes with the same color (i.e., composed of `k` boxes, `k >= 1`), remove them and get `k * k` points.

Return the maximum points you can get.


Example 1:
Input: boxes = [1,3,2,2,2,3,4,3,1]
Output: 23
Explanation:
[1, 3, 2, 2, 2, 3, 4, 3, 1] 
----> [1, 3, 3, 4, 3, 1] (3*3=9 points) 
----> [1, 3, 3, 3, 1] (1*1=1 points) 
----> [1, 1] (3*3=9 points) 
----> [] (2*2=4 points)

Example 2:
Input: boxes = [1,1,1]
Output: 9

Example 3:
Input: boxes = [1]
Output: 1

Constraints:
`1 <= boxes.length <= 100`
`1 <= boxes[i] <= 100`', false, 'Hard', '/articles/remove-boxes', 44.1, 
   11.7, 'https://leetcode.com/problems/remove-boxes', 75, 18.7, 42.5, '["Apple,Amazon"]'::jsonb, '["Dynamic Programming,Depth-first Search"]'::jsonb, 
   847, 58, 94, true, '[]'::jsonb, true),
  (547, 'Number of Provinces', 'There are `n` cities. Some of them are connected, while some are not. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` if the `ith` city and the `jth` city are directly connected, and `isConnected[i][j] = 0` otherwise.

Return the total number of provinces.


Example 1:
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2

Example 2:
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3

Constraints:
`1 <= n <= 200`
`n == isConnected.length`
`n == isConnected[i].length`
`isConnected[i][j]` is `1` or `0`.

`isConnected[i][i] == 1`
`isConnected[i][j] == isConnected[j][i]`', false, 'Medium', '/articles/friend-circles', 60.7, 
   76.6, 'https://leetcode.com/problems/number-of-provinces', 999, 257.5, 424.1, '["Amazon,Two Sigma,Goldman Sachs,Dropbox,Facebook,Audible"]'::jsonb, '["Depth-first Search,Union Find"]'::jsonb, 
   2921, 178, 94, true, '[]'::jsonb, true),
  (548, 'Split Array with Equal Sum', 'Given an array with n integers, you need to find if there are triplets  (i, j, k) which satisfies following conditions:
 0 < i, i + 1 < j, j + 1 < k < n - 1 
 Sum of subarrays (0, i - 1), (i + 1, j - 1), (j + 1, k - 1) and (k + 1, n - 1) should be equal. 
where we define that subarray (L, R) represents a slice of the original array starting from the element indexed L to the element indexed R.


Example:
Input: [1,2,1,2,1,2,1]
Output: True
Explanation:
i = 1, j = 3, k = 5. 
sum(0, i - 1) = sum(0, 0) = 1
sum(i + 1, j - 1) = sum(2, 2) = 1
sum(j + 1, k - 1) = sum(4, 4) = 1
sum(k + 1, n - 1) = sum(6, 6) = 1
Note:
 1 <= n <= 2000. 
 Elements in the given array will be in range [-1,000,000, 1,000,000].', true, 'Medium', '/articles/split-array-with-equal-sum', 48.3, 
   13.5, 'https://leetcode.com/problems/split-array-with-equal-sum', 85, 16.7, 34.7, '["Facebook"]'::jsonb, '["Array"]'::jsonb, 
   286, 95, 75, true, '[]'::jsonb, true),
  (549, 'Binary Tree Longest Consecutive Sequence II', 'Given the `root` of a binary tree, return the length of the longest consecutive path in the tree.

This path can be either increasing or decreasing.

For example, `[1,2,3,4]` and `[4,3,2,1]` are both considered valid, but the path `[1,2,4,3]` is not valid.

On the other hand, the path can be in the child-Parent-child order, where not necessarily be parent-child order.


Example 1:
Input: root = [1,2,3]
Output: 2
Explanation: The longest consecutive path is [1, 2] or [2, 1].


Example 2:
Input: root = [2,1,3]
Output: 3
Explanation: The longest consecutive path is [1, 2, 3] or [3, 2, 1].


Constraints:
The number of nodes in the tree is in the range `[1, 3 * 104]`.

`-3 * 104 <= Node.val <= 3 * 104`', true, 'Medium', '/articles/binary-tree-longest-consecutive-sequence-ii', 47.2, 
   2.8, 'https://leetcode.com/problems/binary-tree-longest-consecutive-sequence-ii', 145, 31.3, 66.2, '["Facebook,Google"]'::jsonb, '["Tree"]'::jsonb, 
   680, 49, 93, true, '[]'::jsonb, true),
  (550, 'Game Play Analysis IV', 'SQL Schema', true, 'Medium', NULL, 45.7, 
   3.5, 'https://leetcode.com/problems/game-play-analysis-iv', 291, 19.8, 43.3, '["Facebook,GSN Games"]'::jsonb, '[]'::jsonb, 
   112, 33, 77, true, '[]'::jsonb, true),
  (551, 'Student Attendance Record I', 'You are given a string `s` representing an attendance record for a student where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:
`''A''`: Absent.

`''L''`: Late.

`''P''`: Present.

The student is eligible for an attendance award if they meet both of the following criteria:
The student was absent (`''A''`) for strictly fewer than 2 days total.

The student was never late (`''L''`) for 3 or more consecutive days.

Return `true` if the student is eligible for an attendance award, or `false` otherwise.


Example 1:
Input: s = "PPALLP"
Output: true
Explanation: The student has fewer than 2 absences and was never late 3 or more consecutive days.


Example 2:
Input: s = "PPALLL"
Output: false
Explanation: The student was late 3 consecutive days in the last 3 days, so is not eligible for the award.


Constraints:
`1 <= s.length <= 1000`
`s[i]` is either `''A''`, `''L''`, or `''P''`.', false, 'Easy', '/articles/student-attendance-record-i', 46.1, 
   4.5, 'https://leetcode.com/problems/student-attendance-record-i', 681, 107, 232.2, '["Google"]'::jsonb, '["String"]'::jsonb, 
   18, 2, 90, true, '[]'::jsonb, true),
  (552, 'Student Attendance Record II', 'An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:
`''A''`: Absent.

`''L''`: Late.

`''P''`: Present.

Any student is eligible for an attendance award if they meet both of the following criteria:
The student was absent (`''A''`) for strictly fewer than 2 days total.

The student was never late (`''L''`) for 3 or more consecutive days.

Given an integer `n`, return the number of possible attendance records of length `n` that make a student eligible for an attendance award. The answer may be very large, so return it modulo `109 + 7`.


Example 1:
Input: n = 2
Output: 8
Explanation: There are 8 records with length 2 that are eligible for an award:
"PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL"
Only "AA" is not eligible because there are 2 absences (there need to be fewer than 2).


Example 2:
Input: n = 1
Output: 3

Example 3:
Input: n = 10101
Output: 183236316

Constraints:
`1 <= n <= 105`', false, 'Hard', '/articles/student-attendance-record-ii', 37.7, 
   25.9, 'https://leetcode.com/problems/student-attendance-record-ii', 208, 29.8, 79, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   719, 129, 85, true, '[]'::jsonb, true),
  (553, 'Optimal Division', 'Given a list of positive integers, the adjacent integers will perform the float division. For example, [2,3,4] -> 2 / 3 / 4.

However, you can add any number of parenthesis at any position to change the priority of operations. You should find out how to add parenthesis to get the maximum result, and return the corresponding expression in string format. Your expression should NOT contain redundant parenthesis.


Example:
Input: [1000,100,10,2]
Output: "1000/(100/10/2)"
Explanation:
1000/(100/10/2) = 1000/((100/10)/2) = 200
However, the bold parenthesis in "1000/((100/10)/2)" are redundant, since they don''t influence the operation priority. So you should return "1000/(100/10/2)". 
Other cases:
1000/(100/10)/2 = 50
1000/(100/(10/2)) = 50
1000/100/10/2 = 0.5
1000/100/(10/2) = 2
Note:
The length of the input array is [1, 10].

Elements in the given array will be in range [2, 1000].

There is only one optimal division for each test case.', false, 'Medium', '/articles/optimal-division', 57.5, 
   9.3, 'https://leetcode.com/problems/optimal-division', 145, 27.5, 47.9, '["Amazon"]'::jsonb, '["Math,String"]'::jsonb, 
   197, 1210, 14, true, '[]'::jsonb, true),
  (554, 'Brick Wall', 'There is a brick wall in front of you. The wall is rectangular and has several rows of bricks. The bricks have the same height but different width. You want to draw a vertical line from the top to the bottom and cross the least bricks.

The brick wall is represented by a list of rows. Each row is a list of integers representing the width of each brick in this row from left to right.

If your line go through the edge of a brick, then the brick is not considered as crossed. You need to find out how to draw the line to cross the least bricks and return the number of crossed bricks.

You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks. 

Example:
Input: [[1,2,2,1],
        [3,1,2],
        [1,3,2],
        [2,4],
        [3,1,2],
        [1,3,1,1]]
Output: 2
Explanation: 
Note:
The width sum of bricks in different rows are the same and won''t exceed INT_MAX.

The number of bricks in each row is in range [1,10,000]. The height of wall is in range [1,10,000]. Total number of bricks of the wall won''t exceed 20,000.', false, 'Medium', '/articles/brick-wall', 50.8, 
   18.5, 'https://leetcode.com/problems/brick-wall', 342, 68.5, 134.9, '["Oracle"]'::jsonb, '["Hash Table"]'::jsonb, 
   1148, 58, 95, false, '[]'::jsonb, true),
  (555, 'Split Concatenated Strings', 'Given a list of strings, you could concatenate these strings together into a loop, where for each string you could choose to reverse it or not. Among all the possible loops, you need to find the lexicographically biggest string after cutting the loop, which will make the looped string into a regular one.

Specifically, to find the lexicographically biggest string, you need to experience two phases: 
Concatenate all the strings into a loop, where you can reverse some strings or not and connect them in the same order as given.

Cut and make one breakpoint in any place of the loop, which will make the looped string into a regular one starting from the character at the cutpoint. 
And your job is to find the lexicographically biggest one among all the possible regular strings.


Example:
Input: "abc", "xyz"
Output: "zyxcba"
Explanation: You can get the looped string "-abcxyz-", "-abczyx-", "-cbaxyz-", "-cbazyx-", where ''-'' represents the looped status. The answer string came from the fourth looped one, where you could cut from the middle character ''a'' and get "zyxcba".

Note:
The input strings will only contain lowercase letters.

The total length of all the strings will not over 1,000.', true, 'Medium', '/articles/split-concatenated-strings', 42.9, 
   0, 'https://leetcode.com/problems/split-concatenated-strings', 30, 5.4, 12.7, '["Alibaba"]'::jsonb, '["String"]'::jsonb, 
   60, 213, 22, false, '[]'::jsonb, true),
  (556, 'Next Greater Element III', 'Given a positive integer `n`, find the smallest integer which has exactly the same digits existing in the integer `n` and is greater in value than `n`. If no such positive integer exists, return `-1`.

Note that the returned integer should fit in 32-bit integer, if there is a valid answer but it does not fit in 32-bit integer, return `-1`.


Example 1:
Input: n = 12
Output: 21

Example 2:
Input: n = 21
Output: -1

Constraints:
`1 <= n <= 231 - 1`', false, 'Medium', '/articles/next-greater-element-iii', 33.5, 
   28.3, 'https://leetcode.com/problems/next-greater-element-iii', 536, 66.7, 199.3, '["ByteDance"]'::jsonb, '["String"]'::jsonb, 
   1142, 261, 81, false, '[]'::jsonb, true),
  (557, 'Reverse Words in a String III', 'Given a string `s`, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.


Example 1:
Input: s = "Let''s take LeetCode contest"
Output: "s''teL ekat edoCteeL tsetnoc"

Example 2:
Input: s = "God Ding"
Output: "doG gniD"

Constraints:
`1 <= s.length <= 5 * 104`
`s` contains printable ASCII characters.

`s` does not contain any leading or trailing spaces.

There is at least one word in `s`.

All the words in `s` are separated by a single space.', false, 'Easy', '/articles/reverse-words-in-a-string-iii', 72.4, 
   26.3, 'https://leetcode.com/problems/reverse-words-in-a-string-iii', 999, 253.4, 350.2, '["Amazon,Bloomberg"]'::jsonb, '["String"]'::jsonb, 
   1420, 103, 93, true, '[]'::jsonb, true),
  (558, 'Logical OR of Two Binary Grids Represented as Quad-Trees', 'A Binary Matrix is a matrix in which all the elements are either 0 or 1.

Given `quadTree1` and `quadTree2`. `quadTree1` represents a `n * n` binary matrix and `quadTree2` represents another `n * n` binary matrix. 
Return a Quad-Tree representing the `n * n` binary matrix which is the result of logical bitwise OR of the two binary matrixes represented by `quadTree1` and `quadTree2`.

Notice that you can assign the value of a node to True or False when `isLeaf` is False, and both are accepted in the answer.

A Quad-Tree is a tree data structure in which each internal node has exactly four children. Besides, each node has two attributes:
`val`: True if the node represents a grid of 1''s or False if the node represents a grid of 0''s. 
`isLeaf`: True if the node is leaf node on the tree or False if the node has the four children.

class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;
}
We can construct a Quad-Tree from a two-dimensional area using the following steps:
If the current grid has the same value (i.e all `1''s` or all `0''s`) set `isLeaf` True and set `val` to the value of the grid and set the four children to Null and stop.

If the current grid has different values, set `isLeaf` to False and set `val` to any value and divide the current grid into four sub-grids as shown in the photo.

Recurse for each of the children with the proper sub-grid.

If you want to know more about the Quad-Tree, you can refer to the wiki.

Quad-Tree format:
The input/output represents the serialized format of a Quad-Tree using level order traversal, where `null` signifies a path terminator where no node exists below.

It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list `[isLeaf, val]`.

If the value of `isLeaf` or `val` is True we represent it as 1 in the list `[isLeaf, val]` and if the value of `isLeaf` or `val` is False we represent it as 0.


Example 1:
Input: quadTree1 = [[0,1],[1,1],[1,1],[1,0],[1,0]]
, quadTree2 = [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
Output: [[0,0],[1,1],[1,1],[1,1],[1,0]]
Explanation: quadTree1 and quadTree2 are shown above. You can see the binary matrix which is represented by each Quad-Tree.

If we apply logical bitwise OR on the two binary matrices we get the binary matrix below which is represented by the result Quad-Tree.

Notice that the binary matrices shown are only for illustration, you don''t have to construct the binary matrix to get the result tree.


Example 2:
Input: quadTree1 = [[1,0]]
, quadTree2 = [[1,0]]
Output: [[1,0]]
Explanation: Each tree represents a binary matrix of size 1*1. Each matrix contains only zero.

The resulting matrix is of size 1*1 with also zero.


Example 3:
Input: quadTree1 = [[0,0],[1,0],[1,0],[1,1],[1,1]]
, quadTree2 = [[0,0],[1,1],[1,1],[1,0],[1,1]]
Output: [[1,1]]

Example 4:
Input: quadTree1 = [[0,0],[1,1],[1,0],[1,1],[1,1]]
, quadTree2 = [[0,0],[1,1],[0,1],[1,1],[1,1],null,null,null,null,[1,1],[1,0],[1,0],[1,1]]
Output: [[0,0],[1,1],[0,1],[1,1],[1,1],null,null,null,null,[1,1],[1,0],[1,0],[1,1]]

Example 5:
Input: quadTree1 = [[0,1],[1,0],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
, quadTree2 = [[0,1],[0,1],[1,0],[1,1],[1,0],[1,0],[1,0],[1,1],[1,1]]
Output: [[0,0],[0,1],[0,1],[1,1],[1,0],[1,0],[1,0],[1,1],[1,1],[1,0],[1,0],[1,1],[1,1]]

Constraints:
`quadTree1` and `quadTree2` are both valid Quad-Trees each representing a `n * n` grid.

`n == 2^x` where `0 <= x <= 9`.', false, 'Medium', NULL, 45.7, 
   0, 'https://leetcode.com/problems/logical-or-of-two-binary-grids-represented-as-quad-trees', 72, 9.6, 21.1, '["Sumologic"]'::jsonb, '[]'::jsonb, 
   111, 365, 23, false, '[]'::jsonb, true),
  (559, 'Maximum Depth of N-ary Tree', 'Given a n-ary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).


Example 1:
Input: root = [1,null,3,2,4,null,5,6]
Output: 3

Example 2:
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: 5

Constraints:
The depth of the n-ary tree is less than or equal to `1000`.

The total number of nodes is between `[0, 104]`.', false, 'Easy', '/articles/maximum-depth-of-n-ary-tree', 69.6, 
   4.3, 'https://leetcode.com/problems/maximum-depth-of-n-ary-tree', 999, 155.3, 223.1, '["Google,Amazon"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   1295, 59, 96, true, '[]'::jsonb, true),
  (560, 'Subarray Sum Equals K', 'Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals to `k`.


Example 1:
Input: nums = [1,1,1], k = 2
Output: 2

Example 2:
Input: nums = [1,2,3], k = 3
Output: 2

Constraints:
`1 <= nums.length <= 2 * 104`
`-1000 <= nums[i] <= 1000`
`-107 <= k <= 107`', false, 'Medium', '/articles/subarray-sum-equals-k', 43.7, 
   83, 'https://leetcode.com/problems/subarray-sum-equals-k', 871, 461.9, 1.1, '["Facebook,Yandex,Amazon,Bloomberg,Microsoft,ByteDance,Google,Adobe,Oracle"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   6966, 241, 97, true, '[]'::jsonb, true),
  (561, 'Array Partition I', 'Given an integer array `nums` of `2n` integers, group these integers into `n` pairs `(a1, b1), (a2, b2), ..., (an, bn)` such that the sum of `min(ai, bi)` for all `i` is maximized. Return the maximized sum.


Example 1:
Input: nums = [1,4,3,2]
Output: 4
Explanation: All possible pairings (ignoring the ordering of elements) are:
1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
So the maximum possible sum is 4.


Example 2:
Input: nums = [6,2,6,5,1,2]
Output: 9
Explanation: The optimal pairing is (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9.


Constraints:
`1 <= n <= 104`
`nums.length == 2 * n`
`-104 <= nums[i] <= 104`', false, 'Easy', '/articles/array-partition-i', 73.5, 
   13.4, 'https://leetcode.com/problems/array-partition-i', 937, 259.1, 352.6, '["Apple"]'::jsonb, '["Array"]'::jsonb, 
   186, 48, 79, true, '[]'::jsonb, true),
  (562, 'Longest Line of Consecutive One in Matrix', 'Given a 01 matrix M, find the longest line of consecutive one in the matrix. The line could be horizontal, vertical, diagonal or anti-diagonal.


Example:
Input:
[[0,1,1,0],
 [0,1,1,0],
 [0,0,0,1]]
Output: 3
Hint:
The number of elements in the given matrix will not exceed 10,000.', true, 'Medium', '/articles/longest-line-of-consecutive-one-in-matrix', 46.2, 
   19.9, 'https://leetcode.com/problems/longest-line-of-consecutive-one-in-matrix', 224, 36.3, 78.5, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   460, 83, 85, true, '[]'::jsonb, true),
  (563, 'Binary Tree Tilt', 'Given the `root` of a binary tree, return the sum of every tree node''s tilt.

The tilt of a tree node is the absolute difference between the sum of all left subtree node values and all right subtree node values. If a node does not have a left child, then the sum of the left subtree node values is treated as `0`. The rule is similar if there the node does not have a right child.


Example 1:
Input: root = [1,2,3]
Output: 1
Explanation: 
Tilt of node 2 : |0-0| = 0 (no children)
Tilt of node 3 : |0-0| = 0 (no children)
Tilt of node 1 : |2-3| = 1 (left subtree is just left child, so sum is 2; right subtree is just right child, so sum is 3)
Sum of every tilt : 0 + 0 + 1 = 1

Example 2:
Input: root = [4,2,9,3,5,null,7]
Output: 15
Explanation: 
Tilt of node 3 : |0-0| = 0 (no children)
Tilt of node 5 : |0-0| = 0 (no children)
Tilt of node 7 : |0-0| = 0 (no children)
Tilt of node 2 : |3-5| = 2 (left subtree is just left child, so sum is 3; right subtree is just right child, so sum is 5)
Tilt of node 9 : |0-7| = 7 (no left child, so sum is 0; right subtree is just right child, so sum is 7)
Tilt of node 4 : |(3+5+2)-(9+7)| = |10-16| = 6 (left subtree values are 3, 5, and 2, which sums to 10; right subtree values are 9 and 7, which sums to 16)
Sum of every tilt : 0 + 0 + 0 + 2 + 7 + 6 = 15

Example 3:
Input: root = [21,7,14,1,1,2,2,3,3]
Output: 9

Constraints:
The number of nodes in the tree is in the range `[0, 104]`.

`-1000 <= Node.val <= 1000`', false, 'Easy', '/articles/binary-tree-tilt', 53.2, 
   2.2, 'https://leetcode.com/problems/binary-tree-tilt', 596, 114.6, 215.2, '["Indeed"]'::jsonb, '["Tree,Depth-first Search,Recursion"]'::jsonb, 
   860, 1562, 36, false, '[]'::jsonb, true),
  (564, 'Find the Closest Palindrome', 'Given an integer n, find the closest integer (not including itself), which is a palindrome. 
The ''closest'' is defined as absolute difference minimized between two integers.


Example 1:
Input: "123"
Output: "121"
Note:
The input n is a positive integer represented by string, whose length will not exceed 18.

If there is a tie, return the smaller one as answer.', false, 'Hard', '/articles/find-the-closest-palindrome', 20.3, 
   57.4, 'https://leetcode.com/problems/find-the-closest-palindrome', 169, 25.3, 124.5, '["Microsoft,Amazon"]'::jsonb, '["String"]'::jsonb, 
   352, 967, 27, true, '[]'::jsonb, true),
  (565, 'Array Nesting', 'A zero-indexed array A of length N contains all integers from 0 to N-1. Find and return the longest length of set S, where S[i] = {A[i], A[A[i]], A[A[A[i]]], ... } subjected to the rule below.

Suppose the first element in S starts with the selection of element A[i] of index = i, the next element in S should be A[A[i]], and then A[A[A[i]]]... By that analogy, we stop adding right before a duplicate element occurs in S.


Example 1:
Input: A = [5,4,0,3,1,6,2]
Output: 4
Explanation: 
A[0] = 5, A[1] = 4, A[2] = 0, A[3] = 3, A[4] = 1, A[5] = 6, A[6] = 2.

One of the longest S[K]:
S[0] = {A[0], A[5], A[6], A[2]} = {5, 6, 2, 0}
Note:
N is an integer within the range [1, 20,000].

The elements of A are all distinct.

Each element of A is an integer within the range [0, N-1].', false, 'Medium', '/articles/array-nesting', 56, 
   13.4, 'https://leetcode.com/problems/array-nesting', 381, 62.9, 112.4, '["Adobe"]'::jsonb, '["Array"]'::jsonb, 
   1024, 111, 90, false, '[]'::jsonb, true),
  (566, 'Reshape the Matrix', 'In MATLAB, there is a very useful function called ''reshape'', which can reshape a matrix into a new one with different size but keep its original data.

You''re given a matrix represented by a two-dimensional array, and two positive integers r and c representing the row number and column number of the wanted reshaped matrix, respectively.

The reshaped matrix need to be filled with all the elements of the original matrix in the same row-traversing order as they were.

If the ''reshape'' operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.


Example 1:
Input: 
nums = 
[[1,2],
 [3,4]]
r = 1, c = 4
Output: 
[[1,2,3,4]]
Explanation:The row-traversing of nums is [1,2,3,4]. The new reshaped matrix is a 1 * 4 matrix, fill it row by row by using the previous list.


Example 2:
Input: 
nums = 
[[1,2],
 [3,4]]
r = 2, c = 4
Output: 
[[1,2],
 [3,4]]
Explanation:There is no way to reshape a 2 * 2 matrix to a 2 * 4 matrix. So output the original matrix.

Note:
The height and width of the given matrix is in range [1, 100].

The given r and c are all positive.', false, 'Easy', '/articles/reshape-the-matrix', 61.1, 
   6.8, 'https://leetcode.com/problems/reshape-the-matrix', 628, 115.1, 188.3, '["Mathworks"]'::jsonb, '["Array"]'::jsonb, 
   963, 112, 90, false, '[]'::jsonb, true),
  (567, 'Permutation in String', 'Given two strings s1 and s2, write a function to return true if s2 contains the permutation of s1. In other words, one of the first string''s permutations is the substring of the second string.


Example 1:
Input: s1 = "ab" s2 = "eidbaooo"
Output: True
Explanation: s2 contains one permutation of s1 ("ba").


Example 2:
Input:s1= "ab" s2 = "eidboaoo"
Output: False

Constraints:
The input strings only contain lower case letters.

The length of both given strings is in range [1, 10,000].', false, 'Medium', '/articles/short-permutation-in-a-long-string', 44.5, 
   35.5, 'https://leetcode.com/problems/permutation-in-string', 951, 182.7, 410.1, '["Facebook,Microsoft,Adobe,Amazon,Yandex"]'::jsonb, '["Two Pointers,Sliding Window"]'::jsonb, 
   2325, 77, 97, true, '[]'::jsonb, true),
  (568, 'Maximum Vacation Days', 'LeetCode wants to give one of its best employees the option to travel among N cities to collect algorithm problems. But all work and no play makes Jack a dull boy, you could take vacations in some particular cities and weeks. Your job is to schedule the traveling to maximize the number of vacation days you could take, but there are certain rules and restrictions you need to follow.

Rules and restrictions:
You can only travel among N cities, represented by indexes from 0 to N-1. Initially, you are in the city indexed 0 on Monday.

The cities are connected by flights. The flights are represented as a N*N matrix (not necessary symmetrical), called flights representing the airline status from the city i to the city j. If there is no flight from the city i to the city j, flights[i][j] = 0; Otherwise, flights[i][j] = 1. Also, flights[i][i] = 0 for all i.

You totally have K weeks (each week has 7 days) to travel. You can only take flights at most once per day and can only take flights on each week''s Monday morning. Since flight time is so short, we don''t consider the impact of flight time.

For each city, you can only have restricted vacation days in different weeks, given an N*K matrix called days representing this relationship. For the value of days[i][j], it represents the maximum days you could take vacation in the city i in the week j.

You''re given the flights matrix and days matrix, and you need to output the maximum vacation days you could take during K weeks.


Example 1:
Input:flights = [[0,1,1],[1,0,1],[1,1,0]], days = [[1,3,1],[6,0,3],[3,3,3]]
Output: 12
Explanation: Ans = 6 + 3 + 3 = 12. 
One of the best strategies is:
1st week : fly from city 0 to city 1 on Monday, and play 6 days and work 1 day. (Although you start at city 0, we could also fly to and start at other cities since it is Monday.) 
2nd week : fly from city 1 to city 2 on Monday, and play 3 days and work 4 days.

3rd week : stay at city 2, and play 3 days and work 4 days.


Example 2:
Input:flights = [[0,0,0],[0,0,0],[0,0,0]], days = [[1,1,1],[7,7,7],[7,7,7]]
Output: 3
Explanation: Ans = 1 + 1 + 1 = 3. 
Since there is no flights enable you to move to another city, you have to stay at city 0 for the whole 3 weeks. For each week, you only have one day to play and six days to work. So the maximum number of vacation days is 3.


Example 3:
Input:flights = [[0,1,1],[1,0,1],[1,1,0]], days = [[7,0,0],[0,7,0],[0,0,7]]
Output: 21
Explanation:Ans = 7 + 7 + 7 = 21
One of the best strategies is:
1st week : stay at city 0, and play 7 days. 
2nd week : fly from city 0 to city 1 on Monday, and play 7 days.

3rd week : fly from city 1 to city 2 on Monday, and play 7 days.

Note:
N and K are positive integers, which are in the range of [1, 100].

In the matrix flights, all the values are integers in the range of [0, 1].

In the matrix days, all the values are integers in the range [0, 7].

You could stay at a city beyond the number of vacation days, but you should work on the extra days, which won''t be counted as vacation days.

If you fly from the city A to the city B and take the vacation on that day, the deduction towards vacation days will count towards the vacation days of city B in that week.

We don''t consider the impact of flight hours towards the calculation of vacation days.', true, 'Hard', '/articles/maximum-vacation-days', 41.7, 
   0, 'https://leetcode.com/problems/maximum-vacation-days', 140, 27.6, 66.1, '["Google,Facebook"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   365, 61, 86, true, '[]'::jsonb, true),
  (569, 'Median Employee Salary', 'SQL Schema', true, 'Hard', '/articles/median-employee-salary', 62.3, 
   2.1, 'https://leetcode.com/problems/median-employee-salary', 260, 16, 25.7, '["Google"]'::jsonb, '[]'::jsonb, 
   131, 78, 63, true, '[]'::jsonb, true),
  (570, 'Managers with at Least 5 Direct Reports', 'SQL Schema', true, 'Medium', '/articles/managers-with-at-least-5-direct-reports', 66.8, 
   3.1, 'https://leetcode.com/problems/managers-with-at-least-5-direct-reports', 194, 34.7, 52, '["Amazon"]'::jsonb, '[]'::jsonb, 
   145, 19, 88, true, '[]'::jsonb, true),
  (571, 'Find Median Given Frequency of Numbers', 'SQL Schema', true, 'Hard', NULL, 45.6, 
   4.6, 'https://leetcode.com/problems/find-median-given-frequency-of-numbers', 146, 11.8, 25.9, '["Pinterest"]'::jsonb, '[]'::jsonb, 
   138, 48, 74, false, '[]'::jsonb, true),
  (572, 'Subtree of Another Tree', 'Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node''s descendants. The tree s could also be considered as a subtree of itself.


Example 1:
Given tree s:
     3
    / \\
   4   5
  / \\
 1   2
Given tree t:
   4 
  / \\
 1   2
Return true, because t has the same structure and node values with a subtree of s.


Example 2:
Given tree s:
     3
    / \\
   4   5
  / \\
 1   2
    /
   0
Given tree t:
   4
  / \\
 1   2
Return false.', false, 'Easy', '/articles/subtree-of-another-tree', 44.6, 
   56.8, 'https://leetcode.com/problems/subtree-of-another-tree', 974, 302.7, 679.1, '["Amazon,Microsoft,Facebook"]'::jsonb, '["Tree"]'::jsonb, 
   3297, 162, 95, true, '[]'::jsonb, true),
  (573, 'Squirrel Simulation', 'There''s a tree, a squirrel, and several nuts. Positions are represented by the cells in a 2D grid. Your goal is to find the minimal distance for the squirrel to collect all the nuts and put them under the tree one by one. The squirrel can only take at most one nut at one time and can move in four directions - up, down, left and right, to the adjacent cell. The distance is represented by the number of moves.


Example 1:
Input: 
Height : 5
Width : 7
Tree position : [2,2]
Squirrel : [4,4]
Nuts : [[3,0], [2,5]]
Output: 12
Explanation:
​​​​​
Note:
All given positions won''t overlap.

The squirrel can take at most one nut at one time.

The given positions of nuts have no order.

Height and width are positive integers. 3 <= height * width <= 10,000.

The given positions contain at least one nut, only one tree and one squirrel.', true, 'Medium', '/articles/squirrel-simulation', 54.2, 
   8.2, 'https://leetcode.com/problems/squirrel-simulation', 99, 15.7, 29, '["Square"]'::jsonb, '["Math"]'::jsonb, 
   273, 30, 90, false, '[]'::jsonb, true),
  (574, 'Winning Candidate', 'SQL Schema', true, 'Medium', '/articles/winning-candidate', 52.7, 
   1.2, 'https://leetcode.com/problems/winning-candidate', 227, 29.5, 56, '[]'::jsonb, '[]'::jsonb, 
   85, 327, 21, false, '[]'::jsonb, true),
  (575, 'Distribute Candies', 'Alice has `n` candies, where the `ith` candy is of type `candyType[i]`. Alice noticed that she started to gain weight, so she visited a doctor.

The doctor advised Alice to only eat `n / 2` of the candies she has (`n` is always even). Alice likes her candies very much, and she wants to eat the maximum number of different types of candies while still following the doctor''s advice.

Given the integer array `candyType` of length `n`, return the maximum number of different types of candies she can eat if she only eats `n / 2` of them.


Example 1:
Input: candyType = [1,1,2,2,3,3]
Output: 3
Explanation: Alice can only eat 6 / 2 = 3 candies. Since there are only 3 types, she can eat one of each type.


Example 2:
Input: candyType = [1,1,2,3]
Output: 2
Explanation: Alice can only eat 4 / 2 = 2 candies. Whether she eats types [1,2], [1,3], or [2,3], she still can only eat 2 different types.


Example 3:
Input: candyType = [6,6,6,6]
Output: 1
Explanation: Alice can only eat 4 / 2 = 2 candies. Even though she can eat 2 candies, she only has 1 type.


Constraints:
`n == candyType.length`
`2 <= n <= 104`
`n` is even.

`-105 <= candyType[i] <= 105`', false, 'Easy', '/articles/distribute-candies', 64.4, 
   0.9, 'https://leetcode.com/problems/distribute-candies', 746, 163.4, 253.7, '["Microsoft,LiveRamp"]'::jsonb, '["Hash Table"]'::jsonb, 
   727, 1018, 42, false, '[]'::jsonb, true),
  (576, 'Out of Boundary Paths', 'There is an m by n grid with a ball. Given the start coordinate (i,j) of the ball, you can move the ball to adjacent cell or cross the grid boundary in four directions (up, down, left, right). However, you can at most move N times. Find out the number of paths to move the ball out of grid boundary. The answer may be very large, return it after mod 109 + 7.


Example 1:
Input: m = 2, n = 2, N = 2, i = 0, j = 0
Output: 6
Explanation:

Example 2:
Input: m = 1, n = 3, N = 3, i = 0, j = 1
Output: 12
Explanation:
Note:
Once you move the ball out of boundary, you cannot move it back.

The length and height of the grid is in range [1,50].

N is in range [0,50].', false, 'Medium', '/articles/out-of-boundary-paths', 36.1, 
   10, 'https://leetcode.com/problems/out-of-boundary-paths', 269, 35.9, 99.4, '["Amazon"]'::jsonb, '["Dynamic Programming,Depth-first Search"]'::jsonb, 
   747, 148, 83, true, '[]'::jsonb, true),
  (577, 'Employee Bonus', 'SQL Schema', true, 'Easy', '/articles/employee-bonus', 72, 
   0.9, 'https://leetcode.com/problems/employee-bonus', 55, 36.5, 50.8, '["Netsuite"]'::jsonb, '[]'::jsonb, 
   112, 59, 65, false, '[]'::jsonb, true),
  (578, 'Get Highest Answer Rate Question', 'SQL Schema', true, 'Medium', '/articles/get-highest-answer-rate-question', 42, 
   2.5, 'https://leetcode.com/problems/get-highest-answer-rate-question', 239, 25.4, 60.4, '["Facebook"]'::jsonb, '[]'::jsonb, 
   50, 584, 8, true, '[]'::jsonb, true),
  (579, 'Find Cumulative Salary of an Employee', 'SQL Schema', true, 'Hard', '/articles/find-cumulative-salary-of-an-employee', 38.5, 
   3.1, 'https://leetcode.com/problems/find-cumulative-salary-of-an-employee', 329, 17.6, 45.8, '["Amazon"]'::jsonb, '[]'::jsonb, 
   126, 278, 31, true, '[]'::jsonb, true),
  (580, 'Count Student Number in Departments', 'SQL Schema', true, 'Medium', '/articles/count-student-number-in-departments', 52.2, 
   0, 'https://leetcode.com/problems/count-student-number-in-departments', 159, 27.1, 52, '["Twitter"]'::jsonb, '[]'::jsonb, 
   125, 22, 85, false, '[]'::jsonb, true),
  (581, 'Shortest Unsorted Continuous Subarray', 'Given an integer array `nums`, you need to find one continuous subarray that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order.

Return the shortest such subarray and output its length.


Example 1:
Input: nums = [2,6,4,8,10,9,15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.


Example 2:
Input: nums = [1,2,3,4]
Output: 0

Example 3:
Input: nums = [1]
Output: 0

Constraints:
`1 <= nums.length <= 104`
`-105 <= nums[i] <= 105`
Follow up: Can you solve it in `O(n)` time complexity?', false, 'Medium', '/articles/shortest-unsorted-continous-subarray', 32.9, 
   29.7, 'https://leetcode.com/problems/shortest-unsorted-continuous-subarray', 806, 175.4, 532.8, '["Amazon,Microsoft"]'::jsonb, '["Array"]'::jsonb, 
   3797, 175, 96, true, '[]'::jsonb, true),
  (582, 'Kill Process', 'You have `n` processes forming a rooted tree structure. You are given two integer arrays `pid` and `ppid`, where `pid[i]` is the ID of the `ith` process and `ppid[i]` is the ID of the `ith` process''s parent process.

Each process has only one parent process but may have multiple children processes. Only one process has `ppid[i] = 0`, which means this process has no parent process (the root of the tree).

When a process is killed, all of its children processes will also be killed.

Given an integer `kill` representing the ID of a process you want to kill, return a list of the IDs of the processes that will be killed. You may return the answer in any order.


Example 1:
Input: pid = [1,3,10,5], ppid = [3,0,5,3], kill = 5
Output: [5,10]
Explanation: The processes colored in red are the processes that should be killed.


Example 2:
Input: pid = [1], ppid = [0], kill = 1
Output: [1]

Constraints:
`n == pid.length`
`n == ppid.length`
`1 <= n <= 5 * 104`
`1 <= pid[i] <= 5 * 104`
`0 <= ppid[i] <= 5 * 104`
Only one process has no parent.

All the values of `pid` are unique.

`kill` is guaranteed to be in `pid`.', true, 'Medium', '/articles/kill-process', 63.9, 
   23, 'https://leetcode.com/problems/kill-process', 307, 48, 75.1, '["Bloomberg"]'::jsonb, '["Tree,Queue"]'::jsonb, 
   655, 14, 98, false, '[]'::jsonb, true),
  (583, 'Delete Operation for Two Strings', 'Given two strings `word1` and `word2`, return the minimum number of steps required to make `word1` and `word2` the same.

In one step, you can delete exactly one character in either string.


Example 1:
Input: word1 = "sea", word2 = "eat"
Output: 2
Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".


Example 2:
Input: word1 = "leetcode", word2 = "etco"
Output: 4

Constraints:
`1 <= word1.length, word2.length <= 500`
`word1` and `word2` consist of only lowercase English letters.', false, 'Medium', '/articles/delete-operation-for-two-strings', 50.4, 
   8.2, 'https://leetcode.com/problems/delete-operation-for-two-strings', 423, 63.1, 125.2, '["Google"]'::jsonb, '["String"]'::jsonb, 
   1458, 34, 98, true, '[]'::jsonb, true),
  (584, 'Find Customer Referee', 'SQL Schema', true, 'Easy', '/articles/find-customer-referee', 74.2, 
   0, 'https://leetcode.com/problems/find-customer-referee', 73, 34.2, 46, '["Amazon"]'::jsonb, '[]'::jsonb, 
   105, 63, 62, true, '[]'::jsonb, true),
  (585, 'Investments in 2016', 'SQL Schema', true, 'Medium', '/articles/investments-in-2016', 57.4, 
   0, 'https://leetcode.com/problems/investments-in-2016', 201, 21.5, 37.5, '["Twitter"]'::jsonb, '[]'::jsonb, 
   128, 112, 53, false, '[]'::jsonb, true),
  (586, 'Customer Placing the Largest Number of Orders', 'SQL Schema', true, 'Easy', '/articles/customer-placing-the-largest-number-of-orders', 75.5, 
   1.7, 'https://leetcode.com/problems/customer-placing-the-largest-number-of-orders', 136, 39.7, 52.6, '["Amazon"]'::jsonb, '[]'::jsonb, 
   140, 15, 90, true, '[]'::jsonb, true),
  (587, 'Erect the Fence', 'There are some trees, where each tree is represented by (x,y) coordinate in a two-dimensional garden. Your job is to fence the entire garden using the minimum length of rope as it is expensive. The garden is well fenced only if all the trees are enclosed. Your task is to help find the coordinates of trees which are exactly located on the fence perimeter.


Example 1:
Input: [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
Output: [[1,1],[2,0],[4,2],[3,3],[2,4]]
Explanation:

Example 2:
Input: [[1,2],[2,2],[4,2]]
Output: [[1,2],[2,2],[4,2]]
Explanation:
Even you only have trees in a line, you need to use rope to enclose them. 
Note:
All trees should be enclosed together. You cannot cut the rope to enclose trees that will separate them in more than one group.

All input integers will range from 0 to 100.

The garden has at least one tree.

All coordinates are distinct.

Input points have NO order. No order required for output.
input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.', false, 'Hard', '/articles/erect-the-fence', 36.6, 
   6.8, 'https://leetcode.com/problems/erect-the-fence', 74, 10.9, 29.7, '["Google"]'::jsonb, '["Geometry"]'::jsonb, 
   284, 198, 59, true, '[]'::jsonb, true),
  (588, 'Design In-Memory File System', 'Design an in-memory file system to simulate the following functions:
`ls`: Given a path in string format. If it is a file path, return a list that only contains this file''s name. If it is a directory path, return the list of file and directory names in this directory. Your output (file and directory names together) should in lexicographic order.

`mkdir`: Given a directory path that does not exist, you should make a new directory according to the path. If the middle directories in the path don''t exist either, you should create them as well. This function has void return type.

`addContentToFile`: Given a file path and file content in string format. If the file doesn''t exist, you need to create that file containing given content. If the file already exists, you need to append given content to original content. This function has void return type.

`readContentFromFile`: Given a file path, return its content in string format.


Example:
Input: 
["FileSystem","ls","mkdir","addContentToFile","ls","readContentFromFile"]
[[],["/"],["/a/b/c"],["/a/b/c/d","hello"],["/"],["/a/b/c/d"]]
Output:
[null,[],null,null,["a"],"hello"]
Explanation:
Note:
You can assume all file or directory paths are absolute paths which begin with `/` and do not end with `/` except that the path is just `"/"`.

You can assume that all operations will be passed valid parameters and users will not attempt to retrieve file content or list a directory or file that does not exist.

You can assume that all directory names and file names only contain lower-case letters, and same names won''t exist in the same directory.', true, 'Hard', '/articles/design-in-memory-file-system', 46.7, 
   87, 'https://leetcode.com/problems/design-in-memory-file-system', 239, 31.3, 67, '["Amazon,Microsoft,Citadel,Google"]'::jsonb, '["Design"]'::jsonb, 
   562, 74, 88, true, '[]'::jsonb, true),
  (589, 'N-ary Tree Preorder Traversal', 'Given the `root` of an n-ary tree, return the preorder traversal of its nodes'' values.

Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

Example 1:
Input: root = [1,null,3,2,4,null,5,6]
Output: [1,3,5,6,2,4]

Example 2:
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,2,3,6,7,11,14,4,8,12,5,9,13,10]

Constraints:
The number of nodes in the tree is in the range `[0, 104]`.

`0 <= Node.val <= 104`
The height of the n-ary tree is less than or equal to `1000`.

Follow up: Recursive solution is trivial, could you do it iteratively?', false, 'Easy', '/articles/n-ary-tree-preorder-traversal', 73.5, 
   6.1, 'https://leetcode.com/problems/n-ary-tree-preorder-traversal', 686, 142.7, 194, '[]'::jsonb, '[]'::jsonb, 
   894, 63, 93, false, '[]'::jsonb, true),
  (590, 'N-ary Tree Postorder Traversal', 'Given the `root` of an n-ary tree, return the postorder traversal of its nodes'' values.

Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

Example 1:
Input: root = [1,null,3,2,4,null,5,6]
Output: [5,6,3,2,4,1]

Example 2:
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [2,6,14,11,7,3,12,8,4,13,9,10,5,1]

Constraints:
The number of nodes in the tree is in the range `[0, 104]`.

`0 <= Node.val <= 104`
The height of the n-ary tree is less than or equal to `1000`.

Follow up: Recursive solution is trivial, could you do it iteratively?', false, 'Easy', '/articles/n-ary-tree-postorder-traversal', 73.6, 
   4.9, 'https://leetcode.com/problems/n-ary-tree-postorder-traversal', 692, 127.3, 173.1, '["Amazon"]'::jsonb, '["Tree"]'::jsonb, 
   961, 74, 93, true, '[]'::jsonb, true),
  (591, 'Tag Validator', 'Given a string representing a code snippet, you need to implement a tag validator to parse the code and return whether it is valid. A code snippet is valid if all the following rules hold:
The code must be wrapped in a valid closed tag. Otherwise, the code is invalid.

A closed tag (not necessarily valid) has exactly the following format : `<TAG_NAME>TAG_CONTENT</TAG_NAME>`. Among them, `<TAG_NAME>` is the start tag, and `</TAG_NAME>` is the end tag. The TAG_NAME in start and end tags should be the same. A closed tag is valid if and only if the TAG_NAME and TAG_CONTENT are valid.

A valid `TAG_NAME` only contain upper-case letters, and has length in range [1,9]. Otherwise, the `TAG_NAME` is invalid.

A valid `TAG_CONTENT` may contain other valid closed tags, cdata and any characters (see note1) EXCEPT unmatched `<`, unmatched start and end tag, and unmatched or closed tags with invalid TAG_NAME. Otherwise, the `TAG_CONTENT` is invalid.

A start tag is unmatched if no end tag exists with the same TAG_NAME, and vice versa. However, you also need to consider the issue of unbalanced when tags are nested.

A `<` is unmatched if you cannot find a subsequent `>`. And when you find a `<` or `</`, all the subsequent characters until the next `>` should be parsed as TAG_NAME  (not necessarily valid).

The cdata has the following format : `<![CDATA[CDATA_CONTENT]]>`. The range of `CDATA_CONTENT` is defined as the characters between `<![CDATA[` and the first subsequent `]]>`. 
`CDATA_CONTENT` may contain any characters. The function of cdata is to forbid the validator to parse `CDATA_CONTENT`, so even it has some characters that can be parsed as tag (no matter valid or invalid), you should treat it as regular characters. 

Valid Code Examples:
Input: "<DIV>This is the first line <![CDATA[<div>]]></DIV>"
Output: True
Explanation: 
The code is wrapped in a closed tag : <DIV> and </DIV>. 
The TAG_NAME is valid, the TAG_CONTENT consists of some characters and cdata. 
Although CDATA_CONTENT has unmatched start tag with invalid TAG_NAME, it should be considered as plain text, not parsed as tag.

So TAG_CONTENT is valid, and then the code is valid. Thus return true.

Input: "<DIV>>>  ![cdata[]] <![CDATA[<div>]>]]>]]>>]</DIV>"
Output: True
Explanation:
We first separate the code into : start_tag|tag_content|end_tag.

start_tag -> "<DIV>"
end_tag -> "</DIV>"
tag_content could also be separated into : text1|cdata|text2.

text1 -> ">>  ![cdata[]] "
cdata -> "<![CDATA[<div>]>]]>", where the CDATA_CONTENT is "<div>]>"
text2 -> "]]>>]"
The reason why start_tag is NOT "<DIV>>>" is because of the rule 6.

The reason why cdata is NOT "<![CDATA[<div>]>]]>]]>" is because of the rule 7.


Invalid Code Examples:
Input: "<A>  <B> </A>   </B>"
Output: False
Explanation: Unbalanced. If "<A>" is closed, then "<B>" must be unmatched, and vice versa.

Input: "<DIV>  div tag is not closed  <DIV>"
Output: False
Input: "<DIV>  unmatched <  </DIV>"
Output: False
Input: "<DIV> closed tags with invalid tag name  <b>123</b> </DIV>"
Output: False
Input: "<DIV> unmatched tags with invalid tag name  </1234567890> and <CDATA[[]]>  </DIV>"
Output: False
Input: "<DIV>  unmatched start tag <B>  and unmatched end tag </C>  </DIV>"
Output: False
Note:
For simplicity, you could assume the input code (including the any characters mentioned above) only contain `letters`, `digits`, `''<''`,`''>''`,`''/''`,`''!''`,`''[''`,`'']''` and `'' ''`.', false, 'Hard', '/articles/tag-validator', 34.8, 
   15.9, 'https://leetcode.com/problems/tag-validator', 66, 8.8, 25.1, '["Microsoft"]'::jsonb, '["String,Stack"]'::jsonb, 
   102, 458, 18, false, '[]'::jsonb, true),
  (592, 'Fraction Addition and Subtraction', 'Given a string representing an expression of fraction addition and subtraction, you need to return the calculation result in string format. The final result should be irreducible fraction. If your final result is an integer, say `2`, you need to change it to the format of fraction that has denominator `1`. So in this case, `2` should be converted to `2/1`.


Example 1:
Input:"-1/2+1/2"
Output: "0/1"

Example 2:
Input:"-1/2+1/2+1/3"
Output: "1/3"

Example 3:
Input:"1/3-1/2"
Output: "-1/6"

Example 4:
Input:"5/3+1/3"
Output: "2/1"
Note:
The input string only contains `''0''` to `''9''`, `''/''`, `''+''` and `''-''`. So does the output.

Each fraction (input and output) has format `±numerator/denominator`. If the first input fraction or the output is positive, then `''+''` will be omitted.

The input only contains valid irreducible fractions, where the numerator and denominator of each fraction will always be in the range [1,10]. If the denominator is 1, it means this fraction is actually an integer in a fraction format defined above.

The number of given fractions will be in the range [1,10].

The numerator and denominator of the final result are guaranteed to be valid and in the range of 32-bit int.', false, 'Medium', '/articles/fraction-additon-and-subtraction', 50.3, 
   29.8, 'https://leetcode.com/problems/fraction-addition-and-subtraction', 177, 22.3, 44.3, '["IXL,Goldman Sachs"]'::jsonb, '["Math"]'::jsonb, 
   227, 348, 39, false, '[]'::jsonb, true),
  (593, 'Valid Square', 'Given the coordinates of four points in 2D space `p1`, `p2`, `p3` and `p4`, return `true` if the four points construct a square.

The coordinate of a point `pi` is represented as `[xi, yi]`. The input is not given in any order.

A valid square has four equal sides with positive length and four equal angles (90-degree angles).


Example 1:
Input: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]
Output: true

Example 2:
Input: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]
Output: false

Example 3:
Input: p1 = [1,0], p2 = [-1,0], p3 = [0,1], p4 = [0,-1]
Output: true

Constraints:
`p1.length == p2.length == p3.length == p4.length == 2`
`-104 <= xi, yi <= 104`', false, 'Medium', '/articles/valid-square', 43.3, 
   43.4, 'https://leetcode.com/problems/valid-square', 456, 59.9, 138.3, '["Pure Storage,Google"]'::jsonb, '["Math"]'::jsonb, 
   449, 599, 43, true, '[]'::jsonb, true),
  (594, 'Longest Harmonious Subsequence', 'We define a harmonious array as an array where the difference between its maximum value and its minimum value is exactly `1`.

Given an integer array `nums`, return the length of its longest harmonious subsequence among all its possible subsequences.

A subsequence of array is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements.


Example 1:
Input: nums = [1,3,2,2,5,2,3,7]
Output: 5
Explanation: The longest harmonious subsequence is [3,2,2,2,3].


Example 2:
Input: nums = [1,2,3,4]
Output: 2

Example 3:
Input: nums = [1,1,1,1]
Output: 0

Constraints:
`1 <= nums.length <= 2 * 104`
`-109 <= nums[i] <= 109`', false, 'Easy', '/articles/longest-harmonious-subsequence', 51.3, 
   4.1, 'https://leetcode.com/problems/longest-harmonious-subsequence', 503, 95.5, 186.3, '["Apple,LiveRamp"]'::jsonb, '["Hash Table"]'::jsonb, 
   1155, 123, 90, true, '[]'::jsonb, true),
  (595, 'Big Countries', 'SQL Schema', false, 'Easy', '/articles/big-countries', 78.7, 
   0.5, 'https://leetcode.com/problems/big-countries', 170, 213, 270.8, '["Bloomberg"]'::jsonb, '[]'::jsonb, 
   577, 752, 43, false, '[]'::jsonb, true),
  (596, 'Classes More Than 5 Students', 'SQL Schema', false, 'Easy', '/articles/classes-more-than-5-students', 38.9, 
   4.5, 'https://leetcode.com/problems/classes-more-than-5-students', 203, 105.5, 271, '[]'::jsonb, '[]'::jsonb, 
   285, 761, 27, false, '[]'::jsonb, true),
  (597, 'Friend Requests I: Overall Acceptance Rate', 'SQL Schema', true, 'Easy', '/articles/friend-requests-i-overall-acceptance-rate', 41.9, 
   6.7, 'https://leetcode.com/problems/friend-requests-i-overall-acceptance-rate', 193, 37.5, 89.6, '["Facebook"]'::jsonb, '[]'::jsonb, 
   184, 415, 31, true, '[]'::jsonb, true),
  (598, 'Range Addition II', 'You are given an `m x n` matrix `M` initialized with all `0`''s and an array of operations `ops`, where `ops[i] = [ai, bi]` means `M[x][y]` should be incremented by one for all `0 <= x < ai` and `0 <= y < bi`.

Count and return the number of maximum integers in the matrix after performing all the operations.


Example 1:
Input: m = 3, n = 3, ops = [[2,2],[3,3]]
Output: 4
Explanation: The maximum integer in M is 2, and there are four of it in M. So return 4.


Example 2:
Input: m = 3, n = 3, ops = [[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3]]
Output: 4

Example 3:
Input: m = 3, n = 3, ops = []
Output: 9

Constraints:
`1 <= m, n <= 4 * 104`
`1 <= ops.length <= 104`
`ops[i].length == 2`
`1 <= ai <= m`
`1 <= bi <= n`', false, 'Easy', '/articles/range-addition-ii', 50.2, 
   1.9, 'https://leetcode.com/problems/range-addition-ii', 265, 46.3, 92.2, '["IXL"]'::jsonb, '["Math"]'::jsonb, 
   361, 610, 37, false, '[]'::jsonb, true),
  (599, 'Minimum Index Sum of Two Lists', 'Suppose Andy and Doris want to choose a restaurant for dinner, and they both have a list of favorite restaurants represented by strings.

You need to help them find out their common interest with the least list index sum. If there is a choice tie between answers, output all of them with no order requirement. You could assume there always exists an answer.


Example 1:
Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]
Output: ["Shogun"]
Explanation: The only restaurant they both like is "Shogun".


Example 2:
Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["KFC","Shogun","Burger King"]
Output: ["Shogun"]
Explanation: The restaurant they both like and have the least index sum is "Shogun" with index sum 1 (0+1).


Example 3:
Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["KFC","Burger King","Tapioca Express","Shogun"]
Output: ["KFC","Burger King","Tapioca Express","Shogun"]

Example 4:
Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["KNN","KFC","Burger King","Tapioca Express","Shogun"]
Output: ["KFC","Burger King","Tapioca Express","Shogun"]

Example 5:
Input: list1 = ["KFC"], list2 = ["KFC"]
Output: ["KFC"]

Constraints:
`1 <= list1.length, list2.length <= 1000`
`1 <= list1[i].length, list2[i].length <= 30`
`list1[i]` and `list2[i]` consist of spaces `'' ''` and English letters.

All the stings of `list1` are unique.

All the stings of `list2` are unique.', false, 'Easy', '/articles/minimum-index-sum-of-two-lists', 51.9, 
   3.4, 'https://leetcode.com/problems/minimum-index-sum-of-two-lists', 595, 111.5, 214.9, '["Oracle,Yelp"]'::jsonb, '["Hash Table"]'::jsonb, 
   775, 239, 76, false, '[]'::jsonb, true),
  (600, 'Non-negative Integers without Consecutive Ones', 'Given a positive integer n, find the number of non-negative integers less than or equal to n, whose binary representations do NOT contain consecutive ones.


Example 1:
Input: 5
Output: 5
Explanation: 
Here are the non-negative integers <= 5 with their corresponding binary representations:
0 : 0
1 : 1
2 : 10
3 : 11
4 : 100
5 : 101
Among them, only integer 3 disobeys the rule (two consecutive ones) and the other 5 satisfy the rule. 
Note:
1 <= n <= 109', false, 'Hard', '/articles/non-negative-integers-without-consecutive-ones', 34.3, 
   6, 'https://leetcode.com/problems/non-negative-integers-without-consecutive-ones', 111, 14.6, 42.4, '["Pocket Gems"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   528, 77, 87, false, '[]'::jsonb, true),
  (601, 'Human Traffic of Stadium', 'SQL Schema', false, 'Hard', '/articles/human-traffic-of-stadium', 45.7, 
   14.3, 'https://leetcode.com/problems/human-traffic-of-stadium', 502, 41.1, 89.8, '["Amazon"]'::jsonb, '[]'::jsonb, 
   231, 415, 36, true, '[]'::jsonb, true),
  (602, 'Friend Requests II: Who Has the Most Friends', 'SQL Schema', true, 'Medium', '/articles/friend-requests-ii-who-has-most-friend', 57.9, 
   0, 'https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends', 215, 32.6, 56.3, '["Amazon"]'::jsonb, '[]'::jsonb, 
   188, 58, 76, true, '[]'::jsonb, true),
  (603, 'Consecutive Available Seats', 'SQL Schema', true, 'Easy', '/articles/consecutive-available-seats', 66.3, 
   4.8, 'https://leetcode.com/problems/consecutive-available-seats', 158, 31.8, 47.9, '["Amazon"]'::jsonb, '[]'::jsonb, 
   309, 21, 94, true, '[]'::jsonb, true),
  (604, 'Design Compressed String Iterator', 'Design and implement a data structure for a compressed string iterator. The given compressed string will be in the form of each letter followed by a positive integer representing the number of this letter existing in the original uncompressed string.

Implement the StringIterator class:
`next()` Returns the next character if the original string still has uncompressed characters, otherwise returns a white space.

`hasNext()` Returns true if there is any letter needs to be uncompressed in the original string, otherwise returns `false`.


Example 1:
Input
["StringIterator", "next", "next", "next", "next", "next", "next", "hasNext", "next", "hasNext"]
[["L1e2t1C1o1d1e1"], [], [], [], [], [], [], [], [], []]
Output
[null, "L", "e", "e", "t", "C", "o", true, "d", true]
Explanation
StringIterator stringIterator = new StringIterator("L1e2t1C1o1d1e1");
stringIterator.next(); // return "L"
stringIterator.next(); // return "e"
stringIterator.next(); // return "e"
stringIterator.next(); // return "t"
stringIterator.next(); // return "C"
stringIterator.next(); // return "o"
stringIterator.hasNext(); // return True
stringIterator.next(); // return "d"
stringIterator.hasNext(); // return True

Constraints:
`1 <= compressedString.length <= 1000`
`compressedString` consists of lower-case an upper-case English letters and digits.

The number of a single character repetitions in `compressedString` is in the range `[1, 10^9]`
At most `100` calls will be made to `next` and `hasNext`.', true, 'Easy', '/articles/design-compressed-string-iterator', 38.3, 
   7.7, 'https://leetcode.com/problems/design-compressed-string-iterator', 183, 21.6, 56.5, '["Google,Amazon"]'::jsonb, '["Design"]'::jsonb, 
   292, 104, 74, true, '[]'::jsonb, true),
  (605, 'Can Place Flowers', 'You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.

Given an integer array `flowerbed` containing `0`''s and `1`''s, where `0` means empty and `1` means not empty, and an integer `n`, return if `n` new flowers can be planted in the `flowerbed` without violating the no-adjacent-flowers rule.


Example 1:
Input: flowerbed = [1,0,0,0,1], n = 1
Output: true

Example 2:
Input: flowerbed = [1,0,0,0,1], n = 2
Output: false

Constraints:
`1 <= flowerbed.length <= 2 * 104`
`flowerbed[i]` is `0` or `1`.

There are no two adjacent flowers in `flowerbed`.

`0 <= n <= flowerbed.length`', false, 'Easy', '/articles/can-place-flowers', 31.7, 
   30.7, 'https://leetcode.com/problems/can-place-flowers', 952, 164, 517, '["LinkedIn,Facebook"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   1369, 456, 75, true, '[]'::jsonb, true),
  (606, 'Construct String from Binary Tree', 'You need to construct a string consists of parenthesis and integers from a binary tree with the preorder traversing way.

The null node needs to be represented by empty parenthesis pair "()". And you need to omit all the empty parenthesis pairs that don''t affect the one-to-one mapping relationship between the string and the original binary tree.


Example 1:
Input: Binary tree: [1,2,3,4]
       1
     /   \\
    2     3
   /    
  4     
Output: "1(2(4))(3)"
Explanation: Originallay it needs to be "1(2(4)())(3()())", but you need to omit all the unnecessary empty parenthesis pairs. And it will be "1(2(4))(3)".


Example 2:
Input: Binary tree: [1,2,3,null,4]
       1
     /   \\
    2     3
     \\  
      4 
Output: "1(2()(4))(3)"
Explanation: Almost the same as the first example, except we can''t omit the first parenthesis pair to break the one-to-one mapping relationship between the input and the output.', false, 'Easy', '/articles/construct-string-from-binary-tree', 55.8, 
   12.8, 'https://leetcode.com/problems/construct-string-from-binary-tree', 545, 101.1, 181.2, '["Bloomberg"]'::jsonb, '["String,Tree"]'::jsonb, 
   942, 1279, 42, false, '[]'::jsonb, true),
  (607, 'Sales Person', 'SQL Schema', true, 'Easy', '/articles/sales-person', 65.4, 
   1.1, 'https://leetcode.com/problems/sales-person', 164, 29.8, 45.6, '[]'::jsonb, '[]'::jsonb, 
   166, 33, 83, false, '[]'::jsonb, true),
  (608, 'Tree Node', 'SQL Schema', true, 'Medium', '/articles/tree-node', 69.9, 
   0, 'https://leetcode.com/problems/tree-node', 194, 26.6, 38, '["Uber,Twitter"]'::jsonb, '[]'::jsonb, 
   232, 13, 95, false, '[]'::jsonb, true),
  (609, 'Find Duplicate File in System', 'Given a list `paths` of directory info, including the directory path, and all the files with contents in this directory, return all the duplicate files in the file system in terms of their paths. You may return the answer in any order.

A group of duplicate files consists of at least two files that have the same content.

A single directory info string in the input list has the following format:
`"root/d1/d2/.../dm f1.txt(f1_content) f2.txt(f2_content) ... fn.txt(fn_content)"`
It means there are `n` files `(f1.txt, f2.txt ... fn.txt)` with content `(f1_content, f2_content ... fn_content)` respectively in the directory "`root/d1/d2/.../dm"`. Note that `n >= 1` and `m >= 0`. If `m = 0`, it means the directory is just the root directory.

The output is a list of groups of duplicate file paths. For each group, it contains all the file paths of the files that have the same content. A file path is a string that has the following format:
`"directory_path/file_name.txt"`

Example 1:
Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)","root 4.txt(efgh)"]
Output: [["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]

Example 2:
Input: paths = ["root/a 1.txt(abcd) 2.txt(efgh)","root/c 3.txt(abcd)","root/c/d 4.txt(efgh)"]
Output: [["root/a/2.txt","root/c/d/4.txt"],["root/a/1.txt","root/c/3.txt"]]

Constraints:
`1 <= paths.length <= 2 * 104`
`1 <= paths[i].length <= 3000`
`1 <= sum(paths[i].length) <= 5 * 105`
`paths[i]` consist of English letters, digits, `''/''`, `''.''`, `''(''`, `'')''`, and `'' ''`.

You may assume no files or directories share the same name in the same directory.

You may assume each given directory info represents a unique directory. A single blank space separates the directory path and file info.

Follow up:
Imagine you are given a real file system, how will you search files? DFS or BFS?
If the file content is very large (GB level), how will you modify your solution?
If you can only read the file by 1kb each time, how will you modify your solution?
What is the time complexity of your modified solution? What is the most time-consuming part and memory-consuming part of it? How to optimize?
How to make sure the duplicated files you find are not false positive?', false, 'Medium', '/articles/find-duplicate-file-in-system', 61.2, 
   62.7, 'https://leetcode.com/problems/find-duplicate-file-in-system', 346, 67.3, 110, '["Dropbox,Amazon"]'::jsonb, '["Hash Table,String"]'::jsonb, 
   549, 702, 44, true, '[]'::jsonb, true),
  (610, 'Triangle Judgement', 'SQL Schema', true, 'Easy', '/articles/triangle-judgement', 68.9, 
   19.3, 'https://leetcode.com/problems/triangle-judgement', 82, 31.2, 45.2, '["Facebook"]'::jsonb, '[]'::jsonb, 
   145, 28, 84, true, '[]'::jsonb, true),
  (611, 'Valid Triangle Number', 'Given an array consists of non-negative integers,  your task is to count the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle.


Example 1:
Input: [2,2,3,4]
Output: 3
Explanation:
Valid combinations are: 
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3
Note:
The length of the given array won''t exceed 1000.

The integers in the given array are in the range of [0, 1000].', false, 'Medium', '/articles/valid-triangle-number', 49.5, 
   36.8, 'https://leetcode.com/problems/valid-triangle-number', 255, 81.5, 164.8, '["Bloomberg,LinkedIn,ByteDance"]'::jsonb, '["Array"]'::jsonb, 
   1357, 106, 93, false, '[]'::jsonb, true),
  (612, 'Shortest Distance in a Plane', 'SQL Schema', true, 'Medium', '/articles/shortest-distance-in-a-plane', 61.7, 
   3.5, 'https://leetcode.com/problems/shortest-distance-in-a-plane', 104, 20.1, 32.6, '["Microsoft"]'::jsonb, '[]'::jsonb, 
   126, 43, 75, false, '[]'::jsonb, true),
  (613, 'Shortest Distance in a Line', 'SQL Schema', true, 'Easy', '/articles/shortest-distance-in-a-line', 79.9, 
   0, 'https://leetcode.com/problems/shortest-distance-in-a-line', 127, 34.1, 42.7, '[]'::jsonb, '[]'::jsonb, 
   196, 26, 88, false, '[]'::jsonb, true),
  (614, 'Second Degree Follower', 'SQL Schema', true, 'Medium', NULL, 32.8, 
   2.2, 'https://leetcode.com/problems/second-degree-follower', 223, 27.4, 83.6, '["Facebook,Databricks"]'::jsonb, '[]'::jsonb, 
   87, 581, 13, true, '[]'::jsonb, true),
  (615, 'Average Salary: Departments VS Company', 'SQL Schema', true, 'Hard', '/articles/average-salary-departments-vs-company', 53.1, 
   1.9, 'https://leetcode.com/problems/average-salary-departments-vs-company', 270, 16, 30.2, '["Amazon"]'::jsonb, '[]'::jsonb, 
   119, 38, 76, true, '[]'::jsonb, true),
  (616, 'Add Bold Tag in String', 'Given a string s and a list of strings dict, you need to add a closed pair of bold tag `<b>` and `</b>` to wrap the substrings in s that exist in dict. If two such substrings overlap, you need to wrap them together by only one pair of closed bold tag. Also, if two substrings wrapped by bold tags are consecutive, you need to combine them.


Example 1:
Input: 
s = "abcxyz123"
dict = ["abc","123"]
Output:
"<b>abc</b>xyz<b>123</b>"

Example 2:
Input: 
s = "aaabbcc"
dict = ["aaa","aab","bc"]
Output:
"<b>aaabbc</b>c"

Constraints:
The given dict won''t contain duplicates, and its length won''t exceed 100.

All the strings in input have length in range [1, 1000].

Note: This question is the same as 758: https://leetcode.com/problems/bold-words-in-string/', true, 'Medium', '/articles/add-bold-tag-in-a-string', 44.9, 
   33.5, 'https://leetcode.com/problems/add-bold-tag-in-string', 285, 48.6, 108.3, '["Facebook"]'::jsonb, '["String"]'::jsonb, 
   642, 91, 88, true, '[]'::jsonb, true),
  (617, 'Merge Two Binary Trees', 'You are given two binary trees `root1` and `root2`.

Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.

Return the merged tree.

Note: The merging process must start from the root nodes of both trees.


Example 1:
Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
Output: [3,4,5,5,4,null,7]

Example 2:
Input: root1 = [1], root2 = [1,2]
Output: [2,2]

Constraints:
The number of nodes in both trees is in the range `[0, 2000]`.

`-104 <= Node.val <= 104`', false, 'Easy', '/articles/merge-two-binary-trees', 75.5, 
   31.8, 'https://leetcode.com/problems/merge-two-binary-trees', 999, 379.6, 502.7, '["Amazon,Google,Facebook,Apple"]'::jsonb, '["Tree"]'::jsonb, 
   4157, 195, 96, true, '[]'::jsonb, true),
  (618, 'Students Report By Geography', 'SQL Schema', true, 'Hard', '/articles/students-report-by-geography', 60.6, 
   0, 'https://leetcode.com/problems/students-report-by-geography', 98, 10.8, 17.8, '["Amazon"]'::jsonb, '[]'::jsonb, 
   84, 98, 46, true, '[]'::jsonb, true),
  (619, 'Biggest Single Number', 'SQL Schema', true, 'Easy', '/articles/biggest-single-number', 45.2, 
   0, 'https://leetcode.com/problems/biggest-single-number', 132, 30.6, 67.8, '[]'::jsonb, '[]'::jsonb, 
   88, 80, 52, false, '[]'::jsonb, true),
  (620, 'Not Boring Movies', 'SQL Schema', false, 'Easy', '/articles/not-boring-movies', 70.2, 
   2.6, 'https://leetcode.com/problems/not-boring-movies', 242, 134.8, 192, '[]'::jsonb, '[]'::jsonb, 
   347, 328, 51, false, '[]'::jsonb, true),
  (621, 'Task Scheduler', 'Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer `n` that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least `n` units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.


Example 1:
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.


Example 2:
Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: On this case any permutation of size 6 would work since n = 0.

["A","A","A","B","B","B"]
["A","B","A","B","A","B"]
["B","B","B","A","A","A"]
...

And so on.


Example 3:
Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation: 
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A

Constraints:
`1 <= task.length <= 104`
`tasks[i]` is upper-case English letter.

The integer `n` is in the range `[0, 100]`.', false, 'Medium', '/articles/task-scheduler', 52.2, 
   65.2, 'https://leetcode.com/problems/task-scheduler', 732, 255.9, 489.8, '["Facebook,Rubrik,Amazon,Pinterest,Google,Microsoft,Bloomberg,Airtel"]'::jsonb, '["Array,Greedy,Queue"]'::jsonb, 
   4588, 874, 84, true, '[]'::jsonb, true),
  (622, 'Design Circular Queue', 'Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".

One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. But using the circular queue, we can use the space to store new values.

Implementation the `MyCircularQueue` class:
`MyCircularQueue(k)` Initializes the object with the size of the queue to be `k`.

`int Front()` Gets the front item from the queue. If the queue is empty, return `-1`.

`int Rear()` Gets the last item from the queue. If the queue is empty, return `-1`.

`boolean enQueue(int value)` Inserts an element into the circular queue. Return `true` if the operation is successful.

`boolean deQueue()` Deletes an element from the circular queue. Return `true` if the operation is successful.

`boolean isEmpty()` Checks whether the circular queue is empty or not.

`boolean isFull()` Checks whether the circular queue is full or not.


Example 1:
Input
["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
Output
[null, true, true, true, false, 3, true, true, true, 4]
Explanation
MyCircularQueue myCircularQueue = new MyCircularQueue(3);
myCircularQueue.enQueue(1); // return True
myCircularQueue.enQueue(2); // return True
myCircularQueue.enQueue(3); // return True
myCircularQueue.enQueue(4); // return False
myCircularQueue.Rear();     // return 3
myCircularQueue.isFull();   // return True
myCircularQueue.deQueue();  // return True
myCircularQueue.enQueue(4); // return True
myCircularQueue.Rear();     // return 4

Constraints:
`1 <= k <= 1000`
`0 <= value <= 1000`
At most `3000` calls will be made to `enQueue`, `deQueue`, `Front`, `Rear`, `isEmpty`, and `isFull`.

Follow up: Could you solve the problem without using the built-in queue?', false, 'Medium', '/articles/design-circular-queue', 47.7, 
   13.6, 'https://leetcode.com/problems/design-circular-queue', 571, 114.8, 240.8, '["Facebook,Amazon,Microsoft,Rubrik,Oracle"]'::jsonb, '["Design,Queue"]'::jsonb, 
   1019, 136, 88, true, '[]'::jsonb, true),
  (623, 'Add One Row to Tree', 'Given the `root` of a binary tree and two integers `val` and `depth`, add a row of nodes with value `val` at the given depth `depth`.

Note that the `root` node is at depth `1`.

The adding rule is:
Given the integer `depth`, for each not null tree node `cur` at the depth `depth - 1`, create two tree nodes with value `val` as `cur`''s left subtree root and right subtree root.

`cur`''s original left subtree should be the left subtree of the new left subtree root.

`cur`''s original right subtree should be the right subtree of the new right subtree root.

If `depth == 1` that means there is no depth `depth - 1` at all, then create a tree node with value `val` as the new root of the whole original tree, and the original tree is the new root''s left subtree.


Example 1:
Input: root = [4,2,6,3,1,5], val = 1, depth = 2
Output: [4,1,1,2,null,null,6,3,1,5]

Example 2:
Input: root = [4,2,null,3,1], val = 1, depth = 3
Output: [4,2,null,1,1,3,null,null,1]

Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

The depth of the tree is in the range `[1, 104]`.

`-100 <= Node.val <= 100`
`-105 <= val <= 105`
`1 <= depth <= the depth of tree + 1`', false, 'Medium', '/articles/add-one-row-in-a-tree', 53, 
   0.3, 'https://leetcode.com/problems/add-one-row-to-tree', 603, 68.8, 129.8, '["Gilt Groupe"]'::jsonb, '["Tree"]'::jsonb, 
   898, 160, 85, false, '[]'::jsonb, true),
  (624, 'Maximum Distance in Arrays', 'You are given `m` `arrays`, where each array is sorted in ascending order.

You can pick up two integers from two different arrays (each array picks one) and calculate the distance. We define the distance between two integers `a` and `b` to be their absolute difference `|a - b|`.

Return the maximum distance.


Example 1:
Input: arrays = [[1,2,3],[4,5],[1,2,3]]
Output: 4
Explanation: One way to reach the maximum distance 4 is to pick 1 in the first or third array and pick 5 in the second array.


Example 2:
Input: arrays = [[1],[1]]
Output: 0

Example 3:
Input: arrays = [[1],[2]]
Output: 1

Example 4:
Input: arrays = [[1,4],[0,5]]
Output: 4

Constraints:
`m == arrays.length`
`2 <= m <= 105`
`1 <= arrays[i].length <= 500`
`-104 <= arrays[i][j] <= 104`
`arrays[i]` is sorted in ascending order.

There will be at most `105` integers in all the arrays.', true, 'Medium', '/articles/maximum-distance-in-array', 39.6, 
   5.3, 'https://leetcode.com/problems/maximum-distance-in-arrays', 171, 30.5, 77, '["Yahoo"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   491, 59, 89, false, '[]'::jsonb, true),
  (625, 'Minimum Factorization', 'Given a positive integer `a`, find the smallest positive integer `b` whose multiplication of each digit equals to `a`. 
If there is no answer or the answer is not fit in 32-bit signed integer, then return 0.


Example 1
Input:
48 
Output:
68

Example 2
Input: 
15
Output:
35', true, 'Medium', '/articles/minimum-factorization', 33, 
   0, 'https://leetcode.com/problems/minimum-factorization', 61, 9.3, 28.1, '["Tencent"]'::jsonb, '["Math,Recursion"]'::jsonb, 
   103, 93, 53, false, '[]'::jsonb, true),
  (626, 'Exchange Seats', 'SQL Schema', false, 'Medium', '/articles/exchange-seats', 66.2, 
   18.8, 'https://leetcode.com/problems/exchange-seats', 540, 68.9, 104.1, '["Amazon"]'::jsonb, '[]'::jsonb, 
   439, 296, 60, true, '[]'::jsonb, true),
  (627, 'Swap Salary', 'SQL Schema', false, 'Easy', '/articles/swap-salary', 78, 
   21.6, 'https://leetcode.com/problems/swap-salary', 195, 138.4, 177.3, '["Amazon"]'::jsonb, '[]'::jsonb, 
   598, 312, 66, true, '[]'::jsonb, true),
  (628, 'Maximum Product of Three Numbers', 'Given an integer array `nums`, find three numbers whose product is maximum and return the maximum product.


Example 1:
Input: nums = [1,2,3]
Output: 6

Example 2:
Input: nums = [1,2,3,4]
Output: 24

Example 3:
Input: nums = [-1,-2,-3]
Output: -6

Constraints:
`3 <= nums.length <= 104`
`-1000 <= nums[i] <= 1000`', false, 'Easy', '/articles/maximmum-product-of-three-numbers', 46.8, 
   39.8, 'https://leetcode.com/problems/maximum-product-of-three-numbers', 592, 148.9, 318.1, '["Amazon"]'::jsonb, '["Array,Math"]'::jsonb, 
   1566, 437, 78, true, '[]'::jsonb, true),
  (629, 'K Inverse Pairs Array', 'Given two integers `n` and `k`, find how many different arrays consist of numbers from `1` to `n` such that there are exactly `k` inverse pairs.

We define an inverse pair as following: For `ith` and `jth` element in the array, if `i` < `j` and `a[i]` > `a[j]` then it''s an inverse pair; Otherwise, it''s not.

Since the answer may be very large, the answer should be modulo 109 + 7.


Example 1:
Input: n = 3, k = 0
Output: 1
Explanation: 
Only the array [1,2,3] which consists of numbers from 1 to 3 has exactly 0 inverse pair.


Example 2:
Input: n = 3, k = 1
Output: 2
Explanation: 
The array [1,3,2] and [2,1,3] have exactly 1 inverse pair.

Note:
The integer `n` is in the range [1, 1000] and `k` is in the range [0, 1000].', false, 'Hard', '/articles/k-inverse-pairs-array', 31.7, 
   0, 'https://leetcode.com/problems/k-inverse-pairs-array', 71, 12.8, 40.3, '["Works Applications"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   393, 77, 84, false, '[]'::jsonb, true),
  (630, 'Course Schedule III', 'There are `n` different online courses numbered from `1` to `n`. Each course has some duration(course length) `t` and closed on `dth` day. A course should be taken continuously for `t` days and must be finished before or on the `dth` day. You will start at the `1st` day.

Given `n` online courses represented by pairs `(t,d)`, your task is to find the maximal number of courses that can be taken.


Example:
Input: [[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]
Output: 3
Explanation: 
There''re totally 4 courses, but you can take 3 courses at most:
First, take the 1st course, it costs 100 days so you will finish it on the 100th day, and ready to take the next course on the 101st day.

Second, take the 3rd course, it costs 1000 days so you will finish it on the 1100th day, and ready to take the next course on the 1101st day. 
Third, take the 2nd course, it costs 200 days so you will finish it on the 1300th day. 
The 4th course cannot be taken now, since you will finish it on the 3300th day, which exceeds the closed date.

Note:
The integer 1 <= d, t, n <= 10,000.

You can''t take two courses simultaneously.', false, 'Hard', '/articles/course-schedule-iii', 33.8, 
   8.9, 'https://leetcode.com/problems/course-schedule-iii', 84, 27.9, 82.5, '["Google,Microsoft"]'::jsonb, '["Greedy"]'::jsonb, 
   1015, 39, 96, true, '[]'::jsonb, true),
  (631, 'Design Excel Sum Formula', 'Your task is to design the basic function of Excel and implement the function of sum formula.  Specifically, you need to implement the following functions:
`Excel(int H, char W):` This is the constructor. The inputs represents the height and width of the Excel form. H is a positive integer, range from 1 to 26. It represents the height. W is a character range from ''A'' to ''Z''. It represents that the width is the number of characters from ''A'' to W. The Excel form content is represented by a height * width 2D integer array `C`, it should be initialized to zero. You should assume that the first row of `C` starts from 1, and the first column of `C` starts from ''A''.

`void Set(int row, char column, int val):` Change the value at `C(row, column)` to be val.

`int Get(int row, char column):` Return the value at `C(row, column)`.

`int Sum(int row, char column, List of Strings : numbers):` This function calculate and set the value at `C(row, column)`, where the value should be the sum of cells represented by `numbers`. This function return the sum result at `C(row, column)`. This sum formula should exist until this cell is overlapped by another value or another sum formula.

`numbers` is a list of strings that each string represent a cell or a range of cells. If the string represent a single cell, then it has the following format : `ColRow`. For example, "F7" represents the cell at (7, F). 
If the string represent a range of cells, then it has the following format : `ColRow1:ColRow2`. The range will always be a rectangle, and ColRow1 represent the position of the top-left cell, and ColRow2 represents the position of the bottom-right cell. 

Example 1:
Excel(3,"C"); 
// construct a 3*3 2D array with all zero.

//   A B C
// 1 0 0 0
// 2 0 0 0
// 3 0 0 0
Set(1, "A", 2);
// set C(1,"A") to be 2.

//   A B C
// 1 2 0 0
// 2 0 0 0
// 3 0 0 0
Sum(3, "C", ["A1", "A1:B2"]);
// set C(3,"C") to be the sum of value at C(1,"A") and the values sum of the rectangle range whose top-left cell is C(1,"A") and bottom-right cell is C(2,"B"). Return 4. 
//   A B C
// 1 2 0 0
// 2 0 0 0
// 3 0 0 4
Set(2, "B", 2);
// set C(2,"B") to be 2. Note C(3, "C") should also be changed.

//   A B C
// 1 2 0 0
// 2 0 2 0
// 3 0 0 6
Note:
You could assume that there won''t be any circular sum reference. For example, A1 = sum(B1) and B1 = sum(A1).

 The test cases are using double-quotes to represent a character.

Please remember to RESET your class variables declared in class Excel, as static/class variables are persisted across multiple test cases. Please see here for more details.', true, 'Hard', '/articles/design-excel-sum-formula', 32.2, 
   53.9, 'https://leetcode.com/problems/design-excel-sum-formula', 58, 4.8, 14.7, '["Opendoor"]'::jsonb, '["Design"]'::jsonb, 
   99, 106, 48, false, '[]'::jsonb, true),
  (632, 'Smallest Range Covering Elements from K Lists', 'You have `k` lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the `k` lists.

We define the range `[a, b]` is smaller than range `[c, d]` if `b - a < d - c` or `a < c` if `b - a == d - c`.


Example 1:
Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].

List 2: [0, 9, 12, 20], 20 is in range [20,24].

List 3: [5, 18, 22, 30], 22 is in range [20,24].


Example 2:
Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]

Example 3:
Input: nums = [[10,10],[11,11]]
Output: [10,11]

Example 4:
Input: nums = [[10],[11]]
Output: [10,11]

Example 5:
Input: nums = [[1],[2],[3],[4],[5],[6],[7]]
Output: [1,7]

Constraints:
`nums.length == k`
`1 <= k <= 3500`
`1 <= nums[i].length <= 50`
`-105 <= nums[i][j] <= 105`
`nums[i]` is sorted in non-decreasing order.', false, 'Hard', '/articles/smallest-range', 54.5, 
   29.7, 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists', 323, 46.2, 84.9, '["Amazon"]'::jsonb, '["Hash Table,Two Pointers,String"]'::jsonb, 
   1384, 26, 98, true, '[]'::jsonb, true),
  (633, 'Sum of Square Numbers', 'Given a non-negative integer `c`, decide whether there''re two integers `a` and `b` such that `a2 + b2 = c`.


Example 1:
Input: c = 5
Output: true
Explanation: 1 * 1 + 2 * 2 = 5

Example 2:
Input: c = 3
Output: false

Example 3:
Input: c = 4
Output: true

Example 4:
Input: c = 2
Output: true

Example 5:
Input: c = 1
Output: true

Constraints:
`0 <= c <= 231 - 1`', false, 'Medium', '/articles/sum-of-square-numbers', 32.6, 
   4.9, 'https://leetcode.com/problems/sum-of-square-numbers', 343, 82.4, 252.3, '["Apple"]'::jsonb, '["Math"]'::jsonb, 
   676, 379, 64, true, '[]'::jsonb, true),
  (634, 'Find the Derangement of An Array', 'In combinatorial mathematics, a derangement is a permutation of the elements of a set, such that no element appears in its original position.

There''s originally an array consisting of `n` integers from 1 to `n` in ascending order, you need to find the number of derangement it can generate.

Also, since the answer may be very large, you should return the output mod 109 + 7.


Example 1:
Input: 3
Output: 2
Explanation: The original array is [1,2,3]. The two derangements are [2,3,1] and [3,1,2].

Note:
`n` is in the range of [1, 106].', true, 'Medium', '/articles/find-derangements', 40.6, 
   16.2, 'https://leetcode.com/problems/find-the-derangement-of-an-array', 36, 7.4, 18.1, '["Amazon,IXL"]'::jsonb, '["Math"]'::jsonb, 
   143, 125, 53, true, '[]'::jsonb, true),
  (635, 'Design Log Storage System', 'You are given several logs, where each log contains a unique ID and timestamp. Timestamp is a string that has the following format: `Year:Month:Day:Hour:Minute:Second`, for example, `2017:01:01:23:59:59`. All domains are zero-padded decimal numbers.

Implement the `LogSystem` class:
`LogSystem()` Initializes the `LogSystem` object.

`void put(int id, string timestamp)` Stores the given log `(id, timestamp)` in your storage system.

`int[] retrieve(string start, string end, string granularity)` Returns the IDs of the logs whose timestamps are within the range from `start` to `end` inclusive. `start` and `end` all have the same format as `timestamp`, and `granularity` means how precise the range should be (i.e. to the exact `Day`, `Minute`, etc.). For example, `start = "2017:01:01:23:59:59"`, `end = "2017:01:02:23:59:59"`, and `granularity = "Day"` means that we need to find the logs within the inclusive range from Jan. 1st 2017 to Jan. 2nd 2017, and the `Hour`, `Minute`, and `Second` for each log entry can be ignored.


Example 1:
Input
["LogSystem", "put", "put", "put", "retrieve", "retrieve"]
[[], [1, "2017:01:01:23:59:59"], [2, "2017:01:01:22:59:59"], [3, "2016:01:01:00:00:00"], ["2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year"], ["2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour"]]
Output
[null, null, null, null, [3, 2, 1], [2, 1]]
Explanation
LogSystem logSystem = new LogSystem();
logSystem.put(1, "2017:01:01:23:59:59");
logSystem.put(2, "2017:01:01:22:59:59");
logSystem.put(3, "2016:01:01:00:00:00");
// return [3,2,1], because you need to return all logs between 2016 and 2017.

logSystem.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year");
// return [2,1], because you need to return all logs between Jan. 1, 2016 01:XX:XX and Jan. 1, 2017 23:XX:XX.

// Log 3 is not returned because Jan. 1, 2016 00:00:00 comes before the start of the range.

logSystem.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour");

Constraints:
`1 <= id <= 500`
`2000 <= Year <= 2017`
`1 <= Month <= 12`
`1 <= Day <= 31`
`0 <= Hour <= 23`
`0 <= Minute, Second <= 59`
`granularity` is one of the values `["Year", "Month", "Day", "Hour", "Minute", "Second"]`.

At most `500` calls will be made to `put` and `retrieve`.', true, 'Medium', '/articles/design-log-storage', 60.1, 
   32.8, 'https://leetcode.com/problems/design-log-storage-system', 159, 22.1, 36.8, '[]'::jsonb, '["String,Design"]'::jsonb, 
   320, 142, 69, false, '[]'::jsonb, true),
  (636, 'Exclusive Time of Functions', 'On a single-threaded CPU, we execute a program containing `n` functions. Each function has a unique ID between `0` and `n-1`.

Function calls are stored in a call stack: when a function call starts, its ID is pushed onto the stack, and when a function call ends, its ID is popped off the stack. The function whose ID is at the top of the stack is the current function being executed. Each time a function starts or ends, we write a log with the ID, whether it started or ended, and the timestamp.

You are given a list `logs`, where `logs[i]` represents the `ith` log message formatted as a string `"{function_id}:{"start" | "end"}:{timestamp}"`. For example, `"0:start:3"` means a function call with function ID `0` started at the beginning of timestamp `3`, and `"1:end:2"` means a function call with function ID `1` ended at the end of timestamp `2`. Note that a function can be called multiple times, possibly recursively.

A function''s exclusive time is the sum of execution times for all function calls in the program. For example, if a function is called twice, one call executing for `2` time units and another call executing for `1` time unit, the exclusive time is `2 + 1 = 3`.

Return the exclusive time of each function in an array, where the value at the `ith` index represents the exclusive time for the function with ID `i`.


Example 1:
Input: n = 2, logs = ["0:start:0","1:start:2","1:end:5","0:end:6"]
Output: [3,4]
Explanation:
Function 0 starts at the beginning of time 0, then it executes 2 for units of time and reaches the end of time 1.

Function 1 starts at the beginning of time 2, executes for 4 units of time, and ends at the end of time 5.

Function 0 resumes execution at the beginning of time 6 and executes for 1 unit of time.

So function 0 spends 2 + 1 = 3 units of total time executing, and function 1 spends 4 units of total time executing.


Example 2:
Input: n = 1, logs = ["0:start:0","0:start:2","0:end:5","0:start:6","0:end:6","0:end:7"]
Output: [8]
Explanation:
Function 0 starts at the beginning of time 0, executes for 2 units of time, and recursively calls itself.

Function 0 (recursive call) starts at the beginning of time 2 and executes for 4 units of time.

Function 0 (initial call) resumes execution then immediately calls itself again.

Function 0 (2nd recursive call) starts at the beginning of time 6 and executes for 1 unit of time.

Function 0 (initial call) resumes execution at the beginning of time 7 and executes for 1 unit of time.

So function 0 spends 2 + 4 + 1 + 1 = 8 units of total time executing.


Example 3:
Input: n = 2, logs = ["0:start:0","0:start:2","0:end:5","1:start:6","1:end:6","0:end:7"]
Output: [7,1]
Explanation:
Function 0 starts at the beginning of time 0, executes for 2 units of time, and recursively calls itself.

Function 0 (recursive call) starts at the beginning of time 2 and executes for 4 units of time.

Function 0 (initial call) resumes execution then immediately calls function 1.

Function 1 starts at the beginning of time 6, executes 1 units of time, and ends at the end of time 6.

Function 0 resumes execution at the beginning of time 6 and executes for 2 units of time.

So function 0 spends 2 + 4 + 1 = 7 units of total time executing, and function 1 spends 1 unit of total time executing.


Example 4:
Input: n = 2, logs = ["0:start:0","0:start:2","0:end:5","1:start:7","1:end:7","0:end:8"]
Output: [8,1]

Example 5:
Input: n = 1, logs = ["0:start:0","0:end:0"]
Output: [1]

Constraints:
`1 <= n <= 100`
`1 <= logs.length <= 500`
`0 <= function_id < n`
`0 <= timestamp <= 109`
No two start events will happen at the same timestamp.

No two end events will happen at the same timestamp.

Each function has an `"end"` log for each `"start"` log.', false, 'Medium', '/articles/exclusive-time-of-functions', 55, 
   61.3, 'https://leetcode.com/problems/exclusive-time-of-functions', 403, 106.1, 192.9, '["Facebook,Amazon,Microsoft,LinkedIn,Google"]'::jsonb, '["Stack"]'::jsonb, 
   1025, 1781, 37, true, '[]'::jsonb, true),
  (637, 'Average of Levels in Binary Tree', 'Given the `root` of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within `10-5` of the actual answer will be accepted.


Example 1:
Input: root = [3,9,20,null,15,7]
Output: [3.00000,14.50000,11.00000]
Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.

Hence return [3, 14.5, 11].


Example 2:
Input: root = [3,9,20,15,7]
Output: [3.00000,14.50000,11.00000]

Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-231 <= Node.val <= 231 - 1`', false, 'Easy', '/articles/average-of-levels-in-binary-tree', 66.1, 
   9.7, 'https://leetcode.com/problems/average-of-levels-in-binary-tree', 999, 190.3, 287.9, '["Facebook"]'::jsonb, '["Tree"]'::jsonb, 
   1955, 204, 91, true, '[]'::jsonb, true),
  (638, 'Shopping Offers', 'In LeetCode Store, there are some kinds of items to sell. Each item has a price.

However, there are some special offers, and a special offer consists of one or more different kinds of items with a sale price.

You are given the each item''s price, a set of special offers, and the number we need to buy for each item.

The job is to output the lowest price you have to pay for exactly certain items as given, where you could make optimal use of the special offers.

Each special offer is represented in the form of an array, the last number represents the price you need to pay for this special offer, other numbers represents how many specific items you could get if you buy this offer.

You could use any of special offers as many times as you want.


Example 1:
Input: [2,5], [[3,0,5],[1,2,10]], [3,2]
Output: 14
Explanation: 
There are two kinds of items, A and B. Their prices are $2 and $5 respectively. 
In special offer 1, you can pay $5 for 3A and 0B
In special offer 2, you can pay $10 for 1A and 2B. 
You need to buy 3A and 2B, so you may pay $10 for 1A and 2B (special offer #2), and $4 for 2A.


Example 2:
Input: [2,3,4], [[1,1,0,4],[2,2,1,9]], [1,2,1]
Output: 11
Explanation: 
The price of A is $2, and $3 for B, $4 for C. 
You may pay $4 for 1A and 1B, and $9 for 2A ,2B and 1C. 
You need to buy 1A ,2B and 1C, so you may pay $4 for 1A and 1B (special offer #1), and $3 for 1B, $4 for 1C. 
You cannot add more items, though only $9 for 2A ,2B and 1C.

Note:
There are at most 6 kinds of items, 100 special offers.

For each item, you need to buy at most 6 of them.

You are not allowed to buy more items than you want, even if that would lower the overall price.', false, 'Medium', '/articles/shopping-offers', 53.1, 
   13.3, 'https://leetcode.com/problems/shopping-offers', 264, 36.7, 69, '["Google"]'::jsonb, '["Dynamic Programming,Depth-first Search"]'::jsonb, 
   719, 520, 58, true, '[]'::jsonb, true),
  (639, 'Decode Ways II', 'A message containing letters from `A-Z` can be encoded into numbers using the following mapping:
''A'' -> "1"
''B'' -> "2"
...

''Z'' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, `"11106"` can be mapped into:
`"AAJF"` with the grouping `(1 1 10 6)`
`"KJF"` with the grouping `(11 10 6)`
Note that the grouping `(1 11 06)` is invalid because `"06"` cannot be mapped into `''F''` since `"6"` is different from `"06"`.

In addition to the mapping above, an encoded message may contain the `''*''` character, which can represent any digit from `''1''` to `''9''` (`''0''` is excluded). For example, the encoded message `"1*"` may represent any of the encoded messages `"11"`, `"12"`, `"13"`, `"14"`, `"15"`, `"16"`, `"17"`, `"18"`, or `"19"`. Decoding `"1*"` is equivalent to decoding any of the encoded messages it can represent.

Given a string `s` containing digits and the `''*''` character, return the number of ways to decode it.

Since the answer may be very large, return it modulo `109 + 7`.


Example 1:
Input: s = "*"
Output: 9
Explanation: The encoded message can represent any of the encoded messages "1", "2", "3", "4", "5", "6", "7", "8", or "9".

Each of these can be decoded to the strings "A", "B", "C", "D", "E", "F", "G", "H", and "I" respectively.

Hence, there are a total of 9 ways to decode "*".


Example 2:
Input: s = "1*"
Output: 18
Explanation: The encoded message can represent any of the encoded messages "11", "12", "13", "14", "15", "16", "17", "18", or "19".

Each of these encoded messages have 2 ways to be decoded (e.g. "11" can be decoded to "AA" or "K").

Hence, there are a total of 9 * 2 = 18 ways to decode "1*".


Example 3:
Input: s = "2*"
Output: 15
Explanation: The encoded message can represent any of the encoded messages "21", "22", "23", "24", "25", "26", "27", "28", or "29".

"21", "22", "23", "24", "25", and "26" have 2 ways of being decoded, but "27", "28", and "29" only have 1 way.

Hence, there are a total of (6 * 2) + (3 * 1) = 12 + 3 = 15 ways to decode "2*".


Constraints:
`1 <= s.length <= 105`
`s[i]` is a digit or `''*''`.', false, 'Hard', '/articles/decode-ways-ii', 27.7, 
   1.6, 'https://leetcode.com/problems/decode-ways-ii', 250, 38.5, 138.9, '["Google,Facebook"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   583, 592, 50, true, '[]'::jsonb, true),
  (640, 'Solve the Equation', 'Solve a given equation and return the value of `x` in the form of string "x=#value". The equation contains only ''+'', ''-'' operation, the variable `x` and its coefficient.

If there is no solution for the equation, return "No solution".

If there are infinite solutions for the equation, return "Infinite solutions".

If there is exactly one solution for the equation, we ensure that the value of `x` is an integer.


Example 1:
Input: "x+5-3+x=6+x-2"
Output: "x=2"

Example 2:
Input: "x=x"
Output: "Infinite solutions"

Example 3:
Input: "2x=x"
Output: "x=0"

Example 4:
Input: "2x+3x-6x=x+2"
Output: "x=-1"

Example 5:
Input: "x=x+2"
Output: "No solution"', false, 'Medium', '/articles/solve-the-equation', 42.8, 
   13.1, 'https://leetcode.com/problems/solve-the-equation', 270, 28, 65.5, '["Amazon"]'::jsonb, '["Math"]'::jsonb, 
   289, 587, 33, true, '[]'::jsonb, true),
  (641, 'Design Circular Deque', 'Design your implementation of the circular double-ended queue (deque).

Your implementation should support following operations:
`MyCircularDeque(k)`: Constructor, set the size of the deque to be k.

`insertFront()`: Adds an item at the front of Deque. Return true if the operation is successful.

`insertLast()`: Adds an item at the rear of Deque. Return true if the operation is successful.

`deleteFront()`: Deletes an item from the front of Deque. Return true if the operation is successful.

`deleteLast()`: Deletes an item from the rear of Deque. Return true if the operation is successful.

`getFront()`: Gets the front item from the Deque. If the deque is empty, return -1.

`getRear()`: Gets the last item from Deque. If the deque is empty, return -1.

`isEmpty()`: Checks whether Deque is empty or not. 
`isFull()`: Checks whether Deque is full or not.


Example:
MyCircularDeque circularDeque = new MycircularDeque(3); // set the size to be 3
circularDeque.insertLast(1);			// return true
circularDeque.insertLast(2);			// return true
circularDeque.insertFront(3);			// return true
circularDeque.insertFront(4);			// return false, the queue is full
circularDeque.getRear();  			// return 2
circularDeque.isFull();				// return true
circularDeque.deleteLast();			// return true
circularDeque.insertFront(4);			// return true
circularDeque.getFront();			// return 4
Note:
All values will be in the range of [0, 1000].

The number of operations will be in the range of [1, 1000].

Please do not use the built-in Deque library.', false, 'Medium', NULL, 56.5, 
   8.4, 'https://leetcode.com/problems/design-circular-deque', 280, 27.5, 48.6, '["Amazon"]'::jsonb, '["Design,Queue"]'::jsonb, 
   396, 42, 90, true, '[]'::jsonb, true),
  (642, 'Design Search Autocomplete System', 'Design a search autocomplete system for a search engine. Users may input a sentence (at least one word and end with a special character `''#''`). For each character they type except ''#'', you need to return the top 3 historical hot sentences that have prefix the same as the part of sentence already typed. Here are the specific rules:
The hot degree for a sentence is defined as the number of times a user typed the exactly same sentence before.

The returned top 3 hot sentences should be sorted by hot degree (The first is the hottest one). If several sentences have the same degree of hot, you need to use ASCII-code order (smaller one appears first).

If less than 3 hot sentences exist, then just return as many as you can.

When the input is a special character, it means the sentence ends, and in this case, you need to return an empty list.

Your job is to implement the following functions:
The constructor function:
`AutocompleteSystem(String[] sentences, int[] times):` This is the constructor. The input is historical data. `Sentences` is a string array consists of previously typed sentences. `Times` is the corresponding times a sentence has been typed. Your system should record these historical data.

Now, the user wants to input a new sentence. The following function will provide the next character the user types:
`List<String> input(char c):` The input `c` is the next character typed by the user. The character will only be lower-case letters (`''a''` to `''z''`), blank space (`'' ''`) or a special character (`''#''`). Also, the previously typed sentence should be recorded in your system. The output will be the top 3 historical hot sentences that have prefix the same as the part of sentence already typed.


Example:
Operation: AutocompleteSystem(["i love you", "island","ironman", "i love leetcode"], [5,3,2,2])
The system have already tracked down the following sentences and their corresponding times:
`"i love you"` : `5` times
`"island"` : `3` times
`"ironman"` : `2` times
`"i love leetcode"` : `2` times
Now, the user begins another search:
Operation: input(''i'')
Output: ["i love you", "island","i love leetcode"]
Explanation:
There are four sentences that have prefix `"i"`. Among them, "ironman" and "i love leetcode" have same hot degree. Since `'' ''` has ASCII code 32 and `''r''` has ASCII code 114, "i love leetcode" should be in front of "ironman". Also we only need to output top 3 hot sentences, so "ironman" will be ignored.

Operation: input('' '')
Output: ["i love you","i love leetcode"]
Explanation:
There are only two sentences that have prefix `"i "`.

Operation: input(''a'')
Output: []
Explanation:
There are no sentences that have prefix `"i a"`.

Operation: input(''#'')
Output: []
Explanation:
The user finished the input, the sentence `"i a"` should be saved as a historical sentence in system. And the following input will be counted as a new search.

Note:
The input sentence will always start with a letter and end with ''#'', and only one blank space will exist between two words.

The number of complete sentences that to be searched won''t exceed 100. The length of each sentence including those in the historical data won''t exceed 100.

Please use double-quote instead of single-quote when you write test cases even for a character input.

Please remember to RESET your class variables declared in class AutocompleteSystem, as static/class variables are persisted across multiple test cases. Please see here for more details.', true, 'Hard', '/articles/design-search-autocomplete-system', 46.5, 
   64.7, 'https://leetcode.com/problems/design-search-autocomplete-system', 438, 79.7, 171.5, '["Microsoft,Amazon,Lyft,Google"]'::jsonb, '["Design,Trie"]'::jsonb, 
   1268, 91, 93, true, '[]'::jsonb, true),
  (643, 'Maximum Average Subarray I', 'Given an array consisting of `n` integers, find the contiguous subarray of given length `k` that has the maximum average value. And you need to output the maximum average value.


Example 1:
Input: [1,12,-5,-6,50,3], k = 4
Output: 12.75
Explanation: Maximum average is (12-5-6+50)/4 = 51/4 = 12.75
Note:
1 <= `k` <= `n` <= 30,000.

Elements of the given array will be in the range [-10,000, 10,000].', false, 'Easy', '/articles/maximum-average-subarray', 42, 
   4.9, 'https://leetcode.com/problems/maximum-average-subarray-i', 459, 97.8, 232.8, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   953, 134, 88, true, '[]'::jsonb, true),
  (644, 'Maximum Average Subarray II', 'You are given an integer array `nums` consisting of `n` elements, and an integer `k`.

Find a contiguous subarray whose length is greater than or equal to `k` that has the maximum average value and return this value. Any answer with a calculation error less than `10-5` will be accepted.


Example 1:
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation:
- When the length is 4, averages are [0.5, 12.75, 10.5] and the maximum average is 12.75
- When the length is 5, averages are [10.4, 10.8] and the maximum average is 10.8
- When the length is 6, averages are [9.16667] and the maximum average is 9.16667
The maximum average is when we choose a subarray of length 4 (i.e., the sub array [12, -5, -6, 50]) which has the max average 12.75, so we return 12.75
Note that we do not consider the subarrays of length < 4.


Example 2:
Input: nums = [5], k = 1
Output: 5.00000

Constraints:
`n == nums.length`
`1 <= k <= n <= 104`
`-104 <= nums[i] <= 104`', true, 'Hard', '/articles/maximum-average-subarray-ii', 34.2, 
   0, 'https://leetcode.com/problems/maximum-average-subarray-ii', 50, 15.4, 45.2, '["Google"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   480, 52, 90, true, '[]'::jsonb, true),
  (645, 'Set Mismatch', 'You have a set of integers `s`, which originally contains all the numbers from `1` to `n`. Unfortunately, due to some error, one of the numbers in `s` got duplicated to another number in the set, which results in repetition of one number and loss of another number.

You are given an integer array `nums` representing the data status of this set after the error.

Find the number that occurs twice and the number that is missing and return them in the form of an array.


Example 1:
Input: nums = [1,2,2,4]
Output: [2,3]

Example 2:
Input: nums = [1,1]
Output: [1,2]

Constraints:
`2 <= nums.length <= 104`
`1 <= nums[i] <= 104`', false, 'Easy', '/articles/set-mismatch', 41.1, 
   5, 'https://leetcode.com/problems/set-mismatch', 729, 127.3, 309.5, '["Apple,Amazon"]'::jsonb, '["Hash Table,Math"]'::jsonb, 
   1132, 432, 72, true, '[]'::jsonb, true),
  (646, 'Maximum Length of Pair Chain', 'You are given `n` pairs of numbers. In every pair, the first number is always smaller than the second number.

Now, we define a pair `(c, d)` can follow another pair `(a, b)` if and only if `b < c`. Chain of pairs can be formed in this fashion. 
Given a set of pairs, find the length longest chain which can be formed. You needn''t use up all the given pairs. You can select pairs in any order.


Example 1:
Input: [[1,2], [2,3], [3,4]]
Output: 2
Explanation: The longest chain is [1,2] -> [3,4]
Note:
The number of given pairs will be in the range [1, 1000].', false, 'Medium', '/articles/maximum-length-of-pair-chain', 53.1, 
   25.7, 'https://leetcode.com/problems/maximum-length-of-pair-chain', 416, 74.7, 140.6, '["Amazon,Uber"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1313, 87, 94, true, '[]'::jsonb, true),
  (647, 'Palindromic Substrings', 'Given a string, your task is to count how many palindromic substrings in this string.

The substrings with different start indexes or end indexes are counted as different substrings even they consist of same characters.


Example 1:
Input: "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".


Example 2:
Input: "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

Note:
The input string length won''t exceed 1000.', false, 'Medium', '/articles/palindromic-substrings', 62.7, 
   35.8, 'https://leetcode.com/problems/palindromic-substrings', 999, 274.4, 437.5, '["Facebook,Goldman Sachs,Expedia,Google,Twitter,Microsoft,Bloomberg,Docusign"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   4101, 135, 97, true, '[]'::jsonb, true),
  (648, 'Replace Words', 'In English, we have a concept called root, which can be followed by some other word to form another longer word - let''s call this word successor. For example, when the root `"an"` is followed by the successor word `"other"`, we can form a new word `"another"`.

Given a `dictionary` consisting of many roots and a `sentence` consisting of words separated by spaces, replace all the successors in the sentence with the root forming it. If a successor can be replaced by more than one root, replace it with the root that has the shortest length.

Return the `sentence` after the replacement.


Example 1:
Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"

Example 2:
Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
Output: "a a b c"

Example 3:
Input: dictionary = ["a", "aa", "aaa", "aaaa"], sentence = "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"
Output: "a a a a a a a a bbb baba a"

Example 4:
Input: dictionary = ["catt","cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"

Example 5:
Input: dictionary = ["ac","ab"], sentence = "it is abnormal that this solution is accepted"
Output: "it is ab that this solution is ac"

Constraints:
`1 <= dictionary.length <= 1000`
`1 <= dictionary[i].length <= 100`
`dictionary[i]` consists of only lower-case letters.

`1 <= sentence.length <= 10^6`
`sentence` consists of only lower-case letters and spaces.

The number of words in `sentence` is in the range `[1, 1000]`
The length of each word in `sentence` is in the range `[1, 1000]`
Each two consecutive words in `sentence` will be separated by exactly one space.

`sentence` does not have leading or trailing spaces.', false, 'Medium', '/articles/replace-words', 59, 
   4.7, 'https://leetcode.com/problems/replace-words', 607, 69.6, 118.1, '["Uber"]'::jsonb, '["Hash Table,Trie"]'::jsonb, 
   965, 143, 87, false, '[]'::jsonb, true),
  (649, 'Dota2 Senate', 'In the world of Dota2, there are two parties: the `Radiant` and the `Dire`.

The Dota2 senate consists of senators coming from two parties. Now the senate wants to make a decision about a change in the Dota2 game. The voting for this change is a round-based procedure. In each round, each senator can exercise `one` of the two rights:
`Ban one senator''s right`:
	A senator can make another senator lose all his rights in this and all the following rounds.

`Announce the victory`:
	If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and make the decision about the change in the game.

Given a string representing each senator''s party belonging. The character ''R'' and ''D'' represent the `Radiant` party and the `Dire` party respectively. Then if there are `n` senators, the size of the given string will be `n`.

The round-based procedure starts from the first senator to the last senator in the given order. This procedure will last until the end of voting. All the senators who have lost their rights will be skipped during the procedure.

Suppose every senator is smart enough and will play the best strategy for his own party, you need to predict which party will finally announce the victory and make the change in the Dota2 game. The output should be `Radiant` or `Dire`.


Example 1:
Input: "RD"
Output: "Radiant"
Explanation: The first senator comes from Radiant and he can just ban the next senator''s right in the round 1. 
And the second senator can''t exercise any rights any more since his right has been banned. 
And in the round 2, the first senator can just announce the victory since he is the only guy in the senate who can vote.


Example 2:
Input: "RDD"
Output: "Dire"
Explanation: 
The first senator comes from Radiant and he can just ban the next senator''s right in the round 1. 
And the second senator can''t exercise any rights anymore since his right has been banned. 
And the third senator comes from Dire and he can ban the first senator''s right in the round 1. 
And in the round 2, the third senator can just announce the victory since he is the only guy in the senate who can vote.

Note:
The length of the given string will in the range [1, 10,000].', false, 'Medium', '/articles/dota2-senate', 39.4, 
   0, 'https://leetcode.com/problems/dota2-senate', 111, 15, 38.1, '["Valve"]'::jsonb, '["Greedy"]'::jsonb, 
   325, 258, 56, false, '[]'::jsonb, true),
  (650, '2 Keys Keyboard', 'Initially on a notepad only one character ''A'' is present. You can perform two operations on this notepad for each step:
`Copy All`: You can copy all the characters present on the notepad (partial copy is not allowed).

`Paste`: You can paste the characters which are copied last time.

Given a number `n`. You have to get exactly `n` ''A'' on the notepad by performing the minimum number of steps permitted. Output the minimum number of steps to get `n` ''A''.

Example 1:
Input: 3
Output: 3
Explanation:
Intitally, we have one character ''A''.

In step 1, we use Copy All operation.

In step 2, we use Paste operation to get ''AA''.

In step 3, we use Paste operation to get ''AAA''.

Note:
The `n` will be in the range [1, 1000].', false, 'Medium', '/articles/2-keys-keyboard', 50.3, 
   31.9, 'https://leetcode.com/problems/2-keys-keyboard', 623, 74.8, 148.6, '["Amazon,Microsoft"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1723, 121, 93, true, '[]'::jsonb, true),
  (651, '4 Keys Keyboard', 'Imagine you have a special keyboard with the following keys: 
`Key 1: (A)`:  Print one ''A'' on screen.

`Key 2: (Ctrl-A)`: Select the whole screen.

`Key 3: (Ctrl-C)`: Copy selection to buffer.

`Key 4: (Ctrl-V)`: Print buffer on screen appending it after what has already been printed. 
Now, you can only press the keyboard for N times (with the above four keys), find out the maximum numbers of ''A'' you can print on screen.


Example 1:
Input: N = 3
Output: 3
Explanation: 
We can at most get 3 A''s on screen by pressing following key sequence:
A, A, A

Example 2:
Input: N = 7
Output: 9
Explanation: 
We can at most get 9 A''s on screen by pressing following key sequence:
A, A, A, Ctrl A, Ctrl C, Ctrl V, Ctrl V
Note:
1 <= N <= 50 
Answers will be in the range of 32-bit signed integer.', true, 'Medium', '/articles/4-keys-keyboard', 53.2, 
   5, 'https://leetcode.com/problems/4-keys-keyboard', 85, 18.3, 34.5, '["Google,Microsoft"]'::jsonb, '["Math,Dynamic Programming,Greedy"]'::jsonb, 
   431, 65, 87, true, '[]'::jsonb, true),
  (652, 'Find Duplicate Subtrees', 'Given the `root` of a binary tree, return all duplicate subtrees.

For each kind of duplicate subtrees, you only need to return the root node of any one of them.

Two trees are duplicate if they have the same structure with the same node values.


Example 1:
Input: root = [1,2,3,4,null,2,4,null,null,4]
Output: [[2,4],[4]]

Example 2:
Input: root = [2,1,1]
Output: [[1]]

Example 3:
Input: root = [2,2,2,3,null,3,null]
Output: [[2,3],[3]]

Constraints:
The number of the nodes in the tree will be in the range `[1, 10^4]`
`-200 <= Node.val <= 200`', false, 'Medium', '/articles/find-duplicate-subtrees', 52.9, 
   35.3, 'https://leetcode.com/problems/find-duplicate-subtrees', 304, 90, 170, '["Google,Amazon"]'::jsonb, '["Tree"]'::jsonb, 
   1903, 239, 89, true, '[]'::jsonb, true),
  (653, 'Two Sum IV - Input is a BST', 'Given the `root` of a Binary Search Tree and a target number `k`, return `true` if there exist two elements in the BST such that their sum is equal to the given target.


Example 1:
Input: root = [5,3,6,2,4,null,7], k = 9
Output: true

Example 2:
Input: root = [5,3,6,2,4,null,7], k = 28
Output: false

Example 3:
Input: root = [2,1,3], k = 4
Output: true

Example 4:
Input: root = [2,1,3], k = 1
Output: false

Example 5:
Input: root = [2,1,3], k = 3
Output: true

Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-104 <= Node.val <= 104`
`root` is guaranteed to be a valid binary search tree.

`-105 <= k <= 105`', false, 'Easy', '/articles/two-sum-iv', 56.4, 
   1.9, 'https://leetcode.com/problems/two-sum-iv-input-is-a-bst', 775, 187.6, 332.7, '["Microsoft"]'::jsonb, '["Tree"]'::jsonb, 
   1986, 151, 93, false, '[]'::jsonb, true),
  (654, 'Maximum Binary Tree', 'You are given an integer array `nums` with no duplicates. A maximum binary tree can be built recursively from `nums` using the following algorithm:
Create a root node whose value is the maximum value in `nums`.

Recursively build the left subtree on the subarray prefix to the left of the maximum value.

Recursively build the right subtree on the subarray suffix to the right of the maximum value.

Return the maximum binary tree built from `nums`.


Example 1:
Input: nums = [3,2,1,6,0,5]
Output: [6,3,5,null,2,0,null,null,1]
Explanation: The recursive calls are as follow:
- The largest value in [3,2,1,6,0,5] is 6. Left prefix is [3,2,1] and right suffix is [0,5].

    - The largest value in [3,2,1] is 3. Left prefix is [] and right suffix is [2,1].

        - Empty array, so no child.

        - The largest value in [2,1] is 2. Left prefix is [] and right suffix is [1].

            - Empty array, so no child.

            - Only one element, so child is a node with value 1.

    - The largest value in [0,5] is 5. Left prefix is [0] and right suffix is [].

        - Only one element, so child is a node with value 0.

        - Empty array, so no child.


Example 2:
Input: nums = [3,2,1]
Output: [3,null,2,null,1]

Constraints:
`1 <= nums.length <= 1000`
`0 <= nums[i] <= 1000`
All integers in `nums` are unique.', false, 'Medium', '/articles/maximum-binary-tree', 81.3, 
   8.2, 'https://leetcode.com/problems/maximum-binary-tree', 883, 160.9, 197.8, '["Apple"]'::jsonb, '["Tree"]'::jsonb, 
   2426, 271, 90, true, '[]'::jsonb, true),
  (655, 'Print Binary Tree', 'Print a binary tree in an m*n 2D string array following these rules: 
The row number `m` should be equal to the height of the given binary tree.

The column number `n` should always be an odd number.

The root node''s value (in string format) should be put in the exactly middle of the first row it can be put. The column and the row where the root node belongs will separate the rest space into two parts (left-bottom part and right-bottom part). You should print the left subtree in the left-bottom part and print the right subtree in the right-bottom part. The left-bottom part and the right-bottom part should have the same size. Even if one subtree is none while the other is not, you don''t need to print anything for the none subtree but still need to leave the space as large as that for the other subtree. However, if two subtrees are none, then you don''t need to leave space for both of them. 
Each unused space should contain an empty string `""`.

Print the subtrees following the same rules.


Example 1:
Input:
     1
    /
   2
Output:
[["", "1", ""],
 ["2", "", ""]]

Example 2:
Input:
     1
    / \\
   2   3
    \\
     4
Output:
[["", "", "", "1", "", "", ""],
 ["", "2", "", "", "", "3", ""],
 ["", "", "4", "", "", "", ""]]

Example 3:
Input:
      1
     / \\
    2   5
   / 
  3 
 / 
4 
Output:
[["",  "",  "", "",  "", "", "", "1", "",  "",  "",  "",  "", "", ""]
 ["",  "",  "", "2", "", "", "", "",  "",  "",  "",  "5", "", "", ""]
 ["",  "3", "", "",  "", "", "", "",  "",  "",  "",  "",  "", "", ""]
 ["4", "",  "", "",  "", "", "", "",  "",  "",  "",  "",  "", "", ""]]
Note:
The height of binary tree is in the range of [1, 10].', false, 'Medium', '/articles/print-binary-tree', 56.3, 
   24.4, 'https://leetcode.com/problems/print-binary-tree', 320, 38.7, 68.8, '["Uber"]'::jsonb, '["Tree"]'::jsonb, 
   421, 971, 30, false, '[]'::jsonb, true),
  (656, 'Coin Path', 'Given an array `A` (index starts at `1`) consisting of N integers: A1, A2, ..., AN and an integer `B`. The integer `B` denotes that from any place (suppose the index is `i`) in the array `A`, you can jump to any one of the place in the array `A` indexed `i+1`, `i+2`, ..., `i+B` if this place can be jumped to. Also, if you step on the index `i`, you have to pay Ai coins. If Ai is -1, it means you can’t jump to the place indexed `i` in the array.

Now, you start from the place indexed `1` in the array `A`, and your aim is to reach the place indexed `N` using the minimum coins. You need to return the path of indexes (starting from 1 to N) in the array you should take to get to the place indexed `N` using minimum coins.

If there are multiple paths with the same cost, return the lexicographically smallest such path.

If it''s not possible to reach the place indexed N then you need to return an empty array.


Example 1:
Input: [1,2,4,-1,2], 2
Output: [1,3,5]

Example 2:
Input: [1,2,4,-1,2], 1
Output: []
Note:
Path Pa1, Pa2, ..., Pan is lexicographically smaller than Pb1, Pb2, ..., Pbm, if and only if at the first `i` where Pai and Pbi differ, Pai < Pbi; when no such `i` exists, then `n` < `m`.

A1 >= 0. A2, ..., AN (if exist) will in the range of [-1, 100].

Length of A is in the range of [1, 1000].

B is in the range of [1, 100].', true, 'Hard', '/articles/coin-path', 29.7, 
   0, 'https://leetcode.com/problems/coin-path', 56, 10.6, 35.6, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   184, 89, 67, true, '[]'::jsonb, true),
  (657, 'Robot Return to Origin', 'There is a robot starting at position (0, 0), the origin, on a 2D plane. Given a sequence of its moves, judge if this robot ends up at (0, 0) after it completes its moves.

The move sequence is represented by a string, and the character moves[i] represents its ith move. Valid moves are R (right), L (left), U (up), and D (down). If the robot returns to the origin after it finishes all of its moves, return true. Otherwise, return false.

Note: The way that the robot is "facing" is irrelevant. "R" will always make the robot move to the right once, "L" will always make it move left, etc. Also, assume that the magnitude of the robot''s movement is the same for each move.


Example 1:
Input: moves = "UD"
Output: true
Explanation: The robot moves up once, and then down once. All moves have the same magnitude, so it ended up at the origin where it started. Therefore, we return true.


Example 2:
Input: moves = "LL"
Output: false
Explanation: The robot moves left twice. It ends up two "moves" to the left of the origin. We return false because it is not at the origin at the end of its moves.


Example 3:
Input: moves = "RRDD"
Output: false

Example 4:
Input: moves = "LDRRLRUULR"
Output: false

Constraints:
`1 <= moves.length <= 2 * 104`
`moves` only contains the characters `''U''`, `''D''`, `''L''` and `''R''`.', false, 'Easy', '/articles/judge-route-circle', 74, 
   24.5, 'https://leetcode.com/problems/robot-return-to-origin', 999, 279, 376.9, '["Amazon,Goldman Sachs"]'::jsonb, '["String"]'::jsonb, 
   1264, 692, 65, true, '[]'::jsonb, true),
  (658, 'Find K Closest Elements', 'Given a sorted integer array `arr`, two integers `k` and `x`, return the `k` closest integers to `x` in the array. The result should also be sorted in ascending order.

An integer `a` is closer to `x` than an integer `b` if:
`|a - x| < |b - x|`, or
`|a - x| == |b - x|` and `a < b`

Example 1:
Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]

Example 2:
Input: arr = [1,2,3,4,5], k = 4, x = -1
Output: [1,2,3,4]

Constraints:
`1 <= k <= arr.length`
`1 <= arr.length <= 104`
`arr` is sorted in ascending order.

`-104 <= arr[i], x <= 104`', false, 'Medium', '/articles/find-k-closest-elements', 42.2, 
   42.6, 'https://leetcode.com/problems/find-k-closest-elements', 652, 147.5, 349.1, '["Facebook,Microsoft,Google,Paypal"]'::jsonb, '["Binary Search"]'::jsonb, 
   2007, 320, 86, true, '[]'::jsonb, true),
  (659, 'Split Array into Consecutive Subsequences', 'Given an integer array `nums` that is sorted in ascending order, return `true` if and only if you can split it into one or more subsequences such that each subsequence consists of consecutive integers and has a length of at least `3`.


Example 1:
Input: nums = [1,2,3,3,4,5]
Output: true
Explanation:
You can split them into two consecutive subsequences : 
1, 2, 3
3, 4, 5

Example 2:
Input: nums = [1,2,3,3,4,4,5,5]
Output: true
Explanation:
You can split them into two consecutive subsequences : 
1, 2, 3, 4, 5
3, 4, 5

Example 3:
Input: nums = [1,2,3,4,4,5]
Output: false

Constraints:
`1 <= nums.length <= 104`
`-1000 <= nums[i] <= 1000`
`nums` is sorted in an ascending order.', false, 'Medium', '/articles/split-array-into-consecutive-subsequences', 44.5, 
   22.6, 'https://leetcode.com/problems/split-array-into-consecutive-subsequences', 312, 57, 128.1, '["Uber"]'::jsonb, '["Heap,Greedy"]'::jsonb, 
   1557, 478, 77, false, '[]'::jsonb, true),
  (660, 'Remove 9', 'Start from integer 1, remove any integer that contains 9 such as 9, 19, 29...

So now, you will have a new integer sequence: 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, ...

Given a positive integer `n`, you need to return the n-th integer after removing. Note that 1 will be the first integer.


Example 1:
Input: n = 9
Output: 10

Constraints:
`1 <= n <= 8 x 10^8`', true, 'Hard', '/articles/remove-9', 54.3, 
   0, 'https://leetcode.com/problems/remove-9', 48, 7.5, 13.9, '["Houzz"]'::jsonb, '["Math"]'::jsonb, 
   114, 149, 43, false, '[]'::jsonb, true),
  (661, 'Image Smoother', 'Given a 2D integer matrix M representing the gray scale of an image, you need to design a smoother to make the gray scale of each cell becomes the average gray scale (rounding down) of all the 8 surrounding cells and itself.  If a cell has less than 8 surrounding cells, then use as many as you can.


Example 1:
Input:
[[1,1,1],
 [1,0,1],
 [1,1,1]]
Output:
[[0, 0, 0],
 [0, 0, 0],
 [0, 0, 0]]
Explanation:
For the point (0,0), (0,2), (2,0), (2,2): floor(3/4) = floor(0.75) = 0
For the point (0,1), (1,0), (1,2), (2,1): floor(5/6) = floor(0.83333333) = 0
For the point (1,1): floor(8/9) = floor(0.88888889) = 0
Note:
The value in the given matrix is in the range of [0, 255].

The length and width of the given matrix are in the range of [1, 150].', false, 'Easy', '/articles/image-smoother', 52.4, 
   12.9, 'https://leetcode.com/problems/image-smoother', 293, 54.4, 103.8, '["Apple"]'::jsonb, '["Array"]'::jsonb, 
   293, 1250, 19, true, '[]'::jsonb, true),
  (662, 'Maximum Width of Binary Tree', 'Given a binary tree, write a function to get the maximum width of the given tree. The maximum width of a tree is the maximum width among all levels.

The width of one level is defined as the length between the end-nodes (the leftmost and right most non-null nodes in the level, where the `null` nodes between the end-nodes are also counted into the length calculation.

It is guaranteed that the answer will in the range of 32-bit signed integer.


Example 1:
Input: 
           1
         /   \\
        3     2
       / \\     \\  
      5   3     9 
Output: 4
Explanation: The maximum width existing in the third level with the length 4 (5,3,null,9).


Example 2:
Input: 
          1
         /  
        3    
       / \\       
      5   3     
Output: 2
Explanation: The maximum width existing in the third level with the length 2 (5,3).


Example 3:
Input: 
          1
         / \\
        3   2 
       /        
      5      
Output: 2
Explanation: The maximum width existing in the second level with the length 2 (3,2).


Example 4:
Input: 
          1
         / \\
        3   2
       /     \\  
      5       9 
     /         \\
    6           7
Output: 8
Explanation:The maximum width existing in the fourth level with the length 8 (6,null,null,null,null,null,null,7).


Constraints:
The given binary tree will have between `1` and `3000` nodes.', false, 'Medium', '/articles/maximum-width-of-binary-tree', 39.7, 
   22.6, 'https://leetcode.com/problems/maximum-width-of-binary-tree', 734, 109, 274.5, '["Microsoft,Bloomberg"]'::jsonb, '["Tree"]'::jsonb, 
   2134, 380, 85, false, '[]'::jsonb, true),
  (663, 'Equal Tree Partition', 'Given a binary tree with `n` nodes, your task is to check if it''s possible to partition the tree to two trees which have the equal sum of values after removing exactly one edge on the original tree.


Example 1:
Input:     
    5
   / \\
  10 10
    /  \\
   2   3
Output: True
Explanation: 
    5
   / 
  10
      
Sum: 15
   10
  /  \\
 2    3
Sum: 15

Example 2:
Input:     
    1
   / \\
  2  10
    /  \\
   2   20
Output: False
Explanation: You can''t split the tree into two trees with equal sum after removing exactly one edge on the tree.

Note:
The range of tree node value is in the range of [-100000, 100000].

1 <= n <= 10000', true, 'Medium', '/articles/equal-tree-partition', 39.8, 
   0, 'https://leetcode.com/problems/equal-tree-partition', 151, 20.5, 51.6, '["Amazon"]'::jsonb, '["Tree"]'::jsonb, 
   326, 23, 93, true, '[]'::jsonb, true),
  (664, 'Strange Printer', 'There is a strange printer with the following two special requirements:
The printer can only print a sequence of the same character each time.

At each turn, the printer can print new characters starting from and ending at any places, and will cover the original existing characters.

Given a string consists of lower English letters only, your job is to count the minimum number of turns the printer needed in order to print it.


Example 1:
Input: "aaabbb"
Output: 2
Explanation: Print "aaa" first and then print "bbb".


Example 2:
Input: "aba"
Output: 2
Explanation: Print "aaa" first and then print "b" from the second place of the string, which will cover the existing character ''a''.

Hint: Length of the given string will not exceed 100.', false, 'Hard', '/articles/strange-printer', 41.6, 
   22.4, 'https://leetcode.com/problems/strange-printer', 88, 17.8, 42.8, '["NetEase"]'::jsonb, '["Dynamic Programming,Depth-first Search"]'::jsonb, 
   561, 54, 91, false, '[]'::jsonb, true),
  (665, 'Non-decreasing Array', 'Given an array `nums` with `n` integers, your task is to check if it could become non-decreasing by modifying at most one element.

We define an array is non-decreasing if `nums[i] <= nums[i + 1]` holds for every `i` (0-based) such that (`0 <= i <= n - 2`).


Example 1:
Input: nums = [4,2,3]
Output: true
Explanation: You could modify the first `4` to `1` to get a non-decreasing array.


Example 2:
Input: nums = [4,2,1]
Output: false
Explanation: You can''t get a non-decreasing array by modify at most one element.


Constraints:
`n == nums.length`
`1 <= n <= 104`
`-105 <= nums[i] <= 105`', false, 'Medium', '/articles/non-decreasing-array', 19.9, 
   43.9, 'https://leetcode.com/problems/non-decreasing-array', 791, 126, 634.2, '["Microsoft"]'::jsonb, '["Array"]'::jsonb, 
   2572, 603, 81, false, '[]'::jsonb, true),
  (666, 'Path Sum IV', 'If the depth of a tree is smaller than `5`, then this tree can be represented by a list of three-digits integers.

For each integer in this list:
The hundreds digit represents the depth `D` of this node, `1 <= D <= 4.`
The tens digit represents the position `P` of this node in the level it belongs to, `1 <= P <= 8`. The position is the same as that in a full binary tree.

The units digit represents the value `V` of this node, `0 <= V <= 9.`
Given a list of `ascending` three-digits integers representing a binary tree with the depth smaller than 5, you need to return the sum of all paths from the root towards the leaves.

It''s guaranteed that the given list represents a valid connected binary tree.


Example 1:
Input: [113, 215, 221]
Output: 12
Explanation: 
The tree that the list represents is:
    3
   / \\
  5   1
The path sum is (3 + 5) + (3 + 1) = 12.


Example 2:
Input: [113, 221]
Output: 4
Explanation: 
The tree that the list represents is: 
    3
     \\
      1
The path sum is (3 + 1) = 4.', true, 'Medium', '/articles/path-sum-iv', 56.7, 
   5.1, 'https://leetcode.com/problems/path-sum-iv', 174, 15.4, 27.1, '["Facebook"]'::jsonb, '["Tree"]'::jsonb, 
   219, 290, 43, true, '[]'::jsonb, true),
  (667, 'Beautiful Arrangement II', 'Given two integers `n` and `k`, you need to construct a list which contains `n` different positive integers ranging from `1` to `n` and obeys the following requirement: 
Suppose this list is [a1, a2, a3, ... , an], then the list [|a1 - a2|, |a2 - a3|, |a3 - a4|, ... , |an-1 - an|] has exactly `k` distinct integers.

If there are multiple answers, print any of them.


Example 1:
Input: n = 3, k = 1
Output: [1, 2, 3]
Explanation: The [1, 2, 3] has three different positive integers ranging from 1 to 3, and the [1, 1] has exactly 1 distinct integer: 1.


Example 2:
Input: n = 3, k = 2
Output: [1, 3, 2]
Explanation: The [1, 3, 2] has three different positive integers ranging from 1 to 3, and the [2, 1] has exactly 2 distinct integers: 1 and 2.

Note:
The `n` and `k` are in the range 1 <= k < n <= 104.', false, 'Medium', '/articles/beautiful-arrangement-ii', 55.3, 
   0, 'https://leetcode.com/problems/beautiful-arrangement-ii', 171, 27.2, 49.3, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   392, 695, 36, true, '[]'::jsonb, true),
  (668, 'Kth Smallest Number in Multiplication Table', 'Nearly every one have used the Multiplication Table. But could you find out the `k-th` smallest number quickly from the multiplication table?
Given the height `m` and the length `n` of a `m * n` Multiplication Table, and a positive integer `k`, you need to return the `k-th` smallest number in this table.


Example 1:
Input: m = 3, n = 3, k = 5
Output: 
Explanation: 
The Multiplication Table:
1	2	3
2	4	6
3	6	9
The 5-th smallest number is 3 (1, 2, 2, 3, 3).


Example 2:
Input: m = 2, n = 3, k = 6
Output: 
Explanation: 
The Multiplication Table:
1	2	3
2	4	6
The 6-th smallest number is 6 (1, 2, 2, 3, 4, 6).

Note:
The `m` and `n` will be in the range [1, 30000].

The `k` will be in the range [1, m * n]', false, 'Hard', '/articles/kth-smallest-number-in-multiplication-table', 47.9, 
   0, 'https://leetcode.com/problems/kth-smallest-number-in-multiplication-table', 112, 26, 54.2, '["Uber,Google"]'::jsonb, '["Binary Search"]'::jsonb, 
   695, 25, 97, true, '[]'::jsonb, true),
  (669, 'Trim a Binary Search Tree', 'Given the `root` of a binary search tree and the lowest and highest boundaries as `low` and `high`, trim the tree so that all its elements lies in `[low, high]`. Trimming the tree should not change the relative structure of the elements that will remain in the tree (i.e., any node''s descendant should remain a descendant). It can be proven that there is a unique answer.

Return the root of the trimmed binary search tree. Note that the root may change depending on the given bounds.


Example 1:
Input: root = [1,0,2], low = 1, high = 2
Output: [1,null,2]

Example 2:
Input: root = [3,0,4,null,2,null,null,1], low = 1, high = 3
Output: [3,2,null,1]

Example 3:
Input: root = [1], low = 1, high = 2
Output: [1]

Example 4:
Input: root = [1,null,2], low = 1, high = 3
Output: [1,null,2]

Example 5:
Input: root = [1,null,2], low = 2, high = 4
Output: [2]

Constraints:
The number of nodes in the tree in the range `[1, 104]`.

`0 <= Node.val <= 104`
The value of each node in the tree is unique.

`root` is guaranteed to be a valid binary search tree.

`0 <= low <= high <= 104`', false, 'Medium', '/articles/trim-a-binary-search-tree', 64.3, 
   15.4, 'https://leetcode.com/problems/trim-a-binary-search-tree', 665, 155.8, 242, '["Google,Facebook,Apple,Samsung"]'::jsonb, '["Tree,Recursion"]'::jsonb, 
   2748, 208, 93, true, '[]'::jsonb, true),
  (670, 'Maximum Swap', 'Given a non-negative integer, you could swap two digits at most once to get the maximum valued number. Return the maximum valued number you could get.


Example 1:
Input: 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.


Example 2:
Input: 9973
Output: 9973
Explanation: No swap.

Note:
The given number is in the range [0, 108]', false, 'Medium', '/articles/maximum-swap', 45.3, 
   42.5, 'https://leetcode.com/problems/maximum-swap', 690, 95.9, 211.6, '["Facebook"]'::jsonb, '["Array,Math"]'::jsonb, 
   1449, 92, 94, true, '[]'::jsonb, true),
  (671, 'Second Minimum Node In a Binary Tree', 'Given a non-empty special binary tree consisting of nodes with the non-negative value, where each node in this tree has exactly `two` or `zero` sub-node. If the node has two sub-nodes, then this node''s value is the smaller value among its two sub-nodes. More formally, the property `root.val = min(root.left.val, root.right.val)` always holds.

Given such a binary tree, you need to output the second minimum value in the set made of all the nodes'' value in the whole tree.

If no such second minimum value exists, output -1 instead.


Example 1:
Input: root = [2,2,5,null,null,5,7]
Output: 5
Explanation: The smallest value is 2, the second smallest value is 5.


Example 2:
Input: root = [2,2,2]
Output: -1
Explanation: The smallest value is 2, but there isn''t any second smallest value.


Constraints:
The number of nodes in the tree is in the range `[1, 25]`.

`1 <= Node.val <= 231 - 1`
`root.val == min(root.left.val, root.right.val)` for each internal node of the tree.', false, 'Easy', '/articles/second-minimum-node-in-a-binary-tree', 42.8, 
   25, 'https://leetcode.com/problems/second-minimum-node-in-a-binary-tree', 885, 98.7, 230.5, '["LinkedIn,Microsoft,Adobe"]'::jsonb, '["Tree"]'::jsonb, 
   804, 1055, 43, false, '[]'::jsonb, true),
  (672, 'Bulb Switcher II', 'There is a room with `n` lights which are turned on initially and 4 buttons on the wall. After performing exactly `m` unknown operations towards buttons, you need to return how many different kinds of status of the `n` lights could be.

Suppose `n` lights are labeled as number [1, 2, 3 ..., n], function of these 4 buttons are given below:
Flip all the lights.

Flip lights with even numbers.

Flip lights with odd numbers.

Flip lights with (3k + 1) numbers, k = 0, 1, 2, ...


Example 1:
Input: n = 1, m = 1.
Output: 2
Explanation: Status can be: [on], [off]

Example 2:
Input: n = 2, m = 1.
Output: 3
Explanation: Status can be: [on, off], [off, on], [off, off]

Example 3:
Input: n = 3, m = 1.
Output: 4
Explanation: Status can be: [off, on, off], [on, off, on], [off, off, off], [off, on, on].

Note: `n` and `m` both fit in range [0, 1000].', false, 'Medium', '/articles/bulb-switcher-ii', 51.2, 
   0, 'https://leetcode.com/problems/bulb-switcher-ii', 65, 14.3, 28, '["Microsoft"]'::jsonb, '["Math"]'::jsonb, 
   166, 950, 15, false, '[]'::jsonb, true),
  (673, 'Number of Longest Increasing Subsequence', 'Given an integer array `nums`, return the number of longest increasing subsequences.

Notice that the sequence has to be strictly increasing.


Example 1:
Input: nums = [1,3,5,4,7]
Output: 2
Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].


Example 2:
Input: nums = [2,2,2,2,2]
Output: 5
Explanation: The length of longest continuous increasing subsequence is 1, and there are 5 subsequences'' length is 1, so output 5.


Constraints:
`1 <= nums.length <= 2000`
`-106 <= nums[i] <= 106`', false, 'Medium', '/articles/number-of-longest-increasing-subsequence', 38.6, 
   21, 'https://leetcode.com/problems/number-of-longest-increasing-subsequence', 308, 77.1, 199.4, '["Bloomberg,Amazon,Facebook"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   2191, 118, 95, true, '[]'::jsonb, true),
  (674, 'Longest Continuous Increasing Subsequence', 'Given an unsorted array of integers `nums`, return the length of the longest continuous increasing subsequence (i.e. subarray). The subsequence must be strictly increasing.

A continuous increasing subsequence is defined by two indices `l` and `r` (`l < r`) such that it is `[nums[l], nums[l + 1], ..., nums[r - 1], nums[r]]` and for each `l <= i < r`, `nums[i] < nums[i + 1]`.


Example 1:
Input: nums = [1,3,5,4,7]
Output: 3
Explanation: The longest continuous increasing subsequence is [1,3,5] with length 3.

Even though [1,3,5,7] is an increasing subsequence, it is not continuous as elements 5 and 7 are separated by element
4.


Example 2:
Input: nums = [2,2,2,2,2]
Output: 1
Explanation: The longest continuous increasing subsequence is [2] with length 1. Note that it must be strictly
increasing.


Constraints:
`0 <= nums.length <= 104`
`-109 <= nums[i] <= 109`', false, 'Easy', '/articles/longest-continuous-increasing-subsequence', 46, 
   18, 'https://leetcode.com/problems/longest-continuous-increasing-subsequence', 675, 143.5, 311.9, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   1128, 141, 89, true, '[]'::jsonb, true),
  (675, 'Cut Off Trees for Golf Event', 'You are asked to cut off all the trees in a forest for a golf event. The forest is represented as an `m x n` matrix. In this matrix:
`0` means the cell cannot be walked through.

`1` represents an empty cell that can be walked through.

A number greater than `1` represents a tree in a cell that can be walked through, and this number is the tree''s height.

In one step, you can walk in any of the four directions: north, east, south, and west. If you are standing in a cell with a tree, you can choose whether to cut it off.

You must cut off the trees in order from shortest to tallest. When you cut off a tree, the value at its cell becomes `1` (an empty cell).

Starting from the point `(0, 0)`, return the minimum steps you need to walk to cut off all the trees. If you cannot cut off all the trees, return `-1`.

You are guaranteed that no two trees have the same height, and there is at least one tree needs to be cut off.


Example 1:
Input: forest = [[1,2,3],[0,0,4],[7,6,5]]
Output: 6
Explanation: Following the path above allows you to cut off the trees from shortest to tallest in 6 steps.


Example 2:
Input: forest = [[1,2,3],[0,0,0],[7,6,5]]
Output: -1
Explanation: The trees in the bottom row cannot be accessed as the middle row is blocked.


Example 3:
Input: forest = [[2,3,4],[0,0,5],[8,7,6]]
Output: 6

Explanation: You can follow the same path as Example 1 to cut off all the trees.

Note that you can cut off the first tree at (0, 0) before making any steps.


Constraints:
`m == forest.length`
`n == forest[i].length`
`1 <= m, n <= 50`
`0 <= forest[i][j] <= 109`', false, 'Hard', '/articles/cutoff-trees-for-golf-event', 35.4, 
   15.4, 'https://leetcode.com/problems/cut-off-trees-for-golf-event', 223, 42.3, 119.4, '["Amazon,Apple"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   664, 388, 63, true, '[]'::jsonb, true),
  (676, 'Implement Magic Dictionary', 'Design a data structure that is initialized with a list of different words. Provided a string, you should determine if you can change exactly one character in this string to match any word in the data structure.

Implement the `MagicDictionary` class:
`MagicDictionary()` Initializes the object.

`void buildDict(String[] dictionary)` Sets the data structure with an array of distinct strings `dictionary`.

`bool search(String searchWord)` Returns `true` if you can change exactly one character in `searchWord` to match any string in the data structure, otherwise returns `false`.


Example 1:
Input
["MagicDictionary", "buildDict", "search", "search", "search", "search"]
[[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
Output
[null, null, false, true, false, false]
Explanation
MagicDictionary magicDictionary = new MagicDictionary();
magicDictionary.buildDict(["hello", "leetcode"]);
magicDictionary.search("hello"); // return False
magicDictionary.search("hhllo"); // We can change the second ''h'' to ''e'' to match "hello" so we return True
magicDictionary.search("hell"); // return False
magicDictionary.search("leetcoded"); // return False

Constraints:
`1 <= dictionary.length <= 100`
`1 <= dictionary[i].length <= 100`
`dictionary[i]` consists of only lower-case English letters.

All the strings in `dictionary` are distinct.

`1 <= searchWord.length <= 100`
`searchWord` consists of only lower-case English letters.

`buildDict` will be called only once before `search`.

At most `100` calls will be made to `search`.', false, 'Medium', '/articles/implement-magic-dictionary', 55.4, 
   17.7, 'https://leetcode.com/problems/implement-magic-dictionary', 420, 49, 88.5, '["ByteDance"]'::jsonb, '["Hash Table,Trie"]'::jsonb, 
   717, 158, 82, false, '[]'::jsonb, true),
  (677, 'Map Sum Pairs', 'Implement the `MapSum` class:
`MapSum()` Initializes the `MapSum` object.

`void insert(String key, int val)` Inserts the `key-val` pair into the map. If the `key` already existed, the original `key-value` pair will be overridden to the new one.

`int sum(string prefix)` Returns the sum of all the pairs'' value whose `key` starts with the `prefix`.


Example 1:
Input
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
Output
[null, null, 3, null, 5]
Explanation
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);  
mapSum.sum("ap");           // return 3 (apple = 3)
mapSum.insert("app", 2);    
mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)

Constraints:
`1 <= key.length, prefix.length <= 50`
`key` and `prefix` consist of only lowercase English letters.

`1 <= val <= 1000`
At most `50` calls will be made to `insert` and `sum`.', false, 'Medium', '/articles/map-sum-pairs', 54.1, 
   2.4, 'https://leetcode.com/problems/map-sum-pairs', 451, 50.5, 93.3, '["Akuna Capital"]'::jsonb, '["Trie"]'::jsonb, 
   643, 93, 87, false, '[]'::jsonb, true),
  (678, 'Valid Parenthesis String', 'Given a string `s` containing only three types of characters: `''(''`, `'')''` and `''*''`, return `true` if `s` is valid.

The following rules define a valid string:
Any left parenthesis `''(''` must have a corresponding right parenthesis `'')''`.

Any right parenthesis `'')''` must have a corresponding left parenthesis `''(''`.

Left parenthesis `''(''` must go before the corresponding right parenthesis `'')''`.

`''*''` could be treated as a single right parenthesis `'')''` or a single left parenthesis `''(''` or an empty string `""`.


Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "(*)"
Output: true

Example 3:
Input: s = "(*))"
Output: true

Constraints:
`1 <= s.length <= 100`
`s[i]` is `''(''`, `'')''` or `''*''`.', false, 'Medium', '/articles/valid-parenthesis-string', 31.7, 
   39.3, 'https://leetcode.com/problems/valid-parenthesis-string', 665, 131.5, 414.2, '["Salesforce,Facebook,Amazon,Uber,Oracle"]'::jsonb, '["String"]'::jsonb, 
   2319, 65, 97, true, '[]'::jsonb, true),
  (679, '24 Game', 'You have 4 cards each containing a number from 1 to 9.  You need to judge whether they could operated through `*`, `/`, `+`, `-`, `(`, `)` to get the value of 24.


Example 1:
Input: [4, 1, 8, 7]
Output: True
Explanation: (8-4) * (7-1) = 24

Example 2:
Input: [1, 2, 1, 2]
Output: False
Note:
The division operator `/` represents real division, not integer division.  For example, 4 / (1 - 2/3) = 12.

Every operation done is between two numbers.  In particular, we cannot use `-` as a unary operator.  For example, with `[1, 1, 1, 1]` as input, the expression `-1 - 1 - 1 - 1` is not allowed.

You cannot concatenate numbers together.  For example, if the input is `[1, 2, 1, 2]`, we cannot write this as 12 + 12.', false, 'Hard', '/articles/24-game', 47.3, 
   40.7, 'https://leetcode.com/problems/24-game', 254, 49.1, 103.9, '["Amazon"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   902, 180, 83, true, '[]'::jsonb, true),
  (680, 'Valid Palindrome II', 'Given a non-empty string `s`, you may delete at most one character.  Judge whether you can make it a palindrome.


Example 1:
Input: "aba"
Output: True

Example 2:
Input: "abca"
Output: True
Explanation: You could delete the character ''c''.

Note:
The string will only contain lowercase characters a-z.

The maximum length of the string is 50000.', false, 'Easy', '/articles/valid-palindrome-ii', 37.1, 
   69.7, 'https://leetcode.com/problems/valid-palindrome-ii', 995, 253.8, 683.7, '["Facebook,Oracle,Microsoft,eBay,Wish"]'::jsonb, '["String"]'::jsonb, 
   2474, 155, 94, true, '[]'::jsonb, true),
  (681, 'Next Closest Time', 'Given a `time` represented in the format `"HH:MM"`, form the next closest time by reusing the current digits. There is no limit on how many times a digit can be reused.

You may assume the given input string is always valid. For example, `"01:34"`, `"12:09"` are all valid. `"1:34"`, `"12:9"` are all invalid.


Example 1:
Input: time = "19:34"
Output: "19:39"
Explanation: The next closest time choosing from digits 1, 9, 3, 4, is 19:39, which occurs 5 minutes later.

It is not 19:33, because this occurs 23 hours and 59 minutes later.


Example 2:
Input: time = "23:59"
Output: "22:22"
Explanation: The next closest time choosing from digits 2, 3, 5, 9, is 22:22.

It may be assumed that the returned time is next day''s time since it is smaller than the input time numerically.


Constraints:
`time.length == 5`
`time` is a valid time in the form `"HH:MM"`.

`0 <= HH < 24`
`0 <= MM < 60`', true, 'Medium', '/articles/next-closest-time', 46, 
   13.6, 'https://leetcode.com/problems/next-closest-time', 462, 77.3, 168, '["Amazon"]'::jsonb, '["String"]'::jsonb, 
   559, 817, 41, true, '[]'::jsonb, true),
  (682, 'Baseball Game', 'You are keeping score for a baseball game with strange rules. The game consists of several rounds, where the scores of past rounds may affect future rounds'' scores.

At the beginning of the game, you start with an empty record. You are given a list of strings `ops`, where `ops[i]` is the `ith` operation you must apply to the record and is one of the following:
An integer `x` - Record a new score of `x`.

`"+"` - Record a new score that is the sum of the previous two scores. It is guaranteed there will always be two previous scores.

`"D"` - Record a new score that is double the previous score. It is guaranteed there will always be a previous score.

`"C"` - Invalidate the previous score, removing it from the record. It is guaranteed there will always be a previous score.

Return the sum of all the scores on the record.


Example 1:
Input: ops = ["5","2","C","D","+"]
Output: 30
Explanation:
"5" - Add 5 to the record, record is now [5].

"2" - Add 2 to the record, record is now [5, 2].

"C" - Invalidate and remove the previous score, record is now [5].

"D" - Add 2 * 5 = 10 to the record, record is now [5, 10].

"+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].

The total sum is 5 + 10 + 15 = 30.


Example 2:
Input: ops = ["5","-2","4","C","D","9","+","+"]
Output: 27
Explanation:
"5" - Add 5 to the record, record is now [5].

"-2" - Add -2 to the record, record is now [5, -2].

"4" - Add 4 to the record, record is now [5, -2, 4].

"C" - Invalidate and remove the previous score, record is now [5, -2].

"D" - Add 2 * -2 = -4 to the record, record is now [5, -2, -4].

"9" - Add 9 to the record, record is now [5, -2, -4, 9].

"+" - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5].

"+" - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14].

The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.


Example 3:
Input: ops = ["1"]
Output: 1

Constraints:
`1 <= ops.length <= 1000`
`ops[i]` is `"C"`, `"D"`, `"+"`, or a string representing an integer in the range `[-3 * 104, 3 * 104]`.

For operation `"+"`, there will always be at least two previous scores on the record.

For operations `"C"` and `"D"`, there will always be at least one previous score on the record.', false, 'Easy', '/articles/baseball-game', 67.4, 
   10.1, 'https://leetcode.com/problems/baseball-game', 744, 112.7, 167.3, '["Amazon"]'::jsonb, '["Stack"]'::jsonb, 
   705, 1216, 37, true, '[]'::jsonb, true),
  (683, 'K Empty Slots', 'You have `n` bulbs in a row numbered from `1` to `n`. Initially, all the bulbs are turned off. We turn on exactly one bulb every day until all bulbs are on after `n` days.

You are given an array `bulbs` of length `n` where `bulbs[i] = x` means that on the `(i+1)th` day, we will turn on the bulb at position `x` where `i` is 0-indexed and `x` is 1-indexed.

Given an integer `k`, return the minimum day number such that there exists two turned on bulbs that have exactly `k` bulbs between them that are all turned off. If there isn''t such day, return `-1`.


Example 1:
Input: bulbs = [1,3,2], k = 1
Output: 2
Explanation:
On the first day: bulbs[0] = 1, first bulb is turned on: [1,0,0]
On the second day: bulbs[1] = 3, third bulb is turned on: [1,0,1]
On the third day: bulbs[2] = 2, second bulb is turned on: [1,1,1]
We return 2 because on the second day, there were two on bulbs with one off bulb between them.


Example 2:
Input: bulbs = [1,2,3], k = 1
Output: -1

Constraints:
`n == bulbs.length`
`1 <= n <= 2 * 104`
`1 <= bulbs[i] <= n`
`bulbs` is a permutation of numbers from `1` to `n`.

`0 <= k <= 2 * 104`', true, 'Hard', '/articles/k-empty-slots', 36.1, 
   0, 'https://leetcode.com/problems/k-empty-slots', 249, 50.6, 140.1, '["Google"]'::jsonb, '["Ordered Map"]'::jsonb, 
   651, 613, 52, true, '[]'::jsonb, true),
  (684, 'Redundant Connection', 'In this problem, a tree is an undirected graph that is connected and has no cycles.

The given input is a graph that started as a tree with N nodes (with distinct values 1, 2, ..., N), with one additional edge added.  The added edge has two different vertices chosen from 1 to N, and was not an edge that already existed.

The resulting graph is given as a 2D-array of `edges`.  Each element of `edges` is a pair `[u, v]` with `u < v`, that represents an undirected edge connecting nodes `u` and `v`.

Return an edge that can be removed so that the resulting graph is a tree of N nodes.  If there are multiple answers, return the answer that occurs last in the given 2D-array.  The answer edge `[u, v]` should be in the same format, with `u < v`.


Example 1:
Input: [[1,2], [1,3], [2,3]]
Output: [2,3]
Explanation: The given undirected graph will be like this:
  1
 / \\
2 - 3

Example 2:
Input: [[1,2], [2,3], [3,4], [1,4], [1,5]]
Output: [1,4]
Explanation: The given undirected graph will be like this:
5 - 1 - 2
    |   |
    4 - 3
Note:
The size of the input 2D-array will be between 3 and 1000.

Every integer represented in the 2D-array will be between 1 and N, where N is the size of the input array.

Update (2017-09-26):
We have overhauled the problem description + test cases and specified clearly the graph is an undirected graph. For the directed graph follow up please see Redundant Connection II). We apologize for any inconvenience caused.', false, 'Medium', '/articles/redundant-connection', 59.2, 
   20.9, 'https://leetcode.com/problems/redundant-connection', 696, 125.7, 212.5, '["Amazon"]'::jsonb, '["Tree,Union Find,Graph"]'::jsonb, 
   1994, 246, 89, true, '[]'::jsonb, true),
  (685, 'Redundant Connection II', 'In this problem, a rooted tree is a directed graph such that, there is exactly one node (the root) for which all other nodes are descendants of this node, plus every node has exactly one parent, except for the root node which has no parents.

The given input is a directed graph that started as a rooted tree with `n` nodes (with distinct values from `1` to `n`), with one additional directed edge added. The added edge has two different vertices chosen from `1` to `n`, and was not an edge that already existed.

The resulting graph is given as a 2D-array of `edges`. Each element of `edges` is a pair `[ui, vi]` that represents a directed edge connecting nodes `ui` and `vi`, where `ui` is a parent of child `vi`.

Return an edge that can be removed so that the resulting graph is a rooted tree of `n` nodes. If there are multiple answers, return the answer that occurs last in the given 2D-array.


Example 1:
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]

Example 2:
Input: edges = [[1,2],[2,3],[3,4],[4,1],[1,5]]
Output: [4,1]

Constraints:
`n == edges.length`
`3 <= n <= 1000`
`edges[i].length == 2`
`1 <= ui, vi <= n`', false, 'Hard', '/articles/redundant-connection-ii', 33.2, 
   7, 'https://leetcode.com/problems/redundant-connection-ii', 233, 42, 126.8, '["Amazon"]'::jsonb, '["Tree,Depth-first Search,Union Find,Graph"]'::jsonb, 
   1061, 243, 81, true, '[]'::jsonb, true),
  (686, 'Repeated String Match', 'Given two strings `a` and `b`, return the minimum number of times you should repeat string `a` so that string `b` is a substring of it. If it is impossible for `b`​​​​​​ to be a substring of `a` after repeating it, return `-1`.

Notice: string `"abc"` repeated 0 times is `""`,  repeated 1 time is `"abc"` and repeated 2 times is `"abcabc"`.


Example 1:
Input: a = "abcd", b = "cdabcdab"
Output: 3
Explanation: We return 3 because by repeating a three times "abcdabcdabcd", b is a substring of it.


Example 2:
Input: a = "a", b = "aa"
Output: 2

Example 3:
Input: a = "a", b = "a"
Output: 1

Example 4:
Input: a = "abc", b = "wxyz"
Output: -1

Constraints:
`1 <= a.length <= 104`
`1 <= b.length <= 104`
`a` and `b` consist of lower-case English letters.', false, 'Medium', '/articles/repeated-string-match', 32.9, 
   19.3, 'https://leetcode.com/problems/repeated-string-match', 430, 105.3, 320.4, '["Google,Facebook,Amazon"]'::jsonb, '["String"]'::jsonb, 
   1007, 838, 55, true, '[]'::jsonb, true),
  (687, 'Longest Univalue Path', 'Given the `root` of a binary tree, return the length of the longest path, where each node in the path has the same value. This path may or may not pass through the root.

The length of the path between two nodes is represented by the number of edges between them.


Example 1:
Input: root = [5,4,5,1,1,5]
Output: 2

Example 2:
Input: root = [1,4,5,4,4,5]
Output: 2

Constraints:
The number of nodes in the tree is in the range `[0, 104]`.

`-1000 <= Node.val <= 1000`
The depth of the tree will not exceed `1000`.', false, 'Medium', '/articles/longest-univalue-path', 37.5, 
   14.3, 'https://leetcode.com/problems/longest-univalue-path', 433, 112.7, 300, '["Bloomberg"]'::jsonb, '["Tree,Recursion"]'::jsonb, 
   2239, 555, 80, false, '[]'::jsonb, true),
  (688, 'Knight Probability in Chessboard', 'On an `N`x`N` chessboard, a knight starts at the `r`-th row and `c`-th column and attempts to make exactly `K` moves. The rows and columns are 0 indexed, so the top-left square is `(0, 0)`, and the bottom-right square is `(N-1, N-1)`.

A chess knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.

Each time the knight is to move, it chooses one of eight possible moves uniformly at random (even if the piece would go off the chessboard) and moves there.

The knight continues moving until it has made exactly `K` moves or has moved off the chessboard. Return the probability that the knight remains on the board after it has stopped moving.


Example:
Input: 3, 2, 0, 0
Output: 0.0625
Explanation: There are two moves (to (1,2), (2,1)) that will keep the knight on the board.

From each of those positions, there are also two moves that will keep the knight on the board.

The total probability the knight stays on the board is 0.0625.

Note:
`N` will be between 1 and 25.

`K` will be between 0 and 100.

The knight always initially starts on the board.', false, 'Medium', '/articles/knight-probability-in-chessboard', 50.3, 
   28.1, 'https://leetcode.com/problems/knight-probability-in-chessboard', 432, 58.5, 116.4, '["Goldman Sachs,Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1240, 231, 84, true, '[]'::jsonb, true),
  (689, 'Maximum Sum of 3 Non-Overlapping Subarrays', 'In a given array `nums` of positive integers, find three non-overlapping subarrays with maximum sum.

Each subarray will be of size `k`, and we want to maximize the sum of all `3*k` entries.

Return the result as a list of indices representing the starting position of each interval (0-indexed). If there are multiple answers, return the lexicographically smallest one.


Example:
Input: [1,2,1,2,6,7,5,1], 2
Output: [0, 3, 5]
Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].

We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.

Note:
`nums.length` will be between 1 and 20000.

`nums[i]` will be between 1 and 65535.

`k` will be between 1 and floor(nums.length / 3).', false, 'Hard', '/articles/maximum-sum-of-3-non-overlapping-intervals', 47.3, 
   32.3, 'https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays', 251, 53.2, 112.4, '["Facebook"]'::jsonb, '["Array,Dynamic Programming"]'::jsonb, 
   1214, 81, 94, true, '[]'::jsonb, true),
  (690, 'Employee Importance', 'You are given a data structure of employee information, which includes the employee''s unique id, their importance value and their direct subordinates'' id.

For example, employee 1 is the leader of employee 2, and employee 2 is the leader of employee 3. They have importance value 15, 10 and 5, respectively. Then employee 1 has a data structure like [1, 15, [2]], and employee 2 has [2, 10, [3]], and employee 3 has [3, 5, []]. Note that although employee 3 is also a subordinate of employee 1, the relationship is not direct.

Now given the employee information of a company, and an employee id, you need to return the total importance value of this employee and all their subordinates.


Example 1:
Input: [[1, 5, [2, 3]], [2, 3, []], [3, 3, []]], 1
Output: 11
Explanation:
Employee 1 has importance value 5, and he has two direct subordinates: employee 2 and employee 3. They both have importance value 3. So the total importance value of employee 1 is 5 + 3 + 3 = 11.

Note:
One employee has at most one direct leader and may have several subordinates.

The maximum number of employees won''t exceed 2000.', false, 'Easy', '/articles/employee-importance', 59, 
   30.2, 'https://leetcode.com/problems/employee-importance', 664, 110.3, 187.1, '["Google,Microsoft"]'::jsonb, '["Hash Table,Depth-first Search,Breadth-first Search"]'::jsonb, 
   961, 880, 52, true, '[]'::jsonb, true),
  (691, 'Stickers to Spell Word', 'We are given N different types of stickers.  Each sticker has a lowercase English word on it.

You would like to spell out the given `target` string by cutting individual letters from your collection of stickers and rearranging them.

You can use each sticker more than once if you want, and you have infinite quantities of each sticker.

What is the minimum number of stickers that you need to spell out the `target`?  If the task is impossible, return -1.


Example 1:
Input:["with", "example", "science"], "thehat"
Output:3
Explanation:We can use 2 "with" stickers, and 1 "example" sticker.

After cutting and rearrange the letters of those stickers, we can form the target "thehat".

Also, this is the minimum number of stickers necessary to form the target string.


Example 2:
Input:["notice", "possible"], "basicbasic"
Output:-1
Explanation:We can''t form the target "basicbasic" from cutting letters from the given stickers.

Note:
`stickers` has length in the range `[1, 50]`.

`stickers` consists of lowercase English words (without apostrophes).

`target` has length in the range `[1, 15]`, and consists of lowercase English letters.

In all test cases, all words were chosen randomly from the 1000 most common US English words, and the target was chosen as a concatenation of two random words.

The time limit may be more challenging than usual.  It is expected that a 50 sticker test case can be solved within 35ms on average.', false, 'Hard', '/articles/stickers-to-spell-word', 45.1, 
   11, 'https://leetcode.com/problems/stickers-to-spell-word', 97, 20, 44.3, '["Facebook"]'::jsonb, '["Dynamic Programming,Backtracking"]'::jsonb, 
   499, 46, 92, true, '[]'::jsonb, true),
  (692, 'Top K Frequent Words', 'Given a non-empty list of words, return the k most frequent elements.

Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.


Example 1:
Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
Output: ["i", "love"]
Explanation: "i" and "love" are the two most frequent words.

    Note that "i" comes before "love" due to a lower alphabetical order.


Example 2:
Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
Output: ["the", "is", "sunny", "day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
    with the number of occurrence being 4, 3, 2 and 1 respectively.

Note:
You may assume k is always valid, 1 ≤ k ≤ number of unique elements.

Input words contain only lowercase letters.
Follow up:
Try to solve it in O(n log k) time and O(n) extra space.', false, 'Medium', '/articles/top-k-frequent-words', 53.3, 
   66.3, 'https://leetcode.com/problems/top-k-frequent-words', 999, 269.4, 505.9, '["Amazon,Bloomberg,Google,Facebook,Apple,Oracle,Microsoft"]'::jsonb, '["Hash Table,Heap,Trie"]'::jsonb, 
   2884, 189, 94, true, '[]'::jsonb, true),
  (693, 'Binary Number with Alternating Bits', 'Given a positive integer, check whether it has alternating bits: namely, if two adjacent bits will always have different values.


Example 1:
Input: n = 5
Output: true
Explanation: The binary representation of 5 is: 101

Example 2:
Input: n = 7
Output: false
Explanation: The binary representation of 7 is: 111.


Example 3:
Input: n = 11
Output: false
Explanation: The binary representation of 11 is: 1011.


Example 4:
Input: n = 10
Output: true
Explanation: The binary representation of 10 is: 1010.


Example 5:
Input: n = 3
Output: false

Constraints:
`1 <= n <= 231 - 1`', false, 'Easy', '/articles/binary-number-with-alternating-bits', 60, 
   0, 'https://leetcode.com/problems/binary-number-with-alternating-bits', 708, 73.7, 122.8, '["Yahoo"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   606, 94, 87, false, '[]'::jsonb, true),
  (694, 'Number of Distinct Islands', 'Given a non-empty 2D array `grid` of 0''s and 1''s, an island is a group of `1`''s (representing land) connected 4-directionally (horizontal or vertical.)  You may assume all four edges of the grid are surrounded by water.

Count the number of distinct islands.  An island is considered to be the same as another if and only if one island can be translated (and not rotated or reflected) to equal the other.


Example 1:
11000
11000
00011
00011
Given the above grid map, return `1`.


Example 2:
11011
10000
00001
11011
Given the above grid map, return `3`.

Notice that:
11
1
and
 1
11
are considered different island shapes, because we do not consider reflection / rotation.

Note:
The length of each dimension in the given `grid` does not exceed 50.', true, 'Medium', '/articles/number-of-distinct-islands', 58.1, 
   45.8, 'https://leetcode.com/problems/number-of-distinct-islands', 383, 89.3, 153.9, '["Amazon,Bloomberg,Facebook,Microsoft"]'::jsonb, '["Hash Table,Depth-first Search,Breadth-first Search"]'::jsonb, 
   1277, 76, 94, true, '[]'::jsonb, true),
  (695, 'Max Area of Island', 'Given a non-empty 2D array `grid` of 0''s and 1''s, an island is a group of `1`''s (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

Find the maximum area of an island in the given 2D array. (If there is no island, the maximum area is 0.)

Example 1:
[[0,0,1,0,0,0,0,1,0,0,0,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,1,1,0,1,0,0,0,0,0,0,0,0],
 [0,1,0,0,1,1,0,0,1,0,1,0,0],
 [0,1,0,0,1,1,0,0,1,1,1,0,0],
 [0,0,0,0,0,0,0,0,0,0,1,0,0],
 [0,0,0,0,0,0,0,1,1,1,0,0,0],
 [0,0,0,0,0,0,0,1,1,0,0,0,0]]
Given the above grid, return `6`. Note the answer is not 11, because the island must be connected 4-directionally.


Example 2:
[[0,0,0,0,0,0,0,0]]
Given the above grid, return `0`.

Note: The length of each dimension in the given `grid` does not exceed 50.', false, 'Medium', '/articles/max-area-of-island', 65.1, 
   77.6, 'https://leetcode.com/problems/max-area-of-island', 999, 228.3, 350.5, '["Google,DoorDash,Amazon,Facebook,Microsoft,Oracle,Bloomberg,eBay"]'::jsonb, '["Array,Depth-first Search"]'::jsonb, 
   2935, 102, 97, true, '[]'::jsonb, true),
  (696, 'Count Binary Substrings', 'Give a string `s`, count the number of non-empty (contiguous) substrings that have the same number of 0''s and 1''s, and all the 0''s and all the 1''s in these substrings are grouped consecutively. 
Substrings that occur multiple times are counted the number of times they occur.


Example 1:
Input: "00110011"
Output: 6
Explanation: There are 6 substrings that have equal number of consecutive 1''s and 0''s: "0011", "01", "1100", "10", "0011", and "01".

Notice that some of these substrings repeat and are counted the number of times they occur.

Also, "00110011" is not a valid substring because all the 0''s (and 1''s) are not grouped together.


Example 2:
Input: "10101"
Output: 4
Explanation: There are 4 substrings: "10", "01", "10", "01" that have equal number of consecutive 1''s and 0''s.

Note:
`s.length` will be between 1 and 50,000.

`s` will only consist of "0" or "1" characters.', false, 'Easy', '/articles/count-binary-substrings', 58.3, 
   55.9, 'https://leetcode.com/problems/count-binary-substrings', 334, 59.5, 102, '["JPMorgan,SAP"]'::jsonb, '["String"]'::jsonb, 
   1315, 212, 86, false, '[]'::jsonb, true),
  (697, 'Degree of an Array', 'Given a non-empty array of non-negative integers `nums`, the degree of this array is defined as the maximum frequency of any one of its elements.

Your task is to find the smallest possible length of a (contiguous) subarray of `nums`, that has the same degree as `nums`.


Example 1:
Input: nums = [1,2,2,3,1]
Output: 2
Explanation: 
The input array has a degree of 2 because both elements 1 and 2 appear twice.

Of the subarrays that have the same degree:
[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
The shortest length is 2. So return 2.


Example 2:
Input: nums = [1,2,2,3,1,4,2]
Output: 6
Explanation: 
The degree is 3 because the element 2 is repeated 3 times.

So [2,2,3,1,4,2] is the shortest subarray, therefore returning 6.


Constraints:
`nums.length` will be between 1 and 50,000.

`nums[i]` will be an integer between 0 and 49,999.', false, 'Easy', '/articles/degree-of-an-array', 54.5, 
   29, 'https://leetcode.com/problems/degree-of-an-array', 661, 106.4, 195.3, '["Bloomberg,Twitter"]'::jsonb, '["Array"]'::jsonb, 
   1269, 929, 58, false, '[]'::jsonb, true),
  (698, 'Partition to K Equal Sum Subsets', 'Given an array of integers `nums` and a positive integer `k`, find whether it''s possible to divide this array into `k` non-empty subsets whose sums are all equal.


Example 1:
Input: nums = [4, 3, 2, 3, 5, 2, 1], k = 4
Output: True
Explanation: It''s possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.

Note:
`1 <= k <= len(nums) <= 16`.

`0 < nums[i] < 10000`.', false, 'Medium', '/articles/partition-to-k-equal-sum-subsets', 45.8, 
   45.3, 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets', 376, 122.4, 267.1, '["LinkedIn,Amazon,Google,Facebook,Adobe"]'::jsonb, '["Dynamic Programming,Recursion"]'::jsonb, 
   2784, 179, 94, true, '[]'::jsonb, true),
  (699, 'Falling Squares', 'On an infinite number line (x-axis), we drop given squares in the order they are given.

The `i`-th square dropped (`positions[i] = (left, side_length)`) is a square with the left-most point being `positions[i][0]` and sidelength `positions[i][1]`.

The square is dropped with the bottom edge parallel to the number line, and from a higher height than all currently landed squares. We wait for each square to stick before dropping the next.

The squares are infinitely sticky on their bottom edge, and will remain fixed to any positive length surface they touch (either the number line or another square). Squares dropped adjacent to each other will not stick together prematurely.

Return a list `ans` of heights. Each height `ans[i]` represents the current highest height of any square we have dropped, after dropping squares represented by `positions[0], positions[1], ..., positions[i]`.


Example 1:
Input: [[1, 2], [2, 3], [6, 1]]
Output: [2, 5, 5]
Explanation:
After the first drop of `positions[0] = [1, 2]: _aa _aa ------- `The maximum height of any square is 2.

After the second drop of `positions[1] = [2, 3]: __aaa __aaa __aaa _aa__ _aa__ -------------- `The maximum height of any square is 5. The larger square stays on top of the smaller square despite where its center of gravity is, because squares are infinitely sticky on their bottom edge.

After the third drop of `positions[1] = [6, 1]: __aaa __aaa __aaa _aa _aa___a -------------- `The maximum height of any square is still 5. Thus, we return an answer of `[2, 5, 5]`.


Example 2:
Input: [[100, 100], [200, 100]]
Output: [100, 100]
Explanation: Adjacent squares don''t get stuck prematurely - only their bottom edge can stick to surfaces.

Note:
`1 <= positions.length <= 1000`.

`1 <= positions[i][0] <= 10^8`.

`1 <= positions[i][1] <= 10^6`.', false, 'Hard', '/articles/falling-squares', 43.2, 
   2.1, 'https://leetcode.com/problems/falling-squares', 103, 16, 37, '["Amazon,Uber,Square"]'::jsonb, '["Segment Tree,Ordered Map"]'::jsonb, 
   330, 65, 84, true, '[]'::jsonb, true),
  (700, 'Search in a Binary Search Tree', 'You are given the `root` of a binary search tree (BST) and an integer `val`.

Find the node in the BST that the node''s value equals `val` and return the subtree rooted with that node. If such a node does not exist, return `null`.


Example 1:
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]

Example 2:
Input: root = [4,2,7,1,3], val = 5
Output: []

Constraints:
The number of nodes in the tree is in the range `[1, 5000]`.

`1 <= Node.val <= 107`
`root` is a binary search tree.

`1 <= val <= 107`', false, 'Easy', '/articles/search-in-a-bst', 73.4, 
   6.2, 'https://leetcode.com/problems/search-in-a-binary-search-tree', 999, 267.5, 364.3, '["Apple,Uber"]'::jsonb, '["Tree"]'::jsonb, 
   1360, 131, 91, true, '[]'::jsonb, true),
  (701, 'Insert into a Binary Search Tree', 'You are given the `root` node of a binary search tree (BST) and a `value` to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.


Example 1:
Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
Explanation: Another accepted tree is:

Example 2:
Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]

Example 3:
Input: root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
Output: [4,2,7,1,3,5]

Constraints:
The number of nodes in the tree will be in the range `[0, 104]`.

`-108 <= Node.val <= 108`
All the values `Node.val` are unique.

`-108 <= val <= 108`
It''s guaranteed that `val` does not exist in the original BST.', false, 'Medium', '/articles/insert-into-a-bst', 75.4, 
   11.8, 'https://leetcode.com/problems/insert-into-a-binary-search-tree', 999, 175.1, 232.4, '["Amazon,Microsoft,Google"]'::jsonb, '["Tree"]'::jsonb, 
   1487, 96, 94, true, '[]'::jsonb, true),
  (702, 'Search in a Sorted Array of Unknown Size', 'Given an integer array sorted in ascending order, write a function to search `target` in `nums`.  If `target` exists, then return its index, otherwise return `-1`. However, the array size is unknown to you. You may only access the array using an `ArrayReader` interface, where `ArrayReader.get(k)` returns the element of the array at index `k` (0-indexed).

You may assume all integers in the array are less than `10000`, and if you access the array out of bounds, `ArrayReader.get` will return `2147483647`.


Example 1:
Input: `array` = [-1,0,3,5,9,12], `target` = 9
Output: 4
Explanation: 9 exists in `nums` and its index is 4

Example 2:
Input: `array` = [-1,0,3,5,9,12], `target` = 2
Output: -1
Explanation: 2 does not exist in `nums` so return -1

Constraints:
You may assume that all elements in the array are unique.

The value of each element in the array will be in the range `[-9999, 9999]`.

The length of the array will be in the range `[1, 10^4]`.', true, 'Medium', '/articles/search-in-a-sorted-array-of-unknown-size', 69, 
   19.2, 'https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size', 281, 45, 65.2, '["Microsoft,Morgan Stanley"]'::jsonb, '["Binary Search"]'::jsonb, 
   490, 31, 94, false, '[]'::jsonb, true),
  (703, 'Kth Largest Element in a Stream', 'Design a class to find the `kth` largest element in a stream. Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.

Implement `KthLargest` class:
`KthLargest(int k, int[] nums)` Initializes the object with the integer `k` and the stream of integers `nums`.

`int add(int val)` Returns the element representing the `kth` largest element in the stream.


Example 1:
Input
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output
[null, 4, 5, 5, 8, 8]
Explanation
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8

Constraints:
`1 <= k <= 104`
`0 <= nums.length <= 104`
`-104 <= nums[i] <= 104`
`-104 <= val <= 104`
At most `104` calls will be made to `add`.

It is guaranteed that there will be at least `k` elements in the array when you search for the `kth` element.', false, 'Easy', NULL, 50.9, 
   33.4, 'https://leetcode.com/problems/kth-largest-element-in-a-stream', 506, 127.9, 251.3, '["Amazon,Microsoft,Box,Facebook"]'::jsonb, '["Heap,Design"]'::jsonb, 
   1178, 717, 62, true, '[]'::jsonb, true),
  (704, 'Binary Search', 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.


Example 1:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1

Constraints:
`1 <= nums.length <= 104`
`-9999 <= nums[i], target <= 9999`
All the integers in `nums` are unique.

`nums` is sorted in an ascending order.', false, 'Easy', '/articles/binary-search', 54.3, 
   27.2, 'https://leetcode.com/problems/binary-search', 717, 251, 462, '["Microsoft,Facebook,Amazon"]'::jsonb, '["Binary Search"]'::jsonb, 
   1269, 60, 95, true, '[]'::jsonb, true),
  (705, 'Design HashSet', 'Design a HashSet without using any built-in hash table libraries.

Implement `MyHashSet` class:
`void add(key)` Inserts the value `key` into the HashSet.

`bool contains(key)` Returns whether the value `key` exists in the HashSet or not.

`void remove(key)` Removes the value `key` in the HashSet. If `key` does not exist in the HashSet, do nothing.


Example 1:
Input
["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]
[[], [1], [2], [1], [3], [2], [2], [2], [2]]
Output
[null, null, null, true, false, null, true, null, false]
Explanation
MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // return True
myHashSet.contains(3); // return False, (not found)
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // return True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // return False, (already removed)

Constraints:
`0 <= key <= 106`
At most `104` calls will be made to `add`, `remove`, and `contains`.

Follow up: Could you solve the problem without using the built-in HashSet library?', false, 'Easy', '/articles/design-hashset', 64.5, 
   12.2, 'https://leetcode.com/problems/design-hashset', 568, 119.5, 185.2, '["Google,Adobe"]'::jsonb, '["Hash Table,Design"]'::jsonb, 
   699, 107, 87, true, '[]'::jsonb, true),
  (706, 'Design HashMap', 'Design a HashMap without using any built-in hash table libraries.

Implement the `MyHashMap` class:
`MyHashMap()` initializes the object with an empty map.

`void put(int key, int value)` inserts a `(key, value)` pair into the HashMap. If the `key` already exists in the map, update the corresponding `value`.

`int get(int key)` returns the `value` to which the specified `key` is mapped, or `-1` if this map contains no mapping for the `key`.

`void remove(key)` removes the `key` and its corresponding `value` if the map contains the mapping for the `key`.


Example 1:
Input
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output
[null, null, null, 1, -1, null, 1, null, -1]
Explanation
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]

Constraints:
`0 <= key, value <= 106`
At most `104` calls will be made to `put`, `get`, and `remove`.

Follow up: Please do not use the built-in HashMap library.', false, 'Easy', '/articles/design-hashmap', 64.1, 
   61.6, 'https://leetcode.com/problems/design-hashmap', 733, 175.5, 273.7, '["Goldman Sachs,Amazon,Microsoft,Apple,LinkedIn,Oracle,Google,ServiceNow,Uber,VMware,ByteDance,eBay"]'::jsonb, '["Hash Table,Design"]'::jsonb, 
   1520, 162, 90, true, '[]'::jsonb, true),
  (707, 'Design Linked List', 'Design your implementation of the linked list. You can choose to use a singly or doubly linked list.

A node in a singly linked list should have two attributes: `val` and `next`. `val` is the value of the current node, and `next` is a pointer/reference to the next node.

If you want to use the doubly linked list, you will need one more attribute `prev` to indicate the previous node in the linked list. Assume all nodes in the linked list are 0-indexed.

Implement the `MyLinkedList` class:
`MyLinkedList()` Initializes the `MyLinkedList` object.

`int get(int index)` Get the value of the `indexth` node in the linked list. If the index is invalid, return `-1`.

`void addAtHead(int val)` Add a node of value `val` before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.

`void addAtTail(int val)` Append a node of value `val` as the last element of the linked list.

`void addAtIndex(int index, int val)` Add a node of value `val` before the `indexth` node in the linked list. If `index` equals the length of the linked list, the node will be appended to the end of the linked list. If `index` is greater than the length, the node will not be inserted.

`void deleteAtIndex(int index)` Delete the `indexth` node in the linked list, if the index is valid.


Example 1:
Input
["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
[[], [1], [3], [1, 2], [1], [1], [1]]
Output
[null, null, null, null, 2, null, 3]
Explanation
MyLinkedList myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(1);
myLinkedList.addAtTail(3);
myLinkedList.addAtIndex(1, 2);    // linked list becomes 1->2->3
myLinkedList.get(1);              // return 2
myLinkedList.deleteAtIndex(1);    // now the linked list is 1->3
myLinkedList.get(1);              // return 3

Constraints:
`0 <= index, val <= 1000`
Please do not use the built-in LinkedList library.

At most `2000` calls will be made to `get`, `addAtHead`, `addAtTail`, `addAtIndex` and `deleteAtIndex`.', false, 'Medium', '/articles/design-linked-list', 26, 
   23.3, 'https://leetcode.com/problems/design-linked-list', 609, 106.9, 410.6, '["Microsoft,Amazon"]'::jsonb, '["Linked List,Design"]'::jsonb, 
   821, 863, 49, true, '[]'::jsonb, true),
  (708, 'Insert into a Sorted Circular Linked List', 'Given a node from a Circular Linked List which is sorted in ascending order, write a function to insert a value `insertVal` into the list such that it remains a sorted circular list. The given node can be a reference to any single node in the list, and may not be necessarily the smallest value in the circular list.

If there are multiple suitable places for insertion, you may choose any place to insert the new value. After the insertion, the circular list should remain sorted.

If the list is empty (i.e., given node is `null`), you should create a new single circular list and return the reference to that single node. Otherwise, you should return the original given node.


Example 1:
Input: head = [3,4,1], insertVal = 2
Output: [3,4,1,2]
Explanation: In the figure above, there is a sorted circular list of three elements. You are given a reference to the node with value 3, and we need to insert 2 into the list. The new node should be inserted between node 1 and node 3. After the insertion, the list should look like this, and we should still return node 3.


Example 2:
Input: head = [], insertVal = 1
Output: [1]
Explanation: The list is empty (given head is `null`). We create a new single circular list and return the reference to that single node.


Example 3:
Input: head = [1], insertVal = 0
Output: [1,0]

Constraints:
`0 <= Number of Nodes <= 5 * 10^4`
`-10^6 <= Node.val <= 10^6`
`-10^6 <= insertVal <= 10^6`', true, 'Medium', '/articles/insert-into-a-cyclic-sorted-list', 32.7, 
   25.9, 'https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list', 425, 61, 186.7, '["Facebook,Amazon,Microsoft"]'::jsonb, '["Linked List"]'::jsonb, 
   513, 418, 55, true, '[]'::jsonb, true),
  (709, 'To Lower Case', 'Implement function ToLowerCase() that has a string parameter str, and returns the same string in lowercase.


Example 1:
Input: "Hello"
Output: "hello"

Example 2:
Input: "here"
Output: "here"

Example 3:
Input: "LOVELY"
Output: "lovely"', false, 'Easy', '/articles/to-lower-case', 80.2, 
   5.8, 'https://leetcode.com/problems/to-lower-case', 999, 261.1, 325.4, '["Google,Adobe,Apple"]'::jsonb, '["String"]'::jsonb, 
   661, 1852, 26, true, '[]'::jsonb, true),
  (710, 'Random Pick with Blacklist', 'Given a blacklist `B` containing unique integers from `[0, N)`, write a function to return a uniform random integer from `[0, N)` which is NOT in `B`.

Optimize it such that it minimizes the call to system’s `Math.random()`.

Note:
`1 <= N <= 1000000000`
`0 <= B.length < min(100000, N)`
`[0, N)` does NOT include N. See interval notation.


Example 1:
Input: 
["Solution","pick","pick","pick"]
[[1,[]],[],[],[]]
Output: [null,0,0,0]

Example 2:
Input: 
["Solution","pick","pick","pick"]
[[2,[]],[],[],[]]
Output: [null,1,1,1]

Example 3:
Input: 
["Solution","pick","pick","pick"]
[[3,[1]],[],[],[]]
Output: [null,0,0,2]

Example 4:
Input: 
["Solution","pick","pick","pick"]
[[4,[2]],[],[],[]]
Output: [null,1,3,1]
Explanation of Input Syntax:
The input is two lists: the subroutines called and their arguments. `Solution`''s constructor has two arguments, `N` and the blacklist `B`. `pick` has no arguments. Arguments are always wrapped with a list, even if there aren''t any.', false, 'Hard', '/articles/random-pick-with-blacklist', 33.1, 
   20.7, 'https://leetcode.com/problems/random-pick-with-blacklist', 123, 18.1, 54.6, '["Two Sigma"]'::jsonb, '["Hash Table,Binary Search,Sort,Random"]'::jsonb, 
   420, 75, 85, false, '[]'::jsonb, true),
  (711, 'Number of Distinct Islands II', 'Given a non-empty 2D array `grid` of 0''s and 1''s, an island is a group of `1`''s (representing land) connected 4-directionally (horizontal or vertical.)  You may assume all four edges of the grid are surrounded by water.

Count the number of distinct islands.  An island is considered to be the same as another if they have the same shape, or have the same shape after rotation (90, 180, or 270 degrees only) or reflection (left/right direction or up/down direction).


Example 1:
11000
10000
00001
00011
Given the above grid map, return `1`.

Notice that:
11
1
and
 1
11
are considered same island shapes. Because if we make a 180 degrees clockwise rotation on the first island, then two islands will have the same shapes.


Example 2:
11100
10001
01001
01110
Given the above grid map, return `2`.

Here are the two distinct islands:
111
1
and
1
1
Notice that:
111
1
and
1
111
are considered same island shapes. Because if we flip the first array in the up/down direction, then they have the same shapes.

Note:
The length of each dimension in the given `grid` does not exceed 50.', true, 'Hard', '/articles/number-of-distinct-islands-ii', 49.6, 
   0, 'https://leetcode.com/problems/number-of-distinct-islands-ii', 48, 6.9, 14, '["Amazon"]'::jsonb, '["Hash Table,Depth-first Search"]'::jsonb, 
   177, 192, 48, true, '[]'::jsonb, true),
  (712, 'Minimum ASCII Delete Sum for Two Strings', 'Given two strings `s1, s2`, find the lowest ASCII sum of deleted characters to make two strings equal.


Example 1:
Input: s1 = "sea", s2 = "eat"
Output: 231
Explanation: Deleting "s" from "sea" adds the ASCII value of "s" (115) to the sum.

Deleting "t" from "eat" adds 116 to the sum.

At the end, both strings are equal, and 115 + 116 = 231 is the minimum sum possible to achieve this.


Example 2:
Input: s1 = "delete", s2 = "leet"
Output: 403
Explanation: Deleting "dee" from "delete" to turn the string into "let",
adds 100[d]+101[e]+101[e] to the sum.  Deleting "e" from "leet" adds 101[e] to the sum.

At the end, both strings are equal to "let", and the answer is 100+101+101+101 = 403.

If instead we turned both strings into "lee" or "eet", we would get answers of 433 or 417, which are higher.

Note:
`0 < s1.length, s2.length <= 1000`.

All elements of each string will have an ASCII value in `[97, 122]`.', false, 'Medium', '/articles/minimum-ascii-delete-sum-for-two-strings', 59.6, 
   8.7, 'https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings', 326, 45.2, 75.8, '["TripleByte"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1287, 55, 96, false, '[]'::jsonb, true),
  (713, 'Subarray Product Less Than K', 'Your are given an array of positive integers `nums`.

Count and print the number of (contiguous) subarrays where the product of all the elements in the subarray is less than `k`.


Example 1:
Input: nums = [10, 5, 2, 6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are: [10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6].

Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.

Note:
`0 < nums.length <= 50000`.

`0 < nums[i] < 1000`.

`0 <= k < 10^6`.', false, 'Medium', '/articles/subarray-product-less-than-k', 40.6, 
   22.2, 'https://leetcode.com/problems/subarray-product-less-than-k', 372, 100.2, 247, '["Bloomberg,LinkedIn"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   2251, 85, 96, false, '[]'::jsonb, true),
  (714, 'Best Time to Buy and Sell Stock with Transaction Fee', 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day, and an integer `fee` representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


Example 1:
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by:
- Buying at prices[0] = 1
- Selling at prices[3] = 8
- Buying at prices[4] = 4
- Selling at prices[5] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.


Example 2:
Input: prices = [1,3,7,5,10,3], fee = 3
Output: 6

Constraints:
`1 <= prices.length <= 5 * 104`
`1 <= prices[i] < 5 * 104`
`0 <= fee < 5 * 104`', false, 'Medium', '/articles/best-time-to-buy-and-sell-stock-with-transaction-fee', 58, 
   3.3, 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee', 385, 106.8, 184.1, '["Amazon"]'::jsonb, '["Array,Dynamic Programming,Greedy"]'::jsonb, 
   2465, 73, 97, true, '[]'::jsonb, true),
  (715, 'Range Module', 'A Range Module is a module that tracks ranges of numbers. Your task is to design and implement the following interfaces in an efficient manner.

`addRange(int left, int right)` Adds the half-open interval `[left, right)`, tracking every real number in that interval.  Adding an interval that partially overlaps with currently tracked numbers should add any numbers in the interval `[left, right)` that are not already tracked.

`queryRange(int left, int right)` Returns true if and only if every real number in the interval `[left, right)`
 is currently being tracked.

`removeRange(int left, int right)` Stops tracking every real number currently being tracked in the interval `[left, right)`.


Example 1:
addRange(10, 20): null
removeRange(14, 16): null
queryRange(10, 14): true (Every number in [10, 14) is being tracked)
queryRange(13, 15): false (Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
queryRange(16, 17): true (The number 16 in [16, 17) is still being tracked, despite the remove operation)
Note:
A half open interval `[left, right)` denotes all real numbers `left <= x < right`.

`0 < left < right < 10^9` in all calls to `addRange, queryRange, removeRange`.

The total number of calls to `addRange` in a single test case is at most `1000`.

The total number of calls to `queryRange` in a single test case is at most `5000`.

The total number of calls to `removeRange` in a single test case is at most `1000`.', false, 'Hard', '/articles/range-module', 40.7, 
   46, 'https://leetcode.com/problems/range-module', 124, 27.3, 67.2, '["Google,Amazon"]'::jsonb, '["Segment Tree,Ordered Map"]'::jsonb, 
   627, 51, 92, true, '[]'::jsonb, true),
  (716, 'Max Stack', 'Design a max stack data structure that supports the stack operations and supports finding the stack''s maximum element.

Implement the `MaxStack` class:
`MaxStack()` Initializes the stack object.

`void push(int x)` Pushes element `x` onto the stack.

`int pop()` Removes the element on top of the stack and returns it.

`int top()` Gets the element on the top of the stack without removing it.

`int peekMax()` Retrieves the maximum element in the stack without removing it.

`int popMax()` Retrieves the maximum element in the stack and removes it. If there is more than one maximum element, only remove the top-most one.


Example 1:
Input
["MaxStack", "push", "push", "push", "top", "popMax", "top", "peekMax", "pop", "top"]
[[], [5], [1], [5], [], [], [], [], [], []]
Output
[null, null, null, null, 5, 5, 1, 5, 1, 5]
Explanation
MaxStack stk = new MaxStack();
stk.push(5);   // [5] the top of the stack and the maximum number is 5.

stk.push(1);   // [5, 1] the top of the stack is 1, but the maximum is 5.

stk.push(5);   // [5, 1, 5] the top of the stack is 5, which is also the maximum, because it is the top most one.

stk.top();     // return 5, [5, 1, 5] the stack did not change.

stk.popMax();  // return 5, [5, 1] the stack is changed now, and the top is different from the max.

stk.top();     // return 1, [5, 1] the stack did not change.

stk.peekMax(); // return 5, [5, 1] the stack did not change.

stk.pop();     // return 1, [5] the top of the stack and the max element is now 5.

stk.top();     // return 5, [5] the stack did not change.


Constraints:
`-107 <= x <= 107`
At most `104` calls will be made to `push`, `pop`, `top`, `peekMax`, and `popMax`.

There will be at least one element in the stack when `pop`, `top`, `peekMax`, or `popMax` is called.

Follow up: Could you come up with a solution that supports `O(1)` for each `top` call and `O(logn)` for each other call?', true, 'Easy', '/articles/max-stack', 43.1, 
   54.8, 'https://leetcode.com/problems/max-stack', 331, 72.8, 168.6, '["Lyft,LinkedIn,Amazon,Microsoft,Facebook,Pure Storage,Twitter"]'::jsonb, '["Design"]'::jsonb, 
   942, 229, 80, true, '[]'::jsonb, true),
  (717, '1-bit and 2-bit Characters', 'We have two special characters. The first character can be represented by one bit `0`. The second character can be represented by two bits (`10` or `11`).  
Now given a string represented by several bits. Return whether the last character must be a one-bit character or not. The given string will always end with a zero.


Example 1:
Input: 
bits = [1, 0, 0]
Output: True
Explanation: 
The only way to decode it is two-bit character and one-bit character. So the last character is one-bit character.


Example 2:
Input: 
bits = [1, 1, 1, 0]
Output: False
Explanation: 
The only way to decode it is two-bit character and two-bit character. So the last character is NOT one-bit character.

Note:
`1 <= len(bits) <= 1000`.

`bits[i]` is always `0` or `1`.', false, 'Easy', '/articles/1-bit-and-2-bit-characters', 46.9, 
   8.3, 'https://leetcode.com/problems/1-bit-and-2-bit-characters', 607, 85.2, 181.6, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   554, 1413, 28, true, '[]'::jsonb, true),
  (718, 'Maximum Length of Repeated Subarray', 'Given two integer arrays `A` and `B`, return the maximum length of an subarray that appears in both arrays.


Example 1:
Input:
A: [1,2,3,2,1]
B: [3,2,1,4,7]
Output: 3
Explanation: 
The repeated subarray with maximum length is [3, 2, 1].

Note:
1 <= len(A), len(B) <= 1000
0 <= A[i], B[i] < 100', false, 'Medium', '/articles/maximum-length-of-repeated-subarray', 50.5, 
   56.1, 'https://leetcode.com/problems/maximum-length-of-repeated-subarray', 438, 89.1, 176.6, '["Karat,Indeed,Intuit,Apple,Google,Amazon"]'::jsonb, '["Array,Hash Table,Binary Search,Dynamic Programming"]'::jsonb, 
   1939, 53, 97, true, '[]'::jsonb, true),
  (719, 'Find K-th Smallest Pair Distance', 'Given an integer array, return the k-th smallest distance among all the pairs. The distance of a pair (A, B) is defined as the absolute difference between A and B. 

Example 1:
Input:
nums = [1,3,1]
k = 1
Output: 0 
Explanation:
Here are all the pairs:
(1,3) -> 2
(1,1) -> 0
(3,1) -> 2
Then the 1st smallest distance pair is (1,1), and its distance is 0.

Note:
`2 <= len(nums) <= 10000`.

`0 <= nums[i] < 1000000`.

`1 <= k <= len(nums) * (len(nums) - 1) / 2`.', false, 'Hard', '/articles/find-k-th-smallest-pair-distance', 32.6, 
   14.7, 'https://leetcode.com/problems/find-k-th-smallest-pair-distance', 147, 42.6, 130.4, '["Google,Amazon"]'::jsonb, '["Array,Binary Search,Heap"]'::jsonb, 
   1304, 49, 96, true, '[]'::jsonb, true),
  (720, 'Longest Word in Dictionary', 'Given an array of strings `words` representing an English Dictionary, return the longest word in `words` that can be built one character at a time by other words in `words`.

If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.


Example 1:
Input: words = ["w","wo","wor","worl","world"]
Output: "world"
Explanation: The word "world" can be built one character at a time by "w", "wo", "wor", and "worl".


Example 2:
Input: words = ["a","banana","app","appl","ap","apply","apple"]
Output: "apple"
Explanation: Both "apply" and "apple" can be built from other words in the dictionary. However, "apple" is lexicographically smaller than "apply".


Constraints:
`1 <= words.length <= 1000`
`1 <= words[i].length <= 30`
`words[i]` consists of lowercase English letters.', false, 'Easy', '/articles/longest-word-in-dictionary', 49.4, 
   21.4, 'https://leetcode.com/problems/longest-word-in-dictionary', 538, 82, 165.8, '["Goldman Sachs,Facebook"]'::jsonb, '["Hash Table,Trie"]'::jsonb, 
   862, 1034, 45, true, '[]'::jsonb, true),
  (721, 'Accounts Merge', 'Given a list of `accounts` where each element `accounts[i]` is a list of strings, where the first element `accounts[i][0]` is a name, and the rest of the elements are emails representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.


Example 1:
Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
Explanation:
The first and third John''s are the same person as they have the common email "johnsmith@mail.com".

The second John and Mary are different people as none of their email addresses are used by other accounts.

We could return these lists in any order, for example the answer [[''Mary'', ''mary@mail.com''], [''John'', ''johnnybravo@mail.com''], 
[''John'', ''john00@mail.com'', ''john_newyork@mail.com'', ''johnsmith@mail.com'']] would still be accepted.


Example 2:
Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]

Constraints:
`1 <= accounts.length <= 1000`
`2 <= accounts[i].length <= 10`
`1 <= accounts[i][j] <= 30`
`accounts[i][0]` consists of English letters.

`accounts[i][j] (for j > 0)` is a valid email.', false, 'Medium', '/articles/accounts-merge', 52.2, 
   64.6, 'https://leetcode.com/problems/accounts-merge', 517, 135.5, 259.2, '["Facebook,Google,Amazon,Microsoft,Twitter,LinkedIn"]'::jsonb, '["Depth-first Search,Union Find"]'::jsonb, 
   2301, 416, 85, true, '[]'::jsonb, true),
  (722, 'Remove Comments', 'Given a C++ program, remove comments from it. The program `source` is an array where `source[i]` is the `i`-th line of the source code.  This represents the result of splitting the original source code string by the newline character `\\n`.

In C++, there are two types of comments, line comments, and block comments.

The string `//` denotes a line comment, which represents that it and rest of the characters to the right of it in the same line should be ignored.

The string `/*` denotes a block comment, which represents that all characters until the next (non-overlapping) occurrence of `*/` should be ignored.  (Here, occurrences happen in reading order: line by line from left to right.)  To be clear, the string `/*/` does not yet end the block comment, as the ending would be overlapping the beginning.

The first effective comment takes precedence over others: if the string `//` occurs in a block comment, it is ignored. Similarly, if the string `/*` occurs in a line or block comment, it is also ignored.

If a certain line of code is empty after removing comments, you must not output that line: each string in the answer list will be non-empty.

There will be no control characters, single quote, or double quote characters.  For example, `source = "string s = "/* Not a comment. */";"` will not be a test case.  (Also, nothing else such as defines or macros will interfere with the comments.)
It is guaranteed that every open block comment will eventually be closed, so `/*` outside of a line or block comment always starts a new comment.

Finally, implicit newline characters can be deleted by block comments.  Please see the examples below for details.

After removing the comments from the source code, return the source code in the same format.


Example 1:
Input: 
source = ["/*Test program */", "int main()", "{ ", "  // variable declaration ", "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ", "   testing */", "a = b + c;", "}"]
The line by line code is visualized as below:
/*Test program */
int main()
{ 
  // variable declaration 
int a, b, c;
/* This is a test
   multiline  
   comment for 
   testing */
a = b + c;
}
Output: ["int main()","{ ","  ","int a, b, c;","a = b + c;","}"]
The line by line code is visualized as below:
int main()
{ 
  
int a, b, c;
a = b + c;
}
Explanation: 
The string `/*` denotes a block comment, including line 1 and lines 6-9. The string `//` denotes line 4 as comments.


Example 2:
Input: 
source = ["a/*comment", "line", "more_comment*/b"]
Output: ["ab"]
Explanation: The original source string is "a/*comment\\nline\\nmore_comment*/b", where we have bolded the newline characters.  After deletion, the implicit newline characters are deleted, leaving the string "ab", which when delimited by newline characters becomes ["ab"].

Note:
The length of `source` is in the range `[1, 100]`.

The length of `source[i]` is in the range `[0, 80]`.

Every open block comment is eventually closed.

There are no single-quote, double-quote, or control characters in the source code.', false, 'Medium', '/articles/remove-comments', 36.4, 
   30.3, 'https://leetcode.com/problems/remove-comments', 239, 42.1, 115.4, '["Microsoft,Google,Databricks"]'::jsonb, '["String"]'::jsonb, 
   456, 1188, 28, true, '[]'::jsonb, true),
  (723, 'Candy Crush', 'This question is about implementing a basic elimination algorithm for Candy Crush.

Given a 2D integer array `board` representing the grid of candy, different positive integers `board[i][j]` represent different types of candies. A value of `board[i][j] = 0` represents that the cell at position `(i, j)` is empty. The given board represents the state of the game following the player''s move. Now, you need to restore the board to a stable state by crushing candies according to the following rules:
If three or more candies of the same type are adjacent vertically or horizontally, "crush" them all at the same time - these positions become empty.

After crushing all candies simultaneously, if an empty space on the board has candies on top of itself, then these candies will drop until they hit a candy or bottom at the same time. (No new candies will drop outside the top boundary.)
After the above steps, there may exist more candies that can be crushed. If so, you need to repeat the above steps.

If there does not exist more candies that can be crushed (ie. the board is stable), then return the current board.

You need to perform the above rules until the board becomes stable, then return the current board.


Example:
Input:
board = 
[[110,5,112,113,114],[210,211,5,213,214],[310,311,3,313,314],[410,411,412,5,414],[5,1,512,3,3],[610,4,1,613,614],[710,1,2,713,714],[810,1,2,1,1],[1,1,2,2,2],[4,1,4,4,1014]]
Output:
[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[110,0,0,0,114],[210,0,0,0,214],[310,0,0,113,314],[410,0,0,213,414],[610,211,112,313,614],[710,311,412,613,714],[810,411,512,713,1014]]
Explanation: 
Note:
The length of `board` will be in the range [3, 50].

The length of `board[i]` will be in the range [3, 50].

Each `board[i][j]` will initially start as an integer in the range [1, 2000].', true, 'Medium', '/articles/candy-crush', 73.1, 
   55.4, 'https://leetcode.com/problems/candy-crush', 155, 35.1, 48, '["Bloomberg"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   562, 232, 71, false, '[]'::jsonb, true),
  (724, 'Find Pivot Index', 'Given an array of integers `nums`, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index''s right.

If the index is on the left edge of the array, then the left sum is `0` because there are no elements to the left. This also applies to the right edge of the array.

Return the leftmost pivot index. If no such index exists, return -1.


Example 1:
Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.

Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11

Example 2:
Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.


Example 3:
Input: nums = [2,1,-1]
Output: 0
Explanation:
The pivot index is 0.

Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0

Constraints:
`1 <= nums.length <= 104`
`-1000 <= nums[i] <= 1000`', false, 'Easy', '/articles/find-pivot-index', 46, 
   39.3, 'https://leetcode.com/problems/find-pivot-index', 773, 190.5, 413.7, '["Facebook,Goldman Sachs,Twitter,Apple"]'::jsonb, '["Array"]'::jsonb, 
   1672, 315, 84, true, '[]'::jsonb, true),
  (725, 'Split Linked List in Parts', 'Given a (singly) linked list with head node `root`, write a function to split the linked list into `k` consecutive linked list "parts".

The length of each part should be as equal as possible: no two parts should have a size differing by more than 1.  This may lead to some parts being null.

The parts should be in order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal parts occurring later.

Return a List of ListNode''s representing the linked list parts that are formed.


Examples
1->2->3->4, k = 5 // 5 equal parts
[ [1], 
[2],
[3],
[4],
null ]

Example 1:
Input: 
root = [1, 2, 3], k = 5
Output: [[1],[2],[3],[],[]]
Explanation:
The input and each element of the output are ListNodes, not arrays.

For example, the input root has root.val = 1, root.next.val = 2, \\root.next.next.val = 3, and root.next.next.next = null.

The first element output[0] has output[0].val = 1, output[0].next = null.

The last element output[4] is null, but it''s string representation as a ListNode is [].


Example 2:
Input: 
root = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k = 3
Output: [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]]
Explanation:
The input has been split into consecutive parts with size difference at most 1, and earlier parts are a larger size than the later parts.

Note:
The length of `root` will be in the range `[0, 1000]`.

Each value of a node in the input will be an integer in the range `[0, 999]`.

`k` will be an integer in the range `[1, 50]`.', false, 'Medium', '/articles/split-linked-list-in-parts', 53.1, 
   8.2, 'https://leetcode.com/problems/split-linked-list-in-parts', 507, 59.3, 111.6, '["Amazon,Adobe"]'::jsonb, '["Linked List"]'::jsonb, 
   931, 150, 86, true, '[]'::jsonb, true),
  (726, 'Number of Atoms', 'Given a chemical `formula` (given as a string), return the count of each atom.

The atomic element always starts with an uppercase character, then zero or more lowercase letters, representing the name.

One or more digits representing that element''s count may follow if the count is greater than 1. If the count is 1, no digits will follow. For example, H2O and H2O2 are possible, but H1O2 is impossible.

Two formulas concatenated together to produce another formula. For example, H2O2He3Mg4 is also a formula.

A formula placed in parentheses, and a count (optionally added) is also a formula. For example, (H2O2) and (H2O2)3 are formulas.

Given a `formula`, return the count of all elements as a string in the following form: the first name (in sorted order), followed by its count (if that count is more than 1), followed by the second name (in sorted order), followed by its count (if that count is more than 1), and so on.


Example 1:
Input: formula = "H2O"
Output: "H2O"
Explanation: The count of elements are {''H'': 2, ''O'': 1}.


Example 2:
Input: formula = "Mg(OH)2"
Output: "H2MgO2"
Explanation: The count of elements are {''H'': 2, ''Mg'': 1, ''O'': 2}.


Example 3:
Input: formula = "K4(ON(SO3)2)2"
Output: "K4N2O14S4"
Explanation: The count of elements are {''K'': 4, ''N'': 2, ''O'': 14, ''S'': 4}.


Example 4:
Input: formula = "Be32"
Output: "Be32"

Constraints:
`1 <= formula.length <= 1000`
`formula` consists of English letters, digits, `''(''`, and `'')''`.

`formula` is always valid.', false, 'Hard', '/articles/number-of-atoms', 51, 
   60.4, 'https://leetcode.com/problems/number-of-atoms', 302, 32.2, 63.2, '["ByteDance,Amazon,Pinterest,Microsoft"]'::jsonb, '["Hash Table,Stack,Recursion"]'::jsonb, 
   622, 161, 79, true, '[]'::jsonb, true),
  (727, 'Minimum Window Subsequence', 'Given strings `S` and `T`, find the minimum (contiguous) substring `W` of `S`, so that `T` is a subsequence of `W`.

If there is no such window in `S` that covers all characters in `T`, return the empty string `""`. If there are multiple such minimum-length windows, return the one with the left-most starting index.


Example 1:
Input: 
S = "abcdebdde", T = "bde"
Output: "bcde"
Explanation: 
"bcde" is the answer because it occurs before "bdde" which has the same length.

"deb" is not a smaller window because the elements of T in the window must occur in order.

Note:
All the strings in the input will only contain lowercase letters.

The length of `S` will be in the range `[1, 20000]`.

The length of `T` will be in the range `[1, 100]`.', true, 'Hard', '/articles/minimum-window-subsequence', 42.4, 
   39, 'https://leetcode.com/problems/minimum-window-subsequence', 268, 56.9, 134, '["Google,Amazon,Facebook"]'::jsonb, '["Dynamic Programming,Sliding Window"]'::jsonb, 
   915, 55, 94, true, '[]'::jsonb, true),
  (728, 'Self Dividing Numbers', 'A self-dividing number is a number that is divisible by every digit it contains.

For example, 128 is a self-dividing number because `128 % 1 == 0`, `128 % 2 == 0`, and `128 % 8 == 0`.

Also, a self-dividing number is not allowed to contain the digit zero.

Given a lower and upper number bound, output a list of every possible self dividing number, including the bounds if possible.


Example 1:
Input: 
left = 1, right = 22
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
Note:
The boundaries of each input argument are `1 <= left <= right <= 10000`.', false, 'Easy', '/articles/self-dividing-numbers', 75.6, 
   8, 'https://leetcode.com/problems/self-dividing-numbers', 999, 150.1, 198.4, '["Adobe"]'::jsonb, '["Math"]'::jsonb, 
   841, 314, 73, false, '[]'::jsonb, true),
  (729, 'My Calendar I', 'Implement a `MyCalendar` class to store your events. A new event can be added if adding the event will not cause a double booking.

Your class will have the method, `book(int start, int end)`. Formally, this represents a booking on the half open interval `[start, end)`, the range of real numbers `x` such that `start <= x < end`.

A double booking happens when two events have some non-empty intersection (ie., there is some time that is common to both events.)
For each call to the method `MyCalendar.book`, return `true` if the event can be added to the calendar successfully without causing a double booking. Otherwise, return `false` and do not add the event to the calendar.

Your class will be called like this: `MyCalendar cal = new MyCalendar();` `MyCalendar.book(start, end)`

Example 1:
MyCalendar();
MyCalendar.book(10, 20); // returns true
MyCalendar.book(15, 25); // returns false
MyCalendar.book(20, 30); // returns true
Explanation: 
The first event can be booked.  The second can''t because time 15 is already booked by another event.

The third event can be booked, as the first event takes every time less than 20, but not including 20.

Note:
The number of calls to `MyCalendar.book` per test case will be at most `1000`.

In calls to `MyCalendar.book(start, end)`, `start` and `end` are integers in the range `[0, 10^9]`.', false, 'Medium', '/articles/my-calendar-i', 53.6, 
   48.5, 'https://leetcode.com/problems/my-calendar-i', 385, 86.1, 160.7, '["Google,Intuit,Amazon"]'::jsonb, '["Array"]'::jsonb, 
   1037, 45, 96, true, '[]'::jsonb, true),
  (730, 'Count Different Palindromic Subsequences', 'Given a string S, find the number of different non-empty palindromic subsequences in S, and return that number modulo `10^9 + 7`.

A subsequence of a string S is obtained by deleting 0 or more characters from S.

A sequence is palindromic if it is equal to the sequence reversed.

Two sequences `A_1, A_2, ...` and `B_1, B_2, ...` are different if there is some `i` for which `A_i != B_i`.


Example 1:
Input: 
S = ''bccb''
Output: 6
Explanation: 
The 6 different non-empty palindromic subsequences are ''b'', ''c'', ''bb'', ''cc'', ''bcb'', ''bccb''.

Note that ''bcb'' is counted only once, even though it occurs twice.


Example 2:
Input: 
S = ''abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba''
Output: 104860361
Explanation: 
There are 3104860382 different non-empty palindromic subsequences, which is 104860361 modulo 10^9 + 7.

Note:
The length of `S` will be in the range `[1, 1000]`.

Each character `S[i]` will be in the set `{''a'', ''b'', ''c'', ''d''}`.', false, 'Hard', '/articles/count-different-palindromic-subsequences', 43.4, 
   18.5, 'https://leetcode.com/problems/count-different-palindromic-subsequences', 82, 19.4, 44.6, '["LinkedIn,Google,Facebook"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   762, 50, 94, true, '[]'::jsonb, true),
  (731, 'My Calendar II', 'Implement a `MyCalendarTwo` class to store your events. A new event can be added if adding the event will not cause a triple booking.

Your class will have one method, `book(int start, int end)`. Formally, this represents a booking on the half open interval `[start, end)`, the range of real numbers `x` such that `start <= x < end`.

A triple booking happens when three events have some non-empty intersection (ie., there is some time that is common to all 3 events.)
For each call to the method `MyCalendar.book`, return `true` if the event can be added to the calendar successfully without causing a triple booking. Otherwise, return `false` and do not add the event to the calendar.

Your class will be called like this: `MyCalendar cal = new MyCalendar();` `MyCalendar.book(start, end)`

Example 1:
MyCalendar();
MyCalendar.book(10, 20); // returns true
MyCalendar.book(50, 60); // returns true
MyCalendar.book(10, 40); // returns true
MyCalendar.book(5, 15); // returns false
MyCalendar.book(5, 10); // returns true
MyCalendar.book(25, 55); // returns true
Explanation: 
The first two events can be booked.  The third event can be double booked.

The fourth event (5, 15) can''t be booked, because it would result in a triple booking.

The fifth event (5, 10) can be booked, as it does not use time 10 which is already double booked.

The sixth event (25, 55) can be booked, as the time in [25, 40) will be double booked with the third event;
the time [40, 50) will be single booked, and the time [50, 55) will be double booked with the second event.

Note:
The number of calls to `MyCalendar.book` per test case will be at most `1000`.

In calls to `MyCalendar.book(start, end)`, `start` and `end` are integers in the range `[0, 10^9]`.', false, 'Medium', '/articles/my-calendar-ii', 50.9, 
   11.9, 'https://leetcode.com/problems/my-calendar-ii', 215, 53.4, 104.9, '["Bloomberg"]'::jsonb, '["Ordered Map"]'::jsonb, 
   791, 102, 89, false, '[]'::jsonb, true),
  (732, 'My Calendar III', 'A `k`-booking happens when `k` events have some non-empty intersection (i.e., there is some time that is common to all `k` events.)
You are given some events `[start, end)`, after each given event, return an integer `k` representing the maximum `k`-booking between all the previous events.

Implement the `MyCalendarThree` class:
`MyCalendarThree()` Initializes the object.

`int book(int start, int end)` Returns an integer `k` representing the largest integer such that there exists a `k`-booking in the calendar.


Example 1:
Input
["MyCalendarThree", "book", "book", "book", "book", "book", "book"]
[[], [10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]]
Output
[null, 1, 1, 2, 3, 3, 3]
Explanation
MyCalendarThree myCalendarThree = new MyCalendarThree();
myCalendarThree.book(10, 20); // return 1, The first event can be booked and is disjoint, so the maximum k-booking is a 1-booking.

myCalendarThree.book(50, 60); // return 1, The second event can be booked and is disjoint, so the maximum k-booking is a 1-booking.

myCalendarThree.book(10, 40); // return 2, The third event [10, 40) intersects the first event, and the maximum k-booking is a 2-booking.

myCalendarThree.book(5, 15); // return 3, The remaining events cause the maximum K-booking to be only a 3-booking.

myCalendarThree.book(5, 10); // return 3
myCalendarThree.book(25, 55); // return 3

Constraints:
`0 <= start < end <= 109`
At most `400` calls will be made to `book`.', false, 'Hard', '/articles/my-calendar-iii', 62.2, 
   5.4, 'https://leetcode.com/problems/my-calendar-iii', 150, 26.6, 42.8, '["Google"]'::jsonb, '["Segment Tree,Ordered Map"]'::jsonb, 
   461, 107, 81, true, '[]'::jsonb, true),
  (733, 'Flood Fill', 'An `image` is represented by a 2-D array of integers, each integer representing the pixel value of the image (from 0 to 65535).

Given a coordinate `(sr, sc)` representing the starting pixel (row and column) of the flood fill, and a pixel value `newColor`, "flood fill" the image.

To perform a "flood fill", consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color as the starting pixel), and so on.  Replace the color of all of the aforementioned pixels with the newColor.

At the end, return the modified image.


Example 1:
Input: 
image = [[1,1,1],[1,1,0],[1,0,1]]
sr = 1, sc = 1, newColor = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: 
From the center of the image (with position (sr, sc) = (1, 1)), all pixels connected 
by a path of the same color as the starting pixel are colored with the new color.

Note the bottom corner is not colored 2, because it is not 4-directionally connected
to the starting pixel.

Note:
The length of `image` and `image[0]` will be in the range `[1, 50]`.

The given starting pixel will satisfy `0 <= sr < image.length` and `0 <= sc < image[0].length`.

The value of each color in `image[i][j]` and `newColor` will be an integer in `[0, 65535]`.', false, 'Easy', '/articles/flood-fill', 56, 
   44.6, 'https://leetcode.com/problems/flood-fill', 999, 224.4, 400.9, '["Amazon,Microsoft,Google"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   1849, 239, 89, true, '[]'::jsonb, true),
  (734, 'Sentence Similarity', 'We can represent a sentence as an array of words, for example, the sentence `"I am happy with leetcode"` can be represented as `arr = ["I","am",happy","with","leetcode"]`.

Given two sentences `sentence1` and `sentence2` each represented as a string array and given an array of string pairs `similarPairs` where `similarPairs[i] = [xi, yi]` indicates that the two words `xi` and `yi` are similar.

Return `true` if `sentence1` and `sentence2` are similar, or `false` if they are not similar.

Two sentences are similar if:
They have the same length (i.e. the same number of words)
`sentence1[i]` and `sentence2[i]` are similar.

Notice that a word is always similar to itself, also notice that the similarity relation is not transitive. For example, if the words `a` and `b` are similar and the words `b` and `c` are similar, `a` and `c` are not necessarily similar.


Example 1:
Input: sentence1 = ["great","acting","skills"], sentence2 = ["fine","drama","talent"], similarPairs = [["great","fine"],["drama","acting"],["skills","talent"]]
Output: true
Explanation: The two sentences have the same length and each word i of sentence1 is also similar to the corresponding word in sentence2.


Example 2:
Input: sentence1 = ["great"], sentence2 = ["great"], similarPairs = []
Output: true
Explanation: A word is similar to itself.


Example 3:
Input: sentence1 = ["great"], sentence2 = ["doubleplus","good"], similarPairs = [["great","doubleplus"]]
Output: false
Explanation: As they don''t have the same length, we return false.


Constraints:
`1 <= sentence1.length, sentence2.length <= 1000`
`1 <= sentence1[i].length, sentence2[i].length <= 20`
`sentence1[i]` and `sentence2[i]` consist of lower-case and upper-case English letters.

`0 <= similarPairs.length <= 1000`
`similarPairs[i].length == 2`
`1 <= xi.length, yi.length <= 20`
`xi` and `yi` consist of lower-case and upper-case English letters.

All the pairs `(xi, yi)` are distinct.', true, 'Easy', '/articles/sentence-similarity', 42.4, 
   3, 'https://leetcode.com/problems/sentence-similarity', 200, 40.7, 95.9, '["Facebook"]'::jsonb, '["Hash Table"]'::jsonb, 
   214, 356, 38, true, '[]'::jsonb, true),
  (735, 'Asteroid Collision', 'We are given an array `asteroids` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.


Example 1:
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.


Example 2:
Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.


Example 3:
Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.


Example 4:
Input: asteroids = [-2,-1,1,2]
Output: [-2,-1,1,2]
Explanation: The -2 and -1 are moving left, while the 1 and 2 are moving right. Asteroids moving the same direction never meet, so no asteroids will meet each other.


Constraints:
`2 <= asteroids.length <= 104`
`-1000 <= asteroids[i] <= 1000`
`asteroids[i] != 0`', false, 'Medium', '/articles/asteroid-collision', 43.3, 
   57, 'https://leetcode.com/problems/asteroid-collision', 740, 111.8, 258.2, '["Amazon,Lyft,ByteDance,Oracle"]'::jsonb, '["Stack"]'::jsonb, 
   1883, 165, 92, true, '[]'::jsonb, true),
  (736, 'Parse Lisp Expression', 'You are given a string `expression` representing a Lisp-like expression to return the integer value of.

The syntax for these expressions is given as follows.

An expression is either an integer, a let-expression, an add-expression, a mult-expression, or an assigned variable.  Expressions always evaluate to a single integer.

(An integer could be positive or negative.)
A let-expression takes the form `(let v1 e1 v2 e2 ... vn en expr)`, where `let` is always the string `"let"`, then there are 1 or more pairs of alternating variables and expressions, meaning that the first variable `v1` is assigned the value of the expression `e1`, the second variable `v2` is assigned the value of the expression `e2`, and so on sequentially; and then the value of this let-expression is the value of the expression `expr`.

An add-expression takes the form `(add e1 e2)` where `add` is always the string `"add"`, there are always two expressions `e1, e2`, and this expression evaluates to the addition of the evaluation of `e1` and the evaluation of `e2`.

A mult-expression takes the form `(mult e1 e2)` where `mult` is always the string `"mult"`, there are always two expressions `e1, e2`, and this expression evaluates to the multiplication of the evaluation of `e1` and the evaluation of `e2`.

For the purposes of this question, we will use a smaller subset of variable names.  A variable starts with a lowercase letter, then zero or more lowercase letters or digits.  Additionally for your convenience, the names "add", "let", or "mult" are protected and will never be used as variable names.

Finally, there is the concept of scope.  When an expression of a variable name is evaluated, within the context of that evaluation, the innermost scope (in terms of parentheses) is checked first for the value of that variable, and then outer scopes are checked sequentially.  It is guaranteed that every expression is legal.  Please see the examples for more details on scope.


Evaluation Examples:
Input: (add 1 2)
Output: 3
Input: (mult 3 (add 2 3))
Output: 15
Input: (let x 2 (mult x 5))
Output: 10
Input: (let x 2 (mult x (let x 3 y 4 (add x y))))
Output: 14
Explanation: In the expression (add x y), when checking for the value of the variable x,
we check from the innermost scope to the outermost in the context of the variable we are trying to evaluate.

Since x = 3 is found first, the value of x is 3.

Input: (let x 3 x 2 x)
Output: 2
Explanation: Assignment in let statements is processed sequentially.

Input: (let x 1 y 2 x (add x y) (add x y))
Output: 5
Explanation: The first (add x y) evaluates as 3, and is assigned to x.

The second (add x y) evaluates as 3+2 = 5.

Input: (let x 2 (add (let x 3 (let x 4 x)) x))
Output: 6
Explanation: Even though (let x 4 x) has a deeper scope, it is outside the context
of the final x in the add-expression.  That final x will equal 2.

Input: (let a1 3 b2 (add a1 1) b2) 
Output 4
Explanation: Variable names can contain digits after the first character.

Note:
The given string `expression` is well formatted: There are no leading or trailing spaces, there is only a single space separating different components of the string, and no space between adjacent parentheses.  The expression is guaranteed to be legal and evaluate to an integer.

The length of `expression` is at most 2000.  (It is also non-empty, as that would not be a legal expression.)
The answer and all intermediate calculations of that answer are guaranteed to fit in a 32-bit integer.', false, 'Hard', '/articles/parse-lisp-expression', 49.7, 
   6.5, 'https://leetcode.com/problems/parse-lisp-expression', 134, 14.9, 30, '["Google"]'::jsonb, '["String"]'::jsonb, 
   323, 239, 57, true, '[]'::jsonb, true),
  (737, 'Sentence Similarity II', 'Given two sentences `words1, words2` (each represented as an array of strings), and a list of similar word pairs `pairs`, determine if two sentences are similar.

For example, `words1 = ["great", "acting", "skills"]` and `words2 = ["fine", "drama", "talent"]` are similar, if the similar word pairs are `pairs = [["great", "good"], ["fine", "good"], ["acting","drama"], ["skills","talent"]]`.

Note that the similarity relation is transitive. For example, if "great" and "good" are similar, and "fine" and "good" are similar, then "great" and "fine" are similar.

Similarity is also symmetric. For example, "great" and "fine" being similar is the same as "fine" and "great" being similar.

Also, a word is always similar with itself. For example, the sentences `words1 = ["great"], words2 = ["great"], pairs = []` are similar, even though there are no specified similar word pairs.

Finally, sentences can only be similar if they have the same number of words. So a sentence like `words1 = ["great"]` can never be similar to `words2 = ["doubleplus","good"]`.

Note:
The length of `words1` and `words2` will not exceed `1000`.

The length of `pairs` will not exceed `2000`.

The length of each `pairs[i]` will be `2`.

The length of each `words[i]` and `pairs[i][j]` will be in the range `[1, 20]`.', true, 'Medium', '/articles/sentence-similarity-ii', 46.7, 
   9.4, 'https://leetcode.com/problems/sentence-similarity-ii', 255, 48.9, 104.7, '["Amazon"]'::jsonb, '["Depth-first Search,Union Find"]'::jsonb, 
   587, 36, 94, true, '[]'::jsonb, true),
  (738, 'Monotone Increasing Digits', 'Given a non-negative integer `N`, find the largest number that is less than or equal to `N` with monotone increasing digits.

(Recall that an integer has monotone increasing digits if and only if each pair of adjacent digits `x` and `y` satisfy `x <= y`.)

Example 1:
Input: N = 10
Output: 9

Example 2:
Input: N = 1234
Output: 1234

Example 3:
Input: N = 332
Output: 299
Note:
`N` is an integer in the range `[0, 10^9]`.', false, 'Medium', '/articles/monotone-increasing-digits', 45.7, 
   20.6, 'https://leetcode.com/problems/monotone-increasing-digits', 259, 28.7, 62.7, '["SAP"]'::jsonb, '["Greedy"]'::jsonb, 
   609, 77, 89, false, '[]'::jsonb, true),
  (739, 'Daily Temperatures', 'Given a list of daily temperatures `T`, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature.  If there is no future day for which this is possible, put `0` instead.

For example, given the list of temperatures `T = [73, 74, 75, 71, 69, 72, 76, 73]`, your output should be `[1, 1, 4, 2, 1, 1, 0, 0]`.

Note:
The length of `temperatures` will be in the range `[1, 30000]`.

Each temperature will be an integer in the range `[30, 100]`.', false, 'Medium', '/articles/daily-temperatures', 64.8, 
   73.7, 'https://leetcode.com/problems/daily-temperatures', 960, 232, 357.9, '["Facebook,Bloomberg,Amazon,ByteDance,Google,Adobe,Microsoft,Paypal,Oracle,Salesforce,Twitter"]'::jsonb, '["Hash Table,Stack"]'::jsonb, 
   4052, 124, 97, true, '[]'::jsonb, true),
  (740, 'Delete and Earn', 'Given an array `nums` of integers, you can perform operations on the array.

In each operation, you pick any `nums[i]` and delete it to earn `nums[i]` points. After, you must delete every element equal to `nums[i] - 1` or `nums[i] + 1`.

You start with `0` points. Return the maximum number of points you can earn by applying such operations.


Example 1:
Input: nums = [3,4,2]
Output: 6
Explanation: Delete 4 to earn 4 points, consequently 3 is also deleted.

Then, delete 2 to earn 2 points.

6 total points are earned.


Example 2:
Input: nums = [2,2,3,3,3,4]
Output: 9
Explanation: Delete 3 to earn 3 points, deleting both 2''s and the 4.

Then, delete 3 again to earn 3 points, and 3 again to earn 3 points.

9 total points are earned.


Constraints:
`1 <= nums.length <= 2 * 104`
`1 <= nums[i] <= 104`', false, 'Medium', '/articles/delete-and-earn', 49.9, 
   51, 'https://leetcode.com/problems/delete-and-earn', 306, 50, 100.2, '["Goldman Sachs"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1448, 106, 93, false, '[]'::jsonb, true),
  (741, 'Cherry Pickup', 'You are given an `n x n` `grid` representing a field of cherries, each cell is one of three possible integers.

`0` means the cell is empty, so you can pass through,
`1` means the cell contains a cherry that you can pick up and pass through, or
`-1` means the cell contains a thorn that blocks your way.

Return the maximum number of cherries you can collect by following the rules below:
Starting at the position `(0, 0)` and reaching `(n - 1, n - 1)` by moving right or down through valid path cells (cells with value `0` or `1`).

After reaching `(n - 1, n - 1)`, returning to `(0, 0)` by moving left or up through valid path cells.

When passing through a path cell containing a cherry, you pick it up, and the cell becomes an empty cell `0`.

If there is no valid path between `(0, 0)` and `(n - 1, n - 1)`, then no cherries can be collected.


Example 1:
Input: grid = [[0,1,-1],[1,0,-1],[1,1,1]]
Output: 5
Explanation: The player started at (0, 0) and went down, down, right right to reach (2, 2).

4 cherries were picked up during this single trip, and the matrix becomes [[0,1,-1],[0,0,-1],[0,0,0]].

Then, the player went left, up, up, left to return home, picking up one more cherry.

The total number of cherries picked up is 5, and this is the maximum possible.


Example 2:
Input: grid = [[1,1,-1],[1,-1,1],[-1,1,1]]
Output: 0

Constraints:
`n == grid.length`
`n == grid[i].length`
`1 <= n <= 50`
`grid[i][j]` is `-1`, `0`, or `1`.

`grid[0][0] != -1`
`grid[n - 1][n - 1] != -1`', false, 'Hard', '/articles/cherry-pickup', 35.2, 
   61.6, 'https://leetcode.com/problems/cherry-pickup', 181, 37.1, 105.5, '["Swiggy,Facebook,Mathworks"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1562, 93, 94, true, '[]'::jsonb, true),
  (742, 'Closest Leaf in a Binary Tree', 'Given a binary tree where every node has a unique value, and a target key `k`, find the value of the nearest leaf node to target `k` in the tree.

Here, nearest to a leaf means the least number of edges travelled on the binary tree to reach any leaf of the tree.  Also, a node is called a leaf if it has no children.

In the following examples, the input tree is represented in flattened form row by row.

The actual `root` tree given will be a TreeNode object.


Example 1:
Input:
root = [1, 3, 2], k = 1
Diagram of binary tree:
          1
         / \\
        3   2
Output: 2 (or 3)
Explanation: Either 2 or 3 is the nearest leaf node to the target of 1.


Example 2:
Input:
root = [1], k = 1
Output: 1
Explanation: The nearest leaf node is the root node itself.


Example 3:
Input:
root = [1,2,3,4,null,null,null,5,null,6], k = 2
Diagram of binary tree:
             1
            / \\
           2   3
          /
         4
        /
       5
      /
     6
Output: 3
Explanation: The leaf node with value 3 (and not the leaf node with value 6) is nearest to the node with value 2.

Note:
`root` represents a binary tree with at least `1` node and at most `1000` nodes.

Every node has a unique `node.val` in range `[1, 1000]`.

There exists some node in the given binary tree for which `node.val == k`.', true, 'Medium', '/articles/closest-leaf-in-binary-tree', 44.6, 
   15.4, 'https://leetcode.com/problems/closest-leaf-in-a-binary-tree', 243, 28.4, 63.7, '["Facebook"]'::jsonb, '["Tree"]'::jsonb, 
   585, 113, 84, true, '[]'::jsonb, true),
  (743, 'Network Delay Time', 'You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node `k`. Return the time it takes for all the `n` nodes to receive the signal. If it is impossible for all the `n` nodes to receive the signal, return `-1`.


Example 1:
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2

Example 2:
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1

Example 3:
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1

Constraints:
`1 <= k <= n <= 100`
`1 <= times.length <= 6000`
`times[i].length == 3`
`1 <= ui, vi <= n`
`ui != vi`
`0 <= wi <= 100`
All the pairs `(ui, vi)` are unique. (i.e., no multiple edges.)', false, 'Medium', '/articles/network-delay-time', 45.7, 
   23.8, 'https://leetcode.com/problems/network-delay-time', 713, 143, 312.5, '["Amazon"]'::jsonb, '["Heap,Depth-first Search,Breadth-first Search,Graph"]'::jsonb, 
   2462, 246, 91, true, '[]'::jsonb, true),
  (744, 'Find Smallest Letter Greater Than Target', 'Given a list of sorted characters `letters` containing only lowercase letters, and given a target letter `target`, find the smallest element in the list that is larger than the given target.

Letters also wrap around.  For example, if the target is `target = ''z''` and `letters = [''a'', ''b'']`, the answer is `''a''`.


Examples:
Input:
letters = ["c", "f", "j"]
target = "a"
Output: "c"
Input:
letters = ["c", "f", "j"]
target = "c"
Output: "f"
Input:
letters = ["c", "f", "j"]
target = "d"
Output: "f"
Input:
letters = ["c", "f", "j"]
target = "g"
Output: "j"
Input:
letters = ["c", "f", "j"]
target = "j"
Output: "c"
Input:
letters = ["c", "f", "j"]
target = "k"
Output: "c"
Note:
`letters` has a length in range `[2, 10000]`.

`letters` consists of lowercase letters, and contains at least 2 unique letters.

`target` is a lowercase letter.', false, 'Easy', '/articles/find-smallest-letter-greater-than-target', 45.6, 
   0.4, 'https://leetcode.com/problems/find-smallest-letter-greater-than-target', 602, 100.9, 221.4, '["LinkedIn"]'::jsonb, '["Binary Search"]'::jsonb, 
   607, 703, 46, false, '[]'::jsonb, true),
  (745, 'Prefix and Suffix Search', 'Design a special dictionary which has some words and allows you to search the words in it by a prefix and a suffix.

Implement the `WordFilter` class:
`WordFilter(string[] words)` Initializes the object with the `words` in the dictionary.

`f(string prefix, string suffix)` Returns the index of the word in the dictionary which has the prefix `prefix` and the suffix `suffix`. If there is more than one valid index, return the largest of them. If there is no such word in the dictionary, return `-1`.


Example 1:
Input
["WordFilter", "f"]
[[["apple"]], ["a", "e"]]
Output
[null, 0]
Explanation
WordFilter wordFilter = new WordFilter(["apple"]);
wordFilter.f("a", "e"); // return 0, because the word at index 0 has prefix = "a" and suffix = ''e".


Constraints:
`1 <= words.length <= 15000`
`1 <= words[i].length <= 10`
`1 <= prefix.length, suffix.length <= 10`
`words[i]`, `prefix` and `suffix` consist of lower-case English letters only.

At most `15000` calls will be made to the function `f`.', false, 'Hard', '/articles/prefix-and-suffix-search', 35.5, 
   3.3, 'https://leetcode.com/problems/prefix-and-suffix-search', 167, 22.3, 62.7, '["Amazon,Facebook"]'::jsonb, '["Trie"]'::jsonb, 
   461, 234, 66, true, '[]'::jsonb, true),
  (746, 'Min Cost Climbing Stairs', 'You are given an integer array `cost` where `cost[i]` is the cost of `ith` step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index `0`, or the step with index `1`.

Return the minimum cost to reach the top of the floor.


Example 1:
Input: cost = [10,15,20]
Output: 15
Explanation: Cheapest is: start on cost[1], pay that cost, and go to the top.


Example 2:
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: Cheapest is: start on cost[0], and only step on 1s, skipping cost[3].


Constraints:
`2 <= cost.length <= 1000`
`0 <= cost[i] <= 999`', false, 'Easy', '/articles/min-cost-climbing-stairs', 51, 
   27.4, 'https://leetcode.com/problems/min-cost-climbing-stairs', 999, 225.2, 441.8, '["Amazon,Apple"]'::jsonb, '["Array,Dynamic Programming"]'::jsonb, 
   3027, 654, 82, true, '[]'::jsonb, true),
  (747, 'Largest Number At Least Twice of Others', 'In a given integer array `nums`, there is always exactly one largest element.

Find whether the largest element in the array is at least twice as much as every other number in the array.

If it is, return the index of the largest element, otherwise return -1.


Example 1:
Input: nums = [3, 6, 1, 0]
Output: 1
Explanation: 6 is the largest integer, and for every other number in the array x,
6 is more than twice as big as x.  The index of value 6 is 1, so we return 1.


Example 2:
Input: nums = [1, 2, 3, 4]
Output: -1
Explanation: 4 isn''t at least as big as twice the value of 3, so we return -1.

Note:
`nums` will have a length in the range `[1, 50]`.

Every `nums[i]` will be an integer in the range `[0, 99]`.', false, 'Easy', '/articles/largest-number-at-least-twice-of-others', 43.2, 
   0.9, 'https://leetcode.com/problems/largest-number-at-least-twice-of-others', 829, 113, 261.6, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   430, 671, 39, true, '[]'::jsonb, true),
  (748, 'Shortest Completing Word', 'Given a string `licensePlate` and an array of strings `words`, find the shortest completing word in `words`.

A completing word is a word that contains all the letters in `licensePlate`. Ignore numbers and spaces in `licensePlate`, and treat letters as case insensitive. If a letter appears more than once in `licensePlate`, then it must appear in the word the same number of times or more.

For example, if `licensePlate`` = "aBc 12c"`, then it contains letters `''a''`, `''b''` (ignoring case), and `''c''` twice. Possible completing words are `"abccdef"`, `"caaacab"`, and `"cbca"`.

Return the shortest completing word in `words`. It is guaranteed an answer exists. If there are multiple shortest completing words, return the first one that occurs in `words`.


Example 1:
Input: licensePlate = "1s3 PSt", words = ["step","steps","stripe","stepple"]
Output: "steps"
Explanation: licensePlate contains letters ''s'', ''p'', ''s'' (ignoring case), and ''t''.

"step" contains ''t'' and ''p'', but only contains 1 ''s''.

"steps" contains ''t'', ''p'', and both ''s'' characters.

"stripe" is missing an ''s''.

"stepple" is missing an ''s''.

Since "steps" is the only word containing all the letters, that is the answer.


Example 2:
Input: licensePlate = "1s3 456", words = ["looks","pest","stew","show"]
Output: "pest"
Explanation: licensePlate only contains the letter ''s''. All the words contain ''s'', but among these "pest", "stew", and "show" are shortest. The answer is "pest" because it is the word that appears earliest of the 3.


Example 3:
Input: licensePlate = "Ah71752", words = ["suggest","letter","of","husband","easy","education","drug","prevent","writer","old"]
Output: "husband"

Example 4:
Input: licensePlate = "OgEu755", words = ["enough","these","play","wide","wonder","box","arrive","money","tax","thus"]
Output: "enough"

Example 5:
Input: licensePlate = "iMSlpe4", words = ["claim","consumer","student","camera","public","never","wonder","simple","thought","use"]
Output: "simple"

Constraints:
`1 <= licensePlate.length <= 7`
`licensePlate` contains digits, letters (uppercase or lowercase), or space `'' ''`.

`1 <= words.length <= 1000`
`1 <= words[i].length <= 15`
`words[i]` consists of lower case English letters.', false, 'Easy', '/articles/shortest-completing-word', 57.6, 
   4.2, 'https://leetcode.com/problems/shortest-completing-word', 362, 39.4, 68.3, '["Google"]'::jsonb, '["Hash Table"]'::jsonb, 
   233, 700, 25, true, '[]'::jsonb, true),
  (749, 'Contain Virus', 'A virus is spreading rapidly, and your task is to quarantine the infected area by installing walls.

The world is modeled as a 2-D array of cells, where `0` represents uninfected cells, and `1` represents cells contaminated with the virus.  A wall (and only one wall) can be installed between any two 4-directionally adjacent cells, on the shared boundary.

Every night, the virus spreads to all neighboring cells in all four directions unless blocked by a wall.

Resources are limited. Each day, you can install walls around only one region -- the affected area (continuous block of infected cells) that threatens the most uninfected cells the following night. There will never be a tie.

Can you save the day? If so, what is the number of walls required? If not, and the world becomes fully infected, return the number of walls used.


Example 1:
Input: grid = 
[[0,1,0,0,0,0,0,1],
 [0,1,0,0,0,0,0,1],
 [0,0,0,0,0,0,0,1],
 [0,0,0,0,0,0,0,0]]
Output: 10
Explanation:
There are 2 contaminated regions.

On the first day, add 5 walls to quarantine the viral region on the left. The board after the virus spreads is:
[[0,1,0,0,0,0,1,1],
 [0,1,0,0,0,0,1,1],
 [0,0,0,0,0,0,1,1],
 [0,0,0,0,0,0,0,1]]
On the second day, add 5 walls to quarantine the viral region on the right. The virus is fully contained.


Example 2:
Input: grid = 
[[1,1,1],
 [1,0,1],
 [1,1,1]]
Output: 4
Explanation: Even though there is only one cell saved, there are 4 walls built.

Notice that walls are only built on the shared boundary of two different cells.


Example 3:
Input: grid = 
[[1,1,1,0,0,0,0,0,0],
 [1,0,1,0,1,1,1,1,1],
 [1,1,1,0,0,0,0,0,0]]
Output: 13
Explanation: The region on the left only builds two new walls.

Note:
The number of rows and columns of `grid` will each be in the range `[1, 50]`.

Each `grid[i][j]` will be either `0` or `1`.

Throughout the described process, there is always a contiguous viral region that will infect strictly more uncontaminated squares in the next round.', false, 'Hard', '/articles/contain-virus', 48.3, 
   23.5, 'https://leetcode.com/problems/contain-virus', 74, 6.4, 13.3, '["Accolite"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   138, 308, 31, false, '[]'::jsonb, true),
  (750, 'Number Of Corner Rectangles', 'Given a grid where each entry is only 0 or 1, find the number of corner rectangles.

A corner rectangle is 4 distinct 1s on the grid that form an axis-aligned rectangle. Note that only the corners need to have the value 1. Also, all four 1s used must be distinct.


Example 1:
Input: grid = 
[[1, 0, 0, 1, 0],
 [0, 0, 1, 0, 1],
 [0, 0, 0, 1, 0],
 [1, 0, 1, 0, 1]]
Output: 1
Explanation: There is only one corner rectangle, with corners grid[1][2], grid[1][4], grid[3][2], grid[3][4].


Example 2:
Input: grid = 
[[1, 1, 1],
 [1, 1, 1],
 [1, 1, 1]]
Output: 9
Explanation: There are four 2x2 rectangles, four 2x3 and 3x2 rectangles, and one 3x3 rectangle.


Example 3:
Input: grid = 
[[1, 1, 1, 1]]
Output: 0
Explanation: Rectangles must have four distinct corners.

Note:
The number of rows and columns of `grid` will each be in the range `[1, 200]`.

Each `grid[i][j]` will be either `0` or `1`.

The number of `1`s in the grid will be at most `6000`.', true, 'Medium', '/articles/number-of-corner-rectangles', 67.2, 
   0, 'https://leetcode.com/problems/number-of-corner-rectangles', 124, 32.5, 48.4, '["Facebook"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   516, 78, 87, true, '[]'::jsonb, true),
  (751, 'IP to CIDR', 'Given a start IP address `ip` and a number of ips we need to cover `n`, return a representation of the range as a list (of smallest possible length) of CIDR blocks.

A CIDR block is a string consisting of an IP, followed by a slash, and then the prefix length.  For example: "123.45.67.89/20".  That prefix length "20" represents the number of common prefix bits in the specified range.


Example 1:
Input: ip = "255.0.0.7", n = 10
Output: ["255.0.0.7/32","255.0.0.8/29","255.0.0.16/32"]
Explanation:
The initial ip address, when converted to binary, looks like this (spaces added for clarity):
255.0.0.7 -> 11111111 00000000 00000000 00000111
The address "255.0.0.7/32" specifies all addresses with a common prefix of 32 bits to the given address,
ie. just this one address.

The address "255.0.0.8/29" specifies all addresses with a common prefix of 29 bits to the given address:
255.0.0.8 -> 11111111 00000000 00000000 00001000
Addresses with common prefix of 29 bits are:
11111111 00000000 00000000 00001000
11111111 00000000 00000000 00001001
11111111 00000000 00000000 00001010
11111111 00000000 00000000 00001011
11111111 00000000 00000000 00001100
11111111 00000000 00000000 00001101
11111111 00000000 00000000 00001110
11111111 00000000 00000000 00001111
The address "255.0.0.16/32" specifies all addresses with a common prefix of 32 bits to the given address,
ie. just 11111111 00000000 00000000 00010000.

In total, the answer specifies the range of 10 ips starting with the address 255.0.0.7 .

There were other representations, such as:
["255.0.0.7/32","255.0.0.8/30", "255.0.0.12/30", "255.0.0.16/32"],
but our answer was the shortest possible.

Also note that a representation beginning with say, "255.0.0.7/30" would be incorrect,
because it includes addresses like 255.0.0.4 = 11111111 00000000 00000000 00000100 
that are outside the specified range.

Note:
`ip` will be a valid IPv4 address.

Every implied address `ip + x` (for `x < n`) will be a valid IPv4 address.

`n` will be an integer in the range `[1, 1000]`.', true, 'Medium', '/articles/ip-to-cidr', 59.3, 
   20.1, 'https://leetcode.com/problems/ip-to-cidr', 68, 11.5, 19.4, '["Airbnb"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   104, 847, 11, false, '[]'::jsonb, true),
  (752, 'Open the Lock', 'You have a lock in front of you with 4 circular wheels. Each wheel has 10 slots: `''0'', ''1'', ''2'', ''3'', ''4'', ''5'', ''6'', ''7'', ''8'', ''9''`. The wheels can rotate freely and wrap around: for example we can turn `''9''` to be `''0''`, or `''0''` to be `''9''`. Each move consists of turning one wheel one slot.

The lock initially starts at `''0000''`, a string representing the state of the 4 wheels.

You are given a list of `deadends` dead ends, meaning if the lock displays any of these codes, the wheels of the lock will stop turning and you will be unable to open it.

Given a `target` representing the value of the wheels that will unlock the lock, return the minimum total number of turns required to open the lock, or -1 if it is impossible.


Example 1:
Input: deadends = ["0201","0101","0102","1212","2002"], target = "0202"
Output: 6
Explanation:
A sequence of valid moves would be "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202".

Note that a sequence like "0000" -> "0001" -> "0002" -> "0102" -> "0202" would be invalid,
because the wheels of the lock become stuck after the display becomes the dead end "0102".


Example 2:
Input: deadends = ["8888"], target = "0009"
Output: 1
Explanation:
We can turn the last wheel in reverse to move from "0000" -> "0009".


Example 3:
Input: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"
Output: -1
Explanation:
We can''t reach the target without getting stuck.


Example 4:
Input: deadends = ["0000"], target = "8888"
Output: -1

Constraints:
`1 <= deadends.length <= 500`
`deadends[i].length == 4`
`target.length == 4`
target will not be in the list `deadends`.

`target` and `deadends[i]` consist of digits only.', false, 'Medium', '/articles/open-the-lock', 53, 
   42.2, 'https://leetcode.com/problems/open-the-lock', 497, 92.8, 175.1, '["Facebook,Amazon,Citadel,Bloomberg"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   1534, 57, 96, true, '[]'::jsonb, true),
  (753, 'Cracking the Safe', 'There is a box protected by a password. The password is a sequence of `n` digits where each digit can be one of the first `k` digits `0, 1, ..., k-1`.

While entering a password, the last `n` digits entered will automatically be matched against the correct password.

For example, assuming the correct password is `"345"`, if you type `"012345"`, the box will open because the correct password matches the suffix of the entered password.

Return any password of minimum length that is guaranteed to open the box at some point of entering it.


Example 1:
Input: n = 1, k = 2
Output: "01"
Note: "10" will be accepted too.


Example 2:
Input: n = 2, k = 2
Output: "00110"
Note: "01100", "10011", "11001" will be accepted too.

Note:
`n` will be in the range `[1, 4]`.

`k` will be in the range `[1, 10]`.

`k^n` will be at most `4096`.', false, 'Hard', '/articles/cracking-the-safe', 52.5, 
   29.4, 'https://leetcode.com/problems/cracking-the-safe', 133, 35.6, 67.9, '["Google"]'::jsonb, '["Math,Depth-first Search"]'::jsonb, 
   548, 807, 40, true, '[]'::jsonb, true),
  (754, 'Reach a Number', 'You are standing at position `0` on an infinite number line.  There is a goal at position `target`.

On each move, you can either go left or right.  During the n-th move (starting from 1), you take n steps.

Return the minimum number of steps required to reach the destination.


Example 1:
Input: target = 3
Output: 2
Explanation:
On the first move we step from 0 to 1.

On the second step we step from 1 to 3.


Example 2:
Input: target = 2
Output: 3
Explanation:
On the first move we step from 0 to 1.

On the second move we step  from 1 to -1.

On the third move we step from -1 to 2.

Note:
`target` will be a non-zero integer in the range `[-10^9, 10^9]`.', false, 'Medium', '/articles/reach-a-number', 40.5, 
   42.2, 'https://leetcode.com/problems/reach-a-number', 234, 30.8, 76, '["InMobi"]'::jsonb, '["Math"]'::jsonb, 
   707, 542, 57, false, '[]'::jsonb, true),
  (755, 'Pour Water', 'We are given an elevation map, `heights[i]` representing the height of the terrain at that index.  The width at each index is 1.  After `V` units of water fall at index `K`, how much water is at each index?
Water first drops at index `K` and rests on top of the highest terrain or water at that index.  Then, it flows according to the following rules:
If the droplet would eventually fall by moving left, then move left.

Otherwise, if the droplet would eventually fall by moving right, then move right.

Otherwise, rise at it''s current position.

Here, "eventually fall" means that the droplet will eventually be at a lower level if it moves in that direction.

Also, "level" means the height of the terrain plus any water in that column.

We can assume there''s infinitely high terrain on the two sides out of bounds of the array.  Also, there could not be partial water being spread out evenly on more than 1 grid block - each unit of water has to be in exactly one block.


Example 1:
Input: heights = [2,1,1,2,1,2,2], V = 4, K = 3
Output: [2,2,2,3,2,2,2]
Explanation:
#       #
#       #
##  # ###
#########
 0123456    <- index
The first drop of water lands at index K = 3:
#       #
#   w   #
##  # ###
#########
 0123456    
When moving left or right, the water can only move to the same level or a lower level.

(By level, we mean the total height of the terrain plus any water in that column.)
Since moving left will eventually make it fall, it moves left.

(A droplet "made to fall" means go to a lower height than it was at previously.)
#       #
#       #
## w# ###
#########
 0123456    
Since moving left will not make it fall, it stays in place.  The next droplet falls:
#       #
#   w   #
## w# ###
#########
 0123456  
Since the new droplet moving left will eventually make it fall, it moves left.

Notice that the droplet still preferred to move left,
even though it could move right (and moving right makes it fall quicker.)
#       #
#  w    #
## w# ###
#########
 0123456  
#       #
#       #
##ww# ###
#########
 0123456  
After those steps, the third droplet falls.

Since moving left would not eventually make it fall, it tries to move right.

Since moving right would eventually make it fall, it moves right.

#       #
#   w   #
##ww# ###
#########
 0123456  
#       #
#       #
##ww#w###
#########
 0123456  
Finally, the fourth droplet falls.

Since moving left would not eventually make it fall, it tries to move right.

Since moving right would not eventually make it fall, it stays in place:
#       #
#   w   #
##ww#w###
#########
 0123456  
The final answer is [2,2,2,3,2,2,2]:
    #    
 ####### 
 ####### 
 0123456 

Example 2:
Input: heights = [1,2,3,4], V = 2, K = 2
Output: [2,3,3,4]
Explanation:
The last droplet settles at index 1, since moving further left would not cause it to eventually fall to a lower height.


Example 3:
Input: heights = [3,1,3], V = 5, K = 1
Output: [4,4,4]
Note:
`heights` will have length in `[1, 100]` and contain integers in `[0, 99]`.

`V` will be in range `[0, 2000]`.

`K` will be in range `[0, heights.length - 1]`.', true, 'Medium', '/articles/pour-water', 44.3, 
   28.8, 'https://leetcode.com/problems/pour-water', 152, 24.2, 54.6, '["Airbnb"]'::jsonb, '["Array"]'::jsonb, 
   218, 482, 31, false, '[]'::jsonb, true),
  (756, 'Pyramid Transition Matrix', 'We are stacking blocks to form a pyramid. Each block has a color which is a one-letter string.

We are allowed to place any color block `C` on top of two adjacent blocks of colors `A` and `B`, if and only if `ABC` is an allowed triple.

We start with a bottom row of `bottom`, represented as a single string. We also start with a list of allowed triples `allowed`. Each allowed triple is represented as a string of length `3`.

Return `true` if we can build the pyramid all the way to the top, otherwise `false`.


Example 1:
Input: bottom = "BCD", allowed = ["BCG","CDE","GEA","FFF"]
Output: true
Explanation:
We can stack the pyramid like this:
    A
   / \\
  G   E
 / \\ / \\
B   C   D
We are allowed to place G on top of B and C because BCG is an allowed triple.  Similarly, we can place E on top of C and D, then A on top of G and E.


Example 2:
Input: bottom = "AABA", allowed = ["AAA","AAB","ABA","ABB","BAC"]
Output: false
Explanation:
We cannot stack the pyramid to the top.

Note that there could be allowed triples (A, B, C) and (A, B, D) with C != D.


Constraints:
`2 <= bottom.length <= 8`
`0 <= allowed.length <= 200`
`allowed[i].length == 3`
The letters in all input strings are from the set `{''A'', ''B'', ''C'', ''D'', ''E'', ''F'', ''G''}`.', false, 'Medium', '/articles/pyramid-transition-matrix', 55.7, 
   11.8, 'https://leetcode.com/problems/pyramid-transition-matrix', 218, 23.8, 42.8, '["Amazon"]'::jsonb, '["Bit Manipulation,Depth-first Search"]'::jsonb, 
   359, 377, 49, true, '[]'::jsonb, true),
  (757, 'Set Intersection Size At Least Two', 'An integer interval `[a, b]` (for integers `a < b`) is a set of all consecutive integers from `a` to `b`, including `a` and `b`.

Find the minimum size of a set S such that for every integer interval A in `intervals`, the intersection of S with A has a size of at least two.


Example 1:
Input: intervals = [[1,3],[1,4],[2,5],[3,5]]
Output: 3
Explanation: Consider the set S = {2, 3, 4}.  For each interval, there are at least 2 elements from S in the interval.

Also, there isn''t a smaller size set that fulfills the above condition.

Thus, we output the size of this set, which is 3.


Example 2:
Input: intervals = [[1,2],[2,3],[2,4],[4,5]]
Output: 5
Explanation: An example of a minimum sized set is {1, 2, 3, 4, 5}.


Constraints:
`1 <= intervals.length <= 3000`
`intervals[i].length == 2`
`0 <= ai < bi <= 108`', false, 'Hard', '/articles/set-intersection-size-at-least-two', 42.5, 
   14.5, 'https://leetcode.com/problems/set-intersection-size-at-least-two', 74, 12.4, 29.1, '["Uber"]'::jsonb, '["Greedy"]'::jsonb, 
   356, 44, 89, false, '[]'::jsonb, true),
  (758, 'Bold Words in String', 'Given a set of keywords `words` and a string `S`, make all appearances of all keywords in `S` bold. Any letters between `<b>` and `</b>` tags become bold.

The returned string should use the least number of tags possible, and of course the tags should form a valid combination.

For example, given that `words = ["ab", "bc"]` and `S = "aabcd"`, we should return `"a<b>abc</b>d"`. Note that returning `"a<b>a<b>b</b>c</b>d"` would use more tags, so it is incorrect.


Constraints:
`words` has length in range `[0, 50]`.

`words[i]` has length in range `[1, 10]`.

`S` has length in range `[0, 500]`.

All characters in `words[i]` and `S` are lowercase letters.

Note: This question is the same as 616: https://leetcode.com/problems/add-bold-tag-in-string/', true, 'Easy', '/articles/bold-words-in-string', 47.5, 
   11.4, 'https://leetcode.com/problems/bold-words-in-string', 103, 12.8, 26.9, '["Google"]'::jsonb, '["String"]'::jsonb, 
   176, 93, 65, true, '[]'::jsonb, true),
  (759, 'Employee Free Time', 'We are given a list `schedule` of employees, which represents the working time for each employee.

Each employee has a list of non-overlapping `Intervals`, and these intervals are in sorted order.

Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.

(Even though we are representing `Intervals` in the form `[x, y]`, the objects inside are `Intervals`, not lists or arrays. For example, `schedule[0][0].start = 1`, `schedule[0][0].end = 2`, and `schedule[0][0][0]` is not defined).  Also, we wouldn''t include intervals like [5, 5] in our answer, as they have zero length.


Example 1:
Input: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
Output: [[3,4]]
Explanation: There are a total of three employees, and all common
free time intervals would be [-inf, 1], [3, 4], [10, inf].

We discard any intervals that contain inf as they aren''t finite.


Example 2:
Input: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]
Output: [[5,6],[7,9]]

Constraints:
`1 <= schedule.length , schedule[i].length <= 50`
`0 <= schedule[i].start < schedule[i].end <= 10^8`', true, 'Hard', '/articles/employee-free-time', 68.5, 
   74.9, 'https://leetcode.com/problems/employee-free-time', 396, 61.5, 89.9, '["DoorDash,Pinterest,Amazon,Intuit,Oracle,Bloomberg,Wayfair"]'::jsonb, '["Heap,Greedy"]'::jsonb, 
   815, 54, 94, true, '[]'::jsonb, true),
  (760, 'Find Anagram Mappings', 'Given two lists `A`and `B`, and `B` is an anagram of `A`. `B` is an anagram of `A` means `B` is made by randomizing the order of the elements in `A`.

We want to find an index mapping `P`, from `A` to `B`. A mapping `P[i] = j` means the `i`th element in `A` appears in `B` at index `j`.

These lists `A` and `B` may contain duplicates.  If there are multiple answers, output any of them.

For example, given
A = [12, 28, 46, 32, 50]
B = [50, 12, 32, 46, 28]
We should return
[1, 4, 3, 2, 0]
as `P[0] = 1` because the `0`th element of `A` appears at `B[1]`,
and `P[1] = 4` because the `1`st element of `A` appears at `B[4]`,
and so on.

Note:
`A, B` have equal lengths in range `[1, 100]`.

`A[i], B[i]` are integers in range `[0, 10^5]`.', true, 'Easy', '/articles/find-anagram-mappings', 81.9, 
   0, 'https://leetcode.com/problems/find-anagram-mappings', 424, 68.6, 83.7, '["Google"]'::jsonb, '["Hash Table"]'::jsonb, 
   405, 177, 70, true, '[]'::jsonb, true),
  (761, 'Special Binary String', 'Special binary strings are binary strings with the following two properties:
The number of 0''s is equal to the number of 1''s.

Every prefix of the binary string has at least as many 1''s as 0''s.

Given a special string `S`, a move consists of choosing two consecutive, non-empty, special substrings of `S`, and swapping them.  (Two strings are consecutive if the last character of the first string is exactly one index before the first character of the second string.)
At the end of any number of moves, what is the lexicographically largest resulting string possible?

Example 1:
Input: S = "11011000"
Output: "11100100"
Explanation:
The strings "10" [occuring at S[1]] and "1100" [at S[3]] are swapped.

This is the lexicographically largest string possible after some number of swaps.

Note:
`S` has length at most `50`.

`S` is guaranteed to be a special binary string as defined above.', false, 'Hard', '/articles/special-binary-string', 58.7, 
   55.1, 'https://leetcode.com/problems/special-binary-string', 54, 11.1, 18.8, '["Citrix"]'::jsonb, '["String,Recursion"]'::jsonb, 
   401, 134, 75, false, '[]'::jsonb, true),
  (762, 'Prime Number of Set Bits in Binary Representation', 'Given two integers `L` and `R`, find the count of numbers in the range `[L, R]` (inclusive) having a prime number of set bits in their binary representation.

(Recall that the number of set bits an integer has is the number of `1`s present when written in binary.  For example, `21` written in binary is `10101` which has 3 set bits.  Also, 1 is not a prime.)

Example 1:Input: L = 6, R = 10
Output: 4
Explanation:
6 -> 110 (2 set bits, 2 is prime)
7 -> 111 (3 set bits, 3 is prime)
9 -> 1001 (2 set bits , 2 is prime)
10->1010 (2 set bits , 2 is prime)

Example 2:Input: L = 10, R = 15
Output: 5
Explanation:
10 -> 1010 (2 set bits, 2 is prime)
11 -> 1011 (3 set bits, 3 is prime)
12 -> 1100 (2 set bits, 2 is prime)
13 -> 1101 (3 set bits, 3 is prime)
14 -> 1110 (3 set bits, 3 is prime)
15 -> 1111 (4 set bits, 4 is not prime)
Note:
`L, R` will be integers `L <= R` in the range `[1, 10^6]`.

`R - L` will be at most 10000.', false, 'Easy', '/articles/prime-number-of-set-bits-in-binary-representation', 64.6, 
   2.3, 'https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation', 336, 54.1, 83.8, '["Amazon"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   314, 398, 44, true, '[]'::jsonb, true),
  (763, 'Partition Labels', 'A string `S` of lowercase English letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.


Example 1:
Input: S = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".

This is a partition so that each letter appears in at most one part.

A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.

Note:
`S` will have length in range `[1, 500]`.

`S` will consist of lowercase English letters (`''a''` to `''z''`) only.', false, 'Medium', '/articles/partition-labels', 78.1, 
   53.6, 'https://leetcode.com/problems/partition-labels', 999, 247.7, 317.1, '["Amazon,Uber,Adobe,Bloomberg"]'::jsonb, '["Two Pointers,Greedy"]'::jsonb, 
   4384, 184, 96, true, '[]'::jsonb, true),
  (764, 'Largest Plus Sign', 'In a 2D `grid` from (0, 0) to (N-1, N-1), every cell contains a `1`, except those cells in the given list `mines` which are `0`.  What is the largest axis-aligned plus sign of `1`s contained in the grid?  Return the order of the plus sign.  If there is none, return 0.

An "axis-aligned plus sign of `1`s of order k" has some center `grid[x][y] = 1` along with 4 arms of length `k-1` going up, down, left, and right, and made of `1`s.  This is demonstrated in the diagrams below.  Note that there could be `0`s or `1`s beyond the arms of the plus sign, only the relevant area of the plus sign is checked for 1s.


Examples of Axis-Aligned Plus Signs of Order k:Order 1:
000
010
000
Order 2:
00000
00100
01110
00100
00000
Order 3:
0000000
0001000
0001000
0111110
0001000
0001000
0000000

Example 1:Input: N = 5, mines = [[4, 2]]
Output: 2
Explanation:
11111
11111
11111
11111
11011
In the above grid, the largest plus sign can only be order 2.  One of them is marked in bold.


Example 2:Input: N = 2, mines = []
Output: 1
Explanation:
There is no plus sign of order 2, but there is of order 1.


Example 3:Input: N = 1, mines = [[0, 0]]
Output: 0
Explanation:
There is no plus sign, so return 0.

Note:
`N` will be an integer in the range `[1, 500]`.

`mines` will have length at most `5000`.

`mines[i]` will be length 2 and consist of integers in the range `[0, N-1]`.

(Additionally, programs submitted in C, C++, or C# will be judged with a slightly smaller time limit.)', false, 'Medium', '/articles/largest-plus-sign', 46.6, 
   0, 'https://leetcode.com/problems/largest-plus-sign', 176, 25.2, 53.9, '["Facebook"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   572, 116, 83, true, '[]'::jsonb, true),
  (765, 'Couples Holding Hands', 'N couples sit in 2N seats arranged in a row and want to hold hands.  We want to know the minimum number of swaps so that every couple is sitting side by side.  A swap consists of choosing any two people, then they stand up and switch seats. 
The people and seats are represented by an integer from `0` to `2N-1`, the couples are numbered in order, the first couple being `(0, 1)`, the second couple being `(2, 3)`, and so on with the last couple being `(2N-2, 2N-1)`.

The couples'' initial seating is given by `row[i]` being the value of the person who is initially sitting in the i-th seat.


Example 1:Input: row = [0, 2, 1, 3]
Output: 1
Explanation: We only need to swap the second (row[1]) and third (row[2]) person.


Example 2:Input: row = [3, 2, 0, 1]
Output: 0
Explanation: All couples are already seated side by side.

Note:
 `len(row)` is even and in the range of `[4, 60]`.

 `row` is guaranteed to be a permutation of `0...len(row)-1`.', false, 'Hard', '/articles/couples-holding-hands', 55.6, 
   20, 'https://leetcode.com/problems/couples-holding-hands', 364, 33, 59.4, '["Google"]'::jsonb, '["Greedy,Union Find,Graph"]'::jsonb, 
   1026, 68, 94, true, '[]'::jsonb, true),
  (766, 'Toeplitz Matrix', 'Given an `m x n` `matrix`, return `true` if the matrix is Toeplitz. Otherwise, return `false`.

A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.


Example 1:
Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
Output: true
Explanation:
In the above grid, the diagonals are:
"[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".

In each diagonal all elements are the same, so the answer is True.


Example 2:
Input: matrix = [[1,2],[2,2]]
Output: false
Explanation:
The diagonal "[1, 2]" has different elements.


Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 20`
`0 <= matrix[i][j] <= 99`
Follow up:
What if the `matrix` is stored on disk, and the memory is limited such that you can only load at most one row of the matrix into the memory at once?
What if the `matrix` is so large that you can only load up a partial row into the memory at once?', false, 'Easy', '/articles/toeplitz-matrix', 65.9, 
   7.8, 'https://leetcode.com/problems/toeplitz-matrix', 699, 123.8, 187.8, '["Facebook"]'::jsonb, '["Array"]'::jsonb, 
   1347, 89, 94, true, '[]'::jsonb, true),
  (767, 'Reorganize String', 'Given a string `S`, check if the letters can be rearranged so that two characters that are adjacent to each other are not the same.

If possible, output any possible result.  If not possible, return the empty string.


Example 1:
Input: S = "aab"
Output: "aba"

Example 2:
Input: S = "aaab"
Output: ""
Note:
`S` will consist of lowercase letters and have length in range `[1, 500]`.', false, 'Medium', '/articles/reorganized-string', 50.3, 
   69.7, 'https://leetcode.com/problems/reorganize-string', 737, 135.2, 268.9, '["Amazon,Google,Facebook,Microsoft,Wish,Uber,Goldman Sachs"]'::jsonb, '["String,Heap,Greedy,Sort"]'::jsonb, 
   2740, 131, 95, true, '[]'::jsonb, true),
  (768, 'Max Chunks To Make Sorted II', 'This question is the same as "Max Chunks to Make Sorted" except the integers of the given array are not necessarily distinct, the input array could be up to length `2000`, and the elements could be up to `10**8`.

Given an array `arr` of integers (not necessarily distinct), we split the array into some number of "chunks" (partitions), and individually sort each chunk.  After concatenating them, the result equals the sorted array.

What is the most number of chunks we could have made?

Example 1:
Input: arr = [5,4,3,2,1]
Output: 1
Explanation:
Splitting into two or more chunks will not return the required result.

For example, splitting into [5, 4], [3, 2, 1] will result in [4, 5, 1, 2, 3], which isn''t sorted.


Example 2:
Input: arr = [2,1,3,4,4]
Output: 4
Explanation:
We can split into two chunks, such as [2, 1], [3, 4, 4].

However, splitting into [2, 1], [3], [4], [4] is the highest number of chunks possible.

Note:
`arr` will have length in range `[1, 2000]`.

`arr[i]` will be an integer in range `[0, 10**8]`.', false, 'Hard', '/articles/max-chunks-to-make-sorted-ii', 49.8, 
   7.6, 'https://leetcode.com/problems/max-chunks-to-make-sorted-ii', 204, 26, 52.2, '["Microsoft,Google"]'::jsonb, '["Array"]'::jsonb, 
   562, 23, 96, true, '[]'::jsonb, true),
  (769, 'Max Chunks To Make Sorted', 'Given an array `arr` that is a permutation of `[0, 1, ..., arr.length - 1]`, we split the array into some number of "chunks" (partitions), and individually sort each chunk.  After concatenating them, the result equals the sorted array.

What is the most number of chunks we could have made?

Example 1:
Input: arr = [4,3,2,1,0]
Output: 1
Explanation:
Splitting into two or more chunks will not return the required result.

For example, splitting into [4, 3], [2, 1, 0] will result in [3, 4, 0, 1, 2], which isn''t sorted.


Example 2:
Input: arr = [1,0,2,3,4]
Output: 4
Explanation:
We can split into two chunks, such as [1, 0], [2, 3, 4].

However, splitting into [1, 0], [2], [3], [4] is the highest number of chunks possible.

Note:
`arr` will have length in range `[1, 10]`.

`arr[i]` will be a permutation of `[0, 1, ..., arr.length - 1]`.', false, 'Medium', '/articles/max-chunks-to-make-sorted-i', 55.9, 
   21, 'https://leetcode.com/problems/max-chunks-to-make-sorted', 416, 47.8, 85.5, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   1018, 144, 88, true, '[]'::jsonb, true),
  (770, 'Basic Calculator IV', 'Given an `expression` such as `expression = "e + 8 - a + 5"` and an evaluation map such as `{"e": 1}` (given in terms of `evalvars = ["e"]` and `evalints = [1]`), return a list of tokens representing the simplified expression, such as `["-1*a","14"]`
An expression alternates chunks and symbols, with a space separating each chunk and symbol.

A chunk is either an expression in parentheses, a variable, or a non-negative integer.

A variable is a string of lowercase letters (not including digits.) Note that variables can be multiple letters, and note that variables never have a leading coefficient or unary operator like `"2x"` or `"-x"`.

Expressions are evaluated in the usual order: brackets first, then multiplication, then addition and subtraction. For example, `expression = "1 + 2 * 3"` has an answer of `["7"]`.

The format of the output is as follows:
For each term of free variables with non-zero coefficient, we write the free variables within a term in sorted order lexicographically. For example, we would never write a term like `"b*a*c"`, only `"a*b*c"`.

Terms have degree equal to the number of free variables being multiplied, counting multiplicity. (For example, `"a*a*b*c"` has degree 4.) We write the largest degree terms of our answer first, breaking ties by lexicographic order ignoring the leading coefficient of the term.

The leading coefficient of the term is placed directly to the left with an asterisk separating it from the variables (if they exist.)  A leading coefficient of 1 is still printed.

An example of a well formatted answer is `["-2*a*a*a", "3*a*a*b", "3*b*b", "4*a", "5*c", "-6"]` 
Terms (including constant terms) with coefficient 0 are not included.  For example, an expression of "0" has an output of [].


Examples:
Input: expression = "e + 8 - a + 5", evalvars = ["e"], evalints = [1]
Output: ["-1*a","14"]
Input: expression = "e - 8 + temperature - pressure",
evalvars = ["e", "temperature"], evalints = [1, 12]
Output: ["-1*pressure","5"]
Input: expression = "(e + 8) * (e - 8)", evalvars = [], evalints = []
Output: ["1*e*e","-64"]
Input: expression = "7 - 7", evalvars = [], evalints = []
Output: []
Input: expression = "a * b * c + b * a * c * 4", evalvars = [], evalints = []
Output: ["5*a*b*c"]
Input: expression = "((a - b) * (b - c) + (c - a)) * ((a - b) + (b - c) * (c - a))",
evalvars = [], evalints = []
Output: ["-1*a*a*b*b","2*a*a*b*c","-1*a*a*c*c","1*a*b*b*b","-1*a*b*b*c","-1*a*b*c*c","1*a*c*c*c","-1*b*b*b*c","2*b*b*c*c","-1*b*c*c*c","2*a*a*b","-2*a*a*c","-2*a*b*b","2*a*c*c","1*b*b*b","-1*b*b*c","1*b*c*c","-1*c*c*c","-1*a*a","1*a*b","1*a*c","-1*b*c"]
Note:
`expression` will have length in range `[1, 250]`.

`evalvars, evalints` will have equal lengths in range `[0, 100]`.', false, 'Hard', '/articles/basic-calculator-iv', 54.4, 
   62.5, 'https://leetcode.com/problems/basic-calculator-iv', 62, 6.2, 11.4, '["Roblox"]'::jsonb, '["Hash Table,String,Stack"]'::jsonb, 
   91, 785, 10, false, '[]'::jsonb, true),
  (771, 'Jewels and Stones', 'You''re given strings `jewels` representing the types of stones that are jewels, and `stones` representing the stones you have. Each character in `stones` is a type of stone you have. You want to know how many of the stones you have are also jewels.

Letters are case sensitive, so `"a"` is considered a different type of stone from `"A"`.


Example 1:
Input: jewels = "aA", stones = "aAAbbbb"
Output: 3

Example 2:
Input: jewels = "z", stones = "ZZ"
Output: 0

Constraints:
`1 <= jewels.length, stones.length <= 50`
`jewels` and `stones` consist of only English letters.

All the characters of `jewels` are unique.', false, 'Easy', '/articles/jewels-and-stones', 87, 
   19.7, 'https://leetcode.com/problems/jewels-and-stones', 999, 612.3, 703.9, '["Apple"]'::jsonb, '["Hash Table"]'::jsonb, 
   2588, 409, 86, true, '[]'::jsonb, true),
  (772, 'Basic Calculator III', 'Implement a basic calculator to evaluate a simple expression string.

The expression string contains only non-negative integers, `''+''`, `''-''`, `''*''`, `''/''` operators, and open `''(''` and closing parentheses `'')''`. The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of `[-231, 231 - 1]`.


Example 1:
Input: s = "1+1"
Output: 2

Example 2:
Input: s = "6-4/2"
Output: 4

Example 3:
Input: s = "2*(5+5*2)/3+(6/2+8)"
Output: 21

Example 4:
Input: s = "(2+6*3+5-(3*14/7+2)*5)+3"
Output: -12

Example 5:
Input: s = "0"
Output: 0

Constraints:
`1 <= s <= 104`
`s` consists of digits, `''+''`, `''-''`, `''*''`, `''/''`, `''(''`, and `'')''`.

`s` is a valid expression.

Follow up: Could you solve the problem without using built-in library functions?', true, 'Hard', NULL, 44, 
   43.5, 'https://leetcode.com/problems/basic-calculator-iii', 283, 55, 125, '["Facebook,Amazon,ByteDance"]'::jsonb, '["String,Stack"]'::jsonb, 
   584, 221, 73, true, '[]'::jsonb, true),
  (773, 'Sliding Puzzle', 'On a 2x3 `board`, there are 5 tiles represented by the integers 1 through 5, and an empty square represented by 0.

A move consists of choosing `0` and a 4-directionally adjacent number and swapping it.

The state of the board is solved if and only if the `board` is `[[1,2,3],[4,5,0]].`
Given a puzzle board, return the least number of moves required so that the state of the board is solved. If it is impossible for the state of the board to be solved, return -1.


Examples:
Input: board = [[1,2,3],[4,0,5]]
Output: 1
Explanation: Swap the 0 and the 5 in one move.

Input: board = [[1,2,3],[5,4,0]]
Output: -1
Explanation: No number of moves will make the board solved.

Input: board = [[4,1,2],[5,0,3]]
Output: 5
Explanation: 5 is the smallest number of moves that solves the board.

An example path:
After move 0: [[4,1,2],[5,0,3]]
After move 1: [[4,1,2],[0,5,3]]
After move 2: [[0,1,2],[4,5,3]]
After move 3: [[1,0,2],[4,5,3]]
After move 4: [[1,2,0],[4,5,3]]
After move 5: [[1,2,3],[4,5,0]]
Input: board = [[3,2,4],[1,5,0]]
Output: 14
Note:
`board` will be a 2 x 3 array as described above.

`board[i][j]` will be a permutation of `[0, 1, 2, 3, 4, 5]`.', false, 'Hard', '/articles/sliding-puzzle', 61.2, 
   46.8, 'https://leetcode.com/problems/sliding-puzzle', 331, 52.1, 85.1, '["Uber,Airbnb,Facebook"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   941, 30, 97, true, '[]'::jsonb, true),
  (774, 'Minimize Max Distance to Gas Station', 'You are given an integer array `stations` that represents the positions of the gas stations on the x-axis. You are also given an integer `k`.

You should add `k` new gas stations. You can add the stations anywhere on the x-axis, and not necessarily on an integer position.

Let `penalty()` be the maximum distance between adjacent gas stations after adding the `k` new stations.

Return the smallest possible value of `penalty()`. Answers within `10-6` of the actual answer will be accepted.


Example 1:
Input: stations = [1,2,3,4,5,6,7,8,9,10], k = 9
Output: 0.50000

Example 2:
Input: stations = [23,24,36,39,46,56,57,65,84,98], k = 1
Output: 14.00000

Constraints:
`10 <= stations.length <= 2000`
`0 <= stations[i] <= 108`
`stations` is sorted in a strictly increasing order.

`1 <= k <= 106`', true, 'Hard', '/articles/minimize-max-distance-to-gas-station', 48.6, 
   0, 'https://leetcode.com/problems/minimize-max-distance-to-gas-station', 53, 19, 39.1, '["Google"]'::jsonb, '["Binary Search"]'::jsonb, 
   426, 64, 87, true, '[]'::jsonb, true),
  (775, 'Global and Local Inversions', 'We have some permutation `A` of `[0, 1, ..., N - 1]`, where `N` is the length of `A`.

The number of (global) inversions is the number of `i < j` with `0 <= i < j < N` and `A[i] > A[j]`.

The number of local inversions is the number of `i` with `0 <= i < N` and `A[i] > A[i+1]`.

Return `true` if and only if the number of global inversions is equal to the number of local inversions.


Example 1:
Input: A = [1,0,2]
Output: true
Explanation: There is 1 global inversion, and 1 local inversion.


Example 2:
Input: A = [1,2,0]
Output: false
Explanation: There are 2 global inversions, and 1 local inversion.

Note:
`A` will be a permutation of `[0, 1, ..., A.length - 1]`.

`A` will have length in range `[1, 5000]`.

The time limit for this problem has been reduced.', false, 'Medium', '/articles/global-and-local-inversions', 46.3, 
   1.3, 'https://leetcode.com/problems/global-and-local-inversions', 290, 45.9, 99.2, '["Bloomberg"]'::jsonb, '["Array,Math"]'::jsonb, 
   747, 254, 75, false, '[]'::jsonb, true),
  (776, 'Split BST', 'Given a Binary Search Tree (BST) with root node `root`, and a target value `V`, split the tree into two subtrees where one subtree has nodes that are all smaller or equal to the target value, while the other subtree has all nodes that are greater than the target value.  It''s not necessarily the case that the tree contains a node with value `V`.

Additionally, most of the structure of the original tree should remain.  Formally, for any child C with parent P in the original tree, if they are both in the same subtree after the split, then node C should still have the parent P.

You should output the root TreeNode of both subtrees after splitting, in any order.


Example 1:
Input: root = [4,2,6,1,3,5,7], V = 2
Output: [[2,1],[4,3,6,null,null,5,7]]
Explanation:
Note that root, output[0], and output[1] are TreeNode objects, not arrays.

The given tree [4,2,6,1,3,5,7] is represented by the following diagram:
          4
        /   \\
      2      6
     / \\    / \\
    1   3  5   7
while the diagrams for the outputs are:
          4
        /   \\
      3      6      and    2
            / \\           /
           5   7         1
Note:
The size of the BST will not exceed `50`.

The BST is always valid and each node''s value is different.', true, 'Medium', '/articles/split-bst', 56.7, 
   15.8, 'https://leetcode.com/problems/split-bst', 120, 21.4, 37.8, '["Google,Salesforce"]'::jsonb, '["Tree,Recursion"]'::jsonb, 
   734, 62, 92, true, '[]'::jsonb, true),
  (777, 'Swap Adjacent in LR String', 'In a string composed of `''L''`, `''R''`, and `''X''` characters, like `"RXXLRXRXL"`, a move consists of either replacing one occurrence of `"XL"` with `"LX"`, or replacing one occurrence of `"RX"` with `"XR"`. Given the starting string `start` and the ending string `end`, return `True` if and only if there exists a sequence of moves to transform one string to the other.


Example 1:
Input: start = "RXXLRXRXL", end = "XRLXXRRLX"
Output: true
Explanation: We can transform start to end following these steps:
RXXLRXRXL ->
XRXLRXRXL ->
XRLXRXRXL ->
XRLXXRRXL ->
XRLXXRRLX

Example 2:
Input: start = "X", end = "L"
Output: false

Example 3:
Input: start = "LLR", end = "RRL"
Output: false

Example 4:
Input: start = "XL", end = "LX"
Output: true

Example 5:
Input: start = "XLLR", end = "LXLX"
Output: false

Constraints:
`1 <= start.length <= 104`
`start.length == end.length`
Both `start` and `end` will only consist of characters in `''L''`, `''R''`, and `''X''`.', false, 'Medium', '/articles/swap-adjacent-in-lr-string', 35.7, 
   21.9, 'https://leetcode.com/problems/swap-adjacent-in-lr-string', 205, 37.6, 105.3, '["Google"]'::jsonb, '["Brainteaser"]'::jsonb, 
   520, 502, 51, true, '[]'::jsonb, true),
  (778, 'Swim in Rising Water', 'On an N x N `grid`, each square `grid[i][j]` represents the elevation at that point `(i,j)`.

Now rain starts to fall. At time `t`, the depth of the water everywhere is `t`. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most `t`. You can swim infinite distance in zero time. Of course, you must stay within the boundaries of the grid during your swim.

You start at the top left square `(0, 0)`. What is the least time until you can reach the bottom right square `(N-1, N-1)`?

Example 1:
Input: [[0,2],[1,3]]
Output: 3
Explanation:
At time `0`, you are in grid location `(0, 0)`.

You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.

You cannot reach point `(1, 1)` until time `3`.

When the depth of water is `3`, we can swim anywhere inside the grid.


Example 2:
Input: [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
Output: 16
Explanation:
 0  1  2  3  4
24 23 22 21  5
12 13 14 15 16
11 17 18 19 20
10  9  8  7  6
The final route is marked in bold.

We need to wait until time 16 so that (0, 0) and (4, 4) are connected.

Note:
`2 <= N <= 50`.

grid[i][j] is a permutation of [0, ..., N*N - 1].', false, 'Hard', '/articles/swim-in-rising-water', 54.9, 
   15.7, 'https://leetcode.com/problems/swim-in-rising-water', 271, 33.7, 61.4, '["Facebook"]'::jsonb, '["Binary Search,Heap,Depth-first Search,Union Find"]'::jsonb, 
   868, 66, 93, true, '[]'::jsonb, true),
  (779, 'K-th Symbol in Grammar', 'On the first row, we write a `0`. Now in every subsequent row, we look at the previous row and replace each occurrence of `0` with `01`, and each occurrence of `1` with `10`.

Given row `N` and index `K`, return the `K`-th indexed symbol in row `N`. (The values of `K` are 1-indexed.) (1 indexed).


Examples:
Input: N = 1, K = 1
Output: 0
Input: N = 2, K = 1
Output: 0
Input: N = 2, K = 2
Output: 1
Input: N = 4, K = 5
Output: 1
Explanation:
row 1: 0
row 2: 01
row 3: 0110
row 4: 01101001
Note:
`N` will be an integer in the range `[1, 30]`.

`K` will be an integer in the range `[1, 2^(N-1)]`.', false, 'Medium', '/articles/k-th-symbol-in-grammar', 38.8, 
   19.6, 'https://leetcode.com/problems/k-th-symbol-in-grammar', 602, 51.4, 132.6, '["Amazon,Facebook"]'::jsonb, '["Recursion"]'::jsonb, 
   826, 197, 81, true, '[]'::jsonb, true),
  (780, 'Reaching Points', 'A move consists of taking a point `(x, y)` and transforming it to either `(x, x+y)` or `(x+y, y)`.

Given a starting point `(sx, sy)` and a target point `(tx, ty)`, return `True` if and only if a sequence of moves exists to transform the point `(sx, sy)` to `(tx, ty)`. Otherwise, return `False`.


Examples:
Input: sx = 1, sy = 1, tx = 3, ty = 5
Output: True
Explanation:
One series of moves that transforms the starting point to the target is:
(1, 1) -> (1, 2)
(1, 2) -> (3, 2)
(3, 2) -> (3, 5)
Input: sx = 1, sy = 1, tx = 2, ty = 2
Output: False
Input: sx = 1, sy = 1, tx = 1, ty = 1
Output: True
Note:
`sx, sy, tx, ty` will all be integers in the range `[1, 10^9]`.', false, 'Hard', '/articles/reaching-points', 30.4, 
   64.1, 'https://leetcode.com/problems/reaching-points', 110, 31, 101.9, '["Twitter,Goldman Sachs"]'::jsonb, '["Math"]'::jsonb, 
   713, 128, 85, false, '[]'::jsonb, true),
  (781, 'Rabbits in Forest', 'In a forest, each rabbit has some color. Some subset of rabbits (possibly all of them) tell you how many other rabbits have the same color as them. Those `answers` are placed in an array.

Return the minimum number of rabbits that could be in the forest.


Examples:
Input: answers = [1, 1, 2]
Output: 5
Explanation:
The two rabbits that answered "1" could both be the same color, say red.

The rabbit than answered "2" can''t be red or the answers would be inconsistent.

Say the rabbit that answered "2" was blue.

Then there should be 2 other blue rabbits in the forest that didn''t answer into the array.

The smallest possible number of rabbits in the forest is therefore 5: 3 that answered plus 2 that didn''t.

Input: answers = [10, 10, 10]
Output: 11
Input: answers = []
Output: 0
Note:
`answers` will have length at most `1000`.

Each `answers[i]` will be an integer in the range `[0, 999]`.', false, 'Medium', '/articles/rabbits-in-forest', 55.8, 
   1.8, 'https://leetcode.com/problems/rabbits-in-forest', 319, 25.9, 46.4, '["Wish"]'::jsonb, '["Hash Table,Math"]'::jsonb, 
   386, 363, 52, false, '[]'::jsonb, true),
  (782, 'Transform to Chessboard', 'An N x N `board` contains only `0`s and `1`s. In each move, you can swap any 2 rows with each other, or any 2 columns with each other.

What is the minimum number of moves to transform the board into a "chessboard" - a board where no `0`s and no `1`s are 4-directionally adjacent? If the task is impossible, return -1.


Examples:
Input: board = [[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]]
Output: 2
Explanation:
One potential sequence of moves is shown below, from left to right:
0110     1010     1010
0110 --> 1010 --> 0101
1001     0101     1010
1001     0101     0101
The first move swaps the first and second column.

The second move swaps the second and third row.

Input: board = [[0, 1], [1, 0]]
Output: 0
Explanation:
Also note that the board with 0 in the top left corner,
01
10
is also a valid chessboard.

Input: board = [[1, 0], [1, 0]]
Output: -1
Explanation:
No matter what sequence of moves you make, you cannot end with a valid chessboard.

Note:
`board` will have the same number of rows and columns, a number in the range `[2, 30]`.

`board[i][j]` will be only `0`s or `1`s.', false, 'Hard', '/articles/transform-to-chessboard', 47, 
   21.7, 'https://leetcode.com/problems/transform-to-chessboard', 29, 6.6, 14, '["Google"]'::jsonb, '["Array,Math"]'::jsonb, 
   149, 152, 50, true, '[]'::jsonb, true),
  (783, 'Minimum Distance Between BST Nodes', 'Given the `root` of a Binary Search Tree (BST), return the minimum difference between the values of any two different nodes in the tree.

Note: This question is the same as 530: https://leetcode.com/problems/minimum-absolute-difference-in-bst/

Example 1:
Input: root = [4,2,6,1,3]
Output: 1

Example 2:
Input: root = [1,0,48,null,null,12,49]
Output: 1

Constraints:
The number of nodes in the tree is in the range `[2, 100]`.

`0 <= Node.val <= 105`', false, 'Easy', '/articles/minimum-distance-between-bst-nodes', 54.2, 
   10.6, 'https://leetcode.com/problems/minimum-distance-between-bst-nodes', 596, 86, 158.7, '["Amazon"]'::jsonb, '["Tree,Depth-first Search,Recursion"]'::jsonb, 
   990, 249, 80, true, '[]'::jsonb, true),
  (784, 'Letter Case Permutation', 'Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string.

Return a list of all possible strings we could create. You can return the output in any order.


Example 1:
Input: S = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]

Example 2:
Input: S = "3z4"
Output: ["3z4","3Z4"]

Example 3:
Input: S = "12345"
Output: ["12345"]

Example 4:
Input: S = "0"
Output: ["0"]

Constraints:
`S` will be a string with length between `1` and `12`.

`S` will consist only of letters or digits.', false, 'Medium', '/articles/letter-case-permutation', 68.7, 
   6.8, 'https://leetcode.com/problems/letter-case-permutation', 999, 138.2, 201, '["Bloomberg,Amazon,Spotify"]'::jsonb, '["Backtracking,Bit Manipulation"]'::jsonb, 
   2002, 124, 94, true, '[]'::jsonb, true),
  (785, 'Is Graph Bipartite?', 'There is an undirected graph with `n` nodes, where each node is numbered between `0` and `n - 1`. You are given a 2D array `graph`, where `graph[u]` is an array of nodes that node `u` is adjacent to. More formally, for each `v` in `graph[u]`, there is an undirected edge between node `u` and node `v`. The graph has the following properties:
There are no self-edges (`graph[u]` does not contain `u`).

There are no parallel edges (`graph[u]` does not contain duplicate values).

If `v` is in `graph[u]`, then `u` is in `graph[v]` (the graph is undirected).

The graph may not be connected, meaning there may be two nodes `u` and `v` such that there is no path between them.

A graph is bipartite if the nodes can be partitioned into two independent sets `A` and `B` such that every edge in the graph connects a node in set `A` and a node in set `B`.

Return `true` if and only if it is bipartite.


Example 1:
Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
Explanation: There is no way to partition the nodes into two independent sets such that every edge connects a node in one and a node in the other.


Example 2:
Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true
Explanation: We can partition the nodes into two sets: {0, 2} and {1, 3}.


Constraints:
`graph.length == n`
`1 <= n <= 100`
`0 <= graph[u].length < n`
`0 <= graph[u][i] <= n - 1`
`graph[u]` does not contain `u`.

All the values of `graph[u]` are unique.

If `graph[u]` contains `v`, then `graph[v]` contains `u`.', false, 'Medium', '/articles/is-graph-bipartite', 48.7, 
   47.4, 'https://leetcode.com/problems/is-graph-bipartite', 904, 190, 389.9, '["Facebook,ByteDance,eBay"]'::jsonb, '["Depth-first Search,Breadth-first Search,Graph"]'::jsonb, 
   2493, 224, 92, true, '[]'::jsonb, true),
  (786, 'K-th Smallest Prime Fraction', 'You are given a sorted integer array `arr` containing `1` and prime numbers, where all the integers of `arr` are unique. You are also given an integer `k`.

For every `i` and `j` where `0 <= i < j < arr.length`, we consider the fraction `arr[i] / arr[j]`.

Return the `kth` smallest fraction considered. Return your answer as an array of integers of size `2`, where `answer[0] == arr[i]` and `answer[1] == arr[j]`.


Example 1:
Input: arr = [1,2,3,5], k = 3
Output: [2,5]
Explanation: The fractions to be considered in sorted order are:
1/5, 1/3, 2/5, 1/2, 3/5, and 2/3.

The third fraction is 2/5.


Example 2:
Input: arr = [1,7], k = 1
Output: [1,7]

Constraints:
`2 <= arr.length <= 1000`
`1 <= arr[i] <= 3 * 104`
`arr[0] == 1`
`arr[i]` is a prime number for `i > 0`.

All the numbers of `arr` are unique and sorted in strictly increasing order.

`1 <= k <= arr.length * (arr.length - 1) / 2`', false, 'Hard', '/articles/k-th-smallest-prime-fraction', 43.3, 
   21.2, 'https://leetcode.com/problems/k-th-smallest-prime-fraction', 92, 18.2, 42.1, '["Robinhood"]'::jsonb, '["Binary Search,Heap"]'::jsonb, 
   507, 29, 95, false, '[]'::jsonb, true),
  (787, 'Cheapest Flights Within K Stops', 'There are `n` cities connected by `m` flights. Each flight starts from city `u` and arrives at `v` with a price `w`.

Now given all the cities and flights, together with starting city `src` and the destination `dst`, your task is to find the cheapest price from `src` to `dst` with up to `k` stops. If there is no such route, output `-1`.


Example 1:
Input: 
n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 1
Output: 200
Explanation: 
The graph looks like this:
The cheapest price from city `0` to city `2` with at most 1 stop costs 200, as marked red in the picture.


Example 2:
Input: 
n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 0
Output: 500
Explanation: 
The graph looks like this:
The cheapest price from city `0` to city `2` with at most 0 stop costs 500, as marked blue in the picture.


Constraints:
The number of nodes `n` will be in range `[1, 100]`, with nodes labeled from `0` to `n`` - 1`.

The size of `flights` will be in range `[0, n * (n - 1) / 2]`.

The format of each flight will be `(src, ``dst``, price)`.

The price of each flight will be in the range `[1, 10000]`.

`k` is in the range of `[0, n - 1]`.

There will not be any duplicated flights or self cycles.', false, 'Medium', '/articles/cheapest-flights-within-k-stops', 39.7, 
   31.3, 'https://leetcode.com/problems/cheapest-flights-within-k-stops', 649, 148.4, 374.2, '["Facebook,Expedia,Apple,Airbnb,Amazon"]'::jsonb, '["Dynamic Programming,Heap,Breadth-first Search"]'::jsonb, 
   2926, 97, 97, true, '[]'::jsonb, true),
  (788, 'Rotated Digits', 'X is a good number if after rotating each digit individually by 180 degrees, we get a valid number that is different from X.  Each digit must be rotated - we cannot choose to leave it alone.

A number is valid if each digit remains a digit after rotation. 0, 1, and 8 rotate to themselves; 2 and 5 rotate to each other (on this case they are rotated in a different direction, in other words 2 or 5 gets mirrored); 6 and 9 rotate to each other, and the rest of the numbers do not rotate to any other number and become invalid.

Now given a positive number `N`, how many numbers X from `1` to `N` are good?

Example:
Input: 10
Output: 4
Explanation: 
There are four good numbers in the range [1, 10] : 2, 5, 6, 9.

Note that 1 and 10 are not good numbers, since they remain unchanged after rotating.

Note:
N  will be in range `[1, 10000]`.', false, 'Easy', '/articles/rotated-digits', 57.5, 
   7.3, 'https://leetcode.com/problems/rotated-digits', 405, 65, 112.9, '["Google"]'::jsonb, '["String"]'::jsonb, 
   418, 1401, 23, true, '[]'::jsonb, true),
  (789, 'Escape The Ghosts', 'You are playing a simplified PAC-MAN game on an infinite 2-D grid. You start at the point `[0, 0]`, and you are given a destination point `target = [xtarget, ytarget]`, which you are trying to get to. There are several ghosts on the map with their starting positions given as an array `ghosts`, where `ghosts[i] = [xi, yi]` represents the starting position of the `ith` ghost. All inputs are integral coordinates.

Each turn, you and all the ghosts may independently choose to either move 1 unit in any of the four cardinal directions: north, east, south, or west or stay still. All actions happen simultaneously.

You escape if and only if you can reach the target before any ghost reaches you. If you reach any square (including the target) at the same time as a ghost, it does not count as an escape.

Return `true` if it is possible to escape, otherwise return `false`.


Example 1:
Input: ghosts = [[1,0],[0,3]], target = [0,1]
Output: true
Explanation: You can reach the destination (0, 1) after 1 turn, while the ghosts located at (1, 0) and (0, 3) cannot catch up with you.


Example 2:
Input: ghosts = [[1,0]], target = [2,0]
Output: false
Explanation: You need to reach the destination (2, 0), but the ghost at (1, 0) lies between you and the destination.


Example 3:
Input: ghosts = [[2,0]], target = [1,0]
Output: false
Explanation: The ghost can reach the target at the same time as you.


Example 4:
Input: ghosts = [[5,0],[-10,-2],[0,-5],[-2,-2],[-7,1]], target = [7,7]
Output: false

Example 5:
Input: ghosts = [[-1,0],[0,1],[-1,0],[0,1],[-1,0]], target = [0,0]
Output: true

Constraints:
`1 <= ghosts.length <= 100`
`ghosts[i].length == 2`
`-104 <= xi, yi <= 104`
There can be multiple ghosts in the same location.

`target.length == 2`
`-104 <= xtarget, ytarget <= 104`', false, 'Medium', '/articles/escape-the-ghosts', 58.6, 
   0, 'https://leetcode.com/problems/escape-the-ghosts', 153, 17.2, 29.4, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   224, 368, 38, true, '[]'::jsonb, true),
  (790, 'Domino and Tromino Tiling', 'We have two types of tiles: a 2x1 domino shape, and an "L" tromino shape. These shapes may be rotated.

XX  <- domino
XX  <- "L" tromino
X
Given N, how many ways are there to tile a 2 x N board? Return your answer modulo 10^9 + 7.

(In a tiling, every square must be covered by a tile. Two tilings are different if and only if there are two 4-directionally adjacent cells on the board such that exactly one of the tilings has both squares occupied by a tile.)

Example:
Input: 3
Output: 5
Explanation: 
The five different ways are listed below, different letters indicates different tiles:
XYZ XXZ XYY XXY XYY
XYZ YYZ XZZ XYY XXY
Note:
N  will be in range `[1, 1000]`.', false, 'Medium', '/articles/domino-and-tromino-tiling', 40.2, 
   8.9, 'https://leetcode.com/problems/domino-and-tromino-tiling', 171, 18.8, 46.7, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   528, 282, 65, true, '[]'::jsonb, true),
  (791, 'Custom Sort String', '`S` and `T` are strings composed of lowercase letters. In `S`, no letter occurs more than once.

`S` was sorted in some custom order previously. We want to permute the characters of `T` so that they match the order that `S` was sorted. More specifically, if `x` occurs before `y` in `S`, then `x` should occur before `y` in the returned string.

Return any permutation of `T` (as a string) that satisfies this property.


Example :
Input: 
S = "cba"
T = "abcd"
Output: "cbad"
Explanation: 
"a", "b", "c" appear in S, so the order of "a", "b", "c" should be "c", "b", and "a". 
Since "d" does not appear in S, it can be at any position in T. "dcba", "cdba", "cbda" are also valid outputs.

Note:
`S` has length at most `26`, and no character is repeated in `S`.

`T` has length at most `200`.

`S` and `T` consist of lowercase letters only.', false, 'Medium', '/articles/custom-sort-string', 65.9, 
   13.9, 'https://leetcode.com/problems/custom-sort-string', 883, 88.1, 133.8, '["Facebook"]'::jsonb, '["String"]'::jsonb, 
   1003, 213, 82, true, '[]'::jsonb, true),
  (792, 'Number of Matching Subsequences', 'Given a string `s` and an array of strings `words`, return the number of `words[i]` that is a subsequence of `s`.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, `"ace"` is a subsequence of `"abcde"`.


Example 1:
Input: s = "abcde", words = ["a","bb","acd","ace"]
Output: 3
Explanation: There are three strings in words that are a subsequence of s: "a", "acd", "ace".


Example 2:
Input: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
Output: 2

Constraints:
`1 <= s.length <= 5 * 104`
`1 <= words.length <= 5000`
`1 <= words[i].length <= 50`
`s` and `words[i]` consist of only lowercase English letters.', false, 'Medium', '/articles/number-of-matching-subsequences', 48.3, 
   20.9, 'https://leetcode.com/problems/number-of-matching-subsequences', 295, 56.8, 117.5, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   1345, 90, 94, true, '[]'::jsonb, true),
  (793, 'Preimage Size of Factorial Zeroes Function', 'Let `f(x)` be the number of zeroes at the end of `x!`. (Recall that `x! = 1 * 2 * 3 * ... * x`, and by convention, `0! = 1`.)
For example, `f(3) = 0` because 3! = 6 has no zeroes at the end, while `f(11) = 2` because 11! = 39916800 has 2 zeroes at the end. Given `K`, find how many non-negative integers `x` have the property that `f(x) = K`.


Example 1:
Input: K = 0
Output: 5
Explanation: 0!, 1!, 2!, 3!, and 4! end with K = 0 zeroes.


Example 2:
Input: K = 5
Output: 0
Explanation: There is no x such that x! ends in K = 5 zeroes.

Note:
`K` will be an integer in the range `[0, 10^9]`.', false, 'Hard', '/articles/preimage-size-of-factorial-zeroes-function', 40.6, 
   0, 'https://leetcode.com/problems/preimage-size-of-factorial-zeroes-function', 91, 9.5, 23.4, '["Adobe"]'::jsonb, '["Binary Search"]'::jsonb, 
   217, 62, 78, false, '[]'::jsonb, true),
  (794, 'Valid Tic-Tac-Toe State', 'A Tic-Tac-Toe board is given as a string array `board`. Return True if and only if it is possible to reach this board position during the course of a valid tic-tac-toe game.

The `board` is a 3 x 3 array, and consists of characters `" "`, `"X"`, and `"O"`.  The " " character represents an empty square.

Here are the rules of Tic-Tac-Toe:
Players take turns placing characters into empty squares (" ").

The first player always places "X" characters, while the second player always places "O" characters.

"X" and "O" characters are always placed into empty squares, never filled ones.

The game ends when there are 3 of the same (non-empty) character filling any row, column, or diagonal.

The game also ends if all squares are non-empty.

No more moves can be played if the game is over.


Example 1:
Input: board = ["O  ", "   ", "   "]
Output: false
Explanation: The first player always plays "X".


Example 2:
Input: board = ["XOX", " X ", "   "]
Output: false
Explanation: Players take turns making moves.


Example 3:
Input: board = ["XXX", "   ", "OOO"]
Output: false

Example 4:
Input: board = ["XOX", "O O", "XOX"]
Output: true
Note:
`board` is a length-3 array of strings, where each string `board[i]` has length 3.

Each `board[i][j]` is a character in the set `{" ", "X", "O"}`.', false, 'Medium', '/articles/valid-tic-tac-toe-state', 34, 
   28.3, 'https://leetcode.com/problems/valid-tic-tac-toe-state', 285, 32.9, 96.8, '["Amazon,Facebook,Bloomberg"]'::jsonb, '["Math,Recursion"]'::jsonb, 
   259, 742, 26, true, '[]'::jsonb, true),
  (795, 'Number of Subarrays with Bounded Maximum', 'We are given an array `A` of positive integers, and two positive integers `L` and `R` (`L <= R`).

Return the number of (contiguous, non-empty) subarrays such that the value of the maximum array element in that subarray is at least `L` and at most `R`.


Example :
Input: 
A = [2, 1, 4, 3]
L = 2
R = 3
Output: 3
Explanation: There are three subarrays that meet the requirements: [2], [2, 1], [3].

Note:
L, R  and `A[i]` will be an integer in the range `[0, 10^9]`.

The length of `A` will be in the range of `[1, 50000]`.', false, 'Medium', '/articles/number-of-subarrays-with-bounded-maximum', 47.9, 
   7.9, 'https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum', 169, 24, 50.1, '["DoorDash"]'::jsonb, '["Array"]'::jsonb, 
   759, 50, 94, false, '[]'::jsonb, true),
  (796, 'Rotate String', 'We are given two strings, `A` and `B`.

A shift on `A` consists of taking string `A` and moving the leftmost character to the rightmost position. For example, if `A = ''abcde''`, then it will be `''bcdea''` after one shift on `A`. Return `True` if and only if `A` can become `B` after some number of shifts on `A`.


Example 1:
Input: A = ''abcde'', B = ''cdeab''
Output: true

Example 2:
Input: A = ''abcde'', B = ''abced''
Output: false
Note:
`A` and `B` will have length at most `100`.', false, 'Easy', '/articles/rotate-string', 49.1, 
   29.8, 'https://leetcode.com/problems/rotate-string', 716, 96.2, 196.1, '["Amazon,Microsoft,Oracle"]'::jsonb, '[]'::jsonb, 
   1059, 61, 95, true, '[]'::jsonb, true),
  (797, 'All Paths From Source to Target', 'Given a directed acyclic graph (DAG) of `n` nodes labeled from 0 to n - 1, find all possible paths from node `0` to node `n - 1`, and return them in any order.

The graph is given as follows: `graph[i]` is a list of all nodes you can visit from node `i` (i.e., there is a directed edge from node `i` to node `graph[i][j]`).


Example 1:
Input: graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]
Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.


Example 2:
Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]

Example 3:
Input: graph = [[1],[]]
Output: [[0,1]]

Example 4:
Input: graph = [[1,2,3],[2],[3],[]]
Output: [[0,1,2,3],[0,2,3],[0,3]]

Example 5:
Input: graph = [[1,3],[2],[3],[]]
Output: [[0,1,2,3],[0,3]]

Constraints:
`n == graph.length`
`2 <= n <= 15`
`0 <= graph[i][j] < n`
`graph[i][j] != i` (i.e., there will be no self-loops).

The input graph is guaranteed to be a DAG.', false, 'Medium', '/articles/all-paths-from-source-to-target', 78.6, 
   41.1, 'https://leetcode.com/problems/all-paths-from-source-to-target', 855, 129.7, 165.1, '["Bloomberg,Amazon"]'::jsonb, '["Backtracking,Depth-first Search,Graph"]'::jsonb, 
   1798, 91, 95, true, '[]'::jsonb, true),
  (798, 'Smallest Rotation with Highest Score', ' Given an array `A`, we may rotate it by a non-negative integer `K` so that the array becomes `A[K], A[K+1], A{K+2], ... A[A.length - 1], A[0], A[1], ..., A[K-1]`.  Afterward, any entries that are less than or equal to their index are worth 1 point. 
For example, if we have `[2, 4, 1, 3, 0]`, and we rotate by `K = 2`, it becomes `[1, 3, 0, 2, 4]`.  This is worth 3 points because 1 > 0 [no points], 3 > 1 [no points], 0 <= 2 [one point], 2 <= 3 [one point], 4 <= 4 [one point].

Over all possible rotations, return the rotation index K that corresponds to the highest score we could receive.  If there are multiple answers, return the smallest such index K.


Example 1:
Input: [2, 3, 1, 4, 0]
Output: 3
Explanation:  
Scores for each K are listed below: 
K = 0,  A = [2,3,1,4,0],    score 2
K = 1,  A = [3,1,4,0,2],    score 3
K = 2,  A = [1,4,0,2,3],    score 3
K = 3,  A = [4,0,2,3,1],    score 4
K = 4,  A = [0,2,3,1,4],    score 3
So we should choose K = 3, which has the highest score.


Example 2:
Input: [1, 3, 0, 2, 4]
Output: 0
Explanation:  A will always have 3 points no matter how it shifts.

So we will choose the smallest K, which is 0.

Note:
`A` will have length at most `20000`.

`A[i]` will be in the range `[0, A.length]`.', false, 'Hard', '/articles/smallest-rotation-with-highest-score', 45, 
   0, 'https://leetcode.com/problems/smallest-rotation-with-highest-score', 51, 6.9, 15.4, '[]'::jsonb, '[]'::jsonb, 
   262, 17, 94, false, '[]'::jsonb, true),
  (799, 'Champagne Tower', 'We stack glasses in a pyramid, where the first row has `1` glass, the second row has `2` glasses, and so on until the 100th row.  Each glass holds one cup of champagne.

Then, some champagne is poured into the first glass at the top.  When the topmost glass is full, any excess liquid poured will fall equally to the glass immediately to the left and right of it.  When those glasses become full, any excess champagne will fall equally to the left and right of those glasses, and so on.  (A glass at the bottom row has its excess champagne fall on the floor.)
For example, after one cup of champagne is poured, the top most glass is full.  After two cups of champagne are poured, the two glasses on the second row are half full.  After three cups of champagne are poured, those two cups become full - there are 3 full glasses total now.  After four cups of champagne are poured, the third row has the middle glass half full, and the two outside glasses are a quarter full, as pictured below.

Now after pouring some non-negative integer cups of champagne, return how full the `jth` glass in the `ith` row is (both `i` and `j` are 0-indexed.)

Example 1:
Input: poured = 1, query_row = 1, query_glass = 1
Output: 0.00000
Explanation: We poured 1 cup of champange to the top glass of the tower (which is indexed as (0, 0)). There will be no excess liquid so all the glasses under the top glass will remain empty.


Example 2:
Input: poured = 2, query_row = 1, query_glass = 1
Output: 0.50000
Explanation: We poured 2 cups of champange to the top glass of the tower (which is indexed as (0, 0)). There is one cup of excess liquid. The glass indexed as (1, 0) and the glass indexed as (1, 1) will share the excess liquid equally, and each will get half cup of champange.


Example 3:
Input: poured = 100000009, query_row = 33, query_glass = 17
Output: 1.00000

Constraints:
`0 <= poured <= 109`
`0 <= query_glass <= query_row < 100`', false, 'Medium', '/articles/champagne-tower', 44.1, 
   34.9, 'https://leetcode.com/problems/champagne-tower', 189, 33.4, 75.8, '["Samsung"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   780, 58, 93, false, '[]'::jsonb, true),
  (800, 'Similar RGB Color', 'In the following, every capital letter represents some hexadecimal digit from `0` to `f`.

The red-green-blue color `"#AABBCC"` can be written as `"#ABC"` in shorthand.  For example, `"#15c"` is shorthand for the color `"#1155cc"`.

Now, say the similarity between two colors `"#ABCDEF"` and `"#UVWXYZ"` is `-(AB - UV)^2 - (CD - WX)^2 - (EF - YZ)^2`.

Given the color `"#ABCDEF"`, return a 7 character color that is most similar to `#ABCDEF`, and has a shorthand (that is, it can be represented as some `"#XYZ"`

Example 1:
Input: color = "#09f166"
Output: "#11ee66"
Explanation:  
The similarity is -(0x09 - 0x11)^2 -(0xf1 - 0xee)^2 - (0x66 - 0x66)^2 = -64 -9 -0 = -73.

This is the highest among any shorthand color.

Note:
`color` is a string of length `7`.

`color` is a valid RGB color: for `i > 0`, `color[i]` is a hexadecimal digit from `0` to `f`
Any answer which has the same (highest) similarity as the best answer will be accepted.

All inputs and outputs should use lowercase letters, and the output is 7 characters.', true, 'Easy', '/articles/similar-rgb-color', 62.5, 
   0, 'https://leetcode.com/problems/similar-rgb-color', 83, 11.3, 18, '["Google"]'::jsonb, '["Math,String"]'::jsonb, 
   66, 426, 13, true, '[]'::jsonb, true),
  (801, 'Minimum Swaps To Make Sequences Increasing', 'We have two integer sequences `A` and `B` of the same non-zero length.

We are allowed to swap elements `A[i]` and `B[i]`.  Note that both elements are in the same index position in their respective sequences.

At the end of some number of swaps, `A` and `B` are both strictly increasing.  (A sequence is strictly increasing if and only if `A[0] < A[1] < A[2] < ... < A[A.length - 1]`.)
Given A and B, return the minimum number of swaps to make both sequences strictly increasing.  It is guaranteed that the given input always makes it possible.


Example:
Input: A = [1,3,5,4], B = [1,2,3,7]
Output: 1
Explanation: 
Swap A[3] and B[3].  Then the sequences are:
A = [1, 3, 5, 7] and B = [1, 2, 3, 4]
which are both strictly increasing.

Note:
`A, B` are arrays with the same length, and that length will be in the range `[1, 1000]`.

`A[i], B[i]` are integer values in the range `[0, 2000]`.', false, 'Medium', '/articles/minimum-swaps-to-make-sequences-increasing', 39, 
   20.3, 'https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing', 211, 41.6, 106.8, '["Oracle"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1478, 109, 93, false, '[]'::jsonb, true),
  (802, 'Find Eventual Safe States', 'We start at some node in a directed graph, and every turn, we walk along a directed edge of the graph. If we reach a terminal node (that is, it has no outgoing directed edges), we stop.

We define a starting node to be safe if we must eventually walk to a terminal node. More specifically, there is a natural number `k`, so that we must have stopped at a terminal node in less than `k` steps for any choice of where to walk.

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

The directed graph has `n` nodes with labels from `0` to `n - 1`, where `n` is the length of `graph`. The graph is given in the following form: `graph[i]` is a list of labels `j` such that `(i, j)` is a directed edge of the graph, going from node `i` to node `j`.


Example 1:
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: The given graph is shown above.


Example 2:
Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]

Constraints:
`n == graph.length`
`1 <= n <= 104`
`0 <= graph[i].legnth <= n`
`graph[i]` is sorted in a strictly increasing order.

The graph may contain self-loops.

The number of edges in the graph will be in the range `[1, 4 * 104]`.', false, 'Medium', '/articles/find-eventual-safe-states', 50, 
   6.2, 'https://leetcode.com/problems/find-eventual-safe-states', 316, 51, 101.9, '["Amazon"]'::jsonb, '["Depth-first Search,Graph"]'::jsonb, 
   1106, 214, 84, true, '[]'::jsonb, true),
  (803, 'Bricks Falling When Hit', 'You are given an `m x n` binary `grid`, where each `1` represents a brick and `0` represents an empty space. A brick is stable if:
It is directly connected to the top of the grid, or
At least one other brick in its four adjacent cells is stable.

You are also given an array `hits`, which is a sequence of erasures we want to apply. Each time we want to erase the brick at the location `hits[i] = (rowi, coli)`. The brick on that location (if it exists) will disappear. Some other bricks may no longer be stable because of that erasure and will fall. Once a brick falls, it is immediately erased from the `grid` (i.e., it does not land on other stable bricks).

Return an array `result`, where each `result[i]` is the number of bricks that will fall after the `ith` erasure is applied.

Note that an erasure may refer to a location with no brick, and if it does, no bricks drop.


Example 1:
Input: grid = [[1,0,0,0],[1,1,1,0]], hits = [[1,0]]
Output: [2]
Explanation: Starting with the grid:
[[1,0,0,0],
 [1,1,1,0]]
We erase the underlined brick at (1,0), resulting in the grid:
[[1,0,0,0],
 [0,1,1,0]]
The two underlined bricks are no longer stable as they are no longer connected to the top nor adjacent to another stable brick, so they will fall. The resulting grid is:
[[1,0,0,0],
 [0,0,0,0]]
Hence the result is [2].


Example 2:
Input: grid = [[1,0,0,0],[1,1,0,0]], hits = [[1,1],[1,0]]
Output: [0,0]
Explanation: Starting with the grid:
[[1,0,0,0],
 [1,1,0,0]]
We erase the underlined brick at (1,1), resulting in the grid:
[[1,0,0,0],
 [1,0,0,0]]
All remaining bricks are still stable, so no bricks fall. The grid remains the same:
[[1,0,0,0],
 [1,0,0,0]]
Next, we erase the underlined brick at (1,0), resulting in the grid:
[[1,0,0,0],
 [0,0,0,0]]
Once again, all remaining bricks are still stable, so no bricks fall.

Hence the result is [0,0].


Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 200`
`grid[i][j]` is `0` or `1`.

`1 <= hits.length <= 4 * 104`
`hits[i].length == 2`
`0 <= xi <= m - 1`
`0 <= yi <= n - 1`
All `(xi, yi)` are unique.', false, 'Hard', '/articles/bricks-falling-when-hit', 31.8, 
   2.4, 'https://leetcode.com/problems/bricks-falling-when-hit', 57, 17.8, 55.9, '["Google"]'::jsonb, '["Union Find"]'::jsonb, 
   534, 151, 78, true, '[]'::jsonb, true),
  (804, 'Unique Morse Code Words', 'International Morse Code defines a standard encoding where each letter is mapped to a series of dots and dashes, as follows: `"a"` maps to `".-"`, `"b"` maps to `"-..."`, `"c"` maps to `"-.-."`, and so on.

For convenience, the full table for the 26 letters of the English alphabet is given below:
[".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
Now, given a list of words, each word can be written as a concatenation of the Morse code of each letter. For example, "cab" can be written as "-.-..--...", (which is the concatenation "-.-." + ".-" + "`-...`"). We''ll call such a concatenation, the transformation of a word.

Return the number of different transformations among all words we have.


Example:
Input: words = ["gin", "zen", "gig", "msg"]
Output: 2
Explanation: 
The transformation of each word is:
"gin" -> "--...-."
"zen" -> "--...-."
"gig" -> "--...--."
"msg" -> "--...--."
There are 2 different transformations, "--...-." and "--...--.".

Note:
The length of `words` will be at most `100`.

Each `words[i]` will have length in range `[1, 12]`.

`words[i]` will only consist of lowercase letters.', false, 'Easy', '/articles/unique-morse-code-words', 79, 
   9.2, 'https://leetcode.com/problems/unique-morse-code-words', 999, 182.1, 230.4, '[]'::jsonb, '[]'::jsonb, 
   905, 830, 52, false, '[]'::jsonb, true),
  (805, 'Split Array With Same Average', 'You are given an integer array `nums`.

You should move each element of `nums` into one of the two arrays `A` and `B` such that `A` and `B` are non-empty, and `average(A) == average(B)`.

Return `true` if it is possible to achieve that and `false` otherwise.

Note that for an array `arr`, `average(arr)` is the sum of all the elements of `arr` over the length of `arr`.


Example 1:
Input: nums = [1,2,3,4,5,6,7,8]
Output: true
Explanation: We can split the array into [1,4,5,8] and [2,3,6,7], and both of them have an average of 4.5.


Example 2:
Input: nums = [3,1]
Output: false

Constraints:
`1 <= nums.length <= 30`
`0 <= nums[i] <= 104`', false, 'Hard', '/articles/split-array-with-same-average', 26.9, 
   7.9, 'https://leetcode.com/problems/split-array-with-same-average', 127, 19.3, 71.7, '["Apple"]'::jsonb, '["Math"]'::jsonb, 
   506, 94, 84, true, '[]'::jsonb, true),
  (806, 'Number of Lines To Write String', 'You are given a string `s` of lowercase English letters and an array `widths` denoting how many pixels wide each lowercase English letter is. Specifically, `widths[0]` is the width of `''a''`, `widths[1]` is the width of `''b''`, and so on.

You are trying to write `s` across several lines, where each line is no longer than `100` pixels. Starting at the beginning of `s`, write as many letters on the first line such that the total width does not exceed `100` pixels. Then, from where you stopped in `s`, continue writing as many letters as you can on the second line. Continue this process until you have written all of `s`.

Return an array `result` of length 2 where:
`result[0]` is the total number of lines.

`result[1]` is the width of the last line in pixels.


Example 1:
Input: widths = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], s = "abcdefghijklmnopqrstuvwxyz"
Output: [3,60]
Explanation: You can write s as follows:
abcdefghij  // 100 pixels wide
klmnopqrst  // 100 pixels wide
uvwxyz      // 60 pixels wide
There are a total of 3 lines, and the last line is 60 pixels wide.


Example 2:
Input: widths = [4,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], s = "bbbcccdddaaa"
Output: [2,4]
Explanation: You can write s as follows:
bbbcccdddaa  // 98 pixels wide
a            // 4 pixels wide
There are a total of 2 lines, and the last line is 4 pixels wide.


Constraints:
`widths.length == 26`
`2 <= widths[i] <= 10`
`1 <= s.length <= 1000`
`s` contains only lowercase English letters.', false, 'Easy', '/articles/number-of-lines-to-write-string', 65.5, 
   0, 'https://leetcode.com/problems/number-of-lines-to-write-string', 393, 42.9, 65.5, '["Google"]'::jsonb, '[]'::jsonb, 
   285, 982, 22, true, '[]'::jsonb, true),
  (807, 'Max Increase to Keep City Skyline', 'In a 2 dimensional array `grid`, each value `grid[i][j]` represents the height of a building located there. We are allowed to increase the height of any number of buildings, by any amount (the amounts can be different for different buildings). Height 0 is considered to be a building as well. 
At the end, the "skyline" when viewed from all four directions of the grid, i.e. top, bottom, left, and right, must be the same as the skyline of the original grid. A city''s skyline is the outer contour of the rectangles formed by all the buildings when viewed from a distance. See the following example.

What is the maximum total sum that the height of the buildings can be increased?

Example:
Input: grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]
Output: 35
Explanation: 
The grid is:
[ [3, 0, 8, 4], 
  [2, 4, 5, 7],
  [9, 2, 6, 3],
  [0, 3, 1, 0] ]
The skyline viewed from top or bottom is: [9, 4, 8, 7]
The skyline viewed from left or right is: [8, 7, 9, 3]
The grid after increasing the height of buildings without affecting skylines is:
gridNew = [ [8, 4, 8, 7],
            [7, 4, 7, 7],
            [9, 4, 8, 7],
            [3, 3, 3, 3] ]
Notes: 
`1 < grid.length = grid[0].length <= 50`.

All heights `grid[i][j]` are in the range `[0, 100]`.

All buildings in `grid[i][j]` occupy the entire grid cell: that is, they are a `1 x 1 x grid[i][j]` rectangular prism.', false, 'Medium', '/articles/max-increase-to-keep-city-skyline', 84.4, 
   16.5, 'https://leetcode.com/problems/max-increase-to-keep-city-skyline', 618, 99.7, 118.1, '["Google"]'::jsonb, '[]'::jsonb, 
   1116, 332, 77, true, '[]'::jsonb, true),
  (808, 'Soup Servings', 'There are two types of soup: type A and type B. Initially we have `N` ml of each type of soup. There are four kinds of operations:
Serve 100 ml of soup A and 0 ml of soup B
Serve 75 ml of soup A and 25 ml of soup B
Serve 50 ml of soup A and 50 ml of soup B
Serve 25 ml of soup A and 75 ml of soup B
When we serve some soup, we give it to someone and we no longer have it.  Each turn, we will choose from the four operations with equal probability 0.25. If the remaining volume of soup is not enough to complete the operation, we will serve as much as we can.  We stop once we no longer have some quantity of both types of soup.

Note that we do not have the operation where all 100 ml''s of soup B are used first.  
Return the probability that soup A will be empty first, plus half the probability that A and B become empty at the same time.


Example:
Input: N = 50
Output: 0.625
Explanation: 
If we choose the first two operations, A will become empty first. For the third operation, A and B will become empty at the same time. For the fourth operation, B will become empty first. So the total probability of A becoming empty first plus half the probability that A and B become empty at the same time, is 0.25 * (1 + 1 + 0.5 + 0) = 0.625.

Notes: 
`0 <= N <= 10^9`. 
Answers within `10^-6` of the true value will be accepted as correct.', false, 'Medium', '/articles/soup-servings', 41.1, 
   0, 'https://leetcode.com/problems/soup-servings', 79, 11.8, 28.7, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   196, 615, 24, true, '[]'::jsonb, true),
  (809, 'Expressive Words', 'Sometimes people repeat letters to represent extra feeling, such as "hello" -> "heeellooo", "hi" -> "hiiii".  In these strings like "heeellooo", we have groups of adjacent letters that are all the same:  "h", "eee", "ll", "ooo".

For some given string `S`, a query word is stretchy if it can be made to be equal to `S` by any number of applications of the following extension operation: choose a group consisting of characters `c`, and add some number of characters `c` to the group so that the size of the group is 3 or more.

For example, starting with "hello", we could do an extension on the group "o" to get "hellooo", but we cannot get "helloo" since the group "oo" has size less than 3.  Also, we could do another extension like "ll" -> "lllll" to get "helllllooo".  If `S = "helllllooo"`, then the query word "hello" would be stretchy because of these two extension operations: `query = "hello" -> "hellooo" -> "helllllooo" = S`.

Given a list of query words, return the number of words that are stretchy. 

Example:
Input: 
S = "heeellooo"
words = ["hello", "hi", "helo"]
Output: 1
Explanation: 
We can extend "e" and "o" in the word "hello" to get "heeellooo".

We can''t extend "helo" to get "heeellooo" because the group "ll" is not size 3 or more.


Constraints:
`0 <= len(S) <= 100`.

`0 <= len(words) <= 100`.

`0 <= len(words[i]) <= 100`.

`S` and all words in `words` consist only of lowercase letters', false, 'Medium', '/articles/expressive-words', 46.4, 
   16.9, 'https://leetcode.com/problems/expressive-words', 368, 65.5, 141.1, '["Google"]'::jsonb, '["String"]'::jsonb, 
   463, 1116, 29, true, '[]'::jsonb, true),
  (810, 'Chalkboard XOR Game', 'We are given non-negative integers nums[i] which are written on a chalkboard.  Alice and Bob take turns erasing exactly one number from the chalkboard, with Alice starting first.  If erasing a number causes the bitwise XOR of all the elements of the chalkboard to become 0, then that player loses.  (Also, we''ll say the bitwise XOR of one element is that element itself, and the bitwise XOR of no elements is 0.)
Also, if any player starts their turn with the bitwise XOR of all the elements of the chalkboard equal to 0, then that player wins.

Return True if and only if Alice wins the game, assuming both players play optimally.


Example:
Input: nums = [1, 1, 2]
Output: false
Explanation: 
Alice has two choices: erase 1 or erase 2. 
If she erases 1, the nums array becomes [1, 2]. The bitwise XOR of all the elements of the chalkboard is 1 XOR 2 = 3. Now Bob can remove any element he wants, because Alice will be the one to erase the last element and she will lose. 
If Alice erases 2 first, now nums becomes [1, 1]. The bitwise XOR of all the elements of the chalkboard is 1 XOR 1 = 0. Alice will lose.

Notes: 
`1 <= N <= 1000`. 
`0 <= nums[i] <= 2^16`.', false, 'Hard', '/articles/chalkboard-xor-game', 50.2, 
   4.8, 'https://leetcode.com/problems/chalkboard-xor-game', 41, 5, 9.9, '["Garena"]'::jsonb, '["Math"]'::jsonb, 
   80, 197, 29, false, '[]'::jsonb, true),
  (811, 'Subdomain Visit Count', 'A website domain like "discuss.leetcode.com" consists of various subdomains. At the top level, we have "com", at the next level, we have "leetcode.com", and at the lowest level, "discuss.leetcode.com". When we visit a domain like "discuss.leetcode.com", we will also visit the parent domains "leetcode.com" and "com" implicitly.

Now, call a "count-paired domain" to be a count (representing the number of visits this domain received), followed by a space, followed by the address. An example of a count-paired domain might be "9001 discuss.leetcode.com".

We are given a list `cpdomains` of count-paired domains. We would like a list of count-paired domains, (in the same format as the input, and in any order), that explicitly counts the number of visits to each subdomain.


Example 1:
Input: 
["9001 discuss.leetcode.com"]
Output: 
["9001 discuss.leetcode.com", "9001 leetcode.com", "9001 com"]
Explanation: 
We only have one website domain: "discuss.leetcode.com". As discussed above, the subdomain "leetcode.com" and "com" will also be visited. So they will all be visited 9001 times.


Example 2:
Input: 
["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
Output: 
["901 mail.com","50 yahoo.com","900 google.mail.com","5 wiki.org","5 org","1 intel.mail.com","951 com"]
Explanation: 
We will visit "google.mail.com" 900 times, "yahoo.com" 50 times, "intel.mail.com" once and "wiki.org" 5 times. For the subdomains, we will visit "mail.com" 900 + 1 = 901 times, "com" 900 + 50 + 1 = 951 times, and "org" 5 times.

Notes: 
The length of `cpdomains` will not exceed `100`. 
The length of each domain name will not exceed `100`.

Each address will have either 1 or 2 "." characters.

The input count in any count-paired domain will not exceed `10000`.

The answer output can be returned in any order.', false, 'Easy', '/articles/subdomain-visit-count', 71.7, 
   73.2, 'https://leetcode.com/problems/subdomain-visit-count', 747, 118.5, 165.3, '["Karat,Wayfair,Indeed,Intuit,Pinterest,Roblox"]'::jsonb, '["Hash Table"]'::jsonb, 
   680, 840, 45, false, '[]'::jsonb, true),
  (812, 'Largest Triangle Area', 'You have a list of points in the plane. Return the area of the largest triangle that can be formed by any 3 of the points.


Example:
Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
Output: 2
Explanation: 
The five points are show in the figure below. The red triangle is the largest.

Notes: 
`3 <= points.length <= 50`.

No points will be duplicated.

 `-50 <= points[i][j] <= 50`.

Answers within `10^-6` of the true value will be accepted as correct.', false, 'Easy', '/articles/largest-triangle-area', 59.1, 
   8.4, 'https://leetcode.com/problems/largest-triangle-area', 145, 25.8, 43.6, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   238, 1112, 18, true, '[]'::jsonb, true),
  (813, 'Largest Sum of Averages', 'We partition a row of numbers `A` into at most `K` adjacent (non-empty) groups, then our score is the sum of the average of each group. What is the largest score we can achieve?
Note that our partition must use every number in A, and that scores are not necessarily integers.


Example:
Input: 
A = [9,1,2,3,9]
K = 3
Output: 20
Explanation: 
The best choice is to partition A into [9], [1, 2, 3], [9]. The answer is 9 + (1 + 2 + 3) / 3 + 9 = 20.

We could have also partitioned A into [9, 1], [2], [3, 9], for example.

That partition would lead to a score of 5 + 2 + 6 = 13, which is worse.

Note: 
`1 <= A.length <= 100`.

`1 <= A[i] <= 10000`.

`1 <= K <= A.length`.

Answers within `10^-6` of the correct answer will be accepted as correct.', false, 'Medium', '/articles/largest-sum-of-averages', 51.2, 
   18.3, 'https://leetcode.com/problems/largest-sum-of-averages', 241, 31.1, 60.8, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1183, 55, 96, true, '[]'::jsonb, true),
  (814, 'Binary Tree Pruning', 'We are given the head node `root` of a binary tree, where additionally every node''s value is either a 0 or a 1.

Return the same tree where every subtree (of the given tree) not containing a 1 has been removed.

(Recall that the subtree of a node X is X, plus every node that is a descendant of X.)

Example 1:
Input: [1,null,0,0,1]
Output: [1,null,0,null,1]
Explanation: 
Only the red nodes satisfy the property "every subtree not containing a 1".

The diagram on the right represents the answer.


Example 2:
Input: [1,0,1,0,0,0,1]
Output: [1,null,1,null,1]

Example 3:
Input: [1,1,0,1,1,0,1,0]
Output: [1,1,0,1,1,null,1]
Note: 
The binary tree will have at most `200 nodes`.

The value of each node will only be `0` or `1`.', false, 'Medium', '/articles/binary-tree-pruning', 72.1, 
   10.4, 'https://leetcode.com/problems/binary-tree-pruning', 822, 84.9, 117.7, '["Amazon,Facebook"]'::jsonb, '["Tree"]'::jsonb, 
   1397, 53, 96, true, '[]'::jsonb, true),
  (815, 'Bus Routes', 'You are given an array `routes` representing bus routes where `routes[i]` is a bus route that the `ith` bus repeats forever.

For example, if `routes[0] = [1, 5, 7]`, this means that the `0th` bus travels in the sequence `1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1 -> ...` forever.

You will start at the bus stop `source` (You are not on any bus initially), and you want to go to the bus stop `target`. You can travel between bus stops by buses only.

Return the least number of buses you must take to travel from `source` to `target`. Return `-1` if it is not possible.


Example 1:
Input: routes = [[1,2,7],[3,6,7]], source = 1, target = 6
Output: 2
Explanation: The best strategy is take the first bus to the bus stop 7, then take the second bus to the bus stop 6.


Example 2:
Input: routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target = 12
Output: -1

Constraints:
`1 <= routes.length <= 500`.

`1 <= routes[i].length <= 105`
All the values of `routes[i]` are unique.

`sum(routes[i].length) <= 105`
`0 <= routes[i][j] < 106`
`0 <= source, target < 106`', false, 'Hard', '/articles/bus-routes', 43.6, 
   42.7, 'https://leetcode.com/problems/bus-routes', 234, 48.4, 111.1, '["Amazon,Square,Uber"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   1072, 33, 97, true, '[]'::jsonb, true),
  (816, 'Ambiguous Coordinates', 'We had some 2-dimensional coordinates, like `"(1, 3)"` or `"(2, 0.5)"`.  Then, we removed all commas, decimal points, and spaces, and ended up with the string `S`.  Return a list of strings representing all possibilities for what our original coordinates could have been.

Our original representation never had extraneous zeroes, so we never started with numbers like "00", "0.0", "0.00", "1.0", "001", "00.01", or any other number that can be represented with less digits.  Also, a decimal point within a number never occurs without at least one digit occuring before it, so we never started with numbers like ".1".

The final answer list can be returned in any order.  Also note that all coordinates in the final answer have exactly one space between them (occurring after the comma.)

Example 1:
Input: "(123)"
Output: ["(1, 23)", "(12, 3)", "(1.2, 3)", "(1, 2.3)"]

Example 2:
Input: "(00011)"
Output:  ["(0.001, 1)", "(0, 0.011)"]
Explanation: 
0.0, 00, 0001 or 00.01 are not allowed.


Example 3:
Input: "(0123)"
Output: ["(0, 123)", "(0, 12.3)", "(0, 1.23)", "(0.1, 23)", "(0.1, 2.3)", "(0.12, 3)"]

Example 4:
Input: "(100)"
Output: [(10, 0)]
Explanation: 
1.0 is not allowed.

Note: 
`4 <= S.length <= 12`.

`S[0]` = "(", `S[S.length - 1]` = ")", and the other elements in `S` are digits.', false, 'Medium', '/articles/ambiguous-coordinates', 48.2, 
   0, 'https://leetcode.com/problems/ambiguous-coordinates', 75, 11.3, 23.4, '["Google"]'::jsonb, '["String"]'::jsonb, 
   135, 248, 35, true, '[]'::jsonb, true),
  (817, 'Linked List Components', 'We are given `head`, the head node of a linked list containing unique integer values.

We are also given the list `G`, a subset of the values in the linked list.

Return the number of connected components in `G`, where two values are connected if they appear consecutively in the linked list.


Example 1:
Input: 
head: 0->1->2->3
G = [0, 1, 3]
Output: 2
Explanation: 
0 and 1 are connected, so [0, 1] and [3] are the two connected components.


Example 2:
Input: 
head: 0->1->2->3->4
G = [0, 3, 1, 4]
Output: 2
Explanation: 
0 and 1 are connected, 3 and 4 are connected, so [0, 1] and [3, 4] are the two connected components.

Note: 
If `N` is the length of the linked list given by `head`, `1 <= N <= 10000`.

The value of each node in the linked list will be in the range` [0, N - 1]`.

`1 <= G.length <= 10000`.

`G` is a subset of all values in the linked list.', false, 'Medium', '/articles/linked-list-components', 57.8, 
   16.2, 'https://leetcode.com/problems/linked-list-components', 425, 54.8, 94.8, '["Google"]'::jsonb, '["Linked List"]'::jsonb, 
   493, 1339, 27, true, '[]'::jsonb, true),
  (818, 'Race Car', 'Your car starts at position 0 and speed +1 on an infinite number line.  (Your car can go into negative positions.)
Your car drives automatically according to a sequence of instructions A (accelerate) and R (reverse).

When you get an instruction "A", your car does the following: `position += speed, speed *= 2`.

When you get an instruction "R", your car does the following: if your speed is positive then `speed = -1` , otherwise `speed = 1`.  (Your position stays the same.)
For example, after commands "AAR", your car goes to positions 0->1->3->3, and your speed goes to 1->2->4->-1.

Now for some target position, say the length of the shortest sequence of instructions to get there.


Example 1:
Input: 
target = 3
Output: 2
Explanation: 
The shortest instruction sequence is "AA".

Your position goes from 0->1->3.


Example 2:
Input: 
target = 6
Output: 5
Explanation: 
The shortest instruction sequence is "AAARA".

Your position goes from 0->1->3->7->7->6.

Note: 
`1 <= target <= 10000`.', false, 'Hard', '/articles/race-car', 40.3, 
   13.5, 'https://leetcode.com/problems/race-car', 102, 24.4, 60.5, '["Google"]'::jsonb, '["Dynamic Programming,Heap"]'::jsonb, 
   632, 69, 90, true, '[]'::jsonb, true),
  (819, 'Most Common Word', 'Given a string `paragraph` and a string array of the banned words `banned`, return the most frequent word that is not banned. It is guaranteed there is at least one word that is not banned, and that the answer is unique.

The words in `paragraph` are case-insensitive and the answer should be returned in lowercase.


Example 1:
Input: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]
Output: "ball"
Explanation: 
"hit" occurs 3 times, but it is a banned word.

"ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph. 
Note that words in the paragraph are not case sensitive,
that punctuation is ignored (even if adjacent to words, such as "ball,"), 
and that "hit" isn''t the answer even though it occurs more because it is banned.


Example 2:
Input: paragraph = "a.", banned = []
Output: "a"

Constraints:
`1 <= paragraph.length <= 1000`
paragraph consists of English letters, space `'' ''`, or one of the symbols: `"!?'',;."`.

`0 <= banned.length <= 100`
`1 <= banned[i].length <= 10`
`banned[i]` consists of only lowercase English letters.', false, 'Easy', '/articles/most-common-word', 45.5, 
   20.9, 'https://leetcode.com/problems/most-common-word', 999, 225.7, 496.2, '["Amazon"]'::jsonb, '["String"]'::jsonb, 
   948, 2069, 31, true, '[]'::jsonb, true),
  (820, 'Short Encoding of Words', 'A valid encoding of an array of `words` is any reference string `s` and array of indices `indices` such that:
`words.length == indices.length`
The reference string `s` ends with the `''#''` character.

For each index `indices[i]`, the substring of `s` starting from `indices[i]` and up to (but not including) the next `''#''` character is equal to `words[i]`.

Given an array of `words`, return the length of the shortest reference string `s` possible of any valid encoding of `words`.


Example 1:
Input: words = ["time", "me", "bell"]
Output: 10
Explanation: A valid encoding would be s = `"time#bell#" and indices = [0, 2, 5`].

words[0] = "time", the substring of s starting from indices[0] = 0 to the next ''#'' is underlined in "time#bell#"
words[1] = "me", the substring of s starting from indices[1] = 2 to the next ''#'' is underlined in "time#bell#"
words[2] = "bell", the substring of s starting from indices[2] = 5 to the next ''#'' is underlined in "time#bell#"

Example 2:
Input: words = ["t"]
Output: 2
Explanation: A valid encoding would be s = "t#" and indices = [0].


Constraints:
`1 <= words.length <= 2000`
`1 <= words[i].length <= 7`
`words[i]` consists of only lowercase letters.', false, 'Medium', '/articles/short-encoding-of-words', 55, 
   10.4, 'https://leetcode.com/problems/short-encoding-of-words', 287, 40.5, 73.7, '[]'::jsonb, '[]'::jsonb, 
   595, 215, 73, false, '[]'::jsonb, true),
  (821, 'Shortest Distance to a Character', 'Given a string `s` and a character `c` that occurs in `s`, return an array of integers `answer` where `answer.length == s.length` and `answer[i]` is the distance from index `i` to the closest occurrence of character `c` in `s`.

The distance between two indices `i` and `j` is `abs(i - j)`, where `abs` is the absolute value function.


Example 1:
Input: s = "loveleetcode", c = "e"
Output: [3,2,1,0,1,0,0,1,2,2,1,0]
Explanation: The character ''e'' appears at indices 3, 5, 6, and 11 (0-indexed).

The closest occurrence of ''e'' for index 0 is at index 3, so the distance is abs(0 - 3) = 3.

The closest occurrence of ''e'' for index 1 is at index 3, so the distance is abs(1 - 3) = 3.

For index 4, there is a tie between the ''e'' at index 3 and the ''e'' at index 5, but the distance is still the same: abs(4 - 3) == abs(4 - 5) = 1.

The closest occurrence of ''e'' for index 8 is at index 6, so the distance is abs(8 - 6) = 2.


Example 2:
Input: s = "aaab", c = "b"
Output: [3,2,1,0]

Constraints:
`1 <= s.length <= 104`
`s[i]` and `c` are lowercase English letters.

It is guaranteed that `c` occurs at least once in `s`.', false, 'Easy', '/articles/shortest-distance-to-a-character', 70.1, 
   28.1, 'https://leetcode.com/problems/shortest-distance-to-a-character', 999, 105.2, 150.2, '["Apple"]'::jsonb, '[]'::jsonb, 
   1586, 98, 94, true, '[]'::jsonb, true),
  (822, 'Card Flipping Game', 'On a table are `N` cards, with a positive integer printed on the front and back of each card (possibly different).

We flip any number of cards, and after we choose one card. 
If the number `X` on the back of the chosen card is not on the front of any card, then this number X is good.

What is the smallest number that is good?  If no number is good, output `0`.

Here, `fronts[i]` and `backs[i]` represent the number on the front and back of card `i`. 
A flip swaps the front and back numbers, so the value on the front is now on the back and vice versa.


Example:
Input: fronts = [1,2,4,4,7], backs = [1,3,4,1,3]
Output: `2`
Explanation: If we flip the second card, the fronts are `[1,3,4,4,7]` and the backs are `[1,2,4,1,3]`.

We choose the second card, which has number 2 on the back, and it isn''t on the front of any card, so `2` is good.

Note:
`1 <= fronts.length == backs.length <= 1000`.

`1 <= fronts[i] <= 2000`.

`1 <= backs[i] <= 2000`.', false, 'Medium', '/articles/card-flipping-game', 43.8, 
   11.1, 'https://leetcode.com/problems/card-flipping-game', 86, 10.7, 24.5, '[]'::jsonb, '[]'::jsonb, 
   86, 524, 14, false, '[]'::jsonb, true),
  (823, 'Binary Trees With Factors', 'Given an array of unique integers, `arr`, where each integer `arr[i]` is strictly greater than `1`.

We make a binary tree using these integers, and each number may be used for any number of times. Each non-leaf node''s value should be equal to the product of the values of its children.

Return the number of binary trees we can make. The answer may be too large so return the answer modulo `109 + 7`.


Example 1:
Input: arr = [2,4]
Output: 3
Explanation: We can make these trees: `[2], [4], [4, 2, 2]`

Example 2:
Input: arr = [2,4,5,10]
Output: 7
Explanation: We can make these trees: `[2], [4], [5], [10], [4, 2, 2], [10, 2, 5], [10, 5, 2]`.


Constraints:
`1 <= arr.length <= 1000`
`2 <= arr[i] <= 109`
All the values of `arr` are unique.', false, 'Medium', '/articles/binary-trees-with-factors', 43.7, 
   3.3, 'https://leetcode.com/problems/binary-trees-with-factors', 195, 31.9, 73, '[]'::jsonb, '[]'::jsonb, 
   677, 87, 89, false, '[]'::jsonb, true),
  (824, 'Goat Latin', 'A sentence `S` is given, composed of words separated by spaces. Each word consists of lowercase and uppercase letters only.

We would like to convert the sentence to "Goat Latin" (a made-up language similar to Pig Latin.)
The rules of Goat Latin are as follows:
If a word begins with a vowel (a, e, i, o, or u), append `"ma"` to the end of the word.

	For example, the word ''apple'' becomes ''applema''.

	 
If a word begins with a consonant (i.e. not a vowel), remove the first letter and append it to the end, then add `"ma"`.

	For example, the word `"goat"` becomes `"oatgma"`.

	 
Add one letter `''a''` to the end of each word per its word index in the sentence, starting with 1.

	For example, the first word gets `"a"` added to the end, the second word gets `"aa"` added to the end and so on.

Return the final sentence representing the conversion from `S` to Goat Latin. 

Example 1:
Input: "I speak Goat Latin"
Output: "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"

Example 2:
Input: "The quick brown fox jumped over the lazy dog"
Output: "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa"
Notes:
`S` contains only uppercase, lowercase and spaces. Exactly one space between each word.

`1 <= S.length <= 150`.', false, 'Easy', '/articles/goat-latin', 66.9, 
   8.7, 'https://leetcode.com/problems/goat-latin', 973, 116.2, 173.7, '["Facebook"]'::jsonb, '["String"]'::jsonb, 
   503, 934, 35, true, '[]'::jsonb, true),
  (825, 'Friends Of Appropriate Ages', 'Some people will make friend requests. The list of their ages is given and `ages[i]` is the age of the ith person. 
Person A will NOT friend request person B (B != A) if any of the following conditions are true:
`age[B] <= 0.5 * age[A] + 7`
`age[B] > age[A]`
`age[B] > 100 && age[A] < 100`
Otherwise, A will friend request B.

Note that if A requests B, B does not necessarily request A.  Also, people will not friend request themselves.

How many total friend requests are made?

Example 1:
Input: [16,16]
Output: 2
Explanation: 2 people friend request each other.


Example 2:
Input: [16,17,18]
Output: 2
Explanation: Friend requests are made 17 -> 16, 18 -> 17.


Example 3:
Input: [20,30,100,110,120]
Output: 3
Explanation: Friend requests are made 110 -> 100, 120 -> 110, 120 -> 100.

Notes:
`1 <= ages.length <= 20000`.

`1 <= ages[i] <= 120`.', false, 'Medium', '/articles/friends-of-appropriate-ages', 44.3, 
   14.1, 'https://leetcode.com/problems/friends-of-appropriate-ages', 184, 47.6, 107.6, '["Facebook"]'::jsonb, '["Array"]'::jsonb, 
   396, 814, 33, true, '[]'::jsonb, true),
  (826, 'Most Profit Assigning Work', 'We have jobs: `difficulty[i]` is the difficulty of the `i`th job, and `profit[i]` is the profit of the `i`th job. 
Now we have some workers. `worker[i]` is the ability of the `i`th worker, which means that this worker can only complete a job with difficulty at most `worker[i]`. 
Every worker can be assigned at most one job, but one job can be completed multiple times.

For example, if 3 people attempt the same job that pays $1, then the total profit will be $3.  If a worker cannot complete any job, his profit is $0.

What is the most profit we can make?

Example 1:
Input: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
Output: 100 
Explanation: Workers are assigned jobs of difficulty [4,4,6,6] and they get profit of [20,20,30,30] seperately.

Notes:
`1 <= difficulty.length = profit.length <= 10000`
`1 <= worker.length <= 10000`
`difficulty[i], profit[i], worker[i]`  are in range `[1, 10^5]`', false, 'Medium', '/articles/most-profit-assigning-work', 39.3, 
   3.9, 'https://leetcode.com/problems/most-profit-assigning-work', 213, 25.6, 65.2, '["Amazon"]'::jsonb, '["Two Pointers"]'::jsonb, 
   500, 79, 86, true, '[]'::jsonb, true),
  (827, 'Making A Large Island', 'You are given an `n x n` binary matrix `grid`. You are allowed to change at most one `0` to be `1`.

Return the size of the largest island in `grid` after applying this operation.

An island is a 4-directionally connected group of `1`s.


Example 1:
Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.


Example 2:
Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.


Example 3:
Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can''t change any 0 to 1, only one island with area = 4.


Constraints:
`n == grid.length`
`n == grid[i].length`
`1 <= n <= 500`
`grid[i][j]` is either `0` or `1`.', false, 'Hard', '/articles/making-a-large-island', 47.3, 
   36.3, 'https://leetcode.com/problems/making-a-large-island', 290, 31.1, 65.9, '["Facebook,Google,Amazon"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   712, 22, 97, true, '[]'::jsonb, true),
  (828, 'Count Unique Characters of All Substrings of a Given String', 'Let''s define a function `countUniqueChars(s)` that returns the number of unique characters on `s`, for example if `s = "LEETCODE"` then `"L"`, `"T"`,`"C"`,`"O"`,`"D"` are the unique characters since they appear only once in `s`, therefore `countUniqueChars(s) = 5`.

On this problem given a string `s` we need to return the sum of `countUniqueChars(t)` where `t` is a substring of `s`. Notice that some substrings can be repeated so on this case you have to count the repeated ones too.

Since the answer can be very large, return the answer modulo `10 ^ 9 + 7`.


Example 1:
Input: s = "ABC"
Output: 10
Explanation: All possible substrings are: "A","B","C","AB","BC" and "ABC".

Evey substring is composed with only unique letters.

Sum of lengths of all substring is 1 + 1 + 1 + 2 + 2 + 3 = 10

Example 2:
Input: s = "ABA"
Output: 8
Explanation: The same as example 1, except `countUniqueChars`("ABA") = 1.


Example 3:
Input: s = "LEETCODE"
Output: 92

Constraints:
`0 <= s.length <= 10^4`
`s` contain upper-case English letters only.', false, 'Hard', '/articles/unique-letter-string', 46.9, 
   27.7, 'https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string', 127, 15.2, 32.4, '["Microsoft"]'::jsonb, '["Two Pointers"]'::jsonb, 
   608, 61, 91, false, '[]'::jsonb, true),
  (829, 'Consecutive Numbers Sum', 'Given a positive integer `N`, how many ways can we write it as a sum of consecutive positive integers?

Example 1:
Input: 5
Output: 2
Explanation: 5 = 5 = 2 + 3

Example 2:
Input: 9
Output: 3
Explanation: 9 = 9 = 4 + 5 = 2 + 3 + 4

Example 3:
Input: 15
Output: 4
Explanation: 15 = 15 = 8 + 7 = 4 + 5 + 6 = 1 + 2 + 3 + 4 + 5
Note: `1 <= N <= 10 ^ 9`.', false, 'Hard', '/articles/consecutive-numbers-sum', 39.3, 
   86.1, 'https://leetcode.com/problems/consecutive-numbers-sum', 236, 44.9, 114.3, '["Citadel,Visa,Amazon,Nvidia"]'::jsonb, '["Math"]'::jsonb, 
   598, 750, 44, true, '[]'::jsonb, true),
  (830, 'Positions of Large Groups', 'In a string `s` of lowercase letters, these letters form consecutive groups of the same character.

For example, a string like `s = "abbxxxxzyy"` has the groups `"a"`, `"bb"`, `"xxxx"`, `"z"`, and `"yy"`.

A group is identified by an interval `[start, end]`, where `start` and `end` denote the start and end indices (inclusive) of the group. In the above example, `"xxxx"` has the interval `[3,6]`.

A group is considered large if it has 3 or more characters.

Return the intervals of every large group sorted in increasing order by start index.


Example 1:
Input: s = "abbxxxxzzy"
Output: [[3,6]]
Explanation: `"xxxx" is the only `large group with start index 3 and end index 6.


Example 2:
Input: s = "abc"
Output: []
Explanation: We have groups "a", "b", and "c", none of which are large groups.


Example 3:
Input: s = "abcdddeeeeaabbbcd"
Output: [[3,5],[6,9],[12,14]]
Explanation: The large groups are "ddd", "eeee", and "bbb".


Example 4:
Input: s = "aba"
Output: []

Constraints:
`1 <= s.length <= 1000`
`s` contains lower-case English letters only.', false, 'Easy', '/articles/positions-of-large-groups', 50.5, 
   0, 'https://leetcode.com/problems/positions-of-large-groups', 519, 55.9, 110.8, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   468, 100, 82, true, '[]'::jsonb, true),
  (831, 'Masking Personal Information', 'We are given a personal information string `S`, which may represent either an email address or a phone number.

We would like to mask this personal information according to the following rules:
1. Email address:
We define a name to be a string of `length ≥ 2` consisting of only lowercase letters `a-z` or uppercase letters `A-Z`.

An email address starts with a name, followed by the symbol `''@''`, followed by a name, followed by the dot `''.''` and followed by a name. 
All email addresses are guaranteed to be valid and in the format of `"name1@name2.name3".`
To mask an email, all names must be converted to lowercase and all letters between the first and last letter of the first name must be replaced by 5 asterisks `''*''`.

2. Phone number:
A phone number is a string consisting of only the digits `0-9` or the characters from the set `{''+'', ''-'', ''('', '')'', '' ''}.` You may assume a phone number contains 10 to 13 digits.

The last 10 digits make up the local number, while the digits before those make up the country code. Note that the country code is optional. We want to expose only the last 4 digits and mask all other digits.

The local number should be formatted and masked as `"***-***-1111", `where `1` represents the exposed digits.

To mask a phone number with country code like `"+111 111 111 1111"`, we write it in the form `"+***-***-***-1111".`  The `''+''` sign and the first `''-''` sign before the local number should only exist if there is a country code.  For example, a 12 digit phone number mask should start with `"+**-"`.

Note that extraneous characters like `"(", ")", " "`, as well as extra dashes or plus signs not part of the above formatting scheme should be removed.

Return the correct "mask" of the information provided.


Example 1:
Input: "LeetCode@LeetCode.com"
Output: "l*****e@leetcode.com"
Explanation: All names are converted to lowercase, and the letters between the
             first and last letter of the first name is replaced by 5 asterisks.

             Therefore, "leetcode" -> "l*****e".


Example 2:
Input: "AB@qq.com"
Output: "a*****b@qq.com"
Explanation: There must be 5 asterisks between the first and last letter 
             of the first name "ab". Therefore, "ab" -> "a*****b".


Example 3:
Input: "1(234)567-890"
Output: "***-***-7890"
Explanation: 10 digits in the phone number, which means all digits make up the local number.


Example 4:
Input: "86-(10)12345678"
Output: "+**-***-***-5678"
Explanation: 12 digits, 2 digits for country code and 10 digits for local number. 
Notes:
`S.length <= 40`.

Emails have length at least 8.

Phone numbers have length at least 10.', false, 'Medium', '/articles/masking-personal-information', 44.8, 
   0, 'https://leetcode.com/problems/masking-personal-information', 112, 12.1, 27, '["Twitter"]'::jsonb, '["String"]'::jsonb, 
   92, 352, 21, false, '[]'::jsonb, true),
  (832, 'Flipping an Image', 'Given an `n x n` binary matrix `image`, flip the image horizontally, then invert it, and return the resulting image.

To flip an image horizontally means that each row of the image is reversed.

For example, flipping `[1,1,0]` horizontally results in `[0,1,1]`.

To invert an image means that each `0` is replaced by `1`, and each `1` is replaced by `0`.

For example, inverting `[0,1,1]` results in `[1,0,0]`.


Example 1:
Input: image = [[1,1,0],[1,0,1],[0,0,0]]
Output: [[1,0,0],[0,1,0],[1,1,1]]
Explanation: First reverse each row: [[0,1,1],[1,0,1],[0,0,0]].

Then, invert the image: [[1,0,0],[0,1,0],[1,1,1]]

Example 2:
Input: image = [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
Explanation: First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]].

Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]

Constraints:
`n == image.length`
`n == image[i].length`
`1 <= n <= 20`
`images[i][j]` is either `0` or `1`.', false, 'Easy', '/articles/flipping-an-image', 78.3, 
   17.7, 'https://leetcode.com/problems/flipping-an-image', 999, 233.4, 298.2, '["Facebook,Microsoft"]'::jsonb, '["Array"]'::jsonb, 
   1310, 179, 88, true, '[]'::jsonb, true),
  (833, 'Find And Replace in String', 'To some string `S`, we will perform some replacement operations that replace groups of letters with new ones (not necessarily the same size).

Each replacement operation has `3` parameters: a starting index `i`, a source word `x` and a target word `y`.  The rule is that if `x` starts at position `i` in the original string `S`, then we will replace that occurrence of `x` with `y`.  If not, we do nothing.

For example, if we have `S = "abcd"` and we have some replacement operation `i = 2, x = "cd", y = "ffff"`, then because `"cd"` starts at position `2` in the original string `S`, we will replace it with `"ffff"`.

Using another example on `S = "abcd"`, if we have both the replacement operation `i = 0, x = "ab", y = "eee"`, as well as another replacement operation `i = 2, x = "ec", y = "ffff"`, this second operation does nothing because in the original string `S[2] = ''c''`, which doesn''t match `x[0] = ''e''`.

All these operations occur simultaneously.  It''s guaranteed that there won''t be any overlap in replacement: for example, `S = "abc", indexes = [0, 1], sources = ["ab","bc"]` is not a valid test case.


Example 1:
Input: S = "abcd", indexes = [0, 2], sources = ["a", "cd"], targets = ["eee", "ffff"]
Output: "eeebffff"
Explanation:
"a" starts at index 0 in S, so it''s replaced by "eee".

"cd" starts at index 2 in S, so it''s replaced by "ffff".


Example 2:
Input: S = "abcd", indexes = [0, 2], sources = ["ab","ec"], targets = ["eee","ffff"]
Output: "eeecd"
Explanation:
"ab" starts at index 0 in S, so it''s replaced by "eee".

"ec" doesn''t starts at index 2 in the original S, so we do nothing.


Constraints:
`0 <= S.length <= 1000`
`S` consists of only lowercase English letters.

`0 <= indexes.length <= 100`
`0 <= indexes[i] < S.length`
`sources.length == indexes.length`
`targets.length == indexes.length`
`1 <= sources[i].length, targets[i].length <= 50`
`sources[i]` and `targets[i]` consist of only lowercase English letters.', false, 'Medium', '/articles/find-and-replace-in-string', 51.5, 
   22, 'https://leetcode.com/problems/find-and-replace-in-string', 407, 59.4, 115.3, '["Google"]'::jsonb, '["String"]'::jsonb, 
   452, 524, 46, true, '[]'::jsonb, true),
  (834, 'Sum of Distances in Tree', 'An undirected, connected tree with `N` nodes labelled `0...N-1` and `N-1` `edges` are given.

The `i`th edge connects nodes `edges[i][0] `and` edges[i][1]` together.

Return a list `ans`, where `ans[i]` is the sum of the distances between node `i` and all other nodes.


Example 1:
Input: N = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
Output: [8,12,6,10,10,10]
Explanation: 
Here is a diagram of the given tree:
  0
 / \\
1   2
   /|\\
  3 4 5
We can see that dist(0,1) + dist(0,2) + dist(0,3) + dist(0,4) + dist(0,5)
equals 1 + 1 + 2 + 2 + 2 = 8.  Hence, answer[0] = 8, and so on.

Note: `1 <= N <= 10000`', false, 'Hard', '/articles/sum-of-distances-in-tree', 46.5, 
   19.4, 'https://leetcode.com/problems/sum-of-distances-in-tree', 115, 19.9, 42.7, '["Google"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   1218, 46, 96, true, '[]'::jsonb, true),
  (835, 'Image Overlap', 'You are given two images `img1` and `img2` both of size `n x n`, represented as binary, square matrices of the same size. (A binary matrix has only 0s and 1s as values.)
We translate one image however we choose (sliding it left, right, up, or down any number of units), and place it on top of the other image.  After, the overlap of this translation is the number of positions that have a 1 in both images.

(Note also that a translation does not include any kind of rotation.)
What is the largest possible overlap?

Example 1:
Input: img1 = [[1,1,0],[0,1,0],[0,1,0]], img2 = [[0,0,0],[0,1,1],[0,0,1]]
Output: 3
Explanation: We slide img1 to right by 1 unit and down by 1 unit.

The number of positions that have a 1 in both images is 3. (Shown in red)

Example 2:
Input: img1 = [[1]], img2 = [[1]]
Output: 1

Example 3:
Input: img1 = [[0]], img2 = [[0]]
Output: 0

Constraints:
`n == img1.length`
`n == img1[i].length`
`n == img2.length `
`n == img2[i].length`
`1 <= n <= 30`
`img1[i][j]` is `0` or `1`.

`img2[i][j]` is `0` or `1`.', false, 'Medium', '/articles/image-overlap', 61.7, 
   17.3, 'https://leetcode.com/problems/image-overlap', 270, 43.5, 70.6, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   576, 766, 43, true, '[]'::jsonb, true),
  (836, 'Rectangle Overlap', 'An axis-aligned rectangle is represented as a list `[x1, y1, x2, y2]`, where `(x1, y1)` is the coordinate of its bottom-left corner, and `(x2, y2)` is the coordinate of its top-right corner. Its top and bottom edges are parallel to the X-axis, and its left and right edges are parallel to the Y-axis.

Two rectangles overlap if the area of their intersection is positive. To be clear, two rectangles that only touch at the corner or edges do not overlap.

Given two axis-aligned rectangles `rec1` and `rec2`, return `true` if they overlap, otherwise return `false`.


Example 1:
Input: rec1 = [0,0,2,2], rec2 = [1,1,3,3]
Output: true

Example 2:
Input: rec1 = [0,0,1,1], rec2 = [1,0,2,1]
Output: false

Example 3:
Input: rec1 = [0,0,1,1], rec2 = [2,2,3,3]
Output: false

Constraints:
`rect1.length == 4`
`rect2.length == 4`
`-109 <= rec1[i], rec2[i] <= 109`
`rec1[0] <= rec1[2]` and `rec1[1] <= rec1[3]`
`rec2[0] <= rec2[2]` and `rec2[1] <= rec2[3]`', false, 'Easy', '/articles/rectangle-overlap', 43.7, 
   39.5, 'https://leetcode.com/problems/rectangle-overlap', 330, 73.1, 167.2, '["Microsoft,Amazon,Google"]'::jsonb, '["Math"]'::jsonb, 
   988, 286, 78, true, '[]'::jsonb, true),
  (837, 'New 21 Game', 'Alice plays the following game, loosely based on the card game "21".

Alice starts with `0` points, and draws numbers while she has less than `K` points.  During each draw, she gains an integer number of points randomly from the range `[1, W]`, where `W` is an integer.  Each draw is independent and the outcomes have equal probabilities.

Alice stops drawing numbers when she gets `K` or more points.  What is the probability that she has `N` or less points?

Example 1:
Input: N = 10, K = 1, W = 10
Output: 1.00000
Explanation:  Alice gets a single card, then stops.


Example 2:
Input: N = 6, K = 1, W = 10
Output: 0.60000
Explanation:  Alice gets a single card, then stops.

In 6 out of W = 10 possibilities, she is at or below N = 6 points.


Example 3:
Input: N = 21, K = 17, W = 10
Output: 0.73278
Note:
`0 <= K <= N <= 10000`
`1 <= W <= 10000`
Answers will be accepted as correct if they are within `10^-5` of the correct answer.

The judging time limit has been reduced for this question.', false, 'Medium', '/articles/new-21-game', 35.4, 
   13.2, 'https://leetcode.com/problems/new-21-game', 82, 21.6, 61, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   685, 410, 63, true, '[]'::jsonb, true),
  (838, 'Push Dominoes', 'There are `N` dominoes in a line, and we place each domino vertically upright.

In the beginning, we simultaneously push some of the dominoes either to the left or to the right.

After each second, each domino that is falling to the left pushes the adjacent domino on the left.

Similarly, the dominoes falling to the right push their adjacent dominoes standing on the right.

When a vertical domino has dominoes falling on it from both sides, it stays still due to the balance of the forces.

For the purposes of this question, we will consider that a falling domino expends no additional force to a falling or already fallen domino.

Given a string "S" representing the initial state. `S[i] = ''L''`, if the i-th domino has been pushed to the left; `S[i] = ''R''`, if the i-th domino has been pushed to the right; `S[i] = ''.''`, if the `i`-th domino has not been pushed.

Return a string representing the final state. 

Example 1:
Input: ".L.R...LR..L.."
Output: "LL.RR.LLRRLL.."

Example 2:
Input: "RR.L"
Output: "RR.L"
Explanation: The first domino expends no additional force on the second domino.

Note:
`0 <= N <= 10^5`
String `dominoes` contains only `''L`'', `''R''` and `''.''`', false, 'Medium', '/articles/push-dominoes', 50, 
   18.3, 'https://leetcode.com/problems/push-dominoes', 295, 27.5, 55.1, '["Google"]'::jsonb, '["Two Pointers,Dynamic Programming"]'::jsonb, 
   834, 78, 91, true, '[]'::jsonb, true),
  (839, 'Similar String Groups', 'Two strings `X` and `Y` are similar if we can swap two letters (in different positions) of `X`, so that it equals `Y`. Also two strings `X` and `Y` are similar if they are equal.

For example, `"tars"` and `"rats"` are similar (swapping at positions `0` and `2`), and `"rats"` and `"arts"` are similar, but `"star"` is not similar to `"tars"`, `"rats"`, or `"arts"`.

Together, these form two connected groups by similarity: `{"tars", "rats", "arts"}` and `{"star"}`.  Notice that `"tars"` and `"arts"` are in the same group even though they are not similar.  Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.

We are given a list `strs` of strings where every string in `strs` is an anagram of every other string in `strs`. How many groups are there?

Example 1:
Input: strs = ["tars","rats","arts","star"]
Output: 2

Example 2:
Input: strs = ["omv","ovm"]
Output: 1

Constraints:
`1 <= strs.length <= 300`
`1 <= strs[i].length <= 300`
`strs[i]` consists of lowercase letters only.

All words in `strs` have the same length and are anagrams of each other.', false, 'Hard', '/articles/similar-string-groups', 41.6, 
   14.6, 'https://leetcode.com/problems/similar-string-groups', 266, 35.2, 84.7, '["Facebook"]'::jsonb, '["Depth-first Search,Union Find,Graph"]'::jsonb, 
   514, 148, 78, true, '[]'::jsonb, true),
  (840, 'Magic Squares In Grid', 'A `3 x 3` magic square is a `3 x 3` grid filled with distinct numbers from `1` to `9` such that each row, column, and both diagonals all have the same sum.

Given a `row x col` `grid` of integers, how many `3 x 3` "magic square" subgrids are there?  (Each subgrid is contiguous).


Example 1:
Input: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
Output: 1
Explanation: 
The following subgrid is a 3 x 3 magic square:
while this one is not:
In total, there is only one magic square inside the given grid.


Example 2:
Input: grid = [[8]]
Output: 0

Example 3:
Input: grid = [[4,4],[3,3]]
Output: 0

Example 4:
Input: grid = [[4,7,8],[9,5,1],[2,3,6]]
Output: 0

Constraints:
`row == grid.length`
`col == grid[i].length`
`1 <= row, col <= 10`
`0 <= grid[i][j] <= 15`', false, 'Medium', '/articles/magic-squares-in-grid', 37.9, 
   10.8, 'https://leetcode.com/problems/magic-squares-in-grid', 239, 28.1, 74.4, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   190, 1341, 12, true, '[]'::jsonb, true),
  (841, 'Keys and Rooms', 'There are `N` rooms and you start in room `0`.  Each room has a distinct number in `0, 1, 2, ..., N-1`, and each room may have some keys to access the next room. 
Formally, each room `i` has a list of keys `rooms[i]`, and each key `rooms[i][j]` is an integer in `[0, 1, ..., N-1]` where `N = rooms.length`.  A key `rooms[i][j] = v` opens the room with number `v`.

Initially, all the rooms start locked (except for room `0`). 
You can walk back and forth between rooms freely.

Return `true` if and only if you can enter every room.


Example 1:
Input: [[1],[2],[3],[]]
Output: true
Explanation:  
We start in room 0, and pick up key 1.

We then go to room 1, and pick up key 2.

We then go to room 2, and pick up key 3.

We then go to room 3.  Since we were able to go to every room, we return true.


Example 2:
Input: [[1,3],[3,0,1],[2],[0]]
Output: false
Explanation: We can''t enter the room with number 2.

Note:
`1 <= rooms.length <= 1000`
`0 <= rooms[i].length <= 1000`
The number of keys in all rooms combined is at most `3000`.', false, 'Medium', '/articles/keys-and-rooms', 66.4, 
   5.2, 'https://leetcode.com/problems/keys-and-rooms', 999, 125.1, 188.3, '["Amazon,Twitch"]'::jsonb, '["Depth-first Search,Graph"]'::jsonb, 
   1776, 125, 93, true, '[]'::jsonb, true),
  (842, 'Split Array into Fibonacci Sequence', 'Given a string `S` of digits, such as `S = "123456579"`, we can split it into a Fibonacci-like sequence `[123, 456, 579].`
Formally, a Fibonacci-like sequence is a list `F` of non-negative integers such that:
`0 <= F[i] <= 2^31 - 1`, (that is, each integer fits a 32-bit signed integer type);
`F.length >= 3`;
and` F[i] + F[i+1] = F[i+2] `for all `0 <= i < F.length - 2`.

Also, note that when splitting the string into pieces, each piece must not have extra leading zeroes, except if the piece is the number 0 itself.

Return any Fibonacci-like sequence split from `S`, or return `[]` if it cannot be done.


Example 1:
Input: "123456579"
Output: [123,456,579]

Example 2:
Input: "11235813"
Output: [1,1,2,3,5,8,13]

Example 3:
Input: "112358130"
Output: []
Explanation: The task is impossible.


Example 4:
Input: "0123"
Output: []
Explanation: Leading zeroes are not allowed, so "01", "2", "3" is not valid.


Example 5:
Input: "1101111"
Output: [110, 1, 111]
Explanation: The output [11, 0, 11, 11] would also be accepted.

Note: 
`1 <= S.length <= 200`
`S` contains only digits.', false, 'Medium', '/articles/split-array-into-fibonacci-sequence', 37, 
   5.6, 'https://leetcode.com/problems/split-array-into-fibonacci-sequence', 229, 25, 67.7, '["Amazon"]'::jsonb, '["String,Backtracking,Greedy"]'::jsonb, 
   615, 202, 75, true, '[]'::jsonb, true),
  (843, 'Guess the Word', 'This is an interactive problem.

You are given an array of unique strings `wordlist` where `wordlist[i]` is `6` letters long, and one word in this list is chosen as `secret`.

You may call `Master.guess(word)` to guess a word. The guessed word should have type `string` and must be from the original list with `6` lowercase letters.

This function returns an `integer` type, representing the number of exact matches (value and position) of your guess to the `secret` word. Also, if your guess is not in the given wordlist, it will return `-1` instead.

For each test case, you have exactly `10` guesses to guess the word. At the end of any number of calls, if you have made `10` or fewer calls to `Master.guess` and at least one of these guesses was `secret`, then you pass the test case.


Example 1:
Input: secret = "acckzz", wordlist = ["acckzz","ccbazz","eiowzz","abcczz"], numguesses = 10
Output: You guessed the secret word correctly.
Explanation:
master.guess("aaaaaa") returns -1, because "aaaaaa" is not in wordlist.

master.guess("acckzz") returns 6, because "acckzz" is secret and has all 6 matches.

master.guess("ccbazz") returns 3, because "ccbazz" has 3 matches.

master.guess("eiowzz") returns 2, because "eiowzz" has 2 matches.

master.guess("abcczz") returns 4, because "abcczz" has 4 matches.

We made 5 calls to master.guess and one of them was the secret, so we pass the test case.


Example 2:
Input: secret = "hamada", wordlist = ["hamada","khaled"], numguesses = 10
Output: You guessed the secret word correctly.

Constraints:
`1 <= wordlist.length <= 100`
`wordlist[i].length == 6`
`wordlist[i]` consist of lowercase English letters.

All the strings of `wordlist` are unique.

`secret` exists in `wordlist`.

`numguesses == 10`', false, 'Hard', '/articles/guess-the-word', 46.4, 
   67.2, 'https://leetcode.com/problems/guess-the-word', 237, 71.6, 154.3, '["Google"]'::jsonb, '["Minimax"]'::jsonb, 
   778, 789, 50, true, '[]'::jsonb, true),
  (844, 'Backspace String Compare', 'Given two strings `s` and `t`, return `true` if they are equal when both are typed into empty text editors. `''#''` means a backspace character.

Note that after backspacing an empty text, the text will continue empty.


Example 1:
Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both s and t become "ac".


Example 2:
Input: s = "ab##", t = "c#d#"
Output: true
Explanation: Both s and t become "".


Example 3:
Input: s = "a##c", t = "#a#c"
Output: true
Explanation: Both s and t become "c".


Example 4:
Input: s = "a#c", t = "b"
Output: false
Explanation: s becomes "c" while t becomes "b".


Constraints:
`1 <= s.length, t.length <= 200`
`s` and `t` only contain lowercase letters and `''#''` characters.

Follow up: Can you solve it in `O(n)` time and `O(1)` space?', false, 'Easy', '/articles/backspace-string-compare', 47.2, 
   36.4, 'https://leetcode.com/problems/backspace-string-compare', 999, 285, 604.4, '["Facebook,Google,Amazon,Oracle"]'::jsonb, '["Two Pointers,Stack"]'::jsonb, 
   2383, 113, 95, true, '[]'::jsonb, true),
  (845, 'Longest Mountain in Array', 'You may recall that an array `arr` is a mountain array if and only if:
`arr.length >= 3`
There exists some index `i` (0-indexed) with `0 < i < arr.length - 1` such that:
	
`arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
`arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`
Given an integer array `arr`, return the length of the longest subarray, which is a mountain. Return `0` if there is no mountain subarray.


Example 1:
Input: arr = [2,1,4,7,3,2,5]
Output: 5
Explanation: The largest mountain is [1,4,7,3,2] which has length 5.


Example 2:
Input: arr = [2,2,2]
Output: 0
Explanation: There is no mountain.


Constraints:
`1 <= arr.length <= 104`
`0 <= arr[i] <= 104`
Follow up:
Can you solve it using only one pass?
Can you solve it in `O(1)` space?', false, 'Medium', '/articles/longest-mountain-in-array', 38.7, 
   32.1, 'https://leetcode.com/problems/longest-mountain-in-array', 598, 65.4, 169.1, '["Amazon,Paypal"]'::jsonb, '["Two Pointers"]'::jsonb, 
   1122, 43, 96, true, '[]'::jsonb, true),
  (846, 'Hand of Straights', 'Alice has a `hand` of cards, given as an array of integers.

Now she wants to rearrange the cards into groups so that each group is size `W`, and consists of `W` consecutive cards.

Return `true` if and only if she can.

Note: This question is the same as 1296: https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/

Example 1:
Input: hand = [1,2,3,6,2,3,4,7,8], W = 3
Output: true
Explanation: Alice''s hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]

Example 2:
Input: hand = [1,2,3,4,5], W = 4
Output: false
Explanation: Alice''s hand can''t be rearranged into groups of 4.


Constraints:
`1 <= hand.length <= 10000`
`0 <= hand[i] <= 10^9`
`1 <= W <= hand.length`', false, 'Medium', '/articles/hand-of-straights', 55.5, 
   15.5, 'https://leetcode.com/problems/hand-of-straights', 399, 68.5, 123.3, '["Apple,Google,eBay"]'::jsonb, '["Ordered Map"]'::jsonb, 
   942, 97, 91, true, '[]'::jsonb, true),
  (847, 'Shortest Path Visiting All Nodes', 'An undirected, connected graph of N nodes (labeled `0, 1, 2, ..., N-1`) is given as `graph`.

`graph.length = N`, and `j != i` is in the list `graph[i]` exactly once, if and only if nodes `i` and `j` are connected.

Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.


Example 1:
Input: [[1,2,3],[0],[0],[0]]
Output: 4
Explanation: One possible path is [1,0,2,0,3]

Example 2:
Input: [[1],[0,2,4],[1,3,4],[2],[1,2]]
Output: 4
Explanation: One possible path is [0,1,4,2,3]
Note:
`1 <= graph.length <= 12`
`0 <= graph[i].length < graph.length`', false, 'Hard', '/articles/shortest-path-visiting-all-nodes', 54.1, 
   19.8, 'https://leetcode.com/problems/shortest-path-visiting-all-nodes', 136, 21.7, 40.1, '["Google"]'::jsonb, '["Dynamic Programming,Breadth-first Search"]'::jsonb, 
   787, 84, 90, true, '[]'::jsonb, true),
  (848, 'Shifting Letters', 'We have a string `S` of lowercase letters, and an integer array `shifts`.

Call the shift of a letter, the next letter in the alphabet, (wrapping around so that `''z''` becomes `''a''`). 
For example, `shift(''a'') = ''b''`, `shift(''t'') = ''u''`, and `shift(''z'') = ''a''`.

Now for each `shifts[i] = x`, we want to shift the first `i+1` letters of `S`, `x` times.

Return the final string after all such shifts to `S` are applied.


Example 1:
Input: S = "abc", shifts = [3,5,9]
Output: "rpl"
Explanation: 
We start with "abc".

After shifting the first 1 letters of S by 3, we have "dbc".

After shifting the first 2 letters of S by 5, we have "igc".

After shifting the first 3 letters of S by 9, we have "rpl", the answer.

Note:
`1 <= S.length = shifts.length <= 20000`
`0 <= shifts[i] <= 10 ^ 9`', false, 'Medium', '/articles/shifting-letters', 45.2, 
   4.2, 'https://leetcode.com/problems/shifting-letters', 263, 29.3, 64.8, '[]'::jsonb, '[]'::jsonb, 
   370, 70, 84, false, '[]'::jsonb, true),
  (849, 'Maximize Distance to Closest Person', 'You are given an array representing a row of `seats` where `seats[i] = 1` represents a person sitting in the `ith` seat, and `seats[i] = 0` represents that the `ith` seat is empty (0-indexed).

There is at least one empty seat, and at least one person sitting.

Alex wants to sit in the seat such that the distance between him and the closest person to him is maximized. 
Return that maximum distance to the closest person.


Example 1:
Input: seats = [1,0,0,0,1,0,1]
Output: 2
Explanation: 
If Alex sits in the second open seat (i.e. seats[2]), then the closest person has distance 2.

If Alex sits in any other open seat, the closest person has distance 1.

Thus, the maximum distance to the closest person is 2.


Example 2:
Input: seats = [1,0,0,0]
Output: 3
Explanation: 
If Alex sits in the last seat (i.e. seats[3]), the closest person is 3 seats away.

This is the maximum distance possible, so the answer is 3.


Example 3:
Input: seats = [0,1]
Output: 1

Constraints:
`2 <= seats.length <= 2 * 104`
`seats[i]` is `0` or `1`.

At least one seat is empty.

At least one seat is occupied.', false, 'Medium', '/articles/maximize-distance-to-closest-person', 44.5, 
   27.3, 'https://leetcode.com/problems/maximize-distance-to-closest-person', 793, 103.6, 232.6, '["Yandex,Google,Amazon"]'::jsonb, '["Array"]'::jsonb, 
   1278, 128, 91, true, '[]'::jsonb, true),
  (850, 'Rectangle Area II', 'We are given a list of (axis-aligned) `rectangles`. Each `rectangle[i] = [xi1, yi1, xi2, yi2] `, where `(xi1, yi1)` are the coordinates of the bottom-left corner, and `(xi2, yi2)` are the coordinates of the top-right corner of the `ith` rectangle.

Find the total area covered by all `rectangles` in the plane. Since the answer may be too large, return it modulo `109 + 7`.


Example 1:
Input: rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
Output: 6
Explanation: As illustrated in the picture.


Example 2:
Input: rectangles = [[0,0,1000000000,1000000000]]
Output: 49
Explanation: The answer is 1018 modulo (109 + 7), which is (109)2 = (-7)2 = 49.


Constraints:
`1 <= rectangles.length <= 200`
`rectanges[i].length = 4`
`0 <= rectangles[i][j] <= 109`
The total area covered by all rectangles will never exceed `263 - 1` and thus will fit in a 64-bit signed integer.', false, 'Hard', '/articles/rectangle-area-ii', 48.4, 
   29.4, 'https://leetcode.com/problems/rectangle-area-ii', 84, 15.3, 31.6, '["Sumologic"]'::jsonb, '["Segment Tree,Line Sweep"]'::jsonb, 
   449, 32, 93, false, '[]'::jsonb, true),
  (851, 'Loud and Rich', 'In a group of N people (labelled `0, 1, 2, ..., N-1`), each person has different amounts of money, and different levels of quietness.

For convenience, we''ll call the person with label `x`, simply "person `x`".

We''ll say that `richer[i] = [x, y]` if person `x` definitely has more money than person `y`.  Note that `richer` may only be a subset of valid observations.

Also, we''ll say `quiet[x] = q` if person x has quietness `q`.

Now, return `answer`, where `answer[x] = y` if `y` is the least quiet person (that is, the person `y` with the smallest value of `quiet[y]`), among all people who definitely have equal to or more money than person `x`.


Example 1:
Input: richer = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], quiet = [3,2,5,4,6,1,7,0]
Output: [5,5,2,5,4,5,6,7]
Explanation: 
answer[0] = 5.

Person 5 has more money than 3, which has more money than 1, which has more money than 0.

The only person who is quieter (has lower quiet[x]) is person 7, but
it isn''t clear if they have more money than person 0.

answer[7] = 7.

Among all people that definitely have equal to or more money than person 7
(which could be persons 3, 4, 5, 6, or 7), the person who is the quietest (has lower quiet[x])
is person 7.

The other answers can be filled out with similar reasoning.

Note:
`1 <= quiet.length = N <= 500`
`0 <= quiet[i] < N`, all `quiet[i]` are different.

`0 <= richer.length <= N * (N-1) / 2`
`0 <= richer[i][j] < N`
`richer[i][0] != richer[i][1]`
`richer[i]`''s are all different.

The observations in `richer` are all logically consistent.', false, 'Medium', '/articles/loud-and-rich', 52.9, 
   8.9, 'https://leetcode.com/problems/loud-and-rich', 184, 15.1, 28.5, '["Amazon"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   318, 334, 49, true, '[]'::jsonb, true),
  (852, 'Peak Index in a Mountain Array', 'Let''s call an array `arr` a mountain if the following properties hold:
`arr.length >= 3`
There exists some `i` with `0 < i < arr.length - 1` such that:
	
`arr[0] < arr[1] < ... arr[i-1] < arr[i] `
`arr[i] > arr[i+1] > ... > arr[arr.length - 1]`
Given an integer array `arr` that is guaranteed to be a mountain, return any `i` such that `arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`.


Example 1:
Input: arr = [0,1,0]
Output: 1

Example 2:
Input: arr = [0,2,1,0]
Output: 1

Example 3:
Input: arr = [0,10,5,2]
Output: 1

Example 4:
Input: arr = [3,4,5,1]
Output: 2

Example 5:
Input: arr = [24,69,100,99,79,78,67,36,26,19]
Output: 2

Constraints:
`3 <= arr.length <= 104`
`0 <= arr[i] <= 106`
`arr` is guaranteed to be a mountain array.

Follow up: Finding the `O(n)` is straightforward, could you find an `O(log(n))` solution?', false, 'Easy', '/articles/peak-index-in-a-mountain-array', 71.8, 
   17.7, 'https://leetcode.com/problems/peak-index-in-a-mountain-array', 942, 219.4, 305.8, '["Bloomberg,Yahoo"]'::jsonb, '["Binary Search"]'::jsonb, 
   1027, 1360, 43, false, '[]'::jsonb, true),
  (853, 'Car Fleet', '`N` cars are going to the same destination along a one lane road.  The destination is `target` miles away.

Each car `i` has a constant speed `speed[i]` (in miles per hour), and initial position `position[i]` miles towards the target along the road.

A car can never pass another car ahead of it, but it can catch up to it, and drive bumper to bumper at the same speed.

The distance between these two cars is ignored - they are assumed to have the same position.

A car fleet is some non-empty set of cars driving at the same position and same speed.  Note that a single car is also a car fleet.

If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.

How many car fleets will arrive at the destination?

Example 1:
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
Explanation:
The cars starting at 10 and 8 become a fleet, meeting each other at 12.

The car starting at 0 doesn''t catch up to any other car, so it is a fleet by itself.

The cars starting at 5 and 3 become a fleet, meeting each other at 6.

Note that no other cars meet these fleets before the destination, so the answer is 3.

Note:
`0 <= N <= 10 ^ 4`
`0 < target <= 10 ^ 6`
`0 < speed[i] <= 10 ^ 6`
`0 <= position[i] < target`
All initial positions are different.', false, 'Medium', '/articles/car-fleet', 44.3, 
   35.9, 'https://leetcode.com/problems/car-fleet', 212, 38.6, 87.2, '["Google,Nutanix"]'::jsonb, '["Sort"]'::jsonb, 
   658, 272, 71, true, '[]'::jsonb, true),
  (854, 'K-Similar Strings', 'Strings `s1` and `s2` are `k`-similar (for some non-negative integer `k`) if we can swap the positions of two letters in `s1` exactly `k` times so that the resulting string equals `s2`.

Given two anagrams `s1` and `s2`, return the smallest `k` for which `s1` and `s2` are `k`-similar.


Example 1:
Input: s1 = "ab", s2 = "ba"
Output: 1

Example 2:
Input: s1 = "abc", s2 = "bca"
Output: 2

Example 3:
Input: s1 = "abac", s2 = "baca"
Output: 2

Example 4:
Input: s1 = "aabc", s2 = "abca"
Output: 2

Constraints:
`1 <= s1.length <= 20`
`s2.length == s1.length`
`s1` and `s2` contain only lowercase letters from the set `{''a'', ''b'', ''c'', ''d'', ''e'', ''f''}`.

`s2` is an anagram of `s1`.', false, 'Hard', '/articles/k-similar-strings', 38.8, 
   4.4, 'https://leetcode.com/problems/k-similar-strings', 143, 23.5, 60.5, '["Amazon"]'::jsonb, '["Breadth-first Search,Graph"]'::jsonb, 
   567, 43, 93, true, '[]'::jsonb, true),
  (855, 'Exam Room', 'In an exam room, there are `N` seats in a single row, numbered `0, 1, 2, ..., N-1`.

When a student enters the room, they must sit in the seat that maximizes the distance to the closest person.  If there are multiple such seats, they sit in the seat with the lowest number.  (Also, if no one is in the room, then the student sits at seat number 0.)
Return a class `ExamRoom(int N)` that exposes two functions: `ExamRoom.seat()` returning an `int` representing what seat the student sat in, and `ExamRoom.leave(int p)` representing that the student in seat number `p` now leaves the room.  It is guaranteed that any calls to `ExamRoom.leave(p)` have a student sitting in seat `p`.


Example 1:
Input: ["ExamRoom","seat","seat","seat","seat","leave","seat"], [[10],[],[],[],[],[4],[]]
Output: [null,0,9,4,2,null,5]
Explanation:
ExamRoom(10) -> null
seat() -> 0, no one is in the room, then the student sits at seat number 0.

seat() -> 9, the student sits at the last seat number 9.

seat() -> 4, the student sits at the last seat number 4.

seat() -> 2, the student sits at the last seat number 2.

leave(4) -> null
seat() -> 5, the student sits at the last seat number 5.

​​​​​​​
Note:
`1 <= N <= 10^9`
`ExamRoom.seat()` and `ExamRoom.leave()` will be called at most `10^4` times across all test cases.

Calls to `ExamRoom.leave(p)` are guaranteed to have a student currently sitting in seat number `p`.', false, 'Medium', '/articles/exam-room', 43.5, 
   19.4, 'https://leetcode.com/problems/exam-room', 185, 37.6, 86.5, '["Google"]'::jsonb, '["Ordered Map"]'::jsonb, 
   715, 296, 71, true, '[]'::jsonb, true),
  (856, 'Score of Parentheses', 'Given a balanced parentheses string `S`, compute the score of the string based on the following rule:
`()` has score 1
`AB` has score `A + B`, where A and B are balanced parentheses strings.

`(A)` has score `2 * A`, where A is a balanced parentheses string.


Example 1:
Input: "()"
Output: 1

Example 2:
Input: "(())"
Output: 2

Example 3:
Input: "()()"
Output: 2

Example 4:
Input: "(()(()))"
Output: 6
Note:
`S` is a balanced parentheses string, containing only `(` and `)`.

`2 <= S.length <= 50`', false, 'Medium', '/articles/score-of-parentheses', 64.9, 
   26.3, 'https://leetcode.com/problems/score-of-parentheses', 614, 72.8, 112.2, '["Google"]'::jsonb, '["String,Stack"]'::jsonb, 
   2088, 69, 97, true, '[]'::jsonb, true),
  (857, 'Minimum Cost to Hire K Workers', 'There are `N` workers.  The `i`-th worker has a `quality[i]` and a minimum wage expectation `wage[i]`.

Now we want to hire exactly `K` workers to form a paid group.  When hiring a group of K workers, we must pay them according to the following rules:
Every worker in the paid group should be paid in the ratio of their quality compared to other workers in the paid group.

Every worker in the paid group must be paid at least their minimum wage expectation.

Return the least amount of money needed to form a paid group satisfying the above conditions.


Example 1:
Input: quality = [10,20,5], wage = [70,50,30], K = 2
Output: 105.00000
Explanation: We pay 70 to 0-th worker and 35 to 2-th worker.


Example 2:
Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], K = 3
Output: 30.66667
Explanation: We pay 4 to 0-th worker, 13.33333 to 2-th and 3-th workers seperately. 
Note:
`1 <= K <= N <= 10000`, where `N = quality.length = wage.length`
`1 <= quality[i] <= 10000`
`1 <= wage[i] <= 10000`
Answers within `10^-5` of the correct answer will be considered correct.', false, 'Hard', '/articles/minimum-cost-to-hire-k-workers', 50.5, 
   23.6, 'https://leetcode.com/problems/minimum-cost-to-hire-k-workers', 132, 37.8, 74.8, '["Google"]'::jsonb, '["Heap"]'::jsonb, 
   1142, 134, 89, true, '[]'::jsonb, true),
  (858, 'Mirror Reflection', 'There is a special square room with mirrors on each of the four walls.  Except for the southwest corner, there are receptors on each of the remaining corners, numbered `0`, `1`, and `2`.

The square room has walls of length `p`, and a laser ray from the southwest corner first meets the east wall at a distance `q` from the `0`th receptor.

Return the number of the receptor that the ray meets first.  (It is guaranteed that the ray will meet a receptor eventually.)

Example 1:
Input: p = 2, q = 1
Output: 2
Explanation: The ray meets receptor 2 the first time it gets reflected back to the left wall.

Note:
`1 <= p <= 1000`
`0 <= q <= p`', false, 'Medium', '/articles/mirror-reflection', 59.7, 
   24.1, 'https://leetcode.com/problems/mirror-reflection', 165, 24.1, 40.4, '["Facebook"]'::jsonb, '["Math"]'::jsonb, 
   327, 654, 33, true, '[]'::jsonb, true),
  (859, 'Buddy Strings', 'Given two strings `a` and `b`, return `true` if you can swap two letters in `a` so the result is equal to `b`, otherwise, return `false`.

Swapping letters is defined as taking two indices `i` and `j` (0-indexed) such that `i != j` and swapping the characters at `a[i]` and `b[j]`. For example, swapping at indices `0` and `2` in `"abcd"` results in `"cbad"`.


Example 1:
Input: a = "ab", b = "ba"
Output: true
Explanation: You can swap a[0] = ''a'' and a[1] = ''b'' to get "ba", which is equal to b.


Example 2:
Input: a = "ab", b = "ab"
Output: false
Explanation: The only letters you can swap are a[0] = ''a'' and a[1] = ''b'', which results in "ba" != b.


Example 3:
Input: a = "aa", b = "aa"
Output: true
Explanation: You can swap a[0] = ''a'' and a[1] = ''a'' to get "aa", which is equal to b.


Example 4:
Input: a = "aaaaaaabc", b = "aaaaaaacb"
Output: true

Constraints:
`1 <= a.length, b.length <= 2 * 104`
`a` and `b` consist of lowercase letters.', false, 'Easy', '/articles/buddy-strings', 29.1, 
   9.9, 'https://leetcode.com/problems/buddy-strings', 663, 88, 302.2, '["Facebook"]'::jsonb, '["String"]'::jsonb, 
   928, 671, 58, true, '[]'::jsonb, true),
  (860, 'Lemonade Change', 'At a lemonade stand, each lemonade costs `$5`. 
Customers are standing in a queue to buy from you, and order one at a time (in the order specified by `bills`).

Each customer will only buy one lemonade and pay with either a `$5`, `$10`, or `$20` bill.  You must provide the correct change to each customer, so that the net transaction is that the customer pays $5.

Note that you don''t have any change in hand at first.

Return `true` if and only if you can provide every customer with correct change.


Example 1:
Input: [5,5,5,10,20]
Output: true
Explanation: 
From the first 3 customers, we collect three $5 bills in order.

From the fourth customer, we collect a $10 bill and give back a $5.

From the fifth customer, we give a $10 bill and a $5 bill.

Since all customers got correct change, we output true.


Example 2:
Input: [5,5,10]
Output: true

Example 3:
Input: [10,10]
Output: false

Example 4:
Input: [5,5,10,10,20]
Output: false
Explanation: 
From the first two customers in order, we collect two $5 bills.

For the next two customers in order, we collect a $10 bill and give back a $5 bill.

For the last customer, we can''t give change of $15 back because we only have two $10 bills.

Since not every customer received correct change, the answer is false.

Note:
`0 <= bills.length <= 10000`
`bills[i]` will be either `5`, `10`, or `20`.', false, 'Easy', '/articles/lemonade-change', 51.9, 
   17.3, 'https://leetcode.com/problems/lemonade-change', 491, 70.2, 135.4, '["Atlassian"]'::jsonb, '["Greedy"]'::jsonb, 
   811, 94, 90, false, '[]'::jsonb, true),
  (861, 'Score After Flipping Matrix', 'We have a two dimensional matrix `A` where each value is `0` or `1`.

A move consists of choosing any row or column, and toggling each value in that row or column: changing all `0`s to `1`s, and all `1`s to `0`s.

After making any number of moves, every row of this matrix is interpreted as a binary number, and the score of the matrix is the sum of these numbers.

Return the highest possible score.


Example 1:
Input: [[0,0,1,1],[1,0,1,0],[1,1,0,0]]
Output: 39
Explanation:
Toggled to [[1,1,1,1],[1,0,0,1],[1,1,1,1]].

0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39
Note:
`1 <= A.length <= 20`
`1 <= A[0].length <= 20`
`A[i][j]` is `0` or `1`.', false, 'Medium', '/articles/score-after-flipping-matrix', 73.8, 
   22.1, 'https://leetcode.com/problems/score-after-flipping-matrix', 251, 26.4, 35.8, '["Amazon"]'::jsonb, '["Greedy"]'::jsonb, 
   660, 140, 82, true, '[]'::jsonb, true),
  (862, 'Shortest Subarray with Sum at Least K', 'Return the length of the shortest, non-empty, contiguous subarray of `A` with sum at least `K`.

If there is no non-empty subarray with sum at least `K`, return `-1`.


Example 1:
Input: A = [1], K = 1
Output: 1

Example 2:
Input: A = [1,2], K = 4
Output: -1

Example 3:
Input: A = [2,-1,2], K = 3
Output: 3
Note:
`1 <= A.length <= 50000`
`-10 ^ 5 <= A[i] <= 10 ^ 5`
`1 <= K <= 10 ^ 9`', false, 'Hard', '/articles/shortest-subarray-with-sum-at-least-k', 25.3, 
   46.6, 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k', 179, 45.1, 178.2, '["Goldman Sachs"]'::jsonb, '["Binary Search,Queue"]'::jsonb, 
   1714, 39, 98, false, '[]'::jsonb, true),
  (863, 'All Nodes Distance K in Binary Tree', 'We are given a binary tree (with root node `root`), a `target` node, and an integer value `K`.

Return a list of the values of all nodes that have a distance `K` from the `target` node.  The answer can be returned in any order.


Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2
Output: [7,4,1]
Explanation: 
The nodes that are a distance 2 from the target node (with value 5)
have values 7, 4, and 1.

Note that the inputs "root" and "target" are actually TreeNodes.

The descriptions of the inputs above are just serializations of these objects.

Note:
The given tree is non-empty.

Each node in the tree has unique values `0 <= node.val <= 500`.

The `target` node is a node in the tree.

`0 <= K <= 1000`.', false, 'Medium', '/articles/all-nodes-distance-k-in-binary-tree', 58.2, 
   63, 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree', 999, 128.5, 220.9, '["Amazon,Facebook,Google"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   3408, 70, 98, true, '[]'::jsonb, true),
  (864, 'Shortest Path to Get All Keys', 'We are given a 2-dimensional `grid`. `"."` is an empty cell, `"#"` is a wall, `"@"` is the starting point, (`"a"`, `"b"`, ...) are keys, and (`"A"`, `"B"`, ...) are locks.

We start at the starting point, and one move consists of walking one space in one of the 4 cardinal directions.  We cannot walk outside the grid, or walk into a wall.  If we walk over a key, we pick it up.  We can''t walk over a lock unless we have the corresponding key.

For some 1 <= K <= 6, there is exactly one lowercase and one uppercase letter of the first `K` letters of the English alphabet in the grid.  This means that there is exactly one key for each lock, and one lock for each key; and also that the letters used to represent the keys and locks were chosen in the same order as the English alphabet.

Return the lowest number of moves to acquire all keys.  If it''s impossible, return `-1`.


Example 1:
Input: ["@.a.#","###.#","b.A.B"]
Output: 8

Example 2:
Input: ["@..aA","..B#.","....b"]
Output: 6
Note:
`1 <= grid.length <= 30`
`1 <= grid[0].length <= 30`
`grid[i][j]` contains only` ''.''`, `''#''`, `''@''`, `''a''-``''f``''` and `''A''-''F''`
The number of keys is in `[1, 6]`.  Each key has a different letter and opens exactly one lock.', false, 'Hard', '/articles/shortest-path-to-get-all-keys', 42.4, 
   36.8, 'https://leetcode.com/problems/shortest-path-to-get-all-keys', 139, 15.6, 36.7, '["ByteDance,Airbnb"]'::jsonb, '["Heap,Breadth-first Search"]'::jsonb, 
   543, 19, 97, false, '[]'::jsonb, true),
  (865, 'Smallest Subtree with all the Deepest Nodes', 'Given the `root` of a binary tree, the depth of each node is the shortest distance to the root.

Return the smallest subtree such that it contains all the deepest nodes in the original tree.

A node is called the deepest if it has the largest depth possible among any node in the entire tree.

The subtree of a node is tree consisting of that node, plus the set of all descendants of that node.

Note: This question is the same as 1123: https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explanation: We return the node with value 2, colored in yellow in the diagram.

The nodes coloured in blue are the deepest nodes of the tree.

Notice that nodes 5, 3 and 2 contain the deepest nodes in the tree but node 2 is the smallest subtree among them, so we return it.


Example 2:
Input: root = [1]
Output: [1]
Explanation: The root is the deepest node in the tree.


Example 3:
Input: root = [0,1,3,null,2]
Output: [2]
Explanation: The deepest node in the tree is 2, the valid subtrees are the subtrees of nodes 2, 1 and 0 but the subtree of node 2 is the smallest.


Constraints:
The number of nodes in the tree will be in the range `[1, 500]`.

`0 <= Node.val <= 500`
The values of the nodes in the tree are unique.', false, 'Medium', '/articles/smallest-subtree-with-all-the-deepest-nodes', 65, 
   8, 'https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes', 621, 72.6, 111.7, '["Facebook"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search,Recursion"]'::jsonb, 
   1277, 291, 81, true, '[]'::jsonb, true),
  (866, 'Prime Palindrome', 'Find the smallest prime palindrome greater than or equal to `N`.

Recall that a number is prime if it''s only divisors are 1 and itself, and it is greater than 1. 
For example, 2,3,5,7,11 and 13 are primes.

Recall that a number is a palindrome if it reads the same from left to right as it does from right to left. 
For example, 12321 is a palindrome.


Example 1:
Input: 6
Output: 7

Example 2:
Input: 8
Output: 11

Example 3:
Input: 13
Output: 101
Note:
`1 <= N <= 10^8`
The answer is guaranteed to exist and be less than `2 * 10^8`.', false, 'Medium', '/articles/prime-palindrome', 25, 
   0, 'https://leetcode.com/problems/prime-palindrome', 97, 21.4, 85.4, '["Amazon"]'::jsonb, '["Math"]'::jsonb, 
   238, 624, 28, true, '[]'::jsonb, true),
  (867, 'Transpose Matrix', 'Given a 2D integer array `matrix`, return the transpose of `matrix`.

The transpose of a matrix is the matrix flipped over its main diagonal, switching the matrix''s row and column indices.


Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[1,4,7],[2,5,8],[3,6,9]]

Example 2:
Input: matrix = [[1,2,3],[4,5,6]]
Output: [[1,4],[2,5],[3,6]]

Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 1000`
`1 <= m * n <= 105`
`-109 <= matrix[i][j] <= 109`', false, 'Easy', '/articles/transpose-matrix', 62, 
   11.8, 'https://leetcode.com/problems/transpose-matrix', 557, 97.2, 156.8, '["Apple,Microsoft,Nvidia,Citadel"]'::jsonb, '["Array"]'::jsonb, 
   626, 330, 65, true, '[]'::jsonb, true),
  (868, 'Binary Gap', 'Given a positive integer `n`, find and return the longest distance between any two adjacent `1`''s in the binary representation of `n`. If there are no two adjacent `1`''s, return `0`.

Two `1`''s are adjacent if there are only `0`''s separating them (possibly no `0`''s). The distance between two `1`''s is the absolute difference between their bit positions. For example, the two `1`''s in `"1001"` have a distance of 3.


Example 1:
Input: n = 22
Output: 2
Explanation: 22 in binary is "10110".

The first adjacent pair of 1''s is "10110" with a distance of 2.

The second adjacent pair of 1''s is "10110" with a distance of 1.

The answer is the largest of these two distances, which is 2.

Note that "10110" is not a valid pair since there is a 1 separating the two 1''s underlined.


Example 2:
Input: n = 5
Output: 2
Explanation: 5 in binary is "101".


Example 3:
Input: n = 6
Output: 1
Explanation: 6 in binary is "110".


Example 4:
Input: n = 8
Output: 0
Explanation: 8 in binary is "1000".

There aren''t any adjacent pairs of 1''s in the binary representation of 8, so we return 0.


Example 5:
Input: n = 1
Output: 0

Constraints:
`1 <= n <= 109`', false, 'Easy', '/articles/binary-gap', 61, 
   0, 'https://leetcode.com/problems/binary-gap', 506, 46.3, 75.9, '["Twitter,eBay"]'::jsonb, '["Math"]'::jsonb, 
   290, 552, 34, false, '[]'::jsonb, true),
  (869, 'Reordered Power of 2', 'You are given an integer `n`. We reorder the digits in any order (including the original order) such that the leading digit is not zero.

Return `true` if and only if we can do this so that the resulting number is a power of two.


Example 1:
Input: n = 1
Output: true

Example 2:
Input: n = 10
Output: false

Example 3:
Input: n = 16
Output: true

Example 4:
Input: n = 24
Output: false

Example 5:
Input: n = 46
Output: true

Constraints:
`1 <= n <= 109`', false, 'Medium', '/articles/reordered-power-of-2', 61.2, 
   0.2, 'https://leetcode.com/problems/reordered-power-of-2', 371, 35.6, 58.2, '[]'::jsonb, '[]'::jsonb, 
   422, 147, 74, false, '[]'::jsonb, true),
  (870, 'Advantage Shuffle', 'Given two arrays `A` and `B` of equal size, the advantage of `A` with respect to `B` is the number of indices `i` for which `A[i] > B[i]`.

Return any permutation of `A` that maximizes its advantage with respect to `B`.


Example 1:
Input: A = [2,7,11,15], B = [1,10,4,11]
Output: [2,11,7,15]

Example 2:
Input: A = [12,24,8,32], B = [13,25,32,11]
Output: [24,32,8,12]
Note:
`1 <= A.length = B.length <= 10000`
`0 <= A[i] <= 10^9`
`0 <= B[i] <= 10^9`', false, 'Medium', '/articles/advantage-shuffle', 50.7, 
   0.3, 'https://leetcode.com/problems/advantage-shuffle', 398, 44.4, 87.6, '["Apple,Facebook"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   975, 63, 94, true, '[]'::jsonb, true),
  (871, 'Minimum Number of Refueling Stops', 'A car travels from a starting position to a destination which is `target` miles east of the starting position.

Along the way, there are gas stations.  Each `station[i]` represents a gas station that is `station[i][0]` miles east of the starting position, and has `station[i][1]` liters of gas.

The car starts with an infinite tank of gas, which initially has `startFuel` liters of fuel in it.  It uses 1 liter of gas per 1 mile that it drives.

When the car reaches a gas station, it may stop and refuel, transferring all the gas from the station into the car.

What is the least number of refueling stops the car must make in order to reach its destination?  If it cannot reach the destination, return `-1`.

Note that if the car reaches a gas station with 0 fuel left, the car can still refuel there.  If the car reaches the destination with 0 fuel left, it is still considered to have arrived.


Example 1:
Input: target = 1, startFuel = 1, stations = []
Output: 0
Explanation: We can reach the target without refueling.


Example 2:
Input: target = 100, startFuel = 1, stations = [[10,100]]
Output: -1
Explanation: We can''t reach the target (or even the first gas station).


Example 3:
Input: target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]
Output: 2
Explanation: 
We start with 10 liters of fuel.

We drive to position 10, expending 10 liters of fuel.  We refuel from 0 liters to 60 liters of gas.

Then, we drive from position 10 to position 60 (expending 50 liters of fuel),
and refuel from 10 liters to 50 liters of gas.  We then drive to and reach the target.

We made 2 refueling stops along the way, so we return 2.

Note:
`1 <= target, startFuel, stations[i][1] <= 10^9`
`0 <= stations.length <= 500`
`0 < stations[0][0] < stations[1][0] < ... < stations[stations.length-1][0] < target`', false, 'Hard', '/articles/minimum-number-of-refueling-stops', 32.4, 
   62.5, 'https://leetcode.com/problems/minimum-number-of-refueling-stops', 173, 28, 86.4, '["Flipkart,Google"]'::jsonb, '["Dynamic Programming,Heap"]'::jsonb, 
   1143, 26, 98, true, '[]'::jsonb, true),
  (872, 'Leaf-Similar Trees', 'Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.

For example, in the given tree above, the leaf value sequence is `(6, 7, 4, 9, 8)`.

Two binary trees are considered leaf-similar if their leaf value sequence is the same.

Return `true` if and only if the two given trees with head nodes `root1` and `root2` are leaf-similar.


Example 1:
Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
Output: true

Example 2:
Input: root1 = [1], root2 = [1]
Output: true

Example 3:
Input: root1 = [1], root2 = [2]
Output: false

Example 4:
Input: root1 = [1,2], root2 = [2,2]
Output: true

Example 5:
Input: root1 = [1,2,3], root2 = [1,3,2]
Output: false

Constraints:
The number of nodes in each tree will be in the range `[1, 200]`.

Both of the given trees will have values in the range `[0, 200]`.', false, 'Easy', '/articles/leaf-similar-trees', 64.5, 
   7.3, 'https://leetcode.com/problems/leaf-similar-trees', 999, 121.6, 188.7, '["Amazon"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   1121, 47, 96, true, '[]'::jsonb, true),
  (873, 'Length of Longest Fibonacci Subsequence', 'A sequence `X1, X2, ..., Xn` is Fibonacci-like if:
`n >= 3`
`Xi + Xi+1 = Xi+2` for all `i + 2 <= n`
Given a strictly increasing array `arr` of positive integers forming a sequence, return the length of the longest Fibonacci-like subsequence of `arr`. If one does not exist, return `0`.

A subsequence is derived from another sequence `arr` by deleting any number of elements (including none) from `arr`, without changing the order of the remaining elements. For example, `[3, 5, 8]` is a subsequence of `[3, 4, 5, 6, 7, 8]`.


Example 1:
Input: arr = [1,2,3,4,5,6,7,8]
Output: 5
Explanation: The longest subsequence that is fibonacci-like: [1,2,3,5,8].


Example 2:
Input: arr = [1,3,7,11,12,14,18]
Output: 3
Explanation: The longest subsequence that is fibonacci-like: [1,11,12], [3,11,14] or [7,11,18].


Constraints:
`3 <= arr.length <= 1000`
`1 <= arr[i] < arr[i + 1] <= 109`', false, 'Medium', '/articles/length-of-longest-fibonacci-subsequence', 48.2, 
   16.7, 'https://leetcode.com/problems/length-of-longest-fibonacci-subsequence', 206, 37.7, 78.2, '["Amazon"]'::jsonb, '["Array,Dynamic Programming"]'::jsonb, 
   961, 37, 96, true, '[]'::jsonb, true),
  (874, 'Walking Robot Simulation', 'A robot on an infinite XY-plane starts at point `(0, 0)` and faces north. The robot can receive one of three possible types of `commands`:
`-2`: turn left `90` degrees,
`-1`: turn right `90` degrees, or
`1 <= k <= 9`: move forward `k` units.

Some of the grid squares are `obstacles`. The `ith` obstacle is at grid point `obstacles[i] = (xi, yi)`.

If the robot would try to move onto them, the robot stays on the previous grid square instead (but still continues following the rest of the route.)
Return the maximum Euclidean distance that the robot will be from the origin squared (i.e. if the distance is `5`, return `25`).

Note:
North means +Y direction.

East means +X direction.

South means -Y direction.

West means -X direction.


Example 1:
Input: commands = [4,-1,3], obstacles = []
Output: 25
Explanation: The robot starts at (0, 0):
1. Move north 4 units to (0, 4).

2. Turn right.

3. Move east 3 units to (3, 4).

The furthest point away from the origin is (3, 4), which is 32 + 42 = 25 units away.


Example 2:
Input: commands = [4,-1,4,-2,4], obstacles = [[2,4]]
Output: 65
Explanation: The robot starts at (0, 0):
1. Move north 4 units to (0, 4).

2. Turn right.

3. Move east 1 unit and get blocked by the obstacle at (2, 4), robot is at (1, 4).

4. Turn left.

5. Move north 4 units to (1, 8).

The furthest point away from the origin is (1, 8), which is 12 + 82 = 65 units away.


Constraints:
`1 <= commands.length <= 104`
`commands[i]` is one of the values in the list `[-2,-1,1,2,3,4,5,6,7,8,9]`.

`0 <= obstacles.length <= 104`
`-3 * 104 <= xi, yi <= 3 * 104`
The answer is guaranteed to be less than `231`.', false, 'Easy', '/articles/walking-robot-simulation', 36.7, 
   18.2, 'https://leetcode.com/problems/walking-robot-simulation', 227, 24.9, 67.7, '["Jane Street"]'::jsonb, '["Greedy"]'::jsonb, 
   236, 976, 19, false, '[]'::jsonb, true),
  (875, 'Koko Eating Bananas', 'Koko loves to eat bananas. There are `n` piles of bananas, the `ith` pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer `k` such that she can eat all the bananas within `h` hours.


Example 1:
Input: piles = [3,6,7,11], h = 8
Output: 4

Example 2:
Input: piles = [30,11,23,4,20], h = 5
Output: 30

Example 3:
Input: piles = [30,11,23,4,20], h = 6
Output: 23

Constraints:
`1 <= piles.length <= 104`
`piles.length <= h <= 109`
`1 <= piles[i] <= 109`', false, 'Medium', '/articles/koko-eating-bananas', 53.5, 
   19.2, 'https://leetcode.com/problems/koko-eating-bananas', 359, 66.3, 123.9, '["Facebook"]'::jsonb, '["Binary Search"]'::jsonb, 
   1387, 85, 94, true, '[]'::jsonb, true),
  (876, 'Middle of the Linked List', 'Given a non-empty, singly linked list with head node `head`, return a middle node of linked list.

If there are two middle nodes, return the second middle node.


Example 1:
Input: [1,2,3,4,5]
Output: Node 3 from this list (Serialization: [3,4,5])
The returned node has value 3.  (The judge''s serialization of this node is [3,4,5]).

Note that we returned a ListNode object ans, such that:
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, and ans.next.next.next = NULL.


Example 2:
Input: [1,2,3,4,5,6]
Output: Node 4 from this list (Serialization: [4,5,6])
Since the list has two middle nodes with values 3 and 4, we return the second one.

Note:
The number of nodes in the given list will be between `1` and `100`.', false, 'Easy', '/articles/middle-of-the-linked-list', 69.2, 
   18.2, 'https://leetcode.com/problems/middle-of-the-linked-list', 999, 315, 455.2, '["Microsoft"]'::jsonb, '["Linked List"]'::jsonb, 
   2236, 73, 97, false, '[]'::jsonb, true),
  (877, 'Stone Game', 'Alex and Lee play a game with piles of stones.  There are an even number of piles arranged in a row, and each pile has a positive integer number of stones `piles[i]`.

The objective of the game is to end with the most stones.  The total number of stones is odd, so there are no ties.

Alex and Lee take turns, with Alex starting first.  Each turn, a player takes the entire pile of stones from either the beginning or the end of the row.  This continues until there are no more piles left, at which point the person with the most stones wins.

Assuming Alex and Lee play optimally, return `True` if and only if Alex wins the game.


Example 1:
Input: piles = [5,3,4,5]
Output: true
Explanation: 
Alex starts first, and can only take the first 5 or the last 5.

Say he takes the first 5, so that the row becomes [3, 4, 5].

If Lee takes 3, then the board is [4, 5], and Alex takes 5 to win with 10 points.

If Lee takes the last 5, then the board is [3, 4], and Alex takes 4 to win with 9 points.

This demonstrated that taking the first 5 was a winning move for Alex, so we return true.


Constraints:
`2 <= piles.length <= 500`
`piles.length` is even.

`1 <= piles[i] <= 500`
`sum(piles)` is odd.', false, 'Medium', '/articles/stone-game', 67.1, 
   6.2, 'https://leetcode.com/problems/stone-game', 513, 85.2, 126.9, '["Adobe,Apple"]'::jsonb, '["Math,Dynamic Programming,Minimax"]'::jsonb, 
   1062, 1301, 45, true, '[]'::jsonb, true),
  (878, 'Nth Magical Number', 'A positive integer is magical if it is divisible by either `a` or `b`.

Given the three integers `n`, `a`, and `b`, return the `nth` magical number. Since the answer may be very large, return it modulo `109 + 7`.


Example 1:
Input: n = 1, a = 2, b = 3
Output: 2

Example 2:
Input: n = 4, a = 2, b = 3
Output: 6

Example 3:
Input: n = 5, a = 2, b = 4
Output: 10

Example 4:
Input: n = 3, a = 6, b = 4
Output: 8

Constraints:
`1 <= n <= 109`
`2 <= a, b <= 4 * 104`', false, 'Hard', '/articles/nth-magical-number', 28.9, 
   7.3, 'https://leetcode.com/problems/nth-magical-number', 97, 11.7, 40.4, '[]'::jsonb, '[]'::jsonb, 
   265, 67, 80, false, '[]'::jsonb, true),
  (879, 'Profitable Schemes', 'There is a group of `n` members, and a list of various crimes they could commit. The `ith` crime generates a `profit[i]` and requires `group[i]` members to participate in it. If a member participates in one crime, that member can''t participate in another crime.

Let''s call a profitable scheme any subset of these crimes that generates at least `minProfit` profit, and the total number of members participating in that subset of crimes is at most `n`.

Return the number of schemes that can be chosen. Since the answer may be very large, return it modulo `109 + 7`.


Example 1:
Input: n = 5, minProfit = 3, group = [2,2], profit = [2,3]
Output: 2
Explanation: To make a profit of at least 3, the group could either commit crimes 0 and 1, or just crime 1.

In total, there are 2 schemes.


Example 2:
Input: n = 10, minProfit = 5, group = [2,3,5], profit = [6,7,8]
Output: 7
Explanation: To make a profit of at least 5, the group could commit any crimes, as long as they commit one.

There are 7 possible schemes: (0), (1), (2), (0,1), (0,2), (1,2), and (0,1,2).


Constraints:
`1 <= n <= 100`
`0 <= minProfit <= 100`
`1 <= group.length <= 100`
`1 <= group[i] <= 100`
`profit.length == group.length`
`0 <= profit[i] <= 100`', false, 'Hard', '/articles/profitable-schemes', 39.9, 
   9.7, 'https://leetcode.com/problems/profitable-schemes', 68, 11.4, 28.5, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   297, 32, 90, true, '[]'::jsonb, true),
  (880, 'Decoded String at Index', 'An encoded string `S` is given.  To find and write the decoded string to a tape, the encoded string is read one character at a time and the following steps are taken:
If the character read is a letter, that letter is written onto the tape.

If the character read is a digit (say `d`), the entire current tape is repeatedly written `d-1` more times in total.

Now for some encoded string `S`, and an index `K`, find and return the `K`-th letter (1 indexed) in the decoded string.


Example 1:
Input: S = "leet2code3", K = 10
Output: "o"
Explanation: 
The decoded string is "leetleetcodeleetleetcodeleetleetcode".

The 10th letter in the string is "o".


Example 2:
Input: S = "ha22", K = 5
Output: "h"
Explanation: 
The decoded string is "hahahaha".  The 5th letter is "h".


Example 3:
Input: S = "a2345678999999999999999", K = 1
Output: "a"
Explanation: 
The decoded string is "a" repeated 8301530446056247680 times.  The 1st letter is "a".


Constraints:
`2 <= S.length <= 100`
`S` will only contain lowercase letters and digits `2` through `9`.

`S` starts with a letter.

`1 <= K <= 10^9`
It''s guaranteed that `K` is less than or equal to the length of the decoded string.

The decoded string is guaranteed to have less than `2^63` letters.', false, 'Medium', '/articles/decoded-string-at-index', 28.2, 
   10.5, 'https://leetcode.com/problems/decoded-string-at-index', 182, 28.8, 102.2, '["Amazon,National Instruments"]'::jsonb, '["Stack"]'::jsonb, 
   897, 157, 85, true, '[]'::jsonb, true),
  (881, 'Boats to Save People', 'You are given an array `people` where `people[i]` is the weight of the `ith` person, and an infinite number of boats where each boat can carry a maximum weight of `limit`. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most `limit`.

Return the minimum number of boats to carry every given person.


Example 1:
Input: people = [1,2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)

Example 2:
Input: people = [3,2,2,1], limit = 3
Output: 3
Explanation: 3 boats (1, 2), (2) and (3)

Example 3:
Input: people = [3,5,3,4], limit = 5
Output: 4
Explanation: 4 boats (3), (3), (4), (5)

Constraints:
`1 <= people.length <= 5 * 104`
`1 <= people[i] <= limit <= 3 * 104`', false, 'Medium', '/articles/boats-to-save-people', 49.1, 
   36.6, 'https://leetcode.com/problems/boats-to-save-people', 502, 70.2, 143.1, '["Roblox,Paypal"]'::jsonb, '["Two Pointers,Greedy"]'::jsonb, 
   1252, 48, 96, false, '[]'::jsonb, true),
  (882, 'Reachable Nodes In Subdivided Graph', 'You are given an undirected graph (the "original graph") with `n` nodes labeled from `0` to `n - 1`. You decide to subdivide each edge in the graph into a chain of nodes, with the number of new nodes varying between each edge.

The graph is given as a 2D array of `edges` where `edges[i] = [ui, vi, cnti]` indicates that there is an edge between nodes `ui` and `vi` in the original graph, and `cnti` is the total number of new nodes that you will subdivide the edge into. Note that `cnti == 0` means you will not subdivide the edge.

To subdivide the edge `[ui, vi]`, replace it with `(cnti + 1)` new edges and `cnti` new nodes. The new nodes are `x1`, `x2`, ..., `xcnti`, and the new edges are `[ui, x1]`, `[x1, x2]`, `[x2, x3]`, ..., `[xcnti+1, xcnti]`, `[xcnti, vi]`.

In this new graph, you want to know how many nodes are reachable from the node `0`, where a node is reachable if the distance is `maxMoves` or less.

Given the original graph and `maxMoves`, return the number of nodes that are reachable from node `0` in the new graph.


Example 1:
Input: edges = [[0,1,10],[0,2,1],[1,2,2]], maxMoves = 6, n = 3
Output: 13
Explanation: The edge subdivisions are shown in the image above.

The nodes that are reachable are highlighted in yellow.


Example 2:
Input: edges = [[0,1,4],[1,2,6],[0,2,8],[1,3,1]], maxMoves = 10, n = 4
Output: 23

Example 3:
Input: edges = [[1,2,4],[1,4,5],[1,3,1],[2,3,4],[3,4,5]], maxMoves = 17, n = 5
Output: 1
Explanation: Node 0 is disconnected from the rest of the graph, so only node 0 is reachable.


Constraints:
`0 <= edges.length <= min(n * (n - 1) / 2, 104)`
`edges[i].length == 3`
`0 <= ui < vi < n`
There are no multiple edges in the graph.

`0 <= cnti <= 104`
`0 <= maxMoves <= 109`
`1 <= n <= 3000`', false, 'Hard', '/articles/reachable-nodes-in-subdivided-graph', 43.1, 
   14.3, 'https://leetcode.com/problems/reachable-nodes-in-subdivided-graph', 53, 7.3, 17, '["Amazon"]'::jsonb, '["Heap,Breadth-first Search"]'::jsonb, 
   183, 155, 54, true, '[]'::jsonb, true),
  (883, 'Projection Area of 3D Shapes', 'You are given an `n x n` `grid` where we place some `1 x 1 x 1` cubes that are axis-aligned with the `x`, `y`, and `z` axes.

Each value `v = grid[i][j]` represents a tower of `v` cubes placed on top of the cell `(i, j)`.

We view the projection of these cubes onto the `xy`, `yz`, and `zx` planes.

A projection is like a shadow, that maps our 3-dimensional figure to a 2-dimensional plane. We are viewing the "shadow" when looking at the cubes from the top, the front, and the side.

Return the total area of all three projections.


Example 1:
Input: grid = [[1,2],[3,4]]
Output: 17
Explanation: Here are the three projections ("shadows") of the shape made with each axis-aligned plane.


Example 2:
Input: grid = [[2]]
Output: 5

Example 3:
Input: grid = [[1,0],[0,2]]
Output: 8

Example 4:
Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
Output: 14

Example 5:
Input: grid = [[2,2,2],[2,1,2],[2,2,2]]
Output: 21

Constraints:
`n == grid.length`
`n == grid[i].length`
`1 <= n <= 50`
`0 <= grid[i][j] <= 50`', false, 'Easy', '/articles/projection-area-of-3d-shapes', 68.5, 
   2.3, 'https://leetcode.com/problems/projection-area-of-3d-shapes', 291, 33.6, 49, '[]'::jsonb, '[]'::jsonb, 
   303, 957, 24, false, '[]'::jsonb, true),
  (884, 'Uncommon Words from Two Sentences', 'We are given two sentences `A` and `B`.  (A sentence is a string of space separated words.  Each word consists only of lowercase letters.)
A word is uncommon if it appears exactly once in one of the sentences, and does not appear in the other sentence.

Return a list of all uncommon words. 
You may return the list in any order.


Example 1:
Input: A = "this apple is sweet", B = "this apple is sour"
Output: ["sweet","sour"]

Example 2:
Input: A = "apple apple", B = "banana"
Output: ["banana"]
Note:
`0 <= A.length <= 200`
`0 <= B.length <= 200`
`A` and `B` both contain only spaces and lowercase letters.', false, 'Easy', '/articles/uncommon-words-from-two-sentences', 64.2, 
   4.4, 'https://leetcode.com/problems/uncommon-words-from-two-sentences', 690, 72.7, 113.2, '["Amazon,Facebook"]'::jsonb, '["Hash Table"]'::jsonb, 
   589, 108, 85, true, '[]'::jsonb, true),
  (885, 'Spiral Matrix III', 'On a 2 dimensional grid with `R` rows and `C` columns, we start at `(r0, c0)` facing east.

Here, the north-west corner of the grid is at the first row and column, and the south-east corner of the grid is at the last row and column.

Now, we walk in a clockwise spiral shape to visit every position in this grid. 
Whenever we would move outside the boundary of the grid, we continue our walk outside the grid (but may return to the grid boundary later.) 
Eventually, we reach all `R * C` spaces of the grid.

Return a list of coordinates representing the positions of the grid in the order they were visited.


Example 1:
Input: R = 1, C = 4, r0 = 0, c0 = 0
Output: [[0,0],[0,1],[0,2],[0,3]]

Example 2:
Input: R = 5, C = 6, r0 = 1, c0 = 4
Output: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]
Note:
`1 <= R <= 100`
`1 <= C <= 100`
`0 <= r0 < R`
`0 <= c0 < C`', false, 'Medium', '/articles/spiral-matrix-iii', 71.1, 
   30.1, 'https://leetcode.com/problems/spiral-matrix-iii', 206, 26.3, 37, '["Facebook"]'::jsonb, '["Math"]'::jsonb, 
   312, 382, 45, true, '[]'::jsonb, true),
  (886, 'Possible Bipartition', 'Given a set of `N` people (numbered `1, 2, ..., N`), we would like to split everyone into two groups of any size.

Each person may dislike some other people, and they should not go into the same group. 
Formally, if `dislikes[i] = [a, b]`, it means it is not allowed to put the people numbered `a` and `b` into the same group.

Return `true` if and only if it is possible to split everyone into two groups in this way.


Example 1:
Input: N = 4, dislikes = [[1,2],[1,3],[2,4]]
Output: true
Explanation: group1 [1,4], group2 [2,3]

Example 2:
Input: N = 3, dislikes = [[1,2],[1,3],[2,3]]
Output: false

Example 3:
Input: N = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
Output: false

Constraints:
`1 <= N <= 2000`
`0 <= dislikes.length <= 10000`
`dislikes[i].length == 2`
`1 <= dislikes[i][j] <= N`
`dislikes[i][0] < dislikes[i][1]`
There does not exist `i != j` for which `dislikes[i] == dislikes[j]`.', false, 'Medium', '/articles/possible-bipartition', 45.3, 
   20.1, 'https://leetcode.com/problems/possible-bipartition', 520, 73.6, 162.5, '["Amazon,Google,Apple,Coupang"]'::jsonb, '["Depth-first Search,Graph"]'::jsonb, 
   1368, 37, 97, true, '[]'::jsonb, true),
  (887, 'Super Egg Drop', 'You are given `k` identical eggs and you have access to a building with `n` floors labeled from `1` to `n`.

You know that there exists a floor `f` where `0 <= f <= n` such that any egg dropped at a floor higher than `f` will break, and any egg dropped at or below floor `f` will not break.

Each move, you may take an unbroken egg and drop it from any floor `x` (where `1 <= x <= n`). If the egg breaks, you can no longer use it. However, if the egg does not break, you may reuse it in future moves.

Return the minimum number of moves that you need to determine with certainty what the value of `f` is.


Example 1:
Input: k = 1, n = 2
Output: 2
Explanation: 
Drop the egg from floor 1. If it breaks, we know that f = 0.

Otherwise, drop the egg from floor 2. If it breaks, we know that f = 1.

If it does not break, then we know f = 2.

Hence, we need at minimum 2 moves to determine with certainty what the value of f is.


Example 2:
Input: k = 2, n = 6
Output: 3

Example 3:
Input: k = 3, n = 14
Output: 4

Constraints:
`1 <= k <= 100`
`1 <= n <= 104`', false, 'Hard', '/articles/super-egg-drop', 27, 
   42.2, 'https://leetcode.com/problems/super-egg-drop', 121, 28.8, 106.7, '["Amazon"]'::jsonb, '["Math,Binary Search,Dynamic Programming"]'::jsonb, 
   1332, 96, 93, true, '[]'::jsonb, true),
  (888, 'Fair Candy Swap', 'Alice and Bob have candy bars of different sizes: `A[i]` is the size of the `i`-th bar of candy that Alice has, and `B[j]` is the size of the `j`-th bar of candy that Bob has.

Since they are friends, they would like to exchange one candy bar each so that after the exchange, they both have the same total amount of candy.  (The total amount of candy a person has is the sum of the sizes of candy bars they have.)
Return an integer array `ans` where `ans[0]` is the size of the candy bar that Alice must exchange, and `ans[1]` is the size of the candy bar that Bob must exchange.

If there are multiple answers, you may return any one of them.  It is guaranteed an answer exists.


Example 1:
Input: A = [1,1], B = [2,2]
Output: [1,2]

Example 2:
Input: A = [1,2], B = [2,3]
Output: [1,2]

Example 3:
Input: A = [2], B = [1,3]
Output: [2,3]

Example 4:
Input: A = [1,2,5], B = [2,4]
Output: [5,4]
Note:
`1 <= A.length <= 10000`
`1 <= B.length <= 10000`
`1 <= A[i] <= 100000`
`1 <= B[i] <= 100000`
It is guaranteed that Alice and Bob have different total amounts of candy.

It is guaranteed there exists an answer.', false, 'Easy', '/articles/fair-candy-swap', 59.1, 
   10.7, 'https://leetcode.com/problems/fair-candy-swap', 306, 61, 103.1, '["Yahoo"]'::jsonb, '["Array"]'::jsonb, 
   735, 165, 82, false, '[]'::jsonb, true),
  (889, 'Construct Binary Tree from Preorder and Postorder Traversal', 'Return any binary tree that matches the given preorder and postorder traversals.

Values in the traversals `pre` and `post` are distinct positive integers.


Example 1:
Input: pre = [1,2,4,5,3,6,7], post = [4,5,2,6,7,3,1]
Output: [1,2,3,4,5,6,7]
Note:
`1 <= pre.length == post.length <= 30`
`pre[]` and `post[]` are both permutations of `1, 2, ..., pre.length`.

It is guaranteed an answer exists. If there exists multiple answers, you can return any of them.', false, 'Medium', '/articles/construct-binary-tree-from-preorder-and-postorder-traversal', 67.8, 
   35.4, 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal', 310, 49.6, 73.1, '["Amazon,Bloomberg"]'::jsonb, '["Tree"]'::jsonb, 
   1172, 62, 95, true, '[]'::jsonb, true),
  (890, 'Find and Replace Pattern', 'You have a list of `words` and a `pattern`, and you want to know which words in `words` matches the pattern.

A word matches the pattern if there exists a permutation of letters `p` so that after replacing every letter `x` in the pattern with `p(x)`, we get the desired word.

(Recall that a permutation of letters is a bijection from letters to letters: every letter maps to another letter, and no two letters map to the same letter.)
Return a list of the words in `words` that match the given pattern. 
You may return the answer in any order.


Example 1:
Input: words = ["abc","deq","mee","aqq","dkd","ccc"], pattern = "abb"
Output: ["mee","aqq"]
Explanation: "mee" matches the pattern because there is a permutation {a -> m, b -> e, ...}. 
"ccc" does not match the pattern because {a -> c, b -> c, ...} is not a permutation,
since a and b map to the same letter.

Note:
`1 <= words.length <= 50`
`1 <= pattern.length = words[i].length <= 20`', false, 'Medium', '/articles/find-and-replace-pattern', 74.2, 
   7.3, 'https://leetcode.com/problems/find-and-replace-pattern', 606, 63.2, 85.2, '["Microsoft"]'::jsonb, '["String"]'::jsonb, 
   958, 87, 92, false, '[]'::jsonb, true),
  (891, 'Sum of Subsequence Widths', 'Given an array of integers `A`, consider all non-empty subsequences of `A`.

For any sequence S, let the width of S be the difference between the maximum and minimum element of S.

Return the sum of the widths of all subsequences of A. 
As the answer may be very large, return the answer modulo 10^9 + 7.


Example 1:
Input: [2,1,3]
Output: 6
Explanation:
Subsequences are [1], [2], [3], [2,1], [2,3], [1,3], [2,1,3].

The corresponding widths are 0, 0, 0, 1, 1, 2, 2.

The sum of these widths is 6.

Note:
`1 <= A.length <= 20000`
`1 <= A[i] <= 20000`', false, 'Hard', '/articles/sum-of-subsequence-widths', 33.1, 
   3.3, 'https://leetcode.com/problems/sum-of-subsequence-widths', 59, 10.5, 31.7, '["Sapient"]'::jsonb, '["Array,Math"]'::jsonb, 
   319, 110, 74, false, '[]'::jsonb, true),
  (892, 'Surface Area of 3D Shapes', 'You are given an `n x n` `grid` where you have placed some `1 x 1 x 1` cubes. Each value `v = grid[i][j]` represents a tower of `v` cubes placed on top of cell `(i, j)`.

After placing these cubes, you have decided to glue any directly adjacent cubes to each other, forming several irregular 3D shapes.

Return the total surface area of the resulting shapes.

Note: The bottom face of each shape counts toward its surface area.


Example 1:
Input: grid = [[2]]
Output: 10

Example 2:
Input: grid = [[1,2],[3,4]]
Output: 34

Example 3:
Input: grid = [[1,0],[0,2]]
Output: 16

Example 4:
Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
Output: 32

Example 5:
Input: grid = [[2,2,2],[2,1,2],[2,2,2]]
Output: 46

Constraints:
`n == grid.length`
`n == grid[i].length`
`1 <= n <= 50`
`0 <= grid[i][j] <= 50`', false, 'Easy', '/articles/surface-area-of-3d-shapes', 60, 
   13.6, 'https://leetcode.com/problems/surface-area-of-3d-shapes', 208, 22.6, 37.7, '[]'::jsonb, '[]'::jsonb, 
   306, 456, 40, false, '[]'::jsonb, true),
  (893, 'Groups of Special-Equivalent Strings', 'You are given an array `A` of strings.

A move onto `S` consists of swapping any two even indexed characters of `S`, or any two odd indexed characters of `S`.

Two strings `S` and `T` are special-equivalent if after any number of moves onto `S`, `S == T`.

For example, `S = "zzxy"` and `T = "xyzz"` are special-equivalent because we may make the moves `"zzxy" -> "xzzy" -> "xyzz"` that swap `S[0]` and `S[2]`, then `S[1]` and `S[3]`.

Now, a group of special-equivalent strings from `A` is a non-empty subset of A such that:
Every pair of strings in the group are special equivalent, and;
The group is the largest size possible (ie., there isn''t a string S not in the group such that S is special equivalent to every string in the group)
Return the number of groups of special-equivalent strings from `A`.


Example 1:
Input: ["abcd","cdab","cbad","xyzz","zzxy","zzyx"]
Output: 3
Explanation: 
One group is ["abcd", "cdab", "cbad"], since they are all pairwise special equivalent, and none of the other strings are all pairwise special equivalent to these.

The other two groups are ["xyzz", "zzxy"] and ["zzyx"].  Note that in particular, "zzxy" is not special equivalent to "zzyx".


Example 2:
Input: ["abc","acb","bac","bca","cab","cba"]
Output: 3
Note:
`1 <= A.length <= 1000`
`1 <= A[i].length <= 20`
All `A[i]` have the same length.

All `A[i]` consist of only lowercase letters.', false, 'Easy', '/articles/groups-of-special-equivalent-strings', 69.6, 
   1.9, 'https://leetcode.com/problems/groups-of-special-equivalent-strings', 265, 35.3, 50.8, '["Facebook"]'::jsonb, '["String"]'::jsonb, 
   328, 1261, 21, true, '[]'::jsonb, true),
  (894, 'All Possible Full Binary Trees', 'Given an integer `n`, return a list of all possible full binary trees with `n` nodes. Each node of each tree in the answer must have `Node.val == 0`.

Each element of the answer is the root node of one possible tree. You may return the final list of trees in any order.

A full binary tree is a binary tree where each node has exactly `0` or `2` children.


Example 1:
Input: n = 7
Output: [[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]

Example 2:
Input: n = 3
Output: [[0,0,0]]

Constraints:
`1 <= n <= 20`', false, 'Medium', '/articles/all-possible-full-binary-trees', 77.3, 
   10.7, 'https://leetcode.com/problems/all-possible-full-binary-trees', 289, 50.8, 65.7, '["Google,Amazon"]'::jsonb, '["Tree,Recursion"]'::jsonb, 
   1356, 112, 92, true, '[]'::jsonb, true),
  (895, 'Maximum Frequency Stack', 'Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.

Implement the `FreqStack` class:
`FreqStack()` constructs an empty frequency stack.

`void push(int val)` pushes an integer `val` onto the top of the stack.

`int pop()` removes and returns the most frequent element in the stack.

	
If there is a tie for the most frequent element, the element closest to the stack''s top is removed and returned.


Example 1:
Input
["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
[[], [5], [7], [5], [7], [4], [5], [], [], [], []]
Output
[null, null, null, null, null, null, null, 5, 7, 5, 4]
Explanation
FreqStack freqStack = new FreqStack();
freqStack.push(5); // The stack is [5]
freqStack.push(7); // The stack is [5,7]
freqStack.push(5); // The stack is [5,7,5]
freqStack.push(7); // The stack is [5,7,5,7]
freqStack.push(4); // The stack is [5,7,5,7,4]
freqStack.push(5); // The stack is [5,7,5,7,4,5]
freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4].

freqStack.pop();   // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4].

freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,4].

freqStack.pop();   // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].


Constraints:
`0 <= val <= 109`
At most `2 * 104` calls will be made to `push` and `pop`.

It is guaranteed that there will be at least one element in the stack before calling `pop`.', false, 'Hard', '/articles/maximum-frequency-stack', 63.2, 
   52.7, 'https://leetcode.com/problems/maximum-frequency-stack', 359, 66.6, 105.3, '["Amazon,Microsoft,Bloomberg,Adobe"]'::jsonb, '["Hash Table,Stack"]'::jsonb, 
   1768, 37, 98, true, '[]'::jsonb, true),
  (896, 'Monotonic Array', 'An array is monotonic if it is either monotone increasing or monotone decreasing.

An array `A` is monotone increasing if for all `i <= j`, `A[i] <= A[j]`.  An array `A` is monotone decreasing if for all `i <= j`, `A[i] >= A[j]`.

Return `true` if and only if the given array `A` is monotonic.


Example 1:
Input: [1,2,2,3]
Output: true

Example 2:
Input: [6,5,4,4]
Output: true

Example 3:
Input: [1,3,2]
Output: false

Example 4:
Input: [1,2,4,5]
Output: true

Example 5:
Input: [1,1,1]
Output: true
Note:
`1 <= A.length <= 50000`
`-100000 <= A[i] <= 100000`', false, 'Easy', '/articles/monotonic-array', 57.9, 
   28.7, 'https://leetcode.com/problems/monotonic-array', 999, 147.3, 254.2, '["Facebook"]'::jsonb, '["Array"]'::jsonb, 
   957, 43, 96, true, '[]'::jsonb, true),
  (897, 'Increasing Order Search Tree', 'Given the `root` of a binary search tree, rearrange the tree in in-order so that the leftmost node in the tree is now the root of the tree, and every node has no left child and only one right child.


Example 1:
Input: root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
Output: [1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]

Example 2:
Input: root = [5,1,7]
Output: [1,null,5,null,7]

Constraints:
The number of nodes in the given tree will be in the range `[1, 100]`.

`0 <= Node.val <= 1000`', false, 'Easy', '/articles/increasing-order-search-tree', 74.6, 
   4.9, 'https://leetcode.com/problems/increasing-order-search-tree', 957, 120.4, 161.3, '["Apple,Amazon"]'::jsonb, '["Tree,Depth-first Search,Recursion"]'::jsonb, 
   1330, 528, 72, true, '[]'::jsonb, true),
  (898, 'Bitwise ORs of Subarrays', 'We have an array `arr` of non-negative integers.

For every (contiguous) subarray `sub = [arr[i], arr[i + 1], ..., arr[j]]` (with `i <= j`), we take the bitwise OR of all the elements in `sub`, obtaining a result `arr[i] | arr[i + 1] | ... | arr[j]`.

Return the number of possible results. Results that occur more than once are only counted once in the final answer

Example 1:
Input: arr = [0]
Output: 1
Explanation: There is only one possible result: 0.


Example 2:
Input: arr = [1,1,2]
Output: 3
Explanation: The possible subarrays are [1], [1], [2], [1, 1], [1, 2], [1, 1, 2].

These yield the results 1, 1, 2, 1, 3, 3.

There are 3 unique values, so the answer is 3.


Example 3:
Input: arr = [1,2,4]
Output: 6
Explanation: The possible results are 1, 2, 3, 4, 6, and 7.


Constraints:
`1 <= nums.length <= 5 * 104`
`0 <= nums[i] <= 109`', false, 'Medium', '/articles/bitwise-ors-of-subarrays', 34.4, 
   20.1, 'https://leetcode.com/problems/bitwise-ors-of-subarrays', 87, 19.2, 55.9, '["Amazon"]'::jsonb, '["Dynamic Programming,Bit Manipulation"]'::jsonb, 
   673, 142, 83, true, '[]'::jsonb, true),
  (899, 'Orderly Queue', 'A string `S` of lowercase letters is given.  Then, we may make any number of moves.

In each move, we choose one of the first `K` letters (starting from the left), remove it, and place it at the end of the string.

Return the lexicographically smallest string we could have after any number of moves.


Example 1:
Input: S = "cba", K = 1
Output: "acb"
Explanation: 
In the first move, we move the 1st character ("c") to the end, obtaining the string "bac".

In the second move, we move the 1st character ("b") to the end, obtaining the final result "acb".


Example 2:
Input: S = "baaca", K = 3
Output: "aaabc"
Explanation: 
In the first move, we move the 1st character ("b") to the end, obtaining the string "aacab".

In the second move, we move the 3rd character ("c") to the end, obtaining the final result "aaabc".

Note:
`1 <= K <= S.length <= 1000`
`S` consists of lowercase letters only.', false, 'Hard', '/articles/orderly-queue', 53.4, 
   4.2, 'https://leetcode.com/problems/orderly-queue', 57, 9.5, 17.7, '["Amazon"]'::jsonb, '["Math,String"]'::jsonb, 
   251, 225, 53, true, '[]'::jsonb, true),
  (900, 'RLE Iterator', 'Write an iterator that iterates through a run-length encoded sequence.

The iterator is initialized by `RLEIterator(int[] A)`, where `A` is a run-length encoding of some sequence.  More specifically, for all even `i`, `A[i]` tells us the number of times that the non-negative integer value `A[i+1]` is repeated in the sequence.

The iterator supports one function: `next(int n)`, which exhausts the next `n` elements (`n >= 1`) and returns the last element exhausted in this way.  If there is no element left to exhaust, `next` returns `-1` instead.

For example, we start with `A = [3,8,0,9,2,5]`, which is a run-length encoding of the sequence `[8,8,8,5,5]`.  This is because the sequence can be read as "three eights, zero nines, two fives".


Example 1:
Input: ["RLEIterator","next","next","next","next"], [[[3,8,0,9,2,5]],[2],[1],[1],[2]]
Output: [null,8,8,5,-1]
Explanation: 
RLEIterator is initialized with RLEIterator([3,8,0,9,2,5]).

This maps to the sequence [8,8,8,5,5].

RLEIterator.next is then called 4 times:
.next(2) exhausts 2 terms of the sequence, returning 8.  The remaining sequence is now [8, 5, 5].

.next(1) exhausts 1 term of the sequence, returning 8.  The remaining sequence is now [5, 5].

.next(1) exhausts 1 term of the sequence, returning 5.  The remaining sequence is now [5].

.next(2) exhausts 2 terms, returning -1.  This is because the first term exhausted was 5,
but the second term did not exist.  Since the last term exhausted does not exist, we return -1.

Note:
`0 <= A.length <= 1000`
`A.length` is an even integer.

`0 <= A[i] <= 10^9`
There are at most `1000` calls to `RLEIterator.next(int n)` per test case.

Each call to `RLEIterator.next(int n)` will have `1 <= n <= 10^9`.', false, 'Medium', '/articles/rle-iterator', 55.6, 
   9.1, 'https://leetcode.com/problems/rle-iterator', 265, 30.5, 54.9, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   325, 97, 77, true, '[]'::jsonb, true),
  (901, 'Online Stock Span', 'Write a class `StockSpanner` which collects daily price quotes for some stock, and returns the span of that stock''s price for the current day.

The span of the stock''s price today is defined as the maximum number of consecutive days (starting from today and going backwards) for which the price of the stock was less than or equal to today''s price.

For example, if the price of a stock over the next 7 days were `[100, 80, 60, 70, 60, 75, 85]`, then the stock spans would be `[1, 1, 1, 2, 1, 4, 6]`.


Example 1:
Input: ["StockSpanner","next","next","next","next","next","next","next"], [[],[100],[80],[60],[70],[60],[75],[85]]
Output: [null,1,1,1,2,1,4,6]
Explanation: 
First, S = StockSpanner() is initialized.  Then:
S.next(100) is called and returns 1,
S.next(80) is called and returns 1,
S.next(60) is called and returns 1,
S.next(70) is called and returns 2,
S.next(60) is called and returns 1,
S.next(75) is called and returns 4,
S.next(85) is called and returns 6.

Note that (for example) S.next(75) returned 4, because the last 4 prices
(including today''s price of 75) were less than or equal to today''s price.

Note:
Calls to `StockSpanner.next(int price)` will have `1 <= price <= 10^5`.

There will be at most `10000` calls to `StockSpanner.next` per test case.

There will be at most `150000` calls to `StockSpanner.next` across all test cases.

The total time limit for this problem has been reduced by 75% for C++, and 50% for all other languages.', false, 'Medium', '/articles/online-stock-span', 61.5, 
   40, 'https://leetcode.com/problems/online-stock-span', 470, 88.3, 143.6, '["Amazon"]'::jsonb, '["Stack"]'::jsonb, 
   1397, 160, 90, true, '[]'::jsonb, true),
  (902, 'Numbers At Most N Given Digit Set', 'Given an array of `digits` which is sorted in non-decreasing order. You can write numbers using each `digits[i]` as many times as we want. For example, if `digits = [''1'',''3'',''5'']`, we may write numbers such as `''13''`, `''551''`, and `''1351315''`.

Return the number of positive integers that can be generated that are less than or equal to a given integer `n`.


Example 1:
Input: digits = ["1","3","5","7"], n = 100
Output: 20
Explanation: 
The 20 numbers that can be written are:
1, 3, 5, 7, 11, 13, 15, 17, 31, 33, 35, 37, 51, 53, 55, 57, 71, 73, 75, 77.


Example 2:
Input: digits = ["1","4","9"], n = 1000000000
Output: 29523
Explanation: 
We can write 3 one digit numbers, 9 two digit numbers, 27 three digit numbers,
81 four digit numbers, 243 five digit numbers, 729 six digit numbers,
2187 seven digit numbers, 6561 eight digit numbers, and 19683 nine digit numbers.

In total, this is 29523 integers that can be written using the digits array.


Example 3:
Input: digits = ["7"], n = 8
Output: 1

Constraints:
`1 <= digits.length <= 9`
`digits[i].length == 1`
`digits[i]` is a digit from `''1''` to `''9''`.

All the values in `digits` are unique.

`digits` is sorted in non-decreasing order.

`1 <= n <= 109`', false, 'Hard', '/articles/numbers-at-most-n-given-digit-set', 36.1, 
   20.2, 'https://leetcode.com/problems/numbers-at-most-n-given-digit-set', 183, 20.3, 56.2, '["Amazon"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   492, 68, 88, true, '[]'::jsonb, true),
  (903, 'Valid Permutations for DI Sequence', 'We are given `S`, a length `n` string of characters from the set `{''D'', ''I''}`. (These letters stand for "decreasing" and "increasing".)
A valid permutation is a permutation `P[0], P[1], ..., P[n]` of integers `{0, 1, ..., n}`, such that for all `i`:
If `S[i] == ''D''`, then `P[i] > P[i+1]`, and;
If `S[i] == ''I''`, then `P[i] < P[i+1]`.

How many valid permutations are there?  Since the answer may be large, return your answer modulo `10^9 + 7`.


Example 1:
Input: "DID"
Output: 5
Explanation: 
The 5 valid permutations of (0, 1, 2, 3) are:
(1, 0, 3, 2)
(2, 0, 3, 1)
(2, 1, 3, 0)
(3, 0, 2, 1)
(3, 1, 2, 0)
Note:
`1 <= S.length <= 200`
`S` consists only of characters from the set `{''D'', ''I''}`.', false, 'Hard', '/articles/valid-permutations-for-di-sequence', 54.2, 
   21, 'https://leetcode.com/problems/valid-permutations-for-di-sequence', 50, 8.2, 15.1, '[]'::jsonb, '[]'::jsonb, 
   351, 30, 92, false, '[]'::jsonb, true),
  (904, 'Fruit Into Baskets', 'In a row of trees, the `i`-th tree produces fruit with type `tree[i]`.

You start at any tree of your choice, then repeatedly perform the following steps:
Add one piece of fruit from this tree to your baskets.  If you cannot, stop.

Move to the next tree to the right of the current tree.  If there is no tree to the right, stop.

Note that you do not have any choice after the initial choice of starting tree: you must perform step 1, then step 2, then back to step 1, then step 2, and so on until you stop.

You have two baskets, and each basket can carry any quantity of fruit, but you want each basket to only carry one type of fruit each.

What is the total amount of fruit you can collect with this procedure?

Example 1:
Input: [1,2,1]
Output: 3
Explanation: We can collect [1,2,1].


Example 2:
Input: [0,1,2,2]
Output: 3
Explanation: We can collect [1,2,2].

If we started at the first tree, we would only collect [0, 1].


Example 3:
Input: [1,2,3,2,2]
Output: 4
Explanation: We can collect [2,3,2,2].

If we started at the first tree, we would only collect [1, 2].


Example 4:
Input: [3,3,3,1,2,1,1,2,3,3,4]
Output: 5
Explanation: We can collect [1,2,1,1,2].

If we started at the first tree or the eighth tree, we would only collect 4 fruits.

Note:
`1 <= tree.length <= 40000`
`0 <= tree[i] < tree.length`', false, 'Medium', '/articles/fruit-into-baskets', 43, 
   9.3, 'https://leetcode.com/problems/fruit-into-baskets', 712, 129.2, 300.4, '["Google,Akamai"]'::jsonb, '["Two Pointers"]'::jsonb, 
   1164, 1670, 41, true, '[]'::jsonb, true),
  (905, 'Sort Array By Parity', 'Given an array `A` of non-negative integers, return an array consisting of all the even elements of `A`, followed by all the odd elements of `A`.

You may return any answer array that satisfies this condition.


Example 1:
Input: [3,1,2,4]
Output: [2,4,3,1]
The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

Note:
`1 <= A.length <= 5000`
`0 <= A[i] <= 5000`', false, 'Easy', '/articles/sort-array-by-parity', 75, 
   24.7, 'https://leetcode.com/problems/sort-array-by-parity', 999, 313.7, 418.3, '["Capital One,VMware"]'::jsonb, '["Array"]'::jsonb, 
   1633, 88, 95, false, '[]'::jsonb, true),
  (906, 'Super Palindromes', 'Let''s say a positive integer is a super-palindrome if it is a palindrome, and it is also the square of a palindrome.

Given two positive integers `left` and `right` represented as strings, return the number of super-palindromes integers in the inclusive range `[left, right]`.


Example 1:
Input: left = "4", right = "1000"
Output: 4
Explanation: 4, 9, 121, and 484 are superpalindromes.

Note that 676 is not a superpalindrome: 26 * 26 = 676, but 26 is not a palindrome.


Example 2:
Input: left = "1", right = "2"
Output: 1

Constraints:
`1 <= left.length, right.length <= 18`
`left` and `right` consist of only digits.

`left` and `right` cannot have leading zeros.

`left` and `right` represent integers in the range `[1, 1018]`.

`left` is less than or equal to `right`.', false, 'Hard', '/articles/super-palindromes', 32.7, 
   6.4, 'https://leetcode.com/problems/super-palindromes', 57, 6.5, 19.8, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   98, 176, 36, true, '[]'::jsonb, true),
  (907, 'Sum of Subarray Minimums', 'Given an array of integers arr, find the sum of `min(b)`, where `b` ranges over every (contiguous) subarray of `arr`. Since the answer may be large, return the answer modulo `109 + 7`.


Example 1:
Input: arr = [3,1,2,4]
Output: 17
Explanation: 
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.

Sum is 17.


Example 2:
Input: arr = [11,81,94,43,3]
Output: 444

Constraints:
`1 <= arr.length <= 3 * 104`
`1 <= arr[i] <= 3 * 104`', false, 'Medium', '/articles/sum-of-subarray-minimums', 33.1, 
   19.8, 'https://leetcode.com/problems/sum-of-subarray-minimums', 244, 39, 117.8, '["Google,Dunzo,Microsoft,VMware"]'::jsonb, '["Array,Stack"]'::jsonb, 
   1896, 120, 94, true, '[]'::jsonb, true),
  (908, 'Smallest Range I', 'Given an array `A` of integers, for each integer `A[i]` we may choose any `x` with `-K <= x <= K`, and add `x` to `A[i]`.

After this process, we have some array `B`.

Return the smallest possible difference between the maximum value of `B` and the minimum value of `B`.


Example 1:
Input: A = [1], K = 0
Output: 0
Explanation: B = [1]

Example 2:
Input: A = [0,10], K = 2
Output: 6
Explanation: B = [2,8]

Example 3:
Input: A = [1,3,6], K = 3
Output: 0
Explanation: B = [3,3,3] or B = [4,4,4]
Note:
`1 <= A.length <= 10000`
`0 <= A[i] <= 10000`
`0 <= K <= 10000`', false, 'Easy', '/articles/smallest-range-i', 66.4, 
   5.4, 'https://leetcode.com/problems/smallest-range-i', 372, 49, 73.9, '["Adobe"]'::jsonb, '["Math"]'::jsonb, 
   308, 1308, 19, false, '[]'::jsonb, true),
  (909, 'Snakes and Ladders', 'On an N x N `board`, the numbers from `1` to `N*N` are written boustrophedonically starting from the bottom left of the board, and alternating direction each row.  For example, for a 6 x 6 board, the numbers are written as follows:
You start on square `1` of the board (which is always in the last row and first column).  Each move, starting from square `x`, consists of the following:
You choose a destination square `S` with number `x+1`, `x+2`, `x+3`, `x+4`, `x+5`, or `x+6`, provided this number is `<= N*N`.

	
(This choice simulates the result of a standard 6-sided die roll: ie., there are always at most 6 destinations, regardless of the size of the board.)
If `S` has a snake or ladder, you move to the destination of that snake or ladder.  Otherwise, you move to `S`.

A board square on row `r` and column `c` has a "snake or ladder" if `board[r][c] != -1`.  The destination of that snake or ladder is `board[r][c]`.

Note that you only take a snake or ladder at most once per move: if the destination to a snake or ladder is the start of another snake or ladder, you do not continue moving.  (For example, if the board is `[[4,-1],[-1,3]]`, and on the first move your destination square is `2`, then you finish your first move at `3`, because you do not continue moving to `4`.)
Return the least number of moves required to reach square N*N.  If it is not possible, return `-1`.


Example 1:
Input: [
[-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1],
[-1,35,-1,-1,13,-1],
[-1,-1,-1,-1,-1,-1],
[-1,15,-1,-1,-1,-1]]
Output: 4
Explanation: 
At the beginning, you start at square 1 [at row 5, column 0].

You decide to move to square 2, and must take the ladder to square 15.

You then decide to move to square 17 (row 3, column 5), and must take the snake to square 13.

You then decide to move to square 14, and must take the ladder to square 35.

You then decide to move to square 36, ending the game.

It can be shown that you need at least 4 moves to reach the N*N-th square, so the answer is 4.

Note:
`2 <= board.length = board[0].length <= 20`
`board[i][j]` is between `1` and `N*N` or is equal to `-1`.

The board square with number `1` has no snake or ladder.

The board square with number `N*N` has no snake or ladder.', false, 'Medium', '/articles/snakes-and-ladders', 39.3, 
   45.1, 'https://leetcode.com/problems/snakes-and-ladders', 297, 46.2, 117.4, '["Amazon"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   572, 1111, 34, true, '[]'::jsonb, true),
  (910, 'Smallest Range II', 'Given an array `A` of integers, for each integer `A[i]` we need to choose either `x = -K` or `x = K`, and add `x` to `A[i] (only once)`.

After this process, we have some array `B`.

Return the smallest possible difference between the maximum value of `B` and the minimum value of `B`.


Example 1:
Input: A = [1], K = 0
Output: 0
Explanation: B = [1]

Example 2:
Input: A = [0,10], K = 2
Output: 6
Explanation: B = [2,8]

Example 3:
Input: A = [1,3,6], K = 3
Output: 3
Explanation: B = [4,6,3]
Note:
`1 <= A.length <= 10000`
`0 <= A[i] <= 10000`
`0 <= K <= 10000`', false, 'Medium', '/articles/smallest-range-ii', 31.2, 
   10, 'https://leetcode.com/problems/smallest-range-ii', 107, 25.3, 81, '["Adobe"]'::jsonb, '["Math,Greedy"]'::jsonb, 
   663, 282, 70, false, '[]'::jsonb, true),
  (911, 'Online Election', 'In an election, the `i`-th vote was cast for `persons[i]` at time `times[i]`.

Now, we would like to implement the following query function: `TopVotedCandidate.q(int t)` will return the number of the person that was leading the election at time `t`.  
Votes cast at time `t` will count towards our query.  In the case of a tie, the most recent vote (among tied candidates) wins.


Example 1:
Input: ["TopVotedCandidate","q","q","q","q","q","q"], [[[0,1,1,0,0,1,0],[0,5,10,15,20,25,30]],[3],[12],[25],[15],[24],[8]]
Output: [null,0,1,1,0,0,1]
Explanation: 
At time 3, the votes are [0], and 0 is leading.

At time 12, the votes are [0,1,1], and 1 is leading.

At time 25, the votes are [0,1,1,0,0,1], and 1 is leading (as ties go to the most recent vote.)
This continues for 3 more queries at time 15, 24, and 8.

Note:
`1 <= persons.length = times.length <= 5000`
`0 <= persons[i] <= persons.length`
`times` is a strictly increasing array with all elements in `[0, 10^9]`.

`TopVotedCandidate.q` is called at most `10000` times per test case.

`TopVotedCandidate.q(int t)` is always called with `t >= times[0]`.', false, 'Medium', '/articles/online-election', 51.4, 
   15.1, 'https://leetcode.com/problems/online-election', 215, 30.2, 58.7, '["Google"]'::jsonb, '["Binary Search"]'::jsonb, 
   463, 390, 54, true, '[]'::jsonb, true),
  (912, 'Sort an Array', 'Given an array of integers `nums`, sort the array in ascending order.


Example 1:
Input: nums = [5,2,3,1]
Output: [1,2,3,5]

Example 2:
Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]

Constraints:
`1 <= nums.length <= 50000`
`-50000 <= nums[i] <= 50000`', false, 'Medium', NULL, 64.6, 
   31.7, 'https://leetcode.com/problems/sort-an-array', 599, 139.3, 215.5, '["Apple"]'::jsonb, '[]'::jsonb, 
   788, 365, 68, true, '[]'::jsonb, true),
  (913, 'Cat and Mouse', 'A game on an undirected graph is played by two players, Mouse and Cat, who alternate turns.

The graph is given as follows: `graph[a]` is a list of all nodes `b` such that `ab` is an edge of the graph.

The mouse starts at node `1` and goes first, the cat starts at node `2` and goes second, and there is a hole at node `0`.

During each player''s turn, they must travel along one edge of the graph that meets where they are.  For example, if the Mouse is at node 1, it must travel to any node in `graph[1]`.

Additionally, it is not allowed for the Cat to travel to the Hole (node 0.)
Then, the game can end in three ways:
If ever the Cat occupies the same node as the Mouse, the Cat wins.

If ever the Mouse reaches the Hole, the Mouse wins.

If ever a position is repeated (i.e., the players are in the same position as a previous turn, and it is the same player''s turn to move), the game is a draw.

Given a `graph`, and assuming both players play optimally, return
`1` if the mouse wins the game,
`2` if the cat wins the game, or
`0` if the game is a draw.


Example 1:
Input: graph = [[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]
Output: 0

Example 2:
Input: graph = [[1,3],[0],[3],[0,2]]
Output: 1

Constraints:
`3 <= graph.length <= 50`
`1 <= graph[i].length < graph.length`
`0 <= graph[i][j] < graph.length`
`graph[i][j] != i`
`graph[i]` is unique.

The mouse and the cat can always move.', false, 'Hard', '/articles/cat-and-mouse-game', 34.8, 
   28.4, 'https://leetcode.com/problems/cat-and-mouse', 92, 11.5, 33.1, '["Google"]'::jsonb, '["Breadth-first Search,Minimax"]'::jsonb, 
   439, 88, 83, true, '[]'::jsonb, true),
  (914, 'X of a Kind in a Deck of Cards', 'In a deck of cards, each card has an integer written on it.

Return `true` if and only if you can choose `X >= 2` such that it is possible to split the entire deck into 1 or more groups of cards, where:
Each group has exactly `X` cards.

All the cards in each group have the same integer.


Example 1:
Input: deck = [1,2,3,4,4,3,2,1]
Output: true
Explanation: Possible partition [1,1],[2,2],[3,3],[4,4].


Example 2:
Input: deck = [1,1,1,2,2,2,3,3]
Output: false
Explanation: No possible partition.


Example 3:
Input: deck = [1]
Output: false
Explanation: No possible partition.


Example 4:
Input: deck = [1,1]
Output: true
Explanation: Possible partition [1,1].


Example 5:
Input: deck = [1,1,2,2,2,2]
Output: true
Explanation: Possible partition [1,1],[2,2],[2,2].


Constraints:
`1 <= deck.length <= 104`
`0 <= deck[i] < 104`', false, 'Easy', '/articles/x-of-a-kind-in-a-deck-of-cards', 34, 
   5.8, 'https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards', 386, 63.5, 186.5, '["Google"]'::jsonb, '["Array,Math"]'::jsonb, 
   783, 205, 79, true, '[]'::jsonb, true),
  (915, 'Partition Array into Disjoint Intervals', 'Given an array `A`, partition it into two (contiguous) subarrays `left` and `right` so that:
Every element in `left` is less than or equal to every element in `right`.

`left` and `right` are non-empty.

`left` has the smallest possible size.

Return the length of `left` after such a partitioning.  It is guaranteed that such a partitioning exists.


Example 1:
Input: [5,0,3,8,6]
Output: 3
Explanation: left = [5,0,3], right = [8,6]

Example 2:
Input: [1,1,1,0,6,12]
Output: 4
Explanation: left = [1,1,1,0], right = [6,12]
Note:
`2 <= A.length <= 30000`
`0 <= A[i] <= 10^6`
It is guaranteed there is at least one way to partition `A` as described.', false, 'Medium', '/articles/parition-array-into-disjoint-intervals', 46.4, 
   14.3, 'https://leetcode.com/problems/partition-array-into-disjoint-intervals', 218, 25.5, 55, '["Microsoft"]'::jsonb, '["Array"]'::jsonb, 
   466, 34, 93, false, '[]'::jsonb, true),
  (916, 'Word Subsets', 'We are given two arrays `A` and `B` of words.  Each word is a string of lowercase letters.

Now, say that word `b` is a subset of word `a` if every letter in `b` occurs in `a`, including multiplicity.  For example, `"wrr"` is a subset of `"warrior"`, but is not a subset of `"world"`.

Now say a word `a` from `A` is universal if for every `b` in `B`, `b` is a subset of `a`. 
Return a list of all universal words in `A`.  You can return the words in any order.


Example 1:
Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["e","o"]
Output: ["facebook","google","leetcode"]

Example 2:
Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["l","e"]
Output: ["apple","google","leetcode"]

Example 3:
Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["e","oo"]
Output: ["facebook","google"]

Example 4:
Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["lo","eo"]
Output: ["google","leetcode"]

Example 5:
Input: A = ["amazon","apple","facebook","google","leetcode"], B = ["ec","oc","ceo"]
Output: ["facebook","leetcode"]
Note:
`1 <= A.length, B.length <= 10000`
`1 <= A[i].length, B[i].length <= 10`
`A[i]` and `B[i]` consist only of lowercase letters.

All words in `A[i]` are unique: there isn''t `i != j` with `A[i] == A[j]`.', false, 'Medium', '/articles/word-subsets', 52.8, 
   0.3, 'https://leetcode.com/problems/word-subsets', 304, 42.9, 81.2, '["Amazon,Google"]'::jsonb, '["String"]'::jsonb, 
   705, 106, 87, true, '[]'::jsonb, true),
  (917, 'Reverse Only Letters', 'Given a string `S`, return the "reversed" string where all characters that are not a letter stay in the same place, and all letters reverse their positions.


Example 1:
Input: "ab-cd"
Output: "dc-ba"

Example 2:
Input: "a-bC-dEf-ghIj"
Output: "j-Ih-gfE-dCba"

Example 3:
Input: "Test1ng-Leet=code-Q!"
Output: "Qedo1ct-eeLg=ntse-T!"
Note:
`S.length <= 100`
`33 <= S[i].ASCIIcode <= 122` 
`S` doesn''t contain `\\` or `"`', false, 'Easy', '/articles/reverse-only-letters', 59.4, 
   5, 'https://leetcode.com/problems/reverse-only-letters', 944, 80.1, 134.9, '["Apple"]'::jsonb, '["String"]'::jsonb, 
   801, 44, 95, true, '[]'::jsonb, true),
  (918, 'Maximum Sum Circular Subarray', 'Given a circular array C of integers represented by `A`, find the maximum possible sum of a non-empty subarray of C.

Here, a circular array means the end of the array connects to the beginning of the array.  (Formally, `C[i] = A[i]` when `0 <= i < A.length`, and `C[i+A.length] = C[i]` when `i >= 0`.)
Also, a subarray may only include each element of the fixed buffer `A` at most once.  (Formally, for a subarray `C[i], C[i+1], ..., C[j]`, there does not exist `i <= k1, k2 <= j` with `k1 % A.length = k2 % A.length`.)

Example 1:
Input: [1,-2,3,-2]
Output: 3
Explanation: Subarray [3] has maximum sum 3

Example 2:
Input: [5,-3,5]
Output: 10
Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10

Example 3:
Input: [3,-1,2,-1]
Output: 4
Explanation: Subarray [2,-1,3] has maximum sum 2 + (-1) + 3 = 4

Example 4:
Input: [3,-2,2,-3]
Output: 3
Explanation: Subarray [3] and [3,-2,2] both have maximum sum 3

Example 5:
Input: [-2,-3,-1]
Output: -1
Explanation: Subarray [-1] has maximum sum -1
Note: 
`-30000 <= A[i] <= 30000`
`1 <= A.length <= 30000`', false, 'Medium', '/articles/maximum-sub-circular-subarray', 34.3, 
   23.1, 'https://leetcode.com/problems/maximum-sum-circular-subarray', 303, 69.4, 202.4, '["Two Sigma,Amazon,Facebook"]'::jsonb, '["Array"]'::jsonb, 
   1568, 73, 96, true, '[]'::jsonb, true),
  (919, 'Complete Binary Tree Inserter', 'A complete binary tree is a binary tree in which every level, except possibly the last, is completely filled, and all nodes are as far left as possible.

Write a data structure `CBTInserter` that is initialized with a complete binary tree and supports the following operations:
`CBTInserter(TreeNode root)` initializes the data structure on a given tree with head node `root`;
`CBTInserter.insert(int v)` will insert a `TreeNode` into the tree with value `node.val = v` so that the tree remains complete, and returns the value of the parent of the inserted `TreeNode`;
`CBTInserter.get_root()` will return the head node of the tree.


Example 1:
Input: inputs = ["CBTInserter","insert","get_root"], inputs = [[[1]],[2],[]]
Output: [null,1,[1,2]]

Example 2:
Input: inputs = ["CBTInserter","insert","insert","get_root"], inputs = [[[1,2,3,4,5,6]],[7],[8],[]]
Output: [null,3,4,[1,2,3,4,5,6,7,8]]
Note:
The initial given tree is complete and contains between `1` and `1000` nodes.

`CBTInserter.insert` is called at most `10000` times per test case.

Every value of a given or inserted node is between `0` and `5000`.', false, 'Medium', '/articles/complete-binary-tree-inserter', 59.1, 
   7.3, 'https://leetcode.com/problems/complete-binary-tree-inserter', 211, 22.8, 38.6, '["Facebook,Microsoft"]'::jsonb, '["Tree"]'::jsonb, 
   409, 59, 87, true, '[]'::jsonb, true),
  (920, 'Number of Music Playlists', 'Your music player contains `N` different songs and she wants to listen to `L` (not necessarily different) songs during your trip.  You create a playlist so that:
Every song is played at least once
A song can only be played again only if `K` other songs have been played
Return the number of possible playlists.  As the answer can be very large, return it modulo `10^9 + 7`.


Example 1:
Input: N = 3, L = 3, K = 1
Output: 6
Explanation: There are 6 possible playlists. [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1].


Example 2:
Input: N = 2, L = 3, K = 0
Output: 6
Explanation: There are 6 possible playlists. [1, 1, 2], [1, 2, 1], [2, 1, 1], [2, 2, 1], [2, 1, 2], [1, 2, 2]

Example 3:
Input: N = 2, L = 3, K = 1
Output: 2
Explanation: There are 2 possible playlists. [1, 2, 1], [2, 1, 2]
Note:
`0 <= K < N <= L <= 100`', false, 'Hard', '/articles/number-of-music-playlists', 48, 
   35.4, 'https://leetcode.com/problems/number-of-music-playlists', 74, 14.2, 29.6, '["Salesforce,Facebook"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   542, 56, 91, true, '[]'::jsonb, true),
  (921, 'Minimum Add to Make Parentheses Valid', 'Given a string `S` of `''(''` and `'')''` parentheses, we add the minimum number of parentheses ( `''(''` or `'')''`, and in any positions ) so that the resulting parentheses string is valid.

Formally, a parentheses string is valid if and only if:
It is the empty string, or
It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are valid strings, or
It can be written as `(A)`, where `A` is a valid string.

Given a parentheses string, return the minimum number of parentheses we must add to make the resulting string valid.


Example 1:
Input: "())"
Output: 1

Example 2:
Input: "((("
Output: 3

Example 3:
Input: "()"
Output: 0

Example 4:
Input: "()))(("
Output: 4
Note:
`S.length <= 1000`
`S` only consists of `''(''` and `'')''` characters.', false, 'Medium', '/articles/minimum-add-to-make-parentheses-valid', 74.9, 
   18.6, 'https://leetcode.com/problems/minimum-add-to-make-parentheses-valid', 999, 98.1, 130.9, '["Facebook,Visa"]'::jsonb, '["Stack,Greedy"]'::jsonb, 
   1146, 80, 93, true, '[]'::jsonb, true),
  (922, 'Sort Array By Parity II', 'Given an array of integers `nums`, half of the integers in `nums` are odd, and the other half are even.

Sort the array so that whenever `nums[i]` is odd, `i` is odd, and whenever `nums[i]` is even, `i` is even.

Return any answer array that satisfies this condition.


Example 1:
Input: nums = [4,2,5,7]
Output: [4,5,2,7]
Explanation: [4,7,2,5], [2,5,4,7], [2,7,4,5] would also have been accepted.


Example 2:
Input: nums = [2,3]
Output: [2,3]

Constraints:
`2 <= nums.length <= 2 * 104`
`nums.length` is even.

Half of the integers in `nums` are even.

`0 <= nums[i] <= 1000`', false, 'Easy', '/articles/sort-array-by-parity-ii', 70.7, 
   11, 'https://leetcode.com/problems/sort-array-by-parity-ii', 881, 123.9, 175.2, '["Amazon"]'::jsonb, '["Array,Sort"]'::jsonb, 
   978, 59, 94, true, '[]'::jsonb, true),
  (923, '3Sum With Multiplicity', 'Given an integer array `arr`, and an integer `target`, return the number of tuples `i, j, k` such that `i < j < k` and `arr[i] + arr[j] + arr[k] == target`.

As the answer can be very large, return it modulo `109 + 7`.


Example 1:
Input: arr = [1,1,2,2,3,3,4,4,5,5], target = 8
Output: 20
Explanation: 
Enumerating by the values (arr[i], arr[j], arr[k]):
(1, 2, 5) occurs 8 times;
(1, 3, 4) occurs 8 times;
(2, 2, 4) occurs 2 times;
(2, 3, 3) occurs 2 times.


Example 2:
Input: arr = [1,1,2,2,2,2], target = 5
Output: 12
Explanation: 
arr[i] = 1, arr[j] = arr[k] = 2 occurs 12 times:
We choose one 1 from [1,1] in 2 ways,
and two 2s from [2,2,2,2] in 6 ways.


Constraints:
`3 <= arr.length <= 3000`
`0 <= arr[i] <= 100`
`0 <= target <= 300`', false, 'Medium', '/articles/3sum-with-multiplicity', 40.9, 
   0.5, 'https://leetcode.com/problems/3sum-with-multiplicity', 218, 39.5, 96.4, '["Quora"]'::jsonb, '["Two Pointers"]'::jsonb, 
   681, 123, 85, false, '[]'::jsonb, true),
  (924, 'Minimize Malware Spread', 'You are given a network of `n` nodes represented as an `n x n` adjacency matrix `graph`, where the `ith` node is directly connected to the `jth` node if `graph[i][j] == 1`.

Some nodes `initial` are initially infected by malware. Whenever two nodes are directly connected, and at least one of those two nodes is infected by malware, both nodes will be infected by malware. This spread of malware will continue until no more nodes can be infected in this manner.

Suppose `M(initial)` is the final number of nodes infected with malware in the entire network after the spread of malware stops. We will remove exactly one node from `initial`.

Return the node that, if removed, would minimize `M(initial)`. If multiple nodes could be removed to minimize `M(initial)`, return such a node with the smallest index.

Note that if a node was removed from the `initial` list of infected nodes, it might still be infected later due to the malware spread.


Example 1:
Input: graph = [[1,1,0],[1,1,0],[0,0,1]], initial = [0,1]
Output: 0

Example 2:
Input: graph = [[1,0,0],[0,1,0],[0,0,1]], initial = [0,2]
Output: 0

Example 3:
Input: graph = [[1,1,1],[1,1,1],[1,1,1]], initial = [1,2]
Output: 1

Constraints:
`n == graph.length`
`n == graph[i].length`
`2 <= n <= 300`
`graph[i][j]` is `0` or `1`.

`graph[i][j] == graph[j][i]`
`graph[i][i] == 1`
`1 <= initial.length <= n`
`0 <= initial[i] <= n - 1`
All the integers in `initial` are unique.', false, 'Hard', '/articles/minimize-malware-spread', 41.9, 
   14.4, 'https://leetcode.com/problems/minimize-malware-spread', 207, 30, 71.4, '["ByteDance"]'::jsonb, '["Depth-first Search,Union Find"]'::jsonb, 
   411, 307, 57, false, '[]'::jsonb, true),
  (925, 'Long Pressed Name', 'Your friend is typing his `name` into a keyboard. Sometimes, when typing a character `c`, the key might get long pressed, and the character will be typed 1 or more times.

You examine the `typed` characters of the keyboard. Return `True` if it is possible that it was your friends name, with some characters (possibly none) being long pressed.


Example 1:
Input: name = "alex", typed = "aaleex"
Output: true
Explanation: ''a'' and ''e'' in ''alex'' were long pressed.


Example 2:
Input: name = "saeed", typed = "ssaaedd"
Output: false
Explanation: ''e'' must have been pressed twice, but it wasn''t in the typed output.


Example 3:
Input: name = "leelee", typed = "lleeelee"
Output: true

Example 4:
Input: name = "laiden", typed = "laiden"
Output: true
Explanation: It''s not necessary to long press any character.


Constraints:
`1 <= name.length <= 1000`
`1 <= typed.length <= 1000`
`name` and `typed` contain only lowercase English letters.', false, 'Easy', '/articles/long-pressed-name', 37.5, 
   8.4, 'https://leetcode.com/problems/long-pressed-name', 792, 63.2, 168.8, '["Google"]'::jsonb, '["Two Pointers,String"]'::jsonb, 
   939, 170, 85, true, '[]'::jsonb, true),
  (926, 'Flip String to Monotone Increasing', 'A string of `''0''`s and `''1''`s is monotone increasing if it consists of some number of `''0''`s (possibly 0), followed by some number of `''1''`s (also possibly 0.)
We are given a string `S` of `''0''`s and `''1''`s, and we may flip any `''0''` to a `''1''` or a `''1''` to a `''0''`.

Return the minimum number of flips to make `S` monotone increasing.


Example 1:
Input: "00110"
Output: 1
Explanation: We flip the last digit to get 00111.


Example 2:
Input: "010110"
Output: 2
Explanation: We flip to get 011111, or alternatively 000111.


Example 3:
Input: "00011000"
Output: 2
Explanation: We flip to get 00000000.

Note:
`1 <= S.length <= 20000`
`S` only consists of `''0''` and `''1''` characters.', false, 'Medium', '/articles/flip-string-to-monotone-increasing', 53.4, 
   13.7, 'https://leetcode.com/problems/flip-string-to-monotone-increasing', 290, 26.9, 50.4, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   766, 25, 97, true, '[]'::jsonb, true),
  (927, 'Three Equal Parts', 'You are given an array `arr` which consists of only zeros and ones, divide the array into three non-empty parts such that all of these parts represent the same binary value.

If it is possible, return any `[i, j]` with `i + 1 < j`, such that:
`arr[0], arr[1], ..., arr[i]` is the first part,
`arr[i + 1], arr[i + 2], ..., arr[j - 1]` is the second part, and
`arr[j], arr[j + 1], ..., arr[arr.length - 1]` is the third part.

All three parts have equal binary values.

If it is not possible, return `[-1, -1]`.

Note that the entire part is used when considering what binary value it represents. For example, `[1,1,0]` represents `6` in decimal, not `3`. Also, leading zeros are allowed, so `[0,1,1]` and `[1,1]` represent the same value.


Example 1:
Input: arr = [1,0,1,0,1]
Output: [0,3]

Example 2:
Input: arr = [1,1,0,1,1]
Output: [-1,-1]

Example 3:
Input: arr = [1,1,0,0,1]
Output: [0,2]

Constraints:
`3 <= arr.length <= 3 * 104`
`arr[i]` is `0` or `1`', false, 'Hard', '/articles/three-equal-parts', 34.7, 
   5.5, 'https://leetcode.com/problems/three-equal-parts', 131, 9.2, 26.4, '["Netflix,Hotstar"]'::jsonb, '["Math,Binary Search,Greedy"]'::jsonb, 
   296, 63, 82, true, '[]'::jsonb, true),
  (928, 'Minimize Malware Spread II', 'You are given a network of `n` nodes represented as an `n x n` adjacency matrix `graph`, where the `ith` node is directly connected to the `jth` node if `graph[i][j] == 1`.

Some nodes `initial` are initially infected by malware. Whenever two nodes are directly connected, and at least one of those two nodes is infected by malware, both nodes will be infected by malware. This spread of malware will continue until no more nodes can be infected in this manner.

Suppose `M(initial)` is the final number of nodes infected with malware in the entire network after the spread of malware stops.

We will remove exactly one node from `initial`, completely removing it and any connections from this node to any other node.

Return the node that, if removed, would minimize `M(initial)`. If multiple nodes could be removed to minimize `M(initial)`, return such a node with the smallest index.


Example 1:
Input: graph = [[1,1,0],[1,1,0],[0,0,1]], initial = [0,1]
Output: 0

Example 2:
Input: graph = [[1,1,0],[1,1,1],[0,1,1]], initial = [0,1]
Output: 1

Example 3:
Input: graph = [[1,1,0,0],[1,1,1,0],[0,1,1,1],[0,0,1,1]], initial = [0,1]
Output: 1

Constraints:
`n == graph.length`
`n == graph[i].length`
`2 <= n <= 300`
`graph[i][j]` is `0` or `1`.

`graph[i][j] == graph[j][i]`
`graph[i][i] == 1`
`1 <= initial.length < n`
`0 <= initial[i] <= n - 1`
All the integers in `initial` are unique.', false, 'Hard', '/articles/minimize-malware-spread-ii', 41.5, 
   14.6, 'https://leetcode.com/problems/minimize-malware-spread-ii', 107, 12.2, 29.3, '["Dropbox"]'::jsonb, '["Depth-first Search,Union Find,Graph"]'::jsonb, 
   278, 60, 82, false, '[]'::jsonb, true),
  (929, 'Unique Email Addresses', 'Every valid email consists of a local name and a domain name, separated by the `''@''` sign. Besides lowercase letters, the email may contain one or more `''.''` or `''+''`.

For example, in `"alice@leetcode.com"`, `"alice"` is the local name, and `"leetcode.com"` is the domain name.

If you add periods `''.''` between some characters in the local name part of an email address, mail sent there will be forwarded to the same address without dots in the local name. Note that this rule does not apply to domain names.

For example, `"alice.z@leetcode.com"` and `"alicez@leetcode.com"` forward to the same email address.

If you add a plus `''+''` in the local name, everything after the first plus sign will be ignored. This allows certain emails to be filtered. Note that this rule does not apply to domain names.

For example, `"m.y+name@email.com"` will be forwarded to `"my@email.com"`.

It is possible to use both of these rules at the same time.

Given an array of strings `emails` where we send one email to each `email[i]`, return the number of different addresses that actually receive mails.


Example 1:
Input: emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
Output: 2
Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails.


Example 2:
Input: emails = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"]
Output: 3

Constraints:
`1 <= emails.length <= 100`
`1 <= emails[i].length <= 100`
`email[i]` consist of lowercase English letters, `''+''`, `''.''` and `''@''`.

Each `emails[i]` contains exactly one `''@''` character.

All local and domain names are non-empty.

Local names do not start with a `''+''` character.', false, 'Easy', '/articles/unique-email-addresses', 67.2, 
   5.3, 'https://leetcode.com/problems/unique-email-addresses', 999, 252.1, 374.9, '["Google"]'::jsonb, '["String"]'::jsonb, 
   1146, 220, 84, true, '[]'::jsonb, true),
  (930, 'Binary Subarrays With Sum', 'In an array `A` of `0`s and `1`s, how many non-empty subarrays have sum `S`?

Example 1:
Input: A = [1,0,1,0,1], S = 2
Output: 4
Explanation: 
The 4 subarrays are bolded below:
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
Note:
`A.length <= 30000`
`0 <= S <= A.length`
`A[i]` is either `0` or `1`.', false, 'Medium', '/articles/binary-subarrays-with-sum', 44.8, 
   4.5, 'https://leetcode.com/problems/binary-subarrays-with-sum', 206, 30.5, 68, '["C3 IoT"]'::jsonb, '["Hash Table,Two Pointers"]'::jsonb, 
   772, 32, 96, false, '[]'::jsonb, true),
  (931, 'Minimum Falling Path Sum', 'Given an `n x n` array of integers `matrix`, return the minimum sum of any falling path through `matrix`.

A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. Specifically, the next element from position `(row, col)` will be `(row + 1, col - 1)`, `(row + 1, col)`, or `(row + 1, col + 1)`.


Example 1:
Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
Output: 13
Explanation: There are two falling paths with a minimum sum underlined below:
[[2,1,3],      [[2,1,3],
 [6,5,4],       [6,5,4],
 [7,8,9]]       [7,8,9]]

Example 2:
Input: matrix = [[-19,57],[-40,-5]]
Output: -59
Explanation: The falling path with a minimum sum is underlined below:
[[-19,57],
 [-40,-5]]

Example 3:
Input: matrix = [[-48]]
Output: -48

Constraints:
`n == matrix.length`
`n == matrix[i].length`
`1 <= n <= 100`
`-100 <= matrix[i][j] <= 100`', false, 'Medium', '/articles/minimum-path-falling-sum', 63.7, 
   11.3, 'https://leetcode.com/problems/minimum-falling-path-sum', 693, 70.4, 110.4, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1146, 83, 93, true, '[]'::jsonb, true),
  (932, 'Beautiful Array', 'For some fixed `N`, an array `A` is beautiful if it is a permutation of the integers `1, 2, ..., N`, such that:
For every `i < j`, there is no `k` with `i < k < j` such that `A[k] * 2 = A[i] + A[j]`.

Given `N`, return any beautiful array `A`.  (It is guaranteed that one exists.)

Example 1:
Input: 4
Output: [2,1,4,3]

Example 2:
Input: 5
Output: [3,1,2,5,4]
Note:
`1 <= N <= 1000`', false, 'Medium', '/articles/beautiful-array', 61.4, 
   26.5, 'https://leetcode.com/problems/beautiful-array', 74, 15.7, 25.6, '["Google"]'::jsonb, '["Divide and Conquer"]'::jsonb, 
   466, 567, 45, true, '[]'::jsonb, true),
  (933, 'Number of Recent Calls', 'You have a `RecentCounter` class which counts the number of recent requests within a certain time frame.

Implement the `RecentCounter` class:
`RecentCounter()` Initializes the counter with zero recent requests.

`int ping(int t)` Adds a new request at time `t`, where `t` represents some time in milliseconds, and returns the number of requests that has happened in the past `3000` milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range `[t - 3000, t]`.

It is guaranteed that every call to `ping` uses a strictly larger value of `t` than the previous call.


Example 1:
Input
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
Output
[null, 1, 2, 3, 3]
Explanation
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3

Constraints:
`1 <= t <= 109`
Each test case will call `ping` with strictly increasing values of `t`.

At most `104` calls will be made to `ping`.', false, 'Easy', '/articles/number-of-recent-calls', 72.4, 
   2.2, 'https://leetcode.com/problems/number-of-recent-calls', 543, 99.5, 137.3, '["Yandex"]'::jsonb, '["Queue"]'::jsonb, 
   561, 2147, 21, false, '[]'::jsonb, true),
  (934, 'Shortest Bridge', 'In a given 2D binary array `A`, there are two islands.  (An island is a 4-directionally connected group of `1`s not connected to any other 1s.)
Now, we may change `0`s to `1`s so as to connect the two islands together to form 1 island.

Return the smallest number of `0`s that must be flipped.  (It is guaranteed that the answer is at least 1.)

Example 1:
Input: A = [[0,1],[1,0]]
Output: 1

Example 2:
Input: A = [[0,1,0],[0,0,0],[0,0,1]]
Output: 2

Example 3:
Input: A = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
Output: 1

Constraints:
`2 <= A.length == A[0].length <= 100`
`A[i][j] == 0` or `A[i][j] == 1`', false, 'Medium', '/articles/shortest-bridge', 49.9, 
   41.6, 'https://leetcode.com/problems/shortest-bridge', 367, 47.9, 96.1, '["Google,Uber,Bloomberg,Snapchat"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   1283, 87, 94, true, '[]'::jsonb, true),
  (935, 'Knight Dialer', 'The chess knight has a unique movement, it may move two squares vertically and one square horizontally, or two squares horizontally and one square vertically (with both forming the shape of an L). The possible movements of chess knight are shown in this diagaram:
A chess knight can move as indicated in the chess diagram below:
We have a chess knight and a phone pad as shown below, the knight can only stand on a numeric cell (i.e. blue cell).

Given an integer `n`, return how many distinct phone numbers of length `n` we can dial.

You are allowed to place the knight on any numeric cell initially and then you should perform `n - 1` jumps to dial a number of length `n`. All jumps should be valid knight jumps.

As the answer may be very large, return the answer modulo `109 + 7`.


Example 1:
Input: n = 1
Output: 10
Explanation: We need to dial a number of length 1, so placing the knight over any numeric cell of the 10 cells is sufficient.


Example 2:
Input: n = 2
Output: 20
Explanation: All the valid number we can dial are [04, 06, 16, 18, 27, 29, 34, 38, 40, 43, 49, 60, 61, 67, 72, 76, 81, 83, 92, 94]

Example 3:
Input: n = 3
Output: 46

Example 4:
Input: n = 4
Output: 104

Example 5:
Input: n = 3131
Output: 136006598
Explanation: Please take care of the mod.


Constraints:
`1 <= n <= 5000`', false, 'Medium', '/articles/knight-dialer', 46.7, 
   41.9, 'https://leetcode.com/problems/knight-dialer', 310, 48.3, 103.6, '["Qualtrics"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   817, 289, 74, false, '[]'::jsonb, true),
  (936, 'Stamping The Sequence', 'You want to form a `target` string of lowercase letters.

At the beginning, your sequence is `target.length` `''?''` marks.  You also have a `stamp` of lowercase letters.

On each turn, you may place the stamp over the sequence, and replace every letter in the sequence with the corresponding letter from the stamp.  You can make up to `10 * target.length` turns.

For example, if the initial sequence is "?????", and your stamp is `"abc"`,  then you may make "abc??", "?abc?", "??abc" in the first turn.  (Note that the stamp must be fully contained in the boundaries of the sequence in order to stamp.)
If the sequence is possible to stamp, then return an array of the index of the left-most letter being stamped at each turn.  If the sequence is not possible to stamp, return an empty array.

For example, if the sequence is "ababc", and the stamp is `"abc"`, then we could return the answer `[0, 2]`, corresponding to the moves "?????" -> "abc??" -> "ababc".

Also, if the sequence is possible to stamp, it is guaranteed it is possible to stamp within `10 * target.length` moves.  Any answers specifying more than this number of moves will not be accepted.


Example 1:
Input: stamp = "abc", target = "ababc"
Output: [0,2]
([1,0,2] would also be accepted as an answer, as well as some other answers.)

Example 2:
Input: stamp = "abca", target = "aabcaca"
Output: [3,0,1]
Note:
`1 <= stamp.length <= target.length <= 1000`
`stamp` and `target` only contain lowercase letters.', false, 'Hard', '/articles/stamping-the-sequence', 53.4, 
   0.5, 'https://leetcode.com/problems/stamping-the-sequence', 105, 21.8, 40.8, '["Facebook"]'::jsonb, '["String,Greedy"]'::jsonb, 
   431, 108, 80, true, '[]'::jsonb, true),
  (937, 'Reorder Data in Log Files', 'You are given an array of `logs`. Each log is a space-delimited string of words, where the first word is the identifier.

There are two types of logs:
Letter-logs: All words (except the identifier) consist of lowercase English letters.

Digit-logs: All words (except the identifier) consist of digits.

Reorder these logs so that:
The letter-logs come before all digit-logs.

The letter-logs are sorted lexicographically by their contents. If their contents are the same, then sort them lexicographically by their identifiers.

The digit-logs maintain their relative ordering.

Return the final order of the logs.


Example 1:
Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
Explanation:
The letter-log contents are all different, so their ordering is "art can", "art zero", "own kit dig".

The digit-logs have a relative order of "dig1 8 1 5 1", "dig2 3 6".


Example 2:
Input: logs = ["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]
Output: ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]

Constraints:
`1 <= logs.length <= 100`
`3 <= logs[i].length <= 100`
All the tokens of `logs[i]` are separated by a single space.

`logs[i]` is guaranteed to have an identifier and at least one word after the identifier.', false, 'Easy', '/articles/reorder-data-in-log-files', 54.8, 
   65.2, 'https://leetcode.com/problems/reorder-data-in-log-files', 935, 202.8, 370.2, '["Amazon,Audible"]'::jsonb, '["String"]'::jsonb, 
   1056, 2863, 27, true, '[]'::jsonb, true),
  (938, 'Range Sum of BST', 'Given the `root` node of a binary search tree, return the sum of values of all nodes with a value in the range `[low, high]`.


Example 1:
Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32

Example 2:
Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Output: 23

Constraints:
The number of nodes in the tree is in the range `[1, 2 * 104]`.

`1 <= Node.val <= 105`
`1 <= low <= high <= 105`
All `Node.val` are unique.', false, 'Easy', '/articles/range-sum-of-bst', 83.2, 
   46.6, 'https://leetcode.com/problems/range-sum-of-bst', 999, 359.1, 431.6, '["Facebook,Google,Oracle"]'::jsonb, '["Tree,Depth-first Search,Recursion"]'::jsonb, 
   2230, 291, 88, true, '[]'::jsonb, true),
  (939, 'Minimum Area Rectangle', 'Given a set of points in the xy-plane, determine the minimum area of a rectangle formed from these points, with sides parallel to the x and y axes.

If there isn''t any rectangle, return 0.


Example 1:
Input: [[1,1],[1,3],[3,1],[3,3],[2,2]]
Output: 4

Example 2:
Input: [[1,1],[1,3],[3,1],[3,3],[4,1],[4,3]]
Output: 2
Note:
`1 <= points.length <= 500`
`0 <= points[i][0] <= 40000`
`0 <= points[i][1] <= 40000`
All points are distinct.', false, 'Medium', '/articles/minimum-area-rectangle', 52.2, 
   28.3, 'https://leetcode.com/problems/minimum-area-rectangle', 247, 67.2, 128.8, '["Facebook,Amazon,Snapchat"]'::jsonb, '["Hash Table"]'::jsonb, 
   932, 177, 84, true, '[]'::jsonb, true),
  (940, 'Distinct Subsequences II', 'Given a string `S`, count the number of distinct, non-empty subsequences of `S` .

Since the result may be large, return the answer modulo `10^9 + 7`.


Example 1:
Input: "abc"
Output: 7
Explanation: The 7 distinct subsequences are "a", "b", "c", "ab", "ac", "bc", and "abc".


Example 2:
Input: "aba"
Output: 6
Explanation: The 6 distinct subsequences are "a", "b", "ab", "ba", "aa" and "aba".


Example 3:
Input: "aaa"
Output: 3
Explanation: The 3 distinct subsequences are "a", "aa" and "aaa".

Note:
`S` contains only lowercase letters.

`1 <= S.length <= 2000`', false, 'Hard', '/articles/distinct-subsequences-ii', 41.5, 
   25.4, 'https://leetcode.com/problems/distinct-subsequences-ii', 84, 13.9, 33.4, '[]'::jsonb, '[]'::jsonb, 
   520, 17, 97, false, '[]'::jsonb, true),
  (941, 'Valid Mountain Array', 'Given an array of integers `arr`, return `true` if and only if it is a valid mountain array.

Recall that arr is a mountain array if and only if:
`arr.length >= 3`
There exists some `i` with `0 < i < arr.length - 1` such that:
	
`arr[0] < arr[1] < ... < arr[i - 1] < arr[i] `
`arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

Example 1:
Input: arr = [2,1]
Output: false

Example 2:
Input: arr = [3,5,5]
Output: false

Example 3:
Input: arr = [0,3,2,1]
Output: true

Constraints:
`1 <= arr.length <= 104`
`0 <= arr[i] <= 104`', false, 'Easy', '/articles/valid-mountain-array', 33, 
   12.7, 'https://leetcode.com/problems/valid-mountain-array', 996, 150, 453.9, '[]'::jsonb, '[]'::jsonb, 
   889, 96, 90, false, '[]'::jsonb, true),
  (942, 'DI String Match', 'A permutation `perm` of `n + 1` integers of all the integers in the range `[0, n]` can be represented as a string `s` of length `n` where:
`s[i] == ''I''` if `perm[i] < perm[i + 1]`, and
`s[i] == ''D''` if `perm[i] > perm[i + 1]`.

Given a string `s`, reconstruct the permutation perm and return it. If there are multiple valid permutations perm, return any of them.


Example 1:
Input: s = "IDID"
Output: [0,4,1,3,2]

Example 2:
Input: s = "III"
Output: [0,1,2,3]

Example 3:
Input: s = "DDI"
Output: [3,2,0,1]

Constraints:
`1 <= s.length <= 105`
`s[i]` is either `''I''` or `''D''`.', false, 'Easy', '/articles/di-string-match', 73.7, 
   7.6, 'https://leetcode.com/problems/di-string-match', 609, 80.5, 109.1, '["Uber"]'::jsonb, '["Math"]'::jsonb, 
   1129, 437, 72, false, '[]'::jsonb, true),
  (943, 'Find the Shortest Superstring', 'Given an array of strings `words`, return the smallest string that contains each string in `words` as a substring. If there are multiple valid strings of the smallest length, return any of them.

You may assume that no string in `words` is a substring of another string in `words`.


Example 1:
Input: words = ["alex","loves","leetcode"]
Output: "alexlovesleetcode"
Explanation: All permutations of "alex","loves","leetcode" would also be accepted.


Example 2:
Input: words = ["catg","ctaagt","gcta","ttca","atgcatc"]
Output: "gctaagttcatgcatc"

Constraints:
`1 <= words.length <= 12`
`1 <= words[i].length <= 20`
`words[i]` consists of lowercase English letters.

All the strings of `words` are unique.', false, 'Hard', '/articles/find-the-shortest-superstring', 43.4, 
   10.3, 'https://leetcode.com/problems/find-the-shortest-superstring', 81, 12.7, 29.3, '["Amazon,Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   515, 78, 87, true, '[]'::jsonb, true),
  (944, 'Delete Columns to Make Sorted', 'You are given an array of `n` strings `strs`, all of the same length.

The strings can be arranged such that there is one on each line, making a grid. For example, `strs = ["abc", "bce", "cae"]` can be arranged as:
abc
bce
cae
You want to delete the columns that are not sorted lexicographically. In the above example (0-indexed), columns 0 (`''a''`, `''b''`, `''c''`) and 2 (`''c''`, `''e''`, `''e''`) are sorted while column 1 (`''b''`, `''c''`, `''a''`) is not, so you would delete column 1.

Return the number of columns that you will delete.


Example 1:
Input: strs = ["cba","daf","ghi"]
Output: 1
Explanation: The grid looks as follows:
  cba
  daf
  ghi
Columns 0 and 2 are sorted, but column 1 is not, so you only need to delete 1 column.


Example 2:
Input: strs = ["a","b"]
Output: 0
Explanation: The grid looks as follows:
  a
  b
Column 0 is the only column and is sorted, so you will not delete any columns.


Example 3:
Input: strs = ["zyx","wvu","tsr"]
Output: 3
Explanation: The grid looks as follows:
  zyx
  wvu
  tsr
All 3 columns are not sorted, so you will delete all 3.


Constraints:
`n == strs.length`
`1 <= n <= 100`
`1 <= strs[i].length <= 1000`
`strs[i]` consists of lowercase English letters.', false, 'Easy', '/articles/delete-columns-to-make-sorted', 70.9, 
   2.1, 'https://leetcode.com/problems/delete-columns-to-make-sorted', 289, 51.9, 73.3, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   221, 1828, 11, true, '[]'::jsonb, true),
  (945, 'Minimum Increment to Make Array Unique', 'Given an array of integers A, a move consists of choosing any `A[i]`, and incrementing it by `1`.

Return the least number of moves to make every value in `A` unique.


Example 1:
Input: [1,2,2]
Output: 1
Explanation:  After 1 move, the array could be [1, 2, 3].


Example 2:
Input: [3,2,1,2,1,7]
Output: 6
Explanation:  After 6 moves, the array could be [3, 4, 1, 2, 5, 7].

It can be shown with 5 or less moves that it is impossible for the array to have all unique values.

Note:
`0 <= A.length <= 40000`
`0 <= A[i] < 40000`', false, 'Medium', '/articles/minimum-increment-to-make-array-unique', 46.9, 
   40.9, 'https://leetcode.com/problems/minimum-increment-to-make-array-unique', 262, 35.1, 74.9, '["Twitter,Uber,eBay"]'::jsonb, '["Array"]'::jsonb, 
   622, 28, 96, false, '[]'::jsonb, true),
  (946, 'Validate Stack Sequences', 'Given two sequences `pushed` and `popped` with distinct values, return `true` if and only if this could have been the result of a sequence of push and pop operations on an initially empty stack.


Example 1:
Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
Output: true
Explanation: We might do the following sequence:
push(1), push(2), push(3), push(4), pop() -> 4,
push(5), pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1

Example 2:
Input: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
Output: false
Explanation: 1 cannot be popped before 2.


Constraints:
`0 <= pushed.length == popped.length <= 1000`
`0 <= pushed[i], popped[i] < 1000`
`pushed` is a permutation of `popped`.

`pushed` and `popped` have distinct values.', false, 'Medium', '/articles/validate-stack-sequences', 64.4, 
   24.5, 'https://leetcode.com/problems/validate-stack-sequences', 669, 100.6, 156.1, '["Google,Facebook"]'::jsonb, '["Stack"]'::jsonb, 
   1654, 34, 98, true, '[]'::jsonb, true),
  (947, 'Most Stones Removed with Same Row or Column', 'On a 2D plane, we place `n` stones at some integer coordinate points. Each coordinate point may have at most one stone.

A stone can be removed if it shares either the same row or the same column as another stone that has not been removed.

Given an array `stones` of length `n` where `stones[i] = [xi, yi]` represents the location of the `ith` stone, return the largest possible number of stones that can be removed.


Example 1:
Input: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
Output: 5
Explanation: One way to remove 5 stones is as follows:
1. Remove stone [2,2] because it shares the same row as [2,1].

2. Remove stone [2,1] because it shares the same column as [0,1].

3. Remove stone [1,2] because it shares the same row as [1,0].

4. Remove stone [1,0] because it shares the same column as [0,0].

5. Remove stone [0,1] because it shares the same row as [0,0].

Stone [0,0] cannot be removed since it does not share a row/column with another stone still on the plane.


Example 2:
Input: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
Output: 3
Explanation: One way to make 3 moves is as follows:
1. Remove stone [2,2] because it shares the same row as [2,0].

2. Remove stone [2,0] because it shares the same column as [0,0].

3. Remove stone [0,2] because it shares the same row as [0,0].

Stones [0,0] and [1,1] cannot be removed since they do not share a row/column with another stone still on the plane.


Example 3:
Input: stones = [[0,0]]
Output: 0
Explanation: [0,0] is the only stone on the plane, so you cannot remove it.


Constraints:
`1 <= stones.length <= 1000`
`0 <= xi, yi <= 104`
No two stones are at the same coordinate point.', false, 'Medium', '/articles/most-stones-removed-with-same-row-or-column', 55.5, 
   26.2, 'https://leetcode.com/problems/most-stones-removed-with-same-row-or-column', 325, 68.4, 123.1, '["Google"]'::jsonb, '["Depth-first Search,Union Find"]'::jsonb, 
   1411, 457, 76, true, '[]'::jsonb, true),
  (948, 'Bag of Tokens', 'You have an initial power of `P`, an initial score of `0`, and a bag of `tokens` where `tokens[i]` is the value of the `ith` token (0-indexed).

Your goal is to maximize your total score by potentially playing each token in one of two ways:
If your current power is at least `tokens[i]`, you may play the `ith` token face up, losing `tokens[i]` power and gaining `1` score.

If your current score is at least `1`, you may play the `ith` token face down, gaining `tokens[i]` power and losing `1` score.

Each token may be played at most once and in any order. You do not have to play all the tokens.

Return the largest possible score you can achieve after playing any number of tokens.


Example 1:
Input: tokens = [100], P = 50
Output: 0
Explanation: Playing the only token in the bag is impossible because you either have too little power or too little score.


Example 2:
Input: tokens = [100,200], P = 150
Output: 1
Explanation: Play the 0th token (100) face up, your power becomes 50 and score becomes 1.

There is no need to play the 1st token since you cannot play it face up to add to your score.


Example 3:
Input: tokens = [100,200,300,400], P = 200
Output: 2
Explanation: Play the tokens in this order to get a score of 2:
1. Play the 0th token (100) face up, your power becomes 100 and score becomes 1.

2. Play the 3rd token (400) face down, your power becomes 500 and score becomes 0.

3. Play the 1st token (200) face up, your power becomes 300 and score becomes 1.

4. Play the 2nd token (300) face up, your power becomes 0 and score becomes 2.


Constraints:
`0 <= tokens.length <= 1000`
`0 <= tokens[i], P < 104`', false, 'Medium', '/articles/bag-of-tokens', 46.1, 
   10.4, 'https://leetcode.com/problems/bag-of-tokens', 330, 32.8, 71.1, '["Google"]'::jsonb, '["Two Pointers,Greedy,Sort"]'::jsonb, 
   482, 261, 65, true, '[]'::jsonb, true),
  (949, 'Largest Time for Given Digits', 'Given an array `arr` of 4 digits, find the latest 24-hour time that can be made using each digit exactly once.

24-hour times are formatted as `"HH:MM"`, where `HH` is between `00` and `23`, and `MM` is between `00` and `59`. The earliest 24-hour time is `00:00`, and the latest is `23:59`.

Return the latest 24-hour time in `"HH:MM"` format.  If no valid time can be made, return an empty string.


Example 1:
Input: A = [1,2,3,4]
Output: "23:41"
Explanation: The valid 24-hour times are "12:34", "12:43", "13:24", "13:42", "14:23", "14:32", "21:34", "21:43", "23:14", and "23:41". Of these times, "23:41" is the latest.


Example 2:
Input: A = [5,5,5,5]
Output: ""
Explanation: There are no valid 24-hour times as "55:55" is not valid.


Example 3:
Input: A = [0,0,0,0]
Output: "00:00"

Example 4:
Input: A = [0,0,1,0]
Output: "10:00"

Constraints:
`arr.length == 4`
`0 <= arr[i] <= 9`', false, 'Medium', '/articles/largest-time-for-given-digits', 36.2, 
   7.9, 'https://leetcode.com/problems/largest-time-for-given-digits', 512, 60.9, 168.3, '["Google,Microsoft"]'::jsonb, '["Math"]'::jsonb, 
   441, 820, 35, true, '[]'::jsonb, true),
  (950, 'Reveal Cards In Increasing Order', 'In a deck of cards, every card has a unique integer.  You can order the deck in any order you want.

Initially, all the cards start face down (unrevealed) in one deck.

Now, you do the following steps repeatedly, until all cards are revealed:
Take the top card of the deck, reveal it, and take it out of the deck.

If there are still cards in the deck, put the next top card of the deck at the bottom of the deck.

If there are still unrevealed cards, go back to step 1.  Otherwise, stop.

Return an ordering of the deck that would reveal the cards in increasing order.

The first entry in the answer is considered to be the top of the deck.


Example 1:
Input: [17,13,11,2,3,5,7]
Output: [2,13,3,11,5,17,7]
Explanation: 
We get the deck in the order [17,13,11,2,3,5,7] (this order doesn''t matter), and reorder it.

After reordering, the deck starts as [2,13,3,11,5,17,7], where 2 is the top of the deck.

We reveal 2, and move 13 to the bottom.  The deck is now [3,11,5,17,7,13].

We reveal 3, and move 11 to the bottom.  The deck is now [5,17,7,13,11].

We reveal 5, and move 17 to the bottom.  The deck is now [7,13,11,17].

We reveal 7, and move 13 to the bottom.  The deck is now [11,17,13].

We reveal 11, and move 17 to the bottom.  The deck is now [13,17].

We reveal 13, and move 17 to the bottom.  The deck is now [17].

We reveal 17.

Since all the cards revealed are in increasing order, the answer is correct.

Note:
`1 <= A.length <= 1000`
`1 <= A[i] <= 10^6`
`A[i] != A[j]` for all `i != j`', false, 'Medium', '/articles/reveal-cards-in-increasing-order', 75.5, 
   29.9, 'https://leetcode.com/problems/reveal-cards-in-increasing-order', 411, 44.7, 59.2, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   1217, 202, 86, true, '[]'::jsonb, true),
  (951, 'Flip Equivalent Binary Trees', 'For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.

A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.

Given the roots of two binary trees `root1` and `root2`, return `true` if the two trees are flip equivelent or `false` otherwise.


Example 1:
Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
Output: true
Explanation: We flipped at nodes with values 1, 3, and 5.


Example 2:
Input: root1 = [], root2 = []
Output: true

Example 3:
Input: root1 = [], root2 = [1]
Output: false

Example 4:
Input: root1 = [0,null,1], root2 = []
Output: false

Example 5:
Input: root1 = [0,null,1], root2 = [0,1]
Output: true

Constraints:
The number of nodes in each tree is in the range `[0, 100]`.

Each tree will have unique node values in the range `[0, 99]`.', false, 'Medium', '/articles/flip-equivalent-binary-trees', 65.7, 
   20.6, 'https://leetcode.com/problems/flip-equivalent-binary-trees', 583, 71.9, 109.4, '["Google,Microsoft"]'::jsonb, '["Tree"]'::jsonb, 
   978, 50, 95, true, '[]'::jsonb, true),
  (952, 'Largest Component Size by Common Factor', 'Given a non-empty array of unique positive integers `A`, consider the following graph:
There are `A.length` nodes, labelled `A[0]` to `A[A.length - 1];`
There is an edge between `A[i]` and `A[j]` if and only if `A[i]` and `A[j]` share a common factor greater than 1.

Return the size of the largest connected component in the graph.


Example 1:
Input: [4,6,15,35]
Output: 4

Example 2:
Input: [20,50,9,63]
Output: 2

Example 3:
Input: [2,3,6,7,4,12,21,39]
Output: 8
Note:
`1 <= A.length <= 20000`
`1 <= A[i] <= 100000`', false, 'Hard', '/articles/largest-component-size-by-common-factor', 36.4, 
   2.2, 'https://leetcode.com/problems/largest-component-size-by-common-factor', 145, 26.1, 71.8, '["Google"]'::jsonb, '["Math,Union Find"]'::jsonb, 
   564, 67, 89, true, '[]'::jsonb, true),
  (953, 'Verifying an Alien Dictionary', 'In an alien language, surprisingly they also use english lowercase letters, but possibly in a different `order`. The `order` of the alphabet is some permutation of lowercase letters.

Given a sequence of `words` written in the alien language, and the `order` of the alphabet, return `true` if and only if the given `words` are sorted lexicographicaly in this alien language.


Example 1:
Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true
Explanation: As ''h'' comes before ''l'' in this language, then the sequence is sorted.


Example 2:
Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
Output: false
Explanation: As ''d'' comes after ''l'' in this language, then words[0] > words[1], hence the sequence is unsorted.


Example 3:
Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false
Explanation: The first three characters "app" match, and the second string is shorter (in size.) According to lexicographical rules "apple" > "app", because ''l'' > ''∅'', where ''∅'' is defined as the blank character which is less than any other character (More info).


Constraints:
`1 <= words.length <= 100`
`1 <= words[i].length <= 20`
`order.length == 26`
All characters in `words[i]` and `order` are English lowercase letters.', false, 'Easy', '/articles/verifying-an-alien-dictionary', 51.8, 
   91.7, 'https://leetcode.com/problems/verifying-an-alien-dictionary', 999, 208, 401.8, '["Facebook,Walmart Labs,Amazon"]'::jsonb, '["Hash Table"]'::jsonb, 
   1504, 633, 70, true, '[]'::jsonb, true),
  (954, 'Array of Doubled Pairs', 'Given an array of integers `arr` of even length, return `true` if and only if it is possible to reorder it such that `arr[2 * i + 1] = 2 * arr[2 * i]` for every `0 <= i < len(arr) / 2`.


Example 1:
Input: arr = [3,1,3,6]
Output: false

Example 2:
Input: arr = [2,1,2,6]
Output: false

Example 3:
Input: arr = [4,-2,2,-4]
Output: true
Explanation: We can take two groups, [-2,-4] and [2,4] to form [-2,-4,2,4] or [2,4,-2,-4].


Example 4:
Input: arr = [1,2,4,16,8,4]
Output: false

Constraints:
`0 <= arr.length <= 3 * 104`
`arr.length` is even.

`-105 <= arr[i] <= 105`', false, 'Medium', '/articles/array-of-doubled-pairs', 35.1, 
   0, 'https://leetcode.com/problems/array-of-doubled-pairs', 193, 24, 68.3, '["Google"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   406, 62, 87, true, '[]'::jsonb, true),
  (955, 'Delete Columns to Make Sorted II', 'You are given an array of `n` strings `strs`, all of the same length.

We may choose any deletion indices, and we delete all the characters in those indices for each string.

For example, if we have `strs = ["abcdef","uvwxyz"]` and deletion indices `{0, 2, 3}`, then the final array after deletions is `["bef", "vyz"]`.

Suppose we chose a set of deletion indices `answer` such that after deletions, the final array has its elements in lexicographic order (i.e., `strs[0] <= strs[1] <= strs[2] <= ... <= strs[n - 1]`). Return the minimum possible value of `answer.length`.


Example 1:
Input: strs = ["ca","bb","ac"]
Output: 1
Explanation: 
After deleting the first column, strs = ["a", "b", "c"].

Now strs is in lexicographic order (ie. strs[0] <= strs[1] <= strs[2]).

We require at least 1 deletion since initially strs was not in lexicographic order, so the answer is 1.


Example 2:
Input: strs = ["xc","yb","za"]
Output: 0
Explanation: 
strs is already in lexicographic order, so we do not need to delete anything.

Note that the rows of strs are not necessarily in lexicographic order:
i.e., it is NOT necessarily true that (strs[0][0] <= strs[0][1] <= ...)

Example 3:
Input: strs = ["zyx","wvu","tsr"]
Output: 3
Explanation: We have to delete every column.


Constraints:
`n == strs.length`
`1 <= n <= 100`
`1 <= strs[i].length <= 100`
`strs[i]` consists of lowercase English letters.', false, 'Medium', '/articles/delete-columns-to-make-sorted-ii', 33.9, 
   0, 'https://leetcode.com/problems/delete-columns-to-make-sorted-ii', 94, 12.4, 36.6, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   331, 53, 86, true, '[]'::jsonb, true),
  (956, 'Tallest Billboard', 'You are installing a billboard and want it to have the largest height. The billboard will have two steel supports, one on each side. Each steel support must be an equal height.

You are given a collection of `rods` that can be welded together. For example, if you have rods of lengths `1`, `2`, and `3`, you can weld them together to make a support of length `6`.

Return the largest possible height of your billboard installation. If you cannot support the billboard, return `0`.


Example 1:
Input: rods = [1,2,3,6]
Output: 6
Explanation: We have two disjoint subsets {1,2,3} and {6}, which have the same sum = 6.


Example 2:
Input: rods = [1,2,3,4,5,6]
Output: 10
Explanation: We have two disjoint subsets {2,3,5} and {4,6}, which have the same sum = 10.


Example 3:
Input: rods = [1,2]
Output: 0
Explanation: The billboard cannot be supported, so we return 0.


Constraints:
`1 <= rods.length <= 20`
`1 <= rods[i] <= 1000`
`sum(rods[i]) <= 5000`', false, 'Hard', '/articles/tallest-billboard', 39.9, 
   23.5, 'https://leetcode.com/problems/tallest-billboard', 63, 9.7, 24.4, '[]'::jsonb, '[]'::jsonb, 
   441, 18, 96, false, '[]'::jsonb, true),
  (957, 'Prison Cells After N Days', 'There are `8` prison cells in a row and each cell is either occupied or vacant.

Each day, whether the cell is occupied or vacant changes according to the following rules:
If a cell has two adjacent neighbors that are both occupied or both vacant, then the cell becomes occupied.

Otherwise, it becomes vacant.

Note that because the prison is a row, the first and the last cells in the row can''t have two adjacent neighbors.

You are given an integer array `cells` where `cells[i] == 1` if the `ith` cell is occupied and `cells[i] == 0` if the `ith` cell is vacant, and you are given an integer `n`.

Return the state of the prison after `n` days (i.e., `n` such changes described above).


Example 1:
Input: cells = [0,1,0,1,1,0,0,1], n = 7
Output: [0,0,1,1,0,0,0,0]
Explanation: The following table summarizes the state of the prison on each day:
Day 0: [0, 1, 0, 1, 1, 0, 0, 1]
Day 1: [0, 1, 1, 0, 0, 0, 0, 0]
Day 2: [0, 0, 0, 0, 1, 1, 1, 0]
Day 3: [0, 1, 1, 0, 0, 1, 0, 0]
Day 4: [0, 0, 0, 0, 0, 1, 0, 0]
Day 5: [0, 1, 1, 1, 0, 1, 0, 0]
Day 6: [0, 0, 1, 0, 1, 1, 0, 0]
Day 7: [0, 0, 1, 1, 0, 0, 0, 0]

Example 2:
Input: cells = [1,0,0,1,0,0,1,0], n = 1000000000
Output: [0,0,1,1,1,1,1,0]

Constraints:
`cells.length == 8`
`cells[i]` is either `0` or `1`.

`1 <= n <= 109`', false, 'Medium', '/articles/prison-cells-after-n-days', 40.1, 
   41.3, 'https://leetcode.com/problems/prison-cells-after-n-days', 628, 119.5, 298, '["Amazon"]'::jsonb, '["Hash Table"]'::jsonb, 
   971, 1270, 43, true, '[]'::jsonb, true),
  (958, 'Check Completeness of a Binary Tree', 'Given the `root` of a binary tree, determine if it is a complete binary tree.

In a complete binary tree, every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between `1` and `2h` nodes inclusive at the last level `h`.


Example 1:
Input: root = [1,2,3,4,5,6]
Output: true
Explanation: Every level before the last is full (ie. levels with node-values {1} and {2, 3}), and all nodes in the last level ({4, 5, 6}) are as far left as possible.


Example 2:
Input: root = [1,2,3,4,5,null,7]
Output: false
Explanation: The node with value 7 isn''t as far left as possible.


Constraints:
The number of nodes in the tree is in the range `[1, 100]`.

`1 <= Node.val <= 1000`', false, 'Medium', '/articles/check-completeness-of-a-binary-tree', 52.5, 
   27.6, 'https://leetcode.com/problems/check-completeness-of-a-binary-tree', 539, 77.8, 148.2, '["Facebook"]'::jsonb, '["Tree"]'::jsonb, 
   1200, 15, 99, true, '[]'::jsonb, true),
  (959, 'Regions Cut By Slashes', 'In a N x N `grid` composed of 1 x 1 squares, each 1 x 1 square consists of a `/`, `\\`, or blank space.  These characters divide the square into contiguous regions.

(Note that backslash characters are escaped, so a `\\` is represented as `"\\\\"`.)
Return the number of regions.


Example 1:
Input:
[
  " /",
  "/ "
]
Output: 2
Explanation: The 2x2 grid is as follows:

Example 2:
Input:
[
  " /",
  "  "
]
Output: 1
Explanation: The 2x2 grid is as follows:

Example 3:
Input:
[
  "\\\\/",
  "/\\\\"
]
Output: 4
Explanation: (Recall that because \\ characters are escaped, "\\\\/" refers to \\/, and "/\\\\" refers to /\\.)
The 2x2 grid is as follows:

Example 4:
Input:
[
  "/\\\\",
  "\\\\/"
]
Output: 5
Explanation: (Recall that because \\ characters are escaped, "/\\\\" refers to /\\, and "\\\\/" refers to \\/.)
The 2x2 grid is as follows:

Example 5:
Input:
[
  "//",
  "/ "
]
Output: 3
Explanation: The 2x2 grid is as follows:
Note:
`1 <= grid.length == grid[0].length <= 30`
`grid[i][j]` is either `''/''`, `''\\''`, or `'' ''`.', false, 'Medium', '/articles/regions-cut-by-slashes', 67.4, 
   19.6, 'https://leetcode.com/problems/regions-cut-by-slashes', 215, 26.2, 38.9, '["Uber"]'::jsonb, '["Depth-first Search,Union Find,Graph"]'::jsonb, 
   1245, 238, 84, false, '[]'::jsonb, true),
  (960, 'Delete Columns to Make Sorted III', 'You are given an array of `n` strings `strs`, all of the same length.

We may choose any deletion indices, and we delete all the characters in those indices for each string.

For example, if we have `strs = ["abcdef","uvwxyz"]` and deletion indices `{0, 2, 3}`, then the final array after deletions is `["bef", "vyz"]`.

Suppose we chose a set of deletion indices `answer` such that after deletions, the final array has every string (row) in lexicographic order. (i.e., `(strs[0][0] <= strs[0][1] <= ... <= strs[0][strs[0].length - 1])`, and `(strs[1][0] <= strs[1][1] <= ... <= strs[1][strs[1].length - 1])`, and so on). Return the minimum possible value of `answer.length`.


Example 1:
Input: strs = ["babca","bbazb"]
Output: 3
Explanation: After deleting columns 0, 1, and 4, the final array is strs = ["bc", "az"].

Both these rows are individually in lexicographic order (ie. strs[0][0] <= strs[0][1] and strs[1][0] <= strs[1][1]).

Note that strs[0] > strs[1] - the array strs is not necessarily in lexicographic order.


Example 2:
Input: strs = ["edcba"]
Output: 4
Explanation: If we delete less than 4 columns, the only row will not be lexicographically sorted.


Example 3:
Input: strs = ["ghi","def","abc"]
Output: 0
Explanation: All rows are already lexicographically sorted.


Constraints:
`n == strs.length`
`1 <= n <= 100`
`1 <= strs[i].length <= 100`
`strs[i]` consists of lowercase English letters.', false, 'Hard', '/articles/delete-columns-to-make-sorted-iii', 55.1, 
   7, 'https://leetcode.com/problems/delete-columns-to-make-sorted-iii', 62, 8.1, 14.8, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   301, 9, 97, true, '[]'::jsonb, true),
  (961, 'N-Repeated Element in Size 2N Array', 'In a array `A` of size `2N`, there are `N+1` unique elements, and exactly one of these elements is repeated `N` times.

Return the element repeated `N` times.


Example 1:
Input: [1,2,3,3]
Output: 3

Example 2:
Input: [2,1,2,5,3,2]
Output: 2

Example 3:
Input: [5,1,5,2,5,3,5,4]
Output: 5
Note:
`4 <= A.length <= 10000`
`0 <= A[i] < 10000`
`A.length` is even', false, 'Easy', '/articles/n-repeated-element-in-size-2n-array', 74.6, 
   3.1, 'https://leetcode.com/problems/n-repeated-element-in-size-2n-array', 886, 143.7, 192.6, '["Apple,Akamai"]'::jsonb, '["Hash Table"]'::jsonb, 
   622, 262, 70, true, '[]'::jsonb, true),
  (962, 'Maximum Width Ramp', 'Given an array `A` of integers, a ramp is a tuple `(i, j)` for which `i < j` and `A[i] <= A[j]`.  The width of such a ramp is `j - i`.

Find the maximum width of a ramp in `A`.  If one doesn''t exist, return 0.


Example 1:
Input: [6,0,8,2,1,5]
Output: 4
Explanation: 
The maximum width ramp is achieved at (i, j) = (1, 5): A[1] = 0 and A[5] = 5.


Example 2:
Input: [9,8,1,0,1,9,4,0,4,1]
Output: 7
Explanation: 
The maximum width ramp is achieved at (i, j) = (2, 9): A[2] = 1 and A[9] = 1.

Note:
`2 <= A.length <= 50000`
`0 <= A[i] <= 50000`', false, 'Medium', '/articles/maximum-width-ramp', 46.6, 
   2, 'https://leetcode.com/problems/maximum-width-ramp', 160, 24.9, 53.4, '["Facebook"]'::jsonb, '["Array"]'::jsonb, 
   746, 20, 97, true, '[]'::jsonb, true),
  (963, 'Minimum Area Rectangle II', 'Given a set of points in the xy-plane, determine the minimum area of any rectangle formed from these points, with sides not necessarily parallel to the x and y axes.

If there isn''t any rectangle, return 0.


Example 1:
Input: [[1,2],[2,1],[1,0],[0,1]]
Output: 2.00000
Explanation: The minimum area rectangle occurs at [1,2],[2,1],[1,0],[0,1], with an area of 2.


Example 2:
Input: [[0,1],[2,1],[1,1],[1,0],[2,0]]
Output: 1.00000
Explanation: The minimum area rectangle occurs at [1,0],[1,1],[2,1],[2,0], with an area of 1.


Example 3:
Input: [[0,3],[1,2],[3,1],[1,3],[2,1]]
Output: 0
Explanation: There is no possible rectangle to form from these points.


Example 4:
Input: [[3,1],[1,1],[0,1],[2,1],[3,3],[3,2],[0,2],[2,3]]
Output: 2.00000
Explanation: The minimum area rectangle occurs at [2,1],[2,3],[3,3],[3,1], with an area of 2.

Note:
`1 <= points.length <= 50`
`0 <= points[i][0] <= 40000`
`0 <= points[i][1] <= 40000`
All points are distinct.

Answers within `10^-5` of the actual value will be accepted as correct.', false, 'Medium', '/articles/minimum-area-rectangle-ii', 52.1, 
   15.5, 'https://leetcode.com/problems/minimum-area-rectangle-ii', 87, 16, 30.7, '["Google"]'::jsonb, '["Math,Geometry"]'::jsonb, 
   203, 308, 40, true, '[]'::jsonb, true),
  (964, 'Least Operators to Express Number', 'Given a single positive integer `x`, we will write an expression of the form `x (op1) x (op2) x (op3) x ...` where each operator `op1`, `op2`, etc. is either addition, subtraction, multiplication, or division (`+`, `-`, `*`, or `/)`. For example, with `x = 3`, we might write `3 * 3 / 3 + 3 - 3` which is a value of 3.

When writing such an expression, we adhere to the following conventions:
The division operator (`/`) returns rational numbers.

There are no parentheses placed anywhere.

We use the usual order of operations: multiplication and division happen before addition and subtraction.

It is not allowed to use the unary negation operator (`-`). For example, "`x - x`" is a valid expression as it only uses subtraction, but "`-x + x`" is not because it uses negation.

We would like to write an expression with the least number of operators such that the expression equals the given `target`. Return the least number of operators used.


Example 1:
Input: x = 3, target = 19
Output: 5
Explanation: 3 * 3 + 3 * 3 + 3 / 3.

The expression contains 5 operations.


Example 2:
Input: x = 5, target = 501
Output: 8
Explanation: 5 * 5 * 5 * 5 - 5 * 5 * 5 + 5 / 5.

The expression contains 8 operations.


Example 3:
Input: x = 100, target = 100000000
Output: 3
Explanation: 100 * 100 * 100 * 100.

The expression contains 3 operations.


Constraints:
`2 <= x <= 100`
`1 <= target <= 2 * 108`', false, 'Hard', '/articles/least-operators-to-express-number', 45.2, 
   11.4, 'https://leetcode.com/problems/least-operators-to-express-number', 42, 6.3, 13.9, '["Snapchat"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   207, 54, 79, false, '[]'::jsonb, true),
  (965, 'Univalued Binary Tree', 'A binary tree is univalued if every node in the tree has the same value.

Return `true` if and only if the given tree is univalued.


Example 1:
Input: [1,1,1,1,1,null,1]
Output: true

Example 2:
Input: [2,2,2,5,2]
Output: false
Note:
The number of nodes in the given tree will be in the range `[1, 100]`.

Each node''s value will be an integer in the range `[0, 99]`.', false, 'Easy', '/articles/univalued-binary-tree', 67.9, 
   6.2, 'https://leetcode.com/problems/univalued-binary-tree', 999, 117.3, 172.6, '["Box"]'::jsonb, '["Tree"]'::jsonb, 
   794, 47, 94, false, '[]'::jsonb, true),
  (966, 'Vowel Spellchecker', 'Given a `wordlist`, we want to implement a spellchecker that converts a query word into a correct word.

For a given `query` word, the spell checker handles two categories of spelling mistakes:
Capitalization: If the query matches a word in the wordlist (case-insensitive), then the query word is returned with the same case as the case in the wordlist.

	

Example: `wordlist = ["yellow"]`, `query = "YellOw"`: `correct = "yellow"`

Example: `wordlist = ["Yellow"]`, `query = "yellow"`: `correct = "Yellow"`

Example: `wordlist = ["yellow"]`, `query = "yellow"`: `correct = "yellow"`
Vowel Errors: If after replacing the vowels `(''a'', ''e'', ''i'', ''o'', ''u'')` of the query word with any vowel individually, it matches a word in the wordlist (case-insensitive), then the query word is returned with the same case as the match in the wordlist.

	

Example: `wordlist = ["YellOw"]`, `query = "yollow"`: `correct = "YellOw"`

Example: `wordlist = ["YellOw"]`, `query = "yeellow"`: `correct = ""` (no match)

Example: `wordlist = ["YellOw"]`, `query = "yllw"`: `correct = ""` (no match)
In addition, the spell checker operates under the following precedence rules:
When the query exactly matches a word in the wordlist (case-sensitive), you should return the same word back.

When the query matches a word up to capitlization, you should return the first such match in the wordlist.

When the query matches a word up to vowel errors, you should return the first such match in the wordlist.

If the query has no matches in the wordlist, you should return the empty string.

Given some `queries`, return a list of words `answer`, where `answer[i]` is the correct word for `query = queries[i]`.


Example 1:
Input: wordlist = ["KiTe","kite","hare","Hare"], queries = ["kite","Kite","KiTe","Hare","HARE","Hear","hear","keti","keet","keto"]
Output: ["kite","KiTe","KiTe","Hare","hare","","","KiTe","","KiTe"]

Example 2:
Input: wordlist = ["yellow"], queries = ["YellOw"]
Output: ["yellow"]

Constraints:
`1 <= wordlist.length, queries.length <= 5000`
`1 <= wordlist[i].length, queries[i].length <= 7`
`wordlist[i]` and `queries[i]` consist only of only English letters.', false, 'Medium', '/articles/vowel-spellchecker', 51.9, 
   0.5, 'https://leetcode.com/problems/vowel-spellchecker', 182, 30.8, 59.4, '["Facebook,Amazon,Google,Thumbtack"]'::jsonb, '["Hash Table,String"]'::jsonb, 
   294, 631, 32, true, '[]'::jsonb, true),
  (967, 'Numbers With Same Consecutive Differences', 'Return all non-negative integers of length `n` such that the absolute difference between every two consecutive digits is `k`.

Note that every number in the answer must not have leading zeros. For example, `01` has one leading zero and is invalid.

You may return the answer in any order.


Example 1:
Input: n = 3, k = 7
Output: [181,292,707,818,929]
Explanation: Note that 070 is not a valid number, because it has leading zeroes.


Example 2:
Input: n = 2, k = 1
Output: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]

Example 3:
Input: n = 2, k = 0
Output: [11,22,33,44,55,66,77,88,99]

Example 4:
Input: n = 2, k = 2
Output: [13,20,24,31,35,42,46,53,57,64,68,75,79,86,97]

Constraints:
`2 <= n <= 9`
`0 <= k <= 9`', false, 'Medium', '/articles/numbers-with-same-consecutive-differences', 45.1, 
   0, 'https://leetcode.com/problems/numbers-with-same-consecutive-differences', 434, 42.5, 94.2, '["Flipkart"]'::jsonb, '["Backtracking,Depth-first Search,Breadth-first Search,Recursion"]'::jsonb, 
   635, 121, 84, false, '[]'::jsonb, true),
  (968, 'Binary Tree Cameras', 'Given a binary tree, we install cameras on the nodes of the tree. 
Each camera at a node can monitor its parent, itself, and its immediate children.

Calculate the minimum number of cameras needed to monitor all nodes of the tree.


Example 1:
Input: [0,0,null,0,0]
Output: 1
Explanation: One camera is enough to monitor all nodes if placed as shown.


Example 2:
Input: [0,0,null,0,null,0,null,null,0]
Output: 2
Explanation: At least two cameras are needed to monitor all nodes of the tree. The above image shows one of the valid configurations of camera placement.

Note:
The number of nodes in the given tree will be in the range `[1, 1000]`.

Every node has value 0.', false, 'Hard', '/articles/binary-tree-cameras', 38.9, 
   30.8, 'https://leetcode.com/problems/binary-tree-cameras', 219, 31.2, 80.1, '["Google,Microsoft,Bloomberg,Flipkart"]'::jsonb, '["Dynamic Programming,Tree,Depth-first Search"]'::jsonb, 
   1244, 19, 98, true, '[]'::jsonb, true),
  (969, 'Pancake Sorting', 'Given an array of integers `arr`, sort the array by performing a series of pancake flips.

In one pancake flip we do the following steps:
Choose an integer `k` where `1 <= k <= arr.length`.

Reverse the sub-array `arr[0...k-1]` (0-indexed).

For example, if `arr = [3,2,1,4]` and we performed a pancake flip choosing `k = 3`, we reverse the sub-array `[3,2,1]`, so `arr = [1,2,3,4]` after the pancake flip at `k = 3`.

Return an array of the `k`-values corresponding to a sequence of pancake flips that sort `arr`. Any valid answer that sorts the array within `10 * arr.length` flips will be judged as correct.


Example 1:
Input: arr = [3,2,4,1]
Output: [4,2,4,3]
Explanation: 
We perform 4 pancake flips, with k values 4, 2, 4, and 3.

Starting state: arr = [3, 2, 4, 1]
After 1st flip (k = 4): arr = [1, 4, 2, 3]
After 2nd flip (k = 2): arr = [4, 1, 2, 3]
After 3rd flip (k = 4): arr = [3, 2, 1, 4]
After 4th flip (k = 3): arr = [1, 2, 3, 4], which is sorted.


Example 2:
Input: arr = [1,2,3]
Output: []
Explanation: The input is already sorted, so there is no need to flip anything.

Note that other answers, such as [3, 3], would also be accepted.


Constraints:
`1 <= arr.length <= 100`
`1 <= arr[i] <= arr.length`
All integers in `arr` are unique (i.e. `arr` is a permutation of the integers from `1` to `arr.length`).', false, 'Medium', '/articles/pancake-sorting', 68.8, 
   30.3, 'https://leetcode.com/problems/pancake-sorting', 522, 58.2, 84.6, '["Apple"]'::jsonb, '["Array,Sort"]'::jsonb, 
   747, 972, 43, true, '[]'::jsonb, true),
  (970, 'Powerful Integers', 'Given three integers `x`, `y`, and `bound`, return a list of all the powerful integers that have a value less than or equal to `bound`.

An integer is powerful if it can be represented as `xi + yj` for some integers `i >= 0` and `j >= 0`.

You may return the answer in any order. In your answer, each value should occur at most once.


Example 1:
Input: x = 2, y = 3, bound = 10
Output: [2,3,4,5,7,9,10]
Explanation:
2 = 20 + 30
3 = 21 + 30
4 = 20 + 31
5 = 21 + 31
7 = 22 + 31
9 = 23 + 30
10 = 20 + 32

Example 2:
Input: x = 3, y = 5, bound = 15
Output: [2,4,6,8,10,14]

Constraints:
`1 <= x, y <= 100`
`0 <= bound <= 106`', false, 'Medium', '/articles/powerful-integers', 40.1, 
   5.8, 'https://leetcode.com/problems/powerful-integers', 267, 27.4, 68.4, '[]'::jsonb, '[]'::jsonb, 
   16, 12, 57, false, '[]'::jsonb, true),
  (971, 'Flip Binary Tree To Match Preorder Traversal', 'You are given the `root` of a binary tree with `n` nodes, where each node is uniquely assigned a value from `1` to `n`. You are also given a sequence of `n` values `voyage`, which is the desired pre-order traversal of the binary tree.

Any node in the binary tree can be flipped by swapping its left and right subtrees. For example, flipping node 1 will have the following effect:
Flip the smallest number of nodes so that the pre-order traversal of the tree matches `voyage`.

Return a list of the values of all flipped nodes. You may return the answer in any order. If it is impossible to flip the nodes in the tree to make the pre-order traversal match `voyage`, return the list `[-1]`.


Example 1:
Input: root = [1,2], voyage = [2,1]
Output: [-1]
Explanation: It is impossible to flip the nodes such that the pre-order traversal matches voyage.


Example 2:
Input: root = [1,2,3], voyage = [1,3,2]
Output: [1]
Explanation: Flipping node 1 swaps nodes 2 and 3, so the pre-order traversal matches voyage.


Example 3:
Input: root = [1,2,3], voyage = [1,2,3]
Output: []
Explanation: The tree''s pre-order traversal already matches voyage, so no nodes need to be flipped.


Constraints:
The number of nodes in the tree is `n`.

`n == voyage.length`
`1 <= n <= 100`
`1 <= Node.val, voyage[i] <= n`
All the values in the tree are unique.

All the values in `voyage` are unique.', false, 'Medium', '/articles/flip-binary-tree-to-match-preorder-traversal', 50.1, 
   0.8, 'https://leetcode.com/problems/flip-binary-tree-to-match-preorder-traversal', 211, 29.5, 58.9, '["Bloomberg"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   522, 209, 71, false, '[]'::jsonb, true),
  (972, 'Equal Rational Numbers', 'Given two strings `s` and `t`, each of which represents a non-negative rational number, return `true` if and only if they represent the same number. The strings may use parentheses to denote the repeating part of the rational number.

A rational number can be represented using up to three parts: `<IntegerPart>`, `<NonRepeatingPart>`, and a `<RepeatingPart>`. The number will be represented in one of the following three ways:
`<IntegerPart>`
	
For example, `12`, `0`, and `123`.

`<IntegerPart><.><NonRepeatingPart>`
	
For example, `0.5`, `1.`, `2.12`, and `123.0001`.

`<IntegerPart><.><NonRepeatingPart><(><RepeatingPart><)>`
	
For example, `0.1(6)`, `1.(9)`, `123.00(1212)`.

The repeating portion of a decimal expansion is conventionally denoted within a pair of round brackets. For example:
`1/6 = 0.16666666... = 0.1(6) = 0.1666(6) = 0.166(66)`.


Example 1:
Input: s = "0.(52)", t = "0.5(25)"
Output: true
Explanation: Because "0.(52)" represents 0.52525252..., and "0.5(25)" represents 0.52525252525..... , the strings represent the same number.


Example 2:
Input: s = "0.1666(6)", t = "0.166(66)"
Output: true

Example 3:
Input: s = "0.9(9)", t = "1."
Output: true
Explanation: "0.9(9)" represents 0.999999999... repeated forever, which equals 1.  [See this link for an explanation.]
"1." represents the number 1, which is formed correctly: (IntegerPart) = "1" and (NonRepeatingPart) = "".


Constraints:
Each part consists only of digits.

The `<IntegerPart>` does not have leading zeros (except for the zero itself).

`1 <= <IntegerPart>.length <= 4`
`0 <= <NonRepeatingPart>.length <= 4`
`1 <= <RepeatingPart>.length <= 4`', false, 'Hard', '/articles/equal-rational-numbers', 42.1, 
   0, 'https://leetcode.com/problems/equal-rational-numbers', 60, 4.6, 10.8, '["Microsoft"]'::jsonb, '["Math"]'::jsonb, 
   54, 160, 25, false, '[]'::jsonb, true),
  (973, 'K Closest Points to Origin', 'Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`.

The distance between two points on the X-Y plane is the Euclidean distance (i.e., `√(x1 - x2)2 + (y1 - y2)2`).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).


Example 1:
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).

The distance between (-2, 2) and the origin is sqrt(8).

Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.

We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].


Example 2:
Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.


Constraints:
`1 <= k <= points.length <= 104`
`-104 < xi, yi < 104`', false, 'Medium', '/articles/k-closest-points-to-origin', 64.6, 
   86.5, 'https://leetcode.com/problems/k-closest-points-to-origin', 999, 445.5, 689.3, '["Facebook,Amazon,DoorDash,LinkedIn,Asana,Apple,Uber,ByteDance"]'::jsonb, '["Divide and Conquer,Heap,Sort"]'::jsonb, 
   2901, 151, 95, true, '[]'::jsonb, true),
  (974, 'Subarray Sums Divisible by K', 'Given an array `A` of integers, return the number of (contiguous, non-empty) subarrays that have a sum divisible by `K`.


Example 1:
Input: A = [4,5,0,-2,-3,1], K = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by K = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
Note:
`1 <= A.length <= 30000`
`-10000 <= A[i] <= 10000`
`2 <= K <= 10000`', false, 'Medium', '/articles/subarray-sums-divisible-by-k', 51, 
   42.7, 'https://leetcode.com/problems/subarray-sums-divisible-by-k', 284, 57, 111.8, '["Twilio,Facebook,ByteDance"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   1535, 118, 93, true, '[]'::jsonb, true),
  (975, 'Odd Even Jump', 'You are given an integer array `arr`. From some starting index, you can make a series of jumps. The (1st, 3rd, 5th, ...) jumps in the series are called odd-numbered jumps, and the (2nd, 4th, 6th, ...) jumps in the series are called even-numbered jumps. Note that the jumps are numbered, not the indices.

You may jump forward from index `i` to index `j` (with `i < j`) in the following way:
During odd-numbered jumps (i.e., jumps 1, 3, 5, ...), you jump to the index `j` such that `arr[i] <= arr[j]` and `arr[j]` is the smallest possible value. If there are multiple such indices `j`, you can only jump to the smallest such index `j`.

During even-numbered jumps (i.e., jumps 2, 4, 6, ...), you jump to the index `j` such that `arr[i] >= arr[j]` and `arr[j]` is the largest possible value. If there are multiple such indices `j`, you can only jump to the smallest such index `j`.

It may be the case that for some index `i`, there are no legal jumps.

A starting index is good if, starting from that index, you can reach the end of the array (index `arr.length - 1`) by jumping some number of times (possibly 0 or more than once).

Return the number of good starting indices.


Example 1:
Input: arr = [10,13,12,14,15]
Output: 2
Explanation: 
From starting index i = 0, we can make our 1st jump to i = 2 (since arr[2] is the smallest among arr[1], arr[2], arr[3], arr[4] that is greater or equal to arr[0]), then we cannot jump any more.

From starting index i = 1 and i = 2, we can make our 1st jump to i = 3, then we cannot jump any more.

From starting index i = 3, we can make our 1st jump to i = 4, so we have reached the end.

From starting index i = 4, we have reached the end already.

In total, there are 2 different starting indices i = 3 and i = 4, where we can reach the end with some number of
jumps.


Example 2:
Input: arr = [2,3,1,1,4]
Output: 3
Explanation: 
From starting index i = 0, we make jumps to i = 1, i = 2, i = 3:
During our 1st jump (odd-numbered), we first jump to i = 1 because arr[1] is the smallest value in [arr[1], arr[2], arr[3], arr[4]] that is greater than or equal to arr[0].

During our 2nd jump (even-numbered), we jump from i = 1 to i = 2 because arr[2] is the largest value in [arr[2], arr[3], arr[4]] that is less than or equal to arr[1]. arr[3] is also the largest value, but 2 is a smaller index, so we can only jump to i = 2 and not i = 3
During our 3rd jump (odd-numbered), we jump from i = 2 to i = 3 because arr[3] is the smallest value in [arr[3], arr[4]] that is greater than or equal to arr[2].

We can''t jump from i = 3 to i = 4, so the starting index i = 0 is not good.

In a similar manner, we can deduce that:
From starting index i = 1, we jump to i = 4, so we reach the end.

From starting index i = 2, we jump to i = 3, and then we can''t jump anymore.

From starting index i = 3, we jump to i = 4, so we reach the end.

From starting index i = 4, we are already at the end.

In total, there are 3 different starting indices i = 1, i = 3, and i = 4, where we can reach the end with some
number of jumps.


Example 3:
Input: arr = [5,1,3,4,2]
Output: 3
Explanation: We can reach the end from starting indices 1, 2, and 4.


Constraints:
`1 <= arr.length <= 2 * 104`
`0 <= arr[i] < 105`', false, 'Hard', '/articles/odd-even-jump', 41.5, 
   7.1, 'https://leetcode.com/problems/odd-even-jump', 220, 40.2, 97, '["Google"]'::jsonb, '["Dynamic Programming,Stack,Ordered Map"]'::jsonb, 
   916, 283, 76, true, '[]'::jsonb, true),
  (976, 'Largest Perimeter Triangle', 'Given an integer array `nums`, return the largest perimeter of a triangle with a non-zero area, formed from three of these lengths. If it is impossible to form any triangle of a non-zero area, return `0`.


Example 1:
Input: nums = [2,1,2]
Output: 5

Example 2:
Input: nums = [1,2,1]
Output: 0

Example 3:
Input: nums = [3,2,3,4]
Output: 10

Example 4:
Input: nums = [3,6,2,3]
Output: 8

Constraints:
`3 <= nums.length <= 104`
`1 <= nums[i] <= 106`', false, 'Easy', '/articles/largest-perimeter-triangle', 59.3, 
   1.9, 'https://leetcode.com/problems/largest-perimeter-triangle', 292, 44.9, 75.6, '["C3 IoT"]'::jsonb, '["Math,Sort"]'::jsonb, 
   509, 54, 90, false, '[]'::jsonb, true),
  (977, 'Squares of a Sorted Array', 'Given an integer array `nums` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.


Example 1:
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].

After sorting, it becomes [0,1,9,16,100].


Example 2:
Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]

Constraints:
`1 <= nums.length <= 104`
`-104 <= nums[i] <= 104`
`nums` is sorted in non-decreasing order.

Follow up: Squaring each element and sorting the new array is very trivial, could you find an `O(n)` solution using a different approach?', false, 'Easy', '/articles/squares-of-a-sorted-array', 71.8, 
   43.5, 'https://leetcode.com/problems/squares-of-a-sorted-array', 999, 454.3, 632.4, '["Facebook,Uber,Google,Amazon,Apple,Bloomberg,Yandex,Microsoft,ByteDance,Flipkart,Cisco"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   2213, 114, 95, true, '[]'::jsonb, true),
  (978, 'Longest Turbulent Subarray', 'Given an integer array `arr`, return the length of a maximum size turbulent subarray of `arr`.

A subarray is turbulent if the comparison sign flips between each adjacent pair of elements in the subarray.

More formally, a subarray `[arr[i], arr[i + 1], ..., arr[j]]` of `arr` is said to be turbulent if and only if:
For `i <= k < j`:
	
`arr[k] > arr[k + 1]` when `k` is odd, and
`arr[k] < arr[k + 1]` when `k` is even.

Or, for `i <= k < j`:
	
`arr[k] > arr[k + 1]` when `k` is even, and
`arr[k] < arr[k + 1]` when `k` is odd.


Example 1:
Input: arr = [9,4,2,10,7,8,8,1,9]
Output: 5
Explanation: arr[1] > arr[2] < arr[3] > arr[4] < arr[5]

Example 2:
Input: arr = [4,8,12,16]
Output: 2

Example 3:
Input: arr = [100]
Output: 1

Constraints:
`1 <= arr.length <= 4 * 104`
`0 <= arr[i] <= 109`', false, 'Medium', '/articles/longest-turbulent-subarray', 46.7, 
   9.2, 'https://leetcode.com/problems/longest-turbulent-subarray', 426, 38.8, 83.1, '["Amazon,Bloomberg"]'::jsonb, '["Array,Dynamic Programming,Sliding Window"]'::jsonb, 
   610, 118, 84, true, '[]'::jsonb, true),
  (979, 'Distribute Coins in Binary Tree', 'You are given the `root` of a binary tree with `n` nodes where each `node` in the tree has `node.val` coins and there are `n` coins total.

In one move, we may choose two adjacent nodes and move one coin from one node to another. (A move may be from parent to child, or from child to parent.)
Return the number of moves required to make every node have exactly one coin.


Example 1:
Input: root = [3,0,0]
Output: 2
Explanation: From the root of the tree, we move one coin to its left child, and one coin to its right child.


Example 2:
Input: root = [0,3,0]
Output: 3
Explanation: From the left child of the root, we move two coins to the root [taking two moves].  Then, we move one coin from the root of the tree to the right child.


Example 3:
Input: root = [1,0,2]
Output: 2

Example 4:
Input: root = [1,0,0,null,3]
Output: 4

Constraints:
The number of nodes in the tree is `n`.

`1 <= n <= 100`
`0 <= Node.val <= n`
The sum of `Node.val` is `n`.', false, 'Medium', '/articles/distribute-coins-in-binary-tree', 69.9, 
   24.6, 'https://leetcode.com/problems/distribute-coins-in-binary-tree', 387, 57, 81.5, '["Amazon"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   2336, 80, 97, true, '[]'::jsonb, true),
  (980, 'Unique Paths III', 'On a 2-dimensional `grid`, there are 4 types of squares:
`1` represents the starting square.  There is exactly one starting square.

`2` represents the ending square.  There is exactly one ending square.

`0` represents empty squares we can walk over.

`-1` represents obstacles that we cannot walk over.

Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.


Example 1:
Input: [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
Output: 2
Explanation: We have the following two paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)

Example 2:
Input: [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
Output: 4
Explanation: We have the following four paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)

Example 3:
Input: [[0,1],[2,0]]
Output: 0
Explanation: 
There is no path that walks over every empty square exactly once.

Note that the starting and ending square can be anywhere in the grid.

Note:
`1 <= grid.length * grid[0].length <= 20`', false, 'Hard', '/articles/unique-paths-iii', 77, 
   26.6, 'https://leetcode.com/problems/unique-paths-iii', 695, 68.6, 89, '["Amazon,JPMorgan"]'::jsonb, '["Backtracking,Depth-first Search"]'::jsonb, 
   1376, 90, 94, true, '[]'::jsonb, true),
  (981, 'Time Based Key-Value Store', 'Create a timebased key-value store class `TimeMap`, that supports two operations.

1. `set(string key, string value, int timestamp)`
Stores the `key` and `value`, along with the given `timestamp`.

2. `get(string key, int timestamp)`
Returns a value such that `set(key, value, timestamp_prev)` was called previously, with `timestamp_prev <= timestamp`.

If there are multiple such values, it returns the one with the largest `timestamp_prev`.

If there are no values, it returns the empty string (`""`).


Example 1:
Input: inputs = ["TimeMap","set","get","get","set","get","get"], inputs = [[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4],["foo",5]]
Output: [null,null,"bar","bar",null,"bar2","bar2"]
Explanation:   
TimeMap kv;   
kv.set("foo", "bar", 1); // store the key "foo" and value "bar" along with timestamp = 1   
kv.get("foo", 1);  // output "bar"   
kv.get("foo", 3); // output "bar" since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 ie "bar"   
kv.set("foo", "bar2", 4);   
kv.get("foo", 4); // output "bar2"   
kv.get("foo", 5); //output "bar2"   

Example 2:
Input: inputs = ["TimeMap","set","set","get","get","get","get","get"], inputs = [[],["love","high",10],["love","low",20],["love",5],["love",10],["love",15],["love",20],["love",25]]
Output: [null,null,null,"","high","high","low","low"]
Note:
All key/value strings are lowercase.

All key/value strings have length in the range `[1, 100]`
The `timestamps` for all `TimeMap.set` operations are strictly increasing.

`1 <= timestamp <= 10^7`
`TimeMap.set` and `TimeMap.get` functions will be called a total of `120000` times (combined) per test case.', false, 'Medium', '/articles/time-based-key-value-store', 54.2, 
   86.5, 'https://leetcode.com/problems/time-based-key-value-store', 516, 102, 188.1, '["Oracle,ByteDance,Uber,Apple,Lyft,Sumologic,Google,Atlassian,Microsoft,Twitter,Netflix"]'::jsonb, '["Hash Table,Binary Search"]'::jsonb, 
   1177, 142, 89, true, '[]'::jsonb, true),
  (982, 'Triples with Bitwise AND Equal To Zero', 'Given an array of integers `A`, find the number of triples of indices (i, j, k) such that:
`0 <= i < A.length`
`0 <= j < A.length`
`0 <= k < A.length`
`A[i] & A[j] & A[k] == 0`, where `&` represents the bitwise-AND operator.


Example 1:
Input: [2,1,3]
Output: 12
Explanation: We could choose the following i, j, k triples:
(i=0, j=0, k=1) : 2 & 2 & 1
(i=0, j=1, k=0) : 2 & 1 & 2
(i=0, j=1, k=1) : 2 & 1 & 1
(i=0, j=1, k=2) : 2 & 1 & 3
(i=0, j=2, k=1) : 2 & 3 & 1
(i=1, j=0, k=0) : 1 & 2 & 2
(i=1, j=0, k=1) : 1 & 2 & 1
(i=1, j=0, k=2) : 1 & 2 & 3
(i=1, j=1, k=0) : 1 & 1 & 2
(i=1, j=2, k=0) : 1 & 3 & 2
(i=2, j=0, k=1) : 3 & 2 & 1
(i=2, j=1, k=0) : 3 & 1 & 2
Note:
`1 <= A.length <= 1000`
`0 <= A[i] < 2^16`', false, 'Hard', NULL, 56.3, 
   0, 'https://leetcode.com/problems/triples-with-bitwise-and-equal-to-zero', 79, 9.8, 17.3, '["Flipkart"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   148, 156, 49, false, '[]'::jsonb, true),
  (983, 'Minimum Cost For Tickets', 'In a country popular for train travel, you have planned some train travelling one year in advance.  The days of the year that you will travel is given as an array `days`.  Each day is an integer from `1` to `365`.

Train tickets are sold in 3 different ways:
a 1-day pass is sold for `costs[0]` dollars;
a 7-day pass is sold for `costs[1]` dollars;
a 30-day pass is sold for `costs[2]` dollars.

The passes allow that many days of consecutive travel.  For example, if we get a 7-day pass on day 2, then we can travel for 7 days: day 2, 3, 4, 5, 6, 7, and 8.

Return the minimum number of dollars you need to travel every day in the given list of `days`.


Example 1:
Input: days = [1,4,6,7,8,20], costs = [2,7,15]
Output: 11
Explanation: 
For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 1-day pass for costs[0] = $2, which covered day 1.

On day 3, you bought a 7-day pass for costs[1] = $7, which covered days 3, 4, ..., 9.

On day 20, you bought a 1-day pass for costs[0] = $2, which covered day 20.

In total you spent $11 and covered all the days of your travel.


Example 2:
Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
Output: 17
Explanation: 
For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 30-day pass for costs[2] = $15 which covered days 1, 2, ..., 30.

On day 31, you bought a 1-day pass for costs[0] = $2 which covered day 31.

In total you spent $17 and covered all the days of your travel.

Note:
`1 <= days.length <= 365`
`1 <= days[i] <= 365`
`days` is in strictly increasing order.

`costs.length == 3`
`1 <= costs[i] <= 1000`', false, 'Medium', '/articles/minimum-cost-for-tickets', 62.8, 
   41.8, 'https://leetcode.com/problems/minimum-cost-for-tickets', 796, 96.3, 153.3, '["Facebook,Apple,Grab"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   2676, 49, 98, true, '[]'::jsonb, true),
  (984, 'String Without AAA or BBB', 'Given two integers `a` and `b`, return any string `s` such that:
`s` has length `a + b` and contains exactly `a` `''a''` letters, and exactly `b` `''b''` letters,
The substring `''aaa''` does not occur in `s`, and
The substring `''bbb''` does not occur in `s`.


Example 1:
Input: a = 1, b = 2
Output: "abb"
Explanation: "abb", "bab" and "bba" are all correct answers.


Example 2:
Input: a = 4, b = 1
Output: "aabaa"

Constraints:
`0 <= a, b <= 100`
It is guaranteed such an `s` exists for the given `a` and `b`.', false, 'Medium', '/articles/string-without-aaa-or-bbb', 38.8, 
   7.5, 'https://leetcode.com/problems/string-without-aaa-or-bbb', 318, 22.2, 57.1, '["Grab,Zalando"]'::jsonb, '["Greedy"]'::jsonb, 
   288, 287, 50, false, '[]'::jsonb, true),
  (985, 'Sum of Even Numbers After Queries', 'We have an array `A` of integers, and an array `queries` of queries.

For the `i`-th query `val = queries[i][0], index = queries[i][1]`, we add val to `A[index]`.  Then, the answer to the `i`-th query is the sum of the even values of `A`.

(Here, the given `index = queries[i][1]` is a 0-based index, and each query permanently modifies the array `A`.)
Return the answer to all queries.  Your `answer` array should have `answer[i]` as the answer to the `i`-th query.


Example 1:
Input: A = [1,2,3,4], queries = [[1,0],[-3,1],[-4,0],[2,3]]
Output: [8,6,2,4]
Explanation: 
At the beginning, the array is [1,2,3,4].

After adding 1 to A[0], the array is [2,2,3,4], and the sum of even values is 2 + 2 + 4 = 8.

After adding -3 to A[1], the array is [2,-1,3,4], and the sum of even values is 2 + 4 = 6.

After adding -4 to A[0], the array is [-2,-1,3,4], and the sum of even values is -2 + 4 = 2.

After adding 2 to A[3], the array is [-2,-1,3,6], and the sum of even values is -2 + 6 = 4.

Note:
`1 <= A.length <= 10000`
`-10000 <= A[i] <= 10000`
`1 <= queries.length <= 10000`
`-10000 <= queries[i][0] <= 10000`
`0 <= queries[i][1] < A.length`', false, 'Easy', '/articles/sum-of-even-numbers-after-queries', 60.6, 
   4.1, 'https://leetcode.com/problems/sum-of-even-numbers-after-queries', 439, 53, 87.4, '["Indeed"]'::jsonb, '["Array"]'::jsonb, 
   501, 185, 73, false, '[]'::jsonb, true),
  (986, 'Interval List Intersections', 'You are given two lists of closed intervals, `firstList` and `secondList`, where `firstList[i] = [starti, endi]` and `secondList[j] = [startj, endj]`. Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

A closed interval `[a, b]` (with `a < b`) denotes the set of real numbers `x` with `a <= x <= b`.

The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed interval. For example, the intersection of `[1, 3]` and `[2, 4]` is `[2, 3]`.


Example 1:
Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

Example 2:
Input: firstList = [[1,3],[5,9]], secondList = []
Output: []

Example 3:
Input: firstList = [], secondList = [[4,8],[10,12]]
Output: []

Example 4:
Input: firstList = [[1,7]], secondList = [[3,10]]
Output: [[3,7]]

Constraints:
`0 <= firstList.length, secondList.length <= 1000`
`firstList.length + secondList.length >= 1`
`0 <= starti < endi <= 109`
`endi < starti+1`
`0 <= startj < endj <= 109 `
`endj < startj+1`', false, 'Medium', '/articles/interval-list-intersections', 68.5, 
   61.4, 'https://leetcode.com/problems/interval-list-intersections', 839, 175.7, 256.4, '["Facebook,Uber,Apple,Google,Amazon,Bloomberg"]'::jsonb, '["Two Pointers"]'::jsonb, 
   2170, 60, 97, true, '[]'::jsonb, true),
  (987, 'Vertical Order Traversal of a Binary Tree', 'Given the `root` of a binary tree, calculate the vertical order traversal of the binary tree.

For each node at position `(row, col)`, its left and right children will be at positions `(row + 1, col - 1)` and `(row + 1, col + 1)` respectively. The root of the tree is at `(0, 0)`.

The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.

Return the vertical order traversal of the binary tree.


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
Explanation:
Column -1: Only node 9 is in this column.

Column 0: Nodes 3 and 15 are in this column in that order from top to bottom.

Column 1: Only node 20 is in this column.

Column 2: Only node 7 is in this column.


Example 2:
Input: root = [1,2,3,4,5,6,7]
Output: [[4],[2],[1,5,6],[3],[7]]
Explanation:
Column -2: Only node 4 is in this column.

Column -1: Only node 2 is in this column.

Column 0: Nodes 1, 5, and 6 are in this column.

          1 is at the top, so it comes first.

          5 and 6 are at the same position (2, 0), so we order them by their value, 5 before 6.

Column 1: Only node 3 is in this column.

Column 2: Only node 7 is in this column.


Example 3:
Input: root = [1,2,3,4,6,5,7]
Output: [[4],[2],[1,5,6],[3],[7]]
Explanation:
This case is the exact same as example 2, but with nodes 5 and 6 swapped.

Note that the solution remains the same since 5 and 6 are in the same location and should be ordered by their values.


Constraints:
The number of nodes in the tree is in the range `[1, 1000]`.

`0 <= Node.val <= 1000`', false, 'Hard', '/articles/vertical-order-traversal-of-a-binary-tree', 39, 
   65.8, 'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree', 999, 135.6, 347.6, '["Facebook,Bloomberg,Amazon,Microsoft,Apple,ByteDance"]'::jsonb, '["Hash Table,Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   1406, 2382, 37, true, '[]'::jsonb, true),
  (988, 'Smallest String Starting From Leaf', 'Given the `root` of a binary tree, each node has a value from `0` to `25` representing the letters `''a''` to `''z''`: a value of `0` represents `''a''`, a value of `1` represents `''b''`, and so on.

Find the lexicographically smallest string that starts at a leaf of this tree and ends at the root.

(As a reminder, any shorter prefix of a string is lexicographically smaller: for example, `"ab"` is lexicographically smaller than `"aba"`.  A leaf of a node is a node that has no children.)

Example 1:
Input: [0,1,2,3,4,3,4]
Output: "dba"

Example 2:
Input: [25,1,3,1,3,0,2]
Output: "adz"

Example 3:
Input: [2,2,1,null,1,0,null,0]
Output: "abc"
Note:
The number of nodes in the given tree will be between `1` and `8500`.

Each node in the tree will have a value between `0` and `25`.', false, 'Medium', '/articles/smallest-string-starting-from-leaf', 46.9, 
   0, 'https://leetcode.com/problems/smallest-string-starting-from-leaf', 405, 35.9, 76.6, '["Google"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   593, 118, 83, true, '[]'::jsonb, true),
  (989, 'Add to Array-Form of Integer', 'The array-form of an integer `num` is an array representing its digits in left to right order.

For example, for `num = 1321`, the array form is `[1,3,2,1]`.

Given `num`, the array-form of an integer, and an integer `k`, return the array-form of the integer `num + k`.


Example 1:
Input: num = [1,2,0,0], k = 34
Output: [1,2,3,4]
Explanation: 1200 + 34 = 1234

Example 2:
Input: num = [2,7,4], k = 181
Output: [4,5,5]
Explanation: 274 + 181 = 455

Example 3:
Input: num = [2,1,5], k = 806
Output: [1,0,2,1]
Explanation: 215 + 806 = 1021

Example 4:
Input: num = [9,9,9,9,9,9,9,9,9,9], k = 1
Output: [1,0,0,0,0,0,0,0,0,0,0]
Explanation: 9999999999 + 1 = 10000000000

Constraints:
`1 <= num.length <= 104`
`0 <= num[i] <= 9`
`num` does not contain any leading zeros except for the zero itself.

`1 <= k <= 104`', false, 'Easy', '/articles/add-to-array-form-of-integer', 45, 
   3.5, 'https://leetcode.com/problems/add-to-array-form-of-integer', 551, 67, 149, '["Facebook"]'::jsonb, '["Array"]'::jsonb, 
   581, 91, 86, true, '[]'::jsonb, true),
  (990, 'Satisfiability of Equality Equations', 'Given an array equations of strings that represent relationships between variables, each string `equations[i]` has length `4` and takes one of two different forms: `"a==b"` or `"a!=b"`.  Here, `a` and `b` are lowercase letters (not necessarily different) that represent one-letter variable names.

Return `true` if and only if it is possible to assign integers to variable names so as to satisfy all the given equations.


Example 1:
Input: ["a==b","b!=a"]
Output: false
Explanation: If we assign say, a = 1 and b = 1, then the first equation is satisfied, but not the second.  There is no way to assign the variables to satisfy both equations.


Example 2:
Input: ["b==a","a==b"]
Output: true
Explanation: We could assign a = 1 and b = 1 to satisfy both equations.


Example 3:
Input: ["a==b","b==c","a==c"]
Output: true

Example 4:
Input: ["a==b","b!=c","c==a"]
Output: false

Example 5:
Input: ["c==c","b==d","x!=z"]
Output: true
Note:
`1 <= equations.length <= 500`
`equations[i].length == 4`
`equations[i][0]` and `equations[i][3]` are lowercase letters
`equations[i][1]` is either `''=''` or `''!''`
`equations[i][2]` is `''=''`', false, 'Medium', '/articles/satisfiability-of-equality-equations', 47.1, 
   1.3, 'https://leetcode.com/problems/satisfiability-of-equality-equations', 357, 27.7, 58.7, '["Sumologic"]'::jsonb, '["Union Find,Graph"]'::jsonb, 
   784, 7, 99, false, '[]'::jsonb, true),
  (991, 'Broken Calculator', 'On a broken calculator that has a number showing on its display, we can perform two operations:
Double: Multiply the number on the display by 2, or;
Decrement: Subtract 1 from the number on the display.

Initially, the calculator is displaying the number `X`.

Return the minimum number of operations needed to display the number `Y`.


Example 1:
Input: X = 2, Y = 3
Output: 2
Explanation: Use double operation and then decrement operation {2 -> 4 -> 3}.


Example 2:
Input: X = 5, Y = 8
Output: 2
Explanation: Use decrement and then double {5 -> 4 -> 8}.


Example 3:
Input: X = 3, Y = 10
Output: 3
Explanation:  Use double, decrement and double {3 -> 6 -> 5 -> 10}.


Example 4:
Input: X = 1024, Y = 1
Output: 1023
Explanation: Use decrement operations 1023 times.

Note:
`1 <= X <= 10^9`
`1 <= Y <= 10^9`', false, 'Medium', '/articles/broken-calculator', 49.7, 
   11.4, 'https://leetcode.com/problems/broken-calculator', 263, 41.9, 84.3, '["Bloomberg"]'::jsonb, '["Math,Greedy"]'::jsonb, 
   865, 130, 87, false, '[]'::jsonb, true),
  (992, 'Subarrays with K Different Integers', 'Given an array `A` of positive integers, call a (contiguous, not necessarily distinct) subarray of `A` good if the number of different integers in that subarray is exactly `K`.

(For example, `[1,2,3,1,2]` has `3` different integers: `1`, `2`, and `3`.)
Return the number of good subarrays of `A`.


Example 1:
Input: A = [1,2,1,2,3], K = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].


Example 2:
Input: A = [1,2,1,3,4], K = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].

Note:
`1 <= A.length <= 20000`
`1 <= A[i] <= A.length`
`1 <= K <= A.length`', false, 'Hard', '/articles/subarrays-with-k-different-integers', 50.9, 
   38.8, 'https://leetcode.com/problems/subarrays-with-k-different-integers', 227, 42.8, 84.1, '["Amazon,Google"]'::jsonb, '["Hash Table,Two Pointers,Sliding Window"]'::jsonb, 
   1663, 28, 98, true, '[]'::jsonb, true),
  (993, 'Cousins in Binary Tree', 'In a binary tree, the root node is at depth `0`, and children of each depth `k` node are at depth `k+1`.

Two nodes of a binary tree are cousins if they have the same depth, but have different parents.

We are given the `root` of a binary tree with unique values, and the values `x` and `y` of two different nodes in the tree.

Return `true` if and only if the nodes corresponding to the values `x` and `y` are cousins.


Example 1:
Input: root = [1,2,3,4], x = 4, y = 3
Output: false

Example 2:
Input: root = [1,2,3,null,4,null,5], x = 5, y = 4
Output: true

Example 3:
Input: root = [1,2,3,null,4], x = 2, y = 3
Output: false

Constraints:
The number of nodes in the tree will be between `2` and `100`.

Each node has a unique integer value from `1` to `100`.', false, 'Easy', '/articles/cousins-in-binary-tree', 52.3, 
   23.9, 'https://leetcode.com/problems/cousins-in-binary-tree', 999, 142.3, 272.1, '["Bloomberg,Amazon,Facebook"]'::jsonb, '["Tree,Breadth-first Search"]'::jsonb, 
   1425, 77, 95, true, '[]'::jsonb, true),
  (994, 'Rotting Oranges', 'You are given an `m x n` `grid` where each cell can have one of three values:
`0` representing an empty cell,
`1` representing a fresh orange, or
`2` representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return `-1`.


Example 1:
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Example 2:
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.


Example 3:
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.


Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 10`
`grid[i][j]` is `0`, `1`, or `2`.', false, 'Medium', '/articles/rotting-oranges', 49.6, 
   65.2, 'https://leetcode.com/problems/rotting-oranges', 999, 205.5, 413.9, '["Amazon,Google,Microsoft,Bloomberg,Oracle,Walmart Labs"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   3211, 215, 94, true, '[]'::jsonb, true),
  (995, 'Minimum Number of K Consecutive Bit Flips', 'In an array `A` containing only 0s and 1s, a `K`-bit flip consists of choosing a (contiguous) subarray of length `K` and simultaneously changing every 0 in the subarray to 1, and every 1 in the subarray to 0.

Return the minimum number of `K`-bit flips required so that there is no 0 in the array.  If it is not possible, return `-1`.


Example 1:
Input: A = [0,1,0], K = 1
Output: 2
Explanation: Flip A[0], then flip A[2].


Example 2:
Input: A = [1,1,0], K = 2
Output: -1
Explanation: No matter how we flip subarrays of size 2, we can''t make the array become [1,1,1].


Example 3:
Input: A = [0,0,0,1,0,1,1,0], K = 3
Output: 3
Explanation:
Flip A[0],A[1],A[2]: A becomes [1,1,1,1,0,1,1,0]
Flip A[4],A[5],A[6]: A becomes [1,1,1,1,1,0,0,0]
Flip A[5],A[6],A[7]: A becomes [1,1,1,1,1,1,1,1]
Note:
`1 <= A.length <= 30000`
`1 <= K <= A.length`', false, 'Hard', '/articles/minimum-number-of-k-consecutive-bit-flips', 50, 
   15, 'https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips', 111, 19.4, 38.8, '["Google,Amazon"]'::jsonb, '["Greedy,Sliding Window"]'::jsonb, 
   517, 42, 92, true, '[]'::jsonb, true),
  (996, 'Number of Squareful Arrays', 'Given an array `A` of non-negative integers, the array is squareful if for every pair of adjacent elements, their sum is a perfect square.

Return the number of permutations of A that are squareful.  Two permutations `A1` and `A2` differ if and only if there is some index `i` such that `A1[i] != A2[i]`.


Example 1:
Input: [1,17,8]
Output: 2
Explanation: 
[1,8,17] and [17,8,1] are the valid permutations.


Example 2:
Input: [2,2,2]
Output: 1
Note:
`1 <= A.length <= 12`
`0 <= A[i] <= 1e9`', false, 'Hard', '/articles/number-of-squareful-arrays', 48.6, 
   12.2, 'https://leetcode.com/problems/number-of-squareful-arrays', 208, 18.6, 38.3, '["Apple,Codenation"]'::jsonb, '["Math,Backtracking,Graph"]'::jsonb, 
   465, 23, 95, true, '[]'::jsonb, true),
  (997, 'Find the Town Judge', 'In a town, there are `N` people labelled from `1` to `N`.  There is a rumor that one of these people is secretly the town judge.

If the town judge exists, then:
The town judge trusts nobody.

Everybody (except for the town judge) trusts the town judge.

There is exactly one person that satisfies properties 1 and 2.

You are given `trust`, an array of pairs `trust[i] = [a, b]` representing that the person labelled `a` trusts the person labelled `b`.

If the town judge exists and can be identified, return the label of the town judge.  Otherwise, return `-1`.


Example 1:
Input: N = 2, trust = [[1,2]]
Output: 2

Example 2:
Input: N = 3, trust = [[1,3],[2,3]]
Output: 3

Example 3:
Input: N = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1

Example 4:
Input: N = 3, trust = [[1,2],[2,3]]
Output: -1

Example 5:
Input: N = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
Output: 3

Constraints:
`1 <= N <= 1000`
`0 <= trust.length <= 10^4`
`trust[i].length == 2`
`trust[i]` are all different
`trust[i][0] != trust[i][1]`
`1 <= trust[i][0], trust[i][1] <= N`', false, 'Easy', '/articles/find-the-town-judge', 49.8, 
   19.9, 'https://leetcode.com/problems/find-the-town-judge', 999, 164.5, 330.3, '["Amazon"]'::jsonb, '["Graph"]'::jsonb, 
   1490, 121, 92, true, '[]'::jsonb, true),
  (998, 'Maximum Binary Tree II', 'We are given the `root` node of a maximum tree: a tree where every node has a value greater than any other value in its subtree.

Just as in the previous problem, the given tree was constructed from an list `A` (`root = Construct(A)`) recursively with the following `Construct(A)` routine:
If `A` is empty, return `null`.

Otherwise, let `A[i]` be the largest element of `A`.  Create a `root` node with value `A[i]`.

The left child of `root` will be `Construct([A[0], A[1], ..., A[i-1]])`
The right child of `root` will be `Construct([A[i+1], A[i+2], ..., A[A.length - 1]])`
Return `root`.

Note that we were not given A directly, only a root node `root = Construct(A)`.

Suppose `B` is a copy of `A` with the value `val` appended to it.  It is guaranteed that `B` has unique values.

Return `Construct(B)`.


Example 1:
Input: root = [4,1,3,null,null,2], val = 5
Output: [5,4,null,1,3,null,null,2]
Explanation: A = [1,4,2,3], B = [1,4,2,3,5]

Example 2:
Input: root = [5,2,4,null,1], val = 3
Output: [5,2,4,null,1,null,3]
Explanation: A = [2,1,5,4], B = [2,1,5,4,3]

Example 3:
Input: root = [5,2,3,null,1], val = 4
Output: [5,2,4,null,1,3]
Explanation: A = [2,1,5,3], B = [2,1,5,3,4]

Constraints:
`1 <= B.length <= 100`', false, 'Medium', NULL, 64.1, 
   2.2, 'https://leetcode.com/problems/maximum-binary-tree-ii', 219, 20.7, 32.3, '["Facebook"]'::jsonb, '["Tree"]'::jsonb, 
   246, 492, 33, true, '[]'::jsonb, true),
  (999, 'Available Captures for Rook', 'On an `8 x 8` chessboard, there is exactly one white rook `''R''` and some number of white bishops `''B''`, black pawns `''p''`, and empty squares `''.''`.

When the rook moves, it chooses one of four cardinal directions (north, east, south, or west), then moves in that direction until it chooses to stop, reaches the edge of the board, captures a black pawn, or is blocked by a white bishop. A rook is considered attacking a pawn if the rook can capture the pawn on the rook''s turn. The number of available captures for the white rook is the number of pawns that the rook is attacking.

Return the number of available captures for the white rook.


Example 1:
Input: board = [[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","R",".",".",".","p"],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]
Output: 3
Explanation: In this example, the rook is attacking all the pawns.


Example 2:
Input: board = [[".",".",".",".",".",".",".","."],[".","p","p","p","p","p",".","."],[".","p","p","B","p","p",".","."],[".","p","B","R","B","p",".","."],[".","p","p","B","p","p",".","."],[".","p","p","p","p","p",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]
Output: 0
Explanation: The bishops are blocking the rook from attacking any of the pawns.


Example 3:
Input: board = [[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","p",".",".",".","."],["p","p",".","R",".","p","B","."],[".",".",".",".",".",".",".","."],[".",".",".","B",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."]]
Output: 3
Explanation: The rook is attacking the pawns at positions b5, d6, and f5.


Constraints:
`board.length == 8`
`board[i].length == 8`
`board[i][j]` is either `''R''`, `''.''`, `''B''`, or `''p''`
There is exactly one cell with `board[i][j] == ''R''`', false, 'Easy', NULL, 67.8, 
   3.7, 'https://leetcode.com/problems/available-captures-for-rook', 682, 40.4, 59.6, '["Square"]'::jsonb, '["Array"]'::jsonb, 
   312, 498, 39, false, '[]'::jsonb, true),
  (1000, 'Minimum Cost to Merge Stones', 'There are `N` piles of stones arranged in a row.  The `i`-th pile has `stones[i]` stones.

A move consists of merging exactly `K` consecutive piles into one pile, and the cost of this move is equal to the total number of stones in these `K` piles.

Find the minimum cost to merge all piles of stones into one pile.  If it is impossible, return `-1`.


Example 1:
Input: stones = [3,2,4,1], K = 2
Output: 20
Explanation: 
We start with [3, 2, 4, 1].

We merge [3, 2] for a cost of 5, and we are left with [5, 4, 1].

We merge [4, 1] for a cost of 5, and we are left with [5, 5].

We merge [5, 5] for a cost of 10, and we are left with [10].

The total cost was 20, and this is the minimum possible.


Example 2:
Input: stones = [3,2,4,1], K = 3
Output: -1
Explanation: After any merge operation, there are 2 piles left, and we can''t merge anymore.  So the task is impossible.


Example 3:
Input: stones = [3,5,1,2,6], K = 3
Output: 25
Explanation: 
We start with [3, 5, 1, 2, 6].

We merge [5, 1, 2] for a cost of 8, and we are left with [3, 8, 6].

We merge [3, 8, 6] for a cost of 17, and we are left with [17].

The total cost was 25, and this is the minimum possible.

Note:
`1 <= stones.length <= 30`
`2 <= K <= 30`
`1 <= stones[i] <= 100`', false, 'Hard', NULL, 40.5, 
   20.6, 'https://leetcode.com/problems/minimum-cost-to-merge-stones', 112, 19.6, 48.4, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   903, 58, 94, true, '[]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;

COMMIT;

-- ============================================
-- Import Summary
-- ============================================
-- Total Problems Imported: 1825
-- Skipped: 0
-- ============================================
