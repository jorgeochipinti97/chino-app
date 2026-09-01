"use client";

import React, { useState } from "react";
import { StudentScore } from "@/types";
import { X, UserCheck, Plus, Sparkles } from "lucide-react";

interface UserProfileSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  students: StudentScore[];
  currentUser: StudentScore;
  onSelectUser: (user: StudentScore) => void;
  onAddNewUser: (name: string, avatar: string) => void;
}

const AVATAR_OPTIONS = ["👨‍💻", "👩‍💻", "🌸", "⚡", "🎯", "🎨", "🐉", "🐼", "🌟", "🔥", "🚀", "🍵"];

export const UserProfileSelector: React.FC<UserProfileSelectorProps> = ({
  isOpen,
  onClose,
  students,
  currentUser,
  onSelectUser,
  onAddNewUser,
}) => {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>("🐼");

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onAddNewUser(newName.trim(), selectedAvatar);
    setNewName("");
    setIsCreatingNew(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 apple-blur animate-slide-up">
      <div className="w-full max-w-md bg-bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Perfil de Estudiante</h2>
            <p className="text-xs text-text-muted">
              Seleccioná quién está practicando para guardar tu puntaje.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-text-muted hover:text-foreground hover:bg-bg-secondary transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isCreatingNew ? (
          <div className="space-y-4">
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {students.map((student) => {
                const isSelected = student.name.toLowerCase() === currentUser.name.toLowerCase();
                return (
                  <button
                    key={student.id}
                    onClick={() => {
                      onSelectUser(student);
                      onClose();
                    }}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all duration-200 min-h-[48px] ${
                      isSelected
                        ? "border-jade-500 bg-jade-50/60 dark:bg-jade-950/40 text-foreground ring-1 ring-jade-500"
                        : "border-border bg-background hover:bg-bg-secondary text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{student.avatar}</span>
                      <div>
                        <span className="text-sm font-semibold block">{student.name}</span>
                        <span className="text-xs text-text-muted">
                          {student.total_points} pts • {student.accuracy}% acierto
                        </span>
                      </div>
                    </div>

                    {isSelected && <UserCheck className="w-5 h-5 text-jade-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsCreatingNew(true)}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed border-border hover:border-jade-500 bg-bg-secondary text-xs font-semibold text-text-secondary hover:text-foreground transition-all duration-200 min-h-[44px]"
            >
              <Plus className="w-4 h-4 text-jade-600" />
              <span>Agregar nuevo compañero</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Nombre o Apodo
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ej. Lucas, Camila..."
                className="w-full p-3 rounded-2xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-jade-500 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-2">
                Elige un Avatar
              </label>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`h-11 rounded-xl flex items-center justify-center text-xl border transition-all duration-200 ${
                      selectedAvatar === emoji
                        ? "border-jade-500 bg-jade-50 dark:bg-jade-950/50 ring-2 ring-jade-500"
                        : "border-border bg-background hover:bg-bg-secondary"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-text-muted hover:text-foreground hover:bg-bg-secondary transition-all duration-200 min-h-[44px]"
              >
                Volver
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-jade-600 hover:bg-jade-700 text-white text-xs font-semibold shadow-apple-glow transition-all duration-200 min-h-[44px]"
              >
                Crear Perfil
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
