import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#2563EB',
        accent: '#7C3AED',
        success: '#22C55E',
        'bg-light': '#F8FAFC',
        'card-bg': '#FFFFFF',
        'bg-dark': '#020617',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        btn: '12px',
        badge: '8px',
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(15,23,42,0.06), 0 1px 2px 0 rgba(15,23,42,0.04)',
        'card-hover': '0 12px 32px 0 rgba(15,23,42,0.12), 0 2px 8px 0 rgba(15,23,42,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
