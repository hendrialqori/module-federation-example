<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { mount } from "./components/renderProductList.js";

const containerRef = ref(null);

let unmountProducts;

onMounted(() => {
  if (!containerRef.value) return;

  unmountProducts = mount(containerRef.value);
});

onBeforeUnmount(() => {
  unmountProducts?.();
});
</script>

<template>
  <div ref="containerRef" />
</template>