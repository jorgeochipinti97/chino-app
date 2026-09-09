export type ToneNumber = 1 | 2 | 3 | 4;

export interface ToneInfo {
  tone: ToneNumber;
  /** Nombre chino del tono */
  hanzi: string;
  pinyin: string;
  /** Notación de Chao Yuen Ren: niveles 1 (grave) a 5 (agudo) */
  chao: string;
  label: string;
  hint: string;
  /** Contorno para el gráfico: puntos (x, y) con y en 0..1 (1 = agudo) */
  contour: [number, number][];
  color: string;
}

export const TONES: ToneInfo[] = [
  {
    tone: 1,
    hanzi: "阴平",
    chao: "55",
    pinyin: "yīnpíng",
    label: "1er tono",
    hint: "Alto sostenido, sin variación",
    // Chao 55
    contour: [[0, 0.97], [0.25, 1], [0.5, 1], [0.75, 1], [1, 0.98]],
    color: "#0ea5e9",
  },
  {
    tone: 2,
    hanzi: "阳平",
    chao: "35",
    pinyin: "yángpíng",
    label: "2do tono",
    hint: "Sube desde el registro medio",
    // Chao 35
    contour: [[0, 0.5], [0.2, 0.53], [0.4, 0.6], [0.6, 0.71], [0.8, 0.86], [1, 1]],
    color: "#10b981",
  },
  {
    tone: 3,
    hanzi: "上声",
    chao: "214",
    pinyin: "shǎngshēng",
    label: "3er tono",
    hint: "Cae al grave y remonta. El más largo",
    // Chao 214
    contour: [[0, 0.25], [0.15, 0.13], [0.32, 0.03], [0.5, 0], [0.66, 0.06], [0.82, 0.34], [1, 0.75]],
    color: "#f59e0b",
  },
  {
    tone: 4,
    hanzi: "去声",
    chao: "51",
    pinyin: "qùshēng",
    label: "4to tono",
    hint: "Cae del agudo al grave. El más breve",
    // Chao 51
    contour: [[0, 1], [0.18, 0.9], [0.38, 0.71], [0.58, 0.48], [0.78, 0.24], [1, 0]],
    color: "#f43f5e",
  },
];

const TONE_MARKS: Record<string, string[]> = {
  a: ["ā", "á", "ǎ", "à"],
  o: ["ō", "ó", "ǒ", "ò"],
  e: ["ē", "é", "ě", "è"],
  i: ["ī", "í", "ǐ", "ì"],
  u: ["ū", "ú", "ǔ", "ù"],
  ü: ["ǖ", "ǘ", "ǚ", "ǜ"],
};

export interface ToneRule {
  id: number;
  short: string;
  detail: string;
}

export const TONE_MARK_RULES: ToneRule[] = [
  { id: 1, short: "Si hay «a», la lleva la a", detail: "La a siempre gana: hǎo, jiào, uān, iān." },
  { id: 2, short: "Si no hay a pero hay «o», la lleva la o", detail: "wǒ, tóng, guó." },
  { id: 3, short: "Si no hay a ni o, la lleva la «e»", detail: "xué, wèi, shén." },
  { id: 4, short: "En «iu» la lleva la u", detail: "Va sobre la SEGUNDA: liù, niú, jiǔ." },
  { id: 5, short: "En «ui» la lleva la i", detail: "Va sobre la SEGUNDA: guì, huì, shuǐ." },
  { id: 6, short: "Si hay una sola vocal, la lleva esa", detail: "nǐ, zhù, shī, lǜ." },
];

/**
 * Devuelve el índice de la letra que lleva la marca de tono, y qué regla lo decidió.
 * Orden de prioridad del pinyin: a > o > e; en "iu" y "ui" la marca va sobre la
 * segunda vocal; si hay una sola vocal, va sobre esa.
 */
export function toneMarkIndex(syllable: string): { index: number; rule: number } {
  const s = syllable.toLowerCase();

  if (s.includes("a")) return { index: s.indexOf("a"), rule: 1 };
  if (s.includes("o")) return { index: s.indexOf("o"), rule: 2 };
  if (s.includes("e")) return { index: s.indexOf("e"), rule: 3 };
  if (s.includes("iu")) return { index: s.indexOf("iu") + 1, rule: 4 };
  if (s.includes("ui")) return { index: s.indexOf("ui") + 1, rule: 5 };

  for (let i = s.length - 1; i >= 0; i--) {
    if (TONE_MARKS[s[i]]) return { index: i, rule: 6 };
  }
  return { index: -1, rule: 6 };
}

/** Escribe la sílaba con su marca de tono en la letra que corresponde. */
export function applyToneMark(syllable: string, tone: ToneNumber): string {
  const s = syllable.toLowerCase();
  const { index } = toneMarkIndex(s);
  if (index < 0) return syllable;

  const marks = TONE_MARKS[s[index]];
  if (!marks) return syllable;

  return s.slice(0, index) + marks[tone - 1] + s.slice(index + 1);
}

