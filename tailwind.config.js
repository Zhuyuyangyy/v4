/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/views/DialoguePage.vue',
    './src/components/dialogue/**/*.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
