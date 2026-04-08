'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MultipleChoiceQuestion } from '@/lib/quiz-types';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestion;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onAnswer: (answerIds: string[]) => void;
}

export default function MultipleChoiceQuestion({
  question,
  isAnswered,
  isCorrect,
  onAnswer,
}: MultipleChoiceQuestionProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (optionId: string) => {
    if (!isAnswered) {
      const newSelected = selectedIds.includes(optionId)
        ? selectedIds.filter((id) => id !== optionId)
        : [...selectedIds, optionId];
      setSelectedIds(newSelected);
    }
  };

  const handleSubmit = () => {
    onAnswer(selectedIds);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <p className="text-lg font-medium text-foreground mb-2">
          {question.question}
        </p>
        <p className="text-sm text-muted-foreground">
          (Selecciona todas las opciones correctas)
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedIds.includes(option.id);
          const isCorrectOption = question.correctAnswerIds.includes(option.id);

          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                isAnswered && isSelected
                  ? isCorrectOption
                    ? 'bg-green-900/30 border border-green-600'
                    : 'bg-red-900/30 border border-red-600'
                  : isAnswered && isCorrectOption
                  ? 'bg-green-900/30 border border-green-600'
                  : 'hover:bg-muted'
              }`}
              onClick={() => handleToggle(option.id)}
            >
              <Checkbox
                checked={isSelected}
                disabled={isAnswered}
                className="cursor-pointer"
              />
              <span className="flex-1 text-sm">{option.text}</span>
            </motion.div>
          );
        })}
      </div>

      {!isAnswered && (
        <Button
          onClick={handleSubmit}
          disabled={selectedIds.length === 0}
          className="w-full"
        >
          Enviar Respuesta
        </Button>
      )}

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
