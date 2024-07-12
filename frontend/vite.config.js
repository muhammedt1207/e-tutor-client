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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@zegocloud')) {
              return 'zegocloud';
            }
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  server: {
    host: true,
    strictPort: true,
    port: 5173

  }
})
