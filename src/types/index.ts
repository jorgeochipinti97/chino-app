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
}
