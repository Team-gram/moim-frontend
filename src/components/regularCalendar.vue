<template>
	<div id="Calendar"> 
		<kalendar v-if="startKalendar>0"  :configuration="calendar_settings" :events="events" style="width:80%;">
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
				<b-form-group>
					<b-form-radio-group
						v-model="selected"
						:options="options"
						name="모임 일정 공개 비공개"
						plain
					></b-form-radio-group>
				</b-form-group>
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
        <!-- Button with custom close trigger value -->
        <b-button size="sm" @click="[removeEvent(currentSelectedSchedule), hide('forget')]" style="background-color:red;"> 삭제하기 </b-button>
        <b-button size="sm" @click="hide('forget')"> 닫기 </b-button>
      </template>
    </b-modal>
	</div>
</template>
<script>
import Kalendar from '@/lib-components/kalendar-container.vue';
import { regularGet, regularSet, regularRemove} from "@/services/calendar";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
	components: {
		Kalendar,
	},
	data() {
		return {
			selected: true,
			options: [
				{ text: '공개', value: true },
				{ text: '비공개', value: false },
			],
			colorlist : ["#AEDFDB","#96DFD8","#85D4BE","#AEE6CB","#60ABA8","#F6F3CF","#CDEEF3","#DAF1DE","#D6E9AA","#21B7A9","#EFF4E7","#EDE868"],
			startKalendar:0,
			currentSelectedSchedule:0,
      events:[
      ],
			calendar_settings: {
				view_type: 'week',
				cell_height: 5,
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
		if(this.getPhone){
			this.calendar_settings.read_only=true;
		}
		const response = await regularGet(this.$cookies.get("MoimUserId"));
		if(response.status==200)
      this.calendar = response.data;
		if(response.data.regular.length!=0)
			for (var item in response.data.regular){
				this.setEvent(response.data.regular[item]);
			}
		this.startKalendar=1;
  },
	computed:{
    ...mapGetters({getPhone:"getPhone"})
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
		},
	async	addAppointment(popup_info) {	
			let payload = {
				data: {
					title: this.new_appointment.title,
					description: this.new_appointment.description,
				},
				from: popup_info.start_time,
				to: popup_info.end_time,
			};	
			if(payload.data.title==null){
				this.$bvToast.toast("실패했습니다. 제목을 입력해주세요", {
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
      data["title"] = payload.data.title;
      data["detail"] = payload.data.description;
      data["userId"] = this.$cookies.get("MoimUserId");
			if(this.selected)
				data["isPublish"] = "Y"
			else
				data["isPublish"] = 'N'
			let response = await regularSet(data);
      if(response.status==200){
        this.$bvToast.toast(data.title+': 개인일정이 등록되었습니다.', {
        // title: "회원 정보 등록 실패",
        toaster: "b-toaster-top-right",
        appendToast: false,
        autoHideDelay: 3000,
        });
      }
			response = await regularGet(this.$cookies.get("MoimUserId"));
			if(response.status==200){
				payload.id = response.data.regular[response.data.regular.length-1].id;
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
			console.log('KalendarEvent', kalendarEvent);
			let day = kalendarEvent.start_time.slice(0, 10);
			this.$kalendar.removeEvent({
				day,
				key: kalendarEvent.key,
				id: kalendarEvent.kalendar_id,
			});
			const data = await regularRemove(this.$cookies.get("MoimUserId"),kalendarEvent.kalendar_id);
			if(data.status==200){
				this.$bvToast.toast('개인일정이 삭제되었습니다.', {
					// title: "회원 정보 등록 실패",
					toaster: "b-toaster-top-right",
					appendToast: false,
					autoHideDelay: 3000,
				});
			}
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
.creating-event{
	background-color: white;
}
.created-event{
	background-color: white;
}
.time{
	color:black
}
</style>