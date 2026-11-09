/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mark: ['Cinzel', 'Trajan Pro', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      colors: {
        paper: { DEFAULT: '#F6EEE4', deep: '#EEE2D2', light: '#FBF7F1' },
        ink: { DEFAULT: '#2B231D', soft: '#4A4038', mute: '#7A6D61' },
        cad: { DEFAULT: '#D9472B', light: '#EE7B5F', deep: '#A8321C' },
        ultra: { DEFAULT: '#2A44B8', light: '#5C76E0', deep: '#16246B' },
        rose: { DEFAULT: '#C93D78', light: '#E77DA8', deep: '#3A1630' },
        ochre: { DEFAULT: '#E3A33A', light: '#F2C878', deep: '#B27A1C' },
        sage: { DEFAULT: '#5D8A6B', light: '#9CC2A6' },
        line: '#E3D6C4',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        bob: {
          '0%,100%': { transform: 'translateY(0) rotate(var(--r,0deg))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--r,0deg))' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 38s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        bob: 'bob 7s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
