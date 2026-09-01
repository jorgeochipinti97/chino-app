"use client";

import React from "react";
import { BarChart3, Sparkles } from "lucide-react";

export const SurveyView: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-bold text-[11px] tracking-wide uppercase">
            Próximamente
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
          Encuestas de Feedback
        </h1>
      </div>

      <div className="glass-card rounded-3xl p-8 sm:p-10 text-center space-y-5 animate-apple-in">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
          <BarChart3 className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
            Encuestas y Votaciones del Grupo
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Las encuestas de clase para evaluar el ritmo, dificultad y temas que más costaron se sincronizarán con el grupo una vez conectada la base de datos compartida.
          </p>
        </div>
      </div>
    </div>
  );
};
