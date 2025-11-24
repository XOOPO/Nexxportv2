import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",          // ⚠️ WAJIB! Biar Render load CSS/JS benar
  plugins: [react()],
});
