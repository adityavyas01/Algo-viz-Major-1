/**
 * Enhanced Theme System with Animation Support
 * Comprehensive theme configuration for modern UI
 */

import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'auto'
export type AnimationSpeed = 'slow' | 'normal' | 'fast' | 'instant'

export interface VisualizationTheme {
  // Color palettes
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    success: string
    warning: string
    error: string
    info: string
    // Algorithm-specific colors
    sorting: {
      comparing: string
      swapping: string
      sorted: string
      pivot: string
      active: string
      inactive: string
    }
    graph: {
      node: string
      nodeVisited: string
      nodeActive: string
      edge: string
      edgeActive: string
      path: string
    }
    tree: {
      node: string
      nodeActive: string
      nodeVisited: string
      edge: string
      leaf: string
    }
  }
  // Animation settings
  animations: {
    duration: {
      fast: number
      normal: number
      slow: number
      instant: number
    }
    easing: {
      default: string
      bounce: string
      elastic: string
      smooth: string
    }
  }
  // Typography
  typography: {
    fontFamily: {
      sans: string
      mono: string
      display: string
    }
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
    }
    fontWeight: {
      normal: number
      medium: number
      semibold: number
      bold: number
    }
  }
  // Spacing and layout
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
  }
  // Component-specific styling
  components: {
    card: {
      borderRadius: string
      shadow: string
      padding: string
    }
    button: {
      borderRadius: string
      padding: string
      fontWeight: number
    }
    input: {
      borderRadius: string
      padding: string
      borderWidth: string
    }
  }
}

const lightTheme: VisualizationTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6366f1',
    accent: '#8b5cf6',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
    sorting: {
      comparing: '#fbbf24',
      swapping: '#f87171',
      sorted: '#34d399',
      pivot: '#a78bfa',
      active: '#60a5fa',
      inactive: '#cbd5e1'
    },
    graph: {
      node: '#3b82f6',
      nodeVisited: '#34d399',
      nodeActive: '#f59e0b',
      edge: '#94a3b8',
      edgeActive: '#3b82f6',
      path: '#10b981'
    },
    tree: {
      node: '#3b82f6',
      nodeActive: '#f59e0b',
      nodeVisited: '#34d399',
      edge: '#94a3b8',
      leaf: '#8b5cf6'
    }
  },
  animations: {
    duration: {
      instant: 0,
      fast: 150,
      normal: 300,
      slow: 600
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  },
  typography: {
    fontFamily: {
      sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", Consolas, monospace',
      display: '"Cal Sans", "Inter", sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  components: {
    card: {
      borderRadius: '0.75rem',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      padding: '1.5rem'
    },
    button: {
      borderRadius: '0.5rem',
      padding: '0.5rem 1rem',
      fontWeight: 500
    },
    input: {
      borderRadius: '0.5rem',
      padding: '0.5rem 0.75rem',
      borderWidth: '1px'
    }
  }
}

const darkTheme: VisualizationTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#60a5fa',
    secondary: '#818cf8',
    accent: '#a78bfa',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#22d3ee',
    sorting: {
      comparing: '#fbbf24',
      swapping: '#f87171',
      sorted: '#34d399',
      pivot: '#c084fc',
      active: '#60a5fa',
      inactive: '#475569'
    },
    graph: {
      node: '#60a5fa',
      nodeVisited: '#34d399',
      nodeActive: '#fbbf24',
      edge: '#64748b',
      edgeActive: '#60a5fa',
      path: '#34d399'
    },
    tree: {
      node: '#60a5fa',
      nodeActive: '#fbbf24',
      nodeVisited: '#34d399',
      edge: '#64748b',
      leaf: '#c084fc'
    }
  }
}

interface ThemeContextType {
  theme: Theme
  currentTheme: VisualizationTheme
  animationSpeed: AnimationSpeed
  setTheme: (theme: Theme) => void
  setAnimationSpeed: (speed: AnimationSpeed) => void
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function EnhancedThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('algo-viz-theme') as Theme
      return stored || 'auto'
    }
    return 'auto'
  })

  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('algo-viz-animation-speed') as AnimationSpeed
      return stored || 'normal'
    }
    return 'normal'
  })

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light')

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply theme to document
  useEffect(() => {
    const effectiveTheme = theme === 'auto' ? systemTheme : theme
    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark')
    localStorage.setItem('algo-viz-theme', theme)
  }, [theme, systemTheme])

  // Save animation speed preference
  useEffect(() => {
    localStorage.setItem('algo-viz-animation-speed', animationSpeed)
  }, [animationSpeed])

  const isDark = theme === 'auto' ? systemTheme === 'dark' : theme === 'dark'
  const currentTheme = isDark ? darkTheme : lightTheme

  const toggleTheme = () => {
    setTheme(current => {
      if (current === 'light') return 'dark'
      if (current === 'dark') return 'auto'
      return 'light'
    })
  }

  const value: ThemeContextType = {
    theme,
    currentTheme,
    animationSpeed,
    setTheme,
    setAnimationSpeed,
    toggleTheme,
    isDark
  }

  return (
    <ThemeContext.Provider value={value}>
      <div 
        className="min-h-screen transition-colors duration-300"
        style={{
          backgroundColor: currentTheme.colors.background,
          color: currentTheme.colors.text,
          fontFamily: currentTheme.typography.fontFamily.sans
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useVisualizationTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useVisualizationTheme must be used within an EnhancedThemeProvider')
  }
  return context
}

// Utility functions for theme-aware styling
export function getAnimationDuration(speed: AnimationSpeed, theme: VisualizationTheme): number {
  return theme.animations.duration[speed]
}

export function getThemeColor(colorPath: string, theme: VisualizationTheme): string {
  const keys = colorPath.split('.')
  let value: any = theme.colors
  
  for (const key of keys) {
    value = value?.[key]
  }
  
  return value || theme.colors.primary
}
