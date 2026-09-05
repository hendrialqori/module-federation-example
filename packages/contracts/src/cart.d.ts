import type { Product } from "./product";
export interface CartState {
    cart: Product[];
    addToCart: (product: Omit<Product, "quantity">) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    removeItem: (productId: number) => void;
    clearCart: () => void;
}
