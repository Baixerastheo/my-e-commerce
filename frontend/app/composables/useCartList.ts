import { ref } from 'vue'
import { useCartStore } from '../../stores/useCartStore'
import { useTracking } from './useTracking'
import { useAuthStore } from '../../stores/useAuthStore'
import apiClient from '../services/api.client'

export const useCartList = () => {
  const cartStore = useCartStore()
  const { trackPurchase } = useTracking()
  const authStore = useAuthStore()
  const isLoading = ref(false)

  const handleCheckout = async () => {
    if (!authStore.isAuthenticated || !authStore.user) {
      alert('Vous devez être connecté pour passer une commande')
      return
    }

    if (cartStore.cart.length === 0) {
      alert('Votre panier est vide')
      return
    }

    isLoading.value = true

    try {
      const items = cartStore.cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))

      const purchaseItems = cartStore.cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        total: item.price * item.quantity
      }))

      await apiClient.post('/api/purchases/bulk', {
        userId: authStore.user!.id,
        items: purchaseItems
      })

      trackPurchase(cartStore.totalPrice, items)

      cartStore.checkout()

      alert('Commande passée avec succès !')
    } catch (error: any) {
      console.error('Erreur lors de la création de la commande:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Une erreur est survenue lors de la création de la commande'
      alert(`Erreur: ${errorMessage}`)
    } finally {
      isLoading.value = false
    }
  }

  return {
    handleCheckout,
    isLoading
  }

}

