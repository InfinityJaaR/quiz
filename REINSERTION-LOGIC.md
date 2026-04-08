# 🔄 GUÍA VISUAL: Lógica de Reinserción

## ¿Cómo Funciona la Reinserción?

La reinserción automática es el **corazón del sistema de aprendizaje** de Simulator Quiz. Aquí está explicado paso a paso.

---

## 1️⃣ Estado Inicial

Empezamos con 5 preguntas en la cola:

```
┌─────────────────────────────────────┐
│  COLA DE PREGUNTAS (Queue)          │
├─────────────────────────────────────┤
│  [1] ¿React es librería?            │ ← Pregunta actual
│  [2] ¿Cuál es el hook de estado?    │
│  [3] ¿Tailwind qué es?              │
│  [4] Complete: El hook es ___       │
│  [5] Empareja conceptos             │
└─────────────────────────────────────┘

ESTADÍSTICAS:
├─ Score: 0/5
├─ Respuestas Correctas: 0
├─ Respuestas Incorrectas: 0
└─ Progreso: 0%
```

---

## 2️⃣ Primer Intento - ❌ INCORRECTO

El usuario **responde incorrectamente** la pregunta 1:

```
Usuario selecciona: "Falso" (pero la respuesta correcta es "Verdadero")

┌─ VALIDACIÓN ─────────────────────────────┐
│ Respuesta: Falso                          │
│ Correcta:  Verdadero                      │
│ ¿Coincide? ❌ NO                          │
├───────────────────────────────────────────┤
│ Acción: AGREGAR AL FINAL DE LA COLA      │
└───────────────────────────────────────────┘
```

**Resultado en la Cola:**

```
ANTES:
[1] ¿React es librería?       ← Pregunta actual (incorrecta)
[2] ¿Cuál es el hook?
[3] ¿Tailwind qué es?
[4] Complete: El hook...
[5] Empareja conceptos

DESPUÉS: (Pregunta 1 se agrega al FINAL)
[2] ¿Cuál es el hook?         ← Nuevo: Pregunta actual
[3] ¿Tailwind qué es?
[4] Complete: El hook...
[5] Empareja conceptos
[1] ¿React es librería?       ← Agregada aquí (reintentar)
```

**Estadísticas Actualizadas:**
```
Score: 0/5 (no cambió, era incorrecto)
Respuestas Incorrectas: 1 ↑
Progreso: 0%
```

---

## 3️⃣ Segundo Intento - ✅ CORRECTO

El usuario **responde correctamente** la pregunta 2:

```
Usuario selecciona: "useState" (Respuesta correcta)

┌─ VALIDACIÓN ─────────────────────────────┐
│ Respuesta: useState                       │
│ Correcta:  useState                       │
│ ¿Coincide? ✅ SÍ                         │
├───────────────────────────────────────────┤
│ Acción: INCREMENTAR SCORE                │
│         PASAR A SIGUIENTE                │
└───────────────────────────────────────────┘
```

**Resultado en la Cola:**

```
ANTES:
[2] ¿Cuál es el hook?         ← Pregunta actual (correcta)
[3] ¿Tailwind qué es?
[4] Complete: El hook...
[5] Empareja conceptos
[1] ¿React es librería?       ← Reintentar después

DESPUÉS: (La pregunta 2 se ELIMINA, avanzamos a la 3)
[3] ¿Tailwind qué es?         ← Nuevo: Pregunta actual
[4] Complete: El hook...
[5] Empareja conceptos
[1] ¿React es librería?       ← Esperando reintento
```

**Estadísticas Actualizadas:**
```
Score: 1/5 ↑ (¡Una correcta!)
Respuestas Correctas: 1
Respuestas Incorrectas: 1
Progreso: 20%
```

---

## 4️⃣ Tercer Intento - ❌ INCORRECTO (Otra vez)

El usuario **falla** la pregunta 3:

