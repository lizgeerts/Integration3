import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html'


export default defineConfig({
  base: '/Integration3/',
  plugins: [
    createHtmlPlugin({
      minify: false,
      pages: [
        {
          filename: 'index.html',
          template: 'index.html',
        },
        {
          filename: 'constancy.html',
          template: 'constancy.html',
        },
        {
          filename: 'labor.html',
          template: 'labor.html',
        },
      ]
    })
  ],
});