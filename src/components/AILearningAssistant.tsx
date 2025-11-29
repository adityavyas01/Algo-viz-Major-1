import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  MessageCircle,
  Lightbulb,
  Code2,
  TrendingUp,
  Zap,
  Target,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Star,
  Clock,
  BarChart3,
  User,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { MotionWrapper, MicroInteraction } from '@/components/motion/MotionWrapper';

// Types for AI Assistant
interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  algorithm?: string;
  codeExample?: string;
  confidence?: number;
  feedback?: 'helpful' | 'not-helpful' | null;
}

interface LearningInsight {
  id: string;
  type: 'optimization' | 'explanation' | 'hint' | 'challenge';
  title: string;
  description: string;
  algorithm: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeToComplete: number;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface UserProgress {
  currentAlgorithm: string;
  skillLevel: number;
  completedConcepts: string[];
  strugglingAreas: string[];
  learningVelocity: number;
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
}

// NOTE: All mock data has been removed as we are connecting to a live backend.

// Chat Interface Component
const ChatInterface = ({ 
  messages, 
  onSendMessage, 
  isLoading 
}: { 
  messages: ChatMessage[]; 
  onSendMessage: (message: string) => void; 
  isLoading: boolean;
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className={`${
                    message.type === 'user' 
                      ? 'bg-cyan-500/20 text-cyan-400' 
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`rounded-2xl p-4 ${
                  message.type === 'user'
                    ? 'bg-cyan-500/20 border border-cyan-400/30 text-cyan-100'
                    : 'bg-white/5 border border-white/10 text-white'
                }`}>
                  <div className="prose prose-sm prose-invert max-w-none">
                    <p className="mb-2">{message.content}</p>
                    
                    {message.codeExample && (
                      <pre className="bg-black/30 rounded-lg p-3 text-sm overflow-x-auto">
                        <code>{message.codeExample}</code>
                      </pre>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 text-xs opacity-60">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.type === 'assistant' && message.confidence && (
                      <div className="flex items-center gap-2">
                        <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="p-1 h-auto">
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="p-1 h-auto">
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 justify-start"
          >
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-purple-500/20 text-purple-400">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="text-white/60 text-sm">AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-white/10 p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about algorithms, request explanations, or get coding help..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none min-h-[44px] max-h-32 pr-10"
              rows={1}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleVoiceInput}
              className={`absolute right-2 top-2 p-1 h-auto ${
                isListening ? 'text-red-400' : 'text-white/40 hover:text-white/60'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading}
            className="bg-purple-600 hover:bg-purple-700 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="ghost" className="text-xs text-white/60">
            Explain algorithm
          </Button>
          <Button size="sm" variant="ghost" className="text-xs text-white/60">
            Optimize code
          </Button>
          <Button size="sm" variant="ghost" className="text-xs text-white/60">
            Show complexity
          </Button>
        </div>
      </div>
    </div>
  );
};

// Learning Insights Component
const LearningInsights = ({ 
  insights, 
  userProgress 
}: { 
  insights: LearningInsight[]; 
  userProgress: UserProgress;
}) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization':
        return <Zap className="w-5 h-5" />;
      case 'explanation':
        return <BookOpen className="w-5 h-5" />;
      case 'hint':
        return <Lightbulb className="w-5 h-5" />;
      case 'challenge':
        return <Target className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'optimization':
        return 'from-orange-500 to-red-500';
      case 'explanation':
        return 'from-blue-500 to-cyan-500';
      case 'hint':
        return 'from-yellow-500 to-amber-500';
      case 'challenge':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-green-500 to-emerald-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'low':
        return 'text-green-400 bg-green-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-lg">Learning Progress</h3>
            <Badge className="bg-cyan-500/20 text-cyan-400">
              Level {userProgress.skillLevel}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{userProgress.completedConcepts.length}</div>
              <div className="text-white/60 text-sm">Concepts Mastered</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">{userProgress.strugglingAreas.length}</div>
              <div className="text-white/60 text-sm">Areas to Improve</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{userProgress.learningVelocity}%</div>
              <div className="text-white/60 text-sm">Learning Velocity</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Overall Progress</span>
              <span className="text-white/80">{Math.round((userProgress.skillLevel / 10) * 100)}%</span>
            </div>
            <Progress value={(userProgress.skillLevel / 10) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <MicroInteraction key={insight.id} type="card">
            <Card className={`bg-white/5 backdrop-blur-md border-white/10 ${
              insight.isCompleted ? 'opacity-60' : ''
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getInsightColor(insight.type)} flex items-center justify-center flex-shrink-0`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium text-base">{insight.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(insight.priority)} variant="secondary">
                          {insight.priority}
                        </Badge>
                        {insight.isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-3">{insight.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <Code2 className="w-4 h-4" />
                          {insight.algorithm}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {insight.timeToComplete} min
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {insight.difficulty}
                        </Badge>
                      </div>
                      
                      {!insight.isCompleted && (
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Start Learning
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MicroInteraction>
        ))}
      </div>
    </div>
  );
};

// Main AI Learning Assistant Component
export const AILearningAssistant: React.FC<{ currentAlgorithm?: string }> = ({ 
  currentAlgorithm = 'binary-search' 
}) => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm your AI learning assistant. I'm here to help you master algorithms with personalized explanations and guidance. I can see you're working on ${currentAlgorithm.replace('-', ' ')}. What would you like to learn about?`,
      timestamp: new Date(),
      confidence: 0.95
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentAlgorithm,
    skillLevel: 6,
    completedConcepts: ['arrays', 'basic-sorting', 'linear-search'],
    strugglingAreas: ['recursion', 'dynamic-programming'],
    learningVelocity: 78,
    preferredLearningStyle: 'visual'
  });
  const { session } = useAuth();

  const handleSendMessage = async (messageContent: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    // Assistant message placeholder
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      algorithm: currentAlgorithm,
    };
    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          messages: newMessages.slice(-10).map(m => ({ role: m.type, content: m.content })), // Send last 10 messages for context
          algorithm: currentAlgorithm,
          // TODO: Get code and step from relevant components
          code: '', 
          step: '',
        }),
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: msg.content + chunk }
            : msg
        ));
      }

    } catch (error) {
      console.error("Error streaming AI response:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, content: "Sorry, I encountered an error. Please try again." }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold">AI Learning Assistant</h2>
            <p className="text-white/70">Your intelligent companion for mastering algorithms</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white/5 backdrop-blur-md border border-white/10">
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <MessageCircle className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="flex items-center gap-2 data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
            >
              <Sparkles className="w-4 h-4" />
              Insights
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="flex items-center gap-2 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              <BarChart3 className="w-4 h-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-6">
            <Card className="bg-white/5 backdrop-blur-md border-white/10 h-[600px]">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <LearningInsights
              insights={mockInsights}
              userProgress={userProgress}
            />
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Detailed Progress Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 text-white/40 mx-auto mb-4" />
                  <h3 className="text-white text-lg font-semibold mb-2">Advanced Analytics Coming Soon</h3>
                  <p className="text-white/60">
                    Detailed learning analytics, performance metrics, and personalized recommendations will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AILearningAssistant;