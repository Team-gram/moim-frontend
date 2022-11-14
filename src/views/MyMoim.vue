 <template>
 <div
    align="center"
    style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
  >
  <div id="listbackground">
    <b-row id="MymoimTitle">내 모임
      <b-col id="plus">
        <b-img style="width:40px;height:36px; border-radius: 45%;" :src="require('@/assets/plus.png')"></b-img>
      </b-col>
    </b-row>
    <div id="listBox" v-for="list in moimlist" :key="list">
      <b-row id="listTitle" align-v="center" align-h="between"> 
        <b-col cols="auto" style="padding: 0 0 0 15px">
          <div style="font-size:18px">{{ list["모임이름"] }}</div>
          <div id="moiminfo">{{ list["모임정보"] }}</div>
        </b-col>
      </b-row>
    </div>
  </div>
 </div>
</template>

<script>
import calendar from "@/data/내모임.json"
export default {
  data() {
    return {
      moimlist:calendar["내모임"],
    };
  },
  methods:{
  }
}
</script>

<style>
#MymoimTitle{
  text-align: left;
  font-weight: bold !important;
  font-size: 25px;
  padding: 0px 0px 15px 0px;
  align-items: center;
}
#moiminfo{
  font-size: 15px;
}
#plus{
  padding: 0px 0px 0px 10px;
}
#listbackground{
  background-color: #f3f3f3 !important;
  border-radius: 20px !important; 
  padding: 20px 30px 10px 30px;
  margin: 10px 0 10px 0;
  max-width: 1050px;
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