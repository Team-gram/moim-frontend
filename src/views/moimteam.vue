<template>
  <div align="center" class="teamfirst">
    <b-row align-v="center" align-h="center">
      <b-col id="teammenu" cols="auto" style="cursor:pointer" :class="{menuselect: memuindex==0}" @click="memuindex=0"><div>정보</div></b-col>
      <b-col id="teammenu" cols="auto" style="cursor:pointer" :class="{menuselect: memuindex==1}" @click="memuindex=1"><div>채팅</div></b-col>
      <b-col id="teammenu" cols="auto" style="cursor:pointer" :class="{menuselect: memuindex==2}" @click="memuindex=2"><div>일정</div></b-col>
      <b-col id="teammenu" cols="auto" style="cursor:pointer" :class="{menuselect: memuindex==3}" @click="memuindex=3"><div>설정</div></b-col>
    </b-row>
  <TeamInfo style="width:80%" v-if="memuindex==0"></TeamInfo>
  <TeamChat style="width:80%" v-if="memuindex==1"></TeamChat>
  <TeamCalendar style="width:80%" v-if="memuindex==2"></TeamCalendar>
  <TeamSetting style="width:80%" v-if="memuindex==3"></TeamSetting>
  </div>
</template> 
<script>
import TeamInfo from "@/components/team/TeamInfo.vue";
import TeamChat from "@/components/team/TeamChat";
import TeamCalendar from "@/components/team/TeamCalendar.vue";
import TeamSetting from "@/components/team/TeamSetting.vue";
export default {
   components: {
    TeamInfo,
    TeamChat,
    TeamCalendar,
    TeamSetting,
  },
  name: "MoimTeam",
  data() {
    return {
      memuindex: 3,
    };
  },
  methods:{
  },
  created(){
  }
}
</script>

<style>
.teamfirst{
  margin-top: 10px;
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