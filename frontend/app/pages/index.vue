<script setup lang="ts">
import SliderProduct from '../features/products/components/SliderProduct.vue'
import CategorySection from '../features/products/components/CategorySection.vue'
import FeaturedProducts from '../features/products/components/FeaturedProducts.vue'
import NewsletterSection from '../features/newsletter/components/NewsletterSection.vue'
</script>

<template>
  <div class="home-page">
    <SliderProduct />
    <CategorySection />
    <FeaturedProducts />
    <NewsletterSection />
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}
</style>