export type StackStep = {
  stack: number[];
  highlightedIndex: number | null;
  action: 'push' | 'pop' | 'peek' | 'idle';
  description: string;
};

export function generatePushSteps(currentStack: number[], value: number): StackStep[] {
  const steps: StackStep[] = [];
  const newStack = [...currentStack, value];

  steps.push({
    stack: [...currentStack],
    highlightedIndex: null,
    action: 'idle',
    description: `Preparing to push ${value} onto the stack.`,
  });

  steps.push({
    stack: newStack,
    highlightedIndex: newStack.length - 1,
    action: 'push',
    description: `${value} is pushed onto the stack.`,
  });

  steps.push({
    stack: newStack,
    highlightedIndex: null,
    action: 'peek',
    description: `The new top element is ${value}.`,
  });

  return steps;
}

export function generatePopSteps(currentStack: number[]): StackStep[] {
  const steps: StackStep[] = [];
  if (currentStack.length === 0) {
    steps.push({ stack: [], highlightedIndex: null, action: 'idle', description: 'Stack is empty. Cannot pop.' });
    return steps;
  }

  const poppedValue = currentStack[currentStack.length - 1];
  const newStack = currentStack.slice(0, -1);

  steps.push({
    stack: [...currentStack],
    highlightedIndex: currentStack.length - 1,
    action: 'peek',
    description: `Preparing to pop the top element, ${poppedValue}.`,
  });

  steps.push({
    stack: [...currentStack],
    highlightedIndex: currentStack.length - 1,
    action: 'pop',
    description: `${poppedValue} is being popped from the stack.`,
  });

  steps.push({
    stack: newStack,
    highlightedIndex: null,
    action: 'idle',
    description: `${poppedValue} has been popped.`,
  });
  
  if (newStack.length > 0) {
    steps.push({
      stack: newStack,
      highlightedIndex: newStack.length - 1,
      action: 'peek',
      description: `The new top element is ${newStack[newStack.length - 1]}.`,
    });
  } else {
     steps.push({
      stack: newStack,
      highlightedIndex: null,
      action: 'idle',
      description: `Stack is now empty.`,
    });
  }

  return steps;
}
