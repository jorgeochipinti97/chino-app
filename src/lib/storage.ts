import { QuizData, StudentScore } from "@/types";
import { INITIAL_QUIZZES } from "@/data/lessons";

const STORAGE_KEYS = {
  QUIZZES: "chino_app_quizzes_v2",
  CURRENT_USER: "chino_app_current_user_v2",
  MASTERED_CHARS: "chino_app_mastered_chars_v1",
  TONE_BEST: "chino_app_tone_best_v1",
};

const DEFAULT_USER: StudentScore = {
  id: "std-local",
  name: "Jorge",
  avatar: "👨‍💻",
  total_points: 0,
  quizzes_completed: 0,
  accuracy: 100,
  streak_days: 1,
  last_active: "Ahora",
};

/**
 * Los quizzes del curso (INITIAL_QUIZZES) son la fuente de verdad: si agregamos una clase
 * o corregimos preguntas, tiene que verse aunque el navegador ya tenga una copia vieja
 * guardada. Por eso mergeamos en vez de devolver el localStorage tal cual — se pisan los
 * built-in con la versión del código y se conservan los quizzes importados por JSON.
 */
export function getStoredQuizzes(): QuizData[] {
  if (typeof window === "undefined") return INITIAL_QUIZZES;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(INITIAL_QUIZZES));
      return INITIAL_QUIZZES;
    }

    const stored: QuizData[] = JSON.parse(data);
    const builtInIds = new Set(INITIAL_QUIZZES.map((q) => q.id));
    const imported = stored.filter((q) => !builtInIds.has(q.id));
    const merged = [...INITIAL_QUIZZES, ...imported];

    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(merged));
    return merged;
  } catch {
    return INITIAL_QUIZZES;
  }
}

/** Caracteres completados sin ningún error en el desafío de trazos. */
export function getMasteredChars(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MASTERED_CHARS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function markCharMastered(char: string): string[] {
  const current = getMasteredChars();
  if (current.includes(char)) return current;
  const updated = [...current, char];
  try {
    localStorage.setItem(STORAGE_KEYS.MASTERED_CHARS, JSON.stringify(updated));
  } catch {
    // storage lleno o bloqueado: el progreso no se persiste, el juego sigue andando
  }
  return updated;
}

export function saveQuiz(quiz: QuizData): QuizData[] {
  const current = getStoredQuizzes();
  const existingIdx = current.findIndex((q) => q.id === quiz.id);
  let updated: QuizData[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = quiz;
  } else {
    updated = [quiz, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(updated));
  return updated;
}

export function getCurrentUser(): StudentScore {
  if (typeof window === "undefined") return DEFAULT_USER;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_USER;
  }
}

export function setCurrentUser(student: StudentScore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(student));
}

export function updateStudentQuizScore(
  studentName: string,
  correctCount: number,
  totalCount: number,
  timeBonus: number = 0
): StudentScore[] {
  const current = getCurrentUser();
  const pointsEarned = correctCount * 100 + timeBonus;
  const currentAccuracy = Math.round((correctCount / totalCount) * 100);

  const updatedUser: StudentScore = {
    ...current,
    name: studentName,
    total_points: current.total_points + pointsEarned,
    quizzes_completed: current.quizzes_completed + 1,
    accuracy: current.quizzes_completed > 0
      ? Math.round((current.accuracy * current.quizzes_completed + currentAccuracy) / (current.quizzes_completed + 1))
      : currentAccuracy,
    last_active: "Ahora",
  };

  setCurrentUser(updatedUser);
  return [updatedUser];
}

/** Mejor puntaje en una serie del ejercicio de tonos. */
export function getToneBest(): number {
  if (typeof window === "undefined") return 0;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TONE_BEST);
    return data ? Number(data) || 0 : 0;
  } catch {
    return 0;
  }
}

export function saveToneBest(score: number): number {
  const current = getToneBest();
  if (score <= current) return current;
  try {
    localStorage.setItem(STORAGE_KEYS.TONE_BEST, String(score));
  } catch {
    // sin persistencia: el puntaje igual se muestra en la sesión
  }
  return score;
}
