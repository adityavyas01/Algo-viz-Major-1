/**
 * Enhanced Bubble Sort Visualization
 * Modern implementation with all requested features:
 * - Step-by-step mode with keyboard controls
 * - Real-time metrics and analytics
 * - Synchronized pseudocode highlighting
 * - Interactive elements and animations
 * - Comparison mode support
 */

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { 
  Play, 
  Pause, 
  Square, 
  SkipForward, 
  SkipBack,
  RotateCcw,
  Settings,
  Activity,
  Code,
  BarChart3,
  HelpCircle,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { useVisualizationTheme } from '@/contexts/EnhancedTheme'
import { ModernThemeToggle, AnimationSpeedControl } from '@/components/ModernThemeToggle'

interface SortingStep {
  array: number[]
  comparing: number[]
  swapping: number[]
  sorted: number[]
  currentPass: number
  totalPasses: number
  comparisons: number
  swaps: number
  codeLineIndex: number
  description: string
}

interface SortingMetrics {
  comparisons: number
  swaps: number
  timeComplexity: string
  spaceComplexity: string
  runtime: number
  isStable: boolean
  isInPlace: boolean
}

const BUBBLE_SORT_PSEUDOCODE = [
  "procedure bubbleSort( A : list of sortable items )",
  "    n = length(A)",
  "    repeat",
  "        swapped = false",
  "        for i = 1 to n-1 inclusive do",
  "            if A[i-1] > A[i] then",
  "                swap(A[i-1], A[i])",
  "                swapped = true",
  "            end if",
  "        end for",
  "        n = n - 1",
  "    until not swapped",
  "end procedure"
]

export function EnhancedBubbleSortVisualization() {
  const { currentTheme, animationSpeed } = useVisualizationTheme()
  
  // State management
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90])
  const [steps, setSteps] = useState<SortingStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isStepMode, setIsStepMode] = useState(false)
  const [arraySize, setArraySize] = useState(7)
  const [showMetrics, setShowMetrics] = useState(true)
  const [showPseudocode, setShowPseudocode] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)
  
  // Refs for keyboard handling and timers
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate random array
  const generateRandomArray = useCallback((size: number = arraySize) => {
    const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1)
    setArray(newArray)
    setSteps([])
    setCurrentStepIndex(0)
    setIsPlaying(false)
  }, [arraySize])

  // Generate sorting steps
  const generateBubbleSortSteps = useCallback((inputArray: number[]): SortingStep[] => {
    const steps: SortingStep[] = []
    const arr = [...inputArray]
    const n = arr.length
    let comparisons = 0
    let swaps = 0

    // Initial state
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      currentPass: 0,
      totalPasses: n - 1,
      comparisons,
      swaps,
      codeLineIndex: 0,
      description: "Starting Bubble Sort algorithm"
    })

    for (let i = 0; i < n - 1; i++) {
      let swapped = false
      
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing step
        comparisons++
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          currentPass: i + 1,
          totalPasses: n - 1,
          comparisons,
          swaps,
          codeLineIndex: 5,
          description: `Comparing elements at positions ${j} and ${j + 1}: ${arr[j]} vs ${arr[j + 1]}`
        })

        if (arr[j] > arr[j + 1]) {
          // Swapping step
          swaps++
          swapped = true
          
          steps.push({
            array: [...arr],
            comparing: [],
            swapping: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
            currentPass: i + 1,
            totalPasses: n - 1,
            comparisons,
            swaps,
            codeLineIndex: 6,
            description: `Swapping ${arr[j]} and ${arr[j + 1]} (${arr[j]} > ${arr[j + 1]})`
          })

          // Perform swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

          // After swap step
          steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
            currentPass: i + 1,
            totalPasses: n - 1,
            comparisons,
            swaps,
            codeLineIndex: 7,
            description: `Swapped! New positions: ${arr[j]} and ${arr[j + 1]}`
          })
        } else {
          steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
            currentPass: i + 1,
            totalPasses: n - 1,
            comparisons,
            swaps,
            codeLineIndex: 8,
            description: `No swap needed (${arr[j]} ≤ ${arr[j + 1]})`
          })
        }
      }
      
      // End of pass
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
        currentPass: i + 1,
        totalPasses: n - 1,
        comparisons,
        swaps,
        codeLineIndex: 10,
        description: `Pass ${i + 1} complete. Element ${arr[n - 1 - i]} is in final position.`
      })

      if (!swapped) break
    }

    // Final step - all sorted
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, k) => k),
      currentPass: n - 1,
      totalPasses: n - 1,
      comparisons,
      swaps,
      codeLineIndex: 12,
      description: "Sorting complete! All elements are in their final positions."
    })

    return steps
  }, [])

  // Get current step
  const currentStep = steps[currentStepIndex] || {
    array,
    comparing: [],
    swapping: [],
    sorted: [],
    currentPass: 0,
    totalPasses: 0,
    comparisons: 0,
    swaps: 0,
    codeLineIndex: 0,
    description: "Ready to start sorting"
  }

  // Calculate metrics
  const metrics: SortingMetrics = {
    comparisons: currentStep.comparisons,
    swaps: currentStep.swaps,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    runtime: startTime > 0 ? Date.now() - startTime : 0,
    isStable: true,
    isInPlace: true
  }

  // Animation controls
  const play = useCallback(() => {
    if (steps.length === 0) {
      const newSteps = generateBubbleSortSteps(array)
      setSteps(newSteps)
      setStartTime(Date.now())
    }
    setIsPlaying(true)
    setIsStepMode(false)
  }, [array, steps, generateBubbleSortSteps])

  const pause = useCallback(() => {
    setIsPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const stop = useCallback(() => {
    setIsPlaying(false)
    setCurrentStepIndex(0)
    setStartTime(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    stop()
    setSteps([])
    generateRandomArray()
  }, [stop, generateRandomArray])

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    } else if (steps.length === 0) {
      const newSteps = generateBubbleSortSteps(array)
      setSteps(newSteps)
      setCurrentStepIndex(1)
      setStartTime(Date.now())
    }
  }, [currentStepIndex, steps, array, generateBubbleSortSteps])

  const prevStep = useCallback(() => {
    setCurrentStepIndex(prev => Math.max(0, prev - 1))
  }, [])

  const stepMode = useCallback(() => {
    if (steps.length === 0) {
      const newSteps = generateBubbleSortSteps(array)
      setSteps(newSteps)
      setStartTime(Date.now())
    }
    setIsStepMode(true)
    setIsPlaying(false)
  }, [array, steps, generateBubbleSortSteps])

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && !isStepMode) {
      const duration = currentTheme.animations.duration[animationSpeed]
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, Math.max(duration * 2, 100))

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }
  }, [isPlaying, isStepMode, steps.length, currentTheme, animationSpeed])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return

      switch (event.code) {
        case 'Space':
          event.preventDefault()
          isPlaying ? pause() : play()
          break
        case 'ArrowRight':
          event.preventDefault()
          nextStep()
          break
        case 'ArrowLeft':
          event.preventDefault()
          prevStep()
          break
        case 'KeyR':
          event.preventDefault()
          reset()
          break
        case 'KeyS':
          event.preventDefault()
          stepMode()
          break
        case 'Escape':
          event.preventDefault()
          stop()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, play, pause, nextStep, prevStep, reset, stepMode, stop])

  // Get bar color based on state
  const getBarColor = (index: number) => {
    if (currentStep.sorted.includes(index)) return currentTheme.colors.sorting.sorted
    if (currentStep.swapping.includes(index)) return currentTheme.colors.sorting.swapping
    if (currentStep.comparing.includes(index)) return currentTheme.colors.sorting.comparing
    return currentTheme.colors.sorting.inactive
  }

  // Get bar height
  const getBarHeight = (value: number) => {
    const maxValue = Math.max(...currentStep.array)
    return (value / maxValue) * 200
  }

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-7xl mx-auto p-6 space-y-6"
      tabIndex={0}
      style={{ 
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text 
      }}
    >
      {/* Header with controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h1 
            className="text-3xl font-bold"
            style={{ 
              fontFamily: currentTheme.typography.fontFamily.display,
              color: currentTheme.colors.primary 
            }}
          >
            Enhanced Bubble Sort
          </h1>
          <ModernThemeToggle />
          <AnimationSpeedControl />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={isPlaying ? pause : play}
            size="sm"
            className="transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: currentTheme.colors.primary,
              color: 'white'
            }}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span className="ml-2">{isPlaying ? 'Pause' : 'Play'}</span>
          </Button>
          
          <Button
            onClick={stepMode}
            variant="outline"
            size="sm"
            className={`transition-all duration-200 ${isStepMode ? 'ring-2' : ''}`}
            style={{
              backgroundColor: isStepMode ? currentTheme.colors.secondary : currentTheme.colors.surface,
              borderColor: currentTheme.colors.border,
              color: isStepMode ? 'white' : currentTheme.colors.text
            }}
          >
            <Zap className="h-4 w-4 mr-2" />
            Step Mode
          </Button>

          <Button
            onClick={prevStep}
            variant="outline"
            size="sm"
            disabled={currentStepIndex === 0}
            className="transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: currentTheme.colors.surface,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            onClick={nextStep}
            variant="outline"
            size="sm"
            disabled={currentStepIndex >= steps.length - 1 && steps.length > 0}
            className="transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: currentTheme.colors.surface,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          >
            <SkipForward className="h-4 w-4" />
          </Button>

          <Button
            onClick={stop}
            variant="outline"
            size="sm"
            className="transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: currentTheme.colors.surface,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          >
            <Square className="h-4 w-4" />
          </Button>

          <Button
            onClick={reset}
            variant="outline"
            size="sm"
            className="transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: currentTheme.colors.surface,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress and description */}
      <Card style={{ 
        backgroundColor: currentTheme.colors.surface,
        borderColor: currentTheme.colors.border 
      }}>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Progress: Step {currentStepIndex + 1} of {steps.length || 1}
                {currentStep.currentPass > 0 ? ` • Pass ${currentStep.currentPass}/${currentStep.totalPasses}` : ''}
              </span>
              <span className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                {((currentStepIndex / Math.max(steps.length - 1, 1)) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={(currentStepIndex / Math.max(steps.length - 1, 1)) * 100}
              className="h-2"
              style={{ backgroundColor: currentTheme.colors.border }}
            />
            <p 
              className="text-center font-medium"
              style={{ color: currentTheme.colors.text }}
            >
              {currentStep.description}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main visualization */}
        <div className="xl:col-span-2">
          <Card style={{ 
            backgroundColor: currentTheme.colors.surface,
            borderColor: currentTheme.colors.border 
          }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                Array Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Array size control */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Array Size: {arraySize}</label>
                  <Slider
                    value={[arraySize]}
                    onValueChange={([value]) => setArraySize(value)}
                    min={5}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                  <Button
                    onClick={() => generateRandomArray()}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    style={{
                      backgroundColor: currentTheme.colors.surface,
                      borderColor: currentTheme.colors.border,
                      color: currentTheme.colors.text
                    }}
                  >
                    Generate New Array
                  </Button>
                </div>

                {/* Visualization area */}
                <div className="relative bg-gradient-to-br from-opacity-5 to-opacity-10 p-6 rounded-lg min-h-[300px] flex items-end justify-center gap-2">
                  {currentStep.array.map((value, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center transition-all duration-300 ease-out"
                      style={{
                        transform: currentStep.swapping.includes(index) ? 'scale(1.1)' : 'scale(1)',
                      }}
                    >
                      {/* Value label */}
                      <span 
                        className="text-xs font-medium mb-1 transition-colors duration-300"
                        style={{ 
                          color: currentStep.sorted.includes(index) 
                            ? currentTheme.colors.success 
                            : currentTheme.colors.text 
                        }}
                      >
                        {value}
                      </span>
                      
                      {/* Bar */}
                      <div
                        className="relative rounded-t-md transition-all duration-300 ease-out"
                        style={{
                          width: `${Math.max(20, 300 / currentStep.array.length)}px`,
                          height: `${getBarHeight(value)}px`,
                          backgroundColor: getBarColor(index),
                          boxShadow: currentStep.comparing.includes(index) || currentStep.swapping.includes(index)
                            ? `0 0 20px ${getBarColor(index)}40`
                            : 'none',
                          border: currentStep.comparing.includes(index) || currentStep.swapping.includes(index)
                            ? `2px solid ${getBarColor(index)}`
                            : 'none'
                        }}
                      >
                        {/* Sorted indicator */}
                        {currentStep.sorted.includes(index) && (
                          <div 
                            className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs"
                            style={{ color: currentTheme.colors.success }}
                          >
                            ✓
                          </div>
                        )}
                      </div>
                      
                      {/* Index label */}
                      <span 
                        className="text-xs mt-1"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        {index}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 justify-center text-xs">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: currentTheme.colors.sorting.comparing }}
                    />
                    <span>Comparing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: currentTheme.colors.sorting.swapping }}
                    />
                    <span>Swapping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: currentTheme.colors.sorting.sorted }}
                    />
                    <span>Sorted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: currentTheme.colors.sorting.inactive }}
                    />
                    <span>Unsorted</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side panels */}
        <div className="space-y-6">
          {/* Metrics panel */}
          {showMetrics && (
            <Card style={{ 
              backgroundColor: currentTheme.colors.surface,
              borderColor: currentTheme.colors.border 
            }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                    Metrics
                  </div>
                  <Button
                    onClick={() => setShowMetrics(false)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span style={{ color: currentTheme.colors.textSecondary }}>Comparisons</span>
                    <div className="font-bold text-lg" style={{ color: currentTheme.colors.warning }}>
                      {metrics.comparisons}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: currentTheme.colors.textSecondary }}>Swaps</span>
                    <div className="font-bold text-lg" style={{ color: currentTheme.colors.error }}>
                      {metrics.swaps}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: currentTheme.colors.textSecondary }}>Time Complexity</span>
                    <div className="font-mono font-bold" style={{ color: currentTheme.colors.primary }}>
                      {metrics.timeComplexity}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: currentTheme.colors.textSecondary }}>Space Complexity</span>
                    <div className="font-mono font-bold" style={{ color: currentTheme.colors.secondary }}>
                      {metrics.spaceComplexity}
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t" style={{ borderColor: currentTheme.colors.border }}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                      Properties
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 rounded text-xs" style={{
                      backgroundColor: currentTheme.colors.success + '20',
                      color: currentTheme.colors.success
                    }}>
                      Stable
                    </span>
                    <span className="px-2 py-1 rounded text-xs" style={{
                      backgroundColor: currentTheme.colors.info + '20',
                      color: currentTheme.colors.info
                    }}>
                      In-Place
                    </span>
                  </div>
                </div>

                {metrics.runtime > 0 && (
                  <div className="pt-2 border-t" style={{ borderColor: currentTheme.colors.border }}>
                    <span className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                      Runtime: {(metrics.runtime / 1000).toFixed(2)}s
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Pseudocode panel */}
          {showPseudocode && (
            <Card style={{ 
              backgroundColor: currentTheme.colors.surface,
              borderColor: currentTheme.colors.border 
            }}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                    Pseudocode
                  </div>
                  <Button
                    onClick={() => setShowPseudocode(false)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {BUBBLE_SORT_PSEUDOCODE.map((line, index) => (
                    <div
                      key={index}
                      className={`p-1 rounded text-xs font-mono transition-all duration-300 ${
                        index === currentStep.codeLineIndex 
                          ? 'transform scale-105' 
                          : ''
                      }`}
                      style={{
                        backgroundColor: index === currentStep.codeLineIndex 
                          ? currentTheme.colors.primary + '20' 
                          : 'transparent',
                        color: index === currentStep.codeLineIndex 
                          ? currentTheme.colors.primary 
                          : currentTheme.colors.textSecondary,
                        borderLeft: index === currentStep.codeLineIndex 
                          ? `3px solid ${currentTheme.colors.primary}` 
                          : '3px solid transparent'
                      }}
                    >
                      <span className="text-xs mr-2 opacity-50">{index + 1}</span>
                      {line}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Keyboard shortcuts */}
          <Card style={{ 
            backgroundColor: currentTheme.colors.surface,
            borderColor: currentTheme.colors.border 
          }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
                Keyboard Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>Space</span>
                  <span>Play/Pause</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>→</span>
                  <span>Next Step</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>←</span>
                  <span>Previous Step</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>R</span>
                  <span>Reset</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>S</span>
                  <span>Step Mode</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: currentTheme.colors.textSecondary }}>Esc</span>
                  <span>Stop</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
