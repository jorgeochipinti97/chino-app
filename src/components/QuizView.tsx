"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { QuizData, StudentScore } from "@/types";
import { speakChinese } from "@/lib/speech";
import {
  Volume2,
  Check,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle2,
} from "lucide-react";

interface QuizViewProps {
  quizzes: QuizData[];
  currentUser: StudentScore;
  onFinishQuiz: (correctCount: number, totalCount: number, timeBonus: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  quizzes,
  currentUser,
  onFinishQuiz,
}) => {
  const [activeQuizId, setActiveQuizId] = useState<string>(quizzes[0]?.id || "clase-02");
  const activeQuiz = quizzes.find((q) => q.id === activeQuizId) || quizzes[0];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const explanationRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (!isFinished) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFinished]);

  // Reset state when switching quiz
  const handleQuizChange = (quizId: string) => {
    setActiveQuizId(quizId);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setIsFinished(false);
    setElapsedSeconds(0);
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setIsFinished(false);
    setElapsedSeconds(0);
  };

  const currentQuestion = activeQuiz?.questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQuestion.correct_answer;
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }

    // Smooth scroll into explanation & continue button on mobile
    setTimeout(() => {
      explanationRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
      setIsFinished(true);
      const isPerfectScore = correctAnswersCount === activeQuiz.questions.length;
      if (isPerfectScore) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      onFinishQuiz(correctAnswersCount, activeQuiz.questions.length, 0);
    }
  };

  if (!activeQuiz || !currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-text-muted text-sm">No hay cuestionarios disponibles.</p>
      </div>
    );
  }

  const progress = Math.round(((currentIndex + (isAnswered ? 1 : 0)) / activeQuiz.questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4">
      {/* Header with Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] tracking-wide uppercase">
            Cuestionario
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-0.5">
            {activeQuiz.title}
          </h1>
        </div>

        {quizzes.length > 1 && (
          <select
            value={activeQuizId}
            onChange={(e) => handleQuizChange(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-border bg-bg-card font-semibold text-xs text-foreground outline-none cursor-pointer shadow-sm"
          >
            {quizzes.map((q) => (
              <option key={q.id} value={q.id}>
                Clase {q.lesson_number}
              </option>
            ))}
          </select>
        )}
      </div>

      {!isFinished ? (
        <div className="glass-card rounded-3xl p-5 sm:p-7 space-y-5 animate-apple-in">
          {/* Progress bar + Timer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-text-secondary">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Pregunta {currentIndex + 1} de {activeQuiz.questions.length}
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
            <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
              {currentQuestion.question}
            </h2>

            {/* If question contains a Chinese character prompt, allow listening to character ONLY */}
            {currentQuestion.hanzi && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => speakChinese(currentQuestion.hanzi!)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-border text-xs font-bold text-foreground transition-all cursor-pointer shadow-sm active:scale-95"
                  title="Escuchar carácter"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="font-chinese text-sm">{currentQuestion.hanzi}</span>
                  <span className="text-[11px] text-text-muted font-normal">(Escuchar)</span>
                </button>
              </div>
            )}
          </div>

          {/* Options List */}
          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.correct_answer;

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

              const isChineseOption = /[\u4e00-\u9fa5]/.test(option);

              return (
                <div
                  key={idx}
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
                {selectedAnswer === currentQuestion.correct_answer ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> ¡Respuesta Correcta!
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500">
                    <XCircle className="w-4 h-4" /> Respuesta Incorrecta
                  </span>
                )}

                {/* Pronunciation button of the correct answer */}
                {(currentQuestion.hanzi || currentQuestion.correct_answer.match(/[\u4e00-\u9fa5]+/)) && (
                  <button
                    type="button"
                    onClick={() => speakChinese(currentQuestion.hanzi || currentQuestion.correct_answer)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-card hover:bg-bg-tertiary border border-border text-foreground hover:border-emerald-500/50 text-xs font-bold transition-all shadow-sm cursor-pointer"
                    title="Escuchar pronunciación de la respuesta"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Pronunciación</span>
                  </button>
                )}
              </div>

              {currentQuestion.explanation && (
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border/60 pt-3">
                  <strong className="text-foreground">Explicación: </strong>
                  {currentQuestion.explanation}
                </p>
              )}

              {/* Prominent Continue Button */}
              <button
                type="button"
                onClick={handleNextQuestion}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99]"
              >
                <span>
                  {currentIndex === activeQuiz.questions.length - 1 ? "Ver Resultados Finales" : "Siguiente Pregunta"}
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
              ¡Gran trabajo, {currentUser.name}!
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
              Completaste la práctica de la {activeQuiz.title}.
            </p>
          </div>

          {/* Metrics 3-Card Grid */}
          <div className="grid grid-cols-3 gap-2.5 py-1">
            <div className="p-3.5 rounded-2xl bg-bg-secondary border border-border">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                Aciertos
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-foreground mt-0.5 block">
                {correctAnswersCount} / {activeQuiz.questions.length}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-bg-secondary border border-border">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                Precisión
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                {Math.round((correctAnswersCount / activeQuiz.questions.length) * 100)}%
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

          {/* Retry Button */}
          <div className="pt-2">
            <button
              onClick={handleRestartQuiz}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-foreground font-bold text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4 text-emerald-500" />
              <span>Hacer el Quiz de nuevo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
