/**
 * ESTRUCTURA DE DATOS DEL QUIZ
 * 
 * Este archivo documenta la estructura de cada tipo de pregunta
 * y proporciona ejemplos de cómo extender el sistema.
 */

import type {
  TrueFalseQuestion,
  SingleChoiceQuestion,
  MultipleChoiceQuestion,
  FillTextQuestion,
  MatchingQuestion,
} from '@/lib/quiz-types';

/**
 * PREGUNTA VERDADERO/FALSO
 * El usuario debe elegir entre dos opciones.
 */
export const EXAMPLE_TRUE_FALSE: TrueFalseQuestion = {
  id: 'q1',
  type: 'true-false',
  question: '¿React es una librería de JavaScript?',
  correctAnswer: true,
  technicalNote:
    'React es una librería (no un framework) desarrollada por Facebook para crear interfaces de usuario con componentes reutilizables.',
};

/**
 * PREGUNTA DE SELECCIÓN ÚNICA
 * El usuario debe seleccionar una sola opción correcta.
 */
export const EXAMPLE_SINGLE_CHOICE: SingleChoiceQuestion = {
  id: 'q2',
  type: 'single-choice',
  question: '¿Cuál es el hook para manejar estado?',
  options: [
    { id: 'a1', text: 'useContext' },
    { id: 'a2', text: 'useState' }, // Correcta
    { id: 'a3', text: 'useReducer' },
    { id: 'a4', text: 'useEffect' },
  ],
  correctAnswerId: 'a2',
  technicalNote:
    'useState es el hook fundamental para agregar estado local a componentes funcionales en React.',
};

/**
 * PREGUNTA DE SELECCIÓN MÚLTIPLE
 * El usuario debe seleccionar TODAS las opciones correctas.
 * Si selecciona más o menos de lo correcto, se considera incorrecta.
 */
export const EXAMPLE_MULTIPLE_CHOICE: MultipleChoiceQuestion = {
  id: 'q3',
  type: 'multiple-choice',
  question: '¿Cuáles son características de Tailwind CSS?',
  options: [
    { id: 'b1', text: 'Clases utilitarias de bajo nivel' }, // Correcta
    { id: 'b2', text: 'Framework basado en componentes' },
    { id: 'b3', text: 'Personalizable mediante configuración' }, // Correcta
    { id: 'b4', text: 'Requiere JavaScript' },
  ],
  correctAnswerIds: ['b1', 'b3'],
  technicalNote:
    'Tailwind proporciona clases utilitarias y es altamente personalizable mediante tailwind.config.ts',
};

/**
 * PREGUNTA DE RELLENO DE TEXTO
 * El usuario escribe la respuesta. La validación es case-insensitive.
 */
export const EXAMPLE_FILL_TEXT: FillTextQuestion = {
  id: 'q4',
  type: 'fill-text',
  question: 'El hook que reemplaza el ciclo de vida es: ___________',
  correctAnswer: 'useEffect',
  technicalNote:
    'useEffect permite ejecutar efectos secundarios en componentes funcionales de React.',
};

/**
 * PREGUNTA DE EMPAREJAMIENTO
 * El usuario debe emparejar elementos de la izquierda con los de la derecha.
 * Usa un sistema de Select para la interacción.
 */
export const EXAMPLE_MATCHING: MatchingQuestion = {
  id: 'q5',
  type: 'matching',
  question: 'Empareja los conceptos con sus definiciones:',
  pairs: [
    {
      id: 'm1',
      left: 'Virtual DOM',
      right: 'Representación en memoria del DOM',
    },
    {
      id: 'm2',
      left: 'Props',
      right: 'Parámetros inmutables de componentes',
    },
    {
      id: 'm3',
      left: 'State',
      right: 'Datos locales mutables',
    },
  ],
  technicalNote:
    'Conceptos fundamentales de React que son esenciales para construir aplicaciones eficientes.',
};

/**
 * NOTAS TÉCNICAS IMPORTANTES
 *
 * 1. VALIDACIÓN:
 *    - Verdadero/Falso: Comparación directa de booleanos
 *    - Selección Única: Comparación de IDs de opción
 *    - Selección Múltiple: Array exacto (orden no importa)
 *    - Relleno de Texto: Comparación case-insensitive (toLowerCase)
 *    - Emparejamiento: Todos los pares deben coincidir
 *
 * 2. REINSERCIÓN:
 *    - Si una pregunta es incorrecta, se agrega al final de la cola
 *    - El quiz continúa hasta que TODAS las preguntas sean correctas
 *    - El score solo incrementa cuando se responde correctamente por primera vez
 *
 * 3. FEEDBACK:
 *    - Inmediato: Se muestra al instante
 *    - Técnico: Proporciona contexto educativo
 *    - Visual: Verde para correcto, rojo para incorrecto
 *
 * 4. ANIMACIONES:
 *    - Framer Motion para transiciones suaves
 *    - Escalas y opacidades controladas
 *    - Retrasos para efectos en cascada
 *
 * 5. RESPONSIVIDAD:
 *    - Mobile-first design
 *    - Flexbox para layouts principales
 *    - Grid para componentes complejos
 */
