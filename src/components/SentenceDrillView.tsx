"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SUBSTITUTION_SETS } from "@/data/sentences";
import { SubstitutionSet } from "@/types";
import { shuffle } from "@/lib/practice";
import { speakChinese } from "@/lib/speech";
import { getSentenceBest, saveSentenceBest } from "@/lib/storage";
import { Volume2, Check, XCircle, Delete, RotateCcw, Trophy, ArrowRight } from "lucide-react";

/** Fichas de relleno que se suman a las de la respuesta, para que no se resuelva solo. */
const DISTRACTORS_PER_ITEM = 3;

interface SentenceDrillViewProps {
  /** Cuando viene, solo se practican los sets de esa clase. */
  lessonNumber?: number;
}

export const SentenceDrillView: React.FC<SentenceDrillViewProps> = ({ lessonNumber }) => {
  const sets = useMemo(
    () =>
      lessonNumber === undefined
        ? SUBSTITUTION_SETS
        : SUBSTITUTION_SETS.filter((set) => set.lesson_number === lessonNumber),
    [lessonNumber]
  );
  const [setIdx, setSetIdx] = useState<number>(0);
  const [order, setOrder] = useState<number[]>([]);
  const [pos, setPos] = useState<number>(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [best, setBest] = useState<number>(0);

  const activeSet = sets[setIdx] || sets[0];

  const startRound = useCallback(
    (nextSetIdx: number) => {
      const next = sets[nextSetIdx];
      if (!next) return;
      setOrder(shuffle(next.items.map((_, i) => i)));
      setPos(0);
      setPicked([]);
      setIsChecked(false);
      setCorrectCount(0);
      setIsFinished(false);
      setBest(getSentenceBest(next.id));
    },
    [sets]
  );

  useEffect(() => {
    startRound(setIdx);
  }, [setIdx, startRound]);

  const item = order.length > 0 ? activeSet.items[order[pos]] : undefined;

  /**
   * Banco de fichas del ítem: las de la respuesta más unos distractores del set.
   * Se congela por ítem — si se remezclara en cada render, las fichas saltarían de lugar.
   */
  const bank = useMemo(() => {
    if (!item) return [];
    const extras = shuffle(activeSet.pool.filter((token) => !item.tokens.includes(token))).slice(
      0,
      DISTRACTORS_PER_ITEM
    );
    return shuffle([...item.tokens, ...extras]);
  }, [item, activeSet]);

  if (!item) {
    return <div className="py-12 text-center text-sm text-text-muted font-mono">Cargando…</div>;
  }

  const answerHanzi = item.tokens.join("") + (item.punctuation ?? "");
  const givenHanzi = picked.map((i) => bank[i]).join("");
  const isCorrect = givenHanzi === item.tokens.join("");

  const check = () => {
    if (picked.length === 0) return;
    setIsChecked(true);
    if (isCorrect) setCorrectCount((prev) => prev + 1);
  };

  const next = () => {
    if (pos < order.length - 1) {
      setPos((prev) => prev + 1);
      setPicked([]);
      setIsChecked(false);
      return;
    }
    setIsFinished(true);
    setBest(saveSentenceBest(activeSet.id, correctCount));
  };

  if (isFinished) {
    return (
      <div className="max-w-md mx-auto px-2 sm:px-4 py-6 space-y-4">
        <SetSwitch sets={sets} setIdx={setIdx} setSetIdx={setSetIdx} />

        <div className="glass-card rounded-3xl p-6 sm:p-8 text-center space-y-4 animate-apple-in">
          <Trophy
            className={`w-12 h-12 mx-auto ${
              correctCount === order.length ? "text-amber-500" : "text-text-muted"
            }`}
          />
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-foreground">
              {correctCount} / {order.length}
            </h2>
            <p className="text-xs text-text-secondary">
              {correctCount === order.length
                ? "Todas bien. El molde de la oración ya te sale solo."
                : "Volvé a pasarlas: lo que falla casi siempre es dónde va 们 o 也."}
            </p>
            {best > 0 && (
              <p className="text-[11px] text-text-muted font-mono">
                Récord en «{activeSet.title}»: {best}/{activeSet.items.length}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => startRound(setIdx)}
            className="w-full flex items-center justify-center gap-2 min-h-12 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99]"
          >
            <RotateCcw className="w-4 h-4" />
            Otra vuelta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4">
      <div className="space-y-1">
        <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold text-[11px] tracking-wide uppercase">
          Oraciones 句子
        </span>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {activeSet.title}
        </h1>
        <p className="text-[11px] text-text-muted leading-relaxed">{activeSet.description}</p>
      </div>

      <SetSwitch sets={sets} setIdx={setIdx} setSetIdx={setSetIdx} />

      <div className="flex items-center justify-between text-xs font-semibold text-text-secondary">
        <span>
          {pos + 1} de {order.length}
        </span>
        <span className="text-text-muted font-mono">
          {correctCount} ✓{best > 0 && <span className="opacity-50"> · récord {best}</span>}
        </span>
      </div>

      <div className="glass-card rounded-3xl p-5 sm:p-6 space-y-5 animate-apple-in">
        {/* Oración de base (cuando la hay) */}
        {item.base_hanzi && (
          <div className="p-4 rounded-2xl bg-bg-secondary border border-border space-y-1">
            <div className="flex items-center justify-between gap-3">
              <span className="font-chinese text-3xl text-foreground leading-tight">
                {item.base_hanzi}
              </span>
              <button
                type="button"
                onClick={() => speakChinese(item.base_hanzi)}
                className="p-2.5 rounded-xl bg-bg-card hover:bg-bg-tertiary border border-border text-orange-500 transition-all cursor-pointer active:scale-95 shrink-0"
                title="Escuchar la oración"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <span className="font-pinyin text-xs text-text-secondary block">
              {item.base_pinyin}
            </span>
            <span className="text-[11px] text-text-muted block">{item.base_meaning}</span>
          </div>
        )}

        {/* Consigna */}
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
            {!item.base_hanzi ? "Armá esta oración" : /[a-zA-Z]/.test(item.swap) ? "Consigna" : "Cambiala a"}
          </span>
          <span className="font-chinese text-2xl font-bold text-orange-600 dark:text-orange-400">
            {item.swap}
          </span>
          <span className="text-[11px] text-text-muted block">{item.swap_meaning}</span>
        </div>

        {/* Zona de armado */}
        <div className="min-h-[76px] flex flex-wrap items-center justify-center gap-1.5 p-3 rounded-2xl border border-dashed border-border bg-bg-secondary/60">
          {picked.length === 0 ? (
            <span className="text-xs text-text-muted">Tocá las fichas en orden</span>
          ) : (
            <>
              {picked.map((bankIdx, i) => (
                <button
                  key={`${bankIdx}-${i}`}
                  type="button"
                  disabled={isChecked}
                  onClick={() => setPicked((prev) => prev.filter((_, j) => j !== i))}
                  className="font-chinese text-3xl text-foreground animate-apple-in disabled:cursor-default"
                  title="Sacar esta ficha"
                >
                  {bank[bankIdx]}
                </button>
              ))}
              {item.punctuation && (
                <span className="font-chinese text-3xl text-text-muted">{item.punctuation}</span>
              )}
            </>
          )}
        </div>

        {/* Banco de fichas */}
        {!isChecked && (
          <div className="flex flex-wrap justify-center gap-2">
            {bank.map((token, i) => {
              const used = picked.includes(i);
              return (
                <button
                  key={`${token}-${i}`}
                  type="button"
                  disabled={used}
                  onClick={() => setPicked((prev) => [...prev, i])}
                  className="min-h-12 px-4 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary hover:border-orange-500/50 font-chinese text-2xl text-foreground transition-all cursor-pointer active:scale-95 disabled:opacity-25 disabled:cursor-default"
                >
                  {token}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setPicked((prev) => prev.slice(0, -1))}
              disabled={picked.length === 0}
              className="min-h-12 px-4 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-text-secondary flex items-center justify-center transition-all cursor-pointer active:scale-95 disabled:opacity-25"
              title="Borrar la última"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Feedback */}
        {isChecked ? (
          <div
            className={`p-4 rounded-2xl border space-y-3 animate-apple-in ${
              isCorrect ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"
            }`}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-500" />
              )}
              <span
                className={`text-xs font-bold ${
                  isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
                }`}
              >
                {isCorrect ? "Correcto" : "Así no queda"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-3">
              <div className="min-w-0">
                <span className="font-chinese text-3xl text-foreground block leading-tight">
                  {answerHanzi}
                </span>
                <span className="font-pinyin text-xs text-text-secondary block">
                  {item.answer_pinyin}
                </span>
                <span className="text-[11px] text-text-muted block">{item.answer_meaning}</span>
              </div>
              <button
                type="button"
                onClick={() => speakChinese(answerHanzi)}
                className="p-2.5 rounded-xl bg-bg-card hover:bg-bg-tertiary border border-border text-orange-500 transition-all cursor-pointer active:scale-95 shrink-0"
                title="Escuchar"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {item.note && (
              <p className="text-[11px] text-text-secondary leading-relaxed border-t border-border/60 pt-3">
                {item.note}
              </p>
            )}

            <button
              type="button"
              onClick={next}
              className="w-full flex items-center justify-center gap-2 min-h-12 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99]"
            >
              <span>{pos === order.length - 1 ? "Ver resultado" : "Siguiente"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={check}
            disabled={picked.length === 0}
            className="w-full min-h-12 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Comprobar
          </button>
        )}
      </div>

      <p className="text-[11px] text-text-muted text-center leading-relaxed px-2">
        El verbo no se conjuga: al cambiar el pronombre, 好吗？/ 很好 / 呢？quedan igual.
      </p>
    </div>
  );
};

const SetSwitch: React.FC<{
  sets: SubstitutionSet[];
  setIdx: number;
  setSetIdx: (idx: number) => void;
}> = ({ sets, setIdx, setSetIdx }) => (
  <div
    className="grid gap-1.5 p-1 rounded-2xl bg-bg-secondary border border-border"
    style={{ gridTemplateColumns: `repeat(${sets.length}, minmax(0, 1fr))` }}
  >
    {sets.map((set, i) => (
      <button
        key={set.id}
        type="button"
        onClick={() => setSetIdx(i)}
        className={`min-h-11 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-[0.98] ${
          setIdx === i
            ? "bg-bg-card text-foreground shadow-sm border border-border"
            : "text-text-muted hover:text-foreground"
        }`}
      >
        {set.title}
      </button>
    ))}
  </div>
);
