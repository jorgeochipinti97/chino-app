import type { MetadataRoute } from "next";

// Permite "Agregar a pantalla de inicio": la app abre sin barra del navegador,
// que es como se va a usar en el celular.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chino App — Clases, Quizzes y Trazos",
    short_name: "Chino App",
    description:
      "Apuntes, quizzes y desafío de trazos del curso de chino mandarín.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f8fafc",
    theme_color: "#0f766e",
    lang: "es-AR",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
