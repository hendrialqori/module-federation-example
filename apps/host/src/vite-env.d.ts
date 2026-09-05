/// <reference types="vite/client" />

declare module "remoteProduct/ProductList" {
  export function mount(
    rootElement: HTMLElement,
    props?: Record<string, unknown>,
  ): () => void;
}

declare module "remoteCart/CartList" {
  import type { ComponentType } from "react";

  const CartList: ComponentType;

  export default CartList;
}

declare module "remoteCart/useCartStore" {
  import type { CartState } from "./stores/useCartStore";

  const Cart: CartState

  export default Cart;
}
