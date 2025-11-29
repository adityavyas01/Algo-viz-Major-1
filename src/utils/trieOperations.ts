import { TrieNode, TrieStats } from '../types/trie';

export class Trie {
  root: TrieNode;
  private nodeCounter: number = 0;

  constructor() {
    this.root = {
      children: new Map(),
      isEndOfWord: false,
      id: 'root',
      level: 0
    };
  }

  insert(word: string): void {
    let current = this.root;
    
    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      
      if (!current.children.has(char)) {
        current.children.set(char, {
          children: new Map(),
          isEndOfWord: false,
          id: `node_${++this.nodeCounter}`,
          level: i + 1
        });
      }
      
      current = current.children.get(char)!;
    }
    
    current.isEndOfWord = true;
    current.word = word.toLowerCase();
  }

  search(word: string): boolean {
    const node = this.searchNode(word);
    return node !== null && node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    return this.searchNode(prefix) !== null;
  }

  private searchNode(word: string): TrieNode | null {
    let current = this.root;
    
    for (const char of word.toLowerCase()) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }
    
    return current;
  }

  getWordsWithPrefix(prefix: string): string[] {
    const node = this.searchNode(prefix);
    if (!node) return [];
    
    const words: string[] = [];
    this.dfs(node, prefix.toLowerCase(), words);
    return words.sort();
  }

  private dfs(node: TrieNode, currentWord: string, words: string[]): void {
    if (node.isEndOfWord) {
      words.push(currentWord);
    }
    
    for (const [char, childNode] of node.children) {
      this.dfs(childNode, currentWord + char, words);
    }
  }

  getAllWords(): string[] {
    const words: string[] = [];
    this.dfs(this.root, '', words);
    return words.sort();
  }

  getStats(): TrieStats {
    let totalNodes = 0;
    let totalWords = 0;
    let maxDepth = 0;

    const traverse = (node: TrieNode, depth: number) => {
      totalNodes++;
      maxDepth = Math.max(maxDepth, depth);
      
      if (node.isEndOfWord) {
        totalWords++;
      }
      
      for (const child of node.children.values()) {
        traverse(child, depth + 1);
      }
    };

    traverse(this.root, 0);

    return {
      totalNodes,
      totalWords,
      maxDepth,
      memoryUsage: totalNodes * 64 // Rough estimate in bytes
    };
  }

  delete(word: string): boolean {
    return this.deleteHelper(this.root, word.toLowerCase(), 0);
  }

  private deleteHelper(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) return false;
      node.isEndOfWord = false;
      return node.children.size === 0;
    }

    const char = word[index];
    const childNode = node.children.get(char);
    
    if (!childNode) return false;

    const shouldDeleteChild = this.deleteHelper(childNode, word, index + 1);

    if (shouldDeleteChild) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }

    return false;
  }
}