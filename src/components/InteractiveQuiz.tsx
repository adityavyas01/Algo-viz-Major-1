/**
 * Enhanced Interactive Quiz Component
 * Pop-up quizzes and educational tooltips for algorithm learning
 */

import React, { useState, useEffect } from 'react'
import { HelpCircle, CheckCircle, XCircle, Lightbulb, Brain } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useVisualizationTheme } from '@/contexts/EnhancedTheme'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  context: string // When to show this question
}

interface EducationalTooltip {
  id: string
  title: string
  content: string
  trigger: string // CSS selector or element description
  position: 'top' | 'bottom' | 'left' | 'right'
}

const BUBBLE_SORT_QUESTIONS: QuizQuestion[] = [
  {
    id: 'bubble-1',
    question: 'What will happen next in the Bubble Sort algorithm?',
    options: [
      'The smaller element will move left',
      'The larger element will move right', 
      'No swap will occur',
      'The algorithm will complete'
    ],
    correctAnswer: 0,
    explanation: 'In Bubble Sort, when we compare two adjacent elements and the left element is larger, we swap them, effectively moving the smaller element to the left.',
    difficulty: 'easy',
    context: 'comparing'
  },
  {
    id: 'bubble-2',
    question: 'Why is Bubble Sort called "Bubble" Sort?',
    options: [
      'It creates bubbles in memory',
      'Small elements "bubble" to the beginning',
      'It uses bubble-shaped data structures',
      'It was invented by someone named Bubble'
    ],
    correctAnswer: 1,
    explanation: 'Bubble Sort gets its name because smaller elements gradually "bubble" to the beginning of the list through repeated swaps, just like air bubbles rising to the surface of water.',
    difficulty: 'medium',
    context: 'general'
  },
  {
    id: 'bubble-3',
    question: 'What is the time complexity of Bubble Sort in the worst case?',
    options: [
      'O(n)',
      'O(n log n)',
      'O(n²)',
      'O(2ⁿ)'
    ],
    correctAnswer: 2,
    explanation: 'Bubble Sort has O(n²) time complexity in the worst case because it may need to make n passes through the array, and each pass involves up to n-1 comparisons.',
    difficulty: 'hard',
    context: 'complexity'
  }
]

const EDUCATIONAL_TOOLTIPS: EducationalTooltip[] = [
  {
    id: 'comparison-tooltip',
    title: 'Element Comparison',
    content: 'The algorithm is comparing these two adjacent elements to determine if they need to be swapped. The yellow highlighting indicates which elements are being compared.',
    trigger: 'comparing-elements',
    position: 'top'
  },
  {
    id: 'swap-tooltip',
    title: 'Element Swap',
    content: 'A swap is occurring! The larger element moves right and the smaller element moves left. This is the core operation of Bubble Sort.',
    trigger: 'swapping-elements',
    position: 'top'
  },
  {
    id: 'sorted-tooltip',
    title: 'Sorted Position',
    content: 'This element is now in its final sorted position! Elements highlighted in green have "bubbled" to their correct location and won\'t be moved again.',
    trigger: 'sorted-elements',
    position: 'bottom'
  }
]

interface InteractiveQuizProps {
  currentContext: string
  currentStep: number
  totalSteps: number
  onQuizComplete: (correct: boolean) => void
}

