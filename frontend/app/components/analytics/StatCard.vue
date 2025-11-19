<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  label?: string
}>()
</script>

<template>
  <div class="stat-card">
    <h3>{{ title }}</h3>
    <p class="stat-value">{{ value }}</p>
    <p v-if="label" class="stat-label">{{ label }}</p>
  </div>
</template>

<style scoped>
@import '../../../assets/css/analytics.css';
</style>