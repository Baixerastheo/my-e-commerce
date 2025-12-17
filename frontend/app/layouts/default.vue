<script setup lang="ts">
import Header from '../shared/components/Header.vue'
import Footer from '../shared/components/Footer.vue'
</script>

<template>
  <div class="layout">
    <Header />

    <main>
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

main {
  flex: 1;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}
</style>