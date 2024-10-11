<template>
  <h1>Calendar</h1>
  <div class="calendar-wrap">
    <h2>Calendar View</h2>
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
    left: 'today,prev,next', // Об'єднуємо всі кнопки в одну групу
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  buttonText: {
    prev: 'Back',
    next: 'Next',
    today: 'Today',
  },
  initialView: 'timeGridDay', // Перегляд дня по годинах
  initialEvents: INITIAL_EVENTS,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  nowIndicator: true, // Додає лінію поточного часу
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
  slotDuration: '01:00:00',  // Інтервал на годину
  timeFormat: 'h:mm A',  // Формат часу для подій
  slotLabelFormat: {    // Формат для відображення слотів
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,  // Включає 12-годинний формат
  },
}
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

<style lang="css">
.calendar-wrap {
  background: #FFFFFF;
  padding: 20px;
  box-shadow: 0px 2px 6px #0000000A;
}

h1 {
  color: #43425D;
  font-size: 28px;
  margin-bottom: 32px;
  font-weight: normal;
}

h2 {
  font-size: 18px;
  color: #4D4F5C;
  margin: 0 0 -20px;
  font-weight: 400;
}

.fc { /* корінь календаря */
  max-width: 1100px;
  margin: 0 auto;
}

.fc .fc-toolbar {
  align-items: end;
}

.fc .fc-toolbar.fc-header-toolbar {
  margin-bottom: 20px;
}

.fc-header-toolbar > *:last-child {
  margin-bottom: 40px;
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
.fc .fc-button-primary:focus {
  box-shadow: none !important;
}

.fc-col-header {
  border: 1px solid #EAF0F4;
  text-transform: uppercase;
  font-size: 11px !important;
  color: #A3A6B4 !important;
  background: #F5F6FA;
}

.fc-theme-standard .fc-scrollgrid,
.fc-theme-standard td,
.fc-theme-standard th {
  border: 1px solid #EAF0F4;
  border-collapse: collapse;
}

.fc-col-header-cell {
  padding-bottom: 16px !important;
  padding-top: 16px !important;
  border: none !important;
}

.fc-timegrid-axis {
  border: none !important;
  height: 50px;
}

.fc-daygrid .fc-daygrid-day-frame {
  height: 135px;
}

.fc .fc-daygrid-day-frame {
  color: #43425D;
  font-size: 15px;
}

.fc .fc-timegrid-divider {
  display: none;
}

.fc-direction-ltr .fc-timegrid-col-events {
  margin: 0;
}

.fc-daygrid-day-number {
  margin-right: 15px;
  margin-top: 17px;
}

.fc .fc-daygrid-day.fc-day-today {
  background-color: #F5F6FA;
}

.fc .fc-timegrid-col.fc-day-today {
  background-color: #F5F6FA;
}

.fc-h-event {
  background-color: #3B86FF;
  color: #FFFFFF;
}

.fc-daygrid-event {
  padding: 7px 0 7px 14px;
  font-size: 13px;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.fc .fc-timegrid-slot {
  height: 50px;
}

.fc .fc-daygrid-body-natural .fc-daygrid-day-events {
  margin-bottom: 0;
}

.fc-timegrid .fc-daygrid-event {
  padding: 3px 0 3px 14px;
}

.fc-timegrid-slot-label-cushion,
.fc-timegrid-axis-cushion {
  font-size: 13px;
  color: #4D4F5C;
  font-weight: 400;
  padding: 0 16px !important;
  white-space: nowrap;
}

.fc .fc-timegrid-axis-cushion {
  max-width: 100%;
}

.fc .fc-timegrid-axis-frame {
  justify-content: center;
}

.fc-timegrid-now-indicator-arrow {
  left: 80px !important;
  border-color: #3B86FF !important;
  border-width: 4px !important;
  border-radius: 50px;
  margin-top: -3px !important;
}

.fc .fc-timegrid-now-indicator-line {
  border-color: #3B86FF !important;
}

.fc .fc-timegrid-now-indicator-container {
  overflow: visible;
}
</style>
