// Copia solo los JSON de trazos de los caracteres usados en el juego a public/hanzi-data/.
// Correr cuando se agregan caracteres nuevos a src/data/strokes.ts:  node scripts/copy-hanzi-data.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "node_modules", "hanzi-writer-data");
const out = path.join(root, "public", "hanzi-data");

// Lee los caracteres directamente de strokes.ts (todo lo que esté entre comillas y sea un hanzi)
const strokesFile = fs.readFileSync(path.join(root, "src", "data", "strokes.ts"), "utf8");
const chars = [...new Set(strokesFile.match(/[一-鿿]/g) || [])];

fs.mkdirSync(out, { recursive: true });

let copied = 0;
const missing = [];
for (const char of chars) {
  const from = path.join(src, `${char}.json`);
  if (!fs.existsSync(from)) {
    missing.push(char);
    continue;
  }
  fs.copyFileSync(from, path.join(out, `${char}.json`));
  copied++;
}

console.log(`hanzi-data: ${copied}/${chars.length} caracteres copiados a public/hanzi-data/`);
if (missing.length) console.warn(`sin datos de trazos: ${missing.join(" ")}`);
