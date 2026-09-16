export function speakChinese(text: string, rate: number = 0.85) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }

  // Extract only Chinese characters if present (e.g. "Nǐ hǎo (你好)" -> "你好")
  const chineseCharsMatch = text.match(/[\u4e00-\u9fa5]+/g);
  let textToSpeak = "";

  if (chineseCharsMatch && chineseCharsMatch.length > 0) {
    textToSpeak = chineseCharsMatch.join(" ");
  } else {
    // If no Chinese characters, only speak if it looks like Pinyin (letters with tones or basic words)
    // and strip any Spanish descriptions
    const clean = text.replace(/\(.*?\)/g, "").replace(/[^a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ\s\-]/g, "").trim();
    if (clean && clean.length <= 40) {
      textToSpeak = clean;
    }
  }

  if (!textToSpeak) return;

  window.speechSynthesis.cancel(); // Stop any pending speech

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = "zh-CN";
  utterance.rate = rate; // 0.85 = ritmo de aprendizaje; más bajo para repetir un dictado
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const zhVoice = voices.find(
    (v) =>
      v.lang === "zh-CN" ||
      v.lang.startsWith("zh") ||
      v.name.toLowerCase().includes("chinese") ||
      v.name.toLowerCase().includes("mandarin")
  );
  if (zhVoice) {
    utterance.voice = zhVoice;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * ¿El dispositivo tiene una voz en chino instalada? Sin esto, pedirle zh-CN al
 * navegador devuelve una voz en español leyendo los caracteres como puede.
 */
export function hasChineseVoice(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  return window.speechSynthesis
    .getVoices()
    .some((v) => v.lang.toLowerCase().startsWith("zh"));
}

/** Las voces cargan de forma asíncrona en Chrome: hay que esperar el evento. */
export function onVoicesReady(cb: () => void): () => void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return () => {};
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener("voiceschanged", cb);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", cb);
}
