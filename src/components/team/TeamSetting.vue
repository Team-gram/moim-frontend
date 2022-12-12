<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
    :key="componentKey"
  >
    <div id="main-text">
      <b id="main-text-highlight">설정</b>
    </div>
    <div id="listBox">
      <b-row
        id="listTitle"
        align-v="center"
        style="cursor: pointer"
        @click="settingindex = settingindex != 0 ? 0 : -1"
      >
        <b-col cols="auto" style="padding: 0 0 0 15px">
          <b-img id="listIcon" :src="require('@/assets/unhappy.png')"></b-img>
        </b-col>
        <b-col cols="auto">
          <div id="listTitle">모임 탈퇴하기</div>
        </b-col>
      </b-row>
      <MoimLeave
        style="width: 80%"
        :class="{ display: settingindex != 0 }"
      ></MoimLeave>
    </div>
    <div id="listBox" v-if="(moimUserData != null && moimUserData.level <= 1) && moimUpperStatus == null">
      <b-row
        id="listTitle"
        align-v="center"
        style="cursor: pointer"
        @click="moimUpperindex = moimUpperindex != 0 ? 0 : -1"
      >
        <b-col cols="auto" style="padding: 0 0 0 15px">
          <b-img id="listIcon" :src="require('@/assets/edit.png')"></b-img>
        </b-col>
        <b-col cols="auto">
          <div id="listTitle">모임 상위노출 신청하기</div>
        </b-col>
      </b-row>
      <MoimUpper
        style="width: 80%"
        :class="{ display: moimUpperindex != 0 }"
        v-on:closeUpper="closeUpperTab"
      ></MoimUpper>
    </div>
    <div id="listBox">
      <b-row
        id="listTitle"
        align-v="center"
        style="cursor: pointer"
        @click="moveToModifyWindow()"
      >
        <b-col cols="auto" style="padding: 0 0 0 15px">
          <b-img id="listIcon" :src="require('@/assets/edit.png')"></b-img>
        </b-col>
        <b-col cols="auto">
          <div id="listTitle">모임 정보 수정하기</div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import MoimLeave from "@/components/team/setting/MoimLeave";
import MoimUpper from "@/components/team/setting/MoimUpper";
import { getMoimMember, getMoimUpperStatus } from "@/services/moim.js";
export default {
  components: {
    MoimLeave,
    MoimUpper
  },
  data() {
    return {
      moimid: null,
      moimUpperStatus: null,
      moimUserData: null,
      settingindex: -1,
      moimUpperindex: -1,
      componentKey: 0,
    };
  },
  methods: {
    async getUserLevel(moimId) {
      let moimMemberList = await getMoimMember(moimId);
      console.log(moimMemberList);
      console.log(this.$cookies.get("MoimUserId"));
      for (var i = 0; i < moimMemberList.data.length; i++) {
        if(moimMemberList.data[i].userId == this.$cookies.get("MoimUserId")) {
          this.moimUserData = moimMemberList.data[i];
          console.log(this.moimUserData);
        }
      }
    },
    closeUpperTab() {
      this.moimUpperindex = -1;
      this.checkMoimUpperStatus(this.moimid);
    },
    async checkMoimUpperStatus(moimId){
      let upperStatus = await getMoimUpperStatus(moimId);
      this.moimUpperStatus = upperStatus.data;
    },
    moveToModifyWindow() {
      this.$router.push({
        name: "ModifyMoim",
      });
    }
  },
  created() {
    this.moimid = this.$store.getters["searchStore/getSelectedMoimId"];
    this.getUserLevel(this.moimid);
    this.checkMoimUpperStatus(this.moimid);
  },
  computed: {},
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
