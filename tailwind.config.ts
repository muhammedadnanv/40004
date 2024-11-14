import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(250 30% 90%)",
        input: "hsl(250 30% 90%)",
        ring: "hsl(250 60% 45%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(250 60% 45%)",
        primary: {
          DEFAULT: "hsl(250 60% 45%)",
          foreground: "hsl(0 0% 100%)",
          muted: "hsl(250 60% 97%)",
          hover: "hsl(250 60% 40%)",
          light: "hsl(250 60% 97%)",
          dark: "hsl(250 60% 35%)",
        },
        secondary: {
          DEFAULT: "hsl(270 70% 98%)",
          foreground: "hsl(250 60% 45%)",
          hover: "hsl(270 70% 94%)",
        },
        accent: {
          DEFAULT: "hsl(270 70% 96%)",
          foreground: "hsl(250 60% 45%)",
          hover: "hsl(270 70% 92%)",
        },
        success: {
          DEFAULT: "hsl(142 72% 29%)",
          foreground: "hsl(0 0% 100%)",
          muted: "hsl(142 72% 95%)",
        },
        warning: {
          DEFAULT: "hsl(37 91% 55%)",
          foreground: "hsl(0 0% 100%)",
          muted: "hsl(37 91% 95%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 98%)",
          muted: "hsl(0 84% 95%)",
        },
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0,0,0,0.05)',
        'glow': '0 0 15px rgba(101,93,255,0.15)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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