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
      "/kakao": {
        target: "http://43.200.20.180:8080/oauth2/login/callback/kakao",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kakao/, ""),
      },
    },
  },
});
