/**
 * Complex Data Structure Support
 * Provides ListNode, TreeNode, and Graph construction helpers for LeetCode problems
 */

import type { MethodSignature } from '@/types/execution';

/**
 * Improved linked list detection using signature analysis
 */
export function isLinkedListInput(
  paramName: string, 
  value: unknown,
  signature?: MethodSignature
): boolean {
  // First check type hints from signature
  if (signature) {
    const param = signature.params.find(p => p.name === paramName);
    if (param && /ListNode|LinkedList/i.test(param.type)) {
      return true;
    }
  }

  // Fallback to heuristic
  if (!Array.isArray(value)) return false;

  const lowerName = paramName.toLowerCase();
  const linkedListIndicators = ['head', 'l1', 'l2', 'list1', 'list2', 'node', 'linkedlist'];
  
  // Exact match or starts with indicator
  return linkedListIndicators.some(indicator => 
    lowerName === indicator || lowerName.startsWith(indicator + '_')
  );
}

/**
 * Improved tree detection using signature analysis
 */
export function isTreeInput(
  paramName: string,
  value: unknown,
  signature?: MethodSignature
): boolean {
  // Check type hints
  if (signature) {
    const param = signature.params.find(p => p.name === paramName);
    if (param && /TreeNode|BinaryTree/i.test(param.type)) {
      return true;
    }
  }

  // Heuristic: exact match on tree-related names
  const lowerName = paramName.toLowerCase();
  const treeIndicators = ['root', 'tree', 'treenode', 'binarytree'];
  
  if (treeIndicators.includes(lowerName)) {
    return Array.isArray(value);
  }

  // Check if array has tree-like null pattern
  if (Array.isArray(value) && value.length > 0) {
    const nullCount = value.filter(v => v === null).length;
    // Tree typically has nulls, but not all elements
    return nullCount > 0 && nullCount < value.length * 0.7;
  }

  return false;
}

/**
 * Improved graph detection
 */
export function isGraphInput(
  paramName: string,
  value: unknown,
  signature?: MethodSignature
): boolean {
  // Check type hints
  if (signature) {
    const param = signature.params.find(p => p.name === paramName);
    if (param && /Graph|Edge\[\]|List<List<Integer>>/i.test(param.type)) {
      return true;
    }
  }

  const lowerName = paramName.toLowerCase();
  const graphIndicators = ['edges', 'graph', 'adjacency', 'connections', 'neighbors'];
  
  if (!graphIndicators.some(ind => lowerName.includes(ind))) {
    return false;
  }

  // Check if it's edge list format
  if (Array.isArray(value) && value.length > 0) {
    const firstElem = value[0];
    if (Array.isArray(firstElem)) {
      // Edge list: [[1,2], [2,3]] or weighted: [[1,2,5], [2,3,10]]
      return firstElem.length >= 2 && firstElem.length <= 3;
    }
  }

  return false;
}

/**
 * Generate ListNode class definition for a language
 */
export function getListNodeClass(language: string): string {
  switch (language) {
    case 'python':
      return `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def build_linked_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

def serialize_linked_list(head):
    result = []
    current = head
    while current:
        result.append(current.val)
        current = current.next
    return result
`;

    case 'javascript':
    case 'typescript':
      return `
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function buildLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function serializeLinkedList(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}
`;

    case 'java':
      return `
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
    
    static ListNode buildLinkedList(int[] arr) {
        if (arr == null || arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode current = head;
        for (int i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        return head;
    }
    
    static int[] serializeLinkedList(ListNode head) {
        java.util.List<Integer> result = new java.util.ArrayList<>();
        ListNode current = head;
        while (current != null) {
            result.add(current.val);
            current = current.next;
        }
        return result.stream().mapToInt(i -> i).toArray();
    }
}
`;

    case 'cpp':
      return `
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

ListNode* buildLinkedList(const vector<int>& arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* current = head;
    for (size_t i = 1; i < arr.size(); i++) {
        current->next = new ListNode(arr[i]);
        current = current->next;
    }
    return head;
}

vector<int> serializeLinkedList(ListNode* head) {
    vector<int> result;
    ListNode* current = head;
    while (current) {
        result.push_back(current->val);
        current = current->next;
    }
    return result;
}
`;

    default:
      return '';
  }
}

/**
 * Generate TreeNode class definition for a language
 */
