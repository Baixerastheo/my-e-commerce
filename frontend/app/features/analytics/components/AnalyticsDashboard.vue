<script setup lang="ts">
import { onMounted } from 'vue'
import { useAnalytics } from '../composables/useAnalytics'
import StatCard from './StatCard.vue'
import EventCard from './EventCard.vue'
import DataTable from './DataTable.vue'

const {
  stats,
  loading,
  error,
  fetchStats,
  getEventTypeLabel,
  topProductViewsData,
  topProductAddsData,
  topProductPurchasesData,
  topSearchTermsData
} = useAnalytics()

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <div class="analytics-dashboard">
    <div class="dashboard-header">
      <h1>Tableau de bord Analytics</h1>
      <button @click="fetchStats" :disabled="loading" class="refresh-btn">
        {{ loading ? 'Chargement...' : 'Actualiser' }}
      </button>
    </div>

    <div v-if="error" class="error-message">
      <p>Erreur : {{ error }}</p>
    </div>

    <div v-if="loading && !stats" class="loading">
      <p>Chargement des statistiques...</p>
    </div>

    <div v-else-if="stats" class="dashboard-content">
      <section class="stats-overview">
        <h2>Vue d'ensemble</h2>
        <div class="stats-grid">
          <StatCard title="Total d'événements" :value="stats.totalEvents" />
          <StatCard 
            title="Taux de conversion" 
            :value="stats.conversionRate" 
            label="Vues → Ajouts panier"
          />
          <StatCard 
            title="Taux de conversion final" 
            :value="stats.finalConversionRate" 
            label="Ajouts panier → Achats"
          />
          <StatCard 
            title="Valeur totale des achats" 
            :value="`${stats.totalPurchaseValue}€`" 
          />
        </div>
      </section>

      <section class="events-by-type">
        <h2>Événements par type</h2>
        <div class="events-grid">
          <EventCard 
            v-for="[type, count] in Object.entries(stats.eventsByType)" 
            :key="type"
            :label="getEventTypeLabel(type)"
            :count="count as number"
          />
        </div>
      </section>

      <!-- Top produits vus -->
      <section class="top-products">
        <h2>Top 10 produits les plus consultés</h2>
        <DataTable 
          :columns="[
            { key: 'ID Produit', label: 'ID Produit' },
            { key: 'Nombre de vues', label: 'Nombre de vues' }
          ]"
          :data="topProductViewsData"
        />
      </section>

      <section class="top-products">
        <h2>Top 10 produits les plus ajoutés au panier</h2>
        <DataTable 
          :columns="[
            { key: 'ID Produit', label: 'ID Produit' },
            { key: 'Nombre d\'ajouts', label: 'Nombre d\'ajouts' }
          ]"
          :data="topProductAddsData"
        />
      </section>

      <section class="top-products">
        <h2>Top 10 produits les plus achetés</h2>
        <DataTable 
          :columns="[
            { key: 'ID Produit', label: 'ID Produit' },
            { key: 'Nombre d\'achats', label: 'Nombre d\'achats' }
          ]"
          :data="topProductPurchasesData"
        />
      </section>

      <section class="top-searches">
        <h2>Top 10 termes de recherche</h2>
        <DataTable 
          :columns="[
            { key: 'Terme de recherche', label: 'Terme de recherche' },
            { key: 'Nombre de recherches', label: 'Nombre de recherches' }
          ]"
          :data="topSearchTermsData"
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
@import '../../../../assets/css/analytics.css';
</style>

