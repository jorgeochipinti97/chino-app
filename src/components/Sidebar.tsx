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
  PanelLeftOpen,
  FileText,
  GraduationCap,
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
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedLesson,
  setSelectedLesson,
  currentUser,
  onUpdateName,
  isCollapsed,
  setIsCollapsed,
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
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
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden sticky top-0 z-40 w-full h-14 border-b border-border bg-background/95 apple-blur px-4 flex items-center justify-between">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl text-text-secondary hover:text-foreground hover:bg-bg-secondary transition-colors"
          aria-label="Abrir barra lateral"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-chinese font-bold text-sm">
            汉
          </div>
          <span className="font-extrabold text-sm text-foreground">
            Chino <span className="text-emerald-500 font-semibold">Docs</span>
          </span>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-text-secondary hover:text-foreground hover:bg-bg-secondary transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 z-50 bg-black/60 apple-blur transition-opacity"
        />
      )}

      {/* Sidebar (Desktop Persistent / Collapsible + Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-screen border-r border-border bg-bg-card flex flex-col justify-between transition-all duration-200 select-none ${
          /* Mobile Drawer */
          isMobileOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full md:translate-x-0"
        } ${
          /* Desktop Collapsed vs Expanded */
          isCollapsed ? "md:w-16" : "md:w-64"
        }`}
      >
        {/* Top Header */}
        <div className={`${isCollapsed ? "p-3 space-y-4" : "p-4 sm:p-5 space-y-5"} overflow-y-auto flex-1`}>
          <div className="flex items-center justify-between">
            {!isCollapsed ? (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-chinese font-bold shadow-apple-glow text-lg shrink-0">
                  汉
                </div>
                <div className="min-w-0 truncate">
                  <span className="font-extrabold tracking-tight text-foreground text-sm block leading-tight truncate">
                    Chino App
                  </span>
                  <span className="text-[11px] text-text-muted font-medium block">
                    Docs & Estudio
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-9 h-9 mx-auto rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-chinese font-bold text-base shadow-apple-glow shrink-0">
                汉
              </div>
            )}

            {/* Desktop Collapse Toggle Button */}
            <button
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="hidden md:flex p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-bg-secondary transition-colors"
              title={isCollapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>

            {/* Close button on mobile */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-bg-secondary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Hierarchical Navigation */}
          <nav className="space-y-4 pt-1">
            {/* Section 1: Documentation by Classes */}
            <div className="space-y-1">
              {!isCollapsed && (
                <span className="px-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">
                  Clases & Docs
                </span>
              )}
              {LESSON_MATERIALS.map((lesson) => {
                const isSelected = activeTab === "notes" && selectedLesson === lesson.lesson_number;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.lesson_number)}
                    title={isCollapsed ? `Clase 0${lesson.lesson_number}` : undefined}
                    className={`w-full flex items-center ${
                      isCollapsed ? "justify-center px-2 py-2.5" : "justify-between px-3 py-2"
                    } rounded-xl text-xs font-mono transition-all duration-200 ${
                      isSelected
                        ? "bg-teal-500/15 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/30"
                        : "text-text-secondary hover:bg-bg-secondary hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <BookOpen className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-teal-500" : "text-text-muted"}`} />
                      {!isCollapsed && (
                        <span className="truncate">Clase 0{lesson.lesson_number}</span>
                      )}
                    </div>

                    {!isCollapsed && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-bg-secondary text-text-muted border border-border">
                        Activa
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Section 2: Quizzes & Practice */}
            <div className="space-y-1">
              {!isCollapsed && (
                <span className="px-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">
                  Práctica
                </span>
              )}
              <button
                onClick={() => {
                  setActiveTab("quizzes");
                  setIsMobileOpen(false);
                }}
                title={isCollapsed ? "Quizzes" : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center px-2 py-2.5" : "justify-between px-3 py-2"
                } rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                  activeTab === "quizzes"
                    ? "bg-emerald-500 text-white shadow-apple-glow"
                    : "text-text-secondary hover:bg-bg-secondary hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className={`w-3.5 h-3.5 shrink-0 ${activeTab === "quizzes" ? "text-white" : "text-text-muted"}`} />
                  {!isCollapsed && <span>Quizzes</span>}
                </div>

                {!isCollapsed && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      activeTab === "quizzes" ? "bg-white/20 text-white" : "bg-emerald-500/15 text-emerald-500"
                    }`}
                  >
                    8 preg.
                  </span>
                )}
              </button>
            </div>

            {/* Section 3: Community & Stats */}
            <div className="space-y-1">
              {!isCollapsed && (
                <span className="px-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">
                  Comunidad
                </span>
              )}
              <button
                onClick={() => {
                  setActiveTab("surveys");
                  setIsMobileOpen(false);
                }}
                title={isCollapsed ? "Encuestas" : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center px-2 py-2.5" : "justify-between px-3 py-2"
                } rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                  activeTab === "surveys"
                    ? "bg-blue-500 text-white shadow-apple-glow"
                    : "text-text-secondary hover:bg-bg-secondary hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className={`w-3.5 h-3.5 shrink-0 ${activeTab === "surveys" ? "text-white" : "text-text-muted"}`} />
                  {!isCollapsed && <span>Encuestas</span>}
                </div>

                {!isCollapsed && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-500 uppercase">
                    Próx.
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab("leaderboard");
                  setIsMobileOpen(false);
                }}
                title={isCollapsed ? "Ranking" : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center px-2 py-2.5" : "justify-between px-3 py-2"
                } rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
                  activeTab === "leaderboard"
                    ? "bg-amber-500 text-white shadow-apple-glow"
                    : "text-text-secondary hover:bg-bg-secondary hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Trophy className={`w-3.5 h-3.5 shrink-0 ${activeTab === "leaderboard" ? "text-white" : "text-text-muted"}`} />
                  {!isCollapsed && <span>Ranking</span>}
                </div>

                {!isCollapsed && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-500 uppercase">
                    Próx.
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className={`${isCollapsed ? "p-2 space-y-2" : "p-3 sm:p-4 space-y-2.5"} border-t border-border shrink-0`}>
          {/* User Profile Card */}
          {!isCollapsed ? (
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
          ) : (
            <div
              className="w-10 h-10 mx-auto rounded-xl bg-bg-secondary flex items-center justify-center text-lg cursor-pointer"
              title={`Perfil: ${currentUser.name}`}
            >
              {currentUser.avatar}
            </div>
          )}

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2"
            } rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-xs font-bold text-foreground transition-colors`}
            title="Cambiar tema claro/oscuro"
          >
            {!isCollapsed && (
              <span className="text-text-secondary">Modo {isDark ? "Oscuro" : "Claro"}</span>
            )}
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
