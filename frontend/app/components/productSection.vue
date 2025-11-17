<template>
  <div class="product-section">
    <div v-if="store.loading" class="loading">
      <p>Chargement des produits...</p>
    </div>

    <div v-else-if="store.error" class="error">
      <p>Erreur : {{ store.error }}</p>
    </div>

    <!-- Liste des produits -->
    <div v-else-if="displayedProducts.length > 0">
      <div class="products-grid">
        <div
          v-for="product in displayedProducts"
          :key="product.id"
          class="product-card"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">{{ product.price }}€</p>
            <p class="product-category">{{ product.category }}</p>
            <p class="product-description">{{ product.description }}</p>

            <button
              @click="goToProduct(product.id)"
              class="product-link"
              type="button"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Aucun produit trouvé après recherche -->
    <div v-else-if="isSearchActive && displayedProducts.length === 0" class="no-products-found">
      <p>Oops, Aucun produits trouvés</p>
    </div>
    
    <div v-else class="no-products">
      <p>Aucun produit disponible</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductSection } from '../composables/useProductSection'

const { store, displayedProducts, goToProduct, isSearchActive } = useProductSection()
</script>

<style scoped>
@import "../../assets/css/productSection.css";
</style>
