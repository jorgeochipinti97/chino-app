"use client";

import React, { useState } from "react";
import { LESSON_MATERIALS } from "@/data/lessons";
import { speakChinese } from "@/lib/speech";
import { Volume2, ChevronDown, Lightbulb, BookOpen } from "lucide-react";

export const LessonNotesView: React.FC = () => {
  const activeMaterial = LESSON_MATERIALS[0];
  // Keep all sections open by default so user can read everything, but allow collapse
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4 py-4 sm:py-6 space-y-4 animate-apple-in">
      {/* Header */}
      <div className="pb-2 border-b border-border">
        <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-[11px] tracking-wide uppercase">
          Guía de Estudio • Clase 2
        </span>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
          {activeMaterial.title}
        </h1>
        <p className="text-xs text-text-secondary mt-1 leading-relaxed">
          {activeMaterial.summary}
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-3">
        {activeMaterial.sections.map((section, sIdx) => {
          const isOpen = !!openSections[sIdx];

          return (
            <div
              key={sIdx}
              className="glass-card rounded-2xl overflow-hidden transition-all duration-200"
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => toggleSection(sIdx)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-bg-secondary/60 transition-colors duration-200 select-none"
              >
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground leading-snug">
                      {section.title}
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-bg-secondary text-text-muted border border-border">
                      {section.items.length}
                    </span>
                  </div>
                  {section.description && (
                    <p className="text-[11px] text-text-muted mt-0.5 leading-snug">
                      {section.description}
                    </p>
                  )}
                </div>

                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-text-muted transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 bg-bg-secondary text-foreground" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-4 pb-4 pt-1 space-y-2 border-t border-border/60">
                  {section.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3 sm:p-3.5 rounded-xl border border-border bg-bg-secondary flex items-center justify-between gap-3 hover:border-teal-500/40 transition-colors duration-200"
                    >
                      {/* Left: Chinese Character & Pinyin */}
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl sm:text-2xl font-chinese font-bold text-foreground">
                            {item.hanzi}
                          </span>
                          <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                            {item.pinyin}
                          </span>
                        </div>

                        {/* Meaning & Phonetics */}
                        <div className="text-xs text-foreground font-medium leading-tight">
                          {item.meaning}
                        </div>

                        {item.pronunciation && (
                          <div className="text-[11px] text-text-muted italic leading-snug pt-0.5">
                            🗣️ {item.pronunciation}
                          </div>
                        )}
                      </div>

                      {/* Right: Audio Pronounce Button */}
                      <button
                        type="button"
                        onClick={() => speakChinese(item.hanzi || item.pinyin)}
                        className="w-10 h-10 rounded-xl bg-bg-card hover:bg-bg-tertiary border border-border text-foreground hover:border-teal-500/50 flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer"
                        title="Escuchar pronunciación"
                      >
                        <Volume2 className="w-4 h-4 text-teal-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Tips & Grammar Accordion */}
        {activeMaterial.grammar_tips.length > 0 && (
          <div className="glass-card rounded-2xl overflow-hidden border border-amber-500/30">
            <button
              type="button"
              onClick={() => toggleSection(99)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-500/5 transition-colors duration-200 select-none"
            >
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-sm font-bold text-foreground">
                  Tips de Fonética & Gramática
                </span>
              </div>

              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center text-text-muted transition-transform duration-200 shrink-0 ${
                  openSections[99] ? "rotate-180 bg-bg-secondary text-foreground" : ""
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {openSections[99] && (
              <div className="px-4 pb-4 pt-1 border-t border-border/60">
                <ul className="space-y-2 text-xs text-text-secondary list-disc pl-5">
                  {activeMaterial.grammar_tips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
