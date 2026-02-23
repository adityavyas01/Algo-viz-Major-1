/**
 * Robust signature detection with caching and fallbacks
 */

import type { LanguageId, MethodSignature, ParameterInfo } from '@/types/execution';
import { SignatureDetectionError } from '@/types/execution';

// Signature cache to avoid re-parsing same code
const signatureCache = new Map<string, MethodSignature>();

function getCacheKey(code: string, language: LanguageId): string {
  const hash = simpleHash(code);
  return `${language}:${hash}`;
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

export function detectSignature(
  code: string,
  language: LanguageId,
  useCache = true
): MethodSignature {
  if (useCache) {
    const cacheKey = getCacheKey(code, language);
    const cached = signatureCache.get(cacheKey);
    if (cached) return cached;
  }

  try {
    let signature: MethodSignature;

    switch (language) {
      case 'python':
      case 'python3':
        signature = detectPythonSignature(code);
        break;
      case 'javascript':
      case 'typescript':
        signature = detectJavaScriptSignature(code);
        break;
      case 'java':
        signature = detectJavaSignature(code);
        break;
      case 'cpp':
        signature = detectCppSignature(code);
        break;
      case 'c':
        signature = detectCSignature(code);
        break;
      case 'csharp':
        signature = detectCSharpSignature(code);
        break;
      case 'go':
        signature = detectGoSignature(code);
        break;
      case 'rust':
        signature = detectRustSignature(code);
        break;
      case 'kotlin':
        signature = detectKotlinSignature(code);
        break;
      case 'swift':
        signature = detectSwiftSignature(code);
        break;
      default:
        signature = detectGenericSignature(code);
    }

    if (useCache) {
      const cacheKey = getCacheKey(code, language);
      signatureCache.set(cacheKey, signature);
    }

    return signature;
  } catch (error) {
    throw new SignatureDetectionError(
      `Failed to detect signature for ${language}`,
      {
        language,
        code: code.substring(0, 200),
        originalError: error instanceof Error ? error.message : String(error)
      }
    );
  }
}

function detectPythonSignature(code: string): MethodSignature {
  const cleaned = code
    .replace(/@[\w.]+(?:\([^)]*\))?\s*\n/g, '')
    .replace(/#[^\n]*\n/g, '\n');

  const methodPattern = /def\s+(\w+)\s*\(([\s\S]*?)\)\s*(?:->\s*([\w\[\],\s|Optional]+?))?:/;
  const match = cleaned.match(methodPattern);

  if (!match) {
    return {
      name: 'solve',
      paramCount: 0,
      params: [],
      returnType: 'Any',
      isStatic: false,
      isAsync: cleaned.includes('async def'),
      hasClass: /class\s+\w+/.test(code)
    };
  }

  const name = match[1];
  const paramsStr = match[2];
  const returnType = match[3]?.trim() || 'Any';
  const isAsync = cleaned.includes('async def');

  const params = parsePythonParameters(paramsStr);
  const isStatic = !params.some(p => p.name === 'self');

  return {
    name,
    paramCount: params.filter(p => p.name !== 'self').length,
    params: params.filter(p => p.name !== 'self'),
    returnType,
    isStatic,
    isAsync,
    hasClass: /class\s+\w+/.test(code)
  };
}

function parsePythonParameters(paramsStr: string): ParameterInfo[] {
  if (!paramsStr.trim()) return [];

  const params: ParameterInfo[] = [];
  let current = '';
  let depth = 0;
  let inString = false;
  let stringChar = '';

  const tokens: string[] = [];
  
  for (let i = 0; i < paramsStr.length; i++) {
    const char = paramsStr[i];
    const prevChar = i > 0 ? paramsStr[i - 1] : '';

    if ((char === '"' || char === "'") && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
      current += char;
    } else if (!inString && (char === '[' || char === '(' || char === '{')) {
      depth++;
      current += char;
    } else if (!inString && (char === ']' || char === ')' || char === '}')) {
      depth--;
      current += char;
    } else if (char === ',' && depth === 0 && !inString) {
      tokens.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  if (current.trim()) tokens.push(current.trim());

  for (const token of tokens) {
    if (!token || token === '*' || token === '**') continue;

    const isVariadic = token.startsWith('*') || token.startsWith('**');
    const cleanToken = token.replace(/^\*+/, '');
    
    const colonIndex = cleanToken.indexOf(':');
    const equalsIndex = cleanToken.indexOf('=');
    
    let name = '';
    let type = 'Any';
    let hasDefault = false;

    if (colonIndex === -1 && equalsIndex === -1) {
      name = cleanToken.trim();
    } else if (colonIndex !== -1 && equalsIndex === -1) {
      name = cleanToken.substring(0, colonIndex).trim();
      type = cleanToken.substring(colonIndex + 1).trim();
    } else if (colonIndex === -1 && equalsIndex !== -1) {
      name = cleanToken.substring(0, equalsIndex).trim();
      hasDefault = true;
    } else {
      name = cleanToken.substring(0, colonIndex).trim();
      type = cleanToken.substring(colonIndex + 1, equalsIndex).trim();
      hasDefault = true;
    }

    params.push({
      name,
      type,
      isOptional: hasDefault || type.includes('Optional'),
      hasDefault,
      isVariadic
    });
  }

  return params;
}

function detectJavaScriptSignature(code: string): MethodSignature {
  const classMethodPattern = /(?:async\s+)?(\w+)\s*\(([^)]*)\)\s*(?::\s*([\w<>\[\]|]+))?\s*\{/;
  const match = code.match(classMethodPattern);

  if (!match) {
    return {
      name: 'solve',
      paramCount: 0,
      params: [],
      returnType: 'any',
      isStatic: false,
      isAsync: false,
      hasClass: /class\s+\w+/.test(code)
    };
  }

  const name = match[1];
  const paramsStr = match[2];
  const returnType = match[3] || 'any';
  const isAsync = code.substring(Math.max(0, match.index! - 10), match.index!).includes('async');

  const params = parseJavaScriptParameters(paramsStr);

  return {
    name,
    paramCount: params.length,
    params,
    returnType,
    isStatic: code.includes(`static ${name}`),
    isAsync,
    hasClass: /class\s+\w+/.test(code)
  };
}

function parseJavaScriptParameters(paramsStr: string): ParameterInfo[] {
  if (!paramsStr.trim()) return [];

  const params: ParameterInfo[] = [];
  const tokens = smartSplitParams(paramsStr);

  for (const token of tokens) {
    const isVariadic = token.startsWith('...');
    const cleanToken = token.replace(/^\.\.\./, '');
    
    const colonIndex = cleanToken.indexOf(':');
    const equalsIndex = cleanToken.indexOf('=');
    const questionIndex = cleanToken.indexOf('?');

    let name = '';
    let type = 'any';
    let hasDefault = false;
    let isOptional = false;

    if (questionIndex !== -1) {
      isOptional = true;
    }

    if (colonIndex !== -1) {
      name = cleanToken.substring(0, colonIndex).replace('?', '').trim();
      const typeAndDefault = cleanToken.substring(colonIndex + 1);
      if (typeAndDefault.includes('=')) {
        type = typeAndDefault.substring(0, typeAndDefault.indexOf('=')).trim();
        hasDefault = true;
      } else {
        type = typeAndDefault.trim();
      }
    } else if (equalsIndex !== -1) {
      name = cleanToken.substring(0, equalsIndex).trim();
      hasDefault = true;
    } else {
      name = cleanToken.replace('?', '').trim();
    }

    params.push({
      name,
      type,
      isOptional: isOptional || hasDefault,
      hasDefault,
      isVariadic
    });
  }

  return params;
}

function detectJavaSignature(code: string): MethodSignature {
  const pattern = /(public|private|protected|static|\s)+[\w<>\[\],\s]+\s+(\w+)\s*\(([^)]*)\)/;
  const match = code.match(pattern);

  if (!match) {
    return {
      name: 'solve',
      paramCount: 0,
      params: [],
      returnType: 'Object',
      isStatic: false,
      isAsync: false,
      hasClass: true
    };
  }

  const modifiers = match[1];
  const name = match[2];
  const paramsStr = match[3];

  const params = parseJavaParameters(paramsStr);

  return {
    name,
    paramCount: params.length,
    params,
    returnType: 'Object',
    isStatic: modifiers.includes('static'),
    isAsync: false,
    hasClass: true
  };
}

function parseJavaParameters(paramsStr: string): ParameterInfo[] {
  if (!paramsStr.trim()) return [];

  const params: ParameterInfo[] = [];
  const tokens = smartSplitParams(paramsStr);

  for (const token of tokens) {
    const parts = token.trim().split(/\s+/);
    if (parts.length < 2) continue;

    const isVariadic = token.includes('...');
    const type = parts.slice(0, -1).join(' ').replace('...', '');
    const name = parts[parts.length - 1];

    params.push({
      name,
      type,
      isOptional: false,
      hasDefault: false,
      isVariadic
    });
  }

  return params;
}

function detectCppSignature(code: string): MethodSignature {
  const cleaned = code.replace(/class\s+Solution\s*\{[^{]*$/s, '');

  const pattern = /([\w<>:&*\s]+)\s+(\w+)\s*\(([^)]*)\)/;
  const match = cleaned.match(pattern);

  if (!match) {
    return {
      name: 'solve',
      paramCount: 0,
      params: [],
      returnType: 'int',
      isStatic: false,
      isAsync: false,
      hasClass: /class\s+Solution/.test(code)
    };
  }

  const returnType = match[1].trim();
  const name = match[2];
  const paramsStr = match[3];

  const params = parseCppParameters(paramsStr);

  return {
    name,
    paramCount: params.length,
    params,
    returnType,
    isStatic: false,
    isAsync: false,
    hasClass: /class\s+Solution/.test(code)
  };
}

function parseCppParameters(paramsStr: string): ParameterInfo[] {
  if (!paramsStr.trim()) return [];

  const params: ParameterInfo[] = [];
  const tokens = smartSplitParams(paramsStr);

  for (const token of tokens) {
    const parts = token.trim().split(/\s+/);
    if (parts.length === 0) continue;

    const type = parts.slice(0, -1).join(' ') || 'int';
    const name = parts[parts.length - 1];

    params.push({
      name,
      type,
      isOptional: false,
      hasDefault: token.includes('='),
      isVariadic: false
    });
  }

  return params;
}

function detectGenericSignature(code: string): MethodSignature {
  const funcPattern = /(?:function|def|fun|func|fn)\s+(\w+)/;
  const match = code.match(funcPattern);

  return {
    name: match ? match[1] : 'solve',
    paramCount: 0,
    params: [],
    returnType: 'any',
    isStatic: false,
    isAsync: false,
    hasClass: false
  };
}

function detectCSignature(code: string): MethodSignature { return detectCppSignature(code); }
function detectCSharpSignature(code: string): MethodSignature { return detectJavaSignature(code); }
function detectGoSignature(code: string): MethodSignature { return detectGenericSignature(code); }
function detectRustSignature(code: string): MethodSignature { return detectGenericSignature(code); }
function detectKotlinSignature(code: string): MethodSignature { return detectJavaSignature(code); }
function detectSwiftSignature(code: string): MethodSignature { return detectGenericSignature(code); }

function smartSplitParams(str: string): string[] {
  const result: string[] = [];
  let current = '';
  let depth = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === '<' || char === '(' || char === '[') {
      depth++;
      current += char;
    } else if (char === '>' || char === ')' || char === ']') {
      depth--;
      current += char;
    } else if (char === ',' && depth === 0) {
      if (current.trim()) result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) result.push(current.trim());
  return result;
}

export function clearSignatureCache(): void {
  signatureCache.clear();
}
