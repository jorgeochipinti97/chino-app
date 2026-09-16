"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { StudentScore } from "@/types";
import { getCurrentUser, setCurrentUser, updateStudentQuizScore } from "@/lib/storage";

/**
 * El alumno vive en un contexto porque lo tocan dos lugares que ahora están en rutas
 * distintas: la sidebar (editar el nombre) y el quiz (sumar puntos al terminar).
 */
const FALLBACK: StudentScore = {
  id: "std-local",
  name: "Jorge",
  avatar: "👨‍💻",
  total_points: 0,
  quizzes_completed: 0,
  accuracy: 100,
  streak_days: 1,
  last_active: "Ahora",
};

interface UserContextValue {
  user: StudentScore;
  updateName: (name: string) => void;
  registerQuiz: (correctCount: number, totalCount: number, timeBonus: number) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentScore>(FALLBACK);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const updateName = useCallback((name: string) => {
    setUser((prev) => {
      const next = { ...prev, name };
      setCurrentUser(next);
      return next;
    });
  }, []);

  const registerQuiz = useCallback(
    (correctCount: number, totalCount: number, timeBonus: number) => {
      setUser((prev) => {
        const updated = updateStudentQuizScore(prev.name, correctCount, totalCount, timeBonus);
        return (
          updated.find((s) => s.name.toLowerCase() === prev.name.toLowerCase()) || {
            ...prev,
            total_points: prev.total_points + correctCount * 100 + timeBonus,
            quizzes_completed: prev.quizzes_completed + 1,
          }
        );
      });
    },
    []
  );

  return (
    <UserContext.Provider value={{ user, updateName, registerQuiz }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser necesita estar dentro de <UserProvider>");
  return ctx;
}
