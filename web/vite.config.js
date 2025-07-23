import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig(function({ command, mode }) {
  const env = loadEnv(mode, process.cwd());
  const config = {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      open: true,
    },
  };

  if (command === "serve") {
    config.server.proxy = {
      "/api": {
        target: env.VITE_API_URL,
      },
    };
  }
  return config;
});
