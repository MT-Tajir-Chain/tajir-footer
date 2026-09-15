import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  root: "playground",
  resolve: {
    alias: {
      "@tajir/footer": path.resolve(__dirname, "src/index.ts"),
    },
  },
  css: {
    postcss: path.resolve(__dirname, "postcss.config.js"),
  },
  server: {
    port: 5173,
  },
});
