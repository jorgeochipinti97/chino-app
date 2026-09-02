"use client";

import React, { useState, useEffect } from "react";
import {
  CheckSquare,
  BookOpen,
  BarChart3,
  Trophy,
  Moon,
  Sun,
  Pencil,
  Check,
  Menu,
  X,
  PanelLeftClose,
} from "lucide-react";
import { StudentScore } from "@/types";
import { LESSON_MATERIALS } from "@/data/lessons";

interface SidebarProps {
  activeTab: "quizzes" | "surveys" | "leaderboard" | "notes";
  setActiveTab: (tab: "quizzes" | "surveys" | "leaderboard" | "notes") => void;
  selectedLesson: number;
  setSelectedLesson: (lessonNum: number) => void;
  currentUser: StudentScore;
  onUpdateName: (newName: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedLesson,
  setSelectedLesson,
  currentUser,
  onUpdateName,
  isOpen,
  onClose,
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(currentUser.name);

  useEffect(() => {
    setTempName(currentUser.name);
  }, [currentUser.name]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleSelectLesson = (lessonNum: number) => {
    setSelectedLesson(lessonNum);
    setActiveTab("notes");
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="md:hidden fixed inset-0 z-40 bg-black/60 apple-blur transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-screen w-64 border-r border-border bg-bg-card flex flex-col justify-between transition-transform duration-200 select-none ${
          isOpen ? "translate-x-0" : "-translate-x-full md:-translate-x-full"
        }`}
        style={{
          display: isOpen ? "flex" : "none",
        }}
      >
        {/* Top Header */}
        <div className="p-4 space-y-5 overflow-y-auto flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-chinese font-bold shadow-apple-glow text-base shrink-0">
                汉
              </div>
              <div className="min-w-0">
                <span className="font-extrabold tracking-tight text-foreground text-sm block leading-tight truncate">
                  Chino App
                </span>
                <span className="text-[11px] text-text-muted font-medium block">
                  Docs & Estudio
                </span>
              </div>
            </div>

            {/* Close Sidebar Button (Desktop & Mobile) */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-bg-secondary transition-colors"
              title="Ocultar barra lateral"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4 pt-1">
            {/* Section 1: Documentation by Classes */}
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">
                Clases & Docs
              </span>
              {LESSON_MATERIALS.map((lesson) => {
                const isSelected = activeTab === "notes" && selectedLesson === lesson.lesson_number;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.lesson_number)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                      isSelected
                        ? "bg-teal-500/15 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/30 shadow-sm"
                        : "text-text-secondary hover:bg-bg-secondary hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <BookOpen
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isSelected ? "text-teal-500" : "text-text-muted"
                        }`}
                      />
                      <span className="truncate">Clase 0{lesson.lesson_number}</span>
                    </div>

                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-bg-secondary text-text-muted border border-border">
                      Activa
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Section 2: Quizzes & Practice */}
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">
                Práctica
              </span>
              <button
                onClick={() => setActiveTab("quizzes")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                  activeTab === "quizzes"
                    ? "bg-emerald-500 text-white shadow-apple-glow"
                    : "text-text-secondary hover:bg-bg-secondary hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare
                    className={`w-3.5 h-3.5 shrink-0 ${
                      activeTab === "quizzes" ? "text-white" : "text-text-muted"
                    }`}
                  />
                  <span>Quizzes</span>
                </div>

                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    activeTab === "quizzes"
                      ? "bg-white/20 text-white"
                      : "bg-emerald-500/15 text-emerald-500"
                  }`}
                >
                  8 preg.
                </span>
              </button>
            </div>

            {/* Section 3: Community & Stats */}
            <div className="space-y-1">
              <span className="px-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">
                Comunidad
              </span>
              <button
                onClick={() => setActiveTab("surveys")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                  activeTab === "surveys"
                    ? "bg-blue-500 text-white shadow-apple-glow"
                    : "text-text-secondary hover:bg-bg-secondary hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3
                    className={`w-3.5 h-3.5 shrink-0 ${
                      activeTab === "surveys" ? "text-white" : "text-text-muted"
                    }`}
                  />
                  <span>Encuestas</span>
                </div>

                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-500 uppercase">
                  Próx.
                </span>
              </button>

              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                  activeTab === "leaderboard"
                    ? "bg-amber-500 text-white shadow-apple-glow"
                    : "text-text-secondary hover:bg-bg-secondary hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Trophy
                    className={`w-3.5 h-3.5 shrink-0 ${
                      activeTab === "leaderboard" ? "text-white" : "text-text-muted"
                    }`}
                  />
                  <span>Ranking</span>
                </div>

                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-500 uppercase">
                  Próx.
                </span>
              </button>
            </div>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-3 space-y-2.5 border-t border-border shrink-0">
          {/* User Profile Card */}
          <div className="p-2.5 rounded-xl bg-bg-secondary border border-border">
            <div className="flex items-center justify-between gap-2">
              {!isEditingName ? (
                <div
                  onClick={() => setIsEditingName(true)}
                  className="flex items-center gap-2 cursor-pointer flex-1 min-w-0 group"
                  title="Click para cambiar tu nombre"
                >
                  <span className="text-lg">{currentUser.avatar}</span>
                  <div className="truncate min-w-0">
                    <span className="text-xs font-bold text-foreground block truncate group-hover:text-emerald-500 transition-colors">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-text-muted block">Estudiante</span>
                  </div>
                  <Pencil className="w-3 h-3 text-text-muted group-hover:text-emerald-500 shrink-0 ml-auto" />
                </div>
              ) : (
                <form onSubmit={handleSaveName} className="flex items-center gap-1.5 w-full">
                  <input
                    type="text"
                    autoFocus
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={() => handleSaveName()}
                    className="flex-1 px-2 py-1 text-xs font-bold rounded-lg border border-emerald-500 bg-bg-card text-foreground outline-none"
                    placeholder="Tu nombre..."
                  />
                  <button
                    type="submit"
                    className="p-1 rounded-lg bg-emerald-500 text-white shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-xs font-bold text-foreground transition-colors"
            title="Cambiar tema claro/oscuro"
          >
            <span className="text-text-secondary">Modo {isDark ? "Oscuro" : "Claro"}</span>
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-text-muted" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
