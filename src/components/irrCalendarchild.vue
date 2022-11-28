 <template>
  <div id="regularbackground">
    <div id="regularBox" @click="[$bvModal.show('bv-modal-example'),irrselected(item) ]" v-for="(item,index) in parentdata" :key="index">
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
    <b-modal id="bv-modal-example" size="sm" hide-footer hide-header centered>
        <div
          class="d-block text-center"
          style="margin-bottom: 20px; margin-top: 20px"
        >
          <h5>비정기 일정 삭제하기</h5>
        </div>
        <div class="d-block text-center" style="margin-bottom: 20px">
          <b-button variant="danger" @click="irrdelete">삭제하기</b-button>
        </div>
      </b-modal>
  </div>
</template>

<script>
import { irregularRemove } from "@/services/calendar";
export default {
  props:['parentdata'],
  data() {
    return {
      irrid : 0,
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
  async irrdelete(){
      const response = await irregularRemove(this.$cookies.get("MoimUserId"),this.irrid);
      console.log(response);
      this.$router.go();
    },
    irrselected(item){
      this.irrid=item.id;
      
    }
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