import { v4 as uuidv4 } from 'uuid';

export interface TreeNode {
  id: string;
  value: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
}

export interface PositionedTreeNode extends TreeNode {
  x: number;
  y: number;
  level: number;
  left?: PositionedTreeNode | null;
  right?: PositionedTreeNode | null;
}

export type TraversalType = 'inorder' | 'preorder' | 'postorder';
export type OperationType = 'insert' | 'delete' | 'search' | TraversalType;

export interface BinaryTreeStep {
  tree: PositionedTreeNode | null;
  currentNodeId?: string;
  visitedNodeIds: string[];
  traversalOrder: number[];
  description: string;
  callStack: string[];
  operation: OperationType;
  isFinalStep?: boolean;
}

export class BinarySearchTree {
  root: TreeNode | null = null;

  insert(value: number): TreeNode | null {
    const newNode = { id: uuidv4(), value, left: null, right: null };
    if (!this.root) {
      this.root = newNode;
      return this.root;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return null; // No duplicates
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this.root;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this.root;
        }
        current = current.right;
      }
    }
  }

  delete(value: number): TreeNode | null {
    this.root = this._deleteNode(this.root, value);
    return this.root;
  }

  private _deleteNode(node: TreeNode | null, value: number): TreeNode | null {
    if (!node) return null;

    if (value < node.value) {
      node.left = this._deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._deleteNode(node.right, value);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const successor = this._findMin(node.right);
      node.value = successor.value;
      // The id of the node doesn't change, only its value.
      // We need to delete the successor from the right subtree.
      node.right = this._deleteNode(node.right, successor.value);
    }
    return node;
  }

  private _findMin(node: TreeNode): TreeNode {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  
  find(value: number): TreeNode | null {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }
}

export function positionTree(
  node: TreeNode | null,
  x = 400,
  y = 60,
  hSpacing = 200,
  vSpacing = 80,
  level = 0
): PositionedTreeNode | null {
  if (!node) return null;
  const positionedNode: PositionedTreeNode = {
    id: node.id,
    value: node.value,
    x,
    y,
    level,
    left: positionTree(node.left || null, x - hSpacing, y + vSpacing, hSpacing / 2, vSpacing, level + 1),
    right: positionTree(node.right || null, x + hSpacing, y + vSpacing, hSpacing / 2, vSpacing, level + 1)
  };
  return positionedNode;
}

function cloneTree(node: TreeNode | null): TreeNode | null {
  if (!node) return null;
  return {
    ...node,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
  };
}

export function generateInsertSteps(tree: BinarySearchTree, value: number): BinaryTreeStep[] {
    const steps: BinaryTreeStep[] = [];
    const tempTree = new BinarySearchTree();
    tempTree.root = cloneTree(tree.root);

    const addStep = (
        description: string,
        currentNodeId?: string,
        visitedIds: string[] = [],
        isFinal: boolean = false
    ) => {
        steps.push({
            tree: positionTree(cloneTree(tempTree.root)),
            currentNodeId,
            visitedNodeIds: visitedIds,
            traversalOrder: [],
            callStack: [],
            description,
            operation: 'insert',
            isFinalStep: isFinal,
        });
    };

    if (tempTree.find(value)) {
        addStep(`Value ${value} already exists in the tree. No duplicates allowed.`, undefined, [], true);
        return steps;
    }

    addStep(`Starting insertion of ${value}.`);

    if (!tempTree.root) {
        tempTree.insert(value);
        addStep(`Tree is empty. Inserting ${value} as the root.`, tempTree.root?.id, [tempTree.root!.id], true);
        return steps;
    }

    let current = tempTree.root;
    const visited: string[] = [];

    while (current) {
        visited.push(current.id);
        addStep(`Comparing ${value} with current node ${current.value}.`, current.id, visited);

        if (value < current.value) {
            if (current.left) {
                addStep(`${value} is less than ${current.value}. Moving to the left child.`, current.id, visited);
                current = current.left;
            } else {
                addStep(`${value} is less than ${current.value}. Found an empty spot. Inserting ${value}.`, current.id, visited);
                tempTree.insert(value);
                const newNode = current.left!;
                visited.push(newNode.id);
                addStep(`Node ${value} inserted as the left child of ${current.value}.`, newNode.id, visited, true);
                break;
            }
        } else {
            if (current.right) {
                addStep(`${value} is greater than ${current.value}. Moving to the right child.`, current.id, visited);
                current = current.right;
            } else {
                addStep(`${value} is greater than ${current.value}. Found an empty spot. Inserting ${value}.`, current.id, visited);
                tempTree.insert(value);
                const newNode = current.right!;
                visited.push(newNode.id);
                addStep(`Node ${value} inserted as the right child of ${current.value}.`, newNode.id, visited, true);
                break;
            }
        }
    }
    return steps;
}

