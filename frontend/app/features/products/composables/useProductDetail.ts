import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/useProductStore'
import { useCartStore } from '../../cart/stores/useCartStore'
import { useQuantity } from '../../cart/composables/useQuantity'
import { useTracking } from '../../analytics/composables/useTracking'

export const useProductDetail = () => {
  const route = useRoute()
  const store = useProductStore()
  const cartStore = useCartStore()
  const { trackProductView, trackAddToCart } = useTracking()
  const product = ref<any>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const loadProduct = async () => {
    const productIdParam = route.params.id
    
    // Convertir le paramètre en nombre
    const productId = typeof productIdParam === 'string' 
      ? parseInt(productIdParam) 
      : parseInt(String(productIdParam))
    
    if (isNaN(productId)) {
      error.value = `ID de produit invalide: ${productIdParam}`
      loading.value = false
      return
    }

    loading.value = true
    error.value = null
    product.value = null
    
    try {
      // Récupérer le produit depuis le store
      const fetchedProduct = await store.getProductById(productId)
      
      if (fetchedProduct) {
        product.value = fetchedProduct
        // Tracker la vue du produit
        trackProductView({
          id: fetchedProduct.id,
          name: fetchedProduct.name,
          price: fetchedProduct.price,
          category: fetchedProduct.category
        })
      } else {
        error.value = store.error || 'Produit non trouvé'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors du chargement'
    } finally {
      loading.value = false
    }
  }

  // Charger le produit au montage de la page
  onMounted(() => {
    loadProduct()
  })

  // Recharger le produit si l'ID change (navigation entre produits)
  watch(() => route.params.id, () => {
    loadProduct()
  })

  const { quantity, decreaseQuantity, increaseQuantity, resetQuantity } = useQuantity(1)

  const addToCart = () => {
    if (product.value) {
      // Ajouter le produit plusieurs fois selon la quantité
      for (let i = 0; i < quantity.value; i++) {
        cartStore.addToCart(product.value)
      }
      // Tracker l'ajout au panier
      trackAddToCart(
        {
          id: product.value.id,
          name: product.value.name,
          price: product.value.price,
          category: product.value.category
        },
        quantity.value,
        cartStore.totalPrice
      )
      // Réinitialiser la quantité après ajout
      resetQuantity()
    }
  }

  return {
    product,
    loading,
    error,
    quantity,
    decreaseQuantity,
    increaseQuantity,
    addToCart
  }
}

