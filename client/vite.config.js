import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  build: {
    outDir: "dist",
    minify: "esbuild",
  },
  optimizeDeps: {
    // Disabled for now as otherwise emoji-mart is not working
    enabled: false,
  },
};
