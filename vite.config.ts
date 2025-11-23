import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from 'path';
import { defineConfig } from "vite";

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

export default defineConfig({
  base: '/Nexxport/', // <<< WAJIB untuk GitHub Pages
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
});
