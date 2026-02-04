import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração técnica para garantir o funcionamento na Vercel
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
})
