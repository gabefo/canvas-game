import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "./src/core"),
      "@world": path.resolve(__dirname, "./src/world"),
      "@player": path.resolve(__dirname, "./src/player"),
      "@hud": path.resolve(__dirname, "./src/hud"),
    },
  },
});
