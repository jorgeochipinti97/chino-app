"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  BookOpen,
  BarChart3,
  Trophy,
  Moon,
  Sun,
  Pencil,
  Check,
  PanelLeftClose,
  Brush,
  Ear,
  Hash,
  MessageSquare,
  LucideIcon,
} from "lucide-react";
import { LESSON_MATERIALS, INITIAL_QUIZZES } from "@/data/lessons";
import { useUser } from "@/lib/user-context";
import { lessonHref } from "@/lib/routes";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge: string;
  /** Tailwind no arma clases por concatenación, así que cada color va escrito entero. */
  activeBg: string;
  idleIcon: string;
  activeBadge: string;
  idleBadge: string;
  chineseBadge?: boolean;
}

const PRACTICE_NAV: NavItem[] = [
  {
    href: "/",
    label: "Documentación",
    icon: BookOpen,
    badge: "Clases",
    activeBg: "bg-teal-500 text-white shadow-apple-glow",
    idleIcon: "text-teal-500",
    activeBadge: "bg-white/20 text-white",
    idleBadge: "bg-teal-500/15 text-teal-500",
  },
  {
    href: "/practicar",
    label: "Quizzes",
    icon: CheckSquare,
    badge: `${INITIAL_QUIZZES.reduce((acc, q) => acc + q.questions.length, 0)} preg.`,
    activeBg: "bg-emerald-500 text-white shadow-apple-glow",
    idleIcon: "text-emerald-500",
    activeBadge: "bg-white/20 text-white",
    idleBadge: "bg-emerald-500/15 text-emerald-500",
  },
  {
    href: "/trazos",
    label: "Trazos",
    icon: Brush,
    badge: "笔顺",
    chineseBadge: true,
    activeBg: "bg-rose-500 text-white shadow-apple-glow",
    idleIcon: "text-rose-500",
    activeBadge: "bg-white/20 text-white",
    idleBadge: "bg-rose-500/15 text-rose-500",
  },
  {
    href: "/tonos",
    label: "Tonos",
    icon: Ear,
    badge: "声调",
    chineseBadge: true,
    activeBg: "bg-violet-500 text-white shadow-apple-glow",
    idleIcon: "text-violet-500",
    activeBadge: "bg-white/20 text-white",
    idleBadge: "bg-violet-500/15 text-violet-500",
  },
  {
    href: "/numeros",
    label: "Números",
    icon: Hash,
    badge: "数字",
    chineseBadge: true,
    activeBg: "bg-sky-500 text-white shadow-apple-glow",
    idleIcon: "text-sky-500",
    activeBadge: "bg-white/20 text-white",
    idleBadge: "bg-sky-500/15 text-sky-500",
  },
  {
    href: "/oraciones",
    label: "Oraciones",
    icon: MessageSquare,
    badge: "句子",
    chineseBadge: true,
    activeBg: "bg-orange-500 text-white shadow-apple-glow",
    idleIcon: "text-orange-500",
    activeBadge: "bg-white/20 text-white",
    idleBadge: "bg-orange-500/15 text-orange-500",
  },
];

