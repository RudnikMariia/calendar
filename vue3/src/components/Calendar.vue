<template>
  <div>
    <FullCalendar
        class="calendar"
        :options="calendarOptions"
    >
      <template v-slot:eventContent="arg">
        <b>{{ arg.timeText }}</b>
        <i>{{ arg.event.title }}</i>
      </template>
    </FullCalendar>

    <!-- Event Popup -->
    <EventPopup
        v-if="isPopupVisible"
        :event="selectedEvent"
        :show="isPopupVisible"
        @update="updateEvent"
        @close="closePopup"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {INITIAL_EVENTS, createEventId} from '../utils/event-utils';
import EventPopup from './Modal.vue';

const calendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  initialView: 'dayGridMonth',
  initialEvents: INITIAL_EVENTS,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  select(selectInfo) {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  },
  eventClick(clickInfo) {
    openPopup(clickInfo.event);
  },
  eventsSet(events) {
    // Update the events in the parent component
  },
};

const selectedEvent = ref(null);
const isPopupVisible = ref(false);

function openPopup(event) {
  selectedEvent.value = {...event};
  console.log(selectedEvent)
  isPopupVisible.value = true;
}

function updateEvent(updatedEvent) {
  console.log(selectedEvent)
  const calendarApi = selectedEvent.value?.calendar;
  if (calendarApi) {
    const event = calendarApi.getEventById(updatedEvent.id);
    event.setProp('title', updatedEvent.title);
    event.setStart(updatedEvent.start);
    event.setEnd(updatedEvent.end);
  }
  isPopupVisible.value = false;
}

// Закриває модалку
function closePopup() {
  isPopupVisible.value = false;
  selectedEvent.value = null;
}
</script>

<style scoped>
/* Ваш стиль для календаря */
</style>
