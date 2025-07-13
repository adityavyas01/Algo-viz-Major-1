
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Clock, Building, TrendingUp } from 'lucide-react';
import { InterviewQuestion } from '@/types/interview';

const sampleQuestions: InterviewQuestion[] = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    category: 'Array',
    companies: ['Google', 'Amazon', 'Facebook', 'Apple'],
    frequency: 95,
    timeLimit: 15,
    hints: [
      'Think about using a hash map to store complements',
      'What would be the time complexity of a brute force approach?'
    ],
    solution: {
      approach: 'Use a hash map to store the complement of each number as we iterate through the array.',
      code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    tags: ['hash-map', 'arrays', 'fundamentals']
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    difficulty: 'Easy',
    category: 'String',
    companies: ['Microsoft', 'Amazon', 'Google'],
    frequency: 88,
    timeLimit: 20,
    hints: [
      'Use a stack data structure',
      'Think about what makes parentheses valid'
    ],
    solution: {
      approach: 'Use a stack to keep track of opening brackets and match them with closing brackets.',
      code: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    tags: ['stack', 'string-processing']
  }
];

export const QuestionDatabase: React.FC = () => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>(sampleQuestions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion | null>(null);

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (selectedQuestion) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            onClick={() => setSelectedQuestion(null)}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            ← Back to Questions
          </Button>
          <Badge className={`${getDifficultyColor(selectedQuestion.difficulty)} text-white`}>
            {selectedQuestion.difficulty}
          </Badge>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">{selectedQuestion.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline" className="border-blue-400 text-blue-400">
                {selectedQuestion.category}
              </Badge>
              <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                <Clock className="w-3 h-3 mr-1" />
                {selectedQuestion.timeLimit} min
              </Badge>
              <Badge variant="outline" className="border-green-400 text-green-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                {selectedQuestion.frequency}% frequency
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-2">Problem Description</h3>
              <p className="text-white/80">{selectedQuestion.description}</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Companies</h3>
              <div className="flex flex-wrap gap-2">
                {selectedQuestion.companies.map((company, index) => (
                  <Badge key={index} variant="outline" className="border-purple-400 text-purple-400">
                    <Building className="w-3 h-3 mr-1" />
                    {company}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Hints</h3>
              <div className="space-y-2">
                {selectedQuestion.hints.map((hint, index) => (
                  <div key={index} className="bg-blue-500/20 p-3 rounded-lg">
                    <p className="text-white/80">💡 {hint}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-2">Solution</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white/90 font-medium mb-1">Approach</h4>
                  <p className="text-white/80">{selectedQuestion.solution.approach}</p>
                </div>
                
                <div>
                  <h4 className="text-white/90 font-medium mb-1">Implementation</h4>
                  <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                    <code className="text-green-400 text-sm">
                      {selectedQuestion.solution.code}
                    </code>
                  </pre>
                </div>

                <div className="flex gap-4">
                  <div>
                    <span className="text-white/70">Time:</span>
                    <span className="text-cyan-400 ml-2">{selectedQuestion.solution.timeComplexity}</span>
                  </div>
                  <div>
                    <span className="text-white/70">Space:</span>
                    <span className="text-cyan-400 ml-2">{selectedQuestion.solution.spaceComplexity}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
          <Input
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Array">Array</SelectItem>
            <SelectItem value="String">String</SelectItem>
            <SelectItem value="Tree">Tree</SelectItem>
            <SelectItem value="Graph">Graph</SelectItem>
            <SelectItem value="Dynamic Programming">DP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredQuestions.map((question) => (
          <Card 
            key={question.id}
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
            onClick={() => setSelectedQuestion(question)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-semibold text-lg">{question.title}</h3>
                <Badge className={`${getDifficultyColor(question.difficulty)} text-white`}>
                  {question.difficulty}
                </Badge>
              </div>
              
              <p className="text-white/80 mb-4 line-clamp-2">{question.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{question.timeLimit} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{question.frequency}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>{question.companies.length} companies</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
