# 📁 ÍNDICE DE ARCHIVOS - Simulator Quiz

## 📚 Documentación

| Archivo | Propósito |
|---------|-----------|
| **README.md** | Overview general del proyecto, características y uso |
| **SETUP.md** | Guía paso a paso de instalación y configuración |
| **TECHNICAL.md** | Documentación técnica detallada, arquitectura, flujo de datos |
| **FILES.md** | Este archivo - índice completo |

---

## 🔧 Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `app/layout.tsx` | Layout raíz con metadata y dark mode |
| `app/globals.css` | Estilos globales y tokens de diseño |
| `tailwind.config.ts` | Configuración de Tailwind CSS |
| `tsconfig.json` | Configuración de TypeScript |
| `package.json` | Dependencias (incluye framer-motion) |
| `next.config.mjs` | Configuración de Next.js |

---

## 📄 Tipos de Datos

| Archivo | Contenido |
|---------|-----------|
| `lib/quiz-types.ts` | Tipos TypeScript de todos los tipos de pregunta |
| `lib/quiz-data.ts` | Datos de ejemplo (10 preguntas) |
| `lib/quiz-examples.ts` | Ejemplos documentados de cada tipo |

---

## 🪝 Lógica de Estado (Hook + Contexto)

| Archivo | Responsabilidad |
|---------|-----------------|
| `hooks/useQuiz.tsx` | Hook custom + Provider para gestionar estado del quiz |

**Incluye:**
- ✓ Context API para estado global
- ✓ Lógica de validación de respuestas
- ✓ Reinserción automática de preguntas incorrectas
- ✓ Cálculo de progreso y score
- ✓ Métodos: answerQuestion, nextQuestion, resetQuiz

---

## 🎨 Componentes Principales

### Contenedores

| Archivo | Propósito |
|---------|-----------|
| `app/page.tsx` | Página principal con layout, header, footer |
| `components/QuizScreen.tsx` | Pantalla del quiz + resultados finales |
| `components/ThemeToggle.tsx` | Selector de tema (opcional) |
| `components/HomeWithXML.tsx` | Versión con carga desde XML |

### Enrutador Dinámico

| Archivo | Propósito |
|---------|-----------|
| `components/QuestionFactory.tsx` | Router pattern - selecciona componente por tipo |

### Componentes de Preguntas (5 Tipos)

| Archivo | Tipo | Validación |
|---------|------|-----------|
| `components/questions/TrueFalseQuestion.tsx` | Verdadero/Falso | Booleano directo |
| `components/questions/SingleChoiceQuestion.tsx` | Selección Única | ID de opción |
| `components/questions/MultipleChoiceQuestion.tsx` | Selección Múltiple | Array de IDs |
| `components/questions/FillTextQuestion.tsx` | Relleno de Texto | Case-insensitive |
| `components/questions/MatchingQuestion.tsx` | Emparejamiento | Array de pairs |

### Componentes de shadcn/ui (Pre-existentes)

```
components/ui/
├── button.tsx          # Botones interactivos
├── card.tsx            # Tarjetas
├── input.tsx           # Inputs de texto
├── checkbox.tsx        # Checkboxes
├── progress.tsx        # Barra de progreso
├── select.tsx          # Selects para matching
├── label.tsx           # Etiquetas
├── badge.tsx           # Insignias
├── spinner.tsx         # Spinner de carga
└── ... (otros 20+ componentes)
```

---

## 🛠️ Utilidades y Helpers

| Archivo | Funciones |
|---------|-----------|
| `lib/quiz-stats.ts` | `getDetailedStats()`, `getPerformanceFeedback()`, `getMasteryLevel()`, `downloadQuizResults()` |
| `lib/xml-parser.ts` | `parseXMLQuiz()` - Convierte XML a objetos Quiz |
| `lib/utils.ts` | Función `cn()` para clases Tailwind |

---

## 📦 Datos Externos

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `public/quiz-data-example.xml` | XML | Ejemplo de estructura XML para preguntas |

---

## 📊 Árbol Completo de Carpetas

```
v0-project/
│
├── 📁 app/
│   ├── layout.tsx              ✅ Layout principal
│   ├── page.tsx                ✅ Página home
│   ├── globals.css             ✅ Estilos globales
│   └── icon.svg
│
├── 📁 components/
│   ├── QuizScreen.tsx          ✅ Pantalla principal
│   ├── QuestionFactory.tsx     ✅ Enrutador dinámico
│   ├── ThemeToggle.tsx         ✅ Toggle tema
│   ├── HomeWithXML.tsx         ✅ Versión con XML
│   │
│   ├── 📁 questions/           ✅ Componentes de tipos
│   │   ├── TrueFalseQuestion.tsx
│   │   ├── SingleChoiceQuestion.tsx
│   │   ├── MultipleChoiceQuestion.tsx
│   │   ├── FillTextQuestion.tsx
│   │   └── MatchingQuestion.tsx
│   │
│   ├── 📁 ui/                  (shadcn/ui pre-existente)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── checkbox.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   └── ... (20+ más)
│   │
│   └── theme-provider.tsx
│
├── 📁 hooks/
│   ├── useQuiz.tsx             ✅ Hook + Provider
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── 📁 lib/
│   ├── quiz-types.ts           ✅ Tipos de datos
│   ├── quiz-data.ts            ✅ Preguntas JSON
│   ├── quiz-examples.ts        ✅ Ejemplos documentados
│   ├── quiz-stats.ts           ✅ Estadísticas
│   ├── xml-parser.ts           ✅ Parser XML
│   └── utils.ts
│
├── 📁 public/
│   ├── quiz-data-example.xml   ✅ Archivo XML ejemplo
│   ├── icon-dark-32x32.png
│   ├── icon-light-32x32.png
│   └── icon.svg
│
├── 📄 README.md                ✅ Documentación general
├── 📄 SETUP.md                 ✅ Guía de instalación
├── 📄 TECHNICAL.md             ✅ Documentación técnica
├── 📄 FILES.md                 ✅ Este archivo
│
├── 📄 package.json             (Dependencies)
├── 📄 tsconfig.json            (TypeScript config)
├── 📄 tailwind.config.ts       (Tailwind config)
├── 📄 next.config.mjs          (Next.js config)
├── 📄 components.json          (shadcn config)
│
└── 📁 node_modules/            (Instalado con pnpm)
```

