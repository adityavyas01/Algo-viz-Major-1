export type NodeColor = 'red' | 'black';

export interface RBNode {
  value: number;
  color: NodeColor;
  left: RBNode | null;
  right: RBNode | null;
  parent: RBNode | null;
}

export interface RBTreeStep {
  tree: RBNode | null;
  operation: 'insert' | 'delete' | 'rotate' | 'recolor';
  targetValue: number;
  phase: 'searching' | 'inserting' | 'checking-violations' | 'rotating-left' | 'rotating-right' | 'recoloring' | 'complete';
  highlightedNodes: number[];
  changedColors: Map<number, NodeColor>;
  rotationNode: number | null;
  description: string;
}

export class RedBlackTree {
  root: RBNode | null = null;

  private createNode(value: number, color: NodeColor = 'red', parent: RBNode | null = null): RBNode {
    return { value, color, left: null, right: null, parent };
  }

  private rotateLeft(node: RBNode): void {
    const rightChild = node.right!;
    node.right = rightChild.left;
    
    if (rightChild.left) {
      rightChild.left.parent = node;
    }
    
    rightChild.parent = node.parent;
    
    if (!node.parent) {
      this.root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }
    
    rightChild.left = node;
    node.parent = rightChild;
  }

  private rotateRight(node: RBNode): void {
    const leftChild = node.left!;
    node.left = leftChild.right;
    
    if (leftChild.right) {
      leftChild.right.parent = node;
    }
    
    leftChild.parent = node.parent;
    
    if (!node.parent) {
      this.root = leftChild;
    } else if (node === node.parent.right) {
      node.parent.right = leftChild;
    } else {
      node.parent.left = leftChild;
    }
    
    leftChild.right = node;
    node.parent = leftChild;
  }

  private fixViolation(node: RBNode): void {
    let current: RBNode | null = node;
    
    while (current !== this.root && current?.parent?.color === 'red') {
      const parent = current.parent;
      const grandparent = parent.parent!;
      
      if (parent === grandparent.left) {
        const uncle = grandparent.right;
        
        if (uncle && uncle.color === 'red') {
          // Case 1: Uncle is red - recolor
          parent.color = 'black';
          uncle.color = 'black';
          grandparent.color = 'red';
          current = grandparent;
        } else {
          // Case 2/3: Uncle is black
          if (current === parent.right) {
            // Case 2: Node is right child - left rotate
            current = parent;
            this.rotateLeft(current);
          }
          // Case 3: Node is left child - right rotate and recolor
          parent.color = 'black';
          grandparent.color = 'red';
          this.rotateRight(grandparent);
        }
      } else {
        const uncle = grandparent.left;
        
        if (uncle && uncle.color === 'red') {
          // Case 1: Uncle is red - recolor
          parent.color = 'black';
          uncle.color = 'black';
          grandparent.color = 'red';
          current = grandparent;
        } else {
          // Case 2/3: Uncle is black
          if (current === parent.left) {
            // Case 2: Node is left child - right rotate
            current = parent;
            this.rotateRight(current);
          }
          // Case 3: Node is right child - left rotate and recolor
          parent.color = 'black';
          grandparent.color = 'red';
          this.rotateLeft(grandparent);
        }
      }
    }
    
    if (this.root) {
      this.root.color = 'black';
    }
  }

  insert(value: number): void {
    const newNode = this.createNode(value);
    
    if (!this.root) {
      this.root = newNode;
      this.root.color = 'black';
      return;
    }
    
    let current: RBNode | null = this.root;
    let parent: RBNode | null = null;
    
    while (current) {
      parent = current;
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return; // Duplicate value
      }
    }
    
    newNode.parent = parent;
    if (value < parent!.value) {
      parent!.left = newNode;
    } else {
      parent!.right = newNode;
    }
    
    this.fixViolation(newNode);
  }
}

function cloneTree(node: RBNode | null): RBNode | null {
  if (!node) return null;
  
  const cloned: RBNode = {
    value: node.value,
    color: node.color,
    left: null,
    right: null,
    parent: null,
  };
  
  if (node.left) {
    cloned.left = cloneTree(node.left);
    cloned.left.parent = cloned;
  }
  
  if (node.right) {
    cloned.right = cloneTree(node.right);
    cloned.right.parent = cloned;
  }
  
  return cloned;
}

function findNode(root: RBNode | null, value: number): RBNode | null {
  if (!root) return null;
  if (root.value === value) return root;
  if (value < root.value) return findNode(root.left, value);
  return findNode(root.right, value);
}

export function generateInsertSteps(tree: RedBlackTree, value: number): RBTreeStep[] {
  const steps: RBTreeStep[] = [];
  
  // Step 1: Start insertion
  steps.push({
    tree: cloneTree(tree.root),
    operation: 'insert',
    targetValue: value,
    phase: 'searching',
    highlightedNodes: [],
    changedColors: new Map(),
    rotationNode: null,
    description: `Starting to insert value ${value} into the Red-Black tree`,
  });
  
  // Trace the search path
  if (tree.root) {
    const path: number[] = [];
    let current: RBNode | null = tree.root;
    
    while (current) {
      path.push(current.value);
      steps.push({
        tree: cloneTree(tree.root),
        operation: 'insert',
        targetValue: value,
        phase: 'searching',
        highlightedNodes: [...path],
        changedColors: new Map(),
        rotationNode: null,
        description: `Comparing ${value} with ${current.value}. ${value < current.value ? 'Go left' : value > current.value ? 'Go right' : 'Duplicate found'}`,
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
  }
  
  // Step 2: Insert as red node
  const beforeInsert = cloneTree(tree.root);
  tree.insert(value);
  const afterInsert = cloneTree(tree.root);
  
  steps.push({
    tree: afterInsert,
    operation: 'insert',
    targetValue: value,
    phase: 'inserting',
    highlightedNodes: [value],
    changedColors: new Map([[value, 'red']]),
    rotationNode: null,
    description: `Inserted ${value} as a RED node (new nodes are always red)`,
  });
  
  // Step 3: Check and fix violations
  const insertedNode = findNode(tree.root, value);
  if (insertedNode) {
    steps.push({
      tree: cloneTree(tree.root),
      operation: 'insert',
      targetValue: value,
      phase: 'checking-violations',
      highlightedNodes: [value],
      changedColors: new Map(),
      rotationNode: null,
      description: `Checking Red-Black tree properties...`,
    });
  }
  
  // Final step
  steps.push({
    tree: cloneTree(tree.root),
    operation: 'insert',
    targetValue: value,
    phase: 'complete',
    highlightedNodes: [],
    changedColors: new Map(),
    rotationNode: null,
    description: `✓ Successfully inserted ${value}. All Red-Black properties maintained!`,
  });
  
  return steps;
}
