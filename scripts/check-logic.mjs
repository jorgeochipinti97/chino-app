// Verifica la lógica pura de la app (sin navegador ni framework de tests):
//   - números 0-99: composición en hanzi y pinyin
//   - repaso espaciado: cajas de Leitner y armado de rondas
// Correr con: npm run check
//
// Compila los .ts con el tsc del proyecto a una carpeta temporal y los ejecuta en node
// con un localStorage de mentira. Sin dependencias nuevas.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = fs.mkdtempSync(path.join(os.tmpdir(), "chino-check-"));

const sources = [
  "src/lib/numbers.ts",
  "src/lib/review.ts",
  "src/lib/practice.ts",
  "src/data/lessons.ts",
  "src/data/sentences.ts",
];
try {
  execFileSync(
    path.join(root, "node_modules", ".bin", "tsc"),
    [...sources, "--outDir", out, "--rootDir", "src", "--module", "es2020", "--target", "es2020", "--moduleResolution", "bundler", "--skipLibCheck"],
    { cwd: root, stdio: "pipe" }
  );
} catch (err) {
  // El import de "@/types" no resuelve fuera del bundler: son solo tipos y el JS igual se emite.
  const output = String(err.stdout || "");
  const real = output.split("\n").filter((l) => l.trim() && !l.includes("TS2307"));
  if (real.length) {
    console.error(output);
    process.exit(1);
  }
}

// El alias "@/lib/review" no existe en node: se reescribe al archivo de al lado.
const practicePath = path.join(out, "lib", "practice.js");
fs.writeFileSync(
  practicePath,
  fs.readFileSync(practicePath, "utf8").replace(/"@\/lib\/review"/g, '"./review.js"')
);

const store = new Map();
globalThis.window = {};
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
};

const N = await import(pathToFileURL(path.join(out, "lib", "numbers.js")));
const R = await import(pathToFileURL(path.join(out, "lib", "review.js")));
const P = await import(pathToFileURL(practicePath));
const L = await import(pathToFileURL(path.join(out, "data", "lessons.js")));
const S = await import(pathToFileURL(path.join(out, "data", "sentences.js")));

let failed = 0;
let total = 0;
const check = (name, cond, extra = "") => {
  total++;
  if (cond) return;
  failed++;
  console.error(`  ✗ ${name}${extra ? ` — ${extra}` : ""}`);
};

// ---------------------------------------------------------------- números
const KNOWN = {
  0: ["零", "líng"],
  1: ["一", "yī"],
  10: ["十", "shí"],
  11: ["十一", "shíyī"],
  12: ["十二", "shí'èr"],
  15: ["十五", "shíwǔ"],
  20: ["二十", "èrshí"],
  21: ["二十一", "èrshíyī"],
  22: ["二十二", "èrshí'èr"],
  47: ["四十七", "sìshíqī"],
  50: ["五十", "wǔshí"],
  63: ["六十三", "liùshísān"],
  99: ["九十九", "jiǔshíjiǔ"],
};
for (const [n, [hanzi, pinyin]] of Object.entries(KNOWN)) {
  check(`${n} en hanzi`, N.numberToHanzi(+n) === hanzi, `dio ${N.numberToHanzi(+n)}`);
  check(`${n} en pinyin`, N.numberToPinyin(+n) === pinyin, `dio ${N.numberToPinyin(+n)}`);
}

const all = [...Array(100).keys()].map(N.numberToHanzi);
check("los 100 números son distintos", new Set(all).size === 100);
const allowed = new Set(N.NUMBER_CHARS);
check("solo usa los 11 caracteres de la clase", all.every((s) => [...s].every((c) => allowed.has(c))));
check("ninguno pasa de 3 caracteres", all.every((s) => s.length <= 3));
check("no escribe 一十 para el 10", !all.some((s) => s.startsWith("一十")));
check("fuera de rango tira error", (() => {
  try { N.numberToHanzi(100); return false; } catch { return true; }
})());

// ---------------------------------------------------------------- Leitner
const now = new Date("2026-01-15T18:00:00");
const day = (n) => new Date(now.getTime() + n * 86400000);
const K = "clase-04#1";

check("una pregunta nunca vista está pendiente", R.isDue(undefined, now));

let item = R.recordAnswer(K, false, now);
check("errar la manda a la caja 1", item.box === 1, `box=${item.box}`);
check("lo errado vuelve el mismo día", R.isDue(item, now));

item = R.recordAnswer(K, true, now);
check("acertar sube de caja", item.box === 2, `box=${item.box}`);
check("la caja 2 no vuelve hoy", !R.isDue(item, now));
check("la caja 2 vuelve mañana", R.isDue(item, day(1)));

R.recordAnswer(K, true, now);
item = R.recordAnswer(K, true, now);
check("tres aciertos llegan a la caja 4", item.box === 4, `box=${item.box}`);
check("la caja 4 espera 7 días", !R.isDue(item, day(6)) && R.isDue(item, day(7)));

item = R.recordAnswer(K, true, now);
check("la caja tope es la 5", item.box === 5 && R.recordAnswer(K, true, now).box === 5);
check("el historial de errores no se borra", item.wrong === 1, `wrong=${item.wrong}`);

