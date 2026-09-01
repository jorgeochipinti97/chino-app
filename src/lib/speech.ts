export function speakChinese(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel(); // Stop any pending speech

  // Clean text from parenthetical Spanish or brackets if present
  // e.g. "Nǐ hǎo (你好)" -> extract Chinese characters or pinyin
  const chineseCharsMatch = text.match(/[\u4e00-\u9fa5]+/g);
  const textToSpeak = chineseCharsMatch ? chineseCharsMatch.join(" ") : text.replace(/\(.*?\)/g, "").trim();

  const utterance = new SpeechSynthesisUtterance(textToSpeak || text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.85; // slightly slower for language learning clarity
  utterance.pitch = 1.0;

  // Try to find a Mandarin voice
  const voices = window.speechSynthesis.getVoices();
  const zhVoice = voices.find(
    (v) => v.lang === "zh-CN" || v.lang.startsWith("zh") || v.name.includes("Chinese") || v.name.includes("Mandarin")
  );
  if (zhVoice) {
    utterance.voice = zhVoice;
  }

  window.speechSynthesis.speak(utterance);
}
