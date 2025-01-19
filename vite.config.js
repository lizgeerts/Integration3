import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Integration3/',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  optimizeDeps: {
    include: ['@lottiefiles/dotlottie-web'],
  },
});