// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // Maps @ to the src directory
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
});
