<template>
	<div>
		<kalendar :configuration="calendar_settings" :events="events">
		<div
				slot="created-card"
				slot-scope="{ event_information }"
				class="details-card"
			>
			<h4 class="appointment-title">
				{{ event_information.data.title }}
			</h4>
			<h5>
				{{ event_information.data.description }}
			</h5>
			<button @click="removeEvent(event_information)" class="remove">
				<img class="removeimg" src="@/assets/redX.png">
			</button>
		</div>
		<div slot="creating-card">
			<h4 class="appointment-title" style="text-align: left;">
				새 일정
			</h4>
		</div>
		<div
				slot="popup-form"
				slot-scope="{ popup_information }"
				style="display: flex; flex-direction: column;"
			>
			<h4 style="margin-bottom: 10px">
					새 일정
				</h4>
				<input
					v-model="new_appointment['title']"
					type="text"
					name="title"
					placeholder="Title"
				/>
				<textarea
					v-model="new_appointment['description']"
					type="text"
					name="description"
					placeholder="Description"
					rows="2"
				></textarea>
				<div class="buttons">
					<button class="cancel" @click="closePopups()">
						취소
					</button>
					<button @click="addAppointment(popup_information)">
						추가
					</button>
				</div>
			</div>
		</kalendar>
	</div>
</template>
<script>
import Kalendar from '@/lib-components/kalendar-container.vue';
import { regularget } from "@/services/calendar";
import moment from "moment";
export default {
  name: "MoimTest",
	components: {
		Kalendar,
	},
	data() {
		return {
      events:[
        {
					from: '2019-11-22T18:00:00Z',
					to: '2019-11-22T20:00:00Z',
					data: {
						title: '',
						description: '',
					},
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
				day_starts_at: 0,
				day_ends_at: 24,
				overlap: true,
				hide_dates: [],
				hide_days: [],
				past_event_creation: true,
			},
			new_appointment: {},
		};
	},
  async created(){
		const response = await regularget(this.$cookies.get("MoimUserId"));
		if(response.status==200)
      this.calendar = response.data;
    else{
      alert('로그인이 필요합니다.');
    }
		for (var item in response.data){
			this.setEvent(item);
		}
  },
	methods: {
		setEvent(item){
			var calen = Object();
			var data = Object();
			calen['from'] = moment().day(item.day).format().slice(0,11).toString() + item.startTime + "Z"
			calen['to'] = moment().day(item.day).format().slice(0,11).toString() + item.endTime + "Z"
			data['title'] = item.title;
			data['description'] = item.detail;
			calen["data"] = data;
			this.events.push(calen);
		},
		addAppointment(popup_info) {
			let payload = {
				data: {
					title: this.new_appointment.title,
					description: this.new_appointment.description,
				},
				from: popup_info.start_time,
				to: popup_info.end_time,
			};
			this.$kalendar.addNewEvent(payload);
			this.$kalendar.closePopups();
			this.clearFormData();
		},
		closePopups() {
			this.$kalendar.closePopups();
		},
		clearFormData() {
			this.new_appointment = {
				description: null,
				title: null,
			};
		},
		removeEvent(kalendarEvent) {
			console.log('KalendarEvent', kalendarEvent);
			let day = kalendarEvent.start_time.slice(0, 10);
			this.$kalendar.removeEvent({
				day,
				key: kalendarEvent.key,
				id: kalendarEvent.kalendar_id,
			});
		},
	},
};
</script>

<style>
.removeimg{
	object-fit: cover;
	width: 1em;
  height: 1em;
}
.remove{
	background-color: #b6d884;
	border: none;
}
.appointment-title{
	color:black;
	width:100%;
}
.details-card{
	padding:1px 1px 20px 1px
}
</style>