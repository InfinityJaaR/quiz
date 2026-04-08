'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FillTextQuestion } from '@/lib/quiz-types';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface FillTextQuestionProps {
  question: FillTextQuestion;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onAnswer: (answer: string) => void;
}

export default function FillTextQuestion({
  question,
  isAnswered,
  isCorrect,
  onAnswer,
}: FillTextQuestionProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onAnswer(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isAnswered) {
      handleSubmit();
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
        <Input
          type="text"
          placeholder="Escribe tu respuesta aquí..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isAnswered}
          className="bg-input text-foreground"
          autoFocus
        />

        {!isAnswered && (
          <Button onClick={handleSubmit} className="w-full">
            Enviar Respuesta
          </Button>
        )}
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
          {!isCorrect && (
            <p className="text-sm mb-2">
              Respuesta correcta: <span className="font-semibold">{question.correctAnswer}</span>
            </p>
          )}
          <p className="text-sm">{question.technicalNote}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
