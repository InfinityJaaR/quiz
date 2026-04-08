#!/bin/bash

# 🚀 QUICK START - Simulator Quiz
# Ejecuta este script para empezar rápidamente

echo "🎓 Simulator Quiz - Quick Start"
echo "================================"
echo ""

# Paso 1: Instalación
echo "📦 Paso 1: Instalando dependencias..."
pnpm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas"
else
    echo "❌ Error en instalación. Intenta:"
    echo "   npm install (o yarn install o bun install)"
    exit 1
fi

echo ""
echo "================================"
echo "✨ ¡Instalación completada!"
echo ""
echo "📚 Próximos pasos:"
echo ""
echo "1️⃣  Inicia el servidor:"
echo "   pnpm dev"
echo ""
echo "2️⃣  Abre en tu navegador:"
echo "   http://localhost:3000"
echo ""
echo "3️⃣  Para personalizar preguntas, edita:"
echo "   lib/quiz-data.ts"
echo ""
echo "4️⃣  Lee la documentación:"
echo "   - README.md (Overview)"
echo "   - SETUP.md (Configuración)"
echo "   - TECHNICAL.md (Arquitectura)"
echo ""
echo "🎉 ¡A disfrutar tu Quiz!"
echo "================================"
