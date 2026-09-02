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

export default function Home() {
  const [activeTab, setActiveTab] = useState<"quizzes" | "surveys" | "leaderboard" | "notes">("notes");
  const [selectedLesson, setSelectedLesson] = useState<number>(2);
  const [quizzes, setQuizzes] = useState<QuizData[]>(INITIAL_QUIZZES);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
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
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <main className="flex-1 min-w-0 px-3 py-4 sm:px-6 sm:py-6 overflow-y-auto">
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
  );
}
