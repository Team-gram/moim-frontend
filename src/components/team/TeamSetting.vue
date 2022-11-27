<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <div id="listBox">
      <b-row id="listTitle" align-v="center" style="cursor:pointer" @click="settingindex= (settingindex!=0)? 0 : -1">
        <b-col cols="auto" style="padding: 0 0 0 15px">
          <b-img
          id="listIcon"
          :src="require('@/assets/calendar.png')"
          ></b-img>
        </b-col>
        <b-col cols="auto">
          <div id="listTitle" >모임 시간 조율하기</div>
        </b-col>
      </b-row>
    <HostCalendar v-if="ishost" style="width:80%" :class="{display: settingindex!=0}"></HostCalendar>
    <UserCalendar v-if="!ishost" style="width:80%" :class="{display: settingindex!=0}"></UserCalendar>
    </div>
    <div id="listBox">
      <b-row id="listTitle" align-v="center" style="cursor:pointer"  @click="settingindex= (settingindex!=1)? 1 : -1">
        <b-col cols="auto" style="padding: 0 0 0 15px">
          <b-img
          id="listIcon"
          :src="require('@/assets/search.png')"
          ></b-img>
        </b-col>
        <b-col cols="auto">
            <div id="listTitle">모임 장소 찾기</div>
        </b-col>
      </b-row>
      <PlaceSearch style="width:80%;" :class="{display: settingindex!=1}"></PlaceSearch>
    </div>
    <div id="listBox">
      <b-row id="listTitle" align-v="center" style="cursor:pointer"  @click="settingindex= (settingindex!=2)? 2 : -1">
        <b-col cols="auto" style="padding: 0 0 0 15px">
          <b-img
          id="listIcon"
          :src="require('@/assets/itemicon.png')"
          ></b-img>
        </b-col>
        <b-col cols="auto">
            <div id="listTitle">준비물 관리하기</div>
        </b-col>
      </b-row>
      <ItemPrepare style="width:80%;" :class="{display: settingindex!=2}"></ItemPrepare>
    </div>
  </div>
</template>
<script>
import UserCalendar from "@/components/team/setting/UserCalendar";
import HostCalendar from "@/components/team/setting/HostCalendar";
import ItemPrepare from "@/components/team/setting/ItemPrepare";
import PlaceSearch from "@/components/team/setting/PlaceSearch";
export default {
  components: {
    HostCalendar,
    UserCalendar,
    ItemPrepare,
    PlaceSearch,
  },
  data() {
    return {
      settingindex:-1,
      ishost : false,
    };
  },
  methods:{
    moimSetTime(){

    }
  },
  created(){
    if(this.$store.getters["searchStore/getSelectedMoimHostId"]==this.$cookies.get("MoimUserId"))
      this.ishost = true;
    else
      this.ishost = false;
  }
};
</script>

<style>
#listTitle {
  text-align: left;
  font-weight: bold !important;
  font-size: 20px;
}
#listIcon {
  width: 20px !important;
}
</style>