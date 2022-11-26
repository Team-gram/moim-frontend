<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <b-card id="schedule-card" style="max-width: 1000px">
      <h4 id="schedule-title">모임 일정 참가하기</h4>
      <b-container class="bv-example-row">
        <b-row class="mb-3">
          <b-col id="subtitle">일정 유형*</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-form-radio-group
              v-model="type_selected"
              :options="type_options"
              class="mb-3"
              value-field="item"
              text-field="name"
              disabled-field="notEnabled"
              style="float: left"
            ></b-form-radio-group>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col id="subtitle">제목*</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-form-input
              id="form-input"
              v-model="schedule_name"
              aria-describedby="input-live-feedback"
              style="max-width: 200px"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mb-3" v-if="this.type_selected === 'Regular'">
          <b-col id="subtitle">날짜*</b-col>
          <div class="w-100"></div>
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="regular_type_selected"
              :options="regular_type_options"
              value-field="item"
              text-field="name"
              style="width: 80px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="regular_day_selected"
              :options="day_options"
              value-field="item"
              text-field="name"
              style="width: 80px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >요일</b-col
          >
        </b-row>

        <b-row class="mb-3" v-if="this.type_selected === 'Irregular'">
          <b-col id="subtitle">날짜*</b-col>
          <div class="w-100"></div>
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="year_selected"
              :options="year_options"
              value-field="item"
              text-field="name"
              style="width: 80px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >년</b-col
          >
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="month_selected"
              :options="month_options"
              value-field="item"
              text-field="name"
              style="width: 80px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >월</b-col
          >
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="date_selected"
              :options="date_options"
              value-field="item"
              text-field="name"
              style="width: 80px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >일</b-col
          >
        </b-row>
        <b-row class="mb-3">
          <b-col id="subtitle">시간*</b-col>
          <div class="w-100"></div>
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="start_hour_selected"
              :options="hour_options"
              style="width: 80px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >시</b-col
          >
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="start_minute_selected"
              :options="minute_options"
              style="width: 80px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >분</b-col
          >
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >~</b-col
          >
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="end_hour_selected"
              :options="hour_options"
              style="width: 80px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >시</b-col
          >
          <b-col
            cols="auto"
            style="padding: 0 5px 0 15px; margin: 0px 5px 5px 0"
          >
            <b-form-select
              id="form-input"
              v-model="end_minute_selected"
              :options="minute_options"
              style="width: 80px; text-align: center"
            ></b-form-select>
          </b-col>
          <b-col cols="auto" style="padding: 8px 0px 0 0; margin: 0px 5px 5px 0"
            >분</b-col
          >
        </b-row>

        <b-row class="mb-3">
          <b-col id="subtitle">설명</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-form-textarea
              id="form-input"
              v-model="schedule_description"
              placeholder="일정에 대한 설명 또는 메모를 입력하세요"
              rows="3"
              max-rows="3"
            ></b-form-textarea
          ></b-col>
        </b-row>
      </b-container>
    </b-card>
    <b-button
      pill
      id="register-button"
      class="ml-auto"
      align="center"
      style="margin-right: 10px; margin-top: 20px; margin-bottom: 40px"
      @click="registerSchedule()"
      >일정 등록
    </b-button>
  </div>
</template>

