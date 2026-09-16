"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LESSON_MATERIALS, INITIAL_QUIZZES } from "@/data/lessons";
import { STROKE_SETS } from "@/data/strokes";
import { SUBSTITUTION_SETS } from "@/data/sentences";
import { LessonNotesView } from "@/components/LessonNotesView";
import { QuizView } from "@/components/QuizView";
import { StrokeGameView } from "@/components/StrokeGameView";
import { SentenceDrillView } from "@/components/SentenceDrillView";
import { NumberTrainerView } from "@/components/NumberTrainerView";
import { lessonHref } from "@/lib/routes";
import { BookOpen, CheckSquare, Brush, MessageSquare, Hash, ChevronLeft, ChevronRight } from "lucide-react";

/** El entrenador de números es de la clase donde se vieron. */
export const NUMBERS_LESSON = 4;

type SectionKey = "notes" | "quiz" | "strokes" | "sentences" | "numbers";

const SECTION_META: Record<SectionKey, { label: string; icon: typeof BookOpen; accent: string }> = {
  notes: { label: "Apuntes", icon: BookOpen, accent: "bg-teal-500" },
  quiz: { label: "Quiz", icon: CheckSquare, accent: "bg-emerald-500" },
  strokes: { label: "Trazos", icon: Brush, accent: "bg-rose-500" },
  sentences: { label: "Oraciones", icon: MessageSquare, accent: "bg-orange-500" },
  numbers: { label: "Números", icon: Hash, accent: "bg-sky-500" },
};

export const LessonView: React.FC<{ lessonNumber: number }> = ({ lessonNumber }) => {
  const [section, setSection] = useState<SectionKey>("notes");

  // Al cambiar de clase se vuelve a los apuntes: es el punto de entrada natural.
  useEffect(() => {
    setSection("notes");
  }, [lessonNumber]);

  const material = LESSON_MATERIALS.find((m) => m.lesson_number === lessonNumber);
  const quiz = INITIAL_QUIZZES.find((q) => q.lesson_number === lessonNumber);
  const strokeSets = STROKE_SETS.filter((s) => s.lesson_number === lessonNumber);
  const sentenceSets = SUBSTITUTION_SETS.filter((s) => s.lesson_number === lessonNumber);

  const sections = useMemo(() => {
    const available: { key: SectionKey; count?: string }[] = [{ key: "notes" }];
    if (quiz) available.push({ key: "quiz", count: `${quiz.questions.length}` });
    if (strokeSets.length) {
      available.push({
        key: "strokes",
        count: `${strokeSets.reduce((acc, s) => acc + s.characters.length, 0)}`,
      });
    }
    if (sentenceSets.length) {
      available.push({
        key: "sentences",
        count: `${sentenceSets.reduce((acc, s) => acc + s.items.length, 0)}`,
      });
    }
    if (lessonNumber === NUMBERS_LESSON) available.push({ key: "numbers" });
    return available;
  }, [quiz, strokeSets, sentenceSets, lessonNumber]);

  if (!material) return null;

  const lessons = LESSON_MATERIALS.map((m) => m.lesson_number).sort((a, b) => a - b);
  const idx = lessons.indexOf(lessonNumber);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Cabecera de la clase */}
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
          <Link href="/" className="hover:text-teal-500 transition-colors">
            Clases
          </Link>
          <span>/</span>
          <span className="text-teal-500 font-semibold">Clase 0{lessonNumber}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-mono">
          {material.title.replace(/^Clase\s*\d+\s*:\s*/i, "")}
        </h1>

        {/* Secciones de la clase */}
        <div className="flex flex-wrap gap-2">
          {sections.map(({ key, count }) => {
            const { label, icon: Icon, accent } = SECTION_META[key];
            const active = section === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSection(key)}
                className={`flex items-center gap-2 px-3 min-h-11 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer active:scale-[0.98] ${
                  active
                    ? `${accent} text-white border-transparent shadow-apple-glow`
                    : "border-border bg-bg-card text-text-secondary hover:text-foreground hover:bg-bg-secondary"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
                {count && (
                  <span
                    className={`text-[10px] px-1.5 rounded-full ${
                      active ? "bg-white/20" : "bg-bg-secondary text-text-muted"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Contenido */}
      <div>
        {section === "notes" && <LessonNotesView selectedLesson={lessonNumber} />}
        {section === "quiz" && <QuizView lockedLesson={lessonNumber} />}
        {section === "strokes" && <StrokeGameView lessonNumber={lessonNumber} />}
        {section === "sentences" && <SentenceDrillView lessonNumber={lessonNumber} />}
        {section === "numbers" && <NumberTrainerView />}
      </div>

      {/* Pasar de clase */}
      <nav className="flex items-center justify-between gap-3 pt-4 border-t border-border">
        {prev ? (
          <Link
            href={lessonHref(prev)}
            className="flex items-center gap-2 px-3 min-h-11 rounded-xl border border-border bg-bg-card hover:bg-bg-secondary text-xs font-mono font-bold text-foreground transition-all active:scale-[0.98]"
          >
            <ChevronLeft className="w-4 h-4 text-teal-500" />
            <span>Clase 0{prev}</span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={lessonHref(next)}
            className="flex items-center gap-2 px-3 min-h-11 rounded-xl border border-border bg-bg-card hover:bg-bg-secondary text-xs font-mono font-bold text-foreground transition-all active:scale-[0.98]"
          >
            <span>Clase 0{next}</span>
            <ChevronRight className="w-4 h-4 text-teal-500" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
};
