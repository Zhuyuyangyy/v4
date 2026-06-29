import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5174,
    fs: {
      allow: [
        resolve(__dirname),
        resolve(__dirname, '../../../GITHUB/ez-tree-1.1.0'),
      ],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8788',
        changeOrigin: true,
      },
      '/deepseek-api': {
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/deepseek-api/, ''),
      },
    },
  },
  optimizeDeps: {
    exclude: ['@dgreenheck/ez-tree'],
  },
  resolve: {
    dedupe: ['three'],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
