<template>
  <div>
    <LoginSection v-if="showLogin" @switch-to-register="showLogin = false" />
    <RegisterSection v-else @switch-to-login="showLogin = true" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showLogin = ref(true)
</script>