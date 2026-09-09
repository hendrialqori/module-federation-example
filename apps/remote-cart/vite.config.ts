import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import { federation } from "@module-federation/vite";

import packageJson from "./package.json" with { type: "json" };
import exposes from "./exposes.config.ts";

const { dependencies } = packageJson;

const federationConfig = federation({
  name: "remoteCart",
  filename: "remoteEntry.js",
  exposes,
  dts: {
    tsConfigPath: "./tsconfig.federation.json",
  },
  shared: {
    react: {
      requiredVersion: dependencies.react,
      singleton: true,
    },
    "react-dom": {
      requiredVersion: dependencies["react-dom"],
      singleton: true,
    },
  },
  manifest: true,
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
      origin: env.REMOTE_CART_URL,
      port: env.REMOTE_CART_PORT
        ? Number(env.REMOTE_CART_PORT)
        : 5001,
    },
    preview: {
      origin: env.REMOTE_CART_URL,
      port: env.REMOTE_CART_PORT
        ? Number(env.REMOTE_CART_PORT)
        : 5001,
    },
  };
});
