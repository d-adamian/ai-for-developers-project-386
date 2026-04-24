import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/event-types': {
        target: 'http://localhost:4010',
        changeOrigin: true,
      },
      '/bookings': {
        target: 'http://localhost:4010',
        changeOrigin: true,
      },
      '/availability': {
        target: 'http://localhost:4010',
        changeOrigin: true,
      },
    },
  },
})
