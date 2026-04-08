'use client';

import { Button } from '@/components/ui/button';
import {
  TrueFalseQuestion,
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
  FillTextQuestion,
  MatchingQuestion,
  QuizQuestion,
} from '@/lib/quiz-types';
import TrueFalseQuestionComponent from './questions/TrueFalseQuestion';
import SingleChoiceQuestionComponent from './questions/SingleChoiceQuestion';
import MultipleChoiceQuestionComponent from './questions/MultipleChoiceQuestion';
import FillTextQuestionComponent from './questions/FillTextQuestion';
import MatchingQuestionComponent from './questions/MatchingQuestion';

interface QuestionFactoryProps {
  question: QuizQuestion;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onAnswer: (answer: any) => void;
}

export default function QuestionFactory({
  question,
  isAnswered,
  isCorrect,
  onAnswer,
}: QuestionFactoryProps) {
  switch (question.type) {
    case 'true-false':
      return (
        <TrueFalseQuestionComponent
          question={question as TrueFalseQuestion}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          onAnswer={onAnswer}
        />
      );
    case 'single-choice':
      return (
        <SingleChoiceQuestionComponent
          question={question as SingleChoiceQuestion}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          onAnswer={onAnswer}
        />
      );
    case 'multiple-choice':
      return (
        <MultipleChoiceQuestionComponent
          question={question as MultipleChoiceQuestion}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          onAnswer={onAnswer}
        />
      );
    case 'fill-text':
      return (
        <FillTextQuestionComponent
          question={question as FillTextQuestion}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          onAnswer={onAnswer}
        />
      );
    case 'matching':
      return (
        <MatchingQuestionComponent
          question={question as MatchingQuestion}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          onAnswer={onAnswer}
        />
      );
    default:
      return <div>Tipo de pregunta no soportado</div>;
  }
}
