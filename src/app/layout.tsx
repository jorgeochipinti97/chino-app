import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chino-app.vercel.app"),
  title: "Chino App — Cuestionarios, Encuestas y Ranking de Clases",
  description: "Practicá chino mandarín con cuestionarios interactivos por clase, pronunciación en audio real, encuestas de feedback y ranking con tus compañeros.",
  keywords: ["chino mandarin", "aprender chino", "quizzes chino", "hsk", "pinyin", "hanzi", "estudiar chino"],
  authors: [{ name: "Chino App" }],
  creator: "Chino App",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://chino-app.vercel.app",
    title: "Chino App — Práctica, Quizzes & Ranking del Curso",
    description: "Cuestionarios interactivos por clase con audio en mandarín nativo, encuestas de feedback y ranking con tus compañeros.",
    siteName: "Chino App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chino App — Práctica, Quizzes & Ranking del Curso",
    description: "Cuestionarios interactivos por clase con audio en mandarín nativo, encuestas de feedback y ranking con tus compañeros.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#090a0f" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased bg-background text-foreground transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
