import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      component: path.resolve(__dirname, "./src/component"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  server: {
    watch: {
      usePolling: true, // Giúp tránh lỗi với pnpm
    },
    port: 5000,
    open: true,
    host: true,
  },

  build: {
    outDir: "build",
    // Tắt sourcemap trong production
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Xóa console.log
        drop_debugger: true, // Xóa debugger statements
      },
      format: {
        comments: false, // Xóa comments
      },
      mangle: {
        toplevel: true, // Rút gọn tên biến ở top level
        safari10: true, // Tương thích Safari 10
      },
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        "firebase-messaging-sw": path.resolve(
          __dirname,
          "public/firebase-messaging-sw.js"
        ),
      },
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
        // Đổi tên file output để tránh cache
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
});
