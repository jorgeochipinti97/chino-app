import type { Metadata } from "next";
import { LeaderboardView } from "@/components/LeaderboardView";

export const metadata: Metadata = {
  title: "Ranking — Chino App",
  description: "Tabla de posiciones del curso.",
};

export default function Page() {
  return <LeaderboardView />;
}
