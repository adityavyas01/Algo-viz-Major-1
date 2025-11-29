export interface HashEntry {
  key: string;
  value: string;
}

export interface HashTableStep {
  table: Array<Array<HashEntry>>;
  operation: 'insert' | 'search' | 'delete';
  targetKey: string;
  hashValue: number;
  phase: 'hashing' | 'probing' | 'found' | 'not-found' | 'inserting' | 'deleting' | 'complete';
  highlightedIndex: number | null;
  highlightedChainIndex: number | null;
  description: string;
  collisionCount: number;
}

export class HashTable {
  size: number;
  table: Array<Array<HashEntry>>;

  constructor(size: number = 10) {
    this.size = size;
    this.table = Array.from({ length: size }, () => []);
  }

  hash(key: string): number {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue = (hashValue + key.charCodeAt(i) * (i + 1)) % this.size;
    }
    return hashValue;
  }

  insert(key: string, value: string): void {
    const index = this.hash(key);
    const chain = this.table[index];
    const existingEntry = chain.find(entry => entry.key === key);
    
    if (existingEntry) {
      existingEntry.value = value;
    } else {
      chain.push({ key, value });
    }
  }

  search(key: string): string | null {
    const index = this.hash(key);
    const chain = this.table[index];
    const found = chain.find(entry => entry.key === key);
    return found ? found.value : null;
  }

  delete(key: string): boolean {
    const index = this.hash(key);
    const chain = this.table[index];
    const entryIndex = chain.findIndex(entry => entry.key === key);
    
    if (entryIndex !== -1) {
      chain.splice(entryIndex, 1);
      return true;
    }
    return false;
  }

  clone(): HashTable {
    const newHashTable = new HashTable(this.size);
    newHashTable.table = this.table.map(chain => chain.map(entry => ({ ...entry })));
    return newHashTable;
  }
}

function cloneTable(table: Array<Array<HashEntry>>): Array<Array<HashEntry>> {
  return table.map(chain => chain.map(entry => ({ ...entry })));
}

export function generateInsertSteps(hashTable: HashTable, key: string, value: string): HashTableStep[] {
  const steps: HashTableStep[] = [];
  const hashValue = hashTable.hash(key);
  const table = cloneTable(hashTable.table);
  const chain = table[hashValue];
  const hasCollision = chain.length > 0;

  // Step 1: Hashing
  steps.push({
    table: cloneTable(table),
    operation: 'insert',
    targetKey: key,
    hashValue,
    phase: 'hashing',
    highlightedIndex: hashValue,
    highlightedChainIndex: null,
    description: `Computing hash of "${key}": hash("${key}") = ${hashValue}`,
    collisionCount: 0,
  });

  // Step 2: Check for collision
  if (hasCollision) {
    steps.push({
      table: cloneTable(table),
      operation: 'insert',
      targetKey: key,
      hashValue,
      phase: 'probing',
      highlightedIndex: hashValue,
      highlightedChainIndex: null,
      description: `Collision detected at index ${hashValue}! Chain has ${chain.length} item(s). Using separate chaining to resolve.`,
      collisionCount: chain.length,
    });

    // Check each entry in the chain
    for (let i = 0; i < chain.length; i++) {
      steps.push({
        table: cloneTable(table),
        operation: 'insert',
        targetKey: key,
        hashValue,
        phase: 'probing',
        highlightedIndex: hashValue,
        highlightedChainIndex: i,
        description: `Checking entry ${i + 1}: key="${chain[i].key}" ${chain[i].key === key ? '✓ Match found! Will update.' : '✗ Not a match.'}`,
        collisionCount: chain.length,
      });
    }
  }

  // Step 3: Inserting
  const existingIndex = chain.findIndex(entry => entry.key === key);
  if (existingIndex !== -1) {
    chain[existingIndex].value = value;
    steps.push({
      table: cloneTable(table),
      operation: 'insert',
      targetKey: key,
      hashValue,
      phase: 'inserting',
      highlightedIndex: hashValue,
      highlightedChainIndex: existingIndex,
      description: `Updating existing key "${key}" with new value "${value}"`,
      collisionCount: chain.length,
    });
  } else {
    chain.push({ key, value });
    steps.push({
      table: cloneTable(table),
      operation: 'insert',
      targetKey: key,
      hashValue,
      phase: 'inserting',
      highlightedIndex: hashValue,
      highlightedChainIndex: chain.length - 1,
      description: `Inserting new entry: "${key}" = "${value}" at the end of the chain`,
      collisionCount: chain.length - 1,
    });
  }

  // Step 4: Complete
  steps.push({
    table: cloneTable(table),
    operation: 'insert',
    targetKey: key,
    hashValue,
    phase: 'complete',
    highlightedIndex: hashValue,
    highlightedChainIndex: existingIndex !== -1 ? existingIndex : chain.length - 1,
    description: `✓ Successfully inserted "${key}" = "${value}"`,
    collisionCount: hasCollision ? chain.length - 1 : 0,
  });

  return steps;
}

