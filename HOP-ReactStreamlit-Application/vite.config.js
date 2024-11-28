import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // default build output directory
  },
  server: {
    port: 3000, // dev server port
  },
});