item = R.recordAnswer(K, false, now);
check("errar desde la caja 5 cae a la 1", item.box === 1 && R.isDue(item, now));

// ---------------------------------------------------------------- rondas
const mkQuiz = (id, lesson, n) => ({
  id,
  lesson_number: lesson,
  title: `Clase ${lesson}`,
  total_questions: n,
  questions: Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    question: `p${i + 1}`,
    options: ["a", "b", "c", "d"],
    correct_answer: "a",
  })),
});
const quizzes = [mkQuiz("clase-02", 2, 10), mkQuiz("clase-03", 3, 10), mkQuiz("clase-04", 4, 10)];

const lesson = P.buildRound(quizzes, "lesson", "clase-03", now);
check("el modo clase trae la clase entera", lesson.length === 10 && lesson.every((i) => i.quizId === "clase-03"));
check("las opciones llegan completas", lesson.every((i) => new Set(i.options).size === 4));

const runs = (fn) => new Set(Array.from({ length: 12 }, fn));
check(
  "el orden de las preguntas cambia entre rondas",
  runs(() => P.buildRound(quizzes, "lesson", "clase-03", now).map((i) => i.key).join()).size > 1
);
check(
  "el orden de las opciones cambia entre rondas",
  runs(() => P.buildRound(quizzes, "lesson", "clase-03", now)[0].options.join()).size > 1
);

const mixed = P.buildRound(quizzes, "mixed", "clase-03", now);
check("el modo mixto recorta la ronda", mixed.length === P.ROUND_SIZE);
check("el modo mixto mezcla clases", new Set(mixed.map((i) => i.lessonNumber)).size > 1);
check("el modo mixto no repite preguntas", new Set(mixed.map((i) => i.key)).size === mixed.length);

for (let i = 1; i <= 10; i++) {
  for (let t = 0; t < 4; t++) R.recordAnswer(`clase-02#${i}`, true, now);
}
const review = P.buildRound(quizzes, "review", "clase-03", now);
check(
  "el repaso deja afuera lo dominado mientras haya pendientes",
  review.every((i) => i.quizId !== "clase-02"),
  review.map((i) => i.quizId).join(",")
);

const keys = quizzes.flatMap((q) => q.questions.map((x) => R.itemKey(q.id, x.id)));
const stats = R.getReviewStats(keys, now);
check("las dominadas se cuentan", stats.mastered === 10, `mastered=${stats.mastered}`);
check("las nunca vistas se cuentan", stats.fresh === 19, `fresh=${stats.fresh}`);
check("los pendientes suman lo nuevo y lo errado", stats.due === 20, `due=${stats.due}`);

const retry = P.buildRoundFromKeys(quizzes, ["clase-02#3", "clase-04#7"]);
check("el repaso de falladas trae solo esas", retry.length === 2);

// ---------------------------------------------------------------- datos: quizzes
for (const quiz of L.INITIAL_QUIZZES) {
  const ids = quiz.questions.map((q) => q.id);
  check(`${quiz.id}: el total declarado coincide`, quiz.total_questions === quiz.questions.length,
    `dice ${quiz.total_questions}, hay ${quiz.questions.length}`);
  check(`${quiz.id}: ids de preguntas únicos`, new Set(ids).size === ids.length);
  for (const q of quiz.questions) {
    check(`${quiz.id}#${q.id}: la respuesta correcta está entre las opciones`,
      q.options.includes(q.correct_answer), q.correct_answer);
    check(`${quiz.id}#${q.id}: no repite opciones`, new Set(q.options).size === q.options.length);
  }
}
const lessons = L.LESSON_MATERIALS.map((m) => m.lesson_number);
check("hay material para cada quiz", L.INITIAL_QUIZZES.every((q) => lessons.includes(q.lesson_number)));

// ---------------------------------------------------------------- datos: drill de oraciones
const DISTRACTORS = 3;
for (const set of S.SUBSTITUTION_SETS) {
  const ids = set.items.map((i) => i.id);
  check(`${set.id}: ids únicos`, new Set(ids).size === ids.length);
  for (const item of set.items) {
    check(`${item.id}: tiene fichas`, item.tokens.length > 0);
    // Cada ficha del banco se consume una sola vez: una respuesta con fichas repetidas
    // sería irresoluble.
    check(`${item.id}: no repite fichas`, new Set(item.tokens).size === item.tokens.length,
      item.tokens.join("/"));
    check(`${item.id}: todas sus fichas están en el pool del set`,
      item.tokens.every((t) => set.pool.includes(t)),
      item.tokens.filter((t) => !set.pool.includes(t)).join("/"));
  }
  const worst = Math.min(...set.items.map((i) => set.pool.filter((t) => !i.tokens.includes(t)).length));
  check(`${set.id}: el pool alcanza para los distractores`, worst >= DISTRACTORS, `mínimo ${worst}`);
}

fs.rmSync(out, { recursive: true, force: true });

if (failed) {
  console.error(`\n${failed} verificaciones fallaron`);
  process.exit(1);
}
console.log(`check-logic: ${total} verificaciones OK (números, repaso espaciado, datos de clases)`);
