<script setup lang="ts">
defineProps<{
  columns: Array<{ key: string; label: string }>
  data: Array<Record<string, any>>
  emptyMessage?: string
}>()

const defaultEmptyMessage = 'Aucune donnée disponible'
</script>

<template>
  <div v-if="data.length === 0" class="no-data">
    <p>{{ emptyMessage || defaultEmptyMessage }}</p>
  </div>
  <table v-else class="data-table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="index">
        <td v-for="column in columns" :key="column.key">
          {{ row[column.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
@import '../../../assets/css/analytics.css';
</style>

