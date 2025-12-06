import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GANTI 'nama-repo-anda' dengan nama repository github yang Anda buat
  base: '/wedding-invitation/', 
})
