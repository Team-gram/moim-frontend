<template>
  <div align="center" class="teamfirst">
    <img src="@/assets/test.jpg" style="width:40%;">
    <b-row align-v="center" align-h="center">
      <b-col id="teammenu" cols="auto" style="cursor:pointer" :class="{menuselect: memuindex==0}" @click="menu(0)"><div>정보</div></b-col>
      <b-col id="teammenu" cols="auto" style="cursor:pointer" :class="{menuselect: memuindex==1}" @click="menu(1)"><div> 채팅</div></b-col>
      <b-col id="teammenu" cols="auto" style="cursor:pointer" :class="{menuselect: memuindex==2}" @click="menu(2)"><div>일정</div></b-col>
      <b-col id="teammenu" cols="auto" style="cursor:pointer" :class="{menuselect: memuindex==3}" @click="menu(3)"><div>설정</div></b-col>
    </b-row>
  </div>
</template> 
<script>

export default {
  name: "MoimTeam",
  data() {
    return {
      memuindex: 0,
    };
  },
  methods:{
    menu(index){
      this.memuindex = index;
      console.log(this.memuindex);
    }
  },
  created(){
    //여기에 유저 일정 데이터를 받으면 됩니다.
  }
}
</script>

<style>
.teamfirst{
  margin-top: 10px;margin-left: 20px; margin-right: 20px;
  align-content: center;
}
#teammenu{
  margin: 0 -1px 0 -1px;
  font-size: 15px;
  padding: 5px 30px 5px 30px;
  border: 1px solid rgba(128, 128, 128, 0.401);
}
.menuselect{
  color: rgb(101, 164, 113);
  font-weight: bold;
}
</style>