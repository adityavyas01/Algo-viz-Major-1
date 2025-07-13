
import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Copy, Download, Clock, TrendingUp } from 'lucide-react';

interface CodeEditorProps {
  algorithmName: string;
  onCodeRun?: (code: string, language: string) => void;
  complexity?: {
    time: string;
    space: string;
  };
}

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' }
];

const codeSnippets: Record<string, Record<string, string>> = {
  'bubble-sort': {
    javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort([...numbers]));`,
    python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(numbers.copy()))`,
    java: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(numbers);
        System.out.println(Arrays.toString(numbers));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(numbers);
    
    for (int num : numbers) {
        cout << num << " ";
    }
    return 0;
}`
  },
  'quick-sort': {
    javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(quickSort([...numbers]));`,
    python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
print(quick_sort(numbers.copy()))`,
    java: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        quickSort(numbers, 0, numbers.length - 1);
        System.out.println(Arrays.toString(numbers));
    }
}`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    quickSort(numbers, 0, numbers.size() - 1);
    
    for (int num : numbers) {
        cout << num << " ";
    }
    return 0;
}`
  },
  'avl-tree': {
    javascript: `class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  updateHeight(node) {
    if (node) {
      node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
  }

  rotateRight(y) {
    const x = y.left;
    y.left = x.right;
    x.right = y;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    y.left = x;
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }

  insert(node, value) {
    if (!node) return new AVLNode(value);

    if (value < node.value) {
      node.left = this.insert(node.left, value);
    } else if (value > node.value) {
      node.right = this.insert(node.right, value);
    } else {
      return node;
    }

    this.updateHeight(node);
    const balance = this.getBalance(node);

    // Left Left Case
    if (balance > 1 && value < node.left.value) {
      return this.rotateRight(node);
    }

    // Right Right Case
    if (balance < -1 && value > node.right.value) {
      return this.rotateLeft(node);
    }

    // Left Right Case
    if (balance > 1 && value > node.left.value) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    // Right Left Case
    if (balance < -1 && value < node.right.value) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }

  insertValue(value) {
    this.root = this.insert(this.root, value);
  }
}

// Example usage
const avl = new AVLTree();
[10, 20, 30, 40, 50, 25].forEach(val => avl.insertValue(val));
console.log("AVL Tree created with rotations");`,
    python: `class AVLNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def get_height(self, node):
        return node.height if node else 0
    
    def get_balance(self, node):
        return self.get_height(node.left) - self.get_height(node.right) if node else 0
    
    def update_height(self, node):
        if node:
            node.height = max(self.get_height(node.left), self.get_height(node.right)) + 1
    
    def rotate_right(self, y):
        x = y.left
        y.left = x.right
        x.right = y
        self.update_height(y)
        self.update_height(x)
        return x
    
    def rotate_left(self, x):
        y = x.right
        x.right = y.left
        y.left = x
        self.update_height(x)
        self.update_height(y)
        return y
    
    def insert(self, node, value):
        if not node:
            return AVLNode(value)
        
        if value < node.value:
            node.left = self.insert(node.left, value)
        elif value > node.value:
            node.right = self.insert(node.right, value)
        else:
            return node
        
        self.update_height(node)
        balance = self.get_balance(node)
        
        # Left Left Case
        if balance > 1 and value < node.left.value:
            return self.rotate_right(node)
        
        # Right Right Case
        if balance < -1 and value > node.right.value:
            return self.rotate_left(node)
        
        # Left Right Case
        if balance > 1 and value > node.left.value:
            node.left = self.rotate_left(node.left)
            return self.rotate_right(node)
        
        # Right Left Case
        if balance < -1 and value < node.right.value:
            node.right = self.rotate_right(node.right)
            return self.rotate_left(node)
        
        return node

# Example usage
avl = AVLTree()
root = None
for value in [10, 20, 30, 40, 50, 25]:
    root = avl.insert(root, value)
print("AVL Tree created with rotations")`,
    java: `class AVLNode {
    int value, height;
    AVLNode left, right;
    
    AVLNode(int value) {
        this.value = value;
        this.height = 1;
    }
}

public class AVLTree {
    AVLNode root;
    
    int getHeight(AVLNode node) {
        return node == null ? 0 : node.height;
    }
    
    int getBalance(AVLNode node) {
        return node == null ? 0 : getHeight(node.left) - getHeight(node.right);
    }
    
    void updateHeight(AVLNode node) {
        if (node != null) {
            node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
        }
    }
    
    AVLNode rotateRight(AVLNode y) {
        AVLNode x = y.left;
        y.left = x.right;
        x.right = y;
        updateHeight(y);
        updateHeight(x);
        return x;
    }
    
    AVLNode rotateLeft(AVLNode x) {
        AVLNode y = x.right;
        x.right = y.left;
        y.left = x;
        updateHeight(x);
        updateHeight(y);
        return y;
    }
    
    AVLNode insert(AVLNode node, int value) {
        if (node == null) return new AVLNode(value);
        
        if (value < node.value) {
            node.left = insert(node.left, value);
        } else if (value > node.value) {
            node.right = insert(node.right, value);
        } else {
            return node;
        }
        
        updateHeight(node);
        int balance = getBalance(node);
        
        // Left Left Case
        if (balance > 1 && value < node.left.value) {
            return rotateRight(node);
        }
        
        // Right Right Case
        if (balance < -1 && value > node.right.value) {
            return rotateLeft(node);
        }
        
        // Left Right Case
        if (balance > 1 && value > node.left.value) {
            node.left = rotateLeft(node.left);
            return rotateRight(node);
        }
        
        // Right Left Case
        if (balance < -1 && value < node.right.value) {
            node.right = rotateRight(node.right);
            return rotateLeft(node);
        }
        
        return node;
    }
    
