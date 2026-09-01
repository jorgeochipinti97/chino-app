import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Chino App — Cuestionarios, Encuestas y Ranking";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #090a0f 0%, #131722 50%, #0d1f18 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Chinese character badge */}
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "28px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "52px",
            fontWeight: "bold",
            color: "#ffffff",
            boxShadow: "0 10px 40px rgba(16, 185, 129, 0.4)",
            marginBottom: "28px",
          }}
        >
          汉
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: "16px",
          }}
        >
          汉语 • Práctica & Quizzes de Chino
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            marginBottom: "36px",
          }}
        >
          Cuestionarios interactivos por clase con audio en mandarín, encuestas de feedback y ranking con tus compañeros.
        </div>

        {/* Pills features */}
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: "16px",
              fontWeight: 600,
              color: "#34d399",
            }}
          >
            🔊 Audio en Mandarín
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: "16px",
              fontWeight: 600,
              color: "#fbbf24",
            }}
          >
            🏆 Leaderboard de la Clase
          </div>
          <div
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: "16px",
              fontWeight: 600,
              color: "#60a5fa",
            }}
          >
            📊 Encuestas & Feedback
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
