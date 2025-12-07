<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/useAuthStore';
import { setInitializing, setInitPromise } from './services/api.client';

useHead({
  title: 'My E-commerce',
  meta: [
    { name: 'description', content: 'Votre destination pour des produits de qualité. Shopping en ligne simple et sécurisé.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'alternate icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/favicon.svg' }
  ]
})

onMounted(async () => {
  if (process.server) {
    return;
  }

  const authStore = useAuthStore();
  
  const initAuthPromise = (async () => {
    setInitializing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      await authStore.initAuth();
    } catch (error) {
    } finally {
      setInitializing(false);
    }
  })();
  
  setInitPromise(initAuthPromise);
  await initAuthPromise;
  setInitPromise(null);
})
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  line-height: 1.5;
  color: #1d1d1f;
  height: 100%;
  overflow-x: hidden;
  width: 100%;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #ffffff;
  height: 100%;
  overflow-x: hidden;
  width: 100%;
  position: relative;
}

#__nuxt {
  height: 100%;
  overflow-x: hidden;
  width: 100%;
}
</style>

