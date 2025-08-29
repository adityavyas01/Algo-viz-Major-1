/**
 * Enhanced Visualization Demo Page
 * Showcasing all new modern UI features and visualizations
 */

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useVisualizationTheme } from '@/contexts/EnhancedTheme'
import { ModernThemeToggle } from '@/components/ModernThemeToggle'
import { EnhancedBubbleSortVisualization } from '@/components/EnhancedBubbleSortVisualization'
import { AlgorithmComparison } from '@/components/AlgorithmComparison'
import { InteractiveQuiz } from '@/components/InteractiveQuiz'
import { EnhancedNavigation } from '@/components/EnhancedNavigation'
import { ImplementationSummary } from '@/components/ImplementationSummary'
import { 
  Sparkles, 
  Zap, 
  Award, 
  TrendingUp, 
  Palette, 
  Play, 
  BookOpen,
  GitCompare,
  Brain,
  Navigation,
  ChevronRight,
  Star,
  Timer,
  Target,
  Settings,
  FileText
} from 'lucide-react'

interface DemoSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  component: React.ReactNode
  features: string[]
  isNew?: boolean
}

export default function EnhancedVisualizationDemo() {
  const { currentTheme, animationSpeed } = useVisualizationTheme()
  const [activeSection, setActiveSection] = useState('theme-system')
  const [showQuiz, setShowQuiz] = useState(false)

  const demoSections: DemoSection[] = [
    {
      id: 'theme-system',
      title: 'Enhanced Theme System',
      description: 'Modern theme management with light/dark modes and algorithm-specific color palettes',
      icon: <Palette className="w-5 h-5" />,
      component: (
        <div className="space-y-6">
          <div className="flex justify-center">
            <ModernThemeToggle />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card style={{ backgroundColor: currentTheme.colors.surface, borderColor: currentTheme.colors.border }}>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2" style={{ color: currentTheme.colors.text }}>Theme Features</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    'Light/Dark/Auto mode switching',
                    'Algorithm-specific color palettes',
                    'Animation speed controls',
                    'Smooth transitions',
                    'Accessibility support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.colors.primary }} />
                      <span style={{ color: currentTheme.colors.textSecondary }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: currentTheme.colors.surface, borderColor: currentTheme.colors.border }}>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2" style={{ color: currentTheme.colors.text }}>Color Palette</h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(currentTheme.colors)
                    .filter(([_, color]) => typeof color === 'string')
                    .slice(0, 9)
                    .map(([name, color]) => (
                    <div key={name} className="text-center">
                      <div 
                        className="w-8 h-8 rounded mx-auto mb-1"
                        style={{ backgroundColor: color as string }}
                      />
                      <span className="text-xs capitalize" style={{ color: currentTheme.colors.textSecondary }}>
                        {name.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
      features: ['Dynamic theming', 'Color customization', 'Animation controls', 'Auto mode'],
      isNew: true
    },
    {
      id: 'enhanced-sorting',
      title: 'Advanced Sorting Visualization',
      description: 'Interactive bubble sort with step-by-step mode, metrics, and educational features',
      icon: <TrendingUp className="w-5 h-5" />,
      component: <EnhancedBubbleSortVisualization />,
      features: ['Step-by-step mode', 'Real-time metrics', 'Keyboard shortcuts', 'Pseudocode sync'],
      isNew: true
    },
    {
      id: 'algorithm-comparison',
      title: 'Algorithm Comparison Lab',
      description: 'Side-by-side algorithm comparison with detailed analysis and performance metrics',
      icon: <GitCompare className="w-5 h-5" />,
      component: <AlgorithmComparison />,
      features: ['Side-by-side comparison', 'Performance metrics', 'Race mode', 'Detailed analysis'],
      isNew: true
    },
    {
      id: 'interactive-quiz',
      title: 'Interactive Learning Quizzes',
      description: 'Pop-up quizzes and educational tooltips for enhanced learning experience',
      icon: <Brain className="w-5 h-5" />,
      component: (
        <div className="space-y-4">
          <div className="text-center">
            <Button
              onClick={() => setShowQuiz(true)}
              className="transition-all duration-200"
              style={{ backgroundColor: currentTheme.colors.primary, color: 'white' }}
            >
              <Play className="w-4 h-4 mr-2" />
              Try Interactive Quiz
            </Button>
          </div>
          
          {showQuiz && (
            <InteractiveQuiz
              currentContext="general"
              currentStep={1}
              totalSteps={10}
              onQuizComplete={(correct) => {
                console.log('Quiz completed:', correct)
                setTimeout(() => setShowQuiz(false), 3000)
              }}
            />
          )}

          <Card style={{ backgroundColor: currentTheme.colors.surface, borderColor: currentTheme.colors.border }}>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2" style={{ color: currentTheme.colors.text }}>Quiz Features</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Target className="w-3 h-3" style={{ color: currentTheme.colors.success }} />
                    <span style={{ color: currentTheme.colors.textSecondary }}>Context-aware questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-3 h-3" style={{ color: currentTheme.colors.warning }} />
                    <span style={{ color: currentTheme.colors.textSecondary }}>Difficulty levels</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-3 h-3" style={{ color: currentTheme.colors.info }} />
                    <span style={{ color: currentTheme.colors.textSecondary }}>Detailed explanations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Timer className="w-3 h-3" style={{ color: currentTheme.colors.primary }} />
                    <span style={{ color: currentTheme.colors.textSecondary }}>Progress tracking</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      ),
      features: ['Context-aware quizzes', 'Educational tooltips', 'Progress tracking', 'Explanations']
    },
    {
      id: 'enhanced-navigation',
      title: 'Modern Navigation Hub',
      description: 'Comprehensive navigation system with search, filters, and algorithm categorization',
      icon: <Navigation className="w-5 h-5" />,
      component: (
        <div className="max-h-96 overflow-y-auto">
          <EnhancedNavigation />
        </div>
      ),
      features: ['Smart search', 'Category filters', 'Progress tracking', 'Favorites system'],
      isNew: true
    },
    {
      id: 'implementation-summary',
      title: 'Implementation Summary',
      description: 'Complete overview of all enhanced features and their implementation status',
      icon: <FileText className="w-5 h-5" />,
      component: <ImplementationSummary />,
      features: ['Feature tracking', 'Progress overview', 'Component details', 'Status monitoring']
    }
  ]

  const currentSection = demoSections.find(section => section.id === activeSection)

  return (
    <div 
      className="min-h-screen transition-all duration-300 p-6"
      style={{ 
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text 
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8" style={{ color: currentTheme.colors.primary }} />
            <h1 className="text-4xl font-bold" style={{ color: currentTheme.colors.text }}>
              Enhanced Visualization Demo
            </h1>
          </div>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: currentTheme.colors.textSecondary }}>
            Experience the next generation of algorithm visualization with modern UI enhancements, 
            advanced animations, comprehensive controls, real-time metrics, and interactive educational elements.
          </p>
          
          {/* Theme Toggle */}
          <div className="flex justify-center">
            <ModernThemeToggle />
          </div>
        </div>

        {/* Feature Overview */}
        <Card 
          className="backdrop-blur-sm"
          style={{ 
            backgroundColor: currentTheme.colors.surface + '95',
            borderColor: currentTheme.colors.border 
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: currentTheme.colors.text }}>
              <Zap className="w-5 h-5" />
              New Features Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Modern UI', icon: <Palette className="w-4 h-4" />, description: 'Enhanced theme system with dark/light modes' },
                { title: 'Animations', icon: <TrendingUp className="w-4 h-4" />, description: 'Smooth transitions and configurable speeds' },
                { title: 'Interactive', icon: <Brain className="w-4 h-4" />, description: 'Quizzes, tooltips, and step-by-step learning' },
                { title: 'Analytics', icon: <Award className="w-4 h-4" />, description: 'Real-time metrics and performance tracking' }
              ].map((feature, index) => (
                <div key={index} className="text-center p-4 rounded-lg" style={{ backgroundColor: currentTheme.colors.background }}>
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: currentTheme.colors.primary + '20' }}
                  >
                    <div style={{ color: currentTheme.colors.primary }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: currentTheme.colors.text }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Sections */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Section Navigation */}
          <Card 
            className="lg:col-span-1 backdrop-blur-sm"
            style={{ 
              backgroundColor: currentTheme.colors.surface + '95',
              borderColor: currentTheme.colors.border 
            }}
          >
            <CardHeader>
              <CardTitle className="text-lg" style={{ color: currentTheme.colors.text }}>
                Demo Sections
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {demoSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full p-3 text-left rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      activeSection === section.id ? 'ring-2' : ''
                    }`}
                    style={{
                      backgroundColor: activeSection === section.id ? currentTheme.colors.primary + '20' : 'transparent',
                      ...(activeSection === section.id && { ringColor: currentTheme.colors.primary + '50' })
                    }}
                  >
                    <div style={{ color: activeSection === section.id ? currentTheme.colors.primary : currentTheme.colors.textSecondary }}>
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm" style={{ color: currentTheme.colors.text }}>
                          {section.title}
                        </span>
                        {section.isNew && (
                          <Badge className="text-xs" style={{ backgroundColor: currentTheme.colors.info + '20', color: currentTheme.colors.info, border: 'none' }}>
                            NEW
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs mt-1" style={{ color: currentTheme.colors.textSecondary }}>
                        {section.description}
                      </p>
                    </div>
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform ${activeSection === section.id ? 'rotate-90' : ''}`}
                      style={{ color: currentTheme.colors.textSecondary }}
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section Content */}
          <div className="lg:col-span-3">
            {currentSection && (
              <Card 
                className="backdrop-blur-sm"
                style={{ 
                  backgroundColor: currentTheme.colors.surface + '95',
                  borderColor: currentTheme.colors.border 
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3" style={{ color: currentTheme.colors.text }}>
                      <div style={{ color: currentTheme.colors.primary }}>
                        {currentSection.icon}
                      </div>
                      {currentSection.title}
                      {currentSection.isNew && (
                        <Badge className="text-xs" style={{ backgroundColor: currentTheme.colors.info + '20', color: currentTheme.colors.info, border: 'none' }}>
                          NEW
                        </Badge>
                      )}
                    </CardTitle>
                  </div>
                  <p style={{ color: currentTheme.colors.textSecondary }}>
                    {currentSection.description}
                  </p>
                  
                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {currentSection.features.map((feature, index) => (
                      <Badge 
                        key={index}
                        className="text-xs"
                        style={{
                          backgroundColor: currentTheme.colors.secondary + '20',
                          color: currentTheme.colors.secondary,
                          border: 'none'
                        }}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {currentSection.component}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Animation Speed Indicator */}
        <div className="fixed bottom-4 right-4">
          <Card 
            className="backdrop-blur-sm"
            style={{ 
              backgroundColor: currentTheme.colors.surface + '95',
              borderColor: currentTheme.colors.border 
            }}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-sm">
                <Settings className="w-4 h-4" style={{ color: currentTheme.colors.primary }} />
                <span style={{ color: currentTheme.colors.text }}>Speed: {animationSpeed}</span>
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: currentTheme.colors.primary }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
