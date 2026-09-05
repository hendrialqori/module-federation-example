import vue from "@vitejs/plugin-vue";
import path from "path";
import exposes from "./exposes.config.js";

import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

import { dependencies } from "./package.json" with { type: "json" };

const federationConfig = federation({
  dts: false, //TypeScript declaration generation for federated modules, default is true
  name: "remoteProduct",
  filename: "remoteEntry.js",
  exposes,
  shared: {
    vue: {
      singleton: true,
      requiredVersion: dependencies.vue,
    },
  },
  manifest: true
});

export default defineConfig({
  plugins: [vue(), federationConfig],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    origin: "http://localhost:5002",
    port: 5002,
  },
});
