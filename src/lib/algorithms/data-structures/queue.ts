export type QueueStep = {
  queue: number[];
  highlightedIndex: number | null;
  action: 'enqueue' | 'dequeue' | 'peek' | 'idle';
  description: string;
};

export function generateEnqueueSteps(currentQueue: number[], value: number): QueueStep[] {
  const steps: QueueStep[] = [];
  const newQueue = [...currentQueue, value];

  steps.push({
    queue: [...currentQueue],
    highlightedIndex: null,
    action: 'idle',
    description: `Preparing to enqueue ${value}.`,
  });

  steps.push({
    queue: newQueue,
    highlightedIndex: newQueue.length - 1,
    action: 'enqueue',
    description: `${value} is enqueued to the rear.`,
  });

  steps.push({
    queue: newQueue,
    highlightedIndex: null,
    action: 'idle',
    description: `Operation complete.`,
  });

  return steps;
}

export function generateDequeueSteps(currentQueue: number[]): QueueStep[] {
  const steps: QueueStep[] = [];
  if (currentQueue.length === 0) {
    steps.push({ queue: [], highlightedIndex: null, action: 'idle', description: 'Queue is empty. Cannot dequeue.' });
    return steps;
  }

  const dequeuedValue = currentQueue[0];
  const newQueue = currentQueue.slice(1);

  steps.push({
    queue: [...currentQueue],
    highlightedIndex: 0,
    action: 'peek',
    description: `Preparing to dequeue the front element, ${dequeuedValue}.`,
  });

  steps.push({
    queue: [...currentQueue],
    highlightedIndex: 0,
    action: 'dequeue',
    description: `${dequeuedValue} is being dequeued from the front.`,
  });

  steps.push({
    queue: newQueue,
    highlightedIndex: null,
    action: 'idle',
    description: `${dequeuedValue} has been dequeued.`,
  });
  
  if (newQueue.length > 0) {
    steps.push({
      queue: newQueue,
      highlightedIndex: 0,
      action: 'peek',
      description: `The new front element is ${newQueue[0]}.`,
    });
  } else {
     steps.push({
      queue: newQueue,
      highlightedIndex: null,
      action: 'idle',
      description: `Queue is now empty.`,
    });
  }

  return steps;
}
