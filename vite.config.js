import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/mirro-site/',
  root: '.',
  build: {
    // Зменшення розміру збірки
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true
  },
  // Оптимізація для розробки
  server: {
    open: true,
    cors: true,
    hmr: {
      overlay: true
    }
  },
  // Оптимізація для зображень
  optimizeDeps: {
    include: []
  },
  // Налаштування для CSS
  css: {
    devSourcemap: true
  }
})