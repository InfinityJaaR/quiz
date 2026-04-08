'use client';

/**
 * COMPONENTE DE EJEMPLO: Cómo cargar preguntas desde XML
 * 
 * Este archivo muestra cómo implementar carga dinámica de preguntas desde XML.
 * 
 * Uso:
 * 1. Descomenta el componente en app/page.tsx
 * 2. Reemplaza <Home/> con <HomeWithXML/>
 */

import { useState, useEffect } from 'react';
import { QuizProvider } from '@/hooks/useQuiz';
import { parseXMLQuiz } from '@/lib/xml-parser';
import QuizScreen from '@/components/QuizScreen';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BookOpen, Loader2 } from 'lucide-react';
import type { QuizQuestion } from '@/lib/quiz-types';

export default function HomeWithXML() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
        >
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
              Simulator Quiz
            </h1>
            <p className="text-xs text-muted-foreground">Cargado desde XML ({questions.length} preguntas)</p>
          </div>
        </div>
      </motion.header>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <QuizProvider questions={questions}>
            <QuizScreen />
          </QuizProvider>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="border-t border-border/50 backdrop-blur-md bg-background/80 mt-16"
      >
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Simulator Quiz • Preguntas cargadas desde XML</p>
        </div>
      </motion.footer>
    </div>
  );
}