/**
 * Escala de 5 niveles de Chao Yuen Ren. La percepción del tono es logarítmica,
 * así que los niveles se reparten en semitonos: una octava (12 st) entre el
 * nivel 1 y el 5, o sea 3 semitonos por nivel.
 */
const BASE_HZ = 130; // nivel 1, voz media
const level = (n: number) => BASE_HZ * Math.pow(2, ((n - 1) * 3) / 12);

const L1 = level(1); // 130
const L2 = level(2); // ~155
const L3 = level(3); // ~184
const L4 = level(4); // ~219
const L5 = level(5); // 260

/**
 * Contornos según la notación Chao, con las duraciones relativas reales:
 * el 3er tono es el más largo y el 4to el más corto.
 */
const TONE_CURVES: Record<ToneNumber, { points: number[]; duration: number }> = {
  1: { points: [L5, L5, L5, L5], duration: 0.46 },              // 55
  2: { points: [L3, L3 * 1.02, L4, L5], duration: 0.5 },        // 35
  3: { points: [L2, L1, L1, L1 * 1.03, L4], duration: 0.62 },   // 214
  4: { points: [L5, L4 * 0.98, L2, L1], duration: 0.34 },       // 51
};

/**
 * Formantes F1/F2 (Hz) de cada vocal. Son los dos picos que hacen que el oído
 * distinga una "a" de una "i": con un solo filtro esto suena a sintetizador,
 * con dos suena a vocal.
 */
const FORMANTS: Record<string, [number, number]> = {
  a: [850, 1200],
  o: [500, 900],
  e: [500, 1300],
  i: [300, 2300],
  u: [350, 800],
  "ü": [300, 1900],
  n: [250, 1500],  // nasal alveolar
  ng: [250, 900],  // nasal velar
};

/**
 * Cada sílaba del ejercicio como la secuencia de sonidos que la componen.
 * Un diptongo no es un sonido fijo: "ao" arranca en a y se cierra en u.
 */
const SYLLABLE_SHAPE: Record<string, string[]> = {
  a: ["a"],
  o: ["o"],
  e: ["e"],
  i: ["i"],
  u: ["u"],
  "ü": ["ü"],
  ao: ["a", "u"],
  ai: ["a", "i"],
  ian: ["i", "e", "n"],
  in: ["i", "n"],
  ing: ["i", "ng"],
  uan: ["u", "a", "n"],
};

/** Interpola la secuencia de formantes a una curva de N puntos. */
function formantCurve(shape: string[], which: 0 | 1, steps = 24): Float32Array {
  const out = new Float32Array(steps);
  for (let i = 0; i < steps; i++) {
    const pos = (i / (steps - 1)) * (shape.length - 1);
    const a = FORMANTS[shape[Math.floor(pos)]] ?? FORMANTS.a;
    const b = FORMANTS[shape[Math.ceil(pos)]] ?? a;
    const t = pos - Math.floor(pos);
    out[i] = a[which] + (b[which] - a[which]) * t;
  }
  return out;
}

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) audioCtx = new Ctor();
  return audioCtx;
}

/**
 * Sintetiza la sílaba con el contorno de tono real. No usamos TTS porque los motores
 * de voz no leen vocales sueltas del pinyin ("a", "ian") — leerían letras en inglés.
 */
export function playTone(syllable: string, tone: ToneNumber): Promise<void> {
  const ctx = getAudioContext();
  if (!ctx) return Promise.resolve();

  // iOS deja el contexto suspendido hasta que hay un gesto del usuario
  if (ctx.state === "suspended") void ctx.resume();

  const { points, duration } = TONE_CURVES[tone];
  const now = ctx.currentTime + 0.02;

  const shape = SYLLABLE_SHAPE[syllable.toLowerCase()] ?? ["a"];
  const endsNasal = shape[shape.length - 1] === "n" || shape[shape.length - 1] === "ng";

  // Fuente glotal
  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueCurveAtTime(new Float32Array(points), now, duration);

  // Vibrato leve: sin esto suena a sintetizador, no a alguien hablando
  const vibrato = ctx.createOscillator();
  vibrato.frequency.value = 5.2;
  const vibratoGain = ctx.createGain();
  vibratoGain.gain.value = 2.2;
  vibrato.connect(vibratoGain);
  vibratoGain.connect(osc.frequency);

  // Dos bandpass en paralelo = F1 y F2, los que dan la identidad de la vocal
  const makeFormant = (which: 0 | 1, q: number, level: number) => {
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = q;
    bp.frequency.setValueCurveAtTime(formantCurve(shape, which), now, duration);
    const g = ctx.createGain();
    g.gain.value = level;
    bp.connect(g);
    return { bp, g };
  };

  const f1 = makeFormant(0, 7, 1.0);
  const f2 = makeFormant(1, 9, 0.55);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.3, now + 0.045);
  // Las sílabas nasales se apagan antes de terminar
  gain.gain.setValueAtTime(endsNasal ? 0.3 : 0.28, now + duration * (endsNasal ? 0.6 : 0.8));
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(f1.bp);
  osc.connect(f2.bp);
  f1.g.connect(gain);
  f2.g.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  vibrato.start(now);
  osc.stop(now + duration + 0.05);
  vibrato.stop(now + duration + 0.05);

  return new Promise((resolve) => {
    osc.onended = () => resolve();
  });
}

