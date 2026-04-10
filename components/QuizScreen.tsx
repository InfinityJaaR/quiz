'use client';

import { useRef } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import QuestionFactory from '@/components/QuestionFactory';
import { motion } from 'framer-motion';
import { RotateCw, Save, Upload, ArrowLeft } from 'lucide-react';
import {
  getPerformanceFeedback,
  getMasteryLevel,
} from '@/lib/quiz-stats';

interface QuizScreenProps {
  onExit: () => void;
}

export default function QuizScreen({ onExit }: QuizScreenProps) {
  const {
    currentQuestion,
    currentQuestionIndex,
    queue,
    score,
    totalQuestions,
    totalGoal,
    completedCount,
    isAnswered,
    isCorrect,
    feedback,
    progressPercentage,
    answerQuestion,
    nextQuestion,
    resetQuiz,
    getStats,
    answered,
    saveProgress,
    loadProgress,
    mode,
    reps,
  } = useQuiz();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isStudyCompleted = mode === 'study' && completedCount >= totalGoal && totalGoal > 0;
  const isExamCompleted = mode === 'exam' && currentQuestionIndex >= queue.length && queue.length > 0;
  const isCompleted = isStudyCompleted || isExamCompleted;

  const stats = getStats();
  const examSuccessRate = totalQuestions > 0
    ? Math.round((stats.correct / totalQuestions) * 100)
    : 0;
  const studySuccessRate = totalQuestions > 0
    ? Math.round((score / totalQuestions) * 100)
    : 0;

  const performanceFeedback = getPerformanceFeedback(
    mode === 'exam' ? examSuccessRate : studySuccessRate
  );
  const masteryLevel = getMasteryLevel(
    mode === 'exam' ? examSuccessRate : studySuccessRate
  );

  const handleLoadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await loadProgress(file);
    } catch {
      alert('El archivo de progreso no es válido o está dañado.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  /* ── Pantalla de resultados ── */
  if (isCompleted) {
    if (mode === 'exam') {
      const grade = totalQuestions > 0
        ? ((stats.correct / totalQuestions) * 5).toFixed(1)
        : '0.0';

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl mx-auto"
        >
          <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-border">
            <div className="text-center space-y-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
              >
                Simulacro Finalizado
              </motion.div>

              {/* Calificación destacada */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-8 bg-gradient-to-br from-orange-900/30 to-red-900/20 border border-orange-600 rounded-2xl"
              >
                <p className="text-sm text-orange-300 mb-2 uppercase tracking-widest">Calificación</p>
                <p className="text-7xl font-black text-orange-400">
                  {examSuccessRate}%
                </p>
                <p className="text-2xl font-semibold text-orange-300 mt-2">
                  {stats.correct} / {stats.total} correctas
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Nota: {grade} / 5.0
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 bg-green-900/20 border border-green-600 rounded-lg"
                >
                  <p className="text-sm text-muted-foreground mb-1">Correctas</p>
                  <p className="text-3xl font-bold text-green-400">{stats.correct}</p>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="p-4 bg-red-900/20 border border-red-600 rounded-lg"
                >
                  <p className="text-sm text-muted-foreground mb-1">Incorrectas</p>
                  <p className="text-3xl font-bold text-red-400">{stats.incorrect}</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg"
              >
                <p className="text-sm text-blue-300 mb-1">Evaluación</p>
                <p className="text-sm text-blue-300">{performanceFeedback}</p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button onClick={resetQuiz} size="lg" className="gap-2 flex-1">
                  <RotateCw className="w-4 h-4" />
                  Repetir Simulacro
                </Button>
                <Button onClick={onExit} variant="outline" size="lg" className="gap-2 flex-1">
                  <ArrowLeft className="w-4 h-4" />
                  Cambiar Modo
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      );
    }

    // Pantalla final modo estudio
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto"
      >
        <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-border">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              ¡Estudio Completado!
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-4 bg-green-900/20 border border-green-600 rounded-lg"
              >
                <p className="text-xs text-muted-foreground mb-1">Dominadas</p>
                <p className="text-3xl font-bold text-green-400">{stats.correct}</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg"
              >
                <p className="text-xs text-muted-foreground mb-1">Total</p>
                <p className="text-3xl font-bold text-blue-400">{stats.total}</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="p-4 bg-purple-900/20 border border-purple-600 rounded-lg"
              >
                <p className="text-xs text-muted-foreground mb-1">Reps</p>
                <p className="text-3xl font-bold text-purple-400">x{reps}</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg"
            >
              <p className="text-sm text-blue-300 mb-1">Nivel de Dominio</p>
              <p className="text-lg font-bold text-blue-400">{masteryLevel}</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4 bg-purple-900/20 border border-purple-600 rounded-lg"
            >
              <p className="text-sm text-purple-300 mb-1">Evaluación</p>
              <p className="text-sm text-purple-300">{performanceFeedback}</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button onClick={resetQuiz} size="lg" className="gap-2 flex-1">
                <RotateCw className="w-4 h-4" />
                Repetir
              </Button>
              <Button onClick={onExit} variant="outline" size="lg" className="gap-2 flex-1">
                <ArrowLeft className="w-4 h-4" />
                Cambiar Modo
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!currentQuestion) {
    return (
      <Card className="p-8 text-center bg-card border-border">
        <p className="text-lg text-muted-foreground">Cargando preguntas...</p>
      </Card>
    );
  }

  /* ── Pantalla de pregunta activa ── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* Header con progreso */}
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Pregunta {currentQuestionIndex + 1}
                {mode === 'exam' && ` / ${queue.length}`}
              </h2>
              {mode === 'study' && (
                <p className="text-xs text-muted-foreground">
                  {queue.length - currentQuestionIndex} restantes en cola
                </p>
              )}
            </div>
            <div className="text-right">
              {mode === 'study' ? (
                <>
                  <p className="text-sm text-muted-foreground">Progreso</p>
                  <p className="text-2xl font-bold text-green-400">
                    {completedCount}/{totalGoal}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ({score}/{totalQuestions} dominadas)
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">Aciertos</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {stats.correct}/{totalQuestions}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {mode === 'exam' ? 'Avance' : 'Progreso General'}
              </span>
              <span className="text-sm font-medium text-foreground">
                {progressPercentage}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-block px-3 py-1 bg-muted rounded-full">
              <span className="text-xs font-medium text-muted-foreground">
                {currentQuestion.type === 'true-false' && 'Verdadero/Falso'}
                {currentQuestion.type === 'single-choice' && 'Selección Única'}
                {currentQuestion.type === 'multiple-choice' && 'Selección Múltiple'}
                {currentQuestion.type === 'fill-text' && 'Relleno de Texto'}
                {currentQuestion.type === 'matching' && 'Emparejamiento'}
              </span>
            </div>

            <div className="ml-auto flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-xs h-7 px-2"
                onClick={onExit}
              >
                <ArrowLeft className="w-3 h-3" />
                Salir
              </Button>

              {/* Guardar/Cargar solo en modo estudio */}
              {mode === 'study' && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleLoadFile}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-xs h-7 px-2"
                    onClick={saveProgress}
                  >
                    <Save className="w-3 h-3" />
                    Guardar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-xs h-7 px-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-3 h-3" />
                    Cargar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Pregunta */}
      <Card className="p-8 bg-card border-border">
        <QuestionFactory
          key={currentQuestionIndex}
          question={currentQuestion}
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          onAnswer={answerQuestion}
        />
      </Card>

      {/* Botón siguiente */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button onClick={nextQuestion} size="lg" className="w-full">
            Siguiente Pregunta
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
