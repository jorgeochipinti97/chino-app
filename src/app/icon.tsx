import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #047857 0%, #2dd4bf 100%)",
          color: "white",
          fontSize: 320,
          fontWeight: 700,
        }}
      >
        汉
      </div>
    ),
    { ...size }
  );
}
