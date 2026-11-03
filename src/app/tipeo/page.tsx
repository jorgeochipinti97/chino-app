import type { Metadata } from "next";
import { TypingTrainerView } from "@/components/TypingTrainerView";

export const metadata: Metadata = {
  title: "Tipeo 打字 — Chino App",
  description: "Ves el caracter, lo escuchás y escribís el pinyin con su tono, contra reloj.",
};

export default function Page() {
  return <TypingTrainerView />;
}
