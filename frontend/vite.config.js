import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
// import path from 'node:path';

export default defineConfig(() => {
  // Get current directory using ESM-compatible method
  // const currentDir = path.dirname(fileURLToPath(import.meta.url));
  
  // Load environment variables
  // const env = loadEnv(mode, currentDir, '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://e-commerce-production-07f8.up.railway.app',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '/api'), // Keep single /api prefix
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // Remove duplicate version prefix if it exists
              proxyReq.path = proxyReq.path.replace('/v1/v1', '/v1');
              console.log('Adjusted Proxy Path:', proxyReq.path);
            });
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