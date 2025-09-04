// Temporary mock hook to replace EnhancedTheme functionality
export function useVisualizationTheme() {
  return {
    theme: 'light',
    currentTheme: {
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
        }
      },
      typography: {
        fontFamily: {
          sans: '"Inter", sans-serif',
          mono: '"JetBrains Mono", monospace',
          display: '"Cal Sans", "Inter", sans-serif'
        }
      }
    },
    animationSpeed: 'normal' as const,
    setTheme: () => {},
    setAnimationSpeed: () => {},
    toggleTheme: () => {},
    isDark: false
  };
}
