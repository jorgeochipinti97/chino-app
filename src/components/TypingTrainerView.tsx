"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  convertInput,
  isCorrect,
  typingItems,
  typingLessons,
  TypingItem,
  wordsPerMinute,
} from "@/lib/typing";
import { shuffle } from "@/lib/practice";
import { speakChinese } from "@/lib/speech";
import { getTypingBest, saveTypingBest } from "@/lib/storage";
import { Volume2, RotateCcw, Trophy, Eye } from "lucide-react";

/** Largo de la serie: como una lección de AgileFingers, corta y repetible. */
const SERIES_LENGTH = 15;

type LessonKey = number | "all";

export const TypingTrainerView: React.FC = () => {
  const lessons = typingLessons();
  const [lesson, setLesson] = useState<LessonKey>(lessons[lessons.length - 1] ?? "all");
  const [series, setSeries] = useState<TypingItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  /** Se equivocó (o pidió ver el pinyin) en esta palabra: tiene que escribirla bien para seguir. */
  const [missed, setMissed] = useState(false);
  const [shake, setShake] = useState(false);
  const [firstTry, setFirstTry] = useState(0);
  const [failed, setFailed] = useState<TypingItem[]>([]);
  const [chars, setChars] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [finished, setFinished] = useState<{ wpm: number; ms: number } | null>(null);
  const [best, setBest] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const bestKey = String(lesson);

  const start = useCallback((items: TypingItem[]) => {
    setSeries(shuffle(items).slice(0, SERIES_LENGTH));
    setIdx(0);
    setTyped("");
    setMissed(false);
    setFirstTry(0);
    setFailed([]);
    setChars(0);
    setStartedAt(null);
    setFinished(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    start(typingItems(lesson === "all" ? undefined : lesson));
    setBest(getTypingBest(String(lesson)));
  }, [lesson, start]);

  // Reloj en vivo para las palabras por minuto mientras se tipea.
  useEffect(() => {
    if (!startedAt || finished) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [startedAt, finished]);

  const item = series[idx];

  // Cada palabra nueva suena sola, pero solo después de un toque (iOS bloquea el audio antes).
  useEffect(() => {
    if (item && hasInteracted) speakChinese(item.hanzi, 0.85);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, series]);

  if (!item && !finished) {
    return <div className="py-12 text-center text-sm text-text-muted font-mono">Cargando…</div>;
  }

  const onType = (value: string) => {
    if (!startedAt) setStartedAt(Date.now());
    setHasInteracted(true);
    setTyped(convertInput(value));
  };

  const submit = () => {
    if (!item || !typed.trim()) return;
    if (!isCorrect(typed, item.pinyin)) {
      if (!missed) setFailed((prev) => [...prev, item]);
      setMissed(true);
      setShake(true);
      setTimeout(() => setShake(false), 350);
      setTyped("");
      return;
    }
    const okChars = chars + item.pinyin.replace(/[\s']/g, "").length;
    const okFirst = firstTry + (missed ? 0 : 1);
    setChars(okChars);
    setFirstTry(okFirst);
    if (idx < series.length - 1) {
      setIdx(idx + 1);
      setTyped("");
      setMissed(false);
      return;
    }
    const ms = Date.now() - (startedAt ?? Date.now());
    const wpm = wordsPerMinute(okChars, ms);
    setFinished({ wpm, ms });
    setBest(saveTypingBest(bestKey, wpm));
  };

  const reveal = () => {
    if (!item || missed) return;
    setFailed((prev) => [...prev, item]);
    setMissed(true);
    inputRef.current?.focus();
  };

  const liveWpm = startedAt ? wordsPerMinute(chars, Math.max(1, (now || Date.now()) - startedAt)) : 0;
  const accuracy = (n: number, total: number) => (total ? Math.round((n / total) * 100) : 100);

  const lessonSwitch = (
    <div className="flex gap-1.5 p-1 rounded-2xl bg-bg-secondary border border-border overflow-x-auto">
      {[...lessons, "all" as const].map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => setLesson(key)}
          className={`flex-1 min-h-11 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer active:scale-[0.98] ${
            lesson === key
              ? "bg-bg-card text-foreground shadow-sm border border-border"
              : "text-text-muted hover:text-foreground"
          }`}
        >
          {key === "all" ? "Todas" : `Clase ${key}`}
        </button>
      ))}
    </div>
  );

  if (finished) {
    return (
      <div className="max-w-md mx-auto px-2 sm:px-4 py-6 space-y-4">
        {lessonSwitch}
        <div className="glass-card rounded-3xl p-6 sm:p-8 text-center space-y-5 animate-apple-in">
          <Trophy className={`w-12 h-12 mx-auto ${finished.wpm >= best ? "text-amber-500" : "text-text-muted"}`} />
          <div className="grid grid-cols-3 gap-2">
            <Stat label="Palabras/min" value={String(finished.wpm)} />
            <Stat label="Precisión" value={`${accuracy(firstTry, series.length)}%`} />
            <Stat label="Tiempo" value={`${Math.round(finished.ms / 1000)} s`} />
          </div>
          {best > 0 && (
            <p className="text-[11px] text-text-muted font-mono">
              Récord {lesson === "all" ? "en todas" : `en la clase ${lesson}`}: {best} palabras/min
            </p>
          )}
          {failed.length > 0 && (
            <div className="text-left space-y-1.5 border-t border-border/60 pt-4">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Para repasar</span>
              {failed.map((f) => (
                <div key={f.hanzi} className="flex items-baseline gap-3">
                  <span className="font-chinese text-xl text-foreground">{f.hanzi}</span>
                  <span className="font-pinyin text-sm text-text-secondary">{f.pinyin}</span>
                  <span className="text-[11px] text-text-muted truncate">{f.meaning}</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            {failed.length > 0 && (
              <button
                type="button"
                onClick={() => start(failed)}
                className="flex-1 min-h-12 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-foreground font-bold text-sm transition-all cursor-pointer active:scale-[0.99]"
              >
                Repasar las {failed.length}
              </button>
            )}
            <button
              type="button"
              onClick={() => start(typingItems(lesson === "all" ? undefined : lesson))}
              className="flex-1 flex items-center justify-center gap-2 min-h-12 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99]"
            >
              <RotateCcw className="w-4 h-4" />
              Otra serie
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4">
      <div className="space-y-1">
        <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-[11px] tracking-wide uppercase">
          Tipeo 打字
        </span>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Escribí el pinyin</h1>
        <p className="text-[11px] text-text-muted leading-relaxed">
          Ves el caracter, lo escuchás y escribís el pinyin con su tono. El número va después de la sílaba:{" "}
          <span className="font-pinyin text-text-secondary">ni3 → nǐ</span>, <span className="font-pinyin text-text-secondary">v → ü</span>, 5 = neutro. Enter para comprobar.
        </p>
      </div>

      {lessonSwitch}

      <div className="flex items-center justify-between text-xs font-semibold text-text-secondary">
        <span>
          {idx + 1} de {series.length}
        </span>
        <span className="text-text-muted font-mono">
          {liveWpm} ppm · {accuracy(firstTry, idx)}%{best > 0 && <span className="opacity-50"> · récord {best}</span>}
        </span>
      </div>
      <div className="h-1 rounded-full bg-bg-secondary overflow-hidden">
        <div className="h-full bg-teal-500 transition-all duration-200" style={{ width: `${(idx / series.length) * 100}%` }} />
      </div>

      <div className="glass-card rounded-3xl p-5 sm:p-7 space-y-5 animate-apple-in">
        <div className="text-center space-y-1">
          <button
            type="button"
            onClick={() => {
              setHasInteracted(true);
              speakChinese(item.hanzi, 0.85);
              inputRef.current?.focus();
            }}
            className="font-chinese text-6xl sm:text-7xl text-foreground leading-tight cursor-pointer"
            title="Escuchar"
          >
            {item.hanzi}
          </button>
          <p className="text-xs text-text-muted">{item.meaning}</p>
        </div>

        {missed && (
          <p className="text-center font-pinyin text-2xl text-rose-500 animate-apple-in">{item.pinyin}</p>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            value={typed}
            onChange={(e) => onType(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
              e.preventDefault();
              submit();
            }}
            enterKeyHint="done"
            placeholder={missed ? "Escribilo como arriba" : "pinyin"}
            className={`w-full text-center font-pinyin text-3xl py-4 rounded-2xl border bg-bg-secondary text-foreground outline-none transition-colors ${
              shake ? "border-rose-500 animate-shake" : "border-border focus:border-teal-500"
            }`}
          />
        </form>

        <button
          type="button"
          onClick={() => {
            submit();
            inputRef.current?.focus();
          }}
          disabled={!typed.trim()}
          className="w-full min-h-12 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Comprobar
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setHasInteracted(true);
              speakChinese(item.hanzi, 0.6);
              inputRef.current?.focus();
            }}
            className="flex-1 flex items-center justify-center gap-2 min-h-11 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-xs font-bold text-foreground transition-all cursor-pointer active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            Escuchar
          </button>
          <button
            type="button"
            onClick={reveal}
            disabled={missed}
            className="flex-1 flex items-center justify-center gap-2 min-h-11 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-xs font-bold text-foreground transition-all cursor-pointer active:scale-95 disabled:opacity-40"
          >
            <Eye className="w-4 h-4" />
            Ver pinyin
          </button>
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="p-3 rounded-2xl bg-bg-secondary border border-border">
    <span className="block text-2xl font-extrabold text-foreground tabular-nums">{value}</span>
    <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider">{label}</span>
  </div>
);
