<template>
  <div v-if="this.$cookies.get('MoimUserId') !== undefined">
    <b-row>
      <b-col>
        <div id="main-text">
          <b id="main-text-highlight"
            >'{{ this.userinfo.name }}' 님을 위한 추천 모임</b
          >
        </div>
      </b-col>
    </b-row>
    <b-row v-if="this.allRecommendMoimData.length > 0">
      <b-col>
        <div id="green-colored-option-button">
          <span @click="changePrevRecommendType()">
            <i
              class="fa-solid fa-angle-left"
              id="recommend-type-change-button"
            ></i>
          </span>
          <a> {{ this.currentRecommendMoimData.recommendDetail }} 추천 </a>
          <span @click="changeNextRecommendType()">
            <i
              class="fa-solid fa-angle-right"
              id="recommend-type-change-button"
              @click="changeNextRecommendType()"
            ></i>
          </span>
        </div>
        <div id="list-box">
          <div
            id="list-item"
            v-for="moimItem in currentRecommendMoimData.moimList"
            :key="moimItem.title"
            @click="moimDetail(moimItem)"
          >
            <b-row align-v="center">
              <b-col cols="auto">
                <b-img
                  id="listImage"
                  :src="moimItem.thumbnail"
                  rounded="circle"
                ></b-img>
              </b-col>
              <b-col>
                <b-row id="listTitle">
                  <b-col>
                    <div>{{ moimItem.title }}</div>
                  </b-col>
                </b-row>
                <b-row id="listData">
                  <b-col cols="auto" style="padding: 0 0 0 15px">
                    <b-img
                      id="listIcon"
                      :src="require(`@/assets/person.png`)"
                    ></b-img>
                  </b-col>
                  <b-col cols="auto"> {{ moimItem.maxMember }} 명 </b-col>
                  <b-col cols="auto" style="padding: 0 0 0 15px">
                    <b-img
                      id="listIcon"
                      :src="require(`@/assets/location.png`)"
                    ></b-img>
                  </b-col>
                  <b-col
                    cols="auto"
                    style="
                      width: 150px;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                    "
                  >
                    {{ moimItem.sido }} {{ moimItem.sigungu }}
                    {{ moimItem.dong }}
                  </b-col>
                  <b-col cols="auto" style="padding: 0 0 0 15px">
                    <b-img
                      id="listIcon"
                      :src="require(`@/assets/mic.png`)"
                    ></b-img>
                  </b-col>
                  <b-col
                    cols="auto"
                    style="
                      width: 220px;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                    "
                  >
                    {{ moimItem.content }}
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col> 추천 모임이 없습니다. </b-col>
    </b-row>
  </div>
</template>

<script>
import { GetRecommendMoin } from "@/services/moim";

export default {
  data() {
    return {
      userinfo: null,
      recommendMoims: {},
      currentRecommendMoimData: [],
      currentRecommendMoimIndex: null,
      allRecommendMoimData: [],
    };
  },
  methods: {
    changePrevRecommendType() {
      console.log("hi?");
      if (this.currentRecommendMoimIndex == 0)
        this.currentRecommendMoimIndex = this.allRecommendMoimData.length - 1;
      else this.currentRecommendMoimIndex -= 1;
      this.currentRecommendMoimData =
        this.allRecommendMoimData[this.currentRecommendMoimIndex];
      console.log(this.currentRecommendMoimData);
      console.log(this.currentRecommendMoimData);
    },
    changeNextRecommendType() {
      if (
        this.currentRecommendMoimIndex ==
        this.allRecommendMoimData.length - 1
      )
        this.currentRecommendMoimIndex = 0;
      else this.currentRecommendMoimIndex += 1;
      this.currentRecommendMoimData =
        this.allRecommendMoimData[this.currentRecommendMoimIndex];
      console.log(this.currentRecommendMoimData);
    },
    async getRecommendMoimList() {
      let userId = this.$cookies.get("MoimUserId");
      console.log(userId);
      if (userId != undefined) {
        let recommendMoimList = await GetRecommendMoin(userId);
        this.recommendMoims = recommendMoimList.data.recommendMoims;
        console.log(recommendMoimList);

        const keys = Object.keys(this.recommendMoims);
        console.log(keys);
        for (let i = 0; i < keys.length; i++) {
          console.log(keys[i]);
          var recommendDetail;
          if (this.recommendMoims[keys[i]].length > 0) {
            // 0개 이상의 추천 모임방이 존재하는 경우
            if (keys[i] == "age") {
              recommendDetail = "연령";
            } else if (keys[i] == "gender") {
              recommendDetail = "성별";
            } else {
              recommendDetail = "관심사";
            }

            if (this.recommendMoims[keys[i]].length > 5) {
              this.recommendMoims[keys[i]] = this.recommendMoims[keys[i]].slice(
                0,
                5
              );
            }

            var newRecommend = new Object({
              recommendType: keys[i],
              recommendDetail: recommendDetail,
              moimList: this.recommendMoims[keys[i]],
            });
            console.log(newRecommend);
            this.allRecommendMoimData.push(newRecommend);
            console.log(this.allRecommendMoimData);
          }
          // const key = keys[i]; // 각각의 키
          // const value = this.recommendMoims[key]; // 각각의 키에 해당하는 각각의 값

          // console.log(value);
        }
        this.currentRecommendMoimData = this.allRecommendMoimData[0];
      }
    },
  },
  async created() {
    if (this.$cookies.get("MoimUserId") != undefined) {
      // 로그인되어 있는 경우
      console.log("login!");
      await this.$store.dispatch(
        "UpdateUserInfo",
        this.$cookies.get("MoimUserId")
      );
      this.userinfo = this.$store.getters.getUserData;
      console.log(this.userinfo);
    }

    this.getRecommendMoimList();

    this.currentRecommendMoimIndex = 0;
    this.currentRecommendMoimData =
      this.allRecommendMoimData[this.currentRecommendMoimIndex];
  },
};
</script>

<style>
#recommend-type {
  background-color: #4fb26f;
  border-radius: 20px !important;
  border: 0px solid;
  color: #ffffff;
  font-family: "NanumBarunGothic";
  padding: 5px 20px 5px 20px;
  width: fit-content;
}
#recommend-type-change-button {
  cursor: pointer;
}
</style>
