
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PenTool, Eraser, Square, Circle, Type, Save, Download, Upload } from 'lucide-react';

export const WhiteboardMode: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string>('pen');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [explanation, setExplanation] = useState('');

  const questions = [
    'Two Sum Problem',
    'Binary Tree Traversal',
    'Merge Sort Algorithm',
    'Graph BFS/DFS',
    'Dynamic Programming - Fibonacci'
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Interactive Whiteboard</CardTitle>
          <p className="text-white/70 text-sm">
            Practice explaining algorithms visually. Draw diagrams, trace through examples, and articulate your thought process.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Select value={selectedQuestion} onValueChange={setSelectedQuestion}>
              <SelectTrigger className="w-64 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select a question to practice" />
              </SelectTrigger>
              <SelectContent>
                {questions.map((question, index) => (
                  <SelectItem key={index} value={question}>{question}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Button
                variant={selectedTool === 'pen' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTool('pen')}
                className={selectedTool === 'pen' ? 'bg-blue-600' : 'border-white/30 text-white hover:bg-white/10'}
              >
                <PenTool className="w-4 h-4" />
              </Button>
              <Button
                variant={selectedTool === 'eraser' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTool('eraser')}
                className={selectedTool === 'eraser' ? 'bg-blue-600' : 'border-white/30 text-white hover:bg-white/10'}
              >
                <Eraser className="w-4 h-4" />
              </Button>
              <Button
                variant={selectedTool === 'rectangle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTool('rectangle')}
                className={selectedTool === 'rectangle' ? 'bg-blue-600' : 'border-white/30 text-white hover:bg-white/10'}
              >
                <Square className="w-4 h-4" />
              </Button>
              <Button
                variant={selectedTool === 'circle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTool('circle')}
                className={selectedTool === 'circle' ? 'bg-blue-600' : 'border-white/30 text-white hover:bg-white/10'}
              >
                <Circle className="w-4 h-4" />
              </Button>
              <Button
                variant={selectedTool === 'text' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTool('text')}
                className={selectedTool === 'text' ? 'bg-blue-600' : 'border-white/30 text-white hover:bg-white/10'}
              >
                <Type className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Upload className="w-4 h-4 mr-2" />
                Load
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Drawing Canvas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg aspect-video flex items-center justify-center">
                <div className="text-gray-500 text-center">
                  <PenTool className="w-12 h-12 mx-auto mb-4" />
                  <p>Interactive whiteboard canvas</p>
                  <p className="text-sm">Start drawing to visualize your algorithm</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Problem Statement</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedQuestion ? (
                <div className="space-y-3">
                  <h3 className="text-white font-semibold">{selectedQuestion}</h3>
                  <div className="text-white/80 text-sm space-y-2">
                    {selectedQuestion === 'Two Sum Problem' && (
                      <div>
                        <p><strong>Problem:</strong> Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.</p>
                        <p><strong>Example:</strong> nums = [2,7,11,15], target = 9</p>
                        <p><strong>Output:</strong> [0,1] (because nums[0] + nums[1] = 2 + 7 = 9)</p>
                      </div>
                    )}
                    {selectedQuestion === 'Binary Tree Traversal' && (
                      <div>
                        <p><strong>Problem:</strong> Implement inorder, preorder, and postorder traversal of a binary tree.</p>
                        <p><strong>Focus:</strong> Explain the differences and when to use each approach.</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-white/70">Select a question to see the problem statement</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Explanation Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Write your explanation here... Describe your approach, time/space complexity, and key insights."
                className="min-h-[150px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Whiteboard Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <h4 className="text-white font-semibold mb-2">📝 Structure Your Explanation</h4>
              <p className="text-white/80">Start with understanding the problem, then outline your approach before diving into implementation.</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <h4 className="text-white font-semibold mb-2">🎨 Use Visual Elements</h4>
              <p className="text-white/80">Draw arrays, trees, and graphs. Use colors and annotations to make your explanation clear.</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <h4 className="text-white font-semibold mb-2">🗣️ Think Out Loud</h4>
              <p className="text-white/80">Practice explaining your thought process. This is crucial for real interviews.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
