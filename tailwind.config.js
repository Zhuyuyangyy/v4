/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/views/DialoguePage.vue',
    './src/components/dialogue/**/*.vue',
    './src/views/EduMind.vue',
    './src/components/edu-mind/**/*.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        '2xs': '0 1px 0px 0 rgb(0 0 0 / 0.05)',
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
