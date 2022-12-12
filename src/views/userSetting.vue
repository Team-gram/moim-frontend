<template>
  <div
    align="center"
    style="margin-top: 80px; margin-left: 20px; margin-right: 20px"
  >
    <b-row align-h="center">
      <b-col cols="auto" style="padding: 0 5px 0 5px">
        <div id="main-text">
          <b id="main-text-highlight">설정</b>
        </div>
      </b-col>
    </b-row>
    <div v-if="this.$cookies.get('MoimUserId')">
      <div id="list-item">
        <b-row id="listTitle" align-v="center" style="padding: 25px" @click="settingindex= (settingindex!=0)? 0 : -1">
          <b-col cols="auto" style="padding: 0 0 0 15px">
            <b-img id="listIcon" :src="require('@/assets/settle.png')"></b-img>
          </b-col>
          <b-col cols="auto">
            <div id="listTitle">장소 상위 신청 현황</div>
          </b-col>
        </b-row>
      </div>
      <div id="list-box" :class="{display: settingindex!=0}" @click="settingindex= (settingindex!=0)? 0 : -1">
        <b-row id="listTitle" align-v="center" v-for="(item,index) in placecurrentList" :key="index">
          <b-col cols="auto">
            <div id="listdetail" >{{item.placeName}}</div>
          </b-col>
          <b-col cols="auto">
            <div id="listdetail" >처리 상태 : {{item.status}}</div>
          </b-col>
          <b-col cols="auto">
            <div id="listdetail" >시작일 : {{item.recStartDate.slice(0,10)}}</div>
          </b-col>
           <b-col cols="auto">
            <div id="listdetail" >종료일: {{item.recEndDate.slice(0,10)}}</div>
          </b-col>
        </b-row>
      </div>
      <div id="list-item">
        <b-row id="listTitle" align-v="center"  style="padding: 25px" @click="end()">
          <b-col cols="auto" style="padding: 0 0 0 15px">
            <b-img
              id="listIcon"
              :src="require('@/assets/poweroff.png')"
            ></b-img>
          </b-col>
          <b-col cols="auto">
            <div id="listTitle">서비스 탈퇴</div>
          </b-col>
        </b-row>
      </div>
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
import { PlaceCurrentStatus } from '@/services/meet.js'
export default {
  data(){
    return{
      placecurrentList:[],
      settingindex:-1,
    }
  },
async created(){
    const response = await PlaceCurrentStatus(this.$cookies.get("MoimUserId"))
    if(response.status==200){
      this.placecurrentList = response.data;
    }
  },
  methods:{
    end(){
      this.$cookies.remove("MoimUserId");
      alert("모임 서비스를 이용해주셔서 감사했습니다.");
      this.$router.go();
    }
  }
};
</script>

<style>
#listTitle {
  text-align: left;
  font-weight: bold !important;
  font-size: 20px;
}
#listdetail {
  text-align: left;
  font-weight: bold !important;
  font-size: 15px;
}
#listIcon {
  width: 20px !important;
}
#list-box{
  border-radius: 20px !important;
  border: 0px solid;
  box-shadow: 0px 0px 5px #ccc;
  background-color: #ffffff;
  padding: 5px 5x 5px 5px;
  margin: 10px 0 10px 0;
  text-align : center;
  justify-content : center;
}

</style>
