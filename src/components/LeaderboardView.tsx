"use client";

import React from "react";
import { StudentScore } from "@/types";
import { Trophy, Sparkles, Clock, Target, Flame } from "lucide-react";

interface LeaderboardViewProps {
  currentUser: StudentScore;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ currentUser }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-bold text-[11px] tracking-wide uppercase">
            Próximamente
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
          Ranking del Grupo
        </h1>
      </div>

      {/* Coming Soon Card */}
      <div className="glass-card rounded-3xl p-8 sm:p-10 text-center space-y-5 animate-apple-in">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-white shadow-apple-gold">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
            Tabla de Posiciones en Tiempo Real
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            El ranking compartido entre todos los compañeros se activará cuando sincronicemos los datos con la base de datos en la nube.
          </p>
        </div>

        {/* Your personal stats card */}
        <div className="p-5 rounded-2xl bg-bg-secondary border border-border text-left space-y-3 mt-6">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider block">
            Tu Récord Local ({currentUser.name})
          </span>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-text-muted block">Quizzes Completados</span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {currentUser.quizzes_completed}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-text-muted block">Precisión Promedio</span>
              <span className="text-lg sm:text-xl font-extrabold text-amber-500">
                {currentUser.accuracy}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
