/**
 * Piston API Service
 * Free multi-language code execution using emkc.org Piston API
 * Supports 40+ programming languages
 * Rate limit: 5 requests per second
 */

import type {
  ExecutionRequest,
  ExecutionResult,
  PistonRunRequest,
  PistonRunResponse,
  PistonRuntime,
  Language,
  LanguageId
} from '@/types/execution';

const PISTON_API_URL = 'https://emkc.org/api/v2/piston';

// Supported languages configuration
export const SUPPORTED_LANGUAGES: Record<LanguageId, Language> = {
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    version: '18.15.0',
    pistonId: 'javascript',
    monacoId: 'javascript',
    extension: 'js',
    comment: '//',
    template: `// Write your code here
function solution() {
    // Your solution
}

solution();`
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    version: '5.0.3',
    pistonId: 'typescript',
    monacoId: 'typescript',
    extension: 'ts',
    comment: '//',
    template: `// Write your code here
function solution(): void {
    // Your solution
}

solution();`
  },
  python: {
    id: 'python',
    name: 'Python',
    version: '3.10.0',
    pistonId: 'python',
    monacoId: 'python',
    extension: 'py',
    comment: '#',
    template: `# Write your code here
def solution():
    # Your solution
    pass

solution()`
  },
  java: {
    id: 'java',
    name: 'Java',
    version: '15.0.2',
    pistonId: 'java',
    monacoId: 'java',
    extension: 'java',
    comment: '//',
    template: `public class Main {
    public static void main(String[] args) {
        // Write your code here
        solution();
    }
    
    public static void solution() {
        // Your solution
    }
}`
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    version: '10.2.0',
    pistonId: 'c++',
    monacoId: 'cpp',
    extension: 'cpp',
    comment: '//',
    template: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

void solution() {
    // Write your code here
}

int main() {
    solution();
    return 0;
}`
  },
  c: {
    id: 'c',
    name: 'C',
    version: '10.2.0',
    pistonId: 'c',
    monacoId: 'c',
    extension: 'c',
    comment: '//',
    template: `#include <stdio.h>
#include <stdlib.h>

void solution() {
    // Write your code here
}

int main() {
    solution();
    return 0;
}`
  },
  csharp: {
    id: 'csharp',
    name: 'C#',
    version: '6.12.0',
    pistonId: 'csharp',
    monacoId: 'csharp',
    extension: 'cs',
    comment: '//',
    template: `using System;

class Program {
    static void Main() {
        // Write your code here
        Solution();
    }
    
    static void Solution() {
        // Your solution
    }
}`
  },
  go: {
    id: 'go',
    name: 'Go',
    version: '1.16.2',
    pistonId: 'go',
    monacoId: 'go',
    extension: 'go',
    comment: '//',
    template: `package main

import "fmt"

func solution() {
    // Write your code here
}

func main() {
    solution()
}`
  },
  rust: {
    id: 'rust',
    name: 'Rust',
    version: '1.68.2',
    pistonId: 'rust',
    monacoId: 'rust',
    extension: 'rs',
    comment: '//',
    template: `fn solution() {
    // Write your code here
}

fn main() {
    solution();
}`
  },
  kotlin: {
    id: 'kotlin',
    name: 'Kotlin',
    version: '1.8.20',
    pistonId: 'kotlin',
    monacoId: 'kotlin',
    extension: 'kt',
    comment: '//',
    template: `fun solution() {
    // Write your code here
}

fun main() {
    solution()
}`
  },
  swift: {
    id: 'swift',
    name: 'Swift',
    version: '5.3.3',
    pistonId: 'swift',
    monacoId: 'swift',
    extension: 'swift',
    comment: '//',
    template: `func solution() {
    // Write your code here
}

solution()`
  },
  ruby: {
    id: 'ruby',
    name: 'Ruby',
    version: '3.0.1',
    pistonId: 'ruby',
    monacoId: 'ruby',
    extension: 'rb',
    comment: '#',
    template: `# Write your code here
def solution
    # Your solution
end

solution()`
  },
  php: {
    id: 'php',
    name: 'PHP',
    version: '8.2.3',
    pistonId: 'php',
    monacoId: 'php',
    extension: 'php',
    comment: '//',
    template: `<?php

function solution() {
    // Write your code here
}

solution();`
  },
  scala: {
    id: 'scala',
    name: 'Scala',
    version: '3.2.2',
    pistonId: 'scala',
    monacoId: 'scala',
    extension: 'scala',
    comment: '//',
    template: `object Main {
  def solution(): Unit = {
    // Write your code here
  }
  
  def main(args: Array[String]): Unit = {
    solution()
  }
}`
  },
  dart: {
    id: 'dart',
    name: 'Dart',
    version: '2.19.6',
    pistonId: 'dart',
    monacoId: 'dart',
    extension: 'dart',
    comment: '//',
    template: `void solution() {
  // Write your code here
}

void main() {
  solution();
}`
  }
};

// Rate limiting
class RateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private lastRequest = 0;
  private minInterval = 200; // 200ms between requests (5 req/sec)

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequest;
      
      if (timeSinceLastRequest < this.minInterval) {
        await new Promise(resolve => 
          setTimeout(resolve, this.minInterval - timeSinceLastRequest)
        );
      }
      
      const fn = this.queue.shift();
      if (fn) {
        this.lastRequest = Date.now();
        await fn();
      }
    }
    
    this.processing = false;
  }
}

const rateLimiter = new RateLimiter();

/**
 * Get available runtimes from Piston API
 */
export async function getPistonRuntimes(): Promise<PistonRuntime[]> {
  try {
    const response = await fetch(`${PISTON_API_URL}/runtimes`);
    if (!response.ok) {
      throw new Error(`Piston API error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Piston runtimes:', error);
    throw error;
  }
}