<script>
import { regularSet, irregularSet } from "@/services/calendar";
export default {
  data() {
    return {
      schedule_name: "",
      schedule_description: "",
      type_selected: "Regular",
      type_options: [
        { item: "Regular", name: "정기" },
        { item: "Irregular", name: "비정기" },
      ],
      regular_type_selected: "Weekly",
      regular_type_options: [
        { item: "Weekly", name: "매주" },
        // { item: "Monthly", name: "매달", disabled: true },
      ],
      // regular_selected: { type: null, day: null, start_time: {hour: null,
      // minute: null}, end_time: {hour: null, minute: null}},
      regular_day_selected: "0",
      day_options: [
        { item: "0", name: "월" },
        { item: "1", name: "화" },
        { item: "2", name: "수" },
        { item: "3", name: "목" },
        { item: "4", name: "금" },
        { item: "5", name: "토" },
        { item: "6", name: "일" },
      ],
      year_selected: "",
      year_options: [],
      month_selected: "",
      month_options: [],
      date_selected: "",
      date_options: [],
      hour_options: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
      ],
      minute_options: [],
      start_hour_selected: "",
      start_minute_selected: "",
      end_hour_selected: "",
      end_minute_selected: "",
    };
  },
  methods: {
    isSelectedTimeAppropriate() {
      var date = new Date();
      var year = date.getFullYear();
      var month = ("0" + (1 + date.getMonth())).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      let today = year + "-" + month + "-" + day;

      let start_time = this.start_hour_selected.toString()+":"+this.start_minute_selected.toString()+":"+"00";
      let end_time = this.end_hour_selected.toString()+":"+this.end_minute_selected.toString()+":"+"00";

      let start = today+" "+start_time;
      let end = today+" "+end_time;


      if(new Date(start).getTime()<new Date(end).getTime()) {
        return true;
      }
      else {
        return false;
      }
      
    },
  async  registerSchedule() {
      //요일, 시작 및 종료시간, 이름, 설명이 다 입력되었는지 확인
      var isValidSchedule = true;
      //시간 입력 문제
      if(!this.isSelectedTimeAppropriate()) {
        this.$bvToast.toast('종료 시각을 시작 시각 이후로 설정해주세요.', {
          // title: "",
          toaster: "b-toaster-top-right",
          appendToast: false,
          autoHideDelay: 3000,
        });
        isValidSchedule = false;
      }
      //필수 입력 사항(제목) 모두 입력했는지 확인
      if(this.schedule_name.split(' ').join('') == ""){
        this.$bvToast.toast('제목은 필수 입력 항목입니다.', {
          // title: "",
          toaster: "b-toaster-top-right",
          appendToast: false,
          autoHideDelay: 3000,
        });
        isValidSchedule = false;
      }
      var data = Object();
      const start_time = this.start_hour_selected.toString()+":"+this.start_minute_selected.toString();
      const end_time = this.end_hour_selected.toString()+":"+this.end_minute_selected.toString();
      data.userId = this.$cookies.get("MoimUserId"); 
      data.startTime = start_time;
      data.endTime = end_time;
      data.title = this.schedule_name;
      data.detail = this.schedule_description;

      if(isValidSchedule == true) {
        if(this.type_selected==="Regular") {
          data.day = this.regular_day_selected;
          const response = await regularSet(data);
          if(response.status==200){
            this.$bvToast.toast(data.title+': 개인일정(정기)가 등록되었습니다.', {
            // title: "회원 정보 등록 실패",
            toaster: "b-toaster-top-right",
            appendToast: false,
            autoHideDelay: 3000,
            });
          }
        }
        else {
          data.date = this.year_selected + "-" + this.month_selected + "-" + this.date_selected;
          console.log(data);
          const response = await irregularSet(data);
          if(response.status==200){
            this.$bvToast.toast(data.title+': 개인일정(비정기)가 등록되었습니다.', {
            // title: "회원 정보 등록 실패",
            toaster: "b-toaster-top-right",
            appendToast: false,
            autoHideDelay: 3000,
            });
          }
        }
      }
      
    },
  },
  created() {
    // this.childCategory_options = [];

    let today = new Date();

    this.year_selected = today.getFullYear(); // 년도
    this.month_selected = 1; // 월
    this.date_selected = 1; // 날짜
    this.regular_day_selected = 0; // 요일

    for (
      var year = this.year_selected;
      year <= this.year_selected + 3;
      year++
    ) {
      this.year_options.push(year);
    }
    for (var month = 1; month <= 12; month++) {
      this.month_options.push(month);
    }
    for (var date = 1; date <= 31; date++) {
      this.date_options.push(date);
    }

    this.start_hour_selected = 0; // 시
    this.end_hour_selected = 0;
    this.start_minute_selected = 0; // 분
    this.end_minute_selected = 0; // 분

    for (var hour = 0; hour <= 23; hour++) {
      this.hour_options.push(hour);
    }
    for (var minute = 0; minute <= 59; minute+=5) {
      this.minute_options.push(minute);
    }
  },
};
</script>

<style>
#register-button {
  width: 200px !important;
  height: 50px !important;
  background-color: #799761 !important;
  border: 0px solid;
  font-weight: bold;
}
#schedule-card {
  border-radius: 20px !important;
  border: 0px solid;
  padding: 0;
  background-color: #f3f3f3 !important;
}
#schedule-title {
  font-weight: bold;
  margin: 10px 0 30px 0;
}
#subtitle {
  text-align: left;
  margin: 5px 0 5px 5px;
  font-weight: bold;
}
#form-input {
  border-radius: 10px !important;
  border: 0px solid;
  background-color: #ffffff !important;
  float: left;
}
</style>
