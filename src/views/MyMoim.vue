 <template>
 <div
    align="center"
    style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
  >
  <div id="listbackground">
    <b-row id="MymoimTitle">내 모임
      <b-col id="plus">
        <b-img @click="newmoim()" style="width:40px;height:36px; border-radius: 45%;" :src="require('@/assets/plus.png')"></b-img>
      </b-col>
    </b-row>
    <div v-for="(list,index) in moimlist" :key="index" @click="callMoim(index)">
      <div v-if="list!==null" id="listBox" v-show="index<mylist+4 && index>=mylist">
        <b-row id="listTitle" align-v="center">
          <b-col cols="auto" style="padding: 0 0 0 15px">
            <b-img style="width:40px;height:36px; border-radius: 45%;" :src="require('@/assets/test.jpg')"></b-img>
          </b-col>
          <b-col cols="auto" style="padding: 0 0 0 15px">
            <div id="moiminfo" style="font-size:18px">{{ list["title"] }}</div>
            <div id="moiminfo">{{ list["content"] }}</div>
            <div id="moiminfo">{{ list["sido"] }} {{ list["sigungu"] }} {{ list["sidongdo"] }} {{ list["maxMember"] }}명</div>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-row id="Mymoimselect" align-h="center">
      <b-button @click="prevlist()">◀</b-button>
      <b-button @click="nextlist()">▶</b-button>
    </b-row>
  </div>
 </div>
</template>

<script>
import { MyMoimList } from "@/services/moim";
export default {
  data() {
    return {
      moimlist:"",
      mylist:0,
      maxmylist:1,
    };
  },
  methods:{
    prevlist(){
      if(this.mylist>=4)
        this.mylist -=4;
    },
    nextlist(){
      if(this.mylist+4<this.maxmylist)
        this.mylist+=4;
    },
    callMoim(index){
      console.log(this.moimlist[index]["id"]);
      this.$store.commit('searchStore/setSelectedMoimId', this.moimlist[index]["id"]);
      this.$router.push({name: "MoimTeam"});
    },
    newmoim(){
      this.$router.replace('/newmoim');
    }
  },
 async created(){
    let response = await MyMoimList(this.$cookies.get("MoimUserId"));
    if(response.status==200){
      if(response.data.length==0){
        this.mylist=0;
        var Nulldata = Object();
        let data = [];
        data.push({"title":"모임 정보가 존재하지 않습니다.","info":""})
        Nulldata=data;
        this.moimlist = Nulldata;
        console.log(this.moimlist);
      }
      else{
        this.moimlist = response.data;
        /*
        respose data는 다음과 같은 값을 가진다.
          "id": 0,  (모임 고유 id)
          "userId": 0, (방장)
          "categoryId": 0,
          "title": "string",
          "content": "string",
          "sido": "string",
          "sigungu": "string",
          "dong": "string",
          "isPublish": "string",
          "isFreeEnter": "string",
          "maxMember": 0,
          "createDate": "2022-11-18T09:33:59.914Z",
          "moimLevel": 0
        */
      }

    }
  },
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
#Mymoimselect{
  align-items: center;
}
#listbackground{
  background-color: #f3f3f3 !important;
  border-radius: 20px !important; 
  padding: 20px 30px 30px 30px;
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