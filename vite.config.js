import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
  main: resolve(import.meta.dirname, 'index.html'),
  castello: resolve(import.meta.dirname, 'castello.html'),
  via_gorani: resolve(import.meta.dirname, 'via-gorani.html'),
  grembiule: resolve(import.meta.dirname, 'madonna-del-grembiule.html'),
  affari: resolve(import.meta.dirname, 'piazza-affari.html'),
  sepolcro: resolve(import.meta.dirname, 'piazza-san-sepolcro.html'),
  satiro: resolve(import.meta.dirname, 'san-satiro.html'),
  duomo: resolve(import.meta.dirname, 'piazza-duomo.html'),
  organizzatore: resolve(import.meta.dirname, 'organizzatore.html'),
      },
    },
  },
})
