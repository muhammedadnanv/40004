import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(220 13% 91%)",
        input: "hsl(220 13% 91%)",
        ring: "hsl(250 60% 45%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(224 71% 4%)",
        primary: {
          DEFAULT: "hsl(250 60% 45%)",
          foreground: "hsl(0 0% 100%)",
          muted: "hsl(250 60% 97%)",
          hover: "hsl(250 60% 40%)",
          light: "hsl(250 60% 97%)",
          dark: "hsl(250 60% 35%)",
          600: "hsl(250 60% 40%)",
        },
        secondary: { DEFAULT: "hsl(0 0% 98%)", foreground: "hsl(224 71% 4%)", hover: "hsl(0 0% 96%)" },
        muted: { DEFAULT: "hsl(220 14% 96%)", foreground: "hsl(220 9% 46%)" },
        accent: { DEFAULT: "hsl(220 14% 96%)", foreground: "hsl(224 71% 4%)", hover: "hsl(220 14% 94%)" },
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0,0,0,0.03)',
        'glow': '0 0 15px rgba(101,93,255,0.1)',
        'card': '0 1px 3px rgba(0,0,0,0.05)',
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;