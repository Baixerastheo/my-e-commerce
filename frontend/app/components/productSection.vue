<template>
  <div class="product-section">
    <div v-if="store.loading" class="loading">
      <p>Chargement des produits...</p>
    </div>

    <div v-else-if="store.error" class="error">
      <p>Erreur : {{ store.error }}</p>
    </div>

    <!-- Liste des produits -->
    <div v-else-if="store.products.length > 0">
      <div class="products-grid">
        <div
          v-for="product in store.products"
          :key="product.id"
          :ref="el => setProductCardRef(product.id, el)"
          class="product-card"
          :class="{ 'product-card-expanded': expandedProductId === product.id }"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">{{ product.price }}€</p>
            <p class="product-category">{{ product.category }}</p>
            <p class="product-description">{{ product.description }}</p>

            <!-- En savoir plus -->
            <div
              v-if="expandedProductId === product.id"
              class="product-expanded-content"
            >
              <div v-if="loadingDetails[product.id]" class="loading-details">
                <p>Chargement des détails...</p>
              </div>
              <div
                v-else-if="
                  productDetails[product.id] && productDetails[product.id].specs
                "
                class="product-specs"
              >
                <h4 class="specs-title">Caractéristiques</h4>
                <ul class="specs-list">
                  <li
                    v-for="(spec, index) in productDetails[product.id].specs"
                    :key="index"
                    class="spec-item"
                  >
                    {{ spec }}
                  </li>
                </ul>
              </div>
            </div>

            <button
              v-if="expandedProductId === product.id"
              class="add-to-cart-btn"
              @click.prevent="addToCart(product)"
              type="button"
            >
              <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Ajouter au panier
            </button>

            <button
              v-if="expandedProductId !== product.id"
              @click="expandProduct(product.id, $event)"
              class="product-link"
              type="button"
            >
              En savoir plus
            </button>
            <button
              v-else
              @click="collapseProduct($event)"
              class="product-link product-link-collapse"
              type="button"
            >
              Réduire
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Aucun produit -->
    <div v-else class="no-products">
      <p>Aucun produit disponible</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductSection } from '../composables/useProductSection'

const {
  store,
  expandedProductId,
  productDetails,
  loadingDetails,
  setProductCardRef,
  expandProduct,
  collapseProduct,
  addToCart
} = useProductSection()
</script>

<style scoped>
@import "../../assets/css/productSection.css";
</style>
