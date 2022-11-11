<template>
  <div
    align="center"
    style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
  >
    <div id="listBox" v-for="day in dayindex" :key="day">
      <b-row id="listTitle" align-v="center">
        <b-col cols="auto" style="padding: 0 0 0 15px">
          <div id="listTitle" >{{ day }}</div>
        </b-col>
        <b-col cols="auto">
          <div id="listnodata" v-if="calendardata[day] === 'NULL'">
            등록된 정기 일정이 없습니다.
          </div>
          <div v-else id="listdata" v-for="(item)  in calendardata[day]" :key="item">
            {{item.time}} | {{item.data}}
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import calendar from "@/components/캘린더.json"
export default {
  data() {
    return {
      calendardata : calendar["221002"],
      dayindex : ["월","화","수","목","금","토","일"],
    };
  },
};
</script>

<style>
#listTitle {
  text-align: left;
  font-weight: bold !important;
  font-size: 25px;
}
#listnodata{
  font-weight: bold !important;
  font-size: 18px;
  margin: auto;
}
#listdata {
  font-weight: bold !important;
  font-size: 18px;
  margin-left: 30px;
  background-color: white;
  margin: 10px 10px 10px 10px;
  border-radius: 10px !important;
  padding: 10px 20px 10px 20px;
}
#listBox {
  border-radius: 10px !important;
  border: 0px solid;
  background-color: #f3f3f3 !important;
  float: center;
  max-width: 1000px;
  padding: 20px 20px 20px 20px;
  margin: 10px 0 10px 0;
}
</style>