export function InteractiveQuiz({ currentContext, currentStep, totalSteps, onQuizComplete }: InteractiveQuizProps) {
  const { currentTheme } = useVisualizationTheme()
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizStats, setQuizStats] = useState({ correct: 0, total: 0 })

  // Show quiz at strategic moments
  useEffect(() => {
    const shouldShowQuiz = () => {
      // Show quiz at 25%, 50%, 75% progress or at specific contexts
      const progress = currentStep / totalSteps
      const isStrategicMoment = progress === 0.25 || progress === 0.5 || progress === 0.75
      const isContextMatch = BUBBLE_SORT_QUESTIONS.some(q => q.context === currentContext)
      
      return (isStrategicMoment || isContextMatch) && Math.random() > 0.7 // 30% chance
    }

    if (shouldShowQuiz() && !currentQuestion) {
      const relevantQuestions = BUBBLE_SORT_QUESTIONS.filter(
        q => q.context === currentContext || q.context === 'general'
      )
      
      if (relevantQuestions.length > 0) {
        const randomQuestion = relevantQuestions[Math.floor(Math.random() * relevantQuestions.length)]
        setCurrentQuestion(randomQuestion)
        setSelectedAnswer(null)
        setShowExplanation(false)
      }
    }
  }, [currentContext, currentStep, totalSteps, currentQuestion])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    const isCorrect = answerIndex === currentQuestion!.correctAnswer
    setQuizStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }))
    
    onQuizComplete(isCorrect)
  }

  const closeQuiz = () => {
    setCurrentQuestion(null)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  if (!currentQuestion) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card 
        className="w-full max-w-md animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
        style={{ 
          backgroundColor: currentTheme.colors.surface,
          borderColor: currentTheme.colors.border 
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
            Quick Quiz!
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded" style={{
                backgroundColor: currentQuestion.difficulty === 'easy' ? currentTheme.colors.success + '20' :
                               currentQuestion.difficulty === 'medium' ? currentTheme.colors.warning + '20' :
                               currentTheme.colors.error + '20',
                color: currentQuestion.difficulty === 'easy' ? currentTheme.colors.success :
                       currentQuestion.difficulty === 'medium' ? currentTheme.colors.warning :
                       currentTheme.colors.error
              }}>
                {currentQuestion.difficulty}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-medium">{currentQuestion.question}</p>
          
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showExplanation && handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-3 text-left rounded-lg border transition-all duration-200 ${
                  selectedAnswer === index 
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : showExplanation && index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'hover:bg-opacity-50'
                }`}
                style={{
                  backgroundColor: selectedAnswer === index 
                    ? index === currentQuestion.correctAnswer
                      ? currentTheme.colors.success + '20'
                      : currentTheme.colors.error + '20'
                    : showExplanation && index === currentQuestion.correctAnswer
                    ? currentTheme.colors.success + '20'
                    : currentTheme.colors.surface,
                  borderColor: selectedAnswer === index 
                    ? index === currentQuestion.correctAnswer
                      ? currentTheme.colors.success
                      : currentTheme.colors.error
                    : showExplanation && index === currentQuestion.correctAnswer
                    ? currentTheme.colors.success
                    : currentTheme.colors.border,
                  color: selectedAnswer === index 
                    ? index === currentQuestion.correctAnswer
                      ? currentTheme.colors.success
                      : currentTheme.colors.error
                    : showExplanation && index === currentQuestion.correctAnswer
                    ? currentTheme.colors.success
                    : currentTheme.colors.text
                }}
              >
                <div className="flex items-center gap-2">
                  {showExplanation && (
                    <>
                      {index === currentQuestion.correctAnswer ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="h-4 w-4 text-red-600" />
                      ) : null}
                    </>
                  )}
                  {option}
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div 
              className="p-3 rounded-lg border-l-4"
              style={{
                backgroundColor: currentTheme.colors.info + '20',
                borderLeftColor: currentTheme.colors.info,
                color: currentTheme.colors.text
              }}
            >
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: currentTheme.colors.info }} />
                <div>
                  <p className="font-medium text-sm">Explanation:</p>
                  <p className="text-sm mt-1">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: currentTheme.colors.border }}>
            <div className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
              Score: {quizStats.correct}/{quizStats.total}
            </div>
            <Button
              onClick={closeQuiz}
              size="sm"
              className="transition-all duration-200"
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: 'white'
              }}
            >
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Educational Tooltip Component
interface EducationalTooltipProps {
  tooltip: EducationalTooltip
  isVisible: boolean
  onClose: () => void
}

export function EducationalTooltip({ tooltip, isVisible, onClose }: EducationalTooltipProps) {
  const { currentTheme } = useVisualizationTheme()

  if (!isVisible) return null

  return (
    <div 
      className="absolute z-40 p-3 rounded-lg shadow-lg border max-w-xs animate-in fade-in-0 slide-in-from-bottom-2 duration-200"
      style={{
        backgroundColor: currentTheme.colors.surface,
        borderColor: currentTheme.colors.border,
        color: currentTheme.colors.text
      }}
    >
      <div className="flex items-start gap-2">
        <HelpCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: currentTheme.colors.primary }} />
        <div>
          <h4 className="font-semibold text-sm mb-1">{tooltip.title}</h4>
          <p className="text-xs leading-relaxed">{tooltip.content}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-auto text-xs opacity-70 hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      </div>
    </div>
  )
}

// Hook for managing educational tooltips
export function useEducationalTooltips() {
  const [activeTooltip, setActiveTooltip] = useState<EducationalTooltip | null>(null)
  const [shownTooltips, setShownTooltips] = useState<Set<string>>(new Set())

  const showTooltip = (context: string) => {
    const tooltip = EDUCATIONAL_TOOLTIPS.find(t => t.trigger === context)
    if (tooltip && !shownTooltips.has(tooltip.id)) {
      setActiveTooltip(tooltip)
      setShownTooltips(prev => new Set([...prev, tooltip.id]))
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setActiveTooltip(null)
      }, 5000)
    }
  }

  const hideTooltip = () => {
    setActiveTooltip(null)
  }

  return {
    activeTooltip,
    showTooltip,
    hideTooltip
  }
}
