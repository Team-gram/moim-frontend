 <template>
  <div id="regularbackground">
    <div id="regularBox" v-for="(item,index) in parentdata" :key="index">
      <b-row id="regularTitle" align-v="center" align-h="center">
        <b-col cols="auto">
          <div id="regularTitle" >{{ item.title }} :</div>
        </b-col>
        <b-col cols="auto">
          <div id="regulardetail" >{{ item.detail }}</div>
        </b-col>
        <b-col cols="auto">
          <div id="regulardata">
            {{item.startTime.slice(0,5)}} - {{item.endTime.slice(0,5)}}
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  props:['parentdata'],
  data() {
    return {
      calendar : "",
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

  },
  created(){
  }
}
</script>

<style>
#regularbackground{
  background-color: #f3f3f3 !important;
  border-radius: 20px !important; 
  padding: 0px 10px 0px 10px;
  margin: 0px 0 0px 0;
}
#regularTitle {
  font-weight: bold !important;
  font-size: 17px;
  padding: 0px 0px 0px 0px;
}
#regulardetail{
  font-weight:normal;
  font-size: 16px;
  padding: 0px 0px 0px 0px;
}
#regulardata {
  font-size: 14px;
  background-color: #f3f3f3;
  border-radius: 10px !important;
  padding: 5px 10px 5px 10px;
  text-align: center;
}
#regularBox {
  border-radius: 10px !important;
  border: 0px solid;
  background-color: #d9d9d9 !important;
  float: center;
  max-width: 1000px;
  padding: 10px 10px 10px 10px;
  margin: 10px 0 10px 0;
}
</style>