import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dev server configuration to make HMR/ws stable across environments
  server: {
    // listen on all addresses (useful if you open the site via LAN or a proxy)
    host: true,
    port: 5173,
    // hmr settings - explicit values help when the client can't connect to the default ws
    hmr: {
      protocol: 'ws',
      // Use 'localhost' by default; if you open the site via another hostname (eg. cheriefamily.local)
      // change this to that hostname so the browser opens the correct websocket URL.
      host: 'localhost',
      port: 5173,
    },
  },
})