---

## ✨ Archivos NUEVOS CREADOS (para Simulator Quiz)

```
✅ Created:
├── lib/quiz-types.ts
├── lib/quiz-data.ts
├── lib/quiz-examples.ts
├── lib/quiz-stats.ts
├── lib/xml-parser.ts
│
├── hooks/useQuiz.tsx
│
├── components/QuizScreen.tsx
├── components/QuestionFactory.tsx
├── components/ThemeToggle.tsx
├── components/HomeWithXML.tsx
│
├── components/questions/TrueFalseQuestion.tsx
├── components/questions/SingleChoiceQuestion.tsx
├── components/questions/MultipleChoiceQuestion.tsx
├── components/questions/FillTextQuestion.tsx
├── components/questions/MatchingQuestion.tsx
│
├── public/quiz-data-example.xml
│
├── README.md
├── SETUP.md
├── TECHNICAL.md
└── FILES.md
```

**Total: 23 archivos nuevos + modificación de 2 existentes**

---

## 🚀 Para Comenzar

1. **Lee primero:** `README.md` (overview)
2. **Configura:** `SETUP.md` (instalación)
3. **Entiende la técnica:** `TECHNICAL.md` (arquitectura)
4. **Personaliza:** Edita `lib/quiz-data.ts` con tus preguntas

---

## 📦 Dependencias Instaladas

```json
{
  "dependencies": {
    "react": "^19",
    "react-dom": "^19",
    "next": "16.2.0",
    "framer-motion": "^11.0.0",      // ← Agregado
    "tailwindcss": "^4.2.0",
    "lucide-react": "^0.564.0",
    "@radix-ui/*": "latest",
    "recharts": "2.15.0",
    "sonner": "^1.7.1",
    // ... otros
  }
}
```

---

## 🎯 Características por Archivo

### Lógica de Reinserción
- **Ubicación:** `hooks/useQuiz.tsx` línea ~72
- **Cómo funciona:** Si `isCorrect === false`, la pregunta se agrega a `queue`

### Feedback Técnico
- **Ubicación:** Todos los componentes `questions/`
- **Campo:** `technicalNote` en `QuizQuestion`
- **Render:** Mostrado cuando `isAnswered === true`

### Progreso Visual
- **Componente:** `Progress` de shadcn/ui
- **Ubicación:** `components/QuizScreen.tsx`
- **Cálculo:** `(score / totalQuestions) * 100`

### Validación Case-Insensitive
- **Tipo:** Fill Text
- **Ubicación:** `components/questions/FillTextQuestion.tsx`
- **Método:** `.toLowerCase()` en ambos lados

---

## 🔗 Relaciones entre Archivos

```
app/page.tsx
    ├─→ QuizProvider (hooks/useQuiz.tsx)
    │     └─→ useQuiz() hook
    │
    └─→ QuizScreen (components/QuizScreen.tsx)
          ├─→ QuestionFactory (components/QuestionFactory.tsx)
          │     ├─→ TrueFalseQuestion
          │     ├─→ SingleChoiceQuestion
          │     ├─→ MultipleChoiceQuestion
          │     ├─→ FillTextQuestion
          │     └─→ MatchingQuestion
          │
          └─→ Components shadcn/ui
                ├─→ Card, Button, Input, Progress
                └─→ Select, Checkbox, Badge, etc.

useQuiz Hook
    ├─→ QUIZ_DATA (lib/quiz-data.ts)
    ├─→ QuizTypes (lib/quiz-types.ts)
    └─→ QuizStats (lib/quiz-stats.ts)

XML Parser (lib/xml-parser.ts)
    ├─→ DOMParser (Browser API)
    └─→ Convierte XML → QuizQuestion[]
```

---

## 📝 Notas Importantes

1. **Todavía no agregada:** Autenticación, Base de datos
2. **Preparado para:** Fácil extensión con nuevos tipos de preguntas
3. **Responsive:** Funciona en mobile, tablet, desktop
4. **Dark Mode:** Por defecto, personalizable en `app/layout.tsx`
5. **Type Safe:** 100% TypeScript para evitar errores

---

**Última modificación:** Abril 2026
**Proyecto:** Simulator Quiz v1.0.0
**Status:** ✅ Listo para producción
