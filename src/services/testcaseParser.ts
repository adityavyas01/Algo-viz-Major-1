/**
 * Testcase Parser Service
 * Parses LeetCode-style testcase strings into structured data
 */

import { TestcaseParseError, type ParsedTestcase, type DataType } from '@/types/execution';

/**
 * Parse testcase input string like "nums = [2,7,11,15], target = 9" or "nums = [2,7,11,15]\ntarget = 9"
 */
export function parseTestcaseInput(input: string): ParsedTestcase {
  const variables: Record<string, unknown> = {};
  const types: Record<string, DataType> = {};

  try {
    if (!input || typeof input !== 'string') {
      throw new TestcaseParseError('Invalid input: must be non-empty string', { input });
    }

    const parts = smartSplit(input);

    if (parts.length === 0) {
      throw new TestcaseParseError('No testcase variables found', { input });
    }

    for (const part of parts) {
      const trimmed = part.trim();
      
      if (!trimmed.includes('=')) {
        console.warn(`[TestcaseParser] Skipping invalid part (no "="): ${trimmed}`);
        continue;
      }

      const equalIndex = trimmed.indexOf('=');
      const varName = trimmed.substring(0, equalIndex).trim();
      const valueStr = trimmed.substring(equalIndex + 1).trim();

      if (!varName) {
        console.warn(`[TestcaseParser] Skipping part with empty variable name`);
        continue;
      }

      if (!valueStr) {
        throw new TestcaseParseError(`Empty value for variable "${varName}"`, {
          variable: varName,
          input
        });
      }

      try {
        const { value, type } = parseValue(valueStr);
        variables[varName] = value;
        types[varName] = type;
      } catch (error) {
        throw new TestcaseParseError(
          `Failed to parse value for variable "${varName}"`,
          {
            variable: varName,
            valueStr,
            originalError: error instanceof Error ? error.message : String(error)
          }
        );
      }
    }

    return { variables, types, raw: input };
  } catch (error) {
    if (error instanceof TestcaseParseError) {
      throw error;
    }
    throw new TestcaseParseError('Failed to parse testcase input', {
      input,
      originalError: error instanceof Error ? error.message : String(error)
    });
  }
}

/**
 * Enhanced smart split that respects brackets and quotes (both single and double)
 */
function smartSplit(str: string): string[] {
  const parts: string[] = [];
  let current = '';
  let depth = 0;
  let inQuotes = false;
  let quoteChar = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const prevChar = i > 0 ? str[i - 1] : '';

    if ((char === '"' || char === "'") && prevChar !== '\\') {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inQuotes = false;
        quoteChar = '';
      }
      current += char;
    }
    else if (!inQuotes && (char === '[' || char === '(' || char === '{')) {
      depth++;
      current += char;
    } else if (!inQuotes && (char === ']' || char === ')' || char === '}')) {
      depth--;
      current += char;
    }
    else if ((char === ',' || char === '\n') && depth === 0 && !inQuotes) {
      if (current.trim()) parts.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) parts.push(current);
  return parts;
}

/**
 * Improved array type analysis with depth detection
 */
function analyzeArrayType(arr: unknown[]): DataType {
  if (!Array.isArray(arr) || arr.length === 0) return 'array';

  const hasArrayElements = arr.some(item => Array.isArray(item));
  
  if (hasArrayElements) {
    const has3D = arr.some(item => 
      Array.isArray(item) && item.some(subItem => Array.isArray(subItem))
    );
    if (has3D) return 'array3d';
    return 'array2d';
  }

  // Check if it looks like a tree (has nulls in pattern)
  const nullCount = arr.filter(item => item === null).length;
  if (nullCount > 0 && nullCount < arr.length) {
    // If more than 20% nulls, likely a tree
    if (nullCount / arr.length > 0.2) {
      return 'tree';
    }
  }

  return 'array';
}

/**
 * Enhanced value parsing with special value support
 */