const COMMUNITY_NAV: NavItem[] = [
  {
    href: "/encuestas",
    label: "Encuestas",
    icon: BarChart3,
    badge: "Próx.",
    activeBg: "bg-blue-500 text-white shadow-apple-glow",
    idleIcon: "text-blue-500",
    activeBadge: "bg-white/20 text-white",
    idleBadge: "bg-blue-500/10 text-blue-500",
  },
  {
    href: "/ranking",
    label: "Ranking",
    icon: Trophy,
    badge: "Próx.",
    activeBg: "bg-amber-500 text-white shadow-apple-glow",
    idleIcon: "text-amber-500",
    activeBadge: "bg-white/20 text-white",
    idleBadge: "bg-amber-500/10 text-amber-500",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { user, updateName } = useUser();

  const [isDark, setIsDark] = useState<boolean>(false);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(user.name);

  useEffect(() => {
    setTempName(user.name);
  }, [user.name]);

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
    if (tempName.trim()) updateName(tempName.trim());
    setIsEditingName(false);
  };

  /** En celular el sidebar tapa la pantalla: al elegir algo hay que cerrarlo. */
  const closeIfMobile = () => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      onClose();
    }
  };

  /** Las clases cuelgan de Documentación: estando en /clase/04 se marca esa sección. */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/clase") : pathname === href;

  const renderNav = (items: NavItem[]) =>
    items.map(({ href, label, icon: Icon, badge, ...style }) => {
      const active = isActive(href);
      return (
        <Link
          key={href}
          href={href}
          onClick={closeIfMobile}
          className={`w-full flex items-center justify-between px-3 min-h-11 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer active:scale-[0.98] ${
            active ? style.activeBg : "text-text-secondary hover:bg-bg-secondary hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : style.idleIcon}`} />
            <span>{label}</span>
          </div>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              style.chineseBadge ? "font-chinese" : "font-mono"
            } ${active ? style.activeBadge : style.idleBadge}`}
          >
            {badge}
          </span>
        </Link>
      );
    });

  return (
    <>
      {/* Mobile Backdrop Overlay with smooth fade */}
      <div
        onClick={onClose}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 apple-blur transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar with smooth 300ms transition */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-[100dvh] border-r border-border bg-bg-card flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none overflow-hidden ${
          isOpen
            ? "w-64 opacity-100 translate-x-0"
            : "w-0 opacity-0 -translate-x-full md:translate-x-0 border-r-0"
        }`}
      >
        <div className="w-64 flex flex-col h-full justify-between">
          {/* Top Section */}
          <div className="p-4 pt-[max(1rem,env(safe-area-inset-top))] space-y-5 overflow-y-auto flex-1 overscroll-contain">
            {/* Header */}
            <div className="flex items-center justify-between pb-1">
              <Link
                href="/"
                onClick={closeIfMobile}
                className="flex items-center gap-2.5 min-w-0 group"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-chinese font-bold shadow-apple-glow text-base shrink-0">
                  汉
                </div>
                <div className="min-w-0">
                  <span className="font-extrabold tracking-tight text-foreground text-sm block leading-tight truncate group-hover:text-emerald-500 transition-colors">
                    Chino App
                  </span>
                  <span className="text-[11px] text-text-muted font-medium block">
                    Documentación & Práctica
                  </span>
                </div>
              </Link>

              {/* Close Sidebar Button */}
              <button
                onClick={onClose}
                className="w-11 h-11 -mr-1.5 flex items-center justify-center rounded-lg text-text-muted hover:text-foreground hover:bg-bg-secondary transition-colors cursor-pointer shrink-0"
                title="Ocultar barra lateral"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            <nav className="space-y-4">
              <div className="space-y-1">{renderNav(PRACTICE_NAV)}</div>

              {/* Índice de clases */}
              <div className="space-y-1 pt-2 border-t border-border">
                <span className="px-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">
                  Índice de Clases
                </span>
                <div className="space-y-0.5 md:max-h-52 md:overflow-y-auto pr-1">
                  {LESSON_MATERIALS.map((lesson) => {
                    const href = lessonHref(lesson.lesson_number);
                    const selected = pathname === href;

                    return (
                      <Link
                        key={lesson.id}
                        href={href}
                        onClick={closeIfMobile}
                        className={`w-full flex items-center justify-between px-3 min-h-11 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer text-left active:scale-[0.98] ${
                          selected
                            ? "bg-teal-500/15 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/30"
                            : "text-text-secondary hover:bg-bg-secondary hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[11px] text-text-muted">
                            0{lesson.lesson_number}
                          </span>
                          <span className="truncate">
                            {lesson.title.replace(/^Clase\s*\d+\s*:\s*/i, "")}
                          </span>
                        </div>
                        {selected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Comunidad */}
              <div className="space-y-1 pt-2 border-t border-border">
                <span className="px-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider block">
                  Comunidad
                </span>
                {renderNav(COMMUNITY_NAV)}
              </div>
            </nav>
          </div>

          {/* Bottom Profile & Theme */}
          <div className="p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] space-y-2.5 border-t border-border shrink-0">
            <div className="p-2.5 rounded-xl bg-bg-secondary border border-border">
              <div className="flex items-center justify-between gap-2">
                {!isEditingName ? (
                  <div
                    onClick={() => setIsEditingName(true)}
                    className="flex items-center gap-2 cursor-pointer flex-1 min-w-0 group"
                    title="Click para cambiar tu nombre"
                  >
                    <span className="text-lg">{user.avatar}</span>
                    <div className="truncate min-w-0">
                      <span className="text-xs font-bold text-foreground block truncate group-hover:text-emerald-500 transition-colors">
                        {user.name}
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
              className="w-full flex items-center justify-between px-3 min-h-11 py-2 rounded-xl border border-border bg-bg-secondary hover:bg-bg-tertiary text-xs font-bold text-foreground transition-colors cursor-pointer active:scale-[0.98]"
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
        </div>
      </aside>
    </>
  );
};
