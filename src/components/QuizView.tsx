"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import confetti from "canvas-confetti";
import { QuizData } from "@/types";
import { INITIAL_QUIZZES } from "@/data/lessons";
import { getStoredQuizzes } from "@/lib/storage";
import { useUser } from "@/lib/user-context";
import { speakChinese } from "@/lib/speech";
import {
  buildRound,
  buildRoundFromKeys,
  PracticeMode,
  RoundItem,
} from "@/lib/practice";
import { itemKey, getReviewStats, recordAnswer, ReviewStats } from "@/lib/review";
import {
  Volume2,
  Check,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  Award,
  CheckCircle2,
} from "lucide-react";

interface QuizViewProps {
  /** Cuando viene, el quiz queda clavado en esa clase y se ocultan los modos. */
  lockedLesson?: number;
}

const MODE_LABELS: Record<PracticeMode, string> = {
  lesson: "Por clase",
  mixed: "Mixto",
  review: "Repaso",
};

export const QuizView: React.FC<QuizViewProps> = ({ lockedLesson }) => {
  const { user, registerQuiz } = useUser();
  const [quizzes, setQuizzes] = useState<QuizData[]>(INITIAL_QUIZZES);
  const [mode, setMode] = useState<PracticeMode>("lesson");
  const [lessonQuizId, setLessonQuizId] = useState<string>("");

  // Los quizzes importados por JSON viven en localStorage: solo existen en el cliente.
  useEffect(() => {
    setQuizzes(getStoredQuizzes());
  }, []);
  const [round, setRound] = useState<RoundItem[]>([]);
  /** Ronda de repaso de las falladas: cambia el copy del header. */
  const [isRetryRound, setIsRetryRound] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [wrongKeys, setWrongKeys] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [stats, setStats] = useState<ReviewStats | null>(null);

  const explanationRef = useRef<HTMLDivElement>(null);

  /** Todas las preguntas del curso, para las métricas de repaso. */
  const allKeys = useMemo(
    () => quizzes.flatMap((q) => q.questions.map((question) => itemKey(q.id, question.id))),
    [quizzes]
  );

  const refreshStats = useCallback(() => {
    setStats(getReviewStats(allKeys));
  }, [allKeys]);

  const startRound = useCallback((items: RoundItem[], retry = false) => {
    setRound(items);
    setIsRetryRound(retry);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setWrongKeys([]);
    setIsFinished(false);
    setElapsedSeconds(0);
  }, []);

  /** Id del quiz que se está practicando: el de la clase fija, el elegido, o el primero. */
  const resolveQuizId = useCallback(() => {
    if (lockedLesson !== undefined) {
      return quizzes.find((q) => q.lesson_number === lockedLesson)?.id || "";
    }
    return quizzes.some((q) => q.id === lessonQuizId) ? lessonQuizId : quizzes[0]?.id || "";
  }, [quizzes, lockedLesson, lessonQuizId]);

  // El armado de la ronda mezcla al azar: tiene que correr en el cliente, después de montar.
  useEffect(() => {
    if (quizzes.length === 0) return;
    const quizId = resolveQuizId();
    if (lockedLesson !== undefined && !quizId) return;
    startRound(buildRound(quizzes, lockedLesson !== undefined ? "lesson" : mode, quizId));
    refreshStats();
  }, [quizzes, mode, lockedLesson, resolveQuizId, startRound, refreshStats]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isFinished && round.length > 0) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFinished, round.length]);

  const current = round[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered || !current) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === current.question.correct_answer;
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      setWrongKeys((prev) => (prev.includes(current.key) ? prev : [...prev, current.key]));
    }

    // Leitner: acertar sube de caja y la aleja, errar la manda a la caja 1 y vuelve hoy.
    recordAnswer(current.key, isCorrect);

    // Smooth scroll into explanation & continue button on mobile
    setTimeout(() => {
      explanationRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  };

  const handleNextQuestion = () => {
    if (currentIndex < round.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      refreshStats();
      if (correctAnswersCount === round.length) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      registerQuiz(correctAnswersCount, round.length, 0);
    }
  };

  const handleRestartRound = () => {
    startRound(buildRound(quizzes, lockedLesson !== undefined ? "lesson" : mode, resolveQuizId()));
  };

  const handleRetryWrong = () => {
    startRound(buildRoundFromKeys(quizzes, wrongKeys), true);
  };

  if (quizzes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-text-muted text-sm">No hay cuestionarios disponibles.</p>
      </div>
    );
  }

  const activeQuiz = quizzes.find((q) => q.id === resolveQuizId()) || quizzes[0];
  const showModes = lockedLesson === undefined;
  const headerTitle = isRetryRound
    ? "Repaso de las que fallaste"
    : mode === "lesson"
      ? activeQuiz.title
      : mode === "mixed"
        ? "Práctica mixta — todas las clases"
        : "Repaso del día";

  const headerHint =
    mode === "mixed"
      ? "Preguntas salteadas de todas las clases: así se parece más al examen."
      : mode === "review"
        ? "Lo vencido y lo que nunca respondiste, primero lo más atrasado."
        : null;

  if (round.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4">
        {showModes && <ModeSwitch mode={mode} setMode={setMode} dueCount={stats?.due ?? 0} />}
        <div className="glass-card rounded-3xl p-8 text-center space-y-3">
          <p className="text-sm font-bold text-foreground">
            {mode === "review" ? "Nada para repasar por ahora" : "Preparando la ronda…"}
          </p>
          {mode === "review" && stats?.nextDue && (
            <p className="text-xs text-text-secondary">
              Lo próximo vence el{" "}
              {new Date(stats.nextDue).toLocaleDateString("es-AR", {
                day: "numeric",
                month: "long",
              })}
              . Mientras tanto podés practicar por clase o en mixto.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!current) return null;

  const question = current.question;
  const progress = Math.round(((currentIndex + (isAnswered ? 1 : 0)) / round.length) * 100);
  const showLessonChip = showModes && (isRetryRound || mode !== "lesson");

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4">
      {/* Header with mode + lesson selector */}
      <div className="space-y-3 pb-3 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] tracking-wide uppercase">
              Cuestionario
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-0.5">
              {headerTitle}
            </h1>
          </div>

          {showModes && mode === "lesson" && quizzes.length > 1 && (
            <select
              value={activeQuiz.id}
              onChange={(e) => setLessonQuizId(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-border bg-bg-card font-semibold text-base sm:text-xs text-foreground outline-none cursor-pointer shadow-sm max-w-full"
            >
              {quizzes.map((q) => (
                <option key={q.id} value={q.id}>
                  Clase {q.lesson_number}
                </option>
              ))}
            </select>
          )}
        </div>

        {showModes && <ModeSwitch mode={mode} setMode={setMode} dueCount={stats?.due ?? 0} />}
        {headerHint && showModes && !isRetryRound && (
          <p className="text-[11px] text-text-muted leading-relaxed">{headerHint}</p>
        )}
      </div>

      {!isFinished ? (
        <div className="glass-card rounded-3xl p-5 sm:p-7 space-y-5 animate-apple-in">
          {/* Progress bar + Timer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-text-secondary">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Pregunta {currentIndex + 1} de {round.length}
              </span>
              <span className="flex items-center gap-1.5 text-text-muted">
                <Clock className="w-3.5 h-3.5" />
                {Math.floor(elapsedSeconds / 60)}:{(elapsedSeconds % 60).toString().padStart(2, "0")}
              </span>
            </div>

            <div className="w-full bg-bg-secondary h-2 rounded-full overflow-hidden border border-border">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Title & Audio Button (NO PINYIN SPOILERS) */}
          <div className="space-y-2.5 pt-1">
            {showLessonChip && (
              <span className="inline-block px-2 py-0.5 rounded-lg bg-bg-secondary border border-border text-[10px] font-bold text-text-muted uppercase tracking-wider">
                Clase 0{current.lessonNumber}
              </span>
            )}

            <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
              {question.question}
            </h2>

            {/* If question contains a Chinese character prompt, allow listening to character ONLY */}
            {question.hanzi && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => speakChinese(question.hanzi!)}
                  className="inline-flex items-center gap-2 px-3 min-h-11 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-border text-xs font-bold text-foreground transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Escuchar carácter"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-chinese text-sm">{question.hanzi}</span>
                  <span className="text-[11px] text-text-muted font-normal">(Escuchar)</span>
                </button>
              </div>
            )}
          </div>

          {/* Options List — el orden se mezcla por ronda: si quedara fijo se aprende la posición */}
          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {current.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === question.correct_answer;

              let cardClasses =
                "border-border bg-bg-secondary hover:bg-bg-tertiary hover:border-border-strong text-foreground";
              let badgeClasses = "bg-bg-card text-text-secondary border border-border";

              if (isAnswered) {
                if (isCorrectOption) {
                  cardClasses =
                    "border-2 border-emerald-500 bg-emerald-500/15 text-foreground font-semibold shadow-apple-glow";
                  badgeClasses = "bg-emerald-500 text-white font-bold border-transparent";
                } else if (isSelected && !isCorrectOption) {
                  cardClasses =
                    "border-2 border-rose-500 bg-rose-500/15 text-foreground font-semibold";
                  badgeClasses = "bg-rose-500 text-white font-bold border-transparent";
                } else {
                  cardClasses = "border-border opacity-40 bg-bg-secondary text-text-muted";
                }
              } else if (isSelected) {
                cardClasses = "border-2 border-emerald-500 bg-emerald-500/10 text-foreground";
                badgeClasses = "bg-emerald-500 text-white font-bold border-transparent";
              }

              const isChineseOption = /[一-龥]/.test(option);

              return (
                <div
                  key={option}
                  onClick={() => !isAnswered && handleSelectOption(option)}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left flex items-center justify-between gap-3 text-sm sm:text-base font-medium transition-all duration-200 min-h-[52px] select-none ${cardClasses} ${
                    !isAnswered ? "cursor-pointer active:scale-[0.99]" : "cursor-default"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-200 ${badgeClasses}`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-chinese leading-snug">{option}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Audio button ONLY when option is in Chinese */}
                    {isChineseOption && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakChinese(option);
                        }}
                        className="p-2 rounded-xl bg-bg-card hover:bg-bg-tertiary text-text-muted hover:text-emerald-500 border border-border transition-all duration-200 shrink-0 cursor-pointer shadow-sm active:scale-95"
                        title="Escuchar pronunciación"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                      </button>
                    )}

                    {isAnswered && isCorrectOption && (
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm shrink-0">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-sm shrink-0">
                        <XCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explanation & Next Action Box */}
          {isAnswered && (
            <div
              ref={explanationRef}
              className="p-4 sm:p-5 rounded-2xl bg-bg-secondary border border-border space-y-4 animate-apple-in"
            >
              <div className="flex items-center justify-between gap-2">
                {selectedAnswer === question.correct_answer ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> ¡Respuesta Correcta!
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500">
                    <XCircle className="w-4 h-4" /> Respuesta Incorrecta
                  </span>
                )}

                {/* Pronunciation button of the correct answer */}
                {(question.hanzi || question.correct_answer.match(/[一-龥]+/)) && (
                  <button
                    type="button"
                    onClick={() => speakChinese(question.hanzi || question.correct_answer)}
                    className="flex items-center gap-1.5 px-3 min-h-11 rounded-xl bg-bg-card hover:bg-bg-tertiary border border-border text-foreground hover:border-emerald-500/50 text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                    title="Escuchar pronunciación de la respuesta"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Pronunciación</span>
                  </button>
                )}
              </div>

              {question.explanation && (
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border/60 pt-3">
                  <strong className="text-foreground">Explicación: </strong>
                  {question.explanation}
                </p>
              )}

              {/* Prominent Continue Button */}
              <button
                type="button"
                onClick={handleNextQuestion}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99]"
              >
                <span>
                  {currentIndex === round.length - 1 ? "Ver Resultados Finales" : "Siguiente Pregunta"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="glass-card rounded-3xl p-6 sm:p-10 text-center space-y-6 animate-apple-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-400 flex items-center justify-center text-white shadow-apple-glow">
            <Award className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="space-y-1.5">
            <span className="px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
              ¡Completado!
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              ¡Gran trabajo, {user.name}!
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
              {headerTitle} · {round.length} preguntas.
            </p>
          </div>

          {/* Metrics 3-Card Grid */}
          <div className="grid grid-cols-3 gap-2.5 py-1">
            <div className="p-3.5 rounded-2xl bg-bg-secondary border border-border">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                Aciertos
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-foreground mt-0.5 block">
                {correctAnswersCount} / {round.length}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-bg-secondary border border-border">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                Precisión
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                {Math.round((correctAnswersCount / round.length) * 100)}%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-bg-secondary border border-border">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                Tiempo
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-amber-500 mt-0.5 block">
                {Math.floor(elapsedSeconds / 60)}:{(elapsedSeconds % 60).toString().padStart(2, "0")}
              </span>
            </div>
          </div>

          {stats && (
            <p className="text-[11px] text-text-muted">
              Repaso: {stats.due} pendientes · {stats.mastered} dominadas de {allKeys.length}
            </p>
          )}

          <div className="pt-2 space-y-2.5">
            {/* Repasar SOLO las falladas: es donde está el aprendizaje real */}
            {wrongKeys.length > 0 && (
              <button
                onClick={handleRetryWrong}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>
                  {wrongKeys.length === 1
                    ? "Repasar la que fallaste"
                    : `Repasar las ${wrongKeys.length} que fallaste`}
                </span>
              </button>
            )}

            <button
              onClick={handleRestartRound}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-foreground font-bold text-sm transition-all cursor-pointer active:scale-[0.99]"
            >
              <RotateCcw className="w-4 h-4 text-emerald-500" />
              <span>Ronda nueva (se vuelven a mezclar)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ModeSwitch: React.FC<{
  mode: PracticeMode;
  setMode: (mode: PracticeMode) => void;
  dueCount: number;
}> = ({ mode, setMode, dueCount }) => (
  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-bg-secondary border border-border">
    {(Object.keys(MODE_LABELS) as PracticeMode[]).map((key) => {
      const isActive = mode === key;
      return (
        <button
          key={key}
          type="button"
          onClick={() => setMode(key)}
          className={`min-h-11 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-[0.98] ${
            isActive
              ? "bg-bg-card text-foreground shadow-sm border border-border"
              : "text-text-muted hover:text-foreground"
          }`}
        >
          {MODE_LABELS[key]}
          {key === "review" && dueCount > 0 && (
            <span className="ml-1.5 px-1.5 py-0.5 rounded-md bg-emerald-500 text-white text-[10px]">
              {dueCount}
            </span>
          )}
        </button>
      );
    })}
  </div>
);
