'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuizProvider } from '@/hooks/useQuiz';
import { parseXMLQuiz } from '@/lib/xml-parser';
import QuizScreen from '@/components/QuizScreen';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, Loader2, GraduationCap, RefreshCw, ClipboardList, Target } from 'lucide-react';
import type { QuizQuestion, QuizMode } from '@/lib/quiz-types';

type QuizConfig =
  | { mode: 'study'; reps: 1 | 2 | 3 }
  | { mode: 'exam'; reps: 1 };

const MODES: { config: QuizConfig; title: string; description: string; icon: React.ReactNode; accent: string }[] = [
  {
    config: { mode: 'study', reps: 1 },
    title: 'Estudio x1',
    description: 'Cada pregunta aparece 1 vez. Si fallas, se reinserta más adelante.',
    icon: <BookOpen className="w-6 h-6" />,
    accent: 'from-blue-500 to-blue-700',
  },
  {
    config: { mode: 'study', reps: 2 },
    title: 'Estudio x2',
    description: 'Debes responder cada pregunta correctamente 2 veces para dominarla.',
    icon: <RefreshCw className="w-6 h-6" />,
    accent: 'from-purple-500 to-purple-700',
  },
  {
    config: { mode: 'study', reps: 3 },
    title: 'Estudio x3',
    description: 'Máximo refuerzo: 3 aciertos por pregunta para considerarla dominada.',
    icon: <GraduationCap className="w-6 h-6" />,
    accent: 'from-indigo-500 to-indigo-700',
  },
  {
    config: { mode: 'exam', reps: 1 },
    title: 'Simulacro',
    description: 'Examen cronometrado. Cada pregunta aparece una sola vez. Obtendrás una calificación al final.',
    icon: <ClipboardList className="w-6 h-6" />,
    accent: 'from-orange-500 to-red-600',
  },
];

export default function HomeWithXML() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<QuizConfig | null>(null);

  useEffect(() => {
    const loadQuizFromXML = async () => {
      try {
        setLoading(true);
        const response = await fetch('/banco-preguntas.xml');
        if (!response.ok) throw new Error('No se pudo cargar el archivo XML');

        const xmlText = await response.text();
        const parsedQuestions = parseXMLQuiz(xmlText);

        if (parsedQuestions.length === 0) {
          throw new Error('No se encontraron preguntas en el XML');
        }

        setQuestions(parsedQuestions);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error cargando XML:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuizFromXML();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 dark flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
          <Card className="p-8 bg-card border-border">
            <Loader2 className="w-12 h-12 text-blue-400" />
          </Card>
        </motion.div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 dark">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card className="p-8 bg-red-900/20 border border-red-600">
            <p className="text-red-300 font-semibold mb-2">Error al cargar el quiz:</p>
            <p className="text-red-400 mb-4">{error || 'No hay preguntas disponibles'}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 dark">
      {/* Fondo decorativo */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-50"
      >
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 12 }}
            className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg"
          >
            <BookOpen className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MIP Quiz Parcial 1
            </h1>
            {config && (
              <p className="text-xs text-muted-foreground">
                {questions.length} preguntas •{' '}
                {config.mode === 'exam' ? 'Simulacro' : `Estudio x${config.reps}`}
              </p>
            )}
          </div>
        </div>
      </motion.header>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {config === null ? (
          /* Pantalla de selección de modo */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">
                ¿Cómo quieres estudiar hoy?
              </h2>
              <p className="text-muted-foreground">
                Elige un modo para comenzar. Tienes {questions.length} preguntas disponibles.
              </p>
            </div>

            {/* Enlace a otros simulacros */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-center text-sm text-muted-foreground mb-3">Otros simulacros disponibles</p>
              <Link href="/fusiles">
                <Card className="p-4 bg-card border-border cursor-pointer hover:border-orange-500/50 transition-all flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">Simulacro Fusiles</h3>
                    <p className="text-xs text-muted-foreground">Examen de práctica • Modo simulacro</p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    Ir
                  </Button>
                </Card>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MODES.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className="p-6 bg-card border-border cursor-pointer hover:border-blue-500/50 transition-all h-full"
                    onClick={() => setConfig(m.config)}
                  >
                    <div className="space-y-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.accent} flex items-center justify-center text-white`}>
                        {m.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{m.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{m.description}</p>
                      </div>
                      <Button
                        className={`w-full bg-gradient-to-r ${m.accent} text-white border-0 hover:opacity-90`}
                        onClick={() => setConfig(m.config)}
                      >
                        Comenzar
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

          </motion.div>
        ) : (
          /* Quiz activo */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <QuizProvider
              questions={questions}
              reps={config.reps}
              mode={config.mode}
            >
              <QuizScreen onExit={() => setConfig(null)} />
            </QuizProvider>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="border-t border-border/50 backdrop-blur-md bg-background/80 mt-16"
      >
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>MIP Quiz Parcial 1 • Preguntas cargadas desde XML</p>
        </div>
      </motion.footer>
    </div>
  );
}
