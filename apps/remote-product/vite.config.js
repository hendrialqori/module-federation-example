import vue from "@vitejs/plugin-vue";
import path from "path";
import exposes from "./exposes.config.js";

import { defineConfig, loadEnv } from "vite";
import { federation } from "@module-federation/vite";

import { dependencies } from "./package.json" with { type: "json" };

const federationConfig = federation({
  dts: false,
  name: "remoteProduct",
  filename: "remoteEntry.js",
  exposes,
  shared: {
    vue: {
      singleton: true,
      requiredVersion: dependencies.vue,
    },
  },
  manifest: true,
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue(), federationConfig],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    server: {
      origin: env.REMOTE_PRODUCT_URL,
      port: env.REMOTE_PRODUCT_PORT
        ? Number(env.REMOTE_PRODUCT_PORT)
        : 5002,
    },
    preview: {
      origin: env.REMOTE_PRODUCT_URL,
      port: env.REMOTE_PRODUCT_PORT
        ? Number(env.REMOTE_PRODUCT_PORT)
        : 5002,
    },
  };
});
