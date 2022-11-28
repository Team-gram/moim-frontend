<template>
	<div id="Calendar" style="margin-top: 0px;">
		<b-button @click="[startKalendar=0,MoimAllCall()]" variant="outline-success" style="margin:0 0 10px 80%">모임 일정 조율</b-button>
		<kalendar v-if="startKalendar>0" :configuration="calendar_settings" :events="events">
		<div
			slot="created-card"
			slot-scope="{ event_information }"
			class="details-card" @click="startitem(event_information)"
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
			<button @click="removeEvent(event_information)" class="details-button"></button>
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
				<div class="buttons popup-event">
          <button class="add" @click="addAppointment(popup_information)">
						추가
					</button>
					<button class="cancel" @click="closePopups()">
						취소
					</button>
				</div>
			</div>
		</kalendar>
	</div>
</template>
<script>
import { regularMoimGet, regularMoimSet, regularMoimRemove} from "@/services/teamcalendar";
import { AllMeet } from "@/services/meet";
import Kalendar from '@/lib-components/kalendar-container.vue';
import moment from "moment";
export default {
  name: "MoimTest",
	components: {
		Kalendar,
	},
	data() {
		return {
			moimid: "",
			moimhostid: "",
			colorlist: ['red','white','gray','blue'],
			startKalendar:0,
      events:[
      ],
			calendar_settings: {
				view_type: 'week',
				cell_height: 7,
				scrollToNow: false,
				hourlySelection: false,
				start_day: new Date().toISOString(),
				military_time: false,
				read_only: false,
				day_starts_at: 0,
				day_ends_at: 24,
				overlap: true,
				hide_dates: [],
				hide_days: [0,1,2],
				past_event_creation: true,
			},
			new_appointment: {},
		};
	},
  async created(){
		this.moimid = this.$store.getters["searchStore/getSelectedMoimId"];
		this.moimhostid = this.$store.getters["searchStore/getSelectedMoimHostId"];
		this.setScreen();
		this.startKalendar = await this.regularGet(this.moimid);
  },
	mounted(){
	},
	methods: {
		setScreen(){
			// let hide = [0,1,2,3];	
      // if(this.$store.state.width<250){
			// 	this.calendar_settings.hide_days = hide;
			// }
			// else if(this.$store.state.width<450){
			// 	hide[0,1,2];
			// 	this.calendar_settings.hide_days = hide;
			// }
			// else{
			// 	this.calendar_settings.hide_days = [];
			// }
		},
		setEvent(item){
			var calen = Object();
			var data = Object();
			calen['from'] = moment().day(item.day+1).format().slice(0,11).toString() + item.startTime + "+09:00"
			calen['to'] = moment().day(item.day+1).format().slice(0,11).toString() + item.endTime + "+09:00"
			calen['id'] = item.id;
			data['title'] = item.scheduleName;
			data['description'] = item.scheduleDetail;
			calen["data"] = data;
			this.events.push(calen);
		},
	async	addAppointment(popup_info) {
		const IDcolor = document.getElementById("creating-event");
		IDcolor.style.backgroundColor = this.colorlist[Math.floor(Math.random() * 4)];
			let payload = {
				data: {
					title: this.new_appointment.title,
					description: this.new_appointment.description,
				},
				from: popup_info.start_time,
				to: popup_info.end_time,
			};
			if(this.moimhostid!=this.$cookies.get("MoimUserId")){
				this.$bvToast.toast("모임일정을 등록할 권한이 없습니다.", {
        toaster: "b-toaster-top-right",
        appendToast: false,
        autoHideDelay: 3000,
        });
				return;
			}
			if(payload.data.title==null){
				this.$bvToast.toast("제목을 입력해주세요", {
        toaster: "b-toaster-top-right",
        appendToast: false,
        autoHideDelay: 3000,
        });
				return;
			}
			var data = Object();
			data["day"] = moment(payload.from).day()-1;
			data["day"] = (data["day"]< 0) ? 6 : data["day"];
      data["startTime"] = payload.from.slice(11,19);
      data["endTime"] = payload.to.slice(11,19);
      data["scheduleName"] = payload.data.title;
      data["scheduleDetail"] = payload.data.description;
      data["moimId"] = this.moimid;
			let response = await regularMoimSet(data);
      if(response.status==200){
        this.$bvToast.toast(data.scheduleName+': 모임 정기 일정이 등록되었습니다.', {
        // title: "회원 정보 등록 실패",
        toaster: "b-toaster-top-right",
        appendToast: false,
        autoHideDelay: 3000,
        });
      }
			response = await regularMoimGet(this.moimid);
			if(response.status==200){
				console.log("ㅋㅋ");
				console.log(response.data);
				for(var index in response.data){
					if(response.data[index].startTime == data.startTime && response.data[index].endTime == data.endTime){
						payload.id = response.data[index].id;
					}
				}
			}
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
	async	removeEvent(kalendarEvent) {
			let day = kalendarEvent.start_time.slice(0, 10);
			this.$kalendar.removeEvent({
				day,
				key: kalendarEvent.key,
				id: kalendarEvent.kalendar_id,
			});
			const data = await regularMoimRemove(this.moimid,kalendarEvent.kalendar_id);
			if(data.status==200){
				this.$bvToast.toast('모임 일정이 삭제되었습니다.', {
					// title: "회원 정보 등록 실패",
					toaster: "b-toaster-top-right",
					appendToast: false,
					autoHideDelay: 3000,
				});
			}
		},
	async regularGet(moimid){
		let response = await regularMoimGet(moimid);
		for (var item in response.data.regular){
			this.setEvent(response.data.regular[item]);
		}
		return 1;
	},
	async MoimAllCall(){
			this.events = [];
			this.regularGet(this.moimid);
			const response = await AllMeet(this.moimid);
			if(response.data.length!=0)
				for (var item in response.data){
					response.data[item].scheduleName = response.data[item].name;
					this.setEvent(response.data[item]);
				}
			this.startKalendar=1;
		},
		startitem(kalendarEvent){
			console.log(kalendarEvent.kalendar_id);
		}
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
	font-size: 13px;	
}
.creating-event{
	background-color: rgba(100, 100, 100, 0.403);
}
.created-event{
	background-color: rgba(100, 100, 100, 0.403);
}
</style>