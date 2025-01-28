// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
      '@Hooks': path.resolve(__dirname, 'src/hooks'),
      '@Routes': path.resolve(__dirname, 'src/routes'),
      '@Services': path.resolve(__dirname, 'src/services'),
      '@Types': path.resolve(__dirname, 'src/types'),
      '@Utils': path.resolve(__dirname, 'src/utils'),
      '@Validations': path.resolve(__dirname, 'src/validations'),
      '@Styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: 'dist', // Ensure build files are output to the `dist` folder
    emptyOutDir: true, // Clear the folder before each build
  },
});
