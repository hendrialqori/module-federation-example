<script setup>
import { ref, toRaw } from "vue";

const props = defineProps(["item"]);

const showSmokeText = ref(false);

const addToCart = () => {
  let timeoutId;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  const event = new CustomEvent("cart:add", {
    detail: toRaw(props.item),
  });

  window.dispatchEvent(event);

  showSmokeText.value = false;

  requestAnimationFrame(() => {
    showSmokeText.value = true;
  });

  timeoutId = setTimeout(() => {
    showSmokeText.value = false;
  }, 1200);
};

const truncateText = (text, maxLength, dots = "...") => {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + dots;
};
</script>

<template>
  <div class="item-container">
    <img :src="item.image" :alt="item.title" class="image" />

    <div class="content">
      <h2 class="title">
        {{ truncateText(item.title, 30, "..") }}
      </h2>

      <p class="price">${{ item.price.toFixed(2) }}</p>

      <p class="desc">
        {{ truncateText(item.description, 60) }}
      </p>
    </div>

    <div class="actions">
      <button @click="addToCart">
        Add to Cart

        <span v-if="showSmokeText" class="smoke-text">$ +Add to cart</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.item-container {
  border: 1px solid #ccc;
  text-align: center;
  padding-top: 20px;
}

.image {
  width: 100%;
  max-width: 100%;
  height: 300px;
  object-fit: contain;
  display: block;
}

.content {
  margin-top: 20px;
}

.content > * {
  margin-top: 5px;
}

.title {
  font-size: 1rem;
}

.price {
  font-size: 1.2rem;
}

.desc {
  color: #555;
}

.actions {
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 20px;
}

.actions > button {
  position: relative;

  padding: 10px;
  border: none;
  border-top: 1px solid #ccc;
  background-color: #fff;

  font-size: 1rem;
  font-weight: 500;

  overflow: visible;
}

.actions > button:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

/* Floating smoke text */
.smoke-text {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  pointer-events: none;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  animation: smoke-up 1.2s ease-out forwards;
  color: #3bff5f;
}

@keyframes smoke-up {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
    filter: blur(0);
  }

  40% {
    opacity: 0.8;
    transform: translateX(-50%) translateY(-25px) scale(1.05);
    filter: blur(0.5px);
  }

  70% {
    opacity: 0.4;
    transform: translateX(-50%) translateY(-45px) scale(1.15);
    filter: blur(1.5px);
  }

  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-70px) scale(1.3);
    filter: blur(4px);
  }
}
</style>
