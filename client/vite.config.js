import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const config = {
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "icon.svg"],
      manifest: {
        name: "InstantSplit",
        short_name: "InstantSplit",
        theme_color: "#302a4d",
        background_color: "#302a4d",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "dist",
    minify: "esbuild",
  },
  css: {
    modules: true, // Enable CSS modules
  },
  include: ["src/**/*"], // Specify which files to include as source files
};

export default config;