function parseValue(valueStr: string): { value: unknown; type: DataType } {
  const trimmed = valueStr.trim();

  // Handle special numeric values
  if (trimmed === 'Infinity' || trimmed === '+Infinity') {
    return { value: Infinity, type: 'number' };
  }
  if (trimmed === '-Infinity') {
    return { value: -Infinity, type: 'number' };
  }
  if (trimmed === 'NaN') {
    return { value: NaN, type: 'number' };
  }

  // Array or complex structure
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const value = JSON.parse(trimmed);
      if (Array.isArray(value)) {
        const arrayType = analyzeArrayType(value);
        return { value, type: arrayType };
      }
      return { value, type: 'array' };
    } catch (error) {
      throw new Error(`Invalid JSON array: ${error instanceof Error ? error.message : 'parse failed'}`);
    }
  }

  // Object
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      const value = JSON.parse(trimmed);
      return { value, type: 'object' };
    } catch (error) {
      throw new Error(`Invalid JSON object: ${error instanceof Error ? error.message : 'parse failed'}`);
    }
  }

  // String with quotes
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    const value = trimmed.slice(1, -1)
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\\\\/g, '\\')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");
    return { value, type: 'string' };
  }

  // Boolean
  if (trimmed === 'true' || trimmed === 'false') {
    return { value: trimmed === 'true', type: 'boolean' };
  }

  // Null
  if (trimmed === 'null' || trimmed === 'None' || trimmed === 'nil') {
    return { value: null, type: 'null' };
  }

  // Number
  const numValue = Number(trimmed);
  if (!isNaN(numValue) && trimmed !== '') {
    return { value: numValue, type: 'number' };
  }

  // Default: treat as string
  return { value: trimmed, type: 'string' };
}

/**
 * Convert parsed testcase to language-specific input code
 */
export function generateInputCode(parsed: ParsedTestcase, language: string): string {
  const vars = Object.entries(parsed.variables);
  
  switch (language) {
    case 'python':
      return vars.map(([name, val]) => 
        `${name} = ${formatValuePython(val)}`
      ).join('\n');
      
    case 'javascript':
    case 'typescript':
      return vars.map(([name, val]) => 
        `const ${name} = ${JSON.stringify(val)};`
      ).join('\n');
      
    case 'java':
    case 'kotlin':
    case 'groovy':
      return vars.map(([name, val]) => 
        formatJavaVariable(name, val, parsed.types[name])
      ).join('\n');
      
    case 'cpp':
      return vars.map(([name, val]) => 
        formatCppVariable(name, val, parsed.types[name])
      ).join('\n');
      
    case 'c':
      return vars.map(([name, val]) => 
        formatCVariable(name, val, parsed.types[name])
      ).join('\n');
      
    case 'csharp':
      return vars.map(([name, val]) => 
        formatCSharpVariable(name, val, parsed.types[name])
      ).join('\n');
      
    case 'go':
      return vars.map(([name, val]) => 
        formatGoVariable(name, val, parsed.types[name])
      ).join('\n');
      
    case 'rust':
      return vars.map(([name, val]) => 
        formatRustVariable(name, val, parsed.types[name])
      ).join('\n');
      
    case 'swift':
      return vars.map(([name, val]) => 
        `let ${name} = ${JSON.stringify(val)}`
      ).join('\n');
      
    case 'ruby':
      return vars.map(([name, val]) => 
        `${name} = ${JSON.stringify(val)}`
      ).join('\n');
      
    case 'php':
      return vars.map(([name, val]) => 
        `$${name} = ${JSON.stringify(val)};`
      ).join('\n');
      
    case 'scala':
    case 'haskell':
    case 'elixir':
    case 'clojure':
    case 'fsharp':
      return vars.map(([name, val]) => 
        `val ${name} = ${JSON.stringify(val)}`
      ).join('\n');
      
    case 'lua':
      return vars.map(([name, val]) => 
        `local ${name} = ${JSON.stringify(val)}`
      ).join('\n');
      
    case 'perl':
      return vars.map(([name, val]) => 
        `my $${name} = ${JSON.stringify(val)};`
      ).join('\n');
      
    case 'r':
      return vars.map(([name, val]) => 
        `${name} <- ${JSON.stringify(val)}`
      ).join('\n');
      
    case 'bash':
      return vars.map(([name, val]) => 
        `${name}=${JSON.stringify(val)}`
      ).join('\n');
      
    default:
      return parsed.raw;
  }
}

function formatValuePython(val: any): string {
  if (val === null) return 'None';
  if (typeof val === 'boolean') return val ? 'True' : 'False';
  if (typeof val === 'string') {
    // Escape special characters for Python
    const escaped = val
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t');
    return `"${escaped}"`;
  }
  if (Array.isArray(val)) {
    // Recursively format nested arrays
    if (val.length > 0 && Array.isArray(val[0])) {
      const nested = val.map(arr => `[${arr.join(', ')}]`).join(', ');
      return `[${nested}]`;
    }
    return JSON.stringify(val);
  }
  return String(val);
}

