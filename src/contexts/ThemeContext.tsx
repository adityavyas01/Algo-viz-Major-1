
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

const themes: Theme[] = [
  {
    id: 'default',
    name: 'Ocean Blue',
    colors: {
      primary: 'from-cyan-400 to-blue-500',
      secondary: 'from-cyan-500 to-blue-600',
      accent: 'cyan-400',
      background: 'from-slate-900 via-blue-900 to-slate-800',
      surface: 'white/10',
      text: 'white',
      textSecondary: 'white/80',
      border: 'white/20'
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colors: {
      primary: 'from-emerald-400 to-green-500',
      secondary: 'from-emerald-500 to-green-600',
      accent: 'emerald-400',
      background: 'from-slate-900 via-emerald-900 to-slate-800',
      surface: 'white/10',
      text: 'white',
      textSecondary: 'white/80',
      border: 'white/20'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    colors: {
      primary: 'from-orange-400 to-red-500',
      secondary: 'from-orange-500 to-red-600',
      accent: 'orange-400',
      background: 'from-slate-900 via-orange-900 to-slate-800',
      surface: 'white/10',
      text: 'white',
      textSecondary: 'white/80',
      border: 'white/20'
    }
  },
  {
    id: 'purple',
    name: 'Purple Galaxy',
    colors: {
      primary: 'from-purple-400 to-violet-500',
      secondary: 'from-purple-500 to-violet-600',
      accent: 'purple-400',
      background: 'from-slate-900 via-purple-900 to-slate-800',
      surface: 'white/10',
      text: 'white',
      textSecondary: 'white/80',
      border: 'white/20'
    }
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      primary: 'from-gray-400 to-gray-500',
      secondary: 'from-gray-500 to-gray-600',
      accent: 'gray-400',
      background: 'from-gray-900 via-gray-800 to-black',
      surface: 'white/5',
      text: 'white',
      textSecondary: 'white/70',
      border: 'white/10'
    }
  },
  {
    id: 'light',
    name: 'Light Mode',
    colors: {
      primary: 'from-blue-500 to-indigo-600',
      secondary: 'from-blue-600 to-indigo-700',
      accent: 'blue-500',
      background: 'from-gray-50 via-blue-50 to-indigo-50',
      surface: 'white/80',
      text: 'gray-900',
      textSecondary: 'gray-700',
      border: 'gray-200'
    }
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
  fontSize: string;
  setFontSize: (size: string) => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [fontSize, setFontSize] = useState('text-base');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedFontSize = localStorage.getItem('fontSize');
    const savedReducedMotion = localStorage.getItem('reducedMotion');
    const savedHighContrast = localStorage.getItem('highContrast');
    
    if (savedTheme) {
      const theme = themes.find(t => t.id === savedTheme);
      if (theme) setCurrentTheme(theme);
    }
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedReducedMotion) setReducedMotion(savedReducedMotion === 'true');
    if (savedHighContrast) setHighContrast(savedHighContrast === 'true');
  }, []);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('theme', themeId);
    }
  };

  const handleSetFontSize = (size: string) => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
  };

  const handleSetReducedMotion = (reduced: boolean) => {
    setReducedMotion(reduced);
    localStorage.setItem('reducedMotion', reduced.toString());
    document.documentElement.style.setProperty('--animation-duration', reduced ? '0s' : '0.3s');
  };

  const handleSetHighContrast = (contrast: boolean) => {
    setHighContrast(contrast);
    localStorage.setItem('highContrast', contrast.toString());
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setTheme,
      themes,
      fontSize,
      setFontSize: handleSetFontSize,
      reducedMotion,
      setReducedMotion: handleSetReducedMotion,
      highContrast,
      setHighContrast: handleSetHighContrast
    }}>
      <div className={`${fontSize} ${reducedMotion ? 'motion-reduce' : ''} ${highContrast ? 'contrast-more' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
