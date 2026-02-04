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
          // Critical: React must be in vendor chunk to load first
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react/jsx-runtime')) {
              return 'vendor';
            }
            if (id.includes('react-router')) {
              return 'vendor';
            }
            // UI libraries
            if (id.includes('lucide-react') || id.includes('@radix-ui') || id.includes('cmdk')) {
              return 'ui-vendor';
            }
            // Supabase
            if (id.includes('@supabase')) {
              return 'supabase-vendor';
            }
            // Query libraries
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor';
            }
            // Other node modules
            return 'vendor';
          }
          
          // Component chunking by feature
          if (id.includes('src/components/')) {
            if (id.includes('Visualization') || id.includes('Sort') || id.includes('Search') || id.includes('Tree') || id.includes('Graph') || id.includes('Heap') || id.includes('Hash')) {
              return 'visualization-components';
            }
            if (id.includes('Learning') || id.includes('Tutorial') || id.includes('Adaptive')) {
              return 'learning-components';
            }
            if (id.includes('Challenge') || id.includes('LeetCode') || id.includes('Daily')) {
              return 'challenge-components';
            }
            if (id.includes('Analytics') || id.includes('Progress') || id.includes('Behavior') || id.includes('Report')) {
              return 'analytics-components';
            }
            if (id.includes('Activity') || id.includes('Social') || id.includes('Collaborative') || id.includes('Leaderboard') || id.includes('Community')) {
              return 'social-components';
            }
            // Skip admin components chunking - let Vite handle it to avoid circular deps
            // if (id.includes('Admin') || id.includes('Management')) {
            //   return 'admin-components';
            // }
          }
          
          // Page chunking
          if (id.includes('src/pages/')) {
            // Skip Admin pages to avoid circular dependency issues
            if (id.includes('Admin')) {
              return undefined; // Let Vite decide
            }
            return 'pages';
          }
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
