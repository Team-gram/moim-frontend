<template>
  <div
    align="center"
    style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
  >
    <div id="listBox">
      <b-row id="listTitle" align-v="center">
        <b-col cols="auto" style="padding: 0 0 0 15px">
          <b-img
          id="listIcon"
          :src="require('@/assets/settle.png')"
          ></b-img>
        </b-col>
        <b-col cols="auto">
          <div id="listTitle" >개인 정보 설정</div>
        </b-col>
      </b-row>
    </div>
    <div id="listBox">
      <b-row id="listTitle" align-v="center">
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
</template>
<script>

export default {
  components: {

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