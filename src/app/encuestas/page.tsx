import type { Metadata } from "next";
import { SurveyView } from "@/components/SurveyView";

export const metadata: Metadata = {
  title: "Encuestas — Chino App",
  description: "Feedback de cada clase.",
};

export default function Page() {
  return <SurveyView />;
}
