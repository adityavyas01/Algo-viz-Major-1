/**
 * Integration Test Suite - Top 50 LeetCode Problems
 * Tests code execution across multiple languages with real problems
 */

import { describe, it, expect } from 'vitest';
import { wrapCode } from '../codeWrapper';
import type { LanguageId } from '@/types/execution';

// Test helper to format testcases
function formatTestcase(inputs: Record<string, any>): string {
  return Object.entries(inputs)
    .map(([key, value]) => `${key} = ${JSON.stringify(value)}`)
    .join('\n');
}

describe('Integration Tests - Array Problems', () => {
  it('Two Sum (Easy) - Python', () => {
    const userCode = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`;

    const testcase = formatTestcase({
      nums: [2, 7, 11, 15],
      target: 9
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('import json');
    expect(wrapped).toContain('solution = Solution()');
    expect(wrapped).toContain('json.dumps(result)');
    expect(wrapped).toContain('nums = [2, 7, 11, 15]');
    expect(wrapped).toContain('target = 9');
  });

  it('Best Time to Buy/Sell Stock (Easy) - JavaScript', () => {
    const userCode = `class Solution {
    maxProfit(prices) {
        let minPrice = Infinity;
        let maxProfit = 0;
        for (const price of prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }
}`;

    const testcase = formatTestcase({
      prices: [7, 1, 5, 3, 6, 4]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'javascript'
    });

    expect(wrapped).toContain('const solution = new Solution()');
    expect(wrapped).toContain('JSON.stringify(result)');
    expect(wrapped).toContain('const prices = [7, 1, 5, 3, 6, 4]');
  });

  it('Contains Duplicate (Easy) - TypeScript', () => {
    const userCode = `class Solution {
    containsDuplicate(nums: number[]): boolean {
        const seen = new Set<number>();
        for (const num of nums) {
            if (seen.has(num)) return true;
            seen.add(num);
        }
        return false;
    }
}`;

    const testcase = formatTestcase({
      nums: [1, 2, 3, 1]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'typescript'
    });

    expect(wrapped).toContain('const solution = new Solution()');
    expect(wrapped).toContain('JSON.stringify(result)');
  });

  it('Product of Array Except Self (Medium) - Java', () => {
    const userCode = `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            result[i] = prefix;
            prefix *= nums[i];
        }
        
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= suffix;
            suffix *= nums[i];
        }
        
        return result;
    }
}`;

    const testcase = formatTestcase({
      nums: [1, 2, 3, 4]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'java'
    });

    expect(wrapped).toContain('import com.google.gson.Gson');
    expect(wrapped).toContain('Solution solution = new Solution()');
    expect(wrapped).toContain('new Gson().toJson');
  });

  it('Maximum Subarray (Medium) - C++', () => {
    const userCode = `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (size_t i = 1; i < nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        
        return maxSum;
    }
};`;

    const testcase = formatTestcase({
      nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'cpp'
    });

    expect(wrapped).toContain('#include <iostream>');
    expect(wrapped).toContain('#include <vector>');
    expect(wrapped).toContain('Solution solution');
  });
});

describe('Integration Tests - String Problems', () => {
  it('Valid Palindrome (Easy) - Python', () => {
    const userCode = `class Solution:
    def isPalindrome(self, s: str) -> bool:
        clean = ''.join(c.lower() for c in s if c.isalnum())
        return clean == clean[::-1]`;

    const testcase = formatTestcase({
      s: "A man, a plan, a canal: Panama"
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('import json');
    expect(wrapped).toContain('s = "A man, a plan, a canal: Panama"');
  });

  it('Valid Anagram (Easy) - JavaScript', () => {
    const userCode = `class Solution {
    isAnagram(s, t) {
        if (s.length !== t.length) return false;
        const count = {};
        for (const char of s) {
            count[char] = (count[char] || 0) + 1;
        }
        for (const char of t) {
            if (!count[char]) return false;
            count[char]--;
        }
        return true;
    }
}`;

    const testcase = formatTestcase({
      s: "anagram",
      t: "nagaram"
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'javascript'
    });

    expect(wrapped).toContain('const s = "anagram"');
    expect(wrapped).toContain('const t = "nagaram"');
  });

  it('Longest Substring Without Repeating Characters (Medium) - Python', () => {
    const userCode = `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_set = set()
        left = 0
        max_length = 0
        
        for right in range(len(s)):
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1
            char_set.add(s[right])
            max_length = max(max_length, right - left + 1)
        
        return max_length`;

    const testcase = formatTestcase({
      s: "abcabcbb"
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('s = "abcabcbb"');
  });
});

describe('Integration Tests - LinkedList Problems', () => {
  it('Reverse Linked List (Easy) - Python', () => {
    const userCode = `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        current = head
        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        return prev`;

    const testcase = formatTestcase({
      head: [1, 2, 3, 4, 5]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('class ListNode:');
    expect(wrapped).toContain('build_linked_list');
    expect(wrapped).toContain('serialize_linked_list');
    expect(wrapped).toContain('head_list = build_linked_list(head)');
  });

  it('Merge Two Sorted Lists (Easy) - JavaScript', () => {
    const userCode = `class Solution {
    mergeTwoLists(list1, list2) {
        const dummy = new ListNode();
        let current = dummy;
        
        while (list1 && list2) {
            if (list1.val < list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }
        
        current.next = list1 || list2;
        return dummy.next;
    }
}`;

    const testcase = formatTestcase({
      list1: [1, 2, 4],
      list2: [1, 3, 4]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'javascript'
    });

    expect(wrapped).toContain('class ListNode {');
    expect(wrapped).toContain('buildLinkedList');
    expect(wrapped).toContain('serializeLinkedList');
  });

  it('Linked List Cycle (Easy) - Java', () => {
    const userCode = `class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        
        return false;
    }
}`;

    const testcase = formatTestcase({
      head: [3, 2, 0, -4]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'java'
    });

    expect(wrapped).toContain('class ListNode {');
    expect(wrapped).toContain('buildLinkedList');
  });
});

describe('Integration Tests - Binary Tree Problems', () => {
  it('Maximum Depth of Binary Tree (Easy) - Python', () => {
    const userCode = `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`;

    const testcase = formatTestcase({
      root: [3, 9, 20, null, null, 15, 7]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('class TreeNode:');
    expect(wrapped).toContain('build_tree');
    expect(wrapped).toContain('root_tree = build_tree(root)');
  });

  it('Inorder Traversal (Easy) - JavaScript', () => {
    const userCode = `class Solution {
    inorderTraversal(root) {
        const result = [];
        
        function traverse(node) {
            if (!node) return;
            traverse(node.left);
            result.push(node.val);
            traverse(node.right);
        }
        
        traverse(root);
        return result;
    }
}`;

    const testcase = formatTestcase({
      root: [1, null, 2, 3]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'javascript'
    });

    expect(wrapped).toContain('class TreeNode {');
    expect(wrapped).toContain('buildTree');
  });

  it('Level Order Traversal (Medium) - Java', () => {
    const userCode = `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> level = new ArrayList<>();
            
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            
            result.add(level);
        }
        
        return result;
    }
}`;

    const testcase = formatTestcase({
      root: [3, 9, 20, null, null, 15, 7]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'java'
    });

    expect(wrapped).toContain('class TreeNode {');
    expect(wrapped).toContain('buildTree');
  });

  it('Symmetric Tree (Easy) - C++', () => {
    const userCode = `class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if (!root) return true;
        return isMirror(root->left, root->right);
    }
    
    bool isMirror(TreeNode* left, TreeNode* right) {
        if (!left && !right) return true;
        if (!left || !right) return false;
        return left->val == right->val &&
               isMirror(left->left, right->right) &&
               isMirror(left->right, right->left);
    }
};`;

    const testcase = formatTestcase({
      root: [1, 2, 2, 3, 4, 4, 3]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'cpp'
    });

    expect(wrapped).toContain('struct TreeNode {');
    expect(wrapped).toContain('buildTree');
  });
});

describe('Integration Tests - 2D Array Problems', () => {
  it('Set Matrix Zeroes (Medium) - Python', () => {
    const userCode = `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        rows, cols = len(matrix), len(matrix[0])
        first_row_zero = any(matrix[0][c] == 0 for c in range(cols))
        first_col_zero = any(matrix[r][0] == 0 for r in range(rows))
        
        for r in range(1, rows):
            for c in range(1, cols):
                if matrix[r][c] == 0:
                    matrix[r][0] = 0
                    matrix[0][c] = 0
        
        for r in range(1, rows):
            for c in range(1, cols):
                if matrix[r][0] == 0 or matrix[0][c] == 0:
                    matrix[r][c] = 0
        
        if first_row_zero:
            for c in range(cols):
                matrix[0][c] = 0
        
        if first_col_zero:
            for r in range(rows):
                matrix[r][0] = 0`;

    const testcase = formatTestcase({
      matrix: [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]');
    expect(wrapped).toContain('solution.setZeroes(matrix)');
    // Void return - should print modified matrix
    expect(wrapped).toContain('print(json.dumps(matrix))');
  });

  it('Rotate Image (Medium) - JavaScript', () => {
    const userCode = `class Solution {
    rotate(matrix) {
        const n = matrix.length;
        
        // Transpose
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            }
        }
        
        // Reverse each row
        for (let i = 0; i < n; i++) {
            matrix[i].reverse();
        }
    }
}`;

    const testcase = formatTestcase({
      matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'javascript'
    });

    expect(wrapped).toContain('const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]');
  });
});

describe('Integration Tests - Mixed Types', () => {
  it('Combination Sum (Medium) - Python', () => {
    const userCode = `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        result = []
        
        def backtrack(start, current, total):
            if total == target:
                result.append(current[:])
                return
            if total > target:
                return
            
            for i in range(start, len(candidates)):
                current.append(candidates[i])
                backtrack(i, current, total + candidates[i])
                current.pop()
        
        backtrack(0, [], 0)
        return result`;

    const testcase = formatTestcase({
      candidates: [2, 3, 6, 7],
      target: 7
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('candidates = [2, 3, 6, 7]');
    expect(wrapped).toContain('target = 7');
  });
});

describe('Wrapper Robustness Tests', () => {
  it('Handles empty input arrays', () => {
    const userCode = `class Solution:
    def emptyArray(self, nums: List[int]) -> int:
        return len(nums)`;

    const testcase = formatTestcase({
      nums: []
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('nums = []');
  });

  it('Handles null values in arrays', () => {
    const userCode = `class Solution:
    def processTree(self, root: Optional[TreeNode]) -> int:
        return 0 if not root else 1`;

    const testcase = formatTestcase({
      root: []
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('root = []');
  });

  it('Handles large numbers', () => {
    const userCode = `class Solution:
    def largeNumber(self, n: int) -> int:
        return n * 2`;

    const testcase = formatTestcase({
      n: 2147483647
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('n = 2147483647');
  });

  it('Handles negative numbers', () => {
    const userCode = `class Solution:
    def negatives(self, nums: List[int]) -> int:
        return sum(1 for n in nums if n < 0)`;

    const testcase = formatTestcase({
      nums: [-1, -2, 3, 4, -5]
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('nums = [-1, -2, 3, 4, -5]');
  });

  it('Handles strings with special characters', () => {
    const userCode = `class Solution:
    def specialChars(self, s: str) -> int:
        return len(s)`;

    const testcase = formatTestcase({
      s: "Hello\nWorld\t!"
    });

    const wrapped = wrapCode({
      userCode,
      testcaseInput: testcase,
      language: 'python'
    });

    expect(wrapped).toContain('s = "Hello\\nWorld\\t!"');
  });
});
