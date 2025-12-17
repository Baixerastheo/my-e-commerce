import { ref } from 'vue'
import { useCartStore } from '../stores/useCartStore'

/**
 * Composable pour gérer une quantité locale (ex: avant d'ajouter au panier)
 */
export const useQuantity = (initialValue: number = 1) => {
  const quantity = ref(initialValue)

  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      quantity.value -= 1
    }
  }

  const increaseQuantity = () => {
    quantity.value += 1
  }

  const resetQuantity = () => {
    quantity.value = initialValue
  }

  return {
    quantity,
    decreaseQuantity,
    increaseQuantity,
    resetQuantity
  }
}

/**
 * Composable pour gérer la quantité des articles dans le panier
 */
export const useCartQuantity = () => {
  const cartStore = useCartStore()

  const decreaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      cartStore.updateQuantity(id, currentQuantity - 1)
    } else {
      cartStore.removeFromCart(id)
    }
  }

  const increaseQuantity = (id: number, currentQuantity: number) => {
    cartStore.updateQuantity(id, currentQuantity + 1)
  }

  return {
    decreaseQuantity,
    increaseQuantity
  }
}

