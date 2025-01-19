import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Integration3/',
  image: {
    domains: ["localhost"],
  },
  optimizeDeps: {
    include: ['@lottiefiles/dotlottie-web'],
  },
});