'use client';

import { Button } from '@/components/ui/button';
import { SingleChoiceQuestion } from '@/lib/quiz-types';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestion;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onAnswer: (answerId: string) => void;
}

export default function SingleChoiceQuestion({
  question,
  isAnswered,
  isCorrect,
  onAnswer,
}: SingleChoiceQuestionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    if (!isAnswered) {
      setSelectedId(optionId);
      onAnswer(optionId);
    }
  };

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

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!isAnswered ? { x: 5 } : {}}
          >
            <Button
              onClick={() => handleSelect(option.id)}
              disabled={isAnswered}
              variant="outline"
              className={`w-full justify-start text-left h-auto py-3 px-4 transition-colors ${
                selectedId === option.id
                  ? option.id === question.correctAnswerId
                    ? 'bg-green-600 border-green-600 text-white hover:bg-green-700'
                    : isAnswered
                    ? 'bg-red-600 border-red-600 text-white hover:bg-red-700'
                    : 'bg-primary border-primary text-primary-foreground'
                  : isAnswered && option.id === question.correctAnswerId
                  ? 'bg-green-600 border-green-600 text-white'
                  : ''
              }`}
            >
              {option.text}
            </Button>
          </motion.div>
        ))}
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
