
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        'xs': '475px',
      },
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
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.8)",
          dark: "rgba(255, 255, 255, 0.1)",
          hover: "rgba(255, 255, 255, 0.9)",
        }
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0,0,0,0.03)',
        'glow': '0 0 15px rgba(101,93,255,0.1)',
        'card': '0 1px 3px rgba(0,0,0,0.05)',
        'premium': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.15)',
        'mobile': '0 2px 8px rgba(0, 0, 0, 0.08)',
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
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.touch-improved': {
          'touch-action': 'manipulation',
          '-webkit-tap-highlight-color': 'transparent',
        },
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.safe-area-padding': {
          'padding-top': 'env(safe-area-inset-top)',
          'padding-bottom': 'env(safe-area-inset-bottom)',
          'padding-left': 'env(safe-area-inset-left)',
          'padding-right': 'env(safe-area-inset-right)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
