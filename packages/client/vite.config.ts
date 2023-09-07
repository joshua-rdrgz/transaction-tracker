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
