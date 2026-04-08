'use client';

import { Button } from '@/components/ui/button';
import { TrueFalseQuestion } from '@/lib/quiz-types';
import { motion } from 'framer-motion';

interface TrueFalseQuestionProps {
  question: TrueFalseQuestion;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onAnswer: (answer: boolean) => void;
}

export default function TrueFalseQuestion({
  question,
  isAnswered,
  isCorrect,
  onAnswer,
}: TrueFalseQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <p className="text-lg font-medium text-foreground">
        {question.question}
      </p>

      <div className="flex gap-4">
        <motion.div
          whileHover={!isAnswered ? { scale: 1.05 } : {}}
          whileTap={!isAnswered ? { scale: 0.95 } : {}}
        >
          <Button
            onClick={() => onAnswer(true)}
            disabled={isAnswered}
            variant={isAnswered && question.correctAnswer === true ? 'default' : 'outline'}
            className={`min-w-32 ${
              isAnswered && question.correctAnswer === true
                ? 'bg-green-600 hover:bg-green-700'
                : ''
            }`}
          >
            Verdadero
          </Button>
        </motion.div>

        <motion.div
          whileHover={!isAnswered ? { scale: 1.05 } : {}}
          whileTap={!isAnswered ? { scale: 0.95 } : {}}
        >
          <Button
            onClick={() => onAnswer(false)}
            disabled={isAnswered}
            variant={isAnswered && question.correctAnswer === false ? 'default' : 'outline'}
            className={`min-w-32 ${
              isAnswered && question.correctAnswer === false
                ? 'bg-green-600 hover:bg-green-700'
                : ''
            }`}
          >
            Falso
          </Button>
        </motion.div>
      </div>

      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className={`p-4 rounded-lg ${
            isCorrect
              ? 'bg-green-900/30 border border-green-600 text-green-300'
              : 'bg-red-900/30 border border-red-600 text-red-300'
          }`}
        >
          <p className="font-semibold mb-2">
            {isCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto'}
          </p>
          <p className="text-sm">{question.technicalNote}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
