<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import ProductItem from "./ProductItem.vue";
import ProductItemSkeleton from "./ProductItem.Skeleton.vue";

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const controller = new AbortController();

const fetchProducts = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await fetch("https://fakestoreapi.com/products", {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    products.value = data;
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Fetch aborted");
      return;
    }

    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

onUnmounted(() => {
  controller.abort();
});
</script>

<template>
  <div v-if="loading" class="container">
    <ProductItemSkeleton v-for="n in 6" :key="n" />
  </div>

  <div v-else-if="error">
    {{ error }}
  </div>

  <div v-else class="container">
    <ProductItem v-for="item in products" :key="item.id" :item="item" />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>
