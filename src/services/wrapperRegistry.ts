import { LanguageId, ParsedTestcase, MethodSignature } from '@/types/execution';

export type CodeWrapperFunction = (userCode: string, inputCode: string, parsed: ParsedTestcase, signature: MethodSignature) => string;

class WrapperRegistry {
  private wrappers = new Map<LanguageId, CodeWrapperFunction>();

  register(language: LanguageId, wrapper: CodeWrapperFunction) {
    this.wrappers.set(language, wrapper);
  }

  getWrapper(language: LanguageId): CodeWrapperFunction | undefined {
    return this.wrappers.get(language);
  }

  hasWrapper(language: LanguageId): boolean {
    return this.wrappers.has(language);
  }
}

export const codeWrapperRegistry = new WrapperRegistry();
