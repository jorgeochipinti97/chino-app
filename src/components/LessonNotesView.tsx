"use client";

import React, { useState } from "react";
import { LESSON_MATERIALS } from "@/data/lessons";
import { speakChinese } from "@/lib/speech";
import { Volume2, BookOpen, Lightbulb, Sparkles } from "lucide-react";

export const LessonNotesView: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<number>(2);

  const activeMaterial = LESSON_MATERIALS.find((m) => m.lesson_number === selectedLesson) || LESSON_MATERIALS[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-border">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-500 font-bold text-[11px] tracking-wide uppercase">
            Guía de Estudio
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
            {activeMaterial.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <select
            id="material-select"
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(Number(e.target.value))}
            className="px-3.5 py-2 rounded-xl border border-border bg-bg-card font-semibold text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 cursor-pointer shadow-apple-sm"
          >
            {LESSON_MATERIALS.map((m) => (
              <option key={m.id} value={m.lesson_number}>
                Clase {m.lesson_number}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-8 animate-apple-in">
        {/* Summary Card */}
        <div className="p-4 rounded-2xl bg-bg-secondary border border-border">
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            {activeMaterial.summary}
          </p>
        </div>

        {/* Vocabulary Sections */}
        {activeMaterial.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                {section.title}
              </h2>
              {section.description && (
                <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                  {section.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  className="p-4 rounded-2xl border border-border bg-bg-secondary hover:border-teal-500/40 transition-all duration-200 space-y-3 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-2xl font-chinese font-bold text-foreground block">
                        {item.hanzi}
                      </span>
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-0.5 block">
                        {item.pinyin}
                      </span>
                    </div>

                    <button
                      onClick={() => speakChinese(item.hanzi || item.pinyin)}
                      className="p-2.5 rounded-xl bg-bg-card hover:bg-bg-tertiary border border-border text-foreground hover:border-teal-500/50 transition-all duration-200 min-h-[38px] min-w-[38px] flex items-center justify-center tactile-btn shadow-sm cursor-pointer"
                      title="Escuchar pronunciación"
                    >
                      <Volume2 className="w-4 h-4 text-teal-500" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <span className="text-xs font-semibold text-foreground block">
                      {item.meaning}
                    </span>
                    {item.pronunciation && (
                      <span className="text-[11px] text-text-muted italic block mt-0.5">
                        🗣️ {item.pronunciation}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Grammar and phonetics tips */}
        {activeMaterial.grammar_tips.length > 0 && (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-xs sm:text-sm">
              <Lightbulb className="w-4 h-4" />
              <span>Tips de Fonética & Gramática</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-text-secondary list-disc pl-5">
              {activeMaterial.grammar_tips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
