<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <div
      align="center"
      style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
    >
      <div id="main-text">
        <b id="main-text-highlight">기본 정보</b>
      </div>
      <div id="listbackground">
        <b-row class="mb-3" id="menu">
          <b-col id="subtitle">모임이름</b-col>
          <div class="w-100"></div>
          <b-col id="categorytext">{{ this.moimData.title }}</b-col>
        </b-row>
        <b-row class="mb-3" id="menu">
          <b-col id="subtitle">개설일자</b-col>
          <div class="w-100"></div>
          <b-col id="categorytext" v-if="moimData.length!=0"
            >{{ this.moimData.createDate.split(/-|T/)[0] }} 년
            {{ this.moimData.createDate.split(/-|T/)[1] }}월
            {{ this.moimData.createDate.split(/-|T/)[2] }}일</b-col
          >
        </b-row>
        <b-row class="mb-3" id="menu">
          <b-col id="subtitle">활동지역</b-col>
          <div class="w-100"></div>
          <b-col id="categorytext">{{
            this.moimData.sido +
            " " +
            this.moimData.sigungu +
            " " +
            this.moimData.dong
          }}</b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-row class="mb-3" id="menu">
              <b-col id="subtitle">가입방식</b-col>
              <div class="w-100"></div>
              <b-col id="categorytext" v-if="this.moimData.isFreeEnter === 'Y'"
                >자유 가입</b-col
              >
              <b-col id="categorytext" v-else>승인 가입</b-col>
            </b-row>
          </b-col>
          <b-col>
            <b-row class="mb-3" id="menu">
              <b-col id="subtitle">공개여부</b-col>
              <div class="w-100"></div>
              <b-col id="categorytext" v-if="this.moimData.isPublic === 'Y'"
                >공개</b-col
              >
              <b-col id="categorytext" v-else>비공개</b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-row class="mb-3" id="menu">
              <b-col id="subtitle">정원</b-col>
              <div class="w-100"></div>
              <b-col id="categorytext">{{ this.moimData.maxMember }}명</b-col>
            </b-row>
          </b-col>
          <b-col>
            <b-row class="mb-3" id="menu">
              <b-col id="subtitle">가입 인원</b-col>
              <div class="w-100"></div>
              <b-col id="categorytext">{{this.moimCurrentMember}}명</b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      <div id="main-text">
        <b id="main-text-highlight">소개글</b>
      </div>
      <div id="listbackground">
        <div v-if="this.moimData.content !== ''">
          {{ this.moimData.content }}
        </div>
        <div v-else>등록된 소개 글이 없습니다.</div>
      </div>
      <MoimMember v-bind:hostId="moimhostid" @memberCount="updateCurrentMember"></MoimMember>
    </div>
  </div>
</template>

<script>
import { MoimDetail } from "@/services/moim";
import MoimMember from "@/components/MoimMember.vue";

export default {
  data() {
    return {
      moimData: [],
      moimCurrentMember: 0,
      moimhostid: null,
    };
  },
  components: {
    MoimMember,
  },
  methods: {
    async setData(id) {
      let moimData = await MoimDetail(id);
      this.moimData = moimData.data;
    },
    updateCurrentMember(data) {
      console.log(data);
      this.moimCurrentMember = data;
    }
  },
  created() {
    //모임id api에 요청 후 모임 세부정보 반환 내용을 넣으면 됩니다.
    var id = this.$store.getters["searchStore/getSelectedMoimId"];
    this.setData(id);
    this.moimhostid = this.$store.getters["searchStore/getSelectedMoimHostId"];
    console.log(this.moimhostid);
  },
};
</script>
<style>
#Introimg {
  width: 100%;
}
#button {
  padding: 2px 5px 2px 5px;
}
#title {
  font-size: 22px;
}
#subtitle {
  font-size: 17px;
}
#menu {
  margin: 0 10px 0 10px;
  /* width: 100% !important; */
}
#categorytext {
  background-color: white !important;
  border-radius: 20px !important;
  border: 0px solid;
  box-shadow: 0px 0px 5px #ccc;
  font-size: 15px;
  /* max-width: 45em; */
  padding: 5px 0 5px 0;
  font-family: "NanumBarunGothic";
}
#listbackground {
  border-radius: 20px !important;
  border: 0px solid;
  box-shadow: 0px 0px 5px #ccc;
  background-color: #ffffff !important;
  float: center;
  font-family: "NanumBarunGothic";
  padding: 20px 30px 30px 30px;
  margin: 10px 0 10px 0;
  /* max-width: 1050px; */
  max-width: 700px;
}
</style>
