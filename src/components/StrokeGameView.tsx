"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import type HanziWriterType from "hanzi-writer";
import type { CharacterJson } from "hanzi-writer";
import { STROKE_SETS } from "@/data/strokes";
import { speakChinese } from "@/lib/speech";
import { getMasteredChars, markCharMastered } from "@/lib/storage";
import {
  Volume2,
  Eye,
  RotateCcw,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Check,
  Brush,
  Trophy,
} from "lucide-react";

const CANVAS_SIZE = 340;
// Trazo grueso: en celular se dibuja con el dedo, no con un mouse.
const DRAWING_WIDTH = 32;

// El trazo ya escrito va migrando de teal a violeta a medida que avanzás: efecto "paint".
const PAINT_RAMP = ["#14b8a6", "#10b981", "#22c55e", "#eab308", "#f97316", "#ec4899", "#a855f7"];

const paintColor = (done: number, total: number) => {
  if (total <= 1) return PAINT_RAMP[0];
  const idx = Math.round((done / total) * (PAINT_RAMP.length - 1));
  return PAINT_RAMP[Math.min(idx, PAINT_RAMP.length - 1)];
};

interface StrokeGameViewProps {
  /** Cuando viene, solo se practican los sets de esa clase. */
  lessonNumber?: number;
}

