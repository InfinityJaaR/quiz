# 🚀 GUÍA DE SETUP Y CONFIGURACIÓN

## Instalación Rápida

```bash
# 1. Instalar dependencias
pnpm install
# o npm install

# 2. Ejecutar en desarrollo
pnpm dev

# 3. Abrir en el navegador
# http://localhost:3000
```

## Estructura del Proyecto

```
project/
├── app/
│   ├── layout.tsx          # Layout principal (dark mode)
│   ├── page.tsx            # Página principal con Quiz
│   └── globals.css         # Estilos globales
│
├── components/
│   ├── QuizScreen.tsx      # Pantalla principal del quiz
│   ├── QuestionFactory.tsx # Enrutador de preguntas
│   ├── ThemeToggle.tsx     # Toggle de tema (opcional)
│   ├── HomeWithXML.tsx     # Ejemplo de carga desde XML
│   ├── questions/          # Componentes de cada tipo de pregunta
│   │   ├── TrueFalseQuestion.tsx
│   │   ├── SingleChoiceQuestion.tsx
│   │   ├── MultipleChoiceQuestion.tsx
│   │   ├── FillTextQuestion.tsx
│   │   └── MatchingQuestion.tsx
│   └── ui/                 # Componentes de shadcn/ui
│
├── hooks/
│   └── useQuiz.tsx         # Hook y Provider del Quiz
│
├── lib/
│   ├── quiz-types.ts       # Tipos de datos
│   ├── quiz-data.ts        # Datos de preguntas
│   ├── quiz-examples.ts    # Ejemplos de estructura
│   ├── quiz-stats.ts       # Utilidades de estadísticas
│   ├── xml-parser.ts       # Parser para XML
│   └── utils.ts            # Utilidades generales
│
└── public/
    └── quiz-data-example.xml  # Archivo XML de ejemplo
```

## Configuración Inicial

### 1. Modo Oscuro (Ya Configurado)

El proyecto viene en dark mode por defecto. Para cambiar:

**En `app/layout.tsx`:**
```tsx
<html lang="es" className="dark">  {/* Remover "dark" para light mode */}
```

### 2. Personalizar Datos

#### Opción A: Usar JSON (Recomendado para comenzar)

**Editar `/lib/quiz-data.ts`:**
```typescript
export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'true-false',
    question: 'Tu pregunta aquí',
    correctAnswer: true,
    technicalNote: 'Explicación aquí...'
  },
  // Agregar más preguntas...
];
```

#### Opción B: Cargar desde XML

1. **Crear archivo XML** (ejemplo en `/public/quiz-data.xml`)
2. **Usar componente `HomeWithXML`** en lugar de componente normal:

**En `app/page.tsx`:**
```tsx
import HomeWithXML from '@/components/HomeWithXML';

export default function Home() {
  return <HomeWithXML />;
}
```

El parser convertirá automáticamente XML a las estructuras de datos.

## Tipos de Preguntas - Agregar Nuevas

### Ejemplo: Pregunta de Opción Verdadero/Falso

```typescript
{
  id: 'q1',
  type: 'true-false',
  question: '¿React es una librería?',
  correctAnswer: true,
  technicalNote: 'React es una librería...'
}
```

### Ejemplo: Pregunta de Selección Única

```typescript
{
  id: 'q2',
  type: 'single-choice',
  question: '¿Cuál es el hook de estado?',
  options: [
    { id: 'a', text: 'useState' },
    { id: 'b', text: 'useContext' },
  ],
  correctAnswerId: 'a',
  technicalNote: 'useState es...'
}
```

### Ejemplo: Pregunta de Selección Múltiple

```typescript
{
  id: 'q3',
  type: 'multiple-choice',
  question: 'Selecciona todas las correctas:',
  options: [
    { id: 'a', text: 'Opción 1' },
    { id: 'b', text: 'Opción 2' },
  ],
  correctAnswerIds: ['a', 'b'],  // Array de IDs correctos
  technicalNote: 'Explicación...'
}
```

