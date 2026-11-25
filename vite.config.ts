import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// - build normal : fichiers générés dans /_app (cache long côté Render),
//   séparés de public/assets où vont les visuels, qui doivent pouvoir être remplacés.
// - `npm run build:demo` : un seul fichier HTML autonome (JS et CSS inlinés).
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'demo' ? [viteSingleFile()] : [])],
  build: mode === 'demo' ? { outDir: 'dist-demo', emptyOutDir: true } : { assetsDir: '_app' },
}))
