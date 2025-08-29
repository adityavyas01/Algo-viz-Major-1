/**
 * Modern Theme Toggle Component
 * Beautiful theme switcher with smooth animations
 */

import React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useVisualizationTheme } from '@/contexts/EnhancedTheme'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ModernThemeToggle() {
  const { theme, setTheme, isDark, currentTheme } = useVisualizationTheme()

  const ThemeIcon = () => {
    if (theme === 'light') return <Sun className="h-4 w-4" />
    if (theme === 'dark') return <Moon className="h-4 w-4" />
    return <Monitor className="h-4 w-4" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative overflow-hidden transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: currentTheme.colors.surface,
            borderColor: currentTheme.colors.border,
            color: currentTheme.colors.text
          }}
        >
          <div className="flex items-center gap-2">
            <ThemeIcon />
            <span className="hidden sm:inline capitalize">{theme}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="w-36"
        style={{
          backgroundColor: currentTheme.colors.surface,
          borderColor: currentTheme.colors.border,
          color: currentTheme.colors.text
        }}
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="flex items-center gap-2 cursor-pointer hover:bg-opacity-80"
          style={{
            backgroundColor: theme === 'light' ? currentTheme.colors.primary : 'transparent',
            color: theme === 'light' ? 'white' : currentTheme.colors.text
          }}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="flex items-center gap-2 cursor-pointer hover:bg-opacity-80"
          style={{
            backgroundColor: theme === 'dark' ? currentTheme.colors.primary : 'transparent',
            color: theme === 'dark' ? 'white' : currentTheme.colors.text
          }}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('auto')}
          className="flex items-center gap-2 cursor-pointer hover:bg-opacity-80"
          style={{
            backgroundColor: theme === 'auto' ? currentTheme.colors.primary : 'transparent',
            color: theme === 'auto' ? 'white' : currentTheme.colors.text
          }}
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Speed Control Component
export function AnimationSpeedControl() {
  const { animationSpeed, setAnimationSpeed, currentTheme } = useVisualizationTheme()

  const speedOptions = [
    { value: 'slow', label: 'Slow', description: '0.6s' },
    { value: 'normal', label: 'Normal', description: '0.3s' },
    { value: 'fast', label: 'Fast', description: '0.15s' },
    { value: 'instant', label: 'Instant', description: '0s' }
  ] as const

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: currentTheme.colors.surface,
            borderColor: currentTheme.colors.border,
            color: currentTheme.colors.text
          }}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">Speed:</span>
            <span className="capitalize">{animationSpeed}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="w-40"
        style={{
          backgroundColor: currentTheme.colors.surface,
          borderColor: currentTheme.colors.border,
          color: currentTheme.colors.text
        }}
      >
        {speedOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setAnimationSpeed(option.value)}
            className="flex items-center justify-between cursor-pointer hover:bg-opacity-80"
            style={{
              backgroundColor: animationSpeed === option.value ? currentTheme.colors.primary : 'transparent',
              color: animationSpeed === option.value ? 'white' : currentTheme.colors.text
            }}
          >
            <span>{option.label}</span>
            <span className="text-xs opacity-70">{option.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
