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
} from "lucide-react";
import { StudentScore } from "@/types";

interface SidebarProps {
  activeTab: "quizzes" | "surveys" | "leaderboard" | "notes";
  setActiveTab: (tab: "quizzes" | "surveys" | "leaderboard" | "notes") => void;
  currentUser: StudentScore;
  onUpdateName: (newName: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onUpdateName,
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

  const navItems = [
    {
      id: "quizzes" as const,
      label: "Quizzes",
      icon: CheckSquare,
      badge: "8 preg.",
      badgeColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "notes" as const,
      label: "Apuntes",
      icon: BookOpen,
      badge: "Clase 2",
      badgeColor: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
    },
    {
      id: "surveys" as const,
      label: "Encuestas",
      icon: BarChart3,
      badge: "Próx.",
      badgeColor: "bg-blue-500/15 text-blue-500",
    },
    {
      id: "leaderboard" as const,
      label: "Ranking",
      icon: Trophy,
      badge: "Próx.",
      badgeColor: "bg-amber-500/15 text-amber-500",
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden sticky top-0 z-40 w-full h-14 border-b border-border bg-background/90 apple-blur px-4 flex items-center justify-between">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl text-text-secondary hover:text-foreground hover:bg-bg-secondary transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-chinese font-bold text-sm">
            汉
          </div>
          <span className="font-extrabold text-sm text-foreground">
            Chino <span className="text-emerald-500 font-semibold">Clase 2</span>
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

      {/* Sidebar (Desktop Persistent + Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-screen w-64 border-r border-border bg-bg-card flex flex-col justify-between transition-transform duration-200 select-none ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top Header */}
        <div className="p-5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-chinese font-bold shadow-apple-glow text-xl shrink-0">
                汉
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-foreground text-base block leading-tight">
                  Chino App
                </span>
                <span className="text-[11px] text-text-muted font-medium block">
                  Clase 2 • Mandarín
                </span>
              </div>
            </div>

            {/* Close button on mobile */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-text-muted hover:text-foreground hover:bg-bg-secondary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-apple-glow"
                      : "text-text-secondary hover:bg-bg-secondary hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-text-muted"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-border space-y-2.5">
          {/* User Profile Card */}
          <div className="p-3 rounded-2xl bg-bg-secondary border border-border">
            <div className="flex items-center justify-between gap-2">
              {!isEditingName ? (
                <div
                  onClick={() => setIsEditingName(true)}
                  className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0 group"
                  title="Click para cambiar tu nombre"
                >
                  <span className="text-xl">{currentUser.avatar}</span>
                  <div className="truncate">
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
                    className="flex-1 px-2.5 py-1 text-xs font-bold rounded-xl border border-emerald-500 bg-bg-card text-foreground outline-none"
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
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-xs font-bold text-foreground transition-colors"
          >
            <span className="text-text-secondary">Modo {isDark ? "Oscuro" : "Claro"}</span>
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-text-muted" />}
          </button>
        </div>
      </aside>
    </>
  );
};
