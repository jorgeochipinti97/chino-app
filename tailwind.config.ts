import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "bg-card": "var(--bg-card)",
        "bg-card-elevated": "var(--bg-card-elevated)",
        foreground: "var(--text-primary)",
        "text-muted": "var(--text-secondary)",
        "text-subtle": "var(--text-tertiary)",
        border: "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        chinese: [
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          "sans-serif",
        ],
      },
      boxShadow: {
        "apple-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "apple-card": "0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)",
        "apple-glow": "0 0 25px -3px rgba(16, 185, 129, 0.25)",
        "apple-gold": "0 0 30px -4px rgba(245, 158, 11, 0.3)",
      }
    },
  },
  plugins: [],
};
export default config;
