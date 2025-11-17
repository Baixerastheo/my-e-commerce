import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../../stores/useProductStore'

export const useProductDetail = () => {
  const route = useRoute()
  const store = useProductStore()

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

  const addToCart = () => {
    if (product.value) {
      // TODO: Implémenter l'ajout au panier
      alert(`${product.value.name} ajouté au panier !`)
    }
  }

  return {
    product,
    loading,
    error,
    addToCart
  }
}

