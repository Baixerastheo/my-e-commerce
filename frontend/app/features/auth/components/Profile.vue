<script setup lang="ts">
import { watch } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
import { usePurchase } from '../../purchase/composables/usePurchase';
import '../../../../assets/css/profile.css';

const authStore = useAuthStore();
const { purchases, groupedOrders, loading, error, loadPurchase } = usePurchase();

const handleLogout = async () => {
  await authStore.logout();
  navigateTo('/login');
};

const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateTime = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatPrice = (price: string | number) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(numPrice);
};

watch(
  () => authStore.user?.id,
  (userId) => {
    if (userId) {
      loadPurchase(userId);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div v-if="authStore.isAuthenticated && authStore.user" class="profile-container">
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar">
          <span class="avatar-initial">{{ authStore.user.username.charAt(0).toUpperCase() }}</span>
        </div>
        <h1 class="profile-title">Mon Profil</h1>
        <p class="profile-subtitle">Gérez vos informations personnelles</p>
      </div>

      <div class="profile-content">
        <div class="profile-main-layout">
          <div class="profile-info-group">
            <div class="info-item">
              <div class="info-label">
                <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Nom d'utilisateur
              </div>
              <div class="info-value">{{ authStore.user.username }}</div>
            </div>

            <div class="info-item">
              <div class="info-label">
                <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email
              </div>
              <div class="info-value">{{ authStore.user.email }}</div>
            </div>

            <div class="info-item">
              <div class="info-label">
                <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                Rôle
              </div>
              <div class="info-value">
                <span class="role-badge" :class="`role-${authStore.user.role.toLowerCase()}`">
                  {{ authStore.user.role }}
                </span>
              </div>
            </div>

            <div class="info-item">
              <div class="info-label">
                <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Membre depuis
              </div>
              <div class="info-value">{{ formatDate(authStore.user.createdAt) }}</div>
            </div>
          </div>

          <div class="purchase-info">
            <h3 class="purchase-title">
              <svg class="purchase-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Historique des commandes
            </h3>
            
            <div class="purchase-content">
              <div v-if="loading" class="purchase-loading">
                <p>Chargement de vos commandes...</p>
              </div>
              
              <div v-else-if="error" class="purchase-error">
                <p>{{ error }}</p>
              </div>
              
              <div v-else-if="groupedOrders.length === 0" class="purchase-empty">
                <p>Aucune commande pour le moment</p>
              </div>
              
              <div v-else class="purchase-list">
                <div 
                  v-for="order in groupedOrders" 
                  :key="order.orderId || `order-${order.purchases[0]?.id || 'unknown'}`" 
                  class="purchase-item"
                >
                  <div class="purchase-item-header">
                    <span class="purchase-id">
                      {{ `Commande #${order.purchases[0]?.id || 'N/A'}` }}
                    </span>
                    <span class="purchase-date">{{ formatDateTime(order.createdAt) }}</span>
                  </div>
                  <div class="purchase-item-details">
                    <div 
                      v-for="purchase in order.purchases" 
                      :key="purchase.id"
                      class="purchase-product-group"
                    >
                      <div class="purchase-product-info" v-if="purchase.product">
                        <img 
                          v-if="purchase.product.image" 
                          :src="purchase.product.image" 
                          :alt="purchase.product.name"
                          class="purchase-product-image"
                        />
                        <div class="purchase-product-text">
                          <h4 class="purchase-product-name">{{ purchase.product.name }}</h4>
                          <span class="purchase-product-category">{{ purchase.product.category }}</span>
                        </div>
                      </div>
                      <div v-else class="purchase-detail-row">
                        <span class="purchase-label">Produit ID:</span>
                        <span class="purchase-value">{{ purchase.productId }}</span>
                      </div>
                      <div class="purchase-detail-row">
                        <span class="purchase-label">Quantité:</span>
                        <span class="purchase-value">{{ purchase.quantity }}</span>
                      </div>
                      <div class="purchase-detail-row">
                        <span class="purchase-label">Prix unitaire:</span>
                        <span class="purchase-value">{{ formatPrice(parseFloat(purchase.total.toString()) / purchase.quantity) }}</span>
                      </div>
                      <div class="purchase-detail-row">
                        <span class="purchase-label">Sous-total:</span>
                        <span class="purchase-value">{{ formatPrice(purchase.total) }}</span>
                      </div>
                    </div>
                    <div class="purchase-detail-row purchase-total order-total">
                      <span class="purchase-label">Total de la commande:</span>
                      <span class="purchase-value">{{ formatPrice(order.total) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-actions">
          <button @click="handleLogout" class="logout-button">
            <svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
