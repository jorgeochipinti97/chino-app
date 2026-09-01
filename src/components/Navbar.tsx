"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun, Upload, Trophy, BookOpen, CheckSquare, BarChart3, Pencil, Check } from "lucide-react";
import { StudentScore } from "@/types";

interface NavbarProps {
  activeTab: "quizzes" | "surveys" | "leaderboard" | "notes";
  setActiveTab: (tab: "quizzes" | "surveys" | "leaderboard" | "notes") => void;
  currentUser: StudentScore;
  onUpdateName: (newName: string) => void;
  onOpenImport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onUpdateName,
  onOpenImport,
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

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 apple-blur transition-colors duration-200 select-none">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-chinese font-bold shadow-sm text-base shrink-0">
            汉
          </div>
          <span className="font-extrabold tracking-tight text-foreground text-sm whitespace-nowrap">
            Chino <span className="text-emerald-500 font-normal">Clase 2</span>
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center p-1 bg-bg-secondary rounded-xl border border-border shrink-0">
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 outline-none ${
              activeTab === "quizzes"
                ? "bg-bg-card text-foreground shadow-sm"
                : "text-text-muted hover:text-foreground"
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
            <span>Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 outline-none ${
              activeTab === "notes"
                ? "bg-bg-card text-foreground shadow-sm"
                : "text-text-muted hover:text-foreground"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-500" />
            <span>Apuntes</span>
          </button>

          <button
            onClick={() => setActiveTab("surveys")}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 outline-none ${
              activeTab === "surveys"
                ? "bg-bg-card text-foreground shadow-sm"
                : "text-text-muted hover:text-foreground"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
            <span>Encuestas</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-500/10 text-blue-500 font-extrabold uppercase">
              Próx.
            </span>
          </button>

          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 outline-none ${
              activeTab === "leaderboard"
                ? "bg-bg-card text-foreground shadow-sm"
                : "text-text-muted hover:text-foreground"
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Ranking</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-500 font-extrabold uppercase">
              Próx.
            </span>
          </button>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* User Name with inline edit */}
          {!isEditingName ? (
            <button
              onClick={() => setIsEditingName(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-bg-secondary hover:bg-bg-tertiary text-xs font-bold text-foreground transition-all duration-200 outline-none"
              title="Click para cambiar tu nombre"
            >
              <span>{currentUser.avatar}</span>
              <span className="max-w-[70px] sm:max-w-[90px] truncate">{currentUser.name}</span>
              <Pencil className="w-3 h-3 text-text-muted ml-0.5" />
            </button>
          ) : (
            <form onSubmit={handleSaveName} className="flex items-center gap-1">
              <input
                type="text"
                autoFocus
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={() => handleSaveName()}
                className="w-20 sm:w-24 px-2 py-1 rounded-lg border border-emerald-500 bg-bg-card text-xs font-bold text-foreground outline-none"
                placeholder="Nombre..."
              />
              <button
                type="submit"
                className="p-1 rounded-lg bg-emerald-500 text-white"
              >
                <Check className="w-3 h-3" />
              </button>
            </form>
          )}

          {/* Import JSON */}
          <button
            onClick={onOpenImport}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg border border-border bg-bg-secondary hover:bg-bg-tertiary text-xs font-bold text-foreground transition-all duration-200 outline-none flex items-center gap-1"
            title="Importar JSON"
          >
            <Upload className="w-3.5 h-3.5 text-text-muted" />
            <span className="hidden md:inline">Importar</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-foreground hover:bg-bg-secondary transition-all duration-200 outline-none"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
