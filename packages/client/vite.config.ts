/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import path from 'path';
import { config } from 'dotenv';

config();

// https://vitejs.dev/config/
export default defineConfig({
  envDir: process.cwd(),
  define: {
    'process.env.SERVER_BASE_URL': JSON.stringify(process.env.SERVER_BASE_URL),
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api/v1': {
        target: 'http://api-server:3000/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''),
        secure: true,
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
  build: {
    commonjsOptions: {
      include: [/.js$/],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    entries: ['./node_modules', '../../node_modules'],
    include: ['shared-zod-schemas'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/test/test-setup.ts',
  },
});