export const SERIES_LENGTH = 12;

export interface MarkItem {
  syllable: string;
  tone: ToneNumber;
  /** Si tiene hanzi es una palabra real y se puede escuchar con la voz del sistema. */
  hanzi?: string;
  meaning?: string;
}

/**
 * Sílabas para practicar DÓNDE va la marca. Las que llevan hanzi salieron de las
 * clases 2 y 3; las que no, son las finales sueltas del ejercicio del libro.
 */
export const MARK_ITEMS: MarkItem[] = [
  { syllable: "hao", tone: 3, hanzi: "好", meaning: "bueno (你好)" },
  { syllable: "jiao", tone: 4, hanzi: "叫", meaning: "llamarse" },
  { syllable: "zhu", tone: 4, hanzi: "住", meaning: "vivir" },
  { syllable: "shi", tone: 4, hanzi: "是", meaning: "ser" },
  { syllable: "ming", tone: 2, hanzi: "名", meaning: "nombre" },
  { syllable: "na", tone: 3, hanzi: "哪", meaning: "cuál / dónde" },
  { syllable: "shen", tone: 2, hanzi: "什", meaning: "qué (什么)" },
  { syllable: "nin", tone: 2, hanzi: "您", meaning: "usted" },
  { syllable: "zai", tone: 4, hanzi: "再", meaning: "de nuevo (再见)" },
  { syllable: "jian", tone: 4, hanzi: "见", meaning: "ver (再见)" },
  { syllable: "wo", tone: 3, hanzi: "我", meaning: "yo" },
  { syllable: "ni", tone: 3, hanzi: "你", meaning: "vos" },
  { syllable: "ta", tone: 1, hanzi: "他", meaning: "él" },
  { syllable: "lao", tone: 3, hanzi: "老", meaning: "mayor (老师)" },
  { syllable: "tong", tone: 2, hanzi: "同", meaning: "mismo (同学)" },
  { syllable: "xue", tone: 2, hanzi: "学", meaning: "estudiar" },
  { syllable: "sheng", tone: 1, hanzi: "生", meaning: "vida (学生)" },
  { syllable: "san", tone: 1, hanzi: "三", meaning: "tres" },
  { syllable: "ren", tone: 2, hanzi: "人", meaning: "persona" },
  { syllable: "wen", tone: 2, hanzi: "文", meaning: "escritura" },
  { syllable: "cha", tone: 2, hanzi: "茶", meaning: "té" },
  { syllable: "yan", tone: 2, hanzi: "言", meaning: "palabra" },
  { syllable: "lin", tone: 2, hanzi: "林", meaning: "bosque" },
  // Las trampas: iu y ui llevan la marca en la SEGUNDA vocal
  { syllable: "liu", tone: 4, hanzi: "六", meaning: "seis — regla iu" },
  { syllable: "niu", tone: 2, hanzi: "牛", meaning: "vaca — regla iu" },
  { syllable: "jiu", tone: 3, hanzi: "九", meaning: "nueve — regla iu" },
  { syllable: "gui", tone: 4, hanzi: "贵", meaning: "caro — regla ui" },
  { syllable: "hui", tone: 4, hanzi: "会", meaning: "poder — regla ui" },
  { syllable: "shui", tone: 3, hanzi: "水", meaning: "agua — regla ui" },
  { syllable: "wei", tone: 4, hanzi: "位", meaning: "posición — gana la e" },
  // Finales del libro, escritas como corresponde cuando van solas
  { syllable: "ao", tone: 4, hanzi: "傲", meaning: "orgulloso" },
  { syllable: "ai", tone: 4, hanzi: "爱", meaning: "amor" },
  { syllable: "yan", tone: 2, hanzi: "言", meaning: "la final -ian, sola se escribe yan" },
  { syllable: "yin", tone: 1, hanzi: "音", meaning: "la final -in, sola se escribe yin" },
  { syllable: "ying", tone: 3, hanzi: "影", meaning: "la final -ing, sola se escribe ying" },
  { syllable: "wan", tone: 3, hanzi: "晚", meaning: "la final -uan, sola se escribe wan" },
  { syllable: "yu", tone: 3, hanzi: "雨", meaning: "la final -ü, sola se escribe yu" },
];

/** Los 4 tonos sobre la misma sílaba: el ejemplo canónico para calibrar el oído. */
export const TONE_REFERENCE = ["妈", "麻", "马", "骂"];
