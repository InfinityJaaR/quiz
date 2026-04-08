# 🎓 Simulator Quiz - Aplicación de Estudio Interactiva

Una aplicación web moderna de estudio con interfaz dark mode, múltiples tipos de preguntas y lógica de reinserción automática. Construida con **React**, **Next.js**, **Tailwind CSS**, **shadcn/ui** y **Framer Motion**.

## ✨ Características Principales

### 📝 Tipos de Preguntas Soportadas

1. **Verdadero/Falso** - Responde si la afirmación es correcta o no
2. **Selección Única** - Elige una opción correcta entre varias
3. **Selección Múltiple** - Selecciona todas las opciones correctas (checkboxes)
4. **Relleno de Texto** - Completa la respuesta (validación case-insensitive)
5. **Emparejamiento** - Vincula conceptos con sus definiciones usando Select

### 🎯 Funcionalidades Clave

- **Lógica de Reinserción**: Las preguntas incorrectas vuelven al final de la cola automáticamente
- **Feedback Inmediato**: Cada respuesta muestra si es correcta o no, junto con una "Nota Técnica"
- **Barra de Progreso**: Visualización del avance total del quiz
- **Contador de Aciertos/Errores**: Seguimiento en tiempo real del desempeño
- **Pantalla de Resultados**: Resumen completo con estadísticas al finalizar
- **Interfaz Dark Mode**: Tema oscuro optimizado para comodidad visual
- **Animaciones Suaves**: Transiciones con Framer Motion

## 🛠️ Estructura Técnica

### Componentes Principales

```
/components/
├── QuestionFactory.tsx          # Enrutador dinámico de preguntas
├── QuizScreen.tsx               # Pantalla principal del quiz
└── questions/
    ├── TrueFalseQuestion.tsx     # Componente de V/F
    ├── SingleChoiceQuestion.tsx  # Componente de selección única
    ├── MultipleChoiceQuestion.tsx # Componente de selección múltiple
    ├── FillTextQuestion.tsx      # Componente de relleno de texto
    └── MatchingQuestion.tsx      # Componente de emparejamiento
```

### Hooks y Contexto

- **`useQuiz()`**: Hook principal que gestiona el estado del quiz
- **`QuizProvider`**: Proveedor de contexto que envuelve la aplicación

### Tipos de Datos

- `QuizQuestion`: Unión de todos los tipos de preguntas
- `QuizContextType`: Interfaz del contexto del quiz

## 📊 Flujo de Datos

```
QUIZ_DATA (JSON)
       ↓
useQuiz Hook (Contexto)
       ↓
QuizProvider (Wrapper)
       ↓
QuizScreen Component
       ↓
QuestionFactory (Router Dinámico)
       ↓
Componentes de Preguntas Específicos
```

## 🎨 Personalización

### Agregar Nuevas Preguntas

Edita `/lib/quiz-data.ts`:

```typescript
{
  id: 'q11',
  type: 'single-choice',
  question: '¿Tu pregunta aquí?',
  options: [
    { id: 'opt1', text: 'Opción 1' },
    { id: 'opt2', text: 'Opción 2' },
  ],
  correctAnswerId: 'opt1',
  technicalNote: 'Explicación técnica aquí...'
}
```

### Agregar Nuevo Tipo de Pregunta

1. Agregar tipo en `lib/quiz-types.ts`
2. Crear componente en `components/questions/`
3. Agregar caso en `components/QuestionFactory.tsx`

## 🔄 Lógica de Reinserción

Cuando una pregunta se responde incorrectamente:

```javascript
if (!correct) {
  setQueue((prev) => {
    const newQueue = [...prev];
    newQueue.push(currentQuestion);  // Agregar al final
    return newQueue;
  });
}
```

Las preguntas se repiten hasta que se responden correctamente.

## 🎬 Animaciones

La aplicación usa **Framer Motion** para:

- Transiciones de entrada/salida
- Efectos hover en botones
- Animaciones de progreso
- Transiciones suaves entre preguntas

## 📱 Responsividad

- Diseño mobile-first
- Optimizado para tablets y desktops
- Interfaz adaptable a diferentes tamaños de pantalla

## 🚀 Uso

```bash
# Instalación
npm install
# o
pnpm install

# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm start
```

## 🎯 Casos de Uso

- Preparación para exámenes
- Consolidación de conceptos técnicos
- Evaluación de conocimientos
- Material de estudio interactivo

## 📄 Licencia

Proyecto educativo creado con v0.

---

**Nota**: La aplicación implementa:
- ✅ Parsing de datos (fácil migración a XML si es necesario)
- ✅ Componentes dinámicos con Factory Pattern
- ✅ Cola de preguntas con reinserción
- ✅ Interfaz moderna con Tailwind CSS y shadcn/ui
- ✅ Animaciones fluidas con Framer Motion
