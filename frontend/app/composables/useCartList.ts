import { useCartStore } from '../../stores/useCartStore'
import { useTracking } from './useTracking'

export const useCartList = () => {
  const cartStore = useCartStore()
  const { trackPurchase } = useTracking()

  const handleCheckout = () => {
    // récupérer les items pour le tracking
    const items = cartStore.cart.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }))
    
    // Tracker l'achat avant de vider le panier
    trackPurchase(cartStore.totalPrice, items)
    
    alert('Commande passée')
    cartStore.checkout()
  }

  return {
    handleCheckout
  }
}

