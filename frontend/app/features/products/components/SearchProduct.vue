<script setup lang="ts">
import { useSearchProducts } from '../composables/useSearchProduct'

const { searchTerm, filteredProductsCount } = useSearchProducts()
</script>

<template>
  <div class="search-section">
    <div class="title-section">
      <h2
          class="number-products">
        Nombre de produits trouvés : {{ filteredProductsCount }}
      </h2>
    </div>
    <div class="search-product">
      <div class="search-input-wrapper">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Rechercher un produit..."
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../../../assets/css/searchProducts.css';
</style>