import type { Metadata } from "next";
import { StrokeGameView } from "@/components/StrokeGameView";

export const metadata: Metadata = {
  title: "Trazos 笔顺 — Chino App",
  description: "Escribí los caracteres trazo por trazo, en el orden correcto.",
};

export default function Page() {
  return <StrokeGameView />;
}
