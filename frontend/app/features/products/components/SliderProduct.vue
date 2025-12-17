<script setup lang="ts">
import { onMounted } from "vue";
import { useSlider } from "../composables/useSlider";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const {
  slides,
  loading,
  error,
  initialize,
  swiperOptions,
  onSwiper,
  onMouseEnter,
  onMouseLeave,
  goToProduct
} = useSlider();

onMounted(() => {
  initialize();
});
</script>

<template>
  <div class="slider-product-container">
    <h2 class="slider-title">Les produits populaires</h2>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur : {{ error }}</div>
    <div v-else-if="slides.length === 0">Aucun produit trouvé</div>
    <div v-else @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <Swiper v-bind="swiperOptions" @swiper="onSwiper">
        <SwiperSlide v-for="slide in slides" :key="slide.id">
        <div class="slide-image-container">
          <img :src="slide.image" :alt="slide.name" />
          <div class="slide-overlay">
            <div class="slide-content">
              <h3>{{ slide.name }}</h3>
              <p class="slide-price">{{ slide.price }}€</p>
              <a href="#" @click.prevent="goToProduct(slide.id)" class="slide-link">Voir le produit →</a>
            </div>
          </div>
        </div>
      </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style scoped>
@import "../../../../assets/css/sliderProduct.css";
</style>
