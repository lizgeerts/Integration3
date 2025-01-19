import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Integration3/', 
  optimizeDeps: {
    include: ['@lottiefiles/dotlottie-web'], 
  }
});