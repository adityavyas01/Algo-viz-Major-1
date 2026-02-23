/**
 * Smoke Tests - Critical Path Validation
 * Tests actual code execution for key problem types
 * Run these tests to validate the entire pipeline works end-to-end
 */

import { describe, it, expect } from 'vitest';
import { wrapCode } from '../codeWrapper';
import { executeTestcase } from '../multiLangExecutor';
import type { Testcase } from '../testcaseService';

describe('Smoke Tests - End-to-End Execution', () => {
  
  // Simple array problem
  it('Should execute Two Sum in Python', async () => {
    const userCode = `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`;

    const testcase: Testcase = {
      id: 'test-1',
      problem_id: 'two-sum',
      input: 'nums = [2,7,11,15]\ntarget = 9',
      expected_output: '[0,1]',
      is_hidden: false,
      type: 'standard',
      created_at: new Date().toISOString()
    };

    const result = await executeTestcase(userCode, 'python', testcase);
    
    expect(result.passed).toBe(true);
    expect(result.error).toBeUndefined();
  }, 30000); // 30s timeout for execution

  // 2D array problem
  it('Should execute Number of Islands in JavaScript', async () => {
    const userCode = `class Solution {
    numIslands(grid) {
        if (!grid || grid.length === 0) return 0;
        
        const dfs = (i, j) => {
            if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] !== '1') {
                return;
            }
            grid[i][j] = '0';
            dfs(i+1, j);
            dfs(i-1, j);
            dfs(i, j+1);
            dfs(i, j-1);
        };
        
        let count = 0;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] === '1') {
                    dfs(i, j);
                    count++;
                }
            }
        }
        return count;
    }
}`;

    const testcase: Testcase = {
      id: 'test-2',
      problem_id: 'num-islands',
      input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]',
      expected_output: '2',
      is_hidden: false,
      type: 'standard',
      created_at: new Date().toISOString()
    };

    const result = await executeTestcase(userCode, 'javascript', testcase);
    
    expect(result.passed).toBe(true);
    expect(result.error).toBeUndefined();
  }, 30000);

  // LinkedList problem
  it('Should execute Reverse Linked List in Python', async () => {
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

    const testcase: Testcase = {
      id: 'test-3',
      problem_id: 'reverse-linked-list',
      input: 'head = [1,2,3,4,5]',
      expected_output: '[5,4,3,2,1]',
      is_hidden: false,
      type: 'standard',
      created_at: new Date().toISOString()
    };

    const result = await executeTestcase(userCode, 'python', testcase);
    
    expect(result.passed).toBe(true);
    expect(result.error).toBeUndefined();
  }, 30000);

  // Binary Tree problem
  it('Should execute Maximum Depth in JavaScript', async () => {
    const userCode = `class Solution {
    maxDepth(root) {
        if (!root) return 0;
        return 1 + Math.max(this.maxDepth(root.left), this.maxDepth(root.right));
    }
}`;

    const testcase: Testcase = {
      id: 'test-4',
      problem_id: 'max-depth',
      input: 'root = [3,9,20,null,null,15,7]',
      expected_output: '3',
      is_hidden: false,
      type: 'standard',
      created_at: new Date().toISOString()
    };

    const result = await executeTestcase(userCode, 'javascript', testcase);
    
    expect(result.passed).toBe(true);
    expect(result.error).toBeUndefined();
  }, 30000);

  // Void return (modify in-place)
  it('Should execute Move Zeroes in Python', async () => {
    const userCode = `class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        left = 0
        for right in range(len(nums)):
            if nums[right] != 0:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1`;

    const testcase: Testcase = {
      id: 'test-5',
      problem_id: 'move-zeroes',
      input: 'nums = [0,1,0,3,12]',
      expected_output: '[1,3,12,0,0]',
      is_hidden: false,
      type: 'standard',
      created_at: new Date().toISOString()
    };

    const result = await executeTestcase(userCode, 'python', testcase);
    
    expect(result.passed).toBe(true);
    expect(result.error).toBeUndefined();
  }, 30000);

  // String problem with special characters
  it('Should execute Valid Palindrome in TypeScript', async () => {
    const userCode = `class Solution {
    isPalindrome(s: string): boolean {
        const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleaned === cleaned.split('').reverse().join('');
    }
}`;

    const testcase: Testcase = {
      id: 'test-6',
      problem_id: 'valid-palindrome',
      input: 's = "A man, a plan, a canal: Panama"',
      expected_output: 'true',
      is_hidden: false,
      type: 'standard',
      created_at: new Date().toISOString()
    };

    const result = await executeTestcase(userCode, 'typescript', testcase);
    
    expect(result.passed).toBe(true);
    expect(result.error).toBeUndefined();
  }, 30000);
});

describe('Multi-Language Consistency', () => {
  const problemCode = {
    python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            if target - num in seen:
                return [seen[target - num], i]
            seen[num] = i
        return []`,
    
    javascript: `class Solution {
    twoSum(nums, target) {
        const seen = new Map();
        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (seen.has(complement)) {
                return [seen.get(complement), i];
            }
            seen.set(nums[i], i);
        }
        return [];
    }
}`,
    
    typescript: `class Solution {
    twoSum(nums: number[], target: number): number[] {
        const seen: {[key: number]: number} = {};
        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];
            if (complement in seen) {
                return [seen[complement], i];
            }
            seen[nums[i]] = i;
        }
        return [];
    }
}`
  };

  const testcase: Testcase = {
    id: 'consistency-test',
    problem_id: 'two-sum',
    input: 'nums = [2,7,11,15]\ntarget = 9',
    expected_output: '[0,1]',
    is_hidden: false,
    type: 'standard',
    created_at: new Date().toISOString()
  };

  Object.entries(problemCode).forEach(([lang, code]) => {
    it(`Should produce consistent results in ${lang}`, async () => {
      const result = await executeTestcase(code, lang as any, testcase);
      expect(result.passed).toBe(true);
      expect(result.error).toBeUndefined();
    }, 30000);
  });
});
