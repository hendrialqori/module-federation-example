import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import { federation } from "@module-federation/vite";
import packageJson from "./package.json" with { type: "json" };

const { dependencies } = packageJson;

const createFederationConfig = ({
  cartUrl,
  productUrl,
}: Record<"cartUrl" | "productUrl", string>) => {
  const cartEntry = `${cartUrl}/remoteEntry.js`;
  const productEntry = `${productUrl}/remoteEntry.js`;

  return federation({
      name: "host",
      remotes: {
        remoteCart: {
          type: "module",
          name: "remoteCart",
          entry: cartEntry,
        },
        remoteProduct: {
          type: "module",
          name: "remoteProduct",
          entry: productEntry,
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
      manifest: true,
    });
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const federationConfig = createFederationConfig({
    cartUrl: env.REMOTE_CART_URL,
    productUrl: env.REMOTE_PRODUCT_URL,
  });

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
      port: env.HOST_PORT ? Number(env.HOST_PORT) : 5000,
      origin: env.HOST_URL,
    },
    preview: {
      port: env.HOST_PORT ? Number(env.HOST_PORT) : 5000,
      origin: env.HOST_URL,
    },
  };
});
