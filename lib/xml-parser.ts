/**
 * Parser XML para Banco de Preguntas
 * Este archivo muestra cómo convertir XML a formato de preguntas
 * 
 * Ejemplo de XML:
 * <quiz>
 *   <question id="q1" type="true-false">
 *     <text>¿React es una librería?</text>
 *     <answer>true</answer>
 *     <note>React es una librería...</note>
 *   </question>
 * </quiz>
 */

import { QuizQuestion } from './quiz-types';

export function parseXMLQuiz(xmlString: string): QuizQuestion[] {
  const parser = new window.DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  if (xmlDoc.getElementsByTagName('parsererror').length) {
    throw new Error('Error al parsear XML');
  }

  const questions: QuizQuestion[] = [];
  const questionElements = xmlDoc.getElementsByTagName('question');

  for (let i = 0; i < questionElements.length; i++) {
    const element = questionElements[i];
    const id = element.getAttribute('id') || `q${i}`;
    const type = element.getAttribute('type');
    const text = element.getElementsByTagName('text')[0]?.textContent || '';
    const note = element.getElementsByTagName('note')[0]?.textContent || '';

    if (type === 'true-false') {
      const answer = element.getElementsByTagName('answer')[0]?.textContent === 'true';
      questions.push({
        id,
        type: 'true-false',
        question: text,
        correctAnswer: answer,
        technicalNote: note,
      });
    } else if (type === 'single-choice') {
      const options = Array.from(element.getElementsByTagName('option')).map((opt) => ({
        id: opt.getAttribute('id') || `opt${i}`,
        text: opt.textContent || '',
      }));
      const correctId = element.getAttribute('correct');
      questions.push({
        id,
        type: 'single-choice',
        question: text,
        options,
        correctAnswerId: correctId || '',
        technicalNote: note,
      });
    } else if (type === 'multiple-choice') {
      const options = Array.from(element.getElementsByTagName('option')).map((opt) => ({
        id: opt.getAttribute('id') || `opt${i}`,
        text: opt.textContent || '',
      }));
      const correctIds = element
        .getAttribute('correct')
        ?.split(',')
        .map((s) => s.trim()) || [];
      questions.push({
        id,
        type: 'multiple-choice',
        question: text,
        options,
        correctAnswerIds: correctIds,
        technicalNote: note,
      });
    } else if (type === 'fill-text') {
      const answer = element.getElementsByTagName('answer')[0]?.textContent || '';
      questions.push({
        id,
        type: 'fill-text',
        question: text,
        correctAnswer: answer,
        technicalNote: note,
      });
    } else if (type === 'matching') {
      const pairs = Array.from(element.getElementsByTagName('pair')).map((pair) => ({
        id: pair.getAttribute('id') || `pair${i}`,
        left: pair.getElementsByTagName('left')[0]?.textContent || '',
        right: pair.getElementsByTagName('right')[0]?.textContent || '',
      }));
      questions.push({
        id,
        type: 'matching',
        question: text,
        pairs,
        technicalNote: note,
      });
    }
  }

  return questions;
}

/**
 * Ejemplo de uso en un componente:
 * 
 * 'use client';
 * import { parseXMLQuiz } from '@/lib/xml-parser';
 * import { useState, useEffect } from 'react';
 * 
 * export default function QuizWithXML() {
 *   const [questions, setQuestions] = useState([]);
 *
 *   useEffect(() => {
 *     fetch('/quiz-data.xml')
 *       .then(res => res.text())
 *       .then(xml => {
 *         const parsedQuestions = parseXMLQuiz(xml);
 *         setQuestions(parsedQuestions);
 *       });
 *   }, []);
 *
 *   return <QuizProvider questions={questions}><QuizScreen /></QuizProvider>;
 * }
 */
