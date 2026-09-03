import { useEffect, useEffectEvent, useRef, useState } from "react";

import { useCartStore, type Product } from "@/stores/useCartStore";

export default function ProductsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [remoteError, setRemoteError] = useState<unknown>(null);

  const { addToCart } = useCartStore();

  const handleAddToCart = useEffectEvent((event: Record<string, unknown>) => {
    const product = event.detail as Product;

    addToCart(product);
  });

  useEffect(() => {
    let unmount: (() => void) | undefined;
    let active = true;

    async function loadRemote() {
      try {
        const ProductList = await import("remoteProduct/ProductList");
        const container = containerRef.current;

        if (!container || !active) return;

        unmount = ProductList.mount(container);
      } catch (error) {
        if (active) {
          setRemoteError(error);
        }
      }
    }

    loadRemote();

    window.addEventListener(
      "cart:add",
      handleAddToCart as unknown as EventListener,
    );

    return () => {
      active = false;

      unmount?.();

      window.removeEventListener(
        "cart:add",
        handleAddToCart as unknown as EventListener,
      );
    };
  }, []);

  if (remoteError) {
    throw remoteError;
  }

  return <div ref={containerRef} />;
}