```
Usuario selecciona: "Un framework CSS" (pero la respuesta es "Clases utilitarias")

┌─ VALIDACIÓN ─────────────────────────────┐
│ Respuesta: Framework CSS                  │
│ Correcta:  Clases utilitarias             │
│ ¿Coincide? ❌ NO                          │
├───────────────────────────────────────────┤
│ Acción: AGREGAR AL FINAL DE LA COLA      │
└───────────────────────────────────────────┘
```

**Resultado en la Cola:**

```
ANTES:
[3] ¿Tailwind qué es?         ← Pregunta actual (incorrecta)
[4] Complete: El hook...
[5] Empareja conceptos
[1] ¿React es librería?       ← Reintentar después
             ↓
DESPUÉS: (Pregunta 3 se agrega al final)
[4] Complete: El hook...      ← Nuevo: Pregunta actual
[5] Empareja conceptos
[1] ¿React es librería?       ← Esperando reintento
[3] ¿Tailwind qué es?         ← Agregada aquí (reintentaremos)
```

**Estadísticas Actualizadas:**
```
Score: 1/5 (no cambió)
Respuestas Incorrectas: 2 ↑
Progreso: 20%
```

---

## 5️⃣ Cuarto Intento - ✅ CORRECTO

El usuario **responde correctamente** la pregunta 4:

```
Usuario escribe: "useEffect" (Respuesta correcta, validación case-insensitive)

┌─ VALIDACIÓN ─────────────────────────────┐
│ Respuesta: useEffect                      │
│ Correcta:  useEffect                      │
│ ¿Coincide? ✅ SÍ (case-insensitive)      │
├───────────────────────────────────────────┤
│ Acción: INCREMENTAR SCORE                │
│         PASAR A SIGUIENTE                │
└───────────────────────────────────────────┘
```

**Resultado en la Cola:**

```
ANTES:
[4] Complete: El hook...      ← Pregunta actual (correcta)
[5] Empareja conceptos
[1] ¿React es librería?       ← Esperando
[3] ¿Tailwind qué es?         ← Esperando

DESPUÉS:
[5] Empareja conceptos        ← Nuevo: Pregunta actual
[1] ¿React es librería?       ← Esperando
[3] ¿Tailwind qué es?         ← Esperando
```

**Estadísticas Actualizadas:**
```
Score: 2/5 ↑
Respuestas Correctas: 2
Progreso: 40%
```

---

## 6️⃣ Quinto Intento - ✅ CORRECTO

El usuario **responde correctamente** la pregunta 5:

```
Resultado: Cola actualizada

[1] ¿React es librería?       ← Nuevo: Pregunta actual (reintento)
[3] ¿Tailwind qué es?         ← Esperando

Score: 3/5
Progreso: 60%
```

---

## 7️⃣ Sexto Intento - ✅ CORRECTO (Primer Reintento)

El usuario **reintenta y acierta** la pregunta 1:

```
La pregunta 1 fue incorrecta en el intento 1.
Ahora en el intento 6, la responde correctamente.

Resultado: Cola actualizada

[3] ¿Tailwind qué es?         ← Nuevo: Pregunta actual

Score: 4/5
Progreso: 80%

NOTA: El score solo cuenta CUANDO se responde correctamente.
      Una pregunta no suma dos veces aunque la hayas 
      respondido correctamente antes.
```

---

## 8️⃣ Séptimo Intento - ✅ CORRECTO (Último Reintento)

El usuario **finalmente acierta** la pregunta 3 (que falló en intento 3):

```
La pregunta 3 fue incorrecta en el intento 3.
Ahora en el intento 7, la responde correctamente.

Resultado: Cola VACÍA ✨

Score: 5/5 ✅ (¡Perfecto!)
Progreso: 100%

┌─────────────────────────────────┐
│   QUIZ COMPLETADO 🎉           │
│                                 │
│  Aciertos: 5/5                  │
│  Errores: 2 (pero reintentaste) │
│  Porcentaje: 100%               │
│                                 │
│  Nivel: Maestría Completa       │
└─────────────────────────────────┘
```

---

## 📊 Resumen del Flujo Completo

