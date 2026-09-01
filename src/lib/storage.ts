import { QuizData, StudentScore } from "@/types";
import { INITIAL_QUIZZES } from "@/data/lessons";

const STORAGE_KEYS = {
  QUIZZES: "chino_app_quizzes_v2",
  CURRENT_USER: "chino_app_current_user_v2",
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

export function getStoredQuizzes(): QuizData[] {
  if (typeof window === "undefined") return INITIAL_QUIZZES;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(INITIAL_QUIZZES));
      return INITIAL_QUIZZES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_QUIZZES;
  }
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
