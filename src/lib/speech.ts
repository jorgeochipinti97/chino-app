export function speakChinese(text: string) {
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
  utterance.rate = 0.85; // Natural learning pace
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
