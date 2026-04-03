import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#FFFDF9",
        foreground: "#000000",
        primary: {
          DEFAULT: "#FF3B30",
          foreground: "#FFFDF9",
        },
        secondary: {
          DEFAULT: "#E8E8E8",
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#E8E8E8",
          foreground: "#666666",
        },
        accent: {
          DEFAULT: "#FFD60A",
          foreground: "#000000",
        },
        border: "#000000",
        card: {
          DEFAULT: "#FFFDF9",
          foreground: "#000000",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      borderRadius: {
        lg: "0",
        md: "0",
        sm: "0",
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #000000",
        "brutal-lg": "8px 8px 0px 0px #000000",
        "brutal-sm": "2px 2px 0px 0px #000000",
      },
      borderWidth: {
        DEFAULT: '2px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#000000',
            a: {
              color: '#FF3B30',
              textDecoration: 'underline',
              fontWeight: 'bold',
            },
            h1: { fontFamily: 'var(--font-space-grotesk)', fontWeight: '900', borderBottom: '4px solid #000', paddingBottom: '0.5rem' },
            h2: { fontFamily: 'var(--font-space-grotesk)', fontWeight: '800' },
            h3: { fontFamily: 'var(--font-space-grotesk)', fontWeight: '800' },
            code: {
              backgroundColor: '#FFFDF9',
              padding: '0.2rem 0.4rem',
              fontWeight: '600',
              border: '2px solid #000',
              boxShadow: '2px 2px 0px 0px #000000'
            },
            blockquote: {
              borderLeftWidth: '6px',
              borderLeftColor: '#FFD60A',
              fontStyle: 'italic',
              fontWeight: '600',
              backgroundColor: '#fff',
              padding: '1rem',
              border: '2px solid #000',
              boxShadow: '4px 4px 0px 0px #000000',
            }
          },
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;

export default config;