export function getTreeNodeClass(language: string): string {
  switch (language) {
    case 'python':
      return `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree(arr):
    if not arr or arr[0] is None:
        return None
    
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    
    while queue and i < len(arr):
        node = queue.pop(0)
        
        # Left child
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        
        # Right child
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    
    return root

def serialize_tree(root):
    if not root:
        return []
    result = []
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    # Remove trailing nulls
    while result and result[-1] is None:
        result.pop()
    return result
`;

    case 'javascript':
    case 'typescript':
      return `
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();
        
        // Left child
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        
        // Right child
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

function serializeTree(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        if (node) {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            result.push(null);
        }
    }
    // Remove trailing nulls
    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop();
    }
    return result;
}
`;

    case 'java':
      return `
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
    
    static TreeNode buildTree(Integer[] arr) {
        if (arr == null || arr.length == 0 || arr[0] == null) return null;
        
        TreeNode root = new TreeNode(arr[0]);
        java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
        queue.offer(root);
        int i = 1;
        
        while (!queue.isEmpty() && i < arr.length) {
            TreeNode node = queue.poll();
            
            // Left child
            if (i < arr.length && arr[i] != null) {
                node.left = new TreeNode(arr[i]);
                queue.offer(node.left);
            }
            i++;
            
            // Right child
            if (i < arr.length && arr[i] != null) {
                node.right = new TreeNode(arr[i]);
                queue.offer(node.right);
            }
            i++;
        }
        
        return root;
    }
    
    static java.util.List<Integer> serializeTree(TreeNode root) {
        java.util.List<Integer> result = new java.util.ArrayList<>();
        if (root == null) return result;
        
        java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node != null) {
                result.add(node.val);
                queue.offer(node.left);
                queue.offer(node.right);
            } else {
                result.add(null);
            }
        }
        
        // Remove trailing nulls
        while (!result.isEmpty() && result.get(result.size() - 1) == null) {
            result.remove(result.size() - 1);
        }
        
        return result;
    }
}
`;

    case 'cpp':
      return `
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

TreeNode* buildTree(const vector<int>& arr) {
    if (arr.empty() || arr[0] == -1) return nullptr;  // Use -1 for null
    
    TreeNode* root = new TreeNode(arr[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    
    while (!q.empty() && i < arr.size()) {
        TreeNode* node = q.front();
        q.pop();
        
        // Left child
        if (i < arr.size() && arr[i] != -1) {
            node->left = new TreeNode(arr[i]);
            q.push(node->left);
        }
        i++;
        
        // Right child
        if (i < arr.size() && arr[i] != -1) {
            node->right = new TreeNode(arr[i]);
            q.push(node->right);
        }
        i++;
    }
    
    return root;
}

vector<int> serializeTree(TreeNode* root) {
    vector<int> result;
    if (!root) return result;
    
    queue<TreeNode*> q;
    q.push(root);
    
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        
        if (node) {
            result.push_back(node->val);
            q.push(node->left);
            q.push(node->right);
        } else {
            result.push_back(-1);  // Use -1 for null
        }
    }
    
    // Remove trailing -1s
    while (!result.empty() && result.back() == -1) {
        result.pop_back();
    }
    
    return result;
}
`;

    default:
      return '';
  }
}

/**
 * Generate graph construction helper
 */
export function getGraphHelper(language: string): string {
  switch (language) {
    case 'python':
      return `
def build_graph_adjacency_list(edges, n):
    """Build adjacency list from edge list"""
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
    return graph

def build_undirected_graph(edges, n):
    """Build undirected graph"""
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    return graph
`;

    case 'javascript':
    case 'typescript':
      return `
function buildGraphAdjacencyList(edges, n) {
    const graph = Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
    }
    return graph;
}

function buildUndirectedGraph(edges, n) {
    const graph = Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }
    return graph;
}
`;

    case 'java':
      return `
static List<List<Integer>> buildGraphAdjacencyList(int[][] edges, int n) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        graph.add(new ArrayList<>());
    }
    for (int[] edge : edges) {
        graph.get(edge[0]).add(edge[1]);
    }
    return graph;
}

static List<List<Integer>> buildUndirectedGraph(int[][] edges, int n) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        graph.add(new ArrayList<>());
    }
    for (int[] edge : edges) {
        graph.get(edge[0]).add(edge[1]);
        graph.get(edge[1]).add(edge[0]);
    }
    return graph;
}
`;

    case 'cpp':
      return `
vector<vector<int>> buildGraphAdjacencyList(const vector<vector<int>>& edges, int n) {
    vector<vector<int>> graph(n);
    for (const auto& edge : edges) {
        graph[edge[0]].push_back(edge[1]);
    }
    return graph;
}

vector<vector<int>> buildUndirectedGraph(const vector<vector<int>>& edges, int n) {
    vector<vector<int>> graph(n);
    for (const auto& edge : edges) {
        graph[edge[0]].push_back(edge[1]);
        graph[edge[1]].push_back(edge[0]);
    }
    return graph;
}
`;

    default:
      return '';
  }
}
