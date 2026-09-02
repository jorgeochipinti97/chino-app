"use client";

import React, { useState } from "react";
import { LESSON_MATERIALS } from "@/data/lessons";
import { speakChinese } from "@/lib/speech";
import {
  Volume2,
  BookOpen,
  Search,
  Hash,
  Lightbulb,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface LessonNotesViewProps {
  selectedLesson?: number;
  setSelectedLesson?: (num: number) => void;
}

export const LessonNotesView: React.FC<LessonNotesViewProps> = ({
  selectedLesson = 2,
  setSelectedLesson,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeMaterial =
    LESSON_MATERIALS.find((m) => m.lesson_number === selectedLesson) || LESSON_MATERIALS[0];

  // Search filter
  const filteredSections = activeMaterial.sections.map((section) => {
    const matchingItems = section.items.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.hanzi.toLowerCase().includes(query) ||
        item.pinyin.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query) ||
        (item.pronunciation && item.pronunciation.toLowerCase().includes(query))
      );
    });
    return { ...section, items: matchingItems };
  }).filter((section) => !searchQuery || section.items.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 py-4 sm:py-6 space-y-8 animate-apple-in">
      {/* Documentation Hero Header */}
      <header className="space-y-3 pb-6 border-b border-border">
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
          <span>Docs</span>
          <span>/</span>
          <span className="text-teal-500 font-semibold">Clase 0{activeMaterial.lesson_number}</span>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-mono">
              {activeMaterial.title}
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono text-[11px] font-bold border border-teal-500/20">
              v2.0
            </span>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-3xl">
            {activeMaterial.summary}
          </p>
        </div>

        {/* Search filter in doc */}
        <div className="pt-2">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar caracteres, pinyin o traducción en esta clase..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-bg-secondary text-xs text-foreground placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Documentation Sections */}
      <div className="space-y-8">
        {filteredSections.map((section, sIdx) => (
          <section key={sIdx} className="space-y-4">
            {/* Section Title */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-teal-500/10 text-teal-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  {sIdx + 1}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight font-mono">
                  {section.title}
                </h2>
              </div>
              {section.description && (
                <p className="text-xs text-text-muted pl-8 leading-relaxed font-mono">
                  {section.description}
                </p>
              )}
            </div>

            {/* Reference Table / Tokens */}
            <div className="grid grid-cols-1 gap-2.5">
              {section.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  className="p-3.5 sm:p-4 rounded-2xl border border-border bg-bg-card hover:border-teal-500/40 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm group"
                >
                  {/* Chinese Character & Pinyin badge */}
                  <div className="flex items-center gap-3.5 min-w-0 sm:w-2/5">
                    <span className="text-2xl sm:text-3xl font-chinese font-bold text-foreground tracking-wide shrink-0">
                      {item.hanzi}
                    </span>
                    <div className="min-w-0">
                      <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono text-xs font-bold inline-block">
                        {item.pinyin}
                      </span>
                      {item.type && (
                        <span className="text-[10px] text-text-muted font-mono block mt-0.5">
                          {item.type}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Meaning & Phonetic Breakdown */}
                  <div className="flex-1 min-w-0 sm:px-3">
                    <span className="text-xs sm:text-sm font-semibold text-foreground block leading-snug">
                      {item.meaning}
                    </span>
                    {item.pronunciation && (
                      <span className="text-[11px] text-text-muted font-mono block mt-0.5 leading-snug">
                        🗣️ {item.pronunciation}
                      </span>
                    )}
                  </div>

                  {/* Sound Trigger */}
                  <div className="shrink-0 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => speakChinese(item.hanzi || item.pinyin)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-border text-foreground hover:border-teal-500/50 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                      title="Pronunciación nativa en mandarín"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-teal-500" />
                      <span className="font-mono text-[11px]">Audio</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Syntax Callout: Grammar & Phonetic Rules */}
        {activeMaterial.grammar_tips.length > 0 && !searchQuery && (
          <section className="rounded-2xl border border-amber-500/30 bg-bg-card overflow-hidden shadow-sm space-y-0">
            <div className="p-4 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold font-mono text-foreground uppercase tracking-wider">
                Reglas Gramaticales & Fonética — Clase 0{activeMaterial.lesson_number}
              </h3>
            </div>

            <div className="p-4 sm:p-5 space-y-2.5 font-mono text-xs text-text-secondary leading-relaxed">
              {activeMaterial.grammar_tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-border bg-bg-secondary/60 flex items-start gap-2.5"
                >
                  <span className="text-amber-500 font-bold select-none">•</span>
                  <span className="text-foreground">{tip}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
