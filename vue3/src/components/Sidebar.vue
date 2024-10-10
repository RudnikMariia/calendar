<!-- src/components/Sidebar.vue -->
<template>
  <div class="sidebar">
    <div class="sidebar-section">
      <h2>Instructions</h2>
      <ul>
        <li>Select dates and you will be prompted to create a new event</li>
        <li>Drag, drop, and resize events</li>
        <li>Click an event to delete it</li>
      </ul>
    </div>
    <div class="sidebar-section">
      <label>
        <input type="checkbox" :checked="weekends" @change="$emit('toggleWeekends')" />
        toggle weekends
      </label>
    </div>
    <div class="sidebar-section">
      <h2>All Events ({{ currentEvents.length }})</h2>
      <ul>
        <li v-for="event in currentEvents" :key="event.id">
          <b>{{ event.startStr }}</b> — <i>{{ event.title }}</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentEvents: Array,
  weekends: Boolean,
})
</script>

<style scoped>
.sidebar {
  width: 300px;
  padding: 20px;
  background-color: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.sidebar-section {
  padding: 2em;
}

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  margin-right: 3px;
}
</style>
