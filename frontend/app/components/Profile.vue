<script setup lang="ts">
import { useAuthStore } from '../../stores/useAuthStore';
import '../assets/css/profile.css';

const authStore = useAuthStore();

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
                <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Nom d'utilisateur
              </div>
              <div class="info-value">{{ authStore.user.username }}</div>
            </div>

            <div class="info-item">
              <div class="info-label">
                <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email
              </div>
              <div class="info-value">{{ authStore.user.email }}</div>
            </div>

            <div class="info-item">
              <div class="info-label">
                <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
              <svg class="purchase-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Historique des commandes
            </h3>
          </div>
        </div>

        <div class="profile-actions">
          <button @click="handleLogout" class="logout-button">
            <svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

