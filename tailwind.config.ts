import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
    spacing: {
      sm: '0.8rem',
      md: '1.2rem',
      lg: '1.6rem',
      xl: '2.4rem',
      xxl: '3.2rem',
      0.5: '0.2rem',
      1: '0.4rem',
      1.5: '0.6rem',
      2: '0.8rem',
      2.5: '1rem',
      3: '1.2rem',
      3.5: '1.4rem',
      4: '1.6rem',
      5: '2rem',
    },
    color: {
      transparent: 'transparent',
      current: 'currentColor',
      rubyRed: '#a26769',
    },
  },
  plugins: [],
}
export default config
