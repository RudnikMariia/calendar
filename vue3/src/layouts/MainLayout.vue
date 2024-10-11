<template>
  <div class="layout">
    <Sidebar :currentEvents="currentEvents" @toggleWeekends="handleWeekendsToggle" />
    <div class="layout-wrap">
      <div class="header">
        <div class="search-wrap">
          <img src="../assets/images/icon_search.svg" alt="search">
          <input type="text" class="no-border-input" placeholder="Search transactions, invoices or help">
        </div>
        <div class="header-menu">
          <div class="header-img-menu">
            <img src="../assets/images/circle.svg" alt="circle">
            <img src="../assets/images/massage.svg" alt="massage">
            <img src="../assets/images/call.svg" alt="call">
          </div>
          <div class="header-user">
          <span>
            John Doe
            <img src="../assets/images/arrow.svg" alt="arrow">
          </span>
            <div class="header-user-avatar"></div>
          </div>
        </div>
      </div>
      <div class="layout-content">
        <slot></slot>
      </div>
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

.layout-wrap {
  flex-grow: 1;
}

.layout-content {
  padding: 3em;
  max-width: 1100px;
  margin: 0 auto;
  background: #F0F0F7;
}

.header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
}

.header-user {
  display: flex;
  align-items: center;
  font-size: 13px;
}

.header-user img {
  margin-left: 13px;
}

.header-user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50px;
  background: #43425D;
  margin-left: 11px;
}

/* Стилі для інпуту без бордерів */
.no-border-input {
  border: none;
  outline: none;
  padding: 10px 15px;
  font-size: 14px;
  background: #FFFFFF;
  box-shadow: none;
  transition: all 0.3s ease;
  width: 230px;
}

.no-border-input:focus {
  border: none;
  outline: none;
  box-shadow: none;
}

.search-wrap {
  display: flex;
  align-items: center;
}
.search-wrap img {
  margin-bottom: 3px;
}

.header-menu {
  display: flex;
  align-items: center;
}
.header-img-menu {
  border-right: 1px solid #EBEBF2;
  margin-right: 21px;
  height: 28px;
  padding-right: 13px;
  display: flex;
  align-items: center;
}
.header-img-menu img {
  margin-left: 30px;
  width: 16px;
  height: 16px;
}
</style>
