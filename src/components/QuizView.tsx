"use client";

import React, { useState, useEffect } from "react";
import { QuizData, StudentScore } from "@/types";
import { speakChinese } from "@/lib/speech";
import {
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  Sparkles,
  Clock,
  Flame,
  Check,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";

interface QuizViewProps {
  quizzes: QuizData[];
  currentUser: StudentScore;
  onFinishQuiz: (scoreCount: number, totalQuestions: number, timeBonus: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  quizzes,
  currentUser,
  onFinishQuiz,
}) => {
  const [selectedQuizId, setSelectedQuizId] = useState<string>(quizzes[0]?.id || "clase-02");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const activeQuiz = quizzes.find((q) => q.id === selectedQuizId) || quizzes[0];
  const currentQuestion = activeQuiz?.questions[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setIsFinished(false);
    setStartTime(Date.now());
  }, [selectedQuizId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isFinished) {
      timer = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isFinished, startTime]);

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQuestion.correct_answer;
    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const timeBonus = Math.max(0, 100 - Math.floor(elapsedSeconds / 2));

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10b981", "#3b82f6", "#f59e0b", "#ec4899"],
        });
      } catch {
        // ignore
      }

      onFinishQuiz(correctAnswersCount, activeQuiz.questions.length, timeBonus);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setIsFinished(false);
    setStartTime(Date.now());
  };

  if (!activeQuiz || !currentQuestion) {
    return (
      <div className="p-8 text-center text-text-muted">
        No hay cuestionarios cargados. Importa un JSON para comenzar.
      </div>
    );
  }

  const progress = Math.round(((currentIndex + (isAnswered ? 1 : 0)) / activeQuiz.questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header & Lesson Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] tracking-wide uppercase">
              Clase {activeQuiz.lesson_number}
            </span>
            <span className="text-xs text-text-muted font-medium">Cuestionario</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
            {activeQuiz.title}
          </h1>
        </div>

        {/* Selector */}
        <div className="flex items-center gap-2">
          <select
            id="quiz-select"
            value={selectedQuizId}
            onChange={(e) => setSelectedQuizId(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-border bg-bg-card font-semibold text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 cursor-pointer shadow-apple-sm"
          >
            {quizzes.map((q) => (
              <option key={q.id} value={q.id}>
                Clase {q.lesson_number}: {q.title.replace(/Quiz\s*[-/]?\s*/i, "")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!isFinished ? (
        <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 animate-apple-in">
          {/* Progress bar + Question Counter */}
          <div className="space-y-3">
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

            <div className="w-full bg-bg-secondary h-2.5 rounded-full overflow-hidden p-0.5 border border-border">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Title & Pronunciation Hero */}
          <div className="space-y-4 pt-1">
            <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
              {currentQuestion.question}
            </h2>

            {/* Character Showcase Card with Audio */}
            {(currentQuestion.hanzi || currentQuestion.pinyin) && (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-bg-secondary border border-border">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-chinese font-bold text-emerald-600 dark:text-emerald-400">
                    {currentQuestion.hanzi}
                  </span>
                  {currentQuestion.pinyin && (
                    <span className="text-xs font-semibold text-text-secondary">
                      [{currentQuestion.pinyin}]
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    speakChinese(
                      currentQuestion.hanzi || currentQuestion.pinyin || currentQuestion.correct_answer
                    )
                  }
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bg-card hover:bg-bg-tertiary border border-border text-foreground hover:border-emerald-500/50 text-xs font-bold transition-all duration-200 min-h-[38px] shadow-sm tactile-btn cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-emerald-500" />
                  <span>Escuchar</span>
                </button>
              </div>
            )}
          </div>

          {/* Options List */}
          <div className="grid grid-cols-1 gap-3 pt-2">
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

              return (
                <div
                  key={idx}
                  onClick={() => !isAnswered && handleSelectOption(option)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 text-sm sm:text-base font-medium transition-all duration-200 min-h-[56px] select-none ${cardClasses} ${
                    !isAnswered ? "cursor-pointer active:scale-[0.99]" : "cursor-default"
                  }`}
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-200 ${badgeClasses}`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-chinese leading-snug">{option}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
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

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-bg-secondary border border-border space-y-2 animate-apple-in">
              <div className="flex items-center gap-2">
                {selectedAnswer === currentQuestion.correct_answer ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> ¡Respuesta Correcta!
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500">
                    <XCircle className="w-4 h-4" /> Respuesta Incorrecta
                  </span>
                )}
              </div>
              {currentQuestion.explanation && (
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  <strong className="text-foreground">Explicación: </strong>
                  {currentQuestion.explanation}
                </p>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-2 flex items-center justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className={`flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 min-h-[50px] tactile-btn ${
                isAnswered
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-apple-glow cursor-pointer"
                  : "bg-bg-tertiary text-text-muted cursor-not-allowed opacity-50"
              }`}
            >
              <span>
                {currentIndex === activeQuiz.questions.length - 1 ? "Ver Resultados" : "Continuar"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="glass-card rounded-3xl p-8 sm:p-10 text-center space-y-7 animate-apple-in">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-400 flex items-center justify-center text-white shadow-apple-glow">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
              ¡Cuestionario Completado!
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              ¡Gran trabajo, {currentUser.name}!
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
              Completaste la práctica de la {activeQuiz.title}.
            </p>
          </div>

          {/* Metrics 3-Card Grid */}
          <div className="grid grid-cols-3 gap-3 py-2">
            <div className="p-4 rounded-2xl bg-bg-secondary border border-border">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block">
                Aciertos
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-foreground mt-1 block">
                {correctAnswersCount} / {activeQuiz.questions.length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-bg-secondary border border-border">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block">
                Precisión
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
                {Math.round((correctAnswersCount / activeQuiz.questions.length) * 100)}%
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-bg-secondary border border-border">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block">
                Tiempo
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-amber-500 mt-1 block">
                {Math.floor(elapsedSeconds / 60)}:{(elapsedSeconds % 60).toString().padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-foreground font-bold text-xs sm:text-sm transition-all duration-200 min-h-[48px] tactile-btn cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-text-muted" />
              <span>Volver a intentar</span>
            </button>

            <button
              onClick={() => {
                const nextQuiz = quizzes.find((q) => q.id !== selectedQuizId);
                if (nextQuiz) setSelectedQuizId(nextQuiz.id);
                else handleRestart();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-apple-glow transition-all duration-200 min-h-[48px] tactile-btn cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Practicar otra clase</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
