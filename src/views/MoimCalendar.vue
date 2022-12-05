<template>
  <div
    align="center"
    style="margin-top: 80px; margin-left: 20px; margin-right: 20px"
  >
    <b-row align-h="center">
      <b-col cols="auto" style="padding: 0 5px 0 5px">
        <div id="main-text">
          <b id="main-text-highlight">일정 관리</b>
        </div>
      </b-col>
    </b-row>
    <div v-if="this.$cookies.get('MoimUserId')">
      <div id="selectcalendar">
        <b-row align-v="center" align-h="center">
          <b-col
            cols="auto"
            style="padding: 5px 20px 5px 0; cursor: pointer"
            :class="{ bold: isRegular }"
            @click="regular"
            >정기 일정</b-col
          >
          <b-col cols="auto" style="padding: 0 0 0 0">|</b-col>
          <b-col
            cols="auto"
            style="padding: 0 0 0 20px; cursor: pointer"
            :class="{ bold: !isRegular }"
            @click="irregular"
            >비정기 일정</b-col
          >
        </b-row>
      </div>
      <regularCalendar :class="{ display: !isRegular }"></regularCalendar>
      <irregularCalendar :class="{ display: isRegular }"></irregularCalendar>
      <b-button
        v-show="!isRegular"
        id="green-colored-option-button"
        v-on:click="newCalendar"
        >새로운 일정 등록하기</b-button
      >
      <div style="padding: 10px 0 0 0"></div>
    </div>
    <b-row align-h="center" v-else>
      <b-col>
        <div style="margin-top: 30px; margin-bottom: 500px">
          로그인 후 이용 가능한 서비스입니다.
        </div></b-col
      >
    </b-row>
  </div>
</template>
<script>
import irregularCalendar from "@/components/irregularCalendar.vue";
import regularCalendar from "@/components/regularCalendar.vue";
export default {
  components: {
    regularCalendar,
    irregularCalendar,
  },
  data() {
    return {
      isRegular: true,
    };
  },
  methods: {
    regular() {
      this.isRegular = true;
    },
    irregular() {
      this.isRegular = false;
    },
    newCalendar() {
      if (this.isRegular) {
        this.$router.push("/schedule/register");
      } else {
        this.$router.replace("/schedule/register");
      }
    },
  },
  created() {
    //여기에 유저 일정 데이터를 받으면 됩니다.
  },
};
</script>

<style>
.bold {
  font-weight: bold !important;
}
.display {
  display: none;
}
#selectcalendar {
  background-color: #f3f3f3 !important;
  border-radius: 20px !important;
  width: 17em;
  margin: 20px 0 20px 0;
  font-size: 14px;
}
#newbutton {
  font-weight: bold !important;
  font-size: 17px;
  border: none;
  padding: 10px 60px 10px 60px;
  margin: 10px 0 40px 0;
  border-radius: 10px !important;
  background-color: #799761 !important;
}
</style>
