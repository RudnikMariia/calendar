<!-- src/components/Calendar.vue -->
<template>
  <FullCalendar
      class="calendar"
      :options="calendarOptions"
  >
    <template v-slot:eventContent="arg">
      <b>{{ arg.timeText }}</b>
      <i>{{ arg.event.title }}</i>
    </template>
  </FullCalendar>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../utils/event-utils'

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
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect()

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })
    }
  },
  eventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  },
  eventsSet(events) {
    // Update the events in the parent component
  },
}
</script>

<style scoped>
.calendar {
  max-width: 1100px;
  margin: 0 auto;
}

.fc .fc-daygrid-day-frame {
  height: 135px;
  padding-top: 17px;
  padding-right: 15px;
  color: #43425D;
  font-size: 15px;
}

.fc .fc-daygrid-day.fc-day-today {
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
</style>
