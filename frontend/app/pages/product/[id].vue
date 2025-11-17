<template>
  <div class="product-detail">
    <NuxtLink to="/products" class="back-link">
      ← Retour aux produits
    </NuxtLink>


    <div v-if="loading" class="loading">
      <p>Chargement du produit...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>Erreur : {{ error }}</p>
    </div>

    <div v-else-if="product" class="product-detail-content">
      <div class="product-detail-image">
        <img :src="product.image" :alt="product.name" />
      </div>

      <div class="product-detail-info">
        <h1 class="product-detail-name">{{ product.name }}</h1>
        <p class="product-detail-price">{{ product.price }}€</p>
        <p class="product-detail-category">{{ product.category }}</p>
        <p class="product-detail-description">{{ product.description }}</p>

        <div v-if="product.specs && product.specs.length > 0" class="product-detail-specs">
          <h2 class="specs-title">Caractéristiques</h2>
          <ul class="specs-list">
            <li v-for="(spec, index) in product.specs" :key="index" class="spec-item">
              {{ spec }}
            </li>
          </ul>
        </div>

        <button class="add-to-cart-btn" @click="addToCart">
          <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductDetail } from '../../composables/useProductDetail'

const { product, loading, error, addToCart } = useProductDetail()
</script>

<style scoped>
@import '../../../assets/css/productDetail.css';
</style>

