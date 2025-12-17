<script setup lang="ts">
import { onMounted } from 'vue'
import { useFeaturedProducts } from '../composables/useFeaturedProducts'
import '../../../../assets/css/featuredProducts.css'

const { featuredProducts, loading, error, initialize, goToProduct } = useFeaturedProducts()

onMounted(() => {
  initialize()
})
</script>

<template>
  <section class="featured-section-wrapper">
    <div class="featured-section">
      <div class="featured-header">
        <h2 class="featured-title">Produits premium</h2>
        <p class="featured-subtitle">Découvrez notre sélection de produits haut de gamme</p>
      </div>
      
      <div v-if="loading" class="loading">
        <p>Chargement...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>Erreur : {{ error }}</p>
      </div>

      <div v-else-if="featuredProducts.length > 0" class="featured-grid">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="featured-card"
          @click="goToProduct(product.id)"
        >
          <div class="featured-badge">Premium</div>
          <div class="featured-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="featured-info">
            <h3 class="featured-name">{{ product.name }}</h3>
            <p class="featured-price">{{ product.price }}€</p>
            <p class="featured-category">{{ product.category }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

