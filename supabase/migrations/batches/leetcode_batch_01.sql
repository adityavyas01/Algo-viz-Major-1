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
  (1, 'Two Sum', 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.


Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
`2 <= nums.length <= 103`
`-109 <= nums[i] <= 109`
`-109 <= target <= 109`
Only one valid answer exists.', false, 'Easy', '/articles/two-sum', 46.7, 
   100, 'https://leetcode.com/problems/two-sum', 999, 4.1, 8.7, '["Amazon,Google,Apple,Adobe,Microsoft,Bloomberg,Facebook,Oracle,Uber,Expedia,Twitter,Nagarro,SAP,Yahoo,Cisco,Qualcomm,tcs,Goldman Sachs,Yandex,ServiceNow"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   20217, 712, 97, true, '[]'::jsonb, true),
  (2, 'Add Two Numbers', 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.


Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.


Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

Constraints:
The number of nodes in each linked list is in the range `[1, 100]`.

`0 <= Node.val <= 9`
It is guaranteed that the list represents a number that does not have leading zeros.', false, 'Medium', '/articles/add-two-numbers', 35.7, 
   93.1, 'https://leetcode.com/problems/add-two-numbers', 999, 1.9, 5.2, '["Bloomberg,Microsoft,Amazon,Google,Facebook,Apple,Adobe,Paypal,Coupang,Oracle,Uber,VMware,Yahoo"]'::jsonb, '["Linked List,Math,Recursion"]'::jsonb, 
   11350, 2704, 81, true, '[]'::jsonb, true),
  (3, 'Longest Substring Without Repeating Characters', 'Given a string `s`, find the length of the longest substring without repeating characters.


Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.


Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.


Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.

Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.


Example 4:
Input: s = ""
Output: 0

Constraints:
`0 <= s.length <= 5 * 104`
`s` consists of English letters, digits, symbols and spaces.', false, 'Medium', '/articles/longest-substring-without-repeating-characters', 31.5, 
   90.9, 'https://leetcode.com/problems/longest-substring-without-repeating-characters', 999, 2.1, 6.7, '["Amazon,Bloomberg,Microsoft,Facebook,Apple,Adobe,eBay,Goldman Sachs,Google,Alation,VMware,Oracle,ByteDance,Yahoo,Uber,SAP,Salesforce,Coupang,Splunk,Spotify"]'::jsonb, '["Hash Table,Two Pointers,String,Sliding Window"]'::jsonb, 
   13810, 714, 95, true, '[]'::jsonb, true),
  (4, 'Median of Two Sorted Arrays', 'Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.


Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.


Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.


Example 3:
Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.00000

Example 4:
Input: nums1 = [], nums2 = [1]
Output: 1.00000

Example 5:
Input: nums1 = [2], nums2 = []
Output: 2.00000

Constraints:
`nums1.length == m`
`nums2.length == n`
`0 <= m <= 1000`
`0 <= n <= 1000`
`1 <= m + n <= 2000`
`-106 <= nums1[i], nums2[i] <= 106`
Follow up: The overall run time complexity should be `O(log (m+n))`.', false, 'Hard', '/articles/median-of-two-sorted-arrays', 31.4, 
   86.2, 'https://leetcode.com/problems/median-of-two-sorted-arrays', 999, 904.7, 2.9, '["Amazon,Goldman Sachs,Facebook,Microsoft,Apple,Adobe,Google,Bloomberg,Zillow,Uber,Flipkart,Paypal"]'::jsonb, '["Array,Binary Search,Divide and Conquer"]'::jsonb, 
   9665, 1486, 87, true, '[]'::jsonb, true),
  (5, 'Longest Palindromic Substring', 'Given a string `s`, return the longest palindromic substring in `s`.


Example 1:
Input: s = "babad"
Output: "bab"
Note: "aba" is also a valid answer.


Example 2:
Input: s = "cbbd"
Output: "bb"

Example 3:
Input: s = "a"
Output: "a"

Example 4:
Input: s = "ac"
Output: "a"

Constraints:
`1 <= s.length <= 1000`
`s` consist of only digits and English letters (lower-case and/or upper-case),', false, 'Medium', '/articles/longest-palindromic-substring', 30.6, 
   84.7, 'https://leetcode.com/problems/longest-palindromic-substring', 999, 1.3, 4.1, '["Amazon,Microsoft,Wayfair,Facebook,Adobe,eBay,Google,Oracle,Goldman Sachs,Yandex,Qualcomm"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   10271, 670, 94, true, '[]'::jsonb, true),
  (6, 'ZigZag Conversion', 'The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: `"PAHNAPLSIIGYIR"`
Write the code that will take a string and make this conversion given a number of rows:
string convert(string s, int numRows);

Example 1:
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"

Example 2:
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I

Example 3:
Input: s = "A", numRows = 1
Output: "A"

Constraints:
`1 <= s.length <= 1000`
`s` consists of English letters (lower-case and upper-case), `'',''` and `''.''`.

`1 <= numRows <= 1000`', false, 'Medium', '/articles/zigzag-conversion', 38.2, 
   44.3, 'https://leetcode.com/problems/zigzag-conversion', 999, 558.8, 1.5, '["Microsoft"]'::jsonb, '["String"]'::jsonb, 
   2270, 5686, 29, false, '[]'::jsonb, true),
  (7, 'Reverse Integer', 'Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-231, 231 - 1]`, then return `0`.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).


Example 1:
Input: x = 123
Output: 321

Example 2:
Input: x = -123
Output: -321

Example 3:
Input: x = 120
Output: 21

Example 4:
Input: x = 0
Output: 0

Constraints:
`-231 <= x <= 231 - 1`', false, 'Easy', '/articles/reverse-integer', 25.9, 
   80.9, 'https://leetcode.com/problems/reverse-integer', 999, 1.5, 5.7, '["Amazon,Google,Apple,Facebook,Bloomberg,American Express,Microsoft,Adobe,Uber"]'::jsonb, '["Math"]'::jsonb, 
   4548, 6971, 39, true, '[]'::jsonb, true),
  (8, 'String to Integer (atoi)', 'Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer (similar to C/C++''s `atoi` function).

The algorithm for `myAtoi(string s)` is as follows:
Read in and ignore any leading whitespace.

Check if the next character (if not already at the end of the string) is `''-''` or `''+''`. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.

Read in next the characters until the next non-digit charcter or the end of the input is reached. The rest of the string is ignored.

Convert these digits into an integer (i.e. `"123" -> 123`, `"0032" -> 32`). If no digits were read, then the integer is `0`. Change the sign as necessary (from step 2).

If the integer is out of the 32-bit signed integer range `[-231, 231 - 1]`, then clamp the integer so that it remains in the range. Specifically, integers less than `-231` should be clamped to `-231`, and integers greater than `231 - 1` should be clamped to `231 - 1`.

Return the integer as the final result.

Note:
Only the space character `'' ''` is considered a whitespace character.

Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.


Example 1:
Input: s = "42"
Output: 42
Explanation: The underlined characters are what is read in, the caret is the current reader position.

Step 1: "42" (no characters read because there is no leading whitespace)
         ^
Step 2: "42" (no characters read because there is neither a ''-'' nor ''+'')
         ^
Step 3: "42" ("42" is read in)
           ^
The parsed integer is 42.

Since 42 is in the range [-231, 231 - 1], the final result is 42.


Example 2:
Input: s = "   -42"
Output: -42
Explanation:
Step 1: "   -42" (leading whitespace is read and ignored)
            ^
Step 2: "   -42" (''-'' is read, so the result should be negative)
             ^
Step 3: "   -42" ("42" is read in)
               ^
The parsed integer is -42.

Since -42 is in the range [-231, 231 - 1], the final result is -42.


Example 3:
Input: s = "4193 with words"
Output: 4193
Explanation:
Step 1: "4193 with words" (no characters read because there is no leading whitespace)
         ^
Step 2: "4193 with words" (no characters read because there is neither a ''-'' nor ''+'')
         ^
Step 3: "4193 with words" ("4193" is read in; reading stops because the next character is a non-digit)
             ^
The parsed integer is 4193.

Since 4193 is in the range [-231, 231 - 1], the final result is 4193.


Example 4:
Input: s = "words and 987"
Output: 0
Explanation:
Step 1: "words and 987" (no characters read because there is no leading whitespace)
         ^
Step 2: "words and 987" (no characters read because there is neither a ''-'' nor ''+'')
         ^
Step 3: "words and 987" (reading stops immediately because there is a non-digit ''w'')
         ^
The parsed integer is 0 because no digits were read.

Since 0 is in the range [-231, 231 - 1], the final result is 0.


Example 5:
Input: s = "-91283472332"
Output: -2147483648
Explanation:
Step 1: "-91283472332" (no characters read because there is no leading whitespace)
         ^
Step 2: "-91283472332" (''-'' is read, so the result should be negative)
          ^
Step 3: "-91283472332" ("91283472332" is read in)
                     ^
The parsed integer is -91283472332.

Since -91283472332 is less than the lower bound of the range [-231, 231 - 1], the final result is clamped to -231 = -2147483648. 

Constraints:
`0 <= s.length <= 200`
`s` consists of English letters (lower-case and upper-case), digits (`0-9`), `'' ''`, `''+''`, `''-''`, and `''.''`.', false, 'Medium', '/articles/string-to-integer', 15.7, 
   56, 'https://leetcode.com/problems/string-to-integer-atoi', 999, 716.1, 4.6, '["Facebook,Amazon,Microsoft,Google,Goldman Sachs,Apple,Adobe,Bloomberg,Intel"]'::jsonb, '["Math,String"]'::jsonb, 
   189, 479, 28, true, '[]'::jsonb, true),
  (9, 'Palindrome Number', 'Given an integer `x`, return `true` if `x` is palindrome integer.

An integer is a palindrome when it reads the same backward as forward. For example, `121` is palindrome while `123` is not.


Example 1:
Input: x = 121
Output: true

Example 2:
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.


Example 3:
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.


Example 4:
Input: x = -101
Output: false

Constraints:
`-231 <= x <= 231 - 1`
Follow up: Could you solve it without converting the integer to a string?', false, 'Easy', '/articles/palindrome-number', 50, 
   58.2, 'https://leetcode.com/problems/palindrome-number', 999, 1.2, 2.4, '["Microsoft,Adobe,Bloomberg,Facebook,Google,Yahoo"]'::jsonb, '["Math"]'::jsonb, 
   3199, 1724, 65, true, '[]'::jsonb, true),
  (10, 'Regular Expression Matching', 'Given an input string (`s`) and a pattern (`p`), implement regular expression matching with support for `''.''` and `''*''` where:` `
`''.''` Matches any single character.​​​​
`''*''` Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).


Example 1:
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".


Example 2:
Input: s = "aa", p = "a*"
Output: true
Explanation: ''*'' means zero or more of the preceding element, ''a''. Therefore, by repeating ''a'' once, it becomes "aa".


Example 3:
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".


Example 4:
Input: s = "aab", p = "c*a*b"
Output: true
Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore, it matches "aab".


Example 5:
Input: s = "mississippi", p = "mis*is*p*."
Output: false

Constraints:
`0 <= s.length <= 20`
`0 <= p.length <= 30`
`s` contains only lowercase English letters.

`p` contains only lowercase English letters, `''.''`, and `''*''`.

It is guaranteed for each appearance of the character `''*''`, there will be a previous valid character to match.', false, 'Hard', '/articles/regular-expression-matching', 27.4, 
   75, 'https://leetcode.com/problems/regular-expression-matching', 999, 526.6, 1.9, '["Facebook,Amazon,Microsoft,Google,Adobe,Coursera,Apple"]'::jsonb, '["String,Dynamic Programming,Backtracking"]'::jsonb, 
   5583, 841, 87, true, '[]'::jsonb, true),
  (11, 'Container With Most Water', 'Given `n` non-negative integers `a1, a2, ..., an` , where each represents a point at coordinate `(i, ai)`. `n` vertical lines are drawn such that the two endpoints of the line `i` is at `(i, ai)` and `(i, 0)`. Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.

Notice that you may not slant the container.


Example 1:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.


Example 2:
Input: height = [1,1]
Output: 1

Example 3:
Input: height = [4,3,2,1,4]
Output: 16

Example 4:
Input: height = [1,2,1]
Output: 2

Constraints:
`n == height.length`
`2 <= n <= 105`
`0 <= height[i] <= 104`', false, 'Medium', '/articles/container-with-most-water', 52.9, 
   67.3, 'https://leetcode.com/problems/container-with-most-water', 999, 912.2, 1.7, '["Amazon,Google,Microsoft,Facebook,Goldman Sachs,Adobe,Apple"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   9031, 696, 93, true, '[]'::jsonb, true),
  (12, 'Integer to Roman', 'Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, `2` is written as `II` in Roman numeral, just two one''s added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:
`I` can be placed before `V` (5) and `X` (10) to make 4 and 9. 
`X` can be placed before `L` (50) and `C` (100) to make 40 and 90. 
`C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given an integer, convert it to a roman numeral.


Example 1:
Input: num = 3
Output: "III"

Example 2:
Input: num = 4
Output: "IV"

Example 3:
Input: num = 9
Output: "IX"

Example 4:
Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.


Example 5:
Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.


Constraints:
`1 <= num <= 3999`', false, 'Medium', '/articles/integer-to-roman', 57.1, 
   41.8, 'https://leetcode.com/problems/integer-to-roman', 999, 474.6, 831.1, '["Amazon,Bloomberg,Microsoft,Adobe,Google,Apple,Oracle"]'::jsonb, '["Math,String"]'::jsonb, 
   1675, 3112, 35, true, '[]'::jsonb, true),
  (13, 'Roman to Integer', 'Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, `2` is written as `II` in Roman numeral, just two one''s added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:
`I` can be placed before `V` (5) and `X` (10) to make 4 and 9. 
`X` can be placed before `L` (50) and `C` (100) to make 40 and 90. 
`C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.


Example 1:
Input: s = "III"
Output: 3

Example 2:
Input: s = "IV"
Output: 4

Example 3:
Input: s = "IX"
Output: 9

Example 4:
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.


Example 5:
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.


Constraints:
`1 <= s.length <= 15`
`s` contains only the characters `(''I'', ''V'', ''X'', ''L'', ''C'', ''D'', ''M'')`.

It is guaranteed that `s` is a valid roman numeral in the range `[1, 3999]`.', false, 'Easy', '/articles/roman-to-integer', 57, 
   60.5, 'https://leetcode.com/problems/roman-to-integer', 999, 947.4, 1.7, '["Amazon,Roblox,Microsoft,Adobe,Facebook,LinkedIn,Google,Apple,Uber,Qualtrics,Oracle,eBay"]'::jsonb, '["Math,String"]'::jsonb, 
   419, 40, 91, true, '[]'::jsonb, true),
  (14, 'Longest Common Prefix', 'Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.


Example 1:
Input: strs = ["flower","flow","flight"]
Output: "fl"

Example 2:
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.


Constraints:
`0 <= strs.length <= 200`
`0 <= strs[i].length <= 200`
`strs[i]` consists of only lower-case English letters.', false, 'Easy', '/articles/longest-common-prefix', 36.2, 
   69.1, 'https://leetcode.com/problems/longest-common-prefix', 999, 991.1, 2.7, '["Facebook,Adobe,Amazon,Apple,Bloomberg,Microsoft,Yahoo,Google"]'::jsonb, '["String"]'::jsonb, 
   3958, 2192, 64, true, '[]'::jsonb, true),
  (15, '3Sum', 'Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.


Example 1:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

Example 2:
Input: nums = []
Output: []

Example 3:
Input: nums = [0]
Output: []

Constraints:
`0 <= nums.length <= 3000`
`-105 <= nums[i] <= 105`', false, 'Medium', '/articles/3sum', 28.3, 
   78.8, 'https://leetcode.com/problems/3sum', 999, 1.3, 4.4, '["Amazon,Facebook,Microsoft,Bloomberg,Apple,Adobe,VMware,Google,Cisco,Tesla,Goldman Sachs,eBay"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   10032, 1035, 91, true, '[]'::jsonb, true),
  (16, '3Sum Closest', 'Given an array `nums` of n integers and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return the sum of the three integers. You may assume that each input would have exactly one solution.


Example 1:
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).


Constraints:
`3 <= nums.length <= 10^3`
`-10^3 <= nums[i] <= 10^3`
`-10^4 <= target <= 10^4`', false, 'Medium', '/articles/3sum-closest', 46.3, 
   55.8, 'https://leetcode.com/problems/3sum-closest', 999, 571.3, 1.2, '["Amazon,Apple,Google,Facebook,Bloomberg"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   3095, 169, 95, true, '[]'::jsonb, true),
  (17, 'Letter Combinations of a Phone Number', 'Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.


Example 1:
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Example 2:
Input: digits = ""
Output: []

Example 3:
Input: digits = "2"
Output: ["a","b","c"]

Constraints:
`0 <= digits.length <= 4`
`digits[i]` is a digit in the range `[''2'', ''9'']`.', false, 'Medium', '/articles/letter-combinations-of-a-phone-number', 49.5, 
   78, 'https://leetcode.com/problems/letter-combinations-of-a-phone-number', 999, 795.7, 1.6, '["Amazon,Microsoft,Twilio,Facebook,Capital One,eBay,Google,Uber,Apple,Oracle,JPMorgan,Morgan Stanley,Tesla,Qualtrics,Samsung"]'::jsonb, '["String,Backtracking,Depth-first Search,Recursion"]'::jsonb, 
   5684, 509, 92, true, '[]'::jsonb, true),
  (18, '4Sum', 'Given an array `nums` of n integers and an integer `target`, are there elements a, b, c, and d in `nums` such that a + b + c + d = `target`? Find all unique quadruplets in the array which gives the sum of `target`.

Notice that the solution set must not contain duplicate quadruplets.


Example 1:
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

Example 2:
Input: nums = [], target = 0
Output: []

Constraints:
`0 <= nums.length <= 200`
`-109 <= nums[i] <= 109`
`-109 <= target <= 109`', false, 'Medium', '/articles/4sum', 35.1, 
   47, 'https://leetcode.com/problems/4sum', 999, 403.7, 1.2, '["Amazon,Bloomberg"]'::jsonb, '["Array,Hash Table,Two Pointers"]'::jsonb, 
   3154, 406, 89, true, '[]'::jsonb, true),
  (19, 'Remove Nth Node From End of List', 'Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

Follow up: Could you do this in one pass?

Example 1:
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Example 2:
Input: head = [1], n = 1
Output: []

Example 3:
Input: head = [1,2], n = 1
Output: [1]

Constraints:
The number of nodes in the list is `sz`.

`1 <= sz <= 30`
`0 <= Node.val <= 100`
`1 <= n <= sz`', false, 'Medium', '/articles/remove-nth-node-from-end-of-list', 35.9, 
   42.8, 'https://leetcode.com/problems/remove-nth-node-from-end-of-list', 999, 829.5, 2.3, '["Facebook,Amazon,Microsoft,Bloomberg,Apple"]'::jsonb, '["Linked List,Two Pointers"]'::jsonb, 
   5039, 298, 94, true, '[]'::jsonb, true),
  (20, 'Valid Parentheses', 'Given a string `s` containing just the characters `''(''`, `'')''`, `''{''`, `''}''`, `''[''` and `'']''`, determine if the input string is valid.

An input string is valid if:
Open brackets must be closed by the same type of brackets.

Open brackets must be closed in the correct order.


Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Example 4:
Input: s = "([)]"
Output: false

Example 5:
Input: s = "{[]}"
Output: true

Constraints:
`1 <= s.length <= 104`
`s` consists of parentheses only `''()[]{}''`.', false, 'Easy', '/articles/valid-parentheses', 40, 
   90.2, 'https://leetcode.com/problems/valid-parentheses', 999, 1.4, 3.4, '["Amazon,Bloomberg,Facebook,Apple,Microsoft,Expedia,Spotify,Google,LinkedIn,Goldman Sachs,Oracle,IBM,JPMorgan,Intuit,Paypal,Atlassian,eBay,Adobe,ServiceNow,Qualcomm"]'::jsonb, '["String,Stack"]'::jsonb, 
   7188, 294, 96, true, '[]'::jsonb, true),
  (21, 'Merge Two Sorted Lists', 'Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.


Example 1:
Input: l1 = [1,2,4], l2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:
Input: l1 = [], l2 = []
Output: []

Example 3:
Input: l1 = [], l2 = [0]
Output: [0]

Constraints:
The number of nodes in both lists is in the range `[0, 50]`.

`-100 <= Node.val <= 100`
Both `l1` and `l2` are sorted in non-decreasing order.', false, 'Easy', '/articles/merge-two-sorted-lists', 56.4, 
   71.9, 'https://leetcode.com/problems/merge-two-sorted-lists', 999, 1.4, 2.4, '["Amazon,Adobe,Bloomberg,Capital One,Facebook,Microsoft,Oracle,LinkedIn,Uber,VMware,IBM,ByteDance"]'::jsonb, '["Linked List,Recursion"]'::jsonb, 
   6467, 753, 90, true, '[]'::jsonb, true),
  (22, 'Generate Parentheses', 'Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.


Example 1:
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]

Example 2:
Input: n = 1
Output: ["()"]

Constraints:
`1 <= n <= 8`', false, 'Medium', '/articles/generate-parentheses', 65.7, 
   72.6, 'https://leetcode.com/problems/generate-parentheses', 999, 714.5, 1.1, '["Microsoft,Facebook,Google,Bloomberg,Amazon,Apple,Adobe,Walmart Labs,ByteDance,Nvidia,Oracle"]'::jsonb, '["String,Backtracking"]'::jsonb, 
   7496, 322, 96, true, '[]'::jsonb, true),
  (23, 'Merge k Sorted Lists', 'You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.


Example 1:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

Example 2:
Input: lists = []
Output: []

Example 3:
Input: lists = [[]]
Output: []

Constraints:
`k == lists.length`
`0 <= k <= 10^4`
`0 <= lists[i].length <= 500`
`-10^4 <= lists[i][j] <= 10^4`
`lists[i]` is sorted in ascending order.

The sum of `lists[i].length` won''t exceed `10^4`.', false, 'Hard', '/articles/merge-k-sorted-list', 43, 
   83.2, 'https://leetcode.com/problems/merge-k-sorted-lists', 999, 856.1, 2, '["Amazon,Facebook,Microsoft,Bloomberg,Apple,Oracle,Databricks,Google,Twitter,Uber,Adobe,Wish,ByteDance,Palantir Technologies,Tesla"]'::jsonb, '["Linked List,Divide and Conquer,Heap"]'::jsonb, 
   6892, 349, 95, true, '[]'::jsonb, true),
  (24, 'Swap Nodes in Pairs', 'Given a linked list, swap every two adjacent nodes and return its head.


Example 1:
Input: head = [1,2,3,4]
Output: [2,1,4,3]

Example 2:
Input: head = []
Output: []

Example 3:
Input: head = [1]
Output: [1]

Constraints:
The number of nodes in the list is in the range `[0, 100]`.

`0 <= Node.val <= 100`
Follow up: Can you solve the problem without modifying the values in the list''s nodes? (i.e., Only nodes themselves may be changed.)', false, 'Medium', '/articles/swap-nodes-in-pairs', 53.5, 
   27.5, 'https://leetcode.com/problems/swap-nodes-in-pairs', 999, 594.5, 1.1, '["Microsoft,Amazon,Facebook,Google,eBay,ByteDance"]'::jsonb, '["Linked List,Recursion"]'::jsonb, 
   3482, 209, 94, true, '[]'::jsonb, true),
  (25, 'Reverse Nodes in k-Group', 'Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

Follow up:
Could you solve the problem in `O(1)` extra memory space?
You may not alter the values in the list''s nodes, only nodes itself may be changed.


Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]

Example 2:
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]

Example 3:
Input: head = [1,2,3,4,5], k = 1
Output: [1,2,3,4,5]

Example 4:
Input: head = [1], k = 1
Output: [1]

Constraints:
The number of nodes in the list is in the range `sz`.

`1 <= sz <= 5000`
`0 <= Node.val <= 1000`
`1 <= k <= sz`', false, 'Hard', '/articles/reverse-nodes-in-k-group', 45.3, 
   69.1, 'https://leetcode.com/problems/reverse-nodes-in-k-group', 999, 341.1, 752.3, '["Amazon,Microsoft,Apple,ByteDance,Facebook,Google"]'::jsonb, '["Linked List"]'::jsonb, 
   3490, 400, 90, true, '[]'::jsonb, true),
  (26, 'Remove Duplicates from Sorted Array', 'Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

Clarification:
Confused why the returned value is an integer but your answer is an array?
Note that the input array is passed in by reference, which means a modification to the input array will be known to the caller as well.

Internally you can think of this:
// nums is passed in by reference. (i.e., without making a copy)
int len = removeDuplicates(nums);
// any modification to nums in your function would be known by the caller.

// using the length returned by your function, it prints the first len elements.

for (int i = 0; i < len; i++) {
    print(nums[i]);
}

Example 1:
Input: nums = [1,1,2]
Output: 2, nums = [1,2]
Explanation: Your function should return length = `2`, with the first two elements of `nums` being `1` and `2` respectively. It doesn''t matter what you leave beyond the returned length.


Example 2:
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4]
Explanation: Your function should return length = `5`, with the first five elements of `nums` being modified to `0`, `1`, `2`, `3`, and `4` respectively. It doesn''t matter what values are set beyond the returned length.


Constraints:
`0 <= nums.length <= 3 * 104`
`-104 <= nums[i] <= 104`
`nums` is sorted in ascending order.', false, 'Easy', '/articles/remove-duplicates-from-sorted-array', 46.8, 
   35.8, 'https://leetcode.com/problems/remove-duplicates-from-sorted-array', 999, 1.4, 2.9, '["Google,Facebook,Amazon,Microsoft"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   3727, 6758, 36, true, '[]'::jsonb, true),
  (27, 'Remove Element', 'Given an array nums and a value `val`, remove all instances of that value in-place and return the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with `O(1)` extra memory.

The order of elements can be changed. It doesn''t matter what you leave beyond the new length.

Clarification:
Confused why the returned value is an integer but your answer is an array?
Note that the input array is passed in by reference, which means a modification to the input array will be known to the caller as well.

Internally you can think of this:
// nums is passed in by reference. (i.e., without making a copy)
int len = removeElement(nums, val);
// any modification to nums in your function would be known by the caller.

// using the length returned by your function, it prints the first len elements.

for (int i = 0; i < len; i++) {
    print(nums[i]);
}

Example 1:
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2]
Explanation: Your function should return length = 2, with the first two elements of nums being 2.

It doesn''t matter what you leave beyond the returned length. For example if you return 2 with nums = [2,2,3,3] or nums = [2,2,0,0], your answer will be accepted.


Example 2:
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3]
Explanation: Your function should return length = `5`, with the first five elements of `nums` containing `0`, `1`, `3`, `0`, and 4. Note that the order of those five elements can be arbitrary. It doesn''t matter what values are set beyond the returned length.


Constraints:
`0 <= nums.length <= 100`
`0 <= nums[i] <= 50`
`0 <= val <= 100`', false, 'Easy', '/articles/remove-element', 49.5, 
   15.4, 'https://leetcode.com/problems/remove-element', 999, 821.3, 1.7, '["Adobe,Amazon,Oracle"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   2044, 3449, 37, true, '[]'::jsonb, true),
  (28, 'Implement strStr()', 'Implement strStr().

Return the index of the first occurrence of needle in haystack, or `-1` if `needle` is not part of `haystack`.

Clarification:
What should we return when `needle` is an empty string? This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when `needle` is an empty string. This is consistent to C''s strstr() and Java''s indexOf().


Example 1:
Input: haystack = "hello", needle = "ll"
Output: 2

Example 2:
Input: haystack = "aaaaa", needle = "bba"
Output: -1

Example 3:
Input: haystack = "", needle = ""
Output: 0

Constraints:
`0 <= haystack.length, needle.length <= 5 * 104`
`haystack` and `needle` consist of only lower-case English characters.', false, 'Easy', '/articles/implement-strstr', 35.3, 
   24.9, 'https://leetcode.com/problems/implement-strstr', 999, 854.7, 2.4, '["Facebook,Apple,Amazon"]'::jsonb, '["Two Pointers,String"]'::jsonb, 
   2261, 2319, 49, true, '[]'::jsonb, true),
  (29, 'Divide Two Integers', 'Given two integers `dividend` and `divisor`, divide two integers without using multiplication, division, and mod operator.

Return the quotient after dividing `dividend` by `divisor`.

The integer division should truncate toward zero, which means losing its fractional part. For example, `truncate(8.345) = 8` and `truncate(-2.7335) = -2`.

Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: `[−231, 231 − 1]`. For this problem, assume that your function returns `231 − 1` when the division result overflows.


Example 1:
Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = truncate(3.33333..) = 3.


Example 2:
Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = truncate(-2.33333..) = -2.


Example 3:
Input: dividend = 0, divisor = 1
Output: 0

Example 4:
Input: dividend = 1, divisor = 1
Output: 1

Constraints:
`-231 <= dividend, divisor <= 231 - 1`
`divisor != 0`', false, 'Medium', '/articles/divide-integers', 16.9, 
   50.5, 'https://leetcode.com/problems/divide-two-integers', 999, 359.2, 2.1, '["Facebook,Amazon"]'::jsonb, '["Math,Binary Search"]'::jsonb, 
   1727, 6727, 20, true, '[]'::jsonb, true),
  (30, 'Substring with Concatenation of All Words', 'You are given a string `s` and an array of strings `words` of the same length. Return all starting indices of substring(s) in `s` that is a concatenation of each word in `words` exactly once, in any order, and without any intervening characters.

You can return the answer in any order.


Example 1:
Input: s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0,9]
Explanation: Substrings starting at index 0 and 9 are "barfoo" and "foobar" respectively.

The output order does not matter, returning [9,0] is fine too.


Example 2:
Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
Output: []

Example 3:
Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
Output: [6,9,12]

Constraints:
`1 <= s.length <= 104`
`s` consists of lower-case English letters.

`1 <= words.length <= 5000`
`1 <= words[i].length <= 30`
`words[i]` consists of lower-case English letters.', false, 'Hard', NULL, 26.4, 
   31, 'https://leetcode.com/problems/substring-with-concatenation-of-all-words', 732, 203, 770, '["Amazon,Adobe"]'::jsonb, '["Hash Table,Two Pointers,String"]'::jsonb, 
   1209, 1455, 45, true, '[]'::jsonb, true),
  (31, 'Next Permutation', 'Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).

The replacement must be in place and use only constant extra memory.


Example 1:
Input: nums = [1,2,3]
Output: [1,3,2]

Example 2:
Input: nums = [3,2,1]
Output: [1,2,3]

Example 3:
Input: nums = [1,1,5]
Output: [1,5,1]

Example 4:
Input: nums = [1]
Output: [1]

Constraints:
`1 <= nums.length <= 100`
`0 <= nums[i] <= 100`', false, 'Medium', '/articles/next-permutation', 33.9, 
   82.9, 'https://leetcode.com/problems/next-permutation', 999, 497.7, 1.5, '["Facebook,Amazon,Google,Microsoft,Rubrik,Bloomberg,Apple,Morgan Stanley,Goldman Sachs,Atlassian,tcs"]'::jsonb, '["Array"]'::jsonb, 
   5271, 1811, 74, true, '[]'::jsonb, true),
  (32, 'Longest Valid Parentheses', 'Given a string containing just the characters `''(''` and `'')''`, find the length of the longest valid (well-formed) parentheses substring.


Example 1:
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".


Example 2:
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".


Example 3:
Input: s = ""
Output: 0

Constraints:
`0 <= s.length <= 3 * 104`
`s[i]` is `''(''`, or `'')''`.', false, 'Hard', '/articles/longest-valid-parentheses', 29.9, 
   24.5, 'https://leetcode.com/problems/longest-valid-parentheses', 999, 366.3, 1.2, '["Amazon,Facebook,Apple,ByteDance"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   5015, 182, 96, true, '[]'::jsonb, true),
  (33, 'Search in Rotated Sorted Array', 'There is an integer array `nums` sorted in ascending order (with distinct values).

Prior to being passed to your function, `nums` is rotated at an unknown pivot index `k` (`0 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed). For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index `3` and become `[4,5,6,7,0,1,2]`.

Given the array `nums` after the rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.


Example 1:
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Example 2:
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

Example 3:
Input: nums = [1], target = 0
Output: -1

Constraints:
`1 <= nums.length <= 5000`
`-104 <= nums[i] <= 104`
All values of `nums` are unique.

`nums` is guaranteed to be rotated at some pivot.

`-104 <= target <= 104`
Follow up: Can you achieve this in `O(log n)` time complexity?', false, 'Medium', '/articles/search-in-rotated-sorted-array', 36.1, 
   77.8, 'https://leetcode.com/problems/search-in-rotated-sorted-array', 999, 960.2, 2.7, '["Amazon,Facebook,Microsoft,LinkedIn,Oracle,Apple,Bloomberg,Nvidia,Expedia,Google,Adobe,Zillow,ByteDance,eBay,Cisco,ServiceNow,C3 IoT"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   7349, 644, 92, true, '[]'::jsonb, true),
  (34, 'Find First and Last Position of Element in Sorted Array', 'Given an array of integers `nums` sorted in ascending order, find the starting and ending position of a given `target` value.

If `target` is not found in the array, return `[-1, -1]`.

Follow up: Could you write an algorithm with `O(log n)` runtime complexity?

Example 1:
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Example 2:
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Example 3:
Input: nums = [], target = 0
Output: [-1,-1]

Constraints:
`0 <= nums.length <= 105`
`-109 <= nums[i] <= 109`
`nums` is a non-decreasing array.

`-109 <= target <= 109`', false, 'Medium', '/articles/find-first-and-last-position-of-element-in-sorted-array', 37.5, 
   55.9, 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array', 999, 677.5, 1.8, '["Facebook,Amazon,Uber,Google,Microsoft,LinkedIn,Bloomberg,Snapchat,Oracle"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   5257, 201, 96, true, '[]'::jsonb, true),
  (35, 'Search Insert Position', 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.


Example 1:
Input: nums = [1,3,5,6], target = 5
Output: 2

Example 2:
Input: nums = [1,3,5,6], target = 2
Output: 1

Example 3:
Input: nums = [1,3,5,6], target = 7
Output: 4

Example 4:
Input: nums = [1,3,5,6], target = 0
Output: 0

Example 5:
Input: nums = [1], target = 0
Output: 0

Constraints:
`1 <= nums.length <= 104`
`-104 <= nums[i] <= 104`
`nums` contains distinct values sorted in ascending order.

`-104 <= target <= 104`', false, 'Easy', '/articles/search-insert-position', 42.9, 
   21.2, 'https://leetcode.com/problems/search-insert-position', 999, 799.5, 1.9, '["Apple,Amazon"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   3384, 287, 92, true, '[]'::jsonb, true),
  (36, 'Valid Sudoku', 'Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
Each row must contain the digits `1-9` without repetition.

Each column must contain the digits `1-9` without repetition.

Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.

Note:
A Sudoku board (partially filled) could be valid but is not necessarily solvable.

Only the filled cells need to be validated according to the mentioned rules.


Example 1:
Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

Example 2:
Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false

Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8''s in the top left 3x3 sub-box, it is invalid.


Constraints:
`board.length == 9`
`board[i].length == 9`
`board[i][j]` is a digit or `''.''`.', false, 'Medium', '/articles/valid-sudoku', 50.8, 
   44.2, 'https://leetcode.com/problems/valid-sudoku', 999, 464.9, 914.2, '["Amazon,Roblox,Uber,Apple,Facebook,Goldman Sachs,Oracle"]'::jsonb, '["Hash Table"]'::jsonb, 
   2458, 550, 82, true, '[]'::jsonb, true),
  (37, 'Sudoku Solver', 'Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:
Each of the digits `1-9` must occur exactly once in each row.

Each of the digits `1-9` must occur exactly once in each column.

Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.

The `''.''` character indicates empty cells.


Example 1:
Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
Explanation: The input board is shown above and the only valid solution is shown below:

Constraints:
`board.length == 9`
`board[i].length == 9`
`board[i][j]` is a digit or `''.''`.

It is guaranteed that the input board has only one solution.', false, 'Hard', '/articles/sudoku-solver', 47, 
   67.6, 'https://leetcode.com/problems/sudoku-solver', 999, 231.5, 492.2, '["DoorDash,Amazon,Oracle,Pinterest,Facebook,Intuit"]'::jsonb, '["Hash Table,Backtracking"]'::jsonb, 
   2662, 104, 96, true, '[]'::jsonb, true),
  (38, 'Count and Say', 'The count-and-say sequence is a sequence of digit strings defined by the recursive formula:
`countAndSay(1) = "1"`
`countAndSay(n)` is the way you would "say" the digit string from `countAndSay(n-1)`, which is then converted into a different digit string.

To determine how you "say" a digit string, split it into the minimal number of groups so that each group is a contiguous section all of the same character. Then for each group, say the number of characters, then say the character. To convert the saying into a digit string, replace the counts with a number and concatenate every saying.

For example, the saying and conversion for digit string `"3322251"`:
Given a positive integer `n`, return the `nth` term of the count-and-say sequence.


Example 1:
Input: n = 1
Output: "1"
Explanation: This is the base case.


Example 2:
Input: n = 4
Output: "1211"
Explanation:
countAndSay(1) = "1"
countAndSay(2) = say "1" = one 1 = "11"
countAndSay(3) = say "11" = two 1''s = "21"
countAndSay(4) = say "21" = one 2 + one 1 = "12" + "11" = "1211"

Constraints:
`1 <= n <= 30`', false, 'Medium', '/articles/count-and-say', 46.3, 
   64.3, 'https://leetcode.com/problems/count-and-say', 999, 493, 1.1, '["Bloomberg,Facebook,Amazon,Microsoft,Apple,Epic Systems,Tesla"]'::jsonb, '["String"]'::jsonb, 
   367, 1314, 22, true, '[]'::jsonb, true),
  (39, 'Combination Sum', 'Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order.

The same number may be chosen from `candidates` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

It is guaranteed that the number of unique combinations that sum up to `target` is less than `150` combinations for the given input.


Example 1:
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.

7 is a candidate, and 7 = 7.

These are the only two combinations.


Example 2:
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]

Example 3:
Input: candidates = [2], target = 1
Output: []

Example 4:
Input: candidates = [1], target = 1
Output: [[1]]

Example 5:
Input: candidates = [1], target = 2
Output: [[1,1]]

Constraints:
`1 <= candidates.length <= 30`
`1 <= candidates[i] <= 200`
All elements of `candidates` are distinct.

`1 <= target <= 500`', false, 'Medium', '/articles/combination-sum', 59.7, 
   60.8, 'https://leetcode.com/problems/combination-sum', 999, 711.7, 1.2, '["Facebook,Airbnb,Microsoft,Bloomberg,Amazon,Apple,Uber,Adobe,eBay,Citadel,ByteDance"]'::jsonb, '["Array,Backtracking"]'::jsonb, 
   5708, 150, 97, true, '[]'::jsonb, true),
  (40, 'Combination Sum II', 'Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.

Each number in `candidates` may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.


Example 1:
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

Example 2:
Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]

Constraints:
`1 <= candidates.length <= 100`
`1 <= candidates[i] <= 50`
`1 <= target <= 30`', false, 'Medium', '/articles/combination-sum-ii', 50.4, 
   21.6, 'https://leetcode.com/problems/combination-sum-ii', 999, 399.5, 792.8, '["Amazon,Uber,Microsoft,ByteDance"]'::jsonb, '["Array,Backtracking"]'::jsonb, 
   2629, 86, 97, true, '[]'::jsonb, true),
  (41, 'First Missing Positive', 'Given an unsorted integer array `nums`, find the smallest missing positive integer.


Example 1:
Input: nums = [1,2,0]
Output: 3

Example 2:
Input: nums = [3,4,-1,1]
Output: 2

Example 3:
Input: nums = [7,8,9,11,12]
Output: 1

Constraints:
`0 <= nums.length <= 300`
`-231 <= nums[i] <= 231 - 1`
Follow up: Could you implement an algorithm that runs in `O(n)` time and uses constant extra space?', false, 'Hard', '/articles/first-missing-positive', 33.9, 
   77.3, 'https://leetcode.com/problems/first-missing-positive', 999, 466.2, 1.4, '["Microsoft,Amazon,Facebook,Google,Oracle,Adobe,Bloomberg,Wish,Uber,Apple,Walmart Labs,Tesla,JPMorgan"]'::jsonb, '["Array"]'::jsonb, 
   5504, 970, 85, true, '[]'::jsonb, true),
  (42, 'Trapping Rain Water', 'Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.


Example 1:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.


Example 2:
Input: height = [4,2,0,3,2,5]
Output: 9

Constraints:
`n == height.length`
`0 <= n <= 3 * 104`
`0 <= height[i] <= 105`', false, 'Hard', '/articles/trapping-rain-water', 51.6, 
   96.3, 'https://leetcode.com/problems/trapping-rain-water', 999, 715, 1.4, '["Goldman Sachs,Facebook,Amazon,Microsoft,Bloomberg,Apple,Databricks,Google,Qualtrics,Adobe,Oracle,Yahoo"]'::jsonb, '["Array,Two Pointers,Dynamic Programming,Stack"]'::jsonb, 
   10683, 159, 99, true, '[]'::jsonb, true),
  (43, 'Multiply Strings', 'Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string.

Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.


Example 1:
Input: num1 = "2", num2 = "3"
Output: "6"

Example 2:
Input: num1 = "123", num2 = "456"
Output: "56088"

Constraints:
`1 <= num1.length, num2.length <= 200`
`num1` and `num2` consist of digits only.

Both `num1` and `num2` do not contain any leading zero, except the number `0` itself.', false, 'Medium', NULL, 35.1, 
   56.3, 'https://leetcode.com/problems/multiply-strings', 999, 360.6, 1, '["Facebook,Microsoft,Amazon,Square,Apple,Bloomberg,Two Sigma,ByteDance"]'::jsonb, '["Math,String"]'::jsonb, 
   2400, 976, 71, true, '[]'::jsonb, true),
  (44, 'Wildcard Matching', 'Given an input string (`s`) and a pattern (`p`), implement wildcard pattern matching with support for `''?''` and `''*''` where:
`''?''` Matches any single character.

`''*''` Matches any sequence of characters (including the empty sequence).

The matching should cover the entire input string (not partial).


Example 1:
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".


Example 2:
Input: s = "aa", p = "*"
Output: true
Explanation: ''*'' matches any sequence.


Example 3:
Input: s = "cb", p = "?a"
Output: false
Explanation: ''?'' matches ''c'', but the second letter is ''a'', which does not match ''b''.


Example 4:
Input: s = "adceb", p = "*a*b"
Output: true
Explanation: The first ''*'' matches the empty sequence, while the second ''*'' matches the substring "dce".


Example 5:
Input: s = "acdcb", p = "a*c?b"
Output: false

Constraints:
`0 <= s.length, p.length <= 2000`
`s` contains only lowercase English letters.

`p` contains only lowercase English letters, `''?''` or `''*''`.', false, 'Hard', '/articles/wildcard-matching', 25.5, 
   59, 'https://leetcode.com/problems/wildcard-matching', 823, 296.2, 1.2, '["Adobe,Amazon,Citadel,Facebook,Microsoft,Google,Bloomberg,Snapchat"]'::jsonb, '["String,Dynamic Programming,Backtracking,Greedy"]'::jsonb, 
   2848, 139, 95, true, '[]'::jsonb, true),
  (45, 'Jump Game II', 'Given an array of non-negative integers `nums`, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Your goal is to reach the last index in the minimum number of jumps.

You can assume that you can always reach the last index.


Example 1:
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.


Example 2:
Input: nums = [2,3,0,1,4]
Output: 2

Constraints:
`1 <= nums.length <= 1000`
`0 <= nums[i] <= 105`', false, 'Medium', '/articles/jump-game-ii', 31.7, 
   51.1, 'https://leetcode.com/problems/jump-game-ii', 999, 327.5, 1, '["Amazon,Apple"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   3908, 175, 96, true, '[]'::jsonb, true),
  (46, 'Permutations', 'Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.


Example 1:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Example 2:
Input: nums = [0,1]
Output: [[0,1],[1,0]]

Example 3:
Input: nums = [1]
Output: [[1]]

Constraints:
`1 <= nums.length <= 6`
`-10 <= nums[i] <= 10`
All the integers of `nums` are unique.', false, 'Medium', '/articles/permutations', 67.1, 
   61.5, 'https://leetcode.com/problems/permutations', 999, 790.1, 1.2, '["Facebook,Amazon,ByteDance,LinkedIn,Apple,eBay,Microsoft,Paypal,Oracle"]'::jsonb, '["Backtracking"]'::jsonb, 
   5749, 131, 98, true, '[]'::jsonb, true),
  (47, 'Permutations II', 'Given a collection of numbers, `nums`, that might contain duplicates, return all possible unique permutations in any order.


Example 1:
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]

Example 2:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Constraints:
`1 <= nums.length <= 8`
`-10 <= nums[i] <= 10`', false, 'Medium', '/articles/permutations-ii', 49.8, 
   22.1, 'https://leetcode.com/problems/permutations-ii', 999, 445.9, 895.6, '["Facebook,Amazon,Microsoft"]'::jsonb, '["Backtracking"]'::jsonb, 
   2871, 78, 97, true, '[]'::jsonb, true),
  (48, 'Rotate Image', 'You are given an n x n 2D `matrix` representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.


Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

Example 2:
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Example 3:
Input: matrix = [[1]]
Output: [[1]]

Example 4:
Input: matrix = [[1,2],[3,4]]
Output: [[3,1],[4,2]]

Constraints:
`matrix.length == n`
`matrix[i].length == n`
`1 <= n <= 20`
`-1000 <= matrix[i][j] <= 1000`', false, 'Medium', '/articles/rotate-image', 60.5, 
   69.9, 'https://leetcode.com/problems/rotate-image', 999, 553.5, 915.2, '["Amazon,Microsoft,Apple,Uber,Cisco,Facebook,Rubrik,Adobe,Nvidia,Google,Quora,eBay,PayTM"]'::jsonb, '["Array"]'::jsonb, 
   4619, 329, 93, true, '[]'::jsonb, true),
  (49, 'Group Anagrams', 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.


Example 1:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
Input: strs = [""]
Output: [[""]]

Example 3:
Input: strs = ["a"]
Output: [["a"]]

Constraints:
`1 <= strs.length <= 104`
`0 <= strs[i].length <= 100`
`strs[i]` consists of lower-case English letters.', false, 'Medium', '/articles/group-anagrams', 59.7, 
   79.9, 'https://leetcode.com/problems/group-anagrams', 999, 891.7, 1.5, '["Amazon,Microsoft,Goldman Sachs,Apple,Uber,eBay,VMware,Oracle,Yandex,Expedia,Affirm,Facebook,Google,Bloomberg,Twilio,Docusign,Cisco,Two Sigma,ByteDance,Intel"]'::jsonb, '["Hash Table,String"]'::jsonb, 
   5182, 228, 96, true, '[]'::jsonb, true),
  (50, 'Pow(x, n)', 'Implement pow(x, n), which calculates `x` raised to the power `n` (i.e., `xn`).


Example 1:
Input: x = 2.00000, n = 10
Output: 1024.00000

Example 2:
Input: x = 2.10000, n = 3
Output: 9.26100

Example 3:
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2-2 = 1/22 = 1/4 = 0.25

Constraints:
`-100.0 < x < 100.0`
`-231 <= n <= 231-1`
`-104 <= xn <= 104`', false, 'Medium', '/articles/powx-n', 31, 
   65, 'https://leetcode.com/problems/powx-n', 999, 617, 2, '["Facebook,Microsoft,Amazon,LinkedIn,Bloomberg,Google,eBay,Goldman Sachs"]'::jsonb, '["Math,Binary Search"]'::jsonb, 
   2263, 3719, 38, true, '[]'::jsonb, true),
  (51, 'N-Queens', 'The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.

Given an integer `n`, return all distinct solutions to the n-queens puzzle.

Each solution contains a distinct board configuration of the n-queens'' placement, where `''Q''` and `''.''` both indicate a queen and an empty space, respectively.


Example 1:
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

Example 2:
Input: n = 1
Output: [["Q"]]

Constraints:
`1 <= n <= 9`', false, 'Hard', '/articles/n-queens', 50.2, 
   60.1, 'https://leetcode.com/problems/n-queens', 999, 248.4, 495.2, '["Facebook,Microsoft,Amazon,ByteDance,Apple,Adobe"]'::jsonb, '["Backtracking"]'::jsonb, 
   2803, 102, 96, true, '[]'::jsonb, true),
  (52, 'N-Queens II', 'The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.

Given an integer `n`, return the number of distinct solutions to the n-queens puzzle.


Example 1:
Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.


Example 2:
Input: n = 1
Output: 1

Constraints:
`1 <= n <= 9`', false, 'Hard', '/articles/n-queens-ii', 60.5, 
   13.7, 'https://leetcode.com/problems/n-queens-ii', 643, 158.9, 262.4, '["Amazon,Zenefits"]'::jsonb, '["Backtracking"]'::jsonb, 
   790, 181, 81, true, '[]'::jsonb, true),
  (53, 'Maximum Subarray', 'Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.


Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.


Example 2:
Input: nums = [1]
Output: 1

Example 3:
Input: nums = [5,4,-1,7,8]
Output: 23

Constraints:
`1 <= nums.length <= 3 * 104`
`-105 <= nums[i] <= 105`
Follow up: If you have figured out the `O(n)` solution, try coding another solution using the divide and conquer approach, which is more subtle.', false, 'Easy', '/articles/maximum-subarray', 47.9, 
   80.2, 'https://leetcode.com/problems/maximum-subarray', 999, 1.4, 2.9, '["Microsoft,Amazon,Apple,LinkedIn,ByteDance,Google,Adobe,Cisco,Facebook,Oracle,Splunk,Bloomberg,Uber,Paypal,JPMorgan"]'::jsonb, '["Array,Divide and Conquer,Dynamic Programming"]'::jsonb, 
   11458, 551, 95, true, '[]'::jsonb, true),
  (54, 'Spiral Matrix', 'Given an `m x n` `matrix`, return all elements of the `matrix` in spiral order.


Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Example 2:
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]

Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 10`
`-100 <= matrix[i][j] <= 100`', false, 'Medium', '/articles/spiral-matrix', 36.5, 
   74.2, 'https://leetcode.com/problems/spiral-matrix', 999, 483.3, 1.3, '["Microsoft,Apple,Intuit,Facebook,Google,Amazon,ByteDance,Expedia,Paypal,eBay"]'::jsonb, '["Array"]'::jsonb, 
   3671, 656, 85, true, '[]'::jsonb, true),
  (55, 'Jump Game', 'Given an array of non-negative integers `nums`, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.


Example 1:
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.


Example 2:
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.


Constraints:
`1 <= nums.length <= 3 * 104`
`0 <= nums[i] <= 105`', false, 'Medium', '/articles/jump-game', 35.2, 
   39.4, 'https://leetcode.com/problems/jump-game', 999, 610.5, 1.7, '["Amazon,Apple,Facebook"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   6024, 416, 94, true, '[]'::jsonb, true),
  (56, 'Merge Intervals', 'Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.


Example 1:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].


Example 2:
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.


Constraints:
`1 <= intervals.length <= 104`
`intervals[i].length == 2`
`0 <= starti <= endi <= 104`', false, 'Medium', '/articles/merge-intervals', 41.4, 
   97.1, 'https://leetcode.com/problems/merge-intervals', 999, 856.7, 2.1, '["Facebook,JPMorgan,Amazon,Bloomberg,Apple,Google,Microsoft,Adobe,Uber,Twitter,eBay,Paypal,Cisco,Oracle,Yandex,Qualtrics,Palantir Technologies,Yahoo,Walmart Labs,VMware"]'::jsonb, '["Array,Sort"]'::jsonb, 
   6955, 374, 95, true, '[]'::jsonb, true),
  (57, 'Insert Interval', 'Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their start times.


Example 1:
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Example 2:
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval `[4,8]` overlaps with `[3,5],[6,7],[8,10]`.


Example 3:
Input: intervals = [], newInterval = [5,7]
Output: [[5,7]]

Example 4:
Input: intervals = [[1,5]], newInterval = [2,3]
Output: [[1,5]]

Example 5:
Input: intervals = [[1,5]], newInterval = [2,7]
Output: [[1,7]]

Constraints:
`0 <= intervals.length <= 104`
`intervals[i].length == 2`
`0 <= intervals[i][0] <= intervals[i][1] <= 105`
`intervals` is sorted by `intervals[i][0]` in ascending order.

`newInterval.length == 2`
`0 <= newInterval[0] <= newInterval[1] <= 105`', false, 'Medium', '/articles/insert-interval', 35.3, 
   41.3, 'https://leetcode.com/problems/insert-interval', 999, 342.1, 969, '["Google,Twitter,Amazon,Apple,Facebook,Microsoft"]'::jsonb, '["Array,Sort"]'::jsonb, 
   2753, 239, 92, true, '[]'::jsonb, true),
  (58, 'Length of Last Word', 'Given a string `s` consists of some words separated by spaces, return the length of the last word in the string. If the last word does not exist, return `0`.

A word is a maximal substring consisting of non-space characters only.


Example 1:
Input: s = "Hello World"
Output: 5

Example 2:
Input: s = " "
Output: 0

Constraints:
`1 <= s.length <= 104`
`s` consists of only English letters and spaces `'' ''`.', false, 'Easy', '/articles/length-of-last-word', 33.5, 
   12.5, 'https://leetcode.com/problems/length-of-last-word', 999, 490.7, 1.5, '["Google,Bloomberg"]'::jsonb, '["String"]'::jsonb, 
   1041, 3104, 25, true, '[]'::jsonb, true),
  (59, 'Spiral Matrix II', 'Given a positive integer `n`, generate an `n x n` `matrix` filled with elements from `1` to `n2` in spiral order.


Example 1:
Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]

Example 2:
Input: n = 1
Output: [[1]]

Constraints:
`1 <= n <= 20`', false, 'Medium', '/articles/spiral-matrix-ii', 58.2, 
   38.2, 'https://leetcode.com/problems/spiral-matrix-ii', 999, 247.9, 426, '["Microsoft"]'::jsonb, '["Array"]'::jsonb, 
   1602, 128, 93, false, '[]'::jsonb, true),
  (60, 'Permutation Sequence', 'The set `[1, 2, 3, ..., n]` contains a total of `n!` unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for `n = 3`:
`"123"`
`"132"`
`"213"`
`"231"`
`"312"`
`"321"`
Given `n` and `k`, return the `kth` permutation sequence.


Example 1:
Input: n = 3, k = 3
Output: "213"

Example 2:
Input: n = 4, k = 9
Output: "2314"

Example 3:
Input: n = 3, k = 1
Output: "123"

Constraints:
`1 <= n <= 9`
`1 <= k <= n!`', false, 'Hard', '/articles/permutation-sequence', 39.5, 
   24.1, 'https://leetcode.com/problems/permutation-sequence', 999, 223, 563.9, '["Amazon,Adobe"]'::jsonb, '["Math,Backtracking"]'::jsonb, 
   2152, 361, 86, true, '[]'::jsonb, true),
  (61, 'Rotate List', 'Given the `head` of a linked list, rotate the list to the right by `k` places.


Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [4,5,1,2,3]

Example 2:
Input: head = [0,1,2], k = 4
Output: [2,0,1]

Constraints:
The number of nodes in the list is in the range `[0, 500]`.

`-100 <= Node.val <= 100`
`0 <= k <= 2 * 109`', false, 'Medium', '/articles/rotate-list', 31.9, 
   31.4, 'https://leetcode.com/problems/rotate-list', 999, 367.6, 1.2, '["Amazon,Bloomberg,Microsoft,Apple"]'::jsonb, '["Linked List,Two Pointers"]'::jsonb, 
   2242, 1148, 66, true, '[]'::jsonb, true),
  (62, 'Unique Paths', 'A robot is located at the top-left corner of a `m x n` grid (marked ''Start'' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked ''Finish'' in the diagram below).

How many possible unique paths are there?

Example 1:
Input: m = 3, n = 7
Output: 28

Example 2:
Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down

Example 3:
Input: m = 7, n = 3
Output: 28

Example 4:
Input: m = 3, n = 3
Output: 6

Constraints:
`1 <= m, n <= 100`
It''s guaranteed that the answer will be less than or equal to `2 * 109`.', false, 'Medium', '/articles/unique-paths', 56.3, 
   50.8, 'https://leetcode.com/problems/unique-paths', 999, 621.6, 1.1, '["Microsoft,Amazon,Facebook,Google,Bloomberg,Qualtrics,VMware,Salesforce,ByteDance"]'::jsonb, '["Array,Dynamic Programming"]'::jsonb, 
   4856, 240, 95, true, '[]'::jsonb, true),
  (63, 'Unique Paths II', 'A robot is located at the top-left corner of a `m x n` grid (marked ''Start'' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked ''Finish'' in the diagram below).

Now consider if some obstacles are added to the grids. How many unique paths would there be?
An obstacle and space is marked as `1` and `0` respectively in the grid.


Example 1:
Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.

There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right

Example 2:
Input: obstacleGrid = [[0,1],[0,0]]
Output: 1

Constraints:
`m == obstacleGrid.length`
`n == obstacleGrid[i].length`
`1 <= m, n <= 100`
`obstacleGrid[i][j]` is `0` or `1`.', false, 'Medium', '/articles/unique-paths-ii', 35.4, 
   36.3, 'https://leetcode.com/problems/unique-paths-ii', 999, 361.5, 1, '["Amazon,Bloomberg,Facebook,Microsoft"]'::jsonb, '["Array,Dynamic Programming"]'::jsonb, 
   2603, 291, 90, true, '[]'::jsonb, true),
  (64, 'Minimum Path Sum', 'Given a `m x n` `grid` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.


Example 1:
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.


Example 2:
Input: grid = [[1,2,3],[4,5,6]]
Output: 12

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 200`
`0 <= grid[i][j] <= 100`', false, 'Medium', '/articles/minimum-path-sum', 56.5, 
   48.6, 'https://leetcode.com/problems/minimum-path-sum', 999, 525.4, 930.4, '["Google,Amazon,Goldman Sachs,Facebook,Apple,Snapchat,Tesla"]'::jsonb, '["Array,Dynamic Programming"]'::jsonb, 
   4536, 83, 98, true, '[]'::jsonb, true),
  (65, 'Valid Number', 'A valid number can be split up into these components (in order):
A decimal number or an integer.

(Optional) An `''e''` or `''E''`, followed by an integer.

A decimal number can be split up into these components (in order):
(Optional) A sign character (either `''+''` or `''-''`).

One of the following formats:
	
At least one digit, followed by a dot `''.''`.

At least one digit, followed by a dot `''.''`, followed by at least one digit.

A dot `''.''`, followed by at least one digit.

An integer can be split up into these components (in order):
(Optional) A sign character (either `''+''` or `''-''`).

At least one digit.

For example, all the following are valid numbers: `["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]`, while the following are not valid numbers: `["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]`.

Given a string `s`, return `true` if `s` is a valid number.


Example 1:
Input: s = "0"
Output: true

Example 2:
Input: s = "e"
Output: false

Example 3:
Input: s = "."
Output: false

Example 4:
Input: s = ".1"
Output: true

Constraints:
`1 <= s.length <= 20`
`s` consists of only English letters (both uppercase and lowercase), digits (`0-9`), plus `''+''`, minus `''-''`, or dot `''.''`.', false, 'Hard', NULL, 16, 
   54.1, 'https://leetcode.com/problems/valid-number', 999, 199.5, 1.2, '["Facebook,LinkedIn,Oracle,Twitch"]'::jsonb, '["Math,String"]'::jsonb, 
   902, 5572, 14, true, '[]'::jsonb, true),
  (66, 'Plus One', 'Given a non-empty array of decimal digits representing a non-negative integer, increment one to the integer.

The digits are stored such that the most significant digit is at the head of the list, and each element in the array contains a single digit.

You may assume the integer does not contain any leading zero, except the number 0 itself.


Example 1:
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.


Example 2:
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.


Example 3:
Input: digits = [0]
Output: [1]

Constraints:
`1 <= digits.length <= 100`
`0 <= digits[i] <= 9`', false, 'Easy', '/articles/plus-one', 42.2, 
   36.8, 'https://leetcode.com/problems/plus-one', 999, 812, 1.9, '["ByteDance,Facebook,Adobe,Amazon,Spotify,Google"]'::jsonb, '["Array"]'::jsonb, 
   2251, 3130, 42, true, '[]'::jsonb, true),
  (67, 'Add Binary', 'Given two binary strings `a` and `b`, return their sum as a binary string.


Example 1:
Input: a = "11", b = "1"
Output: "100"

Example 2:
Input: a = "1010", b = "1011"
Output: "10101"

Constraints:
`1 <= a.length, b.length <= 104`
`a` and `b` consist only of `''0''` or `''1''` characters.

Each string does not contain leading zeros except for the zero itself.', false, 'Easy', '/articles/add-binary', 47.3, 
   65.5, 'https://leetcode.com/problems/add-binary', 999, 587.2, 1.2, '["Facebook,Amazon,ByteDance"]'::jsonb, '["Math,String"]'::jsonb, 
   2668, 337, 89, true, '[]'::jsonb, true),
  (68, 'Text Justification', 'Given an array of words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces `'' ''` when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left justified and no extra space is inserted between words.

Note:
A word is defined as a character sequence consisting of non-space characters only.

Each word''s length is guaranteed to be greater than 0 and not exceed maxWidth.

The input array `words` contains at least one word.


Example 1:
Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]

Example 2:
Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.

Note that the second line is also left-justified becase it contains only one word.


Example 3:
Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
Output:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]

Constraints:
`1 <= words.length <= 300`
`1 <= words[i].length <= 20`
`words[i]` consists of only English letters and symbols.

`1 <= maxWidth <= 100`
`words[i].length <= maxWidth`', false, 'Hard', NULL, 30.1, 
   95.5, 'https://leetcode.com/problems/text-justification', 936, 167, 553.9, '["Intuit,Twilio,Uber,Karat,Indeed,Google,Amazon,Reddit,LinkedIn,Bloomberg,Microsoft,Twitter,Paypal,Apple,ByteDance,Databricks,Netflix,eBay"]'::jsonb, '["String"]'::jsonb, 
   987, 1954, 34, true, '[]'::jsonb, true),
  (69, 'Sqrt(x)', 'Given a non-negative integer `x`, compute and return the square root of `x`.

Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.


Example 1:
Input: x = 4
Output: 2

Example 2:
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned.


Constraints:
`0 <= x <= 231 - 1`', false, 'Easy', '/articles/sqrtx', 35.4, 
   29.4, 'https://leetcode.com/problems/sqrtx', 999, 704.7, 2, '["Microsoft,Bloomberg,Amazon,Uber,LinkedIn,Google"]'::jsonb, '["Math,Binary Search"]'::jsonb, 
   1910, 2306, 45, true, '[]'::jsonb, true),
  (70, 'Climbing Stairs', 'You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

Example 1:
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.

1. 1 step + 1 step
2. 2 steps

Example 2:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.

1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

Constraints:
`1 <= n <= 45`', false, 'Easy', '/articles/climbing-stairs', 48.8, 
   60.2, 'https://leetcode.com/problems/climbing-stairs', 999, 929.3, 1.9, '["Expedia,Amazon,Apple,Adobe,Goldman Sachs,Google,Nvidia,Intuit"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   6294, 200, 97, true, '[]'::jsonb, true),
  (71, 'Simplify Path', 'Given a string `path`, which is an absolute path (starting with a slash `''/''`) to a file or directory in a Unix-style file system, convert it to the simplified canonical path.

In a Unix-style file system, a period `''.''` refers to the current directory, a double period `''..''` refers to the directory up a level, and any multiple consecutive slashes (i.e. `''//''`) are treated as a single slash `''/''`. For this problem, any other format of periods such as `''...''` are treated as file/directory names.

The canonical path should have the following format:
The path starts with a single slash `''/''`.

Any two directories are separated by a single slash `''/''`.

The path does not end with a trailing `''/''`.

The path only contains the directories on the path from the root directory to the target file or directory (i.e., no period `''.''` or double period `''..''`)
Return the simplified canonical path.


Example 1:
Input: path = "/home/"
Output: "/home"
Explanation: Note that there is no trailing slash after the last directory name.


Example 2:
Input: path = "/../"
Output: "/"
Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.


Example 3:
Input: path = "/home//foo/"
Output: "/home/foo"
Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one.


Example 4:
Input: path = "/a/./b/../../c/"
Output: "/c"

Constraints:
`1 <= path.length <= 3000`
`path` consists of English letters, digits, period `''.''`, slash `''/''` or `''_''`.

`path` is a valid absolute Unix path.', false, 'Medium', '/articles/simplify-path', 34.9, 
   50.1, 'https://leetcode.com/problems/simplify-path', 999, 273, 781.8, '["Facebook,Google,Amazon,Microsoft"]'::jsonb, '["String,Stack"]'::jsonb, 
   317, 92, 78, true, '[]'::jsonb, true),
  (72, 'Edit Distance', 'Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.

You have the following three operations permitted on a word:
Insert a character
Delete a character
Replace a character

Example 1:
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace ''h'' with ''r'')
rorse -> rose (remove ''r'')
rose -> ros (remove ''e'')

Example 2:
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove ''t'')
inention -> enention (replace ''i'' with ''e'')
enention -> exention (replace ''n'' with ''x'')
exention -> exection (replace ''n'' with ''c'')
exection -> execution (insert ''u'')

Constraints:
`0 <= word1.length, word2.length <= 500`
`word1` and `word2` consist of lowercase English letters.', false, 'Hard', '/articles/edit-distance', 47.1, 
   59.8, 'https://leetcode.com/problems/edit-distance', 999, 346.5, 736, '["Amazon,Microsoft,Google,Square,Palantir Technologies"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   5416, 67, 99, true, '[]'::jsonb, true),
  (73, 'Set Matrix Zeroes', 'Given an `m x n` matrix. If an element is 0, set its entire row and column to 0. Do it in-place.

Follow up:
A straight forward solution using O(mn) space is probably a bad idea.

A simple improvement uses O(m + n) space, but still not the best solution.

Could you devise a constant space solution?

Example 1:
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]

Example 2:
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]

Constraints:
`m == matrix.length`
`n == matrix[0].length`
`1 <= m, n <= 200`
`-231 <= matrix[i][j] <= 231 - 1`', false, 'Medium', '/articles/set-matrix-zeroes', 44.6, 
   42, 'https://leetcode.com/problems/set-matrix-zeroes', 999, 414.5, 930.3, '["Facebook,Microsoft,Oracle,Amazon,Expedia,Bloomberg,Goldman Sachs,Apple"]'::jsonb, '["Array"]'::jsonb, 
   3287, 364, 90, true, '[]'::jsonb, true),
  (74, 'Search a 2D Matrix', 'Write an efficient algorithm that searches for a value in an `m x n` matrix. This matrix has the following properties:
Integers in each row are sorted from left to right.

The first integer of each row is greater than the last integer of the previous row.


Example 1:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true

Example 2:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false

Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 100`
`-104 <= matrix[i][j], target <= 104`', false, 'Medium', '/articles/search-in-2d-matrix', 38.1, 
   51.9, 'https://leetcode.com/problems/search-a-2d-matrix', 999, 435.8, 1.1, '["Amazon,Facebook,Apple,Microsoft,Nvidia"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   3110, 194, 94, true, '[]'::jsonb, true),
  (75, 'Sort Colors', 'Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.


Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Example 2:
Input: nums = [2,0,1]
Output: [0,1,2]

Example 3:
Input: nums = [0]
Output: [0]

Example 4:
Input: nums = [1]
Output: [1]

Constraints:
`n == nums.length`
`1 <= n <= 300`
`nums[i]` is `0`, `1`, or `2`.

Follow up:
Could you solve this problem without using the library''s sort function?
Could you come up with a one-pass algorithm using only `O(1)` constant space?', false, 'Medium', '/articles/sort-colors', 49.8, 
   35.4, 'https://leetcode.com/problems/sort-colors', 999, 656, 1.3, '["Microsoft,Facebook,eBay,Amazon,Oracle,Adobe,Nvidia,Expedia"]'::jsonb, '["Array,Two Pointers,Sort"]'::jsonb, 
   5114, 293, 95, true, '[]'::jsonb, true),
  (76, 'Minimum Window Substring', 'Given two strings `s` and `t`, return the minimum window in `s` which will contain all the characters in `t`. If there is no such window in `s` that covers all characters in `t`, return the empty string `""`.

Note that If there is such a window, it is guaranteed that there will always be only one unique minimum window in `s`.


Example 1:
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

Example 2:
Input: s = "a", t = "a"
Output: "a"

Constraints:
`1 <= s.length, t.length <= 105`
`s` and `t` consist of English letters.

Follow up: Could you find an algorithm that runs in `O(n)` time?', false, 'Hard', '/articles/minimum-window-substring', 36.2, 
   69.1, 'https://leetcode.com/problems/minimum-window-substring', 999, 518.5, 1.4, '["Facebook,Amazon,Microsoft,Lyft,Apple,LinkedIn,Google,Uber,Bloomberg,Pinterest,Snapchat,Adobe,ByteDance"]'::jsonb, '["Hash Table,Two Pointers,String,Sliding Window"]'::jsonb, 
   6350, 428, 94, true, '[]'::jsonb, true),
  (77, 'Combinations', 'Given two integers `n` and `k`, return all possible combinations of `k` numbers out of the range `[1, n]`.

You may return the answer in any order.


Example 1:
Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]

Example 2:
Input: n = 1, k = 1
Output: [[1]]

Constraints:
`1 <= n <= 20`
`1 <= k <= n`', false, 'Medium', '/articles/combinations', 57.9, 
   19.1, 'https://leetcode.com/problems/combinations', 999, 356.5, 615.2, '["Facebook,Amazon"]'::jsonb, '["Backtracking"]'::jsonb, 
   2158, 81, 96, true, '[]'::jsonb, true),
  (78, 'Subsets', 'Given an integer array `nums` of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.


Example 1:
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Example 2:
Input: nums = [0]
Output: [[],[0]]

Constraints:
`1 <= nums.length <= 10`
`-10 <= nums[i] <= 10`
All the numbers of `nums` are unique.', false, 'Medium', '/articles/subsets', 65.6, 
   54.5, 'https://leetcode.com/problems/subsets', 999, 746.8, 1.1, '["Facebook,Bloomberg,Amazon,Uber,Microsoft,Apple,ByteDance"]'::jsonb, '["Array,Backtracking,Bit Manipulation"]'::jsonb, 
   5513, 111, 98, true, '[]'::jsonb, true),
  (79, 'Word Search', 'Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.


Example 1:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true

Example 2:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true

Example 3:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false

Constraints:
`m == board.length`
`n = board[i].length`
`1 <= m, n <= 6`
`1 <= word.length <= 15`
`board` and `word` consists of only lowercase and uppercase English letters.

Follow up: Could you use search pruning to make your solution faster with a larger `board`?', false, 'Medium', '/articles/word-search', 37.1, 
   73.5, 'https://leetcode.com/problems/word-search', 999, 639.9, 1.7, '["Amazon,Bloomberg,Intuit,Microsoft,Facebook,Snapchat,Apple,Oracle,eBay,Pinterest,Expedia"]'::jsonb, '["Array,Backtracking"]'::jsonb, 
   5459, 240, 96, true, '[]'::jsonb, true),
  (80, 'Remove Duplicates from Sorted Array II', 'Given a sorted array nums, remove the duplicates in-place such that duplicates appeared at most twice and return the new length.

Do not allocate extra space for another array; you must do this by modifying the input array in-place with O(1) extra memory.

Clarification:
Confused why the returned value is an integer, but your answer is an array?
Note that the input array is passed in by reference, which means a modification to the input array will be known to the caller.

Internally you can think of this:
// nums is passed in by reference. (i.e., without making a copy)
int len = removeDuplicates(nums);
// any modification to nums in your function would be known by the caller.

// using the length returned by your function, it prints the first len elements.

for (int i = 0; i < len; i++) {
    print(nums[i]);
}

Example 1:
Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3]
Explanation: Your function should return length = `5`, with the first five elements of `nums` being `1, 1, 2, 2` and 3 respectively. It doesn''t matter what you leave beyond the returned length.


Example 2:
Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3]
Explanation: Your function should return length = `7`, with the first seven elements of `nums` being modified to `0`, 0, 1, 1, 2, 3 and 3 respectively. It doesn''t matter what values are set beyond the returned length.


Constraints:
`1 <= nums.length <= 3 * 104`
`-104 <= nums[i] <= 104`
`nums` is sorted in ascending order.', false, 'Medium', '/articles/remove-duplicates-from-sorted-array-ii', 46.3, 
   11, 'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii', 999, 323.3, 697.6, '["Microsoft"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   1794, 781, 70, false, '[]'::jsonb, true),
  (81, 'Search in Rotated Sorted Array II', 'There is an integer array `nums` sorted in non-decreasing order (not necessarily with distinct values).

Before being passed to your function, `nums` is rotated at an unknown pivot index `k` (`0 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed). For example, `[0,1,2,4,4,4,5,6,6,7]` might be rotated at pivot index `5` and become `[4,5,6,6,7,0,1,2,4,4]`.

Given the array `nums` after the rotation and an integer `target`, return `true` if `target` is in `nums`, or `false` if it is not in `nums`.


Example 1:
Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true

Example 2:
Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false

Constraints:
`1 <= nums.length <= 5000`
`-104 <= nums[i] <= 104`
`nums` is guaranteed to be rotated at some pivot.

`-104 <= target <= 104`
Follow up: This problem is the same as Search in Rotated Sorted Array, where `nums` may contain duplicates. Would this affect the runtime complexity? How and why?', false, 'Medium', '/articles/search-in-rotated-sorted-array-ii', 33.7, 
   19.3, 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii', 836, 299.4, 889.1, '["Amazon"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   2045, 576, 78, true, '[]'::jsonb, true),
  (82, 'Remove Duplicates from Sorted List II', 'Given the `head` of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.


Example 1:
Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]

Example 2:
Input: head = [1,1,1,2,3]
Output: [2,3]

Constraints:
The number of nodes in the list is in the range `[0, 300]`.

`-100 <= Node.val <= 100`
The list is guaranteed to be sorted in ascending order.', false, 'Medium', '/articles/remove-duplicates-from-sorted-list-ii', 39.5, 
   35.3, 'https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii', 999, 324.3, 820.8, '["Amazon,Bloomberg"]'::jsonb, '["Linked List"]'::jsonb, 
   2818, 123, 96, true, '[]'::jsonb, true),
  (83, 'Remove Duplicates from Sorted List', 'Given the `head` of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.


Example 1:
Input: head = [1,1,2]
Output: [1,2]

Example 2:
Input: head = [1,1,2,3,3]
Output: [1,2,3]

Constraints:
The number of nodes in the list is in the range `[0, 300]`.

`-100 <= Node.val <= 100`
The list is guaranteed to be sorted in ascending order.', false, 'Easy', '/articles/remove-duplicates-from-sorted-list', 46.7, 
   34, 'https://leetcode.com/problems/remove-duplicates-from-sorted-list', 999, 577.2, 1.2, '["Amazon,Adobe,Goldman Sachs,Qualcomm"]'::jsonb, '["Linked List"]'::jsonb, 
   2416, 144, 94, true, '[]'::jsonb, true),
  (84, 'Largest Rectangle in Histogram', 'Given an array of integers `heights` representing the histogram''s bar height where the width of each bar is `1`, return the area of the largest rectangle in the histogram.


Example 1:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.

The largest rectangle is shown in the red area, which has an area = 10 units.


Example 2:
Input: heights = [2,4]
Output: 4

Constraints:
`1 <= heights.length <= 105`
`0 <= heights[i] <= 104`', false, 'Hard', '/articles/largest-rectangle-in-histogram', 37.4, 
   57.5, 'https://leetcode.com/problems/largest-rectangle-in-histogram', 999, 350.8, 937.9, '["Amazon,Microsoft,Adobe,MAQ Software"]'::jsonb, '["Array,Stack"]'::jsonb, 
   5576, 111, 98, true, '[]'::jsonb, true),
  (85, 'Maximal Rectangle', 'Given a `rows x cols` binary `matrix` filled with `0`''s and `1`''s, find the largest rectangle containing only `1`''s and return its area.


Example 1:
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.


Example 2:
Input: matrix = []
Output: 0

Example 3:
Input: matrix = [["0"]]
Output: 0

Example 4:
Input: matrix = [["1"]]
Output: 1

Example 5:
Input: matrix = [["0","0"]]
Output: 0

Constraints:
`rows == matrix.length`
`cols == matrix[i].length`
`0 <= row, cols <= 200`
`matrix[i][j]` is `''0''` or `''1''`.', false, 'Hard', '/articles/maximal-rectangle', 39.7, 
   62.6, 'https://leetcode.com/problems/maximal-rectangle', 651, 222.8, 561.2, '["Google,Amazon,Adobe,Bloomberg,Apple"]'::jsonb, '["Array,Hash Table,Dynamic Programming,Stack"]'::jsonb, 
   4086, 86, 98, true, '[]'::jsonb, true),
  (86, 'Partition List', 'Given the `head` of a linked list and a value `x`, partition it such that all nodes less than `x` come before nodes greater than or equal to `x`.

You should preserve the original relative order of the nodes in each of the two partitions.


Example 1:
Input: head = [1,4,3,2,5,2], x = 3
Output: [1,2,2,4,3,5]

Example 2:
Input: head = [2,1], x = 2
Output: [1,2]

Constraints:
The number of nodes in the list is in the range `[0, 200]`.

`-100 <= Node.val <= 100`
`-200 <= x <= 200`', false, 'Medium', '/articles/partition-list', 43.7, 
   41.5, 'https://leetcode.com/problems/partition-list', 999, 255.6, 584.4, '["Microsoft,Amazon,Apple,Bloomberg,Facebook"]'::jsonb, '["Linked List,Two Pointers"]'::jsonb, 
   1957, 383, 84, true, '[]'::jsonb, true),
  (87, 'Scramble String', 'We can scramble a string s to get a string t using the following algorithm:
If the length of the string is 1, stop.

If the length of the string is > 1, do the following:
	
Split the string into two non-empty substrings at a random index, i.e., if the string is `s`, divide it to `x` and `y` where `s = x + y`.

Randomly decide to swap the two substrings or to keep them in the same order. i.e., after this step, `s` may become `s = x + y` or `s = y + x`.

Apply step 1 recursively on each of the two substrings `x` and `y`.

Given two strings `s1` and `s2` of the same length, return `true` if `s2` is a scrambled string of `s1`, otherwise, return `false`.


Example 1:
Input: s1 = "great", s2 = "rgeat"
Output: true
Explanation: One possible scenario applied on s1 is:
"great" --> "gr/eat" // divide at random index.

"gr/eat" --> "gr/eat" // random decision is not to swap the two substrings and keep them in order.

"gr/eat" --> "g/r / e/at" // apply the same algorithm recursively on both substrings. divide at ranom index each of them.

"g/r / e/at" --> "r/g / e/at" // random decision was to swap the first substring and to keep the second substring in the same order.

"r/g / e/at" --> "r/g / e/ a/t" // again apply the algorithm recursively, divide "at" to "a/t".

"r/g / e/ a/t" --> "r/g / e/ a/t" // random decision is to keep both substrings in the same order.

The algorithm stops now and the result string is "rgeat" which is s2.

As there is one possible scenario that led s1 to be scrambled to s2, we return true.


Example 2:
Input: s1 = "abcde", s2 = "caebd"
Output: false

Example 3:
Input: s1 = "a", s2 = "a"
Output: true

Constraints:
`s1.length == s2.length`
`1 <= s1.length <= 30`
`s1` and `s2` consist of lower-case English letters.', false, 'Hard', NULL, 34.8, 
   9, 'https://leetcode.com/problems/scramble-string', 335, 122.9, 353.2, '["Apple"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   760, 805, 49, true, '[]'::jsonb, true),
  (88, 'Merge Sorted Array', 'Given two sorted integer arrays `nums1` and `nums2`, merge `nums2` into `nums1` as one sorted array.

The number of elements initialized in `nums1` and `nums2` are `m` and `n` respectively. You may assume that `nums1` has a size equal to `m + n` such that it has enough space to hold additional elements from `nums2`.


Example 1:
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]

Example 2:
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]

Constraints:
`nums1.length == m + n`
`nums2.length == n`
`0 <= m, n <= 200`
`1 <= m + n <= 200`
`-109 <= nums1[i], nums2[i] <= 109`', false, 'Easy', '/articles/merge-sorted-arrays', 40.9, 
   70.4, 'https://leetcode.com/problems/merge-sorted-array', 999, 843, 2.1, '["Facebook,Microsoft,Amazon,Bloomberg,Walmart Labs,IBM,Oracle,Apple,LinkedIn,Goldman Sachs,Yandex,Wish"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   3612, 5190, 41, true, '[]'::jsonb, true),
  (89, 'Gray Code', 'The gray code is a binary numeral system where two successive values differ in only one bit.

Given an integer `n` representing the total number of bits in the code, return any sequence of gray code.

A gray code sequence must begin with `0`.


Example 1:
Input: n = 2
Output: [0,1,3,2]
Explanation:
00 - 0
01 - 1
11 - 3
10 - 2
[0,2,3,1] is also a valid gray code sequence.

00 - 0
10 - 2
11 - 3
01 - 1

Example 2:
Input: n = 1
Output: [0,1]

Constraints:
`1 <= n <= 16`', false, 'Medium', NULL, 50.7, 
   23.7, 'https://leetcode.com/problems/gray-code', 830, 178.9, 353.1, '["Microsoft"]'::jsonb, '["Backtracking"]'::jsonb, 
   811, 1783, 31, false, '[]'::jsonb, true),
  (90, 'Subsets II', 'Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.


Example 1:
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

Example 2:
Input: nums = [0]
Output: [[],[0]]

Constraints:
`1 <= nums.length <= 10`
`-10 <= nums[i] <= 10`', false, 'Medium', NULL, 49.1, 
   20.9, 'https://leetcode.com/problems/subsets-ii', 999, 335.5, 682.9, '["Amazon,ByteDance"]'::jsonb, '["Array,Backtracking"]'::jsonb, 
   2394, 104, 96, true, '[]'::jsonb, true),
  (91, 'Decode Ways', 'A message containing letters from `A-Z` can be encoded into numbers using the following mapping:
''A'' -> "1"
''B'' -> "2"
...

''Z'' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, `"11106"` can be mapped into:
`"AAJF"` with the grouping `(1 1 10 6)`
`"KJF"` with the grouping `(11 10 6)`
Note that the grouping `(1 11 06)` is invalid because `"06"` cannot be mapped into `''F''` since `"6"` is different from `"06"`.

Given a string `s` containing only digits, return the number of ways to decode it.

The answer is guaranteed to fit in a 32-bit integer.


Example 1:
Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).


Example 2:
Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).


Example 3:
Input: s = "0"
Output: 0
Explanation: There is no character that is mapped to a number starting with 0.

The only valid mappings with 0 are ''J'' -> "10" and ''T'' -> "20", neither of which start with 0.

Hence, there are no valid ways to decode this since all digits need to be mapped.


Example 4:
Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").


Constraints:
`1 <= s.length <= 100`
`s` contains only digits and may contain leading zero(s).', false, 'Medium', '/articles/decode-ways', 26.9, 
   94, 'https://leetcode.com/problems/decode-ways', 999, 548.7, 2, '["JPMorgan,Facebook,Google,Cisco,Amazon,Lyft,Microsoft,Goldman Sachs,ByteDance,Apple,Uber,Adobe"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   4177, 3414, 55, true, '[]'::jsonb, true),
  (92, 'Reverse Linked List II', 'Given the `head` of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes of the list from position `left` to position `right`, and return the reversed list.


Example 1:
Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]

Example 2:
Input: head = [5], left = 1, right = 1
Output: [5]

Constraints:
The number of nodes in the list is `n`.

`1 <= n <= 500`
`-500 <= Node.val <= 500`
`1 <= left <= right <= n`
Follow up: Could you do it in one pass?', false, 'Medium', '/articles/reverse-linked-list-ii', 40.8, 
   63.9, 'https://leetcode.com/problems/reverse-linked-list-ii', 999, 341.7, 837.9, '["Amazon,Facebook,Microsoft,Oracle,ByteDance"]'::jsonb, '["Linked List"]'::jsonb, 
   3501, 180, 95, true, '[]'::jsonb, true),
  (93, 'Restore IP Addresses', 'Given a string `s` containing only digits, return all possible valid IP addresses that can be obtained from `s`. You can return them in any order.

A valid IP address consists of exactly four integers, each integer is between `0` and `255`, separated by single dots and cannot have leading zeros. For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses and "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses. 

Example 1:
Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]

Example 2:
Input: s = "0000"
Output: ["0.0.0.0"]

Example 3:
Input: s = "1111"
Output: ["1.1.1.1"]

Example 4:
Input: s = "010010"
Output: ["0.10.0.10","0.100.1.0"]

Example 5:
Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

Constraints:
`0 <= s.length <= 3000`
`s` consists of digits only.', false, 'Medium', '/articles/restore-ip-addresses', 37.9, 
   45.1, 'https://leetcode.com/problems/restore-ip-addresses', 999, 230.9, 610, '["Microsoft,Oracle"]'::jsonb, '["String,Backtracking"]'::jsonb, 
   1718, 559, 75, false, '[]'::jsonb, true),
  (94, 'Binary Tree Inorder Traversal', 'Given the `root` of a binary tree, return the inorder traversal of its nodes'' values.


Example 1:
Input: root = [1,null,2,3]
Output: [1,3,2]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Example 4:
Input: root = [1,2]
Output: [2,1]

Example 5:
Input: root = [1,null,2]
Output: [1,2]

Constraints:
The number of nodes in the tree is in the range `[0, 100]`.

`-100 <= Node.val <= 100`
Follow up:
Recursive solution is trivial, could you do it iteratively?', false, 'Medium', '/articles/binary-tree-inorder-traversal', 66.3, 
   17.9, 'https://leetcode.com/problems/binary-tree-inorder-traversal', 999, 954.7, 1.4, '["Microsoft,Facebook,Oracle,Amazon,Google"]'::jsonb, '["Hash Table,Stack,Tree"]'::jsonb, 
   4528, 204, 96, true, '[]'::jsonb, true),
  (95, 'Unique Binary Search Trees II', 'Given an integer `n`, return all the structurally unique BST''s (binary search trees), which has exactly `n` nodes of unique values from `1` to `n`. Return the answer in any order.


Example 1:
Input: n = 3
Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]

Example 2:
Input: n = 1
Output: [[1]]

Constraints:
`1 <= n <= 8`', false, 'Medium', '/articles/unique-binary-search-trees-ii', 43, 
   17.1, 'https://leetcode.com/problems/unique-binary-search-trees-ii', 705, 226.3, 526.1, '["Amazon,Google"]'::jsonb, '["Dynamic Programming,Tree"]'::jsonb, 
   2977, 206, 94, true, '[]'::jsonb, true),
  (96, 'Unique Binary Search Trees', 'Given an integer `n`, return the number of structurally unique BST''s (binary search trees) which has exactly `n` nodes of unique values from `1` to `n`.


Example 1:
Input: n = 3
Output: 5

Example 2:
Input: n = 1
Output: 1

Constraints:
`1 <= n <= 19`', false, 'Medium', '/articles/unique-binary-search-trees', 54.7, 
   26.7, 'https://leetcode.com/problems/unique-binary-search-trees', 999, 356.7, 652.5, '["Microsoft,Bloomberg"]'::jsonb, '["Dynamic Programming,Tree"]'::jsonb, 
   4491, 164, 96, false, '[]'::jsonb, true),
  (97, 'Interleaving String', 'Given strings `s1`, `s2`, and `s3`, find whether `s3` is formed by an interleaving of `s1` and `s2`.

An interleaving of two strings `s` and `t` is a configuration where they are divided into non-empty substrings such that:
`s = s1 + s2 + ... + sn`
`t = t1 + t2 + ... + tm`
`|n - m| <= 1`
The interleaving is `s1 + t1 + s2 + t2 + s3 + t3 + ...` or `t1 + s1 + t2 + s2 + t3 + s3 + ...`
Note: `a + b` is the concatenation of strings `a` and `b`.


Example 1:
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true

Example 2:
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
Output: false

Example 3:
Input: s1 = "", s2 = "", s3 = ""
Output: true

Constraints:
`0 <= s1.length, s2.length <= 100`
`0 <= s3.length <= 200`
`s1`, `s2`, and `s3` consist of lowercase English letters.

Follow up: Could you solve it using only `O(s2.length)` additional memory space?', false, 'Medium', '/articles/interleaving-strings', 32.8, 
   31.3, 'https://leetcode.com/problems/interleaving-string', 796, 178.9, 546.3, '["Microsoft,Apple,Coupang"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   1962, 105, 95, true, '[]'::jsonb, true),
  (98, 'Validate Binary Search Tree', 'Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
The left subtree of a node contains only nodes with keys less than the node''s key.

The right subtree of a node contains only nodes with keys greater than the node''s key.

Both the left and right subtrees must also be binary search trees.


Example 1:
Input: root = [2,1,3]
Output: true

Example 2:
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node''s value is 5 but its right child''s value is 4.


Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-231 <= Node.val <= 231 - 1`', false, 'Medium', '/articles/validate-binary-search-tree', 28.9, 
   65.3, 'https://leetcode.com/problems/validate-binary-search-tree', 999, 950.5, 3.3, '[]'::jsonb, '[]'::jsonb, 
   5790, 671, 90, false, '[]'::jsonb, true),
  (99, 'Recover Binary Search Tree', 'You are given the `root` of a binary search tree (BST), where exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.

Follow up: A solution using `O(n)` space is pretty straight forward. Could you devise a constant space solution?

Example 1:
Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.


Example 2:
Input: root = [3,1,4,null,null,2]
Output: [2,1,4,null,null,3]
Explanation: 2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.


Constraints:
The number of nodes in the tree is in the range `[2, 1000]`.

`-231 <= Node.val <= 231 - 1`', false, 'Hard', '/articles/recover-binary-search-tree', 42.8, 
   51.2, 'https://leetcode.com/problems/recover-binary-search-tree', 631, 206.9, 484, '["Oracle,Amazon,Microsoft,Uber"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   2361, 91, 96, true, '[]'::jsonb, true),
  (100, 'Same Tree', 'Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.


Example 1:
Input: p = [1,2,3], q = [1,2,3]
Output: true

Example 2:
Input: p = [1,2], q = [1,null,2]
Output: false

Example 3:
Input: p = [1,2,1], q = [1,1,2]
Output: false

Constraints:
The number of nodes in both trees is in the range `[0, 100]`.

`-104 <= Node.val <= 104`', false, 'Easy', '/articles/same-tree', 54.2, 
   26.8, 'https://leetcode.com/problems/same-tree', 999, 703.4, 1.3, '["Amazon,Google,Microsoft,Apple"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   3109, 85, 97, true, '[]'::jsonb, true),
  (101, 'Symmetric Tree', 'Given the `root` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).


Example 1:
Input: root = [1,2,2,3,4,4,3]
Output: true

Example 2:
Input: root = [1,2,2,null,3,null,3]
Output: false

Constraints:
The number of nodes in the tree is in the range `[1, 1000]`.

`-100 <= Node.val <= 100`
Follow up: Could you solve it both recursively and iteratively?', false, 'Easy', '/articles/symmetric-tree', 48.4, 
   53.7, 'https://leetcode.com/problems/symmetric-tree', 999, 861.4, 1.8, '["Capital One,Amazon,Yandex,Apple,Uber,Google,Microsoft"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   5900, 157, 97, true, '[]'::jsonb, true),
  (102, 'Binary Tree Level Order Traversal', 'Given the `root` of a binary tree, return the level order traversal of its nodes'' values. (i.e., from left to right, level by level).


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

Example 2:
Input: root = [1]
Output: [[1]]

Example 3:
Input: root = []
Output: []

Constraints:
The number of nodes in the tree is in the range `[0, 2000]`.

`-1000 <= Node.val <= 1000`', false, 'Medium', '/articles/binary-tree-level-order-traversal', 57, 
   51.1, 'https://leetcode.com/problems/binary-tree-level-order-traversal', 999, 809.8, 1.4, '["Bloomberg,Amazon,Facebook,Microsoft,LinkedIn,Adobe,Paypal,Google,Uber,Yahoo"]'::jsonb, '["Tree,Breadth-first Search"]'::jsonb, 
   4482, 104, 98, true, '[]'::jsonb, true),
  (103, 'Binary Tree Zigzag Level Order Traversal', 'Given the `root` of a binary tree, return the zigzag level order traversal of its nodes'' values. (i.e., from left to right, then right to left for the next level and alternate between).


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]

Example 2:
Input: root = [1]
Output: [[1]]

Example 3:
Input: root = []
Output: []

Constraints:
The number of nodes in the tree is in the range `[0, 2000]`.

`-100 <= Node.val <= 100`', false, 'Medium', '/articles/binary-tree-zigzag-level-order-traversal', 50.4, 
   64.1, 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal', 999, 496.1, 984, '["Amazon,Microsoft,Bloomberg,Apple,Facebook,Qualtrics,eBay,Adobe,ByteDance,Google,Goldman Sachs,ServiceNow,Oracle"]'::jsonb, '["Stack,Tree,Breadth-first Search"]'::jsonb, 
   3290, 126, 96, true, '[]'::jsonb, true),
  (104, 'Maximum Depth of Binary Tree', 'Given the `root` of a binary tree, return its maximum depth.

A binary tree''s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 3

Example 2:
Input: root = [1,null,2]
Output: 2

Example 3:
Input: root = []
Output: 0

Example 4:
Input: root = [0]
Output: 1

Constraints:
The number of nodes in the tree is in the range `[0, 104]`.

`-100 <= Node.val <= 100`', false, 'Easy', '/articles/maximum-depth-of-binary-tree', 68.3, 
   31.2, 'https://leetcode.com/problems/maximum-depth-of-binary-tree', 999, 1.1, 1.6, '["LinkedIn,Amazon,Intel"]'::jsonb, '["Tree,Depth-first Search,Recursion"]'::jsonb, 
   3779, 95, 98, true, '[]'::jsonb, true),
  (105, 'Construct Binary Tree from Preorder and Inorder Traversal', 'Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.


Example 1:
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]

Example 2:
Input: preorder = [-1], inorder = [-1]
Output: [-1]

Constraints:
`1 <= preorder.length <= 3000`
`inorder.length == preorder.length`
`-3000 <= preorder[i], inorder[i] <= 3000`
`preorder` and `inorder` consist of unique values.

Each value of `inorder` also appears in `preorder`.

`preorder` is guaranteed to be the preorder traversal of the tree.

`inorder` is guaranteed to be the inorder traversal of the tree.', false, 'Medium', '/articles/construct-binary-tree-from-preorder-and-inorder-traversal', 52.4, 
   63.2, 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal', 999, 479.3, 915.4, '["Amazon,Microsoft,Facebook,ByteDance,Citadel,Bloomberg,Oracle"]'::jsonb, '["Array,Tree,Depth-first Search"]'::jsonb, 
   4983, 127, 98, true, '[]'::jsonb, true),
  (106, 'Construct Binary Tree from Inorder and Postorder Traversal', 'Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return the binary tree.


Example 1:
Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]

Example 2:
Input: inorder = [-1], postorder = [-1]
Output: [-1]

Constraints:
`1 <= inorder.length <= 3000`
`postorder.length == inorder.length`
`-3000 <= inorder[i], postorder[i] <= 3000`
`inorder` and `postorder` consist of unique values.

Each value of `postorder` also appears in `inorder`.

`inorder` is guaranteed to be the inorder traversal of the tree.

`postorder` is guaranteed to be the postorder traversal of the tree.', false, 'Medium', '/articles/construct-binary-tree-from-inorder-and-postorder-traversal', 50.1, 
   26.1, 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal', 999, 290.1, 579, '["Bloomberg,Microsoft,Google"]'::jsonb, '["Array,Tree,Depth-first Search"]'::jsonb, 
   2555, 48, 98, true, '[]'::jsonb, true),
  (107, 'Binary Tree Level Order Traversal II', 'Given the `root` of a binary tree, return the bottom-up level order traversal of its nodes'' values. (i.e., from left to right, level by level from leaf to root).


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]

Example 2:
Input: root = [1]
Output: [[1]]

Example 3:
Input: root = []
Output: []

Constraints:
The number of nodes in the tree is in the range `[0, 2000]`.

`-1000 <= Node.val <= 1000`', false, 'Medium', '/articles/binary-tree-level-order-traversal-ii', 55.5, 
   32.4, 'https://leetcode.com/problems/binary-tree-level-order-traversal-ii', 999, 414.9, 748, '["Microsoft,Apple"]'::jsonb, '["Tree,Breadth-first Search"]'::jsonb, 
   2089, 245, 90, true, '[]'::jsonb, true),
  (108, 'Convert Sorted Array to Binary Search Tree', 'Given an integer array `nums` where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.


Example 1:
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted:

Example 2:
Input: nums = [1,3]
Output: [3,1]
Explanation: [1,3] and [3,1] are both a height-balanced BSTs.


Constraints:
`1 <= nums.length <= 104`
`-104 <= nums[i] <= 104`
`nums` is sorted in a strictly increasing order.', false, 'Easy', '/articles/convert-sorted-array-to-bst', 60.9, 
   35, 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree', 999, 518, 851, '["Adobe,Google,Microsoft,Amazon,Apple,Facebook"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   3683, 269, 93, true, '[]'::jsonb, true),
  (109, 'Convert Sorted List to Binary Search Tree', 'Given the `head` of a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.


Example 1:
Input: head = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: One possible answer is [0,-3,9,-10,null,5], which represents the shown height balanced BST.


Example 2:
Input: head = []
Output: []

Example 3:
Input: head = [0]
Output: [0]

Example 4:
Input: head = [1,3]
Output: [3,1]

Constraints:
The number of nodes in `head` is in the range `[0, 2 * 104]`.

`-10^5 <= Node.val <= 10^5`', false, 'Medium', '/articles/convert-sorted-list-to-binary-search-tree', 50.6, 
   19.4, 'https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree', 857, 287.7, 568.6, '["Facebook,Microsoft,Oracle"]'::jsonb, '["Linked List,Depth-first Search"]'::jsonb, 
   2800, 95, 97, true, '[]'::jsonb, true),
  (110, 'Balanced Binary Tree', 'Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:
a binary tree in which the left and right subtrees of every node differ in height by no more than 1.


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: true

Example 2:
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

Example 3:
Input: root = []
Output: true

Constraints:
The number of nodes in the tree is in the range `[0, 5000]`.

`-104 <= Node.val <= 104`', false, 'Easy', '/articles/balanced-binary-tree', 44.8, 
   22.1, 'https://leetcode.com/problems/balanced-binary-tree', 999, 557.2, 1.2, '["Amazon"]'::jsonb, '["Tree,Depth-first Search,Recursion"]'::jsonb, 
   3372, 223, 94, true, '[]'::jsonb, true),
  (111, 'Minimum Depth of Binary Tree', 'Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

Note: A leaf is a node with no children.


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 2

Example 2:
Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5

Constraints:
The number of nodes in the tree is in the range `[0, 105]`.

`-1000 <= Node.val <= 1000`', false, 'Easy', '/articles/minimum-depth-of-binary-tree', 39.8, 
   20.3, 'https://leetcode.com/problems/minimum-depth-of-binary-tree', 999, 542.5, 1.4, '["Amazon,Facebook,Adobe"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   2303, 806, 74, true, '[]'::jsonb, true),
  (112, 'Path Sum', 'Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a root-to-leaf path such that adding up all the values along the path equals `targetSum`.

A leaf is a node with no children.


Example 1:
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true

Example 2:
Input: root = [1,2,3], targetSum = 5
Output: false

Example 3:
Input: root = [1,2], targetSum = 0
Output: false

Constraints:
The number of nodes in the tree is in the range `[0, 5000]`.

`-1000 <= Node.val <= 1000`
`-1000 <= targetSum <= 1000`', false, 'Easy', '/articles/path-sum', 42.6, 
   31.9, 'https://leetcode.com/problems/path-sum', 999, 600.5, 1.4, '["Facebook,Amazon,Microsoft,Apple,Oracle,ByteDance"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   3000, 599, 83, true, '[]'::jsonb, true),
  (113, 'Path Sum II', 'Given the `root` of a binary tree and an integer `targetSum`, return all root-to-leaf paths where each path''s sum equals `targetSum`.

A leaf is a node with no children.


Example 1:
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]

Example 2:
Input: root = [1,2,3], targetSum = 5
Output: []

Example 3:
Input: root = [1,2], targetSum = 0
Output: []

Constraints:
The number of nodes in the tree is in the range `[0, 5000]`.

`-1000 <= Node.val <= 1000`
`-1000 <= targetSum <= 1000`', false, 'Medium', '/articles/path-sum-ii', 49.5, 
   16.5, 'https://leetcode.com/problems/path-sum-ii', 999, 405.6, 819.7, '["Facebook,Microsoft,Amazon,Zillow"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   2673, 84, 97, true, '[]'::jsonb, true),
  (114, 'Flatten Binary Tree to Linked List', 'Given the `root` of a binary tree, flatten the tree into a "linked list":
The "linked list" should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always `null`.

The "linked list" should be in the same order as a pre-order traversal of the binary tree.


Example 1:
Input: root = [1,2,5,3,4,null,6]
Output: [1,null,2,null,3,null,4,null,5,null,6]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [0]
Output: [0]

Constraints:
The number of nodes in the tree is in the range `[0, 2000]`.

`-100 <= Node.val <= 100`
Follow up: Can you flatten the tree in-place (with `O(1)` extra space)?', false, 'Medium', '/articles/flatten-binary-tree-to-linked-list', 52.4, 
   35, 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list', 999, 429.4, 819.9, '["Facebook,Microsoft,Amazon"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   4062, 397, 91, true, '[]'::jsonb, true),
  (115, 'Distinct Subsequences', 'Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`.

A string''s subsequence is a new string formed from the original string by deleting some (can be none) of the characters without disturbing the remaining characters'' relative positions. (i.e., `"ACE"` is a subsequence of `"ABCDE"` while `"AEC"` is not).

It is guaranteed the answer fits on a 32-bit signed integer.


Example 1:
Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from S.

`rabbbit`
`rabbbit`
`rabbbit`

Example 2:
Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from S.

`babgbag`
`babgbag`
`babgbag`
`babgbag`
`babgbag`

Constraints:
`1 <= s.length, t.length <= 1000`
`s` and `t` consist of English letters.', false, 'Hard', '/articles/distinct-subsequences', 40, 
   49.9, 'https://leetcode.com/problems/distinct-subsequences', 654, 160.9, 402.3, '["Mathworks,Google,Amazon,Bloomberg"]'::jsonb, '["String,Dynamic Programming"]'::jsonb, 
   1859, 63, 97, true, '[]'::jsonb, true),
  (116, 'Populating Next Right Pointers in Each Node', 'You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.

Initially, all next pointers are set to `NULL`.

Follow up:
You may only use constant extra space.

Recursive approach is fine, you may assume implicit stack space does not count as extra space for this problem.


Example 1:
Input: root = [1,2,3,4,5,6,7]
Output: [1,#,2,3,#,4,5,6,7,#]
Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with ''#'' signifying the end of each level.


Constraints:
The number of nodes in the given tree is less than `4096`.

`-1000 <= node.val <= 1000`', false, 'Medium', '/articles/populating-next-right-pointers-in-each-node', 49.6, 
   36.6, 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node', 999, 477.2, 962.1, '["Microsoft,Bloomberg,Facebook,Google,Amazon"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search"]'::jsonb, 
   3233, 164, 95, true, '[]'::jsonb, true),
  (117, 'Populating Next Right Pointers in Each Node II', 'Given a binary tree
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.

Initially, all next pointers are set to `NULL`.

Follow up:
You may only use constant extra space.

Recursive approach is fine, you may assume implicit stack space does not count as extra space for this problem.


Example 1:
Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with ''#'' signifying the end of each level.


Constraints:
The number of nodes in the given tree is less than `6000`.

`-100 <= node.val <= 100`', false, 'Medium', '/articles/populating-next-right-pointers-in-each-node-ii', 42.4, 
   35.6, 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii', 999, 326.9, 771.2, '["Microsoft,Amazon,Bloomberg"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   2356, 198, 92, true, '[]'::jsonb, true),
  (118, 'Pascal''s Triangle', 'Given an integer `numRows`, return the first numRows of Pascal''s triangle.

In Pascal''s triangle, each number is the sum of the two numbers directly above it as shown:

Example 1:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]

Example 2:
Input: numRows = 1
Output: [[1]]

Constraints:
`1 <= numRows <= 30`', false, 'Easy', '/articles/pascals-triangle', 55.4, 
   46.3, 'https://leetcode.com/problems/pascals-triangle', 999, 477.4, 861.4, '["Google,Adobe,Apple,Amazon,Goldman Sachs,Samsung"]'::jsonb, '["Array"]'::jsonb, 
   2364, 130, 95, true, '[]'::jsonb, true),
  (119, 'Pascal''s Triangle II', 'Given an integer `rowIndex`, return the `rowIndexth` (0-indexed) row of the Pascal''s triangle.

In Pascal''s triangle, each number is the sum of the two numbers directly above it as shown:

Example 1:
Input: rowIndex = 3
Output: [1,3,3,1]

Example 2:
Input: rowIndex = 0
Output: [1]

Example 3:
Input: rowIndex = 1
Output: [1,1]

Constraints:
`0 <= rowIndex <= 33`
Follow up: Could you optimize your algorithm to use only `O(rowIndex)` extra space?', false, 'Easy', '/articles/pascals-triangle-ii', 52.5, 
   6.2, 'https://leetcode.com/problems/pascals-triangle-ii', 999, 365, 695, '["Microsoft,Google,Amazon"]'::jsonb, '["Array"]'::jsonb, 
   1302, 222, 85, true, '[]'::jsonb, true),
  (120, 'Triangle', 'Given a `triangle` array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index `i` on the current row, you may move to either index `i` or index `i + 1` on the next row.


Example 1:
Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).


Example 2:
Input: triangle = [[-10]]
Output: -10

Constraints:
`1 <= triangle.length <= 200`
`triangle[0].length == 1`
`triangle[i].length == triangle[i - 1].length + 1`
`-104 <= triangle[i][j] <= 104`
Follow up: Could you do this using only `O(n)` extra space, where `n` is the total number of rows in the triangle?', false, 'Medium', NULL, 46, 
   34.9, 'https://leetcode.com/problems/triangle', 999, 292.5, 635.2, '["Amazon,Bloomberg"]'::jsonb, '["Array,Dynamic Programming"]'::jsonb, 
   2753, 306, 90, true, '[]'::jsonb, true),
  (121, 'Best Time to Buy and Sell Stock', 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.


Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.


Example 2:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.


Constraints:
`1 <= prices.length <= 105`
`0 <= prices[i] <= 104`', false, 'Easy', '/articles/best-time-to-buy-and-sell-stock', 51.8, 
   94.8, 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock', 999, 1.3, 2.4, '["Amazon,Microsoft,Facebook,Apple,Adobe,Google,tcs,Bloomberg,eBay,Uber,ByteDance,Goldman Sachs,Expedia,VMware,Yahoo,Qualtrics,Oracle,ServiceNow,Visa,Samsung"]'::jsonb, '["Array,Dynamic Programming"]'::jsonb, 
   8132, 356, 96, true, '[]'::jsonb, true),
  (122, 'Best Time to Buy and Sell Stock II', 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


Example 1:
Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.

Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.


Example 2:
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.

Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.


Example 3:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e., max profit = 0.


Constraints:
`1 <= prices.length <= 3 * 104`
`0 <= prices[i] <= 104`', false, 'Easy', '/articles/best-time-to-buy-and-sell-stock-ii', 58.8, 
   46.6, 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii', 999, 804.1, 1.4, '["Amazon,Apple,tcs,Microsoft,Facebook,Uber"]'::jsonb, '["Array,Greedy"]'::jsonb, 
   3950, 1953, 67, true, '[]'::jsonb, true),
  (123, 'Best Time to Buy and Sell Stock III', 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

Find the maximum profit you can achieve. You may complete at most two transactions.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


Example 1:
Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.

Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.


Example 2:
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.

Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.


Example 3:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.


Example 4:
Input: prices = [1]
Output: 0

Constraints:
`1 <= prices.length <= 105`
`0 <= prices[i] <= 105`', false, 'Hard', '/articles/best-time-to-buy-and-sell-stock-iii', 40.2, 
   42.2, 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii', 775, 284.2, 707.6, '["Amazon,Google"]'::jsonb, '["Array,Dynamic Programming"]'::jsonb, 
   3417, 88, 97, true, '[]'::jsonb, true),
  (124, 'Binary Tree Maximum Path Sum', 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node''s values in the path.

Given the `root` of a binary tree, return the maximum path sum of any path.


Example 1:
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.


Example 2:
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.


Constraints:
The number of nodes in the tree is in the range `[1, 3 * 104]`.

`-1000 <= Node.val <= 1000`', false, 'Hard', '/articles/binary-tree-maximum-path-sum', 35.6, 
   69.3, 'https://leetcode.com/problems/binary-tree-maximum-path-sum', 999, 490.5, 1.4, '["Facebook,Amazon,Google,Microsoft,Bloomberg,Oracle,Adobe,Apple,Yahoo,ByteDance"]'::jsonb, '["Tree,Depth-first Search,Recursion"]'::jsonb, 
   5446, 387, 93, true, '[]'::jsonb, true),
  (125, 'Valid Palindrome', 'Given a string `s`, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.


Example 1:
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.


Example 2:
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.


Constraints:
`1 <= s.length <= 2 * 105`
`s` consists only of printable ASCII characters.', false, 'Easy', '/articles/valid-palindrome', 38.5, 
   67.7, 'https://leetcode.com/problems/valid-palindrome', 999, 831.2, 2.2, '["Facebook,Microsoft,Apple,Wayfair,Amazon,Yandex,Bloomberg,Oracle"]'::jsonb, '["Two Pointers,String"]'::jsonb, 
   1871, 3729, 33, true, '[]'::jsonb, true),
  (126, 'Word Ladder II', 'A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:
Every adjacent pair of words differs by a single letter.

Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.

`sk == endWord`
Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return all the shortest transformation sequences from `beginWord` to `endWord`, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words `[beginWord, s1, s2, ..., sk]`.


Example 1:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Explanation: There are 2 shortest transformation sequences:
"hit" -> "hot" -> "dot" -> "dog" -> "cog"
"hit" -> "hot" -> "lot" -> "log" -> "cog"

Example 2:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.


Constraints:
`1 <= beginWord.length <= 10`
`endWord.length == beginWord.length`
`1 <= wordList.length <= 5000`
`wordList[i].length == beginWord.length`
`beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.

`beginWord != endWord`
All the words in `wordList` are unique.', false, 'Hard', NULL, 23.8, 
   55.3, 'https://leetcode.com/problems/word-ladder-ii', 866, 223, 937, '["Uber,Amazon,Facebook,Box,Lyft,Microsoft,Google,Bloomberg"]'::jsonb, '["Array,String,Backtracking,Breadth-first Search"]'::jsonb, 
   2391, 293, 89, true, '[]'::jsonb, true),
  (127, 'Word Ladder', 'A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:
Every adjacent pair of words differs by a single letter.

Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.

`sk == endWord`
Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord`, or `0` if no such sequence exists.


Example 1:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.


Example 2:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.


Constraints:
`1 <= beginWord.length <= 10`
`endWord.length == beginWord.length`
`1 <= wordList.length <= 5000`
`wordList[i].length == beginWord.length`
`beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.

`beginWord != endWord`
All the words in `wordList` are unique.', false, 'Hard', '/articles/word-ladder', 32.1, 
   84.2, 'https://leetcode.com/problems/word-ladder', 999, 564.1, 1.8, '["Amazon,Facebook,Lyft,Microsoft,Google,Uber,Bloomberg,Qualtrics,Snapchat,Oracle,Yahoo,Apple,Zillow,Citadel"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   4859, 1404, 78, true, '[]'::jsonb, true),
  (128, 'Longest Consecutive Sequence', 'Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.


Example 1:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is `[1, 2, 3, 4]`. Therefore its length is 4.


Example 2:
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9

Constraints:
`0 <= nums.length <= 104`
`-109 <= nums[i] <= 109`
Follow up: Could you implement the `O(n)` solution?', false, 'Hard', '/articles/longest-consecutive-sequence', 46.5, 
   60, 'https://leetcode.com/problems/longest-consecutive-sequence', 999, 389, 837.1, '["Google,Amazon,Microsoft,Facebook,Bloomberg,Twitter"]'::jsonb, '["Array,Union Find"]'::jsonb, 
   4894, 238, 95, true, '[]'::jsonb, true),
  (129, 'Sum Root to Leaf Numbers', 'You are given the `root` of a binary tree containing digits from `0` to `9` only.

Each root-to-leaf path in the tree represents a number.

For example, the root-to-leaf path `1 -> 2 -> 3` represents the number `123`.

Return the total sum of all root-to-leaf numbers.

A leaf node is a node with no children.


Example 1:
Input: root = [1,2,3]
Output: 25
Explanation:
The root-to-leaf path `1->2` represents the number `12`.

The root-to-leaf path `1->3` represents the number `13`.

Therefore, sum = 12 + 13 = `25`.


Example 2:
Input: root = [4,9,0,5,1]
Output: 1026
Explanation:
The root-to-leaf path `4->9->5` represents the number 495.

The root-to-leaf path `4->9->1` represents the number 491.

The root-to-leaf path `4->0` represents the number 40.

Therefore, sum = 495 + 491 + 40 = `1026`.


Constraints:
The number of nodes in the tree is in the range `[1, 1000]`.

`0 <= Node.val <= 9`
The depth of the tree will not exceed `10`.', false, 'Medium', '/articles/sum-root-to-leaf-numbers', 51.3, 
   14, 'https://leetcode.com/problems/sum-root-to-leaf-numbers', 999, 324.2, 632.4, '["Facebook"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   2200, 58, 97, true, '[]'::jsonb, true),
  (130, 'Surrounded Regions', 'Given an `m x n` matrix `board` containing `''X''` and `''O''`, capture all regions surrounded by `''X''`.

A region is captured by flipping all `''O''`s into `''X''`s in that surrounded region.


Example 1:
Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation: Surrounded regions should not be on the border, which means that any ''O'' on the border of the board are not flipped to ''X''. Any ''O'' that is not on the border and it is not connected to an ''O'' on the border will be flipped to ''X''. Two cells are connected if they are adjacent cells connected horizontally or vertically.


Example 2:
Input: board = [["X"]]
Output: [["X"]]

Constraints:
`m == board.length`
`n == board[i].length`
`1 <= m, n <= 200`
`board[i][j]` is `''X''` or `''O''`.', false, 'Medium', '/articles/surrounded-regions', 29.8, 
   35.9, 'https://leetcode.com/problems/surrounded-regions', 999, 292.7, 983.8, '["Google,Amazon,Uber"]'::jsonb, '["Depth-first Search,Breadth-first Search,Union Find"]'::jsonb, 
   2640, 767, 77, true, '[]'::jsonb, true),
  (131, 'Palindrome Partitioning', 'Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of `s`.

A palindrome string is a string that reads the same backward as forward.


Example 1:
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]

Example 2:
Input: s = "a"
Output: [["a"]]

Constraints:
`1 <= s.length <= 16`
`s` contains only lowercase English letters.', false, 'Medium', '/articles/palindrome-partitioning', 52.6, 
   42.6, 'https://leetcode.com/problems/palindrome-partitioning', 981, 305.8, 581.6, '["Amazon,Apple,Google"]'::jsonb, '["Dynamic Programming,Backtracking,Depth-first Search"]'::jsonb, 
   3232, 102, 97, true, '[]'::jsonb, true),
  (132, 'Palindrome Partitioning II', 'Given a string `s`, partition `s` such that every substring of the partition is a palindrome.

Return the minimum cuts needed for a palindrome partitioning of `s`.


Example 1:
Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.


Example 2:
Input: s = "a"
Output: 0

Example 3:
Input: s = "ab"
Output: 1

Constraints:
`1 <= s.length <= 2000`
`s` consists of lower-case English letters only.', false, 'Hard', NULL, 31.4, 
   7.7, 'https://leetcode.com/problems/palindrome-partitioning-ii', 430, 153.2, 487.9, '["Amazon,Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1760, 52, 97, true, '[]'::jsonb, true),
  (133, 'Clone Graph', 'Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a val (`int`) and a list (`List[Node]`) of its neighbors.

class Node {
    public int val;
    public List<Node> neighbors;
}
Test case format:
For simplicity sake, each node''s value is the same as the node''s index (1-indexed). For example, the first node with `val = 1`, the second node with `val = 2`, and so on. The graph is represented in the test case using an adjacency list.

Adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with `val = 1`. You must return the copy of the given node as a reference to the cloned graph.


Example 1:
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.

1st node (val = 1)''s neighbors are 2nd node (val = 2) and 4th node (val = 4).

2nd node (val = 2)''s neighbors are 1st node (val = 1) and 3rd node (val = 3).

3rd node (val = 3)''s neighbors are 2nd node (val = 2) and 4th node (val = 4).

4th node (val = 4)''s neighbors are 1st node (val = 1) and 3rd node (val = 3).


Example 2:
Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.


Example 3:
Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.


Example 4:
Input: adjList = [[2],[1]]
Output: [[2],[1]]

Constraints:
`1 <= Node.val <= 100`
`Node.val` is unique for each node.

Number of Nodes will not exceed 100.

There is no repeated edges and no self-loops in the graph.

The Graph is connected and all nodes can be visited starting from the given node.', false, 'Medium', '/articles/clone-graph', 39.8, 
   50, 'https://leetcode.com/problems/clone-graph', 999, 456.5, 1.1, '["Facebook,Amazon,Microsoft,Bloomberg,Apple,Twitter,Uber,Adobe,Qualtrics"]'::jsonb, '["Depth-first Search,Breadth-first Search,Graph"]'::jsonb, 
   2906, 1675, 63, true, '[]'::jsonb, true),
  (134, 'Gas Station', 'There are `n` gas stations along a circular route, where the amount of gas at the `ith` station is `gas[i]`.

You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `ith` station to its next `(i + 1)th` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays `gas` and `cost`, return the starting gas station''s index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`. If there exists a solution, it is guaranteed to be unique

Example 1:
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation:
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.

Therefore, return 3 as the starting index.


Example 2:
Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
Explanation:
You can''t start at station 0 or 1, as there is not enough gas to travel to the next station.

Let''s start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.

Therefore, you can''t travel around the circuit once no matter where you start.


Constraints:
`gas.length == n`
`cost.length == n`
`1 <= n <= 104`
`0 <= gas[i], cost[i] <= 104`', false, 'Medium', '/articles/gas-station', 41.5, 
   60.5, 'https://leetcode.com/problems/gas-station', 999, 279.5, 672.8, '["Amazon,Microsoft,Apple,Hotstar,Google,Bloomberg,Citrix,C3 IoT"]'::jsonb, '["Greedy"]'::jsonb, 
   2879, 432, 87, true, '[]'::jsonb, true),
  (135, 'Candy', 'There are `n` children standing in a line. Each child is assigned a rating value given in the integer array `ratings`.

You are giving candies to these children subjected to the following requirements:
Each child must have at least one candy.

Children with a higher rating get more candies than their neighbors.

Return the minimum number of candies you need to have to distribute the candies to the children.


Example 1:
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.


Example 2:
Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.

The third child gets 1 candy because it satisfies the above two conditions.


Constraints:
`n == ratings.length`
`1 <= n <= 2 * 104`
`0 <= ratings[i] <= 2 * 104`', false, 'Hard', '/articles/candy', 33.3, 
   45.7, 'https://leetcode.com/problems/candy', 584, 153.8, 462.1, '["Amazon"]'::jsonb, '["Greedy"]'::jsonb, 
   1402, 195, 88, true, '[]'::jsonb, true),
  (136, 'Single Number', 'Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.

Follow up: Could you implement a solution with a linear runtime complexity and without using extra memory?

Example 1:
Input: nums = [2,2,1]
Output: 1

Example 2:
Input: nums = [4,1,2,1,2]
Output: 4

Example 3:
Input: nums = [1]
Output: 1

Constraints:
`1 <= nums.length <= 3 * 104`
`-3 * 104 <= nums[i] <= 3 * 104`
Each element in the array appears twice except for one element which appears only once.', false, 'Easy', '/articles/single-number', 66.7, 
   28.5, 'https://leetcode.com/problems/single-number', 999, 1.1, 1.7, '["Google,Amazon,Facebook,Microsoft"]'::jsonb, '["Hash Table,Bit Manipulation"]'::jsonb, 
   6010, 197, 97, true, '[]'::jsonb, true),
  (137, 'Single Number II', 'Given an integer array `nums` where every element appears three times except for one, which appears exactly once. Find the single element and return it.


Example 1:
Input: nums = [2,2,3,2]
Output: 3

Example 2:
Input: nums = [0,1,0,1,0,1,99]
Output: 99

Constraints:
`1 <= nums.length <= 3 * 104`
`-231 <= nums[i] <= 231 - 1`
Each element in `nums` appears exactly three times except for one element which appears once.

Follow up: Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?', false, 'Medium', '/articles/single-number-ii', 54.1, 
   35.6, 'https://leetcode.com/problems/single-number-ii', 894, 282.3, 522, '["Google,Adobe"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   2473, 401, 86, true, '[]'::jsonb, true),
  (138, 'Copy List with Random Pointer', 'A linked list of length `n` is given such that each node contains an additional random pointer, which could point to any node in the list, or `null`.

Construct a deep copy of the list. The deep copy should consist of exactly `n` brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the `next` and `random` pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes `X` and `Y` in the original list, where `X.random --> Y`, then for the corresponding two nodes `x` and `y` in the copied list, `x.random --> y`.

Return the head of the copied linked list.

The linked list is represented in the input/output as a list of `n` nodes. Each node is represented as a pair of `[val, random_index]` where:
`val`: an integer representing `Node.val`
`random_index`: the index of the node (range from `0` to `n-1`) that the `random` pointer points to, or `null` if it does not point to any node.

Your code will only be given the `head` of the original linked list.


Example 1:
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Example 2:
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]

Example 3:
Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]

Example 4:
Input: head = []
Output: []
Explanation: The given linked list is empty (null pointer), so return null.


Constraints:
`0 <= n <= 1000`
`-10000 <= Node.val <= 10000`
`Node.random` is `null` or is pointing to some node in the linked list.', false, 'Medium', '/articles/copy-list-with-random-pointer', 41.4, 
   74, 'https://leetcode.com/problems/copy-list-with-random-pointer', 999, 553.1, 1.3, '["Amazon,Facebook,Microsoft,Bloomberg,eBay,Oracle,Yahoo,Qualtrics"]'::jsonb, '["Hash Table,Linked List"]'::jsonb, 
   4977, 811, 86, true, '[]'::jsonb, true),
  (139, 'Word Break', 'Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.


Example 1:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".


Example 2:
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".

Note that you are allowed to reuse a dictionary word.


Example 3:
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false

Constraints:
`1 <= s.length <= 300`
`1 <= wordDict.length <= 1000`
`1 <= wordDict[i].length <= 20`
`s` and `wordDict[i]` consist of only lowercase English letters.

All the strings of `wordDict` are unique.', false, 'Medium', '/articles/word-break', 41.9, 
   82, 'https://leetcode.com/problems/word-break', 999, 738.3, 1.8, '["Facebook,Amazon,Bloomberg,Microsoft,ByteDance,eBay,Qualtrics,Oracle,Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   6350, 300, 95, true, '[]'::jsonb, true),
  (140, 'Word Break II', 'Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.


Example 1:
Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]

Example 2:
Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
Explanation: Note that you are allowed to reuse a dictionary word.


Example 3:
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: []

Constraints:
`1 <= s.length <= 20`
`1 <= wordDict.length <= 1000`
`1 <= wordDict[i].length <= 10`
`s` and `wordDict[i]` consist of only lowercase English letters.

All the strings of `wordDict` are unique.', false, 'Hard', '/articles/word-break-ii', 35.3, 
   70.4, 'https://leetcode.com/problems/word-break-ii', 999, 315.5, 893.4, '["Facebook,Amazon,Bloomberg,ByteDance,Google,Microsoft"]'::jsonb, '["Dynamic Programming,Backtracking"]'::jsonb, 
   3046, 443, 87, true, '[]'::jsonb, true),
  (141, 'Linked List Cycle', 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail''s `next` pointer is connected to. Note that `pos` is not passed as a parameter.

Return `true` if there is a cycle in the linked list. Otherwise, return `false`.


Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).


Example 2:
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.


Example 3:
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.


Constraints:
The number of the nodes in the list is in the range `[0, 104]`.

`-105 <= Node.val <= 105`
`pos` is `-1` or a valid index in the linked-list.

Follow up: Can you solve it using `O(1)` (i.e. constant) memory?', false, 'Easy', '/articles/linked-list-cycle', 43.1, 
   35.2, 'https://leetcode.com/problems/linked-list-cycle', 999, 883.4, 2.1, '["Microsoft,Apple,Amazon,Goldman Sachs,Facebook,Google"]'::jsonb, '["Linked List,Two Pointers"]'::jsonb, 
   4328, 598, 88, true, '[]'::jsonb, true),
  (142, 'Linked List Cycle II', 'Given a linked list, return the node where the cycle begins. If there is no cycle, return `null`.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail''s `next` pointer is connected to. Note that `pos` is not passed as a parameter.

Notice that you should not modify the linked list.


Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.


Example 2:
Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.


Example 3:
Input: head = [1], pos = -1
Output: no cycle
Explanation: There is no cycle in the linked list.


Constraints:
The number of the nodes in the list is in the range `[0, 104]`.

`-105 <= Node.val <= 105`
`pos` is `-1` or a valid index in the linked-list.

Follow up: Can you solve it using `O(1)` (i.e. constant) memory?', false, 'Medium', '/articles/linked-list-cycle-ii', 40, 
   22.2, 'https://leetcode.com/problems/linked-list-cycle-ii', 999, 436.1, 1.1, '["Microsoft,Amazon,Apple"]'::jsonb, '["Linked List,Two Pointers"]'::jsonb, 
   3978, 297, 93, true, '[]'::jsonb, true),
  (143, 'Reorder List', 'You are given the head of a singly linked-list. The list can be represented as:
L0 → L1 → ... → Ln - 1 → Ln
Reorder the list to be on the following form:
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → ...

You may not modify the values in the list''s nodes. Only nodes themselves may be changed.


Example 1:
Input: head = [1,2,3,4]
Output: [1,4,2,3]

Example 2:
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]

Constraints:
The number of nodes in the list is in the range `[1, 5 * 104]`.

`1 <= Node.val <= 1000`', false, 'Medium', '/articles/reorder-list', 41, 
   49.5, 'https://leetcode.com/problems/reorder-list', 999, 315.9, 769.7, '["Facebook,Amazon,Splunk"]'::jsonb, '["Linked List"]'::jsonb, 
   3014, 145, 95, true, '[]'::jsonb, true),
  (144, 'Binary Tree Preorder Traversal', 'Given the `root` of a binary tree, return the preorder traversal of its nodes'' values.


Example 1:
Input: root = [1,null,2,3]
Output: [1,2,3]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Example 4:
Input: root = [1,2]
Output: [1,2]

Example 5:
Input: root = [1,null,2]
Output: [1,2]

Constraints:
The number of nodes in the tree is in the range `[0, 100]`.

`-100 <= Node.val <= 100`
Follow up: Recursive solution is trivial, could you do it iteratively?', false, 'Medium', '/articles/binary-tree-preorder-traversal', 57.8, 
   6.9, 'https://leetcode.com/problems/binary-tree-preorder-traversal', 999, 619.4, 1.1, '["Amazon"]'::jsonb, '["Stack,Tree"]'::jsonb, 
   2189, 88, 96, true, '[]'::jsonb, true),
  (145, 'Binary Tree Postorder Traversal', 'Given the `root` of a binary tree, return the postorder traversal of its nodes'' values.


Example 1:
Input: root = [1,null,2,3]
Output: [3,2,1]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Example 4:
Input: root = [1,2]
Output: [2,1]

Example 5:
Input: root = [1,null,2]
Output: [2,1]

Constraints:
The number of the nodes in the tree is in the range `[0, 100]`.

`-100 <= Node.val <= 100`
Follow up:
Recursive solution is trivial, could you do it iteratively?', false, 'Medium', '/articles/binary-tree-postorder-traversal', 58, 
   2.9, 'https://leetcode.com/problems/binary-tree-postorder-traversal', 999, 474.1, 817, '["Amazon"]'::jsonb, '["Stack,Tree"]'::jsonb, 
   2507, 114, 96, true, '[]'::jsonb, true),
  (146, 'LRU Cache', 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the `LRUCache` class:
`LRUCache(int capacity)` Initialize the LRU cache with positive size `capacity`.

`int get(int key)` Return the value of the `key` if the key exists, otherwise return `-1`.

`void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, evict the least recently used key.

Follow up:
Could you do `get` and `put` in `O(1)` time complexity?

Example 1:
Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]
Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4

Constraints:
`1 <= capacity <= 3000`
`0 <= key <= 3000`
`0 <= value <= 104`
At most `3 * 104` calls will be made to `get` and `put`.', false, 'Medium', '/articles/lru-cache', 36.2, 
   99.2, 'https://leetcode.com/problems/lru-cache', 999, 738.4, 2, '["Amazon,Microsoft,Facebook,Apple,Bloomberg,Intuit,Snapchat,eBay,ByteDance,Google,Oracle,Zillow,Capital One,Uber,Dropbox,Paypal,Twilio,Adobe,Walmart Labs,Goldman Sachs"]'::jsonb, '["Design"]'::jsonb, 
   8181, 334, 96, true, '[]'::jsonb, true),
  (147, 'Insertion Sort List', 'Given the `head` of a singly linked list, sort the list using insertion sort, and return the sorted list''s head.

The steps of the insertion sort algorithm:
Insertion sort iterates, consuming one input element each repetition and growing a sorted output list.

At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list and inserts it there.

It repeats until no input elements remain.

The following is a graphical example of the insertion sort algorithm. The partially sorted list (black) initially contains only the first element in the list. One element (red) is removed from the input data and inserted in-place into the sorted list with each iteration.


Example 1:
Input: head = [4,2,1,3]
Output: [1,2,3,4]

Example 2:
Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]

Constraints:
The number of nodes in the list is in the range `[1, 5000]`.

`-5000 <= Node.val <= 5000`', false, 'Medium', '/articles/insertion-sort-list', 44.6, 
   22.9, 'https://leetcode.com/problems/insertion-sort-list', 819, 228.4, 511.8, '["Apple,Microsoft"]'::jsonb, '["Linked List,Sort"]'::jsonb, 
   1001, 681, 60, true, '[]'::jsonb, true),
  (148, 'Sort List', 'Given the `head` of a linked list, return the list after sorting it in ascending order.

Follow up: Can you sort the linked list in `O(n logn)` time and `O(1)` memory (i.e. constant space)?

Example 1:
Input: head = [4,2,1,3]
Output: [1,2,3,4]

Example 2:
Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]

Example 3:
Input: head = []
Output: []

Constraints:
The number of nodes in the list is in the range `[0, 5 * 104]`.

`-105 <= Node.val <= 105`', false, 'Medium', '/articles/sort-list', 46.7, 
   38.1, 'https://leetcode.com/problems/sort-list', 999, 347.4, 744.6, '["Facebook,Microsoft,Google,ByteDance"]'::jsonb, '["Linked List,Sort"]'::jsonb, 
   4052, 172, 96, true, '[]'::jsonb, true),
  (149, 'Max Points on a Line', 'Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.


Example 1:
Input: points = [[1,1],[2,2],[3,3]]
Output: 3

Example 2:
Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4

Constraints:
`1 <= points.length <= 300`
`points[i].length == 2`
`-104 <= xi, yi <= 104`
All the `points` are unique.', false, 'Hard', '/articles/max-points-on-a-line', 17.6, 
   61.7, 'https://leetcode.com/problems/max-points-on-a-line', 776, 177, 1, '["Apple,Google,LinkedIn,Amazon"]'::jsonb, '["Hash Table,Math"]'::jsonb, 
   85, 30, 74, true, '[]'::jsonb, true),
  (150, 'Evaluate Reverse Polish Notation', 'Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are `+`, `-`, `*`, and `/`. Each operand may be an integer or another expression.

Note that division between two integers should truncate toward zero.

It is guaranteed that the given RPN expression is always valid. That means the expression would always evaluate to a result, and there will not be any division by zero operation.


Example 1:
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9

Example 2:
Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6

Example 3:
Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22

Constraints:
`1 <= tokens.length <= 104`
`tokens[i]` is either an operator: `"+"`, `"-"`, `"*"`, or `"/"`, or an integer in the range `[-200, 200]`.', false, 'Medium', '/articles/evaluate-reverse-polish-notation', 38.2, 
   50.7, 'https://leetcode.com/problems/evaluate-reverse-polish-notation', 999, 277.4, 725.8, '["Amazon,Oracle,LinkedIn,Google,Microsoft"]'::jsonb, '["Stack"]'::jsonb, 
   1528, 520, 75, true, '[]'::jsonb, true),
  (151, 'Reverse Words in a String', 'Given an input string `s`, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in `s` will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that `s` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.


Example 1:
Input: s = "the sky is blue"
Output: "blue is sky the"

Example 2:
Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.


Example 3:
Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.


Example 4:
Input: s = "  Bob    Loves  Alice   "
Output: "Alice Loves Bob"

Example 5:
Input: s = "Alice does not even like bob"
Output: "bob like even not does Alice"

Constraints:
`1 <= s.length <= 104`
`s` contains English letters (upper-case and lower-case), digits, and spaces `'' ''`.

There is at least one word in `s`.

Follow up: Could you solve it in-place with `O(1)` extra space?', false, 'Medium', '/articles/reverse-words-in-a-string', 24.1, 
   52.4, 'https://leetcode.com/problems/reverse-words-in-a-string', 999, 516.5, 2.1, '["Microsoft,Oracle,LinkedIn,Apple,Salesforce"]'::jsonb, '["String"]'::jsonb, 
   1583, 3206, 33, true, '[]'::jsonb, true),
  (152, 'Maximum Product Subarray', 'Given an integer array `nums`, find a contiguous non-empty subarray within the array that has the largest product, and return the product.

It is guaranteed that the answer will fit in a 32-bit integer.

A subarray is a contiguous subsequence of the array.


Example 1:
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.


Example 2:
Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.


Constraints:
`1 <= nums.length <= 2 * 104`
`-10 <= nums[i] <= 10`
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.', false, 'Medium', '/articles/maximum-product-subarray', 32.9, 
   65.1, 'https://leetcode.com/problems/maximum-product-subarray', 999, 464.1, 1.4, '["Amazon,LinkedIn,Google,Apple,Facebook,Akuna Capital"]'::jsonb, '["Array,Dynamic Programming"]'::jsonb, 
   6539, 212, 97, true, '[]'::jsonb, true),
  (153, 'Find Minimum in Rotated Sorted Array', 'Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:
`[4,5,6,7,0,1,2]` if it was rotated `4` times.

`[0,1,2,4,5,6,7]` if it was rotated `7` times.

Notice that rotating an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.


Example 1:
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.


Example 2:
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.


Example 3:
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 

Constraints:
`n == nums.length`
`1 <= n <= 5000`
`-5000 <= nums[i] <= 5000`
All the integers of `nums` are unique.

`nums` is sorted and rotated between `1` and `n` times.', false, 'Medium', '/articles/find-minimum-in-rotated-sorted-array', 46.4, 
   35.8, 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array', 999, 576, 1.2, '["Facebook,Amazon,Bloomberg,Goldman Sachs,Microsoft,Oracle"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   3315, 297, 92, true, '[]'::jsonb, true),
  (154, 'Find Minimum in Rotated Sorted Array II', 'Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. For example, the array `nums = [0,1,4,4,5,6,7]` might become:
`[4,5,6,7,0,1,4]` if it was rotated `4` times.

`[0,1,4,4,5,6,7]` if it was rotated `7` times.

Notice that rotating an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` that may contain duplicates, return the minimum element of this array.


Example 1:
Input: nums = [1,3,5]
Output: 1

Example 2:
Input: nums = [2,2,2,0,1]
Output: 0

Constraints:
`n == nums.length`
`1 <= n <= 5000`
`-5000 <= nums[i] <= 5000`
`nums` is sorted and rotated between `1` and `n` times.

Follow up: This is the same as Find Minimum in Rotated Sorted Array but with duplicates. Would allow duplicates affect the run-time complexity? How and why?', false, 'Hard', '/articles/find-minimum-in-rotated-sorted-array-ii', 42.1, 
   24.4, 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii', 931, 241.2, 572.8, '["Amazon,Google,Oracle"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   1504, 273, 85, true, '[]'::jsonb, true),
  (155, 'Min Stack', 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the `MinStack` class:
`MinStack()` initializes the stack object.

`void push(val)` pushes the element `val` onto the stack.

`void pop()` removes the element on the top of the stack.

`int top()` gets the top element of the stack.

`int getMin()` retrieves the minimum element in the stack.


Example 1:
Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
Output
[null,null,null,null,-3,null,0,-2]
Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2

Constraints:
`-231 <= val <= 231 - 1`
Methods `pop`, `top` and `getMin` operations will always be called on non-empty stacks.

At most `3 * 104` calls will be made to `push`, `pop`, `top`, and `getMin`.', false, 'Easy', '/articles/min-stack', 46.8, 
   71.5, 'https://leetcode.com/problems/min-stack', 999, 703.4, 1.5, '["Capital One,Amazon,Bloomberg,Microsoft,Oracle,eBay,Apple,Coupang"]'::jsonb, '["Stack,Design"]'::jsonb, 
   4840, 452, 91, true, '[]'::jsonb, true),
  (156, 'Binary Tree Upside Down', 'Given the `root` of a binary tree, turn the tree upside down and return the new root.

You can turn a binary tree upside down with the following steps:
The original left child becomes the new root.

The original root becomes the new right child.

The original right child becomes the new left child.

The mentioned steps are done level by level, it is guaranteed that every node in the given tree has either 0 or 2 children.


Example 1:
Input: root = [1,2,3,4,5]
Output: [4,5,2,null,null,3,1]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Constraints:
The number of nodes in the tree will be in the range `[0, 10]`.

`1 <= Node.val <= 10`
`Every node has either 0 or 2 children.`', true, 'Medium', NULL, 56.6, 
   6.6, 'https://leetcode.com/problems/binary-tree-upside-down', 255, 67.6, 119.4, '["LinkedIn"]'::jsonb, '["Tree"]'::jsonb, 
   340, 1058, 24, false, '[]'::jsonb, true),
  (157, 'Read N Characters Given Read4', 'Given a `file` and assume that you can only read the file using a given method `read4`, implement a method to read `n` characters.

Method read4: 
The API `read4` reads four consecutive characters from `file`, then writes those characters into the buffer array `buf4`.

The return value is the number of actual characters read.

Note that `read4()` has its own file pointer, much like `FILE *fp` in C.

Definition of read4:
    Parameter:  char[] buf4
    Returns:    int
buf4[] is a destination, not a source. The results from read4 will be copied to buf4[].

Below is a high-level example of how `read4` works:
File file("abcde`"); // File is "`abcde`", initially file pointer (fp) points to ''a''
char[] buf4 = new char[4]; // Create buffer with enough space to store characters
read4(buf4); // read4 returns 4. Now buf4 = "abcd", fp points to ''e''
read4(buf4); // read4 returns 1. Now buf4 = "e", fp points to end of file
read4(buf4); // read4 returns 0. Now buf4 = "", fp points to end of file`
Method read:
By using the `read4` method, implement the method read that reads `n` characters from `file` and store it in the buffer array `buf`. Consider that you cannot manipulate `file` directly.

The return value is the number of actual characters read.

Definition of read: 
    Parameters:	char[] buf, int n
    Returns:	int
buf[] is a destination, not a source. You will need to write the results to buf[].

Note:
Consider that you cannot manipulate the file directly. The file is only accessible for `read4` but not for `read`.

The `read` function will only be called once for each test case.

You may assume the destination buffer array, `buf`, is guaranteed to have enough space for storing `n` characters.


Example 1:
Input: file = "abc", n = 4
Output: 3
Explanation: After calling your read method, buf should contain "abc". We read a total of 3 characters from the file, so return 3.

Note that "abc" is the file''s content, not buf. buf is the destination buffer that you will have to write the results to.


Example 2:
Input: file = "abcde", n = 5
Output: 5
Explanation: After calling your read method, buf should contain "abcde". We read a total of 5 characters from the file, so return 5.


Example 3:
Input: file = "abcdABCD1234", n = 12
Output: 12
Explanation: After calling your read method, buf should contain "abcdABCD1234". We read a total of 12 characters from the file, so return 12.


Example 4:
Input: file = "leetcode", n = 5
Output: 5
Explanation: After calling your read method, buf should contain "leetc". We read a total of 5 characters from the file, so return 5.


Constraints:
`1 <= file.length <= 500`
`file` consist of English letters and digits.

`1 <= n <= 1000`', true, 'Easy', '/articles/read-n-characters-given-read4', 37.7, 
   23.1, 'https://leetcode.com/problems/read-n-characters-given-read4', 385, 136.7, 362.8, '["Facebook,Rubrik,Microsoft"]'::jsonb, '["String"]'::jsonb, 
   382, 2404, 14, true, '[]'::jsonb, true),
  (158, 'Read N Characters Given Read4 II - Call multiple times', 'Given a `file` and assume that you can only read the file using a given method `read4`, implement a method `read` to read `n` characters. Your method `read` may be called multiple times.

Method read4: 
The API `read4` reads four consecutive characters from `file`, then writes those characters into the buffer array `buf4`.

The return value is the number of actual characters read.

Note that `read4()` has its own file pointer, much like `FILE *fp` in C.

Definition of read4:
    Parameter:  char[] buf4
    Returns:    int
buf4[] is a destination, not a source. The results from read4 will be copied to buf4[].

Below is a high-level example of how `read4` works:
File file("abcde`"); // File is "`abcde`", initially file pointer (fp) points to ''a''
char[] buf4 = new char[4]; // Create buffer with enough space to store characters
read4(buf4); // read4 returns 4. Now buf4 = "abcd", fp points to ''e''
read4(buf4); // read4 returns 1. Now buf4 = "e", fp points to end of file
read4(buf4); // read4 returns 0. Now buf4 = "", fp points to end of file`
Method read:
By using the `read4` method, implement the method read that reads `n` characters from `file` and store it in the buffer array `buf`. Consider that you cannot manipulate `file` directly.

The return value is the number of actual characters read.

Definition of read: 
    Parameters:	char[] buf, int n
    Returns:	int
buf[] is a destination, not a source. You will need to write the results to buf[].

Note:
Consider that you cannot manipulate the file directly. The file is only accessible for `read4` but not for `read`.

The read function may be called multiple times.

Please remember to RESET your class variables declared in Solution, as static/class variables are persisted across multiple test cases. Please see here for more details.

You may assume the destination buffer array, `buf`, is guaranteed to have enough space for storing `n` characters.

It is guaranteed that in a given test case the same buffer `buf` is called by `read`.


Example 1:
Input: file = "abc", queries = [1,2,1]
Output: [1,2,0]
Explanation: The test case represents the following scenario:
File file("abc");
Solution sol;
sol.read(buf, 1); // After calling your read method, buf should contain "a". We read a total of 1 character from the file, so return 1.

sol.read(buf, 2); // Now buf should contain "bc". We read a total of 2 characters from the file, so return 2.

sol.read(buf, 1); // We have reached the end of file, no more characters can be read. So return 0.

Assume buf is allocated and guaranteed to have enough space for storing all characters from the file.


Example 2:
Input: file = "abc", queries = [4,1]
Output: [3,0]
Explanation: The test case represents the following scenario:
File file("abc");
Solution sol;
sol.read(buf, 4); // After calling your read method, buf should contain "abc". We read a total of 3 characters from the file, so return 3.

sol.read(buf, 1); // We have reached the end of file, no more characters can be read. So return 0.


Constraints:
`1 <= file.length <= 500`
`file` consist of English letters and digits.

`1 <= queries.length <= 10`
`1 <= queries[i] <= 500`', true, 'Hard', NULL, 37.4, 
   59.8, 'https://leetcode.com/problems/read-n-characters-given-read4-ii-call-multiple-times', 555, 132.3, 354, '["Facebook,Lyft,Oracle,Apple"]'::jsonb, '["String"]'::jsonb, 
   627, 1334, 32, true, '[]'::jsonb, true),
  (159, 'Longest Substring with At Most Two Distinct Characters', 'Given a string `s`, return the length of the longest substring that contains at most two distinct characters.


Example 1:
Input: s = "eceba"
Output: 3
Explanation: The substring is "ece" which its length is 3.


Example 2:
Input: s = "ccaabbb"
Output: 5
Explanation: The substring is "aabbb" which its length is 5.


Constraints:
`1 <= s.length <= 104`
`s` consists of English letters.', true, 'Medium', '/articles/longest-substring-with-at-most-two-distinct-characters', 50.7, 
   19.6, 'https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters', 567, 142.6, 281.4, '["Facebook"]'::jsonb, '["Hash Table,Two Pointers,String,Sliding Window"]'::jsonb, 
   1276, 21, 98, true, '[]'::jsonb, true),
  (160, 'Intersection of Two Linked Lists', 'Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return `null`.

For example, the following two linked lists begin to intersect at node `c1`:
It is guaranteed that there are no cycles anywhere in the entire linked structure.

Note that the linked lists must retain their original structure after the function returns.


Example 1:
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Intersected at ''8''
Explanation: The intersected node''s value is 8 (note that this must not be 0 if the two lists intersect).

From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.


Example 2:
Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
Output: Intersected at ''2''
Explanation: The intersected node''s value is 2 (note that this must not be 0 if the two lists intersect).

From the head of A, it reads as [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B.


Example 3:
Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
Output: No intersection
Explanation: From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.

Explanation: The two lists do not intersect, so return null.


Constraints:
The number of nodes of `listA` is in the `m`.

The number of nodes of `listB` is in the `n`.

`0 <= m, n <= 3 * 104`
`1 <= Node.val <= 105`
`0 <= skipA <= m`
`0 <= skipB <= n`
`intersectVal` is `0` if `listA` and `listB` do not intersect.

`intersectVal == listA[skipA + 1] == listB[skipB + 1]` if `listA` and `listB` intersect.

Follow up: Could you write a solution that runs in `O(n)` time and use only `O(1)` memory?', false, 'Easy', '/articles/intersection-of-two-linked-lists', 44.5, 
   43.8, 'https://leetcode.com/problems/intersection-of-two-linked-lists', 999, 647.6, 1.5, '["Microsoft,Amazon,Facebook,Apple,ByteDance,Paypal,LinkedIn,Intuit"]'::jsonb, '["Linked List"]'::jsonb, 
   5392, 607, 90, true, '[]'::jsonb, true),
  (161, 'One Edit Distance', 'Given two strings `s` and `t`, return `true` if they are both one edit distance apart, otherwise return `false`.

A string `s` is said to be one distance apart from a string `t` if you can:
Insert exactly one character into `s` to get `t`.

Delete exactly one character from `s` to get `t`.

Replace exactly one character of `s` with a different character to get `t`.


Example 1:
Input: s = "ab", t = "acb"
Output: true
Explanation: We can insert ''c'' into s to get t.


Example 2:
Input: s = "", t = ""
Output: false
Explanation: We cannot get t from s by only one step.


Example 3:
Input: s = "a", t = ""
Output: true

Example 4:
Input: s = "", t = "A"
Output: true

Constraints:
`0 <= s.length <= 104`
`0 <= t.length <= 104`
`s` and `t` consist of lower-case letters, upper-case letters and/or digits.', true, 'Medium', '/articles/one-edit-distance', 33.2, 
   23.1, 'https://leetcode.com/problems/one-edit-distance', 521, 137.3, 413.9, '["Apple,Facebook,Amazon,Yandex"]'::jsonb, '["String"]'::jsonb, 
   838, 135, 86, true, '[]'::jsonb, true),
  (162, 'Find Peak Element', 'A peak element is an element that is strictly greater than its neighbors.

Given an integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that `nums[-1] = nums[n] = -∞`.


Example 1:
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.


Example 2:
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.


Constraints:
`1 <= nums.length <= 1000`
`-231 <= nums[i] <= 231 - 1`
`nums[i] != nums[i + 1]` for all valid `i`.

Follow up: Could you implement a solution with logarithmic complexity?', false, 'Medium', '/articles/find-peak-element', 44.1, 
   49, 'https://leetcode.com/problems/find-peak-element', 999, 476.9, 1.1, '["Facebook,Amazon,Google,Bloomberg,Quora"]'::jsonb, '["Array,Binary Search"]'::jsonb, 
   2711, 2601, 51, true, '[]'::jsonb, true),
  (163, 'Missing Ranges', 'You are given an inclusive range `[lower, upper]` and a sorted unique integer array `nums`, where all elements are in the inclusive range.

A number `x` is considered missing if `x` is in the range `[lower, upper]` and `x` is not in `nums`.

Return the smallest sorted list of ranges that cover every missing number exactly. That is, no element of `nums` is in any of the ranges, and each missing number is in one of the ranges.

Each range `[a,b]` in the list should be output as:
`"a->b"` if `a != b`
`"a"` if `a == b`

Example 1:
Input: nums = [0,1,3,50,75], lower = 0, upper = 99
Output: ["2","4->49","51->74","76->99"]
Explanation: The ranges are:
[2,2] --> "2"
[4,49] --> "4->49"
[51,74] --> "51->74"
[76,99] --> "76->99"

Example 2:
Input: nums = [], lower = 1, upper = 1
Output: ["1"]
Explanation: The only missing range is [1,1], which becomes "1".


Example 3:
Input: nums = [], lower = -3, upper = -1
Output: ["-3->-1"]
Explanation: The only missing range is [-3,-1], which becomes "-3->-1".


Example 4:
Input: nums = [-1], lower = -1, upper = -1
Output: []
Explanation: There are no missing ranges since there are no missing numbers.


Example 5:
Input: nums = [-1], lower = -2, upper = -1
Output: ["-2"]

Constraints:
`-109 <= lower <= upper <= 109`
`0 <= nums.length <= 100`
`lower <= nums[i] <= upper`
All the values of `nums` are unique.', true, 'Easy', '/articles/missing-ranges', 27.4, 
   26.2, 'https://leetcode.com/problems/missing-ranges', 691, 117.4, 429.4, '["Facebook,Google,Amazon,Coupang"]'::jsonb, '["Array"]'::jsonb, 
   523, 2107, 20, true, '[]'::jsonb, true),
  (164, 'Maximum Gap', 'Given an integer array `nums`, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return `0`.


Example 1:
Input: nums = [3,6,9,1]
Output: 3
Explanation: The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.


Example 2:
Input: nums = [10]
Output: 0
Explanation: The array contains less than 2 elements, therefore return 0.


Constraints:
`1 <= nums.length <= 104`
`0 <= nums[i] <= 109`
Follow up: Could you solve it in linear time/space?', false, 'Hard', '/articles/maximum-gap', 37.1, 
   34.2, 'https://leetcode.com/problems/maximum-gap', 357, 101, 272.3, '["Amazon"]'::jsonb, '["Sort"]'::jsonb, 
   1130, 210, 84, true, '[]'::jsonb, true),
  (165, 'Compare Version Numbers', 'Given two version numbers, `version1` and `version2`, compare them.

Version numbers consist of one or more revisions joined by a dot `''.''`. Each revision consists of digits and may contain leading zeros. Every revision contains at least one character. Revisions are 0-indexed from left to right, with the leftmost revision being revision 0, the next revision being revision 1, and so on. For example `2.5.33` and `0.1` are valid version numbers.

To compare version numbers, compare their revisions in left-to-right order. Revisions are compared using their integer value ignoring any leading zeros. This means that revisions `1` and `001` are considered equal. If a version number does not specify a revision at an index, then treat the revision as `0`. For example, version `1.0` is less than version `1.1` because their revision 0s are the same, but their revision 1s are `0` and `1` respectively, and `0 < 1`.

Return the following:
If `version1 < version2`, return `-1`.

If `version1 > version2`, return `1`.

Otherwise, return `0`.


Example 1:
Input: version1 = "1.01", version2 = "1.001"
Output: 0
Explanation: Ignoring leading zeroes, both "01" and "001" represent the same integer "1".


Example 2:
Input: version1 = "1.0", version2 = "1.0.0"
Output: 0
Explanation: version1 does not specify revision 2, which means it is treated as "0".


Example 3:
Input: version1 = "0.1", version2 = "1.1"
Output: -1
Explanation: version1''s revision 0 is "0", while version2''s revision 0 is "1". 0 < 1, so version1 < version2.


Example 4:
Input: version1 = "1.0.1", version2 = "1"
Output: 1

Example 5:
Input: version1 = "7.5.2.4", version2 = "7.5.3"
Output: -1

Constraints:
`1 <= version1.length, version2.length <= 500`
`version1` and `version2` only contain digits and `''.''`.

`version1` and `version2` are valid version numbers.

All the given revisions in `version1` and `version2` can be stored in a 32-bit integer.', false, 'Medium', '/articles/compare-version-numbers', 30.6, 
   38.4, 'https://leetcode.com/problems/compare-version-numbers', 999, 239.4, 781.4, '["Amazon,Google,Microsoft,ByteDance"]'::jsonb, '["String"]'::jsonb, 
   806, 1687, 32, true, '[]'::jsonb, true),
  (166, 'Fraction to Recurring Decimal', 'Given two integers representing the `numerator` and `denominator` of a fraction, return the fraction in string format.

If the fractional part is repeating, enclose the repeating part in parentheses.

If multiple answers are possible, return any of them.

It is guaranteed that the length of the answer string is less than `104` for all the given inputs.


Example 1:
Input: numerator = 1, denominator = 2
Output: "0.5"

Example 2:
Input: numerator = 2, denominator = 1
Output: "2"

Example 3:
Input: numerator = 2, denominator = 3
Output: "0.(6)"

Example 4:
Input: numerator = 4, denominator = 333
Output: "0.(012)"

Example 5:
Input: numerator = 1, denominator = 5
Output: "0.2"

Constraints:
`-231 <= numerator, denominator <= 231 - 1`
`denominator != 0`', false, 'Medium', '/articles/fraction-to-recurring-decimal', 22.4, 
   23.3, 'https://leetcode.com/problems/fraction-to-recurring-decimal', 451, 148.7, 663.5, '["Goldman Sachs,Facebook"]'::jsonb, '["Hash Table,Math"]'::jsonb, 
   1109, 2243, 33, true, '[]'::jsonb, true),
  (167, 'Two Sum II - Input array is sorted', 'Given an array of integers `numbers` that is already sorted in ascending order, find two numbers such that they add up to a specific `target` number.

Return the indices of the two numbers (1-indexed) as an integer array `answer` of size `2`, where `1 <= answer[0] < answer[1] <= numbers.length`.

You may assume that each input would have exactly one solution and you may not use the same element twice.


Example 1:
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.


Example 2:
Input: numbers = [2,3,4], target = 6
Output: [1,3]

Example 3:
Input: numbers = [-1,0], target = -1
Output: [1,2]

Constraints:
`2 <= numbers.length <= 3 * 104`
`-1000 <= numbers[i] <= 1000`
`numbers` is sorted in increasing order.

`-1000 <= target <= 1000`
Only one valid answer exists.', false, 'Easy', '/articles/two-sum-ii-input-array-is-sorted', 55.8, 
   28.9, 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted', 999, 549.4, 984.2, '["Amazon,Oracle,Microsoft"]'::jsonb, '["Array,Two Pointers,Binary Search"]'::jsonb, 
   2517, 703, 78, true, '[]'::jsonb, true),
  (168, 'Excel Sheet Column Title', 'Given an integer `columnNumber`, return its corresponding column title as it appears in an Excel sheet.

For example:
A -> 1
B -> 2
C -> 3
...

Z -> 26
AA -> 27
AB -> 28 
...


Example 1:
Input: columnNumber = 1
Output: "A"

Example 2:
Input: columnNumber = 28
Output: "AB"

Example 3:
Input: columnNumber = 701
Output: "ZY"

Example 4:
Input: columnNumber = 2147483647
Output: "FXSHRXW"

Constraints:
`1 <= columnNumber <= 231 - 1`', false, 'Easy', NULL, 31.9, 
   41.6, 'https://leetcode.com/problems/excel-sheet-column-title', 863, 250.9, 786.1, '["Microsoft,Facebook"]'::jsonb, '["Math"]'::jsonb, 
   1637, 302, 84, true, '[]'::jsonb, true),
  (169, 'Majority Element', 'Given an array `nums` of size `n`, return the majority element.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.


Example 1:
Input: nums = [3,2,3]
Output: 3

Example 2:
Input: nums = [2,2,1,1,1,2,2]
Output: 2

Constraints:
`n == nums.length`
`1 <= n <= 5 * 104`
`-231 <= nums[i] <= 231 - 1`
Follow-up: Could you solve the problem in linear time and in `O(1)` space?', false, 'Easy', '/articles/majority-element', 60.2, 
   51.6, 'https://leetcode.com/problems/majority-element', 999, 818.7, 1.4, '["Amazon,Microsoft,Bloomberg,Rubrik,Splunk,Apple,ByteDance,GoDaddy"]'::jsonb, '["Array,Divide and Conquer,Bit Manipulation"]'::jsonb, 
   4854, 256, 95, true, '[]'::jsonb, true),
  (170, 'Two Sum III - Data structure design', 'Design a data structure that accepts a stream of integers and checks if it has a pair of integers that sum up to a particular value.

Implement the `TwoSum` class:
`TwoSum()` Initializes the `TwoSum` object, with an empty array initially.

`void add(int number)` Adds `number` to the data structure.

`boolean find(int value)` Returns `true` if there exists any pair of numbers whose sum is equal to `value`, otherwise, it returns `false`.


Example 1:
Input
["TwoSum", "add", "add", "add", "find", "find"]
[[], [1], [3], [5], [4], [7]]
Output
[null, null, null, null, true, false]
Explanation
TwoSum twoSum = new TwoSum();
twoSum.add(1);   // [] --> [1]
twoSum.add(3);   // [1] --> [1,3]
twoSum.add(5);   // [1,3] --> [1,3,5]
twoSum.find(4);  // 1 + 3 = 4, return true
twoSum.find(7);  // No two integers sum up to 7, return false

Constraints:
`-105 <= number <= 105`
`-231 <= value <= 231 - 1`
At most `5 * 104` calls will be made to `add` and `find`.', true, 'Easy', '/articles/two-sum-iii-data-structure-design', 35, 
   5.6, 'https://leetcode.com/problems/two-sum-iii-data-structure-design', 209, 99.4, 284, '["LinkedIn"]'::jsonb, '["Hash Table,Design"]'::jsonb, 
   395, 292, 57, false, '[]'::jsonb, true),
  (171, 'Excel Sheet Column Number', 'Given a string `columnTitle` that represents the column title as appear in an Excel sheet, return its corresponding column number.

For example:
A -> 1
B -> 2
C -> 3
...

Z -> 26
AA -> 27
AB -> 28 
...


Example 1:
Input: columnTitle = "A"
Output: 1

Example 2:
Input: columnTitle = "AB"
Output: 28

Example 3:
Input: columnTitle = "ZY"
Output: 701

Example 4:
Input: columnTitle = "FXSHRXW"
Output: 2147483647

Constraints:
`1 <= columnTitle.length <= 7`
`columnTitle` consists only of uppercase English letters.

`columnTitle` is in the range `["A", "FXSHRXW"]`.', false, 'Easy', '/articles/excel-sheet-column-number', 57.1, 
   20.3, 'https://leetcode.com/problems/excel-sheet-column-number', 999, 370.9, 649.4, '["Goldman Sachs"]'::jsonb, '["Math"]'::jsonb, 
   1621, 197, 89, false, '[]'::jsonb, true),
  (172, 'Factorial Trailing Zeroes', 'Given an integer `n`, return the number of trailing zeroes in `n!`.

Follow up: Could you write a solution that works in logarithmic time complexity?

Example 1:
Input: n = 3
Output: 0
Explanation: 3! = 6, no trailing zero.


Example 2:
Input: n = 5
Output: 1
Explanation: 5! = 120, one trailing zero.


Example 3:
Input: n = 0
Output: 0

Constraints:
`0 <= n <= 104`', false, 'Easy', '/articles/factorial-trailing-zeroes', 38.8, 
   28.5, 'https://leetcode.com/problems/factorial-trailing-zeroes', 809, 253.1, 653, '["Bloomberg,Facebook,Amazon"]'::jsonb, '["Math"]'::jsonb, 
   1246, 1379, 47, true, '[]'::jsonb, true),
  (173, 'Binary Search Tree Iterator', 'Implement the `BSTIterator` class that represents an iterator over the in-order traversal of a binary search tree (BST):
`BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class. The `root` of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.

`boolean hasNext()` Returns `true` if there exists a number in the traversal to the right of the pointer, otherwise returns `false`.

`int next()` Moves the pointer to the right, then returns the number at the pointer.

Notice that by initializing the pointer to a non-existent smallest number, the first call to `next()` will return the smallest element in the BST.

You may assume that `next()` calls will always be valid. That is, there will be at least a next number in the in-order traversal when `next()` is called.


Example 1:
Input
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
Output
[null, 3, 7, true, 9, true, 15, true, 20, false]
Explanation
BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);
bSTIterator.next();    // return 3
bSTIterator.next();    // return 7
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 9
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 15
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 20
bSTIterator.hasNext(); // return False

Constraints:
The number of nodes in the tree is in the range `[1, 105]`.

`0 <= Node.val <= 106`
At most `105` calls will be made to `hasNext`, and `next`.

Follow up:
Could you implement `next()` and `hasNext()` to run in average `O(1)` time and use `O(h)` memory, where `h` is the height of the tree?', false, 'Medium', '/articles/binary-search-tree-iterator', 60.6, 
   60.2, 'https://leetcode.com/problems/binary-search-tree-iterator', 999, 398.9, 658.2, '["Facebook,ByteDance,Microsoft,Bloomberg,Google,Oracle,Amazon,Apple,Adobe"]'::jsonb, '["Stack,Tree,Design"]'::jsonb, 
   3575, 316, 92, true, '[]'::jsonb, true),
  (174, 'Dungeon Game', 'The demons had captured the princess and imprisoned her in the bottom-right corner of a `dungeon`. The `dungeon` consists of `m x n` rooms laid out in a 2D grid. Our valiant knight was initially positioned in the top-left room and must fight his way through `dungeon` to rescue the princess.

The knight has an initial health point represented by a positive integer. If at any point his health point drops to `0` or below, he dies immediately.

Some of the rooms are guarded by demons (represented by negative integers), so the knight loses health upon entering these rooms; other rooms are either empty (represented as 0) or contain magic orbs that increase the knight''s health (represented by positive integers).

To reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

Return the knight''s minimum initial health so that he can rescue the princess.

Note that any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.


Example 1:
Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
Output: 7
Explanation: The initial health of the knight must be at least 7 if he follows the optimal path: RIGHT-> RIGHT -> DOWN -> DOWN.


Example 2:
Input: dungeon = [[0]]
Output: 1

Constraints:
`m == dungeon.length`
`n == dungeon[i].length`
`1 <= m, n <= 200`
`-1000 <= dungeon[i][j] <= 1000`', false, 'Hard', '/articles/dungeon-game', 33.4, 
   19.7, 'https://leetcode.com/problems/dungeon-game', 625, 124.1, 371.5, '["JPMorgan"]'::jsonb, '["Binary Search,Dynamic Programming"]'::jsonb, 
   2256, 47, 98, false, '[]'::jsonb, true),
  (175, 'Combine Two Tables', 'SQL Schema', false, 'Easy', '/articles/combine-two-tables', 64.7, 
   60.7, 'https://leetcode.com/problems/combine-two-tables', 223, 354.4, 547.7, '["Adobe,Apple"]'::jsonb, '[]'::jsonb, 
   1163, 155, 88, true, '[]'::jsonb, true),
  (176, 'Second Highest Salary', 'SQL Schema', false, 'Easy', '/articles/second-highest-salary', 33.5, 
   73, 'https://leetcode.com/problems/second-highest-salary', 615, 315.9, 942.7, '["Amazon,Google,Apple"]'::jsonb, '[]'::jsonb, 
   1099, 540, 67, true, '[]'::jsonb, true),
  (177, 'Nth Highest Salary', 'Write a SQL query to get the nth highest salary from the `Employee` table.

+----+--------+
| Id | Salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
For example, given the above Employee table, the nth highest salary where n = 2 is `200`. If there is no nth highest salary, then the query should return `null`.

+------------------------+
| getNthHighestSalary(2) |
+------------------------+
| 200                    |
+------------------------+', false, 'Medium', NULL, 33.6, 
   55.4, 'https://leetcode.com/problems/nth-highest-salary', 602, 157.4, 468.6, '["Infosys"]'::jsonb, '[]'::jsonb, 
   608, 454, 57, false, '[]'::jsonb, true),
  (178, 'Rank Scores', 'SQL Schema', false, 'Medium', NULL, 51, 
   22.3, 'https://leetcode.com/problems/rank-scores', 561, 149.7, 293.6, '["Apple,Amazon,Facebook,Yahoo"]'::jsonb, '[]'::jsonb, 
   912, 165, 85, true, '[]'::jsonb, true),
  (179, 'Largest Number', 'Given a list of non-negative integers `nums`, arrange them such that they form the largest number.

Note: The result may be very large, so you need to return a string instead of an integer.


Example 1:
Input: nums = [10,2]
Output: "210"

Example 2:
Input: nums = [3,30,34,5,9]
Output: "9534330"

Example 3:
Input: nums = [1]
Output: "1"

Example 4:
Input: nums = [10]
Output: "10"

Constraints:
`1 <= nums.length <= 100`
`0 <= nums[i] <= 109`', false, 'Medium', '/articles/largest-number', 30.8, 
   42.2, 'https://leetcode.com/problems/largest-number', 991, 243.9, 791, '["Amazon,Microsoft,VMware"]'::jsonb, '["Sort"]'::jsonb, 
   2922, 311, 90, true, '[]'::jsonb, true),
  (180, 'Consecutive Numbers', 'SQL Schema', false, 'Medium', '/articles/consecutive-numbers', 42.6, 
   15.5, 'https://leetcode.com/problems/consecutive-numbers', 557, 124.5, 292.3, '["Amazon"]'::jsonb, '[]'::jsonb, 
   586, 134, 81, true, '[]'::jsonb, true),
  (181, 'Employees Earning More Than Their Managers', 'SQL Schema', false, 'Easy', '/articles/employees-earning-more-than-their-managers', 61, 
   29.9, 'https://leetcode.com/problems/employees-earning-more-than-their-managers', 360, 233.3, 382.4, '["Amazon"]'::jsonb, '[]'::jsonb, 
   794, 98, 89, true, '[]'::jsonb, true),
  (182, 'Duplicate Emails', 'SQL Schema', false, 'Easy', '/articles/duplicate-emails', 65, 
   9.6, 'https://leetcode.com/problems/duplicate-emails', 304, 233.4, 359, '["Microsoft"]'::jsonb, '[]'::jsonb, 
   627, 33, 95, false, '[]'::jsonb, true),
  (183, 'Customers Who Never Order', 'SQL Schema', false, 'Easy', '/articles/customers-who-never-order', 57.5, 
   11.1, 'https://leetcode.com/problems/customers-who-never-order', 314, 224.4, 390.4, '["Bloomberg"]'::jsonb, '[]'::jsonb, 
   518, 56, 90, false, '[]'::jsonb, true),
  (184, 'Department Highest Salary', 'SQL Schema', false, 'Medium', '/articles/department-highest-salary', 40.8, 
   25.5, 'https://leetcode.com/problems/department-highest-salary', 650, 145.8, 357.2, '["Amazon"]'::jsonb, '[]'::jsonb, 
   628, 134, 82, true, '[]'::jsonb, true),
  (185, 'Department Top Three Salaries', 'SQL Schema', false, 'Hard', '/articles/department-top-three-salaries', 39.8, 
   30.2, 'https://leetcode.com/problems/department-top-three-salaries', 687, 108.8, 273.7, '["Amazon,Uber"]'::jsonb, '[]'::jsonb, 
   729, 151, 83, true, '[]'::jsonb, true),
  (186, 'Reverse Words in a String II', 'Given a character array `s`, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in `s` will be separated by a single space.


Example 1:
Input: s = ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
Output: ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]

Example 2:
Input: s = ["a"]
Output: ["a"]

Constraints:
`1 <= s.length <= 105`
`s[i]` is an English letter (uppercase or lowercase), digit, or space `'' ''`.

There is at least one word in `s`.

`s` does not contain leading or trailing spaces.

All the words in `s` are guaranteed to be separated by a single space.

Follow up: Could you do it in-place without allocating extra space?', true, 'Medium', '/articles/reverse-words-in-a-string-ii', 46, 
   16.6, 'https://leetcode.com/problems/reverse-words-in-a-string-ii', 398, 101.8, 221.6, '["Microsoft"]'::jsonb, '["String"]'::jsonb, 
   573, 113, 84, false, '[]'::jsonb, true),
  (187, 'Repeated DNA Sequences', 'The DNA sequence is composed of a series of nucleotides abbreviated as `''A''`, `''C''`, `''G''`, and `''T''`.

For example, `"ACGAATTCCG"` is a DNA sequence.

When studying DNA, it is useful to identify repeated sequences within the DNA.

Given a string `s` that represents a DNA sequence, return all the `10`-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.


Example 1:
Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]

Example 2:
Input: s = "AAAAAAAAAAAAA"
Output: ["AAAAAAAAAA"]

Constraints:
`1 <= s.length <= 105`
`s[i]` is either `''A''`, `''C''`, `''G''`, or `''T''`.', false, 'Medium', '/articles/repeated-dna-sequences', 41.7, 
   39.6, 'https://leetcode.com/problems/repeated-dna-sequences', 729, 206.2, 495.1, '["Amazon,Google"]'::jsonb, '["Hash Table,Bit Manipulation"]'::jsonb, 
   1167, 333, 78, true, '[]'::jsonb, true),
  (188, 'Best Time to Buy and Sell Stock IV', 'You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `ith` day, and an integer `k`.

Find the maximum profit you can achieve. You may complete at most `k` transactions.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


Example 1:
Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.


Example 2:
Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.


Constraints:
`0 <= k <= 100`
`0 <= prices.length <= 1000`
`0 <= prices[i] <= 1000`', false, 'Hard', '/articles/best-time-to-buy-and-sell-stock-iv', 30, 
   46.3, 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv', 588, 177.8, 592.5, '["Amazon,Google,Uber"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   2362, 133, 95, true, '[]'::jsonb, true),
  (189, 'Rotate Array', 'Given an array, rotate the array to the right by `k` steps, where `k` is non-negative.


Example 1:
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]

Example 2:
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]

Constraints:
`1 <= nums.length <= 2 * 104`
`-231 <= nums[i] <= 231 - 1`
`0 <= k <= 105`
Follow up:
Try to come up with as many solutions as you can. There are at least three different ways to solve this problem.

Could you do it in-place with `O(1)` extra space?', false, 'Medium', '/articles/rotate-array', 36.8, 
   22.8, 'https://leetcode.com/problems/rotate-array', 999, 667.8, 1.8, '["Microsoft,Apple,Amazon"]'::jsonb, '["Array"]'::jsonb, 
   4368, 918, 83, true, '[]'::jsonb, true),
  (190, 'Reverse Bits', 'Reverse bits of a given 32 bits unsigned integer.

Note:
Note that in some languages such as Java, there is no unsigned integer type. In this case, both input and output will be given as a signed integer type. They should not affect your implementation, as the integer''s internal binary representation is the same, whether it is signed or unsigned.


In Java, the compiler represents the signed integers using 2''s complement notation. Therefore, in Example 2 above, the input represents the signed integer `-3` and the output represents the signed integer `-1073741825`.

Follow up:
If this function is called many times, how would you optimize it?

Example 1:
Input: n = 00000010100101000001111010011100
Output:    964176192 (00111001011110000010100101000000)
Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.


Example 2:
Input: n = 11111111111111111111111111111101
Output:   3221225471 (10111111111111111111111111111111)
Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.


Constraints:
The input must be a binary string of length `32`', false, 'Easy', '/articles/reverse-bits', 42.6, 
   15.2, 'https://leetcode.com/problems/reverse-bits', 999, 334.8, 785.7, '["Apple,Google"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   1662, 540, 75, true, '[]'::jsonb, true),
  (191, 'Number of 1 Bits', 'Write a function that takes an unsigned integer and returns the number of ''1'' bits it has (also known as the Hamming weight).

Note:
Note that in some languages, such as Java, there is no unsigned integer type. In this case, the input will be given as a signed integer type. It should not affect your implementation, as the integer''s internal binary representation is the same, whether it is signed or unsigned.


In Java, the compiler represents the signed integers using 2''s complement notation. Therefore, in Example 3, the input represents the signed integer. `-3`.


Example 1:
Input: n = 00000000000000000000000000001011
Output: 3
Explanation: The input binary string 00000000000000000000000000001011 has a total of three ''1'' bits.


Example 2:
Input: n = 00000000000000000000000010000000
Output: 1
Explanation: The input binary string 00000000000000000000000010000000 has a total of one ''1'' bit.


Example 3:
Input: n = 11111111111111111111111111111101
Output: 31
Explanation: The input binary string 11111111111111111111111111111101 has a total of thirty one ''1'' bits.


Constraints:
The input must be a binary string of length `32`.

Follow up: If this function is called many times, how would you optimize it?', false, 'Easy', '/articles/number-1-bits', 54.2, 
   26, 'https://leetcode.com/problems/number-of-1-bits', 999, 482.6, 889.8, '["Box,Cisco,Microsoft,Qualcomm"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   1430, 629, 69, false, '[]'::jsonb, true),
  (192, 'Word Frequency', 'Write a bash script to calculate the frequency of each word in a text file `words.txt`.

For simplicity sake, you may assume:
`words.txt` contains only lowercase characters and space `'' ''` characters.

Each word must consist of lowercase characters only.

Words are separated by one or more whitespace characters.


Example:
Assume that `words.txt` has the following content:
the day is sunny the the
the sunny is is
Your script should output the following, sorted by descending frequency:
the 4
is 3
sunny 2
day 1
Note:
Don''t worry about handling ties, it is guaranteed that each word''s frequency count is unique.

Could you write it in one-line using Unix pipes?', false, 'Medium', NULL, 25.6, 
   20.9, 'https://leetcode.com/problems/word-frequency', 133, 31, 121.1, '["Apple"]'::jsonb, '[]'::jsonb, 
   259, 181, 59, true, '[]'::jsonb, true),
  (193, 'Valid Phone Numbers', 'Given a text file `file.txt` that contains a list of phone numbers (one per line), write a one-liner bash script to print all valid phone numbers.

You may assume that a valid phone number must appear in one of the following two formats: (xxx) xxx-xxxx or xxx-xxx-xxxx. (x means a digit)
You may also assume each line in the text file must not contain leading or trailing white spaces.


Example:
Assume that `file.txt` has the following content:
987-123-4567
123 456 7890
(123) 456-7890
Your script should output the following valid phone numbers:
987-123-4567
(123) 456-7890', false, 'Easy', NULL, 25.4, 
   35.9, 'https://leetcode.com/problems/valid-phone-numbers', 118, 44.3, 174.2, '["Amazon,Apple"]'::jsonb, '[]'::jsonb, 
   187, 517, 27, true, '[]'::jsonb, true),
  (194, 'Transpose File', 'Given a text file `file.txt`, transpose its content.

You may assume that each row has the same number of columns, and each field is separated by the `'' ''` character.


Example:
If `file.txt` has the following content:
name age
alice 21
ryan 30
Output the following:
name alice ryan
age 21 30', false, 'Medium', NULL, 24.4, 
   12.3, 'https://leetcode.com/problems/transpose-file', 104, 15.6, 63.9, '[]'::jsonb, '[]'::jsonb, 
   80, 209, 28, false, '[]'::jsonb, true),
  (195, 'Tenth Line', 'Given a text file `file.txt`, print just the 10th line of the file.


Example:
Assume that `file.txt` has the following content:
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
Your script should output the tenth line, which is:
Line 10
Note:
1. If the file contains less than 10 lines, what should you output?
2. There''s at least three different solutions. Try to explore all possibilities.', false, 'Easy', NULL, 32.8, 
   23.4, 'https://leetcode.com/problems/tenth-line', 123, 61.4, 187.1, '["Apple,Google,Adobe"]'::jsonb, '[]'::jsonb, 
   190, 250, 43, true, '[]'::jsonb, true),
  (196, 'Delete Duplicate Emails', 'SQL Schema', false, 'Easy', '/articles/delete-duplicate-emails', 45.9, 
   20.9, 'https://leetcode.com/problems/delete-duplicate-emails', 294, 147.7, 321.6, '["Amazon"]'::jsonb, '[]'::jsonb, 
   556, 812, 41, true, '[]'::jsonb, true),
  (197, 'Rising Temperature', 'SQL Schema', false, 'Easy', '/articles/rising-temperature', 40.2, 
   13.4, 'https://leetcode.com/problems/rising-temperature', 468, 150.4, 374.4, '["Adobe"]'::jsonb, '[]'::jsonb, 
   510, 257, 66, false, '[]'::jsonb, true),
  (198, 'House Robber', 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.


Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).

Total amount you can rob = 1 + 3 = 4.


Example 2:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).

Total amount you can rob = 2 + 9 + 1 = 12.


Constraints:
`1 <= nums.length <= 100`
`0 <= nums[i] <= 400`', false, 'Medium', '/articles/house-robber', 43.1, 
   52.2, 'https://leetcode.com/problems/house-robber', 999, 698.6, 1.6, '["Cisco,Amazon,Microsoft,Oracle,Bloomberg,ByteDance,Splunk"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   6793, 189, 97, true, '[]'::jsonb, true),
  (199, 'Binary Tree Right Side View', 'Given the `root` of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.


Example 1:
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]

Example 2:
Input: root = [1,null,3]
Output: [1,3]

Example 3:
Input: root = []
Output: []

Constraints:
The number of nodes in the tree is in the range `[0, 100]`.

`-100 <= Node.val <= 100`', false, 'Medium', '/articles/binary-tree-right-side-view', 56.5, 
   71.7, 'https://leetcode.com/problems/binary-tree-right-side-view', 999, 431.1, 762.3, '["Facebook,Amazon,ByteDance,Bloomberg,Microsoft"]'::jsonb, '["Tree,Depth-first Search,Breadth-first Search,Recursion,Queue"]'::jsonb, 
   3717, 200, 95, true, '[]'::jsonb, true),
  (200, 'Number of Islands', 'Given an `m x n` 2D binary grid `grid` which represents a map of `''1''`s (land) and `''0''`s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.


Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 300`
`grid[i][j]` is `''0''` or `''1''`.', false, 'Medium', '/articles/number-of-islands', 49.5, 
   97.8, 'https://leetcode.com/problems/number-of-islands', 999, 1, 2, '["Amazon,Bloomberg,Microsoft,Oracle,Facebook,Apple,Uber,Google,Yandex,DoorDash,Qualtrics,Snapchat,Citadel,Expedia,LinkedIn,eBay,Goldman Sachs,VMware,Splunk,Tesla"]'::jsonb, '["Depth-first Search,Breadth-first Search,Union Find"]'::jsonb, 
   8105, 241, 97, true, '[]'::jsonb, true),
  (201, 'Bitwise AND of Numbers Range', 'Given two integers `left` and `right` that represent the range `[left, right]`, return the bitwise AND of all numbers in this range, inclusive.


Example 1:
Input: left = 5, right = 7
Output: 4

Example 2:
Input: left = 0, right = 0
Output: 0

Example 3:
Input: left = 1, right = 2147483647
Output: 0

Constraints:
`0 <= left <= right <= 231 - 1`', false, 'Medium', '/articles/bitwise-and-of-numbers-range', 39.7, 
   26, 'https://leetcode.com/problems/bitwise-and-of-numbers-range', 721, 169.5, 427.2, '["Adobe"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   1340, 143, 90, false, '[]'::jsonb, true),
  (202, 'Happy Number', 'Write an algorithm to determine if a number `n` is happy.

A happy number is a number defined by the following process:
Starting with any positive integer, replace the number by the sum of the squares of its digits.

Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.

Those numbers for which this process ends in 1 are happy.

Return `true` if `n` is a happy number, and `false` if not.


Example 1:
Input: n = 19
Output: true
Explanation:
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1

Example 2:
Input: n = 2
Output: false

Constraints:
`1 <= n <= 231 - 1`', false, 'Easy', '/articles/happy-number', 51.4, 
   53.2, 'https://leetcode.com/problems/happy-number', 999, 615.3, 1.2, '["Apple,Adobe,Barclays,ByteDance"]'::jsonb, '["Hash Table,Math"]'::jsonb, 
   3050, 501, 86, true, '[]'::jsonb, true),
  (203, 'Remove Linked List Elements', 'Given the `head` of a linked list and an integer `val`, remove all the nodes of the linked list that has `Node.val == val`, and return the new head.


Example 1:
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]

Example 2:
Input: head = [], val = 1
Output: []

Example 3:
Input: head = [7,7,7,7], val = 7
Output: []

Constraints:
The number of nodes in the list is in the range `[0, 104]`.

`1 <= Node.val <= 50`
`0 <= k <= 50`', false, 'Easy', '/articles/remove-linked-list-elements', 39.5, 
   61.5, 'https://leetcode.com/problems/remove-linked-list-elements', 999, 453.8, 1.1, '["Facebook,Amazon,Google,Microsoft,Apple"]'::jsonb, '["Linked List"]'::jsonb, 
   2585, 123, 95, true, '[]'::jsonb, true),
  (204, 'Count Primes', 'Count the number of prime numbers less than a non-negative number, `n`.


Example 1:
Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.


Example 2:
Input: n = 0
Output: 0

Example 3:
Input: n = 1
Output: 0

Constraints:
`0 <= n <= 5 * 106`', false, 'Easy', NULL, 32.3, 
   33.2, 'https://leetcode.com/problems/count-primes', 936, 455.7, 1.4, '["Apple,Capital One,Amazon,Microsoft,Cisco"]'::jsonb, '["Hash Table,Math"]'::jsonb, 
   2882, 754, 79, true, '[]'::jsonb, true),
  (205, 'Isomorphic Strings', 'Given two strings `s` and `t`, determine if they are isomorphic.

Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.


Example 1:
Input: s = "egg", t = "add"
Output: true

Example 2:
Input: s = "foo", t = "bar"
Output: false

Example 3:
Input: s = "paper", t = "title"
Output: true

Constraints:
`1 <= s.length <= 5 * 104`
`t.length == s.length`
`s` and `t` consist of any valid ascii character.', false, 'Easy', NULL, 40.6, 
   40.7, 'https://leetcode.com/problems/isomorphic-strings', 999, 354, 871.9, '["Amazon,Apple,Intel,Google"]'::jsonb, '["Hash Table"]'::jsonb, 
   1958, 462, 81, true, '[]'::jsonb, true),
  (206, 'Reverse Linked List', 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.


Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]

Example 3:
Input: head = []
Output: []

Constraints:
The number of nodes in the list is the range `[0, 5000]`.

`-5000 <= Node.val <= 5000`
Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?', false, 'Easy', '/articles/reverse-linked-list', 65.7, 
   87.9, 'https://leetcode.com/problems/reverse-linked-list', 999, 1.4, 2.1, '["Adobe,Amazon,Facebook,Apple,Microsoft,Qualcomm,Yandex,Google,Uber,Oracle,Bloomberg,IBM,Cisco,Goldman Sachs,ByteDance"]'::jsonb, '["Linked List"]'::jsonb, 
   6702, 129, 98, true, '[]'::jsonb, true),
  (207, 'Course Schedule', 'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.

For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return `true` if you can finish all courses. Otherwise, return `false`.


Example 1:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.


Example 2:
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.


Constraints:
`1 <= numCourses <= 105`
`0 <= prerequisites.length <= 5000`
`prerequisites[i].length == 2`
`0 <= ai, bi < numCourses`
All the pairs prerequisites[i] are unique.', false, 'Medium', '/articles/course-schedule', 44.3, 
   64.4, 'https://leetcode.com/problems/course-schedule', 999, 566.7, 1.3, '["Amazon,Intuit,Facebook,Karat,Microsoft,ByteDance,Bloomberg,Google"]'::jsonb, '["Depth-first Search,Breadth-first Search,Graph,Topological Sort"]'::jsonb, 
   5575, 229, 96, true, '[]'::jsonb, true),
  (208, 'Implement Trie (Prefix Tree)', 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
`Trie()` Initializes the trie object.

`void insert(String word)` Inserts the string `word` into the trie.

`boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.

`boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.


Example 1:
Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]
Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True

Constraints:
`1 <= word.length, prefix.length <= 2000`
`word` and `prefix` consist only of lowercase English letters.

At most `3 * 104` calls in total will be made to `insert`, `search`, and `startsWith`.', false, 'Medium', '/articles/implement-trie-prefix-tree', 52.5, 
   48, 'https://leetcode.com/problems/implement-trie-prefix-tree', 999, 405.1, 770.9, '["Amazon,Pinterest,Google,Microsoft,Oracle,Facebook,Apple,Goldman Sachs,Qualtrics"]'::jsonb, '["Design,Trie"]'::jsonb, 
   4393, 70, 98, true, '[]'::jsonb, true),
  (209, 'Minimum Size Subarray Sum', 'Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray `[numsl, numsl+1, ..., numsr-1, numsr]` of which the sum is greater than or equal to `target`. If there is no such subarray, return `0` instead.


Example 1:
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.


Example 2:
Input: target = 4, nums = [1,4,4]
Output: 1

Example 3:
Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0

Constraints:
`1 <= target <= 109`
`1 <= nums.length <= 105`
`1 <= nums[i] <= 105`
Follow up: If you have figured out the `O(n)` solution, try coding another solution of which the time complexity is `O(n log(n))`.', false, 'Medium', '/articles/minimum-size-subarray-sum', 39.8, 
   52.3, 'https://leetcode.com/problems/minimum-size-subarray-sum', 999, 347.6, 874, '["Goldman Sachs,Amazon,Bloomberg,Facebook,Microsoft,ByteDance"]'::jsonb, '["Array,Two Pointers,Binary Search"]'::jsonb, 
   3583, 139, 96, true, '[]'::jsonb, true),
  (210, 'Course Schedule II', 'There are a total of `n` courses you have to take labelled from `0` to `n - 1`.

Some courses may have `prerequisites`, for example, if `prerequisites[i] = [ai, bi]` this means you must take the course `bi` before the course `ai`.

Given the total number of courses `numCourses` and a list of the `prerequisite` pairs, return the ordering of courses you should take to finish all courses.

If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.


Example 1:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].


Example 2:
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.

So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].


Example 3:
Input: numCourses = 1, prerequisites = []
Output: [0]

Constraints:
`1 <= numCourses <= 2000`
`0 <= prerequisites.length <= numCourses * (numCourses - 1)`
`prerequisites[i].length == 2`
`0 <= ai, bi < numCourses`
`ai != bi`
All the pairs `[ai, bi]` are distinct.', false, 'Medium', '/articles/course-schedule-ii', 42.9, 
   67.5, 'https://leetcode.com/problems/course-schedule-ii', 999, 383.7, 893.4, '["Amazon,DoorDash,Microsoft,Google,Snapchat,Oracle,Intuit,Karat,Facebook,Pinterest,Wayfair,Robinhood"]'::jsonb, '["Depth-first Search,Breadth-first Search,Graph,Topological Sort"]'::jsonb, 
   3552, 166, 96, true, '[]'::jsonb, true),
  (211, 'Design Add and Search Words Data Structure', 'Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the `WordDictionary` class:
`WordDictionary()` Initializes the object.

`void addWord(word)` Adds `word` to the data structure, it can be matched later.

`bool search(word)` Returns `true` if there is any string in the data structure that matches `word` or `false` otherwise. `word` may contain dots `''.''` where dots can be matched with any letter.


Example:
Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]
Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True

Constraints:
`1 <= word.length <= 500`
`word` in `addWord` consists lower-case English letters.

`word` in `search` consist of  `''.''` or lower-case English letters.

At most `50000` calls will be made to `addWord` and `search`.', false, 'Medium', '/articles/add-and-search-word', 40.6, 
   57.2, 'https://leetcode.com/problems/design-add-and-search-words-data-structure', 999, 277, 683.1, '["Facebook,Google,Oracle,Amazon"]'::jsonb, '["Backtracking,Depth-first Search,Design,Trie"]'::jsonb, 
   2861, 122, 96, true, '[]'::jsonb, true),
  (212, 'Word Search II', 'Given an `m x n` `board` of characters and a list of strings `words`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.


Example 1:
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]

Example 2:
Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []

Constraints:
`m == board.length`
`n == board[i].length`
`1 <= m, n <= 12`
`board[i][j]` is a lowercase English letter.

`1 <= words.length <= 3 * 104`
`1 <= words[i].length <= 10`
`words[i]` consists of lowercase English letters.

All the strings of `words` are unique.', false, 'Hard', '/articles/word-search-ii', 37.4, 
   68.4, 'https://leetcode.com/problems/word-search-ii', 999, 291.9, 780, '["Amazon,Microsoft,Uber,Apple,Google,Facebook,Snapchat,Twitter"]'::jsonb, '["Backtracking,Trie"]'::jsonb, 
   3594, 142, 96, true, '[]'::jsonb, true),
  (213, 'House Robber II', 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.


Example 1:
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.


Example 2:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).

Total amount you can rob = 1 + 3 = 4.


Example 3:
Input: nums = [0]
Output: 0

Constraints:
`1 <= nums.length <= 100`
`0 <= nums[i] <= 1000`', false, 'Medium', '/articles/house-robber-ii', 37.7, 
   14.4, 'https://leetcode.com/problems/house-robber-ii', 999, 236.3, 627.6, '["eBay"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   2745, 64, 98, false, '[]'::jsonb, true),
  (214, 'Shortest Palindrome', 'You are given a string `s`. You can convert `s` to a palindrome by adding characters in front of it.

Return the shortest palindrome you can find by performing this transformation.


Example 1:
Input: s = "aacecaaa"
Output: "aaacecaaa"

Example 2:
Input: s = "abcd"
Output: "dcbabcd"

Constraints:
`0 <= s.length <= 5 * 104`
`s` consists of lowercase English letters only.', false, 'Hard', '/articles/shortest-palindrome', 30.8, 
   37.5, 'https://leetcode.com/problems/shortest-palindrome', 508, 114.1, 370.8, '["Microsoft"]'::jsonb, '["String"]'::jsonb, 
   1586, 149, 91, false, '[]'::jsonb, true),
  (215, 'Kth Largest Element in an Array', 'Given an integer array `nums` and an integer `k`, return the `kth` largest element in the array.

Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.


Example 1:
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Example 2:
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

Constraints:
`1 <= k <= nums.length <= 104`
`-104 <= nums[i] <= 104`', false, 'Medium', '/articles/kth-largest-element-in-an-array', 58.9, 
   81.7, 'https://leetcode.com/problems/kth-largest-element-in-an-array', 999, 869.2, 1.5, '["Facebook,Amazon,Walmart Labs,Apple,Microsoft,Bloomberg,ByteDance,LinkedIn,Adobe,Google,Spotify,Zillow"]'::jsonb, '["Divide and Conquer,Heap"]'::jsonb, 
   5413, 351, 94, true, '[]'::jsonb, true),
  (216, 'Combination Sum III', 'Find all valid combinations of `k` numbers that sum up to `n` such that the following conditions are true:
Only numbers `1` through `9` are used.

Each number is used at most once.

Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.


Example 1:
Input: k = 3, n = 7
Output: [[1,2,4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.


Example 2:
Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
Explanation:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
There are no other valid combinations.


Example 3:
Input: k = 4, n = 1
Output: []
Explanation: There are no valid combinations. [1,2,1] is not valid because 1 is used twice.


Example 4:
Input: k = 3, n = 2
Output: []
Explanation: There are no valid combinations.


Example 5:
Input: k = 9, n = 45
Output: [[1,2,3,4,5,6,7,8,9]]
Explanation:
1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45
​​​​​​​There are no other valid combinations.


Constraints:
`2 <= k <= 9`
`1 <= n <= 60`', false, 'Medium', '/articles/combination-sum-iii', 60.6, 
   4, 'https://leetcode.com/problems/combination-sum-iii', 999, 223, 368, '["Google,Microsoft,Amazon,Bloomberg"]'::jsonb, '["Array,Backtracking"]'::jsonb, 
   1737, 65, 96, true, '[]'::jsonb, true),
  (217, 'Contains Duplicate', 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.


Example 1:
Input: nums = [1,2,3,1]
Output: true

Example 2:
Input: nums = [1,2,3,4]
Output: false

Example 3:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

Constraints:
`1 <= nums.length <= 105`
`-109 <= nums[i] <= 109`', false, 'Easy', '/articles/contains-duplicate', 56.9, 
   31.8, 'https://leetcode.com/problems/contains-duplicate', 999, 777.9, 1.4, '["Apple,Microsoft,Adobe"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   1581, 841, 65, true, '[]'::jsonb, true),
  (218, 'The Skyline Problem', 'A city''s skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively.

The geometric information of each building is given in the array `buildings` where `buildings[i] = [lefti, righti, heighti]`:
`lefti` is the x coordinate of the left edge of the `ith` building.

`righti` is the x coordinate of the right edge of the `ith` building.

`heighti` is the height of the `ith` building.

You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height `0`.

The skyline should be represented as a list of "key points" sorted by their x-coordinate in the form `[[x1,y1],[x2,y2],...]`. Each key point is the left endpoint of some horizontal segment in the skyline except the last point in the list, which always has a y-coordinate `0` and is used to mark the skyline''s termination where the rightmost building ends. Any ground between the leftmost and rightmost buildings should be part of the skyline''s contour.

Note: There must be no consecutive horizontal lines of equal height in the output skyline. For instance, `[...,[2 3],[4 5],[7 5],[11 5],[12 7],...]` is not acceptable; the three lines of height 5 should be merged into one in the final output as such: `[...,[2 3],[4 5],[12 7],...]`

Example 1:
Input: buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
Output: [[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
Explanation:
Figure A shows the buildings of the input.

Figure B shows the skyline formed by those buildings. The red points in figure B represent the key points in the output list.


Example 2:
Input: buildings = [[0,2,3],[2,5,3]]
Output: [[0,3],[5,0]]

Constraints:
`1 <= buildings.length <= 104`
`0 <= lefti < righti <= 231 - 1`
`1 <= heighti <= 231 - 1`
`buildings` is sorted by `lefti` in non-decreasing order.', false, 'Hard', '/articles/skyline-problem', 36.6, 
   51.9, 'https://leetcode.com/problems/the-skyline-problem', 659, 167.7, 457.8, '["Microsoft,Amazon,Google,Twitter,Uber"]'::jsonb, '["Divide and Conquer,Heap,Binary Indexed Tree,Segment Tree,Line Sweep"]'::jsonb, 
   2792, 157, 95, true, '[]'::jsonb, true),
  (219, 'Contains Duplicate II', 'Given an integer array `nums` and an integer `k`, return `true` if there are two distinct indices `i` and `j` in the array such that `nums[i] == nums[j]` and `abs(i - j) <= k`.


Example 1:
Input: nums = [1,2,3,1], k = 3
Output: true

Example 2:
Input: nums = [1,0,1,1], k = 1
Output: true

Example 3:
Input: nums = [1,2,3,1,2,3], k = 2
Output: false

Constraints:
`1 <= nums.length <= 105`
`-109 <= nums[i] <= 109`
`0 <= k <= 105`', false, 'Easy', '/articles/contains-duplicate-ii', 38.8, 
   35.4, 'https://leetcode.com/problems/contains-duplicate-ii', 999, 328, 845, '["Facebook,Amazon"]'::jsonb, '["Array,Hash Table"]'::jsonb, 
   1282, 1377, 48, true, '[]'::jsonb, true),
  (220, 'Contains Duplicate III', 'Given an integer array `nums` and two integers `k` and `t`, return `true` if there are two distinct indices `i` and `j` in the array such that `abs(nums[i] - nums[j]) <= t` and `abs(i - j) <= k`.


Example 1:
Input: nums = [1,2,3,1], k = 3, t = 0
Output: true

Example 2:
Input: nums = [1,0,1,1], k = 1, t = 2
Output: true

Example 3:
Input: nums = [1,5,9,1,5,9], k = 2, t = 3
Output: false

Constraints:
`0 <= nums.length <= 2 * 104`
`-231 <= nums[i] <= 231 - 1`
`0 <= k <= 104`
`0 <= t <= 231 - 1`', false, 'Medium', '/articles/contains-duplicate-iii', 21.4, 
   10, 'https://leetcode.com/problems/contains-duplicate-iii', 551, 168.7, 789.7, '["Facebook"]'::jsonb, '["Sort,Ordered Map"]'::jsonb, 
   1564, 1644, 49, true, '[]'::jsonb, true),
  (221, 'Maximal Square', 'Given an `m x n` binary `matrix` filled with `0`''s and `1`''s, find the largest square containing only `1`''s and return its area.


Example 1:
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4

Example 2:
Input: matrix = [["0","1"],["1","0"]]
Output: 1

Example 3:
Input: matrix = [["0"]]
Output: 0

Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 300`
`matrix[i][j]` is `''0''` or `''1''`.', false, 'Medium', '/articles/maximal-square', 39.6, 
   86, 'https://leetcode.com/problems/maximal-square', 947, 348.9, 881.7, '["Amazon,IBM,Google,Twitter,ByteDance,Apple"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   4434, 104, 98, true, '[]'::jsonb, true),
  (222, 'Count Complete Tree Nodes', 'Given the `root` of a complete binary tree, return the number of the nodes in the tree.

According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between `1` and `2h` nodes inclusive at the last level `h`.


Example 1:
Input: root = [1,2,3,4,5,6]
Output: 6

Example 2:
Input: root = []
Output: 0

Example 3:
Input: root = [1]
Output: 1

Constraints:
The number of nodes in the tree is in the range `[0, 5 * 104]`.

`0 <= Node.val <= 5 * 104`
The tree is guaranteed to be complete.

Follow up: Traversing the tree to count the number of nodes in the tree is an easy solution but with `O(n)` complexity. Could you find a faster algorithm?', false, 'Medium', '/articles/count-complete-tree-nodes', 49.7, 
   25.8, 'https://leetcode.com/problems/count-complete-tree-nodes', 999, 288.7, 580.8, '["Google,Bloomberg,Microsoft"]'::jsonb, '["Binary Search,Tree"]'::jsonb, 
   2834, 254, 92, true, '[]'::jsonb, true),
  (223, 'Rectangle Area', 'Given the coordinates of two rectilinear rectangles in a 2D plane, return the total area covered by the two rectangles.

The first rectangle is defined by its bottom-left corner `(A, B)` and its top-right corner `(C, D)`.

The second rectangle is defined by its bottom-left corner `(E, F)` and its top-right corner `(G, H)`.


Example 1:
Input: A = -3, B = 0, C = 3, D = 4, E = 0, F = -1, G = 9, H = 2
Output: 45

Example 2:
Input: A = -2, B = -2, C = 2, D = 2, E = -2, F = -2, G = 2, H = 2
Output: 16

Constraints:
`-104 <= A, B, C, D, E, F, G, H <= 104`', false, 'Medium', NULL, 38.3, 
   20.3, 'https://leetcode.com/problems/rectangle-area', 524, 118.2, 308.3, '["Zillow"]'::jsonb, '["Math"]'::jsonb, 
   532, 872, 38, false, '[]'::jsonb, true),
  (224, 'Basic Calculator', 'Given a string `s` representing an expression, implement a basic calculator to evaluate it.


Example 1:
Input: s = "1 + 1"
Output: 2

Example 2:
Input: s = " 2-1 + 2 "
Output: 3

Example 3:
Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23

Constraints:
`1 <= s.length <= 3 * 105`
`s` consists of digits, `''+''`, `''-''`, `''(''`, `'')''`, and `'' ''`.

`s` represents a valid expression.', false, 'Hard', '/articles/basic-calculator', 38.3, 
   86.4, 'https://leetcode.com/problems/basic-calculator', 659, 204, 533.3, '["Amazon,Roblox,Facebook,Indeed,Karat,Microsoft,Google,ByteDance,Uber,Wish"]'::jsonb, '["Math,Stack"]'::jsonb, 
   2131, 177, 92, true, '[]'::jsonb, true),
  (225, 'Implement Stack using Queues', 'Implement a last in first out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal queue (`push`, `top`, `pop`, and `empty`).

Implement the `MyStack` class:
`void push(int x)` Pushes element x to the top of the stack.

`int pop()` Removes the element on the top of the stack and returns it.

`int top()` Returns the element on the top of the stack.

`boolean empty()` Returns `true` if the stack is empty, `false` otherwise.

Notes:
You must use only standard operations of a queue, which means only `push to back`, `peek/pop from front`, `size`, and `is empty` operations are valid.

Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue), as long as you use only a queue''s standard operations.


Example 1:
Input
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 2, 2, false]
Explanation
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False

Constraints:
`1 <= x <= 9`
At most `100` calls will be made to `push`, `pop`, `top`, and `empty`.

All the calls to `pop` and `top` are valid.

Follow-up: Can you implement the stack such that each operation is amortized `O(1)` time complexity? In other words, performing `n` operations will take overall `O(n)` time even if one of those operations may take longer. You can use more than two queues.', false, 'Easy', '/articles/implement-stack-using-queues', 47.9, 
   15.3, 'https://leetcode.com/problems/implement-stack-using-queues', 740, 216.5, 452.3, '["Amazon,Paypal"]'::jsonb, '["Stack,Design"]'::jsonb, 
   1016, 675, 60, true, '[]'::jsonb, true),
  (226, 'Invert Binary Tree', 'Given the `root` of a binary tree, invert the tree, and return its root.


Example 1:
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

Example 2:
Input: root = [2,1,3]
Output: [2,3,1]

Example 3:
Input: root = []
Output: []

Constraints:
The number of nodes in the tree is in the range `[0, 100]`.

`-100 <= Node.val <= 100`', false, 'Easy', '/articles/invert-binary-tree', 67.3, 
   58.3, 'https://leetcode.com/problems/invert-binary-tree', 999, 677.5, 1, '["Microsoft,Amazon,Google,Facebook,eBay,Paypal"]'::jsonb, '["Tree"]'::jsonb, 
   4997, 75, 99, true, '[]'::jsonb, true),
  (227, 'Basic Calculator II', 'Given a string `s` which represents an expression, evaluate this expression and return its value. 
The integer division should truncate toward zero.


Example 1:
Input: s = "3+2*2"
Output: 7

Example 2:
Input: s = " 3/2 "
Output: 1

Example 3:
Input: s = " 3+5 / 2 "
Output: 5

Constraints:
`1 <= s.length <= 3 * 105`
`s` consists of integers and operators `(''+'', ''-'', ''*'', ''/'')` separated by some number of spaces.

`s` represents a valid expression.

All the integers in the expression are non-negative integers in the range `[0, 231 - 1]`.

The answer is guaranteed to fit in a 32-bit integer.', false, 'Medium', '/articles/basic-calculator-ii', 38.8, 
   67.5, 'https://leetcode.com/problems/basic-calculator-ii', 828, 261.4, 674.4, '["Amazon,Facebook,Microsoft,Roblox,Snapchat,Uber"]'::jsonb, '["String,Stack"]'::jsonb, 
   2274, 354, 87, true, '[]'::jsonb, true),
  (228, 'Summary Ranges', 'You are given a sorted unique integer array `nums`.

Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of `nums` is covered by exactly one of the ranges, and there is no integer `x` such that `x` is in one of the ranges but not in `nums`.

Each range `[a,b]` in the list should be output as:
`"a->b"` if `a != b`
`"a"` if `a == b`

Example 1:
Input: nums = [0,1,2,4,5,7]
Output: ["0->2","4->5","7"]
Explanation: The ranges are:
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"

Example 2:
Input: nums = [0,2,3,4,6,8,9]
Output: ["0","2->4","6","8->9"]
Explanation: The ranges are:
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"

Example 3:
Input: nums = []
Output: []

Example 4:
Input: nums = [-1]
Output: ["-1"]

Example 5:
Input: nums = [0]
Output: ["0"]

Constraints:
`0 <= nums.length <= 20`
`-231 <= nums[i] <= 231 - 1`
All the values of `nums` are unique.

`nums` is sorted in ascending order.', false, 'Easy', '/articles/summary-ranges', 42.7, 
   29.4, 'https://leetcode.com/problems/summary-ranges', 999, 210.4, 492.9, '["Yandex,Facebook,Bloomberg,Qualtrics"]'::jsonb, '["Array"]'::jsonb, 
   971, 699, 58, true, '[]'::jsonb, true),
  (229, 'Majority Element II', 'Given an integer array of size `n`, find all elements that appear more than `⌊ n/3 ⌋` times.

Follow-up: Could you solve the problem in linear time and in O(1) space?

Example 1:
Input: nums = [3,2,3]
Output: [3]

Example 2:
Input: nums = [1]
Output: [1]

Example 3:
Input: nums = [1,2]
Output: [1,2]

Constraints:
`1 <= nums.length <= 5 * 104`
`-109 <= nums[i] <= 109`', false, 'Medium', '/articles/majority-element-ii', 39, 
   14.8, 'https://leetcode.com/problems/majority-element-ii', 796, 199.4, 511.1, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   2598, 220, 92, true, '[]'::jsonb, true),
  (230, 'Kth Smallest Element in a BST', 'Given the `root` of a binary search tree, and an integer `k`, return the `kth` (1-indexed) smallest element in the tree.


Example 1:
Input: root = [3,1,4,null,2], k = 1
Output: 1

Example 2:
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3

Constraints:
The number of nodes in the tree is `n`.

`1 <= k <= n <= 104`
`0 <= Node.val <= 104`
Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?', false, 'Medium', '/articles/kth-smallest-element-in-a-bst', 62.9, 
   26.7, 'https://leetcode.com/problems/kth-smallest-element-in-a-bst', 999, 521.1, 827.9, '["Amazon,Facebook,Adobe,Microsoft,Oracle"]'::jsonb, '["Binary Search,Tree"]'::jsonb, 
   3711, 85, 98, true, '[]'::jsonb, true),
  (231, 'Power of Two', 'Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.

An integer `n` is a power of two, if there exists an integer `x` such that `n == 2x`.


Example 1:
Input: n = 1
Output: true
Explanation: 20 = 1

Example 2:
Input: n = 16
Output: true
Explanation: 24 = 16

Example 3:
Input: n = 3
Output: false

Example 4:
Input: n = 4
Output: true

Example 5:
Input: n = 5
Output: false

Constraints:
`-231 <= n <= 231 - 1`
Follow up: Could you solve it without loops/recursion?', false, 'Easy', '/articles/power-of-two', 43.8, 
   15.8, 'https://leetcode.com/problems/power-of-two', 999, 408.2, 931.6, '["Apple"]'::jsonb, '["Math,Bit Manipulation"]'::jsonb, 
   1295, 217, 86, true, '[]'::jsonb, true),
  (232, 'Implement Queue using Stacks', 'Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

Implement the `MyQueue` class:
`void push(int x)` Pushes element x to the back of the queue.

`int pop()` Removes the element from the front of the queue and returns it.

`int peek()` Returns the element at the front of the queue.

`boolean empty()` Returns `true` if the queue is empty, `false` otherwise.

Notes:
You must use only standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.

Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack''s standard operations.

Follow-up: Can you implement the queue such that each operation is amortized `O(1)` time complexity? In other words, performing `n` operations will take overall `O(n)` time even if one of those operations may take longer.


Example 1:
Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]
Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false

Constraints:
`1 <= x <= 9`
At most `100` calls will be made to `push`, `pop`, `peek`, and `empty`.

All the calls to `pop` and `peek` are valid.', false, 'Easy', '/articles/implement-queue-using-stacks', 52.7, 
   37.4, 'https://leetcode.com/problems/implement-queue-using-stacks', 936, 271.6, 515.7, '["Amazon,Microsoft,Apple,Facebook,Citrix,Morgan Stanley"]'::jsonb, '["Stack,Design"]'::jsonb, 
   1659, 167, 91, true, '[]'::jsonb, true),
  (233, 'Number of Digit One', 'Given an integer `n`, count the total number of digit `1` appearing in all non-negative integers less than or equal to `n`.


Example 1:
Input: n = 13
Output: 6

Example 2:
Input: n = 0
Output: 0

Constraints:
`0 <= n <= 2 * 109`', false, 'Hard', '/articles/number-of-digit-one', 31.8, 
   25.9, 'https://leetcode.com/problems/number-of-digit-one', 295, 52.8, 165.8, '["Amazon"]'::jsonb, '["Math"]'::jsonb, 
   388, 730, 35, true, '[]'::jsonb, true),
  (234, 'Palindrome Linked List', 'Given the `head` of a singly linked list, return `true` if it is a palindrome.


Example 1:
Input: head = [1,2,2,1]
Output: true

Example 2:
Input: head = [1,2]
Output: false

Constraints:
The number of nodes in the list is in the range `[1, 105]`.

`0 <= Node.val <= 9`
Follow up: Could you do it in `O(n)` time and `O(1)` space?', false, 'Easy', '/articles/palindrome-linked-list', 41.9, 
   53.7, 'https://leetcode.com/problems/palindrome-linked-list', 999, 624, 1.5, '["Microsoft,Facebook,Amazon,Adobe,Capital One,Google,Oracle,Bloomberg,Uber,Snapchat,PayTM"]'::jsonb, '["Linked List,Two Pointers"]'::jsonb, 
   5077, 434, 92, true, '[]'::jsonb, true),
  (235, 'Lowest Common Ancestor of a Binary Search Tree', 'Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).”

Example 1:
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.


Example 2:
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.


Example 3:
Input: root = [2,1], p = 2, q = 1
Output: 2

Constraints:
The number of nodes in the tree is in the range `[2, 105]`.

`-109 <= Node.val <= 109`
All `Node.val` are unique.

`p != q`
`p` and `q` will exist in the BST.', false, 'Easy', '/articles/lowest-common-ancestor-of-a-binary-search-tree', 52.1, 
   22.1, 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree', 999, 492.3, 945.2, '["Amazon,Facebook,LinkedIn,Oracle,Microsoft"]'::jsonb, '["Tree"]'::jsonb, 
   2991, 130, 96, true, '[]'::jsonb, true),
  (236, 'Lowest Common Ancestor of a Binary Tree', 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).”

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.


Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.


Example 3:
Input: root = [1,2], p = 1, q = 2
Output: 1

Constraints:
The number of nodes in the tree is in the range `[2, 105]`.

`-109 <= Node.val <= 109`
All `Node.val` are unique.

`p != q`
`p` and `q` will exist in the tree.', false, 'Medium', '/articles/lowest-common-ancestor-of-a-binary-tree', 49.3, 
   76.3, 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree', 999, 629.2, 1.3, '["Facebook,Microsoft,Amazon,Oracle,LinkedIn,Apple,Bloomberg,Intuit,Adobe,Google,Uber,Zillow,Palantir Technologies,Atlassian"]'::jsonb, '["Tree"]'::jsonb, 
   5470, 202, 96, true, '[]'::jsonb, true),
  (237, 'Delete Node in a Linked List', 'Write a function to delete a node in a singly-linked list. You will not be given access to the `head` of the list, instead you will be given access to the node to be deleted directly.

It is guaranteed that the node to be deleted is not a tail node in the list.


Example 1:
Input: head = [4,5,1,9], node = 5
Output: [4,1,9]
Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.


Example 2:
Input: head = [4,5,1,9], node = 1
Output: [4,5,9]
Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.


Example 3:
Input: head = [1,2,3,4], node = 3
Output: [1,2,4]

Example 4:
Input: head = [0,1], node = 0
Output: [1]

Example 5:
Input: head = [-3,5,-99], node = -3
Output: [5,-99]

Constraints:
The number of the nodes in the given list is in the range `[2, 1000]`.

`-1000 <= Node.val <= 1000`
The value of each node in the list is unique.

The `node` to be deleted is in the list and is not a tail node', false, 'Easy', '/articles/delete-node-linked-list', 67.4, 
   20.6, 'https://leetcode.com/problems/delete-node-in-a-linked-list', 999, 589.9, 875, '["Adobe,Qualcomm"]'::jsonb, '["Linked List"]'::jsonb, 
   2506, 8900, 22, false, '[]'::jsonb, true),
  (238, 'Product of Array Except Self', 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.


Example 1:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Example 2:
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]

Constraints:
`2 <= nums.length <= 105`
`-30 <= nums[i] <= 30`
The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

Follow up:
Could you solve it in `O(n)` time complexity and without using division?
Could you solve it with `O(1)` constant space complexity? (The output array does not count as extra space for space complexity analysis.)', false, 'Medium', '/articles/product-of-array-except-self', 61.4, 
   92.3, 'https://leetcode.com/problems/product-of-array-except-self', 999, 742.5, 1.2, '["Facebook,Amazon,Apple,Asana,Lyft,Microsoft,Uber,Adobe,VMware,Nvidia,Oracle,Intel"]'::jsonb, '["Array"]'::jsonb, 
   7122, 545, 93, true, '[]'::jsonb, true),
  (239, 'Sliding Window Maximum', 'You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.


Example 1:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

Example 2:
Input: nums = [1], k = 1
Output: [1]

Example 3:
Input: nums = [1,-1], k = 1
Output: [1,-1]

Example 4:
Input: nums = [9,11], k = 2
Output: [11]

Example 5:
Input: nums = [4,-2], k = 2
Output: [4]

Constraints:
`1 <= nums.length <= 105`
`-104 <= nums[i] <= 104`
`1 <= k <= nums.length`', false, 'Hard', '/articles/sliding-window-maximum', 44.8, 
   79.4, 'https://leetcode.com/problems/sliding-window-maximum', 999, 384.5, 858.9, '["Amazon,ByteDance,Dropbox,Facebook,Google,Citadel,Bloomberg,Microsoft,Akuna Capital,IBM,Twitter"]'::jsonb, '["Heap,Sliding Window,Dequeue"]'::jsonb, 
   5504, 228, 96, true, '[]'::jsonb, true),
  (240, 'Search a 2D Matrix II', 'Write an efficient algorithm that searches for a `target` value in an `m x n` integer `matrix`. The `matrix` has the following properties:
Integers in each row are sorted in ascending from left to right.

Integers in each column are sorted in ascending from top to bottom.


Example 1:
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true

Example 2:
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
Output: false

Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= n, m <= 300`
`-109 <= matix[i][j] <= 109`
All the integers in each row are sorted in ascending order.

All the integers in each column are sorted in ascending order.

`-109 <= target <= 109`', false, 'Medium', '/articles/search-a-2d-matrix-ii', 45.3, 
   54.5, 'https://leetcode.com/problems/search-a-2d-matrix-ii', 999, 439.6, 969.6, '["Amazon,ByteDance,Microsoft,Bloomberg,Facebook"]'::jsonb, '["Binary Search,Divide and Conquer"]'::jsonb, 
   4580, 87, 98, true, '[]'::jsonb, true),
  (241, 'Different Ways to Add Parentheses', 'Given a string `expression` of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. You may return the answer in any order.


Example 1:
Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0 
(2-(1-1)) = 2

Example 2:
Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
Explanation:
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10

Constraints:
`1 <= expression.length <= 20`
`expression` consists of digits and the operator `''+''`, `''-''`, and `''*''`.', false, 'Medium', NULL, 57.6, 
   41.7, 'https://leetcode.com/problems/different-ways-to-add-parentheses', 488, 120.6, 209.5, '["Microsoft,Flipkart"]'::jsonb, '["Divide and Conquer"]'::jsonb, 
   2137, 114, 95, false, '[]'::jsonb, true),
  (242, 'Valid Anagram', 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.


Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false

Constraints:
`1 <= s.length, t.length <= 5 * 104`
`s` and `t` consist of lowercase English letters.

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?', false, 'Easy', '/articles/valid-anagram', 58.9, 
   58.3, 'https://leetcode.com/problems/valid-anagram', 999, 793.5, 1.3, '["Bloomberg,Facebook,Microsoft,Amazon,Apple,Oracle,Google,Goldman Sachs,Adobe,Cisco,Paypal,Qualcomm"]'::jsonb, '["Hash Table,Sort"]'::jsonb, 
   2484, 162, 94, true, '[]'::jsonb, true),
  (243, 'Shortest Word Distance', 'Given an array of strings `wordsDict` and two different strings that already exist in the array `word1` and `word2`, return the shortest distance between these two words in the list.


Example 1:
Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "coding", word2 = "practice"
Output: 3

Example 2:
Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
Output: 1

Constraints:
`1 <= wordsDict.length <= 3 * 104`
`1 <= wordsDict[i].length <= 10`
`wordsDict[i]` consists of lowercase English letters.

`word1` and `word2` are in `wordsDict`.

`word1 != word2`', true, 'Easy', '/articles/shortest-word-distance', 62.1, 
   28.2, 'https://leetcode.com/problems/shortest-word-distance', 377, 127, 204.5, '["LinkedIn,Microsoft,Goldman Sachs"]'::jsonb, '[]'::jsonb, 
   690, 53, 93, false, '[]'::jsonb, true),
  (244, 'Shortest Word Distance II', 'Design a data structure that will be initialized with a string array, and then it should answer queries of the shortest distance between two different strings from the array.

Implement the `WordDistance` class:
`WordDistance(String[] wordsDict)` initializes the object with the strings array `wordsDict`.

`int shortest(String word1, String word2)` returns the shortest distance between `word1` and `word2` in the array `wordsDict`.


Example 1:
Input
["WordDistance", "shortest", "shortest"]
[[["practice", "makes", "perfect", "coding", "makes"]], ["coding", "practice"], ["makes", "coding"]]
Output
[null, 3, 1]
Explanation
WordDistance wordDistance = new WordDistance(["practice", "makes", "perfect", "coding", "makes"]);
wordDistance.shortest("coding", "practice"); // return 3
wordDistance.shortest("makes", "coding");    // return 1

Constraints:
`1 <= wordsDict.length <= 3 * 104`
`1 <= wordsDict[i].length <= 10`
`wordsDict[i]` consists of lowercase English letters.

`word1` and `word2` are in `wordsDict`.

`word1 != word2`
At most `5000` calls will be made to `shortest`.', true, 'Medium', '/articles/shortest-word-distance-ii', 54.5, 
   62.6, 'https://leetcode.com/problems/shortest-word-distance-ii', 240, 84.1, 154.3, '["LinkedIn,Amazon,eBay"]'::jsonb, '["Hash Table,Design"]'::jsonb, 
   497, 148, 77, true, '[]'::jsonb, true),
  (245, 'Shortest Word Distance III', 'Given an array of strings `wordsDict` and two strings that already exist in the array `word1` and `word2`, return the shortest distance between these two words in the list.

Note that `word1` and `word2` may be the same. It is guaranteed that they represent two individual words in the list.


Example 1:
Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "coding"
Output: 1

Example 2:
Input: wordsDict = ["practice", "makes", "perfect", "coding", "makes"], word1 = "makes", word2 = "makes"
Output: 3

Constraints:
`1 <= wordsDict.length <= 3 * 104`
`1 <= wordsDict[i].length <= 10`
`wordsDict[i]` consists of lowercase English letters.

`word1` and `word2` are in `wordsDict`.', true, 'Medium', NULL, 56.1, 
   2.1, 'https://leetcode.com/problems/shortest-word-distance-iii', 222, 55.2, 98.4, '["LinkedIn"]'::jsonb, '["Array"]'::jsonb, 
   254, 76, 77, false, '[]'::jsonb, true),
  (246, 'Strobogrammatic Number', 'Given a string `num` which represents an integer, return `true` if `num` is a strobogrammatic number.

A strobogrammatic number is a number that looks the same when rotated `180` degrees (looked at upside down).


Example 1:
Input: num = "69"
Output: true

Example 2:
Input: num = "88"
Output: true

Example 3:
Input: num = "962"
Output: false

Example 4:
Input: num = "1"
Output: true

Constraints:
`1 <= num.length <= 50`
`num` consists of only digits.

`num` does not contain any leading zeros except for zero itself.', true, 'Easy', '/articles/strobogrammatic-number', 46.4, 
   10.1, 'https://leetcode.com/problems/strobogrammatic-number', 449, 103.7, 223.3, '["Facebook,Google,Microsoft"]'::jsonb, '["Hash Table,Math"]'::jsonb, 
   315, 582, 35, true, '[]'::jsonb, true),
  (247, 'Strobogrammatic Number II', 'Given an integer `n`, return all the strobogrammatic numbers that are of length `n`. You may return the answer in any order.

A strobogrammatic number is a number that looks the same when rotated `180` degrees (looked at upside down).


Example 1:
Input: n = 2
Output: ["11","69","88","96"]

Example 2:
Input: n = 1
Output: ["0","1","8"]

Constraints:
`1 <= n <= 14`', true, 'Medium', NULL, 48.8, 
   22.9, 'https://leetcode.com/problems/strobogrammatic-number-ii', 404, 92.6, 189.7, '["Facebook,Google"]'::jsonb, '["Math,Recursion"]'::jsonb, 
   549, 151, 78, true, '[]'::jsonb, true),
  (248, 'Strobogrammatic Number III', 'Given two strings low and high that represent two integers `low` and `high` where `low <= high`, return the number of strobogrammatic numbers in the range `[low, high]`.

A strobogrammatic number is a number that looks the same when rotated `180` degrees (looked at upside down).


Example 1:
Input: low = "50", high = "100"
Output: 3

Example 2:
Input: low = "0", high = "0"
Output: 1

Constraints:
`1 <= low.length, high.length <= 15`
`low` and `high` consist of only digits.

`low <= high`
`low` and `high` do not contain any leading zeros except for zero itself.', true, 'Hard', NULL, 40.4, 
   7.1, 'https://leetcode.com/problems/strobogrammatic-number-iii', 158, 30.7, 76.1, '["Google"]'::jsonb, '["Math,Recursion"]'::jsonb, 
   218, 154, 59, true, '[]'::jsonb, true),
  (249, 'Group Shifted Strings', 'We can shift a string by shifting each of its letters to its successive letter.

For example, `"abc"` can be shifted to be `"bcd"`.

We can keep shifting the string to form a sequence.

For example, we can keep shifting `"abc"` to form the sequence: `"abc" -> "bcd" -> ... -> "xyz"`.

Given an array of strings `strings`, group all `strings[i]` that belong to the same shifting sequence. You may return the answer in any order.


Example 1:
Input: strings = ["abc","bcd","acef","xyz","az","ba","a","z"]
Output: [["acef"],["a","z"],["abc","bcd","xyz"],["az","ba"]]

Example 2:
Input: strings = ["a"]
Output: [["a"]]

Constraints:
`1 <= strings.length <= 200`
`1 <= strings[i].length <= 50`
`strings[i]` consists of lowercase English letters.', true, 'Medium', NULL, 58.5, 
   38.1, 'https://leetcode.com/problems/group-shifted-strings', 543, 99.7, 170.4, '["Facebook,Google"]'::jsonb, '["Hash Table,String"]'::jsonb, 
   733, 154, 83, true, '[]'::jsonb, true),
  (250, 'Count Univalue Subtrees', 'Given the `root` of a binary tree, return the number of uni-value subtrees.

A uni-value subtree means all nodes of the subtree have the same value.


Example 1:
Input: root = [5,1,5,5,5,null,5]
Output: 4

Example 2:
Input: root = []
Output: 0

Example 3:
Input: root = [5,5,5,5,5,null,5]
Output: 6

Constraints:
The numbrt of the node in the tree will be in the range `[0, 1000]`.

`-1000 <= Node.val <= 1000`', true, 'Medium', '/articles/count-univalue-subtrees', 53.5, 
   11.1, 'https://leetcode.com/problems/count-univalue-subtrees', 441, 86.2, 161.1, '["Google,eBay,Box"]'::jsonb, '["Tree"]'::jsonb, 
   696, 190, 79, true, '[]'::jsonb, true),
  (251, 'Flatten 2D Vector', 'Design an iterator to flatten a 2D vector. It should support the `next` and `hasNext` operations.

Implement the `Vector2D` class:
`Vector2D(int[][] vec)` initializes the object with the 2D vector `vec`.

`next()` returns the next element from the 2D vector and moves the pointer one step forward. You may assume that all the calls to `next` are valid.

`hasNext()` returns `true` if there are still some elements in the vector, and `false` otherwise.


Example 1:
Input
["Vector2D", "next", "next", "next", "hasNext", "hasNext", "next", "hasNext"]
[[[[1, 2], [3], [4]]], [], [], [], [], [], [], []]
Output
[null, 1, 2, 3, true, true, 4, false]
Explanation
Vector2D vector2D = new Vector2D([[1, 2], [3], [4]]);
vector2D.next();    // return 1
vector2D.next();    // return 2
vector2D.next();    // return 3
vector2D.hasNext(); // return True
vector2D.hasNext(); // return True
vector2D.next();    // return 4
vector2D.hasNext(); // return False

Constraints:
`0 <= vec.length <= 200`
`0 <= vec[i].length <= 500`
`-500 <= vec[i][j] <= 500`
At most `105` calls will be made to `next` and `hasNext`.

Follow up: As an added challenge, try to code it using only iterators in C++ or iterators in Java.', true, 'Medium', '/articles/flatten-2d-vector', 46.4, 
   33.8, 'https://leetcode.com/problems/flatten-2d-vector', 406, 87.1, 187.5, '["Airbnb"]'::jsonb, '["Design"]'::jsonb, 
   435, 255, 63, false, '[]'::jsonb, true),
  (252, 'Meeting Rooms', 'Given an array of meeting time `intervals` where `intervals[i] = [starti, endi]`, determine if a person could attend all meetings.


Example 1:
Input: intervals = [[0,30],[5,10],[15,20]]
Output: false

Example 2:
Input: intervals = [[7,10],[2,4]]
Output: true

Constraints:
`0 <= intervals.length <= 104`
`intervals[i].length == 2`
`0 <= starti < endi <= 106`', true, 'Easy', '/articles/meeting-rooms', 55.5, 
   37.7, 'https://leetcode.com/problems/meeting-rooms', 519, 184, 331.3, '["Facebook,Microsoft,Bloomberg,Amazon,Adobe,Karat"]'::jsonb, '["Sort"]'::jsonb, 
   892, 45, 95, true, '[]'::jsonb, true),
  (253, 'Meeting Rooms II', 'Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of conference rooms required.


Example 1:
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2

Example 2:
Input: intervals = [[7,10],[2,4]]
Output: 1

Constraints:
`1 <= intervals.length <= 104`
`0 <= starti < endi <= 106`', true, 'Medium', '/articles/meeting-rooms-ii', 47.1, 
   89.7, 'https://leetcode.com/problems/meeting-rooms-ii', 999, 410.4, 871.4, '["Amazon,Bloomberg,Facebook,Google,Microsoft,Oracle,Uber,Yandex,ByteDance,Twitter,Apple,Walmart Labs,Adobe,Expedia,eBay"]'::jsonb, '["Heap,Greedy,Sort"]'::jsonb, 
   3642, 57, 98, true, '[]'::jsonb, true),
  (254, 'Factor Combinations', 'Numbers can be regarded as the product of their factors.

For example, `8 = 2 x 2 x 2 = 2 x 4`.

Given an integer `n`, return all possible combinations of its factors. You may return the answer in any order.

Note that the factors should be in the range `[2, n - 1]`.


Example 1:
Input: n = 1
Output: []

Example 2:
Input: n = 12
Output: [[2,6],[3,4],[2,2,3]]

Example 3:
Input: n = 37
Output: []

Example 4:
Input: n = 32
Output: [[2,16],[4,8],[2,2,8],[2,4,4],[2,2,2,4],[2,2,2,2,2]]

Constraints:
`1 <= n <= 108`', true, 'Medium', NULL, 47.6, 
   16.7, 'https://leetcode.com/problems/factor-combinations', 248, 82.5, 173.5, '["LinkedIn"]'::jsonb, '["Backtracking"]'::jsonb, 
   686, 29, 96, false, '[]'::jsonb, true),
  (255, 'Verify Preorder Sequence in Binary Search Tree', 'Given an array of unique integers `preorder`, return `true` if it is the correct preorder traversal sequence of a binary search tree.


Example 1:
Input: preorder = [5,2,1,3,6]
Output: true

Example 2:
Input: preorder = [5,2,6,1,3]
Output: false

Constraints:
`1 <= preorder.length <= 104`
`1 <= preorder[i] <= 104`
All the elements of `preorder` are unique.

Follow up: Could you do it using only constant space complexity?', true, 'Medium', NULL, 46.4, 
   12.6, 'https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree', 145, 55.3, 119.2, '["VMware"]'::jsonb, '["Stack,Tree"]'::jsonb, 
   743, 63, 92, false, '[]'::jsonb, true),
  (256, 'Paint House', 'There is a row of `n` houses, where each house can be painted one of three colors: red, blue, or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by an `n x 3` cost matrix `costs`.

For example, `costs[0][0]` is the cost of painting house `0` with the color red; `costs[1][2]` is the cost of painting house 1 with color green, and so on...

Return the minimum cost to paint all houses.


Example 1:
Input: costs = [[17,2,17],[16,16,5],[14,3,19]]
Output: 10
Explanation: Paint house 0 into blue, paint house 1 into green, paint house 2 into blue.

Minimum cost: 2 + 5 + 3 = 10.


Example 2:
Input: costs = [[7,6,2]]
Output: 2

Constraints:
`costs.length == n`
`costs[i].length == 3`
`1 <= n <= 100`
`1 <= costs[i][j] <= 20`', true, 'Medium', '/articles/paint-house', 53.9, 
   45.1, 'https://leetcode.com/problems/paint-house', 346, 108.3, 200.8, '["Roblox,LinkedIn,Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1196, 103, 92, true, '[]'::jsonb, true),
  (257, 'Binary Tree Paths', 'Given the `root` of a binary tree, return all root-to-leaf paths in any order.

A leaf is a node with no children.


Example 1:
Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]

Example 2:
Input: root = [1]
Output: ["1"]

Constraints:
The number of nodes in the tree is in the range `[1, 100]`.

`-100 <= Node.val <= 100`', false, 'Easy', '/articles/binary-tree-paths', 54, 
   30.3, 'https://leetcode.com/problems/binary-tree-paths', 999, 387.7, 717.6, '["Facebook,Google,Apple,Bloomberg"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   2486, 129, 95, true, '[]'::jsonb, true),
  (258, 'Add Digits', 'Given an integer `num`, repeatedly add all its digits until the result has only one digit, and return it.


Example 1:
Input: num = 38
Output: 2
Explanation: The process is
38 --> 3 + 8 --> 11
11 --> 1 + 1 --> 2 
Since 2 has only one digit, return it.


Example 2:
Input: num = 0
Output: 0

Constraints:
`0 <= num <= 231 - 1`
Follow up: Could you do it without any loop/recursion in `O(1)` runtime?', false, 'Easy', '/articles/add-digits', 58.7, 
   22, 'https://leetcode.com/problems/add-digits', 999, 348.9, 594.6, '["Amazon,Google"]'::jsonb, '["Math"]'::jsonb, 
   1142, 1282, 47, true, '[]'::jsonb, true),
  (259, '3Sum Smaller', 'Given an array of `n` integers `nums` and an integer `target`, find the number of index triplets `i`, `j`, `k` with `0 <= i < j < k < n` that satisfy the condition `nums[i] + nums[j] + nums[k] < target`.

Follow up: Could you solve it in `O(n2)` runtime?

Example 1:
Input: nums = [-2,0,1,3], target = 2
Output: 2
Explanation: Because there are two triplets which sums are less than 2:
[-2,0,1]
[-2,0,3]

Example 2:
Input: nums = [], target = 0
Output: 0

Example 3:
Input: nums = [0], target = 0
Output: 0

Constraints:
`n == nums.length`
`0 <= n <= 300`
`-100 <= nums[i] <= 100`
`-100 <= target <= 100`', true, 'Medium', '/articles/3sum-smaller', 49.2, 
   26.4, 'https://leetcode.com/problems/3sum-smaller', 226, 84.7, 172.2, '["IBM,Citadel"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   837, 87, 91, false, '[]'::jsonb, true),
  (260, 'Single Number III', 'Given an integer array `nums`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.

Follow up: Your algorithm should run in linear runtime complexity. Could you implement it using only constant space complexity?

Example 1:
Input: nums = [1,2,1,3,2,5]
Output: [3,5]
Explanation:  [5, 3] is also a valid answer.


Example 2:
Input: nums = [-1,0]
Output: [-1,0]

Example 3:
Input: nums = [0,1]
Output: [1,0]

Constraints:
`2 <= nums.length <= 3 * 104`
`-231 <= nums[i] <= 231 - 1`
Each integer in `nums` will appear twice, only two integers will appear once.', false, 'Medium', '/articles/single-number-iii', 65.4, 
   22.1, 'https://leetcode.com/problems/single-number-iii', 661, 188, 287.4, '["Facebook"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   2216, 131, 94, true, '[]'::jsonb, true),
  (261, 'Graph Valid Tree', 'You have a graph of `n` nodes labeled from `0` to `n - 1`. You are given an integer n and a list of `edges` where `edges[i] = [ai, bi]` indicates that there is an undirected edge between nodes `ai` and `bi` in the graph.

Return `true` if the edges of the given graph make up a valid tree, and `false` otherwise.


Example 1:
Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true

Example 2:
Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false

Constraints:
`1 <= 2000 <= n`
`0 <= edges.length <= 5000`
`edges[i].length == 2`
`0 <= ai, bi < n`
`ai != bi`
There are no self-loops or repeated edges.', true, 'Medium', '/articles/graph-valid-tree', 43.3, 
   30.9, 'https://leetcode.com/problems/graph-valid-tree', 508, 158.9, 366.5, '["Amazon,Qualtrics,Microsoft"]'::jsonb, '["Depth-first Search,Breadth-first Search,Union Find,Graph"]'::jsonb, 
   1367, 42, 97, true, '[]'::jsonb, true),
  (262, 'Trips and Users', 'SQL Schema', false, 'Hard', NULL, 35.5, 
   22.4, 'https://leetcode.com/problems/trips-and-users', 845, 78.5, 221.2, '["Uber"]'::jsonb, '[]'::jsonb, 
   486, 357, 58, false, '[]'::jsonb, true),
  (263, 'Ugly Number', 'Given an integer `n`, return `true` if `n` is an ugly number.

Ugly number is a positive number whose prime factors only include `2`, `3`, and/or `5`.


Example 1:
Input: n = 6
Output: true
Explanation: 6 = 2 × 3

Example 2:
Input: n = 8
Output: true
Explanation: 8 = 2 × 2 × 2

Example 3:
Input: n = 14
Output: false
Explanation: 14 is not ugly since it includes another prime factor 7.


Example 4:
Input: n = 1
Output: true
Explanation: 1 is typically treated as an ugly number.


Constraints:
`-231 <= n <= 231 - 1`', false, 'Easy', NULL, 41.7, 
   13.2, 'https://leetcode.com/problems/ugly-number', 807, 236.4, 566.8, '["Adobe"]'::jsonb, '["Math"]'::jsonb, 
   733, 777, 49, false, '[]'::jsonb, true),
  (264, 'Ugly Number II', 'Given an integer `n`, return the `nth` ugly number.

Ugly number is a positive number whose prime factors only include `2`, `3`, and/or `5`.


Example 1:
Input: n = 10
Output: 12
Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.


Example 2:
Input: n = 1
Output: 1
Explanation: 1 is typically treated as an ugly number.


Constraints:
`1 <= n <= 1690`', false, 'Medium', '/articles/ugly-number-ii', 43, 
   21, 'https://leetcode.com/problems/ugly-number-ii', 590, 203.6, 473.5, '["Amazon,Adobe"]'::jsonb, '["Math,Dynamic Programming,Heap"]'::jsonb, 
   2532, 156, 94, true, '[]'::jsonb, true),
  (265, 'Paint House II', 'There are a row of `n` houses, each house can be painted with one of the `k` colors. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by an `n x k` cost matrix costs.

For example, `costs[0][0]` is the cost of painting house `0` with color `0`; `costs[1][2]` is the cost of painting house `1` with color `2`, and so on...

Return the minimum cost to paint all houses.


Example 1:
Input: costs = [[1,5,3],[2,9,4]]
Output: 5
Explanation:
Paint house 0 into color 0, paint house 1 into color 2. Minimum cost: 1 + 4 = 5; 
Or paint house 0 into color 2, paint house 1 into color 0. Minimum cost: 3 + 2 = 5.


Example 2:
Input: costs = [[1,3],[2,4]]
Output: 5

Constraints:
`costs.length == n`
`costs[i].length == k`
`1 <= n <= 100`
`1 <= k <= 20`
`1 <= costs[i][j] <= 20`
Follow up: Could you solve it in `O(nk)` runtime?', true, 'Hard', '/articles/paint-house-ii', 45.9, 
   15.5, 'https://leetcode.com/problems/paint-house-ii', 238, 68.5, 149.2, '["LinkedIn,Walmart Labs"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   628, 26, 96, false, '[]'::jsonb, true),
  (266, 'Palindrome Permutation', 'Given a string `s`, return `true` if a permutation of the string could form a palindrome.


Example 1:
Input: s = "code"
Output: false

Example 2:
Input: s = "aab"
Output: true

Example 3:
Input: s = "carerac"
Output: true

Constraints:
`1 <= s.length <= 5000`
`s` consists of only lowercase English letters.', true, 'Easy', '/articles/palindrome-permutation', 62.7, 
   30.9, 'https://leetcode.com/problems/palindrome-permutation', 522, 123.5, 197, '["Facebook,Microsoft"]'::jsonb, '["Hash Table"]'::jsonb, 
   580, 63, 90, true, '[]'::jsonb, true),
  (267, 'Palindrome Permutation II', 'Given a string s, return all the palindromic permutations (without duplicates) of it.

You may return the answer in any order. If `s` has no palindromic permutation, return an empty list.


Example 1:
Input: s = "aabb"
Output: ["abba","baab"]

Example 2:
Input: s = "abc"
Output: []

Constraints:
`1 <= s.length <= 16`
`s` consists of only lowercase English letters.', true, 'Medium', '/articles/palindrome-permutation-ii', 37.6, 
   11.1, 'https://leetcode.com/problems/palindrome-permutation-ii', 234, 44.3, 117.8, '["Microsoft"]'::jsonb, '["Backtracking"]'::jsonb, 
   554, 70, 89, false, '[]'::jsonb, true),
  (268, 'Missing Number', 'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.

Follow up: Could you implement a solution using only `O(1)` extra space complexity and `O(n)` runtime complexity?

Example 1:
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.


Example 2:
Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.


Example 3:
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.


Example 4:
Input: nums = [0]
Output: 1
Explanation: n = 1 since there is 1 number, so all numbers are in the range [0,1]. 1 is the missing number in the range since it does not appear in nums.


Constraints:
`n == nums.length`
`1 <= n <= 104`
`0 <= nums[i] <= n`
All the numbers of `nums` are unique.', false, 'Easy', '/articles/missing-number', 55.2, 
   35.5, 'https://leetcode.com/problems/missing-number', 999, 650, 1.2, '["Capital One,Amazon,Facebook,Apple,Microsoft,Oracle,Goldman Sachs,Cisco,Arista Networks"]'::jsonb, '["Array,Math,Bit Manipulation"]'::jsonb, 
   2889, 2501, 54, true, '[]'::jsonb, true),
  (269, 'Alien Dictionary', 'There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.

You are given a list of strings `words` from the alien language''s dictionary, where the strings in `words` are sorted lexicographically by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language''s rules. If there is no solution, return `""`. If there are multiple solutions, return any of them.

A string `s` is lexicographically smaller than a string `t` if at the first letter where they differ, the letter in `s` comes before the letter in `t` in the alien language. If the first `min(s.length, t.length)` letters are the same, then `s` is smaller if and only if `s.length < t.length`.


Example 1:
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"

Example 2:
Input: words = ["z","x"]
Output: "zx"

Example 3:
Input: words = ["z","x","z"]
Output: ""
Explanation: The order is invalid, so return `""`.


Constraints:
`1 <= words.length <= 100`
`1 <= words[i].length <= 100`
`words[i]` consists of only lowercase English letters.', true, 'Hard', '/articles/alien-dictionary', 33.8, 
   75.7, 'https://leetcode.com/problems/alien-dictionary', 918, 198.1, 585.8, '["Facebook,Amazon,Airbnb,Pinterest,Google,Microsoft,ByteDance"]'::jsonb, '["Graph,Topological Sort"]'::jsonb, 
   2445, 471, 84, true, '[]'::jsonb, true),
  (270, 'Closest Binary Search Tree Value', 'Given the `root` of a binary search tree and a `target` value, return the value in the BST that is closest to the `target`.


Example 1:
Input: root = [4,2,5,1,3], target = 3.714286
Output: 4

Example 2:
Input: root = [1], target = 4.428571
Output: 1

Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`0 <= Node.val <= 109`
`-109 <= target <= 109`', true, 'Easy', '/articles/closest-bst-value', 50.3, 
   30.3, 'https://leetcode.com/problems/closest-binary-search-tree-value', 506, 184.9, 367.7, '["Facebook,Bloomberg,Amazon"]'::jsonb, '["Binary Search,Tree"]'::jsonb, 
   1022, 76, 93, true, '[]'::jsonb, true),
  (271, 'Encode and Decode Strings', 'Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Machine 1 (sender) has the function:
string encode(vector<string> strs) {
  // ... your code
  return encoded_string;
}
Machine 2 (receiver) has the function:
vector<string> decode(string s) {
  //... your code
  return strs;
}
So Machine 1 does:
string encoded_string = encode(strs);
and Machine 2 does:
vector<string> strs2 = decode(encoded_string);
`strs2` in Machine 2 should be the same as `strs` in Machine 1.

Implement the `encode` and `decode` methods.


Example 1:
Input: dummy_input = ["Hello","World"]
Output: ["Hello","World"]
Explanation:
Machine 1:
Codec encoder = new Codec();
String msg = encoder.encode(strs);
Machine 1 ---msg---> Machine 2
Machine 2:
Codec decoder = new Codec();
String[] strs = decoder.decode(msg);

Example 2:
Input: dummy_input = [""]
Output: [""]

Constraints:
`1 <= strs.length <= 200`
`0 <= strs[i].length <= 200`
`strs[i]` contains any possible characters out of `256` valid ASCII characters.

Follow up:
Could you write a generalized algorithm to work on any possible characters?
Could you solve the problem without using any serialize methods (such as `eval`)?', true, 'Medium', '/articles/encode-and-decode-strings', 33, 
   14.3, 'https://leetcode.com/problems/encode-and-decode-strings', 257, 68.3, 206.8, '["Microsoft"]'::jsonb, '["String"]'::jsonb, 
   567, 178, 76, false, '[]'::jsonb, true),
  (272, 'Closest Binary Search Tree Value II', 'Given the `root` of a binary search tree, a `target` value, and an integer `k`, return the `k` values in the BST that are closest to the `target`. You may return the answer in any order.

You are guaranteed to have only one unique set of `k` values in the BST that are closest to the `target`.


Example 1:
Input: root = [4,2,5,1,3], target = 3.714286, k = 2
Output: [4,3]

Example 2:
Input: root = [1], target = 0.000000, k = 1
Output: [1]

Constraints:
The number of nodes in the tree is `n`.

`1 <= k <= n <= 104`.

`0 <= Node.val <= 109`
`-109 <= target <= 109`
Follow up: Assume that the BST is balanced. Could you solve it in less than `O(n)` runtime (where `n = total nodes`)?', true, 'Hard', '/articles/closest-bst-value-ii', 52.6, 
   15.7, 'https://leetcode.com/problems/closest-binary-search-tree-value-ii', 380, 68.6, 130.3, '["LinkedIn,Oracle"]'::jsonb, '["Stack,Tree"]'::jsonb, 
   759, 21, 97, false, '[]'::jsonb, true),
  (273, 'Integer to English Words', 'Convert a non-negative integer `num` to its English words representation.


Example 1:
Input: num = 123
Output: "One Hundred Twenty Three"

Example 2:
Input: num = 12345
Output: "Twelve Thousand Three Hundred Forty Five"

Example 3:
Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"

Example 4:
Input: num = 1234567891
Output: "One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"

Constraints:
`0 <= num <= 231 - 1`', false, 'Hard', '/articles/integer-to-english-words', 28.3, 
   88.3, 'https://leetcode.com/problems/integer-to-english-words', 826, 229.9, 813, '["Facebook,Amazon,Microsoft,Palantir Technologies,Square,Adobe,Oracle"]'::jsonb, '["Math,String"]'::jsonb, 
   1438, 3588, 29, true, '[]'::jsonb, true),
  (274, 'H-Index', 'Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `ith` paper, return compute the researcher''s `h`-index.

According to the definition of h-index on Wikipedia: A scientist has an index `h` if `h` of their `n` papers have at least `h` citations each, and the other `n − h` papers have no more than `h` citations each.

If there are several possible values for `h`, the maximum one is taken as the `h`-index.


Example 1:
Input: citations = [3,0,6,1,5]
Output: 3
Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.

Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.


Example 2:
Input: citations = [1,3,1]
Output: 1

Constraints:
`n == citations.length`
`1 <= n <= 5000`
`0 <= citations[i] <= 1000`', false, 'Medium', '/articles/h-index', 36.4, 
   35.7, 'https://leetcode.com/problems/h-index', 797, 200.2, 549.6, '["Nvidia,Goldman Sachs"]'::jsonb, '["Hash Table,Sort"]'::jsonb, 
   887, 1472, 38, false, '[]'::jsonb, true),
  (275, 'H-Index II', 'Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `ith` paper and `citations` is sorted in an ascending order, return compute the researcher''s `h`-index.

According to the definition of h-index on Wikipedia: A scientist has an index `h` if `h` of their `n` papers have at least `h` citations each, and the other `n − h` papers have no more than `h` citations each.

If there are several possible values for `h`, the maximum one is taken as the `h`-index.


Example 1:
Input: citations = [0,1,3,5,6]
Output: 3
Explanation: [0,1,3,5,6] means the researcher has 5 papers in total and each of them had received 0, 1, 3, 5, 6 citations respectively.

Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.


Example 2:
Input: citations = [1,2,100]
Output: 2

Constraints:
`n == citations.length`
`1 <= n <= 105`
`0 <= citations[i] <= 1000`
`citations` is sorted in ascending order.

Follow up: Could you solve it in logarithmic time complexity?', false, 'Medium', '/articles/h-index-ii', 36.4, 
   12.4, 'https://leetcode.com/problems/h-index-ii', 415, 140.5, 386.4, '["Goldman Sachs"]'::jsonb, '["Binary Search"]'::jsonb, 
   541, 828, 40, false, '[]'::jsonb, true),
  (276, 'Paint Fence', 'You are painting a fence of `n` posts with `k` different colors. You must paint the posts following these rules:
Every post must be painted exactly one color.

At most one pair of adjacent fence posts can have the same color.

Given the two integers `n` and `k`, return the number of ways you can paint the fence.


Example 1:
Input: n = 3, k = 2
Output: 6
Explanation: All the possibilities are shown.

Note that painting all the posts red or all the posts green is invalid because there can only be at most one pair of adjacent posts that are the same color.


Example 2:
Input: n = 1, k = 1
Output: 1

Example 3:
Input: n = 7, k = 2
Output: 42

Constraints:
`1 <= n <= 50`
`1 <= k <= 105`
The answer is guaranteed to be in the range `[0, 231 - 1]` for the given `n` and `k`.', true, 'Medium', '/articles/paint-fence', 39.2, 
   25.8, 'https://leetcode.com/problems/paint-fence', 243, 65.1, 166, '["Google,JPMorgan"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   906, 312, 74, true, '[]'::jsonb, true),
  (277, 'Find the Celebrity', 'Suppose you are at a party with `n` people (labeled from `0` to `n - 1`), and among them, there may exist one celebrity. The definition of a celebrity is that all the other `n - 1` people know him/her, but he/she does not know any of them.

Now you want to find out who the celebrity is or verify that there is not one. The only thing you are allowed to do is to ask questions like: "Hi, A. Do you know B?" to get information about whether A knows B. You need to find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).

You are given a helper function `bool knows(a, b)` which tells you whether A knows B. Implement a function `int findCelebrity(n)`. There will be exactly one celebrity if he/she is in the party. Return the celebrity''s label if there is a celebrity in the party. If there is no celebrity, return `-1`.


Example 1:
Input: graph = [[1,1,0],[0,1,0],[1,1,1]]
Output: 1
Explanation: There are three persons labeled with 0, 1 and 2. graph[i][j] = 1 means person i knows person j, otherwise graph[i][j] = 0 means person i does not know person j. The celebrity is the person labeled as 1 because both 0 and 2 know him but 1 does not know anybody.


Example 2:
Input: graph = [[1,0,1],[1,1,0],[0,1,1]]
Output: -1
Explanation: There is no celebrity.


Constraints:
`n == graph.length`
`n == graph[i].length`
`2 <= n <= 100`
`graph[i][j]` is `0` or `1`.

`graph[i][i] == 1`
Follow up: If the maximum number of allowed calls to the API `knows` is `3 * n`, could you find a solution without exceeding the maximum number of calls?', true, 'Medium', '/articles/find-the-celebrity', 44, 
   43.1, 'https://leetcode.com/problems/find-the-celebrity', 293, 162.6, 369.4, '["Microsoft,Amazon,Facebook,LinkedIn,Apple,Snapchat"]'::jsonb, '["Array"]'::jsonb, 
   1557, 160, 91, true, '[]'::jsonb, true),
  (278, 'First Bad Version', 'You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API `bool isBadVersion(version)` which returns whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.


Example 1:
Input: n = 5, bad = 4
Output: 4
Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.


Example 2:
Input: n = 1, bad = 1
Output: 1

Constraints:
`1 <= bad <= n <= 231 - 1`', false, 'Easy', '/articles/first-bad-version', 37.8, 
   43.9, 'https://leetcode.com/problems/first-bad-version', 999, 552.3, 1.5, '["Facebook"]'::jsonb, '["Binary Search"]'::jsonb, 
   2109, 821, 72, true, '[]'::jsonb, true),
  (279, 'Perfect Squares', 'Given an integer `n`, return the least number of perfect square numbers that sum to `n`.

A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, `1`, `4`, `9`, and `16` are perfect squares while `3` and `11` are not.


Example 1:
Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.


Example 2:
Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.


Constraints:
`1 <= n <= 104`', false, 'Medium', '/articles/perfect-squares', 49.2, 
   45.5, 'https://leetcode.com/problems/perfect-squares', 999, 388.5, 790, '["Amazon,Google,Adobe"]'::jsonb, '["Math,Dynamic Programming,Breadth-first Search"]'::jsonb, 
   4208, 231, 95, true, '[]'::jsonb, true),
  (280, 'Wiggle Sort', 'Given an integer array `nums`, reorder it such that `nums[0] <= nums[1] >= nums[2] <= nums[3]...`.

You may assume the input array always has a valid answer.


Example 1:
Input: nums = [3,5,2,1,6,4]
Output: [3,5,1,6,2,4]
Explanation: [1,6,2,5,3,4] is also accepted.


Example 2:
Input: nums = [6,6,5,6,3,8]
Output: [6,6,5,6,3,8]

Constraints:
`1 <= nums.length <= 5 * 104`
`0 <= nums[i] <= 104`
It is guaranteed that there will be an answer for the given input `nums`.

Follow up: Could you do it without sorting the array?', true, 'Medium', '/articles/wiggle-sort', 64.8, 
   21.8, 'https://leetcode.com/problems/wiggle-sort', 275, 98.9, 152.6, '["Facebook"]'::jsonb, '["Array,Sort"]'::jsonb, 
   731, 69, 91, true, '[]'::jsonb, true),
  (281, 'Zigzag Iterator', 'Given two vectors of integers `v1` and `v2`, implement an iterator to return their elements alternately.

Implement the `ZigzagIterator` class:
`ZigzagIterator(List<int> v1, List<int> v2)` initializes the object with the two vectors `v1` and `v2`.

`boolean hasNext()` returns `true` if the iterator still has elements, and `false` otherwise.

`int next()` returns the current element of the iterator and moves the iterator to the next element.


Example 1:
Input: v1 = [1,2], v2 = [3,4,5,6]
Output: [1,3,2,4,5,6]
Explanation: By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,3,2,4,5,6].


Example 2:
Input: v1 = [1], v2 = []
Output: [1]

Example 3:
Input: v1 = [], v2 = [1]
Output: [1]

Constraints:
`0 <= v1.length, v2.length <= 1000`
`1 <= v1.length + v2.length <= 2000`
`-231 <= v1[i], v2[i] <= 231 - 1`
Follow up: What if you are given `k` vectors? How well can your code be extended to such cases?
Clarification for the follow-up question:
The "Zigzag" order is not clearly defined and is ambiguous for `k > 2` cases. If "Zigzag" does not look right to you, replace "Zigzag" with "Cyclic".


Example:
Input: v1 = [1,2,3], v2 = [4,5,6,7], v3 = [8,9]
Output: [1,4,8,2,5,9,3,6,7]', true, 'Medium', '/articles/zigzag-iterator', 59.6, 
   19.4, 'https://leetcode.com/problems/zigzag-iterator', 361, 70.4, 118.1, '["Yandex"]'::jsonb, '["Design"]'::jsonb, 
   448, 22, 95, false, '[]'::jsonb, true),
  (282, 'Expression Add Operators', 'Given a string `num` that contains only digits and an integer `target`, return all possibilities to add the binary operators `''+''`, `''-''`, or `''*''` between the digits of `num` so that the resultant expression evaluates to the `target` value.


Example 1:
Input: num = "123", target = 6
Output: ["1*2*3","1+2+3"]

Example 2:
Input: num = "232", target = 8
Output: ["2*3+2","2+3*2"]

Example 3:
Input: num = "105", target = 5
Output: ["1*0+5","10-5"]

Example 4:
Input: num = "00", target = 0
Output: ["0*0","0+0","0-0"]

Example 5:
Input: num = "3456237490", target = 9191
Output: []

Constraints:
`1 <= num.length <= 10`
`num` consists of only digits.

`-231 <= target <= 231 - 1`', false, 'Hard', '/articles/expression-add-operators', 36.9, 
   37.5, 'https://leetcode.com/problems/expression-add-operators', 311, 129.2, 350, '["Facebook,Citadel"]'::jsonb, '["Divide and Conquer"]'::jsonb, 
   1622, 272, 86, true, '[]'::jsonb, true),
  (283, 'Move Zeroes', 'Given an integer array `nums`, move all `0`''s to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.


Example 1:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Example 2:
Input: nums = [0]
Output: [0]

Constraints:
`1 <= nums.length <= 104`
`-231 <= nums[i] <= 231 - 1`
Follow up: Could you minimize the total number of operations done?', false, 'Easy', '/articles/move-zeroes', 58.7, 
   64.7, 'https://leetcode.com/problems/move-zeroes', 999, 1.1, 1.9, '["Facebook,Bloomberg,Microsoft,Adobe,Capital One,Apple,Amazon,Google,eBay,SAP,Uber,Paypal,Cisco,Qualcomm,Yandex"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   5320, 167, 97, true, '[]'::jsonb, true),
  (284, 'Peeking Iterator', 'Design an iterator that supports the `peek` operation on a list in addition to the `hasNext` and the `next` operations.

Implement the `PeekingIterator` class:
`PeekingIterator(int[] nums)` Initializes the object with the given integer array `nums`.

`int next()` Returns the next element in the array and moves the pointer to the next element.

`bool hasNext()` Returns `true` if there are still elements in the array.

`int peek()` Returns the next element in the array without moving the pointer.


Example 1:
Input
["PeekingIterator", "next", "peek", "next", "next", "hasNext"]
[[[1, 2, 3]], [], [], [], [], []]
Output
[null, 1, 2, 2, 3, false]
Explanation
PeekingIterator peekingIterator = new PeekingIterator([1, 2, 3]); // [1,2,3]
peekingIterator.next();    // return 1, the pointer moves to the next element [1,2,3].

peekingIterator.peek();    // return 2, the pointer does not move [1,2,3].

peekingIterator.next();    // return 2, the pointer moves to the next element [1,2,3]
peekingIterator.next();    // return 3, the pointer moves to the next element [1,2,3]
peekingIterator.hasNext(); // return False

Constraints:
`1 <= nums.length <= 1000`
`1 <= nums[i] <= 1000`
All the calls to `next` and `peek` are valid.

At most `1000` calls will be made to `next`, `hasNext`, and `peek`.

Follow up: How would you extend your design to be generic and work with all types, not just integer?', false, 'Medium', '/articles/peeking-iterator', 50.9, 
   33, 'https://leetcode.com/problems/peeking-iterator', 412, 133.9, 263.1, '["Apple,Google,Amazon"]'::jsonb, '["Design"]'::jsonb, 
   766, 542, 59, true, '[]'::jsonb, true),
  (285, 'Inorder Successor in BST', 'Given the `root` of a binary search tree and a node `p` in it, return the in-order successor of that node in the BST. If the given node has no in-order successor in the tree, return `null`.

The successor of a node `p` is the node with the smallest key greater than `p.val`.


Example 1:
Input: root = [2,1,3], p = 1
Output: 2
Explanation: 1''s in-order successor node is 2. Note that both p and the return value is of TreeNode type.


Example 2:
Input: root = [5,3,6,2,4,null,null,1], p = 6
Output: null
Explanation: There is no in-order successor of the current node, so the answer is `null`.


Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`-105 <= Node.val <= 105`
All Nodes will have unique values.', true, 'Medium', '/articles/inorder-successor-in-bst', 43.3, 
   20.1, 'https://leetcode.com/problems/inorder-successor-in-bst', 522, 194.2, 448.7, '["Amazon,Microsoft"]'::jsonb, '["Tree"]'::jsonb, 
   1493, 71, 95, true, '[]'::jsonb, true),
  (286, 'Walls and Gates', 'You are given an `m x n` grid `rooms` initialized with these three possible values.

`-1` A wall or an obstacle.

`0` A gate.

`INF` Infinity means an empty room. We use the value `231 - 1 = 2147483647` to represent `INF` as you may assume that the distance to a gate is less than `2147483647`.

Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with `INF`.


Example 1:
Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]

Example 2:
Input: rooms = [[-1]]
Output: [[-1]]

Example 3:
Input: rooms = [[2147483647]]
Output: [[2147483647]]

Example 4:
Input: rooms = [[0]]
Output: [[0]]

Constraints:
`m == rooms.length`
`n == rooms[i].length`
`1 <= m, n <= 250`
`rooms[i][j]` is `-1`, `0`, or `231 - 1`.', true, 'Medium', '/articles/walls-and-gates', 56.9, 
   50.6, 'https://leetcode.com/problems/walls-and-gates', 454, 156.7, 275.2, '["ByteDance,Facebook,Amazon,Microsoft"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   1586, 24, 99, true, '[]'::jsonb, true),
  (287, 'Find the Duplicate Number', 'Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.

There is only one repeated number in `nums`, return this repeated number.


Example 1:
Input: nums = [1,3,4,2,2]
Output: 2

Example 2:
Input: nums = [3,1,3,4,2]
Output: 3

Example 3:
Input: nums = [1,1]
Output: 1

Example 4:
Input: nums = [1,1,2]
Output: 1

Constraints:
`2 <= n <= 3 * 104`
`nums.length == n + 1`
`1 <= nums[i] <= n`
All the integers in `nums` appear only once except for precisely one integer which appears two or more times.

Follow up:
How can we prove that at least one duplicate number must exist in `nums`?
Can you solve the problem without modifying the array `nums`?
Can you solve the problem using only constant, `O(1)` extra space?
Can you solve the problem with runtime complexity less than `O(n2)`?', false, 'Medium', '/articles/find-the-duplicate-number', 57.9, 
   66, 'https://leetcode.com/problems/find-the-duplicate-number', 999, 495.2, 855.4, '["Microsoft,Amazon,Apple,Google,Bloomberg,Paypal,Goldman Sachs"]'::jsonb, '["Array,Two Pointers,Binary Search"]'::jsonb, 
   7163, 759, 90, true, '[]'::jsonb, true),
  (288, 'Unique Word Abbreviation', 'The abbreviation of a word is a concatenation of its first letter, the number of characters between the first and last letter, and its last letter. If a word has only two characters, then it is an abbreviation of itself.

For example:
`dog --> d1g` because there is one letter between the first letter `''d''` and the last letter `''g''`.

`internationalization --> i18n` because there are 18 letters between the first letter `''i''` and the last letter `''n''`.

`it --> it` because any word with only two characters is an abbreviation of itself.

Implement the `ValidWordAbbr` class:
`ValidWordAbbr(String[] dictionary)` Initializes the object with a `dictionary` of words.

`boolean isUnique(string word)` Returns `true` if either of the following conditions are met (otherwise returns `false`):
	
There is no word in `dictionary` whose abbreviation is equal to `word`''s abbreviation.

For any word in `dictionary` whose abbreviation is equal to `word`''s abbreviation, that word and `word` are the same.


Example 1:
Input
["ValidWordAbbr", "isUnique", "isUnique", "isUnique", "isUnique"]
[[["deer", "door", "cake", "card"]], ["dear"], ["cart"], ["cane"], ["make"]]
Output
[null, false, true, false, true]
Explanation
ValidWordAbbr validWordAbbr = new ValidWordAbbr(["deer", "door", "cake", "card"]);
validWordAbbr.isUnique("dear"); // return false, dictionary word "deer" and word "dear" have the same abbreviation
                                // "d2r" but are not the same.

validWordAbbr.isUnique("cart"); // return true, no words in the dictionary have the abbreviation "c2t".

validWordAbbr.isUnique("cane"); // return false, dictionary word "cake" and word "cane" have the same abbreviation 
                                // "c2e" but are not the same.

validWordAbbr.isUnique("make"); // return true, no words in the dictionary have the abbreviation "m2e".

validWordAbbr.isUnique("cake"); // return true, because "cake" is already in the dictionary and no other word in the dictionary has "c2e" abbreviation.


Constraints:
`1 <= dictionary.length <= 3 * 104`
`1 <= dictionary[i].length <= 20`
`dictionary[i]` consists of lowercase English letters.

`1 <= word.length <= 20`
`word` consists of lowercase English letters.

At most `5000` calls will be made to `isUnique`.', true, 'Medium', '/articles/unique-word-abbreviation', 23.2, 
   14.4, 'https://leetcode.com/problems/unique-word-abbreviation', 179, 57.1, 245.9, '["Facebook"]'::jsonb, '["Hash Table,Design"]'::jsonb, 
   136, 1482, 8, true, '[]'::jsonb, true),
  (289, 'Game of Life', 'According to Wikipedia''s article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."
The board is made up of an `m x n` grid of cells, where each cell has an initial state: live (represented by a `1`) or dead (represented by a `0`). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):
Any live cell with fewer than two live neighbors dies as if caused by under-population.

Any live cell with two or three live neighbors lives on to the next generation.

Any live cell with more than three live neighbors dies, as if by over-population.

Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously. Given the current state of the `m x n` grid `board`, return the next state.


Example 1:
Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]

Example 2:
Input: board = [[1,1],[1,0]]
Output: [[1,1],[1,1]]

Constraints:
`m == board.length`
`n == board[i].length`
`1 <= m, n <= 25`
`board[i][j]` is `0` or `1`.

Follow up:
Could you solve it in-place? Remember that the board needs to be updated simultaneously: You cannot update some cells first and then use their updated values to update other cells.

In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches upon the border of the array (i.e., live cells reach the border). How would you address these problems?', false, 'Medium', '/articles/game-of-life', 58.8, 
   70.8, 'https://leetcode.com/problems/game-of-life', 999, 233.2, 396.9, '["Dropbox,Amazon,Reddit,Opendoor,Microsoft,Square"]'::jsonb, '["Array"]'::jsonb, 
   2582, 335, 89, true, '[]'::jsonb, true),
  (290, 'Word Pattern', 'Given a `pattern` and a string `s`, find if `s` follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in `pattern` and a non-empty word in `s`.


Example 1:
Input: pattern = "abba", s = "dog cat cat dog"
Output: true

Example 2:
Input: pattern = "abba", s = "dog cat cat fish"
Output: false

Example 3:
Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false

Example 4:
Input: pattern = "abba", s = "dog dog dog dog"
Output: false

Constraints:
`1 <= pattern.length <= 300`
`pattern` contains only lower-case English letters.

`1 <= s.length <= 3000`
`s` contains only lower-case English letters and spaces `'' ''`.

`s` does not contain any leading or trailing spaces.

All the words in `s` are separated by a single space.', false, 'Easy', '/articles/word-pattern', 38.4, 
   13.1, 'https://leetcode.com/problems/word-pattern', 999, 251.3, 653.8, '["Apple"]'::jsonb, '["Hash Table"]'::jsonb, 
   1802, 215, 89, true, '[]'::jsonb, true),
  (291, 'Word Pattern II', 'Given a `pattern` and a string `s`, return `true` if `s` matches the `pattern`.

A string `s` matches a `pattern` if there is some bijective mapping of single characters to strings such that if each character in `pattern` is replaced by the string it maps to, then the resulting string is `s`. A bijective mapping means that no two characters map to the same string, and no character maps to two different strings.


Example 1:
Input: pattern = "abab", s = "redblueredblue"
Output: true
Explanation: One possible mapping is as follows:
''a'' -> "red"
''b'' -> "blue"

Example 2:
Input: pattern = "aaaa", s = "asdasdasdasd"
Output: true
Explanation: One possible mapping is as follows:
''a'' -> "asd"

Example 3:
Input: pattern = "abab", s = "asdasdasdasd"
Output: true
Explanation: One possible mapping is as follows:
''a'' -> "a"
''b'' -> "sdasd"
Note that ''a'' and ''b'' cannot both map to "asd" since the mapping is a bijection.


Example 4:
Input: pattern = "aabb", s = "xyzabcxzyabc"
Output: false

Constraints:
`1 <= pattern.length, s.length <= 20`
`pattern` and `s` consist of only lower-case English letters.', true, 'Medium', NULL, 44.4, 
   11.7, 'https://leetcode.com/problems/word-pattern-ii', 209, 49.4, 111.3, '["Amazon"]'::jsonb, '["Backtracking"]'::jsonb, 
   524, 36, 94, true, '[]'::jsonb, true),
  (292, 'Nim Game', 'You are playing the following Nim Game with your friend:
Initially, there is a heap of stones on the table.

You and your friend will alternate taking turns, and you go first.

On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.

The one who removes the last stone is the winner.

Given `n`, the number of stones in the heap, return `true` if you can win the game assuming both you and your friend play optimally, otherwise return `false`.


Example 1:
Input: n = 4
Output: false
Explanation: These are the possible outcomes:
1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins.

2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins.

3. You remove 3 stones. Your friend removes the last stone. Your friend wins.

In all outcomes, your friend wins.


Example 2:
Input: n = 1
Output: true

Example 3:
Input: n = 2
Output: true

Constraints:
`1 <= n <= 231 - 1`', false, 'Easy', '/articles/nim-game', 55.1, 
   5.4, 'https://leetcode.com/problems/nim-game', 415, 243.1, 440.9, '["Bloomberg"]'::jsonb, '["Brainteaser,Minimax"]'::jsonb, 
   763, 1849, 29, false, '[]'::jsonb, true),
  (293, 'Flip Game', 'You are playing a Flip Game with your friend.

You are given a string `currentState` that contains only `''+''` and `''-''`. You and your friend take turns to flip two consecutive `"++"` into `"--"`. The game ends when a person can no longer make a move, and therefore the other person will be the winner.

Return all possible states of the string `currentState` after one valid move. You may return the answer in any order. If there is no valid move, return an empty list `[]`.


Example 1:
Input: currentState = "++++"
Output: ["--++","+--+","++--"]

Example 2:
Input: currentState = "+"
Output: []

Constraints:
`1 <= currentState.length <= 500`
`currentState[i]` is either `''+''` or `''-''`.', true, 'Easy', NULL, 61.5, 
   3.2, 'https://leetcode.com/problems/flip-game', 161, 53.3, 86.7, '["Google"]'::jsonb, '["String"]'::jsonb, 
   128, 319, 29, true, '[]'::jsonb, true),
  (294, 'Flip Game II', 'You are playing a Flip Game with your friend.

You are given a string `currentState` that contains only `''+''` and `''-''`. You and your friend take turns to flip two consecutive `"++"` into `"--"`. The game ends when a person can no longer make a move, and therefore the other person will be the winner.

Return `true` if the starting player can guarantee a win, and `false` otherwise.


Example 1:
Input: currentState = "++++"
Output: true
Explanation: The starting player can guarantee a win by flipping the middle "++" to become "+--+".


Example 2:
Input: currentState = "+"
Output: false

Constraints:
`1 <= currentState.length <= 60`
`currentState[i]` is either `''+''` or `''-''`.

Follow up: Derive your algorithm''s runtime complexity.', true, 'Medium', NULL, 50.8, 
   0, 'https://leetcode.com/problems/flip-game-ii', 164, 57.4, 113.2, '["Google"]'::jsonb, '["Backtracking,Minimax"]'::jsonb, 
   454, 38, 92, true, '[]'::jsonb, true),
  (295, 'Find Median from Data Stream', 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.

For example, for `arr = [2,3,4]`, the median is `3`.

For example, for `arr = [2,3]`, the median is `(2 + 3) / 2 = 2.5`.

Implement the MedianFinder class:
`MedianFinder()` initializes the `MedianFinder` object.

`void addNum(int num)` adds the integer `num` from the data stream to the data structure.

`double findMedian()` returns the median of all elements so far. Answers within `10-5` of the actual answer will be accepted.


Example 1:
Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]
Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0

Constraints:
`-105 <= num <= 105`
There will be at least one element in the data structure before calling `findMedian`.

At most `5 * 104` calls will be made to `addNum` and `findMedian`.

Follow up:
If all integer numbers from the stream are in the range `[0, 100]`, how would you optimize your solution?
If `99%` of all integer numbers from the stream are in the range `[0, 100]`, how would you optimize your solution?', false, 'Hard', '/articles/find-median-from-data-stream', 47.4, 
   87.3, 'https://leetcode.com/problems/find-median-from-data-stream', 881, 288, 607.7, '["Amazon,Facebook,Microsoft,ByteDance,Google,Apple,eBay,Bloomberg,Salesforce,Goldman Sachs,Nvidia,Uber,Walmart Labs,VMware,Adobe,Twilio"]'::jsonb, '["Heap,Design"]'::jsonb, 
   3979, 74, 98, true, '[]'::jsonb, true),
  (296, 'Best Meeting Point', 'Given an `m x n` binary grid `grid` where each `1` marks the home of one friend, return the minimal total travel distance.

The total travel distance is the sum of the distances between the houses of the friends and the meeting point.

The distance is calculated using Manhattan Distance, where `distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|`.


Example 1:
Input: grid = [[1,0,0,0,1],[0,0,0,0,0],[0,0,1,0,0]]
Output: 6
Explanation: Given three friends living at (0,0), (0,4), and (2,2).

The point (0,2) is an ideal meeting point, as the total travel distance of 2 + 2 + 2 = 6 is minimal.

So return 6.


Example 2:
Input: grid = [[1,1]]
Output: 1

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 200`
`grid[i][j]` is either `0` or `1`.

There will be at least two friends in the `grid`.', true, 'Hard', '/articles/best-meeting-point', 58.2, 
   19.8, 'https://leetcode.com/problems/best-meeting-point', 164, 42.5, 73, '["Google,Amazon,Bloomberg,Microsoft"]'::jsonb, '["Math,Sort"]'::jsonb, 
   597, 49, 92, true, '[]'::jsonb, true),
  (297, 'Serialize and Deserialize Binary Tree', 'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.


Example 1:
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Example 4:
Input: root = [1,2]
Output: [1,2]

Constraints:
The number of nodes in the tree is in the range `[0, 104]`.

`-1000 <= Node.val <= 1000`', false, 'Hard', '/articles/serialize-and-deserialize-binary-tree', 50.2, 
   74.4, 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree', 999, 430.9, 858.6, '["Facebook,Microsoft,Amazon,LinkedIn,Uber,Bloomberg,eBay,Quora,Qualtrics,Google,Oracle,Citadel,Walmart Labs"]'::jsonb, '["Tree,Design"]'::jsonb, 
   4145, 191, 96, true, '[]'::jsonb, true),
  (298, 'Binary Tree Longest Consecutive Sequence', 'Given the `root` of a binary tree, return the length of the longest consecutive sequence path.

The path refers to any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The longest consecutive path needs to be from parent to child (cannot be the reverse).


Example 1:
Input: root = [1,null,3,2,4,null,null,null,5]
Output: 3
Explanation: Longest consecutive sequence path is 3-4-5, so return 3.


Example 2:
Input: root = [2,null,3,2,null,1]
Output: 2
Explanation: Longest consecutive sequence path is 2-3, not 3-2-1, so return 2.


Constraints:
The number of nodes in the tree is in the range `[1, 3 * 104]`.

`-3 * 104 <= Node.val <= 3 * 104`', true, 'Medium', '/articles/binary-tree-longest-consecutive-sequence', 48.2, 
   16.3, 'https://leetcode.com/problems/binary-tree-longest-consecutive-sequence', 371, 94.5, 196.2, '["Google"]'::jsonb, '["Tree"]'::jsonb, 
   633, 155, 80, true, '[]'::jsonb, true),
  (299, 'Bulls and Cows', 'You are playing the Bulls and Cows game with your friend.

You write down a secret number and ask your friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:
The number of "bulls", which are digits in the guess that are in the correct position.

The number of "cows", which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.

Given the secret number `secret` and your friend''s guess `guess`, return the hint for your friend''s guess.

The hint should be formatted as `"xAyB"`, where `x` is the number of bulls and `y` is the number of cows. Note that both `secret` and `guess` may contain duplicate digits.


Example 1:
Input: secret = "1807", guess = "7810"
Output: "1A3B"
Explanation: Bulls are connected with a ''|'' and cows are underlined:
"1807"
  |
"7810"

Example 2:
Input: secret = "1123", guess = "0111"
Output: "1A1B"
Explanation: Bulls are connected with a ''|'' and cows are underlined:
"1123"        "1123"
  |      or     |
"0111"        "0111"
Note that only one of the two unmatched 1s is counted as a cow since the non-bull digits can only be rearranged to allow one 1 to be a bull.


Example 3:
Input: secret = "1", guess = "0"
Output: "0A0B"

Example 4:
Input: secret = "1", guess = "1"
Output: "1A0B"

Constraints:
`1 <= secret.length, guess.length <= 1000`
`secret.length == guess.length`
`secret` and `guess` consist of digits only.', false, 'Medium', '/articles/bulls-and-cows', 44.7, 
   31.5, 'https://leetcode.com/problems/bulls-and-cows', 942, 209.6, 469, '["Google,ByteDance,eBay"]'::jsonb, '["Hash Table"]'::jsonb, 
   934, 1039, 47, true, '[]'::jsonb, true),
  (300, 'Longest Increasing Subsequence', 'Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, `[3,6,2,7]` is a subsequence of the array `[0,3,1,6,2,2,7]`.


Example 1:
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.


Example 2:
Input: nums = [0,1,0,3,2,3]
Output: 4

Example 3:
Input: nums = [7,7,7,7,7,7,7]
Output: 1

Constraints:
`1 <= nums.length <= 2500`
`-104 <= nums[i] <= 104`
Follow up:
Could you come up with the `O(n2)` solution?
Could you improve it to `O(n log(n))` time complexity?', false, 'Medium', '/articles/longest-increasing-subsequence', 44.5, 
   55.2, 'https://leetcode.com/problems/longest-increasing-subsequence', 999, 524.6, 1.2, '["Apple,Amazon,Facebook,Bloomberg,Citrix,Google,ByteDance,Twitter,Microsoft,Nagarro"]'::jsonb, '["Binary Search,Dynamic Programming"]'::jsonb, 
   6891, 155, 98, true, '[]'::jsonb, true),
  (301, 'Remove Invalid Parentheses', 'Given a string `s` that contains parentheses and letters, remove the minimum number of invalid parentheses to make the input string valid.

Return all the possible results. You may return the answer in any order.


Example 1:
Input: s = "()())()"
Output: ["(())()","()()()"]

Example 2:
Input: s = "(a)())()"
Output: ["(a())()","(a)()()"]

Example 3:
Input: s = ")("
Output: [""]

Constraints:
`1 <= s.length <= 25`
`s` consists of lowercase English letters and parentheses `''(''` and `'')''`.

There will be at most `20` parentheses in `s`.', false, 'Hard', '/articles/remove-invalid-parentheses', 44.8, 
   63.4, 'https://leetcode.com/problems/remove-invalid-parentheses', 541, 260.4, 580.8, '["Facebook,Bloomberg,ByteDance,Amazon,Qualtrics"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   3281, 152, 96, true, '[]'::jsonb, true),
  (302, 'Smallest Rectangle Enclosing Black Pixels', 'You are given an `image` that is represented by a binary matrix with `0` as a white pixel and `1` as a black pixel.

The black pixels are connected (i.e., there is only one black region). Pixels are connected horizontally and vertically.

Given two integers `x` and `y` that represent the location of one of the black pixels, return the area of the smallest (axis-aligned) rectangle that encloses all black pixels.


Example 1:
Input: image = [["0","0","1","0"],["0","1","1","0"],["0","1","0","0"]], x = 0, y = 2
Output: 6

Example 2:
Input: image = [["1"]], x = 0, y = 0
Output: 1

Constraints:
`m == image.length`
`n == image[i].length`
`1 <= m, n <= 100`
`image[i][j]` is either `''0''` or `''1''`.

`1 <= x < m`
`1 <= y < n`
`image[x][y] == ''1''.`
The black pixels in the `image` only form one component.', true, 'Hard', '/articles/smallest-rectangle-enclosing-black-pixels', 52.6, 
   4.4, 'https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels', 113, 30.3, 57.5, '["Google"]'::jsonb, '["Binary Search"]'::jsonb, 
   244, 59, 81, true, '[]'::jsonb, true),
  (303, 'Range Sum Query - Immutable', 'Given an integer array `nums`, find the sum of the elements between indices `left` and `right` inclusive, where `(left <= right)`.

Implement the `NumArray` class:
`NumArray(int[] nums)` initializes the object with the integer array `nums`.

`int sumRange(int left, int right)` returns the sum of the elements of the `nums` array in the range `[left, right]` inclusive (i.e., `sum(nums[left], nums[left + 1], ... , nums[right])`).


Example 1:
Input
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output
[null, 1, -1, -3]
Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))

Constraints:
`1 <= nums.length <= 104`
`-105 <= nums[i] <= 105`
`0 <= left <= right < nums.length`
At most `104` calls will be made to `sumRange`.', false, 'Easy', '/articles/range-sum-query-immutable', 48.2, 
   4.8, 'https://leetcode.com/problems/range-sum-query-immutable', 668, 249.6, 517.9, '["Facebook"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1241, 1330, 48, true, '[]'::jsonb, true),
  (304, 'Range Sum Query 2D - Immutable', 'Given a 2D matrix `matrix`, find the sum of the elements inside the rectangle defined by its upper left corner `(row1, col1)` and lower right corner `(row2, col2)`.

Implement the NumMatrix class:
`NumMatrix(int[][] matrix)` initializes the object with the integer matrix `matrix`.

`int sumRegion(int row1, int col1, int row2, int col2)` returns the sum of the elements of the `matrix` array inside the rectangle defined by its upper left corner `(row1, col1)` and lower right corner `(row2, col2)`.


Example 1:
Input
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output
[null, 8, 11, 12]
Explanation
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangele).

numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangele).

numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangele).


Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 200`
`-105 <= matrix[i][j] <= 105`
`0 <= row1 <= row2 < m`
`0 <= col1 <= col2 < n`
At most `104` calls will be made to `sumRegion`.', false, 'Medium', '/articles/range-sum-query-2d-immutable', 41.1, 
   41, 'https://leetcode.com/problems/range-sum-query-2d-immutable', 500, 148.7, 362.1, '["Facebook,Google,Lyft,Microsoft,Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1462, 209, 87, true, '[]'::jsonb, true),
  (305, 'Number of Islands II', 'You are given an empty 2D binary grid `grid` of size `m x n`. The grid represents a map where `0`''s represent water and `1`''s represent land. Initially, all the cells of `grid` are water cells (i.e., all the cells are `0`''s).

We may perform an add land operation which turns the water at position into a land. You are given an array `positions` where `positions[i] = [ri, ci]` is the position `(ri, ci)` at which we should operate the `ith` operation.

Return an array of integers `answer` where `answer[i]` is the number of islands after turning the cell `(ri, ci)` into a land.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.


Example 1:
Input: m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
Output: [1,1,2,3]
Explanation:
Initially, the 2d grid is filled with water.

- Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land. We have 1 island.

- Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land. We still have 1 island.

- Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land. We have 2 islands.

- Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land. We have 3 islands.


Example 2:
Input: m = 1, n = 1, positions = [[0,0]]
Output: [1]

Constraints:
`1 <= m, n, positions.length <= 104`
`1 <= m * n <= 104`
`positions[i].length == 2`
`0 <= ri < m`
`0 <= ci < n`
Follow up: Could you solve it in time complexity `O(k log(mn))`, where `k == positions.length`?', true, 'Hard', '/articles/number-of-islands-ii', 39.6, 
   14.2, 'https://leetcode.com/problems/number-of-islands-ii', 359, 88.4, 223.3, '["Amazon"]'::jsonb, '["Union Find"]'::jsonb, 
   1007, 28, 97, true, '[]'::jsonb, true),
  (306, 'Additive Number', 'Additive number is a string whose digits can form additive sequence.

A valid additive sequence should contain at least three numbers. Except for the first two numbers, each subsequent number in the sequence must be the sum of the preceding two.

Given a string containing only digits `''0''-''9''`, write a function to determine if it''s an additive number.

Note: Numbers in the additive sequence cannot have leading zeros, so sequence `1, 2, 03` or `1, 02, 3` is invalid.


Example 1:
Input: "112358"
Output: true
Explanation: The digits can form an additive sequence: 1, 1, 2, 3, 5, 8. 
             1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8

Example 2:
Input: "199100199"
Output: true
Explanation: The additive sequence is: 1, 99, 100, 199. 
             1 + 99 = 100, 99 + 100 = 199

Constraints:
`num` consists only of digits `''0''-''9''`.

`1 <= num.length <= 35`
Follow up:
How would you handle overflow for very large input integers?', false, 'Medium', NULL, 29.7, 
   38, 'https://leetcode.com/problems/additive-number', 390, 59, 198.6, '["Epic Systems,Google"]'::jsonb, '["Backtracking"]'::jsonb, 
   516, 508, 50, true, '[]'::jsonb, true),
  (307, 'Range Sum Query - Mutable', 'Given an array `nums` and two types of queries where you should update the value of an index in the array, and retrieve the sum of a range in the array.

Implement the `NumArray` class:
`NumArray(int[] nums)` initializes the object with the integer array `nums`.

`void update(int index, int val)` updates the value of `nums[index]` to be `val`.

`int sumRange(int left, int right)` returns the sum of the subarray `nums[left, right]` (i.e., `nums[left] + nums[left + 1], ..., nums[right]`).


Example 1:
Input
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output
[null, 9, null, 8]
Explanation
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 9 = sum([1,3,5])
numArray.update(1, 2);   // nums = [1,2,5]
numArray.sumRange(0, 2); // return 8 = sum([1,2,5])

Constraints:
`1 <= nums.length <= 3 * 104`
`-100 <= nums[i] <= 100`
`0 <= index < nums.length`
`-100 <= val <= 100`
`0 <= left <= right < nums.length`
At most `3 * 104` calls will be made to `update` and `sumRange`.', false, 'Medium', '/articles/range-sum-query-mutable', 36.9, 
   14.8, 'https://leetcode.com/problems/range-sum-query-mutable', 543, 133.6, 361.4, '["Facebook"]'::jsonb, '["Binary Indexed Tree,Segment Tree"]'::jsonb, 
   1761, 105, 94, true, '[]'::jsonb, true),
  (308, 'Range Sum Query 2D - Mutable', 'Given a 2D matrix `matrix`, find the sum of the elements inside the rectangle defined by its upper left corner `(row1, col1)` and lower right corner `(row2, col2)`.

Implement the NumMatrix class:
`NumMatrix(int[][] matrix)` initializes the object with the integer matrix `matrix`.

`void update(int row, int col, int val)` updates the value of `matrix[row][col]` to be `val`.

`int sumRegion(int row1, int col1, int row2, int col2)` returns the sum of the elements of the `matrix` array inside the rectangle defined by its upper left corner `(row1, col1)` and lower right corner `(row2, col2)`.


Example 1:
Input
["NumMatrix", "sumRegion", "update", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [3, 2, 2], [2, 1, 4, 3]]
Output
[null, 8, null, 10]
Explanation
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8
numMatrix.update(3, 2, 2);
numMatrix.sumRegion(2, 1, 4, 3); // return 10

Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 200`
`-105 <= matrix[i][j] <= 105`
`0 <= row < m`
`0 <= col < n`
`-105 <= val <= 105`
`0 <= row1 <= row2 < m`
`0 <= col1 <= col2 < n`
At most `104` calls will be made to `sumRegion` and `update`.', true, 'Hard', '/articles/range-sum-query-2d-mutable', 38.1, 
   11.6, 'https://leetcode.com/problems/range-sum-query-2d-mutable', 252, 55.7, 146.1, '["Google"]'::jsonb, '["Binary Indexed Tree,Segment Tree"]'::jsonb, 
   501, 66, 88, true, '[]'::jsonb, true),
  (309, 'Best Time to Buy and Sell Stock with Cooldown', 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:
After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


Example 1:
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]

Example 2:
Input: prices = [1]
Output: 0

Constraints:
`1 <= prices.length <= 5000`
`0 <= prices[i] <= 1000`', false, 'Medium', '/articles/best-time-to-buy-and-sell-stock-with-cooldown', 48.3, 
   49.1, 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown', 707, 189.6, 392.2, '["Amazon,Yahoo"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   3551, 113, 97, true, '[]'::jsonb, true),
  (310, 'Minimum Height Trees', 'A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of `n` nodes labelled from `0` to `n - 1`, and an array of `n - 1` `edges` where `edges[i] = [ai, bi]` indicates that there is an undirected edge between the two nodes `ai` and `bi` in the tree, you can choose any node of the tree as the root. When you select a node `x` as the root, the result tree has height `h`. Among all possible rooted trees, those with minimum height (i.e. `min(h)`)  are called minimum height trees (MHTs).

Return a list of all MHTs'' root labels. You can return the answer in any order.

The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.


Example 1:
Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.


Example 2:
Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Output: [3,4]

Example 3:
Input: n = 1, edges = []
Output: [0]

Example 4:
Input: n = 2, edges = [[0,1]]
Output: [0,1]

Constraints:
`1 <= n <= 2 * 104`
`edges.length == n - 1`
`0 <= ai, bi < n`
`ai != bi`
All the pairs `(ai, bi)` are distinct.

The given input is guaranteed to be a tree and there will be no repeated edges.', false, 'Medium', '/articles/minimum-height-trees', 34.9, 
   14.5, 'https://leetcode.com/problems/minimum-height-trees', 490, 132.8, 381, '["Facebook"]'::jsonb, '["Breadth-first Search,Graph"]'::jsonb, 
   3014, 133, 96, true, '[]'::jsonb, true),
  (311, 'Sparse Matrix Multiplication', 'Given two sparse matrices `mat1` of size `m x k` and `mat2` of size `k x n`, return the result of `mat1 x mat2`. You may assume that multiplication is always possible.


Example 1:
Input: mat1 = [[1,0,0],[-1,0,3]], mat2 = [[7,0,0],[0,0,0],[0,0,1]]
Output: [[7,0,0],[-7,0,3]]

Example 2:
Input: mat1 = [[0]], mat2 = [[0]]
Output: [[0]]

Constraints:
`m == mat1.length`
`k == mat1[i].length == mat2.length`
`n == mat2[i].length`
`1 <= m, n, k <= 100`
`-100 <= mat1[i][j], mat2[i][j] <= 100`', true, 'Medium', NULL, 64.1, 
   43.7, 'https://leetcode.com/problems/sparse-matrix-multiplication', 350, 124.7, 194.4, '["Facebook,Apple,Wish"]'::jsonb, '["Hash Table"]'::jsonb, 
   631, 247, 72, true, '[]'::jsonb, true),
  (312, 'Burst Balloons', 'You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by an array `nums`. You are asked to burst all the balloons.

If you burst the `ith` balloon, you will get `nums[i - 1] * nums[i] * nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds of the array, then treat it as if there is a balloon with a `1` painted on it.

Return the maximum coins you can collect by bursting the balloons wisely.


Example 1:
Input: nums = [3,1,5,8]
Output: 167
Explanation:
nums = [3,1,5,8] --> [3,5,8] --> [3,8] --> [8] --> []
coins =  3*1*5    +   3*5*8   +  1*3*8  + 1*8*1 = 167

Example 2:
Input: nums = [1,5]
Output: 10

Constraints:
`n == nums.length`
`1 <= n <= 500`
`0 <= nums[i] <= 100`', false, 'Hard', '/articles/burst-balloons', 53.9, 
   58.7, 'https://leetcode.com/problems/burst-balloons', 433, 132.3, 245.4, '["Adobe,Bloomberg,Amazon,Google,Codenation"]'::jsonb, '["Divide and Conquer,Dynamic Programming"]'::jsonb, 
   3483, 106, 97, true, '[]'::jsonb, true),
  (313, 'Super Ugly Number', 'Given an integer `n` and an array of integers `primes`, return the `nth` super ugly number.

Super ugly number is a positive number whose all prime factors are in the array `primes`.

The `nth` super ugly number is guaranteed to fit in a 32-bit signed integer.


Example 1:
Input: n = 12, primes = [2,7,13,19]
Output: 32
Explanation: [1,2,4,7,8,13,14,16,19,26,28,32] is the sequence of the first 12 super ugly numbers given primes == [2,7,13,19].


Example 2:
Input: n = 1, primes = [2,3,5]
Output: 1
Explanation: 1 is a super ugly number for any given primes.


Constraints:
`1 <= n <= 106`
`1 <= primes.length <= 100`
`2 <= primes[i] <= 1000`
`primes[i]` is guaranteed to be a prime number.

All the values of `primes` are unique and sorted in ascending order.', false, 'Medium', NULL, 46.3, 
   6.9, 'https://leetcode.com/problems/super-ugly-number', 307, 86.6, 186.9, '["Amazon,Google"]'::jsonb, '["Math,Heap"]'::jsonb, 
   836, 165, 84, true, '[]'::jsonb, true),
  (314, 'Binary Tree Vertical Order Traversal', 'Given the `root` of a binary tree, return the vertical order traversal of its nodes'' values. (i.e., from top to bottom, column by column).

If two nodes are in the same row and column, the order should be from left to right.


Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]

Example 2:
Input: root = [3,9,8,4,0,1,7]
Output: [[4],[9],[3,0,1],[8],[7]]

Example 3:
Input: root = [3,9,8,4,0,1,7,null,null,null,2,5]
Output: [[4],[9,5],[3,0,1],[8,2],[7]]

Example 4:
Input: root = []
Output: []

Constraints:
The number of nodes in the tree is in the range `[0, 100]`.

`-100 <= Node.val <= 100`', true, 'Medium', '/articles/binary-tree-vertical-order-traversal', 47.3, 
   38.5, 'https://leetcode.com/problems/binary-tree-vertical-order-traversal', 800, 159, 336.5, '["Facebook,Bloomberg,Amazon"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   1428, 195, 88, true, '[]'::jsonb, true),
  (315, 'Count of Smaller Numbers After Self', 'You are given an integer array `nums` and you have to return a new `counts` array. The `counts` array has the property where `counts[i]` is the number of smaller elements to the right of `nums[i]`.


Example 1:
Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).

To the right of 2 there is only 1 smaller element (1).

To the right of 6 there is 1 smaller element (1).

To the right of 1 there is 0 smaller element.


Example 2:
Input: nums = [-1]
Output: [0]

Example 3:
Input: nums = [-1,-1]
Output: [0,0]

Constraints:
`1 <= nums.length <= 105`
`-104 <= nums[i] <= 104`', false, 'Hard', NULL, 42.4, 
   56.5, 'https://leetcode.com/problems/count-of-smaller-numbers-after-self', 900, 166.1, 391.9, '["Google,Amazon,Apple,Bloomberg"]'::jsonb, '["Binary Search,Divide and Conquer,Sort,Binary Indexed Tree,Segment Tree"]'::jsonb, 
   3332, 105, 97, true, '[]'::jsonb, true),
  (316, 'Remove Duplicate Letters', 'Given a string `s`, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

Note: This question is the same as 1081: https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/

Example 1:
Input: s = "bcabc"
Output: "abc"

Example 2:
Input: s = "cbacdcbc"
Output: "acdb"

Constraints:
`1 <= s.length <= 104`
`s` consists of lowercase English letters.', false, 'Medium', '/articles/remove-duplicate-letters', 39.3, 
   42.3, 'https://leetcode.com/problems/remove-duplicate-letters', 441, 117.9, 299.5, '["Amazon,Bloomberg,Google"]'::jsonb, '["String,Stack,Greedy"]'::jsonb, 
   2389, 182, 93, true, '[]'::jsonb, true),
  (317, 'Shortest Distance from All Buildings', 'You are given an `m x n` grid `grid` of values `0`, `1`, or `2`, where:
each `0` marks an empty land that you can pass by freely,
each `1` marks a building that you cannot pass through, and
each `2` marks an obstacle that you cannot pass through.

You want to build a house on an empty land that reaches all buildings in the shortest total travel distance. You can only move up, down, left, and right.

Return the shortest travel distance for such a house. If it is not possible to build such a house according to the above rules, return `-1`.

The total travel distance is the sum of the distances between the houses of the friends and the meeting point.

The distance is calculated using Manhattan Distance, where `distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|`.


Example 1:
Input: grid = [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]
Output: 7
Explanation: Given three buildings at (0,0), (0,4), (2,2), and an obstacle at (0,2).

The point (1,2) is an ideal empty land to build a house, as the total travel distance of 3+3+1=7 is minimal.

So return 7.


Example 2:
Input: grid = [[1,0]]
Output: 1

Example 3:
Input: grid = [[1]]
Output: -1

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 100`
`grid[i][j]` is either `0`, `1`, or `2`.

There will be at least one building in the `grid`.', true, 'Hard', NULL, 42.9, 
   43.8, 'https://leetcode.com/problems/shortest-distance-from-all-buildings', 343, 89.2, 207.8, '["Facebook,Google,Amazon,Qualtrics"]'::jsonb, '["Breadth-first Search"]'::jsonb, 
   983, 63, 94, true, '[]'::jsonb, true),
  (318, 'Maximum Product of Word Lengths', 'Given a string array `words`, return the maximum value of `length(word[i]) * length(word[j])` where the two words do not share common letters. If no such two words exist, return `0`.


Example 1:
Input: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
Output: 16
Explanation: The two words can be "abcw", "xtfn".


Example 2:
Input: words = ["a","ab","abc","d","cd","bcd","abcd"]
Output: 4
Explanation: The two words can be "ab", "cd".


Example 3:
Input: words = ["a","aa","aaa","aaaa"]
Output: 0
Explanation: No such pair of words.


Constraints:
`2 <= words.length <= 1000`
`1 <= words[i].length <= 1000`
`words[i]` consists only of lowercase English letters.', false, 'Medium', '/articles/maximum-product-of-word-lengths', 52.4, 
   1.2, 'https://leetcode.com/problems/maximum-product-of-word-lengths', 348, 107.8, 205.5, '["Google"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   1010, 79, 93, true, '[]'::jsonb, true),
  (319, 'Bulb Switcher', 'There are `n` bulbs that are initially off. You first turn on all the bulbs, then you turn off every second bulb.

On the third round, you toggle every third bulb (turning on if it''s off or turning off if it''s on). For the `ith` round, you toggle every `i` bulb. For the `nth` round, you only toggle the last bulb.

Return the number of bulbs that are on after `n` rounds.


Example 1:
Input: n = 3
Output: 1
Explanation: At first, the three bulbs are [off, off, off].

After the first round, the three bulbs are [on, on, on].

After the second round, the three bulbs are [on, off, on].

After the third round, the three bulbs are [on, off, off]. 
So you should return 1 because there is only one bulb is on.


Example 2:
Input: n = 0
Output: 0

Example 3:
Input: n = 1
Output: 1

Constraints:
`0 <= n <= 109`', false, 'Medium', NULL, 45.4, 
   23.7, 'https://leetcode.com/problems/bulb-switcher', 244, 91.2, 200.7, '["Microsoft,Apple"]'::jsonb, '["Math,Brainteaser"]'::jsonb, 
   612, 1209, 34, true, '[]'::jsonb, true),
  (320, 'Generalized Abbreviation', 'A word''s generalized abbreviation can be constructed by taking any number of non-overlapping substrings and replacing them with their respective lengths. For example, `"abcde"` can be abbreviated into `"a3e"` (`"bcd"` turned into `"3"`), `"1bcd1"` (`"a"` and `"e"` both turned into `"1"`), and `"23"` (`"ab"` turned into `"2"` and `"cde"` turned into `"3"`).

Given a string `word`, return a list of all the possible generalized abbreviations of `word`. Return the answer in any order.


Example 1:
Input: word = "word"
Output: ["4","3d","2r1","2rd","1o2","1o1d","1or1","1ord","w3","w2d","w1r1","w1rd","wo2","wo1d","wor1","word"]

Example 2:
Input: word = "a"
Output: ["1","a"]

Constraints:
`1 <= word.length <= 15`
`word` consists of only lowercase English letters.', true, 'Medium', '/articles/generalized-abbreviation', 54, 
   0, 'https://leetcode.com/problems/generalized-abbreviation', 229, 53.1, 98.4, '["ByteDance"]'::jsonb, '["Backtracking,Bit Manipulation"]'::jsonb, 
   496, 128, 79, false, '[]'::jsonb, true),
  (321, 'Create Maximum Number', 'You are given two integer arrays `nums1` and `nums2` of lengths `m` and `n` respectively. `nums1` and `nums2` represent the digits of two numbers. You are also given an integer `k`.

Create the maximum number of length `k <= m + n` from digits of the two numbers. The relative order of the digits from the same array must be preserved.

Return an array of the `k` digits representing the answer.


Example 1:
Input: nums1 = [3,4,6,5], nums2 = [9,1,2,5,8,3], k = 5
Output: [9,8,6,5,3]

Example 2:
Input: nums1 = [6,7], nums2 = [6,0,4], k = 5
Output: [6,7,6,0,4]

Example 3:
Input: nums1 = [3,9], nums2 = [8,9], k = 3
Output: [9,8,9]

Constraints:
`m == nums1.length`
`n == nums2.length`
`1 <= m, n <= 500`
`0 <= nums1[i], nums2[i] <= 9`
`1 <= k <= m + n`
Follow up: Try to optimize your time and space complexity.', false, 'Hard', NULL, 27.6, 
   28.6, 'https://leetcode.com/problems/create-maximum-number', 146, 43.5, 157.7, '["Apple"]'::jsonb, '["Dynamic Programming,Greedy"]'::jsonb, 
   927, 269, 78, true, '[]'::jsonb, true),
  (322, 'Coin Change', 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.

You may assume that you have an infinite number of each kind of coin.


Example 1:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Example 2:
Input: coins = [2], amount = 3
Output: -1

Example 3:
Input: coins = [1], amount = 0
Output: 0

Example 4:
Input: coins = [1], amount = 1
Output: 1

Example 5:
Input: coins = [1], amount = 2
Output: 2

Constraints:
`1 <= coins.length <= 12`
`1 <= coins[i] <= 231 - 1`
`0 <= amount <= 104`', false, 'Medium', '/articles/coin-change', 37.7, 
   51.6, 'https://leetcode.com/problems/coin-change', 999, 618.1, 1.6, '["Amazon,Bloomberg,Goldman Sachs,Walmart Labs,Apple,Microsoft,Airbnb,Uber,Oracle,Facebook,BlackRock"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   6593, 193, 97, true, '[]'::jsonb, true),
  (323, 'Number of Connected Components in an Undirected Graph', 'You have a graph of `n` nodes. You are given an integer `n` and an array `edges` where `edges[i] = [ai, bi]` indicates that there is an edge between `ai` and `bi` in the graph.

Return the number of connected components in the graph.


Example 1:
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2

Example 2:
Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
Output: 1

Constraints:
`1 <= n <= 2000`
`1 <= edges.length <= 5000`
`edges[i].length == 2`
`0 <= ai <= bi < n`
`ai != bi`
There are no repeated edges.', true, 'Medium', '/articles/number-of-connected-components-in-an-undirected-graph', 58.2, 
   50.5, 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph', 595, 138.6, 238.2, '["Amazon,Facebook,LinkedIn,Microsoft,Apple"]'::jsonb, '["Depth-first Search,Breadth-first Search,Union Find,Graph"]'::jsonb, 
   1120, 35, 97, true, '[]'::jsonb, true),
  (324, 'Wiggle Sort II', 'Given an integer array `nums`, reorder it such that `nums[0] < nums[1] > nums[2] < nums[3]...`.

You may assume the input array always has a valid answer.


Example 1:
Input: nums = [1,5,1,1,6,4]
Output: [1,6,1,5,1,4]
Explanation: [1,4,1,5,1,6] is also accepted.


Example 2:
Input: nums = [1,3,2,2,3,1]
Output: [2,3,1,3,1,2]

Constraints:
`1 <= nums.length <= 5 * 104`
`0 <= nums[i] <= 5000`
It is guaranteed that there will be an answer for the given input `nums`.

Follow Up: Can you do it in `O(n)` time and/or in-place with `O(1)` extra space?', false, 'Medium', NULL, 30.8, 
   31.6, 'https://leetcode.com/problems/wiggle-sort-ii', 300, 97.6, 316.6, '["Amazon"]'::jsonb, '["Sort"]'::jsonb, 
   1350, 657, 67, true, '[]'::jsonb, true),
  (325, 'Maximum Size Subarray Sum Equals k', 'Given an integer array `nums` and an integer `k`, return the maximum length of a subarray that sums to `k`. If there isn''t one, return `0` instead.


Example 1:
Input: nums = [1,-1,5,-2,3], k = 3
Output: 4
Explanation: The subarray [1, -1, 5, -2] sums to 3 and is the longest.


Example 2:
Input: nums = [-2,-1,2,1], k = 1
Output: 2
Explanation: The subarray [-1, 2] sums to 1 and is the longest.


Constraints:
`1 <= nums.length <= 104`
`-104 <= nums[i] <= 104`
`-105 <= k <= 105`
Follow Up: Can you do it in `O(n)` time?', true, 'Medium', NULL, 47.6, 
   15.1, 'https://leetcode.com/problems/maximum-size-subarray-sum-equals-k', 281, 120.5, 253.3, '["Facebook,Microsoft"]'::jsonb, '["Hash Table"]'::jsonb, 
   1179, 37, 97, true, '[]'::jsonb, true),
  (326, 'Power of Three', 'Given an integer `n`, return `true` if it is a power of three. Otherwise, return `false`.

An integer `n` is a power of three, if there exists an integer `x` such that `n == 3x`.


Example 1:
Input: n = 27
Output: true

Example 2:
Input: n = 0
Output: false

Example 3:
Input: n = 9
Output: true

Example 4:
Input: n = 45
Output: false

Constraints:
`-231 <= n <= 231 - 1`
Follow up: Could you solve it without loops/recursion?', false, 'Easy', '/articles/power-of-three', 42.1, 
   4.1, 'https://leetcode.com/problems/power-of-three', 660, 323.5, 768.2, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   22, 3, 88, true, '[]'::jsonb, true),
  (327, 'Count of Range Sum', 'Given an integer array `nums` and two integers `lower` and `upper`, return the number of range sums that lie in `[lower, upper]` inclusive.

Range sum `S(i, j)` is defined as the sum of the elements in `nums` between indices `i` and `j` inclusive, where `i <= j`.


Example 1:
Input: nums = [-2,5,-1], lower = -2, upper = 2
Output: 3
Explanation: The three ranges are: [0,0], [2,2], and [0,2] and their respective sums are: -2, -1, 2.


Example 2:
Input: nums = [0], lower = 0, upper = 0
Output: 1

Constraints:
`1 <= nums.length <= 104`
`-231 <= nums[i] <= 231 - 1`
`-3 * 104 <= lower <= upper <= 3 * 104`
Follow up: A naive algorithm of `O(n2)` is trivial, Could you do better than that?', false, 'Hard', NULL, 36.2, 
   17.2, 'https://leetcode.com/problems/count-of-range-sum', 219, 49.6, 136.8, '["Amazon,Google"]'::jsonb, '["Binary Search,Divide and Conquer,Sort,Binary Indexed Tree,Segment Tree"]'::jsonb, 
   1016, 118, 90, true, '[]'::jsonb, true),
  (328, 'Odd Even Linked List', 'Given the `head` of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

The first node is considered odd, and the second node is even, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.


Example 1:
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]

Example 2:
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]

Constraints:
The number of nodes in the linked list is in the range `[0, 104]`.

`-106 <= Node.val <= 106`
Follow up: Could you solve it in `O(1)` space complexity and `O(nodes)` time complexity?', false, 'Medium', '/articles/odd-even-linked-list', 57.2, 
   24.2, 'https://leetcode.com/problems/odd-even-linked-list', 999, 364, 635.9, '["Bloomberg,Oracle,Facebook,Google"]'::jsonb, '["Linked List"]'::jsonb, 
   2966, 337, 90, true, '[]'::jsonb, true),
  (329, 'Longest Increasing Path in a Matrix', 'Given an `m x n` integers `matrix`, return the length of the longest increasing path in `matrix`.

From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).


Example 1:
Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is `[1, 2, 6, 9]`.


Example 2:
Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is `[3, 4, 5, 6]`. Moving diagonally is not allowed.


Example 3:
Input: matrix = [[1]]
Output: 1

Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 200`
`0 <= matrix[i][j] <= 231 - 1`', false, 'Hard', '/articles/longest-increasing-path-in-a-matrix', 45.4, 
   59.6, 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix', 851, 202.1, 445.6, '["Google,Facebook,Bloomberg,Amazon,ByteDance,DoorDash"]'::jsonb, '["Depth-first Search,Topological Sort,Memoization"]'::jsonb, 
   2888, 52, 98, true, '[]'::jsonb, true),
  (330, 'Patching Array', 'Given a sorted integer array `nums` and an integer `n`, add/patch elements to the array such that any number in the range `[1, n]` inclusive can be formed by the sum of some elements in the array.

Return the minimum number of patches required.


Example 1:
Input: nums = [1,3], n = 6
Output: 1
Explanation:
Combinations of nums are [1], [3], [1,3], which form possible sums of: 1, 3, 4.

Now if we add/patch 2 to nums, the combinations are: [1], [2], [3], [1,3], [2,3], [1,2,3].

Possible sums are 1, 2, 3, 4, 5, 6, which now covers the range [1, 6].

So we only need 1 patch.


Example 2:
Input: nums = [1,5,10], n = 20
Output: 2
Explanation: The two patches can be [2, 4].


Example 3:
Input: nums = [1,2,2], n = 5
Output: 0

Constraints:
`1 <= nums.length <= 1000`
`1 <= nums[i] <= 104`
`nums` is sorted in ascending order.

`1 <= n <= 231 - 1`', false, 'Hard', '/articles/patching-array', 35.1, 
   12.1, 'https://leetcode.com/problems/patching-array', 109, 39.4, 112.2, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   630, 84, 88, true, '[]'::jsonb, true),
  (331, 'Verify Preorder Serialization of a Binary Tree', 'One way to serialize a binary tree is to use preorder traversal. When we encounter a non-null node, we record the node''s value. If it is a null node, we record using a sentinel value such as `''#''`.

For example, the above binary tree can be serialized to the string `"9,3,4,#,#,1,#,#,2,#,6,#,#"`, where `''#''` represents a null node.

Given a string of comma-separated values `preorder`, return `true` if it is a correct preorder traversal serialization of a binary tree.

It is guaranteed that each comma-separated value in the string must be either an integer or a character `''#''` representing null pointer.

You may assume that the input format is always valid.

For example, it could never contain two consecutive commas, such as `"1,,3"`.


Example 1:
Input: preorder = "9,3,4,#,#,1,#,#,2,#,6,#,#"
Output: true

Example 2:
Input: preorder = "1,#"
Output: false

Example 3:
Input: preorder = "9,#,#,1"
Output: false

Constraints:
`1 <= preorder.length <= 104`
`preoder` consist of integers in the range `[0, 100]` and `''#''` separated by commas `'',''`.

Follow up: Find an algorithm without reconstructing the tree.', false, 'Medium', '/articles/verify-preorder-serialization-of-a-binary-tree', 41.1, 
   7, 'https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree', 416, 79.4, 193.1, '["Google"]'::jsonb, '["Stack"]'::jsonb, 
   938, 57, 94, true, '[]'::jsonb, true),
  (332, 'Reconstruct Itinerary', 'You are given a list of airline `tickets` where `tickets[i] = [fromi, toi]` represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.

All of the tickets belong to a man who departs from `"JFK"`, thus, the itinerary must begin with `"JFK"`. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string.

For example, the itinerary `["JFK", "LGA"]` has a smaller lexical order than `["JFK", "LGB"]`.

You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.


Example 1:
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]

Example 2:
Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.


Constraints:
`1 <= tickets.length <= 300`
`tickets[i].length == 2`
`fromi.length == 3`
`toi.length == 3`
`fromi` and `toi` consist of uppercase English letters.

`fromi != toi`', false, 'Medium', '/articles/reconstruct-itinerary', 38.1, 
   69.8, 'https://leetcode.com/problems/reconstruct-itinerary', 701, 206.4, 541.3, '["Uber,Twilio,Amazon,Bloomberg,Facebook,Microsoft,Intuit,Expedia,Qualtrics,Twitter,Google,eBay,VMware"]'::jsonb, '["Depth-first Search,Graph"]'::jsonb, 
   2621, 1240, 68, true, '[]'::jsonb, true),
  (333, 'Largest BST Subtree', 'Given the root of a binary tree, find the largest subtree, which is also a Binary Search Tree (BST), where the largest means subtree has the largest number of nodes.

A Binary Search Tree (BST) is a tree in which all the nodes follow the below-mentioned properties:
The left subtree values are less than the value of their parent (root) node''s value.

The right subtree values are greater than the value of their parent (root) node''s value.

Note: A subtree must include all of its descendants.

Follow up: Can you figure out ways to solve it with O(n) time complexity?

Example 1:
Input: root = [10,5,15,1,8,null,7]
Output: 3
Explanation: The Largest BST Subtree in this case is the highlighted one. The return value is the subtree''s size, which is 3.


Example 2:
Input: root = [4,2,7,2,3,5,null,2,null,null,null,null,null,1]
Output: 2

Constraints:
The number of nodes in the tree is in the range `[0, 104]`.

`-104 <= Node.val <= 104`', true, 'Medium', NULL, 38.3, 
   20.3, 'https://leetcode.com/problems/largest-bst-subtree', 372, 61.4, 160.2, '["Facebook,Bloomberg"]'::jsonb, '["Tree"]'::jsonb, 
   840, 81, 91, true, '[]'::jsonb, true),
  (334, 'Increasing Triplet Subsequence', 'Given an integer array `nums`, return `true` if there exists a triple of indices `(i, j, k)` such that `i < j < k` and `nums[i] < nums[j] < nums[k]`. If no such indices exists, return `false`.


Example 1:
Input: nums = [1,2,3,4,5]
Output: true
Explanation: Any triplet where i < j < k is valid.


Example 2:
Input: nums = [5,4,3,2,1]
Output: false
Explanation: No triplet exists.


Example 3:
Input: nums = [2,1,5,0,4,6]
Output: true
Explanation: The triplet (3, 4, 5) is valid because nums[3] == 0 < nums[4] == 4 < nums[5] == 6.


Constraints:
`1 <= nums.length <= 105`
`-231 <= nums[i] <= 231 - 1`
Follow up: Could you implement a solution that runs in `O(n)` time complexity and `O(1)` space complexity?', false, 'Medium', '/articles/increasing-triplet-subsequence', 40.9, 
   27.9, 'https://leetcode.com/problems/increasing-triplet-subsequence', 740, 198.2, 484.9, '["Google"]'::jsonb, '[]'::jsonb, 
   2380, 165, 94, true, '[]'::jsonb, true),
  (335, 'Self Crossing', 'You are given an array of integers `distance`.

You start at point `(0,0)` on an X-Y plane and you move `distance[0]` meters to the north, then `distance[1]` meters to the west, `distance[2]` meters to the south, `distance[3]` meters to the east, and so on. In other words, after each move, your direction changes counter-clockwise.

Return `true` if your path crosses itself, and `false` if it does not.


Example 1:
Input: distance = [2,1,1,2]
Output: true

Example 2:
Input: distance = [1,2,3,4]
Output: false

Example 3:
Input: distance = [1,1,1,1]
Output: true

Constraints:
`1 <= distance.length <= 500`
`1 <= distance[i] <= 500`
Follow up: Could you write a one-pass algorithm with `O(1)` extra space?', false, 'Hard', NULL, 28.7, 
   13, 'https://leetcode.com/problems/self-crossing', 117, 25.1, 87.2, '["Amazon,Google"]'::jsonb, '["Math"]'::jsonb, 
   177, 400, 31, true, '[]'::jsonb, true),
  (336, 'Palindrome Pairs', 'Given a list of unique words, return all the pairs of the distinct indices `(i, j)` in the given list, so that the concatenation of the two words `words[i] + words[j]` is a palindrome.


Example 1:
Input: words = ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]]
Explanation: The palindromes are ["dcbaabcd","abcddcba","slls","llssssll"]

Example 2:
Input: words = ["bat","tab","cat"]
Output: [[0,1],[1,0]]
Explanation: The palindromes are ["battab","tabbat"]

Example 3:
Input: words = ["a",""]
Output: [[0,1],[1,0]]

Constraints:
`1 <= words.length <= 5000`
`0 <= words[i].length <= 300`
`words[i]` consists of lower-case English letters.', false, 'Hard', '/articles/palindrome-pairs', 34.8, 
   34.9, 'https://leetcode.com/problems/palindrome-pairs', 372, 114.6, 328.9, '["Airbnb,ByteDance,Facebook"]'::jsonb, '["Hash Table,String,Trie"]'::jsonb, 
   1742, 172, 91, true, '[]'::jsonb, true),
  (337, 'House Robber III', 'The thief has found himself a new place for his thievery again. There is only one entrance to this area, called `root`.

Besides the `root`, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

Given the `root` of the binary tree, return the maximum amount of money the thief can rob without alerting the police.


Example 1:
Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.


Example 2:
Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.


Constraints:
The number of nodes in the tree is in the range `[1, 104]`.

`0 <= Node.val <= 104`', false, 'Medium', '/articles/house-robber-iii', 52, 
   28.5, 'https://leetcode.com/problems/house-robber-iii', 972, 207, 397.8, '["Amazon"]'::jsonb, '["Dynamic Programming,Tree,Depth-first Search"]'::jsonb, 
   3919, 66, 98, true, '[]'::jsonb, true),
  (338, 'Counting Bits', 'Given an integer `num`, return an array of the number of `1`''s in the binary representation of every number in the range `[0, num]`.


Example 1:
Input: num = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10

Example 2:
Input: num = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101

Constraints:
`0 <= num <= 105`
Follow up:
It is very easy to come up with a solution with run time `O(32n)`. Can you do it in linear time `O(n)` and possibly in a single pass?
Could you solve it in `O(n)` space complexity?
Can you do it without using any built-in function (i.e., like `__builtin_popcount` in C++)?', false, 'Medium', '/articles/counting-bits', 70.6, 
   29.1, 'https://leetcode.com/problems/counting-bits', 999, 346.7, 491.3, '["Amazon,Blizzard"]'::jsonb, '["Dynamic Programming,Bit Manipulation"]'::jsonb, 
   3759, 207, 95, true, '[]'::jsonb, true),
  (339, 'Nested List Weight Sum', 'You are given a nested list of integers `nestedList`. Each element is either an integer or a list whose elements may also be integers or other lists.

The depth of an integer is the number of lists that it is inside of. For example, the nested list `[1,[2,2],[[3],2],1]` has each integer''s value set to its depth.

Return the sum of each integer in `nestedList` multiplied by its depth.


Example 1:
Input: nestedList = [[1,1],2,[1,1]]
Output: 10
Explanation: Four 1''s at depth 2, one 2 at depth 1. 1*2 + 1*2 + 2*1 + 1*2 + 1*2 = 10.


Example 2:
Input: nestedList = [1,[4,[6]]]
Output: 27
Explanation: One 1 at depth 1, one 4 at depth 2, and one 6 at depth 3. 1*1 + 4*2 + 6*3 = 27.


Example 3:
Input: nestedList = [0]
Output: 0

Constraints:
`1 <= nestedList.length <= 50`
The values of the integers in the nested list is in the range `[-100, 100]`.

The maximum depth of any integer is less than or equal to `50`.', true, 'Medium', '/articles/nested-list-weight-sum', 76.8, 
   56.3, 'https://leetcode.com/problems/nested-list-weight-sum', 508, 121.9, 158.7, '["Facebook,LinkedIn,Amazon"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   799, 214, 79, true, '[]'::jsonb, true),
  (340, 'Longest Substring with At Most K Distinct Characters', 'Given a string `s` and an integer `k`, return the length of the longest substring of `s` that contains at most `k` distinct characters.


Example 1:
Input: s = "eceba", k = 2
Output: 3
Explanation: The substring is "ece" with length 3.


Example 2:
Input: s = "aa", k = 1
Output: 2
Explanation: The substring is "aa" with length 2.


Constraints:
`1 <= s.length <= 5 * 104`
`0 <= k <= 50`', true, 'Medium', '/articles/longest-substring-with-at-most-k-distinct-characters', 45.7, 
   45.7, 'https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters', 621, 192.3, 420.6, '["Facebook,Uber,Microsoft,Wish,Twitter"]'::jsonb, '["Hash Table,Two Pointers,String,Sliding Window"]'::jsonb, 
   1579, 58, 96, true, '[]'::jsonb, true),
  (341, 'Flatten Nested List Iterator', 'You are given a nested list of integers `nestedList`. Each element is either an integer or a list whose elements may also be integers or other lists. Implement an iterator to flatten it.

Implement the `NestedIterator` class:
`NestedIterator(List<NestedInteger> nestedList)` Initializes the iterator with the nested list `nestedList`.

`int next()` Returns the next integer in the nested list.

`boolean hasNext()` Returns `true` if there are still some integers in the nested list and `false` otherwise.


Example 1:
Input: nestedList = [[1,1],2,[1,1]]
Output: [1,1,2,1,1]
Explanation: By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,1,2,1,1].


Example 2:
Input: nestedList = [1,[4,[6]]]
Output: [1,4,6]
Explanation: By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,4,6].


Constraints:
`1 <= nestedList.length <= 500`
The values of the integers in the nested list is in the range `[-106, 106]`.', false, 'Medium', '/articles/flatten-nested-iterator', 54.8, 
   67.9, 'https://leetcode.com/problems/flatten-nested-list-iterator', 999, 207.8, 379, '["Facebook,Amazon,Airbnb,Apple,LinkedIn,Bloomberg,Oracle"]'::jsonb, '["Stack,Design"]'::jsonb, 
   2109, 800, 72, true, '[]'::jsonb, true),
  (342, 'Power of Four', 'Given an integer `n`, return `true` if it is a power of four. Otherwise, return `false`.

An integer `n` is a power of four, if there exists an integer `x` such that `n == 4x`.


Example 1:
Input: n = 16
Output: true

Example 2:
Input: n = 5
Output: false

Example 3:
Input: n = 1
Output: true

Constraints:
`-231 <= n <= 231 - 1`
Follow up: Could you solve it without loops/recursion?', false, 'Easy', '/articles/power-of-four', 41.8, 
   4.3, 'https://leetcode.com/problems/power-of-four', 999, 225.9, 539.9, '["Two Sigma"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   841, 251, 77, false, '[]'::jsonb, true),
  (343, 'Integer Break', 'Given an integer `n`, break it into the sum of `k` positive integers, where `k >= 2`, and maximize the product of those integers.

Return the maximum product you can get.


Example 1:
Input: n = 2
Output: 1
Explanation: 2 = 1 + 1, 1 × 1 = 1.


Example 2:
Input: n = 10
Output: 36
Explanation: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36.


Constraints:
`2 <= n <= 58`', false, 'Medium', NULL, 51.4, 
   17.8, 'https://leetcode.com/problems/integer-break', 999, 128.1, 249.4, '["Google,Adobe"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   1515, 258, 85, true, '[]'::jsonb, true),
  (344, 'Reverse String', 'Write a function that reverses a string. The input string is given as an array of characters `s`.


Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]

Constraints:
`1 <= s.length <= 105`
`s[i]` is a printable ascii character.

Follow up: Do not allocate extra space for another array. You must do this by modifying the input array in-place with `O(1)` extra memory.', false, 'Easy', '/articles/reverse-string', 70.7, 
   57.3, 'https://leetcode.com/problems/reverse-string', 999, 1, 1.4, '["Apple,Microsoft,Goldman Sachs,Amazon,Adobe,Bloomberg"]'::jsonb, '["Two Pointers,String"]'::jsonb, 
   2245, 761, 75, true, '[]'::jsonb, true),
  (345, 'Reverse Vowels of a String', 'Given a string `s`, reverse only all the vowels in the string and return it.

The vowels are `''a''`, `''e''`, `''i''`, `''o''`, and `''u''`, and they can appear in both cases.


Example 1:
Input: s = "hello"
Output: "holle"

Example 2:
Input: s = "leetcode"
Output: "leotcede"

Constraints:
`1 <= s.length <= 3 * 105`
`s` consist of printable ASCII characters.', false, 'Easy', NULL, 45.2, 
   27.4, 'https://leetcode.com/problems/reverse-vowels-of-a-string', 999, 271.8, 601.2, '["Facebook,Google,Amazon"]'::jsonb, '["Two Pointers,String"]'::jsonb, 
   986, 1463, 40, true, '[]'::jsonb, true),
  (346, 'Moving Average from Data Stream', 'Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

Implement the `MovingAverage` class:
`MovingAverage(int size)` Initializes the object with the size of the window `size`.

`double next(int val)` Returns the moving average of the last `size` values of the stream.


Example 1:
Input
["MovingAverage", "next", "next", "next", "next"]
[[3], [1], [10], [3], [5]]
Output
[null, 1.0, 5.5, 4.66667, 6.0]
Explanation
MovingAverage movingAverage = new MovingAverage(3);
movingAverage.next(1); // return 1.0 = 1 / 1
movingAverage.next(10); // return 5.5 = (1 + 10) / 2
movingAverage.next(3); // return 4.66667 = (1 + 10 + 3) / 3
movingAverage.next(5); // return 6.0 = (10 + 3 + 5) / 3

Constraints:
`1 <= size <= 1000`
`-105 <= val <= 105`
At most `104` calls will be made to `next`.', true, 'Easy', '/articles/moving-average-from-data-stream', 73.6, 
   45.2, 'https://leetcode.com/problems/moving-average-from-data-stream', 598, 179.2, 243.6, '["Google,Apple,Spotify,Indeed,Amazon"]'::jsonb, '["Design,Queue"]'::jsonb, 
   848, 84, 91, true, '[]'::jsonb, true),
  (347, 'Top K Frequent Elements', 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.


Example 1:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Example 2:
Input: nums = [1], k = 1
Output: [1]

Constraints:
`1 <= nums.legth <= 105`
`k` is in the range `[1, the number of unique elements in the array]`.

It is guaranteed that the answer is unique.

Follow up: Your algorithm''s time complexity must be better than `O(n log n)`, where n is the array''s size.', false, 'Medium', '/articles/top-k-frequent-elements', 62.6, 
   76.8, 'https://leetcode.com/problems/top-k-frequent-elements', 999, 569.3, 909.6, '["Capital One,Facebook,Amazon,Oracle,Apple,Bloomberg,Google,ByteDance,Yelp,Microsoft,Walmart Labs,eBay"]'::jsonb, '["Hash Table,Heap"]'::jsonb, 
   4738, 265, 95, true, '[]'::jsonb, true),
  (348, 'Design Tic-Tac-Toe', 'Assume the following rules are for the tic-tac-toe game on an `n x n` board between two players:
A move is guaranteed to be valid and is placed on an empty block.

Once a winning condition is reached, no more moves are allowed.

A player who succeeds in placing `n` of their marks in a horizontal, vertical, or diagonal row wins the game.

Implement the `TicTacToe` class:
`TicTacToe(int n)` Initializes the object the size of the board `n`.

`int move(int row, int col, int player)` Indicates that player with id `player` plays at the cell `(row, col)` of the board. The move is guaranteed to be a valid move.

Follow up:
Could you do better than `O(n2)` per `move()` operation?

Example 1:
Input
["TicTacToe", "move", "move", "move", "move", "move", "move", "move"]
[[3], [0, 0, 1], [0, 2, 2], [2, 2, 1], [1, 1, 2], [2, 0, 1], [1, 0, 2], [2, 1, 1]]
Output
[null, 0, 0, 0, 0, 0, 0, 1]
Explanation
TicTacToe ticTacToe = new TicTacToe(3);
Assume that player 1 is "X" and player 2 is "O" in the board.

ticTacToe.move(0, 0, 1); // return 0 (no one wins)
|X| | |
| | | |    // Player 1 makes a move at (0, 0).

| | | |
ticTacToe.move(0, 2, 2); // return 0 (no one wins)
|X| |O|
| | | |    // Player 2 makes a move at (0, 2).

| | | |
ticTacToe.move(2, 2, 1); // return 0 (no one wins)
|X| |O|
| | | |    // Player 1 makes a move at (2, 2).

| | |X|
ticTacToe.move(1, 1, 2); // return 0 (no one wins)
|X| |O|
| |O| |    // Player 2 makes a move at (1, 1).

| | |X|
ticTacToe.move(2, 0, 1); // return 0 (no one wins)
|X| |O|
| |O| |    // Player 1 makes a move at (2, 0).

|X| |X|
ticTacToe.move(1, 0, 2); // return 0 (no one wins)
|X| |O|
|O|O| |    // Player 2 makes a move at (1, 0).

|X| |X|
ticTacToe.move(2, 1, 1); // return 1 (player 1 wins)
|X| |O|
|O|O| |    // Player 1 makes a move at (2, 1).

|X|X|X|

Constraints:
`2 <= n <= 100`
player is `1` or `2`.

`1 <= row, col <= n`
`(row, col)` are unique for each different call to `move`.

At most `n2` calls will be made to `move`.', true, 'Medium', NULL, 55.7, 
   66.5, 'https://leetcode.com/problems/design-tic-tac-toe', 441, 126.4, 226.8, '["Amazon,Microsoft,Facebook,Intuit,Apple,Oracle"]'::jsonb, '["Design"]'::jsonb, 
   1072, 73, 94, true, '[]'::jsonb, true),
  (349, 'Intersection of Two Arrays', 'Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.


Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

Example 2:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.


Constraints:
`1 <= nums1.length, nums2.length <= 1000`
`0 <= nums1[i], nums2[i] <= 1000`', false, 'Easy', '/articles/intersection-of-two-arrays', 65.3, 
   43, 'https://leetcode.com/problems/intersection-of-two-arrays', 999, 467, 715.6, '["Facebook,Amazon,Bloomberg,ByteDance,Apple"]'::jsonb, '["Hash Table,Two Pointers,Binary Search,Sort"]'::jsonb, 
   1338, 1513, 47, true, '[]'::jsonb, true),
  (350, 'Intersection of Two Arrays II', 'Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.


Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

Example 2:
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Explanation: [9,4] is also accepted.


Constraints:
`1 <= nums1.length, nums2.length <= 1000`
`0 <= nums1[i], nums2[i] <= 1000`
Follow up:
What if the given array is already sorted? How would you optimize your algorithm?
What if `nums1`''s size is small compared to `nums2`''s size? Which algorithm is better?
What if elements of `nums2` are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?', false, 'Easy', '/articles/intersection-of-two-arrays-ii', 52.1, 
   30.8, 'https://leetcode.com/problems/intersection-of-two-arrays-ii', 999, 485.8, 932, '["Amazon,Facebook,Oracle,Nutanix,Microsoft"]'::jsonb, '["Hash Table,Two Pointers,Binary Search,Sort"]'::jsonb, 
   2138, 516, 81, true, '[]'::jsonb, true),
  (351, 'Android Unlock Patterns', 'Android devices have a special lock screen with a `3 x 3` grid of dots. Users can set an "unlock pattern" by connecting the dots in a specific sequence, forming a series of joined line segments where each segment''s endpoints are two consecutive dots in the sequence. A sequence of `k` dots is a valid unlock pattern if both of the following are true:
All the dots in the sequence are distinct.

If the line segment connecting two consecutive dots in the sequence passes through any other dot, the other dot must have previously appeared in the sequence. No jumps through non-selected dots are allowed.

Here are some example valid and invalid unlock patterns:
The 1st pattern `[4,1,3,6]` is invalid because the line connecting dots `1` and `3` pass through dot `2`, but dot `2` did not previously appear in the sequence.

The 2nd pattern `[4,1,9,2]` is invalid because the line connecting dots `1` and `9` pass through dot `5`, but dot `5` did not previously appear in the sequence.

The 3rd pattern `[2,4,1,3,6]` is valid because it follows the conditions. The line connecting dots `1` and `3` meets the condition because dot `2` previously appeared in the sequence.

The 4th pattern `[6,5,4,1,9,2]` is valid because it follows the conditions. The line connecting dots `1` and `9` meets the condition because dot `5` previously appeared in the sequence.

Given two integers `m` and `n`, return the number of unique and valid unlock patterns of the Android grid lock screen that consist of at least `m` keys and at most `n` keys.

Two unlock patterns are considered unique if there is a dot in one sequence that is not in the other, or the order of the dots is different.


Example 1:
Input: m = 1, n = 1
Output: 9

Example 2:
Input: m = 1, n = 2
Output: 65

Constraints:
`1 <= m, n <= 9`', true, 'Medium', '/articles/android-unlock-patterns', 49.8, 
   20.7, 'https://leetcode.com/problems/android-unlock-patterns', 216, 52.6, 105.6, '["Microsoft"]'::jsonb, '["Dynamic Programming,Backtracking"]'::jsonb, 
   470, 824, 36, false, '[]'::jsonb, true),
  (352, 'Data Stream as Disjoint Intervals', 'Given a data stream input of non-negative integers `a1, a2, ..., an`, summarize the numbers seen so far as a list of disjoint intervals.

Implement the `SummaryRanges` class:
`SummaryRanges()` Initializes the object with an empty stream.

`void addNum(int val)` Adds the integer `val` to the stream.

`int[][] getIntervals()` Returns a summary of the integers in the stream currently as a list of disjoint intervals `[starti, endi]`.


Example 1:
Input
["SummaryRanges", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals"]
[[], [1], [], [3], [], [7], [], [2], [], [6], []]
Output
[null, null, [[1, 1]], null, [[1, 1], [3, 3]], null, [[1, 1], [3, 3], [7, 7]], null, [[1, 3], [7, 7]], null, [[1, 3], [6, 7]]]
Explanation
SummaryRanges summaryRanges = new SummaryRanges();
summaryRanges.addNum(1);      // arr = [1]
summaryRanges.getIntervals(); // return [[1, 1]]
summaryRanges.addNum(3);      // arr = [1, 3]
summaryRanges.getIntervals(); // return [[1, 1], [3, 3]]
summaryRanges.addNum(7);      // arr = [1, 3, 7]
summaryRanges.getIntervals(); // return [[1, 1], [3, 3], [7, 7]]
summaryRanges.addNum(2);      // arr = [1, 2, 3, 7]
summaryRanges.getIntervals(); // return [[1, 3], [7, 7]]
summaryRanges.addNum(6);      // arr = [1, 2, 3, 6, 7]
summaryRanges.getIntervals(); // return [[1, 3], [6, 7]]

Constraints:
`0 <= val <= 104`
At most `3 * 104` calls will be made to `addNum` and `getIntervals`.

Follow up: What if there are lots of merges and the number of disjoint intervals is small compared to the size of the data stream?', false, 'Hard', NULL, 48.8, 
   12, 'https://leetcode.com/problems/data-stream-as-disjoint-intervals', 306, 42.3, 86.6, '["Oracle"]'::jsonb, '["Binary Search,Ordered Map"]'::jsonb, 
   473, 118, 80, false, '[]'::jsonb, true),
  (353, 'Design Snake Game', 'Design a Snake game that is played on a device with screen size `height x width`. Play the game online if you are not familiar with the game.

The snake is initially positioned at the top left corner `(0, 0)` with a length of `1` unit.

You are given an array `food` where `food[i] = (ri, ci)` is the row and column position of a piece of food that the snake can eat. When a snake eats a piece of food, its length and the game''s score both increase by `1`.

Each piece of food appears one by one on the screen, meaning the second piece of food will not appear until the snake eats the first piece of food.

When a piece of food appears on the screen, it is guaranteed that it will not appear on a block occupied by the snake.

The game is over if the snake goes out of bounds (hits a wall) or if its head occupies a space that its body occupies after moving (i.e. a snake of length 4 cannot run into itself).

Implement the `SnakeGame` class:
`SnakeGame(int width, int height, int[][] food)` Initializes the object with a screen of size `height x width` and the positions of the `food`.

`int move(String direction)` Returns the score of the game after applying one `direction` move by the snake. If the game is over, return `-1`.


Example 1:
Input
["SnakeGame", "move", "move", "move", "move", "move", "move"]
[[3, 2, [[1, 2], [0, 1]]], ["R"], ["D"], ["R"], ["U"], ["L"], ["U"]]
Output
[null, 0, 0, 1, 1, 2, -1]
Explanation
SnakeGame snakeGame = new SnakeGame(3, 2, [[1, 2], [0, 1]]);
snakeGame.move("R"); // return 0
snakeGame.move("D"); // return 0
snakeGame.move("R"); // return 1, snake eats the first piece of food. The second piece of food appears
                     // at (0, 1).

snakeGame.move("U"); // return 1
snakeGame.move("L"); // return 2, snake eats the second food. No more food appears.

snakeGame.move("U"); // return -1, game over because snake collides with border

Constraints:
`1 <= width, height <= 104`
`1 <= food.length <= 50`
`food[i].length == 2`
`0 <= ri < height`
`0 <= ci < width`
`direction.length == 1`
`direction` is `''U''`, `''D''`, `''L''`, or `''R''`.

At most `104` calls will be made to `move`.', true, 'Medium', '/articles/design-snake-game', 36.2, 
   42.9, 'https://leetcode.com/problems/design-snake-game', 271, 45.5, 125.7, '["Amazon,Microsoft"]'::jsonb, '["Design,Queue"]'::jsonb, 
   531, 216, 71, true, '[]'::jsonb, true),
  (354, 'Russian Doll Envelopes', 'You are given a 2D array of integers `envelopes` where `envelopes[i] = [wi, hi]` represents the width and the height of an envelope.

One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope''s width and height.

Return the maximum number of envelopes you can Russian doll (i.e., put one inside the other).

Note: You cannot rotate an envelope.


Example 1:
Input: envelopes = [[5,4],[6,4],[6,7],[2,3]]
Output: 3
Explanation: The maximum number of envelopes you can Russian doll is `3` ([2,3] => [5,4] => [6,7]).


Example 2:
Input: envelopes = [[1,1],[1,1],[1,1]]
Output: 1

Constraints:
`1 <= envelopes.length <= 5000`
`envelopes[i].length == 2`
`1 <= wi, hi <= 104`', false, 'Hard', '/articles/russian-doll-envelopes', 37.7, 
   20.9, 'https://leetcode.com/problems/russian-doll-envelopes', 404, 100.8, 267.4, '["Google,Amazon,ByteDance,Uber"]'::jsonb, '["Binary Search,Dynamic Programming"]'::jsonb, 
   1968, 58, 97, true, '[]'::jsonb, true),
  (355, 'Design Twitter', 'Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the `10` most recent tweets in the user''s news feed.

Implement the `Twitter` class:
`Twitter()` Initializes your twitter object.

`void postTweet(int userId, int tweetId)` Composes a new tweet with ID `tweetId` by the user `userId`. Each call to this function will be made with a unique `tweetId`.

`List<Integer> getNewsFeed(int userId)` Retrieves the `10` most recent tweet IDs in the user''s news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.

`void follow(int followerId, int followeeId)` The user with ID `followerId` started following the user with ID `followeeId`.

`void unfollow(int followerId, int followeeId)` The user with ID `followerId` started unfollowing the user with ID `followeeId`.


Example 1:
Input
["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output
[null, null, [5], null, null, [6, 5], null, [5]]
Explanation
Twitter twitter = new Twitter();
twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).

twitter.getNewsFeed(1);  // User 1''s news feed should return a list with 1 tweet id -> [5]. return [5]
twitter.follow(1, 2);    // User 1 follows user 2.

twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).

twitter.getNewsFeed(1);  // User 1''s news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.

twitter.unfollow(1, 2);  // User 1 unfollows user 2.

twitter.getNewsFeed(1);  // User 1''s news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.


Constraints:
`1 <= userId, followerId, followeeId <= 500`
`0 <= tweetId <= 104`
All the tweets have unique IDs.

At most `3 * 104` calls will be made to `postTweet`, `getNewsFeed`, `follow`, and `unfollow`.', false, 'Medium', NULL, 31.6, 
   50, 'https://leetcode.com/problems/design-twitter', 492, 64.3, 203.5, '["Paypal,Amazon,Microsoft,Yelp"]'::jsonb, '["Hash Table,Heap,Design"]'::jsonb, 
   1270, 234, 84, true, '[]'::jsonb, true),
  (356, 'Line Reflection', 'Given n points on a 2D plane, find if there is such a line parallel to y-axis that reflect the given points symmetrically, in other words, answer whether or not if there exists a line that after reflecting all points over the given line the set of the original points is the same that the reflected ones.

Note that there can be repeated points.

Follow up:
Could you do better than O(n2) ?

Example 1:
Input: points = [[1,1],[-1,1]]
Output: true
Explanation: We can choose the line x = 0.


Example 2:
Input: points = [[1,1],[-1,-1]]
Output: false
Explanation: We can''t choose a line.


Constraints:
`n == points.length`
`1 <= n <= 10^4`
`-10^8 <= points[i][j] <= 10^8`', true, 'Medium', NULL, 33.1, 
   50, 'https://leetcode.com/problems/line-reflection', 137, 26.5, 80, '["Yandex"]'::jsonb, '["Hash Table,Math"]'::jsonb, 
   166, 396, 30, false, '[]'::jsonb, true),
  (357, 'Count Numbers with Unique Digits', 'Given an integer `n`, return the count of all numbers with unique digits, `x`, where `0 <= x < 10n`.


Example 1:
Input: n = 2
Output: 91
Explanation: The answer should be the total numbers in the range of 0 ≤ x < 100, excluding 11,22,33,44,55,66,77,88,99

Example 2:
Input: n = 0
Output: 1

Constraints:
`0 <= n <= 8`', false, 'Medium', NULL, 49, 
   19.9, 'https://leetcode.com/problems/count-numbers-with-unique-digits', 575, 87.2, 178.1, '["Google"]'::jsonb, '["Math,Dynamic Programming,Backtracking"]'::jsonb, 
   559, 996, 36, true, '[]'::jsonb, true),
  (358, 'Rearrange String k Distance Apart', 'Given a string `s` and an integer `k`, rearrange `s` such that the same characters are at least distance `k` from each other. If it is not possible to rearrange the string, return an empty string `""`.


Example 1:
Input: s = "aabbcc", k = 3
Output: "abcabc"
Explanation: The same letters are at least a distance of 3 from each other.


Example 2:
Input: s = "aaabc", k = 3
Output: ""
Explanation: It is not possible to rearrange the string.


Example 3:
Input: s = "aaadbbcc", k = 2
Output: "abacabcd"
Explanation: The same letters are at least a distance of 2 from each other.


Constraints:
`1 <= s.length <= 3 * 105`
`s` consists of only lowercase English letters.

`0 <= k <= s.length`', true, 'Hard', NULL, 35.7, 
   14.7, 'https://leetcode.com/problems/rearrange-string-k-distance-apart', 206, 42.5, 118.8, '["Microsoft,Facebook"]'::jsonb, '["Hash Table,Heap,Greedy"]'::jsonb, 
   577, 23, 96, true, '[]'::jsonb, true),
  (359, 'Logger Rate Limiter', 'Design a logger system that receives a stream of messages along with their timestamps. Each unique message should only be printed at most every 10 seconds (i.e. a message printed at timestamp `t` will prevent other identical messages from being printed until timestamp `t + 10`).

All messages will come in chronological order. Several messages may arrive at the same timestamp.

Implement the `Logger` class:
`Logger()` Initializes the `logger` object.

`bool shouldPrintMessage(int timestamp, string message)` Returns `true` if the `message` should be printed in the given `timestamp`, otherwise returns `false`.


Example 1:
Input
["Logger", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage", "shouldPrintMessage"]
[[], [1, "foo"], [2, "bar"], [3, "foo"], [8, "bar"], [10, "foo"], [11, "foo"]]
Output
[null, true, true, false, false, false, true]
Explanation
Logger logger = new Logger();
logger.shouldPrintMessage(1, "foo");  // return true, next allowed timestamp for "foo" is 1 + 10 = 11
logger.shouldPrintMessage(2, "bar");  // return true, next allowed timestamp for "bar" is 2 + 10 = 12
logger.shouldPrintMessage(3, "foo");  // 3 < 11, return false
logger.shouldPrintMessage(8, "bar");  // 8 < 12, return false
logger.shouldPrintMessage(10, "foo"); // 10 < 11, return false
logger.shouldPrintMessage(11, "foo"); // 11 >= 11, return true, next allowed timestamp for "foo" is
                                      // 11 + 10 = 21

Constraints:
`0 <= timestamp <= 109`
Every `timestamp` will be passed in non-decreasing order (chronological order).

`1 <= message.length <= 30`
At most `104` calls will be made to `shouldPrintMessage`.', true, 'Easy', '/articles/logger-rate-limiter', 72.5, 
   51.3, 'https://leetcode.com/problems/logger-rate-limiter', 425, 142.1, 196, '["Google,Apple,Amazon,Bloomberg,Microsoft,Oracle"]'::jsonb, '["Hash Table,Design"]'::jsonb, 
   742, 142, 84, true, '[]'::jsonb, true),
  (360, 'Sort Transformed Array', 'Given a sorted integer array `nums` and three integers `a`, `b` and `c`, apply a quadratic function of the form `f(x) = ax2 + bx + c` to each element `nums[i]` in the array, and return the array in a sorted order.


Example 1:
Input: nums = [-4,-2,2,4], a = 1, b = 3, c = 5
Output: [3,9,15,33]

Example 2:
Input: nums = [-4,-2,2,4], a = -1, b = 3, c = 5
Output: [-23,-5,1,7]

Constraints:
`1 <= nums.length <= 200`
`-100 <= nums[i], a, b, c <= 100`
`nums` is sorted in ascending order.

Follow up: Could you solve it in `O(n)` time?', true, 'Medium', NULL, 49.9, 
   4.4, 'https://leetcode.com/problems/sort-transformed-array', 172, 39.4, 79, '["Google"]'::jsonb, '["Math,Two Pointers,Sort"]'::jsonb, 
   400, 115, 78, true, '[]'::jsonb, true),
  (361, 'Bomb Enemy', 'Given an `m x n` matrix `grid` where each cell is either a wall `''W''`, an enemy `''E''` or empty `''0''`, return the maximum enemies you can kill using one bomb. You can only place the bomb in an empty cell.

The bomb kills all the enemies in the same row and column from the planted point until it hits the wall since it is too strong to be destroyed.


Example 1:
Input: grid = [["0","E","0","0"],["E","0","W","E"],["0","E","0","0"]]
Output: 3

Example 2:
Input: grid = [["W","W","W"],["0","0","0"],["E","E","E"]]
Output: 1

Constraints:
`m == grid.length`
`n == grid[i].length`
`1 <= m, n <= 500`
`grid[i][j]` is either `''W''`, `''E''`, or `''0''`.', true, 'Medium', '/articles/bomb-enemy', 46.8, 
   5.9, 'https://leetcode.com/problems/bomb-enemy', 254, 51.5, 109.9, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   562, 76, 88, true, '[]'::jsonb, true),
  (362, 'Design Hit Counter', 'Design a hit counter which counts the number of hits received in the past `5` minutes (i.e., the past `300` seconds).

Your system should accept a `timestamp` parameter (in seconds granularity), and you may assume that calls are being made to the system in chronological order (i.e., `timestamp` is monotonically increasing). Several hits may arrive roughly at the same time.

Implement the `HitCounter` class:
`HitCounter()` Initializes the object of the hit counter system.

`void hit(int timestamp)` Records a hit that happened at `timestamp` (in seconds). Several hits may happen at the same `timestamp`.

`int getHits(int timestamp)` Returns the number of hits in the past 5 minutes from `timestamp` (i.e., the past `300` seconds).


Example 1:
Input
["HitCounter", "hit", "hit", "hit", "getHits", "hit", "getHits", "getHits"]
[[], [1], [2], [3], [4], [300], [300], [301]]
Output
[null, null, null, null, 3, null, 4, 3]
Explanation
HitCounter hitCounter = new HitCounter();
hitCounter.hit(1);       // hit at timestamp 1.

hitCounter.hit(2);       // hit at timestamp 2.

hitCounter.hit(3);       // hit at timestamp 3.

hitCounter.getHits(4);   // get hits at timestamp 4, return 3.

hitCounter.hit(300);     // hit at timestamp 300.

hitCounter.getHits(300); // get hits at timestamp 300, return 4.

hitCounter.getHits(301); // get hits at timestamp 301, return 3.


Constraints:
`1 <= timestamp <= 2 * 109`
All the calls are being made to the system in chronological order (i.e., `timestamp` is monotonically increasing).

At most `300` calls will be made to `hit` and `getHits`.

Follow up: What if the number of hits per second could be huge? Does your design scale?', true, 'Medium', '/articles/design-hit-counter', 65.5, 
   60.1, 'https://leetcode.com/problems/design-hit-counter', 699, 116.4, 177.7, '["Amazon,Microsoft,Apple,Bloomberg,Google,Yandex"]'::jsonb, '["Design"]'::jsonb, 
   1045, 96, 92, true, '[]'::jsonb, true),
  (363, 'Max Sum of Rectangle No Larger Than K', 'Given an `m x n` matrix `matrix` and an integer `k`, return the max sum of a rectangle in the matrix such that its sum is no larger than `k`.

It is guaranteed that there will be a rectangle with a sum no larger than `k`.


Example 1:
Input: matrix = [[1,0,1],[0,-2,3]], k = 2
Output: 2
Explanation: Because the sum of the blue rectangle [[0, 1], [-2, 3]] is 2, and 2 is the max number no larger than k (k = 2).


Example 2:
Input: matrix = [[2,2,-1]], k = 3
Output: 3

Constraints:
`m == matrix.length`
`n == matrix[i].length`
`1 <= m, n <= 100`
`-100 <= matrix[i][j] <= 100`
`-105 <= k <= 105`
Follow up: What if the number of rows is much larger than the number of columns?', false, 'Hard', NULL, 38.5, 
   63.2, 'https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k', 169, 53.8, 139.8, '["Roblox"]'::jsonb, '["Binary Search,Dynamic Programming,Queue"]'::jsonb, 
   1093, 80, 93, false, '[]'::jsonb, true),
  (364, 'Nested List Weight Sum II', 'You are given a nested list of integers `nestedList`. Each element is either an integer or a list whose elements may also be integers or other lists.

The depth of an integer is the number of lists that it is inside of. For example, the nested list `[1,[2,2],[[3],2],1]` has each integer''s value set to its depth. Let `maxDepth` be the maximum depth of any integer.

The weight of an integer is `maxDepth - (the depth of the integer) + 1`.

Return the sum of each integer in `nestedList` multiplied by its weight.


Example 1:
Input: nestedList = [[1,1],2,[1,1]]
Output: 8
Explanation: Four 1''s with a weight of 1, one 2 with a weight of 2.

1*1 + 1*1 + 2*2 + 1*1 + 1*1 = 8

Example 2:
Input: nestedList = [1,[4,[6]]]
Output: 17
Explanation: One 1 at depth 3, one 4 at depth 2, and one 6 at depth 1.

1*3 + 4*2 + 6*1 = 17

Constraints:
`1 <= nestedList.length <= 50`
The values of the integers in the nested list is in the range `[-100, 100]`.

The maximum depth of any integer is less than or equal to `50`.', true, 'Medium', NULL, 63.9, 
   55.1, 'https://leetcode.com/problems/nested-list-weight-sum-ii', 376, 76.8, 120.2, '["LinkedIn"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   698, 211, 77, false, '[]'::jsonb, true),
  (365, 'Water and Jug Problem', 'You are given two jugs with capacities `jug1Capacity` and `jug2Capacity` liters. There is an infinite amount of water supply available. Determine whether it is possible to measure exactly `targetCapacity` liters using these two jugs.

If `targetCapacity` liters of water are measurable, you must have `targetCapacity` liters of water contained within one or both buckets by the end.

Operations allowed:
Fill any of the jugs with water.

Empty any of the jugs.

Pour water from one jug into another till the other jug is completely full, or the first jug itself is empty.


Example 1:
Input: jug1Capacity = 3, jug2Capacity = 5, targetCapacity = 4
Output: true
Explanation: The famous Die Hard example 

Example 2:
Input: jug1Capacity = 2, jug2Capacity = 6, targetCapacity = 5
Output: false

Example 3:
Input: jug1Capacity = 1, jug2Capacity = 2, targetCapacity = 3
Output: true

Constraints:
`1 <= jug1Capacity, jug2Capacity, targetCapacity <= 106`', false, 'Medium', NULL, 31.3, 
   52.8, 'https://leetcode.com/problems/water-and-jug-problem', 193, 46.9, 149.9, '["Lyft,Google"]'::jsonb, '["Math"]'::jsonb, 
   418, 872, 32, true, '[]'::jsonb, true),
  (366, 'Find Leaves of Binary Tree', 'Given the `root` of a binary tree, collect a tree''s nodes as if you were doing this:
Collect all the leaf nodes.

Remove all the leaf nodes.

Repeat until the tree is empty.


Example 1:
Input: root = [1,2,3,4,5]
Output: [[4,5,3],[2],[1]]
Explanation:
[[3,5,4],[2],[1]] and [[3,4,5],[2],[1]] are also considered correct answers since per each level it does not matter the order on which elements are returned.


Example 2:
Input: root = [1]
Output: [[1]]

Constraints:
The number of nodes in the tree is in the range `[1, 100]`.

`1 <= Node.val <= 100`', true, 'Medium', '/articles/find-leaves-of-binary-tree', 72.1, 
   14.3, 'https://leetcode.com/problems/find-leaves-of-binary-tree', 584, 85.9, 119.1, '["LinkedIn,Amazon"]'::jsonb, '["Tree,Depth-first Search"]'::jsonb, 
   1297, 20, 98, true, '[]'::jsonb, true),
  (367, 'Valid Perfect Square', 'Given a positive integer num, write a function which returns True if num is a perfect square else False.

Follow up: Do not use any built-in library function such as `sqrt`.


Example 1:
Input: num = 16
Output: true

Example 2:
Input: num = 14
Output: false

Constraints:
`1 <= num <= 2^31 - 1`', false, 'Easy', '/articles/valid-perfect-square', 42.2, 
   10.7, 'https://leetcode.com/problems/valid-perfect-square', 999, 265.7, 629.8, '["LinkedIn,Facebook,Adobe"]'::jsonb, '["Math,Binary Search"]'::jsonb, 
   1192, 194, 86, true, '[]'::jsonb, true),
  (368, 'Largest Divisible Subset', 'Given a set of distinct positive integers `nums`, return the largest subset `answer` such that every pair `(answer[i], answer[j])` of elements in this subset satisfies:
`answer[i] % answer[j] == 0`, or
`answer[j] % answer[i] == 0`
If there are multiple solutions, return any of them.


Example 1:
Input: nums = [1,2,3]
Output: [1,2]
Explanation: [1,3] is also accepted.


Example 2:
Input: nums = [1,2,4,8]
Output: [1,2,4,8]

Constraints:
`1 <= nums.length <= 1000`
`1 <= nums[i] <= 2 * 109`
All the integers in `nums` are unique.', false, 'Medium', '/articles/largest-divisible-subset', 38.4, 
   38.7, 'https://leetcode.com/problems/largest-divisible-subset', 476, 110.3, 287.1, '["Amazon"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   1794, 89, 95, true, '[]'::jsonb, true),
  (369, 'Plus One Linked List', 'Given a non-negative integer represented as a linked list of digits, plus one to the integer.

The digits are stored such that the most significant digit is at the `head` of the list.


Example 1:
Input: head = [1,2,3]
Output: [1,2,4]

Example 2:
Input: head = [0]
Output: [1]

Constraints:
The number of nodes in the linked list is in the range `[1, 100]`.

`0 <= Node.val <= 9`
The number represented by the linked list does not contain leading zeros except for the zero itself.', true, 'Medium', '/articles/plus-one-linked-list', 59.6, 
   13.5, 'https://leetcode.com/problems/plus-one-linked-list', 469, 58.7, 98.4, '["Google,Amazon"]'::jsonb, '["Linked List,Recursion"]'::jsonb, 
   642, 37, 95, true, '[]'::jsonb, true),
  (370, 'Range Addition', 'You are given an integer `length` and an array `updates` where `updates[i] = [startIdxi, endIdxi, inci]`.

You have an array `arr` of length `length` with all zeros, and you have some operation to apply on `arr`. In the `ith` operation, you should increment all the elements `arr[startIdxi], arr[startIdxi + 1], ..., arr[endIdxi]` by `inci`.

Return `arr` after applying all the `updates`.


Example 1:
Input: length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]
Output: [-2,0,3,5,3]

Example 2:
Input: length = 10, updates = [[2,4,6],[5,6,8],[1,9,-4]]
Output: [0,-4,2,2,2,4,4,-4,-4,-4]

Constraints:
`1 <= length <= 105`
`0 <= updates.length <= 104`
`0 <= startIdxi <= endIdxi < length`
`-1000 <= inci <= 1000`', true, 'Medium', '/articles/range-addition', 63.7, 
   5.9, 'https://leetcode.com/problems/range-addition', 130, 33.6, 52.8, '["Google"]'::jsonb, '["Array"]'::jsonb, 
   660, 25, 96, true, '[]'::jsonb, true),
  (371, 'Sum of Two Integers', 'Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.


Example 1:
Input: a = 1, b = 2
Output: 3

Example 2:
Input: a = 2, b = 3
Output: 5

Constraints:
`-1000 <= a, b <= 1000`', false, 'Medium', '/articles/sum-of-two-integers', 50.6, 
   37.8, 'https://leetcode.com/problems/sum-of-two-integers', 789, 219.8, 434.4, '["Facebook"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   1627, 2688, 38, true, '[]'::jsonb, true),
  (372, 'Super Pow', 'Your task is to calculate `ab` mod `1337` where `a` is a positive integer and `b` is an extremely large positive integer given in the form of an array.


Example 1:
Input: a = 2, b = [3]
Output: 8

Example 2:
Input: a = 2, b = [1,0]
Output: 1024

Example 3:
Input: a = 1, b = [4,3,3,8,5,2]
Output: 1

Example 4:
Input: a = 2147483647, b = [2,0,0]
Output: 1198

Constraints:
`1 <= a <= 231 - 1`
`1 <= b.length <= 2000`
`0 <= b[i] <= 9`
`b` doesn''t contain leading zeros.', false, 'Medium', NULL, 36.7, 
   13, 'https://leetcode.com/problems/super-pow', 185, 40.1, 109.1, '[]'::jsonb, '[]'::jsonb, 
   300, 885, 25, false, '[]'::jsonb, true),
  (373, 'Find K Pairs with Smallest Sums', 'You are given two integer arrays `nums1` and `nums2` sorted in ascending order and an integer `k`.

Define a pair `(u, v)` which consists of one element from the first array and one element from the second array.

Return the `k` pairs `(u1, v1), (u2, v2), ..., (uk, vk)` with the smallest sums.


Example 1:
Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

Example 2:
Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [[1,1],[1,1]]
Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

Example 3:
Input: nums1 = [1,2], nums2 = [3], k = 3
Output: [[1,3],[2,3]]
Explanation: All possible pairs are returned from the sequence: [1,3],[2,3]

Constraints:
`1 <= nums1.length, nums2.length <= 104`
`-109 <= nums1[i], nums2[i] <= 109`
`nums1` and `nums2` both are sorted in ascending order.

`1 <= k <= 1000`', false, 'Medium', NULL, 37.9, 
   39.2, 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums', 518, 125.2, 330.2, '["Amazon,Walmart Labs"]'::jsonb, '["Heap"]'::jsonb, 
   1882, 127, 94, true, '[]'::jsonb, true),
  (374, 'Guess Number Higher or Lower', 'We are playing the Guess Game. The game is as follows:
I pick a number from `1` to `n`. You have to guess which number I picked.

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API `int guess(int num)`, which returns 3 possible results:
`-1`: The number I picked is lower than your guess (i.e. `pick < num`).

`1`: The number I picked is higher than your guess (i.e. `pick > num`).

`0`: The number I picked is equal to your guess (i.e. `pick == num`).

Return the number that I picked.


Example 1:
Input: n = 10, pick = 6
Output: 6

Example 2:
Input: n = 1, pick = 1
Output: 1

Example 3:
Input: n = 2, pick = 1
Output: 1

Example 4:
Input: n = 2, pick = 2
Output: 2

Constraints:
`1 <= n <= 231 - 1`
`1 <= pick <= n`', false, 'Easy', '/articles/guess-number-higher-or-lower', 45.1, 
   4.1, 'https://leetcode.com/problems/guess-number-higher-or-lower', 548, 194.5, 431.5, '["Apple"]'::jsonb, '["Binary Search"]'::jsonb, 
   580, 2057, 22, true, '[]'::jsonb, true),
  (375, 'Guess Number Higher or Lower II', 'We are playing the Guessing Game. The game will work as follows:
I pick a number between `1` and `n`.

You guess a number.

If you guess the right number, you win the game.

If you guess the wrong number, then I will tell you whether the number I picked is higher or lower, and you will continue guessing.

Every time you guess a wrong number `x`, you will pay `x` dollars. If you run out of money, you lose the game.

Given a particular `n`, return the minimum amount of money you need to guarantee a win regardless of what number I pick.


Example 1:
Input: n = 10
Output: 16
Explanation: The winning strategy is as follows:
- The range is [1,10]. Guess 7.

    - If this is my number, your total is $0. Otherwise, you pay $7.

    - If my number is higher, the range is [8,10]. Guess 9.

        - If this is my number, your total is $7. Otherwise, you pay $9.

        - If my number is higher, it must be 10. Guess 10. Your total is $7 + $9 = $16.

        - If my number is lower, it must be 8. Guess 8. Your total is $7 + $9 = $16.

    - If my number is lower, the range is [1,6]. Guess 3.

        - If this is my number, your total is $7. Otherwise, you pay $3.

        - If my number is higher, the range is [4,6]. Guess 5.

            - If this is my number, your total is $7 + $3 = $10. Otherwise, you pay $5.

            - If my number is higher, it must be 6. Guess 6. Your total is $7 + $3 + $5 = $15.

            - If my number is lower, it must be 4. Guess 4. Your total is $7 + $3 + $5 = $15.

        - If my number is lower, the range is [1,2]. Guess 1.

            - If this is my number, your total is $7 + $3 = $10. Otherwise, you pay $1.

            - If my number is higher, it must be 2. Guess 2. Your total is $7 + $3 + $1 = $11.

The worst case in all these scenarios is that you pay $16. Hence, you only need $16 to guarantee a win.


Example 2:
Input: n = 1
Output: 0
Explanation: There is only one possible number, so you can guess 1 and not have to pay anything.


Example 3:
Input: n = 2
Output: 1
Explanation: There are two possible numbers, 1 and 2.

- Guess 1.

    - If this is my number, your total is $0. Otherwise, you pay $1.

    - If my number is higher, it must be 2. Guess 2. Your total is $1.

The worst case is that you pay $1.


Constraints:
`1 <= n <= 200`', false, 'Medium', '/articles/guess-higher-or-lower-number-ii', 42.4, 
   4.5, 'https://leetcode.com/problems/guess-number-higher-or-lower-ii', 272, 75, 176.9, '["Google"]'::jsonb, '["Dynamic Programming,Minimax"]'::jsonb, 
   1013, 1481, 41, true, '[]'::jsonb, true),
  (376, 'Wiggle Subsequence', 'A wiggle sequence is a sequence where the differences between successive numbers strictly alternate between positive and negative. The first difference (if one exists) may be either positive or negative. A sequence with two or fewer elements is trivially a wiggle sequence.

For example, `[1, 7, 4, 9, 2, 5]` is a wiggle sequence because the differences `(6, -3, 5, -7, 3)` alternate between positive and negative.

In contrast, `[1, 4, 7, 2, 5]` and `[1, 7, 4, 5, 5]` are not wiggle sequences. The first is not because its first two differences are positive, and the second is not because its last difference is zero.

A subsequence is obtained by deleting some elements (possibly zero) from the original sequence, leaving the remaining elements in their original order.

Given an integer array `nums`, return the length of the longest wiggle subsequence of `nums`.


Example 1:
Input: nums = [1,7,4,9,2,5]
Output: 6
Explanation: The entire sequence is a wiggle sequence with differences (6, -3, 5, -7, 3).


Example 2:
Input: nums = [1,17,5,10,13,15,10,5,16,8]
Output: 7
Explanation: There are several subsequences that achieve this length.

One is [1, 17, 10, 13, 10, 16, 8] with differences (16, -7, 3, -3, 6, -8).


Example 3:
Input: nums = [1,2,3,4,5,6,7,8,9]
Output: 2

Constraints:
`1 <= nums.length <= 1000`
`0 <= nums[i] <= 1000`
Follow up: Could you solve this in `O(n)` time?', false, 'Medium', '/articles/wiggle-subsequence', 42.2, 
   3, 'https://leetcode.com/problems/wiggle-subsequence', 800, 102.3, 242.1, '["Microsoft"]'::jsonb, '["Dynamic Programming,Greedy"]'::jsonb, 
   1695, 79, 96, false, '[]'::jsonb, true),
  (377, 'Combination Sum IV', 'Given an array of distinct integers `nums` and a target integer `target`, return the number of possible combinations that add up to `target`.

The answer is guaranteed to fit in a 32-bit integer.


Example 1:
Input: nums = [1,2,3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.


Example 2:
Input: nums = [9], target = 3
Output: 0

Constraints:
`1 <= nums.length <= 200`
`1 <= nums[i] <= 1000`
All the elements of `nums` are unique.

`1 <= target <= 1000`
Follow up: What if negative numbers are allowed in the given array? How does it change the problem? What limitation we need to add to the question to allow negative numbers?', false, 'Medium', '/articles/combination-sum-iv', 46.2, 
   18.8, 'https://leetcode.com/problems/combination-sum-iv', 576, 154.1, 333.4, '["Bloomberg,Wish,Apple"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1975, 236, 89, true, '[]'::jsonb, true),
  (378, 'Kth Smallest Element in a Sorted Matrix', 'Given an `n x n` `matrix` where each of the rows and columns are sorted in ascending order, return the `kth` smallest element in the matrix.

Note that it is the `kth` smallest element in the sorted order, not the `kth` distinct element.


Example 1:
Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13

Example 2:
Input: matrix = [[-5]], k = 1
Output: -5

Constraints:
`n == matrix.length`
`n == matrix[i].length`
`1 <= n <= 300`
`-109 <= matrix[i][j] <= 109`
All the rows and columns of `matrix` are guaranteed to be sorted in non-degreasing order.

`1 <= k <= n2`', false, 'Medium', '/articles/kth-smallest-element-in-a-sorted-matrix', 56.4, 
   42.1, 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix', 916, 251.9, 446.4, '["Facebook,Google,Amazon"]'::jsonb, '["Binary Search,Heap"]'::jsonb, 
   3490, 180, 95, true, '[]'::jsonb, true),
  (379, 'Design Phone Directory', 'Design a phone directory that initially has `maxNumbers` empty slots that can store numbers. The directory should store numbers, check if a certain slot is empty or not, and empty a given slot.

Implement the `PhoneDirectory` class:
`PhoneDirectory(int maxNumbers)` Initializes the phone directory with the number of available slots `maxNumbers`.

`int get()` Provides a number that is not assigned to anyone. Returns `-1` if no number is available.

`bool check(int number)` Returns `true` if the slot `number` is available and `false` otherwise.

`void release(int number)` Recycles or releases the slot `number`.


Example 1:
Input
["PhoneDirectory", "get", "get", "check", "get", "check", "release", "check"]
[[3], [], [], [2], [], [2], [2], [2]]
Output
[null, 0, 1, true, 2, false, null, true]
Explanation
PhoneDirectory phoneDirectory = new PhoneDirectory(3);
phoneDirectory.get();      // It can return any available phone number. Here we assume it returns 0.

phoneDirectory.get();      // Assume it returns 1.

phoneDirectory.check(2);   // The number 2 is available, so return true.

phoneDirectory.get();      // It returns 2, the only number that is left.

phoneDirectory.check(2);   // The number 2 is no longer available, so return false.

phoneDirectory.release(2); // Release number 2 back to the pool.

phoneDirectory.check(2);   // Number 2 is available again, return true.


Constraints:
`1 <= maxNumbers <= 104`
`0 <= number < maxNumbers`
At most `2 * 104` calls will be made to `get`, `check`, and `release`.', true, 'Medium', NULL, 48.4, 
   10.4, 'https://leetcode.com/problems/design-phone-directory', 235, 44.4, 91.6, '["Google"]'::jsonb, '["Linked List,Design"]'::jsonb, 
   215, 326, 40, true, '[]'::jsonb, true),
  (380, 'Insert Delete GetRandom O(1)', 'Implement the `RandomizedSet` class:
`RandomizedSet()` Initializes the `RandomizedSet` object.

`bool insert(int val)` Inserts an item `val` into the set if not present. Returns `true` if the item was not present, `false` otherwise.

`bool remove(int val)` Removes an item `val` from the set if present. Returns `true` if the item was present, `false` otherwise.

`int getRandom()` Returns a random element from the current set of elements (it''s guaranteed that at least one element exists when this method is called). Each element must have the same probability of being returned.


Example 1:
Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]
Explanation
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.

randomizedSet.remove(2); // Returns false as 2 does not exist in the set.

randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].

randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.

randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].

randomizedSet.insert(2); // 2 was already in the set, so return false.

randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.


Constraints:
`-231 <= val <= 231 - 1`
At most `105` calls will be made to `insert`, `remove`, and `getRandom`.

There will be at least one element in the data structure when `getRandom` is called.

Follow up: Could you implement the functions of the class with each function works in average `O(1)` time?', false, 'Medium', '/articles/insert-delete-getrandom-o1', 49.1, 
   88.9, 'https://leetcode.com/problems/insert-delete-getrandom-o1', 843, 325.8, 664, '["Amazon,Bloomberg,Facebook,Twitter,Microsoft,Oracle,Affirm,Yandex,Two Sigma,HRT,LinkedIn,Nvidia,Snapchat,Databricks,Adobe,Zillow"]'::jsonb, '["Array,Hash Table,Design"]'::jsonb, 
   3479, 207, 94, true, '[]'::jsonb, true),
  (381, 'Insert Delete GetRandom O(1) - Duplicates allowed', 'Implement the `RandomizedCollection` class:
`RandomizedCollection()` Initializes the `RandomizedCollection` object.

`bool insert(int val)` Inserts an item `val` into the multiset if not present. Returns `true` if the item was not present, `false` otherwise.

`bool remove(int val)` Removes an item `val` from the multiset if present. Returns `true` if the item was present, `false` otherwise. Note that if `val` has multiple occurrences in the multiset, we only remove one of them.

`int getRandom()` Returns a random element from the current multiset of elements (it''s guaranteed that at least one element exists when this method is called). The probability of each element being returned is linearly related to the number of same values the multiset contains.


Example 1:
Input
["RandomizedCollection", "insert", "insert", "insert", "getRandom", "remove", "getRandom"]
[[], [1], [1], [2], [], [1], []]
Output
[null, true, false, true, 2, true, 1]
Explanation
RandomizedCollection randomizedCollection = new RandomizedCollection();
randomizedCollection.insert(1);   // return True. Inserts 1 to the collection. Returns true as the collection did not contain 1.

randomizedCollection.insert(1);   // return False. Inserts another 1 to the collection. Returns false as the collection contained 1. Collection now contains [1,1].

randomizedCollection.insert(2);   // return True. Inserts 2 to the collection, returns true. Collection now contains [1,1,2].

randomizedCollection.getRandom(); // getRandom should return 1 with the probability 2/3, and returns 2 with the probability 1/3.

randomizedCollection.remove(1);   // return True. Removes 1 from the collection, returns true. Collection now contains [1,2].

randomizedCollection.getRandom(); // getRandom should return 1 and 2 both equally likely.


Constraints:
`-231 <= val <= 231 - 1`
At most `105` calls will be made to `insert`, `remove`, and `getRandom`.

There will be at least one element in the data structure when `getRandom` is called.

Follow up: Could you implement the functions of the class with each function works in average `O(1)` time?', false, 'Hard', '/articles/insert-delete-getrandom-o1-duplicates-allowed', 35, 
   52.3, 'https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed', 355, 83.7, 239.2, '["Facebook,Affirm"]'::jsonb, '["Array,Hash Table,Design"]'::jsonb, 
   1111, 90, 93, true, '[]'::jsonb, true),
  (382, 'Linked List Random Node', 'Given a singly linked list, return a random node''s value from the linked list. Each node must have the same probability of being chosen.


Example 1:
Input
["Solution", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom"]
[[[1, 2, 3]], [], [], [], [], []]
Output
[null, 1, 3, 2, 2, 3]
Explanation
Solution solution = new Solution([1, 2, 3]);
solution.getRandom(); // return 1
solution.getRandom(); // return 3
solution.getRandom(); // return 2
solution.getRandom(); // return 2
solution.getRandom(); // return 3
// getRandom() should return either 1, 2, or 3 randomly. Each element should have equal probability of returning.


Constraints:
The number of nodes in the linked list will be in the range `[1, 104]`.

`-104 <= Node.val <= 104`
At most `104` calls will be made to `getRandom`.

Follow up:
What if the linked list is extremely large and its length is unknown to you?
Could you solve this efficiently without using extra space?', false, 'Medium', '/articles/linked-list-random-node', 54.3, 
   17.1, 'https://leetcode.com/problems/linked-list-random-node', 334, 104.1, 191.9, '["Amazon"]'::jsonb, '["Reservoir Sampling"]'::jsonb, 
   902, 234, 79, true, '[]'::jsonb, true),
  (383, 'Ransom Note', 'Given an arbitrary ransom note string and another string containing letters from all the magazines, write a function that will return true if the ransom note can be constructed from the magazines ; otherwise, it will return false.

Each letter in the magazine string can only be used once in your ransom note.


Example 1:
Input: ransomNote = "a", magazine = "b"
Output: false

Example 2:
Input: ransomNote = "aa", magazine = "ab"
Output: false

Example 3:
Input: ransomNote = "aa", magazine = "aab"
Output: true

Constraints:
You may assume that both strings contain only lowercase letters.', false, 'Easy', '/articles/ransom-note', 53.5, 
   28.2, 'https://leetcode.com/problems/ransom-note', 999, 258.6, 483.6, '["Spotify,Amazon,Microsoft,Visa"]'::jsonb, '["String"]'::jsonb, 
   852, 238, 78, true, '[]'::jsonb, true),
  (384, 'Shuffle an Array', 'Given an integer array `nums`, design an algorithm to randomly shuffle the array.

Implement the `Solution` class:
`Solution(int[] nums)` Initializes the object with the integer array nums.

`int[] reset()` Resets the array to its original configuration and returns it.

`int[] shuffle()` Returns a random shuffling of the array.


Example 1:
Input
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
Output
[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]
Explanation
Solution solution = new Solution([1, 2, 3]);

solution.shuffle();    // Shuffle the array [1,2,3] and return its result. Any permutation of [1,2,3] must be equally likely to be returned. Example: return [3, 1, 2]
solution.reset();      // Resets the array back to its original configuration [1,2,3]. Return [1, 2, 3]

solution.shuffle();    // Returns the random shuffling of array [1,2,3]. Example: return [1, 3, 2]

Constraints:
`1 <= nums.length <= 200`
`-106 <= nums[i] <= 106`
All the elements of `nums` are unique.

At most `5 * 104` calls will be made to `reset` and `shuffle`.', false, 'Medium', '/articles/shuffle-an-array', 54.1, 
   31.3, 'https://leetcode.com/problems/shuffle-an-array', 453, 168, 310.6, '["Google,Apple,Microsoft"]'::jsonb, '[]'::jsonb, 
   118, 145, 45, true, '[]'::jsonb, true),
  (385, 'Mini Parser', 'Given a string s represents the serialization of a nested list, implement a parser to deserialize it and return the deserialized `NestedInteger`.

Each element is either an integer or a list whose elements may also be integers or other lists.


Example 1:
Input: s = "324"
Output: 324
Explanation: You should return a NestedInteger object which contains a single integer 324.


Example 2:
Input: s = "[123,[456,[789]]]"
Output: [123,[456,[789]]]
Explanation: Return a NestedInteger object containing a nested list with 2 elements:
1. An integer containing value 123.

2. A nested list containing two elements:
    i.  An integer containing value 456.

    ii. A nested list with one element:
         a. An integer containing value 789

Constraints:
`1 <= s.length <= 5 * 104`
`s` consists of digits, square brackets `"[]"`, negative sign `''-''`, and commas `'',''`.

`s` is the serialization of valid `NestedInteger`.', false, 'Medium', NULL, 34.6, 
   6.4, 'https://leetcode.com/problems/mini-parser', 299, 42.4, 122.6, '["Google,Airbnb"]'::jsonb, '["String,Stack"]'::jsonb, 
   286, 971, 23, true, '[]'::jsonb, true),
  (386, 'Lexicographical Numbers', 'Given an integer `n`, return all the numbers in the range `[1, n]` sorted in lexicographical order.


Example 1:
Input: n = 13
Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]

Example 2:
Input: n = 2
Output: [1,2]

Constraints:
`1 <= n <= 5 * 104`
Follow up: Could you optimize your solution to use `O(n)` runtime and `O(1)` space?', false, 'Medium', NULL, 54.6, 
   41.3, 'https://leetcode.com/problems/lexicographical-numbers', 371, 64.5, 118.2, '["Pony.ai,ByteDance"]'::jsonb, '[]'::jsonb, 
   736, 91, 89, false, '[]'::jsonb, true),
  (387, 'First Unique Character in a String', 'Given a string `s`, return the first non-repeating character in it and return its index. If it does not exist, return `-1`.


Example 1:
Input: s = "leetcode"
Output: 0

Example 2:
Input: s = "loveleetcode"
Output: 2

Example 3:
Input: s = "aabb"
Output: -1

Constraints:
`1 <= s.length <= 105`
`s` consists of only lowercase English letters.', false, 'Easy', '/articles/first-unique-character-in-a-string', 53.9, 
   63.7, 'https://leetcode.com/problems/first-unique-character-in-a-string', 999, 715, 1.3, '["Bloomberg,Goldman Sachs,Amazon,Facebook,Microsoft,Google,Apple,Adobe"]'::jsonb, '["Hash Table,String"]'::jsonb, 
   2827, 140, 95, true, '[]'::jsonb, true),
  (388, 'Longest Absolute File Path', 'Suppose we have a file system that stores both files and directories. An example of one system is represented in the following picture:
Here, we have `dir` as the only directory in the root. `dir` contains two subdirectories, `subdir1` and `subdir2`. `subdir1` contains a file `file1.ext` and subdirectory `subsubdir1`. `subdir2` contains a subdirectory `subsubdir2`, which contains a file `file2.ext`.

In text form, it looks like this (with ⟶ representing the tab character):
dir
⟶ subdir1
⟶ ⟶ file1.ext
⟶ ⟶ subsubdir1
⟶ subdir2
⟶ ⟶ subsubdir2
⟶ ⟶ ⟶ file2.ext
If we were to write this representation in code, it will look like this: `"dir\\n\\tsubdir1\\n\\t\\tfile1.ext\\n\\t\\tsubsubdir1\\n\\tsubdir2\\n\\t\\tsubsubdir2\\n\\t\\t\\tfile2.ext"`. Note that the `''\\n''` and `''\\t''` are the new-line and tab characters.

Every file and directory has a unique absolute path in the file system, which is the order of directories that must be opened to reach the file/directory itself, all concatenated by `''/''s`. Using the above example, the absolute path to `file2.ext` is `"dir/subdir2/subsubdir2/file2.ext"`. Each directory name consists of letters, digits, and/or spaces. Each file name is of the form `name.extension`, where `name` and `extension` consist of letters, digits, and/or spaces.

Given a string `input` representing the file system in the explained format, return the length of the longest absolute path to a file in the abstracted file system. If there is no file in the system, return `0`.


Example 1:
Input: input = "dir\\n\\tsubdir1\\n\\tsubdir2\\n\\t\\tfile.ext"
Output: 20
Explanation: We have only one file, and the absolute path is "dir/subdir2/file.ext" of length 20.


Example 2:
Input: input = "dir\\n\\tsubdir1\\n\\t\\tfile1.ext\\n\\t\\tsubsubdir1\\n\\tsubdir2\\n\\t\\tsubsubdir2\\n\\t\\t\\tfile2.ext"
Output: 32
Explanation: We have two files:
"dir/subdir1/file1.ext" of length 21
"dir/subdir2/subsubdir2/file2.ext" of length 32.

We return 32 since it is the longest absolute path to a file.


Example 3:
Input: input = "a"
Output: 0
Explanation: We do not have any files, just a single directory named "a".


Example 4:
Input: input = "file1.txt\\nfile2.txt\\nlongfile.txt"
Output: 12
Explanation: There are 3 files at the root directory.

Since the absolute path for anything at the root directory is just the name itself, the answer is "longfile.txt" with length 12.


Constraints:
`1 <= input.length <= 104`
`input` may contain lowercase or uppercase English letters, a new line character `''\\n''`, a tab character `''\\t''`, a dot `''.''`, a space `'' ''`, and digits.', false, 'Medium', NULL, 43.1, 
   50.5, 'https://leetcode.com/problems/longest-absolute-file-path', 562, 101, 234, '["Amazon,Facebook,Google"]'::jsonb, '[]'::jsonb, 
   722, 1695, 30, true, '[]'::jsonb, true),
  (389, 'Find the Difference', 'You are given two strings `s` and `t`.

String `t` is generated by random shuffling string `s` and then add one more letter at a random position.

Return the letter that was added to `t`.


Example 1:
Input: s = "abcd", t = "abcde"
Output: "e"
Explanation: ''e'' is the letter that was added.


Example 2:
Input: s = "", t = "y"
Output: "y"

Example 3:
Input: s = "a", t = "aa"
Output: "a"

Example 4:
Input: s = "ae", t = "aea"
Output: "a"

Constraints:
`0 <= s.length <= 1000`
`t.length == s.length + 1`
`s` and `t` consist of lower-case English letters.', false, 'Easy', '/articles/find-the-difference', 57.9, 
   2.1, 'https://leetcode.com/problems/find-the-difference', 999, 257.9, 445.4, '["Google,Amazon"]'::jsonb, '["Hash Table,Bit Manipulation"]'::jsonb, 
   1234, 314, 80, true, '[]'::jsonb, true),
  (390, 'Elimination Game', 'You have a list `arr` of all integers in the range `[1, n]` sorted in a strictly increasing order. Apply the following algorithm on `arr`:
Starting from left to right, remove the first number and every other number afterward until you reach the end of the list.

Repeat the previous step again, but this time from right to left, remove the rightmost number and every other number from the remaining numbers.

Keep repeating the steps again, alternating left to right and right to left, until a single number remains.

Given the integer `n`, return the last number that remains in `arr`.


Example 1:
Input: n = 9
Output: 6
Explanation:
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
arr = [2, 4, 6, 8]
arr = [2, 6]
arr = [6]

Example 2:
Input: n = 1
Output: 1

Constraints:
`1 <= n <= 109`', false, 'Medium', NULL, 45.2, 
   44.7, 'https://leetcode.com/problems/elimination-game', 199, 37.9, 83.9, '["Goldman Sachs,Bloomberg"]'::jsonb, '[]'::jsonb, 
   560, 416, 57, false, '[]'::jsonb, true),
  (391, 'Perfect Rectangle', 'Given an array `rectangles` where `rectangles[i] = [xi, yi, ai, bi]` represents an axis-aligned rectangle. The bottom-left point of the rectangle is `(xi, yi)` and the top-right point of it is `(ai, bi)`.

Return `true` if all the rectangles together form an exact cover of a rectangular region.


Example 1:
Input: rectangles = [[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]]
Output: true
Explanation: All 5 rectangles together form an exact cover of a rectangular region.


Example 2:
Input: rectangles = [[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]]
Output: false
Explanation: Because there is a gap between the two rectangular regions.


Example 3:
Input: rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[3,2,4,4]]
Output: false
Explanation: Because there is a gap in the top center.


Example 4:
Input: rectangles = [[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]]
Output: false
Explanation: Because two of the rectangles overlap with each other.


Constraints:
`1 <= rectangles.length <= 2 * 104`
`rectangles[i].length == 4`
`-105 <= xi, yi, ai, bi <= 105`', false, 'Hard', NULL, 31.3, 
   8.1, 'https://leetcode.com/problems/perfect-rectangle', 140, 29.5, 94.3, '["Apple"]'::jsonb, '["Line Sweep"]'::jsonb, 
   461, 86, 84, true, '[]'::jsonb, true),
  (392, 'Is Subsequence', 'Given two strings `s` and `t`, check if `s` is a subsequence of `t`.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., `"ace"` is a subsequence of `"abcde"` while `"aec"` is not).


Example 1:
Input: s = "abc", t = "ahbgdc"
Output: true

Example 2:
Input: s = "axc", t = "ahbgdc"
Output: false

Constraints:
`0 <= s.length <= 100`
`0 <= t.length <= 104`
`s` and `t` consist only of lowercase English letters.

Follow up: If there are lots of incoming `s`, say `s1, s2, ..., sk` where `k >= 109`, and you want to check one by one to see if `t` has its subsequence. In this scenario, how would you change your code?', false, 'Easy', '/articles/is-subsequence', 49.6, 
   30.6, 'https://leetcode.com/problems/is-subsequence', 999, 287.7, 580.3, '["Bloomberg"]'::jsonb, '["Binary Search,Dynamic Programming,Greedy"]'::jsonb, 
   2373, 233, 91, false, '[]'::jsonb, true),
  (393, 'UTF-8 Validation', 'Given an integer array `data` representing the data, return whether it is a valid UTF-8 encoding.

A character in UTF8 can be from 1 to 4 bytes long, subjected to the following rules:
For a 1-byte character, the first bit is a `0`, followed by its Unicode code.

For an n-bytes character, the first `n` bits are all one''s, the `n + 1` bit is `0`, followed by `n - 1` bytes with the most significant `2` bits being `10`.

This is how the UTF-8 encoding would work:
`   Char. number range  |        UTF-8 octet sequence
      (hexadecimal)    |              (binary)
   --------------------+---------------------------------------------
   0000 0000-0000 007F | 0xxxxxxx
   0000 0080-0000 07FF | 110xxxxx 10xxxxxx
   0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
   0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx`
Note: The input is an array of integers. Only the least significant 8 bits of each integer is used to store the data. This means each integer represents only 1 byte of data.


Example 1:
Input: data = [197,130,1]
Output: true
Explanation: data represents the octet sequence: 11000101 10000010 00000001.

It is a valid utf-8 encoding for a 2-bytes character followed by a 1-byte character.


Example 2:
Input: data = [235,140,4]
Output: false
Explanation: data represented the octet sequence: 11101011 10001100 00000100.

The first 3 bits are all one''s and the 4th bit is 0 means it is a 3-bytes character.

The next byte is a continuation byte which starts with 10 and that''s correct.

But the second continuation byte does not start with 10, so it is invalid.


Constraints:
`1 <= data.length <= 2 * 104`
`0 <= data[i] <= 255`', false, 'Medium', '/articles/utf-8-validation', 38.1, 
   43.9, 'https://leetcode.com/problems/utf-8-validation', 281, 56.9, 149.4, '["Palantir Technologies,Facebook,Amazon"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   288, 1236, 19, true, '[]'::jsonb, true),
  (394, 'Decode String', 'Given an encoded string, return its decoded string.

The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times. Note that `k` is guaranteed to be a positive integer.

You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, `k`. For example, there won''t be input like `3a` or `2[4]`.


Example 1:
Input: s = "3[a]2[bc]"
Output: "aaabcbc"

Example 2:
Input: s = "3[a2[c]]"
Output: "accaccacc"

Example 3:
Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"

Example 4:
Input: s = "abc3[cd]xyz"
Output: "abccdcdcdxyz"

Constraints:
`1 <= s.length <= 30`
`s` consists of lowercase English letters, digits, and square brackets `''[]''`.

`s` is guaranteed to be a valid input.

All the integers in `s` are in the range `[1, 300]`.', false, 'Medium', '/articles/decode-string', 53, 
   72.9, 'https://leetcode.com/problems/decode-string', 999, 316.5, 597.7, '["Bloomberg,Google,Amazon,Oracle,ByteDance,Apple,Walmart Labs,VMware,eBay,Cisco"]'::jsonb, '["Stack,Depth-first Search"]'::jsonb, 
   4841, 229, 95, true, '[]'::jsonb, true),
  (395, 'Longest Substring with At Least K Repeating Characters', 'Given a string `s` and an integer `k`, return the length of the longest substring of `s` such that the frequency of each character in this substring is greater than or equal to `k`.


Example 1:
Input: s = "aaabb", k = 3
Output: 3
Explanation: The longest substring is "aaa", as ''a'' is repeated 3 times.


Example 2:
Input: s = "ababbc", k = 2
Output: 5
Explanation: The longest substring is "ababb", as ''a'' is repeated 2 times and ''b'' is repeated 3 times.


Constraints:
`1 <= s.length <= 104`
`s` consists of only lowercase English letters.

`1 <= k <= 105`', false, 'Medium', '/articles/longest-substring-with-at-least-k-repeating-characters', 43.6, 
   31.6, 'https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters', 546, 118.7, 272.1, '["Facebook"]'::jsonb, '["Divide and Conquer,Recursion,Sliding Window"]'::jsonb, 
   2446, 263, 90, true, '[]'::jsonb, true),
  (396, 'Rotate Function', 'You are given an integer array `nums` of length `n`.

Assume `arrk` to be an array obtained by rotating `nums` by `k` positions clock-wise. We define the rotation function `F` on `nums` as follow:
`F(k) = 0 * arrk[0] + 1 * arrk[1] + ... + (n - 1) * arrk[n - 1].`
Return the maximum value of `F(0), F(1), ..., F(n-1)`.


Example 1:
Input: nums = [4,3,2,6]
Output: 26
Explanation:
F(0) = (0 * 4) + (1 * 3) + (2 * 2) + (3 * 6) = 0 + 3 + 4 + 18 = 25
F(1) = (0 * 6) + (1 * 4) + (2 * 3) + (3 * 2) = 0 + 4 + 6 + 6 = 16
F(2) = (0 * 2) + (1 * 6) + (2 * 4) + (3 * 3) = 0 + 6 + 8 + 9 = 23
F(3) = (0 * 3) + (1 * 2) + (2 * 6) + (3 * 4) = 0 + 2 + 12 + 12 = 26
So the maximum value of F(0), F(1), F(2), F(3) is F(3) = 26.


Example 2:
Input: nums = [1000000007]
Output: 0

Constraints:
`n == nums.length`
`1 <= n <= 105`
`-231 <= nums[i] <= 231 - 1`', false, 'Medium', NULL, 36.7, 
   17.2, 'https://leetcode.com/problems/rotate-function', 235, 49.6, 135.2, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   507, 159, 76, true, '[]'::jsonb, true),
  (397, 'Integer Replacement', 'Given a positive integer `n`, you can apply one of the following operations:
If `n` is even, replace `n` with `n / 2`.

If `n` is odd, replace `n` with either `n + 1` or `n - 1`.

Return the minimum number of operations needed for `n` to become `1`.


Example 1:
Input: n = 8
Output: 3
Explanation: 8 -> 4 -> 2 -> 1

Example 2:
Input: n = 7
Output: 4
Explanation: 7 -> 8 -> 4 -> 2 -> 1
or 7 -> 6 -> 3 -> 2 -> 1

Example 3:
Input: n = 4
Output: 2

Constraints:
`1 <= n <= 231 - 1`', false, 'Medium', NULL, 33.6, 
   13.7, 'https://leetcode.com/problems/integer-replacement', 454, 64.5, 192.3, '["Google"]'::jsonb, '["Math,Bit Manipulation"]'::jsonb, 
   505, 362, 58, true, '[]'::jsonb, true),
  (398, 'Random Pick Index', 'Given an integer array `nums` with possible duplicates, randomly output the index of a given `target` number. You can assume that the given target number must exist in the array.

Implement the `Solution` class:
`Solution(int[] nums)` Initializes the object with the array `nums`.

`int pick(int target)` Picks a random index `i` from `nums` where `nums[i] == target`. If there are multiple valid i''s, then each index should have an equal probability of returning.


Example 1:
Input
["Solution", "pick", "pick", "pick"]
[[[1, 2, 3, 3, 3]], [3], [1], [3]]
Output
[null, 4, 0, 2]
Explanation
Solution solution = new Solution([1, 2, 3, 3, 3]);
solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.

solution.pick(1); // It should return 0. Since in the array only nums[0] is equal to 1.

solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.


Constraints:
`1 <= nums.length <= 2 * 104`
`-231 <= nums[i] <= 231 - 1`
`target` is an integer from `nums`.

At most `104` calls will be made to `pick`.', false, 'Medium', '/articles/random-pick-index', 58.3, 
   25.3, 'https://leetcode.com/problems/random-pick-index', 425, 117.7, 201.8, '["Facebook"]'::jsonb, '["Reservoir Sampling"]'::jsonb, 
   639, 831, 43, true, '[]'::jsonb, true),
  (399, 'Evaluate Division', 'You are given an array of variable pairs `equations` and an array of real numbers `values`, where `equations[i] = [Ai, Bi]` and `values[i]` represent the equation `Ai / Bi = values[i]`. Each `Ai` or `Bi` is a string that represents a single variable.

You are also given some `queries`, where `queries[j] = [Cj, Dj]` represents the `jth` query where you must find the answer for `Cj / Dj = ?`.

Return the answers to all queries. If a single answer cannot be determined, return `-1.0`.

Note: The input is always valid. You may assume that evaluating the queries will not result in division by zero and that there is no contradiction.


Example 1:
Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation: 
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
return: [6.0, 0.5, -1.0, 1.0, -1.0 ]

Example 2:
Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]

Example 3:
Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
Output: [0.50000,2.00000,-1.00000,-1.00000]

Constraints:
`1 <= equations.length <= 20`
`equations[i].length == 2`
`1 <= Ai.length, Bi.length <= 5`
`values.length == equations.length`
`0.0 < values[i] <= 20.0`
`1 <= queries.length <= 20`
`queries[i].length == 2`
`1 <= Cj.length, Dj.length <= 5`
`Ai, Bi, Cj, Dj` consist of lower case English letters and digits.', false, 'Medium', '/articles/evaluate-division', 54.6, 
   52.6, 'https://leetcode.com/problems/evaluate-division', 999, 179.8, 329.2, '["Bloomberg,Amazon,Uber,Google,Facebook,Microsoft,Apple"]'::jsonb, '["Union Find,Graph"]'::jsonb, 
   3334, 268, 93, true, '[]'::jsonb, true),
  (400, 'Nth Digit', 'Given an integer `n`, return the `nth` digit of the infinite integer sequence `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...]`.


Example 1:
Input: n = 3
Output: 3

Example 2:
Input: n = 11
Output: 0
Explanation: The 11th digit of the sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... is a 0, which is part of the number 10.


Constraints:
`1 <= n <= 231 - 1`', false, 'Medium', NULL, 32.4, 
   11.1, 'https://leetcode.com/problems/nth-digit', 312, 65.6, 202.4, '["Facebook"]'::jsonb, '["Math"]'::jsonb, 
   464, 1213, 28, true, '[]'::jsonb, true),
  (401, 'Binary Watch', 'A binary watch has 4 LEDs on the top which represent the hours (0-11), and the 6 LEDs on the bottom represent the minutes (0-59).

Each LED represents a zero or one, with the least significant bit on the right.

For example, the above binary watch reads "3:25".

Given a non-negative integer n which represents the number of LEDs that are currently on, return all possible times the watch could represent.


Example:
Input: n = 1Return: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
Note:
The order of output does not matter.

The hour must not contain a leading zero, for example "01:00" is not valid, it should be "1:00".

The minute must be consist of two digits and may contain a leading zero, for example "10:2" is not valid, it should be "10:02".', false, 'Easy', NULL, 48.5, 
   8.2, 'https://leetcode.com/problems/binary-watch', 713, 94.7, 195.1, '["Apple,Google"]'::jsonb, '["Backtracking,Bit Manipulation"]'::jsonb, 
   730, 1278, 36, true, '[]'::jsonb, true),
  (402, 'Remove K Digits', 'Given a non-negative integer num represented as a string, remove k digits from the number so that the new number is the smallest possible.

Note:
The length of num is less than 10002 and will be ≥ k.

The given num does not contain any leading zero.


Example 1:
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.


Example 2:
Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.


Example 3:
Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.', false, 'Medium', '/articles/remove-k-digits', 28.7, 
   36.4, 'https://leetcode.com/problems/remove-k-digits', 811, 176.4, 614.8, '["Amazon,Microsoft,Adobe,Oracle"]'::jsonb, '["Stack,Greedy"]'::jsonb, 
   3193, 136, 96, true, '[]'::jsonb, true),
  (403, 'Frog Jump', 'A frog is crossing a river. The river is divided into some number of units, and at each unit, there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water.

Given a list of `stones`'' positions (in units) in sorted ascending order, determine if the frog can cross the river by landing on the last stone. Initially, the frog is on the first stone and assumes the first jump must be `1` unit.

If the frog''s last jump was `k` units, its next jump must be either `k - 1`, `k`, or `k + 1` units. The frog can only jump in the forward direction.


Example 1:
Input: stones = [0,1,3,5,6,8,12,17]
Output: true
Explanation: The frog can jump to the last stone by jumping 1 unit to the 2nd stone, then 2 units to the 3rd stone, then 2 units to the 4th stone, then 3 units to the 6th stone, 4 units to the 7th stone, and 5 units to the 8th stone.


Example 2:
Input: stones = [0,1,2,3,4,8,9,11]
Output: false
Explanation: There is no way to jump to the last stone as the gap between the 5th and 6th stone is too large.


Constraints:
`2 <= stones.length <= 2000`
`0 <= stones[i] <= 231 - 1`
`stones[0] == 0`', false, 'Hard', '/articles/frog-jump', 41.7, 
   55.5, 'https://leetcode.com/problems/frog-jump', 675, 118.6, 284.4, '["Amazon,Microsoft,ByteDance,Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1497, 130, 92, true, '[]'::jsonb, true),
  (404, 'Sum of Left Leaves', 'Find the sum of all left leaves in a given binary tree.


Example:
    3
   / \\
  9  20
    /  \\
   15   7
There are two left leaves in the binary tree, with values 9 and 15 respectively. Return 24.', false, 'Easy', '/articles/sum-of-left-leaves', 52.3, 
   26.7, 'https://leetcode.com/problems/sum-of-left-leaves', 999, 241, 460.8, '["Adobe,Apple"]'::jsonb, '["Tree"]'::jsonb, 
   1782, 167, 91, true, '[]'::jsonb, true),
  (405, 'Convert a Number to Hexadecimal', 'Given an integer, write an algorithm to convert it to hexadecimal. For negative integer, two’s complement method is used.

Note:
All letters in hexadecimal (`a-f`) must be in lowercase.

The hexadecimal string must not contain extra leading `0`s. If the number is zero, it is represented by a single zero character `''0''`; otherwise, the first character in the hexadecimal string will not be the zero character.

The given number is guaranteed to fit within the range of a 32-bit signed integer.

You must not use any method provided by the library which converts/formats the number to hex directly.


Example 1:
Input:
26
Output:
"1a"

Example 2:
Input:
-1
Output:
"ffffffff"', false, 'Easy', NULL, 44.5, 
   13.6, 'https://leetcode.com/problems/convert-a-number-to-hexadecimal', 473, 78.6, 176.5, '["Facebook"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   590, 130, 82, true, '[]'::jsonb, true),
  (406, 'Queue Reconstruction by Height', 'You are given an array of people, `people`, which are the attributes of some people in a queue (not necessarily in order). Each `people[i] = [hi, ki]` represents the `ith` person of height `hi` with exactly `ki` other people in front who have a height greater than or equal to `hi`.

Reconstruct and return the queue that is represented by the input array `people`. The returned queue should be formatted as an array `queue`, where `queue[j] = [hj, kj]` is the attributes of the `jth` person in the queue (`queue[0]` is the person at the front of the queue).


Example 1:
Input: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
Output: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
Explanation:
Person 0 has height 5 with no other people taller or the same height in front.

Person 1 has height 7 with no other people taller or the same height in front.

Person 2 has height 5 with two persons taller or the same height in front, which is person 0 and 1.

Person 3 has height 6 with one person taller or the same height in front, which is person 1.

Person 4 has height 4 with four people taller or the same height in front, which are people 0, 1, 2, and 3.

Person 5 has height 7 with one person taller or the same height in front, which is person 1.

Hence [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] is the reconstructed queue.


Example 2:
Input: people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
Output: [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]

Constraints:
`1 <= people.length <= 2000`
`0 <= hi <= 106`
`0 <= ki < people.length`
It is guaranteed that the queue can be reconstructed.', false, 'Medium', '/articles/queue-reconstruction-by-height', 68.6, 
   27.4, 'https://leetcode.com/problems/queue-reconstruction-by-height', 738, 193, 281.3, '["Google,Facebook"]'::jsonb, '["Greedy"]'::jsonb, 
   3972, 447, 90, true, '[]'::jsonb, true),
  (407, 'Trapping Rain Water II', 'Given an `m x n` matrix of positive integers representing the height of each unit cell in a 2D elevation map, compute the volume of water it is able to trap after raining.


Example:
Given the following 3x6 height map:
[
  [1,4,3,1,3,2],
  [3,2,1,3,2,4],
  [2,3,3,2,3,1]
]
Return 4.

The above image represents the elevation map `[[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]` before the rain.

After the rain, water is trapped between the blocks. The total volume of water trapped is 4.


Constraints:
`1 <= m, n <= 110`
`0 <= heightMap[i][j] <= 20000`', false, 'Hard', NULL, 44.5, 
   36.3, 'https://leetcode.com/problems/trapping-rain-water-ii', 196, 52, 116.8, '["Google,Amazon"]'::jsonb, '["Heap,Breadth-first Search"]'::jsonb, 
   1776, 39, 98, true, '[]'::jsonb, true),
  (408, 'Valid Word Abbreviation', 'Given a non-empty string `s` and an abbreviation `abbr`, return whether the string matches with the given abbreviation.

A string such as `"word"` contains only the following valid abbreviations:
["word", "1ord", "w1rd", "wo1d", "wor1", "2rd", "w2d", "wo2", "1o1d", "1or1", "w1r1", "1o2", "2r1", "3d", "w3", "4"]
Notice that only the above abbreviations are valid abbreviations of the string `"word"`. Any other string is not a valid abbreviation of `"word"`.

Note:
Assume `s` contains only lowercase letters and `abbr` contains only lowercase letters and digits.


Example 1:
Given s = "internationalization", abbr = "i12iz4n":
Return true.


Example 2:
Given s = "apple", abbr = "a2e":
Return false.', true, 'Easy', NULL, 31.5, 
   5.1, 'https://leetcode.com/problems/valid-word-abbreviation', 260, 39, 123.8, '["Facebook"]'::jsonb, '["String"]'::jsonb, 
   187, 777, 19, true, '[]'::jsonb, true),
  (409, 'Longest Palindrome', 'Given a string `s` which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

Letters are case sensitive, for example, `"Aa"` is not considered a palindrome here.


Example 1:
Input: s = "abccccdd"
Output: 7
Explanation:
One longest palindrome that can be built is "dccaccd", whose length is 7.


Example 2:
Input: s = "a"
Output: 1

Example 3:
Input: s = "bb"
Output: 2

Constraints:
`1 <= s.length <= 2000`
`s` consists of lowercase and/or uppercase English letters only.', false, 'Easy', '/articles/longest-palindrome', 52.3, 
   19.8, 'https://leetcode.com/problems/longest-palindrome', 999, 197.9, 378.6, '["Wayfair"]'::jsonb, '["Hash Table"]'::jsonb, 
   1525, 101, 94, false, '[]'::jsonb, true),
  (410, 'Split Array Largest Sum', 'Given an array `nums` which consists of non-negative integers and an integer `m`, you can split the array into `m` non-empty continuous subarrays.

Write an algorithm to minimize the largest sum among these `m` subarrays.


Example 1:
Input: nums = [7,2,5,10,8], m = 2
Output: 18
Explanation:
There are four ways to split nums into two subarrays.

The best way is to split it into [7,2,5] and [10,8],
where the largest sum among the two subarrays is only 18.


Example 2:
Input: nums = [1,2,3,4,5], m = 2
Output: 9

Example 3:
Input: nums = [1,4,4], m = 3
Output: 4

Constraints:
`1 <= nums.length <= 1000`
`0 <= nums[i] <= 106`
`1 <= m <= min(50, nums.length)`', false, 'Hard', '/articles/split-array-largest-sum', 46.6, 
   38.9, 'https://leetcode.com/problems/split-array-largest-sum', 437, 118.5, 254, '["Amazon,Google"]'::jsonb, '["Binary Search,Dynamic Programming"]'::jsonb, 
   2522, 92, 96, true, '[]'::jsonb, true),
  (411, 'Minimum Unique Word Abbreviation', 'A string can be abbreviated by replacing any number of non-adjacent substrings with their lengths. For example, a string such as `"substitution"` could be abbreviated as (but not limited to):
`"s10n"` (`"s ubstitutio n"`)
`"sub4u4"` (`"sub stit u tion"`)
`"12"` (`"substitution"`)
`"su3i1u2on"` (`"su bst i t u ti on"`)
`"substitution"` (no substrings replaced)
Note that `"s55n"` (`"s ubsti tutio n"`) is not a valid abbreviation of `"substitution"` because the replaced substrings are adjacent.

The length of an abbreviation is the number of letters that were not replaced plus the number of substrings that were replaced. For example, the abbreviation `"s10n"` has a length of `3` (`2` letters + `1` substring) and `"su3i1u2on"` has a length of `9` (`6` letters + `3` substrings).

Given a target string `target` and an array of strings `dictionary`, return an abbreviation of `target` with the shortest possible length such that it is not an abbreviation of any string in `dictionary`. If there are multiple shortest abbreviations, return any of them.


Example 1:
Input: target = "apple", dictionary = ["blade"]
Output: "a4"
Explanation: The shortest abbreviation of "apple" is "5", but this is also an abbreviation of "blade".

The next shortest abbreviations are "a4" and "4e". "4e" is an abbreviation of blade while "a4" is not.

Hence, return "a4".


Example 2:
Input: target = "apple", dictionary = ["blade","plain","amber"]
Output: "1p3"
Explanation: "5" is an abbreviation of both "apple" but also every word in the dictionary.

"a4" is an abbreviation of "apple" but also "amber".

"4e" is an abbreviation of "apple" but also "blade".

"1p3", "2p2", and "3l1" are the next shortest abbreviations of "apple".

Since none of them are abbreviations of words in the dictionary, returning any of them is correct.


Constraints:
`target.length == m`
`dictionary.length == n`
`1 <= m <= 21`
`0 <= n <= 1000`
`1 <= dictionary[i] <= 100`
`log2(n) + m <= 21` if `n > 0`', true, 'Hard', NULL, 37.4, 
   0, 'https://leetcode.com/problems/minimum-unique-word-abbreviation', 66, 12.2, 32.5, '["Google"]'::jsonb, '["Backtracking,Bit Manipulation"]'::jsonb, 
   147, 131, 53, true, '[]'::jsonb, true),
  (412, 'Fizz Buzz', 'Write a program that outputs the string representation of numbers from 1 to n.

But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”. For numbers which are multiples of both three and five output “FizzBuzz”.


Example:
n = 15,
Return:
[
    "1",
    "2",
    "Fizz",
    "4",
    "Buzz",
    "Fizz",
    "7",
    "8",
    "Fizz",
    "Buzz",
    "11",
    "Fizz",
    "13",
    "14",
    "FizzBuzz"
]', false, 'Easy', '/articles/fizz-buzz', 63.6, 
   70.8, 'https://leetcode.com/problems/fizz-buzz', 999, 458.2, 720.6, '["Microsoft,Apple"]'::jsonb, '[]'::jsonb, 
   1305, 1510, 46, true, '[]'::jsonb, true),
  (413, 'Arithmetic Slices', 'An integer array is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.

For example, `[1,3,5,7,9]`, `[7,7,7,7]`, and `[3,-1,-5,-9]` are arithmetic sequences.

Given an integer array `nums`, return the number of arithmetic subarrays of `nums`.

A subarray is a contiguous subsequence of the array.


Example 1:
Input: nums = [1,2,3,4]
Output: 3
Explanation: We have 3 arithmetic slices in nums: [1, 2, 3], [2, 3, 4] and [1,2,3,4] itself.


Example 2:
Input: nums = [1]
Output: 0

Constraints:
`1 <= nums.length <= 5000`
`-1000 <= nums[i] <= 1000`', false, 'Medium', '/articles/arithmetic-slices', 60, 
   23.3, 'https://leetcode.com/problems/arithmetic-slices', 972, 129.6, 215.9, '["Amazon"]'::jsonb, '["Math,Dynamic Programming"]'::jsonb, 
   1718, 203, 89, true, '[]'::jsonb, true),
  (414, 'Third Maximum Number', 'Given integer array `nums`, return the third maximum number in this array. If the third maximum does not exist, return the maximum number.


Example 1:
Input: nums = [3,2,1]
Output: 1
Explanation: The third maximum is 1.


Example 2:
Input: nums = [1,2]
Output: 2
Explanation: The third maximum does not exist, so the maximum (2) is returned instead.


Example 3:
Input: nums = [2,2,3,1]
Output: 1
Explanation: Note that the third maximum here means the third maximum distinct number.

Both numbers with value 2 are both considered as second maximum.


Constraints:
`1 <= nums.length <= 104`
`-231 <= nums[i] <= 231 - 1`
Follow up: Can you find an `O(n)` solution?', false, 'Easy', '/articles/third-maximum-number', 30.7, 
   9.1, 'https://leetcode.com/problems/third-maximum-number', 999, 216, 702.7, '["Facebook"]'::jsonb, '["Array"]'::jsonb, 
   955, 1673, 36, true, '[]'::jsonb, true),
  (415, 'Add Strings', 'Given two non-negative integers, `num1` and `num2` represented as string, return the sum of `num1` and `num2` as a string.


Example 1:
Input: num1 = "11", num2 = "123"
Output: "134"

Example 2:
Input: num1 = "456", num2 = "77"
Output: "533"

Example 3:
Input: num1 = "0", num2 = "0"
Output: "0"

Constraints:
`1 <= num1.length, num2.length <= 104`
`num1` and `num2` consist of only digits.

`num1` and `num2` don''t have any leading zeros except for the zero itself.

Follow up: Could you solve it without using any built-in `BigInteger` library or converting the inputs to integer directly?', false, 'Easy', '/articles/add-strings', 48.5, 
   83.9, 'https://leetcode.com/problems/add-strings', 999, 282.5, 582.9, '["Facebook,Adobe,Google,Wayfair,Microsoft,Square,Uber,Bloomberg,Amazon,Oracle"]'::jsonb, '["String"]'::jsonb, 
   1680, 376, 82, true, '[]'::jsonb, true),
  (416, 'Partition Equal Subset Sum', 'Given a non-empty array `nums` containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.


Example 1:
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].


Example 2:
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.


Constraints:
`1 <= nums.length <= 200`
`1 <= nums[i] <= 100`', false, 'Medium', '/articles/partition-equal-subset-sum', 45, 
   39.5, 'https://leetcode.com/problems/partition-equal-subset-sum', 999, 273.4, 608, '["Amazon,Facebook"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   4194, 93, 98, true, '[]'::jsonb, true),
  (417, 'Pacific Atlantic Water Flow', 'You are given an `m x n` integer matrix `heights` representing the height of each unit cell in a continent. The Pacific ocean touches the continent''s left and top edges, and the Atlantic ocean touches the continent''s right and bottom edges.

Water can only flow in four directions: up, down, left, and right. Water flows from a cell to an adjacent one with an equal or lower height.

Return a list of grid coordinates where water can flow to both the Pacific and Atlantic oceans.


Example 1:
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

Example 2:
Input: heights = [[2,1],[1,2]]
Output: [[0,0],[0,1],[1,0],[1,1]]

Constraints:
`m == heights.length`
`n == heights[i].length`
`1 <= m, n <= 200`
`1 <= heights[i][j] <= 105`', false, 'Medium', '/articles/pacific-atlantic-water-flow', 44, 
   26.8, 'https://leetcode.com/problems/pacific-atlantic-water-flow', 579, 118.2, 268.7, '["ByteDance,Google,Amazon"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   2098, 529, 80, true, '[]'::jsonb, true),
  (418, 'Sentence Screen Fitting', 'Given a `rows x cols` screen and a sentence represented by a list of non-empty words, find how many times the given sentence can be fitted on the screen.

Note:
A word cannot be split into two lines.

The order of words in the sentence must remain unchanged.

Two consecutive words in a line must be separated by a single space.

Total words in the sentence won''t exceed 100.

Length of each word is greater than 0 and won''t exceed 10.

1 ≤ rows, cols ≤ 20,000.


Example 1:
Input:
rows = 2, cols = 8, sentence = ["hello", "world"]
Output: 
1
Explanation:
hello---
world---
The character ''-'' signifies an empty space on the screen.


Example 2:
Input:
rows = 3, cols = 6, sentence = ["a", "bcd", "e"]
Output: 
2
Explanation:
a-bcd- 
e-a---
bcd-e-
The character ''-'' signifies an empty space on the screen.


Example 3:
Input:
rows = 4, cols = 5, sentence = ["I", "had", "apple", "pie"]
Output: 
1
Explanation:
I-had
apple
pie-I
had--
The character ''-'' signifies an empty space on the screen.', true, 'Medium', NULL, 33.5, 
   17.3, 'https://leetcode.com/problems/sentence-screen-fitting', 177, 52.2, 155.9, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   562, 268, 68, true, '[]'::jsonb, true),
  (419, 'Battleships in a Board', 'Given an 2D board, count how many battleships are in it. The battleships are represented with `''X''`s, empty slots are represented with `''.''`s. You may assume the following rules:
You receive a valid board, made of only battleships or empty slots.

Battleships can only be placed horizontally or vertically. In other words, they can only be made of the shape `1xN` (1 row, N columns) or `Nx1` (N rows, 1 column), where N can be of any size.

At least one horizontal or vertical cell separates between two battleships - there are no adjacent battleships.


Example:
X..X
...X
...X
In the above board there are 2 battleships.


Invalid Example:
...X
XXXX
...X
This is an invalid board that you will not receive - as battleships will always have a cell separating between them.

Follow up:Could you do it in one-pass, using only O(1) extra memory and without modifying the value of the board?', false, 'Medium', NULL, 71.2, 
   39.6, 'https://leetcode.com/problems/battleships-in-a-board', 624, 112.3, 157.7, '["Facebook,Microsoft,Google,Twitch"]'::jsonb, '[]'::jsonb, 
   936, 593, 61, true, '[]'::jsonb, true),
  (420, 'Strong Password Checker', 'A password is considered strong if the below conditions are all met:
It has at least `6` characters and at most `20` characters.

It contains at least one lowercase letter, at least one uppercase letter, and at least one digit.

It does not contain three repeating characters in a row (i.e., `"...aaa..."` is weak, but `"...aa...a..."` is strong, assuming other conditions are met).

Given a string `password`, return the minimum number of steps required to make `password` strong. if `password` is already strong, return `0`.

In one step, you can:
Insert one character to `password`,
Delete one character from `password`, or
Replace one character of `password` with another character.


Example 1:
Input: password = "a"
Output: 5

Example 2:
Input: password = "aA1"
Output: 3

Example 3:
Input: password = "1337C0d3"
Output: 0

Constraints:
`1 <= password.length <= 50`
`password` consists of letters, digits, dot `''.''` or exclamation mark `''!''`.', false, 'Hard', NULL, 13.9, 
   80, 'https://leetcode.com/problems/strong-password-checker', 166, 17.5, 126.1, '["Google,Oracle,Microsoft"]'::jsonb, '[]'::jsonb, 
   317, 939, 25, true, '[]'::jsonb, true),
  (421, 'Maximum XOR of Two Numbers in an Array', 'Given an integer array `nums`, return the maximum result of `nums[i] XOR nums[j]`, where `0 ≤ i ≤ j < n`.

Follow up: Could you do this in `O(n)` runtime?

Example 1:
Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.


Example 2:
Input: nums = [0]
Output: 0

Example 3:
Input: nums = [2,4]
Output: 6

Example 4:
Input: nums = [8,10,2]
Output: 10

Example 5:
Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
Output: 127

Constraints:
`1 <= nums.length <= 2 * 104`
`0 <= nums[i] <= 231 - 1`', false, 'Medium', '/articles/maximum-xor-of-two-numbers-in-an-array', 54.4, 
   16.6, 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array', 395, 80.9, 148.7, '["VMware"]'::jsonb, '["Bit Manipulation,Trie"]'::jsonb, 
   2009, 213, 90, false, '[]'::jsonb, true),
  (422, 'Valid Word Square', 'Given a sequence of words, check whether it forms a valid word square.

A sequence of words forms a valid word square if the kth row and column read the exact same string, where 0 ≤ k < max(numRows, numColumns).

Note:
The number of words given is at least 1 and does not exceed 500.

Word length will be at least 1 and does not exceed 500.

Each word contains only lowercase English alphabet `a-z`.


Example 1:
Input:
[
  "abcd",
  "bnrt",
  "crmy",
  "dtye"
]
Output:
true
Explanation:
The first row and first column both read "abcd".

The second row and second column both read "bnrt".

The third row and third column both read "crmy".

The fourth row and fourth column both read "dtye".

Therefore, it is a valid word square.


Example 2:
Input:
[
  "abcd",
  "bnrt",
  "crm",
  "dt"
]
Output:
true
Explanation:
The first row and first column both read "abcd".

The second row and second column both read "bnrt".

The third row and third column both read "crm".

The fourth row and fourth column both read "dt".

Therefore, it is a valid word square.


Example 3:
Input:
[
  "ball",
  "area",
  "read",
  "lady"
]
Output:
false
Explanation:
The third row reads "read" while the third column reads "lead".

Therefore, it is NOT a valid word square.', true, 'Easy', NULL, 38.2, 
   6.2, 'https://leetcode.com/problems/valid-word-square', 183, 33.4, 87.4, '["Bloomberg"]'::jsonb, '[]'::jsonb, 
   211, 135, 61, false, '[]'::jsonb, true),
  (423, 'Reconstruct Original Digits from English', 'Given a string `s` containing an out-of-order English representation of digits `0-9`, return the digits in ascending order.


Example 1:
Input: s = "owoztneoer"
Output: "012"

Example 2:
Input: s = "fviefuro"
Output: "45"

Constraints:
`1 <= s.length <= 105`
`s[i]` is one of the characters `["e","g","f","i","h","o","n","s","r","u","t","w","v","x","z"]`.

`s` is guaranteed to be valid.', false, 'Medium', '/articles/reconstruct-original-digits-from-english', 50.9, 
   2.4, 'https://leetcode.com/problems/reconstruct-original-digits-from-english', 266, 41.3, 81.1, '["Expedia"]'::jsonb, '["Math"]'::jsonb, 
   336, 993, 25, false, '[]'::jsonb, true),
  (424, 'Longest Repeating Character Replacement', 'Given a string `s` that consists of only uppercase English letters, you can perform at most `k` operations on that string.

In one operation, you can choose any character of the string and change it to any other uppercase English character.

Find the length of the longest sub-string containing all repeating letters you can get after performing the above operations.

Note:
Both the string''s length and k will not exceed 104.


Example 1:
Input:
s = "ABAB", k = 2
Output:
4
Explanation:
Replace the two ''A''s with two ''B''s or vice versa.


Example 2:
Input:
s = "AABABBA", k = 1
Output:
4
Explanation:
Replace the one ''A'' in the middle with ''B'' and form "AABBBBA".

The substring "BBBB" has the longest repeating letters, which is 4.', false, 'Medium', NULL, 48.3, 
   47, 'https://leetcode.com/problems/longest-repeating-character-replacement', 379, 107.2, 221.9, '["Google,Amazon,Wish"]'::jsonb, '["Two Pointers,Sliding Window"]'::jsonb, 
   2272, 113, 95, true, '[]'::jsonb, true),
  (425, 'Word Squares', 'Given a set of words (without duplicates), find all word squares you can build from them.

A sequence of words forms a valid word square if the kth row and column read the exact same string, where 0 ≤ k < max(numRows, numColumns).

For example, the word sequence `["ball","area","lead","lady"]` forms a word square because each word reads the same both horizontally and vertically.

b a l l
a r e a
l e a d
l a d y
Note:
There are at least 1 and at most 1000 words.

All words will have the exact same length.

Word length is at least 1 and at most 5.

Each word contains only lowercase English alphabet `a-z`.


Example 1:
Input:
["area","lead","wall","lady","ball"]
Output:
[
  [ "wall",
    "area",
    "lead",
    "lady"
  ],
  [ "ball",
    "area",
    "lead",
    "lady"
  ]
]
Explanation:
The output consists of two word squares. The order of output does not matter (just the order of words in each word square matters).


Example 2:
Input:
["abat","baba","atan","atal"]
Output:
[
  [ "baba",
    "abat",
    "baba",
    "atan"
  ],
  [ "baba",
    "abat",
    "baba",
    "atal"
  ]
]
Explanation:
The output consists of two word squares. The order of output does not matter (just the order of words in each word square matters).', true, 'Hard', '/articles/word-squares', 50.3, 
   19.2, 'https://leetcode.com/problems/word-squares', 171, 48, 95.6, '["Bloomberg"]'::jsonb, '["Backtracking,Trie"]'::jsonb, 
   720, 45, 94, false, '[]'::jsonb, true),
  (426, 'Convert Binary Search Tree to Sorted Doubly Linked List', 'Convert a Binary Search Tree to a sorted Circular Doubly-Linked List in place.

You can think of the left and right pointers as synonymous to the predecessor and successor pointers in a doubly-linked list. For a circular doubly linked list, the predecessor of the first element is the last element, and the successor of the last element is the first element.

We want to do the transformation in place. After the transformation, the left pointer of the tree node should point to its predecessor, and the right pointer should point to its successor. You should return the pointer to the smallest element of the linked list.


Example 1:
Input: root = [4,2,5,1,3]
Output: [1,2,3,4,5]
Explanation: The figure below shows the transformed BST. The solid line indicates the successor relationship, while the dashed line means the predecessor relationship.


Example 2:
Input: root = [2,1,3]
Output: [1,2,3]

Example 3:
Input: root = []
Output: []
Explanation: Input is an empty tree. Output is also an empty Linked List.

Example 4:
Input: root = [1]
Output: [1]

Constraints:
The number of nodes in the tree is in the range `[0, 2000]`.

`-1000 <= Node.val <= 1000`
All the values of the tree are unique.', true, 'Medium', '/articles/convert-binary-search-tree-to-sorted-doubly-linked-list', 61.6, 
   53.6, 'https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list', 635, 114.8, 186.5, '["Facebook,Microsoft,Google,VMware,Amazon,Expedia"]'::jsonb, '["Linked List,Divide and Conquer,Tree"]'::jsonb, 
   1302, 117, 92, true, '[]'::jsonb, true),
  (427, 'Construct Quad Tree', 'Given a `n * n` matrix `grid` of `0''s` and `1''s` only. We want to represent the `grid` with a Quad-Tree.

Return the root of the Quad-Tree representing the `grid`.

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
The output represents the serialized format of a Quad-Tree using level order traversal, where `null` signifies a path terminator where no node exists below.

It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list `[isLeaf, val]`.

If the value of `isLeaf` or `val` is True we represent it as 1 in the list `[isLeaf, val]` and if the value of `isLeaf` or `val` is False we represent it as 0.


Example 1:
Input: grid = [[0,1],[1,0]]
Output: [[0,1],[1,0],[1,1],[1,1],[1,0]]
Explanation: The explanation of this example is shown below:
Notice that 0 represnts False and 1 represents True in the photo representing the Quad-Tree.


Example 2:
Input: grid = [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]
Output: [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
Explanation: All values in the grid are not the same. We divide the grid into four sub-grids.

The topLeft, bottomLeft and bottomRight each has the same value.

The topRight have different values so we divide it into 4 sub-grids where each has the same value.

Explanation is shown in the photo below:

Example 3:
Input: grid = [[1,1],[1,1]]
Output: [[1,1]]

Example 4:
Input: grid = [[0]]
Output: [[1,0]]

Example 5:
Input: grid = [[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]]
Output: [[0,1],[1,1],[1,0],[1,0],[1,1]]

Constraints:
`n == grid.length == grid[i].length`
`n == 2^x` where `0 <= x <= 6`', false, 'Medium', NULL, 62.7, 
   20, 'https://leetcode.com/problems/construct-quad-tree', 244, 27.6, 44.1, '["Uber"]'::jsonb, '[]'::jsonb, 
   315, 482, 40, false, '[]'::jsonb, true),
  (428, 'Serialize and Deserialize N-ary Tree', 'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize an N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that an N-ary tree can be serialized to a string and this string can be deserialized to the original tree structure.

For example, you may serialize the following `3-ary` tree
as `[1 [3[5 6] 2 4]]`. Note that this is just an example, you do not necessarily need to follow this format.

Or you can follow LeetCode''s level order traversal serialization format, where each group of children is separated by the null value.

For example, the above tree may be serialized as `[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`.

You do not necessarily need to follow the above suggested formats, there are many more different formats that work so please be creative and come up with different approaches yourself.


Constraints:
The number of nodes in the tree is in the range `[0, 104]`.

`0 <= Node.val <= 104`
The height of the n-ary tree is less than or equal to `1000`
Do not use class member/global/static variables to store states. Your encode and decode algorithms should be stateless.', true, 'Hard', '/articles/serialize-and-deserialize-n-ary-tree', 61.8, 
   39.3, 'https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree', 284, 46, 74.5, '["Microsoft,Apple,Google,Amazon"]'::jsonb, '["Tree"]'::jsonb, 
   597, 32, 95, true, '[]'::jsonb, true),
  (429, 'N-ary Tree Level Order Traversal', 'Given an n-ary tree, return the level order traversal of its nodes'' values.

Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).


Example 1:
Input: root = [1,null,3,2,4,null,5,6]
Output: [[1],[3,2,4],[5,6]]

Example 2:
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]

Constraints:
The height of the n-ary tree is less than or equal to `1000`
The total number of nodes is between `[0, 104]`', false, 'Medium', '/articles/n-ary-tree-level-order-traversal', 66.9, 
   10.8, 'https://leetcode.com/problems/n-ary-tree-level-order-traversal', 716, 101.2, 151.2, '["Amazon"]'::jsonb, '["Tree,Breadth-first Search"]'::jsonb, 
   906, 62, 94, true, '[]'::jsonb, true),
  (430, 'Flatten a Multilevel Doubly Linked List', 'You are given a doubly linked list which in addition to the next and previous pointers, it could have a child pointer, which may or may not point to a separate doubly linked list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure, as shown in the example below.

Flatten the list so that all the nodes appear in a single-level, doubly linked list. You are given the head of the first level of the list.


Example 1:
Input: head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
Output: [1,2,3,7,8,11,12,9,10,4,5,6]
Explanation:
The multilevel linked list in the input is as follows:
After flattening the multilevel linked list it becomes:

Example 2:
Input: head = [1,2,null,3]
Output: [1,3,2]
Explanation:
The input multilevel linked list is as follows:
  1---2---NULL
  |
  3---NULL

Example 3:
Input: head = []
Output: []
How multilevel linked list is represented in test case:

We use the multilevel linked list from Example 1 above:
 1---2---3---4---5---6--NULL
         |
         7---8---9---10--NULL
             |
             11--12--NULL
The serialization of each level is as follows:
[1,2,3,4,5,6,null]
[7,8,9,10,null]
[11,12,null]
To serialize all levels together we will add nulls in each level to signify no node connects to the upper node of the previous level. The serialization becomes:
[1,2,3,4,5,6,null]
[null,null,7,8,9,10,null]
[null,11,12,null]
Merging the serialization of each level and removing trailing nulls we obtain:
[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]

Constraints:
The number of Nodes will not exceed `1000`.

`1 <= Node.val <= 105`', false, 'Medium', '/articles/flatten-a-multilevel-doubly-linked-list', 57, 
   42.3, 'https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list', 999, 155, 272.1, '["Bloomberg,Facebook"]'::jsonb, '["Linked List,Depth-first Search"]'::jsonb, 
   2179, 187, 92, true, '[]'::jsonb, true),
  (431, 'Encode N-ary Tree to Binary Tree', 'Design an algorithm to encode an N-ary tree into a binary tree and decode the binary tree to get the original N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. Similarly, a binary tree is a rooted tree in which each node has no more than 2 children. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that an N-ary tree can be encoded to a binary tree and this binary tree can be decoded to the original N-nary tree structure.

Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See following example).

For example, you may encode the following `3-ary` tree to a binary tree in this way:
Input: root = [1,null,3,2,4,null,5,6]
Note that the above is just an example which might or might not work. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.


Constraints:
The height of the n-ary tree is less than or equal to `1000`
The total number of nodes is between `[0, 10^4]`
Do not use class member/global/static variables to store states. Your encode and decode algorithms should be stateless.', true, 'Hard', '/articles/encode-n-ary-tree-to-binary-tree', 74.9, 
   14.8, 'https://leetcode.com/problems/encode-n-ary-tree-to-binary-tree', 89, 11.5, 15.3, '["Flipkart"]'::jsonb, '["Tree"]'::jsonb, 
   290, 17, 94, false, '[]'::jsonb, true),
  (432, 'All O`one Data Structure', 'Implement a data structure supporting the following operations:
Inc(Key) - Inserts a new key  with value 1. Or increments an existing key by 1. Key is guaranteed to be a non-empty string.

Dec(Key) - If Key''s value is 1, remove it from the data structure. Otherwise decrements an existing key by 1. If the key does not exist, this function does nothing. Key is guaranteed to be a non-empty string.

GetMaxKey() - Returns one of the keys with maximal value. If no element exists, return an empty string `""`.

GetMinKey() - Returns one of the keys with minimal value. If no element exists, return an empty string `""`.

Challenge: Perform all these in O(1) time complexity.', false, 'Hard', NULL, 33.2, 
   49.4, 'https://leetcode.com/problems/all-oone-data-structure', 349, 39, 117.4, '["Amazon"]'::jsonb, '["Design"]'::jsonb, 
   767, 91, 89, true, '[]'::jsonb, true),
  (433, 'Minimum Genetic Mutation', 'A gene string can be represented by an 8-character long string, with choices from `"A"`, `"C"`, `"G"`, `"T"`.

Suppose we need to investigate about a mutation (mutation from "start" to "end"), where ONE mutation is defined as ONE single character changed in the gene string.

For example, `"AACCGGTT"` -> `"AACCGGTA"` is 1 mutation.

Also, there is a given gene "bank", which records all the valid gene mutations. A gene must be in the bank to make it a valid gene string.

Now, given 3 things - start, end, bank, your task is to determine what is the minimum number of mutations needed to mutate from "start" to "end". If there is no such a mutation, return -1.

Note:
Starting point is assumed to be valid, so it might not be included in the bank.

If multiple mutations are needed, all mutations during in the sequence must be valid.

You may assume start and end string is not the same.


Example 1:
start: "AACCGGTT"
end:   "AACCGGTA"
bank: ["AACCGGTA"]
return: 1

Example 2:
start: "AACCGGTT"
end:   "AAACGGTA"
bank: ["AACCGGTA", "AACCGCTA", "AAACGGTA"]
return: 2

Example 3:
start: "AAAAACCC"
end:   "AACCCCCC"
bank: ["AAAACCCC", "AAACCCCC", "AACCCCCC"]
return: 3', false, 'Medium', NULL, 43.6, 
   22.8, 'https://leetcode.com/problems/minimum-genetic-mutation', 382, 38.6, 88.6, '["Amazon"]'::jsonb, '[]'::jsonb, 
   534, 72, 88, true, '[]'::jsonb, true),
  (434, 'Number of Segments in a String', 'You are given a string `s`, return the number of segments in the string. 
A segment is defined to be a contiguous sequence of non-space characters.


Example 1:
Input: s = "Hello, my name is John"
Output: 5
Explanation: The five segments are ["Hello,", "my", "name", "is", "John"]

Example 2:
Input: s = "Hello"
Output: 1

Example 3:
Input: s = "love live! mu''sic forever"
Output: 4

Example 4:
Input: s = ""
Output: 0

Constraints:
`0 <= s.length <= 300`
`s` consists of lower-case and upper-case English letters, digits or one of the following characters `"!@#$%^&*()_+-='',.:"`.

The only space character in `s` is `'' ''`.', false, 'Easy', '/articles/number-of-segments-in-a-string', 37.7, 
   1.4, 'https://leetcode.com/problems/number-of-segments-in-a-string', 623, 91.4, 242.2, '[]'::jsonb, '[]'::jsonb, 
   291, 852, 25, false, '[]'::jsonb, true),
  (435, 'Non-overlapping Intervals', 'Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.


Example 1:
Input: [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of intervals are non-overlapping.


Example 2:
Input: [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of intervals non-overlapping.


Example 3:
Input: [[1,2],[2,3]]
Output: 0
Explanation: You don''t need to remove any of the intervals since they''re already non-overlapping.

Note:
You may assume the interval''s end point is always bigger than its start point.

Intervals like [1,2] and [2,3] have borders "touching" but they don''t overlap each other.', false, 'Medium', '/articles/non-overlapping-intervals', 43.8, 
   26.8, 'https://leetcode.com/problems/non-overlapping-intervals', 697, 135.7, 309.5, '["Facebook,ByteDance,Amazon"]'::jsonb, '["Greedy"]'::jsonb, 
   1974, 55, 97, true, '[]'::jsonb, true),
  (436, 'Find Right Interval', 'You are given an array of `intervals`, where `intervals[i] = [starti, endi]` and each `starti` is unique.

The right interval for an interval `i` is an interval `j` such that `startj`` >= endi` and `startj` is minimized.

Return an array of right interval indices for each interval `i`. If no right interval exists for interval `i`, then put `-1` at index `i`.


Example 1:
Input: intervals = [[1,2]]
Output: [-1]
Explanation: There is only one interval in the collection, so it outputs -1.


Example 2:
Input: intervals = [[3,4],[2,3],[1,2]]
Output: [-1,0,1]
Explanation: There is no right interval for [3,4].

The right interval for [2,3] is [3,4] since start0 = 3 is the smallest start that is >= end1 = 3.

The right interval for [1,2] is [2,3] since start1 = 2 is the smallest start that is >= end2 = 2.


Example 3:
Input: intervals = [[1,4],[2,3],[3,4]]
Output: [-1,2,-1]
Explanation: There is no right interval for [1,4] and [3,4].

The right interval for [2,3] is [3,4] since start2 = 3 is the smallest start that is >= end1 = 3.


Constraints:
`1 <= intervals.length <= 2 * 104`
`intervals[i].length == 2`
`-106 <= starti <= endi <= 106`
The start point of each interval is unique.', false, 'Medium', '/articles/find-right-interval', 48.6, 
   3.3, 'https://leetcode.com/problems/find-right-interval', 490, 62.8, 129.3, '[]'::jsonb, '[]'::jsonb, 
   710, 191, 79, false, '[]'::jsonb, true),
  (437, 'Path Sum III', 'You are given a binary tree in which each node contains an integer value.

Find the number of paths that sum to a given value.

The path does not need to start or end at the root or a leaf, but it must go downwards
(traveling only from parent nodes to child nodes).

The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.


Example:
root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
      10
     /  \\
    5   -3
   / \\    \\
  3   2   11
 / \\   \\
3  -2   1
Return 3. The paths that sum to 8 are:
1.  5 -> 3
2.  5 -> 2 -> 1
3. -3 -> 11', false, 'Medium', '/articles/path-sum-iii', 48.3, 
   40.7, 'https://leetcode.com/problems/path-sum-iii', 991, 263.3, 545.2, '["Amazon,ByteDance,Adobe"]'::jsonb, '["Tree"]'::jsonb, 
   4975, 323, 94, true, '[]'::jsonb, true),
  (438, 'Find All Anagrams in a String', 'Given a string s and a non-empty string p, find all the start indices of p''s anagrams in s.

Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100.

The order of output does not matter.


Example 1:
Input:
s: "cbaebabacd" p: "abc"
Output:
[0, 6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".

The substring with start index = 6 is "bac", which is an anagram of "abc".


Example 2:
Input:
s: "abab" p: "ab"
Output:
[0, 1, 2]
Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".

The substring with start index = 1 is "ba", which is an anagram of "ab".

The substring with start index = 2 is "ab", which is an anagram of "ab".', false, 'Medium', '/articles/find-all-anagrams-in-a-string', 45.2, 
   50, 'https://leetcode.com/problems/find-all-anagrams-in-a-string', 999, 348.9, 772, '["Facebook,Amazon,Bloomberg,Microsoft,Snapchat,Apple"]'::jsonb, '["Hash Table"]'::jsonb, 
   4064, 204, 95, true, '[]'::jsonb, true),
  (439, 'Ternary Expression Parser', 'Given a string representing arbitrarily nested ternary expressions, calculate the result of the expression. You can always assume that the given expression is valid and only consists of digits `0-9`, `?`, `:`, `T` and `F` (`T` and `F` represent True and False respectively).

Note:
The length of the given string is ≤ 10000.

Each number will contain only one digit.

The conditional expressions group right-to-left (as usual in most languages).

The condition will always be either `T` or `F`. That is, the condition will never be a digit.

The result of the expression will always evaluate to either a digit `0-9`, `T` or `F`.


Example 1:
Input: "T?2:3"
Output: "2"
Explanation: If true, then result is 2; otherwise result is 3.


Example 2:
Input: "F?1:T?4:5"
Output: "4"
Explanation: The conditional expressions group right-to-left. Using parenthesis, it is read/evaluated as:
             "(F ? 1 : (T ? 4 : 5))"                   "(F ? 1 : (T ? 4 : 5))"
          -> "(F ? 1 : 4)"                 or       -> "(T ? 4 : 5)"
          -> "4"                                    -> "4"

Example 3:
Input: "T?T?F:5:3"
Output: "F"
Explanation: The conditional expressions group right-to-left. Using parenthesis, it is read/evaluated as:
             "(T ? (T ? F : 5) : 3)"                   "(T ? (T ? F : 5) : 3)"
          -> "(T ? F : 3)"                 or       -> "(T ? F : 5)"
          -> "F"                                    -> "F"', true, 'Medium', NULL, 56.9, 
   0, 'https://leetcode.com/problems/ternary-expression-parser', 180, 21.6, 38, '["Snapchat"]'::jsonb, '["Stack,Depth-first Search"]'::jsonb, 
   286, 34, 89, false, '[]'::jsonb, true),
  (440, 'K-th Smallest in Lexicographical Order', 'Given integers `n` and `k`, find the lexicographically k-th smallest integer in the range from `1` to `n`.

Note: 1 ≤ k ≤ n ≤ 109.


Example:
Input:
n: 13   k: 2
Output:
10
Explanation:
The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.', false, 'Hard', NULL, 29.9, 
   10.6, 'https://leetcode.com/problems/k-th-smallest-in-lexicographical-order', 72, 15, 50.2, '["ByteDance,Hulu"]'::jsonb, '[]'::jsonb, 
   415, 60, 87, false, '[]'::jsonb, true),
  (441, 'Arranging Coins', 'You have a total of n coins that you want to form in a staircase shape, where every k-th row must have exactly k coins.

Given n, find the total number of full staircase rows that can be formed.

n is a non-negative integer and fits within the range of a 32-bit signed integer.


Example 1:
n = 5
The coins can form the following rows:
¤
¤ ¤
¤ ¤
Because the 3rd row is incomplete, we return 2.


Example 2:
n = 8
The coins can form the following rows:
¤
¤ ¤
¤ ¤ ¤
¤ ¤
Because the 4th row is incomplete, we return 3.', false, 'Easy', '/articles/arranging-coins', 42.6, 
   8, 'https://leetcode.com/problems/arranging-coins', 949, 189.8, 445.3, '["Bloomberg"]'::jsonb, '["Math,Binary Search"]'::jsonb, 
   913, 789, 54, false, '[]'::jsonb, true),
  (442, 'Find All Duplicates in an Array', 'Given an array of integers, 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

Find all the elements that appear twice in this array.

Could you do it without extra space and in O(n) runtime?

Example:
Input:
[4,3,2,7,8,2,3,1]
Output:
[2,3]', false, 'Medium', '/articles/find-all-duplicates-in-an-array', 69.1, 
   56.8, 'https://leetcode.com/problems/find-all-duplicates-in-an-array', 999, 265.2, 383.8, '["Amazon,Facebook,Microsoft,Bloomberg,Docusign"]'::jsonb, '["Array"]'::jsonb, 
   3452, 182, 95, true, '[]'::jsonb, true),
  (443, 'String Compression', 'Given an array of characters `chars`, compress it using the following algorithm:
Begin with an empty string `s`. For each group of consecutive repeating characters in `chars`:
If the group''s length is 1, append the character to `s`.

Otherwise, append the character followed by the group''s length.

The compressed string `s` should not be returned separately, but instead be stored in the input character array `chars`. Note that group lengths that are 10 or longer will be split into multiple characters in `chars`.

After you are done modifying the input array, return the new length of the array.

Follow up:
Could you solve it using only `O(1)` extra space?

Example 1:
Input: chars = ["a","a","b","b","c","c","c"]
Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".


Example 2:
Input: chars = ["a"]
Output: Return 1, and the first character of the input array should be: ["a"]
Explanation: The only group is "a", which remains uncompressed since it''s a single character.


Example 3:
Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".


Example 4:
Input: chars = ["a","a","a","b","b","a","a"]
Output: Return 6, and the first 6 characters of the input array should be: ["a","3","b","2","a","2"].
Explanation: The groups are "aaa", "bb", and "aa". This compresses to "a3b2a2". Note that each group is independent even if two groups have the same character.


Constraints:
`1 <= chars.length <= 2000`
`chars[i]` is a lower-case English letter, upper-case English letter, digit, or symbol.', false, 'Medium', '/articles/string-compression', 44.1, 
   80.1, 'https://leetcode.com/problems/string-compression', 955, 163.4, 370.4, '["Goldman Sachs,Yandex,Microsoft,Apple,Citrix,Facebook,Amazon,eBay,Redfin,Google,VMware,Cisco,Nvidia"]'::jsonb, '["String"]'::jsonb, 
   1251, 3168, 28, true, '[]'::jsonb, true),
  (444, 'Sequence Reconstruction', 'Check whether the original sequence `org` can be uniquely reconstructed from the sequences in `seqs`. The `org` sequence is a permutation of the integers from 1 to n, with 1 ≤ n ≤ 104. Reconstruction means building a shortest common supersequence of the sequences in `seqs` (i.e., a shortest sequence so that all sequences in `seqs` are subsequences of it). Determine whether there is only one sequence that can be reconstructed from `seqs` and it is the `org` sequence.


Example 1:
Input: org = [1,2,3], seqs = [[1,2],[1,3]]
Output: false
Explanation: [1,2,3] is not the only one sequence that can be reconstructed, because [1,3,2] is also a valid sequence that can be reconstructed.


Example 2:
Input: org = [1,2,3], seqs = [[1,2]]
Output: false
Explanation: The reconstructed sequence can only be [1,2].


Example 3:
Input: org = [1,2,3], seqs = [[1,2],[1,3],[2,3]]
Output: true
Explanation: The sequences [1,2], [1,3], and [2,3] can uniquely reconstruct the original sequence [1,2,3].


Example 4:
Input: org = [4,1,5,2,6,3], seqs = [[5,2,6,3],[4,1,5,2]]
Output: true

Constraints:
`1 <= n <= 10^4`
`org` is a permutation of {1,2,...,n}.

`1 <= segs[i].length <= 10^5`
`seqs[i][j]` fits in a 32-bit signed integer.

UPDATE (2017/1/8):
The seqs parameter had been changed to a list of list of strings (instead of a 2d array of strings). Please reload the code definition to get the latest changes.', true, 'Medium', NULL, 23.7, 
   4.9, 'https://leetcode.com/problems/sequence-reconstruction', 188, 36.8, 155.4, '["Google"]'::jsonb, '["Graph,Topological Sort"]'::jsonb, 
   362, 1201, 23, true, '[]'::jsonb, true),
  (445, 'Add Two Numbers II', 'You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Follow up:
What if you cannot modify the input lists? In other words, reversing the lists is not allowed.


Example:
Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 8 -> 0 -> 7', false, 'Medium', '/articles/add-two-numbers-ii', 56.5, 
   68.9, 'https://leetcode.com/problems/add-two-numbers-ii', 999, 231.2, 409.1, '["Microsoft,Amazon,Bloomberg,Facebook,Apple,Adobe,Uber,ByteDance"]'::jsonb, '["Linked List"]'::jsonb, 
   2273, 196, 92, true, '[]'::jsonb, true),
  (446, 'Arithmetic Slices II - Subsequence', 'A sequence of numbers is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.

For example, these are arithmetic sequences:
1, 3, 5, 7, 9
7, 7, 7, 7
3, -1, -5, -9
The following sequence is not arithmetic.

1, 1, 2, 5, 7
A zero-indexed array A consisting of N numbers is given. A subsequence slice of that array is any sequence of integers (P0, P1, ..., Pk) such that 0 ≤ P0 < P1 < ... < Pk < N.

A subsequence slice (P0, P1, ..., Pk) of array A is called arithmetic if the sequence A[P0], A[P1], ..., A[Pk-1], A[Pk] is arithmetic. In particular, this means that k ≥ 2.

The function should return the number of arithmetic subsequence slices in the array A.

The input contains N integers. Every integer is in the range of -231 and 231-1 and 0 ≤ N ≤ 1000. The output is guaranteed to be less than 231-1.


Example:
Input: [2, 4, 6, 8, 10]
Output: 7
Explanation:
All arithmetic subsequence slices are:
[2,4,6]
[4,6,8]
[6,8,10]
[2,4,6,8]
[4,6,8,10]
[2,4,6,8,10]
[2,6,10]', false, 'Hard', '/articles/arithmetic-slices-ii-subsequence', 33.6, 
   19.6, 'https://leetcode.com/problems/arithmetic-slices-ii-subsequence', 111, 24.9, 74.2, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   686, 66, 91, true, '[]'::jsonb, true),
  (447, 'Number of Boomerangs', 'You are given `n` `points` in the plane that are all distinct, where `points[i] = [xi, yi]`. A boomerang is a tuple of points `(i, j, k)` such that the distance between `i` and `j` equals the distance between `i` and `k` (the order of the tuple matters).

Return the number of boomerangs.


Example 1:
Input: points = [[0,0],[1,0],[2,0]]
Output: 2
Explanation: The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]].


Example 2:
Input: points = [[1,1],[2,2],[3,3]]
Output: 2

Example 3:
Input: points = [[1,1]]
Output: 0

Constraints:
`n == points.length`
`1 <= n <= 500`
`points[i].length == 2`
`-104 <= xi, yi <= 104`
All the points are unique.', false, 'Medium', NULL, 52.5, 
   0, 'https://leetcode.com/problems/number-of-boomerangs', 231, 73.1, 139.2, '["Google"]'::jsonb, '["Hash Table,Math"]'::jsonb, 
   463, 757, 38, true, '[]'::jsonb, true),
  (448, 'Find All Numbers Disappeared in an Array', 'Given an array `nums` of `n` integers where `nums[i]` is in the range `[1, n]`, return an array of all the integers in the range `[1, n]` that do not appear in `nums`.


Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]

Example 2:
Input: nums = [1,1]
Output: [2]

Constraints:
`n == nums.length`
`1 <= n <= 105`
`1 <= nums[i] <= n`
Follow up: Could you do it without extra space and in `O(n)` runtime? You may assume the returned list does not count as extra space.', false, 'Easy', '/articles/find-all-numbers-disappeared-in-an-array', 56.1, 
   39.4, 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array', 999, 360.5, 642.1, '["Amazon"]'::jsonb, '["Array"]'::jsonb, 
   4041, 291, 93, true, '[]'::jsonb, true),
  (449, 'Serialize and Deserialize BST', 'Serialization is converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on how your serialization/deserialization algorithm should work. You need to ensure that a binary search tree can be serialized to a string, and this string can be deserialized to the original tree structure.

The encoded string should be as compact as possible.


Example 1:
Input: root = [2,1,3]
Output: [2,1,3]

Example 2:
Input: root = []
Output: []

Constraints:
The number of nodes in the tree is in the range `[0, 104]`.

`0 <= Node.val <= 104`
The input tree is guaranteed to be a binary search tree.', false, 'Medium', '/articles/serialize-and-deserialize-bst', 54.3, 
   25.8, 'https://leetcode.com/problems/serialize-and-deserialize-bst', 612, 149.8, 275.9, '["Facebook,Amazon,Microsoft,ByteDance"]'::jsonb, '["Tree"]'::jsonb, 
   1898, 94, 95, true, '[]'::jsonb, true),
  (450, 'Delete Node in a BST', 'Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:
Search for a node to remove.

If the node is found, delete the node.

Follow up: Can you solve it with time complexity `O(height of tree)`?

Example 1:
Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.

One valid answer is [5,4,6,2,null,null,7], shown in the above BST.

Please notice that another valid answer is [5,2,6,null,4,null,7] and it''s also accepted.


Example 2:
Input: root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]
Explanation: The tree does not contain a node with value = 0.


Example 3:
Input: root = [], key = 0
Output: []

Constraints:
The number of nodes in the tree is in the range `[0, 104]`.

`-105 <= Node.val <= 105`
Each node has a unique value.

`root` is a valid binary search tree.

`-105 <= key <= 105`', false, 'Medium', '/articles/delete-node-in-a-bst', 45.5, 
   29.3, 'https://leetcode.com/problems/delete-node-in-a-bst', 846, 164.8, 362.5, '["Bloomberg,Oracle,Google"]'::jsonb, '["Tree"]'::jsonb, 
   2814, 107, 96, true, '[]'::jsonb, true),
  (451, 'Sort Characters By Frequency', 'Given a string, sort it in decreasing order based on the frequency of characters.


Example 1:
Input:
"tree"
Output:
"eert"
Explanation:
''e'' appears twice while ''r'' and ''t'' both appear once.

So ''e'' must appear before both ''r'' and ''t''. Therefore "eetr" is also a valid answer.


Example 2:
Input:
"cccaaa"
Output:
"cccaaa"
Explanation:
Both ''c'' and ''a'' appear three times, so "aaaccc" is also a valid answer.

Note that "cacaca" is incorrect, as the same characters must be together.


Example 3:
Input:
"Aabb"
Output:
"bbAa"
Explanation:
"bbaA" is also a valid answer, but "Aabb" is incorrect.

Note that ''A'' and ''a'' are treated as two different characters.', false, 'Medium', '/articles/sort-characters-by-frequency', 64.6, 
   28.4, 'https://leetcode.com/problems/sort-characters-by-frequency', 999, 248.6, 384.7, '["Bloomberg,Amazon,Facebook"]'::jsonb, '["Hash Table,Heap"]'::jsonb, 
   2246, 147, 94, true, '[]'::jsonb, true),
  (452, 'Minimum Number of Arrows to Burst Balloons', 'There are some spherical balloons spread in two-dimensional space. For each balloon, provided input is the start and end coordinates of the horizontal diameter. Since it''s horizontal, y-coordinates don''t matter, and hence the x-coordinates of start and end of the diameter suffice. The start is always smaller than the end.

An arrow can be shot up exactly vertically from different points along the x-axis. A balloon with `xstart` and `xend` bursts by an arrow shot at `x` if `xstart ≤ x ≤ xend`. There is no limit to the number of arrows that can be shot. An arrow once shot keeps traveling up infinitely.

Given an array `points` where `points[i] = [xstart, xend]`, return the minimum number of arrows that must be shot to burst all balloons.


Example 1:
Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: One way is to shoot one arrow for example at x = 6 (bursting the balloons [2,8] and [1,6]) and another arrow at x = 11 (bursting the other two balloons).


Example 2:
Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4

Example 3:
Input: points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2

Constraints:
`0 <= points.length <= 104`
`points[i].length == 2`
`-231 <= xstart < xend <= 231 - 1`', false, 'Medium', '/articles/minimum-number-of-arrows-to-burst-balloons', 49.8, 
   25.3, 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons', 658, 111.2, 223.3, '["Facebook,Google"]'::jsonb, '["Greedy,Sort"]'::jsonb, 
   1681, 62, 96, true, '[]'::jsonb, true),
  (453, 'Minimum Moves to Equal Array Elements', 'Given an integer array `nums` of size `n`, return the minimum number of moves required to make all array elements equal.

In one move, you can increment `n - 1` elements of the array by `1`.


Example 1:
Input: nums = [1,2,3]
Output: 3
Explanation: Only three moves are needed (remember each move increments two elements):
[1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]

Example 2:
Input: nums = [1,1,1]
Output: 0

Constraints:
`n == nums.length`
`1 <= nums.length <= 104`
`-109 <= nums[i] <= 109`', false, 'Easy', '/articles/minimum-moves-to-equal-array-elements', 50.9, 
   64.1, 'https://leetcode.com/problems/minimum-moves-to-equal-array-elements', 363, 90.1, 177, '["JPMorgan,Microsoft,Apple,Swiggy"]'::jsonb, '["Math"]'::jsonb, 
   788, 1141, 41, true, '[]'::jsonb, true),
  (454, '4Sum II', 'Given four lists A, B, C, D of integer values, compute how many tuples `(i, j, k, l)` there are such that `A[i] + B[j] + C[k] + D[l]` is zero.

To make problem a bit easier, all A, B, C, D have same length of N where 0 ≤ N ≤ 500. All integers are in the range of -228 to 228 - 1 and the result is guaranteed to be at most 231 - 1.


Example:
Input:
A = [ 1, 2]
B = [-2,-1]
C = [-1, 2]
D = [ 0, 2]
Output:
2
Explanation:
The two tuples are:
1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0', false, 'Medium', '/articles/4sum-ii', 54.6, 
   37.1, 'https://leetcode.com/problems/4sum-ii', 536, 159.1, 291.1, '["Amazon"]'::jsonb, '["Hash Table,Binary Search"]'::jsonb, 
   1879, 84, 96, true, '[]'::jsonb, true),
  (455, 'Assign Cookies', 'Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child `i` has a greed factor `g[i]`, which is the minimum size of a cookie that the child will be content with; and each cookie `j` has a size `s[j]`. If `s[j] >= g[i]`, we can assign the cookie `j` to the child `i`, and the child `i` will be content. Your goal is to maximize the number of your content children and output the maximum number.


Example 1:
Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.

You need to output 1.


Example 2:
Input: g = [1,2], s = [1,2,3]
Output: 2
Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. 
You have 3 cookies and their sizes are big enough to gratify all of the children, 
You need to output 2.


Constraints:
`1 <= g.length <= 3 * 104`
`0 <= s.length <= 3 * 104`
`1 <= g[i], s[j] <= 231 - 1`', false, 'Easy', NULL, 50.4, 
   2.8, 'https://leetcode.com/problems/assign-cookies', 522, 119.3, 236.6, '["Amazon"]'::jsonb, '["Greedy"]'::jsonb, 
   842, 116, 88, true, '[]'::jsonb, true),
  (456, '132 Pattern', 'Given an array of `n` integers `nums`, a 132 pattern is a subsequence of three integers `nums[i]`, `nums[j]` and `nums[k]` such that `i < j < k` and `nums[i] < nums[k] < nums[j]`.

Return `true` if there is a 132 pattern in `nums`, otherwise, return `false`.

Follow up: The `O(n^2)` is trivial, could you come up with the `O(n logn)` or the `O(n)` solution?

Example 1:
Input: nums = [1,2,3,4]
Output: false
Explanation: There is no 132 pattern in the sequence.


Example 2:
Input: nums = [3,1,4,2]
Output: true
Explanation: There is a 132 pattern in the sequence: [1, 4, 2].


Example 3:
Input: nums = [-1,3,2,0]
Output: true
Explanation: There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].


Constraints:
`n == nums.length`
`1 <= n <= 104`
`-109 <= nums[i] <= 109`', false, 'Medium', '/articles/132-pattern', 30.7, 
   20.1, 'https://leetcode.com/problems/132-pattern', 313, 86.2, 280.6, '["Amazon"]'::jsonb, '["Stack"]'::jsonb, 
   2232, 143, 94, true, '[]'::jsonb, true),
  (457, 'Circular Array Loop', 'You are playing a game involving a circular array of non-zero integers `nums`. Each `nums[i]` denotes the number of indices forward/backward you must move if you are located at index `i`:
If `nums[i]` is positive, move `nums[i]` steps forward, and
If `nums[i]` is negative, move `nums[i]` steps backward.

Since the array is circular, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element.

A cycle in the array consists of a sequence of indices `seq` of length `k` where:
Following the movement rules above results in the repeating index sequence `seq[0] -> seq[1] -> ... -> seq[k - 1] -> seq[0] -> ...`
Every `nums[seq[j]]` is either all positive or all negative.

`k > 1`
Return `true` if there is a cycle in `nums`, or `false` otherwise.


Example 1:
Input: nums = [2,-1,1,2,2]
Output: true
Explanation:
There is a cycle from index 0 -> 2 -> 3 -> 0 -> ...

The cycle''s length is 3.


Example 2:
Input: nums = [-1,2]
Output: false
Explanation:
The sequence from index 1 -> 1 -> 1 -> ... is not a cycle because the sequence''s length is 1.

By definition the sequence''s length must be strictly greater than 1 to be a cycle.


Example 3:
Input: nums = [-2,1,-1,-2,-2]
Output: false
Explanation:
The sequence from index 1 -> 2 -> 1 -> ... is not a cycle because nums[1] is positive, but nums[2] is negative.

Every nums[seq[j]] must be either all positive or all negative.


Constraints:
`1 <= nums.length <= 5000`
`-1000 <= nums[i] <= 1000`
`nums[i] != 0`
Follow up: Could you solve it in `O(n)` time complexity and `O(1)` extra space complexity?', false, 'Medium', NULL, 30.3, 
   28.4, 'https://leetcode.com/problems/circular-array-loop', 494, 44.6, 146.9, '["Apple"]'::jsonb, '["Array,Two Pointers"]'::jsonb, 
   36, 41, 47, true, '[]'::jsonb, true),
  (458, 'Poor Pigs', 'There are `buckets` buckets of liquid, where exactly one of the buckets is poisonous. To figure out which one is poisonous, you feed some number of (poor) pigs the liquid to see whether they will die or not. Unfortunately, you only have `minutesToTest` minutes to determine which bucket is poisonous.

You can feed the pigs according to these steps:
Choose some live pigs to feed.

For each pig, choose which buckets to feed it. The pig will consume all the chosen buckets simultaneously and will take no time.

Wait for `minutesToDie` minutes. You may not feed any other pigs during this time.

After `minutesToDie` minutes have passed, any pigs that have been fed the poisonous bucket will die, and all others will survive.

Repeat this process until you run out of time.

Given `buckets`, `minutesToDie`, and `minutesToTest`, return the minimum number of pigs needed to figure out which bucket is poisonous within the allotted time.


Example 1:
Input: buckets = 1000, minutesToDie = 15, minutesToTest = 60
Output: 5

Example 2:
Input: buckets = 4, minutesToDie = 15, minutesToTest = 15
Output: 2

Example 3:
Input: buckets = 4, minutesToDie = 15, minutesToTest = 30
Output: 2

Constraints:
`1 <= buckets <= 1000`
`1 <= minutesToDie <= minutesToTest <= 100`', false, 'Hard', '/articles/poor-pigs', 54.6, 
   14, 'https://leetcode.com/problems/poor-pigs', 137, 30.9, 56.5, '[]'::jsonb, '[]'::jsonb, 
   548, 1035, 35, false, '[]'::jsonb, true),
  (459, 'Repeated Substring Pattern', 'Given a string `s`, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.


Example 1:
Input: s = "abab"
Output: true
Explanation: It is the substring "ab" twice.


Example 2:
Input: s = "aba"
Output: false

Example 3:
Input: s = "abcabcabcabc"
Output: true
Explanation: It is the substring "abc" four times or the substring "abcabc" twice.


Constraints:
`1 <= s.length <= 104`
`s` consists of lowercase English letters.', false, 'Easy', '/articles/repeated-substring-pattern', 43.3, 
   23.2, 'https://leetcode.com/problems/repeated-substring-pattern', 884, 189.8, 437.8, '["Google"]'::jsonb, '["String"]'::jsonb, 
   2344, 239, 91, true, '[]'::jsonb, true),
  (460, 'LFU Cache', 'Design and implement a data structure for a Least Frequently Used (LFU) cache.

Implement the `LFUCache` class:
`LFUCache(int capacity)` Initializes the object with the `capacity` of the data structure.

`int get(int key)` Gets the value of the `key` if the `key` exists in the cache. Otherwise, returns `-1`.

`void put(int key, int value)` Update the value of the `key` if present, or inserts the `key` if not already present. When the cache reaches its `capacity`, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used `key` would be invalidated.

To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.

When a key is first inserted into the cache, its use counter is set to `1` (due to the `put` operation). The use counter for a key in the cache is incremented either a `get` or `put` operation is called on it.


Example 1:
Input
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]
Explanation
// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // return 1
                 // cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.

                 // cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.

                 // cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4);      // return 4
                 // cache=[3,4], cnt(4)=2, cnt(3)=3

Constraints:
`0 <= capacity, key, value <= 104`
At most `105` calls will be made to `get` and `put`.

Follow up: Could you do both operations in `O(1)` time complexity?', false, 'Hard', NULL, 36.4, 
   81.8, 'https://leetcode.com/problems/lfu-cache', 675, 103.5, 284.3, '["Amazon,Microsoft,Google,Citadel,Bloomberg,Salesforce,Twitch"]'::jsonb, '["Design"]'::jsonb, 
   1935, 150, 93, true, '[]'::jsonb, true),
  (461, 'Hamming Distance', 'The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given two integers `x` and `y`, calculate the Hamming distance.

Note:
0 ≤ `x`, `y` < 231.


Example:
Input: x = 1, y = 4
Output: 2
Explanation:
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
The above arrows point to positions where the corresponding bits are different.', false, 'Easy', '/articles/hamming-distance', 73.3, 
   10.4, 'https://leetcode.com/problems/hamming-distance', 999, 391.9, 535, '["Adobe"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   2160, 177, 92, false, '[]'::jsonb, true),
  (462, 'Minimum Moves to Equal Array Elements II', 'Given a non-empty integer array, find the minimum number of moves required to make all array elements equal, where a move is incrementing a selected element by 1 or decrementing a selected element by 1.

You may assume the array''s length is at most 10,000.


Example:
Input:
[1,2,3]
Output:
2
Explanation:
Only two moves are needed (remember each move increments or decrements one element):
[1,2,3]  =>  [2,2,3]  =>  [2,2,2]', false, 'Medium', '/articles/minimum-moves-to-equal-array-elements-ii', 54.4, 
   27.8, 'https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii', 258, 52.1, 95.7, '["Microsoft"]'::jsonb, '["Math"]'::jsonb, 
   652, 54, 92, false, '[]'::jsonb, true),
  (463, 'Island Perimeter', 'You are given `row x col` `grid` representing a map where `grid[i][j] = 1` represents land and `grid[i][j] = 0` represents water.

Grid cells are connected horizontally/vertically (not diagonally). The `grid` is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn''t have "lakes", meaning the water inside isn''t connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don''t exceed 100. Determine the perimeter of the island.


Example 1:
Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16
Explanation: The perimeter is the 16 yellow stripes in the image above.


Example 2:
Input: grid = [[1]]
Output: 4

Example 3:
Input: grid = [[1,0]]
Output: 4

Constraints:
`row == grid.length`
`col == grid[i].length`
`1 <= row, col <= 100`
`grid[i][j]` is `0` or `1`.', false, 'Easy', '/articles/island-perimeter', 66.8, 
   26.5, 'https://leetcode.com/problems/island-perimeter', 999, 267.2, 399.9, '["Facebook"]'::jsonb, '["Hash Table"]'::jsonb, 
   2665, 138, 95, true, '[]'::jsonb, true),
  (464, 'Can I Win', 'In the "100 game" two players take turns adding, to a running total, any integer from `1` to `10`. The player who first causes the running total to reach or exceed 100 wins.

What if we change the game so that players cannot re-use integers?
For example, two players might take turns drawing from a common pool of numbers from 1 to 15 without replacement until they reach a total >= 100.

Given two integers maxChoosableInteger and desiredTotal, return `true` if the first player to move can force a win, otherwise return `false`. Assume both players play optimally.


Example 1:
Input: maxChoosableInteger = 10, desiredTotal = 11
Output: false
Explanation:
No matter which integer the first player choose, the first player will lose.

The first player can choose an integer from 1 up to 10.

If the first player choose 1, the second player can only choose integers from 2 up to 10.

The second player will win by choosing 10 and get a total = 11, which is >= desiredTotal.

Same with other integers chosen by the first player, the second player will always win.


Example 2:
Input: maxChoosableInteger = 10, desiredTotal = 0
Output: true

Example 3:
Input: maxChoosableInteger = 10, desiredTotal = 1
Output: true

Constraints:
`1 <= maxChoosableInteger <= 20`
`0 <= desiredTotal <= 300`', false, 'Medium', NULL, 29.7, 
   25.4, 'https://leetcode.com/problems/can-i-win', 241, 61.1, 205.6, '["LinkedIn"]'::jsonb, '["Dynamic Programming,Minimax"]'::jsonb, 
   1285, 204, 86, false, '[]'::jsonb, true),
  (465, 'Optimal Account Balancing', 'A group of friends went on holiday and sometimes lent each other money. For example, Alice paid for Bill''s lunch for $10. Then later Chris gave Alice $5 for a taxi ride. We can model each transaction as a tuple (x, y, z) which means person x gave person y $z. Assuming Alice, Bill, and Chris are person 0, 1, and 2 respectively (0, 1, 2 are the person''s ID), the transactions can be represented as `[[0, 1, 10], [2, 0, 5]]`.

Given a list of transactions between a group of people, return the minimum number of transactions required to settle the debt.

Note:
A transaction will be given as a tuple (x, y, z). Note that `x ≠ y` and `z > 0`.

Person''s IDs may not be linear, e.g. we could have the persons 0, 1, 2 or we could also have the persons 0, 2, 6.


Example 1:
Input:
[[0,1,10], [2,0,5]]
Output:
2
Explanation:
Person #0 gave person #1 $10.

Person #2 gave person #0 $5.

Two transactions are needed. One way to settle the debt is person #1 pays person #0 and #2 $5 each.


Example 2:
Input:
[[0,1,10], [1,0,1], [1,2,5], [2,0,5]]
Output:
1
Explanation:
Person #0 gave person #1 $10.

Person #1 gave person #0 $1.

Person #1 gave person #2 $5.

Person #2 gave person #0 $5.

Therefore, person #1 only need to give person #0 $4, and all debt is settled.', true, 'Hard', NULL, 48.4, 
   53.5, 'https://leetcode.com/problems/optimal-account-balancing', 136, 46.6, 96.2, '["Google,Uber"]'::jsonb, '[]'::jsonb, 
   759, 74, 91, true, '[]'::jsonb, true),
  (466, 'Count The Repetitions', 'Define `S = [s,n]` as the string S which consists of n connected strings s. For example, `["abc", 3]` ="abcabcabc". 
On the other hand, we define that string s1 can be obtained from string s2 if we can remove some characters from s2 such that it becomes s1. For example, “abc”  can be obtained from “abdbec” based on our definition, but it can not be obtained from “acbbe”.

You are given two non-empty strings s1 and s2 (each at most 100 characters long) and two integers 0 ≤ n1 ≤ 106 and 1 ≤ n2 ≤ 106. Now consider the strings S1 and S2, where `S1=[s1,n1]` and `S2=[s2,n2]`. Find the maximum integer M such that `[S2,M]` can be obtained from `S1`.


Example:
Input:
s1="acb", n1=4
s2="ab", n2=2
Return:
2', false, 'Hard', '/articles/count-the-repetitions', 28.6, 
   17.2, 'https://leetcode.com/problems/count-the-repetitions', 73, 12.3, 42.8, '["Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   218, 200, 52, true, '[]'::jsonb, true),
  (467, 'Unique Substrings in Wraparound String', 'Consider the string `s` to be the infinite wraparound string of "abcdefghijklmnopqrstuvwxyz", so `s` will look like this: "...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd....".

Now we have another string `p`. Your job is to find out how many unique non-empty substrings of `p` are present in `s`. In particular, your input is the string `p` and you need to output the number of different non-empty substrings of `p` in the string `s`.

Note: `p` consists of only lowercase English letters and the size of p might be over 10000.


Example 1:
Input: "a"
Output: 1
Explanation: Only the substring "a" of string "a" is in the string s.


Example 2:
Input: "cac"
Output: 2
Explanation: There are two substrings "a", "c" of string "cac" in the string s.


Example 3:
Input: "zab"
Output: 6
Explanation: There are six substrings "z", "a", "b", "za", "ab", "zab" of string "zab" in the string s.', false, 'Medium', NULL, 36.1, 
   19.6, 'https://leetcode.com/problems/unique-substrings-in-wraparound-string', 150, 29.3, 81.2, '["Google,MAQ Software"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   774, 100, 89, true, '[]'::jsonb, true),
  (468, 'Validate IP Address', 'Given a string `IP`, return `"IPv4"` if IP is a valid IPv4 address, `"IPv6"` if IP is a valid IPv6 address or `"Neither"` if IP is not a correct IP of any type.

A valid IPv4 address is an IP in the form `"x1.x2.x3.x4"` where `0 <= xi <= 255` and `xi` cannot contain leading zeros. For example, `"192.168.1.1"` and `"192.168.1.0"` are valid IPv4 addresses but `"192.168.01.1"`, while `"192.168.1.00"` and `"192.168@1.1"` are invalid IPv4 addresses.

A valid IPv6 address is an IP in the form `"x1:x2:x3:x4:x5:x6:x7:x8"` where:
`1 <= xi.length <= 4`
`xi` is a hexadecimal string which may contain digits, lower-case English letter (`''a''` to `''f''`) and upper-case English letters (`''A''` to `''F''`).

Leading zeros are allowed in `xi`.

For example, "`2001:0db8:85a3:0000:0000:8a2e:0370:7334"` and "`2001:db8:85a3:0:0:8A2E:0370:7334"` are valid IPv6 addresses, while "`2001:0db8:85a3::8A2E:037j:7334"` and "`02001:0db8:85a3:0000:0000:8a2e:0370:7334"` are invalid IPv6 addresses.


Example 1:
Input: IP = "172.16.254.1"
Output: "IPv4"
Explanation: This is a valid IPv4 address, return "IPv4".


Example 2:
Input: IP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
Output: "IPv6"
Explanation: This is a valid IPv6 address, return "IPv6".


Example 3:
Input: IP = "256.256.256.256"
Output: "Neither"
Explanation: This is neither a IPv4 address nor a IPv6 address.


Example 4:
Input: IP = "2001:0db8:85a3:0:0:8A2E:0370:7334:"
Output: "Neither"

Example 5:
Input: IP = "1e1.4.5.6"
Output: "Neither"

Constraints:
`IP` consists only of English letters, digits and the characters `''.''` and `'':''`.', false, 'Medium', '/articles/validate-ip-address', 25.1, 
   44.1, 'https://leetcode.com/problems/validate-ip-address', 683, 98, 390.2, '["Cisco,Facebook,Microsoft,Oracle"]'::jsonb, '["String"]'::jsonb, 
   467, 1981, 19, true, '[]'::jsonb, true),
  (469, 'Convex Polygon', 'Given a list of points that form a polygon when joined sequentially, find if this polygon is convex (Convex polygon definition).

Note:
There are at least 3 and at most 10,000 points.

Coordinates are in the range -10,000 to 10,000.

You may assume the polygon formed by given points is always a simple polygon (Simple polygon definition). In other words, we ensure that exactly two edges intersect at each vertex, and that edges otherwise don''t intersect each other.


Example 1:
[[0,0],[0,1],[1,1],[1,0]]
Answer: True
Explanation:

Example 2:
[[0,0],[0,10],[10,10],[10,0],[5,5]]
Answer: False
Explanation:', true, 'Medium', NULL, 37.6, 
   0, 'https://leetcode.com/problems/convex-polygon', 47, 8.8, 23.5, '["Google"]'::jsonb, '["Math"]'::jsonb, 
   73, 196, 27, true, '[]'::jsonb, true),
  (470, 'Implement Rand10() Using Rand7()', 'Given the API `rand7()` that generates a uniform random integer in the range `[1, 7]`, write a function `rand10()` that generates a uniform random integer in the range `[1, 10]`. You can only call the API `rand7()`, and you shouldn''t call any other API. Please do not use a language''s built-in random API.

Each test case will have one internal argument `n`, the number of times that your implemented function `rand10()` will be called while testing. Note that this is not an argument passed to `rand10()`.

Follow up:
What is the expected value for the number of calls to `rand7()` function?
Could you minimize the number of calls to `rand7()`?

Example 1:
Input: n = 1
Output: [2]

Example 2:
Input: n = 2
Output: [2,8]

Example 3:
Input: n = 3
Output: [3,8,10]

Constraints:
`1 <= n <= 105`', false, 'Medium', '/articles/implement-rand10-using-rand7', 46.1, 
   34.1, 'https://leetcode.com/problems/implement-rand10-using-rand7', 233, 48.6, 105.6, '["Apple,Microsoft"]'::jsonb, '["Random,Rejection Sampling"]'::jsonb, 
   690, 231, 75, true, '[]'::jsonb, true),
  (471, 'Encode String with Shortest Length', 'Given a non-empty string, encode the string such that its encoded length is the shortest.

The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times.

Note:
`k` will be a positive integer.

If an encoding process does not make the string shorter, then do not encode it. If there are several solutions, return any of them.


Example 1:
Input: s = "aaa"
Output: "aaa"
Explanation: There is no way to encode it such that it is shorter than the input string, so we do not encode it.


Example 2:
Input: s = "aaaaa"
Output: "5[a]"
Explanation: "5[a]" is shorter than "aaaaa" by 1 character.


Example 3:
Input: s = "aaaaaaaaaa"
Output: "10[a]"
Explanation: "a9[a]" or "9[a]a" are also valid solutions, both of them have the same length = 5, which is the same as "10[a]".


Example 4:
Input: s = "aabcaabcd"
Output: "2[aabc]d"
Explanation: "aabc" occurs twice, so one answer can be "2[aabc]d".


Example 5:
Input: s = "abbbabbbcabbbabbbc"
Output: "2[2[abbb]c]"
Explanation: "abbbabbbc" occurs twice, but "abbbabbbc" can also be encoded to "2[abbb]c", so one answer can be "2[2[abbb]c]".


Constraints:
`1 <= s.length <= 150`
`s` consists of only lowercase English letters.', true, 'Hard', NULL, 49.6, 
   48.5, 'https://leetcode.com/problems/encode-string-with-shortest-length', 83, 23.4, 47.2, '["Google,Amazon"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   472, 26, 95, true, '[]'::jsonb, true),
  (472, 'Concatenated Words', 'Given an array of strings `words` (without duplicates), return all the concatenated words in the given list of `words`.

A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.


Example 1:
Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats"; 
"dogcatsdog" can be concatenated by "dog", "cats" and "dog"; 
"ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".


Example 2:
Input: words = ["cat","dog","catdog"]
Output: ["catdog"]

Constraints:
`1 <= words.length <= 104`
`0 <= words[i].length <= 1000`
`words[i]` consists of only lowercase English letters.

`0 <= sum(words[i].length) <= 6 * 105`', false, 'Hard', NULL, 43.7, 
   50.3, 'https://leetcode.com/problems/concatenated-words', 471, 90.3, 206.5, '["Amazon"]'::jsonb, '["Dynamic Programming,Depth-first Search,Trie"]'::jsonb, 
   1133, 146, 89, true, '[]'::jsonb, true),
  (473, 'Matchsticks to Square', 'Remember the story of Little Match Girl? By now, you know exactly what matchsticks the little match girl has, please find out a way you can make one square by using up all those matchsticks. You should not break any stick, but you can link them up, and each matchstick must be used exactly one time.

 Your input will be several matchsticks the girl has, represented with their stick length. Your output will either be true or false, to represent whether you could make one square using all the matchsticks the little match girl has.


Example 1:
Input: [1,1,2,2,2]
Output: true
Explanation: You can form a square with length 2, one side of the square came two sticks with length 1.


Example 2:
Input: [3,3,3,3,4]
Output: false
Explanation: You cannot find a way to form a square with all the matchsticks.

Note:
The length sum of the given matchsticks is in the range of `0` to `10^9`.

The length of the given matchstick array will not exceed `15`.', false, 'Medium', '/articles/matchsticks-to-square', 38.2, 
   8.8, 'https://leetcode.com/problems/matchsticks-to-square', 202, 43.5, 113.7, '["Amazon"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   764, 66, 92, true, '[]'::jsonb, true),
  (474, 'Ones and Zeroes', 'You are given an array of binary strings `strs` and two integers `m` and `n`.

Return the size of the largest subset of `strs` such that there are at most `m` `0`''s and `n` `1`''s in the subset.

A set `x` is a subset of a set `y` if all elements of `x` are also elements of `y`.


Example 1:
Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0''s and 3 1''s is {"10", "0001", "1", "0"}, so the answer is 4.

Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.

{"111001"} is an invalid subset because it contains 4 1''s, greater than the maximum of 3.


Example 2:
Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.


Constraints:
`1 <= strs.length <= 600`
`1 <= strs[i].length <= 100`
`strs[i]` consists only of digits `''0''` and `''1''`.

`1 <= m, n <= 100`', false, 'Medium', '/articles/ones-and-zeroes', 44.1, 
   0.9, 'https://leetcode.com/problems/ones-and-zeroes', 376, 79.6, 180.3, '["Google"]'::jsonb, '["Dynamic Programming"]'::jsonb, 
   1798, 291, 86, true, '[]'::jsonb, true),
  (475, 'Heaters', 'Winter is coming! During the contest, your first job is to design a standard heater with a fixed warm radius to warm all the houses.

Every house can be warmed, as long as the house is within the heater''s warm radius range. 
Given the positions of `houses` and `heaters` on a horizontal line, return the minimum radius standard of heaters so that those heaters could cover all houses.

Notice that all the `heaters` follow your radius standard, and the warm radius will the same.


Example 1:
Input: houses = [1,2,3], heaters = [2]
Output: 1
Explanation: The only heater was placed in the position 2, and if we use the radius 1 standard, then all the houses can be warmed.


Example 2:
Input: houses = [1,2,3,4], heaters = [1,4]
Output: 1
Explanation: The two heater was placed in the position 1 and 4. We need to use radius 1 standard, then all the houses can be warmed.


Example 3:
Input: houses = [1,5], heaters = [2]
Output: 3

Constraints:
`1 <= houses.length, heaters.length <= 3 * 104`
`1 <= houses[i], heaters[i] <= 109`', false, 'Medium', NULL, 33.7, 
   8.8, 'https://leetcode.com/problems/heaters', 386, 73.2, 217, '["Google"]'::jsonb, '["Binary Search"]'::jsonb, 
   890, 928, 49, true, '[]'::jsonb, true),
  (476, 'Number Complement', 'Given a positive integer `num`, output its complement number. The complement strategy is to flip the bits of its binary representation.


Example 1:
Input: num = 5
Output: 2
Explanation: The binary representation of 5 is 101 (no leading zero bits), and its complement is 010. So you need to output 2.


Example 2:
Input: num = 1
Output: 0
Explanation: The binary representation of 1 is 1 (no leading zero bits), and its complement is 0. So you need to output 0.


Constraints:
The given integer `num` is guaranteed to fit within the range of a 32-bit signed integer.

`num >= 1`
You could assume no leading zero bit in the integer’s binary representation.

This question is the same as 1009: https://leetcode.com/problems/complement-of-base-10-integer/', false, 'Easy', '/articles/number-complement', 65.2, 
   8.1, 'https://leetcode.com/problems/number-complement', 999, 210.1, 322.3, '["Apple,Cloudera"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   1143, 86, 93, true, '[]'::jsonb, true),
  (477, 'Total Hamming Distance', 'The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Now your job is to find the total Hamming distance between all pairs of the given numbers.


Example:
Input: 4, 14, 2
Output: 6
Explanation: In binary representation, the 4 is 0100, 14 is 1110, and 2 is 0010 (just
showing the four bits relevant in this case). So the answer will be:
HammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.

Note:
Elements of the given array are in the range of `0 ` to `10^9`
Length of the array will not exceed `10^4`.', false, 'Medium', '/articles/total-hamming-distance', 50.7, 
   4.4, 'https://leetcode.com/problems/total-hamming-distance', 281, 71.5, 141.1, '["Facebook"]'::jsonb, '["Bit Manipulation"]'::jsonb, 
   1092, 66, 94, true, '[]'::jsonb, true),
  (478, 'Generate Random Point in a Circle', 'Given the radius and the position of the center of a circle, implement the function `randPoint` which generates a uniform random point inside the circle.

Implement the `Solution` class:
`Solution(double radius, double x_center, double y_center)` initializes the object with the radius of the circle `radius` and the position of the center `(x_center, y_center)`.

`randPoint()` returns a random point inside the circle. A point on the circumference of the circle is considered to be in the circle. The answer is returned as an array `[x, y]`.


Example 1:
Input
["Solution", "randPoint", "randPoint", "randPoint"]
[[1.0, 0.0, 0.0], [], [], []]
Output
[null, [-0.02493, -0.38077], [0.82314, 0.38945], [0.36572, 0.17248]]
Explanation
Solution solution = new Solution(1.0, 0.0, 0.0);
solution.randPoint(); // return [-0.02493, -0.38077]
solution.randPoint(); // return [0.82314, 0.38945]
solution.randPoint(); // return [0.36572, 0.17248]

Constraints:
`0 < radius <= 108`
`-107 <= x_center, y_center <= 107`
At most `3 * 104` calls will be made to `randPoint`.', false, 'Medium', '/articles/generate-random-point-in-a-circle', 39.1, 
   0, 'https://leetcode.com/problems/generate-random-point-in-a-circle', 155, 29.3, 74.8, '["Leap Motion"]'::jsonb, '["Math,Random,Rejection Sampling"]'::jsonb, 
   311, 595, 34, false, '[]'::jsonb, true),
  (479, 'Largest Palindrome Product', 'Find the largest palindrome made from the product of two n-digit numbers.

Since the result could be very large, you should return the largest palindrome mod 1337.


Example:
Input: 2
Output: 987
Explanation: 99 x 91 = 9009, 9009 % 1337 = 987
Note:
The range of n is [1,8].', false, 'Hard', NULL, 29.7, 
   43, 'https://leetcode.com/problems/largest-palindrome-product', 83, 18, 60.6, '["Yahoo"]'::jsonb, '[]'::jsonb, 
   100, 1372, 7, false, '[]'::jsonb, true),
  (480, 'Sliding Window Median', 'Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle value.


Examples:
`[2,3,4]` , the median is `3`
`[2,3]`, the median is `(2 + 3) / 2 = 2.5`
Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Your job is to output the median array for each window in the original array.

For example,
Given nums = `[1,3,-1,-3,5,3,6,7]`, and k = 3.

Window position                Median
---------------               -----
[1  3  -1] -3  5  3  6  7       1
 1 [3  -1  -3] 5  3  6  7       -1
 1  3 [-1  -3  5] 3  6  7       -1
 1  3  -1 [-3  5  3] 6  7       3
 1  3  -1  -3 [5  3  6] 7       5
 1  3  -1  -3  5 [3  6  7]      6
Therefore, return the median sliding window as `[1,-1,-1,3,5,6]`.

Note: 
You may assume `k` is always valid, ie: `k` is always smaller than input array''s size for non-empty array.

Answers within `10^-5` of the actual value will be accepted as correct.', false, 'Hard', '/articles/sliding-window-median', 38.9, 
   53.2, 'https://leetcode.com/problems/sliding-window-median', 435, 73.5, 188.8, '["Facebook,Spotify,JPMorgan,Google,Amazon,Flipkart,Adobe"]'::jsonb, '["Sliding Window"]'::jsonb, 
   1357, 97, 93, true, '[]'::jsonb, true),
  (481, 'Magical String', 'A magical string S consists of only ''1'' and ''2'' and obeys the following rules:
The string S is magical because concatenating the number of contiguous occurrences of characters ''1'' and ''2'' generates the string S itself.

The first few elements of string S is the following:
S = "1221121221221121122......"
If we group the consecutive ''1''s and ''2''s in S, it will be:
1   22  11  2  1  22  1  22  11  2  11  22 ......

and the occurrences of ''1''s or ''2''s in each group are:
1   2	   2    1   1    2     1    2     2    1    2    2 ......

You can see that the occurrence sequence above is the S itself. 
Given an integer N as input, return the number of ''1''s in the first N number in the magical string S.

Note:
N will not exceed 100,000.


Example 1:
Input: 6
Output: 3
Explanation: The first 6 elements of magical string S is "12211" and it contains three 1''s, so return 3.', false, 'Medium', NULL, 48.1, 
   18.1, 'https://leetcode.com/problems/magical-string', 152, 24.2, 50.4, '["Google"]'::jsonb, '[]'::jsonb, 
   128, 756, 14, true, '[]'::jsonb, true),
  (482, 'License Key Formatting', 'You are given a license key represented as a string S which consists only alphanumeric character and dashes. The string is separated into N+1 groups by N dashes.

Given a number K, we would want to reformat the strings such that each group contains exactly K characters, except for the first group which could be shorter than K, but still must contain at least one character. Furthermore, there must be a dash inserted between two groups and all lowercase letters should be converted to uppercase.

Given a non-empty string S and a number K, format the string according to the rules described above.


Example 1:
Input: S = "5F3Z-2e-9-w", K = 4
Output: "5F3Z-2E9W"
Explanation: The string S has been split into two parts, each part has 4 characters.

Note that the two extra dashes are not needed and can be removed.


Example 2:
Input: S = "2-5g-3-J", K = 2
Output: "2-5G-3J"
Explanation: The string S has been split into three parts, each part has 2 characters except the first part as it could be shorter as mentioned above.

Note:
The length of string S will not exceed 12,000, and K is a positive integer.

String S consists only of alphanumerical characters (a-z and/or A-Z and/or 0-9) and dashes(-).

String S is non-empty.', false, 'Easy', NULL, 43.1, 
   17.6, 'https://leetcode.com/problems/license-key-formatting', 718, 162.3, 376.3, '["Capital One"]'::jsonb, '[]'::jsonb, 
   578, 873, 40, false, '[]'::jsonb, true),
  (483, 'Smallest Good Base', 'For an integer n, we call k>=2 a good base of n, if all digits of n base k are 1.

Now given a string representing n, you should return the smallest good base of n in string format.


Example 1:
Input: "13"
Output: "3"
Explanation: 13 base 3 is 111.


Example 2:
Input: "4681"
Output: "8"
Explanation: 4681 base 8 is 11111.


Example 3:
Input: "1000000000000000000"
Output: "999999999999999999"
Explanation: 1000000000000000000 base 999999999999999999 is 11.

Note:
The range of n is [3, 10^18].

The string representing n is always valid and will not have leading zeros.', false, 'Hard', NULL, 36.3, 
   0, 'https://leetcode.com/problems/smallest-good-base', 55, 14.3, 39.3, '["Google"]'::jsonb, '["Math,Binary Search"]'::jsonb, 
   193, 367, 34, true, '[]'::jsonb, true),
  (484, 'Find Permutation', 'By now, you are given a secret signature consisting of character ''D'' and ''I''. ''D'' represents a decreasing relationship between two numbers, ''I'' represents an increasing relationship between two numbers. And our secret signature was constructed by a special integer array, which contains uniquely all the different number from 1 to n (n is the length of the secret signature plus 1). For example, the secret signature "DI" can be constructed by array [2,1,3] or [3,1,2], but won''t be constructed by array [3,2,4] or [2,1,3,4], which are both illegal constructing special string that can''t represent the "DI" secret signature.

On the other hand, now your job is to find the lexicographically smallest permutation of [1, 2, ... n] could refer to the given secret signature in the input.


Example 1:
Input: "I"
Output: [1,2]
Explanation: [1,2] is the only legal initial spectial string can construct secret signature "I", where the number 1 and 2 construct an increasing relationship.


Example 2:
Input: "DI"
Output: [2,1,3]
Explanation: Both [2,1,3] and [3,1,2] can construct the secret signature "DI", but since we want to find the one with the smallest lexicographical permutation, you need to output [2,1,3]
Note:
The input string will only contain the character ''D'' and ''I''.

The length of input string is a positive integer and will not exceed 10,000', true, 'Medium', '/articles/find-permutation', 64.3, 
   0, 'https://leetcode.com/problems/find-permutation', 137, 24.9, 38.7, '["Google"]'::jsonb, '["Greedy"]'::jsonb, 
   431, 69, 86, true, '[]'::jsonb, true),
  (485, 'Max Consecutive Ones', 'Given a binary array, find the maximum number of consecutive 1s in this array.


Example 1:
Input: [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s.

    The maximum number of consecutive 1s is 3.

Note:
The input array will only contain `0` and `1`.

The length of input array is a positive integer and will not exceed 10,000', false, 'Easy', '/articles/max-consecutive-ones', 52.6, 
   18.9, 'https://leetcode.com/problems/max-consecutive-ones', 999, 380.4, 722.6, '["Google,Amazon"]'::jsonb, '["Array"]'::jsonb, 
   1182, 382, 76, true, '[]'::jsonb, true),
  (486, 'Predict the Winner', 'Given an array of scores that are non-negative integers. Player 1 picks one of the numbers from either end of the array followed by the player 2 and then player 1 and so on. Each time a player picks a number, that number will not be available for the next player. This continues until all the scores have been chosen. The player with the maximum score wins.

Given an array of scores, predict whether player 1 is the winner. You can assume each player plays to maximize his score.


Example 1:
Input: [1, 5, 2]
Output: False
Explanation: Initially, player 1 can choose between 1 and 2. 
If he chooses 2 (or 1), then player 2 can choose from 1 (or 2) and 5. If player 2 chooses 5, then player 1 will be left with 1 (or 2). 
So, final score of player 1 is 1 + 2 = 3, and player 2 is 5. 
Hence, player 1 will never be the winner and you need to return False.


Example 2:
Input: [1, 5, 233, 7]
Output: True
Explanation: Player 1 first chooses 1. Then player 2 have to choose between 5 and 7. No matter which number player 2 choose, player 1 can choose 233.

Finally, player 1 has more score (234) than player 2 (12), so you need to return True representing player1 can win.


Constraints:
1 <= length of the array <= 20.

Any scores in the given array are non-negative integers and will not exceed 10,000,000.

If the scores of both players are equal, then player 1 is still the winner.', false, 'Medium', '/articles/predict-the-winner', 49, 
   5.6, 'https://leetcode.com/problems/predict-the-winner', 495, 85.6, 174.6, '["Google,Uber,Amazon"]'::jsonb, '["Dynamic Programming,Minimax"]'::jsonb, 
   1874, 108, 95, true, '[]'::jsonb, true),
  (487, 'Max Consecutive Ones II', 'Given a binary array, find the maximum number of consecutive 1s in this array if you can flip at most one 0.


Example 1:
Input: [1,0,1,1,0]
Output: 4
Explanation: Flip the first zero will get the the maximum number of consecutive 1s.

    After flipping, the maximum number of consecutive 1s is 4.

Note:
The input array will only contain `0` and `1`.

The length of input array is a positive integer and will not exceed 10,000
Follow up:
What if the input numbers come in one by one as an infinite stream? In other words, you can''t store all numbers coming from the stream as it''s too large to hold in memory. Could you solve it efficiently?', true, 'Medium', '/articles/max-consecutive-ones-ii', 48, 
   13.8, 'https://leetcode.com/problems/max-consecutive-ones-ii', 373, 54.7, 113.9, '["Yandex,Zillow"]'::jsonb, '["Two Pointers"]'::jsonb, 
   692, 13, 98, false, '[]'::jsonb, true),
  (488, 'Zuma Game', 'Think about Zuma Game. You have a row of balls on the table, colored red(R), yellow(Y), blue(B), green(G), and white(W). You also have several balls in your hand.

Each time, you may choose a ball in your hand, and insert it into the row (including the leftmost place and rightmost place). Then, if there is a group of 3 or more balls in the same color touching, remove these balls. Keep doing this until no more balls can be removed.

Find the minimal balls you have to insert to remove all the balls on the table. If you cannot remove all the balls, output -1.


Example 1:
Input: board = "WRRBBW", hand = "RB"
Output: -1
Explanation: WRRBBW -> WRR[R]BBW -> WBBW -> WBB[B]W -> WW

Example 2:
Input: board = "WWRRBBWW", hand = "WRBRW"
Output: 2
Explanation: WWRRBBWW -> WWRR[R]BBWW -> WWBBWW -> WWBB[B]WW -> WWWW -> empty

Example 3:
Input: board = "G", hand = "GGGGG"
Output: 2
Explanation: G -> G[G] -> GG[G] -> empty 

Example 4:
Input: board = "RBYYBBRRB", hand = "YRBGB"
Output: 3
Explanation: RBYYBBRRB -> RBYY[Y]BBRRB -> RBBBRRB -> RRRB -> B -> B[B] -> BB[B] -> empty 

Constraints:
You may assume that the initial row of balls on the table won’t have any 3 or more consecutive balls with the same color.

`1 <= board.length <= 16`
`1 <= hand.length <= 5`
Both input strings will be non-empty and only contain characters ''R'',''Y'',''B'',''G'',''W''.', false, 'Hard', NULL, 38.2, 
   42.5, 'https://leetcode.com/problems/zuma-game', 143, 16.5, 43.2, '["Salesforce,Bloomberg"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   277, 301, 48, false, '[]'::jsonb, true),
  (489, 'Robot Room Cleaner', 'Given a robot cleaner in a room modeled as a grid.

Each cell in the grid can be empty or blocked.

The robot cleaner with 4 given APIs can move forward, turn left or turn right. Each turn it made is 90 degrees.

When it tries to move into a blocked cell, its bumper sensor detects the obstacle and it stays on the current cell.

Design an algorithm to clean the entire room using only the 4 given APIs shown below.

interface Robot {
  // returns true if next cell is open and robot moves into the cell.

  // returns false if next cell is obstacle and robot stays on the current cell.

  boolean move();
  // Robot will stay on the same cell after calling turnLeft/turnRight.

  // Each turn will be 90 degrees.

  void turnLeft();
  void turnRight();
  // Clean the current cell.

  void clean();
}

Example:
Input:
room = [
  [1,1,1,1,1,0,1,1],
  [1,1,1,1,1,0,1,1],
  [1,0,1,1,1,1,1,1],
  [0,0,0,1,0,0,0,0],
  [1,1,1,1,1,1,1,1]
],
row = 1,
col = 3
Explanation:
All grids in the room are marked by either 0 or 1.

0 means the cell is blocked, while 1 means the cell is accessible.

The robot initially starts at the position of row=1, col=3.

From the top left corner, its position is one row below and three columns right.

Notes:
The input is only given to initialize the room and the robot''s position internally. You must solve this problem "blindfolded". In other words, you must control the robot using only the mentioned 4 APIs, without knowing the room layout and the initial robot''s position.

The robot''s initial position will always be in an accessible cell.

The initial direction of the robot will be facing up.

All accessible cells are connected, which means the all cells marked as 1 will be accessible by the robot.

Assume all four edges of the grid are all surrounded by wall.', true, 'Hard', '/articles/robot-room-cleaner', 72.9, 
   53.7, 'https://leetcode.com/problems/robot-room-cleaner', 269, 76.5, 105, '["Facebook,Google,Amazon"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   1478, 85, 95, true, '[]'::jsonb, true),
  (490, 'The Maze', 'There is a ball in a `maze` with empty spaces (represented as `0`) and walls (represented as `1`). The ball can go through the empty spaces by rolling up, down, left or right, but it won''t stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the `m x n` `maze`, the ball''s `start` position and the `destination`, where `start = [startrow, startcol]` and `destination = [destinationrow, destinationcol]`, return `true` if the ball can stop at the destination, otherwise return `false`.

You may assume that the borders of the maze are all walls (see examples).


Example 1:
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
Output: true
Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.


Example 2:
Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
Output: false
Explanation: There is no way for the ball to stop at the destination. Notice that you can pass through the destination but you cannot stop there.


Example 3:
Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]
Output: false

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

The maze contains at least 2 empty spaces.', true, 'Medium', '/articles/the-maze', 52.9, 
   37.2, 'https://leetcode.com/problems/the-maze', 368, 85, 160.7, '["Amazon,Microsoft,Bloomberg"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   983, 113, 90, true, '[]'::jsonb, true),
  (491, 'Increasing Subsequences', 'Given an integer array, your task is to find all the different possible increasing subsequences of the given array, and the length of an increasing subsequence should be at least 2.


Example:
Input: [4, 6, 7, 7]
Output: [[4, 6], [4, 7], [4, 6, 7], [4, 6, 7, 7], [6, 7], [6, 7, 7], [7,7], [4,7,7]]

Constraints:
The length of the given array will not exceed 15.

The range of integer in the given array is [-100,100].

The given array may contain duplicates, and two equal integers should also be considered as a special case of increasing sequence.', false, 'Medium', NULL, 47.7, 
   6.9, 'https://leetcode.com/problems/increasing-subsequences', 294, 56.5, 118.3, '["Google"]'::jsonb, '["Depth-first Search"]'::jsonb, 
   959, 135, 88, true, '[]'::jsonb, true),
  (492, 'Construct the Rectangle', 'A web developer needs to know how to design a web page''s size. So, given a specific rectangular web page’s area, your job by now is to design a rectangular web page, whose length L and width W satisfy the following requirements:
The area of the rectangular web page you designed must equal to the given target area.

The width `W` should not be larger than the length `L`, which means `L >= W`.

The difference between length `L` and width `W` should be as small as possible.

Return an array `[L, W]` where `L` and `W` are the length and width of the web page you designed in sequence.


Example 1:
Input: area = 4
Output: [2,2]
Explanation: The target area is 4, and all the possible ways to construct it are [1,4], [2,2], [4,1]. 
But according to requirement 2, [1,4] is illegal; according to requirement 3,  [4,1] is not optimal compared to [2,2]. So the length L is 2, and the width W is 2.


Example 2:
Input: area = 37
Output: [37,1]

Example 3:
Input: area = 122122
Output: [427,286]

Constraints:
`1 <= area <= 107`', false, 'Easy', NULL, 50.6, 
   1.5, 'https://leetcode.com/problems/construct-the-rectangle', 278, 64.2, 126.9, '[]'::jsonb, '[]'::jsonb, 
   265, 287, 48, false, '[]'::jsonb, true),
  (493, 'Reverse Pairs', 'Given an array `nums`, we call `(i, j)` an important reverse pair if `i < j` and `nums[i] > 2*nums[j]`.

You need to return the number of important reverse pairs in the given array.


Example1:
Input: [1,3,2,3,1]
Output: 2

Example2:
Input: [2,4,3,5,1]
Output: 3
Note:
The length of the given array will not exceed `50,000`.

All the numbers in the input array are in the range of 32-bit integer.', false, 'Hard', '/articles/reverse-pairs', 27.1, 
   51, 'https://leetcode.com/problems/reverse-pairs', 291, 53.2, 196, '["ByteDance,Amazon,Google"]'::jsonb, '["Binary Search,Divide and Conquer,Sort,Binary Indexed Tree,Segment Tree"]'::jsonb, 
   1330, 140, 90, true, '[]'::jsonb, true),
  (494, 'Target Sum', 'You are given a list of non-negative integers, a1, a2, ..., an, and a target, S. Now you have 2 symbols `+` and `-`. For each integer, you should choose one from `+` and `-` as its new symbol.

Find out how many ways to assign symbols to make sum of integers equal to target S.


Example 1:
Input: nums is [1, 1, 1, 1, 1], S is 3. 
Output: 5
Explanation: 
-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3
There are 5 ways to assign symbols to make the sum of nums be target 3.


Constraints:
The length of the given array is positive and will not exceed 20.

The sum of elements in the given array will not exceed 1000.

Your output answer is guaranteed to be fitted in a 32-bit integer.', false, 'Medium', '/articles/target-sum', 45.6, 
   28.3, 'https://leetcode.com/problems/target-sum', 843, 227, 497.5, '["Facebook,Amazon,Adobe"]'::jsonb, '["Dynamic Programming,Depth-first Search"]'::jsonb, 
   3937, 161, 96, true, '[]'::jsonb, true),
  (495, 'Teemo Attacking', 'In LOL world, there is a hero called Teemo and his attacking can make his enemy Ashe be in poisoned condition. Now, given the Teemo''s attacking ascending time series towards Ashe and the poisoning time duration per Teemo''s attacking, you need to output the total time that Ashe is in poisoned condition.

You may assume that Teemo attacks at the very beginning of a specific time point, and makes Ashe be in poisoned condition immediately.


Example 1:
Input: [1,4], 2
Output: 4
Explanation: At time point 1, Teemo starts attacking Ashe and makes Ashe be poisoned immediately. 
This poisoned status will last 2 seconds until the end of time point 2. 
And at time point 4, Teemo attacks Ashe again, and causes Ashe to be in poisoned status for another 2 seconds. 
So you finally need to output 4.


Example 2:
Input: [1,2], 2
Output: 3
Explanation: At time point 1, Teemo starts attacking Ashe and makes Ashe be poisoned. 
This poisoned status will last 2 seconds until the end of time point 2. 
However, at the beginning of time point 2, Teemo attacks Ashe again who is already in poisoned status. 
Since the poisoned status won''t add up together, though the second poisoning attack will still work at time point 2, it will stop at the end of time point 3. 
So you finally need to output 3.

Note:
You may assume the length of given time series array won''t exceed 10000.

You may assume the numbers in the Teemo''s attacking time series and his poisoning time duration per attacking are non-negative integers, which won''t exceed 10,000,000.', false, 'Medium', '/articles/teemo-attacking', 56.1, 
   5.8, 'https://leetcode.com/problems/teemo-attacking', 663, 73.7, 131.3, '["Salesforce"]'::jsonb, '["Array"]'::jsonb, 
   519, 1041, 33, false, '[]'::jsonb, true),
  (496, 'Next Greater Element I', 'You are given two integer arrays `nums1` and `nums2` both of unique elements, where `nums1` is a subset of `nums2`.

Find all the next greater numbers for `nums1`''s elements in the corresponding places of `nums2`.

The Next Greater Number of a number `x` in `nums1` is the first greater number to its right in `nums2`. If it does not exist, return `-1` for this number.


Example 1:
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation:
For number 4 in the first array, you cannot find the next greater number for it in the second array, so output -1.

For number 1 in the first array, the next greater number for it in the second array is 3.

For number 2 in the first array, there is no next greater number for it in the second array, so output -1.


Example 2:
Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation:
For number 2 in the first array, the next greater number for it in the second array is 3.

For number 4 in the first array, there is no next greater number for it in the second array, so output -1.


Constraints:
`1 <= nums1.length <= nums2.length <= 1000`
`0 <= nums1[i], nums2[i] <= 104`
All integers in `nums1` and `nums2` are unique.

All the integers of `nums1` also appear in `nums2`.

Follow up: Could you find an `O(nums1.length + nums2.length)` solution?', false, 'Easy', '/articles/greater-element-i', 65.9, 
   35.9, 'https://leetcode.com/problems/next-greater-element-i', 999, 211.3, 320.7, '["Amazon,Microsoft"]'::jsonb, '["Stack"]'::jsonb, 
   2367, 2825, 46, true, '[]'::jsonb, true),
  (497, 'Random Point in Non-overlapping Rectangles', 'Given a list of non-overlapping axis-aligned rectangles `rects`, write a function `pick` which randomly and uniformily picks an integer point in the space covered by the rectangles.

Note:
An integer point is a point that has integer coordinates. 
A point on the perimeter of a rectangle is included in the space covered by the rectangles. 
`i`th rectangle = `rects[i]` = `[x1,y1,x2,y2]`, where `[x1, y1]` are the integer coordinates of the bottom-left corner, and `[x2, y2]` are the integer coordinates of the top-right corner.

length and width of each rectangle does not exceed `2000`.

`1 <= rects.length <= 100`
`pick` return a point as an array of integer coordinates `[p_x, p_y]`
`pick` is called at most `10000` times.


Example 1:
Input: 
["Solution","pick","pick","pick"]
[[[[1,1,5,5]]],[],[],[]]
Output: 
[null,[4,1],[4,1],[3,3]]

Example 2:
Input: 
["Solution","pick","pick","pick","pick","pick"]
[[[[-2,-2,-1,-1],[1,0,3,0]]],[],[],[],[],[]]
Output: 
[null,[-1,-2],[2,0],[-2,-1],[3,0],[-2,-2]]
Explanation of Input Syntax:
The input is two lists: the subroutines called and their arguments. `Solution`''s constructor has one argument, the array of rectangles `rects`. `pick` has no arguments. Arguments are always wrapped with a list, even if there aren''t any.', false, 'Medium', '/articles/random-point-in-non-overlapping-rectangles', 39.1, 
   8.4, 'https://leetcode.com/problems/random-point-in-non-overlapping-rectangles', 167, 30.7, 78.4, '["Google"]'::jsonb, '["Binary Search,Random"]'::jsonb, 
   329, 528, 38, true, '[]'::jsonb, true),
  (498, 'Diagonal Traverse', 'Given a matrix of M x N elements (M rows, N columns), return all elements of the matrix in diagonal order as shown in the below image.


Example:
Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
Output:  [1,2,4,7,5,3,6,8,9]
Explanation:
Note:
The total number of elements of the given matrix will not exceed 10,000.', false, 'Medium', '/articles/diagonal-traverse', 50.5, 
   37.8, 'https://leetcode.com/problems/diagonal-traverse', 862, 124.3, 246.3, '["Facebook,Amazon"]'::jsonb, '[]'::jsonb, 
   1221, 410, 75, true, '[]'::jsonb, true),
  (499, 'The Maze III', 'There is a ball in a `maze` with empty spaces (represented as `0`) and walls (represented as `1`). The ball can go through the empty spaces by rolling up, down, left or right, but it won''t stop rolling until hitting a wall. When the ball stops, it could choose the next direction. There is also a hole in this maze. The ball will drop into the hole if it rolls onto the hole.

Given the `m x n` `maze`, the ball''s position `ball` and the hole''s position `hole`, where `ball = [ballrow, ballcol]` and `hole = [holerow, holecol]`, return a string `instructions` of all the instructions that the ball should follow to drop in the hole with the shortest distance possible. If there are multiple valid instructions, return the lexicographically minimum one. If the ball can''t drop in the hole, return `"impossible"`.

If there is a way for the ball to drop in the hole, the answer `instructions` should contain the characters `''u''` (i.e., up), `''d''` (i.e., down), `''l''` (i.e., left), and `''r''` (i.e., right).

The distance is the number of empty spaces traveled by the ball from the start position (excluded) to the destination (included).

You may assume that the borders of the maze are all walls (see examples).


Example 1:
Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], ball = [4,3], hole = [0,1]
Output: "lul"
Explanation: There are two shortest ways for the ball to drop into the hole.

The first way is left -> up -> left, represented by "lul".

The second way is up -> left, represented by ''ul''.

Both ways have shortest distance 6, but the first way is lexicographically smaller because ''l'' < ''u''. So the output is "lul".


Example 2:
Input: maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], ball = [4,3], hole = [3,0]
Output: "impossible"
Explanation: The ball cannot reach the hole.


Example 3:
Input: maze = [[0,0,0,0,0,0,0],[0,0,1,0,0,1,0],[0,0,0,0,1,0,0],[0,0,0,0,0,0,1]], ball = [0,4], hole = [3,5]
Output: "dldr"

Constraints:
`m == maze.length`
`n == maze[i].length`
`1 <= m, n <= 100`
`maze[i][j]` is `0` or `1`.

`ball.length == 2`
`hole.length == 2`
`0 <= ballrow, holerow <= m`
`0 <= ballcol, holecol <= n`
Both the ball and the hole exist in an empty space, and they will not be in the same position initially.

The maze contains at least 2 empty spaces.', true, 'Hard', NULL, 42.6, 
   0, 'https://leetcode.com/problems/the-maze-iii', 144, 17.5, 41.2, '["Google"]'::jsonb, '["Depth-first Search,Breadth-first Search"]'::jsonb, 
   241, 47, 84, true, '[]'::jsonb, true),
  (500, 'Keyboard Row', 'Given an array of strings `words`, return the words that can be typed using letters of the alphabet on only one row of American keyboard like the image below.

In the American keyboard:
the first row consists of the characters `"qwertyuiop"`,
the second row consists of the characters `"asdfghjkl"`, and
the third row consists of the characters `"zxcvbnm"`.


Example 1:
Input: words = ["Hello","Alaska","Dad","Peace"]
Output: ["Alaska","Dad"]

Example 2:
Input: words = ["omk"]
Output: []

Example 3:
Input: words = ["adsdf","sfd"]
Output: ["adsdf","sfd"]

Constraints:
`1 <= words.length <= 20`
`1 <= words[i].length <= 100`
`words[i]` consists of English letters (both lowercase and uppercase).', false, 'Easy', NULL, 65.9, 
   3.4, 'https://leetcode.com/problems/keyboard-row', 999, 124.5, 189.1, '["Mathworks"]'::jsonb, '["Hash Table"]'::jsonb, 
   645, 760, 46, false, '[]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;

COMMIT;

-- ============================================
-- Import Summary
-- ============================================
-- Total Problems Imported: 1825
-- Skipped: 0
-- ============================================
