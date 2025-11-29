import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  algorithmId: string;
  onQuizComplete: (score: number, correct: number, total: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    for (let i = 0; i < questions.length; i++) {
      if (selectedAnswers[i] === questions[i].correctAnswer) {
        correctCount++;
      }
    }
    const score = Math.round((correctCount / questions.length) * 100);
    onQuizComplete(score, correctCount, questions.length);
    setIsFinished(true);
  };

  if (isFinished) {
    return null; // The parent component will show the results
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz: Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-medium">{currentQuestion.question}</p>
        <RadioGroup value={selectedAnswers[currentQuestionIndex]} onValueChange={handleSelectAnswer}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex]}>
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Answers'}
        </Button>
      </CardContent>
    </Card>
  );
};
