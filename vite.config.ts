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
        manualChunks: (id) => {
          // Only chunk node_modules to avoid circular dependency issues
          if (id.includes('node_modules')) {
            // Core React - must load first
            if (id.includes('react') || id.includes('react-dom') || id.includes('react/jsx-runtime') || id.includes('react-router')) {
              return 'vendor';
            }
            // Large UI libraries
            if (id.includes('lucide-react') || id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            // Supabase
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            // Other large libraries
            if (id.includes('@tanstack') || id.includes('three') || id.includes('framer-motion')) {
              return 'libs-vendor';
            }
            // Everything else
            return 'vendor';
          }
          // Let Vite automatically chunk components and pages to avoid circular deps
        },
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
