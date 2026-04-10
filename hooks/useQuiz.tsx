'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { QuizQuestion, QuizContextType, QuizSaveState, QuizMode } from '@/lib/quiz-types';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
  questions: QuizQuestion[];
  reps: number;
  mode: QuizMode;
  children: React.ReactNode;
}

function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function shuffleOptions(question: QuizQuestion): QuizQuestion {
  if (question.type === 'single-choice' || question.type === 'multiple-choice') {
    return { ...question, options: shuffleArray(question.options) };
  }
  if (question.type === 'matching') {
    return { ...question, pairs: shuffleArray(question.pairs) };
  }
  return question;
}

function insertWithGap(
  currentQueue: QuizQuestion[],
  currentIndex: number,
  question: QuizQuestion
): QuizQuestion[] {
  const newQueue = [...currentQueue];
  const minPos = Math.min(currentIndex + 4, newQueue.length);
  const maxPos = newQueue.length;
  const insertPos =
    minPos >= maxPos
      ? maxPos
      : Math.floor(Math.random() * (maxPos - minPos + 1)) + minPos;
  newQueue.splice(insertPos, 0, question);
  return newQueue;
}

export function QuizProvider({ questions, reps, mode, children }: QuizProviderProps) {
  const [originalQuestions] = useState<QuizQuestion[]>(questions);
  const [currentReps] = useState<number>(reps);
  const [currentMode] = useState<QuizMode>(mode);

  const [queue, setQueue] = useState<QuizQuestion[]>(() =>
    shuffleArray(questions).map(shuffleOptions)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState<Map<string, number>>(new Map());
  const [answered, setAnswered] = useState<Map<string, boolean>>(new Map());
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState('');

  const totalQuestions = useMemo(() => originalQuestions.length, [originalQuestions]);
  const totalGoal = useMemo(() => originalQuestions.length * currentReps, [originalQuestions, currentReps]);

  const completedCount = useMemo(() => {
    let sum = 0;
    for (const v of correctCount.values()) {
      sum += Math.min(v, currentReps);
    }
    return sum;
  }, [correctCount, currentReps]);

  const score = useMemo(() => {
    let done = 0;
    for (const v of correctCount.values()) {
      if (v >= currentReps) done++;
    }
    return done;
  }, [correctCount, currentReps]);

  const progressPercentage = useMemo(() => {
    if (currentMode === 'exam') {
      if (queue.length === 0) return 0;
      return Math.round((currentQuestionIndex / queue.length) * 100);
    }
    if (totalGoal === 0) return 0;
    return Math.round((completedCount / totalGoal) * 100);
  }, [currentMode, completedCount, totalGoal, currentQuestionIndex, queue.length]);

  const currentQuestion = useMemo(() => {
    return currentQuestionIndex < queue.length ? queue[currentQuestionIndex] : null;
  }, [queue, currentQuestionIndex]);

  const answerQuestion = useCallback(
    (answer: any) => {
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
          const correctIds = [...currentQuestion.correctAnswerIds].sort();
          correct = [...selectedIds].sort().join(',') === correctIds.join(',');
          break;
        }
        case 'fill-text': {
          correct =
            answer.trim().toLowerCase() ===
            currentQuestion.correctAnswer.toLowerCase();
          break;
        }
        case 'matching': {
          correct = currentQuestion.pairs.every((pair) => answer[pair.id] === pair.id);
          break;
        }
      }

      setIsCorrect(correct);
      setFeedback(currentQuestion.technicalNote);
      setIsAnswered(true);

      const id = currentQuestion.id;

      if (currentMode === 'exam') {
        setAnswered((prev) => new Map(prev).set(id, correct));
        if (correct) {
          setCorrectCount((prev) => {
            const next = new Map(prev);
            next.set(id, (prev.get(id) ?? 0) + 1);
            return next;
          });
        }
        return;
      }

      // Modo estudio
      if (correct) {
        setCorrectCount((prev) => {
          const newCount = (prev.get(id) ?? 0) + 1;
          const next = new Map(prev);
          next.set(id, newCount);
          return next;
        });
        setAnswered((prev) => new Map(prev).set(id, true));

        const currentCount = correctCount.get(id) ?? 0;
        const newCount = currentCount + 1;
        if (newCount < currentReps) {
          setQueue((prev) =>
            insertWithGap(prev, currentQuestionIndex, shuffleOptions(currentQuestion))
          );
        }
      } else {
        setAnswered((prev) => new Map(prev).set(id, false));
        setQueue((prev) =>
          insertWithGap(prev, currentQuestionIndex, shuffleOptions(currentQuestion))
        );
      }
    },
    [currentQuestion, isAnswered, correctCount, currentQuestionIndex, currentMode, currentReps]
  );

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setIsAnswered(false);
    setIsCorrect(null);
    setFeedback('');
  }, []);

  const resetQuiz = useCallback(() => {
    setQueue(shuffleArray(originalQuestions).map(shuffleOptions));
    setCurrentQuestionIndex(0);
    setCorrectCount(new Map());
    setAnswered(new Map());
    setIsAnswered(false);
    setIsCorrect(null);
    setFeedback('');
  }, [originalQuestions]);

  const getStats = useCallback(() => {
    if (currentMode === 'exam') {
      let examCorrect = 0;
      answered.forEach((v) => { if (v) examCorrect++; });
      return {
        correct: examCorrect,
        incorrect: totalQuestions - examCorrect,
        total: totalQuestions,
      };
    }
    return {
      correct: score,
      incorrect: totalQuestions - score,
      total: totalQuestions,
    };
  }, [score, totalQuestions, currentMode, answered]);

  const saveProgress = useCallback(() => {
    const remaining = queue.slice(currentQuestionIndex);
    const countRecord: Record<string, number> = {};
    correctCount.forEach((v, k) => {
      countRecord[k] = v;
    });

    const state: QuizSaveState = {
      version: 1,
      savedAt: new Date().toISOString(),
      originalQuestions,
      queue: remaining,
      correctCount: countRecord,
      mode: currentMode,
      reps: currentReps,
    };

    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'progreso-quiz.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [queue, currentQuestionIndex, correctCount, originalQuestions, currentMode, currentReps]);

  const loadProgress = useCallback(async (file: File) => {
    const text = await file.text();
    const state: QuizSaveState = JSON.parse(text);

    if (state.version !== 1) {
      throw new Error('Formato de archivo de progreso no compatible');
    }

    const restoredCount = new Map<string, number>(
      Object.entries(state.correctCount)
    );

    setQueue(state.queue);
    setCurrentQuestionIndex(0);
    setCorrectCount(restoredCount);
    setAnswered(new Map());
    setIsAnswered(false);
    setIsCorrect(null);
    setFeedback('');
  }, []);

  const value: QuizContextType = {
    questions: queue,
    currentQuestionIndex,
    currentQuestion,
    queue,
    score,
    totalQuestions,
    totalGoal,
    completedCount,
    correctCount,
    answered,
    isAnswered,
    isCorrect,
    feedback,
    progressPercentage,
    mode: currentMode,
    reps: currentReps,
    answerQuestion,
    resetQuiz,
    nextQuestion,
    getStats,
    saveProgress,
    loadProgress,
  };

  return (
    <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
  );
}

export function useQuiz(): QuizContextType {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz debe ser usado dentro de un QuizProvider');
  }
  return context;
}
