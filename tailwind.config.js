/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
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
        // â”€â”€â”€ ORBIT DESIGN SYSTEM TOKENS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        // Single source of truth: mapped to CSS variables in src/style.css
        // To re-brand: change the hex values in :root in style.css
        orbit: {
          base:     "var(--orbit-base)",
          surface:  "var(--orbit-surface)",
          elevated: "var(--orbit-elevated)",
          overlay:  "var(--orbit-overlay)",
          accent: {
            primary:   "var(--orbit-accent-primary)",
            secondary: "var(--orbit-success)",      // Emerald - same color, semantic alias
            cyan:      "var(--orbit-accent-cyan)",
            violet:    "var(--orbit-accent-violet)",
          },
          text: {
            primary:   "var(--orbit-text-primary)",
            secondary: "var(--orbit-text-secondary)",
            muted:     "var(--orbit-text-muted)",
          },
          border: {
            subtle: "var(--orbit-border-subtle)",
            mid:    "var(--orbit-border-mid)",
            top:    "var(--orbit-border-top)",
          },
          success: "var(--orbit-success)",
          error:   "var(--orbit-error)",
          warning: "var(--orbit-warning)",
        },
        // â”€â”€â”€ SHADCN / RADIX UI COMPAT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        border:     "var(--orbit-border-mid)",
        input:      "var(--orbit-border-subtle)",
        ring:       "var(--orbit-accent-primary)",
        background: "var(--orbit-base)",
        foreground: "var(--orbit-text-primary)",
        primary: {
          DEFAULT:    "var(--orbit-accent-primary)",
          foreground: "var(--orbit-base)",
        },
        secondary: {
          DEFAULT:    "var(--orbit-success)",
          foreground: "var(--orbit-base)",
        },
        destructive: {
          DEFAULT:    "var(--orbit-error)",
          foreground: "var(--orbit-base)",
        },
        muted: {
          DEFAULT:    "var(--orbit-text-muted)",
          foreground: "var(--orbit-base)",
        },
        accent: {
          DEFAULT:    "var(--orbit-accent-cyan)",
          foreground: "var(--orbit-text-primary)",
        },
        popover: {
          DEFAULT:    "var(--orbit-overlay)",
          foreground: "var(--orbit-text-primary)",
        },
        card: {
          DEFAULT:    "var(--orbit-surface)",
          foreground: "var(--orbit-text-primary)",
        },
      },
      fontSize: {
        // Fluid typography standardizing headings without manual md: breakpoints
        'fluid-xl': 'clamp(1.25rem, 1vw + 1rem, 1.5rem)',       // 20px - 24px
        'fluid-2xl': 'clamp(1.5rem, 2vw + 1rem, 1.875rem)',    // 24px - 30px
        'fluid-3xl': 'clamp(1.875rem, 3vw + 1rem, 2.25rem)',   // 30px - 36px
        'fluid-4xl': 'clamp(2.25rem, 4vw + 1rem, 3rem)',       // 36px - 48px
        'fluid-5xl': 'clamp(2.75rem, 5vw + 1rem, 3.5rem)',     // 44px - 56px
        'fluid-6xl': 'clamp(3.5rem, 6vw + 1rem, 4.5rem)',      // 56px - 72px
        'fluid-7xl': 'clamp(4rem, 7vw + 1rem, 5.5rem)',        // 64px - 88px
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        xs: "480px",
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "sans-serif"],
        body:    ["Plus Jakarta Sans", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
