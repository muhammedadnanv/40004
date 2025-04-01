
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
        ring: "hsl(195 100% 33%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(210 27% 25%)",
        primary: {
          DEFAULT: "hsl(210 27% 25%)", // Deep Navy Blue (#2E4053)
          foreground: "hsl(0 0% 100%)",
          muted: "hsl(210 27% 95%)",
          hover: "hsl(210 27% 20%)",
          light: "hsl(210 27% 90%)",
          dark: "hsl(210 27% 15%)",
          600: "hsl(210 27% 20%)",
        },
        secondary: { 
          DEFAULT: "hsl(187 100% 33%)", // Bright Teal (#0097A7)
          foreground: "hsl(0 0% 100%)", 
          hover: "hsl(187 100% 28%)" 
        },
        accent: { 
          DEFAULT: "hsl(43 100% 50%)", // Warm Orange (#FFC107)
          foreground: "hsl(210 27% 25%)", 
          hover: "hsl(43 100% 45%)" 
        },
        success: {
          DEFAULT: "hsl(120 61% 50%)", // Lime Green (#32CD32)
          foreground: "hsl(0 0% 100%)",
          hover: "hsl(120 61% 45%)",
        },
        muted: { 
          DEFAULT: "hsl(0 0% 96%)", // Soft Gray (#F7F7F7)
          foreground: "hsl(0 0% 27%)" // Dark Gray (#444444)
        },
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
        '.premium-gradient': {
          'background-image': 'linear-gradient(135deg, #2E4053 0%, #1A1D23 100%)',
          'background-clip': 'text',
          'color': 'transparent',
        },
        '.teal-gradient': {
          'background-image': 'linear-gradient(135deg, #0097A7 0%, #00BFFF 100%)',
          'background-clip': 'text',
          'color': 'transparent',
        },
        '.orange-gradient': {
          'background-image': 'linear-gradient(135deg, #FFC107 0%, #FF9900 100%)',
          'background-clip': 'text',
          'color': 'transparent',
        },
        '.lime-gradient': {
          'background-image': 'linear-gradient(135deg, #32CD32 0%, #8BC34A 100%)',
          'background-clip': 'text',
          'color': 'transparent',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
