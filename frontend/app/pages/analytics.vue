<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../features/auth/stores/useAuthStore';
import { waitForInitialization } from '../services/api.client';
import AnalyticsDashboard from '../features/analytics/components/AnalyticsDashboard.vue';

const authStore = useAuthStore();
const isAdmin = computed(() => authStore.user?.role === 'admin');
const isChecking = ref(true);

onMounted(async () => {
  if (process.server) {
    return;
  }

  await waitForInitialization();
  
  isChecking.value = false;
  
  if (!authStore.isAuthenticated) {
    await navigateTo('/login');
  }
});
</script>

<template>
  <div v-if="isChecking" class="loading">
    <p>Chargement...</p>
  </div>
  <div v-else-if="!authStore.isAuthenticated" class="access-denied">
    <h1>Accès refusé</h1>
    <p>Vous devez être connecté pour accéder à cette page.</p>
  </div>
  <div v-else-if="!isAdmin" class="access-denied">
    <h1>Accès refusé</h1>
    <p>Vous devez avoir les droits administrateur pour accéder à cette page.</p>
    <p v-if="authStore.user">Votre rôle actuel : <strong>{{ authStore.user.role }}</strong></p>
    <p>Si vous venez d'obtenir les droits administrateur, veuillez vous déconnecter et vous reconnecter.</p>
  </div>
  <AnalyticsDashboard v-else />
</template>

<style scoped>
.loading {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
}

.access-denied {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.access-denied h1 {
  color: #d32f2f;
  margin-bottom: 1rem;
}

.access-denied p {
  margin: 0.5rem 0;
  color: #666;
}
</style>


