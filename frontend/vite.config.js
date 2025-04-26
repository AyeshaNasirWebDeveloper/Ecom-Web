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
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('error', (err) => console.log('Proxy Error:', err));
            proxy.on('proxyReq', (proxyReq) => console.log('Proxy Request:', proxyReq.path));
          }
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  };
});