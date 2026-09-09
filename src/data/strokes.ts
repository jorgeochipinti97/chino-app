import { StrokeSet } from "@/types";

// Caracteres para el juego de trazos, agrupados por clase.
// Al agregar caracteres nuevos, correr: node scripts/copy-hanzi-data.mjs
export const STROKE_SETS: StrokeSet[] = [
  {
    id: "strokes-clase-03-pronombres",
    lesson_number: 3,
    title: "Pronombres personales",
    description: "Los 5 pronombres de la clase 3. Ojo con 他 / 她 / 它: cambia solo el radical de la izquierda.",
    characters: [
      { hanzi: "我", pinyin: "wǒ", meaning: "Yo" },
      { hanzi: "你", pinyin: "nǐ", meaning: "Tú / Vos" },
      { hanzi: "他", pinyin: "tā", meaning: "Él" },
      { hanzi: "她", pinyin: "tā", meaning: "Ella" },
      { hanzi: "它", pinyin: "tā", meaning: "Eso" },
    ],
  },
  {
    id: "strokes-clase-03-reglas",
    lesson_number: 3,
    title: "Las 4 reglas de trazos",
    description: "Los ejemplos de cada regla: arriba→abajo, izquierda→derecha, horizontal antes que vertical, 撇 antes que 捺.",
    characters: [
      { hanzi: "三", pinyin: "sān", meaning: "Tres", rule: "1 · De arriba hacia abajo (从上到下)" },
      { hanzi: "言", pinyin: "yán", meaning: "Palabra / hablar", rule: "1 · De arriba hacia abajo (从上到下)" },
      { hanzi: "明", pinyin: "míng", meaning: "Claro / brillante", rule: "2 · De izquierda a derecha (从左到右)" },
      { hanzi: "林", pinyin: "lín", meaning: "Bosque", rule: "2 · De izquierda a derecha (从左到右)" },
      { hanzi: "十", pinyin: "shí", meaning: "Diez", rule: "3 · Primero horizontal, luego vertical (先横后竖)" },
      { hanzi: "干", pinyin: "gān", meaning: "Seco / hacer", rule: "3 · Primero horizontal, luego vertical (先横后竖)" },
      { hanzi: "人", pinyin: "rén", meaning: "Persona", rule: "4 · Primero 撇, luego 捺 (先撇后捺)" },
      { hanzi: "八", pinyin: "bā", meaning: "Ocho", rule: "4 · Primero 撇, luego 捺 (先撇后捺)" },
      { hanzi: "文", pinyin: "wén", meaning: "Escritura / cultura", rule: "4 · Primero 撇, luego 捺 (先撇后捺)" },
    ],
  },
  {
    id: "strokes-clase-03-personas",
    lesson_number: 3,
    title: "Personas y el sufijo 们",
    description: "Vocabulario de personas de la clase 3 más el caracter 们.",
    characters: [
      { hanzi: "们", pinyin: "men", meaning: "Sufijo de plural (personas)" },
      { hanzi: "老", pinyin: "lǎo", meaning: "Viejo / mayor (老师 = profesor)" },
      { hanzi: "师", pinyin: "shī", meaning: "Maestro (老师 = profesor)" },
      { hanzi: "同", pinyin: "tóng", meaning: "Mismo / igual (同学 = compañero)" },
      { hanzi: "学", pinyin: "xué", meaning: "Estudiar (学生 = estudiante)" },
      { hanzi: "生", pinyin: "shēng", meaning: "Nacer / vida (学生 = estudiante)" },
    ],
  },
  {
    id: "strokes-clase-02",
    lesson_number: 2,
    title: "Saludos y presentación",
    description: "Los caracteres de la clase 2: saludos, despedida y las preguntas de presentación.",
    characters: [
      { hanzi: "好", pinyin: "hǎo", meaning: "Bueno (你好 = hola)" },
      { hanzi: "您", pinyin: "nín", meaning: "Usted (formal)" },
      { hanzi: "再", pinyin: "zài", meaning: "De nuevo (再见 = adiós)" },
      { hanzi: "见", pinyin: "jiàn", meaning: "Ver (再见 = adiós)" },
      { hanzi: "叫", pinyin: "jiào", meaning: "Llamarse" },
      { hanzi: "住", pinyin: "zhù", meaning: "Vivir / residir" },
      { hanzi: "是", pinyin: "shì", meaning: "Ser" },
      { hanzi: "什", pinyin: "shén", meaning: "Qué (什么)" },
      { hanzi: "么", pinyin: "me", meaning: "Qué (什么)" },
      { hanzi: "名", pinyin: "míng", meaning: "Nombre (名字)" },
      { hanzi: "字", pinyin: "zì", meaning: "Caracter (名字)" },
      { hanzi: "哪", pinyin: "nǎ", meaning: "Cuál / dónde (哪里)" },
      { hanzi: "里", pinyin: "lǐ", meaning: "Dentro / dónde (哪里)" },
    ],
  },
];
