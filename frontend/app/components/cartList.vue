<script setup lang="ts">
import { useCartStore } from '../../stores/useCartStore'
import { useCartQuantity } from '../composables/useQuantity'
import { useCartList } from '../composables/useCartList'

const cartStore = useCartStore()
const { decreaseQuantity, increaseQuantity } = useCartQuantity()
const { handleCheckout, isLoading } = useCartList()
</script>

<template>
  <div class="cart-container">
    <!-- Panier vide -->
    <div v-if="cartStore.cart.length === 0" class="empty-cart">
      <p class="empty-cart-text">Votre panier est vide</p>
      <NuxtLink to="/products" class="empty-cart-link">Continuer vos achats</NuxtLink>
    </div>

    <!-- Panier avec articles -->
    <div v-else class="cart-content">
      <div class="cart-items-section">
        <div class="cart-items-header">
          <h2>Mon Panier</h2>
          <button 
            v-if="cartStore.cart.length > 0" 
            @click="cartStore.clearCart()" 
            class="clear-cart-btn"
            type="button"
          >
            Vider le panier
          </button>
        </div>

        <div class="cart-items-list">
          <div 
            v-for="(item, index) in cartStore.cart" 
            :key="item.id" 
            class="cart-item"
            :class="{ 'cart-item-last': index === cartStore.cart.length - 1 }"
          >
            <div class="cart-item-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            
            <div class="cart-item-details">
              <h3 class="cart-item-name">{{ item.name }}</h3>
              <p class="cart-item-price-unit">{{ item.price }}€ / unité</p>
              
              <div class="cart-item-actions">
                <div class="quantity-controls">
                  <button 
                    @click="decreaseQuantity(item.id, item.quantity)"
                    class="quantity-btn"
                    type="button"
                    aria-label="Diminuer la quantité"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                  <span class="quantity-value">{{ item.quantity }}</span>
                  <button 
                    @click="increaseQuantity(item.id, item.quantity)"
                    class="quantity-btn"
                    type="button"
                    aria-label="Augmenter la quantité"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
                
                <button 
                  @click="cartStore.removeFromCart(item.id)"
                  class="remove-btn"
                  type="button"
                  aria-label="Supprimer l'article"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
            
            <div class="cart-item-total">
              <p class="cart-item-total-price">{{ cartStore.getItemTotal(item.price, item.quantity) }}€</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Résumé du panier -->
      <div class="cart-summary">
        <div class="summary-card">
          <h2 class="summary-title">Résumé</h2>
          
          <div class="summary-row">
            <span>Sous-total</span>
            <span>{{ cartStore.totalPrice.toFixed(2) }}€</span>
          </div>
          
          <div class="summary-row">
            <span>Articles</span>
            <span>{{ cartStore.totalItems }}</span>
          </div>
          
          <div class="summary-divider"></div>
          
          <div class="summary-row summary-total">
            <span>Total</span>
            <span>{{ cartStore.totalPrice.toFixed(2) }}€</span>
          </div>
          
          <button 
            class="checkout-btn" 
            type="button" 
            @click="handleCheckout"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Traitement en cours...' : 'Passer la commande' }}
          </button>
          
          <NuxtLink to="/products" class="continue-shopping">
            ← Continuer vos achats
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../assets/css/cartList.css';
</style>
