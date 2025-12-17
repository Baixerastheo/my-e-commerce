<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../features/auth/stores/useAuthStore';
import { waitForInitialization } from '../services/api.client';
import HeaderAdmin from '../features/admin/components/HeaderAdmin.vue';
import FooterAdmin from '../features/admin/components/FooterAdmin.vue';

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
    return;
  }
  
  if (!isAdmin.value) {
    await navigateTo('/');
    return;
  }
});
</script>

<template>
  <div v-if="isChecking" class="admin-layout-loading">
    <p>Chargement...</p>
  </div>
  
  <div v-else-if="!authStore.isAuthenticated || !isAdmin" class="admin-layout">
  </div>
  
  <div v-else class="admin-layout">
    <HeaderAdmin />
    
    <main class="admin-main">
      <NuxtPage />
    </main>
    
    <FooterAdmin />
  </div>
</template>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

.admin-main {
  flex: 1;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

.admin-layout-loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #6e6e73;
}
</style>
