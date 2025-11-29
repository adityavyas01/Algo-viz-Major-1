import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuizResultProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  onRetry: () => void;
  hasCertificate: boolean;
  certificateKey?: string;
}

export const QuizResult: React.FC<QuizResultProps> = ({ score, correctAnswers, totalQuestions, onRetry, hasCertificate, certificateKey }) => {
  const isPassed = score >= 80;

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-lg">Your Score:</p>
          <p className={`text-5xl font-bold ${isPassed ? 'text-green-500' : 'text-red-500'}`}>{score}%</p>
          <Progress value={score} className="mt-2" />
        </div>
        <div className="flex justify-around text-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            <span>{correctAnswers} Correct</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="text-red-500" />
            <span>{totalQuestions - correctAnswers} Incorrect</span>
          </div>
        </div>
        {isPassed ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-400">
              <Award />
              <p className="text-xl">Congratulations! You've passed the quiz.</p>
            </div>
            {hasCertificate && certificateKey && (
              <Button asChild>
                <Link to={`/verify/${certificateKey}`}>View Your Certificate</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg">You need a score of 80% or higher to pass.</p>
            <Button onClick={onRetry}>Try Again</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
