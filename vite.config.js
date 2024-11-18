import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',  // This will allow access from any IP
    port: 3000,        // Set the port to 3000
  },
  assetsInclude: ['**/*.svg']
})
