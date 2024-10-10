<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="layout">
    <Sidebar :currentEvents="currentEvents" @toggleWeekends="handleWeekendsToggle" />
    <div class="layout-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'

const props = defineProps({
  currentEvents: Array,
  handleWeekendsToggle: Function
})
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.layout-content {
  flex-grow: 1;
  padding: 3em;
  max-width: 1100px;
  margin: 0 auto;
}

.fc-toolbar-title {
  color: #4D4F5C;
  font-size: 18px !important;
  font-weight: 400;
}

.fc-button-group {
  box-shadow: 0px 2px 3px #0000000D;
}

.fc-button {
  background-color: #FFFFFF !important;
  border: 1px solid #D7DAE2 !important;
  color: #4D4F5C !important;
  padding: 8px 16px !important;
  text-transform: capitalize !important;
}

.fc-button-active {
  color: #3B86FF !important;
}

.fc .fc-button-primary:not(:disabled).fc-button-active:focus,
.fc .fc-button-primary:not(:disabled):active:focus {
  box-shadow: none !important;
}

.fc-col-header-cell {
  padding-bottom: 16px !important;
  padding-top: 16px !important;
  background: #F5F6FA;
  border: none !important;
}

.fc-col-header {
  border: 1px solid #EAF0F4;
  text-transform: uppercase;
  font-size: 11px !important;
  color: #A3A6B4 !important;
}

.fc-theme-standard .fc-scrollgrid,
.fc-theme-standard td,
.fc-theme-standard th {
  border: 1px solid #EAF0F4 !important;
  border-collapse: collapse;
}
</style>
