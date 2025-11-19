import { ref, computed } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api/analytics'

interface AnalyticsStats {
  totalEvents: number
  eventsByType: Record<string, number>
  topProductViews: Array<{ productId: number; views: number }>
  topProductAdds: Array<{ productId: number; adds: number }>
  topProductPurchases: Array<{ productId: number; purchases: number }>
  topSearchTerms: Array<{ term: string; searches: number }>
  conversionRate: string
  finalConversionRate: string
  totalCartValue: string
  totalPurchaseValue: string
  totalPurchases: number
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

export const useAnalytics = () => {
  const stats = ref<AnalyticsStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchStats = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get<AnalyticsStats>(`${API_URL}/stats`)
      stats.value = response.data
    } catch (err: any) {
      if (err.response?.status === 404) {
        error.value = 'Backend non accessible. Vérifiez que le serveur backend est démarré sur le port 3001.'
      } else {
        error.value = err instanceof Error ? err.message : 'Erreur lors du chargement des statistiques'
      }
      console.error('Analytics error:', err)
    } finally {
      loading.value = false
    }
  }

  const topProductViewsData = computed(() => {
    return stats.value?.topProductViews.map(item => ({
      'ID Produit': item.productId,
      'Nombre de vues': item.views
    })) || []
  })

  const topProductAddsData = computed(() => {
    return stats.value?.topProductAdds.map(item => ({
      'ID Produit': item.productId,
      'Nombre d\'ajouts': item.adds
    })) || []
  })

  const topProductPurchasesData = computed(() => {
    return stats.value?.topProductPurchases.map(item => ({
      'ID Produit': item.productId,
      'Nombre d\'achats': item.purchases
    })) || []
  })

  const topSearchTermsData = computed(() => {
    return stats.value?.topSearchTerms.map(item => ({
      'Terme de recherche': item.term,
      'Nombre de recherches': item.searches
    })) || []
  })

  return {
    stats,
    loading,
    error,
    fetchStats,
    getEventTypeLabel,
    topProductViewsData,
    topProductAddsData,
    topProductPurchasesData,
    topSearchTermsData
  }
}

