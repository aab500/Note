import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default {
  // other config options
  build: {
    rollupOptions: {
      external: ['/src/main.jsx']
    }
  }
});
