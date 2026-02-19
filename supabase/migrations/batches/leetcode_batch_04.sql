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
  (1501, 'Countries You Can Safely Invest In', 'SQL Schema', true, 'Medium', NULL, 60.5, 
   0, 'https://leetcode.com/problems/countries-you-can-safely-invest-in', 135, 7.1, 11.7, '[]'::jsonb, '[]'::jsonb, 
   76, 13, 85, false, '[]'::jsonb, true),
  (1502, 'Can Make Arithmetic Progression From Sequence', 'Given an array of numbers `arr`. A sequence of numbers is called an arithmetic progression if the difference between any two consecutive elements is the same.

Return `true` if the array can be rearranged to form an arithmetic progression, otherwise, return `false`.


Example 1:
Input: arr = [3,5,1]
Output: true
Explanation: We can reorder the elements as [1,3,5] or [5,3,1] with differences 2 and -2 respectively, between each consecutive elements.


Example 2:
Input: arr = [1,2,4]
Output: false
Explanation: There is no way to reorder the elements to obtain an arithmetic progression.


Constraints:
`2 <= arr.length <= 1000`
`-10^6 <= arr[i] <= 10^6`', false, 'Easy', NULL, 71.2, 
   7.9, 'https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence', 482, 46.3, 65.1, '["Amazon"]'::jsonb, '["Array,Sort"]'::jsonb, 
   321, 25, 93, true, '[]'::jsonb, true),
  (1503, 'Last Moment Before All Ants Fall Out of a Plank', 'We have a wooden plank of the length `n` units. Some ants are walking on the plank, each ant moves with speed 1 unit per second. Some of the ants move to the left, the other move to the right.

When two ants moving in two different directions meet at some point, they change their directions and continue moving again. Assume changing directions doesn''t take any additional time.

When an ant reaches one end of the plank at a time `t`, it falls out of the plank imediately.

Given an integer `n` and two integer arrays `left` and `right`, the positions of the ants moving to the left and the right. Return the moment when the last ant(s) fall out of the plank.


Example 1:
Input: n = 4, left = [4,3], right = [0,1]
Output: 4
Explanation: In the image above:
-The ant at index 0 is named A and going to the right.

-The ant at index 1 is named B and going to the right.

-The ant at index 3 is named C and going to the left.

-The ant at index 4 is named D and going to the left.

Note that the last moment when an ant was on the plank is t = 4 second, after that it falls imediately out of the plank. (i.e. We can say that at t = 4.0000000001, there is no ants on the plank).


Example 2:
Input: n = 7, left = [], right = [0,1,2,3,4,5,6,7]
Output: 7
Explanation: All ants are going to the right, the ant at index 0 needs 7 seconds to fall.


Example 3:
Input: n = 7, left = [0,1,2,3,4,5,6,7], right = []
Output: 7
Explanation: All ants are going to the left, the ant at index 7 needs 7 seconds to fall.


Example 4:
Input: n = 9, left = [5], right = [4]
Output: 5
Explanation: At t = 1 second, both ants will be at the same intial position but with different direction.


Example 5:
Input: n = 6, left = [6], right = [0]
Output: 6

Constraints:
`1 <= n <= 10^4`
`0 <= left.length <= n + 1`
`0 <= left[i] <= n`
`0 <= right.length <= n + 1`
`0 <= right[i] <= n`
`1 <= left.length + right.length <= n + 1`
All values of `left` and `right` are unique, and each value can appear only in one of the two arrays.', false, 'Medium', NULL, 53.2, 
   0, 'https://leetcode.com/problems/last-moment-before-all-ants-fall-out-of-a-plank', 167, 12, 22.6, '["Google"]'::jsonb, '["Array,Brainteaser"]'::jsonb, 
   221, 146, 60, true, '[]'::jsonb, true),
  (1504, 'Count Submatrices With All Ones', 'Given a `rows * columns` matrix `mat` of ones and zeros, return how many submatrices have all ones.


Example 1:
Input: mat = [[1,0,1],
              [1,1,0],
              [1,1,0]]
Output: 13
Explanation:
There are 6 rectangles of side 1x1.

There are 2 rectangles of side 1x2.

There are 3 rectangles of side 2x1.

There is 1 rectangle of side 2x2. 
There is 1 rectangle of side 3x1.

Total number of rectangles = 6 + 2 + 3 + 1 + 1 = 13.


Example 2:
Input: mat = [[0,1,1,0],
              [0,1,1,1],
              [1,1,1,0]]
Output: 24
Explanation:
There are 8 rectangles of side 1x1.

There are 5 rectangles of side 1x2.

There are 2 rectangles of side 1x3. 
There are 4 rectangles of side 2x1.

There are 2 rectangles of side 2x2. 
There are 2 rectangles of side 3x1. 
There is 1 rectangle of side 3x2. 
Total number of rectangles = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24.


Example 3:
Input: mat = [[1,1,1,1,1,1]]
Output: 21

Example 4:
Input: mat = [[1,0,1],[0,1,0],[1,0,1]]
Output: 5

Constraints:
`1 <= rows <= 150`
`1 <= columns <= 150`
`0 <= mat[i][j] <= 1`', false, 'Medium', NULL, 60.7, 
   10.9, 'https://leetcode.com/problems/count-submatrices-with-all-ones', 159, 21.5, 35.4, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   833, 65, 93, true, '[]'::jsonb, true),
  (1505, 'Minimum Possible Integer After at Most K Adjacent Swaps On Digits', 'Given a string `num` representing the digits of a very large integer and an integer `k`.

You are allowed to swap any two adjacent digits of the integer at most `k` times.

Return the minimum integer you can obtain also as a string.


Example 1:
Input: num = "4321", k = 4
Output: "1342"
Explanation: The steps to obtain the minimum integer from 4321 with 4 adjacent swaps are shown.


Example 2:
Input: num = "100", k = 1
Output: "010"
Explanation: It''s ok for the output to have leading zeros, but the input is guaranteed not to have any leading zeros.


Example 3:
Input: num = "36789", k = 1000
Output: "36789"
Explanation: We can keep the number without any swaps.


Example 4:
Input: num = "22", k = 22
Output: "22"

Example 5:
Input: num = "9438957234785635408", k = 23
Output: "0345989723478563548"

Constraints:
`1 <= num.length <= 30000`
`num` contains digits only and doesn''t have leading zeros.

`1 <= k <= 10^9`', false, 'Hard', NULL, 36.4, 
   27.2, 'https://leetcode.com/problems/minimum-possible-integer-after-at-most-k-adjacent-swaps-on-digits', 95, 5.6, 15.2, '["Amazon"]'::jsonb, '["Greedy"]'::jsonb, 
   212, 14, 94, true, '[]'::jsonb, true),
  (1506, 'Find Root of N-Ary Tree', 'You are given all the nodes of an N-ary tree as an array of `Node` objects, where each node has a unique value.

Return the root of the N-ary tree.

Custom testing:
An N-ary tree can be serialized as represented in its level order traversal where each group of children is separated by the `null` value (see examples).

For example, the above tree is serialized as `[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`.

The testing will be done in the following way:
The input data should be provided as a serialization of the tree.

The driver code will construct the tree from the serialized input data and put each `Node` object into an array in an arbitrary order.

The driver code will pass the array to `findRoot`, and your function should find and return the root `Node` object in the array.

The driver code will take the returned `Node` object and serialize it. If the serialized value and the input data are the same, the test passes.


Example 1:
Input: tree = [1,null,3,2,4,null,5,6]
Output: [1,null,3,2,4,null,5,6]
Explanation: The tree from the input data is shown above.

The driver code creates the tree and gives findRoot the Node objects in an arbitrary order.

For example, the passed array could be [Node(5),Node(4),Node(3),Node(6),Node(2),Node(1)] or [Node(2),Node(6),Node(1),Node(3),Node(5),Node(4)].

The findRoot function should return the root Node(1), and the driver code will serialize it and compare with the input data.

The input data and serialized Node(1) are the same, so the test passes.


Example 2:
Input: tree = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]

Constraints:
The total number of nodes is between `[1, 5 * 104]`.

Each node has a unique value.

Follow up:
Could you solve this problem in constant space complexity with a linear time algorithm?', true, 'Medium', '/articles/find-root-of-n-ary-tree', 80.1, 
   0, 'https://leetcode.com/problems/find-root-of-n-ary-tree', 96, 13.8, 17.2, '["Google"]'::jsonb, '[]'::jsonb, 
   224, 80, 74, true, '[]'::jsonb, true),
  (1507, 'Reformat Date', 'Given a `date` string in the form `Day Month Year`, where:
`Day` is in the set `{"1st", "2nd", "3rd", "4th", ..., "30th", "31st"}`.

`Month` is in the set `{"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"}`.

`Year` is in the range `[1900, 2100]`.

Convert the date string to the format `YYYY-MM-DD`, where:
`YYYY` denotes the 4 digit year.

`MM` denotes the 2 digit month.

`DD` denotes the 2 digit day.


Example 1:
Input: date = "20th Oct 2052"
Output: "2052-10-20"

Example 2:
Input: date = "6th Jun 1933"
Output: "1933-06-06"

Example 3:
Input: date = "26th May 1960"
Output: "1960-05-26"

Constraints:
The given dates are guaranteed to be valid, so no error handling is necessary.', false, 'Easy', NULL, 60.1, 
   31.1, 'https://leetcode.com/problems/reformat-date', 316, 20.1, 33.4, '["Expedia"]'::jsonb, '["String"]'::jsonb, 
   118, 208, 36, false, '[]'::jsonb, true),
  (1508, 'Range Sum of Sorted Subarray Sums', 'Given the array `nums` consisting of `n` positive integers. You computed the sum of all non-empty continous subarrays from the array and then sort them in non-decreasing order, creating a new array of `n * (n + 1) / 2` numbers.

Return the sum of the numbers from index `left` to index `right` (indexed from 1), inclusive, in the new array. Since the answer can be a huge number return it modulo 10^9 + 7.


Example 1:
Input: nums = [1,2,3,4], n = 4, left = 1, right = 5
Output: 13 
Explanation: All subarray sums are 1, 3, 6, 10, 2, 5, 9, 3, 7, 4. After sorting them in non-decreasing order we have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 1 to ri = 5 is 1 + 2 + 3 + 3 + 4 = 13. 

Example 2:
Input: nums = [1,2,3,4], n = 4, left = 3, right = 4
Output: 6
Explanation: The given array is the same as example 1. We have the new array [1, 2, 3, 3, 4, 5, 6, 7, 9, 10]. The sum of the numbers from index le = 3 to ri = 4 is 3 + 3 = 6.


Example 3:
Input: nums = [1,2,3,4], n = 4, left = 1, right = 10
Output: 50

Constraints:
`1 <= nums.length <= 10^3`
`nums.length == n`
`1 <= nums[i] <= 100`
`1 <= left <= right <= n * (n + 1) / 2`', false, 'Medium', NULL, 60.4, 
   1.9, 'https://leetcode.com/problems/range-sum-of-sorted-subarray-sums', 170, 16.7, 27.7, '["Google"]'::jsonb, '["Array,Sort"]'::jsonb, 
   294, 62, 83, true, '[]'::jsonb, true),
  (1509, 'Minimum Difference Between Largest and Smallest Value in Three Moves', 'Given an array `nums`, you are allowed to choose one element of `nums` and change it by any value in one move.

Return the minimum difference between the largest and smallest value of `nums` after perfoming at most 3 moves.


Example 1:
Input: nums = [5,3,2,4]
Output: 0
Explanation: Change the array [5,3,2,4] to [2,2,2,2].

The difference between the maximum and minimum is 2-2 = 0.


Example 2:
Input: nums = [1,5,0,10,14]
Output: 1
Explanation: Change the array [1,5,0,10,14] to [1,1,0,1,1]. 
The difference between the maximum and minimum is 1-0 = 1.


Example 3:
Input: nums = [6,6,0,1,1,4,6]
Output: 2

Example 4:
Input: nums = [1,5,6,14,15]
Output: 1

Constraints:
`1 <= nums.length <= 10^5`
`-10^9 <= nums[i] <= 10^9`', false, 'Medium', NULL, 52.8, 
   11.8, 'https://leetcode.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves', 175, 12.1, 22.9, '["Google"]'::jsonb, '["Array,Sort"]'::jsonb, 
   298, 39, 88, true, '[]'::jsonb, true),
  (1510, 'Stone Game IV', 'Alice and Bob take turns playing a game, with Alice starting first.

Initially, there are `n` stones in a pile.  On each player''s turn, that player makes a move consisting of removing any non-zero square number of stones in the pile.

Also, if a player cannot make a move, he/she loses the game.

Given a positive integer `n`. Return `True` if and only if Alice wins the game otherwise return `False`, assuming both players play optimally.


Example 1:
Input: n = 1
Output: true
Explanation: Alice can remove 1 stone winning the game because Bob doesn''t have any moves.


Example 2:
Input: n = 2
Output: false
Explanation: Alice can only remove 1 stone, after that Bob removes the last one winning the game (2 -> 1 -> 0).


Example 3:
Input: n = 4
Output: true
Explanation: n is already a perfect square, Alice can win with one move, removing 4 stones (4 -> 0).


Example 4:
Input: n = 7
Output: false
Explanation: Alice can''t win the game if Bob plays optimally.

If Alice starts removing 4 stones, Bob will remove 1 stone then Alice should remove only 1 stone and finally Bob removes the last one (7 -> 3 -> 2 -> 1 -> 0). 
If Alice starts removing 1 stone, Bob will remove 4 stones then Alice only can remove 1 stone and finally Bob removes the last one (7 -> 6 -> 2 -> 1 -> 0).


Example 5:
Input: n = 17
Output: false
Explanation: Alice can''t win the game if Bob plays optimally.


Constraints:
`1 <= n <= 10^5`', false, 'Hard', '/articles/stone-game-iv', 58.9, 
   2.7, 'https://leetcode.com/problems/stone-game-iv', 245, 26.6, 45, '["Microsoft"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   403, 25, 94, false, '[]'::jsonb, true),
  (1511, 'Customer Order Frequency', 'SQL Schema', true, 'Easy', NULL, 74.1, 
   2.5, 'https://leetcode.com/problems/customer-order-frequency', 227, 10, 13.5, '["Amazon"]'::jsonb, '[]'::jsonb, 
   102, 21, 83, true, '[]'::jsonb, true),
  (1512, 'Number of Good Pairs', 'Given an array of integers `nums`.

A pair `(i,j)` is called good if `nums[i]` == `nums[j]` and `i` < `j`.

Return the number of good pairs.


Example 1:
Input: nums = [1,2,3,1,1,3]
Output: 4
Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.


Example 2:
Input: nums = [1,1,1,1]
Output: 6
Explanation: Each pair in the array are good.


Example 3:
Input: nums = [1,2,3]
Output: 0

Constraints:
`1 <= nums.length <= 100`
`1 <= nums[i] <= 100`', false, 'Easy', NULL, 87.7, 
   14.9, 'https://leetcode.com/problems/number-of-good-pairs', 999, 158.1, 180.3, '["Microsoft,Bloomberg,Amazon,Adobe,Apple"]'::jsonb, '["Array,Hash Table,Math"]'::jsonb, 
   1058, 94, 92, true, '[]'::jsonb, true),
  (1513, 'Number of Substrings With Only 1s', 'Given a binary string `s` (a string consisting only of ''0'' and ''1''s).

Return the number of substrings with all characters 1''s.

Since the answer may be too large, return it modulo 10^9 + 7.


Example 1:
Input: s = "0110111"
Output: 9
Explanation: There are 9 substring in total with only 1''s characters.

"1" -> 5 times.

"11" -> 3 times.

"111" -> 1 time.


Example 2:
Input: s = "101"
Output: 2
Explanation: Substring "1" is shown 2 times in s.


Example 3:
Input: s = "111111"
Output: 21
Explanation: Each substring contains only 1''s characters.


Example 4:
Input: s = "000"
Output: 0

Constraints:
`s[i] == ''0''` or `s[i] == ''1''`
`1 <= s.length <= 10^5`', false, 'Medium', NULL, 42, 
   0, 'https://leetcode.com/problems/number-of-substrings-with-only-1s', 277, 20.7, 49.3, '["Google"]'::jsonb, '["Math,String"]'::jsonb, 
   303, 14, 96, true, '[]'::jsonb, true),
  (1514, 'Path with Maximum Probability', 'You are given an undirected weighted graph of `n` nodes (0-indexed), represented by an edge list where `edges[i] = [a, b]` is an undirected edge connecting the nodes `a` and `b` with a probability of success of traversing that edge `succProb[i]`.

Given two nodes `start` and `end`, find the path with the maximum probability of success to go from `start` to `end` and return its success probability.

If there is no path from `start` to `end`, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.


Example 1:
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.


Example 2:
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30000

Example 3:
Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
Output: 0.00000
Explanation: There is no path between 0 and 2.


Constraints:
`2 <= n <= 10^4`
`0 <= start, end < n`
`start != end`
`0 <= a, b < n`
`a != b`
`0 <= succProb.length == edges.length <= 2*10^4`
`0 <= succProb[i] <= 1`
There is at most one edge between every two nodes.', false, 'Medium', NULL, 40.9, 
   4.2, 'https://leetcode.com/problems/path-with-maximum-probability', 281, 19.5, 47.7, '["Google"]'::jsonb, '["Graph"]'::jsonb, 
   554, 12, 98, true, '[]'::jsonb, true),
  (1515, 'Best Position for a Service Centre', 'A delivery company wants to build a new service centre in a new city. The company knows the positions of all the customers in this city on a 2D-Map and wants to build the new centre in a position such that the sum of the euclidean distances to all customers is minimum.

Given an array `positions` where `positions[i] = [xi, yi]` is the position of the `ith` customer on the map, return the minimum sum of the euclidean distances to all customers.

In other words, you need to choose the position of the service centre `[xcentre, ycentre]` such that the following formula is minimized:
Answers within `10^-5` of the actual value will be accepted.


Example 1:
Input: positions = [[0,1],[1,0],[1,2],[2,1]]
Output: 4.00000
Explanation: As shown, you can see that choosing [xcentre, ycentre] = [1, 1] will make the distance to each customer = 1, the sum of all distances is 4 which is the minimum possible we can achieve.


Example 2:
Input: positions = [[1,1],[3,3]]
Output: 2.82843
Explanation: The minimum possible sum of distances = sqrt(2) + sqrt(2) = 2.82843

Example 3:
Input: positions = [[1,1]]
Output: 0.00000

Example 4:
Input: positions = [[1,1],[0,0],[2,0]]
Output: 2.73205
Explanation: At the first glance, you may think that locating the centre at [1, 0] will achieve the minimum sum, but locating it at [1, 0] will make the sum of distances = 3.

Try to locate the centre at [1.0, 0.5773502711] you will see that the sum of distances is 2.73205.

Be careful with the precision!

Example 5:
Input: positions = [[0,1],[3,2],[4,5],[7,6],[8,9],[11,1],[2,12]]
Output: 32.94036
Explanation: You can use [4.3460852395, 4.9813795505] as the position of the centre.


Constraints:
`1 <= positions.length <= 50`
`positions[i].length == 2`
`0 <= positions[i][0], positions[i][1] <= 100`', false, 'Hard', NULL, 38.3, 
   31.8, 'https://leetcode.com/problems/best-position-for-a-service-centre', 96, 6.3, 16.4, '["Reddit,Uber"]'::jsonb, '["Geometry"]'::jsonb, 
   109, 146, 43, false, '[]'::jsonb, true),
  (1516, 'Move Sub-Tree of N-Ary Tree', 'Given the `root` of an N-ary tree of unique values, and two nodes of the tree `p` and `q`.

You should move the subtree of the node `p` to become a direct child of node `q`. If `p` is already a direct child of `q`, don''t change anything. Node `p` must be the last child in the children list of node `q`.

Return the root of the tree after adjusting it.

There are 3 cases for nodes `p` and `q`:
Node `q` is in the sub-tree of node `p`.

Node `p` is in the sub-tree of node `q`.

Neither node `p` is in the sub-tree of node `q` nor node `q` is in the sub-tree of node `p`.

In cases 2 and 3, you just need to move `p` (with its sub-tree) to be a child of `q`, but in case 1 the tree may be disconnected, thus you need to reconnect the tree again. Please read the examples carefully before solving this problem.

Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).

For example, the above tree is serialized as [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14].


Example 1:
Input: root = [1,null,2,3,null,4,5,null,6,null,7,8], p = 4, q = 1
Output: [1,null,2,3,4,null,5,null,6,null,7,8]
Explanation: This example follows the second case as node p is in the sub-tree of node q. We move node p with its sub-tree to be a direct child of node q.

Notice that node 4 is the last child of node 1.


Example 2:
Input: root = [1,null,2,3,null,4,5,null,6,null,7,8], p = 7, q = 4
Output: [1,null,2,3,null,4,5,null,6,null,7,8]
Explanation: Node 7 is already a direct child of node 4. We don''t change anything.


Example 3:
Input: root = [1,null,2,3,null,4,5,null,6,null,7,8], p = 3, q = 8
Output: [1,null,2,null,4,5,null,7,8,null,null,null,3,null,6]
Explanation: This example follows case 3 because node p is not in the sub-tree of node q and vice-versa. We can move node 3 with its sub-tree and make it as node 8''s child.


Example 4:
Input: root = [1,null,2,3,null,4,5,null,6,null,7,8], p = 2, q = 7
Output: [1,null,7,3,null,2,null,6,null,4,5,null,null,8]
Explanation: Node q is in the sub-tree of node p, so this is case 1.

The first step, we move node p (with all of its sub-tree except for node q) and add it as a child to node q.

Then we will see that the tree is disconnected, you need to reconnect node q to replace node p as shown.


Example 5:
Input: root = [1,null,2,3,null,4,5,null,6,null,7,8], p = 1, q = 2
Output: [2,null,4,5,1,null,7,8,null,null,3,null,null,null,6]
Explanation: Node q is in the sub-tree of node p, so this is case 1.

The first step, we move node p (with all of its sub-tree except for node q) and add it as a child to node q.

As node p was the root of the tree, node q replaces it and becomes the root of the tree.


Constraints:
The total number of nodes is between `[2, 1000]`.

Each node has a unique value.

`p != null`
`q != null`
`p` and `q` are two different nodes (i.e. `p != q`).', true, 'Hard', NULL, 64.2, 
   0, 'https://leetcode.com/problems/move-sub-tree-of-n-ary-tree', 25, 1.2, 1.9, '["Google"]'::jsonb, '["Tree"]'::jsonb, 
   13, 28, 32, true, '[]'::jsonb, true),
  (1517, 'Find Users With Valid E-Mails', 'SQL Schema', true, 'Easy', NULL, 71.2, 
   12.5, 'https://leetcode.com/problems/find-users-with-valid-e-mails', 40, 10.3, 14.5, '["Apple"]'::jsonb, '[]'::jsonb, 
   57, 25, 70, true, '[]'::jsonb, true),
  (1518, 'Water Bottles', 'Given `numBottles` full water bottles, you can exchange `numExchange` empty water bottles for one full water bottle.

The operation of drinking a full water bottle turns it into an empty bottle.

Return the maximum number of water bottles you can drink.


Example 1:
Input: numBottles = 9, numExchange = 3
Output: 13
Explanation: You can exchange 3 empty bottles to get 1 full water bottle.

Number of water bottles you can drink: 9 + 3 + 1 = 13.


Example 2:
Input: numBottles = 15, numExchange = 4
Output: 19
Explanation: You can exchange 4 empty bottles to get 1 full water bottle. 
Number of water bottles you can drink: 15 + 3 + 1 = 19.


Example 3:
Input: numBottles = 5, numExchange = 5
Output: 6

Example 4:
Input: numBottles = 2, numExchange = 3
Output: 2

Constraints:
`1 <= numBottles <= 100`
`2 <= numExchange <= 100`', false, 'Easy', NULL, 60.6, 
   6.6, 'https://leetcode.com/problems/water-bottles', 541, 33.4, 55.1, '["IBM"]'::jsonb, '["Greedy"]'::jsonb, 
   416, 40, 91, false, '[]'::jsonb, true),
  (1519, 'Number of Nodes in the Sub-Tree With the Same Label', 'Given a tree (i.e. a connected, undirected graph that has no cycles) consisting of `n` nodes numbered from `0` to `n - 1` and exactly `n - 1` `edges`. The root of the tree is the node `0`, and each node of the tree has a label which is a lower-case character given in the string `labels` (i.e. The node with the number `i` has the label `labels[i]`).

The `edges` array is given on the form `edges[i] = [ai, bi]`, which means there is an edge between nodes `ai` and `bi` in the tree.

Return an array of size `n` where `ans[i]` is the number of nodes in the subtree of the `ith` node which have the same label as node `i`.

A subtree of a tree `T` is the tree consisting of a node in `T` and all of its descendant nodes.


Example 1:
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], labels = "abaedcd"
Output: [2,1,1,1,1,1,1]
Explanation: Node 0 has label ''a'' and its sub-tree has node 2 with label ''a'' as well, thus the answer is 2. Notice that any node is part of its sub-tree.

Node 1 has a label ''b''. The sub-tree of node 1 contains nodes 1,4 and 5, as nodes 4 and 5 have different labels than node 1, the answer is just 1 (the node itself).


Example 2:
Input: n = 4, edges = [[0,1],[1,2],[0,3]], labels = "bbbb"
Output: [4,2,1,1]
Explanation: The sub-tree of node 2 contains only node 2, so the answer is 1.

The sub-tree of node 3 contains only node 3, so the answer is 1.

The sub-tree of node 1 contains nodes 1 and 2, both have label ''b'', thus the answer is 2.

The sub-tree of node 0 contains nodes 0, 1, 2 and 3, all with label ''b'', thus the answer is 4.


Example 3:
Input: n = 5, edges = [[0,1],[0,2],[1,3],[0,4]], labels = "aabab"
Output: [3,2,1,1,1]

Example 4:
Input: n = 6, edges = [[0,1],[0,2],[1,3],[3,4],[4,5]], labels = "cbabaa"
Output: [1,2,1,1,2,1]

Example 5:
Input: n = 7, edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]], labels = "aaabaaa"
Output: [6,5,4,1,3,2,1]

Constraints:
`1 <= n <= 10^5`
`edges.length == n - 1`
`edges[i].length == 2`
`0 <= ai, bi < n`
`ai != bi`
`labels.length == n`
`labels` is consisting of only of lower-case English letters.', false, 'Medium', NULL, 37.2, 
   0, 'https://leetcode.com/problems/number-of-nodes-in-the-sub-tree-with-the-same-label', 238, 12, 32.2, '["Samsung,Uber"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   240, 251, 49, false, '[]'::jsonb, true),
  (1520, 'Maximum Number of Non-Overlapping Substrings', 'Given a string `s` of lowercase letters, you need to find the maximum number of non-empty substrings of `s` that meet the following conditions:
The substrings do not overlap, that is for any two substrings `s[i..j]` and `s[k..l]`, either `j < k` or `i > l` is true.

A substring that contains a certain character `c` must also contain all occurrences of `c`.

Find the maximum number of substrings that meet the above conditions. If there are multiple solutions with the same number of substrings, return the one with minimum total length. It can be shown that there exists a unique solution of minimum total length.

Notice that you can return the substrings in any order.


Example 1:
Input: s = "adefaddaccc"
Output: ["e","f","ccc"]
Explanation: The following are all the possible substrings that meet the conditions:
[
  "adefaddaccc"
  "adefadda",
  "ef",
  "e",
  "f",
  "ccc",
]
If we choose the first string, we cannot choose anything else and we''d get only 1. If we choose "adefadda", we are left with "ccc" which is the only one that doesn''t overlap, thus obtaining 2 substrings. Notice also, that it''s not optimal to choose "ef" since it can be split into two. Therefore, the optimal way is to choose ["e","f","ccc"] which gives us 3 substrings. No other solution of the same number of substrings exist.


Example 2:
Input: s = "abbaccd"
Output: ["d","bb","cc"]
Explanation: Notice that while the set of substrings ["d","abba","cc"] also has length 3, it''s considered incorrect since it has larger total length.


Constraints:
`1 <= s.length <= 10^5`
`s` contains only lowercase English letters.', false, 'Hard', NULL, 36.5, 
   0, 'https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings', 90, 8.1, 22.3, '["Amazon"]'::jsonb, '["Greedy"]'::jsonb, 
   341, 46, 88, true, '[]'::jsonb, true),
  (1521, 'Find a Value of a Mysterious Function Closest to Target', 'Winston was given the above mysterious function `func`. He has an integer array `arr` and an integer `target` and he wants to find the values `l` and `r` that make the value `|func(arr, l, r) - target|` minimum possible.

Return the minimum possible value of `|func(arr, l, r) - target|`.

Notice that `func` should be called with the values `l` and `r` where `0 <= l, r < arr.length`.


Example 1:
Input: arr = [9,12,3,7,15], target = 5
Output: 2
Explanation: Calling func with all the pairs of [l,r] = [[0,0],[1,1],[2,2],[3,3],[4,4],[0,1],[1,2],[2,3],[3,4],[0,2],[1,3],[2,4],[0,3],[1,4],[0,4]], Winston got the following results [9,12,3,7,15,8,0,3,7,0,0,3,0,0,0]. The value closest to 5 is 7 and 3, thus the minimum difference is 2.


Example 2:
Input: arr = [1000000,1000000,1000000], target = 1
Output: 999999
Explanation: Winston called the func with all possible values of [l,r] and he always got 1000000, thus the min difference is 999999.


Example 3:
Input: arr = [1,2,4,8,16], target = 0
Output: 0

Constraints:
`1 <= arr.length <= 105`
`1 <= arr[i] <= 106`
`0 <= target <= 107`', false, 'Hard', NULL, 44.2, 
   0, 'https://leetcode.com/problems/find-a-value-of-a-mysterious-function-closest-to-target', 78, 6.1, 13.7, '["American Express"]'::jsonb, '["Binary Search,Bit Manipulation,Segment Tree"]'::jsonb, 
   200, 8, 96, false, '[]'::jsonb, true),
  (1522, 'Diameter of N-Ary Tree', 'Given a `root` of an N-ary tree, you need to compute the length of the diameter of the tree.

The diameter of an N-ary tree is the length of the longest path between any two nodes in the tree. This path may or may not pass through the root.

(Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value.)

Example 1:
Input: root = [1,null,3,2,4,null,5,6]
Output: 3
Explanation: Diameter is shown in red color.


Example 2:
Input: root = [1,null,2,null,3,4,null,5,null,6]
Output: 4

Example 3:
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: 7

Constraints:
The depth of the n-ary tree is less than or equal to `1000`.

The total number of nodes is between `[1, 104]`.', true, 'Medium', '/articles/diameter-of-n-ary-tree', 69.4, 
   15.4, 'https://leetcode.com/problems/diameter-of-n-ary-tree', 103, 6.7, 9.6, '["Facebook,Microsoft"]'::jsonb, '[]'::jsonb, 
   131, 2, 98, true, '[]'::jsonb, true),
  (1523, 'Count Odd Numbers in an Interval Range', 'Given two non-negative integers `low` and `high`. Return the count of odd numbers between `low` and `high` (inclusive).


Example 1:
Input: low = 3, high = 7
Output: 3
Explanation: The odd numbers between 3 and 7 are [3,5,7].


Example 2:
Input: low = 8, high = 10
Output: 1
Explanation: The odd numbers between 8 and 10 are [9].


Constraints:
`0 <= low <= high <= 10^9`', false, 'Easy', NULL, 54.2, 
   0, 'https://leetcode.com/problems/count-odd-numbers-in-an-interval-range', 355, 22.2, 40.9, '["Microsoft"]'::jsonb, '["Math"]'::jsonb, 
   203, 23, 90, false, '[]'::jsonb, true),
  (1524, 'Number of Sub-arrays With Odd Sum', 'Given an array of integers `arr`. Return the number of sub-arrays with odd sum.

As the answer may grow large, the answer must be computed modulo `10^9 + 7`.


Example 1:
Input: arr = [1,3,5]
Output: 4
Explanation: All sub-arrays are [[1],[1,3],[1,3,5],[3],[3,5],[5]]
All sub-arrays sum are [1,4,9,3,8,5].

Odd sums are [1,9,3,5] so the answer is 4.


Example 2:
Input: arr = [2,4,6]
Output: 0
Explanation: All sub-arrays are [[2],[2,4],[2,4,6],[4],[4,6],[6]]
All sub-arrays sum are [2,6,12,4,10,6].

All sub-arrays have even sum and the answer is 0.


Example 3:
Input: arr = [1,2,3,4,5,6,7]
Output: 16

Example 4:
Input: arr = [100,100,99,99]
Output: 4

Example 5:
Input: arr = [7]
Output: 1

Constraints:
`1 <= arr.length <= 10^5`
`1 <= arr[i] <= 100`', false, 'Medium', NULL, 40.1, 
   0, 'https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum', 176, 12.9, 32.2, '["Directi"]'::jsonb, '["Array,Math"]'::jsonb, 
   357, 18, 95, false, '[]'::jsonb, true),
  (1525, 'Number of Good Ways to Split a String', 'You are given a string `s`, a split is called good if you can split `s` into 2 non-empty strings `p` and `q` where its concatenation is equal to `s` and the number of distinct letters in `p` and `q` are the same.

Return the number of good splits you can make in `s`.


Example 1:
Input: s = "aacaba"
Output: 2
Explanation: There are 5 ways to split `"aacaba"` and 2 of them are good. 
("a", "acaba") Left string and right string contains 1 and 3 different letters respectively.

("aa", "caba") Left string and right string contains 1 and 3 different letters respectively.

("aac", "aba") Left string and right string contains 2 and 2 different letters respectively (good split).

("aaca", "ba") Left string and right string contains 2 and 2 different letters respectively (good split).

("aacab", "a") Left string and right string contains 3 and 1 different letters respectively.


Example 2:
Input: s = "abcd"
Output: 1
Explanation: Split the string as follows ("ab", "cd").


Example 3:
Input: s = "aaaaa"
Output: 4
Explanation: All possible splits are good.


Example 4:
Input: s = "acbadbaada"
Output: 2

Constraints:
`s` contains only lowercase English letters.

`1 <= s.length <= 10^5`', false, 'Medium', NULL, 66.8, 
   10.5, 'https://leetcode.com/problems/number-of-good-ways-to-split-a-string', 320, 20, 29.9, '["Google"]'::jsonb, '["String,Bit Manipulation"]'::jsonb, 
   405, 12, 97, true, '[]'::jsonb, true),
  (1526, 'Minimum Number of Increments on Subarrays to Form a Target Array', 'Given an array of positive integers `target` and an array `initial` of same size with all zeros.

Return the minimum number of operations to form a `target` array from `initial` if you are allowed to do the following operation:
Choose any subarray from `initial` and increment each value by one.

The answer is guaranteed to fit within the range of a 32-bit signed integer.


Example 1:
Input: target = [1,2,3,2,1]
Output: 3
Explanation: We need at least 3 operations to form the target array from the initial array.

[0,0,0,0,0] increment 1 from index 0 to 4 (inclusive).

[1,1,1,1,1] increment 1 from index 1 to 3 (inclusive).

[1,2,2,2,1] increment 1 at index 2.

[1,2,3,2,1] target array is formed.


Example 2:
Input: target = [3,1,1,2]
Output: 4
Explanation: (initial)[0,0,0,0] -> [1,1,1,1] -> [1,1,1,2] -> [2,1,1,2] -> [3,1,1,2] (target).


Example 3:
Input: target = [3,1,5,4,2]
Output: 7
Explanation: (initial)[0,0,0,0,0] -> [1,1,1,1,1] -> [2,1,1,1,1] -> [3,1,1,1,1] 
                                  -> [3,1,2,2,2] -> [3,1,3,3,2] -> [3,1,4,4,2] -> [3,1,5,4,2] (target).


Example 4:
Input: target = [1,1,1,1]
Output: 1

Constraints:
`1 <= target.length <= 10^5`
`1 <= target[i] <= 10^5`', false, 'Hard', NULL, 60.3, 
   0, 'https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array', 131, 7.9, 13.1, '["Google"]'::jsonb, '["Segment Tree"]'::jsonb, 
   302, 17, 95, true, '[]'::jsonb, true),
  (1527, 'Patients With a Condition', 'SQL Schema', true, 'Easy', NULL, 63.1, 
   0, 'https://leetcode.com/problems/patients-with-a-condition', 52, 9.3, 14.7, '[]'::jsonb, '[]'::jsonb, 
   22, 56, 28, false, '[]'::jsonb, true),
  (1528, 'Shuffle String', 'Given a string `s` and an integer array `indices` of the same length.

The string `s` will be shuffled such that the character at the `ith` position moves to `indices[i]` in the shuffled string.

Return the shuffled string.


Example 1:
Input: s = "codeleet", `indices` = [4,5,6,7,0,2,1,3]
Output: "leetcode"
Explanation: As shown, "codeleet" becomes "leetcode" after shuffling.


Example 2:
Input: s = "abc", `indices` = [0,1,2]
Output: "abc"
Explanation: After shuffling, each character remains in its position.


Example 3:
Input: s = "aiohn", `indices` = [3,1,4,2,0]
Output: "nihao"

Example 4:
Input: s = "aaiougrt", `indices` = [4,0,2,6,7,3,1,5]
Output: "arigatou"

Example 5:
Input: s = "art", `indices` = [1,0,2]
Output: "rat"

Constraints:
`s.length == indices.length == n`
`1 <= n <= 100`
`s` contains only lower-case English letters.

`0 <= indices[i] < n`
All values of `indices` are unique (i.e. `indices` is a permutation of the integers from `0` to `n - 1`).', false, 'Easy', NULL, 85.7, 
   5.7, 'https://leetcode.com/problems/shuffle-string', 927, 101.7, 118.7, '["Facebook"]'::jsonb, '["Sort"]'::jsonb, 
   544, 142, 79, true, '[]'::jsonb, true),
  (1529, 'Bulb Switcher IV', 'There is a room with `n` bulbs, numbered from `0` to `n-1`, arranged in a row from left to right. Initially all the bulbs are turned off.

Your task is to obtain the configuration represented by `target` where `target[i]` is ''1'' if the i-th bulb is turned on and is ''0'' if it is turned off.

You have a switch to flip the state of the bulb, a flip operation is defined as follows:
Choose any bulb (index `i`) of your current configuration.

Flip each bulb from index `i` to `n-1`.

When any bulb is flipped it means that if it is 0 it changes to 1 and if it is 1 it changes to 0.

Return the minimum number of flips required to form `target`.


Example 1:
Input: target = "10111"
Output: 3
Explanation: Initial configuration "00000".

flip from the third bulb:  "00000" -> "00111"
flip from the first bulb:  "00111" -> "11000"
flip from the second bulb:  "11000" -> "10111"
We need at least 3 flip operations to form target.


Example 2:
Input: target = "101"
Output: 3
Explanation: "000" -> "111" -> "100" -> "101".


Example 3:
Input: target = "00000"
Output: 0

Example 4:
Input: target = "001011101"
Output: 5

Constraints:
`1 <= target.length <= 10^5`
`target[i] == ''0''` or `target[i] == ''1''`', false, 'Medium', NULL, 70.8, 
   10.3, 'https://leetcode.com/problems/bulb-switcher-iv', 385, 21.7, 30.6, '["Citrix"]'::jsonb, '["String"]'::jsonb, 
   364, 19, 95, false, '[]'::jsonb, true),
  (1530, 'Number of Good Leaf Nodes Pairs', 'Given the `root` of a binary tree and an integer `distance`. A pair of two different leaf nodes of a binary tree is said to be good if the length of the shortest path between them is less than or equal to `distance`.

Return the number of good leaf node pairs in the tree.


Example 1:
Input: root = [1,2,3,null,4], distance = 3
Output: 1
Explanation: The leaf nodes of the tree are 3 and 4 and the length of the shortest path between them is 3. This is the only good pair.


Example 2:
Input: root = [1,2,3,4,5,6,7], distance = 3
Output: 2
Explanation: The good pairs are [4,5] and [6,7] with shortest path = 2. The pair [4,6] is not good because the length of ther shortest path between them is 4.


Example 3:
Input: root = [7,1,4,6,null,5,3,null,null,null,null,null,2], distance = 3
Output: 1
Explanation: The only good pair is [2,5].


Example 4:
Input: root = [100], distance = 1
Output: 0

Example 5:
Input: root = [1,1,1], distance = 2
Output: 1

Constraints:
The number of nodes in the `tree` is in the range `[1, 2^10].`
Each node''s value is between `[1, 100]`.

`1 <= distance <= 10`', false, 'Medium', NULL, 56.5, 
   7.2, 'https://leetcode.com/problems/number-of-good-leaf-nodes-pairs', 247, 16, 28.3, '["Google"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   654, 12, 98, true, '[]'::jsonb, true),
  (1531, 'String Compression II', 'Run-length encoding is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string `"aabccc"` we replace `"aa"` by `"a2"` and replace `"ccc"` by `"c3"`. Thus the compressed string becomes `"a2bc3"`.

Notice that in this problem, we are not adding `''1''` after single characters.

Given a string `s` and an integer `k`. You need to delete at most `k` characters from `s` such that the run-length encoded version of `s` has minimum length.

Find the minimum length of the run-length encoded version of `s` after deleting at most `k` characters.


Example 1:
Input: s = "aaabcccd", k = 2
Output: 4
Explanation: Compressing s without deleting anything will give us "a3bc3d" of length 6. Deleting any of the characters ''a'' or ''c'' would at most decrease the length of the compressed string to 5, for instance delete 2 ''a'' then we will have s = "abcccd" which compressed is abc3d. Therefore, the optimal way is to delete ''b'' and ''d'', then the compressed version of s will be "a3c3" of length 4.


Example 2:
Input: s = "aabbaa", k = 2
Output: 2
Explanation: If we delete both ''b'' characters, the resulting compressed string would be "a4" of length 2.


Example 3:
Input: s = "aaaaaaaaaaa", k = 0
Output: 3
Explanation: Since k is zero, we cannot delete anything. The compressed string is "a11" of length 3.


Constraints:
`1 <= s.length <= 100`
`0 <= k <= s.length`
`s` contains only lowercase English letters.', false, 'Hard', NULL, 34.1, 
   61.4, 'https://leetcode.com/problems/string-compression-ii', 62, 6.4, 18.7, '["Toptal"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   286, 29, 91, false, '[]'::jsonb, true),
  (1532, 'The Most Recent Three Orders', 'SQL Schema', true, 'Medium', NULL, 72.8, 
   1.5, 'https://leetcode.com/problems/the-most-recent-three-orders', 185, 7.3, 10, '[]'::jsonb, '[]'::jsonb, 
   54, 1, 98, false, '[]'::jsonb, true),
  (1533, 'Find the Index of the Large Integer', 'We have an integer array `arr`, where all the integers in `arr` are equal except for one integer which is larger than the rest of the integers. You will not be given direct access to the array, instead, you will have an API `ArrayReader` which have the following functions:
`int compareSub(int l, int r, int x, int y)`: where `0 <= l, r, x, y < ArrayReader.length()`, `l <= r and` `x <= y`. The function compares the sum of sub-array `arr[l..r]` with the sum of the sub-array `arr[x..y]` and returns:
	
1 if `arr[l]+arr[l+1]+...+arr[r] > arr[x]+arr[x+1]+...+arr[y]`.

0 if `arr[l]+arr[l+1]+...+arr[r] == arr[x]+arr[x+1]+...+arr[y]`.

-1 if `arr[l]+arr[l+1]+...+arr[r] < arr[x]+arr[x+1]+...+arr[y]`.

`int length()`: Returns the size of the array.

You are allowed to call `compareSub()` 20 times at most. You can assume both functions work in `O(1)` time.

Return the index of the array `arr` which has the largest integer.

Follow-up:
What if there are two numbers in `arr` that are bigger than all other numbers?
What if there is one number that is bigger than other numbers and one number that is smaller than other numbers?

Example 1:
Input: arr = [7,7,7,7,10,7,7,7]
Output: 4
Explanation: The following calls to the API
reader.compareSub(0, 0, 1, 1) // returns 0 this is a query comparing the sub-array (0, 0) with the sub array (1, 1), (i.e. compares arr[0] with arr[1]).

Thus we know that arr[0] and arr[1] doesn''t contain the largest element.

reader.compareSub(2, 2, 3, 3) // returns 0, we can exclude arr[2] and arr[3].

reader.compareSub(4, 4, 5, 5) // returns 1, thus for sure arr[4] is the largest element in the array.

Notice that we made only 3 calls, so the answer is valid.


Example 2:
Input: nums = [6,6,12]
Output: 2

Constraints:
`2 <= arr.length <= 5 * 10^5`
`1 <= arr[i] <= 100`
All elements of `arr` are equal except for one element which is larger than all other elements.', true, 'Medium', NULL, 54.5, 
   0, 'https://leetcode.com/problems/find-the-index-of-the-large-integer', 49, 2.2, 4, '["Amazon"]'::jsonb, '["Binary Search"]'::jsonb, 
   48, 8, 86, true, '[]'::jsonb, true),
  (1534, 'Count Good Triplets', 'Given an array of integers `arr`, and three integers `a`, `b` and `c`. You need to find the number of good triplets.

A triplet `(arr[i], arr[j], arr[k])` is good if the following conditions are true:
`0 <= i < j < k < arr.length`
`|arr[i] - arr[j]| <= a`
`|arr[j] - arr[k]| <= b`
`|arr[i] - arr[k]| <= c`
Where `|x|` denotes the absolute value of `x`.

Return the number of good triplets.


Example 1:
Input: arr = [3,0,1,1,9,7], a = 7, b = 2, c = 3
Output: 4
Explanation: There are 4 good triplets: [(3,0,1), (3,0,1), (3,1,1), (0,1,1)].


Example 2:
Input: arr = [1,1,2,2,3], a = 0, b = 0, c = 1
Output: 0
Explanation: No triplet satisfies all conditions.


Constraints:
`3 <= arr.length <= 100`
`0 <= arr[i] <= 1000`
`0 <= a, b, c <= 1000`', false, 'Easy', NULL, 80.3, 
   7.8, 'https://leetcode.com/problems/count-good-triplets', 319, 47.8, 59.5, '["Turvo"]'::jsonb, '["Array"]'::jsonb, 
   209, 584, 26, false, '[]'::jsonb, true),
  (1535, 'Find the Winner of an Array Game', 'Given an integer array `arr` of distinct integers and an integer `k`.

A game will be played between the first two elements of the array (i.e. `arr[0]` and `arr[1]`). In each round of the game, we compare `arr[0]` with `arr[1]`, the larger integer wins and remains at position `0` and the smaller integer moves to the end of the array. The game ends when an integer wins `k` consecutive rounds.

Return the integer which will win the game.

It is guaranteed that there will be a winner of the game.


Example 1:
Input: arr = [2,1,3,5,4,6,7], k = 2
Output: 5
Explanation: Let''s see the rounds of the game:
Round |       arr       | winner | win_count
  1   | [2,1,3,5,4,6,7] | 2      | 1
  2   | [2,3,5,4,6,7,1] | 3      | 1
  3   | [3,5,4,6,7,1,2] | 5      | 1
  4   | [5,4,6,7,1,2,3] | 5      | 2
So we can see that 4 rounds will be played and 5 is the winner because it wins 2 consecutive games.


Example 2:
Input: arr = [3,2,1], k = 10
Output: 3
Explanation: 3 will win the first 10 rounds consecutively.


Example 3:
Input: arr = [1,9,8,2,3,7,6,4,5], k = 7
Output: 9

Example 4:
Input: arr = [1,11,22,33,44,55,66,77,88,99], k = 1000000000
Output: 99

Constraints:
`2 <= arr.length <= 10^5`
`1 <= arr[i] <= 10^6`
`arr` contains distinct integers.

`1 <= k <= 10^9`', false, 'Medium', NULL, 47.6, 
   0, 'https://leetcode.com/problems/find-the-winner-of-an-array-game', 234, 18.9, 39.8, '["Directi"]'::jsonb, '["Array"]'::jsonb, 
   321, 23, 93, false, '[]'::jsonb, true),
  (1536, 'Minimum Swaps to Arrange a Binary Grid', 'Given an `n x n` binary `grid`, in one step you can choose two adjacent rows of the grid and swap them.

A grid is said to be valid if all the cells above the main diagonal are zeros.

Return the minimum number of steps needed to make the grid valid, or -1 if the grid cannot be valid.

The main diagonal of a grid is the diagonal that starts at cell `(1, 1)` and ends at cell `(n, n)`.


Example 1:
Input: grid = [[0,0,1],[1,1,0],[1,0,0]]
Output: 3

Example 2:
Input: grid = [[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0]]
Output: -1
Explanation: All rows are similar, swaps have no effect on the grid.


Example 3:
Input: grid = [[1,0,0],[1,1,0],[1,1,1]]
Output: 0

Constraints:
`n == grid.length`
`n == grid[i].length`
`1 <= n <= 200`
`grid[i][j]` is `0` or `1`', false, 'Medium', NULL, 43.7, 
   0, 'https://leetcode.com/problems/minimum-swaps-to-arrange-a-binary-grid', 178, 8.6, 19.7, '["Ajira"]'::jsonb, '["Greedy"]'::jsonb, 
   279, 52, 84, false, '[]'::jsonb, true),
  (1537, 'Get the Maximum Score', 'You are given two sorted arrays of distinct integers `nums1` and `nums2.`
A valid path is defined as follows:
Choose array nums1 or nums2 to traverse (from index-0).

Traverse the current array from left to right.

If you are reading any value that is present in `nums1` and `nums2` you are allowed to change your path to the other array. (Only one repeated value is considered in the valid path).

Score is defined as the sum of uniques values in a valid path.

Return the maximum score you can obtain of all possible valid paths.

Since the answer may be too large, return it modulo 10^9 + 7.


Example 1:
Input: nums1 = [2,4,5,8,10], nums2 = [4,6,8,9]
Output: 30
Explanation: Valid paths:
[2,4,5,8,10], [2,4,5,8,9], [2,4,6,8,9], [2,4,6,8,10],  (starting from nums1)
[4,6,8,9], [4,5,8,10], [4,5,8,9], [4,6,8,10]    (starting from nums2)
The maximum is obtained with the path in green [2,4,6,8,10].


Example 2:
Input: nums1 = [1,3,5,7,9], nums2 = [3,5,100]
Output: 109
Explanation: Maximum sum is obtained with the path [1,3,5,100].


Example 3:
Input: nums1 = [1,2,3,4,5], nums2 = [6,7,8,9,10]
Output: 40
Explanation: There are no common elements between nums1 and nums2.

Maximum sum is obtained with the path [6,7,8,9,10].


Example 4:
Input: nums1 = [1,4,5,8,9,11,19], nums2 = [2,3,4,11,12]
Output: 61

Constraints:
`1 <= nums1.length <= 10^5`
`1 <= nums2.length <= 10^5`
`1 <= nums1[i], nums2[i] <= 10^7`
`nums1` and `nums2` are strictly increasing.', false, 'Hard', NULL, 36.6, 
   5.8, 'https://leetcode.com/problems/get-the-maximum-score', 159, 10, 27.2, '["MindTickle"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   324, 22, 94, false, '[]'::jsonb, true),
  (1538, 'Guess the Majority in a Hidden Array', 'We have an integer array `nums`, where all the integers in `nums` are 0 or 1. You will not be given direct access to the array, instead, you will have an API `ArrayReader` which have the following functions:
`int query(int a, int b, int c, int d)`: where `0 <= a < b < c < d < ArrayReader.length()`. The function returns the distribution of the value of the 4 elements and returns:
	
4 : if the values of the 4 elements are the same (0 or 1).

2 : if three elements have a value equal to 0 and one element has value equal to 1 or vice versa.

0 : if two element have a value equal to 0 and two elements have a value equal to 1.

`int length()`: Returns the size of the array.

You are allowed to call `query()` 2 * n times at most where n is equal to `ArrayReader.length()`.

Return any index of the most frequent value in `nums`, in case of tie, return -1.

Follow up: What is the minimum number of calls needed to find the majority element?

Example 1:
Input: nums = [0,0,1,0,1,1,1,1]
Output: 5
Explanation: The following calls to the API
reader.length() // returns 8 because there are 8 elements in the hidden array.

reader.query(0,1,2,3) // returns 2 this is a query that compares the elements nums[0], nums[1], nums[2], nums[3]
// Three elements have a value equal to 0 and one element has value equal to 1 or viceversa.

reader.query(4,5,6,7) // returns 4 because nums[4], nums[5], nums[6], nums[7] have the same value.

we can infer that the most frequent value is found in the last 4 elements.

Index 2, 4, 6, 7 is also a correct answer.


Example 2:
Input: nums = [0,0,1,1,0]
Output: 0

Example 3:
Input: nums = [1,0,1,0,1,0,1,0]
Output: -1

Constraints:
`5 <= nums.length <= 10^5`
`0 <= nums[i] <= 1`', true, 'Medium', NULL, 61.3, 
   0, 'https://leetcode.com/problems/guess-the-majority-in-a-hidden-array', 17, 844, 1.4, '["Google"]'::jsonb, '[]'::jsonb, 
   44, 17, 72, true, '[]'::jsonb, true),
  (1539, 'Kth Missing Positive Number', 'Given an array `arr` of positive integers sorted in a strictly increasing order, and an integer `k`.

Find the `kth` positive integer that is missing from this array.


Example 1:
Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.


Example 2:
Input: arr = [1,2,3,4], k = 2
Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.


Constraints:
`1 <= arr.length <= 1000`
`1 <= arr[i] <= 1000`
`1 <= k <= 1000`
`arr[i] < arr[j]` for `1 <= i < j <= arr.length`', false, 'Easy', '/articles/kth-missing-positive-number', 54.9, 
   33.6, 'https://leetcode.com/problems/kth-missing-positive-number', 651, 73.4, 133.9, '["Facebook,Amazon,Microsoft,Apple"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   912, 49, 95, true, '[]'::jsonb, true),
  (1540, 'Can Convert String in K Moves', 'Given two strings `s` and `t`, your goal is to convert `s` into `t` in `k` moves or less.

During the `ith` (`1 <= i <= k`) move you can:
Choose any index `j` (1-indexed) from `s`, such that `1 <= j <= s.length` and `j` has not been chosen in any previous move, and shift the character at that index `i` times.

Do nothing.

Shifting a character means replacing it by the next letter in the alphabet (wrapping around so that `''z''` becomes `''a''`). Shifting a character by `i` means applying the shift operations `i` times.

Remember that any index `j` can be picked at most once.

Return `true` if it''s possible to convert `s` into `t` in no more than `k` moves, otherwise return `false`.


Example 1:
Input: s = "input", t = "ouput", k = 9
Output: true
Explanation: In the 6th move, we shift ''i'' 6 times to get ''o''. And in the 7th move we shift ''n'' to get ''u''.


Example 2:
Input: s = "abc", t = "bcd", k = 10
Output: false
Explanation: We need to shift each character in s one time to convert it into t. We can shift ''a'' to ''b'' during the 1st move. However, there is no way to shift the other characters in the remaining moves to obtain t from s.


Example 3:
Input: s = "aab", t = "bbb", k = 27
Output: true
Explanation: In the 1st move, we shift the first ''a'' 1 time to get ''b''. In the 27th move, we shift the second ''a'' 27 times to get ''b''.


Constraints:
`1 <= s.length, t.length <= 10^5`
`0 <= k <= 10^9`
`s`, `t` contain only lowercase English letters.', false, 'Medium', NULL, 31.2, 
   7.2, 'https://leetcode.com/problems/can-convert-string-in-k-moves', 175, 9.9, 31.9, '["Infosys"]'::jsonb, '["String,Greedy"]'::jsonb, 
   203, 160, 56, false, '[]'::jsonb, true),
  (1541, 'Minimum Insertions to Balance a Parentheses String', 'Given a parentheses string `s` containing only the characters `''(''` and `'')''`. A parentheses string is balanced if:
Any left parenthesis `''(''` must have a corresponding two consecutive right parenthesis `''))''`.

Left parenthesis `''(''` must go before the corresponding two consecutive right parenthesis `''))''`.

In other words, we treat `''(''` as openning parenthesis and `''))''` as closing parenthesis.

For example, `"())"`, `"())(())))"` and `"(())())))"` are balanced, `")()"`, `"()))"` and `"(()))"` are not balanced.

You can insert the characters `''(''` and `'')''` at any position of the string to balance it if needed.

Return the minimum number of insertions needed to make `s` balanced.


Example 1:
Input: s = "(()))"
Output: 1
Explanation: The second ''('' has two matching ''))'', but the first ''('' has only '')'' matching. We need to to add one more '')'' at the end of the string to be "(())))" which is balanced.


Example 2:
Input: s = "())"
Output: 0
Explanation: The string is already balanced.


Example 3:
Input: s = "))())("
Output: 3
Explanation: Add ''('' to match the first ''))'', Add ''))'' to match the last ''(''.


Example 4:
Input: s = "(((((("
Output: 12
Explanation: Add 12 '')'' to balance the string.


Example 5:
Input: s = ")))))))"
Output: 5
Explanation: Add 4 ''('' at the beginning of the string and one '')'' at the end. The string becomes "(((())))))))".


Constraints:
`1 <= s.length <= 10^5`
`s` consists of `''(''` and `'')''` only.', false, 'Medium', NULL, 43.1, 
   11.8, 'https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string', 184, 11.5, 26.7, '["Facebook"]'::jsonb, '["String,Stack"]'::jsonb, 
   292, 69, 81, true, '[]'::jsonb, true),
  (1542, 'Find Longest Awesome Substring', 'Given a string `s`. An awesome substring is a non-empty substring of `s` such that we can make any number of swaps in order to make it palindrome.

Return the length of the maximum length awesome substring of `s`.


Example 1:
Input: s = "3242415"
Output: 5
Explanation: "24241" is the longest awesome substring, we can form the palindrome "24142" with some swaps.


Example 2:
Input: s = "12345678"
Output: 1

Example 3:
Input: s = "213123"
Output: 6
Explanation: "213123" is the longest awesome substring, we can form the palindrome "231132" with some swaps.


Example 4:
Input: s = "00"
Output: 2

Constraints:
`1 <= s.length <= 10^5`
`s` consists only of digits.', false, 'Hard', NULL, 36.7, 
   0, 'https://leetcode.com/problems/find-longest-awesome-substring', 57, 5.6, 15.2, '["Directi"]'::jsonb, '["String,Bit Manipulation"]'::jsonb, 
   317, 7, 98, false, '[]'::jsonb, true),
  (1543, 'Fix Product Name Format', 'SQL Schema', true, 'Easy', NULL, 67.1, 
   1.8, 'https://leetcode.com/problems/fix-product-name-format', 69, 6.7, 10, '[]'::jsonb, '[]'::jsonb, 
   30, 18, 62, false, '[]'::jsonb, true),
  (1544, 'Make The String Great', 'Given a string `s` of lower and upper case English letters.

A good string is a string which doesn''t have two adjacent characters `s[i]` and `s[i + 1]` where:
`0 <= i <= s.length - 2`
`s[i]` is a lower-case letter and `s[i + 1]` is the same letter but in upper-case or vice-versa.

To make the string good, you can choose two adjacent characters that make the string bad and remove them. You can keep doing this until the string becomes good.

Return the string after making it good. The answer is guaranteed to be unique under the given constraints.

Notice that an empty string is also good.


Example 1:
Input: s = "leEeetcode"
Output: "leetcode"
Explanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".


Example 2:
Input: s = "abBAcC"
Output: ""
Explanation: We have many possible scenarios, and all lead to the same answer. For example:
"abBAcC" --> "aAcC" --> "cC" --> ""
"abBAcC" --> "abBA" --> "aA" --> ""

Example 3:
Input: s = "s"
Output: "s"

Constraints:
`1 <= s.length <= 100`
`s` contains only lower and upper case English letters.', false, 'Easy', NULL, 55.5, 
   2.6, 'https://leetcode.com/problems/make-the-string-great', 498, 30.1, 54.3, '["Google"]'::jsonb, '["String,Stack"]'::jsonb, 
   395, 41, 91, true, '[]'::jsonb, true),
  (1545, 'Find Kth Bit in Nth Binary String', 'Given two positive integers `n` and `k`, the binary string  `Sn` is formed as follows:
`S1 = "0"`
`Si = Si-1 + "1" + reverse(invert(Si-1))` for `i > 1`
Where `+` denotes the concatenation operation, `reverse(x)` returns the reversed string x, and `invert(x)` inverts all the bits in x (0 changes to 1 and 1 changes to 0).

For example, the first 4 strings in the above sequence are:
`S1 = "0"`
`S2 = "011"`
`S3 = "0111001"`
`S4 = "011100110110001"`
Return the `kth` bit in `Sn`. It is guaranteed that `k` is valid for the given `n`.


Example 1:
Input: n = 3, k = 1
Output: "0"
Explanation: S3 is "0111001". The first bit is "0".


Example 2:
Input: n = 4, k = 11
Output: "1"
Explanation: S4 is "011100110110001". The 11th bit is "1".


Example 3:
Input: n = 1, k = 1
Output: "0"

Example 4:
Input: n = 2, k = 3
Output: "1"

Constraints:
`1 <= n <= 20`
`1 <= k <= 2n - 1`', false, 'Medium', NULL, 57.6, 
   6.8, 'https://leetcode.com/problems/find-kth-bit-in-nth-binary-string', 206, 15.1, 26.2, '["Rupeek"]'::jsonb, '["String"]'::jsonb, 
   210, 20, 91, false, '[]'::jsonb, true),
  (1546, 'Maximum Number of Non-Overlapping Subarrays With Sum Equals Target', 'Given an array `nums` and an integer `target`.

Return the maximum number of non-empty non-overlapping subarrays such that the sum of values in each subarray is equal to `target`.


Example 1:
Input: nums = [1,1,1,1,1], target = 2
Output: 2
Explanation: There are 2 non-overlapping subarrays [1,1,1,1,1] with sum equals to target(2).


Example 2:
Input: nums = [-1,3,5,1,4,2,-9], target = 6
Output: 2
Explanation: There are 3 subarrays with sum equal to 6.

([5,1], [4,2], [3,5,1,4,2,-9]) but only the first 2 are non-overlapping.


Example 3:
Input: nums = [-2,6,6,3,5,4,1,2,8], target = 10
Output: 3

Example 4:
Input: nums = [0,0,0], target = 0
Output: 3

Constraints:
`1 <= nums.length <= 10^5`
`-10^4 <= nums[i] <= 10^4`
`0 <= target <= 10^6`', false, 'Medium', NULL, 43.9, 
   5.3, 'https://leetcode.com/problems/maximum-number-of-non-overlapping-subarrays-with-sum-equals-target', 179, 13.4, 30.6, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   467, 7, 99, true, '[]'::jsonb, true),
  (1547, 'Minimum Cost to Cut a Stick', 'Given a wooden stick of length `n` units. The stick is labelled from `0` to `n`. For example, a stick of length 6 is labelled as follows:
Given an integer array `cuts` where `cuts[i]` denotes a position you should perform a cut at.

You should perform the cuts in order, you can change the order of the cuts as you wish.

The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. When you cut a stick, it will be split into two smaller sticks (i.e. the sum of their lengths is the length of the stick before the cut). Please refer to the first example for a better explanation.

Return the minimum total cost of the cuts.


Example 1:
Input: n = 7, cuts = [1,3,4,5]
Output: 16
Explanation: Using cuts order = [1, 3, 4, 5] as in the input leads to the following scenario:
The first cut is done to a rod of length 7 so the cost is 7. The second cut is done to a rod of length 6 (i.e. the second part of the first cut), the third is done to a rod of length 4 and the last cut is to a rod of length 3. The total cost is 7 + 6 + 4 + 3 = 20.

Rearranging the cuts to be [3, 5, 1, 4] for example will lead to a scenario with total cost = 16 (as shown in the example photo 7 + 4 + 3 + 2 = 16).


Example 2:
Input: n = 9, cuts = [5,6,1,4,2]
Output: 22
Explanation: If you try the given cuts ordering the cost will be 25.

There are much ordering with total cost <= 25, for example, the order [4, 6, 5, 2, 1] has total cost = 22 which is the minimum possible.


Constraints:
`2 <= n <= 10^6`
`1 <= cuts.length <= min(n - 1, 100)`
`1 <= cuts[i] <= n - 1`
All the integers in `cuts` array are distinct.', false, 'Hard', NULL, 52.9, 
   15.2, 'https://leetcode.com/problems/minimum-cost-to-cut-a-stick', 128, 10.7, 20.3, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   415, 7, 98, true, '[]'::jsonb, true),
  (1548, 'The Most Similar Path in a Graph', 'We have `n` cities and `m` bi-directional `roads` where `roads[i] = [ai, bi]` connects city `ai` with city `bi`. Each city has a name consisting of exactly 3 upper-case English letters given in the string array `names`. Starting at any city `x`, you can reach any city `y` where `y != x` (i.e. the cities and the roads are forming an undirected connected graph).

You will be given a string array `targetPath`. You should find a path in the graph of the same length and with the minimum edit distance to `targetPath`.

You need to return the order of the nodes in the path with the minimum edit distance, The path should be of the same length of `targetPath` and should be valid (i.e. there should be a direct road between `ans[i]` and `ans[i + 1]`). If there are multiple answers return any one of them.

The edit distance is defined as follows:
Follow-up: If each node can be visited only once in the path, What should you change in your solution?

Example 1:
Input: n = 5, roads = [[0,2],[0,3],[1,2],[1,3],[1,4],[2,4]], names = ["ATL","PEK","LAX","DXB","HND"], targetPath = ["ATL","DXB","HND","LAX"]
Output: [0,2,4,2]
Explanation: [0,2,4,2], [0,3,0,2] and [0,3,1,2] are accepted answers.

[0,2,4,2] is equivalent to ["ATL","LAX","HND","LAX"] which has edit distance = 1 with targetPath.

[0,3,0,2] is equivalent to ["ATL","DXB","ATL","LAX"] which has edit distance = 1 with targetPath.

[0,3,1,2] is equivalent to ["ATL","DXB","PEK","LAX"] which has edit distance = 1 with targetPath.


Example 2:
Input: n = 4, roads = [[1,0],[2,0],[3,0],[2,1],[3,1],[3,2]], names = ["ATL","PEK","LAX","DXB"], targetPath = ["ABC","DEF","GHI","JKL","MNO","PQR","STU","VWX"]
Output: [0,1,0,1,0,1,0,1]
Explanation: Any path in this graph has edit distance = 8 with targetPath.


Example 3:
Input: n = 6, roads = [[0,1],[1,2],[2,3],[3,4],[4,5]], names = ["ATL","PEK","LAX","ATL","DXB","HND"], targetPath = ["ATL","DXB","HND","DXB","ATL","LAX","PEK"]
Output: [3,4,5,4,3,2,1]
Explanation: [3,4,5,4,3,2,1] is the only path with edit distance = 0 with targetPath.

It''s equivalent to ["ATL","DXB","HND","DXB","ATL","LAX","PEK"]

Constraints:
`2 <= n <= 100`
`m == roads.length`
`n - 1 <= m <= (n * (n - 1) / 2)`
`0 <= ai, bi <= n - 1`
`ai != bi `
The graph is guaranteed to be connected and each pair of nodes may have at most one direct road.

`names.length == n`
`names[i].length == 3`
`names[i]` consists of upper-case English letters.

There can be two cities with the same name.

`1 <= targetPath.length <= 100`
`targetPath[i].length == 3`
`targetPath[i]` consists of upper-case English letters.', true, 'Hard', NULL, 54.5, 
   4, 'https://leetcode.com/problems/the-most-similar-path-in-a-graph', 62, 5.7, 10.5, '["Google"]'::jsonb, '["Dynamic Programming,Graph"]'::jsonb, 
   133, 64, 68, true, '[]'::jsonb, true),
  (1549, 'The Most Recent Orders for Each Product', 'SQL Schema', true, 'Medium', NULL, 67.1, 
   1.6, 'https://leetcode.com/problems/the-most-recent-orders-for-each-product', 128, 6.1, 9.1, '[]'::jsonb, '[]'::jsonb, 
   30, 4, 88, false, '[]'::jsonb, true),
  (1550, 'Three Consecutive Odds', 'Given an integer array `arr`, return `true` if there are three consecutive odd numbers in the array. Otherwise, return `false`.


Example 1:
Input: arr = [2,6,4,1]
Output: false
Explanation: There are no three consecutive odds.


Example 2:
Input: arr = [1,2,34,3,4,5,7,23,12]
Output: true
Explanation: [5,7,23] are three consecutive odds.


Constraints:
`1 <= arr.length <= 1000`
`1 <= arr[i] <= 1000`', false, 'Easy', NULL, 64.5, 
   2.3, 'https://leetcode.com/problems/three-consecutive-odds', 454, 33, 51.2, '["DJI"]'::jsonb, '["Array"]'::jsonb, 
   193, 33, 85, false, '[]'::jsonb, true),
  (1551, 'Minimum Operations to Make Array Equal', 'You have an array `arr` of length `n` where `arr[i] = (2 * i) + 1` for all valid values of `i` (i.e. `0 <= i < n`).

In one operation, you can select two indices `x` and `y` where `0 <= x, y < n` and subtract `1` from `arr[x]` and add `1` to `arr[y]` (i.e. perform `arr[x] -=1 `and `arr[y] += 1`). The goal is to make all the elements of the array equal. It is guaranteed that all the elements of the array can be made equal using some operations.

Given an integer `n`, the length of the array. Return the minimum number of operations needed to make all the elements of arr equal.


Example 1:
Input: n = 3
Output: 2
Explanation: arr = [1, 3, 5]
First operation choose x = 2 and y = 0, this leads arr to be [2, 3, 4]
In the second operation choose x = 2 and y = 0 again, thus arr = [3, 3, 3].


Example 2:
Input: n = 6
Output: 9

Constraints:
`1 <= n <= 10^4`', false, 'Medium', '/articles/minimum-operations-to-make-array-equal', 81, 
   0, 'https://leetcode.com/problems/minimum-operations-to-make-array-equal', 553, 46.1, 57, '["Brillio"]'::jsonb, '["Math"]'::jsonb, 
   433, 90, 83, false, '[]'::jsonb, true),
  (1552, 'Magnetic Force Between Two Balls', 'In universe Earth C-137, Rick discovered a special form of magnetic force between two balls if they are put in his new invented basket. Rick has `n` empty baskets, the `ith` basket is at `position[i]`, Morty has `m` balls and needs to distribute the balls into the baskets such that the minimum magnetic force between any two balls is maximum.

Rick stated that magnetic force between two different balls at positions `x` and `y` is `|x - y|`.

Given the integer array `position` and the integer `m`. Return the required force.


Example 1:
Input: position = [1,2,3,4,7], m = 3
Output: 3
Explanation: Distributing the 3 balls into baskets 1, 4 and 7 will make the magnetic force between ball pairs [3, 3, 6]. The minimum magnetic force is 3. We cannot achieve a larger minimum magnetic force than 3.


Example 2:
Input: position = [5,4,3,2,1,1000000000], m = 2
Output: 999999999
Explanation: We can use baskets 1 and 1000000000.


Constraints:
`n == position.length`
`2 <= n <= 10^5`
`1 <= position[i] <= 10^9`
All integers in `position` are distinct.

`2 <= m <= position.length`', false, 'Medium', NULL, 49.3, 
   7.3, 'https://leetcode.com/problems/magnetic-force-between-two-balls', 136, 12.8, 26, '["Roblox"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   500, 52, 91, false, '[]'::jsonb, true),
  (1553, 'Minimum Number of Days to Eat N Oranges', 'There are `n` oranges in the kitchen and you decided to eat some of these oranges every day as follows:
Eat one orange.

If the number of remaining oranges (`n`) is divisible by 2 then you can eat  n/2 oranges.

If the number of remaining oranges (`n`) is divisible by 3 then you can eat  2*(n/3) oranges.

You can only choose one of the actions per day.

Return the minimum number of days to eat `n` oranges.


Example 1:
Input: n = 10
Output: 4
Explanation: You have 10 oranges.

Day 1: Eat 1 orange,  10 - 1 = 9.  
Day 2: Eat 6 oranges, 9 - 2*(9/3) = 9 - 6 = 3. (Since 9 is divisible by 3)
Day 3: Eat 2 oranges, 3 - 2*(3/3) = 3 - 2 = 1. 
Day 4: Eat the last orange  1 - 1  = 0.

You need at least 4 days to eat the 10 oranges.


Example 2:
Input: n = 6
Output: 3
Explanation: You have 6 oranges.

Day 1: Eat 3 oranges, 6 - 6/2 = 6 - 3 = 3. (Since 6 is divisible by 2).

Day 2: Eat 2 oranges, 3 - 2*(3/3) = 3 - 2 = 1. (Since 3 is divisible by 3)
Day 3: Eat the last orange  1 - 1  = 0.

You need at least 3 days to eat the 6 oranges.


Example 3:
Input: n = 1
Output: 1

Example 4:
Input: n = 56
Output: 6

Constraints:
`1 <= n <= 2*10^9`', false, 'Hard', NULL, 29.9, 
   19.1, 'https://leetcode.com/problems/minimum-number-of-days-to-eat-n-oranges', 163, 14.3, 48, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   403, 32, 93, true, '[]'::jsonb, true),
  (1554, 'Strings Differ by One Character', 'Given a list of strings `dict` where all the strings are of the same length.

Return `True` if there are 2 strings that only differ by 1 character in the same index, otherwise return `False`.

Follow up: Could you solve this problem in O(n*m) where n is the length of `dict` and m is the length of each string.


Example 1:
Input: dict = ["abcd","acbd", "aacd"]
Output: true
Explanation: Strings "abcd" and "aacd" differ only by one character in the index 1.


Example 2:
Input: dict = ["ab","cd","yz"]
Output: false

Example 3:
Input: dict = ["abcd","cccc","abyd","abab"]
Output: true

Constraints:
Number of characters in `dict <= 10^5`
`dict[i].length == dict[j].length`
`dict[i]` should be unique.

`dict[i]` contains only lowercase English letters.', true, 'Medium', NULL, 63.9, 
   0, 'https://leetcode.com/problems/strings-differ-by-one-character', 53, 2.4, 3.8, '["Airbnb"]'::jsonb, '[]'::jsonb, 
   65, 2, 97, false, '[]'::jsonb, true),
  (1555, 'Bank Account Summary', 'SQL Schema', true, 'Medium', NULL, 53, 
   0, 'https://leetcode.com/problems/bank-account-summary', 152, 5.4, 10.2, '["Optum"]'::jsonb, '[]'::jsonb, 
   57, 13, 81, false, '[]'::jsonb, true),
  (1556, 'Thousand Separator', 'Given an integer `n`, add a dot (".") as the thousands separator and return it in string format.


Example 1:
Input: n = 987
Output: "987"

Example 2:
Input: n = 1234
Output: "1.234"

Example 3:
Input: n = 123456789
Output: "123.456.789"

Example 4:
Input: n = 0
Output: "0"

Constraints:
`0 <= n < 2^31`', false, 'Easy', NULL, 57.2, 
   5.5, 'https://leetcode.com/problems/thousand-separator', 404, 21.9, 38.3, '[]'::jsonb, '[]'::jsonb, 
   198, 7, 97, false, '[]'::jsonb, true),
  (1557, 'Minimum Number of Vertices to Reach All Nodes', 'Given a directed acyclic graph, with `n` vertices numbered from `0` to `n-1`, and an array `edges` where `edges[i] = [fromi, toi]` represents a directed edge from node `fromi` to node `toi`.

Find the smallest set of vertices from which all nodes in the graph are reachable. It''s guaranteed that a unique solution exists.

Notice that you can return the vertices in any order.


Example 1:
Input: n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]
Output: [0,3]
Explanation: It''s not possible to reach all the nodes from a single vertex. From 0 we can reach [0,1,2,5]. From 3 we can reach [3,4,2,5]. So we output [0,3].


Example 2:
Input: n = 5, edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]
Output: [0,2,3]
Explanation: Notice that vertices 0, 3 and 2 are not reachable from any other node, so we must include them. Also any of these vertices can reach nodes 1 and 4.


Constraints:
`2 <= n <= 10^5`
`1 <= edges.length <= min(10^5, n * (n - 1) / 2)`
`edges[i].length == 2`
`0 <= fromi, toi < n`
All pairs `(fromi, toi)` are distinct.', false, 'Medium', NULL, 75.8, 
   11, 'https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes', 311, 24.8, 32.8, '["Google,Airbnb"]'::jsonb, '["Graph"]'::jsonb, 
   519, 37, 93, true, '[]'::jsonb, true),
  (1558, 'Minimum Numbers of Function Calls to Make Target Array', 'Your task is to form an integer array `nums` from an initial array of zeros `arr` that is the same size as `nums`.

Return the minimum number of function calls to make `nums` from `arr`.

The answer is guaranteed to fit in a 32-bit signed integer.


Example 1:
Input: nums = [1,5]
Output: 5
Explanation: Increment by 1 (second element): [0, 0] to get [0, 1] (1 operation).

Double all the elements: [0, 1] -> [0, 2] -> [0, 4] (2 operations).

Increment by 1 (both elements)  [0, 4] -> [1, 4] -> [1, 5] (2 operations).

Total of operations: 1 + 2 + 2 = 5.


Example 2:
Input: nums = [2,2]
Output: 3
Explanation: Increment by 1 (both elements) [0, 0] -> [0, 1] -> [1, 1] (2 operations).

Double all the elements: [1, 1] -> [2, 2] (1 operation).

Total of operations: 2 + 1 = 3.


Example 3:
Input: nums = [4,2,5]
Output: 6
Explanation: (initial)[0,0,0] -> [1,0,0] -> [1,0,1] -> [2,0,2] -> [2,1,2] -> [4,2,4] -> [4,2,5](nums).


Example 4:
Input: nums = [3,2,2,4]
Output: 7

Example 5:
Input: nums = [2,4,8,16]
Output: 8

Constraints:
`1 <= nums.length <= 10^5`
`0 <= nums[i] <= 10^9`', false, 'Medium', NULL, 63.4, 
   0, 'https://leetcode.com/problems/minimum-numbers-of-function-calls-to-make-target-array', 136, 10.9, 17.3, '["Amazon"]'::jsonb, '["Greedy"]'::jsonb, 
   247, 15, 94, true, '[]'::jsonb, true),
  (1559, 'Detect Cycles in 2D Grid', 'Given a 2D array of characters `grid` of size `m x n`, you need to find if there exists any cycle consisting of the same value in `grid`.

A cycle is a path of length 4 or more in the grid that starts and ends at the same cell. From a given cell, you can move to one of the cells adjacent to it - in one of the four directions (up, down, left, or right), if it has the same value of the current cell.

Also, you cannot move to the cell that you visited in your last move. For example, the cycle `(1, 1) -> (1, 2) -> (1, 1)` is invalid because from `(1, 2)` we visited `(1, 1)` which was the last visited cell.

Return `true` if any cycle of the same value exists in `grid`, otherwise, return `false`.


Example 1:
Input: grid = [["a","a","a","a"],["a","b","b","a"],["a","b","b","a"],["a","a","a","a"]]
Output: true
Explanation: There are two valid cycles shown in different colors in the image below:

Example 2:
Input: grid = [["c","c","c","a"],["c","d","c","c"],["c","c","e","c"],["f","c","c","c"]]
Output: true
Explanation: There is only one valid cycle highlighted in the image below:

Example 3:
Input: grid = [["a","b","b"],["b","z","b"],["b","b","a"]]
Output: false

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m <= 500`
`1 <= n <= 500`
`grid` consists only of lowercase English letters.', false, 'Hard', NULL, 44.6, 
   6.8, 'https://leetcode.com/problems/detect-cycles-in-2d-grid', 191, 9.7, 21.7, '["Amazon"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   266, 9, 97, true, '[]'::jsonb, true),
  (1560, 'Most Visited Sector in  a Circular Track', 'Given an integer `n` and an integer array `rounds`. We have a circular track which consists of `n` sectors labeled from `1` to `n`. A marathon will be held on this track, the marathon consists of `m` rounds. The `ith` round starts at sector `rounds[i - 1]` and ends at sector `rounds[i]`. For example, round 1 starts at sector `rounds[0]` and ends at sector `rounds[1]`
Return an array of the most visited sectors sorted in ascending order.

Notice that you circulate the track in ascending order of sector numbers in the counter-clockwise direction (See the first example).


Example 1:
Input: n = 4, rounds = [1,3,1,2]
Output: [1,2]
Explanation: The marathon starts at sector 1. The order of the visited sectors is as follows:
1 --> 2 --> 3 (end of round 1) --> 4 --> 1 (end of round 2) --> 2 (end of round 3 and the marathon)
We can see that both sectors 1 and 2 are visited twice and they are the most visited sectors. Sectors 3 and 4 are visited only once.


Example 2:
Input: n = 2, rounds = [2,1,2,1,2,1,2,1,2]
Output: [2]

Example 3:
Input: n = 7, rounds = [1,3,5,7]
Output: [1,2,3,4,5,6,7]

Constraints:
`2 <= n <= 100`
`1 <= m <= 100`
`rounds.length == m + 1`
`1 <= rounds[i] <= n`
`rounds[i] != rounds[i + 1]` for `0 <= i < m`', false, 'Easy', NULL, 56.8, 
   0, 'https://leetcode.com/problems/most-visited-sector-in-a-circular-track', 140, 15, 26.5, '["Expedia"]'::jsonb, '["Array"]'::jsonb, 
   126, 299, 30, false, '[]'::jsonb, true),
  (1561, 'Maximum Number of Coins You Can Get', 'There are 3n piles of coins of varying size, you and your friends will take piles of coins as follows:
In each step, you will choose any 3 piles of coins (not necessarily consecutive).

Of your choice, Alice will pick the pile with the maximum number of coins.

You will pick the next pile with maximum number of coins.

Your friend Bob will pick the last pile.

Repeat until there are no more piles of coins.

Given an array of integers `piles` where `piles[i]` is the number of coins in the `ith` pile.

Return the maximum number of coins which you can have.


Example 1:
Input: piles = [2,4,1,2,7,8]
Output: 9
Explanation: Choose the triplet (2, 7, 8), Alice Pick the pile with 8 coins, you the pile with 7 coins and Bob the last one.

Choose the triplet (1, 2, 4), Alice Pick the pile with 4 coins, you the pile with 2 coins and Bob the last one.

The maximum number of coins which you can have are: 7 + 2 = 9.

On the other hand if we choose this arrangement (1, 2, 8), (2, 4, 7) you only get 2 + 4 = 6 coins which is not optimal.


Example 2:
Input: piles = [2,4,5]
Output: 4

Example 3:
Input: piles = [9,8,7,6,5,1,2,3,4]
Output: 18

Constraints:
`3 <= piles.length <= 10^5`
`piles.length % 3 == 0`
`1 <= piles[i] <= 10^4`', false, 'Medium', NULL, 77.3, 
   9.5, 'https://leetcode.com/problems/maximum-number-of-coins-you-can-get', 333, 24.7, 31.9, '[]'::jsonb, '[]'::jsonb, 
   235, 52, 82, false, '[]'::jsonb, true),
  (1562, 'Find Latest Group of Size M', 'Given an array `arr` that represents a permutation of numbers from `1` to `n`. You have a binary string of size `n` that initially has all its bits set to zero.

At each step `i` (assuming both the binary string and `arr` are 1-indexed) from `1` to `n`, the bit at position `arr[i]` is set to `1`. You are given an integer `m` and you need to find the latest step at which there exists a group of ones of length `m`. A group of ones is a contiguous substring of 1s such that it cannot be extended in either direction.

Return the latest step at which there exists a group of ones of length exactly `m`. If no such group exists, return `-1`.


Example 1:
Input: arr = [3,5,1,2,4], m = 1
Output: 4
Explanation:
Step 1: "00100", groups: ["1"]
Step 2: "00101", groups: ["1", "1"]
Step 3: "10101", groups: ["1", "1", "1"]
Step 4: "11101", groups: ["111", "1"]
Step 5: "11111", groups: ["11111"]
The latest step at which there exists a group of size 1 is step 4.


Example 2:
Input: arr = [3,1,5,4,2], m = 2
Output: -1
Explanation:
Step 1: "00100", groups: ["1"]
Step 2: "10100", groups: ["1", "1"]
Step 3: "10101", groups: ["1", "1", "1"]
Step 4: "10111", groups: ["1", "111"]
Step 5: "11111", groups: ["11111"]
No group of size 2 exists during any step.


Example 3:
Input: arr = [1], m = 1
Output: 1

Example 4:
Input: arr = [2,1], m = 2
Output: 2

Constraints:
`n == arr.length`
`1 <= n <= 10^5`
`1 <= arr[i] <= n`
All integers in `arr` are distinct.

`1 <= m <= arr.length`', false, 'Medium', NULL, 39.7, 
   0, 'https://leetcode.com/problems/find-latest-group-of-size-m', 140, 9.8, 24.6, '["Google"]'::jsonb, '["Binary Search"]'::jsonb, 
   322, 70, 82, true, '[]'::jsonb, true),
  (1563, 'Stone Game V', 'There are several stones arranged in a row, and each stone has an associated value which is an integer given in the array `stoneValue`.

In each round of the game, Alice divides the row into two non-empty rows (i.e. left row and right row), then Bob calculates the value of each row which is the sum of the values of all the stones in this row. Bob throws away the row which has the maximum value, and Alice''s score increases by the value of the remaining row. If the value of the two rows are equal, Bob lets Alice decide which row will be thrown away. The next round starts with the remaining row.

The game ends when there is only one stone remaining. Alice''s is initially zero.

Return the maximum score that Alice can obtain.


Example 1:
Input: stoneValue = [6,2,3,4,5,5]
Output: 18
Explanation: In the first round, Alice divides the row to [6,2,3], [4,5,5]. The left row has the value 11 and the right row has value 14. Bob throws away the right row and Alice''s score is now 11.

In the second round Alice divides the row to [6], [2,3]. This time Bob throws away the left row and Alice''s score becomes 16 (11 + 5).

The last round Alice has only one choice to divide the row which is [2], [3]. Bob throws away the right row and Alice''s score is now 18 (16 + 2). The game ends because only one stone is remaining in the row.


Example 2:
Input: stoneValue = [7,7,7,7,7,7,7]
Output: 28

Example 3:
Input: stoneValue = [4]
Output: 0

Constraints:
`1 <= stoneValue.length <= 500`
`1 <= stoneValue[i] <= 10^6`', false, 'Hard', NULL, 40, 
   3.2, 'https://leetcode.com/problems/stone-game-v', 135, 8.6, 21.4, '[]'::jsonb, '[]'::jsonb, 
   203, 45, 82, false, '[]'::jsonb, true),
  (1564, 'Put Boxes Into the Warehouse I', 'You are given two arrays of positive integers, `boxes` and `warehouse`, representing the heights of some boxes of unit width and the heights of `n` rooms in a warehouse respectively. The warehouse''s rooms are labelled from `0` to `n - 1` from left to right where `warehouse[i]` (0-indexed) is the height of the `ith` room.

Boxes are put into the warehouse by the following rules:
Boxes cannot be stacked.

You can rearrange the insertion order of the boxes.

Boxes can only be pushed into the warehouse from left to right only.

If the height of some room in the warehouse is less than the height of a box, then that box and all other boxes behind it will be stopped before that room.

Return the maximum number of boxes you can put into the warehouse.


Example 1:
Input: boxes = [4,3,4,1], warehouse = [5,3,3,4,1]
Output: 3
Explanation: 
We can first put the box of height 1 in room 4. Then we can put the box of height 3 in either of the 3 rooms 1, 2, or 3. Lastly, we can put one box of height 4 in room 0.

There is no way we can fit all 4 boxes in the warehouse.


Example 2:
Input: boxes = [1,2,2,3,4], warehouse = [3,4,1,2]
Output: 3
Explanation: 
Notice that it''s not possible to put the box of height 4 into the warehouse since it cannot pass the first room of height 3.

Also, for the last two rooms, 2 and 3, only boxes of height 1 can fit.

We can fit 3 boxes maximum as shown above. The yellow box can also be put in room 2 instead.

Swapping the orange and green boxes is also valid, or swapping one of them with the red box.


Example 3:
Input: boxes = [1,2,3], warehouse = [1,2,3,4]
Output: 1
Explanation: Since the first room in the warehouse is of height 1, we can only put boxes of height 1.


Example 4:
Input: boxes = [4,5,6], warehouse = [3,3,3,3,3]
Output: 0

Constraints:
`n == warehouse.length`
`1 <= boxes.length, warehouse.length <= 10^5`
`1 <= boxes[i], warehouse[i] <= 10^9`', true, 'Medium', NULL, 65.6, 
   11.2, 'https://leetcode.com/problems/put-boxes-into-the-warehouse-i', 56, 3, 4.6, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   69, 8, 90, true, '[]'::jsonb, true),
  (1565, 'Unique Orders and Customers Per Month', 'SQL Schema', true, 'Easy', NULL, 83.1, 
   0, 'https://leetcode.com/problems/unique-orders-and-customers-per-month', 92, 7.3, 8.7, '["Whole Foods Market"]'::jsonb, '[]'::jsonb, 
   30, 13, 70, false, '[]'::jsonb, true),
  (1566, 'Detect Pattern of Length M Repeated K or More Times', 'Given an array of positive integers `arr`,  find a pattern of length `m` that is repeated `k` or more times.

A pattern is a subarray (consecutive sub-sequence) that consists of one or more values, repeated multiple times consecutively without overlapping. A pattern is defined by its length and the number of repetitions.

Return `true` if there exists a pattern of length `m` that is repeated `k` or more times, otherwise return `false`.


Example 1:
Input: arr = [1,2,4,4,4,4], m = 1, k = 3
Output: true
Explanation: The pattern (4) of length 1 is repeated 4 consecutive times. Notice that pattern can be repeated k or more times but not less.


Example 2:
Input: arr = [1,2,1,2,1,1,1,3], m = 2, k = 2
Output: true
Explanation: The pattern (1,2) of length 2 is repeated 2 consecutive times. Another valid pattern (2,1) is also repeated 2 times.


Example 3:
Input: arr = [1,2,1,2,1,3], m = 2, k = 3
Output: false
Explanation: The pattern (1,2) is of length 2 but is repeated only 2 times. There is no pattern of length 2 that is repeated 3 or more times.


Example 4:
Input: arr = [1,2,3,1,2], m = 2, k = 2
Output: false
Explanation: Notice that the pattern (1,2) exists twice but not consecutively, so it doesn''t count.


Example 5:
Input: arr = [2,2,2,2], m = 2, k = 3
Output: false
Explanation: The only pattern of length 2 is (2,2) however it''s repeated only twice. Notice that we do not count overlapping repetitions.


Constraints:
`2 <= arr.length <= 100`
`1 <= arr[i] <= 100`
`1 <= m <= 100`
`2 <= k <= 100`', false, 'Easy', NULL, 42.6, 
   0, 'https://leetcode.com/problems/detect-pattern-of-length-m-repeated-k-or-more-times', 176, 16.9, 39.7, '["HRT"]'::jsonb, '["Array"]'::jsonb, 
   297, 51, 85, false, '[]'::jsonb, true),
  (1567, 'Maximum Length of Subarray With Positive Product', 'Given an array of integers `nums`, find the maximum length of a subarray where the product of all its elements is positive.

A subarray of an array is a consecutive sequence of zero or more values taken out of that array.

Return the maximum length of a subarray with positive product.


Example 1:
Input: nums = [1,-2,-3,4]
Output: 4
Explanation: The array nums already has a positive product of 24.


Example 2:
Input: nums = [0,1,-2,-3,-4]
Output: 3
Explanation: The longest subarray with positive product is [1,-2,-3] which has a product of 6.

Notice that we cannot include 0 in the subarray since that''ll make the product 0 which is not positive.


Example 3:
Input: nums = [-1,-2,-3,0,1]
Output: 2
Explanation: The longest subarray with positive product is [-1,-2] or [-2,-3].


Example 4:
Input: nums = [-1,2]
Output: 1

Example 5:
Input: nums = [1,2,3,5,-6,4,0,10]
Output: 4

Constraints:
`1 <= nums.length <= 10^5`
`-10^9 <= nums[i] <= 10^9`', false, 'Medium', NULL, 36.9, 
   27.2, 'https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product', 196, 12.9, 35, '["Arcesium"]'::jsonb, '["Greedy"]'::jsonb, 
   379, 6, 98, false, '[]'::jsonb, true),
  (1568, 'Minimum Number of Days to Disconnect Island', 'Given a 2D `grid` consisting of `1`s (land) and `0`s (water).  An island is a maximal 4-directionally (horizontal or vertical) connected group of `1`s.

The grid is said to be connected if we have exactly one island, otherwise is said disconnected.

In one day, we are allowed to change any single land cell `(1)` into a water cell `(0)`.

Return the minimum number of days to disconnect the grid.


Example 1:
Input: grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]
Output: 2
Explanation: We need at least 2 days to get a disconnected grid.

Change land grid[1][1] and grid[0][2] to water and get 2 disconnected island.


Example 2:
Input: grid = [[1,1]]
Output: 2
Explanation: Grid of full water is also disconnected ([[1,1]] -> [[0,0]]), 0 islands.


Example 3:
Input: grid = [[1,0,1,0]]
Output: 0

Example 4:
Input: grid = [[1,1,0,1,1],
               [1,1,1,1,1],
               [1,1,0,1,1],
               [1,1,0,1,1]]
Output: 1

Example 5:
Input: grid = [[1,1,0,1,1],
               [1,1,1,1,1],
               [1,1,0,1,1],
               [1,1,1,1,1]]
Output: 2

Constraints:
`1 <= grid.length, grid[i].length <= 30`
`grid[i][j]` is `0` or `1`.', false, 'Hard', NULL, 50.2, 
   8.5, 'https://leetcode.com/problems/minimum-number-of-days-to-disconnect-island', 86, 5.7, 11.4, '["Unacademy"]'::jsonb, '["Greedy"]'::jsonb, 
   180, 97, 65, false, '[]'::jsonb, true),
  (1569, 'Number of Ways to Reorder Array to Get Same BST', 'Given an array `nums` that represents a permutation of integers from `1` to `n`. We are going to construct a binary search tree (BST) by inserting the elements of `nums` in order into an initially empty BST. Find the number of different ways to reorder `nums` so that the constructed BST is identical to that formed from the original array `nums`.

For example, given `nums = [2,1,3]`, we will have 2 as the root, 1 as a left child, and 3 as a right child. The array `[2,3,1]` also yields the same BST but `[3,2,1]` yields a different BST.

Return the number of ways to reorder `nums` such that the BST formed is identical to the original BST formed from `nums`.

Since the answer may be very large, return it modulo `10^9 + 7`.


Example 1:
Input: nums = [2,1,3]
Output: 1
Explanation: We can reorder nums to be [2,3,1] which will yield the same BST. There are no other ways to reorder nums which will yield the same BST.


Example 2:
Input: nums = [3,4,5,1,2]
Output: 5
Explanation: The following 5 arrays will yield the same BST: 
[3,1,2,4,5]
[3,1,4,2,5]
[3,1,4,5,2]
[3,4,1,2,5]
[3,4,1,5,2]

Example 3:
Input: nums = [1,2,3]
Output: 0
Explanation: There are no other orderings of nums that will yield the same BST.


Example 4:
Input: nums = [3,1,2,5,4,6]
Output: 19

Example 5:
Input: nums = [9,4,2,1,3,6,5,7,8,14,11,10,12,13,16,15,17,18]
Output: 216212978
Explanation: The number of ways to reorder nums to get the same BST is 3216212999. Taking this number modulo 10^9 + 7 gives 216212978.


Constraints:
`1 <= nums.length <= 1000`
`1 <= nums[i] <= nums.length`
All integers in `nums` are distinct.', false, 'Hard', NULL, 50, 
   35.1, 'https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst', 84, 5.3, 10.7, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   179, 25, 88, true, '[]'::jsonb, true),
  (1570, 'Dot Product of Two Sparse Vectors', 'Given two sparse vectors, compute their dot product.

Implement class `SparseVector`:
`SparseVector(nums)` Initializes the object with the vector `nums`
`dotProduct(vec)` Compute the dot product between the instance of SparseVector and `vec`
A sparse vector is a vector that has mostly zero values, you should store the sparse vector efficiently and compute the dot product between two SparseVector.

Follow up: What if only one of the vectors is sparse?

Example 1:
Input: nums1 = [1,0,0,2,3], nums2 = [0,3,0,4,0]
Output: 8
Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
v1.dotProduct(v2) = 1*0 + 0*3 + 0*0 + 2*4 + 3*0 = 8

Example 2:
Input: nums1 = [0,1,0,0,0], nums2 = [0,0,0,0,2]
Output: 0
Explanation: v1 = SparseVector(nums1) , v2 = SparseVector(nums2)
v1.dotProduct(v2) = 0*0 + 1*0 + 0*0 + 0*0 + 0*2 = 0

Example 3:
Input: nums1 = [0,1,0,0,2,0,0], nums2 = [1,0,0,0,3,0,4]
Output: 6

Constraints:
`n == nums1.length == nums2.length`
`1 <= n <= 10^5`
`0 <= nums1[i], nums2[i] <= 100`', true, 'Medium', '/articles/dot-product-of-two-sparse-vectors', 91.2, 
   60.7, 'https://leetcode.com/problems/dot-product-of-two-sparse-vectors', 223, 36.4, 39.9, '["Facebook,Apple"]'::jsonb, '["Array,Hash Table,Two Pointers"]'::jsonb, 
   239, 38, 86, true, '[]'::jsonb, true),
  (1571, 'Warehouse Manager', 'SQL Schema', true, 'Easy', NULL, 90, 
   2.2, 'https://leetcode.com/problems/warehouse-manager', 108, 10.2, 11.4, '["Amazon"]'::jsonb, '[]'::jsonb, 
   43, 6, 88, true, '[]'::jsonb, true),
  (1572, 'Matrix Diagonal Sum', 'Given a square matrix `mat`, return the sum of the matrix diagonals.

Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.


Example 1:
Input: mat = [[1,2,3],
              [4,5,6],
              [7,8,9]]
Output: 25
Explanation: Diagonals sum: 1 + 5 + 9 + 3 + 7 = 25
Notice that element mat[1][1] = 5 is counted only once.


Example 2:
Input: mat = [[1,1,1,1],
              [1,1,1,1],
              [1,1,1,1],
              [1,1,1,1]]
Output: 8

Example 3:
Input: mat = [[5]]
Output: 5

Constraints:
`n == mat.length == mat[i].length`
`1 <= n <= 100`
`1 <= mat[i][j] <= 100`', false, 'Easy', NULL, 77.6, 
   6.1, 'https://leetcode.com/problems/matrix-diagonal-sum', 731, 48.1, 62, '["Adobe"]'::jsonb, '["Array"]'::jsonb, 
   415, 8, 98, false, '[]'::jsonb, true),
  (1573, 'Number of Ways to Split a String', 'Given a binary string `s` (a string consisting only of ''0''s and ''1''s), we can split `s` into 3 non-empty strings s1, s2, s3 (s1+ s2+ s3 = s).

Return the number of ways `s` can be split such that the number of characters ''1'' is the same in s1, s2, and s3.

Since the answer may be too large, return it modulo 10^9 + 7.


Example 1:
Input: s = "10101"
Output: 4
Explanation: There are four ways to split s in 3 parts where each part contain the same number of letters ''1''.

"1|010|1"
"1|01|01"
"10|10|1"
"10|1|01"

Example 2:
Input: s = "1001"
Output: 0

Example 3:
Input: s = "0000"
Output: 3
Explanation: There are three ways to split s in 3 parts.

"0|0|00"
"0|00|0"
"00|0|0"

Example 4:
Input: s = "100100010100110"
Output: 12

Constraints:
`3 <= s.length <= 10^5`
`s[i]` is `''0''` or `''1''`.', false, 'Medium', NULL, 31.3, 
   15.3, 'https://leetcode.com/problems/number-of-ways-to-split-a-string', 133, 12.4, 39.5, '["Microsoft"]'::jsonb, '["String"]'::jsonb, 
   257, 44, 85, false, '[]'::jsonb, true),
  (1574, 'Shortest Subarray to be Removed to Make Array Sorted', 'Given an integer array `arr`, remove a subarray (can be empty) from `arr` such that the remaining elements in `arr` are non-decreasing.

A subarray is a contiguous subsequence of the array.

Return the length of the shortest subarray to remove.


Example 1:
Input: arr = [1,2,3,10,4,2,3,5]
Output: 3
Explanation: The shortest subarray we can remove is [10,4,2] of length 3. The remaining elements after that will be [1,2,3,3,5] which are sorted.

Another correct solution is to remove the subarray [3,10,4].


Example 2:
Input: arr = [5,4,3,2,1]
Output: 4
Explanation: Since the array is strictly decreasing, we can only keep a single element. Therefore we need to remove a subarray of length 4, either [5,4,3,2] or [4,3,2,1].


Example 3:
Input: arr = [1,2,3]
Output: 0
Explanation: The array is already non-decreasing. We do not need to remove any elements.


Example 4:
Input: arr = [1]
Output: 0

Constraints:
`1 <= arr.length <= 10^5`
`0 <= arr[i] <= 10^9`', false, 'Medium', NULL, 34.1, 
   27.3, 'https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted', 114, 10.8, 31.5, '["Amazon,Flipkart"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   532, 17, 97, true, '[]'::jsonb, true),
  (1575, 'Count All Possible Routes', 'You are given an array of distinct positive integers locations where `locations[i]` represents the position of city `i`. You are also given integers `start`, `finish` and `fuel` representing the starting city, ending city, and the initial amount of fuel you have, respectively.

At each step, if you are at city `i`, you can pick any city `j` such that `j != i` and `0 <= j < locations.length` and move to city `j`. Moving from city `i` to city `j` reduces the amount of fuel you have by `|locations[i] - locations[j]|`. Please notice that `|x|` denotes the absolute value of `x`.

Notice that `fuel` cannot become negative at any point in time, and that you are allowed to visit any city more than once (including `start` and `finish`).

Return the count of all possible routes from `start` to `finish`.

Since the answer may be too large, return it modulo `10^9 + 7`.


Example 1:
Input: locations = [2,3,6,8,4], start = 1, finish = 3, fuel = 5
Output: 4
Explanation: The following are all possible routes, each uses 5 units of fuel:
1 -> 3
1 -> 2 -> 3
1 -> 4 -> 3
1 -> 4 -> 2 -> 3

Example 2:
Input: locations = [4,3,1], start = 1, finish = 0, fuel = 6
Output: 5
Explanation: The following are all possible routes:
1 -> 0, used fuel = 1
1 -> 2 -> 0, used fuel = 5
1 -> 2 -> 1 -> 0, used fuel = 5
1 -> 0 -> 1 -> 0, used fuel = 3
1 -> 0 -> 1 -> 0 -> 1 -> 0, used fuel = 5

Example 3:
Input: locations = [5,2,1], start = 0, finish = 2, fuel = 3
Output: 0
Explanation: It''s impossible to get from 0 to 2 using only 3 units of fuel since the shortest route needs 4 units of fuel.


Example 4:
Input: locations = [2,1,5], start = 0, finish = 0, fuel = 3
Output: 2
Explanation: There are two possible routes, 0 and 0 -> 1 -> 0.


Example 5:
Input: locations = [1,2,3], start = 0, finish = 2, fuel = 40
Output: 615088286
Explanation: The total number of possible routes is 2615088300. Taking this number modulo 10^9 + 7 gives us 615088286.


Constraints:
`2 <= locations.length <= 100`
`1 <= locations[i] <= 10^9`
All integers in `locations` are distinct.

`0 <= start, finish < locations.length`
`1 <= fuel <= 200`', false, 'Hard', NULL, 57.1, 
   10.1, 'https://leetcode.com/problems/count-all-possible-routes', 99, 6.4, 11.2, '["TSYS"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   214, 10, 96, false, '[]'::jsonb, true),
  (1576, 'Replace All ?''s to Avoid Consecutive Repeating Characters', 'Given a string `s` containing only lower case English letters and the ''?'' character, convert all the ''?'' characters into lower case letters such that the final string does not contain any consecutive repeating characters. You cannot modify the non ''?'' characters.

It is guaranteed that there are no consecutive repeating characters in the given string except for ''?''.

Return the final string after all the conversions (possibly zero) have been made. If there is more than one solution, return any of them. It can be shown that an answer is always possible with the given constraints.


Example 1:
Input: s = "?zs"
Output: "azs"
Explanation: There are 25 solutions for this problem. From "azs" to "yzs", all are valid. Only "z" is an invalid modification as the string will consist of consecutive repeating characters in "zzs".


Example 2:
Input: s = "ubv?w"
Output: "ubvaw"
Explanation: There are 24 solutions for this problem. Only "v" and "w" are invalid modifications as the strings will consist of consecutive repeating characters in "ubvvw" and "ubvww".


Example 3:
Input: s = "j?qg??b"
Output: "jaqgacb"

Example 4:
Input: s = "??yw?ipkj?"
Output: "acywaipkja"

Constraints:
`1 <= s.length <= 100`
`s` contains only lower case English letters and `''?''`.', false, 'Easy', NULL, 50, 
   11, 'https://leetcode.com/problems/replace-all-s-to-avoid-consecutive-repeating-characters', 273, 26.4, 52.7, '["Microsoft,Google"]'::jsonb, '["String"]'::jsonb, 
   204, 100, 67, true, '[]'::jsonb, true),
  (1577, 'Number of Ways Where Square of Number Is Equal to Product of Two Numbers', 'Given two arrays of integers `nums1` and `nums2`, return the number of triplets formed (type 1 and type 2) under the following rules:
Type 1: Triplet (i, j, k) if `nums1[i]2 == nums2[j] * nums2[k]` where `0 <= i < nums1.length` and `0 <= j < k < nums2.length`.

Type 2: Triplet (i, j, k) if `nums2[i]2 == nums1[j] * nums1[k]` where `0 <= i < nums2.length` and `0 <= j < k < nums1.length`.


Example 1:
Input: nums1 = [7,4], nums2 = [5,2,8,9]
Output: 1
Explanation: Type 1: (1,1,2), nums1[1]^2 = nums2[1] * nums2[2]. (4^2 = 2 * 8). 

Example 2:
Input: nums1 = [1,1], nums2 = [1,1,1]
Output: 9
Explanation: All Triplets are valid, because 1^2 = 1 * 1.

Type 1: (0,0,1), (0,0,2), (0,1,2), (1,0,1), (1,0,2), (1,1,2).  nums1[i]^2 = nums2[j] * nums2[k].

Type 2: (0,0,1), (1,0,1), (2,0,1). nums2[i]^2 = nums1[j] * nums1[k].


Example 3:
Input: nums1 = [7,7,8,3], nums2 = [1,2,9,7]
Output: 2
Explanation: There are 2 valid triplets.

Type 1: (3,0,2).  nums1[3]^2 = nums2[0] * nums2[2].

Type 2: (3,0,1).  nums2[3]^2 = nums1[0] * nums1[1].


Example 4:
Input: nums1 = [4,7,9,11,23], nums2 = [3,5,1024,12,18]
Output: 0
Explanation: There are no valid triplets.


Constraints:
`1 <= nums1.length, nums2.length <= 1000`
`1 <= nums1[i], nums2[i] <= 10^5`', false, 'Medium', NULL, 37.9, 
   0, 'https://leetcode.com/problems/number-of-ways-where-square-of-number-is-equal-to-product-of-two-numbers', 154, 11.7, 30.8, '[]'::jsonb, '[]'::jsonb, 
   144, 34, 81, false, '[]'::jsonb, true),
  (1578, 'Minimum Deletion Cost to Avoid Repeating Letters', 'Given a string `s` and an array of integers `cost` where `cost[i]` is the cost of deleting the `ith` character in `s`.

Return the minimum cost of deletions such that there are no two identical letters next to each other.

Notice that you will delete the chosen characters at the same time, in other words, after deleting a character, the costs of deleting other characters will not change.


Example 1:
Input: s = "abaac", cost = [1,2,3,4,5]
Output: 3
Explanation: Delete the letter "a" with cost 3 to get "abac" (String without two identical letters next to each other).


Example 2:
Input: s = "abc", cost = [1,2,3]
Output: 0
Explanation: You don''t need to delete any character because there are no identical letters next to each other.


Example 3:
Input: s = "aabaa", cost = [1,2,3,4,1]
Output: 2
Explanation: Delete the first and the last character, getting the string ("aba").


Constraints:
`s.length == cost.length`
`1 <= s.length, cost.length <= 10^5`
`1 <= cost[i] <= 10^4`
`s` contains only lowercase English letters.', false, 'Medium', NULL, 60.6, 
   53.2, 'https://leetcode.com/problems/minimum-deletion-cost-to-avoid-repeating-letters', 353, 25.1, 41.5, '["Microsoft,Tesla"]'::jsonb, '["Greedy"]'::jsonb, 
   376, 19, 95, false, '[]'::jsonb, true),
  (1579, 'Remove Max Number of Edges to Keep Graph Fully Traversable', 'Alice and Bob have an undirected graph of `n` nodes and 3 types of edges:
Type 1: Can be traversed by Alice only.

Type 2: Can be traversed by Bob only.

Type 3: Can by traversed by both Alice and Bob.

Given an array `edges` where `edges[i] = [typei, ui, vi]` represents a bidirectional edge of type `typei` between nodes `ui` and `vi`, find the maximum number of edges you can remove so that after removing the edges, the graph can still be fully traversed by both Alice and Bob. The graph is fully traversed by Alice and Bob if starting from any node, they can reach all other nodes.

Return the maximum number of edges you can remove, or return `-1` if it''s impossible for the graph to be fully traversed by Alice and Bob.


Example 1:
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
Output: 2
Explanation: If we remove the 2 edges [1,1,2] and [1,1,3]. The graph will still be fully traversable by Alice and Bob. Removing any additional edge will not make it so. So the maximum number of edges we can remove is 2.


Example 2:
Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]
Output: 0
Explanation: Notice that removing any edge will not make the graph fully traversable by Alice and Bob.


Example 3:
Input: n = 4, edges = [[3,2,3],[1,1,2],[2,3,4]]
Output: -1
Explanation: In the current graph, Alice cannot reach node 4 from the other nodes. Likewise, Bob cannot reach 1. Therefore it''s impossible to make the graph fully traversable.


Constraints:
`1 <= n <= 10^5`
`1 <= edges.length <= min(10^5, 3 * n * (n-1) / 2)`
`edges[i].length == 3`
`1 <= edges[i][0] <= 3`
`1 <= edges[i][1] < edges[i][2] <= n`
All tuples `(typei, ui, vi)` are distinct.', false, 'Hard', NULL, 46.3, 
   5.3, 'https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable', 124, 6.7, 14.4, '["Uber"]'::jsonb, '["Union Find"]'::jsonb, 
   307, 3, 99, false, '[]'::jsonb, true),
  (1580, 'Put Boxes Into the Warehouse II', 'You are given two arrays of positive integers, `boxes` and `warehouse`, representing the heights of some boxes of unit width and the heights of `n` rooms in a warehouse respectively. The warehouse''s rooms are labeled from `0` to `n - 1` from left to right where `warehouse[i]` (0-indexed) is the height of the `ith` room.

Boxes are put into the warehouse by the following rules:
Boxes cannot be stacked.

You can rearrange the insertion order of the boxes.

Boxes can be pushed into the warehouse from either side (left or right)
If the height of some room in the warehouse is less than the height of a box, then that box and all other boxes behind it will be stopped before that room.

Return the maximum number of boxes you can put into the warehouse.


Example 1:
Input: boxes = [1,2,2,3,4], warehouse = [3,4,1,2]
Output: 4
Explanation:
We can store the boxes in the following order:
1- Put the yellow box in room 2 from either the left or right side.

2- Put the orange box in room 3 from the right side.

3- Put the green box in room 1 from the left side.

4- Put the red box in room 0 from the left side.

Notice that there are other valid ways to put 4 boxes such as swapping the red and green boxes or the red and orange boxes.


Example 2:
Input: boxes = [3,5,5,2], warehouse = [2,1,3,4,5]
Output: 3
Explanation:
It''s not possible to put the two boxes of height 5 in the warehouse since there''s only 1 room of height >= 5.

Other valid solutions are to put the green box in room 2 or to put the orange box first in room 2 before putting the green and red boxes.


Example 3:
Input: boxes = [1,2,3], warehouse = [1,2,3,4]
Output: 3

Example 4:
Input: boxes = [4,5,6], warehouse = [3,3,3,3,3]
Output: 0

Constraints:
`n == warehouse.length`
`1 <= boxes.length, warehouse.length <= 105`
`1 <= boxes[i], warehouse[i] <= 109`', true, 'Medium', NULL, 61.6, 
   0, 'https://leetcode.com/problems/put-boxes-into-the-warehouse-ii', 32, 1.6, 2.7, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   73, 1, 99, true, '[]'::jsonb, true),
  (1581, 'Customer Who Visited but Did Not Make Any Transactions', 'SQL Schema', true, 'Easy', NULL, 89.7, 
   0, 'https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions', 99, 10.1, 11.3, '["NerdWallet"]'::jsonb, '[]'::jsonb, 
   40, 14, 74, false, '[]'::jsonb, true),
  (1582, 'Special Positions in a Binary Matrix', 'Given a `rows x cols` matrix `mat`, where `mat[i][j]` is either `0` or `1`, return the number of special positions in `mat`.

A position `(i,j)` is called special if `mat[i][j] == 1` and all other elements in row `i` and column `j` are `0` (rows and columns are 0-indexed).


Example 1:
Input: mat = [[1,0,0],
              [0,0,1],
              [1,0,0]]
Output: 1
Explanation: (1,2) is a special position because mat[1][2] == 1 and all other elements in row 1 and column 2 are 0.


Example 2:
Input: mat = [[1,0,0],
              [0,1,0],
              [0,0,1]]
Output: 3
Explanation: (0,0), (1,1) and (2,2) are special positions. 

Example 3:
Input: mat = [[0,0,0,1],
              [1,0,0,0],
              [0,1,1,0],
              [0,0,0,0]]
Output: 2

Example 4:
Input: mat = [[0,0,0,0,0],
              [1,0,0,0,0],
              [0,1,0,0,0],
              [0,0,1,0,0],
              [0,0,0,1,1]]
Output: 3

Constraints:
`rows == mat.length`
`cols == mat[i].length`
`1 <= rows, cols <= 100`
`mat[i][j]` is `0` or `1`.', false, 'Easy', NULL, 64.3, 
   2.4, 'https://leetcode.com/problems/special-positions-in-a-binary-matrix', 259, 21, 32.6, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   233, 7, 97, true, '[]'::jsonb, true),
  (1583, 'Count Unhappy Friends', 'You are given a list of `preferences` for `n` friends, where `n` is always even.

For each person `i`, `preferences[i]` contains a list of friends sorted in the order of preference. In other words, a friend earlier in the list is more preferred than a friend later in the list. Friends in each list are denoted by integers from `0` to `n-1`.

All the friends are divided into pairs. The pairings are given in a list `pairs`, where `pairs[i] = [xi, yi]` denotes `xi` is paired with `yi` and `yi` is paired with `xi`.

However, this pairing may cause some of the friends to be unhappy. A friend `x` is unhappy if `x` is paired with `y` and there exists a friend `u` who is paired with `v` but:
`x` prefers `u` over `y`, and
`u` prefers `x` over `v`.

Return the number of unhappy friends.


Example 1:
Input: n = 4, preferences = [[1, 2, 3], [3, 2, 0], [3, 1, 0], [1, 2, 0]], pairs = [[0, 1], [2, 3]]
Output: 2
Explanation:
Friend 1 is unhappy because:
- 1 is paired with 0 but prefers 3 over 0, and
- 3 prefers 1 over 2.

Friend 3 is unhappy because:
- 3 is paired with 2 but prefers 1 over 2, and
- 1 prefers 3 over 0.

Friends 0 and 2 are happy.


Example 2:
Input: n = 2, preferences = [[1], [0]], pairs = [[1, 0]]
Output: 0
Explanation: Both friends 0 and 1 are happy.


Example 3:
Input: n = 4, preferences = [[1, 3, 2], [2, 3, 0], [1, 3, 0], [0, 2, 1]], pairs = [[1, 3], [0, 2]]
Output: 4

Constraints:
`2 <= n <= 500`
`n` is even.

`preferences.length == n`
`preferences[i].length == n - 1`
`0 <= preferences[i][j] <= n - 1`
`preferences[i]` does not contain `i`.

All values in `preferences[i]` are unique.

`pairs.length == n/2`
`pairs[i].length == 2`
`xi != yi`
`0 <= xi, yi <= n - 1`
Each person is contained in exactly one pair.', false, 'Medium', NULL, 55.1, 
   25.3, 'https://leetcode.com/problems/count-unhappy-friends', 149, 10.7, 19.4, '["Bloomberg"]'::jsonb, '["Array"]'::jsonb, 
   102, 394, 21, false, '[]'::jsonb, true),
  (1584, 'Min Cost to Connect All Points', 'You are given an array `points` representing integer coordinates of some points on a 2D-plane, where `points[i] = [xi, yi]`.

The cost of connecting two points `[xi, yi]` and `[xj, yj]` is the manhattan distance between them: `|xi - xj| + |yi - yj|`, where `|val|` denotes the absolute value of `val`.

Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.


Example 1:
Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
Explanation:
We can connect the points as shown above to get the minimum cost of 20.

Notice that there is a unique path between every pair of points.


Example 2:
Input: points = [[3,12],[-2,5],[-4,1]]
Output: 18

Example 3:
Input: points = [[0,0],[1,1],[1,0],[-1,1]]
Output: 4

Example 4:
Input: points = [[-1000000,-1000000],[1000000,1000000]]
Output: 4000000

Example 5:
Input: points = [[0,0]]
Output: 0

Constraints:
`1 <= points.length <= 1000`
`-106 <= xi, yi <= 106`
All pairs `(xi, yi)` are distinct.', false, 'Medium', NULL, 53.2, 
   5.2, 'https://leetcode.com/problems/min-cost-to-connect-all-points', 219, 14.9, 28.1, '["Directi"]'::jsonb, '["Union Find"]'::jsonb, 
   415, 26, 94, false, '[]'::jsonb, true),
  (1585, 'Check If String Is Transformable With Substring Sort Operations', 'Given two strings `s` and `t`, you want to transform string `s` into string `t` using the following operation any number of times:
Choose a non-empty substring in `s` and sort it in-place so the characters are in ascending order.

For example, applying the operation on the underlined substring in `"14234"` results in `"12344"`.

Return `true` if it is possible to transform string `s` into string `t`. Otherwise, return `false`.

A substring is a contiguous sequence of characters within a string.


Example 1:
Input: s = "84532", t = "34852"
Output: true
Explanation: You can transform s into t using the following sort operations:
"84532" (from index 2 to 3) -> "84352"
"84352" (from index 0 to 2) -> "34852"

Example 2:
Input: s = "34521", t = "23415"
Output: true
Explanation: You can transform s into t using the following sort operations:
"34521" -> "23451"
"23451" -> "23415"

Example 3:
Input: s = "12345", t = "12435"
Output: false

Example 4:
Input: s = "1", t = "2"
Output: false

Constraints:
`s.length == t.length`
`1 <= s.length <= 105`
`s` and `t` only contain digits from `''0''` to `''9''`.', false, 'Hard', NULL, 48.5, 
   0, 'https://leetcode.com/problems/check-if-string-is-transformable-with-substring-sort-operations', 60, 4.7, 9.7, '["Google"]'::jsonb, '["String,Greedy"]'::jsonb, 
   233, 4, 98, true, '[]'::jsonb, true),
  (1586, 'Binary Search Tree Iterator II', 'Implement the `BSTIterator` class that represents an iterator over the in-order traversal of a binary search tree (BST):
`BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class. The `root` of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.

`boolean hasNext()` Returns `true` if there exists a number in the traversal to the right of the pointer, otherwise returns `false`.

`int next()` Moves the pointer to the right, then returns the number at the pointer.

`boolean hasPrev()` Returns `true` if there exists a number in the traversal to the left of the pointer, otherwise returns `false`.

`int prev()` Moves the pointer to the left, then returns the number at the pointer.

Notice that by initializing the pointer to a non-existent smallest number, the first call to `next()` will return the smallest element in the BST.

You may assume that `next()` and `prev()` calls will always be valid. That is, there will be at least a next/previous number in the in-order traversal when `next()`/`prev()` is called.


Example 1:
Input
["BSTIterator", "next", "next", "prev", "next", "hasNext", "next", "next", "next", "hasNext", "hasPrev", "prev", "prev"]
[[[7, 3, 15, null, null, 9, 20]], [null], [null], [null], [null], [null], [null], [null], [null], [null], [null], [null], [null]]
Output
[null, 3, 7, 3, 7, true, 9, 15, 20, false, true, 15, 9]
Explanation
// The underlined element is where the pointer currently is.

BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]); // state is   [3, 7, 9, 15, 20]
bSTIterator.next(); // state becomes [3, 7, 9, 15, 20], return 3
bSTIterator.next(); // state becomes [3, 7, 9, 15, 20], return 7
bSTIterator.prev(); // state becomes [3, 7, 9, 15, 20], return 3
bSTIterator.next(); // state becomes [3, 7, 9, 15, 20], return 7
bSTIterator.hasNext(); // return true
bSTIterator.next(); // state becomes [3, 7, 9, 15, 20], return 9
bSTIterator.next(); // state becomes [3, 7, 9, 15, 20], return 15
bSTIterator.next(); // state becomes [3, 7, 9, 15, 20], return 20
bSTIterator.hasNext(); // return false
bSTIterator.hasPrev(); // return true
bSTIterator.prev(); // state becomes [3, 7, 9, 15, 20], return 15
bSTIterator.prev(); // state becomes [3, 7, 9, 15, 20], return 9

Constraints:
The number of nodes in the tree is in the range `[1, 105]`.

`0 <= Node.val <= 106`
At most `105` calls will be made to `hasNext`, `next`, `hasPrev`, and `prev`.

Follow up: Could you solve the problem without precalculating the values of the tree?', true, 'Medium', '/articles/binary-search-tree-iterator-ii', 67, 
   8.6, 'https://leetcode.com/problems/binary-search-tree-iterator-ii', 48, 3.2, 4.7, '["Facebook"]'::jsonb, '["Tree,Design"]'::jsonb, 
   71, 9, 89, true, '[]'::jsonb, true),
  (1587, 'Bank Account Summary II', 'SQL Schema', true, 'Easy', NULL, 89.9, 
   3.4, 'https://leetcode.com/problems/bank-account-summary-ii', 82, 11.1, 12.3, '[]'::jsonb, '[]'::jsonb, 
   42, 2, 95, false, '[]'::jsonb, true),
  (1588, 'Sum of All Odd Length Subarrays', 'Given an array of positive integers `arr`, calculate the sum of all possible odd-length subarrays.

A subarray is a contiguous subsequence of the array.

Return the sum of all odd-length subarrays of `arr`.


Example 1:
Input: arr = [1,4,2,5,3]
Output: 58
Explanation: The odd-length subarrays of arr and their sums are:
[1] = 1
[4] = 4
[2] = 2
[5] = 5
[3] = 3
[1,4,2] = 7
[4,2,5] = 11
[2,5,3] = 10
[1,4,2,5,3] = 15
If we add all these together we get 1 + 4 + 2 + 5 + 3 + 7 + 11 + 10 + 15 = 58

Example 2:
Input: arr = [1,2]
Output: 3
Explanation: There are only 2 subarrays of odd length, [1] and [2]. Their sum is 3.


Example 3:
Input: arr = [10,11,12]
Output: 66

Constraints:
`1 <= arr.length <= 100`
`1 <= arr[i] <= 1000`', false, 'Easy', NULL, 81.6, 
   21, 'https://leetcode.com/problems/sum-of-all-odd-length-subarrays', 454, 41.4, 50.8, '["Bloomberg"]'::jsonb, '["Array"]'::jsonb, 
   684, 79, 90, false, '[]'::jsonb, true),
  (1589, 'Maximum Sum Obtained of Any Permutation', 'We have an array of integers, `nums`, and an array of `requests` where `requests[i] = [starti, endi]`. The `ith` request asks for the sum of `nums[starti] + nums[starti + 1] + ... + nums[endi - 1] + nums[endi]`. Both `starti` and `endi` are 0-indexed.

Return the maximum total sum of all requests among all permutations of `nums`.

Since the answer may be too large, return it modulo `109 + 7`.


Example 1:
Input: nums = [1,2,3,4,5], requests = [[1,3],[0,1]]
Output: 19
Explanation: One permutation of nums is [2,1,3,4,5] with the following result: 
requests[0] -> nums[1] + nums[2] + nums[3] = 1 + 3 + 4 = 8
requests[1] -> nums[0] + nums[1] = 2 + 1 = 3
Total sum: 8 + 3 = 11.

A permutation with a higher total sum is [3,5,4,2,1] with the following result:
requests[0] -> nums[1] + nums[2] + nums[3] = 5 + 4 + 2 = 11
requests[1] -> nums[0] + nums[1] = 3 + 5  = 8
Total sum: 11 + 8 = 19, which is the best that you can do.


Example 2:
Input: nums = [1,2,3,4,5,6], requests = [[0,1]]
Output: 11
Explanation: A permutation with the max total sum is [6,5,4,3,2,1] with request sums [11].


Example 3:
Input: nums = [1,2,3,4,5,10], requests = [[0,2],[1,3],[1,1]]
Output: 47
Explanation: A permutation with the max total sum is [4,10,5,3,2,1] with request sums [19,18,10].


Constraints:
`n == nums.length`
`1 <= n <= 105`
`0 <= nums[i] <= 105`
`1 <= requests.length <= 105`
`requests[i].length == 2`
`0 <= starti <= endi < n`', false, 'Medium', NULL, 35, 
   0, 'https://leetcode.com/problems/maximum-sum-obtained-of-any-permutation', 105, 7.8, 22.3, '["Paypal"]'::jsonb, '["Greedy"]'::jsonb, 
   296, 19, 94, false, '[]'::jsonb, true),
  (1590, 'Make Sum Divisible by P', 'Given an array of positive integers `nums`, remove the smallest subarray (possibly empty) such that the sum of the remaining elements is divisible by `p`. It is not allowed to remove the whole array.

Return the length of the smallest subarray that you need to remove, or `-1` if it''s impossible.

A subarray is defined as a contiguous block of elements in the array.


Example 1:
Input: nums = [3,1,4,2], p = 6
Output: 1
Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.


Example 2:
Input: nums = [6,3,5,2], p = 9
Output: 2
Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [5,2], leaving us with [6,3] with sum 9.


Example 3:
Input: nums = [1,2,3], p = 3
Output: 0
Explanation: Here the sum is 6. which is already divisible by 3. Thus we do not need to remove anything.


Example 4:
Input: nums = [1,2,3], p = 7
Output: -1
Explanation: There is no way to remove a subarray in order to get a sum divisible by 7.


Example 5:
Input: nums = [1000000000,1000000000,1000000000], p = 3
Output: 0

Constraints:
`1 <= nums.length <= 105`
`1 <= nums[i] <= 109`
`1 <= p <= 109`', false, 'Medium', NULL, 27, 
   5.7, 'https://leetcode.com/problems/make-sum-divisible-by-p', 93, 9, 33.2, '["Amazon"]'::jsonb, '["Array,Hash Table,Math,Binary Search"]'::jsonb, 
   461, 19, 96, true, '[]'::jsonb, true),
  (1591, 'Strange Printer II', 'There is a strange printer with the following two special requirements:
On each turn, the printer will print a solid rectangular pattern of a single color on the grid. This will cover up the existing colors in the rectangle.

Once the printer has used a color for the above operation, the same color cannot be used again.

You are given a `m x n` matrix `targetGrid`, where `targetGrid[row][col]` is the color in the position `(row, col)` of the grid.

Return `true` if it is possible to print the matrix `targetGrid`, otherwise, return `false`.


Example 1:
Input: targetGrid = [[1,1,1,1],[1,2,2,1],[1,2,2,1],[1,1,1,1]]
Output: true

Example 2:
Input: targetGrid = [[1,1,1,1],[1,1,3,3],[1,1,3,4],[5,5,1,4]]
Output: true

Example 3:
Input: targetGrid = [[1,2,1],[2,1,2],[1,2,1]]
Output: false
Explanation: It is impossible to form targetGrid because it is not allowed to print the same color in different turns.


Example 4:
Input: targetGrid = [[1,1,1],[3,1,3]]
Output: false

Constraints:
`m == targetGrid.length`
`n == targetGrid[i].length`
`1 <= m, n <= 60`
`1 <= targetGrid[row][col] <= 60`', false, 'Hard', NULL, 55.3, 
   0, 'https://leetcode.com/problems/strange-printer-ii', 46, 3.4, 6.2, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   179, 5, 97, true, '[]'::jsonb, true),
  (1592, 'Rearrange Spaces Between Words', 'You are given a string `text` of words that are placed among some number of spaces. Each word consists of one or more lowercase English letters and are separated by at least one space. It''s guaranteed that `text` contains at least one word.

Rearrange the spaces so that there is an equal number of spaces between every pair of adjacent words and that number is maximized. If you cannot redistribute all the spaces equally, place the extra spaces at the end, meaning the returned string should be the same length as `text`.

Return the string after rearranging the spaces.


Example 1:
Input: text = "  this   is  a sentence "
Output: "this   is   a   sentence"
Explanation: There are a total of 9 spaces and 4 words. We can evenly divide the 9 spaces between the words: 9 / (4-1) = 3 spaces.


Example 2:
Input: text = " practice   makes   perfect"
Output: "practice   makes   perfect "
Explanation: There are a total of 7 spaces and 3 words. 7 / (3-1) = 3 spaces plus 1 extra space. We place this extra space at the end of the string.


Example 3:
Input: text = "hello   world"
Output: "hello   world"

Example 4:
Input: text = "  walks  udp package   into  bar a"
Output: "walks  udp  package  into  bar  a "

Example 5:
Input: text = "a"
Output: "a"

Constraints:
`1 <= text.length <= 100`
`text` consists of lowercase English letters and `'' ''`.

`text` contains at least one word.', false, 'Easy', NULL, 43.6, 
   3.7, 'https://leetcode.com/problems/rearrange-spaces-between-words', 256, 19.4, 44.5, '["Google"]'::jsonb, '["String"]'::jsonb, 
   129, 133, 49, true, '[]'::jsonb, true),
  (1593, 'Split a String Into the Max Number of Unique Substrings', 'Given a string `s`, return the maximum number of unique substrings that the given string can be split into.

You can split string `s` into any list of non-empty substrings, where the concatenation of the substrings forms the original string. However, you must split the substrings such that all of them are unique.

A substring is a contiguous sequence of characters within a string.


Example 1:
Input: s = "ababccc"
Output: 5
Explanation: One way to split maximally is [''a'', ''b'', ''ab'', ''c'', ''cc'']. Splitting like [''a'', ''b'', ''a'', ''b'', ''c'', ''cc''] is not valid as you have ''a'' and ''b'' multiple times.


Example 2:
Input: s = "aba"
Output: 2
Explanation: One way to split maximally is [''a'', ''ba''].


Example 3:
Input: s = "aa"
Output: 1
Explanation: It is impossible to split the string any further.


Constraints:
`1 <= s.length <= 16`
`s` contains only lower case English letters.', false, 'Medium', NULL, 49.8, 
   0, 'https://leetcode.com/problems/split-a-string-into-the-max-number-of-unique-substrings', 175, 12.2, 24.5, '["Google"]'::jsonb, '["Backtracking"]'::jsonb, 
   305, 11, 97, true, '[]'::jsonb, true),
  (1594, 'Maximum Non Negative Product in a Matrix', 'You are given a `rows x cols` matrix `grid`. Initially, you are located at the top-left corner `(0, 0)`, and in each step, you can only move right or down in the matrix.

Among all possible paths starting from the top-left corner `(0, 0)` and ending in the bottom-right corner `(rows - 1, cols - 1)`, find the path with the maximum non-negative product. The product of a path is the product of all integers in the grid cells visited along the path.

Return the maximum non-negative product modulo `109 + 7`. If the maximum product is negative return `-1`.

Notice that the modulo is performed after getting the maximum product.


Example 1:
Input: grid = [[-1,-2,-3],
               [-2,-3,-3],
               [-3,-3,-2]]
Output: -1
Explanation: It''s not possible to get non-negative product in the path from (0, 0) to (2, 2), so return -1.


Example 2:
Input: grid = [[1,-2,1],
               [1,-2,1],
               [3,-4,1]]
Output: 8
Explanation: Maximum non-negative product is in bold (1 * 1 * -2 * -4 * 1 = 8).


Example 3:
Input: grid = [[1, 3],
               [0,-4]]
Output: 0
Explanation: Maximum non-negative product is in bold (1 * 0 * -4 = 0).


Example 4:
Input: grid = [[ 1, 4,4,0],
               [-2, 0,0,1],
               [ 1,-1,1,1]]
Output: 2
Explanation: Maximum non-negative product is in bold (1 * -2 * 1 * -1 * 1 * 1 = 2).


Constraints:
`1 <= rows, cols <= 15`
`-4 <= grid[i][j] <= 4`', false, 'Medium', NULL, 32.4, 
   3.9, 'https://leetcode.com/problems/maximum-non-negative-product-in-a-matrix', 220, 11.5, 35.5, '["Google"]'::jsonb, '["Dynamic Programming,Greedy"]'::jsonb, 
   305, 19, 94, true, '[]'::jsonb, true),
  (1595, 'Minimum Cost to Connect Two Groups of Points', 'You are given two groups of points where the first group has `size1` points, the second group has `size2` points, and `size1 >= size2`.

The `cost` of the connection between any two points are given in an `size1 x size2` matrix where `cost[i][j]` is the cost of connecting point `i` of the first group and point `j` of the second group. The groups are connected if each point in both groups is connected to one or more points in the opposite group. In other words, each point in the first group must be connected to at least one point in the second group, and each point in the second group must be connected to at least one point in the first group.

Return the minimum cost it takes to connect the two groups.


Example 1:
Input: cost = [[15, 96], [36, 2]]
Output: 17
Explanation: The optimal way of connecting the groups is:
1--A
2--B
This results in a total cost of 17.


Example 2:
Input: cost = [[1, 3, 5], [4, 1, 1], [1, 5, 3]]
Output: 4
Explanation: The optimal way of connecting the groups is:
1--A
2--B
2--C
3--A
This results in a total cost of 4.

Note that there are multiple points connected to point 2 in the first group and point A in the second group. This does not matter as there is no limit to the number of points that can be connected. We only care about the minimum total cost.


Example 3:
Input: cost = [[2, 5, 1], [3, 4, 7], [8, 1, 2], [6, 2, 4], [3, 8, 8]]
Output: 10

Constraints:
`size1 == cost.length`
`size2 == cost[i].length`
`1 <= size1, size2 <= 12`
`size1 >= size2`
`0 <= cost[i][j] <= 100`', false, 'Hard', NULL, 43.6, 
   11.9, 'https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points', 59, 4.4, 10.1, '["Google"]'::jsonb, '["Dynamic Programming,Graph"]'::jsonb, 
   207, 9, 96, true, '[]'::jsonb, true),
  (1596, 'The Most Frequently Ordered Products for Each Customer', 'SQL Schema', true, 'Medium', NULL, 85, 
   9.8, 'https://leetcode.com/problems/the-most-frequently-ordered-products-for-each-customer', 135, 8.1, 9.5, '["Amazon"]'::jsonb, '[]'::jsonb, 
   67, 6, 92, true, '[]'::jsonb, true),
  (1597, 'Build Binary Expression Tree From Infix Expression', 'A binary expression tree is a kind of binary tree used to represent arithmetic expressions. Each node of a binary expression tree has either zero or two children. Leaf nodes (nodes with 0 children) correspond to operands (numbers), and internal nodes (nodes with 2 children) correspond to the operators `''+''` (addition), `''-''` (subtraction), `''*''` (multiplication), and `''/''` (division).

For each internal node with operator `o`, the infix expression that it represents is `(A o B)`, where `A` is the expression the left subtree represents and `B` is the expression the right subtree represents.

You are given a string `s`, an infix expression containing operands, the operators described above, and parentheses `''(''` and `'')''`.

Return any valid binary expression tree, which its in-order traversal reproduces `s` after omitting the parenthesis from it (see examples below).

Please note that order of operations applies in `s`. That is, expressions in parentheses are evaluated first, and multiplication and division happen before addition and subtraction.

Operands must also appear in the same order in both `s` and the in-order traversal of the tree.


Example 1:
Input: s = "3*4-2*5"
Output: [-,*,*,3,4,2,5]
Explanation: The tree above is the only valid tree whose inorder traversal produces s.


Example 2:
Input: s = "2-3/(5*2)+1"
Output: [+,-,1,2,/,null,null,null,null,3,*,null,null,5,2]
Explanation: The inorder traversal of the tree above is 2-3/5*2+1 which is the same as s without the parenthesis. The tree also produces the correct result and its operands are in the same order as they appear in s.

The tree below is also a valid binary expression tree with the same inorder traversal as s, but it not a valid answer because it does not evaluate to the same value.

The third tree below is also not valid. Although it produces the same result and is equivalent to the above trees, its inorder traversal does not produce s and its operands are not in the same order as s.


Example 3:
Input: s = "1+2+3+4+5"
Output: [+,+,5,+,4,null,null,+,3,null,null,1,2]
Explanation: The tree [+,+,5,+,+,null,null,1,2,3,4] is also one of many other valid trees.


Constraints:
`1 <= s.length <= 1000`
`s` consists of digits and the characters `''+''`, `''-''`, `''*''`, and `''/''`.

Operands in `s` are exactly 1 digit.

It is guaranteed that `s` is a valid expression.', true, 'Hard', NULL, 59, 
   25.2, 'https://leetcode.com/problems/build-binary-expression-tree-from-infix-expression', 60, 2.9, 4.8, '["Amazon"]'::jsonb, '["String,Tree"]'::jsonb, 
   77, 16, 83, true, '[]'::jsonb, true),
  (1598, 'Crawler Log Folder', 'The Leetcode file system keeps a log each time some user performs a change folder operation.

The operations are described below:
`"../"` : Move to the parent folder of the current folder. (If you are already in the main folder, remain in the same folder).

`"./"` : Remain in the same folder.

`"x/"` : Move to the child folder named `x` (This folder is guaranteed to always exist).

You are given a list of strings `logs` where `logs[i]` is the operation performed by the user at the `ith` step.

The file system starts in the main folder, then the operations in `logs` are performed.

Return the minimum number of operations needed to go back to the main folder after the change folder operations.


Example 1:
Input: logs = ["d1/","d2/","../","d21/","./"]
Output: 2
Explanation: Use this change folder operation "../" 2 times and go back to the main folder.


Example 2:
Input: logs = ["d1/","d2/","./","d3/","../","d31/"]
Output: 3

Example 3:
Input: logs = ["d1/","../","../","../"]
Output: 0

Constraints:
`1 <= logs.length <= 103`
`2 <= logs[i].length <= 10`
`logs[i]` contains lowercase English letters, digits, `''.''`, and `''/''`.

`logs[i]` follows the format described in the statement.

Folder names consist of lowercase English letters and digits.', false, 'Easy', NULL, 63.7, 
   10.2, 'https://leetcode.com/problems/crawler-log-folder', 327, 21.2, 33.2, '["Mercari"]'::jsonb, '["Stack"]'::jsonb, 
   199, 19, 91, false, '[]'::jsonb, true),
  (1599, 'Maximum Profit of Operating a Centennial Wheel', 'You are the operator of a Centennial Wheel that has four gondolas, and each gondola has room for up to four people. You have the ability to rotate the gondolas counterclockwise, which costs you `runningCost` dollars.

You are given an array `customers` of length `n` where `customers[i]` is the number of new customers arriving just before the `ith` rotation (0-indexed). This means you must rotate the wheel `i` times before the `customers[i]` customers arrive. You cannot make customers wait if there is room in the gondola. Each customer pays `boardingCost` dollars when they board on the gondola closest to the ground and will exit once that gondola reaches the ground again.

You can stop the wheel at any time, including before serving all customers. If you decide to stop serving customers, all subsequent rotations are free in order to get all the customers down safely. Note that if there are currently more than four customers waiting at the wheel, only four will board the gondola, and the rest will wait for the next rotation.

Return the minimum number of rotations you need to perform to maximize your profit. If there is no scenario where the profit is positive, return `-1`.


Example 1:
Input: customers = [8,3], boardingCost = 5, runningCost = 6
Output: 3
Explanation: The numbers written on the gondolas are the number of people currently there.

1. 8 customers arrive, 4 board and 4 wait for the next gondola, the wheel rotates. Current profit is 4 * $5 - 1 * $6 = $14.

2. 3 customers arrive, the 4 waiting board the wheel and the other 3 wait, the wheel rotates. Current profit is 8 * $5 - 2 * $6 = $28.

3. The final 3 customers board the gondola, the wheel rotates. Current profit is 11 * $5 - 3 * $6 = $37.

The highest profit was $37 after rotating the wheel 3 times.


Example 2:
Input: customers = [10,9,6], boardingCost = 6, runningCost = 4
Output: 7
Explanation:
1. 10 customers arrive, 4 board and 6 wait for the next gondola, the wheel rotates. Current profit is 4 * $6 - 1 * $4 = $20.

2. 9 customers arrive, 4 board and 11 wait (2 originally waiting, 9 newly waiting), the wheel rotates. Current profit is 8 * $6 - 2 * $4 = $40.

3. The final 6 customers arrive, 4 board and 13 wait, the wheel rotates. Current profit is 12 * $6 - 3 * $4 = $60.

4. 4 board and 9 wait, the wheel rotates. Current profit is 16 * $6 - 4 * $4 = $80.

5. 4 board and 5 wait, the wheel rotates. Current profit is 20 * $6 - 5 * $4 = $100.

6. 4 board and 1 waits, the wheel rotates. Current profit is 24 * $6 - 6 * $4 = $120.

7. 1 boards, the wheel rotates. Current profit is 25 * $6 - 7 * $4 = $122.

The highest profit was $122 after rotating the wheel 7 times.


Example 3:
Input: customers = [3,4,0,5,1], boardingCost = 1, runningCost = 92
Output: -1
Explanation:
1. 3 customers arrive, 3 board and 0 wait, the wheel rotates. Current profit is 3 * $1 - 1 * $92 = -$89.

2. 4 customers arrive, 4 board and 0 wait, the wheel rotates. Current profit is 7 * $1 - 2 * $92 = -$177.

3. 0 customers arrive, 0 board and 0 wait, the wheel rotates. Current profit is 7 * $1 - 3 * $92 = -$269.

4. 5 customers arrive, 4 board and 1 waits, the wheel rotates. Current profit is 11 * $1 - 4 * $92 = -$357.

5. 1 customer arrives, 2 board and 0 wait, the wheel rotates. Current profit is 13 * $1 - 5 * $92 = -$447.

The profit was never positive, so return -1.


Example 4:
Input: customers = [10,10,6,4,7], boardingCost = 3, runningCost = 8
Output: 9
Explanation:
1. 10 customers arrive, 4 board and 6 wait, the wheel rotates. Current profit is 4 * $3 - 1 * $8 = $4.

2. 10 customers arrive, 4 board and 12 wait, the wheel rotates. Current profit is 8 * $3 - 2 * $8 = $8.

3. 6 customers arrive, 4 board and 14 wait, the wheel rotates. Current profit is 12 * $3 - 3 * $8 = $12.

4. 4 customers arrive, 4 board and 14 wait, the wheel rotates. Current profit is 16 * $3 - 4 * $8 = $16.

5. 7 customers arrive, 4 board and 17 wait, the wheel rotates. Current profit is 20 * $3 - 5 * $8 = $20.

6. 4 board and 13 wait, the wheel rotates. Current profit is 24 * $3 - 6 * $8 = $24.

7. 4 board and 9 wait, the wheel rotates. Current profit is 28 * $3 - 7 * $8 = $28.

8. 4 board and 5 wait, the wheel rotates. Current profit is 32 * $3 - 8 * $8 = $32.

9. 4 board and 1 waits, the wheel rotates. Current profit is 36 * $3 - 9 * $8 = $36.

10. 1 board and 0 wait, the wheel rotates. Current profit is 37 * $3 - 10 * $8 = $31.

The highest profit was $36 after rotating the wheel 9 times.


Constraints:
`n == customers.length`
`1 <= n <= 105`
`0 <= customers[i] <= 50`
`1 <= boardingCost, runningCost <= 100`', false, 'Medium', NULL, 43.7, 
   0, 'https://leetcode.com/problems/maximum-profit-of-operating-a-centennial-wheel', 142, 8.2, 18.9, '["peak6"]'::jsonb, '["Greedy"]'::jsonb, 
   52, 182, 22, false, '[]'::jsonb, true),
  (1600, 'Throne Inheritance', 'A kingdom consists of a king, his children, his grandchildren, and so on. Every once in a while, someone in the family dies or a child is born.

The kingdom has a well-defined order of inheritance that consists of the king as the first member. Let''s define the recursive function `Successor(x, curOrder)`, which given a person `x` and the inheritance order so far, returns who should be the next person after `x` in the order of inheritance.

Successor(x, curOrder):
    if x has no children or all of x''s children are in curOrder:
        if x is the king return null
        else return Successor(x''s parent, curOrder)
    else return x''s oldest child who''s not in curOrder
For example, assume we have a kingdom that consists of the king, his children Alice and Bob (Alice is older than Bob), and finally Alice''s son Jack.

In the beginning, `curOrder` will be `["king"]`.

Calling `Successor(king, curOrder)` will return Alice, so we append to `curOrder` to get `["king", "Alice"]`.

Calling `Successor(Alice, curOrder)` will return Jack, so we append to `curOrder` to get `["king", "Alice", "Jack"]`.

Calling `Successor(Jack, curOrder)` will return Bob, so we append to `curOrder` to get `["king", "Alice", "Jack", "Bob"]`.

Calling `Successor(Bob, curOrder)` will return `null`. Thus the order of inheritance will be `["king", "Alice", "Jack", "Bob"]`.

Using the above function, we can always obtain a unique order of inheritance.

Implement the `ThroneInheritance` class:
`ThroneInheritance(string kingName)` Initializes an object of the `ThroneInheritance` class. The name of the king is given as part of the constructor.

`void birth(string parentName, string childName)` Indicates that `parentName` gave birth to `childName`.

`void death(string name)` Indicates the death of `name`. The death of the person doesn''t affect the `Successor` function nor the current inheritance order. You can treat it as just marking the person as dead.

`string[] getInheritanceOrder()` Returns a list representing the current order of inheritance excluding dead people.


Example 1:
Input
["ThroneInheritance", "birth", "birth", "birth", "birth", "birth", "birth", "getInheritanceOrder", "death", "getInheritanceOrder"]
[["king"], ["king", "andy"], ["king", "bob"], ["king", "catherine"], ["andy", "matthew"], ["bob", "alex"], ["bob", "asha"], [null], ["bob"], [null]]
Output
[null, null, null, null, null, null, null, ["king", "andy", "matthew", "bob", "alex", "asha", "catherine"], null, ["king", "andy", "matthew", "alex", "asha", "catherine"]]
Explanation
ThroneInheritance t= new ThroneInheritance("king"); // order: king
t.birth("king", "andy"); // order: king > andy
t.birth("king", "bob"); // order: king > andy > bob
t.birth("king", "catherine"); // order: king > andy > bob > catherine
t.birth("andy", "matthew"); // order: king > andy > matthew > bob > catherine
t.birth("bob", "alex"); // order: king > andy > matthew > bob > alex > catherine
t.birth("bob", "asha"); // order: king > andy > matthew > bob > alex > asha > catherine
t.getInheritanceOrder(); // return ["king", "andy", "matthew", "bob", "alex", "asha", "catherine"]
t.death("bob"); // order: king > andy > matthew > bob > alex > asha > catherine
t.getInheritanceOrder(); // return ["king", "andy", "matthew", "alex", "asha", "catherine"]

Constraints:
`1 <= kingName.length, parentName.length, childName.length, name.length <= 15`
`kingName`, `parentName`, `childName`, and `name` consist of lowercase English letters only.

All arguments `childName` and `kingName` are distinct.

All `name` arguments of `death` will be passed to either the constructor or as `childName` to `birth` first.

For each call to `birth(parentName, childName)`, it is guaranteed that `parentName` is alive.

At most `105` calls will be made to `birth` and `death`.

At most `10` calls will be made to `getInheritanceOrder`.', false, 'Medium', NULL, 60.6, 
   7.1, 'https://leetcode.com/problems/throne-inheritance', 184, 8.1, 13.3, '["Amazon"]'::jsonb, '["Tree,Design"]'::jsonb, 
   105, 168, 38, true, '[]'::jsonb, true),
  (1601, 'Maximum Number of Achievable Transfer Requests', 'We have `n` buildings numbered from `0` to `n - 1`. Each building has a number of employees. It''s transfer season, and some employees want to change the building they reside in.

You are given an array `requests` where `requests[i] = [fromi, toi]` represents an employee''s request to transfer from building `fromi` to building `toi`.

All buildings are full, so a list of requests is achievable only if for each building, the net change in employee transfers is zero. This means the number of employees leaving is equal to the number of employees moving in. For example if `n = 3` and two employees are leaving building `0`, one is leaving building `1`, and one is leaving building `2`, there should be two employees moving to building `0`, one employee moving to building `1`, and one employee moving to building `2`.

Return the maximum number of achievable requests.


Example 1:
Input: n = 5, requests = [[0,1],[1,0],[0,1],[1,2],[2,0],[3,4]]
Output: 5
Explantion: Let''s see the requests:
From building 0 we have employees x and y and both want to move to building 1.

From building 1 we have employees a and b and they want to move to buildings 2 and 0 respectively.

From building 2 we have employee z and they want to move to building 0.

From building 3 we have employee c and they want to move to building 4.

From building 4 we don''t have any requests.

We can achieve the requests of users x and b by swapping their places.

We can achieve the requests of users y, a and z by swapping the places in the 3 buildings.


Example 2:
Input: n = 3, requests = [[0,0],[1,2],[2,1]]
Output: 3
Explantion: Let''s see the requests:
From building 0 we have employee x and they want to stay in the same building 0.

From building 1 we have employee y and they want to move to building 2.

From building 2 we have employee z and they want to move to building 1.

We can achieve all the requests. 

Example 3:
Input: n = 4, requests = [[0,3],[3,1],[1,2],[2,0]]
Output: 4

Constraints:
`1 <= n <= 20`
`1 <= requests.length <= 16`
`requests[i].length == 2`
`0 <= fromi, toi < n`', false, 'Hard', NULL, 47.8, 
   0, 'https://leetcode.com/problems/maximum-number-of-achievable-transfer-requests', 82, 5.6, 11.8, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   172, 21, 89, true, '[]'::jsonb, true),
  (1602, 'Find Nearest Right Node in Binary Tree', 'Given the `root` of a binary tree and a node `u` in the tree, return the nearest node on the same level that is to the right of `u`, or return `null` if `u` is the rightmost node in its level.


Example 1:
Input: root = [1,2,3,null,4,5,6], u = 4
Output: 5
Explanation: The nearest node on the same level to the right of node 4 is node 5.


Example 2:
Input: root = [3,null,4,2], u = 2
Output: null
Explanation: There are no nodes to the right of 2.


Example 3:
Input: root = [1], u = 1
Output: null

Example 4:
Input: root = [3,4,2,null,null,null,1], u = 4
Output: 2

Constraints:
The number of nodes in the tree is in the range `[1, 105]`.

`1 <= Node.val <= 105`
All values in the tree are distinct.

`u` is a node in the binary tree rooted at `root`.', true, 'Medium', '/articles/find-nearest-right-node-in-binary-tree', 73.5, 
   0, 'https://leetcode.com/problems/find-nearest-right-node-in-binary-tree', 159, 9.9, 13.4, '["Google"]'::jsonb, '["Tree,Breadth-first Search"]'::jsonb, 
   154, 2, 99, true, '[]'::jsonb, true),
  (1603, 'Design Parking System', 'Design a parking system for a parking lot. The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.

Implement the `ParkingSystem` class:
`ParkingSystem(int big, int medium, int small)` Initializes object of the `ParkingSystem` class. The number of slots for each parking space are given as part of the constructor.

`bool addCar(int carType)` Checks whether there is a parking space of `carType` for the car that wants to get into the parking lot. `carType` can be of three kinds: big, medium, or small, which are represented by `1`, `2`, and `3` respectively. A car can only park in a parking space of its `carType`. If there is no space available, return `false`, else park the car in that size space and return `true`.


Example 1:
Input
["ParkingSystem", "addCar", "addCar", "addCar", "addCar"]
[[1, 1, 0], [1], [2], [3], [1]]
Output
[null, true, true, false, false]
Explanation
ParkingSystem parkingSystem = new ParkingSystem(1, 1, 0);
parkingSystem.addCar(1); // return true because there is 1 available slot for a big car
parkingSystem.addCar(2); // return true because there is 1 available slot for a medium car
parkingSystem.addCar(3); // return false because there is no available slot for a small car
parkingSystem.addCar(1); // return false because there is no available slot for a big car. It is already occupied.


Constraints:
`0 <= big, medium, small <= 1000`
`carType` is `1`, `2`, or `3`
At most `1000` calls will be made to `addCar`', false, 'Easy', NULL, 86.2, 
   15.7, 'https://leetcode.com/problems/design-parking-system', 371, 52, 60.3, '["Amazon"]'::jsonb, '["Design"]'::jsonb, 
   282, 135, 68, true, '[]'::jsonb, true),
  (1604, 'Alert Using Same Key-Card Three or More Times in a One Hour Period', 'LeetCode company workers use key-cards to unlock office doors. Each time a worker uses their key-card, the security system saves the worker''s name and the time when it was used. The system emits an alert if any worker uses the key-card three or more times in a one-hour period.

You are given a list of strings `keyName` and `keyTime` where `[keyName[i], keyTime[i]]` corresponds to a person''s name and the time when their key-card was used in a single day.

Access times are given in the 24-hour time format "HH:MM", such as `"23:51"` and `"09:49"`.

Return a list of unique worker names who received an alert for frequent keycard use. Sort the names in ascending order alphabetically.

Notice that `"10:00"` - `"11:00"` is considered to be within a one-hour period, while `"22:51"` - `"23:52"` is not considered to be within a one-hour period.


Example 1:
Input: keyName = ["daniel","daniel","daniel","luis","luis","luis","luis"], keyTime = ["10:00","10:40","11:00","09:00","11:00","13:00","15:00"]
Output: ["daniel"]
Explanation: "daniel" used the keycard 3 times in a one-hour period ("10:00","10:40", "11:00").


Example 2:
Input: keyName = ["alice","alice","alice","bob","bob","bob","bob"], keyTime = ["12:01","12:00","18:00","21:00","21:20","21:30","23:00"]
Output: ["bob"]
Explanation: "bob" used the keycard 3 times in a one-hour period ("21:00","21:20", "21:30").


Example 3:
Input: keyName = ["john","john","john"], keyTime = ["23:58","23:59","00:01"]
Output: []

Example 4:
Input: keyName = ["leslie","leslie","leslie","clare","clare","clare","clare"], keyTime = ["13:00","13:20","14:00","18:00","18:51","19:30","19:49"]
Output: ["clare","leslie"]

Constraints:
`1 <= keyName.length, keyTime.length <= 105`
`keyName.length == keyTime.length`
`keyTime[i]` is in the format "HH:MM".

`[keyName[i], keyTime[i]]` is unique.

`1 <= keyName[i].length <= 10`
`keyName[i] contains only lowercase English letters.`', false, 'Medium', NULL, 42.9, 
   22.5, 'https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period', 125, 7.5, 17.5, '["Wayfair"]'::jsonb, '["String,Ordered Map"]'::jsonb, 
   82, 151, 35, false, '[]'::jsonb, true),
  (1605, 'Find Valid Matrix Given Row and Column Sums', 'You are given two arrays `rowSum` and `colSum` of non-negative integers where `rowSum[i]` is the sum of the elements in the `ith` row and `colSum[j]` is the sum of the elements of the `jth` column of a 2D matrix. In other words, you do not know the elements of the matrix, but you do know the sums of each row and column.

Find any matrix of non-negative integers of size `rowSum.length x colSum.length` that satisfies the `rowSum` and `colSum` requirements.

Return a 2D array representing any matrix that fulfills the requirements. It''s guaranteed that at least one matrix that fulfills the requirements exists.


Example 1:
Input: rowSum = [3,8], colSum = [4,7]
Output: [[3,0],
         [1,7]]
Explanation:
0th row: 3 + 0 = 3 == rowSum[0]
1st row: 1 + 7 = 8 == rowSum[1]
0th column: 3 + 1 = 4 == colSum[0]
1st column: 0 + 7 = 7 == colSum[1]
The row and column sums match, and all matrix elements are non-negative.

Another possible matrix is: [[1,2],
                             [3,5]]

Example 2:
Input: rowSum = [5,7,10], colSum = [8,6,8]
Output: [[0,5,0],
         [6,1,0],
         [2,0,8]]

Example 3:
Input: rowSum = [14,9], colSum = [6,9,8]
Output: [[0,9,5],
         [6,0,3]]

Example 4:
Input: rowSum = [1,0], colSum = [1]
Output: [[1],
         [0]]

Example 5:
Input: rowSum = [0], colSum = [0]
Output: [[0]]

Constraints:
`1 <= rowSum.length, colSum.length <= 500`
`0 <= rowSum[i], colSum[i] <= 108`
`sum(rows) == sum(columns)`', false, 'Medium', NULL, 77.2, 
   10.3, 'https://leetcode.com/problems/find-valid-matrix-given-row-and-column-sums', 121, 11.8, 15.2, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   418, 16, 96, true, '[]'::jsonb, true),
  (1606, 'Find Servers That Handled Most Number of Requests', 'You have `k` servers numbered from `0` to `k-1` that are being used to handle multiple requests simultaneously. Each server has infinite computational capacity but cannot handle more than one request at a time. The requests are assigned to servers according to a specific algorithm:
The `ith` (0-indexed) request arrives.

If all servers are busy, the request is dropped (not handled at all).

If the `(i % k)th` server is available, assign the request to that server.

Otherwise, assign the request to the next available server (wrapping around the list of servers and starting from 0 if necessary). For example, if the `ith` server is busy, try to assign the request to the `(i+1)th` server, then the `(i+2)th` server, and so on.

You are given a strictly increasing array `arrival` of positive integers, where `arrival[i]` represents the arrival time of the `ith` request, and another array `load`, where `load[i]` represents the load of the `ith` request (the time it takes to complete). Your goal is to find the busiest server(s). A server is considered busiest if it handled the most number of requests successfully among all the servers.

Return a list containing the IDs (0-indexed) of the busiest server(s). You may return the IDs in any order.


Example 1:
Input: k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3] 
Output: [1] 
Explanation:
All of the servers start out available.

The first 3 requests are handled by the first 3 servers in order.

Request 3 comes in. Server 0 is busy, so it''s assigned to the next available server, which is 1.

Request 4 comes in. It cannot be handled since all servers are busy, so it is dropped.

Servers 0 and 2 handled one request each, while server 1 handled two requests. Hence server 1 is the busiest server.


Example 2:
Input: k = 3, arrival = [1,2,3,4], load = [1,2,1,2]
Output: [0]
Explanation:
The first 3 requests are handled by first 3 servers.

Request 3 comes in. It is handled by server 0 since the server is available.

Server 0 handled two requests, while servers 1 and 2 handled one request each. Hence server 0 is the busiest server.


Example 3:
Input: k = 3, arrival = [1,2,3], load = [10,12,11]
Output: [0,1,2]
Explanation: Each server handles a single request, so they are all considered the busiest.


Example 4:
Input: k = 3, arrival = [1,2,3,4,8,9,10], load = [5,2,10,3,1,2,2]
Output: [1]

Example 5:
Input: k = 1, arrival = [1], load = [1]
Output: [0]

Constraints:
`1 <= k <= 105`
`1 <= arrival.length, load.length <= 105`
`arrival.length == load.length`
`1 <= arrival[i], load[i] <= 109`
`arrival` is strictly increasing.', false, 'Hard', NULL, 37.4, 
   28.8, 'https://leetcode.com/problems/find-servers-that-handled-most-number-of-requests', 72, 3.9, 10.5, '["Wish"]'::jsonb, '["Ordered Map"]'::jsonb, 
   191, 7, 96, false, '[]'::jsonb, true),
  (1607, 'Sellers With No Sales', 'SQL Schema', true, 'Easy', NULL, 55.5, 
   0, 'https://leetcode.com/problems/sellers-with-no-sales', 84, 5.9, 10.6, '[]'::jsonb, '[]'::jsonb, 
   23, 4, 85, false, '[]'::jsonb, true),
  (1608, 'Special Array With X Elements Greater Than or Equal X', 'You are given an array `nums` of non-negative integers. `nums` is considered special if there exists a number `x` such that there are exactly `x` numbers in `nums` that are greater than or equal to `x`.

Notice that `x` does not have to be an element in `nums`.

Return `x` if the array is special, otherwise, return `-1`. It can be proven that if `nums` is special, the value for `x` is unique.


Example 1:
Input: nums = [3,5]
Output: 2
Explanation: There are 2 values (3 and 5) that are greater than or equal to 2.


Example 2:
Input: nums = [0,0]
Output: -1
Explanation: No numbers fit the criteria for x.

If x = 0, there should be 0 numbers >= x, but there are 2.

If x = 1, there should be 1 number >= x, but there are 0.

If x = 2, there should be 2 numbers >= x, but there are 0.

x cannot be greater since there are only 2 numbers in nums.


Example 3:
Input: nums = [0,4,3,0,4]
Output: 3
Explanation: There are 3 values that are greater than or equal to 3.


Example 4:
Input: nums = [3,6,7,7,0]
Output: -1

Constraints:
`1 <= nums.length <= 100`
`0 <= nums[i] <= 1000`', false, 'Easy', NULL, 61.2, 
   0, 'https://leetcode.com/problems/special-array-with-x-elements-greater-than-or-equal-x', 294, 18.8, 30.7, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   240, 43, 85, true, '[]'::jsonb, true),
  (1609, 'Even Odd Tree', 'A binary tree is named Even-Odd if it meets the following conditions:
The root of the binary tree is at level index `0`, its children are at level index `1`, their children are at level index `2`, etc.

For every even-indexed level, all nodes at the level have odd integer values in strictly increasing order (from left to right).

For every odd-indexed level, all nodes at the level have even integer values in strictly decreasing order (from left to right).

Given the `root` of a binary tree, return `true` if the binary tree is Even-Odd, otherwise return `false`.


Example 1:
Input: root = [1,10,4,3,null,7,9,12,8,6,null,null,2]
Output: true
Explanation: The node values on each level are:
Level 0: [1]
Level 1: [10,4]
Level 2: [3,7,9]
Level 3: [12,8,6,2]
Since levels 0 and 2 are all odd and increasing, and levels 1 and 3 are all even and decreasing, the tree is Even-Odd.


Example 2:
Input: root = [5,4,2,3,3,7]
Output: false
Explanation: The node values on each level are:
Level 0: [5]
Level 1: [4,2]
Level 2: [3,3,7]
Node values in the level 2 must be in strictly increasing order, so the tree is not Even-Odd.


Example 3:
Input: root = [5,9,1,3,5,7]
Output: false
Explanation: Node values in the level 1 should be even integers.


Example 4:
Input: root = [1]
Output: true

Example 5:
Input: root = [11,8,6,1,3,9,11,30,20,18,16,12,10,4,2,17]
Output: true

Constraints:
The number of nodes in the tree is in the range `[1, 105]`.

`1 <= Node.val <= 106`', false, 'Medium', NULL, 52.4, 
   4.2, 'https://leetcode.com/problems/even-odd-tree', 305, 17.3, 33.1, '["JPMorgan"]'::jsonb, '["Tree"]'::jsonb, 
   275, 19, 94, false, '[]'::jsonb, true),
  (1610, 'Maximum Number of Visible Points', 'You are given an array `points`, an integer `angle`, and your `location`, where `location = [posx, posy]` and `points[i] = [xi, yi]` both denote integral coordinates on the X-Y plane.

Initially, you are facing directly east from your position. You cannot move from your position, but you can rotate. In other words, `posx` and `posy` cannot be changed. Your field of view in degrees is represented by `angle`, determining how wide you can see from any given view direction. Let `d` be the amount in degrees that you rotate counterclockwise. Then, your field of view is the inclusive range of angles `[d - angle/2, d + angle/2]`.

Your browser does not support the video tag or this video format.

You can see some set of points if, for each point, the angle formed by the point, your position, and the immediate east direction from your position is in your field of view.

There can be multiple points at one coordinate. There may be points at your location, and you can always see these points regardless of your rotation. Points do not obstruct your vision to other points.

Return the maximum number of points you can see.


Example 1:
Input: points = [[2,1],[2,2],[3,3]], angle = 90, location = [1,1]
Output: 3
Explanation: The shaded region represents your field of view. All points can be made visible in your field of view, including [3,3] even though [2,2] is in front and in the same line of sight.


Example 2:
Input: points = [[2,1],[2,2],[3,4],[1,1]], angle = 90, location = [1,1]
Output: 4
Explanation: All points can be made visible in your field of view, including the one at your location.


Example 3:
Input: points = [[1,0],[2,1]], angle = 13, location = [1,1]
Output: 1
Explanation: You can only see one of the two points, as shown above.


Constraints:
`1 <= points.length <= 105`
`points[i].length == 2`
`location.length == 2`
`0 <= angle < 360`
`0 <= posx, posy, xi, yi <= 100`', false, 'Hard', NULL, 30.4, 
   37.6, 'https://leetcode.com/problems/maximum-number-of-visible-points', 78, 7.4, 24.4, '["Google,Amazon"]'::jsonb, '["Two Pointers,Geometry"]'::jsonb, 
   148, 223, 40, true, '[]'::jsonb, true),
  (1611, 'Minimum One Bit Operations to Make Integers Zero', 'Given an integer `n`, you must transform it into `0` using the following operations any number of times:
Change the rightmost (`0th`) bit in the binary representation of `n`.

Change the `ith` bit in the binary representation of `n` if the `(i-1)th` bit is set to `1` and the `(i-2)th` through `0th` bits are set to `0`.

Return the minimum number of operations to transform `n` into `0`.


Example 1:
Input: n = 0
Output: 0

Example 2:
Input: n = 3
Output: 2
Explanation: The binary representation of 3 is "11".

"11" -> "01" with the 2nd operation since the 0th bit is 1.

"01" -> "00" with the 1st operation.


Example 3:
Input: n = 6
Output: 4
Explanation: The binary representation of 6 is "110".

"110" -> "010" with the 2nd operation since the 1st bit is 1 and 0th through 0th bits are 0.

"010" -> "011" with the 1st operation.

"011" -> "001" with the 2nd operation since the 0th bit is 1.

"001" -> "000" with the 1st operation.


Example 4:
Input: n = 9
Output: 14

Example 5:
Input: n = 333
Output: 393

Constraints:
`0 <= n <= 109`', false, 'Hard', NULL, 57.7, 
   39.8, 'https://leetcode.com/problems/minimum-one-bit-operations-to-make-integers-zero', 75, 3.8, 6.6, '["Expedia"]'::jsonb, '["Dynamic Programming,Bit Manipulation"]'::jsonb, 
   144, 100, 59, false, '[]'::jsonb, true),
  (1612, 'Check If Two Expression Trees are Equivalent', 'A binary expression tree is a kind of binary tree used to represent arithmetic expressions. Each node of a binary expression tree has either zero or two children. Leaf nodes (nodes with 0 children) correspond to operands (variables), and internal nodes (nodes with two children) correspond to the operators. In this problem, we only consider the `''+''` operator (i.e. addition).

You are given the roots of two binary expression trees, `root1` and `root2`. Return `true` if the two binary expression trees are equivalent. Otherwise, return `false`.

Two binary expression trees are equivalent if they evaluate to the same value regardless of what the variables are set to.

Follow up: What will you change in your solution if the tree also supports the `''-''` operator (i.e. subtraction)?

Example 1:
Input: root1 = [x], root2 = [x]
Output: true

Example 2:
Input: root1 = [+,a,+,null,null,b,c], root2 = [+,+,a,b,c]
Output: true
Explaination: `a + (b + c) == (b + c) + a`

Example 3:
Input: root1 = [+,a,+,null,null,b,c], root2 = [+,+,a,b,d]
Output: false
Explaination: `a + (b + c) != (b + d) + a`

Constraints:
The number of nodes in both trees are equal, odd and, in the range `[1, 4999]`.

`Node.val` is `''+''` or a lower-case English letter.

It''s guaranteed that the tree given is a valid binary expression tree.', true, 'Medium', NULL, 69.8, 
   0, 'https://leetcode.com/problems/check-if-two-expression-trees-are-equivalent', 55, 2.8, 4.1, '["Google"]'::jsonb, '["Hash Table,Tree"]'::jsonb, 
   58, 8, 88, true, '[]'::jsonb, true),
  (1613, 'Find the Missing IDs', 'SQL Schema', true, 'Medium', NULL, 74.8, 
   1.8, 'https://leetcode.com/problems/find-the-missing-ids', 53, 4.3, 5.7, '["Amazon"]'::jsonb, '[]'::jsonb, 
   65, 9, 88, true, '[]'::jsonb, true),
  (1614, 'Maximum Nesting Depth of the Parentheses', 'A string is a valid parentheses string (denoted VPS) if it meets one of the following:
It is an empty string `""`, or a single character not equal to `"("` or `")"`,
It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are VPS''s, or
It can be written as `(A)`, where `A` is a VPS.

We can similarly define the nesting depth `depth(S)` of any VPS `S` as follows:
`depth("") = 0`
`depth(C) = 0`, where `C` is a string with a single character not equal to `"("` or `")"`.

`depth(A + B) = max(depth(A), depth(B))`, where `A` and `B` are VPS''s.

`depth("(" + A + ")") = 1 + depth(A)`, where `A` is a VPS.

For example, `""`, `"()()"`, and `"()(()())"` are VPS''s (with nesting depths 0, 1, and 2), and `")("` and `"(()"` are not VPS''s.

Given a VPS represented as string `s`, return the nesting depth of `s`.


Example 1:
Input: s = "(1+(2*3)+((8)/4))+1"
Output: 3
Explanation: Digit 8 is inside of 3 nested parentheses in the string.


Example 2:
Input: s = "(1)+((2))+(((3)))"
Output: 3

Example 3:
Input: s = "1+(2*3)/(2-1)"
Output: 1

Example 4:
Input: s = "1"
Output: 0

Constraints:
`1 <= s.length <= 100`
`s` consists of digits `0-9` and characters `''+''`, `''-''`, `''*''`, `''/''`, `''(''`, and `'')''`.

It is guaranteed that parentheses expression `s` is a VPS.', false, 'Easy', NULL, 82.7, 
   16.2, 'https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses', 476, 36.5, 44.1, '["Bloomberg,Facebook"]'::jsonb, '["String"]'::jsonb, 
   298, 72, 81, true, '[]'::jsonb, true),
  (1615, 'Maximal Network Rank', 'There is an infrastructure of `n` cities with some number of `roads` connecting these cities. Each `roads[i] = [ai, bi]` indicates that there is a bidirectional road between cities `ai` and `bi`.

The network rank of two different cities is defined as the total number of directly connected roads to either city. If a road is directly connected to both cities, it is only counted once.

The maximal network rank of the infrastructure is the maximum network rank of all pairs of different cities.

Given the integer `n` and the array `roads`, return the maximal network rank of the entire infrastructure.


Example 1:
Input: n = 4, roads = [[0,1],[0,3],[1,2],[1,3]]
Output: 4
Explanation: The network rank of cities 0 and 1 is 4 as there are 4 roads that are connected to either 0 or 1. The road between 0 and 1 is only counted once.


Example 2:
Input: n = 5, roads = [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]
Output: 5
Explanation: There are 5 roads that are connected to cities 1 or 2.


Example 3:
Input: n = 8, roads = [[0,1],[1,2],[2,3],[2,4],[5,6],[5,7]]
Output: 5
Explanation: The network rank of 2 and 5 is 5. Notice that all the cities do not have to be connected.


Constraints:
`2 <= n <= 100`
`0 <= roads.length <= n * (n - 1) / 2`
`roads[i].length == 2`
`0 <= ai, bi <= n-1`
`ai != bi`
Each pair of cities has at most one road connecting them.', false, 'Medium', NULL, 52.7, 
   28.3, 'https://leetcode.com/problems/maximal-network-rank', 166, 14.6, 27.7, '["Microsoft,Amazon"]'::jsonb, '["Graph"]'::jsonb, 
   218, 42, 84, true, '[]'::jsonb, true),
  (1616, 'Split Two Strings to Make Palindrome', 'You are given two strings `a` and `b` of the same length. Choose an index and split both strings at the same index, splitting `a` into two strings: `aprefix` and `asuffix` where `a = aprefix + asuffix`, and splitting `b` into two strings: `bprefix` and `bsuffix` where `b = bprefix + bsuffix`. Check if `aprefix + bsuffix` or `bprefix + asuffix` forms a palindrome.

When you split a string `s` into `sprefix` and `ssuffix`, either `ssuffix` or `sprefix` is allowed to be empty. For example, if `s = "abc"`, then `"" + "abc"`, `"a" + "bc"`, `"ab" + "c"` , and `"abc" + ""` are valid splits.

Return `true` if it is possible to form a palindrome string, otherwise return `false`.

Notice that `x + y` denotes the concatenation of strings `x` and `y`.


Example 1:
Input: a = "x", b = "y"
Output: true
Explaination: If either a or b are palindromes the answer is true since you can split in the following way:
aprefix = "", asuffix = "x"
bprefix = "", bsuffix = "y"
Then, aprefix + bsuffix = "" + "y" = "y", which is a palindrome.


Example 2:
Input: a = "abdef", b = "fecab"
Output: true

Example 3:
Input: a = "ulacfd", b = "jizalu"
Output: true
Explaination: Split them at index 3:
aprefix = "ula", asuffix = "cfd"
bprefix = "jiz", bsuffix = "alu"
Then, aprefix + bsuffix = "ula" + "alu" = "ulaalu", which is a palindrome.


Example 4:
Input: a = "xbdef", b = "xecab"
Output: false

Constraints:
`1 <= a.length, b.length <= 105`
`a.length == b.length`
`a` and `b` consist of lowercase English letters', false, 'Medium', NULL, 36.1, 
   5.6, 'https://leetcode.com/problems/split-two-strings-to-make-palindrome', 149, 13.1, 36.3, '["Google"]'::jsonb, '["Two Pointers,String,Greedy"]'::jsonb, 
   295, 157, 65, true, '[]'::jsonb, true),
  (1617, 'Count Subtrees With Max Distance Between Cities', 'There are `n` cities numbered from `1` to `n`. You are given an array `edges` of size `n-1`, where `edges[i] = [ui, vi]` represents a bidirectional edge between cities `ui` and `vi`. There exists a unique path between each pair of cities. In other words, the cities form a tree.

A subtree is a subset of cities where every city is reachable from every other city in the subset, where the path between each pair passes through only the cities from the subset. Two subtrees are different if there is a city in one subtree that is not present in the other.

For each `d` from `1` to `n-1`, find the number of subtrees in which the maximum distance between any two cities in the subtree is equal to `d`.

Return an array of size `n-1` where the `dth` element (1-indexed) is the number of subtrees in which the maximum distance between any two cities is equal to `d`.

Notice that the distance between the two cities is the number of edges in the path between them.


Example 1:
Input: n = 4, edges = [[1,2],[2,3],[2,4]]
Output: [3,4,0]
Explanation:
The subtrees with subsets {1,2}, {2,3} and {2,4} have a max distance of 1.

The subtrees with subsets {1,2,3}, {1,2,4}, {2,3,4} and {1,2,3,4} have a max distance of 2.

No subtree has two nodes where the max distance between them is 3.


Example 2:
Input: n = 2, edges = [[1,2]]
Output: [1]

Example 3:
Input: n = 3, edges = [[1,2],[2,3]]
Output: [2,1]

Constraints:
`2 <= n <= 15`
`edges.length == n-1`
`edges[i].length == 2`
`1 <= ui, vi <= n`
All pairs `(ui, vi)` are distinct.', false, 'Hard', NULL, 63.2, 
   0, 'https://leetcode.com/problems/count-subtrees-with-max-distance-between-cities', 84, 4.3, 6.8, '["Codenation"]'::jsonb, '["Backtracking"]'::jsonb, 
   156, 23, 87, false, '[]'::jsonb, true),
  (1618, 'Maximum Font to Fit a Sentence in a Screen', 'You are given a string `text`. We want to display `text` on a screen of width `w` and height `h`. You can choose any font size from array `fonts`, which contains the available font sizes in ascending order.

You can use the `FontInfo` interface to get the width and height of any character at any available font size.

The `FontInfo` interface is defined as such:
interface FontInfo {
  // Returns the width of character ch on the screen using font size fontSize.

  // O(1) per call
  public int getWidth(int fontSize, char ch);
  // Returns the height of any character on the screen using font size fontSize.

  // O(1) per call
  public int getHeight(int fontSize);
}
The calculated width of `text` for some `fontSize` is the sum of every `getWidth(fontSize, text[i])` call for each `0 <= i < text.length` (0-indexed). The calculated height of `text` for some `fontSize` is `getHeight(fontSize)`. Note that `text` is displayed on a single line.

It is guaranteed that `FontInfo` will return the same value if you call `getHeight` or `getWidth` with the same parameters.

It is also guaranteed that for any font size `fontSize` and any character `ch`:
`getHeight(fontSize) <= getHeight(fontSize+1)`
`getWidth(fontSize, ch) <= getWidth(fontSize+1, ch)`
Return the maximum font size you can use to display `text` on the screen. If `text` cannot fit on the display with any font size, return `-1`.


Example 1:
Input: text = "helloworld", w = 80, h = 20, fonts = [6,8,10,12,14,16,18,24,36]
Output: 6

Example 2:
Input: text = "leetcode", w = 1000, h = 50, fonts = [1,2,4]
Output: 4

Example 3:
Input: text = "easyquestion", w = 100, h = 100, fonts = [10,15,20,25]
Output: -1

Constraints:
`1 <= text.length <= 50000`
`text` contains only lowercase English letters.

`1 <= w <= 107`
`1 <= h <= 104`
`1 <= fonts.length <= 105`
`1 <= fonts[i] <= 105`
`fonts` is sorted in ascending order and does not contain duplicates.', true, 'Medium', NULL, 56.7, 
   7.9, 'https://leetcode.com/problems/maximum-font-to-fit-a-sentence-in-a-screen', 32, 2.1, 3.7, '["Google"]'::jsonb, '["String,Binary Search"]'::jsonb, 
   44, 7, 86, true, '[]'::jsonb, true),
  (1619, 'Mean of Array After Removing Some Elements', 'Given an integer array `arr`, return the mean of the remaining integers after removing the smallest `5%` and the largest `5%` of the elements.

Answers within `10-5` of the actual answer will be considered accepted.


Example 1:
Input: arr = [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3]
Output: 2.00000
Explanation: After erasing the minimum and the maximum values of this array, all elements are equal to 2, so the mean is 2.


Example 2:
Input: arr = [6,2,7,5,1,2,0,3,10,2,5,0,5,5,0,8,7,6,8,0]
Output: 4.00000

Example 3:
Input: arr = [6,0,7,0,7,5,7,8,3,4,0,7,8,1,6,8,1,1,2,4,8,1,9,5,4,3,8,5,10,8,6,6,1,0,6,10,8,2,3,4]
Output: 4.77778

Example 4:
Input: arr = [9,7,8,7,7,8,4,4,6,8,8,7,6,8,8,9,2,6,0,0,1,10,8,6,3,3,5,1,10,9,0,7,10,0,10,4,1,10,6,9,3,6,0,0,2,7,0,6,7,2,9,7,7,3,0,1,6,1,10,3]
Output: 5.27778

Example 5:
Input: arr = [4,8,4,10,0,7,1,3,7,8,8,3,4,1,6,2,1,1,8,0,9,8,0,3,9,10,3,10,1,10,7,3,2,1,4,9,10,7,6,4,0,8,5,1,2,1,6,2,5,0,7,10,9,10,3,7,10,5,8,5,7,6,7,6,10,9,5,10,5,5,7,2,10,7,7,8,2,0,1,1]
Output: 5.29167

Constraints:
`20 <= arr.length <= 1000`
`arr.length` is a multiple of `20`.

`0 <= arr[i] <= 105`', false, 'Easy', NULL, 64.7, 
   0, 'https://leetcode.com/problems/mean-of-array-after-removing-some-elements', 229, 16.5, 25.6, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   128, 27, 83, true, '[]'::jsonb, true),
  (1620, 'Coordinate With Maximum Network Quality', 'You are given an array of network towers `towers` and an integer `radius`, where `towers[i] = [xi, yi, qi]` denotes the `ith` network tower with location `(xi, yi)` and quality factor `qi`. All the coordinates are integral coordinates on the X-Y plane, and the distance between two coordinates is the Euclidean distance.

The integer `radius` denotes the maximum distance in which the tower is reachable. The tower is reachable if the distance is less than or equal to `radius`. Outside that distance, the signal becomes garbled, and the tower is not reachable.

The signal quality of the `ith` tower at a coordinate `(x, y)` is calculated with the formula `⌊qi / (1 + d)⌋`, where `d` is the distance between the tower and the coordinate. The network quality at a coordinate is the sum of the signal qualities from all the reachable towers.

Return the integral coordinate where the network quality is maximum. If there are multiple coordinates with the same network quality, return the lexicographically minimum coordinate.

Note:
A coordinate `(x1, y1)` is lexicographically smaller than `(x2, y2)` if either `x1 < x2` or `x1 == x2` and `y1 < y2`.

`⌊val⌋` is the greatest integer less than or equal to `val` (the floor function).


Example 1:
Input: towers = [[1,2,5],[2,1,7],[3,1,9]], radius = 2
Output: [2,1]
Explanation: 
At coordinate (2, 1) the total quality is 13
- Quality of 7 from (2, 1) results in ⌊7 / (1 + sqrt(0)⌋ = ⌊7⌋ = 7
- Quality of 5 from (1, 2) results in ⌊5 / (1 + sqrt(2)⌋ = ⌊2.07⌋ = 2
- Quality of 9 from (3, 1) results in ⌊9 / (1 + sqrt(1)⌋ = ⌊4.5⌋ = 4
No other coordinate has higher quality.


Example 2:
Input: towers = [[23,11,21]], radius = 9
Output: [23,11]

Example 3:
Input: towers = [[1,2,13],[2,1,7],[0,1,9]], radius = 2
Output: [1,2]

Example 4:
Input: towers = [[2,1,9],[0,1,9]], radius = 2
Output: [0,1]
Explanation: Both (0, 1) and (2, 1) are optimal in terms of quality but (0, 1) is lexicograpically minimal.


Constraints:
`1 <= towers.length <= 50`
`towers[i].length == 3`
`0 <= xi, yi, qi <= 50`
`1 <= radius <= 50`', false, 'Medium', NULL, 37.1, 
   0, 'https://leetcode.com/problems/coordinate-with-maximum-network-quality', 75, 5, 13.4, '["peak6"]'::jsonb, '["Greedy"]'::jsonb, 
   43, 149, 22, false, '[]'::jsonb, true),
  (1621, 'Number of Sets of K Non-Overlapping Line Segments', 'Given `n` points on a 1-D plane, where the `ith` point (from `0` to `n-1`) is at `x = i`, find the number of ways we can draw exactly `k` non-overlapping line segments such that each segment covers two or more points. The endpoints of each segment must have integral coordinates. The `k` line segments do not have to cover all `n` points, and they are allowed to share endpoints.

Return the number of ways we can draw `k` non-overlapping line segments. Since this number can be huge, return it modulo `109 + 7`.


Example 1:
Input: n = 4, k = 2
Output: 5
Explanation: 
The two line segments are shown in red and blue.

The image above shows the 5 different ways {(0,2),(2,3)}, {(0,1),(1,3)}, {(0,1),(2,3)}, {(1,2),(2,3)}, {(0,1),(1,2)}.


Example 2:
Input: n = 3, k = 1
Output: 3
Explanation: The 3 ways are {(0,1)}, {(0,2)}, {(1,2)}.


Example 3:
Input: n = 30, k = 7
Output: 796297179
Explanation: The total number of possible ways to draw 7 line segments is 3796297200. Taking this number modulo 109 + 7 gives us 796297179.


Example 4:
Input: n = 5, k = 3
Output: 7

Example 5:
Input: n = 3, k = 2
Output: 1

Constraints:
`2 <= n <= 1000`
`1 <= k <= n-1`', false, 'Medium', NULL, 41.4, 
   0, 'https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments', 84, 4.4, 10.5, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   192, 21, 90, true, '[]'::jsonb, true),
  (1622, 'Fancy Sequence', 'Write an API that generates fancy sequences using the `append`, `addAll`, and `multAll` operations.

Implement the `Fancy` class:
`Fancy()` Initializes the object with an empty sequence.

`void append(val)` Appends an integer `val` to the end of the sequence.

`void addAll(inc)` Increments all existing values in the sequence by an integer `inc`.

`void multAll(m)` Multiplies all existing values in the sequence by an integer `m`.

`int getIndex(idx)` Gets the current value at index `idx` (0-indexed) of the sequence modulo `109 + 7`. If the index is greater or equal than the length of the sequence, return `-1`.


Example 1:
Input
["Fancy", "append", "addAll", "append", "multAll", "getIndex", "addAll", "append", "multAll", "getIndex", "getIndex", "getIndex"]
[[], [2], [3], [7], [2], [0], [3], [10], [2], [0], [1], [2]]
Output
[null, null, null, null, null, 10, null, null, null, 26, 34, 20]
Explanation
Fancy fancy = new Fancy();
fancy.append(2);   // fancy sequence: [2]
fancy.addAll(3);   // fancy sequence: [2+3] -> [5]
fancy.append(7);   // fancy sequence: [5, 7]
fancy.multAll(2);  // fancy sequence: [5*2, 7*2] -> [10, 14]
fancy.getIndex(0); // return 10
fancy.addAll(3);   // fancy sequence: [10+3, 14+3] -> [13, 17]
fancy.append(10);  // fancy sequence: [13, 17, 10]
fancy.multAll(2);  // fancy sequence: [13*2, 17*2, 10*2] -> [26, 34, 20]
fancy.getIndex(0); // return 26
fancy.getIndex(1); // return 34
fancy.getIndex(2); // return 20

Constraints:
`1 <= val, inc, m <= 100`
`0 <= idx <= 105`
At most `105` calls total will be made to `append`, `addAll`, `multAll`, and `getIndex`.', false, 'Hard', NULL, 15, 
   12.3, 'https://leetcode.com/problems/fancy-sequence', 70, 3.8, 25.3, '["Google"]'::jsonb, '["Math,Design"]'::jsonb, 
   166, 53, 76, true, '[]'::jsonb, true),
  (1623, 'All Valid Triplets That Can Represent a Country', 'SQL Schema', true, 'Easy', NULL, 89, 
   1.3, 'https://leetcode.com/problems/all-valid-triplets-that-can-represent-a-country', 62, 6.2, 6.9, '["Amazon"]'::jsonb, '[]'::jsonb, 
   28, 39, 42, true, '[]'::jsonb, true),
  (1624, 'Largest Substring Between Two Equal Characters', 'Given a string `s`, return the length of the longest substring between two equal characters, excluding the two characters. If there is no such substring return `-1`.

A substring is a contiguous sequence of characters within a string.


Example 1:
Input: s = "aa"
Output: 0
Explanation: The optimal substring here is an empty substring between the two `''a''s`.


Example 2:
Input: s = "abca"
Output: 2
Explanation: The optimal substring here is "bc".


Example 3:
Input: s = "cbzxy"
Output: -1
Explanation: There are no characters that appear twice in s.


Example 4:
Input: s = "cabbac"
Output: 4
Explanation: The optimal substring here is "abba". Other non-optimal substrings include "bb" and "".


Constraints:
`1 <= s.length <= 300`
`s` contains only lowercase English letters.', false, 'Easy', NULL, 58.6, 
   2.2, 'https://leetcode.com/problems/largest-substring-between-two-equal-characters', 299, 18.9, 32.3, '[]'::jsonb, '[]'::jsonb, 
   201, 13, 94, false, '[]'::jsonb, true),
  (1625, 'Lexicographically Smallest String After Applying Operations', 'You are given a string `s` of even length consisting of digits from `0` to `9`, and two integers `a` and `b`.

You can apply either of the following two operations any number of times and in any order on `s`:
Add `a` to all odd indices of `s` (0-indexed). Digits post `9` are cycled back to `0`. For example, if `s = "3456"` and `a = 5`, `s` becomes `"3951"`.

Rotate `s` to the right by `b` positions. For example, if `s = "3456"` and `b = 1`, `s` becomes `"6345"`.

Return the lexicographically smallest string you can obtain by applying the above operations any number of times on `s`.

A string `a` is lexicographically smaller than a string `b` (of the same length) if in the first position where `a` and `b` differ, string `a` has a letter that appears earlier in the alphabet than the corresponding letter in `b`. For example, `"0158"` is lexicographically smaller than `"0190"` because the first position they differ is at the third letter, and `''5''` comes before `''9''`.


Example 1:
Input: s = "5525", a = 9, b = 2
Output: "2050"
Explanation: We can apply the following operations:
Start:  "5525"
Rotate: "2555"
Add:    "2454"
Add:    "2353"
Rotate: "5323"
Add:    "5222"
​​​​​​​Add:    "5121"
​​​​​​​Rotate: "2151"
​​​​​​​Add:    "2050"​​​​​​​​​​​​
There is no way to obtain a string that is lexicographically smaller then "2050".


Example 2:
Input: s = "74", a = 5, b = 1
Output: "24"
Explanation: We can apply the following operations:
Start:  "74"
Rotate: "47"
​​​​​​​Add:    "42"
​​​​​​​Rotate: "24"​​​​​​​​​​​​
There is no way to obtain a string that is lexicographically smaller then "24".


Example 3:
Input: s = "0011", a = 4, b = 2
Output: "0011"
Explanation: There are no sequence of operations that will give us a lexicographically smaller string than "0011".


Example 4:
Input: s = "43987654", a = 7, b = 3
Output: "00553311"

Constraints:
`2 <= s.length <= 100`
`s.length` is even.

`s` consists of digits from `0` to `9` only.

`1 <= a <= 9`
`1 <= b <= s.length - 1`', false, 'Medium', NULL, 64.3, 
   7.4, 'https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations', 121, 7.2, 11.2, '["JP Morgan,JPMorgan"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   139, 183, 43, false, '[]'::jsonb, true),
  (1626, 'Best Team With No Conflicts', 'You are the manager of a basketball team. For the upcoming tournament, you want to choose the team with the highest overall score. The score of the team is the sum of scores of all the players in the team.

However, the basketball team is not allowed to have conflicts. A conflict exists if a younger player has a strictly higher score than an older player. A conflict does not occur between players of the same age.

Given two lists, `scores` and `ages`, where each `scores[i]` and `ages[i]` represents the score and age of the `ith` player, respectively, return the highest overall score of all possible basketball teams.


Example 1:
Input: scores = [1,3,5,10,15], ages = [1,2,3,4,5]
Output: 34
Explanation: You can choose all the players.


Example 2:
Input: scores = [4,5,6,5], ages = [2,1,2,1]
Output: 16
Explanation: It is best to choose the last 3 players. Notice that you are allowed to choose multiple people of the same age.


Example 3:
Input: scores = [1,2,3,5], ages = [8,9,10,1]
Output: 6
Explanation: It is best to choose the first 3 players. 

Constraints:
`1 <= scores.length, ages.length <= 1000`
`scores.length == ages.length`
`1 <= scores[i] <= 106`
`1 <= ages[i] <= 1000`', false, 'Medium', NULL, 38.4, 
   17.7, 'https://leetcode.com/problems/best-team-with-no-conflicts', 127, 10.5, 27.4, '["Uber"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   411, 18, 96, false, '[]'::jsonb, true),
  (1627, 'Graph Connectivity With Threshold', 'We have `n` cities labeled from `1` to `n`. Two different cities with labels `x` and `y` are directly connected by a bidirectional road if and only if `x` and `y` share a common divisor strictly greater than some `threshold`. More formally, cities with labels `x` and `y` have a road between them if there exists an integer `z` such that all of the following are true:
`x % z == 0`,
`y % z == 0`, and
`z > threshold`.

Given the two integers, `n` and `threshold`, and an array of `queries`, you must determine for each `queries[i] = [ai, bi]` if cities `ai` and `bi` are connected directly or indirectly. (i.e. there is some path between them).

Return an array `answer`, where `answer.length == queries.length` and `answer[i]` is `true` if for the `ith` query, there is a path between `ai` and `bi`, or `answer[i]` is `false` if there is no path.


Example 1:
Input: n = 6, threshold = 2, queries = [[1,4],[2,5],[3,6]]
Output: [false,false,true]
Explanation: The divisors for each number:
1:   1
2:   1, 2
3:   1, 3
4:   1, 2, 4
5:   1, 5
6:   1, 2, 3, 6
Using the underlined divisors above the threshold, only cities 3 and 6 share a common divisor, so they are the
only ones directly connected. The result of each query:
[1,4]   1 is not connected to 4
[2,5]   2 is not connected to 5
[3,6]   3 is connected to 6 through path 3--6

Example 2:
Input: n = 6, threshold = 0, queries = [[4,5],[3,4],[3,2],[2,6],[1,3]]
Output: [true,true,true,true,true]
Explanation: The divisors for each number are the same as the previous example. However, since the threshold is 0,
all divisors can be used. Since all numbers share 1 as a divisor, all cities are connected.


Example 3:
Input: n = 5, threshold = 1, queries = [[4,5],[4,5],[3,2],[2,3],[3,4]]
Output: [false,false,false,false,false]
Explanation: Only cities 2 and 4 share a common divisor 2 which is strictly greater than the threshold 1, so they are the only ones directly connected.

Please notice that there can be multiple queries for the same pair of nodes [x, y], and that the query [x, y] is equivalent to the query [y, x].


Constraints:
`2 <= n <= 104`
`0 <= threshold <= n`
`1 <= queries.length <= 105`
`queries[i].length == 2`
`1 <= ai, bi <= cities`
`ai != bi`', false, 'Hard', NULL, 40.2, 
   16.2, 'https://leetcode.com/problems/graph-connectivity-with-threshold', 92, 6.1, 15.1, '["Trexquant"]'::jsonb, '["Math,Union Find"]'::jsonb, 
   163, 20, 89, false, '[]'::jsonb, true),
  (1628, 'Design an Expression Tree With Evaluate Function', 'Given the `postfix` tokens of an arithmetic expression, build and return the binary expression tree that represents this expression.

Postfix notation is a notation for writing arithmetic expressions in which the operands (numbers) appear before their operators. For example, the postfix tokens of the expression `4*(5-(7+2))` are represented in the array `postfix = ["4","5","7","2","+","-","*"]`.

The class `Node` is an interface you should use to implement the binary expression tree. The returned tree will be tested using the `evaluate` function, which is supposed to evaluate the tree''s value. You should not remove the `Node` class; however, you can modify it as you wish, and you can define other classes to implement it if needed.

A binary expression tree is a kind of binary tree used to represent arithmetic expressions. Each node of a binary expression tree has either zero or two children. Leaf nodes (nodes with 0 children) correspond to operands (numbers), and internal nodes (nodes with two children) correspond to the operators `''+''` (addition), `''-''` (subtraction), `''*''` (multiplication), and `''/''` (division).

It''s guaranteed that no subtree will yield a value that exceeds `109` in absolute value, and all the operations are valid (i.e., no division by zero).

Follow up: Could you design the expression tree such that it is more modular? For example, is your design able to support additional operators without making changes to your existing `evaluate` implementation?

Example 1:
Input: s = ["3","4","+","2","*","7","/"]
Output: 2
Explanation: this expression evaluates to the above binary tree with expression (`(3+4)*2)/7) = 14/7 = 2.`

Example 2:
Input: s = ["4","5","7","2","+","-","*"]
Output: -16
Explanation: this expression evaluates to the above binary tree with expression 4*(5-`(2+7)) = 4*(-4) = -16.`

Example 3:
Input: s = ["4","2","+","3","5","1","-","*","+"]
Output: 18

Example 4:
Input: s = ["100","200","+","2","/","5","*","7","+"]
Output: 757

Constraints:
`1 <= s.length < 100`
`s.length` is odd.

`s` consists of numbers and the characters `''+''`, `''-''`, `''*''`, and `''/''`.

If `s[i]` is a number, its integer representation is no more than `105`.

It is guaranteed that `s` is a valid expression.

The absolute value of the result and intermediate values will not exceed `109`.

It is guaranteed that no expression will include division by zero.', true, 'Medium', NULL, 79.4, 
   27.5, 'https://leetcode.com/problems/design-an-expression-tree-with-evaluate-function', 64, 3.3, 4.1, '["Amazon"]'::jsonb, '["Tree,Design,OOP"]'::jsonb, 
   95, 17, 85, true, '[]'::jsonb, true),
  (1629, 'Slowest Key', 'A newly designed keypad was tested, where a tester pressed a sequence of `n` keys, one at a time.

You are given a string `keysPressed` of length `n`, where `keysPressed[i]` was the `ith` key pressed in the testing sequence, and a sorted list `releaseTimes`, where `releaseTimes[i]` was the time the `ith` key was released. Both arrays are 0-indexed. The `0th` key was pressed at the time `0`, and every subsequent key was pressed at the exact time the previous key was released.

The tester wants to know the key of the keypress that had the longest duration. The `ith` keypress had a duration of `releaseTimes[i] - releaseTimes[i - 1]`, and the `0th` keypress had a duration of `releaseTimes[0]`.

Note that the same key could have been pressed multiple times during the test, and these multiple presses of the same key may not have had the same duration.

Return the key of the keypress that had the longest duration. If there are multiple such keypresses, return the lexicographically largest key of the keypresses.


Example 1:
Input: releaseTimes = [9,29,49,50], keysPressed = "cbcd"
Output: "c"
Explanation: The keypresses were as follows:
Keypress for ''c'' had a duration of 9 (pressed at time 0 and released at time 9).

Keypress for ''b'' had a duration of 29 - 9 = 20 (pressed at time 9 right after the release of the previous character and released at time 29).

Keypress for ''c'' had a duration of 49 - 29 = 20 (pressed at time 29 right after the release of the previous character and released at time 49).

Keypress for ''d'' had a duration of 50 - 49 = 1 (pressed at time 49 right after the release of the previous character and released at time 50).

The longest of these was the keypress for ''b'' and the second keypress for ''c'', both with duration 20.

''c'' is lexicographically larger than ''b'', so the answer is ''c''.


Example 2:
Input: releaseTimes = [12,23,36,46,62], keysPressed = "spuda"
Output: "a"
Explanation: The keypresses were as follows:
Keypress for ''s'' had a duration of 12.

Keypress for ''p'' had a duration of 23 - 12 = 11.

Keypress for ''u'' had a duration of 36 - 23 = 13.

Keypress for ''d'' had a duration of 46 - 36 = 10.

Keypress for ''a'' had a duration of 62 - 46 = 16.

The longest of these was the keypress for ''a'' with duration 16.


Constraints:
`releaseTimes.length == n`
`keysPressed.length == n`
`2 <= n <= 1000`
`1 <= releaseTimes[i] <= 109`
`releaseTimes[i] < releaseTimes[i+1]`
`keysPressed` contains only lowercase English letters.', false, 'Easy', NULL, 59.1, 
   36.5, 'https://leetcode.com/problems/slowest-key', 289, 27.9, 47.2, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   190, 35, 84, true, '[]'::jsonb, true),
  (1630, 'Arithmetic Subarrays', 'A sequence of numbers is called arithmetic if it consists of at least two elements, and the difference between every two consecutive elements is the same. More formally, a sequence `s` is arithmetic if and only if `s[i+1] - s[i] == s[1] - s[0] `for all valid `i`.

For example, these are arithmetic sequences:
1, 3, 5, 7, 9
7, 7, 7, 7
3, -1, -5, -9
The following sequence is not arithmetic:
1, 1, 2, 5, 7
You are given an array of `n` integers, `nums`, and two arrays of `m` integers each, `l` and `r`, representing the `m` range queries, where the `ith` query is the range `[l[i], r[i]]`. All the arrays are 0-indexed.

Return a list of `boolean` elements `answer`, where `answer[i]` is `true` if the subarray `nums[l[i]], nums[l[i]+1], ... , nums[r[i]]` can be rearranged to form an arithmetic sequence, and `false` otherwise.


Example 1:
Input: nums = `[4,6,5,9,3,7]`, l = `[0,0,2]`, r = `[2,3,5]`
Output: `[true,false,true]`
Explanation:
In the 0th query, the subarray is [4,6,5]. This can be rearranged as [6,5,4], which is an arithmetic sequence.

In the 1st query, the subarray is [4,6,5,9]. This cannot be rearranged as an arithmetic sequence.

In the 2nd query, the subarray is `[5,9,3,7]. This` can be rearranged as `[3,5,7,9]`, which is an arithmetic sequence.


Example 2:
Input: nums = [-12,-9,-3,-12,-6,15,20,-25,-20,-15,-10], l = [0,1,6,4,8,7], r = [4,4,9,7,9,10]
Output: [false,true,false,false,true,true]

Constraints:
`n == nums.length`
`m == l.length`
`m == r.length`
`2 <= n <= 500`
`1 <= m <= 500`
`0 <= l[i] < r[i] < n`
`-105 <= nums[i] <= 105`', false, 'Medium', NULL, 77.7, 
   0, 'https://leetcode.com/problems/arithmetic-subarrays', 203, 15.7, 20.2, '["Google"]'::jsonb, '["Sort"]'::jsonb, 
   202, 28, 88, true, '[]'::jsonb, true),
  (1631, 'Path With Minimum Effort', 'You are a hiker preparing for an upcoming hike. You are given `heights`, a 2D array of size `rows x columns`, where `heights[row][col]` represents the height of cell `(row, col)`. You are situated in the top-left cell, `(0, 0)`, and you hope to travel to the bottom-right cell, `(rows-1, columns-1)` (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

A route''s effort is the maximum absolute difference in heights between two consecutive cells of the route.

Return the minimum effort required to travel from the top-left cell to the bottom-right cell.


Example 1:
Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.

This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.


Example 2:
Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
Output: 1
Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].


Example 3:
Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
Output: 0
Explanation: This route does not require any effort.


Constraints:
`rows == heights.length`
`columns == heights[i].length`
`1 <= rows, columns <= 100`
`1 <= heights[i][j] <= 106`', false, 'Medium', '/articles/path-with-minimum-effort', 50, 
   30.2, 'https://leetcode.com/problems/path-with-minimum-effort', 279, 37.5, 75, '["Google,Houzz,ByteDance"]'::jsonb, '["Binary Search,Depth-first Search,Union Find,Graph"]'::jsonb, 
   1027, 48, 96, true, '[]'::jsonb, true),
  (1632, 'Rank Transform of a Matrix', 'Given an `m x n` `matrix`, return a new matrix `answer` where `answer[row][col]` is the rank of `matrix[row][col]`.

The rank is an integer that represents how large an element is compared to other elements. It is calculated using the following rules:
The rank is an integer starting from `1`.

If two elements `p` and `q` are in the same row or column, then:
	
If `p < q` then `rank(p) < rank(q)`
If `p == q` then `rank(p) == rank(q)`
If `p > q` then `rank(p) > rank(q)`
The rank should be as small as possible.

It is guaranteed that `answer` is unique under the given rules.


Example 1:
Input: matrix = [[1,2],[3,4]]
Output: [[1,2],[2,3]]
Explanation:
The rank of matrix[0][0] is 1 because it is the smallest integer in its row and column.

The rank of matrix[0][1] is 2 because matrix[0][1] > matrix[0][0] and matrix[0][0] is rank 1.

The rank of matrix[1][0] is 2 because matrix[1][0] > matrix[0][0] and matrix[0][0] is rank 1.

The rank of matrix[1][1] is 3 because matrix[1][1] > matrix[0][1], matrix[1][1] > matrix[1][0], and both matrix[0][1] and matrix[1][0] are rank 2.


Example 2:
Input: matrix = [[7,7],[7,7]]
Output: [[1,1],[1,1]]

Example 3:
Input: matrix = [[20,-21,14],[-19,4,19],[22,-47,24],[-19,4,19]]
Output: [[4,2,3],[1,3,4],[5,1,6],[1,3,4]]

Example 4:
Input: matrix = [[7,3,6],[1,4,5],[9,8,2]]
Output: [[5,1,4],[1,2,3],[6,3,1]]

Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 500`
`-109 <= matrix[row][col] <= 109`', false, 'Hard', '/articles/rank-transform-of-a-matrix', 31.9, 
   5.8, 'https://leetcode.com/problems/rank-transform-of-a-matrix', 45, 3.6, 11.1, '["Google"]'::jsonb, '["Greedy,Union Find"]'::jsonb, 
   193, 6, 97, true, '[]'::jsonb, true),
  (1633, 'Percentage of Users Attended a Contest', 'SQL Schema', true, 'Easy', NULL, 71.3, 
   0, 'https://leetcode.com/problems/percentage-of-users-attended-a-contest', 57, 4.9, 6.8, '[]'::jsonb, '[]'::jsonb, 
   18, 4, 82, false, '[]'::jsonb, true),
  (1634, 'Add Two Polynomials Represented as Linked Lists', 'A polynomial linked list is a special type of linked list where every node represents a term in a polynomial expression.

Each node has three attributes:
`coefficient`: an integer representing the number multiplier of the term. The coefficient of the term `9x4` is `9`.

`power`: an integer representing the exponent. The power of the term `9x4` is `4`.

`next`: a pointer to the next node in the list, or `null` if it is the last node of the list.

For example, the polynomial `5x3 + 4x - 7` is represented by the polynomial linked list illustrated below:
The polynomial linked list must be in its standard form: the polynomial must be in strictly descending order by its `power` value. Also, terms with a `coefficient` of `0` are omitted.

Given two polynomial linked list heads, `poly1` and `poly2`, add the polynomials together and return the head of the sum of the polynomials.

`PolyNode` format:
The input/output format is as a list of `n` nodes, where each node is represented as its `[coefficient, power]`. For example, the polynomial `5x3 + 4x - 7` would be represented as: `[[5,3],[4,1],[-7,0]]`.


Example 1:
Input: poly1 = [[1,1]], poly2 = [[1,0]]
Output: [[1,1],[1,0]]
Explanation: poly1 = x. poly2 = 1. The sum is x + 1.


Example 2:
Input: poly1 = [[2,2],[4,1],[3,0]], poly2 = [[3,2],[-4,1],[-1,0]]
Output: [[5,2],[2,0]]
Explanation: poly1 = 2x2 + 4x + 3. poly2 = 3x2 - 4x - 1. The sum is 5x2 + 2. Notice that we omit the "0x" term.


Example 3:
Input: poly1 = [[1,2]], poly2 = [[-1,2]]
Output: []
Explanation: The sum is 0. We return an empty list.


Constraints:
`0 <= n <= 104`
`-109 <= PolyNode.coefficient <= 109`
`PolyNode.coefficient != 0`
`0 <= PolyNode.power <= 109`
`PolyNode.power > PolyNode.next.power`', true, 'Medium', NULL, 54.2, 
   12, 'https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists', 54, 2, 3.8, '["Amazon"]'::jsonb, '["Linked List"]'::jsonb, 
   38, 2, 95, true, '[]'::jsonb, true),
  (1635, 'Hopper Company Queries I', 'SQL Schema', true, 'Hard', NULL, 56.2, 
   3.4, 'https://leetcode.com/problems/hopper-company-queries-i', 83, 2.1, 3.8, '["Uber"]'::jsonb, '[]'::jsonb, 
   26, 11, 70, false, '[]'::jsonb, true),
  (1636, 'Sort Array by Increasing Frequency', 'Given an array of integers `nums`, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.

Return the sorted array.


Example 1:
Input: nums = [1,1,2,2,2,3]
Output: [3,1,1,2,2,2]
Explanation: ''3'' has a frequency of 1, ''1'' has a frequency of 2, and ''2'' has a frequency of 3.


Example 2:
Input: nums = [2,3,1,3,2]
Output: [1,3,3,2,2]
Explanation: ''2'' and ''3'' both have a frequency of 2, so they are sorted in decreasing order.


Example 3:
Input: nums = [-1,1,-6,4,5,-6,1,4,1]
Output: [5,-1,4,4,-6,-6,1,1,1]

Constraints:
`1 <= nums.length <= 100`
`-100 <= nums[i] <= 100`', false, 'Easy', NULL, 66.7, 
   23, 'https://leetcode.com/problems/sort-array-by-increasing-frequency', 315, 20.8, 31.2, '["Twilio,Amazon,eBay"]'::jsonb, '["Array,Sort"]'::jsonb, 
   388, 18, 96, true, '[]'::jsonb, true),
  (1637, 'Widest Vertical Area Between Two Points Containing No Points', 'Given `n` `points` on a 2D plane where `points[i] = [xi, yi]`, Return the widest vertical area between two points such that no points are inside the area.

A vertical area is an area of fixed-width extending infinitely along the y-axis (i.e., infinite height). The widest vertical area is the one with the maximum width.

Note that points on the edge of a vertical area are not considered included in the area.


Example 1:
​
Input: points = [[8,7],[9,9],[7,4],[9,7]]
Output: 1
Explanation: Both the red and the blue area are optimal.


Example 2:
Input: points = [[3,1],[9,0],[1,0],[1,4],[5,3],[8,8]]
Output: 3

Constraints:
`n == points.length`
`2 <= n <= 105`
`points[i].length == 2`
`0 <= xi, yi <= 109`', false, 'Medium', NULL, 83.6, 
   7.9, 'https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points', 185, 14.6, 17.5, '["Microsoft"]'::jsonb, '["Sort"]'::jsonb, 
   69, 228, 23, false, '[]'::jsonb, true),
  (1638, 'Count Substrings That Differ by One Character', 'Given two strings `s` and `t`, find the number of ways you can choose a non-empty substring of `s` and replace a single character by a different character such that the resulting substring is a substring of `t`. In other words, find the number of substrings in `s` that differ from some substring in `t` by exactly one character.

For example, the underlined substrings in `"computer"` and `"computation"` only differ by the `''e''`/`''a''`, so this is a valid way.

Return the number of substrings that satisfy the condition above.

A substring is a contiguous sequence of characters within a string.


Example 1:
Input: s = "aba", t = "baba"
Output: 6
Explanation: The following are the pairs of substrings from s and t that differ by exactly 1 character:
("aba", "baba")
("aba", "baba")
("aba", "baba")
("aba", "baba")
("aba", "baba")
("aba", "baba")
The underlined portions are the substrings that are chosen from s and t.


​​Example 2:
Input: s = "ab", t = "bb"
Output: 3
Explanation: The following are the pairs of substrings from s and t that differ by 1 character:
("ab", "bb")
("ab", "bb")
("ab", "bb")
​​​​The underlined portions are the substrings that are chosen from s and t.


Example 3:
Input: s = "a", t = "a"
Output: 0

Example 4:
Input: s = "abe", t = "bbc"
Output: 10

Constraints:
`1 <= s.length, t.length <= 100`
`s` and `t` consist of lowercase English letters only.', false, 'Medium', NULL, 70.1, 
   8, 'https://leetcode.com/problems/count-substrings-that-differ-by-one-character', 102, 7.8, 11.1, '["Microsoft"]'::jsonb, '["Hash Table,String,Trie,Rolling Hash"]'::jsonb, 
   196, 108, 64, false, '[]'::jsonb, true),
  (1639, 'Number of Ways to Form a Target String Given a Dictionary', 'You are given a list of strings of the same length `words` and a string `target`.

Your task is to form `target` using the given `words` under the following rules:
`target` should be formed from left to right.

To form the `ith` character (0-indexed) of `target`, you can choose the `kth` character of the `jth` string in `words` if `target[i] = words[j][k]`.

Once you use the `kth` character of the `jth` string of `words`, you can no longer use the `xth` character of any string in `words` where `x <= k`. In other words, all characters to the left of or at index `k` become unusuable for every string.

Repeat the process until you form the string `target`.

Notice that you can use multiple characters from the same string in `words` provided the conditions above are met.

Return the number of ways to form `target` from `words`. Since the answer may be too large, return it modulo `109 + 7`.


Example 1:
Input: words = ["acca","bbbb","caca"], target = "aba"
Output: 6
Explanation: There are 6 ways to form target.

"aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("caca")
"aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("caca")
"aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("acca")
"aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("acca")
"aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("acca")
"aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("caca")

Example 2:
Input: words = ["abba","baab"], target = "bab"
Output: 4
Explanation: There are 4 ways to form target.

"bab" -> index 0 ("baab"), index 1 ("baab"), index 2 ("abba")
"bab" -> index 0 ("baab"), index 1 ("baab"), index 3 ("baab")
"bab" -> index 0 ("baab"), index 2 ("baab"), index 3 ("baab")
"bab" -> index 1 ("abba"), index 2 ("baab"), index 3 ("baab")

Example 3:
Input: words = ["abcd"], target = "abcd"
Output: 1

Example 4:
Input: words = ["abab","baba","abba","baab"], target = "abba"
Output: 16

Constraints:
`1 <= words.length <= 1000`
`1 <= words[i].length <= 1000`
All strings in `words` have the same length.

`1 <= target.length <= 1000`
`words[i]` and `target` contain only lowercase English letters.', false, 'Hard', NULL, 40, 
   7.2, 'https://leetcode.com/problems/number-of-ways-to-form-a-target-string-given-a-dictionary', 61, 3.9, 9.7, '["Dunzo"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   129, 7, 95, false, '[]'::jsonb, true),
  (1640, 'Check Array Formation Through Concatenation', 'You are given an array of distinct integers `arr` and an array of integer arrays `pieces`, where the integers in `pieces` are distinct. Your goal is to form `arr` by concatenating the arrays in `pieces` in any order. However, you are not allowed to reorder the integers in each array `pieces[i]`.

Return `true` if it is possible to form the array `arr` from `pieces`. Otherwise, return `false`.


Example 1:
Input: arr = [85], pieces = [[85]]
Output: true

Example 2:
Input: arr = [15,88], pieces = [[88],[15]]
Output: true
Explanation: Concatenate `[15]` then `[88]`

Example 3:
Input: arr = [49,18,16], pieces = [[16,18,49]]
Output: false
Explanation: Even though the numbers match, we cannot reorder pieces[0].


Example 4:
Input: arr = [91,4,64,78], pieces = [[78],[4,64],[91]]
Output: true
Explanation: Concatenate `[91]` then `[4,64]` then `[78]`

Example 5:
Input: arr = [1,3,5,7], pieces = [[2,4,6,8]]
Output: false

Constraints:
`1 <= pieces.length <= arr.length <= 100`
`sum(pieces[i].length) == arr.length`
`1 <= pieces[i].length <= arr.length`
`1 <= arr[i], pieces[i][j] <= 100`
The integers in `arr` are distinct.

The integers in `pieces` are distinct (i.e., If we flatten pieces in a 1D array, all the integers in this array are distinct).', false, 'Easy', '/articles/check-array-formation-through-concatenation', 59.8, 
   14, 'https://leetcode.com/problems/check-array-formation-through-concatenation', 525, 57, 95.4, '["Uber"]'::jsonb, '["Array,Hash Table,Sort"]'::jsonb, 
   451, 89, 84, false, '[]'::jsonb, true),
  (1641, 'Count Sorted Vowel Strings', 'Given an integer `n`, return the number of strings of length `n` that consist only of vowels (`a`, `e`, `i`, `o`, `u`) and are lexicographically sorted.

A string `s` is lexicographically sorted if for all valid `i`, `s[i]` is the same as or comes before `s[i+1]` in the alphabet.


Example 1:
Input: n = 1
Output: 5
Explanation: The 5 sorted strings that consist of vowels only are `["a","e","i","o","u"].`

Example 2:
Input: n = 2
Output: 15
Explanation: The 15 sorted strings that consist of vowels only are
["aa","ae","ai","ao","au","ee","ei","eo","eu","ii","io","iu","oo","ou","uu"].

Note that "ea" is not a valid string since ''e'' comes after ''a'' in the alphabet.


Example 3:
Input: n = 33
Output: 66045

Constraints:
`1 <= n <= 50`', false, 'Medium', '/articles/count-sorted-vowel-strings', 75.8, 
   20.3, 'https://leetcode.com/problems/count-sorted-vowel-strings', 628, 47.8, 63.1, '["Amazon"]'::jsonb, '["Math,Dynamic Programming,Backtracking"]'::jsonb, 
   856, 24, 97, true, '[]'::jsonb, true),
  (1642, 'Furthest Building You Can Reach', 'You are given an integer array `heights` representing the heights of buildings, some `bricks`, and some `ladders`.

You start your journey from building `0` and move to the next building by possibly using bricks or ladders.

While moving from building `i` to building `i+1` (0-indexed),
If the current building''s height is greater than or equal to the next building''s height, you do not need a ladder or bricks.

If the current building''s height is less than the next building''s height, you can either use one ladder or `(h[i+1] - h[i])` bricks.

Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.


Example 1:
Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
Output: 4
Explanation: Starting at building 0, you can follow these steps:
- Go to building 1 without using ladders nor bricks since 4 >= 2.

- Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.

- Go to building 3 without using ladders nor bricks since 7 >= 6.

- Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.

It is impossible to go beyond building 4 because you do not have any more bricks or ladders.


Example 2:
Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
Output: 7

Example 3:
Input: heights = [14,3,19,3], bricks = 17, ladders = 0
Output: 3

Constraints:
`1 <= heights.length <= 105`
`1 <= heights[i] <= 106`
`0 <= bricks <= 109`
`0 <= ladders <= heights.length`', false, 'Medium', '/articles/furthest-building-you-can-reach', 50, 
   29.7, 'https://leetcode.com/problems/furthest-building-you-can-reach', 200, 15.3, 30.7, '["Google"]'::jsonb, '["Binary Search,Heap"]'::jsonb, 
   509, 30, 94, true, '[]'::jsonb, true),
  (1643, 'Kth Smallest Instructions', 'Bob is standing at cell `(0, 0)`, and he wants to reach `destination`: `(row, column)`. He can only travel right and down. You are going to help Bob by providing instructions for him to reach `destination`.

The instructions are represented as a string, where each character is either:
`''H''`, meaning move horizontally (go right), or
`''V''`, meaning move vertically (go down).

Multiple instructions will lead Bob to `destination`. For example, if `destination` is `(2, 3)`, both `"HHHVV"` and `"HVHVH"` are valid instructions.

However, Bob is very picky. Bob has a lucky number `k`, and he wants the `kth` lexicographically smallest instructions that will lead him to `destination`. `k` is 1-indexed.

Given an integer array `destination` and an integer `k`, return the `kth` lexicographically smallest instructions that will take Bob to `destination`.


Example 1:
Input: destination = [2,3], k = 1
Output: "HHHVV"
Explanation: All the instructions that reach (2, 3) in lexicographic order are as follows:
["HHHVV", "HHVHV", "HHVVH", "HVHHV", "HVHVH", "HVVHH", "VHHHV", "VHHVH", "VHVHH", "VVHHH"].


Example 2:
Input: destination = [2,3], k = 2
Output: "HHVHV"

Example 3:
Input: destination = [2,3], k = 3
Output: "HHVVH"

Constraints:
`destination.length == 2`
`1 <= row, column <= 15`
`1 <= k <= nCr(row + column, row)`, where `nCr(a, b)` denotes `a` choose `b`​​​​​.', false, 'Hard', NULL, 44.8, 
   17.8, 'https://leetcode.com/problems/kth-smallest-instructions', 100, 4.9, 11, '["HeavyWater"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   193, 3, 98, false, '[]'::jsonb, true),
  (1644, 'Lowest Common Ancestor of a Binary Tree II', 'Given the `root` of a binary tree, return the lowest common ancestor (LCA) of two given nodes, `p` and `q`. If either node `p` or `q` does not exist in the tree, return `null`. All values of the nodes in the tree are unique.

According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes `p` and `q` in a binary tree `T` is the lowest node that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself)". A descendant of a node `x` is a node `y` that is on the path from node `x` to some leaf node.


Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.


Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5. A node can be a descendant of itself according to the definition of LCA.


Example 3:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 10
Output: null
Explanation: Node 10 does not exist in the tree, so return null.


Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-109 <= Node.val <= 109`
All `Node.val` are unique.

`p != q`
Follow up: Can you find the LCA traversing the tree, without checking nodes existence?', true, 'Medium', NULL, 56.2, 
   15, 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii', 102, 9, 16, '["Microsoft,Facebook"]'::jsonb, '["Tree"]'::jsonb, 
   124, 5, 96, true, '[]'::jsonb, true),
  (1645, 'Hopper Company Queries II', 'SQL Schema', true, 'Hard', NULL, 39.1, 
   0, 'https://leetcode.com/problems/hopper-company-queries-ii', 58, 1.7, 4.3, '["Uber"]'::jsonb, '[]'::jsonb, 
   22, 5, 81, false, '[]'::jsonb, true),
  (1646, 'Get Maximum in Generated Array', 'You are given an integer `n`. An array `nums` of length `n + 1` is generated in the following way:
`nums[0] = 0`
`nums[1] = 1`
`nums[2 * i] = nums[i]` when `2 <= 2 * i <= n`
`nums[2 * i + 1] = nums[i] + nums[i + 1]` when `2 <= 2 * i + 1 <= n`
Return the maximum integer in the array `nums`​​​.


Example 1:
Input: n = 7
Output: 3
Explanation: According to the given rules:
  nums[0] = 0
  nums[1] = 1
  nums[(1 * 2) = 2] = nums[1] = 1
  nums[(1 * 2) + 1 = 3] = nums[1] + nums[2] = 1 + 1 = 2
  nums[(2 * 2) = 4] = nums[2] = 1
  nums[(2 * 2) + 1 = 5] = nums[2] + nums[3] = 1 + 2 = 3
  nums[(3 * 2) = 6] = nums[3] = 2
  nums[(3 * 2) + 1 = 7] = nums[3] + nums[4] = 2 + 1 = 3
Hence, nums = [0,1,1,2,1,3,2,3], and the maximum is 3.


Example 2:
Input: n = 2
Output: 1
Explanation: According to the given rules, the maximum between nums[0], nums[1], and nums[2] is 1.


Example 3:
Input: n = 3
Output: 2
Explanation: According to the given rules, the maximum between nums[0], nums[1], nums[2], and nums[3] is 2.


Constraints:
`0 <= n <= 100`', false, 'Easy', '/articles/get-maximum-in-generated-array', 53.2, 
   1.3, 'https://leetcode.com/problems/get-maximum-in-generated-array', 311, 32.9, 61.9, '[]'::jsonb, '[]'::jsonb, 
   150, 231, 39, false, '[]'::jsonb, true),
  (1647, 'Minimum Deletions to Make Character Frequencies Unique', 'A string `s` is called good if there are no two different characters in `s` that have the same frequency.

Given a string `s`, return the minimum number of characters you need to delete to make `s` good.

The frequency of a character in a string is the number of times it appears in the string. For example, in the string `"aab"`, the frequency of `''a''` is `2`, while the frequency of `''b''` is `1`.


Example 1:
Input: s = "aab"
Output: 0
Explanation: `s` is already good.


Example 2:
Input: s = "aaabbbcc"
Output: 2
Explanation: You can delete two ''b''s resulting in the good string "aaabcc".

Another way it to delete one ''b'' and one ''c'' resulting in the good string "aaabbc".


Example 3:
Input: s = "ceabaacb"
Output: 2
Explanation: You can delete both ''c''s resulting in the good string "eabaab".

Note that we only care about characters that are still in the string at the end (i.e. frequency of 0 is ignored).


Constraints:
`1 <= s.length <= 105`
`s` contains only lowercase English letters.', false, 'Medium', NULL, 55.1, 
   39.5, 'https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique', 238, 22.2, 40.2, '["Microsoft,Amazon,Apple"]'::jsonb, '["Greedy,Sort"]'::jsonb, 
   345, 12, 97, true, '[]'::jsonb, true),
  (1648, 'Sell Diminishing-Valued Colored Balls', 'You have an `inventory` of different colored balls, and there is a customer that wants `orders` balls of any color.

The customer weirdly values the colored balls. Each colored ball''s value is the number of balls of that color you currently have in your `inventory`. For example, if you own `6` yellow balls, the customer would pay `6` for the first yellow ball. After the transaction, there are only `5` yellow balls left, so the next yellow ball is then valued at `5` (i.e., the value of the balls decreases as you sell more to the customer).

You are given an integer array, `inventory`, where `inventory[i]` represents the number of balls of the `ith` color that you initially own. You are also given an integer `orders`, which represents the total number of balls that the customer wants. You can sell the balls in any order.

Return the maximum total value that you can attain after selling `orders` colored balls. As the answer may be too large, return it modulo `109 + 7`.


Example 1:
Input: inventory = [2,5], orders = 4
Output: 14
Explanation: Sell the 1st color 1 time (2) and the 2nd color 3 times (5 + 4 + 3).

The maximum total value is 2 + 5 + 4 + 3 = 14.


Example 2:
Input: inventory = [3,5], orders = 6
Output: 19
Explanation: Sell the 1st color 2 times (3 + 2) and the 2nd color 4 times (5 + 4 + 3 + 2).

The maximum total value is 3 + 2 + 5 + 4 + 3 + 2 = 19.


Example 3:
Input: inventory = [2,8,4,10,6], orders = 20
Output: 110

Example 4:
Input: inventory = [1000000000], orders = 1000000000
Output: 21
Explanation: Sell the 1st color 1000000000 times for a total value of 500000000500000000. 500000000500000000 modulo 109 + 7 = 21.


Constraints:
`1 <= inventory.length <= 105`
`1 <= inventory[i] <= 109`
`1 <= orders <= min(sum(inventory[i]), 109)`', false, 'Medium', NULL, 30.5, 
   37.1, 'https://leetcode.com/problems/sell-diminishing-valued-colored-balls', 104, 8.1, 26.6, '["Amazon"]'::jsonb, '["Math,Greedy,Sort"]'::jsonb, 
   253, 63, 80, true, '[]'::jsonb, true),
  (1649, 'Create Sorted Array through Instructions', 'Given an integer array `instructions`, you are asked to create a sorted array from the elements in `instructions`. You start with an empty container `nums`. For each element from left to right in `instructions`, insert it into `nums`. The cost of each insertion is the minimum of the following:
The number of elements currently in `nums` that are strictly less than `instructions[i]`.

The number of elements currently in `nums` that are strictly greater than `instructions[i]`.

For example, if inserting element `3` into `nums = [1,2,3,5]`, the cost of insertion is `min(2, 1)` (elements `1` and `2` are less than `3`, element `5` is greater than `3`) and `nums` will become `[1,2,3,3,5]`.

Return the total cost to insert all elements from `instructions` into `nums`. Since the answer may be large, return it modulo `109 + 7`

Example 1:
Input: instructions = [1,5,6,2]
Output: 1
Explanation: Begin with nums = [].

Insert 1 with cost min(0, 0) = 0, now nums = [1].

Insert 5 with cost min(1, 0) = 0, now nums = [1,5].

Insert 6 with cost min(2, 0) = 0, now nums = [1,5,6].

Insert 2 with cost min(1, 2) = 1, now nums = [1,2,5,6].

The total cost is 0 + 0 + 0 + 1 = 1.


Example 2:
Input: instructions = [1,2,3,6,5,4]
Output: 3
Explanation: Begin with nums = [].

Insert 1 with cost min(0, 0) = 0, now nums = [1].

Insert 2 with cost min(1, 0) = 0, now nums = [1,2].

Insert 3 with cost min(2, 0) = 0, now nums = [1,2,3].

Insert 6 with cost min(3, 0) = 0, now nums = [1,2,3,6].

Insert 5 with cost min(3, 1) = 1, now nums = [1,2,3,5,6].

Insert 4 with cost min(3, 2) = 2, now nums = [1,2,3,4,5,6].

The total cost is 0 + 0 + 0 + 0 + 1 + 2 = 3.


Example 3:
Input: instructions = [1,3,3,3,2,4,2,1,2]
Output: 4
Explanation: Begin with nums = [].

Insert 1 with cost min(0, 0) = 0, now nums = [1].

Insert 3 with cost min(1, 0) = 0, now nums = [1,3].

Insert 3 with cost min(1, 0) = 0, now nums = [1,3,3].

Insert 3 with cost min(1, 0) = 0, now nums = [1,3,3,3].

Insert 2 with cost min(1, 3) = 1, now nums = [1,2,3,3,3].

Insert 4 with cost min(5, 0) = 0, now nums = [1,2,3,3,3,4].

​​​​​​​Insert 2 with cost min(1, 4) = 1, now nums = [1,2,2,3,3,3,4].

​​​​​​​Insert 1 with cost min(0, 6) = 0, now nums = [1,1,2,2,3,3,3,4].

​​​​​​​Insert 2 with cost min(2, 4) = 2, now nums = [1,1,2,2,2,3,3,3,4].

The total cost is 0 + 0 + 0 + 0 + 1 + 0 + 1 + 0 + 2 = 4.


Constraints:
`1 <= instructions.length <= 105`
`1 <= instructions[i] <= 105`', false, 'Hard', '/articles/create-sorted-array-through-instructions', 36.5, 
   6.3, 'https://leetcode.com/problems/create-sorted-array-through-instructions', 134, 17.1, 46.7, '["Akuna Capital"]'::jsonb, '["Binary Search,Binary Indexed Tree,Segment Tree,Ordered Map"]'::jsonb, 
   341, 50, 87, false, '[]'::jsonb, true),
  (1650, 'Lowest Common Ancestor of a Binary Tree III', 'Given two nodes of a binary tree `p` and `q`, return their lowest common ancestor (LCA).

Each node will have a reference to its parent node. The definition for `Node` is below:
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
}
According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a tree T is the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)."

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.


Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5 since a node can be a descendant of itself according to the LCA definition.


Example 3:
Input: root = [1,2], p = 1, q = 2
Output: 1

Constraints:
The number of nodes in the tree is in the range `[2, 105]`.

`-109 <= Node.val <= 109`
All `Node.val` are unique.

`p != q`
`p` and `q` exist in the tree.', true, 'Medium', NULL, 76.7, 
   32.1, 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii', 140, 14.9, 19.5, '["Facebook,Microsoft,LinkedIn,Amazon"]'::jsonb, '["Tree"]'::jsonb, 
   149, 6, 96, true, '[]'::jsonb, true),
  (1651, 'Hopper Company Queries III', 'SQL Schema', true, 'Hard', NULL, 67.2, 
   3.8, 'https://leetcode.com/problems/hopper-company-queries-iii', 59, 1.6, 2.4, '["Uber"]'::jsonb, '[]'::jsonb, 
   9, 9, 50, false, '[]'::jsonb, true),
  (1652, 'Defuse the Bomb', 'You have a bomb to defuse, and your time is running out! Your informer will provide you with a circular array `code` of length of `n` and a key `k`.

To decrypt the code, you must replace every number. All the numbers are replaced simultaneously.

If `k > 0`, replace the `ith` number with the sum of the next `k` numbers.

If `k < 0`, replace the `ith` number with the sum of the previous `k` numbers.

If `k == 0`, replace the `ith` number with `0`.

As `code` is circular, the next element of `code[n-1]` is `code[0]`, and the previous element of `code[0]` is `code[n-1]`.

Given the circular array `code` and an integer key `k`, return the decrypted code to defuse the bomb!

Example 1:
Input: code = [5,7,1,4], k = 3
Output: [12,10,16,13]
Explanation: Each number is replaced by the sum of the next 3 numbers. The decrypted code is [7+1+4, 1+4+5, 4+5+7, 5+7+1]. Notice that the numbers wrap around.


Example 2:
Input: code = [1,2,3,4], k = 0
Output: [0,0,0,0]
Explanation: When k is zero, the numbers are replaced by 0. 

Example 3:
Input: code = [2,4,9,3], k = -2
Output: [12,5,6,13]
Explanation: The decrypted code is [3+9, 2+3, 4+2, 9+4]. Notice that the numbers wrap around again. If k is negative, the sum is of the previous numbers.


Constraints:
`n == code.length`
`1 <= n <= 100`
`1 <= code[i] <= 100`
`-(n - 1) <= k <= n - 1`', false, 'Easy', NULL, 61.7, 
   2.3, 'https://leetcode.com/problems/defuse-the-bomb', 254, 13.2, 21.4, '[]'::jsonb, '[]'::jsonb, 
   204, 30, 87, false, '[]'::jsonb, true),
  (1653, 'Minimum Deletions to Make String Balanced', 'You are given a string `s` consisting only of characters `''a''` and `''b''`​​​​.

You can delete any number of characters in `s` to make `s` balanced. `s` is balanced if there is no pair of indices `(i,j)` such that `i < j` and `s[i] = ''b''` and `s[j]= ''a''`.

Return the minimum number of deletions needed to make `s` balanced.


Example 1:
Input: s = "aababbab"
Output: 2
Explanation: You can either:
Delete the characters at 0-indexed positions 2 and 6 ("aababbab" -> "aaabbb"), or
Delete the characters at 0-indexed positions 3 and 6 ("aababbab" -> "aabbbb").


Example 2:
Input: s = "bbaaaaabb"
Output: 2
Explanation: The only solution is to delete the first two characters.


Constraints:
`1 <= s.length <= 105`
`s[i]` is `''a''` or `''b''`​​.', false, 'Medium', NULL, 51.5, 
   16.4, 'https://leetcode.com/problems/minimum-deletions-to-make-string-balanced', 129, 7.9, 15.4, '["Microsoft"]'::jsonb, '["String,Greedy"]'::jsonb, 
   281, 8, 97, false, '[]'::jsonb, true),
  (1654, 'Minimum Jumps to Reach Home', 'A certain bug''s home is on the x-axis at position `x`. Help them get there from position `0`.

The bug jumps according to the following rules:
It can jump exactly `a` positions forward (to the right).

It can jump exactly `b` positions backward (to the left).

It cannot jump backward twice in a row.

It cannot jump to any `forbidden` positions.

The bug may jump forward beyond its home, but it cannot jump to positions numbered with negative integers.

Given an array of integers `forbidden`, where `forbidden[i]` means that the bug cannot jump to the position `forbidden[i]`, and integers `a`, `b`, and `x`, return the minimum number of jumps needed for the bug to reach its home. If there is no possible sequence of jumps that lands the bug on position `x`, return `-1.`

Example 1:
Input: forbidden = [14,4,18,1,15], a = 3, b = 15, x = 9
Output: 3
Explanation: 3 jumps forward (0 -> 3 -> 6 -> 9) will get the bug home.


Example 2:
Input: forbidden = [8,3,16,6,12,20], a = 15, b = 13, x = 11
Output: -1

Example 3:
Input: forbidden = [1,6,2,14,5,17,4], a = 16, b = 9, x = 7
Output: 2
Explanation: One jump forward (0 -> 16) then one jump backward (16 -> 7) will get the bug home.


Constraints:
`1 <= forbidden.length <= 1000`
`1 <= a, b, forbidden[i] <= 2000`
`0 <= x <= 2000`
All the elements in `forbidden` are distinct.

Position `x` is not forbidden.', false, 'Medium', NULL, 25.3, 
   27.9, 'https://leetcode.com/problems/minimum-jumps-to-reach-home', 117, 7.7, 30.4, '[]'::jsonb, '[]'::jsonb, 
   247, 67, 79, false, '[]'::jsonb, true),
  (1655, 'Distribute Repeating Integers', 'You are given an array of `n` integers, `nums`, where there are at most `50` unique values in the array. You are also given an array of `m` customer order quantities, `quantity`, where `quantity[i]` is the amount of integers the `ith` customer ordered. Determine if it is possible to distribute `nums` such that:
The `ith` customer gets exactly `quantity[i]` integers,
The integers the `ith` customer gets are all equal, and
Every customer is satisfied.

Return `true` if it is possible to distribute `nums` according to the above conditions.


Example 1:
Input: nums = [1,2,3,4], quantity = [2]
Output: false
Explanation: The 0th customer cannot be given two different integers.


Example 2:
Input: nums = [1,2,3,3], quantity = [2]
Output: true
Explanation: The 0th customer is given [3,3]. The integers [1,2] are not used.


Example 3:
Input: nums = [1,1,2,2], quantity = [2,2]
Output: true
Explanation: The 0th customer is given [1,1], and the 1st customer is given [2,2].


Example 4:
Input: nums = [1,1,2,3], quantity = [2,2]
Output: false
Explanation: Although the 0th customer could be given [1,1], the 1st customer cannot be satisfied.


Example 5:
Input: nums = [1,1,1,1,1], quantity = [2,3]
Output: true
Explanation: The 0th customer is given [1,1], and the 1st customer is given [1,1,1].


Constraints:
`n == nums.length`
`1 <= n <= 105`
`1 <= nums[i] <= 1000`
`m == quantity.length`
`1 <= m <= 10`
`1 <= quantity[i] <= 105`
There are at most `50` unique values in `nums`.', false, 'Hard', NULL, 40, 
   0, 'https://leetcode.com/problems/distribute-repeating-integers', 54, 4.4, 11, '["Google"]'::jsonb, '["Dynamic Programming,Backtracking"]'::jsonb, 
   115, 11, 91, true, '[]'::jsonb, true),
  (1656, 'Design an Ordered Stream', 'There is a stream of `n` `(idKey, value)` pairs arriving in an arbitrary order, where `idKey` is an integer between `1` and `n` and `value` is a string. No two pairs have the same `id`.

Design a stream that returns the values in increasing order of their IDs by returning a chunk (list) of values after each insertion. The concatenation of all the chunks should result in a list of the sorted values.

Implement the `OrderedStream` class:
`OrderedStream(int n)` Constructs the stream to take `n` values.

`String[] insert(int idKey, String value)` Inserts the pair `(idKey, value)` into the stream, then returns the largest possible chunk of currently inserted values that appear next in the order.


Example:
Input
["OrderedStream", "insert", "insert", "insert", "insert", "insert"]
[[5], [3, "ccccc"], [1, "aaaaa"], [2, "bbbbb"], [5, "eeeee"], [4, "ddddd"]]
Output
[null, [], ["aaaaa"], ["bbbbb", "ccccc"], [], ["ddddd", "eeeee"]]
Explanation
// Note that the values ordered by ID is ["aaaaa", "bbbbb", "ccccc", "ddddd", "eeeee"].

OrderedStream os = new OrderedStream(5);
os.insert(3, "ccccc"); // Inserts (3, "ccccc"), returns [].

os.insert(1, "aaaaa"); // Inserts (1, "aaaaa"), returns ["aaaaa"].

os.insert(2, "bbbbb"); // Inserts (2, "bbbbb"), returns ["bbbbb", "ccccc"].

os.insert(5, "eeeee"); // Inserts (5, "eeeee"), returns [].

os.insert(4, "ddddd"); // Inserts (4, "ddddd"), returns ["ddddd", "eeeee"].

// Concatentating all the chunks returned:
// [] + ["aaaaa"] + ["bbbbb", "ccccc"] + [] + ["ddddd", "eeeee"] = ["aaaaa", "bbbbb", "ccccc", "ddddd", "eeeee"]
// The resulting order is the same as the order above.


Constraints:
`1 <= n <= 1000`
`1 <= id <= n`
`value.length == 5`
`value` consists only of lowercase letters.

Each call to `insert` will have a unique `id.`
Exactly `n` calls will be made to `insert`.', false, 'Easy', NULL, 82.1, 
   14.1, 'https://leetcode.com/problems/design-an-ordered-stream', 183, 16.5, 20.1, '["Bloomberg"]'::jsonb, '["Array,Design"]'::jsonb, 
   88, 651, 12, false, '[]'::jsonb, true),
  (1657, 'Determine if Two Strings Are Close', 'Two strings are considered close if you can attain one from the other using the following operations:
Operation 1: Swap any two existing characters.

	
For example, `abcde -> aecdb`
Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.

	
For example, `aacabb -> bbcbaa` (all `a`''s turn into `b`''s, and all `b`''s turn into `a`''s)
You can use the operations on either string as many times as necessary.

Given two strings, `word1` and `word2`, return `true` if `word1` and `word2` are close, and `false` otherwise.


Example 1:
Input: word1 = "abc", word2 = "bca"
Output: true
Explanation: You can attain word2 from word1 in 2 operations.

Apply Operation 1: "abc" -> "acb"
Apply Operation 1: "acb" -> "bca"

Example 2:
Input: word1 = "a", word2 = "aa"
Output: false
Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.


Example 3:
Input: word1 = "cabbba", word2 = "abbccc"
Output: true
Explanation: You can attain word2 from word1 in 3 operations.

Apply Operation 1: "cabbba" -> "caabbb"
`Apply Operation 2: "`caabbb" -> "baaccc"
Apply Operation 2: "baaccc" -> "abbccc"

Example 4:
Input: word1 = "cabbba", word2 = "aabbss"
Output: false
Explanation: It is impossible to attain word2 from word1, or vice versa, in any amount of operations.


Constraints:
`1 <= word1.length, word2.length <= 105`
`word1` and `word2` contain only lowercase English letters.', false, 'Medium', '/articles/determine-if-two-strings-are-close', 55.3, 
   12, 'https://leetcode.com/problems/determine-if-two-strings-are-close', 313, 31.7, 57.3, '["Postmates"]'::jsonb, '["Greedy"]'::jsonb, 
   416, 27, 94, false, '[]'::jsonb, true),
  (1658, 'Minimum Operations to Reduce X to Zero', 'You are given an integer array `nums` and an integer `x`. In one operation, you can either remove the leftmost or the rightmost element from the array `nums` and subtract its value from `x`. Note that this modifies the array for future operations.

Return the minimum number of operations to reduce `x` to exactly `0` if it''s possible, otherwise, return `-1`.


Example 1:
Input: nums = [1,1,4,2,3], x = 5
Output: 2
Explanation: The optimal solution is to remove the last two elements to reduce x to zero.


Example 2:
Input: nums = [5,6,7,8,9], x = 4
Output: -1

Example 3:
Input: nums = [3,2,20,1,1,3], x = 10
Output: 5
Explanation: The optimal solution is to remove the last three elements and the first two elements (5 operations in total) to reduce x to zero.


Constraints:
`1 <= nums.length <= 105`
`1 <= nums[i] <= 104`
`1 <= x <= 109`', false, 'Medium', '/articles/minimum-operations-to-reduce-x-to-zero', 33.3, 
   17, 'https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero', 265, 31, 93.1, '["Google"]'::jsonb, '["Two Pointers,Binary Search,Greedy,Sliding Window"]'::jsonb, 
   789, 17, 98, true, '[]'::jsonb, true),
  (1659, 'Maximize Grid Happiness', 'You are given four integers, `m`, `n`, `introvertsCount`, and `extrovertsCount`. You have an `m x n` grid, and there are two types of people: introverts and extroverts. There are `introvertsCount` introverts and `extrovertsCount` extroverts.

You should decide how many people you want to live in the grid and assign each of them one grid cell. Note that you do not have to have all the people living in the grid.

The happiness of each person is calculated as follows:
Introverts start with `120` happiness and lose `30` happiness for each neighbor (introvert or extrovert).

Extroverts start with `40` happiness and gain `20` happiness for each neighbor (introvert or extrovert).

Neighbors live in the directly adjacent cells north, east, south, and west of a person''s cell.

The grid happiness is the sum of each person''s happiness. Return the maximum possible grid happiness.


Example 1:
Input: m = 2, n = 3, introvertsCount = 1, extrovertsCount = 2
Output: 240
Explanation: Assume the grid is 1-indexed with coordinates (row, column).

We can put the introvert in cell (1,1) and put the extroverts in cells (1,3) and (2,3).

- Introvert at (1,1) happiness: 120 (starting happiness) - (0 * 30) (0 neighbors) = 120
- Extrovert at (1,3) happiness: 40 (starting happiness) + (1 * 20) (1 neighbor) = 60
- Extrovert at (2,3) happiness: 40 (starting happiness) + (1 * 20) (1 neighbor) = 60
The grid happiness is 120 + 60 + 60 = 240.

The above figure shows the grid in this example with each person''s happiness. The introvert stays in the light green cell while the extroverts live on the light purple cells.


Example 2:
Input: m = 3, n = 1, introvertsCount = 2, extrovertsCount = 1
Output: 260
Explanation: Place the two introverts in (1,1) and (3,1) and the extrovert at (2,1).

- Introvert at (1,1) happiness: 120 (starting happiness) - (1 * 30) (1 neighbor) = 90
- Extrovert at (2,1) happiness: 40 (starting happiness) + (2 * 20) (2 neighbors) = 80
- Introvert at (3,1) happiness: 120 (starting happiness) - (1 * 30) (1 neighbor) = 90
The grid happiness is 90 + 80 + 90 = 260.


Example 3:
Input: m = 2, n = 2, introvertsCount = 4, extrovertsCount = 0
Output: 240

Constraints:
`1 <= m, n <= 5`
`0 <= introvertsCount, extrovertsCount <= min(m * n, 6)`', false, 'Hard', NULL, 35.6, 
   24.3, 'https://leetcode.com/problems/maximize-grid-happiness', 36, 2.5, 7.1, '["Salesforce"]'::jsonb, '["Dynamic Programming,Backtracking"]'::jsonb, 
   128, 42, 75, false, '[]'::jsonb, true),
  (1660, 'Correct a Binary Tree', 'You have a binary tree with a small defect. There is exactly one invalid node where its right child incorrectly points to another node at the same depth but to the invalid node''s right.

Given the root of the binary tree with this defect, `root`, return the root of the binary tree after removing this invalid node and every node underneath it (minus the node it incorrectly points to).

Custom testing:
The test input is read as 3 lines:
`TreeNode root`
`int fromNode` (not available to `correctBinaryTree`)
`int toNode` (not available to `correctBinaryTree`)
After the binary tree rooted at `root` is parsed, the `TreeNode` with value of `fromNode` will have its right child pointer pointing to the `TreeNode` with a value of `toNode`. Then, `root` is passed to `correctBinaryTree`.


Example 1:
Input: root = [1,2,3], fromNode = 2, toNode = 3
Output: [1,null,3]
Explanation: The node with value 2 is invalid, so remove it.


Example 2:
Input: root = [8,3,1,7,null,9,4,2,null,null,null,5,6], fromNode = 7, toNode = 4
Output: [8,3,1,null,null,9,4,null,null,5,6]
Explanation: The node with value 7 is invalid, so remove it and the node underneath it, node 2.


Constraints:
The number of nodes in the tree is in the range `[3, 104]`.

`-109 <= Node.val <= 109`
All `Node.val` are unique.

`fromNode != toNode`
`fromNode` and `toNode` will exist in the tree and will be on the same depth.

`toNode` is to the right of `fromNode`.

`fromNode.right` is `null` in the initial tree from the test data.', true, 'Medium', NULL, 76.4, 
   1.9, 'https://leetcode.com/problems/correct-a-binary-tree', 79, 4, 5.3, '["Google"]'::jsonb, '["Tree"]'::jsonb, 
   72, 9, 89, true, '[]'::jsonb, true),
  (1661, 'Average Time of Process per Machine', 'SQL Schema', true, 'Easy', NULL, 79.4, 
   2.6, 'https://leetcode.com/problems/average-time-of-process-per-machine', 105, 5.7, 7.1, '["Facebook"]'::jsonb, '[]'::jsonb, 
   38, 11, 78, true, '[]'::jsonb, true),
  (1662, 'Check If Two String Arrays are Equivalent', 'Given two string arrays `word1` and `word2`, return `true` if the two arrays represent the same string, and `false` otherwise.

A string is represented by an array if the array elements concatenated in order forms the string.


Example 1:
Input: word1 = ["ab", "c"], word2 = ["a", "bc"]
Output: true
Explanation:
word1 represents string "ab" + "c" -> "abc"
word2 represents string "a" + "bc" -> "abc"
The strings are the same, so return true.


Example 2:
Input: word1 = ["a", "cb"], word2 = ["ab", "c"]
Output: false

Example 3:
Input: word1  = ["abc", "d", "defg"], word2 = ["abcddefg"]
Output: true

Constraints:
`1 <= word1.length, word2.length <= 103`
`1 <= word1[i].length, word2[i].length <= 103`
`1 <= sum(word1[i].length), sum(word2[i].length) <= 103`
`word1[i]` and `word2[i]` consist of lowercase letters.', false, 'Easy', '/articles/check-if-two-string-arrays-are-equivalent', 82.6, 
   7, 'https://leetcode.com/problems/check-if-two-string-arrays-are-equivalent', 728, 77, 93.2, '["Facebook"]'::jsonb, '["String"]'::jsonb, 
   336, 78, 81, true, '[]'::jsonb, true),
  (1663, 'Smallest String With A Given Numeric Value', 'The numeric value of a lowercase character is defined as its position `(1-indexed)` in the alphabet, so the numeric value of `a` is `1`, the numeric value of `b` is `2`, the numeric value of `c` is `3`, and so on.

The numeric value of a string consisting of lowercase characters is defined as the sum of its characters'' numeric values. For example, the numeric value of the string `"abe"` is equal to `1 + 2 + 5 = 8`.

You are given two integers `n` and `k`. Return the lexicographically smallest string with length equal to `n` and numeric value equal to `k`.

Note that a string `x` is lexicographically smaller than string `y` if `x` comes before `y` in dictionary order, that is, either `x` is a prefix of `y`, or if `i` is the first position such that `x[i] != y[i]`, then `x[i]` comes before `y[i]` in alphabetic order.


Example 1:
Input: n = 3, k = 27
Output: "aay"
Explanation: The numeric value of the string is 1 + 1 + 25 = 27, and it is the smallest string with such a value and length equal to 3.


Example 2:
Input: n = 5, k = 73
Output: "aaszz"

Constraints:
`1 <= n <= 105`
`n <= k <= 26 * n`', false, 'Medium', '/articles/smallest-string-with-a-given-numeric-value', 64.4, 
   1.9, 'https://leetcode.com/problems/smallest-string-with-a-given-numeric-value', 367, 31, 48.2, '["Lendingkart"]'::jsonb, '["Greedy"]'::jsonb, 
   390, 10, 98, false, '[]'::jsonb, true),
  (1664, 'Ways to Make a Fair Array', 'You are given an integer array `nums`. You can choose exactly one index (0-indexed) and remove the element. Notice that the index of the elements may change after the removal.

For example, if `nums = [6,1,7,4,1]`:
Choosing to remove index `1` results in `nums = [6,7,4,1]`.

Choosing to remove index `2` results in `nums = [6,1,4,1]`.

Choosing to remove index `4` results in `nums = [6,1,7,4]`.

An array is fair if the sum of the odd-indexed values equals the sum of the even-indexed values.

Return the number of indices that you could choose such that after the removal, `nums` is fair. 

Example 1:
Input: nums = [2,1,6,4]
Output: 1
Explanation:
Remove index 0: [1,6,4] -> Even sum: 1 + 4 = 5. Odd sum: 6. Not fair.

Remove index 1: [2,6,4] -> Even sum: 2 + 4 = 6. Odd sum: 6. Fair.

Remove index 2: [2,1,4] -> Even sum: 2 + 4 = 6. Odd sum: 1. Not fair.

Remove index 3: [2,1,6] -> Even sum: 2 + 6 = 8. Odd sum: 1. Not fair.

There is 1 index that you can remove to make nums fair.


Example 2:
Input: nums = [1,1,1]
Output: 3
Explanation: You can remove any index and the remaining array is fair.


Example 3:
Input: nums = [1,2,3]
Output: 0
Explanation: You cannot make a fair array after removing any index.


Constraints:
`1 <= nums.length <= 105`
`1 <= nums[i] <= 104`', false, 'Medium', NULL, 62.2, 
   11.7, 'https://leetcode.com/problems/ways-to-make-a-fair-array', 248, 13.2, 21.3, '["Microsoft"]'::jsonb, '["Dynamic Programming,Greedy"]'::jsonb, 
   401, 11, 97, false, '[]'::jsonb, true),
  (1665, 'Minimum Initial Energy to Finish Tasks', 'You are given an array `tasks` where `tasks[i] = [actuali, minimumi]`:
`actuali` is the actual amount of energy you spend to finish the `ith` task.

`minimumi` is the minimum amount of energy you require to begin the `ith` task.

For example, if the task is `[10, 12]` and your current energy is `11`, you cannot start this task. However, if your current energy is `13`, you can complete this task, and your energy will be `3` after finishing it.

You can finish the tasks in any order you like.

Return the minimum initial amount of energy you will need to finish all the tasks.


Example 1:
Input: tasks = [[1,2],[2,4],[4,8]]
Output: 8
Explanation:
Starting with 8 energy, we finish the tasks in the following order:
    - 3rd task. Now energy = 8 - 4 = 4.

    - 2nd task. Now energy = 4 - 2 = 2.

    - 1st task. Now energy = 2 - 1 = 1.

Notice that even though we have leftover energy, starting with 7 energy does not work because we cannot do the 3rd task.


Example 2:
Input: tasks = [[1,3],[2,4],[10,11],[10,12],[8,9]]
Output: 32
Explanation:
Starting with 32 energy, we finish the tasks in the following order:
    - 1st task. Now energy = 32 - 1 = 31.

    - 2nd task. Now energy = 31 - 2 = 29.

    - 3rd task. Now energy = 29 - 10 = 19.

    - 4th task. Now energy = 19 - 10 = 9.

    - 5th task. Now energy = 9 - 8 = 1.


Example 3:
Input: tasks = [[1,7],[2,8],[3,9],[4,10],[5,11],[6,12]]
Output: 27
Explanation:
Starting with 27 energy, we finish the tasks in the following order:
    - 5th task. Now energy = 27 - 5 = 22.

    - 2nd task. Now energy = 22 - 2 = 20.

    - 3rd task. Now energy = 20 - 3 = 17.

    - 1st task. Now energy = 17 - 1 = 16.

    - 4th task. Now energy = 16 - 4 = 12.

    - 6th task. Now energy = 12 - 6 = 6.


Constraints:
`1 <= tasks.length <= 105`
`1 <= actual​i <= minimumi <= 104`', false, 'Hard', NULL, 65.1, 
   6.5, 'https://leetcode.com/problems/minimum-initial-energy-to-finish-tasks', 149, 9.1, 14, '["Akuna Capital"]'::jsonb, '["Greedy"]'::jsonb, 
   207, 24, 90, false, '[]'::jsonb, true),
  (1666, 'Change the Root of a Binary Tree', 'Given the `root` of a binary tree and a `leaf` node, reroot the tree so that the `leaf` is the new root.

You can reroot the tree with the following steps for each node `cur` on the path starting from the `leaf` up to the `root`​​​ excluding the root:
If `cur` has a left child, then that child becomes `cur`''s right child.

`cur`''s original parent becomes `cur`''s left child. Note that in this process the original parent''s pointer to `cur` becomes `null`, making it have at most one child.

Return the new root of the rerooted tree.

Note: Ensure that your solution sets the `Node.parent` pointers correctly after rerooting or you will receive "Wrong Answer".


Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], leaf = 7
Output: [7,2,null,5,4,3,6,null,null,null,1,null,null,0,8]

Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], leaf = 0
Output: [0,1,null,3,8,5,null,null,null,6,2,null,null,7,4]

Constraints:
The number of nodes in the tree is in the range `[2, 100]`.

`-109 <= Node.val <= 109`
All `Node.val` are unique.

`leaf` exist in the tree.', true, 'Medium', NULL, 68.5, 
   21.7, 'https://leetcode.com/problems/change-the-root-of-a-binary-tree', 37, 1.3, 1.9, '["Google"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   26, 66, 28, true, '[]'::jsonb, true),
  (1667, 'Fix Names in a Table', 'SQL Schema', true, 'Easy', NULL, 63, 
   2.9, 'https://leetcode.com/problems/fix-names-in-a-table', 49, 4.3, 6.8, '[]'::jsonb, '[]'::jsonb, 
   16, 19, 46, false, '[]'::jsonb, true),
  (1668, 'Maximum Repeating Substring', 'For a string `sequence`, a string `word` is `k`-repeating if `word` concatenated `k` times is a substring of `sequence`. The `word`''s maximum `k`-repeating value is the highest value `k` where `word` is `k`-repeating in `sequence`. If `word` is not a substring of `sequence`, `word`''s maximum `k`-repeating value is `0`.

Given strings `sequence` and `word`, return the maximum `k`-repeating value of `word` in `sequence`.


Example 1:
Input: sequence = "ababc", word = "ab"
Output: 2
Explanation: "abab" is a substring in "ababc".


Example 2:
Input: sequence = "ababc", word = "ba"
Output: 1
Explanation: "ba" is a substring in "ababc". "baba" is not a substring in "ababc".


Example 3:
Input: sequence = "ababc", word = "ac"
Output: 0
Explanation: "ac" is not a substring in "ababc". 

Constraints:
`1 <= sequence.length <= 100`
`1 <= word.length <= 100`
`sequence` and `word` contains only lowercase English letters.', false, 'Easy', NULL, 38.7, 
   8.5, 'https://leetcode.com/problems/maximum-repeating-substring', 211, 11.2, 29, '["Uber"]'::jsonb, '["String"]'::jsonb, 
   150, 44, 77, false, '[]'::jsonb, true),
  (1669, 'Merge In Between Linked Lists', 'You are given two linked lists: `list1` and `list2` of sizes `n` and `m` respectively.

Remove `list1`''s nodes from the `ath` node to the `bth` node, and put `list2` in their place.

The blue edges and nodes in the following figure incidate the result:
Build the result list and return its head.


Example 1:
Input: list1 = [0,1,2,3,4,5], a = 3, b = 4, list2 = [1000000,1000001,1000002]
Output: [0,1,2,1000000,1000001,1000002,5]
Explanation: We remove the nodes 3 and 4 and put the entire list2 in their place. The blue edges and nodes in the above figure indicate the result.


Example 2:
Input: list1 = [0,1,2,3,4,5,6], a = 2, b = 5, list2 = [1000000,1000001,1000002,1000003,1000004]
Output: [0,1,1000000,1000001,1000002,1000003,1000004,6]
Explanation: The blue edges and nodes in the above figure indicate the result.


Constraints:
`3 <= list1.length <= 104`
`1 <= a <= b < list1.length - 1`
`1 <= list2.length <= 104`', false, 'Medium', NULL, 75.7, 
   25.3, 'https://leetcode.com/problems/merge-in-between-linked-lists', 315, 19, 25.1, '["VMware"]'::jsonb, '["Linked List"]'::jsonb, 
   287, 49, 85, false, '[]'::jsonb, true),
  (1670, 'Design Front Middle Back Queue', 'Design a queue that supports `push` and `pop` operations in the front, middle, and back.

Implement the `FrontMiddleBack` class:
`FrontMiddleBack()` Initializes the queue.

`void pushFront(int val)` Adds `val` to the front of the queue.

`void pushMiddle(int val)` Adds `val` to the middle of the queue.

`void pushBack(int val)` Adds `val` to the back of the queue.

`int popFront()` Removes the front element of the queue and returns it. If the queue is empty, return `-1`.

`int popMiddle()` Removes the middle element of the queue and returns it. If the queue is empty, return `-1`.

`int popBack()` Removes the back element of the queue and returns it. If the queue is empty, return `-1`.

Notice that when there are two middle position choices, the operation is performed on the frontmost middle position choice. For example:
Pushing `6` into the middle of `[1, 2, 3, 4, 5]` results in `[1, 2, 6, 3, 4, 5]`.

Popping the middle from `[1, 2, 3, 4, 5, 6]` returns `3` and results in `[1, 2, 4, 5, 6]`.


Example 1:
Input:
["FrontMiddleBackQueue", "pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]
[[], [1], [2], [3], [4], [], [], [], [], []]
Output:
[null, null, null, null, null, 1, 3, 4, 2, -1]
Explanation:
FrontMiddleBackQueue q = new FrontMiddleBackQueue();
q.pushFront(1);   // [1]
q.pushBack(2);    // [1, 2]
q.pushMiddle(3);  // [1, 3, 2]
q.pushMiddle(4);  // [1, 4, 3, 2]
q.popFront();     // return 1 -> [4, 3, 2]
q.popMiddle();    // return 3 -> [4, 2]
q.popMiddle();    // return 4 -> [2]
q.popBack();      // return 2 -> []
q.popFront();     // return -1 -> [] (The queue is empty)

Constraints:
`1 <= val <= 109`
At most `1000` calls will be made to `pushFront`, `pushMiddle`, `pushBack`, `popFront`, `popMiddle`, and `popBack`.', false, 'Medium', NULL, 54.1, 
   6, 'https://leetcode.com/problems/design-front-middle-back-queue', 136, 7.2, 13.2, '["Amazon"]'::jsonb, '["Linked List,Design,Dequeue"]'::jsonb, 
   185, 41, 82, true, '[]'::jsonb, true),
  (1671, 'Minimum Number of Removals to Make Mountain Array', 'You may recall that an array `arr` is a mountain array if and only if:
`arr.length >= 3`
There exists some index `i` (0-indexed) with `0 < i < arr.length - 1` such that:
	
`arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
`arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`
Given an integer array `nums`​​​, return the minimum number of elements to remove to make `nums​​​` a mountain array.


Example 1:
Input: nums = [1,3,1]
Output: 0
Explanation: The array itself is a mountain array so we do not need to remove any elements.


Example 2:
Input: nums = [2,1,1,5,6,2,3,1]
Output: 3
Explanation: One solution is to remove the elements at indices 0, 1, and 5, making the array nums = [1,5,6,3,1].


Example 3:
Input: nums = [4,3,2,1,1,2,3,1]
Output: 4

Example 4:
Input: nums = [1,2,3,4,4,3,2,1]
Output: 1

Constraints:
`3 <= nums.length <= 1000`
`1 <= nums[i] <= 109`
It is guaranteed that you can make a mountain array out of `nums`.', false, 'Hard', NULL, 45.4, 
   13.4, 'https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array', 112, 5.4, 12, '["Microsoft"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   257, 4, 98, false, '[]'::jsonb, true),
  (1672, 'Richest Customer Wealth', 'You are given an `m x n` integer grid `accounts` where `accounts[i][j]` is the amount of money the `i​​​​​​​​​​​th​​​​` customer has in the `j​​​​​​​​​​​th`​​​​ bank. Return the wealth that the richest customer has.

A customer''s wealth is the amount of money they have in all their bank accounts. The richest customer is the customer that has the maximum wealth.


Example 1:
Input: accounts = [[1,2,3],[3,2,1]]
Output: 6
Explanation:
`1st customer has wealth = 1 + 2 + 3 = 6
``2nd customer has wealth = 3 + 2 + 1 = 6
`Both customers are considered the richest with a wealth of 6 each, so return 6.


Example 2:
Input: accounts = [[1,5],[7,3],[3,5]]
Output: 10
Explanation: 
1st customer has wealth = 6
2nd customer has wealth = 10 
3rd customer has wealth = 8
The 2nd customer is the richest with a wealth of 10.


Example 3:
Input: accounts = [[2,8,7],[7,1,3],[1,9,5]]
Output: 17

Constraints:
`m == accounts.length`
`n == accounts[i].length`
`1 <= m, n <= 50`
`1 <= accounts[i][j] <= 100`', false, 'Easy', NULL, 88.2, 
   14.2, 'https://leetcode.com/problems/richest-customer-wealth', 775, 94.5, 107.2, '["Adobe"]'::jsonb, '["Array"]'::jsonb, 
   413, 86, 83, false, '[]'::jsonb, true),
  (1673, 'Find the Most Competitive Subsequence', 'Given an integer array `nums` and a positive integer `k`, return the most competitive subsequence of `nums` of size `k`.

An array''s subsequence is a resulting sequence obtained by erasing some (possibly zero) elements from the array.

We define that a subsequence `a` is more competitive than a subsequence `b` (of the same length) if in the first position where `a` and `b` differ, subsequence `a` has a number less than the corresponding number in `b`. For example, `[1,3,4]` is more competitive than `[1,3,5]` because the first position they differ is at the final number, and `4` is less than `5`.


Example 1:
Input: nums = [3,5,2,6], k = 2
Output: [2,6]
Explanation: Among the set of every possible subsequence: {[3,5], [3,2], [3,6], [5,2], [5,6], [2,6]}, [2,6] is the most competitive.


Example 2:
Input: nums = [2,4,3,3,5,4,9,6], k = 4
Output: [2,3,3,4]

Constraints:
`1 <= nums.length <= 105`
`0 <= nums[i] <= 109`
`1 <= k <= nums.length`', false, 'Medium', '/articles/find-the-most-competitive-subsequence', 45.5, 
   21.3, 'https://leetcode.com/problems/find-the-most-competitive-subsequence', 238, 29.3, 64.5, '["Amazon"]'::jsonb, '["Stack,Heap,Greedy,Queue"]'::jsonb, 
   722, 41, 95, true, '[]'::jsonb, true),
  (1674, 'Minimum Moves to Make Array Complementary', 'You are given an integer array `nums` of even length `n` and an integer `limit`. In one move, you can replace any integer from `nums` with another integer between `1` and `limit`, inclusive.

The array `nums` is complementary if for all indices `i` (0-indexed), `nums[i] + nums[n - 1 - i]` equals the same number. For example, the array `[1,2,3,4]` is complementary because for all indices `i`, `nums[i] + nums[n - 1 - i] = 5`.

Return the minimum number of moves required to make `nums` complementary.


Example 1:
Input: nums = [1,2,4,3], limit = 4
Output: 1
Explanation: In 1 move, you can change nums to [1,2,2,3] (underlined elements are changed).

nums[0] + nums[3] = 1 + 3 = 4.

nums[1] + nums[2] = 2 + 2 = 4.

nums[2] + nums[1] = 2 + 2 = 4.

nums[3] + nums[0] = 3 + 1 = 4.

Therefore, nums[i] + nums[n-1-i] = 4 for every i, so nums is complementary.


Example 2:
Input: nums = [1,2,2,1], limit = 2
Output: 2
Explanation: In 2 moves, you can change nums to [2,2,2,2]. You cannot change any number to 3 since 3 > limit.


Example 3:
Input: nums = [1,2,1,2], limit = 2
Output: 0
Explanation: nums is already complementary.


Constraints:
`n == nums.length`
`2 <= n <= 105`
`1 <= nums[i] <= limit <= 105`
`n` is even.', false, 'Medium', NULL, 34.8, 
   10.4, 'https://leetcode.com/problems/minimum-moves-to-make-array-complementary', 39, 3.9, 11.2, '["CureFit"]'::jsonb, '["Greedy"]'::jsonb, 
   269, 36, 88, false, '[]'::jsonb, true),
  (1675, 'Minimize Deviation in Array', 'You are given an array `nums` of `n` positive integers.

You can perform two types of operations on any element of the array any number of times:
If the element is even, divide it by `2`.

	
For example, if the array is `[1,2,3,4]`, then you can do this operation on the last element, and the array will be `[1,2,3,2].`
If the element is odd, multiply it by `2`.

	
For example, if the array is `[1,2,3,4]`, then you can do this operation on the first element, and the array will be `[2,2,3,4].`
The deviation of the array is the maximum difference between any two elements in the array.

Return the minimum deviation the array can have after performing some number of operations.


Example 1:
Input: nums = [1,2,3,4]
Output: 1
Explanation: You can transform the array to [1,2,3,2], then to [2,2,3,2], then the deviation will be 3 - 2 = 1.


Example 2:
Input: nums = [4,1,5,20,3]
Output: 3
Explanation: You can transform the array after two operations to [4,2,5,5,3], then the deviation will be 5 - 2 = 3.


Example 3:
Input: nums = [2,10,8]
Output: 3

Constraints:
`n == nums.length`
`2 <= n <= 105`
`1 <= nums[i] <= 109`', false, 'Hard', '/articles/minimize-deviation-in-array', 48.2, 
   23, 'https://leetcode.com/problems/minimize-deviation-in-array', 105, 15.7, 32.6, '["Samsung"]'::jsonb, '["Heap,Ordered Map"]'::jsonb, 
   406, 18, 96, false, '[]'::jsonb, true),
  (1676, 'Lowest Common Ancestor of a Binary Tree IV', 'Given the `root` of a binary tree and an array of `TreeNode` objects `nodes`, return the lowest common ancestor (LCA) of all the nodes in `nodes`. All the nodes will exist in the tree, and all values of the tree''s nodes are unique.

Extending the definition of LCA on Wikipedia: "The lowest common ancestor of `n` nodes `p1`, `p2`, ..., `pn` in a binary tree `T` is the lowest node that has every `pi` as a descendant (where we allow a node to be a descendant of itself) for every valid `i`". A descendant of a node `x` is a node `y` that is on the path from node `x` to some leaf node.


Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [4,7]
Output: 2
Explanation: The lowest common ancestor of nodes 4 and 7 is node 2.


Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [1]
Output: 1
Explanation: The lowest common ancestor of a single node is the node itself.


Example 3:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [7,6,2,4]
Output: 5
Explanation: The lowest common ancestor of the nodes 7, 6, 2, and 4 is node 5.


Example 4:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [0,1,2,3,4,5,6,7,8]
Output: 3
Explanation: The lowest common ancestor of all the nodes is the root node.


Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-109 <= Node.val <= 109`
All `Node.val` are unique.

All `nodes[i]` will exist in the tree.

All `nodes[i]` are distinct.', true, 'Medium', NULL, 79.3, 
   7.8, 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iv', 72, 5.4, 6.8, '["Amazon"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   97, 2, 98, true, '[]'::jsonb, true),
  (1677, 'Product''s Worth Over Invoices', 'SQL Schema', true, 'Easy', NULL, 73.1, 
   0, 'https://leetcode.com/problems/products-worth-over-invoices', 41, 3.6, 5, '[]'::jsonb, '[]'::jsonb, 
   11, 21, 34, false, '[]'::jsonb, true),
  (1678, 'Goal Parser Interpretation', 'You own a Goal Parser that can interpret a string `command`. The `command` consists of an alphabet of `"G"`, `"()"` and/or `"(al)"` in some order. The Goal Parser will interpret `"G"` as the string `"G"`, `"()"` as the string `"o"`, and `"(al)"` as the string `"al"`. The interpreted strings are then concatenated in the original order.

Given the string `command`, return the Goal Parser''s interpretation of `command`.


Example 1:
Input: command = "G()(al)"
Output: "Goal"
Explanation: The Goal Parser interprets the command as follows:
G -> G
() -> o
(al) -> al
The final concatenated result is "Goal".


Example 2:
Input: command = "G()()()()(al)"
Output: "Gooooal"

Example 3:
Input: command = "(al)G(al)()()G"
Output: "alGalooG"

Constraints:
`1 <= command.length <= 100`
`command` consists of `"G"`, `"()"`, and/or `"(al)"` in some order.', false, 'Easy', NULL, 85.3, 
   1.8, 'https://leetcode.com/problems/goal-parser-interpretation', 608, 44.3, 52, '[]'::jsonb, '[]'::jsonb, 
   235, 26, 90, false, '[]'::jsonb, true),
  (1679, 'Max Number of K-Sum Pairs', 'You are given an integer array `nums` and an integer `k`.

In one operation, you can pick two numbers from the array whose sum equals `k` and remove them from the array.

Return the maximum number of operations you can perform on the array.


Example 1:
Input: nums = [1,2,3,4], k = 5
Output: 2
Explanation: Starting with nums = [1,2,3,4]:
- Remove numbers 1 and 4, then nums = [2,3]
- Remove numbers 2 and 3, then nums = []
There are no more pairs that sum up to 5, hence a total of 2 operations.


Example 2:
Input: nums = [3,1,3,4,3], k = 6
Output: 1
Explanation: Starting with nums = [3,1,3,4,3]:
- Remove the first two 3''s, then nums = [1,4,3]
There are no more pairs that sum up to 6, hence a total of 1 operation.


Constraints:
`1 <= nums.length <= 105`
`1 <= nums[i] <= 109`
`1 <= k <= 109`', false, 'Medium', '/articles/max-number-of-k-sum-pairs', 53.9, 
   16.2, 'https://leetcode.com/problems/max-number-of-k-sum-pairs', 381, 36.4, 67.7, '["DE Shaw"]'::jsonb, '["Hash Table"]'::jsonb, 
   400, 17, 96, false, '[]'::jsonb, true),
  (1680, 'Concatenation of Consecutive Binary Numbers', 'Given an integer `n`, return the decimal value of the binary string formed by concatenating the binary representations of `1` to `n` in order, modulo `109 + 7`.


Example 1:
Input: n = 1
Output: 1
Explanation: "1" in binary corresponds to the decimal value 1. 

Example 2:
Input: n = 3
Output: 27
Explanation: In binary, 1, 2, and 3 corresponds to "1", "10", and "11".

After concatenating them, we have "11011", which corresponds to the decimal value 27.


Example 3:
Input: n = 12
Output: 505379714
Explanation: The concatenation results in "1101110010111011110001001101010111100".

The decimal value of that is 118505380540.

After modulo 109 + 7, the result is 505379714.


Constraints:
`1 <= n <= 105`', false, 'Medium', '/articles/concatenation-of-consecutive-binary-numbers', 52.3, 
   2.9, 'https://leetcode.com/problems/concatenation-of-consecutive-binary-numbers', 233, 27.6, 52.8, '["Amazon"]'::jsonb, '["Math"]'::jsonb, 
   234, 167, 58, true, '[]'::jsonb, true),
  (1681, 'Minimum Incompatibility', 'You are given an integer array `nums`​​​ and an integer `k`. You are asked to distribute this array into `k` subsets of equal size such that there are no two equal elements in the same subset.

A subset''s incompatibility is the difference between the maximum and minimum elements in that array.

Return the minimum possible sum of incompatibilities of the `k` subsets after distributing the array optimally, or return `-1` if it is not possible.

A subset is a group integers that appear in the array with no particular order.


Example 1:
Input: nums = [1,2,1,4], k = 2
Output: 4
Explanation: The optimal distribution of subsets is [1,2] and [1,4].

The incompatibility is (2-1) + (4-1) = 4.

Note that [1,1] and [2,4] would result in a smaller sum, but the first subset contains 2 equal elements.


Example 2:
Input: nums = [6,3,8,1,3,1,2,2], k = 4
Output: 6
Explanation: The optimal distribution of subsets is [1,2], [2,3], [6,8], and [1,3].

The incompatibility is (2-1) + (3-2) + (8-6) + (3-1) = 6.


Example 3:
Input: nums = [5,3,3,6,3,3], k = 3
Output: -1
Explanation: It is impossible to distribute nums into 3 subsets where no two elements are equal in the same subset.


Constraints:
`1 <= k <= nums.length <= 16`
`nums.length` is divisible by `k`
`1 <= nums[i] <= nums.length`', false, 'Hard', NULL, 35.8, 
   9, 'https://leetcode.com/problems/minimum-incompatibility', 63, 4.3, 12.2, '["Microsoft"]'::jsonb, '["Backtracking,Greedy"]'::jsonb, 
   109, 77, 59, false, '[]'::jsonb, true),
  (1682, 'Longest Palindromic Subsequence II', 'A subsequence of a string `s` is considered a good palindromic subsequence if:
It is a subsequence of `s`.

It is a palindrome (has the same value if reversed).

It has an even length.

No two consecutive characters are equal, except the two middle ones.

For example, if `s = "abcabcabb"`, then `"abba"` is considered a good palindromic subsequence, while `"bcb"` (not even length) and `"bbbb"` (has equal consecutive characters) are not.

Given a string `s`, return the length of the longest good palindromic subsequence in `s`.


Example 1:
Input: s = "bbabab"
Output: 4
Explanation: The longest good palindromic subsequence of s is "baab".


Example 2:
Input: s = "dcbccacdb"
Output: 4
Explanation: The longest good palindromic subsequence of s is "dccd".


Constraints:
`1 <= s.length <= 250`
`s` consists of lowercase English letters.', true, 'Medium', NULL, 51.5, 
   0, 'https://leetcode.com/problems/longest-palindromic-subsequence-ii', 29, 1.5, 3, '["Codenation"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   49, 9, 84, false, '[]'::jsonb, true),
  (1683, 'Invalid Tweets', 'SQL Schema', true, 'Easy', NULL, 90.8, 
   0, 'https://leetcode.com/problems/invalid-tweets', 36, 7.9, 8.7, '["Twitter"]'::jsonb, '[]'::jsonb, 
   32, 31, 51, false, '[]'::jsonb, true),
  (1684, 'Count the Number of Consistent Strings', 'You are given a string `allowed` consisting of distinct characters and an array of strings `words`. A string is consistent if all characters in the string appear in the string `allowed`.

Return the number of consistent strings in the array `words`.


Example 1:
Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
Output: 2
Explanation: Strings "aaab" and "baa" are consistent since they only contain characters ''a'' and ''b''.


Example 2:
Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
Output: 7
Explanation: All strings are consistent.


Example 3:
Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
Output: 4
Explanation: Strings "cc", "acd", "ac", and "d" are consistent.


Constraints:
`1 <= words.length <= 104`
`1 <= allowed.length <= 26`
`1 <= words[i].length <= 10`
The characters in `allowed` are distinct.

`words[i]` and `allowed` contain only lowercase English letters.', false, 'Easy', NULL, 81.9, 
   1.1, 'https://leetcode.com/problems/count-the-number-of-consistent-strings', 424, 35.4, 43.2, '["Robinhood"]'::jsonb, '["String"]'::jsonb, 
   255, 23, 92, false, '[]'::jsonb, true),
  (1685, 'Sum of Absolute Differences in a Sorted Array', 'You are given an integer array `nums` sorted in non-decreasing order.

Build and return an integer array `result` with the same length as `nums` such that `result[i]` is equal to the summation of absolute differences between `nums[i]` and all the other elements in the array.

In other words, `result[i]` is equal to `sum(|nums[i]-nums[j]|)` where `0 <= j < nums.length` and `j != i` (0-indexed).


Example 1:
Input: nums = [2,3,5]
Output: [4,3,5]
Explanation: Assuming the arrays are 0-indexed, then
result[0] = |2-2| + |2-3| + |2-5| = 0 + 1 + 3 = 4,
result[1] = |3-2| + |3-3| + |3-5| = 1 + 0 + 2 = 3,
result[2] = |5-2| + |5-3| + |5-5| = 3 + 2 + 0 = 5.


Example 2:
Input: nums = [1,4,6,8,10]
Output: [24,15,13,15,21]

Constraints:
`2 <= nums.length <= 105`
`1 <= nums[i] <= nums[i + 1] <= 104`', false, 'Medium', NULL, 63, 
   1.4, 'https://leetcode.com/problems/sum-of-absolute-differences-in-a-sorted-array', 182, 10, 15.8, '[]'::jsonb, '[]'::jsonb, 
   293, 8, 97, false, '[]'::jsonb, true),
  (1686, 'Stone Game VI', 'Alice and Bob take turns playing a game, with Alice starting first.

There are `n` stones in a pile. On each player''s turn, they can remove a stone from the pile and receive points based on the stone''s value. Alice and Bob may value the stones differently.

You are given two integer arrays of length `n`, `aliceValues` and `bobValues`. Each `aliceValues[i]` and `bobValues[i]` represents how Alice and Bob, respectively, value the `ith` stone.

The winner is the person with the most points after all the stones are chosen. If both players have the same amount of points, the game results in a draw. Both players will play optimally. Both players know the other''s values.

Determine the result of the game, and:
If Alice wins, return `1`.

If Bob wins, return `-1`.

If the game results in a draw, return `0`.


Example 1:
Input: aliceValues = [1,3], bobValues = [2,1]
Output: 1
Explanation:
If Alice takes stone 1 (0-indexed) first, Alice will receive 3 points.

Bob can only choose stone 0, and will only receive 2 points.

Alice wins.


Example 2:
Input: aliceValues = [1,2], bobValues = [3,1]
Output: 0
Explanation:
If Alice takes stone 0, and Bob takes stone 1, they will both have 1 point.

Draw.


Example 3:
Input: aliceValues = [2,4,3], bobValues = [1,6,7]
Output: -1
Explanation:
Regardless of how Alice plays, Bob will be able to have more points than Alice.

For example, if Alice takes stone 1, Bob can take stone 2, and Alice takes stone 0, Alice will have 6 points to Bob''s 7.

Bob wins.


Constraints:
`n == aliceValues.length == bobValues.length`
`1 <= n <= 105`
`1 <= aliceValues[i], bobValues[i] <= 100`', false, 'Medium', NULL, 50.1, 
   2.6, 'https://leetcode.com/problems/stone-game-vi', 90, 5.5, 10.9, '["APT Portfolio"]'::jsonb, '["Greedy"]'::jsonb, 
   222, 13, 94, false, '[]'::jsonb, true),
  (1687, 'Delivering Boxes from Storage to Ports', 'You have the task of delivering some boxes from storage to their ports using only one ship. However, this ship has a limit on the number of boxes and the total weight that it can carry.

You are given an array `boxes`, where `boxes[i] = [ports​​i​, weighti]`, and three integers `portsCount`, `maxBoxes`, and `maxWeight`.

`ports​​i` is the port where you need to deliver the `ith` box and `weightsi` is the weight of the `ith` box.

`portsCount` is the number of ports.

`maxBoxes` and `maxWeight` are the respective box and weight limits of the ship.

The boxes need to be delivered in the order they are given. The ship will follow these steps:
The ship will take some number of boxes from the `boxes` queue, not violating the `maxBoxes` and `maxWeight` constraints.

For each loaded box in order, the ship will make a trip to the port the box needs to be delivered to and deliver it. If the ship is already at the correct port, no trip is needed, and the box can immediately be delivered.

The ship then makes a return trip to storage to take more boxes from the queue.

The ship must end at storage after all the boxes have been delivered.

Return the minimum number of trips the ship needs to make to deliver all boxes to their respective ports.


Example 1:
Input: boxes = [[1,1],[2,1],[1,1]], portsCount = 2, maxBoxes = 3, maxWeight = 3
Output: 4
Explanation: The optimal strategy is as follows: 
- The ship takes all the boxes in the queue, goes to port 1, then port 2, then port 1 again, then returns to storage. 4 trips.

So the total number of trips is 4.

Note that the first and third boxes cannot be delivered together because the boxes need to be delivered in order (i.e. the second box needs to be delivered at port 2 before the third box).


Example 2:
Input: boxes = [[1,2],[3,3],[3,1],[3,1],[2,4]], portsCount = 3, maxBoxes = 3, maxWeight = 6
Output: 6
Explanation: The optimal strategy is as follows: 
- The ship takes the first box, goes to port 1, then returns to storage. 2 trips.

- The ship takes the second, third and fourth boxes, goes to port 3, then returns to storage. 2 trips.

- The ship takes the fifth box, goes to port 3, then returns to storage. 2 trips.

So the total number of trips is 2 + 2 + 2 = 6.


Example 3:
Input: boxes = [[1,4],[1,2],[2,1],[2,1],[3,2],[3,4]], portsCount = 3, maxBoxes = 6, maxWeight = 7
Output: 6
Explanation: The optimal strategy is as follows:
- The ship takes the first and second boxes, goes to port 1, then returns to storage. 2 trips.

- The ship takes the third and fourth boxes, goes to port 2, then returns to storage. 2 trips.

- The ship takes the fifth and sixth boxes, goes to port 3, then returns to storage. 2 trips.

So the total number of trips is 2 + 2 + 2 = 6.


Example 4:
Input: boxes = [[2,4],[2,5],[3,1],[3,2],[3,7],[3,1],[4,4],[1,3],[5,2]], portsCount = 5, maxBoxes = 5, maxWeight = 7
Output: 14
Explanation: The optimal strategy is as follows:
- The ship takes the first box, goes to port 2, then storage. 2 trips.

- The ship takes the second box, goes to port 2, then storage. 2 trips.

- The ship takes the third and fourth boxes, goes to port 3, then storage. 2 trips.

- The ship takes the fifth box, goes to port 3, then storage. 2 trips.

- The ship takes the sixth and seventh boxes, goes to port 3, then port 4, then storage. 3 trips. 
- The ship takes the eighth and ninth boxes, goes to port 1, then port 5, then storage. 3 trips.

So the total number of trips is 2 + 2 + 2 + 2 + 3 + 3 = 14.


Constraints:
`1 <= boxes.length <= 105`
`1 <= portsCount, maxBoxes, maxWeight <= 105`
`1 <= ports​​i <= portsCount`
`1 <= weightsi <= maxWeight`', false, 'Hard', NULL, 35.4, 
   6.4, 'https://leetcode.com/problems/delivering-boxes-from-storage-to-ports', 22, 2.1, 6, '["Nutanix"]'::jsonb, '["Two Pointers,Dynamic Programming,Segment Tree,Dequeue"]'::jsonb, 
   129, 12, 91, false, '[]'::jsonb, true),
  (1688, 'Count of Matches in Tournament', 'You are given an integer `n`, the number of teams in a tournament that has strange rules:
If the current number of teams is even, each team gets paired with another team. A total of `n / 2` matches are played, and `n / 2` teams advance to the next round.

If the current number of teams is odd, one team randomly advances in the tournament, and the rest gets paired. A total of `(n - 1) / 2` matches are played, and `(n - 1) / 2 + 1` teams advance to the next round.

Return the number of matches played in the tournament until a winner is decided.


Example 1:
Input: n = 7
Output: 6
Explanation: Details of the tournament: 
- 1st Round: Teams = 7, Matches = 3, and 4 teams advance.

- 2nd Round: Teams = 4, Matches = 2, and 2 teams advance.

- 3rd Round: Teams = 2, Matches = 1, and 1 team is declared the winner.

Total number of matches = 3 + 2 + 1 = 6.


Example 2:
Input: n = 14
Output: 13
Explanation: Details of the tournament:
- 1st Round: Teams = 14, Matches = 7, and 7 teams advance.

- 2nd Round: Teams = 7, Matches = 3, and 4 teams advance.

- 3rd Round: Teams = 4, Matches = 2, and 2 teams advance.

- 4th Round: Teams = 2, Matches = 1, and 1 team is declared the winner.

Total number of matches = 7 + 3 + 2 + 1 = 13.


Constraints:
`1 <= n <= 200`', false, 'Easy', NULL, 81.5, 
   1, 'https://leetcode.com/problems/count-of-matches-in-tournament', 432, 33.6, 41.2, '[]'::jsonb, '[]'::jsonb, 
   258, 59, 81, false, '[]'::jsonb, true),
  (1689, 'Partitioning Into Minimum Number Of Deci-Binary Numbers', 'A decimal number is called deci-binary if each of its digits is either `0` or `1` without any leading zeros. For example, `101` and `1100` are deci-binary, while `112` and `3001` are not.

Given a string `n` that represents a positive decimal integer, return the minimum number of positive deci-binary numbers needed so that they sum up to `n`.


Example 1:
Input: n = "32"
Output: 3
Explanation: 10 + 11 + 11 = 32

Example 2:
Input: n = "82734"
Output: 8

Example 3:
Input: n = "27346209830709182346"
Output: 9

Constraints:
`1 <= n.length <= 105`
`n` consists of only digits.

`n` does not contain any leading zeros and represents a positive integer.', false, 'Medium', '/articles/partitioning-into-minimum-number-of-deci-binary-numbers', 87.1, 
   4.6, 'https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers', 206, 20.9, 23.9, '["Nutanix"]'::jsonb, '["Greedy"]'::jsonb, 
   175, 168, 51, false, '[]'::jsonb, true),
  (1690, 'Stone Game VII', 'Alice and Bob take turns playing a game, with Alice starting first.

There are `n` stones arranged in a row. On each player''s turn, they can remove either the leftmost stone or the rightmost stone from the row and receive points equal to the sum of the remaining stones'' values in the row. The winner is the one with the higher score when there are no stones left to remove.

Bob found that he will always lose this game (poor Bob, he always loses), so he decided to minimize the score''s difference. Alice''s goal is to maximize the difference in the score.

Given an array of integers `stones` where `stones[i]` represents the value of the `ith` stone from the left, return the difference in Alice and Bob''s score if they both play optimally.


Example 1:
Input: stones = [5,3,1,4,2]
Output: 6
Explanation: 
- Alice removes 2 and gets 5 + 3 + 1 + 4 = 13 points. Alice = 13, Bob = 0, stones = [5,3,1,4].

- Bob removes 5 and gets 3 + 1 + 4 = 8 points. Alice = 13, Bob = 8, stones = [3,1,4].

- Alice removes 3 and gets 1 + 4 = 5 points. Alice = 18, Bob = 8, stones = [1,4].

- Bob removes 1 and gets 4 points. Alice = 18, Bob = 12, stones = [4].

- Alice removes 4 and gets 0 points. Alice = 18, Bob = 12, stones = [].

The score difference is 18 - 12 = 6.


Example 2:
Input: stones = [7,90,5,1,100,10,10,2]
Output: 122

Constraints:
`n == stones.length`
`2 <= n <= 1000`
`1 <= stones[i] <= 1000`', false, 'Medium', '/articles/stone-game-vii', 49, 
   2.5, 'https://leetcode.com/problems/stone-game-vii', 142, 7.1, 14.5, '["Dunzo"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   214, 71, 75, false, '[]'::jsonb, true),
  (1691, 'Maximum Height by Stacking Cuboids', 'Given `n` `cuboids` where the dimensions of the `ith` cuboid is `cuboids[i] = [widthi, lengthi, heighti]` (0-indexed). Choose a subset of `cuboids` and place them on each other.

You can place cuboid `i` on cuboid `j` if `widthi <= widthj` and `lengthi <= lengthj` and `heighti <= heightj`. You can rearrange any cuboid''s dimensions by rotating it to put it on another cuboid.

Return the maximum height of the stacked `cuboids`.


Example 1:
Input: cuboids = [[50,45,20],[95,37,53],[45,23,12]]
Output: 190
Explanation:
Cuboid 1 is placed on the bottom with the 53x37 side facing down with height 95.

Cuboid 0 is placed next with the 45x20 side facing down with height 50.

Cuboid 2 is placed next with the 23x12 side facing down with height 45.

The total height is 95 + 50 + 45 = 190.


Example 2:
Input: cuboids = [[38,25,45],[76,35,3]]
Output: 76
Explanation:
You can''t place any of the cuboids on the other.

We choose cuboid 1 and rotate it so that the 35x3 side is facing down and its height is 76.


Example 3:
Input: cuboids = [[7,11,17],[7,17,11],[11,7,17],[11,17,7],[17,7,11],[17,11,7]]
Output: 102
Explanation:
After rearranging the cuboids, you can see that all cuboids have the same dimension.

You can place the 11x7 side down on all cuboids so their heights are 17.

The maximum height of stacked cuboids is 6 * 17 = 102.


Constraints:
`n == cuboids.length`
`1 <= n <= 100`
`1 <= widthi, lengthi, heighti <= 100`', false, 'Hard', NULL, 50.2, 
   20.6, 'https://leetcode.com/problems/maximum-height-by-stacking-cuboids', 79, 4.4, 8.8, '["Samsung"]'::jsonb, '["Dynamic Programming,Sort"]'::jsonb, 
   177, 8, 96, false, '[]'::jsonb, true),
  (1692, 'Count Ways to Distribute Candies', 'There are `n` unique candies (labeled `1` through `n`) and `k` bags. You are asked to distribute all the candies into the bags such that every bag has at least one candy.

There can be multiple ways to distribute the candies. Two ways are considered different if the candies in one bag in the first way are not all in the same bag in the second way. The order of the bags and the order of the candies within each bag do not matter.

For example, `(1), (2,3)` and `(2), (1,3)` are considered different because candies `2` and `3` in the bag `(2,3)` in the first way are not in the same bag in the second way (they are split between the bags `(2)` and `(1,3)`). However, `(1), (2,3)` and `(3,2), (1)` are considered the same because the candies in each bag are all in the same bags in both ways.

Given two integers, `n` and `k`, return the number of different ways to distribute the candies. As the answer may be too large, return it modulo `109 + 7`.


Example 1:
Input: n = 3, k = 2
Output: 3
Explanation: You can distribute 3 candies into 2 bags in 3 ways:
(1), (2,3)
(1,2), (3)
(1,3), (2)

Example 2:
Input: n = 4, k = 2
Output: 7
Explanation: You can distribute 4 candies into 2 bags in 7 ways:
(1), (2,3,4)
(1,2), (3,4)
(1,3), (2,4)
(1,4), (2,3)
(1,2,3), (4)
(1,2,4), (3)
(1,3,4), (2)

Example 3:
Input: n = 20, k = 5
Output: 206085257
Explanation: You can distribute 20 candies into 5 bags in 1881780996 ways. 1881780996 modulo 109 + 7 = 206085257.


Constraints:
`1 <= k <= n <= 1000`', true, 'Hard', NULL, 61.6, 
   0, 'https://leetcode.com/problems/count-ways-to-distribute-candies', 20, 791, 1.3, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   24, 5, 83, true, '[]'::jsonb, true),
  (1693, 'Daily Leads and Partners', 'SQL Schema', true, 'Easy', NULL, 90.7, 
   0, 'https://leetcode.com/problems/daily-leads-and-partners', 37, 6, 6.7, '[]'::jsonb, '[]'::jsonb, 
   29, 5, 85, false, '[]'::jsonb, true),
  (1694, 'Reformat Phone Number', 'You are given a phone number as a string `number`. `number` consists of digits, spaces `'' ''`, and/or dashes `''-''`.

You would like to reformat the phone number in a certain manner. Firstly, remove all spaces and dashes. Then, group the digits from left to right into blocks of length 3 until there are 4 or fewer digits. The final digits are then grouped as follows:
2 digits: A single block of length 2.

3 digits: A single block of length 3.

4 digits: Two blocks of length 2 each.

The blocks are then joined by dashes. Notice that the reformatting process should never produce any blocks of length 1 and produce at most two blocks of length 2.

Return the phone number after formatting.


Example 1:
Input: number = "1-23-45 6"
Output: "123-456"
Explanation: The digits are "123456".

Step 1: There are more than 4 digits, so group the next 3 digits. The 1st block is "123".

Step 2: There are 3 digits remaining, so put them in a single block of length 3. The 2nd block is "456".

Joining the blocks gives "123-456".


Example 2:
Input: number = "123 4-567"
Output: "123-45-67"
Explanation: The digits are "1234567".

Step 1: There are more than 4 digits, so group the next 3 digits. The 1st block is "123".

Step 2: There are 4 digits left, so split them into two blocks of length 2. The blocks are "45" and "67".

Joining the blocks gives "123-45-67".


Example 3:
Input: number = "123 4-5678"
Output: "123-456-78"
Explanation: The digits are "12345678".

Step 1: The 1st block is "123".

Step 2: The 2nd block is "456".

Step 3: There are 2 digits left, so put them in a single block of length 2. The 3rd block is "78".

Joining the blocks gives "123-456-78".


Example 4:
Input: number = "12"
Output: "12"

Example 5:
Input: number = "--17-5 229 35-39475 "
Output: "175-229-353-94-75"

Constraints:
`2 <= number.length <= 100`
`number` consists of digits and the characters `''-''` and `'' ''`.

There are at least two digits in `number`.', false, 'Easy', NULL, 65.4, 
   24.8, 'https://leetcode.com/problems/reformat-phone-number', 229, 14.3, 21.9, '["Activision"]'::jsonb, '["String"]'::jsonb, 
   103, 93, 53, false, '[]'::jsonb, true),
  (1695, 'Maximum Erasure Value', 'You are given an array of positive integers `nums` and want to erase a subarray containing unique elements. The score you get by erasing the subarray is equal to the sum of its elements.

Return the maximum score you can get by erasing exactly one subarray.

An array `b` is called to be a subarray of `a` if it forms a contiguous subsequence of `a`, that is, if it is equal to `a[l],a[l+1],...,a[r]` for some `(l,r)`.


Example 1:
Input: nums = [4,2,4,5,6]
Output: 17
Explanation: The optimal subarray here is [2,4,5,6].


Example 2:
Input: nums = [5,2,1,2,5,2,1,2,5]
Output: 8
Explanation: The optimal subarray here is [5,2,1] or [1,2,5].


Constraints:
`1 <= nums.length <= 105`
`1 <= nums[i] <= 104`', false, 'Medium', '/articles/maximum-erasure-value', 49.4, 
   6.6, 'https://leetcode.com/problems/maximum-erasure-value', 198, 11.8, 23.9, '["Cashfree"]'::jsonb, '["Two Pointers"]'::jsonb, 
   223, 7, 97, false, '[]'::jsonb, true),
  (1696, 'Jump Game VI', 'You are given a 0-indexed integer array `nums` and an integer `k`.

You are initially standing at index `0`. In one move, you can jump at most `k` steps forward without going outside the boundaries of the array. That is, you can jump from index `i` to any index in the range `[i + 1, min(n - 1, i + k)]` inclusive.

You want to reach the last index of the array (index `n - 1`). Your score is the sum of all `nums[j]` for each index `j` you visited in the array.

Return the maximum score you can get.


Example 1:
Input: nums = [1,-1,-2,4,-7,3], k = 2
Output: 7
Explanation: You can choose your jumps forming the subsequence [1,-1,4,3] (underlined above). The sum is 7.


Example 2:
Input: nums = [10,-5,-2,4,0,3], k = 3
Output: 17
Explanation: You can choose your jumps forming the subsequence [10,4,3] (underlined above). The sum is 17.


Example 3:
Input: nums = [1,-5,-20,4,-1,3,-6,-3], k = 2
Output: 0

Constraints:
 `1 <= nums.length, k <= 105`
`-104 <= nums[i] <= 104`', false, 'Medium', '/articles/jump-game-vi', 51.8, 
   12.3, 'https://leetcode.com/problems/jump-game-vi', 162, 12.3, 23.7, '["Uber"]'::jsonb, '["Dequeue"]'::jsonb, 
   341, 21, 94, false, '[]'::jsonb, true),
  (1697, 'Checking Existence of Edge Length Limited Paths', 'An undirected graph of `n` nodes is defined by `edgeList`, where `edgeList[i] = [ui, vi, disi]` denotes an edge between nodes `ui` and `vi` with distance `disi`. Note that there may be multiple edges between two nodes.

Given an array `queries`, where `queries[j] = [pj, qj, limitj]`, your task is to determine for each `queries[j]` whether there is a path between `pj` and `qj` such that each edge on the path has a distance strictly less than `limitj` .

Return a boolean array `answer`, where `answer.length == queries.length` and the `jth` value of `answer` is `true` if there is a path for `queries[j]` is `true`, and `false` otherwise.


Example 1:
Input: n = 3, edgeList = [[0,1,2],[1,2,4],[2,0,8],[1,0,16]], queries = [[0,1,2],[0,2,5]]
Output: [false,true]
Explanation: The above figure shows the given graph. Note that there are two overlapping edges between 0 and 1 with distances 2 and 16.

For the first query, between 0 and 1 there is no path where each distance is less than 2, thus we return false for this query.

For the second query, there is a path (0 -> 1 -> 2) of two edges with distances less than 5, thus we return true for this query.


Example 2:
Input: n = 5, edgeList = [[0,1,10],[1,2,5],[2,3,9],[3,4,13]], queries = [[0,4,14],[1,4,13]]
Output: [true,false]
Exaplanation: The above figure shows the given graph.


Constraints:
`2 <= n <= 105`
`1 <= edgeList.length, queries.length <= 105`
`edgeList[i].length == 3`
`queries[j].length == 3`
`0 <= ui, vi, pj, qj <= n - 1`
`ui != vi`
`pj != qj`
`1 <= disi, limitj <= 109`
There may be multiple edges between two nodes.', false, 'Hard', NULL, 54.2, 
   16, 'https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths', 69, 5.4, 9.9, '["Google"]'::jsonb, '["Sort,Union Find"]'::jsonb, 
   266, 6, 98, true, '[]'::jsonb, true),
  (1698, 'Number of Distinct Substrings in a String', 'Given a string `s`, return the number of distinct substrings of `s`.

A substring of a string is obtained by deleting any number of characters (possibly zero) from the front of the string and any number (possibly zero) from the back of the string.


Example 1:
Input: s = "aabbaba"
Output: 21
Explanation: The set of distinct strings is ["a","b","aa","bb","ab","ba","aab","abb","bab","bba","aba","aabb","abba","bbab","baba","aabba","abbab","bbaba","aabbab","abbaba","aabbaba"]

Example 2:
Input: s = "abcdefg"
Output: 28

Constraints:
`1 <= s.length <= 500`
`s` consists of lowercase English letters.

Follow up: Can you solve this problem in `O(n)` time complexity?', true, 'Medium', NULL, 60.8, 
   0, 'https://leetcode.com/problems/number-of-distinct-substrings-in-a-string', 46, 1.8, 3, '["Intuit,Dunzo"]'::jsonb, '["String,Trie,Rolling Hash,Suffix Array"]'::jsonb, 
   43, 11, 80, false, '[]'::jsonb, true),
  (1699, 'Number of Calls Between Two Persons', 'SQL Schema', true, 'Medium', NULL, 86.5, 
   3.1, 'https://leetcode.com/problems/number-of-calls-between-two-persons', 79, 3.9, 4.5, '["Amazon"]'::jsonb, '[]'::jsonb, 
   34, 2, 94, true, '[]'::jsonb, true),
  (1700, 'Number of Students Unable to Eat Lunch', 'The school cafeteria offers circular and square sandwiches at lunch break, referred to by numbers `0` and `1` respectively. All students stand in a queue. Each student either prefers square or circular sandwiches.

The number of sandwiches in the cafeteria is equal to the number of students. The sandwiches are placed in a stack. At each step:
If the student at the front of the queue prefers the sandwich on the top of the stack, they will take it and leave the queue.

Otherwise, they will leave it and go to the queue''s end.

This continues until none of the queue students want to take the top sandwich and are thus unable to eat.

You are given two integer arrays `students` and `sandwiches` where `sandwiches[i]` is the type of the `i​​​​​​th` sandwich in the stack (`i = 0` is the top of the stack) and `students[j]` is the preference of the `j​​​​​​th` student in the initial queue (`j = 0` is the front of the queue). Return the number of students that are unable to eat.


Example 1:
Input: students = [1,1,0,0], sandwiches = [0,1,0,1]
Output: 0 
Explanation:
- Front student leaves the top sandwich and returns to the end of the line making students = [1,0,0,1].

- Front student leaves the top sandwich and returns to the end of the line making students = [0,0,1,1].

- Front student takes the top sandwich and leaves the line making students = [0,1,1] and sandwiches = [1,0,1].

- Front student leaves the top sandwich and returns to the end of the line making students = [1,1,0].

- Front student takes the top sandwich and leaves the line making students = [1,0] and sandwiches = [0,1].

- Front student leaves the top sandwich and returns to the end of the line making students = [0,1].

- Front student takes the top sandwich and leaves the line making students = [1] and sandwiches = [1].

- Front student takes the top sandwich and leaves the line making students = [] and sandwiches = [].

Hence all students are able to eat.


Example 2:
Input: students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]
Output: 3

Constraints:
`1 <= students.length, sandwiches.length <= 100`
`students.length == sandwiches.length`
`sandwiches[i]` is `0` or `1`.

`students[i]` is `0` or `1`.', false, 'Easy', NULL, 67.8, 
   3.9, 'https://leetcode.com/problems/number-of-students-unable-to-eat-lunch', 232, 14, 20.6, '["Microsoft"]'::jsonb, '["Array"]'::jsonb, 
   238, 19, 93, false, '[]'::jsonb, true),
  (1701, 'Average Waiting Time', 'There is a restaurant with a single chef. You are given an array `customers`, where `customers[i] = [arrivali, timei]:`
`arrivali` is the arrival time of the `ith` customer. The arrival times are sorted in non-decreasing order.

`timei` is the time needed to prepare the order of the `ith` customer.

When a customer arrives, he gives the chef his order, and the chef starts preparing it once he is idle. The customer waits till the chef finishes preparing his order. The chef does not prepare food for more than one customer at a time. The chef prepares food for customers in the order they were given in the input.

Return the average waiting time of all customers. Solutions within `10-5` from the actual answer are considered accepted.


Example 1:
Input: customers = [[1,2],[2,5],[4,3]]
Output: 5.00000
Explanation:
1) The first customer arrives at time 1, the chef takes his order and starts preparing it immediately at time 1, and finishes at time 3, so the waiting time of the first customer is 3 - 1 = 2.

2) The second customer arrives at time 2, the chef takes his order and starts preparing it at time 3, and finishes at time 8, so the waiting time of the second customer is 8 - 2 = 6.

3) The third customer arrives at time 4, the chef takes his order and starts preparing it at time 8, and finishes at time 11, so the waiting time of the third customer is 11 - 4 = 7.

So the average waiting time = (2 + 6 + 7) / 3 = 5.


Example 2:
Input: customers = [[5,2],[5,4],[10,3],[20,1]]
Output: 3.25000
Explanation:
1) The first customer arrives at time 5, the chef takes his order and starts preparing it immediately at time 5, and finishes at time 7, so the waiting time of the first customer is 7 - 5 = 2.

2) The second customer arrives at time 5, the chef takes his order and starts preparing it at time 7, and finishes at time 11, so the waiting time of the second customer is 11 - 5 = 6.

3) The third customer arrives at time 10, the chef takes his order and starts preparing it at time 11, and finishes at time 14, so the waiting time of the third customer is 14 - 10 = 4.

4) The fourth customer arrives at time 20, the chef takes his order and starts preparing it immediately at time 20, and finishes at time 21, so the waiting time of the fourth customer is 21 - 20 = 1.

So the average waiting time = (2 + 6 + 4 + 1) / 4 = 3.25.


Constraints:
`1 <= customers.length <= 105`
`1 <= arrivali, timei <= 104`
`arrivali <= arrivali+1`', false, 'Medium', NULL, 61.3, 
   2.5, 'https://leetcode.com/problems/average-waiting-time', 229, 10.8, 17.7, '["Salesforce"]'::jsonb, '["Array"]'::jsonb, 
   160, 17, 90, false, '[]'::jsonb, true),
  (1702, 'Maximum Binary String After Change', 'You are given a binary string `binary` consisting of only `0`''s or `1`''s. You can apply each of the following operations any number of times:
Operation 1: If the number contains the substring `"00"`, you can replace it with `"10"`.

	
For example, `"00010" -> "10010`"
Operation 2: If the number contains the substring `"10"`, you can replace it with `"01"`.

	
For example, `"00010" -> "00001"`
Return the maximum binary string you can obtain after any number of operations. Binary string `x` is greater than binary string `y` if `x`''s decimal representation is greater than `y`''s decimal representation.


Example 1:
Input: binary = "000110"
Output: "111011"
Explanation: A valid transformation sequence can be:
"000110" -> "000101" 
"000101" -> "100101" 
"100101" -> "110101" 
"110101" -> "110011" 
"110011" -> "111011"

Example 2:
Input: binary = "01"
Output: "01"
Explanation: "01" cannot be transformed any further.


Constraints:
`1 <= binary.length <= 105`
`binary` consist of `''0''` and `''1''`.', false, 'Medium', NULL, 59.5, 
   0, 'https://leetcode.com/problems/maximum-binary-string-after-change', 99, 7.8, 13.1, '["Huwaei,Huawei"]'::jsonb, '["Greedy"]'::jsonb, 
   196, 23, 89, false, '[]'::jsonb, true),
  (1703, 'Minimum Adjacent Swaps for K Consecutive Ones', 'You are given an integer array, `nums`, and an integer `k`. `nums` comprises of only `0`''s and `1`''s. In one move, you can choose two adjacent indices and swap their values.

Return the minimum number of moves required so that `nums` has `k` consecutive `1`''s.


Example 1:
Input: nums = [1,0,0,1,0,1], k = 2
Output: 1
Explanation: In 1 move, nums could be [1,0,0,0,1,1] and have 2 consecutive 1''s.


Example 2:
Input: nums = [1,0,0,0,0,0,1,1], k = 3
Output: 5
Explanation: In 5 moves, the leftmost 1 can be shifted right until nums = [0,0,0,0,0,1,1,1].


Example 3:
Input: nums = [1,1,0,1], k = 2
Output: 0
Explanation: nums already has 2 consecutive 1''s.


Constraints:
`1 <= nums.length <= 105`
`nums[i]` is `0` or `1`.

`1 <= k <= sum(nums)`', false, 'Hard', NULL, 40.1, 
   6.8, 'https://leetcode.com/problems/minimum-adjacent-swaps-for-k-consecutive-ones', 38, 2.9, 7.1, '["Microsoft"]'::jsonb, '["Stack"]'::jsonb, 
   187, 6, 97, false, '[]'::jsonb, true),
  (1704, 'Determine if String Halves Are Alike', 'You are given a string `s` of even length. Split this string into two halves of equal lengths, and let `a` be the first half and `b` be the second half.

Two strings are alike if they have the same number of vowels (`''a''`, `''e''`, `''i''`, `''o''`, `''u''`, `''A''`, `''E''`, `''I''`, `''O''`, `''U''`). Notice that `s` contains uppercase and lowercase letters.

Return `true` if `a` and `b` are alike. Otherwise, return `false`.


Example 1:
Input: s = "book"
Output: true
Explanation: a = "bo" and b = "ok". a has 1 vowel and b has 1 vowel. Therefore, they are alike.


Example 2:
Input: s = "textbook"
Output: false
Explanation: a = "text" and b = "book". a has 1 vowel whereas b has 2. Therefore, they are not alike.

Notice that the vowel o is counted twice.


Example 3:
Input: s = "MerryChristmas"
Output: false

Example 4:
Input: s = "AbCdEfGh"
Output: true

Constraints:
`2 <= s.length <= 1000`
`s.length` is even.

`s` consists of uppercase and lowercase letters.', false, 'Easy', '/articles/determine-if-string-halves-are-alike', 78.9, 
   0.9, 'https://leetcode.com/problems/determine-if-string-halves-are-alike', 599, 50.1, 62.9, '[]'::jsonb, '[]'::jsonb, 
   261, 24, 92, false, '[]'::jsonb, true),
  (1705, 'Maximum Number of Eaten Apples', 'There is a special kind of apple tree that grows apples every day for `n` days. On the `ith` day, the tree grows `apples[i]` apples that will rot after `days[i]` days, that is on day `i + days[i]` the apples will be rotten and cannot be eaten. On some days, the apple tree does not grow any apples, which are denoted by `apples[i] == 0` and `days[i] == 0`.

You decided to eat at most one apple a day (to keep the doctors away). Note that you can keep eating after the first `n` days.

Given two integer arrays `days` and `apples` of length `n`, return the maximum number of apples you can eat.


Example 1:
Input: apples = [1,2,3,5,2], days = [3,2,1,4,2]
Output: 7
Explanation: You can eat 7 apples:
- On the first day, you eat an apple that grew on the first day.

- On the second day, you eat an apple that grew on the second day.

- On the third day, you eat an apple that grew on the second day. After this day, the apples that grew on the third day rot.

- On the fourth to the seventh days, you eat apples that grew on the fourth day.


Example 2:
Input: apples = [3,0,0,0,0,2], days = [3,0,0,0,0,2]
Output: 5
Explanation: You can eat 5 apples:
- On the first to the third day you eat apples that grew on the first day.

- Do nothing on the fouth and fifth days.

- On the sixth and seventh days you eat apples that grew on the sixth day.


Constraints:
`apples.length == n`
`days.length == n`
`1 <= n <= 2 * 104`
`0 <= apples[i], days[i] <= 2 * 104`
`days[i] = 0` if and only if `apples[i] = 0`.', false, 'Medium', '/articles/maximum-number-of-eaten-apples', 41.8, 
   9.7, 'https://leetcode.com/problems/maximum-number-of-eaten-apples', 156, 11, 26.3, '["Uber"]'::jsonb, '["Heap,Greedy"]'::jsonb, 
   266, 121, 69, false, '[]'::jsonb, true),
  (1706, 'Where Will the Ball Fall', 'You have a 2-D `grid` of size `m x n` representing a box, and you have `n` balls. The box is open on the top and bottom sides.

Each cell in the box has a diagonal board spanning two corners of the cell that can redirect a ball to the right or to the left.

A board that redirects the ball to the right spans the top-left corner to the bottom-right corner and is represented in the grid as `1`.

A board that redirects the ball to the left spans the top-right corner to the bottom-left corner and is represented in the grid as `-1`.

We drop one ball at the top of each column of the box. Each ball can get stuck in the box or fall out of the bottom. A ball gets stuck if it hits a "V" shaped pattern between two boards or if a board redirects the ball into either wall of the box.

Return an array `answer` of size `n` where `answer[i]` is the column that the ball falls out of at the bottom after dropping the ball from the `ith` column at the top, or `-1` if the ball gets stuck in the box.


Example 1:
Input: grid = [[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]
Output: [1,-1,-1,-1,-1]
Explanation: This example is shown in the photo.

Ball b0 is dropped at column 0 and falls out of the box at column 1.

Ball b1 is dropped at column 1 and will get stuck in the box between column 2 and 3 and row 1.

Ball b2 is dropped at column 2 and will get stuck on the box between column 2 and 3 and row 0.

Ball b3 is dropped at column 3 and will get stuck on the box between column 2 and 3 and row 0.

Ball b4 is dropped at column 4 and will get stuck on the box between column 2 and 3 and row 1.


Example 2:
Input: grid = [[-1]]
Output: [-1]
Explanation: The ball gets stuck against the left wall.


Example 3:
Input: grid = [[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1]]
Output: [0,1,2,3,4,-1]

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 100`
`grid[i][j]` is `1` or `-1`.', false, 'Medium', NULL, 60.4, 
   12.4, 'https://leetcode.com/problems/where-will-the-ball-fall', 216, 8.3, 13.8, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   240, 22, 92, true, '[]'::jsonb, true),
  (1707, 'Maximum XOR With an Element From Array', 'You are given an array `nums` consisting of non-negative integers. You are also given a `queries` array, where `queries[i] = [xi, mi]`.

The answer to the `ith` query is the maximum bitwise `XOR` value of `xi` and any element of `nums` that does not exceed `mi`. In other words, the answer is `max(nums[j] XOR xi)` for all `j` such that `nums[j] <= mi`. If all elements in `nums` are larger than `mi`, then the answer is `-1`.

Return an integer array `answer` where `answer.length == queries.length` and `answer[i]` is the answer to the `ith` query.


Example 1:
Input: nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
Output: [3,3,7]
Explanation:
1) 0 and 1 are the only two integers not greater than 1. 0 XOR 3 = 3 and 1 XOR 3 = 2. The larger of the two is 3.

2) 1 XOR 2 = 3.

3) 5 XOR 2 = 7.


Example 2:
Input: nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]
Output: [15,-1,5]

Constraints:
`1 <= nums.length, queries.length <= 105`
`queries[i].length == 2`
`0 <= nums[j], xi, mi <= 109`', false, 'Hard', NULL, 46.4, 
   7.8, 'https://leetcode.com/problems/maximum-xor-with-an-element-from-array', 69, 5.1, 10.9, '["Google"]'::jsonb, '["Bit Manipulation,Trie"]'::jsonb, 
   190, 10, 95, true, '[]'::jsonb, true),
  (1708, 'Largest Subarray Length K', 'An array `A` is larger than some array `B` if for the first index `i` where `A[i] != B[i]`, `A[i] > B[i]`.

For example, consider `0`-indexing:
`[1,3,2,4] > [1,2,2,4]`, since at index `1`, `3 > 2`.

`[1,4,4,4] < [2,1,1,1]`, since at index `0`, `1 < 2`.

A subarray is a contiguous subsequence of the array.

Given an integer array `nums` of distinct integers, return the largest subarray of `nums` of length `k`.


Example 1:
Input: nums = [1,4,5,2,3], k = 3
Output: [5,2,3]
Explanation: The subarrays of size 3 are: [1,4,5], [4,5,2], and [5,2,3].

Of these, [5,2,3] is the largest.


Example 2:
Input: nums = [1,4,5,2,3], k = 4
Output: [4,5,2,3]
Explanation: The subarrays of size 4 are: [1,4,5,2], and [4,5,2,3].

Of these, [4,5,2,3] is the largest.


Example 3:
Input: nums = [1,4,5,2,3], k = 1
Output: [5]

Constraints:
`1 <= k <= nums.length <= 105`
`1 <= nums[i] <= 109`
All the integers of `nums` are unique.

Follow up: What if the integers in `nums` are not distinct?', true, 'Easy', NULL, 62.9, 
   0, 'https://leetcode.com/problems/largest-subarray-length-k', 59, 2.5, 4, '["Google"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   30, 49, 38, true, '[]'::jsonb, true),
  (1709, 'Biggest Window Between Visits', 'SQL Schema', true, 'Medium', NULL, 82.8, 
   0, 'https://leetcode.com/problems/biggest-window-between-visits', 88, 3.1, 3.7, '[]'::jsonb, '[]'::jsonb, 
   44, 1, 98, false, '[]'::jsonb, true),
  (1710, 'Maximum Units on a Truck', 'You are assigned to put some amount of boxes onto one truck. You are given a 2D array `boxTypes`, where `boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi]`:
`numberOfBoxesi` is the number of boxes of type `i`.

`numberOfUnitsPerBoxi` is the number of units in each box of the type `i`.

You are also given an integer `truckSize`, which is the maximum number of boxes that can be put on the truck. You can choose any boxes to put on the truck as long as the number of boxes does not exceed `truckSize`.

Return the maximum total number of units that can be put on the truck.


Example 1:
Input: boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
Output: 8
Explanation: There are:
- 1 box of the first type that contains 3 units.

- 2 boxes of the second type that contain 2 units each.

- 3 boxes of the third type that contain 1 unit each.

You can take all the boxes of the first and second types, and one box of the third type.

The total number of units will be = (1 * 3) + (2 * 2) + (1 * 1) = 8.


Example 2:
Input: boxTypes = [[5,10],[2,5],[4,7],[3,9]], truckSize = 10
Output: 91

Constraints:
`1 <= boxTypes.length <= 1000`
`1 <= numberOfBoxesi, numberOfUnitsPerBoxi <= 1000`
`1 <= truckSize <= 106`', false, 'Easy', '/articles/maximum-units-on-a-truck', 69.9, 
   39.5, 'https://leetcode.com/problems/maximum-units-on-a-truck', 273, 28.3, 40.5, '["Amazon,Roblox"]'::jsonb, '["Greedy,Sort"]'::jsonb, 
   276, 22, 93, true, '[]'::jsonb, true),
  (1711, 'Count Good Meals', 'A good meal is a meal that contains exactly two different food items with a sum of deliciousness equal to a power of two.

You can pick any two different foods to make a good meal.

Given an array of integers `deliciousness` where `deliciousness[i]` is the deliciousness of the `i​​​​​​th​​​​`​​​​ item of food, return the number of different good meals you can make from this list modulo `109 + 7`.

Note that items with different indices are considered different even if they have the same deliciousness value.


Example 1:
Input: deliciousness = [1,3,5,7,9]
Output: 4
Explanation: The good meals are (1,3), (1,7), (3,5) and, (7,9).

Their respective sums are 4, 8, 8, and 16, all of which are powers of 2.


Example 2:
Input: deliciousness = [1,1,1,3,3,3,7]
Output: 15
Explanation: The good meals are (1,1) with 3 ways, (1,3) with 9 ways, and (1,7) with 3 ways.


Constraints:
`1 <= deliciousness.length <= 105`
`0 <= deliciousness[i] <= 220`', false, 'Medium', NULL, 26.2, 
   8.6, 'https://leetcode.com/problems/count-good-meals', 188, 12.5, 47.6, '["Adobe"]'::jsonb, '["Array,Hash Table,Two Pointers"]'::jsonb, 
   218, 135, 62, false, '[]'::jsonb, true),
  (1712, 'Ways to Split Array Into Three Subarrays', 'A split of an integer array is good if:
The array is split into three non-empty contiguous subarrays - named `left`, `mid`, `right` respectively from left to right.

The sum of the elements in `left` is less than or equal to the sum of the elements in `mid`, and the sum of the elements in `mid` is less than or equal to the sum of the elements in `right`.

Given `nums`, an array of non-negative integers, return the number of good ways to split `nums`. As the number may be too large, return it modulo `109 + 7`.


Example 1:
Input: nums = [1,1,1]
Output: 1
Explanation: The only good way to split nums is [1] [1] [1].


Example 2:
Input: nums = [1,2,2,2,5,0]
Output: 3
Explanation: There are three good ways of splitting nums:
[1] [2] [2,2,5,0]
[1] [2,2] [2,5,0]
[1,2] [2,2] [5,0]

Example 3:
Input: nums = [3,2,1]
Output: 0
Explanation: There is no good way to split nums.


Constraints:
`3 <= nums.length <= 105`
`0 <= nums[i] <= 104`', false, 'Medium', '/articles/ways-to-split-array-into-three-subarrays', 29.3, 
   21.9, 'https://leetcode.com/problems/ways-to-split-array-into-three-subarrays', 91, 8.1, 27.8, '["Robinhood"]'::jsonb, '["Two Pointers,Binary Search"]'::jsonb, 
   348, 39, 90, false, '[]'::jsonb, true),
  (1713, 'Minimum Operations to Make a Subsequence', 'You are given an array `target` that consists of distinct integers and another integer array `arr` that can have duplicates.

In one operation, you can insert any integer at any position in `arr`. For example, if `arr = [1,4,1,2]`, you can add `3` in the middle and make it `[1,4,3,1,2]`. Note that you can insert the integer at the very beginning or end of the array.

Return the minimum number of operations needed to make `target` a subsequence of `arr`.

A subsequence of an array is a new array generated from the original array by deleting some elements (possibly none) without changing the remaining elements'' relative order. For example, `[2,7,4]` is a subsequence of `[4,2,3,7,2,1,4]` (the underlined elements), while `[2,4,2]` is not.


Example 1:
Input: target = [5,1,3], `arr` = [9,4,2,3,4]
Output: 2
Explanation: You can add 5 and 1 in such a way that makes `arr` = [5,9,4,1,2,3,4], then target will be a subsequence of `arr`.


Example 2:
Input: target = [6,4,8,1,3,2], `arr` = [4,7,6,2,3,8,6,1]
Output: 3

Constraints:
`1 <= target.length, arr.length <= 105`
`1 <= target[i], arr[i] <= 109`
`target` contains no duplicates.', false, 'Hard', NULL, 45.6, 
   29.8, 'https://leetcode.com/problems/minimum-operations-to-make-a-subsequence', 62, 3.9, 8.5, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   223, 3, 99, true, '[]'::jsonb, true),
  (1714, 'Sum Of Special Evenly-Spaced Elements In Array', 'You are given a 0-indexed integer array `nums` consisting of `n` non-negative integers.

You are also given an array `queries`, where `queries[i] = [xi, yi]`. The answer to the `ith` query is the sum of all `nums[j]` where `xi <= j < n` and `(j - xi)` is divisible by `yi`.

Return an array `answer` where `answer.length == queries.length` and `answer[i]` is the answer to the `ith` query modulo `109 + 7`.


Example 1:
Input: nums = [0,1,2,3,4,5,6,7], queries = [[0,3],[5,1],[4,2]]
Output: [9,18,10]
Explanation: The answers of the queries are as follows:
1) The j indices that satisfy this query are 0, 3, and 6. nums[0] + nums[3] + nums[6] = 9
2) The j indices that satisfy this query are 5, 6, and 7. nums[5] + nums[6] + nums[7] = 18
3) The j indices that satisfy this query are 4 and 6. nums[4] + nums[6] = 10

Example 2:
Input: nums = [100,200,101,201,102,202,103,203], queries = [[0,7]]
Output: [303]

Constraints:
`n == nums.length`
`1 <= n <= 5 * 104`
`0 <= nums[i] <= 109`
`1 <= queries.length <= 1.5 * 105`
`0 <= xi < n`
`1 <= yi <= 5 * 104`', true, 'Hard', NULL, 48.7, 
   0, 'https://leetcode.com/problems/sum-of-special-evenly-spaced-elements-in-array', 9, 525, 1.1, '["MakeMyTrip,Sprinklr"]'::jsonb, '[]'::jsonb, 
   10, 8, 56, false, '[]'::jsonb, true),
  (1715, 'Count Apples and Oranges', 'SQL Schema', true, 'Medium', NULL, 79.5, 
   0, 'https://leetcode.com/problems/count-apples-and-oranges', 91, 2.9, 3.7, '[]'::jsonb, '[]'::jsonb, 
   28, 3, 90, false, '[]'::jsonb, true),
  (1716, 'Calculate Money in Leetcode Bank', 'Hercy wants to save money for his first car. He puts money in the Leetcode bank every day.

He starts by putting in `$1` on Monday, the first day. Every day from Tuesday to Sunday, he will put in `$1` more than the day before. On every subsequent Monday, he will put in `$1` more than the previous Monday. 
Given `n`, return the total amount of money he will have in the Leetcode bank at the end of the `nth` day.


Example 1:
Input: n = 4
Output: 10
Explanation: After the 4th day, the total is 1 + 2 + 3 + 4 = 10.


Example 2:
Input: n = 10
Output: 37
Explanation: After the 10th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4) = 37. Notice that on the 2nd Monday, Hercy only puts in $2.


Example 3:
Input: n = 20
Output: 96
Explanation: After the 20th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4 + 5 + 6 + 7 + 8) + (3 + 4 + 5 + 6 + 7 + 8) = 96.


Constraints:
`1 <= n <= 1000`', false, 'Easy', NULL, 65.4, 
   0.6, 'https://leetcode.com/problems/calculate-money-in-leetcode-bank', 353, 15.6, 23.8, '["edabit"]'::jsonb, '["Math,Greedy"]'::jsonb, 
   215, 6, 97, false, '[]'::jsonb, true),
  (1717, 'Maximum Score From Removing Substrings', 'You are given a string `s` and two integers `x` and `y`. You can perform two types of operations any number of times.

Remove substring `"ab"` and gain `x` points.

	
For example, when removing `"ab"` from `"cabxbae"` it becomes `"cxbae"`.

Remove substring `"ba"` and gain `y` points.

	
For example, when removing `"ba"` from `"cabxbae"` it becomes `"cabxe"`.

Return the maximum points you can gain after applying the above operations on `s`.


Example 1:
Input: s = "cdbcbbaaabab", x = 4, y = 5
Output: 19
Explanation:
- Remove the "ba" underlined in "cdbcbbaaabab". Now, s = "cdbcbbaaab" and 5 points are added to the score.

- Remove the "ab" underlined in "cdbcbbaaab". Now, s = "cdbcbbaa" and 4 points are added to the score.

- Remove the "ba" underlined in "cdbcbbaa". Now, s = "cdbcba" and 5 points are added to the score.

- Remove the "ba" underlined in "cdbcba". Now, s = "cdbc" and 5 points are added to the score.

Total score = 5 + 4 + 5 + 5 = 19.


Example 2:
Input: s = "aabbaaxybbaabb", x = 5, y = 4
Output: 20

Constraints:
`1 <= s.length <= 105`
`1 <= x, y <= 104`
`s` consists of lowercase English letters.', false, 'Medium', NULL, 40.8, 
   3.1, 'https://leetcode.com/problems/maximum-score-from-removing-substrings', 156, 5.5, 13.5, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   220, 15, 94, true, '[]'::jsonb, true),
  (1718, 'Construct the Lexicographically Largest Valid Sequence', 'Given an integer `n`, find a sequence that satisfies all of the following:
The integer `1` occurs once in the sequence.

Each integer between `2` and `n` occurs twice in the sequence.

For every integer `i` between `2` and `n`, the distance between the two occurrences of `i` is exactly `i`.

The distance between two numbers on the sequence, `a[i]` and `a[j]`, is the absolute difference of their indices, `|j - i|`.

Return the lexicographically largest sequence. It is guaranteed that under the given constraints, there is always a solution. 
A sequence `a` is lexicographically larger than a sequence `b` (of the same length) if in the first position where `a` and `b` differ, sequence `a` has a number greater than the corresponding number in `b`. For example, `[0,1,9,0]` is lexicographically larger than `[0,1,5,6]` because the first position they differ is at the third number, and `9` is greater than `5`.


Example 1:
Input: n = 3
Output: [3,1,2,3,2]
Explanation: [2,3,2,1,3] is also a valid sequence, but [3,1,2,3,2] is the lexicographically largest valid sequence.


Example 2:
Input: n = 5
Output: [5,3,1,4,3,5,2,4,2]

Constraints:
`1 <= n <= 20`', false, 'Medium', NULL, 46.3, 
   5, 'https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence', 81, 4.7, 10.1, '["Salesforce"]'::jsonb, '["Backtracking,Recursion"]'::jsonb, 
   198, 14, 93, false, '[]'::jsonb, true),
  (1719, 'Number Of Ways To Reconstruct A Tree', 'You are given an array `pairs`, where `pairs[i] = [xi, yi]`, and:
There are no duplicates.

`xi < yi`
Let `ways` be the number of rooted trees that satisfy the following conditions:
The tree consists of nodes whose values appeared in `pairs`.

A pair `[xi, yi]` exists in `pairs` if and only if `xi` is an ancestor of `yi` or `yi` is an ancestor of `xi`.

Note: the tree does not have to be a binary tree.

Two ways are considered to be different if there is at least one node that has different parents in both ways.

Return:
`0` if `ways == 0`
`1` if `ways == 1`
`2` if `ways > 1`
A rooted tree is a tree that has a single root node, and all edges are oriented to be outgoing from the root.

An ancestor of a node is any node on the path from the root to that node (excluding the node itself). The root has no ancestors.


Example 1:
Input: pairs = [[1,2],[2,3]]
Output: 1
Explanation: There is exactly one valid rooted tree, which is shown in the above figure.


Example 2:
Input: pairs = [[1,2],[2,3],[1,3]]
Output: 2
Explanation: There are multiple valid rooted trees. Three of them are shown in the above figures.


Example 3:
Input: pairs = [[1,2],[2,3],[2,4],[1,5]]
Output: 0
Explanation: There are no valid rooted trees.


Constraints:
`1 <= pairs.length <= 105`
`1 <= xi < yi <= 500`
The elements in `pairs` are unique.', false, 'Hard', NULL, 39.5, 
   12.3, 'https://leetcode.com/problems/number-of-ways-to-reconstruct-a-tree', 25, 1.5, 3.8, '["Uber"]'::jsonb, '["Tree,Graph"]'::jsonb, 
   64, 46, 58, false, '[]'::jsonb, true),
  (1720, 'Decode XORed Array', 'There is a hidden integer array `arr` that consists of `n` non-negative integers.

It was encoded into another integer array `encoded` of length `n - 1`, such that `encoded[i] = arr[i] XOR arr[i + 1]`. For example, if `arr = [1,0,2,1]`, then `encoded = [1,2,3]`.

You are given the `encoded` array. You are also given an integer `first`, that is the first element of `arr`, i.e. `arr[0]`.

Return the original array `arr`. It can be proved that the answer exists and is unique.


Example 1:
Input: encoded = [1,2,3], first = 1
Output: [1,0,2,1]
Explanation: If arr = [1,0,2,1], then first = 1 and encoded = [1 XOR 0, 0 XOR 2, 2 XOR 1] = [1,2,3]

Example 2:
Input: encoded = [6,2,7,3], first = 4
Output: [4,2,0,7,4]

Constraints:
`2 <= n <= 104`
`encoded.length == n - 1`
`0 <= encoded[i] <= 105`
`0 <= first <= 105`', false, 'Easy', NULL, 85.1, 
   3.7, 'https://leetcode.com/problems/decode-xored-array', 255, 24, 28.2, '[]'::jsonb, '[]'::jsonb, 
   209, 34, 86, false, '[]'::jsonb, true),
  (1721, 'Swapping Nodes in a Linked List', 'You are given the `head` of a linked list, and an integer `k`.

Return the head of the linked list after swapping the values of the `kth` node from the beginning and the `kth` node from the end (the list is 1-indexed).


Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]

Example 2:
Input: head = [7,9,6,6,7,8,3,0,9,5], k = 5
Output: [7,9,6,6,8,7,3,0,9,5]

Example 3:
Input: head = [1], k = 1
Output: [1]

Example 4:
Input: head = [1,2], k = 1
Output: [2,1]

Example 5:
Input: head = [1,2,3], k = 2
Output: [1,2,3]

Constraints:
The number of nodes in the list is `n`.

`1 <= k <= n <= 105`
`0 <= Node.val <= 100`', false, 'Medium', '/articles/swapping-nodes-in-a-linked-list', 67.6, 
   1, 'https://leetcode.com/problems/swapping-nodes-in-a-linked-list', 413, 44.6, 66, '["Amazon"]'::jsonb, '["Linked List"]'::jsonb, 
   472, 35, 93, true, '[]'::jsonb, true),
  (1722, 'Minimize Hamming Distance After Swap Operations', 'You are given two integer arrays, `source` and `target`, both of length `n`. You are also given an array `allowedSwaps` where each `allowedSwaps[i] = [ai, bi]` indicates that you are allowed to swap the elements at index `ai` and index `bi` (0-indexed) of array `source`. Note that you can swap elements at a specific pair of indices multiple times and in any order.

The Hamming distance of two arrays of the same length, `source` and `target`, is the number of positions where the elements are different. Formally, it is the number of indices `i` for `0 <= i <= n-1` where `source[i] != target[i]` (0-indexed).

Return the minimum Hamming distance of `source` and `target` after performing any amount of swap operations on array `source`.


Example 1:
Input: source = [1,2,3,4], target = [2,1,4,5], allowedSwaps = [[0,1],[2,3]]
Output: 1
Explanation: source can be transformed the following way:
- Swap indices 0 and 1: source = [2,1,3,4]
- Swap indices 2 and 3: source = [2,1,4,3]
The Hamming distance of source and target is 1 as they differ in 1 position: index 3.


Example 2:
Input: source = [1,2,3,4], target = [1,3,2,4], allowedSwaps = []
Output: 2
Explanation: There are no allowed swaps.

The Hamming distance of source and target is 2 as they differ in 2 positions: index 1 and index 2.


Example 3:
Input: source = [5,1,2,4,3], target = [1,5,4,2,3], allowedSwaps = [[0,4],[4,2],[1,3],[1,4]]
Output: 0

Constraints:
`n == source.length == target.length`
`1 <= n <= 105`
`1 <= source[i], target[i] <= 105`
`0 <= allowedSwaps.length <= 105`
`allowedSwaps[i].length == 2`
`0 <= ai, bi <= n - 1`
`ai != bi`', false, 'Medium', NULL, 54.1, 
   19.9, 'https://leetcode.com/problems/minimize-hamming-distance-after-swap-operations', 113, 9, 16.5, '["Google"]'::jsonb, '["Greedy,Depth-first Search,Union Find"]'::jsonb, 
   333, 11, 97, true, '[]'::jsonb, true),
  (1723, 'Find Minimum Time to Finish All Jobs', 'You are given an integer array `jobs`, where `jobs[i]` is the amount of time it takes to complete the `ith` job.

There are `k` workers that you can assign jobs to. Each job should be assigned to exactly one worker. The working time of a worker is the sum of the time it takes to complete all jobs assigned to them. Your goal is to devise an optimal assignment such that the maximum working time of any worker is minimized.

Return the minimum possible maximum working time of any assignment. 

Example 1:
Input: jobs = [3,2,3], k = 3
Output: 3
Explanation: By assigning each person one job, the maximum time is 3.


Example 2:
Input: jobs = [1,2,4,7,8], k = 2
Output: 11
Explanation: Assign the jobs the following way:
Worker 1: 1, 2, 8 (working time = 1 + 2 + 8 = 11)
Worker 2: 4, 7 (working time = 4 + 7 = 11)
The maximum working time is 11.


Constraints:
`1 <= k <= jobs.length <= 12`
`1 <= jobs[i] <= 107`', false, 'Hard', NULL, 43.7, 
   5.7, 'https://leetcode.com/problems/find-minimum-time-to-finish-all-jobs', 77, 7.7, 17.6, '["Amazon"]'::jsonb, '["Backtracking,Recursion"]'::jsonb, 
   211, 10, 95, true, '[]'::jsonb, true),
  (1724, 'Checking Existence of Edge Length Limited Paths II', 'An undirected graph of `n` nodes is defined by `edgeList`, where `edgeList[i] = [ui, vi, disi]` denotes an edge between nodes `ui` and `vi` with distance `disi`. Note that there may be multiple edges between two nodes, and the graph may not be connected.

Implement the `DistanceLimitedPathsExist` class:
`DistanceLimitedPathsExist(int n, int[][] edgeList)` Initializes the class with an undirected graph.

`boolean query(int p, int q, int limit)` Returns `true` if there exists a path from `p` to `q` such that each edge on the path has a distance strictly less than `limit`, and otherwise `false`.


Example 1:
Input
["DistanceLimitedPathsExist", "query", "query", "query", "query"]
[[6, [[0, 2, 4], [0, 3, 2], [1, 2, 3], [2, 3, 1], [4, 5, 5]]], [2, 3, 2], [1, 3, 3], [2, 0, 3], [0, 5, 6]]
Output
[null, true, false, true, false]
Explanation
DistanceLimitedPathsExist distanceLimitedPathsExist = new DistanceLimitedPathsExist(6, [[0, 2, 4], [0, 3, 2], [1, 2, 3], [2, 3, 1], [4, 5, 5]]);
distanceLimitedPathsExist.query(2, 3, 2); // return true. There is an edge from 2 to 3 of distance 1, which is less than 2.

distanceLimitedPathsExist.query(1, 3, 3); // return false. There is no way to go from 1 to 3 with distances strictly less than 3.

distanceLimitedPathsExist.query(2, 0, 3); // return true. There is a way to go from 2 to 0 with distance < 3: travel from 2 to 3 to 0.

distanceLimitedPathsExist.query(0, 5, 6); // return false. There are no paths from 0 to 5.


`Constraints:`
`2 <= n <= 104`
`0 <= edgeList.length <= 104`
`edgeList[i].length == 3`
`0 <= ui, vi, p, q <= n-1`
`ui != vi`
`p != q`
`1 <= disi, limit <= 109`
At most `104` calls will be made to `query`.', true, 'Hard', NULL, 58, 
   0, 'https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths-ii', 20, 888, 1.5, '["Google"]'::jsonb, '["Dynamic Programming,Union Find,Graph"]'::jsonb, 
   17, 2, 89, true, '[]'::jsonb, true),
  (1725, 'Number Of Rectangles That Can Form The Largest Square', 'You are given an array `rectangles` where `rectangles[i] = [li, wi]` represents the `ith` rectangle of length `li` and width `wi`.

You can cut the `ith` rectangle to form a square with a side length of `k` if both `k <= li` and `k <= wi`. For example, if you have a rectangle `[4,6]`, you can cut it to get a square with a side length of at most `4`.

Let `maxLen` be the side length of the largest square you can obtain from any of the given rectangles.

Return the number of rectangles that can make a square with a side length of `maxLen`.


Example 1:
Input: rectangles = [[5,8],[3,9],[5,12],[16,5]]
Output: 3
Explanation: The largest squares you can get from each rectangle are of lengths [5,3,5,5].

The largest possible square is of length 5, and you can get it out of 3 rectangles.


Example 2:
Input: rectangles = [[2,3],[3,7],[4,3],[3,7]]
Output: 3

Constraints:
`1 <= rectangles.length <= 1000`
`rectangles[i].length == 2`
`1 <= li, wi <= 109`
`li != wi`', false, 'Easy', NULL, 78, 
   0.5, 'https://leetcode.com/problems/number-of-rectangles-that-can-form-the-largest-square', 289, 19.5, 25, '["AllinCall"]'::jsonb, '["Greedy"]'::jsonb, 
   141, 17, 89, false, '[]'::jsonb, true),
  (1726, 'Tuple with Same Product', 'Given an array `nums` of distinct positive integers, return the number of tuples `(a, b, c, d)` such that `a * b = c * d` where `a`, `b`, `c`, and `d` are elements of `nums`, and `a != b != c != d`.


Example 1:
Input: nums = [2,3,4,6]
Output: 8
Explanation: There are 8 valid tuples:
(2,6,3,4) , (2,6,4,3) , (6,2,3,4) , (6,2,4,3)
(3,4,2,6) , (4,3,2,6) , (3,4,6,2) , (4,3,6,2)

Example 2:
Input: nums = [1,2,4,5,10]
Output: 16
Explanation: There are 16 valids tuples:
(1,10,2,5) , (1,10,5,2) , (10,1,2,5) , (10,1,5,2)
(2,5,1,10) , (2,5,10,1) , (5,2,1,10) , (5,2,10,1)
(2,10,4,5) , (2,10,5,4) , (10,2,4,5) , (10,2,4,5)
(4,5,2,10) , (4,5,10,2) , (5,4,2,10) , (5,4,10,2)

Example 3:
Input: nums = [2,3,4,6,8,12]
Output: 40

Example 4:
Input: nums = [2,3,5,7]
Output: 0

Constraints:
`1 <= nums.length <= 1000`
`1 <= nums[i] <= 104`
All elements in `nums` are distinct.', false, 'Medium', NULL, 56.7, 
   0, 'https://leetcode.com/problems/tuple-with-same-product', 171, 11.8, 20.8, '["Google"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   208, 11, 95, true, '[]'::jsonb, true),
  (1727, 'Largest Submatrix With Rearrangements', 'You are given a binary matrix `matrix` of size `m x n`, and you are allowed to rearrange the columns of the `matrix` in any order.

Return the area of the largest submatrix within `matrix` where every element of the submatrix is `1` after reordering the columns optimally.


Example 1:
Input: matrix = [[0,0,1],[1,1,1],[1,0,1]]
Output: 4
Explanation: You can rearrange the columns as shown above.

The largest submatrix of 1s, in bold, has an area of 4.


Example 2:
Input: matrix = [[1,0,1,0,1]]
Output: 3
Explanation: You can rearrange the columns as shown above.

The largest submatrix of 1s, in bold, has an area of 3.


Example 3:
Input: matrix = [[1,1,0],[1,0,1]]
Output: 2
Explanation: Notice that you must rearrange entire columns, and there is no way to make a submatrix of 1s larger than an area of 2.


Example 4:
Input: matrix = [[0,0],[0,0]]
Output: 0
Explanation: As there are no 1s, no submatrix of 1s can be formed and the area is 0.


Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m * n <= 105`
`matrix[i][j]` is `0` or `1`.', false, 'Medium', NULL, 58.8, 
   2.7, 'https://leetcode.com/problems/largest-submatrix-with-rearrangements', 123, 7.2, 12.3, '["Google,Directi"]'::jsonb, '["Greedy,Sort"]'::jsonb, 
   346, 11, 97, true, '[]'::jsonb, true),
  (1728, 'Cat and Mouse II', 'A game is played by a cat and a mouse named Cat and Mouse.

The environment is represented by a `grid` of size `rows x cols`, where each element is a wall, floor, player (Cat, Mouse), or food.

Players are represented by the characters `''C''`(Cat)`,''M''`(Mouse).

Floors are represented by the character `''.''` and can be walked on.

Walls are represented by the character `''#''` and cannot be walked on.

Food is represented by the character `''F''` and can be walked on.

There is only one of each character `''C''`, `''M''`, and `''F''` in `grid`.

Mouse and Cat play according to the following rules:
Mouse moves first, then they take turns to move.

During each turn, Cat and Mouse can jump in one of the four directions (left, right, up, down). They cannot jump over the wall nor outside of the `grid`.

`catJump, mouseJump` are the maximum lengths Cat and Mouse can jump at a time, respectively. Cat and Mouse can jump less than the maximum length.

Staying in the same position is allowed.

Mouse can jump over Cat.

The game can end in 4 ways:
If Cat occupies the same position as Mouse, Cat wins.

If Cat reaches the food first, Cat wins.

If Mouse reaches the food first, Mouse wins.

If Mouse cannot get to the food within 1000 turns, Cat wins.

Given a `rows x cols` matrix `grid` and two integers `catJump` and `mouseJump`, return `true` if Mouse can win the game if both Cat and Mouse play optimally, otherwise return `false`.


Example 1:
Input: grid = ["####F","#C...","M...."], catJump = 1, mouseJump = 2
Output: true
Explanation: Cat cannot catch Mouse on its turn nor can it get the food before Mouse.


Example 2:
Input: grid = ["M.C...F"], catJump = 1, mouseJump = 4
Output: true

Example 3:
Input: grid = ["M.C...F"], catJump = 1, mouseJump = 3
Output: false

Example 4:
Input: grid = ["C...#","...#F","....#","M...."], catJump = 2, mouseJump = 5
Output: false

Example 5:
Input: grid = [".M...","..#..","#..#.","C#.#.","...#F"], catJump = 3, mouseJump = 1
Output: true

Constraints:
`rows == grid.length`
`cols = grid[i].length`
`1 <= rows, cols <= 8`
`grid[i][j]` consist only of characters `''C''`, `''M''`, `''F''`, `''.''`, and `''#''`.

There is only one of each character `''C''`, `''M''`, and `''F''` in `grid`.

`1 <= catJump, mouseJump <= 8`', false, 'Hard', NULL, 41, 
   0, 'https://leetcode.com/problems/cat-and-mouse-ii', 40, 3, 7.3, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   79, 18, 81, true, '[]'::jsonb, true),
  (1729, 'Find Followers Count', 'SQL Schema', true, 'Easy', NULL, 71.2, 
   0, 'https://leetcode.com/problems/find-followers-count', 39, 3.5, 4.9, '["Tesla"]'::jsonb, '[]'::jsonb, 
   18, 6, 75, false, '[]'::jsonb, true),
  (1730, 'Shortest Path to Get Food', 'You are starving and you want to eat food as quickly as possible. You want to find the shortest path to arrive at any food cell.

You are given an `m x n` character matrix, `grid`, of these different types of cells:
`''*''` is your location. There is exactly one `''*''` cell.

`''#''` is a food cell. There may be multiple food cells.

`''O''` is free space, and you can travel through these cells.

`''X''` is an obstacle, and you cannot travel through these cells.

You can travel to any adjacent cell north, east, south, or west of your current location if there is not an obstacle.

Return the length of the shortest path for you to reach any food cell. If there is no path for you to reach food, return `-1`.


Example 1:
Input: grid = [["X","X","X","X","X","X"],["X","*","O","O","O","X"],["X","O","O","#","O","X"],["X","X","X","X","X","X"]]
Output: 3
Explanation: It takes 3 steps to reach the food.


Example 2:
Input: grid = [["X","X","X","X","X"],["X","*","X","O","X"],["X","O","X","#","X"],["X","X","X","X","X"]]
Output: -1
Explanation: It is not possible to reach the food.


Example 3:
Input: grid = [["X","X","X","X","X","X","X","X"],["X","*","O","X","O","#","O","X"],["X","O","O","X","O","O","X","X"],["X","O","O","O","O","#","O","X"],["X","X","X","X","X","X","X","X"]]
Output: 6
Explanation: There can be multiple food cells. It only takes 6 steps to reach the bottom food.


Example 4:
Input: grid = [["O","*"],["#","O"]]
Output: 2

Example 5:
Input: grid = [["X","*"],["#","X"]]
Output: -1

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 200`
`grid[row][col]` is `''*''`, `''X''`, `''O''`, or `''#''`.

The `grid` contains exactly one `''*''`.', true, 'Medium', NULL, 56.4, 
   5.5, 'https://leetcode.com/problems/shortest-path-to-get-food', 69, 2.4, 4.3, '["Bloomberg"]'::jsonb, '["Depth-first Search,Breadth-first Search,Graph"]'::jsonb, 
   62, 3, 95, false, '[]'::jsonb, true),
  (1731, 'The Number of Employees Which Report to Each Employee', 'SQL Schema', true, 'Easy', NULL, 49.4, 
   0, 'https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee', 69, 2.8, 5.7, '["CoderByte"]'::jsonb, '[]'::jsonb, 
   27, 5, 84, false, '[]'::jsonb, true),
  (1732, 'Find the Highest Altitude', 'There is a biker going on a road trip. The road trip consists of `n + 1` points at different altitudes. The biker starts his trip on point `0` with altitude equal `0`.

You are given an integer array `gain` of length `n` where `gain[i]` is the net gain in altitude between points `i`​​​​​​ and `i + 1` for all (`0 <= i < n)`. Return the highest altitude of a point.


Example 1:
Input: gain = [-5,1,5,0,-7]
Output: 1
Explanation: The altitudes are [0,-5,-4,1,1,-6]. The highest is 1.


Example 2:
Input: gain = [-4,-3,-2,-1,4,3,2]
Output: 0
Explanation: The altitudes are [0,-4,-7,-9,-10,-6,-3,-1]. The highest is 0.


Constraints:
`n == gain.length`
`1 <= n <= 100`
`-100 <= gain[i] <= 100`', false, 'Easy', NULL, 79.9, 
   5.5, 'https://leetcode.com/problems/find-the-highest-altitude', 393, 27.2, 34.1, '[]'::jsonb, '[]'::jsonb, 
   228, 25, 90, false, '[]'::jsonb, true),
  (1733, 'Minimum Number of People to Teach', 'On a social network consisting of `m` users and some friendships between users, two users can communicate with each other if they know a common language.

You are given an integer `n`, an array `languages`, and an array `friendships` where:
There are `n` languages numbered `1` through `n`,
`languages[i]` is the set of languages the `i​​​​​​th`​​​​ user knows, and
`friendships[i] = [u​​​​​​i​​​, v​​​​​​i]` denotes a friendship between the users `u​​​​​​​​​​​i`​​​​​ and `vi`.

You can choose one language and teach it to some users so that all friends can communicate with each other. Return the minimum number of users you need to teach.

Note that friendships are not transitive, meaning if `x` is a friend of `y` and `y` is a friend of `z`, this doesn''t guarantee that `x` is a friend of `z`.


Example 1:
Input: n = 2, languages = [[1],[2],[1,2]], friendships = [[1,2],[1,3],[2,3]]
Output: 1
Explanation: You can either teach user 1 the second language or user 2 the first language.


Example 2:
Input: n = 3, languages = [[2],[1,3],[1,2],[3]], friendships = [[1,4],[1,2],[3,4],[2,3]]
Output: 2
Explanation: Teach the third language to users 1 and 3, yielding two users to teach.


Constraints:
`2 <= n <= 500`
`languages.length == m`
`1 <= m <= 500`
`1 <= languages[i].length <= n`
`1 <= languages[i][j] <= n`
`1 <= u​​​​​​i < v​​​​​​i <= languages.length`
`1 <= friendships.length <= 500`
All tuples `(u​​​​​i, v​​​​​​i)` are unique
`languages[i]` contains only unique values', false, 'Medium', NULL, 37.6, 
   0, 'https://leetcode.com/problems/minimum-number-of-people-to-teach', 75, 3.9, 10.4, '["Duolingo"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   83, 232, 26, false, '[]'::jsonb, true),
  (1734, 'Decode XORed Permutation', 'There is an integer array `perm` that is a permutation of the first `n` positive integers, where `n` is always odd.

It was encoded into another integer array `encoded` of length `n - 1`, such that `encoded[i] = perm[i] XOR perm[i + 1]`. For example, if `perm = [1,3,2]`, then `encoded = [2,1]`.

Given the `encoded` array, return the original array `perm`. It is guaranteed that the answer exists and is unique.


Example 1:
Input: encoded = [3,1]
Output: [1,2,3]
Explanation: If perm = [1,2,3], then encoded = [1 XOR 2,2 XOR 3] = [3,1]

Example 2:
Input: encoded = [6,5,4,6]
Output: [2,4,1,5,3]

Constraints:
`3 <= n < 105`
`n` is odd.

`encoded.length == n - 1`', false, 'Medium', NULL, 54, 
   11.4, 'https://leetcode.com/problems/decode-xored-permutation', 74, 5.2, 9.7, '["Amazon"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   266, 9, 97, true, '[]'::jsonb, true),
  (1735, 'Count Ways to Make Array With Product', 'You are given a 2D integer array, `queries`. For each `queries[i]`, where `queries[i] = [ni, ki]`, find the number of different ways you can place positive integers into an array of size `ni` such that the product of the integers is `ki`. As the number of ways may be too large, the answer to the `ith` query is the number of ways modulo `109 + 7`.

Return an integer array `answer` where `answer.length == queries.length`, and `answer[i]` is the answer to the `ith` query.


Example 1:
Input: queries = [[2,6],[5,1],[73,660]]
Output: [4,1,50734910]
Explanation: Each query is independent.

[2,6]: There are 4 ways to fill an array of size 2 that multiply to 6: [1,6], [2,3], [3,2], [6,1].

[5,1]: There is 1 way to fill an array of size 5 that multiply to 1: [1,1,1,1,1].

[73,660]: There are 1050734917 ways to fill an array of size 73 that multiply to 660. 1050734917 modulo 109 + 7 = 50734910.


Example 2:
Input: queries = [[1,1],[2,2],[3,3],[4,4],[5,5]]
Output: [1,2,3,10,5]

Constraints:
`1 <= queries.length <= 104 `
`1 <= ni, ki <= 104`', false, 'Hard', NULL, 47.9, 
   0, 'https://leetcode.com/problems/count-ways-to-make-array-with-product', 31, 2.1, 4.4, '["Amazon"]'::jsonb, '["Math"]'::jsonb, 
   92, 20, 82, true, '[]'::jsonb, true),
  (1736, 'Latest Time by Replacing Hidden Digits', 'You are given a string `time` in the form of ` hh:mm`, where some of the digits in the string are hidden (represented by `?`).

The valid times are those inclusively between `00:00` and `23:59`.

Return the latest valid time you can get from `time` by replacing the hidden digits.


Example 1:
Input: time = "2?:?0"
Output: "23:50"
Explanation: The latest hour beginning with the digit ''2'' is 23 and the latest minute ending with the digit ''0'' is 50.


Example 2:
Input: time = "0?:3?"
Output: "09:39"

Example 3:
Input: time = "1?:22"
Output: "19:22"

Constraints:
`time` is in the format `hh:mm`.

It is guaranteed that you can produce a valid time from the given string.', false, 'Easy', NULL, 41.3, 
   2.2, 'https://leetcode.com/problems/latest-time-by-replacing-hidden-digits', 169, 13.4, 32.5, '["Google"]'::jsonb, '["String,Greedy"]'::jsonb, 
   98, 58, 63, true, '[]'::jsonb, true),
  (1737, 'Change Minimum Characters to Satisfy One of Three Conditions', 'You are given two strings `a` and `b` that consist of lowercase letters. In one operation, you can change any character in `a` or `b` to any lowercase letter.

Your goal is to satisfy one of the following three conditions:
Every letter in `a` is strictly less than every letter in `b` in the alphabet.

Every letter in `b` is strictly less than every letter in `a` in the alphabet.

Both `a` and `b` consist of only one distinct letter.

Return the minimum number of operations needed to achieve your goal.


Example 1:
Input: a = "aba", b = "caa"
Output: 2
Explanation: Consider the best way to make each condition true:
1) Change b to "ccc" in 2 operations, then every letter in a is less than every letter in b.

2) Change a to "bbb" and b to "aaa" in 3 operations, then every letter in b is less than every letter in a.

3) Change a to "aaa" and b to "aaa" in 2 operations, then a and b consist of one distinct letter.

The best way was done in 2 operations (either condition 1 or condition 3).


Example 2:
Input: a = "dabadd", b = "cda"
Output: 3
Explanation: The best way is to make condition 1 true by changing b to "eee".


Constraints:
`1 <= a.length, b.length <= 105`
`a` and `b` consist only of lowercase letters.', false, 'Medium', NULL, 29.9, 
   0, 'https://leetcode.com/problems/change-minimum-characters-to-satisfy-one-of-three-conditions', 82, 5.9, 19.8, '["Google"]'::jsonb, '["String,Greedy"]'::jsonb, 
   141, 188, 43, true, '[]'::jsonb, true),
  (1738, 'Find Kth Largest XOR Coordinate Value', 'You are given a 2D `matrix` of size `m x n`, consisting of non-negative integers. You are also given an integer `k`.

The value of coordinate `(a, b)` of the matrix is the XOR of all `matrix[i][j]` where `0 <= i <= a < m` and `0 <= j <= b < n` (0-indexed).

Find the `kth` largest value (1-indexed) of all the coordinates of `matrix`.


Example 1:
Input: matrix = [[5,2],[1,6]], k = 1
Output: 7
Explanation: The value of coordinate (0,1) is 5 XOR 2 = 7, which is the largest value.


Example 2:
Input: matrix = [[5,2],[1,6]], k = 2
Output: 5
Explanation: The value of coordinate (0,0) is 5 = 5, which is the 2nd largest value.


Example 3:
Input: matrix = [[5,2],[1,6]], k = 3
Output: 4
Explanation: The value of coordinate (1,0) is 5 XOR 1 = 4, which is the 3rd largest value.


Example 4:
Input: matrix = [[5,2],[1,6]], k = 4
Output: 0
Explanation: The value of coordinate (1,1) is 5 XOR 2 XOR 1 XOR 6 = 0, which is the 4th largest value.


Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 1000`
`0 <= matrix[i][j] <= 106`
`1 <= k <= m * n`', false, 'Medium', NULL, 62.4, 
   0, 'https://leetcode.com/problems/find-kth-largest-xor-coordinate-value', 120, 8.2, 13.1, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   120, 20, 86, true, '[]'::jsonb, true),
  (1739, 'Building Boxes', 'You have a cubic storeroom where the width, length, and height of the room are all equal to `n` units. You are asked to place `n` boxes in this room where each box is a cube of unit side length. There are however some rules to placing the boxes:
You can place the boxes anywhere on the floor.

If box `x` is placed on top of the box `y`, then each side of the four vertical sides of the box `y` must either be adjacent to another box or to a wall.

Given an integer `n`, return the minimum possible number of boxes touching the floor.


Example 1:
Input: n = 3
Output: 3
Explanation: The figure above is for the placement of the three boxes.

These boxes are placed in the corner of the room, where the corner is on the left side.


Example 2:
Input: n = 4
Output: 3
Explanation: The figure above is for the placement of the four boxes.

These boxes are placed in the corner of the room, where the corner is on the left side.


Example 3:
Input: n = 10
Output: 6
Explanation: The figure above is for the placement of the ten boxes.

These boxes are placed in the corner of the room, where the corner is on the back side.


Constraints:
`1 <= n <= 109`', false, 'Hard', NULL, 49.6, 
   11.2, 'https://leetcode.com/problems/building-boxes', 62, 3.3, 6.7, '["Codenation"]'::jsonb, '["Math,Binary Search"]'::jsonb, 
   130, 22, 86, false, '[]'::jsonb, true),
  (1740, 'Find Distance in a Binary Tree', 'Given the root of a binary tree and two integers `p` and `q`, return the distance between the nodes of value `p` and value `q` in the tree.

The distance between two nodes is the number of edges on the path from one to the other.


Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 0
Output: 3
Explanation: There are 3 edges between 5 and 0: 5-3-1-0.


Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 7
Output: 2
Explanation: There are 2 edges between 5 and 7: 5-2-7.


Example 3:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 5
Output: 0
Explanation: The distance between a node and itself is 0.


Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`0 <= Node.val <= 109`
All `Node.val` are unique.

`p` and `q` are values in the tree.', true, 'Medium', NULL, 68, 
   16.6, 'https://leetcode.com/problems/find-distance-in-a-binary-tree', 79, 2.8, 4.2, '["Amazon"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   73, 7, 91, true, '[]'::jsonb, true),
  (1741, 'Find Total Time Spent by Each Employee', 'SQL Schema', true, 'Easy', NULL, 91.2, 
   1.5, 'https://leetcode.com/problems/find-total-time-spent-by-each-employee', 48, 5.1, 5.6, '["Amazon"]'::jsonb, '[]'::jsonb, 
   24, 3, 89, true, '[]'::jsonb, true),
  (1742, 'Maximum Number of Balls in a Box', 'You are working in a ball factory where you have `n` balls numbered from `lowLimit` up to `highLimit` inclusive (i.e., `n == highLimit - lowLimit + 1`), and an infinite number of boxes numbered from `1` to `infinity`.

Your job at this factory is to put each ball in the box with a number equal to the sum of digits of the ball''s number. For example, the ball number `321` will be put in the box number `3 + 2 + 1 = 6` and the ball number `10` will be put in the box number `1 + 0 = 1`.

Given two integers `lowLimit` and `highLimit`, return the number of balls in the box with the most balls.


Example 1:
Input: lowLimit = 1, highLimit = 10
Output: 2
Explanation:
Box Number:  1 2 3 4 5 6 7 8 9 10 11 ...

Ball Count:  2 1 1 1 1 1 1 1 1 0  0  ...

Box 1 has the most number of balls with 2 balls.


Example 2:
Input: lowLimit = 5, highLimit = 15
Output: 2
Explanation:
Box Number:  1 2 3 4 5 6 7 8 9 10 11 ...

Ball Count:  1 1 1 1 2 2 1 1 1 0  0  ...

Boxes 5 and 6 have the most number of balls with 2 balls in each.


Example 3:
Input: lowLimit = 19, highLimit = 28
Output: 2
Explanation:
Box Number:  1 2 3 4 5 6 7 8 9 10 11 12 ...

Ball Count:  0 1 1 1 1 1 1 1 1 2  0  0  ...

Box 10 has the most number of balls with 2 balls.


Constraints:
`1 <= lowLimit <= highLimit <= 105`', false, 'Easy', NULL, 73.8, 
   1, 'https://leetcode.com/problems/maximum-number-of-balls-in-a-box', 203, 19.2, 26, '["AppDynamics,Lucid"]'::jsonb, '["Array"]'::jsonb, 
   148, 24, 86, false, '[]'::jsonb, true),
  (1743, 'Restore the Array From Adjacent Pairs', 'There is an integer array `nums` that consists of `n` unique elements, but you have forgotten it. However, you do remember every pair of adjacent elements in `nums`.

You are given a 2D integer array `adjacentPairs` of size `n - 1` where each `adjacentPairs[i] = [ui, vi]` indicates that the elements `ui` and `vi` are adjacent in `nums`.

It is guaranteed that every adjacent pair of elements `nums[i]` and `nums[i+1]` will exist in `adjacentPairs`, either as `[nums[i], nums[i+1]]` or `[nums[i+1], nums[i]]`. The pairs can appear in any order.

Return the original array `nums`. If there are multiple solutions, return any of them.


Example 1:
Input: adjacentPairs = [[2,1],[3,4],[3,2]]
Output: [1,2,3,4]
Explanation: This array has all its adjacent pairs in adjacentPairs.

Notice that adjacentPairs[i] may not be in left-to-right order.


Example 2:
Input: adjacentPairs = [[4,-2],[1,4],[-3,1]]
Output: [-2,4,1,-3]
Explanation: There can be negative numbers.

Another solution is [-3,1,4,-2], which would also be accepted.


Example 3:
Input: adjacentPairs = [[100000,-100000]]
Output: [100000,-100000]

Constraints:
`nums.length == n`
`adjacentPairs.length == n - 1`
`adjacentPairs[i].length == 2`
`2 <= n <= 105`
`-105 <= nums[i], ui, vi <= 105`
There exists some `nums` that has `adjacentPairs` as its pairs.', false, 'Medium', NULL, 63.1, 
   11.1, 'https://leetcode.com/problems/restore-the-array-from-adjacent-pairs', 167, 9.9, 15.7, '["Robinhood"]'::jsonb, '["Greedy"]'::jsonb, 
   231, 4, 98, false, '[]'::jsonb, true),
  (1744, 'Can You Eat Your Favorite Candy on Your Favorite Day?', 'You are given a (0-indexed) array of positive integers `candiesCount` where `candiesCount[i]` represents the number of candies of the `ith` type you have. You are also given a 2D array `queries` where `queries[i] = [favoriteTypei, favoriteDayi, dailyCapi]`.

You play a game with the following rules:
You start eating candies on day `0`.

You cannot eat any candy of type `i` unless you have eaten all candies of type `i - 1`.

You must eat at least one candy per day until you have eaten all the candies.

Construct a boolean array `answer` such that `answer.length == queries.length` and `answer[i]` is `true` if you can eat a candy of type `favoriteTypei` on day `favoriteDayi` without eating more than `dailyCapi` candies on any day, and `false` otherwise. Note that you can eat different types of candy on the same day, provided that you follow rule 2.

Return the constructed array `answer`.


Example 1:
Input: candiesCount = [7,4,5,3,8], queries = [[0,2,2],[4,2,4],[2,13,1000000000]]
Output: [true,false,true]
Explanation:
1- If you eat 2 candies (type 0) on day 0 and 2 candies (type 0) on day 1, you will eat a candy of type 0 on day 2.

2- You can eat at most 4 candies each day.

   If you eat 4 candies every day, you will eat 4 candies (type 0) on day 0 and 4 candies (type 0 and type 1) on day 1.

   On day 2, you can only eat 4 candies (type 1 and type 2), so you cannot eat a candy of type 4 on day 2.

3- If you eat 1 candy each day, you will eat a candy of type 2 on day 13.


Example 2:
Input: candiesCount = [5,2,6,4,1], queries = [[3,1,2],[4,10,3],[3,10,100],[4,100,30],[1,3,1]]
Output: [false,true,true,false,false]

Constraints:
`1 <= candiesCount.length <= 105`
`1 <= candiesCount[i] <= 105`
`1 <= queries.length <= 105`
`queries[i].length == 3`
`0 <= favoriteTypei < candiesCount.length`
`0 <= favoriteDayi <= 109`
`1 <= dailyCapi <= 109`', false, 'Medium', NULL, 30.5, 
   0, 'https://leetcode.com/problems/can-you-eat-your-favorite-candy-on-your-favorite-day', 71, 5.8, 19, '["Fleetx"]'::jsonb, '["Math"]'::jsonb, 
   57, 184, 24, false, '[]'::jsonb, true),
  (1745, 'Palindrome Partitioning IV', 'Given a string `s`, return `true` if it is possible to split the string `s` into three non-empty palindromic substrings. Otherwise, return `false`.​​​​​
A string is said to be palindrome if it the same string when reversed.


Example 1:
Input: s = "abcbdd"
Output: true
Explanation: "abcbdd" = "a" + "bcb" + "dd", and all three substrings are palindromes.


Example 2:
Input: s = "bcbddxy"
Output: false
Explanation: s cannot be split into 3 palindromes.


Constraints:
`3 <= s.length <= 2000`
`s`​​​​​​ consists only of lowercase English letters.', false, 'Hard', NULL, 49.5, 
   4.3, 'https://leetcode.com/problems/palindrome-partitioning-iv', 115, 7.4, 15, '["tcs"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   204, 4, 98, false, '[]'::jsonb, true),
  (1746, 'Maximum Subarray Sum After One Operation', 'You are given an integer array `nums`. You must perform exactly one operation where you can replace one element `nums[i]` with `nums[i] * nums[i]`. 
Return the maximum possible subarray sum after exactly one operation. The subarray must be non-empty.


Example 1:
Input: nums = [2,-1,-4,-3]
Output: 17
Explanation: You can perform the operation on index 2 (0-indexed) to make nums = [2,-1,16,-3]. Now, the maximum subarray sum is 2 + -1 + 16 = 17.


Example 2:
Input: nums = [1,-1,1,1,-1,-1,1]
Output: 4
Explanation: You can perform the operation on index 1 (0-indexed) to make nums = [1,1,1,1,-1,-1,1]. Now, the maximum subarray sum is 1 + 1 + 1 + 1 = 4.


Constraints:
`1 <= nums.length <= 105`
`-104 <= nums[i] <= 104`', true, 'Medium', NULL, 62.1, 
   5.1, 'https://leetcode.com/problems/maximum-subarray-sum-after-one-operation', 51, 1.2, 1.9, '["Sprinklr"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   64, 0, 100, false, '[]'::jsonb, true),
  (1747, 'Leetflex Banned Accounts', 'SQL Schema', true, 'Medium', NULL, 68.8, 
   0, 'https://leetcode.com/problems/leetflex-banned-accounts', 43, 2.1, 3.1, '["Audible"]'::jsonb, '[]'::jsonb, 
   32, 0, 100, false, '[]'::jsonb, true),
  (1748, 'Sum of Unique Elements', 'You are given an integer array `nums`. The unique elements of an array are the elements that appear exactly once in the array.

Return the sum of all the unique elements of `nums`.


Example 1:
Input: nums = [1,2,3,2]
Output: 4
Explanation: The unique elements are [1,3], and the sum is 4.


Example 2:
Input: nums = [1,1,1,1,1]
Output: 0
Explanation: There are no unique elements, and the sum is 0.


Example 3:
Input: nums = [1,2,3,4,5]
Output: 15
Explanation: The unique elements are [1,2,3,4,5], and the sum is 15.


Constraints:
`1 <= nums.length <= 100`
`1 <= nums[i] <= 100`', false, 'Easy', NULL, 75, 
   0.7, 'https://leetcode.com/problems/sum-of-unique-elements', 425, 24.9, 33.2, '["Facebook"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   220, 8, 96, true, '[]'::jsonb, true),
  (1749, 'Maximum Absolute Sum of Any Subarray', 'You are given an integer array `nums`. The absolute sum of a subarray `[numsl, numsl+1, ..., numsr-1, numsr]` is `abs(numsl + numsl+1 + ... + numsr-1 + numsr)`.

Return the maximum absolute sum of any (possibly empty) subarray of `nums`.

Note that `abs(x)` is defined as follows:
If `x` is a negative integer, then `abs(x) = -x`.

If `x` is a non-negative integer, then `abs(x) = x`.


Example 1:
Input: nums = [1,-3,2,3,-4]
Output: 5
Explanation: The subarray [2,3] has absolute sum = abs(2+3) = abs(5) = 5.


Example 2:
Input: nums = [2,-5,1,-4,3,-2]
Output: 8
Explanation: The subarray [-5,1,-4] has absolute sum = abs(-5+1-4) = abs(-8) = 8.


Constraints:
`1 <= nums.length <= 105`
`-104 <= nums[i] <= 104`', false, 'Medium', NULL, 52.4, 
   2.7, 'https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray', 152, 8.4, 16.1, '[]'::jsonb, '[]'::jsonb, 
   234, 6, 98, false, '[]'::jsonb, true),
  (1750, 'Minimum Length of String After Deleting Similar Ends', 'Given a string `s` consisting only of characters `''a''`, `''b''`, and `''c''`. You are asked to apply the following algorithm on the string any number of times:
Pick a non-empty prefix from the string `s` where all the characters in the prefix are equal.

Pick a non-empty suffix from the string `s` where all the characters in this suffix are equal.

The prefix and the suffix should not intersect at any index.

The characters from the prefix and suffix must be the same.

Delete both the prefix and the suffix.

Return the minimum length of `s` after performing the above operation any number of times (possibly zero times).


Example 1:
Input: s = "ca"
Output: 2
Explanation: You can''t remove any characters, so the string stays as is.


Example 2:
Input: s = "cabaabac"
Output: 0
Explanation: An optimal sequence of operations is:
- Take prefix = "c" and suffix = "c" and remove them, s = "abaaba".

- Take prefix = "a" and suffix = "a" and remove them, s = "baab".

- Take prefix = "b" and suffix = "b" and remove them, s = "aa".

- Take prefix = "a" and suffix = "a" and remove them, s = "".


Example 3:
Input: s = "aabccabba"
Output: 3
Explanation: An optimal sequence of operations is:
- Take prefix = "aa" and suffix = "a" and remove them, s = "bccabb".

- Take prefix = "b" and suffix = "bb" and remove them, s = "cca".


Constraints:
`1 <= s.length <= 105`
`s` only consists of characters `''a''`, `''b''`, and `''c''`.', false, 'Medium', NULL, 42.4, 
   0, 'https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends', 142, 7.5, 17.8, '["Goldman Sachs,Amazon"]'::jsonb, '["Two Pointers"]'::jsonb, 
   116, 10, 92, true, '[]'::jsonb, true),
  (1751, 'Maximum Number of Events That Can Be Attended II', 'You are given an array of `events` where `events[i] = [startDayi, endDayi, valuei]`. The `ith` event starts at `startDayi` and ends at `endDayi`, and if you attend this event, you will receive a value of `valuei`. You are also given an integer `k` which represents the maximum number of events you can attend.

You can only attend one event at a time. If you choose to attend an event, you must attend the entire event. Note that the end day is inclusive: that is, you cannot attend two events where one of them starts and the other ends on the same day.

Return the maximum sum of values that you can receive by attending events.


Example 1:
Input: events = [[1,2,4],[3,4,3],[2,3,1]], k = 2
Output: 7
Explanation: Choose the green events, 0 and 1 (0-indexed) for a total value of 4 + 3 = 7.


Example 2:
Input: events = [[1,2,4],[3,4,3],[2,3,10]], k = 2
Output: 10
Explanation: Choose event 2 for a total value of 10.

Notice that you cannot attend any other event as they overlap, and that you do not have to attend k events.


Example 3:
Input: events = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]], k = 3
Output: 9
Explanation: Although the events do not overlap, you can only attend 3 events. Pick the highest valued three.


Constraints:
`1 <= k <= events.length`
`1 <= k * events.length <= 106`
`1 <= startDayi <= endDayi <= 109`
`1 <= valuei <= 106`', false, 'Hard', NULL, 48.1, 
   10, 'https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii', 80, 4.7, 9.7, '["Amazon"]'::jsonb, '["Binary Search,Dynamic Programming"]'::jsonb, 
   179, 3, 98, true, '[]'::jsonb, true),
  (1752, 'Check if Array Is Sorted and Rotated', 'Given an array `nums`, return `true` if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero). Otherwise, return `false`.

There may be duplicates in the original array.

Note: An array `A` rotated by `x` positions results in an array `B` of the same length such that `A[i] == B[(i+x) % A.length]`, where `%` is the modulo operation.


Example 1:
Input: nums = [3,4,5,1,2]
Output: true
Explanation: [1,2,3,4,5] is the original sorted array.

You can rotate the array by x = 3 positions to begin on the the element of value 3: [3,4,5,1,2].


Example 2:
Input: nums = [2,1,3,4]
Output: false
Explanation: There is no sorted array once rotated that can make nums.


Example 3:
Input: nums = [1,2,3]
Output: true
Explanation: [1,2,3] is the original sorted array.

You can rotate the array by x = 0 positions (i.e. no rotation) to make nums.


Example 4:
Input: nums = [1,1,1]
Output: true
Explanation: [1,1,1] is the original sorted array.

You can rotate any number of positions to make nums.


Example 5:
Input: nums = [2,1]
Output: true
Explanation: [1,2] is the original sorted array.

You can rotate the array by x = 5 positions to begin on the element of value 2: [2,1].


Constraints:
`1 <= nums.length <= 100`
`1 <= nums[i] <= 100`', false, 'Easy', NULL, 61.3, 
   3.4, 'https://leetcode.com/problems/check-if-array-is-sorted-and-rotated', 197, 19.7, 32.2, '["SoundHound"]'::jsonb, '["Array"]'::jsonb, 
   171, 30, 85, false, '[]'::jsonb, true),
  (1753, 'Maximum Score From Removing Stones', 'You are playing a solitaire game with three piles of stones of sizes `a`​​​​​​, `b`,​​​​​​ and `c`​​​​​​ respectively. Each turn you choose two different non-empty piles, take one stone from each, and add `1` point to your score. The game stops when there are fewer than two non-empty piles (meaning there are no more available moves).

Given three integers `a`​​​​​, `b`,​​​​​ and `c`​​​​​, return the maximum score you can get.


Example 1:
Input: a = 2, b = 4, c = 6
Output: 6
Explanation: The starting state is (2, 4, 6). One optimal set of moves is:
- Take from 1st and 3rd piles, state is now (1, 4, 5)
- Take from 1st and 3rd piles, state is now (0, 4, 4)
- Take from 2nd and 3rd piles, state is now (0, 3, 3)
- Take from 2nd and 3rd piles, state is now (0, 2, 2)
- Take from 2nd and 3rd piles, state is now (0, 1, 1)
- Take from 2nd and 3rd piles, state is now (0, 0, 0)
There are fewer than two non-empty piles, so the game ends. Total: 6 points.


Example 2:
Input: a = 4, b = 4, c = 6
Output: 7
Explanation: The starting state is (4, 4, 6). One optimal set of moves is:
- Take from 1st and 2nd piles, state is now (3, 3, 6)
- Take from 1st and 3rd piles, state is now (2, 3, 5)
- Take from 1st and 3rd piles, state is now (1, 3, 4)
- Take from 1st and 3rd piles, state is now (0, 3, 3)
- Take from 2nd and 3rd piles, state is now (0, 2, 2)
- Take from 2nd and 3rd piles, state is now (0, 1, 1)
- Take from 2nd and 3rd piles, state is now (0, 0, 0)
There are fewer than two non-empty piles, so the game ends. Total: 7 points.


Example 3:
Input: a = 1, b = 8, c = 8
Output: 8
Explanation: One optimal set of moves is to take from the 2nd and 3rd piles for 8 turns until they are empty.

After that, there are fewer than two non-empty piles, so the game ends.


Constraints:
`1 <= a, b, c <= 105`', false, 'Medium', NULL, 61.6, 
   0, 'https://leetcode.com/problems/maximum-score-from-removing-stones', 194, 10.6, 17.1, '["Google"]'::jsonb, '["Math,Heap"]'::jsonb, 
   160, 17, 90, true, '[]'::jsonb, true),
  (1754, 'Largest Merge Of Two Strings', 'You are given two strings `word1` and `word2`. You want to construct a string `merge` in the following way: while either `word1` or `word2` are non-empty, choose one of the following options:
If `word1` is non-empty, append the first character in `word1` to `merge` and delete it from `word1`.

	
For example, if `word1 = "abc" `and `merge = "dv"`, then after choosing this operation, `word1 = "bc"` and `merge = "dva"`.

If `word2` is non-empty, append the first character in `word2` to `merge` and delete it from `word2`.

	
For example, if `word2 = "abc" `and `merge = ""`, then after choosing this operation, `word2 = "bc"` and `merge = "a"`.

Return the lexicographically largest `merge` you can construct.

A string `a` is lexicographically larger than a string `b` (of the same length) if in the first position where `a` and `b` differ, `a` has a character strictly larger than the corresponding character in `b`. For example, `"abcd"` is lexicographically larger than `"abcc"` because the first position they differ is at the fourth character, and `d` is greater than `c`.


Example 1:
Input: word1 = "cabaa", word2 = "bcaaa"
Output: "cbcabaaaaa"
Explanation: One way to get the lexicographically largest merge is:
- Take from word1: merge = "c", word1 = "abaa", word2 = "bcaaa"
- Take from word2: merge = "cb", word1 = "abaa", word2 = "caaa"
- Take from word2: merge = "cbc", word1 = "abaa", word2 = "aaa"
- Take from word1: merge = "cbca", word1 = "baa", word2 = "aaa"
- Take from word1: merge = "cbcab", word1 = "aa", word2 = "aaa"
- Append the remaining 5 a''s from word1 and word2 at the end of merge.


Example 2:
Input: word1 = "abcabc", word2 = "abdcaba"
Output: "abdcabcabcaba"

Constraints:
`1 <= word1.length, word2.length <= 3000`
`word1` and `word2` consist only of lowercase English letters.', false, 'Medium', NULL, 40.7, 
   0, 'https://leetcode.com/problems/largest-merge-of-two-strings', 120, 8.8, 21.6, '["Snapchat"]'::jsonb, '["Greedy,Suffix Array"]'::jsonb, 
   179, 36, 83, false, '[]'::jsonb, true),
  (1755, 'Closest Subsequence Sum', 'You are given an integer array `nums` and an integer `goal`.

You want to choose a subsequence of `nums` such that the sum of its elements is the closest possible to `goal`. That is, if the sum of the subsequence''s elements is `sum`, then you want to minimize the absolute difference `abs(sum - goal)`.

Return the minimum possible value of `abs(sum - goal)`.

Note that a subsequence of an array is an array formed by removing some elements (possibly all or none) of the original array.


Example 1:
Input: nums = [5,-7,3,5], goal = 6
Output: 0
Explanation: Choose the whole array as a subsequence, with a sum of 6.

This is equal to the goal, so the absolute difference is 0.


Example 2:
Input: nums = [7,-9,15,-2], goal = -5
Output: 1
Explanation: Choose the subsequence [7,-9,-2], with a sum of -4.

The absolute difference is abs(-4 - (-5)) = abs(1) = 1, which is the minimum.


Example 3:
Input: nums = [1,2,3], goal = -7
Output: 7

Constraints:
`1 <= nums.length <= 40`
`-107 <= nums[i] <= 107`
`-109 <= goal <= 109`', false, 'Hard', NULL, 35.7, 
   2.7, 'https://leetcode.com/problems/closest-subsequence-sum', 67, 4.5, 12.6, '["Sprinklr"]'::jsonb, '["Divide and Conquer,Meet in the Middle"]'::jsonb, 
   185, 40, 82, false, '[]'::jsonb, true),
  (1756, 'Design Most Recently Used Queue', 'Design a queue-like data structure that moves the most recently used element to the end of the queue.

Implement the `MRUQueue` class:
`MRUQueue(int n)` constructs the `MRUQueue` with `n` elements: `[1,2,3,...,n]`.

`fetch(int k)` moves the `kth` element (1-indexed) to the end of the queue and returns it.


Example 1:
Input:
["MRUQueue", "fetch", "fetch", "fetch", "fetch"]
[[8], [3], [5], [2], [8]]
Output:
[null, 3, 6, 2, 2]
Explanation:
MRUQueue mRUQueue = new MRUQueue(8); // Initializes the queue to [1,2,3,4,5,6,7,8].

mRUQueue.fetch(3); // Moves the 3rd element (3) to the end of the queue to become [1,2,4,5,6,7,8,3] and returns it.

mRUQueue.fetch(5); // Moves the 5th element (6) to the end of the queue to become [1,2,4,5,7,8,3,6] and returns it.

mRUQueue.fetch(2); // Moves the 2nd element (2) to the end of the queue to become [1,4,5,7,8,3,6,2] and returns it.

mRUQueue.fetch(8); // The 8th element (2) is already at the end of the queue so just return it.


Constraints:
`1 <= n <= 2000`
`1 <= k <= n`
At most `2000` calls will be made to `fetch`.

Follow up: Finding an `O(n)` algorithm per `fetch` is a bit easy. Can you find an algorithm with a better complexity for each `fetch` call?', true, 'Medium', NULL, 77.9, 
   3.6, 'https://leetcode.com/problems/design-most-recently-used-queue', 32, 1.6, 2.1, '["Google"]'::jsonb, '["Array,Design,Dequeue"]'::jsonb, 
   50, 1, 98, true, '[]'::jsonb, true),
  (1757, 'Recyclable and Low Fat Products', 'SQL Schema', true, 'Easy', NULL, 95.6, 
   7.8, 'https://leetcode.com/problems/recyclable-and-low-fat-products', 26, 6.2, 6.5, '["Facebook"]'::jsonb, '[]'::jsonb, 
   23, 20, 53, true, '[]'::jsonb, true),
  (1758, 'Minimum Changes To Make Alternating Binary String', 'You are given a string `s` consisting only of the characters `''0''` and `''1''`. In one operation, you can change any `''0''` to `''1''` or vice versa.

The string is called alternating if no two adjacent characters are equal. For example, the string `"010"` is alternating, while the string `"0100"` is not.

Return the minimum number of operations needed to make `s` alternating.


Example 1:
Input: s = "0100"
Output: 1
Explanation: If you change the last character to ''1'', s will be "0101", which is alternating.


Example 2:
Input: s = "10"
Output: 0
Explanation: s is already alternating.


Example 3:
Input: s = "1111"
Output: 2
Explanation: You need two operations to reach "0101" or "1010".


Constraints:
`1 <= s.length <= 104`
`s[i]` is either `''0''` or `''1''`.', false, 'Easy', NULL, 58.3, 
   8.1, 'https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string', 190, 13.8, 23.6, '["Tesla"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   176, 7, 96, false, '[]'::jsonb, true),
  (1759, 'Count Number of Homogenous Substrings', 'Given a string `s`, return the number of homogenous substrings of `s`. Since the answer may be too large, return it modulo `109 + 7`.

A string is homogenous if all the characters of the string are the same.

A substring is a contiguous sequence of characters within a string.


Example 1:
Input: s = "abbcccaa"
Output: 13
Explanation: The homogenous substrings are listed as below:
"a"   appears 3 times.

"aa"  appears 1 time.

"b"   appears 2 times.

"bb"  appears 1 time.

"c"   appears 3 times.

"cc"  appears 2 times.

"ccc" appears 1 time.

3 + 1 + 2 + 1 + 3 + 2 + 1 = 13.


Example 2:
Input: s = "xy"
Output: 2
Explanation: The homogenous substrings are "x" and "y".


Example 3:
Input: s = "zzzzz"
Output: 15

Constraints:
`1 <= s.length <= 105`
`s` consists of lowercase letters.', false, 'Medium', NULL, 42.5, 
   0, 'https://leetcode.com/problems/count-number-of-homogenous-substrings', 182, 10.1, 23.6, '["Virtu Financial"]'::jsonb, '["String,Greedy"]'::jsonb, 
   149, 17, 90, false, '[]'::jsonb, true),
  (1760, 'Minimum Limit of Balls in a Bag', 'You are given an integer array `nums` where the `ith` bag contains `nums[i]` balls. You are also given an integer `maxOperations`.

You can perform the following operation at most `maxOperations` times:
Take any bag of balls and divide it into two new bags with a positive number of balls.

	
For example, a bag of `5` balls can become two new bags of `1` and `4` balls, or two new bags of `2` and `3` balls.

Your penalty is the maximum number of balls in a bag. You want to minimize your penalty after the operations.

Return the minimum possible penalty after performing the operations.


Example 1:
Input: nums = [9], maxOperations = 2
Output: 3
Explanation: 
- Divide the bag with 9 balls into two bags of sizes 6 and 3. [9] -> [6,3].

- Divide the bag with 6 balls into two bags of sizes 3 and 3. [6,3] -> [3,3,3].

The bag with the most number of balls has 3 balls, so your penalty is 3 and you should return 3.


Example 2:
Input: nums = [2,4,8,2], maxOperations = 4
Output: 2
Explanation:
- Divide the bag with 8 balls into two bags of sizes 4 and 4. [2,4,8,2] -> [2,4,4,4,2].

- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,4,4,4,2] -> [2,2,2,4,4,2].

- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,2,2,4,4,2] -> [2,2,2,2,2,4,2].

- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,2,2,2,2,4,2] -> [2,2,2,2,2,2,2,2].

The bag with the most number of balls has 2 balls, so your penalty is 2 an you should return 2.


Example 3:
Input: nums = [7,17], maxOperations = 2
Output: 7

Constraints:
`1 <= nums.length <= 105`
`1 <= maxOperations, nums[i] <= 109`', false, 'Medium', NULL, 52.7, 
   4.7, 'https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag', 89, 7.6, 14.3, '["Flipkart"]'::jsonb, '["Binary Search,Heap"]'::jsonb, 
   363, 20, 95, false, '[]'::jsonb, true),
  (1761, 'Minimum Degree of a Connected Trio in a Graph', 'You are given an undirected graph. You are given an integer `n` which is the number of nodes in the graph and an array `edges`, where each `edges[i] = [ui, vi]` indicates that there is an undirected edge between `ui` and `vi`.

A connected trio is a set of three nodes where there is an edge between every pair of them.

The degree of a connected trio is the number of edges where one endpoint is in the trio, and the other is not.

Return the minimum degree of a connected trio in the graph, or `-1` if the graph has no connected trios.


Example 1:
Input: n = 6, edges = [[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]]
Output: 3
Explanation: There is exactly one trio, which is [1,2,3]. The edges that form its degree are bolded in the figure above.


Example 2:
Input: n = 7, edges = [[1,3],[4,1],[4,3],[2,5],[5,6],[6,7],[7,5],[2,6]]
Output: 0
Explanation: There are exactly three trios:
1) [1,4,3] with degree 0.

2) [2,5,6] with degree 2.

3) [5,6,7] with degree 2.


Constraints:
`2 <= n <= 400`
`edges[i].length == 2`
`1 <= edges.length <= n * (n-1) / 2`
`1 <= ui, vi <= n`
`ui != vi`
There are no repeated edges.', false, 'Hard', NULL, 37.5, 
   17.3, 'https://leetcode.com/problems/minimum-degree-of-a-connected-trio-in-a-graph', 77, 5.8, 15.5, '["Amazon"]'::jsonb, '["Graph"]'::jsonb, 
   65, 118, 36, true, '[]'::jsonb, true),
  (1762, 'Buildings With an Ocean View', 'There are `n` buildings in a line. You are given an integer array `heights` of size `n` that represents the heights of the buildings in the line.

The ocean is to the right of the buildings. A building has an ocean view if the building can see the ocean without obstructions. Formally, a building has an ocean view if all the buildings to its right have a smaller height.

Return a list of indices (0-indexed) of buildings that have an ocean view, sorted in increasing order.


Example 1:
Input: heights = [4,2,3,1]
Output: [0,2,3]
Explanation: Building 1 (0-indexed) does not have an ocean view because building 2 is taller.


Example 2:
Input: heights = [4,3,2,1]
Output: [0,1,2,3]
Explanation: All the buildings have an ocean view.


Example 3:
Input: heights = [1,3,2,4]
Output: [3]
Explanation: Only building 3 has an ocean view.


Example 4:
Input: heights = [2,2,2,2]
Output: [3]
Explanation: Buildings cannot see the ocean if there are buildings of the same height to its right.


Constraints:
`1 <= heights.length <= 105`
`1 <= heights[i] <= 109`', true, 'Medium', NULL, 80.7, 
   17.5, 'https://leetcode.com/problems/buildings-with-an-ocean-view', 121, 4.3, 5.4, '["Facebook"]'::jsonb, '["Greedy"]'::jsonb, 
   70, 13, 84, true, '[]'::jsonb, true),
  (1763, 'Longest Nice Substring', 'A string `s` is nice if, for every letter of the alphabet that `s` contains, it appears both in uppercase and lowercase. For example, `"abABB"` is nice because `''A''` and `''a''` appear, and `''B''` and `''b''` appear. However, `"abA"` is not because `''b''` appears, but `''B''` does not.

Given a string `s`, return the longest substring of `s` that is nice. If there are multiple, return the substring of the earliest occurrence. If there are none, return an empty string.


Example 1:
Input: s = "YazaAay"
Output: "aAa"
Explanation: "aAa" is a nice string because ''A/a'' is the only letter of the alphabet in s, and both ''A'' and ''a'' appear.

"aAa" is the longest nice substring.


Example 2:
Input: s = "Bb"
Output: "Bb"
Explanation: "Bb" is a nice string because both ''B'' and ''b'' appear. The whole string is a substring.


Example 3:
Input: s = "c"
Output: ""
Explanation: There are no nice substrings.


Example 4:
Input: s = "dDzeE"
Output: "dD"
Explanation: Both "dD" and "eE" are the longest nice substrings.

As there are multiple longest nice substrings, return "dD" since it occurs earlier.


Constraints:
`1 <= s.length <= 100`
`s` consists of uppercase and lowercase English letters.', false, 'Easy', NULL, 61.5, 
   0, 'https://leetcode.com/problems/longest-nice-substring', 124, 8.7, 14.1, '["Microsoft"]'::jsonb, '["String"]'::jsonb, 
   131, 133, 50, false, '[]'::jsonb, true),
  (1764, 'Form Array by Concatenating Subarrays of Another Array', 'You are given a 2D integer array `groups` of length `n`. You are also given an integer array `nums`.

You are asked if you can choose `n` disjoint subarrays from the array `nums` such that the `ith` subarray is equal to `groups[i]` (0-indexed), and if `i > 0`, the `(i-1)th` subarray appears before the `ith` subarray in `nums` (i.e. the subarrays must be in the same order as `groups`).

Return `true` if you can do this task, and `false` otherwise.

Note that the subarrays are disjoint if and only if there is no index `k` such that `nums[k]` belongs to more than one subarray. A subarray is a contiguous sequence of elements within an array.


Example 1:
Input: groups = [[1,-1,-1],[3,-2,0]], nums = [1,-1,0,1,-1,-1,3,-2,0]
Output: true
Explanation: You can choose the 0th subarray as [1,-1,0,1,-1,-1,3,-2,0] and the 1st one as [1,-1,0,1,-1,-1,3,-2,0].

These subarrays are disjoint as they share no common nums[k] element.


Example 2:
Input: groups = [[10,-2],[1,2,3,4]], nums = [1,2,3,4,10,-2]
Output: false
Explanation: Note that choosing the subarrays [1,2,3,4,10,-2] and [1,2,3,4,10,-2] is incorrect because they are not in the same order as in groups.

[10,-2] must come before [1,2,3,4].


Example 3:
Input: groups = [[1,2,3],[3,4]], nums = [7,7,1,2,3,4,7,7]
Output: false
Explanation: Note that choosing the subarrays [7,7,1,2,3,4,7,7] and [7,7,1,2,3,4,7,7] is invalid because they are not disjoint.

They share a common elements nums[4] (0-indexed).


Constraints:
`groups.length == n`
`1 <= n <= 103`
`1 <= groups[i].length, sum(groups[i].length) <= 103`
`1 <= nums.length <= 103`
`-107 <= groups[i][j], nums[k] <= 107`', false, 'Medium', NULL, 54.7, 
   3.6, 'https://leetcode.com/problems/form-array-by-concatenating-subarrays-of-another-array', 123, 6.7, 12.3, '["Amazon"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   102, 16, 86, true, '[]'::jsonb, true),
  (1765, 'Map of Highest Peak', 'You are given an integer matrix `isWater` of size `m x n` that represents a map of land and water cells.

If `isWater[i][j] == 0`, cell `(i, j)` is a land cell.

If `isWater[i][j] == 1`, cell `(i, j)` is a water cell.

You must assign each cell a height in a way that follows these rules:
The height of each cell must be non-negative.

If the cell is a water cell, its height must be `0`.

Any two adjacent cells must have an absolute height difference of at most `1`. A cell is adjacent to another cell if the former is directly north, east, south, or west of the latter (i.e., their sides are touching).

Find an assignment of heights such that the maximum height in the matrix is maximized.

Return an integer matrix `height` of size `m x n` where `height[i][j]` is cell `(i, j)`''s height. If there are multiple solutions, return any of them.


Example 1:
Input: isWater = [[0,1],[0,0]]
Output: [[1,0],[2,1]]
Explanation: The image shows the assigned heights of each cell.

The blue cell is the water cell, and the green cells are the land cells.


Example 2:
Input: isWater = [[0,0,1],[1,0,0],[0,0,0]]
Output: [[1,1,0],[0,1,1],[1,2,2]]
Explanation: A height of 2 is the maximum possible height of any assignment.

Any height assignment that has a maximum height of 2 while still meeting the rules will also be accepted.


Constraints:
`m == isWater.length`
`n == isWater[i].length`
`1 <= m, n <= 1000`
`isWater[i][j]` is `0` or `1`.

There is at least one water cell.', false, 'Medium', NULL, 55.2, 
   0, 'https://leetcode.com/problems/map-of-highest-peak', 137, 6.4, 11.5, '["Google"]'::jsonb, '["Breadth-first Search,Graph"]'::jsonb, 
   187, 16, 92, true, '[]'::jsonb, true),
  (1766, 'Tree of Coprimes', 'There is a tree (i.e., a connected, undirected graph that has no cycles) consisting of `n` nodes numbered from `0` to `n - 1` and exactly `n - 1` edges. Each node has a value associated with it, and the root of the tree is node `0`.

To represent this tree, you are given an integer array `nums` and a 2D array `edges`. Each `nums[i]` represents the `ith` node''s value, and each `edges[j] = [uj, vj]` represents an edge between nodes `uj` and `vj` in the tree.

Two values `x` and `y` are coprime if `gcd(x, y) == 1` where `gcd(x, y)` is the greatest common divisor of `x` and `y`.

An ancestor of a node `i` is any other node on the shortest path from node `i` to the root. A node is not considered an ancestor of itself.

Return an array `ans` of size `n`, where `ans[i]` is the closest ancestor to node `i` such that `nums[i]` and `nums[ans[i]]` are coprime, or `-1` if there is no such ancestor.


Example 1:
Input: nums = [2,3,3,2], edges = [[0,1],[1,2],[1,3]]
Output: [-1,0,0,1]
Explanation: In the above figure, each node''s value is in parentheses.

- Node 0 has no coprime ancestors.

- Node 1 has only one ancestor, node 0. Their values are coprime (gcd(2,3) == 1).

- Node 2 has two ancestors, nodes 1 and 0. Node 1''s value is not coprime (gcd(3,3) == 3), but node 0''s
  value is (gcd(2,3) == 1), so node 0 is the closest valid ancestor.

- Node 3 has two ancestors, nodes 1 and 0. It is coprime with node 1 (gcd(3,2) == 1), so node 1 is its
  closest valid ancestor.


Example 2:
Input: nums = [5,6,10,2,3,6,15], edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]
Output: [-1,0,-1,0,0,0,-1]

Constraints:
`nums.length == n`
`1 <= nums[i] <= 50`
`1 <= n <= 105`
`edges.length == n - 1`
`edges[j].length == 2`
`0 <= uj, vj < n`
`uj != vj`', false, 'Hard', NULL, 36.7, 
   2.8, 'https://leetcode.com/problems/tree-of-coprimes', 55, 2.8, 7.6, '["Google"]'::jsonb, '["Math,Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   119, 8, 94, true, '[]'::jsonb, true),
  (1767, 'Find the Subtasks That Did Not Execute', 'SQL Schema', true, 'Hard', NULL, 87.7, 
   0, 'https://leetcode.com/problems/find-the-subtasks-that-did-not-execute', 57, 965, 1.1, '["Google"]'::jsonb, '[]'::jsonb, 
   26, 1, 96, true, '[]'::jsonb, true),
  (1768, 'Merge Strings Alternately', 'You are given two strings `word1` and `word2`. Merge the strings by adding letters in alternating order, starting with `word1`. If a string is longer than the other, append the additional letters onto the end of the merged string.

Return the merged string.


Example 1:
Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Explanation: The merged string will be merged as so:
word1:  a   b   c
word2:    p   q   r
merged: a p b q c r

Example 2:
Input: word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Explanation: Notice that as word2 is longer, "rs" is appended to the end.

word1:  a   b 
word2:    p   q   r   s
merged: a p b q   r   s

Example 3:
Input: word1 = "abcd", word2 = "pq"
Output: "apbqcd"
Explanation: Notice that as word1 is longer, "cd" is appended to the end.

word1:  a   b   c   d
word2:    p   q 
merged: a p b q c   d

Constraints:
`1 <= word1.length, word2.length <= 100`
`word1` and `word2` consist of lowercase English letters.', false, 'Easy', NULL, 75.8, 
   0.3, 'https://leetcode.com/problems/merge-strings-alternately', 370, 20.4, 26.9, '["Uber"]'::jsonb, '["String"]'::jsonb, 
   149, 3, 98, false, '[]'::jsonb, true),
  (1769, 'Minimum Number of Operations to Move All Balls to Each Box', 'You have `n` boxes. You are given a binary string `boxes` of length `n`, where `boxes[i]` is `''0''` if the `ith` box is empty, and `''1''` if it contains one ball.

In one operation, you can move one ball from a box to an adjacent box. Box `i` is adjacent to box `j` if `abs(i - j) == 1`. Note that after doing so, there may be more than one ball in some boxes.

Return an array `answer` of size `n`, where `answer[i]` is the minimum number of operations needed to move all the balls to the `ith` box.

Each `answer[i]` is calculated considering the initial state of the boxes.


Example 1:
Input: boxes = "110"
Output: [1,1,3]
Explanation: The answer for each box is as follows:
1) First box: you will have to move one ball from the second box to the first box in one operation.

2) Second box: you will have to move one ball from the first box to the second box in one operation.

3) Third box: you will have to move one ball from the first box to the third box in two operations, and move one ball from the second box to the third box in one operation.


Example 2:
Input: boxes = "001011"
Output: [11,8,5,4,3,4]

Constraints:
`n == boxes.length`
`1 <= n <= 2000`
`boxes[i]` is either `''0''` or `''1''`.', false, 'Medium', NULL, 87, 
   1.9, 'https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box', 289, 23.6, 27.2, '["Google"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   301, 19, 94, true, '[]'::jsonb, true),
  (1770, 'Maximum Score from Performing Multiplication Operations', 'You are given two integer arrays `nums` and `multipliers` of size `n` and `m` respectively, where `n >= m`. The arrays are 1-indexed.

You begin with a score of `0`. You want to perform exactly `m` operations. On the `ith` operation (1-indexed), you will:
Choose one integer `x` from either the start or the end of the array `nums`.

Add `multipliers[i] * x` to your score.

Remove `x` from the array `nums`.

Return the maximum score after performing `m` operations.


Example 1:
Input: nums = [1,2,3], multipliers = [3,2,1]
Output: 14
Explanation: An optimal solution is as follows:
- Choose from the end, [1,2,3], adding 3 * 3 = 9 to the score.

- Choose from the end, [1,2], adding 2 * 2 = 4 to the score.

- Choose from the end, [1], adding 1 * 1 = 1 to the score.

The total score is 9 + 4 + 1 = 14.


Example 2:
Input: nums = [-5,-3,-3,-2,7,1], multipliers = [-10,-5,3,4,6]
Output: 102
Explanation: An optimal solution is as follows:
- Choose from the start, [-5,-3,-3,-2,7,1], adding -5 * -10 = 50 to the score.

- Choose from the start, [-3,-3,-2,7,1], adding -3 * -5 = 15 to the score.

- Choose from the start, [-3,-2,7,1], adding -3 * 3 = -9 to the score.

- Choose from the end, [-2,7,1], adding 1 * 4 = 4 to the score.

- Choose from the end, [-2,7], adding 7 * 6 = 42 to the score. 
The total score is 50 + 15 - 9 + 4 + 42 = 102.


Constraints:
`n == nums.length`
`m == multipliers.length`
`1 <= m <= 103`
`m <= n <= 105`` `
`-1000 <= nums[i], multipliers[i] <= 1000`', false, 'Medium', NULL, 29.5, 
   4.3, 'https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations', 144, 8.5, 28.9, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   254, 78, 77, true, '[]'::jsonb, true),
  (1771, 'Maximize Palindrome Length From Subsequences', 'You are given two strings, `word1` and `word2`. You want to construct a string in the following manner:
Choose some non-empty subsequence `subsequence1` from `word1`.

Choose some non-empty subsequence `subsequence2` from `word2`.

Concatenate the subsequences: `subsequence1 + subsequence2`, to make the string.

Return the length of the longest palindrome that can be constructed in the described manner. If no palindromes can be constructed, return `0`.

A subsequence of a string `s` is a string that can be made by deleting some (possibly none) characters from `s` without changing the order of the remaining characters.

A palindrome is a string that reads the same forward as well as backward.


Example 1:
Input: word1 = "cacb", word2 = "cbba"
Output: 5
Explanation: Choose "ab" from word1 and "cba" from word2 to make "abcba", which is a palindrome.


Example 2:
Input: word1 = "ab", word2 = "ab"
Output: 3
Explanation: Choose "ab" from word1 and "a" from word2 to make "aba", which is a palindrome.


Example 3:
Input: word1 = "aa", word2 = "bb"
Output: 0
Explanation: You cannot construct a palindrome from the described method, so return 0.


Constraints:
`1 <= word1.length, word2.length <= 1000`
`word1` and `word2` consist of lowercase English letters.', false, 'Hard', NULL, 34.1, 
   4.4, 'https://leetcode.com/problems/maximize-palindrome-length-from-subsequences', 84, 4.6, 13.4, '["Goldman Sachs"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   182, 5, 97, false, '[]'::jsonb, true),
  (1772, 'Sort Features by Popularity', 'You are given a string array `features` where `features[i]` is a single word that represents the name of a feature of the latest product you are working on. You have made a survey where users have reported which features they like. You are given a string array `responses`, where each `responses[i]` is a string containing space-separated words.

The popularity of a feature is the number of `responses[i]` that contain the feature. You want to sort the features in non-increasing order by their popularity. If two features have the same popularity, order them by their original index in `features`. Notice that one response could contain the same feature multiple times; this feature is only counted once in its popularity.

Return the features in sorted order.


Example 1:
Input: features = ["cooler","lock","touch"], responses = ["i like cooler cooler","lock touch cool","locker like touch"]
Output: ["touch","cooler","lock"]
Explanation: appearances("cooler") = 1, appearances("lock") = 1, appearances("touch") = 2. Since "cooler" and "lock" both had 1 appearance, "cooler" comes first because "cooler" came first in the features array.


Example 2:
Input: features = ["a","aa","b","c"], responses = ["a","a aa","a a a a a","b a"]
Output: ["a","aa","b","c"]

Constraints:
`1 <= features.length <= 104`
`1 <= features[i].length <= 10`
`features` contains no duplicates.

`features[i]` consists of lowercase letters.

`1 <= responses.length <= 102`
`1 <= responses[i].length <= 103`
`responses[i]` consists of lowercase letters and spaces.

`responses[i]` contains no two consecutive spaces.

`responses[i]` has no leading or trailing spaces.', true, 'Medium', NULL, 64.9, 
   3.5, 'https://leetcode.com/problems/sort-features-by-popularity', 53, 1.1, 1.7, '["Amazon"]'::jsonb, '["Hash Table,Sort"]'::jsonb, 
   19, 15, 56, true, '[]'::jsonb, true),
  (1773, 'Count Items Matching a Rule', 'You are given an array `items`, where each `items[i] = [typei, colori, namei]` describes the type, color, and name of the `ith` item. You are also given a rule represented by two strings, `ruleKey` and `ruleValue`.

The `ith` item is said to match the rule if one of the following is true:
`ruleKey == "type"` and `ruleValue == typei`.

`ruleKey == "color"` and `ruleValue == colori`.

`ruleKey == "name"` and `ruleValue == namei`.

Return the number of items that match the given rule.


Example 1:
Input: items = [["phone","blue","pixel"],["computer","silver","lenovo"],["phone","gold","iphone"]], ruleKey = "color", ruleValue = "silver"
Output: 1
Explanation: There is only one item matching the given rule, which is ["computer","silver","lenovo"].


Example 2:
Input: items = [["phone","blue","pixel"],["computer","silver","phone"],["phone","gold","iphone"]], ruleKey = "type", ruleValue = "phone"
Output: 2
Explanation: There are only two items matching the given rule, which are ["phone","blue","pixel"] and ["phone","gold","iphone"]. Note that the item ["computer","silver","phone"] does not match.


Constraints:
`1 <= items.length <= 104`
`1 <= typei.length, colori.length, namei.length, ruleValue.length <= 10`
`ruleKey` is equal to either `"type"`, `"color"`, or `"name"`.

All strings consist only of lowercase letters.', false, 'Easy', NULL, 85.2, 
   1.3, 'https://leetcode.com/problems/count-items-matching-a-rule', 465, 28.8, 33.8, '["Facebook"]'::jsonb, '["Array,String"]'::jsonb, 
   197, 33, 86, true, '[]'::jsonb, true),
  (1774, 'Closest Dessert Cost', 'You would like to make dessert and are preparing to buy the ingredients. You have `n` ice cream base flavors and `m` types of toppings to choose from. You must follow these rules when making your dessert:
There must be exactly one ice cream base.

You can add one or more types of topping or have no toppings at all.

There are at most two of each type of topping.

You are given three inputs:
`baseCosts`, an integer array of length `n`, where each `baseCosts[i]` represents the price of the `ith` ice cream base flavor.

`toppingCosts`, an integer array of length `m`, where each `toppingCosts[i]` is the price of one of the `ith` topping.

`target`, an integer representing your target price for dessert.

You want to make a dessert with a total cost as close to `target` as possible.

Return the closest possible cost of the dessert to `target`. If there are multiple, return the lower one.


Example 1:
Input: baseCosts = [1,7], toppingCosts = [3,4], target = 10
Output: 10
Explanation: Consider the following combination (all 0-indexed):
- Choose base 1: cost 7
- Take 1 of topping 0: cost 1 x 3 = 3
- Take 0 of topping 1: cost 0 x 4 = 0
Total: 7 + 3 + 0 = 10.


Example 2:
Input: baseCosts = [2,3], toppingCosts = [4,5,100], target = 18
Output: 17
Explanation: Consider the following combination (all 0-indexed):
- Choose base 1: cost 3
- Take 1 of topping 0: cost 1 x 4 = 4
- Take 2 of topping 1: cost 2 x 5 = 10
- Take 0 of topping 2: cost 0 x 100 = 0
Total: 3 + 4 + 10 + 0 = 17. You cannot make a dessert with a total cost of 18.


Example 3:
Input: baseCosts = [3,10], toppingCosts = [2,5], target = 9
Output: 8
Explanation: It is possible to make desserts with cost 8 and 10. Return 8 as it is the lower cost.


Example 4:
Input: baseCosts = [10], toppingCosts = [1], target = 1
Output: 10
Explanation: Notice that you don''t have to have any toppings, but you must have exactly one base.


Constraints:
`n == baseCosts.length`
`m == toppingCosts.length`
`1 <= n, m <= 10`
`1 <= baseCosts[i], toppingCosts[i] <= 104`
`1 <= target <= 104`', false, 'Medium', NULL, 58.3, 
   6.4, 'https://leetcode.com/problems/closest-dessert-cost', 183, 10.5, 18, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   186, 26, 88, true, '[]'::jsonb, true),
  (1775, 'Equal Sum Arrays With Minimum Number of Operations', 'You are given two arrays of integers `nums1` and `nums2`, possibly of different lengths. The values in the arrays are between `1` and `6`, inclusive.

In one operation, you can change any integer''s value in any of the arrays to any value between `1` and `6`, inclusive.

Return the minimum number of operations required to make the sum of values in `nums1` equal to the sum of values in `nums2`. Return `-1`​​​​​ if it is not possible to make the sum of the two arrays equal.


Example 1:
Input: nums1 = [1,2,3,4,5,6], nums2 = [1,1,2,2,2,2]
Output: 3
Explanation: You can make the sums of nums1 and nums2 equal with 3 operations. All indices are 0-indexed.

- Change nums2[0] to 6. nums1 = [1,2,3,4,5,6], nums2 = [6,1,2,2,2,2].

- Change nums1[5] to 1. nums1 = [1,2,3,4,5,1], nums2 = [6,1,2,2,2,2].

- Change nums1[2] to 2. nums1 = [1,2,2,4,5,1], nums2 = [6,1,2,2,2,2].


Example 2:
Input: nums1 = [1,1,1,1,1,1,1], nums2 = [6]
Output: -1
Explanation: There is no way to decrease the sum of nums1 or to increase the sum of nums2 to make them equal.


Example 3:
Input: nums1 = [6,6], nums2 = [1]
Output: 3
Explanation: You can make the sums of nums1 and nums2 equal with 3 operations. All indices are 0-indexed. 
- Change nums1[0] to 2. nums1 = [2,6], nums2 = [1].

- Change nums1[1] to 2. nums1 = [2,2], nums2 = [1].

- Change nums2[0] to 4. nums1 = [2,2], nums2 = [4].


Constraints:
`1 <= nums1.length, nums2.length <= 105`
`1 <= nums1[i], nums2[i] <= 6`', false, 'Medium', NULL, 50.6, 
   4.4, 'https://leetcode.com/problems/equal-sum-arrays-with-minimum-number-of-operations', 117, 7.2, 14.3, '["HRT"]'::jsonb, '["Greedy"]'::jsonb, 
   217, 5, 98, false, '[]'::jsonb, true),
  (1776, 'Car Fleet II', 'There are `n` cars traveling at different speeds in the same direction along a one-lane road. You are given an array `cars` of length `n`, where `cars[i] = [positioni, speedi]` represents:
`positioni` is the distance between the `ith` car and the beginning of the road in meters. It is guaranteed that `positioni < positioni+1`.

`speedi` is the initial speed of the `ith` car in meters per second.

For simplicity, cars can be considered as points moving along the number line. Two cars collide when they occupy the same position. Once a car collides with another car, they unite and form a single car fleet. The cars in the formed fleet will have the same position and the same speed, which is the initial speed of the slowest car in the fleet.

Return an array `answer`, where `answer[i]` is the time, in seconds, at which the `ith` car collides with the next car, or `-1` if the car does not collide with the next car. Answers within `10-5` of the actual answers are accepted.


Example 1:
Input: cars = [[1,2],[2,1],[4,3],[7,2]]
Output: [1.00000,-1.00000,3.00000,-1.00000]
Explanation: After exactly one second, the first car will collide with the second car, and form a car fleet with speed 1 m/s. After exactly 3 seconds, the third car will collide with the fourth car, and form a car fleet with speed 2 m/s.


Example 2:
Input: cars = [[3,4],[5,4],[6,3],[9,1]]
Output: [2.00000,1.00000,1.50000,-1.00000]

Constraints:
`1 <= cars.length <= 105`
`1 <= positioni, speedi <= 106`
`positioni < positioni+1`', false, 'Hard', NULL, 46.5, 
   16.6, 'https://leetcode.com/problems/car-fleet-ii', 62, 3.8, 8.2, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   167, 4, 98, true, '[]'::jsonb, true),
  (1777, 'Product''s Price for Each Store', 'SQL Schema', true, 'Easy', NULL, 86.9, 
   0.8, 'https://leetcode.com/problems/products-price-for-each-store', 62, 2.3, 2.7, '["Amazon"]'::jsonb, '[]'::jsonb, 
   21, 3, 88, true, '[]'::jsonb, true),
  (1778, 'Shortest Path in a Hidden Grid', 'This is an interactive problem.

There is a robot in a hidden grid, and you are trying to get it from its starting cell to the target cell in this grid. The grid is of size `m x n`, and each cell in the grid is either empty or blocked. It is guaranteed that the starting cell and the target cell are different, and neither of them is blocked.

You want to find the minimum distance to the target cell. However, you do not know the grid''s dimensions, the starting cell, nor the target cell. You are only allowed to ask queries to the `GridMaster` object.

Thr `GridMaster` class has the following functions:
`boolean canMove(char direction)` Returns `true` if the robot can move in that direction. Otherwise, it returns `false`.

`void move(char direction)` Moves the robot in that direction. If this move would move the robot to a blocked cell or off the grid, the move will be ignored, and the robot will remain in the same position.

`boolean isTarget()` Returns `true` if the robot is currently on the target cell. Otherwise, it returns `false`.

Note that `direction` in the above functions should be a character from `{''U'',''D'',''L'',''R''}`, representing the directions up, down, left, and right, respectively.

Return the minimum distance between the robot''s initial starting cell and the target cell. If there is no valid path between the cells, return `-1`.

Custom testing:
The test input is read as a 2D matrix `grid` of size `m x n` where:
`grid[i][j] == -1` indicates that the robot is in cell `(i, j)` (the starting cell).

`grid[i][j] == 0` indicates that the cell `(i, j)` is blocked.

`grid[i][j] == 1` indicates that the cell `(i, j)` is empty.

`grid[i][j] == 2` indicates that the cell `(i, j)` is the target cell.

There is exactly one `-1` and `2` in `grid`. Remember that you will not have this information in your code.


Example 1:
Input: grid = [[1,2],[-1,0]]
Output: 2
Explanation: One possible interaction is described below:
The robot is initially standing on cell (1, 0), denoted by the -1.

- master.canMove(''U'') returns true.

- master.canMove(''D'') returns false.

- master.canMove(''L'') returns false.

- master.canMove(''R'') returns false.

- master.move(''U'') moves the robot to the cell (0, 0).

- master.isTarget() returns false.

- master.canMove(''U'') returns false.

- master.canMove(''D'') returns true.

- master.canMove(''L'') returns false.

- master.canMove(''R'') returns true.

- master.move(''R'') moves the robot to the cell (0, 1).

- master.isTarget() returns true. 
We now know that the target is the cell (0, 1), and the shortest path to the target cell is 2.


Example 2:
Input: grid = [[0,0,-1],[1,1,1],[2,0,0]]
Output: 4
Explanation: The minimum distance between the robot and the target cell is 4.


Example 3:
Input: grid = [[-1,0],[0,2]]
Output: -1
Explanation: There is no path from the robot to the target cell.


Constraints:
`1 <= n, m <= 500`
`m == grid.length`
`n == grid[i].length`
`grid[i][j]` is either `-1`, `0`, `1`, or `2`.

There is exactly one `-1` in `grid`.

There is exactly one `2` in `grid`.', true, 'Medium', NULL, 46.2, 
   4.5, 'https://leetcode.com/problems/shortest-path-in-a-hidden-grid', 23, 857, 1.8, '["Google"]'::jsonb, '["Depth-first Search,Breadth-first Search,Graph"]'::jsonb, 
   32, 18, 64, true, '[]'::jsonb, true),
  (1779, 'Find Nearest Point That Has the Same X or Y Coordinate', 'You are given two integers, `x` and `y`, which represent your current location on a Cartesian grid: `(x, y)`. You are also given an array `points` where each `points[i] = [ai, bi]` represents that a point exists at `(ai, bi)`. A point is valid if it shares the same x-coordinate or the same y-coordinate as your location.

Return the index (0-indexed) of the valid point with the smallest Manhattan distance from your current location. If there are multiple, return the valid point with the smallest index. If there are no valid points, return `-1`.

The Manhattan distance between two points `(x1, y1)` and `(x2, y2)` is `abs(x1 - x2) + abs(y1 - y2)`.


Example 1:
Input: x = 3, y = 4, points = [[1,2],[3,1],[2,4],[2,3],[4,4]]
Output: 2
Explanation: Of all the points, only [3,1], [2,4] and [4,4] are valid. Of the valid points, [2,4] and [4,4] have the smallest Manhattan distance from your current location, with a distance of 1. [2,4] has the smallest index, so return 2.


Example 2:
Input: x = 3, y = 4, points = [[3,4]]
Output: 0
Explanation: The answer is allowed to be on the same location as your current location.


Example 3:
Input: x = 3, y = 4, points = [[2,3]]
Output: -1
Explanation: There are no valid points.


Constraints:
`1 <= points.length <= 104`
`points[i].length == 2`
`1 <= x, y, ai, bi <= 104`', false, 'Easy', NULL, 67.5, 
   0, 'https://leetcode.com/problems/find-nearest-point-that-has-the-same-x-or-y-coordinate', 134, 10.4, 15.4, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   74, 15, 83, true, '[]'::jsonb, true),
  (1780, 'Check if Number is a Sum of Powers of Three', 'Given an integer `n`, return `true` if it is possible to represent `n` as the sum of distinct powers of three. Otherwise, return `false`.

An integer `y` is a power of three if there exists an integer `x` such that `y == 3x`.


Example 1:
Input: n = 12
Output: true
Explanation: 12 = 31 + 32

Example 2:
Input: n = 91
Output: true
Explanation: 91 = 30 + 32 + 34

Example 3:
Input: n = 21
Output: false

Constraints:
`1 <= n <= 107`', false, 'Medium', NULL, 63.4, 
   0.8, 'https://leetcode.com/problems/check-if-number-is-a-sum-of-powers-of-three', 211, 8.7, 13.7, '["Microsoft"]'::jsonb, '["Math,Backtracking,Recursion"]'::jsonb, 
   182, 8, 96, false, '[]'::jsonb, true),
  (1781, 'Sum of Beauty of All Substrings', 'The beauty of a string is the difference in frequencies between the most frequent and least frequent characters.

For example, the beauty of `"abaacc"` is `3 - 1 = 2`.

Given a string `s`, return the sum of beauty of all of its substrings.


Example 1:
Input: s = "aabcb"
Output: 5
Explanation: The substrings with non-zero beauty are ["aab","aabc","aabcb","abcb","bcb"], each with beauty equal to 1.


Example 2:
Input: s = "aabcbaa"
Output: 17

Constraints:
`1 <= s.length <= 500`
`s` consists of only lowercase English letters.', false, 'Medium', NULL, 57.8, 
   0, 'https://leetcode.com/problems/sum-of-beauty-of-all-substrings', 149, 7.1, 12.3, '["Google"]'::jsonb, '["Hash Table,String"]'::jsonb, 
   118, 54, 69, true, '[]'::jsonb, true),
  (1782, 'Count Pairs Of Nodes', 'You are given an undirected graph represented by an integer `n`, which is the number of nodes, and `edges`, where `edges[i] = [ui, vi]` which indicates that there is an undirected edge between `ui` and `vi`. You are also given an integer array `queries`.

The answer to the `jth` query is the number of pairs of nodes `(a, b)` that satisfy the following conditions:
`a < b`
`cnt` is strictly greater than `queries[j]`, where `cnt` is the number of edges incident to `a` or `b`.

Return an array `answers` such that `answers.length == queries.length` and `answers[j]` is the answer of the `jth` query.

Note that there can be repeated edges.


Example 1:
Input: n = 4, edges = [[1,2],[2,4],[1,3],[2,3],[2,1]], queries = [2,3]
Output: [6,5]
Explanation: The number of edges incident to at least one of each pair is shown above.


Example 2:
Input: n = 5, edges = [[1,5],[1,5],[3,4],[2,5],[1,3],[5,1],[2,3],[2,5]], queries = [1,2,3,4,5]
Output: [10,10,9,8,6]

Constraints:
`2 <= n <= 2 * 104`
`1 <= edges.length <= 105`
`1 <= ui, vi <= n`
`ui != vi`
`1 <= queries.length <= 20`
`0 <= queries[j] < edges.length`', false, 'Hard', NULL, 32.4, 
   1.1, 'https://leetcode.com/problems/count-pairs-of-nodes', 39, 2.2, 6.7, '["Google"]'::jsonb, '["Graph"]'::jsonb, 
   101, 77, 57, true, '[]'::jsonb, true),
  (1783, 'Grand Slam Titles', 'SQL Schema', true, 'Medium', NULL, 91.4, 
   1.8, 'https://leetcode.com/problems/grand-slam-titles', 64, 1.9, 2.1, '["Amazon"]'::jsonb, '[]'::jsonb, 
   26, 0, 100, true, '[]'::jsonb, true),
  (1784, 'Check if Binary String Has at Most One Segment of Ones', 'Given a binary string `s` ​​​​​without leading zeros, return `true`​​​ if `s` contains at most one contiguous segment of ones. Otherwise, return `false`.


Example 1:
Input: s = "1001"
Output: false
Explanation: The ones do not form a contiguous segment.


Example 2:
Input: s = "110"
Output: true

Constraints:
`1 <= s.length <= 100`
`s[i]`​​​​ is either `''0''` or `''1''`.

`s[0]` is `''1''`.', false, 'Easy', NULL, 41.6, 
   0, 'https://leetcode.com/problems/check-if-binary-string-has-at-most-one-segment-of-ones', 171, 12.9, 30.9, '["Cisco"]'::jsonb, '["Greedy"]'::jsonb, 
   70, 195, 26, false, '[]'::jsonb, true),
  (1785, 'Minimum Elements to Add to Form a Given Sum', 'You are given an integer array `nums` and two integers `limit` and `goal`. The array `nums` has an interesting property that `abs(nums[i]) <= limit`.

Return the minimum number of elements you need to add to make the sum of the array equal to `goal`. The array must maintain its property that `abs(nums[i]) <= limit`.

Note that `abs(x)` equals `x` if `x >= 0`, and `-x` otherwise.


Example 1:
Input: nums = [1,-1,1], limit = 3, goal = -4
Output: 2
Explanation: You can add -2 and -3, then the sum of the array will be 1 - 1 + 1 - 2 - 3 = -4.


Example 2:
Input: nums = [1,-10,9,1], limit = 100, goal = 0
Output: 1

Constraints:
`1 <= nums.length <= 105`
`1 <= limit <= 106`
`-limit <= nums[i] <= limit`
`-109 <= goal <= 109`', false, 'Medium', NULL, 39.3, 
   0, 'https://leetcode.com/problems/minimum-elements-to-add-to-form-a-given-sum', 134, 9.4, 23.8, '["Twitter"]'::jsonb, '["Greedy"]'::jsonb, 
   85, 86, 50, false, '[]'::jsonb, true),
  (1786, 'Number of Restricted Paths From First to Last Node', 'There is an undirected weighted connected graph. You are given a positive integer `n` which denotes that the graph has `n` nodes labeled from `1` to `n`, and an array `edges` where each `edges[i] = [ui, vi, weighti]` denotes that there is an edge between nodes `ui` and `vi` with weight equal to `weighti`.

A path from node `start` to node `end` is a sequence of nodes `[z0, z1, z2, ..., zk]` such that `z0 = start` and `zk = end` and there is an edge between `zi` and `zi+1` where `0 <= i <= k-1`.

The distance of a path is the sum of the weights on the edges of the path. Let `distanceToLastNode(x)` denote the shortest distance of a path between node `n` and node `x`. A restricted path is a path that also satisfies that `distanceToLastNode(zi) > distanceToLastNode(zi+1)` where `0 <= i <= k-1`.

Return the number of restricted paths from node `1` to node `n`. Since that number may be too large, return it modulo `109 + 7`.


Example 1:
Input: n = 5, edges = [[1,2,3],[1,3,3],[2,3,1],[1,4,2],[5,2,2],[3,5,1],[5,4,10]]
Output: 3
Explanation: Each circle contains the node number in black and its `distanceToLastNode value in blue. `The three restricted paths are:
1) 1 --> 2 --> 5
2) 1 --> 2 --> 3 --> 5
3) 1 --> 3 --> 5

Example 2:
Input: n = 7, edges = [[1,3,1],[4,1,2],[7,3,4],[2,5,3],[5,6,1],[6,7,2],[7,5,3],[2,6,4]]
Output: 1
Explanation: Each circle contains the node number in black and its `distanceToLastNode value in blue. `The only restricted path is 1 --> 3 --> 7.


Constraints:
`1 <= n <= 2 * 104`
`n - 1 <= edges.length <= 4 * 104`
`edges[i].length == 3`
`1 <= ui, vi <= n`
`ui != vi`
`1 <= weighti <= 105`
There is at most one edge between any two nodes.

There is at least one path between any two nodes.', false, 'Medium', NULL, 35.8, 
   0.5, 'https://leetcode.com/problems/number-of-restricted-paths-from-first-to-last-node', 128, 5.9, 16.4, '["Google"]'::jsonb, '["Dynamic Programming,Graph"]'::jsonb, 
   243, 46, 84, true, '[]'::jsonb, true),
  (1787, 'Make the XOR of All Segments Equal to Zero', 'You are given an array `nums`​​​ and an integer `k`​​​​​. The XOR of a segment `[left, right]` where `left <= right` is the `XOR` of all the elements with indices between `left` and `right`, inclusive: `nums[left] XOR nums[left+1] XOR ... XOR nums[right]`.

Return the minimum number of elements to change in the array such that the `XOR` of all segments of size `k`​​​​​​ is equal to zero.


Example 1:
Input: nums = [1,2,0,3,0], k = 1
Output: 3
Explanation: Modify the array from [1,2,0,3,0] to from [0,0,0,0,0].


Example 2:
Input: nums = [3,4,5,2,1,7,3,4,7], k = 3
Output: 3
Explanation: Modify the array from [3,4,5,2,1,7,3,4,7] to [3,4,7,3,4,7,3,4,7].


Example 3:
Input: nums = [1,2,4,1,2,5,1,2,6], k = 3
Output: 3
Explanation: Modify the array from [1,2,4,1,2,5,1,2,6] to [1,2,3,1,2,3,1,2,3].


Constraints:
`1 <= k <= nums.length <= 2000`
`​​​​​​0 <= nums[i] < 210`', false, 'Hard', NULL, 36.6, 
   2.3, 'https://leetcode.com/problems/make-the-xor-of-all-segments-equal-to-zero', 34, 2.1, 5.8, '["Media.net,codeagon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   144, 6, 96, false, '[]'::jsonb, true),
  (1788, 'Maximize the Beauty of the Garden', 'There is a garden of `n` flowers, and each flower has an integer beauty value. The flowers are arranged in a line. You are given an integer array `flowers` of size `n` and each `flowers[i]` represents the beauty of the `ith` flower.

A garden is valid if it meets these conditions:
The garden has at least two flowers.

The first and the last flower of the garden have the same beauty value.

As the appointed gardener, you have the ability to remove any (possibly none) flowers from the garden. You want to remove flowers in a way that makes the remaining garden valid. The beauty of the garden is the sum of the beauty of all the remaining flowers.

Return the maximum possible beauty of some valid garden after you have removed any (possibly none) flowers.


Example 1:
Input: flowers = [1,2,3,1,2]
Output: 8
Explanation: You can produce the valid garden [2,3,1,2] to have a total beauty of 2 + 3 + 1 + 2 = 8.


Example 2:
Input: flowers = [100,1,1,-3,1]
Output: 3
Explanation: You can produce the valid garden [1,1,1] to have a total beauty of 1 + 1 + 1 = 3.


Example 3:
Input: flowers = [-1,-2,0,-1]
Output: -2
Explanation: You can produce the valid garden [-1,-1] to have a total beauty of -1 + -1 = -2.


Constraints:
`2 <= flowers.length <= 105`
`-104 <= flowers[i] <= 104`
It is possible to create a valid garden by removing some (possibly none) flowers.', true, 'Hard', NULL, 69.9, 
   0, 'https://leetcode.com/problems/maximize-the-beauty-of-the-garden', 22, 599, 854, '["Amazon"]'::jsonb, '["Greedy"]'::jsonb, 
   18, 4, 82, true, '[]'::jsonb, true),
  (1789, 'Primary Department for Each Employee', 'SQL Schema', true, 'Easy', NULL, 78.1, 
   0, 'https://leetcode.com/problems/primary-department-for-each-employee', 65, 1.5, 1.9, '[]'::jsonb, '[]'::jsonb, 
   15, 7, 68, false, '[]'::jsonb, true),
  (1790, 'Check if One String Swap Can Make Strings Equal', 'You are given two strings `s1` and `s2` of equal length. A string swap is an operation where you choose two indices in a string (not necessarily different) and swap the characters at these indices.

Return `true` if it is possible to make both strings equal by performing at most one string swap on exactly one of the strings. Otherwise, return `false`.


Example 1:
Input: s1 = "bank", s2 = "kanb"
Output: true
Explanation: For example, swap the first character with the last character of s2 to make "bank".


Example 2:
Input: s1 = "attack", s2 = "defend"
Output: false
Explanation: It is impossible to make them equal with one string swap.


Example 3:
Input: s1 = "kelb", s2 = "kelb"
Output: true
Explanation: The two strings are already equal, so no string swap operation is required.


Example 4:
Input: s1 = "abcd", s2 = "dcba"
Output: false

Constraints:
`1 <= s1.length, s2.length <= 100`
`s1.length == s2.length`
`s1` and `s2` consist of only lowercase English letters.', false, 'Easy', NULL, 60.8, 
   0.1, 'https://leetcode.com/problems/check-if-one-string-swap-can-make-strings-equal', 244, 17.3, 28.6, '["Facebook"]'::jsonb, '["String"]'::jsonb, 
   125, 6, 95, true, '[]'::jsonb, true),
  (1791, 'Find Center of Star Graph', 'There is an undirected star graph consisting of `n` nodes labeled from `1` to `n`. A star graph is a graph where there is one center node and exactly `n - 1` edges that connect the center node with every other node.

You are given a 2D integer array `edges` where each `edges[i] = [ui, vi]` indicates that there is an edge between the nodes `ui` and `vi`. Return the center of the given star graph.


Example 1:
Input: edges = [[1,2],[2,3],[4,2]]
Output: 2
Explanation: As shown in the figure above, node 2 is connected to every other node, so 2 is the center.


Example 2:
Input: edges = [[1,2],[5,1],[1,3],[1,4]]
Output: 1

Constraints:
`3 <= n <= 105`
`edges.length == n - 1`
`edges[i].length == 2`
`1 <= ui, vi <= n`
`ui != vi`
The given `edges` represent a valid star graph.', false, 'Medium', NULL, 84.8, 
   0, 'https://leetcode.com/problems/find-center-of-star-graph', 231, 15, 17.7, '["Microsoft"]'::jsonb, '["Graph"]'::jsonb, 
   73, 202, 27, false, '[]'::jsonb, true),
  (1792, 'Maximum Average Pass Ratio', 'There is a school that has classes of students and each class will be having a final exam. You are given a 2D integer array `classes`, where `classes[i] = [passi, totali]`. You know beforehand that in the `ith` class, there are `totali` total students, but only `passi` number of students will pass the exam.

You are also given an integer `extraStudents`. There are another `extraStudents` brilliant students that are guaranteed to pass the exam of any class they are assigned to. You want to assign each of the `extraStudents` students to a class in a way that maximizes the average pass ratio across all the classes.

The pass ratio of a class is equal to the number of students of the class that will pass the exam divided by the total number of students of the class. The average pass ratio is the sum of pass ratios of all the classes divided by the number of the classes.

Return the maximum possible average pass ratio after assigning the `extraStudents` students. Answers within `10-5` of the actual answer will be accepted.


Example 1:
Input: classes = [[1,2],[3,5],[2,2]], `extraStudents` = 2
Output: 0.78333
Explanation: You can assign the two extra students to the first class. The average pass ratio will be equal to (3/4 + 3/5 + 2/2) / 3 = 0.78333.


Example 2:
Input: classes = [[2,4],[3,9],[4,5],[2,10]], `extraStudents` = 4
Output: 0.53485

Constraints:
`1 <= classes.length <= 105`
`classes[i].length == 2`
`1 <= passi <= totali <= 105`
`1 <= extraStudents <= 105`', false, 'Medium', NULL, 56.3, 
   0.3, 'https://leetcode.com/problems/maximum-average-pass-ratio', 161, 9, 15.9, '["Amazon"]'::jsonb, '["Heap"]'::jsonb, 
   242, 39, 86, true, '[]'::jsonb, true),
  (1793, 'Maximum Score of a Good Subarray', 'You are given an array of integers `nums` (0-indexed) and an integer `k`.

The score of a subarray `(i, j)` is defined as `min(nums[i], nums[i+1], ..., nums[j]) * (j - i + 1)`. A good subarray is a subarray where `i <= k <= j`.

Return the maximum possible score of a good subarray.


Example 1:
Input: nums = [1,4,3,7,4,5], k = 3
Output: 15
Explanation: The optimal subarray is (1, 5) with a score of min(4,3,7,4,5) * (5-1+1) = 3 * 5 = 15. 

Example 2:
Input: nums = [5,5,4,5,4,1,1,1], k = 0
Output: 20
Explanation: The optimal subarray is (0, 4) with a score of min(5,5,4,5,4) * (4-0+1) = 4 * 5 = 20.


Constraints:
`1 <= nums.length <= 105`
`1 <= nums[i] <= 2 * 104`
`0 <= k < nums.length`', false, 'Hard', NULL, 46.2, 
   1.1, 'https://leetcode.com/problems/maximum-score-of-a-good-subarray', 118, 5.8, 12.6, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   231, 14, 94, true, '[]'::jsonb, true),
  (1794, 'Count Pairs of Equal Substrings With Minimum Difference', 'You are given two strings `firstString` and `secondString` that are 0-indexed and consist only of lowercase English letters. Count the number of index quadruples `(i,j,a,b)` that satisfy the following conditions:
`0 <= i <= j < firstString.length`
`0 <= a <= b < secondString.length`
The substring of `firstString` that starts at the `ith` character and ends at the `jth` character (inclusive) is equal to the substring of `secondString` that starts at the `ath` character and ends at the `bth` character (inclusive).

`j - a` is the minimum possible value among all quadruples that satisfy the previous conditions.

Return the number of such quadruples.


Example 1:
Input: firstString = "abcd", secondString = "bccda"
Output: 1
Explanation: The quadruple (0,0,4,4) is the only one that satisfies all the conditions and minimizes j - a.


Example 2:
Input: firstString = "ab", secondString = "cd"
Output: 0
Explanation: There are no quadruples satisfying all the conditions.


Constraints:
`1 <= firstString.length, secondString.length <= 2 * 105`
Both strings consist only of lowercase English letters.', true, 'Medium', NULL, 68.2, 
   0, 'https://leetcode.com/problems/count-pairs-of-equal-substrings-with-minimum-difference', 23, 600, 881, '["Google"]'::jsonb, '["String,Greedy"]'::jsonb, 
   12, 18, 40, true, '[]'::jsonb, true),
  (1795, 'Rearrange Products Table', 'SQL Schema', true, 'Easy', NULL, 90.6, 
   0, 'https://leetcode.com/problems/rearrange-products-table', 28, 1.7, 1.9, '["Amazon"]'::jsonb, '[]'::jsonb, 
   14, 0, 100, true, '[]'::jsonb, true),
  (1796, 'Second Largest Digit in a String', 'Given an alphanumeric string `s`, return the second largest numerical digit that appears in `s`, or `-1` if it does not exist.

An alphanumeric string is a string consisting of lowercase English letters and digits.


Example 1:
Input: s = "dfa12321afd"
Output: 2
Explanation: The digits that appear in s are [1, 2, 3]. The second largest digit is 2.


Example 2:
Input: s = "abc1111"
Output: -1
Explanation: The digits that appear in s are [1]. There is no second largest digit. 

Constraints:
`1 <= s.length <= 500`
`s` consists of only lowercase English letters and/or digits.', false, 'Easy', NULL, 48.1, 
   0, 'https://leetcode.com/problems/second-largest-digit-in-a-string', 168, 8.7, 18.1, '["Softwire"]'::jsonb, '["String"]'::jsonb, 
   61, 35, 64, false, '[]'::jsonb, true),
  (1797, 'Design Authentication Manager', 'There is an authentication system that works with authentication tokens. For each session, the user will receive a new authentication token that will expire `timeToLive` seconds after the `currentTime`. If the token is renewed, the expiry time will be extended to expire `timeToLive` seconds after the (potentially different) `currentTime`.

Implement the `AuthenticationManager` class:
`AuthenticationManager(int timeToLive)` constructs the `AuthenticationManager` and sets the `timeToLive`.

`generate(string tokenId, int currentTime)` generates a new token with the given `tokenId` at the given `currentTime` in seconds.

`renew(string tokenId, int currentTime)` renews the unexpired token with the given `tokenId` at the given `currentTime` in seconds. If there are no unexpired tokens with the given `tokenId`, the request is ignored, and nothing happens.

`countUnexpiredTokens(int currentTime)` returns the number of unexpired tokens at the given currentTime.

Note that if a token expires at time `t`, and another action happens on time `t` (`renew` or `countUnexpiredTokens`), the expiration takes place before the other actions.


Example 1:
Input
["AuthenticationManager", "`renew`", "generate", "`countUnexpiredTokens`", "generate", "`renew`", "`renew`", "`countUnexpiredTokens`"]
[[5], ["aaa", 1], ["aaa", 2], [6], ["bbb", 7], ["aaa", 8], ["bbb", 10], [15]]
Output
[null, null, null, 1, null, null, null, 0]
Explanation
AuthenticationManager authenticationManager = new AuthenticationManager(5); // Constructs the AuthenticationManager with `timeToLive` = 5 seconds.

authenticationManager.`renew`("aaa", 1); // No token exists with tokenId "aaa" at time 1, so nothing happens.

authenticationManager.generate("aaa", 2); // Generates a new token with tokenId "aaa" at time 2.

authenticationManager.`countUnexpiredTokens`(6); // The token with tokenId "aaa" is the only unexpired one at time 6, so return 1.

authenticationManager.generate("bbb", 7); // Generates a new token with tokenId "bbb" at time 7.

authenticationManager.`renew`("aaa", 8); // The token with tokenId "aaa" expired at time 7, and 8 >= 7, so at time 8 the `renew` request is ignored, and nothing happens.

authenticationManager.`renew`("bbb", 10); // The token with tokenId "bbb" is unexpired at time 10, so the `renew` request is fulfilled and now the token will expire at time 15.

authenticationManager.`countUnexpiredTokens`(15); // The token with tokenId "bbb" expires at time 15, and the token with tokenId "aaa" expired at time 7, so currently no token is unexpired, so return 0.


Constraints:
`1 <= timeToLive <= 108`
`1 <= currentTime <= 108`
`1 <= tokenId.length <= 5`
`tokenId` consists only of lowercase letters.

All calls to `generate` will contain unique values of `tokenId`.

The values of `currentTime` across all the function calls will be strictly increasing.

At most `2000` calls will be made to all functions combined.', false, 'Medium', NULL, 48.1, 
   0, 'https://leetcode.com/problems/design-authentication-manager', 103, 5.2, 10.8, '["Twitter"]'::jsonb, '["Hash Table,Design"]'::jsonb, 
   72, 17, 81, false, '[]'::jsonb, true),
  (1798, 'Maximum Number of Consecutive Values You Can Make', 'You are given an integer array `coins` of length `n` which represents the `n` coins that you own. The value of the `ith` coin is `coins[i]`. You can make some value `x` if you can choose some of your `n` coins such that their values sum up to `x`.

Return the maximum number of consecutive integer values that you can make with your coins starting from and including `0`.

Note that you may have multiple coins of the same value.


Example 1:
Input: coins = [1,3]
Output: 2
Explanation: You can make the following values:
- 0: take []
- 1: take [1]
You can make 2 consecutive integer values starting from 0.


Example 2:
Input: coins = [1,1,1,4]
Output: 8
Explanation: You can make the following values:
- 0: take []
- 1: take [1]
- 2: take [1,1]
- 3: take [1,1,1]
- 4: take [4]
- 5: take [4,1]
- 6: take [4,1,1]
- 7: take [4,1,1,1]
You can make 8 consecutive integer values starting from 0.


Example 3:
Input: nums = [1,4,10,3,1]
Output: 20

Constraints:
`coins.length == n`
`1 <= n <= 4 * 104`
`1 <= coins[i] <= 4 * 104`', false, 'Medium', NULL, 43.9, 
   0.4, 'https://leetcode.com/problems/maximum-number-of-consecutive-values-you-can-make', 62, 4.6, 10.5, '["Infosys"]'::jsonb, '["Greedy"]'::jsonb, 
   223, 23, 91, false, '[]'::jsonb, true),
  (1799, 'Maximize Score After N Operations', 'You are given `nums`, an array of positive integers of size `2 * n`. You must perform `n` operations on this array.

In the `ith` operation (1-indexed), you will:
Choose two elements, `x` and `y`.

Receive a score of `i * gcd(x, y)`.

Remove `x` and `y` from `nums`.

Return the maximum score you can receive after performing `n` operations.

The function `gcd(x, y)` is the greatest common divisor of `x` and `y`.


Example 1:
Input: nums = [1,2]
Output: 1
Explanation: The optimal choice of operations is:
(1 * gcd(1, 2)) = 1

Example 2:
Input: nums = [3,4,6,8]
Output: 11
Explanation: The optimal choice of operations is:
(1 * gcd(3, 6)) + (2 * gcd(4, 8)) = 3 + 8 = 11

Example 3:
Input: nums = [1,2,3,4,5,6]
Output: 14
Explanation: The optimal choice of operations is:
(1 * gcd(1, 5)) + (2 * gcd(2, 4)) + (3 * gcd(3, 6)) = 1 + 4 + 9 = 14

Constraints:
`1 <= n <= 7`
`nums.length == 2 * n`
`1 <= nums[i] <= 106`', false, 'Hard', NULL, 50.4, 
   4.7, 'https://leetcode.com/problems/maximize-score-after-n-operations', 68, 4, 7.8, '["Amazon"]'::jsonb, '["Dynamic Programming,Backtracking,Recursion"]'::jsonb, 
   127, 7, 95, true, '[]'::jsonb, true),
  (1800, 'Maximum Ascending Subarray Sum', 'Given an array of positive integers `nums`, return the maximum possible sum of an ascending subarray in `nums`.

A subarray is defined as a contiguous sequence of numbers in an array.

A subarray `[numsl, numsl+1, ..., numsr-1, numsr]` is ascending if for all `i` where `l <= i < r`, `numsi  < numsi+1`. Note that a subarray of size `1` is ascending.


Example 1:
Input: nums = [10,20,30,5,10,50]
Output: 65
Explanation: [5,10,50] is the ascending subarray with the maximum sum of 65.


Example 2:
Input: nums = [10,20,30,40,50]
Output: 150
Explanation: [10,20,30,40,50] is the ascending subarray with the maximum sum of 150.


Example 3:
Input: nums = [12,17,15,13,10,11,12]
Output: 33
Explanation: [10,11,12] is the ascending subarray with the maximum sum of 33.


Example 4:
Input: nums = [100,10,1]
Output: 100

Constraints:
`1 <= nums.length <= 100`
`1 <= nums[i] <= 100`', false, 'Easy', NULL, 65.7, 
   0.1, 'https://leetcode.com/problems/maximum-ascending-subarray-sum', 160, 12, 18.3, '["tcs"]'::jsonb, '["Two Pointers"]'::jsonb, 
   109, 2, 98, false, '[]'::jsonb, true),
  (1801, 'Number of Orders in the Backlog', 'You are given a 2D integer array `orders`, where each `orders[i] = [pricei, amounti, orderTypei]` denotes that `amounti` orders have been placed of type `orderTypei` at the price `pricei`. The `orderTypei` is:
`0` if it is a batch of `buy` orders, or
`1` if it is a batch of `sell` orders.

Note that `orders[i]` represents a batch of `amounti` independent orders with the same price and order type. All orders represented by `orders[i]` will be placed before all orders represented by `orders[i+1]` for all valid `i`.

There is a backlog that consists of orders that have not been executed. The backlog is initially empty. When an order is placed, the following happens:
If the order is a `buy` order, you look at the `sell` order with the smallest price in the backlog. If that `sell` order''s price is smaller than or equal to the current `buy` order''s price, they will match and be executed, and that `sell` order will be removed from the backlog. Else, the `buy` order is added to the backlog.

Vice versa, if the order is a `sell` order, you look at the `buy` order with the largest price in the backlog. If that `buy` order''s price is larger than or equal to the current `sell` order''s price, they will match and be executed, and that `buy` order will be removed from the backlog. Else, the `sell` order is added to the backlog.

Return the total amount of orders in the backlog after placing all the orders from the input. Since this number can be large, return it modulo `109 + 7`.


Example 1:
Input: orders = [[10,5,0],[15,2,1],[25,1,1],[30,4,0]]
Output: 6
Explanation: Here is what happens with the orders:
- 5 orders of type buy with price 10 are placed. There are no sell orders, so the 5 orders are added to the backlog.

- 2 orders of type sell with price 15 are placed. There are no buy orders with prices larger than or equal to 15, so the 2 orders are added to the backlog.

- 1 order of type sell with price 25 is placed. There are no buy orders with prices larger than or equal to 25 in the backlog, so this order is added to the backlog.

- 4 orders of type buy with price 30 are placed. The first 2 orders are matched with the 2 sell orders of the least price, which is 15 and these 2 sell orders are removed from the backlog. The 3rd order is matched with the sell order of the least price, which is 25 and this sell order is removed from the backlog. Then, there are no more sell orders in the backlog, so the 4th order is added to the backlog.

Finally, the backlog has 5 buy orders with price 10, and 1 buy order with price 30. So the total number of orders in the backlog is 6.


Example 2:
Input: orders = [[7,1000000000,1],[15,3,0],[5,999999995,0],[5,1,1]]
Output: 999999984
Explanation: Here is what happens with the orders:
- 109 orders of type sell with price 7 are placed. There are no buy orders, so the 109 orders are added to the backlog.

- 3 orders of type buy with price 15 are placed. They are matched with the 3 sell orders with the least price which is 7, and those 3 sell orders are removed from the backlog.

- 999999995 orders of type buy with price 5 are placed. The least price of a sell order is 7, so the 999999995 orders are added to the backlog.

- 1 order of type sell with price 5 is placed. It is matched with the buy order of the highest price, which is 5, and that buy order is removed from the backlog.

Finally, the backlog has (1000000000-3) sell orders with price 7, and (999999995-1) buy orders with price 5. So the total number of orders = 1999999991, which is equal to 999999984 % (109 + 7).


Constraints:
`1 <= orders.length <= 105`
`orders[i].length == 3`
`1 <= pricei, amounti <= 109`
`orderTypei` is either `0` or `1`.', false, 'Medium', NULL, 43.6, 
   1, 'https://leetcode.com/problems/number-of-orders-in-the-backlog', 85, 5.6, 12.9, '["Robinhood"]'::jsonb, '["Heap,Greedy"]'::jsonb, 
   85, 117, 42, false, '[]'::jsonb, true),
  (1802, 'Maximum Value at a Given Index in a Bounded Array', 'You are given three positive integers: `n`, `index`, and `maxSum`. You want to construct an array `nums` (0-indexed) that satisfies the following conditions:
`nums.length == n`
`nums[i]` is a positive integer where `0 <= i < n`.

`abs(nums[i] - nums[i+1]) <= 1` where `0 <= i < n-1`.

The sum of all the elements of `nums` does not exceed `maxSum`.

`nums[index]` is maximized.

Return `nums[index]` of the constructed array.

Note that `abs(x)` equals `x` if `x >= 0`, and `-x` otherwise.


Example 1:
Input: n = 4, index = 2,  maxSum = 6
Output: 2
Explanation: nums = [1,2,2,1] is one array that satisfies all the conditions.

There are no arrays that satisfy all the conditions and have nums[2] == 3, so 2 is the maximum nums[2].


Example 2:
Input: n = 6, index = 1,  maxSum = 10
Output: 3

Constraints:
`1 <= n <= maxSum <= 109`
`0 <= index < n`', false, 'Medium', NULL, 27.7, 
   0, 'https://leetcode.com/problems/maximum-value-at-a-given-index-in-a-bounded-array', 103, 5.2, 18.7, '["Microsoft"]'::jsonb, '["Binary Search,Greedy"]'::jsonb, 
   203, 34, 86, false, '[]'::jsonb, true),
  (1803, 'Count Pairs With XOR in a Range', 'Given a (0-indexed) integer array `nums` and two integers `low` and `high`, return the number of nice pairs.

A nice pair is a pair `(i, j)` where `0 <= i < j < nums.length` and `low <= (nums[i] XOR nums[j]) <= high`.


Example 1:
Input: nums = [1,4,2,7], low = 2, high = 6
Output: 6
Explanation: All nice pairs (i, j) are as follows:
    - (0, 1): nums[0] XOR nums[1] = 5 
    - (0, 2): nums[0] XOR nums[2] = 3
    - (0, 3): nums[0] XOR nums[3] = 6
    - (1, 2): nums[1] XOR nums[2] = 6
    - (1, 3): nums[1] XOR nums[3] = 3
    - (2, 3): nums[2] XOR nums[3] = 5

Example 2:
Input: nums = [9,8,4,2,1], low = 5, high = 14
Output: 8
Explanation: All nice pairs (i, j) are as follows:
​​​​​    - (0, 2): nums[0] XOR nums[2] = 13
    - (0, 3): nums[0] XOR nums[3] = 11
    - (0, 4): nums[0] XOR nums[4] = 8
    - (1, 2): nums[1] XOR nums[2] = 12
    - (1, 3): nums[1] XOR nums[3] = 10
    - (1, 4): nums[1] XOR nums[4] = 9
    - (2, 3): nums[2] XOR nums[3] = 6
    - (2, 4): nums[2] XOR nums[4] = 5

Constraints:
`1 <= nums.length <= 2 * 104`
`1 <= nums[i] <= 2 * 104`
`1 <= low <= high <= 2 * 104`', false, 'Hard', NULL, 43.1, 
   0.3, 'https://leetcode.com/problems/count-pairs-with-xor-in-a-range', 37, 2.7, 6.2, '["Vimeo"]'::jsonb, '["Trie"]'::jsonb, 
   122, 8, 94, false, '[]'::jsonb, true),
  (1804, 'Implement Trie II (Prefix Tree)', 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
`Trie()` Initializes the trie object.

`void insert(String word)` Inserts the string `word` into the trie.

`int countWordsEqualTo(String word)` Returns the number of instances of the string `word` in the trie.

`int countWordsStartingWith(String prefix)` Returns the number of strings in the trie that have the string `prefix` as a prefix.

`void erase(String word)` Erases the string `word` from the trie.


Example 1:
Input
["Trie", "insert", "insert", "countWordsEqualTo", "countWordsStartingWith", "erase", "countWordsEqualTo", "countWordsStartingWith", "erase", "countWordsStartingWith"]
[[], ["apple"], ["apple"], ["apple"], ["app"], ["apple"], ["apple"], ["app"], ["apple"], ["app"]]
Output
[null, null, null, 2, 2, null, 1, 1, null, 0]
Explanation
Trie trie = new Trie();
trie.insert("apple");               // Inserts "apple".

trie.insert("apple");               // Inserts another "apple".

trie.countWordsEqualTo("apple");    // There are two instances of "apple" so return 2.

trie.countWordsStartingWith("app"); // "app" is a prefix of "apple" so return 2.

trie.erase("apple");                // Erases one "apple".

trie.countWordsEqualTo("apple");    // Now there is only one instance of "apple" so return 1.

trie.countWordsStartingWith("app"); // return 1
trie.erase("apple");                // Erases "apple". Now the trie is empty.

trie.countWordsStartingWith("app"); // return 0

Constraints:
`1 <= word.length, prefix.length <= 2000`
`word` and `prefix` consist only of lowercase English letters.

At most `3 * 104` calls in total will be made to `insert`, `countWordsEqualTo`, `countWordsStartingWith`, and `erase`.

It is guaranteed that for any function call to `erase`, the string `word` will exist in the trie.', true, 'Medium', NULL, 60.2, 
   0, 'https://leetcode.com/problems/implement-trie-ii-prefix-tree', 38, 777, 1.3, '[]'::jsonb, '[]'::jsonb, 
   37, 1, 97, false, '[]'::jsonb, true),
  (1805, 'Number of Different Integers in a String', 'You are given a string `word` that consists of digits and lowercase English letters.

You will replace every non-digit character with a space. For example, `"a123bc34d8ef34"` will become `" 123  34 8  34"`. Notice that you are left with some integers that are separated by at least one space: `"123"`, `"34"`, `"8"`, and `"34"`.

Return the number of different integers after performing the replacement operations on `word`.

Two integers are considered different if their decimal representations without any leading zeros are different.


Example 1:
Input: word = "a123bc34d8ef34"
Output: 3
Explanation: The three different integers are "123", "34", and "8". Notice that "34" is only counted once.


Example 2:
Input: word = "leet1234code234"
Output: 2

Example 3:
Input: word = "a1b01c001"
Output: 1
Explanation: The three integers "1", "01", and "001" all represent the same integer because
the leading zeros are ignored when comparing their decimal values.


Constraints:
`1 <= word.length <= 1000`
`word` consists of digits and lowercase English letters.', false, 'Easy', NULL, 50.5, 
   0, 'https://leetcode.com/problems/number-of-different-integers-in-a-string', 210, 14.5, 28.8, '[]'::jsonb, '[]'::jsonb, 
   106, 16, 87, false, '[]'::jsonb, true),
  (1806, 'Minimum Number of Operations to Reinitialize a Permutation', 'You are given an even integer `n`​​​​​​. You initially have a permutation `perm` of size `n`​​ where `perm[i] == i`​ (0-indexed)​​​​.

In one operation, you will create a new array `arr`, and for each `i`:
If `i % 2 == 0`, then `arr[i] = perm[i / 2]`.

If `i % 2 == 1`, then `arr[i] = perm[n / 2 + (i - 1) / 2]`.

You will then assign `arr`​​​​ to `perm`.

Return the minimum non-zero number of operations you need to perform on `perm` to return the permutation to its initial value.


Example 1:
Input: n = 2
Output: 1
Explanation: perm = [0,1] initially.

After the 1st operation, perm = [0,1]
So it takes only 1 operation.


Example 2:
Input: n = 4
Output: 2
Explanation: perm = [0,1,2,3] initially.

After the 1st operation, perm = [0,2,1,3]
After the 2nd operation, perm = [0,1,2,3]
So it takes only 2 operations.


Example 3:
Input: n = 6
Output: 4

Constraints:
`2 <= n <= 1000`
`n`​​​​​​ is even.', false, 'Medium', NULL, 70.3, 
   0, 'https://leetcode.com/problems/minimum-number-of-operations-to-reinitialize-a-permutation', 87, 7.4, 10.5, '["Google"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   83, 55, 60, true, '[]'::jsonb, true),
  (1807, 'Evaluate the Bracket Pairs of a String', 'You are given a string `s` that contains some bracket pairs, with each pair containing a non-empty key.

For example, in the string `"(name)is(age)yearsold"`, there are two bracket pairs that contain the keys `"name"` and `"age"`.

You know the values of a wide range of keys. This is represented by a 2D string array `knowledge` where each `knowledge[i] = [keyi, valuei]` indicates that key `keyi` has a value of `valuei`.

You are tasked to evaluate all of the bracket pairs. When you evaluate a bracket pair that contains some key `keyi`, you will:
Replace `keyi` and the bracket pair with the key''s corresponding `valuei`.

If you do not know the value of the key, you will replace `keyi` and the bracket pair with a question mark `"?"` (without the quotation marks).

Each key will appear at most once in your `knowledge`. There will not be any nested brackets in `s`.

Return the resulting string after evaluating all of the bracket pairs.


Example 1:
Input: s = "(name)is(age)yearsold", knowledge = [["name","bob"],["age","two"]]
Output: "bobistwoyearsold"
Explanation:
The key "name" has a value of "bob", so replace "(name)" with "bob".

The key "age" has a value of "two", so replace "(age)" with "two".


Example 2:
Input: s = "hi(name)", knowledge = [["a","b"]]
Output: "hi?"
Explanation: As you do not know the value of the key "name", replace "(name)" with "?".


Example 3:
Input: s = "(a)(a)(a)aaa", knowledge = [["a","yes"]]
Output: "yesyesyesaaa"
Explanation: The same key can appear multiple times.

The key "a" has a value of "yes", so replace all occurrences of "(a)" with "yes".

Notice that the "a"s not in a bracket pair are not evaluated.


Example 4:
Input: s = "(a)(b)", knowledge = [["a","b"],["b","a"]]
Output: "ba"

Constraints:
`1 <= s.length <= 105`
`0 <= knowledge.length <= 105`
`knowledge[i].length == 2`
`1 <= keyi.length, valuei.length <= 10`
`s` consists of lowercase English letters and round brackets `''(''` and `'')''`.

Every open bracket `''(''` in `s` will have a corresponding close bracket `'')''`.

The key in each bracket pair of `s` will be non-empty.

There will not be any nested bracket pairs in `s`.

`keyi` and `valuei` consist of lowercase English letters.

Each `keyi` in `knowledge` is unique.', false, 'Medium', NULL, 67.5, 
   0, 'https://leetcode.com/problems/evaluate-the-bracket-pairs-of-a-string', 192, 8.3, 12.3, '["Google"]'::jsonb, '["Hash Table,String"]'::jsonb, 
   94, 13, 88, true, '[]'::jsonb, true),
  (1808, 'Maximize Number of Nice Divisors', 'You are given a positive integer `primeFactors`. You are asked to construct a positive integer `n` that satisfies the following conditions:
The number of prime factors of `n` (not necessarily distinct) is at most `primeFactors`.

The number of nice divisors of `n` is maximized. Note that a divisor of `n` is nice if it is divisible by every prime factor of `n`. For example, if `n = 12`, then its prime factors are `[2,2,3]`, then `6` and `12` are nice divisors, while `3` and `4` are not.

Return the number of nice divisors of `n`. Since that number can be too large, return it modulo `109 + 7`.

Note that a prime number is a natural number greater than `1` that is not a product of two smaller natural numbers. The prime factors of a number `n` is a list of prime numbers such that their product equals `n`.


Example 1:
Input: primeFactors = 5
Output: 6
Explanation: 200 is a valid value of n.

It has 5 prime factors: [2,2,2,5,5], and it has 6 nice divisors: [10,20,40,50,100,200].

There is not other value of n that has at most 5 prime factors and more nice divisors.


Example 2:
Input: primeFactors = 8
Output: 18

Constraints:
`1 <= primeFactors <= 109`', false, 'Hard', NULL, 27.3, 
   0, 'https://leetcode.com/problems/maximize-number-of-nice-divisors', 51, 3.1, 11.4, '["Microsoft"]'::jsonb, '["Math"]'::jsonb, 
   95, 103, 48, false, '[]'::jsonb, true),
  (1809, 'Ad-Free Sessions', 'SQL Schema', true, 'Easy', NULL, 71.5, 
   0, 'https://leetcode.com/problems/ad-free-sessions', 33, 1, 1.4, '["Amazon"]'::jsonb, '[]'::jsonb, 
   11, 3, 79, true, '[]'::jsonb, true),
  (1810, 'Minimum Path Cost in a Hidden Grid', 'This is an interactive problem.

There is a robot in a hidden grid, and you are trying to get it from its starting cell to the target cell in this grid. The grid is of size `m x n`, and each cell in the grid is either empty or blocked. It is guaranteed that the starting cell and the target cell are different, and neither of them is blocked.

Each cell has a cost that you need to pay each time you move to the cell. The starting cell''s cost is not applied before the robot moves.

You want to find the minimum total cost to move the robot to the target cell. However, you do not know the grid''s dimensions, the starting cell, nor the target cell. You are only allowed to ask queries to the `GridMaster` object.

The `GridMaster` class has the following functions:
`boolean canMove(char direction)` Returns `true` if the robot can move in that direction. Otherwise, it returns `false`.

`int move(char direction)` Moves the robot in that direction and returns the cost of moving to that cell. If this move would move the robot to a blocked cell or off the grid, the move will be ignored, the robot will remain in the same position, and the function will return `-1`.

`boolean isTarget()` Returns `true` if the robot is currently on the target cell. Otherwise, it returns `false`.

Note that `direction` in the above functions should be a character from `{''U'',''D'',''L'',''R''}`, representing the directions up, down, left, and right, respectively.

Return the minimum total cost to get the robot from its initial starting cell to the target cell. If there is no valid path between the cells, return `-1`.

Custom testing:
The test input is read as a 2D matrix `grid` of size `m x n` and four integers `r1`, `c1`, `r2`, and `c2` where:
`grid[i][j] == 0` indicates that the cell `(i, j)` is blocked.

`grid[i][j] >= 1` indicates that the cell `(i, j)` is empty and `grid[i][j]` is the cost to move to that cell.

`(r1, c1)` is the starting cell of the robot.

`(r2, c2)` is the target cell of the robot.

Remember that you will not have this information in your code.


Example 1:
Input: grid = [[2,3],[1,1]], r1 = 0, c1 = 1, r2 = 1, c2 = 0
Output: 2
Explanation: One possible interaction is described below:
The robot is initially standing on cell (0, 1), denoted by the 3.

- master.canMove(''U'') returns false.

- master.canMove(''D'') returns true.

- master.canMove(''L'') returns true.

- master.canMove(''R'') returns false.

- master.move(''L'') moves the robot to the cell (0, 0) and returns 2.

- master.isTarget() returns false.

- master.canMove(''U'') returns false.

- master.canMove(''D'') returns true.

- master.canMove(''L'') returns false.

- master.canMove(''R'') returns true.

- master.move(''D'') moves the robot to the cell (1, 0) and returns 1.

- master.isTarget() returns true.

- master.move(''L'') doesn''t move the robot and returns -1.

- master.move(''R'') moves the robot to the cell (1, 1) and returns 1.

We now know that the target is the cell (0, 1), and the minimum total cost to reach it is 2. 

Example 2:
Input: grid = [[0,3,1],[3,4,2],[1,2,0]], r1 = 2, c1 = 0, r2 = 0, c2 = 2
Output: 9
Explanation: The minimum cost path is (2,0) -> (2,1) -> (1,1) -> (1,2) -> (0,2).


Example 3:
Input: grid = [[1,0],[0,1]], r1 = 0, c1 = 0, r2 = 1, c2 = 1
Output: -1
Explanation: There is no path from the robot to the target cell.


Constraints:
`1 <= n, m <= 100`
`m == grid.length`
`n == grid[i].length`
`0 <= grid[i][j] <= 100`', true, 'Medium', NULL, 59.3, 
   0, 'https://leetcode.com/problems/minimum-path-cost-in-a-hidden-grid', 12, 382, 652, '["Google,Facebook"]'::jsonb, '["Heap,Depth-first Search,Graph"]'::jsonb, 
   10, 4, 71, true, '[]'::jsonb, true),
  (1811, 'Find Interview Candidates', 'SQL Schema', true, 'Medium', NULL, 73.2, 
   0, 'https://leetcode.com/problems/find-interview-candidates', 35, 460, 631, '["Amazon"]'::jsonb, '[]'::jsonb, 
   16, 1, 94, true, '[]'::jsonb, true),
  (1812, 'Determine Color of a Chessboard Square', 'You are given `coordinates`, a string that represents the coordinates of a square of the chessboard. Below is a chessboard for your reference.

Return `true` if the square is white, and `false` if the square is black.

The coordinate will always represent a valid chessboard square. The coordinate will always have the letter first, and the number second.


Example 1:
Input: coordinates = "a1"
Output: false
Explanation: From the chessboard above, the square with coordinates "a1" is black, so return false.


Example 2:
Input: coordinates = "h3"
Output: true
Explanation: From the chessboard above, the square with coordinates "h3" is white, so return true.


Example 3:
Input: coordinates = "c7"
Output: false

Constraints:
`coordinates.length == 2`
`''a'' <= coordinates[0] <= ''h''`
`''1'' <= coordinates[1] <= ''8''`', false, 'Easy', NULL, 78.4, 
   0, 'https://leetcode.com/problems/determine-color-of-a-chessboard-square', 154, 7.6, 9.8, '["JPMorgan"]'::jsonb, '["String"]'::jsonb, 
   67, 3, 96, false, '[]'::jsonb, true),
  (1813, 'Sentence Similarity III', 'A sentence is a list of words that are separated by a single space with no leading or trailing spaces. For example, `"Hello World"`, `"HELLO"`, `"hello world hello world"` are all sentences. Words consist of only uppercase and lowercase English letters.

Two sentences `sentence1` and `sentence2` are similar if it is possible to insert an arbitrary sentence (possibly empty) inside one of these sentences such that the two sentences become equal. For example, `sentence1 = "Hello my name is Jane"` and `sentence2 = "Hello Jane"` can be made equal by inserting `"my name is"` between `"Hello"` and `"Jane"` in `sentence2`.

Given two sentences `sentence1` and `sentence2`, return `true` if `sentence1` and `sentence2` are similar. Otherwise, return `false`.


Example 1:
Input: sentence1 = "My name is Haley", sentence2 = "My Haley"
Output: true
Explanation: sentence2 can be turned to sentence1 by inserting "name is" between "My" and "Haley".


Example 2:
Input: sentence1 = "of", sentence2 = "A lot of words"
Output: false
Explanation: No single sentence can be inserted inside one of the sentences to make it equal to the other.


Example 3:
Input: sentence1 = "Eating right now", sentence2 = "Eating"
Output: true
Explanation: sentence2 can be turned to sentence1 by inserting "right now" at the end of the sentence.


Example 4:
Input: sentence1 = "Luky", sentence2 = "Lucccky"
Output: false

Constraints:
`1 <= sentence1.length, sentence2.length <= 100`
`sentence1` and `sentence2` consist of lowercase and uppercase English letters and spaces.

The words in `sentence1` and `sentence2` are separated by a single space.', false, 'Medium', NULL, 37, 
   0, 'https://leetcode.com/problems/sentence-similarity-iii', 86, 5.8, 12.6, '["Google"]'::jsonb, '["String"]'::jsonb, 
   75, 17, 82, true, '[]'::jsonb, true),
  (1814, 'Count Nice Pairs in an Array', 'You are given an array `nums` that consists of non-negative integers. Let us define `rev(x)` as the reverse of the non-negative integer `x`. For example, `rev(123) = 321`, and `rev(120) = 21`. A pair of indices `(i, j)` is nice if it satisfies all of the following conditions:
`0 <= i < j < nums.length`
`nums[i] + rev(nums[j]) == nums[j] + rev(nums[i])`
Return the number of nice pairs of indices. Since that number can be too large, return it modulo `109 + 7`.


Example 1:
Input: nums = [42,11,1,97]
Output: 2
Explanation: The two pairs are:
 - (0,3) : 42 + rev(97) = 42 + 79 = 121, 97 + rev(42) = 97 + 24 = 121.

 - (1,2) : 11 + rev(1) = 11 + 1 = 12, 1 + rev(11) = 1 + 11 = 12.


Example 2:
Input: nums = [13,10,35,24,76]
Output: 4

Constraints:
`1 <= nums.length <= 105`
`0 <= nums[i] <= 109`', false, 'Medium', NULL, 36.7, 
   0, 'https://leetcode.com/problems/count-nice-pairs-in-an-array', 129, 4.7, 12.8, '["Square"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   150, 12, 93, false, '[]'::jsonb, true),
  (1815, 'Maximum Number of Groups Getting Fresh Donuts', 'There is a donuts shop that bakes donuts in batches of `batchSize`. They have a rule where they must serve all of the donuts of a batch before serving any donuts of the next batch. You are given an integer `batchSize` and an integer array `groups`, where `groups[i]` denotes that there is a group of `groups[i]` customers that will visit the shop. Each customer will get exactly one donut.

When a group visits the shop, all customers of the group must be served before serving any of the following groups. A group will be happy if they all get fresh donuts. That is, the first customer of the group does not receive a donut that was left over from the previous group.

You can freely rearrange the ordering of the groups. Return the maximum possible number of happy groups after rearranging the groups.


Example 1:
Input: batchSize = 3, groups = [1,2,3,4,5,6]
Output: 4
Explanation: You can arrange the groups as [6,2,4,5,1,3]. Then the 1st, 2nd, 4th, and 6th groups will be happy.


Example 2:
Input: batchSize = 4, groups = [1,3,2,5,2,2,1,6]
Output: 4

Constraints:
`1 <= batchSize <= 9`
`1 <= groups.length <= 30`
`1 <= groups[i] <= 109`', false, 'Hard', NULL, 35.7, 
   0, 'https://leetcode.com/problems/maximum-number-of-groups-getting-fresh-donuts', 27, 2.1, 5.4, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   94, 8, 92, true, '[]'::jsonb, true),
  (1816, 'Truncate Sentence', 'A sentence is a list of words that are separated by a single space with no leading or trailing spaces. Each of the words consists of only uppercase and lowercase English letters (no punctuation).

For example, `"Hello World"`, `"HELLO"`, and `"hello world hello world"` are all sentences.

You are given a sentence `s`​​​​​​ and an integer `k`​​​​​​. You want to truncate `s`​​​​​​ such that it contains only the first `k`​​​​​​ words. Return `s`​​​​​​ after truncating it.


Example 1:
Input: s = "Hello how are you Contestant", k = 4
Output: "Hello how are you"
Explanation:
The words in s are ["Hello", "how" "are", "you", "Contestant"].

The first 4 words are ["Hello", "how", "are", "you"].

Hence, you should return "Hello how are you".


Example 2:
Input: s = "What is the solution to this problem", k = 4
Output: "What is the solution"
Explanation:
The words in s are ["What", "is" "the", "solution", "to", "this", "problem"].

The first 4 words are ["What", "is", "the", "solution"].

Hence, you should return "What is the solution".


Example 3:
Input: s = "chopper is not a tanuki", k = 5
Output: "chopper is not a tanuki"

Constraints:
`1 <= s.length <= 500`
`k` is in the range `[1, the number of words in s]`.

`s` consist of only lowercase and uppercase English letters and spaces.

The words in `s` are separated by a single space.

There are no leading or trailing spaces.', false, 'Easy', NULL, 78.9, 
   0, 'https://leetcode.com/problems/truncate-sentence', 183, 10.6, 13.4, '["Bloomberg"]'::jsonb, '["String"]'::jsonb, 
   73, 1, 99, false, '[]'::jsonb, true),
  (1817, 'Finding the Users Active Minutes', 'You are given the logs for users'' actions on LeetCode, and an integer `k`. The logs are represented by a 2D integer array `logs` where each `logs[i] = [IDi, timei]` indicates that the user with `IDi` performed an action at the minute `timei`.

Multiple users can perform actions simultaneously, and a single user can perform multiple actions in the same minute.

The user active minutes (UAM) for a given user is defined as the number of unique minutes in which the user performed an action on LeetCode. A minute can only be counted once, even if multiple actions occur during it.

You are to calculate a 1-indexed array `answer` of size `k` such that, for each `j` (`1 <= j <= k`), `answer[j]` is the number of users whose UAM equals `j`.

Return the array `answer` as described above.


Example 1:
Input: logs = [[0,5],[1,2],[0,2],[0,5],[1,3]], k = 5
Output: [0,2,0,0,0]
Explanation:
The user with ID=0 performed actions at minutes 5, 2, and 5 again. Hence, they have a UAM of 2 (minute 5 is only counted once).

The user with ID=1 performed actions at minutes 2 and 3. Hence, they have a UAM of 2.

Since both users have a UAM of 2, answer[2] is 2, and the remaining answer[j] values are 0.


Example 2:
Input: logs = [[1,1],[2,2],[2,3]], k = 4
Output: [1,1,0,0]
Explanation:
The user with ID=1 performed a single action at minute 1. Hence, they have a UAM of 1.

The user with ID=2 performed actions at minutes 2 and 3. Hence, they have a UAM of 2.

There is one user with a UAM of 1 and one with a UAM of 2.

Hence, answer[1] = 1, answer[2] = 1, and the remaining values are 0.


Constraints:
`1 <= logs.length <= 104`
`0 <= IDi <= 109`
`1 <= timei <= 105`
`k` is in the range `[The maximum UAM for a user, 105]`.', false, 'Medium', NULL, 78.9, 
   0, 'https://leetcode.com/problems/finding-the-users-active-minutes', 128, 7.9, 10, '["Twitter"]'::jsonb, '["Hash Table"]'::jsonb, 
   80, 18, 82, false, '[]'::jsonb, true),
  (1818, 'Minimum Absolute Sum Difference', 'You are given two positive integer arrays `nums1` and `nums2`, both of length `n`.

The absolute sum difference of arrays `nums1` and `nums2` is defined as the sum of `|nums1[i] - nums2[i]|` for each `0 <= i < n` (0-indexed).

You can replace at most one element of `nums1` with any other element in `nums1` to minimize the absolute sum difference.

Return the minimum absolute sum difference after replacing at most one element in the array `nums1`. Since the answer may be large, return it modulo `109 + 7`.

`|x|` is defined as:
`x` if `x >= 0`, or
`-x` if `x < 0`.


Example 1:
Input: nums1 = [1,7,5], nums2 = [2,3,5]
Output: 3
Explanation: There are two possible optimal solutions:
- Replace the second element with the first: [1,7,5] => [1,1,5], or
- Replace the second element with the third: [1,7,5] => [1,5,5].

Both will yield an absolute sum difference of `|1-2| + (|1-3| or |5-3|) + |5-5| = `3.


Example 2:
Input: nums1 = [2,4,6,8,10], nums2 = [2,4,6,8,10]
Output: 0
Explanation: nums1 is equal to nums2 so no replacement is needed. This will result in an 
absolute sum difference of 0.


Example 3:
Input: nums1 = [1,10,4,4,2,7], nums2 = [9,3,5,1,7,4]
Output: 20
Explanation: Replace the first element with the second: [1,10,4,4,2,7] => [10,10,4,4,2,7].

This yields an absolute sum difference of `|10-9| + |10-3| + |4-5| + |4-1| + |2-7| + |7-4| = 20`

Constraints:
`n == nums1.length`
`n == nums2.length`
`1 <= n <= 105`
`1 <= nums1[i], nums2[i] <= 105`', false, 'Medium', NULL, 40.4, 
   0, 'https://leetcode.com/problems/minimum-absolute-sum-difference', 136, 8.7, 18.5, '["Uber"]'::jsonb, '["Binary Search,Greedy"]'::jsonb, 
   127, 21, 86, false, '[]'::jsonb, true),
  (1819, 'Number of Different Subsequences GCDs', 'You are given an array `nums` that consists of positive integers.

The GCD of a sequence of numbers is defined as the greatest integer that divides all the numbers in the sequence evenly.

For example, the GCD of the sequence `[4,6,16]` is `2`.

A subsequence of an array is a sequence that can be formed by removing some elements (possibly none) of the array.

For example, `[2,5,10]` is a subsequence of `[1,2,1,2,4,1,5,10]`.

Return the number of different GCDs among all non-empty subsequences of `nums`.


Example 1:
Input: nums = [6,10,3]
Output: 5
Explanation: The figure shows all the non-empty subsequences and their GCDs.

The different GCDs are 6, 10, 3, 2, and 1.


Example 2:
Input: nums = [5,15,40,5,6]
Output: 7

Constraints:
`1 <= nums.length <= 105`
`1 <= nums[i] <= 2 * 105`', false, 'Hard', NULL, 29.2, 
   0, 'https://leetcode.com/problems/number-of-different-subsequences-gcds', 51, 2.9, 9.7, '["Akuna Capital"]'::jsonb, '["Math"]'::jsonb, 
   131, 29, 82, false, '[]'::jsonb, true),
  (1820, 'Maximum Number of Accepted Invitations', 'There are `m` boys and `n` girls in a class attending an upcoming party.

You are given an `m x n` integer matrix `grid`, where `grid[i][j]` equals `0` or `1`. If `grid[i][j] == 1`, then that means the `ith` boy can invite the `jth` girl to the party. A boy can invite at most one girl, and a girl can accept at most one invitation from a boy.

Return the maximum possible number of accepted invitations.


Example 1:
Input: grid = [[1,1,1],
               [1,0,1],
               [0,0,1]]
Output: 3
Explanation: The invitations are sent as follows:
- The 1st boy invites the 2nd girl.

- The 2nd boy invites the 1st girl.

- The 3rd boy invites the 3rd girl.


Example 2:
Input: grid = [[1,0,1,0],
               [1,0,0,0],
               [0,0,1,0],
               [1,1,1,0]]
Output: 3
Explanation: The invitations are sent as follows:
-The 1st boy invites the 3rd girl.

-The 2nd boy invites the 1st girl.

-The 3rd boy invites no one.

-The 4th boy invites the 2nd girl.


Constraints:
`grid.length == m`
`grid[i].length == n`
`1 <= m, n <= 200`
`grid[i][j]` is either `0` or `1`.', true, 'Medium', NULL, 51.4, 
   0, 'https://leetcode.com/problems/maximum-number-of-accepted-invitations', 10, 339, 659, '["Bloomberg"]'::jsonb, '["Graph"]'::jsonb, 
   14, 4, 78, false, '[]'::jsonb, true),
  (1821, 'Find Customers With Positive Revenue this Year', 'SQL Schema', true, 'Easy', NULL, 88.9, 
   0, 'https://leetcode.com/problems/find-customers-with-positive-revenue-this-year', 15, 305, 343, '["Google"]'::jsonb, '[]'::jsonb, 
   2, 2, 50, true, '[]'::jsonb, true),
  (1822, 'Sign of the Product of an Array', 'There is a function `signFunc(x)` that returns:
`1` if `x` is positive.

`-1` if `x` is negative.

`0` if `x` is equal to `0`.

You are given an integer array `nums`. Let `product` be the product of all values in the array `nums`.

Return `signFunc(product)`.


Example 1:
Input: nums = [-1,-2,-3,-4,3,2,1]
Output: 1
Explanation: The product of all values in the array is 144, and signFunc(144) = 1

Example 2:
Input: nums = [1,5,0,2,-3]
Output: 0
Explanation: The product of all values in the array is 0, and signFunc(0) = 0

Example 3:
Input: nums = [-1,1,-1,1,-1]
Output: -1
Explanation: The product of all values in the array is -1, and signFunc(-1) = -1

Constraints:
`1 <= nums.length <= 1000`
`-100 <= nums[i] <= 100`', false, 'Easy', NULL, 67.8, 
   0, 'https://leetcode.com/problems/sign-of-the-product-of-an-array', 104, 7.9, 11.7, '["Microsoft"]'::jsonb, '["Math"]'::jsonb, 
   37, 4, 90, false, '[]'::jsonb, true),
  (1823, 'Find the Winner of the Circular Game', 'There are `n` friends that are playing a game. The friends are sitting in a circle and are numbered from `1` to `n` in clockwise order. More formally, moving clockwise from the `ith` friend brings you to the `(i+1)th` friend for `1 <= i < n`, and moving clockwise from the `nth` friend brings you to the `1st` friend.

The rules of the game are as follows:
Start at the `1st` friend.

Count the next `k` friends in the clockwise direction including the friend you started at. The counting wraps around the circle and may count some friends more than once.

The last friend you counted leaves the circle and loses the game.

If there is still more than one friend in the circle, go back to step `2` starting from the friend immediately clockwise of the friend who just lost and repeat.

Else, the last friend in the circle wins the game.

Given the number of friends, `n`, and an integer `k`, return the winner of the game.


Example 1:
Input: n = 5, k = 2
Output: 3
Explanation: Here are the steps of the game:
1) Start at friend 1.

2) Count 2 friends clockwise, which are friends 1 and 2.

3) Friend 2 leaves the circle. Next start is friend 3.

4) Count 2 friends clockwise, which are friends 3 and 4.

5) Friend 4 leaves the circle. Next start is friend 5.

6) Count 2 friends clockwise, which are friends 5 and 1.

7) Friend 1 leaves the circle. Next start is friend 3.

8) Count 2 friends clockwise, which are friends 3 and 5.

9) Friend 5 leaves the circle. Only friend 3 is left, so they are the winner.


Example 2:
Input: n = 6, k = 5
Output: 1
Explanation: The friends leave in this order: 5, 4, 6, 2, 3. The winner is friend 1.


Constraints:
`1 <= k <= n <= 500`', false, 'Medium', NULL, 71.8, 
   0, 'https://leetcode.com/problems/find-the-winner-of-the-circular-game', 135, 6.8, 9.5, '["Bloomberg"]'::jsonb, '["Array"]'::jsonb, 
   81, 4, 95, false, '[]'::jsonb, true),
  (1824, 'Minimum Sideway Jumps', 'There is a 3 lane road of length `n` that consists of `n + 1` points labeled from `0` to `n`. A frog starts at point `0` in the second lane and wants to jump to point `n`. However, there could be obstacles along the way.

You are given an array `obstacles` of length `n + 1` where each `obstacles[i]` (ranging from 0 to 3) describes an obstacle on the lane `obstacles[i]` at point `i`. If `obstacles[i] == 0`, there are no obstacles at point `i`. There will be at most one obstacle in the 3 lanes at each point.

For example, if `obstacles[2] == 1`, then there is an obstacle on lane 1 at point 2.

The frog can only travel from point `i` to point `i + 1` on the same lane if there is not an obstacle on the lane at point `i + 1`. To avoid obstacles, the frog can also perform a side jump to jump to another lane (even if they are not adjacent) at the same point if there is no obstacle on the new lane.

For example, the frog can jump from lane 3 at point 3 to lane 1 at point 3.

Return the minimum number of side jumps the frog needs to reach any lane at point n starting from lane `2` at point 0.

Note: There will be no obstacles on points `0` and `n`.


Example 1:
Input: obstacles = [0,1,2,3,0]
Output: 2 
Explanation: The optimal solution is shown by the arrows above. There are 2 side jumps (red arrows).

Note that the frog can jump over obstacles only when making side jumps (as shown at point 2).


Example 2:
Input: obstacles = [0,1,1,3,3,0]
Output: 0
Explanation: There are no obstacles on lane 2. No side jumps are required.


Example 3:
Input: obstacles = [0,2,1,0,3,0]
Output: 2
Explanation: The optimal solution is shown by the arrows above. There are 2 side jumps.


Constraints:
`obstacles.length == n + 1`
`1 <= n <= 5 * 105`
`0 <= obstacles[i] <= 3`
`obstacles[0] == obstacles[n] == 0`', false, 'Medium', NULL, 47.2, 
   0, 'https://leetcode.com/problems/minimum-sideway-jumps', 134, 5, 10.7, '["Pony.ai"]'::jsonb, '["Dynamic Programming,Breadth-first Search"]'::jsonb, 
   147, 8, 95, false, '[]'::jsonb, true),
  (1825, 'Finding MK Average', 'You are given two integers, `m` and `k`, and a stream of integers. You are tasked to implement a data structure that calculates the MKAverage for the stream.

The MKAverage can be calculated using these steps:
If the number of the elements in the stream is less than `m` you should consider the MKAverage to be `-1`. Otherwise, copy the last `m` elements of the stream to a separate container.

Remove the smallest `k` elements and the largest `k` elements from the container.

Calculate the average value for the rest of the elements rounded down to the nearest integer.

Implement the `MKAverage` class:
`MKAverage(int m, int k)` Initializes the MKAverage object with an empty stream and the two integers `m` and `k`.

`void addElement(int num)` Inserts a new element `num` into the stream.

`int calculateMKAverage()` Calculates and returns the MKAverage for the current stream rounded down to the nearest integer.


Example 1:
Input
["MKAverage", "addElement", "addElement", "calculateMKAverage", "addElement", "calculateMKAverage", "addElement", "addElement", "addElement", "calculateMKAverage"]
[[3, 1], [3], [1], [], [10], [], [5], [5], [5], []]
Output
[null, null, null, -1, null, 3, null, null, null, 5]
Explanation
MKAverage obj = new MKAverage(3, 1); 
obj.addElement(3);        // current elements are [3]
obj.addElement(1);        // current elements are [3,1]
obj.calculateMKAverage(); // return -1, because m = 3 and only 2 elements exist.

obj.addElement(10);       // current elements are [3,1,10]
obj.calculateMKAverage(); // The last 3 elements are [3,1,10].

                          // After removing smallest and largest 1 element the container will be `[3].

                          // The average of [3] equals 3/1 = 3, return 3
obj.addElement(5);        // current elements are [3,1,10,5]
obj.addElement(5);        // current elements are [3,1,10,5,5]
obj.addElement(5);        // current elements are [3,1,10,5,5,5]
obj.calculateMKAverage(); // The last 3 elements are [5,5,5].

                          // After removing smallest and largest 1 element the container will be `[5].

                          // The average of [5] equals 5/1 = 5, return 5
``

Constraints:
`3 <= m <= 105`
`1 <= k*2 < m`
`1 <= num <= 105`
At most `105` calls will be made to `addElement` and `calculateMKAverage`.', false, 'Hard', NULL, 28.1, 
   0, 'https://leetcode.com/problems/finding-mk-average', 48, 2.1, 7.4, '["Google"]'::jsonb, '["Heap,Design,Queue"]'::jsonb, 
   52, 43, 55, true, '[]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;

COMMIT;

-- ============================================
-- Import Summary
-- ============================================
-- Total Problems Imported: 1825
-- Skipped: 0
-- ============================================
