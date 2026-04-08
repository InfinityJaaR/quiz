/**
 * Utilidades para estadísticas avanzadas del Quiz
 */

import type { QuizContextType } from '@/lib/quiz-types';

export interface DetailedStats {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  successRate: number;
  averageAttemptsPerQuestion: number;
  questionsNeedingReview: number;
  timeSpent?: string; // Puede ser agregado más adelante
}

/**
 * Calcula estadísticas detalladas del quiz
 */
export function getDetailedStats(
  quiz: QuizContextType
): DetailedStats {
  const stats = quiz.getStats();
  const totalAttempts = quiz.queue.length;
  const uniqueQuestions = quiz.totalQuestions;

  return {
    totalQuestions: uniqueQuestions,
    correctAnswers: stats.correct,
    incorrectAnswers: stats.incorrect,
    successRate: uniqueQuestions > 0
      ? Math.round((stats.correct / uniqueQuestions) * 100)
      : 0,
    averageAttemptsPerQuestion:
      uniqueQuestions > 0
        ? Math.round((totalAttempts / uniqueQuestions) * 10) / 10
        : 0,
    questionsNeedingReview: quiz.queue.length - quiz.currentQuestionIndex,
  };
}

/**
 * Genera un comentario basado en el desempeño
 */
export function getPerformanceFeedback(successRate: number): string {
  if (successRate === 100) {
    return '¡Perfecto! Has dominado completamente este tema.';
  } else if (successRate >= 90) {
    return '¡Excelente! Tienes un dominio muy sólido del tema.';
  } else if (successRate >= 80) {
    return '¡Muy bien! Tienes un buen conocimiento del tema.';
  } else if (successRate >= 70) {
    return 'Buen trabajo. Considera revisar los conceptos menos claros.';
  } else if (successRate >= 60) {
    return 'Está bien empezar. Te recomendamos estudiar más este tema.';
  } else {
    return 'Necesitas repasar este tema más a fondo. ¡Vuelve a intentarlo!';
  }
}

/**
 * Calcula un nivel de dominio basado en desempeño
 */
export function getMasteryLevel(successRate: number): string {
  if (successRate === 100) return 'Maestría Completa';
  if (successRate >= 90) return 'Avanzado';
  if (successRate >= 80) return 'Competente';
  if (successRate >= 70) return 'Intermedio';
  if (successRate >= 60) return 'Básico';
  return 'Principiante';
}

/**
 * Genera un resumen de áreas para mejorar
 */
export function getAreasForImprovement(
  currentQuestionIndex: number,
  queueLength: number
): string {
  const remaining = queueLength - currentQuestionIndex;
  if (remaining === 0) return 'No hay preguntas pendientes';
  if (remaining === 1) return 'Una pregunta por revisar';
  return `${remaining} preguntas por revisar`;
}

/**
 * Exporta datos del quiz como JSON
 */
export function exportQuizResults(quiz: QuizContextType): string {
  const stats = getDetailedStats(quiz);
  const results = {
    timestamp: new Date().toISOString(),
    stats,
    feedback: getPerformanceFeedback(stats.successRate),
    masteryLevel: getMasteryLevel(stats.successRate),
    questionsAnswered: Array.from(quiz.answered.entries()).map(([id, correct]) => ({
      questionId: id,
      correct,
    })),
  };
  return JSON.stringify(results, null, 2);
}

/**
 * Descarga los resultados como archivo JSON
 */
export function downloadQuizResults(quiz: QuizContextType, filename = 'quiz-results.json'): void {
  const data = exportQuizResults(quiz);
  const blob = new Blob([data], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.URL.revokeObjectURL(url);
}
