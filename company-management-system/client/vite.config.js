import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';

export default defineConfig({
  plugins: [react(), tailwindcss(), dotenv.config()],
  server: {
    port: 5173,
    proxy: {
      '/api': process.env.VITE_BACKEND_URL
    }
  },
});
