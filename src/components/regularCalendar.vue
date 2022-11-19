 <template>
  <div id="listbackground">
    <div id="listBox" v-for="item,index in calendar" :key="index">
      <b-row id="listTitle" align-v="center" align-h="between">
        <b-col cols="auto" style="padding: 0 0 0 15px">
          <div id="listTitle" >{{ day[item.day] }}</div>
        </b-col>
        <b-col cols="auto">
          <div id="listnodata" v-if="calendardata === ''">
            등록된 정기 일정이 없습니다.
          </div>
          <div v-else id="listdata" v-for="item,index  in calendar" :key="index">
            {{item.startTime.slice(0,-3)}} - {{item.endTime.slice(0,-3)}} | {{item.title}}
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { regularget } from "@/services/calendar";
export default {
  data() {
    return {
      calendar : "",
      day:["월","화","수","목","금","토","일"],
      day_options: [
          { item: "0", name: "월" },
          { item: "1", name: "화" },
          { item: "2", name: "수" },
          { item: "3", name: "목" },
          { item: "4", name: "금" },
          { item: "5", name: "토" },
          { item: "6", name: "일" },
        ],
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
  },
 async created(){
    const response = await regularget(this.$cookies.get("MoimUserId"));
    if(response.status==200)
      this.calendar = response.data;
    else{
      alert('로그인이 필요합니다.');
    }

  }
}
</script>

<style>
#listbackground{
  background-color: #f3f3f3 !important;
  border-radius: 20px !important; 
  padding: 10px 20px 10px 20px;
  margin: 10px 0 10px 0;
}
#listTitle {
  text-align: left;
  font-weight: bold !important;
  font-size: 20px;
  padding: 0px 0px 0px 5px;
}
#listnodata{
  font-size: 14px;
  margin: auto;
  margin: 10px 10px 10px 0px;
  padding: 3px 0px 3px 5px;
}
#listdata {
  font-size: 14px;
  width:14em;
  margin-left: 30px;
  background-color: #f3f3f3;
  margin: 10px 10px 10px 0px;
  border-radius: 10px !important;
  padding: 3px 0px 3px 5px;
}
#listBox {
  border-radius: 10px !important;
  border: 0px solid;
  background-color: #d9d9d9 !important;
  float: center;
  max-width: 1000px;
  padding: 20px 10px 20px 10px;
  margin: 10px 0 10px 0;
}
</style>