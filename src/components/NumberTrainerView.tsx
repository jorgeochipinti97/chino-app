"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MAX_NUMBER,
  NUMBER_CHARS,
  numberBreakdown,
  numberToHanzi,
  numberToPinyin,
  randomNumbers,
} from "@/lib/numbers";
import { hasChineseVoice, onVoicesReady, speakChinese } from "@/lib/speech";
import { getNumberBest, saveNumberBest, NumberMode } from "@/lib/storage";
import { Volume2, Check, XCircle, Delete, RotateCcw, Trophy } from "lucide-react";

/** Largo de la serie: corta, para que entre en un recreo entre clases. */
const SERIES_LENGTH = 10;

const MODE_LABELS: Record<NumberMode, string> = {
  dictation: "Te lo dicto",
  build: "Armalo vos",
};

interface Verdict {
  ok: boolean;
  target: number;
  given: string;
}

export const NumberTrainerView: React.FC = () => {
  const [mode, setMode] = useState<NumberMode>("dictation");
  const [series, setSeries] = useState<number[]>([]);
  const [idx, setIdx] = useState<number>(0);
  const [typed, setTyped] = useState<string>("");
  const [picked, setPicked] = useState<string[]>([]);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [best, setBest] = useState<number>(0);
  const [voiceReady, setVoiceReady] = useState<boolean>(false);
  /** iOS no reproduce audio sin un gesto previo: hasta el primer toque, nada de autoplay. */
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const startSeries = useCallback((nextMode: NumberMode) => {
    setSeries(randomNumbers(SERIES_LENGTH));
    setIdx(0);
    setTyped("");
    setPicked([]);
    setVerdict(null);
    setCorrectCount(0);
    setIsFinished(false);
    setBest(getNumberBest(nextMode));
  }, []);

  useEffect(() => {
    startSeries(mode);
  }, [mode, startSeries]);

  useEffect(() => {
    setVoiceReady(hasChineseVoice());
    return onVoicesReady(() => setVoiceReady(hasChineseVoice()));
  }, []);

  const target = series[idx];

  const play = useCallback(
    (rate = 0.85) => {
      if (target === undefined) return;
      setHasInteracted(true);
      speakChinese(numberToHanzi(target), rate);
    },
    [target]
  );

  // Dicta solo cuando ya hubo un toque del usuario en esta sesión.
  useEffect(() => {
    if (mode !== "dictation" || !hasInteracted || verdict || target === undefined) return;
    speakChinese(numberToHanzi(target), 0.85);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, mode]);

  useEffect(() => {
    if (mode === "dictation" && !verdict) inputRef.current?.focus();
  }, [idx, mode, verdict]);

  if (series.length === 0 || target === undefined) {
    return (
      <div className="py-12 text-center text-sm text-text-muted font-mono">Cargando…</div>
    );
  }

  const check = () => {
    const given = mode === "dictation" ? typed : picked.join("");
    if (!given) return;

    const ok =
      mode === "dictation" ? Number(given) === target : given === numberToHanzi(target);

    setVerdict({ ok, target, given });
    if (ok) setCorrectCount((prev) => prev + 1);
  };

  const next = () => {
    if (idx < series.length - 1) {
      setIdx((prev) => prev + 1);
      setTyped("");
      setPicked([]);
      setVerdict(null);
      return;
    }
    setIsFinished(true);
    setBest(saveNumberBest(mode, correctCount));
  };

  if (isFinished) {
    return (
      <div className="max-w-md mx-auto px-2 sm:px-4 py-6 space-y-4">
        <ModeSwitch mode={mode} setMode={setMode} />

        <div className="glass-card rounded-3xl p-6 sm:p-8 text-center space-y-4 animate-apple-in">
          <Trophy
            className={`w-12 h-12 mx-auto ${correctCount >= 8 ? "text-amber-500" : "text-text-muted"}`}
          />
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-foreground">
              {correctCount} / {SERIES_LENGTH}
            </h2>
            <p className="text-xs text-text-secondary">
              {correctCount === SERIES_LENGTH
                ? "Serie perfecta."
                : correctCount >= 8
                  ? "Casi toda. Repetí para afianzar los compuestos."
                  : "Los compuestos (二十一, 四十七) necesitan otra vuelta."}
            </p>
            {best > 0 && (
              <p className="text-[11px] text-text-muted font-mono">
                Récord en «{MODE_LABELS[mode]}»: {best}/{SERIES_LENGTH}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => startSeries(mode)}
            className="w-full flex items-center justify-center gap-2 min-h-12 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99]"
          >
            <RotateCcw className="w-4 h-4" />
            Serie nueva
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4">
      <div className="space-y-1">
        <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-[11px] tracking-wide uppercase">
          Números 数字
        </span>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Del 0 al {MAX_NUMBER}
        </h1>
        <p className="text-[11px] text-text-muted leading-relaxed">
          {mode === "dictation"
            ? "Escuchás el número en chino y escribís la cifra. Es lo que vas a necesitar cuando te digan un precio o un teléfono."
            : "Ves la cifra y armás el número tocando los caracteres, con la regla de composición."}
        </p>
      </div>

      <ModeSwitch mode={mode} setMode={setMode} />

      <div className="flex items-center justify-between text-xs font-semibold text-text-secondary">
        <span>
          {idx + 1} de {SERIES_LENGTH}
        </span>
        <span className="text-text-muted font-mono">
          {correctCount} ✓{best > 0 && <span className="opacity-50"> · récord {best}</span>}
        </span>
      </div>

      <div className="glass-card rounded-3xl p-5 sm:p-7 space-y-5 animate-apple-in">
        {mode === "dictation" ? (
          <>
            {!voiceReady && (
              <p className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-600 dark:text-amber-400 leading-relaxed">
                No hay voz en chino instalada en este dispositivo: el dictado va a sonar mal.
                Probá el modo «Armalo vos» mientras tanto.
              </p>
            )}

            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => play(0.85)}
                className="w-24 h-24 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center transition-all shadow-apple-glow cursor-pointer active:scale-95"
                title="Escuchar el número"
              >
                <Volume2 className="w-9 h-9" />
              </button>
              <button
                type="button"
                onClick={() => play(0.5)}
                className="px-3 min-h-11 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-xs font-bold text-foreground transition-all cursor-pointer active:scale-95"
              >
                Repetir más lento
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!verdict) check();
                else next();
              }}
              className="space-y-3"
            >
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                disabled={Boolean(verdict)}
                value={typed}
                onChange={(e) => setTyped(e.target.value.replace(/\D/g, "").slice(0, 2))}
                placeholder="?"
                className="w-full text-center text-4xl font-extrabold tracking-widest py-4 rounded-2xl border border-border bg-bg-secondary text-foreground outline-none focus:border-sky-500 transition-colors disabled:opacity-60"
              />
            </form>
          </>
        ) : (
          <>
            <div className="text-center">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                Armá este número
              </span>
              <span className="text-6xl font-extrabold text-foreground tabular-nums">
                {target}
              </span>
            </div>

            <div className="min-h-[72px] flex items-center justify-center gap-1.5 p-3 rounded-2xl border border-dashed border-border bg-bg-secondary/60">
              {picked.length === 0 ? (
                <span className="text-xs text-text-muted">Tocá los caracteres</span>
              ) : (
                picked.map((char, i) => (
                  <span
                    key={`${char}-${i}`}
                    className="font-chinese text-4xl text-foreground animate-apple-in"
                  >
                    {char}
                  </span>
                ))
              )}
            </div>

            {!verdict && (
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-2">
                  {NUMBER_CHARS.map((char) => (
                    <button
                      key={char}
                      type="button"
                      onClick={() => setPicked((prev) => [...prev, char])}
                      disabled={picked.length >= 3}
                      className="min-h-14 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary hover:border-sky-500/50 font-chinese text-2xl text-foreground transition-all cursor-pointer active:scale-95 disabled:opacity-40"
                    >
                      {char}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPicked((prev) => prev.slice(0, -1))}
                    disabled={picked.length === 0}
                    className="min-h-14 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-text-secondary flex items-center justify-center transition-all cursor-pointer active:scale-95 disabled:opacity-40"
                    title="Borrar el último"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Feedback */}
        {verdict ? (
          <div
            className={`p-4 rounded-2xl border space-y-3 animate-apple-in ${
              verdict.ok
                ? "border-emerald-500/40 bg-emerald-500/10"
                : "border-rose-500/40 bg-rose-500/10"
            }`}
          >
            <div className="flex items-center gap-2">
              {verdict.ok ? (
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-500" />
              )}
              <span
                className={`text-xs font-bold ${
                  verdict.ok ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
                }`}
              >
                {verdict.ok ? "Correcto" : `Era ${verdict.target}, pusiste ${verdict.given || "—"}`}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-3">
              <div className="min-w-0">
                <span className="font-chinese text-3xl text-foreground block leading-tight">
                  {numberToHanzi(verdict.target)}
                </span>
                <span className="font-pinyin text-xs text-text-secondary">
                  {numberToPinyin(verdict.target)} · {verdict.target}
                </span>
              </div>
              <button
                type="button"
                onClick={() => speakChinese(numberToHanzi(verdict.target), 0.7)}
                className="p-2.5 rounded-xl bg-bg-card hover:bg-bg-tertiary border border-border text-sky-500 transition-all cursor-pointer active:scale-95 shrink-0"
                title="Escuchar"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-text-muted font-mono">
              {numberBreakdown(verdict.target)}
            </p>

            <button
              type="button"
              onClick={next}
              className="w-full min-h-12 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99]"
            >
              {idx === series.length - 1 ? "Ver resultado" : "Siguiente"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={check}
            disabled={mode === "dictation" ? !typed : picked.length === 0}
            className="w-full min-h-12 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all shadow-apple-glow cursor-pointer active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Comprobar
          </button>
        )}
      </div>

      {mode === "build" && (
        <p className="text-[11px] text-text-muted text-center leading-relaxed px-2">
          Recordá: el 十 adelante suma (十五 = 15), atrás multiplica (五十 = 50).
        </p>
      )}
    </div>
  );
};

const ModeSwitch: React.FC<{
  mode: NumberMode;
  setMode: (mode: NumberMode) => void;
}> = ({ mode, setMode }) => (
  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-bg-secondary border border-border">
    {(Object.keys(MODE_LABELS) as NumberMode[]).map((key) => (
      <button
        key={key}
        type="button"
        onClick={() => setMode(key)}
        className={`min-h-11 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-[0.98] ${
          mode === key
            ? "bg-bg-card text-foreground shadow-sm border border-border"
            : "text-text-muted hover:text-foreground"
        }`}
      >
        {MODE_LABELS[key]}
      </button>
    ))}
  </div>
);
