import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "node:path";
import { defineConfig } from "vite";
import { federation } from "@module-federation/vite";

import packageJson from "./package.json" with { type: "json" };
import exposes from "./exposes.config.ts"

const { dependencies } = packageJson;

const federationConfig = federation({
  name: "remoteCart",
  filename: "remoteEntry.js",
  exposes,
  dts: {
    tsConfigPath: "./tsconfig.federation.json"
  },
  shared: {
    react: {
      requiredVersion: dependencies.react,
      singleton: true,
    },
    "react-dom": {
      requiredVersion: dependencies["react-dom"],
      singleton: true,
    }
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
    origin: "http://localhost:5001",
    port: 5001
  },
});
