import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: "#E8690B",
        forest: "#1B4332",
        cream: "#F5F0E8",
        charcoal: "#1C1C1E",
        urgency: "#C0392B",
        sky: "#1C9AD6",
        "sky-light": "#5BA8D6",
        "sky-pale": "#8ECAE6",
        navy: "#374AD3",
        "navy-deep": "#3B4B9B",
        action: "#FFC20E",
        "section-beige": "#F7F5F2",
        "section-news": "#F5F5F0",
        emergency: "#E31837",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.15)",
      },
      animation: {
        "glow-spin": "glow-spin 4s linear infinite",
        "glow-spin-slow": "glow-spin 8s linear infinite",
        "glow-spin-reverse": "glow-spin-reverse 6s linear infinite",
        "glow-spin-82": "glow-spin-82 5s linear infinite",
        "glow-spin-83": "glow-spin-83 7s linear infinite",
      },
      keyframes: {
        "glow-spin": {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
        "glow-spin-reverse": {
          "0%": { transform: "translate(-50%, -50%) rotate(360deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(0deg)" },
        },
        "glow-spin-82": {
          "0%": { transform: "translate(-50%, -50%) rotate(82deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(442deg)" },
        },
        "glow-spin-83": {
          "0%": { transform: "translate(-50%, -50%) rotate(83deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(443deg)" },
        },
      },
      transitionDuration: {
        2000: "2000ms",
        4000: "4000ms",
      },
      fontSize: {
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.25vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.4vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 1.2rem + 1.2vw, 2rem)",
        "fluid-3xl": "clamp(2rem, 1.5rem + 2vw, 3rem)",
        "fluid-4xl": "clamp(2.5rem, 1.8rem + 3vw, 4rem)",
      },
    },
  },
  plugins: [],
};
export default config;
