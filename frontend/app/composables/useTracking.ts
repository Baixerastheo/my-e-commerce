import { ref } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:3001/api/analytics'

// Générer un ID de session unique
const getSessionId = (): string => {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem('tracking_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('tracking_session_id', sessionId)
  }
  return sessionId
}

// État du tracking
const isTrackingEnabled = ref(true)

export const useTracking = () => {
  const sessionId = getSessionId()

  // Fonction générique pour tracker un événement
  const track = async (eventType: string, data: Record<string, any> = {}) => {
    if (!isTrackingEnabled.value) return

    try {
      const currentPage = typeof window !== 'undefined' ? window.location.pathname : ''

      await axios.post(`${API_URL}/track`, {
        eventType,
        sessionId,
        page: currentPage,
        ...data
      })
    } catch (error) {
      console.warn('Tracking error:', error)
    }
  }

  // Produits les plus consultés
  const trackProductView = (product: {
    id: number
    name: string
    price: number
    category: string
  }) => {
    track('product_view', {
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productCategory: product.category
    })
  }

  // Ajout au panier/Taux de conversion
  const trackAddToCart = (
    product: {
      id: number
      name: string
      price: number
      category: string
    },
    quantity: number,
    cartValue: number
  ) => {
    track('add_to_cart', {
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productCategory: product.category,
      quantity,
      cartValue
    })
  }

  // Recherche de produit/Recherches populaires
  const trackSearch = (searchTerm: string, resultsCount: number) => {
    track('search', {
      searchTerm,
      searchResults: resultsCount
    })
  }

  // Achat complété/Conversions finales
  const trackPurchase = (cartValue: number, items: Array<{ id: number; name: string; quantity: number; price: number }>) => {
    track('purchase', {
      cartValue,
      quantity: items.reduce((sum, item) => sum + item.quantity, 0),
      metadata: {
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      }
    })
  }

  // Activer ou désactiver le tracking
  const enableTracking = () => {
    isTrackingEnabled.value = true
  }

  const disableTracking = () => {
    isTrackingEnabled.value = false
  }

  return {
    trackProductView,
    trackAddToCart,
    trackSearch,
    trackPurchase,
    enableTracking,
    disableTracking
  }
}

