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
          :src="require('@/assets/unhappy.png')"
          ></b-img>
        </b-col>
        <b-col cols="auto">
          <div id="listTitle" >모임 탈퇴하기</div>
        </b-col>
      </b-row>
    <MoimLeave style="width:80%" :class="{display: settingindex!=0}"></MoimLeave>
    </div>
  </div>
</template>
<script>
import MoimLeave from "@/components/team/setting/MoimLeave";
export default {
  components: {
    MoimLeave,
  },
  data() {
    return {
      settingindex:-1,
    };
  },
  methods:{
  },
  created(){
  },
  computed:{
  },
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