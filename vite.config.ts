import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(), // Only React plugin is needed
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // absolute path for imports
    },
  },
  build: {
    outDir: "dist",             // Render expects 'dist' folder
    chunkSizeWarningLimit: 1000 // optional: avoid large chunk warnings
  }
});