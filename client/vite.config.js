import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { ViteFaviconsPlugin } from "vite-plugin-favicon";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    ViteFaviconsPlugin({
      logo: "./src/assets/imgs/favicon.svg",
      favicons: { path: "assets/" },
    }),
  ],
  esbuild: {
    define: {
      this: "window",
    },
  },
});
