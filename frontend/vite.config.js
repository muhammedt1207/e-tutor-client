import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      src:'./src'
    }
  },
  define:{
    global:{}
  },
  server: {
    port: 3001 // Change this to the desired port
  }
})