function formatJavaVariable(name: string, val: any, type: string): string {
  if (Array.isArray(val)) {
    // Check if it's a 2D array
    if (val.length > 0 && Array.isArray(val[0])) {
      const rows = val.map(row => `{${row.join(', ')}}`).join(', ');
      return `int[][] ${name} = {${rows}};`;
    }
    // 1D array
    const elements = val.join(', ');
    // Determine array type based on first element
    if (val.length > 0) {
      if (typeof val[0] === 'string') {
        const quoted = val.map(v => `"${v}"`).join(', ');
        return `String[] ${name} = {${quoted}};`;
      }
      if (!Number.isInteger(val[0])) {
        return `double[] ${name} = {${elements}};`;
      }
    }
    return `int[] ${name} = {${elements}};`;
  }
  if (typeof val === 'number') {
    return Number.isInteger(val) ? `int ${name} = ${val};` : `double ${name} = ${val};`;
  }
  if (typeof val === 'string') {
    const escaped = val.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `String ${name} = "${escaped}";`;
  }
  if (typeof val === 'boolean') return `boolean ${name} = ${val};`;
  if (val === null) return `Object ${name} = null;`;
  return `Object ${name} = ${JSON.stringify(val)};`;
}

function formatCppVariable(name: string, val: any, type: string): string {
  if (Array.isArray(val)) {
    // Check if it's a 2D array
    if (val.length > 0 && Array.isArray(val[0])) {
      const rows = val.map(row => `{${row.join(', ')}}`).join(', ');
      return `vector<vector<int>> ${name} = {${rows}};`;
    }
    // 1D array
    const elements = val.join(', ');
    return `vector<int> ${name} = {${elements}};`;
  }
  if (typeof val === 'number') {
    // Handle floats vs ints
    return Number.isInteger(val) ? `int ${name} = ${val};` : `double ${name} = ${val};`;
  }
  if (typeof val === 'string') {
    // Escape special characters
    const escaped = val.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    return `string ${name} = "${escaped}";`;
  }
  if (typeof val === 'boolean') return `bool ${name} = ${val ? 'true' : 'false'};`;
  if (val === null) return `void* ${name} = nullptr;`;
  return `auto ${name} = ${JSON.stringify(val)};`;
}

function formatCVariable(name: string, val: any, type: string): string {
  if (Array.isArray(val)) {
    const elements = val.join(', ');
    return `int ${name}[] = {${elements}};\nint ${name}Size = ${val.length};`;
  }
  if (typeof val === 'number') return `int ${name} = ${val};`;
  if (typeof val === 'string') return `char ${name}[] = "${val}";`;
  if (typeof val === 'boolean') return `int ${name} = ${val ? 1 : 0};`;
  return `void* ${name} = NULL;`;
}

function formatCSharpVariable(name: string, val: any, type: string): string {
  if (Array.isArray(val)) {
    if (val.length > 0 && Array.isArray(val[0])) {
      const rows = val.map(row => `new[] {${row.join(', ')}}`).join(', ');
      return `int[][] ${name} = new int[][] {${rows}};`;
    }
    const elements = val.join(', ');
    return `int[] ${name} = new[] {${elements}};`;
  }
  if (typeof val === 'number') return `int ${name} = ${val};`;
  if (typeof val === 'string') return `string ${name} = "${val}";`;
  if (typeof val === 'boolean') return `bool ${name} = ${val ? 'true' : 'false'};`;
  return `object ${name} = null;`;
}

function formatGoVariable(name: string, val: any, type: string): string {
  if (Array.isArray(val)) {
    if (val.length > 0 && Array.isArray(val[0])) {
      const rows = val.map(row => `[]int{${row.join(', ')}}`).join(', ');
      return `${name} := [][]int{${rows}}`;
    }
    return `${name} := []int{${val.join(', ')}}`;
  }
  if (typeof val === 'number') return `${name} := ${val}`;
  if (typeof val === 'string') return `${name} := "${val}"`;
  if (typeof val === 'boolean') return `${name} := ${val}`;
  return `var ${name} interface{}`;
}

function formatRustVariable(name: string, val: any, type: string): string {
  if (Array.isArray(val)) {
    if (val.length > 0 && Array.isArray(val[0])) {
      const rows = val.map(row => `vec![${row.join(', ')}]`).join(', ');
      return `let ${name} = vec![${rows}];`;
    }
    return `let ${name} = vec![${val.join(', ')}];`;
  }
  if (typeof val === 'number') return `let ${name} = ${val};`;
  if (typeof val === 'string') return `let ${name} = "${val}".to_string();`;
  if (typeof val === 'boolean') return `let ${name} = ${val};`;
  return `let ${name} = None;`;
}
