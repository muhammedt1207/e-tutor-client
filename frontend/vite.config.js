import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: './src'
    }
  },
  define: {
    global: {}
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  server: {
    host: true,
    strictPort: true,
    port: 5173

  }
})