| Intento | Pregunta | Resultado | Cola Después |
|---------|----------|-----------|--------------|
| 1 | #1 | ❌ Incorrecta | [#2, #3, #4, #5, #1] |
| 2 | #2 | ✅ Correcta | [#3, #4, #5, #1] |
| 3 | #3 | ❌ Incorrecta | [#4, #5, #1, #3] |
| 4 | #4 | ✅ Correcta | [#5, #1, #3] |
| 5 | #5 | ✅ Correcta | [#1, #3] |
| 6 | #1 (reintentar) | ✅ Correcta | [#3] |
| 7 | #3 (reintentar) | ✅ Correcta | [ ] (Vacío) |

**Resultado:** Score 5/5 = 100% ✅

---

## 🎯 Puntos Clave

### 1️⃣ Reinserción Automática
- Las preguntas incorrectas se agregan **automáticamente** al final
- No necesitas hacer nada extra
- El sistema las reintenta por ti

### 2️⃣ Score Solo Incrementa Correctamente
```
❌ Incorrecta → Score NO cambia
✅ Correcta   → Score +1 (pero solo la PRIMERA VEZ)
```

### 3️⃣ Quiz Termina Cuando TODO es Correcto
```
El quiz solo finaliza cuando:
✓ Todas las preguntas ÚNICAS se han respondido correctamente
✓ No hay más preguntas en la cola
✓ Score = Total de preguntas únicas
```

### 4️⃣ Presistencia de Errores
```
Si respondes mal:
   Pregunta → Final de cola → Reintentar después

Si respondes bien:
   Pregunta → Completada → Eliminar de cola
```

---

## 🔧 Implementación en Código

### Ubicación: `hooks/useQuiz.tsx`

```typescript
// Línea ~75-80: Reinserción de preguntas
const answerQuestion = useCallback((answer: any) => {
  if (!currentQuestion || isAnswered) return;

  let correct = false;
  // ... Validación ...

  if (correct) {
    // Score incrementa
    setScore((prev) => prev + 1);
  } else {
    // Pregunta incorrecta se agrega al final
    setQueue((prev) => {
      const newQueue = [...prev];
      newQueue.push(currentQuestion);  // ← Reinserción aquí
      return newQueue;
    });
  }
}, [currentQuestion, isAnswered]);
```

---

## 📈 Evolución del Progreso

```
Intento 1: 0% ████░░░░░░░░░░░░░░░░ (Score: 0/5)
Intento 2: 20% █████░░░░░░░░░░░░░░░ (Score: 1/5)
Intento 3: 20% █████░░░░░░░░░░░░░░░ (Score: 1/5)
Intento 4: 40% ██████████░░░░░░░░░░ (Score: 2/5)
Intento 5: 60% ███████████████░░░░░░ (Score: 3/5)
Intento 6: 80% ████████████████████░░ (Score: 4/5)
Intento 7: 100% ████████████████████░ (Score: 5/5) ✅
```

---

## 🎓 Por Qué Funciona Este Sistema

### Aprendizaje Efectivo
- **Refuerzo:** Las preguntas incorrectas se repiten automáticamente
- **Sin presión:** Puedes reintentar sin abandonar el quiz
- **Progreso visible:** La barra de progreso motiva

### Flexibilidad
- Algunos usuarios pasarán en 5 intentos
- Otros en 100+ intentos
- **Todos llegarán a 100% eventualmente**

### Validación Completa
- Asegura que cada concepto esté dominado
- No hay "adivinanzas"
- Refuerzo real del aprendizaje

---

## 💡 Tips para Usuarios

1. **No desesperes:** Si fallas mucho, revienta, lee la nota técnica
2. **Aprende de los errores:** La nota técnica explica por qué es así
3. **Intenta nuevamente:** El sistema te dará otra oportunidad
4. **Celebra el progreso:** Cada respuesta correcta acerca más a 100%

---

**Entender este sistema es CLAVE para maximizar el aprendizaje con Simulator Quiz.** 🎯✨
