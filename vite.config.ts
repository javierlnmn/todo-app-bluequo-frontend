import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
		tsconfigPaths(),
    tailwindcss(),
  ],
  preview: {
   port: 3000,
   strictPort: true,
  },
  server: {
   port: 3000,
   strictPort: true,
   host: true,
   origin: "http://0.0.0.0:3000",
  },
});