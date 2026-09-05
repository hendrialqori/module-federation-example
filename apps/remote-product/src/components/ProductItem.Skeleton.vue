<template>
  <div class="item-container">
    <div class="skeleton image-skeleton"></div>

    <div class="content">
      <div class="skeleton title-skeleton"></div>
      <div class="skeleton price-skeleton"></div>

      <div class="description">
        <div class="skeleton desc-skeleton"></div>
        <div class="skeleton desc-skeleton short"></div>
      </div>
    </div>

    <div class="actions">
      <div class="skeleton button-skeleton"></div>
    </div>
  </div>
</template>

<style scoped>
.item-container {
  border: 1px solid #ccc;
  text-align: center;
  padding-top: 20px;
  overflow: hidden;
}

.skeleton {
  background: linear-gradient(
    90deg,
    #eeeeee 25%,
    #dddddd 50%,
    #eeeeee 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.image-skeleton {
  width: calc(100% - 40px);
  height: 300px;
  margin: 0 auto;
}

.content {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.title-skeleton {
  width: 60%;
  height: 19px;
  border-radius: 4px;
}

.price-skeleton {
  width: 25%;
  height: 23px;
  border-radius: 4px;
}

.description {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.desc-skeleton {
  width: 100%;
  height: 16px;
  border-radius: 4px;
}

.desc-skeleton.short {
  width: 70%;
}

.actions {
  margin-top: 20px;
  border-top: 1px solid #ccc;
}

.button-skeleton {
  height: 41px;
  width: 100%;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>