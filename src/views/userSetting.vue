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
        <b-row id="listTitle" align-v="center" style="padding: 25px">
          <b-col cols="auto" style="padding: 0 0 0 15px">
            <b-img id="listIcon" :src="require('@/assets/settle.png')"></b-img>
          </b-col>
          <b-col cols="auto">
            <div id="listTitle">개인 정보 설정</div>
          </b-col>
        </b-row>
      </div>
      <div id="list-item">
        <b-row id="listTitle" align-v="center"  style="padding: 25px">
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
export default {
  components: {},
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
