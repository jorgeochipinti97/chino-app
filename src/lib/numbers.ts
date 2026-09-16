/**
 * Números chinos del 0 al 99 — la regla de composición de la clase 4.
 *
 * 10 es 十 solo; del 11 al 19 el 十 va adelante (十五 = 15); las decenas llevan el 十 atrás
 * (五十 = 50); y de 21 a 99 es decena + 十 + unidad (二十一 = 21).
 */

const DIGIT_HANZI = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const DIGIT_PINYIN = ["líng", "yī", "èr", "sān", "sì", "wǔ", "liù", "qī", "bā", "jiǔ"];

const TEN_HANZI = "十";
const TEN_PINYIN = "shí";

export const NUMBER_CHARS = [...DIGIT_HANZI, TEN_HANZI];

export const MIN_NUMBER = 0;
export const MAX_NUMBER = 99;

function assertRange(n: number) {
  if (!Number.isInteger(n) || n < MIN_NUMBER || n > MAX_NUMBER) {
    throw new RangeError(`Solo 0–99 (recibido: ${n})`);
  }
}

export function numberToHanzi(n: number): string {
  assertRange(n);
  if (n < 10) return DIGIT_HANZI[n];
  if (n === 10) return TEN_HANZI;

  const tens = Math.floor(n / 10);
  const units = n % 10;
  // Del 11 al 19 no se escribe el 一 adelante: 十五, nunca 一十五.
  const head = tens === 1 ? TEN_HANZI : DIGIT_HANZI[tens] + TEN_HANZI;
  return units === 0 ? head : head + DIGIT_HANZI[units];
}

/**
 * El apóstrofo del pīnyīn separa sílabas cuando la siguiente empieza con vocal:
 * shí + èr se escribe shí'èr, pero èr + shí + yī va todo junto (èrshíyī).
 */
function join(...syllables: string[]): string {
  return syllables.reduce((acc, syllable) => {
    if (!acc) return syllable;
    return /^[aoeāáǎàōóǒòēéěè]/.test(syllable) ? `${acc}'${syllable}` : acc + syllable;
  }, "");
}

export function numberToPinyin(n: number): string {
  assertRange(n);
  if (n < 10) return DIGIT_PINYIN[n];
  if (n === 10) return TEN_PINYIN;

  const tens = Math.floor(n / 10);
  const units = n % 10;
  const head = tens === 1 ? [TEN_PINYIN] : [DIGIT_PINYIN[tens], TEN_PINYIN];
  return join(...head, ...(units === 0 ? [] : [DIGIT_PINYIN[units]]));
}

/** Cómo se arma el número, para explicarlo al corregir: "4 × 10 + 7". */
export function numberBreakdown(n: number): string {
  assertRange(n);
  if (n < 10) return `${n}`;
  if (n === 10) return "10 = 十 solo, sin 一 adelante";

  const tens = Math.floor(n / 10);
  const units = n % 10;
  if (tens === 1) return `10 + ${units} — el 十 adelante SUMA`;
  if (units === 0) return `${tens} × 10 — el 十 atrás MULTIPLICA`;
  return `${tens} × 10 + ${units}`;
}

/** Secuencia de caracteres del número, para armarlo tocando botones. */
export const numberToChars = (n: number): string[] => [...numberToHanzi(n)];

/**
 * Sortea números evitando repetir. Se cubren los tres tramos a propósito: sueltos (0-10),
 * adolescentes (11-19, donde se confunde 十五 con 五十) y compuestos (20-99).
 */
export function randomNumbers(count: number): number[] {
  const picked = new Set<number>();
  const tiers: [number, number][] = [
    [0, 10],
    [11, 19],
    [20, 99],
  ];

  let tier = 0;
  let guard = 0;
  while (picked.size < count && guard < count * 50) {
    guard++;
    const [min, max] = tiers[tier % tiers.length];
    tier++;
    const n = min + Math.floor(Math.random() * (max - min + 1));
    picked.add(n);
  }

  return [...picked].slice(0, count);
}
