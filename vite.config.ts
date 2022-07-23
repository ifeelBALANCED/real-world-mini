import legacy from "@vitejs/plugin-legacy";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import vitePluginImp from "vite-plugin-imp";

export default defineConfig({
  plugins: [
    legacy(),
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: name => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
    port: parseInt(String(process.env.PORT), 10) || 3000,
  },
});
