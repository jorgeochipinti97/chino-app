import { applyToneMark, ToneNumber } from "@/lib/tones";
import { LESSON_MATERIALS } from "@/data/lessons";

/** Una palabra para tipear: se muestra el hanzi y se escribe el pinyin con acentos. */
export interface TypingItem {
  hanzi: string;
  pinyin: string;
  meaning: string;
  lesson: number;
}

const PUNCT = /[?？!！.。,，、…"“”()（）]/g;
const HANZI_ONLY = /^[一-龥]+$/;
const PINYIN_ONLY = /^[a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü' ]+$/;
/** Letras sin marca de tono: lo que puede recibir el número que se tipea después. */
const PLAIN = /[a-zü]/;

/** Pinyin comparable: minúsculas, sin puntuación ni guiones sueltos ("-men" → "men"). */
export function normalizePinyin(p: string): string {
  return p
    .normalize("NFC")
    .toLowerCase()
    .replace(PUNCT, "")
    .replace(/(^|\s)-+|-+(\s|$)/g, "$1$2")
    .replace(/\s+/g, " ")
    .trim();
}

/** Para comparar da igual cómo se separan las palabras: "nǐhǎo" = "nǐ hǎo". */
const compact = (p: string) => normalizePinyin(p).replace(/[\s']/g, "");

export function isCorrect(typed: string, target: string): boolean {
  return compact(typed) === compact(target);
}

/**
 * Convierte lo tipeado a pinyin con acentos, como un IME de pinyin:
 * "ni3 hao3" → "nǐ hǎo", "lv4" → "lǜ". El número va al final de la sílaba y la marca
 * cae donde dice la regla (a > o > e, iu/ui en la segunda). 5 o 0 = tono neutro.
 * Es idempotente: lo ya convertido pasa igual, así sirve con el valor entero del input.
 */
export function convertInput(raw: string): string {
  let out = "";
  for (const ch of raw.normalize("NFC")) {
    const c = ch.toLowerCase();
    if (c === "v") out += "ü";
    else if (c >= "1" && c <= "4") {
      let start = out.length;
      while (start > 0 && PLAIN.test(out[start - 1])) start--;
      const syllable = out.slice(start);
      if (syllable) out = out.slice(0, start) + applyToneMark(syllable, Number(c) as ToneNumber);
    } else if (c === "5" || c === "0") continue;
    else if (/\d/.test(c)) continue;
    else out += c;
  }
  return out;
}

/** Vocabulario de las clases: solo ítems que son palabras en hanzi con pinyin escribible. */
export function typingItems(lesson?: number): TypingItem[] {
  const seen = new Set<string>();
  const items: TypingItem[] = [];
  for (const material of LESSON_MATERIALS) {
    if (lesson !== undefined && material.lesson_number !== lesson) continue;
    for (const section of material.sections) {
      for (const item of section.items) {
        const hanzi = item.hanzi.replace(PUNCT, "").trim();
        const pinyin = normalizePinyin(item.pinyin);
        if (!HANZI_ONLY.test(hanzi) || !pinyin || !PINYIN_ONLY.test(pinyin) || seen.has(hanzi)) continue;
        seen.add(hanzi);
        items.push({ hanzi, pinyin, meaning: item.meaning, lesson: material.lesson_number });
      }
    }
  }
  return items;
}

export function typingLessons(): number[] {
  return [...new Set(typingItems().map((i) => i.lesson))].sort((a, b) => a - b);
}

/**
 * Palabras por minuto como en los tutores de tipeo: 5 caracteres = 1 palabra,
 * contando solo lo escrito bien (sin espacios).
 */
export function wordsPerMinute(chars: number, ms: number): number {
  if (ms <= 0) return 0;
  return Math.round(chars / 5 / (ms / 60000));
}
