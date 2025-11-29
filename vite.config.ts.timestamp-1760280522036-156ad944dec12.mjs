// vite.config.ts
import { defineConfig } from "file:///C:/Users/adity/Desktop/algo-viz/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/adity/Desktop/algo-viz/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///C:/Users/adity/Desktop/algo-viz/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\adity\\Desktop\\algo-viz";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  define: {
    global: "globalThis",
    "process.env": {}
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react-router-dom",
      "@tanstack/react-query",
      "@supabase/supabase-js"
    ],
    exclude: ["@vite/client", "@vite/env"],
    esbuildOptions: {
      define: {
        global: "globalThis"
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
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "react-vendor";
            }
            if (id.includes("react-router")) {
              return "router-vendor";
            }
            if (id.includes("lucide-react") || id.includes("@radix-ui") || id.includes("cmdk")) {
              return "ui-vendor";
            }
            if (id.includes("@supabase")) {
              return "supabase-vendor";
            }
            if (id.includes("@tanstack/react-query")) {
              return "query-vendor";
            }
            return "vendor";
          }
          if (id.includes("src/components/")) {
            if (id.includes("Visualization") || id.includes("Sort") || id.includes("Search") || id.includes("Tree") || id.includes("Graph") || id.includes("Heap") || id.includes("Hash")) {
              return "visualization-components";
            }
            if (id.includes("Learning") || id.includes("Tutorial") || id.includes("Adaptive")) {
              return "learning-components";
            }
            if (id.includes("Challenge") || id.includes("LeetCode") || id.includes("Daily")) {
              return "challenge-components";
            }
            if (id.includes("Analytics") || id.includes("Progress") || id.includes("Behavior") || id.includes("Report")) {
              return "analytics-components";
            }
            if (id.includes("Activity") || id.includes("Social") || id.includes("Collaborative") || id.includes("Leaderboard") || id.includes("Community")) {
              return "social-components";
            }
            if (id.includes("Admin") || id.includes("Management")) {
              return "admin-components";
            }
          }
          if (id.includes("src/pages/")) {
            return "pages";
          }
        },
        globals: {}
      }
    },
    chunkSizeWarningLimit: 800,
    // Increase limit since we have good chunking now
    sourcemap: mode === "development",
    minify: mode === "production" ? "esbuild" : false
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : []
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZGl0eVxcXFxEZXNrdG9wXFxcXGFsZ28tdml6XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhZGl0eVxcXFxEZXNrdG9wXFxcXGFsZ28tdml6XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hZGl0eS9EZXNrdG9wL2FsZ28tdml6L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgbW9kZSA9PT0gJ2RldmVsb3BtZW50JyAmJlxuICAgIGNvbXBvbmVudFRhZ2dlcigpLFxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBnbG9iYWw6ICdnbG9iYWxUaGlzJyxcbiAgICAncHJvY2Vzcy5lbnYnOiB7fVxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAncmVhY3QnLFxuICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAncmVhY3QvanN4LXJ1bnRpbWUnLFxuICAgICAgJ3JlYWN0LXJvdXRlci1kb20nLFxuICAgICAgJ0B0YW5zdGFjay9yZWFjdC1xdWVyeScsXG4gICAgICAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ1xuICAgIF0sXG4gICAgZXhjbHVkZTogWydAdml0ZS9jbGllbnQnLCAnQHZpdGUvZW52J10sXG4gICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgIGRlZmluZToge1xuICAgICAgICBnbG9iYWw6ICdnbG9iYWxUaGlzJ1xuICAgICAgfVxuICAgIH0sXG4gICAgZm9yY2U6IHRydWVcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBjb21tb25qc09wdGlvbnM6IHtcbiAgICAgIGluY2x1ZGU6IFsvbm9kZV9tb2R1bGVzL10sXG4gICAgICB0cmFuc2Zvcm1NaXhlZEVzTW9kdWxlczogdHJ1ZVxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XG4gICAgICAgICAgLy8gTm9kZSBtb2R1bGVzIGNodW5raW5nXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuICAgICAgICAgICAgLy8gUmVhY3QgZWNvc3lzdGVtXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlYWN0JykgfHwgaWQuaW5jbHVkZXMoJ3JlYWN0LWRvbScpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAncmVhY3QtdmVuZG9yJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJvdXRpbmdcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3Qtcm91dGVyJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdyb3V0ZXItdmVuZG9yJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVJIGxpYnJhcmllc1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdsdWNpZGUtcmVhY3QnKSB8fCBpZC5pbmNsdWRlcygnQHJhZGl4LXVpJykgfHwgaWQuaW5jbHVkZXMoJ2NtZGsnKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ3VpLXZlbmRvcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTdXBhYmFzZVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdAc3VwYWJhc2UnKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ3N1cGFiYXNlLXZlbmRvcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBRdWVyeSBsaWJyYXJpZXNcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnQHRhbnN0YWNrL3JlYWN0LXF1ZXJ5JykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdxdWVyeS12ZW5kb3InO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT3RoZXIgbm9kZSBtb2R1bGVzXG4gICAgICAgICAgICByZXR1cm4gJ3ZlbmRvcic7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC8vIENvbXBvbmVudCBjaHVua2luZyBieSBmZWF0dXJlXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdzcmMvY29tcG9uZW50cy8nKSkge1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdWaXN1YWxpemF0aW9uJykgfHwgaWQuaW5jbHVkZXMoJ1NvcnQnKSB8fCBpZC5pbmNsdWRlcygnU2VhcmNoJykgfHwgaWQuaW5jbHVkZXMoJ1RyZWUnKSB8fCBpZC5pbmNsdWRlcygnR3JhcGgnKSB8fCBpZC5pbmNsdWRlcygnSGVhcCcpIHx8IGlkLmluY2x1ZGVzKCdIYXNoJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd2aXN1YWxpemF0aW9uLWNvbXBvbmVudHMnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdMZWFybmluZycpIHx8IGlkLmluY2x1ZGVzKCdUdXRvcmlhbCcpIHx8IGlkLmluY2x1ZGVzKCdBZGFwdGl2ZScpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnbGVhcm5pbmctY29tcG9uZW50cyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0NoYWxsZW5nZScpIHx8IGlkLmluY2x1ZGVzKCdMZWV0Q29kZScpIHx8IGlkLmluY2x1ZGVzKCdEYWlseScpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnY2hhbGxlbmdlLWNvbXBvbmVudHMnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdBbmFseXRpY3MnKSB8fCBpZC5pbmNsdWRlcygnUHJvZ3Jlc3MnKSB8fCBpZC5pbmNsdWRlcygnQmVoYXZpb3InKSB8fCBpZC5pbmNsdWRlcygnUmVwb3J0JykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdhbmFseXRpY3MtY29tcG9uZW50cyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0FjdGl2aXR5JykgfHwgaWQuaW5jbHVkZXMoJ1NvY2lhbCcpIHx8IGlkLmluY2x1ZGVzKCdDb2xsYWJvcmF0aXZlJykgfHwgaWQuaW5jbHVkZXMoJ0xlYWRlcmJvYXJkJykgfHwgaWQuaW5jbHVkZXMoJ0NvbW11bml0eScpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnc29jaWFsLWNvbXBvbmVudHMnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdBZG1pbicpIHx8IGlkLmluY2x1ZGVzKCdNYW5hZ2VtZW50JykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdhZG1pbi1jb21wb25lbnRzJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gUGFnZSBjaHVua2luZ1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnc3JjL3BhZ2VzLycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3BhZ2VzJztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdsb2JhbHM6IHt9XG4gICAgICB9LFxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA4MDAsIC8vIEluY3JlYXNlIGxpbWl0IHNpbmNlIHdlIGhhdmUgZ29vZCBjaHVua2luZyBub3dcbiAgICBzb3VyY2VtYXA6IG1vZGUgPT09ICdkZXZlbG9wbWVudCcsXG4gICAgbWluaWZ5OiBtb2RlID09PSAncHJvZHVjdGlvbicgPyAnZXNidWlsZCcgOiBmYWxzZSxcbiAgfSxcbiAgZXNidWlsZDoge1xuICAgIGRyb3A6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyA/IFsnY29uc29sZScsICdkZWJ1Z2dlciddIDogW10sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlSLFNBQVMsb0JBQW9CO0FBQ3RULE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFIaEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUyxpQkFDVCxnQkFBZ0I7QUFBQSxFQUNsQixFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLGVBQWUsQ0FBQztBQUFBLEVBQ2xC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
