// vite.config.js

import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  build: {
    outDir: "dist",
    minify: "esbuild",
  },
};
