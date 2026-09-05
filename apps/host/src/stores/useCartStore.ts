import { type CartState } from "../../../../packages/contracts/src";

import type {
  StoreApi,
  UseBoundStore,
} from "zustand";

import remoteUseCartStore from "remoteCart/useCartStore";

export const useCartStore =
  remoteUseCartStore as UseBoundStore<
    StoreApi<CartState>
  >;
