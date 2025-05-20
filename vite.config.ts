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
      "@world": path.resolve(__dirname, "./src/world"),
      "@player": path.resolve(__dirname, "./src/player"),
      "@hud": path.resolve(__dirname, "./src/hud"),
    },
  },
});
