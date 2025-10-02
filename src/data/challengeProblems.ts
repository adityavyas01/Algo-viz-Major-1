export interface TestCase {
  input: any;
  expectedOutput: any;
  explanation?: string;
}

export interface ProblemStatement {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  tags: string[];
  timeLimit: number; // in seconds
  memoryLimit: number; // in MB
  points: number;
  functionName?: string;
  
  // Problem details
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  
  // Test cases
  testCases: TestCase[];
  hiddenTestCases: TestCase[];
  
  // Code templates
  codeTemplates: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
  
  // Solution hints
  hints: string[];
  editorial?: {
    explanation: string;
    solution: string;
    timeComplexity: string;
    spaceComplexity: string;
  };
  editorialSolution?: {
    approach: string;
    timeComplexity: string;
    spaceComplexity: string;
    code: {
      javascript?: string;
      python?: string;
      java?: string;
      cpp?: string;
    };
  };
}

export const challengeProblems: ProblemStatement[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description: "Given an array of integers and a target, return indices of two numbers that add up to target.",
    difficulty: "easy",
    category: "Arrays & Hashing",
    tags: ["array", "hash-table", "two-pointers"],
    timeLimit: 1800, // 30 minutes
    memoryLimit: 64,
    points: 100,
    functionName: "twoSum",
    
    problemStatement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    
    inputFormat: `• nums: an array of integers
• target: an integer`,
    
    outputFormat: `An array of two integers representing the indices of the two numbers that add up to target.`,
    
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists"
    ],
    
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6", 
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    
    testCases: [
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        expectedOutput: [0, 1]
      },
      {
        input: { nums: [3, 2, 4], target: 6 },
        expectedOutput: [1, 2]
      },
      {
        input: { nums: [3, 3], target: 6 },
        expectedOutput: [0, 1]
      }
    ],
    
    hiddenTestCases: [
      {
        input: { nums: [-1, -2, -3, -4, -5], target: -8 },
        expectedOutput: [2, 4]
      },
      {
        input: { nums: [0, 4, 3, 0], target: 0 },
        expectedOutput: [0, 3]
      }
    ],
    
    codeTemplates: {
      javascript: `function twoSum(nums, target) {
    // Your solution here
    
}`,
      python: `def twoSum(nums, target):
    # Your solution here
    pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your solution here
        
    }
};`
    },
    
    hints: [
      "Try using a hash map to store numbers you've seen along with their indices.",
      "For each number, check if target - current number exists in your hash map.",
      "The brute force O(n²) solution works, but can you optimize to O(n)?"
    ],
    
    editorial: {
      explanation: "Use a hash map to store each number and its index as we iterate through the array. For each element, check if the complement (target - current element) exists in the hash map.",
      solution: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    
    editorialSolution: {
      approach: "Use a hash map to store each number and its index as we iterate through the array. For each element, check if the complement (target - current element) exists in the hash map.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: {
        javascript: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
        python: `def twoSum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []`
      }
    }
  },
  
  {
    id: "reverse-string",
    title: "Reverse String",
    description: "Write a function that reverses a string in-place with O(1) extra memory.",
    difficulty: "easy",
    category: "String Manipulation",
    tags: ["string", "two-pointers"],
    timeLimit: 900, // 15 minutes
    memoryLimit: 32,
    points: 75,
    functionName: "reverseString",
    
    problemStatement: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    
    inputFormat: `s: an array of characters`,
    outputFormat: `The input array s modified in-place (no return value needed).`,
    
    constraints: [
      "1 ≤ s.length ≤ 10⁵",
      "s[i] is a printable ASCII character"
    ],
    
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    
    testCases: [
      {
        input: { s: ["h","e","l","l","o"] },
        expectedOutput: ["o","l","l","e","h"]
      },
      {
        input: { s: ["H","a","n","n","a","h"] },
        expectedOutput: ["h","a","n","n","a","H"]
      }
    ],
    
    hiddenTestCases: [
      {
        input: { s: ["a"] },
        expectedOutput: ["a"]
      },
      {
        input: { s: ["A"," ","m","a","n",","," ","a"," ","p","l","a","n",","," ","a"," ","c","a","n","a","l",":"," ","P","a","n","a","m","a"] },
        expectedOutput: ["a","m","a","n","a","P"," ",":","l","a","n","a","c"," ","a"," ",",","n","a","l","p"," ","a"," ",",","n","a","m"," ","A"]
      }
    ],
    
    codeTemplates: {
      javascript: `function reverseString(s) {
    // Your solution here - modify s in-place
    
}`,
      python: `def reverseString(s):
    # Your solution here - modify s in-place
    pass`,
      java: `class Solution {
    public void reverseString(char[] s) {
        // Your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        // Your solution here
        
    }
};`
    },
    
    hints: [
      "Use two pointers approach - one at the beginning and one at the end.",
      "Swap characters and move pointers toward each other.",
      "Continue until pointers meet in the middle."
    ],
    
    editorial: {
      explanation: "Use two pointers technique. Initialize left pointer at 0 and right pointer at length-1. Swap characters at these positions and move pointers toward center until they meet.",
      solution: `function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Swap characters
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)"
    },
    
    editorialSolution: {
      approach: "Use two pointers technique. Initialize left pointer at 0 and right pointer at length-1. Swap characters at these positions and move pointers toward center until they meet.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      code: {
        javascript: `function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Swap characters
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}`,
        python: `def reverseString(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1`
      }
    }
  },

  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    description: "Given a string containing just parentheses, determine if the input string is valid.",
    difficulty: "easy",
    category: "Stack",
    tags: ["string", "stack"],
    timeLimit: 1200, // 20 minutes
    memoryLimit: 48,
    points: 90,
    functionName: "isValid",
    
    problemStatement: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    
    inputFormat: `s: a string containing only parentheses characters`,
    outputFormat: `A boolean value - true if the string is valid, false otherwise.`,
    
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s consists of parentheses only '()[]{}'."
    ],
    
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      },
      {
        input: 's = "([)]"',
        output: "false"
      }
    ],
    
    testCases: [
      {
        input: { s: "()" },
        expectedOutput: true
      },
      {
        input: { s: "()[]{}" },
        expectedOutput: true
      },
      {
        input: { s: "(]" },
        expectedOutput: false
      },
      {
        input: { s: "([)]" },
        expectedOutput: false
      }
    ],
    
    hiddenTestCases: [
      {
        input: { s: "" },
        expectedOutput: true
      },
      {
        input: { s: "(((" },
        expectedOutput: false
      },
      {
        input: { s: ")))" },
        expectedOutput: false
      },
      {
        input: { s: "{[()]}" },
        expectedOutput: true
      }
    ],
    
    codeTemplates: {
      javascript: `function isValid(s) {
    // Your solution here
    
}`,
      python: `def isValid(s):
    # Your solution here
    pass`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Your solution here
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your solution here
        
    }
};`
    },
    
    hints: [
      "Think about using a stack data structure.",
      "Push opening brackets onto the stack, pop when you see closing brackets.",
      "Make sure the popped bracket matches the current closing bracket.",
      "The string is valid if the stack is empty at the end."
    ],
    
    editorial: {
      explanation: "Use a stack to keep track of opening brackets. When encountering a closing bracket, check if it matches the most recent opening bracket (top of stack).",
      solution: `function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in map) {
            // Closing bracket
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            // Opening bracket
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)"
    },
    
    editorialSolution: {
      approach: "Use a stack to keep track of opening brackets. When encountering a closing bracket, check if it matches the most recent opening bracket (top of stack).",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: {
        javascript: `function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in map) {
            // Closing bracket
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            // Opening bracket
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
        python: `def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            # Closing bracket
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            # Opening bracket
            stack.append(char)
    
    return len(stack) == 0`
      }
    }
  }
];

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'text-green-400';
    case 'medium': return 'text-yellow-400';
    case 'hard': return 'text-red-400';
    default: return 'text-gray-400';
  }
};

export const getDifficultyBg = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-500/20 border-green-500/30';
    case 'medium': return 'bg-yellow-500/20 border-yellow-500/30';
    case 'hard': return 'bg-red-500/20 border-red-500/30';
    default: return 'bg-gray-500/20 border-gray-500/30';
  }
};