### Ejemplo: Pregunta de Relleno

```typescript
{
  id: 'q4',
  type: 'fill-text',
  question: 'Complete: El hook es ___________',
  correctAnswer: 'useEffect',
  technicalNote: 'useEffect es...'
}
```

### Ejemplo: Pregunta de Emparejamiento

```typescript
{
  id: 'q5',
  type: 'matching',
  question: 'Empareja los conceptos:',
  pairs: [
    {
      id: 'p1',
      left: 'Concepto 1',
      right: 'Definición 1'
    },
    {
      id: 'p2',
      left: 'Concepto 2',
      right: 'Definición 2'
    },
  ],
  technicalNote: 'Explicación...'
}
```

## Personalizar Estilos

### Colores (Tailwind CSS)

Todos los colores usan tokens de diseño en `app/globals.css`:
- `background` - Fondo principal
- `foreground` - Texto principal
- `card` - Fondo de tarjetas
- `green-600/900` - Respuestas correctas
- `red-600/900` - Respuestas incorrectas

### Personalizar Animaciones

Las animaciones usan Framer Motion. Editar en componentes:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Contenido
</motion.div>
```

## Funcionalidades Avanzadas

### 1. Descargar Resultados

La aplicación incluye funcionalidad para descargar resultados como JSON:

```typescript
import { downloadQuizResults } from '@/lib/quiz-stats';

// En tu componente
const handleDownload = () => {
  downloadQuizResults(quizContext);
};
```

### 2. Estadísticas Detalladas

```typescript
import { getDetailedStats, getMasteryLevel } from '@/lib/quiz-stats';

const stats = getDetailedStats(quiz);
console.log(stats.successRate);  // 0-100
console.log(stats.averageAttemptsPerQuestion);
```

### 3. Feedback Automático

```typescript
import { getPerformanceFeedback } from '@/lib/quiz-stats';

const feedback = getPerformanceFeedback(85); // Para 85% de éxito
// "¡Excelente! Tienes un dominio muy sólido del tema."
```

## Lógica de Reinserción

Las preguntas incorrectas se agregan automáticamente al final de la cola:

```
Pregunta 1 (incorrecta) → Agregada al final
Pregunta 2 → Respondida
Pregunta 3 (incorrecta) → Agregada al final
...
Pregunta 1 (reintentada)
```

El quiz solo termina cuando TODAS las preguntas se responden correctamente.

## Debugging

### Ver logs del contexto del Quiz

En `hooks/useQuiz.tsx`, descomenta:

```typescript
console.log('[Quiz]', { score, queue, isCorrect });
```

### Inspeccionar estructura de datos

En la consola del navegador:

```javascript
// Ver preguntas actuales
console.log(window.quizQueue);

// Ver respuestas
console.log(window.quizAnswered);
```

## Deployment

### Vercel (Recomendado)

```bash
# 1. Push a GitHub
git push origin main

# 2. Conectar en Vercel
# https://vercel.com/new

# ¡Listo! Tu app está en vivo
```

### Otras plataformas

```bash
# Build
pnpm build

# Start
pnpm start
```

## Solución de Problemas

### El quiz no carga las preguntas

1. Verificar que `QUIZ_DATA` esté correctamente importado
2. Verificar que el `QuizProvider` envuelva `QuizScreen`
3. Abrir DevTools → Console para ver errores

### Las animaciones no funcionan

1. Verificar que `framer-motion` esté instalado
2. Verificar que el componente sea `'use client'`
3. Inspeccionar si hay conflictos de CSS

### XML no parsea correctamente

1. Validar XML en https://www.xmlvalidation.com/
2. Verificar estructura exacta en `/public/quiz-data-example.xml`
3. Ver console para mensajes de error del parser

## Recursos Útiles

- [React Docs](https://react.dev)
- [Next.js Docs](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

---

**¿Preguntas?** Consulta el README.md para más detalles técnicos.
