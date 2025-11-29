import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Play, 
  Check, 
  X, 
  Trophy, 
  Star, 
  Target, 
  Code, 
  Users, 
  BookOpen, 
  ChevronRight, 
  Lightbulb, 
  RefreshCw, 
  Award, 
  Timer, 
  AlertCircle,
  ChevronLeft,
  FileText,
  Terminal,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { challengeProblems } from '../data/challengeProblems';
import { ChallengeExecutor, TestResult } from '../services/challengeExecutor';
import { MonacoCodeEditor } from './MonacoCodeEditor';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

interface ChallengeModeProps {
  challengeId?: string;
  onComplete?: (success: boolean, timeSpent: number, score: number) => void;
  onBack?: () => void;
}

export const ChallengeMode: React.FC<ChallengeModeProps> = ({
  challengeId = 'two-sum',
  onComplete,
  onBack
}) => {
  const challenge = challengeProblems.find(p => p.id === challengeId) || challengeProblems[0];
  const { session } = useAuth();
  
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit * 60);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [code, setCode] = useState(challenge.codeTemplates?.javascript || '// Write your solution here');
  const [language, setLanguage] = useState('javascript');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'editorial' | 'submissions'>('description');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const trackEvent = async (eventType: string, metadata: object) => {
    if (!session) return;
    try {
      await supabase.functions.invoke('track-event', {
        body: {
          event_type: eventType,
          metadata,
        },
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0 && !isCompleted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isCompleted]);

  useEffect(() => {
    // Track when a user starts a challenge
    if (isRunning) {
      trackEvent('challenge_started', {
        challengeId: challenge.id,
        challengeTitle: challenge.title,
      });
    }
  }, [isRunning]);

  useEffect(() => {
    // Update code template when language changes
    const template = challenge.codeTemplates?.[language as keyof typeof challenge.codeTemplates];
    if (template && !code.trim()) {
      setCode(template);
    }
  }, [language, challenge.codeTemplates]);

  const handleTimeUp = () => {
    setIsCompleted(true);
    setSubmissionStatus('failed');
    trackEvent('challenge_failed', {
      challengeId: challenge.id,
      reason: 'time_up',
      timeSpent,
    });
    onComplete?.(false, timeSpent, 0);
  };

  const handleStart = () => {
    setIsRunning(true);
    setTimeSpent(0);
  };

  const handleReset = () => {
    setTimeLeft(challenge.timeLimit * 60);
    setTimeSpent(0);
    setIsRunning(false);
    setIsCompleted(false);
    setCode(challenge.codeTemplates?.[language as keyof typeof challenge.codeTemplates] || '// Write your solution here');
    setTestResults([]);
    setSubmissionStatus('idle');
    setScore(0);
    setAttempts(0);
    setCurrentHintIndex(0);
  };

  const handleRunTests = async () => {
    if (!code.trim()) {
      alert('Please write some code first!');
      return;
    }

    setIsExecuting(true);
    try {
      // Run against visible test cases only
      const visibleTests = challenge.testCases.slice(0, 2);
      const results = await ChallengeExecutor.executeCode(
        code,
        language,
        visibleTests,
        challenge.functionName || 'solution'
      );
      setTestResults(results);
    } catch (error) {
      console.error('Test execution failed:', error);
      alert('Failed to run tests. Please check your code.');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert('Please write some code first!');
      return;
    }

    setSubmissionStatus('running');
    setAttempts(prev => prev + 1);
    
    try {
      // Run against all test cases (including hidden ones)
      const results = await ChallengeExecutor.executeCode(
        code,
        language,
        challenge.testCases,
        challenge.functionName || 'solution'
      );
      
      setTestResults(results);
      
      const passedTests = results.filter(r => r.passed).length;
      const allPassed = passedTests === results.length;
      
      // Calculate score
      const scoreResult = ChallengeExecutor.calculateScore(results, challenge.points);
      setScore(scoreResult.score);
      
      if (allPassed) {
        setIsCompleted(true);
        setIsRunning(false);
        setSubmissionStatus('success');
        trackEvent('problem_solved', {
          challengeId: challenge.id,
          topic: challenge.category,
          difficulty: challenge.difficulty.toLowerCase(),
          timeSpent,
          attempts,
          score: scoreResult.score,
        });
        onComplete?.(true, timeSpent, scoreResult.score);
      } else {
        setSubmissionStatus('failed');
        trackEvent('challenge_failed', {
          challengeId: challenge.id,
          reason: 'tests_failed',
          timeSpent,
          attempts,
          passedTests,
          totalTests: results.length,
        });
        // Show hints for failed submission
        setShowHints(true);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmissionStatus('failed');
      alert('Submission failed. Please try again.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getSubmissionStatusColor = () => {
    switch (submissionStatus) {
      case 'running': return 'bg-yellow-500';
      case 'success': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors text-white"
                  title="Back to Challenges"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{challenge.title}</h1>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-gray-400 bg-gray-800 px-3 py-1.5 rounded-lg">{challenge.category || 'Programming'}</span>
                  <div className="flex items-center space-x-1 text-yellow-400 bg-yellow-400/10 px-3 py-1.5 rounded-lg">
                    <Star className="w-4 h-4" />
                    <span>{challenge.points} points</span>
                  </div>
                  {score > 0 && (
                    <div className="flex items-center space-x-1 text-green-400 bg-green-400/10 px-3 py-1.5 rounded-lg">
                      <Award className="w-4 h-4" />
                      <span>Score: {score}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-6 border border-gray-700">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-2xl font-mono text-white">{formatTime(timeLeft)}</span>
                </div>
                <div className="w-px h-8 bg-gray-600" />
                <div className="flex items-center space-x-2">
                  <Timer className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-mono text-white">{formatTime(timeSpent)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!isRunning && !isCompleted && (
                  <button
                    onClick={handleStart}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Challenge</span>
                  </button>
                )}
                
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  title="Reset Challenge"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          {testResults.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">
                  Test Cases: {testResults.filter(r => r.passed).length} / {testResults.length} passed
                </span>
                <span className="text-sm text-gray-400">Attempts: {attempts}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getSubmissionStatusColor()}`}
                  style={{ width: `${(testResults.filter(r => r.passed).length / testResults.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Problem Description */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="flex border-b border-gray-700">
                {['description', 'editorial', 'submissions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="space-y-6">
                    {/* Problem Statement */}
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                        <BookOpen className="w-5 h-5" />
                        <span>Problem Description</span>
                      </h2>
                      <div className="text-gray-300 leading-relaxed space-y-4">
                        {challenge.description.split('\n').map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    {/* Input/Output Format */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Input/Output Format</h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-400">Input:</span>
                          <p className="mt-1 text-gray-300 text-sm">{challenge.inputFormat}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-400">Output:</span>
                          <p className="mt-1 text-gray-300 text-sm">{challenge.outputFormat}</p>
                        </div>
                      </div>
                    </div>

                    {/* Examples */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Examples</h3>
                      <div className="space-y-4">
                        {challenge.examples.map((example, index) => (
                          <div key={index} className="bg-gray-900 rounded-lg p-4">
                            <div className="mb-3">
                              <span className="text-sm font-medium text-gray-400">Input:</span>
                              <pre className="mt-1 text-green-400 font-mono text-sm bg-gray-800 p-2 rounded">{example.input}</pre>
                            </div>
                            <div className="mb-3">
                              <span className="text-sm font-medium text-gray-400">Output:</span>
                              <pre className="mt-1 text-blue-400 font-mono text-sm bg-gray-800 p-2 rounded">{example.output}</pre>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="text-sm font-medium text-gray-400">Explanation:</span>
                                <p className="mt-1 text-gray-300 text-sm">{example.explanation}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Constraints */}
                    <div className="bg-gray-900 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
                      <div className="space-y-1">
                        {challenge.constraints.map((constraint, index) => (
                          <p key={index} className="text-gray-300 text-sm font-mono">• {constraint}</p>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {challenge.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-sm border border-blue-600/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'editorial' && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Editorial Solution</h3>
                    {isCompleted ? (
                      <div className="space-y-4">
                        <div className="text-gray-300 leading-relaxed">
                          {challenge.editorial?.explanation || 'No editorial available yet.'}
                        </div>
                        {challenge.editorial?.solution && (
                          <div className="bg-gray-900 rounded-lg p-4">
                            <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                              {challenge.editorial.solution}
                            </pre>
                          </div>
                        )}
                        <div className="text-sm text-gray-400">
                          Time Complexity: <span className="text-green-400">{challenge.editorial?.timeComplexity || 'N/A'}</span><br/>
                          Space Complexity: <span className="text-blue-400">{challenge.editorial?.spaceComplexity || 'N/A'}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400">Complete the challenge to unlock the editorial solution</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Hints Panel */}
            {showHints && challenge.hints.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-600/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-yellow-400 flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5" />
                    <span>Hint {currentHintIndex + 1}</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentHintIndex(Math.max(0, currentHintIndex - 1))}
                      disabled={currentHintIndex === 0}
                      className="p-1 text-yellow-400 hover:text-yellow-300 disabled:opacity-50"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <span className="text-sm text-gray-400">
                      {currentHintIndex + 1} / {challenge.hints.length}
                    </span>
                    <button
                      onClick={() => {
                        setCurrentHintIndex(Math.min(challenge.hints.length - 1, currentHintIndex + 1));
                        trackEvent('hint_used', {
                          challengeId: challenge.id,
                          hintIndex: currentHintIndex + 1,
                        });
                      }}
                      disabled={currentHintIndex === challenge.hints.length - 1}
                      className="p-1 text-yellow-400 hover:text-yellow-300 disabled:opacity-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300">{challenge.hints[currentHintIndex]}</p>
              </div>
            )}
          </div>

          {/* Right Panel - Code Editor & Results */}
          <div className="space-y-6">
            {/* Code Editor */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden h-96">
              <MonacoCodeEditor
                value={code}
                onChange={setCode}
                language={language}
                onLanguageChange={setLanguage}
                onRun={handleRunTests}
                onSubmit={handleSubmit}
                isRunning={isExecuting || submissionStatus === 'running'}
                theme="dark"
              />
            </div>

            {/* Test Results */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
                <span>Test Results</span>
                {isExecuting && (
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
                    <span className="text-sm">Running tests...</span>
                  </div>
                )}
              </h3>
              
              {testResults.length > 0 ? (
                <div className="space-y-3">
                  {testResults.slice(0, 2).map((result, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      result.passed 
                        ? 'bg-green-900/20 border-green-600/30' 
                        : 'bg-red-900/20 border-red-600/30'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 font-medium">Test Case {index + 1}</span>
                        <div className="flex items-center space-x-2">
                          {result.passed ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <X className="w-5 h-5 text-red-400" />
                          )}
                          <span className="text-xs text-gray-400">
                            {result.executionTime?.toFixed(2)}ms
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Input:</span>
                          <span className="ml-2 text-gray-300 font-mono">{JSON.stringify(result.input)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Expected:</span>
                          <span className="ml-2 text-green-400 font-mono">{JSON.stringify(result.expectedOutput)}</span>
                        </div>
                        {result.actualOutput !== undefined && (
                          <div>
                            <span className="text-gray-400">Actual:</span>
                            <span className={`ml-2 font-mono ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                              {JSON.stringify(result.actualOutput)}
                            </span>
                          </div>
                        )}
                        {result.error && (
                          <div>
                            <span className="text-red-400">Error:</span>
                            <span className="ml-2 text-red-300 text-xs">{result.error}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Hidden test cases indicator */}
                  {submissionStatus === 'running' && (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-400">Running hidden test cases...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Run your code to see test results</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
