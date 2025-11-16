<template>
  <div class="product-detail">
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

        <div class="product-detail-specs">
          <h2 class="specs-title">Caractéristiques</h2>
          <ul class="specs-list">
            <li v-for="(spec, index) in product.specs" :key="index" class="spec-item">
              {{ spec }}
            </li>
          </ul>
        </div>

        <button class="add-to-cart-btn" @click="addToCart">
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../../../stores/useProductStore'

const route = useRoute()
const store = useProductStore()

const product = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  const productId = parseInt(route.params.id as string)
  
  if (isNaN(productId)) {
    error.value = 'ID de produit invalide'
    return
  }

  loading.value = true
  error.value = null
  
  try {
    const fetchedProduct = await store.getProductById(productId)
    if (fetchedProduct) {
      product.value = fetchedProduct
    } else {
      error.value = store.error || 'Produit non trouvé'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur lors du chargement'
  } finally {
    loading.value = false
  }
})

const addToCart = () => {
  // TODO: Implémenter l'ajout au panier
  console.log('Ajouter au panier:', product.value)
  alert(`${product.value?.name} ajouté au panier !`)
}
</script>

<style scoped>
@import '../../../assets/css/productDetail.css';
</style>

