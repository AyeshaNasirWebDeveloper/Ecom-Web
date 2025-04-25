import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Convert import.meta.url to __dirname equivalent
const __dirname = path.resolve()

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // backend url
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})