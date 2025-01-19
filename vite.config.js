import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Integration3/', // Update this for GitHub Pages or specific hosting paths
  optimizeDeps: {
    include: ['@lottiefiles/dotlottie-web'], // Ensures this dependency is bundled
  },
  resolve: {
    alias: {
      // Resolve @lottiefiles/dotlottie-web explicitly for Vite
      '@lottiefiles/dotlottie-web': 'node_modules/@lottiefiles/dotlottie-web/dist/dotlottie-web.es.js',
    },
  },
});