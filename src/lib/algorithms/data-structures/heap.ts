export interface HeapStep {
  heap: number[];
  operation: 'insert' | 'extract' | 'heapify-up' | 'heapify-down';
  phase: 'comparing' | 'swapping' | 'complete';
  highlightedIndices: number[];
  comparedIndices: number[];
  description: string;
}

export class MaxHeap {
  heap: number[] = [];

  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private leftChild(index: number): number {
    return 2 * index + 1;
  }

  private rightChild(index: number): number {
    return 2 * index + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private heapifyUp(index: number): void {
    while (index > 0 && this.heap[this.parent(index)] < this.heap[index]) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  private heapifyDown(index: number): void {
    let maxIndex = index;
    const left = this.leftChild(index);
    const right = this.rightChild(index);

    if (left < this.heap.length && this.heap[left] > this.heap[maxIndex]) {
      maxIndex = left;
    }

    if (right < this.heap.length && this.heap[right] > this.heap[maxIndex]) {
      maxIndex = right;
    }

    if (index !== maxIndex) {
      this.swap(index, maxIndex);
      this.heapifyDown(maxIndex);
    }
  }

  insert(value: number): void {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMax(): number | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;

    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return max;
  }

  clone(): MaxHeap {
    const newHeap = new MaxHeap();
    newHeap.heap = [...this.heap];
    return newHeap;
  }
}

export function generateInsertSteps(heap: MaxHeap, value: number): HeapStep[] {
  const steps: HeapStep[] = [];
  const workingHeap = heap.clone();

  // Step 1: Add to end
  workingHeap.heap.push(value);
  let currentIndex = workingHeap.heap.length - 1;

  steps.push({
    heap: [...workingHeap.heap],
    operation: 'insert',
    phase: 'comparing',
    highlightedIndices: [currentIndex],
    comparedIndices: [],
    description: `Insert ${value} at the end of the heap (index ${currentIndex})`,
  });

  // Step 2: Heapify up
  while (currentIndex > 0) {
    const parentIndex = Math.floor((currentIndex - 1) / 2);

    steps.push({
      heap: [...workingHeap.heap],
      operation: 'heapify-up',
      phase: 'comparing',
      highlightedIndices: [currentIndex, parentIndex],
      comparedIndices: [currentIndex, parentIndex],
      description: `Compare ${workingHeap.heap[currentIndex]} at index ${currentIndex} with parent ${workingHeap.heap[parentIndex]} at index ${parentIndex}`,
    });

    if (workingHeap.heap[currentIndex] > workingHeap.heap[parentIndex]) {
      // Swap
      [workingHeap.heap[currentIndex], workingHeap.heap[parentIndex]] = 
        [workingHeap.heap[parentIndex], workingHeap.heap[currentIndex]];

      steps.push({
        heap: [...workingHeap.heap],
        operation: 'heapify-up',
        phase: 'swapping',
        highlightedIndices: [parentIndex, currentIndex],
        comparedIndices: [],
        description: `Swap! ${value} > ${workingHeap.heap[currentIndex]}. Move ${value} up to index ${parentIndex}`,
      });

      currentIndex = parentIndex;
    } else {
      steps.push({
        heap: [...workingHeap.heap],
        operation: 'heapify-up',
        phase: 'complete',
        highlightedIndices: [currentIndex],
        comparedIndices: [],
        description: `Heap property satisfied. ${workingHeap.heap[currentIndex]} ≤ ${workingHeap.heap[parentIndex]}`,
      });
      break;
    }
  }

  // Final step
  steps.push({
    heap: [...workingHeap.heap],
    operation: 'insert',
    phase: 'complete',
    highlightedIndices: [],
    comparedIndices: [],
    description: `✓ Successfully inserted ${value}. Max-heap property maintained!`,
  });

  return steps;
}

export function generateExtractMaxSteps(heap: MaxHeap): HeapStep[] {
  const steps: HeapStep[] = [];
  const workingHeap = heap.clone();

  if (workingHeap.heap.length === 0) {
    steps.push({
      heap: [],
      operation: 'extract',
      phase: 'complete',
      highlightedIndices: [],
      comparedIndices: [],
      description: 'Heap is empty!',
    });
    return steps;
  }

  const maxValue = workingHeap.heap[0];

  // Step 1: Highlight max
  steps.push({
    heap: [...workingHeap.heap],
    operation: 'extract',
    phase: 'comparing',
    highlightedIndices: [0],
    comparedIndices: [],
    description: `Extract maximum value: ${maxValue}`,
  });

  if (workingHeap.heap.length === 1) {
    workingHeap.heap.pop();
    steps.push({
      heap: [...workingHeap.heap],
      operation: 'extract',
      phase: 'complete',
      highlightedIndices: [],
      comparedIndices: [],
      description: `Removed ${maxValue}. Heap is now empty.`,
    });
    return steps;
  }

  // Step 2: Move last to root
  const lastValue = workingHeap.heap.pop()!;
  workingHeap.heap[0] = lastValue;

  steps.push({
    heap: [...workingHeap.heap],
    operation: 'extract',
    phase: 'swapping',
    highlightedIndices: [0],
    comparedIndices: [],
    description: `Move last element ${lastValue} to root position`,
  });

  // Step 3: Heapify down
  let currentIndex = 0;
  
  while (true) {
    const leftIndex = 2 * currentIndex + 1;
    const rightIndex = 2 * currentIndex + 2;
    let largestIndex = currentIndex;

    const indices = [currentIndex];
    if (leftIndex < workingHeap.heap.length) indices.push(leftIndex);
    if (rightIndex < workingHeap.heap.length) indices.push(rightIndex);

    steps.push({
      heap: [...workingHeap.heap],
      operation: 'heapify-down',
      phase: 'comparing',
      highlightedIndices: indices,
      comparedIndices: indices,
      description: `Compare ${workingHeap.heap[currentIndex]} with its children`,
    });

    if (leftIndex < workingHeap.heap.length && 
        workingHeap.heap[leftIndex] > workingHeap.heap[largestIndex]) {
      largestIndex = leftIndex;
    }

    if (rightIndex < workingHeap.heap.length && 
        workingHeap.heap[rightIndex] > workingHeap.heap[largestIndex]) {
      largestIndex = rightIndex;
    }

    if (largestIndex !== currentIndex) {
      [workingHeap.heap[currentIndex], workingHeap.heap[largestIndex]] = 
        [workingHeap.heap[largestIndex], workingHeap.heap[currentIndex]];

      steps.push({
        heap: [...workingHeap.heap],
        operation: 'heapify-down',
        phase: 'swapping',
        highlightedIndices: [currentIndex, largestIndex],
        comparedIndices: [],
        description: `Swap ${workingHeap.heap[largestIndex]} with ${workingHeap.heap[currentIndex]}`,
      });

      currentIndex = largestIndex;
    } else {
      steps.push({
        heap: [...workingHeap.heap],
        operation: 'heapify-down',
        phase: 'complete',
        highlightedIndices: [currentIndex],
        comparedIndices: [],
        description: `Heap property restored at index ${currentIndex}`,
      });
      break;
    }
  }

  // Final step
  steps.push({
    heap: [...workingHeap.heap],
    operation: 'extract',
    phase: 'complete',
    highlightedIndices: [],
    comparedIndices: [],
    description: `✓ Extracted maximum value ${maxValue}. Heap rebalanced!`,
  });

  return steps;
}
