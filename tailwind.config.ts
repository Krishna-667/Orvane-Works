import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Base semantic design tokens
        cream: {
          50: "#FAF8F5",
          100: "#F6F3EE", // Main Studio Light Cream Background
          200: "#ECE7DE",
          300: "#DFD8CB",
          400: "#C9BEAC",
          500: "#B0A28D",
        },
        ink: {
          50: "#F2F3F4",
          100: "#E1E2E5",
          200: "#C1C3C8",
          400: "#7E828C",
          600: "#484B54",
          800: "#222428",
          900: "#16171A",
          950: "#111214", // Main Ink Text
        },
        vermilion: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#FEF3F0",
          100: "#FDE4DE",
          200: "#FACEC4",
          300: "#F4AB9B",
          400: "#EA745D",
          500: "#DC4B2F",
          600: "#C8341B", // Signature Orvane Vermilion Accent
          700: "#A72714",
          800: "#8B2314",
          900: "#732316",
          950: "#3F0D06",
        },
        // shadcn/ui dynamic CSS variable mappings
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        tamil: ["var(--font-tamil)", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "70ch",
            color: "var(--foreground)",
            lineHeight: "1.6",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
