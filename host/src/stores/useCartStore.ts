export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

export interface CartState {
  cart: Product[];
  addToCart: (product: Omit<Product, "quantity">) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

import type {
  StoreApi,
  UseBoundStore,
} from "zustand";

import remoteUseCartStore from "remoteCart/useCartStore";

export const useCartStore =
  remoteUseCartStore as UseBoundStore<
    StoreApi<CartState>
  >;
