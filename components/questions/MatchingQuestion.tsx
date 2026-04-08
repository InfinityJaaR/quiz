'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MatchingQuestion } from '@/lib/quiz-types';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface MatchingQuestionProps {
  question: MatchingQuestion;
  isAnswered: boolean;
  isCorrect: boolean | null;
  onAnswer: (answer: Record<string, string>) => void;
}

export default function MatchingQuestion({
  question,
  isAnswered,
  isCorrect,
  onAnswer,
}: MatchingQuestionProps) {
  const [matches, setMatches] = useState<Record<string, string>>({});

  const handleMatch = (pairId: string, rightId: string) => {
    if (!isAnswered) {
      setMatches((prev) => ({
        ...prev,
        [pairId]: rightId,
      }));
    }
  };

  const handleSubmit = () => {
    if (Object.keys(matches).length === question.pairs.length) {
      onAnswer(matches);
    }
  };

  const allMatched = Object.keys(matches).length === question.pairs.length;

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

      <div className="space-y-4">
        {question.pairs.map((pair, index) => (
          <motion.div
            key={pair.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="flex-1 p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">{pair.left}</p>
            </div>

            <div className="text-muted-foreground">→</div>

            <div className="flex-1">
              <Select
                value={matches[pair.id] || ''}
                onValueChange={(value) => handleMatch(pair.id, value)}
                disabled={isAnswered}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={pair.id} key={pair.id}>
                    {pair.right}
                  </SelectItem>
                  {question.pairs
                    .filter((p) => p.id !== pair.id)
                    .map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.right}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        ))}
      </div>

      {!isAnswered && (
        <Button
          onClick={handleSubmit}
          disabled={!allMatched}
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
