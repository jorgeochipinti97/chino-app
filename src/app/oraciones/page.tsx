import type { Metadata } from "next";
import { SentenceDrillView } from "@/components/SentenceDrillView";

export const metadata: Metadata = {
  title: "Oraciones 句子 — Chino App",
  description: "Cambiá el pronombre y armá la oración con fichas.",
};

export default function Page() {
  return <SentenceDrillView />;
}
