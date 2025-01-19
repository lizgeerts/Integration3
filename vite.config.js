import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Integration3/', 
  optimizeDeps: {
    include: ['@lottiefiles/dotlottie-web'],
  },
  resolve: {
    alias: {
      '@lottiefiles/dotlottie-web': 'node_modules/@lottiefiles/dotlottie-web/dist/dotlottie-web.es.js',
    },
  },
});