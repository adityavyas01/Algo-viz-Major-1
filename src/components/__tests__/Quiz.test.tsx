// src/components/__tests__/Quiz.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Quiz } from '@/components/Quiz';

const mockQuestions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5"],
    correctAnswer: "4",
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris"],
    correctAnswer: "Paris",
  },
];

describe('Quiz', () => {
  it('renders the first question and its options', () => {
    render(<Quiz questions={mockQuestions} algorithmId="algo-1" onQuizComplete={() => {}} />);

    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('What is the capital of France?')).not.toBeInTheDocument();
  });

  it('navigates between questions and submits the quiz', () => {
    const onQuizComplete = vi.fn();
    render(<Quiz questions={mockQuestions} algorithmId="algo-1" onQuizComplete={onQuizComplete} />);

    // --- Question 1 ---
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    // Answer Q1 correctly
    fireEvent.click(screen.getByRole('radio', { name: '4' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next Question' }));

    // --- Question 2 ---
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    // Answer Q2 correctly
    fireEvent.click(screen.getByRole('radio', { name: 'Paris' }));
    
    // The button should now be for submitting
    fireEvent.click(screen.getByRole('button', { name: 'Submit Answers' }));

    // 2 out of 2 correct = 100%
    expect(onQuizComplete).toHaveBeenCalledWith(100, 2, 2);
  });

  it('calculates partial scores correctly', () => {
    const onQuizComplete = vi.fn();
    render(<Quiz questions={mockQuestions} algorithmId="algo-1" onQuizComplete={onQuizComplete} />);

    // --- Question 1 ---
    // Answer Q1 correctly
    fireEvent.click(screen.getByRole('radio', { name: '4' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next Question' }));

    // --- Question 2 ---
    // Answer Q2 incorrectly
    fireEvent.click(screen.getByRole('radio', { name: 'Berlin' }));
    fireEvent.click(screen.getByRole('button', { name: 'Submit Answers' }));

    // 1 out of 2 correct = 50%
    expect(onQuizComplete).toHaveBeenCalledWith(50, 1, 2);
  });
});
