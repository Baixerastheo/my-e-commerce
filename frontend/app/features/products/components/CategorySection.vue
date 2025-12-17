<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategories } from '../composables/useCategories'
import '../../../../assets/css/categorySection.css'

const { categories, loading, error, initialize, goToCategory } = useCategories()

onMounted(() => {
  initialize()
})
</script>

<template>
  <section class="category-section">
    <h2 class="category-title">Nos catégories</h2>
    
    <div v-if="loading" class="loading">
      <p>Chargement des catégories...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>Erreur : {{ error }}</p>
    </div>

    <div v-else-if="categories.length > 0" class="categories-grid">
      <div
        v-for="category in categories"
        :key="category.name"
        class="category-card"
        @click="goToCategory(category.name)"
      >
        <div class="category-image">
          <img :src="category.image" :alt="category.name" />
          <div class="category-overlay">
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-count">{{ category.count }} produit{{ category.count > 1 ? 's' : '' }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

