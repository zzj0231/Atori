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
