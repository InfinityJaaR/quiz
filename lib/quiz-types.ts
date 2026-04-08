// Quiz Question Types
export type QuestionType = 
  | 'true-false' 
  | 'single-choice' 
  | 'multiple-choice' 
  | 'fill-text' 
  | 'matching';

export interface Option {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface TrueFalseQuestion {
  id: string;
  type: 'true-false';
  question: string;
  correctAnswer: boolean;
  technicalNote: string;
}

export interface SingleChoiceQuestion {
  id: string;
  type: 'single-choice';
  question: string;
  options: Option[];
  correctAnswerId: string;
  technicalNote: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  question: string;
  options: Option[];
  correctAnswerIds: string[];
  technicalNote: string;
}

export interface FillTextQuestion {
  id: string;
  type: 'fill-text';
  question: string;
  correctAnswer: string;
  technicalNote: string;
}

export interface MatchingQuestion {
  id: string;
  type: 'matching';
  question: string;
  pairs: MatchingPair[];
  technicalNote: string;
}

export type QuizQuestion = 
  | TrueFalseQuestion 
  | SingleChoiceQuestion 
  | MultipleChoiceQuestion 
  | FillTextQuestion 
  | MatchingQuestion;

export interface QuizSaveState {
  version: 1;
  savedAt: string;
  originalQuestions: QuizQuestion[];
  queue: QuizQuestion[];
  correctCount: Record<string, number>;
}

export interface QuizContextType {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  currentQuestion: QuizQuestion | null;
  queue: QuizQuestion[];
  score: number;
  totalQuestions: number;
  totalGoal: number;
  completedCount: number;
  correctCount: Map<string, number>;
  answered: Map<string, boolean>;
  isAnswered: boolean;
  isCorrect: boolean | null;
  feedback: string;
  progressPercentage: number;
  answerQuestion: (answer: any) => void;
  resetQuiz: () => void;
  nextQuestion: () => void;
  getStats: () => { correct: number; incorrect: number; total: number };
  saveProgress: () => void;
  loadProgress: (file: File) => Promise<void>;
}
