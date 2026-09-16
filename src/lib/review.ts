/**
 * Repaso espaciado — caja de Leitner sobre localStorage.
 *
 * Cada pregunta vive en una caja del 1 al 5. Si la acertás sube una caja y tarda más en
 * volver; si la errás cae a la caja 1 y vuelve el mismo día. La idea es que lo que ya sabés
 * deje de aparecer y lo flojo insista — sin eso, practicar la clase 4 hace que la 2 se
 * evapore sin que la app avise.
 */

const REVIEW_KEY = "chino_app_review_v1";

/** Días de espera por caja (índice = box - 1). La caja 1 vuelve el mismo día. */
export const BOX_DAYS = [0, 1, 3, 7, 16];
export const MAX_BOX = BOX_DAYS.length;

export interface ReviewItem {
  /** Caja de Leitner, 1 (flojo) a 5 (dominado). */
  box: number;
  /** ISO de cuándo vuelve a tocar. */
  due: string;
  /** Veces respondida. */
  seen: number;
  /** Veces erradas (histórico, no se resetea). */
  wrong: number;
  /** ISO de la última respuesta. */
  last: string;
}

export type ReviewMap = Record<string, ReviewItem>;

/** Clave estable de una pregunta: sobrevive a reordenar el array del quiz. */
export const itemKey = (quizId: string, questionId: number) => `${quizId}#${questionId}`;

export function getReviewMap(): ReviewMap {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(REVIEW_KEY);
    return data ? (JSON.parse(data) as ReviewMap) : {};
  } catch {
    return {};
  }
}

function saveReviewMap(map: ReviewMap) {
  try {
    localStorage.setItem(REVIEW_KEY, JSON.stringify(map));
  } catch {
    // storage lleno o bloqueado: se pierde el historial, la práctica sigue andando
  }
}

const addDays = (from: Date, days: number) => {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d;
};

/** Registra una respuesta y devuelve el estado nuevo de esa pregunta. */
export function recordAnswer(key: string, correct: boolean, now: Date = new Date()): ReviewItem {
  const map = getReviewMap();
  const prev = map[key];
  const prevBox = prev?.box ?? 1;

  const box = correct ? Math.min(prevBox + 1, MAX_BOX) : 1;
  const item: ReviewItem = {
    box,
    due: addDays(now, BOX_DAYS[box - 1]).toISOString(),
    seen: (prev?.seen ?? 0) + 1,
    wrong: (prev?.wrong ?? 0) + (correct ? 0 : 1),
    last: now.toISOString(),
  };

  map[key] = item;
  saveReviewMap(map);
  return item;
}

/** Una pregunta nunca vista cuenta como pendiente: es material sin estrenar. */
export function isDue(item: ReviewItem | undefined, now: Date = new Date()): boolean {
  if (!item) return true;
  return new Date(item.due).getTime() <= now.getTime();
}

/**
 * Ordena las claves por urgencia: primero lo vencido (lo más atrasado arriba),
 * después lo nunca visto, y al final lo que todavía no toca.
 */
export function sortByUrgency(keys: string[], now: Date = new Date()): string[] {
  const map = getReviewMap();
  const rank = (key: string) => {
    const item = map[key];
    if (!item) return { tier: 1, at: 0 };
    const due = new Date(item.due).getTime();
    return { tier: due <= now.getTime() ? 0 : 2, at: due };
  };

  return [...keys].sort((a, b) => {
    const ra = rank(a);
    const rb = rank(b);
    if (ra.tier !== rb.tier) return ra.tier - rb.tier;
    return ra.at - rb.at;
  });
}

export interface ReviewStats {
  /** Vencidas o nunca vistas: lo que toca hoy. */
  due: number;
  /** Vistas y en cajas 1-2: todavía flojas. */
  learning: number;
  /** Cajas 4-5: dominadas. */
  mastered: number;
  /** Nunca respondidas. */
  fresh: number;
  /** ISO del próximo vencimiento cuando no hay nada pendiente. */
  nextDue: string | null;
}

export function getReviewStats(keys: string[], now: Date = new Date()): ReviewStats {
  const map = getReviewMap();
  const stats: ReviewStats = { due: 0, learning: 0, mastered: 0, fresh: 0, nextDue: null };
  let next: number | null = null;

  for (const key of keys) {
    const item = map[key];
    if (!item) {
      stats.fresh++;
      stats.due++;
      continue;
    }
    if (item.box <= 2) stats.learning++;
    if (item.box >= 4) stats.mastered++;

    const due = new Date(item.due).getTime();
    if (due <= now.getTime()) {
      stats.due++;
    } else if (next === null || due < next) {
      next = due;
    }
  }

  stats.nextDue = stats.due === 0 && next !== null ? new Date(next).toISOString() : null;
  return stats;
}
