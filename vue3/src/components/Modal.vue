<template>
  <div v-if="show" class="event-popup-overlay">
    <div class="event-popup">
      <div class="popup-content">
        <h2>Edit Event</h2>
        <form @submit.prevent="saveEvent">
          <!-- Event Title -->
          <div>
            <label for="event-title">Event Title</label>
            <input id="event-title" v-model="event.title" type="text" required />
          </div>

          <!-- Event Date and Time -->
          <div>
            <label for="event-date">Event Date</label>
            <input id="event-date" v-model="eventStartDate" type="date" required />
          </div>

          <div>
            <label for="event-time">Event Time</label>
            <input
                id="event-time"
                v-model="eventStartTime"
                type="time"
                required
            />
          </div>

          <!-- Event Description -->
          <div>
            <label for="event-description">Event Description</label>
            <textarea id="event-description" v-model="event.description"></textarea>
          </div>

          <!-- Event Color -->
          <div>
            <label for="event-color">Event Color</label>
            <input
                id="event-color"
                v-model="event.color"
                type="color"
            />
          </div>

          <div class="popup-buttons">
            <button type="submit">Save</button>
            <button @click="discardEvent" type="button">Discard</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  event: Object,
  show: Boolean,
});

const emit = defineEmits(['update', 'close']);

// Створюємо реактивну змінну для дати і часу початку події
const eventStartDate = ref('');
const eventStartTime = ref('');

// Синхронізуємо поля для часу та дати з подією при її відкритті
watch(() => props.event, (newVal) => {
  if (newVal && newVal.start) {
    const eventStart = new Date(newVal.start);
    eventStartDate.value = eventStart.toISOString().split('T')[0];
    eventStartTime.value = eventStart.toISOString().substr(11, 5);
  }
});

// Функція для збереження події
const saveEvent = () => {
  if (props.event) {
    const eventStart = new Date(eventStartDate.value);
    const [hours, minutes] = eventStartTime.value.split(':');
    eventStart.setHours(hours);
    eventStart.setMinutes(minutes);

    // Оновлюємо подію з новими параметрами
    emit('update', {
      ...props.event,
      start: eventStart.toISOString(),
      title: props.event.title,
      description: props.event.description,
      color: props.event.color,
    });
  }
  emit('close');
};

const discardEvent = () => {
  emit('close');
};
</script>

<style scoped>
.event-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-popup {
  width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 10000;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

.popup-content h2 {
  margin: 0 0 15px;
}

.popup-content label {
  display: block;
  margin: 5px 0;
}

.popup-content input,
.popup-content textarea {
  width: 100%;
  margin-bottom: 10px;
}

.popup-buttons {
  text-align: right;
}

.popup-buttons button {
  padding: 8px 15px;
  background-color: #3B86FF;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.popup-buttons button:hover {
  background-color: #2D6EBE;
}
</style>