/**
 * Execute code using Piston API
 */
export async function executeCode(
  request: ExecutionRequest
): Promise<ExecutionResult> {
  const language = SUPPORTED_LANGUAGES[request.language];
  
  if (!language) {
    return {
      success: false,
      stdout: '',
      stderr: 'Unsupported language',
      output: '',
      exitCode: 1,
      signal: null,
      runtime: 0,
      error: `Language '${request.language}' is not supported`
    };
  }

  const pistonRequest: PistonRunRequest = {
    language: language.pistonId,
    version: language.version,
    files: [{
      content: request.code
    }],
    stdin: request.stdin || '',
    args: request.args || [],
    compile_timeout: request.compileTimeout || 10000,
    run_timeout: request.runTimeout || 3000,
    run_memory_limit: 100000000 // 100MB
  };

  try {
    const startTime = performance.now();
    
    const result = await rateLimiter.add(async () => {
      const response = await fetch(`${PISTON_API_URL}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pistonRequest)
      });

      if (!response.ok) {
        throw new Error(`Piston API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    });

    const endTime = performance.now();
    const runtime = endTime - startTime;

    const pistonResponse = result as PistonRunResponse;

    // Check for compilation errors
    if (pistonResponse.compile && pistonResponse.compile.code !== 0) {
      return {
        success: false,
        stdout: pistonResponse.compile.stdout || '',
        stderr: pistonResponse.compile.stderr || '',
        output: pistonResponse.compile.output || '',
        exitCode: pistonResponse.compile.code,
        signal: pistonResponse.compile.signal,
        runtime,
        compilationError: pistonResponse.compile.stderr || pistonResponse.compile.output || 'Compilation failed'
      };
    }

    // Check runtime results
    const success = pistonResponse.run.code === 0;
    
    return {
      success,
      stdout: pistonResponse.run.stdout || '',
      stderr: pistonResponse.run.stderr || '',
      output: pistonResponse.run.output || '',
      exitCode: pistonResponse.run.code,
      signal: pistonResponse.run.signal,
      runtime,
      error: success ? undefined : (pistonResponse.run.stderr || 'Runtime error')
    };

  } catch (error) {
    console.error('Piston execution error:', error);
    return {
      success: false,
      stdout: '',
      stderr: error instanceof Error ? error.message : 'Unknown error',
      output: '',
      exitCode: 1,
      signal: null,
      runtime: 0,
      error: error instanceof Error ? error.message : 'Execution failed'
    };
  }
}

/**
 * Get language configuration
 */
export function getLanguage(languageId: LanguageId): Language | undefined {
  return SUPPORTED_LANGUAGES[languageId];
}

/**
 * Get all supported languages
 */
export function getAllLanguages(): Language[] {
  return Object.values(SUPPORTED_LANGUAGES);
}

/**
 * Get template code for a language
 */
export function getTemplate(languageId: LanguageId): string {
  const language = SUPPORTED_LANGUAGES[languageId];
  return language?.template || '';
}

/**
 * Validate code execution request
 */
export function validateExecutionRequest(request: ExecutionRequest): {
  valid: boolean;
  error?: string;
} {
  if (!request.code || request.code.trim().length === 0) {
    return { valid: false, error: 'Code cannot be empty' };
  }

  if (!SUPPORTED_LANGUAGES[request.language]) {
    return { valid: false, error: `Unsupported language: ${request.language}` };
  }

  if (request.code.length > 100000) {
    return { valid: false, error: 'Code exceeds maximum length (100KB)' };
  }

  return { valid: true };
}
