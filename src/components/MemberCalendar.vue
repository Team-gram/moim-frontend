<template>
	<div id="Calendar"> 
		<kalendar v-if="startKalendar>0"  :configuration="calendar_settings" :events="events">
		<div
			slot="created-card"
			slot-scope="{ event_information }"
			class="details-card"
			@click="startitem(event_information)"
		>
			<h5 class="appointment-title appfont">
				{{ event_information.data.title }}
			</h5>
			<h6 class="appsubfont" style="padding: 10px 0 0 0">
				{{ event_information.data.description }}
			</h6>
      <span class="time">
					{{ event_information.start_time.substr(11,5)}}
					<br>
					{{ event_information.end_time.substr(11,5)}}
				</span>
		</div>
		</kalendar>
		<b-modal
      id="modal-scrollable"
      centered
      scrollable
      title="모임 일정 상세 조회"
    >
      <template #modal-header>
        <h5>일정 상세 조회</h5>
      </template>
      <template>
        <b-row>
          <b-col v-if="this.currentSelectedSchedule">
            제목: {{ this.currentSelectedSchedule.data.title }}
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="this.currentSelectedSchedule">
            일시: {{ this.currentSelectedSchedule.start_time.substr(0,10)}} {{this.currentSelectedSchedule.start_time.substr(11,8)}} -
						{{this.currentSelectedSchedule.end_time.substr(11,8)}}
          </b-col>
        </b-row>
        <b-row>
          <b-col v-if="this.currentSelectedSchedule">
            상세 내용: {{ this.currentSelectedSchedule.data.description }}
          </b-col>
        </b-row>
      </template>
      <template #modal-footer="{ hide }">
        <b-button size="sm" @click="hide('forget')"> 닫기 </b-button>
      </template>
    </b-modal>
	</div>
</template>
<script>
import Kalendar from '@/lib-components/kalendar-container.vue';
import { regularGet } from "@/services/calendar";
import moment from "moment";
export default {
	components: {
		Kalendar,
	},
  props:['Memberid'],
	data() {
		return {
			startKalendar:0,
			currentSelectedSchedule:0,
			mintime:24,
			maxtime:0,
      events:[
      ],
			calendar_settings: {
				view_type: 'week',
				cell_height: 5,
				scrollToNow: false,
				hourlySelection: false,
				start_day: new Date().toISOString(),
				military_time: false,
				read_only: true,
				day_starts_at: 5,
				day_ends_at: 24,
				overlap: true,
				hide_dates: [],
				hide_days: [0,1,2,3,4,5,6],
				past_event_creation: true,
			},
			new_appointment: {},
		};
	},
  async created(){
		const response = await regularGet(this.Memberid);
		if(response.status==200)
      this.calendar = response.data;
		if(response.data.regular.length!=0)
			for (var item in response.data.regular){
				this.setEvent(response.data.regular[item]);
			}
		this.calendar_settings.day_starts_at = this.mintime;
		this.calendar_settings.day_ends_at = this.maxtime;
		this.startKalendar=1;
  },
	methods: {
		startitem(kalendarEvent){
			this.currentSelectedSchedule = kalendarEvent;
			console.log(kalendarEvent);
			this.$bvModal.show("modal-scrollable");
		},
		setEvent(item){
			var calen = Object();
			var data = Object();
			calen['from'] = moment().day(item.day+1).format().slice(0,11).toString() + item.startTime + "+09:00"
			calen['to'] = moment().day(item.day+1).format().slice(0,11).toString() + item.endTime + "+09:00"
			calen['id'] = item.id;
			data['title'] = item.title;
			data['description'] = item.detail;
			calen["data"] = data;
			this.events.push(calen);
      for(var dayindex in this.calendar_settings.hide_days){
        if(this.calendar_settings.hide_days[dayindex]==item.day){
          this.calendar_settings.hide_days.splice(dayindex,1);
        }
      }
			const startnum = Number(item.startTime.slice(0,2))-1;
			const endnum = Number(item.endTime.slice(0,2))+1;
			this.mintime = this.mintime > startnum ? startnum : this.mintime;
			this.maxtime = this.maxtime > endnum ? this.maxtime : endnum;
		},
	},
};
</script>

<style>
.appointment-title{
	color:black;
	width:100%;
}
.details-card{
	display: flex;
	flex-direction: column;
	width: 100px;
	height: 100%;
}
.details-button{
	margin: 0;
	border: none;
	color: #4c4b4b;
	position: absolute;
	padding-right: 0px;
	top: 5px;
	right: 5px;
	cursor: pointer;
	background: transparent;
}
svg{
	width: 18px;
	height: 18px;
	fill: white;
}
.popup-event{
	display: flex;
	justify-content: space-between;
}
.add{
	border: none;
	color: #29771c;
	background-color:rgba(0, 128, 0, 0.399);
	padding: 5px 10px;
}
.cancel {
  border: none;
  background-color: rgba(255, 0, 0, 0.399);
  color: red;
  padding: 5px 10px;
}
.appfont{
	font-size: 16px;
}
.appsubfont{
	color: black;
	font-size: 12px;	
}
.time{
	color:black
}
</style>