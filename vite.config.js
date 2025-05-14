import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/mirro-site/',
  root: '.',
  build: {
    // Оптимізація збірки
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Розділення коду для кращої продуктивності
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          utils: ['./src/utils']
        }
      }
    },
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