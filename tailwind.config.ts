import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
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
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        tall: { raw: "(min-height: 800px)" },
        short: { raw: "(max-height: 600px)" },
        portrait: { raw: "(orientation: portrait)" },
        landscape: { raw: "(orientation: landscape)" },
        touch: { raw: "(hover: none) and (pointer: coarse)" },
        mouse: { raw: "(hover: hover) and (pointer: fine)" },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f0f7ff",
          100: "#e0eefe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36aaf5",
          500: "#1890e0",
          600: "#1873ff", // Our brand blue
          700: "#0e59c7",
          800: "#1248a2",
          900: "#153d85",
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        surface: {
          100: "hsl(var(--surface-100))",
          200: "hsl(var(--surface-200))",
          300: "hsl(var(--surface-300))",
          400: "hsl(var(--surface-400))",
        },
        brand: "hsl(var(--brand))",
        toss: {
          blue: "hsl(var(--toss-blue))",
          navy: "hsl(var(--toss-navy))",
        },
        kakao: {
          yellow: "#FEE500",
          black: "#191919",
        },
        apple: {
          gray: {
            light: "#F5F5F7",
            dark: "#1D1D1F",
          },
          blue: "#0071E3",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "toss-sm": "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)",
        "toss-md": "0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1)",
        "toss-lg": "0 10px 25px rgba(0, 0, 0, 0.05), 0 20px 48px rgba(0, 0, 0, 0.1)",
        "apple-card": "0 2px 5px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.03)",
        "kakao-btn": "0 2px 4px rgba(0, 0, 0, 0.04)",
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
        "subtle-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-light": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        ripple: {
          to: { transform: "scale(4)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "subtle-bounce": "subtle-bounce 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-light": "pulse-light 2s ease-in-out infinite",
        ripple: "ripple 0.6s linear",
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      gridTemplateColumns: {
        "responsive-1": "repeat(1, minmax(0, 1fr))",
        "responsive-2": "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))",
        "responsive-3": "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))",
        "responsive-4": "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "hsl(var(--foreground))",
            a: {
              color: "hsl(var(--primary))",
              "&:hover": {
                color: "hsl(var(--primary) / 0.8)",
              },
            },
            h1: {
              color: "hsl(var(--foreground))",
            },
            h2: {
              color: "hsl(var(--foreground))",
            },
            h3: {
              color: "hsl(var(--foreground))",
            },
            h4: {
              color: "hsl(var(--foreground))",
            },
            blockquote: {
              borderLeftColor: "hsl(var(--muted))",
              color: "hsl(var(--muted-foreground))",
            },
            hr: {
              borderColor: "hsl(var(--border))",
            },
            ol: {
              li: {
                "&::marker": {
                  color: "hsl(var(--muted-foreground))",
                },
              },
            },
            ul: {
              li: {
                "&::marker": {
                  color: "hsl(var(--muted-foreground))",
                },
              },
            },
            strong: {
              color: "hsl(var(--foreground))",
            },
            code: {
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--muted))",
              borderRadius: "0.25rem",
              padding: "0.2em 0.4em",
            },
            pre: {
              backgroundColor: "hsl(var(--card))",
              borderRadius: "var(--radius)",
              border: "1px solid hsl(var(--border))",
            },
            thead: {
              borderBottomColor: "hsl(var(--border))",
              th: {
                color: "hsl(var(--foreground))",
              },
            },
            tbody: {
              tr: {
                borderBottomColor: "hsl(var(--border))",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

export default config
