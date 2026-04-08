import { QuizQuestion } from './quiz-types';

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'true-false',
    question: '¿React es una librería de JavaScript para construir interfaces de usuario?',
    correctAnswer: true,
    technicalNote: 'React es una librería (no un framework) desarrollada por Facebook para crear UIs con componentes reutilizables y el patrón Virtual DOM.'
  },
  {
    id: 'q2',
    type: 'single-choice',
    question: '¿Cuál es el hook principal para manejar estado en React?',
    options: [
      { id: 'a1', text: 'useContext' },
      { id: 'a2', text: 'useState' },
      { id: 'a3', text: 'useReducer' },
      { id: 'a4', text: 'useEffect' }
    ],
    correctAnswerId: 'a2',
    technicalNote: 'useState es el hook fundamental para agregar estado local a componentes funcionales. Retorna el valor actual y una función para actualizarlo.'
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    question: '¿Cuáles de las siguientes son características de Tailwind CSS? (Selecciona todas)',
    options: [
      { id: 'b1', text: 'Clases utilitarias de bajo nivel' },
      { id: 'b2', text: 'Framework basado en componentes predefinidos' },
      { id: 'b3', text: 'Personalizable mediante configuración' },
      { id: 'b4', text: 'Requiere JavaScript para funcionar' }
    ],
    correctAnswerIds: ['b1', 'b3'],
    technicalNote: 'Tailwind proporciona clases utilitarias y es altamente personalizable. Los componentes son responsabilidad del desarrollador (aunque existen librerías como shadcn/ui).'
  },
  {
    id: 'q4',
    type: 'fill-text',
    question: 'El hook que reemplaza el ciclo de vida de los componentes en React es: ___________',
    correctAnswer: 'useEffect',
    technicalNote: 'useEffect permite ejecutar efectos secundarios en componentes funcionales, reemplazando componentDidMount, componentDidUpdate y componentWillUnmount.'
  },
  {
    id: 'q5',
    type: 'matching',
    question: 'Empareja los conceptos con sus definiciones:',
    pairs: [
      {
        id: 'm1',
        left: 'Virtual DOM',
        right: 'Representación en memoria del DOM actual'
      },
      {
        id: 'm2',
        left: 'Props',
        right: 'Parámetros inmutables que pasan datos a componentes'
      },
      {
        id: 'm3',
        left: 'State',
        right: 'Datos locales mutables que pueden cambiar en el tiempo'
      }
    ],
    technicalNote: 'Estos son conceptos fundamentales de React que son esenciales para construir aplicaciones eficientes y mantenibles.'
  },
  {
    id: 'q6',
    type: 'true-false',
    question: '¿En Next.js, los componentes en la carpeta /app por defecto son Client Components?',
    correctAnswer: false,
    technicalNote: 'Por defecto, los componentes en /app de Next.js 13+ son Server Components. Solo agregan "use client" para convertirlos en Client Components.'
  },
  {
    id: 'q7',
    type: 'single-choice',
    question: '¿Cuál es la forma recomendada de aplicar estilos en Next.js con Tailwind?',
    options: [
      { id: 'c1', text: 'CSS Modules' },
      { id: 'c2', text: 'Clases de Tailwind' },
      { id: 'c3', text: 'CSS-in-JS' },
      { id: 'c4', text: 'Inline styles' }
    ],
    correctAnswerId: 'c2',
    technicalNote: 'Tailwind CSS es la forma moderna y recomendada por Vercel para estilar aplicaciones Next.js por su performance y utilidad.'
  },
  {
    id: 'q8',
    type: 'multiple-choice',
    question: '¿Cuáles son ventajas de usar TypeScript en React? (Selecciona todas)',
    options: [
      { id: 'd1', text: 'Detección de errores en tiempo de compilación' },
      { id: 'd2', text: 'Mejor autocompletado en el editor' },
      { id: 'd3', text: 'Elimina completamente la necesidad de testing' },
      { id: 'd4', text: 'Mejora la mantenibilidad del código' }
    ],
    correctAnswerIds: ['d1', 'd2', 'd4'],
    technicalNote: 'TypeScript proporciona tipado estático, mejor developer experience y refactoring más seguro. El testing sigue siendo necesario.'
  },
  {
    id: 'q9',
    type: 'fill-text',
    question: 'El patrón de estado local compartido entre componentes en React se maneja típicamente con: ___________',
    correctAnswer: 'Context API',
    technicalNote: 'Context API es una forma nativa de React para compartir estado sin necesidad de librerías externas. Para estado más complejo se usa Redux o Zustand.'
  },
  {
    id: 'q10',
    type: 'true-false',
    question: '¿shadcn/ui es un framework CSS como Tailwind?',
    correctAnswer: false,
    technicalNote: 'shadcn/ui es una colección de componentes accesibles y reutilizables construidos con Radix UI y Tailwind CSS. No es un framework, es una librería de componentes.'
  }
];
