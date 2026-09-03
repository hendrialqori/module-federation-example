import baseMount from "../utils/bootstrap.js";
import ProductList from "./ProductList.vue";

export const mount = (rootElement, props = {}) =>
  baseMount(ProductList, rootElement, props);