export function generateSearchSteps(hashTable: HashTable, key: string): HashTableStep[] {
  const steps: HashTableStep[] = [];
  const hashValue = hashTable.hash(key);
  const table = cloneTable(hashTable.table);
  const chain = table[hashValue];

  // Step 1: Hashing
  steps.push({
    table: cloneTable(table),
    operation: 'search',
    targetKey: key,
    hashValue,
    phase: 'hashing',
    highlightedIndex: hashValue,
    highlightedChainIndex: null,
    description: `Computing hash of "${key}": hash("${key}") = ${hashValue}`,
    collisionCount: 0,
  });

  // Step 2: Probing
  if (chain.length === 0) {
    steps.push({
      table: cloneTable(table),
      operation: 'search',
      targetKey: key,
      hashValue,
      phase: 'not-found',
      highlightedIndex: hashValue,
      highlightedChainIndex: null,
      description: `Index ${hashValue} is empty. Key "${key}" not found.`,
      collisionCount: 0,
    });
  } else {
    steps.push({
      table: cloneTable(table),
      operation: 'search',
      targetKey: key,
      hashValue,
      phase: 'probing',
      highlightedIndex: hashValue,
      highlightedChainIndex: null,
      description: `Searching in chain at index ${hashValue} with ${chain.length} item(s)`,
      collisionCount: chain.length > 1 ? chain.length - 1 : 0,
    });

    // Check each entry
    let found = false;
    for (let i = 0; i < chain.length; i++) {
      const isMatch = chain[i].key === key;
      steps.push({
        table: cloneTable(table),
        operation: 'search',
        targetKey: key,
        hashValue,
        phase: isMatch ? 'found' : 'probing',
        highlightedIndex: hashValue,
        highlightedChainIndex: i,
        description: `Checking entry ${i + 1}: key="${chain[i].key}" ${isMatch ? `✓ Found! Value = "${chain[i].value}"` : '✗ Not a match, continue searching...'}`,
        collisionCount: chain.length > 1 ? chain.length - 1 : 0,
      });
      
      if (isMatch) {
        found = true;
        break;
      }
    }

    if (!found) {
      steps.push({
        table: cloneTable(table),
        operation: 'search',
        targetKey: key,
        hashValue,
        phase: 'not-found',
        highlightedIndex: hashValue,
        highlightedChainIndex: null,
        description: `✗ Key "${key}" not found in the chain`,
        collisionCount: chain.length > 1 ? chain.length - 1 : 0,
      });
    }
  }

  return steps;
}

export function generateDeleteSteps(hashTable: HashTable, key: string): HashTableStep[] {
  const steps: HashTableStep[] = [];
  const hashValue = hashTable.hash(key);
  const table = cloneTable(hashTable.table);
  const chain = table[hashValue];

  // Step 1: Hashing
  steps.push({
    table: cloneTable(table),
    operation: 'delete',
    targetKey: key,
    hashValue,
    phase: 'hashing',
    highlightedIndex: hashValue,
    highlightedChainIndex: null,
    description: `Computing hash of "${key}": hash("${key}") = ${hashValue}`,
    collisionCount: 0,
  });

  // Step 2: Probing
  if (chain.length === 0) {
    steps.push({
      table: cloneTable(table),
      operation: 'delete',
      targetKey: key,
      hashValue,
      phase: 'not-found',
      highlightedIndex: hashValue,
      highlightedChainIndex: null,
      description: `Index ${hashValue} is empty. Key "${key}" not found.`,
      collisionCount: 0,
    });
  } else {
    steps.push({
      table: cloneTable(table),
      operation: 'delete',
      targetKey: key,
      hashValue,
      phase: 'probing',
      highlightedIndex: hashValue,
      highlightedChainIndex: null,
      description: `Searching for "${key}" in chain at index ${hashValue}`,
      collisionCount: chain.length > 1 ? chain.length - 1 : 0,
    });

    // Check each entry
    const entryIndex = chain.findIndex(entry => entry.key === key);
    
    for (let i = 0; i < chain.length; i++) {
      const isMatch = i === entryIndex;
      steps.push({
        table: cloneTable(table),
        operation: 'delete',
        targetKey: key,
        hashValue,
        phase: isMatch ? 'found' : 'probing',
        highlightedIndex: hashValue,
        highlightedChainIndex: i,
        description: `Checking entry ${i + 1}: key="${chain[i].key}" ${isMatch ? '✓ Found! Preparing to delete...' : '✗ Not a match.'}`,
        collisionCount: chain.length > 1 ? chain.length - 1 : 0,
      });
      
      if (isMatch) break;
    }

    if (entryIndex !== -1) {
      // Delete the entry
      chain.splice(entryIndex, 1);
      steps.push({
        table: cloneTable(table),
        operation: 'delete',
        targetKey: key,
        hashValue,
        phase: 'deleting',
        highlightedIndex: hashValue,
        highlightedChainIndex: null,
        description: `Deleting entry "${key}" from the chain`,
        collisionCount: chain.length > 0 ? chain.length : 0,
      });

      steps.push({
        table: cloneTable(table),
        operation: 'delete',
        targetKey: key,
        hashValue,
        phase: 'complete',
        highlightedIndex: hashValue,
        highlightedChainIndex: null,
        description: `✓ Successfully deleted "${key}"`,
        collisionCount: 0,
      });
    } else {
      steps.push({
        table: cloneTable(table),
        operation: 'delete',
        targetKey: key,
        hashValue,
        phase: 'not-found',
        highlightedIndex: hashValue,
        highlightedChainIndex: null,
        description: `✗ Key "${key}" not found in the chain`,
        collisionCount: chain.length > 1 ? chain.length - 1 : 0,
      });
    }
  }

  return steps;
}
