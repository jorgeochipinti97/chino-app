"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { QuizView } from "@/components/QuizView";
import { SurveyView } from "@/components/SurveyView";
import { LeaderboardView } from "@/components/LeaderboardView";
import { LessonNotesView } from "@/components/LessonNotesView";
import { INITIAL_QUIZZES } from "@/data/lessons";
import {
  getStoredQuizzes,
  getCurrentUser,
  setCurrentUser,
  updateStudentQuizScore,
} from "@/lib/storage";
import { QuizData, StudentScore } from "@/types";
import { PanelLeftOpen, Menu } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"quizzes" | "surveys" | "leaderboard" | "notes">("notes");
  const [selectedLesson, setSelectedLesson] = useState<number>(2);
  const [quizzes, setQuizzes] = useState<QuizData[]>(INITIAL_QUIZZES);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [currentUser, setCurrentUserState] = useState<StudentScore>({
    id: "std-local",
    name: "Jorge",
    avatar: "👨‍💻",
    total_points: 0,
    quizzes_completed: 0,
    accuracy: 100,
    streak_days: 1,
    last_active: "Ahora",
  });

  useEffect(() => {
    setQuizzes(getStoredQuizzes());
    setCurrentUserState(getCurrentUser());
  }, []);

  const handleFinishQuiz = (correctCount: number, totalCount: number, timeBonus: number) => {
    const updated = updateStudentQuizScore(currentUser.name, correctCount, totalCount, timeBonus);
    const me = updated.find((s) => s.name.toLowerCase() === currentUser.name.toLowerCase()) || {
      ...currentUser,
      total_points: currentUser.total_points + correctCount * 100 + timeBonus,
      quizzes_completed: currentUser.quizzes_completed + 1,
    };
    setCurrentUserState(me);
  };

  const handleUpdateName = (newName: string) => {
    const updated: StudentScore = { ...currentUser, name: newName };
    setCurrentUser(updated);
    setCurrentUserState(updated);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground transition-colors duration-200 selection:bg-emerald-500/20 selection:text-emerald-700">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLesson={selectedLesson}
        setSelectedLesson={setSelectedLesson}
        currentUser={currentUser}
        onUpdateName={handleUpdateName}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Top Control Bar when Sidebar is Closed on Desktop */}
        {!isSidebarOpen && (
          <div className="sticky top-0 z-30 px-4 py-3 bg-background/80 apple-blur border-b border-border flex items-center justify-between animate-apple-in">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-bg-card hover:bg-bg-secondary text-xs font-mono font-bold text-foreground transition-all shadow-sm"
              title="Mostrar barra lateral"
            >
              <PanelLeftOpen className="w-4 h-4 text-emerald-500" />
              <span>Barra lateral</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span className="font-chinese font-bold text-emerald-500 text-sm">汉</span>
              <span>Chino App</span>
            </div>
          </div>
        )}

        <main className="flex-1 min-w-0 px-3 py-4 sm:px-6 sm:py-6">
          {activeTab === "notes" && (
            <LessonNotesView
              selectedLesson={selectedLesson}
              setSelectedLesson={setSelectedLesson}
            />
          )}

          {activeTab === "quizzes" && (
            <QuizView
              quizzes={quizzes}
              currentUser={currentUser}
              onFinishQuiz={handleFinishQuiz}
            />
          )}

          {activeTab === "surveys" && (
            <SurveyView />
          )}

          {activeTab === "leaderboard" && (
            <LeaderboardView
              currentUser={currentUser}
            />
          )}
        </main>
      </div>
    </div>
  );
}
