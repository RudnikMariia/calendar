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

<style>
@font-face {
  font-family: 'SourceSansPro';
  src: url('@/assets/fonts/SourceSansPro-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'SourceSansPro', sans-serif;
  color: #4D4F5C;
  font-weight: 400;
}
</style>
