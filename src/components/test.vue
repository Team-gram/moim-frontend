<template>
  <kalendar :configuration="calendar_settings" :events.sync="events" />
</template>
<script>
import { Kalendar } from 'kalendar-vue';
export default {
name:"MoimTest",
components: {
  Kalendar,
  },
  data(){
    return{
      events: [
        {
          from: '2020-03-18T18:00:00Z',
          to: '2020-03-18T19:00:00Z',
          data: 'Event 1',
        },
        {
          from: '2020-03-18T19:00:00Z',
          to: '2020-03-18T21:00:00Z',
          data: 'Olive & Friends',
        },
      ],
      calendar_settings: {
        style: 'material_design',
        view_type: 'week',
        cell_height: 20,
        scrollToNow: true,
        start_day: new Date().toISOString(),
        read_only: false,
        day_starts_at: 0,
        day_ends_at: 24,
        overlap: true,
        hide_dates: ['2019-10-31'], // Spooky
        hide_days: [6],
        past_event_creation: true
      },
      new_appointment: {
        title: null,
        description: null
      }
    }
  },
}
</script>
