"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { UserProvider } from "@/lib/user-context";
import { PanelLeftOpen, Menu } from "lucide-react";

/**
 * Cáscara común de todas las rutas: sidebar + drawer mobile + contexto del alumno.
 * Vive en el layout, así al navegar entre clases no se remonta ni pierde el scroll.
 */
export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // En celular el sidebar es un drawer: arranca CERRADO o te tapa la app al entrar.
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsSidebarOpen(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  return (
    <UserProvider>
      <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background text-foreground transition-colors duration-200 selection:bg-emerald-500/20 selection:text-emerald-700">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex-1 min-w-0 flex flex-col h-[100dvh] overflow-y-auto overflow-x-hidden">
          {!isSidebarOpen && (
            <div className="sticky top-0 z-30 px-4 py-2 pt-[max(0.5rem,env(safe-area-inset-top))] bg-background/80 apple-blur border-b border-border flex items-center justify-between animate-apple-in">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center gap-2 px-3 min-h-11 rounded-xl border border-border bg-bg-card hover:bg-bg-secondary text-xs font-mono font-bold text-foreground transition-all shadow-sm active:scale-95"
                title="Mostrar barra lateral"
              >
                <Menu className="w-4 h-4 text-emerald-500 md:hidden" />
                <PanelLeftOpen className="w-4 h-4 text-emerald-500 hidden md:block" />
                <span className="hidden sm:inline">Barra lateral</span>
                <span className="sm:hidden">Menú</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                <span className="font-chinese font-bold text-emerald-500 text-sm">汉</span>
                <span>Chino App</span>
              </div>
            </div>
          )}

          <main className="flex-1 min-w-0 px-3 py-4 sm:px-6 sm:py-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
};
