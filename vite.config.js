import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/giphy-clone/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: './_redirects',
          dest: '.',
        },
      ],
    }),
  ],
});