export const StrokeGameView: React.FC<StrokeGameViewProps> = ({ lessonNumber }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriterType | null>(null);

  const [setIdx, setSetIdx] = useState<number>(0);
  const [charIdx, setCharIdx] = useState<number>(0);
  const [strokesDone, setStrokesDone] = useState<number>(0);
  const [totalStrokes, setTotalStrokes] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [mastered, setMastered] = useState<string[]>([]);

  const sets =
    lessonNumber === undefined
      ? STROKE_SETS
      : STROKE_SETS.filter((set) => set.lesson_number === lessonNumber);
  const activeSet = sets[setIdx] || sets[0];
  const activeChar = activeSet.characters[charIdx];

  useEffect(() => {
    setMastered(getMasteredChars());
  }, []);

  // Carga los trazos desde public/hanzi-data (copiados por scripts/copy-hanzi-data.mjs)
  const charDataLoader = useCallback(
    (char: string, onLoad: (data: CharacterJson) => void, onErr: () => void) => {
      fetch(`/hanzi-data/${encodeURIComponent(char)}.json`)
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error("404"))))
        .then(onLoad)
        .catch(() => onErr());
    },
    []
  );

  const startQuiz = useCallback(
    (writer: HanziWriterType) => {
      setStrokesDone(0);
      setMistakes(0);
      setIsComplete(false);
      writer.updateColor("strokeColor", PAINT_RAMP[0], { duration: 0 });

      writer.quiz({
        showHintAfterMisses: 2,
        onCorrectStroke: ({ strokesRemaining }) => {
          setStrokesDone((prev) => {
            const done = prev + 1;
            const total = done + strokesRemaining;
            setTotalStrokes(total);
            writer.updateColor("strokeColor", paintColor(done, total), { duration: 320 });
            return done;
          });
        },
        onMistake: () => setMistakes((prev) => prev + 1),
        onComplete: ({ totalMistakes }) => {
          setIsComplete(true);
          speakChinese(activeChar.hanzi);
          if (totalMistakes === 0) {
            setMastered(markCharMastered(activeChar.hanzi));
          }
        },
      });
    },
    [activeChar.hanzi]
  );

  useEffect(() => {
    let cancelled = false;
    const node = targetRef.current;
    if (!node) return;

    node.innerHTML = "";
    setStrokesDone(0);
    setMistakes(0);
    setIsComplete(false);
    setTotalStrokes(0);

    import("hanzi-writer").then(({ default: HanziWriter }) => {
      if (cancelled || !targetRef.current) return;

      const writer = HanziWriter.create(targetRef.current, activeChar.hanzi, {
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        padding: 16,
        showCharacter: false,
        showOutline: true, // el "ghost" del caracter atrás
        showHintAfterMisses: 2,
        strokeColor: PAINT_RAMP[0],
        outlineColor: "#cbd5e1",
        drawingColor: "#f59e0b", // el pincel mientras arrastrás el dedo
        highlightColor: "#38bdf8",
        drawingWidth: DRAWING_WIDTH,
        strokeAnimationSpeed: 1.1,
        delayBetweenStrokes: 180,
        charDataLoader,
      });

      // SVG responsive + sin scroll al dibujar con el dedo
      const svg = targetRef.current.querySelector("svg");
      if (svg) {
        svg.setAttribute("viewBox", `0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`);
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.touchAction = "none";
        svg.style.overscrollBehavior = "contain";
        svg.style.cursor = "crosshair";
      }

      writerRef.current = writer;
      startQuiz(writer);
    });

    return () => {
      cancelled = true;
      writerRef.current = null;
      if (node) node.innerHTML = "";
    };
  }, [activeChar.hanzi, charDataLoader, startQuiz]);

  const handleRetry = () => {
    const writer = writerRef.current;
    if (!writer) return;
    writer.cancelQuiz();
    startQuiz(writer);
  };

  const handleShowAnimation = () => {
    const writer = writerRef.current;
    if (!writer) return;
    writer.cancelQuiz();
    writer.updateColor("strokeColor", PAINT_RAMP[0], { duration: 0 });
    writer.animateCharacter({
      onComplete: () => startQuiz(writer),
    });
  };

  const handleHint = () => {
    const writer = writerRef.current;
    if (!writer) return;
    writer.highlightStroke(strokesDone);
  };

  const goToChar = (nextIdx: number) => {
    const len = activeSet.characters.length;
    setCharIdx(((nextIdx % len) + len) % len);
  };

  const handleSelectSet = (idx: number) => {
    setSetIdx(idx);
    setCharIdx(0);
  };

  const progressPct = totalStrokes > 0 ? Math.round((strokesDone / totalStrokes) * 100) : 0;
  const masteredInSet = activeSet.characters.filter((c) => mastered.includes(c.hanzi)).length;

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 py-4 sm:py-6 space-y-6 animate-apple-in">
      {/* Header */}
      <header className="space-y-3 pb-5 border-b border-border">
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
          <span>Práctica</span>
          <span>/</span>
          <span className="text-rose-500 font-semibold">Trazos</span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-mono">
            Desafío de Trazos
          </h1>
          <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-[11px] font-bold border border-rose-500/20">
            笔顺
          </span>
        </div>

        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-3xl">
          Seguí el <strong>ghost gris</strong> con el dedo o el mouse. Cada trazo se pinta al acertar y
          el color va cambiando a medida que completás el caracter. El orden importa: si lo hacés al
          revés, no cuenta.
        </p>
      </header>

      {/* Selector de set */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sets.map((set, idx) => (
          <button
            key={set.id}
            onClick={() => handleSelectSet(idx)}
            className={`shrink-0 px-3.5 min-h-11 rounded-xl text-xs font-mono font-bold border transition-all duration-200 cursor-pointer active:scale-95 ${
              idx === setIdx
                ? "bg-rose-500 text-white border-rose-500 shadow-apple-glow"
                : "bg-bg-card text-text-secondary border-border hover:border-rose-500/40 hover:text-foreground"
            }`}
          >
            <span className="opacity-60 mr-1.5">0{set.lesson_number}</span>
            {set.title}
          </button>
        ))}
      </div>

      <p className="text-xs text-text-muted font-mono leading-relaxed">{activeSet.description}</p>

      {/* Chips de caracteres del set */}
      <div className="flex flex-wrap gap-2">
        {activeSet.characters.map((c, idx) => {
          const isActive = idx === charIdx;
          const isMastered = mastered.includes(c.hanzi);
          return (
            <button
              key={c.hanzi}
              onClick={() => setCharIdx(idx)}
              title={`${c.pinyin} — ${c.meaning}`}
              className={`relative w-[52px] h-[52px] rounded-xl border font-chinese text-2xl font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive
                  ? "bg-rose-500 text-white border-rose-500 shadow-apple-glow"
                  : "bg-bg-card text-foreground border-border hover:border-rose-500/40"
              }`}
            >
              {c.hanzi}
              {isMastered && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" strokeWidth={4} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tablero */}
      <div className="rounded-2xl border border-border bg-bg-card shadow-sm overflow-hidden">
        {/* Datos del caracter */}
        <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 font-pinyin text-xs font-bold">
                {activeChar.pinyin}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-foreground">
                {activeChar.meaning}
              </span>
            </div>
            {activeChar.rule && (
              <span className="text-[11px] text-text-muted font-mono block mt-1.5">
                📏 Regla {activeChar.rule}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => speakChinese(activeChar.hanzi)}
            className="flex items-center gap-1.5 px-3 min-h-11 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-border text-foreground hover:border-rose-500/50 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
            title="Escuchar pronunciación"
          >
            <Volume2 className="w-3.5 h-3.5 text-rose-500" />
            <span className="font-mono text-[11px]">Audio</span>
          </button>
        </div>

        {/* Canvas con papel cuadriculado (米字格) */}
        <div className="p-4 sm:p-6 flex justify-center bg-bg-secondary/40">
          <div className="relative w-full max-w-[340px] aspect-square rounded-2xl bg-white dark:bg-zinc-900 border border-border overflow-hidden touch-none overscroll-contain select-none">
            {/* Guías del 米字格 */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none text-zinc-300 dark:text-zinc-700"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" />
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 4" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 4" />
            </svg>

            <div ref={targetRef} className="absolute inset-0 w-full h-full" />

            {isComplete && (
              <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
                <div
                  className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold shadow-lg animate-apple-in ${
                    mistakes === 0
                      ? "bg-emerald-500 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {mistakes === 0
                    ? "¡Perfecto! Trazos en orden ✓"
                    : `Completado con ${mistakes} ${mistakes === 1 ? "error" : "errores"}`}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progreso */}
        <div className="px-4 sm:px-6 pb-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted mb-1.5">
            <span>
              Trazo {Math.min(strokesDone + (isComplete ? 0 : 1), totalStrokes || 1)} de{" "}
              {totalStrokes || "…"}
            </span>
            <span className={mistakes > 0 ? "text-amber-500" : ""}>
              {mistakes > 0 ? `${mistakes} ${mistakes === 1 ? "error" : "errores"}` : "sin errores"}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-bg-tertiary overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progressPct}%`,
                backgroundColor: paintColor(strokesDone, totalStrokes || 1),
              }}
            />
          </div>
        </div>

        {/* Controles */}
        <div className="p-4 sm:p-5 flex flex-wrap items-center gap-2">
          <button
            onClick={handleShowAnimation}
            className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 min-h-11 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-border text-foreground text-xs font-bold font-mono transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-sky-500" />
            Ver cómo se escribe
          </button>

          <button
            onClick={handleHint}
            className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 min-h-11 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-border text-foreground text-xs font-bold font-mono transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            Pista
          </button>

          <button
            onClick={handleRetry}
            className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 min-h-11 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-border text-foreground text-xs font-bold font-mono transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
            Reintentar
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToChar(charIdx - 1)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-border text-foreground transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
              title="Caracter anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => goToChar(charIdx + 1)}
              className={`flex items-center gap-1.5 px-4 min-h-11 rounded-xl text-xs font-bold font-mono transition-all shadow-sm active:scale-95 cursor-pointer ${
                isComplete
                  ? "bg-rose-500 text-white border border-rose-500 shadow-apple-glow"
                  : "bg-bg-secondary hover:bg-bg-tertiary border border-border text-foreground"
              }`}
              title="Siguiente caracter"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Progreso del set */}
      <div className="rounded-2xl border border-border bg-bg-card p-4 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="text-xs font-mono text-text-secondary truncate">
            Dominados sin errores en <strong className="text-foreground">{activeSet.title}</strong>
          </span>
        </div>
        <span className="font-mono text-xs font-bold text-foreground shrink-0">
          {masteredInSet} / {activeSet.characters.length}
        </span>
      </div>

      {/* Recordatorio de reglas */}
      <div className="rounded-2xl border border-rose-500/30 bg-bg-card overflow-hidden shadow-sm">
        <div className="p-4 bg-rose-500/10 border-b border-rose-500/20 flex items-center gap-2.5">
          <Brush className="w-4 h-4 text-rose-500 shrink-0" />
          <h3 className="text-xs sm:text-sm font-bold font-mono text-foreground uppercase tracking-wider">
            Las 4 reglas de orden de trazos
          </h3>
        </div>
        <div className="p-4 sm:p-5 space-y-2.5 font-mono text-xs">
          {[
            ["1", "从上到下 · cóng shàng dào xià", "De arriba hacia abajo", "言 · 茶 · 三"],
            ["2", "从左到右 · cóng zuǒ dào yòu", "De izquierda a derecha", "位 · 林 · 明"],
            ["3", "先横后竖 · xiān héng hòu shù", "Primero horizontal, luego vertical", "十 · 干 · 丰"],
            ["4", "先撇后捺 · xiān piě hòu nà", "Primero 撇, luego 捺", "八 · 人 · 文"],
          ].map(([num, cn, es, examples]) => (
            <div
              key={num}
              className="p-3 rounded-xl border border-border bg-bg-secondary/60 flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded-md bg-rose-500/15 text-rose-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                {num}
              </span>
              <div className="min-w-0">
                <span className="text-foreground font-bold block">{es}</span>
                <span className="text-text-muted block mt-0.5">{cn}</span>
                <span className="font-chinese text-sm text-rose-500 block mt-1">{examples}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
