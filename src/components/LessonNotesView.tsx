"use client";

import React, { useState } from "react";
import { LESSON_MATERIALS } from "@/data/lessons";
import { speakChinese } from "@/lib/speech";
import {
  Volume2,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Code2,
  FileText,
  Layers,
  Sparkles,
  Check,
  Search,
} from "lucide-react";

export const LessonNotesView: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<number>(2);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeMaterial =
    LESSON_MATERIALS.find((m) => m.lesson_number === selectedLesson) || LESSON_MATERIALS[0];

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleAll = (expand: boolean) => {
    if (!expand) {
      setOpenSections({});
    } else {
      const all: Record<number, boolean> = { 99: true };
      activeMaterial.sections.forEach((_, idx) => {
        all[idx] = true;
      });
      setOpenSections(all);
    }
  };

  const allExpanded =
    activeMaterial.sections.every((_, idx) => !!openSections[idx]) && !!openSections[99];

  // Search filter
  const filteredSections = activeMaterial.sections
    .map((section, sIdx) => {
      const matchingItems = section.items.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.hanzi.toLowerCase().includes(query) ||
          item.pinyin.toLowerCase().includes(query) ||
          item.meaning.toLowerCase().includes(query) ||
          (item.pronunciation && item.pronunciation.toLowerCase().includes(query))
        );
      });
      return { section, originalIndex: sIdx, matchingItems };
    })
    .filter((entry) => !searchQuery || entry.matchingItems.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 py-4 sm:py-6 space-y-6 animate-apple-in">
      {/* Doc Breadcrumbs & Header */}
      <div className="space-y-2 pb-4 border-b border-border">
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted relative">
          <span>Docs</span>
          <ChevronRight className="w-3 h-3 text-text-muted" />

          {/* Interactive Class Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsClassDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-bg-secondary text-foreground font-semibold transition-colors cursor-pointer border border-transparent hover:border-border"
            >
              <span>Clases</span>
              <ChevronDown className="w-3 h-3 text-text-muted" />
            </button>

            {isClassDropdownOpen && (
              <>
                <div
                  onClick={() => setIsClassDropdownOpen(false)}
                  className="fixed inset-0 z-30"
                />
                <div className="absolute left-0 top-full mt-1.5 z-40 w-56 rounded-xl border border-border bg-bg-card p-1.5 shadow-apple-sm space-y-1">
                  <div className="px-2.5 py-1 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">
                    Seleccionar Clase
                  </div>
                  {LESSON_MATERIALS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedLesson(m.lesson_number);
                        setIsClassDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-mono transition-colors text-left ${
                        selectedLesson === m.lesson_number
                          ? "bg-emerald-500/15 text-emerald-500 font-bold"
                          : "text-foreground hover:bg-bg-secondary"
                      }`}
                    >
                      <span>Clase 0{m.lesson_number}</span>
                      {selectedLesson === m.lesson_number && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <ChevronRight className="w-3 h-3 text-text-muted" />
          <span className="text-emerald-500 font-semibold">Clase 0{activeMaterial.lesson_number}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-mono">
                {activeMaterial.title}
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono text-[11px] font-bold border border-teal-500/20">
                v2.0
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary mt-1.5 max-w-2xl leading-relaxed">
              {activeMaterial.summary}
            </p>
          </div>

          {/* Quick Expand/Collapse all controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => toggleAll(!allExpanded)}
              className="px-3 py-1.5 rounded-lg border border-border bg-bg-secondary hover:bg-bg-tertiary text-xs font-mono font-medium text-foreground transition-colors"
            >
              {allExpanded ? "Colapsar todo" : "Expandir todo"}
            </button>
          </div>
        </div>

        {/* Quick Search in Documentation */}
        <div className="pt-2">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar caracteres, pinyin o significado..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-border bg-bg-secondary text-xs text-foreground placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Modular Documentation Sections */}
      <div className="space-y-3">
        {filteredSections.map(({ section, originalIndex, matchingItems }) => {
          const isOpen = searchQuery ? true : !!openSections[originalIndex];

          return (
            <div
              key={originalIndex}
              className="rounded-2xl border border-border bg-bg-card overflow-hidden transition-all duration-200 shadow-sm"
            >
              {/* Doc Section Header (Accordion Trigger) */}
              <button
                type="button"
                onClick={() => toggleSection(originalIndex)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-bg-secondary/70 transition-colors select-none group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                  <div className="w-7 h-7 rounded-lg bg-bg-secondary border border-border flex items-center justify-center text-text-muted group-hover:text-foreground shrink-0 font-mono text-xs font-bold">
                    {originalIndex + 1}
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm sm:text-base font-bold text-foreground block truncate">
                      {section.title}
                    </span>
                    {section.description && (
                      <span className="text-xs text-text-muted block truncate font-mono">
                        {section.description}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-bg-secondary text-text-muted border border-border">
                    {matchingItems.length} items
                  </span>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-text-muted transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-foreground" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Doc Section Content (Code-style Reference Table) */}
              {isOpen && (
                <div className="border-t border-border bg-bg-secondary/40 p-3 sm:p-4 space-y-2">
                  <div className="grid grid-cols-1 gap-2">
                    {matchingItems.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="p-3.5 rounded-xl border border-border bg-bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-500/40 transition-colors"
                      >
                        {/* Token & Pinyin */}
                        <div className="flex items-center gap-3.5 min-w-0 sm:w-1/3">
                          <span className="text-2xl sm:text-3xl font-chinese font-bold text-foreground shrink-0 tracking-wide">
                            {item.hanzi}
                          </span>
                          <div className="min-w-0">
                            <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono text-xs font-bold inline-block">
                              {item.pinyin}
                            </span>
                            {item.type && (
                              <span className="text-[10px] text-text-muted block font-mono mt-0.5">
                                {item.type}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Meaning & Phonetic note */}
                        <div className="flex-1 min-w-0 sm:px-4">
                          <span className="text-xs sm:text-sm font-semibold text-foreground block">
                            {item.meaning}
                          </span>
                          {item.pronunciation && (
                            <span className="text-[11px] text-text-muted font-mono block mt-0.5">
                              🗣️ {item.pronunciation}
                            </span>
                          )}
                        </div>

                        {/* Audio Trigger */}
                        <div className="shrink-0 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => speakChinese(item.hanzi || item.pinyin)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-border text-foreground hover:border-emerald-500/50 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                            title="Escuchar audio nativo"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="font-mono text-[11px]">Audio</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Technical Callout: Grammar & Phonetics Rules */}
        {activeMaterial.grammar_tips.length > 0 && (
          <div className="rounded-2xl border border-amber-500/30 bg-bg-card overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection(99)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-amber-500/5 transition-colors select-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0 font-mono text-xs font-bold">
                  §
                </div>
                <div>
                  <span className="text-sm sm:text-base font-bold text-foreground block">
                    Reglas Gramaticales & Fonética
                  </span>
                  <span className="text-xs text-text-muted font-mono block">
                    Notas de sintaxis para la Clase 02
                  </span>
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center text-text-muted transition-transform duration-200 ${
                  openSections[99] ? "rotate-180 text-foreground" : ""
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {openSections[99] && (
              <div className="border-t border-border bg-amber-500/5 p-4 sm:p-5">
                <div className="space-y-2.5 font-mono text-xs text-text-secondary leading-relaxed">
                  {activeMaterial.grammar_tips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-amber-500/20 bg-bg-card flex items-start gap-2.5"
                    >
                      <span className="text-amber-500 font-bold select-none">•</span>
                      <span className="text-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
