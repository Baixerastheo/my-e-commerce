<script setup lang="ts">
defineProps<{
  label: string
  count: number
}>()
</script>

<template>
  <div class="event-card">
    <h3>{{ label }}</h3>
    <p class="event-count">{{ count }}</p>
  </div>
</template>

<style scoped>
@import '../../../../assets/css/analytics.css';
</style>