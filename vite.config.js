import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // This maps frontend /api calls to your Node server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
