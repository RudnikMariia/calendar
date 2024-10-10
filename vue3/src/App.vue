<!-- src/App.vue -->
<template>
  <MainLayout :currentEvents="currentEvents" @toggleWeekends="handleWeekendsToggle">
    <Calendar />
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import MainLayout from './layouts/MainLayout.vue'
import Calendar from './components/Calendar.vue'

const currentEvents = ref([])

function handleWeekendsToggle() {
  // Логіка перемикання вихідних днів
}
</script>
