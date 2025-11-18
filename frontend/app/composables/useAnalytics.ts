import { ref } from 'vue'
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

  return {
    stats,
    loading,
    error,
    fetchStats
  }
}

