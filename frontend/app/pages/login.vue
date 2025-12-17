<script setup lang="ts">
import { ref } from 'vue'
import LoginSection from '../features/auth/components/LoginSection.vue'
import RegisterSection from '../features/auth/components/RegisterSection.vue'

const showLogin = ref(true)
</script>

<template>
  <div>
    <LoginSection v-if="showLogin" @switch-to-register="showLogin = false" />
    <RegisterSection v-else @switch-to-login="showLogin = true" />
  </div>
</template>