import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: process.cwd(),
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
});
