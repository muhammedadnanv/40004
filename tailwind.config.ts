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
        sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(220 13% 91%)",
        input: "hsl(220 13% 91%)",
        ring: "hsl(210 100% 85%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(224 71% 4%)",
        primary: {
          DEFAULT: "hsl(210 100% 85%)",
          foreground: "hsl(210 40% 30%)",
          muted: "hsl(210 100% 95%)",
          hover: "hsl(210 100% 80%)",
          light: "hsl(210 100% 95%)",
          dark: "hsl(210 100% 75%)",
        },
        secondary: { 
          DEFAULT: "hsl(0 0% 98%)", 
          foreground: "hsl(224 71% 4%)", 
          hover: "hsl(0 0% 96%)" 
        },
        muted: { 
          DEFAULT: "hsl(220 14% 96%)", 
          foreground: "hsl(220 9% 46%)" 
        },
        accent: { 
          DEFAULT: "hsl(210 100% 90%)", 
          foreground: "hsl(224 71% 4%)", 
          hover: "hsl(210 100% 85%)" 
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.8)",
          dark: "rgba(255, 255, 255, 0.1)",
          hover: "rgba(255, 255, 255, 0.9)",
        }
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0,0,0,0.03)',
        'glow': '0 0 15px rgba(211,228,253,0.2)',
        'card': '0 1px 3px rgba(0,0,0,0.05)',
        'premium': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.15)',
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;