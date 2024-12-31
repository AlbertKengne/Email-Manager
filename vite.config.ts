import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.csv'],
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets'
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
