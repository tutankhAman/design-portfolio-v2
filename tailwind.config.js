/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bodoni: ['"Bodoni Moda"', 'serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      animation: {
        "border-beam": "border-beam calc(var(--duration) * 1s) infinite linear",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
    },
  },
  plugins: [],
}
