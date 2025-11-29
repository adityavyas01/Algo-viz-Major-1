import type { Node } from '@/components/modern/ModernLinkedListVisualization';

export type LinkedListStep = {
  list: Node[];
  highlightedIndices: number[];
  description: string;
  removedNode?: Node;
};

export function generateAddSteps(currentList: Node[], value: number, position: 'head' | 'tail' | number): LinkedListStep[] {
  const steps: LinkedListStep[] = [];
  const newNode = { value, id: Date.now() };
  let newList = [...currentList];

  steps.push({
    list: [...currentList],
    highlightedIndices: [],
    description: `Preparing to add new node with value ${value}.`,
  });

  let insertionIndex: number;
  let description: string;

  if (position === 'head') {
    insertionIndex = 0;
    description = `Inserting ${value} at the head of the list.`;
    newList.unshift(newNode);
  } else if (position === 'tail') {
    insertionIndex = newList.length;
    description = `Appending ${value} to the tail of the list.`;
    newList.push(newNode);
  } else {
    insertionIndex = position;
    if (insertionIndex < 0 || insertionIndex > newList.length) {
      steps.push({ list: currentList, highlightedIndices: [], description: `Error: Invalid index ${insertionIndex}.` });
      return steps;
    }
    description = `Inserting ${value} at index ${insertionIndex}.`;
    newList.splice(insertionIndex, 0, newNode);
  }

  steps.push({
    list: newList,
    highlightedIndices: [insertionIndex],
    description,
  });
  
  steps.push({
    list: [...newList],
    highlightedIndices: [],
    description: `Operation complete. Node ${value} has been added.`,
  });

  return steps;
}

export function generateRemoveSteps(currentList: Node[], position: 'head' | 'tail' | number): LinkedListStep[] {
  const steps: LinkedListStep[] = [];
  if (currentList.length === 0) {
    steps.push({ list: [], highlightedIndices: [], description: "List is empty, nothing to remove." });
    return steps;
  }

  let removalIndex: number;
  let description: string;
  let removedNode: Node | undefined;

  if (position === 'head') {
    removalIndex = 0;
    description = `Removing node from the head.`;
  } else if (position === 'tail') {
    removalIndex = currentList.length - 1;
    description = `Removing node from the tail.`;
  } else {
    removalIndex = position;
    if (removalIndex < 0 || removalIndex >= currentList.length) {
      steps.push({ list: currentList, highlightedIndices: [], description: `Error: Invalid index ${removalIndex}.` });
      return steps;
    }
    description = `Removing node at index ${removalIndex}.`;
  }
  
  removedNode = currentList[removalIndex];
  steps.push({
    list: [...currentList],
    highlightedIndices: [removalIndex],
    description,
    removedNode,
  });

  const newList = currentList.filter((_, i) => i !== removalIndex);

  steps.push({
    list: newList,
    highlightedIndices: [],
    description: `Node with value ${removedNode.value} removed.`,
  });

  return steps;
}

export function generateSearchSteps(currentList: Node[], value: number): LinkedListStep[] {
  const steps: LinkedListStep[] = [];
  if (currentList.length === 0) {
    steps.push({ list: [], highlightedIndices: [], description: "List is empty, cannot search." });
    return steps;
  }

  steps.push({
    list: [...currentList],
    highlightedIndices: [],
    description: `Starting search for value ${value}.`,
  });

  let found = false;
  for (let i = 0; i < currentList.length; i++) {
    steps.push({
      list: [...currentList],
      highlightedIndices: [i],
      description: `Checking node at index ${i} with value ${currentList[i].value}.`,
    });
    if (currentList[i].value === value) {
      steps.push({
        list: [...currentList],
        highlightedIndices: [i],
        description: `Value ${value} found at index ${i}.`,
      });
      found = true;
      break;
    }
  }

  if (!found) {
    steps.push({
      list: [...currentList],
      highlightedIndices: [],
      description: `Value ${value} not found in the list.`,
    });
  }

  return steps;
}
