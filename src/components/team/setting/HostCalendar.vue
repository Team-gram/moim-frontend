<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <b-card id="schedule-card" style="max-width: 1000px">
      <h4 id="schedule-title">모임 시간 생성</h4>
      <b-container class="bv-example-row">
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
        <b-row class="mb-3">
          <b-col id="subtitle">마감 시간*</b-col>
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
        </b-row>
        <b-row class="mb-3">
          <b-col id="subtitle">설명</b-col>
          <div class="w-100"></div>
          <b-col>
            <b-form-textarea
              id="form-input"
              v-model="schedule_description"
              placeholder="모임원들이 확인할 내용을 입력해주세요"
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
      @click="MoimTime()"
      >모임 시간 등록
    </b-button>
  </div>
</template>

<script>
import { JoinMeet } from "@/services/meet.js"
export default {
  data() {
    return {
      moimid:0,
      start_hour_selected:0,
      hour_options: [
        1, 7, 6, 12, 24, 48, 72, 144
      ]
    };
  },
  methods: {
  async MoimTime() {
      //필수 입력 사항(제목) 모두 입력했는지 확인
      if(this.schedule_name.split(' ').join('') == ""){
        this.$bvToast.toast('제목은 필수 입력 항목입니다.', {
          // title: "",
          toaster: "b-toaster-top-right",
          appendToast: false,
          autoHideDelay: 3000,
        });
      }
      const response = await JoinMeet(this.moimid);
      if(response.status==200){
        this.$bvToast.toast('모임 조율 시간이 등록되었습니다.', {
        // title: "회원 정보 등록 실패",
        toaster: "b-toaster-top-right",
        appendToast: false,
        autoHideDelay: 3000,
        });
      }
    },
  },
  created() {
    this.moimid = this.$store.getters["searchStore/getSelectedMoimId"];
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
