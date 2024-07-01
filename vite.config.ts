import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

import dotenv from 'dotenv';
dotenv.config();

const { APP_PORT = 3003 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      shared: path.resolve(__dirname, './src/shared'),
      app: path.resolve(__dirname, './src/app'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${APP_PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist/app',
  },
});
