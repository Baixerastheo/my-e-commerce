<script setup lang="ts">
import Profile from '../features/auth/components/Profile.vue'

definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <Profile />
</template>

