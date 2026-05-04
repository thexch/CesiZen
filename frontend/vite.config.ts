import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

/*
  Résumé du fichier :
  - Sert à configurer Vite pour le frontend.
  - Fonctionne en activant le plugin React utilisé pendant le développement et le build.
*/
