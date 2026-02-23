/**
 * IndexedDB Cache Service for Problems
 * Provides caching with 30-minute TTL and in-memory fallback
 */

import type { Problem } from "./testcaseService";

const DB_NAME = "algoviz-cache-v1";
const STORE_NAME = "problems";
const CACHE_VERSION = 1;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const DETAIL_CACHE_TTL = 60 * 60 * 1000; // 1 hour for problem details

interface CacheEntry {
  key: string;
  data: Problem[];
  timestamp: number;
  totalCount: number;
}

interface DetailCacheEntry {
  key: string;
  data: any;
  timestamp: number;
}

// In-memory fallback cache with LRU eviction
class MemoryCache {
  private cache = new Map<string, CacheEntry | DetailCacheEntry>();
  private maxSize = 500;

  set(key: string, entry: CacheEntry | DetailCacheEntry): void {
    // LRU: If at capacity, remove oldest entry
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, entry);
  }

  get(key: string): CacheEntry | DetailCacheEntry | undefined {
    return this.cache.get(key);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

const memoryCache = new MemoryCache();
let dbInstance: IDBDatabase | null = null;
let isIndexedDBAvailable = true;

/**
 * Initialize IndexedDB
 */
async function initDB(): Promise<IDBDatabase | null> {
  if (!isIndexedDBAvailable) {
    return null;
  }

  if (dbInstance) {
    return dbInstance;
  }

  try {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, CACHE_VERSION);

      request.onerror = () => {
        console.warn("IndexedDB not available, using memory cache");
        isIndexedDBAvailable = false;
        reject(request.error);
      };

      request.onsuccess = () => {
        dbInstance = request.result;
        resolve(dbInstance);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: "key" });
          objectStore.createIndex("timestamp", "timestamp", { unique: false });
        }
      };
    });
  } catch (error) {
    console.warn("IndexedDB initialization failed, using memory cache:", error);
    isIndexedDBAvailable = false;
    return null;
  }
}

/**
 * Check if cache entry is still valid
 */
function isCacheValid(timestamp: number, ttl: number = CACHE_TTL): boolean {
  return Date.now() - timestamp < ttl;
}

/**
 * Generate cache key for problems list
 */
function generateProblemsKey(page: number, difficulty?: string): string {
  return `${difficulty || "all"}_page_${page}`;
}

/**
 * Generate cache key for search results
 */
function generateSearchKey(query: string, limit: number): string {
  return `search_${query.toLowerCase()}_${limit}`;
}

/**
 * Generate cache key for problem details
 */
function generateDetailKey(slug: string): string {
  return `problem_detail_${slug}`;
}

/**
 * Cache problems list
 */
export async function cacheProblems(
  page: number,
  problems: Problem[],
  totalCount: number,
  difficulty?: string
): Promise<void> {
  const key = generateProblemsKey(page, difficulty);
  const entry: CacheEntry = {
    key,
    data: problems,
    timestamp: Date.now(),
    totalCount,
  };

  // Always cache in memory
  memoryCache.set(key, entry);

  // Try IndexedDB
  try {
    const db = await initDB();
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.put(entry);
  } catch (error) {
    console.warn("Failed to cache in IndexedDB:", error);
  }
}

/**
 * Get cached problems
 */
export async function getCachedProblems(
  page: number,
  difficulty?: string
): Promise<{ problems: Problem[]; totalCount: number } | null> {
  const key = generateProblemsKey(page, difficulty);

  // Check memory cache first
  const memoryEntry = memoryCache.get(key) as CacheEntry | undefined;
  if (memoryEntry && isCacheValid(memoryEntry.timestamp)) {
    return {
      problems: memoryEntry.data,
      totalCount: memoryEntry.totalCount,
    };
  }

  // Try IndexedDB
  try {
    const db = await initDB();
    if (!db) return null;

    return new Promise((resolve) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const entry = request.result as CacheEntry | undefined;
        if (entry && isCacheValid(entry.timestamp)) {
          // Also update memory cache
          memoryCache.set(key, entry);
          resolve({
            problems: entry.data,
            totalCount: entry.totalCount,
          });
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        resolve(null);
      };
    });
  } catch (error) {
    console.warn("Failed to get from IndexedDB:", error);
    return null;
  }
}

