import type { Metadata } from "next";
import { QuizView } from "@/components/QuizView";

export const metadata: Metadata = {
  title: "Quizzes — Chino App",
  description: "Practicá por clase, mezclando todas las clases o repasando lo que toca hoy.",
};

export default function Page() {
  return <QuizView />;
}
