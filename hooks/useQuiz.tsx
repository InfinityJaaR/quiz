'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { QuizQuestion, QuizContextType } from '@/lib/quiz-types';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
  questions: QuizQuestion[];
  children: React.ReactNode;
}

export function QuizProvider({ questions, children }: QuizProviderProps) {
  const [queue, setQueue] = useState<QuizQuestion[]>([...questions]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<Map<string, boolean>>(new Map());
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState('');

  const currentQuestion = useMemo(() => {
    return currentQuestionIndex < queue.length ? queue[currentQuestionIndex] : null;
  }, [queue, currentQuestionIndex]);

  const totalQuestions = useMemo(() => {
    return new Set(questions.map(q => q.id)).size;
  }, [questions]);

  const progressPercentage = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return Math.round((score / totalQuestions) * 100);
  }, [score, totalQuestions]);

  const answerQuestion = useCallback((answer: any) => {
    if (!currentQuestion || isAnswered) return;

    let correct = false;

    switch (currentQuestion.type) {
      case 'true-false': {
        correct = currentQuestion.correctAnswer === answer;
        break;
      }
      case 'single-choice': {
        correct = currentQuestion.correctAnswerId === answer;
        break;
      }
      case 'multiple-choice': {
        const selectedIds = Array.isArray(answer) ? answer : [answer];
        const correctIds = currentQuestion.correctAnswerIds.sort();
        correct =
          selectedIds.sort().join(',') === correctIds.join(',');
        break;
      }
      case 'fill-text': {
        correct =
          answer.trim().toLowerCase() ===
          currentQuestion.correctAnswer.toLowerCase();
        break;
      }
      case 'matching': {
        // answer es un objeto { pairId: selectedRightId }
        correct = currentQuestion.pairs.every((pair) => {
          return answer[pair.id] === pair.id;
        });
        break;
      }
    }

    setIsCorrect(correct);
    setFeedback(currentQuestion.technicalNote);
    setIsAnswered(true);

    if (correct) {
      setScore((prev) => {
        const uniqueCorrect = answered.get(currentQuestion.id) === true ? prev : prev + 1;
        return uniqueCorrect;
      });
      setAnswered((prev) => new Map(prev).set(currentQuestion.id, true));
    } else {
      // Agregar la pregunta incorrecta al final de la cola
      setQueue((prev) => {
        const newQueue = [...prev];
        newQueue.push(currentQuestion);
        return newQueue;
      });
    }
  }, [currentQuestion, isAnswered, answered]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < queue.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setIsCorrect(null);
      setFeedback('');
    } else {
      // Quiz completado
      setIsAnswered(false);
      setIsCorrect(null);
      setFeedback('');
    }
  }, [currentQuestionIndex, queue.length]);

  const resetQuiz = useCallback(() => {
    setQueue([...questions]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswered(new Map());
    setIsAnswered(false);
    setIsCorrect(null);
    setFeedback('');
  }, [questions]);

  const getStats = useCallback(() => {
    const correct = score;
    const incorrect = totalQuestions - correct;
    return { correct, incorrect, total: totalQuestions };
  }, [score, totalQuestions]);

  const value: QuizContextType = {
    questions: queue,
    currentQuestionIndex,
    currentQuestion,
    queue,
    score,
    totalQuestions,
    answered,
    isAnswered,
    isCorrect,
    feedback,
    progressPercentage,
    answerQuestion,
    resetQuiz,
    nextQuestion,
    getStats
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz(): QuizContextType {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz debe ser usado dentro de un QuizProvider');
  }
  return context;
}