/**
 * Cache search results
 */
export async function cacheSearchResults(
  query: string,
  results: Problem[],
  totalCount: number,
  limit: number = 100
): Promise<void> {
  const key = generateSearchKey(query, limit);
  const entry: CacheEntry = {
    key,
    data: results,
    timestamp: Date.now(),
    totalCount,
  };

  // Always cache in memory
  memoryCache.set(key, entry);

  // Try IndexedDB
  try {
    const db = await initDB();
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.put(entry);
  } catch (error) {
    console.warn("Failed to cache search in IndexedDB:", error);
  }
}

/**
 * Get cached search results (5 minute TTL)
 */
export async function getCachedSearchResults(
  query: string,
  limit: number = 100
): Promise<{ problems: Problem[]; totalCount: number } | null> {
  const key = generateSearchKey(query, limit);
  const searchTTL = 5 * 60 * 1000; // 5 minutes for search results

  // Check memory cache first
  const memoryEntry = memoryCache.get(key) as CacheEntry | undefined;
  if (memoryEntry && isCacheValid(memoryEntry.timestamp, searchTTL)) {
    return {
      problems: memoryEntry.data,
      totalCount: memoryEntry.totalCount,
    };
  }

  // Try IndexedDB
  try {
    const db = await initDB();
    if (!db) return null;

    return new Promise((resolve) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const entry = request.result as CacheEntry | undefined;
        if (entry && isCacheValid(entry.timestamp, searchTTL)) {
          memoryCache.set(key, entry);
          resolve({
            problems: entry.data,
            totalCount: entry.totalCount,
          });
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        resolve(null);
      };
    });
  } catch (error) {
    console.warn("Failed to get search from IndexedDB:", error);
    return null;
  }
}

/**
 * Cache problem details
 */
export async function cacheProblemDetail(slug: string, data: any): Promise<void> {
  const key = generateDetailKey(slug);
  const entry: DetailCacheEntry = {
    key,
    data,
    timestamp: Date.now(),
  };

  // Always cache in memory
  memoryCache.set(key, entry);

  // Try IndexedDB
  try {
    const db = await initDB();
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.put(entry);
  } catch (error) {
    console.warn("Failed to cache detail in IndexedDB:", error);
  }
}

/**
 * Get cached problem details (1 hour TTL)
 */
export async function getCachedProblemDetail(slug: string): Promise<any | null> {
  const key = generateDetailKey(slug);

  // Check memory cache first
  const memoryEntry = memoryCache.get(key) as DetailCacheEntry | undefined;
  if (memoryEntry && isCacheValid(memoryEntry.timestamp, DETAIL_CACHE_TTL)) {
    return memoryEntry.data;
  }

  // Try IndexedDB
  try {
    const db = await initDB();
    if (!db) return null;

    return new Promise((resolve) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const entry = request.result as DetailCacheEntry | undefined;
        if (entry && isCacheValid(entry.timestamp, DETAIL_CACHE_TTL)) {
          memoryCache.set(key, entry);
          resolve(entry.data);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        resolve(null);
      };
    });
  } catch (error) {
    console.warn("Failed to get detail from IndexedDB:", error);
    return null;
  }
}

/**
 * Clear all cache
 */
export async function clearCache(): Promise<void> {
  // Clear memory cache
  memoryCache.clear();

  // Clear IndexedDB
  try {
    const db = await initDB();
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.clear();
  } catch (error) {
    console.warn("Failed to clear IndexedDB:", error);
  }
}

/**
 * Clear expired cache entries
 */
export async function clearExpiredCache(): Promise<void> {
  try {
    const db = await initDB();
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index("timestamp");
    const request = index.openCursor();

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      if (cursor) {
        const entry = cursor.value as CacheEntry | DetailCacheEntry;
        if (!isCacheValid(entry.timestamp)) {
          cursor.delete();
        }
        cursor.continue();
      }
    };
  } catch (error) {
    console.warn("Failed to clear expired cache:", error);
  }
}