export function generateDeleteSteps(tree: BinarySearchTree, value: number): BinaryTreeStep[] {
    const steps: BinaryTreeStep[] = [];
    const tempTree = new BinarySearchTree();
    tempTree.root = cloneTree(tree.root);

    const addStep = (
        description: string,
        currentNodeId?: string,
        visitedIds: string[] = [],
        isFinal: boolean = false
    ) => {
        steps.push({
            tree: positionTree(cloneTree(tempTree.root)),
            currentNodeId,
            visitedNodeIds: visitedIds,
            traversalOrder: [],
            callStack: [],
            description,
            operation: 'delete',
            isFinalStep: isFinal,
        });
    };

    if (!tempTree.find(value)) {
        addStep(`Value ${value} not found in the tree.`, undefined, [], true);
        return steps;
    }

    addStep(`Starting deletion of ${value}.`);
    
    const visited: string[] = [];
    
    const deleteNodeRecursive = (node: TreeNode | null, val: number): TreeNode | null => {
        if (!node) {
            addStep(`Value ${val} not found in this branch.`);
            return null;
        }
        
        visited.push(node.id);
        addStep(`Comparing ${val} with current node ${node.value}.`, node.id, visited);

        if (val < node.value) {
            addStep(`${val} is less than ${node.value}. Moving to the left child.`, node.id, visited);
            node.left = deleteNodeRecursive(node.left || null, val);
        } else if (val > node.value) {
            addStep(`${val} is greater than ${node.value}. Moving to the right child.`, node.id, visited);
            node.right = deleteNodeRecursive(node.right || null, val);
        } else {
            addStep(`Found node with value ${val}.`, node.id, visited);

            if (!node.left) {
                addStep(`Node has no left child. Replacing with right child.`, node.id, visited);
                return node.right;
            }
            if (!node.right) {
                addStep(`Node has no right child. Replacing with left child.`, node.id, visited);
                return node.left;
            }

            addStep(`Node has two children. Finding successor (smallest in right subtree).`, node.id, visited);
            const successor = findMin(node.right!);
            addStep(`Successor is ${successor.value}. Replacing ${node.value} with ${successor.value}.`, successor.id, visited);
            node.value = successor.value;
            
            addStep(`Deleting the original successor node ${successor.value} from the right subtree.`, node.id, visited);
            node.right = deleteNodeRecursive(node.right || null, successor.value);
        }
        return node;
    };
    
    const findMin = (node: TreeNode): TreeNode => {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    };

    tempTree.root = deleteNodeRecursive(tempTree.root, value);
    addStep(`Deletion of ${value} complete.`, undefined, visited, true);

    return steps;
}

export function generateSearchSteps(tree: BinarySearchTree, value: number): BinaryTreeStep[] {
    const steps: BinaryTreeStep[] = [];
    const tempTree = new BinarySearchTree();
    tempTree.root = cloneTree(tree.root);

    const addStep = (
        description: string,
        currentNodeId?: string,
        visitedIds: string[] = [],
        isFinal: boolean = false
    ) => {
        steps.push({
            tree: positionTree(cloneTree(tempTree.root)),
            currentNodeId,
            visitedNodeIds: visitedIds,
            traversalOrder: [],
            callStack: [],
            description,
            operation: 'search',
            isFinalStep: isFinal,
        });
    };

    addStep(`Starting search for ${value}.`);

    if (!tempTree.root) {
        addStep(`Tree is empty. Value ${value} not found.`, undefined, [], true);
        return steps;
    }

    let current = tempTree.root;
    const visited: string[] = [];

    while (current) {
        visited.push(current.id);
        addStep(`Comparing ${value} with current node ${current.value}.`, current.id, visited);

        if (value === current.value) {
            addStep(`Found value ${value}.`, current.id, visited, true);
            return steps;
        }

        if (value < current.value) {
            if (current.left) {
                addStep(`${value} is less than ${current.value}. Moving to the left child.`, current.id, visited);
                current = current.left;
            } else {
                addStep(`${value} is less than ${current.value}, but no left child. Value not found.`, current.id, visited, true);
                return steps;
            }
        } else {
            if (current.right) {
                addStep(`${value} is greater than ${current.value}. Moving to the right child.`, current.id, visited);
                current = current.right;
            } else {
                addStep(`${value} is greater than ${current.value}, but no right child. Value not found.`, current.id, visited, true);
                return steps;
            }
        }
    }
    
    addStep(`Value ${value} not found in the tree.`, undefined, visited, true);
    return steps;
}
