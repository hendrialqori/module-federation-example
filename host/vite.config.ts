import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "node:path";

import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

import packageJson from "./package.json" with { type: "json" };

const { dependencies } = packageJson;

const federationConfig = federation({
  name: "host",
  remotes: {
    remoteCart: {
      type: "module",
      name: "remoteCart",
      entry: "http://localhost:5001/remoteEntry.js",
    },
    remoteProduct: {
      type: "module",
      name: "remoteProduct",
      entry: "http://localhost:5002/remoteEntry.js",
    },
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: dependencies.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
});

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    federationConfig,
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    origin: "http://localhost:3000",
  },
});
