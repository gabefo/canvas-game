import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "./src/core"),
      "@controls": path.resolve(__dirname, "./src/controls"),
      "@objects": path.resolve(__dirname, "./src/objects"),
      "@hud": path.resolve(__dirname, "./src/hud"),
    },
  },
});
