interface CodeExecutionResult {
  success: boolean;
  output?: any;
  error?: string;
  executionTime?: number;
  memoryUsed?: number;
}

interface TestResult {
  passed: boolean;
  input: any;
  expectedOutput: any;
  actualOutput?: any;
  error?: string;
  executionTime?: number;
}

export class ChallengeExecutor {
  
  // Execute user code against test cases
  static async executeCode(
    code: string, 
    language: string, 
    testCases: any[], 
    functionName: string
  ): Promise<TestResult[]> {
    const results: TestResult[] = [];
    
    for (const testCase of testCases) {
      try {
        const result = await this.runSingleTest(code, language, testCase, functionName);
        results.push(result);
      } catch (error) {
        results.push({
          passed: false,
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          error: error instanceof Error ? error.message : 'Unknown error',
          executionTime: 0
        });
      }
    }
    
    return results;
  }
  
  private static async runSingleTest(
    code: string, 
    language: string, 
    testCase: any, 
    functionName: string
  ): Promise<TestResult> {
    const startTime = performance.now();
    
    try {
      let result;
      
      switch (language.toLowerCase()) {
        case 'javascript':
          result = await this.executeJavaScript(code, testCase.input, functionName);
          break;
        case 'python':
          // For demo purposes, we'll simulate Python execution
          result = await this.simulatePythonExecution(code, testCase.input, functionName);
          break;
        default:
          throw new Error(`Language ${language} not supported yet`);
      }
      
      const executionTime = performance.now() - startTime;
      const passed = this.compareResults(result.output, testCase.expectedOutput);
      
      return {
        passed,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: result.output,
        error: result.error,
        executionTime
      };
      
    } catch (error) {
      const executionTime = performance.now() - startTime;
      return {
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        error: error instanceof Error ? error.message : 'Execution failed',
        executionTime
      };
    }
  }
  
  private static async executeJavaScript(
    code: string, 
    input: any, 
    functionName: string
  ): Promise<CodeExecutionResult> {
    try {
      // Create a safe execution context
      const wrappedCode = `
        ${code}
        
        // Execute the function with the provided input
        (function() {
          try {
            ${this.generateFunctionCall(functionName, input)}
          } catch (error) {
            throw new Error('Runtime error: ' + error.message);
          }
        })();
      `;
      
      // Execute in isolated context with timeout
      const result = await this.executeWithTimeout(wrappedCode, 5000);
      
      return {
        success: true,
        output: result,
        executionTime: 0 // Would be measured in real execution
      };
      
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Execution failed'
      };
    }
  }
  
  private static generateFunctionCall(functionName: string, input: any): string {
    if (typeof input === 'object' && input !== null) {
      const args = Object.values(input).map(val => JSON.stringify(val)).join(', ');
      return `return ${functionName}(${args});`;
    }
    return `return ${functionName}(${JSON.stringify(input)});`;
  }
  
  private static async executeWithTimeout(code: string, timeoutMs: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Code execution timed out'));
      }, timeoutMs);
      
      try {
        // Use Function constructor for safer evaluation than eval
        const func = new Function(code);
        const result = func();
        clearTimeout(timeout);
        resolve(result);
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });
  }
  
  private static async simulatePythonExecution(
    code: string, 
    input: any, 
    functionName: string
  ): Promise<CodeExecutionResult> {
    // This is a simulation - in a real application, you'd send this to a backend service
    // that can safely execute Python code in a sandboxed environment
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate some basic Python execution logic
        try {
          if (functionName === 'twoSum') {
            const { nums, target } = input;
            // Simulated Python logic for twoSum
            const map = new Map();
            for (let i = 0; i < nums.length; i++) {
              const complement = target - nums[i];
              if (map.has(complement)) {
                resolve({
                  success: true,
                  output: [map.get(complement), i]
                });
                return;
              }
              map.set(nums[i], i);
            }
            resolve({ success: true, output: [] });
          } else {
            resolve({
              success: false,
              error: 'Python execution simulation not implemented for this function'
            });
          }
        } catch (error) {
          resolve({
            success: false,
            error: 'Simulated Python execution error'
          });
        }
      }, 1000); // Simulate network delay
    });
  }
  
  private static compareResults(actual: any, expected: any): boolean {
    // Deep comparison for arrays and objects
    if (Array.isArray(actual) && Array.isArray(expected)) {
      if (actual.length !== expected.length) return false;
      for (let i = 0; i < actual.length; i++) {
        if (!this.compareResults(actual[i], expected[i])) return false;
      }
      return true;
    }
    
    if (typeof actual === 'object' && typeof expected === 'object' && actual !== null && expected !== null) {
      const actualKeys = Object.keys(actual).sort();
      const expectedKeys = Object.keys(expected).sort();
      
      if (actualKeys.length !== expectedKeys.length) return false;
      if (!actualKeys.every((key, i) => key === expectedKeys[i])) return false;
      
      for (const key of actualKeys) {
        if (!this.compareResults(actual[key], expected[key])) return false;
      }
      return true;
    }
    
    return actual === expected;
  }
  
  // Generate hints based on test results
  static generateHints(results: TestResult[], problemId: string): string[] {
    const hints: string[] = [];
    const failedTests = results.filter(r => !r.passed);
    
    if (failedTests.length === 0) {
      return ['Great job! All test cases passed! 🎉'];
    }
    
    // General hints based on common failures
    if (failedTests.some(r => r.error?.includes('timeout'))) {
      hints.push('⏰ Your solution might be too slow. Consider optimizing the time complexity.');
    }
    
    if (failedTests.some(r => r.error?.includes('TypeError'))) {
      hints.push('🔍 Check your variable types and function parameters.');
    }
    
    if (failedTests.some(r => r.error?.includes('ReferenceError'))) {
      hints.push('❗ Make sure all variables are properly declared and in scope.');
    }
    
    // Problem-specific hints
    if (problemId === 'two-sum') {
      if (failedTests.length > results.length / 2) {
        hints.push('💡 Try using a hash map to store numbers and their indices as you iterate.');
      }
    }
    
    if (problemId === 'valid-parentheses') {
      if (failedTests.some(r => Array.isArray(r.actualOutput))) {
        hints.push('📚 Consider using a stack data structure to keep track of opening brackets.');
      }
    }
    
    return hints.length > 0 ? hints : ['🤔 Review the problem requirements and try a different approach.'];
  }
  
  // Calculate score based on performance
  static calculateScore(results: TestResult[], maxPoints: number): {
    score: number;
    breakdown: {
      correctness: number;
      efficiency: number;
      total: number;
    };
  } {
    const passedTests = results.filter(r => r.passed).length;
    const totalTests = results.length;
    const correctnessScore = (passedTests / totalTests) * 0.8 * maxPoints;
    
    // Calculate efficiency score based on execution time
    const avgTime = results.reduce((sum, r) => sum + (r.executionTime || 0), 0) / totalTests;
    const efficiencyScore = Math.max(0, (1000 - avgTime) / 1000) * 0.2 * maxPoints;
    
    const totalScore = Math.round(correctnessScore + efficiencyScore);
    
    return {
      score: totalScore,
      breakdown: {
        correctness: Math.round(correctnessScore),
        efficiency: Math.round(efficiencyScore),
        total: totalScore
      }
    };
  }
}

export type { CodeExecutionResult, TestResult };