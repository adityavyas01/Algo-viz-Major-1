import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ExternalLink, ChevronDown, ChevronRight, Clock, Zap, Lightbulb, Hash } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LeetCodeQuestion {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  difficulty_level: number;
  leetcode_url: string;
  problem_number?: number;
  description?: string;
  solution?: string;
  hints?: string[];
  time_complexity?: string;
  space_complexity?: string;
  tags?: string[];
}

interface LeetCodeQuestionsProps {
  topicId: string;
  topicName: string;
}

export const LeetCodeQuestions: React.FC<LeetCodeQuestionsProps> = ({ topicId, topicName }) => {
  const [questions, setQuestions] = useState<LeetCodeQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchQuestions();
  }, [topicId]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leetcode_questions')
        .select('*')
        .eq('topic_id', topicId)
        .order('difficulty_level', { ascending: true });

      if (error) throw error;
      setQuestions(data as LeetCodeQuestion[] || []);
    } catch (error) {
      console.error('Error fetching LeetCode questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Loading LeetCode Questions...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Hash className="w-5 h-5" />
            LeetCode Questions - {topicName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">No LeetCode questions available for this topic yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Hash className="w-5 h-5" />
          LeetCode Questions - {topicName}
        </CardTitle>
        <p className="text-white/70 text-sm">
          Practice with {questions.length} hand-picked problems sorted by difficulty
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((question) => (
          <Collapsible 
            key={question.id}
            open={expandedQuestions.has(question.id)}
            onOpenChange={() => toggleQuestion(question.id)}
          >
            <Card className="bg-white/5 border-white/10">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {expandedQuestions.has(question.id) ? (
                        <ChevronDown className="w-4 h-4 text-white/70" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white/70" />
                      )}
                      <div className="flex items-center gap-2">
                        {question.problem_number && (
                          <span className="text-white/50 text-sm">#{question.problem_number}</span>
                        )}
                        <h3 className="text-white font-medium">{question.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`${getDifficultyColor(question.difficulty)} text-white border-none`}
                      >
                        {question.difficulty}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(question.leetcode_url, '_blank');
                        }}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Solve
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  {question.description && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Problem Description</h4>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {question.description}
                      </p>
                    </div>
                  )}

                  {question.hints && question.hints.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Hints
                      </h4>
                      <ul className="space-y-1">
                        {question.hints.map((hint, index) => (
                          <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                            {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.time_complexity && (
                      <div>
                        <h4 className="text-white font-medium mb-1 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Time Complexity
                        </h4>
                        <code className="text-green-400 text-sm bg-black/30 px-2 py-1 rounded">
                          {question.time_complexity}
                        </code>
                      </div>
                    )}

                    {question.space_complexity && (
                      <div>
                        <h4 className="text-white font-medium mb-1 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Space Complexity
                        </h4>
                        <code className="text-green-400 text-sm bg-black/30 px-2 py-1 rounded">
                          {question.space_complexity}
                        </code>
                      </div>
                    )}
                  </div>

                  {question.tags && question.tags.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {question.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-white/30 text-white/80">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {question.solution && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Solution Approach</h4>
                      <div className="bg-black/30 p-3 rounded-lg">
                        <p className="text-white/80 text-sm leading-relaxed">
                          {question.solution}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};