
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    // Mobile-first responsive breakpoints
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        xs: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Hind', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Archivo Black"', 'Impact', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        border: "hsl(0 0% 8%)",
        input: "hsl(0 0% 8%)",
        ring: "hsl(348 53% 52%)",
        background: "hsl(40 33% 97%)",
        foreground: "hsl(0 0% 6%)",
        primary: {
          DEFAULT: "hsl(0 0% 6%)", // Brutalist black ink
          foreground: "hsl(40 33% 97%)",
          muted: "hsl(0 0% 92%)",
          hover: "hsl(0 0% 0%)",
          light: "hsl(0 0% 88%)",
          dark: "hsl(0 0% 0%)",
          600: "hsl(0 0% 0%)",
        },
        secondary: {
          DEFAULT: "hsl(252 27% 45%)", // Deep purple #574b90
          foreground: "hsl(40 33% 97%)",
          hover: "hsl(252 27% 38%)",
        },
        accent: {
          DEFAULT: "hsl(0 100% 71%)", // Electric coral #ff6b6b
          foreground: "hsl(0 0% 6%)",
          hover: "hsl(348 80% 64%)",
        },
        success: {
          DEFAULT: "hsl(120 61% 50%)",
          foreground: "hsl(0 0% 100%)",
          hover: "hsl(120 61% 45%)",
        },
        muted: {
          DEFAULT: "hsl(40 25% 93%)",
          foreground: "hsl(0 0% 27%)"
        },
        coral: "hsl(0 100% 71%)",
        rose: "hsl(348 80% 64%)",
        magenta: "hsl(338 47% 52%)",
        plum: "hsl(252 27% 45%)",
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.8)",
          dark: "rgba(255, 255, 255, 0.1)",
          hover: "rgba(255, 255, 255, 0.9)",
        }
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0,0,0,0.03)',
        'glow': '0 0 0 2px hsl(0 100% 71%)',
        'card': '0 1px 3px rgba(0,0,0,0.05)',
        'premium': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.15)',
        'mobile': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'brutal': '6px 6px 0 0 hsl(0 0% 6%)',
        'brutal-sm': '4px 4px 0 0 hsl(0 0% 6%)',
        'brutal-lg': '10px 10px 0 0 hsl(0 0% 6%)',
        'brutal-coral': '6px 6px 0 0 hsl(0 100% 71%)',
        'brutal-plum': '6px 6px 0 0 hsl(252 27% 45%)',
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
        '.mobile-touch-enhanced': {
          'touch-action': 'manipulation',
          '-webkit-tap-highlight-color': 'transparent',
          'min-height': '48px',
          'min-width': '48px'
        },
        '.scrollbar-hide': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none'
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none'
        }
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
