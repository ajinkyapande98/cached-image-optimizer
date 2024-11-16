// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/main.jsx',
      name: 'CachedImageOptimizer',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: [
        {
          format: 'es',
          entryFileNames: 'index.es.js',
          dir: 'dist',
          exports: 'named',
        },
        {
          format: 'cjs',
          entryFileNames: 'index.cjs.js',
          dir: 'dist',
          exports: 'named',
        },
        {
          format: 'umd',
          entryFileNames: 'index.umd.js',
          name: 'CachedImageOptimizer',
          dir: 'dist',
          globals: {
            react: 'React',
          },
        },
      ],
    },
  },
});
