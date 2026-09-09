"use client";

import React from "react";
import { ToneMarkExercise } from "./ToneMarkExercise";

export const ToneTrainerView: React.FC = () => (
  <div className="max-w-2xl mx-auto px-2 sm:px-6 py-4 sm:py-6 space-y-5 animate-apple-in">
    <header className="space-y-3 pb-4 border-b border-border">
      <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
        <span>Práctica</span>
        <span>/</span>
        <span className="text-violet-500 font-semibold">Tonos</span>
      </div>

      <div className="flex flex-wrap items-baseline gap-2.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-mono">
          Ubicar la marca
        </h1>
        <span className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400 font-chinese text-[11px] font-bold border border-violet-500/20">
          声调
        </span>
      </div>

      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
        Sobre qué vocal se escribe la marca de tono, y qué tono es.
      </p>
    </header>

    <ToneMarkExercise />
  </div>
);
