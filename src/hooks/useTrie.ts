import { useState, useCallback, useMemo } from 'react';
import { Trie } from '../utils/trieOperations';
import { TrieStats, SearchResult } from '../types/trie';

export const useTrie = (initialWords: string[] = []) => {
  const [words, setWords] = useState<string[]>(initialWords);
  const [searchTerm, setSearchTerm] = useState('');
  
  const trie = useMemo(() => {
    const newTrie = new Trie();
    words.forEach(word => newTrie.insert(word));
    return newTrie;
  }, [words]);

  const addWord = useCallback((word: string) => {
    if (word.trim() && !words.includes(word.toLowerCase().trim())) {
      setWords(prev => [...prev, word.toLowerCase().trim()]);
    }
  }, [words]);

  const removeWord = useCallback((word: string) => {
    setWords(prev => prev.filter(w => w !== word.toLowerCase()));
  }, []);

  const clearAll = useCallback(() => {
    setWords([]);
    setSearchTerm('');
  }, []);

  const search = useCallback((term: string): SearchResult => {
    const suggestions = trie.getWordsWithPrefix(term).slice(0, 10);
    return {
      word: term,
      isComplete: trie.search(term),
      suggestions
    };
  }, [trie]);

  const stats: TrieStats = useMemo(() => trie.getStats(), [trie]);

  return {
    words,
    trie,
    searchTerm,
    setSearchTerm,
    addWord,
    removeWord,
    clearAll,
    search,
    stats
  };
};