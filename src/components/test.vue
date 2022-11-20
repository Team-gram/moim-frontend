<template>
		<kalendar :configuration="calendar_settings" :events="events"/>
</template>
<script>
import { Kalendar } from 'kalendar-vue';
export default {
  name: "MoimTest",
	components: {
		Kalendar,
	},
	data() {
		return {
      events:[
        {
        from: '2020-03-18T18:00:00Z',
        to: '2020-03-18T19:00:00Z',
        data: 'Event 1',
        },
      ],
			calendar_settings: {
				view_type: 'week',
				cell_height: 10,
				scrollToNow: false,
				hourlySelection: false,
				start_day: new Date().toISOString(),
				military_time: false,
				read_only: false,
				day_starts_at: 6,
				day_ends_at: 24,
				overlap: true,
				hide_dates: [],
				hide_days: [],
				past_event_creation: true,
        formatDayTitle: '월',
			},
			new_appointment: {},
      
		};
	},
  created(){
  }
};
</script>
