"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  TONES,
  ToneNumber,
  applyToneMark,
  toneMarkIndex,
  playTone,
  TONE_MARK_RULES,
  MARK_ITEMS,
  MarkItem,
  SERIES_LENGTH,
} from "@/lib/tones";
import { speakChinese, hasChineseVoice, onVoicesReady } from "@/lib/speech";
import { getToneBest, saveToneBest } from "@/lib/storage";
import { Volume2, Check, X, ListOrdered, RotateCcw, Trophy } from "lucide-react";

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildSeries = (): MarkItem[] => shuffle(MARK_ITEMS).slice(0, SERIES_LENGTH);

const VOWELS = "aeiouü";

export const ToneMarkExercise: React.FC = () => {
  const [series, setSeries] = useState<MarkItem[]>([]);
  const [idx, setIdx] = useState<number>(0);
  const [pickedLetter, setPickedLetter] = useState<number | null>(null);
  const [pickedTone, setPickedTone] = useState<ToneNumber | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [hasVoice, setHasVoice] = useState<boolean>(false);
  const [best, setBest] = useState<number>(0);

  useEffect(() => {
    setSeries(buildSeries());
    setBest(getToneBest());
    setHasVoice(hasChineseVoice());
    return onVoicesReady(() => setHasVoice(hasChineseVoice()));
  }, []);

  const current = series[idx];
  const target = current ? toneMarkIndex(current.syllable) : null;

  const listen = useCallback(() => {
    if (!current) return;
    // Voz del sistema si el dispositivo tiene chino; si no, el contorno sintetizado
    if (current.hanzi && hasVoice) speakChinese(current.hanzi);
    else void playTone(current.syllable, current.tone);
  }, [current, hasVoice]);

  if (!current && !isFinished) {
    return (
      <div className="py-12 text-center text-sm text-text-muted font-mono">Cargando…</div>
    );
  }

  const letterDone = pickedLetter !== null;
  const isDone = letterDone && pickedTone !== null;
  const letterOk = letterDone && pickedLetter === target?.index;
  const toneOk = pickedTone !== null && pickedTone === current?.tone;
  const bothOk = letterOk && toneOk;

  const handlePickLetter = (i: number) => {
    if (letterDone) return;
    setPickedLetter(i);
  };

  const handlePickTone = (t: ToneNumber) => {
    if (pickedTone !== null || !current) return;
    setPickedTone(t);
    if (pickedLetter === target?.index && t === current.tone) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (idx < series.length - 1) {
      setIdx((i) => i + 1);
      setPickedLetter(null);
      setPickedTone(null);
      return;
    }
    setIsFinished(true);
    if (correctCount > best) setBest(saveToneBest(correctCount));
  };

  const handleRestart = () => {
    setSeries(buildSeries());
    setIdx(0);
    setPickedLetter(null);
    setPickedTone(null);
    setCorrectCount(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="rounded-2xl border border-border bg-bg-card shadow-sm p-6 sm:p-8 text-center space-y-5 animate-apple-in">
        <Trophy
          className={`w-12 h-12 mx-auto ${correctCount >= 10 ? "text-amber-500" : "text-text-muted"}`}
        />
        <div className="space-y-1">
          <span className="block text-4xl font-extrabold text-foreground font-mono">
            {correctCount} / {series.length}
          </span>
          <span className="text-xs text-text-secondary font-mono">
            {correctCount >= 10
              ? "Tenés la regla de colocación clara"
              : "Repasá las reglas de abajo — las de iu / ui son las que más caen"}
          </span>
          {best > 0 && (
            <span className="block text-[11px] text-text-muted font-mono pt-1">
              Récord: {best}/{SERIES_LENGTH}
            </span>
          )}
        </div>
        <button
          onClick={handleRestart}
          className="w-full flex items-center justify-center gap-2 min-h-12 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99]"
        >
          <RotateCcw className="w-4 h-4" />
          Otra serie
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Progreso */}
      <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
        <span>Ítem {idx + 1} de {series.length}</span>
        <span>
          {correctCount} {correctCount === 1 ? "acierto" : "aciertos"}
          {best > 0 && <span className="opacity-50"> · récord {best}</span>}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-bg-tertiary overflow-hidden -mt-3">
        <div
          className="h-full rounded-full bg-violet-500 transition-all duration-300"
          style={{ width: `${((idx + (isDone ? 1 : 0)) / series.length) * 100}%` }}
        />
      </div>

      {/* La sílaba, letra por letra */}
      <div className="rounded-2xl border border-border bg-bg-card shadow-sm p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-text-muted">
            {letterDone ? "¿Y qué tono lleva?" : "Tocá la letra que lleva la marca"}
          </span>
          <button
            onClick={listen}
            className="flex items-center gap-1.5 px-3 min-h-11 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-border text-foreground text-xs font-bold transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Volume2 className="w-3.5 h-3.5 text-violet-500" />
            <span className="font-mono text-[11px]">Escuchar</span>
          </button>
        </div>

        {/* Letras tocables */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {current.syllable.split("").map((ch, i) => {
            const isVowel = VOWELS.includes(ch);
            const isTarget = i === target?.index;
            const isPicked = i === pickedLetter;

            let cls = "border-border bg-bg-secondary text-foreground";
            if (!isVowel) cls = "border-transparent bg-transparent text-text-muted";
            else if (letterDone && isTarget) cls = "border-emerald-500 bg-emerald-500/15 text-foreground";
            else if (letterDone && isPicked) cls = "border-rose-500 bg-rose-500/15 text-foreground";
            else if (letterDone) cls = "border-border bg-bg-secondary text-text-muted opacity-50";

            return (
              <button
                key={i}
                onClick={() => isVowel && handlePickLetter(i)}
                disabled={!isVowel || letterDone}
                className={`w-14 h-16 rounded-xl border-2 font-pinyin text-3xl font-bold transition-all duration-200 flex items-center justify-center ${cls} ${
                  isVowel && !letterDone ? "cursor-pointer active:scale-95 hover:border-violet-500/50" : "cursor-default"
                }`}
              >
                {isDone && isTarget
                  ? applyToneMark(current.syllable, current.tone)[i]
                  : ch}
              </button>
            );
          })}
        </div>

        {current.hanzi && (
          <div className="text-center">
            <span className="font-chinese text-2xl font-bold text-foreground">{current.hanzi}</span>
            {current.meaning && (
              <span className="text-[11px] text-text-muted font-mono block mt-0.5">
                {current.meaning}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Paso 2: el tono */}
      {letterDone && (
        <div className="grid grid-cols-4 gap-2 animate-apple-in">
          {TONES.map((t) => {
            const isPicked = pickedTone === t.tone;
            const isRight = t.tone === current.tone;

            let cls = "border-border bg-bg-card text-foreground hover:border-violet-500/40";
            if (pickedTone !== null && isRight) cls = "border-emerald-500 bg-emerald-500/10 text-foreground";
            else if (pickedTone !== null && isPicked) cls = "border-rose-500 bg-rose-500/10 text-foreground";
            else if (pickedTone !== null) cls = "border-border bg-bg-card text-text-muted opacity-50";

            return (
              <button
                key={t.tone}
                onClick={() => handlePickTone(t.tone)}
                disabled={pickedTone !== null}
                className={`min-h-[76px] rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 shadow-sm ${cls} ${
                  pickedTone === null ? "cursor-pointer active:scale-95" : "cursor-default"
                }`}
              >
                <span className="text-2xl font-bold font-pinyin leading-none">
                  {applyToneMark(current.syllable, t.tone)[target?.index ?? 0]}
                </span>
                <span className="text-[10px] font-mono text-text-muted">{t.tone}º</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Resultado */}
      {isDone && (
        <div className="space-y-3 animate-apple-in">
          <div
            className={`p-4 rounded-2xl border font-mono text-xs leading-relaxed space-y-2 ${
              bothOk
                ? "border-emerald-500/40 bg-emerald-500/10"
                : "border-rose-500/40 bg-rose-500/10"
            }`}
          >
            <div className="flex items-center gap-2 text-foreground">
              {letterOk ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" strokeWidth={3} />
              ) : (
                <X className="w-3.5 h-3.5 text-rose-500 shrink-0" strokeWidth={3} />
              )}
              <span>
                Se escribe <strong className="text-base font-pinyin">{applyToneMark(current.syllable, current.tone)}</strong>
              </span>
            </div>
            <div className="flex items-start gap-2 text-text-secondary">
              <ListOrdered className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
              <span>
                Regla {target?.rule}: {TONE_MARK_RULES[(target?.rule ?? 1) - 1].short}
              </span>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 min-h-12 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99]"
          >
            {idx === series.length - 1 ? "Ver resultado" : "Siguiente"}
          </button>
        </div>
      )}

      {/* Las reglas */}
      <div className="rounded-2xl border border-violet-500/30 bg-bg-card overflow-hidden shadow-sm">
        <div className="p-4 bg-violet-500/10 border-b border-violet-500/20 flex items-center gap-2.5">
          <ListOrdered className="w-4 h-4 text-violet-500 shrink-0" />
          <h3 className="text-xs sm:text-sm font-bold font-mono text-foreground uppercase tracking-wider">
            ¿Sobre qué vocal va la marca?
          </h3>
        </div>
        <div className="p-4 space-y-2 font-mono text-xs">
          {TONE_MARK_RULES.map((r) => (
            <div
              key={r.id}
              className="p-3 rounded-xl border border-border bg-bg-secondary/60 flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded-md bg-violet-500/15 text-violet-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                {r.id}
              </span>
              <div className="min-w-0">
                <span className="text-foreground font-bold block">{r.short}</span>
                <span className="text-text-muted block mt-0.5">{r.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
