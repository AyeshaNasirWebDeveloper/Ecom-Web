import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'


export default defineConfig({
  plugins: [react()],
  base : "/",
  server: {
    proxy: {
      '/api': {
        target: 'https://e-commerce.railway.internal.app', 
        changeOrigin: true,
        secure: false,
      },
    },
    headers: {
      "Content-Type": "text/javascript"
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
  
})