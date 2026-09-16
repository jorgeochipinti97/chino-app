import type { Metadata } from "next";
import { NumberTrainerView } from "@/components/NumberTrainerView";

export const metadata: Metadata = {
  title: "Números 数字 — Chino App",
  description: "Dictado de números y armado con caracteres, del 0 al 99.",
};

export default function Page() {
  return <NumberTrainerView />;
}
