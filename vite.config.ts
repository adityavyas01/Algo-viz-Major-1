import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {}
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-router-dom',
      '@tanstack/react-query',
      '@supabase/supabase-js'
    ],
    exclude: ['@vite/client', '@vite/env'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    },
    force: true
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined, // Let Vite handle all chunking automatically
        globals: {}
      },
    },
    chunkSizeWarningLimit: 800, // Increase limit since we have good chunking now
    sourcemap: mode === 'development',
    minify: mode === 'production' ? 'esbuild' : false,
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
