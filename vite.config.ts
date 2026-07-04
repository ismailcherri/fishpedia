import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Deployed under https://<user>.github.io/fishpedia/ — override with BASE_PATH=/ for local root serving
const base = process.env.BASE_PATH ?? '/fishpedia/'

export default defineConfig({
  base,
  plugins: [
    tanstackStart({
      router: { basepath: base },
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        autoSubfolderIndex: true,
      },
    }),
    viteReact(),
    tailwindcss(),
  ],
})
