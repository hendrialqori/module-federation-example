import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import * as Page from "./pages";
import {
  CartErrorBoundary,
  ProductErrorBoundary,
} from "./components/ErrorBoundary";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Page.Products,
        ErrorBoundary: ProductErrorBoundary,
      },
      { path: "cart", Component: Page.Cart, ErrorBoundary: CartErrorBoundary },
    ],
  },
]);
