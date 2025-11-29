export interface AVLNode {
  value: number;
  left: AVLNode | null;
  right: AVLNode | null;
  height: number;
}

export interface AVLTreeStep {
  tree: AVLNode | null;
  operation: 'insert' | 'delete';
  targetValue: number;
  phase: 'searching' | 'inserting' | 'checking-balance' | 'rotating-left' | 'rotating-right' | 'rotating-left-right' | 'rotating-right-left' | 'complete';
  highlightedNodes: number[];
  rotationNode: number | null;
  description: string;
  balanceFactor: { [key: number]: number };
}

export class AVLTree {
  root: AVLNode | null = null;

  getHeight(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  getBalance(node: AVLNode | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  updateHeight(node: AVLNode): void {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  rightRotate(y: AVLNode): AVLNode {
    const x = y.left!;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  leftRotate(x: AVLNode): AVLNode {
    const y = x.right!;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }

  insert(value: number): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: AVLNode | null, value: number): AVLNode {
    if (!node) {
      return { value, left: null, right: null, height: 1 };
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node;
    }

    this.updateHeight(node);
    const balance = this.getBalance(node);

    if (balance > 1 && value < node.left!.value) {
      return this.rightRotate(node);
    }
    if (balance < -1 && value > node.right!.value) {
      return this.leftRotate(node);
    }
    if (balance > 1 && value > node.left!.value) {
      node.left = this.leftRotate(node.left!);
      return this.rightRotate(node);
    }
    if (balance < -1 && value < node.right!.value) {
      node.right = this.rightRotate(node.right!);
      return this.leftRotate(node);
    }

    return node;
  }

  clone(): AVLTree {
    const newTree = new AVLTree();
    newTree.root = this.cloneNode(this.root);
    return newTree;
  }

  private cloneNode(node: AVLNode | null): AVLNode | null {
    if (!node) return null;
    return {
      value: node.value,
      left: this.cloneNode(node.left),
      right: this.cloneNode(node.right),
      height: node.height,
    };
  }
}

function cloneTree(node: AVLNode | null): AVLNode | null {
  if (!node) return null;
  return {
    value: node.value,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
    height: node.height,
  };
}

function getHeight(node: AVLNode | null): number {
  return node ? node.height : 0;
}

function getBalance(node: AVLNode | null): number {
  return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

function updateHeight(node: AVLNode): void {
  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}

function rightRotate(y: AVLNode): AVLNode {
  const x = y.left!;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  updateHeight(y);
  updateHeight(x);
  return x;
}

function leftRotate(x: AVLNode): AVLNode {
  const y = x.right!;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  updateHeight(x);
  updateHeight(y);
  return y;
}

function collectBalanceFactors(node: AVLNode | null): { [key: number]: number } {
  const factors: { [key: number]: number } = {};
  if (!node) return factors;
  
  const queue: AVLNode[] = [node];
  while (queue.length > 0) {
    const current = queue.shift()!;
    factors[current.value] = getBalance(current);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
  
  return factors;
}

export function generateInsertSteps(tree: AVLTree, value: number): AVLTreeStep[] {
  const steps: AVLTreeStep[] = [];
  let currentTree = cloneTree(tree.root);

  // Step 1: Start insertion
  steps.push({
    tree: cloneTree(currentTree),
    operation: 'insert',
    targetValue: value,
    phase: 'searching',
    highlightedNodes: [],
    rotationNode: null,
    description: `Starting to insert value ${value} into the AVL tree`,
    balanceFactor: collectBalanceFactors(currentTree),
  });

  // Trace the path to where the node will be inserted
  const path: number[] = [];
  let current = currentTree;
  while (current) {
    path.push(current.value);
    steps.push({
      tree: cloneTree(currentTree),
      operation: 'insert',
      targetValue: value,
      phase: 'searching',
      highlightedNodes: [...path],
      rotationNode: null,
      description: `Comparing ${value} with ${current.value}. ${value < current.value ? 'Go left' : value > current.value ? 'Go right' : 'Duplicate found'}`,
      balanceFactor: collectBalanceFactors(currentTree),
    });

    if (value < current.value) {
      if (!current.left) break;
      current = current.left;
    } else if (value > current.value) {
      if (!current.right) break;
      current = current.right;
    } else {
      break;
    }
  }

  // Step 2: Insert the node
  currentTree = insertWithoutRebalance(currentTree, value);
  steps.push({
    tree: cloneTree(currentTree),
    operation: 'insert',
    targetValue: value,
    phase: 'inserting',
    highlightedNodes: [value],
    rotationNode: null,
    description: `Inserted ${value} as a new leaf node`,
    balanceFactor: collectBalanceFactors(currentTree),
  });

  // Step 3: Check balance factors and perform rotations
  currentTree = rebalanceWithSteps(currentTree, value, steps);

  // Final step
  steps.push({
    tree: cloneTree(currentTree),
    operation: 'insert',
    targetValue: value,
    phase: 'complete',
    highlightedNodes: [],
    rotationNode: null,
    description: `✓ Successfully inserted ${value}. Tree is balanced!`,
    balanceFactor: collectBalanceFactors(currentTree),
  });

  return steps;
}

function insertWithoutRebalance(node: AVLNode | null, value: number): AVLNode {
  if (!node) {
    return { value, left: null, right: null, height: 1 };
  }

  if (value < node.value) {
    node.left = insertWithoutRebalance(node.left, value);
  } else if (value > node.value) {
    node.right = insertWithoutRebalance(node.right, value);
  } else {
    return node;
  }

  updateHeight(node);
  return node;
}

function rebalanceWithSteps(node: AVLNode | null, insertedValue: number, steps: AVLTreeStep[]): AVLNode {
  if (!node) return node!;

  updateHeight(node);
  const balance = getBalance(node);

  // Check if this node needs rebalancing
  if (Math.abs(balance) > 1) {
    steps.push({
      tree: cloneTree(node),
      operation: 'insert',
      targetValue: insertedValue,
      phase: 'checking-balance',
      highlightedNodes: [node.value],
      rotationNode: node.value,
      description: `Node ${node.value} is unbalanced (balance factor: ${balance})`,
      balanceFactor: collectBalanceFactors(node),
    });

    // Left Left Case
    if (balance > 1 && node.left && insertedValue < node.left.value) {
      steps.push({
        tree: cloneTree(node),
        operation: 'insert',
        targetValue: insertedValue,
        phase: 'rotating-right',
        highlightedNodes: [node.value, node.left.value],
        rotationNode: node.value,
        description: `Left-Left case detected. Performing right rotation on node ${node.value}`,
        balanceFactor: collectBalanceFactors(node),
      });
      node = rightRotate(node);
      steps.push({
        tree: cloneTree(node),
        operation: 'insert',
        targetValue: insertedValue,
        phase: 'rotating-right',
        highlightedNodes: [node.value],
        rotationNode: null,
        description: `Right rotation completed. New root: ${node.value}`,
        balanceFactor: collectBalanceFactors(node),
      });
      return node;
    }

    // Right Right Case
    if (balance < -1 && node.right && insertedValue > node.right.value) {
      steps.push({
        tree: cloneTree(node),
        operation: 'insert',
        targetValue: insertedValue,
        phase: 'rotating-left',
        highlightedNodes: [node.value, node.right.value],
        rotationNode: node.value,
        description: `Right-Right case detected. Performing left rotation on node ${node.value}`,
        balanceFactor: collectBalanceFactors(node),
      });
      node = leftRotate(node);
      steps.push({
        tree: cloneTree(node),
        operation: 'insert',
        targetValue: insertedValue,
        phase: 'rotating-left',
        highlightedNodes: [node.value],
        rotationNode: null,
        description: `Left rotation completed. New root: ${node.value}`,
        balanceFactor: collectBalanceFactors(node),
      });
      return node;
    }

    // Left Right Case
    if (balance > 1 && node.left && insertedValue > node.left.value) {
      steps.push({
        tree: cloneTree(node),
        operation: 'insert',
        targetValue: insertedValue,
        phase: 'rotating-left-right',
        highlightedNodes: [node.value, node.left.value],
        rotationNode: node.left.value,
        description: `Left-Right case detected. First, left rotation on node ${node.left.value}`,
        balanceFactor: collectBalanceFactors(node),
      });
      node.left = leftRotate(node.left);
      steps.push({
        tree: cloneTree(node),
        operation: 'insert',
        targetValue: insertedValue,
        phase: 'rotating-left-right',
        highlightedNodes: [node.value, node.left.value],
        rotationNode: node.value,
        description: `Then, right rotation on node ${node.value}`,
        balanceFactor: collectBalanceFactors(node),
      });
      node = rightRotate(node);
      steps.push({
        tree: cloneTree(node),
        operation: 'insert',
        targetValue: insertedValue,
        phase: 'rotating-left-right',
        highlightedNodes: [node.value],
        rotationNode: null,
        description: `Left-Right rotation completed. New root: ${node.value}`,
        balanceFactor: collectBalanceFactors(node),
      });
      return node;
    }

    // Right Left Case
    if (balance < -1 && node.right && insertedValue < node.right.value) {
      steps.push({
        tree: cloneTree(node),
        operation: 'insert',
        targetValue: insertedValue,
        phase: 'rotating-right-left',
        highlightedNodes: [node.value, node.right.value],
        rotationNode: node.right.value,
        description: `Right-Left case detected. First, right rotation on node ${node.right.value}`,
        balanceFactor: collectBalanceFactors(node),
      });
      node.right = rightRotate(node.right);
      steps.push({
        tree: cloneTree(node),
        operation: 'insert',
        targetValue: insertedValue,
        phase: 'rotating-right-left',
        highlightedNodes: [node.value, node.right.value],
        rotationNode: node.value,
        description: `Then, left rotation on node ${node.value}`,
        balanceFactor: collectBalanceFactors(node),
      });
      node = leftRotate(node);
      steps.push({
        tree: cloneTree(node),
        operation: 'insert',
        targetValue: insertedValue,
        phase: 'rotating-right-left',
        highlightedNodes: [node.value],
        rotationNode: null,
        description: `Right-Left rotation completed. New root: ${node.value}`,
        balanceFactor: collectBalanceFactors(node),
      });
      return node;
    }
  }

  // Recursively rebalance the subtrees
  if (node.left) {
    node.left = rebalanceWithSteps(node.left, insertedValue, steps);
  }
  if (node.right) {
    node.right = rebalanceWithSteps(node.right, insertedValue, steps);
  }

  updateHeight(node);
  return node;
}
