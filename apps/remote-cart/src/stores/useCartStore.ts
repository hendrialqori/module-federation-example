import { create } from "zustand";
import type { CartState } from "../../../../packages/contracts/src";

const useCartStore = create<CartState>()((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      return {
        cart: [
          ...state.cart,
          {
            ...product,
            quantity: 1,
          },
        ],
      };
    }),

  increaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    })),

  decreaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    })),

  removeItem: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  clearCart: () =>
    set({
      cart: [],
    }),
}));

export default useCartStore;
