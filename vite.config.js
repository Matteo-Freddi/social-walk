import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, existsSync } from 'fs';

const root = import.meta.dirname;
const pages = { main: resolve(root, 'index.html') };
for (const d of readdirSync(root)) {
  if (/^tappa-\d+$/.test(d) && existsSync(resolve(root, d, 'index.html'))) {
    pages[d] = resolve(root, d, 'index.html');
  }
}

export default defineConfig({
  base: '/NOME-REPO/',          // sostituisci con il nome del repo
  build: { rollupOptions: { input: pages } },
  server: { host: true, port: 5173 },
});