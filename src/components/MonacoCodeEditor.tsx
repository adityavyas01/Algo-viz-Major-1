import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  RotateCcw, 
  Download, 
  Upload, 
  Settings, 
  Copy,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Code2,
  FileText,
  Zap
} from 'lucide-react';

interface MonacoCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning: boolean;
  theme?: 'dark' | 'light';
  readOnly?: boolean;
}

const SUPPORTED_LANGUAGES = [
  { 
    id: 'javascript', 
    name: 'JavaScript', 
    monacoId: 'javascript',
    extension: 'js', 
    icon: '🟨',
    defaultCode: `function solution() {
    // Write your JavaScript solution here
    
}`
  },
  { 
    id: 'typescript', 
    name: 'TypeScript', 
    monacoId: 'typescript',
    extension: 'ts', 
    icon: '🔷',
    defaultCode: `function solution(): any {
    // Write your TypeScript solution here
    
}`
  },
  { 
    id: 'python', 
    name: 'Python', 
    monacoId: 'python',
    extension: 'py', 
    icon: '🐍',
    defaultCode: `def solution():
    # Write your Python solution here
    pass`
  },
  { 
    id: 'java', 
    name: 'Java', 
    monacoId: 'java',
    extension: 'java', 
    icon: '☕',
    defaultCode: `public class Solution {
    public void solution() {
        // Write your Java solution here
        
    }
}`
  },
  { 
    id: 'cpp', 
    name: 'C++', 
    monacoId: 'cpp',
    extension: 'cpp', 
    icon: '⚡',
    defaultCode: `#include <iostream>
using namespace std;

class Solution {
public:
    void solution() {
        // Write your C++ solution here
        
    }
};`
  },
  { 
    id: 'go', 
    name: 'Go', 
    monacoId: 'go',
    extension: 'go', 
    icon: '🐹',
    defaultCode: `package main

import "fmt"

func solution() {
    // Write your Go solution here
    
}`
  }
];

export const MonacoCodeEditor: React.FC<MonacoCodeEditorProps> = ({
  value,
  onChange,
  language,
  onLanguageChange,
  onRun,
  onSubmit,
  isRunning,
  theme = 'dark',
  readOnly = false
}) => {
  const editorRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editorTheme, setEditorTheme] = useState(theme === 'dark' ? 'vs-dark' : 'vs-light');
  const [fontSize, setFontSize] = useState(14);
  const [showSettings, setShowSettings] = useState(false);
  
  const selectedLang = SUPPORTED_LANGUAGES.find(lang => lang.id === language) || SUPPORTED_LANGUAGES[0];

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure editor options
    editor.updateOptions({
      fontSize: fontSize,
      fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
      lineHeight: 1.6,
      letterSpacing: 0.5,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: 'on',
      lineNumbers: 'on',
      renderLineHighlight: 'all',
      selectionHighlight: true,
      bracketPairColorization: {
        enabled: true
      },
      guides: {
        indentation: true,
        bracketPairs: true
      },
      suggest: {
        showKeywords: true,
        showSnippets: true,
        showFunctions: true,
        showMethods: true,
        showClasses: true,
        showVariables: true
      }
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Save functionality
      downloadCode();
    });

    // Add custom themes
    monaco.editor.defineTheme('leetcode-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' }
      ],
      colors: {
        'editor.background': '#1E1E1E',
        'editor.foreground': '#D4D4D4',
        'editor.lineHighlightBackground': '#2D2D30',
        'editor.selectionBackground': '#264F78',
        'editor.inactiveSelectionBackground': '#3A3D41'
      }
    });

    monaco.editor.defineTheme('leetcode-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '008000', fontStyle: 'italic' },
        { token: 'keyword', foreground: '0000FF' },
        { token: 'string', foreground: 'A31515' },
        { token: 'number', foreground: '098658' }
      ],
      colors: {
        'editor.background': '#FFFFFF',
        'editor.foreground': '#000000',
        'editor.lineHighlightBackground': '#F5F5F5',
        'editor.selectionBackground': '#ADD6FF'
      }
    });
  };

  const handleLanguageChange = (newLanguage: string) => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.id === newLanguage);
    if (lang && editorRef.current) {
      // Change the language model
      const model = editorRef.current.getModel();
      if (model) {
        const monaco = (window as any).monaco;
        monaco.editor.setModelLanguage(model, lang.monacoId);
      }
    }
    onLanguageChange(newLanguage);
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };

  const downloadCode = () => {
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution.${selectedLang.extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const uploadCode = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = `.${selectedLang.extension},.txt`;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          onChange(content);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const toggleTheme = () => {
    const newTheme = editorTheme === 'vs-dark' ? 'leetcode-light' : 'leetcode-dark';
    setEditorTheme(newTheme);
  };

  const changeFontSize = (newSize: number) => {
    setFontSize(newSize);
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontSize: newSize });
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col bg-gray-900 rounded-lg border border-gray-700 overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              disabled={readOnly}
              className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px] appearance-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.icon} {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Font:</span>
            <select
              value={fontSize}
              onChange={(e) => changeFontSize(Number(e.target.value))}
              className="bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 text-sm"
            >
              {[10, 12, 14, 16, 18, 20, 24].map(size => (
                <option key={size} value={size}>{size}px</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Format Code */}
          <button
            onClick={formatCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Format Code (Shift+Alt+F)"
          >
            <Code2 className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Toggle Theme"
          >
            {editorTheme.includes('dark') ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Copy */}
          <button
            onClick={copyToClipboard}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Copy Code"
          >
            <Copy className="w-4 h-4" />
          </button>

          {/* Download */}
          <button
            onClick={downloadCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Upload */}
          {!readOnly && (
            <button
              onClick={uploadCode}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
              title="Upload"
            >
              <Upload className="w-4 h-4" />
            </button>
          )}

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Fullscreen (F11)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <div className="w-px h-6 bg-gray-600" />

          {/* Run Button */}
          <button
            onClick={onRun}
            disabled={isRunning || readOnly}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
            title="Run Code (Ctrl+Enter)"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>

          {/* Submit Button */}
          <button
            onClick={onSubmit}
            disabled={isRunning || readOnly}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Editor Features:</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>✓ IntelliSense</span>
              <span>✓ Auto-completion</span>
              <span>✓ Bracket matching</span>
              <span>✓ Code folding</span>
              <span>✓ Multi-cursor</span>
            </div>
          </div>
        </div>
      )}

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={selectedLang.monacoId}
          value={value}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          theme={editorTheme}
          options={{
            readOnly: readOnly,
            fontSize: fontSize,
            fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
            lineHeight: 1.6,
            letterSpacing: 0.5,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            selectionHighlight: true,
            bracketPairColorization: {
              enabled: true
            },
            guides: {
              indentation: true,
              bracketPairs: true
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true,
              showMethods: true,
              showClasses: true,
              showVariables: true
            }
          }}
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-400 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span>Ctrl+Enter to run</span>
          <span>Shift+Alt+F to format</span>
          <span>F11 fullscreen</span>
          <span>Ctrl+S to save</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{selectedLang.name}</span>
          <span>•</span>
          <span>Monaco Editor</span>
          <span>•</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
};

export default MonacoCodeEditor;