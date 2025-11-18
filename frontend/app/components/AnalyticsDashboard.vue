<script setup lang="ts">
import { onMounted } from 'vue'
import { useAnalytics } from '../composables/useAnalytics'

const { stats, loading, error, fetchStats } = useAnalytics()

const refreshStats = () => {
  fetchStats()
}

const getEventTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'product_view': 'Vues de produits',
    'add_to_cart': 'Ajouts au panier',
    'search': 'Recherches',
    'purchase': 'Achats'
  }
  return labels[type] || type
}

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <div class="analytics-dashboard">
    <div class="dashboard-header">
      <h1>Tableau de bord Analytics</h1>
      <button @click="refreshStats" :disabled="loading" class="refresh-btn">
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
          <div class="stat-card">
            <h3>Total d'événements</h3>
            <p class="stat-value">{{ stats.totalEvents }}</p>
          </div>
          <div class="stat-card">
            <h3>Taux de conversion</h3>
            <p class="stat-value">{{ stats.conversionRate }}</p>
            <p class="stat-label">Vues → Ajouts panier</p>
          </div>
          <div class="stat-card">
            <h3>Taux de conversion final</h3>
            <p class="stat-value">{{ stats.finalConversionRate }}</p>
            <p class="stat-label">Ajouts panier → Achats</p>
          </div>
          <div class="stat-card">
            <h3>Valeur totale des achats</h3>
            <p class="stat-value">{{ stats.totalPurchaseValue }}€</p>
          </div>
        </div>
      </section>

      <section class="events-by-type">
        <h2>Événements par type</h2>
        <div class="events-grid">
          <div 
            v-for="[type, count] in Object.entries(stats.eventsByType)" 
            :key="type"
            class="event-card"
          >
            <h3>{{ getEventTypeLabel(type) }}</h3>
            <p class="event-count">{{ count }}</p>
          </div>
        </div>
      </section>

      <!-- Top produits vus -->
      <section class="top-products">
        <h2>Top 10 produits les plus consultés</h2>
        <div v-if="stats.topProductViews.length === 0" class="no-data">
          <p>Aucune donnée disponible</p>
        </div>
        <table v-else class="data-table">
          <thead>
            <tr>
              <th>ID Produit</th>
              <th>Nombre de vues</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in stats.topProductViews" :key="item.productId">
              <td>{{ item.productId }}</td>
              <td>{{ item.views }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="top-products">
        <h2>Top 10 produits les plus ajoutés au panier</h2>
        <div v-if="stats.topProductAdds.length === 0" class="no-data">
          <p>Aucune donnée disponible</p>
        </div>
        <table v-else class="data-table">
          <thead>
            <tr>
              <th>ID Produit</th>
              <th>Nombre d'ajouts</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in stats.topProductAdds" :key="item.productId">
              <td>{{ item.productId }}</td>
              <td>{{ item.adds }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="top-products">
        <h2>Top 10 produits les plus achetés</h2>
        <div v-if="stats.topProductPurchases.length === 0" class="no-data">
          <p>Aucune donnée disponible</p>
        </div>
        <table v-else class="data-table">
          <thead>
            <tr>
              <th>ID Produit</th>
              <th>Nombre d'achats</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in stats.topProductPurchases" :key="item.productId">
              <td>{{ item.productId }}</td>
              <td>{{ item.purchases }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      
      <section class="top-searches">
        <h2>Top 10 termes de recherche</h2>
        <div v-if="stats.topSearchTerms.length === 0" class="no-data">
          <p>Aucune donnée disponible</p>
        </div>
        <table v-else class="data-table">
          <thead>
            <tr>
              <th>Terme de recherche</th>
              <th>Nombre de recherches</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in stats.topSearchTerms" :key="item.term">
              <td>{{ item.term }}</td>
              <td>{{ item.searches }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>



<style scoped>
.analytics-dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dashboard-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #1d1d1f;
}

.refresh-btn {
  padding: 8px 16px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.refresh-btn:hover:not(:disabled) {
  background-color: #4f46e5;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  padding: 12px;
  background-color: #fee2e2;
  border-radius: 6px;
  color: #991b1b;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

section h2 {
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.stat-card {
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.stat-card h3 {
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
}

.stat-label {
  font-size: 11px;
  margin-top: 4px;
  color: #9ca3af;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.event-card {
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.event-card h3 {
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 6px;
}

.event-count {
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background-color: #f9fafb;
}

.data-table th {
  padding: 10px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.data-table td {
  padding: 10px;
  border-bottom: 1px solid #f3f4f6;
  color: #1d1d1f;
  font-size: 14px;
}

.data-table tbody tr:hover {
  background-color: #f9fafb;
}

.no-data {
  padding: 30px;
  text-align: center;
  color: #9ca3af;
}
</style>

