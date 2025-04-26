import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  // Get current directory using ESM-compatible method
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  
  // Load environment variables
  const env = loadEnv(mode, currentDir, '');

  return {
    plugins: [react()],
    base: '/',
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
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
  };
});