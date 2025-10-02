import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Download, Upload, Settings, Lightbulb, Bug } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning: boolean;
  theme?: 'dark' | 'light';
}

const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'java', name: 'Java', extension: 'java' },
  { id: 'cpp', name: 'C++', extension: 'cpp' }
];

const LANGUAGE_SYNTAX = {
  javascript: {
    keywords: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export'],
    operators: ['=', '==', '===', '!==', '!=', '<', '>', '<=', '>=', '+', '-', '*', '/', '%'],
    brackets: ['(', ')', '[', ']', '{', '}'],
    strings: ['"', "'", '`']
  },
  python: {
    keywords: ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return', 'import', 'from', 'as', 'pass', 'break', 'continue'],
    operators: ['=', '==', '!=', '<', '>', '<=', '>=', '+', '-', '*', '/', '%', '//', '**'],
    brackets: ['(', ')', '[', ']', '{', '}'],
    strings: ['"', "'", '"""', "'''"]
  }
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  onLanguageChange,
  onRun,
  onSubmit,
  isRunning,
  theme = 'dark'
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [fontSize, setFontSize] = useState(14);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [autoIndent, setAutoIndent] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight();
    }
  }, [value]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.max(400, textarea.scrollHeight) + 'px';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const { selectionStart, selectionEnd } = textarea;

    // Handle Tab for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const beforeTab = value.substring(0, selectionStart);
      const afterTab = value.substring(selectionEnd);
      const newValue = beforeTab + '  ' + afterTab; // 2 spaces for tab
      onChange(newValue);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
      }, 0);
    }

    // Handle Enter for auto-indentation
    if (e.key === 'Enter' && autoIndent) {
      const lines = value.substring(0, selectionStart).split('\n');
      const currentLine = lines[lines.length - 1];
      const indent = currentLine.match(/^(\s*)/)?.[1] || '';
      
      // Add extra indent for opening brackets
      const extraIndent = currentLine.trim().endsWith('{') || 
                         currentLine.trim().endsWith(':') ? '  ' : '';
      
      e.preventDefault();
      const newValue = value.substring(0, selectionStart) + 
                      '\n' + indent + extraIndent + 
                      value.substring(selectionEnd);
      onChange(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1 + indent.length + extraIndent.length;
      }, 0);
    }

    // Handle Ctrl+/ for commenting
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      const lines = value.split('\n');
      const startLine = value.substring(0, selectionStart).split('\n').length - 1;
      const endLine = value.substring(0, selectionEnd).split('\n').length - 1;
      
      const commentChar = language === 'python' ? '# ' : '// ';
      
      for (let i = startLine; i <= endLine; i++) {
        if (lines[i].trim().startsWith(commentChar.trim())) {
          lines[i] = lines[i].replace(commentChar, '');
        } else {
          lines[i] = commentChar + lines[i];
        }
      }
      
      onChange(lines.join('\n'));
    }

    // Run code with Ctrl+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }
  };

  const formatCode = () => {
    // Basic code formatting
    let formatted = value;
    
    if (language === 'javascript' || language === 'java' || language === 'cpp') {
      // Add basic formatting for bracket languages
      formatted = formatted
        .replace(/{\s*\n/g, '{\n')
        .replace(/}\s*\n/g, '}\n')
        .replace(/;\s*\n/g, ';\n');
    }
    
    onChange(formatted);
  };

  const resetCode = () => {
    if (window.confirm('Are you sure you want to reset the code? This will clear all your work.')) {
      onChange('');
    }
  };

  const downloadCode = () => {
    const langExt = SUPPORTED_LANGUAGES.find(l => l.id === language)?.extension || 'txt';
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution.${langExt}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const uploadCode = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.js,.py,.java,.cpp,.txt';
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

  const getLineNumbers = () => {
    const lines = value.split('\n');
    return lines.map((_, index) => index + 1);
  };

  return (
    <div className={`h-full flex flex-col bg-gray-900 rounded-lg border border-gray-700 overflow-hidden`}>
      {/* Editor Header */}
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
          
          <div className="text-sm text-gray-400">
            Font: {fontSize}px
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Editor Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          
          <button
            onClick={formatCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Format Code"
          >
            <Bug className="w-4 h-4" />
          </button>
          
          <button
            onClick={downloadCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Download Code"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <button
            onClick={uploadCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Upload Code"
          >
            <Upload className="w-4 h-4" />
          </button>
          
          <button
            onClick={resetCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Reset Code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <div className="w-px h-6 bg-gray-600" />
          
          <button
            onClick={onRun}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded transition-colors"
            title="Run Code (Ctrl+Enter)"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
          
          <button
            onClick={onSubmit}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-400">Font Size:</label>
              <input
                type="range"
                min="10"
                max="20"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-gray-400">{fontSize}px</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="lineNumbers"
                checked={lineNumbers}
                onChange={(e) => setLineNumbers(e.target.checked)}
                className="text-blue-600"
              />
              <label htmlFor="lineNumbers" className="text-sm text-gray-400">Line Numbers</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoIndent"
                checked={autoIndent}
                onChange={(e) => setAutoIndent(e.target.checked)}
                className="text-blue-600"
              />
              <label htmlFor="autoIndent" className="text-sm text-gray-400">Auto Indent</label>
            </div>
          </div>
        </div>
      )}

      {/* Code Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        {lineNumbers && (
          <div className="bg-gray-900 text-gray-500 text-right py-4 px-3 border-r border-gray-700 font-mono select-none">
            {getLineNumbers().map(num => (
              <div key={num} className="leading-6" style={{ fontSize: `${fontSize}px` }}>
                {num}
              </div>
            ))}
          </div>
        )}

        {/* Code Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full p-4 bg-transparent text-white font-mono resize-none outline-none leading-6"
            style={{ 
              fontSize: `${fontSize}px`,
              minHeight: '400px'
            }}
            placeholder={`Write your ${SUPPORTED_LANGUAGES.find(l => l.id === language)?.name} code here...`}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-400 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span>Press Ctrl+Enter to run</span>
          <span>Press Ctrl+/ to comment</span>
          <span>Press Tab for indentation</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Lines: {value.split('\n').length}</span>
          <span>Characters: {value.length}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;