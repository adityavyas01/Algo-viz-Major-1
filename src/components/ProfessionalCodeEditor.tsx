import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Download, 
  Upload, 
  Settings, 
  Search,
  Code2,
  Copy,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface CodeEditorProps {
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
  { id: 'javascript', name: 'JavaScript', extension: 'js', icon: '🟨' },
  { id: 'python', name: 'Python', extension: 'py', icon: '🐍' },
  { id: 'java', name: 'Java', extension: 'java', icon: '☕' },
  { id: 'cpp', name: 'C++', extension: 'cpp', icon: '⚡' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts', icon: '🔷' },
  { id: 'go', name: 'Go', extension: 'go', icon: '🐹' }
];

const THEMES = {
  dark: {
    bg: 'bg-[#1e1e1e]',
    text: 'text-[#d4d4d4]',
    selection: 'selection:bg-[#264f78]',
    border: 'border-[#3e3e42]',
    gutter: 'bg-[#1e1e1e]',
    gutterText: 'text-[#858585]',
    keyword: 'text-[#569cd6]',
    string: 'text-[#ce9178]',
    comment: 'text-[#6a9955]',
    number: 'text-[#b5cea8]'
  },
  light: {
    bg: 'bg-white',
    text: 'text-[#000000]',
    selection: 'selection:bg-[#add6ff]',
    border: 'border-[#e5e5e5]',
    gutter: 'bg-[#f5f5f5]',
    gutterText: 'text-[#6e7681]',
    keyword: 'text-[#0000ff]',
    string: 'text-[#a31515]',
    comment: 'text-[#008000]',
    number: 'text-[#098658]'
  }
};

export const ProfessionalCodeEditor: React.FC<CodeEditorProps> = ({
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [fontSize, setFontSize] = useState(14);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [find, setFind] = useState('');
  const [showFind, setShowFind] = useState(false);
  const [editorTheme, setEditorTheme] = useState(theme);
  
  const currentTheme = THEMES[editorTheme];
  const selectedLang = SUPPORTED_LANGUAGES.find(lang => lang.id === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+F for find
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setShowFind(true);
      }
      // F11 for fullscreen
      if (e.key === 'F11') {
        e.preventDefault();
        setIsFullscreen(!isFullscreen);
      }
      // Escape to close overlays
      if (e.key === 'Escape') {
        setShowFind(false);
        setShowSettings(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    const { selectionStart, selectionEnd } = textarea;

    // Tab for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const beforeTab = value.substring(0, selectionStart);
      const afterTab = value.substring(selectionEnd);
      const newValue = beforeTab + '  ' + afterTab;
      onChange(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
      }, 0);
    }

    // Auto-indentation on Enter
    if (e.key === 'Enter') {
      const lines = value.substring(0, selectionStart).split('\n');
      const currentLine = lines[lines.length - 1];
      const indent = currentLine.match(/^(\s*)/)?.[1] || '';
      
      // Add extra indent for opening brackets
      const extraIndent = /[{(\[]$/.test(currentLine.trim()) ? '  ' : '';
      
      e.preventDefault();
      const newValue = value.substring(0, selectionStart) + 
                      '\n' + indent + extraIndent + 
                      value.substring(selectionEnd);
      onChange(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1 + indent.length + extraIndent.length;
      }, 0);
    }

    // Auto-close brackets
    const brackets: Record<string, string> = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
    if (brackets[e.key]) {
      e.preventDefault();
      const beforeCursor = value.substring(0, selectionStart);
      const afterCursor = value.substring(selectionEnd);
      const closing = brackets[e.key];
      const newValue = beforeCursor + e.key + closing + afterCursor;
      onChange(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
      }, 0);
    }

    // Run code with Ctrl+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun();
    }

    // Save with Ctrl+S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      // Could implement save functionality here
    }
  };

  const getLineNumbers = () => {
    const lines = value.split('\n');
    return lines.map((_, index) => index + 1);
  };

  const formatCode = () => {
    let formatted = value;
    
    if (['javascript', 'typescript', 'java', 'cpp'].includes(language)) {
      // Basic formatting for C-style languages
      formatted = formatted
        .replace(/;\s*\n/g, ';\n')
        .replace(/{\s*\n/g, '{\n')
        .replace(/}\s*\n/g, '}\n')
        .replace(/,\s*\n/g, ',\n');
    }
    
    onChange(formatted);
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

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-full'} flex flex-col ${currentTheme.bg} rounded-lg border ${currentTheme.border} overflow-hidden`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 ${currentTheme.bg} border-b ${currentTheme.border}`}>
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              disabled={readOnly}
              className={`${currentTheme.bg} ${currentTheme.text} px-3 py-2 rounded-lg border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px] appearance-none cursor-pointer`}
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
            <span className={`text-sm ${currentTheme.text} opacity-70`}>Font:</span>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className={`${currentTheme.bg} ${currentTheme.text} px-2 py-1 rounded border ${currentTheme.border} text-sm`}
            >
              {[10, 12, 14, 16, 18, 20, 24].map(size => (
                <option key={size} value={size}>{size}px</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Find */}
          <button
            onClick={() => setShowFind(!showFind)}
            className={`p-2 ${currentTheme.text} hover:bg-gray-600/20 rounded transition-colors`}
            title="Find (Ctrl+F)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setEditorTheme(editorTheme === 'dark' ? 'light' : 'dark')}
            className={`p-2 ${currentTheme.text} hover:bg-gray-600/20 rounded transition-colors`}
            title="Toggle Theme"
          >
            {editorTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 ${currentTheme.text} hover:bg-gray-600/20 rounded transition-colors`}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Copy */}
          <button
            onClick={copyToClipboard}
            className={`p-2 ${currentTheme.text} hover:bg-gray-600/20 rounded transition-colors`}
            title="Copy Code"
          >
            <Copy className="w-4 h-4" />
          </button>

          {/* Download */}
          <button
            onClick={downloadCode}
            className={`p-2 ${currentTheme.text} hover:bg-gray-600/20 rounded transition-colors`}
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Upload */}
          {!readOnly && (
            <button
              onClick={uploadCode}
              className={`p-2 ${currentTheme.text} hover:bg-gray-600/20 rounded transition-colors`}
              title="Upload"
            >
              <Upload className="w-4 h-4" />
            </button>
          )}

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-2 ${currentTheme.text} hover:bg-gray-600/20 rounded transition-colors`}
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

      {/* Find Bar */}
      {showFind && (
        <div className={`flex items-center justify-between px-4 py-2 ${currentTheme.bg} border-b ${currentTheme.border}`}>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Find..."
              value={find}
              onChange={(e) => setFind(e.target.value)}
              className={`${currentTheme.bg} ${currentTheme.text} px-3 py-1 rounded border ${currentTheme.border} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              autoFocus
            />
            <span className={`text-sm ${currentTheme.text} opacity-70`}>
              {find && value.toLowerCase().includes(find.toLowerCase()) ? 
                `${value.toLowerCase().split(find.toLowerCase()).length - 1} matches` : 
                '0 matches'
              }
            </span>
          </div>
          <button
            onClick={() => setShowFind(false)}
            className={`p-1 ${currentTheme.text} hover:bg-gray-600/20 rounded`}
          >
            ×
          </button>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className={`px-4 py-3 ${currentTheme.bg} border-b ${currentTheme.border}`}>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="lineNumbers"
                checked={lineNumbers}
                onChange={(e) => setLineNumbers(e.target.checked)}
                className="text-blue-600"
              />
              <label htmlFor="lineNumbers" className={`text-sm ${currentTheme.text}`}>Line Numbers</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="wordWrap"
                checked={wordWrap}
                onChange={(e) => setWordWrap(e.target.checked)}
                className="text-blue-600"
              />
              <label htmlFor="wordWrap" className={`text-sm ${currentTheme.text}`}>Word Wrap</label>
            </div>
          </div>
        </div>
      )}

      {/* Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        {lineNumbers && (
          <div className={`${currentTheme.gutter} ${currentTheme.gutterText} text-right py-4 px-3 border-r ${currentTheme.border} font-mono select-none min-w-[60px]`}>
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
            readOnly={readOnly}
            className={`w-full h-full p-4 ${currentTheme.bg} ${currentTheme.text} ${currentTheme.selection} font-mono resize-none outline-none leading-6 ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}
            style={{ 
              fontSize: `${fontSize}px`,
              minHeight: '400px',
              tabSize: 2
            }}
            placeholder={readOnly ? '' : `Write your ${selectedLang.name} code here...`}
            spellCheck={false}
          />

          {/* Status Indicators */}
          {!readOnly && (
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              {value.length > 0 && (
                <div className={`px-2 py-1 ${currentTheme.bg} border ${currentTheme.border} rounded text-xs ${currentTheme.text} opacity-70`}>
                  {value.split('\n').length} lines, {value.length} chars
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={`px-4 py-2 ${currentTheme.bg} border-t ${currentTheme.border} text-xs ${currentTheme.text} opacity-70 flex items-center justify-between`}>
        <div className="flex items-center space-x-4">
          <span>Ctrl+Enter to run</span>
          <span>Ctrl+F to find</span>
          <span>Tab for indent</span>
          <span>F11 fullscreen</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{selectedLang.name}</span>
          <span>UTF-8</span>
          <span>LF</span>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCodeEditor;