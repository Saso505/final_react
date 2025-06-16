import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Adjust to "/" unless using a subdirectory
  build: {
    outDir: "dist", // Explicitly set output directory
    assetsDir: "assets", // Where assets like JS and CSS go
  },
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
});
