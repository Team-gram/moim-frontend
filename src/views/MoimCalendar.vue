<template>
  <div
    align="center"
    style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
  >
  <div id ="selectcalendar">
    <b-row align-v="center" align-h="center">
      <b-col cols="auto" style="padding: 5px 20px 5px 0" :class="{bold: isRegular}" @click="regular">정기 일정</b-col>
      <b-col cols="auto" style="padding: 0 0 0 0">|</b-col>
      <b-col cols="auto" style="padding: 0 0 0 20px" :class="{bold: !isRegular}" @click="irregular">비정기 일정</b-col>
    </b-row>
  </div>
  <regularCalendar :class="{display: !isRegular}"></regularCalendar>
  <irregularCalendar :class="{display: isRegular}"></irregularCalendar>
  <b-button id="newbutton">새로운 일정 등록하기</b-button>
  </div>
</template>
<script>
import regularCalendar from "@/components/regularCalendar.vue"
import irregularCalendar from "@/components/irregularCalendar.vue"
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
  methods:{
    regular(){
      this.isRegular = true;
    },
    irregular(){
      this.isRegular = false;
    }
  }
}
</script>

<style>
.bold{
  font-weight: bold !important;
}
.display{
  display: none;
}
#selectcalendar{
  background-color: #f3f3f3 !important;
  border-radius: 20px !important;
  width:  17em;
  margin: 20px 0 20px 0;
  font-size: 14px;
}
#newbutton{
  font-weight: bold !important;
  font-size: 17px;
  border: none;
  padding: 10px 60px 10px 60px;
  margin: 10px 0 40px 0;
  border-radius: 10px !important;
  background-color: #799761 !important;
}
</style>