    public static void main(String[] args) {
        AVLTree avl = new AVLTree();
        int[] values = {10, 20, 30, 40, 50, 25};
        for (int value : values) {
            avl.root = avl.insert(avl.root, value);
        }
        System.out.println("AVL Tree created with rotations");
    }
}`,
    cpp: `#include <iostream>
#include <algorithm>
using namespace std;

struct AVLNode {
    int value;
    AVLNode* left;
    AVLNode* right;
    int height;
    
    AVLNode(int val) : value(val), left(nullptr), right(nullptr), height(1) {}
};

class AVLTree {
public:
    AVLNode* root;
    
    AVLTree() : root(nullptr) {}
    
    int getHeight(AVLNode* node) {
        return node ? node->height : 0;
    }
    
    int getBalance(AVLNode* node) {
        return node ? getHeight(node->left) - getHeight(node->right) : 0;
    }
    
    void updateHeight(AVLNode* node) {
        if (node) {
            node->height = max(getHeight(node->left), getHeight(node->right)) + 1;
        }
    }
    
    AVLNode* rotateRight(AVLNode* y) {
        AVLNode* x = y->left;
        y->left = x->right;
        x->right = y;
        updateHeight(y);
        updateHeight(x);
        return x;
    }
    
    AVLNode* rotateLeft(AVLNode* x) {
        AVLNode* y = x->right;
        x->right = y->left;
        y->left = x;
        updateHeight(x);
        updateHeight(y);
        return y;
    }
    
    AVLNode* insert(AVLNode* node, int value) {
        if (!node) return new AVLNode(value);
        
        if (value < node->value) {
            node->left = insert(node->left, value);
        } else if (value > node->value) {
            node->right = insert(node->right, value);
        } else {
            return node;
        }
        
        updateHeight(node);
        int balance = getBalance(node);
        
        // Left Left Case
        if (balance > 1 && value < node->left->value) {
            return rotateRight(node);
        }
        
        // Right Right Case
        if (balance < -1 && value > node->right->value) {
            return rotateLeft(node);
        }
        
        // Left Right Case
        if (balance > 1 && value > node->left->value) {
            node->left = rotateLeft(node->left);
            return rotateRight(node);
        }
        
        // Right Left Case
        if (balance < -1 && value < node->right->value) {
            node->right = rotateRight(node->right);
            return rotateLeft(node);
        }
        
        return node;
    }
    
    void insertValue(int value) {
        root = insert(root, value);
    }
};

int main() {
    AVLTree avl;
    int values[] = {10, 20, 30, 40, 50, 25};
    for (int value : values) {
        avl.insertValue(value);
    }
    cout << "AVL Tree created with rotations" << endl;
    return 0;
}`
  }
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  algorithmName, 
  onCodeRun, 
  complexity 
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const editorRef = useRef(null);

  const algorithmKey = algorithmName.toLowerCase().replace(/\s+/g, '-');
  const snippets = codeSnippets[algorithmKey] || {};

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    if (snippets[language]) {
      setCode(snippets[language]);
    }
  };

  const handleRunCode = () => {
    if (selectedLanguage === 'javascript') {
      try {
        const startTime = performance.now();
        
        // Capture console.log output
        const originalLog = console.log;
        let capturedOutput = '';
        console.log = (...args: any[]) => {
          capturedOutput += args.join(' ') + '\n';
        };
        
        // Execute the code
        const func = new Function(code);
        func();
        
        const endTime = performance.now();
        setExecutionTime(endTime - startTime);
        setOutput(capturedOutput || 'Code executed successfully');
        
        // Restore console.log
        console.log = originalLog;
        
        if (onCodeRun) {
          onCodeRun(code, selectedLanguage);
        }
      } catch (error: any) {
        setOutput(`Error: ${error.message}`);
        setExecutionTime(null);
      }
    } else {
      setOutput(`Code execution for ${selectedLanguage} is not supported in the browser. This would typically run on a backend server.`);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownloadCode = () => {
    const extensions: Record<string, string> = { 
      javascript: 'js', 
      python: 'py', 
      java: 'java', 
      cpp: 'cpp' 
    };
    const extension = extensions[selectedLanguage] || 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${algorithmKey}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="editor">Code Editor</TabsTrigger>
          <TabsTrigger value="snippets">Code Library</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button onClick={handleRunCode} className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyCode}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadCode}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Editor
              height="400px"
              language={selectedLanguage}
              value={code || snippets[selectedLanguage] || '// Write your code here...'}
              onChange={(value: string | undefined) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
              }}
              onMount={(editor) => {
                editorRef.current = editor;
                if (snippets[selectedLanguage]) {
                  setCode(snippets[selectedLanguage]);
                }
              }}
            />
          </div>

          {output && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  Output
                  {executionTime && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {executionTime.toFixed(2)}ms
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm font-mono bg-muted p-3 rounded overflow-x-auto">
                  {output}
                </pre>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="snippets">
          <Card>
            <CardHeader>
              <CardTitle>Code Snippets for {algorithmName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(snippets).map(([lang, snippet]) => (
                <div key={lang} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium capitalize">{lang}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setCode(snippet);
                      }}
                    >
                      Load in Editor
                    </Button>
                  </div>
                  <pre className="text-sm bg-muted p-3 rounded overflow-x-auto max-h-48">
                    {snippet}
                  </pre>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complexity && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Algorithm Complexity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Time Complexity:</span>
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {complexity.time}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Space Complexity:</span>
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {complexity.space}
                    </code>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Execution Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Execution:</span>
                  <span className="text-sm font-mono">
                    {executionTime ? `${executionTime.toFixed(2)}ms` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Language:</span>
                  <span className="text-sm capitalize">{selectedLanguage}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
