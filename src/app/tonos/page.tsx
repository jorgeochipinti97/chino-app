import type { Metadata } from "next";
import { ToneTrainerView } from "@/components/ToneTrainerView";

export const metadata: Metadata = {
  title: "Tonos 声调 — Chino App",
  description: "Ubicá la marca de tono sobre la vocal que corresponde.",
};

export default function Page() {
  return <ToneTrainerView />;
}
