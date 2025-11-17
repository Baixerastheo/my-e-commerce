import { useCartStore } from '../../stores/useCartStore'

export const useCartList = () => {
  const cartStore = useCartStore()

  const handleCheckout = () => {
    alert('Commande passée')
    cartStore.checkout()
  }

  return {
    handleCheckout
  }
}

