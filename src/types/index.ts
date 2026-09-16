export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
  hanzi?: string;
  pinyin?: string;
}

export interface QuizData {
  id: string;
  title: string;
  lesson_number: number;
  description?: string;
  total_questions: number;
  questions: Question[];
}

export interface SurveyQuestion {
  id: string;
  type: "rating" | "single_choice" | "text" | "multiple_choice";
  prompt: string;
  options?: string[];
}

export interface ClassSurvey {
  id: string;
  lesson_id: string;
  lesson_number: number;
  title: string;
  questions: SurveyQuestion[];
}

export interface SurveySubmission {
  id: string;
  lesson_id: string;
  student_name: string;
  submitted_at: string;
  answers: Record<string, string | number | string[]>;
}

export interface StudentScore {
  id: string;
  name: string;
  avatar: string;
  total_points: number;
  quizzes_completed: number;
  accuracy: number; // 0 - 100
  streak_days: number;
  last_active: string;
}

export interface LessonNoteItem {
  pinyin: string;
  hanzi: string;
  type?: string;
  pronunciation?: string;
  meaning: string;
}

export interface LessonMaterial {
  id: string;
  lesson_number: number;
  title: string;
  summary: string;
  sections: {
    title: string;
    description?: string;
    items: LessonNoteItem[];
  }[];
  grammar_tips: string[];
  /** Material extra de la clase (videos, canciones, PDFs). */
  resources?: {
    label: string;
    url: string;
    note?: string;
  }[];
}

export interface StrokeCharacter {
  hanzi: string;
  pinyin: string;
  meaning: string;
  /** Regla de orden de trazos que ilustra este caracter (opcional). */
  rule?: string;
}

export interface StrokeSet {
  id: string;
  lesson_number: number;
  title: string;
  description: string;
  characters: StrokeCharacter[];
}

/** Un ítem del drill de sustitución: misma oración, otro pronombre. */
export interface SubstitutionItem {
  id: string;
  /** Oración de partida. Vacía cuando hay que armarla desde cero. */
  base_hanzi: string;
  base_pinyin: string;
  base_meaning: string;
  /** Lo que hay que meter en su lugar (o la consigna, si no hay oración base). */
  swap: string;
  swap_meaning: string;
  /** Respuesta correcta, ficha por ficha. 们 va siempre como ficha aparte. */
  tokens: string[];
  /** Signo final, que el ejercicio agrega solo. */
  punctuation?: string;
  answer_pinyin: string;
  answer_meaning: string;
  /** La regla que explica el ítem, para el feedback. */
  note?: string;
}

export interface SubstitutionSet {
  id: string;
  lesson_number: number;
  title: string;
  description: string;
  /** Fichas posibles del set: de acá salen los distractores del banco. */
  pool: string[];
  items: SubstitutionItem[];
}
