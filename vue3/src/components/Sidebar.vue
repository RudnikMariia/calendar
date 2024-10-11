<!-- src/components/Sidebar.vue -->
<template>
  <div class="sidebar">
    <div class="sidebar-title">
      <div>IMPEKABLE</div>
    </div>
    <div class="sidebar-section">
      <ul>
        <li><img src="../assets/images/home.svg" alt="home"> Home</li>
        <li><img src="../assets/images/calendar.svg" alt="calendar">Calendar</li>
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
  width: 260px;
  background-color: #43425D;
  color: #FFFFFF;
  font-size: 15px;
}

.sidebar-title {
  font-weight: bold;
  padding: 26px 20px;
  background: #3C3B53;
  letter-spacing: 3px;
  font-size: 16px;
  color: #FFFFFF;
}

.sidebar-section {
  font-weight: 400;
  padding: 0 20px;
}

.sidebar-section li {
  margin: 0;
  padding: 20px 0;
  display: flex;
  align-items: flex-start;
}

.sidebar-section li img{
  margin-right: 11px;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  margin-right: 3px;
}
</style>
