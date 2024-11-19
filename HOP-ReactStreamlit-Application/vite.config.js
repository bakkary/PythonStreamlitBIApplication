import { defineConfig } from 'vite'; // Ensure this is imported
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: './', // Use relative paths for assets
  plugins: [react()],
  server: {
    proxy: {
      '/streamlit': {
        target: 'http://localhost:8501',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/streamlit/, ''),
      },
      '/api': {
        target: 'http://localhost:7070',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

