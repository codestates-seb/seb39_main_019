import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  esbuild: {
    define: {
      this: "window",
    },
  },
  server: {
    proxy: {
      // with options
      "/api": {
        target: "http://43.200.20.180:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/dog": {
        target: "http://apis.data.go.kr/1543061/animalInfoSrvc",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dog/, ""),
      },
    },
  },
});
