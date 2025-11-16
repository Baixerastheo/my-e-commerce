<template>
  <div class="layout">
    <Header />

    <main>
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>