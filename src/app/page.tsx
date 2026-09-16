import Link from "next/link";
import { LESSON_MATERIALS, INITIAL_QUIZZES } from "@/data/lessons";
import { STROKE_SETS } from "@/data/strokes";
import { SUBSTITUTION_SETS } from "@/data/sentences";
import { lessonHref } from "@/lib/routes";
import { CheckSquare, Brush, Ear, Hash, MessageSquare, ArrowRight } from "lucide-react";

const TOOLS = [
  { href: "/practicar", label: "Quizzes", hint: "Por clase, mixto o repaso", icon: CheckSquare, accent: "text-emerald-500" },
  { href: "/trazos", label: "Trazos", hint: "Escribir los caracteres", icon: Brush, accent: "text-rose-500" },
  { href: "/tonos", label: "Tonos", hint: "Marcar la vocal", icon: Ear, accent: "text-violet-500" },
  { href: "/numeros", label: "Números", hint: "Dictado y armado", icon: Hash, accent: "text-sky-500" },
  { href: "/oraciones", label: "Oraciones", hint: "Cambiar el pronombre", icon: MessageSquare, accent: "text-orange-500" },
];

export default function Home() {
  const lessons = [...LESSON_MATERIALS].sort((a, b) => b.lesson_number - a.lesson_number);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="space-y-2">
        <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-[11px] tracking-wide uppercase">
          Curso de chino
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-mono">
          Clases
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Cada clase tiene su apunte, su quiz y sus ejercicios en una sola página.
        </p>
      </header>

      {/* Índice de clases, la más nueva primero */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {lessons.map((lesson) => {
          const quiz = INITIAL_QUIZZES.find((q) => q.lesson_number === lesson.lesson_number);
          const chars = STROKE_SETS.filter((s) => s.lesson_number === lesson.lesson_number).reduce(
            (acc, s) => acc + s.characters.length,
            0
          );
          const drills = SUBSTITUTION_SETS.filter(
            (s) => s.lesson_number === lesson.lesson_number
          ).reduce((acc, s) => acc + s.items.length, 0);

          return (
            <Link
              key={lesson.id}
              href={lessonHref(lesson.lesson_number)}
              className="group p-4 rounded-2xl border border-border bg-bg-card hover:border-teal-500/40 hover:bg-bg-secondary transition-all active:scale-[0.99] flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-bold text-teal-500">
                  Clase 0{lesson.lesson_number}
                </span>
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-teal-500 transition-colors" />
              </div>

              <h2 className="text-sm font-bold text-foreground leading-snug">
                {lesson.title.replace(/^Clase\s*\d+\s*:\s*/i, "")}
              </h2>

              <p className="text-[11px] text-text-muted leading-relaxed">{lesson.summary}</p>

              <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
                {quiz && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {quiz.questions.length} preguntas
                  </span>
                )}
                {chars > 0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
                    {chars} caracteres
                  </span>
                )}
                {drills > 0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500">
                    {drills} oraciones
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Ejercicios sueltos, con todo el curso mezclado */}
      <section className="space-y-3">
        <h2 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
          Practicar todo junto
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TOOLS.map(({ href, label, hint, icon: Icon, accent }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 p-3 min-h-11 rounded-xl border border-border bg-bg-card hover:bg-bg-secondary transition-all active:scale-[0.99]"
            >
              <Icon className={`w-4 h-4 shrink-0 ${accent}`} />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-foreground">{label}</span>
                <span className="block text-[11px] text-text-muted">{hint}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
