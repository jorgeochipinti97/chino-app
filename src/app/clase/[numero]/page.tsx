import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LESSON_MATERIALS } from "@/data/lessons";
import { LessonView } from "@/components/LessonView";

/** Las clases existentes se prerenderan: /clase/02, /clase/03, /clase/04… */
export function generateStaticParams() {
  return LESSON_MATERIALS.map((lesson) => ({
    numero: String(lesson.lesson_number).padStart(2, "0"),
  }));
}

const findLesson = (numero: string) => {
  const parsed = Number(numero);
  if (!Number.isInteger(parsed)) return undefined;
  return LESSON_MATERIALS.find((lesson) => lesson.lesson_number === parsed);
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ numero: string }>;
}): Promise<Metadata> {
  const { numero } = await params;
  const lesson = findLesson(numero);
  if (!lesson) return { title: "Clase no encontrada — Chino App" };

  return {
    title: `${lesson.title} — Chino App`,
    description: lesson.summary,
  };
}

export default async function ClasePage({
  params,
}: {
  params: Promise<{ numero: string }>;
}) {
  const { numero } = await params;
  const lesson = findLesson(numero);
  if (!lesson) notFound();

  return <LessonView lessonNumber={lesson.lesson_number} />;
}
