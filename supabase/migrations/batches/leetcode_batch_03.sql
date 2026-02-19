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
  (1001, 'Grid Illumination', 'You are given a `grid` of size `N x N`, and each cell of this grid has a lamp that is initially turned off.

You are also given an array of lamp positions `lamps`, where `lamps[i] = [rowi, coli]` indicates that the lamp at `grid[rowi][coli]` is turned on. When a lamp is turned on, it illuminates its cell and all other cells in the same row, column, or diagonal.

Finally, you are given a query array `queries`, where `queries[i] = [rowi, coli]`. For the `ith` query, determine whether `grid[rowi][coli]` is illuminated or not. After answering the `ith` query, turn off the lamp at `grid[rowi][coli]` and its 8 adjacent lamps if they exist. A lamp is adjacent if its cell shares either a side or corner with `grid[rowi][coli]`.

Return an array of integers `ans`, where `ans[i]` should be `1` if the lamp in the `ith` query was illuminated, or `0` if the lamp was not.


Example 1:
Input: N = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]
Output: [1,0]
Explanation: We have the initial grid with all lamps turned off. In the above picture we see the grid after turning on the lamp at grid[0][0] then turning on the lamp at grid[4][4].

The 0th query asks if the lamp at grid[1][1] is illuminated or not (the blue square). It is illuminated, so set ans[0] = 1. Then, we turn off all lamps in the red square.

The 1st query asks if the lamp at grid[1][0] is illuminated or not (the blue square). It is not illuminated, so set ans[1] = 0. Then, we turn off all lamps in the red rectangle.


Example 2:
Input: N = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,1]]
Output: [1,1]

Example 3:
Input: N = 5, lamps = [[0,0],[0,4]], queries = [[0,4],[0,1],[1,4]]
Output: [1,1,0]

Constraints:
`1 <= N <= 109`
`0 <= lamps.length <= 20000`
`lamps[i].length == 2`
`0 <= lamps[i][j] < N`
`0 <= queries.length <= 20000`
`queries[i].length == 2`
`0 <= queries[i][j] < N`', false, 'Hard', NULL, 36, 
   32.9, 'https://leetcode.com/problems/grid-illumination', 138, 11.4, 31.5, '["Dropbox"]'::jsonb, '["Hash Table"]'::jsonb, 
   256, 76, 77, false, '[]'::jsonb, true),
  (1002, 'Find Common Characters', 'Given an array `A` of strings made only from lowercase letters, return a list of all characters that show up in all strings within the list (including duplicates).  For example, if a character occurs 3 times in all strings but not 4 times, you need to include that character three times in the final answer.

You may return the answer in any order.


Example 1:
Input: ["bella","label","roller"]
Output: ["e","l","l"]

Example 2:
Input: ["cool","lock","cook"]
Output: ["c","o"]
Note:
`1 <= A.length <= 100`
`1 <= A[i].length <= 100`
`A[i][j]` is a lowercase letter', false, 'Easy', NULL, 68.7, 
   30.4, 'https://leetcode.com/problems/find-common-characters', 999, 103.5, 150.7, '["Apple,Amazon"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   1405, 137, 91, true, '[]'::jsonb, true),
  (1003, 'Check If Word Is Valid After Substitutions', 'Given a string `s`, determine if it is valid.

A string `s` is valid if, starting with an empty string `t = ""`, you can transform `t` into `s` after performing the following operation any number of times:
Insert string `"abc"` into any position in `t`. More formally, `t` becomes `tleft + "abc" + tright`, where `t == tleft + tright`. Note that `tleft` and `tright` may be empty.

Return `true` if `s` is a valid string, otherwise, return `false`.


Example 1:
Input: s = "aabcbc"
Output: true
Explanation:
"" -> "abc" -> "aabcbc"
Thus, "aabcbc" is valid.


Example 2:
Input: s = "abcabcababcc"
Output: true
Explanation:
"" -> "abc" -> "abcabc" -> "abcabcabc" -> "abcabcababcc"
Thus, "abcabcababcc" is valid.


Example 3:
Input: s = "abccba"
Output: false
Explanation: It is impossible to get "abccba" using the operation.


Example 4:
Input: s = "cababc"
Output: false
Explanation: It is impossible to get "cababc" using the operation.


Constraints:
`1 <= s.length <= 2 * 104`
`s` consists of letters `''a''`, `''b''`, and `''c''`', false, 'Medium', NULL, 56.6, 
   3.3, 'https://leetcode.com/problems/check-if-word-is-valid-after-substitutions', 386, 29.4, 52, '["Nutanix"]'::jsonb, '["String,Stack"]'::jsonb, 
   331, 382, 46, false, '[]'::jsonb, true),
  (1004, 'Max Consecutive Ones III', 'Given an array `A` of 0s and 1s, we may change up to `K` values from 0 to 1.

Return the length of the longest (contiguous) subarray that contains only 1s. 

Example 1:
Input: A = [1,1,1,0,0,0,1,1,1,1,0], K = 2
Output: 6
Explanation: 
[1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1.  The longest subarray is underlined.


Example 2:
Input: A = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
Output: 10
Explanation: 
[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1.  The longest subarray is underlined.

Note:
`1 <= A.length <= 20000`
`0 <= K <= A.length`
`A[i]` is `0` or `1`', false, 'Medium', '/articles/max-consecutive-ones-iii', 60.8, 
   32.8, 'https://leetcode.com/problems/max-consecutive-ones-iii', 615, 96.6, 158.9, '["Facebook,Coupang,HBO"]'::jsonb, '["Two Pointers,Sliding Window"]'::jsonb, 
   2020, 31, 98, true, '[]'::jsonb, true),
  (1005, 'Maximize Sum Of Array After K Negations', 'Given an array `A` of integers, we must modify the array in the following way: we choose an `i` and replace `A[i]` with `-A[i]`, and we repeat this process `K` times in total.  (We may choose the same index `i` multiple times.)
Return the largest possible sum of the array after modifying it in this way.


Example 1:
Input: A = [4,2,3], K = 1
Output: 5
Explanation: Choose indices (1,) and A becomes [4,-2,3].


Example 2:
Input: A = [3,-1,0,2], K = 3
Output: 6
Explanation: Choose indices (1, 2, 2) and A becomes [3,1,0,2].


Example 3:
Input: A = [2,-3,-1,5,-4], K = 2
Output: 13
Explanation: Choose indices (1, 4) and A becomes [2,3,-1,5,4].

Note:
`1 <= A.length <= 10000`
`1 <= K <= 10000`
`-100 <= A[i] <= 100`', false, 'Easy', NULL, 52.3, 
   2.8, 'https://leetcode.com/problems/maximize-sum-of-array-after-k-negations', 495, 37.3, 71.2, '["Amazon"]'::jsonb, '["Greedy"]'::jsonb, 
   547, 54, 91, true, '[]'::jsonb, true),
  (1006, 'Clumsy Factorial', 'Normally, the factorial of a positive integer `n` is the product of all positive integers less than or equal to `n`.  For example, `factorial(10) = 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1`.

We instead make a clumsy factorial: using the integers in decreasing order, we swap out the multiply operations for a fixed rotation of operations: multiply (*), divide (/), add (+) and subtract (-) in this order.

For example, `clumsy(10) = 10 * 9 / 8 + 7 - 6 * 5 / 4 + 3 - 2 * 1`.  However, these operations are still applied using the usual order of operations of arithmetic: we do all multiplication and division steps before any addition or subtraction steps, and multiplication and division steps are processed left to right.

Additionally, the division that we use is floor division such that `10 * 9 / 8` equals `11`.  This guarantees the result is an integer.

`Implement the clumsy` function as defined above: given an integer `N`, it returns the clumsy factorial of `N`.


Example 1:
Input: 4
Output: 7
Explanation: 7 = 4 * 3 / 2 + 1

Example 2:
Input: 10
Output: 12
Explanation: 12 = 10 * 9 / 8 + 7 - 6 * 5 / 4 + 3 - 2 * 1
Note:
`1 <= N <= 10000`
`-2^31 <= answer <= 2^31 - 1`  (The answer is guaranteed to fit within a 32-bit integer.)', false, 'Medium', NULL, 53.7, 
   0, 'https://leetcode.com/problems/clumsy-factorial', 210, 15.7, 29.2, '["Microsoft"]'::jsonb, '["Math"]'::jsonb, 
   120, 171, 41, false, '[]'::jsonb, true),
  (1007, 'Minimum Domino Rotations For Equal Row', 'In a row of dominoes, `A[i]` and `B[i]` represent the top and bottom halves of the `ith` domino.  (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)
We may rotate the `ith` domino, so that `A[i]` and `B[i]` swap values.

Return the minimum number of rotations so that all the values in `A` are the same, or all the values in `B` are the same.

If it cannot be done, return `-1`.


Example 1:
Input: A = [2,1,2,4,2,2], B = [5,2,6,2,3,2]
Output: 2
Explanation: 
The first figure represents the dominoes as given by A and B: before we do any rotations.

If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2, as indicated by the second figure.


Example 2:
Input: A = [3,5,1,2,3], B = [3,6,3,3,4]
Output: -1
Explanation: 
In this case, it is not possible to rotate the dominoes to make one row of values equal.


Constraints:
`2 <= A.length == B.length <= 2 * 104`
`1 <= A[i], B[i] <= 6`', false, 'Medium', '/articles/minimum-domino-rotations-for-equal-row', 50.9, 
   5.4, 'https://leetcode.com/problems/minimum-domino-rotations-for-equal-row', 661, 118.7, 233.1, '["Google"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   1229, 193, 86, true, '[]'::jsonb, true),
  (1008, 'Construct Binary Search Tree from Preorder Traversal', 'Given an array of integers preorder, which represents the preorder traversal of a BST (i.e., binary search tree), construct the tree and return its root.

It is guaranteed that there is always possible to find a binary search tree with the given requirements for the given test cases.

A binary search tree is a binary tree where for every node, any descendant of `Node.left` has a value strictly less than `Node.val`, and any descendant of `Node.right` has a value strictly greater than `Node.val`.

A preorder traversal of a binary tree displays the value of the node first, then traverses `Node.left`, then traverses `Node.right`.


Example 1:
Input: preorder = [8,5,1,7,10,12]
Output: [8,5,10,1,7,null,12]

Example 2:
Input: preorder = [1,3]
Output: [1,null,3]

Constraints:
`1 <= preorder.length <= 100`
`1 <= preorder[i] <= 108`
All the values of `preorder` are unique.', false, 'Medium', '/articles/construct-bst-from-preorder-traversal', 78.8, 
   16.5, 'https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal', 999, 159.1, 201.8, '["Amazon,Oracle"]'::jsonb, '["Tree"]'::jsonb, 
   1798, 48, 97, true, '[]'::jsonb, true),
  (1009, 'Complement of Base 10 Integer', 'Every non-negative integer `N` has a binary representation.  For example, `5` can be represented as `"101"` in binary, `11` as `"1011"` in binary, and so on.  Note that except for `N = 0`, there are no leading zeroes in any binary representation.

The complement of a binary representation is the number in binary you get when changing every `1` to a `0` and `0` to a `1`.  For example, the complement of `"101"` in binary is `"010"` in binary.

For a given number `N` in base-10, return the complement of it''s binary representation as a base-10 integer.


Example 1:
Input: 5
Output: 2
Explanation: 5 is "101" in binary, with complement "010" in binary, which is 2 in base-10.


Example 2:
Input: 7
Output: 0
Explanation: 7 is "111" in binary, with complement "000" in binary, which is 0 in base-10.


Example 3:
Input: 10
Output: 5
Explanation: 10 is "1010" in binary, with complement "0101" in binary, which is 5 in base-10.

Note:
`0 <= N < 10^9`
This question is the same as 476: https://leetcode.com/problems/number-complement/', false, 'Easy', '/articles/complement-of-base-10-integer', 61.4, 
   0, 'https://leetcode.com/problems/complement-of-base-10-integer', 829, 64.4, 104.8, '["Cloudera"]'::jsonb, '["Math"]'::jsonb, 
   437, 44, 91, false, '[]'::jsonb, true),
  (1010, 'Pairs of Songs With Total Durations Divisible by 60', 'You are given a list of songs where the ith song has a duration of `time[i]` seconds.

Return the number of pairs of songs for which their total duration in seconds is divisible by `60`. Formally, we want the number of indices `i`, `j` such that `i < j` with `(time[i] + time[j]) % 60 == 0`.


Example 1:
Input: time = [30,20,150,100,40]
Output: 3
Explanation: Three pairs have a total duration divisible by 60:
(time[0] = 30, time[2] = 150): total duration 180
(time[1] = 20, time[3] = 100): total duration 120
(time[1] = 20, time[4] = 40): total duration 60

Example 2:
Input: time = [60,60,60]
Output: 3
Explanation: All three pairs have a total duration of 120, which is divisible by 60.


Constraints:
`1 <= time.length <= 6 * 104`
`1 <= time[i] <= 500`', false, 'Medium', '/articles/pairs-of-songs-with-total-durations-divisible-by-60', 50.6, 
   85.5, 'https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60', 533, 95.5, 188.6, '["Amazon,Citrix,IBM,Paypal,BlackRock"]'::jsonb, '["Array"]'::jsonb, 
   1328, 79, 94, true, '[]'::jsonb, true),
  (1011, 'Capacity To Ship Packages Within D Days', 'A conveyor belt has packages that must be shipped from one port to another within `D` days.

The ith package on the conveyor belt has a weight of `weights[i]`. Each day, we load the ship with packages on the conveyor belt (in the order given by `weights`). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within `D` days.


Example 1:
Input: weights = [1,2,3,4,5,6,7,8,9,10], D = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10
Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.


Example 2:
Input: weights = [3,2,2,4,1,4], D = 3
Output: 6
Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4

Example 3:
Input: weights = [1,2,3,1,1], D = 4
Output: 3
Explanation:
1st day: 1
2nd day: 2
3rd day: 3
4th day: 1, 1

Constraints:
`1 <= D <= weights.length <= 5 * 104`
`1 <= weights[i] <= 500`', false, 'Medium', NULL, 59.9, 
   36.2, 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days', 411, 69.9, 116.8, '["Amazon,Flipkart"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   1958, 57, 97, true, '[]'::jsonb, true),
  (1012, 'Numbers With Repeated Digits', 'Given a positive integer `N`, return the number of positive integers less than or equal to `N` that have at least 1 repeated digit.


Example 1:
Input: 20
Output: 1
Explanation: The only positive number (<= 20) with at least 1 repeated digit is 11.


Example 2:
Input: 100
Output: 10
Explanation: The positive numbers (<= 100) with atleast 1 repeated digit are 11, 22, 33, 44, 55, 66, 77, 88, 99, and 100.


Example 3:
Input: 1000
Output: 262
Note:
`1 <= N <= 10^9`', false, 'Hard', NULL, 37.8, 
   21.3, 'https://leetcode.com/problems/numbers-with-repeated-digits', 79, 7, 18.5, '["Akuna Capital,IBM"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   281, 52, 84, false, '[]'::jsonb, true),
  (1013, 'Partition Array Into Three Parts With Equal Sum', 'Given an array of integers `arr`, return `true` if we can partition the array into three non-empty parts with equal sums.

Formally, we can partition the array if we can find indexes `i + 1 < j` with `(arr[0] + arr[1] + ... + arr[i] == arr[i + 1] + arr[i + 2] + ... + arr[j - 1] == arr[j] + arr[j + 1] + ... + arr[arr.length - 1])`

Example 1:
Input: arr = [0,2,1,-6,6,-7,9,1,2,0,1]
Output: true
Explanation: 0 + 2 + 1 = -6 + 6 - 7 + 9 + 1 = 2 + 0 + 1

Example 2:
Input: arr = [0,2,1,-6,6,7,9,-1,2,0,1]
Output: false

Example 3:
Input: arr = [3,3,6,5,-2,2,5,1,-9,4]
Output: true
Explanation: 3 + 3 = 6 = 5 - 2 + 2 + 5 + 1 - 9 + 4

Constraints:
`3 <= arr.length <= 5 * 104`
`-104 <= arr[i] <= 104`', false, 'Easy', NULL, 48.2, 
   5.9, 'https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum', 435, 45.8, 95, '["Amazon,Adobe"]'::jsonb, '["Array"]'::jsonb, 
   659, 83, 89, true, '[]'::jsonb, true),
  (1014, 'Best Sightseeing Pair', 'You are given an integer array `values` where values[i] represents the value of the `ith` sightseeing spot. Two sightseeing spots `i` and `j` have a distance `j - i` between them.

The score of a pair (`i < j`) of sightseeing spots is `values[i] + values[j] + i - j`: the sum of the values of the sightseeing spots, minus the distance between them.

Return the maximum score of a pair of sightseeing spots.


Example 1:
Input: values = [8,1,5,2,6]
Output: 11
Explanation: i = 0, j = 2, values[i] + values[j] + i - j = 8 + 5 + 0 - 2 = 11

Example 2:
Input: values = [1,2]
Output: 2

Constraints:
`2 <= values.length <= 5 * 104`
`1 <= values[i] <= 1000`', false, 'Medium', NULL, 52.9, 
   4.4, 'https://leetcode.com/problems/best-sightseeing-pair', 232, 22.1, 41.7, '["Wayfair"]'::jsonb, '["Array"]'::jsonb, 
   605, 27, 96, false, '[]'::jsonb, true),
  (1015, 'Smallest Integer Divisible by K', 'Given a positive integer `K`, you need to find the length of the smallest positive integer `N` such that `N` is divisible by `K`, and `N` only contains the digit `1`.

Return the length of `N`. If there is no such `N`, return -1.

Note: `N` may not fit in a 64-bit signed integer.


Example 1:
Input: K = 1
Output: 1
Explanation: The smallest answer is N = 1, which has length 1.


Example 2:
Input: K = 2
Output: -1
Explanation: There is no such positive integer N divisible by 2.


Example 3:
Input: K = 3
Output: 3
Explanation: The smallest answer is N = 111, which has length 3.


Constraints:
`1 <= K <= 105`', false, 'Medium', '/articles/smallest-integer-divisible-by-k', 41.9, 
   0, 'https://leetcode.com/problems/smallest-integer-divisible-by-k', 182, 27.4, 65.4, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   365, 386, 49, true, '[]'::jsonb, true),
  (1016, 'Binary String With Substrings Representing 1 To N', 'Given a binary string `S` (a string consisting only of ''0'' and ''1''s) and a positive integer `N`, return true if and only if for every integer X from 1 to N, the binary representation of X is a substring of S.


Example 1:
Input: S = "0110", N = 3
Output: true

Example 2:
Input: S = "0110", N = 4
Output: false
Note:
`1 <= S.length <= 1000`
`1 <= N <= 10^9`', false, 'Medium', NULL, 58.8, 
   1.9, 'https://leetcode.com/problems/binary-string-with-substrings-representing-1-to-n', 230, 21.9, 37.2, '["Google"]'::jsonb, '["String"]'::jsonb, 
   162, 386, 30, true, '[]'::jsonb, true),
  (1017, 'Convert to Base -2', 'Given a number `N`, return a string consisting of `"0"`s and `"1"`s that represents its value in base `-2` (negative two).

The returned string must have no leading zeroes, unless the string is `"0"`.


Example 1:
Input: 2
Output: "110"
Explantion: (-2) ^ 2 + (-2) ^ 1 = 2

Example 2:
Input: 3
Output: "111"
Explantion: (-2) ^ 2 + (-2) ^ 1 + (-2) ^ 0 = 3

Example 3:
Input: 4
Output: "100"
Explantion: (-2) ^ 2 = 4
Note:
`0 <= N <= 10^9`', false, 'Medium', NULL, 59.2, 
   18.9, 'https://leetcode.com/problems/convert-to-base-2', 131, 14.1, 23.9, '["Grab"]'::jsonb, '["Math"]'::jsonb, 
   236, 186, 56, false, '[]'::jsonb, true),
  (1018, 'Binary Prefix Divisible By 5', 'Given an array `A` of `0`s and `1`s, consider `N_i`: the i-th subarray from `A[0]` to `A[i]` interpreted as a binary number (from most-significant-bit to least-significant-bit.)
Return a list of booleans `answer`, where `answer[i]` is `true` if and only if `N_i` is divisible by 5.


Example 1:
Input: [0,1,1]
Output: [true,false,false]
Explanation: 
The input numbers in binary are 0, 01, 011; which are 0, 1, and 3 in base-10.  Only the first number is divisible by 5, so answer[0] is true.


Example 2:
Input: [1,1,1]
Output: [false,false,false]

Example 3:
Input: [0,1,1,1,1,1]
Output: [true,false,false,false,true,false]

Example 4:
Input: [1,1,1,0,1]
Output: [false,false,false,false,false]
Note:
`1 <= A.length <= 30000`
`A[i]` is `0` or `1`', false, 'Easy', NULL, 47.8, 
   0, 'https://leetcode.com/problems/binary-prefix-divisible-by-5', 269, 30.6, 64.1, '[]'::jsonb, '[]'::jsonb, 
   363, 111, 77, false, '[]'::jsonb, true),
  (1019, 'Next Greater Node In Linked List', 'We are given a linked list with `head` as the first node.  Let''s number the nodes in the list: `node_1, node_2, node_3, ...` etc.

Each node may have a next larger value: for `node_i`, `next_larger(node_i)` is the `node_j.val` such that `j > i`, `node_j.val > node_i.val`, and `j` is the smallest possible choice.  If such a `j` does not exist, the next larger value is `0`.

Return an array of integers `answer`, where `answer[i] = next_larger(node_{i+1})`.

Note that in the example inputs (not outputs) below, arrays such as `[2,1,5]` represent the serialization of a linked list with a head node value of 2, second node value of 1, and third node value of 5.


Example 1:
Input: [2,1,5]
Output: [5,5,0]

Example 2:
Input: [2,7,4,3,5]
Output: [7,0,5,5,0]

Example 3:
Input: [1,7,5,1,9,2,5,1]
Output: [7,9,9,9,0,5,0,0]
Note:
`1 <= node.val <= 10^9` for each node in the linked list.

The given list has length in the range `[0, 10000]`.', false, 'Medium', NULL, 58.3, 
   19.7, 'https://leetcode.com/problems/next-greater-node-in-linked-list', 623, 68.3, 117.2, '["Amazon,Google,Facebook"]'::jsonb, '["Linked List,Stack"]'::jsonb, 
   1289, 72, 95, true, '[]'::jsonb, true),
  (1020, 'Number of Enclaves', 'You are given an `m x n` binary matrix `grid`, where `0` represents a sea cell and `1` represents a land cell.

A move consists of walking from one land cell to another adjacent (4-directionally) land cell or walking off the boundary of the `grid`.

Return the number of land cells in `grid` for which we cannot walk off the boundary of the grid in any number of moves.


Example 1:
Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
Output: 3
Explanation: There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.


Example 2:
Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
Output: 0
Explanation: All 1s are either on the boundary or can reach the boundary.


Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 500`
`grid[i][j]` is either `0` or `1`.', false, 'Medium', NULL, 59.2, 
   1.5, 'https://leetcode.com/problems/number-of-enclaves', 296, 25.7, 43.4, '["Google"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   488, 24, 95, true, '[]'::jsonb, true),
  (1021, 'Remove Outermost Parentheses', 'A valid parentheses string is either empty `("")`, `"(" + A + ")"`, or `A + B`, where `A` and `B` are valid parentheses strings, and `+` represents string concatenation.  For example, `""`, `"()"`, `"(())()"`, and `"(()(()))"` are all valid parentheses strings.

A valid parentheses string `S` is primitive if it is nonempty, and there does not exist a way to split it into `S = A+B`, with `A` and `B` nonempty valid parentheses strings.

Given a valid parentheses string `S`, consider its primitive decomposition: `S = P_1 + P_2 + ... + P_k`, where `P_i` are primitive valid parentheses strings.

Return `S` after removing the outermost parentheses of every primitive string in the primitive decomposition of `S`.


Example 1:
Input: "(()())(())"
Output: "()()()"
Explanation: 
The input string is "(()())(())", with primitive decomposition "(()())" + "(())".

After removing outer parentheses of each part, this is "()()" + "()" = "()()()".


Example 2:
Input: "(()())(())(()(()))"
Output: "()()()()(())"
Explanation: 
The input string is "(()())(())(()(()))", with primitive decomposition "(()())" + "(())" + "(()(()))".

After removing outer parentheses of each part, this is "()()" + "()" + "()(())" = "()()()()(())".


Example 3:
Input: "()()"
Output: ""
Explanation: 
The input string is "()()", with primitive decomposition "()" + "()".

After removing outer parentheses of each part, this is "" + "" = "".

Note:
`S.length <= 10000`
`S[i]` is `"("` or `")"`
`S` is a valid parentheses string', false, 'Easy', NULL, 79.2, 
   10.9, 'https://leetcode.com/problems/remove-outermost-parentheses', 999, 130.1, 164.3, '["Google"]'::jsonb, '["Stack"]'::jsonb, 
   777, 839, 48, true, '[]'::jsonb, true),
  (1022, 'Sum of Root To Leaf Binary Numbers', 'You are given the `root` of a binary tree where each node has a value `0` or `1`.  Each root-to-leaf path represents a binary number starting with the most significant bit.  For example, if the path is `0 -> 1 -> 1 -> 0 -> 1`, then this could represent `01101` in binary, which is `13`.

For all leaves in the tree, consider the numbers represented by the path from the root to that leaf.

Return the sum of these numbers. The answer is guaranteed to fit in a 32-bits integer.


Example 1:
Input: root = [1,0,1,0,1,0,1]
Output: 22
Explanation: (100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22

Example 2:
Input: root = [0]
Output: 0

Example 3:
Input: root = [1]
Output: 1

Example 4:
Input: root = [1,1]
Output: 3

Constraints:
The number of nodes in the tree is in the range `[1, 1000]`.

`Node.val` is `0` or `1`.', false, 'Easy', '/articles/sum-root-to-leaf-binary-numbers', 71.6, 
   4.2, 'https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers', 839, 91.1, 127.3, '["Amazon"]'::jsonb, '["Tree"]'::jsonb, 
   1131, 90, 93, true, '[]'::jsonb, true),
  (1023, 'Camelcase Matching', 'A query word matches a given `pattern` if we can insert lowercase letters to the pattern word so that it equals the `query`. (We may insert each character at any position, and may insert 0 characters.)
Given a list of `queries`, and a `pattern`, return an `answer` list of booleans, where `answer[i]` is true if and only if `queries[i]` matches the `pattern`.


Example 1:
Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FB"
Output: [true,false,true,true,false]
Explanation: 
"FooBar" can be generated like this "F" + "oo" + "B" + "ar".

"FootBall" can be generated like this "F" + "oot" + "B" + "all".

"FrameBuffer" can be generated like this "F" + "rame" + "B" + "uffer".


Example 2:
Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBa"
Output: [true,false,true,false,false]
Explanation: 
"FooBar" can be generated like this "Fo" + "o" + "Ba" + "r".

"FootBall" can be generated like this "Fo" + "ot" + "Ba" + "ll".


Example 3:
Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBaT"
Output: [false,true,false,false,false]
Explanation: 
"FooBarTest" can be generated like this "Fo" + "o" + "Ba" + "r" + "T" + "est".

Note:
`1 <= queries.length <= 100`
`1 <= queries[i].length <= 100`
`1 <= pattern.length <= 100`
All strings consists only of lower and upper case English letters.', false, 'Medium', NULL, 57.6, 
   4.4, 'https://leetcode.com/problems/camelcase-matching', 362, 22.8, 39.5, '["Amazon,Google"]'::jsonb, '["String,Trie"]'::jsonb, 
   335, 168, 67, true, '[]'::jsonb, true),
  (1024, 'Video Stitching', 'You are given a series of video clips from a sporting event that lasted `T` seconds.  These video clips can be overlapping with each other and have varied lengths.

Each video clip `clips[i]` is an interval: it starts at time `clips[i][0]` and ends at time `clips[i][1]`.  We can cut these clips into segments freely: for example, a clip `[0, 7]` can be cut into segments `[0, 1] + [1, 3] + [3, 7]`.

Return the minimum number of clips needed so that we can cut the clips into segments that cover the entire sporting event (`[0, T]`).  If the task is impossible, return `-1`.


Example 1:
Input: clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], T = 10
Output: 3
Explanation: 
We take the clips [0,2], [8,10], [1,9]; a total of 3 clips.

Then, we can reconstruct the sporting event as follows:
We cut [1,9] into segments [1,2] + [2,8] + [8,9].

Now we have segments [0,2] + [2,8] + [8,10] which cover the sporting event [0, 10].


Example 2:
Input: clips = [[0,1],[1,2]], T = 5
Output: -1
Explanation: 
We can''t cover [0,5] with only [0,1] and [1,2].


Example 3:
Input: clips = [[0,1],[6,8],[0,2],[5,6],[0,4],[0,3],[6,7],[1,3],[4,7],[1,4],[2,5],[2,6],[3,4],[4,5],[5,7],[6,9]], T = 9
Output: 3
Explanation: 
We can take clips [0,4], [4,7], and [6,9].


Example 4:
Input: clips = [[0,4],[2,8]], T = 5
Output: 2
Explanation: 
Notice you can have extra video after the event ends.


Constraints:
`1 <= clips.length <= 100`
`0 <= clips[i][0] <= clips[i][1] <= 100`
`0 <= T <= 100`', false, 'Medium', NULL, 49, 
   11.3, 'https://leetcode.com/problems/video-stitching', 370, 31.6, 64.5, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   706, 35, 95, true, '[]'::jsonb, true),
  (1025, 'Divisor Game', 'Alice and Bob take turns playing a game, with Alice starting first.

Initially, there is a number `n` on the chalkboard. On each player''s turn, that player makes a move consisting of:
Choosing any `x` with `0 < x < n` and `n % x == 0`.

Replacing the number `n` on the chalkboard with `n - x`.

Also, if a player cannot make a move, they lose the game.

Return `true` if and only if Alice wins the game, assuming both players play optimally.


Example 1:
Input: n = 2
Output: true
Explanation: Alice chooses 1, and Bob has no more moves.


Example 2:
Input: n = 3
Output: false
Explanation: Alice chooses 1, Bob chooses 1, and Alice has no more moves.


Constraints:
`1 <= n <= 1000`', false, 'Easy', NULL, 66.1, 
   47.5, 'https://leetcode.com/problems/divisor-game', 729, 99.7, 150.9, '["Adobe,Bloomberg,Amazon"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   742, 2007, 27, true, '[]'::jsonb, true),
  (1026, 'Maximum Difference Between Node and Ancestor', 'Given the `root` of a binary tree, find the maximum value `V` for which there exist different nodes `A` and `B` where `V = |A.val - B.val|` and `A` is an ancestor of `B`.

A node `A` is an ancestor of `B` if either: any child of `A` is equal to `B`, or any child of `A` is an ancestor of `B`.


Example 1:
Input: root = [8,3,10,1,6,null,14,null,null,4,7,13]
Output: 7
Explanation: We have various ancestor-node differences, some of which are given below :
|8 - 3| = 5
|3 - 7| = 4
|8 - 1| = 7
|10 - 13| = 3
Among all possible differences, the maximum value of 7 is obtained by |8 - 1| = 7.


Example 2:
Input: root = [1,null,2,null,0,3]
Output: 3

Constraints:
The number of nodes in the tree is in the range `[2, 5000]`.

`0 <= Node.val <= 105`', false, 'Medium', '/articles/maximum-difference-between-node-and-ancestor', 69.7, 
   18.1, 'https://leetcode.com/problems/maximum-difference-between-node-and-ancestor', 727, 80.5, 115.5, '["Facebook"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   1192, 43, 97, true, '[]'::jsonb, true),
  (1027, 'Longest Arithmetic Subsequence', 'Given an array `A` of integers, return the length of the longest arithmetic subsequence in `A`.

Recall that a subsequence of `A` is a list `A[i_1], A[i_2], ..., A[i_k]` with `0 <= i_1 < i_2 < ... < i_k <= A.length - 1`, and that a sequence `B` is arithmetic if `B[i+1] - B[i]` are all the same value (for `0 <= i < B.length - 1`).


Example 1:
Input: A = [3,6,9,12]
Output: 4
Explanation: 
The whole array is an arithmetic sequence with steps of length = 3.


Example 2:
Input: A = [9,4,7,2,10]
Output: 3
Explanation: 
The longest arithmetic subsequence is [4,7,10].


Example 3:
Input: A = [20,1,15,3,10,5,8]
Output: 4
Explanation: 
The longest arithmetic subsequence is [20,15,10,5].


Constraints:
`2 <= A.length <= 1000`
`0 <= A[i] <= 500`', false, 'Medium', NULL, 49.7, 
   40.2, 'https://leetcode.com/problems/longest-arithmetic-subsequence', 394, 59.7, 120.1, '["eBay,C3 IoT,Google,Facebook,Uber"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1226, 71, 95, true, '[]'::jsonb, true),
  (1028, 'Recover a Tree From Preorder Traversal', 'We run a preorder depth-first search (DFS) on the `root` of a binary tree.

At each node in this traversal, we output `D` dashes (where `D` is the depth of this node), then we output the value of this node.  If the depth of a node is `D`, the depth of its immediate child is `D + 1`.  The depth of the `root` node is `0`.

If a node has only one child, that child is guaranteed to be the left child.

Given the output `S` of this traversal, recover the tree and return its `root`.


Example 1:
Input: S = "1-2--3--4-5--6--7"
Output: [1,2,5,3,4,6,7]

Example 2:
Input: S = "1-2--3---4-5--6---7"
Output: [1,2,5,3,null,6,null,4,null,7]

Example 3:
Input: S = "1-401--349---90--88"
Output: [1,401,null,349,88,90]

Constraints:
The number of nodes in the original tree is in the range `[1, 1000]`.

`1 <= Node.val <= 109`', false, 'Hard', NULL, 71, 
   13.1, 'https://leetcode.com/problems/recover-a-tree-from-preorder-traversal', 402, 25.4, 35.8, '["Amazon,LinkedIn"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   633, 22, 97, true, '[]'::jsonb, true),
  (1029, 'Two City Scheduling', 'A company is planning to interview `2n` people. Given the array `costs` where `costs[i] = [aCosti, bCosti]`, the cost of flying the `ith` person to city `a` is `aCosti`, and the cost of flying the `ith` person to city `b` is `bCosti`.

Return the minimum cost to fly every person to a city such that exactly `n` people arrive in each city.


Example 1:
Input: costs = [[10,20],[30,200],[400,50],[30,20]]
Output: 110
Explanation: 
The first person goes to city A for a cost of 10.

The second person goes to city A for a cost of 30.

The third person goes to city B for a cost of 50.

The fourth person goes to city B for a cost of 20.

The total minimum cost is 10 + 30 + 50 + 20 = 110 to have half the people interviewing in each city.


Example 2:
Input: costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]
Output: 1859

Example 3:
Input: costs = [[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]]
Output: 3086

Constraints:
`2 * n == costs.length`
`2 <= costs.length <= 100`
`costs.length` is even.

`1 <= aCosti, bCosti <= 1000`', false, 'Medium', '/articles/two-city-scheduling', 58.2, 
   50.8, 'https://leetcode.com/problems/two-city-scheduling', 729, 111.3, 191.2, '["Bloomberg"]'::jsonb, '["Greedy"]'::jsonb, 
   1823, 193, 90, false, '[]'::jsonb, true),
  (1030, 'Matrix Cells in Distance Order', 'We are given a matrix with `R` rows and `C` columns has cells with integer coordinates `(r, c)`, where `0 <= r < R` and `0 <= c < C`.

Additionally, we are given a cell in that matrix with coordinates `(r0, c0)`.

Return the coordinates of all cells in the matrix, sorted by their distance from `(r0, c0)` from smallest distance to largest distance.  Here, the distance between two cells `(r1, c1)` and `(r2, c2)` is the Manhattan distance, `|r1 - r2| + |c1 - c2|`.  (You may return the answer in any order that satisfies this condition.)

Example 1:
Input: R = 1, C = 2, r0 = 0, c0 = 0
Output: [[0,0],[0,1]]
Explanation: The distances from (r0, c0) to other cells are: [0,1]

Example 2:
Input: R = 2, C = 2, r0 = 0, c0 = 1
Output: [[0,1],[0,0],[1,1],[1,0]]
Explanation: The distances from (r0, c0) to other cells are: [0,1,1,2]
The answer [[0,1],[1,1],[0,0],[1,0]] would also be accepted as correct.


Example 3:
Input: R = 2, C = 3, r0 = 1, c0 = 2
Output: [[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]]
Explanation: The distances from (r0, c0) to other cells are: [0,1,1,2,2,3]
There are other answers that would also be accepted as correct, such as [[1,2],[1,1],[0,2],[1,0],[0,1],[0,0]].

Note:
`1 <= R <= 100`
`1 <= C <= 100`
`0 <= r0 < R`
`0 <= c0 < C`', false, 'Easy', NULL, 68.2, 
   0.6, 'https://leetcode.com/problems/matrix-cells-in-distance-order', 356, 32.2, 47.2, '["Yahoo"]'::jsonb, '["Sort"]'::jsonb, 
   289, 146, 66, false, '[]'::jsonb, true),
  (1031, 'Maximum Sum of Two Non-Overlapping Subarrays', 'Given an array `A` of non-negative integers, return the maximum sum of elements in two non-overlapping (contiguous) subarrays, which have lengths `L` and `M`.  (For clarification, the `L`-length subarray could occur before or after the `M`-length subarray.)
Formally, return the largest `V` for which `V = (A[i] + A[i+1] + ... + A[i+L-1]) + (A[j] + A[j+1] + ... + A[j+M-1])` and either:
`0 <= i < i + L - 1 < j < j + M - 1 < A.length`, or
`0 <= j < j + M - 1 < i < i + L - 1 < A.length`.


Example 1:
Input: A = [0,6,5,2,2,5,1,9,4], L = 1, M = 2
Output: 20
Explanation: One choice of subarrays is [9] with length 1, and [6,5] with length 2.


Example 2:
Input: A = [3,8,1,3,2,1,8,9,0], L = 3, M = 2
Output: 29
Explanation: One choice of subarrays is [3,8,1] with length 3, and [8,9] with length 2.


Example 3:
Input: A = [2,1,5,6,0,9,5,0,3,8], L = 4, M = 3
Output: 31
Explanation: One choice of subarrays is [5,6,0,9] with length 4, and [3,8] with length 3.

Note:
`L >= 1`
`M >= 1`
`L + M <= A.length <= 1000`
`0 <= A[i] <= 1000`', false, 'Medium', NULL, 59, 
   34.2, 'https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays', 227, 35.5, 60.1, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   1002, 51, 95, true, '[]'::jsonb, true),
  (1032, 'Stream of Characters', 'Implement the `StreamChecker` class as follows:
`StreamChecker(words)`: Constructor, init the data structure with the given words.

`query(letter)`: returns true if and only if for some `k >= 1`, the last `k` characters queried (in order from oldest to newest, including this letter just queried) spell one of the words in the given list.


Example:
StreamChecker streamChecker = new StreamChecker(["cd","f","kl"]); // init the dictionary.

streamChecker.query(''a'');          // return false
streamChecker.query(''b'');          // return false
streamChecker.query(''c'');          // return false
streamChecker.query(''d'');          // return true, because ''cd'' is in the wordlist
streamChecker.query(''e'');          // return false
streamChecker.query(''f'');          // return true, because ''f'' is in the wordlist
streamChecker.query(''g'');          // return false
streamChecker.query(''h'');          // return false
streamChecker.query(''i'');          // return false
streamChecker.query(''j'');          // return false
streamChecker.query(''k'');          // return false
streamChecker.query(''l'');          // return true, because ''kl'' is in the wordlist
Note:
`1 <= words.length <= 2000`
`1 <= words[i].length <= 2000`
Words will only consist of lowercase English letters.

Queries will only consist of lowercase English letters.

The number of queries is at most 40000.', false, 'Hard', '/articles/stream-of-characters', 48.6, 
   16.3, 'https://leetcode.com/problems/stream-of-characters', 381, 46, 94.6, '["Facebook"]'::jsonb, '["Trie"]'::jsonb, 
   782, 115, 87, true, '[]'::jsonb, true),
  (1033, 'Moving Stones Until Consecutive', 'Three stones are on a number line at positions `a`, `b`, and `c`.

Each turn, you pick up a stone at an endpoint (ie., either the lowest or highest position stone), and move it to an unoccupied position between those endpoints.  Formally, let''s say the stones are currently at positions `x, y, z` with `x < y < z`.  You pick up the stone at either position `x` or position `z`, and move that stone to an integer position `k`, with `x < k < z` and `k != y`.

The game ends when you cannot make any more moves, ie. the stones are in consecutive positions.

When the game ends, what is the minimum and maximum number of moves that you could have made?  Return the answer as an length 2 array: `answer = [minimum_moves, maximum_moves]`

Example 1:
Input: a = 1, b = 2, c = 5
Output: [1,2]
Explanation: Move the stone from 5 to 3, or move the stone from 5 to 4 to 3.


Example 2:
Input: a = 4, b = 3, c = 2
Output: [0,0]
Explanation: We cannot make any moves.


Example 3:
Input: a = 3, b = 5, c = 1
Output: [1,2]
Explanation: Move the stone from 1 to 4; or move the stone from 1 to 2 to 4.

Note:
`1 <= a <= 100`
`1 <= b <= 100`
`1 <= c <= 100`
`a != b, b != c, c != a`', false, 'Easy', NULL, 43.3, 
   0, 'https://leetcode.com/problems/moving-stones-until-consecutive', 204, 16.3, 37.6, '["Facebook"]'::jsonb, '["Brainteaser"]'::jsonb, 
   102, 511, 17, true, '[]'::jsonb, true),
  (1034, 'Coloring A Border', 'Given a 2-dimensional `grid` of integers, each value in the grid represents the color of the grid square at that location.

Two squares belong to the same connected component if and only if they have the same color and are next to each other in any of the 4 directions.

The border of a connected component is all the squares in the connected component that are either 4-directionally adjacent to a square not in the component, or on the boundary of the grid (the first or last row or column).

Given a square at location `(r0, c0)` in the grid and a `color`, color the border of the connected component of that square with the given `color`, and return the final `grid`.


Example 1:
Input: grid = [[1,1],[1,2]], r0 = 0, c0 = 0, color = 3
Output: [[3, 3], [3, 2]]

Example 2:
Input: grid = [[1,2,2],[2,3,2]], r0 = 0, c0 = 1, color = 3
Output: [[1, 3, 3], [2, 3, 3]]

Example 3:
Input: grid = [[1,1,1],[1,1,1],[1,1,1]], r0 = 1, c0 = 1, color = 2
Output: [[2, 2, 2], [2, 1, 2], [2, 2, 2]]
Note:
`1 <= grid.length <= 50`
`1 <= grid[0].length <= 50`
`1 <= grid[i][j] <= 1000`
`0 <= r0 < grid.length`
`0 <= c0 < grid[0].length`
`1 <= color <= 1000`', false, 'Medium', NULL, 45.8, 
   0, 'https://leetcode.com/problems/coloring-a-border', 183, 13.4, 29.3, '["Amazon,Booking,Booking.com"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   188, 347, 35, true, '[]'::jsonb, true),
  (1035, 'Uncrossed Lines', 'We write the integers of `A` and `B` (in the order they are given) on two separate horizontal lines.

Now, we may draw connecting lines: a straight line connecting two numbers `A[i]` and `B[j]` such that:
`A[i] == B[j]`;
The line we draw does not intersect any other connecting (non-horizontal) line.

Note that a connecting lines cannot intersect even at the endpoints: each number can only belong to one connecting line.

Return the maximum number of connecting lines we can draw in this way.


Example 1:
Input: A = [1,4,2], B = [1,2,4]
Output: 2
Explanation: We can draw 2 uncrossed lines as in the diagram.

We cannot draw 3 uncrossed lines, because the line from A[1]=4 to B[2]=4 will intersect the line from A[2]=2 to B[1]=2.


Example 2:
Input: A = [2,5,1,2,5], B = [10,5,2,1,5,2]
Output: 3

Example 3:
Input: A = [1,3,7,1,7,5], B = [1,9,2,5,1]
Output: 2
Note:
`1 <= A.length <= 500`
`1 <= B.length <= 500`
`1 <= A[i], B[i] <= 2000`', false, 'Medium', NULL, 56.2, 
   4.7, 'https://leetcode.com/problems/uncrossed-lines', 389, 52.7, 93.8, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   1110, 23, 98, true, '[]'::jsonb, true),
  (1036, 'Escape a Large Maze', 'There is a 1 million by 1 million grid on an XY-plane, and the coordinates of each grid square are `(x, y)`.

We start at the `source = [sx, sy]` square and want to reach the `target = [tx, ty]` square. There is also an array of `blocked` squares, where each `blocked[i] = [xi, yi]` represents a blocked square with coordinates `(xi, yi)`.

Each move, we can walk one square north, east, south, or west if the square is not in the array of `blocked` squares. We are also not allowed to walk outside of the grid.

Return `true` if and only if it is possible to reach the `target` square from the `source` square through a sequence of valid moves.


Example 1:
Input: blocked = [[0,1],[1,0]], source = [0,0], target = [0,2]
Output: false
Explanation: The target square is inaccessible starting from the source square because we cannot move.

We cannot move north or east because those squares are blocked.

We cannot move south or west because we cannot go outside of the grid.


Example 2:
Input: blocked = [], source = [0,0], target = [999999,999999]
Output: true
Explanation: Because there are no blocked cells, it is possible to reach the target square.


Constraints:
`0 <= blocked.length <= 200`
`blocked[i].length == 2`
`0 <= xi, yi < 106`
`source.length == target.length == 2`
`0 <= sx, sy, tx, ty < 106`
`source != target`
It is guaranteed that `source` and `target` are not blocked.', false, 'Hard', NULL, 34.3, 
   21.9, 'https://leetcode.com/problems/escape-a-large-maze', 89, 12, 35.1, '["Uber,Google,Facebook,UiPath"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   291, 117, 71, true, '[]'::jsonb, true),
  (1037, 'Valid Boomerang', 'Given an array `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane, return `true` if these points are a boomerang.

A boomerang is a set of three points that are all distinct and not in a straight line.


Example 1:
Input: points = [[1,1],[2,3],[3,2]]
Output: true

Example 2:
Input: points = [[1,1],[2,2],[3,3]]
Output: false

Constraints:
`points.length == 3`
`points[i].length == 2`
`0 <= xi, yi <= 100`', false, 'Easy', NULL, 37.7, 
   0, 'https://leetcode.com/problems/valid-boomerang', 304, 23.5, 62.4, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   152, 284, 35, true, '[]'::jsonb, true),
  (1038, 'Binary Search Tree to Greater Sum Tree', 'Given the `root` of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus sum of all keys greater than the original key in BST.

As a reminder, a binary search tree is a tree that satisfies these constraints:
The left subtree of a node contains only nodes with keys less than the node''s key.

The right subtree of a node contains only nodes with keys greater than the node''s key.

Both the left and right subtrees must also be binary search trees.

Note: This question is the same as 538: https://leetcode.com/problems/convert-bst-to-greater-tree/

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
The number of nodes in the tree is in the range `[1, 100]`.

`0 <= Node.val <= 100`
All the values in the tree are unique.

`root` is guaranteed to be a valid binary search tree.', false, 'Medium', NULL, 82.5, 
   15.6, 'https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree', 999, 77.3, 93.6, '["Facebook"]'::jsonb, '["Tree,Depth-first Search,Binary Search Tree,Recursion"]'::jsonb, 
   1411, 115, 92, true, '[]'::jsonb, true),
  (1039, 'Minimum Score Triangulation of Polygon', 'You have a convex `n`-sided polygon where each vertex has an integer value. You are given an integer array `values` where `values[i]` is the value of the `ith` vertex (i.e., clockwise order).

You will triangulate the polygon into `n - 2` triangles. For each triangle, the value of that triangle is the product of the values of its vertices, and the total score of the triangulation is the sum of these values over all `n - 2` triangles in the triangulation.

Return the smallest possible total score that you can achieve with some triangulation of the polygon.


Example 1:
Input: values = [1,2,3]
Output: 6
Explanation: The polygon is already triangulated, and the score of the only triangle is 6.


Example 2:
Input: values = [3,7,4,5]
Output: 144
Explanation: There are two triangulations, with possible scores: 3*7*5 + 4*5*7 = 245, or 3*4*5 + 3*4*7 = 144.

The minimum score is 144.


Example 3:
Input: values = [1,3,1,4,1,5]
Output: 13
Explanation: The minimum score triangulation has score 1*1*3 + 1*1*4 + 1*1*5 + 1*1*1 = 13.


Constraints:
`n == values.length`
`3 <= n <= 50`
`1 <= values[i] <= 100`', false, 'Medium', NULL, 50.3, 
   0, 'https://leetcode.com/problems/minimum-score-triangulation-of-polygon', 124, 14.8, 29.4, '["Uber"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   639, 84, 88, false, '[]'::jsonb, true),
  (1040, 'Moving Stones Until Consecutive II', 'On an infinite number line, the position of the i-th stone is given by `stones[i]`.  Call a stone an endpoint stone if it has the smallest or largest position.

Each turn, you pick up an endpoint stone and move it to an unoccupied position so that it is no longer an endpoint stone.

In particular, if the stones are at say, `stones = [1,2,5]`, you cannot move the endpoint stone at position 5, since moving it to any position (such as 0, or 3) will still keep that stone as an endpoint stone.

The game ends when you cannot make any more moves, ie. the stones are in consecutive positions.

When the game ends, what is the minimum and maximum number of moves that you could have made?  Return the answer as an length 2 array: `answer = [minimum_moves, maximum_moves]`

Example 1:
Input: [7,4,9]
Output: [1,2]
Explanation: 
We can move 4 -> 8 for one move to finish the game.

Or, we can move 9 -> 5, 4 -> 6 for two moves to finish the game.


Example 2:
Input: [6,5,4,3,10]
Output: [2,3]
We can move 3 -> 8 then 10 -> 7 to finish the game.

Or, we can move 3 -> 7, 4 -> 8, 5 -> 9 to finish the game.

Notice we cannot move 10 -> 2 to finish the game, because that would be an illegal move.


Example 3:
Input: [100,101,104,102,103]
Output: [0,0]
Note:
`3 <= stones.length <= 10^4`
`1 <= stones[i] <= 10^9`
`stones[i]` have distinct values.', false, 'Medium', NULL, 54.2, 
   0, 'https://leetcode.com/problems/moving-stones-until-consecutive-ii', 37, 6.4, 11.8, '["Facebook"]'::jsonb, '["Array,Sliding Window"]'::jsonb, 
   227, 404, 36, true, '[]'::jsonb, true),
  (1041, 'Robot Bounded In Circle', 'On an infinite plane, a robot initially stands at `(0, 0)` and faces north. The robot can receive one of three instructions:
`"G"`: go straight 1 unit;
`"L"`: turn 90 degrees to the left;
`"R"`: turn 90 degrees to the right.

The robot performs the `instructions` given in order, and repeats them forever.

Return `true` if and only if there exists a circle in the plane such that the robot never leaves the circle.


Example 1:
Input: instructions = "GGLLGG"
Output: true
Explanation: The robot moves from (0,0) to (0,2), turns 180 degrees, and then returns to (0,0).

When repeating these instructions, the robot remains in the circle of radius 2 centered at the origin.


Example 2:
Input: instructions = "GG"
Output: false
Explanation: The robot moves north indefinitely.


Example 3:
Input: instructions = "GL"
Output: true
Explanation: The robot moves from (0, 0) -> (0, 1) -> (-1, 1) -> (-1, 0) -> (0, 0) -> ...


Constraints:
`1 <= instructions.length <= 100`
`instructions[i]` is `''G''`, `''L''` or, `''R''`.', false, 'Medium', '/articles/robot-bounded-in-circle', 55.1, 
   98.5, 'https://leetcode.com/problems/robot-bounded-in-circle', 530, 69.4, 125.9, '["Amazon,Goldman Sachs,Google,Expedia"]'::jsonb, '["Math"]'::jsonb, 
   1027, 305, 77, true, '[]'::jsonb, true),
  (1042, 'Flower Planting With No Adjacent', 'You have `n` gardens, labeled from `1` to `n`, and an array `paths` where `paths[i] = [xi, yi]` describes a bidirectional path between garden `xi` to garden `yi`. In each garden, you want to plant one of 4 types of flowers.

All gardens have at most 3 paths coming into or leaving it.

Your task is to choose a flower type for each garden such that, for any two gardens connected by a path, they have different types of flowers.

Return any such a choice as an array `answer`, where `answer[i]` is the type of flower planted in the `(i+1)th` garden. The flower types are denoted `1`, `2`, `3`, or `4`. It is guaranteed an answer exists.


Example 1:
Input: n = 3, paths = [[1,2],[2,3],[3,1]]
Output: [1,2,3]
Explanation:
Gardens 1 and 2 have different types.

Gardens 2 and 3 have different types.

Gardens 3 and 1 have different types.

Hence, [1,2,3] is a valid answer. Other valid answers include [1,2,4], [1,4,2], and [3,2,1].


Example 2:
Input: n = 4, paths = [[1,2],[3,4]]
Output: [1,2,1,2]

Example 3:
Input: n = 4, paths = [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]]
Output: [1,2,3,4]

Constraints:
`1 <= n <= 104`
`0 <= paths.length <= 2 * 104`
`paths[i].length == 2`
`1 <= xi, yi <= n`
`xi != yi`
Every garden has at most 3 paths coming into or leaving it.', false, 'Medium', NULL, 48.8, 
   9.7, 'https://leetcode.com/problems/flower-planting-with-no-adjacent', 290, 40.4, 82.8, '["LinkedIn"]'::jsonb, '["Graph"]'::jsonb, 
   536, 550, 49, false, '[]'::jsonb, true),
  (1043, 'Partition Array for Maximum Sum', 'Given an integer array `arr`, you should partition the array into (contiguous) subarrays of length at most `k`. After partitioning, each subarray has their values changed to become the maximum value of that subarray.

Return the largest sum of the given array after partitioning.


Example 1:
Input: arr = [1,15,7,9,2,5,10], k = 3
Output: 84
Explanation: arr becomes [15,15,15,9,10,10,10]

Example 2:
Input: arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
Output: 83

Example 3:
Input: arr = [1], k = 1
Output: 1

Constraints:
`1 <= arr.length <= 500`
`0 <= arr[i] <= 109`
`1 <= k <= arr.length`', false, 'Medium', NULL, 67.4, 
   26.3, 'https://leetcode.com/problems/partition-array-for-maximum-sum', 232, 29.4, 43.6, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1150, 138, 89, true, '[]'::jsonb, true),
  (1044, 'Longest Duplicate Substring', 'Given a string `s`, consider all duplicated substrings: (contiguous) substrings of s that occur 2 or more times. The occurrences may overlap.

Return any duplicated substring that has the longest possible length. If `s` does not have a duplicated substring, the answer is `""`.


Example 1:
Input: s = "banana"
Output: "ana"

Example 2:
Input: s = "abcd"
Output: ""

Constraints:
`2 <= s.length <= 3 * 104`
`s` consists of lowercase English letters.', false, 'Hard', '/articles/longest-duplicate-substring', 31.4, 
   13.5, 'https://leetcode.com/problems/longest-duplicate-substring', 191, 33.8, 107.7, '["Amazon"]'::jsonb, '["Hash Table,Binary Search,Suffix Array"]'::jsonb, 
   802, 248, 76, true, '[]'::jsonb, true),
  (1045, 'Customers Who Bought All Products', 'SQL Schema', true, 'Medium', NULL, 68.4, 
   1.1, 'https://leetcode.com/problems/customers-who-bought-all-products', 222, 20.7, 30.3, '["Amazon"]'::jsonb, '[]'::jsonb, 
   113, 24, 82, true, '[]'::jsonb, true),
  (1046, 'Last Stone Weight', 'We have a collection of stones, each stone has a positive integer weight.

Each turn, we choose the two heaviest stones and smash them together.  Suppose the stones have weights `x` and `y` with `x <= y`.  The result of this smash is:
If `x == y`, both stones are totally destroyed;
If `x != y`, the stone of weight `x` is totally destroyed, and the stone of weight `y` has new weight `y-x`.

At the end, there is at most 1 stone left.  Return the weight of this stone (or 0 if there are no stones left.)

Example 1:
Input: [2,7,4,1,8,1]
Output: 1
Explanation: 
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that''s the value of last stone.

Note:
`1 <= stones.length <= 30`
`1 <= stones[i] <= 1000`', false, 'Easy', '/articles/last-stone-weight', 62.4, 
   15.2, 'https://leetcode.com/problems/last-stone-weight', 999, 166.4, 266.4, '["Amazon"]'::jsonb, '["Heap,Greedy"]'::jsonb, 
   1292, 35, 97, true, '[]'::jsonb, true),
  (1047, 'Remove All Adjacent Duplicates In String', 'Given a string `S` of lowercase letters, a duplicate removal consists of choosing two adjacent and equal letters, and removing them.

We repeatedly make duplicate removals on S until we no longer can.

Return the final string after all such duplicate removals have been made.  It is guaranteed the answer is unique.


Example 1:
Input: "abbaca"
Output: "ca"
Explanation: 
For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".

Note:
`1 <= S.length <= 20000`
`S` consists only of English lowercase letters.', false, 'Easy', '/articles/remove-all-adjacent-duplicates-in-string', 71.2, 
   44, 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string', 942, 137.5, 193.1, '["Facebook,Amazon,Oracle,Bloomberg,Microsoft"]'::jsonb, '["Stack"]'::jsonb, 
   1466, 95, 94, true, '[]'::jsonb, true),
  (1048, 'Longest String Chain', 'Given a list of words, each word consists of English lowercase letters.

Let''s say `word1` is a predecessor of `word2` if and only if we can add exactly one letter anywhere in `word1` to make it equal to `word2`.  For example, `"abc"` is a predecessor of `"abac"`.

A word chain is a sequence of words `[word_1, word_2, ..., word_k]` with `k >= 1`, where `word_1` is a predecessor of `word_2`, `word_2` is a predecessor of `word_3`, and so on.

Return the longest possible length of a word chain with words chosen from the given list of `words`.


Example 1:
Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chain is "a","ba","bda","bdca".


Example 2:
Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5

Constraints:
`1 <= words.length <= 1000`
`1 <= words[i].length <= 16`
`words[i]` only consists of English lowercase letters.', false, 'Medium', NULL, 55.6, 
   59.2, 'https://leetcode.com/problems/longest-string-chain', 655, 97, 174.4, '["Two Sigma,Google"]'::jsonb, '["Hash Table,Dynamic Programming"]'::jsonb, 
   1572, 101, 94, true, '[]'::jsonb, true),
  (1049, 'Last Stone Weight II', 'You are given an array of integers `stones` where `stones[i]` is the weight of the `ith` stone.

We are playing a game with the stones. On each turn, we choose any two stones and smash them together. Suppose the stones have weights `x` and `y` with `x <= y`. The result of this smash is:
If `x == y`, both stones are destroyed, and
If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.

At the end of the game, there is at most one stone left.

Return the smallest possible weight of the left stone. If there are no stones left, return `0`.


Example 1:
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation:
We can combine 2 and 4 to get 2, so the array converts to [2,7,1,8,1] then,
we can combine 7 and 8 to get 1, so the array converts to [2,1,1,1] then,
we can combine 2 and 1 to get 1, so the array converts to [1,1,1] then,
we can combine 1 and 1 to get 0, so the array converts to [1], then that''s the optimal value.


Example 2:
Input: stones = [31,26,33,21,40]
Output: 5

Example 3:
Input: stones = [1,2]
Output: 1

Constraints:
`1 <= stones.length <= 30`
`1 <= stones[i] <= 100`', false, 'Medium', NULL, 45.9, 
   26, 'https://leetcode.com/problems/last-stone-weight-ii', 247, 30.5, 66.5, '["ByteDance,Goldman Sachs"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1168, 47, 96, false, '[]'::jsonb, true),
  (1050, 'Actors and Directors Who Cooperated At Least Three Times', 'SQL Schema', true, 'Easy', NULL, 72.5, 
   2, 'https://leetcode.com/problems/actors-and-directors-who-cooperated-at-least-three-times', 115, 25, 34.5, '["Amazon"]'::jsonb, '[]'::jsonb, 
   76, 18, 81, true, '[]'::jsonb, true),
  (1051, 'Height Checker', 'A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in non-decreasing order by height. Let this ordering be represented by the integer array `expected` where `expected[i]` is the expected height of the `ith` student in line.

You are given an integer array `heights` representing the current order that the students are standing in. Each `heights[i]` is the height of the `ith` student in line (0-indexed).

Return the number of indices where `heights[i] != expected[i]`.


Example 1:
Input: heights = [1,1,4,2,1,3]
Output: 3
Explanation: 
heights:  [1,1,4,2,1,3]
expected: [1,1,1,2,3,4]
Indices 2, 4, and 5 do not match.


Example 2:
Input: heights = [5,1,2,3,4]
Output: 5
Explanation:
heights:  [5,1,2,3,4]
expected: [1,2,3,4,5]
All indices do not match.


Example 3:
Input: heights = [1,2,3,4,5]
Output: 0
Explanation:
heights:  [1,2,3,4,5]
expected: [1,2,3,4,5]
All indices match.


Constraints:
`1 <= heights.length <= 100`
`1 <= heights[i] <= 100`', false, 'Easy', NULL, 72.1, 
   14.7, 'https://leetcode.com/problems/height-checker', 840, 117.1, 162.3, '["Goldman Sachs"]'::jsonb, '["Array"]'::jsonb, 
   6, 2, 75, false, '[]'::jsonb, true),
  (1052, 'Grumpy Bookstore Owner', 'Today, the bookstore owner has a store open for `customers.length` minutes.  Every minute, some number of customers (`customers[i]`) enter the store, and all those customers leave after the end of that minute.

On some minutes, the bookstore owner is grumpy.  If the bookstore owner is grumpy on the i-th minute, `grumpy[i] = 1`, otherwise `grumpy[i] = 0`.  When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise they are satisfied.

The bookstore owner knows a secret technique to keep themselves not grumpy for `X` minutes straight, but can only use it once.

Return the maximum number of customers that can be satisfied throughout the day.


Example 1:
Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
Output: 16
Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes. 
The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.

Note:
`1 <= X <= customers.length == grumpy.length <= 20000`
`0 <= customers[i] <= 1000`
`0 <= grumpy[i] <= 1`', false, 'Medium', NULL, 55.9, 
   15, 'https://leetcode.com/problems/grumpy-bookstore-owner', 471, 38, 68.1, '["Uber"]'::jsonb, '["Array,Sliding Window"]'::jsonb, 
   716, 70, 91, false, '[]'::jsonb, true),
  (1053, 'Previous Permutation With One Swap', 'Given an array of positive integers `arr` (not necessarily distinct), return the lexicographically largest permutation that is smaller than `arr`, that can be made with exactly one swap (A swap exchanges the positions of two numbers `arr[i]` and `arr[j]`). If it cannot be done, then return the same array.


Example 1:
Input: arr = [3,2,1]
Output: [3,1,2]
Explanation: Swapping 2 and 1.


Example 2:
Input: arr = [1,1,5]
Output: [1,1,5]
Explanation: This is already the smallest permutation.


Example 3:
Input: arr = [1,9,4,6,7]
Output: [1,7,4,6,9]
Explanation: Swapping 9 and 7.


Example 4:
Input: arr = [3,1,1,3]
Output: [1,3,1,3]
Explanation: Swapping 1 and 3.


Constraints:
`1 <= arr.length <= 104`
`1 <= arr[i] <= 104`', false, 'Medium', NULL, 51.2, 
   13.3, 'https://leetcode.com/problems/previous-permutation-with-one-swap', 264, 20.2, 39.4, '["Facebook"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   256, 291, 47, true, '[]'::jsonb, true),
  (1054, 'Distant Barcodes', 'In a warehouse, there is a row of barcodes, where the `ith` barcode is `barcodes[i]`.

Rearrange the barcodes so that no two adjacent barcodes are equal. You may return any answer, and it is guaranteed an answer exists.


Example 1:
Input: barcodes = [1,1,1,2,2,2]
Output: [2,1,2,1,2,1]

Example 2:
Input: barcodes = [1,1,1,1,2,2,3,3]
Output: [1,3,1,3,1,2,1,2]

Constraints:
`1 <= barcodes.length <= 10000`
`1 <= barcodes[i] <= 10000`', false, 'Medium', NULL, 44.3, 
   4.6, 'https://leetcode.com/problems/distant-barcodes', 271, 22.2, 50.1, '["Bloomberg"]'::jsonb, '["Heap,Sort"]'::jsonb, 
   560, 24, 96, false, '[]'::jsonb, true),
  (1055, 'Shortest Way to Form String', 'From any string, we can form a subsequence of that string by deleting some number of characters (possibly no deletions).

Given two strings `source` and `target`, return the minimum number of subsequences of `source` such that their concatenation equals `target`. If the task is impossible, return `-1`.


Example 1:
Input: source = "abc", target = "abcbc"
Output: 2
Explanation: The target "abcbc" can be formed by "abc" and "bc", which are subsequences of source "abc".


Example 2:
Input: source = "abc", target = "acdbc"
Output: -1
Explanation: The target string cannot be constructed from the subsequences of source string due to the character "d" in target string.


Example 3:
Input: source = "xyz", target = "xzyxz"
Output: 3
Explanation: The target string can be constructed as follows "xz" + "y" + "xz".


Constraints:
Both the `source` and `target` strings consist of only lowercase English letters from "a"-"z".

The lengths of `source` and `target` string are between `1` and `1000`.', true, 'Medium', NULL, 57.3, 
   0, 'https://leetcode.com/problems/shortest-way-to-form-string', 280, 42.9, 74.9, '["Facebook"]'::jsonb, '["Dynamic Programming,Greedy"]'::jsonb, 
   602, 40, 94, true, '[]'::jsonb, true),
  (1056, 'Confusing Number', 'Given a number `N`, return `true` if and only if it is a confusing number, which satisfies the following condition:
We can rotate digits by 180 degrees to form new digits. When 0, 1, 6, 8, 9 are rotated 180 degrees, they become 0, 1, 9, 8, 6 respectively. When 2, 3, 4, 5 and 7 are rotated 180 degrees, they become invalid. A confusing number is a number that when rotated 180 degrees becomes a different number with each digit valid.


Example 1:
Input: 6
Output: true
Explanation: 
We get `9` after rotating `6`, `9` is a valid number and `9!=6`.


Example 2:
Input: 89
Output: true
Explanation: 
We get `68` after rotating `89`, `86` is a valid number and `86!=89`.


Example 3:
Input: 11
Output: false
Explanation: 
We get `11` after rotating `11`, `11` is a valid number but the value remains the same, thus `11` is not a confusing number.


Example 4:
Input: 25
Output: false
Explanation: 
We get an invalid number after rotating `25`.

Note:
`0 <= N <= 10^9`
After the rotation we can ignore leading zeros, for example if after rotation we have `0008` then this number is considered as just `8`.', true, 'Easy', NULL, 47, 
   0, 'https://leetcode.com/problems/confusing-number', 200, 18.1, 38.5, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   109, 80, 58, true, '[]'::jsonb, true),
  (1057, 'Campus Bikes', 'On a campus represented as a 2D grid, there are `N` workers and `M` bikes, with `N <= M`. Each worker and bike is a 2D coordinate on this grid.

Our goal is to assign a bike to each worker. Among the available bikes and workers, we choose the (worker, bike) pair with the shortest Manhattan distance between each other, and assign the bike to that worker. (If there are multiple (worker, bike) pairs with the same shortest Manhattan distance, we choose the pair with the smallest worker index; if there are multiple ways to do that, we choose the pair with the smallest bike index). We repeat this process until there are no available workers.

The Manhattan distance between two points `p1` and `p2` is `Manhattan(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|`.

Return a vector `ans` of length `N`, where `ans[i]` is the index (0-indexed) of the bike that the `i`-th worker is assigned to.


Example 1:
Input: workers = [[0,0],[2,1]], bikes = [[1,2],[3,3]]
Output: [1,0]
Explanation: 
Worker 1 grabs Bike 0 as they are closest (without ties), and Worker 0 is assigned Bike 1. So the output is [1, 0].


Example 2:
Input: workers = [[0,0],[1,1],[2,0]], bikes = [[1,0],[2,2],[2,1]]
Output: [0,2,1]
Explanation: 
Worker 0 grabs Bike 0 at first. Worker 1 and Worker 2 share the same distance to Bike 2, thus Worker 1 is assigned to Bike 2, and Worker 2 will take Bike 1. So the output is [0,2,1].

Note:
`0 <= workers[i][j], bikes[i][j] < 1000`
All worker and bike locations are distinct.

`1 <= workers.length <= bikes.length <= 1000`', true, 'Medium', NULL, 57.9, 
   33.8, 'https://leetcode.com/problems/campus-bikes', 227, 47.4, 81.8, '["Google,Amazon,ByteDance"]'::jsonb, '["Greedy,Sort"]'::jsonb, 
   673, 121, 85, true, '[]'::jsonb, true),
  (1058, 'Minimize Rounding Error to Meet Target', 'Given an array of `prices` `[p1,p2...,pn]` and a `target`, round each price `pi` to `Roundi(pi)` so that the rounded array `[Round1(p1),Round2(p2)...,Roundn(pn)]` sums to the given `target`. Each operation `Roundi(pi)` could be either `Floor(pi)` or `Ceil(pi)`.

Return the string `"-1"` if the rounded array is impossible to sum to `target`. Otherwise, return the smallest rounding error, which is defined as `Σ |Roundi(pi) - (pi)|` for `i` from `1` to `n`, as a string with three places after the decimal.


Example 1:
Input: prices = ["0.700","2.800","4.900"], target = 8
Output: "1.000"
Explanation:
Use Floor, Ceil and Ceil operations to get (0.7 - 0) + (3 - 2.8) + (5 - 4.9) = 0.7 + 0.2 + 0.1 = 1.0 .


Example 2:
Input: prices = ["1.500","2.500","3.500"], target = 10
Output: "-1"
Explanation: It is impossible to meet the target.


Example 3:
Input: prices = ["1.500","2.500","3.500"], target = 9
Output: "1.500"

Constraints:
`1 <= prices.length <= 500`
Each string `prices[i]` represents a real number in the range `[0.0, 1000.0]` and has exactly 3 decimal places.

`0 <= target <= 106`', true, 'Medium', NULL, 43.7, 
   10.8, 'https://leetcode.com/problems/minimize-rounding-error-to-meet-target', 55, 5.4, 12.3, '["Microsoft"]'::jsonb, '["Math,Dynamic Programming,Greedy"]'::jsonb, 
   103, 95, 52, false, '[]'::jsonb, true),
  (1059, 'All Paths from Source Lead to Destination', 'Given the `edges` of a directed graph where `edges[i] = [ai, bi]` indicates there is an edge between nodes `ai` and `bi`, and two nodes `source` and `destination` of this graph, determine whether or not all paths starting from `source` eventually, end at `destination`, that is:
At least one path exists from the `source` node to the `destination` node
If a path exists from the `source` node to a node with no outgoing edges, then that node is equal to `destination`.

The number of possible paths from `source` to `destination` is a finite number.

Return `true` if and only if all roads from `source` lead to `destination`.


Example 1:
Input: n = 3, edges = [[0,1],[0,2]], source = 0, destination = 2
Output: false
Explanation: It is possible to reach and get stuck on both node 1 and node 2.


Example 2:
Input: n = 4, edges = [[0,1],[0,3],[1,2],[2,1]], source = 0, destination = 3
Output: false
Explanation: We have two possibilities: to end at node 3, or to loop over node 1 and node 2 indefinitely.


Example 3:
Input: n = 4, edges = [[0,1],[0,2],[1,3],[2,3]], source = 0, destination = 3
Output: true

Example 4:
Input: n = 3, edges = [[0,1],[1,1],[1,2]], source = 0, destination = 2
Output: false
Explanation: All paths from the source node end at the destination node, but there are an infinite number of paths, such as 0-1-2, 0-1-1-2, 0-1-1-1-2, 0-1-1-1-1-2, and so on.


Example 5:
Input: n = 2, edges = [[0,1],[1,1]], source = 0, destination = 1
Output: false
Explanation: There is infinite self-loop at destination node.


Constraints:
`1 <= n <= 104`
`0 <= edges.length <= 104`
`edges.length == 2`
`0 <= ai, bi <= n - 1`
`0 <= source <= n - 1`
`0 <= destination <= n - 1`
The given graph may have self-loops and parallel edges.', true, 'Medium', '/articles/all-paths-from-source-lead-to-destination', 43, 
   3.6, 'https://leetcode.com/problems/all-paths-from-source-lead-to-destination', 136, 14.2, 33.1, '["Bloomberg"]'::jsonb, '["Depth-first Search,Graph"]'::jsonb, 
   235, 39, 86, false, '[]'::jsonb, true),
  (1060, 'Missing Element in Sorted Array', 'Given an integer array `nums` which is sorted in ascending order and all of its elements are unique and given also an integer `k`, return the `kth` missing number starting from the leftmost number of the array.


Example 1:
Input: nums = [4,7,9,10], k = 1
Output: 5
Explanation: The first missing number is 5.


Example 2:
Input: nums = [4,7,9,10], k = 3
Output: 8
Explanation: The missing numbers are [5,6,8,...], hence the third missing number is 8.


Example 3:
Input: nums = [1,2,4], k = 3
Output: 6
Explanation: The missing numbers are [3,5,6,7,...], hence the third missing number is 6.


Constraints:
`1 <= nums.length <= 5 * 104`
`1 <= nums[i] <= 107`
`nums` is sorted in ascending order, and all the elements are unique.

`1 <= k <= 108`
Follow up: Can you find a logarithmic time complexity (i.e., `O(log(n))`) solution?', true, 'Medium', '/articles/missing-element-in-sorted-array', 54.8, 
   27.9, 'https://leetcode.com/problems/missing-element-in-sorted-array', 304, 62, 113, '["Facebook,Bloomberg"]'::jsonb, '["Binary Search"]'::jsonb, 
   901, 39, 96, true, '[]'::jsonb, true),
  (1061, 'Lexicographically Smallest Equivalent String', 'Given strings `A` and `B` of the same length, we say A[i] and B[i] are equivalent characters. For example, if `A = "abc"` and `B = "cde"`, then we have `''a'' == ''c'', ''b'' == ''d'', ''c'' == ''e''`.

Equivalent characters follow the usual rules of any equivalence relation:
Reflexivity: ''a'' == ''a''
Symmetry: ''a'' == ''b'' implies ''b'' == ''a''
Transitivity: ''a'' == ''b'' and ''b'' == ''c'' implies ''a'' == ''c''
For example, given the equivalency information from `A` and `B` above, `S = "eed"`, `"acd"`, and `"aab"` are equivalent strings, and `"aab"` is the lexicographically smallest equivalent string of `S`.

Return the lexicographically smallest equivalent string of `S` by using the equivalency information from `A` and `B`.


Example 1:
Input: A = "parker", B = "morris", S = "parser"
Output: "makkek"
Explanation: Based on the equivalency information in `A` and `B`, we can group their characters as `[m,p]`, `[a,o]`, `[k,r,s]`, `[e,i]`. The characters in each group are equivalent and sorted in lexicographical order. So the answer is `"makkek"`.


Example 2:
Input: A = "hello", B = "world", S = "hold"
Output: "hdld"
Explanation:  Based on the equivalency information in `A` and `B`, we can group their characters as `[h,w]`, `[d,e,o]`, `[l,r]`. So only the second letter `''o''` in `S` is changed to `''d''`, the answer is `"hdld"`.


Example 3:
Input: A = "leetcode", B = "programs", S = "sourcecode"
Output: "aauaaaaada"
Explanation:  We group the equivalent characters in `A` and `B` as `[a,o,e,r,s,c]`, `[l,p]`, `[g,t]` and `[d,m]`, thus all letters in `S` except `''u''` and `''d''` are transformed to `''a''`, the answer is `"aauaaaaada"`.

Note:
String `A`, `B` and `S` consist of only lowercase English letters from `''a''` - `''z''`.

The lengths of string `A`, `B` and `S` are between `1` and `1000`.

String `A` and `B` are of the same length.', true, 'Medium', NULL, 66.9, 
   6.9, 'https://leetcode.com/problems/lexicographically-smallest-equivalent-string', 128, 5.4, 8, '[]'::jsonb, '[]'::jsonb, 
   137, 7, 95, false, '[]'::jsonb, true),
  (1062, 'Longest Repeating Substring', 'Given a string `S`, find out the length of the longest repeating substring(s). Return `0` if no repeating substring exists.


Example 1:
Input: S = "abcd"
Output: 0
Explanation: There is no repeating substring.


Example 2:
Input: S = "abbaba"
Output: 2
Explanation: The longest repeating substrings are "ab" and "ba", each of which occurs twice.


Example 3:
Input: S = "aabcaabdaab"
Output: 3
Explanation: The longest repeating substring is "aab", which occurs `3` times.


Example 4:
Input: S = "aaaaa"
Output: 4
Explanation: The longest repeating substring is "aaaa", which occurs twice.


Constraints:
The string `S` consists of only lowercase English letters from `''a''` - `''z''`.

`1 <= S.length <= 1500`', true, 'Medium', '/articles/longest-repeating-substring', 58.4, 
   3.5, 'https://leetcode.com/problems/longest-repeating-substring', 114, 18.2, 31.1, '["Google"]'::jsonb, '["String"]'::jsonb, 
   378, 20, 95, true, '[]'::jsonb, true),
  (1063, 'Number of Valid Subarrays', 'Given an array `A` of integers, return the number of non-empty continuous subarrays that satisfy the following condition:
The leftmost element of the subarray is not larger than other elements in the subarray.


Example 1:
Input: [1,4,2,5,3]
Output: 11
Explanation: There are 11 valid subarrays: [1],[4],[2],[5],[3],[1,4],[2,5],[1,4,2],[2,5,3],[1,4,2,5],[1,4,2,5,3].


Example 2:
Input: [3,2,1]
Output: 3
Explanation: The 3 valid subarrays are: [3],[2],[1].


Example 3:
Input: [2,2,2]
Output: 6
Explanation: There are 6 valid subarrays: [2],[2],[2],[2,2],[2,2],[2,2,2].

Note:
`1 <= A.length <= 50000`
`0 <= A[i] <= 100000`', true, 'Hard', NULL, 72.1, 
   8.8, 'https://leetcode.com/problems/number-of-valid-subarrays', 83, 4.7, 6.5, '["Hulu"]'::jsonb, '["Stack"]'::jsonb, 
   126, 8, 94, false, '[]'::jsonb, true),
  (1064, 'Fixed Point', 'Given an array of distinct integers `arr`, where `arr` is sorted in ascending order, return the smallest index `i` that satisfies `arr[i] == i`. If there is no such index, return `-1`.


Example 1:
Input: arr = [-10,-5,0,3,7]
Output: 3
Explanation: For the given array, `arr[0] = -10, arr[1] = -5, arr[2] = 0, arr[3] = 3`, thus the output is 3.


Example 2:
Input: arr = [0,2,5,8,17]
Output: 0
Explanation: `arr[0] = 0`, thus the output is 0.


Example 3:
Input: arr = [-10,-5,3,4,7,9]
Output: -1
Explanation: There is no such `i` that `arr[i] == i`, thus the output is -1.


Constraints:
`1 <= arr.length < 104`
`-109 <= arr[i] <= 109`
Follow up: The `O(n)` solution is very straightforward. Can we do better?', true, 'Easy', NULL, 64.8, 
   2, 'https://leetcode.com/problems/fixed-point', 208, 23.3, 36, '["Uber"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   193, 49, 80, false, '[]'::jsonb, true),
  (1065, 'Index Pairs of a String', 'Given a `text` string and `words` (a list of strings), return all index pairs `[i, j]` so that the substring `text[i]...text[j]` is in the list of `words`.


Example 1:
Input: text = "thestoryofleetcodeandme", words = ["story","fleet","leetcode"]
Output: [[3,7],[9,13],[10,17]]

Example 2:
Input: text = "ababa", words = ["aba","ab"]
Output: [[0,1],[0,2],[2,3],[2,4]]
Explanation: 
Notice that matches can overlap, see "aba" is found in [0,2] and [2,4].

Note:
All strings contains only lowercase English letters.

It''s guaranteed that all strings in `words` are different.

`1 <= text.length <= 100`
`1 <= words.length <= 20`
`1 <= words[i].length <= 50`
Return the pairs `[i,j]` in sorted order (i.e. sort them by their first coordinate in case of ties sort them by their second coordinate).', true, 'Easy', NULL, 61, 
   0, 'https://leetcode.com/problems/index-pairs-of-a-string', 160, 10.8, 17.6, '["Amazon"]'::jsonb, '["String,Trie"]'::jsonb, 
   142, 57, 71, true, '[]'::jsonb, true),
  (1066, 'Campus Bikes II', 'On a campus represented as a 2D grid, there are `N` workers and `M` bikes, with `N <= M`. Each worker and bike is a 2D coordinate on this grid.

We assign one unique bike to each worker so that the sum of the Manhattan distances between each worker and their assigned bike is minimized.

The Manhattan distance between two points `p1` and `p2` is `Manhattan(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|`.

Return the minimum possible sum of Manhattan distances between each worker and their assigned bike.


Example 1:
Input: workers = [[0,0],[2,1]], bikes = [[1,2],[3,3]]
Output: 6
Explanation: 
We assign bike 0 to worker 0, bike 1 to worker 1. The Manhattan distance of both assignments is 3, so the output is 6.


Example 2:
Input: workers = [[0,0],[1,1],[2,0]], bikes = [[1,0],[2,2],[2,1]]
Output: 4
Explanation: 
We first assign bike 0 to worker 0, then assign bike 1 to worker 1 or worker 2, bike 2 to worker 2 or worker 1. Both assignments lead to sum of the Manhattan distances as 4.


Example 3:
Input: workers = [[0,0],[1,0],[2,0],[3,0],[4,0]], bikes = [[0,999],[1,999],[2,999],[3,999],[4,999]]
Output: 4995

Constraints:
`N == workers.length`
`M == bikes.length`
`1 <= N <= M <= 10`
`workers[i].length == 2`
`bikes[i].length == 2`
`0 <= workers[i][0], workers[i][1], bikes[i][0], bikes[i][1] < 1000`
All the workers and the bikes locations are unique.', true, 'Medium', NULL, 54.2, 
   11.9, 'https://leetcode.com/problems/campus-bikes-ii', 163, 28.6, 52.7, '["Google"]'::jsonb, '["Dynamic Programming,Backtracking"]'::jsonb, 
   522, 43, 92, true, '[]'::jsonb, true),
  (1067, 'Digit Count in Range', 'Given an integer `d` between `0` and `9`, and two positive integers `low` and `high` as lower and upper bounds, respectively. Return the number of times that `d` occurs as a digit in all integers between `low` and `high`, including the bounds `low` and `high`.


Example 1:
Input: d = 1, low = 1, high = 13
Output: 6
Explanation: 
The digit `d=1` occurs `6` times in `1,10,11,12,13`. Note that the digit `d=1` occurs twice in the number `11`.


Example 2:
Input: d = 3, low = 100, high = 250
Output: 35
Explanation: 
The digit `d=3` occurs `35` times in `103,113,123,130,131,...,238,239,243`.

Note:
`0 <= d <= 9`
`1 <= low <= high <= 2×10^8`', true, 'Hard', NULL, 41.6, 
   0, 'https://leetcode.com/problems/digit-count-in-range', 32, 2.2, 5.2, '["eBay,Amazon"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   48, 13, 79, true, '[]'::jsonb, true),
  (1068, 'Product Sales Analysis I', 'SQL Schema', true, 'Easy', NULL, 82, 
   0, 'https://leetcode.com/problems/product-sales-analysis-i', 102, 31.5, 38.4, '["Amazon"]'::jsonb, '[]'::jsonb, 
   59, 52, 53, true, '[]'::jsonb, true),
  (1069, 'Product Sales Analysis II', 'SQL Schema', true, 'Easy', NULL, 83.1, 
   0, 'https://leetcode.com/problems/product-sales-analysis-ii', 81, 26, 31.2, '["Amazon"]'::jsonb, '[]'::jsonb, 
   34, 95, 26, true, '[]'::jsonb, true),
  (1070, 'Product Sales Analysis III', 'SQL Schema', true, 'Medium', NULL, 50, 
   0, 'https://leetcode.com/problems/product-sales-analysis-iii', 167, 18.6, 37.2, '["Amazon"]'::jsonb, '[]'::jsonb, 
   49, 166, 23, true, '[]'::jsonb, true),
  (1071, 'Greatest Common Divisor of Strings', 'For two strings `s` and `t`, we say "`t` divides `s`" if and only if `s = t + ... + t`  (`t` concatenated with itself 1 or more times)
Given two strings str1 and str2, return the largest string `x` such that `x` divides both `str1` and `str2`.


Example 1:
Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"

Example 2:
Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"

Example 3:
Input: str1 = "LEET", str2 = "CODE"
Output: ""

Example 4:
Input: str1 = "ABCDEF", str2 = "ABC"
Output: ""

Constraints:
`1 <= str1.length <= 1000`
`1 <= str2.length <= 1000`
`str1` and `str2` consist of English uppercase letters.', false, 'Easy', NULL, 51.8, 
   24.2, 'https://leetcode.com/problems/greatest-common-divisor-of-strings', 403, 46.3, 89.3, '["Amazon,Atlassian,Visa"]'::jsonb, '["String"]'::jsonb, 
   770, 180, 81, true, '[]'::jsonb, true),
  (1072, 'Flip Columns For Maximum Number of Equal Rows', 'You are given an `m x n` binary matrix `matrix`.

You can choose any number of columns in the matrix and flip every cell in that column (i.e., Change the value of the cell from `0` to `1` or vice versa).

Return the maximum number of rows that have all values equal after some number of flips.


Example 1:
Input: matrix = [[0,1],[1,1]]
Output: 1
Explanation: After flipping no values, 1 row has all values equal.


Example 2:
Input: matrix = [[0,1],[1,0]]
Output: 2
Explanation: After flipping values in the first column, both rows have equal values.


Example 3:
Input: matrix = [[0,0,0],[0,0,1],[1,1,0]]
Output: 2
Explanation: After flipping values in the first two columns, the last two rows have equal values.


Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 300`
`matrix[i][j]` is either `0` or `1`.', false, 'Medium', NULL, 61.7, 
   8.6, 'https://leetcode.com/problems/flip-columns-for-maximum-number-of-equal-rows', 127, 13.1, 21.2, '[]'::jsonb, '[]'::jsonb, 
   353, 31, 92, false, '[]'::jsonb, true),
  (1073, 'Adding Two Negabinary Numbers', 'Given two numbers `arr1` and `arr2` in base -2, return the result of adding them together.

Each number is given in array format:  as an array of 0s and 1s, from most significant bit to least significant bit.  For example, `arr = [1,1,0,1]` represents the number `(-2)^3 + (-2)^2 + (-2)^0 = -3`.  A number `arr` in array, format is also guaranteed to have no leading zeros: either `arr == [0]` or `arr[0] == 1`.

Return the result of adding `arr1` and `arr2` in the same format: as an array of 0s and 1s with no leading zeros.


Example 1:
Input: arr1 = [1,1,1,1,1], arr2 = [1,0,1]
Output: [1,0,0,0,0]
Explanation: arr1 represents 11, arr2 represents 5, the output represents 16.


Example 2:
Input: arr1 = [0], arr2 = [0]
Output: [0]

Example 3:
Input: arr1 = [0], arr2 = [1]
Output: [1]

Constraints:
`1 <= arr1.length, arr2.length <= 1000`
`arr1[i]` and `arr2[i]` are `0` or `1`
`arr1` and `arr2` have no leading zeros', false, 'Medium', NULL, 34.7, 
   4.3, 'https://leetcode.com/problems/adding-two-negabinary-numbers', 128, 8.8, 25.3, '["Grab"]'::jsonb, '["Math"]'::jsonb, 
   153, 70, 69, false, '[]'::jsonb, true),
  (1074, 'Number of Submatrices That Sum to Target', 'Given a `matrix` and a `target`, return the number of non-empty submatrices that sum to target.

A submatrix `x1, y1, x2, y2` is the set of all cells `matrix[x][y]` with `x1 <= x <= x2` and `y1 <= y <= y2`.

Two submatrices `(x1, y1, x2, y2)` and `(x1'', y1'', x2'', y2'')` are different if they have some coordinate that is different: for example, if `x1 != x1''`.


Example 1:
Input: matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
Output: 4
Explanation: The four 1x1 submatrices that only contain 0.


Example 2:
Input: matrix = [[1,-1],[-1,1]], target = 0
Output: 5
Explanation: The two 1x2 submatrices, plus the two 2x1 submatrices, plus the 2x2 submatrix.


Example 3:
Input: matrix = [[904]], target = 0
Output: 0

Constraints:
`1 <= matrix.length <= 100`
`1 <= matrix[0].length <= 100`
`-1000 <= matrix[i] <= 1000`
`-10^8 <= target <= 10^8`', false, 'Hard', '/articles/number-of-submatrices-that-sum-to-target', 62, 
   27.3, 'https://leetcode.com/problems/number-of-submatrices-that-sum-to-target', 134, 25, 40.3, '["Google"]'::jsonb, '["Array,Dynamic Programming,Sliding Window"]'::jsonb, 
   820, 31, 96, true, '[]'::jsonb, true),
  (1075, 'Project Employees I', 'SQL Schema', true, 'Easy', NULL, 66.2, 
   0, 'https://leetcode.com/problems/project-employees-i', 123, 21.3, 32.2, '["Facebook"]'::jsonb, '[]'::jsonb, 
   42, 47, 47, true, '[]'::jsonb, true),
  (1076, 'Project Employees II', 'SQL Schema', true, 'Easy', NULL, 52.8, 
   1, 'https://leetcode.com/problems/project-employees-ii', 188, 21.7, 41, '["Facebook"]'::jsonb, '[]'::jsonb, 
   84, 24, 78, true, '[]'::jsonb, true),
  (1077, 'Project Employees III', 'SQL Schema', true, 'Medium', NULL, 78.1, 
   1.2, 'https://leetcode.com/problems/project-employees-iii', 189, 19.6, 25.2, '["Facebook"]'::jsonb, '[]'::jsonb, 
   113, 2, 98, true, '[]'::jsonb, true),
  (1078, 'Occurrences After Bigram', 'Given words `first` and `second`, consider occurrences in some `text` of the form "`first second third`", where `second` comes immediately after `first`, and `third` comes immediately after `second`.

For each such occurrence, add "`third`" to the answer, and return the answer.


Example 1:
Input: text = "alice is a good girl she is a good student", first = "a", second = "good"
Output: ["girl","student"]

Example 2:
Input: text = "we will we will rock you", first = "we", second = "will"
Output: ["we","rock"]
Note:
`1 <= text.length <= 1000`
`text` consists of space separated words, where each word consists of lowercase English letters.

`1 <= first.length, second.length <= 10`
`first` and `second` consist of lowercase English letters.', false, 'Easy', NULL, 65, 
   0, 'https://leetcode.com/problems/occurrences-after-bigram', 559, 38.7, 59.5, '["Google"]'::jsonb, '["Hash Table"]'::jsonb, 
   218, 228, 49, true, '[]'::jsonb, true),
  (1079, 'Letter Tile Possibilities', 'You have `n`  `tiles`, where each tile has one letter `tiles[i]` printed on it.

Return the number of possible non-empty sequences of letters you can make using the letters printed on those `tiles`.


Example 1:
Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".


Example 2:
Input: tiles = "AAABBC"
Output: 188

Example 3:
Input: tiles = "V"
Output: 1

Constraints:
`1 <= tiles.length <= 7`
`tiles` consists of uppercase English letters.', false, 'Medium', NULL, 75.9, 
   3.2, 'https://leetcode.com/problems/letter-tile-possibilities', 464, 46.8, 61.6, '["Microsoft"]'::jsonb, '["Backtracking"]'::jsonb, 
   992, 36, 96, false, '[]'::jsonb, true),
  (1080, 'Insufficient Nodes in Root to Leaf Paths', 'Given the `root` of a binary tree, consider all root to leaf paths: paths from the root to any leaf.  (A leaf is a node with no children.)
A `node` is insufficient if every such root to leaf path intersecting this `node` has sum strictly less than `limit`.

Delete all insufficient nodes simultaneously, and return the root of the resulting binary tree.


Example 1:
Input: root = [1,2,3,4,-99,-99,7,8,9,-99,-99,12,13,-99,14], limit = 1
Output: [1,2,3,4,null,null,7,8,9,null,14]

Example 2:
Input: root = [5,4,8,11,null,17,4,7,1,null,null,5,3], limit = 22
Output: [5,4,8,11,null,17,4,7,null,null,null,5]

Example 3:
Input: root = [1,2,-3,-5,null,4,null], limit = -1
Output: [1,null,-3,4]
Note:
The given tree will have between `1` and `5000` nodes.

`-10^5 <= node.val <= 10^5`
`-10^9 <= limit <= 10^9`', false, 'Medium', NULL, 50.1, 
   0, 'https://leetcode.com/problems/insufficient-nodes-in-root-to-leaf-paths', 249, 18.2, 36.3, '["Amazon"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   251, 381, 40, true, '[]'::jsonb, true),
  (1081, 'Smallest Subsequence of Distinct Characters', 'Return the lexicographically smallest subsequence of `s` that contains all the distinct characters of `s` exactly once.

Note: This question is the same as 316: https://leetcode.com/problems/remove-duplicate-letters/

Example 1:
Input: s = "bcabc"
Output: "abc"

Example 2:
Input: s = "cbacdcbc"
Output: "acdb"

Constraints:
`1 <= s.length <= 1000`
`s` consists of lowercase English letters.', false, 'Medium', NULL, 53.6, 
   16.8, 'https://leetcode.com/problems/smallest-subsequence-of-distinct-characters', 197, 21.9, 40.9, '["Amazon,FactSet,Google,ByteDance"]'::jsonb, '["String,Stack,Greedy"]'::jsonb, 
   866, 111, 89, true, '[]'::jsonb, true),
  (1082, 'Sales Analysis I', 'SQL Schema', true, 'Easy', NULL, 74, 
   0, 'https://leetcode.com/problems/sales-analysis-i', 156, 23.9, 32.3, '["Amazon"]'::jsonb, '[]'::jsonb, 
   103, 33, 76, true, '[]'::jsonb, true),
  (1083, 'Sales Analysis II', 'SQL Schema', true, 'Easy', NULL, 50.8, 
   1.1, 'https://leetcode.com/problems/sales-analysis-ii', 184, 23.3, 45.8, '["Amazon"]'::jsonb, '[]'::jsonb, 
   114, 21, 84, true, '[]'::jsonb, true),
  (1084, 'Sales Analysis III', 'SQL Schema', true, 'Easy', NULL, 54.7, 
   0, 'https://leetcode.com/problems/sales-analysis-iii', 224, 24.1, 44, '["Amazon"]'::jsonb, '[]'::jsonb, 
   109, 34, 76, true, '[]'::jsonb, true),
  (1085, 'Sum of Digits in the Minimum Number', 'Given an array `A` of positive integers, let `S` be the sum of the digits of the minimal element of `A`.

Return 0 if `S` is odd, otherwise return 1.


Example 1:
Input: [34,23,1,24,75,33,54,8]
Output: 0
Explanation: 
The minimal element is 1, and the sum of those digits is S = 1 which is odd, so the answer is 0.


Example 2:
Input: [99,77,33,66,55]
Output: 1
Explanation: 
The minimal element is 33, and the sum of those digits is S = 3 + 3 = 6 which is even, so the answer is 1.


Constraints:
`1 <= A.length <= 100`
`1 <= A[i] <= 100`', true, 'Easy', NULL, 75.1, 
   0, 'https://leetcode.com/problems/sum-of-digits-in-the-minimum-number', 219, 16.3, 21.7, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   58, 116, 33, true, '[]'::jsonb, true),
  (1086, 'High Five', 'Given a list of the scores of different students, `items`, where `items[i] = [IDi, scorei]` represents one score from a student with `IDi`, calculate each student''s top five average.

Return the answer as an array of pairs `result`, where `result[j] = [IDj, topFiveAveragej]` represents the student with `IDj` and their top five average. Sort `result` by `IDj` in increasing order.

A student''s top five average is calculated by taking the sum of their top five scores and dividing it by `5` using integer division.


Example 1:
Input: items = [[1,91],[1,92],[2,93],[2,97],[1,60],[2,77],[1,65],[1,87],[1,100],[2,100],[2,76]]
Output: [[1,87],[2,88]]
Explanation: 
The student with ID = 1 got scores 91, 92, 60, 65, 87, and 100. Their top five average is (100 + 92 + 91 + 87 + 65) / 5 = 87.

The student with ID = 2 got scores 93, 97, 77, 100, and 76. Their top five average is (100 + 97 + 93 + 77 + 76) / 5 = 88.6, but with integer division their average converts to 88.


Example 2:
Input: items = [[1,100],[7,100],[1,100],[7,100],[1,100],[7,100],[1,100],[7,100],[1,100],[7,100]]
Output: [[1,100],[7,100]]

Constraints:
`1 <= items.length <= 1000`
`items[i].length == 2`
`1 <= IDi <= 1000`
`0 <= scorei <= 100`
For each `IDi`, there will be at least five scores.', true, 'Easy', '/articles/high-five', 77.3, 
   42.5, 'https://leetcode.com/problems/high-five', 544, 53.8, 69.5, '["Goldman Sachs"]'::jsonb, '["Array,Hash Table,Sort"]'::jsonb, 
   432, 77, 85, false, '[]'::jsonb, true),
  (1087, 'Brace Expansion', 'You are given a string `s` representing a list of words. Each letter in the word has one or more options.

If there is one option, the letter is represented as is.

If there is more than one option, then curly braces delimit the options. For example, `"{a,b,c}"` represents options `["a", "b", "c"]`.

For example, if `s = "a{b,c}"`, the first character is always `''a''`, but the second character can be `''b''` or `''c''`. The original list is `["ab", "ac"]`.

Return all words that can be formed in this manner, sorted in lexicographical order.


Example 1:
Input: s = "{a,b}c{d,e}f"
Output: ["acdf","acef","bcdf","bcef"]

Example 2:
Input: s = "abcd"
Output: ["abcd"]

Constraints:
`1 <= s.length <= 50`
`s` consists of curly brackets `''{}''`, commas `'',''`, and lowercase English letters.

`s` is guaranteed to be a valid input.

There are no nested curly brackets.

All characters inside a pair of consecutive opening and ending curly brackets are different.', true, 'Medium', NULL, 63.3, 
   1.6, 'https://leetcode.com/problems/brace-expansion', 301, 27, 42.7, '["Google"]'::jsonb, '["Backtracking"]'::jsonb, 
   325, 33, 91, true, '[]'::jsonb, true),
  (1088, 'Confusing Number II', 'We can rotate digits by 180 degrees to form new digits. When 0, 1, 6, 8, 9 are rotated 180 degrees, they become 0, 1, 9, 8, 6 respectively. When 2, 3, 4, 5 and 7 are rotated 180 degrees, they become invalid.

A confusing number is a number that when rotated 180 degrees becomes a different number with each digit valid.(Note that the rotated number can be greater than the original number.)
Given a positive integer `N`, return the number of confusing numbers between `1` and `N` inclusive.


Example 1:
Input: 20
Output: 6
Explanation: 
The confusing numbers are [6,9,10,16,18,19].

6 converts to 9.

9 converts to 6.

10 converts to 01 which is just 1.

16 converts to 91.

18 converts to 81.

19 converts to 61.


Example 2:
Input: 100
Output: 19
Explanation: 
The confusing numbers are [6,9,10,16,18,19,60,61,66,68,80,81,86,89,90,91,98,99,100].

Note:
`1 <= N <= 10^9`', true, 'Hard', NULL, 45.6, 
   20.3, 'https://leetcode.com/problems/confusing-number-ii', 127, 21, 46, '["Google"]'::jsonb, '["Math,Backtracking"]'::jsonb, 
   252, 72, 78, true, '[]'::jsonb, true),
  (1089, 'Duplicate Zeros', 'Given a fixed length array `arr` of integers, duplicate each occurrence of zero, shifting the remaining elements to the right.

Note that elements beyond the length of the original array are not written.

Do the above modifications to the input array in place, do not return anything from your function.


Example 1:
Input: [1,0,2,3,0,4,5,0]
Output: null
Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

Example 2:
Input: [1,2,3]
Output: null
Explanation: After calling your function, the input array is modified to: [1,2,3]
Note:
`1 <= arr.length <= 10000`
`0 <= arr[i] <= 9`', false, 'Easy', '/articles/duplicate-zeros', 51.6, 
   8.3, 'https://leetcode.com/problems/duplicate-zeros', 934, 143.1, 277.5, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   904, 304, 75, true, '[]'::jsonb, true),
  (1090, 'Largest Values From Labels', 'We have a set of items: the `i`-th item has value `values[i]` and label `labels[i]`.

Then, we choose a subset `S` of these items, such that:
`|S| <= num_wanted`
For every label `L`, the number of items in `S` with label `L` is `<= use_limit`.

Return the largest possible sum of the subset `S`.


Example 1:
Input: values = [5,4,3,2,1], labels = [1,1,2,2,3], `num_wanted `= 3, use_limit = 1
Output: 9
Explanation: The subset chosen is the first, third, and fifth item.


Example 2:
Input: values = [5,4,3,2,1], labels = [1,3,3,3,2], `num_wanted `= 3, use_limit = 2
Output: 12
Explanation: The subset chosen is the first, second, and third item.


Example 3:
Input: values = [9,8,8,7,6], labels = [0,0,0,1,1], `num_wanted `= 3, use_limit = 1
Output: 16
Explanation: The subset chosen is the first and fourth item.


Example 4:
Input: values = [9,8,8,7,6], labels = [0,0,0,1,1], `num_wanted `= 3, use_limit = 2
Output: 24
Explanation: The subset chosen is the first, second, and fourth item.

Note:
`1 <= values.length == labels.length <= 20000`
`0 <= values[i], labels[i] <= 20000`
`1 <= num_wanted, use_limit <= values.length`', false, 'Medium', NULL, 60.1, 
   1.7, 'https://leetcode.com/problems/largest-values-from-labels', 293, 20, 33.2, '["Google"]'::jsonb, '["Hash Table,Greedy"]'::jsonb, 
   178, 438, 29, true, '[]'::jsonb, true),
  (1091, 'Shortest Path in Binary Matrix', 'Given an `n x n` binary matrix `grid`, return the length of the shortest clear path in the matrix. If there is no clear path, return `-1`.

A clear path in a binary matrix is a path from the top-left cell (i.e., `(0, 0)`) to the bottom-right cell (i.e., `(n - 1, n - 1)`) such that:
All the visited cells of the path are `0`.

All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).

The length of a clear path is the number of visited cells of this path.


Example 1:
Input: grid = [[0,1],[1,0]]
Output: 2

Example 2:
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4

Example 3:
Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1

Constraints:
`n == grid.length`
`n == grid[i].length`
`1 <= n <= 100`
`grid[i][j] is 0 or 1`', false, 'Medium', '/articles/shortest-path-in-a-binary-matrix', 40.2, 
   54.1, 'https://leetcode.com/problems/shortest-path-in-binary-matrix', 573, 83, 206.5, '["Amazon,Google,Facebook,Oracle,Snapchat"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   1144, 75, 94, true, '[]'::jsonb, true),
  (1092, 'Shortest Common Supersequence', 'Given two strings `str1` and `str2`, return the shortest string that has both `str1` and `str2` as subsequences.  If multiple answers exist, you may return any of them.

(A string S is a subsequence of string T if deleting some number of characters from T (possibly 0, and the characters are chosen anywhere from T) results in the string S.)

Example 1:
Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation: 
str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".

str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".

The answer provided is the shortest such string that satisfies these properties.

Note:
`1 <= str1.length, str2.length <= 1000`
`str1` and `str2` consist of lowercase English letters.', false, 'Hard', NULL, 53.2, 
   22.4, 'https://leetcode.com/problems/shortest-common-supersequence', 311, 22.2, 41.7, '["Microsoft,Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   941, 25, 97, true, '[]'::jsonb, true),
  (1093, 'Statistics from a Large Sample', 'You are given a large sample of integers in the range `[0, 255]`. Since the sample is so large, it is represented by an array `count` where `count[k]` is the number of times that `k` appears in the sample.

Calculate the following statistics:
`minimum`: The minimum element in the sample.

`maximum`: The maximum element in the sample.

`mean`: The average of the sample, calculated as the total sum of all elements divided by the total number of elements.

`median`:
	
If the sample has an odd number of elements, then the `median` is the middle element once the sample is sorted.

If the sample has an even number of elements, then the `median` is the average of the two middle elements once the sample is sorted.

`mode`: The number that appears the most in the sample. It is guaranteed to be unique.

Return the statistics of the sample as an array of floating-point numbers `[minimum, maximum, mean, median, mode]`. Answers within `10-5` of the actual answer will be accepted.


Example 1:
Input: count = [0,1,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Output: [1.00000,3.00000,2.37500,2.50000,3.00000]
Explanation: The sample represented by count is [1,2,2,2,3,3,3,3].

The minimum and maximum are 1 and 3 respectively.

The mean is (1+2+2+2+3+3+3+3) / 8 = 19 / 8 = 2.375.

Since the size of the sample is even, the median is the average of the two middle elements 2 and 3, which is 2.5.

The mode is 3 as it appears the most in the sample.


Example 2:
Input: count = [0,4,3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Output: [1.00000,4.00000,2.18182,2.00000,1.00000]
Explanation: The sample represented by count is [1,1,1,1,2,2,2,3,3,4,4].

The minimum and maximum are 1 and 4 respectively.

The mean is (1+1+1+1+2+2+2+3+3+4+4) / 11 = 24 / 11 = 2.18181818... (for display purposes, the output shows the rounded number 2.18182).

Since the size of the sample is odd, the median is the middle element 2.

The mode is 1 as it appears the most in the sample.


Constraints:
`count.length == 256`
`0 <= count[i] <= 109`
`1 <= sum(count) <= 109`
The mode of the sample that `count` represents is unique.', false, 'Medium', NULL, 48.8, 
   3.7, 'https://leetcode.com/problems/statistics-from-a-large-sample', 145, 10.5, 21.4, '["Microsoft"]'::jsonb, '["Math,Two Pointers"]'::jsonb, 
   5, 8, 38, false, '[]'::jsonb, true),
  (1094, 'Car Pooling', 'You are driving a vehicle that has `capacity` empty seats initially available for passengers.  The vehicle only drives east (ie. it cannot turn around and drive west.)
Given a list of `trips`, `trip[i] = [num_passengers, start_location, end_location]` contains information about the `i`-th trip: the number of passengers that must be picked up, and the locations to pick them up and drop them off.  The locations are given as the number of kilometers due east from your vehicle''s initial location.

Return `true` if and only if it is possible to pick up and drop off all passengers for all the given trips. 

Example 1:
Input: trips = [[2,1,5],[3,3,7]], capacity = 4
Output: false

Example 2:
Input: trips = [[2,1,5],[3,3,7]], capacity = 5
Output: true

Example 3:
Input: trips = [[2,1,5],[3,5,7]], capacity = 3
Output: true

Example 4:
Input: trips = [[3,2,7],[3,7,9],[8,3,9]], capacity = 11
Output: true

Constraints:
`trips.length <= 1000`
`trips[i].length == 3`
`1 <= trips[i][0] <= 100`
`0 <= trips[i][1] < trips[i][2] <= 1000`
`1 <= capacity <= 100000`', false, 'Medium', '/articles/car-pooling', 59.6, 
   12.1, 'https://leetcode.com/problems/car-pooling', 708, 70.5, 118.1, '["Facebook"]'::jsonb, '["Greedy"]'::jsonb, 
   1179, 38, 97, true, '[]'::jsonb, true),
  (1095, 'Find in Mountain Array', '(This problem is an interactive problem.)
You may recall that an array `A` is a mountain array if and only if:
`A.length >= 3`
There exists some `i` with `0 < i < A.length - 1` such that:
	
`A[0] < A[1] < ... A[i-1] < A[i]`
`A[i] > A[i+1] > ... > A[A.length - 1]`
Given a mountain array `mountainArr`, return the minimum `index` such that `mountainArr.get(index) == target`.  If such an `index` doesn''t exist, return `-1`.

You can''t access the mountain array directly.  You may only access the array using a `MountainArray` interface:
`MountainArray.get(k)` returns the element of the array at index `k` (0-indexed).

`MountainArray.length()` returns the length of the array.

Submissions making more than `100` calls to `MountainArray.get` will be judged Wrong Answer.  Also, any solutions that attempt to circumvent the judge will result in disqualification.


Example 1:
Input: array = [1,2,3,4,5,3,1], target = 3
Output: 2
Explanation: 3 exists in the array, at index=2 and index=5. Return the minimum index, which is 2.


Example 2:
Input: array = [0,1,2,4,2,1], target = 3
Output: -1
Explanation: 3 does not exist in `the array,` so we return -1.


Constraints:
`3 <= mountain_arr.length() <= 10000`
`0 <= target <= 10^9`
`0 <= mountain_arr.get(index) <= 10^9`', false, 'Hard', NULL, 36.1, 
   34.4, 'https://leetcode.com/problems/find-in-mountain-array', 301, 25.5, 70.8, '["Apple,Bloomberg,Quora"]'::jsonb, '["Binary Search"]'::jsonb, 
   491, 38, 93, true, '[]'::jsonb, true),
  (1096, 'Brace Expansion II', 'Under a grammar given below, strings can represent a set of lowercase words.  Let''s use `R(expr)` to denote the set of words the expression represents.

Grammar can best be understood through simple examples:
Single letters represent a singleton set containing that word.

	
`R("a") = {"a"}`
`R("w") = {"w"}`
When we take a comma delimited list of 2 or more expressions, we take the union of possibilities.

	
`R("{a,b,c}") = {"a","b","c"}`
`R("{{a,b},{b,c}}") = {"a","b","c"}` (notice the final set only contains each word at most once)
When we concatenate two expressions, we take the set of possible concatenations between two words where the first word comes from the first expression and the second word comes from the second expression.

	
`R("{a,b}{c,d}") = {"ac","ad","bc","bd"}`
`R("a{b,c}{d,e}f{g,h}") = {"abdfg", "abdfh", "abefg", "abefh", "acdfg", "acdfh", "acefg", "acefh"}`
Formally, the 3 rules for our grammar:
For every lowercase letter `x`, we have `R(x) = {x}`
For expressions `e_1, e_2, ... , e_k` with `k >= 2`, we have `R({e_1,e_2,...}) = R(e_1) ∪ R(e_2) ∪ ...`
For expressions `e_1` and `e_2`, we have `R(e_1 + e_2) = {a + b for (a, b) in R(e_1) × R(e_2)}`, where + denotes concatenation, and × denotes the cartesian product.

Given an `expression` representing a set of words under the given grammar, return the sorted list of words that the expression represents.


Example 1:
Input: "{a,b}{c,{d,e}}"
Output: ["ac","ad","ae","bc","bd","be"]

Example 2:
Input: "{{a,z},a{b,c},{ab,z}}"
Output: ["a","ab","ac","z"]
Explanation: Each distinct word is written only once in the final answer.


Constraints:
`1 <= expression.length <= 60`
`expression[i]` consists of `''{''`, `''}''`, `'',''`or lowercase English letters.

The given `expression` represents a set of words based on the grammar given in the description.', false, 'Hard', NULL, 62.6, 
   11.2, 'https://leetcode.com/problems/brace-expansion-ii', 173, 13.4, 21.3, '["Google,Adobe"]'::jsonb, '["String"]'::jsonb, 
   258, 161, 62, true, '[]'::jsonb, true),
  (1097, 'Game Play Analysis V', 'SQL Schema', true, 'Hard', NULL, 56.8, 
   2.5, 'https://leetcode.com/problems/game-play-analysis-v', 201, 8.3, 14.6, '["GSN Games"]'::jsonb, '[]'::jsonb, 
   71, 21, 77, false, '[]'::jsonb, true),
  (1098, 'Unpopular Books', 'SQL Schema', true, 'Medium', NULL, 45.6, 
   0, 'https://leetcode.com/problems/unpopular-books', 208, 15.8, 34.6, '[]'::jsonb, '[]'::jsonb, 
   89, 229, 28, false, '[]'::jsonb, true),
  (1099, 'Two Sum Less Than K', 'Given an array `nums` of integers and integer `k`, return the maximum `sum` such that there exists `i < j` with `nums[i] + nums[j] = sum` and `sum < k`. If no `i`, `j` exist satisfying this equation, return `-1`.


Example 1:
Input: nums = [34,23,1,24,75,33,54,8], k = 60
Output: 58
Explanation: We can use 34 and 24 to sum 58 which is less than 60.


Example 2:
Input: nums = [10,20,30], k = 15
Output: -1
Explanation: In this case it is not possible to get a pair sum less that 15.


Constraints:
`1 <= nums.length <= 100`
`1 <= nums[i] <= 1000`
`1 <= k <= 2000`', true, 'Easy', '/articles/two-sum-less-than-k', 60.8, 
   1.8, 'https://leetcode.com/problems/two-sum-less-than-k', 304, 59.9, 98.5, '["Amazon"]'::jsonb, '["Array,Two Pointers,Sort"]'::jsonb, 
   510, 58, 90, true, '[]'::jsonb, true),
  (1100, 'Find K-Length Substrings With No Repeated Characters', 'Given a string `S`, return the number of substrings of length `K` with no repeated characters.


Example 1:
Input: S = "havefunonleetcode", K = 5
Output: 6
Explanation: 
There are 6 substrings they are : ''havef'',''avefu'',''vefun'',''efuno'',''etcod'',''tcode''.


Example 2:
Input: S = "home", K = 5
Output: 0
Explanation: 
Notice K can be larger than the length of S. In this case is not possible to find any substring.

Note:
`1 <= S.length <= 10^4`
All characters of S are lowercase English letters.

`1 <= K <= 10^4`', true, 'Medium', NULL, 73.1, 
   0, 'https://leetcode.com/problems/find-k-length-substrings-with-no-repeated-characters', 214, 17.9, 24.5, '["Amazon"]'::jsonb, '["String,Sliding Window"]'::jsonb, 
   253, 6, 98, true, '[]'::jsonb, true),
  (1101, 'The Earliest Moment When Everyone Become Friends', 'In a social group, there are `N` people, with unique integer ids from `0` to `N-1`.

We have a list of `logs`, where each `logs[i] = [timestamp, id_A, id_B]` contains a non-negative integer timestamp, and the ids of two different people.

Each log represents the time in which two different people became friends.  Friendship is symmetric: if A is friends with B, then B is friends with A.

Let''s say that person A is acquainted with person B if A is friends with B, or A is a friend of someone acquainted with B.

Return the earliest time for which every person became acquainted with every other person. Return -1 if there is no such earliest time.


Example 1:
Input: logs = [[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190211,1,5],[20190224,2,4],[20190301,0,3],[20190312,1,2],[20190322,4,5]], N = 6
Output: 20190301
Explanation: 
The first event occurs at timestamp = 20190101 and after 0 and 1 become friends we have the following friendship groups [0,1], [2], [3], [4], [5].

The second event occurs at timestamp = 20190104 and after 3 and 4 become friends we have the following friendship groups [0,1], [2], [3,4], [5].

The third event occurs at timestamp = 20190107 and after 2 and 3 become friends we have the following friendship groups [0,1], [2,3,4], [5].

The fourth event occurs at timestamp = 20190211 and after 1 and 5 become friends we have the following friendship groups [0,1,5], [2,3,4].

The fifth event occurs at timestamp = 20190224 and as 2 and 4 are already friend anything happens.

The sixth event occurs at timestamp = 20190301 and after 0 and 3 become friends we have that all become friends.

Note:
`2 <= N <= 100`
`1 <= logs.length <= 10^4`
`0 <= logs[i][0] <= 10^9`
`0 <= logs[i][1], logs[i][2] <= N - 1`
It''s guaranteed that all timestamps in `logs[i][0]` are different.

`logs `are not necessarily ordered by some criteria.

`logs[i][1] != logs[i][2]`', true, 'Medium', NULL, 67.8, 
   3.5, 'https://leetcode.com/problems/the-earliest-moment-when-everyone-become-friends', 137, 9.4, 13.9, '["Google"]'::jsonb, '["Union Find"]'::jsonb, 
   173, 7, 96, true, '[]'::jsonb, true),
  (1102, 'Path With Maximum Minimum Value', 'Given a matrix of integers `A` with R rows and C columns, find the maximum score of a path starting at `[0,0]` and ending at `[R-1,C-1]`.

The score of a path is the minimum value in that path.  For example, the value of the path 8 →  4 →  5 →  9 is 4.

A path moves some number of times from one visited cell to any neighbouring unvisited cell in one of the 4 cardinal directions (north, east, west, south).


Example 1:
Input: [[5,4,5],[1,2,6],[7,4,6]]
Output: 4
Explanation: 
The path with the maximum score is highlighted in yellow. 

Example 2:
Input: [[2,2,1,2,2,2],[1,2,2,2,1,2]]
Output: 2

Example 3:
Input: [[3,4,6,3,4],[0,2,1,1,7],[8,8,3,2,7],[3,2,4,9,8],[4,1,2,0,0],[4,6,5,4,3]]
Output: 3
Note:
`1 <= R, C <= 100`
`0 <= A[i][j] <= 10^9`', true, 'Medium', NULL, 50.8, 
   18.8, 'https://leetcode.com/problems/path-with-maximum-minimum-value', 170, 30.3, 59.6, '["Google,Facebook"]'::jsonb, '["Depth-first Search,Union Find,Graph"]'::jsonb, 
   663, 71, 90, true, '[]'::jsonb, true),
  (1103, 'Distribute Candies to People', 'We distribute some number of `candies`, to a row of `n = num_people` people in the following way:
We then give 1 candy to the first person, 2 candies to the second person, and so on until we give `n` candies to the last person.

Then, we go back to the start of the row, giving `n + 1` candies to the first person, `n + 2` candies to the second person, and so on until we give `2 * n` candies to the last person.

This process repeats (with us giving one more candy each time, and moving to the start of the row after we reach the end) until we run out of candies.  The last person will receive all of our remaining candies (not necessarily one more than the previous gift).

Return an array (of length `num_people` and sum `candies`) that represents the final distribution of candies.


Example 1:
Input: candies = 7, num_people = 4
Output: [1,2,3,1]
Explanation:
On the first turn, ans[0] += 1, and the array is [1,0,0,0].

On the second turn, ans[1] += 2, and the array is [1,2,0,0].

On the third turn, ans[2] += 3, and the array is [1,2,3,0].

On the fourth turn, ans[3] += 1 (because there is only one candy left), and the final array is [1,2,3,1].


Example 2:
Input: candies = 10, num_people = 3
Output: [5,2,3]
Explanation: 
On the first turn, ans[0] += 1, and the array is [1,0,0].

On the second turn, ans[1] += 2, and the array is [1,2,0].

On the third turn, ans[2] += 3, and the array is [1,2,3].

On the fourth turn, ans[0] += 4, and the final array is [5,2,3].


Constraints:
1 <= candies <= 10^9
1 <= num_people <= 1000', false, 'Easy', '/articles/distribute-candies-to-people', 63.4, 
   7.8, 'https://leetcode.com/problems/distribute-candies-to-people', 710, 57.4, 90.5, '[]'::jsonb, '[]'::jsonb, 
   511, 150, 77, false, '[]'::jsonb, true),
  (1104, 'Path In Zigzag Labelled Binary Tree', 'In an infinite binary tree where every node has two children, the nodes are labelled in row order.

In the odd numbered rows (ie., the first, third, fifth,...), the labelling is left to right, while in the even numbered rows (second, fourth, sixth,...), the labelling is right to left.

Given the `label` of a node in this tree, return the labels in the path from the root of the tree to the node with that `label`.


Example 1:
Input: label = 14
Output: [1,3,4,14]

Example 2:
Input: label = 26
Output: [1,2,6,10,26]

Constraints:
`1 <= label <= 10^6`', false, 'Medium', NULL, 73.3, 
   7.2, 'https://leetcode.com/problems/path-in-zigzag-labelled-binary-tree', 502, 24, 32.7, '["Amazon,Microsoft,Bloomberg"]'::jsonb, '["Math,Tree"]'::jsonb, 
   609, 187, 77, true, '[]'::jsonb, true),
  (1105, 'Filling Bookcase Shelves', 'We have a sequence of `books`: the `i`-th book has thickness `books[i][0]` and height `books[i][1]`.

We want to place these books in order onto bookcase shelves that have total width `shelf_width`.

We choose some of the books to place on this shelf (such that the sum of their thickness is `<= shelf_width`), then build another level of shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down.  We repeat this process until there are no more books to place.

Note again that at each step of the above process, the order of the books we place is the same order as the given sequence of books.  For example, if we have an ordered list of 5 books, we might place the first and second book onto the first shelf, the third book on the second shelf, and the fourth and fifth book on the last shelf.

Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.


Example 1:
Input: books = [[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], shelf_width = 4
Output: 6
Explanation:
The sum of the heights of the 3 shelves are 1 + 3 + 2 = 6.

Notice that book number 2 does not have to be on the first shelf.


Constraints:
`1 <= books.length <= 1000`
`1 <= books[i][0] <= shelf_width <= 1000`
`1 <= books[i][1] <= 1000`', false, 'Medium', NULL, 57.5, 
   13.3, 'https://leetcode.com/problems/filling-bookcase-shelves', 222, 23, 40.1, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   842, 54, 94, true, '[]'::jsonb, true),
  (1106, 'Parsing A Boolean Expression', 'Return the result of evaluating a given boolean `expression`, represented as a string.

An expression can either be:
`"t"`, evaluating to `True`;
`"f"`, evaluating to `False`;
`"!(expr)"`, evaluating to the logical NOT of the inner expression `expr`;
`"&(expr1,expr2,...)"`, evaluating to the logical AND of 2 or more inner expressions `expr1, expr2, ...`;
`"|(expr1,expr2,...)"`, evaluating to the logical OR of 2 or more inner expressions `expr1, expr2, ...`

Example 1:
Input: expression = "!(f)"
Output: true

Example 2:
Input: expression = "|(f,t)"
Output: true

Example 3:
Input: expression = "&(t,f)"
Output: false

Example 4:
Input: expression = "|(&(t,f,t),!(t))"
Output: false

Constraints:
`1 <= expression.length <= 20000`
`expression[i]` consists of characters in `{''('', '')'', ''&'', ''|'', ''!'', ''t'', ''f'', '',''}`.

`expression` is a valid expression representing a boolean, as given in the description.', false, 'Hard', NULL, 59.4, 
   31.8, 'https://leetcode.com/problems/parsing-a-boolean-expression', 285, 13.3, 22.4, '["Amazon"]'::jsonb, '["String"]'::jsonb, 
   341, 21, 94, true, '[]'::jsonb, true),
  (1107, 'New Users Daily Count', 'SQL Schema', true, 'Medium', NULL, 46.1, 
   0, 'https://leetcode.com/problems/new-users-daily-count', 182, 14.7, 31.9, '["Amazon"]'::jsonb, '[]'::jsonb, 
   66, 57, 54, true, '[]'::jsonb, true),
  (1108, 'Defanging an IP Address', 'Given a valid (IPv4) IP `address`, return a defanged version of that IP address.

A defanged IP address replaces every period `"."` with `"[.]"`.


Example 1:
Input: address = "1.1.1.1"
Output: "1[.]1[.]1[.]1"

Example 2:
Input: address = "255.100.50.0"
Output: "255[.]100[.]50[.]0"

Constraints:
The given `address` is a valid IPv4 address.', false, 'Easy', NULL, 88.4, 
   25.1, 'https://leetcode.com/problems/defanging-an-ip-address', 999, 298.9, 338.2, '["Adobe"]'::jsonb, '["String"]'::jsonb, 
   659, 1135, 37, false, '[]'::jsonb, true),
  (1109, 'Corporate Flight Bookings', 'There are `n` flights that are labeled from `1` to `n`.

You are given an array of flight bookings `bookings`, where `bookings[i] = [firsti, lasti, seatsi]` represents a booking for flights `firsti` through `lasti` (inclusive) with `seatsi` seats reserved for each flight in the range.

Return an array `answer` of length `n`, where `answer[i]` is the total number of seats reserved for flight `i`.


Example 1:
Input: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
Output: [10,55,45,25,25]
Explanation:
Flight labels:        1   2   3   4   5
Booking 1 reserved:  10  10
Booking 2 reserved:      20  20
Booking 3 reserved:      25  25  25  25
Total seats:         10  55  45  25  25
Hence, answer = [10,55,45,25,25]

Example 2:
Input: bookings = [[1,2,10],[2,2,15]], n = 2
Output: [10,25]
Explanation:
Flight labels:        1   2
Booking 1 reserved:  10  10
Booking 2 reserved:      15
Total seats:         10  25
Hence, answer = [10,25]

Constraints:
`1 <= n <= 2 * 104`
`1 <= bookings.length <= 2 * 104`
`bookings[i].length == 3`
`1 <= firsti <= lasti <= n`
`1 <= seatsi <= 104`', false, 'Medium', NULL, 54.3, 
   3.4, 'https://leetcode.com/problems/corporate-flight-bookings', 193, 24.6, 45.4, '["Goldman Sachs"]'::jsonb, '["Array,Math"]'::jsonb, 
   665, 123, 84, false, '[]'::jsonb, true),
  (1110, 'Delete Nodes And Return Forest', 'Given the `root` of a binary tree, each node in the tree has a distinct value.

After deleting all nodes with a value in `to_delete`, we are left with a forest (a disjoint union of trees).

Return the roots of the trees in the remaining forest. You may return the result in any order.


Example 1:
Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
Output: [[1,2,null,4],[6],[7]]

Example 2:
Input: root = [1,2,4,null,3], to_delete = [3]
Output: [[1,2,4]]

Constraints:
The number of nodes in the given tree is at most `1000`.

Each node has a distinct value between `1` and `1000`.

`to_delete.length <= 1000`
`to_delete` contains distinct values between `1` and `1000`.', false, 'Medium', NULL, 67.9, 
   31.3, 'https://leetcode.com/problems/delete-nodes-and-return-forest', 819, 96.5, 142.2, '["Google,Amazon,Facebook,Salesforce"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   1747, 54, 97, true, '[]'::jsonb, true),
  (1111, 'Maximum Nesting Depth of Two Valid Parentheses Strings', 'A string is a valid parentheses string (denoted VPS) if and only if it consists of `"("` and `")"` characters only, and:
It is the empty string, or
It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are VPS''s, or
It can be written as `(A)`, where `A` is a VPS.

We can similarly define the nesting depth `depth(S)` of any VPS `S` as follows:
`depth("") = 0`
`depth(A + B) = max(depth(A), depth(B))`, where `A` and `B` are VPS''s
`depth("(" + A + ")") = 1 + depth(A)`, where `A` is a VPS.

For example,  `""`, `"()()"`, and `"()(()())"` are VPS''s (with nesting depths 0, 1, and 2), and `")("` and `"(()"` are not VPS''s.

Given a VPS seq, split it into two disjoint subsequences `A` and `B`, such that `A` and `B` are VPS''s (and `A.length + B.length = seq.length`).

Now choose any such `A` and `B` such that `max(depth(A), depth(B))` is the minimum possible value.

Return an `answer` array (of length `seq.length`) that encodes such a choice of `A` and `B`:  `answer[i] = 0` if `seq[i]` is part of `A`, else `answer[i] = 1`.  Note that even though multiple answers may exist, you may return any of them.


Example 1:
Input: seq = "(()())"
Output: [0,1,1,1,1,0]

Example 2:
Input: seq = "()(())()"
Output: [0,0,0,1,1,0,1,1]

Constraints:
`1 <= seq.size <= 10000`', false, 'Medium', NULL, 72.7, 
   33.6, 'https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings', 186, 13.9, 19.1, '["Facebook,Bloomreach"]'::jsonb, '["Binary Search,Greedy"]'::jsonb, 
   183, 865, 17, true, '[]'::jsonb, true),
  (1112, 'Highest Grade For Each Student', 'SQL Schema', true, 'Medium', NULL, 72.4, 
   1.3, 'https://leetcode.com/problems/highest-grade-for-each-student', 196, 19.8, 27.3, '["Coursera"]'::jsonb, '[]'::jsonb, 
   114, 4, 97, false, '[]'::jsonb, true),
  (1113, 'Reported Posts', 'SQL Schema', true, 'Easy', NULL, 66, 
   1.2, 'https://leetcode.com/problems/reported-posts', 95, 18.9, 28.7, '["Facebook"]'::jsonb, '[]'::jsonb, 
   42, 183, 19, true, '[]'::jsonb, true),
  (1114, 'Print in Order', 'Suppose we have a class:
public class Foo {
  public void first() { print("first"); }
  public void second() { print("second"); }
  public void third() { print("third"); }
}
The same instance of `Foo` will be passed to three different threads. Thread A will call `first()`, thread B will call `second()`, and thread C will call `third()`. Design a mechanism and modify the program to ensure that `second()` is executed after `first()`, and `third()` is executed after `second()`.


Example 1:
Input: [1,2,3]
Output: "firstsecondthird"
Explanation: There are three threads being fired asynchronously. The input [1,2,3] means thread A calls first(), thread B calls second(), and thread C calls third(). "firstsecondthird" is the correct output.


Example 2:
Input: [1,3,2]
Output: "firstsecondthird"
Explanation: The input [1,3,2] means thread A calls first(), thread B calls third(), and thread C calls second(). "firstsecondthird" is the correct output.

Note:
We do not know how the threads will be scheduled in the operating system, even though the numbers in the input seems to imply the ordering. The input format you see is mainly to ensure our tests'' comprehensiveness.', false, 'Easy', '/articles/print-in-order', 67.2, 
   18.4, 'https://leetcode.com/problems/print-in-order', 494, 76.1, 113.1, '["Microsoft"]'::jsonb, '[]'::jsonb, 
   706, 126, 85, false, '[]'::jsonb, true),
  (1115, 'Print FooBar Alternately', 'Suppose you are given the following code:
class FooBar {
  public void foo() {
    for (int i = 0; i < n; i++) {
      print("foo");
    }
  }
  public void bar() {
    for (int i = 0; i < n; i++) {
      print("bar");
    }
  }
}
The same instance of `FooBar` will be passed to two different threads. Thread A will call `foo()` while thread B will call `bar()`. Modify the given program to output "foobar" n times.


Example 1:
Input: n = 1
Output: "foobar"
Explanation: There are two threads being fired asynchronously. One of them calls foo(), while the other calls bar(). "foobar" is being output 1 time.


Example 2:
Input: n = 2
Output: "foobarfoobar"
Explanation: "foobar" is being output 2 times.', false, 'Medium', NULL, 58.9, 
   2.1, 'https://leetcode.com/problems/print-foobar-alternately', 344, 36.8, 62.4, '[]'::jsonb, '[]'::jsonb, 
   362, 29, 93, false, '[]'::jsonb, true),
  (1116, 'Print Zero Even Odd', 'Suppose you are given the following code:
class ZeroEvenOdd {
  public ZeroEvenOdd(int n) { ... }      // constructor
  public void zero(printNumber) { ... }  // only output 0''s
  public void even(printNumber) { ... }  // only output even numbers
  public void odd(printNumber) { ... }   // only output odd numbers
}
The same instance of `ZeroEvenOdd` will be passed to three different threads:
Thread A will call `zero()` which should only output 0''s.

Thread B will call `even()` which should only ouput even numbers.

Thread C will call `odd()` which should only output odd numbers.

Each of the threads is given a `printNumber` method to output an integer. Modify the given program to output the series `010203040506`... where the length of the series must be 2n.


Example 1:
Input: n = 2
Output: "0102"
Explanation: There are three threads being fired asynchronously. One of them calls zero(), the other calls even(), and the last one calls odd(). "0102" is the correct output.


Example 2:
Input: n = 5
Output: "0102030405"', false, 'Medium', NULL, 57.7, 
   21, 'https://leetcode.com/problems/print-zero-even-odd', 312, 21.6, 37.4, '["Microsoft"]'::jsonb, '[]'::jsonb, 
   238, 165, 59, false, '[]'::jsonb, true),
  (1117, 'Building H2O', 'There are two kinds of threads, `oxygen` and `hydrogen`. Your goal is to group these threads to form water molecules. There is a barrier where each thread has to wait until a complete molecule can be formed. Hydrogen and oxygen threads will be given `releaseHydrogen` and `releaseOxygen` methods respectively, which will allow them to pass the barrier. These threads should pass the barrier in groups of three, and they must be able to immediately bond with each other to form a water molecule. You must guarantee that all the threads from one molecule bond before any other threads from the next molecule do.

In other words:
If an oxygen thread arrives at the barrier when no hydrogen threads are present, it has to wait for two hydrogen threads.

If a hydrogen thread arrives at the barrier when no other threads are present, it has to wait for an oxygen thread and another hydrogen thread.

We don’t have to worry about matching the threads up explicitly; that is, the threads do not necessarily know which other threads they are paired up with. The key is just that threads pass the barrier in complete sets; thus, if we examine the sequence of threads that bond and divide them into groups of three, each group should contain one oxygen and two hydrogen threads.

Write synchronization code for oxygen and hydrogen molecules that enforces these constraints.


Example 1:
Input: "HOH"
Output: "HHO"
Explanation: "HOH" and "OHH" are also valid answers.


Example 2:
Input: "OOHHHH"
Output: "HHOHHO"
Explanation: "HOHHHO", "OHHHHO", "HHOHOH", "HOHHOH", "OHHHOH", "HHOOHH", "HOHOHH" and "OHHOHH" are also valid answers.


Constraints:
Total length of input string will be 3n, where 1 ≤ n ≤ 20.

Total number of `H` will be 2n in the input string.

Total number of `O` will be n in the input string.', false, 'Medium', NULL, 52.9, 
   25.6, 'https://leetcode.com/problems/building-h2o', 305, 19.8, 37.4, '["LinkedIn,Amazon"]'::jsonb, '[]'::jsonb, 
   242, 74, 77, true, '[]'::jsonb, true),
  (1118, 'Number of Days in a Month', 'Given a year `Y` and a month `M`, return how many days there are in that month.


Example 1:
Input: Y = 1992, M = 7
Output: 31

Example 2:
Input: Y = 2000, M = 2
Output: 29

Example 3:
Input: Y = 1900, M = 2
Output: 28
Note:
`1583 <= Y <= 2100`
`1 <= M <= 12`', true, 'Easy', NULL, 57.4, 
   0, 'https://leetcode.com/problems/number-of-days-in-a-month', 81, 5.1, 8.9, '["Amazon"]'::jsonb, '[]'::jsonb, 
   20, 113, 15, true, '[]'::jsonb, true),
  (1119, 'Remove Vowels from a String', 'Given a string `s`, remove the vowels `''a''`, `''e''`, `''i''`, `''o''`, and `''u''` from it, and return the new string.


Example 1:
Input: s = "leetcodeisacommunityforcoders"
Output: "ltcdscmmntyfrcdrs"

Example 2:
Input: s = "aeiou"
Output: ""

Constraints:
`1 <= s.length <= 1000`
`s` consists of only lowercase English letters.', true, 'Easy', NULL, 90.5, 
   11.4, 'https://leetcode.com/problems/remove-vowels-from-a-string', 489, 64.4, 71.2, '["Amazon"]'::jsonb, '["String"]'::jsonb, 
   177, 89, 67, true, '[]'::jsonb, true),
  (1120, 'Maximum Average Subtree', 'Given the `root` of a binary tree, find the maximum average value of any subtree of that tree.

(A subtree of a tree is any node of that tree plus all its descendants. The average value of a tree is the sum of its values, divided by the number of nodes.)

Example 1:
Input: [5,6,1]
Output: 6.00000
Explanation: 
For the node with value = 5 we have an average of (5 + 6 + 1) / 3 = 4.

For the node with value = 6 we have an average of 6 / 1 = 6.

For the node with value = 1 we have an average of 1 / 1 = 1.

So the answer is 6 which is the maximum.

Note:
The number of nodes in the tree is between `1` and `5000`.

Each node will have a value between `0` and `100000`.

Answers will be accepted as correct if they are within `10^-5` of the correct answer.', true, 'Medium', '/articles/maximum-average-subtree', 63.9, 
   25, 'https://leetcode.com/problems/maximum-average-subtree', 270, 29, 45.4, '["Amazon,Facebook"]'::jsonb, '["Tree"]'::jsonb, 
   396, 14, 97, true, '[]'::jsonb, true),
  (1121, 'Divide Array Into Increasing Sequences', 'Given a non-decreasing array of positive integers `nums` and an integer `K`, find out if this array can be divided into one or more disjoint increasing subsequences of length at least `K`.


Example 1:
Input: nums = [1,2,2,3,3,4,4], K = 3
Output: true
Explanation: 
The array can be divided into the two subsequences [1,2,3,4] and [2,3,4] with lengths at least 3 each.


Example 2:
Input: nums = [5,6,6,7,8], K = 3
Output: false
Explanation: 
There is no way to divide the array using the conditions required.

Note:
`1 <= nums.length <= 10^5`
`1 <= K <= nums.length`
`1 <= nums[i] <= 10^5`', true, 'Hard', NULL, 58.3, 
   0, 'https://leetcode.com/problems/divide-array-into-increasing-sequences', 40, 3.2, 5.6, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   67, 21, 76, true, '[]'::jsonb, true),
  (1122, 'Relative Sort Array', 'Given two arrays `arr1` and `arr2`, the elements of `arr2` are distinct, and all elements in `arr2` are also in `arr1`.

Sort the elements of `arr1` such that the relative ordering of items in `arr1` are the same as in `arr2`.  Elements that don''t appear in `arr2` should be placed at the end of `arr1` in ascending order.


Example 1:
Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
Output: [2,2,2,1,4,3,3,9,6,7,19]

Constraints:
`1 <= arr1.length, arr2.length <= 1000`
`0 <= arr1[i], arr2[i] <= 1000`
All the elements of `arr2` are distinct.

Each `arr2[i]` is in `arr1`.', false, 'Easy', NULL, 68.2, 
   8.2, 'https://leetcode.com/problems/relative-sort-array', 999, 90.4, 132.7, '["Amazon,Apple"]'::jsonb, '["Array,Sort"]'::jsonb, 
   1036, 73, 93, true, '[]'::jsonb, true),
  (1123, 'Lowest Common Ancestor of Deepest Leaves', 'Given the `root` of a binary tree, return the lowest common ancestor of its deepest leaves.

Recall that:
The node of a binary tree is a leaf if and only if it has no children
The depth of the root of the tree is `0`. if the depth of a node is `d`, the depth of each of its children is `d + 1`.

The lowest common ancestor of a set `S` of nodes, is the node `A` with the largest depth such that every node in `S` is in the subtree with root `A`.

Note: This question is the same as 865: https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explanation: We return the node with value 2, colored in yellow in the diagram.

The nodes coloured in blue are the deepest leaf-nodes of the tree.

Note that nodes 6, 0, and 8 are also leaf nodes, but the depth of them is 2, but the depth of nodes 7 and 4 is 3.


Example 2:
Input: root = [1]
Output: [1]
Explanation: The root is the deepest node in the tree, and it''s the lca of itself.


Example 3:
Input: root = [0,1,3,null,2]
Output: [2]
Explanation: The deepest leaf node in the tree is 2, the lca of one node is itself.


Constraints:
The number of nodes in the tree will be in the range `[1, 1000]`.

`0 <= Node.val <= 1000`
The values of the nodes in the tree are unique.', false, 'Medium', NULL, 68, 
   11.3, 'https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves', 448, 48.3, 71.1, '["Facebook"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   661, 628, 51, true, '[]'::jsonb, true),
  (1124, 'Longest Well-Performing Interval', 'We are given `hours`, a list of the number of hours worked per day for a given employee.

A day is considered to be a tiring day if and only if the number of hours worked is (strictly) greater than `8`.

A well-performing interval is an interval of days for which the number of tiring days is strictly larger than the number of non-tiring days.

Return the length of the longest well-performing interval.


Example 1:
Input: hours = [9,9,6,0,6,6,9]
Output: 3
Explanation: The longest well-performing interval is [9,9,6].


Constraints:
`1 <= hours.length <= 10000`
`0 <= hours[i] <= 16`', false, 'Medium', NULL, 33.3, 
   9.7, 'https://leetcode.com/problems/longest-well-performing-interval', 114, 15.6, 46.7, '["Adobe"]'::jsonb, '["Stack"]'::jsonb, 
   593, 73, 89, false, '[]'::jsonb, true),
  (1125, 'Smallest Sufficient Team', 'In a project, you have a list of required skills `req_skills`, and a list of people. The `ith` person `people[i]` contains a list of skills that the person has.

Consider a sufficient team: a set of people such that for every required skill in `req_skills`, there is at least one person in the team who has that skill. We can represent these teams by the index of each person.

For example, `team = [0, 1, 3]` represents the people with skills `people[0]`, `people[1]`, and `people[3]`.

Return any sufficient team of the smallest possible size, represented by the index of each person. You may return the answer in any order.

It is guaranteed an answer exists.


Example 1:
Input: req_skills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["nodejs","reactjs"]]
Output: [0,2]

Example 2:
Input: req_skills = ["algorithms","math","java","reactjs","csharp","aws"], people = [["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]]
Output: [1,2]

Constraints:
`1 <= req_skills.length <= 16`
`1 <= req_skills[i].length <= 16`
`req_skills[i]` consists of lowercase English letters.

All the strings of `req_skills` are unique.

`1 <= people.length <= 60`
`0 <= people[i].length <= 16`
`1 <= people[i][j].length <= 16`
`people[i][j]` consists of lowercase English letters.

All the strings of `people[i]` are unique.

Every skill in `people[i]` is a skill in `req_skills`.

It is guaranteed a sufficient team exists.', false, 'Hard', NULL, 46.9, 
   7.5, 'https://leetcode.com/problems/smallest-sufficient-team', 125, 11.8, 25.1, '["Google"]'::jsonb, '["Dynamic Programming,Bit Manipulation"]'::jsonb, 
   469, 9, 98, true, '[]'::jsonb, true),
  (1126, 'Active Businesses', 'SQL Schema', true, 'Medium', NULL, 68.5, 
   2.6, 'https://leetcode.com/problems/active-businesses', 280, 18, 26.3, '["Yelp"]'::jsonb, '[]'::jsonb, 
   119, 13, 90, false, '[]'::jsonb, true),
  (1127, 'User Purchase Platform', 'SQL Schema', true, 'Hard', NULL, 50.8, 
   0, 'https://leetcode.com/problems/user-purchase-platform', 146, 7.3, 14.4, '["LinkedIn"]'::jsonb, '[]'::jsonb, 
   90, 66, 58, false, '[]'::jsonb, true),
  (1128, 'Number of Equivalent Domino Pairs', 'Given a list of `dominoes`, `dominoes[i] = [a, b]` is equivalent to `dominoes[j] = [c, d]` if and only if either (`a==c` and `b==d`), or (`a==d` and `b==c`) - that is, one domino can be rotated to be equal to another domino.

Return the number of pairs `(i, j)` for which `0 <= i < j < dominoes.length`, and `dominoes[i]` is equivalent to `dominoes[j]`.


Example 1:
Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
Output: 1

Constraints:
`1 <= dominoes.length <= 40000`
`1 <= dominoes[i][j] <= 9`', false, 'Easy', NULL, 46.3, 
   8.2, 'https://leetcode.com/problems/number-of-equivalent-domino-pairs', 334, 33.7, 72.7, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   310, 157, 66, true, '[]'::jsonb, true),
  (1129, 'Shortest Path with Alternating Colors', 'Consider a directed graph, with nodes labelled `0, 1, ..., n-1`.  In this graph, each edge is either red or blue, and there could be self-edges or parallel edges.

Each `[i, j]` in `red_edges` denotes a red directed edge from node `i` to node `j`.  Similarly, each `[i, j]` in `blue_edges` denotes a blue directed edge from node `i` to node `j`.

Return an array `answer` of length `n`, where each `answer[X]` is the length of the shortest path from node `0` to node `X` such that the edge colors alternate along the path (or `-1` if such a path doesn''t exist).


Example 1:
Input: n = 3, red_edges = [[0,1],[1,2]], blue_edges = []
Output: [0,1,-1]

Example 2:
Input: n = 3, red_edges = [[0,1]], blue_edges = [[2,1]]
Output: [0,1,-1]

Example 3:
Input: n = 3, red_edges = [[1,0]], blue_edges = [[2,1]]
Output: [0,-1,-1]

Example 4:
Input: n = 3, red_edges = [[0,1]], blue_edges = [[1,2]]
Output: [0,1,2]

Example 5:
Input: n = 3, red_edges = [[0,1],[0,2]], blue_edges = [[1,0]]
Output: [0,1,1]

Constraints:
`1 <= n <= 100`
`red_edges.length <= 400`
`blue_edges.length <= 400`
`red_edges[i].length == blue_edges[i].length == 2`
`0 <= red_edges[i][j], blue_edges[i][j] < n`', false, 'Medium', NULL, 40.5, 
   5, 'https://leetcode.com/problems/shortest-path-with-alternating-colors', 304, 21.9, 54.2, '["Amazon"]'::jsonb, '["Breadth-first Search,Graph"]'::jsonb, 
   651, 37, 95, true, '[]'::jsonb, true),
  (1130, 'Minimum Cost Tree From Leaf Values', 'Given an array `arr` of positive integers, consider all binary trees such that:
Each node has either 0 or 2 children;
The values of `arr` correspond to the values of each leaf in an in-order traversal of the tree.  (Recall that a node is a leaf if and only if it has 0 children.)
The value of each non-leaf node is equal to the product of the largest leaf value in its left and right subtree respectively.

Among all possible binary trees considered, return the smallest possible sum of the values of each non-leaf node.  It is guaranteed this sum fits into a 32-bit integer.


Example 1:
Input: arr = [6,2,4]
Output: 32
Explanation:
There are two possible trees.  The first has non-leaf node sum 36, and the second has non-leaf node sum 32.

    24            24
   /  \\          /  \\
  12   4        6    8
 /  \\               / \\
6    2             2   4

Constraints:
`2 <= arr.length <= 40`
`1 <= arr[i] <= 15`
It is guaranteed that the answer fits into a 32-bit signed integer (ie. it is less than `2^31`).', false, 'Medium', NULL, 67.3, 
   46.5, 'https://leetcode.com/problems/minimum-cost-tree-from-leaf-values', 337, 51.1, 75.8, '["Amazon,Bloomberg"]'::jsonb, '["Dynamic Programming,Stack,Tree"]'::jsonb, 
   2035, 157, 93, true, '[]'::jsonb, true),
  (1131, 'Maximum of Absolute Value Expression', 'Given two arrays of integers with equal lengths, return the maximum value of:
`|arr1[i] - arr1[j]| + |arr2[i] - arr2[j]| + |i - j|`
where the maximum is taken over all `0 <= i, j < arr1.length`.


Example 1:
Input: arr1 = [1,2,3,4], arr2 = [-1,4,5,6]
Output: 13

Example 2:
Input: arr1 = [1,-2,-5,0,10], arr2 = [0,-2,-1,-7,-4]
Output: 20

Constraints:
`2 <= arr1.length == arr2.length <= 40000`
`-10^6 <= arr1[i], arr2[i] <= 10^6`', false, 'Medium', NULL, 51.6, 
   13.3, 'https://leetcode.com/problems/maximum-of-absolute-value-expression', 99, 11.9, 23, '["Google"]'::jsonb, '["Math,Bit Manipulation"]'::jsonb, 
   304, 258, 54, true, '[]'::jsonb, true),
  (1132, 'Reported Posts II', 'SQL Schema', true, 'Medium', NULL, 34.6, 
   1.5, 'https://leetcode.com/problems/reported-posts-ii', 173, 16, 46.3, '["Facebook"]'::jsonb, '[]'::jsonb, 
   80, 240, 25, true, '[]'::jsonb, true),
  (1133, 'Largest Unique Number', 'Given an array of integers `A`, return the largest integer that only occurs once.

If no integer occurs once, return -1.


Example 1:
Input: [5,7,3,9,4,9,8,3,1]
Output: 8
Explanation: 
The maximum integer in the array is 9 but it is repeated. The number 8 occurs only once, so it''s the answer.


Example 2:
Input: [9,9,8,8]
Output: -1
Explanation: 
There is no number that occurs only once.

Note:
`1 <= A.length <= 2000`
`0 <= A[i] <= 1000`', true, 'Easy', '/articles/largest-unique-number', 67.9, 
   0, 'https://leetcode.com/problems/largest-unique-number', 231, 23.2, 34.1, '["Amazon"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   178, 15, 92, true, '[]'::jsonb, true),
  (1134, 'Armstrong Number', 'Given an integer `n`, return `true` if and only if it is an Armstrong number.

The `k`-digit number `n` is an Armstrong number if and only if the `kth` power of each digit sums to `n`.


Example 1:
Input: n = 153
Output: true
Explanation: 153 is a 3-digit number, and 153 = 13 + 53 + 33.


Example 2:
Input: n = 123
Output: false
Explanation: 123 is a 3-digit number, and 123 != 13 + 23 + 33 = 36.


Constraints:
`1 <= n <= 108`', true, 'Easy', '/articles/armstrong-number', 78.1, 
   0, 'https://leetcode.com/problems/armstrong-number', 249, 18.3, 23.4, '["Amazon"]'::jsonb, '["Math"]'::jsonb, 
   91, 13, 88, true, '[]'::jsonb, true),
  (1135, 'Connecting Cities With Minimum Cost', 'There are `N` cities numbered from 1 to `N`.

You are given `connections`, where each `connections[i] = [city1, city2, cost]` represents the cost to connect `city1` and `city2` together.  (A connection is bidirectional: connecting `city1` and `city2` is the same as connecting `city2` and `city1`.)
Return the minimum cost so that for every pair of cities, there exists a path of connections (possibly of length 1) that connects those two cities together.  The cost is the sum of the connection costs used. If the task is impossible, return -1.


Example 1:
Input: N = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]
Output: 6
Explanation: 
Choosing any 2 edges will connect all cities so we choose the minimum 2.


Example 2:
Input: N = 4, connections = [[1,2,3],[3,4,4]]
Output: -1
Explanation: 
There is no way to connect all cities even if all edges are used.

Note:
`1 <= N <= 10000`
`1 <= connections.length <= 10000`
`1 <= connections[i][0], connections[i][1] <= N`
`0 <= connections[i][2] <= 10^5`
`connections[i][0] != connections[i][1]`', true, 'Medium', '/articles/connecting-cities-with-minimum-cost', 59.6, 
   29.4, 'https://leetcode.com/problems/connecting-cities-with-minimum-cost', 189, 26, 43.7, '["Amazon,Uber"]'::jsonb, '["Union Find,Graph"]'::jsonb, 
   471, 17, 97, true, '[]'::jsonb, true),
  (1136, 'Parallel Courses', 'You are given an integer `n` which indicates that we have `n` courses, labeled from `1` to `n`. You are also given an array `relations` where `relations[i] = [a, b]`, representing a prerequisite relationship between course `a` and course `b`: course `a` has to be studied before course `b`.

In one semester, you can study any number of courses as long as you have studied all the prerequisites for the course you are studying.

Return the minimum number of semesters needed to study all courses. If there is no way to study all the courses, return `-1`.


Example 1:
Input: n = 3, relations = [[1,3],[2,3]]
Output: 2
Explanation: In the first semester, courses 1 and 2 are studied. In the second semester, course 3 is studied.


Example 2:
Input: n = 3, relations = [[1,2],[2,3],[3,1]]
Output: -1
Explanation: No course can be studied because they depend on each other.


Constraints:
`1 <= n <= 5000`
`1 <= relations.length <= 5000`
`1 <= a, b <= n`
`a != b`
All the pairs `[a, b]` are unique.', true, 'Medium', '/articles/parallel-courses', 61.3, 
   4.2, 'https://leetcode.com/problems/parallel-courses', 192, 17.9, 29.3, '["Google,Uber"]'::jsonb, '["Dynamic Programming,Depth-first Search,Graph"]'::jsonb, 
   362, 13, 97, true, '[]'::jsonb, true),
  (1137, 'N-th Tribonacci Number', 'The Tribonacci sequence Tn is defined as follows: 
T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

Given `n`, return the value of Tn.


Example 1:
Input: n = 4
Output: 4
Explanation:
T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4

Example 2:
Input: n = 25
Output: 1389537

Constraints:
`0 <= n <= 37`
The answer is guaranteed to fit within a 32-bit integer, ie. `answer <= 2^31 - 1`.', false, 'Easy', '/articles/n-th-tribonacci-number', 56.1, 
   5.6, 'https://leetcode.com/problems/n-th-tribonacci-number', 807, 71.7, 127.8, '["Facebook"]'::jsonb, '["Recursion"]'::jsonb, 
   515, 53, 91, true, '[]'::jsonb, true),
  (1138, 'Alphabet Board Path', 'On an alphabet board, we start at position `(0, 0)`, corresponding to character `board[0][0]`.

Here, `board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]`, as shown in the diagram below.

We may make the following moves:
`''U''` moves our position up one row, if the position exists on the board;
`''D''` moves our position down one row, if the position exists on the board;
`''L''` moves our position left one column, if the position exists on the board;
`''R''` moves our position right one column, if the position exists on the board;
`''!''` adds the character `board[r][c]` at our current position `(r, c)` to the answer.

(Here, the only positions that exist on the board are positions with letters on them.)
Return a sequence of moves that makes our answer equal to `target` in the minimum number of moves.  You may return any path that does so.


Example 1:
Input: target = "leet"
Output: "DDR!UURRR!!DDD!"

Example 2:
Input: target = "code"
Output: "RR!DDRR!UUL!R!"

Constraints:
`1 <= target.length <= 100`
`target` consists only of English lowercase letters.', false, 'Medium', NULL, 51.4, 
   15.5, 'https://leetcode.com/problems/alphabet-board-path', 397, 27.3, 53.1, '["Google,Amazon"]'::jsonb, '["Hash Table,String"]'::jsonb, 
   423, 106, 80, true, '[]'::jsonb, true),
  (1139, 'Largest 1-Bordered Square', 'Given a 2D `grid` of `0`s and `1`s, return the number of elements in the largest square subgrid that has all `1`s on its border, or `0` if such a subgrid doesn''t exist in the `grid`.


Example 1:
Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
Output: 9

Example 2:
Input: grid = [[1,1,0,0]]
Output: 1

Constraints:
`1 <= grid.length <= 100`
`1 <= grid[0].length <= 100`
`grid[i][j]` is `0` or `1`', false, 'Medium', NULL, 48.7, 
   7.2, 'https://leetcode.com/problems/largest-1-bordered-square', 145, 13.3, 27.4, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   303, 61, 83, true, '[]'::jsonb, true),
  (1140, 'Stone Game II', 'Alice and Bob continue their games with piles of stones.  There are a number of piles arranged in a row, and each pile has a positive integer number of stones `piles[i]`.  The objective of the game is to end with the most stones. 
Alice and Bob take turns, with Alice starting first.  Initially, `M = 1`.

On each player''s turn, that player can take all the stones in the first `X` remaining piles, where `1 <= X <= 2M`.  Then, we set `M = max(M, X)`.

The game continues until all the stones have been taken.

Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.


Example 1:
Input: piles = [2,7,9,4,4]
Output: 10
Explanation:  If Alice takes one pile at the beginning, Bob takes two piles, then Alice takes 2 piles again. Alice can get 2 + 4 + 4 = 10 piles in total. If Alice takes two piles at the beginning, then Bob can take all three piles left. In this case, Alice get 2 + 7 = 9 piles in total. So we return 10 since it''s larger. 

Example 2:
Input: piles = [1,2,3,4,5,100]
Output: 104

Constraints:
`1 <= piles.length <= 100`
`1 <= piles[i] <= 104`', false, 'Medium', NULL, 64.7, 
   23.1, 'https://leetcode.com/problems/stone-game-ii', 247, 26.3, 40.7, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   760, 182, 81, true, '[]'::jsonb, true),
  (1141, 'User Activity for the Past 30 Days I', 'SQL Schema', true, 'Easy', NULL, 54.5, 
   3.9, 'https://leetcode.com/problems/user-activity-for-the-past-30-days-i', 108, 18.8, 34.5, '["Zoom"]'::jsonb, '[]'::jsonb, 
   49, 38, 56, false, '[]'::jsonb, true),
  (1142, 'User Activity for the Past 30 Days II', 'SQL Schema', true, 'Easy', NULL, 35.4, 
   1.4, 'https://leetcode.com/problems/user-activity-for-the-past-30-days-ii', 178, 19.2, 54.3, '["Facebook,Zoom"]'::jsonb, '[]'::jsonb, 
   49, 182, 21, true, '[]'::jsonb, true),
  (1143, 'Longest Common Subsequence', 'Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return `0`.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, `"ace"` is a subsequence of `"abcde"`.

A common subsequence of two strings is a subsequence that is common to both strings.


Example 1:
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.


Example 2:
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.


Example 3:
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.


Constraints:
`1 <= text1.length, text2.length <= 1000`
`text1` and `text2` consist of only lowercase English characters.', false, 'Medium', '/articles/longest-common-subsequence', 58.7, 
   28, 'https://leetcode.com/problems/longest-common-subsequence', 871, 191.7, 326.6, '["Amazon,Microsoft,eBay"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   2799, 36, 99, true, '[]'::jsonb, true),
  (1144, 'Decrease Elements To Make Array Zigzag', 'Given an array `nums` of integers, a move consists of choosing any element and decreasing it by 1.

An array `A` is a zigzag array if either:
Every even-indexed element is greater than adjacent elements, ie. `A[0] > A[1] < A[2] > A[3] < A[4] > ...`
OR, every odd-indexed element is greater than adjacent elements, ie. `A[0] < A[1] > A[2] < A[3] > A[4] < ...`
Return the minimum number of moves to transform the given array `nums` into a zigzag array.


Example 1:
Input: nums = [1,2,3]
Output: 2
Explanation: We can decrease 2 to 0 or 3 to 1.


Example 2:
Input: nums = [9,6,1,6,2]
Output: 4

Constraints:
`1 <= nums.length <= 1000`
`1 <= nums[i] <= 1000`', false, 'Medium', NULL, 46.2, 
   21.5, 'https://leetcode.com/problems/decrease-elements-to-make-array-zigzag', 140, 11.1, 24.1, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   174, 119, 59, true, '[]'::jsonb, true),
  (1145, 'Binary Tree Coloring Game', 'Two players play a turn based game on a binary tree.  We are given the `root` of this binary tree, and the number of nodes `n` in the tree.  `n` is odd, and each node has a distinct value from `1` to `n`.

Initially, the first player names a value `x` with `1 <= x <= n`, and the second player names a value `y` with `1 <= y <= n` and `y != x`.  The first player colors the node with value `x` red, and the second player colors the node with value `y` blue.

Then, the players take turns starting with the first player.  In each turn, that player chooses a node of their color (red if player 1, blue if player 2) and colors an uncolored neighbor of the chosen node (either the left child, right child, or parent of the chosen node.)
If (and only if) a player cannot choose such a node in this way, they must pass their turn.  If both players pass their turn, the game ends, and the winner is the player that colored more nodes.

You are the second player.  If it is possible to choose such a `y` to ensure you win the game, return `true`.  If it is not possible, return `false`.


Example 1:
Input: root = [1,2,3,4,5,6,7,8,9,10,11], n = 11, x = 3
Output: true
Explanation: The second player can choose the node with value 2.


Constraints:
`root` is the root of a binary tree with `n` nodes and distinct node values from `1` to `n`.

`n` is odd.

`1 <= x <= n <= 100`', false, 'Medium', NULL, 51.3, 
   6.3, 'https://leetcode.com/problems/binary-tree-coloring-game', 255, 25.9, 50.5, '["Google,Bloomberg"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   630, 134, 82, true, '[]'::jsonb, true),
  (1146, 'Snapshot Array', 'Implement a SnapshotArray that supports the following interface:
`SnapshotArray(int length)` initializes an array-like data structure with the given length.  Initially, each element equals 0.

`void set(index, val)` sets the element at the given `index` to be equal to `val`.

`int snap()` takes a snapshot of the array and returns the `snap_id`: the total number of times we called `snap()` minus `1`.

`int get(index, snap_id)` returns the value at the given `index`, at the time we took the snapshot with the given `snap_id`

Example 1:
Input: ["SnapshotArray","set","snap","set","get"]
[[3],[0,5],[],[0,6],[0,0]]
Output: [null,null,0,null,5]
Explanation: 
SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
snapshotArr.set(0,5);  // Set array[0] = 5
snapshotArr.snap();  // Take a snapshot, return snap_id = 0
snapshotArr.set(0,6);
snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5

Constraints:
`1 <= length <= 50000`
At most `50000` calls will be made to `set`, `snap`, and `get`.

`0 <= index < length`
`0 <= snap_id < `(the total number of times we call `snap()`)
`0 <= val <= 10^9`', false, 'Medium', NULL, 36.8, 
   49.5, 'https://leetcode.com/problems/snapshot-array', 381, 52.1, 141.5, '["Google,Rubrik"]'::jsonb, '["Array"]'::jsonb, 
   826, 156, 84, true, '[]'::jsonb, true),
  (1147, 'Longest Chunked Palindrome Decomposition', 'You are given a string `text`. You should split it to k substrings `(subtext1, subtext2, ..., subtextk)` such that:
`subtexti` is a non-empty string.

The concatenation of all the substrings is equal to `text` (i.e., `subtext1 + subtext2 + ... + subtextk == text`).

`subtexti == subtextk - i + 1` for all valid values of `i` (i.e., `1 <= i <= k`).

Return the largest possible value of `k`.


Example 1:
Input: text = "ghiabcdefhelloadamhelloabcdefghi"
Output: 7
Explanation: We can split the string on "(ghi)(abcdef)(hello)(adam)(hello)(abcdef)(ghi)".


Example 2:
Input: text = "merchant"
Output: 1
Explanation: We can split the string on "(merchant)".


Example 3:
Input: text = "antaprezatepzapreanta"
Output: 11
Explanation: We can split the string on "(a)(nt)(a)(pre)(za)(tpe)(za)(pre)(a)(nt)(a)".


Example 4:
Input: text = "aaa"
Output: 3
Explanation: We can split the string on "(a)(a)(a)".


Constraints:
`1 <= text.length <= 1000`
`text` consists only of lowercase English characters.', false, 'Hard', NULL, 59.5, 
   0, 'https://leetcode.com/problems/longest-chunked-palindrome-decomposition', 205, 12.3, 20.6, '["Google"]'::jsonb, '["Dynamic Programming,Rolling Hash"]'::jsonb, 
   264, 16, 94, true, '[]'::jsonb, true),
  (1148, 'Article Views I', 'SQL Schema', true, 'Easy', NULL, 77.1, 
   0, 'https://leetcode.com/problems/article-views-i', 93, 21.2, 27.5, '["LinkedIn"]'::jsonb, '[]'::jsonb, 
   49, 10, 83, false, '[]'::jsonb, true),
  (1149, 'Article Views II', 'SQL Schema', true, 'Medium', NULL, 48.3, 
   0, 'https://leetcode.com/problems/article-views-ii', 120, 13.8, 28.6, '["LinkedIn"]'::jsonb, '[]'::jsonb, 
   54, 18, 75, false, '[]'::jsonb, true),
  (1150, 'Check If a Number Is Majority Element in a Sorted Array', 'Given an array `nums` sorted in non-decreasing order, and a number `target`, return `True` if and only if `target` is a majority element.

A majority element is an element that appears more than `N/2` times in an array of length `N`.


Example 1:
Input: nums = [2,4,5,5,5,5,5,6,6], target = 5
Output: true
Explanation: 
The value 5 appears 5 times and the length of the array is 9.

Thus, 5 is a majority element because 5 > 9/2 is true.


Example 2:
Input: nums = [10,100,101,101], target = 101
Output: false
Explanation: 
The value 101 appears 2 times and the length of the array is 4.

Thus, 101 is not a majority element because 2 > 4/2 is false.


Constraints:
`1 <= nums.length <= 1000`
`1 <= nums[i] <= 10^9`
`1 <= target <= 10^9`', true, 'Easy', NULL, 57.2, 
   4.4, 'https://leetcode.com/problems/check-if-a-number-is-majority-element-in-a-sorted-array', 271, 20.8, 36.3, '["Facebook"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   191, 25, 88, true, '[]'::jsonb, true),
  (1151, 'Minimum Swaps to Group All 1''s Together', 'Given a binary array `data`, return the minimum number of swaps required to group all `1`’s present in the array together in any place in the array.


Example 1:
Input: data = [1,0,1,0,1]
Output: 1
Explanation: 
There are 3 ways to group all 1''s together:
[1,1,1,0,0] using 1 swap.

[0,1,1,1,0] using 2 swaps.

[0,0,1,1,1] using 1 swap.

The minimum is 1.


Example 2:
Input: data = [0,0,0,1,0]
Output: 0
Explanation: 
Since there is only one 1 in the array, no swaps needed.


Example 3:
Input: data = [1,0,1,0,1,0,0,1,1,0,1]
Output: 3
Explanation: 
One possible solution that uses 3 swaps is [0,0,0,0,0,1,1,1,1,1,1].


Example 4:
Input: data = [1,0,1,0,1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,1,1,0,1,0,1,1,0,0,0,1,1,1,1,0,0,1]
Output: 8

Constraints:
`1 <= data.length <= 105`
`data[i]` is `0` or `1`.', true, 'Medium', '/articles/minimum-swaps-to-group-all-1s-together', 58.8, 
   34.2, 'https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together', 155, 10.4, 17.7, '["IBM,Twitter"]'::jsonb, '["Array,Sliding Window"]'::jsonb, 
   330, 2, 99, false, '[]'::jsonb, true),
  (1152, 'Analyze User Website Visit Pattern', 'We are given some website visits: the user with name `username[i]` visited the website `website[i]` at time `timestamp[i]`.

A 3-sequence is a list of websites of length 3 sorted in ascending order by the time of their visits.  (The websites in a 3-sequence are not necessarily distinct.)
Find the 3-sequence visited by the largest number of users. If there is more than one solution, return the lexicographically smallest such 3-sequence.


Example 1:
Input: username = ["joe","joe","joe","james","james","james","james","mary","mary","mary"], timestamp = [1,2,3,4,5,6,7,8,9,10], website = ["home","about","career","home","cart","maps","home","home","about","career"]
Output: ["home","about","career"]
Explanation: 
The tuples in this example are:
["joe", 1, "home"]
["joe", 2, "about"]
["joe", 3, "career"]
["james", 4, "home"]
["james", 5, "cart"]
["james", 6, "maps"]
["james", 7, "home"]
["mary", 8, "home"]
["mary", 9, "about"]
["mary", 10, "career"]
The 3-sequence ("home", "about", "career") was visited at least once by 2 users.

The 3-sequence ("home", "cart", "maps") was visited at least once by 1 user.

The 3-sequence ("home", "cart", "home") was visited at least once by 1 user.

The 3-sequence ("home", "maps", "home") was visited at least once by 1 user.

The 3-sequence ("cart", "maps", "home") was visited at least once by 1 user.

Note:
`3 <= N = username.length = timestamp.length = website.length <= 50`
`1 <= username[i].length <= 10`
`0 <= timestamp[i] <= 10^9`
`1 <= website[i].length <= 10`
Both `username[i]` and `website[i]` contain only lowercase characters.

It is guaranteed that there is at least one user who visited at least 3 websites.

No user visits two websites at the same time.', true, 'Medium', NULL, 43.1, 
   69.8, 'https://leetcode.com/problems/analyze-user-website-visit-pattern', 220, 30.2, 70.2, '["Amazon,Spotify,DoorDash"]'::jsonb, '["Array,Hash Table,Sort"]'::jsonb, 
   169, 1504, 10, true, '[]'::jsonb, true),
  (1153, 'String Transforms Into Another String', 'Given two strings `str1` and `str2` of the same length, determine whether you can transform `str1` into `str2` by doing zero or more conversions.

In one conversion you can convert all occurrences of one character in `str1` to any other lowercase English character.

Return `true` if and only if you can transform `str1` into `str2`.


Example 1:
Input: str1 = "aabcc", str2 = "ccdee"
Output: true
Explanation: Convert ''c'' to ''e'' then ''b'' to ''d'' then ''a'' to ''c''. Note that the order of conversions matter.


Example 2:
Input: str1 = "leetcode", str2 = "codeleet"
Output: false
Explanation: There is no way to transform str1 to str2.


Constraints:
`1 <= str1.length == str2.length <= 104`
`str1` and `str2` contain only lowercase English letters.', true, 'Hard', NULL, 35.8, 
   47.8, 'https://leetcode.com/problems/string-transforms-into-another-string', 176, 34.8, 97.2, '["Google,ByteDance"]'::jsonb, '["Graph"]'::jsonb, 
   572, 214, 73, true, '[]'::jsonb, true),
  (1154, 'Day of the Year', 'Given a string `date` representing a Gregorian calendar date formatted as `YYYY-MM-DD`, return the day number of the year.


Example 1:
Input: date = "2019-01-09"
Output: 9
Explanation: Given date is the 9th day of the year in 2019.


Example 2:
Input: date = "2019-02-10"
Output: 41

Example 3:
Input: date = "2003-03-01"
Output: 60

Example 4:
Input: date = "2004-03-01"
Output: 61

Constraints:
`date.length == 10`
`date[4] == date[7] == ''-''`, and all other `date[i]`''s are digits
`date` represents a calendar date between Jan 1st, 1900 and Dec 31, 2019.', false, 'Easy', NULL, 49.1, 
   9.6, 'https://leetcode.com/problems/day-of-the-year', 338, 22.9, 46.7, '["ZScaler"]'::jsonb, '["Math"]'::jsonb, 
   150, 218, 41, false, '[]'::jsonb, true),
  (1155, 'Number of Dice Rolls With Target Sum', 'You have `d` dice, and each die has `f` faces numbered `1, 2, ..., f`.

Return the number of possible ways (out of `fd` total ways) modulo `10^9 + 7` to roll the dice so the sum of the face up numbers equals `target`.


Example 1:
Input: d = 1, f = 6, target = 3
Output: 1
Explanation: 
You throw one die with 6 faces.  There is only one way to get a sum of 3.


Example 2:
Input: d = 2, f = 6, target = 7
Output: 6
Explanation: 
You throw two dice, each with 6 faces.  There are 6 ways to get a sum of 7:
1+6, 2+5, 3+4, 4+3, 5+2, 6+1.


Example 3:
Input: d = 2, f = 5, target = 10
Output: 1
Explanation: 
You throw two dice, each with 5 faces.  There is only one way to get a sum of 10: 5+5.


Example 4:
Input: d = 1, f = 2, target = 3
Output: 0
Explanation: 
You throw one die with 2 faces.  There is no way to get a sum of 3.


Example 5:
Input: d = 30, f = 30, target = 500
Output: 222616187
Explanation: 
The answer must be returned modulo 10^9 + 7.


Constraints:
`1 <= d, f <= 30`
`1 <= target <= 1000`', false, 'Medium', NULL, 47.6, 
   27.6, 'https://leetcode.com/problems/number-of-dice-rolls-with-target-sum', 470, 68.4, 143.7, '["Amazon,Microsoft,ByteDance"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1230, 59, 95, true, '[]'::jsonb, true),
  (1156, 'Swap For Longest Repeated Character Substring', 'Given a string `text`, we are allowed to swap two of the characters in the string. Find the length of the longest substring with repeated characters.


Example 1:
Input: text = "ababa"
Output: 3
Explanation: We can swap the first ''b'' with the last ''a'', or the last ''b'' with the first ''a''. Then, the longest repeated character substring is "aaa", which its length is 3.


Example 2:
Input: text = "aaabaaa"
Output: 6
Explanation: Swap ''b'' with the last ''a'' (or the first ''a''), and we get longest repeated character substring "aaaaaa", which its length is 6.


Example 3:
Input: text = "aaabbaaa"
Output: 4

Example 4:
Input: text = "aaaaa"
Output: 5
Explanation: No need to swap, longest repeated character substring is "aaaaa", length is 5.


Example 5:
Input: text = "abcdef"
Output: 1

Constraints:
`1 <= text.length <= 20000`
`text` consist of lowercase English characters only.', false, 'Medium', NULL, 47.1, 
   15.1, 'https://leetcode.com/problems/swap-for-longest-repeated-character-substring', 172, 16.3, 34.5, '["Amazon"]'::jsonb, '["String"]'::jsonb, 
   463, 42, 92, true, '[]'::jsonb, true),
  (1157, 'Online Majority Element In Subarray', 'Implementing the class `MajorityChecker`, which has the following API:
`MajorityChecker(int[] arr)` constructs an instance of MajorityChecker with the given array `arr`;
`int query(int left, int right, int threshold)` has arguments such that:
	
`0 <= left <= right < arr.length` representing a subarray of `arr`;
`2 * threshold > right - left + 1`, ie. the threshold is always a strict majority of the length of the subarray
Each `query(...)` returns the element in `arr[left], arr[left+1], ..., arr[right]` that occurs at least `threshold` times, or `-1` if no such element exists.


Example:
MajorityChecker majorityChecker = new MajorityChecker([1,1,2,2,1,1]);
majorityChecker.query(0,5,4); // returns 1
majorityChecker.query(0,3,3); // returns -1
majorityChecker.query(2,3,2); // returns 2

Constraints:
`1 <= arr.length <= 20000`
`1 <= arr[i] <= 20000`
For each query, `0 <= left <= right < len(arr)`
For each query, `2 * threshold > right - left + 1`
The number of queries is at most `10000`', false, 'Hard', NULL, 40.7, 
   2, 'https://leetcode.com/problems/online-majority-element-in-subarray', 84, 9.5, 23.4, '["Google,Nutanix"]'::jsonb, '["Array,Binary Search,Segment Tree"]'::jsonb, 
   302, 34, 90, true, '[]'::jsonb, true),
  (1158, 'Market Analysis I', 'SQL Schema', true, 'Medium', NULL, 64.2, 
   0, 'https://leetcode.com/problems/market-analysis-i', 169, 14.6, 22.7, '["Poshmark"]'::jsonb, '[]'::jsonb, 
   57, 24, 70, false, '[]'::jsonb, true),
  (1159, 'Market Analysis II', 'SQL Schema', true, 'Hard', NULL, 56.4, 
   2.6, 'https://leetcode.com/problems/market-analysis-ii', 205, 8.3, 14.6, '["Poshmark"]'::jsonb, '[]'::jsonb, 
   55, 22, 71, false, '[]'::jsonb, true),
  (1160, 'Find Words That Can Be Formed by Characters', 'You are given an array of strings `words` and a string `chars`.

A string is good if it can be formed by characters from `chars` (each character can only be used once).

Return the sum of lengths of all good strings in `words`.


Example 1:
Input: words = ["cat","bt","hat","tree"], chars = "atach"
Output: 6
Explanation: 
The strings that can be formed are "cat" and "hat" so the answer is 3 + 3 = 6.


Example 2:
Input: words = ["hello","world","leetcode"], chars = "welldonehoneyr"
Output: 10
Explanation: 
The strings that can be formed are "hello" and "world" so the answer is 5 + 5 = 10.

Note:
`1 <= words.length <= 1000`
`1 <= words[i].length, chars.length <= 100`
All strings contain lowercase English letters only.', false, 'Easy', NULL, 67.9, 
   16.7, 'https://leetcode.com/problems/find-words-that-can-be-formed-by-characters', 764, 76.6, 112.8, '["Amazon"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   592, 92, 87, true, '[]'::jsonb, true),
  (1161, 'Maximum Level Sum of a Binary Tree', 'Given the `root` of a binary tree, the level of its root is `1`, the level of its children is `2`, and so on.

Return the smallest level `x` such that the sum of all the values of nodes at level `x` is maximal.


Example 1:
Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.

Level 2 sum = 7 + 0 = 7.

Level 3 sum = 7 + -8 = -1.

So we return the level with the maximum sum which is level 2.


Example 2:
Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
Output: 2

Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-105 <= Node.val <= 105`', false, 'Medium', '/articles/maximum-level-sum-of-a-binary-tree', 69, 
   11.8, 'https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree', 684, 65.9, 95.5, '["Amazon,Facebook"]'::jsonb, '["Tree,Breadth-first Search"]'::jsonb, 
   741, 40, 95, true, '[]'::jsonb, true),
  (1162, 'As Far from Land as Possible', 'Given an `n x n` `grid` containing only values `0` and `1`, where `0` represents water and `1` represents land, find a water cell such that its distance to the nearest land cell is maximized, and return the distance. If no land or water exists in the grid, return `-1`.

The distance used in this problem is the Manhattan distance: the distance between two cells `(x0, y0)` and `(x1, y1)` is `|x0 - x1| + |y0 - y1|`.


Example 1:
Input: grid = [[1,0,1],[0,0,0],[1,0,1]]
Output: 2
Explanation: The cell (1, 1) is as far as possible from all the land with distance 2.


Example 2:
Input: grid = [[1,0,0],[0,0,0],[0,0,0]]
Output: 4
Explanation: The cell (2, 2) is as far as possible from all the land with distance 4.


Constraints:
`n == grid.length`
`n == grid[i].length`
`1 <= n <= 100`
`grid[i][j]` is `0` or `1`', false, 'Medium', NULL, 45.6, 
   9.6, 'https://leetcode.com/problems/as-far-from-land-as-possible', 317, 33.1, 72.5, '["Facebook,Google"]'::jsonb, '["Breadth-first Search,Graph"]'::jsonb, 
   829, 35, 96, true, '[]'::jsonb, true),
  (1163, 'Last Substring in Lexicographical Order', 'Given a string `s`, return the last substring of `s` in lexicographical order.


Example 1:
Input: s = "abab"
Output: "bab"
Explanation: The substrings are ["a", "ab", "aba", "abab", "b", "ba", "bab"]. The lexicographically maximum substring is "bab".


Example 2:
Input: s = "leetcode"
Output: "tcode"

Constraints:
`1 <= s.length <= 4 * 105`
`s` contains only lowercase English letters.', false, 'Hard', NULL, 36.3, 
   48.7, 'https://leetcode.com/problems/last-substring-in-lexicographical-order', 233, 24.3, 66.8, '["Goldman Sachs,Salesforce"]'::jsonb, '["String,Suffix Array"]'::jsonb, 
   317, 358, 47, false, '[]'::jsonb, true),
  (1164, 'Product Price at a Given Date', 'SQL Schema', true, 'Medium', NULL, 69, 
   6.1, 'https://leetcode.com/problems/product-price-at-a-given-date', 242, 15.3, 22.2, '["Amazon"]'::jsonb, '[]'::jsonb, 
   143, 36, 80, true, '[]'::jsonb, true),
  (1165, 'Single-Row Keyboard', 'There is a special keyboard with all keys in a single row.

Given a string `keyboard` of length `26` indicating the layout of the keyboard (indexed from `0` to `25`). Initially, your finger is at index `0`. To type a character, you have to move your finger to the index of the desired character. The time taken to move your finger from index `i` to index `j` is `|i - j|`.

You want to type a string `word`. Write a function to calculate how much time it takes to type it with one finger.


Example 1:
Input: keyboard = "abcdefghijklmnopqrstuvwxyz", word = "cba"
Output: 4
Explanation: The index moves from 0 to 2 to write ''c'' then to 1 to write ''b'' then to 0 again to write ''a''.

Total time = 2 + 1 + 1 = 4. 

Example 2:
Input: keyboard = "pqrstuvwxyzabcdefghijklmno", word = "leetcode"
Output: 73

Constraints:
`keyboard.length == 26`
`keyboard` contains each English lowercase letter exactly once in some order.

`1 <= word.length <= 104`
`word[i]` is an English lowercase letter.', true, 'Easy', '/articles/single-row-keyboard', 85.4, 
   0, 'https://leetcode.com/problems/single-row-keyboard', 405, 45.9, 53.7, '["Google"]'::jsonb, '["String"]'::jsonb, 
   266, 14, 95, true, '[]'::jsonb, true),
  (1166, 'Design File System', 'You are asked to design a file system that allows you to create new paths and associate them with different values.

The format of a path is one or more concatenated strings of the form: `/` followed by one or more lowercase English letters. For example, "`/leetcode"` and "`/leetcode/problems"` are valid paths while an empty string `""` and `"/"` are not.

Implement the `FileSystem` class:
`bool createPath(string path, int value)` Creates a new `path` and associates a `value` to it if possible and returns `true`. Returns `false` if the path already exists or its parent path doesn''t exist.

`int get(string path)` Returns the value associated with `path` or returns `-1` if the path doesn''t exist.


Example 1:
Input: 
["FileSystem","createPath","get"]
[[],["/a",1],["/a"]]
Output: 
[null,true,1]
Explanation: 
FileSystem fileSystem = new FileSystem();
fileSystem.createPath("/a", 1); // return true
fileSystem.get("/a"); // return 1

Example 2:
Input: 
["FileSystem","createPath","createPath","get","createPath","get"]
[[],["/leet",1],["/leet/code",2],["/leet/code"],["/c/d",1],["/c"]]
Output: 
[null,true,true,2,false,-1]
Explanation: 
FileSystem fileSystem = new FileSystem();
fileSystem.createPath("/leet", 1); // return true
fileSystem.createPath("/leet/code", 2); // return true
fileSystem.get("/leet/code"); // return 2
fileSystem.createPath("/c/d", 1); // return false because the parent path "/c" doesn''t exist.

fileSystem.get("/c"); // return -1 because this path doesn''t exist.


Constraints:
The number of calls to the two functions is less than or equal to `104` in total.

`2 <= path.length <= 100`
`1 <= value <= 109`', true, 'Medium', '/articles/design-file-system', 58.4, 
   28.3, 'https://leetcode.com/problems/design-file-system', 102, 10.9, 18.6, '["Amazon"]'::jsonb, '["Hash Table,Design"]'::jsonb, 
   149, 15, 91, true, '[]'::jsonb, true),
  (1167, 'Minimum Cost to Connect Sticks', 'You have some number of sticks with positive integer lengths. These lengths are given as an array `sticks`, where `sticks[i]` is the length of the `ith` stick.

You can connect any two sticks of lengths `x` and `y` into one stick by paying a cost of `x + y`. You must connect all the sticks until there is only one stick remaining.

Return the minimum cost of connecting all the given sticks into one stick in this way.


Example 1:
Input: sticks = [2,4,3]
Output: 14
Explanation: You start with sticks = [2,4,3].

1. Combine sticks 2 and 3 for a cost of 2 + 3 = 5. Now you have sticks = [5,4].

2. Combine sticks 5 and 4 for a cost of 5 + 4 = 9. Now you have sticks = [9].

There is only one stick left, so you are done. The total cost is 5 + 9 = 14.


Example 2:
Input: sticks = [1,8,3,5]
Output: 30
Explanation: You start with sticks = [1,8,3,5].

1. Combine sticks 1 and 3 for a cost of 1 + 3 = 4. Now you have sticks = [4,8,5].

2. Combine sticks 4 and 5 for a cost of 4 + 5 = 9. Now you have sticks = [9,8].

3. Combine sticks 9 and 8 for a cost of 9 + 8 = 17. Now you have sticks = [17].

There is only one stick left, so you are done. The total cost is 4 + 9 + 17 = 30.


Example 3:
Input: sticks = [5]
Output: 0
Explanation: There is only one stick, so you don''t need to do anything. The total cost is 0.


Constraints:
`1 <= sticks.length <= 104`
`1 <= sticks[i] <= 104`', true, 'Medium', '/articles/minimum-cost-to-connect-sticks', 64.6, 
   34.2, 'https://leetcode.com/problems/minimum-cost-to-connect-sticks', 232, 44.1, 68.3, '["Amazon"]'::jsonb, '["Greedy"]'::jsonb, 
   517, 134, 79, true, '[]'::jsonb, true),
  (1168, 'Optimize Water Distribution in a Village', 'There are `n` houses in a village. We want to supply water for all the houses by building wells and laying pipes.

For each house `i`, we can either build a well inside it directly with cost `wells[i - 1]` (note the `-1` due to 0-indexing), or pipe in water from another well to it. The costs to lay pipes between houses are given by the array `pipes`, where each `pipes[j] = [house1j, house2j, costj]` represents the cost to connect `house1j` and `house2j` together using a pipe. Connections are bidirectional.

Return the minimum total cost to supply water to all houses.


Example 1:
Input: n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]
Output: 3
Explanation: 
The image shows the costs of connecting houses using pipes.

The best strategy is to build a well in the first house with cost 1 and connect the other houses to it with cost 2 so the total cost is 3.


Constraints:
`1 <= n <= 104`
`wells.length == n`
`0 <= wells[i] <= 105`
`1 <= pipes.length <= 104`
`pipes[j].length == 3`
`1 <= house1j, house2j <= n`
`0 <= costj <= 105`
`house1j != house2j`', true, 'Hard', NULL, 61.1, 
   2.7, 'https://leetcode.com/problems/optimize-water-distribution-in-a-village', 115, 11.6, 18.9, '["Google,Facebook,Yahoo"]'::jsonb, '["Union Find,Graph"]'::jsonb, 
   396, 15, 96, true, '[]'::jsonb, true),
  (1169, 'Invalid Transactions', 'A transaction is possibly invalid if:
the amount exceeds `$1000`, or;
if it occurs within (and including) `60` minutes of another transaction with the same name in a different city.

You are given an array of strings `transaction` where `transactions[i]` consists of comma-separated values representing the name, time (in minutes), amount, and city of the transaction.

Return a list of `transactions` that are possibly invalid. You may return the answer in any order.


Example 1:
Input: transactions = ["alice,20,800,mtv","alice,50,100,beijing"]
Output: ["alice,20,800,mtv","alice,50,100,beijing"]
Explanation: The first transaction is invalid because the second transaction occurs within a difference of 60 minutes, have the same name and is in a different city. Similarly the second one is invalid too.


Example 2:
Input: transactions = ["alice,20,800,mtv","alice,50,1200,mtv"]
Output: ["alice,50,1200,mtv"]

Example 3:
Input: transactions = ["alice,20,800,mtv","bob,50,1200,mtv"]
Output: ["bob,50,1200,mtv"]

Constraints:
`transactions.length <= 1000`
Each `transactions[i]` takes the form `"{name},{time},{amount},{city}"`
Each `{name}` and `{city}` consist of lowercase English letters, and have lengths between `1` and `10`.

Each `{time}` consist of digits, and represent an integer between `0` and `1000`.

Each `{amount}` consist of digits, and represent an integer between `0` and `2000`.', false, 'Medium', NULL, 30.9, 
   42.9, 'https://leetcode.com/problems/invalid-transactions', 242, 26.1, 84.6, '["Bloomberg"]'::jsonb, '["Array,String"]'::jsonb, 
   151, 922, 14, false, '[]'::jsonb, true),
  (1170, 'Compare Strings by Frequency of the Smallest Character', 'Let the function `f(s)` be the frequency of the lexicographically smallest character in a non-empty string `s`. For example, if `s = "dcce"` then `f(s) = 2` because the lexicographically smallest character is `''c''`, which has a frequency of 2.

You are given an array of strings `words` and another array of query strings `queries`. For each query `queries[i]`, count the number of words in `words` such that `f(queries[i])` < `f(W)` for each `W` in `words`.

Return an integer array `answer`, where each `answer[i]` is the answer to the `ith` query.


Example 1:
Input: queries = ["cbd"], words = ["zaaaz"]
Output: [1]
Explanation: On the first query we have f("cbd") = 1, f("zaaaz") = 3 so f("cbd") < f("zaaaz").


Example 2:
Input: queries = ["bbb","cc"], words = ["a","aa","aaa","aaaa"]
Output: [1,2]
Explanation: On the first query only f("bbb") < f("aaaa"). On the second query both f("aaa") and f("aaaa") are both > f("cc").


Constraints:
`1 <= queries.length <= 2000`
`1 <= words.length <= 2000`
`1 <= queries[i].length, words[i].length <= 10`
`queries[i][j]`, `words[i][j]` consist of lowercase English letters.', false, 'Medium', NULL, 60.4, 
   3.6, 'https://leetcode.com/problems/compare-strings-by-frequency-of-the-smallest-character', 474, 55.6, 92.2, '["Google"]'::jsonb, '["Array,String,Binary Search"]'::jsonb, 
   347, 797, 30, true, '[]'::jsonb, true),
  (1171, 'Remove Zero Sum Consecutive Nodes from Linked List', 'Given the `head` of a linked list, we repeatedly delete consecutive sequences of nodes that sum to `0` until there are no such sequences.

After doing so, return the head of the final linked list.  You may return any such answer.

(Note that in the examples below, all sequences are serializations of `ListNode` objects.)

Example 1:
Input: head = [1,2,-3,3,1]
Output: [3,1]
Note: The answer [1,2,1] would also be accepted.


Example 2:
Input: head = [1,2,3,-3,4]
Output: [1,2,4]

Example 3:
Input: head = [1,2,3,-3,-2]
Output: [1]

Constraints:
The given linked list will contain between `1` and `1000` nodes.

Each node in the linked list has `-1000 <= node.val <= 1000`.', false, 'Medium', NULL, 41.5, 
   21.5, 'https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list', 249, 24.2, 58.4, '["Amazon"]'::jsonb, '["Linked List"]'::jsonb, 
   830, 52, 94, true, '[]'::jsonb, true),
  (1172, 'Dinner Plate Stacks', 'You have an infinite number of stacks arranged in a row and numbered (left to right) from 0, each of the stacks has the same maximum `capacity`.

Implement the `DinnerPlates` class:
`DinnerPlates(int capacity)` Initializes the object with the maximum `capacity` of the stacks.

`void push(int val)` Pushes the given positive integer `val` into the leftmost stack with size less than `capacity`.

`int pop()` Returns the value at the top of the rightmost non-empty stack and removes it from that stack, and returns `-1` if all stacks are empty.

`int popAtStack(int index)` Returns the value at the top of the stack with the given `index` and removes it from that stack, and returns -1 if the stack with that given `index` is empty.


Example:
Input: 
["DinnerPlates","push","push","push","push","push","popAtStack","push","push","popAtStack","popAtStack","pop","pop","pop","pop","pop"]
[[2],[1],[2],[3],[4],[5],[0],[20],[21],[0],[2],[],[],[],[],[]]
Output: 
[null,null,null,null,null,null,2,null,null,20,21,5,4,3,1,-1]
Explanation: 
DinnerPlates D = DinnerPlates(2);  // Initialize with capacity = 2
D.push(1);
D.push(2);
D.push(3);
D.push(4);
D.push(5);         // The stacks are now:  2  4
                                           1  3  5
                                           ] ] ]
D.popAtStack(0);   // Returns 2.  The stacks are now:     4
                                                       1  3  5
                                                       ] ] ]
D.push(20);        // The stacks are now: 20  4
                                           1  3  5
                                           ] ] ]
D.push(21);        // The stacks are now: 20  4 21
                                           1  3  5
                                           ] ] ]
D.popAtStack(0);   // Returns 20.  The stacks are now:     4 21
                                                        1  3  5
                                                        ] ] ]
D.popAtStack(2);   // Returns 21.  The stacks are now:     4
                                                        1  3  5
                                                        ] ] ] 
D.pop()            // Returns 5.  The stacks are now:      4
                                                        1  3 
                                                        ] ]  
D.pop()            // Returns 4.  The stacks are now:   1  3 
                                                        ] ]   
D.pop()            // Returns 3.  The stacks are now:   1 
                                                        ]   
D.pop()            // Returns 1.  There are no stacks.

D.pop()            // Returns -1.  There are still no stacks.


Constraints:
`1 <= capacity <= 20000`
`1 <= val <= 20000`
`0 <= index <= 100000`
At most `200000` calls will be made to `push`, `pop`, and `popAtStack`.', false, 'Hard', NULL, 37.6, 
   12.1, 'https://leetcode.com/problems/dinner-plate-stacks', 134, 10.8, 28.9, '["ByteDance"]'::jsonb, '["Design"]'::jsonb, 
   235, 31, 88, false, '[]'::jsonb, true),
  (1173, 'Immediate Food Delivery I', 'SQL Schema', true, 'Easy', NULL, 82.7, 
   4.9, 'https://leetcode.com/problems/immediate-food-delivery-i', 187, 23.7, 28.7, '["DoorDash"]'::jsonb, '[]'::jsonb, 
   99, 4, 96, false, '[]'::jsonb, true),
  (1174, 'Immediate Food Delivery II', 'SQL Schema', true, 'Medium', NULL, 62.2, 
   3.1, 'https://leetcode.com/problems/immediate-food-delivery-ii', 223, 14, 22.6, '["DoorDash"]'::jsonb, '[]'::jsonb, 
   52, 36, 59, false, '[]'::jsonb, true),
  (1175, 'Prime Arrangements', 'Return the number of permutations of 1 to `n` so that prime numbers are at prime indices (1-indexed.)
(Recall that an integer is prime if and only if it is greater than 1, and cannot be written as a product of two positive integers both smaller than it.)
Since the answer may be large, return the answer modulo `10^9 + 7`.


Example 1:
Input: n = 5
Output: 12
Explanation: For example [1,2,5,4,3] is a valid permutation, but [5,2,3,4,1] is not because the prime number 5 is at index 1.


Example 2:
Input: n = 100
Output: 682289015

Constraints:
`1 <= n <= 100`', false, 'Easy', NULL, 51.7, 
   0, 'https://leetcode.com/problems/prime-arrangements', 220, 15.4, 29.7, '["Infosys,Amazon"]'::jsonb, '["Math"]'::jsonb, 
   158, 277, 36, true, '[]'::jsonb, true),
  (1176, 'Diet Plan Performance', 'A dieter consumes `calories[i]` calories on the `i`-th day. 
Given an integer `k`, for every consecutive sequence of `k` days (`calories[i], calories[i+1], ..., calories[i+k-1]` for all `0 <= i <= n-k`), they look at T, the total calories consumed during that sequence of `k` days (`calories[i] + calories[i+1] + ... + calories[i+k-1]`):
If `T < lower`, they performed poorly on their diet and lose 1 point; 
If `T > upper`, they performed well on their diet and gain 1 point;
Otherwise, they performed normally and there is no change in points.

Initially, the dieter has zero points. Return the total number of points the dieter has after dieting for `calories.length` days.

Note that the total points can be negative.


Example 1:
Input: calories = [1,2,3,4,5], k = 1, lower = 3, upper = 3
Output: 0
Explanation: Since k = 1, we consider each element of the array separately and compare it to lower and upper.

calories[0] and calories[1] are less than lower so 2 points are lost.

calories[3] and calories[4] are greater than upper so 2 points are gained.


Example 2:
Input: calories = [3,2], k = 2, lower = 0, upper = 1
Output: 1
Explanation: Since k = 2, we consider subarrays of length 2.

calories[0] + calories[1] > upper so 1 point is gained.


Example 3:
Input: calories = [6,5,0,0], k = 2, lower = 1, upper = 5
Output: 0
Explanation:
calories[0] + calories[1] > upper so 1 point is gained.

lower <= calories[1] + calories[2] <= upper so no change in points.

calories[2] + calories[3] < lower so 1 point is lost.


Constraints:
`1 <= k <= calories.length <= 10^5`
`0 <= calories[i] <= 20000`
`0 <= lower <= upper`', true, 'Easy', NULL, 53.8, 
   0, 'https://leetcode.com/problems/diet-plan-performance', 189, 17.1, 31.9, '["Amazon"]'::jsonb, '["Array,Sliding Window"]'::jsonb, 
   81, 217, 27, true, '[]'::jsonb, true),
  (1177, 'Can Make Palindrome from Substring', 'Given a string `s`, we make queries on substrings of `s`.

For each query `queries[i] = [left, right, k]`, we may rearrange the substring `s[left], ..., s[right]`, and then choose up to `k` of them to replace with any lowercase English letter. 
If the substring is possible to be a palindrome string after the operations above, the result of the query is `true`. Otherwise, the result is `false`.

Return an array `answer[]`, where `answer[i]` is the result of the `i`-th query `queries[i]`.

Note that: Each letter is counted individually for replacement so if for example `s[left..right] = "aaa"`, and `k = 2`, we can only replace two of the letters.  (Also, note that the initial string `s` is never modified by any query.)

Example :
Input: s = "abcda", queries = [[3,3,0],[1,2,0],[0,3,1],[0,3,2],[0,4,1]]
Output: [true,false,false,true,true]
Explanation:
queries[0] : substring = "d", is palidrome.

queries[1] : substring = "bc", is not palidrome.

queries[2] : substring = "abcd", is not palidrome after replacing only 1 character.

queries[3] : substring = "abcd", could be changed to "abba" which is palidrome. Also this can be changed to "baab" first rearrange it "bacd" then replace "cd" with "ab".

queries[4] : substring = "abcda", could be changed to "abcba" which is palidrome.


Constraints:
`1 <= s.length, queries.length <= 10^5`
`0 <= queries[i][0] <= queries[i][1] < s.length`
`0 <= queries[i][2] <= s.length`
`s` only contains lowercase English letters.', false, 'Medium', NULL, 36, 
   29.5, 'https://leetcode.com/problems/can-make-palindrome-from-substring', 168, 15.6, 43.4, '["SAP"]'::jsonb, '["Array,String"]'::jsonb, 
   345, 194, 64, false, '[]'::jsonb, true),
  (1178, 'Number of Valid Words for Each Puzzle', 'With respect to a given `puzzle` string, a `word` is valid if both the following conditions are satisfied:
`word` contains the first letter of `puzzle`.

For each letter in `word`, that letter is in `puzzle`.

	For example, if the puzzle is "abcdefg", then valid words are "faced", "cabbage", and "baggage"; while invalid words are "beefed" (doesn''t include "a") and "based" (includes "s" which isn''t in the puzzle).

Return an array `answer`, where `answer[i]` is the number of words in the given word list `words` that are valid with respect to the puzzle `puzzles[i]`.


Example :
Input: 
words = ["aaaa","asas","able","ability","actt","actor","access"], 
puzzles = ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]
Output: [1,1,3,2,4,0]
Explanation:
1 valid word for "aboveyz" : "aaaa" 
1 valid word for "abrodyz" : "aaaa"
3 valid words for "abslute" : "aaaa", "asas", "able"
2 valid words for "absoryz" : "aaaa", "asas"
4 valid words for "actresz" : "aaaa", "asas", "actt", "access"
There''re no valid words for "gaswxyz" cause none of the words in the list contains letter ''g''.


Constraints:
`1 <= words.length <= 10^5`
`4 <= words[i].length <= 50`
`1 <= puzzles.length <= 10^4`
`puzzles[i].length == 7`
`words[i][j]`, `puzzles[i][j]` are English lowercase letters.

Each `puzzles[i] `doesn''t contain repeated characters.', false, 'Hard', NULL, 39.6, 
   63.1, 'https://leetcode.com/problems/number-of-valid-words-for-each-puzzle', 104, 8.9, 22.4, '["Dropbox"]'::jsonb, '["Hash Table,Bit Manipulation"]'::jsonb, 
   287, 34, 89, false, '[]'::jsonb, true),
  (1179, 'Reformat Department Table', 'SQL Schema', false, 'Easy', NULL, 82.1, 
   18.1, 'https://leetcode.com/problems/reformat-department-table', 143, 41.8, 50.9, '["Amazon"]'::jsonb, '[]'::jsonb, 
   259, 188, 58, true, '[]'::jsonb, true),
  (1180, 'Count Substrings with Only One Distinct Letter', 'Given a string `S`, return the number of substrings that have only one distinct letter.


Example 1:
Input: S = "aaaba"
Output: 8
Explanation: The substrings with one distinct letter are "aaa", "aa", "a", "b".

"aaa" occurs 1 time.

"aa" occurs 2 times.

"a" occurs 4 times.

"b" occurs 1 time.

So the answer is 1 + 2 + 4 + 1 = 8.


Example 2:
Input: S = "aaaaaaaaaa"
Output: 55

Constraints:
`1 <= S.length <= 1000`
`S[i]` consists of only lowercase English letters.', true, 'Easy', '/articles/count-substrings-with-only-one-distinct-letter', 77.9, 
   23.2, 'https://leetcode.com/problems/count-substrings-with-only-one-distinct-letter', 253, 14.7, 18.9, '["Virtu Financial"]'::jsonb, '["Math,String"]'::jsonb, 
   190, 36, 84, false, '[]'::jsonb, true),
  (1181, 'Before and After Puzzle', 'Given a list of `phrases`, generate a list of Before and After puzzles.

A phrase is a string that consists of lowercase English letters and spaces only. No space appears in the start or the end of a phrase. There are no consecutive spaces in a phrase.

Before and After puzzles are phrases that are formed by merging two phrases where the last word of the first phrase is the same as the first word of the second phrase.

Return the Before and After puzzles that can be formed by every two phrases `phrases[i]` and `phrases[j]` where `i != j`. Note that the order of matching two phrases matters, we want to consider both orders.

You should return a list of distinct strings sorted lexicographically.


Example 1:
Input: phrases = ["writing code","code rocks"]
Output: ["writing code rocks"]

Example 2:
Input: phrases = ["mission statement",
                  "a quick bite to eat",
                  "a chip off the old block",
                  "chocolate bar",
                  "mission impossible",
                  "a man on a mission",
                  "block party",
                  "eat my words",
                  "bar of soap"]
Output: ["a chip off the old block party",
         "a man on a mission impossible",
         "a man on a mission statement",
         "a quick bite to eat my words",
         "chocolate bar of soap"]

Example 3:
Input: phrases = ["a","b","a"]
Output: ["a"]

Constraints:
`1 <= phrases.length <= 100`
`1 <= phrases[i].length <= 100`', true, 'Medium', NULL, 44.5, 
   0, 'https://leetcode.com/problems/before-and-after-puzzle', 90, 8.2, 18.5, '["Clutter"]'::jsonb, '["String"]'::jsonb, 
   59, 130, 31, false, '[]'::jsonb, true),
  (1182, 'Shortest Distance to Target Color', 'You are given an array `colors`, in which there are three colors: `1`, `2` and `3`.

You are also given some queries. Each query consists of two integers `i` and `c`, return the shortest distance between the given index `i` and the target color `c`. If there is no solution return `-1`.


Example 1:
Input: colors = [1,1,2,1,3,2,2,3,3], queries = [[1,3],[2,2],[6,1]]
Output: [3,0,3]
Explanation: 
The nearest 3 from index 1 is at index 4 (3 steps away).

The nearest 2 from index 2 is at index 2 itself (0 steps away).

The nearest 1 from index 6 is at index 3 (3 steps away).


Example 2:
Input: colors = [1,2], queries = [[0,3]]
Output: [-1]
Explanation: There is no 3 in the array.


Constraints:
`1 <= colors.length <= 5*10^4`
`1 <= colors[i] <= 3`
`1 <= queries.length <= 5*10^4`
`queries[i].length == 2`
`0 <= queries[i][0] < colors.length`
`1 <= queries[i][1] <= 3`', true, 'Medium', '/articles/shortest-distance-to-target-color', 53.6, 
   0, 'https://leetcode.com/problems/shortest-distance-to-target-color', 132, 9.3, 17.4, '["Google"]'::jsonb, '["Binary Search"]'::jsonb, 
   154, 4, 97, true, '[]'::jsonb, true),
  (1183, 'Maximum Number of Ones', 'Consider a matrix `M` with dimensions `width * height`, such that every cell has value `0` or `1`, and any square sub-matrix of `M` of size `sideLength * sideLength` has at most `maxOnes` ones.

Return the maximum possible number of ones that the matrix `M` can have.


Example 1:
Input: width = 3, height = 3, sideLength = 2, maxOnes = 1
Output: 4
Explanation:
In a 3*3 matrix, no 2*2 sub-matrix can have more than 1 one.

The best solution that has 4 ones is:
[1,0,1]
[0,0,0]
[1,0,1]

Example 2:
Input: width = 3, height = 3, sideLength = 2, maxOnes = 2
Output: 6
Explanation:
[1,0,1]
[1,0,1]
[1,0,1]

Constraints:
`1 <= width, height <= 100`
`1 <= sideLength <= width, height`
`0 <= maxOnes <= sideLength * sideLength`', true, 'Hard', NULL, 57.8, 
   0, 'https://leetcode.com/problems/maximum-number-of-ones', 22, 1.7, 2.9, '["Qualcomm"]'::jsonb, '["Math,Sort"]'::jsonb, 
   76, 9, 89, false, '[]'::jsonb, true),
  (1184, 'Distance Between Bus Stops', 'A bus has `n` stops numbered from `0` to `n - 1` that form a circle. We know the distance between all pairs of neighboring stops where `distance[i]` is the distance between the stops number `i` and `(i + 1) % n`.

The bus goes along both directions i.e. clockwise and counterclockwise.

Return the shortest distance between the given `start` and `destination` stops.


Example 1:
Input: distance = [1,2,3,4], start = 0, destination = 1
Output: 1
Explanation: Distance between 0 and 1 is 1 or 9, minimum is 1.


Example 2:
Input: distance = [1,2,3,4], start = 0, destination = 2
Output: 3
Explanation: Distance between 0 and 2 is 3 or 7, minimum is 3.


Example 3:
Input: distance = [1,2,3,4], start = 0, destination = 3
Output: 4
Explanation: Distance between 0 and 3 is 6 or 4, minimum is 4.


Constraints:
`1 <= n <= 10^4`
`distance.length == n`
`0 <= start, destination < n`
`0 <= distance[i] <= 10^4`', false, 'Easy', NULL, 53.9, 
   4.3, 'https://leetcode.com/problems/distance-between-bus-stops', 529, 31.4, 58.2, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   343, 36, 91, true, '[]'::jsonb, true),
  (1185, 'Day of the Week', 'Given a date, return the corresponding day of the week for that date.

The input is given as three integers representing the `day`, `month` and `year` respectively.

Return the answer as one of the following values `{"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}`.


Example 1:
Input: day = 31, month = 8, year = 2019
Output: "Saturday"

Example 2:
Input: day = 18, month = 7, year = 1999
Output: "Sunday"

Example 3:
Input: day = 15, month = 8, year = 1993
Output: "Sunday"

Constraints:
The given dates are valid dates between the years `1971` and `2100`.', false, 'Easy', NULL, 61.1, 
   8.1, 'https://leetcode.com/problems/day-of-the-week', 345, 31.6, 51.7, '["Microsoft,United Health Group"]'::jsonb, '["Array"]'::jsonb, 
   156, 1451, 10, false, '[]'::jsonb, true),
  (1186, 'Maximum Subarray Sum with One Deletion', 'Given an array of integers, return the maximum sum for a non-empty subarray (contiguous elements) with at most one element deletion. In other words, you want to choose a subarray and optionally delete one element from it so that there is still at least one element left and the sum of the remaining elements is maximum possible.

Note that the subarray needs to be non-empty after deleting one element.


Example 1:
Input: arr = [1,-2,0,3]
Output: 4
Explanation: Because we can choose [1, -2, 0, 3] and drop -2, thus the subarray [1, 0, 3] becomes the maximum value.


Example 2:
Input: arr = [1,-2,-2,3]
Output: 3
Explanation: We just choose [3] and it''s the maximum sum.


Example 3:
Input: arr = [-1,-1,-1,-1]
Output: -1
Explanation: The final subarray needs to be non-empty. You can''t choose [-1] and delete -1 from it, then get an empty subarray to make the sum equals to 0.


Constraints:
`1 <= arr.length <= 105`
`-104 <= arr[i] <= 104`', false, 'Medium', NULL, 38.9, 
   20.5, 'https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion', 249, 21.7, 55.8, '["Goldman Sachs"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   770, 29, 96, false, '[]'::jsonb, true),
  (1187, 'Make Array Strictly Increasing', 'Given two integer arrays `arr1` and `arr2`, return the minimum number of operations (possibly zero) needed to make `arr1` strictly increasing.

In one operation, you can choose two indices `0 <= i < arr1.length` and `0 <= j < arr2.length` and do the assignment `arr1[i] = arr2[j]`.

If there is no way to make `arr1` strictly increasing, return `-1`.


Example 1:
Input: arr1 = [1,5,3,6,7], arr2 = [1,3,2,4]
Output: 1
Explanation: Replace `5` with `2`, then `arr1 = [1, 2, 3, 6, 7]`.


Example 2:
Input: arr1 = [1,5,3,6,7], arr2 = [4,3,1]
Output: 2
Explanation: Replace `5` with `3` and then replace `3` with `4`. `arr1 = [1, 3, 4, 6, 7]`.


Example 3:
Input: arr1 = [1,5,3,6,7], arr2 = [1,6,3,3]
Output: -1
Explanation: You can''t make `arr1` strictly increasing.


Constraints:
`1 <= arr1.length, arr2.length <= 2000`
`0 <= arr1[i], arr2[i] <= 10^9`', false, 'Hard', NULL, 42, 
   5.9, 'https://leetcode.com/problems/make-array-strictly-increasing', 84, 7.4, 17.7, '[]'::jsonb, '[]'::jsonb, 
   372, 11, 97, false, '[]'::jsonb, true),
  (1188, 'Design Bounded Blocking Queue', 'Implement a thread-safe bounded blocking queue that has the following methods:
`BoundedBlockingQueue(int capacity)` The constructor initializes the queue with a maximum `capacity`.

`void enqueue(int element)` Adds an `element` to the front of the queue. If the queue is full, the calling thread is blocked until the queue is no longer full.

`int dequeue()` Returns the element at the rear of the queue and removes it. If the queue is empty, the calling thread is blocked until the queue is no longer empty.

`int size()` Returns the number of elements currently in the queue.

Your implementation will be tested using multiple threads at the same time. Each thread will either be a producer thread that only makes calls to the `enqueue` method or a consumer thread that only makes calls to the `dequeue` method. The `size` method will be called after every test case.

Please do not use built-in implementations of bounded blocking queue as this will not be accepted in an interview.


Example 1:
Input:
1
1
["BoundedBlockingQueue","enqueue","dequeue","dequeue","enqueue","enqueue","enqueue","enqueue","dequeue"]
[[2],[1],[],[],[0],[2],[3],[4],[]]
Output:
[1,0,2,2]
Explanation:
Number of producer threads = 1
Number of consumer threads = 1
BoundedBlockingQueue queue = new BoundedBlockingQueue(2);   // initialize the queue with capacity = 2.

queue.enqueue(1);   // The producer thread enqueues 1 to the queue.

queue.dequeue();    // The consumer thread calls dequeue and returns 1 from the queue.

queue.dequeue();    // Since the queue is empty, the consumer thread is blocked.

queue.enqueue(0);   // The producer thread enqueues 0 to the queue. The consumer thread is unblocked and returns 0 from the queue.

queue.enqueue(2);   // The producer thread enqueues 2 to the queue.

queue.enqueue(3);   // The producer thread enqueues 3 to the queue.

queue.enqueue(4);   // The producer thread is blocked because the queue''s capacity (2) is reached.

queue.dequeue();    // The consumer thread returns 2 from the queue. The producer thread is unblocked and enqueues 4 to the queue.

queue.size();       // 2 elements remaining in the queue. size() is always called at the end of each test case.


Example 2:
Input:
3
4
["BoundedBlockingQueue","enqueue","enqueue","enqueue","dequeue","dequeue","dequeue","enqueue"]
[[3],[1],[0],[2],[],[],[],[3]]
Output:
[1,0,2,1]
Explanation:
Number of producer threads = 3
Number of consumer threads = 4
BoundedBlockingQueue queue = new BoundedBlockingQueue(3);   // initialize the queue with capacity = 3.

queue.enqueue(1);   // Producer thread P1 enqueues 1 to the queue.

queue.enqueue(0);   // Producer thread P2 enqueues 0 to the queue.

queue.enqueue(2);   // Producer thread P3 enqueues 2 to the queue.

queue.dequeue();    // Consumer thread C1 calls dequeue.

queue.dequeue();    // Consumer thread C2 calls dequeue.

queue.dequeue();    // Consumer thread C3 calls dequeue.

queue.enqueue(3);   // One of the producer threads enqueues 3 to the queue.

queue.size();       // 1 element remaining in the queue.

Since the number of threads for producer/consumer is greater than 1, we do not know how the threads will be scheduled in the operating system, even though the input seems to imply the ordering. Therefore, any of the output [1,0,2] or [1,2,0] or [0,1,2] or [0,2,1] or [2,0,1] or [2,1,0] will be accepted.


Constraints:
`1 <= Number of Prdoucers <= 8`
`1 <= Number of Consumers <= 8`
`1 <= size <= 30`
`0 <= element <= 20`
The number of calls to `enqueue` is greater than or equal to the number of calls to `dequeue`.

At most `40` calls will be made to `enque`, `deque`, and `size`.', true, 'Medium', NULL, 72.9, 
   48.8, 'https://leetcode.com/problems/design-bounded-blocking-queue', 127, 20.1, 27.6, '["LinkedIn,Bloomberg,eBay,Apple,Microsoft,Rubrik"]'::jsonb, '[]'::jsonb, 
   266, 21, 93, true, '[]'::jsonb, true),
  (1189, 'Maximum Number of Balloons', 'Given a string `text`, you want to use the characters of `text` to form as many instances of the word "balloon" as possible.

You can use each character in `text` at most once. Return the maximum number of instances that can be formed.


Example 1:
Input: text = "nlaebolko"
Output: 1

Example 2:
Input: text = "loonbalxballpoon"
Output: 2

Example 3:
Input: text = "leetcode"
Output: 0

Constraints:
`1 <= text.length <= 10^4`
`text` consists of lower case English letters only.', false, 'Easy', NULL, 62.3, 
   25.5, 'https://leetcode.com/problems/maximum-number-of-balloons', 723, 60.3, 96.9, '["Tesla,Microsoft"]'::jsonb, '["Hash Table,String"]'::jsonb, 
   514, 47, 92, false, '[]'::jsonb, true),
  (1190, 'Reverse Substrings Between Each Pair of Parentheses', 'You are given a string `s` that consists of lower case English letters and brackets. 
Reverse the strings in each pair of matching parentheses, starting from the innermost one.

Your result should not contain any brackets.


Example 1:
Input: s = "(abcd)"
Output: "dcba"

Example 2:
Input: s = "(u(love)i)"
Output: "iloveu"
Explanation: The substring "love" is reversed first, then the whole string is reversed.


Example 3:
Input: s = "(ed(et(oc))el)"
Output: "leetcode"
Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.


Example 4:
Input: s = "a(bcdefghijkl(mno)p)q"
Output: "apmnolkjihgfedcbq"

Constraints:
`0 <= s.length <= 2000`
`s` only contains lower case English characters and parentheses.

It''s guaranteed that all parentheses are balanced.', false, 'Medium', NULL, 64.3, 
   31.2, 'https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses', 430, 31.5, 48.9, '["Amazon,Oracle,Postmates"]'::jsonb, '["Stack"]'::jsonb, 
   698, 24, 97, true, '[]'::jsonb, true),
  (1191, 'K-Concatenation Maximum Sum', 'Given an integer array `arr` and an integer `k`, modify the array by repeating it `k` times.

For example, if `arr = [1, 2]` and `k = 3 `then the modified array will be `[1, 2, 1, 2, 1, 2]`.

Return the maximum sub-array sum in the modified array. Note that the length of the sub-array can be `0` and its sum in that case is `0`.

As the answer can be very large, return the answer modulo `109 + 7`.


Example 1:
Input: arr = [1,2], k = 3
Output: 9

Example 2:
Input: arr = [1,-2,1], k = 5
Output: 2

Example 3:
Input: arr = [-1,-2], k = 7
Output: 0

Constraints:
`1 <= arr.length <= 105`
`1 <= k <= 105`
`-104 <= arr[i] <= 104`', false, 'Medium', NULL, 25, 
   5.7, 'https://leetcode.com/problems/k-concatenation-maximum-sum', 197, 16.6, 66.2, '["American Express"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   499, 46, 92, false, '[]'::jsonb, true),
  (1192, 'Critical Connections in a Network', 'There are `n` servers numbered from `0` to `n-1` connected by undirected server-to-server `connections` forming a network where `connections[i] = [a, b]` represents a connection between servers `a` and `b`. Any server can reach any other server directly or indirectly through the network.

A critical connection is a connection that, if removed, will make some server unable to reach some other server.

Return all critical connections in the network in any order.


Example 1:
Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
Output: [[1,3]]
Explanation: [[3,1]] is also accepted.


Constraints:
`1 <= n <= 10^5`
`n-1 <= connections.length <= 10^5`
`connections[i][0] != connections[i][1]`
There are no repeated connections.', false, 'Hard', '/articles/critical-connections-in-a-network', 50.3, 
   76.3, 'https://leetcode.com/problems/critical-connections-in-a-network', 436, 101.6, 202.1, '["Amazon,Adobe"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   2165, 110, 95, true, '[]'::jsonb, true),
  (1193, 'Monthly Transactions I', 'SQL Schema', true, 'Medium', NULL, 69, 
   1.6, 'https://leetcode.com/problems/monthly-transactions-i', 169, 12.6, 18.3, '["Wayfair,Wish"]'::jsonb, '[]'::jsonb, 
   60, 13, 82, false, '[]'::jsonb, true),
  (1194, 'Tournament Winners', 'SQL Schema', true, 'Hard', NULL, 52.5, 
   2.2, 'https://leetcode.com/problems/tournament-winners', 200, 8.2, 15.6, '["Wayfair"]'::jsonb, '[]'::jsonb, 
   63, 30, 68, false, '[]'::jsonb, true),
  (1195, 'Fizz Buzz Multithreaded', 'Write a program that outputs the string representation of numbers from 1 to n, however:
If the number is divisible by 3, output "fizz".

If the number is divisible by 5, output "buzz".

If the number is divisible by both 3 and 5, output "fizzbuzz".

For example, for `n = 15`, we output: `1, 2, fizz, 4, buzz, fizz, 7, 8, fizz, buzz, 11, fizz, 13, 14, fizzbuzz`.

Suppose you are given the following code:
class FizzBuzz {
  public FizzBuzz(int n) { ... }               // constructor
  public void fizz(printFizz) { ... }          // only output "fizz"
  public void buzz(printBuzz) { ... }          // only output "buzz"
  public void fizzbuzz(printFizzBuzz) { ... }  // only output "fizzbuzz"
  public void number(printNumber) { ... }      // only output the numbers
}
Implement a multithreaded version of `FizzBuzz` with four threads. The same instance of `FizzBuzz` will be passed to four different threads:
Thread A will call `fizz()` to check for divisibility of 3 and outputs `fizz`.

Thread B will call `buzz()` to check for divisibility of 5 and outputs `buzz`.

Thread C will call `fizzbuzz()` to check for divisibility of 3 and 5 and outputs `fizzbuzz`.

Thread D will call `number()` which should only output the numbers.', false, 'Medium', NULL, 70.8, 
   43.6, 'https://leetcode.com/problems/fizz-buzz-multithreaded', 247, 18.3, 25.8, '["Microsoft"]'::jsonb, '[]'::jsonb, 
   241, 168, 59, false, '[]'::jsonb, true),
  (1196, 'How Many Apples Can You Put into the Basket', 'You have some apples, where `arr[i]` is the weight of the `i`-th apple.  You also have a basket that can carry up to `5000` units of weight.

Return the maximum number of apples you can put in the basket.


Example 1:
Input: arr = [100,200,150,1000]
Output: 4
Explanation: All 4 apples can be carried by the basket since their sum of weights is 1450.


Example 2:
Input: arr = [900,950,800,1000,700,800]
Output: 5
Explanation: The sum of weights of the 6 apples exceeds 5000 so we choose any 5 of them.


Constraints:
`1 <= arr.length <= 10^3`
`1 <= arr[i] <= 10^3`', true, 'Easy', '/articles/how-many-apples-can-you-put-into-the-basket', 68.3, 
   8.3, 'https://leetcode.com/problems/how-many-apples-can-you-put-into-the-basket', 138, 13.3, 19.6, '["Virtu Financial"]'::jsonb, '["Greedy"]'::jsonb, 
   100, 12, 89, false, '[]'::jsonb, true),
  (1197, 'Minimum Knight Moves', 'In an infinite chess board with coordinates from `-infinity` to `+infinity`, you have a knight at square `[0, 0]`.

A knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.

Return the minimum number of steps needed to move the knight to the square `[x, y]`.  It is guaranteed the answer exists.


Example 1:
Input: x = 2, y = 1
Output: 1
Explanation: [0, 0] → [2, 1]

Example 2:
Input: x = 5, y = 5
Output: 4
Explanation: [0, 0] → [2, 1] → [4, 2] → [3, 4] → [5, 5]

Constraints:
`|x| + |y| <= 300`', true, 'Medium', NULL, 37.4, 
   80.6, 'https://leetcode.com/problems/minimum-knight-moves', 282, 61.3, 163.6, '["Expedia,DoorDash,Facebook,Amazon,Microsoft,Mathworks,Google,Indeed,ByteDance,Cisco,Twitter"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   608, 236, 72, true, '[]'::jsonb, true),
  (1198, 'Find Smallest Common Element in All Rows', 'Given an `m x n` matrix `mat` where every row is sorted in strictly increasing order, return the smallest common element in all rows.

If there is no common element, return `-1`.


Example 1:
Input: mat = [[1,2,3,4,5],[2,4,5,8,10],[3,5,7,9,11],[1,3,5,7,9]]
Output: 5

Example 2:
Input: mat = [[1,2,3],[2,3,4],[2,3,5]]
Output: 2

Constraints:
`m == mat.length`
`n == mat[i].length`
`1 <= m, n <= 500`
`1 <= mat[i][j] <= 104`
`mat[i]` is sorted in strictly increasing order.', true, 'Medium', '/articles/find-smallest-common-element-in-all-rows', 76.2, 
   0.2, 'https://leetcode.com/problems/find-smallest-common-element-in-all-rows', 279, 19.9, 26.1, '["Qualtrics"]'::jsonb, '["Hash Table,Binary Search"]'::jsonb, 
   255, 15, 94, false, '[]'::jsonb, true),
  (1199, 'Minimum Time to Build Blocks', 'You are given a list of blocks, where `blocks[i] = t` means that the `i`-th block needs `t` units of time to be built. A block can only be built by exactly one worker.

A worker can either split into two workers (number of workers increases by one) or build a block then go home. Both decisions cost some time.

The time cost of spliting one worker into two workers is given as an integer `split`. Note that if two workers split at the same time, they split in parallel so the cost would be `split`.

Output the minimum time needed to build all blocks.
Initially, there is only one worker.


Example 1:
Input: blocks = [1], split = 1
Output: 1
Explanation: We use 1 worker to build 1 block in 1 time unit.


Example 2:
Input: blocks = [1,2], split = 5
Output: 7
Explanation: We split the worker into 2 workers in 5 time units then assign each of them to a block so the cost is 5 + max(1, 2) = 7.


Example 3:
Input: blocks = [1,2,3], split = 1
Output: 4
Explanation: Split 1 worker into 2, then assign the first worker to the last block and split the second worker into 2.

Then, use the two unassigned workers to build the first two blocks.

The cost is 1 + max(3, 1 + max(1, 2)) = 4.


Constraints:
`1 <= blocks.length <= 1000`
`1 <= blocks[i] <= 10^5`
`1 <= split <= 100`', true, 'Hard', NULL, 38.9, 
   0, 'https://leetcode.com/problems/minimum-time-to-build-blocks', 38, 2.8, 7.1, '["Google"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   115, 14, 89, true, '[]'::jsonb, true),
  (1200, 'Minimum Absolute Difference', 'Given an array of distinct integers `arr`, find all pairs of elements with the minimum absolute difference of any two elements. 
Return a list of pairs in ascending order(with respect to pairs), each pair `[a, b]` follows
`a, b` are from `arr`
`a < b`
`b - a` equals to the minimum absolute difference of any two elements in `arr`

Example 1:
Input: arr = [4,2,1,3]
Output: [[1,2],[2,3],[3,4]]
Explanation: The minimum absolute difference is 1. List all pairs with difference equal to 1 in ascending order.


Example 2:
Input: arr = [1,3,6,10,15]
Output: [[1,3]]

Example 3:
Input: arr = [3,8,-10,23,19,-4,-14,27]
Output: [[-14,-10],[19,23],[23,27]]

Constraints:
`2 <= arr.length <= 10^5`
`-10^6 <= arr[i] <= 10^6`', false, 'Easy', NULL, 67, 
   27.7, 'https://leetcode.com/problems/minimum-absolute-difference', 581, 60.9, 90.8, '["Microsoft,Uber"]'::jsonb, '["Array"]'::jsonb, 
   585, 31, 95, false, '[]'::jsonb, true),
  (1201, 'Ugly Number III', 'Given four integers `n`, `a`, `b`, and `c`, return the `nth` ugly number.

Ugly numbers are positive integers that are divisible by `a`, `b`, or `c`.


Example 1:
Input: n = 3, a = 2, b = 3, c = 5
Output: 4
Explanation: The ugly numbers are 2, 3, 4, 5, 6, 8, 9, 10... The 3rd is 4.


Example 2:
Input: n = 4, a = 2, b = 3, c = 4
Output: 6
Explanation: The ugly numbers are 2, 3, 4, 6, 8, 9, 10, 12... The 4th is 6.


Example 3:
Input: n = 5, a = 2, b = 11, c = 13
Output: 10
Explanation: The ugly numbers are 2, 4, 6, 8, 10, 11, 12, 13... The 5th is 10.


Example 4:
Input: n = 1000000000, a = 2, b = 217983653, c = 336916467
Output: 1999999984

Constraints:
`1 <= n, a, b, c <= 109`
`1 <= a * b * c <= 1018`
It is guaranteed that the result will be in range `[1, 2 * 109]`.', false, 'Medium', NULL, 26.4, 
   11.7, 'https://leetcode.com/problems/ugly-number-iii', 121, 13.2, 49.8, '["American Express"]'::jsonb, '["Math,Binary Search"]'::jsonb, 
   409, 291, 58, false, '[]'::jsonb, true),
  (1202, 'Smallest String With Swaps', 'You are given a string `s`, and an array of pairs of indices in the string `pairs` where `pairs[i] = [a, b]` indicates 2 indices(0-indexed) of the string.

You can swap the characters at any pair of indices in the given `pairs` any number of times.

Return the lexicographically smallest string that `s` can be changed to after using the swaps.


Example 1:
Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[1] and s[2], s = "bacd"

Example 2:
Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
Output: "abcd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[0] and s[2], s = "acbd"
Swap s[1] and s[2], s = "abcd"

Example 3:
Input: s = "cba", pairs = [[0,1],[1,2]]
Output: "abc"
Explaination: 
Swap s[0] and s[1], s = "bca"
Swap s[1] and s[2], s = "bac"
Swap s[0] and s[1], s = "abc"

Constraints:
`1 <= s.length <= 10^5`
`0 <= pairs.length <= 10^5`
`0 <= pairs[i][0], pairs[i][1] < s.length`
`s` only contains lower case English letters.', false, 'Medium', NULL, 49, 
   2, 'https://leetcode.com/problems/smallest-string-with-swaps', 243, 22.7, 46.4, '["Citrix"]'::jsonb, '["Array,Union Find"]'::jsonb, 
   847, 31, 96, false, '[]'::jsonb, true),
  (1203, 'Sort Items by Groups Respecting Dependencies', 'There are `n` items each belonging to zero or one of `m` groups where `group[i]` is the group that the `i`-th item belongs to and it''s equal to `-1` if the `i`-th item belongs to no group. The items and the groups are zero indexed. A group can have no item belonging to it.

Return a sorted list of the items such that:
The items that belong to the same group are next to each other in the sorted list.

There are some relations between these items where `beforeItems[i]` is a list containing all the items that should come before the `i`-th item in the sorted array (to the left of the `i`-th item).

Return any solution if there is more than one solution and return an empty list if there is no solution.


Example 1:
Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3,6],[],[],[]]
Output: [6,3,4,1,5,2,0,7]

Example 2:
Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3],[],[4],[]]
Output: []
Explanation: This is the same as example 1 except that 4 needs to be before 6 in the sorted list.


Constraints:
`1 <= m <= n <= 3 * 104`
`group.length == beforeItems.length == n`
`-1 <= group[i] <= m - 1`
`0 <= beforeItems[i].length <= n - 1`
`0 <= beforeItems[i][j] <= n - 1`
`i != beforeItems[i][j]`
`beforeItems[i] `does not contain duplicates elements.', false, 'Hard', NULL, 48.4, 
   9, 'https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies', 109, 8.9, 18.4, '["Google"]'::jsonb, '["Depth-first Search,Graph,Topological Sort"]'::jsonb, 
   387, 68, 85, true, '[]'::jsonb, true),
  (1204, 'Last Person to Fit in the Elevator', 'SQL Schema', true, 'Medium', NULL, 72.1, 
   8, 'https://leetcode.com/problems/last-person-to-fit-in-the-elevator', 241, 17.7, 24.6, '["Wayfair"]'::jsonb, '[]'::jsonb, 
   126, 11, 92, false, '[]'::jsonb, true),
  (1205, 'Monthly Transactions II', 'SQL Schema', true, 'Medium', NULL, 45.8, 
   0, 'https://leetcode.com/problems/monthly-transactions-ii', 135, 8.8, 19.1, '["Wish"]'::jsonb, '[]'::jsonb, 
   74, 211, 26, false, '[]'::jsonb, true),
  (1206, 'Design Skiplist', 'Design a Skiplist without using any built-in libraries.

A Skiplist is a data structure that takes O(log(n)) time to `add`, `erase` and `search`. Comparing with treap and red-black tree which has the same function and performance, the code length of Skiplist can be comparatively short and the idea behind Skiplists are just simple linked lists.

For example: we have a Skiplist containing `[30,40,50,60,70,90]` and we want to add `80` and `45` into it. The Skiplist works this way:
Artyom Kalinin [CC BY-SA 3.0], via Wikimedia Commons
You can see there are many layers in the Skiplist. Each layer is a sorted linked list. With the help of the top layers, `add` , `erase` and `search `can be faster than O(n). It can be proven that the average time complexity for each operation is O(log(n)) and space complexity is O(n).

To be specific, your design should include these functions:
`bool search(int target)` : Return whether the `target` exists in the Skiplist or not.

`void add(int num)`: Insert a value into the SkipList. 
`bool erase(int num)`: Remove a value in the Skiplist. If `num` does not exist in the Skiplist, do nothing and return false. If there exists multiple `num` values, removing any one of them is fine.

See more about Skiplist : https://en.wikipedia.org/wiki/Skip_list
Note that duplicates may exist in the Skiplist, your code needs to handle this situation.


Example:
Skiplist skiplist = new Skiplist();
skiplist.add(1);
skiplist.add(2);
skiplist.add(3);
skiplist.search(0);   // return false.

skiplist.add(4);
skiplist.search(1);   // return true.

skiplist.erase(0);    // return false, 0 is not in skiplist.

skiplist.erase(1);    // return true.

skiplist.search(1);   // return false, 1 has already been erased.


Constraints:
`0 <= num, target <= 20000`
At most `50000` calls will be made to `search`, `add`, and `erase`.', false, 'Hard', NULL, 59, 
   22.6, 'https://leetcode.com/problems/design-skiplist', 83, 7.5, 12.7, '["Microsoft"]'::jsonb, '["Design"]'::jsonb, 
   239, 29, 89, false, '[]'::jsonb, true),
  (1207, 'Unique Number of Occurrences', 'Given an array of integers `arr`, write a function that returns `true` if and only if the number of occurrences of each value in the array is unique.


Example 1:
Input: arr = [1,2,2,1,1,3]
Output: true
Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.


Example 2:
Input: arr = [1,2]
Output: false

Example 3:
Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
Output: true

Constraints:
`1 <= arr.length <= 1000`
`-1000 <= arr[i] <= 1000`', false, 'Easy', NULL, 71.9, 
   4.5, 'https://leetcode.com/problems/unique-number-of-occurrences', 999, 79.9, 111.1, '["Apple"]'::jsonb, '["Hash Table"]'::jsonb, 
   662, 25, 96, true, '[]'::jsonb, true),
  (1208, 'Get Equal Substrings Within Budget', 'You are given two strings `s` and `t` of the same length. You want to change `s` to `t`. Changing the `i`-th character of `s` to `i`-th character of `t` costs `|s[i] - t[i]|` that is, the absolute difference between the ASCII values of the characters.

You are also given an integer `maxCost`.

Return the maximum length of a substring of `s` that can be changed to be the same as the corresponding substring of `t`with a cost less than or equal to `maxCost`.

If there is no substring from `s` that can be changed to its corresponding substring from `t`, return `0`.


Example 1:
Input: s = "abcd", t = "bcdf", maxCost = 3
Output: 3
Explanation: "abc" of s can change to "bcd". That costs 3, so the maximum length is 3.


Example 2:
Input: s = "abcd", t = "cdef", maxCost = 3
Output: 1
Explanation: Each character in s costs 2 to change to charactor in `t, so the maximum length is 1.`

Example 3:
Input: s = "abcd", t = "acde", maxCost = 0
Output: 1
Explanation: You can''t make any change, so the maximum length is 1.


Constraints:
`1 <= s.length, t.length <= 10^5`
`0 <= maxCost <= 10^6`
`s` and `t` only contain lower case English letters.', false, 'Medium', NULL, 44.2, 
   1.8, 'https://leetcode.com/problems/get-equal-substrings-within-budget', 251, 21, 47.4, '["Traveloka"]'::jsonb, '["Array,Sliding Window"]'::jsonb, 
   400, 30, 93, false, '[]'::jsonb, true),
  (1209, 'Remove All Adjacent Duplicates in String II', 'Given a string `s`, a k duplicate removal consists of choosing `k` adjacent and equal letters from `s` and removing them causing the left and the right side of the deleted substring to concatenate together.

We repeatedly make `k` duplicate removals on `s` until we no longer can.

Return the final string after all such duplicate removals have been made.

It is guaranteed that the answer is unique.


Example 1:
Input: s = "abcd", k = 2
Output: "abcd"
Explanation: There''s nothing to delete.


Example 2:
Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
Explanation: 
First delete "eee" and "ccc", get "ddbbbdaa"
Then delete "bbb", get "dddaa"
Finally delete "ddd", get "aa"

Example 3:
Input: s = "pbbcggttciiippooaais", k = 2
Output: "ps"

Constraints:
`1 <= s.length <= 10^5`
`2 <= k <= 10^4`
`s` only contains lower case English letters.', false, 'Medium', '/articles/remove-all-adjacent-duplicates-in-string-ii', 57.8, 
   75.4, 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii', 535, 73.9, 127.9, '["Bloomberg,Facebook,Amazon,Roblox,Google,Microsoft"]'::jsonb, '["Stack"]'::jsonb, 
   1217, 29, 98, true, '[]'::jsonb, true),
  (1210, 'Minimum Moves to Reach Target with Rotations', 'In an `n*n` grid, there is a snake that spans 2 cells and starts moving from the top left corner at `(0, 0)` and `(0, 1)`. The grid has empty cells represented by zeros and blocked cells represented by ones. The snake wants to reach the lower right corner at `(n-1, n-2)` and `(n-1, n-1)`.

In one move the snake can:
Move one cell to the right if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.

Move down one cell if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.

Rotate clockwise if it''s in a horizontal position and the two cells under it are both empty. In that case the snake moves from `(r, c)` and `(r, c+1)` to `(r, c)` and `(r+1, c)`.

Rotate counterclockwise if it''s in a vertical position and the two cells to its right are both empty. In that case the snake moves from `(r, c)` and `(r+1, c)` to `(r, c)` and `(r, c+1)`.

Return the minimum number of moves to reach the target.

If there is no way to reach the target, return `-1`.


Example 1:
Input: grid = [[0,0,0,0,0,1],
               [1,1,0,0,1,0],
               [0,0,0,0,1,1],
               [0,0,1,0,1,0],
               [0,1,1,0,0,0],
               [0,1,1,0,0,0]]
Output: 11
Explanation:
One possible solution is [right, right, rotate clockwise, right, down, down, down, down, rotate counterclockwise, right, down].


Example 2:
Input: grid = [[0,0,1,1,1,1],
               [0,0,0,0,1,1],
               [1,1,0,0,0,1],
               [1,1,1,0,0,1],
               [1,1,1,0,0,1],
               [1,1,1,0,0,0]]
Output: 9

Constraints:
`2 <= n <= 100`
`0 <= grid[i][j] <= 1`
It is guaranteed that the snake starts at empty cells.', false, 'Hard', NULL, 46.6, 
   0, 'https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations', 137, 6, 12.8, '["Kakao"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   155, 46, 77, false, '[]'::jsonb, true),
  (1211, 'Queries Quality and Percentage', 'SQL Schema', true, 'Easy', NULL, 70.2, 
   1.5, 'https://leetcode.com/problems/queries-quality-and-percentage', 123, 14.2, 20.2, '["Facebook"]'::jsonb, '[]'::jsonb, 
   55, 101, 35, true, '[]'::jsonb, true),
  (1212, 'Team Scores in Football Tournament', 'SQL Schema', true, 'Medium', NULL, 56.9, 
   6.6, 'https://leetcode.com/problems/team-scores-in-football-tournament', 240, 16, 28.2, '["Oracle,Wayfair"]'::jsonb, '[]'::jsonb, 
   149, 15, 91, false, '[]'::jsonb, true),
  (1213, 'Intersection of Three Sorted Arrays', 'Given three integer arrays `arr1`, `arr2` and `arr3` sorted in strictly increasing order, return a sorted array of only the integers that appeared in all three arrays.


Example 1:
Input: arr1 = [1,2,3,4,5], arr2 = [1,2,5,7,9], arr3 = [1,3,4,5,8]
Output: [1,5]
Explanation: Only 1 and 5 appeared in the three arrays.


Example 2:
Input: arr1 = [197,418,523,876,1356], arr2 = [501,880,1593,1710,1870], arr3 = [521,682,1337,1395,1764]
Output: []

Constraints:
`1 <= arr1.length, arr2.length, arr3.length <= 1000`
`1 <= arr1[i], arr2[i], arr3[i] <= 2000`', true, 'Easy', '/articles/intersection-of-three-sorted-arrays', 79.4, 
   8.6, 'https://leetcode.com/problems/intersection-of-three-sorted-arrays', 385, 43.1, 54.3, '["Facebook"]'::jsonb, '["Hash Table,Two Pointers"]'::jsonb, 
   262, 20, 93, true, '[]'::jsonb, true),
  (1214, 'Two Sum BSTs', 'Given the roots of two binary search trees, `root1` and `root2`, return `true` if and only if there is a node in the first tree and a node in the second tree whose values sum up to a given integer `target`.


Example 1:
Input: root1 = [2,1,4], root2 = [1,0,3], target = 5
Output: true
Explanation: 2 and 3 sum up to 5.


Example 2:
Input: root1 = [0,-10,10], root2 = [5,1,7,0,2], target = 18
Output: false

Constraints:
The number of nodes in each tree is in the range `[1, 5000]`.

`-109 <= Node.val, target <= 109`', true, 'Medium', '/articles/two-sum-bsts', 67.6, 
   8.6, 'https://leetcode.com/problems/two-sum-bsts', 238, 21, 31.1, '["Amazon"]'::jsonb, '["Binary Search Tree"]'::jsonb, 
   255, 25, 91, true, '[]'::jsonb, true),
  (1215, 'Stepping Numbers', 'A Stepping Number is an integer such that all of its adjacent digits have an absolute difference of exactly `1`. For example, `321` is a Stepping Number while `421` is not.

Given two integers `low` and `high`, find and return a sorted list of all the Stepping Numbers in the range `[low, high]` inclusive.


Example 1:
Input: low = 0, high = 21
Output: [0,1,2,3,4,5,6,7,8,9,10,12,21]

Constraints:
`0 <= low <= high <= 2 * 10^9`', true, 'Medium', NULL, 43.6, 
   22.8, 'https://leetcode.com/problems/stepping-numbers', 78, 6.2, 14.1, '["Amazon,Epic Systems"]'::jsonb, '["Backtracking"]'::jsonb, 
   139, 14, 91, true, '[]'::jsonb, true),
  (1216, 'Valid Palindrome III', 'Given a string `s` and an integer `k`, return `true` if `s` is a `k`-palindrome.

A string is `k`-palindrome if it can be transformed into a palindrome by removing at most `k` characters from it.


Example 1:
Input: s = "abcdeca", k = 2
Output: true
Explanation: Remove ''b'' and ''e'' characters.


Example 2:
Input: s = "abbababa", k = 1
Output: true

Constraints:
`1 <= s.length <= 1000`
`s` consists of only lowercase English letters.

`1 <= k <= s.length`', true, 'Hard', '/articles/valid-palindrome-iii', 50, 
   7.9, 'https://leetcode.com/problems/valid-palindrome-iii', 121, 14.2, 28.5, '["Facebook"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   234, 6, 98, true, '[]'::jsonb, true),
  (1217, 'Minimum Cost to Move Chips to The Same Position', 'We have `n` chips, where the position of the `ith` chip is `position[i]`.

We need to move all the chips to the same position. In one step, we can change the position of the `ith` chip from `position[i]` to:
`position[i] + 2` or `position[i] - 2` with `cost = 0`.

`position[i] + 1` or `position[i] - 1` with `cost = 1`.

Return the minimum cost needed to move all the chips to the same position.


Example 1:
Input: position = [1,2,3]
Output: 1
Explanation: First step: Move the chip at position 3 to position 1 with cost = 0.

Second step: Move the chip at position 2 to position 1 with cost = 1.

Total cost is 1.


Example 2:
Input: position = [2,2,2,3,3]
Output: 2
Explanation: We can move the two chips at position  3 to position 2. Each move has cost = 1. The total cost = 2.


Example 3:
Input: position = [1,1000000000]
Output: 1

Constraints:
`1 <= position.length <= 100`
`1 <= position[i] <= 10^9`', false, 'Easy', '/articles/minimum-cost-to-move-chips-to-the-same-position', 71, 
   10.6, 'https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position', 490, 52.6, 74.2, '["Morgan Stanley"]'::jsonb, '["Array,Math,Greedy"]'::jsonb, 
   285, 42, 87, false, '[]'::jsonb, true),
  (1218, 'Longest Arithmetic Subsequence of Given Difference', 'Given an integer array `arr` and an integer `difference`, return the length of the longest subsequence in `arr` which is an arithmetic sequence such that the difference between adjacent elements in the subsequence equals `difference`.

A subsequence is a sequence that can be derived from `arr` by deleting some or no elements without changing the order of the remaining elements.


Example 1:
Input: arr = [1,2,3,4], difference = 1
Output: 4
Explanation: The longest arithmetic subsequence is [1,2,3,4].


Example 2:
Input: arr = [1,3,5,7], difference = 1
Output: 1
Explanation: The longest arithmetic subsequence is any single element.


Example 3:
Input: arr = [1,5,7,8,5,3,4,2,1], difference = -2
Output: 4
Explanation: The longest arithmetic subsequence is [7,5,3,1].


Constraints:
`1 <= arr.length <= 105`
`-104 <= arr[i], difference <= 104`', false, 'Medium', NULL, 46.8, 
   8.1, 'https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference', 235, 24.5, 52.3, '["Google"]'::jsonb, '["Hash Table,Math,Dynamic Programming"]'::jsonb, 
   508, 33, 94, true, '[]'::jsonb, true),
  (1219, 'Path with Maximum Gold', 'In a gold mine `grid` of size `m x n`, each cell in this mine has an integer representing the amount of gold in that cell, `0` if it is empty.

Return the maximum amount of gold you can collect under the conditions:
Every time you are located in a cell you will collect all the gold in that cell.

From your position, you can walk one step to the left, right, up, or down.

You can''t visit the same cell more than once.

Never visit a cell with `0` gold.

You can start and stop collecting gold from any position in the grid that has some gold.


Example 1:
Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
Output: 24
Explanation:
[[0,6,0],
 [5,8,7],
 [0,9,0]]
Path to get the maximum gold, 9 -> 8 -> 7.


Example 2:
Input: grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
Output: 28
Explanation:
[[1,0,7],
 [2,0,6],
 [3,4,5],
 [0,3,0],
 [9,0,20]]
Path to get the maximum gold, 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.


Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 15`
`0 <= grid[i][j] <= 100`
There are at most 25 cells containing gold.', false, 'Medium', NULL, 65.9, 
   22.2, 'https://leetcode.com/problems/path-with-maximum-gold', 510, 51, 77.4, '["Google"]'::jsonb, '["Backtracking"]'::jsonb, 
   959, 35, 96, true, '[]'::jsonb, true),
  (1220, 'Count Vowels Permutation', 'Given an integer `n`, your task is to count how many strings of length `n` can be formed under the following rules:
Each character is a lower case vowel (`''a''`, `''e''`, `''i''`, `''o''`, `''u''`)
Each vowel `''a''` may only be followed by an `''e''`.

Each vowel `''e''` may only be followed by an `''a''` or an `''i''`.

Each vowel `''i''` may not be followed by another `''i''`.

Each vowel `''o''` may only be followed by an `''i''` or a `''u''`.

Each vowel `''u''` may only be followed by an `''a''.`
Since the answer may be too large, return it modulo `10^9 + 7.`

Example 1:
Input: n = 1
Output: 5
Explanation: All possible strings are: "a", "e", "i" , "o" and "u".


Example 2:
Input: n = 2
Output: 10
Explanation: All possible strings are: "ae", "ea", "ei", "ia", "ie", "io", "iu", "oi", "ou" and "ua".


Example 3: 
Input: n = 5
Output: 68

Constraints:
`1 <= n <= 2 * 10^4`', false, 'Hard', NULL, 54, 
   62.9, 'https://leetcode.com/problems/count-vowels-permutation', 239, 16.7, 30.9, '["Swiggy"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   309, 57, 84, false, '[]'::jsonb, true),
  (1221, 'Split a String in Balanced Strings', 'Balanced strings are those that have an equal quantity of `''L''` and `''R''` characters.

Given a balanced string `s`, split it in the maximum amount of balanced strings.

Return the maximum amount of split balanced strings.


Example 1:
Input: s = "RLRRLLRLRL"
Output: 4
Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of ''L'' and ''R''.


Example 2:
Input: s = "RLLLLRRRLR"
Output: 3
Explanation: s can be split into "RL", "LLLRRR", "LR", each substring contains same number of ''L'' and ''R''.


Example 3:
Input: s = "LLLLRRRR"
Output: 1
Explanation: s can be split into "LLLLRRRR".


Example 4:
Input: s = "RLRRRLLRLL"
Output: 2
Explanation: s can be split into "RL", "RRRLLRLL", since each substring contains an equal number of ''L'' and ''R''

Constraints:
`1 <= s.length <= 1000`
`s[i]` is either `''L''` or `''R''`.

`s` is a balanced string.', false, 'Easy', NULL, 84.3, 
   11.9, 'https://leetcode.com/problems/split-a-string-in-balanced-strings', 999, 141.7, 168, '["Walmart Labs"]'::jsonb, '["String,Greedy"]'::jsonb, 
   1018, 593, 63, false, '[]'::jsonb, true),
  (1222, 'Queens That Can Attack the King', 'On an 8x8 chessboard, there can be multiple Black Queens and one White King.

Given an array of integer coordinates `queens` that represents the positions of the Black Queens, and a pair of coordinates `king` that represent the position of the White King, return the coordinates of all the queens (in any order) that can attack the King.


Example 1:
Input: queens = [[0,1],[1,0],[4,0],[0,4],[3,3],[2,4]], king = [0,0]
Output: [[0,1],[1,0],[3,3]]
Explanation:  
The queen at [0,1] can attack the king cause they''re in the same row. 
The queen at [1,0] can attack the king cause they''re in the same column. 
The queen at [3,3] can attack the king cause they''re in the same diagnal. 
The queen at [0,4] can''t attack the king cause it''s blocked by the queen at [0,1]. 
The queen at [4,0] can''t attack the king cause it''s blocked by the queen at [1,0]. 
The queen at [2,4] can''t attack the king cause it''s not in the same row/column/diagnal as the king.


Example 2:
Input: queens = [[0,0],[1,1],[2,2],[3,4],[3,5],[4,4],[4,5]], king = [3,3]
Output: [[2,2],[3,4],[4,4]]

Example 3:
Input: queens = [[5,6],[7,7],[2,1],[0,7],[1,6],[5,1],[3,7],[0,3],[4,0],[1,2],[6,3],[5,0],[0,4],[2,2],[1,1],[6,4],[5,4],[0,0],[2,6],[4,5],[5,2],[1,4],[7,5],[2,3],[0,5],[4,2],[1,0],[2,7],[0,1],[4,6],[6,1],[0,6],[4,3],[1,7]], king = [3,4]
Output: [[2,3],[1,4],[1,6],[3,7],[4,3],[5,4],[4,5]]

Constraints:
`1 <= queens.length <= 63`
`queens[i].length == 2`
`0 <= queens[i][j] < 8`
`king.length == 2`
`0 <= king[0], king[1] < 8`
At most one piece is allowed in a cell.', false, 'Medium', NULL, 69.4, 
   1.8, 'https://leetcode.com/problems/queens-that-can-attack-the-king', 377, 23.8, 34.3, '["Media.net"]'::jsonb, '["Array"]'::jsonb, 
   421, 86, 83, false, '[]'::jsonb, true),
  (1223, 'Dice Roll Simulation', 'A die simulator generates a random number from 1 to 6 for each roll. You introduced a constraint to the generator such that it cannot roll the number `i` more than `rollMax[i]` (1-indexed) consecutive times. 
Given an array of integers `rollMax` and an integer `n`, return the number of distinct sequences that can be obtained with exact `n` rolls.

Two sequences are considered different if at least one element differs from each other. Since the answer may be too large, return it modulo `10^9 + 7`.


Example 1:
Input: n = 2, rollMax = [1,1,2,2,2,3]
Output: 34
Explanation: There will be 2 rolls of die, if there are no constraints on the die, there are 6 * 6 = 36 possible combinations. In this case, looking at rollMax array, the numbers 1 and 2 appear at most once consecutively, therefore sequences (1,1) and (2,2) cannot occur, so the final answer is 36-2 = 34.


Example 2:
Input: n = 2, rollMax = [1,1,1,1,1,1]
Output: 30

Example 3:
Input: n = 3, rollMax = [1,1,1,2,2,3]
Output: 181

Constraints:
`1 <= n <= 5000`
`rollMax.length == 6`
`1 <= rollMax[i] <= 15`', false, 'Hard', NULL, 46.7, 
   6.4, 'https://leetcode.com/problems/dice-roll-simulation', 180, 17.1, 36.6, '["Codenation"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   518, 162, 76, false, '[]'::jsonb, true),
  (1224, 'Maximum Equal Frequency', 'Given an array `nums` of positive integers, return the longest possible length of an array prefix of `nums`, such that it is possible to remove exactly one element from this prefix so that every number that has appeared in it will have the same number of occurrences.

If after removing one element there are no remaining elements, it''s still considered that every appeared number has the same number of ocurrences (0).


Example 1:
Input: nums = [2,2,1,1,5,3,3,5]
Output: 7
Explanation: For the subarray [2,2,1,1,5,3,3] of length 7, if we remove nums[4]=5, we will get [2,2,1,1,3,3], so that each number will appear exactly twice.


Example 2:
Input: nums = [1,1,1,2,2,2,3,3,3,4,4,4,5]
Output: 13

Example 3:
Input: nums = [1,1,1,2,2,2]
Output: 5

Example 4:
Input: nums = [10,2,8,9,3,8,1,5,2,3,7,6]
Output: 8

Constraints:
`2 <= nums.length <= 10^5`
`1 <= nums[i] <= 10^5`', false, 'Hard', NULL, 35.5, 
   0, 'https://leetcode.com/problems/maximum-equal-frequency', 86, 8.3, 23.5, '["American Express"]'::jsonb, '["Hash Table"]'::jsonb, 
   243, 29, 89, false, '[]'::jsonb, true),
  (1225, 'Report Contiguous Dates', 'SQL Schema', true, 'Hard', NULL, 63, 
   2.3, 'https://leetcode.com/problems/report-contiguous-dates', 158, 7, 11.1, '["Amazon,Facebook"]'::jsonb, '[]'::jsonb, 
   123, 10, 92, true, '[]'::jsonb, true),
  (1226, 'The Dining Philosophers', 'Five silent philosophers sit at a round table with bowls of spaghetti. Forks are placed between each pair of adjacent philosophers.

Each philosopher must alternately think and eat. However, a philosopher can only eat spaghetti when they have both left and right forks. Each fork can be held by only one philosopher and so a philosopher can use the fork only if it is not being used by another philosopher. After an individual philosopher finishes eating, they need to put down both forks so that the forks become available to others. A philosopher can take the fork on their right or the one on their left as they become available, but cannot start eating before getting both forks.

Eating is not limited by the remaining amounts of spaghetti or stomach space; an infinite supply and an infinite demand are assumed.

Design a discipline of behaviour (a concurrent algorithm) such that no philosopher will starve; i.e., each can forever continue to alternate between eating and thinking, assuming that no philosopher can know when others may want to eat or think.

The problem statement and the image above are taken from wikipedia.org
The philosophers'' ids are numbered from 0 to 4 in a clockwise order. Implement the function `void wantsToEat(philosopher, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork)` where:
`philosopher` is the id of the philosopher who wants to eat.

`pickLeftFork` and `pickRightFork` are functions you can call to pick the corresponding forks of that philosopher.

`eat` is a function you can call to let the philosopher eat once he has picked both forks.

`putLeftFork` and `putRightFork` are functions you can call to put down the corresponding forks of that philosopher.

The philosophers are assumed to be thinking as long as they are not asking to eat (the function is not being called with their number).

Five threads, each representing a philosopher, will simultaneously use one object of your class to simulate the process. The function may be called for the same philosopher more than once, even before the last call ends.


Example 1:
Input: n = 1
Output: [[4,2,1],[4,1,1],[0,1,1],[2,2,1],[2,1,1],[2,0,3],[2,1,2],[2,2,2],[4,0,3],[4,1,2],[0,2,1],[4,2,2],[3,2,1],[3,1,1],[0,0,3],[0,1,2],[0,2,2],[1,2,1],[1,1,1],[3,0,3],[3,1,2],[3,2,2],[1,0,3],[1,1,2],[1,2,2]]
Explanation:
n is the number of times each philosopher will call the function.

The output array describes the calls you made to the functions controlling the forks and the eat function, its format is:
output[i] = [a, b, c] (three integers)
- a is the id of a philosopher.

- b specifies the fork: {1 : left, 2 : right}.

- c specifies the operation: {1 : pick, 2 : put, 3 : eat}.


Constraints:
`1 <= n <= 60`', false, 'Medium', NULL, 59.9, 
   19.5, 'https://leetcode.com/problems/the-dining-philosophers', 129, 11.6, 19.3, '["Apple"]'::jsonb, '[]'::jsonb, 
   125, 136, 48, true, '[]'::jsonb, true),
  (1227, 'Airplane Seat Assignment Probability', 'n` passengers board an airplane with exactly n` seats. The first passenger has lost the ticket and picks a seat randomly. But after that, the rest of passengers will:
Take their own seat if it is still available, 
Pick other seats randomly when they find their seat occupied 
What is the probability that the n-th person can get his own seat?

Example 1:
Input: n = 1
Output: 1.00000
Explanation: The first person can only get the first seat.


Example 2:
Input: n = 2
Output: 0.50000
Explanation: The second person has a probability of 0.5 to get the second seat (when first person gets the first seat).


Constraints:
`1 <= n <= 10^5`', false, 'Medium', NULL, 62.2, 
   5.9, 'https://leetcode.com/problems/airplane-seat-assignment-probability', 137, 16.6, 26.7, '["Uber,Microstrategy"]'::jsonb, '["Math,Dynamic Programming,Brainteaser"]'::jsonb, 
   254, 453, 36, false, '[]'::jsonb, true),
  (1228, 'Missing Number In Arithmetic Progression', 'In some array `arr`, the values were in arithmetic progression: the values `arr[i+1] - arr[i]` are all equal for every `0 <= i < arr.length - 1`.

Then, a value from `arr` was removed that was not the first or last value in the array.

Return the removed value.


Example 1:
Input: arr = [5,7,11,13]
Output: 9
Explanation: The previous array was [5,7,9,11,13].


Example 2:
Input: arr = [15,13,12]
Output: 14
Explanation: The previous array was [15,14,13,12].


Constraints:
`3 <= arr.length <= 1000`
`0 <= arr[i] <= 10^5`', true, 'Easy', '/articles/missing-number-in-arithmetic-progression', 51, 
   11.2, 'https://leetcode.com/problems/missing-number-in-arithmetic-progression', 123, 10, 19.7, '["Audible"]'::jsonb, '["Math"]'::jsonb, 
   120, 14, 90, false, '[]'::jsonb, true),
  (1229, 'Meeting Scheduler', 'Given the availability time slots arrays `slots1` and `slots2` of two people and a meeting duration `duration`, return the earliest time slot that works for both of them and is of duration `duration`.

If there is no common time slot that satisfies the requirements, return an empty array.

The format of a time slot is an array of two elements `[start, end]` representing an inclusive time range from `start` to `end`.

It is guaranteed that no two availability slots of the same person intersect with each other. That is, for any two time slots `[start1, end1]` and `[start2, end2]` of the same person, either `start1 > end2` or `start2 > end1`.


Example 1:
Input: slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 8
Output: [60,68]

Example 2:
Input: slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 12
Output: []

Constraints:
`1 <= slots1.length, slots2.length <= 104`
`slots1[i].length, slots2[i].length == 2`
`slots1[i][0] < slots1[i][1]`
`slots2[i][0] < slots2[i][1]`
`0 <= slots1[i][j], slots2[i][j] <= 109`
`1 <= duration <= 106`', true, 'Medium', '/articles/meeting-scheduler', 54.4, 
   46.7, 'https://leetcode.com/problems/meeting-scheduler', 233, 27.7, 50.9, '["Amazon,DoorDash"]'::jsonb, '["Two Pointers,Sort,Line Sweep"]'::jsonb, 
   359, 20, 95, true, '[]'::jsonb, true),
  (1230, 'Toss Strange Coins', 'You have some coins.  The `i`-th coin has a probability `prob[i]` of facing heads when tossed.

Return the probability that the number of coins facing heads equals `target` if you toss every coin exactly once.


Example 1:
Input: prob = [0.4], target = 1
Output: 0.40000

Example 2:
Input: prob = [0.5,0.5,0.5,0.5,0.5], target = 0
Output: 0.03125

Constraints:
`1 <= prob.length <= 1000`
`0 <= prob[i] <= 1`
`0 <= target ``<= prob.length`
Answers will be accepted as correct if they are within `10^-5` of the correct answer.', true, 'Medium', NULL, 50.4, 
   0, 'https://leetcode.com/problems/toss-strange-coins', 65, 5.8, 11.6, '["Twitch"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   136, 7, 95, false, '[]'::jsonb, true),
  (1231, 'Divide Chocolate', 'You have one chocolate bar that consists of some chunks. Each chunk has its own sweetness given by the array `sweetness`.

You want to share the chocolate with your `K` friends so you start cutting the chocolate bar into `K+1` pieces using `K` cuts, each piece consists of some consecutive chunks.

Being generous, you will eat the piece with the minimum total sweetness and give the other pieces to your friends.

Find the maximum total sweetness of the piece you can get by cutting the chocolate bar optimally.


Example 1:
Input: sweetness = [1,2,3,4,5,6,7,8,9], K = 5
Output: 6
Explanation: You can divide the chocolate to [1,2,3], [4,5], [6], [7], [8], [9]

Example 2:
Input: sweetness = [5,6,7,8,9,1,2,3,4], K = 8
Output: 1
Explanation: There is only one way to cut the bar into 9 pieces.


Example 3:
Input: sweetness = [1,2,2,1,2,2,1,2,2], K = 2
Output: 5
Explanation: You can divide the chocolate to [1,2,2], [1,2,2], [1,2,2]

Constraints:
`0 <= K < sweetness.length <= 10^4`
`1 <= sweetness[i] <= 10^5`', true, 'Hard', NULL, 53.7, 
   8.3, 'https://leetcode.com/problems/divide-chocolate', 124, 23.6, 44, '["Google"]'::jsonb, '["Binary Search,Greedy"]'::jsonb, 
   455, 33, 93, true, '[]'::jsonb, true),
  (1232, 'Check If It Is a Straight Line', 'You are given an array `coordinates`, `coordinates[i] = [x, y]`, where `[x, y]` represents the coordinate of a point. Check if these points make a straight line in the XY plane.


Example 1:
Input: coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]]
Output: true

Example 2:
Input: coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]]
Output: false

Constraints:
`2 <= coordinates.length <= 1000`
`coordinates[i].length == 2`
`-10^4 <= coordinates[i][0], coordinates[i][1] <= 10^4`
`coordinates` contains no duplicate point.', false, 'Easy', NULL, 43.2, 
   2.7, 'https://leetcode.com/problems/check-if-it-is-a-straight-line', 846, 91.7, 212.1, '["Palantir Technologies"]'::jsonb, '["Array,Math,Geometry"]'::jsonb, 
   547, 86, 86, false, '[]'::jsonb, true),
  (1233, 'Remove Sub-Folders from the Filesystem', 'Given a list of folders, remove all sub-folders in those folders and return in any order the folders after removing.

If a `folder[i]` is located within another `folder[j]`, it is called a sub-folder of it.

The format of a path is one or more concatenated strings of the form: `/` followed by one or more lowercase English letters. For example, `/leetcode` and `/leetcode/problems` are valid paths while an empty string and `/` are not.


Example 1:
Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
Output: ["/a","/c/d","/c/f"]
Explanation: Folders "/a/b/" is a subfolder of "/a" and "/c/d/e" is inside of folder "/c/d" in our filesystem.


Example 2:
Input: folder = ["/a","/a/b/c","/a/b/d"]
Output: ["/a"]
Explanation: Folders "/a/b/c" and "/a/b/d/" will be removed because they are subfolders of "/a".


Example 3:
Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
Output: ["/a/b/c","/a/b/ca","/a/b/d"]

Constraints:
`1 <= folder.length <= 4 * 10^4`
`2 <= folder[i].length <= 100`
`folder[i]` contains only lowercase letters and ''/''
`folder[i]` always starts with character ''/''
Each folder name is unique.', false, 'Medium', NULL, 62.4, 
   22.1, 'https://leetcode.com/problems/remove-sub-folders-from-the-filesystem', 302, 28.4, 45.4, '["Facebook"]'::jsonb, '["Array,String"]'::jsonb, 
   364, 60, 86, true, '[]'::jsonb, true),
  (1234, 'Replace the Substring for Balanced String', 'You are given a string containing only 4 kinds of characters `''Q'',` `''W'', ''E''` and `''R''`.

A string is said to be balanced if each of its characters appears `n/4` times where `n` is the length of the string.

Return the minimum length of the substring that can be replaced with any other string of the same length to make the original string `s` balanced.

Return 0 if the string is already balanced.


Example 1:
Input: s = "QWER"
Output: 0
Explanation: s is already balanced.


Example 2:
Input: s = "QQWE"
Output: 1
Explanation: We need to replace a ''Q'' to ''R'', so that "RQWE" (or "QRWE") is balanced.


Example 3:
Input: s = "QQQW"
Output: 2
Explanation: We can replace the first "QQ" to "ER". 

Example 4:
Input: s = "QQQQ"
Output: 3
Explanation: We can replace the last 3 ''Q'' to make s = "QWER".


Constraints:
`1 <= s.length <= 10^5`
`s.length` is a multiple of `4`
`s `contains only `''Q''`, `''W''`, `''E''` and `''R''`.', false, 'Medium', NULL, 34.6, 
   5.6, 'https://leetcode.com/problems/replace-the-substring-for-balanced-string', 161, 16.1, 46.5, '["Accolite"]'::jsonb, '["Two Pointers,String"]'::jsonb, 
   482, 106, 82, false, '[]'::jsonb, true),
  (1235, 'Maximum Profit in Job Scheduling', 'We have `n` jobs, where every job is scheduled to be done from `startTime[i]` to `endTime[i]`, obtaining a profit of `profit[i]`.

You''re given the `startTime`, `endTime` and `profit` arrays, return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.

If you choose a job that ends at time `X` you will be able to start another job that starts at time `X`.


Example 1:
Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
Output: 120
Explanation: The subset chosen is the first and fourth job. 
Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.


Example 2:
Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
Output: 150
Explanation: The subset chosen is the first, fourth and fifth job. 
Profit obtained 150 = 20 + 70 + 60.


Example 3:
Input: startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
Output: 6

Constraints:
`1 <= startTime.length == endTime.length == profit.length <= 5 * 104`
`1 <= startTime[i] < endTime[i] <= 109`
`1 <= profit[i] <= 104`', false, 'Hard', NULL, 47.6, 
   82.7, 'https://leetcode.com/problems/maximum-profit-in-job-scheduling', 271, 36.9, 77.4, '["LinkedIn,DoorDash,ByteDance,Amazon,Cisco,Databricks,Bloomberg,Dunzo,Swiggy"]'::jsonb, '["Binary Search,Dynamic Programming,Sort"]'::jsonb, 
   1183, 13, 99, true, '[]'::jsonb, true),
  (1236, 'Web Crawler', 'Given a url `startUrl` and an interface `HtmlParser`, implement a web crawler to crawl all links that are under the same hostname as `startUrl`. 
Return all urls obtained by your web crawler in any order.

Your crawler should:
Start from the page: `startUrl`
Call `HtmlParser.getUrls(url)` to get all urls from a webpage of given url.

Do not crawl the same link twice.

Explore only the links that are under the same hostname as `startUrl`.

As shown in the example url above, the hostname is `example.org`. For simplicity sake, you may assume all urls use http protocol without any port specified. For example, the urls `http://leetcode.com/problems` and `http://leetcode.com/contest` are under the same hostname, while urls `http://example.org/test` and `http://example.com/abc` are not under the same hostname.

The `HtmlParser` interface is defined as such: 
interface HtmlParser {
  // Return a list of all urls from a webpage of given url.

  public List<String> getUrls(String url);
}
Below are two examples explaining the functionality of the problem, for custom testing purposes you''ll have three variables urls`, edges` and startUrl`. Notice that you will only have access to startUrl` in your code, while urls` and edges` are not directly accessible to you in code.


Example 1:
Input:
urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com",
  "http://news.yahoo.com/us"
]
edges = [[2,0],[2,1],[3,2],[3,1],[0,4]]
startUrl = "http://news.yahoo.com/news/topics/"
Output: [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.yahoo.com/us"
]

Example 2:
Input: 
urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com"
]
edges = [[0,2],[2,1],[3,2],[3,1],[3,0]]
startUrl = "http://news.google.com"
Output: ["http://news.google.com"]
Explanation: The startUrl links to all other pages that do not share the same hostname.


Constraints:
`1 <= urls.length <= 1000`
`1 <= urls[i].length <= 300`
`startUrl` is one of the `urls`.

Hostname label must be from 1 to 63 characters long, including the dots, may contain only the ASCII letters from ''a'' to ''z'', digits  from ''0'' to ''9'' and the hyphen-minus character (''-'').

The hostname may not start or end with the hyphen-minus character (''-''). 
See:  https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_hostnames
You may assume there''re no duplicates in url library.', true, 'Medium', NULL, 64.7, 
   21.2, 'https://leetcode.com/problems/web-crawler', 130, 15.4, 23.8, '["Amazon"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   125, 154, 45, true, '[]'::jsonb, true),
  (1237, 'Find Positive Integer Solution for a Given Equation', 'Given a callable function `f(x, y)` with a hidden formula and a value `z`, reverse engineer the formula and return all positive integer pairs `x` and `y` where `f(x,y) == z`. You may return the pairs in any order.

While the exact formula is hidden, the function is monotonically increasing, i.e.:
`f(x, y) < f(x + 1, y)`
`f(x, y) < f(x, y + 1)`
The function interface is defined like this:
interface CustomFunction {
public:
  // Returns some positive integer f(x, y) for two positive integers x and y based on a formula.

  int f(int x, int y);
};
We will judge your solution as follows:
The judge has a list of `9` hidden implementations of `CustomFunction`, along with a way to generate an answer key of all valid pairs for a specific `z`.

The judge will receive two inputs: a `function_id` (to determine which implementation to test your code with), and the target `z`.

The judge will call your `findSolution` and compare your results with the answer key.

If your results match the answer key, your solution will be `Accepted`.


Example 1:
Input: function_id = 1, z = 5
Output: [[1,4],[2,3],[3,2],[4,1]]
Explanation: The hidden formula for function_id = 1 is f(x, y) = x + y.

The following positive integer values of x and y make f(x, y) equal to 5:
x=1, y=4 -> f(1, 4) = 1 + 4 = 5.

x=2, y=3 -> f(2, 3) = 2 + 3 = 5.

x=3, y=2 -> f(3, 2) = 3 + 2 = 5.

x=4, y=1 -> f(4, 1) = 4 + 1 = 5.


Example 2:
Input: function_id = 2, z = 5
Output: [[1,5],[5,1]]
Explanation: The hidden formula for function_id = 2 is f(x, y) = x * y.

The following positive integer values of x and y make f(x, y) equal to 5:
x=1, y=5 -> f(1, 5) = 1 * 5 = 5.

x=5, y=1 -> f(5, 1) = 5 * 1 = 5.


Constraints:
`1 <= function_id <= 9`
`1 <= z <= 100`
It is guaranteed that the solutions of `f(x, y) == z` will be in the range `1 <= x, y <= 1000`.

It is also guaranteed that `f(x, y)` will fit in 32 bit signed integer if `1 <= x, y <= 1000`.', false, 'Medium', NULL, 70.1, 
   3.2, 'https://leetcode.com/problems/find-positive-integer-solution-for-a-given-equation', 243, 35.9, 51.2, '["Google"]'::jsonb, '["Math,Binary Search"]'::jsonb, 
   230, 894, 20, true, '[]'::jsonb, true),
  (1238, 'Circular Permutation in Binary Representation', 'Given 2 integers `n` and `start`. Your task is return any permutation `p` of `(0,1,2.....,2^n -1) `such that :
`p[0] = start`
`p[i]` and `p[i+1]` differ by only one bit in their binary representation.

`p[0]` and `p[2^n -1]` must also differ by only one bit in their binary representation.


Example 1:
Input: n = 2, start = 3
Output: [3,2,0,1]
Explanation: The binary representation of the permutation is (11,10,00,01). 
All the adjacent element differ by one bit. Another valid permutation is [3,1,0,2]

Example 2:
Input: n = 3, start = 2
Output: [2,6,7,5,4,0,1,3]
Explanation: The binary representation of the permutation is (010,110,111,101,100,000,001,011).


Constraints:
`1 <= n <= 16`
`0 <= start < 2 ^ n`', false, 'Medium', NULL, 66.4, 
   0, 'https://leetcode.com/problems/circular-permutation-in-binary-representation', 110, 9.1, 13.7, '["Walmart,Walmart Labs"]'::jsonb, '["Math"]'::jsonb, 
   139, 124, 53, false, '[]'::jsonb, true),
  (1239, 'Maximum Length of a Concatenated String with Unique Characters', 'Given an array of strings `arr`. String `s` is a concatenation of a sub-sequence of `arr` which have unique characters.

Return the maximum possible length of `s`.


Example 1:
Input: arr = ["un","iq","ue"]
Output: 4
Explanation: All possible concatenations are "","un","iq","ue","uniq" and "ique".

Maximum length is 4.


Example 2:
Input: arr = ["cha","r","act","ers"]
Output: 6
Explanation: Possible solutions are "chaers" and "acters".


Example 3:
Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
Output: 26

Constraints:
`1 <= arr.length <= 16`
`1 <= arr[i].length <= 26`
`arr[i]` contains only lower case English letters.', false, 'Medium', NULL, 49.9, 
   51, 'https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters', 430, 54.6, 109.3, '["Tesla,Microsoft,Oracle,DiDi"]'::jsonb, '["Backtracking,Bit Manipulation"]'::jsonb, 
   855, 84, 91, false, '[]'::jsonb, true),
  (1240, 'Tiling a Rectangle with the Fewest Squares', 'Given a rectangle of size `n` x `m`, find the minimum number of integer-sided squares that tile the rectangle.


Example 1:
Input: n = 2, m = 3
Output: 3
Explanation: `3` squares are necessary to cover the rectangle.

`2` (squares of `1x1`)
`1` (square of `2x2`)

Example 2:
Input: n = 5, m = 8
Output: 5

Example 3:
Input: n = 11, m = 13
Output: 6

Constraints:
`1 <= n <= 13`
`1 <= m <= 13`', false, 'Hard', NULL, 52.8, 
   22.9, 'https://leetcode.com/problems/tiling-a-rectangle-with-the-fewest-squares', 114, 11.6, 22, '["Google"]'::jsonb, '["Dynamic Programming,Backtracking"]'::jsonb, 
   293, 298, 50, true, '[]'::jsonb, true),
  (1241, 'Number of Comments per Post', 'SQL Schema', true, 'Easy', NULL, 67.8, 
   2.8, 'https://leetcode.com/problems/number-of-comments-per-post', 168, 16.5, 24.3, '["Facebook"]'::jsonb, '[]'::jsonb, 
   96, 217, 31, true, '[]'::jsonb, true),
  (1242, 'Web Crawler Multithreaded', 'Given a url `startUrl` and an interface `HtmlParser`, implement a Multi-threaded web crawler to crawl all links that are under the same hostname as `startUrl`. 
Return all urls obtained by your web crawler in any order.

Your crawler should:
Start from the page: `startUrl`
Call `HtmlParser.getUrls(url)` to get all urls from a webpage of given url.

Do not crawl the same link twice.

Explore only the links that are under the same hostname as `startUrl`.

As shown in the example url above, the hostname is `example.org`. For simplicity sake, you may assume all urls use http protocol without any port specified. For example, the urls `http://leetcode.com/problems` and `http://leetcode.com/contest` are under the same hostname, while urls `http://example.org/test` and `http://example.com/abc` are not under the same hostname.

The `HtmlParser` interface is defined as such: 
interface HtmlParser {
  // Return a list of all urls from a webpage of given url.

  // This is a blocking call, that means it will do HTTP request and return when this request is finished.

  public List<String> getUrls(String url);
}
Note that `getUrls(String url)` simulates performing a HTTP request. You can treat it as a blocking function call which waits for a HTTP request to finish. It is guaranteed that `getUrls(String url)` will return the urls within 15ms.  Single-threaded solutions will exceed the time limit so, can your multi-threaded web crawler do better?
Below are two examples explaining the functionality of the problem, for custom testing purposes you''ll have three variables urls`, edges` and startUrl`. Notice that you will only have access to startUrl` in your code, while urls` and edges` are not directly accessible to you in code.

Follow up:
Assume we have 10,000 nodes and 1 billion URLs to crawl. We will deploy the same software onto each node. The software can know about all the nodes. We have to minimize communication between machines and make sure each node does equal amount of work. How would your web crawler design change?
What if one node fails or does not work?
How do you know when the crawler is done?

Example 1:
Input:
urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com",
  "http://news.yahoo.com/us"
]
edges = [[2,0],[2,1],[3,2],[3,1],[0,4]]
startUrl = "http://news.yahoo.com/news/topics/"
Output: [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.yahoo.com/us"
]

Example 2:
Input: 
urls = [
  "http://news.yahoo.com",
  "http://news.yahoo.com/news",
  "http://news.yahoo.com/news/topics/",
  "http://news.google.com"
]
edges = [[0,2],[2,1],[3,2],[3,1],[3,0]]
startUrl = "http://news.google.com"
Output: ["http://news.google.com"]
Explanation: The startUrl links to all other pages that do not share the same hostname.


Constraints:
`1 <= urls.length <= 1000`
`1 <= urls[i].length <= 300`
`startUrl` is one of the `urls`.

Hostname label must be from 1 to 63 characters long, including the dots, may contain only the ASCII letters from ''a'' to ''z'', digits from ''0'' to ''9'' and the hyphen-minus character (''-'').

The hostname may not start or end with the hyphen-minus character (''-''). 
See:  https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_hostnames
You may assume there''re no duplicates in url library.', true, 'Medium', NULL, 47.6, 
   54.8, 'https://leetcode.com/problems/web-crawler-multithreaded', 122, 19.3, 40.5, '["Databricks,Dropbox"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   262, 52, 83, false, '[]'::jsonb, true),
  (1243, 'Array Transformation', 'Given an initial array `arr`, every day you produce a new array using the array of the previous day.

On the `i`-th day, you do the following operations on the array of day `i-1` to produce the array of day `i`:
If an element is smaller than both its left neighbor and its right neighbor, then this element is incremented.

If an element is bigger than both its left neighbor and its right neighbor, then this element is decremented.

The first and last elements never change.

After some days, the array does not change. Return that final array.


Example 1:
Input: arr = [6,2,3,4]
Output: [6,3,3,4]
Explanation: 
On the first day, the array is changed from [6,2,3,4] to [6,3,3,4].

No more operations can be done to this array.


Example 2:
Input: arr = [1,6,3,4,3,5]
Output: [1,4,4,4,4,5]
Explanation: 
On the first day, the array is changed from [1,6,3,4,3,5] to [1,5,4,3,4,5].

On the second day, the array is changed from [1,5,4,3,4,5] to [1,4,4,4,4,5].

No more operations can be done to this array.


Constraints:
`3 <= arr.length <= 100`
`1 <= arr[i] <= 100`', true, 'Easy', NULL, 50, 
   15.5, 'https://leetcode.com/problems/array-transformation', 115, 8.2, 16.3, '["Virtu Financial"]'::jsonb, '["Array"]'::jsonb, 
   80, 40, 67, false, '[]'::jsonb, true),
  (1244, 'Design A Leaderboard', 'Design a Leaderboard class, which has 3 functions:
`addScore(playerId, score)`: Update the leaderboard by adding `score` to the given player''s score. If there is no player with such id in the leaderboard, add him to the leaderboard with the given `score`.

`top(K)`: Return the score sum of the top `K` players.

`reset(playerId)`: Reset the score of the player with the given id to 0 (in other words erase it from the leaderboard). It is guaranteed that the player was added to the leaderboard before calling this function.

Initially, the leaderboard is empty.


Example 1:
Input: 
["Leaderboard","addScore","addScore","addScore","addScore","addScore","top","reset","reset","addScore","top"]
[[],[1,73],[2,56],[3,39],[4,51],[5,4],[1],[1],[2],[2,51],[3]]
Output: 
[null,null,null,null,null,null,73,null,null,null,141]
Explanation: 
Leaderboard leaderboard = new Leaderboard ();
leaderboard.addScore(1,73);   // leaderboard = [[1,73]];
leaderboard.addScore(2,56);   // leaderboard = [[1,73],[2,56]];
leaderboard.addScore(3,39);   // leaderboard = [[1,73],[2,56],[3,39]];
leaderboard.addScore(4,51);   // leaderboard = [[1,73],[2,56],[3,39],[4,51]];
leaderboard.addScore(5,4);    // leaderboard = [[1,73],[2,56],[3,39],[4,51],[5,4]];
leaderboard.top(1);           // returns 73;
leaderboard.reset(1);         // leaderboard = [[2,56],[3,39],[4,51],[5,4]];
leaderboard.reset(2);         // leaderboard = [[3,39],[4,51],[5,4]];
leaderboard.addScore(2,51);   // leaderboard = [[2,51],[3,39],[4,51],[5,4]];
leaderboard.top(3);           // returns 141 = 51 + 51 + 39;

Constraints:
`1 <= playerId, K <= 10000`
It''s guaranteed that `K` is less than or equal to the current number of players.

`1 <= score <= 100`
There will be at most `1000` function calls.', true, 'Medium', '/articles/design-a-leaderboard', 66.5, 
   53.2, 'https://leetcode.com/problems/design-a-leaderboard', 184, 20.2, 30.4, '["Bloomberg,Google"]'::jsonb, '["Hash Table,Sort,Design"]'::jsonb, 
   246, 56, 81, true, '[]'::jsonb, true),
  (1245, 'Tree Diameter', 'Given an undirected tree, return its diameter: the number of edges in a longest path in that tree.

The tree is given as an array of `edges` where `edges[i] = [u, v]` is a bidirectional edge between nodes `u` and `v`.  Each node has labels in the set `{0, 1, ..., edges.length}`.


Example 1:
Input: edges = [[0,1],[0,2]]
Output: 2
Explanation: 
A longest path of the tree is the path 1 - 0 - 2.


Example 2:
Input: edges = [[0,1],[1,2],[2,3],[1,4],[4,5]]
Output: 4
Explanation: 
A longest path of the tree is the path 3 - 2 - 1 - 4 - 5.


Constraints:
`0 <= edges.length < 10^4`
`edges[i][0] != edges[i][1]`
`0 <= edges[i][j] <= edges.length`
The given edges form an undirected tree.', true, 'Medium', '/articles/tree-diameter', 61.3, 
   8.8, 'https://leetcode.com/problems/tree-diameter', 184, 18.3, 29.9, '["Google"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   454, 10, 98, true, '[]'::jsonb, true),
  (1246, 'Palindrome Removal', 'Given an integer array `arr`, in one move you can select a palindromic subarray `arr[i], arr[i+1], ..., arr[j]` where `i <= j`, and remove that subarray from the given array. Note that after removing a subarray, the elements on the left and on the right of that subarray move to fill the gap left by the removal.

Return the minimum number of moves needed to remove all numbers from the array.


Example 1:
Input: arr = [1,2]
Output: 2

Example 2:
Input: arr = [1,3,4,1,5]
Output: 3
Explanation: Remove [4] then remove [1,3,1] then remove [5].


Constraints:
`1 <= arr.length <= 100`
`1 <= arr[i] <= 20`', true, 'Hard', NULL, 45.8, 
   0, 'https://leetcode.com/problems/palindrome-removal', 56, 7.1, 15.5, '["Microsoft"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   222, 7, 97, false, '[]'::jsonb, true),
  (1247, 'Minimum Swaps to Make Strings Equal', 'You are given two strings `s1` and `s2` of equal length consisting of letters `"x"` and `"y"` only. Your task is to make these two strings equal to each other. You can swap any two characters that belong to different strings, which means: swap `s1[i]` and `s2[j]`.

Return the minimum number of swaps required to make `s1` and `s2` equal, or return `-1` if it is impossible to do so.


Example 1:
Input: s1 = "xx", s2 = "yy"
Output: 1
Explanation: 
Swap s1[0] and s2[1], s1 = "yx", s2 = "yx".


Example 2: 
Input: s1 = "xy", s2 = "yx"
Output: 2
Explanation: 
Swap s1[0] and s2[0], s1 = "yy", s2 = "xx".

Swap s1[0] and s2[1], s1 = "xy", s2 = "xy".

Note that you can''t swap s1[0] and s1[1] to make s1 equal to "yx", cause we can only swap chars in different strings.


Example 3:
Input: s1 = "xx", s2 = "xy"
Output: -1

Example 4:
Input: s1 = "xxyyxyxyxx", s2 = "xyyxyxxxyx"
Output: 4

Constraints:
`1 <= s1.length, s2.length <= 1000`
`s1, s2` only contain `''x''` or `''y''`.', false, 'Medium', NULL, 62.9, 
   14.6, 'https://leetcode.com/problems/minimum-swaps-to-make-strings-equal', 314, 20.1, 32, '["Bloomberg"]'::jsonb, '["String,Greedy"]'::jsonb, 
   496, 169, 75, false, '[]'::jsonb, true),
  (1248, 'Count Number of Nice Subarrays', 'Given an array of integers `nums` and an integer `k`. A continuous subarray is called nice if there are `k` odd numbers on it.

Return the number of nice sub-arrays.


Example 1:
Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].


Example 2:
Input: nums = [2,4,6], k = 1
Output: 0
Explanation: There is no odd numbers in the array.


Example 3:
Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
Output: 16

Constraints:
`1 <= nums.length <= 50000`
`1 <= nums[i] <= 10^5`
`1 <= k <= nums.length`', false, 'Medium', NULL, 56.1, 
   24.5, 'https://leetcode.com/problems/count-number-of-nice-subarrays', 302, 29.2, 52, '["Citadel"]'::jsonb, '["Two Pointers"]'::jsonb, 
   810, 23, 97, false, '[]'::jsonb, true),
  (1249, 'Minimum Remove to Make Valid Parentheses', 'Given a string s of `''(''` , `'')''` and lowercase English characters. 
Your task is to remove the minimum number of parentheses ( `''(''` or `'')''`, in any positions ) so that the resulting parentheses string is valid and return any valid string.

Formally, a parentheses string is valid if and only if:
It is the empty string, contains only lowercase characters, or
It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are valid strings, or
It can be written as `(A)`, where `A` is a valid string.


Example 1:
Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.


Example 2:
Input: s = "a)b(c)d"
Output: "ab(c)d"

Example 3:
Input: s = "))(("
Output: ""
Explanation: An empty string is also valid.


Example 4:
Input: s = "(a(b(c)d)"
Output: "a(b(c)d)"

Constraints:
`1 <= s.length <= 10^5`
`s[i]` is one of  `''(''` , `'')''` and lowercase English letters`.`', false, 'Medium', '/articles/minimum-remove-to-make-valid-parentheses', 64.2, 
   84.5, 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses', 999, 183.3, 285.4, '["Facebook,ByteDance,Bloomberg,Amazon,Goldman Sachs,LinkedIn,Apple"]'::jsonb, '["String,Stack"]'::jsonb, 
   1968, 46, 98, true, '[]'::jsonb, true),
  (1250, 'Check If It Is a Good Array', 'Given an array `nums` of positive integers. Your task is to select some subset of `nums`, multiply each element by an integer and add all these numbers. The array is said to be good if you can obtain a sum of `1` from the array by any possible subset and multiplicand.

Return `True` if the array is good otherwise return `False`.


Example 1:
Input: nums = [12,5,7,23]
Output: true
Explanation: Pick numbers 5 and 7.

5*3 + 7*(-2) = 1

Example 2:
Input: nums = [29,6,10]
Output: true
Explanation: Pick numbers 29, 6 and 10.

29*1 + 6*(-3) + 10*(-1) = 1

Example 3:
Input: nums = [3,6]
Output: false

Constraints:
`1 <= nums.length <= 10^5`
`1 <= nums[i] <= 10^9`', false, 'Hard', NULL, 56.2, 
   0, 'https://leetcode.com/problems/check-if-it-is-a-good-array', 79, 9.1, 16.2, '["Dropbox"]'::jsonb, '["Math"]'::jsonb, 
   134, 207, 39, false, '[]'::jsonb, true),
  (1251, 'Average Selling Price', 'SQL Schema', true, 'Easy', NULL, 82.7, 
   0, 'https://leetcode.com/problems/average-selling-price', 177, 20.5, 24.7, '["Amazon"]'::jsonb, '[]'::jsonb, 
   146, 16, 90, true, '[]'::jsonb, true),
  (1252, 'Cells with Odd Values in a Matrix', 'There is an `m x n` matrix that is initialized to all `0`''s. There is also a 2D array `indices` where each `indices[i] = [ri, ci]` represents a 0-indexed location to perform some increment operations on the matrix.

For each location `indices[i]`, do both of the following:
Increment all the cells on row `ri`.

Increment all the cells on column `ci`.

Given `m`, `n`, and `indices`, return the number of odd-valued cells in the matrix after applying the increment to all locations in `indices`.


Example 1:
Input: m = 2, n = 3, indices = [[0,1],[1,1]]
Output: 6
Explanation: Initial matrix = [[0,0,0],[0,0,0]].

After applying first increment it becomes [[1,2,1],[0,1,0]].

The final matrix is [[1,3,1],[1,3,1]], which contains 6 odd numbers.


Example 2:
Input: m = 2, n = 2, indices = [[1,1],[0,0]]
Output: 0
Explanation: Final matrix = [[2,2],[2,2]]. There are no odd numbers in the final matrix.


Constraints:
`1 <= m, n <= 50`
`1 <= indices.length <= 100`
`0 <= ri < m`
`0 <= ci < n`
Follow up: Could you solve this in `O(n + m + indices.length)` time with only `O(n + m)` extra space?', false, 'Easy', NULL, 78.7, 
   7, 'https://leetcode.com/problems/cells-with-odd-values-in-a-matrix', 627, 59.9, 76.2, '[]'::jsonb, '[]'::jsonb, 
   448, 749, 37, false, '[]'::jsonb, true),
  (1253, 'Reconstruct a 2-Row Binary Matrix', 'Given the following details of a matrix with `n` columns and `2` rows :
The matrix is a binary matrix, which means each element in the matrix can be `0` or `1`.

The sum of elements of the 0-th(upper) row is given as `upper`.

The sum of elements of the 1-st(lower) row is given as `lower`.

The sum of elements in the i-th column(0-indexed) is `colsum[i]`, where `colsum` is given as an integer array with length `n`.

Your task is to reconstruct the matrix with `upper`, `lower` and `colsum`.

Return it as a 2-D integer array.

If there are more than one valid solution, any of them will be accepted.

If no valid solution exists, return an empty 2-D array.


Example 1:
Input: upper = 2, lower = 1, colsum = [1,1,1]
Output: [[1,1,0],[0,0,1]]
Explanation: [[1,0,1],[0,1,0]], and [[0,1,1],[1,0,0]] are also correct answers.


Example 2:
Input: upper = 2, lower = 3, colsum = [2,2,1,1]
Output: []

Example 3:
Input: upper = 5, lower = 5, colsum = [2,1,2,0,1,0,1,2,0,1]
Output: [[1,1,1,0,1,0,0,1,0,0],[1,0,1,0,0,0,1,1,0,1]]

Constraints:
`1 <= colsum.length <= 10^5`
`0 <= upper, lower <= colsum.length`
`0 <= colsum[i] <= 2`', false, 'Medium', NULL, 41.8, 
   27.8, 'https://leetcode.com/problems/reconstruct-a-2-row-binary-matrix', 189, 14.6, 35, '["Grab"]'::jsonb, '["Math,Greedy"]'::jsonb, 
   202, 18, 92, false, '[]'::jsonb, true),
  (1254, 'Number of Closed Islands', 'Given a 2D `grid` consists of `0s` (land) and `1s` (water).  An island is a maximal 4-directionally connected group of `0s` and a closed island is an island totally (all left, top, right, bottom) surrounded by `1s.`
Return the number of closed islands.


Example 1:
Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
Output: 2
Explanation: 
Islands in gray are closed because they are completely surrounded by water (group of 1s).


Example 2:
Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
Output: 1

Example 3:
Input: grid = [[1,1,1,1,1,1,1],
               [1,0,0,0,0,0,1],
               [1,0,1,1,1,0,1],
               [1,0,1,0,1,0,1],
               [1,0,1,1,1,0,1],
               [1,0,0,0,0,0,1],
               [1,1,1,1,1,1,1]]
Output: 2

Constraints:
`1 <= grid.length, grid[0].length <= 100`
`0 <= grid[i][j] <=1`', false, 'Medium', NULL, 61.8, 
   29, 'https://leetcode.com/problems/number-of-closed-islands', 487, 42.3, 68.5, '["Google,Amazon,Oracle,Uber"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   788, 23, 97, true, '[]'::jsonb, true),
  (1255, 'Maximum Score Words Formed by Letters', 'Given a list of `words`, list of  single `letters` (might be repeating) and `score` of every character.

Return the maximum score of any valid set of words formed by using the given letters (`words[i]` cannot be used two or more times).

It is not necessary to use all characters in `letters` and each letter can only be used once. Score of letters `''a''`, `''b''`, `''c''`, ... ,`''z''` is given by `score[0]`, `score[1]`, ... , `score[25]` respectively.


Example 1:
Input: words = ["dog","cat","dad","good"], letters = ["a","a","c","d","d","d","g","o","o"], score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
Output: 23
Explanation:
Score  a=1, c=9, d=5, g=3, o=2
Given letters, we can form the words "dad" (5+1+5) and "good" (3+2+2+5) with a score of 23.

Words "dad" and "dog" only get a score of 21.


Example 2:
Input: words = ["xxxz","ax","bx","cx"], letters = ["z","a","b","c","x","x","x"], score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
Output: 27
Explanation:
Score  a=4, b=4, c=4, x=5, z=10
Given letters, we can form the words "ax" (4+5), "bx" (4+5) and "cx" (4+5) with a score of 27.

Word "xxxz" only get a score of 25.


Example 3:
Input: words = ["leetcode"], letters = ["l","e","t","c","o","d"], score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
Output: 0
Explanation:
Letter "e" can only be used once.


Constraints:
`1 <= words.length <= 14`
`1 <= words[i].length <= 15`
`1 <= letters.length <= 100`
`letters[i].length == 1`
`score.length == 26`
`0 <= score[i] <= 10`
`words[i]`, `letters[i]` contains only lower case English letters.', false, 'Hard', NULL, 70.1, 
   13.4, 'https://leetcode.com/problems/maximum-score-words-formed-by-letters', 201, 12, 17.2, '["Google"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   274, 26, 91, true, '[]'::jsonb, true),
  (1256, 'Encode Number', 'Given a non-negative integer `num`, Return its encoding string.

The encoding is done by converting the integer to a string using a secret function that you should deduce from the following table:

Example 1:
Input: num = 23
Output: "1000"

Example 2:
Input: num = 107
Output: "101100"

Constraints:
`0 <= num <= 10^9`', true, 'Medium', NULL, 67.9, 
   33.8, 'https://leetcode.com/problems/encode-number', 89, 4.7, 6.9, '["Quora"]'::jsonb, '["Math,Bit Manipulation"]'::jsonb, 
   42, 144, 23, false, '[]'::jsonb, true),
  (1257, 'Smallest Common Region', 'You are given some lists of `regions` where the first region of each list includes all other regions in that list.

Naturally, if a region `X` contains another region `Y` then `X` is bigger than `Y`. Also by definition a region X contains itself.

Given two regions `region1`, `region2`, find out the smallest region that contains both of them.

If you are given regions `r1`, `r2` and `r3` such that `r1` includes `r3`, it is guaranteed there is no `r2` such that `r2` includes `r3`.

It''s guaranteed the smallest region exists.


Example 1:
Input:
regions = [["Earth","North America","South America"],
["North America","United States","Canada"],
["United States","New York","Boston"],
["Canada","Ontario","Quebec"],
["South America","Brazil"]],
region1 = "Quebec",
region2 = "New York"
Output: "North America"

Constraints:
`2 <= regions.length <= 10^4`
`region1 != region2`
All strings consist of English letters and spaces with at most 20 letters.', true, 'Medium', NULL, 61.1, 
   12.5, 'https://leetcode.com/problems/smallest-common-region', 119, 8.2, 13.4, '["Airbnb"]'::jsonb, '["Tree"]'::jsonb, 
   205, 20, 91, false, '[]'::jsonb, true),
  (1258, 'Synonymous Sentences', 'Given a list of pairs of equivalent words `synonyms` and a sentence `text`, Return all possible synonymous sentences sorted lexicographically.


Example 1:
Input:
synonyms = [["happy","joy"],["sad","sorrow"],["joy","cheerful"]],
text = "I am happy today but was sad yesterday"
Output:
["I am cheerful today but was sad yesterday",
"I am cheerful today but was sorrow yesterday",
"I am happy today but was sad yesterday",
"I am happy today but was sorrow yesterday",
"I am joy today but was sad yesterday",
"I am joy today but was sorrow yesterday"]

Example 2:
Input: synonyms = [["happy","joy"],["cheerful","glad"]], text = "I am happy today but was sad yesterday"
Output: ["I am happy today but was sad yesterday","I am joy today but was sad yesterday"]

Example 3:
Input: synonyms = [["a","b"],["c","d"],["e","f"]], text = "a c e"
Output: ["a c e","a c f","a d e","a d f","b c e","b c f","b d e","b d f"]

Example 4:
Input: synonyms = [["a","QrbCl"]], text = "d QrbCl ya ya NjZQ"
Output: ["d QrbCl ya ya NjZQ","d a ya ya NjZQ"]

Constraints:
`0 <= synonyms.length <= 10`
`synonyms[i].length == 2`
`synonyms[i][0] != synonyms[i][1]`
All words consist of at most `10` English letters only.

`text` is a single space separated sentence of at most `10` words.', true, 'Medium', NULL, 62.3, 
   0, 'https://leetcode.com/problems/synonymous-sentences', 144, 7.5, 12, '["Amazon"]'::jsonb, '["Backtracking"]'::jsonb, 
   129, 43, 75, true, '[]'::jsonb, true),
  (1259, 'Handshakes That Don''t Cross', 'You are given an even number of people `num_people` that stand around a circle and each person shakes hands with someone else, so that there are `num_people / 2` handshakes total.

Return the number of ways these handshakes could occur such that none of the handshakes cross.

Since this number could be very big, return the answer mod `10^9 + 7`

Example 1:
Input: num_people = 2
Output: 1

Example 2:
Input: num_people = 4
Output: 2
Explanation: There are two ways to do it, the first way is [(1,2),(3,4)] and the second one is [(2,3),(4,1)].


Example 3:
Input: num_people = 6
Output: 5

Example 4:
Input: num_people = 8
Output: 14

Constraints:
`2 <= num_people <= 1000`
`num_people % 2 == 0`', true, 'Hard', NULL, 54.3, 
   0, 'https://leetcode.com/problems/handshakes-that-dont-cross', 41, 3.7, 6.7, '["Amazon"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   83, 6, 93, true, '[]'::jsonb, true),
  (1260, 'Shift 2D Grid', 'Given a 2D `grid` of size `m x n` and an integer `k`. You need to shift the `grid` `k` times.

In one shift operation:
Element at `grid[i][j]` moves to `grid[i][j + 1]`.

Element at `grid[i][n - 1]` moves to `grid[i + 1][0]`.

Element at `grid[m - 1][n - 1]` moves to `grid[0][0]`.

Return the 2D grid after applying shift operation `k` times.


Example 1:
Input: `grid` = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[9,1,2],[3,4,5],[6,7,8]]

Example 2:
Input: `grid` = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4
Output: [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]

Example 3:
Input: `grid` = [[1,2,3],[4,5,6],[7,8,9]], k = 9
Output: [[1,2,3],[4,5,6],[7,8,9]]

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m <= 50`
`1 <= n <= 50`
`-1000 <= grid[i][j] <= 1000`
`0 <= k <= 100`', false, 'Easy', '/articles/shift-2d-grid', 61.8, 
   0, 'https://leetcode.com/problems/shift-2d-grid', 391, 25.3, 40.9, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   315, 121, 72, true, '[]'::jsonb, true),
  (1261, 'Find Elements in a Contaminated Binary Tree', 'Given a binary tree with the following rules:
`root.val == 0`
If `treeNode.val == x` and `treeNode.left != null`, then `treeNode.left.val == 2 * x + 1`
If `treeNode.val == x` and `treeNode.right != null`, then `treeNode.right.val == 2 * x + 2`
Now the binary tree is contaminated, which means all `treeNode.val` have been changed to `-1`.

You need to first recover the binary tree and then implement the `FindElements` class:
`FindElements(TreeNode* root)` Initializes the object with a contamined binary tree, you need to recover it first.

`bool find(int target)` Return if the `target` value exists in the recovered binary tree.


Example 1:
Input
["FindElements","find","find"]
[[[-1,null,-1]],[1],[2]]
Output
[null,false,true]
Explanation
FindElements findElements = new FindElements([-1,null,-1]); 
findElements.find(1); // return False 
findElements.find(2); // return True 

Example 2:
Input
["FindElements","find","find","find"]
[[[-1,-1,-1,-1,-1]],[1],[3],[5]]
Output
[null,true,true,false]
Explanation
FindElements findElements = new FindElements([-1,-1,-1,-1,-1]);
findElements.find(1); // return True
findElements.find(3); // return True
findElements.find(5); // return False

Example 3:
Input
["FindElements","find","find","find","find"]
[[[-1,null,-1,-1,null,-1]],[2],[3],[4],[5]]
Output
[null,true,false,false,true]
Explanation
FindElements findElements = new FindElements([-1,null,-1,-1,null,-1]);
findElements.find(2); // return True
findElements.find(3); // return False
findElements.find(4); // return False
findElements.find(5); // return True

Constraints:
`TreeNode.val == -1`
The height of the binary tree is less than or equal to `20`
The total number of nodes is between `[1, 10^4]`
Total calls of `find()` is between `[1, 10^4]`
`0 <= target <= 10^6`', false, 'Medium', NULL, 74.6, 
   0, 'https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree', 328, 29.9, 40.1, '["Google"]'::jsonb, '["Hash Table,Tree"]'::jsonb, 
   343, 56, 86, true, '[]'::jsonb, true),
  (1262, 'Greatest Sum Divisible by Three', 'Given an array `nums` of integers, we need to find the maximum possible sum of elements of the array such that it is divisible by three.


Example 1:
Input: nums = [3,6,5,1,8]
Output: 18
Explanation: Pick numbers 3, 6, 1 and 8 their sum is 18 (maximum sum divisible by 3).


Example 2:
Input: nums = [4]
Output: 0
Explanation: Since 4 is not divisible by 3, do not pick any number.


Example 3:
Input: nums = [1,2,3,4,4]
Output: 12
Explanation: Pick numbers 1, 3, 4 and 4 their sum is 12 (maximum sum divisible by 3).


Constraints:
`1 <= nums.length <= 4 * 10^4`
`1 <= nums[i] <= 10^4`', false, 'Medium', NULL, 49.9, 
   27.4, 'https://leetcode.com/problems/greatest-sum-divisible-by-three', 235, 26.6, 53.4, '["Facebook"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   727, 20, 97, true, '[]'::jsonb, true),
  (1263, 'Minimum Moves to Move a Box to Their Target Location', 'Storekeeper is a game in which the player pushes boxes around in a warehouse trying to get them to target locations.

The game is represented by a `grid` of size `m x n`, where each element is a wall, floor, or a box.

Your task is move the box `''B''` to the target position `''T''` under the following rules:
Player is represented by character `''S''` and can move up, down, left, right in the `grid` if it is a floor (empy cell).

Floor is represented by character `''.''` that means free cell to walk.

Wall is represented by character `''#''` that means obstacle  (impossible to walk there). 
There is only one box `''B''` and one target cell `''T''` in the `grid`.

The box can be moved to an adjacent free cell by standing next to the box and then moving in the direction of the box. This is a push.

The player cannot walk through the box.

Return the minimum number of pushes to move the box to the target. If there is no way to reach the target, return `-1`.


Example 1:
Input: grid = [["#","#","#","#","#","#"],
               ["#","T","#","#","#","#"],
               ["#",".",".","B",".","#"],
               ["#",".","#","#",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
Output: 3
Explanation: We return only the number of times the box is pushed.


Example 2:
Input: grid = [["#","#","#","#","#","#"],
               ["#","T","#","#","#","#"],
               ["#",".",".","B",".","#"],
               ["#","#","#","#",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
Output: -1

Example 3:
Input: grid = [["#","#","#","#","#","#"],
               ["#","T",".",".","#","#"],
               ["#",".","#","B",".","#"],
               ["#",".",".",".",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
Output: 5
Explanation:  push the box down, left, left, up and up.


Example 4:
Input: grid = [["#","#","#","#","#","#","#"],
               ["#","S","#",".","B","T","#"],
               ["#","#","#","#","#","#","#"]]
Output: -1

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m <= 20`
`1 <= n <= 20`
`grid` contains only characters `''.''`, `''#''`,  `''S''` , `''T''`, or `''B''`.

There is only one character `''S''`, `''B''` and `''T''` in the `grid`.', false, 'Hard', NULL, 43.6, 
   6.2, 'https://leetcode.com/problems/minimum-moves-to-move-a-box-to-their-target-location', 105, 6, 13.8, '[]'::jsonb, '[]'::jsonb, 
   288, 12, 96, false, '[]'::jsonb, true),
  (1264, 'Page Recommendations', 'SQL Schema', true, 'Medium', NULL, 69.2, 
   0, 'https://leetcode.com/problems/page-recommendations', 225, 12.6, 18.3, '["Facebook"]'::jsonb, '[]'::jsonb, 
   80, 1, 99, true, '[]'::jsonb, true),
  (1265, 'Print Immutable Linked List in Reverse', 'You are given an immutable linked list, print out all values of each node in reverse with the help of the following interface:
`ImmutableListNode`: An interface of immutable linked list, you are given the head of the list.

You need to use the following functions to access the linked list (you can''t access the `ImmutableListNode` directly):
`ImmutableListNode.printValue()`: Print value of the current node.

`ImmutableListNode.getNext()`: Return the next node.

The input is only given to initialize the linked list internally. You must solve this problem without modifying the linked list. In other words, you must operate the linked list using only the mentioned APIs.


Example 1:
Input: head = [1,2,3,4]
Output: [4,3,2,1]

Example 2:
Input: head = [0,-4,-1,3,-5]
Output: [-5,3,-1,-4,0]

Example 3:
Input: head = [-2,0,6,4,4,-6]
Output: [-6,4,4,6,0,-2]

Constraints:
The length of the linked list is between `[1, 1000]`.

The value of each node in the linked list is between `[-1000, 1000]`.

Follow up:
Could you solve this problem in:
Constant space complexity?
Linear time complexity and less than linear space complexity?', true, 'Medium', NULL, 94.3, 
   4, 'https://leetcode.com/problems/print-immutable-linked-list-in-reverse', 201, 24, 25.4, '["Google,Facebook"]'::jsonb, '[]'::jsonb, 
   266, 54, 83, true, '[]'::jsonb, true),
  (1266, 'Minimum Time Visiting All Points', 'On a 2D plane, there are `n` points with integer coordinates `points[i] = [xi, yi]`. Return the minimum time in seconds to visit all the points in the order given by `points`.

You can move according to these rules:
In `1` second, you can either:
	
move vertically by one unit,
move horizontally by one unit, or
move diagonally `sqrt(2)` units (in other words, move one unit vertically then one unit horizontally in `1` second).

You have to visit the points in the same order as they appear in the array.

You are allowed to pass through points that appear later in the order, but these do not count as visits.


Example 1:
Input: points = [[1,1],[3,4],[-1,0]]
Output: 7
Explanation: One optimal path is [1,1] -> [2,2] -> [3,3] -> [3,4] -> [2,3] -> [1,2] -> [0,1] -> [-1,0]   
Time from [1,1] to [3,4] = 3 seconds 
Time from [3,4] to [-1,0] = 4 seconds
Total time = 7 seconds

Example 2:
Input: points = [[3,2],[-2,2]]
Output: 5

Constraints:
`points.length == n`
`1 <= n <= 100`
`points[i].length == 2`
`-1000 <= points[i][0], points[i][1] <= 1000`', false, 'Easy', NULL, 79.3, 
   9.1, 'https://leetcode.com/problems/minimum-time-visiting-all-points', 788, 86.1, 108.6, '["Bloomberg,Amazon,Facebook"]'::jsonb, '["Array,Geometry"]'::jsonb, 
   779, 122, 86, true, '[]'::jsonb, true),
  (1267, 'Count Servers that Communicate', 'You are given a map of a server center, represented as a `m * n` integer matrix `grid`, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the same column.

Return the number of servers that communicate with any other server.


Example 1:
Input: grid = [[1,0],[0,1]]
Output: 0
Explanation: No servers can communicate with others.


Example 2:
Input: grid = [[1,0],[1,1]]
Output: 3
Explanation: All three servers can communicate with at least one other server.


Example 3:
Input: grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
Output: 4
Explanation: The two servers in the first row can communicate with each other. The two servers in the third column can communicate with each other. The server at right bottom corner can''t communicate with any other server.


Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m <= 250`
`1 <= n <= 250`
`grid[i][j] == 0 or 1`', false, 'Medium', NULL, 57.8, 
   2.4, 'https://leetcode.com/problems/count-servers-that-communicate', 326, 29.4, 50.8, '["Google,Amazon"]'::jsonb, '["Array,Graph"]'::jsonb, 
   545, 53, 91, true, '[]'::jsonb, true),
  (1268, 'Search Suggestions System', 'Given an array of strings `products` and a string `searchWord`. We want to design a system that suggests at most three product names from `products` after each character of `searchWord` is typed. Suggested products should have common prefix with the searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.

Return list of lists of the suggested `products` after each character of `searchWord` is typed. 

Example 1:
Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [
["mobile","moneypot","monitor"],
["mobile","moneypot","monitor"],
["mouse","mousepad"],
["mouse","mousepad"],
["mouse","mousepad"]
]
Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"]
After typing m and mo all products match and we show user ["mobile","moneypot","monitor"]
After typing mou, mous and mouse the system suggests ["mouse","mousepad"]

Example 2:
Input: products = ["havana"], searchWord = "havana"
Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]

Example 3:
Input: products = ["bags","baggage","banner","box","cloths"], searchWord = "bags"
Output: [["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]

Example 4:
Input: products = ["havana"], searchWord = "tatiana"
Output: [[],[],[],[],[],[],[]]

Constraints:
`1 <= products.length <= 1000`
There are no repeated elements in `products`.

`1 <= Σ products[i].length <= 2 * 10^4`
All characters of `products[i]` are lower-case English letters.

`1 <= searchWord.length <= 1000`
All characters of `searchWord` are lower-case English letters.', false, 'Medium', '/articles/search-suggestions-system', 64.7, 
   30.8, 'https://leetcode.com/problems/search-suggestions-system', 619, 73.7, 113.8, '["Amazon,Bloomberg"]'::jsonb, '["String"]'::jsonb, 
   968, 90, 91, true, '[]'::jsonb, true),
  (1269, 'Number of Ways to Stay in the Same Place After Some Steps', 'You have a pointer at index `0` in an array of size `arrLen`. At each step, you can move 1 position to the left, 1 position to the right in the array or stay in the same place  (The pointer should not be placed outside the array at any time).

Given two integers `steps` and `arrLen`, return the number of ways such that your pointer still at index `0` after exactly `steps` steps.

Since the answer may be too large, return it modulo `10^9 + 7`.


Example 1:
Input: steps = 3, arrLen = 2
Output: 4
Explanation: There are 4 differents ways to stay at index 0 after 3 steps.

Right, Left, Stay
Stay, Right, Left
Right, Stay, Left
Stay, Stay, Stay

Example 2:
Input: steps = 2, arrLen = 4
Output: 2
Explanation: There are 2 differents ways to stay at index 0 after 2 steps
Right, Left
Stay, Stay

Example 3:
Input: steps = 4, arrLen = 2
Output: 8

Constraints:
`1 <= steps <= 500`
`1 <= arrLen <= 10^6`', false, 'Hard', NULL, 43.3, 
   2.2, 'https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps', 220, 19.1, 44.2, '["Facebook"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   361, 21, 95, true, '[]'::jsonb, true),
  (1270, 'All People Report to the Given Manager', 'SQL Schema', true, 'Medium', NULL, 88.3, 
   21.6, 'https://leetcode.com/problems/all-people-report-to-the-given-manager', 257, 22.3, 25.2, '["Amazon"]'::jsonb, '[]'::jsonb, 
   185, 15, 92, true, '[]'::jsonb, true),
  (1271, 'Hexspeak', 'A decimal number can be converted to its Hexspeak representation by first converting it to an uppercase hexadecimal string, then replacing all occurrences of the digit `0` with the letter `O`, and the digit `1` with the letter `I`.  Such a representation is valid if and only if it consists only of the letters in the set `{"A", "B", "C", "D", "E", "F", "I", "O"}`.

Given a string `num` representing a decimal integer `N`, return the Hexspeak representation of `N` if it is valid, otherwise return `"ERROR"`.


Example 1:
Input: num = "257"
Output: "IOI"
Explanation:  257 is 101 in hexadecimal.


Example 2:
Input: num = "3"
Output: "ERROR"

Constraints:
`1 <= N <= 10^12`
There are no leading zeros in the given string.

All answers must be in uppercase letters.', true, 'Easy', NULL, 55.5, 
   26.6, 'https://leetcode.com/problems/hexspeak', 99, 6.3, 11.4, '["Virtu Financial"]'::jsonb, '["Math,String"]'::jsonb, 
   46, 79, 37, false, '[]'::jsonb, true),
  (1272, 'Remove Interval', 'A set of real numbers can be represented as the union of several disjoint intervals, where each interval is in the form `[a, b)`. A real number `x` is in the set if one of its intervals `[a, b)` contains `x` (i.e. `a <= x < b`).

You are given a sorted list of disjoint intervals `intervals` representing a set of real numbers as described above, where `intervals[i] = [ai, bi]` represents the interval `[ai, bi)`. You are also given another interval `toBeRemoved`.

Return the set of real numbers with the interval `toBeRemoved` removed from `intervals`. In other words, return the set of real numbers such that every `x` in the set is in `intervals` but not in `toBeRemoved`. Your answer should be a sorted list of disjoint intervals as described above.


Example 1:
Input: intervals = [[0,2],[3,4],[5,7]], toBeRemoved = [1,6]
Output: [[0,1],[6,7]]

Example 2:
Input: intervals = [[0,5]], toBeRemoved = [2,3]
Output: [[0,2],[3,5]]

Example 3:
Input: intervals = [[-5,-4],[-3,-2],[1,2],[3,5],[8,9]], toBeRemoved = [-1,4]
Output: [[-5,-4],[-3,-2],[4,5],[8,9]]

Constraints:
`1 <= intervals.length <= 104`
`-109 <= ai < bi <= 109`', true, 'Medium', '/articles/remove-interval', 58.3, 
   3.5, 'https://leetcode.com/problems/remove-interval', 140, 12.7, 21.8, '["Google"]'::jsonb, '["Math,Line Sweep"]'::jsonb, 
   189, 17, 92, true, '[]'::jsonb, true),
  (1273, 'Delete Tree Nodes', 'A tree rooted at node 0 is given as follows:
The number of nodes is `nodes`;
The value of the `i`-th node is `value[i]`;
The parent of the `i`-th node is `parent[i]`.

Remove every subtree whose sum of values of nodes is zero.

After doing so, return the number of nodes remaining in the tree.


Example 1:
Input: nodes = 7, parent = [-1,0,0,1,2,2,2], value = [1,-2,4,0,-2,-1,-1]
Output: 2

Example 2:
Input: nodes = 7, parent = [-1,0,0,1,2,2,2], value = [1,-2,4,0,-2,-1,-2]
Output: 6

Example 3:
Input: nodes = 5, parent = [-1,0,1,0,0], value = [-672,441,18,728,378]
Output: 5

Example 4:
Input: nodes = 5, parent = [-1,0,0,1,1], value = [-686,-842,616,-739,-746]
Output: 5

Constraints:
`1 <= nodes <= 10^4`
`parent.length == nodes`
`0 <= parent[i] <= nodes - 1`
`parent[0] == -1` which indicates that `0` is the root.

`value.length == nodes`
`-10^5 <= value[i] <= 10^5`
The given input is guaranteed to represent a valid tree.', true, 'Medium', NULL, 62, 
   0, 'https://leetcode.com/problems/delete-tree-nodes', 101, 6.8, 10.9, '["Microsoft"]'::jsonb, '["Dynamic Programming,Depth-first Search"]'::jsonb, 
   154, 46, 77, false, '[]'::jsonb, true),
  (1274, 'Number of Ships in a Rectangle', '(This problem is an interactive problem.)
Each ship is located at an integer point on the sea represented by a cartesian plane, and each integer point may contain at most 1 ship.

You have a function `Sea.hasShips(topRight, bottomLeft)` which takes two points as arguments and returns `true` If there is at least one ship in the rectangle represented by the two points, including on the boundary.

Given two points: the top right and bottom left corners of a rectangle, return the number of ships present in that rectangle. It is guaranteed that there are at most 10 ships in that rectangle.

Submissions making more than 400 calls to `hasShips` will be judged Wrong Answer. Also, any solutions that attempt to circumvent the judge will result in disqualification.


Example :
Input: 
ships = [[1,1],[2,2],[3,3],[5,5]], topRight = [4,4], bottomLeft = [0,0]
Output: 3
Explanation: From [0,0] to [4,4] we can count 3 ships within the range.


Constraints:
On the input `ships` is only given to initialize the map internally. You must solve this problem "blindfolded". In other words, you must find the answer using the given `hasShips` API, without knowing the `ships` position.

`0 <= bottomLeft[0] <= topRight[0] <= 1000`
`0 <= bottomLeft[1] <= topRight[1] <= 1000`
`topRight != bottomLeft`', true, 'Hard', NULL, 65.9, 
   11.7, 'https://leetcode.com/problems/number-of-ships-in-a-rectangle', 82, 9.6, 14.6, '["Bloomberg"]'::jsonb, '["Divide and Conquer"]'::jsonb, 
   178, 29, 86, false, '[]'::jsonb, true),
  (1275, 'Find Winner on a Tic Tac Toe Game', 'Tic-tac-toe is played by two players A and B on a 3 x 3 grid.

Here are the rules of Tic-Tac-Toe:
Players take turns placing characters into empty squares (" ").

The first player A always places "X" characters, while the second player B always places "O" characters.

"X" and "O" characters are always placed into empty squares, never on filled ones.

The game ends when there are 3 of the same (non-empty) character filling any row, column, or diagonal.

The game also ends if all squares are non-empty.

No more moves can be played if the game is over.

Given an array `moves` where each element is another array of size 2 corresponding to the row and column of the grid where they mark their respective character in the order in which A and B play.

Return the winner of the game if it exists (A or B), in case the game ends in a draw return "Draw", if there are still movements to play return "Pending".

You can assume that `moves` is valid (It follows the rules of Tic-Tac-Toe), the grid is initially empty and A will play first.


Example 1:
Input: moves = [[0,0],[2,0],[1,1],[2,1],[2,2]]
Output: "A"
Explanation: "A" wins, he always plays first.

"X  "    "X  "    "X  "    "X  "    "X  "
"   " -> "   " -> " X " -> " X " -> " X "
"   "    "O  "    "O  "    "OO "    "OOX"

Example 2:
Input: moves = [[0,0],[1,1],[0,1],[0,2],[1,0],[2,0]]
Output: "B"
Explanation: "B" wins.

"X  "    "X  "    "XX "    "XXO"    "XXO"    "XXO"
"   " -> " O " -> " O " -> " O " -> "XO " -> "XO " 
"   "    "   "    "   "    "   "    "   "    "O  "

Example 3:
Input: moves = [[0,0],[1,1],[2,0],[1,0],[1,2],[2,1],[0,1],[0,2],[2,2]]
Output: "Draw"
Explanation: The game ends in a draw since there are no moves to make.

"XXO"
"OOX"
"XOX"

Example 4:
Input: moves = [[0,0],[1,1]]
Output: "Pending"
Explanation: The game has not finished yet.

"X  "
" O "
"   "

Constraints:
`1 <= moves.length <= 9`
`moves[i].length == 2`
`0 <= moves[i][j] <= 2`
There are no repeated elements on `moves`.

`moves` follow the rules of tic tac toe.', false, 'Easy', NULL, 52.8, 
   27.9, 'https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game', 370, 26.9, 50.8, '["Facebook"]'::jsonb, '["Array"]'::jsonb, 
   326, 99, 77, true, '[]'::jsonb, true),
  (1276, 'Number of Burgers with No Waste of Ingredients', 'Given two integers `tomatoSlices` and `cheeseSlices`. The ingredients of different burgers are as follows:
Jumbo Burger: 4 tomato slices and 1 cheese slice.

Small Burger: 2 Tomato slices and 1 cheese slice.

Return `[total_jumbo, total_small]` so that the number of remaining `tomatoSlices` equal to 0 and the number of remaining `cheeseSlices` equal to 0. If it is not possible to make the remaining `tomatoSlices` and `cheeseSlices` equal to 0 return `[]`.


Example 1:
Input: tomatoSlices = 16, cheeseSlices = 7
Output: [1,6]
Explantion: To make one jumbo burger and 6 small burgers we need 4*1 + 2*6 = 16 tomato and 1 + 6 = 7 cheese. There will be no remaining ingredients.


Example 2:
Input: tomatoSlices = 17, cheeseSlices = 4
Output: []
Explantion: There will be no way to use all ingredients to make small and jumbo burgers.


Example 3:
Input: tomatoSlices = 4, cheeseSlices = 17
Output: []
Explantion: Making 1 jumbo burger there will be 16 cheese remaining and making 2 small burgers there will be 15 cheese remaining.


Example 4:
Input: tomatoSlices = 0, cheeseSlices = 0
Output: [0,0]

Example 5:
Input: tomatoSlices = 2, cheeseSlices = 1
Output: [0,1]

Constraints:
`0 <= tomatoSlices <= 10^7`
`0 <= cheeseSlices <= 10^7`', false, 'Medium', NULL, 50.2, 
   3.3, 'https://leetcode.com/problems/number-of-burgers-with-no-waste-of-ingredients', 200, 13.8, 27.5, '["Delivery Hero"]'::jsonb, '["Math,Greedy"]'::jsonb, 
   141, 159, 47, false, '[]'::jsonb, true),
  (1277, 'Count Square Submatrices with All Ones', 'Given a `m * n` matrix of ones and zeros, return how many square submatrices have all ones.


Example 1:
Input: matrix =
[
  [0,1,1,1],
  [1,1,1,1],
  [0,1,1,1]
]
Output: 15
Explanation: 
There are 10 squares of side 1.

There are 4 squares of side 2.

There is  1 square of side 3.

Total number of squares = 10 + 4 + 1 = 15.


Example 2:
Input: matrix = 
[
  [1,0,1],
  [1,1,0],
  [1,1,0]
]
Output: 7
Explanation: 
There are 6 squares of side 1.  
There is 1 square of side 2. 
Total number of squares = 6 + 1 = 7.


Constraints:
`1 <= arr.length <= 300`
`1 <= arr[0].length <= 300`
`0 <= arr[i][j] <= 1`', false, 'Medium', NULL, 72.8, 
   38.1, 'https://leetcode.com/problems/count-square-submatrices-with-all-ones', 614, 94.7, 130.1, '["Google,Amazon"]'::jsonb, '["Array,Dynamic Programming"]'::jsonb, 
   1777, 33, 98, true, '[]'::jsonb, true),
  (1278, 'Palindrome Partitioning III', 'You are given a string `s` containing lowercase letters and an integer `k`. You need to :
First, change some characters of `s` to other lowercase English letters.

Then divide `s` into `k` non-empty disjoint substrings such that each substring is palindrome.

Return the minimal number of characters that you need to change to divide the string.


Example 1:
Input: s = "abc", k = 2
Output: 1
Explanation: You can split the string into "ab" and "c", and change 1 character in "ab" to make it palindrome.


Example 2:
Input: s = "aabbc", k = 3
Output: 0
Explanation: You can split the string into "aa", "bb" and "c", all of them are palindrome.


Example 3:
Input: s = "leetcode", k = 8
Output: 0

Constraints:
`1 <= k <= s.length <= 100`.

`s` only contains lowercase English letters.', false, 'Hard', NULL, 61.1, 
   0, 'https://leetcode.com/problems/palindrome-partitioning-iii', 184, 12.4, 20.2, '["Uber,Apple"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   426, 9, 98, true, '[]'::jsonb, true),
  (1279, 'Traffic Light Controlled Intersection', 'There is an intersection of two roads. First road is road A where cars travel from North to South in direction 1 and from South to North in direction 2. Second road is road B where cars travel from West to East in direction 3 and from East to West in direction 4.

There is a traffic light located on each road before the intersection. A traffic light can either be green or red.

Green means cars can cross the intersection in both directions of the road.

Red means cars in both directions cannot cross the intersection and must wait until the light turns green.

The traffic lights cannot be green on both roads at the same time. That means when the light is green on road A, it is red on road B and when the light is green on road B, it is red on road A.

Initially, the traffic light is green on road A and red on road B. When the light is green on one road, all cars can cross the intersection in both directions until the light becomes green on the other road. No two cars traveling on different roads should cross at the same time.

Design a deadlock-free traffic light controlled system at this intersection.

Implement the function `void carArrived(carId, roadId, direction, turnGreen, crossCar)` where:
`carId` is the id of the car that arrived.

`roadId` is the id of the road that the car travels on.

`direction` is the direction of the car.

`turnGreen` is a function you can call to turn the traffic light to green on the current road.

`crossCar` is a function you can call to let the current car cross the intersection.

Your answer is considered correct if it avoids cars deadlock in the intersection. Turning the light green on a road when it was already green is considered a wrong answer.


Example 1:
Input: cars = [1,3,5,2,4], directions = [2,1,2,4,3], arrivalTimes = [10,20,30,40,50]
Output: [
"Car 1 Has Passed Road A In Direction 2",    // Traffic light on road A is green, car 1 can cross the intersection.

"Car 3 Has Passed Road A In Direction 1",    // Car 3 crosses the intersection as the light is still green.

"Car 5 Has Passed Road A In Direction 2",    // Car 5 crosses the intersection as the light is still green.

"Traffic Light On Road B Is Green",          // Car 2 requests green light for road B.

"Car 2 Has Passed Road B In Direction 4",    // Car 2 crosses as the light is green on road B now.

"Car 4 Has Passed Road B In Direction 3"     // Car 4 crosses the intersection as the light is still green.

]

Example 2:
Input: cars = [1,2,3,4,5], directions = [2,4,3,3,1], arrivalTimes = [10,20,30,40,40]
Output: [
"Car 1 Has Passed Road A In Direction 2",    // Traffic light on road A is green, car 1 can cross the intersection.

"Traffic Light On Road B Is Green",          // Car 2 requests green light for road B.

"Car 2 Has Passed Road B In Direction 4",    // Car 2 crosses as the light is green on road B now.

"Car 3 Has Passed Road B In Direction 3",    // Car 3 crosses as the light is green on road B now.

"Traffic Light On Road A Is Green",          // Car 5 requests green light for road A.

"Car 5 Has Passed Road A In Direction 1",    // Car 5 crosses as the light is green on road A now.

"Traffic Light On Road B Is Green",          // Car 4 requests green light for road B. Car 4 blocked until car 5 crosses and then traffic light is green on road B.

"Car 4 Has Passed Road B In Direction 3"     // Car 4 crosses as the light is green on road B now.

]
Explanation: This is a dead-lock free scenario. Note that the scenario when car 4 crosses before turning light into green on road A and allowing car 5 to pass is also correct and Accepted scenario.


Constraints:
`1 <= cars.length <= 20`
`cars.length = directions.length`
`cars.length = arrivalTimes.length`
All values of `cars` are unique
`1 <= directions[i] <= 4`
`arrivalTimes` is non-decreasing', true, 'Easy', NULL, 76.2, 
   5.3, 'https://leetcode.com/problems/traffic-light-controlled-intersection', 63, 5.8, 7.6, '["Amazon"]'::jsonb, '[]'::jsonb, 
   36, 196, 16, true, '[]'::jsonb, true),
  (1280, 'Students and Examinations', 'SQL Schema', true, 'Easy', NULL, 75.3, 
   0, 'https://leetcode.com/problems/students-and-examinations', 141, 13.7, 18.1, '["Roblox"]'::jsonb, '[]'::jsonb, 
   155, 21, 88, false, '[]'::jsonb, true),
  (1281, 'Subtract the Product and Sum of Digits of an Integer', 'Given an integer number `n`, return the difference between the product of its digits and the sum of its digits.


Example 1:
Input: n = 234
Output: 15 
Explanation: 
Product of digits = 2 * 3 * 4 = 24 
Sum of digits = 2 + 3 + 4 = 9 
Result = 24 - 9 = 15

Example 2:
Input: n = 4421
Output: 21
Explanation: 
Product of digits = 4 * 4 * 2 * 1 = 32 
Sum of digits = 4 + 4 + 2 + 1 = 11 
Result = 32 - 11 = 21

Constraints:
`1 <= n <= 10^5`', false, 'Easy', NULL, 85.6, 
   7.4, 'https://leetcode.com/problems/subtract-the-product-and-sum-of-digits-of-an-integer', 999, 136.7, 159.7, '["Quora,Uber"]'::jsonb, '["Math"]'::jsonb, 
   509, 136, 79, false, '[]'::jsonb, true),
  (1282, 'Group the People Given the Group Size They Belong To', 'There are `n` people that are split into some unknown number of groups. Each person is labeled with a unique ID from `0` to `n - 1`.

You are given an integer array `groupSizes`, where `groupSizes[i]` is the size of the group that person `i` is in. For example, if `groupSizes[1] = 3`, then person `1` must be in a group of size `3`.

Return a list of groups such that each person `i` is in a group of size `groupSizes[i]`.

Each person should appear in exactly one group, and every person must be in a group. If there are multiple answers, return any of them. It is guaranteed that there will be at least one valid solution for the given input.


Example 1:
Input: groupSizes = [3,3,3,3,3,1,3]
Output: [[5],[0,1,2],[3,4,6]]
Explanation: 
The first group is [5]. The size is 1, and groupSizes[5] = 1.

The second group is [0,1,2]. The size is 3, and groupSizes[0] = groupSizes[1] = groupSizes[2] = 3.

The third group is [3,4,6]. The size is 3, and groupSizes[3] = groupSizes[4] = groupSizes[6] = 3.

Other possible solutions are [[2,1,6],[5],[0,4,3]] and [[5],[0,6,2],[4,3,1]].


Example 2:
Input: groupSizes = [2,1,3,3,3,2]
Output: [[1],[0,5],[2,3,4]]

Constraints:
`groupSizes.length == n`
`1 <= n <= 500`
`1 <= groupSizes[i] <= n`', false, 'Medium', NULL, 84.4, 
   13.1, 'https://leetcode.com/problems/group-the-people-given-the-group-size-they-belong-to', 708, 55.5, 65.7, '["Roblox"]'::jsonb, '["Greedy"]'::jsonb, 
   531, 370, 59, false, '[]'::jsonb, true),
  (1283, 'Find the Smallest Divisor Given a Threshold', 'Given an array of integers `nums` and an integer `threshold`, we will choose a positive integer `divisor`, divide all the array by it, and sum the division''s result. Find the smallest `divisor` such that the result mentioned above is less than or equal to `threshold`.

Each result of the division is rounded to the nearest integer greater than or equal to that element. (For example: `7/3 = 3` and `10/2 = 5`).

It is guaranteed that there will be an answer.


Example 1:
Input: nums = [1,2,5,9], threshold = 6
Output: 5
Explanation: We can get a sum to 17 (1+2+5+9) if the divisor is 1. 
If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2). 

Example 2:
Input: nums = [44,22,33,11,1], threshold = 5
Output: 44

Example 3:
Input: nums = [21212,10101,12121], threshold = 1000000
Output: 1

Example 4:
Input: nums = [2,3,5,7,11], threshold = 11
Output: 3

Constraints:
`1 <= nums.length <= 5 * 104`
`1 <= nums[i] <= 106`
`nums.length <= threshold <= 106`', false, 'Medium', '/articles/find-the-smallest-divisor-given-a-threshold', 49.9, 
   44.9, 'https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold', 348, 55.8, 111.8, '["Salesforce,Google"]'::jsonb, '["Binary Search"]'::jsonb, 
   716, 128, 85, true, '[]'::jsonb, true),
  (1284, 'Minimum Number of Flips to Convert Binary Matrix to Zero Matrix', 'Given a `m x n` binary matrix `mat`. In one step, you can choose one cell and flip it and all the four neighbours of it if they exist (Flip is changing 1 to 0 and 0 to 1). A pair of cells are called neighboors if they share one edge.

Return the minimum number of steps required to convert `mat` to a zero matrix or -1 if you cannot.

Binary matrix is a matrix with all cells equal to 0 or 1 only.

Zero matrix is a matrix with all cells equal to 0.


Example 1:
Input: mat = [[0,0],[0,1]]
Output: 3
Explanation: One possible solution is to flip (1, 0) then (0, 1) and finally (1, 1) as shown.


Example 2:
Input: mat = [[0]]
Output: 0
Explanation: Given matrix is a zero matrix. We don''t need to change it.


Example 3:
Input: mat = [[1,1,1],[1,0,1],[0,0,0]]
Output: 6

Example 4:
Input: mat = [[1,0,0],[1,0,0]]
Output: -1
Explanation: Given matrix can''t be a zero matrix

Constraints:
`m == mat.length`
`n == mat[0].length`
`1 <= m <= 3`
`1 <= n <= 3`
`mat[i][j]` is 0 or 1.', false, 'Hard', NULL, 70.1, 
   22.2, 'https://leetcode.com/problems/minimum-number-of-flips-to-convert-binary-matrix-to-zero-matrix', 186, 11.4, 16.3, '["Google,Airbnb"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   291, 34, 90, true, '[]'::jsonb, true),
  (1285, 'Find the Start and End Number of Continuous Ranges', 'SQL Schema', true, 'Medium', NULL, 87.8, 
   2.7, 'https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges', 128, 11.2, 12.8, '["Amazon,Microsoft"]'::jsonb, '[]'::jsonb, 
   200, 11, 95, true, '[]'::jsonb, true),
  (1286, 'Iterator for Combination', 'Design the `CombinationIterator` class:
`CombinationIterator(string characters, int combinationLength)` Initializes the object with a string `characters` of sorted distinct lowercase English letters and a number `combinationLength` as arguments.

`next()` Returns the next combination of length `combinationLength` in lexicographical order.

`hasNext()` Returns `true` if and only if there exists a next combination.


Example 1:
Input
["CombinationIterator", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[["abc", 2], [], [], [], [], [], []]
Output
[null, "ab", true, "ac", true, "bc", false]
Explanation
CombinationIterator itr = new CombinationIterator("abc", 2);
itr.next();    // return "ab"
itr.hasNext(); // return True
itr.next();    // return "ac"
itr.hasNext(); // return True
itr.next();    // return "bc"
itr.hasNext(); // return False

Constraints:
`1 <= combinationLength <= characters.length <= 15`
All the characters of `characters` are unique.

At most `104` calls will be made to `next` and `hasNext`.

It''s guaranteed that all calls of the function `next` are valid.', false, 'Medium', '/articles/iterator-for-combination', 70.9, 
   15, 'https://leetcode.com/problems/iterator-for-combination', 465, 39.3, 55.5, '["Amazon,Google"]'::jsonb, '["Backtracking,Design"]'::jsonb, 
   581, 46, 93, true, '[]'::jsonb, true),
  (1287, 'Element Appearing More Than 25% In Sorted Array', 'Given an integer array sorted in non-decreasing order, there is exactly one integer in the array that occurs more than 25% of the time.

Return that integer.


Example 1:
Input: arr = [1,2,2,6,6,6,6,7,10]
Output: 6

Constraints:
`1 <= arr.length <= 10^4`
`0 <= arr[i] <= 10^5`', false, 'Easy', NULL, 60.2, 
   8.5, 'https://leetcode.com/problems/element-appearing-more-than-25-in-sorted-array', 509, 41.6, 69, '["Facebook"]'::jsonb, '["Array"]'::jsonb, 
   438, 30, 94, true, '[]'::jsonb, true),
  (1288, 'Remove Covered Intervals', 'Given a list of `intervals`, remove all intervals that are covered by another interval in the list.

Interval `[a,b)` is covered by interval `[c,d)` if and only if `c <= a` and `b <= d`.

After doing so, return the number of remaining intervals.


Example 1:
Input: intervals = [[1,4],[3,6],[2,8]]
Output: 2
Explanation: Interval [3,6] is covered by [2,8], therefore it is removed.


Example 2:
Input: intervals = [[1,4],[2,3]]
Output: 1

Example 3:
Input: intervals = [[0,10],[5,12]]
Output: 2

Example 4:
Input: intervals = [[3,10],[4,10],[5,11]]
Output: 2

Example 5:
Input: intervals = [[1,2],[1,4],[3,4]]
Output: 1

Constraints:
`1 <= intervals.length <= 1000`
`intervals[i].length == 2`
`0 <= intervals[i][0] < intervals[i][1] <= 10^5`
All the intervals are unique.', false, 'Medium', '/articles/remove-covered-intervals', 57.4, 
   1.2, 'https://leetcode.com/problems/remove-covered-intervals', 462, 45.9, 79.9, '["Amazon"]'::jsonb, '["Greedy,Sort,Line Sweep"]'::jsonb, 
   632, 26, 96, true, '[]'::jsonb, true),
  (1289, 'Minimum Falling Path Sum II', 'Given a square grid of integers `arr`, a falling path with non-zero shifts is a choice of exactly one element from each row of `arr`, such that no two elements chosen in adjacent rows are in the same column.

Return the minimum sum of a falling path with non-zero shifts.


Example 1:
Input: arr = [[1,2,3],[4,5,6],[7,8,9]]
Output: 13
Explanation: 
The possible falling paths are:
[1,5,9], [1,5,7], [1,6,7], [1,6,8],
[2,4,8], [2,4,9], [2,6,7], [2,6,8],
[3,4,8], [3,4,9], [3,5,7], [3,5,9]
The falling path with the smallest sum is [1,5,7], so the answer is 13.


Constraints:
`1 <= arr.length == arr[i].length <= 200`
`-99 <= arr[i][j] <= 99`', false, 'Hard', NULL, 62.6, 
   20.1, 'https://leetcode.com/problems/minimum-falling-path-sum-ii', 231, 16.4, 26.2, '["Roblox"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   370, 38, 91, false, '[]'::jsonb, true),
  (1290, 'Convert Binary Number in a Linked List to Integer', 'Given `head` which is a reference node to a singly-linked list. The value of each node in the linked list is either 0 or 1. The linked list holds the binary representation of a number.

Return the decimal value of the number in the linked list.


Example 1:
Input: head = [1,0,1]
Output: 5
Explanation: (101) in base 2 = (5) in base 10

Example 2:
Input: head = [0]
Output: 0

Example 3:
Input: head = [1]
Output: 1

Example 4:
Input: head = [1,0,0,1,0,0,1,1,1,0,0,0,0,0,0]
Output: 18880

Example 5:
Input: head = [0,0]
Output: 0

Constraints:
The Linked List is not empty.

Number of nodes will not exceed `30`.

Each node''s value is either `0` or `1`.', false, 'Easy', '/articles/convert-binary-number-in-a-linked-list-to-integer', 81.7, 
   32.3, 'https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer', 999, 169.8, 207.8, '["JPMorgan,Bloomberg,Citrix,Microsoft"]'::jsonb, '["Linked List,Bit Manipulation"]'::jsonb, 
   1141, 66, 95, false, '[]'::jsonb, true),
  (1291, 'Sequential Digits', 'An integer has sequential digits if and only if each digit in the number is one more than the previous digit.

Return a sorted list of all the integers in the range `[low, high]` inclusive that have sequential digits.


Example 1:
Input: low = 100, high = 300
Output: [123,234]

Example 2:
Input: low = 1000, high = 13000
Output: [1234,2345,3456,4567,5678,6789,12345]

Constraints:
`10 <= low <= high <= 10^9`', false, 'Medium', '/articles/sequential-digits', 57.4, 
   14.3, 'https://leetcode.com/problems/sequential-digits', 647, 37.1, 64.7, '["Amazon"]'::jsonb, '["Backtracking"]'::jsonb, 
   528, 55, 91, true, '[]'::jsonb, true),
  (1292, 'Maximum Side Length of a Square with Sum Less than or Equal to Threshold', 'Given a `m x n` matrix `mat` and an integer `threshold`. Return the maximum side-length of a square with a sum less than or equal to `threshold` or return 0 if there is no such square.


Example 1:
Input: mat = [[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], threshold = 4
Output: 2
Explanation: The maximum side length of square with sum less than 4 is 2 as shown.


Example 2:
Input: mat = [[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2],[2,2,2,2,2]], threshold = 1
Output: 0

Example 3:
Input: mat = [[1,1,1,1],[1,0,0,0],[1,0,0,0],[1,0,0,0]], threshold = 6
Output: 3

Example 4:
Input: mat = [[18,70],[61,1],[25,85],[14,40],[11,96],[97,96],[63,45]], threshold = 40184
Output: 2

Constraints:
`1 <= m, n <= 300`
`m == mat.length`
`n == mat[i].length`
`0 <= mat[i][j] <= 10000`
`0 <= threshold <= 10^5`', false, 'Medium', NULL, 50.9, 
   13.1, 'https://leetcode.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold', 144, 17.6, 34.5, '["Google,Roblox"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   504, 37, 93, true, '[]'::jsonb, true),
  (1293, 'Shortest Path in a Grid with Obstacles Elimination', 'Given a `m * n` grid, where each cell is either `0` (empty) or `1` (obstacle). In one step, you can move up, down, left or right from and to an empty cell.

Return the minimum number of steps to walk from the upper left corner `(0, 0)` to the lower right corner `(m-1, n-1)` given that you can eliminate at most `k` obstacles. If it is not possible to find such walk return -1.


Example 1:
Input: 
grid = 
[[0,0,0],
 [1,1,0],
 [0,0,0],
 [0,1,1],
 [0,0,0]], 
k = 1
Output: 6
Explanation: 
The shortest path without eliminating any obstacle is 10. 
The shortest path with one obstacle elimination at position (3,2) is 6. Such path is `(0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) -> (3,2) -> (4,2)`.


Example 2:
Input: 
grid = 
[[0,1,1],
 [1,1,1],
 [1,0,0]], 
k = 1
Output: -1
Explanation: 
We need to eliminate at least two obstacles to find such a walk.


Constraints:
`grid.length == m`
`grid[0].length == n`
`1 <= m, n <= 40`
`1 <= k <= m*n`
`grid[i][j] == 0 or 1`
`grid[0][0] == grid[m-1][n-1] == 0`', false, 'Hard', NULL, 43.1, 
   48.8, 'https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination', 268, 26.2, 60.9, '["Google,ByteDance,Amazon"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   724, 12, 98, true, '[]'::jsonb, true),
  (1294, 'Weather Type in Each Country', 'SQL Schema', true, 'Easy', NULL, 66.5, 
   0, 'https://leetcode.com/problems/weather-type-in-each-country', 150, 13.1, 19.7, '["Point72"]'::jsonb, '[]'::jsonb, 
   48, 11, 81, false, '[]'::jsonb, true),
  (1295, 'Find Numbers with Even Number of Digits', 'Given an array `nums` of integers, return how many of them contain an even number of digits.


Example 1:
Input: nums = [12,345,2,6,7896]
Output: 2
Explanation: 
12 contains 2 digits (even number of digits). 
345 contains 3 digits (odd number of digits). 
2 contains 1 digit (odd number of digits). 
6 contains 1 digit (odd number of digits). 
7896 contains 4 digits (even number of digits). 
Therefore only 12 and 7896 contain an even number of digits.


Example 2:
Input: nums = [555,901,482,1771]
Output: 1 
Explanation: 
Only 1771 contains an even number of digits.


Constraints:
`1 <= nums.length <= 500`
`1 <= nums[i] <= 10^5`', false, 'Easy', NULL, 78.8, 
   6.6, 'https://leetcode.com/problems/find-numbers-with-even-number-of-digits', 999, 256, 325, '["eBay"]'::jsonb, '["Array"]'::jsonb, 
   637, 76, 89, false, '[]'::jsonb, true),
  (1296, 'Divide Array in Sets of K Consecutive Numbers', 'Given an array of integers `nums` and a positive integer `k`, find whether it''s possible to divide this array into sets of `k` consecutive numbers
Return `True` if it is possible. Otherwise, return `False`.


Example 1:
Input: nums = [1,2,3,3,4,4,5,6], k = 4
Output: true
Explanation: Array can be divided into [1,2,3,4] and [3,4,5,6].


Example 2:
Input: nums = [3,2,1,2,3,4,3,4,5,9,10,11], k = 3
Output: true
Explanation: Array can be divided into [1,2,3] , [2,3,4] , [3,4,5] and [9,10,11].


Example 3:
Input: nums = [3,3,2,2,1,1], k = 3
Output: true

Example 4:
Input: nums = [1,2,3,4], k = 3
Output: false
Explanation: Each array should be divided in subarrays of size 3.


Constraints:
`1 <= k <= nums.length <= 105`
`1 <= nums[i] <= 109`
Note: This question is the same as 846: https://leetcode.com/problems/hand-of-straights/', false, 'Medium', NULL, 55.7, 
   33.2, 'https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers', 396, 42.7, 76.6, '["Goldman Sachs,ByteDance"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   678, 71, 91, false, '[]'::jsonb, true),
  (1297, 'Maximum Number of Occurrences of a Substring', 'Given a string `s`, return the maximum number of ocurrences of any substring under the following rules:
The number of unique characters in the substring must be less than or equal to `maxLetters`.

The substring size must be between `minSize` and `maxSize` inclusive.


Example 1:
Input: s = "aababcaab", maxLetters = 2, minSize = 3, maxSize = 4
Output: 2
Explanation: Substring "aab" has 2 ocurrences in the original string.

It satisfies the conditions, 2 unique letters and size 3 (between minSize and maxSize).


Example 2:
Input: s = "aaaa", maxLetters = 1, minSize = 3, maxSize = 3
Output: 2
Explanation: Substring "aaa" occur 2 times in the string. It can overlap.


Example 3:
Input: s = "aabcabcab", maxLetters = 2, minSize = 2, maxSize = 3
Output: 3

Example 4:
Input: s = "abcde", maxLetters = 2, minSize = 3, maxSize = 3
Output: 0

Constraints:
`1 <= s.length <= 10^5`
`1 <= maxLetters <= 26`
`1 <= minSize <= maxSize <= min(26, s.length)`
`s` only contains lowercase English letters.', false, 'Medium', NULL, 50.6, 
   30.2, 'https://leetcode.com/problems/maximum-number-of-occurrences-of-a-substring', 198, 19.9, 39.3, '["Twitter,Facebook"]'::jsonb, '["String,Bit Manipulation"]'::jsonb, 
   331, 190, 64, true, '[]'::jsonb, true),
  (1298, 'Maximum Candies You Can Get from Boxes', 'Given `n` boxes, each box is given in the format `[status, candies, keys, containedBoxes]` where:
`status[i]`: an integer which is 1 if `box[i]` is open and 0 if `box[i]` is closed.

`candies[i]`: an integer representing the number of candies in `box[i]`.

`keys[i]`: an array contains the indices of the boxes you can open with the key in `box[i]`.

`containedBoxes[i]`: an array contains the indices of the boxes found in `box[i]`.

You will start with some boxes given in `initialBoxes` array. You can take all the candies in any open box and you can use the keys in it to open new boxes and you also can use the boxes you find in it.

Return the maximum number of candies you can get following the rules above.


Example 1:
Input: status = [1,0,1,0], candies = [7,5,4,100], keys = [[],[],[1],[]], containedBoxes = [[1,2],[3],[],[]], initialBoxes = [0]
Output: 16
Explanation: You will be initially given box 0. You will find 7 candies in it and boxes 1 and 2. Box 1 is closed and you don''t have a key for it so you will open box 2. You will find 4 candies and a key to box 1 in box 2.

In box 1, you will find 5 candies and box 3 but you will not find a key to box 3 so box 3 will remain closed.

Total number of candies collected = 7 + 4 + 5 = 16 candy.


Example 2:
Input: status = [1,0,0,0,0,0], candies = [1,1,1,1,1,1], keys = [[1,2,3,4,5],[],[],[],[],[]], containedBoxes = [[1,2,3,4,5],[],[],[],[],[]], initialBoxes = [0]
Output: 6
Explanation: You have initially box 0. Opening it you can find boxes 1,2,3,4 and 5 and their keys. The total number of candies will be 6.


Example 3:
Input: status = [1,1,1], candies = [100,1,100], keys = [[],[0,2],[]], containedBoxes = [[],[],[]], initialBoxes = [1]
Output: 1

Example 4:
Input: status = [1], candies = [100], keys = [[]], containedBoxes = [[]], initialBoxes = []
Output: 0

Example 5:
Input: status = [1,1,1], candies = [2,3,2], keys = [[],[],[]], containedBoxes = [[],[],[]], initialBoxes = [2,1,0]
Output: 7

Constraints:
`1 <= status.length <= 1000`
`status.length == candies.length == keys.length == containedBoxes.length == n`
`status[i]` is `0` or `1`.

`1 <= candies[i] <= 1000`
`0 <= keys[i].length <= status.length`
`0 <= keys[i][j] < status.length`
All values in `keys[i]` are unique.

`0 <= containedBoxes[i].length <= status.length`
`0 <= containedBoxes[i][j] < status.length`
All values in `containedBoxes[i]` are unique.

Each box is contained in one box at most.

`0 <= initialBoxes.length <= status.length`
`0 <= initialBoxes[i] < status.length`', false, 'Hard', NULL, 59.8, 
   0, 'https://leetcode.com/problems/maximum-candies-you-can-get-from-boxes', 150, 7.8, 13, '["Airbnb"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   118, 94, 56, false, '[]'::jsonb, true),
  (1299, 'Replace Elements with Greatest Element on Right Side', 'Given an array `arr`, replace every element in that array with the greatest element among the elements to its right, and replace the last element with `-1`.

After doing so, return the array.


Example 1:
Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
Explanation: 
- index 0 --> the greatest element to the right of index 0 is index 1 (18).

- index 1 --> the greatest element to the right of index 1 is index 4 (6).

- index 2 --> the greatest element to the right of index 2 is index 4 (6).

- index 3 --> the greatest element to the right of index 3 is index 4 (6).

- index 4 --> the greatest element to the right of index 4 is index 5 (1).

- index 5 --> there are no elements to the right of index 5, so we put -1.


Example 2:
Input: arr = [400]
Output: [-1]
Explanation: There are no elements to the right of index 0.


Constraints:
`1 <= arr.length <= 104`
`1 <= arr[i] <= 105`', false, 'Easy', NULL, 74.6, 
   5, 'https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side', 955, 122, 163.7, '["Amazon,Adobe"]'::jsonb, '["Array"]'::jsonb, 
   722, 141, 84, true, '[]'::jsonb, true),
  (1300, 'Sum of Mutated Array Closest to Target', 'Given an integer array `arr` and a target value `target`, return the integer `value` such that when we change all the integers larger than `value` in the given array to be equal to `value`, the sum of the array gets as close as possible (in absolute difference) to `target`.

In case of a tie, return the minimum such integer.

Notice that the answer is not neccesarilly a number from `arr`.


Example 1:
Input: arr = [4,9,3], target = 10
Output: 3
Explanation: When using 3 arr converts to [3, 3, 3] which sums 9 and that''s the optimal answer.


Example 2:
Input: arr = [2,3,5], target = 10
Output: 5

Example 3:
Input: arr = [60864,25176,27249,21296,20204], target = 56803
Output: 11361

Constraints:
`1 <= arr.length <= 10^4`
`1 <= arr[i], target <= 10^5`', false, 'Medium', NULL, 43.1, 
   4.4, 'https://leetcode.com/problems/sum-of-mutated-array-closest-to-target', 186, 16.9, 39.4, '["Bloomberg"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   458, 68, 87, false, '[]'::jsonb, true),
  (1301, 'Number of Paths with Max Score', 'You are given a square `board` of characters. You can move on the board starting at the bottom right square marked with the character `''S''`.

You need to reach the top left square marked with the character `''E''`. The rest of the squares are labeled either with a numeric character `1, 2, ..., 9` or with an obstacle `''X''`. In one move you can go up, left or up-left (diagonally) only if there is no obstacle there.

Return a list of two integers: the first integer is the maximum sum of numeric characters you can collect, and the second is the number of such paths that you can take to get that maximum sum, taken modulo `10^9 + 7`.

In case there is no path, return `[0, 0]`.


Example 1:
Input: board = ["E23","2X2","12S"]
Output: [7,1]

Example 2:
Input: board = ["E12","1X1","21S"]
Output: [4,2]

Example 3:
Input: board = ["E11","XXX","11S"]
Output: [0,0]

Constraints:
`2 <= board.length == board[i].length <= 100`', false, 'Hard', NULL, 38.2, 
   0, 'https://leetcode.com/problems/number-of-paths-with-max-score', 119, 6.9, 17.9, '["Samsung"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   199, 11, 95, false, '[]'::jsonb, true),
  (1302, 'Deepest Leaves Sum', 'Given the `root` of a binary tree, return the sum of values of its deepest leaves.


Example 1:
Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
Output: 15

Example 2:
Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
Output: 19

Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`1 <= Node.val <= 100`', false, 'Medium', '/articles/deepest-leaves-sum', 84.2, 
   7, 'https://leetcode.com/problems/deepest-leaves-sum', 999, 82.9, 98.5, '["Google"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   1073, 56, 95, true, '[]'::jsonb, true),
  (1303, 'Find the Team Size', 'SQL Schema', true, 'Easy', NULL, 89.8, 
   0.9, 'https://leetcode.com/problems/find-the-team-size', 184, 24.8, 27.6, '["Amazon"]'::jsonb, '[]'::jsonb, 
   137, 9, 94, true, '[]'::jsonb, true),
  (1304, 'Find N Unique Integers Sum up to Zero', 'Given an integer `n`, return any array containing `n` unique integers such that they add up to `0`.


Example 1:
Input: n = 5
Output: [-7,-1,1,3,4]
Explanation: These arrays also are accepted [-5,-1,1,2,3] , [-3,-1,2,-2,4].


Example 2:
Input: n = 3
Output: [-1,0,1]

Example 3:
Input: n = 1
Output: [0]

Constraints:
`1 <= n <= 1000`', false, 'Easy', NULL, 76.7, 
   16.2, 'https://leetcode.com/problems/find-n-unique-integers-sum-up-to-zero', 999, 82.4, 107.3, '["Microsoft,Tesla"]'::jsonb, '["Array"]'::jsonb, 
   540, 307, 64, false, '[]'::jsonb, true),
  (1305, 'All Elements in Two Binary Search Trees', 'Given two binary search trees `root1` and `root2`.

Return a list containing all the integers from both trees sorted in ascending order.


Example 1:
Input: root1 = [2,1,4], root2 = [1,0,3]
Output: [0,1,1,2,3,4]

Example 2:
Input: root1 = [0,-10,10], root2 = [5,1,7,0,2]
Output: [-10,0,0,1,2,5,7,10]

Example 3:
Input: root1 = [], root2 = [5,1,7,0,2]
Output: [0,1,2,5,7]

Example 4:
Input: root1 = [0,-10,10], root2 = []
Output: [-10,0,10]

Example 5:
Input: root1 = [1,null,8], root2 = [8,1]
Output: [1,1,8,8]

Constraints:
Each tree has at most `5000` nodes.

Each node''s value is between `[-10^5, 10^5]`.', false, 'Medium', '/articles/all-elements-in-two-bsts', 77.8, 
   7.9, 'https://leetcode.com/problems/all-elements-in-two-binary-search-trees', 827, 82.5, 106, '["Facebook,Amazon"]'::jsonb, '["Sort,Tree"]'::jsonb, 
   887, 34, 96, true, '[]'::jsonb, true),
  (1306, 'Jump Game III', 'Given an array of non-negative integers `arr`, you are initially positioned at `start` index of the array. When you are at index `i`, you can jump to `i + arr[i]` or `i - arr[i]`, check if you can reach to any index with value 0.

Notice that you can not jump outside of the array at any time.


Example 1:
Input: arr = [4,2,3,0,3,1,2], start = 5
Output: true
Explanation: 
All possible ways to reach at index 3 with value 0 are: 
index 5 -> index 4 -> index 1 -> index 3 
index 5 -> index 6 -> index 4 -> index 1 -> index 3 

Example 2:
Input: arr = [4,2,3,0,3,1,2], start = 0
Output: true 
Explanation: 
One possible way to reach at index 3 with value 0 is: 
index 0 -> index 4 -> index 1 -> index 3

Example 3:
Input: arr = [3,0,2,1,2], start = 2
Output: false
Explanation: There is no way to reach at index 1 with value 0.


Constraints:
`1 <= arr.length <= 5 * 104`
`0 <= arr[i] < arr.length`
`0 <= start < arr.length`', false, 'Medium', '/articles/jump-game-iii', 62.2, 
   23.8, 'https://leetcode.com/problems/jump-game-iii', 801, 69.2, 111.2, '["Microsoft"]'::jsonb, '["Depth-first Search,Breadth-first Search,Recursion"]'::jsonb, 
   1111, 35, 97, false, '[]'::jsonb, true),
  (1307, 'Verbal Arithmetic Puzzle', 'Given an equation, represented by `words` on left side and the `result` on right side.

You need to check if the equation is solvable under the following rules:
Each character is decoded as one digit (0 - 9).

Every pair of different characters they must map to different digits.

Each `words[i]` and `result` are decoded as one number without leading zeros.

Sum of numbers on left side (`words`) will equal to the number on right side (`result`). 
Return `True` if the equation is solvable otherwise return `False`.


Example 1:
Input: words = ["SEND","MORE"], result = "MONEY"
Output: true
Explanation: Map ''S''-> 9, ''E''->5, ''N''->6, ''D''->7, ''M''->1, ''O''->0, ''R''->8, ''Y''->''2''
Such that: "SEND" + "MORE" = "MONEY" ,  9567 + 1085 = 10652

Example 2:
Input: words = ["SIX","SEVEN","SEVEN"], result = "TWENTY"
Output: true
Explanation: Map ''S''-> 6, ''I''->5, ''X''->0, ''E''->8, ''V''->7, ''N''->2, ''T''->1, ''W''->''3'', ''Y''->4
Such that: "SIX" + "SEVEN" + "SEVEN" = "TWENTY" ,  650 + 68782 + 68782 = 138214

Example 3:
Input: words = ["THIS","IS","TOO"], result = "FUNNY"
Output: true

Example 4:
Input: words = ["LEET","CODE"], result = "POINT"
Output: false

Constraints:
`2 <= words.length <= 5`
`1 <= words[i].length, result.length <= 7`
`words[i], result` contain only uppercase English letters.

The number of different characters used in the expression is at most `10`.', false, 'Hard', NULL, 36.6, 
   0, 'https://leetcode.com/problems/verbal-arithmetic-puzzle', 117, 5.5, 15.1, '["Atlassian"]'::jsonb, '["Math,Backtracking"]'::jsonb, 
   205, 65, 76, false, '[]'::jsonb, true),
  (1308, 'Running Total for Different Genders', 'SQL Schema', true, 'Medium', NULL, 88, 
   1.4, 'https://leetcode.com/problems/running-total-for-different-genders', 121, 13.4, 15.3, '[]'::jsonb, '[]'::jsonb, 
   92, 16, 85, false, '[]'::jsonb, true),
  (1309, 'Decrypt String from Alphabet to Integer Mapping', 'Given a string `s` formed by digits (`''0''` - `''9''`) and `''#''` . We want to map `s` to English lowercase characters as follows:
Characters (`''a''` to `''i'')` are represented by (`''1''` to `''9''`) respectively.

Characters (`''j''` to `''z'')` are represented by (`''10#''` to `''26#''`) respectively. 
Return the string formed after mapping.

It''s guaranteed that a unique mapping will always exist.


Example 1:
Input: s = "10#11#12"
Output: "jkab"
Explanation: "j" -> "10#" , "k" -> "11#" , "a" -> "1" , "b" -> "2".


Example 2:
Input: s = "1326#"
Output: "acz"

Example 3:
Input: s = "25#"
Output: "y"

Example 4:
Input: s = "12345678910#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#"
Output: "abcdefghijklmnopqrstuvwxyz"

Constraints:
`1 <= s.length <= 1000`
`s[i]` only contains digits letters (`''0''`-`''9''`) and `''#''` letter.

`s` will be valid string such that mapping is always possible.', false, 'Easy', NULL, 77.8, 
   3.9, 'https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping', 845, 54.7, 70.4, '["Amazon"]'::jsonb, '["String"]'::jsonb, 
   538, 52, 91, true, '[]'::jsonb, true),
  (1310, 'XOR Queries of a Subarray', 'Given the array `arr` of positive integers and the array `queries` where `queries[i] = [Li, Ri]`, for each query `i` compute the XOR of elements from `Li` to `Ri` (that is, `arr[Li] xor arr[Li+1] xor ... xor arr[Ri]` ). Return an array containing the result for the given `queries`.


Example 1:
Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8] 
Explanation: 
The binary representation of the elements in the array are:
1 = 0001 
3 = 0011 
4 = 0100 
8 = 1000 
The XOR values for queries are:
[0,1] = 1 xor 3 = 2 
[1,2] = 3 xor 4 = 7 
[0,3] = 1 xor 3 xor 4 xor 8 = 14 
[3,3] = 8

Example 2:
Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
Output: [8,0,4,4]

Constraints:
`1 <= arr.length <= 3 * 10^4`
`1 <= arr[i] <= 10^9`
`1 <= queries.length <= 3 * 10^4`
`queries[i].length == 2`
`0 <= queries[i][0] <= queries[i][1] < arr.length`', false, 'Medium', NULL, 69.5, 
   14.9, 'https://leetcode.com/problems/xor-queries-of-a-subarray', 291, 23.4, 33.8, '["Codenation,Amazon"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   482, 24, 95, true, '[]'::jsonb, true),
  (1311, 'Get Watched Videos by Your Friends', 'There are `n` people, each person has a unique id between `0` and `n-1`. Given the arrays `watchedVideos` and `friends`, where `watchedVideos[i]` and `friends[i]` contain the list of watched videos and the list of friends respectively for the person with `id = i`.

Level 1 of videos are all watched videos by your friends, level 2 of videos are all watched videos by the friends of your friends and so on. In general, the level `k` of videos are all watched videos by people with the shortest path exactly equal to `k` with you. Given your `id` and the `level` of videos, return the list of videos ordered by their frequencies (increasing). For videos with the same frequency order them alphabetically from least to greatest. 

Example 1:
Input: watchedVideos = [["A","B"],["C"],["B","C"],["D"]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 0, level = 1
Output: ["B","C"] 
Explanation: 
You have id = 0 (green color in the figure) and your friends are (yellow color in the figure):
Person with id = 1 -> watchedVideos = ["C"] 
Person with id = 2 -> watchedVideos = ["B","C"] 
The frequencies of watchedVideos by your friends are: 
B -> 1 
C -> 2

Example 2:
Input: watchedVideos = [["A","B"],["C"],["B","C"],["D"]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 0, level = 2
Output: ["D"]
Explanation: 
You have id = 0 (green color in the figure) and the only friend of your friends is the person with id = 3 (yellow color in the figure).


Constraints:
`n == watchedVideos.length == friends.length`
`2 <= n <= 100`
`1 <= watchedVideos[i].length <= 100`
`1 <= watchedVideos[i][j].length <= 8`
`0 <= friends[i].length < n`
`0 <= friends[i][j] < n`
`0 <= id < n`
`1 <= level < n`
if `friends[i]` contains `j`, then `friends[j]` contains `i`', false, 'Medium', NULL, 44.3, 
   0, 'https://leetcode.com/problems/get-watched-videos-by-your-friends', 174, 12.1, 27.4, '["Amazon"]'::jsonb, '["Hash Table,String,Breadth-first Search"]'::jsonb, 
   147, 229, 39, true, '[]'::jsonb, true),
  (1312, 'Minimum Insertion Steps to Make a String Palindrome', 'Given a string `s`. In one step you can insert any character at any index of the string.

Return the minimum number of steps to make `s` palindrome.

A Palindrome String is one that reads the same backward as well as forward.


Example 1:
Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already palindrome we don''t need any insertions.


Example 2:
Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".


Example 3:
Input: s = "leetcode"
Output: 5
Explanation: Inserting 5 characters the string becomes "leetcodocteel".


Example 4:
Input: s = "g"
Output: 0

Example 5:
Input: s = "no"
Output: 1

Constraints:
`1 <= s.length <= 500`
All characters of `s` are lower case English letters.', false, 'Hard', NULL, 60, 
   29.9, 'https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome', 308, 22.6, 37.6, '["Amazon,LinkedIn"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   715, 13, 98, true, '[]'::jsonb, true),
  (1313, 'Decompress Run-Length Encoded List', 'We are given a list `nums` of integers representing a list compressed with run-length encoding.

Consider each adjacent pair of elements `[freq, val] = [nums[2*i], nums[2*i+1]]` (with `i >= 0`).  For each such pair, there are `freq` elements with value `val` concatenated in a sublist. Concatenate all the sublists from left to right to generate the decompressed list.

Return the decompressed list.


Example 1:
Input: nums = [1,2,3,4]
Output: [2,4,4,4]
Explanation: The first pair [1,2] means we have freq = 1 and val = 2 so we generate the array [2].

The second pair [3,4] means we have freq = 3 and val = 4 so we generate [4,4,4].

At the end the concatenation [2] + [4,4,4] is [2,4,4,4].


Example 2:
Input: nums = [1,1,2,3]
Output: [1,3,3]

Constraints:
`2 <= nums.length <= 100`
`nums.length % 2 == 0`
`1 <= nums[i] <= 100`', false, 'Easy', NULL, 85.4, 
   18.5, 'https://leetcode.com/problems/decompress-run-length-encoded-list', 999, 125.7, 147.3, '["Amazon,Google,Apple"]'::jsonb, '["Array"]'::jsonb, 
   439, 797, 36, true, '[]'::jsonb, true),
  (1314, 'Matrix Block Sum', 'Given a `m x n` matrix `mat` and an integer `k`, return a matrix `answer` where each `answer[i][j]` is the sum of all elements `mat[r][c]` for:
`i - k <= r <= i + k,`
`j - k <= c <= j + k`, and
`(r, c)` is a valid position in the matrix.


Example 1:
Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[12,21,16],[27,45,33],[24,39,28]]

Example 2:
Input: mat = [[1,2,3],[4,5,6],[7,8,9]], k = 2
Output: [[45,45,45],[45,45,45],[45,45,45]]

Constraints:
`m == mat.length`
`n == mat[i].length`
`1 <= m, n, k <= 100`
`1 <= mat[i][j] <= 100`', false, 'Medium', NULL, 73.7, 
   36.9, 'https://leetcode.com/problems/matrix-block-sum', 356, 33.9, 46, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   877, 158, 85, true, '[]'::jsonb, true),
  (1315, 'Sum of Nodes with Even-Valued Grandparent', 'Given a binary tree, return the sum of values of nodes with even-valued grandparent.  (A grandparent of a node is the parent of its parent, if it exists.)
If there are no nodes with an even-valued grandparent, return `0`.


Example 1:
Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
Output: 18
Explanation: The red nodes are the nodes with even-value grandparent while the blue nodes are the even-value grandparents.


Constraints:
The number of nodes in the tree is between `1` and `10^4`.

The value of nodes is between `1` and `100`.', false, 'Medium', NULL, 84.2, 
   8.7, 'https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent', 977, 63.6, 75.5, '["Amazon,Bloomberg"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   903, 33, 96, true, '[]'::jsonb, true),
  (1316, 'Distinct Echo Substrings', 'Return the number of distinct non-empty substrings of `text` that can be written as the concatenation of some string with itself (i.e. it can be written as `a + a` where `a` is some string).


Example 1:
Input: text = "abcabcabc"
Output: 3
Explanation: The 3 substrings are "abcabc", "bcabca" and "cabcab".


Example 2:
Input: text = "leetcodeleetcode"
Output: 2
Explanation: The 2 substrings are "ee" and "leetcodeleetcode".


Constraints:
`1 <= text.length <= 2000`
`text` has only lowercase English letters.', false, 'Hard', NULL, 49.7, 
   22.9, 'https://leetcode.com/problems/distinct-echo-substrings', 116, 8.7, 17.4, '["Google"]'::jsonb, '["String,Rolling Hash"]'::jsonb, 
   110, 137, 45, true, '[]'::jsonb, true),
  (1317, 'Convert Integer to the Sum of Two No-Zero Integers', 'Given an integer `n`. No-Zero integer is a positive integer which doesn''t contain any 0 in its decimal representation.

Return a list of two integers `[A, B]` where:
`A` and `B` are No-Zero integers.

`A + B = n`
It''s guarateed that there is at least one valid solution. If there are many valid solutions you can return any of them.


Example 1:
Input: n = 2
Output: [1,1]
Explanation: A = 1, B = 1. A + B = n and both A and B don''t contain any 0 in their decimal representation.


Example 2:
Input: n = 11
Output: [2,9]

Example 3:
Input: n = 10000
Output: [1,9999]

Example 4:
Input: n = 69
Output: [1,68]

Example 5:
Input: n = 1010
Output: [11,999]

Constraints:
`2 <= n <= 10^4`', false, 'Easy', NULL, 56.9, 
   3.6, 'https://leetcode.com/problems/convert-integer-to-the-sum-of-two-no-zero-integers', 357, 22.2, 39.1, '["HRT"]'::jsonb, '["Math"]'::jsonb, 
   159, 155, 51, false, '[]'::jsonb, true),
  (1318, 'Minimum Flips to Make a OR b Equal to c', 'Given 3 positives numbers `a`, `b` and `c`. Return the minimum flips required in some bits of `a` and `b` to make ( `a` OR `b` == `c` ). (bitwise OR operation).

Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.


Example 1:
Input: a = 2, b = 6, c = 5
Output: 3
Explanation: After flips a = 1 , b = 4 , c = 5 such that (`a` OR `b` == `c`)

Example 2:
Input: a = 4, b = 2, c = 7
Output: 1

Example 3:
Input: a = 1, b = 2, c = 3
Output: 0

Constraints:
`1 <= a <= 10^9`
`1 <= b <= 10^9`
`1 <= c <= 10^9`', false, 'Medium', NULL, 63.9, 
   0, 'https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c', 328, 16.5, 25.9, '["Microsoft"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   233, 24, 91, false, '[]'::jsonb, true),
  (1319, 'Number of Operations to Make Network Connected', 'There are `n` computers numbered from `0` to `n-1` connected by ethernet cables `connections` forming a network where `connections[i] = [a, b]` represents a connection between computers `a` and `b`. Any computer can reach any other computer directly or indirectly through the network.

Given an initial computer network `connections`. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected. Return the minimum number of times you need to do this in order to make all the computers connected. If it''s not possible, return -1. 

Example 1:
Input: n = 4, connections = [[0,1],[0,2],[1,2]]
Output: 1
Explanation: Remove cable between computer 1 and 2 and place between computers 1 and 3.


Example 2:
Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
Output: 2

Example 3:
Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
Output: -1
Explanation: There are not enough cables.


Example 4:
Input: n = 5, connections = [[0,1],[0,2],[3,4],[2,3]]
Output: 0

Constraints:
`1 <= n <= 10^5`
`1 <= connections.length <= min(n*(n-1)/2, 10^5)`
`connections[i].length == 2`
`0 <= connections[i][0], connections[i][1] < n`
`connections[i][0] != connections[i][1]`
There are no repeated connections.

No two computers are connected by more than one cable.', false, 'Medium', NULL, 55.5, 
   11.1, 'https://leetcode.com/problems/number-of-operations-to-make-network-connected', 405, 31.9, 57.4, '["Amazon,Apple"]'::jsonb, '["Depth-first Search,Breadth-first Search,Union Find"]'::jsonb, 
   826, 15, 98, true, '[]'::jsonb, true),
  (1320, 'Minimum Distance to Type a Word Using Two Fingers', 'You have a keyboard layout as shown above in the XY plane, where each English uppercase letter is located at some coordinate, for example, the letter A is located at coordinate (0,0), the letter B is located at coordinate (0,1), the letter P is located at coordinate (2,3) and the letter Z is located at coordinate (4,1).

Given the string `word`, return the minimum total distance to type such string using only two fingers. The distance between coordinates (x1,y1) and (x2,y2) is |x1 - x2| + |y1 - y2|. 
Note that the initial positions of your two fingers are considered free so don''t count towards your total distance, also your two fingers do not have to start at the first letter or the first two letters.


Example 1:
Input: word = "CAKE"
Output: 3
Explanation: 
Using two fingers, one optimal way to type "CAKE" is: 
Finger 1 on letter ''C'' -> cost = 0 
Finger 1 on letter ''A'' -> cost = Distance from letter ''C'' to letter ''A'' = 2 
Finger 2 on letter ''K'' -> cost = 0 
Finger 2 on letter ''E'' -> cost = Distance from letter ''K'' to letter ''E'' = 1 
Total distance = 3

Example 2:
Input: word = "HAPPY"
Output: 6
Explanation: 
Using two fingers, one optimal way to type "HAPPY" is:
Finger 1 on letter ''H'' -> cost = 0
Finger 1 on letter ''A'' -> cost = Distance from letter ''H'' to letter ''A'' = 2
Finger 2 on letter ''P'' -> cost = 0
Finger 2 on letter ''P'' -> cost = Distance from letter ''P'' to letter ''P'' = 0
Finger 1 on letter ''Y'' -> cost = Distance from letter ''A'' to letter ''Y'' = 4
Total distance = 6

Example 3:
Input: word = "NEW"
Output: 3

Example 4:
Input: word = "YEAR"
Output: 7

Constraints:
`2 <= word.length <= 300`
Each word[i]` is an English uppercase letter.', false, 'Hard', NULL, 61.7, 
   2.1, 'https://leetcode.com/problems/minimum-distance-to-type-a-word-using-two-fingers', 197, 17.6, 28.5, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   541, 23, 96, true, '[]'::jsonb, true),
  (1321, 'Restaurant Growth', 'SQL Schema', true, 'Medium', NULL, 71.7, 
   1.4, 'https://leetcode.com/problems/restaurant-growth', 157, 11.4, 15.9, '["Amazon"]'::jsonb, '[]'::jsonb, 
   142, 22, 87, true, '[]'::jsonb, true),
  (1322, 'Ads Performance', 'SQL Schema', true, 'Easy', NULL, 58.3, 
   0, 'https://leetcode.com/problems/ads-performance', 200, 15.1, 25.9, '["Facebook"]'::jsonb, '[]'::jsonb, 
   116, 28, 81, true, '[]'::jsonb, true),
  (1323, 'Maximum 69 Number', 'Given a positive integer `num` consisting only of digits 6 and 9.

Return the maximum number you can get by changing at most one digit (6 becomes 9, and 9 becomes 6).


Example 1:
Input: num = 9669
Output: 9969
Explanation: 
Changing the first digit results in 6669.

Changing the second digit results in 9969.

Changing the third digit results in 9699.

Changing the fourth digit results in 9666. 
The maximum number is 9969.


Example 2:
Input: num = 9996
Output: 9999
Explanation: Changing the last digit 6 to 9 results in the maximum number.


Example 3:
Input: num = 9999
Output: 9999
Explanation: It is better not to apply any change.


Constraints:
`1 <= num <= 10^4`
`num`''s digits are 6 or 9.', false, 'Easy', NULL, 77.9, 
   3.4, 'https://leetcode.com/problems/maximum-69-number', 999, 77.9, 100, '["HRT"]'::jsonb, '["Math"]'::jsonb, 
   551, 89, 86, false, '[]'::jsonb, true),
  (1324, 'Print Words Vertically', 'Given a string `s`. Return all the words vertically in the same order in which they appear in `s`.

Words are returned as a list of strings, complete with spaces when is necessary. (Trailing spaces are not allowed).

Each word would be put on only one column and that in one column there will be only one word.


Example 1:
Input: s = "HOW ARE YOU"
Output: ["HAY","ORO","WEU"]
Explanation: Each word is printed vertically. 
 "HAY"
 "ORO"
 "WEU"

Example 2:
Input: s = "TO BE OR NOT TO BE"
Output: ["TBONTB","OEROOE","   T"]
Explanation: Trailing spaces is not allowed. 
"TBONTB"
"OEROOE"
"   T"

Example 3:
Input: s = "CONTEST IS COMING"
Output: ["CIC","OSO","N M","T I","E N","S G","T"]

Constraints:
`1 <= s.length <= 200`
`s` contains only upper case English letters.

It''s guaranteed that there is only one space between 2 words.', false, 'Medium', NULL, 58.9, 
   10.4, 'https://leetcode.com/problems/print-words-vertically', 363, 19.1, 32.5, '["Postmates"]'::jsonb, '["String"]'::jsonb, 
   235, 66, 78, false, '[]'::jsonb, true),
  (1325, 'Delete Leaves With a Given Value', 'Given a binary tree `root` and an integer `target`, delete all the leaf nodes with value `target`.

Note that once you delete a leaf node with value `target`, if it''s parent node becomes a leaf node and has the value `target`, it should also be deleted (you need to continue doing that until you can''t).


Example 1:
Input: root = [1,2,3,2,null,2,4], target = 2
Output: [1,null,3,null,4]
Explanation: Leaf nodes in green with value (target = 2) are removed (Picture in left). 
After removing, new nodes become leaf nodes with value (target = 2) (Picture in center).


Example 2:
Input: root = [1,3,3,3,2], target = 3
Output: [1,3,null,null,2]

Example 3:
Input: root = [1,2,null,2,null,2], target = 2
Output: [1]
Explanation: Leaf nodes in green with value (target = 2) are removed at each step.


Example 4:
Input: root = [1,1,1], target = 1
Output: []

Example 5:
Input: root = [1,2,3], target = 1
Output: [1,2,3]

Constraints:
`1 <= target <= 1000`
The given binary tree will have between `1` and `3000` nodes.

Each node''s value is between `[1, 1000]`.', false, 'Medium', NULL, 73.8, 
   7.4, 'https://leetcode.com/problems/delete-leaves-with-a-given-value', 567, 38.5, 52.1, '["Amazon"]'::jsonb, '["Tree"]'::jsonb, 
   685, 17, 98, true, '[]'::jsonb, true),
  (1326, 'Minimum Number of Taps to Open to Water a Garden', 'There is a one-dimensional garden on the x-axis. The garden starts at the point `0` and ends at the point `n`. (i.e The length of the garden is `n`).

There are `n + 1` taps located at points `[0, 1, ..., n]` in the garden.

Given an integer `n` and an integer array `ranges` of length `n + 1` where `ranges[i]` (0-indexed) means the `i-th` tap can water the area `[i - ranges[i], i + ranges[i]]` if it was open.

Return the minimum number of taps that should be open to water the whole garden, If the garden cannot be watered return -1.


Example 1:
Input: n = 5, ranges = [3,4,1,1,0,0]
Output: 1
Explanation: The tap at point 0 can cover the interval [-3,3]
The tap at point 1 can cover the interval [-3,5]
The tap at point 2 can cover the interval [1,3]
The tap at point 3 can cover the interval [2,4]
The tap at point 4 can cover the interval [4,4]
The tap at point 5 can cover the interval [5,5]
Opening Only the second tap will water the whole garden [0,5]

Example 2:
Input: n = 3, ranges = [0,0,0,0]
Output: -1
Explanation: Even if you activate all the four taps you cannot water the whole garden.


Example 3:
Input: n = 7, ranges = [1,2,1,0,2,1,0,1]
Output: 3

Example 4:
Input: n = 8, ranges = [4,0,0,0,0,0,0,0,4]
Output: 2

Example 5:
Input: n = 8, ranges = [4,0,0,0,4,0,0,0,4]
Output: 1

Constraints:
`1 <= n <= 10^4`
`ranges.length == n + 1`
`0 <= ranges[i] <= 100`', false, 'Hard', NULL, 47.5, 
   67.9, 'https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden', 216, 25, 52.7, '["Apple,Docusign,Twitter,Morgan Stanley"]'::jsonb, '["Dynamic Programming,Greedy"]'::jsonb, 
   572, 56, 91, true, '[]'::jsonb, true),
  (1327, 'List the Products Ordered in a Period', 'SQL Schema', true, 'Easy', NULL, 77.7, 
   0, 'https://leetcode.com/problems/list-the-products-ordered-in-a-period', 167, 17.1, 22, '["Amazon"]'::jsonb, '[]'::jsonb, 
   45, 14, 76, true, '[]'::jsonb, true),
  (1328, 'Break a Palindrome', 'Given a palindromic string of lowercase English letters `palindrome`, replace exactly one character with any lowercase English letter so that the resulting string is not a palindrome and that it is the lexicographically smallest one possible.

Return the resulting string. If there is no way to replace a character to make it not a palindrome, return an empty string.

A string `a` is lexicographically smaller than a string `b` (of the same length) if in the first position where `a` and `b` differ, `a` has a character strictly smaller than the corresponding character in `b`. For example, `"abcc"` is lexicographically smaller than `"abcd"` because the first position they differ is at the fourth character, and `''c''` is smaller than `''d''`.


Example 1:
Input: palindrome = "abccba"
Output: "aaccba"
Explanation: There are many ways to make "abccba" not a palindrome, such as "zbccba", "aaccba", and "abacba".

Of all the ways, "aaccba" is the lexicographically smallest.


Example 2:
Input: palindrome = "a"
Output: ""
Explanation: There is no way to replace a single character to make "a" not a palindrome, so return an empty string.


Example 3:
Input: palindrome = "aa"
Output: "ab"

Example 4:
Input: palindrome = "aba"
Output: "abb"

Constraints:
`1 <= palindrome.length <= 1000`
`palindrome` consists of only lowercase English letters.', false, 'Medium', NULL, 47.6, 
   51.2, 'https://leetcode.com/problems/break-a-palindrome', 267, 31.1, 65.2, '["Amazon"]'::jsonb, '["String"]'::jsonb, 
   307, 305, 50, true, '[]'::jsonb, true),
  (1329, 'Sort the Matrix Diagonally', 'A matrix diagonal is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix''s end. For example, the matrix diagonal starting from `mat[2][0]`, where `mat` is a `6 x 3` matrix, includes cells `mat[2][0]`, `mat[3][1]`, and `mat[4][2]`.

Given an `m x n` matrix `mat` of integers, sort each matrix diagonal in ascending order and return the resulting matrix.


Example 1:
Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]

Example 2:
Input: mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]
Output: [[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]

Constraints:
`m == mat.length`
`n == mat[i].length`
`1 <= m, n <= 100`
`1 <= mat[i][j] <= 100`', false, 'Medium', '/articles/sort-the-matrix-diagonally', 81.7, 
   28.5, 'https://leetcode.com/problems/sort-the-matrix-diagonally', 666, 55.7, 68.2, '["Facebook"]'::jsonb, '["Array,Sort"]'::jsonb, 
   910, 153, 86, true, '[]'::jsonb, true),
  (1330, 'Reverse Subarray To Maximize Array Value', 'You are given an integer array `nums`. The value of this array is defined as the sum of `|nums[i]-nums[i+1]|` for all `0 <= i < nums.length-1`.

You are allowed to select any subarray of the given array and reverse it. You can perform this operation only once.

Find maximum possible value of the final array.


Example 1:
Input: nums = [2,3,1,5,4]
Output: 10
Explanation: By reversing the subarray [3,1,5] the array becomes [2,5,1,3,4] whose value is 10.


Example 2:
Input: nums = [2,4,9,24,2,1,10]
Output: 68

Constraints:
`1 <= nums.length <= 3*10^4`
`-10^5 <= nums[i] <= 10^5`', false, 'Hard', NULL, 36.8, 
   0, 'https://leetcode.com/problems/reverse-subarray-to-maximize-array-value', 39, 2.9, 7.9, '["Codenation"]'::jsonb, '["Array,Math"]'::jsonb, 
   221, 27, 89, false, '[]'::jsonb, true),
  (1331, 'Rank Transform of an Array', 'Given an array of integers `arr`, replace each element with its rank.

The rank represents how large the element is. The rank has the following rules:
Rank is an integer starting from 1.

The larger the element, the larger the rank. If two elements are equal, their rank must be the same.

Rank should be as small as possible.


Example 1:
Input: arr = [40,10,20,30]
Output: [4,1,2,3]
Explanation: 40 is the largest element. 10 is the smallest. 20 is the second smallest. 30 is the third smallest.


Example 2:
Input: arr = [100,100,100]
Output: [1,1,1]
Explanation: Same elements share the same rank.


Example 3:
Input: arr = [37,12,28,9,100,56,80,5,12]
Output: [5,3,4,2,8,6,7,1,3]

Constraints:
`0 <= arr.length <= 105`
`-109 <= arr[i] <= 109`', false, 'Easy', NULL, 57.3, 
   7.8, 'https://leetcode.com/problems/rank-transform-of-an-array', 366, 30.7, 53.5, '["Amazon,Facebook"]'::jsonb, '["Array"]'::jsonb, 
   425, 36, 92, true, '[]'::jsonb, true),
  (1332, 'Remove Palindromic Subsequences', 'You are given a string `s` consisting only of letters `''a''` and `''b''`. In a single step you can remove one palindromic subsequence from `s`.

Return the minimum number of steps to make the given string empty.

A string is a subsequence of a given string if it is generated by deleting some characters of a given string without changing its order. Note that a subsequence does not necessarily need to be contiguous.

A string is called palindrome if is one that reads the same backward as well as forward.


Example 1:
Input: s = "ababa"
Output: 1
Explanation: s is already a palindrome, so its entirety can be removed in a single step.


Example 2:
Input: s = "abb"
Output: 2
Explanation: "abb" -> "bb" -> "". 
Remove palindromic subsequence "a" then "bb".


Example 3:
Input: s = "baabb"
Output: 2
Explanation: "baabb" -> "b" -> "". 
Remove palindromic subsequence "baab" then "b".


Constraints:
`1 <= s.length <= 1000`
`s[i]` is either `''a''` or `''b''`.', false, 'Easy', '/articles/remove-palindrome-subsequences', 68.3, 
   0.4, 'https://leetcode.com/problems/remove-palindromic-subsequences', 336, 43.9, 64.3, '["Amazon"]'::jsonb, '["String"]'::jsonb, 
   21, 44, 32, true, '[]'::jsonb, true),
  (1333, 'Filter Restaurants by Vegan-Friendly, Price and Distance', 'Given the array `restaurants` where  `restaurants[i] = [idi, ratingi, veganFriendlyi, pricei, distancei]`. You have to filter the restaurants using three filters.

The `veganFriendly` filter will be either true (meaning you should only include restaurants with `veganFriendlyi` set to true) or false (meaning you can include any restaurant). In addition, you have the filters `maxPrice` and `maxDistance` which are the maximum value for price and distance of restaurants you should consider respectively.

Return the array of restaurant IDs after filtering, ordered by rating from highest to lowest. For restaurants with the same rating, order them by id from highest to lowest. For simplicity `veganFriendlyi` and `veganFriendly` take value 1 when it is true, and 0 when it is false.


Example 1:
Input: restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 1, maxPrice = 50, maxDistance = 10
Output: [3,1,5] 
Explanation: 
The restaurants are:
Restaurant 1 [id=1, rating=4, veganFriendly=1, price=40, distance=10]
Restaurant 2 [id=2, rating=8, veganFriendly=0, price=50, distance=5]
Restaurant 3 [id=3, rating=8, veganFriendly=1, price=30, distance=4]
Restaurant 4 [id=4, rating=10, veganFriendly=0, price=10, distance=3]
Restaurant 5 [id=5, rating=1, veganFriendly=1, price=15, distance=1] 
After filter restaurants with veganFriendly = 1, maxPrice = 50 and maxDistance = 10 we have restaurant 3, restaurant 1 and restaurant 5 (ordered by rating from highest to lowest). 

Example 2:
Input: restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 0, maxPrice = 50, maxDistance = 10
Output: [4,3,2,1,5]
Explanation: The restaurants are the same as in example 1, but in this case the filter veganFriendly = 0, therefore all restaurants are considered.


Example 3:
Input: restaurants = [[1,4,1,40,10],[2,8,0,50,5],[3,8,1,30,4],[4,10,0,10,3],[5,1,1,15,1]], veganFriendly = 0, maxPrice = 30, maxDistance = 3
Output: [4,5]

Constraints:
`1 <= restaurants.length <= 10^4`
`restaurants[i].length == 5`
`1 <= idi, ratingi, pricei, distancei <= 10^5`
`1 <= maxPrice, maxDistance <= 10^5`
`veganFriendlyi` and `veganFriendly` are 0 or 1.

All `idi` are distinct.', false, 'Medium', NULL, 57.4, 
   42.3, 'https://leetcode.com/problems/filter-restaurants-by-vegan-friendly-price-and-distance', 251, 15.8, 27.6, '["Yelp,Amazon"]'::jsonb, '["Array,Sort"]'::jsonb, 
   133, 128, 51, true, '[]'::jsonb, true),
  (1334, 'Find the City With the Smallest Number of Neighbors at a Threshold Distance', 'There are `n` cities numbered from `0` to `n-1`. Given the array `edges` where `edges[i] = [fromi, toi, weighti]` represents a bidirectional and weighted edge between cities `fromi` and `toi`, and given the integer `distanceThreshold`.

Return the city with the smallest number of cities that are reachable through some path and whose distance is at most `distanceThreshold`, If there are multiple such cities, return the city with the greatest number.

Notice that the distance of a path connecting cities i and j is equal to the sum of the edges'' weights along that path.


Example 1:
Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
Output: 3
Explanation: The figure above describes the graph. 
The neighboring cities at a distanceThreshold = 4 for each city are:
City 0 -> [City 1, City 2] 
City 1 -> [City 0, City 2, City 3] 
City 2 -> [City 0, City 1, City 3] 
City 3 -> [City 1, City 2] 
Cities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4, but we have to return city 3 since it has the greatest number.


Example 2:
Input: n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
Output: 0
Explanation: The figure above describes the graph. 
The neighboring cities at a distanceThreshold = 2 for each city are:
City 0 -> [City 1] 
City 1 -> [City 0, City 4] 
City 2 -> [City 3, City 4] 
City 3 -> [City 2, City 4]
City 4 -> [City 1, City 2, City 3] 
The city 0 has 1 neighboring city at a distanceThreshold = 2.


Constraints:
`2 <= n <= 100`
`1 <= edges.length <= n * (n - 1) / 2`
`edges[i].length == 3`
`0 <= fromi < toi < n`
`1 <= weighti, distanceThreshold <= 10^4`
All pairs `(fromi, toi)` are distinct.', false, 'Medium', NULL, 47.2, 
   26.1, 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance', 239, 21.6, 45.7, '["Citrix"]'::jsonb, '["Graph"]'::jsonb, 
   530, 33, 94, false, '[]'::jsonb, true),
  (1335, 'Minimum Difficulty of a Job Schedule', 'You want to schedule a list of jobs in `d` days. Jobs are dependent (i.e To work on the `i-th` job, you have to finish all the jobs `j` where `0 <= j < i`).

You have to finish at least one task every day. The difficulty of a job schedule is the sum of difficulties of each day of the `d` days. The difficulty of a day is the maximum difficulty of a job done in that day.

Given an array of integers `jobDifficulty` and an integer `d`. The difficulty of the `i-th` job is `jobDifficulty[i]`.

Return the minimum difficulty of a job schedule. If you cannot find a schedule for the jobs return -1.


Example 1:
Input: jobDifficulty = [6,5,4,3,2,1], d = 2
Output: 7
Explanation: First day you can finish the first 5 jobs, total difficulty = 6.

Second day you can finish the last job, total difficulty = 1.

The difficulty of the schedule = 6 + 1 = 7 

Example 2:
Input: jobDifficulty = [9,9,9], d = 4
Output: -1
Explanation: If you finish a job per day you will still have a free day. you cannot find a schedule for the given jobs.


Example 3:
Input: jobDifficulty = [1,1,1], d = 3
Output: 3
Explanation: The schedule is one job per day. total difficulty will be 3.


Example 4:
Input: jobDifficulty = [7,1,7,1,7,1], d = 3
Output: 15

Example 5:
Input: jobDifficulty = [11,111,22,222,33,333,44,444], d = 6
Output: 843

Constraints:
`1 <= jobDifficulty.length <= 300`
`0 <= jobDifficulty[i] <= 1000`
`1 <= d <= 10`', false, 'Hard', NULL, 56.6, 
   93.7, 'https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule', 247, 34.9, 61.6, '["Amazon,Swiggy"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   617, 78, 89, true, '[]'::jsonb, true),
  (1336, 'Number of Transactions per Visit', 'SQL Schema', true, 'Hard', NULL, 49.2, 
   5.7, 'https://leetcode.com/problems/number-of-transactions-per-visit', 129, 4.8, 9.8, '["Square,Machine Zone,MachineZone"]'::jsonb, '[]'::jsonb, 
   34, 164, 17, false, '[]'::jsonb, true),
  (1337, 'The K Weakest Rows in a Matrix', 'You are given an `m x n` binary matrix `mat` of `1`''s (representing soldiers) and `0`''s (representing civilians). The soldiers are positioned in front of the civilians. That is, all the `1`''s will appear to the left of all the `0`''s in each row.

A row `i` is weaker than a row `j` if one of the following is true:
The number of soldiers in row `i` is less than the number of soldiers in row `j`.

Both rows have the same number of soldiers and `i < j`.

Return the indices of the `k` weakest rows in the matrix ordered from weakest to strongest.


Example 1:
Input: mat = 
[[1,1,0,0,0],
 [1,1,1,1,0],
 [1,0,0,0,0],
 [1,1,0,0,0],
 [1,1,1,1,1]], 
k = 3
Output: [2,0,3]
Explanation: 
The number of soldiers in each row is: 
- Row 0: 2 
- Row 1: 4 
- Row 2: 1 
- Row 3: 2 
- Row 4: 5 
The rows ordered from weakest to strongest are [2,0,3,1,4].


Example 2:
Input: mat = 
[[1,0,0,0],
 [1,1,1,1],
 [1,0,0,0],
 [1,0,0,0]], 
k = 2
Output: [0,2]
Explanation: 
The number of soldiers in each row is: 
- Row 0: 1 
- Row 1: 4 
- Row 2: 1 
- Row 3: 1 
The rows ordered from weakest to strongest are [0,2,3,1].


Constraints:
`m == mat.length`
`n == mat[i].length`
`2 <= n, m <= 100`
`1 <= k <= m`
`matrix[i][j]` is either 0 or 1.', false, 'Easy', '/articles/the-k-weakest-rows-in-a-matrix', 72, 
   4.8, 'https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix', 895, 71.6, 99.3, '["Amazon"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   796, 55, 94, true, '[]'::jsonb, true),
  (1338, 'Reduce Array Size to The Half', 'Given an array `arr`.  You can choose a set of integers and remove all the occurrences of these integers in the array.

Return the minimum size of the set so that at least half of the integers of the array are removed.


Example 1:
Input: arr = [3,3,3,3,5,5,5,2,2,7]
Output: 2
Explanation: Choosing {3,7} will make the new array [5,5,5,2,2] which has size 5 (i.e equal to half of the size of the old array).

Possible sets of size 2 are {3,5},{3,2},{5,2}.

Choosing set {2,7} is not possible as it will make the new array [3,3,3,3,5,5,5] which has size greater than half of the size of the old array.


Example 2:
Input: arr = [7,7,7,7,7,7]
Output: 1
Explanation: The only possible set you can choose is {7}. This will make the new array empty.


Example 3:
Input: arr = [1,9]
Output: 1

Example 4:
Input: arr = [1000,1000,3,7]
Output: 1

Example 5:
Input: arr = [1,2,3,4,5,6,7,8,9,10]
Output: 5

Constraints:
`1 <= arr.length <= 10^5`
`arr.length` is even.

`1 <= arr[i] <= 10^5`', false, 'Medium', '/articles/reduce-array-size-to-the-half', 67.7, 
   3.6, 'https://leetcode.com/problems/reduce-array-size-to-the-half', 413, 35, 51.7, '["Akuna Capital"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   424, 39, 92, false, '[]'::jsonb, true),
  (1339, 'Maximum Product of Splitted Binary Tree', 'Given a binary tree `root`. Split the binary tree into two subtrees by removing 1 edge such that the product of the sums of the subtrees are maximized.

Since the answer may be too large, return it modulo 10^9 + 7.


Example 1:
Input: root = [1,2,3,4,5,6]
Output: 110
Explanation: Remove the red edge and get 2 binary trees with sum 11 and 10. Their product is 110 (11*10)

Example 2:
Input: root = [1,null,2,3,4,null,null,5,6]
Output: 90
Explanation:  Remove the red edge and get 2 binary trees with sum 15 and 6.Their product is 90 (15*6)

Example 3:
Input: root = [2,3,9,10,7,8,6,5,4,11,1]
Output: 1025

Example 4:
Input: root = [1,1]
Output: 1

Constraints:
Each tree has at most `50000` nodes and at least `2` nodes.

Each node''s value is between `[1, 10000]`.', false, 'Medium', '/articles/maximum-product-of-splitted-binary-tree', 38.5, 
   8, 'https://leetcode.com/problems/maximum-product-of-splitted-binary-tree', 278, 23.9, 62.1, '["Amazon"]'::jsonb, '["Dynamic Programming,Tree,Depth-first Search"]'::jsonb, 
   516, 44, 92, true, '[]'::jsonb, true),
  (1340, 'Jump Game V', 'Given an array of integers `arr` and an integer `d`. In one step you can jump from index `i` to index:
`i + x` where: `i + x < arr.length` and ` 0 < x <= d`.

`i - x` where: `i - x >= 0` and ` 0 < x <= d`.

In addition, you can only jump from index `i` to index `j` if `arr[i] > arr[j]` and `arr[i] > arr[k]` for all indices `k` between `i` and `j` (More formally `min(i, j) < k < max(i, j)`).

You can choose any index of the array and start jumping. Return the maximum number of indices you can visit.

Notice that you can not jump outside of the array at any time.


Example 1:
Input: arr = [6,4,14,6,8,13,9,7,10,6,12], d = 2
Output: 4
Explanation: You can start at index 10. You can jump 10 --> 8 --> 6 --> 7 as shown.

Note that if you start at index 6 you can only jump to index 7. You cannot jump to index 5 because 13 > 9. You cannot jump to index 4 because index 5 is between index 4 and 6 and 13 > 9.

Similarly You cannot jump from index 3 to index 2 or index 1.


Example 2:
Input: arr = [3,3,3,3,3], d = 3
Output: 1
Explanation: You can start at any index. You always cannot jump to any index.


Example 3:
Input: arr = [7,6,5,4,3,2,1], d = 1
Output: 7
Explanation: Start at index 0. You can visit all the indicies. 

Example 4:
Input: arr = [7,1,7,1,7,1], d = 2
Output: 2

Example 5:
Input: arr = [66], d = 1
Output: 1

Constraints:
`1 <= arr.length <= 1000`
`1 <= arr[i] <= 10^5`
`1 <= d <= arr.length`', false, 'Hard', NULL, 59.3, 
   3.3, 'https://leetcode.com/problems/jump-game-v', 183, 11.8, 19.9, '["Microsoft"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   334, 13, 96, false, '[]'::jsonb, true),
  (1341, 'Movie Rating', 'SQL Schema', true, 'Medium', NULL, 59, 
   0, 'https://leetcode.com/problems/movie-rating', 168, 11.6, 19.6, '["SAP"]'::jsonb, '[]'::jsonb, 
   60, 29, 67, false, '[]'::jsonb, true),
  (1342, 'Number of Steps to Reduce a Number to Zero', 'Given a non-negative integer `num`, return the number of steps to reduce it to zero. If the current number is even, you have to divide it by 2, otherwise, you have to subtract 1 from it.


Example 1:
Input: num = 14
Output: 6
Explanation: 
Step 1) 14 is even; divide by 2 and obtain 7. 
Step 2) 7 is odd; subtract 1 and obtain 6.

Step 3) 6 is even; divide by 2 and obtain 3. 
Step 4) 3 is odd; subtract 1 and obtain 2. 
Step 5) 2 is even; divide by 2 and obtain 1. 
Step 6) 1 is odd; subtract 1 and obtain 0.


Example 2:
Input: num = 8
Output: 4
Explanation: 
Step 1) 8 is even; divide by 2 and obtain 4. 
Step 2) 4 is even; divide by 2 and obtain 2. 
Step 3) 2 is even; divide by 2 and obtain 1. 
Step 4) 1 is odd; subtract 1 and obtain 0.


Example 3:
Input: num = 123
Output: 12

Constraints:
`0 <= num <= 10^6`', false, 'Easy', '/articles/number-of-steps-to-reduce-a-number-to-zero', 85.7, 
   4.2, 'https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero', 999, 183.6, 214.2, '["Amazon,Microsoft"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   863, 83, 91, true, '[]'::jsonb, true),
  (1343, 'Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold', 'Given an array of integers `arr` and two integers `k` and `threshold`.

Return the number of sub-arrays of size `k` and average greater than or equal to `threshold`.


Example 1:
Input: arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
Output: 3
Explanation: Sub-arrays [2,5,5],[5,5,5] and [5,5,8] have averages 4, 5 and 6 respectively. All other sub-arrays of size 3 have averages less than 4 (the threshold).


Example 2:
Input: arr = [1,1,1,1,1], k = 1, threshold = 0
Output: 5

Example 3:
Input: arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5
Output: 6
Explanation: The first 6 sub-arrays of size 3 have averages greater than 5. Note that averages are not integers.


Example 4:
Input: arr = [7,7,7,7,7,7,7], k = 7, threshold = 7
Output: 1

Example 5:
Input: arr = [4,4,4,4], k = 4, threshold = 1
Output: 1

Constraints:
`1 <= arr.length <= 10^5`
`1 <= arr[i] <= 10^4`
`1 <= k <= arr.length`
`0 <= threshold <= 10^4`', false, 'Medium', NULL, 64.9, 
   0, 'https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold', 223, 17, 26.1, '["LinkedIn"]'::jsonb, '["Array"]'::jsonb, 
   215, 40, 84, false, '[]'::jsonb, true),
  (1344, 'Angle Between Hands of a Clock', 'Given two numbers, `hour` and `minutes`. Return the smaller angle (in degrees) formed between the `hour` and the `minute` hand.


Example 1:
Input: hour = 12, minutes = 30
Output: 165

Example 2:
Input: hour = 3, minutes = 30
Output: 75

Example 3:
Input: hour = 3, minutes = 15
Output: 7.5

Example 4:
Input: hour = 4, minutes = 50
Output: 155

Example 5:
Input: hour = 12, minutes = 0
Output: 0

Constraints:
`1 <= hour <= 12`
`0 <= minutes <= 59`
Answers within `10^-5` of the actual value will be accepted as correct.', false, 'Medium', '/articles/angle-between-hands-of-a-clock', 61.3, 
   43.9, 'https://leetcode.com/problems/angle-between-hands-of-a-clock', 588, 52.9, 86.3, '["Microsoft,Amazon"]'::jsonb, '["Math"]'::jsonb, 
   499, 115, 81, true, '[]'::jsonb, true),
  (1345, 'Jump Game IV', 'Given an array of integers `arr`, you are initially positioned at the first index of the array.

In one step you can jump from index `i` to index:
`i + 1` where: `i + 1 < arr.length`.

`i - 1` where: `i - 1 >= 0`.

`j` where: `arr[i] == arr[j]` and `i != j`.

Return the minimum number of steps to reach the last index of the array.

Notice that you can not jump outside of the array at any time.


Example 1:
Input: arr = [100,-23,-23,404,100,23,23,23,3,404]
Output: 3
Explanation: You need three jumps from index 0 --> 4 --> 3 --> 9. Note that index 9 is the last index of the array.


Example 2:
Input: arr = [7]
Output: 0
Explanation: Start index is the last index. You don''t need to jump.


Example 3:
Input: arr = [7,6,9,6,9,6,9,7]
Output: 1
Explanation: You can jump directly from index 0 to index 7 which is last index of the array.


Example 4:
Input: arr = [6,1,9]
Output: 2

Example 5:
Input: arr = [11,22,7,7,7,7,7,7,7,22,13]
Output: 3

Constraints:
`1 <= arr.length <= 5 * 104`
`-108 <= arr[i] <= 108`', false, 'Hard', '/articles/jump-game-iv', 41.9, 
   42, 'https://leetcode.com/problems/jump-game-iv', 253, 31.6, 75.3, '["Amazon,Google"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   588, 42, 93, true, '[]'::jsonb, true),
  (1346, 'Check If N and Its Double Exist', 'Given an array `arr` of integers, check if there exists two integers `N` and `M` such that `N` is the double of `M` ( i.e. `N = 2 * M`).

More formally check if there exists two indices `i` and `j` such that :
`i != j`
`0 <= i, j < arr.length`
`arr[i] == 2 * arr[j]`

Example 1:
Input: arr = [10,2,5,3]
Output: true
Explanation: N` = 10` is the double of M` = 5`,that is, `10 = 2 * 5`.


Example 2:
Input: arr = [7,1,14,11]
Output: true
Explanation: N` = 14` is the double of M` = 7`,that is, `14 = 2 * 7`.


Example 3:
Input: arr = [3,1,7,11]
Output: false
Explanation: In this case does not exist N and M, such that N = 2 * M.


Constraints:
`2 <= arr.length <= 500`
`-10^3 <= arr[i] <= 10^3`', false, 'Easy', NULL, 36, 
   2.9, 'https://leetcode.com/problems/check-if-n-and-its-double-exist', 634, 96.3, 267.3, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   317, 54, 85, true, '[]'::jsonb, true),
  (1347, 'Minimum Number of Steps to Make Two Strings Anagram', 'Given two equal-size strings `s` and `t`. In one step you can choose any character of `t` and replace it with another character.

Return the minimum number of steps to make `t` an anagram of `s`.

An Anagram of a string is a string that contains the same characters with a different (or the same) ordering.


Example 1:
Input: s = "bab", t = "aba"
Output: 1
Explanation: Replace the first ''a'' in t with b, t = "bba" which is anagram of s.


Example 2:
Input: s = "leetcode", t = "practice"
Output: 5
Explanation: Replace ''p'', ''r'', ''a'', ''i'' and ''c'' from t with proper characters to make t anagram of s.


Example 3:
Input: s = "anagram", t = "mangaar"
Output: 0
Explanation: "anagram" and "mangaar" are anagrams. 

Example 4:
Input: s = "xxyyzz", t = "xxyyzz"
Output: 0

Example 5:
Input: s = "friend", t = "family"
Output: 4

Constraints:
`1 <= s.length <= 50000`
`s.length == t.length`
`s` and `t` contain lower-case English letters only.', false, 'Medium', NULL, 75.1, 
   34.3, 'https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram', 511, 51.5, 68.6, '["Bloomberg,Microsoft"]'::jsonb, '["String"]'::jsonb, 
   559, 39, 93, false, '[]'::jsonb, true),
  (1348, 'Tweet Counts Per Frequency', 'A social media company is trying to monitor activity on their site by analyzing the number of tweets that occur in select periods of time. These periods can be partitioned into smaller time chunks based on a certain frequency (every minute, hour, or day).

For example, the period `[10, 10000]` (in seconds) would be partitioned into the following time chunks with these frequencies:
Every minute (60-second chunks): `[10,69]`, `[70,129]`, `[130,189]`, `...`, `[9970,10000]`
Every hour (3600-second chunks): `[10,3609]`, `[3610,7209]`, `[7210,10000]`
Every day (86400-second chunks): `[10,10000]`
Notice that the last chunk may be shorter than the specified frequency''s chunk size and will always end with the end time of the period (`10000` in the above example).

Design and implement an API to help the company with their analysis.

Implement the `TweetCounts` class:
`TweetCounts()` Initializes the `TweetCounts` object.

`void recordTweet(String tweetName, int time)` Stores the `tweetName` at the recorded `time` (in seconds).

`List<Integer> getTweetCountsPerFrequency(String freq, String tweetName, int startTime, int endTime)` Returns a list of integers representing the number of tweets with `tweetName` in each time chunk for the given period of time `[startTime, endTime]` (in seconds) and frequency `freq`.

	
`freq` is one of `"minute"`, `"hour"`, or `"day"` representing a frequency of every minute, hour, or day respectively.


Example:
Input
["TweetCounts","recordTweet","recordTweet","recordTweet","getTweetCountsPerFrequency","getTweetCountsPerFrequency","recordTweet","getTweetCountsPerFrequency"]
[[],["tweet3",0],["tweet3",60],["tweet3",10],["minute","tweet3",0,59],["minute","tweet3",0,60],["tweet3",120],["hour","tweet3",0,210]]
Output
[null,null,null,null,[2],[2,1],null,[4]]
Explanation
TweetCounts tweetCounts = new TweetCounts();
tweetCounts.recordTweet("tweet3", 0);                              // New tweet "tweet3" at time 0
tweetCounts.recordTweet("tweet3", 60);                             // New tweet "tweet3" at time 60
tweetCounts.recordTweet("tweet3", 10);                             // New tweet "tweet3" at time 10
tweetCounts.getTweetCountsPerFrequency("minute", "tweet3", 0, 59); // return [2]; chunk [0,59] had 2 tweets
tweetCounts.getTweetCountsPerFrequency("minute", "tweet3", 0, 60); // return [2,1]; chunk [0,59] had 2 tweets, chunk [60,60] had 1 tweet
tweetCounts.recordTweet("tweet3", 120);                            // New tweet "tweet3" at time 120
tweetCounts.getTweetCountsPerFrequency("hour", "tweet3", 0, 210);  // return [4]; chunk [0,210] had 4 tweets

Constraints:
`0 <= time, startTime, endTime <= 109`
`0 <= endTime - startTime <= 104`
There will be at most `104` calls in total to `recordTweet` and `getTweetCountsPerFrequency`.', false, 'Medium', NULL, 37, 
   78.7, 'https://leetcode.com/problems/tweet-counts-per-frequency', 143, 13.7, 37, '["Twitter"]'::jsonb, '["Design"]'::jsonb, 
   8, 10, 44, false, '[]'::jsonb, true),
  (1349, 'Maximum Students Taking Exam', 'Given a `m * n` matrix `seats`  that represent seats distributions in a classroom. If a seat is broken, it is denoted by `''#''` character otherwise it is denoted by a `''.''` character.

Students can see the answers of those sitting next to the left, right, upper left and upper right, but he cannot see the answers of the student sitting directly in front or behind him. Return the maximum number of students that can take the exam together without any cheating being possible..

Students must be placed in seats in good condition.


Example 1:
Input: seats = [["#",".","#","#",".","#"],
                [".","#","#","#","#","."],
                ["#",".","#","#",".","#"]]
Output: 4
Explanation: Teacher can place 4 students in available seats so they don''t cheat on the exam. 

Example 2:
Input: seats = [[".","#"],
                ["#","#"],
                ["#","."],
                ["#","#"],
                [".","#"]]
Output: 3
Explanation: Place all students in available seats. 

Example 3:
Input: seats = [["#",".",".",".","#"],
                [".","#",".","#","."],
                [".",".","#",".","."],
                [".","#",".","#","."],
                ["#",".",".",".","#"]]
Output: 10
Explanation: Place students in available seats in column 1, 3 and 5.


Constraints:
`seats` contains only characters `''.'' and``''#''.`
`m == seats.length`
`n == seats[i].length`
`1 <= m <= 8`
`1 <= n <= 8`', false, 'Hard', NULL, 44.2, 
   12.9, 'https://leetcode.com/problems/maximum-students-taking-exam', 112, 7.4, 16.7, '["SAP"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   388, 10, 97, false, '[]'::jsonb, true),
  (1350, 'Students With Invalid Departments', 'SQL Schema', true, 'Easy', NULL, 90.4, 
   1.7, 'https://leetcode.com/problems/students-with-invalid-departments', 142, 26.1, 28.9, '["Amazon"]'::jsonb, '[]'::jsonb, 
   76, 7, 92, true, '[]'::jsonb, true),
  (1351, 'Count Negative Numbers in a Sorted Matrix', 'Given a `m x n` matrix `grid` which is sorted in non-increasing order both row-wise and column-wise, return the number of negative numbers in `grid`.


Example 1:
Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
Output: 8
Explanation: There are 8 negatives number in the matrix.


Example 2:
Input: grid = [[3,2],[1,0]]
Output: 0

Example 3:
Input: grid = [[1,-1],[-1,-1]]
Output: 3

Example 4:
Input: grid = [[-1]]
Output: 1

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 100`
`-100 <= grid[i][j] <= 100`
Follow up: Could you find an `O(n + m)` solution?', false, 'Easy', NULL, 75.8, 
   20.8, 'https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix', 999, 102.6, 135.4, '["Amazon,Microsoft,Apple"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   921, 46, 95, true, '[]'::jsonb, true),
  (1352, 'Product of the Last K Numbers', 'Implement the class `ProductOfNumbers` that supports two methods:
1.` add(int num)`
Adds the number `num` to the back of the current list of numbers.

2.` getProduct(int k)`
Returns the product of the last `k` numbers in the current list.

You can assume that always the current list has at least `k` numbers.

At any time, the product of any contiguous sequence of numbers will fit into a single 32-bit integer without overflowing.


Example:
Input
["ProductOfNumbers","add","add","add","add","add","getProduct","getProduct","getProduct","add","getProduct"]
[[],[3],[0],[2],[5],[4],[2],[3],[4],[8],[2]]
Output
[null,null,null,null,null,null,20,40,0,null,32]
Explanation
ProductOfNumbers productOfNumbers = new ProductOfNumbers();
productOfNumbers.add(3);        // [3]
productOfNumbers.add(0);        // [3,0]
productOfNumbers.add(2);        // [3,0,2]
productOfNumbers.add(5);        // [3,0,2,5]
productOfNumbers.add(4);        // [3,0,2,5,4]
productOfNumbers.getProduct(2); // return 20. The product of the last 2 numbers is 5 * 4 = 20
productOfNumbers.getProduct(3); // return 40. The product of the last 3 numbers is 2 * 5 * 4 = 40
productOfNumbers.getProduct(4); // return 0. The product of the last 4 numbers is 0 * 2 * 5 * 4 = 0
productOfNumbers.add(8);        // [3,0,2,5,4,8]
productOfNumbers.getProduct(2); // return 32. The product of the last 2 numbers is 4 * 8 = 32 

Constraints:
There will be at most `40000` operations considering both `add` and `getProduct`.

`0 <= num <= 100`
`1 <= k <= 40000`', false, 'Medium', NULL, 45, 
   27.8, 'https://leetcode.com/problems/product-of-the-last-k-numbers', 182, 29.1, 64.6, '["ByteDance,Google,Uber"]'::jsonb, '["Array,Design"]'::jsonb, 
   522, 30, 95, true, '[]'::jsonb, true),
  (1353, 'Maximum Number of Events That Can Be Attended', 'Given an array of `events` where `events[i] = [startDayi, endDayi]`. Every event `i` starts at `startDayi` and ends at `endDayi`.

You can attend an event `i` at any day `d` where `startTimei <= d <= endTimei`. Notice that you can only attend one event at any time `d`.

Return the maximum number of events you can attend.


Example 1:
Input: events = [[1,2],[2,3],[3,4]]
Output: 3
Explanation: You can attend all the three events.

One way to attend them all is as shown.

Attend the first event on day 1.

Attend the second event on day 2.

Attend the third event on day 3.


Example 2:
Input: events= [[1,2],[2,3],[3,4],[1,2]]
Output: 4

Example 3:
Input: events = [[1,4],[4,4],[2,2],[3,4],[1,1]]
Output: 4

Example 4:
Input: events = [[1,100000]]
Output: 1

Example 5:
Input: events = [[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]]
Output: 7

Constraints:
`1 <= events.length <= 105`
`events[i].length == 2`
`1 <= startDayi <= endDayi <= 105`', false, 'Medium', NULL, 30.6, 
   56.2, 'https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended', 193, 23.5, 77, '["Infosys"]'::jsonb, '["Greedy,Sort,Segment Tree"]'::jsonb, 
   814, 116, 88, false, '[]'::jsonb, true),
  (1354, 'Construct Target Array With Multiple Sums', 'Given an array of integers `target`. From a starting array, `A` consisting of all 1''s, you may perform the following procedure :
let `x` be the sum of all elements currently in your array.

choose index `i`, such that `0 <= i < target.size` and set the value of `A` at index `i` to `x`.

You may repeat this procedure as many times as needed.

Return True if it is possible to construct the `target` array from `A` otherwise return False.


Example 1:
Input: target = [9,3,5]
Output: true
Explanation: Start with [1, 1, 1] 
[1, 1, 1], sum = 3 choose index 1
[1, 3, 1], sum = 5 choose index 2
[1, 3, 5], sum = 9 choose index 0
[9, 3, 5] Done

Example 2:
Input: target = [1,1,1,2]
Output: false
Explanation: Impossible to create target array from [1,1,1,1].


Example 3:
Input: target = [8,5]
Output: true

Constraints:
`N == target.length`
`1 <= target.length <= 5 * 10^4`
`1 <= target[i] <= 10^9`', false, 'Hard', '/articles/construct-target-array-with-multiple-sums', 31.3, 
   35.3, 'https://leetcode.com/problems/construct-target-array-with-multiple-sums', 115, 8.9, 28.3, '["Quora"]'::jsonb, '["Greedy"]'::jsonb, 
   263, 35, 88, false, '[]'::jsonb, true),
  (1355, 'Activity Participants', 'SQL Schema', true, 'Medium', NULL, 74.6, 
   1.8, 'https://leetcode.com/problems/activity-participants', 214, 13.4, 17.9, '["IBM"]'::jsonb, '[]'::jsonb, 
   66, 23, 74, false, '[]'::jsonb, true),
  (1356, 'Sort Integers by The Number of 1 Bits', 'Given an integer array `arr`. You have to sort the integers in the array in ascending order by the number of 1''s in their binary representation and in case of two or more integers have the same number of 1''s you have to sort them in ascending order.

Return the sorted array.


Example 1:
Input: arr = [0,1,2,3,4,5,6,7,8]
Output: [0,1,2,4,8,3,5,6,7]
Explantion: [0] is the only integer with 0 bits.

[1,2,4,8] all have 1 bit.

[3,5,6] have 2 bits.

[7] has 3 bits.

The sorted array by bits is [0,1,2,4,8,3,5,6,7]

Example 2:
Input: arr = [1024,512,256,128,64,32,16,8,4,2,1]
Output: [1,2,4,8,16,32,64,128,256,512,1024]
Explantion: All integers have 1 bit in the binary representation, you should just sort them in ascending order.


Example 3:
Input: arr = [10000,10000]
Output: [10000,10000]

Example 4:
Input: arr = [2,3,5,7,11,13,17,19]
Output: [2,3,5,17,7,11,13,19]

Example 5:
Input: arr = [10,100,1000,10000]
Output: [10,100,10000,1000]

Constraints:
`1 <= arr.length <= 500`
`0 <= arr[i] <= 10^4`', false, 'Easy', NULL, 70.4, 
   0.8, 'https://leetcode.com/problems/sort-integers-by-the-number-of-1-bits', 487, 39, 55.3, '["Adobe"]'::jsonb, '["Sort,Bit Manipulation"]'::jsonb, 
   473, 20, 96, false, '[]'::jsonb, true),
  (1357, 'Apply Discount Every n Orders', 'There is a sale in a supermarket, there will be a `discount` every `n` customer.

There are some products in the supermarket where the id of the `i-th` product is `products[i]` and the price per unit of this product is `prices[i]`.

The system will count the number of customers and when the `n-th` customer arrive he/she will have a `discount` on the bill. (i.e if the cost is `x` the new cost is `x - (discount * x) / 100`). Then the system will start counting customers again.

The customer orders a certain amount of each product where `product[i]` is the id of the `i-th` product the customer ordered and `amount[i]` is the number of units the customer ordered of that product.

Implement the `Cashier` class:
`Cashier(int n, int discount, int[] products, int[] prices)` Initializes the object with `n`, the `discount`, the `products` and their `prices`.

`double getBill(int[] product, int[] amount)` returns the value of the bill and apply the discount if needed. Answers within `10^-5` of the actual value will be accepted as correct.


Example 1:
Input
["Cashier","getBill","getBill","getBill","getBill","getBill","getBill","getBill"]
[[3,50,[1,2,3,4,5,6,7],[100,200,300,400,300,200,100]],[[1,2],[1,2]],[[3,7],[10,10]],[[1,2,3,4,5,6,7],[1,1,1,1,1,1,1]],[[4],[10]],[[7,3],[10,10]],[[7,5,3,1,6,4,2],[10,10,10,9,9,9,7]],[[2,3,5],[5,3,2]]]
Output
[null,500.0,4000.0,800.0,4000.0,4000.0,7350.0,2500.0]
Explanation
Cashier cashier = new Cashier(3,50,[1,2,3,4,5,6,7],[100,200,300,400,300,200,100]);
cashier.getBill([1,2],[1,2]);                        // return 500.0, bill = 1 * 100 + 2 * 200 = 500.

cashier.getBill([3,7],[10,10]);                      // return 4000.0
cashier.getBill([1,2,3,4,5,6,7],[1,1,1,1,1,1,1]);    // return 800.0, The bill was 1600.0 but as this is the third customer, he has a discount of 50% which means his bill is only 1600 - 1600 * (50 / 100) = 800.

cashier.getBill([4],[10]);                           // return 4000.0
cashier.getBill([7,3],[10,10]);                      // return 4000.0
cashier.getBill([7,5,3,1,6,4,2],[10,10,10,9,9,9,7]); // return 7350.0, Bill was 14700.0 but as the system counted three more customers, he will have a 50% discount and the bill becomes 7350.0
cashier.getBill([2,3,5],[5,3,2]);                    // return 2500.0

Constraints:
`1 <= n <= 10^4`
`0 <= discount <= 100`
`1 <= products.length <= 200`
`1 <= products[i] <= 200`
There are not repeated elements in the array `products`.

`prices.length == products.length`
`1 <= prices[i] <= 1000`
`1 <= product.length <= products.length`
`product[i]` exists in `products`.

`amount.length == product.length`
`1 <= amount[i] <= 1000`
At most `1000` calls will be made to `getBill`.

Answers within `10^-5` of the actual value will be accepted as correct.', false, 'Medium', NULL, 66.9, 
   0, 'https://leetcode.com/problems/apply-discount-every-n-orders', 106, 10.4, 15.6, '["Facebook"]'::jsonb, '["Design"]'::jsonb, 
   76, 113, 40, true, '[]'::jsonb, true),
  (1358, 'Number of Substrings Containing All Three Characters', 'Given a string `s` consisting only of characters a, b and c.

Return the number of substrings containing at least one occurrence of all these characters a, b and c.


Example 1:
Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 

Example 2:
Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb". 

Example 3:
Input: s = "abc"
Output: 1

Constraints:
`3 <= s.length <= 5 x 10^4`
`s` only consists of a, b or c characters.', false, 'Medium', NULL, 60.5, 
   4.9, 'https://leetcode.com/problems/number-of-substrings-containing-all-three-characters', 210, 20.9, 34.5, '["DE Shaw,Microsoft"]'::jsonb, '["String"]'::jsonb, 
   660, 15, 98, false, '[]'::jsonb, true),
  (1359, 'Count All Valid Pickup and Delivery Options', 'Given `n` orders, each order consist in pickup and delivery services. 
Count all valid pickup/delivery possible sequences such that delivery(i) is always after of pickup(i). 
Since the answer may be too large, return it modulo 10^9 + 7.


Example 1:
Input: n = 1
Output: 1
Explanation: Unique order (P1, D1), Delivery 1 always is after of Pickup 1.


Example 2:
Input: n = 2
Output: 6
Explanation: All possible orders: 
(P1,P2,D1,D2), (P1,P2,D2,D1), (P1,D1,P2,D2), (P2,P1,D1,D2), (P2,P1,D2,D1) and (P2,D2,P1,D1).

This is an invalid order (P1,D2,P2,D1) because Pickup 2 is after of Delivery 2.


Example 3:
Input: n = 3
Output: 90

Constraints:
`1 <= n <= 500`', false, 'Hard', NULL, 56.3, 
   53.7, 'https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options', 143, 11.6, 20.6, '["DoorDash"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   287, 32, 90, false, '[]'::jsonb, true),
  (1360, 'Number of Days Between Two Dates', 'Write a program to count the number of days between two dates.

The two dates are given as strings, their format is `YYYY-MM-DD` as shown in the examples.


Example 1:
Input: date1 = "2019-06-29", date2 = "2019-06-30"
Output: 1

Example 2:
Input: date1 = "2020-01-15", date2 = "2019-12-31"
Output: 15

Constraints:
The given dates are valid dates between the years `1971` and `2100`.', false, 'Easy', NULL, 46.6, 
   20.5, 'https://leetcode.com/problems/number-of-days-between-two-dates', 199, 19, 40.8, '["Amazon"]'::jsonb, '[]'::jsonb, 
   97, 528, 16, true, '[]'::jsonb, true),
  (1361, 'Validate Binary Tree Nodes', 'You have `n` binary tree nodes numbered from `0` to `n - 1` where node `i` has two children `leftChild[i]` and `rightChild[i]`, return `true` if and only if all the given nodes form exactly one valid binary tree.

If node `i` has no left child then `leftChild[i]` will equal `-1`, similarly for the right child.

Note that the nodes have no values and that we only use the node numbers in this problem.


Example 1:
Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,-1,-1,-1]
Output: true

Example 2:
Input: n = 4, leftChild = [1,-1,3,-1], rightChild = [2,3,-1,-1]
Output: false

Example 3:
Input: n = 2, leftChild = [1,0], rightChild = [-1,-1]
Output: false

Example 4:
Input: n = 6, leftChild = [1,-1,-1,4,-1,-1], rightChild = [2,-1,-1,5,-1,-1]
Output: false

Constraints:
`1 <= n <= 104`
`leftChild.length == rightChild.length == n`
`-1 <= leftChild[i], rightChild[i] <= n - 1`', false, 'Medium', NULL, 43.3, 
   19.7, 'https://leetcode.com/problems/validate-binary-tree-nodes', 379, 20.4, 47.1, '["Facebook"]'::jsonb, '["Graph"]'::jsonb, 
   349, 124, 74, true, '[]'::jsonb, true),
  (1362, 'Closest Divisors', 'Given an integer `num`, find the closest two integers in absolute difference whose product equals `num + 1` or `num + 2`.

Return the two integers in any order.


Example 1:
Input: num = 8
Output: [3,3]
Explanation: For num + 1 = 9, the closest divisors are 3 & 3, for num + 2 = 10, the closest divisors are 2 & 5, hence 3 & 3 is chosen.


Example 2:
Input: num = 123
Output: [5,25]

Example 3:
Input: num = 999
Output: [40,25]

Constraints:
`1 <= num <= 10^9`', false, 'Medium', NULL, 57.8, 
   0, 'https://leetcode.com/problems/closest-divisors', 136, 12.2, 21, '["Amazon"]'::jsonb, '["Math"]'::jsonb, 
   106, 67, 61, true, '[]'::jsonb, true),
  (1363, 'Largest Multiple of Three', 'Given an integer array of `digits`, return the largest multiple of three that can be formed by concatenating some of the given digits in any order.

Since the answer may not fit in an integer data type, return the answer as a string.

If there is no answer return an empty string.


Example 1:
Input: digits = [8,1,9]
Output: "981"

Example 2:
Input: digits = [8,6,7,1,0]
Output: "8760"

Example 3:
Input: digits = [1]
Output: ""

Example 4:
Input: digits = [0,0,0,0,0,0]
Output: "0"

Constraints:
`1 <= digits.length <= 10^4`
`0 <= digits[i] <= 9`
The returning answer must not contain unnecessary leading zeros.', false, 'Hard', NULL, 34.1, 
   3.9, 'https://leetcode.com/problems/largest-multiple-of-three', 153, 10, 29.4, '["Amazon"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   244, 39, 86, true, '[]'::jsonb, true),
  (1364, 'Number of Trusted Contacts of a Customer', 'SQL Schema', true, 'Medium', NULL, 79.2, 
   0, 'https://leetcode.com/problems/number-of-trusted-contacts-of-a-customer', 160, 7.8, 9.8, '["Roblox"]'::jsonb, '[]'::jsonb, 
   30, 174, 15, false, '[]'::jsonb, true),
  (1365, 'How Many Numbers Are Smaller Than the Current Number', 'Given the array `nums`, for each `nums[i]` find out how many numbers in the array are smaller than it. That is, for each `nums[i]` you have to count the number of valid `j''s` such that `j != i` and `nums[j] < nums[i]`.

Return the answer in an array.


Example 1:
Input: nums = [8,1,2,2,3]
Output: [4,0,1,1,3]
Explanation: 
For nums[0]=8 there exist four smaller numbers than it (1, 2, 2 and 3). 
For nums[1]=1 does not exist any smaller number than it.

For nums[2]=2 there exist one smaller number than it (1). 
For nums[3]=2 there exist one smaller number than it (1). 
For nums[4]=3 there exist three smaller numbers than it (1, 2 and 2).


Example 2:
Input: nums = [6,5,4,8]
Output: [2,1,0,3]

Example 3:
Input: nums = [7,7,7,7]
Output: [0,0,0,0]

Constraints:
`2 <= nums.length <= 500`
`0 <= nums[i] <= 100`', false, 'Easy', NULL, 86, 
   8.1, 'https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number', 999, 187.3, 217.8, '["Amazon,Bloomberg"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   1549, 39, 98, true, '[]'::jsonb, true),
  (1366, 'Rank Teams by Votes', 'In a special ranking system, each voter gives a rank from highest to lowest to all teams participated in the competition.

The ordering of teams is decided by who received the most position-one votes. If two or more teams tie in the first position, we consider the second position to resolve the conflict, if they tie again, we continue this process until the ties are resolved. If two or more teams are still tied after considering all positions, we rank them alphabetically based on their team letter.

Given an array of strings `votes` which is the votes of all voters in the ranking systems. Sort all teams according to the ranking system described above.

Return a string of all teams sorted by the ranking system.


Example 1:
Input: votes = ["ABC","ACB","ABC","ACB","ACB"]
Output: "ACB"
Explanation: Team A was ranked first place by 5 voters. No other team was voted as first place so team A is the first team.

Team B was ranked second by 2 voters and was ranked third by 3 voters.

Team C was ranked second by 3 voters and was ranked third by 2 voters.

As most of the voters ranked C second, team C is the second team and team B is the third.


Example 2:
Input: votes = ["WXYZ","XYZW"]
Output: "XWYZ"
Explanation: X is the winner due to tie-breaking rule. X has same votes as W for the first position but X has one vote as second position while W doesn''t have any votes as second position. 

Example 3:
Input: votes = ["ZMNAGUEDSJYLBOPHRQICWFXTVK"]
Output: "ZMNAGUEDSJYLBOPHRQICWFXTVK"
Explanation: Only one voter so his votes are used for the ranking.


Example 4:
Input: votes = ["BCA","CAB","CBA","ABC","ACB","BAC"]
Output: "ABC"
Explanation: 
Team A was ranked first by 2 voters, second by 2 voters and third by 2 voters.

Team B was ranked first by 2 voters, second by 2 voters and third by 2 voters.

Team C was ranked first by 2 voters, second by 2 voters and third by 2 voters.

There is a tie and we rank teams ascending by their IDs.


Example 5:
Input: votes = ["M","M","M","M"]
Output: "M"
Explanation: Only team M in the competition so it has the first rank.


Constraints:
`1 <= votes.length <= 1000`
`1 <= votes[i].length <= 26`
`votes[i].length == votes[j].length` for `0 <= i, j < votes.length`.

`votes[i][j]` is an English upper-case letter.

All characters of `votes[i]` are unique.

All the characters that occur in `votes[0]` also occur in `votes[j]` where `1 <= j < votes.length`.', false, 'Medium', NULL, 55.6, 
   35.8, 'https://leetcode.com/problems/rank-teams-by-votes', 209, 19.9, 35.7, '["Atlassian,Zoom"]'::jsonb, '["Array,Sort"]'::jsonb, 
   420, 55, 88, false, '[]'::jsonb, true),
  (1367, 'Linked List in Binary Tree', 'Given a binary tree `root` and a linked list with `head` as the first node. 
Return True if all the elements in the linked list starting from the `head` correspond to some downward path connected in the binary tree otherwise return False.

In this context downward path means a path that starts at some node and goes downwards.


Example 1:
Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in blue form a subpath in the binary Tree.  

Example 2:
Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true

Example 3:
Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the elements of the linked list from `head`.


Constraints:
The number of nodes in the tree will be in the range `[1, 2500]`.

The number of nodes in the list will be in the range `[1, 100]`.

`1 <= Node.val <= 100` for each node in the linked list and binary tree.', false, 'Medium', NULL, 41, 
   3.4, 'https://leetcode.com/problems/linked-list-in-binary-tree', 352, 28.8, 70.3, '["Amazon"]'::jsonb, '["Linked List,Dynamic Programming,Tree"]'::jsonb, 
   776, 28, 97, true, '[]'::jsonb, true),
  (1368, 'Minimum Cost to Make at Least One Valid Path in a Grid', 'Given a m x n `grid`. Each cell of the `grid` has a sign pointing to the next cell you should visit if you are currently in this cell. The sign of `grid[i][j]` can be:
1 which means go to the cell to the right. (i.e go from `grid[i][j]` to `grid[i][j + 1]`)
2 which means go to the cell to the left. (i.e go from `grid[i][j]` to `grid[i][j - 1]`)
3 which means go to the lower cell. (i.e go from `grid[i][j]` to `grid[i + 1][j]`)
4 which means go to the upper cell. (i.e go from `grid[i][j]` to `grid[i - 1][j]`)
Notice that there could be some invalid signs on the cells of the `grid` which points outside the `grid`.

You will initially start at the upper left cell `(0,0)`. A valid path in the grid is a path which starts from the upper left cell `(0,0)` and ends at the bottom-right cell `(m - 1, n - 1)` following the signs on the grid. The valid path doesn''t have to be the shortest.

You can modify the sign on a cell with `cost = 1`. You can modify the sign on a cell one time only.

Return the minimum cost to make the grid have at least one valid path.


Example 1:
Input: grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]
Output: 3
Explanation: You will start at point (0, 0).

The path to (3, 3) is as follows. (0, 0) --> (0, 1) --> (0, 2) --> (0, 3) change the arrow to down with cost = 1 --> (1, 3) --> (1, 2) --> (1, 1) --> (1, 0) change the arrow to down with cost = 1 --> (2, 0) --> (2, 1) --> (2, 2) --> (2, 3) change the arrow to down with cost = 1 --> (3, 3)
The total cost = 3.


Example 2:
Input: grid = [[1,1,3],[3,2,2],[1,1,4]]
Output: 0
Explanation: You can follow the path from (0, 0) to (2, 2).


Example 3:
Input: grid = [[1,2],[4,3]]
Output: 1

Example 4:
Input: grid = [[2,2,2],[2,2,2]]
Output: 3

Example 5:
Input: grid = [[4]]
Output: 0

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 100`', false, 'Hard', NULL, 57.6, 
   21.1, 'https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid', 179, 16.4, 28.4, '["Google"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   513, 7, 99, true, '[]'::jsonb, true),
  (1369, 'Get the Second Most Recent Activity', 'SQL Schema', true, 'Hard', NULL, 69.1, 
   2.4, 'https://leetcode.com/problems/get-the-second-most-recent-activity', 173, 7, 10.1, '["Microsoft"]'::jsonb, '[]'::jsonb, 
   58, 6, 91, false, '[]'::jsonb, true),
  (1370, 'Increasing Decreasing String', 'Given a string `s`. You should re-order the string using the following algorithm:
Pick the smallest character from `s` and append it to the result.

Pick the smallest character from `s` which is greater than the last appended character to the result and append it.

Repeat step 2 until you cannot pick more characters.

Pick the largest character from `s` and append it to the result.

Pick the largest character from `s` which is smaller than the last appended character to the result and append it.

Repeat step 5 until you cannot pick more characters.

Repeat the steps from 1 to 6 until you pick all characters from `s`.

In each step, If the smallest or the largest character appears more than once you can choose any occurrence and append it to the result.

Return the result string after sorting `s` with this algorithm.


Example 1:
Input: s = "aaaabbbbcccc"
Output: "abccbaabccba"
Explanation: After steps 1, 2 and 3 of the first iteration, result = "abc"
After steps 4, 5 and 6 of the first iteration, result = "abccba"
First iteration is done. Now s = "aabbcc" and we go back to step 1
After steps 1, 2 and 3 of the second iteration, result = "abccbaabc"
After steps 4, 5 and 6 of the second iteration, result = "abccbaabccba"

Example 2:
Input: s = "rat"
Output: "art"
Explanation: The word "rat" becomes "art" after re-ordering it with the mentioned algorithm.


Example 3:
Input: s = "leetcode"
Output: "cdelotee"

Example 4:
Input: s = "ggggggg"
Output: "ggggggg"

Example 5:
Input: s = "spo"
Output: "ops"

Constraints:
`1 <= s.length <= 500`
`s` contains only lower-case English letters.', false, 'Easy', NULL, 77.5, 
   5.8, 'https://leetcode.com/problems/increasing-decreasing-string', 442, 39.7, 51.2, '["Akuna Capital"]'::jsonb, '["String,Sort"]'::jsonb, 
   345, 372, 48, false, '[]'::jsonb, true),
  (1371, 'Find the Longest Substring Containing Vowels in Even Counts', 'Given the string `s`, return the size of the longest substring containing each vowel an even number of times. That is, ''a'', ''e'', ''i'', ''o'', and ''u'' must appear an even number of times.


Example 1:
Input: s = "eleetminicoworoep"
Output: 13
Explanation: The longest substring is "leetminicowor" which contains two each of the vowels: e, i and o and zero of the vowels: a and u.


Example 2:
Input: s = "leetcodeisgreat"
Output: 5
Explanation: The longest substring is "leetc" which contains two e''s.


Example 3:
Input: s = "bcbcbc"
Output: 6
Explanation: In this case, the given string "bcbcbc" is the longest because all vowels: a, e, i, o and u appear zero times.


Constraints:
`1 <= s.length <= 5 x 10^5`
`s` contains only lowercase English letters.', false, 'Medium', NULL, 60.8, 
   3.3, 'https://leetcode.com/problems/find-the-longest-substring-containing-vowels-in-even-counts', 106, 12, 19.7, '["Microsoft"]'::jsonb, '["String"]'::jsonb, 
   597, 24, 96, false, '[]'::jsonb, true),
  (1372, 'Longest ZigZag Path in a Binary Tree', 'You are given the `root` of a binary tree.

A ZigZag path for a binary tree is defined as follow:
Choose any node in the binary tree and a direction (right or left).

If the current direction is right, move to the right child of the current node; otherwise, move to the left child.

Change the direction from right to left or from left to right.

Repeat the second and third steps until you can''t move in the tree.

Zigzag length is defined as the number of nodes visited - 1. (A single node has a length of 0).

Return the longest ZigZag path contained in that tree.


Example 1:
Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1,null,1]
Output: 3
Explanation: Longest ZigZag path in blue nodes (right -> left -> right).


Example 2:
Input: root = [1,1,1,null,1,null,null,1,1,null,1]
Output: 4
Explanation: Longest ZigZag path in blue nodes (left -> right -> left -> right).


Example 3:
Input: root = [1]
Output: 0

Constraints:
The number of nodes in the tree is in the range `[1, 5 * 104]`.

`1 <= Node.val <= 100`', false, 'Medium', NULL, 55, 
   4.8, 'https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree', 291, 18.6, 33.7, '["Sumerge"]'::jsonb, '["Dynamic Programming,Tree"]'::jsonb, 
   541, 11, 98, false, '[]'::jsonb, true),
  (1373, 'Maximum Sum BST in Binary Tree', 'Given a binary tree `root`, the task is to return the maximum sum of all keys of any sub-tree which is also a Binary Search Tree (BST).

Assume a BST is defined as follows:
The left subtree of a node contains only nodes with keys less than the node''s key.

The right subtree of a node contains only nodes with keys greater than the node''s key.

Both the left and right subtrees must also be binary search trees.


Example 1:
Input: root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]
Output: 20
Explanation: Maximum sum in a valid Binary search tree is obtained in root node with key equal to 3.


Example 2:
Input: root = [4,3,null,1,2]
Output: 2
Explanation: Maximum sum in a valid Binary search tree is obtained in a single root node with key equal to 2.


Example 3:
Input: root = [-4,-2,-5]
Output: 0
Explanation: All values are negatives. Return an empty BST.


Example 4:
Input: root = [2,1,3]
Output: 6

Example 5:
Input: root = [5,4,8,3,null,6,3]
Output: 7

Constraints:
The given binary tree will have between `1` and `40000` nodes.

Each node''s value is between `[-4 * 10^4 , 4 * 10^4]`.', false, 'Hard', NULL, 37.1, 
   8, 'https://leetcode.com/problems/maximum-sum-bst-in-binary-tree', 270, 15, 40.4, '["Amazon"]'::jsonb, '["Dynamic Programming,Binary Search Tree"]'::jsonb, 
   407, 67, 86, true, '[]'::jsonb, true),
  (1374, 'Generate a String With Characters That Have Odd Counts', 'Given an integer `n`, return a string with `n` characters such that each character in such string occurs an odd number of times.

The returned string must contain only lowercase English letters. If there are multiples valid strings, return any of them.  

Example 1:
Input: n = 4
Output: "pppz"
Explanation: "pppz" is a valid string since the character ''p'' occurs three times and the character ''z'' occurs once. Note that there are many other valid strings such as "ohhh" and "love".


Example 2:
Input: n = 2
Output: "xy"
Explanation: "xy" is a valid string since the characters ''x'' and ''y'' occur once. Note that there are many other valid strings such as "ag" and "ur".


Example 3:
Input: n = 7
Output: "holasss"

Constraints:
`1 <= n <= 500`', false, 'Easy', NULL, 76.9, 
   1.8, 'https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts', 518, 49.4, 64.2, '["Microsoft"]'::jsonb, '["String"]'::jsonb, 
   182, 749, 20, false, '[]'::jsonb, true),
  (1375, 'Bulb Switcher III', 'There is a room with `n` bulbs, numbered from `1` to `n`, arranged in a row from left to right. Initially, all the bulbs are turned off.

At moment k (for k from `0` to `n - 1`), we turn on the `light[k]` bulb. A bulb change color to blue only if it is on and all the previous bulbs (to the left) are turned on too.

Return the number of moments in which all turned on bulbs are blue.


Example 1:
Input: light = [2,1,3,5,4]
Output: 3
Explanation: All bulbs turned on, are blue at the moment 1, 2 and 4.


Example 2:
Input: light = [3,2,4,1,5]
Output: 2
Explanation: All bulbs turned on, are blue at the moment 3, and 4 (index-0).


Example 3:
Input: light = [4,1,2,3]
Output: 1
Explanation: All bulbs turned on, are blue at the moment 3 (index-0).

Bulb 4th changes to blue at the moment 3.


Example 4:
Input: light = [2,1,4,3,6,5]
Output: 3

Example 5:
Input: light = [1,2,3,4,5,6]
Output: 6

Constraints:
`n == light.length`
`1 <= n <= 5 * 10^4`
`light` is a permutation of  `[1, 2, ..., n]`', false, 'Medium', NULL, 64.3, 
   24.4, 'https://leetcode.com/problems/bulb-switcher-iii', 313, 27.2, 42.3, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   466, 77, 86, true, '[]'::jsonb, true),
  (1376, 'Time Needed to Inform All Employees', 'A company has `n` employees with a unique ID for each employee from `0` to `n - 1`. The head of the company is the one with `headID`.

Each employee has one direct manager given in the `manager` array where `manager[i]` is the direct manager of the `i-th` employee, `manager[headID] = -1`. Also, it is guaranteed that the subordination relationships have a tree structure.

The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates, and they will inform their subordinates, and so on until all employees know about the urgent news.

The `i-th` employee needs `informTime[i]` minutes to inform all of his direct subordinates (i.e., After informTime[i] minutes, all his direct subordinates can start spreading the news).

Return the number of minutes needed to inform all the employees about the urgent news.


Example 1:
Input: n = 1, headID = 0, manager = [-1], informTime = [0]
Output: 0
Explanation: The head of the company is the only employee in the company.


Example 2:
Input: n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0]
Output: 1
Explanation: The head of the company with id = 2 is the direct manager of all the employees in the company and needs 1 minute to inform them all.

The tree structure of the employees in the company is shown.


Example 3:
Input: n = 7, headID = 6, manager = [1,2,3,4,5,6,-1], informTime = [0,6,5,4,3,2,1]
Output: 21
Explanation: The head has id = 6. He will inform employee with id = 5 in 1 minute.

The employee with id = 5 will inform the employee with id = 4 in 2 minutes.

The employee with id = 4 will inform the employee with id = 3 in 3 minutes.

The employee with id = 3 will inform the employee with id = 2 in 4 minutes.

The employee with id = 2 will inform the employee with id = 1 in 5 minutes.

The employee with id = 1 will inform the employee with id = 0 in 6 minutes.

Needed time = 1 + 2 + 3 + 4 + 5 + 6 = 21.


Example 4:
Input: n = 15, headID = 0, manager = [-1,0,0,1,1,2,2,3,3,4,4,5,5,6,6], informTime = [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0]
Output: 3
Explanation: The first minute the head will inform employees 1 and 2.

The second minute they will inform employees 3, 4, 5 and 6.

The third minute they will inform the rest of employees.


Example 5:
Input: n = 4, headID = 2, manager = [3,3,-1,2], informTime = [0,0,162,914]
Output: 1076

Constraints:
`1 <= n <= 105`
`0 <= headID < n`
`manager.length == n`
`0 <= manager[i] < n`
`manager[headID] == -1`
`informTime.length == n`
`0 <= informTime[i] <= 1000`
`informTime[i] == 0` if employee `i` has no subordinates.

It is guaranteed that all the employees can be informed.', false, 'Medium', NULL, 56.7, 
   20, 'https://leetcode.com/problems/time-needed-to-inform-all-employees', 495, 49.4, 87.2, '["Google"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   765, 69, 92, true, '[]'::jsonb, true),
  (1377, 'Frog Position After T Seconds', 'Given an undirected tree consisting of `n` vertices numbered from `1` to `n`. A frog starts jumping from vertex 1. In one second, the frog jumps from its current vertex to another unvisited vertex if they are directly connected. The frog can not jump back to a visited vertex. In case the frog can jump to several vertices, it jumps randomly to one of them with the same probability. Otherwise, when the frog can not jump to any unvisited vertex, it jumps forever on the same vertex.

The edges of the undirected tree are given in the array `edges`, where `edges[i] = [ai, bi]` means that exists an edge connecting the vertices `ai` and `bi`.

Return the probability that after `t` seconds the frog is on the vertex `target`.


Example 1:
Input: n = 7, edges = [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], t = 2, target = 4
Output: 0.16666666666666666 
Explanation: The figure above shows the given graph. The frog starts at vertex 1, jumping with 1/3 probability to the vertex 2 after second 1 and then jumping with 1/2 probability to vertex 4 after second 2. Thus the probability for the frog is on the vertex 4 after 2 seconds is 1/3 * 1/2 = 1/6 = 0.16666666666666666. 

Example 2:
Input: n = 7, edges = [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], t = 1, target = 7
Output: 0.3333333333333333
Explanation: The figure above shows the given graph. The frog starts at vertex 1, jumping with 1/3 = 0.3333333333333333 probability to the vertex 7 after second 1. 

Example 3:
Input: n = 7, edges = [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]], t = 20, target = 6
Output: 0.16666666666666666

Constraints:
`1 <= n <= 100`
`edges.length == n - 1`
`edges[i].length == 2`
`1 <= ai, bi <= n`
`1 <= t <= 50`
`1 <= target <= n`
Answers within `10-5` of the actual value will be accepted as correct.', false, 'Hard', NULL, 35.4, 
   3, 'https://leetcode.com/problems/frog-position-after-t-seconds', 197, 12.6, 35.7, '["Google"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   188, 69, 73, true, '[]'::jsonb, true),
  (1378, 'Replace Employee ID With The Unique Identifier', 'SQL Schema', true, 'Easy', NULL, 90.3, 
   1, 'https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier', 86, 17.4, 19.3, '["Point72"]'::jsonb, '[]'::jsonb, 
   38, 20, 66, false, '[]'::jsonb, true),
  (1379, 'Find a Corresponding Node of a Binary Tree in a Clone of That Tree', 'Given two binary trees `original` and `cloned` and given a reference to a node `target` in the original tree.

The `cloned` tree is a copy of the `original` tree.

Return a reference to the same node in the `cloned` tree.

Note that you are not allowed to change any of the two trees or the `target` node and the answer must be a reference to a node in the `cloned` tree.

Follow up: Solve the problem if repeated values on the tree are allowed.


Example 1:
Input: tree = [7,4,3,null,null,6,19], target = 3
Output: 3
Explanation: In all examples the original and cloned trees are shown. The target node is a green node from the original tree. The answer is the yellow node from the cloned tree.


Example 2:
Input: tree = [7], target =  7
Output: 7

Example 3:
Input: tree = [8,null,6,null,5,null,4,null,3,null,2,null,1], target = 4
Output: 4

Example 4:
Input: tree = [1,2,3,4,5,6,7,8,9,10], target = 5
Output: 5

Example 5:
Input: tree = [1,2,null,3], target = 2
Output: 2

Constraints:
The number of nodes in the `tree` is in the range `[1, 10^4]`.

The values of the nodes of the `tree` are unique.

`target` node is a node from the `original` tree and is not `null`.', false, 'Medium', '/articles/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree', 84.7, 
   17.2, 'https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree', 610, 72.7, 86, '["Facebook"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search,Recursion"]'::jsonb, 
   445, 601, 43, true, '[]'::jsonb, true),
  (1380, 'Lucky Numbers in a Matrix', 'Given a `m * n` matrix of distinct numbers, return all lucky numbers in the matrix in any order.

A lucky number is an element of the matrix such that it is the minimum element in its row and maximum in its column.


Example 1:
Input: matrix = [[3,7,8],[9,11,13],[15,16,17]]
Output: [15]
Explanation: 15 is the only lucky number since it is the minimum in its row and the maximum in its column

Example 2:
Input: matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]
Output: [12]
Explanation: 12 is the only lucky number since it is the minimum in its row and the maximum in its column.


Example 3:
Input: matrix = [[7,8],[1,2]]
Output: [7]

Constraints:
`m == mat.length`
`n == mat[i].length`
`1 <= n, m <= 50`
`1 <= matrix[i][j] <= 10^5`.

All elements in the matrix are distinct.', false, 'Easy', NULL, 70.4, 
   1.7, 'https://leetcode.com/problems/lucky-numbers-in-a-matrix', 576, 42.3, 60, '["Oracle"]'::jsonb, '["Array"]'::jsonb, 
   470, 44, 91, false, '[]'::jsonb, true),
  (1381, 'Design a Stack With Increment Operation', 'Design a stack which supports the following operations.

Implement the `CustomStack` class:
`CustomStack(int maxSize)` Initializes the object with `maxSize` which is the maximum number of elements in the stack or do nothing if the stack reached the `maxSize`.

`void push(int x)` Adds `x` to the top of the stack if the stack hasn''t reached the `maxSize`.

`int pop()` Pops and returns the top of stack or -1 if the stack is empty.

`void inc(int k, int val)` Increments the bottom `k` elements of the stack by `val`. If there are less than `k` elements in the stack, just increment all the elements in the stack.


Example 1:
Input
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
Output
[null,null,null,2,null,null,null,null,null,103,202,201,-1]
Explanation
CustomStack customStack = new CustomStack(3); // Stack is Empty []
customStack.push(1);                          // stack becomes [1]
customStack.push(2);                          // stack becomes [1, 2]
customStack.pop();                            // return 2 --> Return top of the stack 2, stack becomes [1]
customStack.push(2);                          // stack becomes [1, 2]
customStack.push(3);                          // stack becomes [1, 2, 3]
customStack.push(4);                          // stack still [1, 2, 3], Don''t add another elements as size is 4
customStack.increment(5, 100);                // stack becomes [101, 102, 103]
customStack.increment(2, 100);                // stack becomes [201, 202, 103]
customStack.pop();                            // return 103 --> Return top of the stack 103, stack becomes [201, 202]
customStack.pop();                            // return 202 --> Return top of the stack 102, stack becomes [201]
customStack.pop();                            // return 201 --> Return top of the stack 101, stack becomes []
customStack.pop();                            // return -1 --> Stack is empty return -1.


Constraints:
`1 <= maxSize <= 1000`
`1 <= x <= 1000`
`1 <= k <= 1000`
`0 <= val <= 100`
At most `1000` calls will be made to each method of `increment`, `push` and `pop` each separately.', false, 'Medium', NULL, 76.3, 
   30, 'https://leetcode.com/problems/design-a-stack-with-increment-operation', 346, 38.6, 50.5, '["Amazon"]'::jsonb, '["Stack,Design"]'::jsonb, 
   551, 48, 92, true, '[]'::jsonb, true),
  (1382, 'Balance a Binary Search Tree', 'Given a binary search tree, return a balanced binary search tree with the same node values.

A binary search tree is balanced if and only if the depth of the two subtrees of every node never differ by more than 1.

If there is more than one answer, return any of them.


Example 1:
Input: root = [1,null,2,null,3,null,4,null,null]
Output: [2,1,3,null,null,null,4]
Explanation: This is not the only correct answer, [3,1,4,null,2,null,null] is also correct.


Constraints:
The number of nodes in the tree is between `1` and `10^4`.

The tree nodes will have distinct values between `1` and `10^5`.', false, 'Medium', NULL, 76, 
   32.8, 'https://leetcode.com/problems/balance-a-binary-search-tree', 273, 33.5, 44, '["Facebook,Adobe"]'::jsonb, '["Binary Search Tree"]'::jsonb, 
   626, 30, 95, true, '[]'::jsonb, true),
  (1383, 'Maximum Performance of a Team', 'There are `n` engineers numbered from 1 to `n` and two arrays: `speed` and `efficiency`, where `speed[i]` and `efficiency[i]` represent the speed and efficiency for the i-th engineer respectively. Return the maximum performance of a team composed of at most `k` engineers, since the answer can be a huge number, return this modulo 10^9 + 7.

The performance of a team is the sum of their engineers'' speeds multiplied by the minimum efficiency among their engineers. 

Example 1:
Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 2
Output: 60
Explanation: 
We have the maximum performance of the team by selecting engineer 2 (with speed=10 and efficiency=4) and engineer 5 (with speed=5 and efficiency=7). That is, performance = (10 + 5) * min(4, 7) = 60.


Example 2:
Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 3
Output: 68
Explanation:
This is the same example as the first but k = 3. We can select engineer 1, engineer 2 and engineer 5 to get the maximum performance of the team. That is, performance = (2 + 10 + 5) * min(5, 4, 7) = 68.


Example 3:
Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 4
Output: 72

Constraints:
`1 <= n <= 10^5`
`speed.length == n`
`efficiency.length == n`
`1 <= speed[i] <= 10^5`
`1 <= efficiency[i] <= 10^8`
`1 <= k <= n`', false, 'Hard', NULL, 36, 
   57.2, 'https://leetcode.com/problems/maximum-performance-of-a-team', 94, 13.4, 37.3, '["DoorDash,Amazon"]'::jsonb, '["Greedy,Sort"]'::jsonb, 
   407, 28, 94, true, '[]'::jsonb, true),
  (1384, 'Total Sales Amount by Year', 'SQL Schema', true, 'Hard', NULL, 65, 
   0, 'https://leetcode.com/problems/total-sales-amount-by-year', 124, 5, 7.7, '[]'::jsonb, '[]'::jsonb, 
   85, 33, 72, false, '[]'::jsonb, true),
  (1385, 'Find the Distance Value Between Two Arrays', 'Given two integer arrays `arr1` and `arr2`, and the integer `d`, return the distance value between the two arrays.

The distance value is defined as the number of elements `arr1[i]` such that there is not any element `arr2[j]` where `|arr1[i]-arr2[j]| <= d`.


Example 1:
Input: arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2
Output: 2
Explanation: 
For arr1[0]=4 we have: 
|4-10|=6 > d=2 
|4-9|=5 > d=2 
|4-1|=3 > d=2 
|4-8|=4 > d=2 
For arr1[1]=5 we have: 
|5-10|=5 > d=2 
|5-9|=4 > d=2 
|5-1|=4 > d=2 
|5-8|=3 > d=2
For arr1[2]=8 we have:
|8-10|=2 <= d=2
|8-9|=1 <= d=2
|8-1|=7 > d=2
|8-8|=0 <= d=2

Example 2:
Input: arr1 = [1,4,2,3], arr2 = [-4,-3,6,10,20,30], d = 3
Output: 2

Example 3:
Input: arr1 = [2,1,100,3], arr2 = [-5,-2,10,-3,7], d = 6
Output: 1

Constraints:
`1 <= arr1.length, arr2.length <= 500`
`-10^3 <= arr1[i], arr2[j] <= 10^3`
`0 <= d <= 100`', false, 'Easy', NULL, 66.4, 
   0, 'https://leetcode.com/problems/find-the-distance-value-between-two-arrays', 312, 25.9, 39, '["Uber"]'::jsonb, '[]'::jsonb, 
   170, 694, 20, false, '[]'::jsonb, true),
  (1386, 'Cinema Seat Allocation', 'A cinema has `n` rows of seats, numbered from 1 to `n` and there are ten seats in each row, labelled from 1 to 10 as shown in the figure above.

Given the array `reservedSeats` containing the numbers of seats already reserved, for example, `reservedSeats[i] = [3,8]` means the seat located in row 3 and labelled with 8 is already reserved.

Return the maximum number of four-person groups you can assign on the cinema seats. A four-person group occupies four adjacent seats in one single row. Seats across an aisle (such as [3,3] and [3,4]) are not considered to be adjacent, but there is an exceptional case on which an aisle split a four-person group, in that case, the aisle split a four-person group in the middle, which means to have two people on each side.


Example 1:
Input: n = 3, reservedSeats = [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]]
Output: 4
Explanation: The figure above shows the optimal allocation for four groups, where seats mark with blue are already reserved and contiguous seats mark with orange are for one group.


Example 2:
Input: n = 2, reservedSeats = [[2,1],[1,8],[2,6]]
Output: 2

Example 3:
Input: n = 4, reservedSeats = [[4,3],[1,4],[4,6],[1,7]]
Output: 4

Constraints:
`1 <= n <= 10^9`
`1 <= reservedSeats.length <= min(10*n, 10^4)`
`reservedSeats[i].length == 2`
`1 <= reservedSeats[i][0] <= n`
`1 <= reservedSeats[i][1] <= 10`
All `reservedSeats[i]` are distinct.', false, 'Medium', NULL, 36, 
   34.8, 'https://leetcode.com/problems/cinema-seat-allocation', 189, 11.9, 33.2, '["Amazon"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   233, 159, 59, true, '[]'::jsonb, true),
  (1387, 'Sort Integers by The Power Value', 'The power of an integer `x` is defined as the number of steps needed to transform `x` into `1` using the following steps:
if `x` is even then `x = x / 2`
if `x` is odd then `x = 3 * x + 1`
For example, the power of x = 3 is 7 because 3 needs 7 steps to become 1 (3 --> 10 --> 5 --> 16 --> 8 --> 4 --> 2 --> 1).

Given three integers `lo`, `hi` and `k`. The task is to sort all integers in the interval `[lo, hi]` by the power value in ascending order, if two or more integers have the same power value sort them by ascending order.

Return the `k-th` integer in the range `[lo, hi]` sorted by the power value.

Notice that for any integer `x` `(lo <= x <= hi)` it is guaranteed that `x` will transform into `1` using these steps and that the power of `x` is will fit in 32 bit signed integer.


Example 1:
Input: lo = 12, hi = 15, k = 2
Output: 13
Explanation: The power of 12 is 9 (12 --> 6 --> 3 --> 10 --> 5 --> 16 --> 8 --> 4 --> 2 --> 1)
The power of 13 is 9
The power of 14 is 17
The power of 15 is 17
The interval sorted by the power value [12,13,14,15]. For k = 2 answer is the second element which is 13.

Notice that 12 and 13 have the same power value and we sorted them in ascending order. Same for 14 and 15.


Example 2:
Input: lo = 1, hi = 1, k = 1
Output: 1

Example 3:
Input: lo = 7, hi = 11, k = 4
Output: 7
Explanation: The power array corresponding to the interval [7, 8, 9, 10, 11] is [16, 3, 19, 6, 14].

The interval sorted by power is [8, 10, 11, 7, 9].

The fourth number in the sorted array is 7.


Example 4:
Input: lo = 10, hi = 20, k = 5
Output: 13

Example 5:
Input: lo = 1, hi = 1000, k = 777
Output: 570

Constraints:
`1 <= lo <= hi <= 1000`
`1 <= k <= hi - lo + 1`', false, 'Medium', NULL, 70.6, 
   2.2, 'https://leetcode.com/problems/sort-integers-by-the-power-value', 437, 30.4, 43.1, '["Google"]'::jsonb, '["Sort,Graph"]'::jsonb, 
   398, 56, 88, true, '[]'::jsonb, true),
  (1388, 'Pizza With 3n Slices', 'There is a pizza with 3n slices of varying size, you and your friends will take slices of pizza as follows:
You will pick any pizza slice.

Your friend Alice will pick next slice in anti clockwise direction of your pick. 
Your friend Bob will pick next slice in clockwise direction of your pick.

Repeat until there are no more slices of pizzas.

Sizes of Pizza slices is represented by circular array `slices` in clockwise direction.

Return the maximum possible sum of slice sizes which you can have.


Example 1:
Input: slices = [1,2,3,4,5,6]
Output: 10
Explanation: Pick pizza slice of size 4, Alice and Bob will pick slices with size 3 and 5 respectively. Then Pick slices with size 6, finally Alice and Bob will pick slice of size 2 and 1 respectively. Total = 4 + 6.


Example 2:
Input: slices = [8,9,8,6,1,1]
Output: 16
Output: Pick pizza slice of size 8 in each turn. If you pick slice with size 9 your partners will pick slices of size 8.

Example 3:
Input: slices = [4,1,2,5,8,3,1,9,7]
Output: 21

Example 4:
Input: slices = [3,1,2]
Output: 3

Constraints:
`1 <= slices.length <= 500`
`slices.length % 3 == 0`
`1 <= slices[i] <= 1000`', false, 'Hard', NULL, 46.2, 
   0, 'https://leetcode.com/problems/pizza-with-3n-slices', 63, 5.6, 12, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   343, 5, 99, true, '[]'::jsonb, true),
  (1389, 'Create Target Array in the Given Order', 'Given two arrays of integers `nums` and `index`. Your task is to create target array under the following rules:
Initially target array is empty.

From left to right read nums[i] and index[i], insert at index `index[i]` the value `nums[i]` in target array.

Repeat the previous step until there are no elements to read in `nums` and `index.`
Return the target array.

It is guaranteed that the insertion operations will be valid.


Example 1:
Input: nums = [0,1,2,3,4], index = [0,1,2,2,1]
Output: [0,4,1,3,2]
Explanation:
nums       index     target
0            0        [0]
1            1        [0,1]
2            2        [0,1,2]
3            2        [0,1,3,2]
4            1        [0,4,1,3,2]

Example 2:
Input: nums = [1,2,3,4,0], index = [0,1,2,3,0]
Output: [0,1,2,3,4]
Explanation:
nums       index     target
1            0        [1]
2            1        [1,2]
3            2        [1,2,3]
4            3        [1,2,3,4]
0            0        [0,1,2,3,4]

Example 3:
Input: nums = [1], index = [0]
Output: [1]

Constraints:
`1 <= nums.length, index.length <= 100`
`nums.length == index.length`
`0 <= nums[i] <= 100`
`0 <= index[i] <= i`', false, 'Easy', NULL, 84.9, 
   19, 'https://leetcode.com/problems/create-target-array-in-the-given-order', 906, 90.2, 106.3, '["Visa"]'::jsonb, '["Array"]'::jsonb, 
   473, 655, 42, false, '[]'::jsonb, true),
  (1390, 'Four Divisors', 'Given an integer array `nums`, return the sum of divisors of the integers in that array that have exactly four divisors.

If there is no such integer in the array, return `0`.


Example 1:
Input: nums = [21,4,7]
Output: 32
Explanation:
21 has 4 divisors: 1, 3, 7, 21
4 has 3 divisors: 1, 2, 4
7 has 2 divisors: 1, 7
The answer is the sum of divisors of 21 only.


Constraints:
`1 <= nums.length <= 10^4`
`1 <= nums[i] <= 10^5`', false, 'Medium', NULL, 39.4, 
   2.9, 'https://leetcode.com/problems/four-divisors', 166, 14.9, 37.7, '["Capital One"]'::jsonb, '["Math"]'::jsonb, 
   99, 115, 46, false, '[]'::jsonb, true),
  (1391, 'Check if There is a Valid Path in a Grid', 'Given a m x n `grid`. Each cell of the `grid` represents a street. The street of `grid[i][j]` can be:
1 which means a street connecting the left cell and the right cell.

2 which means a street connecting the upper cell and the lower cell.

3 which means a street connecting the left cell and the lower cell.

4 which means a street connecting the right cell and the lower cell.

5 which means a street connecting the left cell and the upper cell.

6 which means a street connecting the right cell and the upper cell.

You will initially start at the street of the upper-left cell `(0,0)`. A valid path in the grid is a path which starts from the upper left cell `(0,0)` and ends at the bottom-right cell `(m - 1, n - 1)`. The path should only follow the streets.

Notice that you are not allowed to change any street.

Return true if there is a valid path in the grid or false otherwise.


Example 1:
Input: grid = [[2,4,3],[6,5,2]]
Output: true
Explanation: As shown you can start at cell (0, 0) and visit all the cells of the grid to reach (m - 1, n - 1).


Example 2:
Input: grid = [[1,2,1],[1,2,1]]
Output: false
Explanation: As shown you the street at cell (0, 0) is not connected with any street of any other cell and you will get stuck at cell (0, 0)

Example 3:
Input: grid = [[1,1,2]]
Output: false
Explanation: You will get stuck at cell (0, 1) and you cannot reach cell (0, 2).


Example 4:
Input: grid = [[1,1,1,1,1,1,3]]
Output: true

Example 5:
Input: grid = [[2],[2],[2],[2],[2],[2],[6]]
Output: true

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 300`
`1 <= grid[i][j] <= 6`', false, 'Medium', NULL, 44.9, 
   2.6, 'https://leetcode.com/problems/check-if-there-is-a-valid-path-in-a-grid', 261, 14.3, 31.9, '["Robinhood"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   318, 174, 65, false, '[]'::jsonb, true),
  (1392, 'Longest Happy Prefix', 'A string is called a happy prefix if is a non-empty prefix which is also a suffix (excluding itself).

Given a string `s`. Return the longest happy prefix of `s` .

Return an empty string if no such prefix exists.


Example 1:
Input: s = "level"
Output: "l"
Explanation: s contains 4 prefix excluding itself ("l", "le", "lev", "leve"), and suffix ("l", "el", "vel", "evel"). The largest prefix which is also suffix is given by "l".


Example 2:
Input: s = "ababab"
Output: "abab"
Explanation: "abab" is the largest prefix which is also suffix. They can overlap in the original string.


Example 3:
Input: s = "leetcodeleet"
Output: "leet"

Example 4:
Input: s = "a"
Output: ""

Constraints:
`1 <= s.length <= 10^5`
`s` contains only lowercase English letters.', false, 'Hard', NULL, 42, 
   2.9, 'https://leetcode.com/problems/longest-happy-prefix', 157, 12.5, 29.8, '["Google"]'::jsonb, '["String"]'::jsonb, 
   330, 19, 95, true, '[]'::jsonb, true),
  (1393, 'Capital Gain/Loss', 'SQL Schema', true, 'Medium', NULL, 91, 
   2.6, 'https://leetcode.com/problems/capital-gainloss', 212, 13.2, 14.5, '["Robinhood"]'::jsonb, '[]'::jsonb, 
   84, 12, 88, false, '[]'::jsonb, true),
  (1394, 'Find Lucky Integer in an Array', 'Given an array of integers `arr`, a lucky integer is an integer which has a frequency in the array equal to its value.

Return a lucky integer in the array. If there are multiple lucky integers return the largest of them. If there is no lucky integer return -1.


Example 1:
Input: arr = [2,2,3,4]
Output: 2
Explanation: The only lucky number in the array is 2 because frequency[2] == 2.


Example 2:
Input: arr = [1,2,2,3,3,3]
Output: 3
Explanation: 1, 2 and 3 are all lucky numbers, return the largest of them.


Example 3:
Input: arr = [2,2,2,3,3]
Output: -1
Explanation: There are no lucky numbers in the array.


Example 4:
Input: arr = [5]
Output: -1

Example 5:
Input: arr = [7,7,7,7,7,7,7]
Output: 7

Constraints:
`1 <= arr.length <= 500`
`1 <= arr[i] <= 500`', false, 'Easy', '/articles/find-lucky-integer-in-an-array', 63.1, 
   0, 'https://leetcode.com/problems/find-lucky-integer-in-an-array', 607, 48.7, 77.2, '["Microsoft"]'::jsonb, '["Array"]'::jsonb, 
   363, 11, 97, false, '[]'::jsonb, true),
  (1395, 'Count Number of Teams', 'There are `n` soldiers standing in a line. Each soldier is assigned a unique `rating` value.

You have to form a team of 3 soldiers amongst them under the following rules:
Choose 3 soldiers with index (`i`, `j`, `k`) with rating (`rating[i]`, `rating[j]`, `rating[k]`).

A team is valid if: (`rating[i] < rating[j] < rating[k]`) or (`rating[i] > rating[j] > rating[k]`) where (`0 <= i < j < k < n`).

Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).


Example 1:
Input: rating = [2,5,3,4,1]
Output: 3
Explanation: We can form three teams given the conditions. (2,3,4), (5,4,1), (5,3,1). 

Example 2:
Input: rating = [2,1,3]
Output: 0
Explanation: We can''t form any team given the conditions.


Example 3:
Input: rating = [1,2,3,4]
Output: 4

Constraints:
`n == rating.length`
`3 <= n <= 1000`
`1 <= rating[i] <= 105`
All the integers in `rating` are unique.', false, 'Medium', NULL, 75.3, 
   40.3, 'https://leetcode.com/problems/count-number-of-teams', 438, 54.3, 72, '["Goldman Sachs,Amazon,Citadel"]'::jsonb, '["Array"]'::jsonb, 
   897, 120, 88, true, '[]'::jsonb, true),
  (1396, 'Design Underground System', 'An underground railway system is keeping track of customer travel times between different stations. They are using this data to calculate the average time it takes to travel from one station to another.

Implement the `UndergroundSystem` class:
`void checkIn(int id, string stationName, int t)`
	
A customer with a card ID equal to `id`, checks in at the station `stationName` at time `t`.

A customer can only be checked into one place at a time.

`void checkOut(int id, string stationName, int t)`
	
A customer with a card ID equal to `id`, checks out from the station `stationName` at time `t`.

`double getAverageTime(string startStation, string endStation)`
	
Returns the average time it takes to travel from `startStation` to `endStation`.

The average time is computed from all the previous traveling times from `startStation` to `endStation` that happened directly, meaning a check in at `startStation` followed by a check out from `endStation`.

The time it takes to travel from `startStation` to `endStation` may be different from the time it takes to travel from `endStation` to `startStation`.

There will be at least one customer that has traveled from `startStation` to `endStation` before `getAverageTime` is called.

You may assume all calls to the `checkIn` and `checkOut` methods are consistent. If a customer checks in at time `t1` then checks out at time `t2`, then `t1 < t2`. All events happen in chronological order.


Example 1:
Input
["UndergroundSystem","checkIn","checkIn","checkIn","checkOut","checkOut","checkOut","getAverageTime","getAverageTime","checkIn","getAverageTime","checkOut","getAverageTime"]
[[],[45,"Leyton",3],[32,"Paradise",8],[27,"Leyton",10],[45,"Waterloo",15],[27,"Waterloo",20],[32,"Cambridge",22],["Paradise","Cambridge"],["Leyton","Waterloo"],[10,"Leyton",24],["Leyton","Waterloo"],[10,"Waterloo",38],["Leyton","Waterloo"]]
Output
[null,null,null,null,null,null,null,14.00000,11.00000,null,11.00000,null,12.00000]
Explanation
UndergroundSystem undergroundSystem = new UndergroundSystem();
undergroundSystem.checkIn(45, "Leyton", 3);
undergroundSystem.checkIn(32, "Paradise", 8);
undergroundSystem.checkIn(27, "Leyton", 10);
undergroundSystem.checkOut(45, "Waterloo", 15);  // Customer 45 "Leyton" -> "Waterloo" in 15-3 = 12
undergroundSystem.checkOut(27, "Waterloo", 20);  // Customer 27 "Leyton" -> "Waterloo" in 20-10 = 10
undergroundSystem.checkOut(32, "Cambridge", 22); // Customer 32 "Paradise" -> "Cambridge" in 22-8 = 14
undergroundSystem.getAverageTime("Paradise", "Cambridge"); // return 14.00000. One trip "Paradise" -> "Cambridge", (14) / 1 = 14
undergroundSystem.getAverageTime("Leyton", "Waterloo");    // return 11.00000. Two trips "Leyton" -> "Waterloo", (10 + 12) / 2 = 11
undergroundSystem.checkIn(10, "Leyton", 24);
undergroundSystem.getAverageTime("Leyton", "Waterloo");    // return 11.00000
undergroundSystem.checkOut(10, "Waterloo", 38);  // Customer 10 "Leyton" -> "Waterloo" in 38-24 = 14
undergroundSystem.getAverageTime("Leyton", "Waterloo");    // return 12.00000. Three trips "Leyton" -> "Waterloo", (10 + 12 + 14) / 3 = 12

Example 2:
Input
["UndergroundSystem","checkIn","checkOut","getAverageTime","checkIn","checkOut","getAverageTime","checkIn","checkOut","getAverageTime"]
[[],[10,"Leyton",3],[10,"Paradise",8],["Leyton","Paradise"],[5,"Leyton",10],[5,"Paradise",16],["Leyton","Paradise"],[2,"Leyton",21],[2,"Paradise",30],["Leyton","Paradise"]]
Output
[null,null,null,5.00000,null,null,5.50000,null,null,6.66667]
Explanation
UndergroundSystem undergroundSystem = new UndergroundSystem();
undergroundSystem.checkIn(10, "Leyton", 3);
undergroundSystem.checkOut(10, "Paradise", 8); // Customer 10 "Leyton" -> "Paradise" in 8-3 = 5
undergroundSystem.getAverageTime("Leyton", "Paradise"); // return 5.00000, (5) / 1 = 5
undergroundSystem.checkIn(5, "Leyton", 10);
undergroundSystem.checkOut(5, "Paradise", 16); // Customer 5 "Leyton" -> "Paradise" in 16-10 = 6
undergroundSystem.getAverageTime("Leyton", "Paradise"); // return 5.50000, (5 + 6) / 2 = 5.5
undergroundSystem.checkIn(2, "Leyton", 21);
undergroundSystem.checkOut(2, "Paradise", 30); // Customer 2 "Leyton" -> "Paradise" in 30-21 = 9
undergroundSystem.getAverageTime("Leyton", "Paradise"); // return 6.66667, (5 + 6 + 9) / 3 = 6.66667

Constraints:
`1 <= id, t <= 106`
`1 <= stationName.length, startStation.length, endStation.length <= 10`
All strings consist of uppercase and lowercase English letters and digits.

There will be at most `2 * 104` calls in total to `checkIn`, `checkOut`, and `getAverageTime`.

Answers within `10-5` of the actual value will be accepted.', false, 'Medium', '/articles/design-underground-system', 71.9, 
   58.7, 'https://leetcode.com/problems/design-underground-system', 460, 59.6, 82.9, '["Bloomberg"]'::jsonb, '["Design"]'::jsonb, 
   713, 56, 93, false, '[]'::jsonb, true),
  (1397, 'Find All Good Strings', 'Given the strings `s1` and `s2` of size `n`, and the string `evil`. Return the number of good strings.

A good string has size `n`, it is alphabetically greater than or equal to `s1`, it is alphabetically smaller than or equal to `s2`, and it does not contain the string `evil` as a substring. Since the answer can be a huge number, return this modulo 10^9 + 7.


Example 1:
Input: n = 2, s1 = "aa", s2 = "da", evil = "b"
Output: 51 
Explanation: There are 25 good strings starting with ''a'': "aa","ac","ad",...,"az". Then there are 25 good strings starting with ''c'': "ca","cc","cd",...,"cz" and finally there is one good string starting with ''d'': "da". 

Example 2:
Input: n = 8, s1 = "leetcode", s2 = "leetgoes", evil = "leet"
Output: 0 
Explanation: All strings greater than or equal to s1 and smaller than or equal to s2 start with the prefix "leet", therefore, there is not any good string.


Example 3:
Input: n = 2, s1 = "gx", s2 = "gz", evil = "x"
Output: 2

Constraints:
`s1.length == n`
`s2.length == n`
`s1 <= s2`
`1 <= n <= 500`
`1 <= evil.length <= 50`
All strings consist of lowercase English letters.', false, 'Hard', NULL, 38.7, 
   0, 'https://leetcode.com/problems/find-all-good-strings', 67, 2.9, 7.4, '["Dunzo"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   179, 90, 67, false, '[]'::jsonb, true),
  (1398, 'Customers Who Bought Products A and B but Not C', 'SQL Schema', true, 'Medium', NULL, 82.2, 
   2.6, 'https://leetcode.com/problems/customers-who-bought-products-a-and-b-but-not-c', 266, 15, 18.3, '["Amazon"]'::jsonb, '[]'::jsonb, 
   85, 4, 96, true, '[]'::jsonb, true),
  (1399, 'Count Largest Group', 'Given an integer `n`. Each number from `1` to `n` is grouped according to the sum of its digits. 
Return how many groups have the largest size.


Example 1:
Input: n = 13
Output: 4
Explanation: There are 9 groups in total, they are grouped according sum of its digits of numbers from 1 to 13:
[1,10], [2,11], [3,12], [4,13], [5], [6], [7], [8], [9]. There are 4 groups with largest size.


Example 2:
Input: n = 2
Output: 2
Explanation: There are 2 groups [1], [2] of size 1.


Example 3:
Input: n = 15
Output: 6

Example 4:
Input: n = 24
Output: 5

Constraints:
`1 <= n <= 10^4`', false, 'Easy', NULL, 65.3, 
   7.4, 'https://leetcode.com/problems/count-largest-group', 314, 22.2, 34.1, '["Mercari"]'::jsonb, '["Array"]'::jsonb, 
   172, 461, 27, false, '[]'::jsonb, true),
  (1400, 'Construct K Palindrome Strings', 'Given a string `s` and an integer `k`. You should construct `k` non-empty palindrome strings using all the characters in `s`.

Return True if you can use all the characters in `s` to construct `k` palindrome strings or False otherwise.


Example 1:
Input: s = "annabelle", k = 2
Output: true
Explanation: You can construct two palindromes using all characters in s.

Some possible constructions "anna" + "elble", "anbna" + "elle", "anellena" + "b"

Example 2:
Input: s = "leetcode", k = 3
Output: false
Explanation: It is impossible to construct 3 palindromes using all the characters of s.


Example 3:
Input: s = "true", k = 4
Output: true
Explanation: The only possible solution is to put each character in a separate string.


Example 4:
Input: s = "yzyzyzyzyzyzyzy", k = 2
Output: true
Explanation: Simply you can put all z''s in one string and all y''s in the other string. Both strings will be palindrome.


Example 5:
Input: s = "cr", k = 7
Output: false
Explanation: We don''t have enough characters in s to construct 7 palindromes.


Constraints:
`1 <= s.length <= 10^5`
All characters in `s` are lower-case English letters.

`1 <= k <= 10^5`', false, 'Medium', NULL, 62.9, 
   19.6, 'https://leetcode.com/problems/construct-k-palindrome-strings', 203, 19.8, 31.4, '["Uber"]'::jsonb, '["Greedy"]'::jsonb, 
   333, 42, 89, false, '[]'::jsonb, true),
  (1401, 'Circle and Rectangle Overlapping', 'Given a circle represented as (`radius`, `x_center`, `y_center`) and an axis-aligned rectangle represented as (`x1`, `y1`, `x2`, `y2`), where (`x1`, `y1`) are the coordinates of the bottom-left corner, and (`x2`, `y2`) are the coordinates of the top-right corner of the rectangle.

Return True if the circle and rectangle are overlapped otherwise return False.

In other words, check if there are any point (xi, yi) such that belongs to the circle and the rectangle at the same time.


Example 1:
Input: radius = 1, x_center = 0, y_center = 0, x1 = 1, y1 = -1, x2 = 3, y2 = 1
Output: true
Explanation: Circle and rectangle share the point (1,0) 

Example 2:
Input: radius = 1, x_center = 0, y_center = 0, x1 = -1, y1 = 0, x2 = 0, y2 = 1
Output: true

Example 3:
Input: radius = 1, x_center = 1, y_center = 1, x1 = -3, y1 = -3, x2 = 3, y2 = 3
Output: true

Example 4:
Input: radius = 1, x_center = 1, y_center = 1, x1 = 1, y1 = -3, x2 = 2, y2 = -1
Output: false

Constraints:
`1 <= radius <= 2000`
`-10^4 <= x_center, y_center, x1, y1, x2, y2 <= 10^4`
`x1 < x2`
`y1 < y2`', false, 'Medium', NULL, 42.5, 
   5.7, 'https://leetcode.com/problems/circle-and-rectangle-overlapping', 124, 7.4, 17.4, '["Google"]'::jsonb, '["Geometry"]'::jsonb, 
   158, 46, 77, true, '[]'::jsonb, true),
  (1402, 'Reducing Dishes', 'A chef has collected data on the `satisfaction` level of his `n` dishes. Chef can cook any dish in 1 unit of time.

Like-time coefficient of a dish is defined as the time taken to cook that dish including previous dishes multiplied by its satisfaction level  i.e.  `time[i]`*`satisfaction[i]`
Return the maximum sum of Like-time coefficient that the chef can obtain after dishes preparation.

Dishes can be prepared in any order and the chef can discard some dishes to get this maximum value.


Example 1:
Input: satisfaction = [-1,-8,0,5,-9]
Output: 14
Explanation: After Removing the second and last dish, the maximum total Like-time coefficient will be equal to (-1*1 + 0*2 + 5*3 = 14). Each dish is prepared in one unit of time.


Example 2:
Input: satisfaction = [4,3,2]
Output: 20
Explanation: Dishes can be prepared in any order, (2*1 + 3*2 + 4*3 = 20)

Example 3:
Input: satisfaction = [-1,-4,-5]
Output: 0
Explanation: People don''t like the dishes. No dish is prepared.


Example 4:
Input: satisfaction = [-2,5,-1,0,3,-3]
Output: 35

Constraints:
`n == satisfaction.length`
`1 <= n <= 500`
`-10^3 <= satisfaction[i] <= 10^3`', false, 'Hard', NULL, 72.1, 
   28.3, 'https://leetcode.com/problems/reducing-dishes', 305, 20.7, 28.7, '["OT"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   414, 89, 82, false, '[]'::jsonb, true),
  (1403, 'Minimum Subsequence in Non-Increasing Order', 'Given the array `nums`, obtain a subsequence of the array whose sum of elements is strictly greater than the sum of the non included elements in such subsequence. 
If there are multiple solutions, return the subsequence with minimum size and if there still exist multiple solutions, return the subsequence with the maximum total sum of all its elements. A subsequence of an array can be obtained by erasing some (possibly zero) elements from the array. 
Note that the solution with the given constraints is guaranteed to be unique. Also return the answer sorted in non-increasing order.


Example 1:
Input: nums = [4,3,10,9,8]
Output: [10,9] 
Explanation: The subsequences [10,9] and [10,8] are minimal such that the sum of their elements is strictly greater than the sum of elements not included, however, the subsequence [10,9] has the maximum total sum of its elements. 

Example 2:
Input: nums = [4,4,7,6,7]
Output: [7,7,6] 
Explanation: The subsequence [7,7] has the sum of its elements equal to 14 which is not strictly greater than the sum of elements not included (14 = 4 + 4 + 6). Therefore, the subsequence [7,6,7] is the minimal satisfying the conditions. Note the subsequence has to returned in non-decreasing order.  

Example 3:
Input: nums = [6]
Output: [6]

Constraints:
`1 <= nums.length <= 500`
`1 <= nums[i] <= 100`', false, 'Easy', NULL, 71.9, 
   6.2, 'https://leetcode.com/problems/minimum-subsequence-in-non-increasing-order', 452, 36.4, 50.6, '["Mercari"]'::jsonb, '["Greedy,Sort"]'::jsonb, 
   208, 272, 43, false, '[]'::jsonb, true),
  (1404, 'Number of Steps to Reduce a Number in Binary Representation to One', 'Given a number `s` in their binary representation. Return the number of steps to reduce it to 1 under the following rules:
If the current number is even, you have to divide it by 2.

If the current number is odd, you have to add 1 to it.

It''s guaranteed that you can always reach to one for all testcases.


Example 1:
Input: s = "1101"
Output: 6
Explanation: "1101" corressponds to number 13 in their decimal representation.

Step 1) 13 is odd, add 1 and obtain 14. 
Step 2) 14 is even, divide by 2 and obtain 7.

Step 3) 7 is odd, add 1 and obtain 8.

Step 4) 8 is even, divide by 2 and obtain 4.  
Step 5) 4 is even, divide by 2 and obtain 2. 
Step 6) 2 is even, divide by 2 and obtain 1.  

Example 2:
Input: s = "10"
Output: 1
Explanation: "10" corressponds to number 2 in their decimal representation.

Step 1) 2 is even, divide by 2 and obtain 1.  

Example 3:
Input: s = "1"
Output: 0

Constraints:
`1 <= s.length <= 500`
`s` consists of characters ''0'' or ''1''
`s[0] == ''1''`', false, 'Medium', NULL, 50, 
   5.2, 'https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one', 261, 17.6, 35.1, '["TripAdvisor"]'::jsonb, '["String,Bit Manipulation"]'::jsonb, 
   292, 26, 92, false, '[]'::jsonb, true),
  (1405, 'Longest Happy String', 'A string is called happy if it does not have any of the strings `''aaa''`, `''bbb''` or `''ccc''` as a substring.

Given three integers `a`, `b` and `c`, return any string `s`, which satisfies following conditions:
`s` is happy and longest possible.

`s` contains at most `a` occurrences of the letter `''a''`, at most `b` occurrences of the letter `''b''` and at most `c` occurrences of the letter `''c''`.

`s `will only contain `''a''`, `''b''` and `''c''` letters.

If there is no such string `s` return the empty string `""`.


Example 1:
Input: a = 1, b = 1, c = 7
Output: "ccaccbcc"
Explanation: "ccbccacc" would also be a correct answer.


Example 2:
Input: a = 2, b = 2, c = 1
Output: "aabbc"

Example 3:
Input: a = 7, b = 1, c = 0
Output: "aabaa"
Explanation: It''s the only correct answer in this case.


Constraints:
`0 <= a, b, c <= 100`
`a + b + c > 0`', false, 'Medium', NULL, 52.6, 
   34, 'https://leetcode.com/problems/longest-happy-string', 297, 17.7, 33.7, '["Grab,Amazon,Adobe"]'::jsonb, '["Dynamic Programming,Greedy"]'::jsonb, 
   522, 100, 84, true, '[]'::jsonb, true),
  (1406, 'Stone Game III', 'Alice and Bob continue their games with piles of stones. There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array `stoneValue`.

Alice and Bob take turns, with Alice starting first. On each player''s turn, that player can take 1, 2 or 3 stones from the first remaining stones in the row.

The score of each player is the sum of values of the stones taken. The score of each player is 0 initially.

The objective of the game is to end with the highest score, and the winner is the player with the highest score and there could be a tie. The game continues until all the stones have been taken.

Assume Alice and Bob play optimally.

Return "Alice" if Alice will win, "Bob" if Bob will win or "Tie" if they end the game with the same score.


Example 1:
Input: values = [1,2,3,7]
Output: "Bob"
Explanation: Alice will always lose. Her best move will be to take three piles and the score become 6. Now the score of Bob is 7 and Bob wins.


Example 2:
Input: values = [1,2,3,-9]
Output: "Alice"
Explanation: Alice must choose all the three piles at the first move to win and leave Bob with negative score.

If Alice chooses one pile her score will be 1 and the next move Bob''s score becomes 5. The next move Alice will take the pile with value = -9 and lose.

If Alice chooses two piles her score will be 3 and the next move Bob''s score becomes 3. The next move Alice will take the pile with value = -9 and also lose.

Remember that both play optimally so here Alice will choose the scenario that makes her win.


Example 3:
Input: values = [1,2,3,6]
Output: "Tie"
Explanation: Alice cannot win this game. She can end the game in a draw if she decided to choose all the first three piles, otherwise she will lose.


Example 4:
Input: values = [1,2,3,-1,-2,-3,7]
Output: "Alice"

Example 5:
Input: values = [-1,-2,-3]
Output: "Tie"

Constraints:
`1 <= values.length <= 50000`
`-1000 <= values[i] <= 1000`', false, 'Hard', NULL, 57.8, 
   11.5, 'https://leetcode.com/problems/stone-game-iii', 183, 17.7, 30.5, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   521, 9, 98, true, '[]'::jsonb, true),
  (1407, 'Top Travellers', 'SQL Schema', true, 'Easy', NULL, 84, 
   0, 'https://leetcode.com/problems/top-travellers', 124, 13.9, 16.6, '["Point72"]'::jsonb, '[]'::jsonb, 
   53, 5, 91, false, '[]'::jsonb, true),
  (1408, 'String Matching in an Array', 'Given an array of string `words`. Return all strings in `words` which is substring of another word in any order. 
String `words[i]` is substring of `words[j]`, if can be obtained removing some characters to left and/or right side of `words[j]`.


Example 1:
Input: words = ["mass","as","hero","superhero"]
Output: ["as","hero"]
Explanation: "as" is substring of "mass" and "hero" is substring of "superhero".

["hero","as"] is also a valid answer.


Example 2:
Input: words = ["leetcode","et","code"]
Output: ["et","code"]
Explanation: "et", "code" are substring of "leetcode".


Example 3:
Input: words = ["blue","green","bu"]
Output: []

Constraints:
`1 <= words.length <= 100`
`1 <= words[i].length <= 30`
`words[i]` contains only lowercase English letters.

It''s guaranteed that `words[i]` will be unique.', false, 'Easy', NULL, 63.7, 
   6.3, 'https://leetcode.com/problems/string-matching-in-an-array', 403, 39.3, 61.7, '["Amazon"]'::jsonb, '["String"]'::jsonb, 
   308, 58, 84, true, '[]'::jsonb, true),
  (1409, 'Queries on a Permutation With Key', 'Given the array `queries` of positive integers between `1` and `m`, you have to process all `queries[i]` (from `i=0` to `i=queries.length-1`) according to the following rules:
In the beginning, you have the permutation `P=[1,2,3,...,m]`.

For the current `i`, find the position of `queries[i]` in the permutation `P` (indexing from 0) and then move this at the beginning of the permutation `P.` Notice that the position of `queries[i]` in `P` is the result for `queries[i]`.

Return an array containing the result for the given `queries`.


Example 1:
Input: queries = [3,1,2,1], m = 5
Output: [2,1,2,1] 
Explanation: The queries are processed as follow: 
For i=0: queries[i]=3, P=[1,2,3,4,5], position of 3 in P is 2, then we move 3 to the beginning of P resulting in P=[3,1,2,4,5]. 
For i=1: queries[i]=1, P=[3,1,2,4,5], position of 1 in P is 1, then we move 1 to the beginning of P resulting in P=[1,3,2,4,5]. 
For i=2: queries[i]=2, P=[1,3,2,4,5], position of 2 in P is 2, then we move 2 to the beginning of P resulting in P=[2,1,3,4,5]. 
For i=3: queries[i]=1, P=[2,1,3,4,5], position of 1 in P is 1, then we move 1 to the beginning of P resulting in P=[1,2,3,4,5]. 
Therefore, the array containing the result is [2,1,2,1].  

Example 2:
Input: queries = [4,1,2,2], m = 4
Output: [3,1,2,0]

Example 3:
Input: queries = [7,5,5,8,3], m = 8
Output: [6,5,0,7,5]

Constraints:
`1 <= m <= 10^3`
`1 <= queries.length <= m`
`1 <= queries[i] <= m`', false, 'Medium', NULL, 81.8, 
   2.7, 'https://leetcode.com/problems/queries-on-a-permutation-with-key', 343, 27.1, 33.1, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   198, 381, 34, true, '[]'::jsonb, true),
  (1410, 'HTML Entity Parser', 'HTML entity parser is the parser that takes HTML code as input and replace all the entities of the special characters by the characters itself.

The special characters and their entities for HTML are:
Quotation Mark: the entity is `&quot;` and symbol character is `"`.

Single Quote Mark: the entity is `&apos;` and symbol character is `''`.

Ampersand: the entity is `&amp;` and symbol character is `&`.

Greater Than Sign: the entity is `&gt;` and symbol character is `>`.

Less Than Sign: the entity is `&lt;` and symbol character is `<`.

Slash: the entity is `&frasl;` and symbol character is `/`.

Given the input `text` string to the HTML parser, you have to implement the entity parser.

Return the text after replacing the entities by the special characters.


Example 1:
Input: text = "&amp; is an HTML entity but &ambassador; is not."
Output: "& is an HTML entity but &ambassador; is not."
Explanation: The parser will replace the &amp; entity by &

Example 2:
Input: text = "and I quote: &quot;...&quot;"
Output: "and I quote: \\"...\\""

Example 3:
Input: text = "Stay home! Practice on Leetcode :)"
Output: "Stay home! Practice on Leetcode :)"

Example 4:
Input: text = "x &gt; y &amp;&amp; x &lt; y is always false"
Output: "x > y && x < y is always false"

Example 5:
Input: text = "leetcode.com&frasl;problemset&frasl;all"
Output: "leetcode.com/problemset/all"

Constraints:
`1 <= text.length <= 10^5`
The string may contain any possible characters out of all the 256 ASCII characters.', false, 'Medium', NULL, 54.2, 
   0, 'https://leetcode.com/problems/html-entity-parser', 265, 15.6, 28.8, '["Oracle"]'::jsonb, '["String,Stack"]'::jsonb, 
   90, 206, 30, false, '[]'::jsonb, true),
  (1411, 'Number of Ways to Paint N × 3 Grid', 'You have a `grid` of size `n x 3` and you want to paint each cell of the grid with exactly one of the three colors: Red, Yellow, or Green while making sure that no two adjacent cells have the same color (i.e., no two cells that share vertical or horizontal sides have the same color).

Given `n` the number of rows of the grid, return the number of ways you can paint this `grid`. As the answer may grow large, the answer must be computed modulo `109 + 7`.


Example 1:
Input: n = 1
Output: 12
Explanation: There are 12 possible way to paint the grid as shown.


Example 2:
Input: n = 2
Output: 54

Example 3:
Input: n = 3
Output: 246

Example 4:
Input: n = 7
Output: 106494

Example 5:
Input: n = 5000
Output: 30228214

Constraints:
`n == grid.length`
`grid[i].length == 3`
`1 <= n <= 5000`', false, 'Hard', NULL, 60.5, 
   19.5, 'https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid', 194, 15.6, 25.8, '["Akuna Capital,Facebook,Paypal"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   438, 24, 95, true, '[]'::jsonb, true),
  (1412, 'Find the Quiet Students in All Exams', 'SQL Schema', true, 'Hard', NULL, 63.9, 
   15.6, 'https://leetcode.com/problems/find-the-quiet-students-in-all-exams', 242, 8.8, 13.8, '[]'::jsonb, '[]'::jsonb, 
   80, 7, 92, false, '[]'::jsonb, true),
  (1413, 'Minimum Value to Get Positive Step by Step Sum', 'Given an array of integers `nums`, you start with an initial positive value startValue.

In each iteration, you calculate the step by step sum of startValue plus elements in `nums` (from left to right).

Return the minimum positive value of startValue such that the step by step sum is never less than 1.


Example 1:
Input: nums = [-3,2,-3,4,2]
Output: 5
Explanation: If you choose startValue = 4, in the third iteration your step by step sum is less than 1.

                step by step sum
                startValue = 4 | startValue = 5 | nums
                  (4 -3 ) = 1  | (5 -3 ) = 2    |  -3
                  (1 +2 ) = 3  | (2 +2 ) = 4    |   2
                  (3 -3 ) = 0  | (4 -3 ) = 1    |  -3
                  (0 +4 ) = 4  | (1 +4 ) = 5    |   4
                  (4 +2 ) = 6  | (5 +2 ) = 7    |   2

Example 2:
Input: nums = [1,2]
Output: 1
Explanation: Minimum start value should be positive. 

Example 3:
Input: nums = [1,-2,-3]
Output: 5

Constraints:
`1 <= nums.length <= 100`
`-100 <= nums[i] <= 100`', false, 'Easy', NULL, 65.5, 
   30.3, 'https://leetcode.com/problems/minimum-value-to-get-positive-step-by-step-sum', 418, 28.1, 42.8, '["Swiggy"]'::jsonb, '["Array"]'::jsonb, 
   345, 98, 78, false, '[]'::jsonb, true),
  (1414, 'Find the Minimum Number of Fibonacci Numbers Whose Sum Is K', 'Given an integer `k`, return the minimum number of Fibonacci numbers whose sum is equal to `k`. The same Fibonacci number can be used multiple times.

The Fibonacci numbers are defined as:
`F1 = 1`
`F2 = 1`
`Fn = Fn-1 + Fn-2` for `n > 2.`
It is guaranteed that for the given constraints we can always find such Fibonacci numbers that sum up to `k`.


Example 1:
Input: k = 7
Output: 2 
Explanation: The Fibonacci numbers are: 1, 1, 2, 3, 5, 8, 13, ... 
For k = 7 we can use 2 + 5 = 7.


Example 2:
Input: k = 10
Output: 2 
Explanation: For k = 10 we can use 2 + 8 = 10.


Example 3:
Input: k = 19
Output: 3 
Explanation: For k = 19 we can use 1 + 5 + 13 = 19.


Constraints:
`1 <= k <= 10^9`', false, 'Medium', NULL, 63, 
   5.8, 'https://leetcode.com/problems/find-the-minimum-number-of-fibonacci-numbers-whose-sum-is-k', 248, 21, 33.3, '["Google"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   412, 40, 91, true, '[]'::jsonb, true),
  (1415, 'The k-th Lexicographical String of All Happy Strings of Length n', 'A happy string is a string that:
consists only of letters of the set `[''a'', ''b'', ''c'']`.

`s[i] != s[i + 1]` for all values of `i` from `1` to `s.length - 1` (string is 1-indexed).

For example, strings "abc", "ac", "b" and "abcbabcbcb" are all happy strings and strings "aa", "baa" and "ababbc" are not happy strings.

Given two integers `n` and `k`, consider a list of all happy strings of length `n` sorted in lexicographical order.

Return the kth string of this list or return an empty string if there are less than `k` happy strings of length `n`.


Example 1:
Input: n = 1, k = 3
Output: "c"
Explanation: The list ["a", "b", "c"] contains all happy strings of length 1. The third string is "c".


Example 2:
Input: n = 1, k = 4
Output: ""
Explanation: There are only 3 happy strings of length 1.


Example 3:
Input: n = 3, k = 9
Output: "cab"
Explanation: There are 12 different happy string of length 3 ["aba", "abc", "aca", "acb", "bab", "bac", "bca", "bcb", "cab", "cac", "cba", "cbc"]. You will find the 9th string = "cab"

Example 4:
Input: n = 2, k = 7
Output: ""

Example 5:
Input: n = 10, k = 100
Output: "abacbabacb"

Constraints:
`1 <= n <= 10`
`1 <= k <= 100`', false, 'Medium', NULL, 69.9, 
   1.8, 'https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n', 382, 17, 24.3, '["Microsoft"]'::jsonb, '["Backtracking"]'::jsonb, 
   383, 13, 97, false, '[]'::jsonb, true),
  (1416, 'Restore The Array', 'A program was supposed to print an array of integers. The program forgot to print whitespaces and the array is printed as a string of digits and all we know is that all integers in the array were in the range `[1, k]` and there are no leading zeros in the array.

Given the string `s` and the integer `k`. There can be multiple ways to restore the array.

Return the number of possible array that can be printed as a string `s` using the mentioned program.

The number of ways could be very large so return it modulo `10^9 + 7`

Example 1:
Input: s = "1000", k = 10000
Output: 1
Explanation: The only possible array is [1000]

Example 2:
Input: s = "1000", k = 10
Output: 0
Explanation: There cannot be an array that was printed this way and has all integer >= 1 and <= 10.


Example 3:
Input: s = "1317", k = 2000
Output: 8
Explanation: Possible arrays are [1317],[131,7],[13,17],[1,317],[13,1,7],[1,31,7],[1,3,17],[1,3,1,7]

Example 4:
Input: s = "2020", k = 30
Output: 1
Explanation: The only possible array is [20,20]. [2020] is invalid because 2020 > 30. [2,020] is ivalid because 020 contains leading zeros.


Example 5:
Input: s = "1234567890", k = 90
Output: 34

Constraints:
`1 <= s.length <= 10^5`.

`s` consists of only digits and doesn''t contain leading zeros.

`1 <= k <= 10^9`.', false, 'Hard', NULL, 36.8, 
   9.5, 'https://leetcode.com/problems/restore-the-array', 118, 8.6, 23.3, '["ByteDance"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   226, 8, 97, false, '[]'::jsonb, true),
  (1417, 'Reformat The String', 'Given alphanumeric string `s`. (Alphanumeric string is a string consisting of lowercase English letters and digits).

You have to find a permutation of the string where no letter is followed by another letter and no digit is followed by another digit. That is, no two adjacent characters have the same type.

Return the reformatted string or return an empty string if it is impossible to reformat the string.


Example 1:
Input: s = "a0b1c2"
Output: "0a1b2c"
Explanation: No two adjacent characters have the same type in "0a1b2c". "a0b1c2", "0a1b2c", "0c2a1b" are also valid permutations.


Example 2:
Input: s = "leetcode"
Output: ""
Explanation: "leetcode" has only characters so we cannot separate them by digits.


Example 3:
Input: s = "1229857369"
Output: ""
Explanation: "1229857369" has only digits so we cannot separate them by characters.


Example 4:
Input: s = "covid2019"
Output: "c2o0v1i9d"

Example 5:
Input: s = "ab123"
Output: "1a2b3"

Constraints:
`1 <= s.length <= 500`
`s` consists of only lowercase English letters and/or digits.', false, 'Easy', NULL, 56.6, 
   5.7, 'https://leetcode.com/problems/reformat-the-string', 434, 30.8, 54.4, '["Google"]'::jsonb, '["String"]'::jsonb, 
   246, 56, 81, true, '[]'::jsonb, true),
  (1418, 'Display Table of Food Orders in a Restaurant', 'Given the array `orders`, which represents the orders that customers have done in a restaurant. More specifically `orders[i]=[customerNamei,tableNumberi,foodItemi]` where `customerNamei` is the name of the customer, `tableNumberi` is the table customer sit at, and `foodItemi` is the item customer orders.

Return the restaurant''s “display table”. The “display table” is a table whose row entries denote how many of each food item each table ordered. The first column is the table number and the remaining columns correspond to each food item in alphabetical order. The first row should be a header whose first column is “Table”, followed by the names of the food items. Note that the customer names are not part of the table. Additionally, the rows should be sorted in numerically increasing order.


Example 1:
Input: orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]
Output: [["Table","Beef Burrito","Ceviche","Fried Chicken","Water"],["3","0","2","1","0"],["5","0","1","0","1"],["10","1","0","0","0"]] 
Explanation:
The displaying table looks like:
Table,Beef Burrito,Ceviche,Fried Chicken,Water
3    ,0           ,2      ,1            ,0
5    ,0           ,1      ,0            ,1
10   ,1           ,0      ,0            ,0
For the table 3: David orders "Ceviche" and "Fried Chicken", and Rous orders "Ceviche".

For the table 5: Carla orders "Water" and "Ceviche".

For the table 10: Corina orders "Beef Burrito". 

Example 2:
Input: orders = [["James","12","Fried Chicken"],["Ratesh","12","Fried Chicken"],["Amadeus","12","Fried Chicken"],["Adam","1","Canadian Waffles"],["Brianna","1","Canadian Waffles"]]
Output: [["Table","Canadian Waffles","Fried Chicken"],["1","2","0"],["12","0","3"]] 
Explanation: 
For the table 1: Adam and Brianna order "Canadian Waffles".

For the table 12: James, Ratesh and Amadeus order "Fried Chicken".


Example 3:
Input: orders = [["Laura","2","Bean Burrito"],["Jhon","2","Beef Burrito"],["Melissa","2","Soda"]]
Output: [["Table","Bean Burrito","Beef Burrito","Soda"],["2","1","1","1"]]

Constraints:
`1 <= orders.length <= 5 * 10^4`
`orders[i].length == 3`
`1 <= customerNamei.length, foodItemi.length <= 20`
`customerNamei` and `foodItemi` consist of lowercase and uppercase English letters and the space character.

`tableNumberi `is a valid integer between `1` and `500`.', false, 'Medium', NULL, 69.2, 
   15.4, 'https://leetcode.com/problems/display-table-of-food-orders-in-a-restaurant', 234, 13.9, 20.1, '["JP Morgan,JPMorgan"]'::jsonb, '["Hash Table"]'::jsonb, 
   118, 231, 34, false, '[]'::jsonb, true),
  (1419, 'Minimum Number of Frogs Croaking', 'Given the string `croakOfFrogs`, which represents a combination of the string "croak" from different frogs, that is, multiple frogs can croak at the same time, so multiple “croak” are mixed. Return the minimum number of different frogs to finish all the croak in the given string.

A valid "croak" means a frog is printing 5 letters ‘c’, ’r’, ’o’, ’a’, ’k’ sequentially. The frogs have to print all five letters to finish a croak. If the given string is not a combination of valid "croak" return -1.


Example 1:
Input: croakOfFrogs = "croakcroak"
Output: 1 
Explanation: One frog yelling "croak" twice.


Example 2:
Input: croakOfFrogs = "crcoakroak"
Output: 2 
Explanation: The minimum number of frogs is two. 
The first frog could yell "crcoakroak".

The second frog could yell later "crcoakroak".


Example 3:
Input: croakOfFrogs = "croakcrook"
Output: -1
Explanation: The given string is an invalid combination of "croak" from different frogs.


Example 4:
Input: croakOfFrogs = "croakcroa"
Output: -1

Constraints:
`1 <= croakOfFrogs.length <= 10^5`
All characters in the string are: `''c''`, `''r''`, `''o''`, `''a''` or `''k''`.', false, 'Medium', NULL, 47.7, 
   39.2, 'https://leetcode.com/problems/minimum-number-of-frogs-croaking', 254, 16.7, 35.1, '["C3.ai"]'::jsonb, '["String"]'::jsonb, 
   430, 29, 94, false, '[]'::jsonb, true),
  (1420, 'Build Array Where You Can Find The Maximum Exactly K Comparisons', 'Given three integers `n`, `m` and `k`. Consider the following algorithm to find the maximum element of an array of positive integers:
You should build the array arr which has the following properties:
`arr` has exactly `n` integers.

`1 <= arr[i] <= m` where `(0 <= i < n)`.

After applying the mentioned algorithm to `arr`, the value `search_cost` is equal to `k`.

Return the number of ways to build the array `arr` under the mentioned conditions. As the answer may grow large, the answer must be computed modulo `10^9 + 7`.


Example 1:
Input: n = 2, m = 3, k = 1
Output: 6
Explanation: The possible arrays are [1, 1], [2, 1], [2, 2], [3, 1], [3, 2] [3, 3]

Example 2:
Input: n = 5, m = 2, k = 3
Output: 0
Explanation: There are no possible arrays that satisify the mentioned conditions.


Example 3:
Input: n = 9, m = 1, k = 1
Output: 1
Explanation: The only possible array is [1, 1, 1, 1, 1, 1, 1, 1, 1]

Example 4:
Input: n = 50, m = 100, k = 25
Output: 34549172
Explanation: Don''t forget to compute the answer modulo 1000000007

Example 5:
Input: n = 37, m = 17, k = 7
Output: 418930126

Constraints:
`1 <= n <= 50`
`1 <= m <= 100`
`0 <= k <= n`', false, 'Hard', NULL, 64.1, 
   18.6, 'https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons', 122, 7.3, 11.4, '["Dunzo"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   276, 7, 98, false, '[]'::jsonb, true),
  (1421, 'NPV Queries', 'SQL Schema', true, 'Medium', NULL, 82.3, 
   0, 'https://leetcode.com/problems/npv-queries', 105, 8.4, 10.2, '["Amazon"]'::jsonb, '[]'::jsonb, 
   11, 156, 7, true, '[]'::jsonb, true),
  (1422, 'Maximum Score After Splitting a String', 'Given a string `s` of zeros and ones, return the maximum score after splitting the string into two non-empty substrings (i.e. left substring and right substring).

The score after splitting a string is the number of zeros in the left substring plus the number of ones in the right substring.


Example 1:
Input: s = "011101"
Output: 5 
Explanation: 
All possible ways of splitting s into two non-empty substrings are:
left = "0" and right = "11101", score = 1 + 4 = 5 
left = "01" and right = "1101", score = 1 + 3 = 4 
left = "011" and right = "101", score = 1 + 2 = 3 
left = "0111" and right = "01", score = 1 + 1 = 2 
left = "01110" and right = "1", score = 2 + 1 = 3

Example 2:
Input: s = "00111"
Output: 5
Explanation: When left = "00" and right = "111", we get the maximum score = 2 + 3 = 5

Example 3:
Input: s = "1111"
Output: 3

Constraints:
`2 <= s.length <= 500`
The string `s` consists of characters ''0'' and ''1'' only.', false, 'Easy', NULL, 57.5, 
   0.5, 'https://leetcode.com/problems/maximum-score-after-splitting-a-string', 352, 29.6, 51.4, '["Google"]'::jsonb, '["String"]'::jsonb, 
   322, 17, 95, true, '[]'::jsonb, true),
  (1423, 'Maximum Points You Can Obtain from Cards', 'There are several cards arranged in a row, and each card has an associated number of points The points are given in the integer array `cardPoints`.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly `k` cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array `cardPoints` and the integer `k`, return the maximum score you can obtain.


Example 1:
Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.


Example 2:
Input: cardPoints = [2,2,2], k = 2
Output: 4
Explanation: Regardless of which two cards you take, your score will always be 4.


Example 3:
Input: cardPoints = [9,7,7,9,7,7,9], k = 7
Output: 55
Explanation: You have to take all the cards. Your score is the sum of points of all cards.


Example 4:
Input: cardPoints = [1,1000,1], k = 1
Output: 1
Explanation: You cannot take the card in the middle. Your best score is 1. 

Example 5:
Input: cardPoints = [1,79,80,1,1,1,200,1], k = 3
Output: 202

Constraints:
`1 <= cardPoints.length <= 10^5`
`1 <= cardPoints[i] <= 10^4`
`1 <= k <= cardPoints.length`', false, 'Medium', NULL, 46.9, 
   53.7, 'https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards', 561, 52.7, 112.3, '["Google"]'::jsonb, '["Array,Dynamic Programming,Sliding Window"]'::jsonb, 
   1236, 59, 95, true, '[]'::jsonb, true),
  (1424, 'Diagonal Traverse II', 'Given a list of lists of integers, `nums`, return all elements of `nums` in diagonal order as shown in the below images.


Example 1:
Input: nums = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,4,2,7,5,3,8,6,9]

Example 2:
Input: nums = [[1,2,3,4,5],[6,7],[8],[9,10,11],[12,13,14,15,16]]
Output: [1,6,2,8,7,3,9,4,12,10,5,13,11,14,15,16]

Example 3:
Input: nums = [[1,2,3],[4],[5,6,7],[8],[9,10,11]]
Output: [1,4,2,5,3,8,6,9,7,10,11]

Example 4:
Input: nums = [[1,2,3,4,5,6]]
Output: [1,2,3,4,5,6]

Constraints:
`1 <= nums.length <= 10^5`
`1 <= nums[i].length <= 10^5`
`1 <= nums[i][j] <= 10^9`
There at most `10^5` elements in `nums`.', false, 'Medium', NULL, 46.2, 
   26.3, 'https://leetcode.com/problems/diagonal-traverse-ii', 331, 25.2, 54.5, '["eBay"]'::jsonb, '["Array,Sort"]'::jsonb, 
   494, 61, 89, false, '[]'::jsonb, true),
  (1425, 'Constrained Subsequence Sum', 'Given an integer array `nums` and an integer `k`, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence, `nums[i]` and `nums[j]`, where `i < j`, the condition `j - i <= k` is satisfied.

A subsequence of an array is obtained by deleting some number of elements (can be zero) from the array, leaving the remaining elements in their original order.


Example 1:
Input: nums = [10,2,-10,5,20], k = 2
Output: 37
Explanation: The subsequence is [10, 2, 5, 20].


Example 2:
Input: nums = [-1,-2,-3], k = 1
Output: -1
Explanation: The subsequence must be non-empty, so we choose the largest number.


Example 3:
Input: nums = [10,-2,-10,-5,20], k = 2
Output: 23
Explanation: The subsequence is [10, -2, -5, 20].


Constraints:
`1 <= k <= nums.length <= 105`
`-104 <= nums[i] <= 104`', false, 'Hard', NULL, 45, 
   0, 'https://leetcode.com/problems/constrained-subsequence-sum', 157, 12.1, 27, '["Akuna Capital"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   487, 22, 96, false, '[]'::jsonb, true),
  (1426, 'Counting Elements', 'Given an integer array `arr`, count how many elements `x` there are, such that `x + 1` is also in `arr`. If there are duplicates in `arr`, count them separately.


Example 1:
Input: arr = [1,2,3]
Output: 2
Explanation: 1 and 2 are counted cause 2 and 3 are in arr.


Example 2:
Input: arr = [1,1,3,3,5,5,7,7]
Output: 0
Explanation: No numbers are counted, cause there''s no 2, 4, 6, or 8 in arr.


Example 3:
Input: arr = [1,3,2,3,5,0]
Output: 3
Explanation: 0, 1 and 2 are counted cause 1, 2 and 3 are in arr.


Example 4:
Input: arr = [1,1,2,2]
Output: 2
Explanation: Two 1s are counted cause 2 is in arr.


Example 5:
Input: arr = [1,1,2]
Output: 2
Explanation: Both 1s are counted because 2 is in the array.


Constraints:
`1 <= arr.length <= 1000`
`0 <= arr[i] <= 1000`', true, 'Easy', '/articles/counting-elements', 59.1, 
   0, 'https://leetcode.com/problems/counting-elements', 426, 86.1, 145.7, '["DRW"]'::jsonb, '["Array"]'::jsonb, 
   59, 9, 87, false, '[]'::jsonb, true),
  (1427, 'Perform String Shifts', 'You are given a string `s` containing lowercase English letters, and a matrix `shift`, where `shift[i] = [direction, amount]`:
`direction` can be `0` (for left shift) or `1` (for right shift). 
`amount` is the amount by which string `s` is to be shifted.

A left shift by 1 means remove the first character of `s` and append it to the end.

Similarly, a right shift by 1 means remove the last character of `s` and add it to the beginning.

Return the final string after all operations.


Example 1:
Input: s = "abc", shift = [[0,1],[1,2]]
Output: "cab"
Explanation: 
[0,1] means shift to left by 1. "abc" -> "bca"
[1,2] means shift to right by 2. "bca" -> "cab"

Example 2:
Input: s = "abcdefg", shift = [[1,1],[1,1],[0,2],[1,3]]
Output: "efgabcd"
Explanation:  
[1,1] means shift to right by 1. "abcdefg" -> "gabcdef"
[1,1] means shift to right by 1. "gabcdef" -> "fgabcde"
[0,2] means shift to left by 2. "fgabcde" -> "abcdefg"
[1,3] means shift to right by 3. "abcdefg" -> "efgabcd"

Constraints:
`1 <= s.length <= 100`
`s` only contains lower case English letters.

`1 <= shift.length <= 100`
`shift[i].length == 2`
`0 <= shift[i][0] <= 1`
`0 <= shift[i][1] <= 100`', true, 'Easy', '/articles/performing-string-shifts', 53.5, 
   0, 'https://leetcode.com/problems/perform-string-shifts', 629, 65, 121.3, '["Goldman Sachs"]'::jsonb, '["Array,Math"]'::jsonb, 
   79, 1, 99, false, '[]'::jsonb, true),
  (1428, 'Leftmost Column with at Least a One', '(This problem is an interactive problem.)
A row-sorted binary matrix means that all elements are `0` or `1` and each row of the matrix is sorted in non-decreasing order.

Given a row-sorted binary matrix `binaryMatrix`, return the index (0-indexed) of the leftmost column with a 1 in it. If such an index does not exist, return `-1`.

You can''t access the Binary Matrix directly. You may only access the matrix using a `BinaryMatrix` interface:
`BinaryMatrix.get(row, col)` returns the element of the matrix at index `(row, col)` (0-indexed).

`BinaryMatrix.dimensions()` returns the dimensions of the matrix as a list of 2 elements `[rows, cols]`, which means the matrix is `rows x cols`.

Submissions making more than `1000` calls to `BinaryMatrix.get` will be judged Wrong Answer. Also, any solutions that attempt to circumvent the judge will result in disqualification.

For custom testing purposes, the input will be the entire binary matrix `mat`. You will not have access to the binary matrix directly.


Example 1:
Input: mat = [[0,0],[1,1]]
Output: 0

Example 2:
Input: mat = [[0,0],[0,1]]
Output: 1

Example 3:
Input: mat = [[0,0],[0,0]]
Output: -1

Example 4:
Input: mat = [[0,0,0,1],[0,0,1,1],[0,1,1,1]]
Output: 1

Constraints:
`rows == mat.length`
`cols == mat[i].length`
`1 <= rows, cols <= 100`
`mat[i][j]` is either `0` or `1`.

`mat[i]` is sorted in non-decreasing order.', true, 'Medium', '/articles/leftmost-column-with-a-at-least-a-one', 49.4, 
   70.3, 'https://leetcode.com/problems/leftmost-column-with-at-least-a-one', 558, 88.7, 179.3, '["Facebook"]'::jsonb, '["Array"]'::jsonb, 
   489, 64, 88, true, '[]'::jsonb, true),
  (1429, 'First Unique Number', 'You have a queue of integers, you need to retrieve the first unique integer in the queue.

Implement the `FirstUnique` class:
`FirstUnique(int[] nums)` Initializes the object with the numbers in the queue.

`int showFirstUnique()` returns the value of the first unique integer of the queue, and returns -1 if there is no such integer.

`void add(int value)` insert value to the queue.


Example 1:
Input: 
["FirstUnique","showFirstUnique","add","showFirstUnique","add","showFirstUnique","add","showFirstUnique"]
[[[2,3,5]],[],[5],[],[2],[],[3],[]]
Output: 
[null,2,null,2,null,3,null,-1]
Explanation: 
FirstUnique firstUnique = new FirstUnique([2,3,5]);
firstUnique.showFirstUnique(); // return 2
firstUnique.add(5);            // the queue is now [2,3,5,5]
firstUnique.showFirstUnique(); // return 2
firstUnique.add(2);            // the queue is now [2,3,5,5,2]
firstUnique.showFirstUnique(); // return 3
firstUnique.add(3);            // the queue is now [2,3,5,5,2,3]
firstUnique.showFirstUnique(); // return -1

Example 2:
Input: 
["FirstUnique","showFirstUnique","add","add","add","add","add","showFirstUnique"]
[[[7,7,7,7,7,7]],[],[7],[3],[3],[7],[17],[]]
Output: 
[null,-1,null,null,null,null,null,17]
Explanation: 
FirstUnique firstUnique = new FirstUnique([7,7,7,7,7,7]);
firstUnique.showFirstUnique(); // return -1
firstUnique.add(7);            // the queue is now [7,7,7,7,7,7,7]
firstUnique.add(3);            // the queue is now [7,7,7,7,7,7,7,3]
firstUnique.add(3);            // the queue is now [7,7,7,7,7,7,7,3,3]
firstUnique.add(7);            // the queue is now [7,7,7,7,7,7,7,3,3,7]
firstUnique.add(17);           // the queue is now [7,7,7,7,7,7,7,3,3,7,17]
firstUnique.showFirstUnique(); // return 17

Example 3:
Input: 
["FirstUnique","showFirstUnique","add","showFirstUnique"]
[[[809]],[],[809],[]]
Output: 
[null,809,null,-1]
Explanation: 
FirstUnique firstUnique = new FirstUnique([809]);
firstUnique.showFirstUnique(); // return 809
firstUnique.add(809);          // the queue is now [809,809]
firstUnique.showFirstUnique(); // return -1

Constraints:
`1 <= nums.length <= 10^5`
`1 <= nums[i] <= 10^8`
`1 <= value <= 10^8`
At most `50000` calls will be made to `showFirstUnique` and `add`.', true, 'Medium', '/articles/first-unique-number', 49.9, 
   24.3, 'https://leetcode.com/problems/first-unique-number', 481, 53.6, 107.6, '["Amazon,Bloomberg,Microsoft"]'::jsonb, '["Hash Table,Design"]'::jsonb, 
   225, 11, 95, true, '[]'::jsonb, true),
  (1430, 'Check If a String Is a Valid Sequence from Root to Leaves Path in a Binary Tree', 'Given a binary tree where each path going from the root to any leaf form a valid sequence, check if a given string is a valid sequence in such binary tree. 
We get the given string from the concatenation of an array of integers `arr` and the concatenation of all values of the nodes along a path results in a sequence in the given binary tree.


Example 1:
Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,0,1]
Output: true
Explanation: 
The path 0 -> 1 -> 0 -> 1 is a valid sequence (green color in the figure). 
Other valid sequences are: 
0 -> 1 -> 1 -> 0 
0 -> 0 -> 0

Example 2:
Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,0,1]
Output: false 
Explanation: The path 0 -> 0 -> 1 does not exist, therefore it is not even a sequence.


Example 3:
Input: root = [0,1,0,0,1,0,null,null,1,0,0], arr = [0,1,1]
Output: false
Explanation: The path 0 -> 1 -> 1 is a sequence, but it is not a valid sequence.


Constraints:
`1 <= arr.length <= 5000`
`0 <= arr[i] <= 9`
Each node''s value is between [0 - 9].', true, 'Medium', NULL, 45.2, 
   0, 'https://leetcode.com/problems/check-if-a-string-is-a-valid-sequence-from-root-to-leaves-path-in-a-binary-tree', 440, 36.6, 80.9, '["Amazon"]'::jsonb, '["Tree"]'::jsonb, 
   94, 7, 93, true, '[]'::jsonb, true),
  (1431, 'Kids With the Greatest Number of Candies', 'Given the array `candies` and the integer `extraCandies`, where `candies[i]` represents the number of candies that the ith kid has.

For each kid check if there is a way to distribute `extraCandies` among the kids such that he or she can have the greatest number of candies among them. Notice that multiple kids can have the greatest number of candies.


Example 1:
Input: candies = [2,3,5,1,3], extraCandies = 3
Output: [true,true,true,false,true] 
Explanation: 
Kid 1 has 2 candies and if he or she receives all extra candies (3) will have 5 candies --- the greatest number of candies among the kids. 
Kid 2 has 3 candies and if he or she receives at least 2 extra candies will have the greatest number of candies among the kids. 
Kid 3 has 5 candies and this is already the greatest number of candies among the kids. 
Kid 4 has 1 candy and even if he or she receives all extra candies will only have 4 candies. 
Kid 5 has 3 candies and if he or she receives at least 2 extra candies will have the greatest number of candies among the kids. 

Example 2:
Input: candies = [4,2,1,1,2], extraCandies = 1
Output: [true,false,false,false,false] 
Explanation: There is only 1 extra candy, therefore only kid 1 will have the greatest number of candies among the kids regardless of who takes the extra candy.


Example 3:
Input: candies = [12,1,12], extraCandies = 10
Output: [true,false,true]

Constraints:
`2 <= candies.length <= 100`
`1 <= candies[i] <= 100`
`1 <= extraCandies <= 50`', false, 'Easy', NULL, 88.2, 
   18.2, 'https://leetcode.com/problems/kids-with-the-greatest-number-of-candies', 999, 199.1, 225.8, '["Adobe"]'::jsonb, '["Array"]'::jsonb, 
   732, 172, 81, false, '[]'::jsonb, true),
  (1432, 'Max Difference You Can Get From Changing an Integer', 'You are given an integer `num`. You will apply the following steps exactly two times:
Pick a digit `x (0 <= x <= 9)`.

Pick another digit `y (0 <= y <= 9)`. The digit `y` can be equal to `x`.

Replace all the occurrences of `x` in the decimal representation of `num` by `y`.

The new integer cannot have any leading zeros, also the new integer cannot be 0.

Let `a` and `b` be the results of applying the operations to `num` the first and second times, respectively.

Return the max difference between `a` and `b`.


Example 1:
Input: num = 555
Output: 888
Explanation: The first time pick x = 5 and y = 9 and store the new integer in a.

The second time pick x = 5 and y = 1 and store the new integer in b.

We have now a = 999 and b = 111 and max difference = 888

Example 2:
Input: num = 9
Output: 8
Explanation: The first time pick x = 9 and y = 9 and store the new integer in a.

The second time pick x = 9 and y = 1 and store the new integer in b.

We have now a = 9 and b = 1 and max difference = 8

Example 3:
Input: num = 123456
Output: 820000

Example 4:
Input: num = 10000
Output: 80000

Example 5:
Input: num = 9288
Output: 8700

Constraints:
`1 <= num <= 10^8`', false, 'Medium', NULL, 42.8, 
   0, 'https://leetcode.com/problems/max-difference-you-can-get-from-changing-an-integer', 184, 10, 23.4, '["Mercari"]'::jsonb, '["String"]'::jsonb, 
   103, 139, 43, false, '[]'::jsonb, true),
  (1433, 'Check If a String Can Break Another String', 'Given two strings: `s1` and `s2` with the same size, check if some permutation of string `s1` can break some permutation of string `s2` or vice-versa. In other words `s2` can break `s1` or vice-versa.

A string `x` can break string `y` (both of size `n`) if `x[i] >= y[i]` (in alphabetical order) for all `i` between `0` and `n-1`.


Example 1:
Input: s1 = "abc", s2 = "xya"
Output: true
Explanation: "ayx" is a permutation of s2="xya" which can break to string "abc" which is a permutation of s1="abc".


Example 2:
Input: s1 = "abe", s2 = "acd"
Output: false 
Explanation: All permutations for s1="abe" are: "abe", "aeb", "bae", "bea", "eab" and "eba" and all permutation for s2="acd" are: "acd", "adc", "cad", "cda", "dac" and "dca". However, there is not any permutation from s1 which can break some permutation from s2 and vice-versa.


Example 3:
Input: s1 = "leetcodee", s2 = "interview"
Output: true

Constraints:
`s1.length == n`
`s2.length == n`
`1 <= n <= 10^5`
All strings consist of lowercase English letters.', false, 'Medium', NULL, 67.3, 
   0, 'https://leetcode.com/problems/check-if-a-string-can-break-another-string', 322, 21, 31.2, '["endurance"]'::jsonb, '["String,Greedy"]'::jsonb, 
   282, 81, 78, false, '[]'::jsonb, true),
  (1434, 'Number of Ways to Wear Different Hats to Each Other', 'There are `n` people and 40 types of hats labeled from 1 to 40.

Given a list of list of integers `hats`, where `hats[i]` is a list of all hats preferred by the i-th` person.

Return the number of ways that the n people wear different hats to each other.

Since the answer may be too large, return it modulo `10^9 + 7`.


Example 1:
Input: hats = [[3,4],[4,5],[5]]
Output: 1
Explanation: There is only one way to choose hats given the conditions. 
First person choose hat 3, Second person choose hat 4 and last one hat 5.


Example 2:
Input: hats = [[3,5,1],[3,5]]
Output: 4
Explanation: There are 4 ways to choose hats
(3,5), (5,3), (1,3) and (1,5)

Example 3:
Input: hats = [[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]]
Output: 24
Explanation: Each person can choose hats labeled from 1 to 4.

Number of Permutations of (1,2,3,4) = 24.


Example 4:
Input: hats = [[1,2,3],[2,3,5,6],[1,3,7,9],[1,8,9],[2,5,7]]
Output: 111

Constraints:
`n == hats.length`
`1 <= n <= 10`
`1 <= hats[i].length <= 40`
`1 <= hats[i][j] <= 40`
`hats[i]` contains a list of unique integers.', false, 'Hard', NULL, 39.6, 
   0, 'https://leetcode.com/problems/number-of-ways-to-wear-different-hats-to-each-other', 93, 6.2, 15.6, '["MindTickle"]'::jsonb, '["Dynamic Programming,Bit Manipulation"]'::jsonb, 
   384, 5, 99, false, '[]'::jsonb, true),
  (1435, 'Create a Session Bar Chart', 'SQL Schema', true, 'Easy', NULL, 77.8, 
   0, 'https://leetcode.com/problems/create-a-session-bar-chart', 109, 9, 11.6, '["Twitch"]'::jsonb, '[]'::jsonb, 
   63, 115, 35, false, '[]'::jsonb, true),
  (1436, 'Destination City', 'You are given the array `paths`, where `paths[i] = [cityAi, cityBi]` means there exists a direct path going from `cityAi` to `cityBi`. Return the destination city, that is, the city without any path outgoing to another city.

It is guaranteed that the graph of paths forms a line without any loop, therefore, there will be exactly one destination city.


Example 1:
Input: paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]
Output: "Sao Paulo" 
Explanation: Starting at "London" city you will reach "Sao Paulo" city which is the destination city. Your trip consist of: "London" -> "New York" -> "Lima" -> "Sao Paulo".


Example 2:
Input: paths = [["B","C"],["D","B"],["C","A"]]
Output: "A"
Explanation: All possible trips are: 
"D" -> "B" -> "C" -> "A". 
"B" -> "C" -> "A". 
"C" -> "A". 
"A". 
Clearly the destination city is "A".


Example 3:
Input: paths = [["A","Z"]]
Output: "Z"

Constraints:
`1 <= paths.length <= 100`
`paths[i].length == 2`
`1 <= cityAi.length, cityBi.length <= 10`
`cityAi != cityBi`
All strings consist of lowercase and uppercase English letters and the space character.', false, 'Easy', NULL, 77.3, 
   19.7, 'https://leetcode.com/problems/destination-city', 872, 67.4, 87.2, '["Yelp"]'::jsonb, '["String"]'::jsonb, 
   563, 39, 94, false, '[]'::jsonb, true),
  (1437, 'Check If All 1''s Are at Least Length K Places Away', 'Given an array `nums` of 0s and 1s and an integer `k`, return `True` if all 1''s are at least `k` places away from each other, otherwise return `False`.


Example 1:
Input: nums = [1,0,0,0,1,0,0,1], k = 2
Output: true
Explanation: Each of the 1s are at least 2 places away from each other.


Example 2:
Input: nums = [1,0,0,1,0,1], k = 2
Output: false
Explanation: The second 1 and third 1 are only one apart from each other.


Example 3:
Input: nums = [1,1,1,1,1], k = 0
Output: true

Example 4:
Input: nums = [0,1,0,1], k = 1
Output: true

Constraints:
`1 <= nums.length <= 105`
`0 <= k <= nums.length`
`nums[i]` is `0` or `1`', false, 'Easy', '/articles/check-if-all-ones-are-at-least-k-places-away', 62, 
   0, 'https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away', 533, 46.5, 74.9, '["United Health Group"]'::jsonb, '["Array"]'::jsonb, 
   263, 178, 60, false, '[]'::jsonb, true),
  (1438, 'Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit', 'Given an array of integers `nums` and an integer `limit`, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to `limit`.


Example 1:
Input: nums = [8,2,4,7], limit = 4
Output: 2 
Explanation: All subarrays are: 
[8] with maximum absolute diff |8-8| = 0 <= 4.

[8,2] with maximum absolute diff |8-2| = 6 > 4. 
[8,2,4] with maximum absolute diff |8-2| = 6 > 4.

[8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.

[2] with maximum absolute diff |2-2| = 0 <= 4.

[2,4] with maximum absolute diff |2-4| = 2 <= 4.

[2,4,7] with maximum absolute diff |2-7| = 5 > 4.

[4] with maximum absolute diff |4-4| = 0 <= 4.

[4,7] with maximum absolute diff |4-7| = 3 <= 4.

[7] with maximum absolute diff |7-7| = 0 <= 4. 
Therefore, the size of the longest subarray is 2.


Example 2:
Input: nums = [10,1,2,4,7,2], limit = 5
Output: 4 
Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 <= 5.


Example 3:
Input: nums = [4,2,2,2,4,4,2,2], limit = 0
Output: 3

Constraints:
`1 <= nums.length <= 105`
`1 <= nums[i] <= 109`
`0 <= limit <= 109`', false, 'Medium', NULL, 44.4, 
   25.7, 'https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit', 374, 52.7, 118.5, '["Google"]'::jsonb, '["Array,Sliding Window"]'::jsonb, 
   1258, 63, 95, true, '[]'::jsonb, true),
  (1439, 'Find the Kth Smallest Sum of a Matrix With Sorted Rows', 'You are given an `m * n` matrix, `mat`, and an integer `k`, which has its rows sorted in non-decreasing order.

You are allowed to choose exactly 1 element from each row to form an array. Return the Kth smallest array sum among all possible arrays.


Example 1:
Input: mat = [[1,3,11],[2,4,6]], k = 5
Output: 7
Explanation: Choosing one element from each row, the first k smallest sum are:
[1,2], [1,4], [3,2], [3,4], [1,6]. Where the 5th sum is 7.  

Example 2:
Input: mat = [[1,3,11],[2,4,6]], k = 9
Output: 17

Example 3:
Input: mat = [[1,10,10],[1,4,5],[2,3,6]], k = 7
Output: 9
Explanation: Choosing one element from each row, the first k smallest sum are:
[1,1,2], [1,1,3], [1,4,2], [1,4,3], [1,1,6], [1,5,2], [1,5,3]. Where the 7th sum is 9.  

Example 4:
Input: mat = [[1,1,10],[2,2,9]], k = 7
Output: 12

Constraints:
`m == mat.length`
`n == mat.length[i]`
`1 <= m, n <= 40`
`1 <= k <= min(200, n ^ m)`
`1 <= mat[i][j] <= 5000`
`mat[i]` is a non decreasing array.', false, 'Hard', NULL, 60.2, 
   19.3, 'https://leetcode.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows', 152, 15.3, 25.4, '["Facebook"]'::jsonb, '["Heap"]'::jsonb, 
   485, 7, 99, true, '[]'::jsonb, true),
  (1440, 'Evaluate Boolean Expression', 'SQL Schema', true, 'Medium', NULL, 75.1, 
   0, 'https://leetcode.com/problems/evaluate-boolean-expression', 89, 6.5, 8.7, '["Point72"]'::jsonb, '[]'::jsonb, 
   70, 2, 97, false, '[]'::jsonb, true),
  (1441, 'Build an Array With Stack Operations', 'Given an array `target` and an integer `n`. In each iteration, you will read a number from  `list = {1,2,3..., n}`.

Build the `target` array using the following operations:
Push: Read a new element from the beginning `list`, and push it in the array.

Pop: delete the last element of the array.

If the target array is already built, stop reading more elements.

Return the operations to build the target array. You are guaranteed that the answer is unique.


Example 1:
Input: target = [1,3], n = 3
Output: ["Push","Push","Pop","Push"]
Explanation: 
Read number 1 and automatically push in the array -> [1]
Read number 2 and automatically push in the array then Pop it -> [1]
Read number 3 and automatically push in the array -> [1,3]

Example 2:
Input: target = [1,2,3], n = 3
Output: ["Push","Push","Push"]

Example 3:
Input: target = [1,2], n = 4
Output: ["Push","Push"]
Explanation: You only need to read the first 2 numbers and stop.


Example 4:
Input: target = [2,3,4], n = 4
Output: ["Push","Pop","Push","Push","Push"]

Constraints:
`1 <= target.length <= 100`
`1 <= target[i] <= n`
`1 <= n <= 100`
`target` is strictly increasing.', false, 'Easy', NULL, 70.4, 
   1.3, 'https://leetcode.com/problems/build-an-array-with-stack-operations', 651, 39.3, 55.8, '["Google"]'::jsonb, '["Stack"]'::jsonb, 
   260, 434, 37, true, '[]'::jsonb, true),
  (1442, 'Count Triplets That Can Form Two Arrays of Equal XOR', 'Given an array of integers `arr`.

We want to select three indices `i`, `j` and `k` where `(0 <= i < j <= k < arr.length)`.

Let''s define `a` and `b` as follows:
`a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]`
`b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]`
Note that ^ denotes the bitwise-xor operation.

Return the number of triplets (`i`, `j` and `k`) Where `a == b`.


Example 1:
Input: arr = [2,3,1,6,7]
Output: 4
Explanation: The triplets are (0,1,2), (0,2,2), (2,3,4) and (2,4,4)

Example 2:
Input: arr = [1,1,1,1,1]
Output: 10

Example 3:
Input: arr = [2,3]
Output: 0

Example 4:
Input: arr = [1,3,5,7,9]
Output: 3

Example 5:
Input: arr = [7,11,12,9,5,2,7,17,22]
Output: 8

Constraints:
`1 <= arr.length <= 300`
`1 <= arr[i] <= 10^8`', false, 'Medium', NULL, 71.8, 
   3.3, 'https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor', 154, 17.7, 24.6, '[]'::jsonb, '[]'::jsonb, 
   508, 28, 95, false, '[]'::jsonb, true),
  (1443, 'Minimum Time to Collect All Apples in a Tree', 'Given an undirected tree consisting of `n` vertices numbered from `0` to `n-1`, which has some apples in their vertices. You spend 1 second to walk over one edge of the tree. Return the minimum time in seconds you have to spend to collect all apples in the tree, starting at vertex 0 and coming back to this vertex.

The edges of the undirected tree are given in the array `edges`, where `edges[i] = [ai, bi]` means that exists an edge connecting the vertices `ai` and `bi`. Additionally, there is a boolean array `hasApple`, where `hasApple[i] = true` means that vertex `i` has an apple; otherwise, it does not have any apple.


Example 1:
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,true,true,false]
Output: 8 
Explanation: The figure above represents the given tree where red vertices have an apple. One optimal path to collect all apples is shown by the green arrows.  

Example 2:
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,false,true,false]
Output: 6
Explanation: The figure above represents the given tree where red vertices have an apple. One optimal path to collect all apples is shown by the green arrows.  

Example 3:
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,false,false,false,false,false]
Output: 0

Constraints:
`1 <= n <= 10^5`
`edges.length == n - 1`
`edges[i].length == 2`
`0 <= ai < bi <= n - 1`
`fromi < toi`
`hasApple.length == n`', false, 'Medium', NULL, 54.5, 
   10.3, 'https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree', 345, 18.4, 33.7, '["Facebook"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   553, 59, 90, true, '[]'::jsonb, true),
  (1444, 'Number of Ways of Cutting a Pizza', 'Given a rectangular pizza represented as a `rows x cols` matrix containing the following characters: `''A''` (an apple) and `''.''` (empty cell) and given the integer `k`. You have to cut the pizza into `k` pieces using `k-1` cuts. 
For each cut you choose the direction: vertical or horizontal, then you choose a cut position at the cell boundary and cut the pizza into two pieces. If you cut the pizza vertically, give the left part of the pizza to a person. If you cut the pizza horizontally, give the upper part of the pizza to a person. Give the last piece of pizza to the last person.

Return the number of ways of cutting the pizza such that each piece contains at least one apple. Since the answer can be a huge number, return this modulo 10^9 + 7.


Example 1:
Input: pizza = ["A..","AAA","..."], k = 3
Output: 3 
Explanation: The figure above shows the three ways to cut the pizza. Note that pieces must contain at least one apple.


Example 2:
Input: pizza = ["A..","AA.","..."], k = 3
Output: 1

Example 3:
Input: pizza = ["A..","A..","..."], k = 1
Output: 1

Constraints:
`1 <= rows, cols <= 50`
`rows == pizza.length`
`cols == pizza[i].length`
`1 <= k <= 10`
`pizza` consists of characters `''A''` and `''.''` only.', false, 'Hard', NULL, 53.9, 
   6, 'https://leetcode.com/problems/number-of-ways-of-cutting-a-pizza', 133, 8.3, 15.5, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   302, 8, 97, true, '[]'::jsonb, true),
  (1445, 'Apples & Oranges', 'SQL Schema', true, 'Medium', NULL, 91, 
   0, 'https://leetcode.com/problems/apples-oranges', 233, 13.8, 15.2, '["Facebook"]'::jsonb, '[]'::jsonb, 
   64, 11, 85, true, '[]'::jsonb, true),
  (1446, 'Consecutive Characters', 'Given a string `s`, the power of the string is the maximum length of a non-empty substring that contains only one unique character.

Return the power of the string.


Example 1:
Input: s = "leetcode"
Output: 2
Explanation: The substring "ee" is of length 2 with the character ''e'' only.


Example 2:
Input: s = "abbcccddddeeeeedcba"
Output: 5
Explanation: The substring "eeeee" is of length 5 with the character ''e'' only.


Example 3:
Input: s = "triplepillooooow"
Output: 5

Example 4:
Input: s = "hooraaaaaaaaaaay"
Output: 11

Example 5:
Input: s = "tourist"
Output: 1

Constraints:
`1 <= s.length <= 500`
`s` contains only lowercase English letters.', false, 'Easy', '/articles/consecutive-characters', 61.4, 
   4, 'https://leetcode.com/problems/consecutive-characters', 766, 68.2, 111.2, '["Microsoft"]'::jsonb, '["String"]'::jsonb, 
   509, 15, 97, false, '[]'::jsonb, true),
  (1447, 'Simplified Fractions', 'Given an integer `n`, return a list of all simplified fractions between 0 and 1 (exclusive) such that the denominator is less-than-or-equal-to `n`. The fractions can be in any order.


Example 1:
Input: n = 2
Output: ["1/2"]
Explanation: "1/2" is the only unique fraction with a denominator less-than-or-equal-to 2.


Example 2:
Input: n = 3
Output: ["1/2","1/3","2/3"]

Example 3:
Input: n = 4
Output: ["1/2","1/3","1/4","2/3","3/4"]
Explanation: "2/4" is not a simplified fraction because it can be simplified to "1/2".


Example 4:
Input: n = 1
Output: []

Constraints:
`1 <= n <= 100`', false, 'Medium', NULL, 62.2, 
   0, 'https://leetcode.com/problems/simplified-fractions', 194, 15.1, 24.3, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   143, 28, 84, true, '[]'::jsonb, true),
  (1448, 'Count Good Nodes in Binary Tree', 'Given a binary tree `root`, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

Return the number of good nodes in the binary tree.


Example 1:
Input: root = [3,1,4,3,null,1,5]
Output: 4
Explanation: Nodes in blue are good.

Root Node (3) is always a good node.

Node 4 -> (3,4) is the maximum value in the path starting from the root.

Node 5 -> (3,4,5) is the maximum value in the path
Node 3 -> (3,1,3) is the maximum value in the path.


Example 2:
Input: root = [3,3,null,4,2]
Output: 3
Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.


Example 3:
Input: root = [1]
Output: 1
Explanation: Root is considered as good.


Constraints:
The number of nodes in the binary tree is in the range `[1, 10^5]`.

Each node''s value is between `[-10^4, 10^4]`.', false, 'Medium', NULL, 71.3, 
   53.2, 'https://leetcode.com/problems/count-good-nodes-in-binary-tree', 590, 39.2, 55, '["Microsoft,Amazon"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   639, 32, 95, true, '[]'::jsonb, true),
  (1449, 'Form Largest Integer With Digits That Add up to Target', 'Given an array of integers `cost` and an integer `target`. Return the maximum integer you can paint under the following rules:
The cost of painting a digit (i+1) is given by `cost[i]` (0 indexed).

The total cost used must be equal to `target`.

Integer does not have digits 0.

Since the answer may be too large, return it as string.

If there is no way to paint any integer given the condition, return "0".


Example 1:
Input: cost = [4,3,2,5,6,7,2,5,5], target = 9
Output: "7772"
Explanation:  The cost to paint the digit ''7'' is 2, and the digit ''2'' is 3. Then cost("7772") = 2*3+ 3*1 = 9. You could also paint "977", but "7772" is the largest number.

Digit    cost
  1  ->   4
  2  ->   3
  3  ->   2
  4  ->   5
  5  ->   6
  6  ->   7
  7  ->   2
  8  ->   5
  9  ->   5

Example 2:
Input: cost = [7,6,5,5,5,6,8,7,8], target = 12
Output: "85"
Explanation: The cost to paint the digit ''8'' is 7, and the digit ''5'' is 5. Then cost("85") = 7 + 5 = 12.


Example 3:
Input: cost = [2,4,6,2,4,6,4,4,4], target = 5
Output: "0"
Explanation: It''s not possible to paint any integer with total cost equal to target.


Example 4:
Input: cost = [6,10,15,40,40,40,40,40,40], target = 47
Output: "32211"

Constraints:
`cost.length == 9`
`1 <= cost[i] <= 5000`
`1 <= target <= 5000`', false, 'Hard', NULL, 44.3, 
   10.7, 'https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target', 122, 9, 20.2, '["Google"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   332, 6, 98, true, '[]'::jsonb, true),
  (1450, 'Number of Students Doing Homework at a Given Time', 'Given two integer arrays `startTime` and `endTime` and given an integer `queryTime`.

The `ith` student started doing their homework at the time `startTime[i]` and finished it at time `endTime[i]`.

Return the number of students doing their homework at time `queryTime`. More formally, return the number of students where `queryTime` lays in the interval `[startTime[i], endTime[i]]` inclusive.


Example 1:
Input: startTime = [1,2,3], endTime = [3,2,7], queryTime = 4
Output: 1
Explanation: We have 3 students where:
The first student started doing homework at time 1 and finished at time 3 and wasn''t doing anything at time 4.

The second student started doing homework at time 2 and finished at time 2 and also wasn''t doing anything at time 4.

The third student started doing homework at time 3 and finished at time 7 and was the only student doing homework at time 4.


Example 2:
Input: startTime = [4], endTime = [4], queryTime = 4
Output: 1
Explanation: The only student was doing their homework at the queryTime.


Example 3:
Input: startTime = [4], endTime = [4], queryTime = 5
Output: 0

Example 4:
Input: startTime = [1,1,1,1], endTime = [1,3,2,4], queryTime = 7
Output: 0

Example 5:
Input: startTime = [9,8,7,6,5,4,3,2,1], endTime = [10,10,10,10,10,10,10,10,10], queryTime = 5
Output: 5

Constraints:
`startTime.length == endTime.length`
`1 <= startTime.length <= 100`
`1 <= startTime[i] <= endTime[i] <= 1000`
`1 <= queryTime <= 1000`', false, 'Easy', NULL, 77.1, 
   1.6, 'https://leetcode.com/problems/number-of-students-doing-homework-at-a-given-time', 671, 61.3, 79.5, '[]'::jsonb, '[]'::jsonb, 
   356, 89, 80, false, '[]'::jsonb, true),
  (1451, 'Rearrange Words in a Sentence', 'Given a sentence `text` (A sentence is a string of space-separated words) in the following format:
First letter is in upper case.

Each word in `text` are separated by a single space.

Your task is to rearrange the words in text such that all words are rearranged in an increasing order of their lengths. If two words have the same length, arrange them in their original order.

Return the new text following the format shown above.


Example 1:
Input: text = "Leetcode is cool"
Output: "Is cool leetcode"
Explanation: There are 3 words, "Leetcode" of length 8, "is" of length 2 and "cool" of length 4.

Output is ordered by length and the new first word starts with capital letter.

Example 2:
Input: text = "Keep calm and code on"
Output: "On and keep calm code"
Explanation: Output is ordered as follows:
"On" 2 letters.

"and" 3 letters.

"keep" 4 letters in case of tie order by position in original text.

"calm" 4 letters.

"code" 4 letters.


Example 3:
Input: text = "To be or not to be"
Output: "To be or to be not"

Constraints:
`text` begins with a capital letter and then contains lowercase letters and single space between words.

`1 <= text.length <= 10^5`', false, 'Medium', NULL, 59.8, 
   7.1, 'https://leetcode.com/problems/rearrange-words-in-a-sentence', 372, 27.6, 46.2, '["Amazon,VMware"]'::jsonb, '["String,Sort"]'::jsonb, 
   274, 50, 85, true, '[]'::jsonb, true),
  (1452, 'People Whose List of Favorite Companies Is Not a Subset of Another List', 'Given the array `favoriteCompanies` where `favoriteCompanies[i]` is the list of favorites companies for the `ith` person (indexed from 0).

Return the indices of people whose list of favorite companies is not a subset of any other list of favorites companies. You must return the indices in increasing order.


Example 1:
Input: favoriteCompanies = [["leetcode","google","facebook"],["google","microsoft"],["google","facebook"],["google"],["amazon"]]
Output: [0,1,4] 
Explanation: 
Person with index=2 has favoriteCompanies[2]=["google","facebook"] which is a subset of favoriteCompanies[0]=["leetcode","google","facebook"] corresponding to the person with index 0. 
Person with index=3 has favoriteCompanies[3]=["google"] which is a subset of favoriteCompanies[0]=["leetcode","google","facebook"] and favoriteCompanies[1]=["google","microsoft"]. 
Other lists of favorite companies are not a subset of another list, therefore, the answer is [0,1,4].


Example 2:
Input: favoriteCompanies = [["leetcode","google","facebook"],["leetcode","amazon"],["facebook","google"]]
Output: [0,1] 
Explanation: In this case favoriteCompanies[2]=["facebook","google"] is a subset of favoriteCompanies[0]=["leetcode","google","facebook"], therefore, the answer is [0,1].


Example 3:
Input: favoriteCompanies = [["leetcode"],["google"],["facebook"],["amazon"]]
Output: [0,1,2,3]

Constraints:
`1 <= favoriteCompanies.length <= 100`
`1 <= favoriteCompanies[i].length <= 500`
`1 <= favoriteCompanies[i][j].length <= 20`
All strings in `favoriteCompanies[i]` are distinct.

All lists of favorite companies are distinct, that is, If we sort alphabetically each list then `favoriteCompanies[i] != favoriteCompanies[j].`
All strings consist of lowercase English letters only.', false, 'Medium', NULL, 55.2, 
   0, 'https://leetcode.com/problems/people-whose-list-of-favorite-companies-is-not-a-subset-of-another-list', 215, 14.9, 27, '["Google"]'::jsonb, '["String,Sort"]'::jsonb, 
   163, 160, 50, true, '[]'::jsonb, true),
  (1453, 'Maximum Number of Darts Inside of a Circular Dartboard', 'You have a very large square wall and a circular dartboard placed on the wall. You have been challenged to throw darts into the board blindfolded. Darts thrown at the wall are represented as an array of `points` on a 2D plane. 
Return the maximum number of points that are within or lie on any circular dartboard of radius `r`.


Example 1:
Input: points = [[-2,0],[2,0],[0,2],[0,-2]], r = 2
Output: 4
Explanation: Circle dartboard with center in (0,0) and radius = 2 contain all points.


Example 2:
Input: points = [[-3,0],[3,0],[2,6],[5,4],[0,9],[7,8]], r = 5
Output: 5
Explanation: Circle dartboard with center in (0,4) and radius = 5 contain all points except the point (7,8).


Example 3:
Input: points = [[-2,0],[2,0],[0,2],[0,-2]], r = 1
Output: 1

Example 4:
Input: points = [[1,2],[3,5],[1,-1],[2,3],[4,1],[1,3]], r = 2
Output: 4

Constraints:
`1 <= points.length <= 100`
`points[i].length == 2`
`-10^4 <= points[i][0], points[i][1] <= 10^4`
`1 <= r <= 5000`', false, 'Hard', NULL, 35.5, 
   0, 'https://leetcode.com/problems/maximum-number-of-darts-inside-of-a-circular-dartboard', 54, 3.9, 11, '["Facebook"]'::jsonb, '["Geometry"]'::jsonb, 
   86, 210, 29, true, '[]'::jsonb, true),
  (1454, 'Active Users', 'SQL Schema', true, 'Medium', NULL, 38.8, 
   4, 'https://leetcode.com/problems/active-users', 160, 11.7, 30.3, '["Amazon"]'::jsonb, '[]'::jsonb, 
   162, 17, 91, true, '[]'::jsonb, true),
  (1455, 'Check If a Word Occurs As a Prefix of Any Word in a Sentence', 'Given a `sentence` that consists of some words separated by a single space, and a `searchWord`.

You have to check if `searchWord` is a prefix of any word in `sentence`.

Return the index of the word in `sentence` where `searchWord` is a prefix of this word (1-indexed).

If `searchWord` is a prefix of more than one word, return the index of the first word (minimum index). If there is no such word return -1.

A prefix of a string `S` is any leading contiguous substring of `S`.


Example 1:
Input: sentence = "i love eating burger", searchWord = "burg"
Output: 4
Explanation: "burg" is prefix of "burger" which is the 4th word in the sentence.


Example 2:
Input: sentence = "this problem is an easy problem", searchWord = "pro"
Output: 2
Explanation: "pro" is prefix of "problem" which is the 2nd and the 6th word in the sentence, but we return 2 as it''s the minimal index.


Example 3:
Input: sentence = "i am tired", searchWord = "you"
Output: -1
Explanation: "you" is not a prefix of any word in the sentence.


Example 4:
Input: sentence = "i use triple pillow", searchWord = "pill"
Output: 4

Example 5:
Input: sentence = "hello from the other side", searchWord = "they"
Output: -1

Constraints:
`1 <= sentence.length <= 100`
`1 <= searchWord.length <= 10`
`sentence` consists of lowercase English letters and spaces.

`searchWord` consists of lowercase English letters.', false, 'Easy', NULL, 65.5, 
   0, 'https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence', 584, 34.9, 53.3, '["Yelp"]'::jsonb, '["String"]'::jsonb, 
   289, 8, 97, false, '[]'::jsonb, true),
  (1456, 'Maximum Number of Vowels in a Substring of Given Length', 'Given a string `s` and an integer `k`.

Return the maximum number of vowel letters in any substring of `s` with length `k`.

Vowel letters in English are (a, e, i, o, u).


Example 1:
Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.


Example 2:
Input: s = "aeiou", k = 2
Output: 2
Explanation: Any substring of length 2 contains 2 vowels.


Example 3:
Input: s = "leetcode", k = 3
Output: 2
Explanation: "lee", "eet" and "ode" contain 2 vowels.


Example 4:
Input: s = "rhythms", k = 4
Output: 0
Explanation: We can see that s doesn''t have any vowel letters.


Example 5:
Input: s = "tryhard", k = 4
Output: 1

Constraints:
`1 <= s.length <= 10^5`
`s` consists of lowercase English letters.

`1 <= k <= s.length`', false, 'Medium', NULL, 54.9, 
   9.4, 'https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length', 420, 28.2, 51.4, '["Amazon"]'::jsonb, '["String,Sliding Window"]'::jsonb, 
   386, 25, 94, true, '[]'::jsonb, true),
  (1457, 'Pseudo-Palindromic Paths in a Binary Tree', 'Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome.

Return the number of pseudo-palindromic paths going from the root node to leaf nodes.


Example 1:
Input: root = [2,3,1,3,1,null,1]
Output: 2 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the red path [2,3,3], the green path [2,1,1], and the path [2,3,1]. Among these paths only red path and green path are pseudo-palindromic paths since the red path [2,3,3] can be rearranged in [3,2,3] (palindrome) and the green path [2,1,1] can be rearranged in [1,2,1] (palindrome).


Example 2:
Input: root = [2,1,1,1,3,null,null,null,null,null,1]
Output: 1 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the green path [2,1,1], the path [2,1,3,1], and the path [2,1]. Among these paths only the green path is pseudo-palindromic since [2,1,1] can be rearranged in [1,2,1] (palindrome).


Example 3:
Input: root = [9]
Output: 1

Constraints:
The number of nodes in the tree is in the range `[1, 105]`.

`1 <= Node.val <= 9`', false, 'Medium', '/articles/pseudo-palindromic-paths-in-a-binary-tree', 70.1, 
   0, 'https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree', 478, 40.3, 57.5, '["Amazon"]'::jsonb, '["Bit Manipulation,Tree,Depth-first Search"]'::jsonb, 
   644, 21, 97, true, '[]'::jsonb, true),
  (1458, 'Max Dot Product of Two Subsequences', 'Given two arrays `nums1` and `nums2`.

Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.

A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, `[2,3,5]` is a subsequence of `[1,2,3,4,5]` while `[1,5,3]` is not).


Example 1:
Input: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
Output: 18
Explanation: Take subsequence [2,-2] from nums1 and subsequence [3,-6] from nums2.

Their dot product is (2*3 + (-2)*(-6)) = 18.


Example 2:
Input: nums1 = [3,-2], nums2 = [2,-6,7]
Output: 21
Explanation: Take subsequence [3] from nums1 and subsequence [7] from nums2.

Their dot product is (3*7) = 21.


Example 3:
Input: nums1 = [-1,-1], nums2 = [1,1]
Output: -1
Explanation: Take subsequence [-1] from nums1 and subsequence [1] from nums2.

Their dot product is -1.


Constraints:
`1 <= nums1.length, nums2.length <= 500`
`-1000 <= nums1[i], nums2[i] <= 1000`', false, 'Hard', NULL, 43.4, 
   7, 'https://leetcode.com/problems/max-dot-product-of-two-subsequences', 210, 12.6, 29, '["Microsoft"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   410, 10, 98, false, '[]'::jsonb, true),
  (1459, 'Rectangles Area', 'SQL Schema', true, 'Medium', NULL, 65.5, 
   0, 'https://leetcode.com/problems/rectangles-area', 89, 5.2, 7.9, '["Twitter"]'::jsonb, '[]'::jsonb, 
   31, 50, 38, false, '[]'::jsonb, true),
  (1460, 'Make Two Arrays Equal by Reversing Sub-arrays', 'Given two integer arrays of equal length `target` and `arr`.

In one step, you can select any non-empty sub-array of `arr` and reverse it. You are allowed to make any number of steps.

Return True if you can make `arr` equal to `target`, or False otherwise.


Example 1:
Input: target = [1,2,3,4], arr = [2,4,1,3]
Output: true
Explanation: You can follow the next steps to convert arr to target:
1- Reverse sub-array [2,4,1], arr becomes [1,4,2,3]
2- Reverse sub-array [4,2], arr becomes [1,2,4,3]
3- Reverse sub-array [4,3], arr becomes [1,2,3,4]
There are multiple ways to convert arr to target, this is not the only way to do so.


Example 2:
Input: target = [7], arr = [7]
Output: true
Explanation: arr is equal to target without any reverses.


Example 3:
Input: target = [1,12], arr = [12,1]
Output: true

Example 4:
Input: target = [3,7,9], arr = [3,7,11]
Output: false
Explanation: arr doesn''t have value 9 and it can never be converted to target.


Example 5:
Input: target = [1,1,1,1,1], arr = [1,1,1,1,1]
Output: true

Constraints:
`target.length == arr.length`
`1 <= target.length <= 1000`
`1 <= target[i] <= 1000`
`1 <= arr[i] <= 1000`', false, 'Easy', NULL, 72.2, 
   1.8, 'https://leetcode.com/problems/make-two-arrays-equal-by-reversing-sub-arrays', 532, 49.8, 69, '["Facebook"]'::jsonb, '["Array"]'::jsonb, 
   359, 76, 83, true, '[]'::jsonb, true),
  (1461, 'Check If a String Contains All Binary Codes of Size K', 'Given a binary string `s` and an integer `k`.

Return `true` if every binary code of length `k` is a substring of `s`. Otherwise, return `false`.


Example 1:
Input: s = "00110110", k = 2
Output: true
Explanation: The binary codes of length 2 are "00", "01", "10" and "11". They can be all found as substrings at indicies 0, 1, 3 and 2 respectively.


Example 2:
Input: s = "00110", k = 2
Output: true

Example 3:
Input: s = "0110", k = 1
Output: true
Explanation: The binary codes of length 1 are "0" and "1", it is clear that both exist as a substring. 

Example 4:
Input: s = "0110", k = 2
Output: false
Explanation: The binary code "00" is of length 2 and doesn''t exist in the array.


Example 5:
Input: s = "0000000001011100", k = 4
Output: false

Constraints:
`1 <= s.length <= 5 * 105`
`s[i]` is either `''0''` or `''1''`.

`1 <= k <= 20`', false, 'Medium', '/articles/check-if-a-string-contains-all-binary-codes-of-size-k', 54.3, 
   0.2, 'https://leetcode.com/problems/check-if-a-string-contains-all-binary-codes-of-size-k', 363, 40.8, 75.1, '["Google"]'::jsonb, '["String,Bit Manipulation"]'::jsonb, 
   518, 60, 90, true, '[]'::jsonb, true),
  (1462, 'Course Schedule IV', 'There are a total of `n` courses you have to take, labeled from `0` to `n-1`.

Some courses may have direct prerequisites, for example, to take course 0 you have first to take course 1, which is expressed as a pair: `[1,0]`
Given the total number of courses `n`, a list of direct `prerequisite` pairs and a list of `queries` pairs.

You should answer for each `queries[i]` whether the course `queries[i][0]` is a prerequisite of the course `queries[i][1]` or not.

Return a list of boolean, the answers to the given `queries`.

Please note that if course a is a prerequisite of course b and course b is a prerequisite of course c, then, course a is a prerequisite of course c.


Example 1:
Input: n = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
Output: [false,true]
Explanation: course 0 is not a prerequisite of course 1 but the opposite is true.


Example 2:
Input: n = 2, prerequisites = [], queries = [[1,0],[0,1]]
Output: [false,false]
Explanation: There are no prerequisites and each course is independent.


Example 3:
Input: n = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]
Output: [true,true]

Example 4:
Input: n = 3, prerequisites = [[1,0],[2,0]], queries = [[0,1],[2,0]]
Output: [false,true]

Example 5:
Input: n = 5, prerequisites = [[0,1],[1,2],[2,3],[3,4]], queries = [[0,4],[4,0],[1,3],[3,0]]
Output: [true,false,true,false]

Constraints:
`2 <= n <= 100`
`0 <= prerequisite.length <= (n * (n - 1) / 2)`
`0 <= prerequisite[i][0], prerequisite[i][1] < n`
`prerequisite[i][0] != prerequisite[i][1]`
The prerequisites graph has no cycles.

The prerequisites graph has no repeated edges.

`1 <= queries.length <= 10^4`
`queries[i][0] != queries[i][1]`', false, 'Medium', NULL, 44.7, 
   1.7, 'https://leetcode.com/problems/course-schedule-iv', 258, 16.9, 37.7, '["Amazon"]'::jsonb, '["Graph"]'::jsonb, 
   360, 16, 96, true, '[]'::jsonb, true),
  (1463, 'Cherry Pickup II', 'Given a `rows x cols` matrix `grid` representing a field of cherries. Each cell in `grid` represents the number of cherries that you can collect.

You have two robots that can collect cherries for you, Robot #1 is located at the top-left corner (0,0) , and Robot #2 is located at the top-right corner (0, cols-1) of the grid.

Return the maximum number of cherries collection using both robots  by following the rules below:
From a cell (i,j), robots can move to cell (i+1, j-1) , (i+1, j) or (i+1, j+1).

When any robot is passing through a cell, It picks it up all cherries, and the cell becomes an empty cell (0).

When both robots stay on the same cell, only one of them takes the cherries.

Both robots cannot move outside of the grid at any moment.

Both robots should reach the bottom row in the `grid`.


Example 1:
Input: grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
Output: 24
Explanation: Path of robot #1 and #2 are described in color green and blue respectively.

Cherries taken by Robot #1, (3 + 2 + 5 + 2) = 12.

Cherries taken by Robot #2, (1 + 5 + 5 + 1) = 12.

Total of cherries: 12 + 12 = 24.


Example 2:
Input: grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1,0,2,3,0,0,6]]
Output: 28
Explanation: Path of robot #1 and #2 are described in color green and blue respectively.

Cherries taken by Robot #1, (1 + 9 + 5 + 2) = 17.

Cherries taken by Robot #2, (1 + 3 + 4 + 3) = 11.

Total of cherries: 17 + 11 = 28.


Example 3:
Input: grid = [[1,0,0,3],[0,0,0,3],[0,0,3,3],[9,0,3,3]]
Output: 22

Example 4:
Input: grid = [[1,1],[1,1]]
Output: 4

Constraints:
`rows == grid.length`
`cols == grid[i].length`
`2 <= rows, cols <= 70`
`0 <= grid[i][j] <= 100 `', false, 'Hard', '/articles/cherry-pickup-ii', 68.8, 
   23.5, 'https://leetcode.com/problems/cherry-pickup-ii', 264, 26.3, 38.2, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   742, 9, 99, true, '[]'::jsonb, true),
  (1464, 'Maximum Product of Two Elements in an Array', 'Given the array of integers `nums`, you will choose two different indices `i` and `j` of that array. Return the maximum value of `(nums[i]-1)*(nums[j]-1)`.


Example 1:
Input: nums = [3,4,5,2]
Output: 12 
Explanation: If you choose the indices i=1 and j=2 (indexed from 0), you will get the maximum value, that is, (nums[1]-1)*(nums[2]-1) = (4-1)*(5-1) = 3*4 = 12. 

Example 2:
Input: nums = [1,5,4,5]
Output: 16
Explanation: Choosing the indices i=1 and j=3 (indexed from 0), you will get the maximum value of (5-1)*(5-1) = 16.


Example 3:
Input: nums = [3,7]
Output: 12

Constraints:
`2 <= nums.length <= 500`
`1 <= nums[i] <= 10^3`', false, 'Easy', NULL, 77.1, 
   2, 'https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array', 898, 77.5, 100.6, '["Samsung"]'::jsonb, '["Array"]'::jsonb, 
   403, 80, 83, false, '[]'::jsonb, true),
  (1465, 'Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts', 'Given a rectangular cake with height `h` and width `w`, and two arrays of integers `horizontalCuts` and `verticalCuts` where `horizontalCuts[i]` is the distance from the top of the rectangular cake to the `ith` horizontal cut and similarly, `verticalCuts[j]` is the distance from the left of the rectangular cake to the `jth` vertical cut.

Return the maximum area of a piece of cake after you cut at each horizontal and vertical position provided in the arrays `horizontalCuts` and `verticalCuts`. Since the answer can be a huge number, return this modulo 10^9 + 7.


Example 1:
Input: h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]
Output: 4 
Explanation: The figure above represents the given rectangular cake. Red lines are the horizontal and vertical cuts. After you cut the cake, the green piece of cake has the maximum area.


Example 2:
Input: h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]
Output: 6
Explanation: The figure above represents the given rectangular cake. Red lines are the horizontal and vertical cuts. After you cut the cake, the green and yellow pieces of cake have the maximum area.


Example 3:
Input: h = 5, w = 4, horizontalCuts = [3], verticalCuts = [3]
Output: 9

Constraints:
`2 <= h, w <= 10^9`
`1 <= horizontalCuts.length < min(h, 10^5)`
`1 <= verticalCuts.length < min(w, 10^5)`
`1 <= horizontalCuts[i] < h`
`1 <= verticalCuts[i] < w`
It is guaranteed that all elements in `horizontalCuts` are distinct.

It is guaranteed that all elements in `verticalCuts` are distinct.', false, 'Medium', NULL, 33.7, 
   80.7, 'https://leetcode.com/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts', 244, 25.1, 74.4, '["Amazon,Expedia,Roblox"]'::jsonb, '["Array"]'::jsonb, 
   284, 111, 72, true, '[]'::jsonb, true),
  (1466, 'Reorder Routes to Make All Paths Lead to the City Zero', 'There are `n` cities numbered from `0` to `n-1` and `n-1` roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.

Roads are represented by `connections` where `connections[i] = [a, b]` represents a road from city `a` to `b`.

This year, there will be a big event in the capital (city 0), and many people want to travel to this city.

Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.

It''s guaranteed that each city can reach the city 0 after reorder.


Example 1:
Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
Output: 3
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).


Example 2:
Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
Output: 2
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).


Example 3:
Input: n = 3, connections = [[1,0],[2,0]]
Output: 0

Constraints:
`2 <= n <= 5 * 10^4`
`connections.length == n-1`
`connections[i].length == 2`
`0 <= connections[i][0], connections[i][1] <= n-1`
`connections[i][0] != connections[i][1]`', false, 'Medium', NULL, 62, 
   12.1, 'https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero', 414, 28.3, 45.6, '["Microsoft"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   621, 16, 97, false, '[]'::jsonb, true),
  (1467, 'Probability of a Two Boxes Having The Same Number of Distinct Balls', 'Given `2n` balls of `k` distinct colors. You will be given an integer array `balls` of size `k` where `balls[i]` is the number of balls of color `i`. 
All the balls will be shuffled uniformly at random, then we will distribute the first `n` balls to the first box and the remaining `n` balls to the other box (Please read the explanation of the second example carefully).

Please note that the two boxes are considered different. For example, if we have two balls of colors `a` and `b`, and two boxes `[]` and `()`, then the distribution `[a] (b)` is considered different than the distribution `[b] (a) `(Please read the explanation of the first example carefully).

We want to calculate the probability that the two boxes have the same number of distinct balls.


Example 1:
Input: balls = [1,1]
Output: 1.00000
Explanation: Only 2 ways to divide the balls equally:
- A ball of color 1 to box 1 and a ball of color 2 to box 2
- A ball of color 2 to box 1 and a ball of color 1 to box 2
In both ways, the number of distinct colors in each box is equal. The probability is 2/2 = 1

Example 2:
Input: balls = [2,1,1]
Output: 0.66667
Explanation: We have the set of balls [1, 1, 2, 3]
This set of balls will be shuffled randomly and we may have one of the 12 distinct shuffles with equale probability (i.e. 1/12):
[1,1 / 2,3], [1,1 / 3,2], [1,2 / 1,3], [1,2 / 3,1], [1,3 / 1,2], [1,3 / 2,1], [2,1 / 1,3], [2,1 / 3,1], [2,3 / 1,1], [3,1 / 1,2], [3,1 / 2,1], [3,2 / 1,1]
After that we add the first two balls to the first box and the second two balls to the second box.

We can see that 8 of these 12 possible random distributions have the same number of distinct colors of balls in each box.

Probability is 8/12 = 0.66667

Example 3:
Input: balls = [1,2,1,2]
Output: 0.60000
Explanation: The set of balls is [1, 2, 2, 3, 4, 4]. It is hard to display all the 180 possible random shuffles of this set but it is easy to check that 108 of them will have the same number of distinct colors in each box.

Probability = 108 / 180 = 0.6

Example 4:
Input: balls = [3,2,1]
Output: 0.30000
Explanation: The set of balls is [1, 1, 1, 2, 2, 3]. It is hard to display all the 60 possible random shuffles of this set but it is easy to check that 18 of them will have the same number of distinct colors in each box.

Probability = 18 / 60 = 0.3

Example 5:
Input: balls = [6,6,6,6,6,6]
Output: 0.90327

Constraints:
`1 <= balls.length <= 8`
`1 <= balls[i] <= 6`
`sum(balls)` is even.

Answers within `10^-5` of the actual value will be accepted as correct.', false, 'Hard', NULL, 61, 
   14.2, 'https://leetcode.com/problems/probability-of-a-two-boxes-having-the-same-number-of-distinct-balls', 76, 5, 8.1, '[]'::jsonb, '[]'::jsonb, 
   156, 119, 57, false, '[]'::jsonb, true),
  (1468, 'Calculate Salaries', 'SQL Schema', true, 'Medium', NULL, 82.2, 
   0, 'https://leetcode.com/problems/calculate-salaries', 179, 7.8, 9.5, '["Startup"]'::jsonb, '[]'::jsonb, 
   44, 9, 83, false, '[]'::jsonb, true),
  (1469, 'Find All The Lonely Nodes', 'In a binary tree, a lonely node is a node that is the only child of its parent node. The root of the tree is not lonely because it does not have a parent node.

Given the `root` of a binary tree, return an array containing the values of all lonely nodes in the tree. Return the list in any order.


Example 1:
Input: root = [1,2,3,null,4]
Output: [4]
Explanation: Light blue node is the only lonely node.

Node 1 is the root and is not lonely.

Nodes 2 and 3 have the same parent and are not lonely.


Example 2:
Input: root = [7,1,4,6,null,5,3,null,null,null,null,null,2]
Output: [6,2]
Explanation: Light blue nodes are lonely nodes.

Please remember that order doesn''t matter, [2,6] is also an acceptable answer.


Example 3:
Input: root = [11,99,88,77,null,null,66,55,null,null,44,33,null,null,22]
Output: [77,55,33,66,44,22]
Explanation: Nodes 99 and 88 share the same parent. Node 11 is the root.

All other nodes are lonely.


Example 4:
Input: root = [197]
Output: []

Example 5:
Input: root = [31,null,78,null,28]
Output: [78,28]

Constraints:
The number of nodes in the `tree` is in the range `[1, 1000].`
Each node''s value is between `[1, 10^6]`.', true, 'Easy', NULL, 80.5, 
   0, 'https://leetcode.com/problems/find-all-the-lonely-nodes', 287, 17.1, 21.2, '["Microsoft"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   223, 4, 98, false, '[]'::jsonb, true),
  (1470, 'Shuffle the Array', 'Given the array `nums` consisting of `2n` elements in the form `[x1,x2,...,xn,y1,y2,...,yn]`.

Return the array in the form `[x1,y1,x2,y2,...,xn,yn]`.


Example 1:
Input: nums = [2,5,1,3,4,7], n = 3
Output: [2,3,5,4,1,7] 
Explanation: Since x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 then the answer is [2,3,5,4,1,7].


Example 2:
Input: nums = [1,2,3,4,4,3,2,1], n = 4
Output: [1,4,2,3,3,2,4,1]

Example 3:
Input: nums = [1,1,2,2], n = 2
Output: [1,2,1,2]

Constraints:
`1 <= n <= 500`
`nums.length == 2n`
`1 <= nums[i] <= 10^3`', false, 'Easy', NULL, 88.2, 
   33.6, 'https://leetcode.com/problems/shuffle-the-array', 999, 187.8, 213.1, '["Apple,Bloomberg"]'::jsonb, '["Array"]'::jsonb, 
   1080, 121, 90, true, '[]'::jsonb, true),
  (1471, 'The k Strongest Values in an Array', 'Given an array of integers `arr` and an integer `k`.

A value `arr[i]` is said to be stronger than a value `arr[j]` if `|arr[i] - m| > |arr[j] - m|` where `m` is the median of the array.

If `|arr[i] - m| == |arr[j] - m|`, then `arr[i]` is said to be stronger than `arr[j]` if `arr[i] > arr[j]`.

Return a list of the strongest `k` values in the array. return the answer in any arbitrary order.

Median is the middle value in an ordered integer list. More formally, if the length of the list is n, the median is the element in position `((n - 1) / 2)` in the sorted list (0-indexed).

For `arr = [6, -3, 7, 2, 11]`, `n = 5` and the median is obtained by sorting the array `arr = [-3, 2, 6, 7, 11]` and the median is `arr[m]` where `m = ((5 - 1) / 2) = 2`. The median is `6`.

For `arr = [-7, 22, 17, 3]`, `n = 4` and the median is obtained by sorting the array `arr = [-7, 3, 17, 22]` and the median is `arr[m]` where `m = ((4 - 1) / 2) = 1`. The median is `3`.


Example 1:
Input: arr = [1,2,3,4,5], k = 2
Output: [5,1]
Explanation: Median is 3, the elements of the array sorted by the strongest are [5,1,4,2,3]. The strongest 2 elements are [5, 1]. [1, 5] is also accepted answer.

Please note that although |5 - 3| == |1 - 3| but 5 is stronger than 1 because 5 > 1.


Example 2:
Input: arr = [1,1,3,5,5], k = 2
Output: [5,5]
Explanation: Median is 3, the elements of the array sorted by the strongest are [5,5,1,1,3]. The strongest 2 elements are [5, 5].


Example 3:
Input: arr = [6,7,11,7,6,8], k = 5
Output: [11,8,6,6,7]
Explanation: Median is 7, the elements of the array sorted by the strongest are [11,8,6,6,7,7].

Any permutation of [11,8,6,6,7] is accepted.


Example 4:
Input: arr = [6,-3,7,2,11], k = 3
Output: [-3,11,2]

Example 5:
Input: arr = [-7,22,17,3], k = 2
Output: [22,17]

Constraints:
`1 <= arr.length <= 10^5`
`-10^5 <= arr[i] <= 10^5`
`1 <= k <= arr.length`', false, 'Medium', NULL, 58.5, 
   4.6, 'https://leetcode.com/problems/the-k-strongest-values-in-an-array', 286, 21.3, 36.3, '["Google"]'::jsonb, '["Array,Sort"]'::jsonb, 
   240, 70, 77, true, '[]'::jsonb, true),
  (1472, 'Design Browser History', 'You have a browser of one tab where you start on the `homepage` and you can visit another `url`, get back in the history number of `steps` or move forward in the history number of `steps`.

Implement the `BrowserHistory` class:
`BrowserHistory(string homepage)` Initializes the object with the `homepage` of the browser.

`void visit(string url)` Visits `url` from the current page. It clears up all the forward history.

`string back(int steps)` Move `steps` back in history. If you can only return `x` steps in the history and `steps > x`, you will return only `x` steps. Return the current `url` after moving back in history at most `steps`.

`string forward(int steps)` Move `steps` forward in history. If you can only forward `x` steps in the history and `steps > x`, you will forward only `x` steps. Return the current `url` after forwarding in history at most `steps`.


Example:
Input:
["BrowserHistory","visit","visit","visit","back","back","forward","visit","forward","back","back"]
[["leetcode.com"],["google.com"],["facebook.com"],["youtube.com"],[1],[1],[1],["linkedin.com"],[2],[2],[7]]
Output:
[null,null,null,null,"facebook.com","google.com","facebook.com",null,"linkedin.com","google.com","leetcode.com"]
Explanation:
BrowserHistory browserHistory = new BrowserHistory("leetcode.com");
browserHistory.visit("google.com");       // You are in "leetcode.com". Visit "google.com"
browserHistory.visit("facebook.com");     // You are in "google.com". Visit "facebook.com"
browserHistory.visit("youtube.com");      // You are in "facebook.com". Visit "youtube.com"
browserHistory.back(1);                   // You are in "youtube.com", move back to "facebook.com" return "facebook.com"
browserHistory.back(1);                   // You are in "facebook.com", move back to "google.com" return "google.com"
browserHistory.forward(1);                // You are in "google.com", move forward to "facebook.com" return "facebook.com"
browserHistory.visit("linkedin.com");     // You are in "facebook.com". Visit "linkedin.com"
browserHistory.forward(2);                // You are in "linkedin.com", you cannot move forward any steps.

browserHistory.back(2);                   // You are in "linkedin.com", move back two steps to "facebook.com" then to "google.com". return "google.com"
browserHistory.back(7);                   // You are in "google.com", you can move back only one step to "leetcode.com". return "leetcode.com"

Constraints:
`1 <= homepage.length <= 20`
`1 <= url.length <= 20`
`1 <= steps <= 100`
`homepage` and `url` consist of  ''.'' or lower case English letters.

At most `5000` calls will be made to `visit`, `back`, and `forward`.', false, 'Medium', NULL, 71.9, 
   66.4, 'https://leetcode.com/problems/design-browser-history', 469, 34.4, 47.8, '["Bloomberg,DoorDash,Roblox"]'::jsonb, '["Design"]'::jsonb, 
   454, 60, 88, false, '[]'::jsonb, true),
  (1473, 'Paint House III', 'There is a row of `m` houses in a small city, each house must be painted with one of the `n` colors (labeled from `1` to `n`), some houses that have been painted last summer should not be painted again.

A neighborhood is a maximal group of continuous houses that are painted with the same color.

For example: `houses = [1,2,2,3,3,2,1,1]` contains `5` neighborhoods `[{1}, {2,2}, {3,3}, {2}, {1,1}]`.

Given an array `houses`, an `m x n` matrix `cost` and an integer `target` where:
`houses[i]`: is the color of the house `i`, and `0` if the house is not painted yet.

`cost[i][j]`: is the cost of paint the house `i` with the color `j + 1`.

Return the minimum cost of painting all the remaining houses in such a way that there are exactly `target` neighborhoods. If it is not possible, return `-1`.


Example 1:
Input: houses = [0,0,0,0,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3
Output: 9
Explanation: Paint houses of this way [1,2,2,1,1]
This array contains target = 3 neighborhoods, [{1}, {2,2}, {1,1}].

Cost of paint all houses (1 + 1 + 1 + 1 + 5) = 9.


Example 2:
Input: houses = [0,2,1,2,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3
Output: 11
Explanation: Some houses are already painted, Paint the houses of this way [2,2,1,2,2]
This array contains target = 3 neighborhoods, [{2,2}, {1}, {2,2}]. 
Cost of paint the first and last house (10 + 1) = 11.


Example 3:
Input: houses = [0,0,0,0,0], cost = [[1,10],[10,1],[1,10],[10,1],[1,10]], m = 5, n = 2, target = 5
Output: 5

Example 4:
Input: houses = [3,1,2,3], cost = [[1,1,1],[1,1,1],[1,1,1],[1,1,1]], m = 4, n = 3, target = 3
Output: -1
Explanation: Houses are already painted with a total of 4 neighborhoods [{3},{1},{2},{3}] different of target = 3.


Constraints:
`m == houses.length == cost.length`
`n == cost[i].length`
`1 <= m <= 100`
`1 <= n <= 20`
`1 <= target <= m`
`0 <= houses[i] <= n`
`1 <= cost[i][j] <= 10^4`', false, 'Hard', NULL, 48.5, 
   18.1, 'https://leetcode.com/problems/paint-house-iii', 164, 8.7, 18, '["Paypal"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   335, 19, 95, false, '[]'::jsonb, true),
  (1474, 'Delete N Nodes After M Nodes of a Linked List', 'Given the `head` of a linked list and two integers `m` and `n`. Traverse the linked list and remove some nodes in the following way:
Start with the head as the current node.

Keep the first `m` nodes starting with the current node.

Remove the next `n` nodes
Keep repeating steps 2 and 3 until you reach the end of the list.

Return the head of the modified list after removing the mentioned nodes.

Follow up question: How can you solve this problem by modifying the list in-place?

Example 1:
Input: head = [1,2,3,4,5,6,7,8,9,10,11,12,13], m = 2, n = 3
Output: [1,2,6,7,11,12]
Explanation: Keep the first (m = 2) nodes starting from the head of the linked List  (1 ->2) show in black nodes.

Delete the next (n = 3) nodes (3 -> 4 -> 5) show in read nodes.

Continue with the same procedure until reaching the tail of the Linked List.

Head of linked list after removing nodes is returned.


Example 2:
Input: head = [1,2,3,4,5,6,7,8,9,10,11], m = 1, n = 3
Output: [1,5,9]
Explanation: Head of linked list after removing nodes is returned.


Example 3:
Input: head = [1,2,3,4,5,6,7,8,9,10,11], m = 3, n = 1
Output: [1,2,3,5,6,7,9,10,11]

Example 4:
Input: head = [9,3,7,7,9,10,8,2], m = 1, n = 2
Output: [9,7,8]

Constraints:
The given linked list will contain between `1` and `10^4` nodes.

The value of each node in the linked list will be in the range` [1, 10^6]`.

`1 <= m,n <= 1000`', true, 'Easy', '/articles/delete-n-nodes-after-m-nodes-of-a-linked-list', 73.9, 
   0, 'https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list', 193, 10.7, 14.6, '["Microsoft"]'::jsonb, '["Linked List"]'::jsonb, 
   175, 4, 98, false, '[]'::jsonb, true),
  (1475, 'Final Prices With a Special Discount in a Shop', 'Given the array `prices` where `prices[i]` is the price of the `ith` item in a shop. There is a special discount for items in the shop, if you buy the `ith` item, then you will receive a discount equivalent to `prices[j]` where `j` is the minimum index such that `j > i` and `prices[j] <= prices[i]`, otherwise, you will not receive any discount at all.

Return an array where the `ith` element is the final price you will pay for the `ith` item of the shop considering the special discount.


Example 1:
Input: prices = [8,4,6,2,3]
Output: [4,2,4,2,3]
Explanation: 
For item 0 with price[0]=8 you will receive a discount equivalent to prices[1]=4, therefore, the final price you will pay is 8 - 4 = 4. 
For item 1 with price[1]=4 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 4 - 2 = 2. 
For item 2 with price[2]=6 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 6 - 2 = 4. 
For items 3 and 4 you will not receive any discount at all.


Example 2:
Input: prices = [1,2,3,4,5]
Output: [1,2,3,4,5]
Explanation: In this case, for all items, you will not receive any discount at all.


Example 3:
Input: prices = [10,1,1,6]
Output: [9,0,1,6]

Constraints:
`1 <= prices.length <= 500`
`1 <= prices[i] <= 10^3`', false, 'Easy', NULL, 75, 
   3, 'https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop', 487, 42.1, 56.1, '["Dream11"]'::jsonb, '["Array"]'::jsonb, 
   437, 39, 92, false, '[]'::jsonb, true),
  (1476, 'Subrectangle Queries', 'Implement the class `SubrectangleQueries` which receives a `rows x cols` rectangle as a matrix of integers in the constructor and supports two methods:
1.` updateSubrectangle(int row1, int col1, int row2, int col2, int newValue)`
Updates all values with `newValue` in the subrectangle whose upper left coordinate is `(row1,col1)` and bottom right coordinate is `(row2,col2)`.

2.` getValue(int row, int col)`
Returns the current value of the coordinate `(row,col)` from the rectangle.


Example 1:
Input
["SubrectangleQueries","getValue","updateSubrectangle","getValue","getValue","updateSubrectangle","getValue","getValue"]
[[[[1,2,1],[4,3,4],[3,2,1],[1,1,1]]],[0,2],[0,0,3,2,5],[0,2],[3,1],[3,0,3,2,10],[3,1],[0,2]]
Output
[null,1,null,5,5,null,10,5]
Explanation
SubrectangleQueries subrectangleQueries = new SubrectangleQueries([[1,2,1],[4,3,4],[3,2,1],[1,1,1]]);  
// The initial rectangle (4x3) looks like:
// 1 2 1
// 4 3 4
// 3 2 1
// 1 1 1
subrectangleQueries.getValue(0, 2); // return 1
subrectangleQueries.updateSubrectangle(0, 0, 3, 2, 5);
// After this update the rectangle looks like:
// 5 5 5
// 5 5 5
// 5 5 5
// 5 5 5 
subrectangleQueries.getValue(0, 2); // return 5
subrectangleQueries.getValue(3, 1); // return 5
subrectangleQueries.updateSubrectangle(3, 0, 3, 2, 10);
// After this update the rectangle looks like:
// 5   5   5
// 5   5   5
// 5   5   5
// 10  10  10 
subrectangleQueries.getValue(3, 1); // return 10
subrectangleQueries.getValue(0, 2); // return 5

Example 2:
Input
["SubrectangleQueries","getValue","updateSubrectangle","getValue","getValue","updateSubrectangle","getValue"]
[[[[1,1,1],[2,2,2],[3,3,3]]],[0,0],[0,0,2,2,100],[0,0],[2,2],[1,1,2,2,20],[2,2]]
Output
[null,1,null,100,100,null,20]
Explanation
SubrectangleQueries subrectangleQueries = new SubrectangleQueries([[1,1,1],[2,2,2],[3,3,3]]);
subrectangleQueries.getValue(0, 0); // return 1
subrectangleQueries.updateSubrectangle(0, 0, 2, 2, 100);
subrectangleQueries.getValue(0, 0); // return 100
subrectangleQueries.getValue(2, 2); // return 100
subrectangleQueries.updateSubrectangle(1, 1, 2, 2, 20);
subrectangleQueries.getValue(2, 2); // return 20

Constraints:
There will be at most `500` operations considering both methods: `updateSubrectangle` and `getValue`.

`1 <= rows, cols <= 100`
`rows == rectangle.length`
`cols == rectangle[i].length`
`0 <= row1 <= row2 < rows`
`0 <= col1 <= col2 < cols`
`1 <= newValue, rectangle[i][j] <= 10^9`
`0 <= row < rows`
`0 <= col < cols`', false, 'Medium', NULL, 88, 
   6.3, 'https://leetcode.com/problems/subrectangle-queries', 233, 39.8, 45.2, '["Nuro"]'::jsonb, '["Array"]'::jsonb, 
   184, 518, 26, false, '[]'::jsonb, true),
  (1477, 'Find Two Non-overlapping Sub-arrays Each With Target Sum', 'Given an array of integers `arr` and an integer `target`.

You have to find two non-overlapping sub-arrays of `arr` each with sum equal `target`. There can be multiple answers so you have to find an answer where the sum of the lengths of the two sub-arrays is minimum.

Return the minimum sum of the lengths of the two required sub-arrays, or return -1 if you cannot find such two sub-arrays.


Example 1:
Input: arr = [3,2,2,4,3], target = 3
Output: 2
Explanation: Only two sub-arrays have sum = 3 ([3] and [3]). The sum of their lengths is 2.


Example 2:
Input: arr = [7,3,4,7], target = 7
Output: 2
Explanation: Although we have three non-overlapping sub-arrays of sum = 7 ([7], [3,4] and [7]), but we will choose the first and third sub-arrays as the sum of their lengths is 2.


Example 3:
Input: arr = [4,3,2,6,2,3,4], target = 6
Output: -1
Explanation: We have only one sub-array of sum = 6.


Example 4:
Input: arr = [5,5,4,4,5], target = 3
Output: -1
Explanation: We cannot find a sub-array of sum = 3.


Example 5:
Input: arr = [3,1,1,1,5,1,2,1], target = 3
Output: 3
Explanation: Note that sub-arrays [1,2] and [2,1] cannot be an answer because they overlap.


Constraints:
`1 <= arr.length <= 10^5`
`1 <= arr[i] <= 1000`
`1 <= target <= 10^8`', false, 'Medium', NULL, 34.9, 
   21, 'https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum', 245, 23.5, 67.2, '["Google,ByteDance"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   722, 39, 95, true, '[]'::jsonb, true),
  (1478, 'Allocate Mailboxes', 'Given the array `houses` and an integer `k`. where `houses[i]` is the location of the ith house along a street, your task is to allocate `k` mailboxes in the street.

Return the minimum total distance between each house and its nearest mailbox.

The answer is guaranteed to fit in a 32-bit signed integer.


Example 1:
Input: houses = [1,4,8,10,20], k = 3
Output: 5
Explanation: Allocate mailboxes in position 3, 9 and 20.

Minimum total distance from each houses to nearest mailboxes is |3-1| + |4-3| + |9-8| + |10-9| + |20-20| = 5 

Example 2:
Input: houses = [2,3,5,12,18], k = 2
Output: 9
Explanation: Allocate mailboxes in position 3 and 14.

Minimum total distance from each houses to nearest mailboxes is |2-3| + |3-3| + |5-3| + |12-14| + |18-14| = 9.


Example 3:
Input: houses = [7,4,6,1], k = 1
Output: 8

Example 4:
Input: houses = [3,6,14,10], k = 4
Output: 0

Constraints:
`n == houses.length`
`1 <= n <= 100`
`1 <= houses[i] <= 10^4`
`1 <= k <= n`
Array `houses` contain unique integers.', false, 'Hard', NULL, 53.8, 
   18.8, 'https://leetcode.com/problems/allocate-mailboxes', 93, 8.4, 15.7, '["Bloomberg"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   428, 7, 98, false, '[]'::jsonb, true),
  (1479, 'Sales by Day of the Week', 'SQL Schema', true, 'Hard', NULL, 83.3, 
   6.2, 'https://leetcode.com/problems/sales-by-day-of-the-week', 141, 7, 8.4, '["Amazon"]'::jsonb, '[]'::jsonb, 
   56, 19, 75, true, '[]'::jsonb, true),
  (1480, 'Running Sum of 1d Array', 'Given an array `nums`. We define a running sum of an array as `runningSum[i] = sum(nums[0]...nums[i])`.

Return the running sum of `nums`.


Example 1:
Input: nums = [1,2,3,4]
Output: [1,3,6,10]
Explanation: Running sum is obtained as follows: [1, 1+2, 1+2+3, 1+2+3+4].


Example 2:
Input: nums = [1,1,1,1,1]
Output: [1,2,3,4,5]
Explanation: Running sum is obtained as follows: [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1].


Example 3:
Input: nums = [3,1,2,10,1]
Output: [3,4,6,16,17]

Constraints:
`1 <= nums.length <= 1000`
`-10^6 <= nums[i] <= 10^6`', false, 'Easy', '/articles/running-sum-of-1d-array', 88.6, 
   52, 'https://leetcode.com/problems/running-sum-of-1d-array', 999, 293.6, 331.3, '["Apple,Amazon,Adobe,Bloomberg"]'::jsonb, '["Array"]'::jsonb, 
   1168, 113, 91, true, '[]'::jsonb, true),
  (1481, 'Least Number of Unique Integers after K Removals', 'Given an array of integers `arr` and an integer `k`. Find the least number of unique integers after removing exactly `k` elements.


Example 1:
Input: arr = [5,5,4], k = 1
Output: 1
Explanation: Remove the single 4, only 5 is left.


Example 2:
Input: arr = [4,3,1,1,3,3,2], k = 3
Output: 2
Explanation: Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be left.


Constraints:
`1 <= arr.length <= 10^5`
`1 <= arr[i] <= 10^9`
`0 <= k <= arr.length`', false, 'Medium', NULL, 55.9, 
   47, 'https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals', 329, 31.1, 55.6, '["Amazon,Roblox,Oracle,Expedia"]'::jsonb, '["Array,Sort"]'::jsonb, 
   343, 37, 90, true, '[]'::jsonb, true),
  (1482, 'Minimum Number of Days to Make m Bouquets', 'Given an integer array `bloomDay`, an integer `m` and an integer `k`.

We need to make `m` bouquets. To make a bouquet, you need to use `k` adjacent flowers from the garden.

The garden consists of `n` flowers, the `ith` flower will bloom in the `bloomDay[i]` and then can be used in exactly one bouquet.

Return the minimum number of days you need to wait to be able to make `m` bouquets from the garden. If it is impossible to make `m` bouquets return -1.


Example 1:
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Let''s see what happened in the first three days. x means flower bloomed and _ means flower didn''t bloom in the garden.

We need 3 bouquets each should contain 1 flower.

After day 1: [x, _, _, _, _]   // we can only make one bouquet.

After day 2: [x, _, _, _, x]   // we can only make two bouquets.

After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.


Example 2:
Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
Output: -1
Explanation: We need 3 bouquets each has 2 flowers, that means we need 6 flowers. We only have 5 flowers so it is impossible to get the needed bouquets and we return -1.


Example 3:
Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
Output: 12
Explanation: We need 2 bouquets each should have 3 flowers.

Here''s the garden after the 7 and 12 days:
After day 7: [x, x, x, x, _, x, x]
We can make one bouquet of the first three flowers that bloomed. We cannot make another bouquet from the last three flowers that bloomed because they are not adjacent.

After day 12: [x, x, x, x, x, x, x]
It is obvious that we can make two bouquets in different ways.


Example 4:
Input: bloomDay = [1000000000,1000000000], m = 1, k = 1
Output: 1000000000
Explanation: You need to wait 1000000000 days to have a flower ready for a bouquet.


Example 5:
Input: bloomDay = [1,10,2,9,3,8,4,7,5,6], m = 4, k = 2
Output: 9

Constraints:
`bloomDay.length == n`
`1 <= n <= 10^5`
`1 <= bloomDay[i] <= 10^9`
`1 <= m <= 10^6`
`1 <= k <= n`', false, 'Medium', NULL, 50.6, 
   16.2, 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets', 226, 20, 39.5, '["Google"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   809, 20, 98, true, '[]'::jsonb, true),
  (1483, 'Kth Ancestor of a Tree Node', 'You are given a tree with `n` nodes numbered from `0` to `n-1` in the form of a parent array where `parent[i]` is the parent of node `i`. The root of the tree is node `0`.

Implement the function `getKthAncestor``(int node, int k)` to return the `k`-th ancestor of the given `node`. If there is no such ancestor, return `-1`.

The k-th ancestor of a tree node is the `k`-th node in the path from that node to the root.


Example:
Input:
["TreeAncestor","getKthAncestor","getKthAncestor","getKthAncestor"]
[[7,[-1,0,0,1,1,2,2]],[3,1],[5,2],[6,3]]
Output:
[null,1,0,-1]
Explanation:
TreeAncestor treeAncestor = new TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2]);
treeAncestor.getKthAncestor(3, 1);  // returns 1 which is the parent of 3
treeAncestor.getKthAncestor(5, 2);  // returns 0 which is the grandparent of 5
treeAncestor.getKthAncestor(6, 3);  // returns -1 because there is no such ancestor

Constraints:
`1 <= k <= n <= 5*10^4`
`parent[0] == -1` indicating that `0` is the root node.

`0 <= parent[i] < n` for all `0 < i < n`
`0 <= node < n`
There will be at most `5*10^4` queries.', false, 'Hard', NULL, 31.4, 
   9.8, 'https://leetcode.com/problems/kth-ancestor-of-a-tree-node', 154, 11.7, 37.1, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   425, 57, 88, true, '[]'::jsonb, true),
  (1484, 'Group Sold Products By The Date', 'SQL Schema', true, 'Easy', NULL, 85.2, 
   0, 'https://leetcode.com/problems/group-sold-products-by-the-date', 69, 11, 12.9, '["Startup"]'::jsonb, '[]'::jsonb, 
   115, 6, 95, false, '[]'::jsonb, true),
  (1485, 'Clone Binary Tree With Random Pointer', 'A binary tree is given such that each node contains an additional random pointer which could point to any node in the tree or null.

Return a deep copy of the tree.

The tree is represented in the same input/output way as normal binary trees where each node is represented as a pair of `[val, random_index]` where:
`val`: an integer representing `Node.val`
`random_index`: the index of the node (in the input) where the random pointer points to, or `null` if it does not point to any node.

You will be given the tree in class `Node` and you should return the cloned tree in class `NodeCopy`. `NodeCopy` class is just a clone of `Node` class with the same attributes and constructors.


Example 1:
Input: root = [[1,null],null,[4,3],[7,0]]
Output: [[1,null],null,[4,3],[7,0]]
Explanation: The original binary tree is [1,null,4,7].

The random pointer of node one is null, so it is represented as [1, null].

The random pointer of node 4 is node 7, so it is represented as [4, 3] where 3 is the index of node 7 in the array representing the tree.

The random pointer of node 7 is node 1, so it is represented as [7, 0] where 0 is the index of node 1 in the array representing the tree.


Example 2:
Input: root = [[1,4],null,[1,0],null,[1,5],[1,5]]
Output: [[1,4],null,[1,0],null,[1,5],[1,5]]
Explanation: The random pointer of a node can be the node itself.


Example 3:
Input: root = [[1,6],[2,5],[3,4],[4,3],[5,2],[6,1],[7,0]]
Output: [[1,6],[2,5],[3,4],[4,3],[5,2],[6,1],[7,0]]

Example 4:
Input: root = []
Output: []

Example 5:
Input: root = [[1,null],null,[2,null],null,[1,null]]
Output: [[1,null],null,[2,null],null,[1,null]]

Constraints:
The number of nodes in the `tree` is in the range `[0, 1000].`
Each node''s value is between `[1, 10^6]`.', true, 'Medium', '/articles/clone-binary-tree-with-random-pointer', 79.5, 
   9.9, 'https://leetcode.com/problems/clone-binary-tree-with-random-pointer', 123, 8.4, 10.6, '["Bloomberg"]'::jsonb, '["Hash Table,Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   151, 28, 84, false, '[]'::jsonb, true),
  (1486, 'XOR Operation in an Array', 'Given an integer `n` and an integer `start`.

Define an array `nums` where `nums[i] = start + 2*i` (0-indexed) and `n == nums.length`.

Return the bitwise XOR of all elements of `nums`.


Example 1:
Input: n = 5, start = 0
Output: 8
Explanation: Array nums is equal to [0, 2, 4, 6, 8] where (0 ^ 2 ^ 4 ^ 6 ^ 8) = 8.

Where "^" corresponds to bitwise XOR operator.


Example 2:
Input: n = 4, start = 3
Output: 8
Explanation: Array nums is equal to [3, 5, 7, 9] where (3 ^ 5 ^ 7 ^ 9) = 8.


Example 3:
Input: n = 1, start = 7
Output: 7

Example 4:
Input: n = 10, start = 5
Output: 2

Constraints:
`1 <= n <= 1000`
`0 <= start <= 1000`
`n == nums.length`', false, 'Easy', NULL, 84, 
   10.2, 'https://leetcode.com/problems/xor-operation-in-an-array', 942, 81.8, 97.4, '["Walmart Labs"]'::jsonb, '["Array,Bit Manipulation"]'::jsonb, 
   450, 204, 69, false, '[]'::jsonb, true),
  (1487, 'Making File Names Unique', 'Given an array of strings `names` of size `n`. You will create `n` folders in your file system such that, at the `ith` minute, you will create a folder with the name `names[i]`.

Since two files cannot have the same name, if you enter a folder name which is previously used, the system will have a suffix addition to its name in the form of `(k)`, where, `k` is the smallest positive integer such that the obtained name remains unique.

Return an array of strings of length `n` where `ans[i]` is the actual name the system will assign to the `ith` folder when you create it.


Example 1:
Input: names = ["pes","fifa","gta","pes(2019)"]
Output: ["pes","fifa","gta","pes(2019)"]
Explanation: Let''s see how the file system creates folder names:
"pes" --> not assigned before, remains "pes"
"fifa" --> not assigned before, remains "fifa"
"gta" --> not assigned before, remains "gta"
"pes(2019)" --> not assigned before, remains "pes(2019)"

Example 2:
Input: names = ["gta","gta(1)","gta","avalon"]
Output: ["gta","gta(1)","gta(2)","avalon"]
Explanation: Let''s see how the file system creates folder names:
"gta" --> not assigned before, remains "gta"
"gta(1)" --> not assigned before, remains "gta(1)"
"gta" --> the name is reserved, system adds (k), since "gta(1)" is also reserved, systems put k = 2. it becomes "gta(2)"
"avalon" --> not assigned before, remains "avalon"

Example 3:
Input: names = ["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece"]
Output: ["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece(4)"]
Explanation: When the last folder is created, the smallest positive valid k is 4, and it becomes "onepiece(4)".


Example 4:
Input: names = ["wano","wano","wano","wano"]
Output: ["wano","wano(1)","wano(2)","wano(3)"]
Explanation: Just increase the value of k each time you create folder "wano".


Example 5:
Input: names = ["kaido","kaido(1)","kaido","kaido(1)"]
Output: ["kaido","kaido(1)","kaido(2)","kaido(1)(1)"]
Explanation: Please note that system adds the suffix (k) to current name even it contained the same suffix before.


Constraints:
`1 <= names.length <= 5 * 10^4`
`1 <= names[i].length <= 20`
`names[i]` consists of lower case English letters, digits and/or round brackets.', false, 'Medium', NULL, 31.2, 
   13.1, 'https://leetcode.com/problems/making-file-names-unique', 259, 13.8, 44.3, '["Microsoft"]'::jsonb, '["Hash Table,String"]'::jsonb, 
   220, 372, 37, false, '[]'::jsonb, true),
  (1488, 'Avoid Flood in The City', 'Your country has an infinite number of lakes. Initially, all the lakes are empty, but when it rains over the `nth` lake, the `nth` lake becomes full of water. If it rains over a lake which is full of water, there will be a flood. Your goal is to avoid the flood in any lake.

Given an integer array `rains` where:
`rains[i] > 0` means there will be rains over the `rains[i]` lake.

`rains[i] == 0` means there are no rains this day and you can choose one lake this day and dry it.

Return an array `ans` where:
`ans.length == rains.length`
`ans[i] == -1` if `rains[i] > 0`.

`ans[i]` is the lake you choose to dry in the `ith` day if `rains[i] == 0`.

If there are multiple valid answers return any of them. If it is impossible to avoid flood return an empty array.

Notice that if you chose to dry a full lake, it becomes empty, but if you chose to dry an empty lake, nothing changes. (see example 4)

Example 1:
Input: rains = [1,2,3,4]
Output: [-1,-1,-1,-1]
Explanation: After the first day full lakes are [1]
After the second day full lakes are [1,2]
After the third day full lakes are [1,2,3]
After the fourth day full lakes are [1,2,3,4]
There''s no day to dry any lake and there is no flood in any lake.


Example 2:
Input: rains = [1,2,0,0,2,1]
Output: [-1,-1,2,1,-1,-1]
Explanation: After the first day full lakes are [1]
After the second day full lakes are [1,2]
After the third day, we dry lake 2. Full lakes are [1]
After the fourth day, we dry lake 1. There is no full lakes.

After the fifth day, full lakes are [2].

After the sixth day, full lakes are [1,2].

It is easy that this scenario is flood-free. [-1,-1,1,2,-1,-1] is another acceptable scenario.


Example 3:
Input: rains = [1,2,0,1,2]
Output: []
Explanation: After the second day, full lakes are  [1,2]. We have to dry one lake in the third day.

After that, it will rain over lakes [1,2]. It''s easy to prove that no matter which lake you choose to dry in the 3rd day, the other one will flood.


Example 4:
Input: rains = [69,0,0,0,69]
Output: [-1,69,1,1,-1]
Explanation: Any solution on one of the forms [-1,69,x,y,-1], [-1,x,69,y,-1] or [-1,x,y,69,-1] is acceptable where 1 <= x,y <= 10^9

Example 5:
Input: rains = [10,20,20]
Output: []
Explanation: It will rain over lake 20 two consecutive days. There is no chance to dry any lake.


Constraints:
`1 <= rains.length <= 105`
`0 <= rains[i] <= 109`', false, 'Medium', NULL, 24.6, 
   1.2, 'https://leetcode.com/problems/avoid-flood-in-the-city', 221, 15.5, 63, '["Google"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   550, 125, 81, true, '[]'::jsonb, true),
  (1489, 'Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree', 'Given a weighted undirected connected graph with `n` vertices numbered from `0` to `n - 1`, and an array `edges` where `edges[i] = [ai, bi, weighti]` represents a bidirectional and weighted edge between nodes `ai` and `bi`. A minimum spanning tree (MST) is a subset of the graph''s edges that connects all vertices without cycles and with the minimum possible total edge weight.

Find all the critical and pseudo-critical edges in the given graph''s minimum spanning tree (MST). An MST edge whose deletion from the graph would cause the MST weight to increase is called a critical edge. On the other hand, a pseudo-critical edge is that which can appear in some MSTs but not all.

Note that you can return the indices of the edges in any order.


Example 1:
Input: n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
Output: [[0,1],[2,3,4,5]]
Explanation: The figure above describes the graph.

The following figure shows all the possible MSTs:
Notice that the two edges 0 and 1 appear in all MSTs, therefore they are critical edges, so we return them in the first list of the output.

The edges 2, 3, 4, and 5 are only part of some MSTs, therefore they are considered pseudo-critical edges. We add them to the second list of the output.


Example 2:
Input: n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]
Output: [[],[0,1,2,3]]
Explanation: We can observe that since all 4 edges have equal weight, choosing any 3 edges from the given 4 will yield an MST. Therefore all 4 edges are pseudo-critical.


Constraints:
`2 <= n <= 100`
`1 <= edges.length <= min(200, n * (n - 1) / 2)`
`edges[i].length == 3`
`0 <= ai < bi < n`
`1 <= weighti <= 1000`
All pairs `(ai, bi)` are distinct.', false, 'Hard', NULL, 51.5, 
   0, 'https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree', 66, 4.5, 8.8, '["Amazon"]'::jsonb, '["Depth-first Search,Union Find"]'::jsonb, 
   222, 33, 87, true, '[]'::jsonb, true),
  (1490, 'Clone N-ary Tree', 'Given a `root` of an N-ary tree, return a deep copy (clone) of the tree.

Each node in the n-ary tree contains a val (`int`) and a list (`List[Node]`) of its children.

class Node {
    public int val;
    public List<Node> children;
}
Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).

Follow up: Can your solution work for the graph problem?

Example 1:
Input: root = [1,null,3,2,4,null,5,6]
Output: [1,null,3,2,4,null,5,6]

Example 2:
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]

Constraints:
The depth of the n-ary tree is less than or equal to `1000`.

The total number of nodes is between `[0, 10^4]`.', true, 'Medium', NULL, 83.4, 
   2.1, 'https://leetcode.com/problems/clone-n-ary-tree', 140, 9.2, 11.1, '["Amazon"]'::jsonb, '["Hash Table,Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   146, 9, 94, true, '[]'::jsonb, true),
  (1491, 'Average Salary Excluding the Minimum and Maximum Salary', 'Given an array of unique integers `salary` where `salary[i]` is the salary of the employee `i`.

Return the average salary of employees excluding the minimum and maximum salary.


Example 1:
Input: salary = [4000,3000,1000,2000]
Output: 2500.00000
Explanation: Minimum salary and maximum salary are 1000 and 4000 respectively.

Average salary excluding minimum and maximum salary is (2000+3000)/2= 2500

Example 2:
Input: salary = [1000,2000,3000]
Output: 2000.00000
Explanation: Minimum salary and maximum salary are 1000 and 3000 respectively.

Average salary excluding minimum and maximum salary is (2000)/1= 2000

Example 3:
Input: salary = [6000,5000,4000,3000,2000,1000]
Output: 3500.00000

Example 4:
Input: salary = [8000,9000,2000,3000,6000,1000]
Output: 4750.00000

Constraints:
`3 <= salary.length <= 100`
`10^3 <= salary[i] <= 10^6`
`salary[i]` is unique.

Answers within `10^-5` of the actual value will be accepted as correct.', false, 'Easy', NULL, 68.5, 
   2, 'https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary', 587, 42.7, 62.4, '["Amazon"]'::jsonb, '["Array,Sort"]'::jsonb, 
   272, 51, 84, true, '[]'::jsonb, true),
  (1492, 'The kth Factor of n', 'Given two positive integers `n` and `k`.

A factor of an integer `n` is defined as an integer `i` where `n % i == 0`.

Consider a list of all factors of `n` sorted in ascending order, return the `kth` factor in this list or return -1 if `n` has less than `k` factors.


Example 1:
Input: n = 12, k = 3
Output: 3
Explanation: Factors list is [1, 2, 3, 4, 6, 12], the 3rd factor is 3.


Example 2:
Input: n = 7, k = 2
Output: 7
Explanation: Factors list is [1, 7], the 2nd factor is 7.


Example 3:
Input: n = 4, k = 4
Output: -1
Explanation: Factors list is [1, 2, 4], there is only 3 factors. We should return -1.


Example 4:
Input: n = 1, k = 1
Output: 1
Explanation: Factors list is [1], the 1st factor is 1.


Example 5:
Input: n = 1000, k = 3
Output: 4
Explanation: Factors list is [1, 2, 4, 5, 8, 10, 20, 25, 40, 50, 100, 125, 200, 250, 500, 1000].


Constraints:
`1 <= k <= n <= 1000`', false, 'Medium', '/articles/the-kth-factor-of-n', 63.1, 
   27.1, 'https://leetcode.com/problems/the-kth-factor-of-n', 461, 45.3, 71.9, '["Expedia,Twitter"]'::jsonb, '["Math"]'::jsonb, 
   305, 126, 71, false, '[]'::jsonb, true),
  (1493, 'Longest Subarray of 1''s After Deleting One Element', 'Given a binary array `nums`, you should delete one element from it.

Return the size of the longest non-empty subarray containing only 1''s in the resulting array.

Return 0 if there is no such subarray.


Example 1:
Input: nums = [1,1,0,1]
Output: 3
Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1''s.


Example 2:
Input: nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1''s is [1,1,1,1,1].


Example 3:
Input: nums = [1,1,1]
Output: 2
Explanation: You must delete one element.


Example 4:
Input: nums = [1,1,0,0,1,1,1,0,1]
Output: 4

Example 5:
Input: nums = [0,0,0]
Output: 0

Constraints:
`1 <= nums.length <= 10^5`
`nums[i]` is either `0` or `1`.', false, 'Medium', NULL, 57.7, 
   21.6, 'https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element', 343, 19.2, 33.3, '["Yandex"]'::jsonb, '["Array"]'::jsonb, 
   371, 7, 98, false, '[]'::jsonb, true),
  (1494, 'Parallel Courses II', 'Given the integer `n` representing the number of courses at some university labeled from `1` to `n`, and the array `dependencies` where `dependencies[i] = [xi, yi]` represents a prerequisite relationship, that is, the course `xi` must be taken before the course `yi`. Also, you are given the integer `k`.

In one semester you can take at most `k` courses as long as you have taken all the prerequisites for the courses you are taking.

Return the minimum number of semesters to take all courses. It is guaranteed that you can take all courses in some way.


Example 1:
Input: n = 4, dependencies = [[2,1],[3,1],[1,4]], k = 2
Output: 3 
Explanation: The figure above represents the given graph. In this case we can take courses 2 and 3 in the first semester, then take course 1 in the second semester and finally take course 4 in the third semester.


Example 2:
Input: n = 5, dependencies = [[2,1],[3,1],[4,1],[1,5]], k = 2
Output: 4 
Explanation: The figure above represents the given graph. In this case one optimal way to take all courses is: take courses 2 and 3 in the first semester and take course 4 in the second semester, then take course 1 in the third semester and finally take course 5 in the fourth semester.


Example 3:
Input: n = 11, dependencies = [], k = 2
Output: 6

Constraints:
`1 <= n <= 15`
`1 <= k <= n`
`0 <= dependencies.length <= n * (n-1) / 2`
`dependencies[i].length == 2`
`1 <= xi, yi <= n`
`xi != yi`
All prerequisite relationships are distinct, that is, `dependencies[i] != dependencies[j]`.

The given graph is a directed acyclic graph.', false, 'Hard', NULL, 31.2, 
   9.3, 'https://leetcode.com/problems/parallel-courses-ii', 146, 6.5, 20.8, '["Microsoft"]'::jsonb, '["Graph"]'::jsonb, 
   353, 28, 93, false, '[]'::jsonb, true),
  (1495, 'Friendly Movies Streamed Last Month', 'SQL Schema', true, 'Easy', NULL, 51.3, 
   0, 'https://leetcode.com/problems/friendly-movies-streamed-last-month', 101, 8.8, 17.3, '["Amazon"]'::jsonb, '[]'::jsonb, 
   30, 4, 88, true, '[]'::jsonb, true),
  (1496, 'Path Crossing', 'Given a string `path`, where `path[i] = ''N''`, `''S''`, `''E''` or `''W''`, each representing moving one unit north, south, east, or west, respectively. You start at the origin `(0, 0)` on a 2D plane and walk on the path specified by `path`.

Return `True` if the path crosses itself at any point, that is, if at any time you are on a location you''ve previously visited. Return `False` otherwise.


Example 1:
Input: path = "NES"
Output: false 
Explanation: Notice that the path doesn''t cross any point more than once.


Example 2:
Input: path = "NESWW"
Output: true
Explanation: Notice that the path visits the origin twice.


Constraints:
`1 <= path.length <= 10^4`
`path` will only consist of characters in `{''N'', ''S'', ''E'', ''W}`', false, 'Easy', NULL, 55.3, 
   4.2, 'https://leetcode.com/problems/path-crossing', 323, 24.7, 44.6, '["Amazon"]'::jsonb, '["String"]'::jsonb, 
   286, 6, 98, true, '[]'::jsonb, true),
  (1497, 'Check If Array Pairs Are Divisible by k', 'Given an array of integers `arr` of even length `n` and an integer `k`.

We want to divide the array into exactly `n / 2` pairs such that the sum of each pair is divisible by `k`.

Return True If you can find a way to do that or False otherwise.


Example 1:
Input: arr = [1,2,3,4,5,10,6,7,8,9], k = 5
Output: true
Explanation: Pairs are (1,9),(2,8),(3,7),(4,6) and (5,10).


Example 2:
Input: arr = [1,2,3,4,5,6], k = 7
Output: true
Explanation: Pairs are (1,6),(2,5) and(3,4).


Example 3:
Input: arr = [1,2,3,4,5,6], k = 10
Output: false
Explanation: You can try all possible pairs to see that there is no way to divide arr into 3 pairs each with sum divisible by 10.


Example 4:
Input: arr = [-10,10], k = 2
Output: true

Example 5:
Input: arr = [-1,1,-2,2,-3,3,-4,4], k = 3
Output: true

Constraints:
`arr.length == n`
`1 <= n <= 105`
`n` is even.

`-109 <= arr[i] <= 109`
`1 <= k <= 105`', false, 'Medium', NULL, 40.3, 
   10, 'https://leetcode.com/problems/check-if-array-pairs-are-divisible-by-k', 198, 19.5, 48.4, '["Paypal"]'::jsonb, '["Array,Math,Greedy"]'::jsonb, 
   444, 42, 91, false, '[]'::jsonb, true),
  (1498, 'Number of Subsequences That Satisfy the Given Sum Condition', 'Given an array of integers `nums` and an integer `target`.

Return the number of non-empty subsequences of `nums` such that the sum of the minimum and maximum element on it is less or equal to `target`. Since the answer may be too large, return it modulo `109 + 7`.


Example 1:
Input: nums = [3,5,6,7], target = 9
Output: 4
Explanation: There are 4 subsequences that satisfy the condition.

[3] -> Min value + max value <= target (3 + 3 <= 9)
[3,5] -> (3 + 5 <= 9)
[3,5,6] -> (3 + 6 <= 9)
[3,6] -> (3 + 6 <= 9)

Example 2:
Input: nums = [3,3,6,8], target = 10
Output: 6
Explanation: There are 6 subsequences that satisfy the condition. (nums can have repeated numbers).

[3] , [3] , [3,3], [3,6] , [3,6] , [3,3,6]

Example 3:
Input: nums = [2,3,3,4,6,7], target = 12
Output: 61
Explanation: There are 63 non-empty subsequences, two of them don''t satisfy the condition ([6,7], [7]).

Number of valid subsequences (63 - 2 = 61).


Example 4:
Input: nums = [5,2,4,1,7,6,8], target = 16
Output: 127
Explanation: All non-empty subset satisfy the condition (2^7 - 1) = 127

Constraints:
`1 <= nums.length <= 105`
`1 <= nums[i] <= 106`
`1 <= target <= 106`', false, 'Medium', NULL, 38.8, 
   14, 'https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition', 123, 16.4, 42.3, '["Facebook"]'::jsonb, '["Sort,Sliding Window"]'::jsonb, 
   544, 52, 91, true, '[]'::jsonb, true),
  (1499, 'Max Value of Equation', 'Given an array `points` containing the coordinates of points on a 2D plane, sorted by the x-values, where `points[i] = [xi, yi]` such that `xi < xj` for all `1 <= i < j <= points.length`. You are also given an integer `k`.

Find the maximum value of the equation `yi + yj + |xi - xj|` where `|xi - xj| <= k` and `1 <= i < j <= points.length`. It is guaranteed that there exists at least one pair of points that satisfy the constraint `|xi - xj| <= k`.


Example 1:
Input: points = [[1,3],[2,0],[5,10],[6,-10]], k = 1
Output: 4
Explanation: The first two points satisfy the condition |xi - xj| <= 1 and if we calculate the equation we get 3 + 0 + |1 - 2| = 4. Third and fourth points also satisfy the condition and give a value of 10 + -10 + |5 - 6| = 1.

No other pairs satisfy the condition, so we return the max of 4 and 1.


Example 2:
Input: points = [[0,0],[3,0],[9,2]], k = 3
Output: 3
Explanation: Only the first two points have an absolute difference of 3 or less in the x-values, and give the value of 0 + 0 + |0 - 3| = 3.


Constraints:
`2 <= points.length <= 10^5`
`points[i].length == 2`
`-10^8 <= points[i][0], points[i][1] <= 10^8`
`0 <= k <= 2 * 10^8`
`points[i][0] < points[j][0]` for all `1 <= i < j <= points.length`
`xi` form a strictly increasing sequence.', false, 'Hard', NULL, 45, 
   26.4, 'https://leetcode.com/problems/max-value-of-equation', 91, 11.2, 24.9, '["Google"]'::jsonb, '["Array,Sliding Window"]'::jsonb, 
   349, 14, 96, true, '[]'::jsonb, true),
  (1500, 'Design a File Sharing System', 'We will use a file-sharing system to share a very large file which consists of `m` small chunks with IDs from `1` to `m`.

When users join the system, the system should assign a unique ID to them. The unique ID should be used once for each user, but when a user leaves the system, the ID can be reused again.

Users can request a certain chunk of the file, the system should return a list of IDs of all the users who own this chunk. If the user receive a non-empty list of IDs, they receive the requested chunk successfully.

Implement the `FileSharing` class:
`FileSharing(int m)` Initializes the object with a file of `m` chunks.

`int join(int[] ownedChunks)`: A new user joined the system owning some chunks of the file, the system should assign an id to the user which is the smallest positive integer not taken by any other user. Return the assigned id.

`void leave(int userID)`: The user with `userID` will leave the system, you cannot take file chunks from them anymore.

`int[] request(int userID, int chunkID)`: The user `userID` requested the file chunk with `chunkID`. Return a list of the IDs of all users that own this chunk sorted in ascending order.

Follow-ups:
What happens if the system identifies the user by their IP address instead of their unique ID and users disconnect and connect from the system with the same IP?
If the users in the system join and leave the system frequently without requesting any chunks, will your solution still be efficient?
If all each user join the system one time, request all files and then leave, will your solution still be efficient?
If the system will be used to share `n` files where the `ith` file consists of `m[i]`, what are the changes you have to do?

Example:
Input:
["FileSharing","join","join","join","request","request","leave","request","leave","join"]
[[4],[[1,2]],[[2,3]],[[4]],[1,3],[2,2],[1],[2,1],[2],[[]]]
Output:
[null,1,2,3,[2],[1,2],null,[],null,1]
Explanation:
FileSharing fileSharing = new FileSharing(4); // We use the system to share a file of 4 chunks.

fileSharing.join([1, 2]);    // A user who has chunks [1,2] joined the system, assign id = 1 to them and return 1.

fileSharing.join([2, 3]);    // A user who has chunks [2,3] joined the system, assign id = 2 to them and return 2.

fileSharing.join([4]);       // A user who has chunk [4] joined the system, assign id = 3 to them and return 3.

fileSharing.request(1, 3);   // The user with id = 1 requested the third file chunk, as only the user with id = 2 has the file, return [2] . Notice that user 1 now has chunks [1,2,3].

fileSharing.request(2, 2);   // The user with id = 2 requested the second file chunk, users with ids [1,2] have this chunk, thus we return [1,2].

fileSharing.leave(1);        // The user with id = 1 left the system, all the file chunks with them are no longer available for other users.

fileSharing.request(2, 1);   // The user with id = 2 requested the first file chunk, no one in the system has this chunk, we return empty list [].

fileSharing.leave(2);        // The user with id = 2 left the system.

fileSharing.join([]);        // A user who doesn''t have any chunks joined the system, assign id = 1 to them and return 1. Notice that ids 1 and 2 are free and we can reuse them.


Constraints:
`1 <= m <= 10^5`
`0 <= ownedChunks.length <= min(100, m)`
`1 <= ownedChunks[i] <= m`
Values of `ownedChunks` are unique.

`1 <= chunkID <= m`
`userID` is guaranteed to be a user in the system if you assign the IDs correctly. 
At most `10^4` calls will be made to `join`, `leave` and `request`.

Each call to `leave` will have a matching call for `join`.', true, 'Medium', NULL, 46.4, 
   0, 'https://leetcode.com/problems/design-a-file-sharing-system', 27, 1.9, 4, '["Twitch"]'::jsonb, '["Array,Design"]'::jsonb, 
   26, 60, 30, false, '[]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;

COMMIT;

-- ============================================
-- Import Summary
-- ============================================
-- Total Problems Imported: 1825
-- Skipped: 0
-- ============================================
