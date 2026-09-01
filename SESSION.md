# Session notes — chino-app

Lightweight continuity log. Caps: ~300 lines, prune stale entries.

Last updated: 2026-09-01

---

## Current state

- **Stack**: Next.js 15 (App Router, TypeScript), Tailwind CSS, Lucide icons, Web Speech API (Mandarin TTS), localStorage persistence (no backend needed for now).
- **Features implemented**:
  - Quizzes interactivos por clase (Clase 2 con datos reales de `quiz_clase_02.json` + Clase 1) con feedback táctil inmediato, explicaciones gramaticales y audio en chino mandarín.
  - Encuestas de feedback por clase con métricas de dificultad, ritmo y dudas de compañeros.
  - Ranking / Leaderboard del curso con podio (Oro, Plata, Bronce), puntos, rachas, precisión y selector de perfiles de alumnos.
  - Apuntes interactivos con pronunciación palabra por palabra y tips de fonética.
  - Modal de importación de cuestionarios JSON y drag & drop para subir nuevas clases al instante.
  - Animaciones fluidas estilo Apple (200ms cubic-bezier), diseño mobile-first y soporte dark/light mode desde el día 1.
- **How to run**: `npm run dev` en `localhost:3000`.

---

## Log

- 2026-09-01 — Creación completa de la aplicación de práctica de chino, cuestionarios, encuestas, ranking y soporte de importación JSON.
