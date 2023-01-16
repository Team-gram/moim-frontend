<template>
  <div
    align="center"
    style="margin-top: 20px; margin-left: 20px; margin-right: 20px"
  >
    <!-- <b-img
      center
      valign="absmiddle"
      id="Introimg"
      :src="require(`@/assets/test.jpg`)"
    ></b-img> -->
    <div
      align="center"
      style="margin-top: 10px; margin-left: 20px; margin-right: 20px"
    >
      <div id="main-text">
        <b id="main-text-highlight">기본 정보</b>
      </div>
      <div id="listbackground">
        <!-- <b-row class="mb-3" id="menu">
        <b-col id="subtitle">카테고리</b-col>
        <div class="w-100" ></div>
        <b-col id="categorytext">{{category_data1}} > {{category_data2}}</b-col>
      </b-row> -->
        <b-row class="mb-3" id="menu">
          <b-col id="subtitle">모임이름</b-col>
          <div class="w-100"></div>
          <b-col id="categorytext">{{ this.moimData.title }}</b-col>
        </b-row>
        <b-row class="mb-3" id="menu">
          <b-col id="subtitle">개설일자</b-col>
          <div class="w-100"></div>
          <b-col id="categorytext"
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
              <b-col id="categorytext" v-if="this.moimData.isFreeEnter == 'Y'"
                >자유 가입</b-col
              >
              <b-col id="categorytext" v-else>승인 가입</b-col>
            </b-row>
          </b-col>
          <b-col>
            <b-row class="mb-3" id="menu">
              <b-col id="subtitle">공개여부</b-col>
              <div class="w-100"></div>
              <b-col id="categorytext" v-if="this.moimData.isPublish == 'Y'"
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
              <!-- <b-col id="subtitle">가입 인원</b-col>
              <div class="w-100"></div>
              <b-col id="categorytext">3명</b-col> -->
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
      <!-- <div id="listbackground">
      <div id="title">분석 리스트</div>
    </div> -->
    </div>
    <b-button
      pill
      align="center"
      id="green-colored-option-button"
      @click="showJoinModal()"
      >가입 신청</b-button
    >
    <b-modal id="moimFreeJoinModal" size="sm" hide-footer hide-header centered>
      <div
        class="d-block text-center"
        style="margin-bottom: 20px; margin-top: 20px"
      >
        <h6>'{{ this.moimData.title }}'은 자유 가입 모임입니다.</h6>
        <h6>해당 모임에 가입하시겠습니까?</h6>
      </div>
      <div class="d-block text-center" style="margin-bottom: 20px">
        <b-button
          pill
          align="center"
          id="green-colored-option-button"
          @click="joinMoim()"
          >가입하기</b-button
        >
      </div>
    </b-modal>
    <b-modal id="moimApplyJoinModal" size="sm" hide-footer hide-header centered>
      <div
        class="d-block text-center"
        style="margin-bottom: 20px; margin-top: 20px"
      >
        <h6>'{{ this.moimData.title }}' 가입을 위한 신청서를 작성해주세요.</h6>
        <b-form-textarea
          id="moim-form-input"
          v-model="moimApplyMessage"
          rows="3"
          max-rows="3"
        ></b-form-textarea>
      </div>
      <div class="d-block text-center" style="margin-bottom: 20px">
        <b-button
          pill
          align="center"
          id="green-colored-option-button"
          @click="joinMoim()"
          >신청서 제출</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  MyMoimList,
  MoimDetail,
  JoinFreeMoim,
  JoinPassMoim,
} from "@/services/moim";

export default {
  data() {
    return {
      moimData: [],
      moimApplyMessage: "",
    };
  },
  methods: {
    async setData(id) {
      let moimData = await MoimDetail(id);
      this.moimData = moimData.data;
      // this.category_data1 =
      // this.category_data2 =
      // this.region =
      // this.regular =
      // this.register =
      // this.maximum =
      // this.introduction =
    },
    // async setCategory() {

    // }
    showJoinModal() {
      if(this.$cookies.get('MoimUserId')) {
        if (this.moimData.isFreeEnter === "Y") {
        this.$bvModal.show("moimFreeJoinModal");
      } else {
        this.$bvModal.show("moimApplyJoinModal");
      }
      }
      
      else{
        alert("로그인 후 사용 가능한 기능입니다.")
      }
    },
    async joinMoim() {
      var isJoinAble = await this.checkNotJoinedMoim(this.moimData.id);
      console.log(isJoinAble);
      if (isJoinAble) {
        // let joinRequest;
        if (this.moimData.isFreeEnter === "Y") {
          //자유가입api
          await JoinFreeMoim(
            this.moimData.id,
            this.$cookies.get("MoimUserId")
          );

          alert(
            "'" + this.moimData.title + "'" + "모임 가입이 완료되었습니다."
          );
        } else {
          //승인가입api
          await JoinPassMoim(
            this.moimData.id,
            this.$cookies.get("MoimUserId"),
            this.moimApplyMessage
          );
          alert(
            "'" + this.moimData.title + "'" + "모임 가입 신청이 접수되었습니다."
          );
        }
        this.$router.push("/mymoim");
      } else {
        alert("이미 가입한 모임입니다.");
        if (this.moimData.isFreeEnter === "Y") {
          this.$bvModal.hide("moimFreeJoinModal");
        } else {
          this.$bvModal.hide("moimApplyJoinModal");
        }
      }
    },

    async checkNotJoinedMoim(id) {
      let myMoim = await MyMoimList(this.$cookies.get("MoimUserId"));
      if (myMoim.status === 200) {
        console.log(myMoim.data);
        return myMoim.data.every((moim) => moim.id !== id);
      }
    },
  },
  created() {
    //모임id api에 요청 후 모임 세부정보 반환 내용을 넣으면 됩니다.
    var id = this.$store.getters["searchStore/getSelectedMoimId"];
    console.log(id);
    this.setData(id);
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
  font-size: 15px;
  /* max-width: 45em; */
  padding: 5px 0 5px 0;
}
#listbackground {
  background-color: #f3f3f3 !important;
  border-radius: 20px !important;
  padding: 20px 30px 30px 30px;
  margin: 10px 0 10px 0;
  max-width: 1050px;
}
#moim-button {
  width: 200px !important;
  height: 50px !important;
  background-color: #799761 !important;
  border: 0px solid;
  font-weight: bold;
}
#moim-form-input {
  border-radius: 10px !important;
  border: 0px solid;
  background-color: #f3f3f3 !important;
  float: left;
  margin: 10px 10px 10px 10px;
}
</style>
