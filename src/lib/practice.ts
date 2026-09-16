import { QuizData, Question } from "@/types";
import { itemKey, sortByUrgency } from "@/lib/review";

/** Fisher-Yates. Devuelve una copia — nunca muta el array original. */
export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export type PracticeMode = "lesson" | "mixed" | "review";

/** Preguntas por ronda en los modos que mezclan clases. Sesión corta > sesión larga. */
export const ROUND_SIZE = 12;

export interface RoundItem {
  /** Clave estable para el repaso espaciado. */
  key: string;
  quizId: string;
  lessonNumber: number;
  question: Question;
  /**
   * Opciones ya mezcladas y congeladas para esta ronda: si se mezclaran en cada render,
   * cambiarían de lugar mientras el alumno lee.
   */
  options: string[];
}

function toRoundItems(quiz: QuizData): RoundItem[] {
  return quiz.questions.map((question) => ({
    key: itemKey(quiz.id, question.id),
    quizId: quiz.id,
    lessonNumber: quiz.lesson_number,
    question,
    options: shuffle(question.options),
  }));
}

/**
 * Arma la ronda según el modo:
 * - lesson: la clase elegida, entera, con preguntas y opciones mezcladas.
 * - mixed:  ROUND_SIZE preguntas al azar de todas las clases (interleaving).
 * - review: ROUND_SIZE priorizando lo vencido y lo nunca visto (Leitner).
 */
export function buildRound(
  quizzes: QuizData[],
  mode: PracticeMode,
  lessonQuizId: string,
  now: Date = new Date()
): RoundItem[] {
  if (mode === "lesson") {
    const quiz = quizzes.find((q) => q.id === lessonQuizId) || quizzes[0];
    if (!quiz) return [];
    return shuffle(toRoundItems(quiz));
  }

  const all = quizzes.flatMap(toRoundItems);

  if (mode === "mixed") {
    return shuffle(all).slice(0, ROUND_SIZE);
  }

  // review: orden por urgencia, y recién ahí se mezcla el recorte para no
  // preguntar siempre en el mismo orden de vencimiento.
  const byKey = new Map(all.map((item) => [item.key, item]));
  const urgent = sortByUrgency([...byKey.keys()], now)
    .map((key) => byKey.get(key))
    .filter((item): item is RoundItem => Boolean(item))
    .slice(0, ROUND_SIZE);

  return shuffle(urgent);
}

/** Rehace una ronda con las preguntas indicadas (para "repasar las que fallé"). */
export function buildRoundFromKeys(quizzes: QuizData[], keys: string[]): RoundItem[] {
  const wanted = new Set(keys);
  const items = quizzes.flatMap(toRoundItems).filter((item) => wanted.has(item.key));
  return shuffle(items);
}
